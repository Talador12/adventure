// Condition duration tracker — auto-decrement spell/condition durations each round.
// Tracks active conditions with round-based or time-based durations.

export type DurationType = 'rounds' | 'minutes' | 'hours' | 'until_dispelled' | 'save_ends';

export interface ActiveCondition {
  id: string;
  targetId: string;
  targetName: string;
  conditionName: string;
  source: string; // spell or ability name
  durationType: DurationType;
  remainingRounds: number; // -1 for non-round durations
  saveEndDC?: number;
  saveAbility?: string;
  appliedRound: number;
  description: string;
}

export interface ConditionDurationState {
  conditions: ActiveCondition[];
  currentRound: number;
}

export function createConditionState(): ConditionDurationState {
  return { conditions: [], currentRound: 0 };
}

export function addCondition(
  state: ConditionDurationState,
  targetId: string,
  targetName: string,
  conditionName: string,
  source: string,
  durationType: DurationType,
  durationRounds: number,
  description: string,
  saveEndDC?: number,
  saveAbility?: string,
): ConditionDurationState {
  const condition: ActiveCondition = {
    id: crypto.randomUUID(),
    targetId, targetName, conditionName, source, durationType,
    remainingRounds: durationType === 'rounds' ? durationRounds : -1,
    saveEndDC, saveAbility,
    appliedRound: state.currentRound,
    description,
  };
  return { ...state, conditions: [...state.conditions, condition] };
}

export function removeCondition(state: ConditionDurationState, conditionId: string): ConditionDurationState {
  return { ...state, conditions: state.conditions.filter((c) => c.id !== conditionId) };
}

export function advanceRound(state: ConditionDurationState): { state: ConditionDurationState; expired: ActiveCondition[]; saveNeeded: ActiveCondition[] } {
  const newRound = state.currentRound + 1;
  const expired: ActiveCondition[] = [];
  const saveNeeded: ActiveCondition[] = [];
  const remaining: ActiveCondition[] = [];

  for (const c of state.conditions) {
    if (c.durationType === 'rounds') {
      const newRemaining = c.remainingRounds - 1;
      if (newRemaining <= 0) {
        expired.push(c);
      } else {
        remaining.push({ ...c, remainingRounds: newRemaining });
      }
    } else if (c.durationType === 'save_ends') {
      saveNeeded.push(c);
      remaining.push(c); // kept until save succeeds
    } else {
      remaining.push(c); // until_dispelled, minutes, hours
    }
  }

  return { state: { conditions: remaining, currentRound: newRound }, expired, saveNeeded };
}

export function getConditionsForTarget(state: ConditionDurationState, targetId: string): ActiveCondition[] {
  return state.conditions.filter((c) => c.targetId === targetId);
}

export function formatConditionStatus(state: ConditionDurationState): string {
  if (state.conditions.length === 0) return '✅ No active conditions tracked.';
  const lines = [`⏳ **Active Conditions** (Round ${state.currentRound}):`];
  for (const c of state.conditions) {
    const duration = c.durationType === 'rounds' ? `${c.remainingRounds} rounds`
      : c.durationType === 'save_ends' ? `save ends (${c.saveAbility} DC ${c.saveEndDC})`
      : c.durationType;
    lines.push(`• **${c.targetName}**: ${c.conditionName} from *${c.source}* (${duration})`);
  }
  return lines.join('\n');
}

export function formatRoundAdvance(expired: ActiveCondition[], saveNeeded: ActiveCondition[]): string {
  const lines: string[] = [];
  if (expired.length > 0) {
    lines.push('**Expired:**');
    for (const c of expired) lines.push(`  ✅ ${c.targetName}: ${c.conditionName} from ${c.source} ended.`);
  }
  if (saveNeeded.length > 0) {
    lines.push('**Save Required:**');
    for (const c of saveNeeded) lines.push(`  🎲 ${c.targetName}: ${c.saveAbility} DC ${c.saveEndDC} to end ${c.conditionName}.`);
  }
  return lines.length > 0 ? lines.join('\n') : '';
}
