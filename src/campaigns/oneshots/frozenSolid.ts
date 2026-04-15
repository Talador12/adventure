import type { OneShotCampaign } from '../types';

export const frozenSolid: OneShotCampaign = {
  id: 'oneshot-frozen-solid',
  type: 'oneshot',
  title: 'Frozen Solid',
  tagline: 'Lost on a mountain. Visibility zero. The map might be wrong. The cold is not.',
  tone: 'survival',
  themes: ['survival', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The party is crossing Frostpeak Pass when a blizzard hits. Whiteout conditions. Temperature dropping fast. They have a map, a compass, and dwindling supplies. The map shows a shelter four hours north. But the map is fifty years old, and the mountain has changed.',
  hook: 'The wind hits like a wall. In thirty seconds, visibility drops to five feet. The temperature plummets. The guide turns the map over, squints, and says: "I think the shelter is... that way. Maybe."',
  twist:
    'The shelter on the map exists, but it is occupied by a frost giant who considers it his home. He is not hostile by nature, but he did not invite guests, and the party is in no condition to fight.',
  climax:
    'The party finds the shelter and must convince the frost giant to share it for one night. Fail the negotiation and they fight a giant while hypothermic. Succeed and they survive, but the giant wants something in return: help dealing with the ice worms that have been tunneling under his home.',
  scenes: [
    {
      title: 'Scene 1: Whiteout',
      summary: 'The blizzard hits. The party must navigate blind, manage cold exposure, and make critical decisions about direction.',
      challenge: 'exploration',
      keyEvents: [
        'Visibility drops to five feet. Wind chill is lethal within hours.',
        'The map shows a shelter north. The compass needle is unreliable near the peak.',
        'A party member stumbles into a crevasse. Rescue costs time and warmth.',
        'Frostbite begins. Constitution saves every hour. Failure means losing fingers.',
      ],
    },
    {
      title: 'Scene 2: The Wrong Path',
      summary: 'The map is outdated. A landmark is missing. The party must adapt or freeze.',
      challenge: 'puzzle',
      keyEvents: [
        'The ridge the map shows is gone. An avalanche took it years ago.',
        'A frozen corpse with a newer map. But the body is encased in ice.',
        'Ice worms surface nearby. Fast, heat-seeking, and relentless.',
        'A faint light ahead. Smoke? Fire? The shelter exists, but something lives there.',
      ],
    },
    {
      title: 'Scene 3: The Giant at Home',
      summary: 'The shelter is a frost giant cave. The party must negotiate or fight in their worst possible condition.',
      challenge: 'social',
      keyEvents: [
        'The "shelter" is a cave. A frost giant sits by a fire, eating elk.',
        'He is annoyed, not aggressive. Negotiation is possible if the party shows respect.',
        'His price: the ice worms have been undermining his floor. Help him, stay the night.',
        'If negotiation fails, combat against a giant while the party has exhaustion levels.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Bjarn Frostmantle',
      role: 'frost giant / reluctant host',
      personality: 'Grumpy, territorial, but not evil. Thinks small folk are fragile and noisy. Will share his fire if approached with respect and something to trade.',
    },
    {
      name: 'Pip Wayfinder',
      role: 'guide / liability',
      personality: 'An optimistic halfling guide who has never actually crossed this pass in winter. Cheerful denial of how lost they are.',
    },
  ],
  keyLocations: [
    {
      name: 'Frostpeak Pass',
      description: 'A high mountain pass buried in a killing blizzard. The wind screams. The snow is horizontal.',
      significance: 'The deadly environment the party must cross.',
    },
    {
      name: 'Bjarn\'s Cave',
      description: 'A large cave with a fire pit, elk hides, and one very large occupant. Warm. If you survive the introduction.',
      significance: 'The goal. Shelter and survival, if the party can negotiate entry.',
    },
  ],
  dataSystems: ['environmentalHazard', 'survivalTracker', 'npcGenerator', 'combatNarration'],
};
