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
        'Quiet moment: a survivor shares the last of her rations with a stranger\'s child. No words. Just a half loaf, offered.',
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
        'A rival settlement sends scouts. They want to trade. Or they want to take. If the party shared resources in Act 1, Fenrick comes in peace. If they hoarded, he comes armed.',
        'The moment of cost: a deep-sea creature attacks at night. The party must choose who to save - the healer tending the sick or the scouts mapping escape routes. Whoever is lost changes the settlement forever.',
        'Quiet moment: the first crop sprouts in the mud garden. Mira calls the whole settlement to see it. A single green shoot. People weep.',
        'A scholar among the survivors pieces it together: geological records show this happened before, millions of years ago. It was not a flood. It was a wave from something moving.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Leviathan',
      summary: 'The truth. The tremors. The descent to the ocean floor to prevent the next flood.',
      keyEvents: [
        'Tremors begin. The water table rises. The leviathan is stirring.',
        'If the party united with Fenrick\'s settlement, they have the resources and hands to build a submersible. If not, they go alone.',
        'The party must find a way underwater - salvaged submarine, water-breathing magic, a giant air bubble',
        'The ocean floor: the leviathan is so large it IS the ocean floor. Its parasites are the size of whales.',
        'Quiet moment: Fenrick stands on the shore watching the party descend. He whispers the name of the wave he saw from the lighthouse. The first time he has spoken it aloud.',
        'Soothing the beast: a ritual, a song, an offering. The party negotiates with a sleeping god.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Mira',
      role: 'settlement healer / pragmatic leader',
      personality:
        'A field medic who kept thirty people alive on boiled rainwater and hope. She does not want to lead but she is the only one people trust. "I do not have a plan. I have gauze and clean water. That is more than most." Arc: Act 1 reluctant caretaker, Act 2 the settlement\'s heart who names every child born in the mud, Act 3 the one who stays behind to keep the settlement alive while the party descends.',
    },
    {
      name: 'Fenrick',
      role: 'scavenger / rival leader',
      personality:
        'Leader of a neighboring survivor group. Not evil, but willing to take what he needs. He sees the world as zero-sum now. "Sharing is a luxury for people with enough. We do not have enough." Arc: Act 1 distant threat, Act 2 either trading partner or raider depending on the party\'s choices, Act 3 the one who finally names what he saw from the lighthouse - the shape beneath the wave.',
      secret: 'He was a lighthouse keeper. He watched the wave come. He is the only person who saw the leviathan\'s silhouette before the water hit.',
    },
    {
      name: 'Dr. Selene',
      role: 'scholar / the one who figures it out',
      personality:
        'A geologist-wizard who studies rock strata the way other people study books. She found fossilized evidence of previous floods - regular, cyclical, impossibly large. "This was not weather. This was biology." She grows obsessed across the acts, spending nights staring at the sea. By Act 3 she has composed the lullaby the party uses to soothe the leviathan - derived from tidal patterns in the fossil record.',
    },
  ],
  keyLocations: [
    {
      name: 'The Mudflats',
      description:
        'Miles of gray mud where a civilization used to be. Building tops jut out like tombstones. Ship masts stand landlocked. Everything is wet and nothing is stable.',
      significance: 'The hostile landscape the party must survive.',
    },
    {
      name: 'High Hill',
      description:
        'The settlement the party builds on the highest ground available. A fortified camp of salvaged materials and desperate ingenuity. By Act 2, it has a name the survivors chose together.',
      significance: 'Home base and the thing worth protecting.',
    },
    {
      name: 'The Deep',
      description:
        'The ocean floor where the leviathan sleeps. A creature so vast the seafloor is its skin. Thermal vents are its breath. Coral cities cling to its ridges, built by civilizations that worshipped it.',
      significance: 'The final destination and the source of everything.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'cataclysmCountdown',
    'settlementEvent',
    'encounterWaves',
    'monsterEcology',
    'magicalAnomaly',
    'npcRelationshipWeb',
    'socialEncounter',
  ],
};
