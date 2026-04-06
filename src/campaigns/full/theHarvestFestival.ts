import type { FullCampaign } from '../types';

export const theHarvestFestival: FullCampaign = {
  id: 'full-harvest-festival',
  type: 'full',
  title: 'The Harvest Festival',
  tagline: 'The best party of the year. The worst secret in the village. The longest night.',
  tone: 'horror',
  themes: ['horror', 'wilderness', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 7 },
  estimatedSessions: 12,
  settingSummary:
    'Willowmere\'s annual Harvest Festival is legendary — three days of feasting, games, and celebration. The party arrives as guests. Everything is warm, welcoming, and slightly too perfect. The food is too good. The people are too happy. And every year, someone goes missing on the third night. The villagers don\'t seem to remember.',
  hook: 'The party arrives at Willowmere for the festival. A cheerful elder greets them: "Welcome, welcome! The first night is the Feast of Plenty, the second is the Games of Harvest, and the third is the Night of Gratitude. We\'re so glad you\'re here." Behind her, a child whispers to the party: "Leave before the third night. Please."',
  twist:
    'The village made a pact with a fey entity 200 years ago: perfect harvests forever, in exchange for one soul per year on the Night of Gratitude. The village doesn\'t remember the pact consciously — the fey erases the memory each year. But their bodies remember: every villager avoids a specific clearing in the woods without knowing why. The child can see through the enchantment because she\'s this year\'s offering.',
  climax:
    'The third night. The fey comes to collect. The party must protect the child, break the pact, and deal with the consequences: without the pact, the harvest fails. 200 years of stored famine hits at once. The village must decide if they want the truth — and whether survival without the pact is possible.',
  acts: [
    {
      title: 'Act 1: The Feast',
      summary: 'Arrival, the first night\'s festivities, and the creeping wrongness. Everything is wonderful and something is off.',
      keyEvents: [
        'The Feast of Plenty: incredible food, warm hospitality, genuine joy',
        'The child\'s warning: "They don\'t know what they do. Every year, someone vanishes."',
        'Small oddities: the clearing nobody goes near, the song nobody remembers writing',
        'A historical anomaly: 200 years of perfect harvests in a region known for poor soil',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: The Games',
      summary: 'The second day. Festival games, deeper investigation, and the history of the pact. The party discovers the pattern.',
      keyEvents: [
        'Harvest Games: archery, wrestling, pie-eating — genuinely fun',
        'Investigation: the child leads the party to the clearing — a stone circle, hidden by brambles that MOVE',
        'The archives: every year, one resident is listed as "moved away." None of them are real.',
        'The fey\'s presence felt: eyes in the trees, whispers in the wind, the clearing glows at midnight',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Night',
      summary: 'The third night. The fey comes. The village walks toward the clearing in a trance. The party must break the cycle.',
      keyEvents: [
        'Midnight: every villager stands and walks toward the clearing, eyes closed, smiling',
        'The child is drawn by the pact — she\'s this year\'s offering',
        'The fey appears: beautiful, ancient, and offended that someone would break the arrangement',
        'Breaking the pact: confrontation, negotiation, or a third option the fey didn\'t anticipate',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Maren',
      role: 'village leader / unknowing participant',
      personality: 'A warm, grandmotherly figure who runs the festival with genuine love. She doesn\'t remember the pact. When she learns the truth, she breaks.',
      secret: 'Her own daughter was the offering 30 years ago. She listed her as "moved to the city." She has never visited.',
    },
    {
      name: 'Lira (age 10)',
      role: 'the offering / the party\'s moral compass',
      personality: 'A serious, frightened child who can see through the enchantment. She doesn\'t know why. She just knows she\'s supposed to "go to the clearing" and never come back.',
    },
    {
      name: 'The Greenmother',
      role: 'fey entity / antagonist',
      personality: 'A fey who considers the pact a fair trade. She is not evil by fey standards. "I give them 200 years of plenty. They give me one soul per year. The math favors them. You mortals are so ungrateful."',
    },
  ],
  keyLocations: [
    { name: 'Willowmere', description: 'A picturesque village that is too good to be true. The kind of place artists paint and travelers remember fondly.', significance: 'The setting for all three days.' },
    { name: 'The Clearing', description: 'A stone circle in the woods that nobody remembers going to. The brambles around it move to discourage visitors.', significance: 'Where the pact was made and the offerings are taken.' },
    { name: 'The Festival Grounds', description: 'The village common, decorated for the harvest. Lanterns, tables, music. The happiest place in the world, built on a lie.', significance: 'Where the first two days\' events take place.' },
  ],
  dataSystems: ['darkBargain', 'enchantedForest', 'festivalAdvanced', 'socialEncounter', 'hauntedLocation', 'backstoryComplication', 'cataclysmCountdown', 'dreamSequence', 'npcRelationshipWeb'],
};
