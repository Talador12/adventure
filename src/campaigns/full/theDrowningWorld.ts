import type { FullCampaign } from '../types';

export const theDrowningWorld: FullCampaign = {
  id: 'full-drowning-world',
  type: 'full',
  title: 'The Drowning World',
  tagline: 'The rain started three months ago. It hasn\'t stopped. Nobody knows why.',
  tone: 'survival',
  themes: ['survival', 'wilderness', 'mystery'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'An endless rain has been falling for three months. Rivers have burst, farmlands are swamps, and lowland cities are underwater. Society is fracturing as refugees flood the highlands. The rain is magical — it heals wounds but erodes stone, rusts metal, and slowly dissolves enchantments. Something is trying to wash the world clean.',
  hook: 'The party\'s hometown is flooding. They must lead a group of 40 refugees to higher ground while the world literally dissolves around them. The road to the highlands passes through territory claimed by desperate warlords, submerged dungeons, and communities that don\'t want more mouths to feed.',
  twist:
    'The rain is tears. A primordial water elemental — the spirit of the world\'s oceans — is grieving. A powerful archmage imprisoned its child (a lesser water elemental) in a phylactery to power a floating city. The ocean is trying to erode the world down to the phylactery to free its child.',
  climax:
    'The party finds the floating city — the only dry place left. The archmage refuses to release the elemental child because it would destroy the city and kill its 10,000 inhabitants. The party must find a way to free the child without sinking the city, convince the ocean to accept a compromise, or find another power source before the world drowns.',
  acts: [
    {
      title: 'Act 1: The Long March',
      summary:
        'Leading refugees through flooded countryside. Resource management, moral choices about who to save, and the first signs that the rain is magical.',
      keyEvents: [
        'Evacuation — 40 refugees, limited supplies, rising water',
        'A flooded town — do you loot the submerged shops or keep moving?',
        'The rain heals a dying child — first sign something is strange',
        'A warlord blocks the highland pass — demands half the refugees as laborers',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Highlands',
      summary:
        'The refugees reach temporary safety, but the rain is getting worse. The party investigates its source, traveling through submerged ruins and encountering water elementals who aren\'t hostile — they\'re searching.',
      keyEvents: [
        'Highland refugee camp — politics, rationing, despair',
        'Submerged temple exploration — ancient murals show a primordial ocean spirit',
        'Water elementals appear — not attacking, seeking something',
        'A scholar identifies the rain as tears — grief of something vast',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Floating City',
      summary:
        'The party discovers the floating city of Aethermere, powered by an imprisoned elemental. The archmage won\'t listen. The ocean won\'t wait. Time to improvise.',
      keyEvents: [
        'Discovery of Aethermere — a city floating above the floods, dry and arrogant',
        'The imprisoned child — a water elemental in agony, powering everything',
        'The archmage\'s ultimatum: "One elemental or ten thousand lives"',
        'The ocean gives a deadline: three days, then it sends a tidal wave',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Maren',
      role: 'refugee leader / moral compass',
      personality:
        'A tough, practical farmer who organized the evacuation. She doesn\'t trust adventurers but respects results. Will sacrifice herself for her people without hesitation.',
    },
    {
      name: 'Archmage Solus',
      role: 'antagonist / tragic figure',
      personality:
        'Built Aethermere to save his people. Genuinely believes imprisoning one elemental to save thousands is moral. Not evil — just unwilling to consider he might be wrong.',
      secret: 'He knows the elemental is in pain. He hears it screaming every night. He drinks to sleep.',
    },
    {
      name: 'Tidecaller',
      role: 'the grieving ocean',
      personality:
        'Communicates through rain patterns, wave shapes, and the behavior of water creatures. Its grief is genuine and vast. It doesn\'t want to destroy the world — it just wants its child back.',
    },
    {
      name: 'Ripple',
      role: 'the imprisoned child',
      personality:
        'A young water elemental trapped in crystal. Speaks in bubbling, childlike bursts of emotion. Doesn\'t understand why it hurts. Just wants to go home.',
    },
  ],
  keyLocations: [
    {
      name: 'The Flooded Lowlands',
      description:
        'Former farmland now a vast, shallow lake with rooftops and tree canopies poking above the water.',
      significance: 'The journey environment for Act 1.',
    },
    {
      name: 'The Highland Camps',
      description:
        'Muddy, overcrowded tent cities on the high ground. Desperate, tense, but alive.',
      significance: 'The party\'s base and the refugee community.',
    },
    {
      name: 'Aethermere',
      description:
        'A beautiful floating city that rides above the floods, powered by arcane engines. Dry, warm, and deeply unjust.',
      significance: 'Where the source of the rain is found and the climax takes place.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'naturalDisaster',
    'weatherProgression',
    'shipCrewManagement',
    'cataclysmCountdown',
    'diplomaticNegotiation',
    'factionReputation',
    'partyMoraleTracker',
    'apocalypseCamp',
  ],
};
