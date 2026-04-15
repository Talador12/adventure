import type { FullCampaign } from '../types';

export const theFuneralGames: FullCampaign = {
  id: 'full-the-funeral-games',
  type: 'full',
  title: 'The Funeral Games',
  tagline: 'A dead hero left her estate to whoever wins the games. She designed them to be unfair.',
  tone: 'social',
  themes: ['social', 'classic_fantasy', 'mystery'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'Lady Voss Iremark, the greatest adventurer of her generation, is dead. Her will is eccentric: her entire estate - fortune, magical artifacts, a keep, and a legendary weapon - goes to whoever wins the Funeral Games, a series of competitions she designed before her death. The party competes against Voss\'s old adventuring companions, each of whom has a personal claim to the estate. The competitions are not just physical. They test character, loyalty, cleverness, and moral fiber. Voss built these games to answer one question: who deserves what she built?',
  hook: 'The party receives a sealed invitation: "You are cordially invited to the Funeral Games of Lady Voss Iremark. The dead request your attendance. Dress for competition." At the estate, they find five other teams - all former companions of Voss, all convinced the estate is rightfully theirs. The executor reads the rules: seven games, one winner, no killing. "Lady Voss was very specific about that last part. She said anyone who kills a competitor clearly did not understand the point."',
  twist:
    'Lady Voss is not dead. She faked her death to see who her real friends are. The games are the test. She has been watching from disguise - as a servant, a groundskeeper, a mourner at her own funeral. The competitors who cheat, backstab, and scheme reveal their true character. The competitors who play honorably prove they understood what Voss valued. The estate goes to whoever Voss judges worthy after watching them compete without knowing she was watching.',
  climax:
    'The final game: the competitors are told to divide the estate among themselves. No game, no competition - just a conversation. The greedy grab. The honorable defer. The clever negotiate. Then Voss walks in, alive, and renders her judgment based on everything she has seen. The party\'s choices throughout every game determine the outcome.',
  acts: [
    {
      title: 'Act 1: The Mourning',
      summary: 'The funeral, the reading of the will, and the first three games. Meet the competitors. Discover the stakes.',
      keyEvents: [
        'The funeral: genuinely emotional. Voss was loved. Her companions weep real tears.',
        'Quiet moment: after the funeral, the party finds Korrin alone in the Trophy Hall holding a dented shield. He and Voss carried it between them for twenty years. He cannot stop touching the strap she held.',
        'The will reading: shock, outrage, and the rules of the games announced',
        'Game 1: The Riddle Vault - a puzzle dungeon that rewards cooperation but scores individually',
        'Game 2: The Feast of Strangers - cook a meal for a panel of judges. The real test: the judges are refugees, and the meal is judged on generosity, not taste.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Competition',
      summary: 'Games escalate. Alliances form. Some competitors play dirty. The party discovers the games are testing something deeper than skill.',
      keyEvents: [
        'Game 3: The Trial of Memory - competitors must recount Voss\'s greatest adventures accurately. Those who inflate their own role are penalized.',
        'Game 4: The Market - each team is given a pouch of gold and must return the most value. The "value" is not monetary.',
        'The moment of cost: one competitor poisons another team\'s supplies. The party must decide whether to report it or handle it privately. If they showed generosity in the Feast of Strangers, the victim trusts them enough to cooperate. If not, it becomes a public accusation and the games nearly end.',
        'Quiet moment: the servant Marta brings the party tea at midnight. She sits with them uninvited and asks about their lives - not the competition, their actual lives. Where they grew up. Who they miss. Her questions are oddly specific and deeply kind.',
        'A servant seems to know too much about the games. Unusually perceptive. Suspiciously familiar.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Judgment',
      summary: 'The final games, the truth about Voss, and the question of who truly deserves an adventurer\'s legacy.',
      keyEvents: [
        'Game 5: The Duel of Stories - competitors must tell the tale of their greatest failure. Vulnerability is the point.',
        'Game 6: The Rescue - a staged emergency where competitors can save each other or advance their own score. Only one choice is correct. If the party saved the poisoned competitor in Act 2, Korrin notices and adjusts his own strategy - he starts playing honorably.',
        'Game 7: The Division - divide the estate by consensus. No fighting. Just conversation.',
        'Quiet moment: Voss reveals herself. She takes off the groundskeeper\'s apron. Korrin sees her and his knees buckle. Whisper\'s eyes go wide, then she laughs - she knew. Voss looks at the party and says: "You were kind to an old woman who refilled your tea. That told me everything."',
        'Voss names her heir based on character, not victory. Every choice the party made across all seven games shaped her judgment.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Lady Voss Iremark',
      role: 'the "deceased" / the hidden judge',
      personality: 'Brilliant, theatrical, and deeply sentimental beneath layers of bravado. She faked her death because she needed to see people without the mask they wear for the living. "You can know someone for fifty years and never see who they are until they think you are gone."',
      secret: 'She is disguised as Marta, the elderly groundskeeper. She has been refilling everyone\'s tea.',
    },
    {
      name: 'Korrin the Bold',
      role: 'competitor / Voss\'s former second-in-command',
      personality: 'A proud warrior who believes the estate is his by right of service. He fought beside Voss for twenty years. Honorable but entitled. "I earned this. With blood, sweat, and scars."',
    },
    {
      name: 'Whisper',
      role: 'competitor / Voss\'s former spymaster',
      personality: 'A tiefling rogue who plays the games with calculated precision. She does not cheat, but she finds every loophole. "Voss would want someone clever to inherit. Clever is what I do."',
      secret: 'She suspects Voss is alive. She has not said anything because she wants to see how the games play out.',
    },
    {
      name: 'Executor Hadrian',
      role: 'estate lawyer / game referee',
      personality: 'A dragonborn barrister who takes the rules extremely seriously. He knows Voss is alive. His job is to keep the games fair and the secret hidden. "I serve the will of the deceased. Or the will of the not-yet-deceased. The legal distinction is surprisingly narrow."',
    },
  ],
  keyLocations: [
    {
      name: 'Iremark Keep',
      description:
        'Voss\'s estate: a sprawling keep filled with trophies, artifacts, and memories of a legendary career. Every room tells a story. The groundskeeper keeps fresh flowers on every table. She knows which flowers Voss loved.',
      significance: 'The prize and the arena. Each game takes place in a different part of the keep.',
    },
    {
      name: 'The Trophy Hall',
      description:
        'A vast hall lined with mementos from Voss\'s adventures. Weapons, paintings, maps, and a locked case labeled "For the Worthy." Korrin\'s dented shield hangs on the wall. Next to it, an empty hook where a second shield once hung.',
      significance: 'The heart of the estate and the location of the final game.',
    },
    {
      name: 'The Garden of Remembrance',
      description:
        'A beautiful garden where Voss planted a tree for every companion lost on the road. The funeral was held here. The newest tree is planted but unlabeled - Voss left a blank marker for herself, knowing she would be back to fill it in.',
      significance: 'Where the truth is revealed and Voss returns from the "dead."',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'festivalAdvanced',
    'backstoryComplication',
    'courtIntrigue',
    'rumorMill',
    'diplomaticNegotiation',
    'puzzleTrap',
  ],
};
