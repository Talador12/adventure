import type { FullCampaign } from '../types';

export const theNewNeighbors: FullCampaign = {
  id: 'full-the-new-neighbors',
  type: 'full',
  title: 'The New Neighbors',
  tagline: 'A goblin family moved in next door. The HOA is losing its mind.',
  tone: 'social',
  themes: ['social', 'classic_fantasy', 'political'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 5 },
  estimatedSessions: 12,
  settingSummary:
    'The village of Millhaven has always been a quiet human settlement. That changed when a community of monsters - goblin families, kobold artisans, a polite owlbear couple and their cubs, a retired bugbear schoolteacher - moved in after losing their forest home. The party must help them integrate into village life, manage the humans\' fear and prejudice, settle disputes that are equal parts cultural misunderstanding and genuine grievance, and organize a community harvest festival that proves coexistence is possible.',
  hook: 'The party arrives in Millhaven to find a goblin family trying to register their children for school and a crowd of angry humans blocking the door. A kobold has opened a tinker shop and his inventions keep exploding. The owlbear family\'s cubs escaped and ate someone\'s chickens. Nobody has been hurt, but everyone is furious. The village elder hires the party: "Make this work or there will be blood."',
  twist:
    'The monsters were not driven from their home by a natural disaster. The Greystone Mining Company - a human expansion project - clear-cut and strip-mined their forest. The same company has now purchased the mineral rights to the hills outside Millhaven. They are coming here next. The humans and monsters face the same threat, and they need each other to fight it.',
  climax:
    'The harvest festival. The party has spent weeks building bridges between communities. The festival is the proving ground: goblin cooks prepare dishes alongside human bakers, kobold fireworks light up the sky, owlbear cubs play with human children. Then Greystone arrives with a court order to begin mining. The village must stand together - or fall apart. The humans who feared the monsters now fight alongside them.',
  acts: [
    {
      title: 'Act 1: First Contact',
      summary: 'The monster community arrives. Culture clash, fear, and a hundred small crises that the party must mediate one by one.',
      keyEvents: [
        'The school confrontation: goblin children just want to learn to read',
        'The tinker shop explosion: a kobold invention destroys a market stall, nobody hurt but trust shattered',
        'The owlbear chicken incident: compensation, apology, and a very awkward dinner',
        'Quiet moment: a goblin child gives a human classmate a hand-carved wooden toy. The human child gives the goblin a drawing of them playing together. Both mothers see it. Neither knows what to say.',
        'A human mob forms at night. The party must de-escalate before it becomes a pogrom.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Building Bridges',
      summary: 'Slow progress. Joint projects, shared meals, grudging respect. But every step forward risks two steps back.',
      keyEvents: [
        'The bugbear schoolteacher wins over the children - the parents are less convinced',
        'The moment of cost: a goblin healer saves a human child from fever using methods the village healer does not recognize. The child lives. The village must decide whether to be grateful or afraid. If the party built trust in Act 1, gratitude wins. If not, fear does.',
        'Quiet moment: Elder Brynn visits the monster quarter alone at night. She stands in front of the owlbear barn for a long time. Tinka opens the door, sees her, and offers her tea. Brynn accepts. They sit together in silence. It is the bravest thing either has done.',
        'Greystone scouts appear on the hills. The monsters recognize the company that destroyed their home.',
        'Festival planning begins: who cooks what, who performs, and a thousand small negotiations',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Harvest',
      summary: 'The festival, the Greystone confrontation, and the question: are they one community or two?',
      keyEvents: [
        'The harvest festival: a celebration of what both communities built together. If the party managed the festival planning well, the food is a mix of goblin, kobold, and human recipes. If not, there are two separate tables.',
        'Greystone Mining arrives with a court order and a mercenary escort',
        'The village votes: fight together or abandon the monsters to save themselves. Elder Brynn stands and says something she has never said publicly. The vote turns on her words.',
        'Quiet moment: after the vote, Grikkle finds the party. He does not say thank you. He says: "My children will remember this. Their children will remember this."',
        'United resistance: goblin traps, kobold engineering, owlbear strength, human organization',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Brynn',
      role: 'village leader / reluctant ally',
      personality: 'A practical woman who does not hate the monsters but fears what their presence will cost the village. She comes around slowly, and only when the evidence is overwhelming.',
      secret: 'Her late husband was half-orc. She hid it her entire life. The monsters arriving forces her to confront her own hypocrisy.',
    },
    {
      name: 'Grikkle',
      role: 'goblin community leader',
      personality: 'A weary goblin elder who has led his people through displacement before. Patient, dignified, and tired of proving his people deserve basic decency. "We are not asking for much. A roof. A school. A chance."',
    },
    {
      name: 'Tinka and Bor',
      role: 'the owlbear couple',
      personality: 'Surprisingly gentle. Tinka arranges wildflowers. Bor carves wooden toys. Their cubs are chaos incarnate but mean no harm. Communication is limited but their intentions are unmistakable.',
    },
    {
      name: 'Superintendent Harsk',
      role: 'Greystone Mining representative / antagonist',
      personality: 'A corporate man in a medieval world. Polite, legal, and utterly indifferent to the lives he destroys. "We have the rights. We have the permits. Your feelings are not our concern."',
    },
  ],
  keyLocations: [
    {
      name: 'Millhaven',
      description:
        'A quiet farming village with a market square, a school, and a church. The kind of place where nothing happens - until everything does. By Act 3, the market square has goblin and human stalls side by side.',
      significance: 'The entire campaign setting.',
    },
    {
      name: 'The Monster Quarter',
      description:
        'The edge of town where the monster community has settled. Goblin warrens alongside kobold workshops alongside an owlbear den that used to be a barn. Tinka planted wildflowers along the fence. Bor carved a welcome sign in three languages.',
      significance: 'Where most cross-cultural encounters happen.',
    },
    {
      name: 'Greystone Hills',
      description:
        'The hills outside town, rich in ore. Beautiful wildflower meadows about to become an open-pit mine. The owlbear cubs play here. The goblin children forage here. It is the only place both communities already share.',
      significance: 'The stakes made physical. What both communities stand to lose.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'diplomaticNegotiation',
    'festivalAdvanced',
    'rumorMill',
    'settlementEvent',
    'backstoryComplication',
    'factionWar',
  ],
};
