// Random name generator for locations — towns, rivers, mountains.

export type LocationType = 'town' | 'city' | 'river' | 'mountain' | 'forest' | 'lake' | 'island' | 'fortress';

const TOWN_PREFIXES = ['Green', 'Red', 'Silver', 'Iron', 'Oak', 'Stone', 'Gold', 'White', 'Dark', 'Frost', 'Sun', 'Moon', 'Storm', 'Raven', 'Wolf'];
const TOWN_SUFFIXES = ['haven', 'ford', 'bury', 'ton', 'vale', 'bridge', 'keep', 'wick', 'holm', 'mere', 'field', 'hollow', 'gate', 'crest', 'watch'];
const CITY_PREFIXES = ['New', 'Old', 'Great', 'High', 'Free', 'Royal'];
const RIVER_NAMES = ['Serpent', 'Silver', 'Rushing', 'Whispering', 'Black', 'Crystal', 'Winding', 'Thunder'];
const RIVER_SUFFIXES = [' River', ' Creek', ' Brook', ' Falls', ' Rapids', ' Flow'];
const MOUNTAIN_PREFIXES = ['Dragon', 'Thunder', 'Storm', 'Frost', 'Shadow', 'Iron', 'Fire', 'Cloud', 'Eagle', 'Giant'];
const MOUNTAIN_SUFFIXES = [' Peak', ' Summit', ' Spire', ' Tooth', ' Horn', ' Crown', ' Crag'];
const FOREST_PREFIXES = ['Whisper', 'Shadow', 'Elder', 'Tangle', 'Mystic', 'Ancient', 'Dark', 'Silver'];
const FOREST_SUFFIXES = ['wood', ' Forest', ' Grove', ' Thicket', 'weald', ' Wilds'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateLocationName(type: LocationType): string {
  switch (type) {
    case 'town': return `${pick(TOWN_PREFIXES)}${pick(TOWN_SUFFIXES)}`;
    case 'city': return `${pick(CITY_PREFIXES)} ${pick(TOWN_PREFIXES)}${pick(TOWN_SUFFIXES)}`;
    case 'river': return `The ${pick(RIVER_NAMES)}${pick(RIVER_SUFFIXES)}`;
    case 'mountain': return `${pick(MOUNTAIN_PREFIXES)}${pick(MOUNTAIN_SUFFIXES)}`;
    case 'forest': return `${pick(FOREST_PREFIXES)}${pick(FOREST_SUFFIXES)}`;
    case 'lake': return `Lake ${pick(TOWN_PREFIXES)}${pick(['mere', 'pool', 'mirror', 'glass', 'deep'])}`;
    case 'island': return `${pick(TOWN_PREFIXES)} Isle`;
    case 'fortress': return `Fort ${pick(TOWN_PREFIXES)}${pick(['guard', 'wall', 'shield', 'hold', 'keep'])}`;
  }
}

export function generateLocationNames(count: number = 3, type?: LocationType): string[] {
  const types: LocationType[] = type ? Array(count).fill(type) : ['town', 'city', 'river', 'mountain', 'forest', 'lake', 'island', 'fortress'];
  return Array.from({ length: count }, (_, i) => generateLocationName(types[i % types.length]));
}

export function formatLocationNames(count: number = 8): string {
  const types: LocationType[] = ['town', 'city', 'river', 'mountain', 'forest', 'lake', 'island', 'fortress'];
  const lines = ['🗺️ **Random Location Names:**'];
  for (const t of types) lines.push(`  ${t === 'town' ? '🏘️' : t === 'city' ? '🏙️' : t === 'river' ? '🌊' : t === 'mountain' ? '⛰️' : t === 'forest' ? '🌲' : t === 'lake' ? '💧' : t === 'island' ? '🏝️' : '🏰'} **${t}**: ${generateLocationName(t)}`);
  return lines.join('\n');
}
