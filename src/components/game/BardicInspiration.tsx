// BardicInspiration — party-shared pool of bonus dice.
// Bard grants inspiration die. Any player spends it to add 1d6 (or higher at level) to a roll.
// "You hear a stirring melody. Your next attempt feels... possible."
import { useState, useCallback } from 'react';

interface BardicInspirationProps {
  poolSize: number;
  dieSize: number; // d6 at level 1-4, d8 at 5-9, d10 at 10-14, d12 at 15+
  onGrant: () => void;
  onSpend: (roll: number) => void;
  isDM: boolean;
  hasBard: boolean;
}

export function getBardicDie(bardLevel: number): number {
  if (bardLevel >= 15) return 12;
  if (bardLevel >= 10) return 10;
  if (bardLevel >= 5) return 8;
  return 6;
}

export default function BardicInspiration({ poolSize, dieSize, onGrant, onSpend, isDM, hasBard }: BardicInspirationProps) {
  const [lastRoll, setLastRoll] = useState<number | null>(null);

  const spend = useCallback(() => {
    if (poolSize <= 0) return;
    const roll = Math.floor(Math.random() * dieSize) + 1;
    setLastRoll(roll);
    onSpend(roll);
    setTimeout(() => setLastRoll(null), 2000);
  }, [poolSize, dieSize, onSpend]);

  if (!hasBard && poolSize === 0) return null;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Bardic Inspiration</label>
        <span className="text-[8px] text-violet-400">d{dieSize}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Pool display — filled/empty dice icons */}
        <div className="flex gap-1">
          {Array.from({ length: Math.max(poolSize, 0) + (isDM ? 1 : 0) }, (_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold transition-all ${
                i < poolSize
                  ? 'bg-violet-900/40 border border-violet-600/50 text-violet-400'
                  : 'bg-slate-800/40 border border-slate-700/50 text-slate-600'
              }`}
            >
              d{dieSize}
            </div>
          )).slice(0, 5)}
        </div>
        <div className="flex gap-1 ml-auto">
          {/* DM / Bard can grant */}
          {(isDM || hasBard) && (
            <button
              onClick={onGrant}
              className="text-[9px] px-2 py-0.5 rounded border border-violet-700/40 bg-violet-900/20 text-violet-400 hover:text-violet-300 font-semibold transition-all"
            >
              + Grant
            </button>
          )}
          {/* Anyone can spend */}
          {poolSize > 0 && (
            <button
              onClick={spend}
              className="text-[9px] px-2 py-0.5 rounded border border-amber-700/40 bg-amber-900/20 text-amber-400 hover:text-amber-300 font-semibold transition-all"
            >
              Spend
            </button>
          )}
        </div>
      </div>
      {lastRoll !== null && (
        <div className="text-center animate-pop-in">
          <span className="text-sm font-black text-violet-400">+{lastRoll}</span>
          <span className="text-[8px] text-slate-500 ml-1">inspiration</span>
        </div>
      )}
    </div>
  );
}
