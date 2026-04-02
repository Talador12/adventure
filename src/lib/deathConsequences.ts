// Death consequences — lasting effects from being revived.
// Each time a character is raised, they gain a scar or debuff that persists.

export type ScarType = 'physical' | 'mental' | 'spiritual' | 'cosmetic';

export interface DeathScar {
  id: string;
  type: ScarType;
  name: string;
  description: string;
  mechanicalEffect: string;
  statPenalty?: { stat: string; amount: number };
  durationDays: number; // -1 = permanent until Greater Restoration
}

export interface ResurrectionRecord {
  characterId: string;
  timestamp: number;
  spell: string;
  scar: DeathScar;
  healed: boolean;
}

const SCAR_POOL: DeathScar[] = [
  // Physical scars
  { id: 'limp', type: 'physical', name: 'Lingering Limp', description: 'One leg never fully recovered.', mechanicalEffect: 'Speed reduced by 5ft.', durationDays: -1 },
  { id: 'weak-grip', type: 'physical', name: 'Weak Grip', description: 'Hands tremble from the ordeal.', mechanicalEffect: '-1 to STR-based attack rolls for 7 days.', statPenalty: { stat: 'STR', amount: -1 }, durationDays: 7 },
  { id: 'scarred-face', type: 'cosmetic', name: 'Death\'s Mark', description: 'A pallid scar across the face where death touched you.', mechanicalEffect: '-1 CHA checks with strangers, +1 with intimidation.', durationDays: -1 },
  { id: 'frail', type: 'physical', name: 'Frailty', description: 'The body hasn\'t fully recovered its vitality.', mechanicalEffect: '-2 max HP for 7 days.', statPenalty: { stat: 'CON', amount: -1 }, durationDays: 7 },

  // Mental scars
  { id: 'nightmares', type: 'mental', name: 'Death Nightmares', description: 'Visions of the afterlife haunt your sleep.', mechanicalEffect: 'Long rests only recover half hit dice for 7 days.', durationDays: 7 },
  { id: 'fear-of-dark', type: 'mental', name: 'Fear of Darkness', description: 'The void left an imprint. Darkness is terrifying.', mechanicalEffect: 'Disadvantage on saves vs fear in dim/dark conditions.', durationDays: -1 },
  { id: 'detachment', type: 'mental', name: 'Emotional Detachment', description: 'Colors seem muted. Joy is harder to feel.', mechanicalEffect: '-1 to CHA-based checks for 14 days.', statPenalty: { stat: 'CHA', amount: -1 }, durationDays: 14 },

  // Spiritual scars
  { id: 'hollow', type: 'spiritual', name: 'Hollow Soul', description: 'Part of your soul didn\'t make it back.', mechanicalEffect: '-1 to WIS saves for 14 days.', statPenalty: { stat: 'WIS', amount: -1 }, durationDays: 14 },
  { id: 'death-sense', type: 'spiritual', name: 'Death Sense', description: 'You can feel when death is near.', mechanicalEffect: 'Advantage on Medicine checks for dying creatures. -1 WIS.', statPenalty: { stat: 'WIS', amount: -1 }, durationDays: -1 },
  { id: 'thinned-veil', type: 'spiritual', name: 'Thinned Veil', description: 'The barrier between worlds is weaker around you.', mechanicalEffect: 'Can see ghosts/spirits. Undead sense you at double range.', durationDays: -1 },
];

const STORAGE_KEY = 'adventure:resurrections';

export function rollDeathScar(): DeathScar {
  return SCAR_POOL[Math.floor(Math.random() * SCAR_POOL.length)];
}

export function getScarsBySeverity(deathCount: number): DeathScar {
  // More deaths = worse scars (spiritual scars for 3+ deaths)
  const pool = deathCount >= 3
    ? SCAR_POOL.filter((s) => s.type === 'spiritual' || s.type === 'mental')
    : deathCount >= 2
    ? SCAR_POOL.filter((s) => s.type === 'mental' || s.type === 'physical')
    : SCAR_POOL.filter((s) => s.type === 'physical' || s.type === 'cosmetic');
  return pool[Math.floor(Math.random() * pool.length)] || SCAR_POOL[0];
}

export function loadResurrectionHistory(): ResurrectionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveResurrectionHistory(records: ResurrectionRecord[]): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch {}
}

export function recordResurrection(characterId: string, spell: string): { record: ResurrectionRecord; scar: DeathScar } {
  const history = loadResurrectionHistory();
  const priorDeaths = history.filter((r) => r.characterId === characterId).length;
  const scar = getScarsBySeverity(priorDeaths + 1);
  const record: ResurrectionRecord = { characterId, timestamp: Date.now(), spell, scar, healed: false };
  history.push(record);
  saveResurrectionHistory(history);
  return { record, scar };
}

export function getActiveScars(characterId: string): DeathScar[] {
  const history = loadResurrectionHistory();
  return history.filter((r) => r.characterId === characterId && !r.healed).map((r) => r.scar);
}

export function formatDeathConsequence(scar: DeathScar, characterName: string, spell: string): string {
  const typeIcon = scar.type === 'physical' ? '🩹' : scar.type === 'mental' ? '🧠' : scar.type === 'spiritual' ? '👻' : '💀';
  return `${typeIcon} **${characterName}** returns via ${spell}, but bears a mark: **${scar.name}**\n*${scar.description}*\nEffect: ${scar.mechanicalEffect}${scar.durationDays > 0 ? ` (${scar.durationDays} days)` : ' (until Greater Restoration)'}`;
}
