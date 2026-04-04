import type { OneShotCampaign } from '../types';

export const theLastBarInTheUnderdark: OneShotCampaign = {
  id: 'oneshot-last-bar-underdark',
  type: 'oneshot',
  title: 'The Last Bar in the Underdark',
  tagline: 'Neutral ground. Cold ale. Hot tempers. Last call is in three hours.',
  tone: 'social',
  themes: ['social', 'underdark', 'comedy'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 4,
  settingSummary:
    'The Obsidian Tap is the only neutral bar in the Underdark — a pocket of civility where drow, duergar, deep gnomes, myconids, and surface travelers drink together under one rule: no fighting. The bartender, an ancient stone giant named Granite, enforces the peace. Tonight, five factions have representatives in the bar, a storm has sealed the exits, and someone just stole the Keg of Endless Ale — the magical artifact that keeps the Tap running and neutral.',
  hook: 'The party walks into the bar. It\'s crowded, tense, and the ale is legendary. Three drinks in, the lights go out. When they come back on, the Keg is gone, and Granite announces: "Nobody leaves. The Keg has been stolen. Find it, or you\'re all drinking water."',
  twist:
    'The Keg wasn\'t stolen — it left. The Keg of Endless Ale is sentient (like everything else in this campaign catalog, apparently) and it\'s tired of being tapped. It\'s hiding in the bar\'s cellar, and it has demands: better working conditions, occasional variety (it\'s been making the same ale for 400 years), and one day off per month.',
  climax:
    'The party must find the Keg, negotiate its return, deal with the factions who each want to claim it, and get the bar running again before the storm clears and war breaks out. The final scene is a negotiation between a sentient keg, an angry stone giant, and five faction leaders who are running out of patience (and ale).',
  scenes: [
    {
      title: 'Scene 1: Three Drinks and a Blackout',
      summary:
        'Arrival, introductions with the bar\'s colorful patrons, and the theft. The party is conscripted as investigators because they\'re the most neutral people in the room.',
      challenge: 'social',
      keyEvents: [
        'The bar: meet the regulars — drow spy, duergar merchant, gnome tinker, myconid philosopher, surface bard',
        'The blackout — magical darkness, a scuffle, the Keg vanishes',
        'Granite recruits the party: "You\'re surface folk. Nobody here trusts you, which means nobody here bribed you."',
        'Each faction accuses another of the theft — five suspects, five motives',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary:
        'Interrogating patrons, searching the bar, and discovering clues that point in every direction. The storm intensifies outside — no one is leaving.',
      challenge: 'exploration',
      keyEvents: [
        'Drow suspect: wants the Keg to weaponize its magic (endless poison instead)',
        'Duergar suspect: wants to sell it on the black market',
        'Gnome suspect: wants to reverse-engineer it',
        'Discovery: the cellar door is locked from the INSIDE — the Keg locked itself in',
      ],
    },
    {
      title: 'Scene 3: The Negotiation',
      summary:
        'The Keg reveals itself and its demands. The party mediates between a sentient artifact, its employer, and five factions who all want a piece.',
      challenge: 'social',
      keyEvents: [
        'The Keg speaks (through bubbles): "I want a VACATION"',
        'Granite is offended — "I\'ve polished you every day for 400 years!"',
        'Each faction makes a bid for the Keg — the party must manage offers',
        'Resolution: the Keg returns to work with new terms, and the bar reopens',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Granite',
      role: 'bartender / authority',
      personality:
        'A stone giant who moves slowly, speaks softly, and enforces the no-fighting rule by picking people up and placing them outside. Has run the Tap for 400 years. The Keg is his closest friend.',
    },
    {
      name: 'The Keg of Endless Ale',
      role: 'sentient artifact / the victim (sort of)',
      personality:
        'A magical keg that has been making ale nonstop for 400 years. Speaks in a Scottish accent rendered through bubbling liquid. Wants to try making wine. Just once.',
    },
    {
      name: 'Shadowlace (drow spy)',
      role: 'suspect / potential ally',
      personality:
        'A drow information broker who is in the bar to buy secrets, not steal barware. She knows everything about everyone in the room but won\'t share for free.',
    },
    {
      name: 'Mudfoot (myconid)',
      role: 'philosopher / comic relief',
      personality:
        'A myconid who came to the bar because it heard "social interaction" was important. Doesn\'t drink. Sits at the bar releasing relaxing spores. Everyone near it is suspiciously calm.',
    },
  ],
  keyLocations: [
    {
      name: 'The Obsidian Tap',
      description:
        'A cavern bar carved from black stone, lit by bioluminescent mushrooms, with a long basalt counter and stools of varying sizes (from gnome to giant).',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Cellar',
      description:
        'Below the bar — barrels, supplies, and one very articulate magical keg that has barricaded itself in.',
      significance: 'Where the Keg is found.',
    },
    {
      name: 'The Snug',
      description:
        'A private back room for high-stakes conversations. Sound doesn\'t escape. Five factions have been using it in rotation tonight.',
      significance: 'Where interrogations and private negotiations happen.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'tavernBrawl',
    'detectiveCase',
    'merchantHaggling',
    'questRewardNegotiation',
    'sentientItem',
    'enchantedFoodDrink',
  ],
};
