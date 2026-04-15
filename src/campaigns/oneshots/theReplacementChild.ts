import type { OneShotCampaign } from '../types';

export const theReplacementChild: OneShotCampaign = {
  id: 'oneshot-replacement-child',
  type: 'oneshot',
  title: 'The Replacement Child',
  tagline: 'A changeling replaced a family\'s child years ago. It does not know what it is. The real child has been found.',
  tone: 'horror',
  themes: ['horror', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'A family\'s child was secretly replaced by a changeling 15 years ago. The changeling, now a teenager named Wren, has no idea. They think they are human. They have a family, friends, memories, and a life. Then the real child is found alive in the Feywild. Both children exist. Both think they are the family\'s child. The party is caught in the middle.',
  hook: 'A Feywild rescue team returns with a human teenager who claims to be the child of the Hartwell family. The Hartwells already have a child that age: Wren. The rescued child knows family details from 15 years ago. Wren knows everything since. A cleric confirms: the rescued child is human. Wren is not.',
  twist: 'Wren is a changeling, but they genuinely love their family and have no memory of being anything else. The changeling transition happened at age 2. Wren\'s entire personality, identity, and soul are built on 15 years of real experiences with a real family. They are not an imposter in any meaningful sense. They are a person who was never given a choice about what they are.',
  climax: 'The family must choose: which child stays? Both are real in different ways. Wren discovers what they are and the horror of it nearly destroys them. The party must help the family find a solution that does not require choosing one child over the other.',
  scenes: [
    {
      title: 'Scene 1: Two Children',
      summary: 'The returned child and Wren meet. The family is paralyzed. The party is asked to help determine the truth.',
      challenge: 'social',
      keyEvents: [
        'The returned child: traumatized, confused, remembering a family that has moved on',
        'Wren: terrified, insisting they are real, not understanding why a stranger claims their life',
        'The cleric\'s test: the returned child is human. Wren registers as fey. Wren does not know this yet',
        'The family: the parents love Wren. They also love the child they lost. There is no good answer',
      ],
    },
    {
      title: 'Scene 2: The Revelation',
      summary: 'Wren learns the truth about what they are. The horror is not supernatural. It is the identity crisis of discovering your entire self is built on a lie you did not tell.',
      challenge: 'social',
      keyEvents: [
        'Wren is told: they are a changeling. They have been one since age 2',
        'The reaction: denial, terror, then a worse thought: "Do my parents know?"',
        'The parents did not know. Their love was real. The family was real. But what is Wren?',
        'Wren\'s form flickers involuntarily: the changeling nature surfacing under stress',
      ],
    },
    {
      title: 'Scene 3: The Family',
      summary: 'Both children exist. Both are real. The party helps the family navigate an impossible situation.',
      challenge: 'social',
      keyEvents: [
        'The returned child wants their family back. They spent 15 years in the Feywild waiting',
        'Wren wants to stay. This is the only family they know. "I am still me. I am still your child."',
        'The party facilitates: two children, one family, and the question of what makes someone real',
        'Resolution: the family can grow, not choose. Both children stay. It is hard but it is right',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Wren Hartwell', role: 'the changeling', personality: 'A teenager who has been human in every way that matters for 15 years. Learning they are a changeling is the worst thing that has ever happened to them. "I remember learning to walk in this house. I remember my first day of school. Those memories are mine. I am me."' },
    { name: 'Lily Hartwell', role: 'the returned child', personality: 'A teenager who spent 15 years in the Feywild remembering a family that was living with someone else. Not angry at Wren. Angry at the fey who took her. Heartbroken that her place was filled.' },
    { name: 'Maren and Coll Hartwell', role: 'the parents', personality: 'Parents who love the child they raised and the child they lost. They cannot choose. They should not have to. They look to the party for help they cannot find themselves.' },
  ],
  keyLocations: [
    { name: 'The Hartwell Home', description: 'A family home with two children\'s rooms and only one child\'s worth of recent memories.', significance: 'Where the impossible situation plays out in the most domestic setting possible.' },
    { name: 'The Town Square', description: 'Where the rescued child was returned and the truth became public.', significance: 'Where the community learns and forms opinions that pressure the family.' },
    { name: 'Wren\'s Room', description: 'A teenager\'s room filled with 15 years of a life that is real in every way that matters.', significance: 'The most painful room in the house. Every object is proof of a life that was genuine.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'moralDilemma', 'feyEncounter', 'npcRelationship'],
};
