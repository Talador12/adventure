// Procedural dungeon generator using Binary Space Partitioning (BSP).
// Generates random room + corridor layouts on a grid.

import type { TerrainType } from './mapUtils';

interface Rect { x: number; y: number; w: number; h: number; }
interface BSPNode { rect: Rect; left?: BSPNode; right?: BSPNode; room?: Rect; }

const MIN_ROOM_SIZE = 3;
const MIN_LEAF_SIZE = 5;

function splitNode(node: BSPNode, rng: () => number): void {
  if (node.rect.w < MIN_LEAF_SIZE * 2 && node.rect.h < MIN_LEAF_SIZE * 2) return;

  // Decide split direction based on aspect ratio + randomness
  const splitH = node.rect.w > node.rect.h ? rng() > 0.3 : rng() > 0.7;

  if (splitH && node.rect.w >= MIN_LEAF_SIZE * 2) {
    const split = MIN_LEAF_SIZE + Math.floor(rng() * (node.rect.w - MIN_LEAF_SIZE * 2));
    node.left = { rect: { x: node.rect.x, y: node.rect.y, w: split, h: node.rect.h } };
    node.right = { rect: { x: node.rect.x + split, y: node.rect.y, w: node.rect.w - split, h: node.rect.h } };
  } else if (node.rect.h >= MIN_LEAF_SIZE * 2) {
    const split = MIN_LEAF_SIZE + Math.floor(rng() * (node.rect.h - MIN_LEAF_SIZE * 2));
    node.left = { rect: { x: node.rect.x, y: node.rect.y, w: node.rect.w, h: split } };
    node.right = { rect: { x: node.rect.x, y: node.rect.y + split, w: node.rect.w, h: node.rect.h - split } };
  } else {
    return;
  }

  splitNode(node.left, rng);
  splitNode(node.right, rng);
}

function placeRooms(node: BSPNode, rng: () => number): void {
  if (node.left && node.right) {
    placeRooms(node.left, rng);
    placeRooms(node.right, rng);
    return;
  }
  // Leaf node — place a room inside the rect
  const rw = MIN_ROOM_SIZE + Math.floor(rng() * (node.rect.w - MIN_ROOM_SIZE));
  const rh = MIN_ROOM_SIZE + Math.floor(rng() * (node.rect.h - MIN_ROOM_SIZE));
  const rx = node.rect.x + Math.floor(rng() * (node.rect.w - rw));
  const ry = node.rect.y + Math.floor(rng() * (node.rect.h - rh));
  node.room = { x: rx, y: ry, w: rw, h: rh };
}

function getRoom(node: BSPNode): Rect | null {
  if (node.room) return node.room;
  if (node.left) {
    const lr = getRoom(node.left);
    if (lr) return lr;
  }
  if (node.right) {
    const rr = getRoom(node.right);
    if (rr) return rr;
  }
  return null;
}

function connectRooms(grid: TerrainType[][], a: Rect, b: Rect, rng: () => number): void {
  // Connect center of room A to center of room B with an L-shaped corridor
  const ax = Math.floor(a.x + a.w / 2);
  const ay = Math.floor(a.y + a.h / 2);
  const bx = Math.floor(b.x + b.w / 2);
  const by = Math.floor(b.y + b.h / 2);

  // Randomly choose horizontal-first or vertical-first
  if (rng() > 0.5) {
    carveHCorridor(grid, ax, bx, ay);
    carveVCorridor(grid, ay, by, bx);
  } else {
    carveVCorridor(grid, ay, by, ax);
    carveHCorridor(grid, ax, bx, by);
  }
}

function carveHCorridor(grid: TerrainType[][], x1: number, x2: number, y: number): void {
  const rows = grid.length;
  const cols = grid[0].length;
  for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
    if (y >= 0 && y < rows && x >= 0 && x < cols) grid[y][x] = 'floor';
  }
}

function carveVCorridor(grid: TerrainType[][], y1: number, y2: number, x: number): void {
  const rows = grid.length;
  const cols = grid[0].length;
  for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
    if (y >= 0 && y < rows && x >= 0 && x < cols) grid[y][x] = 'floor';
  }
}

function connectTree(grid: TerrainType[][], node: BSPNode, rng: () => number): void {
  if (!node.left || !node.right) return;
  connectTree(grid, node.left, rng);
  connectTree(grid, node.right, rng);
  const roomA = getRoom(node.left);
  const roomB = getRoom(node.right);
  if (roomA && roomB) connectRooms(grid, roomA, roomB, rng);
}

// Add doors at room entrances (where a corridor cell meets a room edge)
function placeDoors(grid: TerrainType[][], rooms: Rect[]): void {
  const rows = grid.length;
  const cols = grid[0].length;
  for (const room of rooms) {
    // Check each edge cell of the room for corridor adjacency
    for (let x = room.x; x < room.x + room.w; x++) {
      // Top edge
      if (room.y > 0 && grid[room.y - 1]?.[x] === 'floor' && grid[room.y][x] === 'floor') {
        grid[room.y][x] = 'door';
      }
      // Bottom edge
      const by = room.y + room.h - 1;
      if (by + 1 < rows && grid[by + 1]?.[x] === 'floor' && grid[by][x] === 'floor') {
        grid[by][x] = 'door';
      }
    }
    for (let y = room.y; y < room.y + room.h; y++) {
      // Left edge
      if (room.x > 0 && grid[y]?.[room.x - 1] === 'floor' && grid[y][room.x] === 'floor') {
        grid[y][room.x] = 'door';
      }
      // Right edge
      const rx = room.x + room.w - 1;
      if (rx + 1 < cols && grid[y]?.[rx + 1] === 'floor' && grid[y][rx] === 'floor') {
        grid[y][rx] = 'door';
      }
    }
  }
}

function collectRooms(node: BSPNode): Rect[] {
  const rooms: Rect[] = [];
  if (node.room) rooms.push(node.room);
  if (node.left) rooms.push(...collectRooms(node.left));
  if (node.right) rooms.push(...collectRooms(node.right));
  return rooms;
}

/** Generate a procedural dungeon. Returns a 2D terrain grid. */
export function generateDungeon(rows = 20, cols = 20, seed?: number): TerrainType[][] {
  // Simple seeded RNG (mulberry32)
  let s = seed ?? Math.floor(Math.random() * 2147483647);
  const rng = (): number => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };

  // Start with all walls
  const grid: TerrainType[][] = Array.from({ length: rows }, () => Array(cols).fill('wall'));

  // BSP tree
  const root: BSPNode = { rect: { x: 1, y: 1, w: cols - 2, h: rows - 2 } };
  splitNode(root, rng);
  placeRooms(root, rng);

  // Carve rooms into the grid
  const rooms = collectRooms(root);
  for (const room of rooms) {
    for (let y = room.y; y < room.y + room.h && y < rows; y++) {
      for (let x = room.x; x < room.x + room.w && x < cols; x++) {
        grid[y][x] = 'floor';
      }
    }
  }

  // Connect rooms via corridors
  connectTree(grid, root, rng);

  // Place doors at room entrances
  placeDoors(grid, rooms);

  // Scatter a few pits and water features for variety
  for (let i = 0; i < 3; i++) {
    const r = rooms[Math.floor(rng() * rooms.length)];
    const px = r.x + 1 + Math.floor(rng() * Math.max(1, r.w - 2));
    const py = r.y + 1 + Math.floor(rng() * Math.max(1, r.h - 2));
    if (py < rows && px < cols && grid[py][px] === 'floor') {
      grid[py][px] = rng() > 0.5 ? 'pit' : 'water';
    }
  }

  return grid;
}
