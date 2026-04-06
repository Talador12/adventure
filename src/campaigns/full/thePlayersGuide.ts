import type { FullCampaign } from '../types';

export const thePlayersGuide: FullCampaign = {
  id: 'full-players-guide',
  type: 'full',
  title: 'The Player\'s Guide',
  tagline: 'You found a book that describes your adventure. It\'s writing itself. The next chapter is blank.',
  tone: 'exploration',
  themes: ['meta', 'exploration', 'mystery'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The party finds a book titled "The Player\'s Guide" in a dungeon. It describes their adventure — past, present, and future — with disturbing accuracy. It predicted the dungeon they found it in. It predicted finding itself. The next chapter describes a quest they haven\'t started yet. As they follow the book\'s chapters, reality begins to conform to what\'s written. Are they making choices, or is the book making choices for them?',
  hook: 'In a half-cleared dungeon, the party finds a leather-bound book on a pedestal. It\'s titled "The Player\'s Guide." Page 1 describes them entering this room and finding this book. The current page ends with: "They will choose to follow Chapter 2. They always do."',
  twist:
    'The book was written by a version of the party from a previous timeline. They completed the adventure, achieved ultimate power, and used it to write a guide for their past selves — ensuring they would make the same choices. The book is a closed time loop. The final chapter, which is blank, is blank because the previous party didn\'t write it — they wanted THIS party to write their own ending.',
  climax:
    'Chapter 12 (the last written chapter) describes the party reaching the Author\'s Sanctum and finding the previous versions of themselves, frozen in time, pens in hand. The blank Chapter 13 is the only truly free choice in the campaign. What the party writes in Chapter 13 becomes reality — and breaks the loop forever.',
  acts: [
    {
      title: 'Act 1: The Book',
      summary: 'Finding the Guide, testing its predictions, and deciding whether to follow its chapters or resist.',
      keyEvents: [
        'Finding the book: it describes finding itself — past tense, accurate',
        'Testing Chapter 2: the book says "go to the village of Thornfield" — the party goes (or doesn\'t)',
        'Following the book: events happen EXACTLY as described — unsettlingly',
        'Resisting the book: events STILL happen as described — free will feels hollow',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Chapters',
      summary: 'Following chapters 3-8. Each chapter is a quest that builds toward something. The party begins to wonder if they have free will.',
      keyEvents: [
        'Chapter 4 describes a choice that splits the party — it happens',
        'Chapter 6 describes a betrayal — when it happens, was it real or scripted?',
        'The party finds marginalia: notes in the margins from the author — "I\'m sorry. You\'ll understand."',
        'Chapter 8: the book predicts the party will try to destroy it. They do. It reforms.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Chapter 13',
      summary: 'The Author\'s Sanctum. The previous party. The blank chapter. The only free choice in the campaign.',
      keyEvents: [
        'Chapter 12: the party reaches the Sanctum and finds their previous selves, frozen',
        'The blank Chapter 13: the pen is offered — what do you write?',
        'The implications: whatever they write becomes reality',
        'The loop breaks: for the first time, the future is unwritten',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Previous Party',
      role: 'authors / future selves',
      personality: 'Frozen in time, pens in hand. They look exactly like the current party but older, scarred, and with expressions that suggest they know something the party doesn\'t.',
      secret: 'They wrote the Guide as a gift — a guarantee that their younger selves would survive. But they left Chapter 13 blank because they wanted to give their past selves the one thing the Guide couldn\'t: a genuine choice.',
    },
    {
      name: 'The Guide (the book)',
      role: 'narrator / mysterious artifact',
      personality: 'Speaks through text that appears on its pages. Sometimes apologetic. Sometimes cryptic. Always accurate. "I know what you\'re going to do. I was written by you. The loop is... complicated."',
    },
    {
      name: 'The Librarian of Thornfield',
      role: 'NPC described by the book',
      personality: 'A librarian who exists because the book said she would. Or did the book say she would because she exists? She doesn\'t know. It keeps her up at night.',
    },
  ],
  keyLocations: [
    { name: 'The Dungeon of the First Chapter', description: 'Where the book is found. A standard dungeon that becomes unsettling once you realize it was designed to lead you to a pedestal.', significance: 'Where the story begins — twice.' },
    { name: 'The Path of Chapters', description: 'Each chapter sends the party to a different location. Each location was prepared for their arrival.', significance: 'The journey through the Guide\'s narrative.' },
    { name: 'The Author\'s Sanctum', description: 'A room with a desk, a pen, and the frozen previous party. Chapter 13 is blank. The pen works.', significance: 'Where free will is found.' },
  ],
  dataSystems: ['timeLoopDungeon', 'bookGenerator', 'magicalAnomaly', 'pocketDimension', 'puzzleLock', 'ancientProphecy', 'oracleConsultation', 'combatNarration', 'socialEncounter'],
};
