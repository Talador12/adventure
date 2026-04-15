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
    'The kingdom of Thalassar sank beneath the waves in a single day when its last king defied the sea gods. Three millennia later, it has been found - preserved by magic, still inhabited by descendants who adapted to underwater life. They never stopped having court intrigue, wars, and royal succession crises.',
  hook: 'A treasure hunter hires the party to explore a newly-discovered underwater ruin. They find a fully functional kingdom with living citizens who have no idea the surface world still exists.',
  twist:
    'The kingdom is sinking slowly into the abyss as its ancient magic fails. The royal family knows this and has been secretly abducting surface dwellers to sacrifice to the sea gods to buy more time - explaining centuries of "drowned" sailors.',
  climax:
    'The party must choose: help the royal family find a permanent solution (negotiating with sea gods), help the citizens evacuate to the surface (causing cultural collapse), or find a way to restore the ancient magic permanently.',
  acts: [
    {
      title: 'Act 1: Beneath the Waves',
      summary:
        'The party explores the underwater kingdom, learning its customs and meeting its factions. They are initially welcomed as curiosities but soon realize something is wrong with the kingdom\'s foundations.',
      keyEvents: [
        'First descent to the kingdom - breathing magic or water-breathing equipment. The light is bioluminescent blue. Everything is beautiful and wrong.',
        'Meeting Prince Malachar, who sees the party as potential allies in his succession dispute. He smiles too much.',
        'Discovering the kingdom\'s architecture is crumbling in the deepest districts. A building collapses while the party watches. Nobody in the upper districts mentions it.',
        'Finding evidence of recent surface-world artifacts in the royal treasury - a compass, a book, a locket with a portrait. Someone from above was here recently.',
        'Quiet moment: a Thalassari child shows the party their coral garden. The coral is dying but the child does not know that. "Is it not beautiful? I grew it myself."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Weight of Water',
      summary:
        'The party investigates the kingdom\'s decay and uncovers the royal family\'s secret sacrifices. They must navigate court politics while deciding whether to expose the truth or work within the system.',
      keyEvents: [
        'Meeting the merfolk resistance who oppose the royal family\'s methods. Coral is passionate and sometimes reckless.',
        'Discovering the ritual chambers where surface dwellers are sacrificed. The walls are carved with tally marks. There are too many.',
        'Confronting the King - he genuinely believes he is saving his people. "Every soul I take buys my kingdom another year. How many years is your kingdom worth?"',
        'The moment of cost: an attempted coup by Prince Malachar using the party as leverage. If they helped him in Act 1, he has the position to pull it off. If not, he tries anyway and fails violently.',
        'Quiet moment: Coral takes the party to the kingdom\'s edge. Below is the abyss - black, cold, rising. "It was further away last year. And the year before that."',
        'If the party exposed the sacrifices, the citizens are horrified. If they kept the secret, the King trusts them more.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Rising Tide',
      summary:
        'The magic fails catastrophically. The party must act quickly to either restore the ancient wards, negotiate new terms with the sea gods, or organize an evacuation while the kingdom collapses around them.',
      keyEvents: [
        'The kingdom begins shaking - structures collapsing, citizens panicking. The bioluminescence flickers.',
        'Descent into the Deeps to speak with the imprisoned sea god who cursed Thalassar. Leviathan is bitter but willing to negotiate if approached with genuine respect.',
        'Quiet moment: the King removes his crown and holds it. "Three thousand years of dynasty. It was always going to end. I just wanted it to end on my terms."',
        'Final confrontation with the royal family - peaceful or violent resolution. The King can be reasoned with. Prince Malachar cannot.',
        'Evacuation or salvation - thousands of lives depend on the party\'s choice. Citizens who have never seen sunlight surface for the first time. The light hurts their eyes. They do not look away.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'King Thalassar XIV',
      role: 'tragic antagonist',
      personality:
        'Ancient ruler burdened by his ancestor\'s sin. Speaks in the formal plural ("we decree") even in private, then catches himself and switches to first person when tired. Genuinely loves his people, utterly ruthless in protecting them. Cannot comprehend that his methods are wrong because they have worked for three thousand years.',
      secret: 'He is the original King Thalassar, kept alive by the same sacrifice magic he uses on others. Arc: can be broken by the party showing him the cost of his methods. Three thousand years of denial is hard to crack, but not impossible.',
    },
    {
      name: 'Prince Malachar',
      role: 'ambitious noble',
      personality:
        'Younger prince who wants to modernize the kingdom. Sees the party as tools to seize power. Not evil, just hungry. Taps his fingers on surfaces when scheming, which is always. "The old way is dying. I am simply offering a new one. My way."',
    },
    {
      name: 'Coral',
      role: 'merfolk resistance leader',
      personality:
        'Commoner who discovered the royal secret. Passionate, sometimes reckless, wants to save her people without sacrificing others. Gestures broadly when speaking. Her anger is loud but her planning is sharp. "I do not want a revolution. I want the truth. If the truth causes a revolution, that is not my fault."',
    },
    {
      name: 'Leviathan',
      role: 'imprisoned deity',
      personality:
        'Sea god who cursed Thalassar for the ancient king\'s hubris. Speaks in tidal rhythms - surging forward, pulling back. Bitter but willing to negotiate if approached with genuine respect. "Three thousand years in chains. Your king\'s ancestor spat in my face and called me \'the fish.\' Would you negotiate with someone who called you \'the fish\'?"',
    },
  ],
  keyLocations: [
    {
      name: 'Thalassar City',
      description:
        'A three-thousand-year-old kingdom preserved underwater. Bioluminescent coral lighting, merfolk and adapted humans living together, architecture from a forgotten age. Beautiful and dying at the edges.',
      significance: 'Main setting and location of court intrigue.',
    },
    {
      name: 'The Palace Depths',
      description:
        'Royal chambers and secret ritual spaces deep in the kingdom\'s foundations, where the sacrifice magic is maintained. The walls are warm here. They should not be.',
      significance: 'Where the party uncovers the kingdom\'s dark secret.',
    },
    {
      name: 'Leviathan\'s Prison',
      description:
        'An abyssal trench where the sea god is chained. Only accessible as the kingdom\'s magic weakens. The water here is colder than physics allows. Leviathan\'s voice arrives before you see anything.',
      significance: 'Site of the final negotiation or battle.',
    },
  ],
  dataSystems: [
    'underwaterCombat',
    'shipwreckGenerator',
    'hauntedLocation',
    'magicalAnomaly',
    'courtIntrigue',
    'socialEncounter',
  ],
};
