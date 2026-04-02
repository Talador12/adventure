// Weather-dependent combat modifiers — mechanical effects from weather on combat.
// Rain penalizes ranged, fog limits visibility, ice = difficult terrain, etc.

export type WeatherCondition = 'none' | 'rain' | 'fog' | 'snow' | 'sandstorm' | 'storm' | 'blizzard' | 'heat_wave';

export interface WeatherModifier {
  condition: WeatherCondition;
  name: string;
  emoji: string;
  effects: WeatherEffect[];
  description: string;
}

export interface WeatherEffect {
  type: 'ranged_penalty' | 'visibility' | 'difficult_terrain' | 'perception_penalty' | 'concentration_dc' | 'fire_resistance' | 'cold_damage' | 'speed_penalty';
  value: number;
  description: string;
}

export const WEATHER_MODIFIERS: WeatherModifier[] = [
  {
    condition: 'none', name: 'Clear', emoji: '☀️', description: 'Clear skies. No combat modifiers.',
    effects: [],
  },
  {
    condition: 'rain', name: 'Rain', emoji: '🌧️', description: 'Steady rain obscures vision and dampens flames.',
    effects: [
      { type: 'ranged_penalty', value: -2, description: '-2 to ranged attack rolls' },
      { type: 'perception_penalty', value: -2, description: '-2 to Perception checks (hearing)' },
      { type: 'fire_resistance', value: 1, description: 'Fire damage halved (resistance)' },
    ],
  },
  {
    condition: 'fog', name: 'Fog', emoji: '🌫️', description: 'Thick fog heavily obscures everything beyond 30ft.',
    effects: [
      { type: 'visibility', value: 6, description: 'Vision limited to 30ft (6 cells)' },
      { type: 'ranged_penalty', value: -5, description: '-5 to ranged attacks beyond 30ft (effectively disadvantage)' },
      { type: 'perception_penalty', value: -5, description: '-5 to Perception checks (sight)' },
    ],
  },
  {
    condition: 'snow', name: 'Snow', emoji: '❄️', description: 'Falling snow creates difficult terrain and limits visibility.',
    effects: [
      { type: 'difficult_terrain', value: 1, description: 'All outdoor terrain costs double movement' },
      { type: 'visibility', value: 12, description: 'Vision limited to 60ft (12 cells)' },
      { type: 'ranged_penalty', value: -2, description: '-2 to ranged attack rolls' },
    ],
  },
  {
    condition: 'sandstorm', name: 'Sandstorm', emoji: '🏜️', description: 'Blinding sand tears at exposed skin.',
    effects: [
      { type: 'visibility', value: 4, description: 'Vision limited to 20ft (4 cells)' },
      { type: 'ranged_penalty', value: -5, description: '-5 to ranged attacks' },
      { type: 'cold_damage', value: 1, description: '1 slashing damage per round (exposed skin)' },
      { type: 'concentration_dc', value: 12, description: 'DC 12 CON save to maintain concentration' },
    ],
  },
  {
    condition: 'storm', name: 'Thunderstorm', emoji: '⛈️', description: 'Heavy rain, wind, and lightning.',
    effects: [
      { type: 'ranged_penalty', value: -4, description: '-4 to ranged attack rolls (wind)' },
      { type: 'perception_penalty', value: -5, description: '-5 to Perception (thunder drowns sounds)' },
      { type: 'concentration_dc', value: 10, description: 'DC 10 CON save to maintain concentration (thunder)' },
    ],
  },
  {
    condition: 'blizzard', name: 'Blizzard', emoji: '🌨️', description: 'Whiteout conditions. Extremely dangerous.',
    effects: [
      { type: 'visibility', value: 2, description: 'Vision limited to 10ft (2 cells)' },
      { type: 'difficult_terrain', value: 1, description: 'All terrain costs double movement' },
      { type: 'cold_damage', value: 2, description: '2 cold damage per round (exposed)' },
      { type: 'speed_penalty', value: -2, description: '-10ft movement speed' },
    ],
  },
  {
    condition: 'heat_wave', name: 'Heat Wave', emoji: '🔥', description: 'Oppressive heat saps strength.',
    effects: [
      { type: 'concentration_dc', value: 10, description: 'DC 10 CON save each hour or gain exhaustion' },
      { type: 'speed_penalty', value: -1, description: '-5ft movement speed (heavy armor doubles penalty)' },
    ],
  },
];

export function getWeatherModifiers(condition: WeatherCondition): WeatherModifier {
  return WEATHER_MODIFIERS.find((w) => w.condition === condition) || WEATHER_MODIFIERS[0];
}

export function getRangedPenalty(condition: WeatherCondition): number {
  const mod = getWeatherModifiers(condition);
  const ranged = mod.effects.find((e) => e.type === 'ranged_penalty');
  return ranged?.value || 0;
}

export function getVisibilityRange(condition: WeatherCondition): number | null {
  const mod = getWeatherModifiers(condition);
  const vis = mod.effects.find((e) => e.type === 'visibility');
  return vis?.value || null; // null = unlimited
}

export function isDifficultTerrain(condition: WeatherCondition): boolean {
  const mod = getWeatherModifiers(condition);
  return mod.effects.some((e) => e.type === 'difficult_terrain');
}

export function formatWeatherCombatEffects(condition: WeatherCondition): string {
  const mod = getWeatherModifiers(condition);
  if (mod.effects.length === 0) return `${mod.emoji} **${mod.name}**: No combat modifiers.`;
  const lines = [`${mod.emoji} **${mod.name} Combat Effects:**`];
  for (const e of mod.effects) lines.push(`• ${e.description}`);
  return lines.join('\n');
}
