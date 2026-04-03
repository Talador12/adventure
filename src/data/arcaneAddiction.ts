// Arcane addiction system — magical dependency with withdrawal and escalation.

export type AddictionSource = 'potion_abuse' | 'wild_magic_exposure' | 'leyline_siphoning' | 'enchantment_dependency' | 'planar_energy';
export type AddictionStage = 'casual' | 'habitual' | 'dependent' | 'desperate' | 'consumed';

export interface WithdrawalEffect { stage: AddictionStage; physicalEffect: string; mentalEffect: string; duration: string; saveDC: number; }

export interface ArcaneAddictionProfile {
  source: AddictionSource;
  name: string;
  description: string;
  initialBenefit: string;
  stages: WithdrawalEffect[];
  cureMethod: string;
  cureDuration: string;
  relapseTrigger: string;
}

const PROFILES: ArcaneAddictionProfile[] = [
  { source: 'potion_abuse', name: 'Potion Dependency', description: 'Healing potions feel so good. One more can\'t hurt. Then you need two. Then three.', initialBenefit: 'Potions heal +50% more. Temporary HP from any consumed potion.', stages: [
    { stage: 'casual', physicalEffect: 'Mild nausea without potions for 24 hours.', mentalEffect: 'Craving. Think about potions often.', duration: '1 day', saveDC: 10 },
    { stage: 'habitual', physicalEffect: '-1 CON without potion per day. Hands shake.', mentalEffect: 'Irritable. Snappy with allies.', duration: '3 days', saveDC: 12 },
    { stage: 'dependent', physicalEffect: 'Potions heal normal amount now. Need 2/day minimum or 1d4 HP loss per hour.', mentalEffect: 'Hoard potions. Steal from allies.', duration: '1 week', saveDC: 15 },
    { stage: 'desperate', physicalEffect: 'Drink ANYTHING that glows. CON DC 13 or poisoned.', mentalEffect: 'Cannot distinguish healing from harmful potions. All look the same.', duration: '2 weeks', saveDC: 17 },
    { stage: 'consumed', physicalEffect: 'Body is saturated. Potions provide diminishing returns (heal 1 HP regardless of type).', mentalEffect: 'Identity reduced to the addiction. No other goals.', duration: 'Permanent until cured', saveDC: 19 },
  ], cureMethod: 'Cold turkey for 30 days (CON save each day at stage DC) OR Lesser Restoration daily for 1 week + counseling.', cureDuration: '30 days (cold turkey) or 7 days (magical + therapy)', relapseTrigger: 'Drinking any potion within 6 months of recovery. One sip and you\'re back at habitual.' },
  { source: 'wild_magic_exposure', name: 'Surge Chasing', description: 'Wild magic surges feel like lightning in your veins. You want more. You NEED more.', initialBenefit: 'Advantage on saves vs wild magic effects. +1 to CHA when surging.', stages: [
    { stage: 'casual', physicalEffect: 'Skin tingles pleasantly near magic. Hair stands on end.', mentalEffect: 'Seek out wild magic zones. "Just to watch."', duration: '1 day', saveDC: 11 },
    { stage: 'habitual', physicalEffect: 'Sparks arc between fingers involuntarily. 1d4 force damage to things you touch.', mentalEffect: 'Deliberately cause surges. Reckless spellcasting.', duration: '3 days', saveDC: 13 },
    { stage: 'dependent', physicalEffect: 'Body crackles with unstable magic. 10% chance per hour of involuntary cantrip.', mentalEffect: 'Cannot rest without a surge. Long rests require a wild magic event.', duration: '1 week', saveDC: 16 },
    { stage: 'desperate', physicalEffect: 'Walking wild magic zone. Random surges every 1d4 hours.', mentalEffect: 'Euphoric during surges, catatonic between them.', duration: '2 weeks', saveDC: 18 },
    { stage: 'consumed', physicalEffect: 'Become a living wild magic anomaly. Permanent Tangle-zone effect (see magical anomalies).', mentalEffect: 'Consciousness fragments across probability. "I can see ALL the timelines."', duration: 'Permanent', saveDC: 20 },
  ], cureMethod: 'Antimagic field for 7 consecutive days. The withdrawal is agonizing but the magic burns out.', cureDuration: '7 days in antimagic (plus 1 month recovery)', relapseTrigger: 'Being present for any wild magic surge within 3 months of recovery.' },
  { source: 'leyline_siphoning', name: 'Leyline Tap', description: 'Drawing power directly from a leyline. Infinite magic. What could go wrong?', initialBenefit: 'Recover 1 spell slot per hour while near a leyline. +2 to spell save DC on leylines.', stages: [
    { stage: 'casual', physicalEffect: 'Mild euphoria near leylines. Colors seem brighter.', mentalEffect: 'Prefer to stay near leylines. Plan travel routes around them.', duration: '1 day', saveDC: 12 },
    { stage: 'dependent', physicalEffect: 'Spellcasting hurts away from leylines. 1d4 psychic per spell cast off-leyline.', mentalEffect: 'Leylines feel like home. Everywhere else feels wrong.', duration: '1 week', saveDC: 15 },
    { stage: 'consumed', physicalEffect: 'Body becomes a leyline conduit. Uncontrolled energy flows through you.', mentalEffect: 'Merge with the leyline. Consciousness becomes the energy flow.', duration: 'Permanent', saveDC: 20 },
  ], cureMethod: 'Voluntary disconnection ritual (Religion DC 16 by a druid/cleric) + 1 month of magical abstinence.', cureDuration: '1 month', relapseTrigger: 'Touching a leyline within 1 year. The connection is never fully severed.' },
];

export function getAddictionProfile(source: AddictionSource): ArcaneAddictionProfile | undefined {
  return PROFILES.find((p) => p.source === source);
}

export function getWithdrawalAtStage(profile: ArcaneAddictionProfile, stage: AddictionStage): WithdrawalEffect | undefined {
  return profile.stages.find((s) => s.stage === stage);
}

export function getAllAddictionSources(): AddictionSource[] {
  return PROFILES.map((p) => p.source);
}

export function getAllStages(): AddictionStage[] {
  return ['casual', 'habitual', 'dependent', 'desperate', 'consumed'];
}

export function formatAddiction(profile: ArcaneAddictionProfile, currentStage: AddictionStage = 'casual'): string {
  const stage = getWithdrawalAtStage(profile, currentStage);
  const icon = { casual: '🟢', habitual: '🟡', dependent: '🟠', desperate: '🔴', consumed: '💀' }[currentStage];
  const lines = [`${icon} **${profile.name}** *(${profile.source.replace(/_/g, ' ')}, ${currentStage})*`];
  lines.push(`  *${profile.description}*`);
  if (stage) { lines.push(`  Body: ${stage.physicalEffect}`); lines.push(`  Mind: ${stage.mentalEffect}`); lines.push(`  Save DC: ${stage.saveDC}`); }
  lines.push(`  💊 Cure: ${profile.cureMethod}`);
  lines.push(`  ⚠️ Relapse: ${profile.relapseTrigger}`);
  return lines.join('\n');
}

export { PROFILES as ADDICTION_PROFILES };
