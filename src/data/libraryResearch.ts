// Library/archive research system — book collections with knowledge checks and discovery mechanics.

export type LibrarySize = 'private_shelf' | 'town_library' | 'university' | 'grand_archive' | 'forbidden_vault';
export type KnowledgeDomain = 'history' | 'arcana' | 'religion' | 'nature' | 'planes' | 'monsters' | 'geography' | 'politics';

export interface LibraryBook {
  title: string;
  domain: KnowledgeDomain;
  rarity: 'common' | 'uncommon' | 'rare' | 'unique';
  researchBonus: number; // +1 to +5 on related checks
  secret: string | null; // hidden info found on Investigation DC 15+
  description: string;
}

export interface Library {
  name: string;
  size: LibrarySize;
  accessRequirement: string;
  researchDC: number; // base DC to find useful info
  timePerCheck: string; // how long one research check takes
  books: LibraryBook[];
  specialCollection: string | null;
}

export interface ResearchResult {
  found: boolean;
  info: string;
  timeSpent: string;
  bonusDiscovery: string | null;
}

const LIBRARIES: Library[] = [
  {
    name: 'Bramblewick\'s Books',
    size: 'private_shelf',
    accessRequirement: 'Buy something (5gp minimum) or Persuasion DC 12.',
    researchDC: 14,
    timePerCheck: '1 hour',
    books: [
      { title: 'A Traveler\'s Guide to the North', domain: 'geography', rarity: 'common', researchBonus: 1, secret: null, description: 'Maps and landmarks. Some notes in the margins about hidden caves.' },
      { title: 'Potions for Beginners', domain: 'arcana', rarity: 'common', researchBonus: 1, secret: 'A recipe for a banned hallucinogenic potion is hidden between pages 47 and 48.', description: 'Simple alchemy guide. Surprisingly useful.' },
    ],
    specialCollection: null,
  },
  {
    name: 'The Athenaeum of Lasthold',
    size: 'town_library',
    accessRequirement: 'Free for residents. 2gp/day for visitors.',
    researchDC: 12,
    timePerCheck: '2 hours',
    books: [
      { title: 'Chronicles of the Last War', domain: 'history', rarity: 'uncommon', researchBonus: 2, secret: 'A coded message reveals the location of a hidden war cache.', description: 'A firsthand account of the great conflict. Thorough and detailed.' },
      { title: 'Bestiary of the Wilds', domain: 'monsters', rarity: 'uncommon', researchBonus: 2, secret: null, description: 'Illustrated guide to common monsters. Weakness sections are particularly useful.' },
      { title: 'The Faiths of the Realm', domain: 'religion', rarity: 'common', researchBonus: 1, secret: null, description: 'Comprehensive overview of regional religions and their practices.' },
      { title: 'On the Nature of Plants', domain: 'nature', rarity: 'common', researchBonus: 1, secret: 'Chapter 12 describes a plant that doesn\'t exist in any other botanical text. Someone added it.', description: 'Botanical reference work. Dull but thorough.' },
    ],
    specialCollection: null,
  },
  {
    name: 'The Ivory Scriptorium',
    size: 'university',
    accessRequirement: 'Faculty pass, student ID, or Deception DC 14 with forged credentials.',
    researchDC: 10,
    timePerCheck: '4 hours',
    books: [
      { title: 'Planar Convergence Theory', domain: 'planes', rarity: 'rare', researchBonus: 3, secret: 'Appendix C contains coordinates for a stable portal — if you can decode the cipher.', description: 'Dense academic work on planar mechanics. Headache-inducing but brilliant.' },
      { title: 'The Bloodline Histories', domain: 'politics', rarity: 'uncommon', researchBonus: 2, secret: 'House Valerian\'s heir is adopted. Proof is in the genealogy tables.', description: 'Noble family trees going back 500 years. Every scandal is here if you look.' },
      { title: 'Arcane Theorems, Vol. 1-12', domain: 'arcana', rarity: 'uncommon', researchBonus: 3, secret: null, description: 'The definitive magical reference. Volume 7 is suspiciously missing from most copies.' },
      { title: 'Monstrous Compendium (Annotated)', domain: 'monsters', rarity: 'rare', researchBonus: 4, secret: 'Handwritten notes in the margin describe a monster that officially doesn\'t exist.', description: 'The gold standard. Margin notes from a famous monster hunter add invaluable field data.' },
    ],
    specialCollection: 'The Restricted Section — requires Faculty Dean approval. Contains texts on necromancy, demon summoning, and forbidden history.',
  },
  {
    name: 'The Sunken Archives',
    size: 'grand_archive',
    accessRequirement: 'Invitation from a Keeper, or complete a quest for the Archive.',
    researchDC: 8,
    timePerCheck: '8 hours (the archive is vast)',
    books: [
      { title: 'The True History of the World', domain: 'history', rarity: 'unique', researchBonus: 5, secret: 'The gods are not what people think. Chapter 1 alone would cause a religious schism.', description: 'Written by an entity that claims to predate the gods. May be true.' },
      { title: 'Atlas of the Planes', domain: 'planes', rarity: 'rare', researchBonus: 4, secret: 'Maps of 3 planes that modern scholars don\'t believe exist.', description: 'Every known plane, mapped and annotated. Some maps move.' },
      { title: 'The Nameless Bestiary', domain: 'monsters', rarity: 'unique', researchBonus: 5, secret: 'Contains the true names of 3 demon lords. Speaking them aloud is very unwise.', description: 'Creatures that other books refuse to mention. Reading it requires WIS DC 12 or nightmares for 1d4 days.' },
    ],
    specialCollection: 'The Forbidden Vault — sealed behind wards. Contains world-ending knowledge. The Keepers debate whether to destroy it.',
  },
];

export function getLibraryBySize(size: LibrarySize): Library | undefined {
  return LIBRARIES.find((l) => l.size === size);
}

export function searchLibrary(library: Library, domain: KnowledgeDomain): LibraryBook[] {
  return library.books.filter((b) => b.domain === domain);
}

export function getBestBookForDomain(library: Library, domain: KnowledgeDomain): LibraryBook | null {
  const books = searchLibrary(library, domain);
  if (books.length === 0) return null;
  return books.reduce((best, b) => (b.researchBonus > best.researchBonus ? b : best));
}

export function getBooksWithSecrets(library: Library): LibraryBook[] {
  return library.books.filter((b) => b.secret !== null);
}

export function getAllDomains(): KnowledgeDomain[] {
  return ['history', 'arcana', 'religion', 'nature', 'planes', 'monsters', 'geography', 'politics'];
}

export function formatLibrary(library: Library): string {
  const icon = { private_shelf: '📚', town_library: '🏛️', university: '🎓', grand_archive: '📜', forbidden_vault: '🔒' }[library.size];
  const lines = [`${icon} **${library.name}** *(${library.size.replace(/_/g, ' ')})*`];
  lines.push(`  Access: ${library.accessRequirement}`);
  lines.push(`  Base Research DC: ${library.researchDC} | Time per check: ${library.timePerCheck}`);
  lines.push(`  Books: ${library.books.map((b) => b.title).join(', ')}`);
  if (library.specialCollection) lines.push(`  🔒 Special: ${library.specialCollection}`);
  return lines.join('\n');
}

export { LIBRARIES };
