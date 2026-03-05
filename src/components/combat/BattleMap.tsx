// BattleMap — canvas-based tactical grid with draggable unit tokens.
// Square grid, click to select, drag to move, fog of war per cell.
import { useRef, useEffect, useState, useCallback, type MouseEvent as ReactMouseEvent } from 'react';
import { useGame, type Unit } from '../../contexts/GameContext';

const CELL_SIZE = 48; // px per grid cell (5ft in D&D)
const GRID_COLS = 20;
const GRID_ROWS = 14;
const TOKEN_RADIUS = 18;

interface TokenPosition {
  unitId: string;
  col: number;
  row: number;
}

// Color scheme for unit types
function tokenColor(unit: Unit): string {
  if (unit.hp <= 0) return '#4b5563'; // dead — gray
  switch (unit.type) {
    case 'player': return '#f59e0b'; // amber
    case 'enemy': return '#ef4444'; // red
    case 'npc': return '#3b82f6'; // blue
    default: return '#6b7280';
  }
}

function tokenBorderColor(unit: Unit, isSelected: boolean, isCurrentTurn: boolean): string {
  if (isSelected) return '#F38020';
  if (isCurrentTurn) return '#eab308';
  return 'rgba(255,255,255,0.15)';
}

export default function BattleMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { units, selectedUnitId, setSelectedUnitId } = useGame();

  // Token positions on the grid
  const [positions, setPositions] = useState<TokenPosition[]>([]);
  const [dragging, setDragging] = useState<{ unitId: string; offsetX: number; offsetY: number } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [fog, setFog] = useState<boolean[][]>(() =>
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false))
  );
  const [fogMode, setFogMode] = useState(false); // toggle fog painting

  // Initialize token positions when units change
  useEffect(() => {
    setPositions((prev) => {
      const existing = new Set(prev.map((p) => p.unitId));
      const newPositions = [...prev.filter((p) => units.some((u) => u.id === p.unitId))];

      // Place new units
      units.forEach((unit, i) => {
        if (!existing.has(unit.id)) {
          // Place players on left side, enemies on right
          const col = unit.type === 'enemy' ? GRID_COLS - 3 - (i % 3) : 2 + (i % 3);
          const row = 2 + Math.floor(i / 3) * 2;
          newPositions.push({ unitId: unit.id, col: Math.min(col, GRID_COLS - 1), row: Math.min(row, GRID_ROWS - 1) });
        }
      });

      return newPositions;
    });
  }, [units]);

  // Draw the grid, tokens, and fog
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = GRID_COLS * CELL_SIZE;
    const h = GRID_ROWS * CELL_SIZE;
    canvas.width = w;
    canvas.height = h;

    // Background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(148,163,184,0.1)';
    ctx.lineWidth = 1;
    for (let c = 0; c <= GRID_COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE, 0);
      ctx.lineTo(c * CELL_SIZE, h);
      ctx.stroke();
    }
    for (let r = 0; r <= GRID_ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE);
      ctx.lineTo(w, r * CELL_SIZE);
      ctx.stroke();
    }

    // Coordinate labels (subtle)
    ctx.fillStyle = 'rgba(148,163,184,0.15)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    for (let c = 0; c < GRID_COLS; c++) {
      ctx.fillText(String.fromCharCode(65 + c), c * CELL_SIZE + CELL_SIZE / 2, 10);
    }
    ctx.textAlign = 'left';
    for (let r = 0; r < GRID_ROWS; r++) {
      ctx.fillText(String(r + 1), 2, r * CELL_SIZE + CELL_SIZE / 2 + 3);
    }

    // Draw tokens
    positions.forEach((pos) => {
      const unit = units.find((u) => u.id === pos.unitId);
      if (!unit) return;

      // If dragging this token, use drag position instead
      const isDragging = dragging?.unitId === pos.unitId && dragPos;
      const cx = isDragging ? dragPos!.x : pos.col * CELL_SIZE + CELL_SIZE / 2;
      const cy = isDragging ? dragPos!.y : pos.row * CELL_SIZE + CELL_SIZE / 2;

      const isSelected = selectedUnitId === unit.id;
      const isCurrentTurn = unit.isCurrentTurn;

      // Selection/turn glow
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

      // HP bar under token
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
        // Dead X
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 8);
        ctx.lineTo(cx + 8, cy + 8);
        ctx.moveTo(cx + 8, cy - 8);
        ctx.lineTo(cx - 8, cy + 8);
        ctx.stroke();
      }
    });

    // Fog of war overlay
    fog.forEach((row, r) => {
      row.forEach((fogged, c) => {
        if (fogged) {
          ctx.fillStyle = 'rgba(15,23,42,0.85)';
          ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      });
    });
  }, [positions, units, selectedUnitId, dragging, dragPos, fog]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Get grid cell from mouse coordinates
  const getCell = (e: ReactMouseEvent<HTMLCanvasElement>): { col: number; row: number; x: number; y: number } => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { col: Math.floor(x / CELL_SIZE), row: Math.floor(y / CELL_SIZE), x, y };
  };

  // Find token at position
  const tokenAt = (x: number, y: number): TokenPosition | null => {
    for (const pos of positions) {
      const cx = pos.col * CELL_SIZE + CELL_SIZE / 2;
      const cy = pos.row * CELL_SIZE + CELL_SIZE / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist <= TOKEN_RADIUS) return pos;
    }
    return null;
  };

  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    const { col, row, x, y } = getCell(e);

    // Fog painting mode
    if (fogMode) {
      setFog((prev) => {
        const next = prev.map((r) => [...r]);
        if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
          next[row][col] = !next[row][col];
        }
        return next;
      });
      return;
    }

    // Check if clicking a token
    const token = tokenAt(x, y);
    if (token) {
      const unit = units.find((u) => u.id === token.unitId);
      if (unit) {
        setSelectedUnitId(unit.id === selectedUnitId ? null : unit.id);
      }
      // Start dragging
      const cx = token.col * CELL_SIZE + CELL_SIZE / 2;
      const cy = token.row * CELL_SIZE + CELL_SIZE / 2;
      setDragging({ unitId: token.unitId, offsetX: x - cx, offsetY: y - cy });
      setDragPos({ x, y });
    } else {
      setSelectedUnitId(null);
    }
  }, [fogMode, units, selectedUnitId, setSelectedUnitId, positions]);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - dragging.offsetX;
    const y = e.clientY - rect.top - dragging.offsetY;
    setDragPos({ x, y });
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    if (!dragging || !dragPos) {
      setDragging(null);
      setDragPos(null);
      return;
    }

    // Snap to grid
    const col = Math.max(0, Math.min(GRID_COLS - 1, Math.floor(dragPos.x / CELL_SIZE)));
    const row = Math.max(0, Math.min(GRID_ROWS - 1, Math.floor(dragPos.y / CELL_SIZE)));

    setPositions((prev) =>
      prev.map((p) => (p.unitId === dragging.unitId ? { ...p, col, row } : p))
    );
    setDragging(null);
    setDragPos(null);
  }, [dragging, dragPos]);

  return (
    <div className="flex flex-col h-full">
      {/* Map toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 shrink-0">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Battle Map</span>
        <div className="flex-1" />
        <button
          onClick={() => setFogMode(!fogMode)}
          className={`text-[10px] px-2 py-1 rounded font-medium transition-all ${fogMode ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
        >
          {fogMode ? 'Fog: ON' : 'Fog'}
        </button>
        <button
          onClick={() => setFog(Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false)))}
          className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 font-medium transition-all"
        >
          Clear Fog
        </button>
        <span className="text-[9px] text-slate-600">{GRID_COLS}x{GRID_ROWS} ({GRID_COLS * 5}x{GRID_ROWS * 5}ft)</span>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-950/50 p-2">
        <canvas
          ref={canvasRef}
          className="rounded-lg border border-slate-800 cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-3 py-1.5 border-t border-slate-800 shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-[9px] text-slate-500">Player</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-[9px] text-slate-500">Enemy</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-[9px] text-slate-500">NPC</span>
        </div>
        <span className="text-[9px] text-slate-600 ml-auto">Click to select, drag to move</span>
      </div>
    </div>
  );
}
