// Ready action queue — hold actions with trigger conditions, resolve when triggered.
// Units declare what they'll do and when. DM resolves when trigger fires.

export interface ReadiedAction {
  id: string;
  unitId: string;
  unitName: string;
  action: string;
  trigger: string;
  round: number;
  resolved: boolean;
  expired: boolean;
}

export interface ReadyActionState {
  actions: ReadiedAction[];
}

export function createReadyState(): ReadyActionState {
  return { actions: [] };
}

export function readyAction(state: ReadyActionState, unitId: string, unitName: string, action: string, trigger: string, round: number): ReadyActionState {
  // Remove any existing readied action for this unit
  const filtered = state.actions.filter((a) => a.unitId !== unitId || a.resolved || a.expired);
  return {
    actions: [...filtered, { id: crypto.randomUUID(), unitId, unitName, action, trigger, round, resolved: false, expired: false }],
  };
}

export function resolveReadiedAction(state: ReadyActionState, actionId: string): { state: ReadyActionState; action: ReadiedAction | null; narration: string } {
  const action = state.actions.find((a) => a.id === actionId);
  if (!action || action.resolved || action.expired) return { state, action: null, narration: '' };

  return {
    state: { actions: state.actions.map((a) => a.id === actionId ? { ...a, resolved: true } : a) },
    action,
    narration: `⚡ **Readied action fires!** ${action.unitName} reacts: "${action.action}" (Trigger: ${action.trigger})`,
  };
}

export function expireReadiedActions(state: ReadyActionState, currentRound: number): { state: ReadyActionState; expired: ReadiedAction[] } {
  const expired: ReadiedAction[] = [];
  const updated = state.actions.map((a) => {
    if (!a.resolved && !a.expired && currentRound > a.round) {
      expired.push(a);
      return { ...a, expired: true };
    }
    return a;
  });
  return { state: { actions: updated }, expired };
}

export function getActiveReadiedActions(state: ReadyActionState): ReadiedAction[] {
  return state.actions.filter((a) => !a.resolved && !a.expired);
}

export function formatReadyStatus(state: ReadyActionState): string {
  const active = getActiveReadiedActions(state);
  if (active.length === 0) return '⏳ No readied actions.';
  const lines = ['⏳ **Readied Actions:**'];
  for (const a of active) {
    lines.push(`• **${a.unitName}** (R${a.round}): Will "${a.action}" when "${a.trigger}"`);
  }
  return lines.join('\n');
}
