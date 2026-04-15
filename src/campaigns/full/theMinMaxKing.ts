import type { FullCampaign } from '../types';

export const theMinMaxKing: FullCampaign = {
  id: 'full-the-min-max-king',
  type: 'full',
  title: 'The Min-Max King',
  tagline: 'He dumped Charisma to max Military. His kingdom has the strongest army and zero friends.',
  tone: 'comedic',
  themes: ['comedy', 'political', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'King Gorath the Optimized rules the kingdom of Ironhold. He has the most powerful military in the known world. His soldiers are elite. His fortifications are perfect. His economy is a pile of gold sitting in a room because he never invested in Trade. He has zero diplomatic relationships because he treated Charisma as a dump stat. Neighboring kingdoms are terrified of him but also deeply confused because he keeps sending them invitations to "join his party." He does not understand why nobody likes him.',
  hook: 'The party is hired through the only channel Gorath understands: a quest board offering an absurd amount of gold. The job description reads: "WANTED: Social Skills. Must be willing to teach a king how to be liked. Competitive salary. Benefits include not being conquered." They arrive at Ironhold to find a kingdom that is a military masterpiece and a social disaster.',
  twist:
    'Gorath is not stupid — he is cursed. A fey court placed a hex on his bloodline generations ago that literally makes members of his family unable to understand social interaction. They see the world in stats and optimization. Gorath genuinely cannot comprehend why giving someone a "gift" of a detailed military analysis of their kingdom\'s weaknesses is not friendly. Breaking the curse requires the one thing the fey never expected: someone actually teaching a min-maxer empathy.',
  climax:
    'The fey court returns to collect on the curse — they want Ironhold\'s military might for a planar war and cursed the bloodline specifically to create an isolated, powerful kingdom they could conscript. Gorath must use BOTH his military optimization AND the social skills the party taught him to unite the neighboring kingdoms against the fey. The final battle is won not by Gorath\'s army alone, but by the alliances he built. His first real diplomatic victory.',
  acts: [
    {
      title: 'Act 1: The Optimization Problem',
      summary:
        'The party arrives at Ironhold and discovers the extent of Gorath\'s social incompetence. His "gifts" to other kingdoms include invasion plans. His idea of a feast is military rations served efficiently. The party begins remedial social skills training.',
      keyEvents: [
        'Arrival at Ironhold: the city is a perfect grid, brutally efficient, and completely joyless',
        'Meeting Gorath: he greets the party with a PowerPoint presentation of their combat capabilities',
        'First diplomatic disaster: Gorath gives the elven ambassador a "friendship spreadsheet." Running gag begins: Gorath labels every emotion with a numbered "Condition." Condition 7 is loneliness. Condition 12 is embarrassment. He references them clinically in conversation.',
        'The party begins teaching basics: smiling, small talk, not ranking everyone by threat level',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Charm Offensive',
      summary:
        'The party takes Gorath on a diplomatic tour of neighboring kingdoms. Every stop is a potential catastrophe. But slowly, painfully, he begins to learn. The party also discovers the curse and realizes Gorath\'s behavior is not a choice.',
      keyEvents: [
        'The dwarven kingdom: Gorath compliments their fortifications (good) then ranks their weaknesses (bad)',
        'The elven court: Gorath tries small talk — "Your forest has suboptimal defensive coverage"',
        'Discovery of the curse: a fey historian reveals the hex on Gorath\'s bloodline',
        'Breakthrough: Gorath gives a genuine compliment without tactical analysis. It is one sentence. Everyone cries.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Alliance Check',
      summary:
        'The fey court arrives to claim Ironhold. Gorath must rally the kingdoms he spent two acts offending and one act slowly winning over. The final battle combines his military genius with the alliances the party helped him build. The min-maxer learns that allies are the ultimate force multiplier.',
      keyEvents: [
        'The fey ultimatum: "Your kingdom was built to serve us. We are collecting."',
        'Gorath\'s speech to the allied kingdoms — three sentences, no spreadsheets, genuine emotion',
        'The battle: Gorath\'s tactical genius combined with allied forces the fey never expected',
        'The curse breaks when Gorath makes a tactically suboptimal choice to save an ally\'s soldiers instead of pressing an advantage. Callback: Gorath looks at the party and says "Condition 7 has resolved." He is smiling. He does not know its name yet. He will learn.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'King Gorath the Optimized',
      role: 'client / protagonist',
      personality:
        'A mountain of a man in perfect armor who speaks entirely in strategic terminology. Not mean, just baffled by social norms. Genuinely wants friends but treats every interaction like a resource allocation problem. "I have allocated 30 minutes for bonding. Please present your interests in order of priority."',
      secret: 'He keeps a journal where he tries to understand emotions. The entries are heartbreaking. "Today I felt the thing again. The empty one. I have labeled it Condition 7."',
    },
    {
      name: 'Chancellor Voss',
      role: 'advisor / ally',
      personality:
        'Gorath\'s long-suffering chancellor who has been trying to teach him diplomacy for 15 years. Exhausted, sarcastic, and deeply loyal. He has sent 47 resignation letters. Gorath files them under "morale reports." "Your Majesty, when someone says \'how are you,\' the answer is not \'combat-ready.\'"',
    },
    {
      name: 'Queen Thessaly of the Verdant Court',
      role: 'diplomatic challenge / potential ally',
      personality:
        'An elven queen who rules through charm and social networks — the anti-Gorath. She finds him repulsive AND fascinating. "He sent me a 40-page threat assessment for my birthday. It was... thorough. I almost admire it."',
      secret: 'She suspects the curse and pities Gorath more than she fears him.',
    },
    {
      name: 'The Fey Ambassador (Lord Whisper)',
      role: 'true antagonist',
      personality:
        'A fey lord who placed the original curse. Charming, manipulative, and endlessly amused by Gorath\'s suffering. Every social interaction is a game to him, which is ironic because that is exactly how Gorath sees it too. "The king is performing as designed. Isolated. Powerful. Ready for harvest."',
    },
  ],
  keyLocations: [
    {
      name: 'Ironhold',
      description: 'A kingdom that is a military engineer\'s fever dream. Perfect walls, optimal supply lines, zero art, zero music, and a throne room with tactical maps instead of tapestries.',
      significance: 'Gorath\'s kingdom and the prize the fey court wants to claim.',
    },
    {
      name: 'The Diplomatic Circuit',
      description: 'The neighboring kingdoms the party must visit: dwarven forges, elven courts, human trade cities. Each one has a different social culture that Gorath must navigate.',
      significance: 'Where Gorath learns (painfully) to be a person and where alliances are built or broken.',
    },
    {
      name: 'The Fey Court',
      description: 'A shimmering realm of pure social manipulation where every word is a weapon and every smile hides a knife. Gorath\'s worst nightmare — and the place where the curse must be confronted.',
      significance: 'Where the truth about the curse is revealed and the final confrontation is set.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'diplomaticNegotiation',
    'factionReputation',
    'combatNarration',
    'encounterWaves',
    'villainMonologue',
    'npcRelationshipWeb',
    'moralDilemma',
    'fantasyInsults',
  ],
};
