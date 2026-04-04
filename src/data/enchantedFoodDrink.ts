// Enchanted food and drink effects — magical meals with temporary buffs and side effects.

export type FoodType = 'meal' | 'drink' | 'snack' | 'dessert' | 'potion_food';

export interface EnchantedFoodItem {
  name: string;
  type: FoodType;
  description: string;
  buff: string;
  buffDuration: string;
  sideEffect: string | null;
  preparationDC: number;
  ingredients: string;
  value: number;
}

const FOODS: EnchantedFoodItem[] = [
  { name: 'Dragon Pepper Stew', type: 'meal', description: 'A stew made with peppers grown near a dragon\'s lair. The peppers absorbed residual fire magic.', buff: 'Fire resistance for 4 hours. +1 to CON saves.', buffDuration: '4 hours', sideEffect: 'Breath becomes visible (steam). Disadvantage on Stealth for 1 hour (you smell like a forge).', preparationDC: 13, ingredients: 'Dragon peppers (50gp), dire boar meat, fire salt.', value: 75 },
  { name: 'Moonberry Wine', type: 'drink', description: 'Wine made from berries that only grow under a full moon. Glows silver in the glass.', buff: 'Darkvision 60ft (or +30ft if you have it). Advantage on CHA checks for 2 hours.', buffDuration: '2 hours', sideEffect: 'Your eyes glow silver. Very noticeable in the dark. Romantic but impractical for stealth.', preparationDC: 14, ingredients: 'Moonberries (30gp), elven sugar, starlight (literal, captured in a jar).', value: 50 },
  { name: 'Ironbread', type: 'snack', description: 'Dense, heavy bread baked with iron filings and enchanted yeast. Tastes like a blacksmith shop.', buff: '+2 to AC for 1 hour (skin hardens temporarily). +1 to STR checks.', buffDuration: '1 hour', sideEffect: 'Weight increases by 50 lbs. Swim speed becomes 0. Metal detectors (and fey) hate you.', preparationDC: 12, ingredients: 'Enchanted flour (10gp), iron filings, dwarf-brewed yeast.', value: 25 },
  { name: 'Feywild Macarons', type: 'dessert', description: 'Pastel-colored macarons that taste different to every person. They taste like your happiest memory.', buff: 'Remove 1 level of exhaustion. Gain Inspiration. Feel genuinely happy for 1 hour.', buffDuration: '1 hour', sideEffect: 'You can\'t lie for 1 hour (fey magic values honesty). Everything you say is true. EVERYTHING.', preparationDC: 15, ingredients: 'Fey sugar (25gp), pixie dust, memories of joy (1 willingly given happy memory per batch).', value: 40 },
  { name: 'Liquid Courage', type: 'drink', description: 'A whiskey so strong it\'s technically a potion. The bottle has a lion on it. The lion winks.', buff: 'Immune to frightened for 4 hours. +2 to Intimidation. Advantage on saves vs. charm.', buffDuration: '4 hours', sideEffect: 'Disadvantage on DEX checks and saves for 2 hours (you\'re drunk). Also: incredibly overconfident.', preparationDC: 11, ingredients: 'Triple-distilled dwarven spirits (15gp), liquid courage extract (5gp), a lion\'s whisker.', value: 30 },
  { name: 'Stardust Cake', type: 'dessert', description: 'A cake dusted with actual stardust. Sparkles when you eat it. So do you.', buff: 'Levitate at will for 1 hour (10ft max altitude). +1 to all spell save DCs.', buffDuration: '1 hour', sideEffect: 'You sparkle. Literally. Bright light 5ft, dim light 10ft. Not optional.', preparationDC: 16, ingredients: 'Stardust Crystal (200gp, ground), angel food cake base, cloud sugar.', value: 250 },
  { name: 'Shadow Espresso', type: 'drink', description: 'Coffee brewed from beans grown in the Shadowfell. Black doesn\'t begin to describe the color.', buff: 'Cannot be surprised for 8 hours. +2 to Initiative. No need for sleep tonight.', buffDuration: '8 hours', sideEffect: 'Jittery. Disadvantage on Stealth (you vibrate slightly). After 8 hours: crash hard (1 exhaustion).', preparationDC: 13, ingredients: 'Shadowfell coffee beans (20gp), boiled shadow water, a crushed nightmare.', value: 35 },
];

export function getRandomFood(): EnchantedFoodItem {
  return FOODS[Math.floor(Math.random() * FOODS.length)];
}

export function getFoodsByType(type: FoodType): EnchantedFoodItem[] {
  return FOODS.filter((f) => f.type === type);
}

export function getFoodsWithoutSideEffects(): EnchantedFoodItem[] {
  return FOODS.filter((f) => f.sideEffect === null);
}

export function getAllFoodTypes(): FoodType[] {
  return [...new Set(FOODS.map((f) => f.type))];
}

export function formatFood(food: EnchantedFoodItem): string {
  const icon = { meal: '🍲', drink: '🍷', snack: '🍞', dessert: '🍰', potion_food: '🧪' }[food.type];
  const lines = [`${icon} **${food.name}** *(${food.type}, ${food.value}gp)*`];
  lines.push(`  *${food.description}*`);
  lines.push(`  ✅ Buff: ${food.buff} (${food.buffDuration})`);
  if (food.sideEffect) lines.push(`  ⚠️ Side effect: ${food.sideEffect}`);
  lines.push(`  🔨 Prep DC: ${food.preparationDC} | Ingredients: ${food.ingredients}`);
  return lines.join('\n');
}

export { FOODS as ENCHANTED_FOODS };
