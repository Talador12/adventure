// Magical weather calendar — yearly cycle of magical weather events by region.

export type CalendarSeason = 'spring' | 'summer' | 'autumn' | 'winter';
export type CalendarRegion = 'coastal' | 'inland' | 'mountain' | 'forest' | 'desert' | 'arctic';

export interface MagicalWeatherDay {
  name: string;
  season: CalendarSeason;
  regions: CalendarRegion[];
  dayOfSeason: number; // 1-90 (which day of the season)
  description: string;
  mechanicalEffect: string;
  duration: string;
  isRecurring: boolean; // happens every year
  plotRelevance: string | null;
}

const CALENDAR: MagicalWeatherDay[] = [
  { name: 'The Bloom Surge', season: 'spring', regions: ['forest', 'inland', 'coastal'], dayOfSeason: 1, description: 'The first day of spring. All plants within 100 miles grow 1 year\'s worth in a single hour.', mechanicalEffect: 'Difficult terrain everywhere (undergrowth). Foraging DC reduced by 5. Herbalism rolls have advantage.', duration: '1 hour (growth), effects last 1 week', isRecurring: true, plotRelevance: 'Druids consider this day holy. Rituals performed during the Surge are twice as powerful.' },
  { name: 'Midsummer\'s Veil', season: 'summer', regions: ['forest', 'coastal', 'inland'], dayOfSeason: 45, description: 'The barrier between the Material Plane and the Feywild is at its thinnest.', mechanicalEffect: 'Fey creatures can cross freely. Charm spells are cast at +2 DC. Time distortions in forests (+/- 1d4 hours).', duration: '24 hours', isRecurring: true, plotRelevance: 'Fey courts hold their great revels. Mortals who wander into forests may be "invited."' },
  { name: 'The Rust Wind', season: 'summer', regions: ['desert', 'mountain'], dayOfSeason: 70, description: 'A hot wind carrying fine metallic dust. Every metal surface oxidizes rapidly.', mechanicalEffect: 'Exposed metal weapons/armor: -1 to hit/AC for 24 hours unless oiled. Rust monsters swarm.', duration: '3 days', isRecurring: true, plotRelevance: null },
  { name: 'Harvest Moon Glow', season: 'autumn', regions: ['inland', 'forest'], dayOfSeason: 30, description: 'The moon glows amber. Crops harvested under this light don\'t spoil for a year.', mechanicalEffect: 'Rations preserved during this night have infinite shelf life. Lycanthrope activity +50%.', duration: '1 night', isRecurring: true, plotRelevance: 'Werewolves consider this their holy night. Packs gather for the Great Hunt.' },
  { name: 'The Shadow Tide', season: 'autumn', regions: ['coastal', 'inland', 'forest'], dayOfSeason: 75, description: 'The Shadowfell pushes against the Material Plane. Shadows lengthen. Colors fade.', mechanicalEffect: 'Undead gain +2 to attacks. Healing spells heal -2 HP. Darkvision range doubled for everyone.', duration: '3 days', isRecurring: true, plotRelevance: 'The dead are restless. Graves may open. Ghosts appear with unfinished business.' },
  { name: 'The Still', season: 'winter', regions: ['arctic', 'mountain', 'forest'], dayOfSeason: 45, description: 'The coldest day. No wind. No sound. Even fire is silent. Magic feels... heavy.', mechanicalEffect: 'Spell slots above 5th level cannot be used. Cold damage +1d6. Sound doesn\'t travel beyond 30ft.', duration: '24 hours', isRecurring: true, plotRelevance: 'The God of Winter is said to walk the world on this day. Seeing him is an omen.' },
  { name: 'Starfall Night', season: 'winter', regions: ['mountain', 'desert', 'arctic'], dayOfSeason: 80, description: 'A meteor shower. But these aren\'t normal meteors — they carry fragments of the Astral Plane.', mechanicalEffect: 'Astral fragments (1d4 per mile) land. Each contains a random minor magical effect (DM rolls).', duration: '1 night', isRecurring: true, plotRelevance: 'Astral fragment collection is extremely valuable. Factions compete aggressively for them.' },
  { name: 'The Equinox Convergence', season: 'spring', regions: ['coastal', 'inland', 'mountain', 'forest', 'desert', 'arctic'], dayOfSeason: 45, description: 'Both equinoxes. Day and night are exactly equal. All magic is balanced — no school has advantage.', mechanicalEffect: 'All spells cost 1 fewer spell slot (minimum 1). Concentration checks have advantage. Wild magic surges are impossible.', duration: '12 hours', isRecurring: true, plotRelevance: 'The only day when certain rituals can be performed. Cults plan around this day.' },
];

export function getWeatherForSeason(season: CalendarSeason): MagicalWeatherDay[] {
  return CALENDAR.filter((w) => w.season === season);
}

export function getWeatherForRegion(region: CalendarRegion): MagicalWeatherDay[] {
  return CALENDAR.filter((w) => w.regions.includes(region));
}

export function getWeatherForDay(season: CalendarSeason, day: number): MagicalWeatherDay | undefined {
  return CALENDAR.find((w) => w.season === season && w.dayOfSeason === day);
}

export function getPlotRelevantWeather(): MagicalWeatherDay[] {
  return CALENDAR.filter((w) => w.plotRelevance !== null);
}

export function getAllCalendarSeasons(): CalendarSeason[] {
  return ['spring', 'summer', 'autumn', 'winter'];
}

export function getAllCalendarRegions(): CalendarRegion[] {
  return ['coastal', 'inland', 'mountain', 'forest', 'desert', 'arctic'];
}

export function formatWeatherDay(day: MagicalWeatherDay): string {
  const icon = { spring: '🌸', summer: '☀️', autumn: '🍂', winter: '❄️' }[day.season];
  const lines = [`${icon} **${day.name}** *(${day.season}, day ${day.dayOfSeason})*`];
  lines.push(`  *${day.description}*`);
  lines.push(`  Regions: ${day.regions.join(', ')} | Duration: ${day.duration}`);
  lines.push(`  ⚙️ ${day.mechanicalEffect}`);
  if (day.plotRelevance) lines.push(`  📜 ${day.plotRelevance}`);
  return lines.join('\n');
}

export { CALENDAR as MAGICAL_WEATHER_CALENDAR };
