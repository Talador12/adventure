import { Hono } from 'hono';
import { Lobby } from './src/lobby';
import { SignJWT, jwtVerify } from 'jose';

// Worker types - declared locally to avoid DOM type conflicts in mixed frontend/backend repo
declare const WebSocketPair: { new (): { 0: WebSocket; 1: WebSocket } };
type DurableObjectNamespace = { idFromName(name: string): { toString(): string }; get(id: unknown): { fetch(req: RequestInfo | URL): Promise<Response> } };
type ExecutionContext = { waitUntil(promise: Promise<unknown>): void; passThroughOnException(): void };

interface Env {
  LOBBY: DurableObjectNamespace;
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  JWT_SECRET?: string;
}

const app = new Hono<{ Bindings: Env }>();

// Discord OAuth
const DISCORD_AUTH_URI = 'https://discord.com/api/oauth2/authorize';
const DISCORD_TOKEN_URI = 'https://discord.com/api/oauth2/token';
const DISCORD_USERINFO_URI = 'https://discord.com/api/users/@me';
const DISCORD_REDIRECT_URIS = ['http://localhost:5173/api/auth/discord/callback', 'https://adventure.notebooks.cloudflare.com/api/auth/discord/callback'];

const COOKIE_NAME = 'adventure_session';
const DEV_JWT_FALLBACK = 'adventure-dev-secret-do-not-use-in-prod';

function getJwtKey(env: Env) {
  return new TextEncoder().encode(env.JWT_SECRET || DEV_JWT_FALLBACK);
}

// GET /api/auth/discord - redirect to Discord OAuth
app.get('/api/auth/discord', (c) => {
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

// GET /api/auth/discord/callback - exchange code for token, set JWT cookie
app.get('/api/auth/discord/callback', async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get('code');
  if (!code) return c.text('Missing code', 400);

  const redirect_uri = DISCORD_REDIRECT_URIS.find((uri) => c.req.url.startsWith(uri.split('/api')[0])) || DISCORD_REDIRECT_URIS[0];
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
  const tokenData: Record<string, string> = await tokenRes.json();
  if (!tokenData.access_token) return c.text('Failed to get token', 400);

  const userRes = await fetch(DISCORD_USERINFO_URI, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const user = await userRes.json();

  const jwt = await new SignJWT({ user, provider: 'discord' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(getJwtKey(c.env));
  // No Secure flag so cookies work on localhost HTTP during dev
  c.header('Set-Cookie', `${COOKIE_NAME}=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`);
  return c.redirect('/');
});

// GET /api/auth/me - return current user from JWT cookie
app.get('/api/auth/me', async (c) => {
  const cookie = c.req.header('Cookie') || '';
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return c.json({ user: null });
  try {
    const { payload } = await jwtVerify(match[1], getJwtKey(c.env));
    return c.json({ user: payload.user });
  } catch {
    return c.json({ user: null });
  }
});

// GET /api/auth/signout - clear session cookie
app.get('/api/auth/signout', (c) => {
  c.header('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  return c.redirect('/');
});

// Proxy all other /api requests to Lobby Durable Object
app.all('/api/*', async (c) => {
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

    // API routes handled by Hono
    if (url.pathname.startsWith('/api')) {
      return app.fetch(req, env, ctx);
    }

    // Static assets from Pages
    if (env.ASSETS) {
      return env.ASSETS.fetch(req);
    }

    // Local dev fallback: SPA routing (serve index.html for non-file paths)
    if (url.pathname === '/' || !url.pathname.includes('.')) {
      return new Response(
        `<!DOCTYPE html>
<html lang="en" class="dark">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Adventure</title></head>
<body class="bg-stone-900 text-white"><div id="root">Loading...</div></body>
</html>`,
        { headers: { 'content-type': 'text/html;charset=UTF-8' } }
      );
    }
    return new Response('Not found', { status: 404 });
  },
};

export { Lobby };
