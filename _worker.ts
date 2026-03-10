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
  CHARACTERS?: KVNamespace;
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
// Art style prompts — matched to frontend PORTRAIT_STYLES ids
const ART_STYLE_PROMPTS: Record<string, string> = {
  'classic-fantasy': 'Detailed oil painting, medieval fantasy illustration, rich earth tones, dramatic chiaroscuro lighting, high fantasy RPG art',
  'watercolor': 'Soft watercolor painting with gentle washes, flowing lines, muted pastel palette, delicate brushwork, fantasy illustration',
  'anime-fantasy': 'Anime-inspired fantasy art, vibrant saturated colors, expressive features, clean lines, dynamic composition, light cel-shading',
  'dark-gothic': 'Dark gothic illustration, heavy shadows, dramatic contrast, muted desaturated palette, ornate details, grim and foreboding atmosphere',
  'storybook': 'Whimsical hand-drawn storybook illustration, warm soft lighting, cozy atmosphere, rounded shapes, gentle color palette',
  'cel-shaded': 'Bold cel-shaded art, clean sharp outlines, flat vibrant colors, graphic novel style, strong silhouettes',
  'realistic': 'Photorealistic digital portrait, cinematic lighting, subsurface scattering on skin, sharp detail, studio photography feel',
  'painterly': 'Loose impressionist brushwork, rich textures, dramatic palette knife strokes, visible paint texture, expressive color mixing',
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

// AI full character generator — creative builds, not generic
app.post('/api/character/generate', async (c) => {
  if (!c.env.AI) {
    return c.json({ error: 'AI binding not available' }, 503);
  }

  const body = await c.req.json<{ campaign?: string }>();
  const campaign = String(body.campaign || '').trim();

  const campaignCtx = campaign
    ? `\nCAMPAIGN CONTEXT (tailor the character to fit this setting):\n${campaign}\n`
    : '';

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
    const result = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a wildly creative D&D character designer. You hate boring builds. Every character should make a DM grin. Return ONLY valid JSON. No markdown. No explanation. No code fences.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1200,
    });

    const raw = ((result as Record<string, unknown>).response as string || '').trim();
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
    const result = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You write vivid, specific D&D character personality details. Return ONLY valid JSON. No markdown. No explanation.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 400,
    });

    const raw = ((result as Record<string, unknown>).response as string || '').trim();
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

  const traitContext = [
    personalityTraits && `Personality: ${personalityTraits}`,
    ideals && `Ideals: ${ideals}`,
    bonds && `Bonds: ${bonds}`,
    flaws && `Flaws: ${flaws}`,
  ].filter(Boolean).join('\n');

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
    const result = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a fantasy author who writes compelling, original character backstories. You hate cliches. You love specificity, emotional hooks, and stories that make a DM excited to build on them. Never be generic. Every character deserves to be interesting.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 800,
    });

    const backstory = ((result as Record<string, unknown>).response as string || '').trim();
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
    const result = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', {
      messages: [
        { role: 'user', content: prompt },
      ],
      image: base64Match[1],
      max_tokens: 200,
    });

    const description = ((result as Record<string, unknown>).response as string || '').trim();
    if (!description) {
      return c.json({ error: 'AI returned empty description' }, 500);
    }
    return c.json({ description });
  } catch (err: unknown) {
    // Fallback: try text-only model if vision model isn't available
    try {
      const fallbackResult = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: 'You describe fantasy RPG characters. Be vivid and specific in 2-3 sentences.' },
          { role: 'user', content: `Describe the physical appearance of a typical ${race} ${cls} character in a fantasy setting. Include build, hair, eyes, skin, and notable features. 2-3 sentences only.` },
        ],
        max_tokens: 200,
      });
      const description = ((fallbackResult as Record<string, unknown>).response as string || '').trim();
      if (description) {
        return c.json({ description, fallback: true });
      }
    } catch { /* ignore fallback errors */ }

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

// Helper: get JWT user ID from Authorization header
async function getUserId(c: { req: { raw: Request }; env: Env }): Promise<string | null> {
  const cookie = c.req.raw.headers.get('Cookie') || '';
  const match = cookie.match(/auth_token=([^;]+)/);
  if (!match) return null;
  try {
    const secret = new TextEncoder().encode(c.env.JWT_SECRET || 'dev-jwt-secret-do-not-use-in-production');
    const { payload } = await jwtVerify(match[1], secret);
    return (payload as Record<string, string>).sub || null;
  } catch {
    return null;
  }
}

// GET /api/characters — load all characters for the authenticated user
app.get('/api/characters', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CHARACTERS) return c.json({ error: 'Character storage not available' }, 503);
  try {
    const raw = await c.env.CHARACTERS.get(`user:${userId}:chars`);
    const characters = raw ? JSON.parse(raw) : [];
    return c.json({ characters });
  } catch {
    return c.json({ characters: [] });
  }
});

// PUT /api/characters — save all characters for the authenticated user (full replace)
app.put('/api/characters', async (c) => {
  const userId = await getUserId(c);
  if (!userId) return c.json({ error: 'Not authenticated' }, 401);
  if (!c.env.CHARACTERS) return c.json({ error: 'Character storage not available' }, 503);
  try {
    const { characters } = await c.req.raw.json() as { characters: unknown[] };
    if (!Array.isArray(characters)) return c.json({ error: 'characters must be an array' }, 400);
    // Strip portrait data URLs to save KV space (portraits stored separately in PORTRAITS KV)
    const lean = characters.map((ch: Record<string, unknown>) => {
      const { portrait, ...rest } = ch;
      return { ...rest, hasPortrait: Boolean(portrait) };
    });
    await c.env.CHARACTERS.put(`user:${userId}:chars`, JSON.stringify(lean));
    return c.json({ ok: true, count: lean.length });
  } catch (e) {
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
    const raw = await c.env.CHARACTERS.get(`user:${userId}:chars`);
    const characters: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
    const filtered = characters.filter((ch) => ch.id !== charId);
    if (filtered.length === characters.length) return c.json({ error: 'Character not found' }, 404);
    await c.env.CHARACTERS.put(`user:${userId}:chars`, JSON.stringify(filtered));
    return c.json({ ok: true });
  } catch {
    return c.json({ error: 'Failed to delete character' }, 500);
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
