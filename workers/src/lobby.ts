// packages/worker/lobby.ts

import { RoomState, Message, Player } from './types';

export class Lobby {
  state: DurableObjectState;
  storage: DurableObjectStorage;
  room: RoomState;
  sockets: Map<WebSocket, string>;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.storage = state.storage;
    this.room = { players: {}, log: [] };
    this.sockets = new Map();
  }

  async fetch(req: Request): Promise<Response> {
    const upgradeHeader = req.headers.get('Upgrade');
    if (upgradeHeader === 'websocket') {
      const [client, server] = Object.values(new WebSocketPair());
      await this.handleWebSocket(server);
      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }

    // Debug endpoint to inspect current state
    if (new URL(req.url).pathname === '/state') {
      return Response.json(this.room);
    }

    return new Response('Expected WebSocket', { status: 400 });
  }

  async handleWebSocket(ws: WebSocket) {
    ws.accept();

    ws.addEventListener('message', (evt) => {
      try {
        const msg = JSON.parse(evt.data as string) as Message;
        this.handleMessage(msg, ws);
      } catch (err) {
        ws.send(JSON.stringify({ error: 'Invalid message format' }));
      }
    });

    ws.addEventListener('close', () => {
      const playerId = this.sockets.get(ws);
      if (playerId) {
        delete this.room.players[playerId];
        this.broadcast({ type: 'leave', playerId });
        this.room.log.push(`${playerId} disconnected`);
        this.sockets.delete(ws);
      }
    });
  }

  handleMessage(msg: Message, ws: WebSocket) {
    switch (msg.type) {
      case 'join': {
        this.room.players[msg.player.id] = msg.player;
        this.sockets.set(ws, msg.player.id);
        this.room.log.push(`${msg.player.name} joined`);
        this.broadcast(msg);
        break;
      }
      case 'leave': {
        delete this.room.players[msg.playerId];
        this.room.log.push(`${msg.playerId} left`);
        this.broadcast(msg);
        break;
      }
      case 'update': {
        const existing = this.room.players[msg.player.id];
        if (existing) {
          this.room.players[msg.player.id] = { ...existing, ...msg.player };
          this.broadcast(msg);
        }
        break;
      }
      case 'chat': {
        this.room.log.push(`${msg.playerId}: ${msg.message}`);
        this.broadcast(msg);
        break;
      }
    }
  }

  broadcast(msg: Message) {
    const str = JSON.stringify(msg);
    for (const socket of this.sockets.keys()) {
      try {
        socket.send(str);
      } catch {
        this.sockets.delete(socket);
      }
    }
  }
}
