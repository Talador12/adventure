// Battlefield scavenger loot table — post-battle equipment salvage with condition and value.

export type ItemCondition = 'pristine' | 'good' | 'worn' | 'damaged' | 'ruined';
export type ScavengeCategory = 'weapon' | 'armor' | 'potion' | 'gold' | 'trinket' | 'document' | 'rare';

export interface ScavengedItem {
  name: string;
  category: ScavengeCategory;
  condition: ItemCondition;
  baseValue: number;
  conditionMultiplier: number;
  findDC: number;
  description: string;
}

export interface BattlefieldLoot {
  battleType: string;
  items: ScavengedItem[];
  totalSearchTime: string;
  hazards: string[];
}

const CONDITION_MULTIPLIERS: Record<ItemCondition, number> = { pristine: 1.0, good: 0.75, worn: 0.5, damaged: 0.25, ruined: 0.05 };

const LOOT_TABLES: BattlefieldLoot[] = [
  { battleType: 'Bandit Ambush', items: [
    { name: 'Shortsword', category: 'weapon', condition: 'worn', baseValue: 10, conditionMultiplier: 0.5, findDC: 8, description: 'Nicked and bloodied but functional.' },
    { name: 'Leather Armor', category: 'armor', condition: 'damaged', baseValue: 10, conditionMultiplier: 0.25, findDC: 8, description: 'Arrow holes. Repairable with a leather kit.' },
    { name: 'Healing Potion (cracked)', category: 'potion', condition: 'damaged', baseValue: 50, conditionMultiplier: 0.25, findDC: 12, description: 'Vial cracked. Half the potion remains (1d4+1 HP).' },
    { name: 'Coin Purse', category: 'gold', condition: 'good', baseValue: 15, conditionMultiplier: 0.75, findDC: 10, description: '15gp in mixed coins. Some are from a foreign kingdom.' },
    { name: 'Bandit\'s Map', category: 'document', condition: 'worn', baseValue: 25, conditionMultiplier: 0.5, findDC: 14, description: 'A rough map showing their hideout and stash location.' },
  ], totalSearchTime: '30 minutes', hazards: ['Bandit reinforcements (20% chance).', 'Poisoned weapons (CON DC 11 if cut while searching).'] },
  { battleType: 'Dragon\'s Lair', items: [
    { name: 'Dragon Scale (large)', category: 'rare', condition: 'pristine', baseValue: 200, conditionMultiplier: 1.0, findDC: 10, description: 'Perfect for armor crafting or sale to an enchanter.' },
    { name: 'Gold Hoard (partial)', category: 'gold', condition: 'pristine', baseValue: 500, conditionMultiplier: 1.0, findDC: 8, description: 'Coins fused together by dragonfire. Still gold.' },
    { name: 'Knight\'s Shield (melted edge)', category: 'armor', condition: 'damaged', baseValue: 50, conditionMultiplier: 0.25, findDC: 10, description: 'From a previous challenger. The crest is still visible.' },
    { name: 'Enchanted Gemstone', category: 'rare', condition: 'good', baseValue: 300, conditionMultiplier: 0.75, findDC: 15, description: 'Pulses with residual draconic magic. Arcana DC 14 to identify.' },
    { name: 'Adventurer\'s Journal', category: 'document', condition: 'worn', baseValue: 10, conditionMultiplier: 0.5, findDC: 13, description: 'Last entry: "We found it. Gods help us." Useful intel.' },
  ], totalSearchTime: '2 hours', hazards: ['Lair collapse (10% per hour, DEX DC 14 or 3d10).', 'Residual fire traps (DEX DC 13 or 2d6 fire).', 'Dragon\'s mate returns (5% chance).'] },
  { battleType: 'Undead Horde', items: [
    { name: 'Ancient Longsword', category: 'weapon', condition: 'worn', baseValue: 30, conditionMultiplier: 0.5, findDC: 10, description: 'Centuries old but surprisingly sharp. Radiates faint magic (Detect Magic).' },
    { name: 'Tattered Cloak of Protection', category: 'armor', condition: 'damaged', baseValue: 500, conditionMultiplier: 0.25, findDC: 14, description: 'Magic item, damaged. Gives +1 AC but only 50% of the time (coin flip).' },
    { name: 'Skull with Gemstone Eyes', category: 'trinket', condition: 'good', baseValue: 50, conditionMultiplier: 0.75, findDC: 11, description: 'Rubies set in eye sockets. Removing them requires delicacy (Sleight of Hand DC 12).' },
    { name: 'Necromancer\'s Spellbook', category: 'rare', condition: 'worn', baseValue: 400, conditionMultiplier: 0.5, findDC: 16, description: 'Contains 3 necromancy spells. Some pages are cursed (WIS DC 13 to read safely).' },
    { name: 'Holy Water (intact)', category: 'potion', condition: 'pristine', baseValue: 25, conditionMultiplier: 1.0, findDC: 12, description: 'Dropped by a fallen cleric. Still blessed.' },
  ], totalSearchTime: '1 hour', hazards: ['Residual undead (1d4 zombies still moving).', 'Necromantic aura (CON DC 12 or 1d4 necrotic per 10 minutes).'] },
];

export function getRandomBattlefieldLoot(): BattlefieldLoot {
  return LOOT_TABLES[Math.floor(Math.random() * LOOT_TABLES.length)];
}

export function getLootByBattleType(type: string): BattlefieldLoot | undefined {
  return LOOT_TABLES.find((l) => l.battleType === type);
}

export function getActualValue(item: ScavengedItem): number {
  return Math.round(item.baseValue * item.conditionMultiplier);
}

export function getTotalLootValue(loot: BattlefieldLoot): number {
  return loot.items.reduce((sum, i) => sum + getActualValue(i), 0);
}

export function getItemsByCategory(loot: BattlefieldLoot, category: ScavengeCategory): ScavengedItem[] {
  return loot.items.filter((i) => i.category === category);
}

export function formatBattlefieldLoot(loot: BattlefieldLoot): string {
  const lines = [`⚔️ **Battlefield: ${loot.battleType}** (Search time: ${loot.totalSearchTime})`];
  lines.push(`  Total salvage value: ~${getTotalLootValue(loot)}gp`);
  loot.items.forEach((i) => {
    const cond = { pristine: '🟢', good: '🟡', worn: '🟠', damaged: '🔴', ruined: '⚫' }[i.condition];
    lines.push(`  ${cond} ${i.name} (${i.category}, ${i.condition}) — ${getActualValue(i)}gp [DC ${i.findDC}]`);
  });
  if (loot.hazards.length > 0) { lines.push('  **Hazards:**'); loot.hazards.forEach((h) => lines.push(`    ⚠️ ${h}`)); }
  return lines.join('\n');
}

export { LOOT_TABLES as BATTLEFIELD_LOOT };
