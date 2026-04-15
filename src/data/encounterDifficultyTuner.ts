// Encounter difficulty tuner — auto-adjust CR based on party composition and resources.

export type DifficultyTier = 'easy' | 'medium' | 'hard' | 'deadly';
export type PartyCondition = 'fresh' | 'lightly_spent' | 'half_spent' | 'depleted' | 'critical';

export interface PartyProfile {
  averageLevel: number;
  memberCount: number;
  condition: PartyCondition;
  hasHealer: boolean;
  hasTank: boolean;
  magicItemCount: number;
}

export interface DifficultyAdjustment {
  baseCR: number;
  adjustedCR: number;
  recommendedEnemyCount: number;
  reasoning: string[];
  warningFlags: string[];
}

const XP_THRESHOLDS: Record<DifficultyTier, number[]> = {
  easy: [25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400, 1600, 2000, 2100, 2400, 2800],
  medium: [50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500, 2800, 3200, 3900, 4200, 4900, 5700],
  hard: [75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800, 4300, 4800, 5900, 6300, 7300, 8500],
  deadly: [100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100, 5700, 6400, 7200, 8800, 9500, 10900, 12700],
};

const CONDITION_MULTIPLIERS: Record<PartyCondition, number> = {
  fresh: 1.0, lightly_spent: 0.85, half_spent: 0.7, depleted: 0.5, critical: 0.3,
};

export function calculateDifficulty(party: PartyProfile, targetTier: DifficultyTier): DifficultyAdjustment {
  const levelIdx = Math.min(party.averageLevel - 1, 19);
  const baseXP = XP_THRESHOLDS[targetTier][levelIdx] * party.memberCount;
  const conditionMod = CONDITION_MULTIPLIERS[party.condition];
  const adjustedXP = Math.round(baseXP * conditionMod);
  const reasoning: string[] = [];
  const warnings: string[] = [];
  let crAdjust = 0;
  if (!party.hasHealer) { crAdjust -= 1; reasoning.push('No healer: reduced CR by 1.'); }
  if (!party.hasTank) { crAdjust -= 0.5; reasoning.push('No tank: reduced CR by 0.5.'); }
  if (party.magicItemCount >= 3) { crAdjust += 1; reasoning.push('3+ magic items: increased CR by 1.'); }
  if (party.condition === 'depleted' || party.condition === 'critical') { warnings.push('Party is in poor condition — consider easier encounter or rest first.'); }
  if (party.memberCount <= 2) { warnings.push('Small party — action economy favors enemies heavily.'); crAdjust -= 1; }
  if (party.memberCount >= 6) { crAdjust += 1; reasoning.push('Large party (6+): increased CR by 1.'); }
  const baseCR = Math.max(0.25, party.averageLevel + (targetTier === 'easy' ? -2 : targetTier === 'medium' ? -1 : targetTier === 'hard' ? 0 : 1));
  const adjustedCR = Math.max(0.25, baseCR + crAdjust);
  const enemyCount = targetTier === 'easy' ? Math.max(1, party.memberCount - 1) : targetTier === 'deadly' ? party.memberCount + 2 : party.memberCount;
  return { baseCR, adjustedCR, recommendedEnemyCount: enemyCount, reasoning, warningFlags: warnings };
}

export function getXPThreshold(level: number, tier: DifficultyTier): number {
  return XP_THRESHOLDS[tier][Math.min(level - 1, 19)];
}

export function assessPartyCondition(hpPercent: number, spellSlotsPercent: number): PartyCondition {
  const avg = (hpPercent + spellSlotsPercent) / 2;
  if (avg >= 90) return 'fresh';
  if (avg >= 70) return 'lightly_spent';
  if (avg >= 45) return 'half_spent';
  if (avg >= 20) return 'depleted';
  return 'critical';
}

export function getAllDifficultyTiers(): DifficultyTier[] {
  return ['easy', 'medium', 'hard', 'deadly'];
}

// PHB encounter difficulty rating per RAW (DMG p.82).
// Sums party XP budgets, applies monster-count multiplier, compares adjusted XP to thresholds.

export type EncounterRating = 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly';

export interface EncounterDifficultyResult {
  difficulty: EncounterRating;
  adjustedXP: number;
  budgets: { easy: number; medium: number; hard: number; deadly: number };
  multiplier: number;
}

function getMonsterCountMultiplier(count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 1.5;
  if (count <= 6) return 2;
  if (count <= 10) return 2.5;
  if (count <= 14) return 3;
  return 4;
}

export function calculateEncounterDifficulty(
  partyLevels: number[],
  monsterXPs: number[],
): EncounterDifficultyResult {
  // Sum party budgets per tier
  const budgets = { easy: 0, medium: 0, hard: 0, deadly: 0 };
  for (const lvl of partyLevels) {
    const idx = Math.min(Math.max(lvl, 1), 20) - 1;
    budgets.easy += XP_THRESHOLDS.easy[idx];
    budgets.medium += XP_THRESHOLDS.medium[idx];
    budgets.hard += XP_THRESHOLDS.hard[idx];
    budgets.deadly += XP_THRESHOLDS.deadly[idx];
  }

  const rawXP = monsterXPs.reduce((s, v) => s + v, 0);
  const multiplier = getMonsterCountMultiplier(monsterXPs.length);
  const adjustedXP = Math.round(rawXP * multiplier);

  let difficulty: EncounterRating = 'trivial';
  if (adjustedXP >= budgets.deadly) difficulty = 'deadly';
  else if (adjustedXP >= budgets.hard) difficulty = 'hard';
  else if (adjustedXP >= budgets.medium) difficulty = 'medium';
  else if (adjustedXP >= budgets.easy) difficulty = 'easy';

  return { difficulty, adjustedXP, budgets, multiplier };
}

export function formatEncounterDifficulty(
  partyLevels: number[],
  monsterXPs: number[],
): string {
  if (partyLevels.length === 0) return '*No party members to evaluate.*';
  if (monsterXPs.length === 0) return '*No monsters in the encounter.*';

  const result = calculateEncounterDifficulty(partyLevels, monsterXPs);
  const rawXP = monsterXPs.reduce((s, v) => s + v, 0);
  const icon = result.difficulty === 'deadly' ? '💀' : result.difficulty === 'hard' ? '🔥' : result.difficulty === 'medium' ? '⚔️' : result.difficulty === 'easy' ? '🟢' : '😴';
  const lines = [
    `${icon} **Encounter Balance: ${result.difficulty.toUpperCase()}**`,
    `  Party: ${partyLevels.length} PC${partyLevels.length !== 1 ? 's' : ''} (avg Lv ${Math.round(partyLevels.reduce((a, b) => a + b, 0) / partyLevels.length)})`,
    `  Monsters: ${monsterXPs.length} (raw ${rawXP} XP, x${result.multiplier} = **${result.adjustedXP} adjusted XP**)`,
    `  **Budgets:** Easy ${result.budgets.easy} | Medium ${result.budgets.medium} | Hard ${result.budgets.hard} | Deadly ${result.budgets.deadly}`,
  ];
  if (result.difficulty === 'deadly') lines.push('  *Warning: this encounter risks character death.*');
  if (result.difficulty === 'trivial') lines.push('  *This encounter is below the easy threshold - trivial for this party.*');
  return lines.join('\n');
}

export function formatDifficultyAdjustment(adj: DifficultyAdjustment): string {
  const lines = [`⚔️ **Encounter Tuning** — CR ${adj.adjustedCR} (base ${adj.baseCR})`];
  lines.push(`  Recommended enemies: ${adj.recommendedEnemyCount}`);
  if (adj.reasoning.length > 0) { lines.push('  **Adjustments:**'); adj.reasoning.forEach((r) => lines.push(`    📊 ${r}`)); }
  if (adj.warningFlags.length > 0) { lines.push('  **Warnings:**'); adj.warningFlags.forEach((w) => lines.push(`    ⚠️ ${w}`)); }
  return lines.join('\n');
}
