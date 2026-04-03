// Random merchant inventory — what a traveling merchant has for sale.
export interface MerchantItem { name: string; price: string; category: 'weapon' | 'armor' | 'potion' | 'tool' | 'adventuring' | 'exotic'; }
const INVENTORIES: Record<string, MerchantItem[]> = {
  general: [
    { name: 'Rope (50ft)', price: '1gp', category: 'adventuring' }, { name: 'Torch (10)', price: '1gp', category: 'adventuring' },
    { name: 'Rations (5 days)', price: '2gp 5sp', category: 'adventuring' }, { name: 'Waterskin', price: '2sp', category: 'adventuring' },
    { name: 'Bedroll', price: '1gp', category: 'adventuring' }, { name: 'Tinderbox', price: '5sp', category: 'adventuring' },
  ],
  weapons: [
    { name: 'Longsword', price: '15gp', category: 'weapon' }, { name: 'Shortbow + 20 arrows', price: '26gp', category: 'weapon' },
    { name: 'Dagger', price: '2gp', category: 'weapon' }, { name: 'Handaxe', price: '5gp', category: 'weapon' },
  ],
  potions: [
    { name: 'Potion of Healing', price: '50gp', category: 'potion' }, { name: 'Antitoxin', price: '50gp', category: 'potion' },
    { name: 'Potion of Climbing', price: '75gp', category: 'potion' }, { name: 'Oil of Slipperiness', price: '100gp', category: 'potion' },
  ],
  exotic: [
    { name: 'Spell scroll (1st level)', price: '75gp', category: 'exotic' }, { name: 'Drift globe', price: '250gp', category: 'exotic' },
    { name: 'Bag of Holding', price: '500gp', category: 'exotic' }, { name: 'Cloak of Elvenkind', price: '750gp', category: 'exotic' },
  ],
};
export type MerchantType = 'general' | 'weapons' | 'potions' | 'exotic';
export function getMerchantInventory(type: MerchantType): MerchantItem[] { return INVENTORIES[type] || INVENTORIES.general; }
export function getRandomMerchantStock(): MerchantItem[] { const types = Object.keys(INVENTORIES) as MerchantType[]; const type = types[Math.floor(Math.random() * types.length)]; return getMerchantInventory(type); }
export function formatMerchantInventory(items: MerchantItem[], merchantName: string = 'Traveling Merchant'): string { const lines = [`🏪 **${merchantName}'s Wares:**`]; for (const i of items) lines.push(`  • ${i.name} — ${i.price}`); return lines.join('\n'); }
