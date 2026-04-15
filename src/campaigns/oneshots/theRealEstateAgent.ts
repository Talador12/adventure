import type { OneShotCampaign } from '../types';

export const theRealEstateAgent: OneShotCampaign = {
  id: 'oneshot-the-real-estate-agent',
  type: 'oneshot',
  title: 'The Real Estate Agent',
  tagline: 'Charming fixer-upper. Open floor plan. Mild haunting. Motivated seller.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Hollowmere Manor has been on the market for eleven years. Every real estate agent who has tried to sell it has quit, fled, or developed a nervous twitch. The house is haunted by a family of ghosts who have been dead for two centuries and are VERY particular about who moves in. The party has been hired by Goldridge Realty as the latest sales team. Commission is 15% on a property worth 80,000 gold. That is life-changing money. All they have to do is get someone - anyone - to sign the deed.',
  hook: 'Three showings are scheduled today. The first buyers are a young couple looking for their first home. The second is a retired mercenary downsizing. The third is a noble family with too much money and too many opinions. The ghosts will sabotage every showing. Doors slam. Portraits scream. The chandelier swings. Blood drips from the walls (it is actually wine - the ghosts think it is scarier but cannot tell the difference anymore). The party must keep the buyers calm, the ghosts contained, and the property presentable.',
  twist:
    'The ghosts are not trying to scare away ALL buyers. They are trying to scare away BAD buyers. The Hollowmere family died in this house and they love it. They watched the previous owners neglect it, damage it, and host terrible parties. They want someone who will take care of their home. If the party pays attention, the ghosts react differently to different buyers - friendly warmth toward the couple who admires the woodwork, cold fury toward the noble who wants to "gut the place and modernize."',
  climax:
    'The third showing goes catastrophically wrong when the noble insults the original architecture. The ghosts go full poltergeist. The party must simultaneously protect the noble (who deserves it but should not die), calm the ghosts, and realize the solution: the young couple from the first showing genuinely loves the house. Bringing them back and letting the ghosts approve the buyers resolves everything. The ghosts attend the closing as witnesses.',
  scenes: [
    {
      title: 'Scene 1: The First Showing',
      summary:
        'The young couple arrives. The ghosts test them with mild hauntings. The party must manage the situation while reading the ghosts\' intentions.',
      challenge: 'social',
      keyEvents: [
        'The couple arrives - they love the house immediately. Ghosts watch cautiously.',
        'A portrait\'s eyes follow the wife. She thinks it is charming. The ghost approves.',
        'A door slams when the husband mentions "knocking out a few walls." The ghosts do NOT approve.',
        'The couple leaves interested but spooked. The party notices the ghosts seemed selective in their haunting.',
      ],
    },
    {
      title: 'Scene 2: The Mercenary and the Investigation',
      summary:
        'The second buyer tours while the party investigates the haunting pattern. The mercenary is unfazed by ghosts but the ghosts are unfazed by him.',
      challenge: 'exploration',
      keyEvents: [
        'The mercenary treats the haunting as a feature: "Built-in security system. I like it."',
        'The ghosts try their best scares. The mercenary has seen worse. Mutual respect develops.',
        'The party explores the attic and finds the Hollowmere family portraits - matching the ghosts exactly',
        'Discovery: a journal entry. "We will never leave this house. We will ensure it is loved as we loved it."',
      ],
    },
    {
      title: 'Scene 3: The Noble Disaster',
      summary:
        'The noble family arrives. They hate everything. They want to demolish and rebuild. The ghosts lose it. Full poltergeist event. The party must survive, protect the buyers, and find the real solution.',
      challenge: 'combat',
      keyEvents: [
        'The noble insults the original stained glass. A window shatters outward.',
        'Full haunting: furniture flies, walls bleed wine, the chandelier attacks',
        'The party realizes the ghosts want a specific type of buyer - someone who loves the house',
        'Solution: bring back the young couple. The ghosts stand down. Everyone signs the deed.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Eldra Hollowmere',
      role: 'ghost matriarch',
      personality:
        'The family matriarch who built the house 200 years ago. She is protective, particular, and deeply sentimental. She will accept nothing less than buyers who appreciate her home. "I laid every stone. I chose every beam. I will not let some nouveau riche PHILISTINE gut my parlor."',
      secret: 'She is lonely. Two centuries of scaring people away means two centuries alone.',
    },
    {
      name: 'Giles Goldridge',
      role: 'quest giver',
      personality:
        'The real estate agent who hired the party. Desperate. This property has been destroying his career metrics. He will take any offer. "I do not care if the buyer is a lich. If he has 80,000 gold and can sign his name, we are closing."',
    },
    {
      name: 'Maeve and Corrin Ashwood',
      role: 'ideal buyers',
      personality:
        'The young couple from the first showing. They are woodworkers who genuinely love old architecture. They call the original molding "exquisite." Eldra nearly cried.',
    },
  ],
  keyLocations: [
    {
      name: 'Hollowmere Manor',
      description: 'A beautiful 200-year-old manor that has been haunted into disrepair. The bones are magnificent. The ghosts keep it cleaner than any living person would.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Attic',
      description: 'Contains the Hollowmere family portraits, journals, and the original building plans. The ghosts do not haunt this room. It is their sanctuary.',
      significance: 'Where the party discovers the truth about the ghosts\' motivations.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'hauntedItem',
    'npcRelationWeb',
    'plotTwistEngine',
  ],
};
