// 5-day weather forecast — plan travel around weather patterns.
import { generateDailyWeather, formatDailyWeather, getSeasonFromMonth, type Season } from '../lib/randomWeatherGen';
export interface FiveDayForecast { season: Season; days: { day: number; weather: ReturnType<typeof generateDailyWeather> }[]; }
export function generateForecast(startDay: number, month: number): FiveDayForecast {
  const season = getSeasonFromMonth(month);
  const days = Array.from({ length: 5 }, (_, i) => ({ day: startDay + i, weather: generateDailyWeather(season) }));
  return { season, days };
}
export function formatForecast(forecast: FiveDayForecast): string {
  const lines = [`🌤️ **5-Day Forecast** (${forecast.season}):`];
  for (const d of forecast.days) { lines.push(`Day ${d.day}: ${d.weather.temperature} (${d.weather.tempValue}°F), ${d.weather.precipitation}, ${d.weather.wind}${d.weather.specialEvent ? ` ⚡${d.weather.specialEvent}` : ''}`); }
  return lines.join('\n');
}
