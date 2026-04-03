// Combat fatigue system — extended combat without rest degrades performance.

export interface FatigueState {
  roundsInCombat: number;
  combatsSinceRest: number;
  fatigueLevel: FatigueLevel;
}

export type FatigueLevel = 'fresh' | 'winded' | 'tired' | 'exhausted' | 'spent';

const FATIGUE_THRESHOLDS: { minRounds: number; minCombats: number; level: FatigueLevel }[] = [
  { minRounds: 15, minCombats: 4, level: 'spent' },
  { minRounds: 10, minCombats: 3, level: 'exhausted' },
  { minRounds: 6, minCombats: 2, level: 'tired' },
  { minRounds: 3, minCombats: 1, level: 'winded' },
  { minRounds: 0, minCombats: 0, level: 'fresh' },
];

export interface FatigueEffects {
  attackPenalty: number;
  acPenalty: number;
  speedReduction: number; // in feet
  savePenalty: number;
  description: string;
}

const FATIGUE_EFFECTS: Record<FatigueLevel, FatigueEffects> = {
  fresh: { attackPenalty: 0, acPenalty: 0, speedReduction: 0, savePenalty: 0, description: 'No fatigue — fighting at full capacity.' },
  winded: { attackPenalty: 0, acPenalty: 0, speedReduction: 0, savePenalty: 0, description: 'Breathing harder. No mechanical effect yet, but the strain is showing.' },
  tired: { attackPenalty: -1, acPenalty: 0, speedReduction: 5, savePenalty: 0, description: 'Muscles ache. -1 attack, -5 ft speed.' },
  exhausted: { attackPenalty: -1, acPenalty: -1, speedReduction: 10, savePenalty: -1, description: 'Every swing is an effort. -1 attack, -1 AC, -1 saves, -10 ft speed.' },
  spent: { attackPenalty: -2, acPenalty: -1, speedReduction: 15, savePenalty: -2, description: 'On the verge of collapse. -2 attack, -1 AC, -2 saves, -15 ft speed.' },
};

export function createFatigueState(): FatigueState {
  return { roundsInCombat: 0, combatsSinceRest: 0, fatigueLevel: 'fresh' };
}

export function advanceRound(state: FatigueState): FatigueState {
  const newRounds = state.roundsInCombat + 1;
  return { ...state, roundsInCombat: newRounds, fatigueLevel: calculateFatigueLevel(newRounds, state.combatsSinceRest) };
}

export function endCombat(state: FatigueState): FatigueState {
  const newCombats = state.combatsSinceRest + 1;
  return { roundsInCombat: state.roundsInCombat, combatsSinceRest: newCombats, fatigueLevel: calculateFatigueLevel(state.roundsInCombat, newCombats) };
}

export function restReset(isLongRest: boolean): FatigueState {
  if (isLongRest) return createFatigueState();
  // Short rest: reduce rounds by half, combats by 1
  return { roundsInCombat: 0, combatsSinceRest: 0, fatigueLevel: 'fresh' };
}

function calculateFatigueLevel(rounds: number, combats: number): FatigueLevel {
  for (const t of FATIGUE_THRESHOLDS) {
    if (rounds >= t.minRounds || combats >= t.minCombats) return t.level;
  }
  return 'fresh';
}

export function getFatigueEffects(state: FatigueState): FatigueEffects {
  return FATIGUE_EFFECTS[state.fatigueLevel];
}

export function getAllFatigueLevels(): FatigueLevel[] {
  return ['fresh', 'winded', 'tired', 'exhausted', 'spent'];
}

export function formatFatigueState(state: FatigueState): string {
  const effects = FATIGUE_EFFECTS[state.fatigueLevel];
  const icon = { fresh: '💪', winded: '😤', tired: '😓', exhausted: '🥵', spent: '💀' }[state.fatigueLevel];
  const lines = [`${icon} **Combat Fatigue: ${state.fatigueLevel.toUpperCase()}**`];
  lines.push(`  Rounds in combat: ${state.roundsInCombat} | Combats since rest: ${state.combatsSinceRest}`);
  lines.push(`  *${effects.description}*`);
  if (effects.attackPenalty !== 0) lines.push(`  Attack: ${effects.attackPenalty}`);
  if (effects.acPenalty !== 0) lines.push(`  AC: ${effects.acPenalty}`);
  if (effects.speedReduction !== 0) lines.push(`  Speed: -${effects.speedReduction} ft`);
  if (effects.savePenalty !== 0) lines.push(`  Saves: ${effects.savePenalty}`);
  return lines.join('\n');
}
