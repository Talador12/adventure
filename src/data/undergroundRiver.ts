// Underground river navigation — waterway traversal with current, rapids, and underwater encounters.

export type RiverSegmentType = 'calm' | 'rapids' | 'waterfall' | 'flooded_chamber' | 'underground_lake' | 'narrow_passage' | 'whirlpool';
export type RiverHazard = 'rocks' | 'current' | 'submerged_obstacle' | 'collapse' | 'creature' | 'toxic_gas' | 'none';

export interface RiverSegment {
  type: RiverSegmentType;
  name: string;
  description: string;
  length: string; // approximate
  difficulty: number; // DC for navigation
  hazards: { hazard: RiverHazard; dc: number; damage: string; description: string }[];
  encounter: string | null;
  treasure: string | null;
}

export interface RiverRoute {
  name: string;
  segments: RiverSegment[];
  totalLength: string;
  requiredEquipment: string[];
}

const SEGMENTS: RiverSegment[] = [
  {
    type: 'calm',
    name: 'The Glassway',
    description: 'The river flows smooth and slow here. Bioluminescent moss on the ceiling casts an eerie blue glow. The water is surprisingly clear.',
    length: '500 ft',
    difficulty: 8,
    hazards: [{ hazard: 'none', dc: 0, damage: '0', description: 'Safe passage.' }],
    encounter: null,
    treasure: 'A skeleton clutching a waterproof scroll case (Scroll of Water Breathing)',
  },
  {
    type: 'rapids',
    name: 'The Grinding Teeth',
    description: 'The tunnel narrows and the water picks up speed. Jagged stalagmites rise from the riverbed like teeth. The roar is deafening.',
    length: '200 ft',
    difficulty: 14,
    hazards: [
      { hazard: 'rocks', dc: 13, damage: '2d6 bludgeoning', description: 'Smash against jutting rocks.' },
      { hazard: 'current', dc: 14, damage: '1d6 bludgeoning', description: 'Sucked under by the current. CON save or begin drowning.' },
    ],
    encounter: null,
    treasure: null,
  },
  {
    type: 'waterfall',
    name: 'The Drop',
    description: 'The tunnel ends abruptly. A 40-foot waterfall plunges into a deep pool. The mist is thick enough to hide in.',
    length: '40 ft drop',
    difficulty: 15,
    hazards: [
      { hazard: 'submerged_obstacle', dc: 15, damage: '4d6 bludgeoning', description: 'Hidden rocks at the bottom of the pool.' },
    ],
    encounter: 'A water weird lurks in the pool, attacking anyone who falls in.',
    treasure: 'Behind the waterfall: a small cave with 50gp and a +1 dagger.',
  },
  {
    type: 'flooded_chamber',
    name: 'The Sunken Hall',
    description: 'A vast chamber, once a dwarven dining hall, now flooded to the ceiling with dark water. Air pockets exist between pillars.',
    length: '300 ft',
    difficulty: 13,
    hazards: [
      { hazard: 'submerged_obstacle', dc: 12, damage: '1d6 bludgeoning', description: 'Furniture and debris block the path.' },
      { hazard: 'creature', dc: 14, damage: '2d6 piercing', description: 'A giant crayfish defends its nest.' },
    ],
    encounter: 'Giant Crayfish (CR 1) — territorial, can be fed to pass peacefully (raw meat).',
    treasure: 'A dwarven strongbox (locked, DC 14) contains 200gp and a ring of swimming.',
  },
  {
    type: 'underground_lake',
    name: 'The Abyss',
    description: 'The river opens into an underground lake so vast the far shore is invisible. The water is perfectly still and unnervingly deep.',
    length: '1,000 ft across',
    difficulty: 12,
    hazards: [
      { hazard: 'creature', dc: 16, damage: '3d8 bludgeoning', description: 'Something massive moves beneath the surface.' },
    ],
    encounter: 'An aboleth lurks in the depths. Does not attack unless provoked — prefers to implant suggestions.',
    treasure: 'An island in the center holds a shrine with a Cloak of the Manta Ray.',
  },
  {
    type: 'narrow_passage',
    name: 'The Squeeze',
    description: 'The river forces through a crack barely wide enough for a person. You must swim through in complete darkness. Claustrophobia is the real enemy.',
    length: '100 ft',
    difficulty: 14,
    hazards: [
      { hazard: 'collapse', dc: 13, damage: '3d6 bludgeoning', description: 'The passage shifts. Rocks fall.' },
      { hazard: 'toxic_gas', dc: 12, damage: '2d4 poison', description: 'Gas pocket released by disturbance.' },
    ],
    encounter: null,
    treasure: null,
  },
  {
    type: 'whirlpool',
    name: 'The Drain',
    description: 'A whirlpool churns in a circular chamber. Three exits, only one is safe. The water pulls everything toward the center.',
    length: '60 ft diameter',
    difficulty: 16,
    hazards: [
      { hazard: 'current', dc: 16, damage: '3d6 bludgeoning + drowning', description: 'Pulled to the center and dragged under.' },
    ],
    encounter: null,
    treasure: 'Debris caught in the whirlpool includes 75gp, a gemstone (50gp), and a waterlogged journal.',
  },
];

const ROUTES: RiverRoute[] = [
  {
    name: 'The Shallow Run',
    segments: [SEGMENTS[0], SEGMENTS[1], SEGMENTS[5]],
    totalLength: '800 ft',
    requiredEquipment: ['Rope', 'Light source (waterproof)', 'Swim proficiency recommended'],
  },
  {
    name: 'The Deep Dive',
    segments: [SEGMENTS[0], SEGMENTS[3], SEGMENTS[4], SEGMENTS[6]],
    totalLength: '1,860 ft',
    requiredEquipment: ['Water Breathing (spell or potion)', 'Waterproof containers', 'Rope', 'Light source'],
  },
  {
    name: 'The Plunge',
    segments: [SEGMENTS[1], SEGMENTS[2], SEGMENTS[5], SEGMENTS[6]],
    totalLength: '400 ft',
    requiredEquipment: ['Feather Fall or willingness to take 4d6', 'Rope', 'Grappling hook', 'Light source'],
  },
];

export function getRandomSegment(): RiverSegment {
  return SEGMENTS[Math.floor(Math.random() * SEGMENTS.length)];
}

export function getSegmentsByType(type: RiverSegmentType): RiverSegment[] {
  return SEGMENTS.filter((s) => s.type === type);
}

export function getRoute(name: string): RiverRoute | undefined {
  return ROUTES.find((r) => r.name === name);
}

export function getAllRoutes(): RiverRoute[] {
  return ROUTES;
}

export function getSegmentsWithTreasure(): RiverSegment[] {
  return SEGMENTS.filter((s) => s.treasure !== null);
}

export function getSegmentsWithEncounters(): RiverSegment[] {
  return SEGMENTS.filter((s) => s.encounter !== null);
}

export function formatSegment(segment: RiverSegment): string {
  const icon = { calm: '🌊', rapids: '💥', waterfall: '🏔️', flooded_chamber: '🏛️', underground_lake: '🌑', narrow_passage: '🕳️', whirlpool: '🌀' }[segment.type];
  const lines = [`${icon} **${segment.name}** *(${segment.type.replace(/_/g, ' ')})* — ${segment.length}`];
  lines.push(`  *${segment.description}*`);
  lines.push(`  Navigation DC: ${segment.difficulty}`);
  segment.hazards.forEach((h) => {
    if (h.hazard !== 'none') lines.push(`  ⚠️ ${h.hazard.replace(/_/g, ' ')}: DC ${h.dc} — ${h.damage} — ${h.description}`);
  });
  if (segment.encounter) lines.push(`  🐉 Encounter: ${segment.encounter}`);
  if (segment.treasure) lines.push(`  💰 Treasure: ${segment.treasure}`);
  return lines.join('\n');
}

export function formatRoute(route: RiverRoute): string {
  const lines = [`🗺️ **${route.name}** (${route.totalLength})`];
  lines.push(`  Equipment: ${route.requiredEquipment.join(', ')}`);
  lines.push(`  Segments: ${route.segments.map((s) => s.name).join(' → ')}`);
  return lines.join('\n');
}

export { SEGMENTS as RIVER_SEGMENTS, ROUTES as RIVER_ROUTES };
