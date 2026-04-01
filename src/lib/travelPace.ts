// Travel pace calculator — D&D 5e overland travel rules.
// Pace affects distance, stealth, and perception.

export type TravelPace = 'slow' | 'normal' | 'fast';

export interface TravelInfo {
  pace: TravelPace;
  milesPerHour: number;
  milesPerDay: number; // 8 hours of travel
  effect: string;
  stealthPossible: boolean;
  perceptionPenalty: number;
}

export const TRAVEL_PACES: Record<TravelPace, TravelInfo> = {
  slow: { pace: 'slow', milesPerHour: 2, milesPerDay: 18, effect: 'Can use Stealth', stealthPossible: true, perceptionPenalty: 0 },
  normal: { pace: 'normal', milesPerHour: 3, milesPerDay: 24, effect: 'Normal travel', stealthPossible: false, perceptionPenalty: 0 },
  fast: { pace: 'fast', milesPerHour: 4, milesPerDay: 30, effect: '-5 passive Perception', stealthPossible: false, perceptionPenalty: -5 },
};

export function calculateTravelTime(distanceMiles: number, pace: TravelPace): { hours: number; days: number; forcedMarchHours: number } {
  const info = TRAVEL_PACES[pace];
  const hours = distanceMiles / info.milesPerHour;
  const days = Math.floor(hours / 8);
  const remainingHours = hours % 8;
  // Forced march: after 8 hours, CON save DC 10 + extra hours or gain exhaustion
  const forcedMarchHours = Math.max(0, remainingHours);
  return { hours, days, forcedMarchHours };
}

export function partyTravelSpeed(characterSpeeds: number[]): number {
  // Party moves at the speed of the slowest member (in cells, convert to ft)
  if (characterSpeeds.length === 0) return 30;
  return Math.min(...characterSpeeds) * 5; // cells to feet
}
