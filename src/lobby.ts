// Lobby Durable Object — real-time multiplayer room via WebSocket.
// Handles player sessions, chat, dice rolls (with full metadata), seat management, and system events.
/// <reference types="@cloudflare/workers-types" />

// --- Seat model: configurable table with human/AI/empty seats ---
type SeatType = 'human' | 'ai' | 'empty';
type RollInterpolationMode = 'smooth' | 'strict' | 'auto';

interface Seat {
  id: string;            // stable ID: "seat-0", "seat-1", etc.
  type: SeatType;
  playerId?: string;     // only set when type=human and a player has claimed the seat
  username?: string;
  avatar?: string;
  characterId?: string;
  characterName?: string;
  ready: boolean;
}

interface Session {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
  seatId?: string;       // which seat this player occupies (if any)
  spectating: boolean;   // true if explicitly spectating (no seat, chat-only)
  lastGameEvents: number[]; // timestamps for rate limiting (Phase 8.4)
  rttMs?: number;        // latest client-reported RTT (via report_rtt)
}

interface PlayerInfo {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
  isDM?: boolean;
  seatId?: string;
  ready?: boolean;
  characterId?: string;
  characterName?: string;
  rttMs?: number;
}

interface StrokeEntry {
  x1: number; y1: number; x2: number; y2: number;
  color: string; width: number;
  playerId: string; username: string;
}

interface RollBonus {
  label: string;
  value: number;
}

interface QueuedRoll {
  rollId: string;
  playerId: string;
  username: string;
  avatar?: string;
  die: string;
  sides: number;
  count: number;
  allRolls: number[];
  keptRolls: number[];
  total: number;
  isCritical: boolean;
  isFumble: boolean;
  advMode?: 'advantage' | 'disadvantage';
  unitId?: string;
  unitName?: string;
  dc?: number;
  bonuses?: RollBonus[];
  animationMs: number;
  presentationMs: number;
  rollInterpolationMode: RollInterpolationMode;
  timestamp: number;
}

interface PersistedLobbyState {
  strokeHistory: StrokeEntry[];
  seats: Seat[];
  dmPlayerId: string | null;
  dmSeatType: 'human' | 'ai';
  activeRoll: QueuedRoll | null;
  rollQueue: QueuedRoll[];
  rollInterpolationMode: RollInterpolationMode;
  autoStrictRttMs: number;
  autoStrictJitterMs: number;
}

const MAX_STROKE_HISTORY = 5000; // cap memory usage
const DEFAULT_SEAT_COUNT = 4;    // default player seats (DM is separate)
const MAX_SEATS = 8;             // hard cap on player seats

// Rate limit: max game_events per second per client
const RATE_LIMIT_WINDOW_MS = 1000;
const RATE_LIMIT_MAX_EVENTS = 10;
const DICE_STAGGER_MS = 500;
const MIN_ROLL_ANIMATION_MS = 900;
const MAX_ROLL_ANIMATION_MS = 10000;
const BASE_ROLL_HOLD_MS = 1000;
const OUTCOME_ANIMATION_EXTRA_MS = 1000;
const DEFAULT_AUTO_STRICT_RTT_MS = 260;
const DEFAULT_AUTO_STRICT_JITTER_MS = 90;

function normalizeInterpolationMode(mode: unknown): RollInterpolationMode {
  return mode === 'strict' || mode === 'auto' ? mode : 'smooth';
}

function clampThreshold(value: unknown, min: number, max: number, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

function getRollPresentationTiming(roll: {
  totalDice: number;
  advMode?: 'advantage' | 'disadvantage';
  bonuses?: RollBonus[];
  isCritical?: boolean;
  isFumble?: boolean;
}): { animationMs: number; presentationMs: number } {
  const bonusCount = roll.bonuses?.length || 0;
  const diceWeightMs = Math.min(roll.totalDice, 8) * 140;
  const advWeightMs = roll.advMode ? 260 : 0;
  const bonusWeightMs = Math.min(bonusCount, 6) * 140;
  const staggerWindowMs = Math.max(0, roll.totalDice - 1) * DICE_STAGGER_MS;
  const baseAnimationMs = MIN_ROLL_ANIMATION_MS + diceWeightMs + advWeightMs + bonusWeightMs;
  const animationMs = Math.min(
    MAX_ROLL_ANIMATION_MS,
    Math.max(MIN_ROLL_ANIMATION_MS, baseAnimationMs + staggerWindowMs),
  );
  return {
    animationMs,
    presentationMs:
      BASE_ROLL_HOLD_MS +
      animationMs +
      (roll.isCritical || roll.isFumble ? OUTCOME_ANIMATION_EXTRA_MS : 0),
  };
}

// DM-only message types that require authorization
const DM_MESSAGE_TYPES = new Set(['dm_narrate', 'dm_npc', 'dm_action', 'veto_roll', 'set_roll_interpolation_mode']);
// DM-only seat management messages (set_dm_type handled separately since it can un-DM the sender)
const DM_SEAT_MESSAGES = new Set(['set_seat_type', 'add_seat', 'remove_seat', 'kick_player']);

export class Lobby {
  state: DurableObjectState;
  env: unknown;
  sessions: Map<WebSocket, Session>;
  strokeHistory: StrokeEntry[];
  dmPlayerId: string | null; // first joiner becomes DM; reassigned on DM leave
  dmSeatType: 'human' | 'ai'; // DM can be human or AI-controlled
  seats: Seat[];               // player seats (DM is separate)
  activeRoll: QueuedRoll | null;
  rollQueue: QueuedRoll[];
  rollTimer: ReturnType<typeof setTimeout> | null;
  rollInterpolationMode: RollInterpolationMode;
  autoStrictRttMs: number;
  autoStrictJitterMs: number;

  constructor(state: DurableObjectState, env: unknown) {
    this.state = state;
    this.env = env;
    this.sessions = new Map();
    this.strokeHistory = [];
    this.dmPlayerId = null;
    this.dmSeatType = 'human';
    this.activeRoll = null;
    this.rollQueue = [];
    this.rollTimer = null;
    this.rollInterpolationMode = 'smooth';
    this.autoStrictRttMs = DEFAULT_AUTO_STRICT_RTT_MS;
    this.autoStrictJitterMs = DEFAULT_AUTO_STRICT_JITTER_MS;
    // Initialize default player seats — all empty
    this.seats = [];
    for (let i = 0; i < DEFAULT_SEAT_COUNT; i++) {
      this.seats.push({ id: `seat-${i}`, type: 'empty', ready: false });
    }
    this.state.blockConcurrencyWhile(async () => {
      await this.loadPersistedState();
    });
  }

  private async loadPersistedState() {
    const saved = await this.state.storage.get<PersistedLobbyState>('lobby_state');
    if (!saved) return;
    if (Array.isArray(saved.strokeHistory)) this.strokeHistory = saved.strokeHistory.slice(-MAX_STROKE_HISTORY);
    if (Array.isArray(saved.seats) && saved.seats.length > 0) this.seats = saved.seats;
    this.dmPlayerId = typeof saved.dmPlayerId === 'string' || saved.dmPlayerId === null ? saved.dmPlayerId : null;
    this.dmSeatType = saved.dmSeatType === 'ai' ? 'ai' : 'human';
    this.activeRoll = saved.activeRoll || null;
    if (this.activeRoll) {
      this.activeRoll.rollInterpolationMode = normalizeInterpolationMode(this.activeRoll.rollInterpolationMode);
    }
    this.rollQueue = Array.isArray(saved.rollQueue)
      ? saved.rollQueue.map((roll) => ({
        ...roll,
        rollInterpolationMode: normalizeInterpolationMode(roll.rollInterpolationMode),
      }))
      : [];
    this.rollInterpolationMode = normalizeInterpolationMode(saved.rollInterpolationMode);
    this.autoStrictRttMs = clampThreshold(saved.autoStrictRttMs, 120, 800, DEFAULT_AUTO_STRICT_RTT_MS);
    this.autoStrictJitterMs = clampThreshold(saved.autoStrictJitterMs, 20, 300, DEFAULT_AUTO_STRICT_JITTER_MS);

    if (this.activeRoll) {
      const elapsed = Math.max(0, Date.now() - this.activeRoll.timestamp);
      const remaining = this.activeRoll.presentationMs - elapsed;
      if (remaining <= 0) {
        this.activeRoll = null;
      } else {
        this.rollTimer = setTimeout(() => {
          this.finishActiveRoll('completed');
        }, remaining);
      }
    }

    if (!this.activeRoll && this.rollQueue.length > 0) {
      this.startNextRoll();
    }
  }

  private persistState() {
    const payload: PersistedLobbyState = {
      strokeHistory: this.strokeHistory,
      seats: this.seats,
      dmPlayerId: this.dmPlayerId,
      dmSeatType: this.dmSeatType,
      activeRoll: this.activeRoll,
      rollQueue: this.rollQueue,
      rollInterpolationMode: this.rollInterpolationMode,
      autoStrictRttMs: this.autoStrictRttMs,
      autoStrictJitterMs: this.autoStrictJitterMs,
    };
    this.state.storage.put('lobby_state', payload).catch(() => {});
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // WebSocket upgrade for real-time lobby
    if (request.headers.get('Upgrade') === 'websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      server.accept();
      // Session is created in the 'join' handler — we need the client's playerId claim first.
      // Store a temporary placeholder so we can still receive messages.
      const tempId = crypto.randomUUID();
      const now = Date.now();
      this.sessions.set(server, { id: tempId, username: 'Anonymous', joinedAt: now, spectating: false, lastGameEvents: [] });

      server.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data as string);
          const session = this.sessions.get(server);
          if (session) this.handleMessage(server, session.id, data);
        } catch {
          server.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
      });

      server.addEventListener('close', () => {
        const session = this.sessions.get(server);
        this.sessions.delete(server);
        if (session) {
          // Remove any queued/active rolls from this player
          this.rollQueue = this.rollQueue.filter((r) => r.playerId !== session.id);
          if (this.activeRoll?.playerId === session.id) {
            this.finishActiveRoll('disconnected');
          }

          // Revert seat to empty when player disconnects
          if (session.seatId) {
            const seat = this.seats.find((s) => s.id === session.seatId);
            if (seat && seat.type === 'human') {
              seat.type = 'empty';
              seat.playerId = undefined;
              seat.username = undefined;
              seat.avatar = undefined;
              seat.characterId = undefined;
              seat.characterName = undefined;
              seat.ready = false;
            }
          }

          this.persistState();

          this.broadcast({
            type: 'player_left',
            username: session.username,
            playerId: session.id,
            players: this.getPlayerList(),
            seats: this.seats,
            timestamp: Date.now(),
          });

          // DM reassignment: if the DM left, promote the oldest remaining player
          if (session.id === this.dmPlayerId) {
            this.dmPlayerId = null;
            let oldest: Session | null = null;
            for (const [, s] of this.sessions) {
              if (!oldest || s.joinedAt < oldest.joinedAt) oldest = s;
            }
            if (oldest) {
              this.dmPlayerId = oldest.id;
              this.broadcast({
                type: 'dm_changed',
                dmPlayerId: oldest.id,
                dmUsername: oldest.username,
                timestamp: Date.now(),
              });
            }
          }
        }
      });

      return new Response(null, { status: 101, webSocket: client });
    }

    // REST: get player list + seats + spectators
    if (url.pathname.endsWith('/players')) {
      return Response.json({
        players: this.getPlayerList(),
        seats: this.seats,
        spectators: this.getSpectatorList(),
        dmSeatType: this.dmSeatType,
        rollInterpolationMode: this.rollInterpolationMode,
        autoStrictRttMs: this.autoStrictRttMs,
        autoStrictJitterMs: this.autoStrictJitterMs,
      });
    }

    return Response.json({ status: 'ok', players: this.sessions.size, seats: this.seats.length });
  }

  private handleMessage(server: WebSocket, sessionId: string, data: Record<string, unknown>) {
    // Phase 8.3: DM auth — reject DM-only messages from non-DM players
    if (DM_MESSAGE_TYPES.has(data.type as string) || DM_SEAT_MESSAGES.has(data.type as string)) {
      const session = this.sessions.get(server);
      if (session && session.id !== this.dmPlayerId) {
        server.send(JSON.stringify({
          type: 'error',
          message: `Only the DM can send ${data.type} messages`,
          timestamp: Date.now(),
        }));
        return;
      }
    }

    switch (data.type) {
      case 'join': {
        const username = (data.username as string) || 'Anonymous';
        const avatar = (data.avatar as string) || undefined;
        const claimedId = data.playerId as string | undefined;

        // Reconnect detection: if the client claims a playerId, check if that ID
        // existed in a now-dead session. If so, reuse it for continuity.
        let finalId = sessionId;
        let isReconnect = false;
        if (claimedId) {
          // Check if any existing session has this ID (on a different, possibly dead socket)
          let existingSocket: WebSocket | null = null;
          for (const [ws, s] of this.sessions) {
            if (s.id === claimedId && ws !== server) {
              existingSocket = ws;
              break;
            }
          }
          if (existingSocket) {
            // Old socket exists — remove it and reuse the ID
            this.sessions.delete(existingSocket);
            try { existingSocket.close(); } catch { /* already dead */ }
            finalId = claimedId;
            isReconnect = true;
          } else {
            // No existing socket with this ID — still reuse the claimed ID
            // (client had it from a previous session that already closed)
            finalId = claimedId;
            isReconnect = true;
          }
        }

        // Auto-assign to a seat (skip if client explicitly wants to spectate)
        const wantsSpectate = !!(data.spectate);
        let assignedSeatId: string | undefined;
        if (!wantsSpectate) {
          if (isReconnect) {
            // Try to reclaim previous seat (check if a seat still has this playerId)
            const prevSeat = this.seats.find((s) => s.playerId === finalId);
            if (prevSeat) {
              prevSeat.type = 'human';
              prevSeat.username = username;
              prevSeat.avatar = avatar;
              assignedSeatId = prevSeat.id;
            }
          }
          if (!assignedSeatId) {
            // Claim first empty seat
            const emptySeat = this.seats.find((s) => s.type === 'empty');
            if (emptySeat) {
              emptySeat.type = 'human';
              emptySeat.playerId = finalId;
              emptySeat.username = username;
              emptySeat.avatar = avatar;
              emptySeat.ready = false;
              assignedSeatId = emptySeat.id;
            }
            // If no empty seats, player joins without a seat (spectator)
          }
        }

        const isSpectating = wantsSpectate || !assignedSeatId;
        this.sessions.set(server, { id: finalId, username, avatar, joinedAt: Date.now(), seatId: assignedSeatId, spectating: isSpectating && !assignedSeatId, lastGameEvents: [] });

        // DM assignment: first seated player to join becomes DM (spectators don't become DM)
        if (!this.dmPlayerId && this.dmSeatType === 'human' && !isSpectating) {
          this.dmPlayerId = finalId;
        }

        // Send current player list + seats + stroke history + DM info to the joining player
        server.send(
          JSON.stringify({
            type: 'welcome',
            playerId: finalId,
            players: this.getPlayerList(),
            seats: this.seats,
            spectators: this.getSpectatorList(),
            dmSeatType: this.dmSeatType,
            strokeHistory: this.strokeHistory,
            activeRoll: this.activeRoll,
            queuedRolls: this.rollQueue,
            rollInterpolationMode: this.rollInterpolationMode,
            autoStrictRttMs: this.autoStrictRttMs,
            autoStrictJitterMs: this.autoStrictJitterMs,
            isDM: finalId === this.dmPlayerId,
            dmPlayerId: this.dmPlayerId,
            seatId: assignedSeatId,
            isSpectating: isSpectating && !assignedSeatId,
            timestamp: Date.now(),
          })
        );

        const firstQueuedIdx = this.rollQueue.findIndex((r) => r.playerId === finalId);
        if (firstQueuedIdx >= 0) {
          server.send(JSON.stringify({
            type: 'roll_queued',
            rollId: this.rollQueue[firstQueuedIdx].rollId,
            position: firstQueuedIdx + 1,
            timestamp: Date.now(),
          }));
        }

        this.persistState();

        // Broadcast join/reconnect to everyone else
        this.broadcast({
          type: isReconnect ? 'player_reconnected' : 'player_joined',
          username,
          playerId: finalId,
          players: this.getPlayerList(),
          seats: this.seats,
          seatId: assignedSeatId,
          timestamp: Date.now(),
        }, server); // exclude sender
        break;
      }

      case 'chat': {
        const session = this.sessions.get(server);
        if (!session) return;
        const message = (data.message as string) || '';
        if (!message.trim()) return;

        this.broadcast({
          type: 'chat',
          playerId: session.id,
          username: session.username,
          avatar: session.avatar,
          message: message.trim(),
          timestamp: Date.now(),
        });
        break;
      }

      case 'chat_reaction': {
        // Broadcast emoji reaction to all clients (including sender for confirmation)
        const reactSession = this.sessions.get(server);
        if (!reactSession) return;
        const messageId = data.messageId as string;
        const emoji = data.emoji as string;
        if (!messageId || !emoji) return;
        this.broadcast({
          type: 'chat_reaction',
          playerId: reactSession.id,
          messageId,
          emoji,
          timestamp: Date.now(),
        });
        break;
      }

      case 'roll': {
        const session = this.sessions.get(server);
        if (!session) return;

        const sides = Math.min(Math.max(Number(data.sides) || 20, 2), 100);
        const die = (data.die as string) || `d${sides}`;
        const count = Math.min(Math.max(Number(data.count) || 1, 1), 10);
        const advMode = (data.advMode as string) || 'normal';

        // Advantage/disadvantage: roll 2× dice, keep best/worst half
        const totalDice = advMode !== 'normal' ? count * 2 : count;
        const allRolls: number[] = [];
        for (let i = 0; i < totalDice; i++) allRolls.push(Math.floor(Math.random() * sides) + 1);

        let keptRolls: number[];
        if (advMode === 'advantage') {
          keptRolls = [...allRolls].sort((a, b) => b - a).slice(0, count);
        } else if (advMode === 'disadvantage') {
          keptRolls = [...allRolls].sort((a, b) => a - b).slice(0, count);
        } else {
          keptRolls = allRolls;
        }
        const total = keptRolls.reduce((s, v) => s + v, 0);
        // Full crit/fumble: for d2 coin flips, only single-coin rolls can crit/fumble
        // (Heads(2)=success, Tails(1)=failure). For all other dice, crit=max and fumble=1.
        const isCoin = sides === 2;
        const isCritical = isCoin
          ? keptRolls.length === 1 && keptRolls[0] === 2
          : keptRolls.length > 0 && keptRolls.every((v) => v === sides);
        const isFumble = isCoin
          ? keptRolls.length === 1 && keptRolls[0] === 1
          : keptRolls.length > 0 && keptRolls.every((v) => v === 1);
        const bonuses = Array.isArray(data.bonuses) ? (data.bonuses as RollBonus[]) : undefined;
        const normalizedAdv = advMode === 'advantage' || advMode === 'disadvantage' ? advMode : undefined;
        const timing = getRollPresentationTiming({
          totalDice,
          advMode: normalizedAdv,
          bonuses,
          isCritical,
          isFumble,
        });

        const queuedRoll: QueuedRoll = {
          rollId: crypto.randomUUID(),
          playerId: session.id,
          username: session.username,
          avatar: session.avatar,
          die,
          sides,
          count,
          allRolls,
          keptRolls,
          total,
          isCritical,
          isFumble,
          advMode: normalizedAdv,
          unitId: (data.unitId as string) || undefined,
          unitName: (data.unitName as string) || undefined,
          dc: typeof data.dc === 'number' ? (data.dc as number) : undefined,
          bonuses,
          animationMs: timing.animationMs,
          presentationMs: timing.presentationMs,
          rollInterpolationMode: this.rollInterpolationMode,
          timestamp: Date.now(),
        };

        this.enqueueRoll(queuedRoll, server);
        break;
      }

      case 'veto_roll': {
        const vetoSession = this.sessions.get(server);
        if (!vetoSession || vetoSession.id !== this.dmPlayerId) {
          server.send(JSON.stringify({ type: 'error', message: 'Only the DM can veto rolls', timestamp: Date.now() }));
          return;
        }
        const rollId = data.rollId as string;
        if (!rollId || !this.activeRoll || this.activeRoll.rollId !== rollId) {
          server.send(JSON.stringify({ type: 'error', message: 'Active roll not found for veto', timestamp: Date.now() }));
          return;
        }

        this.broadcast({
          type: 'roll_vetoed',
          rollId,
          vetoedBy: vetoSession.username,
          timestamp: Date.now(),
        });

        if (this.rollTimer) {
          clearTimeout(this.rollTimer);
          this.rollTimer = null;
        }
        this.rollTimer = setTimeout(() => {
          this.finishActiveRoll('vetoed', vetoSession.username);
        }, 1000);
        break;
      }

      case 'draw': {
        // Broadcast draw stroke to all OTHER clients (not back to sender)
        const drawSession = this.sessions.get(server);
        if (!drawSession) return;
        // Store for late-join replay
        const stroke: StrokeEntry = {
          x1: data.x1 as number, y1: data.y1 as number,
          x2: data.x2 as number, y2: data.y2 as number,
          color: data.color as string, width: data.width as number,
          playerId: drawSession.id, username: drawSession.username,
        };
        this.strokeHistory.push(stroke);
        if (this.strokeHistory.length > MAX_STROKE_HISTORY) {
          this.strokeHistory = this.strokeHistory.slice(-MAX_STROKE_HISTORY);
        }
        this.persistState();
        const payload = JSON.stringify({
          type: 'draw',
          playerId: drawSession.id,
          username: drawSession.username,
          x1: data.x1,
          y1: data.y1,
          x2: data.x2,
          y2: data.y2,
          color: data.color,
          width: data.width,
        });
        for (const [ws] of this.sessions) {
          if (ws === server) continue; // don't echo back to sender
          try { ws.send(payload); } catch { /* dead socket */ }
        }
        break;
      }

      case 'clear_canvas': {
        // Clear stroke history and broadcast canvas clear to all OTHER clients
        this.strokeHistory = [];
        this.persistState();
        const clearPayload = JSON.stringify({ type: 'clear_canvas' });
        for (const [ws] of this.sessions) {
          if (ws === server) continue;
          try { ws.send(clearPayload); } catch { /* dead socket */ }
        }
        break;
      }

      case 'dm_narrate': {
        // Broadcast DM narration to ALL players so everyone sees the same story
        const dmSession = this.sessions.get(server);
        if (!dmSession) return;
        this.broadcast({
          type: 'dm_narrate',
          playerId: dmSession.id,
          username: dmSession.username,
          narration: data.narration,
          timestamp: Date.now(),
        });
        break;
      }

      case 'dm_npc': {
        // Broadcast NPC dialogue to all players
        const npcSession = this.sessions.get(server);
        if (!npcSession) return;
        this.broadcast({
          type: 'dm_npc',
          playerId: npcSession.id,
          username: npcSession.username,
          npcName: data.npcName,
          dialogue: data.dialogue,
          timestamp: Date.now(),
        });
        break;
      }

      case 'dm_action': {
        // Broadcast a player's action to all players (so everyone sees what they did)
        const actionSession = this.sessions.get(server);
        if (!actionSession) return;
        this.broadcast({
          type: 'dm_action',
          playerId: actionSession.id,
          username: actionSession.username,
          characterName: data.characterName,
          action: data.action,
          timestamp: Date.now(),
        });
        break;
      }

      case 'game_event': {
        // Relay game state events to all OTHER clients (sender already applied locally).
        // The DO is a dumb pipe — it doesn't parse event subtypes.
        const geSession = this.sessions.get(server);
        if (!geSession) return;

        // Phase 8.4: Rate limiting — max RATE_LIMIT_MAX_EVENTS per RATE_LIMIT_WINDOW_MS
        const now = Date.now();
        geSession.lastGameEvents = geSession.lastGameEvents.filter(
          (t) => now - t < RATE_LIMIT_WINDOW_MS
        );
        if (geSession.lastGameEvents.length >= RATE_LIMIT_MAX_EVENTS) {
          server.send(JSON.stringify({
            type: 'error',
            message: 'Rate limit exceeded — too many game events',
            timestamp: now,
          }));
          return;
        }
        geSession.lastGameEvents.push(now);

        const gePayload = JSON.stringify({
          type: 'game_event',
          playerId: geSession.id,
          event: data.event,
          data: data.data,
          timestamp: Date.now(),
        });
        for (const [ws] of this.sessions) {
          if (ws === server) continue;
          try { ws.send(gePayload); } catch { /* dead socket */ }
        }
        break;
      }

      case 'state_request': {
        // A client (usually a late joiner) wants the current game state.
        // Relay to all OTHER clients — whichever has state will respond with state_response.
        const srSession = this.sessions.get(server);
        if (!srSession) return;
        const srPayload = JSON.stringify({
          type: 'state_request',
          playerId: srSession.id,
          timestamp: Date.now(),
        });
        for (const [ws] of this.sessions) {
          if (ws === server) continue;
          try { ws.send(srPayload); } catch { /* dead socket */ }
        }
        break;
      }

      case 'state_response': {
        // A client responding to a state_request. Route to the requester only.
        const respSession = this.sessions.get(server);
        if (!respSession) return;
        const targetPlayerId = data.targetPlayerId as string;
        if (!targetPlayerId) return;
        const responsePayload = JSON.stringify({
          type: 'state_response',
          playerId: respSession.id,
          data: data.data,
          timestamp: Date.now(),
        });
        for (const [ws, session] of this.sessions) {
          if (session.id === targetPlayerId) {
            try { ws.send(responsePayload); } catch { /* dead socket */ }
            break;
          }
        }
        break;
      }

      // --- Seat management messages ---

      case 'ready': {
        // Player toggles their ready state
        const readySession = this.sessions.get(server);
        if (!readySession?.seatId) {
          server.send(JSON.stringify({ type: 'error', message: 'You are not in a seat', timestamp: Date.now() }));
          return;
        }
        const readySeat = this.seats.find((s) => s.id === readySession.seatId);
        if (!readySeat) return;
        readySeat.ready = !readySeat.ready;
        this.persistState();
        this.broadcast({ type: 'seats_updated', seats: this.seats, timestamp: Date.now() });
        break;
      }

      case 'select_character': {
        // Player selects which character they're playing in this session
        const charSession = this.sessions.get(server);
        if (!charSession?.seatId) {
          server.send(JSON.stringify({ type: 'error', message: 'You are not in a seat', timestamp: Date.now() }));
          return;
        }
        const charSeat = this.seats.find((s) => s.id === charSession.seatId);
        if (!charSeat) return;
        charSeat.characterId = (data.characterId as string) || undefined;
        charSeat.characterName = (data.characterName as string) || undefined;
        this.persistState();
        this.broadcast({ type: 'seats_updated', seats: this.seats, timestamp: Date.now() });
        break;
      }

      case 'set_seat_type': {
        // DM changes a seat's type (empty <-> ai). Can't change occupied human seats.
        const targetSeatId = data.seatId as string;
        const newType = data.seatType as SeatType;
        if (!targetSeatId || !newType || !['empty', 'ai'].includes(newType)) {
          server.send(JSON.stringify({ type: 'error', message: 'Invalid seat type — must be "empty" or "ai"', timestamp: Date.now() }));
          return;
        }
        const targetSeat = this.seats.find((s) => s.id === targetSeatId);
        if (!targetSeat) {
          server.send(JSON.stringify({ type: 'error', message: 'Seat not found', timestamp: Date.now() }));
          return;
        }
        if (targetSeat.type === 'human' && targetSeat.playerId) {
          server.send(JSON.stringify({ type: 'error', message: 'Cannot change an occupied human seat — player must leave first', timestamp: Date.now() }));
          return;
        }
        targetSeat.type = newType;
        targetSeat.ready = newType === 'ai'; // AI seats auto-ready
        if (newType === 'ai') {
          targetSeat.playerId = undefined;
          targetSeat.username = 'AI Player';
          targetSeat.avatar = undefined;
          targetSeat.characterId = undefined;
          targetSeat.characterName = undefined;
        } else {
          // empty
          targetSeat.playerId = undefined;
          targetSeat.username = undefined;
          targetSeat.avatar = undefined;
          targetSeat.characterId = undefined;
          targetSeat.characterName = undefined;
          targetSeat.ready = false;
        }
        this.persistState();
        this.broadcast({ type: 'seats_updated', seats: this.seats, timestamp: Date.now() });
        break;
      }

      case 'add_seat': {
        // DM adds a new empty seat
        if (this.seats.length >= MAX_SEATS) {
          server.send(JSON.stringify({ type: 'error', message: `Maximum ${MAX_SEATS} seats allowed`, timestamp: Date.now() }));
          return;
        }
        const newSeatId = `seat-${this.seats.length}`;
        this.seats.push({ id: newSeatId, type: 'empty', ready: false });
        this.persistState();
        this.broadcast({ type: 'seats_updated', seats: this.seats, timestamp: Date.now() });
        break;
      }

      case 'remove_seat': {
        // DM removes the last empty/AI seat (can't remove occupied human seats)
        if (this.seats.length <= 1) {
          server.send(JSON.stringify({ type: 'error', message: 'Must have at least 1 seat', timestamp: Date.now() }));
          return;
        }
        const removeSeatId = data.seatId as string;
        const removeSeat = removeSeatId
          ? this.seats.find((s) => s.id === removeSeatId)
          : this.seats[this.seats.length - 1]; // default: last seat
        if (!removeSeat) {
          server.send(JSON.stringify({ type: 'error', message: 'Seat not found', timestamp: Date.now() }));
          return;
        }
        if (removeSeat.type === 'human' && removeSeat.playerId) {
          server.send(JSON.stringify({ type: 'error', message: 'Cannot remove an occupied seat', timestamp: Date.now() }));
          return;
        }
        this.seats = this.seats.filter((s) => s.id !== removeSeat.id);
        this.persistState();
        this.broadcast({ type: 'seats_updated', seats: this.seats, timestamp: Date.now() });
        break;
      }

      case 'kick_player': {
        // DM kicks a player from their seat (vacates seat, closes their WebSocket)
        const kickPlayerId = data.playerId as string;
        if (!kickPlayerId) {
          server.send(JSON.stringify({ type: 'error', message: 'playerId is required', timestamp: Date.now() }));
          return;
        }
        // Can't kick yourself
        const kickerSession = this.sessions.get(server);
        if (kickerSession && kickerSession.id === kickPlayerId) {
          server.send(JSON.stringify({ type: 'error', message: 'Cannot kick yourself', timestamp: Date.now() }));
          return;
        }
        // Find the target player's WebSocket and seat
        let targetWs: WebSocket | null = null;
        let targetSession: Session | null = null;
        for (const [ws, s] of this.sessions) {
          if (s.id === kickPlayerId) { targetWs = ws; targetSession = s; break; }
        }
        if (!targetSession) {
          server.send(JSON.stringify({ type: 'error', message: 'Player not found', timestamp: Date.now() }));
          return;
        }
        // Vacate their seat
        if (targetSession.seatId) {
          const seat = this.seats.find((s) => s.id === targetSession!.seatId);
          if (seat) {
            seat.type = 'empty';
            seat.playerId = undefined;
            seat.username = undefined;
            seat.avatar = undefined;
            seat.characterId = undefined;
            seat.characterName = undefined;
            seat.ready = false;
          }
        }
        // Remove session and close socket
        this.sessions.delete(targetWs!);
        try {
          targetWs!.send(JSON.stringify({ type: 'kicked', message: 'You have been kicked by the DM', timestamp: Date.now() }));
          targetWs!.close();
        } catch { /* already dead */ }
        this.persistState();
        // Broadcast updated state
        this.broadcast({
          type: 'player_kicked',
          username: targetSession.username,
          playerId: kickPlayerId,
          players: this.getPlayerList(),
          seats: this.seats,
          timestamp: Date.now(),
        });
        break;
      }

      case 'set_dm_type': {
        // Toggle DM seat between human and AI.
        // Auth: current DM can switch to AI. When DM is AI, any player can claim human DM.
        const dmType = data.dmSeatType as string;
        if (dmType !== 'human' && dmType !== 'ai') {
          server.send(JSON.stringify({ type: 'error', message: 'dmSeatType must be "human" or "ai"', timestamp: Date.now() }));
          return;
        }
        const senderSession = this.sessions.get(server);
        if (!senderSession) return;
        if (dmType === 'ai') {
          // Only current human DM can abdicate to AI
          if (senderSession.id !== this.dmPlayerId) {
            server.send(JSON.stringify({ type: 'error', message: 'Only the DM can switch to AI DM', timestamp: Date.now() }));
            return;
          }
          this.dmSeatType = 'ai';
          this.dmPlayerId = null;
        } else {
          // Anyone can claim human DM when current DM is AI (or if no DM)
          if (this.dmSeatType !== 'ai' && this.dmPlayerId && senderSession.id !== this.dmPlayerId) {
            server.send(JSON.stringify({ type: 'error', message: 'DM seat is already occupied by a human', timestamp: Date.now() }));
            return;
          }
          this.dmSeatType = 'human';
          this.dmPlayerId = senderSession.id;
        }
        this.persistState();
        this.broadcast({
          type: 'dm_type_changed',
          dmSeatType: this.dmSeatType,
          dmPlayerId: this.dmPlayerId,
          timestamp: Date.now(),
        });
        break;
      }

      case 'set_roll_interpolation_mode': {
        const mode = data.rollInterpolationMode as string;
        if (mode !== 'smooth' && mode !== 'strict' && mode !== 'auto') {
          server.send(JSON.stringify({ type: 'error', message: 'rollInterpolationMode must be "smooth", "strict", or "auto"', timestamp: Date.now() }));
          return;
        }
        this.rollInterpolationMode = mode;
        this.autoStrictRttMs = clampThreshold(data.autoStrictRttMs, 120, 800, this.autoStrictRttMs);
        this.autoStrictJitterMs = clampThreshold(data.autoStrictJitterMs, 20, 300, this.autoStrictJitterMs);
        this.persistState();
        this.broadcast({
          type: 'roll_interpolation_mode_changed',
          rollInterpolationMode: this.rollInterpolationMode,
          autoStrictRttMs: this.autoStrictRttMs,
          autoStrictJitterMs: this.autoStrictJitterMs,
          timestamp: Date.now(),
        });
        break;
      }

      case 'transfer_dm': {
        // Only current DM can transfer the role
        const transferSession = this.sessions.get(server);
        if (!transferSession || transferSession.id !== this.dmPlayerId) {
          server.send(JSON.stringify({ type: 'error', message: 'Only the DM can transfer the role', timestamp: Date.now() }));
          return;
        }
        const targetId = data.targetPlayerId as string;
        if (!targetId) return;
        // Verify target exists
        let targetSession: Session | null = null;
        for (const [, s] of this.sessions) {
          if (s.id === targetId) { targetSession = s; break; }
        }
        if (!targetSession) {
          server.send(JSON.stringify({ type: 'error', message: 'Target player not found', timestamp: Date.now() }));
          return;
        }
        this.dmPlayerId = targetId;
        this.persistState();
        this.broadcast({
          type: 'dm_changed',
          dmPlayerId: targetId,
          dmUsername: targetSession.username,
          timestamp: Date.now(),
        });
        break;
      }

      case 'spectate': {
        // Player explicitly switches to spectator mode — vacates their seat
        const specSession = this.sessions.get(server);
        if (!specSession) return;
        // Can't spectate if you're the DM (must transfer or switch to AI DM first)
        if (specSession.id === this.dmPlayerId) {
          server.send(JSON.stringify({ type: 'error', message: 'DM cannot spectate — transfer DM or switch to AI DM first', timestamp: Date.now() }));
          return;
        }
        // Vacate seat if in one
        if (specSession.seatId) {
          const seat = this.seats.find((s) => s.id === specSession.seatId);
          if (seat && seat.type === 'human') {
            seat.type = 'empty';
            seat.playerId = undefined;
            seat.username = undefined;
            seat.avatar = undefined;
            seat.characterId = undefined;
            seat.characterName = undefined;
            seat.ready = false;
          }
          specSession.seatId = undefined;
        }
        specSession.spectating = true;
        this.persistState();
        server.send(JSON.stringify({ type: 'spectate_confirmed', timestamp: Date.now() }));
        this.broadcast({ type: 'seats_updated', seats: this.seats, spectators: this.getSpectatorList(), timestamp: Date.now() });
        break;
      }

      case 'claim_seat': {
        // Spectator claims an empty seat to join as a player
        const claimSession = this.sessions.get(server);
        if (!claimSession) return;
        const claimSeatId = data.seatId as string;
        const claimSeat = claimSeatId
          ? this.seats.find((s) => s.id === claimSeatId)
          : this.seats.find((s) => s.type === 'empty');
        if (!claimSeat || claimSeat.type !== 'empty') {
          server.send(JSON.stringify({ type: 'error', message: 'No empty seat available', timestamp: Date.now() }));
          return;
        }
        claimSeat.type = 'human';
        claimSeat.playerId = claimSession.id;
        claimSeat.username = claimSession.username;
        claimSeat.avatar = claimSession.avatar;
        claimSeat.ready = false;
        claimSession.seatId = claimSeat.id;
        claimSession.spectating = false;
        this.persistState();
        server.send(JSON.stringify({ type: 'seat_claimed', seatId: claimSeat.id, timestamp: Date.now() }));
        this.broadcast({ type: 'seats_updated', seats: this.seats, spectators: this.getSpectatorList(), timestamp: Date.now() });
        break;
      }

      case 'whisper': {
        // Private message: sender → specific target player only
        const whisperSession = this.sessions.get(server);
        if (!whisperSession) return;
        const whisperMessage = (data.message as string) || '';
        const targetUsername = (data.targetUsername as string) || '';
        if (!whisperMessage.trim() || !targetUsername.trim()) {
          server.send(JSON.stringify({ type: 'error', message: 'Whisper requires targetUsername and message', timestamp: Date.now() }));
          return;
        }
        // Find target by username (case-insensitive)
        let targetWs: WebSocket | null = null;
        let targetSess: Session | null = null;
        for (const [ws, s] of this.sessions) {
          if (s.username.toLowerCase() === targetUsername.toLowerCase()) {
            targetWs = ws;
            targetSess = s;
            break;
          }
        }
        if (!targetWs || !targetSess) {
          server.send(JSON.stringify({ type: 'error', message: `Player "${targetUsername}" not found`, timestamp: Date.now() }));
          return;
        }
        const whisperPayload = {
          type: 'whisper',
          playerId: whisperSession.id,
          username: whisperSession.username,
          avatar: whisperSession.avatar,
          targetPlayerId: targetSess.id,
          targetUsername: targetSess.username,
          message: whisperMessage.trim(),
          timestamp: Date.now(),
        };
        // Send to target
        try { targetWs.send(JSON.stringify(whisperPayload)); } catch { /* dead socket */ }
        // Echo back to sender so they see their own whisper
        try { server.send(JSON.stringify(whisperPayload)); } catch { /* dead socket */ }
        break;
      }

      case 'typing': {
        // Relay typing indicator to all OTHER clients (not back to sender)
        const typingSession = this.sessions.get(server);
        if (!typingSession) break;
        const typingPayload = JSON.stringify({
          type: 'typing',
          playerId: typingSession.id,
          username: typingSession.username,
          timestamp: Date.now(),
        });
        for (const [ws] of this.sessions) {
          if (ws === server) continue;
          try { ws.send(typingPayload); } catch { /* dead socket */ }
        }
        break;
      }

      case 'report_rtt': {
        // Client reports its computed RTT — store on session and broadcast latency update
        const rtt = Number(data.rttMs);
        const rttSession = this.sessions.get(server);
        if (rttSession && Number.isFinite(rtt) && rtt >= 0 && rtt <= 30000) {
          rttSession.rttMs = Math.round(rtt);
          // Broadcast latency snapshot to all (throttled by client ping interval ~25s)
          const latencyMap: Record<string, number> = {};
          for (const s of this.sessions.values()) {
            if (s.rttMs !== undefined) latencyMap[s.id] = s.rttMs;
          }
          this.broadcast({ type: 'latency_update', latency: latencyMap, timestamp: Date.now() });
        }
        break;
      }

      case 'ping': {
        const clientTs = typeof data.clientTs === 'number' ? (data.clientTs as number) : undefined;
        server.send(JSON.stringify({ type: 'pong', timestamp: Date.now(), clientTs }));
        break;
      }

      default:
        server.send(JSON.stringify({ type: 'error', message: `Unknown message type: ${data.type}` }));
    }
  }

  private broadcast(message: object, exclude?: WebSocket) {
    const payload = JSON.stringify(message);
    for (const [ws] of this.sessions) {
      if (ws === exclude) continue;
      try {
        ws.send(payload);
      } catch {
        // dead socket — will be cleaned up on close event
      }
    }
  }

  private enqueueRoll(roll: QueuedRoll, server?: WebSocket) {
    if (!this.activeRoll) {
      const startedAt = Date.now();
      roll.timestamp = startedAt;
      this.activeRoll = roll;
      this.broadcast({
        type: 'roll_result',
        rollId: roll.rollId,
        playerId: roll.playerId,
        username: roll.username,
        avatar: roll.avatar,
        die: roll.die,
        sides: roll.sides,
        count: roll.count,
        allRolls: roll.allRolls,
        keptRolls: roll.keptRolls,
        total: roll.total,
        value: roll.total,
        isCritical: roll.isCritical,
        isFumble: roll.isFumble,
        advMode: roll.advMode,
        unitId: roll.unitId,
        unitName: roll.unitName,
        dc: roll.dc,
        bonuses: roll.bonuses,
        animationMs: roll.animationMs,
        presentationMs: roll.presentationMs,
        rollInterpolationMode: roll.rollInterpolationMode,
        timestamp: roll.timestamp,
      });
      this.rollTimer = setTimeout(() => {
        this.finishActiveRoll('completed');
      }, roll.presentationMs);
      this.persistState();
      return;
    }

    this.rollQueue.push(roll);
    this.persistState();
    if (server) {
      try {
        server.send(JSON.stringify({
          type: 'roll_queued',
          rollId: roll.rollId,
          position: this.rollQueue.length,
          timestamp: Date.now(),
        }));
      } catch {
        // ignore
      }
    }
  }

  private startNextRoll() {
    if (this.activeRoll || this.rollQueue.length === 0) return;
    const next = this.rollQueue.shift();
    if (!next) return;
    this.enqueueRoll(next);
  }

  private finishActiveRoll(reason: 'completed' | 'vetoed' | 'disconnected', vetoedBy?: string) {
    if (!this.activeRoll) return;
    const finishedRoll = this.activeRoll;
    this.activeRoll = null;
    if (this.rollTimer) {
      clearTimeout(this.rollTimer);
      this.rollTimer = null;
    }

    this.broadcast({
      type: 'roll_cleared',
      rollId: finishedRoll.rollId,
      reason,
      vetoedBy,
      timestamp: Date.now(),
    });

    this.persistState();
    this.startNextRoll();
  }

  private getPlayerList(): PlayerInfo[] {
    return Array.from(this.sessions.values()).map((s) => {
      const seat = s.seatId ? this.seats.find((st) => st.id === s.seatId) : undefined;
      return {
        id: s.id,
        username: s.username,
        avatar: s.avatar,
        joinedAt: s.joinedAt,
        isDM: s.id === this.dmPlayerId,
        seatId: s.seatId,
        ready: seat?.ready,
        characterId: seat?.characterId,
        characterName: seat?.characterName,
        rttMs: s.rttMs,
      };
    });
  }

  private getSpectatorList(): { id: string; username: string; avatar?: string }[] {
    return Array.from(this.sessions.values())
      .filter((s) => s.spectating || !s.seatId)
      .map((s) => ({ id: s.id, username: s.username, avatar: s.avatar }));
  }
}
