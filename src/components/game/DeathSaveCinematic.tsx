// DeathSaveCinematic — dramatic overlay when a death save happens.
// Screen dims, a heartbeat pulse plays, and the result fades in.
// Brief and respectful — 3 seconds, no camp, just tension and release.
import { useState, useEffect, useRef, useCallback } from 'react';

interface DeathSaveDisplay {
  id: string;
  characterName: string;
  message: string;
  isSuccess: boolean;
  isNat20: boolean;
  isDeath: boolean;
}

export function useDeathSaveCinematic() {
  const [display, setDisplay] = useState<DeathSaveDisplay | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const trigger = useCallback((characterName: string, message: string) => {
    const isNat20 = message.includes('natural 20') || message.includes('conscious');
    const isDeath = message.includes('DEAD');
    const isSuccess = message.includes('stabilized') || isNat20 || (message.includes('success') && !isDeath);

    setDisplay({
      id: crypto.randomUUID().slice(0, 6),
      characterName,
      message,
      isSuccess,
      isNat20,
      isDeath,
    });

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDisplay(null), 3500);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);
  return { display, trigger };
}

export default function DeathSaveCinematic({ display }: { display: DeathSaveDisplay | null }) {
  if (!display) return null;

  const bgColor = display.isDeath
    ? 'from-red-950/60 to-black/80'
    : display.isNat20
      ? 'from-amber-950/40 to-black/60'
      : display.isSuccess
        ? 'from-slate-950/50 to-black/60'
        : 'from-red-950/50 to-black/70';

  const textColor = display.isDeath
    ? 'text-red-500'
    : display.isNat20
      ? 'text-amber-400'
      : display.isSuccess
        ? 'text-emerald-400'
        : 'text-red-400';

  return (
    <div key={display.id} className={`fixed inset-0 z-[9994] pointer-events-none flex items-center justify-center bg-gradient-to-b ${bgColor}`}>
      <div className="animate-death-pulse text-center">
        <div className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-2">{display.characterName}</div>
        <div className={`text-lg font-bold ${textColor}`}>
          {display.isDeath ? 'Fallen' : display.isNat20 ? 'Back on their feet' : display.isSuccess ? 'Hanging on' : 'Slipping away'}
        </div>
        <div className="text-[10px] text-slate-500 mt-2 max-w-xs mx-auto">{display.message}</div>
      </div>
    </div>
  );
}
