import type { OneShotCampaign } from '../types';

export const thePerformanceReview: OneShotCampaign = {
  id: 'oneshot-the-performance-review',
  type: 'oneshot',
  title: 'The Performance Review',
  tagline: 'Rate the orc\'s stakeholder engagement. He pillaged three villages. That is exceeding expectations.',
  tone: 'comedic',
  themes: ['comedy', 'intrigue', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The Dark Lord\'s organization runs on corporate structure. There are departments, KPIs, and quarterly reviews. The minions hate it. The party has infiltrated the fortress disguised as middle management consultants hired to conduct annual performance reviews. Their real mission: gather intelligence on the Dark Lord\'s plans. Their cover: evaluating orc productivity, necromancer team building, and mimic adaptability using a standardized rubric.',
  hook: 'The party arrives at the Dark Lord\'s fortress with clipboards, name badges, and a 40-page performance review template. The minions are nervous. Nobody likes being evaluated. The party must maintain their cover while extracting information from every department. The orcs are surprisingly eager to complain about management. The necromancers want to talk about work-life balance. The mimics just want to be acknowledged.',
  twist:
    'The Dark Lord knows the party are spies. He let them in because he genuinely needs the performance data. His evil organization is underperforming and he cannot figure out why. He plans to use the party\'s honest assessments, THEN kill them. The party discovers this when they find the Dark Lord\'s own self-evaluation form on his desk, filled out with brutal honesty. He gave himself a 3 out of 5 on "inspiring fear."',
  climax:
    'The party must escape the fortress with their intelligence. The Dark Lord offers them a deal: stay and consult permanently (excellent benefits, evil required), or fight their way out. The minions, who genuinely appreciated the honest feedback, are reluctant to stop them. The orcs halfheartedly block the door. The necromancer opens a "back exit" that he claims does not exist. The mimic turns into a door.',
  scenes: [
    {
      title: 'Scene 1: The Orc Division',
      summary:
        'The party reviews the orc warriors. They must evaluate combat performance, teamwork, and "stakeholder engagement" (pillaging) while secretly gathering intel on troop movements and fortress layout.',
      challenge: 'social',
      keyEvents: [
        'Grak the orc presents his quarterly pillaging numbers - they are actually impressive',
        'The orcs complain about management: too many meetings, not enough pillaging time',
        'Intel gathered: troop rotation schedules hidden in the "attendance records"',
        'One orc cries during his review. He thought he was doing a good job. He was.',
      ],
    },
    {
      title: 'Scene 2: The Necromancy Department',
      summary:
        'The necromancers are reviewed next. Their "team building" (raising dead) metrics are strong but morale is low. The party must give constructive feedback while accessing the restricted magical archives.',
      challenge: 'puzzle',
      keyEvents: [
        'The lead necromancer presents his "team roster" - it is a list of raised undead, organized by department',
        'Necromancers request better components: "I cannot raise quality undead with bargain bones"',
        'The party accesses the magical archives under the pretense of verifying training certifications',
        'A skeleton employee fills out a self-evaluation. It just says "AAAAAAA." It is the most honest review in the stack.',
      ],
    },
    {
      title: 'Scene 3: The Escape Review',
      summary:
        'The party discovers the Dark Lord knows their identity. They must escape the fortress using the relationships they built during the reviews. The minions help, reluctantly.',
      challenge: 'combat',
      keyEvents: [
        'Discovery: the Dark Lord\'s self-evaluation form on his desk, next to a memo titled "Re: the spies"',
        'The Dark Lord offers permanent employment. The dental plan is actually excellent.',
        'The orcs block the exit halfheartedly - Grak "accidentally" leaves a gap',
        'The mimic from the adaptability review turns into an escape route',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Grak the Efficient',
      role: 'reviewee / reluctant ally',
      personality:
        'An orc warrior who takes his performance metrics very seriously. He has a spreadsheet. He made it himself. He is proud of it. "Grak exceed quarterly pillage target by 15%. Grak also complete mandatory sensitivity training. Grak is well-rounded employee."',
    },
    {
      name: 'Mortimer the Necromancer',
      role: 'reviewee / information source',
      personality:
        'Head of the necromancy department. Exhausted, overworked, and desperate for validation. He just wants someone to say his undead army is good. "Do you know how hard it is to raise 200 skeletons a week with THIS budget?"',
    },
    {
      name: 'The Dark Lord Veranthos',
      role: 'villain',
      personality:
        'Surprisingly self-aware for a dark lord. He knows his organization is dysfunctional. He reads management books. He tried implementing OKRs. It made things worse. "I gave myself a three on \'inspiring fear.\' I used to be a five. What happened?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Dark Fortress (Corporate Campus)',
      description: 'A massive fortress that functions like a corporate office. There are departments, break rooms, and a cafeteria. The decor is evil but the org chart is standard.',
      significance: 'The entire setting. Each department is a scene.',
    },
    {
      name: 'The Conference Room of Doom',
      description: 'A meeting room with a long obsidian table, uncomfortable chairs, and a whiteboard covered in "Q3 Conquest Targets." The coffee is terrible.',
      significance: 'Where the reviews happen and intelligence is gathered.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'villainMonologue',
    'randomNpcRelationship',
    'combatNarration',
    'plotTwistEngine',
  ],
};
