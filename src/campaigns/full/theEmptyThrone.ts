import type { FullCampaign } from '../types';

export const theEmptyThrone: FullCampaign = {
  id: 'full-empty-throne',
  type: 'full',
  title: 'The Empty Throne',
  tagline: 'The king died with no heir. You have 30 days to find one — or become one.',
  tone: 'political',
  themes: ['intrigue', 'classic_fantasy', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 15,
  settingSummary:
    'King Aldric is dead. He had no children, no will, and no plan. The kingdom of Verdania has 30 days before the neighboring empires smell weakness and invade. The Royal Council appoints the party as Throne-seekers: find a legitimate heir, or the kingdom falls. The problem: there are seven claimants, all plausible, all flawed, and at least one is a fraud.',
  hook: 'The Royal Chamberlain bursts into the party\'s room: "The king is dead. There is no heir. You have one month to find one or this kingdom ceases to exist. Here is a list of seven people who claim the bloodline. Find the true one. Please."',
  twist:
    'There IS no legitimate heir. The royal bloodline ended with Aldric. The Chamberlain knows this — he hired the party to buy time while he forges documents to make the best candidate appear legitimate. The "best candidate" is whoever the party recommends. The fraud is the Chamberlain\'s plan, not any of the claimants.',
  climax:
    'The party discovers the truth: no heir exists. The Chamberlain confesses. With 3 days left, the party must choose: support the forgery (picking the best leader regardless of blood), reveal the truth (causing chaos but enabling a new form of government), or claim the throne themselves (they\'ve earned the people\'s trust).',
  acts: [
    {
      title: 'Act 1: The Claimants',
      summary: 'Meeting all seven claimants, investigating their claims, and navigating the politics of a kingdom in crisis.',
      keyEvents: [
        'The seven claimants: a soldier, a merchant, a priestess, a farmer, a scholar, a child, and a foreigner',
        'Each has evidence: family trees, heirlooms, birthmarks, witnesses',
        'Political pressure: noble houses backing different claimants',
        'The neighboring empire moves troops to the border — the clock is real',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Investigation',
      summary: 'Deep investigation. Traveling to birthplaces, consulting records, testing bloodlines. Claimants are eliminated. The truth becomes harder to find.',
      keyEvents: [
        'The Royal Archive: birth records, marriage records, some suspiciously altered',
        'Two claimants are definitively eliminated — their evidence is forged',
        'Three claimants have plausible claims — but something doesn\'t add up',
        'The Chamberlain\'s behavior becomes suspicious — he steers the party toward specific candidates',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Truth',
      summary: 'No heir exists. The Chamberlain\'s plan is exposed. The party must decide the kingdom\'s future in 3 days.',
      keyEvents: [
        'Final evidence: the bloodline records are complete — Aldric was the last',
        'The Chamberlain confesses: "I needed time. You gave me that. Now choose."',
        'Three options: forge a king, reveal the truth, or take the throne',
        'The coronation — whoever sits on the throne, the kingdom watches',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Chamberlain Voss',
      role: 'quest giver / secret manipulator',
      personality: 'A loyal servant of the crown who has served three kings. Pragmatic to a fault. He would rather forge a king than let the kingdom fall.',
      secret: 'He has already forged documents for two of the seven claimants — whichever the party prefers.',
    },
    {
      name: 'Sera Brightfield (claimant: farmer)',
      role: 'best candidate / genuine',
      personality: 'A farmer who didn\'t know she had royal blood (she doesn\'t). Kind, practical, beloved by common people. Would make an excellent ruler. Has zero actual claim.',
    },
    {
      name: 'Lord Kael Ashford (claimant: soldier)',
      role: 'strongest candidate / dangerous',
      personality: 'A decorated general with a plausible claim and the army\'s loyalty. Would be an effective ruler — but might become a tyrant.',
    },
    {
      name: 'Ambassador Thorne',
      role: 'foreign pressure',
      personality: 'The neighboring empire\'s ambassador, politely reminding everyone that an empty throne invites... assistance. "We only want to help. With our army."',
    },
  ],
  keyLocations: [
    { name: 'The Throne Room', description: 'An empty throne on a dais. The crown sits on a pillow. Nobody dares touch it.', significance: 'The visual symbol of the crisis and the climax location.' },
    { name: 'The Royal Archive', description: 'Centuries of records in a dusty basement. Birth records, marriage records, and increasingly suspicious gaps.', significance: 'Where the investigation yields — and fails to yield — answers.' },
    { name: 'The Border', description: 'The eastern frontier where an empire\'s army gathers. Scouts report increasing numbers daily.', significance: 'The ticking clock made physical.' },
  ],
  dataSystems: ['courtIntrigue', 'politicalEvent', 'detectiveCase', 'diplomaticNegotiation', 'factionReputation', 'npcRelationshipWeb', 'socialEncounter', 'nobleScandalGen', 'warRoomBriefing'],
};
