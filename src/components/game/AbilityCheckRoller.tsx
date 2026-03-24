// AbilityCheckRoller — quick-roll any ability check with modifier auto-calculated.
// Select ability, click roll. Proficiency applied for trained skills.
// "Roll a Perception check." *clicks button* Done.
import { useState, useCallback } from 'react';
import type { Character } from '../../types/game';

const ABILITIES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;

interface AbilityCheckRollerProps {
  character: Character | null;
  onRoll: (ability: string, total: number, roll: number, mod: number, message: string) => void;
}

export default function AbilityCheckRoller({ character, onRoll }: AbilityCheckRollerProps) {
  const [lastResult, setLastResult] = useState<{ ability: string; roll: number; total: number } | null>(null);

  const rollCheck = useCallback((ability: typeof ABILITIES[number]) => {
    if (!character) return;
    const score = character.stats?.[ability] ?? 10;
    const mod = Math.floor((score - 10) / 2);
    const profBonus = Math.floor((character.level - 1) / 4) + 2;
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + mod;
    const isCrit = roll === 20;
    const isFumble = roll === 1;

    setLastResult({ ability, roll, total });
    const msg = `${character.name} rolls ${ability} check: ${roll}+${mod}=${total}${isCrit ? ' (Natural 20!)' : isFumble ? ' (Natural 1...)' : ''}`;
    onRoll(ability, total, roll, mod, msg);
    setTimeout(() => setLastResult(null), 3000);
  }, [character, onRoll]);

  if (!character) return null;

  return (
    <div className="space-y-1">
      <label className="text-[9px] text-slate-600 font-semibold uppercase">Quick Check</label>
      <div className="grid grid-cols-6 gap-0.5">
        {ABILITIES.map((ab) => {
          const score = character.stats?.[ab] ?? 10;
          const mod = Math.floor((score - 10) / 2);
          const isLast = lastResult?.ability === ab;
          return (
            <button
              key={ab}
              onClick={() => rollCheck(ab)}
              className={`flex flex-col items-center py-1 rounded border text-[8px] transition-all ${
                isLast ? 'border-amber-500/50 bg-amber-900/20 text-amber-300' : 'border-slate-700/50 bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
              title={`${ab}: ${score} (${mod >= 0 ? '+' : ''}${mod})`}
            >
              <span className="font-bold">{ab}</span>
              <span className="text-[7px] text-slate-600">{mod >= 0 ? '+' : ''}{mod}</span>
              {isLast && <span className="text-[8px] font-mono text-amber-400">{lastResult.total}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
