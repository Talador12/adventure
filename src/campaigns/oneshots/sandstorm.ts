import type { OneShotCampaign } from '../types';

export const sandstorm: OneShotCampaign = {
  id: 'oneshot-sandstorm',
  type: 'oneshot',
  title: 'Sandstorm',
  tagline: 'No water. A sandstorm incoming. Ruins on the horizon. Could be a mirage. Could be your grave.',
  tone: 'survival',
  themes: ['survival', 'wilderness', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The party is crossing the Ashara Desert when their water supply is destroyed. A sandstorm is visible on the horizon, maybe two hours out. In the shimmering heat, they see ruins to the east. Real or mirage? It is the only option.',
  hook: 'The pack camel steps on a scorpion, panics, and bolts. It carries all the water. The party watches it vanish into the dunes. Then someone points east: shapes in the heat haze. Buildings? The sandstorm wall is already darkening the south.',
  twist:
    'The ruins are real, but they are not abandoned. A colony of intelligent undead lives there - scholars who died in the desert centuries ago and rose as sentient mummies. They have water (from an underground spring) but they despise the living on principle.',
  climax:
    'The sandstorm hits. The ruins are the only shelter. The undead do not want company. Negotiate with the dead for shelter and water while a sandstorm tears the world apart outside, or fight desiccated scholars in blinding sand.',
  scenes: [
    {
      title: 'Scene 1: The March',
      summary: 'Crossing the desert without water. Heat, dehydration, mirages, and the approaching storm.',
      challenge: 'exploration',
      keyEvents: [
        'No water. Constitution saves every 30 minutes. Exhaustion stacks.',
        'Mirages: an oasis that is not there, a caravan that vanishes.',
        'The ruins shimmer ahead. Real structures become visible. Hope.',
        'The sandstorm is closer. It will arrive in one hour.',
      ],
    },
    {
      title: 'Scene 2: The Dead City',
      summary: 'The ruins are inhabited by sentient undead who do not welcome visitors. The party must convince them before the storm hits.',
      challenge: 'social',
      keyEvents: [
        'The ruins are intact. Underground chambers. A spring. But guardians block the way.',
        'Mummy scholars emerge. They speak. They are polite. They say leave.',
        'Negotiation: the dead have problems too. Sand wurms have been breaking their walls.',
        'The storm is ten minutes out. Negotiate faster or force entry.',
      ],
    },
    {
      title: 'Scene 3: The Storm',
      summary: 'The sandstorm hits whether the party is inside or not. Sand wurms attack during the chaos. Survive together or apart.',
      challenge: 'combat',
      keyEvents: [
        'The storm hits. Visibility zero. Sand strips flesh. Outside is death.',
        'Sand wurms breach the underground walls, attacking living and dead alike.',
        'The undead and the party must fight together or die separately.',
        'The spring chamber floods with sand. Protect it or lose the only water source.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Keeper Ankheset',
      role: 'undead scholar / reluctant ally',
      personality: 'A mummified librarian with sand-dry wit and bandages that trail behind him like a scarf. He has been cataloging wind patterns for three centuries and can name every sandstorm by year. "Storm of 847. That one took the east wall. This one sounds angrier." He will help the living if they show respect for his books.',
    },
    {
      name: 'The Sand Matriarch',
      role: 'wurm / environmental threat',
      personality: 'A massive sand wurm that has been feeding on the ruins for decades. Not intelligent. Drawn to vibration.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ashara Desert',
      description: 'Endless dunes under a killing sun. The horizon shimmers. Nothing is real until you touch it.',
      significance: 'The hostile environment that forces every decision.',
    },
    {
      name: 'The Scholar\'s Rest',
      description: 'Ancient ruins maintained by sentient undead. Underground chambers, a freshwater spring, and shelves of preserved scrolls.',
      significance: 'The only shelter. If the dead allow it.',
    },
  ],
  dataSystems: ['environmentalHazard', 'survivalTracker', 'combatNarration', 'npcGenerator'],
};
