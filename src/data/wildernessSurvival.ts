// Wilderness survival tracker — hunger/thirst/exposure with resource management.

export type SurvivalBiome = 'temperate' | 'arctic' | 'desert' | 'jungle' | 'mountain' | 'swamp' | 'ocean';

export interface SurvivalState {
  hunger: number; // 0-10 (0 = full, 10 = starving)
  thirst: number; // 0-10 (0 = hydrated, 10 = dehydrated)
  exposure: number; // 0-10 (0 = comfortable, 10 = hypothermia/heatstroke)
  daysWithoutFood: number;
  daysWithoutWater: number;
  morale: number; // -5 to +5
}

export interface BiomeSurvivalProfile {
  biome: SurvivalBiome;
  waterAvailability: 'abundant' | 'moderate' | 'scarce' | 'none';
  foodAvailability: 'abundant' | 'moderate' | 'scarce' | 'none';
  exposureRisk: 'heat' | 'cold' | 'both' | 'none';
  foragedc: number;
  waterFindDC: number;
  shelterDC: number;
  dailyHazard: string;
}

export interface SurvivalEffect {
  level: string;
  threshold: number;
  effect: string;
}

const BIOME_PROFILES: BiomeSurvivalProfile[] = [
  { biome: 'temperate', waterAvailability: 'abundant', foodAvailability: 'moderate', exposureRisk: 'none', foragedc: 10, waterFindDC: 8, shelterDC: 10, dailyHazard: 'Chance of rain (50%) — extinguishes campfires.' },
  { biome: 'arctic', waterAvailability: 'moderate', foodAvailability: 'scarce', exposureRisk: 'cold', foragedc: 15, waterFindDC: 10, shelterDC: 14, dailyHazard: 'CON DC 12 each hour without shelter or face cold damage 1d4.' },
  { biome: 'desert', waterAvailability: 'scarce', foodAvailability: 'scarce', exposureRisk: 'heat', foragedc: 15, waterFindDC: 16, shelterDC: 12, dailyHazard: 'CON DC 12 each hour in midday sun or gain 1 exhaustion.' },
  { biome: 'jungle', waterAvailability: 'abundant', foodAvailability: 'abundant', exposureRisk: 'heat', foragedc: 10, waterFindDC: 8, shelterDC: 10, dailyHazard: 'Disease risk — CON DC 11 per day or contract a tropical illness.' },
  { biome: 'mountain', waterAvailability: 'moderate', foodAvailability: 'scarce', exposureRisk: 'cold', foragedc: 14, waterFindDC: 12, shelterDC: 13, dailyHazard: 'Altitude sickness above 10,000ft — CON DC 12 or disadvantage on all checks.' },
  { biome: 'swamp', waterAvailability: 'abundant', foodAvailability: 'moderate', exposureRisk: 'none', foragedc: 11, waterFindDC: 8, shelterDC: 13, dailyHazard: 'Parasites — CON DC 10 or lose 1 HP per hour (unnoticed until Perception DC 13).' },
  { biome: 'ocean', waterAvailability: 'none', foodAvailability: 'scarce', exposureRisk: 'both', foragedc: 16, waterFindDC: 20, shelterDC: 16, dailyHazard: 'Dehydration accelerated — thirst increases by 2 per day instead of 1.' },
];

const HUNGER_EFFECTS: SurvivalEffect[] = [
  { level: 'Satisfied', threshold: 0, effect: 'No penalties.' },
  { level: 'Peckish', threshold: 2, effect: 'No mechanical effect. Stomach growls during stealth.' },
  { level: 'Hungry', threshold: 4, effect: 'Disadvantage on Concentration checks.' },
  { level: 'Famished', threshold: 6, effect: '-1 to attack rolls and ability checks.' },
  { level: 'Starving', threshold: 8, effect: '1 level of exhaustion per day. Half speed.' },
  { level: 'Near Death', threshold: 10, effect: '2 levels of exhaustion per day. Cannot dash.' },
];

const THIRST_EFFECTS: SurvivalEffect[] = [
  { level: 'Hydrated', threshold: 0, effect: 'No penalties.' },
  { level: 'Thirsty', threshold: 2, effect: 'No mechanical effect. Dry mouth.' },
  { level: 'Parched', threshold: 4, effect: 'Disadvantage on CON saves.' },
  { level: 'Dehydrated', threshold: 6, effect: '-2 to all ability checks. Speed reduced by 10.' },
  { level: 'Critical', threshold: 8, effect: '1 level of exhaustion per 4 hours.' },
  { level: 'Dying', threshold: 10, effect: 'CON DC 15 each hour or drop to 0 HP.' },
];

export function createSurvivalState(): SurvivalState {
  return { hunger: 0, thirst: 0, exposure: 0, daysWithoutFood: 0, daysWithoutWater: 0, morale: 0 };
}

export function advanceDay(state: SurvivalState, ate: boolean, drank: boolean, sheltered: boolean, biome: SurvivalBiome): SurvivalState {
  const profile = getBiomeProfile(biome);
  let { hunger, thirst, exposure, daysWithoutFood, daysWithoutWater, morale } = state;
  if (ate) { hunger = Math.max(0, hunger - 2); daysWithoutFood = 0; } else { hunger = Math.min(10, hunger + 1); daysWithoutFood++; }
  if (drank) { thirst = Math.max(0, thirst - 2); daysWithoutWater = 0; } else { const increase = biome === 'ocean' ? 2 : 1; thirst = Math.min(10, thirst + increase); daysWithoutWater++; }
  if (sheltered) { exposure = Math.max(0, exposure - 1); } else if (profile && profile.exposureRisk !== 'none') { exposure = Math.min(10, exposure + 1); }
  morale = Math.max(-5, Math.min(5, morale + (ate && drank ? 1 : -1)));
  return { hunger, thirst, exposure, daysWithoutFood, daysWithoutWater, morale };
}

export function getBiomeProfile(biome: SurvivalBiome): BiomeSurvivalProfile | undefined {
  return BIOME_PROFILES.find((b) => b.biome === biome);
}

export function getHungerLevel(hunger: number): SurvivalEffect {
  for (let i = HUNGER_EFFECTS.length - 1; i >= 0; i--) { if (hunger >= HUNGER_EFFECTS[i].threshold) return HUNGER_EFFECTS[i]; }
  return HUNGER_EFFECTS[0];
}

export function getThirstLevel(thirst: number): SurvivalEffect {
  for (let i = THIRST_EFFECTS.length - 1; i >= 0; i--) { if (thirst >= THIRST_EFFECTS[i].threshold) return THIRST_EFFECTS[i]; }
  return THIRST_EFFECTS[0];
}

export function getAllSurvivalBiomes(): SurvivalBiome[] {
  return BIOME_PROFILES.map((b) => b.biome);
}

export function formatSurvivalState(state: SurvivalState): string {
  const h = getHungerLevel(state.hunger);
  const t = getThirstLevel(state.thirst);
  const lines = ['🏕️ **Survival Status:**'];
  lines.push(`  🍖 Hunger: ${h.level} (${state.hunger}/10) — ${h.effect}`);
  lines.push(`  💧 Thirst: ${t.level} (${state.thirst}/10) — ${t.effect}`);
  lines.push(`  🌡️ Exposure: ${state.exposure}/10`);
  lines.push(`  😊 Morale: ${state.morale >= 0 ? '+' : ''}${state.morale}`);
  return lines.join('\n');
}

export { BIOME_PROFILES, HUNGER_EFFECTS, THIRST_EFFECTS };
