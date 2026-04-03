// Weather encounter interaction — weather affects encounter types and difficulty.

export type WeatherType = 'clear' | 'rain' | 'fog' | 'snow' | 'sandstorm' | 'storm' | 'blizzard' | 'heat_wave';

export interface WeatherEncounterEffect {
  weather: WeatherType;
  encounterModifiers: EncounterModifier[];
  specialEncounters: string[];
  avoidedEncounters: string[];
  flavorText: string;
}

export interface EncounterModifier {
  type: 'difficulty' | 'surprise' | 'escape' | 'visibility' | 'damage';
  modifier: number; // + or - value
  description: string;
}

const WEATHER_EFFECTS: WeatherEncounterEffect[] = [
  {
    weather: 'clear',
    encounterModifiers: [
      { type: 'visibility', modifier: 0, description: 'Normal visibility — no modifiers.' },
    ],
    specialEncounters: ['Merchant caravan (they travel in good weather)', 'Aerial predator (clear skies = hunting weather)'],
    avoidedEncounters: [],
    flavorText: 'The sun beats down. Perfect traveling weather — and perfect ambush weather.',
  },
  {
    weather: 'rain',
    encounterModifiers: [
      { type: 'surprise', modifier: 2, description: '+2 to Stealth — rain masks sound.' },
      { type: 'visibility', modifier: -1, description: '-1 passive Perception for all creatures.' },
      { type: 'escape', modifier: 1, description: '+1 to escape — tracks wash away faster.' },
    ],
    specialEncounters: ['Mudslide hazard', 'Giant frogs emerge from swollen rivers', 'Lost traveler seeking shelter'],
    avoidedEncounters: ['Fire elementals', 'Desert creatures'],
    flavorText: 'Rain drums against armor and drowns out footsteps. Something could be 10 feet away and you wouldn\'t hear it.',
  },
  {
    weather: 'fog',
    encounterModifiers: [
      { type: 'surprise', modifier: 3, description: '+3 to Stealth — heavy concealment.' },
      { type: 'visibility', modifier: -3, description: '-3 passive Perception. Ranged attacks beyond 30ft have disadvantage.' },
      { type: 'difficulty', modifier: 1, description: '+1 effective difficulty — enemies use fog to their advantage.' },
    ],
    specialEncounters: ['Will-o-wisp ambush', 'Ghost or specter', 'Disoriented patrol (may attack first, ask questions later)'],
    avoidedEncounters: ['Aerial encounters', 'Long-range archers'],
    flavorText: 'The world vanishes beyond arm\'s reach. Every shadow could be a threat — or just a tree. Probably a tree. Hopefully.',
  },
  {
    weather: 'snow',
    encounterModifiers: [
      { type: 'visibility', modifier: -1, description: '-1 passive Perception from snow glare.' },
      { type: 'escape', modifier: -1, description: '-1 to escape — tracks in snow are obvious.' },
      { type: 'damage', modifier: 1, description: 'Cold damage +1 from cold-based creatures.' },
    ],
    specialEncounters: ['Winter wolves', 'Yeti', 'Frozen undead rising from the snow', 'Stranded villagers'],
    avoidedEncounters: ['Reptilian creatures', 'Desert monsters', 'Plant creatures'],
    flavorText: 'Snow crunches underfoot, announcing your position to anything listening. The cold itself is an enemy.',
  },
  {
    weather: 'sandstorm',
    encounterModifiers: [
      { type: 'visibility', modifier: -4, description: '-4 passive Perception. Ranged attacks beyond 15ft impossible.' },
      { type: 'difficulty', modifier: 2, description: '+2 effective difficulty — the storm itself is dangerous.' },
      { type: 'damage', modifier: 1, description: '1d4 slashing damage per round from sand exposure without cover.' },
    ],
    specialEncounters: ['Sand elemental', 'Buried temple revealed by shifting dunes', 'Giant scorpion ambush'],
    avoidedEncounters: ['Flying creatures', 'Any creature that relies on sight'],
    flavorText: 'A wall of sand swallows the horizon. Finding shelter isn\'t optional — it\'s survival.',
  },
  {
    weather: 'storm',
    encounterModifiers: [
      { type: 'surprise', modifier: 4, description: '+4 to Stealth — thunder covers all sound.' },
      { type: 'visibility', modifier: -2, description: '-2 passive Perception from rain and darkness.' },
      { type: 'damage', modifier: 2, description: 'Lightning strikes: 5% chance per round of 3d6 lightning damage to highest point.' },
    ],
    specialEncounters: ['Lightning elemental', 'Stormwracked ship on the coast', 'Cultists performing a storm ritual'],
    avoidedEncounters: ['Undead (storms disperse negative energy)', 'Flying creatures grounded'],
    flavorText: 'Thunder shakes the ground. Lightning turns night into day for blinding instants. The gods are angry — or celebrating.',
  },
  {
    weather: 'blizzard',
    encounterModifiers: [
      { type: 'visibility', modifier: -5, description: '-5 passive Perception. Heavily obscured beyond 20ft.' },
      { type: 'difficulty', modifier: 2, description: '+2 effective difficulty. Movement halved.' },
      { type: 'damage', modifier: 2, description: 'CON save DC 12 each hour or gain 1 level of exhaustion.' },
    ],
    specialEncounters: ['Frost giant', 'Ice mephit swarm', 'Frozen adventurers (lootable corpses or undead?)'],
    avoidedEncounters: ['Fire creatures', 'Most civilized NPCs', 'Caravans'],
    flavorText: 'White. Everything is white. The wind screams louder than any battle cry. Survival is the only quest now.',
  },
  {
    weather: 'heat_wave',
    encounterModifiers: [
      { type: 'difficulty', modifier: 1, description: '+1 effective difficulty — heat exhaustion.' },
      { type: 'damage', modifier: 1, description: 'Fire damage +1 from fire-based creatures. Cold damage -1.' },
    ],
    specialEncounters: ['Fire snake', 'Dehydrated beast (aggressive, desperate)', 'Mirage that leads to an oasis — or a trap'],
    avoidedEncounters: ['Cold creatures', 'Snow encounters'],
    flavorText: 'The air shimmers. Metal armor becomes an oven. Water is worth more than gold right now.',
  },
];

export function getWeatherEncounterEffect(weather: WeatherType): WeatherEncounterEffect | undefined {
  return WEATHER_EFFECTS.find((w) => w.weather === weather);
}

export function getAllWeatherTypes(): WeatherType[] {
  return WEATHER_EFFECTS.map((w) => w.weather);
}

export function getSpecialEncountersForWeather(weather: WeatherType): string[] {
  return getWeatherEncounterEffect(weather)?.specialEncounters ?? [];
}

export function getTotalModifier(weather: WeatherType, type: EncounterModifier['type']): number {
  const effect = getWeatherEncounterEffect(weather);
  if (!effect) return 0;
  return effect.encounterModifiers.filter((m) => m.type === type).reduce((sum, m) => sum + m.modifier, 0);
}

export function formatWeatherEncounterEffect(effect: WeatherEncounterEffect): string {
  const icon = { clear: '☀️', rain: '🌧️', fog: '🌫️', snow: '❄️', sandstorm: '🏜️', storm: '⛈️', blizzard: '🌨️', heat_wave: '🔥' }[effect.weather];
  const lines = [`${icon} **Weather: ${effect.weather.replace(/_/g, ' ')}**`];
  lines.push(`  *${effect.flavorText}*`);
  if (effect.encounterModifiers.length > 0) {
    lines.push('  **Modifiers:**');
    effect.encounterModifiers.forEach((m) => lines.push(`    ${m.modifier >= 0 ? '+' : ''}${m.modifier} ${m.type}: ${m.description}`));
  }
  if (effect.specialEncounters.length > 0) lines.push(`  **Special encounters:** ${effect.specialEncounters.join(', ')}`);
  if (effect.avoidedEncounters.length > 0) lines.push(`  **Avoided:** ${effect.avoidedEncounters.join(', ')}`);
  return lines.join('\n');
}
