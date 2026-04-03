// Random symbol/sigil generator — mysterious symbols found in the world.
export interface MysteriousSymbol { description: string; meaning: string; foundWhere: string; identifyDC: number; school: string; }
const SYMBOLS: MysteriousSymbol[] = [
  { description: 'A circle with three intersecting lines — like a wheel with spokes.', meaning: 'An ancient protection ward. Still active.', foundWhere: 'Carved above a doorway.', identifyDC: 12, school: 'Abjuration' },
  { description: 'An eye with a vertical pupil, weeping a single tear.', meaning: 'The mark of a thieves\' guild. "This place is watched."', foundWhere: 'Scratched into a wall at knee height.', identifyDC: 10, school: 'Divination' },
  { description: 'A spiral that seems to move when you look away.', meaning: 'A portal anchor point. Could be activated.', foundWhere: 'Painted on the floor in silver paint.', identifyDC: 16, school: 'Conjuration' },
  { description: 'A handprint in dried blood, with runes circling each finger.', meaning: 'A binding seal. Something is imprisoned here.', foundWhere: 'On a stone slab in a cellar.', identifyDC: 15, school: 'Abjuration' },
  { description: 'A crescent moon overlapping a sun — both in gold leaf.', meaning: 'A dual deity shrine marker. Sacred ground.', foundWhere: 'Inlaid in the threshold stone.', identifyDC: 8, school: 'Divination' },
  { description: 'Geometric patterns that hurt to look at for too long.', meaning: 'Aberrant writing. Exposure can cause headaches or visions.', foundWhere: 'Etched into an obsidian tablet.', identifyDC: 18, school: 'Enchantment' },
];
export function getRandomSymbol(): MysteriousSymbol { return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]; }
export function formatSymbol(s: MysteriousSymbol): string { return `🔣 **Mysterious Symbol:**\n*${s.description}*\n📍 Found: ${s.foundWhere}\n🎲 Arcana DC ${s.identifyDC} (${s.school})\n💡 Meaning: ${s.meaning}`; }
