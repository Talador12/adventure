// Random magical anomaly generator — zones where magic behaves differently.

export type AnomalyType = 'amplification' | 'suppression' | 'wild' | 'temporal' | 'gravitational' | 'sentient';

export interface MagicalAnomaly {
  name: string;
  type: AnomalyType;
  radius: string;
  description: string;
  effects: string[];
  triggerCondition: string;
  duration: string;
  dispelDC: number | null;
}

const ANOMALIES: MagicalAnomaly[] = [
  { name: 'The Wellspring', type: 'amplification', radius: '60ft', description: 'A geyser of raw magical energy erupts from the ground. The air shimmers with power.', effects: ['All spells cast within the zone are treated as 1 level higher.', 'Spell save DCs increase by 2.', 'Healing spells restore maximum HP.', 'Concentration checks have disadvantage (too much power to control).'], triggerCondition: 'Any spell cast within 60ft has a 25% chance of triggering a wild magic surge.', duration: '1d4 hours', dispelDC: 18 },
  { name: 'Dead Magic Pocket', type: 'suppression', radius: '30ft', description: 'An invisible sphere where magic simply ceases to exist. Spells fizzle. Magic items go dark.', effects: ['No spells can be cast within the zone.', 'Magic items become mundane (temporary).', 'Summoned creatures vanish.', 'Magical effects entering the zone are suppressed.'], triggerCondition: 'Permanent. No trigger — the zone simply exists.', duration: 'Permanent until dispelled', dispelDC: 20 },
  { name: 'The Tangle', type: 'wild', radius: '100ft', description: 'Magic works, but never as intended. Every spell produces a random additional effect.', effects: ['Every spell triggers a wild magic surge (no save).', 'Cantrips have a 50% chance of casting a random different cantrip instead.', 'Potions produce random effects (roll on potion table).', 'Magic items activate sporadically.'], triggerCondition: 'Any magical action within the zone.', duration: '2d6 hours', dispelDC: 16 },
  { name: 'Time Eddy', type: 'temporal', radius: '40ft', description: 'Time flows at different speeds inside versus outside. Conversations happen in fast-forward or slow-motion.', effects: ['1 round inside = 1d4 rounds outside (variable each round).', 'Aging is accelerated or reversed by 1d10 years (random per creature).', 'Initiative rerolled each round.', 'Long rests take 1d4 hours instead of 8 (but only inside the zone).'], triggerCondition: 'Entering the zone.', duration: '1d8 hours', dispelDC: 17 },
  { name: 'Inverse Gravity Well', type: 'gravitational', radius: '50ft', description: 'Gravity pulls upward. Or sideways. Or in spirals. It changes its mind.', effects: ['Gravity direction changes every 1d4 rounds (d8 for direction).', 'Falling damage applies in whatever direction gravity pulls.', 'Ranged attacks have disadvantage (trajectory curves).', 'Flying creatures are unaffected (they don\'t rely on gravity).'], triggerCondition: 'Entering the zone. DEX DC 14 to grab something or float away.', duration: '1d6 hours', dispelDC: 15 },
  { name: 'The Thinking Zone', type: 'sentient', radius: '80ft', description: 'The magic itself is aware. It watches. It judges. It decides whether to help you.', effects: ['Good-aligned creatures: spells are empowered (+1d4 damage/healing).', 'Evil-aligned creatures: spells have 25% failure chance.', 'Neutral creatures: random — flip a coin each spell.', 'The zone communicates via feelings (warmth = approval, chill = disapproval).'], triggerCondition: 'Casting a spell or performing a strongly moral/immoral act.', duration: 'Permanent (the zone is alive)', dispelDC: null },
];

export function getRandomAnomaly(): MagicalAnomaly {
  return ANOMALIES[Math.floor(Math.random() * ANOMALIES.length)];
}

export function getAnomaliesByType(type: AnomalyType): MagicalAnomaly[] {
  return ANOMALIES.filter((a) => a.type === type);
}

export function getDispellableAnomalies(): MagicalAnomaly[] {
  return ANOMALIES.filter((a) => a.dispelDC !== null);
}

export function getAllAnomalyTypes(): AnomalyType[] {
  return [...new Set(ANOMALIES.map((a) => a.type))];
}

export function formatAnomaly(anomaly: MagicalAnomaly): string {
  const icon = { amplification: '⬆️', suppression: '⬇️', wild: '🌀', temporal: '⏳', gravitational: '🔄', sentient: '🧠' }[anomaly.type];
  const lines = [`${icon} **${anomaly.name}** *(${anomaly.type}, ${anomaly.radius} radius)*`];
  lines.push(`  *${anomaly.description}*`);
  lines.push('  **Effects:**');
  anomaly.effects.forEach((e) => lines.push(`    ⚡ ${e}`));
  lines.push(`  Trigger: ${anomaly.triggerCondition}`);
  lines.push(`  Duration: ${anomaly.duration}${anomaly.dispelDC ? ` | Dispel DC: ${anomaly.dispelDC}` : ' | Cannot be dispelled'}`);
  return lines.join('\n');
}

export { ANOMALIES as MAGICAL_ANOMALIES };
