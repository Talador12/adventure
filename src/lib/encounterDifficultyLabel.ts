// Encounter difficulty label — show Easy/Medium/Hard/Deadly for current combat.

import { calculateBudget, getEncounterMultiplier } from './encounterBudget';

export type DifficultyLabel = 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Deadly' | 'TPK Risk';

export function labelEncounterDifficulty(partyLevels: number[], enemyXPs: number[]): { label: DifficultyLabel; emoji: string; adjustedXP: number; budget: Record<string, number> } {
  if (partyLevels.length === 0 || enemyXPs.length === 0) return { label: 'Trivial', emoji: '🟢', adjustedXP: 0, budget: {} };
  const rawXP = enemyXPs.reduce((s, x) => s + x, 0);
  const mult = getEncounterMultiplier(enemyXPs.length);
  const adjustedXP = Math.round(rawXP * mult);
  const budget = calculateBudget(partyLevels);

  let label: DifficultyLabel; let emoji: string;
  if (adjustedXP >= budget.deadly * 1.5) { label = 'TPK Risk'; emoji = '💀'; }
  else if (adjustedXP >= budget.deadly) { label = 'Deadly'; emoji = '🔴'; }
  else if (adjustedXP >= budget.hard) { label = 'Hard'; emoji = '🟠'; }
  else if (adjustedXP >= budget.medium) { label = 'Medium'; emoji = '🟡'; }
  else if (adjustedXP >= budget.easy) { label = 'Easy'; emoji = '🟢'; }
  else { label = 'Trivial'; emoji = '⚪'; }

  return { label, emoji, adjustedXP, budget };
}

export function formatDifficultyLabel(partyLevels: number[], enemyXPs: number[]): string {
  const { label, emoji, adjustedXP, budget } = labelEncounterDifficulty(partyLevels, enemyXPs);
  return `${emoji} **Encounter: ${label}** (${adjustedXP} adjusted XP)\nBudget: Easy ${budget.easy || 0} | Medium ${budget.medium || 0} | Hard ${budget.hard || 0} | Deadly ${budget.deadly || 0}`;
}
