import type { OneShotCampaign } from '../types';

export const theBlazeRunner: OneShotCampaign = {
  id: 'oneshot-blaze-runner',
  type: 'oneshot',
  title: 'The Blaze Runner',
  tagline: 'The forest is burning. Forty villagers behind you. The river is two miles ahead. Run.',
  tone: 'survival',
  themes: ['survival', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A wildfire sweeps through the Greenveil Forest. The village of Ashwick is directly in its path. The party must lead forty villagers through burning woods to the river crossing before the fire overtakes them. The wind is shifting. The path keeps changing.',
  hook: 'Smoke on the horizon at dawn. By noon the sky is orange. The village elder says the river is two miles east. Simple. Except the fire is faster than people on foot, and the forest has other ideas.',
  twist:
    'The fire was set deliberately by a druid who believes the forest must burn to be reborn. She is not malicious but she will not let anyone stop the burn. She has been redirecting the fire toward the village using wind magic.',
  climax:
    'The party reaches the river but the bridge is burning. The druid appears, offering to part the flames if the villagers swear to never cut the forest again. Accept her terms, fight her while the fire closes in, or find another way across.',
  scenes: [
    {
      title: 'Scene 1: Evacuation',
      summary: 'The party organizes the village evacuation. Who carries what. Who moves slow. The fire is visible on the treeline.',
      challenge: 'social',
      keyEvents: [
        'Forty villagers, including elderly, children, and a woman in labor.',
        'A farmer refuses to leave his livestock. A merchant demands to bring his cart.',
        'The party must choose: main road (longer, safer) or forest trail (shorter, riskier).',
        'The fire jumps a ridge. It is closer than expected.',
      ],
    },
    {
      title: 'Scene 2: Through the Fire',
      summary: 'The march through burning forest. Falling trees, smoke, panic, and something in the woods deliberately steering the flames.',
      challenge: 'exploration',
      keyEvents: [
        'A tree falls across the path. Detour or clear it. Time is burning.',
        'Smoke inhalation. The weakest villagers start dropping.',
        'Wind shifts unnaturally. The fire changes direction to cut off their route.',
        'A clearing with breathable air. Brief rest. Then the wind shifts again.',
      ],
    },
    {
      title: 'Scene 3: The Burning Bridge',
      summary: 'The river is in sight but the bridge is on fire. The druid reveals herself. Negotiate, fight, or improvise a crossing.',
      challenge: 'combat',
      keyEvents: [
        'The bridge is ablaze. The river is too deep and fast for most villagers.',
        'The druid appears in the flames. She offers terms: the forest for their lives.',
        'If they fight, she commands fire elementals born from the wildfire.',
        'The river itself is an option: fallen trees, ice magic, or sheer willpower.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Elowen Ashbloom',
      role: 'druid / antagonist',
      personality: 'Serene, absolute, speaks like a force of nature. She loves the forest more than the people in it. Not cruel, just certain.',
      secret: 'The forest IS dying. She is right that it needs fire. But she chose to include the village.',
    },
    {
      name: 'Old Henrick',
      role: 'village elder',
      personality: 'Eighty years old, walked this forest his whole life. Knows paths no map shows. Slow but invaluable if the party listens.',
    },
  ],
  keyLocations: [
    {
      name: 'Greenveil Forest',
      description: 'Ancient woodland now engulfed in wildfire. The canopy burns overhead while the underbrush chokes with smoke.',
      significance: 'The obstacle course the party must traverse.',
    },
    {
      name: 'Ashwick Bridge',
      description: 'A wooden bridge over the Coldrun River. Currently on fire.',
      significance: 'The final barrier between the villagers and safety.',
    },
  ],
  dataSystems: ['environmentalHazard', 'survivalTracker', 'moraleTracker', 'combatNarration'],
};
