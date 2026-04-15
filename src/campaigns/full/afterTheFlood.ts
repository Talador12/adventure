import type { FullCampaign } from '../types';

export const afterTheFlood: FullCampaign = {
  id: 'full-after-the-flood',
  type: 'full',
  title: 'After the Flood',
  tagline: 'The water is gone. So is everything else. Build something from the mud.',
  tone: 'survival',
  themes: ['survival', 'wilderness', 'dark_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 16,
  settingSummary:
    'A flood of biblical scale has receded after drowning the known world for three months. What remains: mud, ruins, corpses, and scattered survivors. No civilization above water survived intact. Roads are gone. Bridges are gone. Supply chains do not exist. The party must find high ground, establish a settlement, and survive both the mundane threats of a post-apocalyptic landscape and the things that came up from the deep with the water - creatures from the ocean floor that have never seen sunlight, now stranded on land and very hungry.',
  hook: 'The party surfaces from whatever shelter kept them alive - a sealed mine, a mountaintop temple, a magically waterproofed cellar. The world outside is unrecognizable. A landscape of gray mud stretches to the horizon, broken by the tops of buildings and the masts of ships now landlocked miles from any coast. A group of survivors stumbles toward them, carrying a child. "Is there food? We have been walking for three days."',
  twist:
    'The flood was not natural. A leviathan - a creature so vast it could be mistaken for a tectonic event - rolled over in its sleep at the bottom of the ocean. The displacement wave drowned the world. The leviathan is still sleeping. The deep-sea creatures flooding the surface are parasites that fell off its body. If it rolls again, the next flood will be permanent. The party must find a way to keep a sleeping god-beast comfortable.',
  climax:
    'The leviathan stirs. Tremors shake the ground. The sea rises. The party has built a community, gathered allies, and learned the truth. They must descend to the ocean floor and soothe the leviathan back into deeper sleep - through music, magic, or an offering that satisfies a creature older than continents. If they fail, the next roll erases everything above sea level.',
  acts: [
    {
      title: 'Act 1: The Mud',
      summary: 'Immediate survival. Finding food, shelter, clean water, and other survivors in a landscape of devastation.',
      keyEvents: [
        'Emergence: the world is mud. Nothing is where it was. Navigation is impossible.',
        'First shelter: a partially collapsed building on high ground. Defensible. Barely.',
        'The deep-sea creatures: blind, pale, aggressive things that wash up in tidal pools and hunt by vibration',
        'A cluster of survivors found: 30 people, no food, one healer. The party must decide who leads.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Settlement',
      summary: 'Building a community from wreckage. Establishing food production, defenses, and governance while the deep-sea threats grow bolder.',
      keyEvents: [
        'Settlement construction: walls from rubble, gardens from mud, a well that keeps filling with salt water',
        'A rival settlement sends scouts. They want to trade. Or they want to take.',
        'The deep-sea creatures are getting bigger. Something drove them to the surface. Something enormous.',
        'A scholar among the survivors pieces it together: geological records show this happened before, millions of years ago. It was not a flood. It was a wave from something moving.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Leviathan',
      summary: 'The truth. The tremors. The descent to the ocean floor to prevent the next flood.',
      keyEvents: [
        'Tremors begin. The water table rises. The leviathan is stirring.',
        'The party must find a way underwater - salvaged submarine, water-breathing magic, a giant air bubble',
        'The ocean floor: the leviathan is so large it IS the ocean floor. Its parasites are the size of whales.',
        'Soothing the beast: a ritual, a song, an offering. The party negotiates with a sleeping god.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Mira',
      role: 'settlement healer / pragmatic leader',
      personality: 'A field medic who kept thirty people alive on boiled rainwater and hope. She does not want to lead but she is the only one people trust. "I do not have a plan. I have gauze and clean water. That is more than most."',
    },
    {
      name: 'Fenrick',
      role: 'scavenger / rival leader',
      personality: 'Leader of a neighboring survivor group. Not evil, but willing to take what he needs. He sees the world as zero-sum now. "Sharing is a luxury for people with enough. We do not have enough."',
      secret: 'He was a lighthouse keeper. He watched the wave come. He is the only person who saw the leviathan\'s silhouette before the water hit.',
    },
    {
      name: 'Dr. Selene',
      role: 'scholar / the one who figures it out',
      personality: 'A geologist-wizard who studies rock strata the way other people study books. She found fossilized evidence of previous floods - regular, cyclical, impossibly large. "This was not weather. This was biology."',
    },
  ],
  keyLocations: [
    { name: 'The Mudflats', description: 'Miles of gray mud where a civilization used to be. Building tops jut out like tombstones. Everything is wet and nothing is stable.', significance: 'The hostile landscape the party must survive.' },
    { name: 'High Hill', description: 'The settlement the party builds on the highest ground available. A fortified camp of salvaged materials and desperate ingenuity.', significance: 'Home base and the thing worth protecting.' },
    { name: 'The Deep', description: 'The ocean floor where the leviathan sleeps. A creature so vast the seafloor is its skin. Thermal vents are its breath.', significance: 'The final destination and the source of everything.' },
  ],
  dataSystems: ['wildernessSurvival', 'cataclysmCountdown', 'settlementEvent', 'encounterWaves', 'monsterEcology', 'magicalAnomaly', 'npcRelationshipWeb', 'socialEncounter'],
};
