import type { FullCampaign } from '../types';

export const theLittleBakery: FullCampaign = {
  id: 'full-little-bakery',
  type: 'full',
  title: 'The Little Bakery',
  tagline: 'You opened a bakery. The bread makes people happy. Suspiciously happy.',
  tone: 'social',
  themes: ['social', 'urban', 'comedy'],
  playerCount: { min: 2, max: 5 },
  levelRange: { start: 1, end: 4 },
  estimatedSessions: 10,
  settingSummary:
    'The city of Millhaven runs on commerce, gossip, and bread. The party has pooled their savings to open a bakery on Flour Street, wedged between a cheese shop and an apothecary. The oven is secondhand. The lease is steep. The competing bakery across the street - Goldcrust\'s - has been here for 30 years. The party has nothing but flour, ambition, and a mysteriously good recipe inherited from a grandmother who winked too much.',
  hook:
    'Day one. The ovens are lit, the sign is hung, and no one comes in for three hours. Then a dwarf walks in, buys a loaf, takes one bite, and starts crying. "This is the best bread I have ever tasted," he says, wiping his eyes. "It tastes like my childhood." Word spreads. People line up. Something about this bread is different.',
  twist:
    'The flour the party has been using is milled from Leywheat - a grain that only grows where ley lines cross. The bread is mildly magical. It does not heal or enchant. It just makes people feel a warmth they cannot explain. A comfort. A sense of home. Goldcrust\'s across the street notices the lines and starts investigating. They want the source.',
  climax:
    'Goldcrust\'s discovers the Leywheat source and tries to monopolize it. The party must protect their supplier, rally their customers and staff, and compete in the Grand Baking Championship to prove their bakery deserves to exist. The final bake is the most important loaf of bread anyone has ever made.',
  acts: [
    {
      title: 'Act 1: Open for Business',
      summary:
        'The party opens the bakery, learns to bake (mechanically and narratively), builds a customer base, hires their first employee, and discovers the bread has an unusual effect on people.',
      keyEvents: [
        'Opening day: empty for hours, then the crying dwarf, then a line around the block',
        'Sourcing ingredients: a mini-quest to find the best butter in Millhaven (the butter merchant is eccentric)',
        'Hiring staff: interviewing candidates including a goblin pastry prodigy and a tiefling who keeps setting things on fire',
        'The first hint: a customer says "your bread made me call my mother for the first time in ten years"',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Rising Dough',
      summary:
        'The bakery grows. Catering gigs, a noble\'s party, the health inspector, and escalating tension with Goldcrust\'s. The party discovers the flour is magical and must decide what that means for their business.',
      keyEvents: [
        'Catering a noble\'s dinner party: a social encounter where the bread must be perfect and the noble is impossible',
        'The health inspector: a deeply serious dwarf named Brickwell who measures crumb density',
        'Goldcrust\'s sends a spy to steal the recipe. The spy likes the bakery so much they defect.',
        'Discovering the Leywheat: the party\'s flour supplier reveals the grain grows on ley line crossings',
        'An ethical question: is it wrong to sell bread that makes people feel things?',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Grand Baking Championship',
      summary:
        'Goldcrust\'s discovers the Leywheat and tries to buy out the supplier. The party fights back through community organizing, supplier loyalty, and entering the Grand Baking Championship to establish their reputation beyond doubt.',
      keyEvents: [
        'Goldcrust\'s attempts a hostile takeover of the Leywheat supplier',
        'The party rallies their customers, staff, and neighbors to support the bakery',
        'The Grand Baking Championship: a city-wide competition judged by the Guild of Bakers',
        'The final bake: the party makes the most important loaf of their lives while Goldcrust\'s tries to sabotage them',
        'Win or lose, the neighborhood shows up. The bakery survives on community, not just bread.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Marta Goldcrust',
      role: 'rival / antagonist',
      personality:
        'Third-generation owner of Goldcrust\'s Bakery. Proud, competent, and threatened for the first time in 30 years. Not evil - just a businesswoman who has never lost and does not intend to start.',
      secret: 'She knows about Leywheat. Her grandmother used it. She stopped because the emotional effect made her uncomfortable. She regrets it.',
    },
    {
      name: 'Pip',
      role: 'employee / goblin pastry chef',
      personality:
        'A goblin with a genius-level talent for pastry and zero talent for customer service. Makes croissants that could end wars. Calls everyone "boss." Eats more product than she sells.',
    },
    {
      name: 'Inspector Brickwell',
      role: 'health inspector / recurring obstacle',
      personality:
        'A dwarf who takes food safety more seriously than most people take religion. Measures crumb density with calipers. Has shut down 14 bakeries this year. Secretly loves the party\'s bread but will NEVER admit it.',
    },
    {
      name: 'Renna Seedwell',
      role: 'flour supplier / ally',
      personality:
        'A halfling farmer who grows the Leywheat. Quiet, stubborn, and deeply loyal to anyone who treats her grain with respect. Refuses to sell to Goldcrust\'s on principle.',
    },
  ],
  keyLocations: [
    {
      name: 'The Little Bakery',
      description:
        'A cramped, warm shop on Flour Street with a secondhand oven, a hand-painted sign, and a smell that stops people on the sidewalk.',
      significance: 'Home base. The party builds this from nothing into a neighborhood institution.',
    },
    {
      name: 'Goldcrust\'s Bakery',
      description:
        'A gleaming establishment across the street. Brass fixtures, uniformed staff, and bread that is technically excellent and emotionally empty.',
      significance: 'The rival. Everything the party does not want to become.',
    },
    {
      name: 'The Championship Hall',
      description:
        'The Guild of Bakers\' grand hall. Marble counters, enchanted ovens, and a judging panel of the city\'s most feared food critics.',
      significance: 'Where the final competition takes place.',
    },
  ],
  dataSystems: ['socialEncounter', 'enchantedFoodDrink', 'npcPersonality', 'villageEvent', 'shopInventory'],
};
