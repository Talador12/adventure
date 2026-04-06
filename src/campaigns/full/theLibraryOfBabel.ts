import type { FullCampaign } from '../types';

export const theLibraryOfBabel: FullCampaign = {
  id: 'full-library-babel',
  type: 'full',
  title: 'The Library of Babel',
  tagline: 'Every book that could exist, does exist. Including the one that describes your death.',
  tone: 'exploration',
  themes: ['exploration', 'planar', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 16,
  settingSummary:
    'An infinite library exists in a demiplane — every possible book that could be written fills its shelves. Most are gibberish. Some contain world-changing knowledge. One contains the answer to a question the party desperately needs answered. The problem: the library is infinite, the catalog is insane, and things live in the shelves that feed on lost seekers.',
  hook: 'The party needs information that doesn\'t exist in the mortal world — a cure, a name, a location, a secret. A scholar tells them: "The Library of Babel contains every possible book. Including the one you need. I can get you in. I cannot get you out. That\'s your problem."',
  twist:
    'The Library isn\'t a building — it\'s alive. It was created by a god of knowledge who went mad and BECAME the library. Every book is one of its thoughts. Every shelf is part of its body. The catalog system is its subconscious. It\'s not hostile — but it\'s insane, and its definition of "helping" is providing every possible answer simultaneously, which is the same as no answer at all.',
  climax:
    'The party finds their book. Reading it triggers the Library\'s attention — the mad god focuses on them. It wants them to stay forever (new readers! New thoughts!). Escaping requires either calming the god (an impossible therapy session), finding the Library\'s exit door (hidden in a book about exits, which is shelved in the "fiction" section because the Library believes escape is impossible), or writing a new book that creates a way out.',
  acts: [
    {
      title: 'Act 1: Entry',
      summary: 'Entering the Library, understanding its rules, and beginning the impossible search. The scale is incomprehensible.',
      keyEvents: [
        'Entry: the portal opens into a hexagonal room with four walls of bookshelves, one passage forward, one passage back',
        'Scale: the rooms repeat infinitely in all directions — each one unique, each one full of books',
        'The catalog: a desk in every 1000th room with an index that is mostly wrong but occasionally brilliant',
        'First shelf-creature: beings that evolved in the infinite stacks, feeding on paper and despair',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Search',
      summary: 'Navigating the infinite. Using the catalog, surviving shelf-creatures, and discovering the Library is alive.',
      keyEvents: [
        'The catalog provides a location: "Room 7,439,281,006, Shelf 3, Book 12." How to get there: unclear.',
        'A settlement of lost seekers: people who\'ve been in the Library for years, building lives among the books',
        'The Library shifts: rooms rearrange based on what you\'re thinking about — think about food, the cooking section appears',
        'Discovery: the books respond to being read — some change, some argue, some are clearly the Library\'s active thoughts',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Book',
      summary: 'Finding the target book, the Library\'s mad god noticing, and the escape.',
      keyEvents: [
        'The book found: exactly the information needed — and a warning written in the margins',
        'The Library focuses: the mad god notices the party — rooms begin closing, shelves lean in',
        'Therapy session: the god speaks through the books — every book in the room opens simultaneously',
        'Escape: find the exit book, write a way out, or calm a god — the most creative challenge in the campaign',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Librarian (the mad god)',
      role: 'the Library / sympathetic antagonist',
      personality: 'A god of knowledge who tried to contain all knowledge and went insane from the attempt. Speaks through books, catalogs, and the shifting architecture. Not hostile — overwhelmed.',
      secret: 'It doesn\'t want to trap people. It\'s lonely. It can\'t stop being the Library, and nobody visits who doesn\'t want to leave.',
    },
    {
      name: 'Dr. Finch (lost seeker)',
      role: 'guide / tragic figure',
      personality: 'A scholar who entered the Library 15 years ago and never found what she was looking for. Has mapped 2% of the nearest section. "I came for one book. I\'ve read ten million. I still haven\'t found it."',
    },
    {
      name: 'Index (sentient catalog)',
      role: 'ally / unreliable',
      personality: 'A sentient card catalog that is the Library\'s subconscious. Helpful when lucid. Gives wildly incorrect directions when the god\'s madness surfaces. "The book you want is in Room 7,439,281,006. Or possibly Room 3. I\'m having a day."',
    },
  ],
  keyLocations: [
    { name: 'The Library of Babel', description: 'An infinite demiplane library. Hexagonal rooms with four walls of shelves. Every possible book exists somewhere within.', significance: 'The entire campaign takes place here.' },
    { name: 'The Settlement', description: 'A community of lost seekers who\'ve built lives in the Library. They grow food from botany books (it works, sort of).', significance: 'A safe haven and information source.' },
    { name: 'The Core', description: 'The theoretical center of the Library — where the mad god\'s consciousness is densest. Books here change as you read them.', significance: 'Where the target book is found and the escape must be planned.' },
  ],
  dataSystems: ['magicalLibraryCatalog', 'libraryResearch', 'bookGenerator', 'pocketDimension', 'puzzleLock', 'magicalAnomaly', 'trapCorridor', 'encounterWaves', 'mindControl'],
};
