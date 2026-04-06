import type { FullCampaign } from '../types';

export const theGardenAtWorldsEnd: FullCampaign = {
  id: 'full-garden-worlds-end',
  type: 'full',
  title: 'The Garden at World\'s End',
  tagline: 'Beyond the edge of every map, there\'s a garden. It\'s been waiting for you.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 16,
  settingSummary:
    'Every map has an edge. Beyond the edge of the known world lies a garden — vast, ancient, and growing. It is the source of all plant life, the origin of all seasons, and the home of the being who tends it: the Gardener, a primordial entity who planted the world\'s first seed. The garden is dying. If it dies, so does everything that grows. The party must journey beyond the edge of every map to find it.',
  hook: 'All plant life begins to wilt — simultaneously, everywhere, for no reason. Druids are frantic. Crops are failing. Forests are browning. A dying tree whispers one word to a druid in the party: "Garden." An ancient map shows a compass rose with five directions — North, South, East, West, and "Beyond."',
  twist:
    'The Gardener isn\'t tending the garden anymore because the Gardener is dying. Primordial entities don\'t die of age — they die of purpose. The world has become self-sustaining enough that the Gardener isn\'t needed. Without purpose, it fades. The garden dies because its keeper has no reason to live. The party must give the Gardener a new purpose — or take over the garden themselves.',
  climax:
    'The party reaches the Garden at World\'s End. The Gardener is a vast, ancient being — half-plant, half-thought — wilting alongside its creation. The party can give it a new purpose (the world still needs beauty, not just survival), take over gardening duties (becoming primordial caretakers), or find a way to make the garden self-sustaining (technology/magic replacing purpose). Each choice reshapes the natural world.',
  acts: [
    {
      title: 'Act 1: The Withering',
      summary: 'The global plant death, investigation, and the journey to the edge of the map.',
      keyEvents: [
        'The withering: crops die, forests brown, flowers close — worldwide, simultaneous',
        'The druid\'s whisper: one word from a dying tree — "Garden"',
        'The ancient map: the fifth direction — "Beyond" — points past every known landmark',
        'The journey begins: through the last forest, past the last town, into the uncharted',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Beyond the Edge',
      summary: 'Traveling through land no map has ever shown. Each day brings stranger, more primal landscapes. The world becomes rawer, wilder, closer to its original state.',
      keyEvents: [
        'Day 1 beyond: familiar but older — ancient trees, animals that don\'t fear humans',
        'Day 3 beyond: primal — plants that existed before civilization, weather that has personality',
        'Day 5 beyond: the boundary — where the cultivated world meets the wild garden',
        'The Garden\'s edge: a wall of growth so dense it\'s solid, parting to let the party through',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Gardener',
      summary: 'Inside the Garden. The Gardener is dying. The party must save the source of all green things.',
      keyEvents: [
        'The Garden: impossible beauty — every plant that has ever existed grows here',
        'The Gardener: a being the size of a hill, made of roots and memory, wilting',
        'The conversation: "I planted the first seed. The forest grew. It doesn\'t need me anymore."',
        'The choice: new purpose, succession, or self-sustaining — each reshapes the natural world',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Gardener',
      role: 'primordial entity / dying caretaker',
      personality: 'A being older than gods who expresses everything through growth. Happy = flowers bloom. Sad = leaves fall. Dying = everything wilts. "I planted the first seed ten billion years ago. It was a good seed."',
      secret: 'It WANTS to die. It has lived long enough. But it can\'t let the garden die with it. It called the party because they might be able to take over.',
    },
    {
      name: 'Sage Moss',
      role: 'druid guide / voice of nature',
      personality: 'An ancient druid who has felt the connection to the Garden her entire life without understanding it. Now that it\'s dying, she feels it most acutely. "Every blade of grass is screaming. I can hear them all."',
    },
    {
      name: 'The First Weed',
      role: 'adversary / natural force',
      personality: 'A parasitic plant entity that thrives on the Garden\'s weakness. Not evil — just opportunistic. "When the garden dies, something must grow in its place. I am that something."',
    },
  ],
  keyLocations: [
    { name: 'The Withering World', description: 'The mortal world, slowly losing all plant life. Brown fields, closed flowers, silent forests.', significance: 'The stakes made visible.' },
    { name: 'Beyond the Edge', description: 'Uncharted land that becomes increasingly primal — ancient, wild, and beautiful in a terrifying way.', significance: 'The journey environment.' },
    { name: 'The Garden at World\'s End', description: 'Every plant that ever existed or could exist grows here. It is the most beautiful place in reality. It is dying.', significance: 'The destination and climax.' },
  ],
  dataSystems: ['wildernessSurvival', 'enchantedForest', 'travelEncounters', 'weatherProgression', 'naturalDisaster', 'wildernessLandmarks', 'monsterEcology', 'socialEncounter', 'cataclysmCountdown'],
};
