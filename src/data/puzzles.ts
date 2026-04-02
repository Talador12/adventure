// Encounter puzzle system — riddles, logic puzzles, and knowledge checks.
// DM presents a puzzle, players submit answers, correct answer gates progression.

export interface Puzzle {
  id: string;
  name: string;
  type: 'riddle' | 'logic' | 'knowledge' | 'pattern';
  difficulty: 'easy' | 'medium' | 'hard';
  prompt: string;
  hints: string[];
  answer: string; // normalized lowercase, trimmed
  alternateAnswers?: string[]; // accept these too
  reward?: string; // flavor text on success
  consequence?: string; // flavor text on failure
  dc?: number; // optional INT check DC to get a free hint
}

export const PUZZLE_LIBRARY: Puzzle[] = [
  // Riddles
  {
    id: 'riddle-river', name: 'The River Riddle', type: 'riddle', difficulty: 'easy',
    prompt: '"I have a mouth but never speak, I have a bed but never sleep. What am I?"',
    hints: ['Think about geography.', 'It flows through the land.'],
    answer: 'river', alternateAnswers: ['a river', 'the river'],
    reward: 'The stone door grinds open, revealing the passage beyond.',
    consequence: 'The runes flash red. The passage remains sealed.',
  },
  {
    id: 'riddle-shadow', name: 'The Shadow Riddle', type: 'riddle', difficulty: 'easy',
    prompt: '"The more you take, the more you leave behind. What am I?"',
    hints: ['You make them when you walk.', 'Look down at the ground.'],
    answer: 'footsteps', alternateAnswers: ['steps', 'footprints'],
    reward: 'The enchantment lifts. The way forward is clear.',
  },
  {
    id: 'riddle-echo', name: 'The Echo Chamber', type: 'riddle', difficulty: 'medium',
    prompt: '"I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?"',
    hints: ['You hear it in caves and mountains.', 'Call out and it answers.'],
    answer: 'echo', alternateAnswers: ['an echo', 'the echo'],
    reward: 'The whispering walls fall silent. A hidden passage reveals itself.',
  },
  {
    id: 'riddle-time', name: 'The Sphinx\'s Challenge', type: 'riddle', difficulty: 'hard',
    prompt: '"I am not alive, but I grow; I don\'t have lungs, but I need air; I don\'t have a mouth, but water kills me. What am I?"',
    hints: ['It gives warmth and light.', 'Adventurers use me in dark places.'],
    answer: 'fire', alternateAnswers: ['a fire', 'flame', 'a flame'],
    reward: 'The sphinx nods. "You may pass."',
    consequence: 'The sphinx snarls. "Wrong. The toll is blood."',
  },
  // Logic puzzles
  {
    id: 'logic-doors', name: 'The Two Doors', type: 'logic', difficulty: 'medium',
    prompt: 'Two doors stand before you. A guard stands at each. One door leads to treasure, the other to a trap. One guard always tells the truth, the other always lies. You may ask ONE guard ONE question. What do you ask?',
    hints: ['Ask about the other guard.', 'Use a self-referential question.'],
    answer: 'which door would the other guard say leads to treasure',
    alternateAnswers: ['what would the other guard say', 'ask what the other guard would say', 'which door would the other guard point to'],
    reward: 'You choose the opposite door and find the treasure room.',
    dc: 14,
  },
  {
    id: 'logic-bridge', name: 'The Weight of Passage', type: 'logic', difficulty: 'hard',
    prompt: 'A magic bridge can hold exactly 200 pounds. You find 3 gems: Ruby (60 lbs), Sapphire (80 lbs), and Diamond (90 lbs). The bridge has a pressure plate on the far side that needs at least 140 lbs to open the vault. Which gems do you carry across?',
    hints: ['Add up the weights carefully.', '60 + 80 = 140, which is under 200.'],
    answer: 'ruby and sapphire', alternateAnswers: ['ruby sapphire', 'the ruby and sapphire', 'ruby, sapphire'],
    reward: 'The pressure plate clicks. The vault door swings open.',
  },
  // Knowledge checks
  {
    id: 'know-elements', name: 'The Elemental Ward', type: 'knowledge', difficulty: 'easy',
    prompt: 'Four braziers surround a sealed door, each inscribed with an element: Fire, Water, Earth, Air. The inscription reads: "Light the one that opposes earth." Which brazier?',
    hints: ['Classical element opposites.', 'Earth\'s opposite is in the sky.'],
    answer: 'air', alternateAnswers: ['the air', 'air brazier'],
    reward: 'The air brazier ignites with a ghostly blue flame. The ward dissolves.',
    dc: 10,
  },
  {
    id: 'know-undead', name: 'The Cryptkeeper\'s Price', type: 'knowledge', difficulty: 'medium',
    prompt: 'The skeletal figure rasps: "Name the school of magic that governs my kind, and I shall let you pass."',
    hints: ['Think about the school that deals with death and undead.'],
    answer: 'necromancy', alternateAnswers: ['the school of necromancy', 'necromantic'],
    reward: 'The skeleton bows. "Your knowledge serves you well."',
    dc: 12,
  },
  // Pattern puzzles
  {
    id: 'pattern-runes', name: 'The Rune Sequence', type: 'pattern', difficulty: 'medium',
    prompt: 'Glowing runes on the wall show: 2, 6, 12, 20, 30, __. What comes next?',
    hints: ['Look at the differences between numbers.', 'Differences: 4, 6, 8, 10, ...'],
    answer: '42', alternateAnswers: ['forty-two', 'forty two'],
    reward: 'The final rune blazes to life. The magical seal breaks.',
  },
  {
    id: 'pattern-colors', name: 'The Chromatic Lock', type: 'pattern', difficulty: 'hard',
    prompt: 'A lock with 5 gemstone slots. The pattern reads: Red, Blue, Red, Blue, __. But the inscription warns: "The third repetition breaks the pattern." What color is the fifth gem?',
    hints: ['It says the pattern BREAKS on the third repetition.', 'Not red or blue.'],
    answer: 'green', alternateAnswers: ['yellow', 'purple', 'white'],
    reward: 'The lock clicks. You chose to break the pattern — and it was the right choice.',
    dc: 15,
  },
];

export function checkAnswer(puzzle: Puzzle, guess: string): boolean {
  const normalized = guess.toLowerCase().trim();
  if (normalized === puzzle.answer) return true;
  return puzzle.alternateAnswers?.some((a) => normalized.includes(a.toLowerCase())) || false;
}

export function getRandomPuzzle(difficulty?: Puzzle['difficulty'], type?: Puzzle['type']): Puzzle {
  let pool = PUZZLE_LIBRARY;
  if (difficulty) pool = pool.filter((p) => p.difficulty === difficulty);
  if (type) pool = pool.filter((p) => p.type === type);
  if (pool.length === 0) pool = PUZZLE_LIBRARY;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getPuzzlesByType(): Record<string, Puzzle[]> {
  const grouped: Record<string, Puzzle[]> = {};
  for (const p of PUZZLE_LIBRARY) {
    if (!grouped[p.type]) grouped[p.type] = [];
    grouped[p.type].push(p);
  }
  return grouped;
}
