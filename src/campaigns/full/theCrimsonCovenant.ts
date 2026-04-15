import type { FullCampaign } from '../types';

export const theCrimsonCovenant: FullCampaign = {
  id: 'full-crimson-covenant',
  type: 'full',
  title: 'The Crimson Covenant',
  tagline: 'The seventh vampire is not dead. She is the one who told you she was.',
  tone: 'horror',
  themes: ['dark_fantasy', 'intrigue', 'war'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 20,
  settingSummary:
    'The Crimson Covenant is a secret alliance of seven ancient vampires who have controlled world events from the shadows for millennia. One has been destroyed, breaking the pact\'s stability. Now the six survivors maneuver to claim the fallen\'s territory while dealing with the first real resistance they have faced in centuries.',
  hook: 'The party\'s hometown is destroyed by a vampire-led attack. They discover evidence that points to an organized conspiracy spanning nations, with a list of seven names—one crossed out in blood.',
  twist:
    'The seventh vampire is not dead—they faked their destruction to observe which of their "siblings" would try to claim their territory. They intend to use this information to purge the disloyal and start a new Covenant.',
  climax:
    'The party must infiltrate the Covenant\'s conclave where the six surviving vampires meet to divide the spoils. They can try to turn the vampires against each other, destroy them all, or ally with one to take down the others.',
  acts: [
    {
      title: 'Act 1: The Shadow War',
      summary:
        'The party hunts the vampires responsible for their hometown\'s destruction, discovering the Covenant\'s existence and their first target: Lord Malachar, the youngest member who overextended trying to claim the seventh\'s territory.',
      keyEvents: [
        'Surviving the initial attack and discovering the seven names',
        'Investigating vampire influence in three major cities',
        'First confrontation with a vampire spawn—learning about bloodlines',
        'Infiltrating Lord Malachar\'s estate and destroying him',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Games of Night',
      summary:
        'The party becomes entangled in vampire politics. Different Covenant members try to recruit, manipulate, or destroy them. They learn about vampire bloodlines, the Elders, and ancient pacts with dark powers.',
      keyEvents: [
        'Lady Vesper offers an alliance—she seems reasonable, for a monster',
        'The Butcher attacks, viewing the party as prey to be hunted',
        'Discovering the Covenant\'s human thrall network in the nobility',
        'Learning about the Seventh\'s "death" and the suspicious circumstances',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Conclave of Blood',
      summary:
        'The Covenant calls an emergency conclave to formally divide the Seventh\'s assets. The party crashes it, only to discover the Seventh is alive and has been manipulating everything. The final battle determines the fate of vampire-kind.',
      keyEvents: [
        'Infiltrating the Conclave\'s location—a castle that only exists at night',
        'The Seventh reveals themselves and their true plan',
        'Vampire civil war breaks out during the conclave',
        'Final choice: destroy the Covenant, replace it, or leave it weakened but intact',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Malachar',
      role: 'minor villain / first target',
      personality:
        'Arrogant, impulsive, the youngest Covenant member. He speaks too loudly for a creature of the night, gestures too broadly, laughs with all his teeth showing. Overconfident from centuries of unchallenged dominance. He does not flinch from holy symbols. He should.',
    },
    {
      name: 'Lady Vesper',
      role: 'potential ally / manipulator',
      personality:
        'Elegant, patient, the Covenant\'s diplomat. She speaks slowly, choosing words the way a sommelier chooses wine. She never shows her fangs. She crosses her hands in her lap when she lies. She offers the party a deal that sounds almost reasonable, which is the most dangerous thing about her.',
      secret: 'She genuinely believes vampires can coexist with humanity - and she might be right.',
    },
    {
      name: 'The Butcher',
      role: 'villain',
      personality:
        'A vampire who has abandoned all pretense of humanity. He does not speak - he growls words. His clothes are always stained. The room smells like iron when he enters. The other Covenant members fear him as much as they need him. He watches the party the way a cat watches a bird through glass.',
    },
    {
      name: 'The Seventh',
      role: 'true antagonist',
      personality:
        'Patient beyond measure. Her voice never changes pitch. Her face never changes expression. She faked her death to test loyalty and waited, motionless, for years. She speaks about sacrifice the way an accountant speaks about depreciation.',
      secret: 'She created the other six vampires - she is the original, and the others are merely extensions of her will that have forgotten their leash.',
    },
  ],
  keyLocations: [
    {
      name: 'Malachar Estate',
      description:
        'A gothic manor with secret tunnels, blood storage, and vampire spawn barracks. The party\'s first major vampire lair.',
      significance: 'Introduction to vampire hunting and Covenant structure.',
    },
    {
      name: 'The Night Market',
      description:
        'An underground black market where vampires trade favors, blood, and thralls. Neutral ground protected by ancient pacts.',
      significance: 'Where the party gathers intelligence and meets vampire informants.',
    },
    {
      name: 'The Conclave Castle',
      description:
        'A fortress that phases into existence only at night, existing partially in the Shadowfell. Where the final confrontation occurs.',
      significance: 'The campaign\'s final dungeon and setting for the vampire civil war.',
    },
  ],
  dataSystems: ['vampireBloodline', 'lycanthropy', 'secretSociety', 'darkBargain'],
};
