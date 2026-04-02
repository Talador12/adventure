// Alignment shift tracker — tracks moral choices and adjusts alignment over time.
// Two axes: lawful-chaotic (order) and good-evil (morality). Each -5 to +5.

export type AlignmentAxis = 'order' | 'morality';

export interface AlignmentState {
  characterId: string;
  order: number;    // -5 (chaotic) to +5 (lawful)
  morality: number; // -5 (evil) to +5 (good)
  history: AlignmentShift[];
}

export interface AlignmentShift {
  timestamp: number;
  axis: AlignmentAxis;
  delta: number;
  reason: string;
  campaignId: string;
}

export type Alignment = 'LG' | 'NG' | 'CG' | 'LN' | 'TN' | 'CN' | 'LE' | 'NE' | 'CE';

export const ALIGNMENT_NAMES: Record<Alignment, string> = {
  LG: 'Lawful Good', NG: 'Neutral Good', CG: 'Chaotic Good',
  LN: 'Lawful Neutral', TN: 'True Neutral', CN: 'Chaotic Neutral',
  LE: 'Lawful Evil', NE: 'Neutral Evil', CE: 'Chaotic Evil',
};

export function getAlignment(order: number, morality: number): Alignment {
  const o = order >= 2 ? 'L' : order <= -2 ? 'C' : 'N';
  const m = morality >= 2 ? 'G' : morality <= -2 ? 'E' : 'N';
  const key = `${o}${m}`;
  if (key === 'NN') return 'TN';
  return key as Alignment;
}

export function getAlignmentName(order: number, morality: number): string {
  return ALIGNMENT_NAMES[getAlignment(order, morality)];
}

export function createAlignmentState(characterId: string, initialOrder: number = 0, initialMorality: number = 0): AlignmentState {
  return { characterId, order: initialOrder, morality: initialMorality, history: [] };
}

export function shiftAlignment(
  state: AlignmentState,
  axis: AlignmentAxis,
  delta: number,
  reason: string,
  campaignId: string,
): AlignmentState {
  const newState = { ...state, history: [...state.history] };
  if (axis === 'order') {
    newState.order = Math.max(-5, Math.min(5, state.order + delta));
  } else {
    newState.morality = Math.max(-5, Math.min(5, state.morality + delta));
  }
  newState.history.push({ timestamp: Date.now(), axis, delta, reason, campaignId });
  // Cap history
  if (newState.history.length > 50) newState.history = newState.history.slice(-50);
  return newState;
}

export function detectAlignmentShift(before: AlignmentState, after: AlignmentState): string | null {
  const alignBefore = getAlignment(before.order, before.morality);
  const alignAfter = getAlignment(after.order, after.morality);
  if (alignBefore !== alignAfter) {
    return `Alignment shifted: ${ALIGNMENT_NAMES[alignBefore]} → ${ALIGNMENT_NAMES[alignAfter]}`;
  }
  return null;
}

// Common choice templates
export const MORAL_CHOICES = {
  spared_enemy: { axis: 'morality' as AlignmentAxis, delta: 1, reason: 'Showed mercy to a defeated enemy' },
  killed_prisoner: { axis: 'morality' as AlignmentAxis, delta: -1, reason: 'Killed a helpless prisoner' },
  kept_promise: { axis: 'order' as AlignmentAxis, delta: 1, reason: 'Honored a promise or contract' },
  broke_law: { axis: 'order' as AlignmentAxis, delta: -1, reason: 'Broke the law or a sworn oath' },
  helped_stranger: { axis: 'morality' as AlignmentAxis, delta: 1, reason: 'Helped a stranger with no reward' },
  stole_from_innocent: { axis: 'morality' as AlignmentAxis, delta: -1, reason: 'Stole from an innocent person' },
  followed_orders: { axis: 'order' as AlignmentAxis, delta: 1, reason: 'Followed legitimate authority' },
  defied_authority: { axis: 'order' as AlignmentAxis, delta: -1, reason: 'Defied legitimate authority' },
  sacrificed_self: { axis: 'morality' as AlignmentAxis, delta: 2, reason: 'Made a personal sacrifice for others' },
  betrayed_ally: { axis: 'morality' as AlignmentAxis, delta: -2, reason: 'Betrayed a trusted ally' },
};

export function formatAlignmentStatus(state: AlignmentState, characterName: string): string {
  const alignment = getAlignmentName(state.order, state.morality);
  const oBar = '◼'.repeat(Math.max(0, state.order + 5)) + '◻'.repeat(Math.max(0, 5 - state.order));
  const mBar = '◼'.repeat(Math.max(0, state.morality + 5)) + '◻'.repeat(Math.max(0, 5 - state.morality));
  const lines = [`⚖️ **${characterName}**: ${alignment}`];
  lines.push(`Order: [${oBar}] (${state.order > 0 ? '+' : ''}${state.order})`);
  lines.push(`Morality: [${mBar}] (${state.morality > 0 ? '+' : ''}${state.morality})`);
  if (state.history.length > 0) {
    const recent = state.history.slice(-3);
    lines.push(`Recent: ${recent.map((h) => `${h.delta > 0 ? '+' : ''}${h.delta} ${h.axis} (${h.reason})`).join(', ')}`);
  }
  return lines.join('\n');
}
