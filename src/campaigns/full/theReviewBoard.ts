import type { FullCampaign } from '../types';

export const theReviewBoard: FullCampaign = {
  id: 'full-the-review-board',
  type: 'full',
  title: 'The Review Board',
  tagline: 'Three stars. The pit trap had nice ambiance but the poison darts lacked follow-through.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 7 },
  estimatedSessions: 12,
  settingSummary:
    'The Gastronomic Labyrinth is the most exclusive dining experience on the material plane - a dungeon where each room is a "course" and the monsters, traps, and environmental hazards ARE the meal. The architect-chef Madame Roux has spent decades designing it. Wealthy patrons pay thousands to be nearly killed in themed rooms while eating food prepared under mortal peril. The party has been hired by the Adventurer\'s Culinary Gazette as professional critics. Their quills are mightier than their swords.',
  hook: 'The Adventurer\'s Culinary Gazette needs reviewers for the newly opened Gastronomic Labyrinth. The pay is excellent. The previous review team did not come back. The editor assures the party this is unrelated. Each room presents a "course" - the appetizer room has an owlbear that guards a cheese plate, the soup course is a room slowly filling with boiling broth, and the main course involves fighting a minotaur while a roast cooks on a spit behind it. The party must survive AND take notes.',
  twist:
    'Madame Roux is reading the party\'s notes in real time through a scrying enchantment on their review parchment. She is adjusting the dungeon in response to their criticisms. Wrote that the poison darts were "pedestrian"? Next room has triple the darts. Called the minotaur "uninspired"? Here comes a minotaur riding a minotaur. She is not trying to kill them - she is trying to earn five stars. She will redesign the entire dungeon mid-run to get a perfect review.',
  climax:
    'The final course - the dessert room - is Madame Roux herself, cooking in a kitchen surrounded by every monster the party criticized. She demands they taste her magnum opus: a seven-layer cake where each layer was baked in a different elemental plane. It is genuinely transcendent. The party must decide: does the experience earn five stars, knowing the chef nearly killed them repeatedly trying to impress them? Madame Roux will accept the review with dignity. Unless it is below four stars, in which case the dungeon locks down.',
  acts: [
    {
      title: 'Act 1: Appetizers and Attempted Murder',
      summary:
        'The party enters the Gastronomic Labyrinth, meets their guide, and begins the first courses. Each room is a combat or trap encounter themed around a dish. They must rate each experience while surviving it. Madame Roux watches.',
      keyEvents: [
        'The amuse-bouche room: a single gelatinous cube with a cherry on top. Running gag begins: Garson the skeleton butler appears between every course with increasingly absurd wine pairings. He cannot taste any of them. His recommendations are flawless anyway.',
        'The appetizer course: an owlbear guards a cheese board - defeating it is optional but the cheese is behind it',
        'The soup course: the room fills with boiling broth while ingredients (animated vegetables) attack',
        'First hint something is wrong: the second room is suspiciously tailored to their first review',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Main Course Fights Back',
      summary:
        'The courses escalate as Madame Roux responds to the party\'s notes. Encounters become specifically designed to address their complaints. The dungeon starts to feel personal. The party realizes someone is reading their reviews in real time.',
      keyEvents: [
        'The fish course: a kraken tentacle in a flooded room, arranged decoratively on a bed of seaweed',
        'The palate cleanser: a room of mint-scented poison gas (refreshing AND lethal)',
        'Discovery: their review parchment is enchanted - Roux is watching and adapting',
        'The main course: a chimera wearing a chef hat, because Roux decided to "elevate the concept"',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Dessert Is Served',
      summary:
        'The party confronts Madame Roux in her kitchen. She is not a villain - she is an artist who has staked everything on this review. The final encounter is part combat, part cooking challenge, part genuine emotional reckoning with a perfectionist who went too far. The review must be written.',
      keyEvents: [
        'Entering the kitchen: every criticized monster is here, rearranged to address the notes',
        'Madame Roux reveals herself - she has been cooking the entire time they have been fighting',
        'The magnum opus: a seven-layer planar cake that is genuinely the best thing anyone has ever tasted',
        'The final review: the party writes their honest assessment while Roux watches, trembling. Callback: Garson delivers one final wine pairing for the review itself. "Madame recommends a crisp Verdant White with the written critique. I am told it pairs well with vulnerability."',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Madame Clarice Roux',
      role: 'villain / artist',
      personality:
        'A halfling chef-architect who designed every room of the dungeon herself. She speaks in cooking metaphors, treats every encounter as a dish, and views the party as both honored guests and ungrateful critics. Her emotional range swings from warm hostess to knife-wielding perfectionist. "You said the owlbear was \'adequate.\' ADEQUATE. I raised that owlbear from an egg."',
      secret: 'She was rejected from the Arcane Culinary Academy thirty years ago. This dungeon is her application essay.',
    },
    {
      name: 'Garson',
      role: 'guide / comic relief',
      personality:
        'A skeleton butler who serves as the party\'s waiter between courses. Unfailingly polite. Delivers wine pairings for each combat encounter. Cannot taste anything because he has no tongue. "Madame recommends the Chateau Flambe with the fire elemental. I cannot personally vouch for it."',
    },
    {
      name: 'Critica Fontaine',
      role: 'quest giver',
      personality:
        'Editor of the Adventurer\'s Culinary Gazette. An elf who has never entered a dungeon in her life but has opinions about all of them. Sends increasingly urgent letters asking for updates and word counts.',
    },
    {
      name: 'The Sommelier',
      role: 'obstacle / ally',
      personality:
        'A sentient wine rack that blocks the passage between courses unless the party correctly identifies the vintage. Gets deeply offended by wrong answers. "That is CLEARLY a 1247 Shadowfell Merlot. You said Pinot. I am closing this door."',
    },
  ],
  keyLocations: [
    {
      name: 'The Gastronomic Labyrinth',
      description: 'A multi-room dungeon where each chamber is themed around a course in a fine dining experience. The decor is impeccable. The monsters are plated beautifully.',
      significance: 'The entire campaign takes place here. Each room is a set piece.',
    },
    {
      name: 'Madame Roux\'s Kitchen',
      description: 'A massive underground kitchen at the dungeon\'s heart. Every surface gleams. The knife rack holds weapons the party has seen on monsters. There is a wall of Michelin-star-equivalent awards, all self-given.',
      significance: 'The final encounter location and Roux\'s emotional anchor.',
    },
    {
      name: 'The Wine Cellar',
      description: 'A side passage containing centuries of vintages, each labeled with the dungeon run it was served during. Several bottles are labeled "Last Meal."',
      significance: 'Contains lore about previous review teams and optional treasure.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'trapDesigner',
    'dungeonRoomDressing',
    'merchantHaggling',
    'socialEncounter',
    'villainMonologue',
    'plotTwistEngine',
    'randomReward',
  ],
};
