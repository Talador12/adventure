// D&D 5e-inspired loot roll tables.
// Roll against a table based on encounter difficulty to generate random treasure.

import type { Item, ItemRarity } from '../types/game';

interface LootEntry {
  name: string;
  type: Item['type'];
  rarity: ItemRarity;
  description: string;
  value: number;
  weight: number;  // relative probability weight
  // Optional item-specific fields
  damageDie?: string;
  acBonus?: number;
  healAmount?: number;
  equipSlot?: Item['equipSlot'];
  appliesCondition?: Item['appliesCondition'];
  consumable?: boolean;
}

// Gold ranges by difficulty
const GOLD_RANGES: Record<string, { min: number; max: number }> = {
  easy: { min: 5, max: 25 },
  medium: { min: 15, max: 75 },
  hard: { min: 50, max: 200 },
  deadly: { min: 100, max: 500 },
};

// Common loot (all difficulties)
const COMMON_LOOT: LootEntry[] = [
  { name: 'Healing Potion', type: 'potion', rarity: 'common', description: 'Restores 2d4+2 HP.', value: 50, weight: 30, healAmount: 9, consumable: true },
  { name: 'Torch', type: 'light', rarity: 'common', description: '20ft bright, 30ft dim.', value: 0.01, weight: 15, appliesCondition: 'torchlit', consumable: true },
  { name: 'Rations (1 day)', type: 'misc', rarity: 'common', description: 'Dried food for one day.', value: 0.5, weight: 10, consumable: true },
  { name: 'Oil Flask', type: 'misc', rarity: 'common', description: 'Fuel for lanterns.', value: 0.1, weight: 8 },
  { name: 'Rope (50ft)', type: 'misc', rarity: 'common', description: 'Hempen rope.', value: 1, weight: 5 },
  { name: 'Scroll of Identify', type: 'scroll', rarity: 'common', description: "Reveals an item's properties.", value: 25, weight: 4 },
  { name: 'Antitoxin', type: 'potion', rarity: 'common', description: 'Advantage on saves vs poison for 1 hour.', value: 50, weight: 4, consumable: true },
];

// Uncommon loot (medium+)
const UNCOMMON_LOOT: LootEntry[] = [
  { name: 'Greater Healing Potion', type: 'potion', rarity: 'uncommon', description: 'Restores 4d4+4 HP.', value: 150, weight: 15, healAmount: 14, consumable: true },
  { name: 'Hooded Lantern', type: 'light', rarity: 'common', description: '30ft bright, 50ft dim.', value: 5, weight: 8, appliesCondition: 'lantern' },
  { name: '+1 Dagger', type: 'weapon', rarity: 'uncommon', description: 'Magical dagger (+1 attack/damage).', value: 100, weight: 5, damageDie: '1d4+1', equipSlot: 'weapon' },
  { name: 'Shield of Faith', type: 'shield', rarity: 'uncommon', description: 'Shield that glows faintly. +2 AC.', value: 200, weight: 4, acBonus: 2, equipSlot: 'shield' },
  { name: 'Bag of Holding', type: 'misc', rarity: 'uncommon', description: 'Interior is larger than exterior.', value: 500, weight: 3 },
  { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: '+1 AC while worn.', value: 300, weight: 2, acBonus: 1, equipSlot: 'ring' },
  { name: 'Scroll of Fireball', type: 'scroll', rarity: 'uncommon', description: '3rd-level: 8d6 fire, 20ft sphere.', value: 150, weight: 3 },
];

// Rare loot (hard+)
const RARE_LOOT: LootEntry[] = [
  { name: 'Superior Healing Potion', type: 'potion', rarity: 'rare', description: 'Restores 8d4+8 HP.', value: 450, weight: 10, healAmount: 28, consumable: true },
  { name: '+1 Longsword', type: 'weapon', rarity: 'rare', description: 'Magical longsword (+1 attack/damage).', value: 500, weight: 5, damageDie: '1d8+1', equipSlot: 'weapon' },
  { name: '+1 Chain Mail', type: 'armor', rarity: 'rare', description: 'Magical armor. AC 17.', value: 750, weight: 4, acBonus: 17, equipSlot: 'armor' },
  { name: 'Cloak of Elvenkind', type: 'misc', rarity: 'rare', description: 'Advantage on Stealth checks.', value: 800, weight: 3 },
  { name: 'Pearl of Power', type: 'misc', rarity: 'rare', description: 'Regain one spell slot (up to 3rd level) per day.', value: 1000, weight: 2 },
];

// Epic loot (deadly only)
const EPIC_LOOT: LootEntry[] = [
  { name: 'Flame Tongue Sword', type: 'weapon', rarity: 'epic', description: 'Command word: +2d6 fire damage.', value: 5000, weight: 3, damageDie: '1d8+2d6', equipSlot: 'weapon' },
  { name: '+2 Shield', type: 'shield', rarity: 'epic', description: 'Magical shield. +4 AC total.', value: 4000, weight: 2, acBonus: 4, equipSlot: 'shield' },
  { name: 'Amulet of Health', type: 'ring', rarity: 'epic', description: 'CON becomes 19 while worn.', value: 8000, weight: 1 },
];

function weightedRoll(entries: LootEntry[], rng: () => number): LootEntry {
  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0);
  let roll = rng() * totalWeight;
  for (const entry of entries) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return entries[entries.length - 1];
}

function entryToItem(entry: LootEntry): Item {
  const item: Item = {
    id: crypto.randomUUID(),
    name: entry.name,
    type: entry.type,
    rarity: entry.rarity,
    description: entry.description,
    value: entry.value,
  };
  if (entry.damageDie) item.damageDie = entry.damageDie;
  if (entry.acBonus) item.acBonus = entry.acBonus;
  if (entry.healAmount) item.healAmount = entry.healAmount;
  if (entry.equipSlot) item.equipSlot = entry.equipSlot;
  if (entry.appliesCondition) item.appliesCondition = entry.appliesCondition;
  if (entry.consumable) item.consumable = entry.consumable;
  return item;
}

export interface LootRollResult {
  gold: number;
  items: Item[];
  description: string;
}

/** Roll loot for a completed encounter. Difficulty drives table selection + item count. */
export function rollLoot(difficulty: 'easy' | 'medium' | 'hard' | 'deadly'): LootRollResult {
  const rng = () => Math.random();
  const goldRange = GOLD_RANGES[difficulty];
  const gold = Math.round(goldRange.min + rng() * (goldRange.max - goldRange.min));

  // Build available loot pool based on difficulty
  let pool = [...COMMON_LOOT];
  if (difficulty === 'medium' || difficulty === 'hard' || difficulty === 'deadly') pool = [...pool, ...UNCOMMON_LOOT];
  if (difficulty === 'hard' || difficulty === 'deadly') pool = [...pool, ...RARE_LOOT];
  if (difficulty === 'deadly') pool = [...pool, ...EPIC_LOOT];

  // Item count based on difficulty
  const itemCounts: Record<string, number> = { easy: 1, medium: 2, hard: 3, deadly: 4 };
  const numItems = itemCounts[difficulty];
  const items: Item[] = [];
  const pickedNames = new Set<string>();

  for (let i = 0; i < numItems; i++) {
    // Try to avoid duplicates
    let attempts = 0;
    let entry: LootEntry;
    do {
      entry = weightedRoll(pool, rng);
      attempts++;
    } while (pickedNames.has(entry.name) && attempts < 10);
    pickedNames.add(entry.name);
    items.push(entryToItem(entry));
  }

  const itemNames = items.map((i) => i.name).join(', ');
  const description = `Loot: ${gold} gold${items.length > 0 ? ` + ${itemNames}` : ''}`;

  return { gold, items, description };
}
