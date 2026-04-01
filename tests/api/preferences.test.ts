import { describe, it, expect } from 'vitest';
import { SignJWT } from 'jose';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import worker from '../../_worker';

const JWT_SECRET = 'preferences-test-secret';

class MemoryKV {
  private store = new Map<string, string>();

  size(): number {
    return this.store.size;
  }

  async get(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async put(key: string, value: string | ArrayBuffer): Promise<void> {
    if (typeof value === 'string') {
      this.store.set(key, value);
      return;
    }
    this.store.set(key, new TextDecoder().decode(value));
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}

async function createSessionCookie(userId: string): Promise<string> {
  const token = await new SignJWT({ user: { id: userId, username: 'Tester' }, provider: 'discord' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(JWT_SECRET));
  return `adventure_session=${token}`;
}

async function ensureD1PreferenceSchema(): Promise<void> {
  await env.DB.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, display_name TEXT NOT NULL, avatar_url TEXT, created_at INTEGER NOT NULL DEFAULT (unixepoch()), updated_at INTEGER NOT NULL DEFAULT (unixepoch()))');
  await env.DB.exec('CREATE TABLE IF NOT EXISTS auth_providers (provider TEXT NOT NULL, provider_user_id TEXT NOT NULL, user_id TEXT NOT NULL, provider_username TEXT, provider_email TEXT, provider_avatar TEXT, created_at INTEGER NOT NULL DEFAULT (unixepoch()), PRIMARY KEY (provider, provider_user_id))');
  await env.DB.exec('CREATE TABLE IF NOT EXISTS user_preferences (user_id TEXT PRIMARY KEY, theme TEXT, active_theme TEXT, low_fx INTEGER, accent_color TEXT, locale TEXT, updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000))');
}

async function apiRequest(
  method: 'GET' | 'PUT',
  path: string,
  kv: MemoryKV,
  body?: Record<string, unknown>,
  cookie?: string,
  options?: { useDb?: boolean },
): Promise<Response> {
  const headers: Record<string, string> = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (cookie) headers.Cookie = cookie;

  const request = new Request(`http://localhost${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const ctx = createExecutionContext();
  const testEnv = {
    ...env,
    JWT_SECRET,
    CHARACTERS: kv,
    DB: options?.useDb ? env.DB : undefined,
  };
  const response = await worker.fetch(request, testEnv as typeof env, ctx);
  await waitOnExecutionContext(ctx);
  return response;
}

describe('preferences API', () => {
  it('requires authentication', async () => {
    const kv = new MemoryKV();
    const res = await apiRequest('GET', '/api/preferences', kv);
    expect(res.status).toBe(401);
  });

  it('saves and returns sanitized preferences', async () => {
    const kv = new MemoryKV();
    const cookie = await createSessionCookie('user-pref-1');

    const save = await apiRequest('PUT', '/api/preferences', kv, {
      theme: 'dark',
      activeTheme: 'parchment',
      lowFx: true,
      accentColor: '#F38020',
      locale: 'fr',
      // Invalid values should be stripped.
      bogus: 'value',
      accentColorBad: '#ZZZZZZ',
    }, cookie);

    expect(save.status).toBe(200);
    const saved = await save.json() as { preferences: Record<string, unknown> };
    expect(saved.preferences.theme).toBe('dark');
    expect(saved.preferences.activeTheme).toBe('parchment');
    expect(saved.preferences.lowFx).toBe(true);
    expect(saved.preferences.accentColor).toBe('#F38020');
    expect(saved.preferences.locale).toBe('fr');
    expect(typeof saved.preferences.updatedAt).toBe('number');
    expect(saved.preferences.bogus).toBeUndefined();

    const load = await apiRequest('GET', '/api/preferences', kv, undefined, cookie);
    expect(load.status).toBe(200);
    const loaded = await load.json() as { preferences: Record<string, unknown> };
    expect(loaded.preferences.theme).toBe('dark');
    expect(loaded.preferences.activeTheme).toBe('parchment');
    expect(loaded.preferences.lowFx).toBe(true);
    expect(loaded.preferences.accentColor).toBe('#F38020');
    expect(loaded.preferences.locale).toBe('fr');
    expect(typeof loaded.preferences.updatedAt).toBe('number');
  });

  it('returns 409 for stale baseUpdatedAt and includes latest server prefs', async () => {
    const kv = new MemoryKV();
    const cookie = await createSessionCookie('user-pref-2');

    const first = await apiRequest('PUT', '/api/preferences', kv, {
      theme: 'dark',
      locale: 'en',
    }, cookie);
    expect(first.status).toBe(200);
    const firstBody = await first.json() as { preferences: { updatedAt?: number } };
    const firstUpdatedAt = firstBody.preferences.updatedAt;
    expect(typeof firstUpdatedAt).toBe('number');

    await new Promise((resolve) => setTimeout(resolve, 2));

    const second = await apiRequest('PUT', '/api/preferences', kv, {
      baseUpdatedAt: firstUpdatedAt,
      theme: 'light',
      locale: 'de',
    }, cookie);
    expect(second.status).toBe(200);
    const secondBody = await second.json() as { preferences: { updatedAt?: number; theme?: string; locale?: string } };
    const secondUpdatedAt = secondBody.preferences.updatedAt;
    expect(typeof secondUpdatedAt).toBe('number');
    expect(secondBody.preferences.theme).toBe('light');
    expect(secondBody.preferences.locale).toBe('de');

    const stale = await apiRequest('PUT', '/api/preferences', kv, {
      baseUpdatedAt: firstUpdatedAt,
      theme: 'dark',
      locale: 'ja',
    }, cookie);
    expect(stale.status).toBe(409);
    const staleBody = await stale.json() as { error?: string; preferences?: { updatedAt?: number; theme?: string; locale?: string } };
    expect(staleBody.error).toContain('stale');
    expect(staleBody.preferences?.theme).toBe('light');
    expect(staleBody.preferences?.locale).toBe('de');
    expect(staleBody.preferences?.updatedAt).toBe(secondUpdatedAt);
  });

  it('partial updates merge with existing preferences', async () => {
    const kv = new MemoryKV();
    const cookie = await createSessionCookie('user-pref-3');

    const initial = await apiRequest('PUT', '/api/preferences', kv, {
      theme: 'dark',
      activeTheme: 'parchment',
      lowFx: true,
      accentColor: '#F38020',
      locale: 'fr',
    }, cookie);
    expect(initial.status).toBe(200);
    const initialBody = await initial.json() as { preferences: { updatedAt?: number } };
    const baseUpdatedAt = initialBody.preferences.updatedAt;

    const partial = await apiRequest('PUT', '/api/preferences', kv, {
      baseUpdatedAt,
      theme: 'light',
    }, cookie);
    expect(partial.status).toBe(200);
    const partialBody = await partial.json() as { preferences: Record<string, unknown> };
    expect(partialBody.preferences.theme).toBe('light');
    expect(partialBody.preferences.activeTheme).toBe('parchment');
    expect(partialBody.preferences.lowFx).toBe(true);
    expect(partialBody.preferences.accentColor).toBe('#F38020');
    expect(partialBody.preferences.locale).toBe('fr');

    const loaded = await apiRequest('GET', '/api/preferences', kv, undefined, cookie);
    expect(loaded.status).toBe(200);
    const loadedBody = await loaded.json() as { preferences: Record<string, unknown> };
    expect(loadedBody.preferences.theme).toBe('light');
    expect(loadedBody.preferences.activeTheme).toBe('parchment');
    expect(loadedBody.preferences.lowFx).toBe(true);
    expect(loadedBody.preferences.accentColor).toBe('#F38020');
    expect(loadedBody.preferences.locale).toBe('fr');
  });

  it('uses D1-backed preference storage when DB is available', async () => {
    const kv = new MemoryKV();
    const cookie = await createSessionCookie('user-pref-d1');
    await ensureD1PreferenceSchema();

    const save = await apiRequest('PUT', '/api/preferences', kv, {
      theme: 'light',
      activeTheme: 'high-contrast',
      lowFx: false,
      accentColor: '#112233',
      locale: 'ja',
    }, cookie, { useDb: true });
    expect(save.status).toBe(200);
    const saved = await save.json() as { preferences: Record<string, unknown> };
    expect(saved.preferences.theme).toBe('light');
    expect(saved.preferences.activeTheme).toBe('high-contrast');
    expect(saved.preferences.locale).toBe('ja');

    const load = await apiRequest('GET', '/api/preferences', kv, undefined, cookie, { useDb: true });
    expect(load.status).toBe(200);
    const loaded = await load.json() as { preferences: Record<string, unknown> };
    expect(loaded.preferences.theme).toBe('light');
    expect(loaded.preferences.activeTheme).toBe('high-contrast');
    expect(loaded.preferences.lowFx).toBe(false);
    expect(loaded.preferences.accentColor).toBe('#112233');
    expect(loaded.preferences.locale).toBe('ja');
    expect(kv.size()).toBe(0); // DB path should not touch KV storage.
  });
});
