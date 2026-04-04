import type { OneShotCampaign } from '../types';

export const theMountainGod: OneShotCampaign = {
  id: 'oneshot-mountain-god',
  type: 'oneshot',
  title: 'The Mountain God',
  tagline: 'The mountain is walking. It wants something. Nobody speaks Mountain.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 8,
  estimatedHours: 4,
  settingSummary:
    'An entire mountain has uprooted itself and is walking across the continent, leaving a canyon in its wake. It\'s heading toward the capital. Earthquakes precede it. The party must climb the moving mountain, find out what it wants, and either fulfill its need or redirect it before it walks through a city of 200,000 people.',
  hook: 'The ground shakes. Not an earthquake — rhythmic. Like footsteps. The party crests a hill and sees it: a mountain, walking on root-like legs of stone, heading northeast at a steady pace. Trees on its slopes sway like hair. The capital is directly in its path.',
  twist: 'The mountain is an elder earth elemental that has been dormant for ten thousand years. It woke because its child — a smaller mountain 500 miles away — was mined to nothing by dwarves. The mountain isn\'t heading for the capital to destroy it. It\'s heading to where its child used to be. It just hasn\'t noticed the city in the way.',
  climax: 'The party reaches the mountain\'s "heart" — a cavern where the earth elemental\'s consciousness resides. Communication is seismic: emotions transmitted through vibration. The party must convey: the child is gone, the city is in the way, and there might be a solution. The mountain can be redirected, put back to sleep, or given a new child (the party helps shape a new peak from the canyon behind it).',
  scenes: [
    {
      title: 'Scene 1: The Walking Mountain',
      summary: 'The party sees the mountain, assesses the threat, and begins the climb. The mountain isn\'t hostile — it just doesn\'t notice tiny things like people.',
      challenge: 'exploration',
      keyEvents: [
        'The approach: dodging falling rocks and fissures from the mountain\'s "footsteps"',
        'The climb begins: scaling a surface that\'s moving at walking pace',
        'The mountain\'s ecosystem: animals and plants living normally on a moving mountain',
        'First tremor-communication: the mountain hums at a frequency that conveys sadness',
      ],
    },
    {
      title: 'Scene 2: The Climb',
      summary: 'Ascending the moving mountain. Each zone has different hazards. The party learns the mountain is alive and tries to communicate.',
      challenge: 'exploration',
      keyEvents: [
        'The Forest Zone: normal trees, confused animals, a druid who\'s been riding the mountain for days',
        'The Rock Zone: unstable terrain, geode caves, earth elementals that serve as "antibodies"',
        'The Peak Zone: thin air, visibility for miles, the destroyed child-mountain visible in the distance',
        'Communication attempts: the mountain responds to vibration, song, and emotional resonance',
      ],
    },
    {
      title: 'Scene 3: The Heart',
      summary: 'The mountain\'s consciousness. Communication through seismic emotion. The party must deliver terrible news and offer a solution.',
      challenge: 'social',
      keyEvents: [
        'The Heart Chamber: a cavern that pulses with the mountain\'s heartbeat',
        'Communication: the party speaks through vibration, music, or earth magic',
        'The grief: the mountain understands its child is gone — the shaking intensifies',
        'The solution: redirect, sleep, or create a new peak from the canyon behind it',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Mountain (Earthen)', role: 'the mountain / entity', personality: 'A being that experiences time in millennia. It doesn\'t understand "cities" or "people" — just the absence of its child. Its grief is geological in scale.' },
    { name: 'Druid Moss', role: 'ally / interpreter', personality: 'A half-elf druid who\'s been riding the mountain since it woke, trying to communicate. Has learned basic tremor-speech. "It\'s sad. Very, very sad. That\'s all I can get."' },
    { name: 'Captain Harrier', role: 'military urgency', personality: 'A military officer who\'s been running ahead of the mountain, evacuating towns in its path. Exhausted, pragmatic, needs the party to succeed. "We have 3 days before it reaches the capital. Move."' },
  ],
  keyLocations: [
    { name: 'The Walking Mountain', description: 'An entire mountain, walking on roots of stone. Forests on its slopes, caves in its body, a heart deep inside.', significance: 'The primary environment — the party climbs a moving mountain.' },
    { name: 'The Heart Chamber', description: 'A vast geode cavern at the mountain\'s core where its consciousness resides. Crystals pulse with its heartbeat.', significance: 'Where communication happens and the choice is made.' },
    { name: 'The Canyon', description: 'The trench left behind the mountain — a scar across the landscape that could become the foundation for a new peak.', significance: 'The potential solution.' },
  ],
  dataSystems: ['wildernessSurvival', 'naturalDisaster', 'socialEncounter', 'travelEncounters', 'wildernessLandmarks', 'encounterWaves'],
};
