import { describe, it, expect } from 'vitest';
import { SignJWT } from 'jose';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import worker from '../../_worker';

const JWT_SECRET = 'campaigns-test-secret';
const CAMPAIGN_MIGRATION_MARKER_VERSION = 'd1:v1';

type CampaignsKvLike = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
};

function campaignListKey(userId: string): string {
  return `user:${userId}:campaigns`;
}

function campaignMigrationMarkerKey(userId: string): string {
  return `user:${userId}:campaigns:migrated:${CAMPAIGN_MIGRATION_MARKER_VERSION}`;
}

async function createSessionCookie(userId: string, username: string): Promise<string> {
  const token = await new SignJWT({ user: { id: userId, username }, provider: 'discord' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(JWT_SECRET));
  return `adventure_session=${token}`;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function ensureD1CampaignSchema(): Promise<void> {
  await env.DB.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, display_name TEXT NOT NULL, avatar_url TEXT, created_at INTEGER NOT NULL DEFAULT (unixepoch()), updated_at INTEGER NOT NULL DEFAULT (unixepoch()))');
  await env.DB.exec('CREATE TABLE IF NOT EXISTS auth_providers (provider TEXT NOT NULL, provider_user_id TEXT NOT NULL, user_id TEXT NOT NULL, provider_username TEXT, provider_email TEXT, provider_avatar TEXT, created_at INTEGER NOT NULL DEFAULT (unixepoch()), PRIMARY KEY (provider, provider_user_id))');
  await env.DB.exec("CREATE TABLE IF NOT EXISTS campaigns (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT DEFAULT '', owner_id TEXT NOT NULL, created_at INTEGER NOT NULL DEFAULT (unixepoch()), updated_at INTEGER NOT NULL DEFAULT (unixepoch()), visibility TEXT NOT NULL DEFAULT 'private', archived INTEGER NOT NULL DEFAULT 0, archived_at INTEGER, password_hash TEXT)");
  await env.DB.exec("CREATE TABLE IF NOT EXISTS party_members (campaign_id TEXT NOT NULL, user_id TEXT NOT NULL, character_id TEXT, role TEXT NOT NULL DEFAULT 'player', joined_at INTEGER NOT NULL DEFAULT (unixepoch()), PRIMARY KEY (campaign_id, user_id))");
}

async function apiRequest(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  body?: Record<string, unknown>,
  cookie?: string,
  options?: { campaignsOverride?: CampaignsKvLike },
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
  const testEnv = { ...env, JWT_SECRET, CAMPAIGNS: options?.campaignsOverride ?? env.CAMPAIGNS };
  const response = await worker.fetch(request, testEnv as typeof env, ctx);
  await waitOnExecutionContext(ctx);
  return response;
}

describe('campaign APIs (D1 path)', () => {
  it('supports create/list/update/archive/restore flow', async () => {
    await ensureD1CampaignSchema();
    const roomId = `d1-camp-${Date.now().toString(36)}`;
    const cookie = await createSessionCookie(`owner-${roomId}`, 'OwnerOne');

    const create = await apiRequest('POST', '/api/campaigns', { roomId, name: 'Vault of Echoes' }, cookie);
    expect(create.status).toBe(200);

    const list1 = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(list1.status).toBe(200);
    const list1Body = await list1.json() as { campaigns: Array<Record<string, unknown>> };
    const created = list1Body.campaigns.find((c) => c.roomId === roomId);
    expect(created?.name).toBe('Vault of Echoes');
    expect(created?.archived).toBeUndefined();

    const patch = await apiRequest('PATCH', `/api/campaigns/${roomId}`, {
      description: 'A haunted archive beneath the old keep',
      visibility: 'public',
      password: 'opensesame',
    }, cookie);
    expect(patch.status).toBe(200);
    const patchBody = await patch.json() as { campaign?: Record<string, unknown> };
    expect(patchBody.campaign?.hasPassword).toBe(true);
    expect(patchBody.campaign?.visibility).toBe('public');

    const publicList = await apiRequest('GET', '/api/campaigns/public');
    expect(publicList.status).toBe(200);
    const publicBody = await publicList.json() as { campaigns: Array<Record<string, unknown>> };
    expect(publicBody.campaigns.some((c) => c.roomId === roomId)).toBe(true);

    const lobbyInfo = await apiRequest('GET', `/api/lobby/${roomId}/info`);
    expect(lobbyInfo.status).toBe(200);
    const lobbyInfoBody = await lobbyInfo.json() as { hasPassword: boolean };
    expect(lobbyInfoBody.hasPassword).toBe(true);

    const badPassword = await apiRequest('POST', `/api/lobby/${roomId}/verify`, { password: 'wrong' });
    expect(badPassword.status).toBe(403);

    const goodPassword = await apiRequest('POST', `/api/lobby/${roomId}/verify`, { password: 'opensesame' });
    expect(goodPassword.status).toBe(200);
    const goodBody = await goodPassword.json() as { ok: boolean };
    expect(goodBody.ok).toBe(true);

    const archive = await apiRequest('DELETE', `/api/campaigns/${roomId}`, undefined, cookie);
    expect(archive.status).toBe(200);

    const list2 = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    const list2Body = await list2.json() as { campaigns: Array<Record<string, unknown>> };
    const archived = list2Body.campaigns.find((c) => c.roomId === roomId);
    expect(archived?.archived).toBe(true);

    const restore = await apiRequest('POST', `/api/campaigns/${roomId}/restore`, undefined, cookie);
    expect(restore.status).toBe(200);

    const list3 = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    const list3Body = await list3.json() as { campaigns: Array<Record<string, unknown>> };
    const restored = list3Body.campaigns.find((c) => c.roomId === roomId);
    expect(restored?.archived).toBeUndefined();
  });

  it('rejects roomId collisions across different owners', async () => {
    await ensureD1CampaignSchema();
    const roomId = `d1-collision-${Date.now().toString(36)}`;
    const ownerA = await createSessionCookie(`ownerA-${roomId}`, 'OwnerA');
    const ownerB = await createSessionCookie(`ownerB-${roomId}`, 'OwnerB');

    const first = await apiRequest('POST', '/api/campaigns', { roomId, name: 'Owner A Room' }, ownerA);
    expect(first.status).toBe(200);

    const second = await apiRequest('POST', '/api/campaigns', { roomId, name: 'Owner B Room' }, ownerB);
    expect(second.status).toBe(409);
  });

  it('lazy-migrates legacy KV campaign metadata into D1 on first list request', async () => {
    await ensureD1CampaignSchema();
    const roomId = `legacy-${Date.now().toString(36)}`;
    const cookie = await createSessionCookie(`legacy-owner-${roomId}`, 'LegacyOwner');
    const passwordHash = await sha256Hex('legacy-pass');

    await env.CAMPAIGNS.put(`user:legacy-owner-${roomId}:campaigns`, JSON.stringify([
      {
        roomId: '   ',
        name: 'Invalid Room Id',
        description: 'Should be skipped',
      },
      {
        roomId,
        name: 'Legacy Keep',
        description: 'Imported from KV list',
        visibility: 'public',
        passwordHash,
        hasPassword: true,
        createdAt: Date.now() - 5000,
        updatedAt: Date.now() - 1000,
      },
    ]));

    const firstList = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(firstList.status).toBe(200);
    const firstBody = await firstList.json() as { campaigns: Array<Record<string, unknown>> };
    const migrated = firstBody.campaigns.find((c) => c.roomId === roomId);
    expect(migrated?.name).toBe('Legacy Keep');
    expect(migrated?.visibility).toBe('public');
    expect(migrated?.hasPassword).toBe(true);
    expect(firstBody.campaigns.some((c) => String(c.name).includes('Invalid Room Id'))).toBe(false);

    await env.CAMPAIGNS.delete(`user:legacy-owner-${roomId}:campaigns`);

    const secondList = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(secondList.status).toBe(200);
    const secondBody = await secondList.json() as { campaigns: Array<Record<string, unknown>> };
    expect(secondBody.campaigns.some((c) => c.roomId === roomId)).toBe(true);

    const publicList = await apiRequest('GET', '/api/campaigns/public');
    expect(publicList.status).toBe(200);
    const publicBody = await publicList.json() as { campaigns: Array<Record<string, unknown>> };
    expect(publicBody.campaigns.some((c) => c.roomId === roomId)).toBe(true);

    const lobbyInfo = await apiRequest('GET', `/api/lobby/${roomId}/info`);
    expect(lobbyInfo.status).toBe(200);
    const lobbyBody = await lobbyInfo.json() as { hasPassword: boolean };
    expect(lobbyBody.hasPassword).toBe(true);

    const verify = await apiRequest('POST', `/api/lobby/${roomId}/verify`, { password: 'legacy-pass' });
    expect(verify.status).toBe(200);
    const verifyBody = await verify.json() as { ok: boolean };
    expect(verifyBody.ok).toBe(true);
  });

  it('prefers D1 public campaign list over KV index when DB is available', async () => {
    await ensureD1CampaignSchema();
    const markerRoomId = `kv-only-${Date.now().toString(36)}`;
    await env.CAMPAIGNS.put('campaigns:public', JSON.stringify([
      {
        roomId: markerRoomId,
        name: 'KV Only Marker',
        description: 'Should not leak when D1 is active',
        dmName: 'KV',
        playerCount: 99,
        updatedAt: Date.now(),
      },
    ]));

    const publicList = await apiRequest('GET', '/api/campaigns/public');
    expect(publicList.status).toBe(200);
    const body = await publicList.json() as { campaigns: Array<Record<string, unknown>> };
    expect(body.campaigns.some((c) => c.roomId === markerRoomId)).toBe(false);
  });

  it('caps lazy backfill imports to 500 legacy campaigns', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-cap-owner-${seed}`;
    const cookie = await createSessionCookie(userId, 'LegacyCapOwner');
    const prefix = `legacy-cap-${seed}`;

    const legacyCampaigns = Array.from({ length: 505 }, (_, i) => ({
      roomId: `${prefix}-${i}`,
      name: `Legacy ${i}`,
      createdAt: Date.now() - 10_000 + i,
      updatedAt: Date.now() - 5_000 + i,
    }));
    await env.CAMPAIGNS.put(campaignListKey(userId), JSON.stringify(legacyCampaigns));

    const list = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(list.status).toBe(200);
    const body = await list.json() as { campaigns: Array<Record<string, unknown>> };
    const imported = body.campaigns.filter((c) => String(c.roomId || '').startsWith(prefix));
    expect(imported.length).toBe(500);
  });

  it('skips conflicting legacy roomIds owned by other users during backfill', async () => {
    await ensureD1CampaignSchema();
    const roomId = `legacy-conflict-${Date.now().toString(36)}`;
    const ownerA = await createSessionCookie(`ownerA-${roomId}`, 'OwnerA');
    const ownerBId = `ownerB-${roomId}`;
    const ownerB = await createSessionCookie(ownerBId, 'OwnerB');

    const createA = await apiRequest('POST', '/api/campaigns', { roomId, name: 'Owner A Campaign' }, ownerA);
    expect(createA.status).toBe(200);

    await env.CAMPAIGNS.put(`user:${ownerBId}:campaigns`, JSON.stringify([
      {
        roomId,
        name: 'Owner B Legacy Copy',
        createdAt: Date.now() - 2000,
        updatedAt: Date.now() - 1000,
      },
    ]));

    const listB = await apiRequest('GET', '/api/campaigns', undefined, ownerB);
    expect(listB.status).toBe(200);
    const bodyB = await listB.json() as { campaigns: Array<Record<string, unknown>> };
    expect(bodyB.campaigns.some((c) => c.roomId === roomId)).toBe(false);
  });

  it('marks one-time migration complete even for malformed legacy payloads', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-malformed-${seed}`;
    const cookie = await createSessionCookie(userId, 'MalformedLegacyUser');
    const legacyKey = campaignListKey(userId);
    const markerKey = campaignMigrationMarkerKey(userId);

    await env.CAMPAIGNS.put(legacyKey, '{not valid json');

    const first = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(first.status).toBe(200);
    const firstBody = await first.json() as { campaigns: Array<Record<string, unknown>> };
    expect(firstBody.campaigns.length).toBe(0);

    const marker = await env.CAMPAIGNS.get(markerKey);
    expect(typeof marker).toBe('string');

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([{ roomId: `late-${seed}`, name: 'Late Legacy Campaign' }]));

    const second = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(second.status).toBe(200);
    const secondBody = await second.json() as { campaigns: Array<Record<string, unknown>> };
    expect(secondBody.campaigns.some((c) => String(c.roomId || '').startsWith('late-'))).toBe(false);
  });

  it('does not re-import new legacy entries after migration marker is set', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-marker-${seed}`;
    const cookie = await createSessionCookie(userId, 'MarkerUser');
    const legacyKey = campaignListKey(userId);
    const firstRoomId = `first-${seed}`;
    const secondRoomId = `second-${seed}`;

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([
      { roomId: firstRoomId, name: 'First Legacy Campaign', createdAt: Date.now() - 2000, updatedAt: Date.now() - 1500 },
    ]));

    const first = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(first.status).toBe(200);
    const firstBody = await first.json() as { campaigns: Array<Record<string, unknown>> };
    expect(firstBody.campaigns.some((c) => c.roomId === firstRoomId)).toBe(true);

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([
      { roomId: firstRoomId, name: 'First Legacy Campaign', createdAt: Date.now() - 2000, updatedAt: Date.now() - 1500 },
      { roomId: secondRoomId, name: 'Second Legacy Campaign', createdAt: Date.now() - 1000, updatedAt: Date.now() - 500 },
    ]));

    const second = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(second.status).toBe(200);
    const secondBody = await second.json() as { campaigns: Array<Record<string, unknown>> };
    expect(secondBody.campaigns.some((c) => c.roomId === firstRoomId)).toBe(true);
    expect(secondBody.campaigns.some((c) => c.roomId === secondRoomId)).toBe(false);
  });

  it('still returns migrated campaigns when marker write fails', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-marker-fail-${seed}`;
    const cookie = await createSessionCookie(userId, 'MarkerWriteFailUser');
    const legacyKey = campaignListKey(userId);
    const markerKey = campaignMigrationMarkerKey(userId);
    const roomId = `marker-fail-${seed}`;

    const store = new Map<string, string>();
    store.set(legacyKey, JSON.stringify([{ roomId, name: 'Marker Failure Campaign', createdAt: Date.now() - 500, updatedAt: Date.now() - 250 }]));

    const failingCampaignsKv: CampaignsKvLike = {
      get: async (key: string) => store.get(key) ?? null,
      put: async (key: string, value: string) => {
        if (key === markerKey) throw new Error('marker write failed');
        store.set(key, value);
      },
      delete: async (key: string) => {
        store.delete(key);
      },
    };

    const list = await apiRequest('GET', '/api/campaigns', undefined, cookie, { campaignsOverride: failingCampaignsKv });
    expect(list.status).toBe(200);
    const body = await list.json() as { campaigns: Array<Record<string, unknown>> };
    expect(body.campaigns.some((c) => c.roomId === roomId)).toBe(true);
  });

  it('does not mark migration complete when legacy KV read fails', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-read-fail-${seed}`;
    const cookie = await createSessionCookie(userId, 'LegacyReadFailUser');
    const legacyKey = campaignListKey(userId);
    const markerKey = campaignMigrationMarkerKey(userId);
    const roomId = `legacy-read-room-${seed}`;

    const store = new Map<string, string>();
    store.set(legacyKey, JSON.stringify([{ roomId, name: 'Recovered Legacy Campaign', createdAt: Date.now() - 500, updatedAt: Date.now() - 250 }]));
    let failLegacyReadOnce = true;

    const flakyCampaignsKv: CampaignsKvLike = {
      get: async (key: string) => {
        if (key === legacyKey && failLegacyReadOnce) {
          failLegacyReadOnce = false;
          throw new Error('temporary kv read failure');
        }
        return store.get(key) ?? null;
      },
      put: async (key: string, value: string) => {
        store.set(key, value);
      },
      delete: async (key: string) => {
        store.delete(key);
      },
    };

    const first = await apiRequest('GET', '/api/campaigns', undefined, cookie, { campaignsOverride: flakyCampaignsKv });
    expect(first.status).toBe(200);
    const firstBody = await first.json() as { campaigns: Array<Record<string, unknown>> };
    expect(firstBody.campaigns.some((c) => c.roomId === roomId)).toBe(false);
    expect(store.has(markerKey)).toBe(false);

    const second = await apiRequest('GET', '/api/campaigns', undefined, cookie, { campaignsOverride: flakyCampaignsKv });
    expect(second.status).toBe(200);
    const secondBody = await second.json() as { campaigns: Array<Record<string, unknown>> };
    expect(secondBody.campaigns.some((c) => c.roomId === roomId)).toBe(true);
    expect(store.has(markerKey)).toBe(true);
  });

  it('sets marker on empty legacy list and does not import later additions', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-empty-${seed}`;
    const cookie = await createSessionCookie(userId, 'EmptyLegacyUser');
    const legacyKey = campaignListKey(userId);
    const markerKey = campaignMigrationMarkerKey(userId);
    const lateRoomId = `late-empty-${seed}`;

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([]));

    const first = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(first.status).toBe(200);
    const firstBody = await first.json() as { campaigns: Array<Record<string, unknown>> };
    expect(firstBody.campaigns.length).toBe(0);
    const marker = await env.CAMPAIGNS.get(markerKey);
    expect(typeof marker).toBe('string');

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([
      { roomId: lateRoomId, name: 'Late Empty Legacy Campaign', createdAt: Date.now() - 500, updatedAt: Date.now() - 250 },
    ]));

    const second = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(second.status).toBe(200);
    const secondBody = await second.json() as { campaigns: Array<Record<string, unknown>> };
    expect(secondBody.campaigns.some((c) => c.roomId === lateRoomId)).toBe(false);
  });

  it('marks migration complete for invalid-shape legacy payloads', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-shape-${seed}`;
    const cookie = await createSessionCookie(userId, 'ShapeLegacyUser');
    const legacyKey = campaignListKey(userId);
    const markerKey = campaignMigrationMarkerKey(userId);

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify({ roomId: `bad-${seed}` }));

    const first = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(first.status).toBe(200);
    const marker = await env.CAMPAIGNS.get(markerKey);
    expect(typeof marker).toBe('string');

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([{ roomId: `late-shape-${seed}`, name: 'Late Shape Campaign' }]));

    const second = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(second.status).toBe(200);
    const secondBody = await second.json() as { campaigns: Array<Record<string, unknown>> };
    expect(secondBody.campaigns.some((c) => String(c.roomId || '').startsWith('late-shape-'))).toBe(false);
  });

  it('deduplicates legacy roomIds before applying migration cap', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-dedupe-${seed}`;
    const cookie = await createSessionCookie(userId, 'DedupLegacyUser');
    const legacyKey = campaignListKey(userId);
    const prefix = `dupe-${seed}`;
    const tailPrefix = `tail-${seed}`;

    const legacyCampaigns: Array<Record<string, unknown>> = [];
    for (let i = 0; i < 250; i += 1) {
      legacyCampaigns.push({ roomId: `${prefix}-${i}`, name: `Dup ${i} A`, createdAt: Date.now() - 4000 + i, updatedAt: Date.now() - 3000 + i });
      legacyCampaigns.push({ roomId: `${prefix}-${i}`, name: `Dup ${i} B`, createdAt: Date.now() - 4000 + i, updatedAt: Date.now() - 3000 + i });
    }
    for (let i = 0; i < 10; i += 1) {
      legacyCampaigns.push({ roomId: `${tailPrefix}-${i}`, name: `Tail ${i}`, createdAt: Date.now() - 1000 + i, updatedAt: Date.now() - 500 + i });
    }
    await env.CAMPAIGNS.put(legacyKey, JSON.stringify(legacyCampaigns));

    const list = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(list.status).toBe(200);
    const body = await list.json() as { campaigns: Array<Record<string, unknown>> };
    const importedTail = body.campaigns.filter((c) => String(c.roomId || '').startsWith(tailPrefix));
    expect(importedTail.length).toBe(10);
  });

  it('filters invalid roomIds before applying migration cap', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-invalid-cap-${seed}`;
    const cookie = await createSessionCookie(userId, 'InvalidCapUser');
    const legacyKey = campaignListKey(userId);
    const validPrefix = `valid-after-invalid-${seed}`;

    const legacyCampaigns: Array<Record<string, unknown>> = [];
    for (let i = 0; i < 600; i += 1) {
      legacyCampaigns.push({ roomId: '   ', name: `Invalid ${i}` });
    }
    for (let i = 0; i < 5; i += 1) {
      legacyCampaigns.push({ roomId: `${validPrefix}-${i}`, name: `Valid ${i}`, createdAt: Date.now() - 1000 + i, updatedAt: Date.now() - 500 + i });
    }
    await env.CAMPAIGNS.put(legacyKey, JSON.stringify(legacyCampaigns));

    const list = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(list.status).toBe(200);
    const body = await list.json() as { campaigns: Array<Record<string, unknown>> };
    const importedValid = body.campaigns.filter((c) => String(c.roomId || '').startsWith(validPrefix));
    expect(importedValid.length).toBe(5);
  });

  it('keeps the newest duplicate campaign metadata during dedupe', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-newest-dupe-${seed}`;
    const cookie = await createSessionCookie(userId, 'NewestDupeUser');
    const legacyKey = campaignListKey(userId);
    const roomId = `dupe-latest-${seed}`;

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([
      {
        roomId,
        name: 'Older Name',
        description: 'older',
        createdAt: Date.now() - 5000,
        updatedAt: Date.now() - 4000,
      },
      {
        roomId,
        name: 'Newest Name',
        description: 'newest',
        createdAt: Date.now() - 5000,
        updatedAt: Date.now() - 1000,
      },
    ]));

    const list = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(list.status).toBe(200);
    const body = await list.json() as { campaigns: Array<Record<string, unknown>> };
    const migrated = body.campaigns.find((c) => c.roomId === roomId);
    expect(migrated?.name).toBe('Newest Name');
    expect(migrated?.description).toBe('newest');
  });

  it('does not treat missing duplicate timestamps as newer metadata', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-missing-ts-${seed}`;
    const cookie = await createSessionCookie(userId, 'MissingTsUser');
    const legacyKey = campaignListKey(userId);
    const roomId = `dupe-missing-ts-${seed}`;

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([
      {
        roomId,
        name: 'Timestamped Campaign',
        description: 'with timestamp',
        updatedAt: Date.now() - 1000,
      },
      {
        roomId,
        name: 'Missing Timestamp Campaign',
        description: 'no timestamp',
      },
    ]));

    const list = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(list.status).toBe(200);
    const body = await list.json() as { campaigns: Array<Record<string, unknown>> };
    const migrated = body.campaigns.find((c) => c.roomId === roomId);
    expect(migrated?.name).toBe('Timestamped Campaign');
    expect(migrated?.description).toBe('with timestamp');
  });

  it('prefers richer metadata when duplicate timestamps tie', async () => {
    await ensureD1CampaignSchema();
    const seed = Date.now().toString(36);
    const userId = `legacy-rich-dupe-${seed}`;
    const cookie = await createSessionCookie(userId, 'RichDupeUser');
    const legacyKey = campaignListKey(userId);
    const roomId = `dupe-rich-${seed}`;
    const sharedUpdatedAt = Date.now() - 2000;

    await env.CAMPAIGNS.put(legacyKey, JSON.stringify([
      {
        roomId,
        name: 'Sparse Campaign',
        updatedAt: sharedUpdatedAt,
      },
      {
        roomId,
        name: 'Richer Campaign',
        description: 'more complete metadata',
        visibility: 'public',
        passwordHash: 'abc123',
        updatedAt: sharedUpdatedAt,
      },
    ]));

    const list = await apiRequest('GET', '/api/campaigns', undefined, cookie);
    expect(list.status).toBe(200);
    const body = await list.json() as { campaigns: Array<Record<string, unknown>> };
    const migrated = body.campaigns.find((c) => c.roomId === roomId);
    expect(migrated?.name).toBe('Richer Campaign');
    expect(migrated?.description).toBe('more complete metadata');
    expect(migrated?.visibility).toBe('public');
    expect(migrated?.hasPassword).toBe(true);
  });
});
