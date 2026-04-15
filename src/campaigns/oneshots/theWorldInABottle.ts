import type { OneShotCampaign } from '../types';

export const theWorldInABottle: OneShotCampaign = {
  id: 'oneshot-world-in-a-bottle',
  type: 'oneshot',
  title: 'The World in a Bottle',
  tagline: 'A glass bottle on a shelf contains an entire miniature world. People live in it. They can see out. They are waving.',
  tone: 'exploration',
  themes: ['exploration', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'In a curio shop, the party finds a sealed glass bottle containing a tiny but complete world: mountains, rivers, forests, and a city. Through a magnifying glass, they can see people moving through the streets. One of them holds up a sign. It reads: "HELP US." The party must find a way to communicate with, enter, or free the bottled world.',
  hook: 'The shopkeeper does not know where the bottle came from. "It was in a box of estate sale items. I thought it was a snow globe." Under magnification, the sign-holder is joined by others. A second sign reads: "THE CORK. DO NOT REMOVE THE CORK."',
  twist: 'The world in the bottle is not a prison. It is a lifeboat. A wizard shrunk an entire city and bottled it to save it from a catastrophe that destroyed the rest of their world. The cork is the only thing maintaining the preservation spell. Removing it will restore the city to full size, but the catastrophe that destroyed their world is still raging outside the bottle, held at bay by the same cork. They need help escaping to a new world, not returning to their old one.',
  climax: 'The party must find a way to move the bottled civilization to safety: pouring them into a demiplane, shrinking themselves to enter and help from inside, or finding a safe location in the real world large enough for a suddenly full-sized city to appear.',
  scenes: [
    {
      title: 'Scene 1: The Bottle',
      summary: 'Examining the bottled world, establishing communication with its inhabitants, and understanding the stakes.',
      challenge: 'puzzle',
      keyEvents: [
        'Magnified observation: a complete city of thousands, living normal lives at tiny scale',
        'Communication: the inhabitants hold up signs in response to the party\'s words',
        'The first warning: DO NOT REMOVE THE CORK, repeated on signs, walls, banners',
        'A scholar inside the bottle provides the backstory through written signs',
      ],
    },
    {
      title: 'Scene 2: The Problem',
      summary: 'Understanding what the bottle preserves and what it holds back. The party explores solutions.',
      challenge: 'puzzle',
      keyEvents: [
        'The catastrophe: visible as a roiling storm in the bottle\'s sky, frozen by the cork',
        'The wizard who bottled them is dead, her notes found in the curio shop box',
        'Options emerge: demiplane transfer, party shrinks to enter, find safe landing zone',
        'The cork is degrading: hairline cracks visible, time pressure mounts',
      ],
    },
    {
      title: 'Scene 3: The Uncorking',
      summary: 'Executing the chosen plan. The cork must come off eventually. The question is where and how the city lands safely.',
      challenge: 'exploration',
      keyEvents: [
        'Preparation: securing a safe destination for a city\'s worth of people',
        'The uncorking: the bottle opens and the city begins to expand',
        'The catastrophe tries to follow but the party must sever the connection',
        'Thousands of grateful people suddenly exist in the party\'s world, full-sized and bewildered',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Shopkeeper Tannis', role: 'framing device', personality: 'A curio dealer who has no idea what he is selling. Helpful but out of his depth. "I priced it at 5 gold. I feel like that might have been low."' },
    { name: 'Mayor Vell (bottled)', role: 'ally / quest giver', personality: 'The mayor of the bottled city, communicating through tiny signs. Calm under pressure, deeply grateful, and managing 4,000 people who live in a bottle. "We have been waiting 200 years. We can wait another hour for a good plan."' },
    { name: 'Wizard Alara (notes)', role: 'backstory', personality: 'The wizard who bottled the city. Present only through notes found in the estate box. Brilliant, desperate, and out of time when she cast the spell. She died from the effort.' },
  ],
  keyLocations: [
    { name: 'The Curio Shop', description: 'A cluttered shop where the bottle sits on a shelf between a stuffed owl and a broken compass.', significance: 'Where the adventure begins with a casual discovery.' },
    { name: 'The Bottled City', description: 'An entire functioning city at miniature scale inside a glass bottle, complete with people, buildings, and a frozen catastrophe.', significance: 'The central mystery and the population that needs saving.' },
    { name: 'The Landing Zone', description: 'Wherever the party decides to uncork the bottle and restore the city to full size.', significance: 'The climax location, chosen by the party\'s plan.' },
  ],
  dataSystems: ['planarTravel', 'puzzleLock', 'npcDialogue', 'socialEncounter', 'explorationChallenge'],
};
