import type { OneShotCampaign } from '../types';

export const theInheritance2: OneShotCampaign = {
  id: 'oneshot-unexpected-inheritance',
  type: 'oneshot',
  title: 'The Unexpected Inheritance',
  tagline: 'A party member inherits a house from a relative they never met. The house tells the story of who that person was.',
  tone: 'serious',
  themes: ['mystery', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A party member receives a letter from a solicitor: a great-aunt they never knew existed has died and left them a house. The house is in a small town where nobody has heard the family name. Inside, the house is a museum of one woman\'s extraordinary, secret life. Every room tells a chapter of a story nobody knew.',
  hook: 'The solicitor hands over the key. "She specified you by name. You were the only family she listed. The house is paid for. I have no idea what is inside. She was very private."',
  twist: 'The great-aunt was an adventurer who retired 40 years ago after a quest that cost her entire party their lives. She spent the rest of her life making quiet amends: funding orphanages, sending anonymous gifts to her fallen companions\' families, and writing letters she never sent. The house is not a home. It is a confession.',
  climax: 'The party finds a final unsent letter addressed to the inheriting party member. It explains why: "You remind me of who I was before the quest that broke me. Live the life I should have lived. Keep the house. Keep the stories. And if you find the families of the people listed in the study, tell them I am sorry."',
  scenes: [
    {
      title: 'Scene 1: The House',
      summary: 'Exploring the house and discovering it is not a normal home. Each room is curated, deliberate, and full of artifacts from an extraordinary life.',
      challenge: 'exploration',
      keyEvents: [
        'The entry hall: adventuring gear mounted on walls, well-maintained, clearly once used',
        'The sitting room: portraits of five people, the great-aunt and four others, in adventuring gear',
        'The study: journals spanning 40 years, maps, pressed flowers from distant lands',
        'A locked room at the end of the hall that the party must find the key for',
      ],
    },
    {
      title: 'Scene 2: The Story',
      summary: 'Reading the journals and piecing together the great-aunt\'s life. An adventurer who lost everything and spent her life trying to make it right.',
      challenge: 'exploration',
      keyEvents: [
        'The quest: a standard dungeon delve that went catastrophically wrong',
        'The loss: four companions killed because of a trap she triggered',
        'The aftermath: retirement, guilt, and decades of anonymous charity',
        'The families: she tracked them all, sent them money, watched their children grow',
      ],
    },
    {
      title: 'Scene 3: The Letter',
      summary: 'Finding the locked room and the final letter. Understanding why this specific party member was chosen.',
      challenge: 'social',
      keyEvents: [
        'The locked room: a simple bedroom with a single letter on the desk',
        'The letter: addressed to the party member, explaining the inheritance and the request',
        'The request: find the descendants of her fallen companions and deliver her apology',
        'The choice: accept the responsibility, honor the memory, or walk away from someone else\'s guilt',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Great-Aunt Vesta (deceased)', role: 'the story', personality: 'Present through her house, her journals, and her final letter. A woman who had one terrible day 40 years ago and spent the rest of her life trying to balance the scales.' },
    { name: 'Solicitor Marsh', role: 'quest giver', personality: 'A businesslike lawyer who processed the will without asking questions. He does not know the house\'s contents. He does not want to know.' },
    { name: 'Neighbor Gale', role: 'context', personality: 'An elderly neighbor who knew Vesta as a quiet, generous woman who never had visitors. "She baked for every child on the street. She never told anyone her name. I think she was hiding from something. Not the law. Herself."' },
  ],
  keyLocations: [
    { name: 'Vesta\'s House', description: 'A modest house that is secretly a museum of one woman\'s adventuring past and decades of quiet penance.', significance: 'The entire adventure. Every room is a chapter of the story.' },
    { name: 'The Study', description: 'Walls covered in maps, journals stacked floor to ceiling, pressed flowers from places that no longer exist on maps.', significance: 'Where the full story is pieced together from 40 years of writing.' },
    { name: 'The Locked Room', description: 'A simple bedroom containing only a bed, a desk, and a letter that explains everything.', significance: 'The emotional climax. The letter that ties the party to someone they never knew.' },
  ],
  dataSystems: ['npcDialogue', 'detectiveCase', 'socialEncounter', 'explorationChallenge', 'npcRelationship'],
};
