// HPFlytext — animated floating damage/heal numbers above tokens.
// Renders as absolutely-positioned spans that float upward and fade out.
// "The juice" — makes every hit feel impactful and every heal feel clutch.
import { useState, useEffect, useCallback, useRef } from 'react';

export interface FlyText {
  id: string;
  x: number; // percent of container width
  y: number; // percent of container height
  text: string;
  type: 'damage' | 'heal' | 'crit' | 'miss' | 'death';
}

interface HPFlytextProps {
  /** Width/height of the container (for positioning) */
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Exposed via ref so Game.tsx can push flytexts
export interface HPFlytextHandle {
  addFlytext: (col: number, row: number, text: string, type: FlyText['type'], gridCols: number, gridRows: number) => void;
}

export function useHPFlytext() {
  const [flytexts, setFlytexts] = useState<FlyText[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const addFlytext = useCallback((col: number, row: number, text: string, type: FlyText['type'], gridCols: number, gridRows: number) => {
    const id = crypto.randomUUID().slice(0, 8);
    const x = ((col + 0.5) / gridCols) * 100;
    const y = ((row + 0.3) / gridRows) * 100;
    setFlytexts((prev) => [...prev, { id, x, y, text, type }]);
    const timer = setTimeout(() => {
      setFlytexts((prev) => prev.filter((f) => f.id !== id));
      timers.current.delete(id);
    }, 1500);
    timers.current.set(id, timer);
  }, []);

  useEffect(() => {
    return () => { timers.current.forEach((t) => clearTimeout(t)); };
  }, []);

  return { flytexts, addFlytext };
}

const TYPE_STYLES: Record<FlyText['type'], string> = {
  damage: 'text-red-400 text-sm font-black',
  heal: 'text-emerald-400 text-sm font-black',
  crit: 'text-amber-300 text-lg font-black drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]',
  miss: 'text-slate-500 text-xs font-semibold italic',
  death: 'text-red-600 text-base font-black',
};

export default function HPFlytext({ flytexts }: { flytexts: FlyText[] }) {
  if (flytexts.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {flytexts.map((ft) => (
        <span
          key={ft.id}
          className={`absolute animate-float-up ${TYPE_STYLES[ft.type]}`}
          style={{ left: `${ft.x}%`, top: `${ft.y}%`, transform: 'translateX(-50%)' }}
        >
          {ft.type === 'damage' ? `-${ft.text}` : ft.type === 'heal' ? `+${ft.text}` : ft.type === 'crit' ? `${ft.text}!` : ft.text}
        </span>
      ))}
    </div>
  );
}
