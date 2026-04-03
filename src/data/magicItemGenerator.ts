// Random magic item generator — procedural minor magic items with quirks.

export interface GeneratedMagicItem {
  name: string;
  type: string;
  rarity: 'common' | 'uncommon';
  effect: string;
  quirk: string;
  value: number;
}

const ITEM_BASES = ['Ring', 'Amulet', 'Bracelet', 'Cloak', 'Boots', 'Gloves', 'Belt', 'Dagger', 'Wand', 'Orb', 'Lantern', 'Compass', 'Locket', 'Circlet', 'Brooch'];
const MODIFIERS = ['Whispering', 'Glowing', 'Frozen', 'Burning', 'Shadow', 'Verdant', 'Lunar', 'Storm', 'Arcane', 'Ancient', 'Cursed', 'Blessed', 'Crystal', 'Iron', 'Silver'];
const EFFECTS = [
  'Glows faintly in the presence of undead within 60ft.',
  'Once per day, allows the wearer to speak with small animals for 10 minutes.',
  'Keeps food and drink fresh indefinitely while stored within.',
  'The wearer never gets lost — always knows which direction is north.',
  'Once per day, can create a small illusion (1ft cube) lasting 1 minute.',
  'Grants advantage on saves against being frightened while worn.',
  'The wearer can hold their breath for twice as long.',
  'Once per long rest, the item can cast Mending on an object you touch.',
  'Produces a faint, pleasant scent chosen when attuned.',
  'Allows the wearer to change the color of the item at will.',
  'When thrown, returns to the thrower\'s hand at the start of their next turn.',
  'Grants +1 to a single skill check once per long rest.',
  'Hums softly when within 30ft of a secret door.',
  'Once per day, can purify 1 gallon of water.',
  'The bearer can send a 25-word message to another creature they know, once per dawn.',
];
const QUIRKS = [
  'It hums an unrecognizable tune when no one is watching.',
  'It occasionally whispers the name of a dead person.',
  'It slowly changes color throughout the day.',
  'It makes the bearer\'s eyes glow faintly in the dark.',
  'It feels warm to the touch, even in freezing conditions.',
  'Animals are inexplicably drawn to it.',
  'It floats slightly when placed on a flat surface.',
  'It smells faintly of cinnamon.',
  'It appears in the bearer\'s pocket even if set down elsewhere.',
  'When activated, tiny sparkles drift from it.',
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateMagicItem(): GeneratedMagicItem {
  const base = pick(ITEM_BASES);
  const mod = pick(MODIFIERS);
  return {
    name: `${mod} ${base}`,
    type: base.toLowerCase(),
    rarity: Math.random() > 0.3 ? 'common' : 'uncommon',
    effect: pick(EFFECTS),
    quirk: pick(QUIRKS),
    value: 50 + Math.floor(Math.random() * 200),
  };
}

export function formatMagicItem(item: GeneratedMagicItem): string {
  return `✨ **${item.name}** (${item.rarity}, ~${item.value}gp)\n*${item.effect}*\nQuirk: ${item.quirk}`;
}
