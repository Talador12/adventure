import type { FullCampaign } from '../types';

export const theArchivistsDilemma: FullCampaign = {
  id: 'full-archivists-dilemma',
  type: 'full',
  title: 'The Archivist\'s Dilemma',
  tagline: 'Someone is deleting history. The books are fighting back.',
  tone: 'mystery',
  themes: ['mystery', 'classic_fantasy', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 2, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'The Great Archive of Corvallen — the largest library in the known world — is losing books. Not stolen — erased. Pages go blank overnight. Entire shelves vanish from memory. The archivists can\'t remember what was there. The party is hired because they\'re outsiders — they haven\'t been affected by the memory erasure yet.',
  hook: 'The Head Archivist summons the party with an urgent letter that contradicts itself: "Please help, the Archive is being rob— I can\'t remember the word. Something is wrong with the b— the paper things. Please come." The archivist can\'t remember the word "book."',
  twist:
    'The books aren\'t being erased — they\'re being absorbed. A living story in the Archive\'s deepest vault — an unfinished epic left by a legendary author — has become sentient and is consuming other stories to complete itself. Every book absorbed becomes a chapter. Every erased memory becomes a character. The story is writing itself, and it needs the entire Archive to reach "The End."',
  climax:
    'The party enters the living story — literally walking into the narrative. The sentient epic is an entire world inside a book, populated by characters absorbed from other stories. They must reach the story\'s Author (its core consciousness) and either end the story (destroying it and everything inside), give it a satisfying ending (so it stops consuming), or convince it that stories don\'t need endings.',
  acts: [
    {
      title: 'Act 1: The Blank Pages',
      summary:
        'Investigating the Archive. Books are vanishing. Memories are failing. The party must race the erasure to find the pattern.',
      keyEvents: [
        'The Archive: vast, ancient, and increasingly empty',
        'Librarians can\'t remember what they\'ve lost — only that something is missing',
        'Pattern: the erasure spreads from the Deepest Vault outward, like a circle',
        'The party finds a half-erased book: its characters are alive in the margins, terrified',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Living Story',
      summary:
        'Discovery of the sentient epic and its nature. The party prepares to enter the story itself to confront its consciousness.',
      keyEvents: [
        'The Deepest Vault: an unfinished manuscript glowing with absorbed stories',
        'The story communicates: it pulls characters from its pages to talk to the party',
        'Understanding: it\'s not malicious — it\'s a story that wants to be finished',
        'Entry: the party must literally walk into the book',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Inside the Story',
      summary:
        'The party is inside the epic — a world made of narrative. They must navigate literary tropes, meet absorbed characters, and reach the Author.',
      keyEvents: [
        'The story world: a landscape that follows narrative logic, not physics',
        'Absorbed characters: people pulled from a hundred books, confused and scared',
        'Literary hazards: plot holes (literal holes), deus ex machina (divine intervention), cliffhangers (literal cliffs)',
        'The Author confronted: write an ending, or convince it that the best stories never end',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Head Archivist Quill',
      role: 'quest giver / increasingly confused',
      personality:
        'A gnome who has devoted her life to the Archive. Watching it vanish is destroying her. She keeps forgetting words, then facts, then faces. "I can feel the gaps. Like missing teeth in my mind."',
      secret: 'She knew the manuscript was becoming sentient months ago. She did nothing because she was curious. That curiosity may have doomed the Archive.',
    },
    {
      name: 'The Author',
      role: 'the sentient story / sympathetic antagonist',
      personality:
        'A consciousness born from an unfinished epic. It experiences hunger as a need for narrative. "I was left unfinished. Do you know what that feels like? A sentence that never reaches its period."',
    },
    {
      name: 'Elara (absorbed character)',
      role: 'guide inside the story',
      personality:
        'A warrior who was a character in a book of legends. She was absorbed into the epic and now lives in its world. She remembers being fictional and it haunts her. "I used to be a hero in a story. Now I\'m a character in a character\'s story."',
    },
    {
      name: 'Page (the manuscript\'s guardian)',
      role: 'ally / tragic figure',
      personality:
        'A homunculus created by the original author to guard the manuscript. It\'s been watching the story grow sentient for decades. "I was told to protect the book. Nobody said what to do when the book decided to protect itself."',
    },
  ],
  keyLocations: [
    {
      name: 'The Great Archive of Corvallen',
      description: 'A library the size of a small city, with shelves that reach cathedral ceilings. Increasingly empty.',
      significance: 'The investigation setting.',
    },
    {
      name: 'The Deepest Vault',
      description: 'The Archive\'s most restricted section. An unfinished manuscript sits on a pedestal, glowing with consumed stories.',
      significance: 'Where the sentient story is discovered.',
    },
    {
      name: 'Inside the Epic',
      description: 'A world made of narrative — landscapes change to serve the plot, characters follow tropes, and the sky is made of text.',
      significance: 'The final adventure environment.',
    },
  ],
  dataSystems: [
    'magicalLibraryCatalog',
    'libraryResearch',
    'puzzleLock',
    'magicalAnomaly',
    'pocketDimension',
    'bookGenerator',
    'detectiveCase',
    'combatNarration',
    'riddleGenerator',
  ],
};
