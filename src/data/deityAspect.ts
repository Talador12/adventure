// Random deity aspect manifestation — different faces of the same god for different situations.

export type AspectContext = 'war' | 'mercy' | 'judgement' | 'creation' | 'destruction' | 'trickery';

export interface DeityAspect {
  deityName: string;
  aspect: AspectContext;
  manifestationName: string;
  appearance: string;
  personality: string;
  grantedBoon: string;
  demandedTribute: string;
  conflictsWithAspect: AspectContext;
}

const ASPECTS: DeityAspect[] = [
  { deityName: 'Solara', aspect: 'mercy', manifestationName: 'The Gentle Dawn', appearance: 'Warm light that doesn\'t cast shadows. A woman\'s voice from nowhere, filled with compassion.', personality: 'Patient, forgiving, sees potential in everyone. Weeps for the suffering.', grantedBoon: 'Maximized healing for 24 hours. Undead within 30ft take 1d6 radiant/round.', demandedTribute: 'Heal a stranger without being asked. No reward. No recognition.', conflictsWithAspect: 'destruction' },
  { deityName: 'Solara', aspect: 'judgement', manifestationName: 'The Burning Noon', appearance: 'A pillar of scorching white light. An eye in the sky that sees EVERYTHING.', personality: 'Impartial, absolute. The sun doesn\'t take sides — it illuminates all sins equally.', grantedBoon: 'Truesight 120ft for 1 hour. Zone of Truth (no save) in 60ft radius.', demandedTribute: 'Confess your own sins before condemning another. Publicly.', conflictsWithAspect: 'mercy' },
  { deityName: 'Korrath', aspect: 'war', manifestationName: 'The Iron Vanguard', appearance: 'A 20ft armored figure wreathed in battle-fire. Every weapon in 100ft vibrates.', personality: 'LOUD. Loves battle. Respects courage. Despises cowardice.', grantedBoon: '+2 to attack and damage for all allies for 1 hour. Advantage on saves vs. fear.', demandedTribute: 'Fight an enemy stronger than you. Win or lose, the courage is the tribute.', conflictsWithAspect: 'mercy' },
  { deityName: 'Korrath', aspect: 'creation', manifestationName: 'The Forge Eternal', appearance: 'A massive anvil appears from nowhere. Sparks fly. The temperature rises 30 degrees.', personality: 'Focused, precise. Speaks in measurements and materials. Every word is deliberate.', grantedBoon: 'Craft any mundane item in 1 minute. Craft a +1 weapon in 1 hour (materials required).', demandedTribute: 'Create something that will outlast you. A bridge, a wall, a weapon. Something that matters.', conflictsWithAspect: 'destruction' },
  { deityName: 'Aelindra', aspect: 'trickery', manifestationName: 'The Laughing Cipher', appearance: 'A woman made of shifting letters. Her face is a different language each second. She giggles.', personality: 'Playful, cryptic, finds confusion hilarious. Every answer is a riddle.', grantedBoon: 'Invisibility at will for 1 hour. Advantage on Deception. Can read any language.', demandedTribute: 'Pull a prank on someone powerful. The funnier, the better. The god is watching.', conflictsWithAspect: 'judgement' },
  { deityName: 'Vex', aspect: 'destruction', manifestationName: 'The World-Breaker', appearance: 'A hurricane in human shape. Lightning for eyes. Thunder for a voice.', personality: 'ZERO patience. Everything is either growing or dying. Stagnation is the only sin.', grantedBoon: 'One use of Earthquake (8th level). Or Storm of Vengeance if you\'re REALLY angry.', demandedTribute: 'Destroy something old that no longer serves a purpose. A building. A law. A grudge.', conflictsWithAspect: 'creation' },
];

export function getRandomAspect(): DeityAspect {
  return ASPECTS[Math.floor(Math.random() * ASPECTS.length)];
}

export function getAspectsByDeity(name: string): DeityAspect[] {
  return ASPECTS.filter((a) => a.deityName === name);
}

export function getAspectsByContext(context: AspectContext): DeityAspect[] {
  return ASPECTS.filter((a) => a.aspect === context);
}

export function getConflictingAspects(aspect: DeityAspect): DeityAspect[] {
  return ASPECTS.filter((a) => a.deityName === aspect.deityName && a.aspect === aspect.conflictsWithAspect);
}

export function getAllAspectContexts(): AspectContext[] {
  return [...new Set(ASPECTS.map((a) => a.aspect))];
}

export function formatAspect(aspect: DeityAspect): string {
  const lines = [`✨ **${aspect.manifestationName}** *(${aspect.deityName}, ${aspect.aspect})*`];
  lines.push(`  *${aspect.appearance}*`);
  lines.push(`  Personality: ${aspect.personality}`);
  lines.push(`  🎁 Boon: ${aspect.grantedBoon}`);
  lines.push(`  🙏 Tribute: ${aspect.demandedTribute}`);
  lines.push(`  ⚡ Conflicts with: ${aspect.conflictsWithAspect} aspect`);
  return lines.join('\n');
}

export { ASPECTS as DEITY_ASPECTS };
