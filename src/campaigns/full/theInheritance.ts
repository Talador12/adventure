import type { FullCampaign } from '../types';

export const theInheritance: FullCampaign = {
  id: 'full-inheritance',
  type: 'full',
  title: 'The Inheritance',
  tagline: 'Your uncle left you a dungeon. It comes with tenants.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'urban'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'The party inherits a dungeon from a deceased relative — a full multi-level dungeon, complete with traps, treasure, and monsters who have been living there rent-free for decades. The will says they must "restore the dungeon to profitability within six months or it goes to the Adventurers\' Guild." The party must become dungeon landlords: renovating, managing monster tenants, hiring trap maintenance, and fending off adventuring parties who keep trying to clear it.',
  hook: 'A lawyer finds the party and reads the will: "I, Aldric Deepstone, leave my dungeon — Deepstone Delve — to my nearest living relatives. It has 7 floors, 200 rooms, and a slight goblin infestation. Also a dragon on floor 6. She pays rent. Mostly."',
  twist:
    'Uncle Aldric didn\'t die — he retired to a pocket dimension inside the dungeon\'s lowest floor. He\'s been watching the party struggle and is grading their performance. The dungeon is his masterwork: a self-sustaining ecosystem designed to train adventurers. He wants the party to prove they deserve it by making it better than he did.',
  climax:
    'The Adventurers\' Guild sends a team to forcibly clear the dungeon before the deadline. The party must defend their property — but they can\'t just fight adventurers (that\'s illegal). They have to use the dungeon itself: traps, monsters, terrain, and sheer bureaucracy to make the Guild team give up. Uncle Aldric watches from his pocket dimension, judging.',
  acts: [
    {
      title: 'Act 1: Move-In Day',
      summary:
        'Inspecting the dungeon, meeting the monster tenants, assessing the damage, and dealing with the first "adventuring party" who shows up thinking it\'s still a loot dungeon.',
      keyEvents: [
        'The inspection: 7 floors, various states of disrepair, monsters everywhere',
        'Meet the tenants: goblins (floor 1), a troll (floor 3), kobolds (floor 4), a dragon (floor 6)',
        'Tenant meeting: the monsters have complaints, demands, and a surprising union',
        'First adventuring party arrives — they have a quest to "clear Deepstone Delve"',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Renovations',
      summary:
        'Restoring the dungeon. Each floor needs work: traps repaired, rooms redesigned, monster disputes mediated. Revenue streams established.',
      keyEvents: [
        'Floor 1 renovation: goblin market (they want a food court)',
        'Floor 3 crisis: the troll and kobolds are in a territorial dispute',
        'Revenue plan: charge adventurers entry fees, sell loot back, dungeon tours',
        'The dragon on floor 6 hasn\'t paid rent in 3 years — confrontation time',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Guild Raid',
      summary:
        'Deadline approaches. The Guild sends their best. The party must use everything they\'ve built to defend the dungeon — and discover Uncle Aldric\'s secret on floor 7.',
      keyEvents: [
        'Guild team announced: 5 high-level adventurers with a writ of clearance',
        'Defense preparation: traps, monster alliances, bureaucratic paperwork',
        'The raid: a reverse dungeon crawl where the party IS the dungeon',
        'Floor 7: Uncle Aldric reveals himself and judges the party\'s work',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Uncle Aldric (not actually dead)',
      role: 'secret judge / mentor',
      personality:
        'An eccentric old dungeon architect who treats dungeon-building like fine art. Judges everything. "The trap on floor 2 is derivative. I expected better."',
      secret: 'He\'s been in his pocket dimension for a year, watching through scrying mirrors. The inheritance is a test.',
    },
    {
      name: 'Grix (goblin union rep)',
      role: 'tenant / ally',
      personality:
        'A goblin in a tiny business suit who represents the floor 1 goblin collective. Surprisingly good at contract law. "We want dental, vision, and a food court. Non-negotiable."',
    },
    {
      name: 'Ember (the dragon)',
      role: 'difficult tenant',
      personality:
        'A young red dragon who occupies all of floor 6 and hasn\'t paid rent since 2019. Charming, evasive, always has an excuse. "The check is in the hoard."',
    },
    {
      name: 'Guild Captain Stonefist',
      role: 'antagonist',
      personality:
        'The Guild\'s top dungeon-clearer. Professional, efficient, and confused about why the dungeon\'s goblins are filing an injunction.',
    },
  ],
  keyLocations: [
    {
      name: 'Deepstone Delve',
      description: 'A 7-floor dungeon that\'s part ecosystem, part real estate, part headache.',
      significance: 'The entire campaign takes place here.',
    },
    {
      name: 'Floor 1: The Goblin Market',
      description: 'Formerly a trap gauntlet, now a bustling goblin bazaar with questionable health codes.',
      significance: 'The party\'s first renovation project and primary revenue source.',
    },
    {
      name: 'Floor 7: The Hidden Floor',
      description: 'A pocket dimension accessible only from the deepest room. Uncle Aldric\'s secret residence.',
      significance: 'Where the truth is revealed.',
    },
  ],
  dataSystems: [
    'stronghold',
    'trapDesigner',
    'shopInventory',
    'questRewardNegotiation',
    'socialEncounter',
    'encounterWaves',
    'dungeonRoomTemplates',
    'dungeonRoomDressing',
    'fantasyInsults',
  ],
};
