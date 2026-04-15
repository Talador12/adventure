import type { FullCampaign } from '../types';

export const theForgottenRoad: FullCampaign = {
  id: 'full-forgotten-road',
  type: 'full',
  title: 'The Forgotten Road',
  tagline: 'There\'s a road on no map. It goes somewhere that doesn\'t exist. Walk it anyway.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 16,
  settingSummary:
    'A road appears overnight in the wilderness — cobblestone, ancient, perfectly maintained, and on no map. It stretches in both directions to the horizon. Animals won\'t cross it. Birds won\'t fly over it. People who walk it say the landscape changes subtly — the trees are older, the stars are different, and sometimes you can see buildings that aren\'t there in the morning.',
  hook: 'A cartographer hires the party to map the road. She\'s walked it for three days and the world changed around her — the forest became a jungle, the sky had two moons, and a city appeared on the horizon that vanished at dawn. "I need adventurers, not mapmakers. Something is at the end of this road, and I need to know what."',
  twist:
    'The road is a ley line — a literal path between realities. Each day of walking shifts the travelers slightly between parallel worlds. The road was built by an ancient civilization that traveled between realities for trade. The city that appears and vanishes is their capital — existing in all realities simultaneously. It\'s still inhabited, and they\'ve been waiting for surface-worlders to rediscover the road.',
  climax:
    'The party reaches the crossroads city of Nexus — a metropolis existing across multiple realities at once. The civilization that built it is dying because the road is fading, cutting off trade between worlds. They need the party to reignite the ley line network by walking specific paths in specific sequences — a quest across parallel realities.',
  acts: [
    {
      title: 'Act 1: The Road Appears',
      summary:
        'Discovering the road, walking it, and experiencing the first reality shifts. The world changes gradually — flora, fauna, sky, and eventually the very laws of physics.',
      keyEvents: [
        'The cartographer\'s briefing and the first steps onto the road',
        'Day 1: subtle changes — the trees are slightly different species',
        'Day 3: major shift — two moons, different constellations, unfamiliar animals',
        'First encounter with a traveler from another reality — equally surprised',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Between Worlds',
      summary:
        'The party navigates multiple parallel realities accessible from the road. Each reality is a variant of their world — some better, some worse, some alien.',
      keyEvents: [
        'A reality where magic never existed — technology fills the gap',
        'A reality where the dragon apocalypse happened — ruins and survivors',
        'A reality where elves are the dominant species and humans are rare',
        'Breadcrumbs of the road-builder civilization in every reality',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Nexus',
      summary:
        'The crossroads city. A dying civilization. A quest to reignite the ley line network by walking reality-paths in the right sequence.',
      keyEvents: [
        'Arrival at Nexus — a city that exists in all realities simultaneously',
        'The Pathkeepers explain: the network is dying, realities are drifting apart',
        'The reignition quest: walk three paths in three realities in the right order',
        'The final path: the party must walk a road through a reality that\'s trying to collapse',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Mira Koss',
      role: 'cartographer / quest giver',
      personality:
        'Always holds a compass, even indoors. Turns to face north before speaking, a tic she does not notice. Gets physically uncomfortable when lost — scratches her arms, breathes faster, narrows her eyes. "A road that is not on a map is a personal insult. I have been insulted. I intend to correct the record."',
      secret: 'She\'s walked the road before — as a child. She remembers another world. She\'s been searching for the road for thirty years.',
    },
    {
      name: 'Pathkeeper Solenne',
      role: 'Nexus guide / ally',
      personality:
        'A member of the road-builder civilization — human-adjacent, with eyes that shimmer between realities. Calm, ancient, and grieving for a civilization she can\'t save alone.',
    },
    {
      name: 'The Mirror Walker',
      role: 'antagonist',
      personality:
        'A version of the party from a collapsed reality — they walked the road too late and their world died. Now they want to collapse all realities into one that they can control. They are everything the party could become if they fail.',
    },
    {
      name: 'Drift (the road\'s echo)',
      role: 'guide / environmental',
      personality:
        'The road itself has a faint awareness — it communicates through landmarks, weather patterns, and the direction of the wind. It wants to be walked. It misses the travelers.',
    },
  ],
  keyLocations: [
    {
      name: 'The Forgotten Road',
      description: 'Ancient cobblestone stretching between realities. Perfectly maintained by magic that\'s slowly dying.',
      significance: 'The primary setting — walking the road IS the adventure.',
    },
    {
      name: 'Variant Realities',
      description: 'Parallel worlds accessible from the road — each a different version of the party\'s world.',
      significance: 'Exploration environments for Act 2.',
    },
    {
      name: 'Nexus',
      description: 'A city that exists across all realities simultaneously. Buildings phase between architectural styles. People from a hundred worlds walk the same streets.',
      significance: 'The destination and the civilization that needs saving.',
    },
  ],
  dataSystems: [
    'pocketDimension',
    'travelEncounters',
    'weatherProgression',
    'wildernessLandmarks',
    'magicalAnomaly',
    'planarRift',
    'timeNarrator',
    'mapDescriptor',
    'locationNameGenerator',
  ],
};
