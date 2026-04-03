// Random catchphrase generator — memorable phrases NPCs repeat.
export const CATCHPHRASES: string[] = [
  '"By the Nine Hells!"', '"I\'ve seen worse."', '"That\'s going in the report."',
  '"You\'ll regret that. Everyone does."', '"Interesting. Most interesting."',
  '"Run. Now."', '"Is it too late to negotiate?"', '"That\'s not how we do things around here."',
  '"I knew this would happen."', '"You remind me of someone I used to hate."',
  '"Don\'t touch anything."', '"I\'ll deny everything."', '"This changes nothing."',
  '"The gods have a cruel sense of humor."', '"I\'m too old for this."',
  '"Remember my name. You\'ll be hearing it again."',
];
export function getRandomCatchphrase(): string { return CATCHPHRASES[Math.floor(Math.random() * CATCHPHRASES.length)]; }
export function formatCatchphrase(): string { return `💬 **NPC Catchphrase:** *${getRandomCatchphrase()}*`; }
