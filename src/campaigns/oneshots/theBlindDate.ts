import type { OneShotCampaign } from '../types';

export const theBlindDate: OneShotCampaign = {
  id: 'oneshot-blind-date',
  type: 'oneshot',
  title: 'The Blind Date',
  tagline: 'Two noble families. One arranged date. Neither kid wants to be here. You are the wingmen.',
  tone: 'social',
  themes: ['social', 'comedy', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'House Aldervane and House Thorne have arranged a date between their children to seal a political alliance. The problem: both kids despise the arrangement. The party has been hired as chaperones, entertainers, and emergency wingmen to make this date work. Failure means a trade war.',
  hook: 'Lady Aldervane pulls the party aside: "My son will try to sabotage this. Her daughter will try to escape. Make them like each other. Or at least pretend convincingly. A thousand gold and my undying gratitude."',
  twist:
    'The two kids actually met years ago at a festival under fake names and became fast friends. They do not realize the blind date is with each other. The moment they recognize each other, everything changes - but their families cannot know they already have a relationship, because it would imply the alliance was unnecessary.',
  climax:
    'The kids recognize each other. Joy, then panic. If the families find out they already know each other, the political framework collapses. The party must help them fake a convincing first-meeting romance while the kids secretly coordinate through the party.',
  scenes: [
    {
      title: 'Scene 1: The Setup',
      summary: 'The party preps the venue, coaches the reluctant son, and intercepts the daughter\'s escape attempt.',
      challenge: 'social',
      keyEvents: [
        'Lord Aldervane\'s son: sulking, sarcastic, has three escape plans.',
        'Lady Thorne\'s daughter: has already bribed a servant to create a distraction.',
        'The venue: a lakeside garden. The party must make it romantic despite two hostile participants.',
        'Both families have spies watching. Everything is reported.',
      ],
    },
    {
      title: 'Scene 2: The Date',
      summary: 'The date begins. Disasters unfold. The party runs interference while the two kids warm up despite themselves.',
      challenge: 'social',
      keyEvents: [
        'The son opens with a deliberately terrible compliment. The daughter retaliates.',
        'The party must redirect, distract, and create moments of genuine connection.',
        'A rival family sends a saboteur to ruin the date. The party must handle it quietly.',
        'A moment of recognition. The kids freeze. They know each other.',
      ],
    },
    {
      title: 'Scene 3: The Secret',
      summary: 'The kids recognize each other and the party must help maintain the fiction while both families watch.',
      challenge: 'social',
      keyEvents: [
        'The kids are delighted but cannot show it. The families are watching.',
        'A convincing "first meeting" must be performed for the audience.',
        'The saboteur makes another move. The party juggles threats and romance.',
        'The date ends. The families are satisfied. The kids have a secret. The party has a headache.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Dorian Aldervane',
      role: 'reluctant groom',
      personality: 'Sharp-tongued, artistic, secretly romantic. Uses sarcasm as armor. Melts completely when he recognizes his old friend.',
    },
    {
      name: 'Celeste Thorne',
      role: 'reluctant bride',
      personality: 'Clever, athletic, has an escape route for every situation. Fiercely independent but genuinely kind beneath the defiance.',
    },
    {
      name: 'Lady Irina Aldervane',
      role: 'overbearing mother',
      personality: 'Micromanages everything. Has opinions about posture, conversation topics, and the exact angle of a romantic glance.',
    },
  ],
  keyLocations: [
    {
      name: 'The Lakeside Garden',
      description: 'A manicured garden with a gazebo, swan lake, and too many decorative roses. Aggressively romantic.',
      significance: 'The stage for the date. Every disaster happens in a beautiful setting.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker', 'factionReputation', 'combatNarration'],
};
