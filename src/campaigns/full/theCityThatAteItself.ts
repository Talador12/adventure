import type { FullCampaign } from '../types';

export const theCityThatAteItself: FullCampaign = {
  id: 'full-the-city-that-ate-itself',
  type: 'full',
  title: 'The City That Ate Itself',
  tagline: 'The streets are digesting. The buildings are swallowing each other. You are in the stomach.',
  tone: 'survival',
  themes: ['survival', 'urban', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Gormund is alive. Not metaphorically. The buildings breathe. The streets pulse. The sewers are intestines. It has been alive for centuries, growing outward by consuming inward. The outer districts expand as the inner districts are digested - buildings absorbed into walls, streets folded into new foundations, entire neighborhoods swallowed and reformed. Gormund reproduces by fission, like a cell. Every few centuries it consumes its core and births a new, smaller city inside the old shell. This is natural. This is how living cities work. The party just happened to be inside the core when the contractions started.',
  hook: 'The party is in Gormund\'s central market when the ground lurches. A building across the square folds in on itself - not collapsing, folding, like a hand closing. The street beneath it ripples and the rubble is absorbed into the cobblestones. A local grabs the party: "It is starting again. The city is contracting. You need to get to the outer ring before the center closes." The outer ring is three miles away. The city is already eating the district behind them.',
  twist:
    'The city is not eating itself. It is giving birth. The consumed districts are not being destroyed - they are being reformed into a new, smaller city inside the old one. The "digestion" is gestation. Gormund is splitting into Gormund and a daughter city that will eventually separate and crawl to a new location on its own foundations. The contractions are labor. The party is inside a living organism during reproduction. Nobody is in danger from malice. Everyone is in danger from biology.',
  climax:
    'The party reaches the boundary between old Gormund and the forming daughter city. They can escape outward to safety (the old city stabilizes once the core is consumed). They can enter the daughter city as it forms (becoming the first inhabitants of a newborn settlement, shaping its growth). Or they can try to stop the birth (saving the core district but potentially killing both the mother city and the child). The city shakes. The streets contract. Something small and new is being built from everything old and consumed. It is, in its own way, beautiful.',
  acts: [
    {
      title: 'Act 1: The Contractions',
      summary:
        'The city begins consuming its center. The party must escape the digestion zone while navigating streets that are actively being absorbed. Buildings fold. Roads close. The familiar becomes alien as architecture is eaten alive.',
      keyEvents: [
        'The first contraction: a building folds into the street like paper crumpling. The rubble is absorbed in seconds.',
        'The party meets Sev, a local who has survived a previous contraction cycle and knows the escape routes',
        'A district the party just passed through is gone. Not destroyed - absorbed. The street is smooth where it was.',
        'The sewers are faster but the sewers are intestines. Literally. The walls pulse.',
        'A building tries to absorb the party. Strength saves to pull free of architecture that is closing like a mouth.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Belly',
      summary:
        'Deeper in the digestion zone. The party discovers the city is not destroying - it is building something. Consumed buildings are being reformed into new structures. The streets are not gullets, they are birth canals. The party begins to understand what is actually happening.',
      keyEvents: [
        'Inside the consumed zone: raw, organic architecture. Walls made of compressed buildings. Floors of melted cobblestone.',
        'A chamber of reformed structures: familiar buildings rebuilt in miniature, like a city in embryo',
        'A sage in the consumed zone who stayed deliberately: "I have been studying Gormund for forty years. This is reproduction."',
        'The daughter city\'s heartbeat: a rhythmic pulse from the center of the consumed zone. Something is alive in there.',
        'Organic defenders: the city\'s immune system treats the party as foreign bodies. Architecture attacks.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Birth',
      summary:
        'The party reaches the boundary. Behind them, a new city is forming from the consumed material of the old core. Ahead, the outer shell of Gormund stabilizes. The party chooses their future: escape, explore, or intervene.',
      keyEvents: [
        'The boundary: a wall of living stone that separates old Gormund from the forming daughter city',
        'The daughter city: visible through translucent walls, a miniature version of Gormund taking shape. Streets, buildings, a market.',
        'The choice: exit to safety, enter the newborn city, or try to stop the process',
        'If entering: the daughter city accepts the party as founders. The streets form around them. It is disorienting and wonderful.',
        'The birth completes. Gormund stabilizes. A new city exists where the old center was. The outer shell is scarred but alive.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Sev',
      role: 'guide / survivor',
      personality:
        'A grizzled local who survived a previous contraction fifty years ago as a child. He knows the escape routes. He is terrified but practical. He lost his home last time and he is about to lose it again.',
      secret: 'He does not want to escape. He wants to enter the daughter city. He lost his home in the last contraction and has been waiting for this one to claim a new one.',
    },
    {
      name: 'Archivist Lunelle',
      role: 'lore keeper / reckless scholar',
      personality:
        'A sage who deliberately stayed in the digestion zone to study the process. Brilliant, manic, and taking notes while the floor tries to eat her shoes. She understands what is happening better than anyone and cannot stop being excited about it.',
      secret: 'She has been feeding the city information - architectural plans, blueprints, designs - hoping to influence what the daughter city becomes.',
    },
    {
      name: 'Mayor Voss',
      role: 'authority figure / obstruction',
      personality:
        'The mayor of Gormund\'s outer districts. He knows what the contractions are but has suppressed the information to prevent panic. Pragmatic and exhausted. He has evacuation plans. They are not good enough.',
    },
    {
      name: 'The Daughter City',
      role: 'entity / newborn',
      personality:
        'Not an NPC in the traditional sense, but the forming city has a rudimentary awareness. It responds to the party\'s presence. It builds doors where they need doors. It is a newborn organism learning to be a place.',
    },
  ],
  keyLocations: [
    {
      name: 'Gormund (Outer Shell)',
      description: 'The surviving portion of a living city. Streets that breathe, buildings that shift, and a population that treats architectural biology as normal because it is.',
      significance: 'The frame. Where the party starts and where safety lies, if they can reach it.',
    },
    {
      name: 'The Digestion Zone',
      description: 'The collapsing core of Gormund. Buildings fold, streets are absorbed, and the raw material of a city is recycled into something new.',
      significance: 'The dungeon. A city eating itself is the most hostile environment the party has ever navigated.',
    },
    {
      name: 'The Daughter City',
      description: 'A newborn city forming inside the consumed core. Miniature, raw, alive, and reaching for the surface like a plant reaching for light.',
      significance: 'The revelation. Not destruction but creation. The entire campaign reframes in this room.',
    },
  ],
  dataSystems: [
    'environmentalHazard',
    'dungeonRoom',
    'chaseSequence',
    'trapMechanism',
    'urbanEncounter',
    'wildernessExploration',
    'survivalScenario',
  ],
};
