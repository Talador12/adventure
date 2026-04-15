import type { FullCampaign } from '../types';

export const thePortalLottery: FullCampaign = {
  id: 'full-the-portal-lottery',
  type: 'full',
  title: 'The Portal Lottery',
  tagline: 'Random portals. Random destinations. A portal to a cheese dimension just opened in the town square.',
  tone: 'shenanigans',
  themes: ['comedy', 'planar', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'The Crossroads - an ancient planar hub that manages interdimensional travel - has crashed. Like a cosmic switchboard with all the cables pulled out, portals are opening randomly across the city of Nexusburg. They go to random places. A portal to a dimension made entirely of cheese appeared in the town square. A portal to an exact copy of the current room opened inside the room, creating an infinite mirror effect. A portal to five minutes ago keeps appearing in the mayor\'s office, making meetings a temporal nightmare. The portals are harmless individually but collectively they are making reality feel like a shuffled deck of cards.',
  hook: 'The party is walking down the street when a portal opens in front of them. They step through and are in a dimension where everything is slightly to the left. They step back and are on a different street. Another portal opens and a confused cow falls out of it. Then a portal to the ocean opens overhead and dumps 400 gallons of saltwater on the market district. The city guard is overwhelmed. The Planar Transit Authority is hiring anyone who can help.',
  twist:
    'The Crossroads did not crash on its own. A planar entity called the Shuffler has been rearranging the portal network for fun. The Shuffler is not malicious - it is a cosmic being whose nature is randomness, the living embodiment of "what if." It does not understand that random portals cause problems because to the Shuffler, randomness IS order. It thinks it is fixing the network by making it more interesting.',
  climax:
    'The Shuffler decides to make its masterpiece: a portal that connects EVERYWHERE to EVERYWHERE simultaneously. Every point in the multiverse linked to every other point in a single, chaotic nexus. If activated, geography ceases to exist. The party must enter the Crossroads hub - which is currently a kaleidoscope of every dimension overlapping - and either convince the Shuffler that structure has value, out-random it by being more chaotic than chaos itself, or reset the entire network with a controlled shutdown that will leave every portal closed for 24 hours.',
  acts: [
    {
      title: 'Act 1: Portal Roulette',
      summary:
        'Portals open randomly across Nexusburg. The party deals with the fallout - creatures from other dimensions, displaced citizens, geographical confusion. Each session features increasingly absurd portal destinations. The party is recruited by the Planar Transit Authority to investigate.',
      keyEvents: [
        'The cheese dimension: a portal to a realm of sentient cheese. Delegates emerge. They want trade agreements. Spiral begins: each session introduces a more absurd portal destination. Cheese, time loops, gravity suggestions, and a dimension where everything is slightly to the left. The stack of unresolved portal crises grows faster than the party can address them.',
        'The mirror portal: opens into an identical room, creating an infinite regression. The party meets themselves.',
        'The temporal portal: five minutes ago keeps opening in government buildings. Nothing gets decided.',
        'The PTA hires the party to trace the malfunction to the Crossroads hub.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Chasing the Shuffler',
      summary:
        'The party enters the portal network to reach the Crossroads. Every transit is a gamble - they aim for the hub but end up in random dimensions along the way. They discover the Shuffler and learn it thinks it is helping.',
      keyEvents: [
        'Portal hopping: the party aims for the hub, lands in a dimension where gravity is a suggestion.',
        'The Backwards Dimension: everything runs in reverse. Conversations end before they start.',
        'First contact with the Shuffler: it appears as a constantly shifting being of doors and pathways.',
        'The Shuffler\'s logic: "Order is boring. I am making it interesting. You should be grateful."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Grand Shuffle',
      summary:
        'The Shuffler begins its masterpiece. The party races through collapsing dimensional boundaries to reach the Crossroads core. The hub is every dimension at once - floor made of ocean, ceiling made of cheese, walls made of five minutes ago.',
      keyEvents: [
        'The Grand Shuffle begins: portals merge. Walking through a door leads to three places simultaneously.',
        'The Crossroads hub: a cathedral of portals where every dimension is visible through overlapping doorways.',
        'Confrontation: the party must solve the Shuffler by being more creative than random chance.',
        'Resolution: the network resets. Portals close for 24 hours. The world holds its breath. Then they reopen. Correctly. Chaos callback: Ambassador Brie from the cheese dimension is the last portal to close. She demands one final thing: a trade agreement signed before the portal seals. The party signs it. Cheese imports begin next week.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'The Shuffler',
      role: 'cosmic entity / agent of chaos',
      personality:
        'The living embodiment of randomness. Changes form constantly. Speaks in non-sequiturs that are somehow relevant. Does not understand why predictability is desirable. "Why would you want to KNOW where a door goes? The surprise is the point. You mortals are so rigid."',
      secret: 'The Shuffler is lonely. It randomizes because it wants to connect everything to everything. It does not understand that connections need structure to have meaning.',
    },
    {
      name: 'Director Compass Rose',
      role: 'PTA director / exasperated authority',
      personality:
        'The head of the Planar Transit Authority who has not slept in a week. Her transit maps are useless. Her schedules are fiction. Her staff keeps accidentally stepping through portals and ending up in other dimensions. "I have 47 transit operators stranded across 23 dimensions. My budget does not cover interdimensional hazard pay."',
    },
    {
      name: 'Ambassador Brie',
      role: 'cheese dimension diplomat',
      personality:
        'A sentient wheel of brie who emerged from the cheese portal and is now seeking formal diplomatic relations with the material plane. Takes governance very seriously. Is delicious and knows it. "My people have a rich culture, a sophisticated economy, and a shelf life. We would appreciate recognition."',
    },
    {
      name: 'Temporal Mayor Aldridge (x3)',
      role: 'politician / time-loop victim',
      personality:
        'The mayor of Nexusburg who has three versions of himself from different five-minute intervals attending every meeting. They disagree on everything. "I said we should close the portals." "I said that five minutes ago and you overruled me." "I have not said it yet but I am going to."',
    },
  ],
  keyLocations: [
    {
      name: 'Nexusburg',
      description: 'A trade city built at a natural planar convergence. Usually an organized hub of interdimensional commerce. Currently a lottery of random portals, displaced creatures, and geographical confusion.',
      significance: 'The ground-level demonstration of the portal crisis and the party\'s starting location.',
    },
    {
      name: 'The Crossroads Hub',
      description: 'The ancient control center of the portal network. A cathedral-sized chamber where every portal in existence is represented by a door. Currently, all the doors are open and everything is leaking into everything else.',
      significance: 'Where the Shuffler is based and where the network must be reset.',
    },
    {
      name: 'The Cheese Dimension',
      description: 'An entire plane of existence composed of dairy products. Rolling hills of cheddar. Rivers of fondue. A parliament of sentient cheeses governing with surprising competence.',
      significance: 'The most memorable portal destination and proof that the multiverse is stranger than anyone imagined.',
    },
  ],
  dataSystems: [
    'explorationHazard',
    'environmentalHazard',
    'plotTwistEngine',
    'combatNarration',
    'socialEncounter',
    'riddleGenerator',
    'trapGenerator',
    'fantasyInsults',
  ],
};
