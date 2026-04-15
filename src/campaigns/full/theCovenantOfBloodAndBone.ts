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
    'The Crimson Kingdom and the Ivory Kingdom have been at war for three centuries. Twenty years ago, a peace was brokered through the engagement of their infant heirs - the Blood Prince and the Bone Princess. The wedding is finally approaching, but both kingdoms have spent twenty years preparing for betrayal. The party is hired as neutral security for the ceremony.',
  hook: 'The party is recruited by the Neutral Concord to ensure the wedding proceeds safely. They quickly discover that multiple factions want the marriage to fail - and others want it to succeed too well, triggering a magical binding that would merge both kingdoms by force.',
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
        'Arrival at the Concord Fields - both kingdoms\' armies camped within view. Crimson tents to the east. Ivory tents to the west. The party camps in between.',
        'Thwarting an assassination attempt on the Blood Prince. The assassin is Crimson, not Ivory. Someone wants the prince dead from his own side.',
        'Discovery of the original contract in the Neutral Concord archives. The ink shifts when nobody is looking.',
        'Meeting the contracted lovers - Prince Kael and Princess Lys - who actually like each other. They have been exchanging letters in secret for years.',
        'Quiet moment: Kael and Lys meet at the river between the camps. He brought her a book. She brought him a sword. They laugh at each other\'s gifts. The party sees what peace could actually look like.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Hidden Clauses',
      summary:
        'The party investigates the true nature of the engagement contract, uncovering centuries of manipulation. They find the original contract writer - still alive through dark magic - and learn the full scope of the ritual.',
      keyEvents: [
        'Discovering the magical ink that reveals hidden text under specific conditions. The contract has three layers. The third is written in blood.',
        'Tracking the contract writer to his hidden sanctuary beneath the Concord Fields themselves. He has been here for centuries, waiting.',
        'Learning the ritual requires both royal bloodlines to create an eternal ruler. The contract was designed to weaponize love.',
        'The moment of cost: Duke Voren captures Princess Lys. The party must rescue her, but doing so means revealing the conspiracy before they have enough evidence to prove it.',
        'Prince Kael and Princess Lys learn the truth and must decide their fate. Kael draws his sword. Lys takes it from him. "Swords started this. We end it differently."',
        'If the party built trust with both delegations in Act 1, nobles from each side secretly offer help.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Wedding Day',
      summary:
        'On the day of the wedding, everything comes together. The party must prevent the ritual, stop the conspirators, and give the prince and princess a chance to choose their own future.',
      keyEvents: [
        'The ceremony begins - both kingdoms\' nobles present, tensions at maximum. The Arbiter watches from the crowd.',
        'Quiet moment: before the ceremony, Kael asks a party member to hold his ring. "If this goes wrong, give it to her anyway. She should know it was real."',
        'The contract writer attempts to force the ritual. The contract glows. The air splits.',
        'The prince and princess refuse to participate in the ritual, choosing genuine love over magical binding. They rewrite the vows in their own words.',
        'A new peace treaty negotiated without dark magic, witnessed by all. The party signs as witnesses. Two kingdoms exhale.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Prince Kael of Crimson',
      role: 'royal ally',
      personality:
        'Warrior prince raised to hate the Ivory Kingdom but genuinely desiring peace. Courageous, stubborn, unexpectedly romantic. Fidgets with a signet ring when nervous. Writes terrible poetry for Lys and knows it is terrible. "I am better with a sword. Words are her weapon."',
      secret: 'Arc: begins as a prince defined by duty, becomes a man defined by choice. His growth is measured in how he handles the moment he learns his marriage was designed to kill him.',
    },
    {
      name: 'Princess Lys of Ivory',
      role: 'royal ally',
      personality:
        'Scholar princess who studied the history of the war and wants to end it. Brilliant, diplomatic, willing to defy tradition. Speaks three languages and uses whichever one conveys the sharpest point. Braids her hair differently for each kingdom\'s customs. "I refuse to be a symbol. I am a person who happens to wear a crown."',
    },
    {
      name: 'The Arbiter',
      role: 'villain',
      personality:
        'The original contract writer, centuries old, convinced that only eternal rule can prevent war. Views the royals as necessary sacrifices. Speaks in legal language even in casual conversation. "The terms are clear. The precedent is set. Objections are overruled." Arc: unwavering. Some villains do not change. He has spent three centuries on this plan and will not hear reason.',
    },
    {
      name: 'Duke Voren',
      role: 'political obstacle',
      personality:
        'Crimson noble who profits from war and wants the wedding to fail. Smiles with too many teeth. Pats people on the back while planning their ruin. "I am a patriot. I want what is best for the kingdom. It simply happens that what is best for the kingdom is also best for me."',
      secret: 'He is already in contact with the Arbiter and has been promised rulership of both kingdoms if the covenant is renewed under his bloodline instead.',
    },
  ],
  keyLocations: [
    {
      name: 'The Concord Fields',
      description:
        'Neutral territory between kingdoms, site of the wedding. Two armies camped in tense proximity. The wedding pavilion stands in the exact center, built from materials donated by both kingdoms.',
      significance: 'Main setting for the campaign. The geography mirrors the politics.',
    },
    {
      name: 'The Contract Archive',
      description:
        'Where the original engagement contract is stored, protected by ancient wards and hidden passages. The deeper you go, the older the documents. The oldest predate both kingdoms.',
      significance: 'Where the party discovers the hidden clauses.',
    },
    {
      name: 'The Arbiter\'s Sanctuary',
      description:
        'Hidden fortress beneath the Concord Fields where the contract writer has planned his scheme for centuries. Walls lined with drafts of the contract. Hundreds of versions. He has been perfecting this for longer than most nations have existed.',
      significance: 'Where the conspiracy is confirmed and the final confrontation takes place.',
    },
  ],
  dataSystems: [
    'politicalMarriage',
    'magicalContract',
    'courtIntrigue',
    'nobleScandalGen',
    'socialEncounter',
    'diplomaticNegotiation',
  ],
};
