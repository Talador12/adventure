// EncounterThermometer — visual gauge of remaining encounter difficulty.
// Starts at the encounter's rated difficulty (easy/medium/hard/deadly),
// shifts down as enemies drop. The bar empties, the color cools.
// "How much danger is left? This much."
import { useMemo } from 'react';
import type { Unit } from '../../types/game';

interface EncounterThermometerProps {
  units: Unit[];
  inCombat: boolean;
}

function difficultyLabel(pct: number): { label: string; color: string; bg: string } {
  if (pct >= 80) return { label: 'Deadly', color: 'text-red-400', bg: 'bg-red-500' };
  if (pct >= 55) return { label: 'Hard', color: 'text-orange-400', bg: 'bg-orange-500' };
  if (pct >= 30) return { label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500' };
  if (pct > 0) return { label: 'Easy', color: 'text-green-400', bg: 'bg-green-500' };
  return { label: 'Clear', color: 'text-slate-500', bg: 'bg-slate-600' };
}

export default function EncounterThermometer({ units, inCombat }: EncounterThermometerProps) {
  const { totalHp, currentHp, pct } = useMemo(() => {
    const enemies = units.filter((u) => u.type === 'enemy');
    const total = enemies.reduce((s, u) => s + u.maxHp, 0);
    const current = enemies.reduce((s, u) => s + Math.max(0, u.hp), 0);
    return { totalHp: total, currentHp: current, pct: total > 0 ? (current / total) * 100 : 0 };
  }, [units]);

  if (!inCombat || totalHp === 0) return null;

  const { label, color, bg } = difficultyLabel(pct);

  return (
    <div className="flex items-center gap-2 px-3 py-1 border-t border-slate-800/50 bg-slate-900/30 text-[9px]">
      <span className={`font-bold uppercase tracking-wider ${color}`}>{label}</span>
      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${bg}`}
          style={{ width: `${Math.max(2, pct)}%` }}
        />
      </div>
      <span className="text-slate-500 font-mono">{Math.round(pct)}%</span>
    </div>
  );
}
