// DramaticMoment — cinematic screen effects for pivotal combat moments.
// Nat 20s, boss kills, TPK threats, and clutch saves get dramatic overlays.

import { useState, useEffect, useCallback, useRef } from 'react';

export type MomentType = 'crit' | 'fumble' | 'boss_kill' | 'tpk_threat' | 'clutch_save' | 'level_up';

interface DramaticEvent {
  id: string;
  type: MomentType;
  title: string;
  subtitle: string;
  timestamp: number;
}

const MOMENT_CONFIG: Record<MomentType, { bg: string; text: string; glow: string; duration: number }> = {
  crit: { bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'shadow-amber-500/30', duration: 2000 },
  fumble: { bg: 'bg-red-500/10', text: 'text-red-400', glow: 'shadow-red-500/30', duration: 1500 },
  boss_kill: { bg: 'bg-purple-500/15', text: 'text-purple-300', glow: 'shadow-purple-500/40', duration: 3000 },
  tpk_threat: { bg: 'bg-red-900/20', text: 'text-red-300', glow: 'shadow-red-900/50', duration: 2500 },
  clutch_save: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/30', duration: 2000 },
  level_up: { bg: 'bg-yellow-500/10', text: 'text-yellow-300', glow: 'shadow-yellow-500/30', duration: 2500 },
};

export function useDramaticMoments() {
  const [active, setActive] = useState<DramaticEvent | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback((type: MomentType, title: string, subtitle: string = '') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const event: DramaticEvent = { id: `dm-${Date.now()}`, type, title, subtitle, timestamp: Date.now() };
    setActive(event);
    timerRef.current = setTimeout(() => setActive(null), MOMENT_CONFIG[type].duration);
  }, []);

  return { active, trigger };
}

interface DramaticMomentProps {
  event: DramaticEvent | null;
}

export default function DramaticMoment({ event }: DramaticMomentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (event) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), MOMENT_CONFIG[event.type].duration - 300);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [event]);

  if (!event || !visible) return null;

  const config = MOMENT_CONFIG[event.type];

  return (
    <div className={`fixed inset-0 z-[9990] pointer-events-none flex items-center justify-center ${config.bg}`}>
      {/* Screen edge flash */}
      <div className="absolute inset-0 animate-pulse" style={{ boxShadow: `inset 0 0 120px 40px ${config.glow.replace('shadow-', '').replace('/30', '').replace('/40', '').replace('/50', '')}20` }} />
      {/* Center text */}
      <div className="text-center animate-fade-in-up">
        <div className={`text-3xl md:text-5xl font-black ${config.text} drop-shadow-2xl tracking-tight`} style={{ textShadow: '0 0 40px currentColor' }}>
          {event.title}
        </div>
        {event.subtitle && (
          <div className={`text-sm md:text-lg ${config.text} opacity-70 mt-2 font-semibold`}>
            {event.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
