import type { FullCampaign } from '../types';

export const theIronDeep: FullCampaign = {
  id: 'full-iron-deep',
  type: 'full',
  title: 'The Iron Deep',
  tagline: 'The deeper you dig, the more the stone remembers.',
  tone: 'survival',
  themes: ['survival', 'underdark', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 16,
  settingSummary:
    'The Maw of Keth-Var was sealed 500 years ago after the entire mining colony went silent overnight. Now the Ironhold Mining Consortium has hired the party to join a 40-person expedition to reopen it. The first few levels are normal: iron, copper, the bones of old operations. Then it gets strange. The stone changes color. The air tastes of ozone. The walls are warm. And something vast moves in the dark below, felt through the soles of your boots like a second heartbeat.',
  hook:
    'The Consortium offers a fortune: 5,000 gold per person, plus shares of whatever ore is recovered. The expedition leader, Forgemaster Dhera, is experienced and cautious. The first week goes smoothly. Then the tunnels start shifting overnight. A miner finds a vein of metal that sings when struck. Another finds a crystal that shows memories of people who died centuries ago. Dhera says: "We keep digging." The party is not sure that is wise.',
  twist:
    'The mine is not a mine. It is a wound. Millennia ago, a god struck something enormous - a being older than the divine pantheon - with a weapon of pure starfire. The "mine" is the wound canal. The "ore" is divine blood, crystallized over eons into metals that sing and crystals that remember. The thing at the bottom is not dead. It has been healing for thousands of years. And the expedition just broke through the scab.',
  climax:
    'The being stirs. The mine shakes. The expedition must evacuate while the party confronts the truth: do they seal the wound (trapping the being forever), let it heal (and face what emerges), or harvest the divine blood and become something more than mortal (at a cost). The climb out is the hardest part. The mine does not want them to leave.',
  acts: [
    {
      title: 'Act 1: The Descent',
      summary:
        'The expedition enters the Maw and pushes past the known levels into unmapped stone. The deeper they go, the stranger things become. Resources are tracked. Trust is tested. The first losses occur.',
      keyEvents: [
        'Entering the Maw: ancient dwarven infrastructure, collapsed tunnels, ghosts of the old colony',
        'The singing ore: a vein of metal that produces harmonics when struck, unlike anything catalogued',
        'Memory crystals: stones that replay the final moments of miners who died 500 years ago',
        'The first casualty: a tunnel shifts in the night and separates a work crew',
        'The walls are warm. The stone breathes. Forgemaster Dhera insists they continue.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Blood of Gods',
      summary:
        'The expedition discovers veins of liquid starlight and metals that defy categorization. Greed takes hold. The Consortium demands more samples. The mine fights back harder. The party begins to understand what they are really inside.',
      keyEvents: [
        'Liquid starlight: a vein of luminous fluid that heals wounds but causes visions of a sleeping colossus',
        'Greed: miners and Consortium agents begin hoarding ore, paranoia spreads',
        'The stone breathes faster. Tunnels pulse. A miner says: "It has a heartbeat."',
        'An ancient dwarven inscription: "We did not mine here. We TREATED here. We were surgeons, not miners."',
        'A section of the mine collapses intentionally - the wound is trying to close around them',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Awakening',
      summary:
        'The expedition breaches the deepest chamber and the being stirs. The mine convulses. The party must make their choice and lead the survivors out through a mine that is actively healing itself shut.',
      keyEvents: [
        'The deepest chamber: a cavern the size of a city, and at the bottom, something breathing',
        'The choice: seal the wound, let it heal, or harvest the divine blood',
        'The evacuation: the mine is closing, tunnels sealing, the expedition fleeing upward',
        'Forgemaster Dhera\'s decision: she stayed too long. She cannot leave. She gives the party her maps.',
        'The surface: daylight after weeks underground. The Maw seals behind them. The ground still hums.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Forgemaster Dhera Stonvald',
      role: 'expedition leader / tragic figure',
      personality:
        'A dwarven master miner who has opened 30 mines and never lost a crew. Methodical, brave, and driven by a need to understand what is down there. The mine gets its hooks into her.',
      secret: 'She has heard the singing ore before, in a dream. She has been looking for this mine her entire life. She does not know why.',
    },
    {
      name: 'Consul Ravek Irn',
      role: 'Consortium representative / antagonist',
      personality:
        'A human sent by the Consortium to ensure profitability. Sees divine blood as product. Willing to sacrifice miners for shareholder value. Not evil - just operating under a framework that treats wonder as a line item.',
    },
    {
      name: 'Senna Deepquartz',
      role: 'geologist / ally',
      personality:
        'A gnome geologist who realizes before anyone else that the "mine" is organic. She is terrified and fascinated in equal measure. Takes meticulous notes. Believes the party.',
    },
    {
      name: 'The Sleeper',
      role: 'the thing at the bottom',
      personality:
        'Not a villain. Not a god. Something older. It does not communicate in words. It communicates in tremors, in the pitch of the singing ore, in the visions the crystals show. It has been healing for thousands of years and it is almost done.',
    },
  ],
  keyLocations: [
    {
      name: 'The Maw of Keth-Var',
      description:
        'The mine entrance: a vast opening in a mountainside with 500-year-old dwarven stonework. Cold air flows out. It smells of iron and ozone.',
      significance: 'The entrance and the exit, if they make it.',
    },
    {
      name: 'The Singing Galleries',
      description:
        'Mid-level tunnels where the ore produces constant harmonics. Miners work with earplugs. The music is beautiful and maddening.',
      significance: 'Where the expedition camps and the first signs of strangeness appear.',
    },
    {
      name: 'The Wound Chamber',
      description:
        'The deepest point. A cavern so vast the ceiling is invisible. Veins of light pulse along the walls. The floor rises and falls. Something breathes below.',
      significance: 'Where the truth is revealed and the final choice is made.',
    },
  ],
  dataSystems: ['wildernessSurvival', 'dungeonRoom', 'trapGenerator', 'encounterWaves', 'magicalEcosystem'],
};
