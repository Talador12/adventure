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
        'Finding the book: it describes finding itself in past tense. The party reads: "They picked up the book. The tall one opened it first." The tall one is holding it.',
        'Testing Chapter 2: the book says "go to the village of Thornfield." If the party refuses, a messenger arrives from Thornfield asking for help. They end up there anyway.',
        'Following the book: events happen EXACTLY as described. An NPC says the precise words the book predicted. The party checks the page in real time. Word for word.',
        'Resisting the book: a party member deliberately does the opposite of what is written. The book already predicted they would do the opposite. "They tried to resist. They always try. Turn the page."',
        'Quiet moment: the party reads ahead. Chapter 7 describes one of them sitting alone by a fire, crying. They do not know why yet. It has not happened. It will.',
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
      personality: 'Frozen in time, pens in hand. They look exactly like the current party but older, scarred, and with expressions that suggest they know something the party does not. One of them is smiling. One is crying. The rest are resolute.',
      secret: 'They wrote the Guide as a gift — a guarantee that their younger selves would survive. But they left Chapter 13 blank because they wanted to give their past selves the one thing the Guide could not: a genuine choice.',
    },
    {
      name: 'The Guide (the book)',
      role: 'narrator / mysterious artifact',
      personality: 'Speaks through text that appears on its pages in real time. Handwriting shifts between apologetic and clinical. Occasionally crosses things out and rewrites them, as if even the book is unsure. "I know what you are going to do. I was written by you. The loop is... complicated. I am sorry about Chapter 7."',
    },
    {
      name: 'The Librarian of Thornfield',
      role: 'NPC described by the book / existential crisis',
      personality: 'A woman who exists because the book said she would. Wears her hair in a tight bun. Alphabetizes everything, including her emotions. Has read the Guide. Knows she is a character. "I am real. I think. I feel. The fact that a book predicted me does not make me less real. Does it?" Keeps asking the party for reassurance she does not fully believe.',
    },
    {
      name: 'The Margin Writer',
      role: 'hidden ally / meta-presence',
      personality: 'Someone has written notes in the margins of the Guide in a different hand — not the Previous Party\'s. Warnings, corrections, and the occasional "DO NOT TRUST CHAPTER 9." This writer is from a failed timeline where the party died at Chapter 9. They found a way to annotate across timelines. Their notes become increasingly desperate and helpful.',
    },
  ],
  keyLocations: [
    {
      name: 'The Dungeon of the First Chapter',
      description: 'Where the book is found. A standard dungeon that becomes unsettling once you realize every room was designed to lead you to a pedestal. The traps were never meant to stop you. They were pacing.',
      significance: 'Where the story begins — twice. The dungeon is a narrative device, not a test.',
    },
    {
      name: 'The Path of Chapters',
      description: 'Each chapter sends the party to a different location — a village, a mountain, a ship. Each location was prepared for their arrival. NPCs have been waiting for them. Rooms have been set.',
      significance: 'The journey through the Guide\'s narrative. The party lives inside a story and slowly realizes it.',
    },
    {
      name: 'The Author\'s Sanctum',
      description: 'A room with a desk, a pen, and the frozen previous party. The desk has one blank page: Chapter 13. The pen works. The ink is warm. The room is perfectly silent.',
      significance: 'Where free will is found. The single most important blank page in existence.',
    },
  ],
  dataSystems: ['timeLoopDungeon', 'bookGenerator', 'magicalAnomaly', 'pocketDimension', 'puzzleLock', 'ancientProphecy', 'oracleConsultation', 'combatNarration', 'socialEncounter'],
};
