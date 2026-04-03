// Alchemical ingredient foraging — biome-based reagent gathering with seasonal availability.

export type ForagingBiome = 'forest' | 'mountain' | 'swamp' | 'desert' | 'arctic' | 'coast' | 'underdark' | 'plains';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface AlchemicalIngredient {
  name: string;
  biomes: ForagingBiome[];
  seasons: Season[]; // when it can be found (empty = year-round)
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  forageDC: number;
  value: number; // gold per unit
  description: string;
  uses: string[];
}

export interface ForagingResult {
  ingredient: AlchemicalIngredient;
  quantity: number;
  quality: 'poor' | 'standard' | 'excellent';
}

const INGREDIENTS: AlchemicalIngredient[] = [
  { name: 'Moonpetal', biomes: ['forest', 'swamp'], seasons: ['spring', 'autumn'], rarity: 'uncommon', forageDC: 13, value: 15, description: 'A pale flower that only opens under moonlight. Petals glow faintly blue.', uses: ['Healing Potion ingredient', 'Dreamdust base', 'Sleep potion catalyst'] },
  { name: 'Firecap Mushroom', biomes: ['underdark', 'mountain'], seasons: [], rarity: 'uncommon', forageDC: 14, value: 20, description: 'An orange-red mushroom warm to the touch. Releases spores when disturbed.', uses: ['Alchemist\'s Fire fuel', 'Fire resistance potion', 'Warming salve'] },
  { name: 'Frostbloom', biomes: ['arctic', 'mountain'], seasons: ['winter'], rarity: 'rare', forageDC: 16, value: 50, description: 'A crystalline flower that grows in permafrost. Shatters if handled roughly.', uses: ['Potion of Cold Resistance', 'Frost weapon oil', 'Antidote for fire-based poisons'] },
  { name: 'Serpent Root', biomes: ['swamp', 'forest'], seasons: ['summer'], rarity: 'common', forageDC: 10, value: 5, description: 'A twisted root shaped like a coiled snake. Bitter taste, numbing properties.', uses: ['Antitoxin ingredient', 'Pain relief poultice', 'Poison base (concentrated)'] },
  { name: 'Starfall Moss', biomes: ['mountain', 'plains'], seasons: ['autumn'], rarity: 'rare', forageDC: 16, value: 40, description: 'Silvery moss found on high-altitude rocks after meteor showers.', uses: ['Potion of Flying ingredient', 'Divination focus', 'Arcane ink component'] },
  { name: 'Sandscale Lichen', biomes: ['desert'], seasons: ['summer', 'autumn'], rarity: 'common', forageDC: 11, value: 8, description: 'Tough, papery lichen that survives extreme heat. Tastes of minerals.', uses: ['Fire resistance salve', 'Water purification', 'Sunburn treatment'] },
  { name: 'Ghost Orchid', biomes: ['underdark', 'swamp'], seasons: [], rarity: 'rare', forageDC: 17, value: 75, description: 'A translucent flower that phases in and out of visibility. Must be harvested while visible.', uses: ['Invisibility potion', 'Ethereal oil', 'Potion of Gaseous Form'] },
  { name: 'Tidecrest Kelp', biomes: ['coast'], seasons: ['spring', 'summer'], rarity: 'common', forageDC: 10, value: 3, description: 'Long strands of deep green kelp. Rich in minerals and slightly magical.', uses: ['Water Breathing potion', 'Healing poultice (minor)', 'Nutrition supplement'] },
  { name: 'Embervine', biomes: ['desert', 'mountain'], seasons: ['summer'], rarity: 'uncommon', forageDC: 14, value: 25, description: 'A thorny vine with orange veins that glow like embers. Sap is caustic.', uses: ['Acid vial ingredient', 'Fire resistance potion catalyst', 'Weapon coating (1d4 fire)'] },
  { name: 'Wyrmwood Bark', biomes: ['forest'], seasons: ['autumn', 'winter'], rarity: 'uncommon', forageDC: 13, value: 18, description: 'Bark from ancient trees that grow near dragon lairs. Smells of sulfur.', uses: ['Dragon-related potions', 'Elemental resistance base', 'Wand crafting material'] },
  { name: 'Deathcap Nightshade', biomes: ['forest', 'swamp', 'underdark'], seasons: [], rarity: 'uncommon', forageDC: 14, value: 30, description: 'A pitch-black mushroom with a skull-like cap. Extremely toxic. Handle with gloves.', uses: ['Assassin\'s Blood poison', 'Midnight Tears ingredient', 'Necrotic damage coating'] },
  { name: 'Stardust Crystal', biomes: ['mountain', 'arctic'], seasons: ['winter'], rarity: 'legendary', forageDC: 20, value: 200, description: 'Tiny crystallized fragments of astral energy. Found in impossibly high places. Hums faintly.', uses: ['Potion of Invulnerability', 'Resurrection component', 'Legendary weapon enchantment'] },
];

export function getIngredientsByBiome(biome: ForagingBiome): AlchemicalIngredient[] {
  return INGREDIENTS.filter((i) => i.biomes.includes(biome));
}

export function getIngredientsBySeason(biome: ForagingBiome, season: Season): AlchemicalIngredient[] {
  return INGREDIENTS.filter((i) => i.biomes.includes(biome) && (i.seasons.length === 0 || i.seasons.includes(season)));
}

export function getIngredientsByRarity(rarity: AlchemicalIngredient['rarity']): AlchemicalIngredient[] {
  return INGREDIENTS.filter((i) => i.rarity === rarity);
}

export function forage(biome: ForagingBiome, season: Season, survivalModifier: number): ForagingResult | null {
  const available = getIngredientsBySeason(biome, season);
  if (available.length === 0) return null;
  const roll = Math.floor(Math.random() * 20) + 1 + survivalModifier;
  const found = available.filter((i) => roll >= i.forageDC);
  if (found.length === 0) return null;
  const ingredient = found[Math.floor(Math.random() * found.length)];
  const quality: ForagingResult['quality'] = roll >= ingredient.forageDC + 5 ? 'excellent' : roll >= ingredient.forageDC + 2 ? 'standard' : 'poor';
  const quantity = quality === 'excellent' ? 3 : quality === 'standard' ? 2 : 1;
  return { ingredient, quantity, quality };
}

export function getAllForagingBiomes(): ForagingBiome[] {
  return ['forest', 'mountain', 'swamp', 'desert', 'arctic', 'coast', 'underdark', 'plains'];
}

export function formatIngredient(i: AlchemicalIngredient): string {
  const rarIcon = { common: '⚪', uncommon: '🟢', rare: '🔵', legendary: '🟣' }[i.rarity];
  const lines = [`${rarIcon} **${i.name}** *(${i.rarity}, DC ${i.forageDC}, ${i.value}gp)*`];
  lines.push(`  *${i.description}*`);
  lines.push(`  Biomes: ${i.biomes.join(', ')} | Seasons: ${i.seasons.length > 0 ? i.seasons.join(', ') : 'year-round'}`);
  lines.push(`  Uses: ${i.uses.join(', ')}`);
  return lines.join('\n');
}

export function formatForagingResult(result: ForagingResult): string {
  const qIcon = { poor: '🟤', standard: '🟢', excellent: '⭐' }[result.quality];
  return `${qIcon} Found ${result.quantity}x **${result.ingredient.name}** (${result.quality}) — worth ${result.quantity * result.ingredient.value}gp`;
}

export { INGREDIENTS as ALCHEMICAL_INGREDIENTS };
