import type { OneShotCampaign } from '../types';

export const courtOfTheFeyQueen: OneShotCampaign = {
  id: 'oneshot-court-fey-queen',
  type: 'oneshot',
  title: 'Court of the Fey Queen',
  tagline: 'You\'ve been invited to a party. The party never ends. That\'s the problem.',
  tone: 'social',
  themes: ['intrigue', 'comedy', 'planar'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 4,
  settingSummary:
    'The Fey Queen is throwing a grand ball, and the party has been invited — whether they wanted to be or not. Fey politics are lethal, every conversation is a trap, and the only way home is to impress the Queen enough that she lets you leave. The ball has been going on for 300 years. Some guests don\'t know. The music never stops.',
  hook: 'The party stumbles through a mushroom ring and lands in a ballroom. A satyr in a tuxedo hands them dance cards. "You\'re expected. The Queen will see you at the tenth dance. That gives you approximately... nine dances to prepare. I suggest you mingle. And for gods\' sake, don\'t eat the food."',
  twist:
    'The Queen doesn\'t want to keep them. She wants to hire them. One of her courtiers is a traitor who\'s been slowly opening the border between the Feywild and the Shadowfell. The ball is both a party and a trap — the traitor is among the guests, and the Queen needs mortal eyes (immune to fey glamour) to identify them.',
  climax:
    'The tenth dance arrives. The party must present their findings to the Queen. If they\'ve identified the traitor correctly, the Queen handles it (elegantly, terrifyingly). If they\'re wrong, they\'ve just accused a powerful fey lord. Either way, the Queen is impressed — or she isn\'t.',
  scenes: [
    {
      title: 'Scene 1: The Mushroom Ring',
      summary:
        'Arrival in the Feywild court. The party is given the rules of engagement (there are many, they\'re all contradictory, and breaking them is rude but sometimes necessary).',
      challenge: 'social',
      keyEvents: [
        'Arrival through the mushroom ring — no way back through',
        'The satyr majordomo explains the rules: never thank, never accept gifts, never refuse a dance',
        'First impressions — the court notices the mortals and begins scheming',
        'The Queen watches from her throne, amused',
      ],
    },
    {
      title: 'Scene 2: The Nine Dances',
      summary:
        'The party must mingle with fey courtiers across nine dances, gathering information about the traitor while avoiding social traps. Every conversation is a minefield of fey bargains.',
      challenge: 'social',
      keyEvents: [
        'Dance 1-3: introductions — each courtier offers something tempting (information, power, beauty)',
        'Dance 4-6: the investigation deepens — contradicting stories, suspicious behaviors',
        'Dance 7-9: the stakes rise — someone tries to frame the party, alliances shift',
        'Between dances: the party compares notes and narrows suspects',
      ],
    },
    {
      title: 'Scene 3: The Tenth Dance',
      summary:
        'Audience with the Queen. The party presents their findings. The Queen acts. The consequences play out, and the party must negotiate their way home.',
      challenge: 'social',
      keyEvents: [
        'The Queen\'s audience — formal, ancient, powerful beyond measure',
        'Accusation: the party names the traitor (or confesses they don\'t know)',
        'The Queen\'s judgment — swift, elegant, possibly terrifying',
        'The reward: a way home, and perhaps a fey favor — always a dangerous gift',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Queen Titania',
      role: 'patron / judge',
      personality:
        'Beautiful, ancient, and terrifying in the way that a thunderstorm is terrifying. She smiles like a predator. She is genuinely amused by mortals, which is the most dangerous thing about her.',
    },
    {
      name: 'Quicksilver',
      role: 'satyr majordomo / guide',
      personality:
        'A satyr who has served the court for centuries and is deeply tired of it. Helpful but sardonic. "Don\'t eat the food, don\'t drink the wine, don\'t make promises, and try not to die. Welcome to the party."',
    },
    {
      name: 'Lord Ashenveil',
      role: 'suspect / the traitor',
      personality:
        'A sophisticated eladrin lord who is charming, helpful, and the last person you\'d suspect. Which is exactly why he is.',
      secret: 'He\'s been opening the Shadowfell border to escape the Queen\'s court — he\'s been trapped here for 300 years and this is his only way out.',
    },
    {
      name: 'Lady Thornheart',
      role: 'suspect / red herring',
      personality:
        'An aggressive, openly hostile fey noble who hates mortals. She seems like the obvious traitor, which means she almost certainly isn\'t.',
    },
  ],
  keyLocations: [
    {
      name: 'The Eternal Ballroom',
      description:
        'A vast, impossibly beautiful dance hall where the music never stops. The ceiling shows a sky that cycles through seasons every hour. The dance floor rearranges between numbers.',
      significance: 'The primary environment for all three scenes.',
    },
    {
      name: 'The Garden of Whispers',
      description:
        'An adjacent garden where private conversations happen. The flowers eavesdrop. The hedges rearrange to prevent escape.',
      significance: 'Where secrets are shared and gathered.',
    },
    {
      name: 'The Queen\'s Dais',
      description:
        'An elevated throne platform where Titania watches everything. Approaching uninvited is a death sentence. Being invited is only slightly less dangerous.',
      significance: 'Where the final audience takes place.',
    },
  ],
  dataSystems: [
    'courtIntrigue',
    'diplomaticNegotiation',
    'socialEncounter',
    'npcRelationshipWeb',
    'enchantedFoodDrink',
    'darkBargain',
    'detectiveCase',
  ],
};
