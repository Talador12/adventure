import type { OneShotCampaign } from '../types';

export const theGoodbye: OneShotCampaign = {
  id: 'oneshot-goodbye',
  type: 'oneshot',
  title: 'The Goodbye',
  tagline: 'She was going to leave without saying goodbye. Twelve hours to give a woman who gave everything the farewell she will not ask for.',
  tone: 'social',
  themes: ['social'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2,
  settingSummary:
    'Elder Wynn has led Hearthstone Village for fifty years. Tomorrow she leaves to live with her daughter in a distant city. She will not return. The party has one day to organize the send-off she deserves: gathering tributes, settling old debts, and making sure she knows what she meant to everyone.',
  hook: 'Elder Wynn packs quietly, telling no one. The party discovers she planned to leave without a goodbye. "I did not want a fuss." The village disagrees. The party has twelve hours to organize the farewell Wynn would never ask for.',
  twist:
    'Wynn is not leaving by choice. Her daughter sent a letter saying she is gravely ill and needs her mother. Wynn is leaving her life behind to care for a dying child. She is hiding her grief behind practicality.',
  climax:
    'The farewell gathering at sunset. Every tribute, every story, every gift is presented. Then someone reads the daughter\'s letter aloud (found by accident). The village rallies: they will send Wynn with supplies, money, and a healer. She does not leave alone.',
  scenes: [
    {
      title: 'Scene 1: Discovery',
      summary: 'The party finds out Wynn is leaving. They have twelve hours. They scramble to organize.',
      challenge: 'social',
      keyEvents: [
        'Wynn packing in secret. She does not want attention. The party disagrees.',
        'Canvassing the village: the baker weeps openly - she pulled his son from the river at age four. The schoolteacher stammers - she paid for his schooling anonymously.',
        'The blacksmith starts carving a memorial plaque without being asked. His hands shake. He does not stop.',
        'A venue, decorations, food. The party has twelve hours and an entire village that owes this woman everything.',
      ],
    },
    {
      title: 'Scene 2: The Day',
      summary: 'Running around the village gathering tributes, settling old grudges, and convincing Wynn to let this happen.',
      challenge: 'social',
      keyEvents: [
        'Two families feuding for years are asked to stand together for Wynn. They manage it. Barely.',
        'Wynn is found re-packing her bag for the third time. "Please do not make a fuss. I am just an old woman who got lucky with neighbors."',
        'A child delivers a crayon drawing of Wynn to the party. "For the lady. So she does not forget us."',
        'The party finds the daughter\'s letter. The truth comes out.',
      ],
    },
    {
      title: 'Scene 3: The Farewell',
      summary: 'Sunset. The whole village gathers. Stories, gifts, tears, and a community showing what it means to belong.',
      challenge: 'social',
      keyEvents: [
        'Every villager speaks. Short, heartfelt, sometimes clumsy.',
        'The letter is read. The village learns why Wynn is truly leaving.',
        'Spontaneous collection: gold, healing potions, a healer volunteers to go with her.',
        'Wynn leaves at dawn. Not alone. Never alone.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Wynn',
      role: 'departing elder',
      personality: 'Deflects every compliment with a chuckle and a redirect. Packs her own bags. Refuses help carrying them. "I have carried heavier." Her hands tremble when she thinks nobody is looking.',
    },
    {
      name: 'Apprentice Rowan',
      role: 'Wynn\'s successor',
      personality: 'Keeps a list of everything Wynn does in a day, trying to memorize it. Voice cracks when someone calls them "Elder." Organizing the farewell is the first thing they have done without Wynn telling them how.',
    },
  ],
  keyLocations: [
    {
      name: 'Hearthstone Village',
      description: 'A warm, tight-knit village where everyone owes someone something and Elder Wynn is the thread that holds it together.',
      significance: 'The community itself is the setting and the stakes.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker'],
};
