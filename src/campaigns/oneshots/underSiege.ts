import type { OneShotCampaign } from '../types';

export const underSiege: OneShotCampaign = {
  id: 'oneshot-under-siege',
  type: 'oneshot',
  title: 'Under Siege',
  tagline: 'A farmhouse. Surrounded by undead. Dawn is six hours away. Survive until the sun rises.',
  tone: 'survival',
  themes: ['survival', 'horror'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The party takes shelter in a remote farmhouse as night falls. Within an hour, the dead begin to rise from the fields. Skeletons, zombies, and worse, shambling toward the farmhouse. Dawn will destroy them. Dawn is six hours away.',
  hook: 'The first hand punches through the soil at dusk. Then another. Then ten more. The farmer boards his windows and looks at the party: "This happens every new moon. Usually there are fewer. This time... I have never seen this many."',
  twist:
    'The farmer\'s dead wife is buried in the cellar. She was a necromancer. Her corpse is the anchor for the undead, and she rises at midnight as an intelligent undead who wants her husband to join her. The undead are not attacking randomly - they are bringing him home.',
  climax:
    'At midnight, the farmhouse shakes. The cellar door bursts open. The farmer\'s dead wife rises, calling his name. The undead surge. The party must put her to rest permanently while defending the farmhouse, and the farmer is not sure he wants them to.',
  scenes: [
    {
      title: 'Scene 1: Fortification',
      summary: 'The undead appear. The party boards up the farmhouse, sets traps, and prepares for a long night.',
      challenge: 'exploration',
      keyEvents: [
        'The dead rise from the surrounding fields. Dozens. Slow but relentless.',
        'The farmhouse: two floors, a cellar, a barn. Board the windows, block the doors.',
        'The farmer knows the routine. He has tools, nails, and a locked cellar he will not open.',
        'The first wave hits the walls. They are testing the defenses.',
      ],
    },
    {
      title: 'Scene 2: The Long Night',
      summary: 'Three waves of escalating undead. Between waves, repair and investigate why this farmhouse.',
      challenge: 'combat',
      keyEvents: [
        'Wave 1: skeletons. Weak but numerous. They probe every entrance.',
        'Between waves: the cellar door rattles. The farmer begs the party not to open it.',
        'Wave 2: zombies and ghouls. Stronger. They breach the barn.',
        'Investigation reveals the farmer\'s wife died here. Her grave is in the cellar.',
      ],
    },
    {
      title: 'Scene 3: Midnight',
      summary: 'The wife rises. The undead surge. The farmer wavers. End this or lose the farmhouse.',
      challenge: 'combat',
      keyEvents: [
        'The cellar door splinters outward. Cold air rushes up. A woman in a burial dress floats through the opening, dirt still in her hair. Her voice is exactly what you would expect from someone who loved this man. "Dorin. Come downstairs, love. I have been waiting."',
        'Dorin drops the hammer. He takes a step toward her. The party has seconds to intervene before he takes her hand.',
        'Every undead outside surges at once. Windows crack. The barn door caves in. She is calling them home and the house is in the way.',
        'Her burial shroud is the anchor. Destroy it and the magic unravels. She reaches for Dorin one last time. "I just wanted us to be together." Then ash.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Farmer Dorin',
      role: 'host / complication',
      personality: 'Moves through the farmhouse like a man who has boarded these windows a hundred times. Hammer strokes are automatic, eyes dead. When asked about the cellar, his hand tightens on the hammer. "Nothing down there. Just stores." He has been having this conversation with the dead for two years and he is running out of reasons to keep the door locked.',
    },
    {
      name: 'Elara, the Dead Wife',
      role: 'necromancer / boss',
      personality: 'In life, she hid her necromancy from the village. In death, she is honest. She loves Dorin. She wants him to join her. Her affection is genuine and terrifying.',
    },
  ],
  keyLocations: [
    {
      name: 'The Farmhouse',
      description: 'A two-story stone farmhouse surrounded by dead fields. Sturdy but not built for war.',
      significance: 'The fortress. Every wall, door, and window matters.',
    },
    {
      name: 'The Cellar',
      description: 'A locked root cellar with a fresh grave and necromantic runes scratched into the floor.',
      significance: 'The source of the undead and the site of the final confrontation.',
    },
  ],
  dataSystems: ['siegeDefense', 'encounterWaves', 'combatNarration', 'trapDesigner'],
};
