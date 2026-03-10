// Lobby Durable Object — real-time multiplayer room via WebSocket.
// Handles player sessions, chat, dice rolls (with full metadata), and system events.
/// <reference types="@cloudflare/workers-types" />

interface Session {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
}

interface PlayerInfo {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
}

export class Lobby {
  state: DurableObjectState;
  env: unknown;
  sessions: Map<WebSocket, Session>;

  constructor(state: DurableObjectState, env: unknown) {
    this.state = state;
    this.env = env;
    this.sessions = new Map();
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // WebSocket upgrade for real-time lobby
    if (request.headers.get('Upgrade') === 'websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      server.accept();
      const sessionId = crypto.randomUUID();
      const now = Date.now();
      this.sessions.set(server, { id: sessionId, username: 'Anonymous', joinedAt: now });

      server.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data as string);
          this.handleMessage(server, sessionId, data);
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
    switch (data.type) {
      case 'join': {
        const username = (data.username as string) || 'Anonymous';
        const avatar = (data.avatar as string) || undefined;
        this.sessions.set(server, { id: sessionId, username, avatar, joinedAt: Date.now() });

        // Send current player list to the joining player
        server.send(
          JSON.stringify({
            type: 'welcome',
            playerId: sessionId,
            players: this.getPlayerList(),
            timestamp: Date.now(),
          })
        );

        // Broadcast join to everyone else
        this.broadcast({
          type: 'player_joined',
          username,
          playerId: sessionId,
          players: this.getPlayerList(),
          timestamp: Date.now(),
        });
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
        const payload = JSON.stringify({
          type: 'draw',
          playerId: drawSession.id,
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
        // Broadcast canvas clear to all OTHER clients
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

      case 'ping': {
        server.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        break;
      }

      default:
        server.send(JSON.stringify({ type: 'error', message: `Unknown message type: ${data.type}` }));
    }
  }

  private broadcast(message: object) {
    const payload = JSON.stringify(message);
    for (const [ws] of this.sessions) {
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
    }));
  }
}
