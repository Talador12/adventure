// Session zero question generator — conversation starters to align party expectations.
export type QuestionCategory = 'tone' | 'boundaries' | 'character' | 'logistics' | 'world';
export interface SessionZeroQuestion { category: QuestionCategory; question: string; whyItMatters: string; followUp: string; }
const QUESTIONS: SessionZeroQuestion[] = [
  { category: 'tone', question: 'On a scale from "Monty Python" to "Game of Thrones" — where should this campaign land?', whyItMatters: 'Prevents the player who wants dark gritty realism from clashing with the player who wants to seduce the dragon.', followUp: 'Is it okay if the tone shifts between sessions? Some serious, some silly?' },
  { category: 'boundaries', question: 'Are there topics anyone wants off the table? No judgment, no explanation needed.', whyItMatters: 'Everyone has different comfort levels. Respecting them costs nothing and builds trust.', followUp: 'We can use an X-card system — tap the card (or say "X") to skip a scene, no questions asked.' },
  { category: 'character', question: 'Why are your characters together? Don\'t say "we met in a tavern." Give me a REAL reason.', whyItMatters: 'Connected characters care about each other\'s survival. Strangers don\'t. The campaign is 100× better with bonds.', followUp: 'Each pair of characters: share one memory you have together. Even a small one.' },
  { category: 'logistics', question: 'How do we handle a player missing a session? Does their character vanish? Autopilot? Kidnapped by gnomes?', whyItMatters: 'This WILL happen. Having a plan prevents awkward "where did Steve go?" moments.', followUp: 'What about character death? Is it possible? How do we handle it?' },
  { category: 'world', question: 'What kind of world excites you? High magic? Low magic? Political intrigue? Dungeon crawls? Everything?', whyItMatters: 'A DM can\'t build a world the players hate. Give them input. They\'ll invest more.', followUp: 'Name one scene from a movie, book, or game you want to experience in D&D. I\'ll make it happen.' },
  { category: 'character', question: 'What is your character afraid of? Not monsters — REAL fears. Failure? Abandonment? Being ordinary?', whyItMatters: 'Fears create stakes. A character who fears nothing is boring. A character who fears losing someone? That\'s a STORY.', followUp: 'Is it okay if I use this fear against you in-game? I promise it\'ll be worth it.' },
  { category: 'tone', question: 'How do you feel about NPC death? Can beloved characters die? Should death have consequences?', whyItMatters: 'If death has no weight, sacrifice has no meaning. If everyone dies, nobody cares. Find the middle.', followUp: 'What about resurrection? Easy access? Rare? Impossible? This changes everything about combat.' },
];
export function getRandomQuestion(): SessionZeroQuestion { return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]; }
export function getQuestionsByCategory(c: QuestionCategory): SessionZeroQuestion[] { return QUESTIONS.filter((q) => q.category === c); }
export function getAllCategories(): QuestionCategory[] { return [...new Set(QUESTIONS.map((q) => q.category))]; }
export function formatQuestion(q: SessionZeroQuestion): string {
  return `❓ **${q.question}**\n  Category: ${q.category}\n  Why: ${q.whyItMatters}\n  Follow-up: ${q.followUp}`;
}
export { QUESTIONS as SESSION_ZERO_QUESTIONS };
