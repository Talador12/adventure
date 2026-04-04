import type { FullCampaign } from '../types';

export const theRevolutionWillBeNarrated: FullCampaign = {
  id: 'full-revolution-narrated',
  type: 'full',
  title: 'The Revolution Will Be Narrated',
  tagline: 'The bard started a revolution. Now she needs someone to win it.',
  tone: 'political',
  themes: ['intrigue', 'war', 'urban'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'A bard named Lyra sang a song so powerful it sparked a revolution in the merchant-oligarchy of Veldross. The people rose up. The oligarchs retreated behind walls. Now the revolution is stuck — the people have passion but no army, and the oligarchs have gold but no legitimacy. Both sides hire the party for different reasons. The party must decide: support the revolution, support the oligarchs, play both sides, or forge a third path.',
  hook: 'The party arrives in Veldross to find barricades in the streets, protest songs on every corner, and a city split in two. A messenger from each side arrives within an hour — the revolutionaries want soldiers, the oligarchs want spies. Lyra herself shows up last: "I started this. I can\'t finish it. The song was easy. Governing is hard."',
  twist:
    'Lyra\'s song was magically enhanced — not by her, but by a patron she doesn\'t know she has. A fey lord is using the revolution as entertainment, amplifying emotions on both sides to keep the conflict going. It doesn\'t want the revolution to succeed or fail — it wants the drama to continue. The party must break the fey\'s influence to let the people decide their own fate.',
  climax:
    'The fey lord escalates — enchanting both sides into a frenzy. The city is about to tear itself apart. The party must neutralize the fey enchantment, calm the city, and facilitate either a resolution (negotiated peace, free elections, or continued revolution) before the violence becomes irreversible.',
  acts: [
    {
      title: 'Act 1: The Barricades',
      summary:
        'Arriving in Veldross, meeting both sides, and choosing (or refusing to choose) an allegiance. The revolution is stuck in a standoff.',
      keyEvents: [
        'The city divided: revolutionary-held lower city vs. oligarch-held upper city',
        'Meeting Lyra — charismatic, overwhelmed, and realizing songs don\'t build governments',
        'Meeting the oligarchs — some are tyrants, some are reasonable, all are scared',
        'First assignment: whoever the party works for, the task is the same — break the standoff',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Song Behind the Song',
      summary:
        'The party discovers the fey influence. Emotions are too hot on both sides — people who were negotiating yesterday are calling for blood today. Something is amplifying the conflict.',
      keyEvents: [
        'Negotiations that should work keep failing — people change their minds overnight',
        'Lyra\'s song analyzed: there\'s an enchantment woven into the melody she didn\'t put there',
        'The fey lord\'s agents identified: they\'re in BOTH camps, stirring the pot',
        'Lyra is horrified — "I started a revolution with someone else\'s magic?"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The People Decide',
      summary:
        'Breaking the fey enchantment, calming the city, and facilitating an actual political resolution — which is harder than fighting a dragon.',
      keyEvents: [
        'Confronting the fey lord — who finds the whole thing hilarious',
        'Breaking the enchantment — the city suddenly feels the emotional hangover',
        'The real negotiation: both sides, raw and unenchanted, must talk',
        'The party facilitates: elections, compromise, restructuring, or partition',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Lyra Songfire',
      role: 'revolutionary leader / overwhelmed bard',
      personality:
        'A brilliant bard who can inspire thousands but can\'t organize a supply chain. Charismatic, idealistic, and increasingly aware that starting a revolution is easier than running one.',
      secret: 'She suspects the fey influence. She\'s been afraid to investigate because if the revolution was built on lies, everything she\'s fought for collapses.',
    },
    {
      name: 'Archon Maren Goldvein',
      role: 'oligarch leader / not purely villain',
      personality:
        'Head of the merchant council. Built her fortune through genuine skill. Believes the oligarchy is flawed but that revolution will be worse. "I\'ve seen what happens when the mob rules. It\'s not pretty."',
    },
    {
      name: 'Lord Quicksilver',
      role: 'fey antagonist',
      personality:
        'A fey lord of stories and drama. To him, Veldross is the best show he\'s seen in centuries. Doesn\'t want anyone to win. "A good story needs conflict. Resolution is boring."',
    },
    {
      name: 'Forge',
      role: 'revolutionary commander / pragmatist',
      personality:
        'A former soldier who leads the revolutionary militia. Unlike Lyra, he thinks in tactics and supply lines, not songs. Frustrated with idealism. "I can hold a barricade. I can\'t hold an ideology."',
    },
  ],
  keyLocations: [
    {
      name: 'Lower Veldross',
      description: 'The working-class districts, now revolutionary territory. Barricades on every corner, protest art on every wall, and a makeshift government in a tavern.',
      significance: 'The revolutionary side.',
    },
    {
      name: 'Upper Veldross',
      description: 'The wealthy districts behind iron gates. Quiet, orderly, and very nervous. The oligarchs meet in the Goldvein Exchange.',
      significance: 'The establishment side.',
    },
    {
      name: 'The Song Hall',
      description: 'Where Lyra first sang the revolutionary anthem. Now a shrine, a meeting place, and the location where the fey enchantment is strongest.',
      significance: 'Where the fey influence is discovered and broken.',
    },
  ],
  dataSystems: [
    'politicalEvent',
    'factionWar',
    'factionReputation',
    'diplomaticNegotiation',
    'socialEncounter',
    'courtIntrigue',
    'partyMoraleTracker',
    'npcRelationshipWeb',
    'warRoomBriefing',
  ],
};
