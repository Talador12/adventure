// Random heirloom generator — meaningful personal items with backstory.
export interface Heirloom { item: string; origin: string; significance: string; mechanicalUse: string | null; }
const HEIRLOOMS: Heirloom[] = [
  { item: 'A dented silver pocket watch that stopped at 3:17.', origin: 'Belonged to a grandparent.', significance: 'The exact time they were born — or died.', mechanicalUse: null },
  { item: 'A broken sword blade, kept in a leather wrap.', origin: 'A family weapon, shattered in battle.', significance: 'Reforging it is a lifelong goal.', mechanicalUse: 'If reforged (500gp + master smith), becomes a +1 weapon.' },
  { item: 'A ring too large for any finger. Heavy gold with an unfamiliar crest.', origin: 'Found in a deceased parent\'s belongings.', significance: 'The crest belongs to a noble family.', mechanicalUse: 'Showing the ring to the right person opens doors (advantage on one CHA check).' },
  { item: 'A pressed flower in a glass locket. Still colorful after decades.', origin: 'From someone the character loved.', significance: 'The only thing left of a lost relationship.', mechanicalUse: null },
  { item: 'A bone dice set with strange symbols instead of numbers.', origin: 'Won in a game against a devil.', significance: 'The devil still wants them back.', mechanicalUse: 'Roll 1d6 once per day. On a 6, gain Bardic Inspiration. On a 1, gain a minor curse until dawn.' },
  { item: 'A lock of white hair tied with a red ribbon.', origin: 'Cut from a seer before they vanished.', significance: 'The seer said "You\'ll know when to use it."', mechanicalUse: 'Can be burned to ask one yes/no question of the DM (once ever).' },
];
export function getRandomHeirloom(): Heirloom { return HEIRLOOMS[Math.floor(Math.random() * HEIRLOOMS.length)]; }
export function formatHeirloom(h: Heirloom): string { return `🏺 **Heirloom:** *${h.item}*\n📖 Origin: ${h.origin}\n💭 ${h.significance}${h.mechanicalUse ? `\n⚙️ ${h.mechanicalUse}` : ''}`; }
