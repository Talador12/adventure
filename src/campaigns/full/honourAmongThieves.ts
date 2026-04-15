import type { FullCampaign } from '../types';

export const honourAmongThieves: FullCampaign = {
  id: 'full-honour-among-thieves',
  type: 'full',
  title: 'Honour Among Thieves',
  tagline: 'You steal from the rich. You give to the poor. You always leave a thank-you note.',
  tone: 'social',
  themes: ['social', 'urban', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 2, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Ashenmoor is rotten from the top. The merchant lords fix prices, the magistrates fix courts, and the guard fixes anyone who complains. The poor pay taxes that fund mansions they will never enter. The wages the workers earn are skimmed by middlemen who own the contracts. It is legal. All of it. The law was written by the people it protects. The Kindly Ones are a thieves guild with a code stricter than most knightly orders: never steal from those who have less than you. Never take what someone needs to survive. Always leave something in return — a coin, a flower, a note that says "you were robbed by better people than you."',
  hook: 'A textile worker named Ada comes to the Kindly Ones with a problem: her employer, Merchant Lord Halverson, has been skimming wages from every worker in his factory for two years. The stolen wages total six thousand gold. Ada cannot go to the magistrate because Halverson owns the magistrate. She cannot strike because Halverson owns the guard. She asks the guild: can you steal back what he stole from us? The party says yes. The first job is personal, specific, and righteous. Every job after that raises the bar.',
  twist:
    'The guild\'s founder, a woman named Mira, was a paladin of Tyr who lost her faith. Not because the god failed her — because the system that claimed to deliver justice was itself the injustice. She did not abandon her oath. She redirected it. She built the Kindly Ones on the same principles she swore as a paladin: protect the innocent, punish the guilty, never take more than justice requires. The Code is not a thieves\' charter. It is a paladin\'s oath rewritten for people who realized that working within the system was working for the system.',
  climax:
    'The merchant lords have identified the Kindly Ones and are closing in. The party must pull one final job: break into the Hall of Records and expose every corrupt contract, every skimmed wage, every bribed magistrate — not for profit, but for the public. If the evidence reaches the people, the merchant lords fall. If it does not, the Kindly Ones are destroyed and the corruption continues. The final heist is not stealing something. It is giving something back.',
  acts: [
    {
      title: 'Act 1: The Code',
      summary:
        'The party joins the Kindly Ones and learns the Code. Jobs are small and personal: recovering stolen wages, forging documents to free indentured workers, breaking into a granary to redistribute hoarded food during a shortage. Each job builds the guild\'s reputation in the slums.',
      keyEvents: [
        'The Halverson job: infiltrate the factory, find the ledgers, steal exactly 6,000 gold. Not a coin more.',
        'Redistribution: delivering the stolen wages back to the workers in unmarked envelopes. Ada cries.',
        'The Code in practice: a job to rob a minor noble. The party discovers he is barely solvent. The Code says no.',
        'A forgery job: creating freedom papers for an indentured family. The party learns document craft.',
        'The granary break-in: a food merchant is hoarding grain during a shortage. The party liberates forty barrels.',
        'The slums start whispering: "The Kindly Ones took care of it." Reputation grows.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Escalation',
      summary:
        'The jobs get bigger and the moral complexity deepens. The party targets the systems, not just individuals — corrupt courts, rigged contracts, guard captains on the payroll. The merchant lords start fighting back.',
      keyEvents: [
        'A corrupt magistrate\'s private ledger reveals the full scope: every merchant lord is connected',
        'The party breaks into a debtor\'s prison to free workers jailed for "contract violations" (striking)',
        'A guild member is captured. The party must choose: rescue mission or protect the guild\'s location',
        'The merchant lords hire professional hunters. The party is now being hunted while hunting.',
        'A moral dilemma: a target is corrupt but also funds an orphanage. Stealing from him closes it.',
        'The party meets Mira for the first time. She is old, tired, and still furious.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Reckoning',
      summary:
        'The final job. The Hall of Records contains proof of everything. The party must steal it, copy it, and distribute it to the city before the merchant lords can suppress it. This is the heist that ends the corruption — or the Kindly Ones.',
      keyEvents: [
        'Planning: the Hall of Records has magical wards, guard rotations, and a records keeper who sleeps in the vault',
        'Infiltration night: the most complex job the party has ever attempted',
        'Complication: the merchant lords anticipated this. The records have been moved. The party must improvise.',
        'The distribution: copies of the evidence appear on every tavern door, every market stall, every church step',
        'The people read the evidence. The merchant lords cannot suppress what everyone already knows.',
        'Aftermath: the system does not change overnight. But it starts. Mira watches from a rooftop and finally smiles.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Mira',
      role: 'guild founder / former paladin',
      personality:
        'White-haired, sharp-eyed, moves like someone who trained with a sword for twenty years. She still prays to Tyr. She just does it differently now. Every rule in the Code sounds like an oath because it is one.',
      secret: 'She can still channel divine magic. Tyr never revoked her power. He approves of what she built. She does not know this because she stopped asking.',
    },
    {
      name: 'Ada',
      role: 'catalyst / community leader',
      personality:
        'A textile worker who came to the guild for help and stayed to help others. No combat skills. No magic. Just courage and an understanding of how the poor actually live, which is information the party needs more than any spell.',
    },
    {
      name: 'Merchant Lord Halverson',
      role: 'primary antagonist / systemic evil',
      personality:
        'Does not twirl a mustache. Does not cackle. Genuinely believes his business practices are normal and that workers complaining about wages are ungrateful. The most dangerous kind of villain: one who does not think he is one.',
    },
    {
      name: 'Wren',
      role: 'guild member / moral anchor',
      personality:
        'The guild\'s best thief and the party\'s conscience. Tiny, quiet, and absolutely unwilling to cross the Code for any reason. If a job violates the Code, Wren will refuse it even if it means letting a bigger injustice stand. Principles are not convenient. That is what makes them principles.',
    },
  ],
  keyLocations: [
    {
      name: 'The Kindly House',
      description:
        'A bakery that serves as the guild\'s front. The basement is the planning room. The bread is genuinely excellent. Customers sometimes wonder why the baker knows so much about lock mechanisms.',
      significance: 'Guild headquarters. Where jobs are planned and the Code is taught.',
    },
    {
      name: 'The Warrens (Ashenmoor Slums)',
      description:
        'Dense, poor, and alive. The people here know the Kindly Ones and protect them with silence. Guards who enter the Warrens find that nobody sees anything, hears anything, or knows anything.',
      significance: 'The community the guild serves. Their support is the guild\'s armor.',
    },
    {
      name: 'The Hall of Records',
      description:
        'A fortified building where every contract, deed, and legal document in Ashenmoor is stored. Warded, guarded, and containing the proof of every corrupt deal the merchant lords have ever made.',
      significance: 'The final heist target. Stealing the evidence here exposes the entire system.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'socialEncounter',
    'factionReputation',
    'npcRelationshipWeb',
    'disguiseIdentity',
    'moralDilemma',
    'politicalIntrigue',
    'detectiveCase',
  ],
};
