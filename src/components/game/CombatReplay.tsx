// Combat replay viewer — step through recorded combat events.
// Shows a timeline scrubber and event descriptions with unit state snapshots.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { CombatRecording, CombatEvent } from '../../lib/combatRecorder';

interface Props {
  recording: CombatRecording;
  onClose: () => void;
}

const EVENT_ICONS: Record<CombatEvent['type'], string> = {
  start: '⚔️', move: '🏃', attack: '🗡️', damage: '💥',
  death: '💀', turn: '🔄', spell: '✨', heal: '💚', end: '🏁',
};

const EVENT_COLORS: Record<CombatEvent['type'], string> = {
  start: 'text-amber-400', move: 'text-sky-400', attack: 'text-orange-400',
  damage: 'text-red-400', death: 'text-red-600', turn: 'text-slate-400',
  spell: 'text-violet-400', heal: 'text-emerald-400', end: 'text-amber-400',
};

export default function CombatReplay({ recording, onClose }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const events = recording.events;
  const currentEvent = events[currentIdx];
  const progress = events.length > 0 ? (currentIdx / (events.length - 1)) * 100 : 0;
  const miniMapRef = useRef<HTMLCanvasElement>(null);

  // Render mini map with unit positions from current event
  const drawMiniMap = useCallback(() => {
    const canvas = miniMapRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);
    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    const cellW = W / 20;
    const cellH = H / 20;
    for (let i = 0; i <= 20; i++) {
      ctx.beginPath(); ctx.moveTo(i * cellW, 0); ctx.lineTo(i * cellW, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cellH); ctx.lineTo(W, i * cellH); ctx.stroke();
    }
    // Draw units from event positions
    const positions = currentEvent?.positions;
    const units = currentEvent?.units;
    if (!positions || !units) return;
    for (const pos of positions) {
      const unit = units.find((u) => u.id === pos.unitId);
      if (!unit || unit.hp <= 0) continue;
      const cx = pos.col * cellW + cellW / 2;
      const cy = pos.row * cellH + cellH / 2;
      const r = Math.min(cellW, cellH) * 0.35;
      // Circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = unit.type === 'player' ? '#F38020' : '#ef4444';
      if (unit.isCurrentTurn) ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.strokeStyle = unit.isCurrentTurn ? '#fbbf24' : '#475569';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Initial
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.round(r)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(unit.name.charAt(0), cx, cy);
    }
  }, [currentEvent]);

  useEffect(() => { drawMiniMap(); }, [drawMiniMap]);

  // Auto-play
  useEffect(() => {
    if (!playing || currentIdx >= events.length - 1) {
      setPlaying(false);
      return;
    }
    const nextEvent = events[currentIdx + 1];
    const delay = nextEvent ? Math.max(200, (nextEvent.timestamp - events[currentIdx].timestamp) / speed) : 1000;
    timerRef.current = setTimeout(() => setCurrentIdx((i) => Math.min(i + 1, events.length - 1)), Math.min(delay, 2000));
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, currentIdx, events, speed]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrentIdx((i) => Math.min(i + 1, events.length - 1));
      else if (e.key === 'ArrowLeft') setCurrentIdx((i) => Math.max(i - 1, 0));
      else if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); }
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [events.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fade-in-up">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-[#F38020]">Combat Replay</h2>
            <span className="text-[9px] text-slate-500">
              {events.length} events · {recording.endedAt ? `${Math.round((recording.endedAt - recording.startedAt) / 1000)}s` : 'In progress'}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-lg">×</button>
        </div>

        {/* Current event display */}
        <div className="px-5 py-6 text-center min-h-[120px] flex flex-col items-center justify-center">
          {currentEvent ? (
            <>
              <span className="text-3xl mb-2">{EVENT_ICONS[currentEvent.type]}</span>
              <span className={`text-sm font-semibold ${EVENT_COLORS[currentEvent.type]}`}>
                {currentEvent.description}
              </span>
              {currentEvent.unitName && (
                <span className="text-[10px] text-slate-500 mt-1">{currentEvent.unitName}</span>
              )}
              <span className="text-[8px] text-slate-600 mt-1 font-mono">
                {Math.round(currentEvent.timestamp / 1000)}s
              </span>
            </>
          ) : (
            <span className="text-slate-600 italic text-sm">No events recorded</span>
          )}
        </div>

        {/* Mini battle map showing unit positions */}
        {currentEvent?.positions && currentEvent.positions.length > 0 && (
          <div className="flex justify-center pb-2">
            <canvas
              ref={miniMapRef}
              width={200}
              height={200}
              className="rounded-lg border border-slate-700/50"
            />
          </div>
        )}

        {/* Unit HP snapshot */}
        {currentEvent?.units && (
          <div className="px-5 pb-3 flex flex-wrap gap-2 justify-center">
            {currentEvent.units.filter((u) => u.hp > 0 || u.type === 'player').map((u) => (
              <div key={u.id} className={`text-[9px] px-2 py-0.5 rounded border ${u.isCurrentTurn ? 'border-amber-500/50 bg-amber-950/20' : 'border-slate-700 bg-slate-800/30'}`}>
                <span className={u.type === 'player' ? 'text-[#F38020]' : 'text-red-400'}>{u.name}</span>
                <span className="text-slate-500 ml-1">{u.hp}/{u.maxHp}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timeline scrubber */}
        <div className="px-5 py-3 border-t border-slate-800">
          <input
            type="range"
            min={0}
            max={Math.max(0, events.length - 1)}
            value={currentIdx}
            onChange={(e) => { setCurrentIdx(Number(e.target.value)); setPlaying(false); }}
            className="w-full h-1.5 rounded-full accent-[#F38020] cursor-pointer"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <button onClick={() => setCurrentIdx(0)} className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800">⏮</button>
              <button onClick={() => setCurrentIdx((i) => Math.max(i - 1, 0))} className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800">◀</button>
              <button onClick={() => setPlaying(!playing)} className={`text-[10px] px-2 py-0.5 rounded font-semibold ${playing ? 'bg-red-900/40 text-red-400' : 'bg-emerald-900/40 text-emerald-400'}`}>
                {playing ? '⏸ Pause' : '▶ Play'}
              </button>
              <button onClick={() => setCurrentIdx((i) => Math.min(i + 1, events.length - 1))} className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800">▶</button>
              <button onClick={() => setCurrentIdx(events.length - 1)} className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800">⏭</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-500">{currentIdx + 1}/{events.length}</span>
              <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="text-[9px] px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                <option value={0.5}>0.5×</option>
                <option value={1}>1×</option>
                <option value={2}>2×</option>
                <option value={4}>4×</option>
              </select>
            </div>
          </div>
        </div>

        {/* Keyboard hints */}
        <div className="px-5 py-2 border-t border-slate-800/50 text-center text-[8px] text-slate-600">
          ← → step · Space play/pause · Esc close
        </div>
      </div>
    </div>
  );
}
