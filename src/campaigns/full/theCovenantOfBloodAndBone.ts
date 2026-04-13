import type { FullCampaign } from '../types';

export const theCovenantOfBloodAndBone: FullCampaign = {
  id: 'full-covenant-blood-bone',
  type: 'full',
  title: 'The Covenant of Blood and Bone',
  tagline: 'Two kingdoms bound by a marriage that must never be consummated.',
  tone: 'serious',
  themes: ['political', 'intrigue', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 14,
  settingSummary:
    'The Crimson Kingdom and the Ivory Kingdom have been at war for three centuries. Twenty years ago, a peace was brokered through the engagement of their infant heirs—the Blood Prince and the Bone Princess. The wedding is finally approaching, but both kingdoms have spent twenty years preparing for betrayal. The party is hired as neutral security for the ceremony.',
  hook: 'The party is recruited by the Neutral Concord to ensure the wedding proceeds safely. They quickly discover that multiple factions want the marriage to fail—and others want it to succeed too well, triggering a magical binding that would merge both kingdoms by force.',
  twist:
    'The engagement contract contains hidden clauses written in magical ink. If the marriage is consummated, it triggers a ritual that will sacrifice both royals to create an undying emperor who rules both kingdoms forever. The original contract writer has been planning this for centuries.',
  climax:
    'During the wedding ceremony, the party must expose the conspiracy, prevent the ritual\'s activation, and help the prince and princess either complete a genuine marriage on their own terms or find another way to secure peace.',
  acts: [
    {
      title: 'Act 1: The Wedding Preparations',
      summary:
        'The party arrives at the neutral ground where the wedding will occur. They navigate tensions between Crimson and Ivory delegations, discover assassination plots, and learn about the mysterious original contract.',
      keyEvents: [
        'Arrival at the Concord Fields—both kingdoms\' armies camped within view',
        'Thwarting an assassination attempt on the Blood Prince',
        'Discovery of the original contract in the Neutral Concord archives',
        'Meeting the contracted lovers—Prince Kael and Princess Lys—who actually like each other',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Hidden Clauses',
      summary:
        'The party investigates the true nature of the engagement contract, uncovering centuries of manipulation. They find the original contract writer—still alive through dark magic—and learn the full scope of the ritual.',
      keyEvents: [
        'Discovering the magical ink that reveals hidden text under specific conditions',
        'Tracking the contract writer to his hidden sanctuary',
        'Learning the ritual requires both royal bloodlines to create an eternal ruler',
        'Prince Kael and Princess Lys learn the truth and must decide their fate',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Wedding Day',
      summary:
        'On the day of the wedding, everything comes together. The party must prevent the ritual, stop the conspirators, and give the prince and princess a chance to choose their own future.',
      keyEvents: [
        'The ceremony begins—both kingdoms\' nobles present, tensions at maximum',
        'The contract writer attempts to force the ritual',
        'The prince and princess refuse to participate, choosing genuine love over magical binding',
        'A new peace treaty negotiated without dark magic, witnessed by all',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Prince Kael of Crimson',
      role: 'royal ally',
      personality:
        'Warrior prince raised to hate the Ivory Kingdom but genuinely desiring peace. Courageous, stubborn, unexpectedly romantic.',
    },
    {
      name: 'Princess Lys of Ivory',
      role: 'royal ally',
      personality:
        'Scholar princess who studied the history of the war and wants to end it. Brilliant, diplomatic, willing to defy tradition.',
    },
    {
      name: 'The Arbiter',
      role: 'villain',
      personality:
        'The original contract writer, centuries old, convinced that only eternal rule can prevent war. Views the royals as necessary sacrifices.',
    },
    {
      name: 'Duke Voren',
      role: 'political obstacle',
      personality:
        'Crimson noble who profits from war and wants the wedding to fail. Willing to kill to maintain the status quo.',
      secret: 'He is already in contact with the Arbiter and has been promised rulership of both kingdoms if the covenant is renewed under his bloodline instead.',
    },
  ],
  keyLocations: [
    {
      name: 'The Concord Fields',
      description:
        'Neutral territory between kingdoms, site of the wedding. Two armies camped in tense proximity.',
      significance: 'Main setting for the campaign.',
    },
    {
      name: 'The Contract Archive',
      description:
        'Where the original engagement contract is stored, protected by ancient wards and hidden passages.',
      significance: 'Where the party discovers the hidden clauses.',
    },
    {
      name: 'The Arbiter\'s Sanctuary',
      description:
        'Hidden fortress where the contract writer has planned his scheme for centuries.',
      significance: 'Final confrontation site before returning for the wedding.',
    },
  ],
  dataSystems: ['politicalMarriage', 'magicalContract', 'courtIntrigue', 'nobleScandalGen'],
};
