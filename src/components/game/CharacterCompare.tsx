// Character comparison — side-by-side stat comparison between two characters.
// Shows stats, HP, AC, level, and highlights which is higher.

import { useState } from 'react';
import type { Character } from '../../types/game';

interface Props {
  characters: Character[];
  onClose: () => void;
}

export default function CharacterCompare({ characters, onClose }: Props) {
  const [leftId, setLeftId] = useState(characters[0]?.id || '');
  const [rightId, setRightId] = useState(characters[1]?.id || '');
  const left = characters.find((c) => c.id === leftId);
  const right = characters.find((c) => c.id === rightId);

  const statRow = (label: string, lv: number, rv: number) => {
    const lWins = lv > rv;
    const rWins = rv > lv;
    return (
      <div key={label} className="flex items-center text-xs">
        <span className={`w-10 text-right font-bold ${lWins ? 'text-emerald-400' : 'text-slate-300'}`}>{lv}</span>
        <span className="flex-1 text-center text-[9px] text-slate-500 uppercase">{label}</span>
        <span className={`w-10 text-left font-bold ${rWins ? 'text-emerald-400' : 'text-slate-300'}`}>{rv}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center animate-fade-in-up" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-[#F38020]">Character Comparison</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300">×</button>
        </div>

        {/* Character selectors */}
        <div className="flex gap-2 mb-4">
          <select value={leftId} onChange={(e) => setLeftId(e.target.value)} className="flex-1 text-xs px-2 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
            {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <span className="text-slate-600 text-xs self-center">vs</span>
          <select value={rightId} onChange={(e) => setRightId(e.target.value)} className="flex-1 text-xs px-2 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
            {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {left && right && (
          <div className="space-y-1.5">
            {/* Headers */}
            <div className="flex items-center text-[10px] text-slate-500 mb-2">
              <span className="w-10 text-right font-semibold text-[#F38020]">{left.name}</span>
              <span className="flex-1" />
              <span className="w-10 text-left font-semibold text-sky-400">{right.name}</span>
            </div>

            {/* Core stats */}
            {statRow('Level', left.level, right.level)}
            {statRow('HP', left.hp, right.hp)}
            {statRow('Max HP', left.maxHp, right.maxHp)}
            {statRow('AC', left.ac, right.ac)}

            <div className="border-t border-slate-800 my-2" />

            {/* Ability scores */}
            {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map((stat) =>
              statRow(stat, left.stats[stat], right.stats[stat])
            )}

            <div className="border-t border-slate-800 my-2" />

            {/* Other */}
            {statRow('Gold', Math.round(left.gold || 0), Math.round(right.gold || 0))}
            {statRow('Items', left.inventory?.length || 0, right.inventory?.length || 0)}
            {statRow('Spells', (left.customSpells?.length || 0), (right.customSpells?.length || 0))}
          </div>
        )}
      </div>
    </div>
  );
}
