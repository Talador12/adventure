// AI error tests — AI binding IS available but returns failures
// These are REAL errors: the AI service is configured but something goes wrong.
// Unlike fallback.test.ts (503 = expected), these test the 500 error path.
//
// The distinction:
//   - AI unavailable (fallback.test.ts): service not configured, non-blocking, expected
//   - AI errors (this file): service configured but broken, real errors, should be caught
//
// Budget note: uses a mock AI binding that simulates failures. Never calls real Workers AI.
import { describe, it, expect } from 'vitest';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import worker from '../../_worker';

// Mock AI that throws exceptions (simulates Workers AI service errors)
const throwingAI = {
  run: async () => {
    throw new Error('Workers AI internal error: model overloaded');
  },
};

// Mock AI that returns empty/malformed responses
const emptyAI = {
  run: async () => ({ response: '' }),
};

// Mock AI that returns garbage (not the expected shape)
const garbageAI = {
  run: async () => 'this is not json or an object',
};

// Mock AI that hangs forever (simulates timeout scenario)
const hangingAI = {
  run: () => new Promise(() => {}), // never resolves
};

// Helper
async function post(path: string, body: Record<string, unknown>, ai: unknown) {
  const request = new Request(`http://localhost${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const ctx = createExecutionContext();
  const testEnv = { ...env, AI: ai };
  const response = await worker.fetch(request, testEnv as typeof env, ctx);
  await waitOnExecutionContext(ctx);
  return response;
}

// ---------------------------------------------------------------------------
// AI throws exceptions — should return 500 with error message, not crash
// ---------------------------------------------------------------------------
describe('AI available but throws - real errors (500)', () => {
  it('POST /api/dm/narrate catches AI exception', async () => {
    const res = await post('/api/dm/narrate', {
      characters: [{ name: 'Aric', class: 'Fighter', race: 'Human', hp: 30, maxHp: 30, ac: 16, stats: {} }],
      context: 'dark cave', action: 'look around',
    }, throwingAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
    expect(data.error).toContain('overloaded');
  });

  it('POST /api/dm/npc catches AI exception', async () => {
    const res = await post('/api/dm/npc', {
      npcName: 'Barkeep', npcRole: 'owner', playerMessage: 'Hello',
      playerName: 'Aric', playerClass: 'Fighter', scene: 'tavern',
    }, throwingAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/dm/encounter catches AI exception', async () => {
    const res = await post('/api/dm/encounter', {
      partyLevel: 3, partySize: 1, difficulty: 'medium',
      context: 'forest path', setting: 'dark forest', twist: 'ambush',
    }, throwingAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/name/translate catches AI exception', async () => {
    const res = await post('/api/name/translate', { name: 'Bright Sword' }, throwingAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/character/generate catches AI exception', async () => {
    const res = await post('/api/character/generate', {}, throwingAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/backstory/generate catches AI exception', async () => {
    const res = await post('/api/backstory/generate', {
      name: 'Thorne', race: 'Dwarf', class: 'Cleric',
    }, throwingAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/portrait/generate catches AI exception', async () => {
    const res = await post('/api/portrait/generate', {
      name: 'Aric', race: 'Human', class: 'Fighter',
    }, throwingAI);
    expect([500, 503]).toContain(res.status); // 503 when no image backend, 500 on AI error
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });

  it('POST /api/character/suggest-personality catches AI exception', async () => {
    const res = await post('/api/character/suggest-personality', {
      name: 'Lyra', race: 'Elf', class: 'Wizard',
    }, throwingAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// AI returns empty responses — should handle gracefully
// ---------------------------------------------------------------------------
describe('AI returns empty responses - handled without crash', () => {
  it('POST /api/dm/narrate with empty response returns narration (may be empty string)', async () => {
    const res = await post('/api/dm/narrate', {
      characters: [], context: '', action: 'look around',
    }, emptyAI);
    // Should not crash — returns 200 with empty narration or a fallback
    expect(res.status).toBeLessThan(500);
  });

  it('POST /api/name/translate with empty response returns 500 (empty translation is a real error)', async () => {
    const res = await post('/api/name/translate', { name: 'Test' }, emptyAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    expect(data.error).toContain('empty');
  });
});

// ---------------------------------------------------------------------------
// Error message quality — errors should be informative, not generic
// ---------------------------------------------------------------------------
describe('error messages are informative', () => {
  it('AI exception message is preserved in error response', async () => {
    const customAI = {
      run: async () => { throw new Error('rate limit exceeded: 429'); },
    };
    const res = await post('/api/dm/narrate', {
      characters: [], context: '', action: '',
    }, customAI);
    expect(res.status).toBe(500);
    const data = await res.json() as Record<string, string>;
    // The original error message should be in the response, not swallowed
    expect(data.error).toContain('rate limit');
  });
});

// ---------------------------------------------------------------------------
// Budget-aware: skip live AI tests unless AI_TESTS=live
// ---------------------------------------------------------------------------
const AI_TESTS = (globalThis as Record<string, unknown>).__TEST_AI_MODE__ ?? 'mock';

describe.skipIf(AI_TESTS !== 'live')('live AI integration (AI_TESTS=live only)', () => {
  // These tests hit real Workers AI and cost money.
  // Only run when explicitly opted in: AI_TESTS=live npx vitest

  it('POST /api/dm/narrate returns real narration', async () => {
    const res = await post('/api/dm/narrate', {
      characters: [{ name: 'Aric', class: 'Fighter', race: 'Human', hp: 30, maxHp: 30, ac: 16, stats: { STR: 16, DEX: 12, CON: 14, INT: 10, WIS: 10, CHA: 8 } }],
      context: 'A misty graveyard at midnight', action: 'We approach the crypt cautiously.',
      history: [], scene: 'Graveyard',
    }, env.AI); // Use the real AI binding from Miniflare/wrangler
    if (res.status === 503) {
      // AI not available in this environment — skip gracefully
      console.warn('AI binding not available in test environment — skipping live test');
      return;
    }
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, string>;
    expect(data.narration).toBeTruthy();
    expect(data.narration.length).toBeGreaterThan(20);
  });

  it('POST /api/name/translate returns a translated name', async () => {
    const res = await post('/api/name/translate', { name: 'Bright Sword' }, env.AI);
    if (res.status === 503) return; // AI not available
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, string>;
    expect(data.translated).toBeTruthy();
    expect(data.language).toBeTruthy();
  });
});
