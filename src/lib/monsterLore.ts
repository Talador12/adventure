// Monster lore journal — players unlock monster stats as they encounter them.
// First encounter reveals basic info; subsequent encounters reveal more.

export type LoreLevel = 0 | 1 | 2 | 3; // unknown, basic, detailed, expert

export interface MonsterLoreEntry {
  monsterId: string;
  monsterName: string;
  loreLevel: LoreLevel;
  encounterCount: number;
  firstEncountered: number;
  lastEncountered: number;
  killCount: number;
  notes: string;
}

export interface MonsterLoreJournal {
  entries: MonsterLoreEntry[];
}

// What info is revealed at each lore level
export const LORE_REVEALS: Record<LoreLevel, string[]> = {
  0: [], // unknown
  1: ['name', 'type', 'size', 'general_description'], // first encounter
  2: ['ac', 'approximate_hp', 'speed', 'resistances', 'vulnerabilities'], // 2-3 encounters
  3: ['exact_hp', 'attacks', 'special_abilities', 'immunities', 'legendary_actions'], // 4+ encounters or INT check
};

export function createJournal(): MonsterLoreJournal {
  return { entries: [] };
}

export function recordEncounter(journal: MonsterLoreJournal, monsterId: string, monsterName: string, killed: boolean): MonsterLoreJournal {
  const entries = [...journal.entries];
  let entry = entries.find((e) => e.monsterId === monsterId);

  if (!entry) {
    entry = {
      monsterId,
      monsterName,
      loreLevel: 1,
      encounterCount: 0,
      firstEncountered: Date.now(),
      lastEncountered: Date.now(),
      killCount: 0,
      notes: '',
    };
    entries.push(entry);
  }

  entry.encounterCount++;
  entry.lastEncountered = Date.now();
  if (killed) entry.killCount++;

  // Level up lore based on encounters
  if (entry.encounterCount >= 4 && entry.loreLevel < 3) entry.loreLevel = 3;
  else if (entry.encounterCount >= 2 && entry.loreLevel < 2) entry.loreLevel = 2;

  return { entries };
}

export function getLoreLevel(journal: MonsterLoreJournal, monsterId: string): LoreLevel {
  const entry = journal.entries.find((e) => e.monsterId === monsterId);
  return entry?.loreLevel || 0;
}

export function upgradeLore(journal: MonsterLoreJournal, monsterId: string): MonsterLoreJournal {
  const entries = journal.entries.map((e) => {
    if (e.monsterId === monsterId && e.loreLevel < 3) {
      return { ...e, loreLevel: (e.loreLevel + 1) as LoreLevel };
    }
    return e;
  });
  return { entries };
}

export function getRevealedInfo(loreLevel: LoreLevel): string[] {
  const revealed: string[] = [];
  for (let l = 0; l <= loreLevel; l++) {
    revealed.push(...LORE_REVEALS[l as LoreLevel]);
  }
  return revealed;
}

export function formatLoreEntry(entry: MonsterLoreEntry): string {
  const stars = '★'.repeat(entry.loreLevel) + '☆'.repeat(3 - entry.loreLevel);
  const reveals = getRevealedInfo(entry.loreLevel);
  const lines = [`📖 **${entry.monsterName}** [${stars}]`];
  lines.push(`Encounters: ${entry.encounterCount} | Kills: ${entry.killCount}`);
  lines.push(`Known: ${reveals.join(', ') || 'Nothing yet'}`);
  if (entry.notes) lines.push(`Notes: ${entry.notes}`);
  return lines.join('\n');
}

export function formatJournal(journal: MonsterLoreJournal): string {
  if (journal.entries.length === 0) return '📖 **Monster Lore Journal:** Empty — encounter monsters to learn about them.';
  const lines = [`📖 **Monster Lore Journal** (${journal.entries.length} entries):`];
  const sorted = [...journal.entries].sort((a, b) => b.lastEncountered - a.lastEncountered);
  for (const e of sorted.slice(0, 10)) {
    const stars = '★'.repeat(e.loreLevel) + '☆'.repeat(3 - e.loreLevel);
    lines.push(`${stars} **${e.monsterName}** — ${e.encounterCount} encounters, ${e.killCount} kills`);
  }
  return lines.join('\n');
}
