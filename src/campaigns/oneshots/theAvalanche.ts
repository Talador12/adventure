import type { OneShotCampaign } from '../types';

export const theAvalanche: OneShotCampaign = {
  id: 'oneshot-avalanche',
  type: 'oneshot',
  title: 'The Avalanche',
  tagline: 'The mountain fell. Your caravan is on the other side. You can hear them screaming.',
  tone: 'survival',
  themes: ['survival', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'An avalanche buries a mountain pass, splitting the party from the merchant caravan they were hired to protect. The party is on one side with tools. The caravan is on the other with wounded, wolves closing in, and no defenders. Dig through, go over, or find another way. The caravan cannot wait.',
  hook: 'The rumble starts deep. The party looks up. White death rolling down the mountainside. When the snow settles, a wall of ice and debris fills the pass. On the other side, screaming. Wolves howling. The caravan has no fighters.',
  twist:
    'The avalanche was triggered by a frost giant exile who wants the caravan\'s cargo: a chest of runestones that belong to his clan. He is waiting at the top of the pass to pick through the wreckage. He does not know the party survived.',
  climax:
    'The party reaches the caravan to find the frost giant already there, taking the chest. The caravan is alive but cornered. Fight a frost giant at altitude with the party exhausted from the crossing, or negotiate the runestones\' return to his clan in exchange for safe passage.',
  scenes: [
    {
      title: 'Scene 1: Separated',
      summary: 'The avalanche hits. Assessment of both sides. The party must find a way across while the caravan is in danger.',
      challenge: 'exploration',
      keyEvents: [
        'The avalanche buries 200 feet of pass. Solid ice and rock.',
        'Muffled voices from the other side. Wolves howling closer.',
        'Three options: dig (slow), climb over (dangerous), find a side route (unknown).',
        'A merchant on this side survived. He reveals the cargo: giant runestones.',
      ],
    },
    {
      title: 'Scene 2: The Crossing',
      summary: 'The party attempts to reach the caravan. Each route has its own dangers.',
      challenge: 'exploration',
      keyEvents: [
        'Digging: hours of work. The ice shifts. Partial collapses. Air pockets with survivors.',
        'Climbing: sheer ice face. Altitude sickness. Loose snow that could trigger another slide.',
        'Side route: a narrow goat trail above the pass. Exposed to wind and a sheer drop.',
        'From the other side: wolf attacks on the caravan. The sounds are getting worse.',
      ],
    },
    {
      title: 'Scene 3: The Giant\'s Claim',
      summary: 'The party arrives to find the frost giant taking what he came for. Fight or negotiate while protecting the caravan.',
      challenge: 'combat',
      keyEvents: [
        'The caravan is circled. Dead wolves around them. The frost giant walks through the wreckage.',
        'He takes the runestone chest. These are his clan\'s property, stolen by the merchants.',
        'The merchants lied. They stole the runestones. The giant has a legitimate claim.',
        'Negotiate the return, fight an exhausted battle, or find a compromise.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Hrothgar Stone-Son',
      role: 'frost giant / antagonist with a point',
      personality: 'Angry but articulate. He has been tracking this caravan for a week. He triggered the avalanche out of desperation, not malice. He wants his clan\'s heritage back.',
      secret: 'His clan is dying. The runestones contain binding magic that keeps their valley habitable. Without them, his people freeze.',
    },
    {
      name: 'Merchant Aldric Voss',
      role: 'caravan master / liar',
      personality: 'Charming, grateful for rescue, and absolutely lying about how he acquired the cargo.',
    },
  ],
  keyLocations: [
    {
      name: 'Stormbreak Pass',
      description: 'A mountain pass now bisected by a wall of avalanche debris. Ice, rock, and buried trees.',
      significance: 'The barrier separating the party from their charges.',
    },
    {
      name: 'The Caravan Camp',
      description: 'Wagons circled on the far side of the avalanche. Wounded merchants, dead horses, and wolf tracks everywhere.',
      significance: 'Where the stakes are. These people die without the party.',
    },
  ],
  dataSystems: ['environmentalHazard', 'survivalTracker', 'combatNarration', 'npcGenerator'],
};
