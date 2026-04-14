// Ancient library guardian — sentient protectors of forbidden knowledge with puzzles and tests.

export type GuardianType = 'construct' | 'spirit' | 'elemental' | 'aberrant' | 'celestial';

export interface KnowledgeTest {
  name: string;
  description: string;
  skillCheck: string;
  dc: number;
  passReward: string;
  failConsequence: string;
}

export interface LibraryGuardian {
  name: string;
  type: GuardianType;
  description: string;
  personality: string;
  libraryDescription: string;
  tests: KnowledgeTest[];
  forbiddenSection: string;
  weakness: string;
  questHook: string;
}

const GUARDIANS: LibraryGuardian[] = [
  {
    name: 'The Index',
    type: 'construct',
    description: 'A 10-foot tall humanoid made entirely of compressed book pages. Words crawl across its skin. It speaks by rearranging the text on its body.',
    personality: 'Absolutely literal. Follows its directive without interpretation. If you ask for "a book on fire," it gives you a book that is literally on fire. Specify carefully.',
    libraryDescription: 'The Vault of Compiled Truths: a library carved into a mountain. Every book ever destroyed has a copy here. The shelves are infinite. Without The Index, finding anything takes decades.',
    tests: [
      { name: 'The Catalogue Test', description: 'The Index asks you to correctly classify a book by its contents without opening it.', skillCheck: 'Arcana', dc: 14, passReward: 'Access to the general collection. The Index will retrieve 3 books of your choice.', failConsequence: 'The book you misclassified flies at your head. 1d6 bludgeoning. The Index says "Incorrect." and waits for you to try again.' },
      { name: 'The Reference Check', description: 'Prove you have read at least one book in the collection by answering a question about its contents.', skillCheck: 'History', dc: 15, passReward: 'Access to the restricted collection. Rare spell scrolls, lost histories, forgotten languages.', failConsequence: 'The Index stamps "UNVERIFIED" on your forehead in ink that lasts 24 hours. You may not enter the restricted section.' },
      { name: 'The Thesis Defense', description: 'Present an original thought that is not already in the library. The Index checks EVERY book to verify originality.', skillCheck: 'Persuasion', dc: 17, passReward: 'Access to the Forbidden Section. The Index adds your thought to the collection (you are now an author here).', failConsequence: 'The Index produces the book that already contains your thought. "Page 347. You are derivative." Ego damage only.' },
    ],
    forbiddenSection: 'Contains books that are dangerous to READ. One book kills anyone who reads chapter 3. Another book rewrites your memories. A third book is a sentient predator that eats other books.',
    weakness: 'The Index cannot process paradoxes. Telling it "this statement is false" causes it to freeze for 1d4 rounds while it compiles a response. It considers this cheating.',
    questHook: 'A book in the Forbidden Section has started writing new chapters by itself. The chapters describe events that have not happened yet. The latest chapter describes the party entering the library.',
  },
  {
    name: 'Memoria',
    type: 'spirit',
    description: 'The ghost of the library\'s original architect, a woman who died before the library was finished. She completed it in death. She has been here for 3,000 years.',
    personality: 'Lonely, knowledgeable, slightly unhinged from millennia of solitude. She names the books and talks to them. Some talk back (she enchanted them). She considers all visitors potential friends or thieves.',
    libraryDescription: 'The Spiral Archive: a tower that descends underground in a spiral. Each level covers a different era. The deeper you go, the older (and more dangerous) the knowledge.',
    tests: [
      { name: 'The Conversation', description: 'Memoria asks about the outside world. She has not had news in 200 years. Entertain her.', skillCheck: 'Performance', dc: 12, passReward: 'She likes you. Free access to the upper 5 levels. She will even give recommendations.', failConsequence: 'She is bored. "Mortals used to be more interesting." She lets you in but follows you, providing unsolicited commentary.' },
      { name: 'The Empathy Test', description: 'She shows you a book that is damaged — pages torn, cover burned. She asks you to feel what the book feels.', skillCheck: 'Insight', dc: 15, passReward: 'Access to the damaged books section. These books contain incomplete but unique knowledge found nowhere else.', failConsequence: 'Memoria weeps. The library shakes. Books fly off shelves. "You do not CARE about them." 2d6 psychic damage from her grief.' },
      { name: 'The Promise', description: 'She asks you to take a book to the surface and read it to someone. Any book. She wants her collection to be READ, not just stored.', skillCheck: 'Charisma', dc: 13, passReward: 'Access to the deep levels. She gives you a book she personally recommends. It is always exactly what you need.', failConsequence: 'If you refuse or lie about agreeing: all doors in the library seal. "If you will not share knowledge, you will stay here and read it yourself."' },
    ],
    forbiddenSection: 'The bottom level. Memoria has never gone there. She built it but cannot remember what she put in it. The stairs down are blocked by a door that opens only for someone who has forgotten something important.',
    weakness: 'She is bound to the library and cannot leave. Promising to carry her stories to the surface genuinely moves her. She will grant almost any favor in exchange for proof that the outside world remembers this place.',
    questHook: 'Memoria is fading. Ghosts need to be remembered to persist. She has been alone so long that she is forgetting herself. If her name is not spoken in the living world within 30 days, she and the library vanish.',
  },
];

export function getRandomGuardian(): LibraryGuardian {
  return GUARDIANS[Math.floor(Math.random() * GUARDIANS.length)];
}

export function getGuardianByType(type: GuardianType): LibraryGuardian | undefined {
  return GUARDIANS.find((g) => g.type === type);
}

export function getAllGuardianTypes(): GuardianType[] {
  return [...new Set(GUARDIANS.map((g) => g.type))];
}

export function getTestCount(guardian: LibraryGuardian): number {
  return guardian.tests.length;
}

export function formatGuardian(guardian: LibraryGuardian): string {
  const lines = [`📚 **${guardian.name}** *(${guardian.type} guardian)*`];
  lines.push(`  ${guardian.description}`);
  lines.push(`  Personality: ${guardian.personality}`);
  lines.push(`  Library: ${guardian.libraryDescription}`);
  lines.push('  **Tests:**');
  for (const t of guardian.tests) {
    lines.push(`    - **${t.name}** (DC ${t.dc} ${t.skillCheck}): ${t.description}`);
  }
  lines.push(`  Forbidden section: ${guardian.forbiddenSection}`);
  lines.push(`  Weakness: ${guardian.weakness}`);
  lines.push(`  Quest: ${guardian.questHook}`);
  return lines.join('\n');
}

export { GUARDIANS as LIBRARY_GUARDIANS };
