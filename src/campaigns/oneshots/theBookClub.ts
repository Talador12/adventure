import type { OneShotCampaign } from '../types';

export const theBookClub: OneShotCampaign = {
  id: 'oneshot-book-club',
  type: 'oneshot',
  title: 'The Book Club',
  tagline: 'The book club picked a real spellbook. Their discussion has been casting real spells. On the town.',
  tone: 'social',
  themes: ['social', 'comedy', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Willowmere Ladies\' Book Club meets every Thursday. Their latest pick, "The Crimson Codex," was found at an estate sale. It is not a novel. It is a genuine spellbook disguised as fiction. Every time the club discusses a chapter, the events in that chapter happen in town.',
  hook: 'The party is in town when it starts raining frogs. Then the baker\'s bread turns to stone. Then the mayor starts speaking only in rhyme. A panicked librarian runs to the party: "I think Mrs. Bramble\'s book club is destroying the town."',
  twist:
    'The book is sentient. It was written by a bored wizard who enchanted it to bring its stories to life when read aloud with feeling. It loves being discussed. It has been lonely for centuries. It will resist being put down.',
  climax:
    'The book club is about to discuss the final chapter, which involves "the great unmaking." The party must interrupt the meeting, convince five very opinionated women to stop discussing literature, and either contain or reason with a sentient book that just wants to be read.',
  scenes: [
    {
      title: 'Scene 1: The Effects',
      summary: 'Strange things happen in town. The party investigates and traces every event to a chapter of the book.',
      challenge: 'exploration',
      keyEvents: [
        'Frogs rain. Bread petrifies. The mayor speaks in couplets.',
        'Each event matches a chapter of "The Crimson Codex."',
        'The librarian connects the dots: the book club met last night.',
        'The book club meets again tonight. Chapter 12: "The Great Unmaking."',
      ],
    },
    {
      title: 'Scene 2: The Book Club',
      summary: 'The party crashes the meeting. Five formidable women do not appreciate being told they cannot discuss their book.',
      challenge: 'social',
      keyEvents: [
        'The book club: five strong-willed women who take their reading very seriously.',
        'Mrs. Bramble refuses to stop. She paid good money for this book.',
        'The book glows when touched. It whispers. It does not want to be closed.',
        'Convincing the club requires literary criticism, not intimidation.',
      ],
    },
    {
      title: 'Scene 3: The Final Chapter',
      summary: 'The book resists being shelved. The party must reason with a sentient book or face the final chapter\'s magic.',
      challenge: 'puzzle',
      keyEvents: [
        'The book opens itself. Pages flutter. It begins reading itself aloud.',
        'The "great unmaking" starts: buildings lose color, gravity weakens, time stutters.',
        'Negotiation with the book: it is lonely. It wants a reader. A permanent one.',
        'Solution: the book club agrees to weekly readings (of safe chapters) in exchange for the book\'s cooperation.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Mrs. Helga Bramble',
      role: 'book club president',
      personality: 'Imperious, well-read, and deeply offended by the suggestion that her book club is a public menace. "We are DISCUSSING LITERATURE."',
    },
    {
      name: 'The Crimson Codex',
      role: 'sentient book / antagonist',
      personality: 'Lonely, dramatic, and deeply insecure about being unread. It has been in a chest for three hundred years. It will do anything to be discussed.',
    },
  ],
  keyLocations: [
    {
      name: 'Mrs. Bramble\'s Parlor',
      description: 'A cozy sitting room with tea, biscuits, and a glowing spellbook on the coffee table.',
      significance: 'Ground zero. Where every magical disaster originates.',
    },
  ],
  dataSystems: ['npcGenerator', 'puzzleLock', 'combatNarration'],
};
