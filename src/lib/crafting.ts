// Crafting system — combine materials + tools + time to create items.
// Supports potions, scrolls, weapons, armor, and mundane items.

export type CraftingCategory = 'potion' | 'scroll' | 'weapon' | 'armor' | 'tool' | 'mundane';

export interface CraftingRecipe {
  id: string;
  name: string;
  category: CraftingCategory;
  materials: { name: string; quantity: number; costEach: number }[];
  toolRequired: string;
  dcCheck: { ability: string; dc: number };
  craftingDays: number;
  resultItem: { name: string; type: string; rarity: string; description: string; value: number };
}

export const RECIPES: CraftingRecipe[] = [
  // Potions
  {
    id: 'heal-potion', name: 'Potion of Healing', category: 'potion',
    materials: [{ name: 'Healing Herbs', quantity: 2, costEach: 10 }, { name: 'Crystal Vial', quantity: 1, costEach: 5 }],
    toolRequired: "Herbalism Kit", dcCheck: { ability: 'WIS', dc: 10 }, craftingDays: 1,
    resultItem: { name: 'Potion of Healing', type: 'potion', rarity: 'common', description: 'Heals 2d4+2 HP.', value: 50 },
  },
  {
    id: 'greater-heal', name: 'Potion of Greater Healing', category: 'potion',
    materials: [{ name: 'Rare Herbs', quantity: 3, costEach: 25 }, { name: 'Crystal Vial', quantity: 1, costEach: 5 }],
    toolRequired: "Herbalism Kit", dcCheck: { ability: 'WIS', dc: 14 }, craftingDays: 3,
    resultItem: { name: 'Potion of Greater Healing', type: 'potion', rarity: 'uncommon', description: 'Heals 4d4+4 HP.', value: 200 },
  },
  {
    id: 'antitoxin', name: 'Antitoxin', category: 'potion',
    materials: [{ name: 'Poison Gland', quantity: 1, costEach: 15 }, { name: 'Purified Water', quantity: 1, costEach: 5 }],
    toolRequired: "Herbalism Kit", dcCheck: { ability: 'WIS', dc: 12 }, craftingDays: 1,
    resultItem: { name: 'Antitoxin', type: 'potion', rarity: 'common', description: 'Advantage on saves vs poison for 1 hour.', value: 50 },
  },
  // Scrolls
  {
    id: 'scroll-1', name: 'Spell Scroll (1st Level)', category: 'scroll',
    materials: [{ name: 'Fine Parchment', quantity: 1, costEach: 10 }, { name: 'Arcane Ink', quantity: 1, costEach: 15 }],
    toolRequired: "Calligrapher's Supplies", dcCheck: { ability: 'INT', dc: 12 }, craftingDays: 1,
    resultItem: { name: 'Spell Scroll (1st)', type: 'scroll', rarity: 'common', description: 'Contains one 1st-level spell.', value: 50 },
  },
  {
    id: 'scroll-2', name: 'Spell Scroll (2nd Level)', category: 'scroll',
    materials: [{ name: 'Fine Parchment', quantity: 2, costEach: 10 }, { name: 'Arcane Ink', quantity: 2, costEach: 15 }],
    toolRequired: "Calligrapher's Supplies", dcCheck: { ability: 'INT', dc: 14 }, craftingDays: 3,
    resultItem: { name: 'Spell Scroll (2nd)', type: 'scroll', rarity: 'uncommon', description: 'Contains one 2nd-level spell.', value: 150 },
  },
  // Weapons
  {
    id: 'silvered-weapon', name: 'Silvered Weapon', category: 'weapon',
    materials: [{ name: 'Weapon (any)', quantity: 1, costEach: 0 }, { name: 'Silver Ingot', quantity: 2, costEach: 50 }],
    toolRequired: "Smith's Tools", dcCheck: { ability: 'STR', dc: 12 }, craftingDays: 2,
    resultItem: { name: 'Silvered Weapon', type: 'weapon', rarity: 'common', description: 'Overcomes lycanthrope resistance.', value: 200 },
  },
  {
    id: 'arrows-20', name: 'Arrows (20)', category: 'mundane',
    materials: [{ name: 'Wood Shafts', quantity: 1, costEach: 5 }, { name: 'Iron Tips', quantity: 1, costEach: 5 }],
    toolRequired: "Woodcarver's Tools", dcCheck: { ability: 'DEX', dc: 8 }, craftingDays: 1,
    resultItem: { name: 'Arrows (20)', type: 'ammunition', rarity: 'common', description: 'Standard arrows.', value: 10 },
  },
  // Armor
  {
    id: 'shield', name: 'Wooden Shield', category: 'armor',
    materials: [{ name: 'Hardwood Plank', quantity: 2, costEach: 5 }, { name: 'Iron Bands', quantity: 1, costEach: 10 }],
    toolRequired: "Carpenter's Tools", dcCheck: { ability: 'STR', dc: 10 }, craftingDays: 2,
    resultItem: { name: 'Shield', type: 'armor', rarity: 'common', description: '+2 AC.', value: 10 },
  },
];

export function getRecipesByCategory(category?: CraftingCategory): CraftingRecipe[] {
  return category ? RECIPES.filter((r) => r.category === category) : RECIPES;
}

export function getMaterialCost(recipe: CraftingRecipe): number {
  return recipe.materials.reduce((sum, m) => sum + m.quantity * m.costEach, 0);
}

export function attemptCraft(recipe: CraftingRecipe, abilityMod: number, proficiencyBonus: number): {
  success: boolean; roll: number; dc: number; narration: string;
} {
  const roll = Math.floor(Math.random() * 20) + 1 + abilityMod + proficiencyBonus;
  const success = roll >= recipe.dcCheck.dc;
  const narration = success
    ? `✅ Crafted **${recipe.resultItem.name}**! (Rolled ${roll} vs DC ${recipe.dcCheck.dc})`
    : `❌ Crafting failed. Materials consumed. (Rolled ${roll} vs DC ${recipe.dcCheck.dc})`;
  return { success, roll, dc: recipe.dcCheck.dc, narration };
}

export function formatRecipe(recipe: CraftingRecipe): string {
  const cost = getMaterialCost(recipe);
  const lines = [`🔨 **${recipe.name}** (${recipe.category})`];
  lines.push(`Materials: ${recipe.materials.map((m) => `${m.name} ×${m.quantity} (${m.costEach}gp ea)`).join(', ')} — Total: ${cost}gp`);
  lines.push(`Tool: ${recipe.toolRequired} | DC: ${recipe.dcCheck.ability} ${recipe.dcCheck.dc} | Time: ${recipe.craftingDays} day${recipe.craftingDays > 1 ? 's' : ''}`);
  lines.push(`Result: ${recipe.resultItem.name} (${recipe.resultItem.rarity}) — ${recipe.resultItem.description}`);
  return lines.join('\n');
}
