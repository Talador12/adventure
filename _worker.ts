import { Hono } from 'hono';
import { Lobby } from './src/lobby';
import type { ExecutionContext, DurableObjectNamespace } from '@cloudflare/workers-types';
import { encodeUrl } from 'hono/utils/url';
import { SignJWT, jwtVerify } from 'jose';

interface Env {
  LOBBY: DurableObjectNamespace;
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

// Google OAuth endpoints
const GOOGLE_AUTH_URI = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URI = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URI = 'https://openidconnect.googleapis.com/v1/userinfo';
const REDIRECT_URIS = ['http://localhost:5173/api/auth/google/callback', 'https://localhost:5173/api/auth/google/callback', 'https://adventure.notebooks.cloudflare.com/api/auth/google/callback'];

const DISCORD_AUTH_URI = 'https://discord.com/api/oauth2/authorize';
const DISCORD_TOKEN_URI = 'https://discord.com/api/oauth2/token';
const DISCORD_USERINFO_URI = 'https://discord.com/api/users/@me';
const DISCORD_REDIRECT_URIS = ['http://localhost:5173/api/auth/discord/callback', 'https://adventure.notebooks.cloudflare.com/api/auth/discord/callback'];

const JWT_SECRET = 'a-very-secret-key-change-this'; // For demo only, use env in production
const COOKIE_NAME = 'adventure_session';

app.get('/api/auth/discord', (c) => {
  console.log('DISCORD_CLIENT_ID:', c.env.DISCORD_CLIENT_ID);
  console.log('DISCORD_CLIENT_SECRET:', c.env.DISCORD_CLIENT_SECRET);
  const redirect_uri = DISCORD_REDIRECT_URIS.find((uri) => c.req.url.startsWith(uri.split('/api')[0])) || DISCORD_REDIRECT_URIS[0];
  const params = new URLSearchParams({
    client_id: c.env.DISCORD_CLIENT_ID,
    redirect_uri,
    response_type: 'code',
    scope: 'identify email',
    prompt: 'consent',
  });
  return c.redirect(`${DISCORD_AUTH_URI}?${params.toString()}`);
});

app.get('/api/auth/discord/callback', async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get('code');
  if (!code) return c.text('Missing code', 400);
  const redirect_uri = DISCORD_REDIRECT_URIS.find((uri) => c.req.url.startsWith(uri.split('/api')[0])) || DISCORD_REDIRECT_URIS[0];
  // Exchange code for tokens
  const tokenRes = await fetch(DISCORD_TOKEN_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: c.env.DISCORD_CLIENT_ID,
      client_secret: c.env.DISCORD_CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code',
      scope: 'identify email',
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) return c.text('Failed to get token', 400);
  // Get user info
  const userRes = await fetch(DISCORD_USERINFO_URI, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const user = await userRes.json();
  // Create JWT
  const jwt = await new SignJWT({ user, provider: 'discord' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(new TextEncoder().encode(JWT_SECRET));
  // Set cookie
  c.header('Set-Cookie', `${COOKIE_NAME}=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`);
  // Redirect to home
  return c.redirect('/');
});

app.get('/api/auth/me', async (c) => {
  const cookie = c.req.header('Cookie') || '';
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return c.json({ user: null });
  try {
    const { payload } = await jwtVerify(match[1], new TextEncoder().encode(JWT_SECRET));
    return c.json({ user: payload.user });
  } catch (e) {
    return c.json({ user: null });
  }
});

// Proxy all other /api requests to Durable Object
app.all('/api/*', async (c, next) => {
  const req = c.req.raw;
  const url = new URL(req.url);
  const roomId = url.searchParams.get('room') || 'default';
  const id = c.env.LOBBY.idFromName(roomId);
  const obj = c.env.LOBBY.get(id);
  return await obj.fetch(req);
});

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext) => {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/api')) {
      return app.fetch(req, env, ctx);
    }
    // Serve static assets as before
    if (env.ASSETS) {
      return env.ASSETS.fetch(req);
    }
    // Local dev fallback
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(`<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Adventure</title>\n  </head>\n  <body>\n    <div id="root">\n      <h1>Adventure Game</h1>\n      <p>This is a local development server. Static assets are being served directly.</p>\n      <p>API endpoints at /api/* are available.</p>\n    </div>\n  </body>\n</html>`, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }
    return new Response(`Static asset "${url.pathname}" not found in local development mode.`, {
      status: 404,
      headers: { 'content-type': 'text/plain;charset=UTF-8' },
    });
  },
};

export { Lobby };
