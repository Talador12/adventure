// Ability check advantage tracker — track advantage/disadvantage on checks.
// Sources stack but advantage + disadvantage cancel out (5e rules).

export type AdvantageSource = { reason: string; type: 'advantage' | 'disadvantage'; expiresRound?: number };

export interface AdvantageState {
  characterId: string;
  sources: AdvantageSource[];
}

export function createAdvantageState(characterId: string): AdvantageState {
  return { characterId, sources: [] };
}

export function addAdvantage(state: AdvantageState, reason: string, expiresRound?: number): AdvantageState {
  return { ...state, sources: [...state.sources, { reason, type: 'advantage', expiresRound }] };
}

export function addDisadvantage(state: AdvantageState, reason: string, expiresRound?: number): AdvantageState {
  return { ...state, sources: [...state.sources, { reason, type: 'disadvantage', expiresRound }] };
}

export function clearExpired(state: AdvantageState, currentRound: number): AdvantageState {
  return { ...state, sources: state.sources.filter((s) => !s.expiresRound || s.expiresRound > currentRound) };
}

export function resolveAdvantage(state: AdvantageState): 'advantage' | 'disadvantage' | 'normal' {
  const advCount = state.sources.filter((s) => s.type === 'advantage').length;
  const disCount = state.sources.filter((s) => s.type === 'disadvantage').length;
  // 5e rule: any advantage + any disadvantage = normal, regardless of count
  if (advCount > 0 && disCount > 0) return 'normal';
  if (advCount > 0) return 'advantage';
  if (disCount > 0) return 'disadvantage';
  return 'normal';
}

export function formatAdvantageStatus(state: AdvantageState, characterName: string): string {
  const result = resolveAdvantage(state);
  const emoji = result === 'advantage' ? '⬆️' : result === 'disadvantage' ? '⬇️' : '➡️';
  const lines = [`${emoji} **${characterName}**: ${result}`];
  if (state.sources.length > 0) {
    for (const s of state.sources) lines.push(`  ${s.type === 'advantage' ? '🟢' : '🔴'} ${s.reason}${s.expiresRound ? ` (until R${s.expiresRound})` : ''}`);
  }
  return lines.join('\n');
}
