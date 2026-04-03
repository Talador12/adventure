// Random combat round 1 description — what the first moment of combat looks like.
export const ROUND_ONE_DESCRIPTIONS: string[] = [
  'Steel rings as weapons are drawn. The air crackles with tension.',
  'Time slows. Hearts pound. The first move will decide everything.',
  'Chaos erupts. Everyone moves at once. The plan — if there was one — goes out the window.',
  'The enemy strikes first. A blade whispers through the air.',
  'A war cry echoes off the walls. The fight is on.',
  'Spell energy gathers. Weapons are raised. This is the moment.',
  'The calm before the storm is over. Now comes the storm.',
  'Eyes lock across the battlefield. No more words. Only steel.',
  'Someone charges. The rest follow. There\'s no going back now.',
  'The first arrow flies. The first spell crackles. The first blood is drawn.',
];
export function getRandomCombatOpener(): string { return ROUND_ONE_DESCRIPTIONS[Math.floor(Math.random() * ROUND_ONE_DESCRIPTIONS.length)]; }
export function formatCombatOpener(): string { return `⚔️ *${getRandomCombatOpener()}*`; }
