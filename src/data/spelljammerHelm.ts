// Spelljammer helm system — astral ship navigation with gravity planes and phlogiston hazards.

export type SpaceRegion = 'wildspace' | 'astral_sea' | 'phlogiston' | 'crystal_sphere' | 'asteroid_field' | 'nebula';
export type HelmType = 'minor' | 'major' | 'artifact' | 'lifejammer' | 'series';

export interface SpelljammerHelm {
  type: HelmType;
  name: string;
  speedMultiplier: number; // × spell level for tactical speed
  spellSlotCost: string; // what it drains
  specialAbility: string;
  risk: string;
  value: number;
}

export interface SpaceHazard {
  name: string;
  region: SpaceRegion;
  dc: number;
  damage: string;
  description: string;
  avoidance: string;
}

export interface SpaceEncounter {
  name: string;
  region: SpaceRegion;
  description: string;
  reaction: string;
  cr: string;
}

const HELMS: SpelljammerHelm[] = [
  { type: 'minor', name: 'Minor Spelljamming Helm', speedMultiplier: 1, spellSlotCost: 'Highest remaining spell slot (minimum 1st)', specialAbility: 'Basic navigation. Ship moves at spell level × 10 mph in wildspace.', risk: 'Exhaustion after 12 hours of piloting.', value: 25000 },
  { type: 'major', name: 'Major Spelljamming Helm', speedMultiplier: 2, spellSlotCost: 'Highest remaining spell slot (minimum 1st)', specialAbility: 'Double speed. Advantage on navigation checks. Can detect objects within 1 mile.', risk: 'Exhaustion after 16 hours.', value: 100000 },
  { type: 'artifact', name: 'Helm of the Astral Sovereign', speedMultiplier: 3, spellSlotCost: 'No spell slot cost — powered by the pilot\'s life force (1 HP per hour)', specialAbility: 'Triple speed. Can plane shift the entire ship once per day. Telepathic link with all crew.', risk: 'HP drain cannot be healed while piloting. At 0 HP, pilot merges with the ship permanently.', value: 500000 },
  { type: 'lifejammer', name: 'Lifejammer Helm', speedMultiplier: 2, spellSlotCost: 'Drains life force from a captive creature (1d4 HP per hour)', specialAbility: 'Does not require a spellcaster. Any creature can be drained. Ship moves at victim\'s CR × 5 mph.', risk: 'Evil act. Victim dies when HP reaches 0. Ship stops when no victim available.', value: 50000 },
  { type: 'series', name: 'Series Helm (linked pair)', speedMultiplier: 1, spellSlotCost: 'Split across 2 pilots (half slot each)', specialAbility: 'Two pilots share the load. Each can rest while the other drives. 24-hour continuous travel possible.', risk: 'If one pilot is incapacitated, the other takes full drain. Psychic link can transmit pain.', value: 75000 },
];

const HAZARDS: SpaceHazard[] = [
  { name: 'Phlogiston Fire Storm', region: 'phlogiston', dc: 15, damage: '6d10 fire', description: 'The flammable phlogiston ignites in a chain reaction. Everything burns.', avoidance: 'No open flames! Douse all lights. DEX save to steer around.' },
  { name: 'Gravity Shear', region: 'wildspace', dc: 14, damage: '4d6 bludgeoning to all crew', description: 'Overlapping gravity planes tear at the ship. Everything not secured flies.', avoidance: 'Intelligence (Nature) DC 14 to detect and navigate around.' },
  { name: 'Astral Cyclone', region: 'astral_sea', dc: 16, damage: 'Ship displaced 1d100 miles in random direction', description: 'A vortex of psychic energy spins the ship through the astral plane.', avoidance: 'WIS save for the helmsman. Failure = lost for 1d4 days.' },
  { name: 'Crystal Sphere Barrier', region: 'crystal_sphere', dc: 17, damage: '8d6 force (to ship hull)', description: 'The invisible barrier between wildspace and phlogiston. Must find a portal or force through.', avoidance: 'Locate portal (Investigation DC 15) or force passage (helmsman expends 5th+ level slot).' },
  { name: 'Asteroid Storm', region: 'asteroid_field', dc: 13, damage: '3d10 bludgeoning per round', description: 'Spinning rocks of all sizes. Some as big as houses.', avoidance: 'DEX-based piloting checks each round. 3 successes = safe passage.' },
  { name: 'Dead Magic Zone', region: 'nebula', dc: 0, damage: 'Ship stops (no magic = no helm)', description: 'A zone where magic simply ceases to function. The helm dies.', avoidance: 'Cannot be avoided once entered. Must drift out (1d6 hours) or use non-magical propulsion.' },
  { name: 'Neogi Ambush', region: 'asteroid_field', dc: 15, damage: 'Boarding action (CR 6 encounter)', description: 'Spider-like slavers hiding behind asteroids. They want your crew.', avoidance: 'Perception DC 15 to spot before they close distance.' },
];

const ENCOUNTERS: SpaceEncounter[] = [
  { name: 'Githyanki Patrol', region: 'astral_sea', description: 'A silver longship crewed by githyanki warriors. They hail your vessel.', reaction: 'Hostile to illithids, neutral to others. May demand tribute (100gp) or passage tax.', cr: 'CR 8 (3 gith warriors + 1 gith knight)' },
  { name: 'Space Whale', region: 'wildspace', description: 'An enormous creature glides silently past. Its eye is the size of your ship.', reaction: 'Passive. Will not attack unless provoked. Presence disrupts gravity for 1 round.', cr: 'CR 15 (but non-hostile)' },
  { name: 'Trading Galleon', region: 'wildspace', description: 'A merchant spelljammer from a distant sphere. They signal to trade.', reaction: 'Friendly. Sells exotic goods at 200% markup (rare items unavailable elsewhere).', cr: 'N/A (non-combat)' },
  { name: 'Illithid Nautiloid', region: 'astral_sea', description: 'A massive squid-shaped vessel. It\'s turning toward you.', reaction: 'Hostile. Will attempt to board and capture crew for ceremorphosis.', cr: 'CR 12 (2 mind flayers + 8 thralls + ship weapons)' },
  { name: 'Debris Field', region: 'asteroid_field', description: 'The remains of a battle. Shattered ships, floating cargo, and bodies.', reaction: 'No threat — but salvage opportunity. Investigation DC 14 for useful cargo.', cr: 'N/A (environmental)' },
];

export function getHelmByType(type: HelmType): SpelljammerHelm | undefined {
  return HELMS.find((h) => h.type === type);
}

export function getAllHelmTypes(): HelmType[] {
  return HELMS.map((h) => h.type);
}

export function getHazardsByRegion(region: SpaceRegion): SpaceHazard[] {
  return HAZARDS.filter((h) => h.region === region);
}

export function getEncountersByRegion(region: SpaceRegion): SpaceEncounter[] {
  return ENCOUNTERS.filter((e) => e.region === region);
}

export function getAllRegions(): SpaceRegion[] {
  return [...new Set([...HAZARDS.map((h) => h.region), ...ENCOUNTERS.map((e) => e.region)])];
}

export function calculateTravelTime(distance: number, helmType: HelmType, spellLevel: number): number {
  const helm = getHelmByType(helmType);
  if (!helm) return Infinity;
  const speed = spellLevel * 10 * helm.speedMultiplier; // mph
  return Math.ceil(distance / speed);
}

export function formatHelm(helm: SpelljammerHelm): string {
  const icon = { minor: '🔵', major: '🟣', artifact: '🟡', lifejammer: '🔴', series: '🔗' }[helm.type];
  const lines = [`${icon} **${helm.name}** (×${helm.speedMultiplier} speed)`];
  lines.push(`  Cost: ${helm.spellSlotCost}`);
  lines.push(`  ⚙️ ${helm.specialAbility}`);
  lines.push(`  ⚠️ ${helm.risk}`);
  lines.push(`  💰 Value: ${helm.value.toLocaleString()}gp`);
  return lines.join('\n');
}

export function formatHazard(hazard: SpaceHazard): string {
  return `☄️ **${hazard.name}** (${hazard.region.replace(/_/g, ' ')}) DC ${hazard.dc}\n  *${hazard.description}*\n  Damage: ${hazard.damage}\n  Avoid: ${hazard.avoidance}`;
}

export { HELMS, HAZARDS as SPACE_HAZARDS, ENCOUNTERS as SPACE_ENCOUNTERS };
