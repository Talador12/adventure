import type { OneShotCampaign } from '../types';

export const gravityWell: OneShotCampaign = {
  id: 'oneshot-gravity-well',
  type: 'oneshot',
  title: 'Gravity Well',
  tagline: 'Gravity doubles every round. At 10x, bones break. The exit puzzle requires steady hands.',
  tone: 'survival',
  themes: ['survival', 'dungeon_crawl', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 2.5,
  settingSummary:
    'A dungeon room with a planar anomaly. When the party enters, gravity begins increasing. Each round it gets heavier. Movement slows, weapons become unwieldy, and eventually standing is impossible. The exit requires solving a mechanical puzzle with precise finger movements while being crushed by your own weight.',
  hook: 'The door slams behind you. The room hums. You feel heavier. Not tired. Heavier. Your pack digs into your shoulders. The sword pulls your arm down. A stone tablet on the far wall reads: "SOLVE THE LOCK OR BECOME PART OF THE FLOOR."',
  twist:
    'The gravity anomaly is not a trap. It is a containment mechanism for a creature made of condensed matter that lives in the floor. Solving the puzzle does not open the door - it releases the creature. The real exit is a hidden hatch that only becomes visible at extreme gravity, because it was designed to be found by someone too heavy to stand.',
  climax:
    'The party must choose: solve the puzzle (which releases the gravity creature) and fight it while crushed, or find the hidden hatch by getting low enough to see it. Either way, they are operating at extreme gravity where every action is agony.',
  scenes: [
    {
      title: 'Scene 1: The Weight',
      summary: 'Gravity increases. The party explores the room and finds the puzzle while adapting to crushing force.',
      challenge: 'puzzle',
      keyEvents: [
        'Round 1: 2x gravity. A potion bottle slips from a belt and shatters on the floor. It fell twice as fast. Movement is wading through invisible mud.',
        'The puzzle: a mechanical lock with eight delicate tumblers across the room. Each tumbler requires precise finger pressure. At normal gravity, trivial. At 4x, your fingers weigh four times what they should.',
        'Round 3: 4x gravity. A longsword weighs twenty pounds. Plate armor weighs two hundred and forty. The fighter\'s knees buckle. The wizard cannot lift her arms to cast.',
        'Smart parties start shedding equipment. The clang of dropped weapons echoes. Others learn the hard way when their spine compresses.',
      ],
    },
    {
      title: 'Scene 2: The Floor',
      summary: 'Gravity reaches crushing levels. The party must act from prone. Something moves in the floor below them.',
      challenge: 'exploration',
      keyEvents: [
        'Round 5: 6x gravity. Standing requires a Strength check. Most fail.',
        'From the floor, a pattern is visible in the stone that is invisible from above.',
        'Vibrations from below. Something in the floor is stirring. Gravity feeds it.',
        'A hidden hatch, flush with the floor, visible only at ground level. The real exit.',
      ],
    },
    {
      title: 'Scene 3: The Choice',
      summary: 'Solve the puzzle and face what it releases, or crawl to the hidden hatch before bones break.',
      challenge: 'combat',
      keyEvents: [
        'Round 8: 8x gravity. Constitution saves to avoid damage. Bones creak.',
        'The puzzle clicks open. The floor cracks. Something dense and terrible rises.',
        'The gravity creature: a mass of compressed matter that moves freely in high gravity.',
        'The hatch opens to a slide. Gravity normalizes on the other side. Crawl or die.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Gravity Elemental',
      role: 'creature / environmental boss',
      personality: 'Not sentient. A living gravitational anomaly shaped like a boulder with limbs. It moves normally in 10x gravity while the party cannot stand.',
    },
  ],
  keyLocations: [
    {
      name: 'The Compression Chamber',
      description: 'A stone room with a puzzle lock and steadily increasing gravity. The ceiling feels lower every minute.',
      significance: 'The entire encounter. A room-sized trap with a monster inside.',
    },
    {
      name: 'The Escape Hatch',
      description: 'A floor-level hatch invisible from standing height. Leads to a smooth slide and normal gravity.',
      significance: 'The real exit, designed to be found by those smart enough to look down.',
    },
  ],
  dataSystems: ['puzzleLock', 'environmentalHazard', 'combatNarration', 'trapCorridor'],
};
