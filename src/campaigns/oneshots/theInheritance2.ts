import type { OneShotCampaign } from '../types';

export const theInheritance2: OneShotCampaign = {
  id: 'oneshot-unexpected-inheritance',
  type: 'oneshot',
  title: 'The Unexpected Inheritance',
  tagline: 'You inherited a house from a great-aunt you never knew existed. The walls are covered in maps. The study smells like old blood and regret.',
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
        'The entry hall: a longsword on the wall, recently oiled. Boots by the door, sized for a woman, worn through at the heel. She walked far',
        'The sitting room: five portraits. The great-aunt and four companions, young and grinning. Four of the frames have black ribbon tied at the corner',
        'The study: forty years of journals. The early ones are excited, full of sketches. The later ones are just names, dates, and amounts of gold sent to addresses the party does not recognize',
        'A locked room at the end of the hall. The key is inside a hollowed-out book titled "Things I Cannot Say Aloud"',
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
    { name: 'Great-Aunt Vesta (deceased)', role: 'the story', personality: 'Present only through her house. Her journals shift voice over the decades: the early ones say "we" constantly. After the quest, the word "we" disappears entirely. Forty years of "I." Her final letter is the first time she uses "you."' },
    { name: 'Solicitor Marsh', role: 'quest giver', personality: 'Adjusts his spectacles before every sentence. Speaks in subclauses. "The deceased - that is, your great-aunt, or rather, your father\'s aunt - specified, and I quote, your name. Only yours. I found that - well. Unusual."' },
    { name: 'Neighbor Gale', role: 'context', personality: 'Leans on a fence and talks with one eye closed against the sun. "She baked for every child on the street but she never told anyone her name. I called her \'the quiet one.\' Forty years. Never once saw a visitor. I think she was hiding from something. Not the law. Herself."' },
  ],
  keyLocations: [
    { name: 'Vesta\'s House', description: 'A modest house that is secretly a museum of one woman\'s adventuring past and decades of quiet penance.', significance: 'The entire adventure. Every room is a chapter of the story.' },
    { name: 'The Study', description: 'Walls covered in maps, journals stacked floor to ceiling, pressed flowers from places that no longer exist on maps.', significance: 'Where the full story is pieced together from 40 years of writing.' },
    { name: 'The Locked Room', description: 'A simple bedroom containing only a bed, a desk, and a letter that explains everything.', significance: 'The emotional climax. The letter that ties the party to someone they never knew.' },
  ],
  dataSystems: ['npcDialogue', 'detectiveCase', 'socialEncounter', 'explorationChallenge', 'npcRelationship'],
};
