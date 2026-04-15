import type { OneShotCampaign } from '../types';

export const tooManyQuests: OneShotCampaign = {
  id: 'oneshot-too-many-quests',
  type: 'oneshot',
  title: 'Too Many Quests',
  tagline: 'Twelve quests. All due today. They contradict each other. Slay the dragon AND protect the dragon. Same dragon.',
  tone: 'shenanigans',
  themes: ['comedy', 'exploration', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The party accepted every quest on the board because they could not say no to gold. Twelve quests. All due by sundown. The quests overlap geographically but contradict each other: slay the dragon / protect the dragon (same dragon), rescue the princess / kidnap the princess (same princess), defend the village / burn the village (the village is caught in the middle), deliver a package / intercept a package (same package). The party must satisfy as many quest givers as possible before sundown without any of them realizing the party is working for their enemies.',
  hook: 'The party checks the quest board at dawn and takes every sheet. A tavern waitress watches with concern: "You know those quests contradict each other, right?" The party does not know this. They know they are getting paid twelve times today. "We can sleep when we are rich."',
  twist: 'All twelve quests were posted by the SAME person - a retired adventurer testing whether modern parties are smart enough to detect conflicting contracts. Nobody has ever passed the test. The "passing" solution is to not take all the quests. The party has already failed. The test now becomes: can they satisfy all twelve through creative interpretation, or do they spectacularly fail in the most entertaining way possible?',
  climax: 'Sundown. The party must report to twelve quest givers (all the same disguised person) simultaneously. They have partially completed all quests and fully completed none. The retired adventurer reveals herself, grades them on creativity (not completion), and pays them triple for the best entertainment she has had in years.',
  scenes: [
    {
      title: 'The Quest Overload',
      summary: 'The party reads all twelve quests and realizes the contradictions. Panic planning. They must prioritize, multitask, and lie to everyone.',
      challenge: 'puzzle',
      keyEvents: [
        'Quest list: slay dragon, protect dragon, rescue princess, kidnap princess, deliver package, intercept package, defend village, burn village, find missing cat, lose a different cat, close portal, open portal',
        'The party realizes "slay the dragon" and "protect the dragon" both lead to the same cave. Scheduling conflict.',
        '"Rescue the princess" and "kidnap the princess" are the same princess in the same tower. The party must move her and pretend it was both.',
        'A whiteboard. The party draws a flowchart. The flowchart has contradictions. The flowchart catches fire (metaphorically).',
      ],
    },
    {
      title: 'The Juggling Act',
      summary: 'The party splits up and attempts to complete contradictory quests simultaneously through creative interpretation and aggressive lying.',
      challenge: 'social',
      keyEvents: [
        'The dragon: the party "slays" it (tranquilizer dart, plays dead) while "protecting" it (from actual dragon hunters who showed up). Both quest givers satisfied.',
        'The princess: "rescued" from the tower and "kidnapped" to a safe house. Same action. Different reporting.',
        'The package: delivered to the recipient AND intercepted (they open it, read the contents, reseal it, and deliver it).',
        'The village: the party cannot burn AND defend it. They compromise: controlled burn of one empty barn, then defend the rest. The village is confused but alive.',
      ],
    },
    {
      title: 'The Reckoning',
      summary: 'Sundown. Twelve quest givers want reports. The party must present twelve different stories to twelve different people without contradicting themselves. They are the same person.',
      challenge: 'social',
      keyEvents: [
        'First report: "We slayed the dragon." "Excellent." Second report: "We protected the dragon." Same voice. Same face. Same bench.',
        'The party realizes all quest givers are the same person in different hats. Slowly. Painfully.',
        'The retired adventurer drops the disguises: "Nobody has ever taken all twelve. You are either the bravest or the dumbest party I have ever tested."',
        'Grading: creativity A+, planning C-, execution B, lying A. Triple pay. "Come back next month. I have TWENTY quests."',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Vex Stormhold', role: 'all quest givers / tester', personality: 'A retired adventurer in her 60s who designs contradictory quest tests for fun. Master of disguise. Wears a different hat for each identity. Has been doing this for twenty years. Nobody has ever figured it out on day one.' },
    { name: 'Princess Lira', role: 'quest objective / amused bystander', personality: 'The princess who needs to be both "rescued" and "kidnapped." Has been through this test before. Cooperates because Vex pays her. "Just tell me where to stand and which way to scream."' },
  ],
  keyLocations: [
    { name: 'The Quest Board', description: 'A village quest board with twelve sheets pinned up. They all have different handwriting (all forged by the same person).', significance: 'The inciting incident. Where the party takes on more than they can handle.' },
    { name: 'The Dragon\'s Cave', description: 'Where both "slay" and "protect" quests converge. A patient dragon who has done this test six times.', significance: 'The first major contradiction. Where the party learns to juggle.' },
  ],
  dataSystems: ['socialEncounter', 'npcDialogue', 'chaseSequence'],
};
