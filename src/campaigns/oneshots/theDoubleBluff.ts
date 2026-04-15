import type { OneShotCampaign } from '../types';

export const theDoubleBluff: OneShotCampaign = {
  id: 'oneshot-double-bluff',
  type: 'oneshot',
  title: 'The Double Bluff',
  tagline: 'Two teams hired to steal the same gem. Steal it first AND frame the other team. What could go wrong?',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 3,
  settingSummary:
    'The Bloodstar Ruby sits in the Velvet Museum. Two teams have been independently hired to steal it tonight. The party\'s client added a bonus condition: not only must they steal the ruby, they must frame the rival team for the theft. The rival team - the Silver Knives - probably has the same plan. It is a heist inside a heist, and only one team walks away clean.',
  hook: 'The client grins: "The ruby is the job. But the Silver Knives are also going for it tonight. I need them to take the fall. Steal the ruby, plant evidence pointing to the Knives, and get out before they do the same to you. Double pay if they end up in chains."',
  twist: 'Both teams were hired by the same client. He wants both teams to steal the ruby and frame each other - guaranteeing one team gets caught while the other delivers the gem to him. He gets the ruby AND eliminates a rival crew. The party discovers this mid-heist when they find matching contract documents on a captured Silver Knife.',
  climax: 'The museum. Both teams are inside. The ruby is in the central gallery. The party must grab it before the Knives, plant the frame evidence, and escape. But now they know the game is rigged. Do they play it straight, team up with the Knives against the client, or steal the ruby and disappear?',
  scenes: [
    {
      title: 'Scene 1: The Setup',
      summary: 'Planning the heist and the frame simultaneously. The party must think two moves ahead.',
      challenge: 'exploration',
      keyEvents: [
        'The museum: layout, security, guard schedules, alarm wards, and the ruby\'s display case',
        'The frame evidence: fake Silver Knife calling cards, planted tools, a forged confession letter',
        'Intelligence on the Knives: their reputation, known methods, and probable entry point',
        'The plan: steal the ruby through Route A, plant frame evidence along Route B to mimic the Knives',
      ],
    },
    {
      title: 'Scene 2: The Heist',
      summary: 'Both teams enter the museum simultaneously. A cat-and-mouse game in the dark galleries.',
      challenge: 'puzzle',
      keyEvents: [
        'Entry: the party\'s planned route intersects with signs of the Knives\' presence',
        'The galleries: dark, trapped, and now being navigated by two teams trying to be silent',
        'An encounter: the party crosses paths with a Knife operative - fight, hide, or talk?',
        'The discovery: a captured Knife carries a contract document matching the party\'s - same client',
      ],
    },
    {
      title: 'Scene 3: The Ruby',
      summary: 'The central gallery. The ruby. Two teams converging. A double-cross revealed.',
      challenge: 'combat',
      keyEvents: [
        'The ruby: sitting under a glass dome in the center of the gallery, warded and alarmed',
        'The Knives arrive: their leader recognizes the party - or the party recognizes them',
        'The revelation: same client, same contract, same double-cross - one team was always meant to fall',
        'The choice: race the Knives for the ruby, team up against the client, or trigger the alarm and burn it all',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Client (Mr. Ash)', role: 'double-crossing employer', personality: 'Speaks like every sentence is a contract clause. Never uses your real name - assigns codenames on the spot. "You are Flint. You are Ember. You do not need to know why." Always has one hand near the door. Always smiling.', secret: 'He has a third team waiting outside to rob whoever comes out with the ruby.' },
    { name: 'Silver Knife Captain Vex', role: 'rival team leader', personality: 'Communicates with her team using hand signals even mid-conversation. Sizes up every person she meets by where they keep their weapon. When she finds the matching contract, she does not rage - she goes still, then says "We have a mutual problem. Want to solve it together or separately?"' },
    { name: 'Museum Warden Aldric', role: 'obstacle', personality: 'A retired war mage who sleeps in his office because he trusts nobody. His wards are layered three deep. He named the wards. He talks to them. "Good girl, Patience. Let me know if anyone breathes wrong."' },
  ],
  keyLocations: [
    { name: 'The Velvet Museum', description: 'A three-story museum of rare artifacts. Marble floors, trapped galleries, and magical wards on every display case.', significance: 'The heist location.' },
    { name: 'The Central Gallery', description: 'A circular room with the Bloodstar Ruby under a warded glass dome. Pressure plates on the floor. Alarm wards on the walls.', significance: 'Where both teams converge and the climax happens.' },
    { name: 'The Rooftop', description: 'The museum rooftop with skylights into the galleries. A possible entry point and an escape route.', significance: 'The alternate route and fallback position.' },
  ],
  dataSystems: ['heistPlanner', 'encounterWaves', 'combatNarration', 'trapDisarm'],
};
