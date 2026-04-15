import type { FullCampaign } from '../types';

export const theRiverWithoutEnd: FullCampaign = {
  id: 'full-river-without-end',
  type: 'full',
  title: 'The River Without End',
  tagline: 'It flows through every biome, reaches no sea, and separates two realities.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness', 'planar'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 18,
  settingSummary:
    'The Endless River flows in a vast circle. It passes through forests, deserts, tundra, and jungles without ever reaching the sea. Scholars have debated it for centuries. The party is hired by a natural philosopher to follow it and find out why. Every few days of travel, the biome changes completely — as if they are walking through different continents stitched together by a single waterway.',
  hook: 'Professor Lira Ashdown has spent thirty years studying the Endless River from her university. She has one question: where does it go? She hires the party as field researchers. "Follow the current. Map what you see. Do not cross the river until I say so." She is very specific about that last instruction and will not explain why.',
  twist:
    'The river is not a natural feature. It is a boundary spell cast during an ancient war, separating two realities that overlap in the same physical space. Walking along the river is safe — you stay in your reality. Crossing it puts you in the other reality. Both realities think theirs is the real one. The biome changes happen because the two realities have different climates in the same locations. Professor Ashdown knows this. She crossed once, years ago, and lost someone on the other side.',
  climax:
    'The boundary spell is weakening. The two realities are bleeding into each other at the seams — creatures from one side appearing on the other, weather mixing, people seeing ghosts of their counterparts. The party must find the spell\'s anchor point and decide: reinforce the boundary (keeping the realities apart forever), dissolve it (merging two worlds into one, with catastrophic overlap), or replace it with a bridge that allows controlled passage.',
  acts: [
    {
      title: 'Act 1: Following the Current',
      summary:
        'The party travels along the river, documenting biome changes and encountering communities that live on its banks. Each settlement has different theories about why the river circles. Nobody has crossed it and come back the same.',
      keyEvents: [
        'Departure from the university town with Professor Ashdown\'s instructions',
        'First biome shift: forest to desert in a single day of travel along the bank',
        'A fishing village where the fishermen cast nets into the river but never wade in',
        'A tundra settlement where elders warn: "The other side is not the other bank"',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Other Side',
      summary:
        'The party crosses the river (intentionally or accidentally) and discovers the second reality. Same geography, different world. Different people, different history, different sky. Getting back is not as simple as crossing again.',
      keyEvents: [
        'First crossing: stepping into ankle-deep water and emerging on a bank that should not exist',
        'The mirror world: familiar landmarks twisted — a forest where the desert was, a city where there was wilderness',
        'Meeting counterparts: people who know of the party\'s reality as "the other side"',
        'The return problem: crossing back requires finding a thin point where the spell is weakest',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Seam',
      summary:
        'The boundary spell is failing. Both realities bleed together. The party must find the anchor and choose what happens when two worlds stop being separate.',
      keyEvents: [
        'Reality bleed: creatures and weather from both sides mixing, causing chaos',
        'The anchor point: a stone circle at the river\'s origin, where the spell was first cast',
        'Professor Ashdown\'s secret: she crossed years ago and her partner is still on the other side',
        'The choice: reinforce, dissolve, or bridge',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Professor Lira Ashdown',
      role: 'patron / quest giver',
      personality:
        'Wears her late partner\'s compass on a chain around her neck. Touches it when she is lying, which is how the party eventually catches her. Warm, brilliant, and evasive in a way that feels like protection rather than deception. Panics visibly — goes pale, grips the compass — when the party mentions crossing the river. "Follow the current. Map what you see. Do not cross the river until I say so." She will not explain why. She cannot explain without crying.',
      secret: 'She crossed the river twenty years ago with her partner, Daven. He is still on the other side. She hired the party to find a way to bring him back.',
    },
    {
      name: 'Daven Ashdown',
      role: 'lost ally (other reality)',
      personality:
        'Lira\'s partner, stranded in the other reality for two decades. He has built a life there but never stopped trying to return. Older, weathered, and wiser than the person Lira remembers.',
    },
    {
      name: 'The Riverkeeper',
      role: 'ancient guardian',
      personality:
        'A spirit bound to the river\'s anchor point. It does not care about either reality — it cares about the spell holding. Speaks in riddles, thinks in centuries. Growing weaker as the spell fades.',
    },
  ],
  keyLocations: [
    {
      name: 'The Endless River',
      description: 'A river that flows in a vast circle through every biome imaginable. The water is always cold, always clear, and always flowing left to right.',
      significance: 'The central feature of the campaign and the boundary between realities.',
    },
    {
      name: 'The Mirror Side',
      description: 'The other reality — same landmass, different everything else. Forests where deserts should be. Cities where there was wilderness. A second sky with unfamiliar stars.',
      significance: 'The second half of the world the party must navigate.',
    },
    {
      name: 'The Stone Circle',
      description: 'The river\'s source and the anchor point of the boundary spell. Ancient, crumbling, humming with fading magic.',
      significance: 'Where the final choice is made.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'randomBiome',
    'weatherProgression',
    'magicalAnomaly',
    'ancientRuins',
    'npcSchedule',
    'diplomaticNegotiation',
    'monsterEcology',
  ],
};
