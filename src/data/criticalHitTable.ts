// Critical hit table — dramatic extra effects on nat 20s by damage type.

export interface CritEffect { damageType: string; effect: string; bonusDamage: string; }

export const CRIT_TABLE: Record<string, CritEffect[]> = {
  slashing: [
    { damageType: 'slashing', effect: 'Deep gash — target bleeds 1d4 at start of each turn for 3 rounds.', bonusDamage: '+1d4/round' },
    { damageType: 'slashing', effect: 'Severed tendon — target speed halved until healed.', bonusDamage: '' },
    { damageType: 'slashing', effect: 'Impressive scar — target has disadvantage on CHA checks for 24h.', bonusDamage: '' },
  ],
  piercing: [
    { damageType: 'piercing', effect: 'Punctured lung — target can\'t speak for 1 round.', bonusDamage: '' },
    { damageType: 'piercing', effect: 'Pinned — weapon lodged in target. STR DC 12 to remove (bonus action).', bonusDamage: '' },
    { damageType: 'piercing', effect: 'Vital strike — additional 1d8 piercing damage.', bonusDamage: '+1d8' },
  ],
  bludgeoning: [
    { damageType: 'bludgeoning', effect: 'Concussion — target stunned until end of their next turn.', bonusDamage: '' },
    { damageType: 'bludgeoning', effect: 'Bone crack — target drops held item.', bonusDamage: '' },
    { damageType: 'bludgeoning', effect: 'Sent flying — target pushed 10ft and knocked prone.', bonusDamage: '' },
  ],
  fire: [
    { damageType: 'fire', effect: 'Ignited — target takes 1d6 fire at start of each turn. Action to extinguish.', bonusDamage: '+1d6/round' },
    { damageType: 'fire', effect: 'Flash burn — target blinded until end of next turn.', bonusDamage: '' },
  ],
  cold: [
    { damageType: 'cold', effect: 'Frozen limb — target speed reduced by 10ft for 1 minute.', bonusDamage: '' },
    { damageType: 'cold', effect: 'Brittle — target has vulnerability to bludgeoning for 1 round.', bonusDamage: '' },
  ],
  lightning: [
    { damageType: 'lightning', effect: 'Shocked — target can\'t take reactions until end of next turn.', bonusDamage: '' },
    { damageType: 'lightning', effect: 'Chain lightning — arcs to one adjacent creature for 1d6 lightning.', bonusDamage: '+1d6 to adjacent' },
  ],
};

export function rollCritEffect(damageType: string): CritEffect {
  const pool = CRIT_TABLE[damageType] || CRIT_TABLE['bludgeoning'];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getCritDamageTypes(): string[] { return Object.keys(CRIT_TABLE); }

export function formatCritEffect(effect: CritEffect, attackerName: string, targetName: string): string {
  return `⚡ **CRITICAL HIT!** ${attackerName} → ${targetName} (${effect.damageType})\n${effect.effect}${effect.bonusDamage ? `\nBonus: ${effect.bonusDamage}` : ''}`;
}
