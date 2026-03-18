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

interface R2Bucket {
  put(key: string, value: ArrayBuffer | ReadableStream | string, options?: { httpMetadata?: { contentType?: string }; customMetadata?: Record<string, string> }): Promise<unknown>;
  get(key: string): Promise<{ body: ReadableStream; httpMetadata?: { contentType?: string }; customMetadata?: Record<string, string>; size: number } | null>;
  delete(key: string): Promise<void>;
  head(key: string): Promise<{ httpMetadata?: { contentType?: string }; customMetadata?: Record<string, string>; size: number } | null>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(column?: string): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
  raw<T = unknown[]>(): Promise<T[]>;
}
interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
}
interface D1ExecResult {
  count: number;
  duration: number;
}

interface Env {
  LOBBY: DurableObjectNamespace;
  AI?: Ai;
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
  PORTRAITS?: KVNamespace;
  CHARACTERS?: KVNamespace;
  CAMPAIGNS?: KVNamespace;
  MAP_IMAGES?: R2Bucket;
  DB?: D1Database;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  JWT_SECRET?: string;
}

const app = new Hono<{ Bindings: Env }>();

// AI timeout wrapper — prevents hanging AI calls from blocking indefinitely.
// Workers AI can occasionally hang; this races the call against a timeout.
const AI_TIMEOUT_MS = 25_000; // 25s — under the Worker 30s limit on free plan
const AI_IMAGE_TIMEOUT_MS = 45_000; // 45s — image gen is slower

class AiTimeoutError extends Error {
  constructor(model: string, ms: number) {
    super(`AI call to ${model} timed out after ${ms / 1000}s`);
    this.name = 'AiTimeoutError';
  }
}

async function aiRunWithTimeout(ai: Ai, model: string, input: Record<string, unknown>, timeoutMs?: number): Promise<ArrayBuffer | ReadableStream | Record<string, unknown>> {
  const ms = timeoutMs ?? (model.includes('FLUX') ? AI_IMAGE_TIMEOUT_MS : AI_TIMEOUT_MS);
  return Promise.race([ai.run(model, input), new Promise<never>((_, reject) => setTimeout(() => reject(new AiTimeoutError(model, ms)), ms))]);
}

// Error logging helper — ensures all catch blocks leave a trace
function logError(context: string, err: unknown): void {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(`[adventure] ${context}: ${msg}`);
}

// Discord OAuth
const DISCORD_AUTH_URI = 'https://discord.com/api/oauth2/authorize';
const DISCORD_TOKEN_URI = 'https://discord.com/api/oauth2/token';
const DISCORD_USERINFO_URI = 'https://discord.com/api/users/@me';
const DISCORD_REDIRECT_URIS = ['http://localhost:5173/api/auth/discord/callback', 'https://adventure.notebooks.cloudflare.com/api/auth/discord/callback'];

// Google OAuth
const GOOGLE_AUTH_URI = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URI = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URI = 'https://www.googleapis.com/oauth2/v2/userinfo';
const GOOGLE_REDIRECT_URIS = ['http://localhost:5173/api/auth/google/callback', 'https://adventure.notebooks.cloudflare.com/api/auth/google/callback'];

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

// ── Google OAuth ──

// GET /api/auth/google - redirect to Google OAuth
app.get('/api/auth/google', (c) => {
  if (!c.env.GOOGLE_CLIENT_ID) return c.text('Google OAuth not configured', 503);
  const redirect_uri = GOOGLE_REDIRECT_URIS.find((uri) => c.req.url.startsWith(uri.split('/api')[0])) || GOOGLE_REDIRECT_URIS[0];
  const params = new URLSearchParams({
    client_id: c.env.GOOGLE_CLIENT_ID,
    redirect_uri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  return c.redirect(`${GOOGLE_AUTH_URI}?${params.toString()}`);
});

// GET /api/auth/google/callback - exchange code for token, set JWT cookie
app.get('/api/auth/google/callback', async (c) => {
  if (!c.env.GOOGLE_CLIENT_ID || !c.env.GOOGLE_CLIENT_SECRET) return c.text('Google OAuth not configured', 503);

  const url = new URL(c.req.url);
  const code = url.searchParams.get('code');
  if (!code) return c.text('Missing code', 400);

  const redirect_uri = GOOGLE_REDIRECT_URIS.find((uri) => c.req.url.startsWith(uri.split('/api')[0])) || GOOGLE_REDIRECT_URIS[0];
  const tokenRes = await fetch(GOOGLE_TOKEN_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: c.env.GOOGLE_CLIENT_ID,
      client_secret: c.env.GOOGLE_CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code',
    }),
  });
  const tokenData: Record<string, string> = await tokenRes.json();
  if (!tokenData.access_token) return c.text('Failed to get token', 400);

  const userRes = await fetch(GOOGLE_USERINFO_URI, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const googleUser = (await userRes.json()) as Record<string, string>;

  // Normalize Google user to match our JWT format (compatible with Discord layout)
  const user = {
    id: googleUser.id,
    username: googleUser.email?.split('@')[0] || googleUser.name || 'User',
    global_name: googleUser.name || googleUser.email?.split('@')[0] || 'User',
    email: googleUser.email,
    avatar: null, // Google uses picture URL directly, not a hash
    picture: googleUser.picture, // full URL to profile picture
  };

  const jwt = await new SignJWT({ user, provider: 'google' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(getJwtKey(c.env));
  c.header('Set-Cookie', `${COOKIE_NAME}=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`);
  return c.redirect('/');
});

// Portrait generation via Workers AI
// Art style prompts — matched to frontend PORTRAIT_STYLES ids
const ART_STYLE_PROMPTS: Record<string, string> = {
  'classic-fantasy': 'Detailed oil painting, medieval fantasy illustration, rich earth tones, dramatic chiaroscuro lighting, high fantasy RPG art',
  watercolor: 'Soft watercolor painting with gentle washes, flowing lines, muted pastel palette, delicate brushwork, fantasy illustration',
  'anime-fantasy': 'Anime-inspired fantasy art, vibrant saturated colors, expressive features, clean lines, dynamic composition, light cel-shading',
  'dark-gothic': 'Dark gothic illustration, heavy shadows, dramatic contrast, muted desaturated palette, ornate details, grim and foreboding atmosphere',
  storybook: 'Whimsical hand-drawn storybook illustration, warm soft lighting, cozy atmosphere, rounded shapes, gentle color palette',
  'cel-shaded': 'Bold cel-shaded art, clean sharp outlines, flat vibrant colors, graphic novel style, strong silhouettes',
  realistic: 'Photorealistic digital portrait, cinematic lighting, subsurface scattering on skin, sharp detail, studio photography feel',
  painterly: 'Loose impressionist brushwork, rich textures, dramatic palette knife strokes, visible paint texture, expressive color mixing',
};

function buildPortraitPrompt(char: Record<string, unknown>): string {
  const race = String(char.race || 'Human');
  const cls = String(char.class || 'Fighter');
  const name = String(char.name || 'Adventurer');
  const stats = (char.stats || {}) as Record<string, number>;
  const style = String(char.style || 'classic-fantasy');
  const appearance = (char.appearance || {}) as Record<string, unknown>;

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

  // Appearance details (hair style, scars, markings)
  const appearanceDetails: string[] = [];
  if (appearance.hairStyle && appearance.hairStyle !== 'short') {
    appearanceDetails.push(`${appearance.hairStyle} hair`);
  }
  if (appearance.scar && appearance.scar !== 'none') {
    const scarName = String(appearance.scar).replace(/-/g, ' ');
    appearanceDetails.push(`a ${scarName} scar`);
  }
  if (appearance.faceMarking && appearance.faceMarking !== 'none') {
    const markingName = String(appearance.faceMarking).replace(/-/g, ' ');
    appearanceDetails.push(`${markingName} face markings`);
  }
  if (appearance.facialHair && appearance.facialHair !== 'none') {
    const fhName = String(appearance.facialHair).replace(/-/g, ' ');
    appearanceDetails.push(`a ${fhName}`);
  }

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
  const classAttire: Record<string, string> = {
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
  const attire = classAttire[cls] || 'in adventuring gear';
  const physiqueStr = physique.length > 0 ? `, ${physique.join(', ')}` : '';
  const appearanceStr = appearanceDetails.length > 0 ? `, with ${appearanceDetails.join(', ')}` : '';
  const artStyle = ART_STYLE_PROMPTS[style] || ART_STYLE_PROMPTS['classic-fantasy'];

  return `Fantasy character portrait of ${name}, ${raceTrait}${physiqueStr}${appearanceStr}, ${attire}. Upper body portrait, dark atmospheric background. ${artStyle}.`;
}

app.post('/api/portrait/generate', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const prompt = buildPortraitPrompt(body);

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/black-forest-labs/FLUX-1-schnell', {
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
  const lang = body.language ? NAME_LANGUAGES.find((l) => l.name.toLowerCase() === body.language!.toLowerCase()) || NAME_LANGUAGES[Math.floor(Math.random() * NAME_LANGUAGES.length)] : NAME_LANGUAGES[Math.floor(Math.random() * NAME_LANGUAGES.length)];

  const prompt = `Translate the meaning of the English word or name "${name}" into ${lang.name}. If the name is a compound word or has a clear meaning (like "Lumberjack" = one who cuts wood), translate that meaning. If it's a proper name with no obvious meaning, transliterate it into ${lang.name} phonetics. Return ONLY the single translated/transliterated word or short phrase in ${lang.name} script or romanized form — nothing else, no quotes, no explanation.`;

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a precise translator. Return ONLY the translated word. No quotes, no punctuation, no explanation. Just the word.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 50,
    });

    const raw = (((result as Record<string, unknown>).response as string) || '').trim();
    // Clean up: remove quotes, periods, extra whitespace, "Translation:" prefixes
    const translated = raw
      .replace(/^["'`]+|["'`.,!]+$/g, '')
      .replace(/^(translation|answer|result)[:\s]*/i, '')
      .trim();
    if (!translated) return c.json({ error: 'Translation returned empty' }, 500);

    return c.json({ translated, language: lang.name, flag: lang.flag, original: name });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Translation failed';
    return c.json({ error: msg }, 500);
  }
});

// AI full character generator — creative builds, not generic
app.post('/api/character/generate', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<{ campaign?: string }>();
  const campaign = String(body.campaign || '').trim();

  const campaignCtx = campaign ? `\nCAMPAIGN CONTEXT (tailor the character to fit this setting):\n${campaign}\n` : '';

  const prompt = `Generate a COMPLETE, UNIQUE D&D 5e character concept. Return ONLY valid JSON, no markdown fences.
${campaignCtx}
RULES FOR INTERESTING BUILDS:
- Create UNEXPECTED but VIABLE race/class combos. Not "elf wizard" or "dwarf fighter". Think: gnome barbarian who channels rage through unhinged cackling. Tiefling paladin oath-bound to a trickster god. Half-orc bard whose instrument is a warhammer beaten against a shield. Dragonborn monk raised by a pacifist monastery who breathes fire when their vows crack.
- Background should ADD A TWIST, not just reinforce the class. A noble rogue. A criminal cleric. An entertainer barbarian.
- statPriority should be optimized for the build — list the 6 ability scores from most to least important.
- personalityTraits should be SPECIFIC and VIVID with concrete behaviors, not vague.
- ideals/bonds/flaws should create dramatic tension and RP hooks.
- backstory: 2-4 paragraphs. Must include a NAMED NPC, a SPECIFIC inciting incident, a SENSORY DETAIL, and an UNRESOLVED MYSTERY. No cliche openings ("Born in...", "From a young age..."). Third person past tense.
- name should be original and fitting for the race.

VALID VALUES:
- race: Human, Elf, Dwarf, Halfling, Gnome, Half-Orc, Tiefling, Dragonborn
- class: Fighter, Barbarian, Paladin, Ranger, Rogue, Monk, Cleric, Bard, Druid, Warlock, Wizard, Sorcerer
- background: Acolyte, Charlatan, Criminal, Entertainer, Folk Hero, Guild Artisan, Hermit, Noble, Outlander, Sage, Sailor, Soldier, Urchin
- alignment: Lawful Good, Neutral Good, Chaotic Good, Lawful Neutral, True Neutral, Chaotic Neutral, Lawful Evil, Neutral Evil, Chaotic Evil
- hairStyle: short, long, braided, mohawk, bald, wild
- scar: none, eye-scar, cheek-slash, forehead-mark
- faceMarking: none, tribal-lines, arcane-runes, war-paint, freckles
- facialHair: none, beard, goatee, mustache, stubble

JSON format:
{"name":"...","race":"...","class":"...","background":"...","alignment":"...","statPriority":["CHA","DEX","CON","WIS","INT","STR"],"personalityTraits":"...","ideals":"...","bonds":"...","flaws":"...","backstory":"...","appearance":{"hairStyle":"...","scar":"...","faceMarking":"...","facialHair":"..."},"concept":"one sentence pitch for this character"}`;

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a wildly creative D&D character designer. You hate boring builds. Every character should make a DM grin. Return ONLY valid JSON. No markdown. No explanation. No code fences.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1200,
    });

    const raw = (((result as Record<string, unknown>).response as string) || '').trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return c.json(parsed);
    }
    return c.json({ error: 'Failed to parse character concept', raw }, 500);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Character generation failed';
    return c.json({ error: msg }, 500);
  }
});

// AI personality generator — personality traits + ideals + bonds + flaws as a group
app.post('/api/character/suggest-personality', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const name = String(body.name || 'an adventurer');
  const race = String(body.race || 'Human');
  const cls = String(body.class || 'Fighter');
  const bg = String(body.background || 'Folk Hero');
  const alignment = String(body.alignment || 'True Neutral');
  const backstory = String(body.backstory || '');

  const backstoryCtx = backstory ? `\nTheir backstory: ${backstory.slice(0, 500)}` : '';

  const prompt = `Generate personality details for ${name}, a ${race} ${cls} with the ${bg} background (${alignment}).${backstoryCtx}

Return ONLY valid JSON with these 4 fields:
- personalityTraits: 1-2 specific behavioral traits (not vague — concrete habits, tics, ways they talk or act)
- ideals: what drives them, what principle they'd die for
- bonds: who or what they're tied to, what they protect, who they owe
- flaws: a real weakness — not "I'm too brave". Something that causes actual problems.

Make these INTERESTING and SPECIFIC to this character. Create dramatic tension. A paladin whose flaw undermines their oath. A rogue whose bond is to the law. Contradict the obvious.

JSON only, no markdown fences:
{"personalityTraits":"...","ideals":"...","bonds":"...","flaws":"..."}`;

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You write vivid, specific D&D character personality details. Return ONLY valid JSON. No markdown. No explanation.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 400,
    });

    const raw = (((result as Record<string, unknown>).response as string) || '').trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return c.json(parsed);
    }
    return c.json({ error: 'Failed to parse personality', raw }, 500);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Personality generation failed';
    return c.json({ error: msg }, 500);
  }
});

// AI Backstory generator — creates unique, non-generic character origins
app.post('/api/backstory/generate', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const name = String(body.name || 'a nameless wanderer');
  const race = String(body.race || 'Human');
  const cls = String(body.class || 'Fighter');
  const bg = String(body.background || 'Folk Hero');
  const alignment = String(body.alignment || 'True Neutral');
  const stats = (body.stats || {}) as Record<string, number>;
  const personalityTraits = String(body.personalityTraits || '');
  const ideals = String(body.ideals || '');
  const bonds = String(body.bonds || '');
  const flaws = String(body.flaws || '');

  // Build stat-derived personality hints
  const statHints: string[] = [];
  if (stats.STR >= 16) statHints.push('physically imposing');
  else if (stats.STR <= 8) statHints.push('physically weak');
  if (stats.INT >= 16) statHints.push('brilliantly intelligent');
  else if (stats.INT <= 8) statHints.push('not book-smart');
  if (stats.WIS >= 16) statHints.push('deeply perceptive');
  if (stats.CHA >= 16) statHints.push('magnetically charismatic');
  else if (stats.CHA <= 8) statHints.push('socially awkward');
  if (stats.CON >= 16) statHints.push('unnaturally resilient');
  else if (stats.CON <= 8) statHints.push('sickly or frail');

  const traitContext = [personalityTraits && `Personality: ${personalityTraits}`, ideals && `Ideals: ${ideals}`, bonds && `Bonds: ${bonds}`, flaws && `Flaws: ${flaws}`].filter(Boolean).join('\n');

  const prompt = `Write a backstory for a D&D character. 2-4 paragraphs, vivid and specific.

Character: ${name}, a ${race} ${cls} with a ${bg} background. Alignment: ${alignment}.
${statHints.length > 0 ? `They are ${statHints.join(', ')}.` : ''}
${traitContext ? `\n${traitContext}` : ''}

CRITICAL RULES — follow these or the backstory is garbage:
- NO generic origins. Not "you were a street urchin who learned to fight." Not "a wizard who studied in a tower." Not "a rogue from the thieves guild." Those are boring.
- Give them a SPECIFIC inciting incident that changed everything. A moment, a betrayal, a discovery, an accident.
- Include at least one NAMED person from their past (a mentor, rival, lost love, enemy, sibling — someone specific).
- Include a SENSORY DETAIL — a smell, a sound, a texture that haunts them or brings them comfort.
- Their class/background should inform the story but NOT define it predictably. A fighter doesn't have to come from military. A druid doesn't have to come from the forest. Subvert expectations.
- Weave in a MYSTERY or UNRESOLVED THREAD — something the character doesn't know or hasn't settled. A DM can hook into this.
- Write in third person past tense. Tone: literary fantasy, not dry encyclopedia.
- Do NOT start with "Born in" or "From a young age" or any cliche opening.`;

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a fantasy author who writes compelling, original character backstories. You hate cliches. You love specificity, emotional hooks, and stories that make a DM excited to build on them. Never be generic. Every character deserves to be interesting.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 800,
    });

    const backstory = (((result as Record<string, unknown>).response as string) || '').trim();
    if (!backstory) {
      return c.json({ error: 'AI returned empty backstory' }, 500);
    }
    return c.json({ backstory });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Backstory generation failed';
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
  const scene = String(body.scene || '');

  // Build rich character descriptions with personality and backstory
  const charDescriptions = characters
    .map((ch) => {
      const stats = (ch.stats || {}) as Record<string, number>;
      const lines = [`${ch.name} — Level ${ch.level} ${ch.race} ${ch.class} (${ch.alignment || 'Neutral'}, ${ch.background || 'Unknown'} background)`, `  HP ${ch.hp}/${ch.maxHp}, AC ${ch.ac}, STR ${stats.STR || 10} DEX ${stats.DEX || 10} CON ${stats.CON || 10} INT ${stats.INT || 10} WIS ${stats.WIS || 10} CHA ${stats.CHA || 10}`, `  Condition: ${ch.condition || 'normal'}`];
      if (ch.appearanceDescription) lines.push(`  Appearance: ${ch.appearanceDescription}`);
      if (ch.personalityTraits) lines.push(`  Personality: ${ch.personalityTraits}`);
      if (ch.ideals) lines.push(`  Ideals: ${ch.ideals}`);
      if (ch.bonds) lines.push(`  Bonds: ${ch.bonds}`);
      if (ch.flaws) lines.push(`  Flaws: ${ch.flaws}`);
      if (ch.backstory) lines.push(`  Backstory (brief): ${String(ch.backstory).slice(0, 200)}`);
      return lines.join('\n');
    })
    .join('\n\n');

  const historyStr = history.length > 0 ? `\nRecent events:\n${history.slice(-10).join('\n')}` : '';

  const systemPrompt = `You are a master Dungeon Master — theatrical, unpredictable, and deeply immersive. You narrate a D&D 5e adventure in vivid second-person prose.

RULES:
- 2-4 sentences per response. Dense with sensory detail — sounds, smells, textures, light.
- Name every NPC. Give them a quirk, a voice, a motivation. "The barkeep" is lazy writing. "Marta Ashwick, the one-armed barkeep who hums battle hymns while she pours" is good.
- Subvert expectations. The chest is already open. The goblin wants to negotiate. The king is a fraud.
- React to WHO these characters are. A chaotic rogue and a lawful paladin experience the same tavern differently.
- When players have low HP or harsh conditions, reflect it — they limp, bleed, struggle.
- During combat, describe it cinematically with specific body language and impact.
- Never break character. Never mention rules, dice, or game mechanics.

THE PARTY:
${charDescriptions || 'A lone wanderer with no name.'}
${historyStr}
${scene ? `\nCurrent location: ${scene}` : ''}
${context ? `\nScene context: ${context}` : ''}`;

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: action || 'Set the scene for the beginning of a new adventure. The party gathers at a tavern.' },
      ],
      max_tokens: 400,
    });

    const response = ((result as Record<string, unknown>).response as string) || '';
    return c.json({ narration: response.trim() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'DM narration failed';
    return c.json({ error: msg }, 500);
  }
});

// AI NPC dialogue — speak as a specific NPC in character
app.post('/api/dm/npc', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const npcName = String(body.npcName || 'the stranger');
  const npcRole = String(body.npcRole || 'a mysterious figure');
  const npcPersonality = String(body.npcPersonality || '');
  const playerMessage = String(body.playerMessage || '');
  const playerName = String(body.playerName || 'Adventurer');
  const playerClass = String(body.playerClass || '');
  const scene = String(body.scene || '');
  const history = (body.dialogueHistory as string[]) || [];

  const historyStr = history.length > 0 ? `\nConversation so far:\n${history.slice(-8).join('\n')}` : '';

  const systemPrompt = `You are ${npcName}, ${npcRole} in a D&D 5e world. Stay completely in character.

YOUR PERSONALITY: ${npcPersonality || "Guarded but not hostile. You know things you don't share freely."}

RULES:
- Speak ONLY as ${npcName}. No narration, no stage directions, no quotation marks around your speech.
- 1-3 sentences. Terse is better than rambling. Leave things unsaid.
- Have an agenda. You want something from the player, even if it's just to be left alone.
- React to who is talking to you. A ${playerClass || 'stranger'} named ${playerName} is addressing you.
- If they're rude, you can refuse to help. If they're clever, reward it. If they threaten you, react realistically.
- Use speech patterns that fit your role — a scholar uses different words than a thief.
${scene ? `\nSetting: ${scene}` : ''}
${historyStr}`;

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: playerMessage || `${playerName} approaches you.` },
      ],
      max_tokens: 200,
    });

    const response = ((result as Record<string, unknown>).response as string) || '';
    return c.json({ dialogue: response.trim(), npcName });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'NPC dialogue failed';
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
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a D&D encounter designer. Return ONLY valid JSON. No markdown code fences. No extra text.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
    });

    const raw = (((result as Record<string, unknown>).response as string) || '').trim();
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

// AI session recap — "Previously on..." summary of past adventure events
app.post('/api/dm/recap', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<Record<string, unknown>>();
  const history = (body.history as string[]) || [];
  const characters = (body.characters as Array<Record<string, unknown>>) || [];
  const scene = String(body.scene || '');

  if (history.length === 0) {
    return c.json({ error: 'No history to recap' }, 400);
  }

  const charNames = characters.map((ch) => `${ch.name} (Level ${ch.level} ${ch.race} ${ch.class})`).join(', ');

  const systemPrompt = `You are a dramatic narrator delivering a "Previously on..." recap for a D&D campaign. Write in the style of a TV show recap narrator — past tense, dramatic, building tension for what comes next.

RULES:
- 3-5 sentences maximum. Be punchy and vivid.
- Reference character names and specific events from the history.
- End with a hook that builds anticipation for the next session.
- Use dramatic present tense for the final sentence ("And now..." or "But little do they know...").
- Never mention game mechanics, dice, or rules. Pure narrative.

THE PARTY: ${charNames || 'A group of adventurers'}
${scene ? `CURRENT LOCATION: ${scene}` : ''}`;

  // Take the last 20 history entries for context
  const recentHistory = history.slice(-20).join('\n');

  try {
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Here is what has happened so far:\n\n${recentHistory}\n\nWrite the "Previously on..." recap.` },
      ],
      max_tokens: 300,
    });

    const response = ((result as Record<string, unknown>).response as string) || '';
    return c.json({ recap: response.trim() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Recap generation failed';
    return c.json({ error: msg }, 500);
  }
});

// Portrait upload — encrypt with AES-256-GCM and store in KV
async function deriveEncryptionKey(secret: string): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: new TextEncoder().encode('adventure-portraits'), iterations: 100000, hash: 'SHA-256' }, keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
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

// Portrait AI description — analyze an uploaded image to infer character physical traits
app.post('/api/portrait/describe', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<{ image: string; race?: string; class?: string }>();
  const image = String(body.image || '');
  if (!image || !image.startsWith('data:image/')) {
    return c.json({ error: 'Invalid image data URL' }, 400);
  }

  const race = String(body.race || 'Human');
  const cls = String(body.class || 'Fighter');

  // Extract base64 from data URL
  const base64Match = image.match(/^data:image\/\w+;base64,(.+)$/);
  if (!base64Match) {
    return c.json({ error: 'Invalid base64 image' }, 400);
  }

  const prompt = `You are analyzing a character portrait for a fantasy tabletop RPG. The player says this character is a ${race} ${cls}. Describe the character's physical appearance in 2-3 sentences: build, hair color and style, eye color, skin tone, notable features (scars, markings, facial hair), expression, and any visible gear or clothing. Be specific and vivid but concise. Do not mention the art style or medium — only describe the character as a person.`;

  try {
    // Use Llama Vision model for image understanding
    const result = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.2-11b-vision-instruct', {
      messages: [{ role: 'user', content: prompt }],
      image: base64Match[1],
      max_tokens: 200,
    });

    const description = (((result as Record<string, unknown>).response as string) || '').trim();
    if (!description) {
      return c.json({ error: 'AI returned empty description' }, 500);
    }
    return c.json({ description });
  } catch (err: unknown) {
    // Fallback: try text-only model if vision model isn't available
    try {
      const fallbackResult = await aiRunWithTimeout(c.env.AI, '@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: 'You describe fantasy RPG characters. Be vivid and specific in 2-3 sentences.' },
          { role: 'user', content: `Describe the physical appearance of a typical ${race} ${cls} character in a fantasy setting. Include build, hair, eyes, skin, and notable features. 2-3 sentences only.` },
        ],
        max_tokens: 200,
      });
      const description = (((fallbackResult as Record<string, unknown>).response as string) || '').trim();
      if (description) {
        return c.json({ description, fallback: true });
      }
    } catch (fallbackErr) {
      console.error('portrait describe fallback failed:', fallbackErr instanceof Error ? fallbackErr.message : fallbackErr);
    }

    const msg = err instanceof Error ? err.message : 'Image analysis failed';
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

// ── Character persistence (KV-backed, localStorage fallback on client) ──

// Helper: get JWT user ID from cookie (uses same COOKIE_NAME and key derivation as auth endpoints)
async function getUserId(c: { req: { raw: Request }; env: Env }): Promise<string | null> {
  const cookie = c.req.raw.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  try {
    const { payload } = await jwtVerify(match[1], getJwtKey(c.env));
    // JWT stores Discord user object — extract the id
    const user = payload.user as Record<string, string> | undefined;
    return user?.id || (payload as Record<string, string>).sub || null;
  } catch {
    return null;
  }
}

// ── JWT payload helper — returns full user + provider from cookie ──
async function getJwtPayload(c: { req: { raw: Request }; env: Env }): Promise<{ user: Record<string, string>; provider: string } | null> {
  const cookie = c.req.raw.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  try {
    const { payload } = await jwtVerify(match[1], getJwtKey(c.env));
    const user = payload.user as Record<string, string> | undefined;
    const provider = (payload.provider as string) || 'discord';
    if (!user?.id) return null;
    return { user, provider };
  } catch {
    return null;
  }
}

// ── D1 user management — lazy-upsert on authenticated requests ──
// Returns internal user UUID. Creates user + auth_provider rows on first visit.
// On subsequent visits, updates display_name/avatar if changed.
async function ensureUser(c: { req: { raw: Request }; env: Env }): Promise<string | null> {
  const jwt = await getJwtPayload(c);
  if (!jwt) return null;
  if (!c.env.DB) return `${jwt.provider}:${jwt.user.id}`; // fallback if D1 not available

  const { user, provider } = jwt;
  const providerUserId = user.id;
  const displayName = user.global_name || user.username || 'Adventurer';
  // Discord: avatar is a hash, construct CDN URL. Google: picture is a full URL.
  const avatarUrl = user.picture || (user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp` : null);

  try {
    // Check if this auth provider is already linked to a user
    const existing = await c.env.DB.prepare('SELECT user_id FROM auth_providers WHERE provider = ? AND provider_user_id = ?').bind(provider, providerUserId).first<{ user_id: string }>();

    if (existing) {
      // Update display name + avatar on the user row (in case they changed)
      await c.env.DB.prepare('UPDATE users SET display_name = ?, avatar_url = ?, updated_at = unixepoch() WHERE id = ?').bind(displayName, avatarUrl, existing.user_id).run();
      return existing.user_id;
    }

    // New user — create user + auth_provider rows
    const userId = crypto.randomUUID();
    await c.env.DB.batch([c.env.DB.prepare('INSERT INTO users (id, display_name, avatar_url) VALUES (?, ?, ?)').bind(userId, displayName, avatarUrl), c.env.DB.prepare('INSERT INTO auth_providers (provider, provider_user_id, user_id, provider_username, provider_email, provider_avatar) VALUES (?, ?, ?, ?, ?, ?)').bind(provider, providerUserId, userId, user.username || null, user.email || null, avatarUrl)]);
    return userId;
  } catch (err) {
    logError('ensureUser D1 upsert', err);
    // If D1 fails, fall back to provider:id format so auth isn't blocked
    return `${provider}:${providerUserId}`;
  }
}

// ── Chat persistence (D1-backed) ──

// GET /api/chat/:roomId — load recent chat messages for a campaign
app.get('/api/chat/:roomId', async (c) => {
  const internalUserId = await ensureUser(c);
  if (!internalUserId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.DB) return c.json({ messages: [] }); // graceful fallback

  const roomId = c.req.param('roomId');
  const limit = Math.min(parseInt(c.req.query('limit') || '100'), 500);
  const before = c.req.query('before'); // ISO timestamp for pagination

  try {
    let stmt;
    if (before) {
      stmt = c.env.DB.prepare('SELECT id, campaign_id, user_id, username, type, text, avatar_url, metadata, created_at FROM chat_messages WHERE campaign_id = ? AND created_at < ? ORDER BY created_at DESC LIMIT ?').bind(roomId, Math.floor(new Date(before).getTime() / 1000), limit);
    } else {
      stmt = c.env.DB.prepare('SELECT id, campaign_id, user_id, username, type, text, avatar_url, metadata, created_at FROM chat_messages WHERE campaign_id = ? ORDER BY created_at DESC LIMIT ?').bind(roomId, limit);
    }
    const { results } = await stmt.all<Record<string, unknown>>();
    // Return in chronological order (oldest first)
    const messages = results.reverse().map((row) => ({
      ...row,
      metadata: row.metadata ? JSON.parse(row.metadata as string) : null,
    }));
    return c.json({ messages });
  } catch (err) {
    logError('GET /api/chat/:roomId', err);
    return c.json({ messages: [] });
  }
});

// POST /api/chat/:roomId — save a chat message
app.post('/api/chat/:roomId', async (c) => {
  const internalUserId = await ensureUser(c);
  if (!internalUserId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.DB) return c.json({ error: 'Chat storage not available' }, 503);

  const roomId = c.req.param('roomId');
  try {
    const body = await c.req.json<{
      username: string;
      type?: string;
      text: string;
      avatarUrl?: string;
      metadata?: Record<string, unknown>;
    }>();
    if (!body.text?.trim()) return c.json({ error: 'Empty message' }, 400);

    const msgId = crypto.randomUUID();
    await c.env.DB.prepare('INSERT INTO chat_messages (id, campaign_id, user_id, username, type, text, avatar_url, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(
        msgId,
        roomId,
        internalUserId,
        body.username || 'Unknown',
        body.type || 'chat',
        body.text.slice(0, 4000), // cap message length
        body.avatarUrl || null,
        body.metadata ? JSON.stringify(body.metadata) : null
      )
      .run();
    return c.json({ ok: true, id: msgId });
  } catch (err) {
    logError('POST /api/chat/:roomId', err);
    return c.json({ error: 'Failed to save message' }, 500);
  }
});

// ── Party management (D1-backed) ──

// GET /api/party/:roomId — list party members for a campaign
app.get('/api/party/:roomId', async (c) => {
  const internalUserId = await ensureUser(c);
  if (!internalUserId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.DB) return c.json({ members: [] }); // graceful fallback

  const roomId = c.req.param('roomId');
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT pm.user_id, pm.character_id, pm.role, pm.joined_at,
              u.display_name, u.avatar_url
       FROM party_members pm
       JOIN users u ON u.id = pm.user_id
       WHERE pm.campaign_id = ?
       ORDER BY pm.joined_at ASC`
    )
      .bind(roomId)
      .all<Record<string, unknown>>();
    return c.json({ members: results });
  } catch (err) {
    logError('GET /api/party/:roomId', err);
    return c.json({ members: [] });
  }
});

// POST /api/party/:roomId/join — join a campaign party
app.post('/api/party/:roomId/join', async (c) => {
  const internalUserId = await ensureUser(c);
  if (!internalUserId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.DB) return c.json({ error: 'Party management not available' }, 503);

  const roomId = c.req.param('roomId');
  try {
    const body = await c.req.json<{ characterId?: string; role?: string }>().catch((): { characterId?: string; role?: string } => ({}));

    // Upsert — if already a member, update character/role
    await c.env.DB.prepare(
      `INSERT INTO party_members (campaign_id, user_id, character_id, role)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(campaign_id, user_id)
       DO UPDATE SET character_id = excluded.character_id, role = excluded.role`
    )
      .bind(roomId, internalUserId, body.characterId || null, body.role || 'player')
      .run();
    return c.json({ ok: true });
  } catch (err) {
    logError('POST /api/party/:roomId/join', err);
    return c.json({ error: 'Failed to join party' }, 500);
  }
});

// DELETE /api/party/:roomId/leave — leave a campaign party
app.delete('/api/party/:roomId/leave', async (c) => {
  const internalUserId = await ensureUser(c);
  if (!internalUserId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.DB) return c.json({ error: 'Party management not available' }, 503);

  const roomId = c.req.param('roomId');
  try {
    await c.env.DB.prepare('DELETE FROM party_members WHERE campaign_id = ? AND user_id = ?').bind(roomId, internalUserId).run();
    return c.json({ ok: true });
  } catch (err) {
    logError('DELETE /api/party/:roomId/leave', err);
    return c.json({ error: 'Failed to leave party' }, 500);
  }
});

// ── User profile (D1-backed) ──

// GET /api/user/me — full user profile from D1 with linked auth providers
app.get('/api/user/me', async (c) => {
  const internalUserId = await ensureUser(c);
  if (!internalUserId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.DB) {
    // Fallback: return basic info from JWT
    const jwt = await getJwtPayload(c);
    return c.json({ user: jwt?.user || null, providers: [] });
  }

  try {
    const user = await c.env.DB.prepare('SELECT id, display_name, avatar_url, created_at FROM users WHERE id = ?').bind(internalUserId).first<Record<string, unknown>>();

    const { results: providers } = await c.env.DB.prepare('SELECT provider, provider_user_id, provider_username, provider_email, created_at FROM auth_providers WHERE user_id = ?').bind(internalUserId).all<Record<string, unknown>>();

    return c.json({ user, providers });
  } catch (err) {
    logError('GET /api/user/me D1 query', err);
    const jwt = await getJwtPayload(c);
    return c.json({ user: jwt?.user || null, providers: [] });
  }
});

// Campaign persistence — save/load full game state per room

// GET /api/campaign/:roomId — load campaign state
app.get('/api/campaign/:roomId', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const raw = (await c.env.CAMPAIGNS.get(`campaign:${c.req.param('roomId')}`)) as string | null;
    if (!raw) return c.json({ campaign: null });
    return c.json({ campaign: JSON.parse(raw) });
  } catch (err) {
    logError('GET /api/campaign/:roomId', err);
    return c.json({ campaign: null });
  }
});

// PUT /api/campaign/:roomId — save campaign state (includes combat state for mid-combat persistence)
app.put('/api/campaign/:roomId', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const body = await c.req.json<Record<string, unknown>>();
    const state = {
      dmHistory: body.dmHistory || [],
      sceneName: body.sceneName || '',
      selectedCharacterId: body.selectedCharacterId || null,
      combatLog: body.combatLog || [],
      // Combat state — persisted so mid-combat refreshes don't lose progress
      units: body.units || null,
      inCombat: body.inCombat ?? false,
      combatRound: body.combatRound ?? 0,
      turnIndex: body.turnIndex ?? 0,
      terrain: body.terrain || null,
      mapPositions: body.mapPositions || null,
      quests: body.quests || [],
      updatedAt: Date.now(),
      updatedBy: userId,
    };
    await c.env.CAMPAIGNS.put(`campaign:${c.req.param('roomId')}`, JSON.stringify(state));
    return c.json({ ok: true });
  } catch (err) {
    logError('PUT /api/campaign/:roomId', err);
    return c.json({ error: 'Failed to save campaign' }, 500);
  }
});

// --- Lobby password helpers ---
async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// --- Public campaign index helpers ---
// The public index is a single KV key `campaigns:public` containing an array of
// { roomId, name, description, dmName, visibility, playerCount, updatedAt }.
// Updated whenever a campaign's visibility changes or is deleted.
async function syncPublicIndex(kv: KVNamespace, roomId: string, campaign: Record<string, unknown>) {
  const raw = (await kv.get('campaigns:public')) as string | null;
  const index: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
  const existing = index.findIndex((e) => e.roomId === roomId);
  if (campaign.visibility === 'public') {
    const entry = {
      roomId,
      name: campaign.name || roomId,
      description: campaign.description || '',
      dmName: campaign.dmName || '',
      playerCount: campaign.playerCount ?? 0,
      updatedAt: Date.now(),
    };
    if (existing >= 0) index[existing] = entry;
    else index.push(entry);
  } else {
    // Remove from public index
    if (existing >= 0) index.splice(existing, 1);
  }
  await kv.put('campaigns:public', JSON.stringify(index));
}

// GET /api/campaigns/public — browse public campaigns (no auth required)
app.get('/api/campaigns/public', async (c) => {
  if (!c.env.CAMPAIGNS) return c.json({ campaigns: [] });
  try {
    const raw = (await c.env.CAMPAIGNS.get('campaigns:public')) as string | null;
    const campaigns: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
    // Sort by most recently updated
    campaigns.sort((a, b) => ((b.updatedAt as number) || 0) - ((a.updatedAt as number) || 0));
    return c.json({ campaigns });
  } catch (err) {
    logError('GET /api/campaigns/public', err);
    return c.json({ campaigns: [] });
  }
});

// GET /api/campaigns — list all campaigns for the authenticated user
app.get('/api/campaigns', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const raw = (await c.env.CAMPAIGNS.get(`user:${userId}:campaigns`)) as string | null;
    const campaigns: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
    return c.json({ campaigns });
  } catch (err) {
    logError('GET /api/campaigns', err);
    return c.json({ campaigns: [] });
  }
});

// POST /api/campaigns — register a campaign for the user's campaign list
app.post('/api/campaigns', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const body = await c.req.json<Record<string, unknown>>();
    const roomId = String(body.roomId || '');
    const name = String(body.name || roomId);
    if (!roomId) return c.json({ error: 'roomId is required' }, 400);

    const raw = (await c.env.CAMPAIGNS.get(`user:${userId}:campaigns`)) as string | null;
    const campaigns: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];

    // Don't duplicate
    if (!campaigns.find((c) => c.roomId === roomId)) {
      campaigns.push({ roomId, name, createdAt: Date.now() });
      await c.env.CAMPAIGNS.put(`user:${userId}:campaigns`, JSON.stringify(campaigns));
    }
    return c.json({ ok: true });
  } catch (err) {
    logError('POST /api/campaigns', err);
    return c.json({ error: 'Failed to register campaign' }, 500);
  }
});

// PATCH /api/campaigns/:roomId — update campaign metadata (name, description, visibility)
app.patch('/api/campaigns/:roomId', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const roomId = c.req.param('roomId');
    const body = await c.req.json<Record<string, unknown>>();
    const raw = (await c.env.CAMPAIGNS.get(`user:${userId}:campaigns`)) as string | null;
    const campaigns: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
    const campaign = campaigns.find((cp) => cp.roomId === roomId);
    if (!campaign) return c.json({ error: 'Campaign not found' }, 404);
    if (body.name !== undefined) campaign.name = String(body.name).slice(0, 100);
    if (body.description !== undefined) campaign.description = String(body.description).slice(0, 500);
    if (body.visibility !== undefined) {
      const vis = String(body.visibility);
      if (vis === 'public' || vis === 'private') campaign.visibility = vis;
    }
    // Password: set, change, or remove (empty string removes)
    if (body.password !== undefined) {
      const pw = String(body.password);
      if (pw.length > 0) {
        campaign.passwordHash = await hashPassword(pw);
        campaign.hasPassword = true;
      } else {
        delete campaign.passwordHash;
        campaign.hasPassword = false;
      }
    }
    await c.env.CAMPAIGNS.put(`user:${userId}:campaigns`, JSON.stringify(campaigns));
    // Also store password hash in a room-level key so non-owners can verify
    if (campaign.hasPassword && campaign.passwordHash) {
      await c.env.CAMPAIGNS.put(`room:${roomId}:password`, campaign.passwordHash as string);
    } else {
      await c.env.CAMPAIGNS.delete(`room:${roomId}:password`);
    }
    // Sync public campaign index
    await syncPublicIndex(c.env.CAMPAIGNS, roomId, campaign);
    return c.json({ ok: true, campaign });
  } catch (err) {
    logError('PATCH /api/campaigns/:roomId', err);
    return c.json({ error: 'Failed to update campaign' }, 500);
  }
});

// DELETE /api/campaigns/:roomId — soft-delete (archive) a campaign
app.delete('/api/campaigns/:roomId', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const roomId = c.req.param('roomId');
    const permanent = c.req.query('permanent') === '1';
    const raw = (await c.env.CAMPAIGNS.get(`user:${userId}:campaigns`)) as string | null;
    const campaigns: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];

    if (permanent) {
      // Hard delete — remove from list and delete state
      const filtered = campaigns.filter((cp) => cp.roomId !== roomId);
      await c.env.CAMPAIGNS.put(`user:${userId}:campaigns`, JSON.stringify(filtered));
      await c.env.CAMPAIGNS.delete(`campaign:${roomId}`);
      await syncPublicIndex(c.env.CAMPAIGNS, roomId, { visibility: 'private' });
    } else {
      // Soft delete — mark as archived
      const campaign = campaigns.find((cp) => cp.roomId === roomId);
      if (campaign) {
        campaign.archived = true;
        campaign.archivedAt = Date.now();
        await c.env.CAMPAIGNS.put(`user:${userId}:campaigns`, JSON.stringify(campaigns));
        // Remove from public index while archived
        await syncPublicIndex(c.env.CAMPAIGNS, roomId, { visibility: 'private' });
      }
    }
    return c.json({ ok: true, permanent });
  } catch (err) {
    logError('DELETE /api/campaigns/:roomId', err);
    return c.json({ error: 'Failed to delete campaign' }, 500);
  }
});

// POST /api/campaigns/:roomId/restore — restore an archived campaign
app.post('/api/campaigns/:roomId/restore', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const roomId = c.req.param('roomId');
    const raw = (await c.env.CAMPAIGNS.get(`user:${userId}:campaigns`)) as string | null;
    const campaigns: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
    const campaign = campaigns.find((cp) => cp.roomId === roomId);
    if (!campaign) return c.json({ error: 'Campaign not found' }, 404);
    delete campaign.archived;
    delete campaign.archivedAt;
    await c.env.CAMPAIGNS.put(`user:${userId}:campaigns`, JSON.stringify(campaigns));
    // Re-sync public index if it was public
    await syncPublicIndex(c.env.CAMPAIGNS, roomId, campaign);
    return c.json({ ok: true, campaign });
  } catch (err) {
    logError('POST /api/campaigns/:roomId/restore', err);
    return c.json({ error: 'Failed to restore campaign' }, 500);
  }
});

// GET /api/lobby/:roomId/info — check if lobby has password (no auth required)
app.get('/api/lobby/:roomId/info', async (c) => {
  if (!c.env.CAMPAIGNS) return c.json({ hasPassword: false });
  try {
    const roomId = c.req.param('roomId');
    const pwHash = (await c.env.CAMPAIGNS.get(`room:${roomId}:password`)) as string | null;
    return c.json({ hasPassword: !!pwHash });
  } catch (err) {
    logError('GET /api/lobby/:roomId/info', err);
    return c.json({ hasPassword: false });
  }
});

// POST /api/lobby/:roomId/verify — verify lobby password (no auth required)
app.post('/api/lobby/:roomId/verify', async (c) => {
  if (!c.env.CAMPAIGNS) return c.json({ error: 'Campaign storage not available' }, 503);
  try {
    const roomId = c.req.param('roomId');
    const body = await c.req.json<{ password?: string }>();
    const password = body.password || '';
    const storedHash = (await c.env.CAMPAIGNS.get(`room:${roomId}:password`)) as string | null;
    if (!storedHash) return c.json({ ok: true }); // no password set
    const inputHash = await hashPassword(password);
    if (inputHash === storedHash) return c.json({ ok: true });
    return c.json({ ok: false, error: 'Wrong password' }, 403);
  } catch (err) {
    logError('POST /api/lobby/:roomId/verify', err);
    return c.json({ error: 'Verification failed' }, 500);
  }
});

// GET /api/characters — load all characters for the authenticated user
app.get('/api/characters', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CHARACTERS) return c.json({ error: 'Character storage not available' }, 503);
  try {
    const raw = (await c.env.CHARACTERS.get(`user:${userId}:chars`)) as string | null;
    const characters = raw ? JSON.parse(raw) : [];
    return c.json({ characters });
  } catch (err) {
    logError('GET /api/characters', err);
    return c.json({ characters: [] });
  }
});

// PUT /api/characters — save all characters for the authenticated user (full replace)
app.put('/api/characters', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CHARACTERS) return c.json({ error: 'Character storage not available' }, 503);
  try {
    const { characters } = (await c.req.raw.json()) as { characters: unknown[] };
    if (!Array.isArray(characters)) return c.json({ error: 'characters must be an array' }, 400);
    // Strip portrait data URLs to save KV space (portraits stored separately in PORTRAITS KV)
    const lean = (characters as Record<string, unknown>[]).map((ch) => {
      const { portrait, ...rest } = ch;
      return { ...rest, hasPortrait: Boolean(portrait) };
    });
    await c.env.CHARACTERS.put(`user:${userId}:chars`, JSON.stringify(lean));
    return c.json({ ok: true, count: lean.length });
  } catch (err) {
    logError('PUT /api/characters', err);
    return c.json({ error: 'Failed to save characters' }, 500);
  }
});

// DELETE /api/characters/:id — delete a single character
app.delete('/api/characters/:charId', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CHARACTERS) return c.json({ error: 'Character storage not available' }, 503);
  const charId = c.req.param('charId');
  try {
    const raw = (await c.env.CHARACTERS.get(`user:${userId}:chars`)) as string | null;
    const characters: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
    const filtered = characters.filter((ch) => ch.id !== charId);
    if (filtered.length === characters.length) return c.json({ error: 'Character not found' }, 404);
    await c.env.CHARACTERS.put(`user:${userId}:chars`, JSON.stringify(filtered));
    return c.json({ ok: true });
  } catch (err) {
    logError('DELETE /api/characters/:charId', err);
    return c.json({ error: 'Failed to delete character' }, 500);
  }
});

// --- Map image upload/serve/delete (R2-backed) ---

const MAX_MAP_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

// POST /api/map/upload — upload a map image (base64 data URL in JSON body)
app.post('/api/map/upload', async (c) => {
  if (!c.env.MAP_IMAGES) {
    return c.json({ error: 'Map image storage not available' }, 503);
  }

  const body = await c.req.json<{ image: string; roomId?: string }>();
  const image = String(body.image || '');
  if (!image || !image.startsWith('data:image/')) {
    return c.json({ error: 'Invalid image data URL — must start with data:image/' }, 400);
  }

  // Parse content type and base64 data
  const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    return c.json({ error: 'Invalid base64 image data URL' }, 400);
  }
  const contentType = match[1];
  if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
    return c.json({ error: `Unsupported image type: ${contentType}` }, 400);
  }

  // Decode base64 to binary
  const base64 = match[2];
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

  if (bytes.byteLength > MAX_MAP_IMAGE_SIZE) {
    return c.json({ error: `Image too large (${(bytes.byteLength / 1024 / 1024).toFixed(1)}MB, max 10MB)` }, 400);
  }

  const imageId = crypto.randomUUID();
  const roomId = body.roomId || 'unknown';

  try {
    await c.env.MAP_IMAGES.put(`map:${imageId}`, bytes.buffer, {
      httpMetadata: { contentType },
      customMetadata: { roomId, uploadedAt: new Date().toISOString() },
    });
    return c.json({ imageId, url: `/api/map/${imageId}` });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return c.json({ error: msg }, 500);
  }
});

// GET /api/map/:id — serve map image directly from R2
app.get('/api/map/:id', async (c) => {
  if (!c.env.MAP_IMAGES) {
    return c.json({ error: 'Map image storage not available' }, 503);
  }

  const imageId = c.req.param('id');
  try {
    const obj = await c.env.MAP_IMAGES.get(`map:${imageId}`);
    if (!obj) {
      return c.json({ error: 'Map image not found' }, 404);
    }
    const contentType = obj.httpMetadata?.contentType || 'image/png';
    return new Response(obj.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // cache 24h — images are immutable
        'Content-Length': String(obj.size),
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve image';
    return c.json({ error: msg }, 500);
  }
});

// DELETE /api/map/:id — delete a map image from R2
app.delete('/api/map/:id', async (c) => {
  if (!c.env.MAP_IMAGES) {
    return c.json({ error: 'Map image storage not available' }, 503);
  }

  const imageId = c.req.param('id');
  try {
    await c.env.MAP_IMAGES.delete(`map:${imageId}`);
    return c.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
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
  fetch: (req: Request, env: Env, ctx: ExecutionContext): Response | Promise<Response> => {
    const url = new URL(req.url);

    // API routes handled by Hono
    if (url.pathname.startsWith('/api')) {
      return app.fetch(req, env, ctx as unknown as Parameters<typeof app.fetch>[2]);
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
