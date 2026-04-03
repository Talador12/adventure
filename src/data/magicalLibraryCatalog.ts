// Magical library catalog — books that fight back, shelves that rearrange, and forbidden sections.

export type BookDanger = 'safe' | 'mildly_dangerous' | 'dangerous' | 'lethal' | 'reality_warping';

export interface MagicalBook {
  title: string;
  danger: BookDanger;
  description: string;
  readingEffect: string;
  readingDC: number;
  readingTime: string;
  defense: string | null; // how the book protects itself
  reward: string;
}

export interface MagicalLibraryCatalogEntry {
  sectionName: string;
  accessRequirement: string;
  books: MagicalBook[];
  sectionHazard: string;
  librarian: string;
}

const CATALOG: MagicalLibraryCatalogEntry[] = [
  { sectionName: 'The Whispering Stacks', accessRequirement: 'Library card (10gp annual fee). No talking.', books: [
    { title: 'Murmurs of the Deep', danger: 'mildly_dangerous', description: 'The text whispers when read aloud. Other books shush it.', readingEffect: 'Learn one secret about any body of water within 100 miles.', readingDC: 12, readingTime: '2 hours', defense: 'The book screams if you try to leave without returning it. 30ft radius alarm.', reward: 'Water-related knowledge + a clue to a sunken treasure.' },
    { title: 'The Autobiography of Nobody', danger: 'safe', description: 'Written by someone who erased their own identity from history. Every page is a different handwriting.', readingEffect: 'Advantage on Disguise checks for 1 week (you understand anonymity deeply).', readingDC: 10, readingTime: '4 hours', defense: null, reward: 'The technique of identity erasure (useful for going into hiding).' },
  ], sectionHazard: 'The books whisper. WIS DC 10 each hour or become distracted (disadvantage on Investigation).', librarian: 'A ghost librarian who died of natural causes in the stacks 200 years ago. Still shelves books.' },
  { sectionName: 'The Forbidden Wing', accessRequirement: 'Dean\'s approval, blood signature, and an oath of silence.', books: [
    { title: 'The Codex of Unmaking', danger: 'lethal', description: 'A book that describes how to unmake spells permanently. The cover is made of antimagic metal.', readingEffect: 'Learn the Counterspell at 1 level higher than normal. But also gain a permanent -1 to spell save DC (the knowledge costs something).', readingDC: 18, readingTime: '8 hours', defense: 'The book casts Disintegrate on anyone who opens it without speaking the passphrase (DEX DC 17, 10d6+40 force).', reward: 'Enhanced Counterspell + understanding of how magic can be destroyed.' },
    { title: 'A Record of Every Death', danger: 'dangerous', description: 'Updates in real-time. Every death in the world appears as a new entry. It\'s very thick.', readingEffect: 'Can lookup any specific death. Finds the cause, location, and last words of any named dead person.', readingDC: 15, readingTime: '1 hour per lookup', defense: 'Reading for more than 8 hours: WIS DC 16 or gain indefinite madness (overwhelming grief from millions of deaths).', reward: 'Answers about any death in history. Invaluable for investigations and mysteries.' },
    { title: 'The Book That Reads You', danger: 'reality_warping', description: 'When you open it, it\'s blank. Then YOUR story appears on the pages. Including things that haven\'t happened yet.', readingEffect: 'See 1d4 possible future events for your character (DM writes them). One is true. The others are decoys.', readingDC: 16, readingTime: '30 minutes', defense: 'If you try to change a future the book predicted, it rewrites itself. WIS DC 17 or the book traps you inside your own story for 1d4 hours.', reward: 'Glimpse of possible futures. The knowledge that fate is mutable — but so are you.' },
  ], sectionHazard: 'The shelves rearrange themselves every hour. Navigation DC 15 or you end up in a different section.', librarian: 'A chain devil bound by contract to organize the forbidden wing. It hates its job. It LOVES rules.' },
  { sectionName: 'The Children\'s Section (DO NOT ENTER)', accessRequirement: '"Children only." The door won\'t open for adults. Polymorph into a child, or be very creative.', books: [
    { title: 'The Monster Under the Bed (Field Guide)', danger: 'mildly_dangerous', description: 'A children\'s picture book that is VERY accurate about monsters that live in dark places.', readingEffect: 'Advantage on Knowledge checks about aberrations and shadow creatures. The illustrations are disturbingly detailed.', readingDC: 8, readingTime: '30 minutes', defense: 'The book bites if you have an INT above 14. "This book is for KIDS!"', reward: 'Monster knowledge presented so simply even a barbarian can understand it.' },
    { title: 'The Neverending Story (literally)', danger: 'dangerous', description: 'A storybook that never ends. You keep reading. You can\'t stop.', readingEffect: 'WIS DC 14 each hour to stop reading. If you read for 8 hours straight, you gain Inspiration + 1 level of exhaustion.', readingDC: 14, readingTime: 'Indefinite', defense: 'The story is REALLY good. It adapts to your interests. It knows what you like.', reward: 'If you finish a "chapter" (WIS DC 14 to close it), learn one piece of lore that the story was about all along.' },
  ], sectionHazard: 'Animated stuffed animals guard the entrance. They\'re cute but surprisingly effective (CR 2 each, 4 of them).', librarian: 'A very old pixie who takes children\'s literacy VERY seriously. Will fight adults who disturb the section.' },
];

export function getRandomSection(): MagicalLibraryCatalogEntry {
  return CATALOG[Math.floor(Math.random() * CATALOG.length)];
}

export function getSectionByName(name: string): MagicalLibraryCatalogEntry | undefined {
  return CATALOG.find((s) => s.sectionName.toLowerCase().includes(name.toLowerCase()));
}

export function getBooksByDanger(danger: BookDanger): MagicalBook[] {
  return CATALOG.flatMap((s) => s.books).filter((b) => b.danger === danger);
}

export function getBooksWithDefenses(): MagicalBook[] {
  return CATALOG.flatMap((s) => s.books).filter((b) => b.defense !== null);
}

export function getAllSectionNames(): string[] {
  return CATALOG.map((s) => s.sectionName);
}

export function formatSection(section: MagicalLibraryCatalogEntry): string {
  const lines = [`📚 **${section.sectionName}**`];
  lines.push(`  Access: ${section.accessRequirement}`);
  lines.push(`  Librarian: ${section.librarian}`);
  lines.push(`  ⚠️ Hazard: ${section.sectionHazard}`);
  lines.push('  **Books:**');
  section.books.forEach((b) => {
    const danger = { safe: '🟢', mildly_dangerous: '🟡', dangerous: '🟠', lethal: '🔴', reality_warping: '💥' }[b.danger];
    lines.push(`    ${danger} *${b.title}* — ${b.description}`);
  });
  return lines.join('\n');
}

export { CATALOG as MAGICAL_LIBRARY_CATALOG };
