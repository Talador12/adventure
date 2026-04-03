// Alchemy recipe book — combine ingredients from foraging system into potions/salves/bombs.

export type RecipeCategory = 'potion' | 'salve' | 'bomb' | 'oil' | 'antidote' | 'elixir';

export interface AlchemyIngredient { name: string; quantity: number; }

export interface AlchemyRecipe {
  name: string;
  category: RecipeCategory;
  ingredients: AlchemyIngredient[];
  craftingDC: number;
  craftingTime: string;
  effect: string;
  duration: string;
  value: number;
  failureResult: string;
}

const RECIPES: AlchemyRecipe[] = [
  { name: 'Potion of Healing', category: 'potion', ingredients: [{ name: 'Moonpetal', quantity: 2 }, { name: 'Serpent Root', quantity: 1 }], craftingDC: 12, craftingTime: '2 hours', effect: 'Restore 2d4+2 HP.', duration: 'Instant', value: 50, failureResult: 'Produces a mildly nauseating liquid. Heals 1 HP and causes disadvantage on CON saves for 1 hour.' },
  { name: 'Alchemist\'s Fire', category: 'bomb', ingredients: [{ name: 'Firecap Mushroom', quantity: 2 }, { name: 'Embervine', quantity: 1 }], craftingDC: 13, craftingTime: '1 hour', effect: 'Throw (20ft): 1d4 fire on hit, 1d4 fire start of target\'s turn until extinguished (action).', duration: '1 minute', value: 50, failureResult: 'Ignites prematurely. 1d4 fire to crafter. Workspace needs cleaning.' },
  { name: 'Antitoxin', category: 'antidote', ingredients: [{ name: 'Serpent Root', quantity: 2 }, { name: 'Tidecrest Kelp', quantity: 1 }], craftingDC: 11, craftingTime: '1 hour', effect: 'Advantage on saves vs poison for 1 hour.', duration: '1 hour', value: 50, failureResult: 'Ineffective. Tastes terrible. That\'s it.' },
  { name: 'Ghostsight Salve', category: 'salve', ingredients: [{ name: 'Ghost Orchid', quantity: 1 }, { name: 'Moonpetal', quantity: 1 }], craftingDC: 15, craftingTime: '4 hours', effect: 'Apply to eyes: see invisible and ethereal creatures for 1 hour.', duration: '1 hour', value: 150, failureResult: 'Causes temporary blindness for 1d4 hours. At least you can\'t see anything embarrassing.' },
  { name: 'Frost Bomb', category: 'bomb', ingredients: [{ name: 'Frostbloom', quantity: 1 }, { name: 'Tidecrest Kelp', quantity: 2 }], craftingDC: 14, craftingTime: '2 hours', effect: 'Throw (20ft): 2d6 cold in 10ft radius. DEX DC 13 or speed halved for 1 round.', duration: 'Instant', value: 100, failureResult: 'Freezes solid. Can\'t be thrown. Makes a nice paperweight worth 5gp.' },
  { name: 'Starfall Elixir', category: 'elixir', ingredients: [{ name: 'Starfall Moss', quantity: 2 }, { name: 'Stardust Crystal', quantity: 1 }], craftingDC: 18, craftingTime: '8 hours', effect: 'Fly speed 60ft for 10 minutes. At the end, you float gently down.', duration: '10 minutes', value: 500, failureResult: 'Levitates you 10ft for 1 round then drops you. 1d6 bludgeoning. Ingredients wasted.' },
  { name: 'Weapon Oil (Fire)', category: 'oil', ingredients: [{ name: 'Embervine', quantity: 2 }, { name: 'Firecap Mushroom', quantity: 1 }], craftingDC: 13, craftingTime: '1 hour', effect: 'Apply to weapon: +1d4 fire damage for 1 hour.', duration: '1 hour', value: 75, failureResult: 'Oil is inert. Weapon is now slippery. -1 to attack rolls for 10 minutes.' },
  { name: 'Elixir of Darkvision', category: 'elixir', ingredients: [{ name: 'Deathcap Nightshade', quantity: 1 }, { name: 'Wyrmwood Bark', quantity: 1 }], craftingDC: 13, craftingTime: '2 hours', effect: 'Darkvision 60ft for 8 hours.', duration: '8 hours', value: 100, failureResult: 'Light sensitivity instead. Disadvantage in bright light for 4 hours.' },
];

export function getRecipeByName(name: string): AlchemyRecipe | undefined {
  return RECIPES.find((r) => r.name === name);
}

export function getRecipesByCategory(category: RecipeCategory): AlchemyRecipe[] {
  return RECIPES.filter((r) => r.category === category);
}

export function getRecipesByMaxDC(maxDC: number): AlchemyRecipe[] {
  return RECIPES.filter((r) => r.craftingDC <= maxDC);
}

export function getIngredientCost(recipe: AlchemyRecipe): number {
  // Rough estimate based on ingredient rarity
  return recipe.ingredients.reduce((sum, i) => sum + i.quantity * 10, 0);
}

export function getAllCategories(): RecipeCategory[] {
  return [...new Set(RECIPES.map((r) => r.category))];
}

export function formatRecipe(recipe: AlchemyRecipe): string {
  const icon = { potion: '🧪', salve: '💊', bomb: '💣', oil: '🛢️', antidote: '💚', elixir: '✨' }[recipe.category];
  const lines = [`${icon} **${recipe.name}** *(${recipe.category})*`];
  lines.push(`  Ingredients: ${recipe.ingredients.map((i) => `${i.name} × ${i.quantity}`).join(', ')}`);
  lines.push(`  Craft: DC ${recipe.craftingDC} | Time: ${recipe.craftingTime} | Value: ${recipe.value}gp`);
  lines.push(`  ⚙️ Effect: ${recipe.effect} (${recipe.duration})`);
  lines.push(`  ❌ Failure: ${recipe.failureResult}`);
  return lines.join('\n');
}

export { RECIPES as ALCHEMY_RECIPES };
