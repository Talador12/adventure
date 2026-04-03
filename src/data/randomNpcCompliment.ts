// Random NPC compliment — things NPCs say to ingratiate themselves.
export const NPC_COMPLIMENTS: string[] = [
  '"You have the bearing of a noble. Or at least someone who\'s met one."',
  '"That\'s a fine weapon. Is it magical, or do you just make everything look good?"',
  '"I can tell you\'re the smart one of the group."',
  '"Your reputation precedes you — and for once, the reputation is underselling it."',
  '"You have honest eyes. That\'s rare around here."',
  '"I\'ve met many adventurers. You\'re the first I\'d actually trust."',
  '"That armor suits you. Did you have it commissioned, or was it destiny?"',
  '"You walk like someone who\'s seen things. Dangerous things. And survived."',
  '"Your companions are lucky to have you. Do they know that?"',
  '"I don\'t impress easily. Consider me impressed."',
];
export function getRandomCompliment(): string { return NPC_COMPLIMENTS[Math.floor(Math.random() * NPC_COMPLIMENTS.length)]; }
export function formatNpcCompliment(npcName: string = 'NPC'): string { return `😊 **${npcName} says:** *${getRandomCompliment()}*`; }
