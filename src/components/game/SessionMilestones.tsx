// SessionMilestones — tracks session stats and fires toast-style celebrations
// when the table hits milestones. The kind of thing that makes you feel like
// you're making progress even when the dice aren't cooperating.
import { useState, useEffect, useRef, useCallback } from 'react';

interface Milestone {
  id: string;
  text: string;
  icon: string;
}

const DAMAGE_MILESTONES = [100, 250, 500, 1000, 2500, 5000];
const ROLL_MILESTONES = [25, 50, 100, 200, 500];
const KILL_MILESTONES = [5, 10, 25, 50, 100];
const CRIT_MILESTONES = [3, 5, 10, 25];

export function useSessionMilestones() {
  const [toast, setToast] = useState<Milestone | null>(null);
  const statsRef = useRef({ damage: 0, rolls: 0, kills: 0, crits: 0 });
  const hitRef = useRef(new Set<string>());
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const check = useCallback((stat: string, value: number, milestones: number[], icon: string, label: string) => {
    for (const m of milestones) {
      const key = `${stat}-${m}`;
      if (value >= m && !hitRef.current.has(key)) {
        hitRef.current.add(key);
        setToast({ id: crypto.randomUUID().slice(0, 6), text: `${value.toLocaleString()} ${label}`, icon });
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setToast(null), 3000);
      }
    }
  }, []);

  const recordDamage = useCallback((amount: number) => {
    statsRef.current.damage += amount;
    check('damage', statsRef.current.damage, DAMAGE_MILESTONES, '⚔️', 'total damage dealt');
  }, [check]);

  const recordRoll = useCallback(() => {
    statsRef.current.rolls += 1;
    check('rolls', statsRef.current.rolls, ROLL_MILESTONES, '🎲', 'dice rolled this session');
  }, [check]);

  const recordKill = useCallback(() => {
    statsRef.current.kills += 1;
    check('kills', statsRef.current.kills, KILL_MILESTONES, '💀', 'enemies defeated');
  }, [check]);

  const recordCrit = useCallback(() => {
    statsRef.current.crits += 1;
    check('crits', statsRef.current.crits, CRIT_MILESTONES, '✨', 'critical hits');
  }, [check]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { toast, recordDamage, recordRoll, recordKill, recordCrit };
}

export default function SessionMilestones({ toast }: { toast: Milestone | null }) {
  if (!toast) return null;

  return (
    <div key={toast.id} className="fixed top-4 left-1/2 -translate-x-1/2 z-[9991] pointer-events-none animate-fade-in-up">
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/95 border border-amber-600/30 shadow-xl backdrop-blur-sm">
        <span className="text-lg">{toast.icon}</span>
        <div>
          <div className="text-[8px] text-amber-400 font-bold uppercase tracking-wider">Milestone</div>
          <div className="text-xs text-slate-300 font-semibold">{toast.text}</div>
        </div>
      </div>
    </div>
  );
}
