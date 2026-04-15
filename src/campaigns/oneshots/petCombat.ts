import type { OneShotCampaign } from '../types';

export const petCombat: OneShotCampaign = {
  id: 'oneshot-pet-combat',
  type: 'oneshot',
  title: 'Pet Combat',
  tagline: 'Only familiars and animal companions can fight. The cat refuses to engage. The frog keeps eating treasure.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Dungeon of Diminishment shrinks any creature larger than a cat to one inch tall upon entry. The party\'s humanoid members are now action-figure sized. Their familiars and animal companions, being already small, are unaffected. The cat is now the biggest thing in the party. The frog is a mount. The hawk is close air support. The spider is the heavy. The players must direct their pets through the dungeon while riding on their backs, clinging to their fur, and desperately trying to get a CAT to follow tactical instructions.',
  hook: 'The party shrinks as they cross the threshold. The wizard is now one inch tall, standing next to his cat familiar, which is suddenly the size of a horse relative to him. The cat looks down. The wizard looks up. The cat is not taking orders. The cat was never taking orders. The power dynamic has fundamentally shifted.',
  twist: 'The dungeon boss is a normal-sized house cat that wandered in. To the shrunken party, it is a dragon-class threat. To their familiars, it is just another cat. The climax is a cat fight. A literal cat fight between the party\'s cat familiar and a random house cat, while one-inch-tall adventurers ride their animal companions into battle and try not to get stepped on.',
  climax: 'Cat versus cat in the final chamber. The party directs their familiars and companions in the most chaotic pet battle ever fought. The hawk dive-bombs the enemy cat. The spider webs its legs. The frog... eats a bug and misses the entire fight. The party\'s cat wins through sheer attitude. The dungeon effect reverses at the exit.',
  scenes: [
    {
      title: 'The Shrinking',
      summary: 'The party shrinks. The pets do not. The new pecking order is established. The cat is in charge.',
      challenge: 'exploration',
      keyEvents: [
        'The wizard is one inch tall, standing between the paws of his housecat familiar. The cat yawns.',
        'Mounting the animals: the fighter rides the hawk. The rogue rides the spider. The cleric rides the frog. The wizard desperately tries to steer the cat.',
        'First obstacle: a closed door. The cat pushes it open. The cat gets credit. The party does not.',
        'The frog eats a fly. The cleric, on the frog\'s back, is taken along for the ride. Vertigo.',
      ],
    },
    {
      title: 'Pet Tactics',
      summary: 'The party must fight dungeon creatures using only their pets. Directing animals in combat is exactly as difficult as it sounds.',
      challenge: 'combat',
      keyEvents: [
        'Enemy: a rat. To the one-inch party, it is an ogre. The hawk swoops. The rat dodges. The hawk crashes into a wall.',
        'The spider attempts to web the rat. The spider webs the frog instead. The cleric is stuck. "FROG. FROG NO."',
        'The cat is napping. The wizard screams tactical commands from the cat\'s back. The cat does not care.',
        'The frog solves the encounter by eating the rat. The cleric, on the frog, goes into the mouth briefly. She is fine. She is not okay, but she is fine.',
      ],
    },
    {
      title: 'The Cat Fight',
      summary: 'The final boss: a normal house cat that is Godzilla-sized to the shrunken party. The familiars must fight a cat while the party directs from one-inch-tall command posts.',
      challenge: 'combat',
      keyEvents: [
        'The boss cat: orange tabby, absolutely enormous relative to the party. It sees the party\'s cat. Territorial standoff.',
        'The hawk goes for the eyes. The spider goes for the legs. The frog goes for a bug on the ceiling. Priorities.',
        'Cat versus cat: hissing, swatting, circling. The wizard casts a one-inch-tall Prestidigitation to distract the enemy cat. It works.',
        'Victory: the party\'s cat wins through sheer disdain. The enemy cat retreats. The party exits the dungeon and returns to normal size. The cat acts like nothing happened. It did not need help.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Mr. Whiskers (the Cat)', role: 'party muscle / indifferent', personality: 'The wizard\'s cat familiar who is suddenly the most powerful member of the party. Does not care. Has never cared. Will fight the boss when it feels like it and not a moment sooner. Naps at strategically inconvenient times.' },
    { name: 'Hopsworth (the Frog)', role: 'mount / liability', personality: 'The druid\'s frog companion. Follows orders approximately 30% of the time. The other 70% is eating bugs, jumping at random, and sitting in puddles. A terrible mount. An enthusiastic friend.' },
  ],
  keyLocations: [
    { name: 'The Dungeon of Diminishment', description: 'A dungeon where humanoids shrink to one inch. Furniture is a mountain range. Puddles are lakes. A normal room is a vast terrain from the party\'s perspective.', significance: 'The setting. Everything is massive relative to the shrunken party.' },
    { name: 'The Final Chamber', description: 'A large room with a cat bed, water bowl, and an orange tabby that has claimed the dungeon as its territory.', significance: 'The boss arena. Where cats decide the fate of the adventure.' },
  ],
  dataSystems: ['combatNarration', 'encounterWaves', 'chaseSequence'],
};
