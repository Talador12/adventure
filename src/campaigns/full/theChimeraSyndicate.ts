import type { FullCampaign } from '../types';

export const theChimeraSyndicate: FullCampaign = {
  id: 'full-chimera-syndicate',
  type: 'full',
  title: 'The Chimera Syndicate',
  tagline: 'They do not traffic monsters. They traffic in becoming monsters.',
  tone: 'serious',
  themes: ['underdark', 'horror', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 15,
  settingSummary:
    'The Chimera Syndicate is a criminal organization that traffics in biological modification—splicing monster traits into willing (and unwilling) subjects. They operate from the undercity beneath a major metropolis, creating hybrid soldiers for the highest bidder. The party is hired to stop them but discovers the Syndicate\'s leader has gone far beyond simple splicing.',
  hook: 'A series of disappearances leads the party to the undercity. They rescue a test subject mid-transformation who begs them to stop "the Sculptor" before she perfects her ultimate creation.',
  twist:
    'The Sculptor is splicing herself with pieces of every monster she acquires, aiming to become a living god—a true chimera with the powers of hundreds of creatures. She is already partially transformed and more powerful than anticipated.',
  climax:
    'The party must assault the Sculptor\'s laboratory while she is in the final stages of her transformation, defeat her hybrid guards, and destroy her research before the knowledge spreads.',
  acts: [
    {
      title: 'Act 1: The Flesh Market',
      summary:
        'The party infiltrates the Syndicate\'s operations, discovering the scale of the monster-splicing trade. They rescue victims and gather intelligence about the Sculptor\'s ultimate goal.',
      keyEvents: [
        'Infiltrating a flesh auction in the undercity',
        'Rescuing a partially-transformed victim with information',
        'Discovery of the Syndicate\'s military contracts—hybrid soldiers sold to warring nations',
        'First encounter with a completed chimera-hybrid',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Sculptor\'s Garden',
      summary:
        'The party ventures deeper into Syndicate territory, finding laboratories where monsters are bred and modified. They learn about the Sculptor\'s personal project and the extent of her madness.',
      keyEvents: [
        'Navigating the Garden—zoos of experimental creatures, some helpful, most hostile',
        'Finding the Sculptor\'s journals detailing her ascent to godhood',
        'Rescuing a druid who can reverse some transformations',
        'Confronting the Sculptor\'s lieutenants, each a different type of hybrid',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Ascension',
      summary:
        'The Sculptor initiates her final transformation. The party must stop her before she becomes unstoppable while dealing with the chaos of her partially-transformed bodyguard army.',
      keyEvents: [
        'Assault on the Central Laboratory',
        'The Sculptor mid-transformation—powerful but vulnerable',
        'Fighting through waves of experimental hybrids',
        'Final battle against the incomplete chimera-god',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Sculptor',
      role: 'villain',
      personality:
        'Brilliant biologist obsessed with perfection through hybridization. Views herself as an artist and her creations as masterpieces. Already partially transformed.',
      secret: 'She was once a healer who failed to save her family from plague. Now she refuses to accept biological limitations.',
    },
    {
      name: 'Patchwork',
      role: 'sympathetic hybrid',
      personality:
        'A victim who was given multiple monster traits against their will. Struggling to maintain humanity. Helps the party navigate the Garden.',
    },
    {
      name: 'Dr. Maren',
      role: 'ally',
      personality:
        'Former Syndicate scientist who escaped. Knows the labs\' layouts and weaknesses. Guilt-ridden but determined to make amends.',
    },
    {
      name: 'The Broker',
      role: 'criminal contact',
      personality:
        'Information dealer who knows the Syndicate\'s operations. Willing to help for the right price—or if the party promises to eliminate his competition.',
    },
  ],
  keyLocations: [
    {
      name: 'The Undercity Flesh Markets',
      description:
        'Underground bazaars where biological modifications are bought and sold. Disturbing but functional economy.',
      significance: 'Entry point and site of early investigations.',
    },
    {
      name: 'The Garden',
      description:
        'The Sculptor\'s experimental preserve containing hundreds of hybrid creatures in various stages of development.',
      significance: 'Mid-campaign dungeon and source of moral dilemmas about the creatures.',
    },
    {
      name: 'The Laboratory of Ascension',
      description:
        'The Sculptor\'s private facility where she is performing her ultimate transformation.',
      significance: 'Final dungeon and site of the climactic battle.',
    },
  ],
  dataSystems: ['monsterEvolution', 'undergroundFaction', 'magicalDisease', 'dungeonRoomDressing'],
};
