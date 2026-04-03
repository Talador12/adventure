// Random book/scroll generator — library loot with titles and contents.

export interface GeneratedBook {
  title: string;
  author: string;
  subject: string;
  condition: string;
  value: number;
  loreSnippet: string;
  useful: boolean;
}

const SUBJECTS = ['History', 'Arcana', 'Religion', 'Nature', 'Geography', 'Alchemy', 'Poetry', 'War', 'Monsters', 'Planes'];
const ADJECTIVES = ['Ancient', 'Forbidden', 'Complete', 'Illustrated', 'Abridged', 'Definitive', 'Secret', 'Lost', 'Revised', 'Annotated'];
const TITLE_PATTERNS = [
  'The {adj} Guide to {subject}', '{adj} {subject}: A Study', 'On the Nature of {subject}',
  'Chronicles of {subject}', '{subject} and Its Mysteries', 'The {adj} Compendium of {subject}',
  'Meditations on {subject}', '{subject}: Theory and Practice', 'The Art of {subject}',
];
const AUTHORS = ['Archmage Vellum', 'Brother Aldric', 'Lady Sariel', 'Professor Thornwick', 'an unknown author', 'High Priest Galamon', 'Sage Mirabel', 'Captain Ironhull', 'the Mad Wizard Zephyx', 'a mysterious "K."'];
const CONDITIONS = ['Pristine', 'Well-worn', 'Damaged (water stains)', 'Falling apart', 'Recently copied', 'Covered in dust', 'Partially burned', 'Bookmarked extensively'];
const LORE_SNIPPETS = [
  'Contains a detailed map of a region you\'ve never heard of.',
  'Mentions a ritual for contacting beings from another plane.',
  'Describes a monster weakness previously unknown to you.',
  'Contains a cipher that might decode another document.',
  'References a treasure vault beneath a nearby landmark.',
  'Includes a recipe for a rare potion.',
  'Details the political history of a fallen kingdom.',
  'Has margin notes from a previous reader — some seem urgent.',
  'Describes the true name of a fiend.',
  'Contains nothing useful — terrible poetry.',
  'Includes architectural plans of a famous dungeon.',
  'Provides advantage on your next History check about this region.',
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateBook(): GeneratedBook {
  const subject = pick(SUBJECTS);
  const adj = pick(ADJECTIVES);
  const pattern = pick(TITLE_PATTERNS);
  const title = pattern.replace('{adj}', adj).replace('{subject}', subject).replace('{subject}', subject);
  const useful = Math.random() > 0.3;
  return {
    title, author: pick(AUTHORS), subject, condition: pick(CONDITIONS),
    value: 5 + Math.floor(Math.random() * 50),
    loreSnippet: pick(LORE_SNIPPETS), useful,
  };
}

export function generateLibrary(count: number = 5): GeneratedBook[] {
  return Array.from({ length: count }, () => generateBook());
}

export function formatBook(book: GeneratedBook): string {
  return `📕 **"${book.title}"** by ${book.author}\nSubject: ${book.subject} | Condition: ${book.condition} | Value: ~${book.value}gp\n${book.useful ? '📖' : '📄'} ${book.loreSnippet}`;
}

export function formatLibrary(books: GeneratedBook[]): string {
  const lines = [`📚 **Library Loot** (${books.length} books):`];
  for (const b of books) lines.push(formatBook(b));
  return lines.join('\n\n');
}
