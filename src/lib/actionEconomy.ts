// Action economy tracker — visualize action/bonus/reaction/movement per turn.

export interface ActionEconomyState {
  unitId: string;
  actionUsed: boolean;
  bonusActionUsed: boolean;
  reactionUsed: boolean;
  movementUsed: number; // cells used
  maxMovement: number;
  freeObjectInteraction: boolean; // one per turn
}

export function createActionEconomy(unitId: string, maxMovement: number): ActionEconomyState {
  return { unitId, actionUsed: false, bonusActionUsed: false, reactionUsed: false, movementUsed: 0, maxMovement, freeObjectInteraction: false };
}

export function useAction(state: ActionEconomyState): ActionEconomyState { return { ...state, actionUsed: true }; }
export function useBonusAction(state: ActionEconomyState): ActionEconomyState { return { ...state, bonusActionUsed: true }; }
export function useReactionAction(state: ActionEconomyState): ActionEconomyState { return { ...state, reactionUsed: true }; }
export function useMovement(state: ActionEconomyState, cells: number): ActionEconomyState { return { ...state, movementUsed: Math.min(state.maxMovement, state.movementUsed + cells) }; }
export function useObjectInteraction(state: ActionEconomyState): ActionEconomyState { return { ...state, freeObjectInteraction: true }; }

export function resetTurn(state: ActionEconomyState): ActionEconomyState {
  return { ...state, actionUsed: false, bonusActionUsed: false, movementUsed: 0, freeObjectInteraction: false };
  // Note: reaction resets at start of YOUR turn, not end
}

export function getRemainingMovement(state: ActionEconomyState): number {
  return Math.max(0, state.maxMovement - state.movementUsed);
}

export function formatActionEconomy(state: ActionEconomyState, unitName: string): string {
  const a = state.actionUsed ? '❌' : '✅';
  const b = state.bonusActionUsed ? '❌' : '✅';
  const r = state.reactionUsed ? '❌' : '✅';
  const remaining = getRemainingMovement(state);
  const moveBar = '█'.repeat(Math.min(10, state.movementUsed)) + '░'.repeat(Math.min(10, remaining));
  return `⚡ **${unitName}'s Turn:**\n${a} Action | ${b} Bonus | ${r} Reaction | 🏃 Move: [${moveBar}] ${remaining * 5}ft left${state.freeObjectInteraction ? ' | 🎒 Object used' : ''}`;
}
