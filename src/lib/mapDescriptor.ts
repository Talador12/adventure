// Random encounter map descriptor — generate terrain description from map state.

import type { TerrainType } from './mapUtils';

export function describeMapTerrain(terrain: TerrainType[][], width: number, height: number): string {
  const counts: Record<string, number> = {};
  const total = width * height;
  for (const row of terrain) for (const cell of row) counts[cell] = (counts[cell] || 0) + 1;

  const terrainNames: Record<string, string> = {
    floor: 'open ground', wall: 'walls/pillars', water: 'water', difficult: 'rough terrain',
    door: 'doors', pit: 'pits', lava: 'lava', acid: 'acid pools', poison_gas: 'toxic gas',
    stairs_up: 'stairs up', stairs_down: 'stairs down',
  };

  const features: string[] = [];
  for (const [type, count] of Object.entries(counts)) {
    if (type === 'floor') continue;
    const pct = Math.round((count / total) * 100);
    if (pct >= 1) features.push(`${terrainNames[type] || type} (${pct}%)`);
  }

  const openPct = Math.round(((counts['floor'] || 0) / total) * 100);
  const density = openPct > 80 ? 'open' : openPct > 60 ? 'moderately open' : openPct > 40 ? 'cluttered' : 'dense';

  const lines = [`🗺️ **Map Overview** (${width}×${height}, ${density}):`];
  lines.push(`Open space: ${openPct}%`);
  if (features.length > 0) lines.push(`Features: ${features.join(', ')}`);

  // Suggest tactical notes
  const hasWater = (counts['water'] || 0) > 0;
  const hasWalls = (counts['wall'] || 0) > 5;
  const hasPits = (counts['pit'] || 0) > 0;
  const hasLava = (counts['lava'] || 0) > 0;
  const suggestions: string[] = [];
  if (hasWalls) suggestions.push('Walls provide cover for ranged units');
  if (hasWater) suggestions.push('Water is difficult terrain, extinguishes fire');
  if (hasPits) suggestions.push('Pits can trap melee fighters — DEX saves to avoid');
  if (hasLava) suggestions.push('Lava deals massive fire damage — avoid at all costs');
  if (density === 'open') suggestions.push('Open terrain favors ranged attackers');
  if (density === 'dense') suggestions.push('Tight quarters favor melee and area spells');
  if (suggestions.length > 0) { lines.push('**Tactical notes:**'); for (const s of suggestions) lines.push(`  • ${s}`); }

  return lines.join('\n');
}

export function describeEncounterScene(terrain: TerrainType[][], enemies: { name: string; count: number }[]): string {
  const width = terrain[0]?.length || 0;
  const height = terrain.length;
  const mapDesc = describeMapTerrain(terrain, width, height);
  const enemyList = enemies.map((e) => `${e.name} ×${e.count}`).join(', ');
  return `${mapDesc}\n\n**Enemies:** ${enemyList || 'None placed yet.'}`;
}
