// SessionTimer — tracks total play time per session with pause/resume.
// Persists elapsed time to localStorage so it survives page refreshes.
import { useState, useEffect, useRef, useCallback } from 'react';

interface SessionTimerProps {
  roomId: string;
  compact?: boolean;
}

const STORAGE_KEY = (room: string) => `adventure:timer:${room}`;

interface TimerState {
  elapsed: number;   // total ms played
  running: boolean;
  lastTick: number;  // Date.now() of last persistence
}

function loadTimer(room: string): TimerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(room));
    if (raw) {
      const parsed = JSON.parse(raw);
      return { elapsed: parsed.elapsed || 0, running: false, lastTick: Date.now() };
    }
  } catch { /* ok */ }
  return { elapsed: 0, running: false, lastTick: Date.now() };
}

function saveTimer(room: string, elapsed: number) {
  try { localStorage.setItem(STORAGE_KEY(room), JSON.stringify({ elapsed })); } catch { /* ok */ }
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function SessionTimer({ roomId, compact }: SessionTimerProps) {
  const [elapsed, setElapsed] = useState(() => loadTimer(roomId).elapsed);
  const [running, setRunning] = useState(true); // auto-start on mount
  const startRef = useRef(Date.now());
  const baseRef = useRef(elapsed);

  // Tick every second when running
  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now();
    baseRef.current = elapsed;
    const interval = setInterval(() => {
      const now = Date.now();
      const next = baseRef.current + (now - startRef.current);
      setElapsed(next);
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // Persist every 30s
  useEffect(() => {
    const interval = setInterval(() => saveTimer(roomId, elapsed), 30000);
    return () => { clearInterval(interval); saveTimer(roomId, elapsed); };
  }, [roomId, elapsed]);

  // Save on unmount
  useEffect(() => () => saveTimer(roomId, elapsed), [roomId, elapsed]);

  const toggle = useCallback(() => setRunning((r) => !r), []);

  const reset = useCallback(() => {
    setElapsed(0);
    setRunning(true);
    startRef.current = Date.now();
    baseRef.current = 0;
    saveTimer(roomId, 0);
  }, [roomId]);

  if (compact) {
    return (
      <button
        onClick={toggle}
        title={running ? 'Pause session timer' : 'Resume session timer'}
        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border transition-all ${
          running
            ? 'text-emerald-400 border-emerald-700/40 bg-emerald-900/20'
            : 'text-slate-500 border-slate-700 bg-slate-800/50'
        }`}
      >
        {running ? '▶' : '⏸'} {formatTime(elapsed)}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`text-xs font-mono px-2 py-1 rounded-lg border transition-all ${
          running
            ? 'text-emerald-400 border-emerald-700/40 bg-emerald-900/20'
            : 'text-slate-400 border-slate-700 bg-slate-800/50 opacity-70'
        }`}
      >
        {formatTime(elapsed)}
      </div>
      <button
        onClick={toggle}
        className="text-[10px] px-2 py-1 rounded-md border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
        title={running ? 'Pause' : 'Resume'}
      >
        {running ? '⏸' : '▶'}
      </button>
      <button
        onClick={reset}
        className="text-[10px] px-2 py-1 rounded-md border border-slate-700 text-slate-500 hover:text-red-400 transition-colors"
        title="Reset timer"
      >
        ↺
      </button>
    </div>
  );
}
