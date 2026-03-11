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

// Chebyshev distance between two grid positions (diagonals count as 1)
export function chebyshevDistance(col1: number, row1: number, col2: number, row2: number): number {
  return Math.max(Math.abs(col1 - col2), Math.abs(row1 - row2));
}

// Bresenham line-of-sight: returns true if no wall/void blocks the path between two cells
export function hasLineOfSight(
  terrain: TerrainType[][],
  col1: number,
  row1: number,
  col2: number,
  row2: number,
): boolean {
  // Same cell always has LOS
  if (col1 === col2 && row1 === row2) return true;

  // Bresenham's line algorithm — walk every cell on the line
  let x0 = col1, y0 = row1;
  const x1 = col2, y1 = row2;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    // Skip start and end cells — only intermediate cells block LOS
    if (!(x0 === col1 && y0 === row1) && !(x0 === col2 && y0 === row2)) {
      const cell = terrain[y0]?.[x0];
      if (!cell || cell === 'wall' || cell === 'void') return false;
    }
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
  return true;
}

// Parse a D&D range string to cells (1 cell = 5ft). "Touch" = 1, "Self" = 0
export function parseRangeFt(rangeStr: string): number {
  if (!rangeStr) return 0;
  const lower = rangeStr.toLowerCase().trim();
  if (lower === 'self') return 0;
  if (lower === 'touch') return 1;
  // Match patterns like "60ft", "120 ft", "150/600ft" (use short range)
  const match = lower.match(/^(\d+)/);
  if (match) return Math.max(1, Math.floor(parseInt(match[1], 10) / 5));
  return 0;
}

// D&D 5e Opportunity Attack: find units that can make an OA against a moving unit.
// A unit triggers an OA when it leaves an enemy's melee reach (adjacency) without Disengaging.
// Returns array of { unitId, unitName } for units that were adjacent at old position but not at new position,
// that are alive (hp > 0), have not used their reaction, and are not stunned.
export interface OACandidate {
  unitId: string;
  name: string;
  attackBonus: number;
  damageDie: string;
  damageBonus: number;
}

export function findOpportunityAttackers(
  movingUnitId: string,
  movingUnitType: 'player' | 'enemy' | 'npc',
  oldCol: number, oldRow: number,
  newCol: number, newRow: number,
  allUnits: { id: string; name: string; type: string; hp: number; reactionUsed: boolean; disengaged: boolean; attackBonus?: number; damageDie?: string; damageBonus?: number; conditions?: { type: string }[] }[],
  allPositions: TokenPosition[],
): OACandidate[] {
  // Disengaged units don't trigger OAs
  const movingUnit = allUnits.find((u) => u.id === movingUnitId);
  if (movingUnit?.disengaged) return [];

  // Only opposing units can make OAs
  const opposingType = movingUnitType === 'player' ? 'enemy' : 'player';
  const candidates: OACandidate[] = [];

  for (const unit of allUnits) {
    if (unit.id === movingUnitId) continue;
    if (unit.type !== opposingType) continue;
    if (unit.hp <= 0) continue;
    if (unit.reactionUsed) continue;
    // Stunned creatures can't take reactions
    if (unit.conditions?.some((c) => c.type === 'stunned')) continue;

    const pos = allPositions.find((p) => p.unitId === unit.id);
    if (!pos) continue;

    // Was adjacent at old position, NOT adjacent at new position
    const wasAdj = isAdjacent(oldCol, oldRow, pos.col, pos.row);
    const stillAdj = isAdjacent(newCol, newRow, pos.col, pos.row);
    if (wasAdj && !stillAdj) {
      candidates.push({
        unitId: unit.id,
        name: unit.name,
        attackBonus: unit.attackBonus || 0,
        damageDie: unit.damageDie || '1d4',
        damageBonus: unit.damageBonus || 0,
      });
    }
  }
  return candidates;
}
