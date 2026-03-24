// SavingThrowRoller — quick-roll saving throws with DC comparison.
// Select save type, enter DC, click roll. Pass/fail highlighted instantly.
import { useState, useCallback } from 'react';
import type { Character } from '../../types/game';

const SAVES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;

interface SavingThrowRollerProps {
  character: Character | null;
  onRoll: (message: string) => void;
}

export default function SavingThrowRoller({ character, onRoll }: SavingThrowRollerProps) {
  const [dc, setDC] = useState(15);
  const [lastResult, setLastResult] = useState<{ save: string; pass: boolean; total: number } | null>(null);

  const rollSave = useCallback((save: typeof SAVES[number]) => {
    if (!character) return;
    const score = character.stats?.[save] ?? 10;
    const mod = Math.floor((score - 10) / 2);
    const profBonus = Math.floor((character.level - 1) / 4) + 2;
    // Check if character is proficient in this save (class-based)
    const profSaves = getSaveProficiencies(character.class);
    const isProficient = profSaves.includes(save);
    const totalMod = mod + (isProficient ? profBonus : 0);
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + totalMod;
    const pass = total >= dc;

    setLastResult({ save, pass, total });
    const profTag = isProficient ? ' (proficient)' : '';
    const msg = `${character.name} ${save} save vs DC ${dc}: ${roll}+${totalMod}=${total} — ${pass ? 'PASS' : 'FAIL'}${profTag}`;
    onRoll(msg);
    setTimeout(() => setLastResult(null), 3000);
  }, [character, dc, onRoll]);

  if (!character) return null;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[9px] text-slate-600 font-semibold uppercase">Saving Throw</label>
        <div className="flex items-center gap-1">
          <span className="text-[8px] text-slate-500">DC</span>
          <input
            type="number"
            value={dc}
            onChange={(e) => setDC(parseInt(e.target.value) || 10)}
            className="w-8 px-1 py-0 bg-slate-800 border border-slate-700 rounded text-[9px] text-center text-slate-300 focus:outline-none focus:border-amber-600"
            min={1} max={30}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-0.5">
        {SAVES.map((save) => {
          const score = character.stats?.[save] ?? 10;
          const mod = Math.floor((score - 10) / 2);
          const profSaves = getSaveProficiencies(character.class);
          const isProficient = profSaves.includes(save);
          const profBonus = Math.floor((character.level - 1) / 4) + 2;
          const totalMod = mod + (isProficient ? profBonus : 0);
          const isLast = lastResult?.save === save;
          return (
            <button
              key={save}
              onClick={() => rollSave(save)}
              className={`flex flex-col items-center py-1 rounded border text-[8px] transition-all ${
                isLast
                  ? (lastResult.pass ? 'border-emerald-500/50 bg-emerald-900/20 text-emerald-300' : 'border-red-500/50 bg-red-900/20 text-red-300')
                  : 'border-slate-700/50 bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
              title={`${save}: ${score} (${totalMod >= 0 ? '+' : ''}${totalMod})${isProficient ? ' [proficient]' : ''}`}
            >
              <span className={`font-bold ${isProficient ? 'text-amber-400' : ''}`}>{save}</span>
              <span className="text-[7px] text-slate-600">{totalMod >= 0 ? '+' : ''}{totalMod}</span>
              {isLast && <span className={`text-[8px] font-mono ${lastResult.pass ? 'text-emerald-400' : 'text-red-400'}`}>{lastResult.total}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// D&D 5e saving throw proficiencies by class
function getSaveProficiencies(cls: string): string[] {
  const map: Record<string, string[]> = {
    Barbarian: ['STR', 'CON'], Bard: ['DEX', 'CHA'], Cleric: ['WIS', 'CHA'],
    Druid: ['INT', 'WIS'], Fighter: ['STR', 'CON'], Monk: ['STR', 'DEX'],
    Paladin: ['WIS', 'CHA'], Ranger: ['STR', 'DEX'], Rogue: ['DEX', 'INT'],
    Sorcerer: ['CON', 'CHA'], Warlock: ['WIS', 'CHA'], Wizard: ['INT', 'WIS'],
  };
  return map[cls] || [];
}
