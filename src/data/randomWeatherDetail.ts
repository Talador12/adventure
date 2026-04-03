// Random weather micro-detail — atmospheric one-liners for current weather.
export const WEATHER_DETAILS: Record<string, string[]> = {
  none: ['The air is still and warm.', 'A gentle breeze carries the scent of wildflowers.', 'The sky is a perfect, endless blue.', 'Clouds drift lazily, casting moving shadows on the ground.'],
  rain: ['Puddles form in every rut and footprint.', 'The rain drums steadily on your hood.', 'Earthworms surface on the muddy path.', 'The world smells of wet stone and fresh earth.'],
  fog: ['Shapes loom and vanish in the mist.', 'Sound travels strangely — voices seem both near and far.', 'Moisture beads on every surface.', 'You can barely see 30 feet ahead.'],
  snow: ['Your breath hangs in the air like small ghosts.', 'Snow muffles all sound. The world is hushed.', 'Ice crystals catch the light like scattered diamonds.', 'Every step crunches. There\'s no way to move quietly.'],
  sandstorm: ['Sand stings every inch of exposed skin.', 'Visibility drops to arm\'s length.', 'The wind screams like something alive.', 'Grit works its way into everything.'],
};
export function getWeatherDetail(weather: string): string { const pool = WEATHER_DETAILS[weather] || WEATHER_DETAILS['none']; return pool[Math.floor(Math.random() * pool.length)]; }
export function formatWeatherDetail(weather: string): string { return `🌤️ *${getWeatherDetail(weather)}*`; }
