import type { FullCampaign } from '../types';

export const theSunkenKingdom: FullCampaign = {
  id: 'full-sunken-kingdom',
  type: 'full',
  title: 'The Sunken Kingdom',
  tagline: 'Three thousand years underwater. The royal family never stopped ruling.',
  tone: 'serious',
  themes: ['nautical', 'dungeon_crawl', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'The kingdom of Thalassar sank beneath the waves in a single day when its last king defied the sea gods. Three millennia later, it has been found—preserved by magic, still inhabited by descendants who adapted to underwater life. They never stopped having court intrigue, wars, and royal succession crises.',
  hook: 'A treasure hunter hires the party to explore a newly-discovered underwater ruin. They find a fully functional kingdom with living citizens who have no idea the surface world still exists.',
  twist:
    'The kingdom is sinking slowly into the abyss as its ancient magic fails. The royal family knows this and has been secretly abducting surface dwellers to sacrifice to the sea gods to buy more time—explaining centuries of "drowned" sailors.',
  climax:
    'The party must choose: help the royal family find a permanent solution (negotiating with sea gods), help the citizens evacuate to the surface (causing cultural collapse), or find a way to restore the ancient magic permanently.',
  acts: [
    {
      title: 'Act 1: Beneath the Waves',
      summary:
        'The party explores the underwater kingdom, learning its customs and meeting its factions. They are initially welcomed as curiosities but soon realize something is wrong with the kingdom\'s foundations.',
      keyEvents: [
        'First descent to the kingdom—breathing magic or water-breathing equipment',
        'Meeting Prince Malachar, who sees the party as potential allies in his succession dispute',
        'Discovering the kingdom\'s architecture is crumbling in the deepest districts',
        'Finding evidence of recent surface-world artifacts in the royal treasury',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Weight of Water',
      summary:
        'The party investigates the kingdom\'s decay and uncovers the royal family\'s secret sacrifices. They must navigate court politics while deciding whether to expose the truth or work within the system.',
      keyEvents: [
        'Meeting the merfolk resistance who oppose the royal family\'s methods',
        'Discovering the ritual chambers where surface dwellers are sacrificed',
        'Confronting the King—he genuinely believes he is saving his people',
        'An attempted coup by Prince Malachar using the party as leverage',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Rising Tide',
      summary:
        'The magic fails catastrophically. The party must act quickly to either restore the ancient wards, negotiate new terms with the sea gods, or organize an evacuation while the kingdom collapses around them.',
      keyEvents: [
        'The kingdom begins shaking—structures collapsing, citizens panicking',
        'Descent into the Deeps to speak with the imprisoned sea god who cursed Thalassar',
        'Final confrontation with the royal family—peaceful or violent resolution',
        'Evacuation or salvation—thousands of lives depend on the party\'s choice',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'King Thalassar XIV',
      role: 'tragic antagonist',
      personality:
        'Ancient ruler burdened by his ancestor\'s sin. Genuinely loves his people, utterly ruthless in protecting them. Cannot comprehend that his methods are wrong.',
      secret: 'He is the original King Thalassar, kept alive by the same sacrifice magic he uses on others.',
    },
    {
      name: 'Prince Malachar',
      role: 'ambitious noble',
      personality:
        'Younger prince who wants to modernize the kingdom. Sees the party as tools to seize power. Not evil, just hungry.',
    },
    {
      name: 'Coral',
      role: 'merfolk resistance leader',
      personality:
        'Commoner who discovered the royal secret. Passionate, sometimes reckless, wants to save her people without sacrificing others.',
    },
    {
      name: 'Leviathan',
      role: 'imprisoned deity',
      personality:
        'Sea god who cursed Thalassar for the ancient king\'s hubris. Bitter but willing to negotiate if approached with genuine respect.',
    },
  ],
  keyLocations: [
    {
      name: 'Thalassar City',
      description:
        'A three-thousand-year-old kingdom preserved underwater. Bioluminescent coral lighting, merfolk and adapted humans living together, architecture from a forgotten age.',
      significance: 'Main setting and location of court intrigue.',
    },
    {
      name: 'The Palace Depths',
      description:
        'Royal chambers and secret ritual spaces deep in the kingdom\'s foundations, where the sacrifice magic is maintained.',
      significance: 'Where the party uncovers the kingdom\'s dark secret.',
    },
    {
      name: 'Leviathan\'s Prison',
      description:
        'An abyssal trench where the sea god is chained. Only accessible as the kingdom\'s magic weakens.',
      significance: 'Site of the final negotiation or battle.',
    },
  ],
  dataSystems: ['underwaterCombat', 'shipwreckGenerator', 'hauntedLocation', 'magicalAnomaly'],
};
