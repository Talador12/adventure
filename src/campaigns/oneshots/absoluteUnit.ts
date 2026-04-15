import type { OneShotCampaign } from '../types';

export const absoluteUnit: OneShotCampaign = {
  id: 'oneshot-absolute-unit',
  type: 'oneshot',
  title: 'Absolute Unit',
  tagline: 'Every monster is the largest possible version of itself. The architecture was not built for this.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Dungeon of Proportional Excess was built by a wizard who miscast Enlarge and could never figure out how to cast Reduce. Everything in his dungeon grew. The rats are horse-sized. The goblins are ogre-sized. The dragon is mountain-sized and physically cannot fit inside its own lair. Doors are normal-sized. Corridors are normal-sized. The monsters do not fit. They are stuck in doorways, wedged in corridors, and crammed into rooms. The dungeon was not built for this. Neither were the party\'s tactics.',
  hook: 'A quest board posting reads: "DUNGEON CLEARED. ALL MONSTERS DEFEATED. REWARD PENDING." When the party arrives, they find the dungeon\'s monsters are very much alive. They are just stuck. A horse-sized rat is wedged in the entrance. An ogre-sized goblin is folded into a 10x10 room like a contortionist. Somewhere deep inside, a muffled roar shakes the walls. Something enormous is very, very unhappy about its living situation.',
  twist:
    'The Enlarge effect is spreading. It is not limited to the dungeon anymore. Insects outside the dungeon entrance are getting larger. Squirrels are the size of dogs. Within hours, everything in a mile radius will be maximum size. The party must find and destroy the wizard\'s malfunctioning Enlarge Engine in the deepest room - which is occupied by a dragon that already fills the entire chamber wall-to-wall.',
  climax:
    'The Enlarge Engine is embedded in the wall behind a dragon that is literally too big to move in its own lair. The dragon cannot turn around. It cannot use its breath weapon without hitting itself off the ceiling. The party must navigate around, under, and through the gaps between a frustrated, immobile dragon and the dungeon walls to reach the engine. The dragon is not hostile - it is just stuck and increasingly claustrophobic. It agrees to let them pass if they promise to shrink it. They destroy the engine. Everything deflates. The dragon is finally free and immediately flies away without a word.',
  scenes: [
    {
      title: 'Scene 1: The Entrance Problem',
      summary:
        'The dungeon entrance is blocked by a rat the size of a horse. The corridors beyond have oversized goblins stuck at intersections. Every combat encounter is complicated by the fact that the monsters physically cannot maneuver. Neither can the party, because the monsters are blocking everything.',
      challenge: 'combat',
      keyEvents: [
        'The horse-sized rat is wedged in the doorway. It cannot back up. It cannot go forward. It can bite.',
        'Three ogre-sized goblins are stuck in a corridor in single file. They can only attack with their front goblin. The back two are shouting unhelpful advice.',
        'A gelatinous cube that is too big for its room is oozing through the doorway like toothpaste from a tube.',
        'The party realizes: the monsters are as inconvenienced by this as they are. Some are willing to negotiate if it means getting unstuck.',
      ],
    },
    {
      title: 'Scene 2: The Furniture Problem',
      summary:
        'Deeper rooms contain enlarged furniture, treasure, and traps. A gold coin the size of a dinner plate. A treasure chest the party cannot open because the lid weighs 400 pounds. A pit trap that is more of a canyon. The scale of everything creates bizarre puzzle scenarios.',
      challenge: 'puzzle',
      keyEvents: [
        'A locked door with a keyhole. The key is enlarged. It does not fit its own lock.',
        'A treasure room full of coins the size of plates, gems the size of fists, and a potion bottle as tall as a halfling. Carrying loot is a logistics nightmare.',
        'An enlarged pit trap: 60 feet wide, 200 feet deep. The "narrow bridge" across it is 15 feet wide. Still terrifying at this scale.',
        'The party finds the wizard\'s journal. Entry 1: "Slight miscalculation." Entry 47: "I cannot leave my bedroom. My bed is too big."',
      ],
    },
    {
      title: 'Scene 3: The Spreading Problem',
      summary:
        'The party discovers the Enlarge effect is leaking outside. Animals near the entrance are growing. A patrol of knights arrives with a dog the size of a pony that was normal-sized an hour ago. The clock is ticking.',
      challenge: 'exploration',
      keyEvents: [
        'Outside the dungeon: ants the size of cats, birds the size of eagles, a rabbit the size of a great dane. Growing by the minute.',
        'A knight patrol arrives. Their war dog is now pony-sized and still growing. "THIS WAS A NORMAL DOG AN HOUR AGO."',
        'The party realizes the source is deep in the dungeon. They must push through enlarged obstacles faster.',
        'A hallway where the ceiling has cracked because an enlarged spider is pushing against it from above. The spider is embarrassed.',
      ],
    },
    {
      title: 'Scene 4: The Dragon Problem',
      summary:
        'The final chamber contains the Enlarge Engine and a dragon that fills the room wall-to-wall. The dragon cannot move, attack effectively, or leave. It is not angry. It is claustrophobic and desperate. The party must navigate the gaps between dragon and wall to reach the engine.',
      challenge: 'exploration',
      keyEvents: [
        'The dragon fills the chamber. Its head is pressed against one wall. Its tail against the other. It can see the party through one eye.',
        '"I have been stuck here for THREE WEEKS. If you can make me smaller, I will let you climb across me. Please. PLEASE."',
        'Navigating across a living dragon: climbing over scales, ducking under a wing, squeezing past its neck. It is trying very hard not to sneeze.',
        'The Enlarge Engine is destroyed. Everything deflates in reverse order. The dragon shrinks, stretches, and bolts out of the dungeon at full speed. It does not look back.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Magnifax the Miscast Wizard',
      role: 'dungeon creator (deceased, journal only)',
      personality:
        'A wizard whose journal entries chart a slow descent from "oops" to "everything is enormous and I live in the bathroom now because it is the only room I still fit in." His final entry: "I have made a terrible mistake. Also the bathroom rat is now bigger than me."',
    },
    {
      name: 'Thornscale the Stuck Dragon',
      role: 'final room obstacle / reluctant ally',
      personality:
        'A young red dragon who flew into the dungeon to eat the enlarged rats, got enlarged himself, and is now wedged into the treasure chamber with zero room to maneuver. He is not hostile. He is having a panic attack. "I CANNOT FEEL MY LEFT WING. IS IT STILL THERE? I CANNOT TURN MY HEAD TO CHECK."',
    },
    {
      name: 'Captain Aldric',
      role: 'outside authority / ticking clock',
      personality:
        'A knight patrol captain whose previously normal-sized dog is now the size of a small horse and still growing. He is very concerned. The dog is very happy about being big. "SOMEONE explain to me why my terrier weighs 300 pounds."',
    },
  ],
  keyLocations: [
    {
      name: 'The Dungeon of Proportional Excess',
      description:
        'A standard dungeon with normal-sized architecture containing monsters, objects, and furniture that are all maximum possible size. Everything is wedged, crammed, and stuck. Doorways are bottlenecks. Corridors are obstacle courses. Rooms are too small for their contents.',
      significance: 'The entire adventure. Every room is a spatial puzzle layered on top of whatever encounter lives there.',
    },
    {
      name: 'The Enlarge Engine Chamber',
      description:
        'The deepest room, entirely filled by a claustrophobic dragon and a humming arcane device embedded in the far wall. The only path is over, under, and around the dragon.',
      significance: 'The climax location. Destroying the engine ends the enlargement and frees the dragon.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'monsterGenerator',
    'trapDisarm',
    'dungeonDressing',
    'environmentalHazard',
    'fantasyInsults',
  ],
};
