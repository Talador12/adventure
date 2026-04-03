// Random player prompt — questions to spark roleplay during downtime.
export const PLAYER_PROMPTS: string[] = [
  'What does your character do when they can\'t sleep?',
  'What\'s the one thing your character would never forgive?',
  'If your character could send one message to their past self, what would it say?',
  'What does your character miss most about home?',
  'Your character catches their reflection — what do they think?',
  'What\'s your character\'s guilty pleasure?',
  'Who is the one person your character is most afraid of disappointing?',
  'What would your character do if they had one day of total freedom?',
  'What habit does your character have that annoys the rest of the party?',
  'What\'s the bravest thing your character has ever done — before becoming an adventurer?',
  'If your character could change one thing about themselves, what would it be?',
  'What does your character\'s laugh sound like?',
];
export function getRandomPrompt(): string { return PLAYER_PROMPTS[Math.floor(Math.random() * PLAYER_PROMPTS.length)]; }
export function formatPlayerPrompt(): string { return `🎭 **Roleplay Prompt:**\n*${getRandomPrompt()}*\n\n*Take a moment. Answer in character.*`; }
