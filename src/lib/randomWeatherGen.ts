// Random weather generator — procedural daily weather with seasonal patterns.
// Temperature, precipitation, wind, and special events by season.

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface DailyWeather {
  temperature: string;
  tempValue: number; // Fahrenheit
  precipitation: string;
  wind: string;
  visibility: string;
  specialEvent: string | null;
  description: string;
}

const TEMP_RANGES: Record<Season, [number, number]> = {
  spring: [40, 70], summer: [65, 95], autumn: [35, 65], winter: [5, 40],
};

const PRECIPITATION: Record<Season, { type: string; chance: number }[]> = {
  spring: [{ type: 'Clear', chance: 0.4 }, { type: 'Light rain', chance: 0.3 }, { type: 'Heavy rain', chance: 0.15 }, { type: 'Thunderstorm', chance: 0.1 }, { type: 'Fog', chance: 0.05 }],
  summer: [{ type: 'Clear', chance: 0.5 }, { type: 'Partly cloudy', chance: 0.25 }, { type: 'Thunderstorm', chance: 0.15 }, { type: 'Heat haze', chance: 0.1 }],
  autumn: [{ type: 'Overcast', chance: 0.3 }, { type: 'Light rain', chance: 0.25 }, { type: 'Heavy rain', chance: 0.2 }, { type: 'Fog', chance: 0.15 }, { type: 'Clear', chance: 0.1 }],
  winter: [{ type: 'Overcast', chance: 0.25 }, { type: 'Light snow', chance: 0.25 }, { type: 'Heavy snow', chance: 0.2 }, { type: 'Blizzard', chance: 0.1 }, { type: 'Clear and cold', chance: 0.15 }, { type: 'Freezing rain', chance: 0.05 }],
};

const WINDS = ['Calm', 'Light breeze', 'Moderate wind', 'Strong wind', 'Gale'];
const WIND_CHANCES = [0.3, 0.3, 0.2, 0.15, 0.05];

const SPECIAL_EVENTS: Record<Season, { event: string; chance: number }[]> = {
  spring: [{ event: 'Rainbow after rain', chance: 0.1 }, { event: 'Pollen storm — CON DC 10 or sneezing', chance: 0.05 }],
  summer: [{ event: 'Heat wave — CON saves for exhaustion', chance: 0.08 }, { event: 'Meteor shower visible at night', chance: 0.05 }],
  autumn: [{ event: 'Harvest moon — lycanthropes more active', chance: 0.07 }, { event: 'Eerie silence — no birds or insects', chance: 0.05 }],
  winter: [{ event: 'Aurora borealis — advantage on Arcana checks', chance: 0.08 }, { event: 'Whiteout — visibility 10ft', chance: 0.05 }],
};

function weightedRandom<T extends { chance: number }>(options: T[]): T {
  let roll = Math.random();
  for (const opt of options) { roll -= opt.chance; if (roll <= 0) return opt; }
  return options[options.length - 1];
}

export function getSeasonFromMonth(month: number): Season {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

export function generateDailyWeather(season: Season): DailyWeather {
  const [minT, maxT] = TEMP_RANGES[season];
  const tempValue = Math.round(minT + Math.random() * (maxT - minT));
  const temperature = tempValue > 85 ? 'Scorching' : tempValue > 70 ? 'Warm' : tempValue > 55 ? 'Mild' : tempValue > 35 ? 'Cool' : tempValue > 15 ? 'Cold' : 'Freezing';

  const precip = weightedRandom(PRECIPITATION[season]);
  const windIdx = weightedRandom(WINDS.map((w, i) => ({ wind: w, chance: WIND_CHANCES[i] })));
  const wind = windIdx.wind;

  const visibility = precip.type.includes('Fog') || precip.type.includes('Blizzard') ? 'Poor (30ft)' : precip.type.includes('Heavy') ? 'Reduced (60ft)' : 'Good';

  let specialEvent: string | null = null;
  const events = SPECIAL_EVENTS[season];
  for (const e of events) { if (Math.random() < e.chance) { specialEvent = e.event; break; } }

  const description = `${temperature} (${tempValue}°F), ${precip.type.toLowerCase()}, ${wind.toLowerCase()} winds. Visibility: ${visibility.toLowerCase()}.`;

  return { temperature, tempValue, precipitation: precip.type, wind, visibility, specialEvent, description };
}

export function formatDailyWeather(weather: DailyWeather, season: Season): string {
  const seasonEmoji = season === 'spring' ? '🌸' : season === 'summer' ? '☀️' : season === 'autumn' ? '🍂' : '❄️';
  const lines = [`${seasonEmoji} **Daily Weather** (${season}):`];
  lines.push(`🌡️ ${weather.temperature} (${weather.tempValue}°F) | ${weather.precipitation} | 💨 ${weather.wind}`);
  lines.push(`👁️ Visibility: ${weather.visibility}`);
  if (weather.specialEvent) lines.push(`⚡ **Special:** ${weather.specialEvent}`);
  return lines.join('\n');
}
