// Healing surge system — 4e-inspired bonus healing for recovery-poor parties.
// Each character gets surges per day. Spend one to heal a quarter of max HP.

export interface HealingSurgeState {
  characterId: string;
  maxSurges: number;
  currentSurges: number;
  healingPerSurge: number; // HP healed per surge
}

export function calculateMaxSurges(level: number, conMod: number): number {
  // Base: CON mod + half level (min 1)
  return Math.max(1, conMod + Math.floor(level / 2));
}

export function calculateHealingPerSurge(maxHp: number): number {
  return Math.max(1, Math.floor(maxHp / 4));
}

export function createHealingSurgeState(characterId: string, level: number, conMod: number, maxHp: number): HealingSurgeState {
  const maxSurges = calculateMaxSurges(level, conMod);
  return { characterId, maxSurges, currentSurges: maxSurges, healingPerSurge: calculateHealingPerSurge(maxHp) };
}

export function useSurge(state: HealingSurgeState): { state: HealingSurgeState; healed: number; success: boolean; message: string } {
  if (state.currentSurges <= 0) return { state, healed: 0, success: false, message: 'No healing surges remaining!' };
  return {
    state: { ...state, currentSurges: state.currentSurges - 1 },
    healed: state.healingPerSurge,
    success: true,
    message: `Healed ${state.healingPerSurge} HP! (${state.currentSurges - 1}/${state.maxSurges} surges remaining)`,
  };
}

export function restoreSurges(state: HealingSurgeState, amount: number = -1): HealingSurgeState {
  // -1 = restore all (long rest)
  if (amount < 0) return { ...state, currentSurges: state.maxSurges };
  return { ...state, currentSurges: Math.min(state.maxSurges, state.currentSurges + amount) };
}

export function formatSurgeStatus(state: HealingSurgeState, characterName: string): string {
  const bar = '❤️'.repeat(state.currentSurges) + '🖤'.repeat(state.maxSurges - state.currentSurges);
  return `💉 **${characterName}**: [${bar}] ${state.currentSurges}/${state.maxSurges} surges (${state.healingPerSurge} HP each)`;
}
