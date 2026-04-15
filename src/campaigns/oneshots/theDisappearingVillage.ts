import type { OneShotCampaign } from '../types';

export const theDisappearingVillage: OneShotCampaign = {
  id: 'oneshot-disappearing-village',
  type: 'oneshot',
  title: 'The Disappearing Village',
  tagline: 'The village vanishes every night. Reappears at dawn. Different location. Why? And how long until it does not come back?',
  tone: 'mystery',
  themes: ['mystery', 'planar', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Thornbury vanishes at sunset and reappears at dawn, each time in a new location. The villagers sleep through the transition and wake confused. The phenomenon started three nights ago. Each reappearance is further from the original location. The party must figure out why before Thornbury disappears for good.',
  hook: 'A farmer flags the party down: "My village was here yesterday. This morning it is three miles east. Yesterday it was two miles south. Nobody remembers moving. The buildings, the people, the gardens - everything just appears at dawn."',
  twist:
    'A child in the village found a fey music box and has been playing it every night before bed. The music box is a planar anchor that shifts whatever is nearby into the Feywild at dusk and returns it at dawn. Each cycle drifts further. Eventually it will not return at all.',
  climax:
    'The party must find the music box before sunset and stop the child from playing it. The child loves the music box. It was a gift from an "invisible friend" (a fey who wants to steal the village into the Feywild permanently). Convince the child, confront the fey, or destroy the box.',
  scenes: [
    {
      title: 'Scene 1: The Wrong Place',
      summary: 'The party arrives at a village that should not be where it is. Investigation reveals the pattern of displacement.',
      challenge: 'exploration',
      keyEvents: [
        'Thornbury is in the wrong place. Farmers point to where it was yesterday.',
        'The villagers remember nothing. They go to sleep and wake up somewhere new.',
        'Pattern analysis: each jump is longer. North, east, southwest. Drifting.',
        'Something feels off at dusk. The air shimmers. The village feels lighter.',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary: 'Searching the village for the cause. Interviews, magical detection, and a trail of clues leading to a child.',
      challenge: 'puzzle',
      keyEvents: [
        'Detect Magic at dusk: fey energy saturates the village center.',
        'The energy concentrates around a cottage. A family with a young daughter.',
        'The girl, Lily, has a pretty music box. She plays it every night. "My friend gave it to me."',
        'The "friend" is invisible. A fey presence detected near the girl\'s window.',
      ],
    },
    {
      title: 'Scene 3: The Music Box',
      summary: 'Sunset approaches. Stop the music box, deal with the fey, and anchor the village before it disappears permanently.',
      challenge: 'social',
      keyEvents: [
        'The fey reveals itself: a playful but selfish pixie noble who wants a pet village.',
        'Lily does not want to give up her music box. Convincing a child requires care.',
        'The fey offers a deal: the village stays if one person comes to the Feywild instead.',
        'Destroy the box, outsmart the fey, or find a compromise before sunset.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Lily Ashworth',
      role: 'child / unwitting cause',
      personality: 'Six years old. Loves her music box. Loves her invisible friend. Does not understand that she is teleporting an entire village every night.',
    },
    {
      name: 'Lord Whisperthorn',
      role: 'fey noble / antagonist',
      personality: 'Charming, childlike, and utterly selfish. Wants the village as a toy. Does not understand why mortals are upset about being relocated.',
      secret: 'He is lonely. The Feywild bores him. The village is the most interesting thing he has found in centuries.',
    },
  ],
  keyLocations: [
    {
      name: 'Thornbury Village',
      description: 'A perfectly normal village in a perfectly wrong location. The gardens are intact. The fences are straight. But this is not where it was yesterday.',
      significance: 'The mystery itself. A village that moves without knowing it.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'environmentalHazard'],
};
