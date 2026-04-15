import type { OneShotCampaign } from '../types';

export const theNorthernLights: OneShotCampaign = {
  id: 'oneshot-northern-lights',
  type: 'oneshot',
  title: 'The Northern Lights',
  tagline: 'The aurora touches the mountaintop. Where light meets stone, a staircase of color materializes, climbing into the stars. It lasts until dawn.',
  tone: 'exploration',
  themes: ['exploration', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'On the winter solstice, the aurora borealis descends to touch the peak of Mount Helstrad. Where light meets stone, a staircase of shimmering color materializes, climbing upward into the sky. Locals say it appears once every 50 years and lasts until dawn. The party has one night to climb it and discover what waits at the top.',
  hook: 'The aurora touches down at midnight. The staircase is visible from 20 miles away: ribbons of green and violet light, solid enough to walk on. An elder says: "My grandmother climbed those stairs when she was young. She came back different. Better. She never spoke of what she found."',
  twist: 'The staircase leads to the Observatorium, a celestial library maintained by astral scholars who watch the mortal world from above. They offer each visitor one question answered truthfully, about anything: the future, the past, the secrets of the universe. But the answer always comes at a cost the visitor does not expect.',
  climax: 'Each party member may ask one question. The answers are true but the cost is personal: a cherished memory, a skill, a year of life, a secret revealed. The party must decide what is worth knowing and what price they are willing to pay.',
  scenes: [
    {
      title: 'Scene 1: The Climb',
      summary: 'Ascending the aurora staircase through layers of sky. The air thins, the stars grow close, and the world below becomes small.',
      challenge: 'exploration',
      keyEvents: [
        'The staircase: solid light that feels like warm glass underfoot. Each step rings with a faint musical note. No railings. Wind from every direction smells of ozone and winter pine',
        'Passing through the cloud layer: wet grey blindness, ice crystals forming on armor and eyelashes, then bursting into crystalline starlight above. Clothing dries in seconds in air that has never known rain',
        'The view: the entire continent shrinks below them. Rivers are silver threads. Cities are clusters of amber light. The curvature of the world becomes visible',
        'A guardian at the midpoint: a celestial being that tests whether the party deserves to continue',
      ],
    },
    {
      title: 'Scene 2: The Observatorium',
      summary: 'Arriving at a structure of crystal and starlight suspended above the world. The scholars greet the party as expected guests.',
      challenge: 'social',
      keyEvents: [
        'The Observatorium: a crystalline structure among the stars, impossibly beautiful',
        'The scholars: beings of soft light who have watched the world for eons',
        'The offer: one question each, answered with absolute truth',
        'The warning: every answer has a cost, and the cost is not negotiable',
      ],
    },
    {
      title: 'Scene 3: The Questions',
      summary: 'Each party member decides whether to ask their question and pays the price. The answers change them.',
      challenge: 'social',
      keyEvents: [
        'Each player chooses a question (or chooses not to ask)',
        'The answers are profound, personal, and true',
        'The costs are revealed after the answers: memories fade, skills diminish, secrets emerge',
        'The descent: the staircase fades at dawn, depositing the party back on the mountain',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elder Astrid', role: 'quest giver', personality: 'The village elder who saw the staircase as a child and regrets not climbing it. "I was afraid. I have spent 50 years wondering what I would have learned. Do not make my mistake."' },
    { name: 'The Sentinel', role: 'guardian', personality: 'A celestial being at the staircase\'s midpoint that bars unworthy climbers. It does not fight. It asks one question that forces the party to confront whether they are ready for truth.' },
    { name: 'The Archivist', role: 'the answerer', personality: 'The chief scholar of the Observatorium. Kind, ancient, and genuinely sorry about the costs. "Truth is the most expensive thing in the universe. I wish it were otherwise."' },
  ],
  keyLocations: [
    { name: 'Mount Helstrad', description: 'A snow-covered peak where the aurora touches down once every 50 years.', significance: 'The starting point and anchor for the staircase.' },
    { name: 'The Aurora Staircase', description: 'A staircase of solid light climbing from the mountaintop into the stars.', significance: 'The journey itself. Beautiful, dangerous, and temporary.' },
    { name: 'The Observatorium', description: 'A crystalline library among the stars where scholars watch the mortal world.', significance: 'The destination. Where questions are answered and prices are paid.' },
  ],
  dataSystems: ['planarTravel', 'socialEncounter', 'npcDialogue', 'explorationChallenge', 'celestialEvent'],
};
