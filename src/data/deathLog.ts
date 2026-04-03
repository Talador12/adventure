// Character death log — memorial wall tracking how/when characters died.

export interface DeathRecord {
  id: string;
  characterName: string;
  characterClass: string;
  characterLevel: number;
  causeOfDeath: string;
  killedBy: string;
  location: string;
  campaignId: string;
  timestamp: number;
  epitaph: string;
  sessionNumber: number;
}

export interface DeathLogState {
  records: DeathRecord[];
}

const STORAGE_KEY = 'adventure:deathlog';

export function loadDeathLog(): DeathLogState {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : { records: [] }; }
  catch { return { records: [] }; }
}

export function saveDeathLog(state: DeathLogState): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export function recordDeath(
  state: DeathLogState, characterName: string, characterClass: string, characterLevel: number,
  causeOfDeath: string, killedBy: string, location: string, campaignId: string, sessionNumber: number,
): DeathLogState {
  const epitaphs = [
    `Here lies ${characterName}, who fought bravely.`,
    `${characterName} — gone but not forgotten.`,
    `In memory of ${characterName}, who fell in the line of duty.`,
    `${characterName} died as they lived — adventurously.`,
    `Rest in peace, ${characterName}. The party mourns.`,
  ];
  const record: DeathRecord = {
    id: crypto.randomUUID(), characterName, characterClass, characterLevel,
    causeOfDeath, killedBy, location, campaignId, timestamp: Date.now(),
    epitaph: epitaphs[Math.floor(Math.random() * epitaphs.length)], sessionNumber,
  };
  return { records: [...state.records, record] };
}

export function getDeathsByCharacter(state: DeathLogState, characterName: string): DeathRecord[] {
  return state.records.filter((r) => r.characterName === characterName);
}

export function getDeathCount(state: DeathLogState): number { return state.records.length; }

export function getMostDeadlyEnemy(state: DeathLogState): { name: string; kills: number } | null {
  const counts: Record<string, number> = {};
  for (const r of state.records) counts[r.killedBy] = (counts[r.killedBy] || 0) + 1;
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0] ? { name: sorted[0][0], kills: sorted[0][1] } : null;
}

export function formatDeathLog(state: DeathLogState): string {
  if (state.records.length === 0) return '⚰️ **Memorial Wall:** No deaths recorded. May it stay that way.';
  const lines = [`⚰️ **Memorial Wall** (${state.records.length} fallen):`];
  for (const r of state.records.slice(-10).reverse()) {
    lines.push(`💀 **${r.characterName}** (Lv ${r.characterLevel} ${r.characterClass}) — ${r.causeOfDeath} by ${r.killedBy}`);
    lines.push(`  *"${r.epitaph}"*`);
  }
  const deadliest = getMostDeadlyEnemy(state);
  if (deadliest) lines.push(`\n🏆 Deadliest enemy: **${deadliest.name}** (${deadliest.kills} kill${deadliest.kills > 1 ? 's' : ''})`);
  return lines.join('\n');
}
