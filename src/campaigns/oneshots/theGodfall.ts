import type { OneShotCampaign } from '../types';

export const theGodfall: OneShotCampaign = {
  id: 'oneshot-godfall',
  type: 'oneshot',
  title: 'The Godfall',
  tagline: 'A god is falling from the sky. Literally plummeting. You have four hours to prevent impact.',
  tone: 'epic',
  themes: ['epic', 'planar', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 10,
  estimatedHours: 3,
  settingSummary:
    'Something is falling from the heavens. Not a meteor - a god. Aethon, god of the forge, has been cast from the celestial plane and is plummeting toward the mortal world. When he hits, the impact will destroy everything within a hundred miles. The party has four hours to prevent a divine extinction event.',
  hook: 'The sky cracks open and a figure made of molten light appears in the upper atmosphere, falling slowly but accelerating. A seer collapses: "That is Aethon. God of the Forge. He has been thrown down. When he hits the ground, everything dies. You have until sunset."',
  twist: 'Aethon was not thrown down by enemies. He jumped. The celestial forge is producing weapons for a war between gods, and Aethon refused to arm either side. His fall is a protest - divine suicide to stop the arms race. If the party saves him, the forge restarts. If they let him fall, the world dies but the war might end.',
  climax: 'The party reaches Aethon mid-fall using an ancient catapult, a flying mount, or a portal. They find a god made of iron and fire, weeping, who does not want to be saved. The party must convince a suicidal god that there is another way to stop the war - or find a way to cushion the fall without saving him, protecting the world while honoring his sacrifice.',
  scenes: [
    {
      title: 'Scene 1: The Warning',
      summary: 'The falling god appears. The party gathers information and prepares to act. Panic spreads.',
      challenge: 'exploration',
      keyEvents: [
        'The seer\'s vision: Aethon falling, the celestial war, the impact calculation - four hours',
        'The city reacts: evacuation begins, temples pray, scholars calculate the impact zone',
        'Reaching him: the party needs a way UP - ancient sky temples, griffon riders, or a very powerful spell',
        'The divine forge: a celestial historian explains what Aethon\'s fall means for the god-war',
      ],
    },
    {
      title: 'Scene 2: The Ascent',
      summary: 'Rising to meet a falling god. The journey upward is perilous - the divine aura shreds mortal matter.',
      challenge: 'combat',
      keyEvents: [
        'The ascent method: whatever the party chose, it is dangerous and untested',
        'The divine aura: a sword blade droops like warm candle wax. Armor rivets glow cherry red. The air tastes like a blacksmith\'s forge.',
        'Celestial debris: an anvil the size of a house tumbles past, trailing sparks. A half-finished divine sword spins in freefall, still glowing from the forge.',
        'First contact: Aethon turns one enormous eye toward the party. Iron tears streak his face. "Go back. I chose this."',
      ],
    },
    {
      title: 'Scene 3: The God',
      summary: 'Face to face with a falling deity. The argument that decides the world.',
      challenge: 'social',
      keyEvents: [
        'Aethon speaks: "If I return, they use my forge for war. If I fall, the world ends but the weapons stop."',
        'The counter-argument: there must be another way - destroy the forge, share the secret, broker peace',
        'Aethon\'s despair: he has been forging for millennia and is tired beyond mortal comprehension',
        'The resolution: save Aethon and deal with the forge, let him fall and save the world another way, or something no one predicted',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Aethon', role: 'the falling god', personality: 'God of the forge. Ancient, weary, and choosing death over complicity. His sorrow is not mortal sadness - it is geological. He has been tired for a thousand years.' },
    { name: 'Seer Calista', role: 'information source', personality: 'A mortal oracle who collapsed when the vision hit. Recovering, terrified, and the party\'s main source of information about what is happening in the heavens.' },
    { name: 'Celestial Historian Vex', role: 'exposition', personality: 'A scholar who paces when she talks, tracing constellations on any flat surface. She has been studying the divine war for forty years and this is the worst day of her career. "He is not falling. He is making a point. Gods do not jump. But he jumped."' },
  ],
  keyLocations: [
    { name: 'The Impact Zone', description: 'A hundred-mile radius centered on the capital city. Everything inside dies when Aethon hits.', significance: 'The stakes.' },
    { name: 'The Sky Temple', description: 'An ancient floating ruin above the clouds. The closest point to the falling god. Crumbling but functional.', significance: 'The launch point for reaching Aethon.' },
    { name: 'The Fall', description: 'The space around Aethon as he falls. Gravity warps, metal melts, the air burns with divine energy.', significance: 'Where the climax happens - mid-air, face to face with a god.' },
  ],
  dataSystems: ['encounterWaves', 'combatNarration', 'socialEncounter', 'npcBackstoryGen'],
};
