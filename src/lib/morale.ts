// Morale system — enemies flee when their side takes heavy casualties.
// Checks after each kill. Fleeing enemies become non-combatants.

export interface MoraleState {
  initialEnemyCount: number;
  currentAliveCount: number;
  fleeingIds: string[];
  moraleChecksPassed: number;
  moraleChecksFailed: number;
}

export interface MoraleResult {
  shouldFlee: boolean;
  fleeingUnitIds: string[];
  narration: string;
}

export type MoraleTier = 'fanatical' | 'brave' | 'normal' | 'cowardly';

const MORALE_THRESHOLDS: Record<MoraleTier, number> = {
  fanatical: 0.1,  // flee at 90% casualties
  brave: 0.25,     // flee at 75% casualties
  normal: 0.5,     // flee at 50% casualties
  cowardly: 0.75,  // flee at 25% casualties
};

const FLEE_DC: Record<MoraleTier, number> = {
  fanatical: 20,
  brave: 14,
  normal: 10,
  cowardly: 6,
};

export function createMoraleState(enemyCount: number): MoraleState {
  return {
    initialEnemyCount: enemyCount,
    currentAliveCount: enemyCount,
    fleeingIds: [],
    moraleChecksPassed: 0,
    moraleChecksFailed: 0,
  };
}

export function checkMorale(
  state: MoraleState,
  tier: MoraleTier = 'normal',
  enemyUnits: { id: string; name: string; hp: number }[],
): MoraleResult {
  const alive = enemyUnits.filter((u) => u.hp > 0 && !state.fleeingIds.includes(u.id));
  const aliveRatio = alive.length / Math.max(1, state.initialEnemyCount);
  const threshold = MORALE_THRESHOLDS[tier];

  // No morale check needed — enough allies still standing
  if (aliveRatio > threshold) {
    return { shouldFlee: false, fleeingUnitIds: [], narration: '' };
  }

  // Roll morale check for each remaining enemy
  const dc = FLEE_DC[tier];
  const fleeing: string[] = [];
  const staying: string[] = [];

  for (const unit of alive) {
    const roll = Math.floor(Math.random() * 20) + 1;
    // Add a bonus for being high HP, penalty for low HP
    const hpBonus = unit.hp > 20 ? 2 : unit.hp > 10 ? 0 : -2;
    if (roll + hpBonus < dc) {
      fleeing.push(unit.id);
    } else {
      staying.push(unit.id);
    }
  }

  if (fleeing.length === 0) {
    return {
      shouldFlee: false,
      fleeingUnitIds: [],
      narration: `The remaining enemies steel themselves and fight on! (${alive.length} hold firm)`,
    };
  }

  const fleeNames = fleeing.map((id) => enemyUnits.find((u) => u.id === id)?.name || id);
  const narration = fleeing.length === alive.length
    ? `💨 **Rout!** All remaining enemies break and flee! (${fleeNames.join(', ')})`
    : `💨 **Morale break!** ${fleeNames.join(', ')} turn${fleeing.length === 1 ? 's' : ''} and flee! (${staying.length} hold firm)`;

  return { shouldFlee: true, fleeingUnitIds: fleeing, narration };
}

export function updateMoraleState(state: MoraleState, result: MoraleResult): MoraleState {
  return {
    ...state,
    fleeingIds: [...state.fleeingIds, ...result.fleeingUnitIds],
    moraleChecksPassed: state.moraleChecksPassed + (result.shouldFlee ? 0 : 1),
    moraleChecksFailed: state.moraleChecksFailed + (result.shouldFlee ? 1 : 0),
  };
}

export function getMoraleTierFromCR(cr: number): MoraleTier {
  if (cr >= 10) return 'brave';
  if (cr >= 5) return 'normal';
  if (cr >= 1) return 'normal';
  return 'cowardly';
}
