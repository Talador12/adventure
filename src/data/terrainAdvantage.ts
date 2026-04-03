// Terrain advantage reference — which terrain gives what combat benefit.

export interface TerrainAdvantage {
  terrain: string;
  coverBonus: number; // AC bonus from cover
  stealthMod: number; // +/- to stealth checks
  movementCost: number; // cells of movement per cell (1 = normal, 2 = difficult)
  advantages: string[]; // tactical benefits
  disadvantages: string[]; // tactical drawbacks
  bestFor: string[]; // class archetypes that benefit most
}

export const TERRAIN_ADVANTAGES: TerrainAdvantage[] = [
  {
    terrain: 'forest',
    coverBonus: 2,
    stealthMod: 2,
    movementCost: 1,
    advantages: ['Half cover from trees (+2 AC)', 'Advantage on stealth for ambush', 'High ground from climbing'],
    disadvantages: ['Limits ranged line of sight', 'Fire hazard (area spells risk spreading)'],
    bestFor: ['Ranger', 'Rogue', 'Druid'],
  },
  {
    terrain: 'dense_forest',
    coverBonus: 5,
    stealthMod: 4,
    movementCost: 2,
    advantages: ['Three-quarters cover (+5 AC)', 'Difficult terrain slows pursuers', 'Excellent ambush terrain'],
    disadvantages: ['Severely limits ranged attacks', 'Difficult terrain for everyone', 'Cannot charge effectively'],
    bestFor: ['Ranger', 'Rogue', 'Druid'],
  },
  {
    terrain: 'open_field',
    coverBonus: 0,
    stealthMod: -4,
    movementCost: 1,
    advantages: ['Full movement speed', 'Unobstructed ranged attacks', 'Cavalry charges possible'],
    disadvantages: ['No cover whatsoever', 'Very hard to hide', 'Vulnerable to AoE spells'],
    bestFor: ['Fighter', 'Paladin', 'Sorcerer'],
  },
  {
    terrain: 'hills',
    coverBonus: 2,
    stealthMod: 0,
    movementCost: 1,
    advantages: ['High ground gives +2 ranged attacks', 'Partial cover from elevation', 'Good visibility for spotting'],
    disadvantages: ['Uneven ground limits formations', 'Uphill movement is slower'],
    bestFor: ['Ranger', 'Fighter', 'Wizard'],
  },
  {
    terrain: 'cave',
    coverBonus: 2,
    stealthMod: 2,
    movementCost: 1,
    advantages: ['Stalactites provide cover', 'Choke points limit enemy numbers', 'Darkness favors darkvision races'],
    disadvantages: ['Limited space for large AoE', 'Echo reveals position (disadvantage on stealth after casting)', 'Collapse risk from thunder/force damage'],
    bestFor: ['Rogue', 'Dwarf', 'Monk'],
  },
  {
    terrain: 'water_shallow',
    coverBonus: 0,
    stealthMod: -2,
    movementCost: 2,
    advantages: ['Fire resistance (extinguish burning)', 'Slows pursuing enemies equally'],
    disadvantages: ['Difficult terrain for all', 'Splashing reveals position', 'Lightning spells deal extra in water'],
    bestFor: ['Druid', 'Monk'],
  },
  {
    terrain: 'ruins',
    coverBonus: 2,
    stealthMod: 1,
    movementCost: 1,
    advantages: ['Abundant half cover from rubble', 'Multiple elevation levels', 'Choke points and ambush spots'],
    disadvantages: ['Unstable footing possible', 'Hidden hazards (collapsed floors, traps)'],
    bestFor: ['Rogue', 'Ranger', 'Wizard'],
  },
  {
    terrain: 'bridge',
    coverBonus: 0,
    stealthMod: -2,
    movementCost: 1,
    advantages: ['Forces single-file approach (choke point)', 'Defensible from one end', 'Can be destroyed to cut pursuit'],
    disadvantages: ['No cover', 'Falling risk if shoved', 'Limits flanking options'],
    bestFor: ['Fighter', 'Paladin', 'Barbarian'],
  },
  {
    terrain: 'swamp',
    coverBonus: 0,
    stealthMod: -1,
    movementCost: 2,
    advantages: ['Difficult terrain slows heavy armor wearers', 'Fog/mist provides concealment', 'Poison/disease hazards deter pursuit'],
    disadvantages: ['Difficult terrain for everyone', 'Risk of quicksand', 'Drowning hazard for downed characters'],
    bestFor: ['Druid', 'Ranger', 'Warlock'],
  },
  {
    terrain: 'rooftops',
    coverBonus: 2,
    stealthMod: 0,
    movementCost: 1,
    advantages: ['High ground advantage on ranged', 'Vertical escape routes', 'Melee enemies must climb to reach'],
    disadvantages: ['Falling damage risk', 'Limited space for large groups', 'Visible from a distance'],
    bestFor: ['Rogue', 'Monk', 'Ranger'],
  },
];

export function getTerrainAdvantage(terrain: string): TerrainAdvantage | undefined {
  return TERRAIN_ADVANTAGES.find((t) => t.terrain === terrain);
}

export function getBestTerrainForClass(className: string): TerrainAdvantage[] {
  return TERRAIN_ADVANTAGES.filter((t) => t.bestFor.some((c) => c.toLowerCase() === className.toLowerCase()));
}

export function formatTerrainAdvantage(ta: TerrainAdvantage): string {
  const lines: string[] = [`🏔️ **Terrain: ${ta.terrain.replace(/_/g, ' ')}**`];
  lines.push(`  Cover: +${ta.coverBonus} AC | Stealth: ${ta.stealthMod >= 0 ? '+' : ''}${ta.stealthMod} | Movement: ${ta.movementCost === 1 ? 'Normal' : 'Difficult'}`);
  lines.push(`  ✅ ${ta.advantages.join(' | ')}`);
  lines.push(`  ⚠️ ${ta.disadvantages.join(' | ')}`);
  lines.push(`  Best for: ${ta.bestFor.join(', ')}`);
  return lines.join('\n');
}

export function formatAllTerrain(): string {
  return TERRAIN_ADVANTAGES.map(formatTerrainAdvantage).join('\n\n');
}
