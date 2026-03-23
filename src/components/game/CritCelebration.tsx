// CritCelebration — screen-wide rainbow flash + confetti burst on natural 20.
// "When the dice gods smile, the whole table should feel it."
// Renders a fixed overlay that auto-dismisses. Confetti particles are pure CSS.
import { useState, useEffect, useCallback, useRef } from 'react';

interface Confetto {
  id: number;
  x: number; // left %
  color: string;
  delay: number; // animation-delay ms
  size: number;
  rotation: number;
}

const CONFETTI_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e', '#a3e635'];

export function useCritCelebration() {
  const [active, setActive] = useState(false);
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const trigger = useCallback(() => {
    const pieces: Confetto[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 600,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);
    setActive(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setActive(false); setConfetti([]); }, 2500);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { active, confetti, trigger };
}

interface CritCelebrationProps {
  active: boolean;
  confetti: Confetto[];
}

export default function CritCelebration({ active, confetti }: CritCelebrationProps) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none">
      {/* Rainbow border flash */}
      <div className="absolute inset-0 border-[6px] rounded-lg animate-rainbow-crit" />
      {/* Confetti particles */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute top-0"
          style={{
            left: `${c.x}%`,
            width: c.size,
            height: c.size * 1.5,
            backgroundColor: c.color,
            borderRadius: '2px',
            animation: `confettiFall ${1.5 + Math.random()}s ease-in forwards`,
            animationDelay: `${c.delay}ms`,
            transform: `rotate(${c.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
