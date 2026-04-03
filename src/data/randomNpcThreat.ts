// Random NPC threat — intimidation lines from hostile NPCs.
export const NPC_THREATS: string[] = [
  '"Walk away. Now. While you still can."',
  '"You have no idea who you\'re dealing with."',
  '"I\'ve buried better adventurers than you."',
  '"This is your only warning."',
  '"Touch that again and you\'ll lose the hand."',
  '"I know people. Dangerous people. People who make problems... disappear."',
  '"You think your little group scares me? I\'ve faced worse before breakfast."',
  '"Leave. Or what happens next is on you."',
  '"*draws weapon slowly* I was hoping you\'d say that."',
  '"The last person who crossed me is at the bottom of the river. Just so we\'re clear."',
  '"*cracks knuckles* We can do this the easy way or the fun way. Your choice."',
  '"You\'re making a mistake. A permanent one."',
];
export function getRandomThreat(): string { return NPC_THREATS[Math.floor(Math.random() * NPC_THREATS.length)]; }
export function formatNpcThreat(npcName: string = 'NPC'): string { return `😠 **${npcName} threatens:** *${getRandomThreat()}*`; }
