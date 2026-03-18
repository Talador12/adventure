// BattleMap — canvas-based tactical grid with terrain, procedural dungeon generation,
// vision-based fog of war, DM tools, and zoom/pan support.
import React, { useRef, useEffect, useState, useCallback, type MouseEvent as ReactMouseEvent, type WheelEvent as ReactWheelEvent } from 'react';
import { useGame, type Unit, type ConditionType, type AoEShape, type AoETemplate, CONDITION_EFFECTS, CONDITION_VISION_OVERRIDE, rollD20WithProne, effectiveAC, type ActiveCondition } from '../../contexts/GameContext';
import { type TerrainType, type TokenPosition, DEFAULT_COLS, DEFAULT_ROWS, TERRAIN_COST, computeReachableCells, findOpportunityAttackers } from '../../lib/mapUtils';
import type { MapPin } from '../../types/game';
import { drawAttackIndicators } from '../../hooks/useAttackIndicators';

const CELL_SIZE = 48;
const TOKEN_RADIUS = 18;
const VISION_RADIUS = 6; // cells (30ft in D&D)
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.0;
const MINIMAP_CELL = 4; // pixels per cell on minimap

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
  dodging: '#7dd3fc',    // sky-300
  raging: '#f87171',     // red-400
  inspired: '#818cf8',   // indigo-400
  helping: '#2dd4bf',    // teal-400
  hidden: '#94a3b8',     // slate-400
  torchlit: '#fcd34d',   // amber-300
  darkvision: '#a5b4fc', // indigo-300
};

// Short abbreviation for condition overlays on map tokens
const CONDITION_ABBREV: Record<string, string> = {
  poisoned: 'PSN', stunned: 'STN', frightened: 'FRT', blessed: 'BLS',
  hexed: 'HEX', burning: 'BRN', prone: 'PRN', dodging: 'DDG',
  raging: 'RAG', inspired: 'INS', helping: 'HLP', hidden: 'HID',
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
  playerPositions: { col: number; row: number; visionRange?: number }[],
  rows: number,
  cols: number,
  defaultVisionRadius: number,
  isDM: boolean,
): boolean[][] {
  // DM sees everything
  if (isDM) return Array.from({ length: rows }, () => Array(cols).fill(true));

  const visible: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (const pp of playerPositions) {
    const radius = pp.visionRange ?? defaultVisionRadius;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.sqrt((r - pp.row) ** 2 + (c - pp.col) ** 2);
        if (dist > radius) continue;
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

// --- AoE cell computation ---
function computeAoECells(
  shape: AoEShape,
  origin: { col: number; row: number },
  radiusCells: number,
  casterPos?: { col: number; row: number },
  cols = DEFAULT_COLS,
  rows = DEFAULT_ROWS,
): { col: number; row: number }[] {
  const cells: { col: number; row: number }[] = [];

  if (shape === 'circle') {
    // Circle: all cells within Chebyshev distance <= radius
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dx = c - origin.col;
        const dy = r - origin.row;
        if (Math.sqrt(dx * dx + dy * dy) <= radiusCells + 0.5) {
          cells.push({ col: c, row: r });
        }
      }
    }
  } else if (shape === 'cube') {
    // Cube: square centered on origin
    for (let r = origin.row - radiusCells; r <= origin.row + radiusCells; r++) {
      for (let c = origin.col - radiusCells; c <= origin.col + radiusCells; c++) {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
          cells.push({ col: c, row: r });
        }
      }
    }
  } else if (shape === 'cone') {
    // Cone from caster toward origin, 53-degree spread (D&D cone)
    if (!casterPos) return cells;
    const angle = Math.atan2(origin.row - casterPos.row, origin.col - casterPos.col);
    const halfAngle = Math.PI / 3; // ~60 degrees (D&D 5e cone)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dx = c - casterPos.col;
        const dy = r - casterPos.row;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radiusCells + 0.5 || dist < 0.5) continue;
        const cellAngle = Math.atan2(dy, dx);
        let angleDiff = Math.abs(cellAngle - angle);
        if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;
        if (angleDiff <= halfAngle) {
          cells.push({ col: c, row: r });
        }
      }
    }
  } else if (shape === 'line') {
    // Line from caster toward origin, 1 cell wide
    if (!casterPos) return cells;
    const dx = origin.col - casterPos.col;
    const dy = origin.row - casterPos.row;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 0.5) return cells;
    const nx = dx / len;
    const ny = dy / len;
    for (let i = 1; i <= radiusCells; i++) {
      const c = Math.round(casterPos.col + nx * i);
      const r = Math.round(casterPos.row + ny * i);
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        cells.push({ col: c, row: r });
      }
    }
  }
  return cells;
}

// --- Component ---
type DmTool = 'select' | 'wall' | 'floor' | 'water' | 'difficult' | 'door' | 'pit' | 'erase' | 'trap-spike' | 'trap-fire' | 'trap-poison' | 'trap-alarm' | 'pin';

// AoE overlay state for spell targeting
export interface ActiveAoE {
  shape: AoEShape;
  radiusCells: number;
  color: string;
  origin: { col: number; row: number }; // center/origin cell of the AoE
  casterPos?: { col: number; row: number }; // for cone direction
}

interface BattleMapProps {
  onTokenMove?: (unitId: string, col: number, row: number) => void;
  onTerrainChange?: (terrain: TerrainType[][]) => void;
  onOpportunityAttack?: (attackerName: string, targetName: string, damage: number, hit: boolean) => void;
  onMapImageChange?: (url: string | null) => void;
  canUseDMTools?: boolean;
  activeAoE?: ActiveAoE | null;
  onAoEConfirm?: (affectedCells: { col: number; row: number }[]) => void;
  onAoECancel?: () => void;
  animateMoveRef?: React.MutableRefObject<((unitId: string, fromCol: number, fromRow: number, toCol: number, toRow: number) => void) | null>;
  // Map pins
  mapPins?: MapPin[];
  onPinAdd?: (pin: MapPin) => void;
  onPinRemove?: (pinId: string) => void;
  // Attack indicators
  attackIndicators?: import('../../hooks/useAttackIndicators').AttackIndicator[];
  /** Unit ID of the player's own character — enables per-player fog (sees only from their token). When unset, falls back to shared party vision. */
  myUnitId?: string;
}

export default function BattleMap({ onTokenMove, onTerrainChange, onOpportunityAttack, onMapImageChange, canUseDMTools = true, activeAoE, onAoEConfirm, onAoECancel, animateMoveRef, mapPins = [], onPinAdd, onPinRemove, attackIndicators = [], myUnitId }: BattleMapProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const minimapRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { units, setUnits, selectedUnitId, setSelectedUnitId, damageUnit, applyCondition, inCombat,
    terrain, setTerrain, mapPositions: positions, setMapPositions: setPositions, mapImageUrl } = useGame();

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
  const [viewAsUnitId, setViewAsUnitId] = useState<string | null>(null); // DM previews a player's fog
  const [painting, setPainting] = useState(false); // mouse held for terrain painting

  // Minimap
  const [showMinimap, setShowMinimap] = useState(true);

  // AoE hover tracking
  const [aoeHoverCell, setAoeHoverCell] = useState<{ col: number; row: number } | null>(null);

  // Pin creation state
  const [pendingPinCell, setPendingPinCell] = useState<{ col: number; row: number } | null>(null);
  const [pinLabel, setPinLabel] = useState('');
  const [pinColor, setPinColor] = useState('#ef4444');
  const [pinIcon, setPinIcon] = useState('');

  // Token animation state — smooth movement between grid cells
  interface TokenAnim { fromX: number; fromY: number; toX: number; toY: number; startTime: number; duration: number }
  const animatingTokensRef = useRef<Map<string, TokenAnim>>(new Map());
  const animFrameRef = useRef<number>(0);
  const [, forceRender] = useState(0); // trigger re-draw during animation

  // Start a smooth token animation from one grid cell to another (exposed via animateMoveRef)
  const animateToken = useCallback((unitId: string, fromCol: number, fromRow: number, toCol: number, toRow: number, durationMs = 300) => {
    animatingTokensRef.current.set(unitId, {
      fromX: fromCol * CELL_SIZE + CELL_SIZE / 2,
      fromY: fromRow * CELL_SIZE + CELL_SIZE / 2,
      toX: toCol * CELL_SIZE + CELL_SIZE / 2,
      toY: toRow * CELL_SIZE + CELL_SIZE / 2,
      startTime: performance.now(),
      duration: durationMs,
    });
    forceRender((n) => n + 1); // kick the animation loop
  }, []);

  // Expose animateToken to parent via ref
  useEffect(() => {
    if (animateMoveRef) animateMoveRef.current = animateToken;
    return () => { if (animateMoveRef) animateMoveRef.current = null; };
  }, [animateMoveRef, animateToken]);

  // ESC key to cancel AoE placement
  useEffect(() => {
    if (!activeAoE) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onAoECancel) {
        onAoECancel();
        setAoeHoverCell(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeAoE, onAoECancel]);

  // Zoom + pan
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // --- Touch support refs (handlers defined after mouse handlers) ---
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const pinchStartRef = useRef<{ dist: number; zoom: number; midX: number; midY: number } | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchDragging = useRef(false);

  // Map image upload
  const mapFileInputRef = useRef<HTMLInputElement>(null);
  const [mapUploading, setMapUploading] = useState(false);

  // Background map image (loaded from R2 URL)
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const bgImageUrlRef = useRef<string | null>(null);
  useEffect(() => {
    if (mapImageUrl && mapImageUrl !== bgImageUrlRef.current) {
      bgImageUrlRef.current = mapImageUrl;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { bgImageRef.current = img; };
      img.onerror = () => { bgImageRef.current = null; };
      img.src = mapImageUrl;
    } else if (!mapImageUrl) {
      bgImageRef.current = null;
      bgImageUrlRef.current = null;
    }
  }, [mapImageUrl]);

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

  // Compute visibility — per-player fog when myUnitId set, shared party vision otherwise
  // DM "View As" overrides: when DM picks a player to preview, show their fog
  const effectiveViewUnit = viewAsUnitId || myUnitId;
  const playerPositions = positions
    .filter((p) => {
      const u = units.find((u) => u.id === p.unitId);
      if (!u || u.type !== 'player' || u.hp <= 0) return false;
      if (effectiveViewUnit) return u.id === effectiveViewUnit;
      return true; // shared party vision fallback
    })
    .map((p) => {
      const u = units.find((u) => u.id === p.unitId);
      // Apply condition-based vision overrides (torchlit, darkvision spell)
      const baseVision = u?.visionRange;
      const condBoost = (u?.conditions || []).reduce((max, c) => {
        const override = CONDITION_VISION_OVERRIDE[c.type];
        return override && override > max ? override : max;
      }, 0);
      return { col: p.col, row: p.row, visionRange: condBoost > 0 ? Math.max(baseVision ?? VISION_RADIUS, condBoost) : baseVision };
    });

  // DM sees full vision when viewAsUnitId is null (normal DM mode)
  const effectiveDmMode = dmMode && !viewAsUnitId;
  const visibility = computeVisibility(terrain, playerPositions, gridRows, gridCols, VISION_RADIUS, effectiveDmMode);

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

  // --- Map image upload handler ---
  const { setMapImageUrl } = useGame();
  const handleMapUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) { alert('Image too large (max 10MB)'); return; }
    setMapUploading(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const resp = await fetch('/api/map/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      });
      const data = await resp.json() as { url?: string; error?: string };
      if (data.url) {
        setMapImageUrl(data.url);
        onMapImageChange?.(data.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch { alert('Map image upload failed'); }
    finally { setMapUploading(false); }
  }, [setMapImageUrl, onMapImageChange]);

  const handleClearMapImage = useCallback(() => {
    setMapImageUrl(null);
    bgImageRef.current = null;
    bgImageUrlRef.current = null;
    onMapImageChange?.(null);
  }, [setMapImageUrl, onMapImageChange]);

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

    // Draw background map image (if uploaded by DM) — covers entire grid area
    const hasBgImage = bgImageRef.current?.complete && bgImageRef.current.naturalWidth > 0;
    if (hasBgImage) {
      ctx.drawImage(bgImageRef.current!, 0, 0, w, h);
    }

    // Draw terrain — when bg image is present, floor cells are transparent (image shows through)
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const isVisible = visibility[r]?.[c] ?? false;
        const wasExplored = explored[r]?.[c] ?? false;

        if (!effectiveDmMode && !isVisible && !wasExplored) continue; // completely unknown

        const cellType = terrain[r][c];
        // With bg image: skip floor/void draws (show image), still draw special terrain on top
        if (hasBgImage && (cellType === 'floor' || cellType === 'void')) {
          // just skip — the background image is already there
        } else {
          drawTerrainCell(ctx, c, r, cellType, CELL_SIZE);
        }

        // Dim explored but not currently visible cells
        if (!effectiveDmMode && !isVisible && wasExplored) {
          ctx.fillStyle = 'rgba(15,23,42,0.6)';
          ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }

    // Draw traps (visible in DM mode, or when detected by players)
    traps.forEach((trap) => {
      if (trap.triggered) return; // already went off, don't render
      if (!effectiveDmMode && !trap.detected) return; // hidden from players
      const tc = TRAP_TEMPLATES[trap.type];
      const trapX = trap.col * CELL_SIZE;
      const trapY = trap.row * CELL_SIZE;
      // Warning triangle
      ctx.save();
      ctx.globalAlpha = effectiveDmMode && !trap.detected ? 0.6 : 0.9;
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

    // AoE spell template overlay
    if (activeAoE && aoeHoverCell) {
      const aoeCells = computeAoECells(
        activeAoE.shape,
        aoeHoverCell,
        activeAoE.radiusCells,
        activeAoE.casterPos,
        gridCols,
        gridRows,
      );
      aoeCells.forEach(({ col: ac, row: ar }) => {
        ctx.fillStyle = activeAoE.color;
        ctx.fillRect(ac * CELL_SIZE, ar * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        // Bright border
        ctx.strokeStyle = activeAoE.color.replace(/[\d.]+\)$/, '0.6)');
        ctx.lineWidth = 1.5;
        ctx.strokeRect(ac * CELL_SIZE + 1, ar * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
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
      if (!effectiveDmMode && !visibility[pos.row]?.[pos.col]) return; // hidden in fog

      const isDrag = dragging?.unitId === pos.unitId && dragPos;
      // Animated position: lerp between from/to during animation
      const anim = animatingTokensRef.current.get(pos.unitId);
      let cx: number, cy: number;
      if (isDrag) {
        cx = dragPos!.x;
        cy = dragPos!.y;
      } else if (anim) {
        const t = Math.min(1, (performance.now() - anim.startTime) / anim.duration);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
        cx = anim.fromX + (anim.toX - anim.fromX) * ease;
        cy = anim.fromY + (anim.toY - anim.fromY) * ease;
      } else {
        cx = pos.col * CELL_SIZE + CELL_SIZE / 2;
        cy = pos.row * CELL_SIZE + CELL_SIZE / 2;
      }

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

      // Condition visual overlays — colored ring around token + abbreviated labels
      const conditions = unit.conditions || [];
      if (conditions.length > 0) {
        // Draw colored ring around token (uses the most impactful condition's color)
        const primaryColor = CONDITION_COLORS[conditions[0].type] || '#94a3b8';
        ctx.beginPath();
        ctx.arc(cx, cy, TOKEN_RADIUS + 3, 0, Math.PI * 2);
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Pulsing glow for burning/stunned/frightened (high-impact conditions)
        const urgentCondition = conditions.find((c) => c.type === 'burning' || c.type === 'stunned' || c.type === 'frightened');
        if (urgentCondition) {
          const urgentColor = CONDITION_COLORS[urgentCondition.type] || '#fb923c';
          ctx.beginPath();
          ctx.arc(cx, cy, TOKEN_RADIUS + 6, 0, Math.PI * 2);
          ctx.strokeStyle = urgentColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Condition abbreviation labels above token (compact text badges)
        const labelY = cy - TOKEN_RADIUS - 8;
        const labelH = 10;
        ctx.font = 'bold 7px system-ui';
        ctx.textAlign = 'center';
        const totalLabelsW = conditions.length * 22 - 2;
        const labelStartX = cx - totalLabelsW / 2 + 10;
        conditions.forEach((cond, ci) => {
          const lx = labelStartX + ci * 22;
          const color = CONDITION_COLORS[cond.type] || '#94a3b8';
          const abbrev = CONDITION_ABBREV[cond.type] || cond.type.slice(0, 3).toUpperCase();
          // Background pill
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          const textW = ctx.measureText(abbrev).width + 4;
          ctx.beginPath();
          ctx.roundRect(lx - textW / 2, labelY - labelH / 2, textW, labelH, 3);
          ctx.fill();
          // Border
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(lx - textW / 2, labelY - labelH / 2, textW, labelH, 3);
          ctx.stroke();
          // Text
          ctx.fillStyle = color;
          ctx.fillText(abbrev, lx, labelY + 3);
        });
      }
    });

    // Fog of war — cover unexplored cells
    if (!effectiveDmMode) {
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          if (!explored[r]?.[c] && !visibility[r]?.[c]) {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    }

    // Attack indicators — animated lines between attacker and target
    if (attackIndicators.length > 0) {
      drawAttackIndicators(ctx, attackIndicators, CELL_SIZE);
    }

    // DM tool brush cursor (when painting terrain)
    if (dmTool !== 'select' && containerRef.current) {
      // Cursor handled via CSS
    }
  }, [terrain, positions, units, selectedUnitId, dragging, dragPos, visibility, explored, effectiveDmMode, dmTool, gridCols, gridRows, reachableCells, traps, mapImageUrl, activeAoE, aoeHoverCell, attackIndicators]);

  // --- Minimap drawing ---
  const drawMinimap = useCallback(() => {
    const canvas = minimapRef.current;
    if (!canvas || !showMinimap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mw = gridCols * MINIMAP_CELL;
    const mh = gridRows * MINIMAP_CELL;
    canvas.width = mw;
    canvas.height = mh;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, mw, mh);

    // Terrain cells
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const isVis = visibility[r]?.[c] ?? false;
        const wasExpl = explored[r]?.[c] ?? false;
        if (!effectiveDmMode && !isVis && !wasExpl) continue;

        const cell = terrain[r][c];
        if (cell === 'void') continue;
        const colors = TERRAIN_COLORS[cell];
        ctx.fillStyle = colors.fill;
        if (!effectiveDmMode && !isVis && wasExpl) {
          ctx.globalAlpha = 0.4;
        }
        ctx.fillRect(c * MINIMAP_CELL, r * MINIMAP_CELL, MINIMAP_CELL, MINIMAP_CELL);
        ctx.globalAlpha = 1;
      }
    }

    // Tokens as colored dots
    const tokenColor = (u: Unit) => u.type === 'enemy' ? '#ef4444' : u.type === 'npc' ? '#3b82f6' : '#f59e0b';
    positions.forEach((pos) => {
      const unit = units.find((u) => u.id === pos.unitId);
      if (!unit || unit.hp <= 0) return;
      const isVis = visibility[pos.row]?.[pos.col] ?? effectiveDmMode;
      if (!isVis && !effectiveDmMode) return;
      ctx.fillStyle = tokenColor(unit);
      ctx.beginPath();
      ctx.arc(
        pos.col * MINIMAP_CELL + MINIMAP_CELL / 2,
        pos.row * MINIMAP_CELL + MINIMAP_CELL / 2,
        Math.max(2, MINIMAP_CELL * 0.6), 0, Math.PI * 2,
      );
      ctx.fill();
    });

    // Viewport rectangle
    const container = containerRef.current;
    if (container && zoom > 0) {
      const viewW = container.clientWidth / zoom;
      const viewH = container.clientHeight / zoom;
      const viewX = -panOffset.x / zoom;
      const viewY = -panOffset.y / zoom;
      // Convert from canvas pixels to minimap pixels
      const scale = MINIMAP_CELL / CELL_SIZE;
      ctx.strokeStyle = '#F38020';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(viewX * scale, viewY * scale, viewW * scale, viewH * scale);
    }
  }, [terrain, positions, units, visibility, explored, effectiveDmMode, gridCols, gridRows, zoom, panOffset, showMinimap]);

  // Animation loop: run requestAnimationFrame while any token is animating
  useEffect(() => {
    const tick = () => {
      const now = performance.now();
      const anims = animatingTokensRef.current;
      let active = false;
      for (const [id, anim] of anims) {
        const elapsed = now - anim.startTime;
        if (elapsed >= anim.duration) {
          anims.delete(id);
        } else {
          active = true;
        }
      }
      draw();
      drawMinimap();
      if (active) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };
    if (animatingTokensRef.current.size > 0) {
      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      draw();
      drawMinimap();
    }
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [draw, drawMinimap]);

  // Minimap click-to-pan: click a point on minimap to center the main canvas there
  const handleMinimapClick = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    const canvas = minimapRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // Convert minimap coords to world coords
    const worldX = (mx / MINIMAP_CELL) * CELL_SIZE;
    const worldY = (my / MINIMAP_CELL) * CELL_SIZE;
    // Center viewport on that world position
    const viewW = container.clientWidth / zoom;
    const viewH = container.clientHeight / zoom;
    setPanOffset({
      x: -(worldX - viewW / 2) * zoom,
      y: -(worldY - viewH / 2) * zoom,
    });
  }, [zoom]);

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

    // Handle pin placement — open inline creation form at clicked cell
    if (dmTool === 'pin') {
      setPendingPinCell({ col, row });
      setPinLabel('');
      setPinIcon('');
      return;
    }

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

    // Erase also removes traps and pins at the cell
    if (dmTool === 'erase') {
      setTraps((prev) => prev.filter((t) => !(t.col === col && t.row === row)));
      const pinAtCell = mapPins.find((p) => p.col === col && p.row === row);
      if (pinAtCell) onPinRemove?.(pinAtCell.id);
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
  }, [dmTool, gridCols, gridRows, terrain, traps, onTerrainChange, mapPins, onPinRemove]);

  // Confirm pin creation from the inline form
  const confirmPin = useCallback(() => {
    if (!pendingPinCell || !pinLabel.trim()) return;
    const pin: MapPin = {
      id: `pin-${crypto.randomUUID().slice(0, 8)}`,
      col: pendingPinCell.col,
      row: pendingPinCell.row,
      label: pinLabel.trim(),
      color: pinColor,
      icon: pinIcon || undefined,
    };
    onPinAdd?.(pin);
    setPendingPinCell(null);
    setPinLabel('');
    setPinIcon('');
  }, [pendingPinCell, pinLabel, pinColor, pinIcon, onPinAdd]);

  // --- Mouse handlers ---
  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    // Middle mouse or right-click: pan
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    // AoE placement confirmation
    if (activeAoE && aoeHoverCell && onAoEConfirm) {
      const affectedCells = computeAoECells(
        activeAoE.shape,
        aoeHoverCell,
        activeAoE.radiusCells,
        activeAoE.casterPos,
        gridCols,
        gridRows,
      );
      onAoEConfirm(affectedCells);
      setAoeHoverCell(null);
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
  }, [canvasCoords, tokenAt, dmTool, paintTerrain, units, selectedUnitId, setSelectedUnitId, panOffset, inCombat, terrain, gridRows, gridCols, positions, activeAoE, aoeHoverCell, onAoEConfirm]);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    // Track AoE hover cell when placing a spell
    if (activeAoE) {
      const { col, row } = canvasCoords(e);
      setAoeHoverCell((prev) => (prev?.col === col && prev?.row === row) ? prev : { col, row });
    }
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
  }, [panning, panStart, painting, dmTool, canvasCoords, paintTerrain, dragging, activeAoE]);

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

    // Opportunity Attacks: check if moving unit leaves any enemy's melee reach
    if (inCombat) {
      const movingUnit = units.find((u) => u.id === dragging.unitId);
      const oldPos = positions.find((p) => p.unitId === dragging.unitId);
      if (movingUnit && oldPos && (oldPos.col !== col || oldPos.row !== row)) {
        const attackers = findOpportunityAttackers(
          dragging.unitId, movingUnit.type, oldPos.col, oldPos.row, col, row, units, positions,
        );
        for (const atk of attackers) {
          // Roll attack with condition modifiers: d20 + attackBonus + condAtkMod vs effectiveAC
          const atkUnit = units.find((u) => u.id === atk.unitId);
          const condAtkMod = (atkUnit?.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
          const targetAC = effectiveAC(movingUnit.ac, movingUnit.conditions || []);
          // OA is always melee
          const { roll, hadAdvantage, hadDisadvantage, rolls: oaRolls } = rollD20WithProne(atkUnit?.conditions || [], movingUnit.conditions || [], true);
          const totalAtk = roll + atk.attackBonus + condAtkMod;
          const hit = roll === 20 || (roll !== 1 && totalAtk >= targetAC);
          let dmg = 0;
          if (hit) {
            // Roll damage from damageDie (e.g. "1d8")
            const dieMatch = atk.damageDie.match(/(\d+)d(\d+)/);
            if (dieMatch) {
              const [, count, sides] = dieMatch;
              for (let i = 0; i < Number(count); i++) dmg += Math.floor(Math.random() * Number(sides)) + 1;
            }
            dmg += atk.damageBonus;
            dmg = Math.max(1, dmg);
            if (roll === 20) dmg *= 2; // crit
            damageUnit(dragging.unitId, dmg);
          }
          // Mark reaction as used
          setUnits((prev) => prev.map((u) => u.id === atk.unitId ? { ...u, reactionUsed: true } : u));
          onOpportunityAttack?.(atk.name, movingUnit.name, dmg, hit);
        }
      }
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
  }, [panning, painting, dragging, dragPos, gridCols, gridRows, terrain, inCombat, reachableCells, setUnits, damageUnit, traps, units, applyCondition, positions, onOpportunityAttack]);

  // --- Zoom ---
  const handleWheel = useCallback((e: ReactWheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta)));
  }, []);

  // --- Touch handlers: pinch zoom, tap select, long-press drag ---
  const LONG_PRESS_MS = 300;
  const touchDistance = useCallback((t1: { clientX: number; clientY: number }, t2: { clientX: number; clientY: number }) =>
    Math.sqrt((t2.clientX - t1.clientX) ** 2 + (t2.clientY - t1.clientY) ** 2), []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const d = touchDistance(e.touches[0], e.touches[1]);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      pinchStartRef.current = { dist: d, zoom, midX, midY };
      if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
      return;
    }
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const { col, row, x, y } = canvasCoords({ clientX: touch.clientX, clientY: touch.clientY });
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    touchDragging.current = false;

    // AoE placement
    if (activeAoE && onAoEConfirm) {
      const affectedCells = computeAoECells(activeAoE.shape, { col, row }, activeAoE.radiusCells, activeAoE.casterPos, gridCols, gridRows);
      onAoEConfirm(affectedCells);
      setAoeHoverCell(null);
      return;
    }

    // Check for token under finger
    const token = tokenAt(x, y);
    if (token) {
      e.preventDefault();
      const unit = units.find((u) => u.id === token.unitId);
      if (unit) setSelectedUnitId(unit.id === selectedUnitId ? null : unit.id);
      // Start long-press timer to begin drag
      longPressTimer.current = setTimeout(() => {
        touchDragging.current = true;
        const cx = token.col * CELL_SIZE + CELL_SIZE / 2;
        const cy = token.row * CELL_SIZE + CELL_SIZE / 2;
        setDragging({ unitId: token.unitId, offsetX: x - cx, offsetY: y - cy });
        setDragPos({ x: cx, y: cy });
        if (inCombat && unit) {
          const remaining = (unit.speed || 6) - (unit.movementUsed || 0);
          setReachableCells(remaining > 0
            ? computeReachableCells(terrain, token.col, token.row, remaining, gridRows, gridCols)
            : new Map()
          );
        } else {
          setReachableCells(null);
        }
      }, LONG_PRESS_MS);
    } else {
      setSelectedUnitId(null);
    }
  }, [canvasCoords, tokenAt, units, selectedUnitId, setSelectedUnitId, activeAoE, onAoEConfirm, gridCols, gridRows, inCombat, terrain, zoom, touchDistance]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    // Pinch zoom
    if (e.touches.length === 2 && pinchStartRef.current) {
      e.preventDefault();
      const d = touchDistance(e.touches[0], e.touches[1]);
      const scale = d / pinchStartRef.current.dist;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchStartRef.current.zoom * scale));
      setZoom(newZoom);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const dx = midX - pinchStartRef.current.midX;
      const dy = midY - pinchStartRef.current.midY;
      setPanOffset((p) => ({ x: p.x + dx, y: p.y + dy }));
      pinchStartRef.current = { ...pinchStartRef.current, midX, midY };
      return;
    }
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const start = touchStartRef.current;
    if (!start) return;

    const movedDist = Math.sqrt((touch.clientX - start.x) ** 2 + (touch.clientY - start.y) ** 2);
    if (!touchDragging.current && movedDist > 10) {
      if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
      // Pan mode — single finger swipe
      setPanOffset((p) => ({
        x: p.x + (touch.clientX - start.x),
        y: p.y + (touch.clientY - start.y),
      }));
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: start.time };
      return;
    }

    // Token dragging after long-press
    if (touchDragging.current && dragging) {
      e.preventDefault();
      const { x, y } = canvasCoords({ clientX: touch.clientX, clientY: touch.clientY });
      setDragPos({ x: x - dragging.offsetX, y: y - dragging.offsetY });
    }
  }, [dragging, canvasCoords, touchDistance]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
    pinchStartRef.current = null;
    if (touchDragging.current && dragging) {
      handleMouseUp();
      touchDragging.current = false;
    }
    touchStartRef.current = null;
  }, [dragging, handleMouseUp]);

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

        {/* DM tools — only visible when canUseDMTools is true */}
        {canUseDMTools && (
          <>
            <div className="w-px h-4 bg-slate-700 mx-1" />

            {/* DM mode toggle */}
            <button
              onClick={() => { setDmMode(!dmMode); if (dmMode) setViewAsUnitId(null); }}
              className={`text-[10px] px-2 py-1 rounded font-semibold transition-all ${dmMode ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              title="DM Mode: see through fog of war"
            >
              {dmMode ? 'DM: ON' : 'DM'}
            </button>

            {/* View As dropdown — DM previews a player's fog perspective */}
            {dmMode && (
              <select
                value={viewAsUnitId || ''}
                onChange={(e) => setViewAsUnitId(e.target.value || null)}
                className="text-[9px] px-1.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-semibold"
                title="View map as a specific player (fog preview)"
              >
                <option value="">Full Vision</option>
                {units.filter((u) => u.type === 'player' && u.hp > 0).map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            )}

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

            {/* Pin tool — place named markers on the map */}
            <div className="w-px h-4 bg-slate-700 mx-1" />
            <button
              onClick={() => { setDmTool('pin'); setPendingPinCell(null); }}
              className={`text-[10px] px-1.5 py-1 rounded font-medium transition-all ${dmTool === 'pin' ? 'bg-amber-700/60 text-white ring-1 ring-amber-500/50' : 'bg-amber-950/40 text-amber-400/70 hover:bg-amber-900/40'}`}
              title="Place a named pin/marker on the map"
            >
              📌 Pin
            </button>
            {mapPins.length > 0 && (
              <span className="text-[9px] text-amber-400/60 font-mono">{mapPins.length}</span>
            )}

            {/* Trap tools (DM only — also requires DM mode active) */}
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
                <div className="w-px h-4 bg-slate-700 mx-1" />
                <span className="text-[9px] text-emerald-500/70 uppercase tracking-wider font-semibold">Map</span>
                <input
                  ref={mapFileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleMapUpload(f); e.target.value = ''; }}
                />
                <button
                  onClick={() => mapFileInputRef.current?.click()}
                  disabled={mapUploading}
                  className="text-[10px] px-2 py-1 rounded bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 font-semibold transition-all disabled:opacity-50"
                  title="Upload a battle map background image (PNG/JPG/WebP, max 10MB)"
                >
                  {mapUploading ? 'Uploading...' : 'Upload'}
                </button>
                {mapImageUrl && (
                  <button
                    onClick={handleClearMapImage}
                    className="text-[10px] px-2 py-1 rounded bg-slate-800/60 hover:bg-red-900/40 border border-slate-600/50 text-slate-400 hover:text-red-300 font-semibold transition-all"
                    title="Remove map background image"
                  >
                    Clear
                  </button>
                )}
                <div className="w-px h-4 bg-slate-700 mx-1" />
                <span className="text-[9px] text-sky-500/70 uppercase tracking-wider font-semibold">Fog</span>
                <button
                  onClick={() => setExplored(Array.from({ length: gridRows }, () => Array(gridCols).fill(false)))}
                  className="text-[10px] px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/50 text-slate-400 hover:text-slate-200 font-semibold transition-all"
                  title="Full Dark — reset fog, hide all cells"
                >
                  Dark
                </button>
                <button
                  onClick={() => {
                    // Explored only — keep what players have already seen, don't add new
                    // This is essentially a no-op (current state) but useful to communicate intent after a reveal-all
                    setExplored((prev) => prev.map((row) => [...row]));
                  }}
                  className="text-[10px] px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/50 text-slate-400 hover:text-slate-200 font-semibold transition-all"
                  title="Explored Only — only show what players have seen"
                >
                  Explored
                </button>
                <button
                  onClick={() => setExplored(Array.from({ length: gridRows }, () => Array(gridCols).fill(true)))}
                  className="text-[10px] px-2 py-1 rounded bg-sky-900/40 hover:bg-sky-900/60 border border-sky-700/50 text-sky-300 font-semibold transition-all"
                  title="Reveal All — mark all cells as explored"
                >
                  Reveal
                </button>
              </>
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
          aria-label="Zoom out"
        >
          -
        </button>
        <span className="text-[9px] text-slate-500 font-mono w-8 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.2))}
          className="text-[10px] px-1.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 font-medium"
          aria-label="Zoom in"
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

        <button
          onClick={() => setShowMinimap((s) => !s)}
          className={`text-[10px] px-1.5 py-1 rounded font-medium transition-colors ${showMinimap ? 'bg-[#F38020]/20 text-[#F38020]' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}
          title={showMinimap ? 'Hide minimap' : 'Show minimap'}
        >
          Map
        </button>

        <span className="text-[9px] text-slate-600">{gridCols}x{gridRows} ({gridCols * 5}x{gridRows * 5}ft)</span>
      </div>

      {/* Canvas with zoom/pan */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden bg-slate-950/50 relative touch-none"
        onWheel={handleWheel}
        style={{ cursor: dmTool !== 'select' ? 'crosshair' : panning ? 'grabbing' : 'default' }}
      >
        <div
          className="relative"
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
            aria-label="Tactical battle map"
            role="img"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Map pin markers — HTML overlay on top of canvas, inside zoom/pan container */}
          {mapPins.map((pin) => (
            <div
              key={pin.id}
              className="absolute pointer-events-auto group"
              style={{
                left: pin.col * CELL_SIZE + CELL_SIZE / 2,
                top: pin.row * CELL_SIZE,
                transform: 'translate(-50%, -100%)',
                zIndex: 20,
              }}
            >
              {/* Pin head */}
              <div
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full shadow-lg border border-white/20 cursor-default whitespace-nowrap"
                style={{ backgroundColor: pin.color, minWidth: 18 }}
                title={pin.label}
              >
                {pin.icon && <span className="text-[9px]">{pin.icon}</span>}
                <span className="text-[8px] font-bold text-white drop-shadow-sm leading-none max-w-[80px] truncate">{pin.label}</span>
              </div>
              {/* Pin tail (small triangle pointing down) */}
              <div
                className="mx-auto w-0 h-0"
                style={{
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: `6px solid ${pin.color}`,
                }}
              />
              {/* Delete button on hover — DM only */}
              {canUseDMTools && onPinRemove && (
                <button
                  onClick={(e) => { e.stopPropagation(); onPinRemove(pin.id); }}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[7px] font-bold leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  title="Remove pin"
                  aria-label="Remove map pin"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          {/* Pin creation form — appears at the clicked cell */}
          {pendingPinCell && canUseDMTools && (
            <div
              className="absolute z-30 pointer-events-auto"
              style={{
                left: pendingPinCell.col * CELL_SIZE + CELL_SIZE / 2,
                top: pendingPinCell.row * CELL_SIZE - 8,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="bg-slate-900 border border-amber-600/50 rounded-lg shadow-xl p-2 min-w-[180px]" onClick={(e) => e.stopPropagation()}>
                <div className="text-[9px] text-amber-400 font-semibold uppercase mb-1">New Pin</div>
                <input
                  autoFocus
                  type="text"
                  value={pinLabel}
                  onChange={(e) => setPinLabel(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') confirmPin(); if (e.key === 'Escape') setPendingPinCell(null); }}
                  placeholder="Label..."
                  className="w-full text-[11px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none mb-1.5"
                  maxLength={30}
                />
                <div className="flex items-center gap-1 mb-1.5">
                  <input
                    type="text"
                    value={pinIcon}
                    onChange={(e) => setPinIcon(e.target.value)}
                    placeholder="Icon"
                    className="w-12 text-[11px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none text-center"
                    maxLength={2}
                    title="Optional emoji or symbol"
                  />
                  <div className="flex gap-0.5 flex-1 flex-wrap">
                    {(['#ef4444','#3b82f6','#22c55e','#eab308','#a855f7','#f97316','#06b6d4','#ec4899'] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setPinColor(c)}
                        className={`w-4 h-4 rounded-full border-2 transition-all ${pinColor === c ? 'border-white scale-110' : 'border-transparent hover:border-white/40'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={confirmPin}
                    disabled={!pinLabel.trim()}
                    className="flex-1 text-[10px] px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Place
                  </button>
                  <button
                    onClick={() => setPendingPinCell(null)}
                    className="text-[10px] px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Minimap overlay — bottom-right corner */}
        {showMinimap && (
          <div className="absolute bottom-2 right-2 rounded border border-slate-700/60 bg-slate-950/80 shadow-lg overflow-hidden" style={{ width: gridCols * MINIMAP_CELL + 2, height: gridRows * MINIMAP_CELL + 2 }}>
            <canvas
              ref={minimapRef}
              className="cursor-crosshair"
              aria-label="Minimap overview"
              role="img"
              onClick={handleMinimapClick}
              style={{ width: gridCols * MINIMAP_CELL, height: gridRows * MINIMAP_CELL }}
            />
          </div>
        )}
      </div>

      {/* AoE placement indicator */}
      {activeAoE && (
        <div className="flex items-center gap-2 px-3 py-1.5 border-t border-purple-900/40 bg-purple-950/30 shrink-0">
          <span className="text-[9px] text-purple-400 font-semibold uppercase">AoE Targeting</span>
          <span className="text-[10px] text-purple-300 flex-1">Click on the map to place the spell area. {activeAoE.shape === 'cone' ? 'Cone emanates from your position.' : ''}</span>
          {onAoECancel && (
            <button onClick={onAoECancel} className="text-[9px] text-purple-500/50 hover:text-purple-400 font-medium">ESC to cancel</button>
          )}
        </div>
      )}

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
        <span className="text-[9px] text-slate-600 ml-auto hidden sm:inline">Scroll to zoom | Alt+drag to pan | Drag tokens to move</span>
        <span className="text-[9px] text-slate-600 ml-auto sm:hidden">Pinch to zoom | Swipe to pan | Long-press to drag</span>
      </div>
    </div>
  );
}
