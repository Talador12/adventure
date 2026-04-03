// Magical trap evolution — traps that learn from failed disarm attempts.

export type TrapIntelligence = 'basic' | 'adaptive' | 'cunning' | 'genius';

export interface TrapEvolutionStage {
  failedAttempts: number;
  adaptationName: string;
  newBehavior: string;
  dcIncrease: number;
  additionalEffect: string;
}

export interface EvolvingTrap {
  name: string;
  intelligence: TrapIntelligence;
  baseDC: number;
  baseDamage: string;
  baseDescription: string;
  evolutions: TrapEvolutionStage[];
  maxEvolutions: number;
  weakness: string;
}

const TRAPS: EvolvingTrap[] = [
  { name: 'The Learning Lock', intelligence: 'adaptive', baseDC: 13, baseDamage: '2d6 piercing (needle trap)', baseDescription: 'A lock that remembers every failed pick attempt. Each failure makes it harder.', evolutions: [
    { failedAttempts: 1, adaptationName: 'Countermeasure', newBehavior: 'Needles now fire from a different angle.', dcIncrease: 2, additionalEffect: 'Poison added (CON DC 12 or 1d4 poison/round for 3 rounds).' },
    { failedAttempts: 2, adaptationName: 'Adaptive Tumblers', newBehavior: 'Internal mechanism rearranges. Previous observations are useless.', dcIncrease: 3, additionalEffect: 'Lock resets completely. All prior Investigation info is invalid.' },
    { failedAttempts: 3, adaptationName: 'Active Defense', newBehavior: 'Lock ejects tools and fires at the lockpicker.', dcIncrease: 5, additionalEffect: '3d6 piercing + tools destroyed. DC 15 DEX to save your tools.' },
  ], maxEvolutions: 3, weakness: 'Dispel Magic (DC 15) resets it to base state. Or just smash the door.' },
  { name: 'The Memetic Glyph', intelligence: 'cunning', baseDC: 14, baseDamage: '3d8 psychic', baseDescription: 'A glyph that studies who triggered it and designs counters to their specific abilities.', evolutions: [
    { failedAttempts: 1, adaptationName: 'Targeted Adaptation', newBehavior: 'Glyph now targets the specific save type the triggerer is BEST at. Forces their weakest save.', dcIncrease: 1, additionalEffect: 'Changes damage type to one the triggerer lacks resistance to.' },
    { failedAttempts: 2, adaptationName: 'Counter-spell Trap', newBehavior: 'If someone casts Dispel Magic, the glyph absorbs it and gains charges.', dcIncrease: 2, additionalEffect: 'Releases absorbed Dispel Magic as damage: 1d6 per level absorbed.' },
    { failedAttempts: 3, adaptationName: 'Replication', newBehavior: 'Creates a copy of itself on the nearest unmarked surface.', dcIncrease: 3, additionalEffect: 'Two glyphs now. Both must be disarmed.' },
  ], maxEvolutions: 3, weakness: 'Covering the glyph in mundane paint renders it blind. It can\'t adapt to what it can\'t see.' },
  { name: 'The Patient Floor', intelligence: 'genius', baseDC: 15, baseDamage: '4d6 bludgeoning (collapsing floor)', baseDescription: 'A floor trap that waits for the worst possible moment to trigger.', evolutions: [
    { failedAttempts: 1, adaptationName: 'Timing Shift', newBehavior: 'Triggers on a delay — 1d4 rounds after the pressure plate is pressed.', dcIncrease: 2, additionalEffect: 'Victims are no longer adjacent to the trap when it goes off. Harder to dodge.' },
    { failedAttempts: 2, adaptationName: 'False Safe Zone', newBehavior: 'Creates an area that APPEARS safe but is actually the kill zone.', dcIncrease: 3, additionalEffect: 'Investigation checks that "confirm safety" are lies. The floor is the trap.' },
    { failedAttempts: 3, adaptationName: 'Strategic Targeting', newBehavior: 'Triggers only under the heaviest party member. Maximum damage.', dcIncrease: 4, additionalEffect: 'Double damage to the heaviest creature. Pit depth doubles.' },
  ], maxEvolutions: 3, weakness: 'Walk across in a random pattern. The trap\'s predictive algorithm fails with truly chaotic movement.' },
];

export function getEvolvingTrap(name: string): EvolvingTrap | undefined {
  return TRAPS.find((t) => t.name.toLowerCase().includes(name.toLowerCase()));
}

export function getRandomEvolvingTrap(): EvolvingTrap {
  return TRAPS[Math.floor(Math.random() * TRAPS.length)];
}

export function getCurrentDC(trap: EvolvingTrap, failedAttempts: number): number {
  const applicable = trap.evolutions.filter((e) => e.failedAttempts <= failedAttempts);
  return trap.baseDC + applicable.reduce((sum, e) => sum + e.dcIncrease, 0);
}

export function getActiveEvolutions(trap: EvolvingTrap, failedAttempts: number): TrapEvolutionStage[] {
  return trap.evolutions.filter((e) => e.failedAttempts <= failedAttempts);
}

export function getAllTrapIntelligences(): TrapIntelligence[] {
  return ['basic', 'adaptive', 'cunning', 'genius'];
}

export function formatEvolvingTrap(trap: EvolvingTrap, failedAttempts: number = 0): string {
  const intel = { basic: '🟢', adaptive: '🟡', cunning: '🟠', genius: '🔴' }[trap.intelligence];
  const currentDC = getCurrentDC(trap, failedAttempts);
  const lines = [`${intel} **${trap.name}** *(${trap.intelligence}, DC ${currentDC})*`];
  lines.push(`  *${trap.baseDescription}*`);
  lines.push(`  Base: ${trap.baseDamage} | Failures: ${failedAttempts}/${trap.maxEvolutions}`);
  const active = getActiveEvolutions(trap, failedAttempts);
  if (active.length > 0) { lines.push('  **Active adaptations:**'); active.forEach((e) => lines.push(`    🧠 ${e.adaptationName}: ${e.newBehavior}`)); }
  lines.push(`  ⚡ Weakness: ${trap.weakness}`);
  return lines.join('\n');
}

export { TRAPS as EVOLVING_TRAPS };
