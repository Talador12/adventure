// onboarding.ts - lightweight first-time user hint tracking via localStorage.

const STORAGE_KEY = 'adventure:onboarding';

type HintId = 'welcome' | 'create-character' | 'join-game' | 'dm-tools' | 'combat-basics' | 'spell-casting';

function load(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function hasSeenHint(id: HintId): boolean {
  return !!load()[id];
}

export function markHintSeen(id: HintId): void {
  const data = load();
  data[id] = true;
  save(data);
}

export function resetOnboarding(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// Returns true if the onboarding key exists at all (user has been here before)
export function hasOnboardingData(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
