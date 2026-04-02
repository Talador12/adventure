// Exhaustion tracker — 5e exhaustion levels with auto-apply triggers.
// Tracks exhaustion per character and applies cumulative effects.

export type ExhaustionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ExhaustionEffect {
  level: ExhaustionLevel;
  description: string;
  mechanicalEffect: string;
}

export const EXHAUSTION_TABLE: ExhaustionEffect[] = [
  { level: 1, description: 'Disadvantage on ability checks', mechanicalEffect: 'Disadvantage on all ability checks.' },
  { level: 2, description: 'Speed halved', mechanicalEffect: 'Speed halved.' },
  { level: 3, description: 'Disadvantage on attack rolls and saving throws', mechanicalEffect: 'Disadvantage on attacks and saves.' },
  { level: 4, description: 'Hit point maximum halved', mechanicalEffect: 'Max HP halved.' },
  { level: 5, description: 'Speed reduced to 0', mechanicalEffect: 'Speed reduced to 0.' },
  { level: 6, description: 'Death', mechanicalEffect: 'The character dies.' },
];

export type ExhaustionTrigger = 'forced_march' | 'starvation' | 'dehydration' | 'failed_death_save' | 'extreme_cold' | 'extreme_heat' | 'no_long_rest' | 'manual';

export interface ExhaustionEvent {
  characterId: string;
  trigger: ExhaustionTrigger;
  timestamp: number;
  levelBefore: ExhaustionLevel;
  levelAfter: ExhaustionLevel;
}

export function getExhaustionEffects(level: ExhaustionLevel): ExhaustionEffect[] {
  return EXHAUSTION_TABLE.filter((e) => e.level <= level);
}

export function getExhaustionDescription(level: ExhaustionLevel): string {
  if (level === 0) return 'No exhaustion.';
  const effects = getExhaustionEffects(level);
  return effects.map((e) => `Level ${e.level}: ${e.description}`).join('. ');
}

export function addExhaustion(currentLevel: ExhaustionLevel, amount: number = 1): ExhaustionLevel {
  return Math.min(6, currentLevel + amount) as ExhaustionLevel;
}

export function removeExhaustion(currentLevel: ExhaustionLevel, amount: number = 1): ExhaustionLevel {
  return Math.max(0, currentLevel - amount) as ExhaustionLevel;
}

export function checkForcedMarch(hoursMarched: number): { gainExhaustion: boolean; dc: number } {
  // After 8 hours of travel, each additional hour requires a CON save
  if (hoursMarched <= 8) return { gainExhaustion: false, dc: 0 };
  const dc = 10 + (hoursMarched - 8);
  return { gainExhaustion: true, dc };
}

export function checkStarvation(daysSinceFood: number): boolean {
  // After 3 + CON mod days without food, gain exhaustion each day
  // Simplified: gain exhaustion after 3 days
  return daysSinceFood > 3;
}

export function formatExhaustionStatus(characterName: string, level: ExhaustionLevel): string {
  if (level === 0) return `✅ **${characterName}**: No exhaustion.`;
  const emoji = level >= 5 ? '💀' : level >= 3 ? '🔴' : level >= 2 ? '🟡' : '🟢';
  const effects = getExhaustionEffects(level);
  const lines = [`${emoji} **${characterName}**: Exhaustion Level ${level}/6`];
  for (const e of effects) lines.push(`  • ${e.description}`);
  return lines.join('\n');
}

export function getSpeedMultiplier(level: ExhaustionLevel): number {
  if (level >= 5) return 0;
  if (level >= 2) return 0.5;
  return 1;
}

export function getMaxHpMultiplier(level: ExhaustionLevel): number {
  if (level >= 4) return 0.5;
  return 1;
}
