// Initiative variant systems beyond standard D&D 5e.

export type InitiativeVariant = 'standard' | 'side' | 'popcorn' | 'speed_factor';

export interface InitiativeVariantInfo {
  id: InitiativeVariant;
  name: string;
  description: string;
}

export const INITIATIVE_VARIANTS: InitiativeVariantInfo[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'd20 + DEX mod. Classic 5e initiative.',
  },
  {
    id: 'side',
    name: 'Side Initiative',
    description: 'Each side rolls once. Winning side goes first, members choose order.',
  },
  {
    id: 'popcorn',
    name: 'Popcorn',
    description: 'First unit is random. Each unit picks who goes next.',
  },
  {
    id: 'speed_factor',
    name: 'Speed Factor',
    description: 'd20 + DEX mod + action modifier (-2 melee, +0 ranged, -5 spells).',
  },
];

// Speed factor modifiers applied during initiative roll
export const SPEED_FACTOR_MODS: Record<string, number> = {
  melee: -2,
  ranged: 0,
  spell: -5,
  default: 0,
};

// Roll side initiative - each side rolls d20, higher goes first.
// Returns 'players' or 'enemies' to indicate which side won.
export function rollSideInitiative(): { winningSide: 'players' | 'enemies'; playerRoll: number; enemyRoll: number } {
  let playerRoll = Math.floor(Math.random() * 20) + 1;
  let enemyRoll = Math.floor(Math.random() * 20) + 1;
  // Reroll ties
  while (playerRoll === enemyRoll) {
    playerRoll = Math.floor(Math.random() * 20) + 1;
    enemyRoll = Math.floor(Math.random() * 20) + 1;
  }
  return {
    winningSide: playerRoll > enemyRoll ? 'players' : 'enemies',
    playerRoll,
    enemyRoll,
  };
}

// Pick a random first unit for popcorn initiative
export function pickPopcornStarter(unitIds: string[]): string | null {
  if (unitIds.length === 0) return null;
  return unitIds[Math.floor(Math.random() * unitIds.length)];
}

// Speed factor: roll d20 + DEX mod + action modifier
export function rollSpeedFactor(dexMod: number, actionType: 'melee' | 'ranged' | 'spell' | 'default' = 'default'): number {
  const roll = Math.floor(Math.random() * 20) + 1;
  const mod = SPEED_FACTOR_MODS[actionType] ?? 0;
  return roll + dexMod + mod;
}
