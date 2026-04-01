// Weather combat effects — mechanical modifiers based on active weather.
// Applied during attack resolution and movement in CombatToolbar.

export type WeatherType = 'none' | 'rain' | 'fog' | 'snow' | 'sandstorm';

export interface WeatherCombatEffect {
  rangedDisadvantage: boolean;     // disadvantage on ranged attacks
  perceptionPenalty: number;       // penalty to passive perception
  movementPenalty: number;         // extra movement cost per cell (0 = none)
  visibilityRange: number;         // max visibility in cells (Infinity = normal)
  description: string;
}

export const WEATHER_COMBAT_EFFECTS: Record<WeatherType, WeatherCombatEffect> = {
  none: { rangedDisadvantage: false, perceptionPenalty: 0, movementPenalty: 0, visibilityRange: Infinity, description: '' },
  rain: { rangedDisadvantage: true, perceptionPenalty: -2, movementPenalty: 0, visibilityRange: 12, description: 'Heavy rain: disadvantage on ranged attacks, -2 Perception' },
  fog: { rangedDisadvantage: true, perceptionPenalty: -5, movementPenalty: 0, visibilityRange: 4, description: 'Dense fog: heavily obscured beyond 20ft, disadvantage on ranged' },
  snow: { rangedDisadvantage: false, perceptionPenalty: -2, movementPenalty: 1, visibilityRange: 8, description: 'Snow: difficult terrain (+5ft movement cost), -2 Perception' },
  sandstorm: { rangedDisadvantage: true, perceptionPenalty: -5, movementPenalty: 1, visibilityRange: 3, description: 'Sandstorm: heavily obscured, disadvantage on ranged, difficult terrain' },
};

export function getWeatherAttackMod(weather: WeatherType, isRanged: boolean): { disadvantage: boolean; note: string } {
  const effect = WEATHER_COMBAT_EFFECTS[weather];
  if (isRanged && effect.rangedDisadvantage) {
    return { disadvantage: true, note: `(${weather}: ranged disadvantage)` };
  }
  return { disadvantage: false, note: '' };
}
