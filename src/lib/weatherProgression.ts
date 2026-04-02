// Weather progression — weather changes naturally over time.
// DM can set a forecast, or let it evolve randomly.

export type WeatherState = 'none' | 'rain' | 'fog' | 'snow' | 'sandstorm';

export interface WeatherForecast {
  current: WeatherState;
  next: WeatherState;
  hoursUntilChange: number;
}

const WEATHER_TRANSITIONS: Record<WeatherState, { options: WeatherState[]; weights: number[] }> = {
  none: { options: ['none', 'rain', 'fog'], weights: [0.6, 0.25, 0.15] },
  rain: { options: ['rain', 'none', 'fog'], weights: [0.4, 0.4, 0.2] },
  fog: { options: ['fog', 'none', 'rain'], weights: [0.3, 0.5, 0.2] },
  snow: { options: ['snow', 'none', 'fog'], weights: [0.4, 0.4, 0.2] },
  sandstorm: { options: ['sandstorm', 'none'], weights: [0.3, 0.7] },
};

function weightedRandom<T>(options: T[], weights: number[]): T {
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < options.length; i++) {
    r -= weights[i];
    if (r <= 0) return options[i];
  }
  return options[options.length - 1];
}

export function advanceWeather(current: WeatherState): WeatherForecast {
  const trans = WEATHER_TRANSITIONS[current] || WEATHER_TRANSITIONS.none;
  const next = weightedRandom(trans.options, trans.weights);
  const hoursUntilChange = 2 + Math.floor(Math.random() * 10); // 2-12 hours
  return { current, next, hoursUntilChange };
}

export function getWeatherDescription(weather: WeatherState, forecast: WeatherForecast): string {
  const descs: Record<WeatherState, string> = {
    none: 'Clear skies stretch overhead.',
    rain: 'Rain falls steadily, drumming on armor and soaking the ground.',
    fog: 'A thick fog rolls in, reducing visibility to mere feet.',
    snow: 'Snow drifts down silently, blanketing everything in white.',
    sandstorm: 'Stinging sand whips through the air, scouring exposed skin.',
  };
  const current = descs[weather] || 'The weather is unremarkable.';
  const nextDesc = forecast.next !== weather ? ` The ${forecast.next === 'none' ? 'weather looks like it will clear' : forecast.next + ' appears to be moving in'} in about ${forecast.hoursUntilChange} hours.` : '';
  return current + nextDesc;
}
