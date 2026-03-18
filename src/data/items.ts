// Loot tables and shop inventory.
// Extracted from GameContext.tsx for maintainability.

import type { Item } from '../types/game';

// --- Loot tables ---
const COMMON_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Healing Potion', type: 'potion', rarity: 'common', description: 'Restores 2d4+2 HP.', value: 50, healAmount: 9, quantity: 1 },
  { name: 'Shortsword', type: 'weapon', rarity: 'common', description: 'A reliable blade.', value: 10, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Leather Armor', type: 'armor', rarity: 'common', description: 'Light and flexible.', value: 10, equipSlot: 'armor', acBonus: 11, armorCategory: 'light' },
  { name: 'Wooden Shield', type: 'shield', rarity: 'common', description: '+2 AC.', value: 10, equipSlot: 'shield', acBonus: 2 },
  { name: 'Dagger', type: 'weapon', rarity: 'common', description: 'Light and concealable.', value: 2, equipSlot: 'weapon', damageDie: '1d4', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Handaxe', type: 'weapon', rarity: 'common', description: 'Can be thrown.', value: 5, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Chain Shirt', type: 'armor', rarity: 'common', description: 'Medium armor.', value: 50, equipSlot: 'armor', acBonus: 13, armorCategory: 'medium' },
  { name: 'Scroll of Identify', type: 'scroll', rarity: 'common', description: "Reveals an item's properties.", value: 25 },
  { name: 'Quarterstaff', type: 'weapon', rarity: 'common', description: 'A sturdy wooden staff.', value: 2, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Light Crossbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16 },
  { name: 'Shortbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16 },
  { name: 'Antidote', type: 'potion', rarity: 'common', description: 'Cures poison. Restores 1d4 HP.', value: 30, healAmount: 3, quantity: 1 },
];

const UNCOMMON_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Greater Healing Potion', type: 'potion', rarity: 'uncommon', description: 'Restores 4d4+4 HP.', value: 150, healAmount: 18, quantity: 1 },
  { name: 'Longsword +1', type: 'weapon', rarity: 'uncommon', description: 'A finely crafted blade that glows faintly.', value: 200, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 1, attackBonus: 1, range: 1 },
  { name: 'Scale Mail', type: 'armor', rarity: 'uncommon', description: 'Sturdy medium armor.', value: 50, equipSlot: 'armor', acBonus: 14, armorCategory: 'medium' },
  { name: 'Shield +1', type: 'shield', rarity: 'uncommon', description: 'An enchanted shield. +3 AC.', value: 200, equipSlot: 'shield', acBonus: 3 },
  { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: '+1 to AC while worn.', value: 300, equipSlot: 'ring', acBonus: 1 },
  { name: 'Battleaxe', type: 'weapon', rarity: 'uncommon', description: 'A heavy, well-balanced axe.', value: 100, equipSlot: 'weapon', damageDie: '1d10', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Flaming Dagger', type: 'weapon', rarity: 'uncommon', description: 'A dagger with a blade of living fire. +1d4 damage.', value: 250, equipSlot: 'weapon', damageDie: '1d4+2', damageBonus: 0, attackBonus: 1, range: 1 },
  { name: 'Hand Crossbow +1', type: 'weapon', rarity: 'uncommon', description: 'A compact crossbow enchanted for accuracy. Range 30/120ft.', value: 300, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 1, isRanged: true, range: 6 },
  { name: 'Breastplate', type: 'armor', rarity: 'uncommon', description: 'Polished medium armor. AC 14 + DEX (max 2).', value: 400, equipSlot: 'armor', acBonus: 14, armorCategory: 'medium' },
  { name: 'Cloak of Elvenkind', type: 'misc', rarity: 'uncommon', description: 'Advantage on stealth. +1 DEX while worn.', value: 350, statBonus: { DEX: 1 } },
];

const RARE_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Superior Healing Potion', type: 'potion', rarity: 'rare', description: 'Restores 8d4+8 HP.', value: 500, healAmount: 36, quantity: 1 },
  { name: 'Greatsword +2', type: 'weapon', rarity: 'rare', description: 'A massive blade wreathed in flame.', value: 800, equipSlot: 'weapon', damageDie: '2d6', damageBonus: 2, attackBonus: 2, range: 1 },
  { name: 'Half Plate +1', type: 'armor', rarity: 'rare', description: 'Medium armor with magical reinforcement. AC 16 + DEX (max 2).', value: 1000, equipSlot: 'armor', acBonus: 16, armorCategory: 'medium' },
  { name: 'Ring of Strength', type: 'ring', rarity: 'rare', description: '+2 STR while worn.', value: 800, equipSlot: 'ring', statBonus: { STR: 2 } },
  { name: 'Amulet of Health', type: 'misc', rarity: 'rare', description: 'A warm glow that bolsters vitality. +2 CON.', value: 800, statBonus: { CON: 2 } },
  { name: 'Frostbrand Rapier', type: 'weapon', rarity: 'rare', description: 'A rapier that trails wisps of frost. +2 to hit and damage.', value: 900, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 2, attackBonus: 2, range: 1 },
  { name: 'Longbow +2', type: 'weapon', rarity: 'rare', description: 'An elven bow that hums with power. Range 150/600ft.', value: 900, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 2, attackBonus: 2, isRanged: true, range: 30 },
  { name: 'Adamantine Shield', type: 'shield', rarity: 'rare', description: 'Nearly indestructible. +3 AC.', value: 750, equipSlot: 'shield', acBonus: 3 },
  { name: 'Headband of Intellect', type: 'misc', rarity: 'rare', description: 'Sharpens the mind. +2 INT while worn.', value: 900, statBonus: { INT: 2 } },
];

const EPIC_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Potion of Supreme Healing', type: 'potion', rarity: 'epic', description: 'Restores 10d4+20 HP.', value: 1500, healAmount: 55, quantity: 1 },
  { name: 'Vorpal Greatsword', type: 'weapon', rarity: 'epic', description: 'A blade so sharp it hums. +3 to hit and damage.', value: 3000, equipSlot: 'weapon', damageDie: '2d6+3', damageBonus: 3, attackBonus: 3, range: 1 },
  { name: 'Plate Armor of Etherealness', type: 'armor', rarity: 'epic', description: 'Gleaming full plate infused with planar energy.', value: 5000, equipSlot: 'armor', acBonus: 18, armorCategory: 'heavy' },
  { name: 'Ring of Spell Storing', type: 'ring', rarity: 'epic', description: 'Stores latent magic. +2 AC, +2 WIS.', value: 4000, equipSlot: 'ring', acBonus: 2, statBonus: { WIS: 2 } },
  { name: 'Oathbow', type: 'weapon', rarity: 'epic', description: 'Sworn enemy takes 3d6 extra. +3 to hit. Range 150/600ft.', value: 4500, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 3, attackBonus: 3, isRanged: true, range: 30 },
  { name: 'Staff of Power', type: 'weapon', rarity: 'epic', description: 'Crackles with arcane might. +3 to hit, 2d8+3 damage.', value: 4000, equipSlot: 'weapon', damageDie: '2d8', damageBonus: 3, attackBonus: 3, range: 1 },
];

export function rollLoot(enemyCount: number, partyLevel: number): Item[] {
  const items: Item[] = [];
  for (let i = 0; i < enemyCount; i++) {
    const roll = Math.random();
    const epicChance = Math.max(0, 0.005 + (partyLevel - 3) * 0.005);
    const rareChance = 0.02 + partyLevel * 0.01;
    const uncommonChance = 0.1 + partyLevel * 0.02;

    let pool: Omit<Item, 'id'>[];
    if (roll < epicChance) pool = EPIC_LOOT;
    else if (roll < epicChance + rareChance) pool = RARE_LOOT;
    else if (roll < epicChance + rareChance + uncommonChance) pool = UNCOMMON_LOOT;
    else if (roll < 0.6) pool = COMMON_LOOT;
    else continue;

    const template = pool[Math.floor(Math.random() * pool.length)];
    items.push({ ...template, id: crypto.randomUUID() });
  }
  return items;
}

// --- Shop ---
export const SHOP_ITEMS: (Omit<Item, 'id'> & { category: string })[] = [
  { name: 'Dagger', type: 'weapon', rarity: 'common', description: 'Light and concealable.', value: 2, equipSlot: 'weapon', damageDie: '1d4', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Shortsword', type: 'weapon', rarity: 'common', description: 'A reliable blade.', value: 10, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Longsword', type: 'weapon', rarity: 'common', description: 'Versatile and dependable.', value: 15, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Battleaxe', type: 'weapon', rarity: 'uncommon', description: 'A heavy, well-balanced axe.', value: 100, equipSlot: 'weapon', damageDie: '1d10', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Greatsword', type: 'weapon', rarity: 'uncommon', description: 'Two-handed, devastating.', value: 150, equipSlot: 'weapon', damageDie: '2d6', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Shortbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16, category: 'Weapons' },
  { name: 'Longbow', type: 'weapon', rarity: 'common', description: 'Range 150/600ft.', value: 50, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, isRanged: true, range: 30, category: 'Weapons' },
  { name: 'Light Crossbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16, category: 'Weapons' },
  { name: 'Hand Crossbow', type: 'weapon', rarity: 'common', description: 'Range 30/120ft. One-handed.', value: 75, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, isRanged: true, range: 6, category: 'Weapons' },
  { name: 'Leather Armor', type: 'armor', rarity: 'common', description: 'Light and flexible.', value: 10, equipSlot: 'armor', acBonus: 11, armorCategory: 'light', category: 'Armor' },
  { name: 'Chain Shirt', type: 'armor', rarity: 'common', description: 'Medium armor, reliable.', value: 50, equipSlot: 'armor', acBonus: 13, armorCategory: 'medium', category: 'Armor' },
  { name: 'Scale Mail', type: 'armor', rarity: 'uncommon', description: 'Sturdy medium armor.', value: 50, equipSlot: 'armor', acBonus: 14, armorCategory: 'medium', category: 'Armor' },
  { name: 'Chain Mail', type: 'armor', rarity: 'uncommon', description: 'Heavy armor.', value: 75, equipSlot: 'armor', acBonus: 16, armorCategory: 'heavy', category: 'Armor' },
  { name: 'Wooden Shield', type: 'shield', rarity: 'common', description: '+2 AC.', value: 10, equipSlot: 'shield', acBonus: 2, category: 'Armor' },
  { name: 'Healing Potion', type: 'potion', rarity: 'common', description: 'Restores 2d4+2 HP.', value: 50, healAmount: 9, quantity: 1, category: 'Potions' },
  { name: 'Greater Healing Potion', type: 'potion', rarity: 'uncommon', description: 'Restores 4d4+4 HP.', value: 150, healAmount: 18, quantity: 1, category: 'Potions' },
  { name: 'Superior Healing Potion', type: 'potion', rarity: 'rare', description: 'Restores 8d4+8 HP.', value: 500, healAmount: 36, quantity: 1, category: 'Potions' },
  { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: '+1 AC while worn.', value: 300, equipSlot: 'ring', acBonus: 1, category: 'Accessories' },
  { name: 'Scroll of Identify', type: 'scroll', rarity: 'common', description: "Reveals an item's properties.", value: 25, category: 'Accessories' },
  // Light sources & supplies
  { name: 'Candle', type: 'light', rarity: 'common', description: '10ft bright, 20ft dim. Burns 1 hour.', value: 0.01, appliesCondition: 'candlelit', consumable: true, quantity: 10, category: 'Supplies' },
  { name: 'Torch', type: 'light', rarity: 'common', description: '20ft bright, 30ft dim. Burns 1 hour.', value: 0.01, appliesCondition: 'torchlit', consumable: true, quantity: 5, category: 'Supplies' },
  { name: 'Hooded Lantern', type: 'light', rarity: 'common', description: '30ft bright, 50ft dim. Burns 6 hours on oil.', value: 5, appliesCondition: 'lantern', category: 'Supplies' },
  { name: 'Oil Flask', type: 'misc', rarity: 'common', description: 'Fuel for lanterns. Burns 6 hours per flask.', value: 0.1, quantity: 3, category: 'Supplies' },
  { name: 'Tinderbox', type: 'misc', rarity: 'common', description: 'Flint, steel, and tinder for lighting fires.', value: 0.5, category: 'Supplies' },
  { name: 'Rope (50ft)', type: 'misc', rarity: 'common', description: 'Hempen rope, 50 feet. 2 HP, AC 10.', value: 1, category: 'Supplies' },
  { name: "Healer's Kit", type: 'misc', rarity: 'common', description: '10 uses. Stabilize a dying creature as an action.', value: 5, quantity: 10, category: 'Supplies' },
  { name: 'Rations (1 day)', type: 'misc', rarity: 'common', description: 'Dried food and water for one day of travel.', value: 0.5, consumable: true, quantity: 5, category: 'Supplies' },
];

export const SHOP_CATEGORIES = ['Weapons', 'Armor', 'Potions', 'Accessories', 'Supplies'] as const;
