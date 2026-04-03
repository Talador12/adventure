// Random exit line — dramatic last words as the party leaves a scene.
export const EXIT_LINES: string[] = [
  '"We\'ll be back."', '"This isn\'t over."', '"Tell no one we were here."',
  '"If anyone asks, we were never here."', '"Thank you. Truly."',
  '"You haven\'t seen the last of us."', '"Let\'s never speak of this again."',
  '"*dramatic cloak swish* We ride at dawn."', '"I need a drink. Several drinks."',
  '"Well. That could have gone worse."', '"*silence. Everyone walks away without a word.*"',
  '"Same time next week?"', '"The next time we meet, things will be different."',
  '"*tips hat* Good day."', '"If we survive this, first round is on me."',
];
export function getRandomExitLine(): string { return EXIT_LINES[Math.floor(Math.random() * EXIT_LINES.length)]; }
export function formatExitLine(characterName: string = 'Character'): string { return `🚪 **${characterName}:** *${getRandomExitLine()}*`; }
