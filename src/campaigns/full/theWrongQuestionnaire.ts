import type { FullCampaign } from '../types';

export const theWrongQuestionnaire: FullCampaign = {
  id: 'full-wrong-questionnaire',
  type: 'full',
  title: 'The Wrong Questionnaire',
  tagline: 'You were supposed to slay the dragon. You got "plan the wedding" instead. It works out.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'A clerical error at the Adventurers\' Guild swapped two quest assignments. The party received "Plan the Wedding of Mayor Thornbury\'s Daughter" instead of "Slay the Dragon of Mount Doom." Another party got their dragon quest and promptly died. Now the party is stuck with a wedding that keeps accidentally solving the dragon problem. The caterer is the dragon in disguise. The flowers are dragon-bane. The venue is on top of the dragon\'s weak point. Coincidence has become destiny.',
  hook: 'The party shows up at the Adventurers\' Guild expecting a combat quest and receives a sealed scroll: "Congratulations! You have been selected to coordinate the Thornbury-Ashwick Wedding. Budget: 500 gold. Deadline: the harvest moon. Please see the bride for details." There has clearly been a mistake. The Guild refuses to acknowledge the error. The contract is magically binding.',
  twist:
    'The clerical error was not an error. The Guild\'s filing clerk is an ancient oracle cursed to see the future only through administrative paperwork. She knew the combat party would fail. She knew the wedding would put the right people in the right place at the right time. Every wedding decision the party makes aligns with a step in the prophecy of the dragon\'s defeat. The seating chart is a battle formation. The color scheme weakens draconic magic. She cannot tell anyone because the curse makes her speak only in filing jargon.',
  climax:
    'The wedding day arrives. The dragon attacks (it was the caterer all along). But every preparation the party made for the wedding is secretly a weapon: the flower arrangements are dragon-bane bombs, the enchanted dance floor is a binding circle, the fireworks are siege munitions, and the bride\'s "something borrowed" is an artifact sword. The party fights a dragon at a wedding using wedding supplies. The ceremony still happens. It is beautiful and explosive.',
  acts: [
    {
      title: 'Act 1: The Wedding Planner',
      summary:
        'The party reluctantly begins wedding planning. Every task is mundane but goes catastrophically sideways in ways that are secretly useful. Finding a caterer, choosing flowers, booking a venue — each one is harder than slaying a goblin and funnier than it has any right to be.',
      keyEvents: [
        'The bride is a perfectionist who changes her mind every hour. Running gag begins: the centerpiece height changes every scene. Three inches taller. Two inches shorter. Elara treats this like a matter of national security. She is never satisfied.',
        'The caterer (a polymorphed dragon) insists on an all-fire menu',
        'The flower vendor sells moonpetal lilies — beautiful and coincidentally dragon-bane',
        'The venue: a cliffside estate that happens to sit above the dragon\'s lair entrance',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Everything Goes Wrong (Right)',
      summary:
        'Wedding prep escalates. The rival family tries to sabotage the event. A bard union strikes. The cake is sentient. Every disaster the party solves accidentally moves them closer to defeating the dragon. They begin to suspect something larger is at play.',
      keyEvents: [
        'The Ashwick family hires thugs to ruin the wedding — the party fights them off (combat training)',
        'The enchanted dance floor arrives — it is actually an ancient binding circle',
        'The filing clerk mutters "the prophecy is on schedule" while stamping forms',
        'The caterer\'s disguise slips — the party sees scales and thinks it is a skin condition',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Wedding / The Battle',
      summary:
        'The wedding begins. The dragon reveals itself mid-ceremony. The party discovers that every wedding element is a weapon. The most beautiful, chaotic, explosive wedding in the history of the realm unfolds as the party fights a dragon with cake, flowers, and a really aggressive string quartet.',
      keyEvents: [
        'The dragon drops its disguise during the toast and attacks',
        'The flower arrangements detonate as dragon-bane bombs',
        'The dance floor activates as a binding circle, pinning the dragon',
        'The bride catches the bouquet, draws the artifact sword, and the party finishes the fight. Callback: the centerpieces are exactly three inches tall when the dragon knocks them over. Elara was right all along. The height was critical because it matched the dragon-bane detonation radius.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Elara Thornbury',
      role: 'the bride / accidental hero',
      personality:
        'A perfectionist socialite who treats her wedding like a military campaign. Demanding, detail-oriented, and accidentally the best quest giver the party has ever had. "The centerpieces MUST be three inches taller. This is NON-NEGOTIABLE."',
      secret: 'She knows the caterer is suspicious. She has been investigating quietly. The bride is smarter than anyone gives her credit for.',
    },
    {
      name: 'Ignatia Sear (the dragon)',
      role: 'villain / caterer',
      personality:
        'An ancient red dragon polymorphed into a tall, intense chef who insists everything be flame-roasted. Short temper. Excellent food. Planning to eat everyone at the reception. "My flambe is to DIE for. Literally."',
      secret: 'She chose the wedding as cover to get close to the Thornbury vault, which contains a dragon-binding artifact.',
    },
    {
      name: 'Mildred Inkwell',
      role: 'filing clerk / secret oracle',
      personality:
        'A mousy halfling clerk at the Adventurers\' Guild who speaks entirely in bureaucratic jargon. Seems incompetent. Is actually an oracle cursed to channel prophecy through paperwork. "Your quest reassignment has been processed. The forecast indicates... completion."',
      secret: 'She sees the future in filing patterns. She cannot warn anyone directly. Every "error" she makes is deliberate.',
    },
    {
      name: 'Reginald Ashwick',
      role: 'groom / straight man',
      personality:
        'The groom. A kind, bland, agreeable man who just wants to marry the woman he loves. Has no idea what is happening around him. Keeps saying things like "weddings are stressful, right?" while a building explodes behind him.',
    },
  ],
  keyLocations: [
    {
      name: 'Thornbury Estate',
      description: 'A sprawling cliffside manor where the wedding preparations take place. Beautiful gardens, a grand ballroom, and a conveniently dragon-sized courtyard.',
      significance: 'The wedding venue and the final battlefield.',
    },
    {
      name: 'The Adventurers\' Guild (Filing Office)',
      description: 'A cluttered office where Mildred processes quests. Every surface is covered in papers. The filing system is prophetic chaos.',
      significance: 'Where the "error" happened and where clues to the prophecy hide in the paperwork.',
    },
    {
      name: 'Ignatia\'s Kitchen',
      description: 'A commercial kitchen where the caterer prepares wedding food. Everything is fire-themed. The walk-in freezer is suspiciously warm. There are scorch marks on the ceiling.',
      significance: 'The dragon\'s base of operations and a dungeon disguised as a kitchen.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'socialEncounter',
    'plotTwistEngine',
    'encounterWaves',
    'trapGenerator',
    'merchantHaggling',
    'fantasyInsults',
    'questRewardNegotiation',
  ],
};
