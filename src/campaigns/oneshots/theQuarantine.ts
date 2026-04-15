import type { OneShotCampaign } from '../types';

export const theQuarantine: OneShotCampaign = {
  id: 'oneshot-quarantine',
  type: 'oneshot',
  title: 'The Quarantine',
  tagline: 'Plague ship. Nobody leaves. The sick outnumber the healthy. Supplies run out tomorrow.',
  tone: 'survival',
  themes: ['survival', 'nautical', 'horror'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A cargo ship sits at anchor outside port, yellow quarantine flag flying. A magical plague turns the infected into sleepwalking carriers who spread the disease through touch. Half the crew is sick. The port will sink the ship if anyone tries to leave. The party must find a cure aboard before supplies run out.',
  hook: 'The party booked passage on the Maiden Grace. Three days into the voyage, the cook collapsed. Then the first mate. The captain raised the yellow flag and the port sealed them out. "Find the source. Stop it. Or we all die out here."',
  twist:
    'The plague is not natural. A stowaway alchemist is testing a bioweapon meant for the port city. He is immune. He has the cure. And he will trade it only for safe passage off the ship.',
  climax:
    'The sick outnumber the healthy. The alchemist barricades himself in the cargo hold with the cure. The party must breach his defenses while sleepwalking plague carriers wander the ship. Use the cure on the crew, or take the alchemist alive for the port authorities.',
  scenes: [
    {
      title: 'Scene 1: Patient Zero',
      summary: 'The plague spreads. The party investigates the source while managing the sick and rationing supplies.',
      challenge: 'exploration',
      keyEvents: [
        'The cook, first mate, and three sailors are infected. Sleepwalking, spreading it by touch.',
        'Investigation: the plague started near the cargo hold. Something down there is wrong.',
        'Supplies for two days. Medicine for one. Hard rationing decisions.',
        'A healthy crewman tries to swim to shore. The port fires a warning shot.',
      ],
    },
    {
      title: 'Scene 2: The Stowaway',
      summary: 'The party discovers the alchemist in the cargo hold. He has the cure. He has demands.',
      challenge: 'social',
      keyEvents: [
        'Hidden compartment in the cargo hold. An alchemist with vials and notes.',
        'He is immune. He has a cure. He will trade it for a lifeboat and safe passage.',
        'His notes reveal the target: the port city. This was a weapons test.',
        'More crew fall sick. The window for negotiation is closing.',
      ],
    },
    {
      title: 'Scene 3: The Cure',
      summary: 'Negotiation fails or succeeds. Either way, the party must distribute the cure while the ship descends into chaos.',
      challenge: 'combat',
      keyEvents: [
        'The alchemist barricades himself. Plague carriers crowd the corridors.',
        'Breach the hold. Avoid the sleepwalkers. Every touch risks infection.',
        'The cure is limited. Not enough for everyone. Who gets it first?',
        'The port sends a boarding party. Time is up. Cure the crew or lose the ship.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Voss Erren',
      role: 'alchemist / antagonist',
      personality: 'Brilliant, amoral, clinical. Views the plague as a scientific achievement. Will negotiate coolly while people die around him.',
      secret: 'He is dying. The immunity is temporary. He needs to reach a proper lab before it wears off.',
    },
    {
      name: 'Captain Maren Stedd',
      role: 'captain / ally',
      personality: 'A veteran sailor who has survived storms and pirates but has never felt this helpless. Will follow the party if they show competence.',
    },
  ],
  keyLocations: [
    {
      name: 'The Maiden Grace',
      description: 'A merchant vessel at anchor, quarantine flag flying. The corridors echo with the shuffling of sleepwalking sick.',
      significance: 'The contained environment. Nobody in, nobody out.',
    },
    {
      name: 'The Cargo Hold',
      description: 'Dark, cramped, stacked with crates. The alchemist has turned it into a makeshift laboratory and fortress.',
      significance: 'Where the cure is, where the villain is, where the answers are.',
    },
  ],
  dataSystems: ['survivalTracker', 'moraleTracker', 'combatNarration', 'npcGenerator'],
};
