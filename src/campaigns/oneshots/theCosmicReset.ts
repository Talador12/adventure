import type { OneShotCampaign } from '../types';

export const theCosmicReset: OneShotCampaign = {
  id: 'oneshot-cosmic-reset',
  type: 'oneshot',
  title: 'The Cosmic Reset',
  tagline: 'A man at the center of reality has his hand on a button. His math says the universe should not exist. He is waiting for someone to prove him wrong.',
  tone: 'epic',
  themes: ['epic', 'planar', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 7,
  estimatedHours: 2.5,
  settingSummary:
    'At the center of reality is the Origin Point - a mechanism that can reset the universe to its initial state. Everything that has ever happened would unhappen. A philosopher named Kael has reached it. He has arguments for pressing the button: suffering, entropy, the inevitability of heat death. He is not insane. He is right about the math. The party must convince him not to press it using arguments, not violence. The mechanism cannot be destroyed.',
  hook: 'A planar scholar arrives in a panic: "A man named Kael has reached the Origin Point. He has made a mathematically sound argument that resetting the universe creates net-positive existence by preventing future suffering. He is about to press the button. Combat will not work - the Origin Point is indestructible and fighting near it accelerates the reset. You must out-argue him."',
  twist: 'Kael does not actually want to press the button. He wants to be convinced not to. He reached the Origin Point after losing his family to a plague that could have been prevented if the gods had acted. His argument is grief wearing the mask of logic. He needs someone to give him a reason to believe the universe is worth its suffering.',
  climax: 'The Origin Point. Kael\'s hand hovers over the mechanism. The party has been arguing for hours. He has countered every logical argument. The only thing that will reach him is not logic but connection - someone willing to sit with his grief and acknowledge that the universe is broken AND worth preserving. Not a debate. A conversation.',
  scenes: [
    {
      title: 'Scene 1: The Journey',
      summary: 'Traveling to the Origin Point through layers of reality. Each layer strips away something - weapons, magic, pretense.',
      challenge: 'exploration',
      keyEvents: [
        'Layer 1: physical reality dissolves - weapons and armor become meaningless',
        'Layer 2: magic fades - spells unravel, magical items go dormant',
        'Layer 3: pretense falls - the party\'s true motivations become visible to each other',
        'The Origin Point: a simple room with a simple mechanism and a man sitting beside it',
      ],
    },
    {
      title: 'Scene 2: The Argument',
      summary: 'Kael presents his case. The party counters. A philosophical debate at the heart of existence.',
      challenge: 'social',
      keyEvents: [
        'Kael\'s opening: "The universe trends toward entropy. All joy is temporary. All suffering compounds. A reset is mercy."',
        'The party\'s counter: whatever they choose - meaning, love, potential, choice itself',
        'Kael\'s rebuttal: for every argument, he has a mathematician\'s answer - net suffering exceeds net joy',
        'The impasse: logic alone will not reach him - his argument is airtight because it ignores the irrational',
      ],
    },
    {
      title: 'Scene 3: The Conversation',
      summary: 'The debate becomes a conversation. The math gives way to grief. The party sits with a broken man.',
      challenge: 'social',
      keyEvents: [
        'The crack: Kael mentions his family offhandedly - the argument shifts from abstract to personal',
        'The grief: his daughter died of a preventable plague while the gods watched - his rage is justified',
        'The connection: the party shares their own losses, their own reasons for continuing despite pain',
        'The hand: Kael\'s hand moves - toward the button or away from it, depending on the party\'s words',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Kael', role: 'the philosopher', personality: 'A brilliant mathematician driven to the Origin Point by grief. Not a villain. Not insane. Just a man who did the math on suffering and decided the universe failed the test. He WANTS to be wrong.' },
    { name: 'The Watcher', role: 'the mechanism\'s guardian', personality: 'A being with no face and no voice who gestures instead of speaking. Points at the button. Points at Kael. Shrugs. It has seen this before. It will see it again. Or it will not. Either way.' },
  ],
  keyLocations: [
    { name: 'The Layers', description: 'Descending levels of reality that strip away physical, magical, and emotional armor. By the time you reach the Origin Point, you are just yourself.', significance: 'The journey that prepares the party for a conversation, not a fight.' },
    { name: 'The Origin Point', description: 'A simple white room with a simple mechanism at the center. No grandeur. No decoration. Just a button and the weight of everything.', significance: 'Where the universe\'s fate is decided by a conversation.' },
  ],
  dataSystems: ['socialEncounter', 'npcBackstoryGen'],
};
