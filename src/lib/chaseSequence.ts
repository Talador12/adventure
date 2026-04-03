// Chase sequence rules — structured chase with complications per round.
// DMG-style chase with dash limits, complications, and escape threshold.

export interface ChaseState {
  round: number;
  pursuerDistance: number; // cells behind quarry (0 = caught)
  maxRounds: number;
  dashesUsed: Record<string, number>; // unitId -> dash count
  complications: string[];
}

const CHASE_COMPLICATIONS = [
  'A cart blocks the path — DEX DC 10 to vault or lose 10ft.',
  'Loose cobblestones — DEX DC 12 or fall prone.',
  'A crowd of people — STR DC 10 to push through or lose 5ft.',
  'A low-hanging sign — DEX DC 10 to duck or take 1d4 bludgeoning.',
  'Mud/ice patch — DEX DC 12 or fall prone.',
  'A fence/wall — Athletics DC 12 to climb or lose a round.',
  'A dog runs between your legs — DEX DC 8 or stumble (-5ft).',
  'A merchant\'s display collapses — DEX DC 10 or tangled for 1 round.',
  'Narrow alley — only single-file, no overtaking.',
  'A bridge with missing planks — DEX DC 14 or fall 10ft.',
  'Rain-slicked rooftop — DEX DC 12 or slide off edge.',
  'No complication this round.',
];

export function createChase(startingDistance: number = 6, maxRounds: number = 10): ChaseState {
  return { round: 0, pursuerDistance: startingDistance, maxRounds, dashesUsed: {}, complications: [] };
}

export function advanceChaseRound(state: ChaseState): { state: ChaseState; complication: string; escaped: boolean; caught: boolean } {
  const complication = CHASE_COMPLICATIONS[Math.floor(Math.random() * CHASE_COMPLICATIONS.length)];
  const newRound = state.round + 1;
  const escaped = newRound > state.maxRounds;
  const caught = state.pursuerDistance <= 0;
  return {
    state: { ...state, round: newRound, complications: [...state.complications, complication] },
    complication, escaped, caught,
  };
}

export function recordDash(state: ChaseState, unitId: string): { state: ChaseState; exhaustionCheck: boolean; dc: number } {
  const count = (state.dashesUsed[unitId] || 0) + 1;
  // After 3 + CON mod dashes, CON save or gain exhaustion
  const exhaustionCheck = count > 3;
  const dc = 10 + count;
  return { state: { ...state, dashesUsed: { ...state.dashesUsed, [unitId]: count } }, exhaustionCheck, dc };
}

export function adjustDistance(state: ChaseState, delta: number): ChaseState {
  return { ...state, pursuerDistance: Math.max(0, state.pursuerDistance + delta) };
}

export function formatChaseStatus(state: ChaseState): string {
  const bar = '🏃'.repeat(Math.max(0, state.pursuerDistance)) + '🎯';
  const lines = [`🏃 **Chase** (Round ${state.round}/${state.maxRounds}):`];
  lines.push(`Distance: [${bar}] ${state.pursuerDistance * 5}ft gap`);
  if (state.complications.length > 0) lines.push(`Last complication: ${state.complications[state.complications.length - 1]}`);
  if (state.pursuerDistance <= 0) lines.push('💥 **CAUGHT!**');
  if (state.round >= state.maxRounds) lines.push('💨 **ESCAPED!**');
  return lines.join('\n');
}
