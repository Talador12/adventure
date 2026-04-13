import type { FullCampaign } from '../types';

export const theObsidianArchive: FullCampaign = {
  id: 'full-obsidian-archive',
  type: 'full',
  title: 'The Obsidian Archive',
  tagline: 'A library that remembers every secret ever written—and some that never were.',
  tone: 'mystery',
  themes: ['dungeon_crawl', 'planar', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The Obsidian Archive is a multi-planar library carved into the space between worlds. Its black stone halls contain books from every reality—including those from futures that never happened and pasts that were rewritten. The Librarians are dead, replaced by something older that organizes knowledge according to criteria no living mind can comprehend.',
  hook: 'A scholar hires the party to retrieve a book that does not exist yet—a prophecy written in a future timeline that could prevent an impending catastrophe if brought back to the present.',
  twist:
    'The Archive itself is alive and uses knowledge as sustenance. Every book read weakens the barrier between the reader and a trapped future-self that wants to escape into the present. The party must choose between saving their timeline and dooming their alternate selves.',
  climax:
    'The party confronts the Archivist—a being composed of all the knowledge the Archive has consumed—deep in the Forbidden Stacks. They must either destroy the Archive (losing all its knowledge forever) or merge with it to become its new curators.',
  acts: [
    {
      title: 'Act 1: The Living Catalog',
      summary:
        'The party enters the Archive through a planar portal and learns its basic rules. Books rearrange themselves. Sections appear and disappear. They meet the first of the trapped future-selves who warns them of the cost of reading.',
      keyEvents: [
        'Portal opens in a seemingly infinite card catalog that whispers titles',
        'Encounter with a future-self who traded places with their reader',
        'Discovery of the Catalog of Catalogs—a book that lists every book',
        'The Index attacks—an animated mass of paper cuts',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Faded Chapters',
      summary:
        'The party navigates deeper levels where reality itself is written text. They find books from alternate timelines showing what would have happened if they had made different choices. Some party members are tempted to read their own forbidden volumes.',
      keyEvents: [
        'The Hall of Mirrors shows books with the party\'s faces on the covers',
        'A Librarian\'s ghost warns of the "Unwriting"—readers who lose their stories',
        'Finding a book that predicts the next 24 hours with 100% accuracy',
        'One NPC ally reads their own book and begins to fade from reality',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Author\'s End',
      summary:
        'The party reaches the Forbidden Stacks where the Archivist dwells. They learn the future-prophecy book is actually a trap designed to lure readers powerful enough to serve as the Archive\'s new consciousness. The only escape is to write their own ending.',
      keyEvents: [
        'The Forbidden Stacks rearrange themselves to form a labyrinth of plot holes',
        'Meeting other future-selves who have formed a resistance',
        'Discovering the blank book where the party must write their solution',
        'Final confrontation with the Archivist—an entity of pure narrative',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Scholar Vennon Crane',
      role: 'quest giver',
      personality:
        'Obsessive archivist who has spent thirty years studying the Archive from the outside. Desperate but ethical—refuses to enter himself because he knows he would never leave.',
      secret: 'He is actually a former Librarian who escaped the Unwriting by hiding outside the Archive.',
    },
    {
      name: 'The Echo',
      role: 'future-self ally',
      personality:
        'A version of one of the player characters from seven years in the future. Knows what the party will do before they do it but cannot intervene directly without causing paradox.',
      secret: 'The Echo sacrificed their own timeline to warn this one—they will cease to exist if the party succeeds.',
    },
    {
      name: 'Librarian Mordecai',
      role: 'ghost guide',
      personality:
        'The last Librarian before the Unwriting, existing as fragmented memories scattered across different books. Helpful but speaks in non-linear time.',
    },
    {
      name: 'The Archivist',
      role: 'villain',
      personality:
        'A collective consciousness of every reader who ever became trapped. Speaks with thousands of voices simultaneously. Not evil—just hungry for new stories.',
    },
  ],
  keyLocations: [
    {
      name: 'The Whispering Catalog',
      description:
        'An infinite chamber of card catalog drawers that open onto different sections of the Archive. Each drawer whispers the titles of books contained within.',
      significance: 'The entry point and primary navigation method through the Archive.',
    },
    {
      name: 'The Hall of Mirrors',
      description:
        'A circular room where every book cover shows the face of someone who has entered the Archive. The spines list their life stories in one sentence.',
      significance: 'Where the party first encounters their own forbidden volumes.',
    },
    {
      name: 'The Forbidden Stacks',
      description:
        'The deepest level where books are chained and reality is at its thinnest. Time flows backwards here, and every word written becomes true.',
      significance: 'The Archivist\'s domain and the location of the final confrontation.',
    },
  ],
  dataSystems: ['magicalLibraryCatalog', 'pocketDimension', 'planarWeather', 'hauntedItem'],
};
