import { Lobby } from './src/lobby';

export { Lobby };

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);

    // Serve static assets by default
    if (!url.pathname.startsWith('/api')) {
      return env.ASSETS.fetch(req);
    }

    // Handle API requests via Durable Object
    const roomId = url.searchParams.get('room') || 'default';
    const id = env.LOBBY.idFromName(roomId);
    const obj = env.LOBBY.get(id);
    return obj.fetch(req);
  },
};
