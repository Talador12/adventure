import type { OneShotCampaign } from '../types';

export const theTimeLoop: OneShotCampaign = {
  id: 'oneshot-time-loop',
  type: 'oneshot',
  title: 'The Time Loop',
  tagline: 'You\'ve lived this day before. You\'ll live it again. Unless you fix it.',
  tone: 'mystery',
  themes: ['mystery', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 4,
  settingSummary:
    'The party wakes up on the same morning, in the same inn, with the same breakfast, for the third time. The day always ends the same way: at midnight, the bell tower explodes and everything resets. Nobody else remembers. The party retains their memories across loops. They have until midnight to find out what\'s causing the explosion and stop it — but each loop, they learn something new.',
  hook: 'Third morning. Same eggs. Same innkeeper. Same dog barking outside. The party looks at each other: "Again?" The clock reads 7 AM. They have 17 hours. Previous loops: Loop 1 was confusion. Loop 2 they explored. Loop 3 is when they start solving it.',
  twist: 'The bell tower explodes because a wizard is using it as a focus for a time spell — he\'s trying to save his daughter, who died at 11:47 PM on this day, by creating a perfect loop where she never reaches midnight. Every loop, he fails. Every loop, he resets. The party is caught in his grief loop because they were in the blast radius.',
  climax: 'The party must either stop the wizard (ending the loop but condemning his daughter), save the daughter before 11:47 PM (breaking the loop naturally), or find another way to let the wizard grieve and move on. Each approach requires information gathered across multiple loops.',
  scenes: [
    {
      title: 'Scene 1: Morning (Again)',
      summary: 'Loop 3 begins. The party plans their approach using knowledge from loops 1 and 2. They must gather new information efficiently.',
      challenge: 'exploration',
      keyEvents: [
        'Morning planning: what they know from previous loops (the DM provides a recap)',
        'Split up: each party member follows a different lead',
        'New discovery: a wizard has been seen at the bell tower every night at 11:30',
        'The daughter: a young woman who goes about her day normally, unaware she\'s about to die',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary: 'Tracking the wizard, understanding the time spell, and discovering the daughter\'s fate. Each loop reveals more — this is loop 3.',
      challenge: 'exploration',
      keyEvents: [
        'The wizard\'s lodgings: temporal equations covering every wall, tear-stained notes',
        'The daughter\'s routine: she dies at 11:47 in a collapsed building (unrelated to the tower)',
        'The time spell: it resets at midnight, centered on the tower, triggered by the wizard\'s focus',
        'A clock maker who has noticed the loops — "Hasn\'t it been Tuesday for a while now?"',
      ],
    },
    {
      title: 'Scene 3: 11:47 PM',
      summary: 'The party must act. Save the daughter, stop the wizard, or find another way — all before midnight resets everything again.',
      challenge: 'combat',
      keyEvents: [
        'The daughter\'s building begins to collapse at 11:45 — the party can intervene',
        'The wizard at the tower: confrontation with a grief-maddened mage who won\'t stop',
        'If the daughter is saved: the wizard breaks down, the loop collapses naturally',
        'If the wizard is stopped: the loop ends, the daughter\'s fate is sealed unless the party also saves her',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Aldric Voss (the wizard)', role: 'sympathetic antagonist', personality: 'A brilliant chronomancer destroyed by grief. He\'s been looping this day for 47 iterations. He knows the party is aware. He doesn\'t care. "I\'ll loop it a thousand times if I have to."' },
    { name: 'Sera Voss (the daughter)', role: 'the key', personality: 'A kind, ordinary young woman who has no idea she\'s been dying for 47 consecutive loops. She works at a bookshop. She\'s funny and warm. Making the party care about her is the point.' },
    { name: 'Pendleton (the clockmaker)', role: 'ally / information', personality: 'An eccentric gnome clockmaker who has noticed the loops because his precision clocks keep "gaining" a day. He\'s the only NPC who suspects the truth.' },
  ],
  keyLocations: [
    { name: 'The Crossed Keys Inn', description: 'Where the party wakes every loop. The innkeeper makes the same joke every morning. The eggs are always slightly cold.', significance: 'The starting point of every loop.' },
    { name: 'The Bell Tower', description: 'The focus of the time spell. At midnight, it explodes with temporal energy and the loop resets.', significance: 'Where the loop is broken.' },
    { name: 'Sera\'s Bookshop', description: 'A cozy bookshop where Sera works. The building next door is structurally unsound.', significance: 'Where the daughter must be saved.' },
  ],
  dataSystems: ['timeLoopDungeon', 'detectiveCase', 'npcSchedule', 'puzzleLock', 'socialEncounter', 'combatNarration'],
};
