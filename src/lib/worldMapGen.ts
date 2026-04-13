// Procedural overland hex map generator for the campaign world map.
// Generates a hex grid of overland terrain using layered noise (diamond-square-like).
// Each hex represents ~6 miles of terrain (1 day travel = ~4 hexes at normal pace).

export type OverlandTerrain =
  | 'plains'
  | 'forest'
  | 'dense_forest'
  | 'hills'
  | 'mountains'
  | 'swamp'
  | 'desert'
  | 'tundra'
  | 'coast'
  | 'ocean'
  | 'lake'
  | 'river'
  | 'road'
  | 'village'
  | 'city'
  | 'ruins'
  | 'cave'
  | 'castle';

export interface WorldHex {
  col: number;
  row: number;
  terrain: OverlandTerrain;
  elevation: number; // 0-1 normalized
  moisture: number; // 0-1 normalized
  name?: string; // optional location name
  discovered: boolean; // fog of war
  notes?: string; // DM notes
  questId?: string; // linked quest
}

export interface WorldMapData {
  width: number;
  height: number;
  hexes: WorldHex[][];
  seed: number;
  name: string;
}

// Terrain rendering config: fill color, stroke color, label, travel cost (hexes per day modifier)
export const OVERLAND_TERRAIN_CONFIG: Record<OverlandTerrain, {
  fill: string;
  stroke: string;
  label: string;
  emoji: string;
  travelCost: number; // multiplier on movement (1 = normal, 2 = half speed)
  description: string;
}> = {
  plains:       { fill: '#4a7c3f', stroke: '#3d6834', label: 'Plains', emoji: '🌾', travelCost: 1, description: 'Open grasslands with gentle rolling hills. Easy travel.' },
  forest:       { fill: '#2d5a27', stroke: '#1e4a1a', label: 'Forest', emoji: '🌲', travelCost: 1.5, description: 'Temperate woodland with scattered clearings. Moderate travel.' },
  dense_forest: { fill: '#1a3d15', stroke: '#0f2d0b', label: 'Dense Forest', emoji: '🌳', travelCost: 2, description: 'Thick canopy blocks sunlight. Difficult terrain, easy to get lost.' },
  hills:        { fill: '#7a6b3a', stroke: '#5d5230', label: 'Hills', emoji: '⛰️', travelCost: 1.5, description: 'Rolling terrain with rocky outcrops. Slightly slower travel.' },
  mountains:    { fill: '#6b6b6b', stroke: '#4a4a4a', label: 'Mountains', emoji: '🏔️', travelCost: 3, description: 'Steep peaks and narrow passes. Very difficult travel.' },
  swamp:        { fill: '#3d5a3a', stroke: '#2a4028', label: 'Swamp', emoji: '🐊', travelCost: 2, description: 'Murky wetlands with treacherous footing. Difficult terrain.' },
  desert:       { fill: '#c4a35a', stroke: '#a08840', label: 'Desert', emoji: '🏜️', travelCost: 2, description: 'Arid wasteland. Water is scarce, heat is brutal.' },
  tundra:       { fill: '#a8b8c0', stroke: '#8a9aa2', label: 'Tundra', emoji: '❄️', travelCost: 1.5, description: 'Frozen plains with bitter winds. Cold exposure risk.' },
  coast:        { fill: '#7ab0a0', stroke: '#5a9080', label: 'Coast', emoji: '🏖️', travelCost: 1, description: 'Sandy shores and tidal flats. Good fishing, easy travel along shore.' },
  ocean:        { fill: '#1a4a7a', stroke: '#0f3a6a', label: 'Ocean', emoji: '🌊', travelCost: Infinity, description: 'Deep water. Requires a ship to cross.' },
  lake:         { fill: '#2a5a8a', stroke: '#1a4a7a', label: 'Lake', emoji: '💧', travelCost: Infinity, description: 'A body of fresh water. Requires a boat or detour.' },
  river:        { fill: '#3a6a9a', stroke: '#2a5a8a', label: 'River', emoji: '🏞️', travelCost: 2, description: 'Flowing water. Fordable at shallows, or use a bridge.' },
  road:         { fill: '#8a7a5a', stroke: '#6a5a3a', label: 'Road', emoji: '🛤️', travelCost: 0.75, description: 'Well-maintained trade road. Fast travel.' },
  village:      { fill: '#8a6a4a', stroke: '#6a4a2a', label: 'Village', emoji: '🏘️', travelCost: 1, description: 'Small settlement. Rest, supplies, and rumors.' },
  city:         { fill: '#6a5a4a', stroke: '#4a3a2a', label: 'City', emoji: '🏰', travelCost: 1, description: 'Major settlement with markets, guilds, and intrigue.' },
  ruins:        { fill: '#5a5050', stroke: '#3a3030', label: 'Ruins', emoji: '🏚️', travelCost: 1.5, description: 'Crumbling structures from a lost civilization. Dangerous but rewarding.' },
  cave:         { fill: '#4a4040', stroke: '#2a2020', label: 'Cave', emoji: '🕳️', travelCost: 1, description: 'Natural cave entrance. Who knows what lurks below.' },
  castle:       { fill: '#5a4a3a', stroke: '#3a2a1a', label: 'Castle', emoji: '🏰', travelCost: 1, description: 'Fortified stronghold. Could be friendly or hostile.' },
};

// Seeded pseudo-random number generator (LCG)
function createRng(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807 + 0) % 2147483647;
    return state / 2147483647;
  };
}

// Simple 2D value noise for terrain generation
function generateNoiseGrid(width: number, height: number, random: () => number, scale: number): number[][] {
  // Generate coarse grid at scale, then bilinear interpolate
  const coarseW = Math.ceil(width / scale) + 2;
  const coarseH = Math.ceil(height / scale) + 2;
  const coarse: number[][] = Array.from({ length: coarseH }, () =>
    Array.from({ length: coarseW }, () => random()),
  );

  const grid: number[][] = Array.from({ length: height }, (_, r) =>
    Array.from({ length: width }, (_, c) => {
      const fx = c / scale;
      const fy = r / scale;
      const x0 = Math.floor(fx);
      const y0 = Math.floor(fy);
      const x1 = x0 + 1;
      const y1 = y0 + 1;
      const tx = fx - x0;
      const ty = fy - y0;
      // Smoothstep
      const sx = tx * tx * (3 - 2 * tx);
      const sy = ty * ty * (3 - 2 * ty);
      const v00 = coarse[y0]?.[x0] ?? 0;
      const v10 = coarse[y0]?.[x1] ?? 0;
      const v01 = coarse[y1]?.[x0] ?? 0;
      const v11 = coarse[y1]?.[x1] ?? 0;
      return (v00 * (1 - sx) + v10 * sx) * (1 - sy) + (v01 * (1 - sx) + v11 * sx) * sy;
    }),
  );
  return grid;
}

// Combine multiple octaves for fractal noise
function fractalNoise(width: number, height: number, random: () => number, octaves: number = 4): number[][] {
  const result: number[][] = Array.from({ length: height }, () => Array(width).fill(0));
  let amplitude = 1;
  let totalAmp = 0;

  for (let o = 0; o < octaves; o++) {
    const scale = Math.max(2, Math.pow(2, octaves - o));
    const noise = generateNoiseGrid(width, height, random, scale);
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        result[r][c] += noise[r][c] * amplitude;
      }
    }
    totalAmp += amplitude;
    amplitude *= 0.5;
  }

  // Normalize to 0-1
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      result[r][c] /= totalAmp;
    }
  }
  return result;
}

// Map elevation + moisture to terrain type
function classifyTerrain(elevation: number, moisture: number, random: () => number): OverlandTerrain {
  // Ocean and water
  if (elevation < 0.25) return 'ocean';
  if (elevation < 0.3) return 'coast';
  if (elevation < 0.32 && moisture > 0.6) return 'lake';

  // Mountains and high terrain
  if (elevation > 0.82) return 'mountains';
  if (elevation > 0.7) return 'hills';

  // Moisture-based biomes at mid elevations
  if (moisture < 0.2) return 'desert';
  if (moisture < 0.3 && elevation > 0.5) return 'tundra';
  if (moisture > 0.75 && elevation < 0.45) return 'swamp';
  if (moisture > 0.6) return 'dense_forest';
  if (moisture > 0.4) return 'forest';

  return 'plains';
}

// Place points of interest (villages, cities, ruins, caves, castles)
function placePOIs(
  hexes: WorldHex[][],
  width: number,
  height: number,
  random: () => number,
): void {
  const landHexes: WorldHex[] = [];
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const h = hexes[r][c];
      if (h.terrain !== 'ocean' && h.terrain !== 'lake') {
        landHexes.push(h);
      }
    }
  }

  // Place 1-2 cities on plains/coast near water
  let citiesPlaced = 0;
  const cityTarget = 1 + Math.floor(random() * 2);
  for (const h of landHexes) {
    if (citiesPlaced >= cityTarget) break;
    if ((h.terrain === 'plains' || h.terrain === 'coast') && h.moisture > 0.35 && random() < 0.08) {
      h.terrain = 'city';
      h.name = generateLocationName(random, 'city');
      citiesPlaced++;
    }
  }

  // Place 3-5 villages
  let villagesPlaced = 0;
  const villageTarget = 3 + Math.floor(random() * 3);
  for (const h of landHexes) {
    if (villagesPlaced >= villageTarget) break;
    if (h.terrain === 'plains' || h.terrain === 'forest' || h.terrain === 'coast') {
      if (random() < 0.04) {
        h.terrain = 'village';
        h.name = generateLocationName(random, 'village');
        villagesPlaced++;
      }
    }
  }

  // Place 2-4 ruins
  let ruinsPlaced = 0;
  const ruinsTarget = 2 + Math.floor(random() * 3);
  for (const h of landHexes) {
    if (ruinsPlaced >= ruinsTarget) break;
    if (h.terrain !== 'city' && h.terrain !== 'village' && random() < 0.03) {
      h.terrain = 'ruins';
      h.name = generateLocationName(random, 'ruins');
      ruinsPlaced++;
    }
  }

  // Place 1-3 caves in mountains/hills
  let cavesPlaced = 0;
  const caveTarget = 1 + Math.floor(random() * 3);
  for (const h of landHexes) {
    if (cavesPlaced >= caveTarget) break;
    if ((h.terrain === 'mountains' || h.terrain === 'hills') && random() < 0.06) {
      h.terrain = 'cave';
      h.name = generateLocationName(random, 'cave');
      cavesPlaced++;
    }
  }

  // Place 1 castle
  for (const h of landHexes) {
    if ((h.terrain === 'hills' || h.terrain === 'plains') && random() < 0.02) {
      h.terrain = 'castle';
      h.name = generateLocationName(random, 'castle');
      break;
    }
  }

  // Place a few roads connecting cities/villages (simplified - straight line)
  const settlements = landHexes.filter((h) => h.terrain === 'city' || h.terrain === 'village');
  for (let i = 0; i < settlements.length - 1 && i < 3; i++) {
    const a = settlements[i];
    const b = settlements[i + 1];
    // Draw road hexes between settlements (bresenham)
    let c0 = a.col, r0 = a.row;
    const c1 = b.col, r1 = b.row;
    const dc = Math.abs(c1 - c0), dr = Math.abs(r1 - r0);
    const sc = c0 < c1 ? 1 : -1, sr = r0 < r1 ? 1 : -1;
    let err = dc - dr;
    while (c0 !== c1 || r0 !== r1) {
      const hex = hexes[r0]?.[c0];
      if (hex && hex.terrain !== 'city' && hex.terrain !== 'village' && hex.terrain !== 'ocean' && hex.terrain !== 'lake' && hex.terrain !== 'mountains') {
        hex.terrain = 'road';
      }
      const e2 = 2 * err;
      if (e2 > -dr) { err -= dr; c0 += sc; }
      if (e2 < dc) { err += dc; r0 += sr; }
    }
  }
}

// Fantasy location name generator
const NAME_PREFIXES = ['Shadow', 'Iron', 'Storm', 'Ember', 'Frost', 'Crimson', 'Silver', 'Dark', 'Green', 'White', 'Black', 'Golden', 'Raven', 'Wolf', 'Thorn', 'Stone', 'Dawn', 'Dusk', 'Moon', 'Star'];
const NAME_CITY_SUFFIXES = ['haven', 'gate', 'hold', 'keep', 'ford', 'port', 'watch', 'reach', 'helm', 'shire'];
const NAME_VILLAGE_SUFFIXES = ['wick', 'dale', 'brook', 'field', 'hollow', 'glen', 'mere', 'stead', 'mill', 'cross'];
const NAME_RUINS_SUFFIXES = [' Ruins', ' Barrow', ' Tomb', ' Crypt', "'s Fall", "'s Rest", ' Cairn', ' Spire'];
const NAME_CAVE_SUFFIXES = [' Cavern', ' Grotto', ' Depths', ' Maw', ' Hollow', "'s Lair", ' Chasm'];
const NAME_CASTLE_SUFFIXES = [' Keep', ' Citadel', ' Fortress', ' Bastion', ' Tower', ' Stronghold'];

function generateLocationName(random: () => number, type: string): string {
  const prefix = NAME_PREFIXES[Math.floor(random() * NAME_PREFIXES.length)];
  let suffixes: string[];
  switch (type) {
    case 'city': suffixes = NAME_CITY_SUFFIXES; break;
    case 'village': suffixes = NAME_VILLAGE_SUFFIXES; break;
    case 'ruins': suffixes = NAME_RUINS_SUFFIXES; break;
    case 'cave': suffixes = NAME_CAVE_SUFFIXES; break;
    case 'castle': suffixes = NAME_CASTLE_SUFFIXES; break;
    default: suffixes = NAME_CITY_SUFFIXES;
  }
  const suffix = suffixes[Math.floor(random() * suffixes.length)];
  return prefix + suffix;
}

// Generate the full world map
export function generateWorldMap(
  width: number = 30,
  height: number = 20,
  seed?: number,
  name: string = 'The Realm',
): WorldMapData {
  const actualSeed = seed ?? Math.floor(Math.random() * 2147483647);
  const random = createRng(actualSeed);

  // Generate elevation and moisture noise layers
  const elevation = fractalNoise(width, height, random, 4);
  const moisture = fractalNoise(width, height, random, 3);

  // Build hex grid
  const hexes: WorldHex[][] = Array.from({ length: height }, (_, r) =>
    Array.from({ length: width }, (_, c) => ({
      col: c,
      row: r,
      terrain: classifyTerrain(elevation[r][c], moisture[r][c], random),
      elevation: elevation[r][c],
      moisture: moisture[r][c],
      discovered: false,
    })),
  );

  // Place points of interest
  placePOIs(hexes, width, height, random);

  // Reveal starting area (center of map, 3 hex radius)
  const centerCol = Math.floor(width / 2);
  const centerRow = Math.floor(height / 2);
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const dist = Math.sqrt((c - centerCol) ** 2 + (r - centerRow) ** 2);
      if (dist <= 3) {
        hexes[r][c].discovered = true;
      }
    }
  }

  return { width, height, hexes, seed: actualSeed, name };
}
