// LevelUpFanfare — golden glow celebration when a character levels up.
// Shows the new level prominently with a brief radial golden pulse.
// "You feel yourself grow stronger." — every RPG ever, but now with style.
import { useState, useEffect, useRef, useCallback } from 'react';

interface LevelUpDisplay {
  id: string;
  characterName: string;
  newLevel: number;
}

export function useLevelUpFanfare() {
  const [display, setDisplay] = useState<LevelUpDisplay | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const trigger = useCallback((characterName: string, newLevel: number) => {
    setDisplay({ id: crypto.randomUUID().slice(0, 6), characterName, newLevel });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDisplay(null), 3000);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);
  return { display, trigger };
}

export default function LevelUpFanfare({ display }: { display: LevelUpDisplay | null }) {
  if (!display) return null;

  return (
    <div key={display.id} className="fixed inset-0 z-[9988] pointer-events-none flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent animate-fade-in" />
      <div className="animate-fade-in-up text-center">
        <div className="text-[10px] text-amber-500/80 uppercase tracking-[0.3em] mb-1">Level Up</div>
        <div className="text-4xl font-black text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">{display.newLevel}</div>
        <div className="text-sm text-amber-200/80 font-semibold mt-1">{display.characterName}</div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-2" />
      </div>
    </div>
  );
}
