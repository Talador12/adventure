import type { FullCampaign } from '../types';

export const theCaravanAtTheEndOfTheWorld: FullCampaign = {
  id: 'full-caravan-end-world',
  type: 'full',
  title: 'The Caravan at the End of the World',
  tagline: 'The apocalypse is behind you. Keep driving.',
  tone: 'exploration',
  themes: ['exploration', 'survival', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'A magical apocalypse is sweeping across the continent from east to west — a wall of wild magic that unmakes everything it touches. Civilization is retreating west. The party leads a caravan of 200 refugees, traveling through increasingly strange territory as they race the apocalypse. Each region they pass through has been warped by the approaching wave: magic is unstable, creatures are mutated, and the landscape itself is unreliable.',
  hook: 'The eastern horizon goes white. A wall of shimmering unreality stretches from ground to sky, and it\'s moving west at walking speed. Everything behind it is gone — not destroyed, just... unmade. The party has a caravan, 200 people, and a very long road ahead. The wave will reach the western coast in three months.',
  twist:
    'The wave isn\'t destroying the world — it\'s resetting it. The world has been "patched" by divine magic so many times (wish spells, divine interventions, resurrection magic) that reality is full of contradictions. The wave is the world\'s immune system, correcting everything back to its original state. The problem: civilization wasn\'t part of the original state.',
  climax:
    'The caravan reaches the western coast. There\'s nowhere left to run. The wave is one day behind. The party must either find a way across the ocean, convince the wave-intelligence that civilization deserves to exist, or find the "original state" template and edit it to include mortals — rewriting the definition of "natural" for their world.',
  acts: [
    {
      title: 'Act 1: The Retreat',
      summary:
        'Leading the caravan west through familiar territory that\'s becoming unfamiliar. Resource management, morale, and the first encounters with wave-mutated zones.',
      keyEvents: [
        'The wave appears — one day to evacuate the city',
        'Caravan assembled: 200 people, 40 wagons, limited supplies',
        'First mutated zone: a forest where gravity is sideways',
        'Morale crisis: a faction wants to stop running and fight the wave (they can\'t)',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Warped Lands',
      summary:
        'The caravan passes through increasingly strange territory. Each region has been changed by the approaching wave in different ways. Other survivor groups join or clash.',
      keyEvents: [
        'A city where time runs backward — inhabitants aging younger, confused',
        'A forest that\'s been "corrected" back to primordial jungle — dinosaurs',
        'Another caravan — do you merge, trade, or compete for resources?',
        'Discovery: the wave has an intelligence, and it\'s curious about the mortals fleeing',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Edge',
      summary:
        'The western coast. Ocean ahead, wave behind. No time left. The party must find a solution that saves 200 people and possibly the entire world.',
      keyEvents: [
        'The coast: ships are limited, the wave is one day behind',
        'The wave-intelligence communicates: "You are the error. I am the correction."',
        'Finding the world\'s "source code" — an ancient structure predating civilization',
        'The edit: convince reality itself that mortals belong, or find another way',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Wagonmaster Della',
      role: 'caravan logistics / emotional core',
      personality:
        'Built like an ox and twice as stubborn. Counts wagons every morning like a mother counting children. Speaks in commands softened by a voice that cracks when she thinks nobody is listening. Lost her family to the wave and channels grief into logistics. "Wagon twelve, tighten that axle. Wagon seven, your wheel is listing. Everyone eats at the next stop. Nobody argues with me about eating."',
    },
    {
      name: 'Scholar Fennis',
      role: 'lore expert / theory crafter',
      personality:
        'A wizard who is fascinated by the wave instead of terrified. She runs toward mutated zones with a notebook. Brilliant, reckless, and the one who figures out the wave\'s purpose.',
      secret: 'She tried to communicate with the wave three times. It answered once. She hasn\'t told anyone what it said.',
    },
    {
      name: 'The Corrector',
      role: 'the wave\'s intelligence',
      personality:
        'Not a villain — a process. Like an immune system. It communicates through rearranged landscapes and altered physics. When it speaks directly, it\'s confused by mortals: "You were not in the specification."',
    },
    {
      name: 'Captain Brask',
      role: 'rival caravan leader',
      personality:
        'A former military officer leading a competing caravan. Pragmatic to the point of cruelty — will sacrifice others to save his people. Not evil, but the party\'s opposite in every moral choice.',
    },
  ],
  keyLocations: [
    {
      name: 'The Caravan',
      description:
        'A 200-person mobile community: 40 wagons, livestock, a mobile smithy, and a wagon that serves as a school because the children still need to learn.',
      significance: 'The party\'s responsibility and the campaign\'s emotional core.',
    },
    {
      name: 'The Warped Zones',
      description:
        'Regions altered by the approaching wave: time flows wrong, physics change, creatures mutate. Each one is different and dangerous.',
      significance: 'The exploration challenges throughout Act 2.',
    },
    {
      name: 'The Origin Stone',
      description:
        'An ancient monolith on the western coast inscribed with the world\'s "original specifications." Predates all civilizations. The key to editing reality.',
      significance: 'Where the final solution is found.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'travelEncounters',
    'weatherProgression',
    'merchantCaravan',
    'caravanAmbush',
    'apocalypseCamp',
    'cataclysmCountdown',
    'magicalAnomaly',
    'partyMoraleTracker',
  ],
};
