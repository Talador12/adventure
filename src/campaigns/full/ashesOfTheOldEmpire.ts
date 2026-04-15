import type { FullCampaign } from '../types';

export const ashesOfTheOldEmpire: FullCampaign = {
  id: 'full-ashes-old-empire',
  type: 'full',
  title: 'Ashes of the Old Empire',
  tagline: 'The empire fell. What rose from its ashes might be worse.',
  tone: 'serious',
  themes: ['war', 'classic_fantasy', 'dark_fantasy'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 1, end: 15 },
  estimatedSessions: 24,
  settingSummary:
    'The Aurelian Empire collapsed thirty years ago. The borderlands are lawless, the core provinces are run by warlords, and the old capital is a haunted ruin. Now three powers are rising: a military junta promising order, a theocracy promising salvation, and a mercantile republic promising prosperity. The party starts as refugees and becomes kingmakers — or kings.',
  hook: 'The party are refugees fleeing a border skirmish between two warlords. They arrive at the crossroads town of Haven, which is about to be claimed by all three rising powers simultaneously. They must choose a side — or carve out their own.',
  twist:
    'The empire didn\'t collapse naturally. The last emperor performed a ritual to bind the empire\'s founding dragon to his bloodline — but the ritual failed, killing the emperor and releasing the dragon. The dragon has been manipulating all three rising powers, playing them against each other while it rebuilds its hoard from the empire\'s ruins.',
  climax:
    'The three powers converge on the old capital for a final battle. The dragon reveals itself, offering each faction a deal. The party must navigate the three-way war, confront the dragon, and decide the future of the continent — unity, division, or something new.',
  acts: [
    {
      title: 'Act 1: Haven',
      summary:
        'The party arrives at Haven, a crossroads town that becomes the microcosm of the larger conflict. They build alliances, resolve disputes, and establish themselves as people who matter.',
      keyEvents: [
        'Refugee caravan arrives at Haven — the party earns their keep',
        'Three factions send envoys — each wants Haven as a foothold. The party breaks bread with all three.',
        'Quiet moment: a Haven farmer invites the party to dinner. He does not care about empires. He cares about the harvest. The party remembers what they are fighting for.',
        'A warlord threatens Haven — the party helps defend it',
        'Discovery of an imperial artifact beneath Haven that all factions want',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Rising Powers',
      summary:
        'The party travels to each of the three rising capitals, learning their strengths, weaknesses, and secrets. Each power has something the others need, and each has a fatal flaw.',
      keyEvents: [
        'The Junta: disciplined but brutal — dissidents disappear',
        'The Theocracy: compassionate but fanatical — heresy is death',
        'The Republic: prosperous but corrupt — everything has a price',
        'Quiet moment: a soldier from the Junta deserts and sits by the party\'s fire. She says she joined for order and found only obedience. She does not know where to go now.',
        'The dragon\'s agents are in all three capitals — breadcrumbs lead to the old capital. If the party allied with a faction in Act 1, that faction provides intelligence.',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Old Capital',
      summary:
        'All roads lead to Aurelia. The three armies march, the dragon waits, and the party must end a thirty-year interregnum.',
      keyEvents: [
        'March on Aurelia — the party rides with their chosen faction (or alone)',
        'Three-way battle at the gates of the old capital',
        'The dragon reveals itself — offers each faction power for fealty',
        'The final choice: the party shapes the new order',
      ],
      estimatedSessions: 10,
    },
  ],
  keyNPCs: [
    {
      name: 'General Voss',
      role: 'faction leader (Junta)',
      personality:
        'Iron-willed, pragmatic, haunted by the things she has done for order. Speaks in clipped commands even at dinner. Stands when she could sit. She believes freedom is a luxury only the safe can afford. "Order first. Freedom is what happens inside the walls." Arc: begins as immovable authority, softens if the party shows her a vision of order that does not require a fist.',
      secret: 'She served the old emperor and knows about the dragon ritual. She\'s been preparing for the dragon\'s return.',
    },
    {
      name: 'High Sunkeeper Aravel',
      role: 'faction leader (Theocracy)',
      personality:
        'Gentle, sincere, absolutely unwavering. Speaks in parables and always touches people on the shoulder when greeting them. He healed thousands during the collapse. He also burned heretics. He sees no contradiction. "The sun warms and the sun burns. It is still the sun." Arc: grows uncertain as the dragon\'s voice becomes harder to distinguish from his god\'s.',
      secret: 'He can hear the dragon\'s voice. He thinks it\'s his god speaking.',
    },
    {
      name: 'Consul Maren Greyvale',
      role: 'faction leader (Republic)',
      personality:
        'Brilliant, charming, everything has a deal behind it. Counts on her fingers when negotiating. She built the Republic from nothing through sheer cunning. Loyalty is transactional. "Everyone has a price. The honest ones know theirs." Arc: genuinely shocked when she discovers the dragon manipulated her finances. For the first time, she was the mark.',
      secret: 'She\'s been unknowingly laundering the dragon\'s treasure through the Republic\'s banks.',
    },
    {
      name: 'Pyraxis the Remembered',
      role: 'true antagonist',
      personality:
        'An ancient gold dragon twisted by the failed ritual. It was once the empire\'s guardian. Now it believes it IS the empire, and all of it belongs to it.',
    },
  ],
  keyLocations: [
    {
      name: 'Haven',
      description:
        'A crossroads town that becomes a political flashpoint. Simple, hardworking, and about to become very important.',
      significance: 'The party\'s home base and the campaign\'s emotional anchor.',
    },
    {
      name: 'The Three Capitals',
      description:
        'Ironwall (Junta), Solhaven (Theocracy), and Tradewind (Republic) — each a different vision of the future.',
      significance: 'Act 2 exploration and alliance-building.',
    },
    {
      name: 'Aurelia',
      description:
        'The old imperial capital — a haunted ruin where ghosts of the old court still act out their final day on loop.',
      significance: 'The final battlefield and the dragon\'s lair.',
    },
  ],
  dataSystems: [
    'factionWar',
    'massCombat',
    'siegeWarfare',
    'politicalEvent',
    'factionReputation',
    'diplomaticNegotiation',
    'warRoomBriefing',
    'cataclysmCountdown',
    'stronghold',
  ],
};
