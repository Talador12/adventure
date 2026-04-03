// Random encounter complication — mid-combat twists that change the battle.
export interface EncounterComplication { description: string; mechanicalEffect: string; round: string; severity: 'minor' | 'major' | 'dramatic'; }
const COMPLICATIONS: EncounterComplication[] = [
  { description: 'Reinforcements arrive — 1d4 additional enemies from a side passage!', mechanicalEffect: 'Add enemies to initiative.', round: 'Round 3+', severity: 'major' },
  { description: 'The floor begins to collapse. Sections give way each round.', mechanicalEffect: 'Random 10ft squares become pits. DEX DC 12 to avoid.', round: 'Round 2+', severity: 'dramatic' },
  { description: 'A neutral third party enters the fight — they attack whoever is winning.', mechanicalEffect: 'New faction targets the side with more HP.', round: 'Round 4', severity: 'major' },
  { description: 'One of the enemies tries to surrender.', mechanicalEffect: 'Party must choose: accept or continue fighting. Alignment implications.', round: 'When enemy < 25% HP', severity: 'minor' },
  { description: 'A hostage is revealed — an enemy is using a civilian as a shield.', mechanicalEffect: 'Attacks against that enemy have disadvantage or risk hitting the hostage.', round: 'Round 1-2', severity: 'dramatic' },
  { description: 'The environment changes — weather shifts, terrain floods, or fire spreads.', mechanicalEffect: 'Difficult terrain + 1d4 elemental damage per round in affected area.', round: 'Round 3', severity: 'major' },
  { description: 'An enemy casts Darkness or Fog Cloud — visibility drops to zero.', mechanicalEffect: 'Heavily obscured. All attacks have disadvantage.', round: 'Round 2', severity: 'major' },
  { description: 'A trap triggers mid-combat, affecting both sides.', mechanicalEffect: 'DEX DC 13 for everyone in the area. 2d6 damage on fail.', round: 'When someone steps on it', severity: 'minor' },
  { description: 'The boss reveals a second phase — new abilities, healing, or transformation.', mechanicalEffect: 'Boss regains 50% HP and gains a new attack.', round: 'When boss < 25% HP', severity: 'dramatic' },
  { description: 'An ally NPC is mind-controlled and turns against the party.', mechanicalEffect: 'NPC switches sides. WIS DC 15 to end at end of each turn.', round: 'Round 3+', severity: 'dramatic' },
];
export function getRandomComplication(): EncounterComplication { return COMPLICATIONS[Math.floor(Math.random() * COMPLICATIONS.length)]; }
export function getComplicationsBySeverity(severity: EncounterComplication['severity']): EncounterComplication[] { return COMPLICATIONS.filter((c) => c.severity === severity); }
export function formatComplication(c: EncounterComplication): string { const icon = c.severity === 'dramatic' ? '🌋' : c.severity === 'major' ? '💥' : '⚡'; return `${icon} **Mid-Combat Twist!** (${c.severity}, ~${c.round})\n*${c.description}*\n⚙️ ${c.mechanicalEffect}`; }
