import type { FullCampaign } from '../types';

export const thePeoplesCrown: FullCampaign = {
  id: 'full-peoples-crown',
  type: 'full',
  title: 'The People\'s Crown',
  tagline: 'The king is dead. For the first time in 800 years, the people could choose. Everyone with power is terrified.',
  tone: 'political',
  themes: ['political', 'intrigue', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 18,
  settingSummary:
    'The Kingdom of Veldara has been a monarchy for 800 years. King Aldren is dead. He had no heir. For the first time in living memory, there is no one with a legal claim to the throne. The common people are whispering a dangerous word: election. The nobility, the Church of the Eternal Flame, and the Merchant Guild Alliance are all scrambling to install their puppet before the idea of democracy takes root. The party is hired by a coalition of common-born leaders to protect the possibility of a popular vote - not to pick a ruler, but to make sure the people get the chance to pick their own.',
  hook: 'A blacksmith named Halla stands before the party in a packed tavern. Behind her, fifty people from the trades quarter watch in silence. "The king is dead and nobody knows what happens next. The dukes are already marching. The priests say their god will choose. The guilds are buying whoever will sell. But the law says nothing about succession when the line ends. Nothing. That means anything is legal - including letting the people decide. We need someone to buy us time. Not to fight a war. To protect an idea long enough for it to take hold."',
  twist:
    'King Aldren abolished the monarchy deliberately. He spent his last year writing a secret will that establishes a constitutional framework for elected governance - a document he called the People\'s Charter. The nobles found it and hid it because the Charter strips their hereditary power. Aldren was not the doddering old king everyone remembers. He was the most radical reformer in Veldara\'s history, and he saved his revolution for after his death so no one could stop him.',
  climax:
    'The Convocation - a public gathering where all factions present their case for who should rule and how. The party must reveal the Charter, protect it from being destroyed or discredited, and hold the room together as eight centuries of assumed power collapses in an afternoon. The nobility attempts a coup. The Church declares heresy. The guilds try to buy the vote. And the people of Veldara, for the first time in history, raise their hands and choose.',
  acts: [
    {
      title: 'Act 1: The Interregnum',
      summary:
        'The king is dead. The factions mobilize. The party meets the key players and discovers that protecting democracy means understanding why so many powerful people fear it.',
      keyEvents: [
        'Halla\'s pitch: protect the idea of a vote, not a specific candidate',
        'Meeting Duke Varren: he genuinely believes commoners cannot govern and considers himself merciful for saying so',
        'Meeting High Priestess Solara: divine right of kings is church doctrine and she will not bend',
        'Meeting Guildmaster Renn: he does not care who rules as long as labor stays cheap',
        'First hint of the Charter: a palace servant overheard the king writing late at night in his final weeks',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Campaign',
      summary:
        'The idea of election spreads. The factions escalate from politics to sabotage. The party searches for the hidden Charter while keeping the democratic movement alive against assassination, propaganda, and economic pressure.',
      keyEvents: [
        'Duke Varren cuts off grain supplies to districts that support the vote',
        'The Church declares the election concept heretical - enforcers begin arresting organizers',
        'Guildmaster Renn offers the party a fortune to quietly make this go away',
        'Finding the Charter: hidden in the king\'s private study behind a false wall, sealed with his ring',
        'An assassination attempt on Halla - the factions are done being subtle',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Convocation',
      summary:
        'The public gathering. Every faction makes their play. The Charter is revealed. The old world fights its last battle against the new one. The party does not pick the ruler - they make sure the people can.',
      keyEvents: [
        'Presenting the Charter: Aldren\'s own words, in his own hand, abolishing the monarchy he held',
        'Duke Varren\'s coup attempt: soldiers in the streets, demanding order through force',
        'High Priestess Solara\'s crisis: the Charter invokes the same god she serves - Aldren quoted scripture',
        'The vote: messy, loud, imperfect, and the most important thing Veldara has ever done',
        'Epilogue: the first elected leader takes office. The work is not done. It is just beginning.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Halla (blacksmith)',
      role: 'quest giver / movement leader',
      personality:
        'Strong hands, plain speech, zero patience for nobility. She does not want power. She wants her children to have a say in who holds it. Practical, brave, and learning politics in real time.',
    },
    {
      name: 'Duke Varren',
      role: 'antagonist (nobility)',
      personality:
        'Genuinely believes the common people are not equipped to govern. Not cruel - paternalistic. He has spent his life managing his duchy and he does it well. He cannot imagine a world where the blacksmith\'s daughter has the same voice as his.',
      secret: 'His duchy is the most prosperous because he actually listens to his people. He just cannot see the contradiction.',
    },
    {
      name: 'High Priestess Solara',
      role: 'antagonist (church)',
      personality:
        'True believer. Divine right of kings is not a political convenience for her - it is theology. She is not corrupt. She is faithful, which is harder to argue with.',
      secret: 'She has private doubts she has never spoken aloud. The Charter quoting her own scripture will shatter her.',
    },
    {
      name: 'Guildmaster Renn',
      role: 'antagonist (commerce)',
      personality:
        'Does not care about governance philosophy. Cares about labor costs, trade routes, and tax rates. Will support any system that keeps workers cheap and regulations thin. Affable. Dangerous.',
    },
    {
      name: 'King Aldren (deceased)',
      role: 'posthumous ally',
      personality:
        'Known in life as a quiet, unremarkable king. In death, revealed as a radical who spent decades planning the end of his own institution. His Charter is his legacy.',
      secret: 'He was inspired by a traveling scholar from a republic across the sea. He never told anyone.',
    },
  ],
  keyLocations: [
    {
      name: 'The Trades Quarter',
      description: 'The working heart of the capital. Forges, workshops, market stalls. Where the idea of election was born over anvils and bread ovens.',
      significance: 'The democratic movement\'s home base.',
    },
    {
      name: 'The King\'s Study',
      description: 'A small, book-lined room in the palace. Looks unremarkable. Contains the most dangerous document in the kingdom behind a false wall.',
      significance: 'Where the Charter is hidden.',
    },
    {
      name: 'The Convocation Hall',
      description: 'A public amphitheater normally used for festivals. Large enough to hold thousands. For the first time, it will hold history.',
      significance: 'Where the final act plays out - the vote, the coup attempt, and the birth of something new.',
    },
  ],
  dataSystems: [
    'courtIntrigue',
    'factionReputation',
    'npcRelationshipWeb',
    'diplomaticNegotiation',
    'socialEncounter',
    'massCombat',
    'moralDilemma',
    'partyMoraleTracker',
  ],
};
