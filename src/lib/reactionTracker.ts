// Reaction tracker — track which units have used their reaction this round.
// Reactions refresh at the start of each unit's turn.

export interface ReactionState {
  unitReactions: Record<string, { used: boolean; usedFor: string | null }>; // unitId -> state
  currentRound: number;
}

export function createReactionState(): ReactionState {
  return { unitReactions: {}, currentRound: 1 };
}

export function initializeUnits(state: ReactionState, unitIds: string[]): ReactionState {
  const reactions = { ...state.unitReactions };
  for (const id of unitIds) {
    if (!reactions[id]) reactions[id] = { used: false, usedFor: null };
  }
  return { ...state, unitReactions: reactions };
}

export function useReaction(state: ReactionState, unitId: string, usedFor: string): { state: ReactionState; success: boolean } {
  const current = state.unitReactions[unitId];
  if (!current || current.used) return { state, success: false };
  return {
    state: { ...state, unitReactions: { ...state.unitReactions, [unitId]: { used: true, usedFor } } },
    success: true,
  };
}

export function refreshReaction(state: ReactionState, unitId: string): ReactionState {
  return {
    ...state,
    unitReactions: { ...state.unitReactions, [unitId]: { used: false, usedFor: null } },
  };
}

export function refreshAllReactions(state: ReactionState): ReactionState {
  const reactions: ReactionState['unitReactions'] = {};
  for (const id of Object.keys(state.unitReactions)) {
    reactions[id] = { used: false, usedFor: null };
  }
  return { ...state, unitReactions: reactions, currentRound: state.currentRound + 1 };
}

export function hasReaction(state: ReactionState, unitId: string): boolean {
  return state.unitReactions[unitId]?.used === false;
}

export function formatReactionStatus(state: ReactionState, unitNames: Record<string, string>): string {
  const entries = Object.entries(state.unitReactions);
  if (entries.length === 0) return '⚡ No units tracked for reactions.';
  const lines = [`⚡ **Reactions** (Round ${state.currentRound}):`];
  for (const [id, r] of entries) {
    const name = unitNames[id] || id;
    lines.push(`${r.used ? '❌' : '✅'} **${name}**: ${r.used ? `Used (${r.usedFor})` : 'Available'}`);
  }
  return lines.join('\n');
}
