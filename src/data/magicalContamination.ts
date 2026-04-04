// Magical contamination zones — areas where spilled magic has lasting environmental effects.

export type ContaminationType = 'arcane_fallout' | 'necrotic_blight' | 'fey_overgrowth' | 'elemental_saturation' | 'psychic_residue';

export interface ContaminationZone {
  name: string;
  type: ContaminationType;
  cause: string;
  radius: string;
  effects: string[];
  creaturesMutated: string;
  harvestable: string | null;
  cleanupMethod: string;
  cleanupDC: number;
  timeToNaturalDecay: string;
}

const ZONES: ContaminationZone[] = [
  { name: 'The Shimmering Scar', type: 'arcane_fallout', cause: 'A wizard duel that ended with both casters detonating their entire spell slot reserves simultaneously.', radius: '500ft', effects: ['All spells cast in the zone trigger a wild magic surge.', 'Magic items glow constantly (stealth impossible while carrying them).', 'Cantrips produce 10× visual effects (a Firebolt looks like a meteor).', 'Long rests restore double spell slots (the ambient magic recharges you).'], creaturesMutated: 'Local wildlife has minor magical abilities. Squirrels cast Prestidigitation. Deer have Shield. Wolves have Pack Tactics AND Misty Step.', harvestable: 'Arcane crystals grow from the ground (50gp each, 2d6 found per hour of searching).', cleanupMethod: 'Cast Dispel Magic at 7th level at the epicenter, or wait.', cleanupDC: 17, timeToNaturalDecay: '1d4 years' },
  { name: 'The Bone Garden', type: 'necrotic_blight', cause: 'A lich was destroyed here but its phylactery wasn\'t. The death energy seeped into the soil.', radius: '1 mile', effects: ['Plants grow but are skeletal — leaves of bone, flowers of teeth.', 'Healing magic heals half. Necrotic damage heals undead at double rate.', 'Corpses buried here rise in 1d4 days. Always. The cemetery is migrating.', 'Living creatures feel cold and melancholy. WIS DC 12 per hour or -1 morale.'], creaturesMutated: 'Undead plants. Bone-trees that grapple. Flower-skulls that scream. A vegetable garden that fights back.', harvestable: 'Death Blossoms (component for necromancy spells, 100gp each, Nature DC 14 to safely harvest).', cleanupMethod: 'Find and destroy the lich\'s phylactery (hidden somewhere in the zone). Or consecrate the entire area (Religion DC 18, 1 week continuous prayer).', cleanupDC: 18, timeToNaturalDecay: 'Never (self-sustaining while phylactery exists)' },
  { name: 'The Laughing Meadow', type: 'fey_overgrowth', cause: 'A portal to the Feywild was left open for 3 months. The meadow is now more Feywild than Material.', radius: '2 miles', effects: ['Everything is colorful. Painfully colorful. CHA DC 10 or break into spontaneous song.', 'Time passes at 2× speed inside. 1 hour = 2 hours outside.', 'Food found here tastes incredible but has a 25% chance of a random potion effect.', 'Compulsive honesty. CHA DC 13 or cannot tell lies while in the zone.'], creaturesMutated: 'Regular animals with fey traits. A fox that speaks in riddles. Rabbits that teleport. A bear that offers unsolicited life advice.', harvestable: 'Fey Pollen (component for enchantment spells, 75gp per dose, 1d4 doses found per hour).', cleanupMethod: 'Close the portal (Arcana DC 15) and wait for the Feywild energy to dissipate. The bear may object.', cleanupDC: 15, timeToNaturalDecay: '1d6 months after portal closes' },
];

export function getRandomZone(): ContaminationZone { return ZONES[Math.floor(Math.random() * ZONES.length)]; }
export function getZonesByType(type: ContaminationType): ContaminationZone[] { return ZONES.filter((z) => z.type === type); }
export function getHarvestableZones(): ContaminationZone[] { return ZONES.filter((z) => z.harvestable !== null); }
export function getAllContaminationTypes(): ContaminationType[] { return [...new Set(ZONES.map((z) => z.type))]; }
export function formatZone(zone: ContaminationZone): string {
  const lines = [`☢️ **${zone.name}** *(${zone.type.replace(/_/g, ' ')}, ${zone.radius})*`];
  lines.push(`  Cause: ${zone.cause}`); zone.effects.forEach((e) => lines.push(`  ⚡ ${e}`));
  lines.push(`  🧬 Mutations: ${zone.creaturesMutated}`);
  if (zone.harvestable) lines.push(`  💎 Harvest: ${zone.harvestable}`);
  lines.push(`  🧹 Cleanup: ${zone.cleanupMethod} (DC ${zone.cleanupDC}) | Natural decay: ${zone.timeToNaturalDecay}`);
  return lines.join('\n');
}
export { ZONES as CONTAMINATION_ZONES };
