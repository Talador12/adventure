// Warlock patron relationship tracker — patron demands, gifts, and displeasure mechanics.

export type PatronType = 'archfey' | 'fiend' | 'great_old_one' | 'celestial' | 'hexblade' | 'fathomless';

export interface PatronDemand {
  demand: string;
  deadline: string;
  rewardForCompliance: string;
  punishmentForRefusal: string;
  difficulty: 'trivial' | 'moderate' | 'difficult' | 'extreme';
}

export interface PatronGift {
  name: string;
  description: string;
  mechanicalEffect: string;
  cost: string; // what the patron expects in return eventually
}

export interface PatronProfile {
  type: PatronType;
  name: string;
  personality: string;
  communicationStyle: string;
  demands: PatronDemand[];
  gifts: PatronGift[];
  displeasureEffects: string[];
  favorThreshold: number; // favors needed to earn a major boon
}

const PATRONS: PatronProfile[] = [
  { type: 'archfey', name: 'Titania\'s Shadow (The Laughing Dark)', personality: 'Mercurial, playful, vindictive when bored. Treats the warlock as entertainment.', communicationStyle: 'Appears in dreams as a shifting silhouette. Leaves cryptic riddles in morning dew.', demands: [
    { demand: 'Make someone fall in love (with anyone, not necessarily you).', deadline: 'Next full moon', rewardForCompliance: 'Charm Person at will for 24 hours.', punishmentForRefusal: 'Your face becomes forgettable — disadvantage on Persuasion for 1 week.', difficulty: 'moderate' },
    { demand: 'Plant a specific seed in an impossible location.', deadline: '3 days', rewardForCompliance: 'A Fey Touched feat for 1 week.', punishmentForRefusal: 'Mushrooms grow from your belongings. -1 CHA until removed (Nature DC 14).', difficulty: 'difficult' },
  ], gifts: [
    { name: 'Cloak of Many Faces', description: 'A shimmering cloak that shifts color.', mechanicalEffect: 'Disguise Self at will.', cost: 'One genuine memory of happiness (you forget it forever).' },
  ], displeasureEffects: ['Your shadow detaches and mocks you in public.', 'All food tastes of ash for 1d4 days.', 'Animals refuse to come near you.'], favorThreshold: 5 },
  { type: 'fiend', name: 'Azmodiel (The Burning Contract)', personality: 'Charming, precise, ruthlessly transactional. Every word is a clause in an invisible contract.', communicationStyle: 'Appears as a well-dressed figure in flames. Speaks in legal terminology.', demands: [
    { demand: 'Collect a soul — convince someone to sign a contract (any contract).', deadline: '1 week', rewardForCompliance: '+1 to spell save DC for 24 hours.', punishmentForRefusal: '1d6 fire damage each dawn until a soul is delivered.', difficulty: 'moderate' },
    { demand: 'Burn a temple to a good-aligned deity.', deadline: '1 month', rewardForCompliance: 'Fireball at 5th level, once.', punishmentForRefusal: 'Your pact weapon vanishes for 3 days.', difficulty: 'extreme' },
  ], gifts: [
    { name: 'Infernal Coin', description: 'A gold coin that always returns to your pocket.', mechanicalEffect: 'Advantage on Persuasion checks involving money or deals.', cost: 'Your firstborn child\'s name is inscribed in hell\'s ledger.' },
  ], displeasureEffects: ['Spontaneous nosebleeds of sulfurous blood.', 'Contracts you sign burst into flame.', 'Imps follow you and report your activities.'], favorThreshold: 7 },
  { type: 'great_old_one', name: 'Yg\'thrazil (The Dreaming Void)', personality: 'Unknowable. May not be aware the warlock exists. Communications might be accidental.', communicationStyle: 'Intrusive thoughts that feel alien. Visions of geometries that shouldn\'t exist.', demands: [
    { demand: 'Stare at the stars for 8 hours without blinking.', deadline: 'Next clear night', rewardForCompliance: 'Telepathy 120ft for 1 week.', punishmentForRefusal: 'Headaches (disadvantage on Concentration) for 3 days.', difficulty: 'moderate' },
    { demand: 'Speak a phrase in Deep Speech at a public gathering.', deadline: '1 week', rewardForCompliance: 'Detect Thoughts at will for 24 hours.', punishmentForRefusal: 'Whispers in your head drown out conversation (-2 Perception for 1 week).', difficulty: 'trivial' },
  ], gifts: [
    { name: 'Eye of the Void', description: 'A third eye that opens on your forehead when you concentrate.', mechanicalEffect: 'See through magical darkness. Detect aberrations within 60ft.', cost: 'Slowly losing the ability to dream. Eventually, you stop sleeping entirely.' },
  ], displeasureEffects: ['Tentacle marks appear on your skin temporarily.', 'You speak backwards for 1d4 hours.', 'Nearby people feel uneasy around you (disadvantage on social checks).'], favorThreshold: 3 },
  { type: 'celestial', name: 'Zariel\'s Mercy (The Redeemer)', personality: 'Compassionate but demanding. Expects the warlock to be better than they think they can be.', communicationStyle: 'Warm light and a gentle voice. Sometimes appears as a dove.', demands: [
    { demand: 'Heal someone who doesn\'t deserve it.', deadline: 'Next encounter', rewardForCompliance: 'Cure Wounds at 3rd level, free casting.', punishmentForRefusal: 'Healing spells heal 1 less for 3 days.', difficulty: 'trivial' },
    { demand: 'Forgive someone who has wronged you. Genuinely.', deadline: '1 week', rewardForCompliance: '+2 WIS saves for 1 week.', punishmentForRefusal: 'Guilt — disadvantage on WIS saves for 3 days.', difficulty: 'difficult' },
  ], gifts: [
    { name: 'Tears of the Redeemer', description: 'A vial that never empties of a single, perfect tear.', mechanicalEffect: 'Apply to a creature: remove one condition (poisoned, blinded, deafened). 1/day.', cost: 'You feel the pain of everyone you heal. Just for a moment. But it adds up.' },
  ], displeasureEffects: ['Light sources dim around you.', 'Holy symbols tarnish in your presence.', 'You feel a crushing sense of disappointment that isn\'t yours.'], favorThreshold: 4 },
];

export function getPatron(type: PatronType): PatronProfile | undefined {
  return PATRONS.find((p) => p.type === type);
}

export function getRandomDemand(type: PatronType): PatronDemand | null {
  const patron = getPatron(type);
  if (!patron) return null;
  return patron.demands[Math.floor(Math.random() * patron.demands.length)];
}

export function getRandomDispleasure(type: PatronType): string | null {
  const patron = getPatron(type);
  if (!patron) return null;
  return patron.displeasureEffects[Math.floor(Math.random() * patron.displeasureEffects.length)];
}

export function getAllPatronTypes(): PatronType[] {
  return PATRONS.map((p) => p.type);
}

export function formatPatron(patron: PatronProfile): string {
  const icon = { archfey: '🌸', fiend: '🔥', great_old_one: '🌀', celestial: '✨', hexblade: '⚔️', fathomless: '🌊' }[patron.type];
  const lines = [`${icon} **${patron.name}** *(${patron.type.replace(/_/g, ' ')})*`];
  lines.push(`  *${patron.personality}*`);
  lines.push(`  Communication: ${patron.communicationStyle}`);
  lines.push(`  Favors needed for boon: ${patron.favorThreshold}`);
  return lines.join('\n');
}

export { PATRONS };
