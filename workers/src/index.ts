import { Lobby } from './lobby';

export { Lobby };

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(req.url);

    if (url.pathname.startsWith('/api')) {
      const roomId = url.searchParams.get('room') || 'default';
      const id = env.LOBBY.idFromName(roomId);
      const obj = env.LOBBY.get(id);
      return obj.fetch(req);
    }

    // Let static assets (HTML, CSS, JS) pass through
    return new Response('Not Found', { status: 404 });
  },
};
