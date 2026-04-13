// Expedition supply management — tracking supplies, consumption, foraging, and equipment degradation for overland travel.

export type SupplyCategory = 'food' | 'water' | 'medical' | 'tools' | 'shelter' | 'light';
export type BiomeType = 'forest' | 'desert' | 'arctic' | 'mountain' | 'swamp' | 'plains' | 'underdark';

export interface SupplyItem {
  name: string;
  category: SupplyCategory;
  weight: number; // lbs
  servings: number; // how many person-days it lasts
  costGp: number;
  spoilDays: number; // days before it goes bad, 0 = never
  description: string;
}

export interface ForageResult {
  biome: BiomeType;
  dcSurvival: number;
  successYield: string;
  failureResult: string;
  dangerOnNat1: string;
}

export interface ExpeditionLoadout {
  name: string;
  description: string;
  partySize: number;
  durationDays: number;
  items: { item: SupplyItem; quantity: number }[];
  totalWeight: number;
  totalCost: number;
  warnings: string[];
}

const SUPPLY_ITEMS: SupplyItem[] = [
  { name: 'Trail Rations', category: 'food', weight: 2, servings: 1, costGp: 0.5, spoilDays: 30, description: 'Dried meat, hardtack, and nuts. Edible. Barely.' },
  { name: 'Preserved Feast', category: 'food', weight: 5, servings: 4, costGp: 5, spoilDays: 14, description: 'Salted meats, cheese wheel, dried fruit. Actual morale boost.' },
  { name: 'Waterskin (full)', category: 'water', weight: 5, servings: 1, costGp: 0.2, spoilDays: 3, description: 'One day of water for one person. Refill at streams.' },
  { name: 'Water Barrel', category: 'water', weight: 40, servings: 8, costGp: 2, spoilDays: 7, description: 'Requires a cart. 8 person-days of water.' },
  { name: 'Healer\'s Kit', category: 'medical', weight: 3, servings: 10, costGp: 5, spoilDays: 0, description: '10 uses of bandages, splints, and salves. Stabilize without a Medicine check.' },
  { name: 'Antitoxin Vial', category: 'medical', weight: 0.5, servings: 1, costGp: 50, spoilDays: 0, description: 'Advantage on saves vs. poison for 1 hour. Pack extra for swamps.' },
  { name: 'Climber\'s Kit', category: 'tools', weight: 12, servings: 0, costGp: 25, spoilDays: 0, description: 'Pitons, boot tips, gloves, harness. Prevents falling while climbing.' },
  { name: 'Tinderbox', category: 'tools', weight: 1, servings: 0, costGp: 0.5, spoilDays: 0, description: 'Start a fire in 1 minute. Useless if everything is wet.' },
  { name: 'Tent (2-person)', category: 'shelter', weight: 20, servings: 0, costGp: 2, spoilDays: 0, description: 'Keeps rain off. Does not keep bears out.' },
  { name: 'Cold Weather Gear', category: 'shelter', weight: 8, servings: 0, costGp: 10, spoilDays: 0, description: 'Furs, insulated boots, hand wraps. Required for arctic travel or take exhaustion.' },
  { name: 'Torches (10-pack)', category: 'light', weight: 10, servings: 10, costGp: 0.1, spoilDays: 0, description: 'Each burns for 1 hour. 20ft bright, 20ft dim. Attracts attention.' },
  { name: 'Lantern Oil (flask)', category: 'light', weight: 1, servings: 6, costGp: 0.1, spoilDays: 0, description: '6 hours of lantern light. Also flammable as a weapon.' },
];

const FORAGE_TABLE: ForageResult[] = [
  { biome: 'forest', dcSurvival: 10, successYield: '1d4 servings of berries, roots, and small game', failureResult: 'Nothing edible found. Wasted 2 hours.', dangerOnNat1: 'Ate a lookalike mushroom. DC 13 Con save or poisoned for 8 hours.' },
  { biome: 'desert', dcSurvival: 18, successYield: '1 serving of cactus water and insect protein', failureResult: 'Nothing. Lose 1 extra water serving from the search effort.', dangerOnNat1: 'Disturbed a sand snake nest. 2d4 poisonous snakes attack.' },
  { biome: 'arctic', dcSurvival: 15, successYield: '1d2 servings of lichen, ice fishing, or snow hare', failureResult: 'Nothing. 1 level of exhaustion from cold exposure during the search.', dangerOnNat1: 'Fell through thin ice. DC 14 Dex save or submerged in freezing water.' },
  { biome: 'mountain', dcSurvival: 13, successYield: '1d3 servings of mountain goat, alpine herbs, or bird eggs', failureResult: 'Nothing. Altitude headache - disadvantage on Perception for 4 hours.', dangerOnNat1: 'Triggered a rockslide. DC 15 Dex save or 3d6 bludgeoning.' },
  { biome: 'swamp', dcSurvival: 12, successYield: '1d4 servings of frogs, cattail roots, and swamp berries', failureResult: 'Found food but it smells terrible. DC 10 Con to eat it.', dangerOnNat1: 'Stepped in quicksand. DC 14 Str to escape. Allies can help.' },
  { biome: 'plains', dcSurvival: 10, successYield: '1d6 servings of rabbit, wild grain, or edible flowers', failureResult: 'Nothing but grass. You could eat the grass. You should not eat the grass.', dangerOnNat1: 'Stumbled into a predator\'s territory. 1 lion/wolf/bear encounter.' },
  { biome: 'underdark', dcSurvival: 16, successYield: '1d2 servings of cave fish, edible fungus, or fire beetle glands', failureResult: 'Found glowing mushrooms. They glow because they are radioactive. Do not eat.', dangerOnNat1: 'Harvested a shrieker by mistake. Every creature within 300ft knows your position.' },
];

export function getSupplyByCategory(category: SupplyCategory): SupplyItem[] {
  return SUPPLY_ITEMS.filter((s) => s.category === category);
}

export function getForageInfo(biome: BiomeType): ForageResult | undefined {
  return FORAGE_TABLE.find((f) => f.biome === biome);
}

export function getAllBiomes(): BiomeType[] {
  return FORAGE_TABLE.map((f) => f.biome);
}

export function getAllCategories(): SupplyCategory[] {
  return [...new Set(SUPPLY_ITEMS.map((s) => s.category))];
}

export function buildExpeditionLoadout(partySize: number, days: number): ExpeditionLoadout {
  const items: { item: SupplyItem; quantity: number }[] = [];
  const rations = SUPPLY_ITEMS.find((s) => s.name === 'Trail Rations')!;
  const water = SUPPLY_ITEMS.find((s) => s.name === 'Waterskin (full)')!;
  const healerKit = SUPPLY_ITEMS.find((s) => s.name === 'Healer\'s Kit')!;
  const tent = SUPPLY_ITEMS.find((s) => s.name === 'Tent (2-person)')!;
  const torches = SUPPLY_ITEMS.find((s) => s.name === 'Torches (10-pack)')!;
  const tinderbox = SUPPLY_ITEMS.find((s) => s.name === 'Tinderbox')!;

  const rationQty = partySize * days;
  const waterQty = partySize * days;
  const tentQty = Math.ceil(partySize / 2);
  const torchPacks = Math.ceil(days / 5);

  items.push({ item: rations, quantity: rationQty });
  items.push({ item: water, quantity: waterQty });
  items.push({ item: healerKit, quantity: Math.max(1, Math.ceil(partySize / 3)) });
  items.push({ item: tent, quantity: tentQty });
  items.push({ item: torches, quantity: torchPacks });
  items.push({ item: tinderbox, quantity: 1 });

  const totalWeight = items.reduce((sum, e) => sum + e.item.weight * e.quantity, 0);
  const totalCost = items.reduce((sum, e) => sum + e.item.costGp * e.quantity, 0);

  const warnings: string[] = [];
  if (totalWeight / partySize > 50) warnings.push('Over 50 lbs per person - consider a pack animal or cart.');
  if (days > 7) warnings.push('Rations spoil after 30 days. Water after 3. Plan refill stops.');
  if (days > 14) warnings.push('Extended expedition. Budget for foraging to supplement supplies.');

  return {
    name: `${days}-day expedition for ${partySize}`,
    description: `Standard loadout: rations, water, shelter, medical, and light for ${partySize} adventurers over ${days} days.`,
    partySize,
    durationDays: days,
    items,
    totalWeight,
    totalCost,
    warnings,
  };
}

export function formatLoadout(loadout: ExpeditionLoadout): string {
  const lines = [`🎒 **${loadout.name}**`];
  lines.push(`  ${loadout.description}`);
  lines.push(`  Total weight: ${loadout.totalWeight} lbs (${Math.round(loadout.totalWeight / loadout.partySize)} lbs/person)`);
  lines.push(`  Total cost: ${loadout.totalCost.toFixed(1)} gp`);
  lines.push('  **Items:**');
  for (const e of loadout.items) {
    lines.push(`    - ${e.item.name} x${e.quantity} (${e.item.weight * e.quantity} lbs, ${(e.item.costGp * e.quantity).toFixed(1)} gp)`);
  }
  if (loadout.warnings.length > 0) {
    lines.push('  **Warnings:**');
    for (const w of loadout.warnings) {
      lines.push(`    ⚠️ ${w}`);
    }
  }
  return lines.join('\n');
}

export function formatForage(result: ForageResult): string {
  const lines = [`🌿 **Foraging: ${result.biome}** (DC ${result.dcSurvival} Survival)`];
  lines.push(`  Success: ${result.successYield}`);
  lines.push(`  Failure: ${result.failureResult}`);
  lines.push(`  Natural 1: ${result.dangerOnNat1}`);
  return lines.join('\n');
}

export { SUPPLY_ITEMS, FORAGE_TABLE };
