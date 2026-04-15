import type { OneShotCampaign } from '../types';

export const thePenPal: OneShotCampaign = {
  id: 'oneshot-pen-pal',
  type: 'oneshot',
  title: 'The Pen Pal',
  tagline: 'You have been writing to them for years. They are finally here. They are not what you expected.',
  tone: 'social',
  themes: ['social', 'comedy'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2,
  settingSummary:
    'One party member has been corresponding with a pen pal for five years. They have shared secrets, dreams, and fears through letters. Today the pen pal arrives. Both sides embellished heavily. The pen pal is not the dashing knight they described. The party member is not the refined scholar they claimed to be.',
  hook: 'A carriage arrives at the tavern. A person steps out holding a bundle of letters and looking around nervously. They are expecting a "renowned arcanist with a tower." They find... your party. In a tavern. Covered in road dust.',
  twist:
    'The pen pal is a polymorphed dragon who has been writing letters as a hobby to understand mortal perspectives. They genuinely enjoyed the correspondence and are not hostile, but they are deeply awkward in humanoid form and keep accidentally revealing inhuman knowledge.',
  climax:
    'The pen pal\'s true nature is revealed (they sneeze fire, or casually mention being alive for centuries). The party must decide: does the friendship survive the deception on both sides? A heartfelt conversation determines the ending.',
  scenes: [
    {
      title: 'Scene 1: The Arrival',
      summary: 'The pen pal arrives. Mutual disappointment is immediate but polite. Both sides scramble to maintain their fictional versions.',
      challenge: 'social',
      keyEvents: [
        'The pen pal arrives expecting grandeur. Finds a tavern.',
        'The party member expected someone different. Awkward introductions.',
        'Both sides lie harder. The party helps maintain the fiction.',
        'A tour of the town, with the party desperately making everything seem grander.',
      ],
    },
    {
      title: 'Scene 2: The Day Together',
      summary: 'Activities and adventures. The lies become harder to maintain. Genuine moments break through the fiction.',
      challenge: 'social',
      keyEvents: [
        'A meal where the pen pal orders something no human would eat.',
        'An activity where the pen pal displays impossible knowledge or strength.',
        'A genuine conversation where both drop the act briefly. Real connection.',
        'The pen pal sneezes. Something catches fire.',
      ],
    },
    {
      title: 'Scene 3: The Truth',
      summary: 'The pen pal\'s nature is revealed. Both sides confess their embellishments. The friendship is tested.',
      challenge: 'social',
      keyEvents: [
        'The reveal: scales shimmer, eyes change, the truth comes out.',
        'The pen pal is embarrassed, not threatening. They just wanted a friend.',
        'The party member confesses their own lies. Mutual vulnerability.',
        'A choice: does the friendship continue, now honest? Both want it to.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Thessaly (pen pal)',
      role: 'polymorphed bronze dragon',
      personality: 'Earnest, overthinking, terrible at blending in. Uses archaic phrases. Knows too much about weather patterns and maritime history. Desperately wants mortal friends.',
    },
  ],
  keyLocations: [
    {
      name: 'The Crossing Inn',
      description: 'A modest roadside tavern that the party member described as "my estate" in letters.',
      significance: 'Where the comedy of mismatched expectations plays out.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker'],
};
