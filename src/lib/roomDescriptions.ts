// Procedural room descriptions — generates flavor text from map terrain layout.
// Analyzes the visible terrain cells to create atmospheric narration.

import type { TerrainType } from './mapUtils';

interface TerrainCounts {
  floor: number; wall: number; water: number; lava: number; grass: number;
  sand: number; ice: number; difficult: number; pit: number; door: number;
  total: number;
}

function countTerrain(terrain: TerrainType[][]): TerrainCounts {
  const counts: TerrainCounts = { floor: 0, wall: 0, water: 0, lava: 0, grass: 0, sand: 0, ice: 0, difficult: 0, pit: 0, door: 0, total: 0 };
  for (const row of terrain) {
    for (const cell of row) {
      counts.total++;
      if (cell === 'floor' || cell === 'stone') counts.floor++;
      else if (cell === 'wall') counts.wall++;
      else if (cell === 'water') counts.water++;
      else if (cell === 'lava') counts.lava++;
      else if (cell === 'grass' || cell === 'forest') counts.grass++;
      else if (cell === 'sand') counts.sand++;
      else if (cell === 'ice' || cell === 'snow') counts.ice++;
      else if (cell === 'difficult') counts.difficult++;
      else if (cell === 'pit') counts.pit++;
      else if (cell === 'door') counts.door++;
    }
  }
  return counts;
}

const DUNGEON_DESCS = [
  'The air is damp and cold. Moss clings to the stone walls, and water drips from the ceiling.',
  'Torchlight flickers across ancient stonework. The passage narrows ahead.',
  'Cobwebs stretch between pillars. Something scuttles in the darkness beyond your torchlight.',
  'The floor is worn smooth by centuries of passage. Faded carvings line the walls.',
];

const OUTDOOR_DESCS = [
  'Wind rustles through the undergrowth. Dappled sunlight filters through the canopy.',
  'An open clearing stretches before you. Birds fall silent as you approach.',
  'The terrain is rough and overgrown. Animal trails wind between thick brush.',
];

const LAVA_DESCS = [
  'The heat is oppressive. Rivers of molten rock cast an orange glow on everything.',
  'Volcanic vents hiss and bubble. The air shimmers with heat.',
];

const ICE_DESCS = [
  'Everything is coated in frost. Your breath forms thick clouds in the frigid air.',
  'Ice crystals sparkle on every surface. The cold seeps through your armor.',
];

const WATER_DESCS = [
  'Water laps against stone edges. The chamber is partially flooded.',
  'An underground stream cuts through the room. The water is dark and still.',
];

export function generateRoomDescription(terrain: TerrainType[][]): string {
  const counts = countTerrain(terrain);
  if (counts.total === 0) return 'An empty void stretches before you.';

  const pct = (c: number) => c / counts.total;

  if (pct(counts.lava) > 0.1) return LAVA_DESCS[Math.floor(Math.random() * LAVA_DESCS.length)];
  if (pct(counts.ice) > 0.1) return ICE_DESCS[Math.floor(Math.random() * ICE_DESCS.length)];
  if (pct(counts.water) > 0.15) return WATER_DESCS[Math.floor(Math.random() * WATER_DESCS.length)];
  if (pct(counts.grass) > 0.3) return OUTDOOR_DESCS[Math.floor(Math.random() * OUTDOOR_DESCS.length)];

  const extras: string[] = [];
  if (counts.door > 0) extras.push(`You spot ${counts.door} door${counts.door > 1 ? 's' : ''} leading out.`);
  if (counts.pit > 0) extras.push('A dark pit yawns open in the floor — watch your step.');
  if (counts.difficult > 0) extras.push('Rubble and debris make the footing treacherous.');

  const base = DUNGEON_DESCS[Math.floor(Math.random() * DUNGEON_DESCS.length)];
  return extras.length > 0 ? `${base} ${extras.join(' ')}` : base;
}
