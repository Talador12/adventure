// Dungeon room templates — pre-built room layouts for common encounter types.
// DM picks a template; terrain grid + description are auto-generated.

import type { TerrainType } from '../lib/mapUtils';

export type RoomType = 'treasure' | 'boss_arena' | 'puzzle_chamber' | 'ambush_corridor' | 'throne_room' | 'prison_cells' | 'alchemy_lab' | 'library';

export interface RoomTemplate {
  id: string;
  name: string;
  type: RoomType;
  emoji: string;
  description: string;
  width: number;
  height: number;
  terrain: TerrainType[][];
  suggestedEnemies: string[];
  lootTier: 'low' | 'medium' | 'high';
  features: string[];
}

function fillGrid(w: number, h: number, fill: TerrainType): TerrainType[][] {
  return Array.from({ length: h }, () => Array(w).fill(fill));
}

function setCell(grid: TerrainType[][], row: number, col: number, type: TerrainType): void {
  if (grid[row]?.[col] !== undefined) grid[row][col] = type;
}

function wallBorder(grid: TerrainType[][]): void {
  const h = grid.length; const w = grid[0]?.length || 0;
  for (let r = 0; r < h; r++) { setCell(grid, r, 0, 'wall'); setCell(grid, r, w - 1, 'wall'); }
  for (let c = 0; c < w; c++) { setCell(grid, 0, c, 'wall'); setCell(grid, h - 1, c, 'wall'); }
}

function buildTreasureRoom(): TerrainType[][] {
  const g = fillGrid(10, 8, 'floor');
  wallBorder(g);
  setCell(g, 0, 4, 'door'); setCell(g, 0, 5, 'door'); // entrance
  // Pillars
  setCell(g, 2, 2, 'wall'); setCell(g, 2, 7, 'wall');
  setCell(g, 5, 2, 'wall'); setCell(g, 5, 7, 'wall');
  // Water feature in center
  setCell(g, 3, 4, 'water'); setCell(g, 3, 5, 'water');
  setCell(g, 4, 4, 'water'); setCell(g, 4, 5, 'water');
  return g;
}

function buildBossArena(): TerrainType[][] {
  const g = fillGrid(14, 12, 'floor');
  wallBorder(g);
  setCell(g, 0, 6, 'door'); setCell(g, 0, 7, 'door'); // entrance
  // Lava moat around boss platform
  for (let c = 4; c <= 9; c++) { setCell(g, 3, c, 'lava'); setCell(g, 8, c, 'lava'); }
  for (let r = 3; r <= 8; r++) { setCell(g, r, 4, 'lava'); setCell(g, r, 9, 'lava'); }
  // Boss platform (floor inside lava)
  for (let r = 4; r <= 7; r++) for (let c = 5; c <= 8; c++) setCell(g, r, c, 'floor');
  // Bridges
  setCell(g, 5, 4, 'floor'); setCell(g, 5, 9, 'floor'); // side bridges
  // Pillars
  setCell(g, 2, 2, 'wall'); setCell(g, 2, 11, 'wall');
  setCell(g, 9, 2, 'wall'); setCell(g, 9, 11, 'wall');
  return g;
}

function buildPuzzleChamber(): TerrainType[][] {
  const g = fillGrid(10, 10, 'floor');
  wallBorder(g);
  setCell(g, 0, 4, 'door'); setCell(g, 0, 5, 'door');
  // Internal walls creating maze-like paths
  for (let c = 2; c <= 5; c++) setCell(g, 3, c, 'wall');
  for (let c = 4; c <= 7; c++) setCell(g, 6, c, 'wall');
  // Pit traps
  setCell(g, 4, 3, 'pit'); setCell(g, 7, 6, 'pit');
  // Pressure plate areas (difficult terrain)
  setCell(g, 2, 7, 'difficult'); setCell(g, 5, 2, 'difficult');
  return g;
}

function buildAmbushCorridor(): TerrainType[][] {
  const g = fillGrid(16, 6, 'floor');
  wallBorder(g);
  setCell(g, 0, 1, 'door'); // entrance left
  setCell(g, 0, 14, 'door'); // exit right
  // Alcoves for hiding enemies
  setCell(g, 2, 4, 'wall'); setCell(g, 3, 4, 'wall');
  setCell(g, 2, 7, 'wall'); setCell(g, 3, 7, 'wall');
  setCell(g, 2, 10, 'wall'); setCell(g, 3, 10, 'wall');
  // Difficult terrain (rubble)
  setCell(g, 2, 8, 'difficult'); setCell(g, 3, 5, 'difficult');
  return g;
}

function buildThroneRoom(): TerrainType[][] {
  const g = fillGrid(12, 10, 'floor');
  wallBorder(g);
  setCell(g, 0, 5, 'door'); setCell(g, 0, 6, 'door');
  // Throne platform (raised, difficult terrain stepping up)
  for (let c = 4; c <= 7; c++) setCell(g, 7, c, 'difficult');
  for (let c = 5; c <= 6; c++) setCell(g, 8, c, 'floor'); // throne
  // Pillars down the sides
  for (let r = 2; r <= 6; r += 2) { setCell(g, r, 2, 'wall'); setCell(g, r, 9, 'wall'); }
  // Red carpet (floor, but described)
  return g;
}

function buildPrisonCells(): TerrainType[][] {
  const g = fillGrid(12, 8, 'floor');
  wallBorder(g);
  setCell(g, 0, 5, 'door'); setCell(g, 0, 6, 'door');
  // Cell walls
  for (let r = 2; r <= 6; r++) { setCell(g, r, 3, 'wall'); setCell(g, r, 8, 'wall'); }
  // Cell doors
  setCell(g, 3, 3, 'door'); setCell(g, 5, 3, 'door');
  setCell(g, 3, 8, 'door'); setCell(g, 5, 8, 'door');
  // Dividers between cells
  for (let c = 1; c <= 2; c++) setCell(g, 4, c, 'wall');
  for (let c = 9; c <= 10; c++) setCell(g, 4, c, 'wall');
  return g;
}

export const ROOM_TEMPLATES: RoomTemplate[] = [
  {
    id: 'treasure', name: 'Treasure Vault', type: 'treasure', emoji: '💰',
    description: 'A pillared chamber with a central fountain and treasure chests lining the far wall.',
    width: 10, height: 8, terrain: buildTreasureRoom(),
    suggestedEnemies: ['Mimic', 'Animated Armor', 'Trap'],
    lootTier: 'high', features: ['4 pillars', 'Central fountain', 'Locked chests'],
  },
  {
    id: 'boss', name: 'Boss Arena', type: 'boss_arena', emoji: '👑',
    description: 'A grand arena with a lava moat surrounding a raised platform. Bridges provide risky access.',
    width: 14, height: 12, terrain: buildBossArena(),
    suggestedEnemies: ['Boss monster', 'Elite guard', 'Summoned creature'],
    lootTier: 'high', features: ['Lava moat', '2 bridges', 'Boss platform', '4 pillars'],
  },
  {
    id: 'puzzle', name: 'Puzzle Chamber', type: 'puzzle_chamber', emoji: '🧩',
    description: 'Walls form shifting paths with concealed pits and pressure plates. Solve the pattern to proceed.',
    width: 10, height: 10, terrain: buildPuzzleChamber(),
    suggestedEnemies: ['Golem', 'Spectator'],
    lootTier: 'medium', features: ['Maze walls', '2 pit traps', 'Pressure plates'],
  },
  {
    id: 'ambush', name: 'Ambush Corridor', type: 'ambush_corridor', emoji: '🏹',
    description: 'A narrow corridor with alcoves perfect for hiding enemies. Rubble slows movement.',
    width: 16, height: 6, terrain: buildAmbushCorridor(),
    suggestedEnemies: ['Goblin archer', 'Kobold', 'Shadow'],
    lootTier: 'low', features: ['3 alcoves', 'Rubble (difficult terrain)', 'Narrow passage'],
  },
  {
    id: 'throne', name: 'Throne Room', type: 'throne_room', emoji: '🏰',
    description: 'A regal chamber with pillared walkways leading to a raised throne dais.',
    width: 12, height: 10, terrain: buildThroneRoom(),
    suggestedEnemies: ['Warlord', 'Royal guard', 'Advisor (spellcaster)'],
    lootTier: 'high', features: ['6 pillars', 'Raised dais', 'Red carpet'],
  },
  {
    id: 'prison', name: 'Prison Cells', type: 'prison_cells', emoji: '⛓️',
    description: 'A block of cells with heavy doors. Prisoners or undead may lurk within.',
    width: 12, height: 8, terrain: buildPrisonCells(),
    suggestedEnemies: ['Zombie', 'Skeleton', 'Imprisoned NPC'],
    lootTier: 'low', features: ['4 cells', 'Heavy doors', 'Divider walls'],
  },
];

export function getRoomTemplate(id: string): RoomTemplate | undefined {
  return ROOM_TEMPLATES.find((r) => r.id === id);
}

export function formatRoomDescription(room: RoomTemplate): string {
  return `${room.emoji} **${room.name}** (${room.width}×${room.height})\n${room.description}\nFeatures: ${room.features.join(', ')}\nSuggested enemies: ${room.suggestedEnemies.join(', ')}\nLoot tier: ${room.lootTier}`;
}
