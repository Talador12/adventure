// BattleMap — canvas-based tactical grid with terrain, procedural dungeon generation,
// vision-based fog of war, DM tools, and zoom/pan support.
import { useRef, useEffect, useState, useCallback, type MouseEvent as ReactMouseEvent, type WheelEvent as ReactWheelEvent } from 'react';
import { useGame, type Unit, type ConditionType } from '../../contexts/GameContext';
import { type TerrainType, type TokenPosition, DEFAULT_COLS, DEFAULT_ROWS, TERRAIN_COST, computeReachableCells } from '../../lib/mapUtils';

const CELL_SIZE = 48;
const TOKEN_RADIUS = 18;
const VISION_RADIUS = 6; // cells (30ft in D&D)
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.0;

const TERRAIN_COLORS: Record<TerrainType, { fill: string; stroke?: string; pattern?: string }> = {
  void:      { fill: '#0f172a' },
  floor:     { fill: '#1e293b' },
  wall:      { fill: '#475569', stroke: '#64748b' },
  water:     { fill: '#1e3a5f', stroke: '#2563eb', pattern: 'wave' },
  difficult: { fill: '#2d1f0e', stroke: '#92400e', pattern: 'cross' },
  door:      { fill: '#92400e', stroke: '#d97706' },
  pit:       { fill: '#0c0a09', stroke: '#44403c' },
};

// Condition colors for token indicator pips (matches CONDITION_EFFECTS color scheme)
const CONDITION_COLORS: Record<string, string> = {
  poisoned: '#4ade80',   // green
  stunned: '#fde047',    // yellow
  frightened: '#c084fc',  // purple
  blessed: '#38bdf8',    // sky blue
  hexed: '#e879f9',      // fuchsia
  burning: '#fb923c',    // orange
  prone: '#d97706',      // amber
};

// --- Hidden trap system ---
interface Trap {
  id: string;
  col: number;
  row: number;
  type: 'spike' | 'fire' | 'poison' | 'alarm';
  detected: boolean;  // player spotted it
  triggered: boolean; // already went off
}

const TRAP_TEMPLATES: Record<Trap['type'], { damage: string; condition?: ConditionType; conditionDuration?: number; description: string; color: string }> = {
  spike:  { damage: '1d6', description: 'Spike Trap', color: '#94a3b8' },
  fire:   { damage: '2d6', condition: 'burning', conditionDuration: 2, description: 'Fire Trap', color: '#fb923c' },
  poison: { damage: '1d4', condition: 'poisoned', conditionDuration: 3, description: 'Poison Dart Trap', color: '#4ade80' },
  alarm:  { damage: '0', description: 'Alarm Trap (alerts enemies)', color: '#fde047' },
};

function rollTrapDamage(formula: string): number {
  if (formula === '0') return 0;
  const match = formula.match(/^(\d+)d(\d+)$/);
  if (!match) return 0;
  const [, count, sides] = match;
  let total = 0;
  for (let i = 0; i < parseInt(count, 10); i++) {
    total += Math.floor(Math.random() * parseInt(sides, 10)) + 1;
  }
  return total;
}

// --- Procedural dungeon generation ---
interface Room {
  x: number; y: number; w: number; h: number;
}

function generateDungeon(cols: number, rows: number): TerrainType[][] {
  const grid: TerrainType[][] = Array.from({ length: rows }, () => Array(cols).fill('void'));

  // Place 5-9 rooms
  const rooms: Room[] = [];
  const numRooms = 5 + Math.floor(Math.random() * 5);
  const attempts = numRooms * 15;

  for (let a = 0; a < attempts && rooms.length < numRooms; a++) {
    const w = 3 + Math.floor(Math.random() * 5); // 3-7 wide
    const h = 3 + Math.floor(Math.random() * 4); // 3-6 tall
    const x = 1 + Math.floor(Math.random() * (cols - w - 2));
    const y = 1 + Math.floor(Math.random() * (rows - h - 2));

    // Check overlap (with 1-cell buffer)
    const overlaps = rooms.some((r) =>
      x - 1 < r.x + r.w && x + w + 1 > r.x && y - 1 < r.y + r.h && y + h + 1 > r.y
    );
    if (overlaps) continue;

    rooms.push({ x, y, w, h });

    // Carve room — floor interior, wall border
    for (let ry = y - 1; ry <= y + h; ry++) {
      for (let rx = x - 1; rx <= x + w; rx++) {
        if (ry < 0 || ry >= rows || rx < 0 || rx >= cols) continue;
        const isInterior = rx >= x && rx < x + w && ry >= y && ry < y + h;
        if (isInterior) {
          grid[ry][rx] = 'floor';
        } else if (grid[ry][rx] === 'void') {
          grid[ry][rx] = 'wall';
        }
      }
    }
  }

  // Connect rooms with corridors (L-shaped)
  for (let i = 1; i < rooms.length; i++) {
    const a = rooms[i - 1];
    const b = rooms[i];
    const ax = Math.floor(a.x + a.w / 2);
    const ay = Math.floor(a.y + a.h / 2);
    const bx = Math.floor(b.x + b.w / 2);
    const by = Math.floor(b.y + b.h / 2);

    // Horizontal then vertical (or vice versa, randomly)
    const horizontalFirst = Math.random() > 0.5;
    const carve = (cx: number, cy: number) => {
      if (cy >= 0 && cy < rows && cx >= 0 && cx < cols) {
        if (grid[cy][cx] === 'void' || grid[cy][cx] === 'wall') {
          grid[cy][cx] = 'floor';
        }
        // Add walls around corridor
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = cy + dy;
            const nx = cx + dx;
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] === 'void') {
              grid[ny][nx] = 'wall';
            }
          }
        }
      }
    };

    if (horizontalFirst) {
      const stepX = ax < bx ? 1 : -1;
      for (let cx = ax; cx !== bx; cx += stepX) carve(cx, ay);
      const stepY = ay < by ? 1 : -1;
      for (let cy = ay; cy !== by + stepY; cy += stepY) carve(bx, cy);
    } else {
      const stepY = ay < by ? 1 : -1;
      for (let cy = ay; cy !== by; cy += stepY) carve(ax, cy);
      const stepX = ax < bx ? 1 : -1;
      for (let cx = ax; cx !== bx + stepX; cx += stepX) carve(cx, by);
    }
  }

  // Add doors at corridor-room transitions (heuristic: wall adjacent to 2+ floors in a line)
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (grid[r][c] !== 'wall') continue;
      // Horizontal door: floor-wall-floor
      const hDoor = grid[r][c - 1] === 'floor' && grid[r][c + 1] === 'floor' &&
                     (grid[r - 1][c] === 'wall' || grid[r - 1][c] === 'void') &&
                     (grid[r + 1][c] === 'wall' || grid[r + 1][c] === 'void');
      // Vertical door: floor-wall-floor
      const vDoor = grid[r - 1][c] === 'floor' && grid[r + 1][c] === 'floor' &&
                     (grid[r][c - 1] === 'wall' || grid[r][c - 1] === 'void') &&
                     (grid[r][c + 1] === 'wall' || grid[r][c + 1] === 'void');
      if ((hDoor || vDoor) && Math.random() < 0.3) {
        grid[r][c] = 'door';
      }
    }
  }

  // Scatter hazards in some rooms
  for (const room of rooms) {
    if (Math.random() < 0.3) {
      // Water pool
      const wx = room.x + 1 + Math.floor(Math.random() * Math.max(1, room.w - 2));
      const wy = room.y + 1 + Math.floor(Math.random() * Math.max(1, room.h - 2));
      if (grid[wy]?.[wx] === 'floor') grid[wy][wx] = 'water';
      // Expand pool
      for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        if (Math.random() < 0.4 && grid[wy + dy]?.[wx + dx] === 'floor') {
          grid[wy + dy][wx + dx] = 'water';
        }
      }
    }
    if (Math.random() < 0.2) {
      // Difficult terrain (rubble)
      const dx = room.x + Math.floor(Math.random() * room.w);
      const dy = room.y + Math.floor(Math.random() * room.h);
      if (grid[dy]?.[dx] === 'floor') grid[dy][dx] = 'difficult';
    }
  }

  return grid;
}

// Find a walkable cell in the first room (for spawning players)
function findSpawnPoints(terrain: TerrainType[][], count: number, side: 'left' | 'right'): { col: number; row: number }[] {
  const rows = terrain.length;
  const cols = terrain[0]?.length || 0;
  const points: { col: number; row: number }[] = [];
  const half = Math.floor(cols / 2);

  // Scan for floor tiles on the specified side
  const startC = side === 'left' ? 0 : half;
  const endC = side === 'left' ? half : cols;

  for (let r = 0; r < rows && points.length < count; r++) {
    for (let c = startC; c < endC && points.length < count; c++) {
      if (terrain[r][c] === 'floor') {
        // Ensure no duplicate positions
        if (!points.some((p) => p.col === c && p.row === r)) {
          points.push({ col: c, row: r });
        }
      }
    }
  }
  return points;
}

// --- Vision / Fog of War ---
// Simple raycasting: a cell is visible if there's a clear line from a player token
// to the cell center without passing through a wall.
function computeVisibility(
  terrain: TerrainType[][],
  playerPositions: { col: number; row: number }[],
  rows: number,
  cols: number,
  visionRadius: number,
  isDM: boolean,
): boolean[][] {
  // DM sees everything
  if (isDM) return Array.from({ length: rows }, () => Array(cols).fill(true));

  const visible: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (const pp of playerPositions) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.sqrt((r - pp.row) ** 2 + (c - pp.col) ** 2);
        if (dist > visionRadius) continue;
        if (visible[r][c]) continue; // already visible

        // Bresenham line from player to cell — check for walls
        let blocked = false;
        const steps = Math.max(Math.abs(c - pp.col), Math.abs(r - pp.row));
        if (steps === 0) { visible[r][c] = true; continue; }

        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          const mr = Math.round(pp.row + t * (r - pp.row));
          const mc = Math.round(pp.col + t * (c - pp.col));
          if (terrain[mr]?.[mc] === 'wall') { blocked = true; break; }
        }

        if (!blocked) visible[r][c] = true;
      }
    }
  }

  return visible;
}

// --- Terrain drawing helpers ---
function drawTerrainCell(ctx: CanvasRenderingContext2D, c: number, r: number, terrain: TerrainType, cellSize: number) {
  const x = c * cellSize;
  const y = r * cellSize;
  const t = TERRAIN_COLORS[terrain];

  ctx.fillStyle = t.fill;
  ctx.fillRect(x, y, cellSize, cellSize);

  if (t.stroke) {
    ctx.strokeStyle = t.stroke;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
  }

  // Patterns
  if (t.pattern === 'wave') {
    ctx.strokeStyle = 'rgba(59,130,246,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const wy = y + 12 + i * 12;
      ctx.moveTo(x + 4, wy);
      ctx.quadraticCurveTo(x + cellSize * 0.25, wy - 5, x + cellSize * 0.5, wy);
      ctx.quadraticCurveTo(x + cellSize * 0.75, wy + 5, x + cellSize - 4, wy);
    }
    ctx.stroke();
  }

  if (t.pattern === 'cross') {
    ctx.strokeStyle = 'rgba(146,64,14,0.3)';
    ctx.lineWidth = 1;
    // Small hash marks for rubble
    for (let i = 0; i < 3; i++) {
      const ox = x + 8 + i * 14;
      const oy = y + 10 + (i % 2) * 12;
      ctx.beginPath();
      ctx.moveTo(ox - 3, oy - 3); ctx.lineTo(ox + 3, oy + 3);
      ctx.moveTo(ox + 3, oy - 3); ctx.lineTo(ox - 3, oy + 3);
      ctx.stroke();
    }
  }

  // Door: draw a rectangle icon
  if (terrain === 'door') {
    ctx.fillStyle = '#d97706';
    const dw = cellSize * 0.5;
    const dh = cellSize * 0.7;
    ctx.fillRect(x + (cellSize - dw) / 2, y + (cellSize - dh) / 2, dw, dh);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + (cellSize - dw) / 2, y + (cellSize - dh) / 2, dw, dh);
    // Doorknob
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(x + cellSize / 2 + dw * 0.15, y + cellSize / 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pit: diagonal lines
  if (terrain === 'pit') {
    ctx.strokeStyle = 'rgba(68,64,60,0.5)';
    ctx.lineWidth = 1;
    for (let i = 0; i < cellSize * 2; i += 8) {
      ctx.beginPath();
      ctx.moveTo(x + i, y);
      ctx.lineTo(x, y + i);
      ctx.stroke();
    }
  }
}

function tokenColor(unit: Unit): string {
  if (unit.hp <= 0) return '#4b5563';
  switch (unit.type) {
    case 'player': return '#f59e0b';
    case 'enemy': return '#ef4444';
    case 'npc': return '#3b82f6';
    default: return '#6b7280';
  }
}

function tokenBorderColor(unit: Unit, isSelected: boolean, isCurrentTurn: boolean): string {
  if (isSelected) return '#F38020';
  if (isCurrentTurn) return '#eab308';
  return 'rgba(255,255,255,0.15)';
}

// --- Component ---
type DmTool = 'select' | 'wall' | 'floor' | 'water' | 'difficult' | 'door' | 'pit' | 'erase' | 'trap-spike' | 'trap-fire' | 'trap-poison' | 'trap-alarm';

interface BattleMapProps {
  onTokenMove?: (unitId: string, col: number, row: number) => void;
  onTerrainChange?: (terrain: TerrainType[][]) => void;
}

export default function BattleMap({ onTokenMove, onTerrainChange }: BattleMapProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { units, setUnits, selectedUnitId, setSelectedUnitId, damageUnit, applyCondition, inCombat,
    terrain, setTerrain, mapPositions: positions, setMapPositions: setPositions } = useGame();

  const [gridCols] = useState(DEFAULT_COLS);
  const [gridRows] = useState(DEFAULT_ROWS);
  const hasGeneratedRef = useRef(false);

  // Generate initial dungeon on first mount (terrain starts as void in context)
  useEffect(() => {
    if (hasGeneratedRef.current) return;
    const hasFloor = terrain.some((row) => row.some((t) => t !== 'void'));
    if (!hasFloor) {
      setTerrain(generateDungeon(gridCols, gridRows));
      hasGeneratedRef.current = true;
    }
  }, [terrain, setTerrain, gridCols, gridRows]);

  const [dragging, setDragging] = useState<{ unitId: string; offsetX: number; offsetY: number } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  // Movement range: reachable cells during drag (only in combat)
  const [reachableCells, setReachableCells] = useState<Map<string, number> | null>(null);

  // Hidden traps (DM-placed, invisible to players)
  const [traps, setTraps] = useState<Trap[]>([]);
  const [trapMessages, setTrapMessages] = useState<string[]>([]);

  // DM tools
  const [dmTool, setDmTool] = useState<DmTool>('select');
  const [dmMode, setDmMode] = useState(false); // DM sees through fog
  const [painting, setPainting] = useState(false); // mouse held for terrain painting

  // Zoom + pan
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Explored cells (persist what players have seen — stays revealed even after moving away)
  const [explored, setExplored] = useState<boolean[][]>(() =>
    Array.from({ length: DEFAULT_ROWS }, () => Array(DEFAULT_COLS).fill(false))
  );

  // Initialize token positions when units change
  useEffect(() => {
    setPositions((prev) => {
      const existing = new Set(prev.map((p) => p.unitId));
      const newPositions = [...prev.filter((p) => units.some((u) => u.id === p.unitId))];

      const newUnits = units.filter((u) => !existing.has(u.id));
      const playerSpawns = findSpawnPoints(terrain, newUnits.filter((u) => u.type === 'player').length, 'left');
      const enemySpawns = findSpawnPoints(terrain, newUnits.filter((u) => u.type !== 'player').length, 'right');

      let pi = 0;
      let ei = 0;
      for (const unit of newUnits) {
        if (unit.type === 'player') {
          const sp = playerSpawns[pi++] || { col: 2, row: 2 };
          newPositions.push({ unitId: unit.id, col: sp.col, row: sp.row });
        } else {
          const sp = enemySpawns[ei++] || { col: gridCols - 3, row: gridRows - 3 };
          newPositions.push({ unitId: unit.id, col: sp.col, row: sp.row });
        }
      }

      return newPositions;
    });
  }, [units, terrain, gridCols, gridRows]);

  // Compute visibility from player positions
  const playerPositions = positions
    .filter((p) => {
      const u = units.find((u) => u.id === p.unitId);
      return u && u.type === 'player' && u.hp > 0;
    })
    .map((p) => ({ col: p.col, row: p.row }));

  const visibility = computeVisibility(terrain, playerPositions, gridRows, gridCols, VISION_RADIUS, dmMode);

  // Update explored map as players reveal cells
  useEffect(() => {
    setExplored((prev) => {
      let changed = false;
      const next = prev.map((row, r) => row.map((explored, c) => {
        if (!explored && visibility[r]?.[c]) { changed = true; return true; }
        return explored;
      }));
      return changed ? next : prev;
    });
  }, [visibility]);

  // --- Drawing ---
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = gridCols * CELL_SIZE;
    const h = gridRows * CELL_SIZE;
    canvas.width = w;
    canvas.height = h;

    // Clear
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Draw terrain
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const isVisible = visibility[r]?.[c] ?? false;
        const wasExplored = explored[r]?.[c] ?? false;

        if (!dmMode && !isVisible && !wasExplored) continue; // completely unknown
        drawTerrainCell(ctx, c, r, terrain[r][c], CELL_SIZE);

        // Dim explored but not currently visible cells
        if (!dmMode && !isVisible && wasExplored) {
          ctx.fillStyle = 'rgba(15,23,42,0.6)';
          ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }

    // Draw traps (visible in DM mode, or when detected by players)
    traps.forEach((trap) => {
      if (trap.triggered) return; // already went off, don't render
      if (!dmMode && !trap.detected) return; // hidden from players
      const tc = TRAP_TEMPLATES[trap.type];
      const trapX = trap.col * CELL_SIZE;
      const trapY = trap.row * CELL_SIZE;
      // Warning triangle
      ctx.save();
      ctx.globalAlpha = dmMode && !trap.detected ? 0.6 : 0.9;
      const mx = trapX + CELL_SIZE / 2;
      const my = trapY + CELL_SIZE / 2;
      // Small colored diamond
      ctx.beginPath();
      ctx.moveTo(mx, my - 8);
      ctx.lineTo(mx + 6, my);
      ctx.lineTo(mx, my + 8);
      ctx.lineTo(mx - 6, my);
      ctx.closePath();
      ctx.fillStyle = tc.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Exclamation mark
      ctx.fillStyle = '#000';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('!', mx, my);
      ctx.restore();
    });

    // Movement range overlay (green tint on reachable cells when dragging)
    if (reachableCells && dragging) {
      reachableCells.forEach((_cost, key) => {
        const [cStr, rStr] = key.split(',');
        const cc = parseInt(cStr, 10);
        const rr = parseInt(rStr, 10);
        // Skip the starting cell (where the token is)
        const dragUnit = positions.find((p) => p.unitId === dragging.unitId);
        if (dragUnit && cc === dragUnit.col && rr === dragUnit.row) return;
        ctx.fillStyle = 'rgba(34,197,94,0.18)';
        ctx.fillRect(cc * CELL_SIZE, rr * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        // Subtle green border
        ctx.strokeStyle = 'rgba(34,197,94,0.35)';
        ctx.lineWidth = 1;
        ctx.strokeRect(cc * CELL_SIZE + 0.5, rr * CELL_SIZE + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
      });
    }

    // Grid lines
    ctx.strokeStyle = 'rgba(148,163,184,0.07)';
    ctx.lineWidth = 1;
    for (let c = 0; c <= gridCols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE, 0);
      ctx.lineTo(c * CELL_SIZE, h);
      ctx.stroke();
    }
    for (let r = 0; r <= gridRows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE);
      ctx.lineTo(w, r * CELL_SIZE);
      ctx.stroke();
    }

    // Draw tokens (only visible ones, unless DM mode)
    positions.forEach((pos) => {
      const unit = units.find((u) => u.id === pos.unitId);
      if (!unit) return;
      if (!dmMode && !visibility[pos.row]?.[pos.col]) return; // hidden in fog

      const isDrag = dragging?.unitId === pos.unitId && dragPos;
      const cx = isDrag ? dragPos!.x : pos.col * CELL_SIZE + CELL_SIZE / 2;
      const cy = isDrag ? dragPos!.y : pos.row * CELL_SIZE + CELL_SIZE / 2;

      const isSelected = selectedUnitId === unit.id;
      const isCurrentTurn = unit.isCurrentTurn;

      // Glow
      if (isSelected || isCurrentTurn) {
        ctx.beginPath();
        ctx.arc(cx, cy, TOKEN_RADIUS + 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(243,128,32,0.2)' : 'rgba(234,179,8,0.15)';
        ctx.fill();
      }

      // Token circle
      ctx.beginPath();
      ctx.arc(cx, cy, TOKEN_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = tokenColor(unit);
      ctx.fill();
      ctx.strokeStyle = tokenBorderColor(unit, isSelected, isCurrentTurn);
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      // Name initial
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(unit.name.charAt(0).toUpperCase(), cx, cy - 1);

      // HP bar
      if (unit.hp > 0) {
        const barW = TOKEN_RADIUS * 1.6;
        const barH = 3;
        const barX = cx - barW / 2;
        const barY = cy + TOKEN_RADIUS + 3;
        const hpPct = Math.max(0, unit.hp / unit.maxHp);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#eab308' : '#ef4444';
        ctx.fillRect(barX, barY, barW * hpPct, barH);
      } else {
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 8); ctx.lineTo(cx + 8, cy + 8);
        ctx.moveTo(cx + 8, cy - 8); ctx.lineTo(cx - 8, cy + 8);
        ctx.stroke();
      }

      // Condition indicator pips (small colored dots above token)
      const conditions = unit.conditions || [];
      if (conditions.length > 0) {
        const pipR = 3;
        const pipY = cy - TOKEN_RADIUS - 6;
        const totalW = conditions.length * (pipR * 2 + 2) - 2;
        const startX = cx - totalW / 2 + pipR;
        conditions.forEach((cond, ci) => {
          const pipX = startX + ci * (pipR * 2 + 2);
          const color = CONDITION_COLORS[cond.type] || '#94a3b8';
          // Outer glow
          ctx.beginPath();
          ctx.arc(pipX, pipY, pipR + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.fill();
          // Pip
          ctx.beginPath();
          ctx.arc(pipX, pipY, pipR, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        });
      }
    });

    // Fog of war — cover unexplored cells
    if (!dmMode) {
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          if (!explored[r]?.[c] && !visibility[r]?.[c]) {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    }

    // DM tool brush cursor (when painting terrain)
    if (dmTool !== 'select' && containerRef.current) {
      // Cursor handled via CSS
    }
  }, [terrain, positions, units, selectedUnitId, dragging, dragPos, visibility, explored, dmMode, dmTool, gridCols, gridRows, reachableCells, traps]);

  useEffect(() => { draw(); }, [draw]);

  // --- Mouse coordinate helpers ---
  const canvasCoords = useCallback((e: ReactMouseEvent<HTMLCanvasElement> | { clientX: number; clientY: number }): { x: number; y: number; col: number; row: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, col: 0, row: 0 };
    const rect = canvas.getBoundingClientRect();
    // Account for zoom: canvas is scaled via CSS transform
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y, col: Math.floor(x / CELL_SIZE), row: Math.floor(y / CELL_SIZE) };
  }, []);

  const tokenAt = useCallback((x: number, y: number): TokenPosition | null => {
    for (const pos of positions) {
      const cx = pos.col * CELL_SIZE + CELL_SIZE / 2;
      const cy = pos.row * CELL_SIZE + CELL_SIZE / 2;
      if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= TOKEN_RADIUS) return pos;
    }
    return null;
  }, [positions]);

  // --- Terrain painting ---
  const paintTerrain = useCallback((col: number, row: number) => {
    if (col < 0 || col >= gridCols || row < 0 || row >= gridRows) return;

    // Handle trap placement
    if (dmTool.startsWith('trap-')) {
      const trapType = dmTool.replace('trap-', '') as Trap['type'];
      // Don't place on walls/void or where a trap already exists
      if (terrain[row]?.[col] === 'wall' || terrain[row]?.[col] === 'void') return;
      if (traps.some((t) => t.col === col && t.row === row && !t.triggered)) return;
      setTraps((prev) => [...prev, {
        id: `trap-${crypto.randomUUID().slice(0, 8)}`,
        col, row, type: trapType, detected: false, triggered: false,
      }]);
      return;
    }

    // Erase also removes traps at the cell
    if (dmTool === 'erase') {
      setTraps((prev) => prev.filter((t) => !(t.col === col && t.row === row)));
    }

    const terrainMap: Record<string, TerrainType | null> = {
      select: null, wall: 'wall', floor: 'floor', water: 'water',
      difficult: 'difficult', door: 'door', pit: 'pit', erase: 'floor',
    };
    const target = terrainMap[dmTool];
    if (!target) return;
    setTerrain((prev) => {
      if (prev[row][col] === target) return prev;
      const next = prev.map((r) => [...r]);
      next[row][col] = target;
      // Notify parent for multiplayer sync
      onTerrainChange?.(next);
      return next;
    });
  }, [dmTool, gridCols, gridRows, terrain, traps, onTerrainChange]);

  // --- Mouse handlers ---
  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    // Middle mouse or right-click: pan
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    const { col, row, x, y } = canvasCoords(e);

    // DM terrain painting
    if (dmTool !== 'select') {
      paintTerrain(col, row);
      setPainting(true);
      return;
    }

    // Door toggle: click on a door cell with no token on it to open/close
    if (dmTool === 'select' && terrain[row]?.[col] === 'door') {
      const hasToken = positions.some((p) => p.col === col && p.row === row);
      if (!hasToken) {
        setTerrain((prev) => {
          const next = prev.map((r) => [...r]);
          next[row][col] = 'floor';
          return next;
        });
        return;
      }
    }
    // Token interaction
    const token = tokenAt(x, y);
    if (token) {
      const unit = units.find((u) => u.id === token.unitId);
      if (unit) setSelectedUnitId(unit.id === selectedUnitId ? null : unit.id);
      const cx = token.col * CELL_SIZE + CELL_SIZE / 2;
      const cy = token.row * CELL_SIZE + CELL_SIZE / 2;
      setDragging({ unitId: token.unitId, offsetX: x - cx, offsetY: y - cy });
      setDragPos({ x: cx, y: cy });

      // Compute movement range if in combat
      if (inCombat && unit) {
        const remaining = (unit.speed || 6) - (unit.movementUsed || 0);
        if (remaining > 0) {
          const reachable = computeReachableCells(terrain, token.col, token.row, remaining, gridRows, gridCols);
          setReachableCells(reachable);
        } else {
          setReachableCells(new Map()); // no movement left
        }
      } else {
        setReachableCells(null); // out of combat, free movement
      }
    } else {
      setSelectedUnitId(null);
    }
  }, [canvasCoords, tokenAt, dmTool, paintTerrain, units, selectedUnitId, setSelectedUnitId, panOffset, inCombat, terrain, gridRows, gridCols, positions]);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    if (panning) {
      setPanOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
      return;
    }
    if (painting && dmTool !== 'select') {
      const { col, row } = canvasCoords(e);
      paintTerrain(col, row);
      return;
    }
    if (!dragging) return;
    const { x, y } = canvasCoords(e);
    setDragPos({ x: x - dragging.offsetX, y: y - dragging.offsetY });
  }, [panning, panStart, painting, dmTool, canvasCoords, paintTerrain, dragging]);

  const handleMouseUp = useCallback(() => {
    if (panning) { setPanning(false); return; }
    if (painting) { setPainting(false); return; }
    if (!dragging || !dragPos) { setDragging(null); setDragPos(null); setReachableCells(null); return; }

    const col = Math.max(0, Math.min(gridCols - 1, Math.floor(dragPos.x / CELL_SIZE)));
    const row = Math.max(0, Math.min(gridRows - 1, Math.floor(dragPos.y / CELL_SIZE)));

    // Don't allow placing tokens on walls or void
    const targetTerrain = terrain[row]?.[col];
    if (targetTerrain === 'wall' || targetTerrain === 'void') {
      setDragging(null);
      setDragPos(null);
      setReachableCells(null);
      return;
    }

    // In combat: enforce movement range
    if (inCombat && reachableCells) {
      const cellKey = `${col},${row}`;
      const moveCost = reachableCells.get(cellKey);
      if (moveCost === undefined) {
        // Out of range — snap back, don't move
        setDragging(null);
        setDragPos(null);
        setReachableCells(null);
        return;
      }
      // Deduct movement cost from the unit
      setUnits((prev) => prev.map((u) =>
        u.id === dragging.unitId ? { ...u, movementUsed: (u.movementUsed || 0) + moveCost } : u
      ));
    }

    // Move the token
    setPositions((prev) =>
      prev.map((p) => (p.unitId === dragging.unitId ? { ...p, col, row } : p))
    );
    // Notify parent for multiplayer sync
    onTokenMove?.(dragging.unitId, col, row);

    // Pit damage: 1d6 when landing on a pit
    if (targetTerrain === 'pit') {
      const pitDamage = Math.floor(Math.random() * 6) + 1;
      damageUnit(dragging.unitId, pitDamage);
    }

    // Check for hidden traps at the landing cell
    const activeTrap = traps.find((t) => t.col === col && t.row === row && !t.triggered);
    if (activeTrap) {
      const template = TRAP_TEMPLATES[activeTrap.type];
      const unitName = units.find((u) => u.id === dragging.unitId)?.name || 'Unit';
      // Mark as triggered
      setTraps((prev) => prev.map((t) => t.id === activeTrap.id ? { ...t, triggered: true, detected: true } : t));

      const damage = rollTrapDamage(template.damage);
      if (damage > 0) {
        damageUnit(dragging.unitId, damage);
      }
      if (template.condition) {
        applyCondition(dragging.unitId, { type: template.condition, duration: template.conditionDuration || 2, source: template.description });
      }
      const dmgMsg = damage > 0 ? ` taking ${damage} damage` : '';
      const condMsg = template.condition ? ` and is ${template.condition}!` : '!';
      setTrapMessages((prev) => [...prev, `${unitName} triggers a ${template.description}${dmgMsg}${condMsg}`]);
    }

    setDragging(null);
    setDragPos(null);
    setReachableCells(null);
  }, [panning, painting, dragging, dragPos, gridCols, gridRows, terrain, inCombat, reachableCells, setUnits, damageUnit, traps, units, applyCondition]);

  // --- Zoom ---
  const handleWheel = useCallback((e: ReactWheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta)));
  }, []);

  // --- Generate new dungeon ---
  const regenerate = useCallback(() => {
    const newTerrain = generateDungeon(gridCols, gridRows);
    setTerrain(newTerrain);
    setExplored(Array.from({ length: gridRows }, () => Array(gridCols).fill(false)));
    // Reset token positions so they re-spawn in the new dungeon
    setPositions([]);
    setTraps([]);
    setTrapMessages([]);
    // Notify parent for multiplayer sync
    onTerrainChange?.(newTerrain);
  }, [gridCols, gridRows, onTerrainChange]);

  // Search for traps: d20 Perception check (DC 13) reveals nearby hidden traps
  const searchForTraps = useCallback(() => {
    const selectedPos = positions.find((p) => p.unitId === selectedUnitId);
    if (!selectedPos) { setTrapMessages(['Select a unit first.']); return; }
    const unit = units.find((u) => u.id === selectedUnitId);
    if (!unit) return;
    const roll = Math.floor(Math.random() * 20) + 1;
    const dc = 13;
    const searchRadius = 3; // cells
    let found = 0;
    if (roll >= dc) {
      setTraps((prev) => prev.map((t) => {
        if (t.triggered || t.detected) return t;
        const dist = Math.abs(t.col - selectedPos.col) + Math.abs(t.row - selectedPos.row);
        if (dist <= searchRadius) { found++; return { ...t, detected: true }; }
        return t;
      }));
    }
    const resultMsg = roll >= dc
      ? found > 0
        ? `${unit.name} searches (${roll} vs DC ${dc}) — found ${found} trap${found > 1 ? 's' : ''}!`
        : `${unit.name} searches (${roll} vs DC ${dc}) — area seems safe.`
      : `${unit.name} searches (${roll} vs DC ${dc}) — found nothing.`;
    setTrapMessages((prev) => [...prev, resultMsg]);
  }, [positions, selectedUnitId, units, traps]);

  const dmTools: { tool: DmTool; label: string; color: string }[] = [
    { tool: 'select', label: 'Select', color: 'text-slate-300' },
    { tool: 'wall', label: 'Wall', color: 'text-slate-400' },
    { tool: 'floor', label: 'Floor', color: 'text-slate-400' },
    { tool: 'water', label: 'Water', color: 'text-blue-400' },
    { tool: 'difficult', label: 'Rubble', color: 'text-amber-400' },
    { tool: 'door', label: 'Door', color: 'text-yellow-400' },
    { tool: 'pit', label: 'Pit', color: 'text-stone-400' },
    { tool: 'erase', label: 'Erase', color: 'text-red-400' },
  ];

  const trapTools: { tool: DmTool; label: string; color: string }[] = [
    { tool: 'trap-spike', label: 'Spike', color: 'text-slate-300' },
    { tool: 'trap-fire', label: 'Fire', color: 'text-orange-400' },
    { tool: 'trap-poison', label: 'Poison', color: 'text-green-400' },
    { tool: 'trap-alarm', label: 'Alarm', color: 'text-yellow-400' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 shrink-0 flex-wrap">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mr-1">Map</span>

        {/* Generate button */}
        <button
          onClick={regenerate}
          className="text-[10px] px-2 py-1 rounded bg-amber-900/40 hover:bg-amber-900/60 border border-amber-800/50 text-amber-300 font-semibold transition-all"
          title="Generate a new random dungeon"
        >
          Generate
        </button>

        <div className="w-px h-4 bg-slate-700 mx-1" />

        {/* DM mode toggle */}
        <button
          onClick={() => setDmMode(!dmMode)}
          className={`text-[10px] px-2 py-1 rounded font-semibold transition-all ${dmMode ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
          title="DM Mode: see through fog of war"
        >
          {dmMode ? 'DM: ON' : 'DM'}
        </button>

        <div className="w-px h-4 bg-slate-700 mx-1" />

        {/* Terrain tools */}
        {dmTools.map((t) => (
          <button
            key={t.tool}
            onClick={() => setDmTool(t.tool)}
            className={`text-[10px] px-1.5 py-1 rounded font-medium transition-all ${dmTool === t.tool ? 'bg-slate-600 text-white ring-1 ring-slate-500' : `bg-slate-800/60 ${t.color} hover:bg-slate-700/60`}`}
          >
            {t.label}
          </button>
        ))}

        {/* Trap tools (DM only) */}
        {dmMode && (
          <>
            <div className="w-px h-4 bg-slate-700 mx-1" />
            <span className="text-[9px] text-red-500/70 uppercase tracking-wider font-semibold">Traps</span>
            {trapTools.map((t) => (
              <button
                key={t.tool}
                onClick={() => setDmTool(t.tool)}
                className={`text-[10px] px-1.5 py-1 rounded font-medium transition-all ${dmTool === t.tool ? 'bg-red-900/60 text-white ring-1 ring-red-500/50' : `bg-red-950/40 ${t.color} hover:bg-red-900/40`}`}
              >
                {t.label}
              </button>
            ))}
            {traps.filter((t) => !t.triggered).length > 0 && (
              <span className="text-[9px] text-red-400/60 font-mono">{traps.filter((t) => !t.triggered).length} set</span>
            )}
          </>
        )}

        <div className="w-px h-4 bg-slate-700 mx-1" />

        {/* Search for traps button (available to players) */}
        <button
          onClick={searchForTraps}
          disabled={!selectedUnitId}
          className="text-[10px] px-2 py-1 rounded bg-indigo-900/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 font-semibold transition-all disabled:opacity-30"
          title="Search for hidden traps nearby (Perception DC 13, 3-cell radius)"
        >
          Search
        </button>

        <div className="flex-1" />

        {/* Zoom controls */}
        <button
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.2))}
          className="text-[10px] px-1.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 font-medium"
        >
          -
        </button>
        <span className="text-[9px] text-slate-500 font-mono w-8 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.2))}
          className="text-[10px] px-1.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 font-medium"
        >
          +
        </button>
        <button
          onClick={() => { setZoom(1); setPanOffset({ x: 0, y: 0 }); }}
          className="text-[10px] px-1.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 font-medium"
          title="Reset zoom and position"
        >
          Reset
        </button>

        <span className="text-[9px] text-slate-600">{gridCols}x{gridRows} ({gridCols * 5}x{gridRows * 5}ft)</span>
      </div>

      {/* Canvas with zoom/pan */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden bg-slate-950/50"
        onWheel={handleWheel}
        style={{ cursor: dmTool !== 'select' ? 'crosshair' : panning ? 'grabbing' : 'default' }}
      >
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: gridCols * CELL_SIZE,
            height: gridRows * CELL_SIZE,
          }}
        >
          <canvas
            ref={canvasRef}
            className="rounded-lg border border-slate-800"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Trap messages */}
      {trapMessages.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-1 border-t border-red-900/40 bg-red-950/20 shrink-0">
          <span className="text-[9px] text-red-400 font-semibold uppercase">Trap</span>
          <span className="text-[10px] text-red-300 flex-1 truncate">{trapMessages[trapMessages.length - 1]}</span>
          <button onClick={() => setTrapMessages([])} className="text-[9px] text-red-500/50 hover:text-red-400">clear</button>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 px-3 py-1.5 border-t border-slate-800 shrink-0 flex-wrap">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500" /><span className="text-[9px] text-slate-500">Player</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-[9px] text-slate-500">Enemy</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-[9px] text-slate-500">NPC</span></div>
        <div className="w-px h-3 bg-slate-700" />
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#475569]" /><span className="text-[9px] text-slate-500">Wall</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#1e3a5f]" /><span className="text-[9px] text-slate-500">Water</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#2d1f0e]" /><span className="text-[9px] text-slate-500">Rubble</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#92400e]" /><span className="text-[9px] text-slate-500">Door</span></div>
        {/* Movement indicator */}
        {inCombat && (() => {
          const currentUnit = units.find((u) => u.isCurrentTurn);
          if (!currentUnit) return null;
          const spd = currentUnit.speed || 6;
          const remaining = spd - (currentUnit.movementUsed || 0);
          const hasDashed = (currentUnit.movementUsed || 0) < 0;
          const remainingFt = remaining * 5;
          return (
            <span className={`text-[9px] font-mono ${remaining > 0 ? 'text-green-400' : 'text-red-400'}`} title={`${currentUnit.name}: ${remainingFt}ft remaining${hasDashed ? ' (Dashed!)' : ''}`}>
              {currentUnit.name.charAt(0)}: {remainingFt}ft{hasDashed ? ' \u26A1' : ''}
            </span>
          );
        })()}
        <span className="text-[9px] text-slate-600 ml-auto">Scroll to zoom | Alt+drag to pan | Drag tokens to move</span>
      </div>
    </div>
  );
}
