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
    'The Chimera Syndicate is a criminal organization that traffics in biological modification - splicing monster traits into willing (and unwilling) subjects. They operate from the undercity beneath a major metropolis, creating hybrid soldiers for the highest bidder. The party is hired to stop them but discovers the Syndicate\'s leader has gone far beyond simple splicing.',
  hook: 'A series of disappearances leads the party to the undercity. They rescue a test subject mid-transformation who begs them to stop "the Sculptor" before she perfects her ultimate creation. The subject\'s left arm is covered in scales. The right has chitin plating. Both are shaking.',
  twist:
    'The Sculptor is splicing herself with pieces of every monster she acquires, aiming to become a living god - a true chimera with the powers of hundreds of creatures. She is already partially transformed and more powerful than anticipated.',
  climax:
    'The party must assault the Sculptor\'s laboratory while she is in the final stages of her transformation, defeat her hybrid guards, and destroy her research before the knowledge spreads.',
  acts: [
    {
      title: 'Act 1: The Flesh Market',
      summary:
        'The party infiltrates the Syndicate\'s operations, discovering the scale of the monster-splicing trade. They rescue victims and gather intelligence about the Sculptor\'s ultimate goal.',
      keyEvents: [
        'Infiltrating a flesh auction in the undercity. Bidders wear masks. The "lots" are living creatures in cages.',
        'Rescuing a partially-transformed victim with information. They speak in two voices - their own and the predator spliced into them.',
        'Discovery of the Syndicate\'s military contracts - hybrid soldiers sold to warring nations. War funds the research.',
        'Quiet moment: Patchwork shows the party their garden. Roses grow between chitin-plated fingers. "I am still in here. I just have roommates now."',
        'First encounter with a completed chimera-hybrid. It has the speed of a displacer beast and the cunning of a mind flayer. It asks the party if they want to be "improved."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Sculptor\'s Garden',
      summary:
        'The party ventures deeper into Syndicate territory, finding laboratories where monsters are bred and modified. They learn about the Sculptor\'s personal project and the cost of her transformation.',
      keyEvents: [
        'Navigating the Garden - zoos of experimental creatures, some helpful, most hostile. A griffon with spider eyes tries to communicate.',
        'Finding the Sculptor\'s journals: clinical at first, then ecstatic, then desperate. The last entry reads: "I can feel them all. They are so beautiful. I do not know where they end and I begin."',
        'The moment of cost: Dr. Maren shows the party the reversal lab. Some subjects can be restored. Not all. The ones who cannot be reversed are kept comfortable. One hums a lullaby to herself.',
        'Confronting the Sculptor\'s lieutenants, each a different type of hybrid. One was a volunteer. One was not. The volunteer is the more dangerous because they believe.',
        'Rescuing a druid who can reverse some transformations. She has been in a cage for months, forced to watch her magic used for splicing.',
        'If the party saved the auction victims in Act 1, they provide intelligence on the laboratory layout.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Ascension',
      summary:
        'The Sculptor initiates her final transformation. The party must stop her before she becomes unstoppable while dealing with the chaos of her partially-transformed bodyguard army.',
      keyEvents: [
        'Assault on the Central Laboratory. The walls are alive - the building itself has been partially hybridized.',
        'Quiet moment before the assault: Dr. Maren hands the party a vial. "If you cannot stop her, this will end her quickly. She would have wanted that. Before."',
        'The Sculptor mid-transformation - powerful but vulnerable. She recognizes Dr. Maren and hesitates. That hesitation is either a weakness or a redemption depending on what the party says.',
        'Fighting through waves of experimental hybrids. Some attack. Some flee. Some just stand there, unsure what they are.',
        'Final battle against the incomplete chimera-god. She is magnificent and horrifying. The healer who could not save her family has become a creature that can survive anything.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Sculptor',
      role: 'villain',
      personality:
        'Brilliant biologist obsessed with perfection through hybridization. Views herself as an artist and her creations as masterpieces. Already partially transformed - one eye is draconic, one arm ends in talons. Speaks with clinical detachment about her subjects, but her voice breaks when she mentions "the failures." Calls every creation "beautiful" regardless of what it looks like.',
      secret: 'She was once a healer who failed to save her family from plague. Now she refuses to accept biological limitations. Arc: begins as visionary, becomes desperate as the transformation consumes her identity. By Act 3, she is not sure which thoughts are hers.',
    },
    {
      name: 'Patchwork',
      role: 'sympathetic hybrid',
      personality:
        'A victim who was given multiple monster traits against their will. Struggling to maintain humanity. Helps the party navigate the Garden. Speaks with deliberate care, as if choosing each word from a list that keeps getting shorter. Tends a small garden because "growing things is the opposite of what was done to me."',
    },
    {
      name: 'Dr. Maren',
      role: 'ally',
      personality:
        'Former Syndicate scientist who escaped. Knows the labs\' layouts and weaknesses. Guilt-ridden but determined to make amends. Cleans her hands compulsively. Never makes eye contact when discussing her time in the lab. "I did not hold the scalpel. I just told them where to cut."',
      secret: 'She and the Sculptor were colleagues. Friends. She left because she could not watch the person she admired become the thing they both feared.',
    },
    {
      name: 'The Broker',
      role: 'criminal contact',
      personality:
        'Information dealer who knows the Syndicate\'s operations. Willing to help for the right price - or if the party promises to eliminate his competition. Picks his teeth with a bone toothpick. Never blinks at the right times.',
    },
  ],
  keyLocations: [
    {
      name: 'The Undercity Flesh Markets',
      description:
        'Underground bazaars where biological modifications are bought and sold. Disturbing but functional economy. Bioluminescent lighting. The air smells like formaldehyde and copper.',
      significance: 'Entry point and site of early investigations.',
    },
    {
      name: 'The Garden',
      description:
        'The Sculptor\'s experimental preserve containing hundreds of hybrid creatures in various stages of development. Some enclosures are beautiful. Some are padded cells. The distinction says everything.',
      significance: 'Mid-campaign dungeon and source of moral dilemmas about the creatures.',
    },
    {
      name: 'The Laboratory of Ascension',
      description:
        'The Sculptor\'s private facility where she is performing her ultimate transformation. Walls lined with specimens in jars. A surgical chair at the center. The chair has restraints but they are open - she sits willingly.',
      significance: 'Final dungeon and site of the climactic battle.',
    },
  ],
  dataSystems: [
    'monsterEvolution',
    'undergroundFaction',
    'magicalDisease',
    'dungeonRoomDressing',
    'encounterWaves',
    'socialEncounter',
  ],
};
