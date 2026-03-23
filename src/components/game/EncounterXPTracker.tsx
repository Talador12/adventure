// EncounterXPTracker — live XP budget display during combat.
// Shows total enemy XP, defeated XP, and per-player share.
import { useMemo } from 'react';
import type { Unit } from '../../types/game';

interface EncounterXPTrackerProps {
  units: Unit[];
  playerCount: number;
  inCombat: boolean;
}

export default function EncounterXPTracker({ units, playerCount, inCombat }: EncounterXPTrackerProps) {
  const { totalXP, defeatedXP, aliveEnemies, deadEnemies } = useMemo(() => {
    const enemies = units.filter((u) => u.type === 'enemy');
    const alive = enemies.filter((u) => u.hp > 0);
    const dead = enemies.filter((u) => u.hp <= 0);
    return {
      totalXP: enemies.reduce((s, u) => s + (u.xpValue || 0), 0),
      defeatedXP: dead.reduce((s, u) => s + (u.xpValue || 0), 0),
      aliveEnemies: alive.length,
      deadEnemies: dead.length,
    };
  }, [units]);

  if (!inCombat || totalXP === 0) return null;

  const perPlayer = playerCount > 0 ? Math.floor(defeatedXP / playerCount) : 0;
  const progress = totalXP > 0 ? (defeatedXP / totalXP) * 100 : 0;

  return (
    <div className="flex items-center gap-2 px-3 py-1 border-t border-slate-800/50 bg-slate-900/30 text-[9px]">
      <span className="text-amber-500 font-bold uppercase tracking-wider">XP</span>
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <span className="text-amber-400 font-mono">{defeatedXP}/{totalXP}</span>
      <span className="text-slate-600">|</span>
      <span className="text-slate-400">{deadEnemies} defeated</span>
      <span className="text-slate-600">|</span>
      <span className="text-emerald-400">{perPlayer} XP/player</span>
    </div>
  );
}
