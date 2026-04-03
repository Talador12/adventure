// Potion brewing mini-game — ingredient gathering + brewing check.

export interface PotionIngredient {
  name: string;
  rarity: 'common' | 'uncommon' | 'rare';
  cost: number;
  biome: string;
}

export interface PotionRecipe {
  id: string;
  name: string;
  description: string;
  effect: string;
  ingredients: { name: string; quantity: number }[];
  brewDC: number;
  brewAbility: string;
  brewTime: string;
  value: number;
}

export const INGREDIENTS: PotionIngredient[] = [
  { name: 'Healing Herbs', rarity: 'common', cost: 5, biome: 'forest' },
  { name: 'Moonpetal', rarity: 'uncommon', cost: 25, biome: 'forest' },
  { name: 'Fire Lichen', rarity: 'common', cost: 10, biome: 'cave' },
  { name: 'Frost Moss', rarity: 'uncommon', cost: 20, biome: 'arctic' },
  { name: 'Nightshade', rarity: 'rare', cost: 50, biome: 'swamp' },
  { name: 'Crystal Water', rarity: 'uncommon', cost: 15, biome: 'mountain' },
  { name: 'Glowcap Mushroom', rarity: 'common', cost: 5, biome: 'cave' },
  { name: 'Dragon Scale Dust', rarity: 'rare', cost: 100, biome: 'any' },
  { name: 'Spider Silk', rarity: 'common', cost: 5, biome: 'cave' },
  { name: 'Phoenix Ash', rarity: 'rare', cost: 200, biome: 'volcanic' },
];

export const POTION_RECIPES: PotionRecipe[] = [
  { id: 'heal-minor', name: 'Minor Healing Potion', description: 'A small vial of red liquid.', effect: 'Heals 1d4+1 HP', ingredients: [{ name: 'Healing Herbs', quantity: 2 }], brewDC: 8, brewAbility: 'WIS', brewTime: '1 hour', value: 25 },
  { id: 'heal-standard', name: 'Healing Potion', description: 'A ruby-red potion.', effect: 'Heals 2d4+2 HP', ingredients: [{ name: 'Healing Herbs', quantity: 3 }, { name: 'Crystal Water', quantity: 1 }], brewDC: 12, brewAbility: 'WIS', brewTime: '2 hours', value: 50 },
  { id: 'antitoxin', name: 'Antitoxin', description: 'A green-tinted liquid.', effect: 'Advantage on saves vs poison for 1 hour', ingredients: [{ name: 'Nightshade', quantity: 1 }, { name: 'Crystal Water', quantity: 1 }], brewDC: 14, brewAbility: 'WIS', brewTime: '2 hours', value: 50 },
  { id: 'fire-resist', name: 'Potion of Fire Resistance', description: 'An orange potion that feels warm.', effect: 'Resistance to fire for 1 hour', ingredients: [{ name: 'Fire Lichen', quantity: 3 }, { name: 'Dragon Scale Dust', quantity: 1 }], brewDC: 16, brewAbility: 'INT', brewTime: '4 hours', value: 300 },
  { id: 'invisibility', name: 'Potion of Invisibility', description: 'A clear liquid that shimmers.', effect: 'Invisible for 1 hour (ends on attack/cast)', ingredients: [{ name: 'Moonpetal', quantity: 2 }, { name: 'Spider Silk', quantity: 3 }], brewDC: 18, brewAbility: 'INT', brewTime: '8 hours', value: 500 },
  { id: 'frost-breath', name: 'Elixir of Frost Breath', description: 'A pale blue liquid.', effect: 'Exhale 15ft cone of cold, 3d6 damage (DEX save)', ingredients: [{ name: 'Frost Moss', quantity: 3 }, { name: 'Crystal Water', quantity: 2 }], brewDC: 15, brewAbility: 'INT', brewTime: '4 hours', value: 200 },
];

export function attemptBrew(recipe: PotionRecipe, abilityMod: number, profBonus: number): { success: boolean; roll: number; narration: string } {
  const roll = Math.floor(Math.random() * 20) + 1 + abilityMod + profBonus;
  const success = roll >= recipe.brewDC;
  return {
    success, roll,
    narration: success
      ? `✅ Brewed **${recipe.name}**! (Rolled ${roll} vs DC ${recipe.brewDC})\n*${recipe.effect}*`
      : `❌ Brewing failed. Ingredients consumed. (Rolled ${roll} vs DC ${recipe.brewDC})`,
  };
}

export function getIngredientCost(recipe: PotionRecipe): number {
  let total = 0;
  for (const req of recipe.ingredients) {
    const ing = INGREDIENTS.find((i) => i.name === req.name);
    if (ing) total += ing.cost * req.quantity;
  }
  return total;
}

export function formatPotionRecipes(): string {
  const lines = ['🧪 **Potion Recipes:**'];
  for (const r of POTION_RECIPES) {
    const cost = getIngredientCost(r);
    lines.push(`• **${r.name}** (DC ${r.brewDC} ${r.brewAbility}, ${r.brewTime}) — ${r.effect}. Materials: ~${cost}gp`);
  }
  return lines.join('\n');
}
