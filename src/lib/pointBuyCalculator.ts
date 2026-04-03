// Ability score point buy calculator — 27-point system with cost table.

export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
};

export const DEFAULT_POINTS = 27;
export const MIN_SCORE = 8;
export const MAX_SCORE = 15;

export interface PointBuyState {
  scores: Record<string, number>;
  pointsUsed: number;
  pointsRemaining: number;
  totalPoints: number;
}

export function createPointBuyState(totalPoints: number = DEFAULT_POINTS): PointBuyState {
  const scores: Record<string, number> = { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 };
  return { scores, pointsUsed: 0, pointsRemaining: totalPoints, totalPoints };
}

export function calculatePointsUsed(scores: Record<string, number>): number {
  return Object.values(scores).reduce((sum, s) => sum + (POINT_BUY_COSTS[s] || 0), 0);
}

export function setScore(state: PointBuyState, ability: string, value: number): { state: PointBuyState; success: boolean; message: string } {
  if (value < MIN_SCORE || value > MAX_SCORE) return { state, success: false, message: `Score must be ${MIN_SCORE}-${MAX_SCORE}.` };
  const newScores = { ...state.scores, [ability]: value };
  const used = calculatePointsUsed(newScores);
  if (used > state.totalPoints) return { state, success: false, message: `Not enough points! Need ${used}, have ${state.totalPoints}.` };
  return { state: { ...state, scores: newScores, pointsUsed: used, pointsRemaining: state.totalPoints - used }, success: true, message: `${ability} set to ${value}. ${state.totalPoints - used} points remaining.` };
}

export function getModifier(score: number): number { return Math.floor((score - 10) / 2); }

export function formatPointBuy(state: PointBuyState): string {
  const lines = [`📊 **Point Buy** (${state.pointsUsed}/${state.totalPoints} points used, ${state.pointsRemaining} remaining):`];
  for (const [ability, score] of Object.entries(state.scores)) {
    const mod = getModifier(score);
    const cost = POINT_BUY_COSTS[score] || 0;
    lines.push(`  **${ability}**: ${score} (${mod >= 0 ? '+' : ''}${mod}) [${cost} pts]`);
  }
  return lines.join('\n');
}
