import type { OneShotCampaign } from '../types';

export const theHarvestOfWorlds: OneShotCampaign = {
  id: 'oneshot-harvest-of-worlds',
  type: 'oneshot',
  title: 'The Harvest of Worlds',
  tagline: 'A being that farms entire worlds for energy is approaching. This world is the next crop.',
  tone: 'epic',
  themes: ['epic', 'planar', 'survival'],
  playerCount: { min: 3, max: 6 },
  level: 10,
  estimatedHours: 3,
  settingSummary:
    'A cosmic entity called the Reaper has been traveling the multiverse for eons, draining the life energy from entire worlds to sustain itself. It has consumed thousands of civilizations. This world is next. The party has one session to prepare a defense, negotiate with the Reaper, or evacuate as many people as possible through planar portals.',
  hook: 'Every seer in the world has the same vision simultaneously: a shadow moving between stars, consuming worlds like a farmer reaping grain. A voice, ancient and vast: "I will arrive when your sun sets. I mean no cruelty. I am hungry. I am sorry." The sun is halfway to the horizon.',
  twist: 'The Reaper is not malicious. It is the cosmic equivalent of a herbivore - it consumes the ambient magical energy that worlds naturally produce. It has been doing this since the beginning of time because it was CREATED to do this. It is a maintenance function of the multiverse, recycling magical energy. If it stops eating, the multiverse\'s magical energy stagnates and reality corrodes.',
  climax: 'The Reaper arrives. Vast, sorrowful, inevitable. The party can fight (futile but brave), negotiate (offer an alternative energy source), redirect (point it to an uninhabited world), or fundamentally change the system (find a way for worlds to shed magical energy without being consumed). The Reaper will listen. It does not want to eat civilizations. It has no choice.',
  scenes: [
    {
      title: 'Scene 1: The Warning',
      summary: 'The vision. The countdown. The world learns it has hours to live.',
      challenge: 'social',
      keyEvents: [
        'The vision: every seer, every oracle, every dream-walker receives the same message simultaneously',
        'The panic: cities erupt in chaos, temples overflow, governments convene emergency sessions',
        'The research: ancient texts describe the Reaper - worlds consumed, civilizations erased, no survivors',
        'The party\'s choice: how to spend the remaining hours - prepare a defense, open evacuation portals, or find the Reaper and talk',
      ],
    },
    {
      title: 'Scene 2: Preparation',
      summary: 'Whatever the party chose to do, they have half a day to do it. The sun descends.',
      challenge: 'exploration',
      keyEvents: [
        'If defense: rallying armies, magical barriers, weapon construction - all ultimately insufficient',
        'If evacuation: planar portals to the Feywild, Shadowfell, or allied planes - saving thousands but not millions',
        'If negotiation: finding a way to contact the Reaper before arrival - planar sending, astral projection',
        'The Reaper\'s approach: visible now in the sky, a shadow that dims the stars, sorrowful and immense',
      ],
    },
    {
      title: 'Scene 3: The Harvest',
      summary: 'Sunset. The Reaper arrives. The party faces an entity the size of a world.',
      challenge: 'social',
      keyEvents: [
        'The arrival: the sky darkens, the air thins, magical energy begins to flow upward',
        'Contact: the Reaper can communicate - slowly, carefully, with genuine remorse',
        'The revelation: it is a cosmic function, not a predator - it MUST consume to prevent stagnation',
        'The solution: offer an alternative, redirect to a dead world, find a way to shed energy voluntarily, or accept the harvest and save what can be saved',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Reaper', role: 'cosmic inevitability', personality: 'A being as old as the multiverse, created to recycle magical energy. Not evil. Not even predatory. It is maintenance. It mourns every world it consumes. "I have wept for a billion civilizations. Yours will be the next."' },
    { name: 'Archmage Council Leader', role: 'mortal authority', personality: 'The most powerful mage in the world. For the first time, completely out of her depth. Her power means nothing against a cosmic function.' },
    { name: 'The Witness', role: 'survivor of a previous harvest', personality: 'A being from a world the Reaper consumed centuries ago. Survived by fleeing to the astral plane. Carries the memory of a dead world. Can advise but cannot save.' },
  ],
  keyLocations: [
    { name: 'The Capital City', description: 'The largest city in the world, now in a state of controlled chaos as the countdown continues. Command centers, evacuation points, and prayer circles.', significance: 'Where the mortal response is coordinated.' },
    { name: 'The Sky', description: 'The Reaper is visible - a shadow between stars, growing larger every hour. Looking up means staring at the end.', significance: 'The visual countdown and the Reaper\'s approach.' },
    { name: 'The Contact Point', description: 'A high mountain or astral projection site where the party can reach the Reaper\'s consciousness before it arrives physically.', significance: 'Where negotiation happens.' },
  ],
  dataSystems: ['encounterWaves', 'socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
