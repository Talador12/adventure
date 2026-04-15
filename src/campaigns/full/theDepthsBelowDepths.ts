import type { FullCampaign } from '../types';

export const theDepthsBelowDepths: FullCampaign = {
  id: 'full-depths-below-depths',
  type: 'full',
  title: 'The Depths Below Depths',
  tagline: 'Past the Underdark, past everything — the ground has a basement.',
  tone: 'exploration',
  themes: ['underdark', 'exploration', 'planar'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 22,
  settingSummary:
    'An Underdark survey team vanished six months ago. Their last message: "We found a floor beneath the floor." The party is hired to find them. The descent goes past the drow cities, past the deep gnome warrens, past the aboleth pools, into a geological layer that should not exist. The ruins get older the deeper they go. The architecture gets stranger. The air gets warmer. There is light where there should be none.',
  hook: 'A deep gnome courier arrives at the surface, half-dead, clutching a stone tablet. Carved into it: a map showing a passage below the deepest known Underdark cavern. The courier says one word before collapsing: "Sky." The Miners\' Guild posts a recovery contract. Find the survey team. Find what they found.',
  twist:
    'The deepest layer is not underground at all. The entire continent sits on a shell — a vast stone ceiling — above a second world. The "light" is a sun. The "ruins" are cities. The party has descended through the crust and emerged onto the surface of another world that has been sealed beneath theirs since creation. The survey team is alive, living among the people below, and they do not want to come back.',
  climax:
    'The shell is weakening. The weight of the upper world is slowly crushing the lower one. The people below have known for generations and have been reinforcing the shell with magic. The party must decide: tell the surface world (which will want to mine the shell), keep the secret (condemning the lower world to slow collapse), or find a way to separate the two worlds entirely.',
  acts: [
    {
      title: 'Act 1: The Known Dark',
      summary:
        'Descent through familiar Underdark layers. The party navigates drow territory, deep gnome warrens, and aboleth-haunted waters. Each layer gives clues about the survey team and hints of something deeper.',
      keyEvents: [
        'Descent begins at the Mithral Shaft — a gnomish elevator into the deep',
        'Drow checkpoint: passage must be negotiated or circumvented',
        'Survey team camp found abandoned — journals describe impossible geology',
        'The aboleth pools: a telepathic warning — "Do not go deeper. The ground remembers."',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: Below the Bottom',
      summary:
        'Past the known Underdark into layers no map records. Ruins of civilizations that predate the surface world. Gravity shifts. Temperature rises. Then — light.',
      keyEvents: [
        'The Fossil Layer: tunnels through compressed ruins of a prehistoric civilization',
        'Gravity inversion zone — the party walks on what was once a ceiling',
        'First glimpse of light from below — warm, golden, impossible',
        'Breakthrough: the party emerges from a cave onto a cliff overlooking a sunlit landscape beneath the earth',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The World Below',
      summary:
        'The lower world, its people, the survey team that chose to stay, and the slow-motion catastrophe of the collapsing shell. The party faces a choice that affects two entire civilizations.',
      keyEvents: [
        'Contact with the Shell-folk — a civilization that knows the sky is stone',
        'The survey team found alive and integrated — they refuse extraction',
        'The shell is cracking: tremors, falling stone, a countdown measured in years',
        'The choice: reveal, conceal, or sever the two worlds',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Dr. Renna Flint',
      role: 'missing survey leader',
      personality:
        'A brilliant geologist who has always believed the Underdark had a bottom. She found it — and what was below it. She will not leave. "I spent my whole life looking for this. You want me to go back to mapping cave walls?"',
      secret: 'She has fallen in love with a Shell-folk scholar and has no intention of returning to the surface.',
    },
    {
      name: 'Tremor',
      role: 'deep gnome guide',
      personality:
        'A deep gnome pathfinder who knows the upper Underdark like the back of his hand. Below that, he is as lost as everyone else and hates it. Compensates with bravado.',
    },
    {
      name: 'Arch-Speaker Callum',
      role: 'Shell-folk leader',
      personality:
        'Leader of the largest Shell-folk city. Ancient, weary, and desperate. His people have reinforced the shell for a thousand years. They are running out of magic.',
    },
  ],
  keyLocations: [
    {
      name: 'The Mithral Shaft',
      description: 'A gnomish elevator system descending three miles into the Underdark. The deepest reliable transport.',
      significance: 'Entry point for the expedition.',
    },
    {
      name: 'The Fossil Layer',
      description: 'Compressed ruins forming the geological strata between the Underdark and the lower world. Walking through history made stone.',
      significance: 'Transition zone where the party realizes something is wrong with the geology.',
    },
    {
      name: 'Hearthstone',
      description: 'The largest Shell-folk city, built around a geothermal vent that powers their shell-reinforcement magic. Warm, bright, and slowly sinking.',
      significance: 'Where the party learns the full truth and must choose.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'ancientRuins',
    'monsterEcology',
    'magicalAnomaly',
    'diplomaticNegotiation',
    'encounterWaves',
    'trapDesign',
    'resourceScarcity',
  ],
};
