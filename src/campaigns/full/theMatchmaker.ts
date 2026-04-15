import type { FullCampaign } from '../types';

export const theMatchmaker: FullCampaign = {
  id: 'full-the-matchmaker',
  type: 'full',
  title: 'The Matchmaker',
  tagline: 'A wedding to prevent a war. You are the wedding planners. Both families want blood.',
  tone: 'social',
  themes: ['social', 'intrigue', 'political'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 6 },
  estimatedSessions: 14,
  settingSummary:
    'Two noble houses - House Valdren and House Kethara - have feuded for three generations over a disputed border province. A marriage between their heirs could end the bloodshed. The party has been hired as event coordinators, mediators, and general miracle workers. The bride and groom genuinely love each other. Their families would rather see them dead than married. Every session is a new sabotage attempt, social catastrophe, or family scandal that threatens to collapse the arrangement.',
  hook: 'A royal decree mandates a peace wedding between the feuding houses. The crown hires the party to make it happen. On day one, someone poisons the wine tasting, House Valdren sends a champion to "test the groom\'s worthiness," and the bride\'s mother locks herself in a tower and refuses to come out. The wedding is in 30 days. Good luck.',
  twist:
    'Both families are right to hate each other - but not for the reasons they think. A third nation, the Serathi Consortium, engineered the original border dispute to weaken both houses. Now the Consortium has secretly funded the wedding. If the marriage goes through, Serathi inheritance law allows them to claim both kingdoms through a planted clause in the marriage contract. The wedding is a conquest disguised as peace.',
  climax:
    'The wedding day. The party discovers the Serathi plot hours before the ceremony. They cannot simply cancel - that restarts the war. They must rewrite the marriage contract, expose the Consortium agent embedded in the wedding party, and convince two families who hate each other that a third enemy has been playing them both for generations. All of this must happen before the vows are spoken.',
  acts: [
    {
      title: 'Act 1: The Engagement',
      summary: 'Meet the families, assess the damage, and survive the first week of planning. Both houses test the party constantly.',
      keyEvents: [
        'The poisoned wine tasting - an early sabotage attempt from an unknown source',
        'Meeting the bride (Sera Valdren) and groom (Theron Kethara) - genuinely in love, terrified of their families',
        'Quiet moment: Sera and Theron steal five minutes alone in the chapel garden. The party guards the door. Through the window, the couple is laughing. It is the only laughter anyone has heard in the manor.',
        'House Valdren demands a Trial of Worth - the groom must pass or the wedding is off',
        'House Kethara insists on rewriting the guest list to exclude half the Valdren family',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Planning',
      summary: 'Deeper sabotage, family secrets surface, and the party must manage escalating crises while keeping both sides at the table.',
      keyEvents: [
        'The groom\'s ex arrives claiming a prior engagement - legitimate or planted?',
        'A Valdren uncle hires mercenaries to kidnap the bride "for her own protection"',
        'The moment of cost: the party discovers both families share a common ancestor - a secret that could unite or destroy them. Matriarch Voss lost two sons to the feud. Telling her it was pointless could break her or save the wedding. The party must choose how and when.',
        'Quiet moment: Matriarch Voss finds Theron alone in the kitchen. She tests him with a question about her dead sons. His answer - honest, humble, grieving for people he never met - is the first crack in her armor.',
        'A mysterious benefactor keeps sending generous gifts. Too generous. The Serathi agent makes contact.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Wedding',
      summary: 'The final week. The Serathi plot revealed. A wedding that must happen but cannot happen as written.',
      keyEvents: [
        'The marriage contract is found to contain clauses nobody agreed to - inheritance language that hands both kingdoms to a foreign power',
        'The Serathi agent is someone the party trusted - a member of the wedding party. If the party investigated the mysterious gifts in Act 2, they catch the agent early. If not, the reveal comes at the altar.',
        'Both families must be told the truth: their feud was manufactured, and the wedding is a trap',
        'Quiet moment: Matriarch Voss and Sera\'s father stand in the chapel before the ceremony. Neither speaks. Then Voss says: "Your daughter has courage. My sons did too." It is the closest thing to a peace treaty either family has ever offered.',
        'A new contract, a real wedding, and two families that finally have a common enemy',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Sera Valdren',
      role: 'the bride',
      personality: 'Sharp, diplomatic, and exhausted by her family. She loves Theron and will fight her own house to marry him. "I have spent my entire life being a Valdren. I would like to spend the rest of it being something else."',
    },
    {
      name: 'Theron Kethara',
      role: 'the groom',
      personality: 'Quiet, kind, and surprisingly stubborn. He looks soft but he survived three assassination attempts from his own cousins. "I will marry her. I do not care what it costs."',
      secret: 'He knows about the planted contract clause but misunderstands its purpose - he thinks it is just a Valdren trick.',
    },
    {
      name: 'Ambassador Lysenne',
      role: 'Serathi agent / the hidden enemy',
      personality: 'The Consortium\'s representative, posing as a neutral mediator. Charming, helpful, always available. She has been engineering this wedding for a decade.',
      secret: 'She is the one who introduced Sera and Theron in the first place. The love is real. The marriage was her idea.',
    },
    {
      name: 'Matriarch Voss Kethara',
      role: 'the groom\'s grandmother / family opposition',
      personality: 'A fierce old woman who lost two sons to the Valdren feud. She does not want peace. She wants victory. "Peace is what the losing side calls surrender."',
    },
  ],
  keyLocations: [
    {
      name: 'Thornfield Manor',
      description:
        'The neutral estate chosen for the wedding. Grand, crumbling, and haunted by the ghost of the original dispute. Valdren and Kethara banners hang on opposite walls of the dining hall. By Act 3, someone has moved them closer.',
      significance: 'Where the entire campaign takes place. Every room has seen a fight.',
    },
    {
      name: 'The Chapel of Accord',
      description:
        'A centuries-old chapel on the estate grounds where the ceremony will be held. Beautiful stained glass depicting a peace that never existed. Until now.',
      significance: 'The wedding venue and the site of the final confrontation.',
    },
    {
      name: 'The Treaty Room',
      description:
        'A locked room containing the original documents of the border dispute. Dusty, forgotten, and full of evidence that the Serathi Consortium wrote the first provocation.',
      significance: 'Where the Serathi plot is uncovered.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'diplomaticNegotiation',
    'courtIntrigue',
    'backstoryComplication',
    'festivalAdvanced',
    'rumorMill',
    'factionWar',
  ],
};
