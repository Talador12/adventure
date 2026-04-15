// D&D 5e condition mechanical effects.
// Maps each condition to its actual gameplay impact for use in combat rolls.

import type { ConditionType, ActiveCondition } from '../types/game';

export interface ConditionMechanics {
  attackAdvantage: boolean;
  attackDisadvantage: boolean;
  defenseAdvantage: boolean;   // attacks against this unit have advantage
  defenseDisadvantage: boolean; // attacks against this unit have disadvantage
  speedZero: boolean;
  autoFailStrDex: boolean;
  meleeCrit: boolean;          // melee hits auto-crit (paralyzed, unconscious)
  incapacitated: boolean;      // no actions or reactions
}

const EMPTY: ConditionMechanics = {
  attackAdvantage: false, attackDisadvantage: false,
  defenseAdvantage: false, defenseDisadvantage: false,
  speedZero: false, autoFailStrDex: false, meleeCrit: false, incapacitated: false,
};

// Per-condition mechanical effects (D&D 5e PHB Appendix A)
const CONDITION_MECHANICS: Partial<Record<ConditionType, Partial<ConditionMechanics>>> = {
  blinded: { attackDisadvantage: true, defenseAdvantage: true },
  charmed: {}, // cannot attack charmer - handled contextually
  deafened: {}, // fails hearing checks - handled contextually
  frightened: { attackDisadvantage: true },
  grappled: { speedZero: true },
  incapacitated: { incapacitated: true },
  paralyzed: { incapacitated: true, autoFailStrDex: true, defenseAdvantage: true, meleeCrit: true },
  poisoned: { attackDisadvantage: true },
  prone: {}, // handled by existing rollD20WithProne - melee adv, ranged disadv
  restrained: { attackDisadvantage: true, defenseAdvantage: true, speedZero: true },
  stunned: { incapacitated: true, autoFailStrDex: true, defenseAdvantage: true },
  unconscious: { incapacitated: true, autoFailStrDex: true, defenseAdvantage: true, meleeCrit: true },
  // Game-specific conditions with no standard 5e mechanical mapping
  surprised: { incapacitated: true },
  hidden: { attackAdvantage: true },
};

// Aggregate effects from all active conditions on a unit.
// Advantage and disadvantage from different sources cancel out per 5e rules.
export function getConditionEffects(conditions: ConditionType[]): ConditionMechanics {
  const result = { ...EMPTY };
  for (const cond of conditions) {
    const fx = CONDITION_MECHANICS[cond];
    if (!fx) continue;
    if (fx.attackAdvantage) result.attackAdvantage = true;
    if (fx.attackDisadvantage) result.attackDisadvantage = true;
    if (fx.defenseAdvantage) result.defenseAdvantage = true;
    if (fx.defenseDisadvantage) result.defenseDisadvantage = true;
    if (fx.speedZero) result.speedZero = true;
    if (fx.autoFailStrDex) result.autoFailStrDex = true;
    if (fx.meleeCrit) result.meleeCrit = true;
    if (fx.incapacitated) result.incapacitated = true;
  }
  return result;
}

// Roll a d20 with advantage/disadvantage from conditions.
// Resolves cancellation: if both advantage and disadvantage exist, roll normally.
export function rollWithConditions(
  attackerConditions: ConditionType[],
  targetConditions: ConditionType[],
  isMelee: boolean,
  extraDisadvantage?: boolean,
): { roll: number; hadAdvantage: boolean; hadDisadvantage: boolean; rolls: [number, number]; conditionNote: string } {
  const atk = getConditionEffects(attackerConditions);
  const def = getConditionEffects(targetConditions);

  let advantage = atk.attackAdvantage || def.defenseDisadvantage;
  let disadvantage = atk.attackDisadvantage || (extraDisadvantage ?? false);

  // Prone: attacker has disadvantage, melee attacks against prone have advantage, ranged have disadvantage
  if (attackerConditions.includes('prone')) disadvantage = true;
  if (targetConditions.includes('prone') && isMelee) advantage = true;
  if (targetConditions.includes('prone') && !isMelee) disadvantage = true;

  // Defender conditions granting advantage to attackers
  if (def.defenseAdvantage) advantage = true;

  // Cancel out per 5e rules
  if (advantage && disadvantage) { advantage = false; disadvantage = false; }

  const r1 = Math.floor(Math.random() * 20) + 1;
  const r2 = Math.floor(Math.random() * 20) + 1;
  const roll = advantage ? Math.max(r1, r2) : disadvantage ? Math.min(r1, r2) : r1;

  // Build a note explaining why advantage/disadvantage applied
  const notes: string[] = [];
  if (atk.attackAdvantage) notes.push('attacker hidden');
  if (atk.attackDisadvantage) {
    const reasons = attackerConditions.filter((c) => CONDITION_MECHANICS[c]?.attackDisadvantage);
    notes.push(reasons.join('/'));
  }
  if (def.defenseAdvantage) {
    const reasons = targetConditions.filter((c) => CONDITION_MECHANICS[c]?.defenseAdvantage);
    notes.push(`target ${reasons.join('/')}`);
  }
  const conditionNote = notes.length > 0
    ? (advantage ? `Advantage (${notes.join(', ')})` : disadvantage ? `Disadvantage (${notes.join(', ')})` : '')
    : '';

  return { roll, hadAdvantage: advantage, hadDisadvantage: disadvantage, rolls: [r1, r2], conditionNote };
}
