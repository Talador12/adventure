// Crafting specialization tree — upgrade paths for crafted items with mastery bonuses.

export type CraftingDiscipline = 'blacksmithing' | 'alchemy' | 'enchanting' | 'leatherworking' | 'woodcarving' | 'jewelcrafting';
export type MasteryTier = 'novice' | 'apprentice' | 'journeyman' | 'expert' | 'master';

export interface CraftingSpecialization {
  discipline: CraftingDiscipline;
  tier: MasteryTier;
  xp: number;
  recipes: CraftingRecipe[];
}

export interface CraftingRecipe {
  name: string;
  tier: MasteryTier;
  materials: { name: string; quantity: number; cost: number }[];
  dc: number;
  time: string; // crafting time
  result: string;
  bonus: string; // what mastery adds
}

const TIER_XP: Record<MasteryTier, number> = {
  novice: 0,
  apprentice: 100,
  journeyman: 300,
  expert: 600,
  master: 1000,
};

const TIER_BONUS: Record<MasteryTier, { dcReduction: number; qualityBonus: string; speedMultiplier: number }> = {
  novice: { dcReduction: 0, qualityBonus: 'No bonus.', speedMultiplier: 1.0 },
  apprentice: { dcReduction: 1, qualityBonus: '+1 to item durability.', speedMultiplier: 0.9 },
  journeyman: { dcReduction: 2, qualityBonus: '+1 to item effect. Can add minor enchantment.', speedMultiplier: 0.75 },
  expert: { dcReduction: 3, qualityBonus: '+2 to item effect. Can add moderate enchantment.', speedMultiplier: 0.6 },
  master: { dcReduction: 5, qualityBonus: '+3 to item effect. Can create legendary-quality items.', speedMultiplier: 0.5 },
};

const RECIPES: Record<CraftingDiscipline, CraftingRecipe[]> = {
  blacksmithing: [
    { name: 'Iron Longsword', tier: 'novice', materials: [{ name: 'Iron Ingot', quantity: 2, cost: 10 }], dc: 12, time: '1 day', result: 'Longsword (1d8 slashing)', bonus: 'Master: +1 weapon.' },
    { name: 'Steel Shield', tier: 'apprentice', materials: [{ name: 'Steel Ingot', quantity: 3, cost: 25 }], dc: 14, time: '2 days', result: 'Shield (+2 AC)', bonus: 'Expert: +1 shield.' },
    { name: 'Mithral Chain', tier: 'expert', materials: [{ name: 'Mithral Ore', quantity: 5, cost: 200 }], dc: 18, time: '5 days', result: 'Mithral Chain Shirt (no stealth disadvantage)', bonus: 'Master: +1 armor.' },
  ],
  alchemy: [
    { name: 'Healing Potion', tier: 'novice', materials: [{ name: 'Healing Herbs', quantity: 3, cost: 5 }], dc: 10, time: '2 hours', result: 'Potion of Healing (2d4+2)', bonus: 'Master: Heals 4d4+4.' },
    { name: 'Antitoxin', tier: 'apprentice', materials: [{ name: 'Rare Mushroom', quantity: 2, cost: 15 }], dc: 13, time: '4 hours', result: 'Advantage on saves vs poison for 1 hour', bonus: 'Expert: Immunity for 1 hour.' },
    { name: 'Philosopher\'s Tincture', tier: 'master', materials: [{ name: 'Dragon Blood', quantity: 1, cost: 500 }, { name: 'Stardust', quantity: 2, cost: 250 }], dc: 20, time: '7 days', result: 'Resistance to one damage type for 24 hours', bonus: 'Master: Immunity for 1 hour.' },
  ],
  enchanting: [
    { name: 'Glow Rune', tier: 'novice', materials: [{ name: 'Arcane Dust', quantity: 1, cost: 10 }], dc: 12, time: '1 hour', result: 'Item sheds light as a candle', bonus: 'Journeyman: Light as a torch.' },
    { name: 'Sharpening Enchant', tier: 'journeyman', materials: [{ name: 'Arcane Crystal', quantity: 2, cost: 50 }], dc: 15, time: '1 day', result: '+1 to damage for 24 hours', bonus: 'Master: Permanent +1.' },
    { name: 'Spell Storing', tier: 'master', materials: [{ name: 'Arcane Crystal', quantity: 5, cost: 50 }, { name: 'Soul Gem', quantity: 1, cost: 300 }], dc: 20, time: '5 days', result: 'Store one spell up to 3rd level', bonus: 'Master: Up to 5th level.' },
  ],
  leatherworking: [
    { name: 'Hide Armor', tier: 'novice', materials: [{ name: 'Cured Hide', quantity: 3, cost: 5 }], dc: 11, time: '1 day', result: 'Hide Armor (AC 12 + DEX max 2)', bonus: 'Expert: +1 armor.' },
    { name: 'Studded Leather', tier: 'apprentice', materials: [{ name: 'Fine Leather', quantity: 4, cost: 15 }, { name: 'Iron Studs', quantity: 20, cost: 5 }], dc: 14, time: '2 days', result: 'Studded Leather (AC 12 + DEX)', bonus: 'Master: +1 armor.' },
  ],
  woodcarving: [
    { name: 'Shortbow', tier: 'novice', materials: [{ name: 'Yew Wood', quantity: 1, cost: 5 }], dc: 11, time: '1 day', result: 'Shortbow (1d6 piercing, 80/320)', bonus: 'Expert: +1 weapon.' },
    { name: 'Arcane Focus Staff', tier: 'journeyman', materials: [{ name: 'Ancient Oak', quantity: 1, cost: 30 }, { name: 'Arcane Crystal', quantity: 1, cost: 50 }], dc: 15, time: '3 days', result: 'Arcane focus (+1 spell attack)', bonus: 'Master: +2 spell attack.' },
  ],
  jewelcrafting: [
    { name: 'Silver Ring', tier: 'novice', materials: [{ name: 'Silver Bar', quantity: 1, cost: 10 }], dc: 12, time: '4 hours', result: 'Silver ring (50gp value)', bonus: 'Master: Can set gems for +effect.' },
    { name: 'Amulet of Protection', tier: 'expert', materials: [{ name: 'Gold Bar', quantity: 2, cost: 100 }, { name: 'Sapphire', quantity: 1, cost: 200 }], dc: 17, time: '3 days', result: '+1 AC amulet', bonus: 'Master: +2 AC amulet.' },
  ],
};

export function createSpecialization(discipline: CraftingDiscipline): CraftingSpecialization {
  return { discipline, tier: 'novice', xp: 0, recipes: RECIPES[discipline] || [] };
}

export function addCraftingXp(spec: CraftingSpecialization, xp: number): CraftingSpecialization {
  const newXp = spec.xp + xp;
  let newTier: MasteryTier = 'novice';
  for (const [tier, req] of Object.entries(TIER_XP).reverse() as [MasteryTier, number][]) {
    if (newXp >= req) { newTier = tier; break; }
  }
  return { ...spec, xp: newXp, tier: newTier };
}

export function getAvailableRecipes(spec: CraftingSpecialization): CraftingRecipe[] {
  const tierOrder: MasteryTier[] = ['novice', 'apprentice', 'journeyman', 'expert', 'master'];
  const maxIndex = tierOrder.indexOf(spec.tier);
  return spec.recipes.filter((r) => tierOrder.indexOf(r.tier) <= maxIndex);
}

export function getTierBonus(tier: MasteryTier) {
  return TIER_BONUS[tier];
}

export function getCraftingDC(recipe: CraftingRecipe, tier: MasteryTier): number {
  return Math.max(5, recipe.dc - TIER_BONUS[tier].dcReduction);
}

export function getAllDisciplines(): CraftingDiscipline[] {
  return Object.keys(RECIPES) as CraftingDiscipline[];
}

export function formatSpecialization(spec: CraftingSpecialization): string {
  const bonus = TIER_BONUS[spec.tier];
  const lines = [`🔨 **${spec.discipline}** — ${spec.tier.toUpperCase()} (${spec.xp} XP)`];
  lines.push(`  DC Reduction: -${bonus.dcReduction} | Speed: ×${bonus.speedMultiplier} | ${bonus.qualityBonus}`);
  const available = getAvailableRecipes(spec);
  lines.push(`  Available recipes: ${available.map((r) => r.name).join(', ')}`);
  return lines.join('\n');
}
