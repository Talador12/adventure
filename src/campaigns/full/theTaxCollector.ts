import type { FullCampaign } from '../types';

export const theTaxCollector: FullCampaign = {
  id: 'full-tax-collector',
  type: 'full',
  title: 'The Tax Collector',
  tagline: 'The dragon owes back taxes. You\'re here to collect.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The kingdom\'s Bureau of Revenue has discovered that the dragon Scorchtail has been sitting on a mountain of gold for 400 years without paying property tax, income tax, or hoard appreciation tax. Someone has to collect. Every knight sent has been eaten. The Bureau decides to try a different approach: send accountants with adventurer escorts. The party is the escort. The accountant is very thorough.',
  hook: 'The party is hired by the Bureau of Revenue: "Escort our Senior Tax Assessor to the dragon\'s lair. Ensure the assessment is completed. Use of force is authorized but discouraged — the Bureau prefers to resolve tax disputes through proper channels. The dragon has been sent a formal notice. It ate the courier."',
  twist:
    'Scorchtail isn\'t evading taxes — she doesn\'t know taxes exist. She was asleep for the last 300 years and missed the establishment of the kingdom, its tax code, and civilization in general. She woke up to find a city built around her mountain and is genuinely confused. She\'s willing to pay — but she wants to negotiate, and dragon negotiation involves riddles, challenges, and very specific interpretations of contract law.',
  climax:
    'The tax assessment is almost complete when the Bureau\'s Director arrives with an army — he doesn\'t want the dragon to pay, he wants to seize the hoard as "unclaimed property." The party must choose: help Scorchtail fight (defending a tax-paying citizen), help the Director (legal but wrong), or find a legal solution that satisfies everyone (the hardest option and the funniest).',
  acts: [
    {
      title: 'Act 1: The Assessment',
      summary:
        'Traveling to the dragon\'s lair with the world\'s most dedicated tax assessor. Every encounter along the way involves the assessor trying to audit someone.',
      keyEvents: [
        'Meet the assessor: Percival Ledger, who has audited a king and survived',
        'The road: bandits (Percival tries to audit them), a troll bridge (Percival asks about toll permits). Running gag begins: Percival attempts to audit every creature the party encounters, regardless of species or hostility. His success rate is disturbingly high.',
        'Arrival at the mountain: the dragon\'s lair entrance has a "DO NOT DISTURB" sign',
        'First contact: Scorchtail wakes up, very confused about why tiny people are in her cave',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Negotiation',
      summary:
        'Scorchtail is willing to pay but has conditions. Dragon tax negotiation is a blend of riddles, cultural misunderstandings, and very literal contract interpretation.',
      keyEvents: [
        'Scorchtail\'s position: "I was here before your kingdom. The mountain is mine."',
        'Percival\'s response: "The mountain is in the kingdom. The kingdom has taxes."',
        'Dragon negotiation: riddles for each line item, challenges for disputed amounts',
        'A deal is almost reached — then the Bureau Director arrives with soldiers',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Audit',
      summary:
        'The Director wants to seize the hoard. Scorchtail is offended. Percival is furious about procedural violations. The party mediates a three-way dispute between a dragon, a bureaucrat, and an army.',
      keyEvents: [
        'The Director: "The hoard is unclaimed property. Seize it."',
        'Scorchtail: "I just agreed to PAY and now you want to STEAL?"',
        'Percival: "This is a massive breach of protocol. I\'m filing a complaint."',
        'Resolution: legal battle, physical battle, or the funniest compromise imaginable. Callback: Percival audits Director Graves and discovers HE has been evading taxes. The auditor becomes the audited. Percival has never been happier.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Scorchtail',
      role: 'the taxpayer',
      personality:
        'A 700-year-old red dragon who napped through the rise of civilization. Grumpy, confused, and increasingly charmed by Percival\'s dedication. "You\'re the first tiny person who wasn\'t afraid of me. I respect that. I still might eat you, but I respect it."',
      secret: 'She\'s lonely. The negotiation is the most social interaction she\'s had in centuries.',
    },
    {
      name: 'Percival Ledger',
      role: 'tax assessor / unstoppable force',
      personality:
        'A halfling accountant with the courage of a paladin and the dedication of a zealot. He has audited a king. A dragon is just a bigger filing. "The tax code applies to ALL residents. There are no exceptions. Not even for fire breath."',
    },
    {
      name: 'Director Graves',
      role: 'bureaucratic villain',
      personality:
        'The Bureau Director who wants the hoard, not the taxes. Corrupt, ambitious, and hiding behind legal language. "The dragon is a threat to public safety. The hoard is a public asset."',
    },
    {
      name: 'Scales (Scorchtail\'s kobold accountant)',
      role: 'comic relief / surprisingly competent',
      personality:
        'A kobold who has been keeping Scorchtail\'s books (badly) for decades. "The boss has assets! I have ledgers! They are mostly drawings but VERY detailed drawings!"',
    },
  ],
  keyLocations: [
    {
      name: 'Scorchtail\'s Mountain',
      description: 'A mountain with a city built around its base. The dragon\'s lair entrance is marked with a faded "DO NOT DISTURB" sign from 300 years ago.',
      significance: 'Where the negotiation takes place.',
    },
    {
      name: 'The Hoard',
      description: 'Scorchtail\'s treasure pile — 400 years of accumulated wealth. Also includes some things that aren\'t treasure (she collected a wagon once).',
      significance: 'The assessed property and the disputed asset.',
    },
    {
      name: 'The Bureau of Revenue',
      description: 'A government building that is exactly as exciting as it sounds. Every surface has a form. The coffee is terrible.',
      significance: 'Where the adventure is issued and the Director plots.',
    },
  ],
  dataSystems: [
    'dragonPersonality',
    'merchantHaggling',
    'socialEncounter',
    'questRewardNegotiation',
    'diplomaticNegotiation',
    'combatNarration',
    'fantasyInsults',
    'riddleGenerator',
    'encounterWaves',
  ],
};
