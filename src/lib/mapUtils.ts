// Shared map types and spatial utilities used by GameContext, BattleMap, and Game.tsx

export type TerrainType = 'floor' | 'wall' | 'water' | 'difficult' | 'door' | 'pit' | 'void';

export interface TokenPosition {
  unitId: string;
  col: number;
  row: number;
}

export const DEFAULT_COLS = 24;
export const DEFAULT_ROWS = 18;

// Terrain movement costs (in cells): Infinity = impassable
export const TERRAIN_COST: Record<TerrainType, number> = {
  floor: 1, door: 1, pit: 1,
  water: 2, difficult: 2,
  wall: Infinity, void: Infinity,
};

// BFS to compute cells reachable within a movement budget, respecting terrain costs
export function computeReachableCells(
  terrain: TerrainType[][],
  startCol: number,
  startRow: number,
  maxMovement: number,
  rows: number,
  cols: number,
): Map<string, number> {
  const reachable = new Map<string, number>();
  const key = (c: number, r: number) => `${c},${r}`;
  reachable.set(key(startCol, startRow), 0);

  const queue: { col: number; row: number; cost: number }[] = [{ col: startCol, row: startRow, cost: 0 }];

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift()!;

    const neighbors = [
      { col: current.col - 1, row: current.row },
      { col: current.col + 1, row: current.row },
      { col: current.col, row: current.row - 1 },
      { col: current.col, row: current.row + 1 },
    ];

    for (const n of neighbors) {
      if (n.col < 0 || n.col >= cols || n.row < 0 || n.row >= rows) continue;
      const terrainType = terrain[n.row]?.[n.col];
      if (!terrainType) continue;
      const moveCost = TERRAIN_COST[terrainType];
      if (!isFinite(moveCost)) continue;

      const totalCost = current.cost + moveCost;
      if (totalCost > maxMovement) continue;

      const k = key(n.col, n.row);
      const existing = reachable.get(k);
      if (existing !== undefined && existing <= totalCost) continue;

      reachable.set(k, totalCost);
      queue.push({ col: n.col, row: n.row, cost: totalCost });
    }
  }

  return reachable;
}

// Find the reachable cell closest to a target (for enemy AI movement)
export function findBestMoveToward(
  terrain: TerrainType[][],
  startCol: number,
  startRow: number,
  targetCol: number,
  targetRow: number,
  maxMovement: number,
  rows: number,
  cols: number,
): { col: number; row: number; cost: number } | null {
  const reachable = computeReachableCells(terrain, startCol, startRow, maxMovement, rows, cols);
  let bestCell: { col: number; row: number; cost: number } | null = null;
  let bestDist = Infinity;

  reachable.forEach((cost, key) => {
    const [cStr, rStr] = key.split(',');
    const c = parseInt(cStr, 10);
    const r = parseInt(rStr, 10);
    // Chebyshev distance (allows diagonal proximity)
    const dist = Math.max(Math.abs(c - targetCol), Math.abs(r - targetRow));
    if (dist < bestDist || (dist === bestDist && cost < (bestCell?.cost ?? Infinity))) {
      bestDist = dist;
      bestCell = { col: c, row: r, cost };
    }
  });

  return bestCell;
}

// Check if two positions are adjacent (Chebyshev distance <= 1, i.e. including diagonals)
export function isAdjacent(col1: number, row1: number, col2: number, row2: number): boolean {
  return Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2)) <= 1;
}
