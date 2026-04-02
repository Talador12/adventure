// Random encounter frequency tuner — DM sets encounter chance by terrain and time.
// Roll on travel to determine if a random encounter occurs.

export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'evening' | 'night' | 'midnight';
export type TerrainDanger = 'safe' | 'low' | 'moderate' | 'dangerous' | 'deadly';

export interface EncounterFrequencyConfig {
  terrainDanger: TerrainDanger;
  baseChance: number; // 0-100 percent
  timeModifiers: Record<TimeOfDay, number>; // additive percentage
  travelModifier: number; // bonus for traveling (vs resting)
}

const BASE_CHANCES: Record<TerrainDanger, number> = {
  safe: 5,
  low: 15,
  moderate: 25,
  dangerous: 40,
  deadly: 60,
};

const TIME_MODIFIERS: Record<TimeOfDay, number> = {
  dawn: -5,
  morning: -10,
  afternoon: 0,
  dusk: 5,
  evening: 10,
  night: 15,
  midnight: 20,
};

export function createFrequencyConfig(danger: TerrainDanger): EncounterFrequencyConfig {
  return {
    terrainDanger: danger,
    baseChance: BASE_CHANCES[danger],
    timeModifiers: { ...TIME_MODIFIERS },
    travelModifier: 10,
  };
}

export function rollEncounterCheck(config: EncounterFrequencyConfig, timeOfDay: TimeOfDay, isTraveling: boolean): {
  encounterOccurs: boolean;
  roll: number;
  threshold: number;
  breakdown: string;
} {
  const base = config.baseChance;
  const timeMod = config.timeModifiers[timeOfDay];
  const travelMod = isTraveling ? config.travelModifier : 0;
  const threshold = Math.max(0, Math.min(100, base + timeMod + travelMod));
  const roll = Math.floor(Math.random() * 100) + 1;

  return {
    encounterOccurs: roll <= threshold,
    roll,
    threshold,
    breakdown: `Base: ${base}% + Time (${timeOfDay}): ${timeMod >= 0 ? '+' : ''}${timeMod}%${isTraveling ? ` + Travel: +${travelMod}%` : ''} = ${threshold}% (rolled ${roll})`,
  };
}

export function getTimeOfDayFromHour(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 19) return 'dusk';
  if (hour >= 19 && hour < 22) return 'evening';
  if (hour >= 22 || hour < 1) return 'night';
  return 'midnight';
}

export function formatEncounterCheck(result: ReturnType<typeof rollEncounterCheck>): string {
  const icon = result.encounterOccurs ? '⚔️' : '✅';
  return `${icon} **Encounter Check:** ${result.encounterOccurs ? 'ENCOUNTER!' : 'All clear.'}\n${result.breakdown}`;
}
