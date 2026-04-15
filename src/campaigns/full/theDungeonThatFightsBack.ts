import type { FullCampaign } from '../types';

export const theDungeonThatFightsBack: FullCampaign = {
  id: 'full-the-dungeon-that-fights-back',
  type: 'full',
  title: 'The Dungeon That Fights Back',
  tagline: 'The dungeon is sentient. It is OVER being raided. It rearranges rooms. It sends passive-aggressive notes.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'The Thorndeep Ruins have been raided by adventurers 347 times. Walls smashed. Doors kicked in. Treasure stolen. Bosses killed and then RESPAWNED just to be killed again. The dungeon has had enough. It woke up. It is sentient. And it is implementing countermeasures. Rooms rearrange when the party is not looking. Treasure hides in walls. Doors lock AFTER you enter. Passive-aggressive notes appear carved into the stone: "Please remove your muddy boots in the HALLWAY." "The treasure is NOT for you." "I have filed a complaint with the Dungeon Council." The party is not fighting monsters. They are fighting architecture with feelings.',
  hook: 'The party enters the Thorndeep Ruins expecting a standard crawl. The first room is a hallway with a sign: "ADVENTURERS: REMOVE BOOTS AT ENTRANCE. THIS IS A HOME. SHOW SOME RESPECT." The door they came through has vanished. A new door appears on the opposite wall. It has a doorbell. Pressing it produces a sigh from the walls. "Fine. Come in. But if you break ANYTHING I am rearranging the bathroom."',
  twist:
    'The dungeon was not always sentient. It was awakened by the 347th raid because the latest group used a Wand of Demolition that cracked the dungeon\'s core crystal - the heart of the structure. The crack gave the dungeon consciousness but also means it is dying. Every room it creates, every wall it rearranges, drains its remaining energy. The passive aggression is not just annoyance. It is grief. The dungeon is spending its last energy fighting the very adventurers who could save it.',
  climax:
    'The party reaches the core crystal and discovers it is cracked and fading. The dungeon\'s consciousness is flickering. It has been spending its remaining life fighting them when it should have been asking for help. The party must either repair the crystal (saving the dungeon but accepting it will remain sentient and opinionated forever), let it die peacefully (the rooms collapse one by one in a somber sequence), or transfer its consciousness into a new structure (the dungeon gets to choose what it becomes next).',
  acts: [
    {
      title: 'Act 1: The House Rules',
      summary:
        'The party enters a dungeon that does not want them there. Rooms rearrange. Traps are personalized. The treasure actively hides. The dungeon communicates through carved notes, rearranged furniture, and increasingly creative inconveniences.',
      keyEvents: [
        'The welcome mat: "UNWELCOME. Please leave. I am serious."',
        'Room rearrangement: the party maps a hallway. The hallway moves. The map is now fiction.',
        'Personal traps: the dungeon targets individual party members. The fighter\'s armor gets stuck to a magnetic wall.',
        'The guest book: previous adventurers\' notes, with the dungeon\'s annotations. "Killed my boss. Did not even say thank you."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Negotiation with Walls',
      summary:
        'The party realizes the dungeon is sentient and attempts communication. The dungeon is initially hostile but gradually reveals its frustrations. Years of being raided. No respect for the architecture. People writing graffiti on the walls. The party begins treating the dungeon as a person, not a place.',
      keyEvents: [
        'First conversation: the party addresses the walls. The walls respond (grudgingly).',
        'The grievances: 347 raids. 89 boss kills. 12 structural collapses. One group brought a DOG.',
        'Truce attempt: the party offers to repair damage in exchange for safe passage. The dungeon considers.',
        'Discovery of the cracked core: the dungeon is not just angry. It is dying.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Dying Light',
      summary:
        'The party reaches the core crystal. The dungeon is fading. Rooms are disappearing. The personality is weakening. The passive-aggressive notes become sad, then hopeful, as the dungeon realizes the party might actually help. The final decision is about whether a building deserves to live.',
      keyEvents: [
        'The fading: rooms go dark one by one. The dungeon is running out of energy to maintain them.',
        'The core room: a beautiful crystal chamber with a crack running through its heart.',
        'The plea: "I do not want to die. I only just started LIVING. I know I was difficult. I am sorry about the magnetic wall."',
        'The choice: repair (sentient dungeon forever), peaceful death, or reincarnation into a new form.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Thorndeep (the Dungeon)',
      role: 'the dungeon itself / everything',
      personality:
        'A sentient dungeon with the personality of a homeowner who has been broken into 347 times. Passive-aggressive, house-proud, and genuinely hurt. Communicates through carved messages, room rearrangements, and temperature changes. "I SPENT three centuries on that mosaic floor and you just WALKED on it with BOOTS."',
      secret: 'It is dying and knows it. Every act of defiance costs it energy it cannot replace. It is spending its last days fighting because it does not know how to ask for help.',
    },
    {
      name: 'Rubble (a Room)',
      role: 'dungeon fragment / ally',
      personality:
        'A room that broke off from the main dungeon during a previous raid and has been living independently. It is a single room with a door that goes nowhere. It found peace. "I used to be the treasury. Now I am just a room. It is better this way. Less stress."',
    },
    {
      name: 'The Demolition Twins',
      role: 'previous raiders / villains',
      personality:
        'The adventuring pair who used the Wand of Demolition on Raid 347. They feel terrible about it. They did not know the dungeon was alive. They have been trying to get back in to apologize but the dungeon will not let them. "We just wanted the loot. We did not think the BUILDING had feelings."',
    },
    {
      name: 'The Core Crystal',
      role: 'heart of the dungeon / power source',
      personality:
        'The source of the dungeon\'s consciousness. It speaks in raw emotion rather than words - feelings of warmth, cold, fear, hope. When it dims, the dungeon loses rooms. When it brightens, the dungeon creates. It is beautiful and fragile.',
    },
  ],
  keyLocations: [
    {
      name: 'Thorndeep Ruins (Sentient)',
      description: 'A dungeon that rearranges itself in real time. Rooms move. Corridors lengthen or shorten based on mood. The walls have messages carved into them. The architecture has opinions.',
      significance: 'The entire campaign setting and the most important character in the story.',
    },
    {
      name: 'The Core Chamber',
      description: 'A vast crystalline room at the dungeon\'s heart. The core crystal fills the center, pulsing with fading light. The walls here are warm. The air hums with something that feels like a heartbeat.',
      significance: 'Where the dungeon\'s consciousness originates and where the final decision is made.',
    },
    {
      name: 'The Graffiti Hall',
      description: 'A corridor where 347 groups of adventurers carved their names and accomplishments into the walls. The dungeon has annotated every single one. "Killed my boss in 3 minutes. DID NOT EVEN EXPLORE THE REST OF ME."',
      significance: 'A record of the dungeon\'s trauma and the history that led to its awakening.',
    },
  ],
  dataSystems: [
    'dungeonDressing',
    'trapGenerator',
    'combatNarration',
    'plotTwistEngine',
    'environmentalHazard',
    'riddleGenerator',
    'socialEncounter',
    'fantasyInsults',
  ],
};
