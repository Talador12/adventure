// Weather-based terrain modifier — how weather changes combat terrain bonuses.

export type WeatherCondition = 'clear' | 'rain' | 'snow' | 'fog' | 'wind' | 'heat' | 'storm';
export type TerrainType = 'open' | 'forest' | 'hills' | 'swamp' | 'urban' | 'cave' | 'mountain';

export interface WeatherTerrainEffect {
  weather: WeatherCondition;
  terrain: TerrainType;
  movementMod: number; // speed modifier in feet (negative = slower)
  coverMod: number; // AC bonus/penalty
  visibilityMod: number; // Perception modifier
  stealthMod: number;
  specialEffect: string;
}

const EFFECTS: WeatherTerrainEffect[] = [
  { weather: 'rain', terrain: 'open', movementMod: -5, coverMod: 0, visibilityMod: -2, stealthMod: 2, specialEffect: 'Ranged attacks beyond 60ft have disadvantage. Fire damage -1d4.' },
  { weather: 'rain', terrain: 'forest', movementMod: -10, coverMod: 0, visibilityMod: -3, stealthMod: 3, specialEffect: 'Difficult terrain everywhere. Tracking DC +5 (rain washes tracks).' },
  { weather: 'rain', terrain: 'swamp', movementMod: -15, coverMod: 0, visibilityMod: -2, stealthMod: 1, specialEffect: 'Waist-deep in some areas. STR DC 12 to move through flooded sections.' },
  { weather: 'snow', terrain: 'open', movementMod: -10, coverMod: 0, visibilityMod: -4, stealthMod: -2, specialEffect: 'Tracks are obvious (-5 Survival DC). Cold damage +1d4.' },
  { weather: 'snow', terrain: 'mountain', movementMod: -15, coverMod: 0, visibilityMod: -5, stealthMod: -3, specialEffect: 'Avalanche risk: loud sounds have 10% chance of triggering avalanche.' },
  { weather: 'fog', terrain: 'open', movementMod: 0, coverMod: 0, visibilityMod: -5, stealthMod: 4, specialEffect: 'Heavily obscured beyond 30ft. Perfect for ambushes.' },
  { weather: 'fog', terrain: 'swamp', movementMod: -5, coverMod: 0, visibilityMod: -6, stealthMod: 5, specialEffect: 'Navigation DC 15 or lost. Creature sounds echo deceptively.' },
  { weather: 'wind', terrain: 'open', movementMod: -5, coverMod: 0, visibilityMod: 0, stealthMod: 2, specialEffect: 'Ranged attacks: -2 beyond 30ft. Flying creatures: STR DC 12 to hover.' },
  { weather: 'wind', terrain: 'mountain', movementMod: -10, coverMod: 0, visibilityMod: -1, stealthMod: 3, specialEffect: 'Pushed 5ft downwind each round unless braced. Climbing DC +3.' },
  { weather: 'heat', terrain: 'open', movementMod: 0, coverMod: 0, visibilityMod: -1, stealthMod: 0, specialEffect: 'CON DC 10 each hour or gain exhaustion. Heavy armor: DC 12.' },
  { weather: 'heat', terrain: 'urban', movementMod: 0, coverMod: 0, visibilityMod: 0, stealthMod: 0, specialEffect: 'Citizens are irritable (-2 to Persuasion). Shade provides advantage on CON saves.' },
  { weather: 'storm', terrain: 'open', movementMod: -10, coverMod: 0, visibilityMod: -4, stealthMod: 4, specialEffect: 'Lightning: 5% per round of 3d6 lightning to tallest creature. Thunder masks all sound.' },
  { weather: 'storm', terrain: 'forest', movementMod: -10, coverMod: 1, visibilityMod: -3, stealthMod: 3, specialEffect: 'Falling branches: DEX DC 11 or 1d6 bludgeoning per hour. Trees provide improved cover.' },
  { weather: 'clear', terrain: 'open', movementMod: 0, coverMod: 0, visibilityMod: 0, stealthMod: -2, specialEffect: 'Full visibility. No environmental modifiers. Enemies can see you from far away.' },
  { weather: 'clear', terrain: 'forest', movementMod: 0, coverMod: 1, visibilityMod: 0, stealthMod: 2, specialEffect: 'Standard forest benefits. Half cover from trees. Good conditions.' },
];

export function getWeatherTerrainEffect(weather: WeatherCondition, terrain: TerrainType): WeatherTerrainEffect | undefined {
  return EFFECTS.find((e) => e.weather === weather && e.terrain === terrain);
}

export function getEffectsForWeather(weather: WeatherCondition): WeatherTerrainEffect[] {
  return EFFECTS.filter((e) => e.weather === weather);
}

export function getEffectsForTerrain(terrain: TerrainType): WeatherTerrainEffect[] {
  return EFFECTS.filter((e) => e.terrain === terrain);
}

export function getWorstVisibility(): WeatherTerrainEffect {
  return EFFECTS.reduce((worst, e) => (e.visibilityMod < worst.visibilityMod ? e : worst));
}

export function getBestStealth(): WeatherTerrainEffect {
  return EFFECTS.reduce((best, e) => (e.stealthMod > best.stealthMod ? e : best));
}

export function getAllWeatherConditions(): WeatherCondition[] {
  return [...new Set(EFFECTS.map((e) => e.weather))];
}

export function getAllTerrainTypes(): TerrainType[] {
  return [...new Set(EFFECTS.map((e) => e.terrain))];
}

export function formatWeatherTerrain(effect: WeatherTerrainEffect): string {
  const lines = [`🌤️ **${effect.weather} + ${effect.terrain}**`];
  lines.push(`  Speed: ${effect.movementMod >= 0 ? '+' : ''}${effect.movementMod}ft | Cover: ${effect.coverMod >= 0 ? '+' : ''}${effect.coverMod} AC | Visibility: ${effect.visibilityMod >= 0 ? '+' : ''}${effect.visibilityMod} | Stealth: ${effect.stealthMod >= 0 ? '+' : ''}${effect.stealthMod}`);
  lines.push(`  ⚡ ${effect.specialEffect}`);
  return lines.join('\n');
}

export { EFFECTS as WEATHER_TERRAIN_EFFECTS };
