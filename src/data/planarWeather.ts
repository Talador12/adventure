// Random planar weather — bizarre weather from other planes bleeding through.

export type PlanarWeatherSource = 'feywild' | 'shadowfell' | 'elemental_chaos' | 'astral' | 'abyss' | 'celestial';

export interface PlanarWeatherEvent {
  name: string;
  source: PlanarWeatherSource;
  description: string;
  mechanicalEffects: string[];
  duration: string;
  warningSignsDC: number;
  plotHook: string | null;
}

const WEATHER_EVENTS: PlanarWeatherEvent[] = [
  { name: 'Glitter Storm', source: 'feywild', description: 'It rains liquid gold that turns to flowers on impact. Everything sparkles. It\'s beautiful and deeply suspicious.', mechanicalEffects: ['Difficult terrain (slippery petals).', 'Advantage on CHA checks (everyone looks fabulous).', 'Fey creatures are drawn to the area.', '10% chance per hour a random creature polymorphs into a woodland animal for 1d4 hours.'], duration: '1d6 hours', warningSignsDC: 10, plotHook: 'A fey noble is using the storm to scout the Material Plane for "entertainment."' },
  { name: 'Sorrow Fog', source: 'shadowfell', description: 'A grey mist that saps joy. Laughter dies. Colors fade. Even fire looks cold.', mechanicalEffects: ['Heavily obscured beyond 30ft.', 'WIS DC 12 each hour or gain 1 level of despair (-1 CHA, max -3).', 'Undead within the fog gain +2 to attack rolls.', 'Healing spells restore half normal HP.'], duration: '2d4 hours', warningSignsDC: 11, plotHook: 'A shadow crossing is opening nearby. This fog is just the beginning.' },
  { name: 'Ember Rain', source: 'elemental_chaos', description: 'Tiny glowing embers fall from a cloudless sky. They don\'t burn on contact — but they accumulate.', mechanicalEffects: ['After 1 hour: 1ft of embers = difficult terrain.', 'After 2 hours: embers ignite. 1d4 fire per round to anyone standing in them.', 'Fire-based creatures are empowered (+1d4 fire damage).', 'Water evaporates twice as fast.'], duration: '1d4 hours', warningSignsDC: 12, plotHook: 'A fire elemental is trying to create a permanent portal. The ember rain is step one.' },
  { name: 'Thought Rain', source: 'astral', description: 'It doesn\'t rain water. It rains ideas. Fragments of alien thoughts patter against your mind.', mechanicalEffects: ['INT DC 12 or distracted (disadvantage on Perception) for 1d4 rounds.', 'Wizards: advantage on Arcana checks (the thoughts contain fragments of spells).', 'Random telepathic flashes between nearby creatures (embarrassing thoughts).', 'Psionics are amplified: telepathy range doubled.'], duration: '1d8 hours', warningSignsDC: 14, plotHook: null },
  { name: 'Blood Moon Eclipse', source: 'abyss', description: 'The moon turns crimson. Shadows lengthen impossibly. Animals howl. The barrier between planes thins.', mechanicalEffects: ['Darkvision range halved (the darkness is magical).', 'Fiends can manifest at half cost (summoning spells are easier by 2 levels).', 'WIS DC 14 or violent urges (CHA check DC 12 to resist acting on them).', 'Lycanthropes transform regardless of moon phase.'], duration: '1 night', warningSignsDC: 8, plotHook: 'A cult has been waiting for this eclipse. Their ritual begins at midnight.' },
  { name: 'Radiant Dawn', source: 'celestial', description: 'The sunrise is... wrong. Too bright. Too warm. Too perfect. Wounds close on their own. Sins feel heavier.', mechanicalEffects: ['All healing maximized until noon.', 'Undead take 1d6 radiant per round in sunlight (instead of normal sensitivity).', 'Lies are physically painful (1 psychic damage per deliberate lie).', 'Evil-aligned creatures have disadvantage on all checks.'], duration: 'Until noon', warningSignsDC: 6, plotHook: 'A celestial is descending. It comes bearing a message — or a judgment.' },
];

export function getRandomPlanarWeather(): PlanarWeatherEvent {
  return WEATHER_EVENTS[Math.floor(Math.random() * WEATHER_EVENTS.length)];
}

export function getWeatherBySource(source: PlanarWeatherSource): PlanarWeatherEvent[] {
  return WEATHER_EVENTS.filter((w) => w.source === source);
}

export function getWeatherWithPlotHooks(): PlanarWeatherEvent[] {
  return WEATHER_EVENTS.filter((w) => w.plotHook !== null);
}

export function getAllWeatherSources(): PlanarWeatherSource[] {
  return [...new Set(WEATHER_EVENTS.map((w) => w.source))];
}

export function formatPlanarWeather(weather: PlanarWeatherEvent): string {
  const icon = { feywild: '🌸', shadowfell: '🌑', elemental_chaos: '🔥', astral: '🌌', abyss: '👹', celestial: '✨' }[weather.source];
  const lines = [`${icon} **${weather.name}** *(${weather.source.replace(/_/g, ' ')})*`];
  lines.push(`  *${weather.description}*`);
  lines.push('  **Effects:**');
  weather.mechanicalEffects.forEach((e) => lines.push(`    ⚡ ${e}`));
  lines.push(`  Duration: ${weather.duration} | Warning DC: ${weather.warningSignsDC}`);
  if (weather.plotHook) lines.push(`  📜 Hook: ${weather.plotHook}`);
  return lines.join('\n');
}

export { WEATHER_EVENTS as PLANAR_WEATHER };
