import type { FullCampaign } from '../types';

export const theLastDayOfSummer: FullCampaign = {
  id: 'full-the-last-day-of-summer',
  type: 'full',
  title: 'The Last Day of Summer',
  tagline: 'Three hundred years of perfect weather and nobody has written a single poem.',
  tone: 'social',
  themes: ['social', 'classic_fantasy', 'comedy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 7 },
  estimatedSessions: 12,
  settingSummary:
    'The village of Goldenset is enchanted. It is always the last day of summer - that perfect afternoon where the light goes amber and the air smells like cut grass and everything feels like a goodbye you are not ready for. Nobody ages. The sun sets at the same beautiful angle every evening and rises to the same perfect morning. The residents have been here for three hundred years, living the same gorgeous day. They are happy. They garden. They fish. They sit on porches and watch the sunset they have seen a hundred thousand times and still find it lovely. Nothing has been invented, written, built, or discovered in three centuries. The village is paradise. The village is a museum.',
  hook: 'The party stumbles into Goldenset by accident - a wrong turn on a forest road. The villagers welcome them warmly, offer food and beds, and mention casually that it is always today here. Always has been. One villager, an elderly woman named Tess, asks the party to stay for dinner. She has been making the same roast for three hundred years. She says it has never gotten old. Her smile is genuine. The party notices there are no children younger than about eight.',
  twist:
    'The enchantment was cast by a little girl named Lily, three hundred years ago. She was dying of a wasting disease. Her last good day was a summer afternoon with her family - her mother\'s roast, her father\'s fiddle, her brother catching fireflies. She wished, with every fiber of a child\'s desperate heart, for one more day. Something heard her. The enchantment locked the village in that moment. Lily is still here, still eight years old, still dying but never finishing. Breaking the enchantment means Lily finally dies. Keeping it means an eternity where nothing grows, nothing changes, and a little girl never gets to rest.',
  climax:
    'The party discovers Lily in a cottage at the edge of the village, playing with toys that are three centuries old. She knows what she did. She has known for a long time. She is tired but she is afraid. Her parents are still here, still young, still cooking her dinner every night. Breaking the spell means they will age three hundred years in an instant. Lily asks the party to decide for her because she is eight and this is too big for an eight-year-old. The village gathers. Some want the spell to continue. Some, quietly, want to finally grow old with their partners. Lily\'s parents hold her hand and tell her it is okay, whatever she chooses. It is the most beautiful evening. It is always the most beautiful evening.',
  acts: [
    {
      title: 'Act 1: Paradise Found',
      summary:
        'The party arrives in Goldenset and experiences the enchantment firsthand. It is wonderful. The food is good, the people are kind, the sunset is breathtaking. They also notice: no books published in three centuries, no new buildings, no new songs, no new anything. Happiness without growth.',
      keyEvents: [
        'The wrong turn: a forest path that loops once and deposits the party in eternal summer',
        'Welcome dinner with the village. The roast is excellent. The conversation has been rehearsed for centuries.',
        'A villager asks the party what year it is outside. When told, he nods. "We have missed quite a lot."',
        'The party notices the library has no new books. The workshop has no new projects. The graveyard has no new graves.',
        'An attempt to leave fails: the forest path loops back to Goldenset. The enchantment keeps visitors too.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Cracks',
      summary:
        'Beneath the contentment, the party finds fractures. Couples who ran out of things to say two centuries ago. A painter who has not touched a brush in a hundred years because there is nothing new to paint. And whispers about a little girl at the edge of town who nobody visits.',
      keyEvents: [
        'A husband and wife who sit in silence on their porch: three hundred years of conversation, exhausted',
        'The painter\'s cottage: hundreds of identical canvases of the same sunset, increasingly desperate in brushwork',
        'A villager confesses: "I am happy. I have been happy for three hundred years. I would like to be something else now."',
        'The party learns about Lily - a child at the edge of the village who is always sick, always eight, always brave',
        'The enchantment\'s source is traced to Lily. Breaking it means she dies. The village knows. Nobody has dared.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Sunset',
      summary:
        'The party meets Lily, learns the full story, and must facilitate the hardest conversation a village has ever had. There is no villain. There is no enemy. There is just a dying child, her family, and three hundred years of borrowed time.',
      keyEvents: [
        'Lily\'s cottage: toys, drawings, a small bed. She is eight. She has been eight for three hundred years. She is tired.',
        'Lily\'s parents: they know. They have always known. They chose their daughter over everything and would do it again.',
        'The village meeting: not a vote, but a conversation. People speak about what they have lost by losing nothing.',
        'Lily asks the party to decide. Her parents hold her hand. The sunset begins for the hundred-thousandth time.',
        'Whatever the party chooses, the last scene is the most beautiful evening Goldenset has ever had.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Lily',
      role: 'the heart of the enchantment',
      personality:
        'An eight-year-old girl who has been eight for three hundred years. Brave, tired, wise beyond her apparent age but still a child who is afraid of the dark and loves fireflies. She did not mean to freeze the world. She just wanted one more day.',
      secret: 'She has been ready to let go for decades. She stays because she cannot bear to see her parents grieve.',
    },
    {
      name: 'Tess Larkin',
      role: 'village elder / guide',
      personality:
        'The woman who has made the same roast for three hundred years. Warm, welcoming, and quietly desperate for something to happen. She greets the party like they are the first interesting thing in a century. They are.',
      secret: 'She was Lily\'s schoolteacher. She chose the enchantment because she loved Lily. Now she wants the child to rest.',
    },
    {
      name: 'Rowan and Hanna (Lily\'s parents)',
      role: 'emotional anchors',
      personality:
        'A couple who chose their daughter over the future. They do not regret it. They also know it cannot last forever. They cook dinner for Lily every night and pretend it is the first time.',
    },
    {
      name: 'Edric the Painter',
      role: 'thematic mirror',
      personality:
        'A painter who has produced nothing new in a century. His cottage is full of identical sunset paintings. He loves Goldenset. He also understands that love without growth is a different word.',
    },
  ],
  keyLocations: [
    {
      name: 'Goldenset',
      description: 'A village trapped in the most beautiful evening of the year, every day, for three hundred years. Amber light, cut grass, fireflies at dusk.',
      significance: 'The entire campaign. A paradise that is also a prison, depending on who you ask.',
    },
    {
      name: 'Lily\'s Cottage',
      description: 'A small house at the edge of the village. Toys on the floor, drawings on the walls, a small bed where a child has been not-quite-dying for three centuries.',
      significance: 'The source of the enchantment and the campaign\'s emotional climax.',
    },
    {
      name: 'The Village Green',
      description: 'Where Goldenset gathers for festivals, debates, and the nightly sunset watching. Benches worn smooth by three hundred years of the same people.',
      significance: 'Where the village decides its future. The meeting takes place under amber light, as always.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'moralDilemma',
    'npcRelationshipWeb',
    'villageFestival',
    'tavernEvent',
    'wildernessExploration',
  ],
};
