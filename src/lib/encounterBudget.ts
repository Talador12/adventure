// Encounter budget calculator — XP budget by party level for balanced encounters.
// Uses DMG encounter building guidelines.

export type EncounterDifficulty = 'easy' | 'medium' | 'hard' | 'deadly';

// XP thresholds per character level per difficulty
const XP_THRESHOLDS: Record<number, Record<EncounterDifficulty, number>> = {
  1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
  2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
  3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
  4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
  5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
  6: { easy: 300, medium: 600, hard: 900, deadly: 1400 },
  7: { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
  8: { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
  9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
  10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
  11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
  12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
};

// Encounter multipliers based on number of monsters
const ENCOUNTER_MULTIPLIERS: [number, number][] = [
  [1, 1], [2, 1.5], [3, 2], [7, 2.5], [11, 3], [15, 4],
];

export function getEncounterMultiplier(monsterCount: number): number {
  let mult = 1;
  for (const [threshold, m] of ENCOUNTER_MULTIPLIERS) {
    if (monsterCount >= threshold) mult = m;
  }
  return mult;
}

export function calculateBudget(partyLevels: number[]): Record<EncounterDifficulty, number> {
  const budget: Record<EncounterDifficulty, number> = { easy: 0, medium: 0, hard: 0, deadly: 0 };
  for (const level of partyLevels) {
    const thresholds = XP_THRESHOLDS[Math.min(20, Math.max(1, level))];
    for (const diff of ['easy', 'medium', 'hard', 'deadly'] as const) {
      budget[diff] += thresholds[diff];
    }
  }
  return budget;
}

export function evaluateEncounter(partyLevels: number[], enemyXPValues: number[]): {
  adjustedXP: number;
  difficulty: EncounterDifficulty | 'trivial';
  budget: Record<EncounterDifficulty, number>;
  rawXP: number;
  multiplier: number;
} {
  const rawXP = enemyXPValues.reduce((s, x) => s + x, 0);
  const multiplier = getEncounterMultiplier(enemyXPValues.length);
  const adjustedXP = Math.round(rawXP * multiplier);
  const budget = calculateBudget(partyLevels);

  let difficulty: EncounterDifficulty | 'trivial' = 'trivial';
  if (adjustedXP >= budget.deadly) difficulty = 'deadly';
  else if (adjustedXP >= budget.hard) difficulty = 'hard';
  else if (adjustedXP >= budget.medium) difficulty = 'medium';
  else if (adjustedXP >= budget.easy) difficulty = 'easy';

  return { adjustedXP, difficulty, budget, rawXP, multiplier };
}

export function formatEncounterBudget(partyLevels: number[]): string {
  const budget = calculateBudget(partyLevels);
  const avgLevel = Math.round(partyLevels.reduce((s, l) => s + l, 0) / partyLevels.length);
  const lines = [`📊 **Encounter Budget** (Party: ${partyLevels.length} characters, avg Lv ${avgLevel}):`];
  lines.push(`🟢 Easy: ${budget.easy} XP`);
  lines.push(`🟡 Medium: ${budget.medium} XP`);
  lines.push(`🟠 Hard: ${budget.hard} XP`);
  lines.push(`🔴 Deadly: ${budget.deadly} XP`);
  lines.push(`\n*Multiply enemy total XP by encounter multiplier (×1 for 1 enemy, ×2 for 3-6, etc).*`);
  return lines.join('\n');
}
