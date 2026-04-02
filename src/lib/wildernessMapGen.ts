// Random wilderness map generator — procedural terrain for outdoor encounters.
// Uses cellular automata to generate natural-looking maps.

import type { TerrainType } from './mapUtils';

export type BiomePreset = 'forest' | 'desert' | 'swamp' | 'mountain' | 'coast' | 'plains' | 'tundra';

interface BiomeConfig {
  primary: TerrainType;
  secondary: TerrainType;
  hazard: TerrainType;
  waterChance: number;
  wallChance: number; // trees/rocks
  hazardChance: number;
}

const BIOME_CONFIGS: Record<BiomePreset, BiomeConfig> = {
  forest: { primary: 'floor', secondary: 'difficult', hazard: 'water', waterChance: 0.1, wallChance: 0.25, hazardChance: 0.05 },
  desert: { primary: 'floor', secondary: 'difficult', hazard: 'lava', waterChance: 0.02, wallChance: 0.1, hazardChance: 0.03 },
  swamp: { primary: 'difficult', secondary: 'water', hazard: 'poison_gas', waterChance: 0.3, wallChance: 0.08, hazardChance: 0.05 },
  mountain: { primary: 'floor', secondary: 'difficult', hazard: 'pit', waterChance: 0.05, wallChance: 0.3, hazardChance: 0.04 },
  coast: { primary: 'floor', secondary: 'water', hazard: 'difficult', waterChance: 0.35, wallChance: 0.05, hazardChance: 0.02 },
  plains: { primary: 'floor', secondary: 'floor', hazard: 'difficult', waterChance: 0.05, wallChance: 0.05, hazardChance: 0.02 },
  tundra: { primary: 'floor', secondary: 'difficult', hazard: 'water', waterChance: 0.08, wallChance: 0.15, hazardChance: 0.03 },
};

export function generateWildernessMap(
  width: number,
  height: number,
  biome: BiomePreset,
  seed?: number,
): TerrainType[][] {
  const config = BIOME_CONFIGS[biome];
  let rng = seed || Math.random() * 100000;
  function random(): number { rng = (rng * 16807 + 0) % 2147483647; return rng / 2147483647; }

  // Initial random fill
  const grid: TerrainType[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => {
      const r = random();
      if (r < config.wallChance) return 'wall';
      if (r < config.wallChance + config.waterChance) return config.secondary === 'water' ? 'water' : config.secondary;
      if (r < config.wallChance + config.waterChance + config.hazardChance) return config.hazard;
      return config.primary;
    })
  );

  // Cellular automata smoothing (2 passes)
  for (let pass = 0; pass < 2; pass++) {
    const next: TerrainType[][] = grid.map((row) => [...row]);
    for (let r = 1; r < height - 1; r++) {
      for (let c = 1; c < width - 1; c++) {
        let wallCount = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (grid[r + dr][c + dc] === 'wall') wallCount++;
          }
        }
        next[r][c] = wallCount >= 5 ? 'wall' : wallCount <= 2 ? config.primary : grid[r][c];
      }
    }
    for (let r = 0; r < height; r++) for (let c = 0; c < width; c++) grid[r][c] = next[r][c];
  }

  // Ensure borders are passable (clear a path along edges)
  for (let c = 0; c < width; c++) { grid[0][c] = config.primary; grid[height - 1][c] = config.primary; }
  for (let r = 0; r < height; r++) { grid[r][0] = config.primary; grid[r][width - 1] = config.primary; }

  return grid;
}

export function getMapDescription(biome: BiomePreset): string {
  const descs: Record<BiomePreset, string> = {
    forest: 'Dense trees create natural cover. Undergrowth makes movement difficult in places.',
    desert: 'Open sandy terrain with scattered rock formations. Heat shimmers distort the horizon.',
    swamp: 'Murky water and tangled roots. Poisonous gas seeps from the mud.',
    mountain: 'Rocky terrain with steep drops and narrow paths between boulders.',
    coast: 'Sandy shore meets crashing waves. Tidal pools and driftwood litter the beach.',
    plains: 'Open grassland with minimal cover. Movement is easy but visibility goes both ways.',
    tundra: 'Frozen wasteland with ice patches and snowdrifts. Bitter wind cuts through armor.',
  };
  return descs[biome];
}

export function formatMapGenResult(biome: BiomePreset, width: number, height: number): string {
  return `🗺️ **Wilderness Map Generated** (${biome}, ${width}×${height})\n${getMapDescription(biome)}`;
}
