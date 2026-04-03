// Random ancient language decoder — in-game translation puzzles for inscriptions.

export type LanguageFamily = 'celestial' | 'infernal' | 'primordial' | 'draconic' | 'sylvan' | 'deep_speech';

export interface InscriptionPuzzle {
  language: LanguageFamily;
  inscription: string;
  translation: string;
  decodeDC: number;
  decodeSkill: string;
  partialClue: string;
  context: string;
  reward: string;
}

const PUZZLES: InscriptionPuzzle[] = [
  { language: 'celestial', inscription: '✦ ◇ ☽ ✦ ◇ ✦ ☽ ◇', translation: '"The worthy shall pass. The unworthy shall learn."', decodeDC: 14, decodeSkill: 'Religion or Arcana', partialClue: 'The star symbol (✦) appears to mean "one who" — it\'s a pronoun.', context: 'Carved above a sealed temple door. Glowing faintly.', reward: 'Knowing the translation allows the door to open peacefully. Without it: WIS DC 15 or be judged (4d6 radiant).' },
  { language: 'infernal', inscription: 'The text shifts. Every time you look away and back, letters have moved.', translation: '"Sign here. Terms and conditions apply. Void where prohibited by divine law."', decodeDC: 16, decodeSkill: 'Arcana or Deception', partialClue: 'The word "sign" appears in multiple places. This is a contract.', context: 'Written inside a suspicious circle on the floor of an abandoned summoning chamber.', reward: 'Understanding prevents accidentally signing. Reading it aloud without understanding IS signing.' },
  { language: 'primordial', inscription: 'Symbols that look like waves, flames, wind, and stone, interlocking.', translation: '"Earth holds. Water flows. Fire consumes. Air frees. Together: creation."', decodeDC: 13, decodeSkill: 'Nature or Arcana', partialClue: 'Each symbol represents an element. The order matters — it\'s a sequence.', context: 'Engraved on four pillars surrounding a sealed vault.', reward: 'Activating the pillars in the correct elemental order opens the vault without the trap.' },
  { language: 'draconic', inscription: 'Claw marks that form letters. Massive. Each letter is 3ft tall.', translation: '"MINE. ALL MINE. TOUCH NOTHING OR BURN. — Fyranthraxis the Magnificent, Year of the Red Star"', decodeDC: 11, decodeSkill: 'History or Arcana', partialClue: 'The possessive pronoun is enormous. This is a dragon\'s claim.', context: 'Scratched into the wall of a cave. The gold is RIGHT THERE.', reward: 'Knowing the dragon\'s name lets you research its weaknesses. Also: it signed and dated its claim. That\'s admissible in draconic law.' },
  { language: 'sylvan', inscription: 'The letters are made of living vines. They grow and shrink with the seasons.', translation: '"Take only what you need. Return what you borrow. The forest remembers all debts."', decodeDC: 12, decodeSkill: 'Nature or Survival', partialClue: 'The vine-letters are healthier where the meaning is positive. Wilting where it warns.', context: 'Written on a natural archway leading into an enchanted forest.', reward: 'Following the inscription\'s advice grants safe passage. Ignoring it: the forest actively hunts you.' },
  { language: 'deep_speech', inscription: 'The text hurts to look at. The letters have too many angles.', translation: '"We were here before your gods. We will be here after. Do not wake what sleeps beneath."', decodeDC: 18, decodeSkill: 'Arcana (with disadvantage for non-aberrant scholars)', partialClue: 'The symbol for "sleep" is the only one that doesn\'t cause a headache. Something WANTS you to understand it.', context: 'Carved into the floor of a cave that goes deeper than any map shows.', reward: 'Understanding the warning: advantage on saves against whatever is down there. It\'s grateful someone listened.' },
];

export function getRandomPuzzle(): InscriptionPuzzle {
  return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
}

export function getPuzzlesByLanguage(language: LanguageFamily): InscriptionPuzzle[] {
  return PUZZLES.filter((p) => p.language === language);
}

export function getPuzzlesByMaxDC(maxDC: number): InscriptionPuzzle[] {
  return PUZZLES.filter((p) => p.decodeDC <= maxDC);
}

export function getAllLanguageFamilies(): LanguageFamily[] {
  return [...new Set(PUZZLES.map((p) => p.language))];
}

export function formatPuzzle(puzzle: InscriptionPuzzle, showTranslation: boolean = false): string {
  const lines = [`📜 **Ancient Inscription** *(${puzzle.language}, ${puzzle.decodeSkill} DC ${puzzle.decodeDC})*`];
  lines.push(`  *${puzzle.inscription}*`);
  lines.push(`  Context: ${puzzle.context}`);
  lines.push(`  💡 Partial clue: ${puzzle.partialClue}`);
  if (showTranslation) { lines.push(`  🔓 Translation: ${puzzle.translation}`); lines.push(`  🏆 Reward: ${puzzle.reward}`); }
  return lines.join('\n');
}

export { PUZZLES as INSCRIPTION_PUZZLES };
