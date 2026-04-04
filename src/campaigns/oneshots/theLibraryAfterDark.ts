import type { OneShotCampaign } from '../types';

export const theLibraryAfterDark: OneShotCampaign = {
  id: 'oneshot-library-after-dark',
  type: 'oneshot',
  title: 'The Library After Dark',
  tagline: 'The books are closed. The library is open. Something is reading.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 4,
  settingSummary:
    'The Great Library of Corvus locks its doors at sundown. The party is trapped inside after hours. The library at night is different: books rearrange, the architecture shifts, and something moves between the shelves — a creature that feeds on knowledge by erasing it from readers\' minds. Every book it consumes makes it smarter and the library darker.',
  hook: 'The party is researching something important and loses track of time. The doors lock at sundown — a centuries-old security spell. The librarian warned them. They didn\'t listen. Now the candles are going out one by one, and the bookshelves are moving.',
  twist: 'The creature isn\'t a monster — it\'s the library\'s original index: a magical catalog system that became sentient and decided the best way to protect knowledge was to consume it all into itself. It IS the library. It doesn\'t want to hurt the party — it wants to "catalog" them (absorb their memories into its collection).',
  climax: 'The Index has the party cornered in the Restricted Section. It\'s absorbed enough knowledge tonight to be nearly omniscient. The party can fight it (destroying centuries of accumulated knowledge), reason with it (if they can find the right argument in its own collection), or give it something it\'s never had: a new book, a new story, original knowledge it hasn\'t consumed.',
  scenes: [
    {
      title: 'Scene 1: Lights Out',
      summary: 'Trapped in the library after dark. Initial exploration, strange sounds, and the first sign that the library is alive.',
      challenge: 'exploration',
      keyEvents: [
        'The doors seal: ancient wards, no way out until dawn',
        'The candles die one by one — not burning out, being snuffed',
        'Bookshelves rearrange: the path to the exit changes',
        'First sound: the rustle of pages turning in a room with no one in it',
      ],
    },
    {
      title: 'Scene 2: The Hunt',
      summary: 'The Index reveals itself. Books fly off shelves. The party\'s own knowledge starts to fade — skills, memories, names.',
      challenge: 'combat',
      keyEvents: [
        'The Index manifests: a shifting mass of pages, text, and bound leather',
        'It "reads" a party member: the character temporarily forgets a skill or language',
        'Chase through shifting shelves: the library itself is a maze now',
        'The Restricted Section: where the most dangerous knowledge is kept — and where the Index is weakest',
      ],
    },
    {
      title: 'Scene 3: The Last Page',
      summary: 'Cornered in the Restricted Section. The Index wants to complete its collection. The party must offer something it\'s never read.',
      challenge: 'social',
      keyEvents: [
        'The Index surrounds them: walls of text, a mind made of every book ever written',
        'It speaks in quotes from its collection: "To be or not to be — ah, Shakespeare. I consumed him in 1432."',
        'The solution: tell it something genuinely new — a story it hasn\'t heard, a truth it doesn\'t know',
        'The party\'s own story: unique, unwritten, and the one thing the Index can\'t consume without asking',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Index', role: 'the library / antagonist', personality: 'A sentient catalog system that believes consuming knowledge is the same as preserving it. Speaks in literary quotations. "Ah, you resist. How very... Hemingway."' },
    { name: 'Librarian Quill (absent)', role: 'exposition through notes', personality: 'Known through her warning notes posted throughout the library: "DO NOT STAY PAST DARK." "THE INDEX WAKES AT SUNSET." "I TOLD YOU."' },
    { name: 'A Ghost Reader', role: 'ally / victim', personality: 'The ghost of a scholar the Index consumed decades ago. Still exists as a bookmark in a history text. Can help navigate but is fading. "I used to be a person. Now I\'m a footnote."' },
  ],
  keyLocations: [
    { name: 'The Great Library of Corvus', description: 'A vast library that transforms at night. By day: organized, well-lit, helpful. By night: a shifting maze of hungry shelves.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Reading Room', description: 'Where the party was researching. Now dark, the chairs have moved, and the books they were reading are blank.', significance: 'Where the adventure begins.' },
    { name: 'The Restricted Section', description: 'Warded shelves containing dangerous knowledge. The Index avoids this section — the wards hurt it. A temporary safe haven.', significance: 'Where the climactic confrontation takes place.' },
  ],
  dataSystems: ['magicalLibraryCatalog', 'libraryResearch', 'hauntedLocation', 'puzzleLock', 'trapCorridor', 'combatNarration'],
};
