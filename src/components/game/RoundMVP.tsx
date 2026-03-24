// RoundMVP — quick flash showing who did the most damage this round.
// Fires at the end of each round (when Round N marker appears in combat log).
// Brief, specific, encouraging. "That round belonged to Thordak."
import { useState, useEffect, useRef, useCallback } from 'react';

interface RoundMVPDisplay {
  id: string;
  name: string;
  damage: number;
  round: number;
}

export function useRoundMVP() {
  const [display, setDisplay] = useState<RoundMVPDisplay | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const check = useCallback((combatLog: string[], playerNames: string[], round: number) => {
    // Find the last round marker and parse damage since then
    const roundMarkerIdx = combatLog.lastIndexOf(`--- Round ${round} ---`);
    if (roundMarkerIdx < 0) return;
    const roundLogs = combatLog.slice(roundMarkerIdx + 1);

    const dmg: Record<string, number> = {};
    for (const name of playerNames) dmg[name] = 0;

    for (const line of roundLogs) {
      for (const name of playerNames) {
        if (line.includes(name)) {
          const m = line.match(/for (\d+) (?:damage|fire|cold|force|radiant|necrotic|lightning|thunder|psychic|poison)/i);
          if (m && !line.toLowerCase().includes('takes')) {
            dmg[name] += parseInt(m[1]);
          }
        }
      }
    }

    const entries = Object.entries(dmg).filter(([, d]) => d > 0).sort(([, a], [, b]) => b - a);
    if (entries.length === 0) return;

    const [topName, topDmg] = entries[0];
    setDisplay({ id: crypto.randomUUID().slice(0, 6), name: topName, damage: topDmg, round });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDisplay(null), 2500);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);
  return { display, check };
}

export default function RoundMVP({ display }: { display: RoundMVPDisplay | null }) {
  if (!display) return null;

  return (
    <div key={display.id} className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[9987] pointer-events-none animate-fade-in-up">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-700/30 shadow-lg">
        <span className="text-amber-400 text-sm">&#9733;</span>
        <div className="text-[10px]">
          <span className="text-amber-300 font-bold">{display.name}</span>
          <span className="text-slate-500 ml-1">led round {display.round} with</span>
          <span className="text-red-400 font-mono ml-1">{display.damage} damage</span>
        </div>
      </div>
    </div>
  );
}
