import { Hono } from 'hono';
import { Lobby } from "./lobby";
import characterApp from './character_creation';

export { Lobby };

const app = new Hono<{ Bindings: Env }>();

// Mount character creation routes
app.route('/character', characterApp);

// Lobby routes (Durable Objects)
app.all('/lobby', async (c) => {
  const roomId = c.req.query('room') || 'default';
  const id = c.env.LOBBY.idFromName(roomId);
  const obj = c.env.LOBBY.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
