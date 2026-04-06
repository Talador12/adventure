import type { FullCampaign } from '../types';

export const theUnderdarkOlympics: FullCampaign = {
  id: 'full-underdark-olympics',
  type: 'full',
  title: 'The Underdark Olympics',
  tagline: 'Drow sprinting. Duergar weightlifting. Mind flayer synchronized swimming. Medals are mandatory.',
  tone: 'comedic',
  themes: ['comedy', 'underdark', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'Once per century the Underdark races hold a truce for the Grand Games — an Olympics where drow, duergar, deep gnomes, myconids, and kuo-toa compete in events designed by committee (badly). The party is entered as the surface-world delegation. Events include blind-fighting, cave sprint, mushroom growing speed trials, and the dreaded Aboleth Pool Relay. Cheating is expected. Getting caught is the only crime.',
  hook: 'A deep gnome diplomat appears: "The Grand Games are in three weeks. The Underdark races have agreed to a truce. We need a surface team or it looks like you\'re afraid. You ARE afraid? Irrelevant. Here\'s your uniform."',
  twist:
    'The Games are rigged by the host city — Menzoberranzan — to ensure a drow victory and humiliate the other races. The party discovers the cheating when their equipment is sabotaged. They can expose it (causing a diplomatic incident), out-cheat the cheaters (becoming the thing they\'re fighting), or win so overwhelmingly that the rigging doesn\'t matter.',
  climax:
    'The final event: the All-Race Relay, where each team member runs a leg through a different Underdark environment. The drow have pre-staged their course with shortcuts. The party must adapt in real-time, using everything they\'ve learned about the Underdark, to win — or at least finish with dignity while exposing the conspiracy.',
  acts: [
    {
      title: 'Act 1: Training Camp',
      summary: 'Arriving in the Underdark, meeting the other delegations, training for events designed for creatures that live in the dark, and the opening ceremony.',
      keyEvents: [
        'Arrival and uniform fitting — the surface delegation uniforms are... very bright',
        'Training: blind-fighting (no torches), cave navigation (no maps), mushroom identification (don\'t eat that one)',
        'Meeting rival teams: drow (smug), duergar (stoic), deep gnomes (friendly), kuo-toa (unpredictable)',
        'Opening ceremony: a myconid choir (spore-based, hallucinogenic) and the lighting of the Underdark Torch (bioluminescent fungus)',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Events',
      summary: 'Competing in increasingly absurd events while discovering the drow are cheating. Each event tests different skills and provides different sabotage evidence.',
      keyEvents: [
        'Event 1: Cave Sprint — the party\'s torches are "accidentally" extinguished',
        'Event 2: Blind-Fighting Tournament — the drow team has echolocation earpieces',
        'Event 3: Mushroom Growing Speed Trial — the party\'s mushrooms are poisoned',
        'Evidence accumulates: the sabotage is coordinated by the drow delegation head',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The All-Race Relay',
      summary: 'The final event. The party knows the course is rigged. They can expose it, beat it, or turn the drow\'s cheating against them.',
      keyEvents: [
        'Pre-race: the party presents evidence of cheating to the judges (who are drow)',
        'The relay: five legs through cave, water, fungal forest, crystal cavern, and lava tubes',
        'Improvisation: adapting when the pre-staged shortcuts are blocked or revealed',
        'The finish: victory, moral victory, or the most entertaining loss in Games history',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Coach Glimmerdust',
      role: 'deep gnome coach / ally',
      personality: 'An enthusiastic deep gnome who has been training for this moment for a century. His coaching style is 90% encouragement, 10% useful advice. "You CAN see in the dark! You just need to BELIEVE!"',
      secret: 'He competed in the last Games 100 years ago. His team was sabotaged too. He never got over it.',
    },
    {
      name: 'Matron Zaelith',
      role: 'drow delegation head / antagonist',
      personality: 'The drow team leader who considers cheating a form of art. "Only the foolish play fair. The clever play to win."',
    },
    {
      name: 'Sporacle',
      role: 'myconid judge / neutral comic relief',
      personality: 'A myconid who judges events through spore-cloud consensus. Slow to decide. Very fair. Impossible to bribe (it doesn\'t understand the concept of money).',
    },
  ],
  keyLocations: [
    { name: 'The Grand Arena of Deepholm', description: 'A vast underground colosseum carved from a single geode. The walls sparkle. The acoustics are terrible.', significance: 'Where events take place.' },
    { name: 'The Athletes\' Village', description: 'A cavern complex with delegation quarters. The surface team\'s rooms are too small (designed for deep gnomes).', significance: 'Training, politics, and sabotage discovery.' },
    { name: 'The All-Race Relay Course', description: 'A 5-mile course through five Underdark environments, each favoring a different race.', significance: 'The final event and climax.' },
  ],
  dataSystems: ['tournamentBracket', 'gladiatorArena', 'skillChallenge', 'socialEncounter', 'factionReputation', 'encounterWaves', 'fantasyInsults', 'combatNarration', 'partyMoraleTracker'],
};
