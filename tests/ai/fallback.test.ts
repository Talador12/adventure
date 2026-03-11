// AI fallback tests — AI binding UNAVAILABLE (non-blocking errors)
// These verify the game degrades gracefully when AI is not configured or the service is down.
// This is NOT a test failure — it's expected behavior. The game must never break without AI.
//
// Budget note: these tests use a mock AI=undefined binding. They never call real Workers AI.
// They are always safe to run regardless of AI_TESTS setting.
import { describe, it, expect } from 'vitest';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';

// The worker default export is the Hono app's fetch handler
import worker from '../../_worker';

// Helper: make a POST request to the worker with optional body
async function post(path: string, body: Record<string, unknown> = {}, overrideEnv?: Record<string, unknown>) {
  const request = new Request(`http://localhost${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const ctx = createExecutionContext();
  // Use env without AI binding to simulate unavailable AI
  const testEnv = overrideEnv ?? { ...env, AI: undefined };
  const response = await worker.fetch(request, testEnv as typeof env, ctx);
  await waitOnExecutionContext(ctx);
  return response;
}

// ---------------------------------------------------------------------------
// All AI endpoints should return 503 when AI binding is missing
// These are NON-BLOCKING errors — the client shows a fallback, game continues
// ---------------------------------------------------------------------------
describe('AI unavailable - graceful 503 responses (non-blocking)', () => {
  it('POST /api/portrait/generate returns 503 with helpful message', async () => {
    const res = await post('/api/portrait/generate', {
      name: 'Aric', race: 'Human', class: 'Fighter',
    });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
    expect(data.error).toContain('AI');
  });

  it('POST /api/portrait/describe returns 503', async () => {
    const res = await post('/api/portrait/describe', {
      image: 'data:image/png;base64,iVBOR', race: 'Elf', class: 'Wizard',
    });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/name/translate returns 503', async () => {
    const res = await post('/api/name/translate', { name: 'Bright Sword' });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/character/generate returns 503', async () => {
    const res = await post('/api/character/generate', {});
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/character/suggest-personality returns 503', async () => {
    const res = await post('/api/character/suggest-personality', {
      name: 'Lyra', race: 'Elf', class: 'Wizard', background: 'Sage', alignment: 'Neutral Good',
    });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/backstory/generate returns 503', async () => {
    const res = await post('/api/backstory/generate', {
      name: 'Thorne', race: 'Dwarf', class: 'Cleric', background: 'Acolyte',
    });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/dm/narrate returns 503', async () => {
    const res = await post('/api/dm/narrate', {
      characters: [], context: 'A dark cave', action: 'look around',
    });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/dm/npc returns 503', async () => {
    const res = await post('/api/dm/npc', {
      npcName: 'Barkeep', npcRole: 'tavern owner', playerMessage: 'Hello',
    });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/dm/encounter returns 503', async () => {
    const res = await post('/api/dm/encounter', {
      partyLevel: 3, partySize: 3, difficulty: 'medium',
    });
    expect(res.status).toBe(503);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Non-AI endpoints should work fine without AI binding
// ---------------------------------------------------------------------------
describe('non-AI features work without AI binding', () => {
  it('GET /api/campaign/:roomId works (returns empty or existing state)', async () => {
    const request = new Request('http://localhost/api/campaign/test-room-123', { method: 'GET' });
    const ctx = createExecutionContext();
    const testEnv = { ...env, AI: undefined };
    const response = await worker.fetch(request, testEnv as typeof env, ctx);
    await waitOnExecutionContext(ctx);
    // Should not 500 — either 200 with data or 404/empty
    expect(response.status).not.toBe(500);
  });

  it('PUT /api/campaign/:roomId saves game state without AI', async () => {
    const body = {
      dmHistory: ['The party enters the tavern.'],
      sceneName: 'The Rusty Dragon',
      combatLog: [],
      units: [],
      inCombat: false,
    };
    const request = new Request('http://localhost/api/campaign/test-save-123', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const ctx = createExecutionContext();
    const testEnv = { ...env, AI: undefined };
    const response = await worker.fetch(request, testEnv as typeof env, ctx);
    await waitOnExecutionContext(ctx);
    expect(response.status).toBeLessThan(500);
  });
});
