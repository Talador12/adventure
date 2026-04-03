// Hit dice tracker — track spent/remaining hit dice per character.

export const CLASS_HIT_DICE: Record<string, number> = {
  Barbarian: 12, Fighter: 10, Paladin: 10, Ranger: 10,
  Bard: 8, Cleric: 8, Druid: 8, Monk: 8, Rogue: 8, Warlock: 8,
  Sorcerer: 6, Wizard: 6,
};

export interface HitDiceState {
  characterId: string;
  dieSize: number;
  totalDice: number;
  remainingDice: number;
}

export function createHitDiceState(characterId: string, charClass: string, level: number): HitDiceState {
  const dieSize = CLASS_HIT_DICE[charClass] || 8;
  return { characterId, dieSize, totalDice: level, remainingDice: level };
}

export function spendHitDie(state: HitDiceState, conMod: number): { state: HitDiceState; healed: number; success: boolean } {
  if (state.remainingDice <= 0) return { state, healed: 0, success: false };
  const roll = Math.floor(Math.random() * state.dieSize) + 1;
  const healed = Math.max(1, roll + conMod);
  return { state: { ...state, remainingDice: state.remainingDice - 1 }, healed, success: true };
}

export function restoreHitDice(state: HitDiceState, amount?: number): HitDiceState {
  // Long rest restores half total (min 1)
  const restore = amount ?? Math.max(1, Math.floor(state.totalDice / 2));
  return { ...state, remainingDice: Math.min(state.totalDice, state.remainingDice + restore) };
}

export function formatHitDice(state: HitDiceState, characterName: string): string {
  const bar = '🎲'.repeat(state.remainingDice) + '⬜'.repeat(state.totalDice - state.remainingDice);
  return `🎲 **${characterName}**: [${bar}] ${state.remainingDice}/${state.totalDice} d${state.dieSize}`;
}

export function formatPartyHitDice(states: { state: HitDiceState; name: string }[]): string {
  if (states.length === 0) return '🎲 No hit dice tracked.';
  const lines = ['🎲 **Party Hit Dice:**'];
  for (const { state, name } of states) lines.push(formatHitDice(state, name));
  return lines.join('\n');
}
