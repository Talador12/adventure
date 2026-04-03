// Random combat taunt — things enemies say mid-fight.
export const COMBAT_TAUNTS: string[] = [
  '"Is that the best you\'ve got?"', '"I\'ve fought scarecrows more threatening than you!"',
  '"Your mother could swing harder!"', '"Hold still — this will only hurt a lot."',
  '"I was hoping for a challenge."', '"You should have stayed home today."',
  '"I\'ll hang your shield on my wall."', '"Beg for mercy. I enjoy the sound."',
  '"You fight like someone who learned from a book."', '"That armor won\'t save you."',
  '"My grandmother hits harder. And she\'s been dead for twenty years."',
  '"You\'re bleeding. That\'s a bad sign for you."',
];
export function getRandomTaunt(): string { return COMBAT_TAUNTS[Math.floor(Math.random() * COMBAT_TAUNTS.length)]; }
export function formatCombatTaunt(enemyName: string = 'Enemy'): string { return `😤 **${enemyName} taunts:** *${getRandomTaunt()}*`; }
