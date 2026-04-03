// Random NPC greeting — first words when the party meets someone new.
export const NPC_GREETINGS: string[] = [
  '"Well, well. Adventurers. About time someone showed up."',
  '"I don\'t want any trouble." *backs away slowly*',
  '"Welcome! You look like you could use a drink. Or a bath. Or both."',
  '"State your business. I haven\'t got all day."',
  '"Oh thank the gods you\'re here. You ARE here to help, right?"',
  '"*stares silently for an uncomfortably long time* ...Yes?"',
  '"Adventurers! I love adventurers! My cousin was one. He\'s dead now."',
  '"You\'re not from around here. I can always tell."',
  '"If you\'re selling something, I\'m not buying. If you\'re buying, prices just went up."',
  '"*genuine smile* Finally, some new faces! Sit down, sit down."',
  '"*without looking up* I know why you\'re here. And the answer is no."',
  '"You look exactly like the people on those wanted posters. Are you...? Never mind."',
];
export function getRandomGreeting(): string { return NPC_GREETINGS[Math.floor(Math.random() * NPC_GREETINGS.length)]; }
export function formatNpcGreeting(npcName: string = 'NPC'): string { return `💬 **${npcName} says:** *${getRandomGreeting()}*`; }
