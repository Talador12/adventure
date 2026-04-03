// Travel speed calculator — compute travel time by terrain, pace, and encumbrance.

export type TravelPace = 'fast' | 'normal' | 'slow';

export interface TravelConfig {
  pace: TravelPace;
  milesPerHour: number;
  milesPerDay: number;
  effect: string;
}

export const TRAVEL_PACES: TravelConfig[] = [
  { pace: 'fast', milesPerHour: 4, milesPerDay: 30, effect: '-5 passive Perception' },
  { pace: 'normal', milesPerHour: 3, milesPerDay: 24, effect: 'No modifier' },
  { pace: 'slow', milesPerHour: 2, milesPerDay: 18, effect: 'Able to use Stealth' },
];

export type TerrainDifficultyTravel = 'road' | 'open' | 'forest' | 'hills' | 'mountains' | 'swamp' | 'desert';

const TERRAIN_MULTIPLIERS: Record<TerrainDifficultyTravel, number> = {
  road: 1, open: 1, forest: 0.5, hills: 0.5, mountains: 0.5, swamp: 0.5, desert: 0.5,
};

export function calculateTravelTime(
  distanceMiles: number,
  pace: TravelPace,
  terrain: TerrainDifficultyTravel,
  isMounted: boolean = false,
  isEncumbered: boolean = false,
): { hours: number; days: number; milesPerHour: number; effectiveSpeed: number; description: string } {
  const paceConfig = TRAVEL_PACES.find((p) => p.pace === pace) || TRAVEL_PACES[1];
  let speed = paceConfig.milesPerHour;

  // Terrain modifier
  const terrainMult = TERRAIN_MULTIPLIERS[terrain];
  speed *= terrainMult;

  // Mount bonus
  if (isMounted) speed = Math.min(speed * 1.5, 6); // mounted caps at 6mph

  // Encumbrance penalty
  if (isEncumbered) speed *= 0.66;

  const hours = speed > 0 ? distanceMiles / speed : Infinity;
  const days = Math.ceil(hours / 8); // 8 hours of travel per day

  return {
    hours: Math.round(hours * 10) / 10, days,
    milesPerHour: Math.round(speed * 10) / 10,
    effectiveSpeed: speed,
    description: `${distanceMiles} miles at ${pace} pace over ${terrain}: ~${Math.round(hours)} hours (${days} day${days > 1 ? 's' : ''}) at ${Math.round(speed * 10) / 10} mph. ${paceConfig.effect}.`,
  };
}

export function formatTravelCalculation(distance: number, pace: TravelPace, terrain: TerrainDifficultyTravel, isMounted: boolean, isEncumbered: boolean): string {
  const result = calculateTravelTime(distance, pace, terrain, isMounted, isEncumbered);
  const lines = [`🗺️ **Travel Calculator:**`];
  lines.push(result.description);
  if (isMounted) lines.push('🐎 Mounted bonus applied.');
  if (isEncumbered) lines.push('⚖️ Encumbrance penalty applied.');
  return lines.join('\n');
}

export function formatTravelPaces(): string {
  const lines = ['🗺️ **Travel Paces:**'];
  for (const p of TRAVEL_PACES) lines.push(`• **${p.pace}**: ${p.milesPerHour} mph / ${p.milesPerDay} mi/day — ${p.effect}`);
  lines.push('\n*Difficult terrain halves speed. Mounts ×1.5 (cap 6mph). Encumbered ×0.66.*');
  return lines.join('\n');
}
