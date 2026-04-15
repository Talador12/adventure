import type { FullCampaign } from '../types';

export const theAccidentalKing: FullCampaign = {
  id: 'full-the-accidental-king',
  type: 'full',
  title: 'The Accidental King',
  tagline: 'A paperwork error made you king. The responsibilities are immediate. The real king is on vacation.',
  tone: 'shenanigans',
  themes: ['comedy', 'political', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Kingdom of Valdris has a complex succession system based on genealogical records maintained by the Bureau of Crowns. Through a series of clerical errors, misfiled birth certificates, and one spectacular typo, a random party member has been identified as the legal heir to the throne. The actual king, Aldric III, is on a wellness retreat in the Feywild and cannot be reached. His advisors have panicked. The coronation happened before anyone could object. The party member is now King (or Queen). The kingdom is real. The responsibilities are immediate. There is a trade dispute with the dwarves, a dragon threatening the northern border, and the treasury audit is due Thursday.',
  hook: 'The party is camping outside Valdris when the Royal Guard arrives, bows, and addresses one party member by a title they have never held. "Your Majesty, we have been searching for you. Your coronation was this morning. You missed it but we did it anyway. Your kingdom awaits. Also the dwarves declared a trade embargo an hour ago and the dragon ambassador is waiting in the throne room. He seems upset."',
  twist:
    'King Aldric III is not on a wellness retreat. He engineered the paperwork error himself because he desperately wanted to quit but the law does not allow abdication. He FOUND the party member in the genealogical records, forged the connection, and fled. He is hiding in the Feywild watching through a scrying pool and JUDGING the party\'s governance. If they do a good job, he is never coming back.',
  climax:
    'Every crisis converges on the same day: the dwarven embargo reaches a breaking point, the dragon attacks, the treasury is empty, and the real king is found in the Feywild but refuses to return because the party member is "doing fine." The party must resolve a diplomatic crisis, a military crisis, and a fiscal crisis simultaneously while one of them is technically the monarch and the rest are the royal court. The final session is the most stressful board meeting in fantasy history.',
  acts: [
    {
      title: 'Act 1: Long Live the King',
      summary:
        'The accidental king is crowned and immediately drowns in royal obligations. Court politics are vicious. The advisory council is incompetent. Every decision has consequences and the party has no idea what they are doing. The rest of the party is roped in as the royal court.',
      keyEvents: [
        'Coronation aftermath: the party member receives a crown, a scepter, and 400 pages of pending legislation.',
        'First day: the dwarven ambassador demands an audience. The treasury secretary admits the books are "creative."',
        'Court politics: three noble houses immediately try to manipulate the new king. They are bad at hiding it.',
        'Role assignment: the rest of the party becomes the royal court by default. The rogue is now Spymaster.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Weight of the Crown',
      summary:
        'The crises multiply. The dragon situation escalates. The dwarves cut off iron. A neighboring kingdom smells weakness. The party discovers the real king planned his own disappearance and is watching them fail from a spa in the Feywild.',
      keyEvents: [
        'The dragon: it does not want to attack. It wants zoning rights. It is building a lair and the permits are held up.',
        'The dwarves: the embargo is personal. King Aldric insulted their beard culture. Reparations are demanded.',
        'Discovery: Aldric\'s retreat booking was made six months ago. The paperwork error was planted.',
        'Scrying confrontation: Aldric appears in a mirror, wearing a bathrobe. "You are doing fine. Mostly."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Longest Day',
      summary:
        'Everything hits at once. The dwarves march. The dragon arrives for its zoning hearing. The neighbor declares war. The treasury is empty. And Aldric still will not come back. The party must resolve every crisis in a single day while running a kingdom they never wanted.',
      keyEvents: [
        'Dawn: the dwarven army is spotted. The party has until noon to resolve the embargo.',
        'Midday: the dragon lands on the castle for its zoning appointment. It has a lawyer.',
        'Afternoon: the neighbor kingdom\'s declaration of war arrives. By raven. The raven is also hostile.',
        'Sunset: the party solves everything through some combination of diplomacy, combat, and creative accounting. Aldric slow-claps from his mirror.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'King Aldric III',
      role: 'real king / absentee monarch',
      personality:
        'A man who was king for 20 years and hated every second of it. Engineered his own replacement. Currently in a Feywild spa drinking herbal tea and watching the party through a scrying pool. Provides unhelpful commentary. "Oh, you should not have said that to the dwarves. Well, too late now."',
      secret: 'He genuinely believes the party member would be a better ruler than him. He is right, and that makes him both relieved and sad.',
    },
    {
      name: 'Chancellor Fosswick',
      role: 'chief advisor / panicking bureaucrat',
      personality:
        'A gnome who has served three kings and is now serving a fourth he did not expect. Meticulous, anxious, and deeply committed to process. Carries a stack of paperwork at all times. "Your Majesty, I need 14 signatures before lunch. Seven are urgent. Three are classified. One might be a declaration of war, I have not read it yet."',
    },
    {
      name: 'Ambassador Grumthar Ironbeard',
      role: 'dwarven diplomat / offended party',
      personality:
        'The dwarven ambassador who was personally insulted by King Aldric and is NOT over it. The insult was about his beard. Dwarven insult law requires reparations. He is not unreasonable but he IS prideful. "He called it \'adequate.\' ADEQUATE. I have won awards for this beard."',
    },
    {
      name: 'Korventhax the Zoning Dragon',
      role: 'dragon / bureaucratic nightmare',
      personality:
        'An adult red dragon who is trying to build a lair through proper legal channels. Has hired a lawyer. Has filed permits. Has attended three zoning hearings. Is tired of being treated like a monster when he is clearly a property developer. "I just want a cave with southern exposure. Is that so unreasonable?"',
    },
  ],
  keyLocations: [
    {
      name: 'Castle Valdris',
      description: 'A grand castle that looks impressive from outside and is a bureaucratic nightmare inside. Every room has paperwork. The throne is uncomfortable. The crown is heavy. The view is nice though.',
      significance: 'The seat of power and the party\'s involuntary base of operations for the entire campaign.',
    },
    {
      name: 'The Feywild Spa',
      description: 'A luxurious retreat in the Feywild where Aldric is hiding. Hot springs, cucumber water, and a scrying pool he uses to watch the party panic. Time moves differently here. He does not care.',
      significance: 'Where the real king is hiding and where the party goes to confront him (he does not leave).',
    },
    {
      name: 'The Bureau of Crowns',
      description: 'A dusty archive in the castle basement where genealogical records are kept. Filing cabinets stretch to the ceiling. The error that started everything is on a form somewhere in here. Good luck finding it.',
      significance: 'Where the paperwork error originated and where the proof of Aldric\'s scheme can be found.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'factionReputation',
    'politicalIntrigue',
    'combatNarration',
    'plotTwistEngine',
    'fantasyInsults',
    'villainMonologue',
    'riddleGenerator',
  ],
};
