// Random riddle generator — procedural riddles with answers and hints.

export interface Riddle { question: string; answer: string; hints: string[]; difficulty: 'easy' | 'medium' | 'hard'; category: string; }

export const RIDDLES: Riddle[] = [
  { question: 'I have cities but no houses, forests but no trees, and rivers but no water. What am I?', answer: 'a map', hints: ['You carry me when traveling.', 'I show the world on paper.'], difficulty: 'easy', category: 'objects' },
  { question: 'What has keys but no locks, space but no room, and you can enter but can\'t go inside?', answer: 'a keyboard', hints: ['Bards might use something similar.', 'Think about writing instruments.'], difficulty: 'medium', category: 'objects' },
  { question: 'I am always hungry, I must always be fed. The finger I touch will soon turn red. What am I?', answer: 'fire', hints: ['Adventurers use me for light.', 'I need air to survive.'], difficulty: 'easy', category: 'elements' },
  { question: 'The more of me you take, the more you leave behind. What am I?', answer: 'footsteps', hints: ['You make them when you walk.', 'Look at the ground behind you.'], difficulty: 'easy', category: 'abstract' },
  { question: 'I can be cracked, made, told, and played. What am I?', answer: 'a joke', hints: ['Bards love these.', 'They make people laugh.'], difficulty: 'medium', category: 'abstract' },
  { question: 'I have a head and a tail but no body. What am I?', answer: 'a coin', hints: ['Adventurers carry many of me.', 'I come in copper, silver, and gold.'], difficulty: 'easy', category: 'objects' },
  { question: 'What comes once in a minute, twice in a moment, but never in a thousand years?', answer: 'the letter M', hints: ['Think about spelling.', 'Count the letters.'], difficulty: 'hard', category: 'wordplay' },
  { question: 'I speak without a mouth and hear without ears. I have no body but come alive with the wind.', answer: 'an echo', hints: ['Found in caves and mountains.', 'Call out and I answer.'], difficulty: 'medium', category: 'nature' },
  { question: 'What has roots nobody sees, is taller than trees, up it goes but never grows?', answer: 'a mountain', hints: ['You might climb me.', 'I\'m made of stone.'], difficulty: 'medium', category: 'nature' },
  { question: 'Alive without breath, cold as death. Never thirsty, ever drinking. Clad in mail, never clinking.', answer: 'a fish', hints: ['Found in water.', 'Has scales.'], difficulty: 'hard', category: 'nature' },
  { question: 'What can travel around the world while staying in a corner?', answer: 'a stamp', hints: ['Found on letters.', 'Very small but travels far.'], difficulty: 'medium', category: 'objects' },
  { question: 'I have teeth but cannot bite. What am I?', answer: 'a comb', hints: ['Used for grooming.', 'Runs through hair.'], difficulty: 'easy', category: 'objects' },
];

export function getRandomRiddle(difficulty?: Riddle['difficulty']): Riddle {
  const pool = difficulty ? RIDDLES.filter((r) => r.difficulty === difficulty) : RIDDLES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function formatRiddle(riddle: Riddle, showAnswer: boolean = false): string {
  const lines = [`🧩 **Riddle** (${riddle.difficulty}):\n*"${riddle.question}"*`];
  if (!showAnswer) { lines.push(`\n💡 Hints available: ${riddle.hints.length}`); lines.push(`*Answer hidden — use Arcana/INT DC ${riddle.difficulty === 'easy' ? 10 : riddle.difficulty === 'medium' ? 14 : 18} to solve.*`); }
  else lines.push(`\n✅ Answer: **${riddle.answer}**`);
  return lines.join('\n');
}
