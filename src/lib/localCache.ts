// IndexedDB-backed local cache for characters and campaign state.
// Provides instant load from local storage while API fetches in background.
// Schema: one object store per data type, keyed by user/room ID.

const DB_NAME = 'adventure-cache';
const DB_VERSION = 1;
const STORE_CHARACTERS = 'characters';
const STORE_CAMPAIGNS = 'campaigns';
const STORE_CAMPAIGN_STATE = 'campaignState';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_CHARACTERS)) db.createObjectStore(STORE_CHARACTERS);
      if (!db.objectStoreNames.contains(STORE_CAMPAIGNS)) db.createObjectStore(STORE_CAMPAIGNS);
      if (!db.objectStoreNames.contains(STORE_CAMPAIGN_STATE)) db.createObjectStore(STORE_CAMPAIGN_STATE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getFromStore<T>(store: string, key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function putInStore<T>(store: string, key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve(); // silent fail — cache is best-effort
    });
  } catch {
    // IndexedDB unavailable — degrade gracefully
  }
}

// --- Public API ---

/** Cache characters for a user. Key = userId. */
export async function cacheCharacters(userId: string, characters: unknown[]): Promise<void> {
  await putInStore(STORE_CHARACTERS, userId, { characters, cachedAt: Date.now() });
}

/** Load cached characters for a user. Returns null if no cache or expired. */
export async function getCachedCharacters(userId: string, maxAgeMs = 300_000): Promise<unknown[] | null> {
  const data = await getFromStore<{ characters: unknown[]; cachedAt: number }>(STORE_CHARACTERS, userId);
  if (!data || Date.now() - data.cachedAt > maxAgeMs) return null;
  return data.characters;
}

/** Cache campaign list for a user. */
export async function cacheCampaigns(userId: string, campaigns: unknown[]): Promise<void> {
  await putInStore(STORE_CAMPAIGNS, userId, { campaigns, cachedAt: Date.now() });
}

/** Load cached campaign list. */
export async function getCachedCampaigns(userId: string, maxAgeMs = 300_000): Promise<unknown[] | null> {
  const data = await getFromStore<{ campaigns: unknown[]; cachedAt: number }>(STORE_CAMPAIGNS, userId);
  if (!data || Date.now() - data.cachedAt > maxAgeMs) return null;
  return data.campaigns;
}

/** Cache campaign game state. Key = roomId. */
export async function cacheCampaignState(roomId: string, state: unknown): Promise<void> {
  await putInStore(STORE_CAMPAIGN_STATE, roomId, { state, cachedAt: Date.now() });
}

/** Load cached campaign game state. */
export async function getCachedCampaignState(roomId: string, maxAgeMs = 600_000): Promise<unknown | null> {
  const data = await getFromStore<{ state: unknown; cachedAt: number }>(STORE_CAMPAIGN_STATE, roomId);
  if (!data || Date.now() - data.cachedAt > maxAgeMs) return null;
  return data.state;
}

/** Clear all cached data (e.g. on logout). */
export async function clearCache(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction([STORE_CHARACTERS, STORE_CAMPAIGNS, STORE_CAMPAIGN_STATE], 'readwrite');
    tx.objectStore(STORE_CHARACTERS).clear();
    tx.objectStore(STORE_CAMPAIGNS).clear();
    tx.objectStore(STORE_CAMPAIGN_STATE).clear();
  } catch {
    // silent
  }
}
