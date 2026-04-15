import type { OneShotCampaign } from '../types';

export const theEndlessStaircase: OneShotCampaign = {
  id: 'oneshot-endless-staircase',
  type: 'oneshot',
  title: 'The Endless Staircase',
  tagline: 'A staircase that only goes down. The party has been descending for hours. There is no bottom. Or is there?',
  tone: 'exploration',
  themes: ['exploration', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The party enters a tower ruin and finds a staircase spiraling downward. After an hour, they should have descended far below the surface, but the staircase continues. The scenery outside the narrow windows changes: forest becomes swamp, then desert, then ocean, then places they do not recognize. The stairs keep going. Going back up leads somewhere different than where they started.',
  hook: 'The first landing: the view outside the window shows the forest they entered from. The tenth landing: the view shows a swamp under a green moon. The twentieth: an ocean of black water. The stairs do not end. Going back up, the party reaches a landing they never passed on the way down.',
  twist: 'The staircase is a planar spine, a structure that threads through every plane of existence. Each landing opens to a different world. It was built as a highway between planes, abandoned when the gods sealed the connections. The staircase still works. The doors to each plane are just locked. All except one: the bottom, where the staircase\'s architect is trapped between planes.',
  climax: 'At the bottom, the architect exists in a space between all planes simultaneously. They offer the party a key that opens any landing\'s door, granting access to any plane of existence. The price: someone must take the architect\'s place as the staircase\'s anchor.',
  scenes: [
    {
      title: 'Scene 1: The Descent Begins',
      summary: 'The first 20 landings. Each window shows a different world. The party realizes the staircase is not normal and going back is not straightforward.',
      challenge: 'exploration',
      keyEvents: [
        'Landings 1-5: familiar landscapes, progressively distant from the starting point',
        'Landings 6-10: unfamiliar biomes, alien skies, wrong-colored suns',
        'Landings 11-20: impossible places, floating islands, inverted cities, starless voids',
        'Going back up: the landings have shuffled, the entry point is gone',
      ],
    },
    {
      title: 'Scene 2: The Locked Doors',
      summary: 'Some landings have doors, all locked. The party finds evidence of previous travelers and begins to understand the staircase\'s purpose.',
      challenge: 'puzzle',
      keyEvents: [
        'Locked doors: heavy, runed, with keyholes that glow faintly',
        'Previous travelers: scratched messages on walls in dozens of languages and scripts',
        'A campsite: someone lived on a landing for weeks, their journal details the pattern',
        'The pattern: the staircase is a highway, each landing a stop, but all connections severed',
      ],
    },
    {
      title: 'Scene 3: The Bottom',
      summary: 'The staircase ends at a landing that exists between all planes. The architect waits, trapped for millennia, with an offer.',
      challenge: 'social',
      keyEvents: [
        'The final landing: not a room but a space where all planes overlap in shifting layers',
        'The architect: a figure who exists simultaneously in every plane, unable to leave',
        'The offer: a skeleton key to every door, in exchange for someone taking the anchor role',
        'The alternative: the party can choose to leave the staircase through any open window instead',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Architect', role: 'trapped creator', personality: 'A being who built the staircase millennia ago and became its prisoner. Not bitter, just infinitely tired. "I built a road between worlds. I did not realize I would become its foundation."' },
    { name: 'Kael (journal author)', role: 'information (deceased)', personality: 'Present only through their journal found on a landing. A scholar who figured out the pattern but could not find the bottom. Their final entry: "I am going back up. If the doors change again, I may never find this landing."' },
    { name: 'The Window Watcher', role: 'mystery / obstacle', personality: 'A figure visible through the windows of certain landings, always watching from whatever world is on the other side. It mirrors the party\'s movements. It is the architect\'s reflection.' },
  ],
  keyLocations: [
    { name: 'The Tower Ruin', description: 'A crumbling tower that appears to be three stories from outside but contains an infinite descending staircase.', significance: 'The entry point that does not match what is inside.' },
    { name: 'The Staircase', description: 'An endless spiral staircase where each landing\'s window opens to a different plane of existence.', significance: 'The adventure itself. Every landing is a new wonder.' },
    { name: 'The Bottom Landing', description: 'A space between all planes where the staircase\'s architect exists as a living anchor.', significance: 'The climax where the party confronts the staircase\'s purpose.' },
  ],
  dataSystems: ['planarTravel', 'explorationChallenge', 'puzzleLock', 'npcDialogue', 'environmentalHazard'],
};
