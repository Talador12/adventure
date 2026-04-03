// Saving throw reference — all save types with common sources and DCs.

export interface SaveInfo { ability: string; commonSources: string[]; exampleDCs: { source: string; dc: number }[]; description: string; }

export const SAVING_THROWS: SaveInfo[] = [
  { ability: 'STR', description: 'Resisting physical force.', commonSources: ['Shove', 'Grapple escape', 'Spell effects (Entangle)'], exampleDCs: [{ source: 'Entangle', dc: 13 }, { source: 'Web', dc: 13 }, { source: 'Telekinesis', dc: 15 }] },
  { ability: 'DEX', description: 'Dodging area effects and traps.', commonSources: ['Fireball', 'Lightning Bolt', 'Traps', 'Dragon breath'], exampleDCs: [{ source: 'Fireball', dc: 15 }, { source: 'Arrow trap', dc: 12 }, { source: 'Dragon breath', dc: 17 }] },
  { ability: 'CON', description: 'Enduring poison, disease, and concentration.', commonSources: ['Poison', 'Disease', 'Concentration', 'Exhaustion'], exampleDCs: [{ source: 'Basic poison', dc: 10 }, { source: 'Concentration (10 dmg)', dc: 10 }, { source: 'Cloudkill', dc: 15 }] },
  { ability: 'INT', description: 'Resisting mental manipulation and illusions.', commonSources: ['Phantasmal Force', 'Feeblemind', 'Mind Flayer'], exampleDCs: [{ source: 'Phantasmal Force', dc: 14 }, { source: 'Mind Blast', dc: 15 }, { source: 'Feeblemind', dc: 17 }] },
  { ability: 'WIS', description: 'Resisting charm, fear, and divine magic.', commonSources: ['Hold Person', 'Charm Person', 'Fear', 'Command'], exampleDCs: [{ source: 'Hold Person', dc: 14 }, { source: 'Banishment', dc: 15 }, { source: 'Dominate Person', dc: 17 }] },
  { ability: 'CHA', description: 'Resisting banishment and personality-altering effects.', commonSources: ['Banishment', 'Zone of Truth', 'Planar effects'], exampleDCs: [{ source: 'Banishment', dc: 15 }, { source: 'Zone of Truth', dc: 14 }, { source: 'Divine Word', dc: 17 }] },
];

export function getSaveInfo(ability: string): SaveInfo | undefined { return SAVING_THROWS.find((s) => s.ability === ability); }

export function formatSavingThrowRef(): string {
  const lines = ['🎲 **Saving Throw Reference:**'];
  for (const s of SAVING_THROWS) {
    lines.push(`**${s.ability}**: ${s.description}`);
    lines.push(`  Sources: ${s.commonSources.join(', ')}`);
    lines.push(`  Example DCs: ${s.exampleDCs.map((e) => `${e.source} DC ${e.dc}`).join(', ')}`);
  }
  return lines.join('\n');
}
