import type { OneShotCampaign } from '../types';

export const theWelcomeCommittee: OneShotCampaign = {
  id: 'oneshot-welcome-committee',
  type: 'oneshot',
  title: 'The Welcome Committee',
  tagline: 'A tiefling family moves in. The village is scared. You are the welcome committee. Make it work.',
  tone: 'social',
  themes: ['social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2.5,
  settingSummary:
    'A tiefling family - two parents, three children - moves into the village of Clearwater. The village has never seen tieflings before. Fear, prejudice, and rumor spread fast. The party is appointed as the welcome committee to integrate the family before the situation gets ugly.',
  hook: 'The mayor pulls the party aside: "The Ashford family moved in last night. They are tieflings. Half the village thinks they are literal demons. The other half is just scared. I need you to fix this before someone does something stupid."',
  twist:
    'The family is fleeing persecution from the last three villages. The father is a retired paladin of Ilmater. The mother is a gifted healer. They are the best neighbors Clearwater could ask for, but they are also exhausted and expecting to be driven out again. The party must convince both sides to try.',
  climax:
    'A fire breaks out at the school. The tiefling mother rushes in, using her fire resistance and healing magic to save the children. The village sees who she really is. The party ensures the moment is not wasted.',
  scenes: [
    {
      title: 'Scene 1: The New Neighbors',
      summary: 'Meeting the Ashford family and canvassing the village. Prejudice is everywhere. The family is bracing for rejection.',
      challenge: 'social',
      keyEvents: [
        'The Ashford home: modest, clean, a garden already planted. The children wave at passersby. Nobody waves back.',
        'Village survey: the baker will not sell to them. The innkeeper whispers about curses.',
        'The father, Marcus, is polite but tired. He has done this before. "How long until they ask us to leave?"',
        'The children just want to play with the village kids. The village kids are told to stay away.',
      ],
    },
    {
      title: 'Scene 2: Building Bridges',
      summary: 'The party organizes interactions. A shared meal, a work project, a playdate. Every step forward risks two steps back.',
      challenge: 'social',
      keyEvents: [
        'A potluck: the Ashfords bring food. Some villagers try it. Others refuse.',
        'Marcus helps repair a broken fence. His skill and strength impress. Walls lower slightly.',
        'A villager\'s child gets hurt playing. Sera (the mother) heals them instantly. Gratitude and fear.',
        'A rumor spreads: the Ashfords were driven out for dark magic. It is a lie but it spreads fast.',
      ],
    },
    {
      title: 'Scene 3: The Fire',
      summary: 'Crisis forces the truth. The tiefling mother saves village children. The party shapes the narrative.',
      challenge: 'exploration',
      keyEvents: [
        'The school catches fire. Children trapped inside.',
        'Sera Ashford runs in without hesitation. Fire resistance. Healing hands.',
        'She carries children out one by one. The village watches.',
        'The party ensures this moment defines the family, not the rumors.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Marcus Ashford',
      role: 'tiefling father / retired paladin',
      personality: 'Gentle, dignified, and exhausted from a lifetime of proving his family\'s worth. He just wants his children to grow up somewhere safe.',
    },
    {
      name: 'Sera Ashford',
      role: 'tiefling mother / healer',
      personality: 'Warm, skilled with healing magic, and fiercely protective. She has stopped hoping for acceptance. She just wants to be left alone. The fire changes that.',
    },
  ],
  keyLocations: [
    {
      name: 'Clearwater Village',
      description: 'A small, insular village where everyone knows everyone and strangers are automatically suspicious.',
      significance: 'The social landscape the party must navigate.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker', 'factionReputation'],
};
