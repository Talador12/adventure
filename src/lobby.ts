// Lobby Durable Object — real-time multiplayer room via WebSocket.
// Handles player sessions, chat, dice rolls (with full metadata), and system events.
/// <reference types="@cloudflare/workers-types" />

interface Session {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
  lastGameEvents: number[]; // timestamps for rate limiting (Phase 8.4)
}

interface PlayerInfo {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
  isDM?: boolean;
}

interface StrokeEntry {
  x1: number; y1: number; x2: number; y2: number;
  color: string; width: number;
  playerId: string; username: string;
}

const MAX_STROKE_HISTORY = 5000; // cap memory usage

// Rate limit: max game_events per second per client
const RATE_LIMIT_WINDOW_MS = 1000;
const RATE_LIMIT_MAX_EVENTS = 10;

// DM-only message types that require authorization
const DM_MESSAGE_TYPES = new Set(['dm_narrate', 'dm_npc', 'dm_action']);

export class Lobby {
  state: DurableObjectState;
  env: unknown;
  sessions: Map<WebSocket, Session>;
  strokeHistory: StrokeEntry[];
  dmPlayerId: string | null; // first joiner becomes DM; reassigned on DM leave

  constructor(state: DurableObjectState, env: unknown) {
    this.state = state;
    this.env = env;
    this.sessions = new Map();
    this.strokeHistory = [];
    this.dmPlayerId = null;
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
      this.sessions.set(server, { id: tempId, username: 'Anonymous', joinedAt: now, lastGameEvents: [] });

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
          this.broadcast({
            type: 'player_left',
            username: session.username,
            playerId: session.id,
            players: this.getPlayerList(),
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

    // REST: get player list
    if (url.pathname.endsWith('/players')) {
      return Response.json({ players: this.getPlayerList() });
    }

    return Response.json({ status: 'ok', players: this.sessions.size });
  }

  private handleMessage(server: WebSocket, sessionId: string, data: Record<string, unknown>) {
    // Phase 8.3: DM auth — reject DM-only messages from non-DM players
    if (DM_MESSAGE_TYPES.has(data.type as string)) {
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

        this.sessions.set(server, { id: finalId, username, avatar, joinedAt: Date.now(), lastGameEvents: [] });

        // DM assignment: first player to join becomes DM
        if (!this.dmPlayerId) {
          this.dmPlayerId = finalId;
        }

        // Send current player list + stroke history + DM info to the joining player
        server.send(
          JSON.stringify({
            type: 'welcome',
            playerId: finalId,
            players: this.getPlayerList(),
            strokeHistory: this.strokeHistory,
            isDM: finalId === this.dmPlayerId,
            dmPlayerId: this.dmPlayerId,
            timestamp: Date.now(),
          })
        );

        // Broadcast join/reconnect to everyone else
        this.broadcast({
          type: isReconnect ? 'player_reconnected' : 'player_joined',
          username,
          playerId: finalId,
          players: this.getPlayerList(),
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

      case 'roll': {
        const session = this.sessions.get(server);
        if (!session) return;

        const sides = Math.min(Math.max(Number(data.sides) || 20, 2), 100);
        const die = (data.die as string) || `d${sides}`;
        const value = Math.floor(Math.random() * sides) + 1;
        const isCritical = value === sides;
        const isFumble = value === 1;

        this.broadcast({
          type: 'roll_result',
          playerId: session.id,
          username: session.username,
          avatar: session.avatar,
          die,
          sides,
          value,
          isCritical,
          isFumble,
          unitId: (data.unitId as string) || undefined,
          unitName: (data.unitName as string) || undefined,
          timestamp: Date.now(),
        });
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

      case 'ping': {
        server.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
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

  private getPlayerList(): PlayerInfo[] {
    return Array.from(this.sessions.values()).map((s) => ({
      id: s.id,
      username: s.username,
      avatar: s.avatar,
      joinedAt: s.joinedAt,
      isDM: s.id === this.dmPlayerId,
    }));
  }
}
