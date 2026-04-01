// Treasure hoard tables — DMG-inspired level-scaled random loot.
// Generates gold, gems, art objects, and magic items by tier.

import type { Item, ItemRarity } from '../types/game';

interface TreasureEntry {
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'scroll' | 'ring' | 'wondrous' | 'misc';
  rarity: ItemRarity;
  value: number;
  description: string;
  acBonus?: number;
  attackBonus?: number;
  damageDie?: string;
  damageBonus?: number;
  healAmount?: number;
}

const MAGIC_ITEMS: Record<string, TreasureEntry[]> = {
  common: [
    { name: 'Potion of Healing', type: 'potion', rarity: 'common', value: 50, description: 'Restores 2d4+2 HP.', healAmount: 7 },
    { name: 'Driftglobe', type: 'wondrous', rarity: 'common', value: 75, description: 'Floating orb that casts Light or Daylight once/day.' },
    { name: 'Cloak of Billowing', type: 'wondrous', rarity: 'common', value: 25, description: 'Dramatically billows on command. No mechanical effect.' },
    { name: 'Sending Stone (pair)', type: 'wondrous', rarity: 'common', value: 100, description: 'Cast Sending once/day to the paired stone.' },
  ],
  uncommon: [
    { name: 'Weapon +1', type: 'weapon', rarity: 'uncommon', value: 500, description: '+1 to attack and damage rolls.', attackBonus: 1, damageBonus: 1 },
    { name: 'Shield +1', type: 'armor', rarity: 'uncommon', value: 500, description: '+1 AC beyond normal shield bonus.', acBonus: 1 },
    { name: 'Bag of Holding', type: 'wondrous', rarity: 'uncommon', value: 400, description: 'Holds up to 500 lbs in an extradimensional space.' },
    { name: 'Boots of Elvenkind', type: 'wondrous', rarity: 'uncommon', value: 250, description: 'Advantage on Stealth checks to move silently.' },
    { name: 'Goggles of Night', type: 'wondrous', rarity: 'uncommon', value: 200, description: 'Darkvision 60ft while wearing.' },
    { name: 'Potion of Greater Healing', type: 'potion', rarity: 'uncommon', value: 150, description: 'Restores 4d4+4 HP.', healAmount: 14 },
    { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', value: 350, description: '+1 AC and saving throws.', acBonus: 1 },
  ],
  rare: [
    { name: 'Weapon +2', type: 'weapon', rarity: 'rare', value: 4000, description: '+2 to attack and damage rolls.', attackBonus: 2, damageBonus: 2 },
    { name: 'Armor +1', type: 'armor', rarity: 'rare', value: 1500, description: '+1 AC beyond normal armor.', acBonus: 1 },
    { name: 'Flame Tongue', type: 'weapon', rarity: 'rare', value: 5000, description: 'Command word: blade ignites, deals +2d6 fire damage.', damageBonus: 7, damageDie: '2d6' },
    { name: 'Cloak of Displacement', type: 'wondrous', rarity: 'rare', value: 3000, description: 'Attacks against you have disadvantage until you are hit.' },
    { name: 'Amulet of Health', type: 'wondrous', rarity: 'rare', value: 3000, description: 'Constitution score becomes 19 while wearing.' },
    { name: 'Potion of Superior Healing', type: 'potion', rarity: 'rare', value: 500, description: 'Restores 8d4+8 HP.', healAmount: 28 },
  ],
  epic: [
    { name: 'Weapon +3', type: 'weapon', rarity: 'epic', value: 20000, description: '+3 to attack and damage rolls.', attackBonus: 3, damageBonus: 3 },
    { name: 'Armor +2', type: 'armor', rarity: 'epic', value: 10000, description: '+2 AC beyond normal armor.', acBonus: 2 },
    { name: 'Staff of Power', type: 'weapon', rarity: 'epic', value: 25000, description: '+2 attack, +2 spell save DC, stores 20 charges for various spells.', attackBonus: 2 },
    { name: 'Robe of the Archmagi', type: 'armor', rarity: 'epic', value: 30000, description: 'AC 15 + DEX, advantage on saving throws vs spells.', acBonus: 5 },
  ],
};

const GEMS: Array<{ name: string; value: number }> = [
  { name: 'Azurite', value: 10 }, { name: 'Agate', value: 10 }, { name: 'Turquoise', value: 10 },
  { name: 'Bloodstone', value: 50 }, { name: 'Moonstone', value: 50 }, { name: 'Onyx', value: 50 },
  { name: 'Garnet', value: 100 }, { name: 'Jade', value: 100 }, { name: 'Pearl', value: 100 },
  { name: 'Topaz', value: 500 }, { name: 'Sapphire', value: 1000 }, { name: 'Ruby', value: 5000 },
  { name: 'Diamond', value: 5000 }, { name: 'Black Opal', value: 1000 },
];

interface HoardResult {
  gold: number;
  gems: Array<{ name: string; value: number }>;
  items: Item[];
  description: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollDice(count: number, sides: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return total;
}

export function rollTreasureHoard(partyLevel: number): HoardResult {
  const tier = partyLevel <= 4 ? 1 : partyLevel <= 10 ? 2 : partyLevel <= 16 ? 3 : 4;
  const gold = tier === 1 ? rollDice(6, 6) * 10 : tier === 2 ? rollDice(4, 6) * 100 : tier === 3 ? rollDice(4, 6) * 1000 : rollDice(6, 6) * 5000;

  const gemCount = tier === 1 ? rollDice(1, 4) : tier === 2 ? rollDice(2, 4) : rollDice(1, 6);
  const gems: Array<{ name: string; value: number }> = [];
  const affordableGems = GEMS.filter((g) => g.value <= gold * 0.3);
  for (let i = 0; i < gemCount; i++) {
    if (affordableGems.length > 0) gems.push(pickRandom(affordableGems));
  }

  const itemRarity = tier === 1 ? 'common' : tier === 2 ? 'uncommon' : tier === 3 ? 'rare' : 'epic';
  const itemCount = tier === 1 ? rollDice(1, 3) : tier === 2 ? rollDice(1, 4) : rollDice(1, 3);
  const itemPool = MAGIC_ITEMS[itemRarity] || MAGIC_ITEMS.common;
  const items: Item[] = [];
  for (let i = 0; i < itemCount; i++) {
    const entry = pickRandom(itemPool);
    items.push({
      id: `hoard-${crypto.randomUUID().slice(0, 8)}`,
      name: entry.name,
      type: entry.type === 'weapon' ? 'weapon' : entry.type === 'armor' ? 'armor' : entry.type === 'potion' ? 'potion' : 'misc',
      rarity: entry.rarity,
      description: entry.description,
      value: entry.value,
      acBonus: entry.acBonus,
      attackBonus: entry.attackBonus,
      damageDie: entry.damageDie,
      damageBonus: entry.damageBonus,
      healAmount: entry.healAmount,
      quantity: 1,
    });
  }

  const gemTotal = gems.reduce((s, g) => s + g.value, 0);
  const itemTotal = items.reduce((s, i) => s + i.value, 0);
  const description = `Tier ${tier} treasure hoard: ${gold} gp, ${gems.length} gems (${gemTotal} gp), ${items.length} magic items (${itemTotal} gp total value)`;

  return { gold, gems, items, description };
}
