// DeathRecap — shows what killed a character when they drop to 0 HP.
// Displays the last 3 damage sources: who did it, how much, what type.
// "Here lies your HP. It had a good run."
import { useState, useEffect, useRef, useCallback } from 'react';

export interface DamageRecord {
  source: string;
  amount: number;
  type?: string;
  timestamp: number;
}

interface DeathRecapDisplay {
  id: string;
  unitName: string;
  sources: DamageRecord[];
}

export function useDeathRecap() {
  const [display, setDisplay] = useState<DeathRecapDisplay | null>(null);
  // Per-unit damage history (last 5 entries per unit)
  const historyRef = useRef<Map<string, DamageRecord[]>>(new Map());
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const recordDamage = useCallback((unitId: string, source: string, amount: number, type?: string) => {
    const history = historyRef.current.get(unitId) || [];
    history.push({ source, amount, type, timestamp: Date.now() });
    if (history.length > 5) history.shift();
    historyRef.current.set(unitId, history);
  }, []);

  const triggerRecap = useCallback((unitId: string, unitName: string) => {
    const sources = historyRef.current.get(unitId) || [];
    if (sources.length === 0) return;
    setDisplay({ id: crypto.randomUUID().slice(0, 6), unitName, sources: sources.slice(-3) });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDisplay(null), 5000);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { display, recordDamage, triggerRecap };
}

export default function DeathRecap({ display }: { display: DeathRecapDisplay | null }) {
  if (!display) return null;

  return (
    <div key={display.id} className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[9993] pointer-events-none animate-fade-in-up">
      <div className="bg-slate-900/95 border border-red-900/50 rounded-xl px-5 py-3 shadow-2xl backdrop-blur-sm max-w-xs">
        <div className="text-[9px] text-red-400 font-bold uppercase tracking-wider text-center mb-2">
          {display.unitName} has fallen
        </div>
        <div className="space-y-1">
          {display.sources.map((src, i) => (
            <div key={i} className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400 truncate max-w-[120px]">{src.source}</span>
              <span className="text-red-400 font-mono ml-2">
                {src.amount}{src.type ? ` ${src.type}` : ''}
              </span>
            </div>
          ))}
        </div>
        <div className="text-[8px] text-slate-600 text-center mt-2 italic">
          Total: {display.sources.reduce((s, r) => s + r.amount, 0)} damage from {display.sources.length} source{display.sources.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
