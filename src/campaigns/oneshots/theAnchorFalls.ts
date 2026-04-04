import type { OneShotCampaign } from '../types';

export const theAnchorFalls: OneShotCampaign = {
  id: 'oneshot-anchor-falls',
  type: 'oneshot',
  title: 'The Anchor Falls',
  tagline: 'The floating city lost its anchor. It\'s drifting toward the sun.',
  tone: 'survival',
  themes: ['survival', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 8,
  estimatedHours: 4,
  settingSummary:
    'The city of Skyhold floats above the clouds, anchored to the ground by a chain of pure magic. The anchor has broken. The city is rising — slowly but unstoppably — toward the sun. The temperature rises every hour. The air thins. The party must find a way to re-anchor the city before it rises too high for anyone to survive.',
  hook: 'The ground shudders. Through the clouds below, the anchor chain snaps — a sound like a god breaking a bone. The city lurches upward. The governor announces: "The anchor is gone. We are rising. We have approximately 12 hours before the air becomes unbreathable. Ideas?"',
  twist: 'The anchor didn\'t break — it was cut. The city\'s founder cut it centuries ago as a failsafe: if the city ever fell into tyranny, cutting the anchor would give the citizens a choice — find a new way to survive, or return to the ground as equals. The current governor has been a tyrant for decades. The anchor-cut is the founder\'s last lesson: you can\'t float above the world and ignore it.',
  climax: 'The party must either repair the anchor (saving the city but preserving the status quo), find a new way to sustain Skyhold (magic, technology, or a new anchor), or bring the city down — literally and figuratively — ending its isolation but saving its people. The governor fights to keep the city airborne because returning to the ground means facing the people he\'s oppressed.',
  scenes: [
    {
      title: 'Scene 1: The Rise',
      summary: 'The anchor breaks. Panic. The party must take control, assess the situation, and begin the search for a solution as the city climbs.',
      challenge: 'exploration',
      keyEvents: [
        'The snap: the city lurches upward, everyone stumbles',
        'Assessment: 12 hours of breathable air, temperature rising 2 degrees per hour',
        'The governor\'s response: panic, blame, and unhelpful orders',
        'The party takes charge: investigation begins at the anchor point',
      ],
    },
    {
      title: 'Scene 2: The Search',
      summary: 'Racing through the city to find a solution. The founder\'s workshop, the anchor mechanism, and the uncomfortable truth about why the anchor was cut.',
      challenge: 'exploration',
      keyEvents: [
        'The anchor point: a clean cut, not a break — this was deliberate',
        'The founder\'s hidden workshop: blueprints, journals, and the failsafe explanation',
        'The governor\'s secret: he\'s been oppressing the lower districts for decades',
        'Three options identified: repair, reinvent, or descend',
      ],
    },
    {
      title: 'Scene 3: The Choice',
      summary: 'Air is thinning. The city is burning. The party must make their choice and execute it while the governor tries to stop them from bringing the city down.',
      challenge: 'combat',
      keyEvents: [
        'The governor\'s guards: "The city STAYS in the sky. That is an ORDER."',
        'Combat at the anchor mechanism while the temperature becomes dangerous',
        'The choice: repair (status quo), reinvent (new anchor, new rules), or descend (freedom)',
        'Resolution: the city\'s fate and the governor\'s reckoning',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Governor Aldric Cloudborne', role: 'political antagonist', personality: 'A man who inherited power and used it to isolate Skyhold from the world below. Terrified of the ground. "We are ABOVE them. That is where we BELONG."' },
    { name: 'Engineer Mira', role: 'ally / technical expert', personality: 'The city\'s chief engineer who understands the anchor mechanism. Practical, brilliant, and furious about the governor\'s negligence. "I told him the anchor needed maintenance. He spent the budget on his dining room."' },
    { name: 'The Founder (through journals)', role: 'posthumous mentor', personality: 'Known through workshop journals. A visionary who built Skyhold as a beacon of equality — then watched it become a tool of oppression. The failsafe was her last act of defiance.' },
  ],
  keyLocations: [
    { name: 'Skyhold', description: 'A floating city above the clouds — beautiful from below, stratified and unjust from within. Currently rising toward the sun.', significance: 'The setting and the stakes.' },
    { name: 'The Anchor Point', description: 'Where the magical chain connected to the ground. The cut is clean. The mechanism can be repaired — or repurposed.', significance: 'Where the solution is implemented.' },
    { name: 'The Founder\'s Workshop', description: 'A hidden room beneath the city hall, containing blueprints, journals, and the truth.', significance: 'Where the truth is discovered.' },
  ],
  dataSystems: ['cataclysmCountdown', 'siegeDefense', 'encounterWaves', 'socialEncounter', 'partyMoraleTracker', 'naturalDisaster'],
};
