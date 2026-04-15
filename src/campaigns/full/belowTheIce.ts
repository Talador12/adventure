import type { FullCampaign } from '../types';

export const belowTheIce: FullCampaign = {
  id: 'full-below-the-ice',
  type: 'full',
  title: 'Below the Ice',
  tagline: 'You fell through. There is no way up. Navigate miles of ice caves or freeze.',
  tone: 'survival',
  themes: ['survival', 'underdark', 'exploration'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 14,
  settingSummary:
    'The party fell through a glacier into a vast underground cave system carved from ice. The hole sealed behind them. Above: an impassable ice shelf. Below: miles of tunnels, underground rivers, frozen ecosystems, and pockets of ancient air. Some passages are barely wide enough to crawl through. Others open into cathedral-sized chambers of blue ice. The ice shifts constantly, closing old paths and opening new ones. Air is limited in some passages. Temperature is lethal without fire. And the deeper they go, the more the ice looks less like geology and more like anatomy.',
  hook: 'A routine glacier crossing. The ice cracked. The party fell. When they regain consciousness, they are in a blue-white cave lit by sunlight filtering through hundreds of feet of ice above. The hole they fell through is already refreezing. They have their gear, whatever light sources they carried, and a choice: the tunnel goes two directions. Neither looks promising. The ice groans.',
  twist:
    'The cave system is not natural. It is the frozen body of a dead primordial - an entity so vast that its corpse became the glacier. The tunnels are its veins. The underground rivers are its blood, frozen and slowly thawing. The cathedral chambers are its organs. And its heart still beats. Once per hour, a pulse shakes the entire cave system: thud. The primordial is not alive. It is not dead. It is something in between, and the party is walking through it.',
  climax:
    'The party reaches the heart: a chamber of warm ice where a massive organ pulses with residual life. The heartbeat is keeping the glacier frozen. If the heart stops, the glacier melts, flooding the lowlands. If the party leaves through the exit they have found, the heart continues beating - but the thing may eventually wake. The primordial\'s brain is nearby, still dreaming. The party can hear the dreams: they are of a world before ice, before cold, before mortals. Peaceful dreams. If disturbed, the primordial wakes.',
  acts: [
    {
      title: 'Act 1: The Fall',
      summary: 'Immediate survival. Orientation in the ice caves. Limited light, limited air, and the first signs that the cave system is alive.',
      keyEvents: [
        'The fall and the sealing of the entrance. No way back up.',
        'First exploration: branching tunnels, dead ends, and a chamber where the ice is warm',
        'Air management: some passages have stale air. The party learns to read the currents.',
        'The first heartbeat: a deep thud that shakes the walls. Regular. Rhythmic. Not geological.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Body',
      summary: 'Deeper into the system. The anatomy becomes unmistakable. Underground rivers of frozen blood. Chambers shaped like organs. Ice that remembers.',
      keyEvents: [
        'A frozen river: not water - something organic, azure, and faintly warm. Blood.',
        'The organ chambers: vast spaces with ribbed walls and a biological purpose the party can feel',
        'Frozen parasites: creatures trapped in the ice that are thawing, slowly, hungrily',
        'A pocket of warm air near the core: plants grow here, fed by the primordial\'s residual heat',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Heart',
      summary: 'The center. The beating heart. The dreaming brain. And a choice that could flood a continent or wake a god.',
      keyEvents: [
        'The heart chamber: warm, pulsing, beautiful. A massive organ in a cradle of ice.',
        'The brain: nearby, dreaming. The party can hear its dreams - visions of the primordial age',
        'The exit: a vein that leads to the glacier\'s edge. The way out.',
        'The choice: leave quietly, silence the heart, or attempt contact with the dreaming mind',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Jael',
      role: 'trapped explorer / unreliable guide',
      personality: 'A dwarven explorer who fell through the ice years ago and has been surviving in the warm chambers near the core. Half-mad from isolation but invaluable for navigation. "The veins go north. The arteries go south. I think. I have been wrong before."',
      secret: 'She has been drinking the thawed blood to survive. It has changed her. She can feel the heartbeats before they happen. She is becoming part of it.',
    },
    {
      name: 'The Dreamer',
      role: 'the primordial / the environment itself',
      personality: 'Not a character in the traditional sense - the primordial communicates through its body. Temperature changes, ice formations that look like faces, dreams that leak into sleep. It is not hostile. It does not know the party is there. It is dreaming of summer.',
    },
    {
      name: 'Chitin',
      role: 'thawing parasite / territorial predator',
      personality: 'A colony of insectoid creatures that lived on the primordial when it was alive. Frozen for eons, now thawing. They are territorial, not malicious. The party is in their home.',
    },
  ],
  keyLocations: [
    { name: 'The Entry Shaft', description: 'A vertical ice chimney where the party fell. Light filters down from above. The hole is sealed. The first lesson: there is no going back.', significance: 'Where the campaign begins and hope of easy escape dies.' },
    { name: 'The Vein Network', description: 'Tunnels of blue ice with organic curves. Some are wide enough for a cart. Some require crawling. All of them pulse.', significance: 'The primary navigation challenge throughout the campaign.' },
    { name: 'The Heart Chamber', description: 'A vast warm cave where a massive organ beats once per hour. The ice here is thin and translucent. The walls breathe.', significance: 'The final destination and the center of the campaign\'s moral choice.' },
  ],
  dataSystems: ['wildernessSurvival', 'cataclysmCountdown', 'encounterWaves', 'monsterEcology', 'magicalAnomaly', 'puzzleTrap', 'dreamSequence', 'ambientSounds'],
};
