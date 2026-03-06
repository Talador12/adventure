import { Hono } from 'hono';
import { Lobby } from './src/lobby';
import { SignJWT, jwtVerify } from 'jose';

// Worker types - declared locally to avoid DOM type conflicts in mixed frontend/backend repo
declare const WebSocketPair: { new (): { 0: WebSocket; 1: WebSocket } };
type DurableObjectNamespace = { idFromName(name: string): { toString(): string }; get(id: unknown): { fetch(req: RequestInfo | URL): Promise<Response> } };
type ExecutionContext = { waitUntil(promise: Promise<unknown>): void; passThroughOnException(): void };

interface Ai {
  run(model: string, input: Record<string, unknown>): Promise<ArrayBuffer | ReadableStream | Record<string, unknown>>;
}

interface KVNamespace {
  get(key: string, options?: { type?: string }): Promise<string | ArrayBuffer | null>;
  put(key: string, value: string | ArrayBuffer, options?: { expirationTtl?: number; metadata?: Record<string, string> }): Promise<void>;
  delete(key: string): Promise<void>;
}

interface Env {
  LOBBY: DurableObjectNamespace;
  AI?: Ai;
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
  PORTRAITS?: KVNamespace;
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

// Portrait generation via Workers AI
function buildPortraitPrompt(char: Record<string, unknown>): string {
  const race = String(char.race || 'Human');
  const cls = String(char.class || 'Fighter');
  const name = String(char.name || 'Adventurer');
  const stats = (char.stats || {}) as Record<string, number>;

  // Describe physique from stats
  const physique: string[] = [];
  if (stats.STR >= 16) physique.push('powerfully muscular');
  else if (stats.STR <= 8) physique.push('slight and thin');
  if (stats.DEX >= 16) physique.push('graceful and agile');
  if (stats.CON >= 16) physique.push('hardy and robust');
  else if (stats.CON <= 8) physique.push('frail-looking');
  if (stats.INT >= 16) physique.push('with sharp, intelligent eyes');
  if (stats.WIS >= 16) physique.push('with a calm, knowing gaze');
  if (stats.CHA >= 16) physique.push('strikingly attractive');

  // Race-specific features
  const raceTraits: Record<string, string> = {
    Human: 'a human with varied features',
    Elf: 'an elf with pointed ears, angular features, and an ethereal quality',
    Dwarf: 'a stout dwarf with a thick beard and broad shoulders',
    Halfling: 'a small halfling with a round, cheerful face and curly hair',
    Gnome: 'a small gnome with an oversized head and curious, twinkling eyes',
    'Half-Orc': 'a half-orc with greenish skin, prominent tusks, and a strong jaw',
    Tiefling: 'a tiefling with reddish skin, curved horns, and a long tail',
    Dragonborn: 'a dragonborn with scaled skin, a draconic snout, and no hair',
  };

  // Class-specific attire/vibe
  const classStyle: Record<string, string> = {
    Fighter: 'wearing practical plate armor with a sword at their hip',
    Wizard: 'wearing flowing robes with arcane symbols, holding a staff',
    Rogue: 'wearing dark leather armor with a hood and daggers',
    Cleric: 'wearing polished chainmail with a holy symbol around their neck',
    Ranger: 'wearing green-brown leathers with a longbow and a forest cloak',
    Paladin: 'wearing gleaming full plate with a radiant holy emblem on their shield',
    Barbarian: 'bare-chested with war paint, furs, and a massive greataxe',
    Bard: 'wearing colorful, stylish clothes with a lute slung over their shoulder',
    Sorcerer: 'with faintly glowing eyes and arcane energy crackling at their fingertips',
    Warlock: 'wearing dark, otherworldly robes with an eldritch sigil on their hand',
    Druid: 'wearing natural hide armor adorned with leaves and a wooden staff',
    Monk: 'wearing simple wraps and a serene expression, hands in a fighting stance',
  };

  const raceTrait = raceTraits[race] || 'a fantasy adventurer';
  const style = classStyle[cls] || 'in adventuring gear';
  const physiqueStr = physique.length > 0 ? `, ${physique.join(', ')}` : '';

  return `Fantasy character portrait of ${name}, ${raceTrait}${physiqueStr}, ${style}. Detailed digital painting, dramatic lighting, painterly style, upper body portrait, dark atmospheric background, high fantasy RPG art, D&D character art style.`;
}

app.post('/api/portrait/generate', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const prompt = buildPortraitPrompt(body);

  try {
    const result = await c.env.AI.run('@cf/black-forest-labs/FLUX-1-schnell', {
      prompt,
      num_steps: 4,
    });

    // FLUX-1-schnell returns a ReadableStream of PNG data
    if (result instanceof ReadableStream) {
      const reader = result.getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
      const merged = new Uint8Array(totalLen);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }
      // Convert to base64 data URL
      let binary = '';
      for (let i = 0; i < merged.length; i++) binary += String.fromCharCode(merged[i]);
      const base64 = btoa(binary);
      return c.json({ portrait: `data:image/png;base64,${base64}`, prompt });
    }

    // Fallback: might be ArrayBuffer directly
    if (result instanceof ArrayBuffer) {
      const bytes = new Uint8Array(result);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);
      return c.json({ portrait: `data:image/png;base64,${base64}`, prompt });
    }

    return c.json({ error: 'Unexpected AI response format' }, 500);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'AI generation failed';
    return c.json({ error: msg }, 500);
  }
});

// Name translation — translate a name's meaning into a random language via Workers AI
const NAME_LANGUAGES = [
  { name: 'Spanish', flag: '\u{1F1EA}\u{1F1F8}' },
  { name: 'French', flag: '\u{1F1EB}\u{1F1F7}' },
  { name: 'German', flag: '\u{1F1E9}\u{1F1EA}' },
  { name: 'Italian', flag: '\u{1F1EE}\u{1F1F9}' },
  { name: 'Portuguese', flag: '\u{1F1E7}\u{1F1F7}' },
  { name: 'Japanese', flag: '\u{1F1EF}\u{1F1F5}' },
  { name: 'Korean', flag: '\u{1F1F0}\u{1F1F7}' },
  { name: 'Mandarin Chinese', flag: '\u{1F1E8}\u{1F1F3}' },
  { name: 'Russian', flag: '\u{1F1F7}\u{1F1FA}' },
  { name: 'Arabic', flag: '\u{1F1F8}\u{1F1E6}' },
  { name: 'Hindi', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Turkish', flag: '\u{1F1F9}\u{1F1F7}' },
  { name: 'Polish', flag: '\u{1F1F5}\u{1F1F1}' },
  { name: 'Swedish', flag: '\u{1F1F8}\u{1F1EA}' },
  { name: 'Norwegian', flag: '\u{1F1F3}\u{1F1F4}' },
  { name: 'Finnish', flag: '\u{1F1EB}\u{1F1EE}' },
  { name: 'Dutch', flag: '\u{1F1F3}\u{1F1F1}' },
  { name: 'Greek', flag: '\u{1F1EC}\u{1F1F7}' },
  { name: 'Irish', flag: '\u{1F1EE}\u{1F1EA}' },
  { name: 'Welsh', flag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}' },
  { name: 'Swahili', flag: '\u{1F1F0}\u{1F1EA}' },
  { name: 'Thai', flag: '\u{1F1F9}\u{1F1ED}' },
  { name: 'Vietnamese', flag: '\u{1F1FB}\u{1F1F3}' },
  { name: 'Hebrew', flag: '\u{1F1EE}\u{1F1F1}' },
  { name: 'Latin', flag: '\u{1F3DB}\u{FE0F}' },
  { name: 'Hawaiian', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Maori', flag: '\u{1F1F3}\u{1F1FF}' },
  { name: 'Icelandic', flag: '\u{1F1EE}\u{1F1F8}' },
  { name: 'Romanian', flag: '\u{1F1F7}\u{1F1F4}' },
  { name: 'Czech', flag: '\u{1F1E8}\u{1F1FF}' },
];

app.post('/api/name/translate', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<{ name: string; language?: string }>();
  const name = String(body.name || '').trim();
  if (!name) return c.json({ error: 'Name is required' }, 400);

  // Pick a random language or use the one specified
  const lang = body.language
    ? NAME_LANGUAGES.find((l) => l.name.toLowerCase() === body.language!.toLowerCase()) || NAME_LANGUAGES[Math.floor(Math.random() * NAME_LANGUAGES.length)]
    : NAME_LANGUAGES[Math.floor(Math.random() * NAME_LANGUAGES.length)];

  const prompt = `Translate the meaning of the English word or name "${name}" into ${lang.name}. If the name is a compound word or has a clear meaning (like "Lumberjack" = one who cuts wood), translate that meaning. If it's a proper name with no obvious meaning, transliterate it into ${lang.name} phonetics. Return ONLY the single translated/transliterated word or short phrase in ${lang.name} script or romanized form — nothing else, no quotes, no explanation.`;

  try {
    const result = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a precise translator. Return ONLY the translated word. No quotes, no punctuation, no explanation. Just the word.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 50,
    });

    const raw = ((result as Record<string, unknown>).response as string || '').trim();
    // Clean up: remove quotes, periods, extra whitespace, "Translation:" prefixes
    const translated = raw.replace(/^["'`]+|["'`.,!]+$/g, '').replace(/^(translation|answer|result)[:\s]*/i, '').trim();
    if (!translated) return c.json({ error: 'Translation returned empty' }, 500);

    return c.json({ translated, language: lang.name, flag: lang.flag, original: name });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Translation failed';
    return c.json({ error: msg }, 500);
  }
});

// AI Dungeon Master — narration, encounters, NPC dialogue via Workers AI text generation
app.post('/api/dm/narrate', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const characters = (body.characters as Array<Record<string, unknown>>) || [];
  const context = String(body.context || '');
  const action = String(body.action || '');
  const history = (body.history as string[]) || [];

  const charDescriptions = characters.map((ch) => {
    const stats = (ch.stats || {}) as Record<string, number>;
    return `${ch.name} (Level ${ch.level} ${ch.race} ${ch.class}, HP ${ch.hp}/${ch.maxHp}, AC ${ch.ac}, STR ${stats.STR || 10} DEX ${stats.DEX || 10} CON ${stats.CON || 10} INT ${stats.INT || 10} WIS ${stats.WIS || 10} CHA ${stats.CHA || 10})`;
  }).join('\n');

  const historyStr = history.length > 0 ? `\nRecent events:\n${history.slice(-10).join('\n')}` : '';

  const systemPrompt = `You are a dramatic, immersive Dungeon Master for a D&D 5e adventure. You narrate in vivid second-person prose. Keep responses to 2-4 sentences. Be atmospheric and exciting. When combat happens, describe it cinematically. When players make choices, present consequences with flair.

Party:
${charDescriptions || 'No characters yet.'}
${historyStr}
${context ? `\nCurrent scene: ${context}` : ''}`;

  try {
    const result = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: action || 'Set the scene for the beginning of a new adventure. The party gathers at a tavern.' },
      ],
      max_tokens: 300,
    });

    const response = (result as Record<string, unknown>).response as string || '';
    return c.json({ narration: response.trim() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'DM narration failed';
    return c.json({ error: msg }, 500);
  }
});

// AI DM encounter generator — creates enemies with stats
app.post('/api/dm/encounter', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const partyLevel = Number(body.partyLevel) || 1;
  const partySize = Number(body.partySize) || 1;
  const difficulty = String(body.difficulty || 'medium');
  const context = String(body.context || 'a dark dungeon corridor');

  const prompt = `Generate a D&D 5e combat encounter for a party of ${partySize} level ${partyLevel} adventurers. Difficulty: ${difficulty}. Setting: ${context}.

Return ONLY valid JSON (no markdown, no explanation) in this exact format:
{"enemies":[{"name":"Goblin","hp":7,"maxHp":7,"ac":15,"type":"enemy"},{"name":"Goblin Archer","hp":7,"maxHp":7,"ac":13,"type":"enemy"}],"description":"Two goblins leap from behind the rocks, weapons drawn!"}`;

  try {
    const result = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a D&D encounter designer. Return ONLY valid JSON. No markdown code fences. No extra text.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
    });

    const raw = ((result as Record<string, unknown>).response as string || '').trim();
    // Try to extract JSON from the response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const encounter = JSON.parse(jsonMatch[0]);
      return c.json(encounter);
    }
    return c.json({ error: 'Failed to parse encounter', raw }, 500);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Encounter generation failed';
    return c.json({ error: msg }, 500);
  }
});

// Portrait upload — encrypt with AES-256-GCM and store in KV
async function deriveEncryptionKey(secret: string): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new TextEncoder().encode('adventure-portraits'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

app.post('/api/portrait/upload', async (c) => {
  if (!c.env.PORTRAITS) {
    return c.json({ error: 'Portrait storage not available' }, 503);
  }

  const body = await c.req.json<{ image: string; characterId?: string }>();
  const image = String(body.image || '');
  if (!image || !image.startsWith('data:image/')) {
    return c.json({ error: 'Invalid image data URL' }, 400);
  }

  // Limit to 2MB base64 (~1.5MB image)
  if (image.length > 2 * 1024 * 1024) {
    return c.json({ error: 'Image too large (max 2MB)' }, 400);
  }

  const portraitId = body.characterId || crypto.randomUUID();
  const secret = c.env.JWT_SECRET || DEV_JWT_FALLBACK;

  try {
    const key = await deriveEncryptionKey(secret);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(image);
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

    // Store IV (12 bytes) + ciphertext together
    const stored = new Uint8Array(iv.length + encrypted.byteLength);
    stored.set(iv, 0);
    stored.set(new Uint8Array(encrypted), iv.length);

    await c.env.PORTRAITS.put(`portrait:${portraitId}`, stored.buffer, {
      metadata: { contentType: image.split(';')[0].split(':')[1] || 'image/png', uploadedAt: new Date().toISOString() },
    });

    return c.json({ portraitId, url: `/api/portrait/${portraitId}` });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return c.json({ error: msg }, 500);
  }
});

// Portrait download — decrypt from KV and serve
app.get('/api/portrait/:id', async (c) => {
  if (!c.env.PORTRAITS) {
    return c.json({ error: 'Portrait storage not available' }, 503);
  }

  const portraitId = c.req.param('id');
  const secret = c.env.JWT_SECRET || DEV_JWT_FALLBACK;

  try {
    const stored = await c.env.PORTRAITS.get(`portrait:${portraitId}`, { type: 'arrayBuffer' });
    if (!stored) return c.json({ error: 'Portrait not found' }, 404);

    const data = new Uint8Array(stored as ArrayBuffer);
    const iv = data.slice(0, 12);
    const ciphertext = data.slice(12);

    const key = await deriveEncryptionKey(secret);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
    const dataUrl = new TextDecoder().decode(decrypted);

    // Return the data URL as JSON (client uses it directly as img src)
    return c.json({ portrait: dataUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Download failed';
    return c.json({ error: msg }, 500);
  }
});

// WebSocket upgrade — dedicated route so Vite proxy doesn't interfere
app.get('/api/ws', async (c) => {
  const req = c.req.raw;
  if (req.headers.get('Upgrade') !== 'websocket') {
    return c.text('Expected WebSocket upgrade', 426);
  }
  const roomId = new URL(req.url).searchParams.get('room') || 'default';
  const id = c.env.LOBBY.idFromName(roomId);
  const obj = c.env.LOBBY.get(id);
  return await obj.fetch(req);
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
