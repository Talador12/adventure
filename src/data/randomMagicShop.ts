// Random magic shop generator — a specialty shop selling magical goods.
export interface MagicShopItem { name: string; price: string; rarity: string; description: string; }
export interface MagicShop { shopName: string; owner: string; specialty: string; stock: MagicShopItem[]; atmosphere: string; }
const SHOP_NAMES = ['The Arcane Emporium', 'Mystic Mirabel\'s', 'The Enchanted Chest', 'Wand & Wonders', 'The Gilded Grimoire', 'Oddities & Artifacts'];
const OWNERS = ['An ancient gnome with spectacles thick as bottle caps', 'A glamorous tiefling who speaks in whispers', 'A pair of bickering twin elves', 'A golem that runs the shop while the owner is away', 'A cheerful halfling standing on a tall stool'];
const SPECIALTIES = ['Potions and alchemical supplies', 'Enchanted weapons', 'Protective wards and amulets', 'Spell components and scrolls', 'Curiosities from other planes'];
const ATMOSPHERES = ['Smells of incense and old books', 'Everything is slightly floating', 'Uncomfortably warm — the owner keeps a fire elemental as a pet', 'Dead silent — a permanent Silence spell covers the shop'];
const STOCKS: MagicShopItem[][] = [
  [{ name: 'Potion of Healing', price: '50gp', rarity: 'common', description: 'Heals 2d4+2.' }, { name: 'Scroll of Shield', price: '75gp', rarity: 'common', description: '1st-level spell scroll.' }, { name: 'Dust of Disappearance', price: '300gp', rarity: 'uncommon', description: 'Invisible for 2d4 minutes.' }],
  [{ name: '+1 Dagger', price: '500gp', rarity: 'uncommon', description: '+1 to attack and damage.' }, { name: 'Cloak of Many Fashions', price: '100gp', rarity: 'common', description: 'Change appearance at will.' }, { name: 'Immovable Rod', price: '500gp', rarity: 'uncommon', description: 'Stays fixed in space when activated.' }],
  [{ name: 'Pearl of Power', price: '1000gp', rarity: 'uncommon', description: 'Regain one spell slot (3rd or lower).' }, { name: 'Goggles of Night', price: '250gp', rarity: 'uncommon', description: 'Darkvision 60ft.' }, { name: 'Decanter of Endless Water', price: '750gp', rarity: 'uncommon', description: 'Produces water on command.' }],
];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function generateMagicShop(): MagicShop { return { shopName: pick(SHOP_NAMES), owner: pick(OWNERS), specialty: pick(SPECIALTIES), stock: pick(STOCKS), atmosphere: pick(ATMOSPHERES) }; }
export function formatMagicShop(shop: MagicShop): string { const lines = [`✨ **${shop.shopName}**`]; lines.push(`👤 Owner: ${shop.owner}`); lines.push(`🏷️ Specialty: ${shop.specialty}`); lines.push(`🌀 *${shop.atmosphere}*`); lines.push('**Stock:**'); for (const i of shop.stock) lines.push(`  • **${i.name}** (${i.rarity}, ${i.price}) — ${i.description}`); return lines.join('\n'); }
