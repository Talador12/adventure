// Random encounter table builder — DM creates custom d100 encounter tables.

export interface EncounterTableEntry {
  minRoll: number;
  maxRoll: number;
  description: string;
  type: 'combat' | 'social' | 'hazard' | 'discovery' | 'nothing';
}

export interface EncounterTable {
  id: string;
  name: string;
  entries: EncounterTableEntry[];
}

export const PRESET_TABLES: EncounterTable[] = [
  {
    id: 'forest-road', name: 'Forest Road',
    entries: [
      { minRoll: 1, maxRoll: 10, description: 'Nothing — peaceful travel.', type: 'nothing' },
      { minRoll: 11, maxRoll: 25, description: '1d4 wolves emerge from the treeline.', type: 'combat' },
      { minRoll: 26, maxRoll: 40, description: 'A traveling merchant offers wares.', type: 'social' },
      { minRoll: 41, maxRoll: 55, description: 'A fallen tree blocks the path.', type: 'hazard' },
      { minRoll: 56, maxRoll: 70, description: 'An abandoned campsite with cold embers.', type: 'discovery' },
      { minRoll: 71, maxRoll: 85, description: '2d4 bandits demand a toll.', type: 'combat' },
      { minRoll: 86, maxRoll: 95, description: 'A wounded NPC stumbles onto the road.', type: 'social' },
      { minRoll: 96, maxRoll: 100, description: 'An owlbear crashes through the brush!', type: 'combat' },
    ],
  },
  {
    id: 'dungeon-hallway', name: 'Dungeon Hallway',
    entries: [
      { minRoll: 1, maxRoll: 15, description: 'Empty corridor — dust and silence.', type: 'nothing' },
      { minRoll: 16, maxRoll: 30, description: '1d6 skeletons patrol the hallway.', type: 'combat' },
      { minRoll: 31, maxRoll: 45, description: 'A pressure plate trap (DC 13 to spot).', type: 'hazard' },
      { minRoll: 46, maxRoll: 60, description: 'Ancient writing on the wall — Arcana DC 12 to read.', type: 'discovery' },
      { minRoll: 61, maxRoll: 75, description: 'A locked door with strange runes.', type: 'hazard' },
      { minRoll: 76, maxRoll: 90, description: 'A gelatinous cube fills the corridor!', type: 'combat' },
      { minRoll: 91, maxRoll: 100, description: 'A hidden treasure alcove behind a loose stone.', type: 'discovery' },
    ],
  },
];

export function rollOnTable(table: EncounterTable): { roll: number; entry: EncounterTableEntry } {
  const roll = Math.floor(Math.random() * 100) + 1;
  const entry = table.entries.find((e) => roll >= e.minRoll && roll <= e.maxRoll) || table.entries[0];
  return { roll, entry };
}

export function validateTable(table: EncounterTable): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (table.entries.length === 0) errors.push('Table has no entries.');
  const covered = new Set<number>();
  for (const e of table.entries) {
    for (let i = e.minRoll; i <= e.maxRoll; i++) covered.add(i);
  }
  for (let i = 1; i <= 100; i++) { if (!covered.has(i)) errors.push(`Roll ${i} has no entry.`); }
  return { valid: errors.length === 0, errors };
}

export function formatTableRoll(tableName: string, roll: number, entry: EncounterTableEntry): string {
  const icon = entry.type === 'combat' ? '⚔️' : entry.type === 'social' ? '💬' : entry.type === 'hazard' ? '⚠️' : entry.type === 'discovery' ? '🔍' : '✅';
  return `🎲 **${tableName}** — Roll: ${roll}\n${icon} ${entry.description}`;
}
