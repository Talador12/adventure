import type { OneShotCampaign } from '../types';

export const theOathOfTitans: OneShotCampaign = {
  id: 'oneshot-oath-of-titans',
  type: 'oneshot',
  title: 'The Oath of Titans',
  tagline: 'Two primordials are about to fight. Their battlefield is the continent. Broker peace between beings that predate language.',
  tone: 'epic',
  themes: ['epic', 'planar', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 9,
  estimatedHours: 3,
  settingSummary:
    'The Mountain and the Sea are waking. Not metaphors - actual primordial beings. Gethak, the living mountain, and Thalassa, the living ocean, have been dormant since creation. Something has angered them both, and they are converging on the coastal region where land meets water. When they clash, the continent splits. The party must broker peace between beings older than thought.',
  hook: 'The coastline is walking inland. The mountain range is walking toward the sea. A druid translates the tremors: "They are angry at each other. They have been dormant for a million years and something woke them up. When they meet, the collision will crack this continent in half. Someone needs to stand between them and mediate."',
  twist: 'They are not fighting. They are mourning. Their child - an island that existed between land and sea - was destroyed by a mortal mining operation that dug too deep. Both primordials are converging on the spot where their child was. They are not angry at each other. They are grieving. The party does not need to prevent a battle. They need to help two ancient beings process loss.',
  climax: 'The party stands between Mountain and Sea as they converge. The earth shakes. The waves rise. The party must communicate with beings who predate language - through action, through empathy, through standing in the space between two forces of nature and saying "we understand."',
  scenes: [
    {
      title: 'Scene 1: The Convergence',
      summary: 'The primordials are moving. The party gathers information and races to the convergence point.',
      challenge: 'exploration',
      keyEvents: [
        'The mountain range: literally walking, each step an earthquake, trees falling, villages fleeing',
        'The ocean: rising, advancing inland, swallowing the coast mile by mile',
        'The convergence point: the coast where an island used to be - now a scarred crater in the seabed',
        'The druids: they can partially translate the primordials\' intent - not words but emotions',
      ],
    },
    {
      title: 'Scene 2: Understanding',
      summary: 'Reaching the convergence point and understanding what actually happened. The mining operation. The lost island.',
      challenge: 'social',
      keyEvents: [
        'The crater: where an island once stood, now a void - the mining operation went too deep and collapsed it',
        'The mining records: a corporate venture that ignored every warning about the island\'s geological instability',
        'The primordials\' grief: not rage but sorrow - they are coming to the place where their child died',
        'Communication: the party must find a way to show the primordials they understand',
      ],
    },
    {
      title: 'Scene 3: The Space Between',
      summary: 'Standing between Mountain and Sea. The convergence. The grief. The resolution.',
      challenge: 'social',
      keyEvents: [
        'Gethak arrives: a mountain range in humanoid form, stone and earth and ancient patience',
        'Thalassa arrives: the ocean rising in a wall, then coalescing into a figure of water and current',
        'The moment: they see each other, they see the crater, they grieve - and their grief shakes the world',
        'The party\'s role: not mediators of a fight but witnesses to grief - acknowledging the loss changes everything',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Gethak', role: 'the mountain primordial', personality: 'A being made of stone and earth, older than memory. Does not think in words. Thinks in geological time. Grief manifests as earthquakes.' },
    { name: 'Thalassa', role: 'the ocean primordial', personality: 'A being made of water and current. Grief manifests as tidal waves and whirlpools. Her mourning is the storm.' },
    { name: 'Druid Ashara', role: 'translator', personality: 'A circle druid who can partially sense the primordials\' emotions. Terrified but awed. She provides the emotional translation the party needs.' },
  ],
  keyLocations: [
    { name: 'The Convergence Coast', description: 'Where land meets sea, and where two primordials are heading. Villages evacuating, the ground shaking, the water rising.', significance: 'The collision point and the stakes.' },
    { name: 'The Island Crater', description: 'Where an island once stood between land and sea. Now a wound in the seabed where a mining operation destroyed a primordial child.', significance: 'The cause of the grief and the emotional center of the story.' },
    { name: 'The Space Between', description: 'The exact point where Gethak and Thalassa meet. Not a battlefield - a place of mourning.', significance: 'Where the party stands and the resolution happens.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'npcBackstoryGen'],
};
