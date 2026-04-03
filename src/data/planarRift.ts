// Planar rift generator — random portals to other planes with environmental effects.

export type PlaneType = 'feywild' | 'shadowfell' | 'elemental_fire' | 'elemental_water' | 'elemental_air' | 'elemental_earth' | 'abyss' | 'celestial' | 'astral' | 'ethereal';

export interface PlanarRift {
  plane: PlaneType;
  name: string;
  description: string;
  environmentalEffects: string[];
  creatureRisk: string;
  duration: string;
  closingCondition: string;
  dcToClose: number;
}

const RIFTS: PlanarRift[] = [
  {
    plane: 'feywild',
    name: 'Shimmering Veil',
    description: 'A curtain of iridescent light ripples in the air. Flowers bloom where it touches the ground. Time feels... slippery.',
    environmentalEffects: ['Time passes differently (1 hour here = 1d6 hours in Feywild)', 'All Charisma checks have advantage within 30ft', 'Wild magic surges on any spell cast within 60ft (d20, surge on 1-3)'],
    creatureRisk: 'Pixies, satyrs, or a displacer beast may wander through.',
    duration: '1d4 hours',
    closingCondition: 'Play music that makes a fey creature cry, or Arcana DC 16.',
    dcToClose: 16,
  },
  {
    plane: 'shadowfell',
    name: 'Shadow Tear',
    description: 'A jagged wound in reality leaks inky darkness. Colors fade within 30 feet. The air tastes of ash and despair.',
    environmentalEffects: ['Dim light in 60ft radius regardless of other sources', 'Healing spells only restore half their normal amount', 'WIS save DC 12 each hour or gain 1 level of despair (like exhaustion)'],
    creatureRisk: 'Shadow, specter, or a sorrowsworn may emerge.',
    duration: '2d4 hours',
    closingCondition: 'An act of genuine selfless joy, or Religion DC 17.',
    dcToClose: 17,
  },
  {
    plane: 'elemental_fire',
    name: 'Infernal Fissure',
    description: 'A crack in the ground belches flame and sulfurous smoke. The temperature spikes unbearably within 20 feet.',
    environmentalEffects: ['2d6 fire damage per round within 10ft of the rift', 'All water within 30ft evaporates instantly', 'Fire spells deal +1d6 damage within 60ft'],
    creatureRisk: 'Fire elemental, magmin, or salamander.',
    duration: '1d6 hours',
    closingCondition: 'Quench with 100+ gallons of water, or Arcana DC 15.',
    dcToClose: 15,
  },
  {
    plane: 'elemental_water',
    name: 'Tidal Breach',
    description: 'A swirling vortex of saltwater hangs in midair, dripping constantly. The air is thick with mist and the roar of waves.',
    environmentalEffects: ['Area within 30ft becomes difficult terrain (flooded)', 'Ranged attacks through the mist have disadvantage', 'Cold damage +1d4 from hypothermia risk'],
    creatureRisk: 'Water elemental, merrow, or water weird.',
    duration: '1d4 hours',
    closingCondition: 'Evaporate with extreme heat, or Nature DC 14.',
    dcToClose: 14,
  },
  {
    plane: 'elemental_air',
    name: 'Howling Gyre',
    description: 'A spinning column of wind reaches from ground to sky. Loose objects orbit it. Speaking is nearly impossible.',
    environmentalEffects: ['STR DC 13 to move within 20ft without being pushed 10ft', 'Ranged projectiles deflected — disadvantage on ranged attacks', 'Creatures under 100lbs must save or be lifted 10ft each round'],
    creatureRisk: 'Air elemental, djinni, or aarakocra.',
    duration: '2d6 hours',
    closingCondition: 'Create a vacuum or perfect stillness, or Arcana DC 14.',
    dcToClose: 14,
  },
  {
    plane: 'elemental_earth',
    name: 'Stone Bloom',
    description: 'Crystals and stone pillars grow from the ground at unnatural speed. The earth groans and shifts beneath your feet.',
    environmentalEffects: ['New difficult terrain appears each round (crystal growth)', 'Tremorsense within 30ft for all creatures touching the ground', 'Bludgeoning damage from erupting crystals — DEX DC 12 or 2d6'],
    creatureRisk: 'Earth elemental, galeb duhr, or xorn.',
    duration: '1d4 hours',
    closingCondition: 'Shatter the central crystal (AC 17, HP 40), or Nature DC 15.',
    dcToClose: 15,
  },
  {
    plane: 'abyss',
    name: 'Demon Gate',
    description: 'A churning portal of red-black energy screams with the voices of the damned. Reality buckles around it. Everything feels wrong.',
    environmentalEffects: ['All creatures within 30ft make WIS DC 14 or frightened each round', 'Necrotic damage aura: 1d6 per round within 10ft', 'Fiends within 60ft have advantage on attacks'],
    creatureRisk: 'Dretch, quasit, shadow demon, or worse.',
    duration: '1d8 hours (growing stronger)',
    closingCondition: 'Holy water + Dispel Evil and Good, or Religion DC 18.',
    dcToClose: 18,
  },
  {
    plane: 'celestial',
    name: 'Radiant Fount',
    description: 'A column of warm golden light pours from an unseen source. The scent of incense fills the air. Wounds close slightly near it.',
    environmentalEffects: ['All healing within 30ft is maximized', 'Undead and fiends take 2d6 radiant damage per round within 20ft', 'Advantage on death saving throws within 60ft'],
    creatureRisk: 'Deva, couatl, or a celestial messenger with a task.',
    duration: '1d4 hours',
    closingCondition: 'Closes naturally, or can be maintained with Prayer (Religion DC 12).',
    dcToClose: 12,
  },
  {
    plane: 'astral',
    name: 'Silver Void',
    description: 'A silver-white pool floats at eye level. Looking into it, you see stars that don\'t match your sky. Gravity feels lighter.',
    environmentalEffects: ['Time stops aging within 30ft', 'Movement speed doubled (low gravity)', 'Psychic damage +1d4 from astral interference on concentration checks'],
    creatureRisk: 'Githyanki scout, astral dreadnought tendril, or a lost traveler.',
    duration: '3d6 hours',
    closingCondition: 'The rift closes when all nearby creatures stop thinking about it (Meditation DC 16).',
    dcToClose: 16,
  },
  {
    plane: 'ethereal',
    name: 'Ghost Veil',
    description: 'Reality becomes translucent. You can see ghostly shapes of another layer — furniture, creatures, buildings that aren\'t here.',
    environmentalEffects: ['Incorporeal creatures can manifest freely within 30ft', 'Advantage on Perception checks to spot invisible creatures', 'Non-magical weapons pass through creatures 25% of the time (d4, miss on 1)'],
    creatureRisk: 'Ghost, phase spider, or night hag.',
    duration: '2d4 hours',
    closingCondition: 'Remove Curse on the anchor point, or Arcana DC 15.',
    dcToClose: 15,
  },
];

export function getRandomRift(): PlanarRift {
  return RIFTS[Math.floor(Math.random() * RIFTS.length)];
}

export function getRiftByPlane(plane: PlaneType): PlanarRift | undefined {
  return RIFTS.find((r) => r.plane === plane);
}

export function getAllPlanes(): PlaneType[] {
  return RIFTS.map((r) => r.plane);
}

export function formatRift(rift: PlanarRift): string {
  const icon = { feywild: '🌸', shadowfell: '🌑', elemental_fire: '🔥', elemental_water: '🌊', elemental_air: '💨', elemental_earth: '🪨', abyss: '👹', celestial: '✨', astral: '🌌', ethereal: '👻' }[rift.plane];
  const lines = [`${icon} **${rift.name}** *(${rift.plane.replace(/_/g, ' ')})*`];
  lines.push(`  *${rift.description}*`);
  lines.push('  **Effects:**');
  rift.environmentalEffects.forEach((e) => lines.push(`    • ${e}`));
  lines.push(`  **Creature risk:** ${rift.creatureRisk}`);
  lines.push(`  **Duration:** ${rift.duration}`);
  lines.push(`  **To close:** ${rift.closingCondition}`);
  return lines.join('\n');
}
