// Character backstory questionnaire — guided builder with prompts.
// Generates a structured backstory from answers to key questions.

export interface BackstoryQuestion {
  id: string;
  category: string;
  question: string;
  examples: string[];
}

export const BACKSTORY_QUESTIONS: BackstoryQuestion[] = [
  { id: 'origin', category: 'Origins', question: 'Where did you grow up?', examples: ['A small farming village', 'The slums of a great city', 'A nomadic tribe', 'A monastery in the mountains'] },
  { id: 'family', category: 'Origins', question: 'What was your family like?', examples: ['Loving parents, many siblings', 'Orphaned at a young age', 'A single parent who worked hard', 'Noble family with expectations'] },
  { id: 'formative', category: 'Origins', question: 'What event shaped your youth?', examples: ['A devastating fire', 'Meeting a mysterious stranger', 'Discovering a hidden talent', 'Being chosen for something'] },
  { id: 'motivation', category: 'Motivation', question: 'Why did you become an adventurer?', examples: ['To seek revenge', 'To find a missing loved one', 'For glory and gold', 'To escape a dark past'] },
  { id: 'goal', category: 'Motivation', question: 'What is your ultimate goal?', examples: ['Become a king', 'Find a legendary artifact', 'Atone for past sins', 'Protect the innocent'] },
  { id: 'fear', category: 'Personality', question: 'What do you fear most?', examples: ['Being alone', 'Failure', 'The dark', 'Losing control'] },
  { id: 'secret', category: 'Personality', question: 'What secret do you keep?', examples: ['A crime you committed', 'A forbidden love', 'A hidden power', 'You\'re not who you claim to be'] },
  { id: 'ally', category: 'Relationships', question: 'Who is your closest ally outside the party?', examples: ['A childhood friend', 'A mentor who taught you', 'A sibling', 'A mysterious benefactor'] },
  { id: 'enemy', category: 'Relationships', question: 'Who is your greatest enemy?', examples: ['A rival from your past', 'The person who killed your family', 'A powerful lord', 'Yourself'] },
  { id: 'quirk', category: 'Personality', question: 'What\'s a distinctive habit or quirk?', examples: ['Always humming', 'Collects odd trinkets', 'Never sits with back to a door', 'Talks to their weapon'] },
  { id: 'treasure', category: 'Possessions', question: 'What possession do you treasure most?', examples: ['A family heirloom', 'A letter from a loved one', 'A lucky coin', 'A holy symbol'] },
  { id: 'moral', category: 'Personality', question: 'What line would you never cross?', examples: ['Harming children', 'Breaking a sworn oath', 'Betraying a friend', 'Using dark magic'] },
];

export function getQuestionsByCategory(): Record<string, BackstoryQuestion[]> {
  const grouped: Record<string, BackstoryQuestion[]> = {};
  for (const q of BACKSTORY_QUESTIONS) {
    if (!grouped[q.category]) grouped[q.category] = [];
    grouped[q.category].push(q);
  }
  return grouped;
}

export function buildBackstory(answers: Record<string, string>, characterName: string): string {
  const lines = [`**${characterName}'s Backstory:**\n`];
  const grouped = getQuestionsByCategory();
  for (const [category, questions] of Object.entries(grouped)) {
    const categoryAnswers = questions.filter((q) => answers[q.id]?.trim());
    if (categoryAnswers.length > 0) {
      lines.push(`*${category}:*`);
      for (const q of categoryAnswers) lines.push(`${q.question} ${answers[q.id]}`);
      lines.push('');
    }
  }
  return lines.join('\n');
}

export function getRandomPrompts(count: number = 5): BackstoryQuestion[] {
  const shuffled = [...BACKSTORY_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function formatQuestionnairePreview(): string {
  const grouped = getQuestionsByCategory();
  const lines = ['📝 **Backstory Questionnaire** (12 questions):'];
  for (const [cat, qs] of Object.entries(grouped)) {
    lines.push(`**${cat}:** ${qs.map((q) => q.question).join(' / ')}`);
  }
  return lines.join('\n');
}
