// DiceTower — animated 2D dice bounce before revealing the result.
// A die falls from the top, bounces twice, settles, then shows the number.
// Pure CSS transforms. No canvas. No library. Just vibes.
import { useState, useEffect, useRef, useCallback } from 'react';

interface DiceTowerDisplay {
  id: string;
  sides: number;
  value: number;
  isCrit: boolean;
  isFumble: boolean;
}

const DIE_SHAPES: Record<number, string> = {
  4: 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%)',
  6: '',
  8: 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  10: 'clip-path: polygon(50% 0%, 90% 35%, 75% 100%, 25% 100%, 10% 35%)',
  12: 'clip-path: polygon(50% 0%, 80% 10%, 100% 40%, 90% 75%, 60% 100%, 40% 100%, 10% 75%, 0% 40%, 20% 10%)',
  20: 'clip-path: polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)',
};

export function useDiceTower() {
  const [display, setDisplay] = useState<DiceTowerDisplay | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const enabledRef = useRef(localStorage.getItem('adventure:diceTower') !== 'off');

  const trigger = useCallback((sides: number, value: number, isCrit: boolean, isFumble: boolean) => {
    if (!enabledRef.current) return;
    setDisplay({ id: crypto.randomUUID().slice(0, 6), sides, value, isCrit, isFumble });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDisplay(null), 1800);
  }, []);

  const setEnabled = useCallback((on: boolean) => {
    enabledRef.current = on;
    localStorage.setItem('adventure:diceTower', on ? 'on' : 'off');
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { display, trigger, enabled: enabledRef.current, setEnabled };
}

export default function DiceTower({ display }: { display: DiceTowerDisplay | null }) {
  if (!display) return null;

  const bgColor = display.isCrit ? 'bg-amber-500' : display.isFumble ? 'bg-red-600' : 'bg-slate-200';
  const textColor = display.isCrit ? 'text-amber-950' : display.isFumble ? 'text-white' : 'text-slate-900';
  const glowClass = display.isCrit ? 'shadow-[0_0_30px_rgba(251,191,36,0.6)]' : display.isFumble ? 'shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'shadow-xl';
  const shape = DIE_SHAPES[display.sides] || '';

  return (
    <div key={display.id} className="fixed inset-0 z-[9989] pointer-events-none flex items-center justify-center">
      {/* Subtle backdrop dim */}
      <div className="absolute inset-0 bg-black/20 animate-fade-in" />
      {/* The die */}
      <div
        className="animate-dice-tower-bounce relative"
        style={{ animationDuration: '1.2s' }}
      >
        <div
          className={`w-16 h-16 ${bgColor} ${glowClass} rounded-lg flex items-center justify-center font-black text-2xl ${textColor} rotate-0`}
          style={shape ? { [shape.split(':')[0]]: shape.split(':')[1]?.trim() } : undefined}
        >
          {display.value}
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-semibold whitespace-nowrap">
          d{display.sides}
        </div>
      </div>
    </div>
  );
}
