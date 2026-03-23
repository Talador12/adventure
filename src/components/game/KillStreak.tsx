// KillStreak — announces multi-kills with escalating dramatic titles.
// "Double Kill!" → "Triple Kill!" → "RAMPAGE!" → "LEGENDARY!"
// Like a MOBA announcer had a baby with a D&D table. Nat 20 energy.
import { useState, useEffect, useRef, useCallback } from 'react';

const STREAK_TITLES: [number, string, string][] = [
  [2, 'Double Kill!', 'text-amber-400'],
  [3, 'Triple Kill!', 'text-orange-400'],
  [4, 'QUADRA KILL!', 'text-red-400'],
  [5, 'RAMPAGE!', 'text-rose-500'],
  [6, 'UNSTOPPABLE!', 'text-purple-400'],
  [7, 'GODLIKE!', 'text-violet-400'],
  [8, 'LEGENDARY!', 'text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]'],
];

function getStreakTitle(count: number): [string, string] | null {
  for (let i = STREAK_TITLES.length - 1; i >= 0; i--) {
    if (count >= STREAK_TITLES[i][0]) return [STREAK_TITLES[i][1], STREAK_TITLES[i][2]];
  }
  return null;
}

interface KillStreakDisplay {
  id: string;
  title: string;
  color: string;
  killer: string;
}

export function useKillStreak() {
  const [display, setDisplay] = useState<KillStreakDisplay | null>(null);
  const killsRef = useRef<Map<string, { count: number; lastKill: number }>>(new Map());
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const recordKill = useCallback((killerName: string) => {
    const now = Date.now();
    const entry = killsRef.current.get(killerName) || { count: 0, lastKill: 0 };
    // Reset streak if more than 8 seconds since last kill
    const streak = (now - entry.lastKill < 8000) ? entry.count + 1 : 1;
    killsRef.current.set(killerName, { count: streak, lastKill: now });

    const titleInfo = getStreakTitle(streak);
    if (titleInfo) {
      setDisplay({ id: crypto.randomUUID().slice(0, 6), title: titleInfo[0], color: titleInfo[1], killer: killerName });
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setDisplay(null), 2500);
    }
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { display, recordKill };
}

export default function KillStreak({ display }: { display: KillStreakDisplay | null }) {
  if (!display) return null;

  return (
    <div className="fixed top-20 right-8 z-[9996] pointer-events-none">
      <div key={display.id} className="animate-killstreak">
        <div className={`text-2xl font-black uppercase tracking-wider ${display.color}`}>
          {display.title}
        </div>
        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">{display.killer}</div>
      </div>
    </div>
  );
}
