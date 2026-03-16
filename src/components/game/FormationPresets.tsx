// FormationPresets — DM tool for arranging party tokens into tactical formations.
// Supports preset patterns (line, wedge, column, diamond, scatter) and a saved marching order.
// Repositions player tokens on the battle map relative to a center point.
import { useState, useCallback, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import type { TokenPosition } from '../../lib/mapUtils';

export type FormationType = 'line' | 'column' | 'wedge' | 'diamond' | 'scatter' | 'circle';

interface FormationInfo {
  id: FormationType;
  label: string;
  icon: string;
  description: string;
  // Returns offsets [col, row] for N party members (index 0 = front/leader)
  offsets: (count: number) => [number, number][];
}

const FORMATIONS: FormationInfo[] = [
  {
    id: 'line',
    label: 'Line',
    icon: '━',
    description: 'Shoulder-to-shoulder — wide front, good for corridors',
    offsets: (n) => {
      const start = -Math.floor((n - 1) / 2);
      return Array.from({ length: n }, (_, i) => [start + i, 0]);
    },
  },
  {
    id: 'column',
    label: 'Column',
    icon: '┃',
    description: 'Single file — narrow, good for tight passages',
    offsets: (n) => Array.from({ length: n }, (_, i) => [0, i]),
  },
  {
    id: 'wedge',
    label: 'Wedge',
    icon: '▽',
    description: 'V-formation — leader at front, flanks spread back',
    offsets: (n) => {
      const result: [number, number][] = [[0, 0]]; // leader at front
      let col = 1;
      for (let i = 1; i < n; i++) {
        const side = i % 2 === 1 ? -col : col;
        const row = Math.ceil(i / 2);
        result.push([side, row]);
        if (i % 2 === 0) col++;
      }
      return result;
    },
  },
  {
    id: 'diamond',
    label: 'Diamond',
    icon: '◇',
    description: 'Point at front and rear — protects flanks',
    offsets: (n) => {
      if (n <= 1) return [[0, 0]];
      if (n === 2) return [[0, 0], [0, 2]];
      if (n === 3) return [[0, 0], [-1, 1], [1, 1]];
      if (n === 4) return [[0, 0], [-1, 1], [1, 1], [0, 2]];
      // 5+: expand the diamond
      const result: [number, number][] = [[0, 0], [-1, 1], [1, 1], [0, 2]];
      for (let i = 4; i < n; i++) {
        result.push([i % 2 === 0 ? -2 : 2, 1]);
      }
      return result;
    },
  },
  {
    id: 'circle',
    label: 'Circle',
    icon: '○',
    description: 'Defensive ring — all directions covered',
    offsets: (n) => {
      if (n <= 1) return [[0, 0]];
      const radius = Math.max(1, Math.ceil(n / 4));
      return Array.from({ length: n }, (_, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        return [Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius)] as [number, number];
      });
    },
  },
  {
    id: 'scatter',
    label: 'Scatter',
    icon: '⁘',
    description: 'Spread out — anti-AoE, harder to fireball',
    offsets: (n) => {
      // Spread on a 2-cell spacing grid
      const result: [number, number][] = [];
      const cols = Math.ceil(Math.sqrt(n));
      for (let i = 0; i < n; i++) {
        const c = (i % cols) * 2 - Math.floor(cols / 2) * 2;
        const r = Math.floor(i / cols) * 2;
        result.push([c, r]);
      }
      return result;
    },
  },
];

interface FormationPresetsProps {
  roomId: string;
  onApplyFormation: (positions: TokenPosition[]) => void;
}

export default function FormationPresets({ roomId, onApplyFormation }: FormationPresetsProps) {
  const { units, characters, mapPositions, terrain } = useGame();
  const storageKey = `adventure:marchingOrder:${roomId}`;

  // Marching order — array of character IDs from front to back
  const [marchingOrder, setMarchingOrder] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  // Persist marching order
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(marchingOrder)); } catch { /* ok */ }
  }, [marchingOrder, storageKey]);

  // Get player units (units that have a characterId)
  const playerUnits = units.filter((u) => u.characterId && u.type === 'player');

  // Ensure marching order includes all current player characters
  useEffect(() => {
    const currentIds = playerUnits.map((u) => u.id);
    if (currentIds.length === 0) return;
    setMarchingOrder((prev) => {
      const existing = prev.filter((id) => currentIds.includes(id));
      const missing = currentIds.filter((id) => !existing.includes(id));
      if (missing.length === 0 && existing.length === currentIds.length) return prev;
      return [...existing, ...missing];
    });
  }, [playerUnits.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Apply a formation
  const applyFormation = useCallback((formation: FormationInfo) => {
    if (playerUnits.length === 0) return;

    // Get ordered units based on marching order
    const ordered = marchingOrder
      .map((id) => playerUnits.find((u) => u.id === id))
      .filter(Boolean) as typeof playerUnits;

    // Add any units not in the marching order
    for (const u of playerUnits) {
      if (!ordered.some((o) => o.id === u.id)) ordered.push(u);
    }

    // Find center point — use average of current player positions, or map center
    const currentPositions = mapPositions.filter((p) => ordered.some((u) => u.id === p.unitId));
    let centerCol: number, centerRow: number;
    if (currentPositions.length > 0) {
      centerCol = Math.round(currentPositions.reduce((s, p) => s + p.col, 0) / currentPositions.length);
      centerRow = Math.round(currentPositions.reduce((s, p) => s + p.row, 0) / currentPositions.length);
    } else {
      centerCol = Math.floor((terrain[0]?.length || 24) / 2);
      centerRow = Math.floor((terrain.length || 18) / 2);
    }

    // Compute new positions
    const offsets = formation.offsets(ordered.length);
    const maxCols = terrain[0]?.length || 24;
    const maxRows = terrain.length || 18;

    const newPositions: TokenPosition[] = mapPositions.map((p) => {
      const unitIdx = ordered.findIndex((u) => u.id === p.unitId);
      if (unitIdx === -1) return p; // non-player token — keep in place
      const [dc, dr] = offsets[unitIdx];
      const newCol = Math.max(0, Math.min(maxCols - 1, centerCol + dc));
      const newRow = Math.max(0, Math.min(maxRows - 1, centerRow + dr));
      // Check terrain — don't place on walls
      const cell = terrain[newRow]?.[newCol];
      if (cell === 'wall' || cell === 'void') return p; // skip if wall
      return { ...p, col: newCol, row: newRow };
    });

    onApplyFormation(newPositions);
  }, [playerUnits, marchingOrder, mapPositions, terrain, onApplyFormation]);

  // Drag reorder for marching order
  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setMarchingOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDragIdx(idx);
  };
  const handleDragEnd = () => setDragIdx(null);

  if (playerUnits.length === 0) return null;

  return (
    <div className="space-y-2">
      <label className="text-[10px] text-slate-500 font-semibold uppercase">Formation</label>
      <div className="grid grid-cols-3 gap-1">
        {FORMATIONS.map((f) => (
          <button
            key={f.id}
            onClick={() => applyFormation(f)}
            title={f.description}
            className="px-1.5 py-1.5 rounded-md text-[10px] font-medium transition-all border border-slate-700 text-slate-400 hover:border-sky-500/40 hover:text-sky-300 hover:bg-sky-900/10 flex flex-col items-center gap-0.5"
          >
            <span className="text-sm leading-none">{f.icon}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Marching order */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[9px] text-slate-600 font-semibold uppercase">Marching Order</label>
          <span className="text-[8px] text-slate-700">drag to reorder</span>
        </div>
        <div className="space-y-0.5">
          {marchingOrder.map((unitId, idx) => {
            const unit = playerUnits.find((u) => u.id === unitId);
            if (!unit) return null;
            const char = characters.find((c) => c.id === unit.characterId);
            return (
              <div
                key={unitId}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md border cursor-grab active:cursor-grabbing transition-all ${
                  dragIdx === idx ? 'border-sky-500/50 bg-sky-900/10 opacity-60' : 'border-slate-800 bg-slate-800/30 hover:border-slate-700'
                }`}
              >
                <span className="text-[9px] font-mono text-slate-600 w-3">{idx + 1}</span>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                  idx === 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'
                }`}>
                  {unit.name.charAt(0)}
                </span>
                <span className="text-[10px] text-slate-300 flex-1 truncate">{unit.name}</span>
                <span className="text-[8px] text-slate-600">{char?.class}</span>
                {idx === 0 && <span className="text-[7px] text-amber-500 font-bold">POINT</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
