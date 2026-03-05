// Lobby Durable Object - real-time multiplayer room via WebSocket
/// <reference types="@cloudflare/workers-types" />

interface Session {
  id: string;
  username: string;
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
      this.sessions.set(server, { id: sessionId, username: 'Anonymous' });

      server.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data as string);
          switch (data.type) {
            case 'join':
              this.sessions.set(server, { id: sessionId, username: data.username || 'Anonymous' });
              this.broadcast({ type: 'player_joined', username: data.username, players: this.getPlayerList() });
              break;
            case 'chat':
              this.broadcast({
                type: 'chat',
                username: this.sessions.get(server)?.username,
                message: data.message,
                timestamp: Date.now(),
              });
              break;
            case 'roll': {
              const result = this.rollDice(data.dice || 20, data.count || 1);
              this.broadcast({ type: 'roll_result', username: this.sessions.get(server)?.username, ...result });
              break;
            }
            default:
              server.send(JSON.stringify({ type: 'error', message: `Unknown message type: ${data.type}` }));
          }
        } catch {
          server.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
      });

      server.addEventListener('close', () => {
        const session = this.sessions.get(server);
        this.sessions.delete(server);
        this.broadcast({ type: 'player_left', username: session?.username, players: this.getPlayerList() });
      });

      return new Response(null, { status: 101, webSocket: client });
    }

    // REST: get player list
    if (url.pathname.endsWith('/players')) {
      return Response.json({ players: this.getPlayerList() });
    }

    return Response.json({ status: 'ok', players: this.sessions.size });
  }

  private broadcast(message: object) {
    const payload = JSON.stringify(message);
    for (const [ws] of this.sessions) {
      try {
        ws.send(payload);
      } catch {
        // dead socket, will be cleaned up on close
      }
    }
  }

  private getPlayerList() {
    return Array.from(this.sessions.values()).map((s) => ({ id: s.id, username: s.username }));
  }

  private rollDice(sides: number, count: number) {
    const rolls = Array.from({ length: Math.min(count, 20) }, () => Math.floor(Math.random() * sides) + 1);
    return { dice: `d${sides}`, count, rolls, total: rolls.reduce((a, b) => a + b, 0) };
  }
}
