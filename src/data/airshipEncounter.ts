// Airship encounter table — sky-based encounters with altitude hazards and aerial combat.

export type AltitudeZone = 'low' | 'cruising' | 'high' | 'extreme';
export type SkyWeather = 'clear' | 'cloudy' | 'storm' | 'fog_bank' | 'crosswind' | 'lightning';

export interface AirshipEncounter {
  name: string;
  altitude: AltitudeZone;
  description: string;
  reaction: 'hostile' | 'neutral' | 'friendly';
  cr: string;
  mechanicalEffect: string;
  loot: string | null;
}

export interface AltitudeHazard {
  zone: AltitudeZone;
  hazards: { name: string; dc: number; effect: string }[];
  description: string;
}

const ENCOUNTERS: AirshipEncounter[] = [
  { name: 'Sky Pirates', altitude: 'cruising', description: 'A ramshackle airship flying a black flag banks toward you. Grappling hooks ready.', reaction: 'hostile', cr: 'CR 5 (captain) + 2d6 CR 1/2 pirates', mechanicalEffect: 'Boarding action in 2 rounds. Ship-to-ship combat rules apply.', loot: 'Pirate treasure chest: 300gp + navigation charts to a hidden sky island.' },
  { name: 'Dragon in Flight', altitude: 'high', description: 'A young dragon soars alongside, curious about the metal bird invading its territory.', reaction: 'neutral', cr: 'CR 7 (young dragon, type varies)', mechanicalEffect: 'Intimidation DC 15 to make it leave. If attacked, breath weapon hits the ship (hull damage).', loot: 'If befriended (Animal Handling DC 18): dragon scale (500gp component).' },
  { name: 'Cloud Giant Castle', altitude: 'extreme', description: 'A castle on a cloud bank. The giants wave you down — or are those threatening gestures?', reaction: 'neutral', cr: 'CR 9 (cloud giant) × 1d4', mechanicalEffect: 'Landing invitation. Refusal = boulder thrown at ship (4d10 bludgeoning). Giants trade exotic goods.', loot: 'Trade opportunity: giant-forged weapons (+1, large size), cloud wine (Fly for 1 hour).' },
  { name: 'Roc Nest', altitude: 'extreme', description: 'Enormous eggs in a nest the size of a barn, perched on a floating rock. The parent is nearby.', reaction: 'hostile', cr: 'CR 11 (Roc)', mechanicalEffect: 'Roc attacks if eggs approached. Can carry the entire airship in its talons.', loot: 'Roc egg (5,000gp to the right buyer, 10,000gp if hatched). Roc feathers (100gp each).' },
  { name: 'Floating Debris Field', altitude: 'cruising', description: 'Wreckage of another airship, scattered across a mile of sky. Bodies and cargo drift.', reaction: 'neutral', cr: 'N/A (environmental)', mechanicalEffect: 'Navigation DC 13 to avoid hull damage (2d10 bludgeoning). Investigation DC 14 to find cargo.', loot: 'Salvageable cargo: 1d4 × 50gp goods. Ship\'s log reveals what destroyed them.' },
  { name: 'Air Elemental Storm', altitude: 'high', description: 'A swirling vortex of living wind. It\'s not a storm — it\'s angry.', reaction: 'hostile', cr: 'CR 5 (air elemental) × 1d3', mechanicalEffect: 'Ship tossed 1d4 × 100ft in random direction per round. Crew DEX DC 14 or thrown overboard.', loot: null },
  { name: 'Merchant Zeppelin', altitude: 'low', description: 'A fat, slow trade balloon flying guild colors. They signal to dock and trade.', reaction: 'friendly', cr: 'N/A', mechanicalEffect: 'Full shop available at sky-premium prices (150% markup). Rare items in stock.', loot: 'Trade only. Has maps, potions, rations, and one random uncommon magic item.' },
  { name: 'Harpy Flock', altitude: 'low', description: 'A dozen harpies perch on a cliff face, singing. The crew starts drifting toward the rail.', reaction: 'hostile', cr: 'CR 1 × 2d6 harpies', mechanicalEffect: 'WIS DC 11 per crew member or charmed toward the edge. Charmed crew jump overboard.', loot: 'Harpy nest contains 150gp in stolen jewelry and a Potion of Flying.' },
];

const ALTITUDE_HAZARDS: AltitudeHazard[] = [
  { zone: 'low', hazards: [{ name: 'Tree Strike', dc: 12, effect: '2d6 bludgeoning to hull.' }, { name: 'Arrow Fire from Ground', dc: 14, effect: '1d6 piercing per round while over hostile territory.' }], description: 'Below 500ft. Risk of ground-based threats and terrain collision.' },
  { zone: 'cruising', hazards: [{ name: 'Crosswind Shear', dc: 13, effect: 'Ship pushed 100ft off course. Navigation check to correct.' }], description: '500-5,000ft. Standard travel altitude. Weather is the main concern.' },
  { zone: 'high', hazards: [{ name: 'Thin Air', dc: 12, effect: 'CON save each hour or gain 1 exhaustion.' }, { name: 'Ice Formation', dc: 14, effect: 'Ship speed halved. Controls stiffen.' }], description: '5,000-15,000ft. Cold and thin air. Equipment ices over.' },
  { zone: 'extreme', hazards: [{ name: 'Altitude Sickness', dc: 15, effect: 'CON save each 10 minutes or incapacitated.' }, { name: 'Hull Freeze', dc: 16, effect: 'Ship takes 1d10 cold damage per round to hull.' }], description: '15,000ft+. Near-lethal conditions without magic. Only desperate or powerful fly here.' },
];

export function getRandomAirEncounter(): AirshipEncounter {
  return ENCOUNTERS[Math.floor(Math.random() * ENCOUNTERS.length)];
}

export function getEncountersByAltitude(altitude: AltitudeZone): AirshipEncounter[] {
  return ENCOUNTERS.filter((e) => e.altitude === altitude);
}

export function getHazardsForAltitude(altitude: AltitudeZone): AltitudeHazard | undefined {
  return ALTITUDE_HAZARDS.find((h) => h.zone === altitude);
}

export function getHostileEncounters(): AirshipEncounter[] {
  return ENCOUNTERS.filter((e) => e.reaction === 'hostile');
}

export function getAllAltitudes(): AltitudeZone[] {
  return ALTITUDE_HAZARDS.map((h) => h.zone);
}

export function formatAirEncounter(enc: AirshipEncounter): string {
  const icon = { hostile: '⚔️', neutral: '❔', friendly: '💬' }[enc.reaction];
  return `${icon} **${enc.name}** *(${enc.altitude} altitude)*\n  *${enc.description}*\n  CR: ${enc.cr}\n  ⚙️ ${enc.mechanicalEffect}${enc.loot ? `\n  💰 ${enc.loot}` : ''}`;
}

export { ENCOUNTERS as AIRSHIP_ENCOUNTERS, ALTITUDE_HAZARDS };
