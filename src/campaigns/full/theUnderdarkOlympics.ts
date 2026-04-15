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
      personality:
        'An enthusiastic deep gnome who has been training for this moment for a century. His coaching style is 90% encouragement, 10% useful advice. Carries a glowing whistle. His pre-game speeches are legendary and completely useless. "You CAN see in the dark! You just need to BELIEVE! Also maybe squint."',
      secret: 'He competed in the last Games 100 years ago. His team was sabotaged too. He never got over it. His entire coaching career has been building toward this moment of vindication.',
    },
    {
      name: 'Matron Zaelith',
      role: 'drow delegation head / antagonist',
      personality:
        'The drow team leader who considers cheating a form of high art. Speaks in a tone that implies everyone else is too stupid to notice her schemes. They are not. She does not care. "Only the foolish play fair. The clever play to win. The brilliant play to win AND look graceful doing it."',
      secret: 'She has never competed in anything fairly in her life. If forced to play fair, she genuinely does not know the rules.',
    },
    {
      name: 'Sporacle',
      role: 'myconid judge / neutral comic relief',
      personality:
        'A myconid who judges events through spore-cloud consensus. Deliberation takes approximately 45 minutes per decision because every spore must agree. Completely impartial. Impossible to bribe because it does not understand the concept of money. Someone once offered it gold. It tried to photosynthesize it.',
    },
    {
      name: 'Glurp the Kuo-Toa',
      role: 'kuo-toa team captain / chaos agent',
      personality:
        'The kuo-toa delegation captain who invented three new events during the opening ceremony that nobody approved, including "competitive drowning" and "who can believe something into existence fastest." His team worships a different god every morning. Their mascot changes hourly. Nobody knows their actual roster.',
    },
    {
      name: 'Ironjaw Deepforge',
      role: 'duergar team captain / straight man',
      personality:
        'A duergar who takes the Games with grim, humourless determination. Treats every event - including the mushroom growing speed trial - with the intensity of mortal combat. Has never smiled. Once almost smiled after a gold medal. Caught himself. "Joy is a weakness the surface dwellers can afford. We have mining quotas."',
    },
  ],
  keyLocations: [
    {
      name: 'The Grand Arena of Deepholm',
      description:
        'A vast underground colosseum carved from a single geode. The walls sparkle with natural crystal formations that double as terrible spotlights. The acoustics bounce every sound into a disorienting echo. The scoreboard is a colony of glow-worms trained to form numbers.',
      significance: 'Where the main events take place. The crowd seating is tiered by race and everyone heckles.',
    },
    {
      name: "The Athletes' Village",
      description:
        'A cavern complex with delegation quarters designed by deep gnomes, which means every room is four feet tall. The surface team sleeps on the floor with their feet in the hallway. The drow quarters have suspiciously thick walls and soundproofing.',
      significance: 'Training, politics, and sabotage discovery. The cafeteria serves bioluminescent food that tastes like regret.',
    },
    {
      name: 'The All-Race Relay Course',
      description:
        'A 5-mile course through five distinct Underdark environments: a flooded cavern (favors kuo-toa), a crystal maze (favors deep gnomes), a lava tube (favors duergar), a web-strung chasm (favors drow), and a mushroom forest (favors myconids). The surface section is a straight hallway with torches. It favors nobody.',
      significance: 'The final event and climax. The drow have pre-staged shortcuts in their section and "accidentally" darkened the surface section.',
    },
  ],
  dataSystems: [
    'tournamentBracket',
    'gladiatorArena',
    'skillChallenge',
    'socialEncounter',
    'factionReputation',
    'encounterWaves',
    'fantasyInsults',
    'combatNarration',
    'partyMoraleTracker',
  ],
};
