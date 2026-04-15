import type { OneShotCampaign } from '../types';

export const theIslandThatMoved: OneShotCampaign = {
  id: 'oneshot-island-that-moved',
  type: 'oneshot',
  title: 'The Island That Moved',
  tagline: 'The island was not on the map yesterday. By evening, it was 10 miles from where it was that morning.',
  tone: 'exploration',
  themes: ['exploration', 'nautical'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A new island appeared overnight on shipping lanes that have been clear for centuries. The harbor authority hires the party to investigate before it collides with trade routes. When they arrive, the island is lush, silent, and undeniably moving. By the time they reach its center, it has drifted 10 miles from where their ship anchored.',
  hook: 'The harbor master shows the party three charts taken hours apart. The island is in a different position on each one. "It is heading toward the coast. At this speed, it reaches the port city in two days. I need to know if I should evacuate or not."',
  twist: 'The island is the shell of a zaratan, an ancient turtle of colossal size. It has been sleeping on the ocean floor for centuries and is now swimming toward the coast because it is dying and returning to the beach where it was born. The "forest" on its back is an ecosystem that grew during its sleep.',
  climax: 'The party must decide: help the zaratan reach its birthplace to die in peace (which means a turtle the size of an island beaches itself near a port city), redirect it, or find a way to heal it. Each option has consequences for the zaratan, the ecosystem on its back, and the coastal city.',
  scenes: [
    {
      title: 'Scene 1: Landfall',
      summary: 'Sailing to the island and making landfall. The terrain is wrong: the soil is thin, the trees have shallow roots, and the ground occasionally shifts.',
      challenge: 'exploration',
      keyEvents: [
        'The approach: no beach, no sand. The island rises from the water as a sheer ridge of grey-green stone with hexagonal patterns like dried mud - or scales',
        'The forest is real but wrong: trees lean slightly toward the island\'s center, roots sprawl across the surface instead of digging deep, birds nest but none leave',
        'Standing still, the party feels it: the ground rises and falls. Not an earthquake. Rhythm. Like standing on a chest that breathes',
        'A freshwater spring in a clearing pulses in regular intervals, warm to the touch, tasting faintly of salt and iron',
      ],
    },
    {
      title: 'Scene 2: The Living Island',
      summary: 'Exploring deeper reveals the truth. The island is alive. The terrain is anatomy. The party must reach the center to understand what is happening.',
      challenge: 'exploration',
      keyEvents: [
        'Parasites on the shell: large hostile creatures that have burrowed into the zaratan\'s back',
        'The truth becomes undeniable: scale patterns in the rock, the ridge is a shell edge',
        'A druidic hermit who has lived on the island for years and knows what it is',
        'The island accelerates: it is swimming faster, and the party\'s ship falls behind',
      ],
    },
    {
      title: 'Scene 3: The Dying Titan',
      summary: 'Reaching the zaratan\'s head and understanding its journey. The party must choose how to handle a dying creature the size of an island approaching a populated coast.',
      challenge: 'social',
      keyEvents: [
        'The head: a cliff face that is actually the zaratan\'s ancient, barnacle-covered skull',
        'Communication: the druid translates the zaratan\'s intent through Speak with Animals',
        'The choice: let it beach (devastating), redirect it (painful), or heal it (difficult)',
        'Consequences play out immediately based on the party\'s decision',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Harbor Master Voss', role: 'quest giver', personality: 'A no-nonsense logistics officer who cares about ships, schedules, and not having an island crash into the port. "I do not care what it is. I care where it is going."' },
    { name: 'Thistle', role: 'guide / ally', personality: 'Barefoot, sun-weathered, speaks to the trees like old friends. She has lived on this island for 12 years knowing it was a living creature. She can feel it dying through the root network. Her voice breaks when she talks about it. "It is going home. You cannot stop something from going home."' },
    { name: 'The Zaratan', role: 'the island itself', personality: 'Ancient beyond measure. Not intelligent in a conversational way, but deeply purposeful. It wants to go home. It does not know about the city in its path.' },
  ],
  keyLocations: [
    { name: 'The Shell Forest', description: 'A thriving forest growing on the zaratan\'s back, with thin soil and shallow-rooted trees.', significance: 'First exploration area, where the clues begin accumulating.' },
    { name: 'The Ridge', description: 'The edge of the zaratan\'s shell, rising like a cliff from the ocean.', significance: 'Where the truth becomes visible: this is not geology, it is anatomy.' },
    { name: 'The Head', description: 'A massive cliff face that is the zaratan\'s skull, barnacled and ancient.', significance: 'Where the party confronts the zaratan\'s intent and makes their choice.' },
  ],
  dataSystems: ['navalCombat', 'monsterLore', 'weatherGenerator', 'explorationChallenge', 'socialEncounter'],
};
