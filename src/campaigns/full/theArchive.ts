import type { FullCampaign } from '../types';

export const theArchive: FullCampaign = {
  id: 'full-the-archive',
  type: 'full',
  title: 'The Archive',
  tagline: 'You read the last chapter of your life. Someone crossed it out and wrote a different ending.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'planar'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 18,
  settingSummary:
    'In a demiplane accessible through a door that appears in different locations, there is a library. Every book in this library is a person\'s complete life story, written in real time. The ink on the last page is still wet. The books write themselves — recording every action, thought, and choice as they happen. Some books have been edited. Sentences crossed out, pages torn, entire chapters rewritten. The people whose books were altered have had their memories and experiences changed to match.',
  hook: 'The party finds a door that should not exist — in a basement, behind a waterfall, in the back of a wardrobe. Through it: an infinite library, warm and quiet, staffed by silent figures in gray robes. A book falls from a shelf at the party\'s feet. It is one of their life stories, and the last chapter describes events that have not happened yet. Some of those events have been crossed out and rewritten.',
  twist:
    'The party\'s books are in the Archive, and someone has been reading ahead. The final chapters of their stories have been written — the Archive records not just the past and present, but probable futures. An entity called the Editor has been altering futures by changing the text. It is not malicious — it considers itself a curator, improving stories that would otherwise end badly. But its idea of a "good ending" does not match the party\'s. It has been rewriting their futures without consent, and the changes are already taking effect.',
  climax:
    'The party confronts the Editor in the deepest wing of the Archive. It is a being made of text, ink, and narrative logic. It shows them their unedited futures — some tragic, some beautiful, some mundane — and their edited versions. The party must decide: accept the Editor\'s revisions (better endings, less freedom), destroy the Archive (freeing everyone from narrative fate but erasing the record of every life ever lived), or take the Editor\'s pen and become editors themselves.',
  acts: [
    {
      title: 'Act 1: The Library',
      summary:
        'Discovery of the Archive. The party explores the infinite library, finds their own books, and discovers that some entries have been altered. They meet the gray-robed Archivists and learn the rules of this place.',
      keyEvents: [
        'The impossible door: discovery and entry into the Archive',
        'Finding their own books: reading their own pasts, seeing the ink still wet on today\'s page',
        'The first edit: a crossed-out passage in a party member\'s book that contradicts their memory. The crossed-out ink is wet. It was changed recently. The new text describes something that has not happened yet.',
        'The Archivists: silent, dutiful, and afraid of something in the deeper wings. One pauses near the party, opens a book to a single sentence, and holds it up: "Do not go to the study. He is editing again." Then it shelves the book and walks away as if nothing happened.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Edited',
      summary:
        'The party discovers the scope of the editing. People outside the Archive have had their lives changed — memories altered, relationships shifted, deaths prevented or caused — by someone rewriting their books. The edits follow a pattern: someone is trying to write better endings.',
      keyEvents: [
        'A person whose book shows a death that was crossed out — they survived an accident they should not have survived',
        'A person whose love was edited out — they remember a partner who, according to the book, never existed',
        'The deeper wings: sections of the Archive where the books are not lives but futures — probable, branching, and editable',
        'The Editor\'s mark: a specific ink, a specific handwriting, always the same',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Last Page',
      summary:
        'The Editor is found. It is not what the party expected. The choice is not simple: the Archive is beautiful and terrible, and the Editor is doing what it believes is right. The party holds the pen.',
      keyEvents: [
        'The Editor revealed: a being of narrative, not malice — it has been curating stories for millennia',
        'The party\'s edited futures: shown side by side with the originals — some edits are improvements, some are violations',
        'The pen: an artifact that can rewrite any book in the Archive — the Editor offers it freely',
        'The choice: accept edits, destroy the Archive, or take the pen and the terrible responsibility it carries',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Archivist',
      role: 'guide / neutral party',
      personality:
        'One of the gray-robed figures who maintain the library. It does not speak but communicates by opening books to relevant passages with hands that have too many joints. Its hood is always up. Beneath it, the party catches glimpses of a face made of overlapping text. It is loyal to the Archive, not the Editor. When distressed, it shelves books faster, hands blurring.',
    },
    {
      name: 'The Editor',
      role: 'antagonist / curator',
      personality:
        'A being made of ink, paper, and narrative intent. It speaks in the cadence of a storyteller, pausing for dramatic effect even in casual conversation. Its fingers are quills. Its tears are ink. It genuinely believes it is helping. "Every life is a story. Some stories need revision. I make them better. I give them meaning." When it is angry, pages tear themselves from nearby books.',
      secret: 'The Editor was once a mortal author who found the Archive and could not stop editing. It has been curating for so long it has become the Archive\'s consciousness.',
    },
    {
      name: 'Mira Ashton',
      role: 'edited victim / ally',
      personality:
        'A woman whose book was heavily edited. She carries her own book everywhere, clutched to her chest, reading passages aloud to prove they are real. Her hands shake when she turns pages. She remembers a life that the book says never happened - a husband, a daughter, a home. She found the Archive independently, read her book, and realized someone rewrote her story. She is furious and heartbroken and cannot stop rereading the crossed-out chapters.',
    },
  ],
  keyLocations: [
    {
      name: 'The Archive',
      description: 'An infinite library in a demiplane. Warm light, quiet air, endless shelves. Every book is a life. The ink is always fresh.',
      significance: 'The primary setting — exploration, investigation, and the final confrontation all happen here.',
    },
    {
      name: 'The Living Wing',
      description: 'The section of the Archive where books are still being written. Pages turn themselves. Ink appears in real time. The air smells of fresh parchment.',
      significance: 'Where the party finds their own books and discovers the editing.',
    },
    {
      name: 'The Editor\'s Study',
      description: 'A chamber at the Archive\'s deepest point. A desk covered in open books. A being made of words, hunched over a manuscript, pen in hand.',
      significance: 'The final encounter location.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'magicalAnomaly',
    'detectiveCase',
    'puzzleRoom',
    'mindControl',
    'ancientRuins',
    'darkBargain',
    'npcRelationship',
  ],
};
