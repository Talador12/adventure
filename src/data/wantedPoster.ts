// Wanted poster generator — party members as fugitives with escalating bounty tiers.

export type BountyTier = 'petty' | 'notable' | 'dangerous' | 'infamous' | 'legendary';
export type CrimeCategory = 'theft' | 'assault' | 'murder' | 'treason' | 'heresy' | 'smuggling' | 'arson' | 'escape';

export interface WantedPoster {
  targetName: string;
  alias: string | null;
  crime: CrimeCategory;
  crimeDescription: string;
  bountyTier: BountyTier;
  bountyAmount: number;
  deadOrAlive: 'dead or alive' | 'alive only' | 'dead preferred';
  issuedBy: string;
  physicalDescription: string;
  lastSeen: string;
  bountyHunters: number; // how many are actively hunting
  escalationTrigger: string; // what causes the bounty to increase
}

const TIER_AMOUNTS: Record<BountyTier, { min: number; max: number }> = {
  petty: { min: 25, max: 100 },
  notable: { min: 100, max: 500 },
  dangerous: { min: 500, max: 2000 },
  infamous: { min: 2000, max: 5000 },
  legendary: { min: 5000, max: 25000 },
};

const CRIME_TEMPLATES: { crime: CrimeCategory; descriptions: string[]; issuers: string[] }[] = [
  { crime: 'theft', descriptions: ['Grand theft from the Royal Treasury', 'Stealing a noble\'s prized warhorse', 'Looting an ancient tomb (technically belongs to the Crown)'], issuers: ['The Crown', 'Merchant Guild', 'Noble House'] },
  { crime: 'assault', descriptions: ['Assaulting a city guard during an "incident"', 'Bar brawl that hospitalized the mayor\'s nephew', 'Punching a tax collector (understandable but illegal)'], issuers: ['City Watch', 'Noble House', 'Guild of Tax Collectors'] },
  { crime: 'murder', descriptions: ['Killing a bandit chief (his family wants revenge)', 'Self-defense that witnesses misremember', 'Eliminating a corrupt official (the replacement is worse)'], issuers: ['The Victim\'s Family', 'City Watch', 'Underworld'] },
  { crime: 'treason', descriptions: ['Allegedly plotting against the crown', 'Harboring a known enemy of the state', 'Speaking publicly against the king\'s new law'], issuers: ['The Crown', 'Royal Court', 'Secret Police'] },
  { crime: 'heresy', descriptions: ['Practicing forbidden magic within city limits', 'Defiling a holy site (accidentally)', 'Consorting with entities the temple disapproves of'], issuers: ['The Temple', 'Inquisition', 'High Priest'] },
  { crime: 'escape', descriptions: ['Escaping lawful custody', 'Breaking someone else out of prison', 'Fleeing before sentencing'], issuers: ['City Watch', 'Warden', 'The Crown'] },
];

export function generateWantedPoster(name: string, tier: BountyTier, crime?: CrimeCategory): WantedPoster {
  const crimeTemplate = crime ? CRIME_TEMPLATES.find((c) => c.crime === crime) ?? CRIME_TEMPLATES[0] : CRIME_TEMPLATES[Math.floor(Math.random() * CRIME_TEMPLATES.length)];
  const desc = crimeTemplate.descriptions[Math.floor(Math.random() * crimeTemplate.descriptions.length)];
  const issuer = crimeTemplate.issuers[Math.floor(Math.random() * crimeTemplate.issuers.length)];
  const range = TIER_AMOUNTS[tier];
  const amount = Math.floor(Math.random() * (range.max - range.min)) + range.min;
  const doa: WantedPoster['deadOrAlive'] = tier === 'legendary' ? 'dead preferred' : tier === 'petty' ? 'alive only' : 'dead or alive';
  return { targetName: name, alias: Math.random() > 0.5 ? `"The ${['Shadow', 'Ghost', 'Blade', 'Wolf', 'Phantom', 'Crimson'][Math.floor(Math.random() * 6)]}"` : null, crime: crimeTemplate.crime, crimeDescription: desc, bountyTier: tier, bountyAmount: amount, deadOrAlive: doa, issuedBy: issuer, physicalDescription: 'See illustration (if any)', lastSeen: 'The local area, within the past week', bountyHunters: tier === 'petty' ? 0 : tier === 'notable' ? 1 : tier === 'dangerous' ? 3 : tier === 'infamous' ? 5 : 10, escalationTrigger: `Bounty doubles if ${name} commits another crime in this jurisdiction.` };
}

export function escalateBounty(poster: WantedPoster): WantedPoster {
  const tiers: BountyTier[] = ['petty', 'notable', 'dangerous', 'infamous', 'legendary'];
  const idx = tiers.indexOf(poster.bountyTier);
  const newTier = tiers[Math.min(idx + 1, tiers.length - 1)];
  const range = TIER_AMOUNTS[newTier];
  return { ...poster, bountyTier: newTier, bountyAmount: Math.floor((range.min + range.max) / 2), bountyHunters: poster.bountyHunters + 2 };
}

export function getAllBountyTiers(): BountyTier[] {
  return ['petty', 'notable', 'dangerous', 'infamous', 'legendary'];
}

export function getAllCrimeCategories(): CrimeCategory[] {
  return CRIME_TEMPLATES.map((c) => c.crime);
}

export function formatWantedPoster(poster: WantedPoster): string {
  const tier = { petty: '🟢', notable: '🟡', dangerous: '🟠', infamous: '🔴', legendary: '💀' }[poster.bountyTier];
  const lines = [`${tier} **WANTED: ${poster.targetName}**${poster.alias ? ` aka ${poster.alias}` : ''}`];
  lines.push(`  Crime: ${poster.crimeDescription}`);
  lines.push(`  Bounty: ${poster.bountyAmount}gp (${poster.deadOrAlive}) — Issued by: ${poster.issuedBy}`);
  lines.push(`  Active hunters: ${poster.bountyHunters} | Tier: ${poster.bountyTier}`);
  return lines.join('\n');
}
