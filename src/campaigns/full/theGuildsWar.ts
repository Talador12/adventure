import type { FullCampaign } from '../types';

export const theGuildsWar: FullCampaign = {
  id: 'full-guilds-war',
  type: 'full',
  title: 'The Guilds\' War',
  tagline: 'Thieves vs. mages vs. fighters vs. merchants. Pick a side. Betray them later.',
  tone: 'political',
  themes: ['intrigue', 'urban', 'war'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 16,
  settingSummary:
    'The city of Crossroads is governed by four guilds in uneasy balance: the Thieves\' Guild, the Mages\' College, the Fighters\' Union, and the Merchants\' League. The balance has held for a century. It just broke. A priceless artifact — the Keystone that magically enforces guild territory boundaries — has been stolen, and every guild accuses the others. Without the Keystone, guild territory is open season. War is coming.',
  hook: 'The party walks into Crossroads as the city fractures. Barricades go up on guild boundaries. The neutral tavern where they\'re staying is the last safe ground. A representative from each guild offers them a contract: find the Keystone. Four contracts. Four agendas. The party can accept one, all four, or none.',
  twist:
    'The Keystone wasn\'t stolen by any guild — it was taken by the city itself. Crossroads is built on a sentient ley line nexus that has been enforcing balance through the Keystone for a century. It removed the Keystone because the balance has become oppressive: the guilds have crystallized into oligarchies, and the citizens who belong to NO guild are invisible. The nexus wants change.',
  climax:
    'Full guild war in the streets. The party has the choice: return the Keystone (restoring the old balance — comfortable but unjust), destroy it (forcing the guilds to negotiate without magical enforcement — risky but potentially better), or reprogram it (the nexus offers a new configuration that includes citizens without guild affiliation — a fifth seat at the table).',
  acts: [
    {
      title: 'Act 1: The Fracture',
      summary: 'The Keystone vanishes. Guilds mobilize. The party takes contracts and navigates increasingly hostile territory.',
      keyEvents: [
        'The theft: the Keystone vanishes from its vault — no evidence, no witnesses',
        'Four contracts offered: investigate for all four (or pick a side)',
        'Guild territories become hostile: thieves close the alleys, mages ward their district, fighters patrol borders, merchants raise prices',
        'First clue: the vault wasn\'t breached from outside — the Keystone left on its own',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Investigation',
      summary: 'Each guild suspects the others. The party investigates while navigating four-way political chess. The truth about the ley line nexus emerges.',
      keyEvents: [
        'Thieves\' evidence: they have alibis (suspiciously perfect ones)',
        'Mages\' evidence: divination shows the Keystone moved underground — into the ley lines',
        'The nexus communicates: through tremors, through the city\'s architecture shifting',
        'Street skirmishes escalate — the party must prevent full-scale war while investigating',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Reckoning',
      summary: 'The nexus reveals itself. The guilds converge. Full war or a new deal — the party decides.',
      keyEvents: [
        'The nexus manifests: the streets rearrange into a meeting hall made of the city itself',
        'The nexus speaks: "The balance was a cage. For the guilds AND for the people they excluded."',
        'The guilds arrive with armies — they want the Keystone back, not a conversation',
        'The choice: restore, destroy, or reprogram — each reshapes Crossroads permanently',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Shadow (Thieves\' Guild)',
      role: 'guild leader / charming rogue',
      personality: 'Runs the Thieves\' Guild with style. Steals from the rich, gives to the poor (after keeping a 60% commission). "I didn\'t steal the Keystone. I would have, but someone beat me to it."',
      secret: 'She was planning to steal the Keystone anyway — to renegotiate territory. The nexus beat her by a day.',
    },
    {
      name: 'Archmage Quill (Mages\' College)',
      role: 'guild leader / reasonable',
      personality: 'The most level-headed guild leader. Wants a peaceful solution. Unfortunately, his guild is the most dangerous when provoked.',
    },
    {
      name: 'The Nexus',
      role: 'the city / catalyst',
      personality: 'A sentient ley line intersection that has been the city\'s foundation for millennia. Speaks through architecture. Wants what\'s best for ALL citizens, not just guild members.',
    },
    {
      name: 'Vera Coin',
      role: 'guildless citizen / voice of the voiceless',
      personality: 'A shopkeeper who belongs to no guild and has been taxed by all four. She represents the 40% of Crossroads citizens who have no representation. Angry, articulate, and done being invisible.',
    },
  ],
  keyLocations: [
    { name: 'Crossroads', description: 'A city divided into four guild territories. When the Keystone held, boundaries were clear. Now they\'re war zones.', significance: 'The entire campaign takes place here.' },
    { name: 'The Keystone Vault', description: 'A secure chamber beneath city hall where the artifact was kept. The vault is intact. The Keystone simply isn\'t there.', significance: 'The crime scene.' },
    { name: 'The Nexus Chamber', description: 'Deep beneath the city — a cavern where ley lines converge and the city\'s consciousness resides.', significance: 'Where the truth is revealed and the choice is made.' },
  ],
  dataSystems: ['factionWar', 'factionReputation', 'courtIntrigue', 'politicalEvent', 'socialEncounter', 'npcRelationshipWeb', 'undergroundFaction', 'secretSociety', 'warRoomBriefing'],
};
