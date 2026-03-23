// MassHPTool — DM applies heal or damage to multiple units at once.
// Select units via checkboxes, enter amount, apply. Great for AoE spells and healing word.
import { useState } from 'react';
import type { Unit } from '../../types/game';

interface MassHPToolProps {
  units: Unit[];
  onApply: (unitIds: string[], amount: number, isDamage: boolean) => void;
}

export default function MassHPTool({ units, onApply }: MassHPToolProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'damage' | 'heal'>('damage');

  const toggle = (id: string) => setSelected((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const selectAll = (type: 'player' | 'enemy') => {
    const ids = units.filter((u) => u.type === type && u.hp > 0).map((u) => u.id);
    setSelected(new Set(ids));
  };

  const apply = () => {
    const val = parseInt(amount) || 0;
    if (val <= 0 || selected.size === 0) return;
    onApply(Array.from(selected), val, mode === 'damage');
    setAmount('');
    setSelected(new Set());
  };

  if (units.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Mass HP</label>
        <div className="flex gap-1">
          <button onClick={() => selectAll('enemy')} className="text-[8px] text-red-400 hover:text-red-300">All enemies</button>
          <button onClick={() => selectAll('player')} className="text-[8px] text-sky-400 hover:text-sky-300">All players</button>
          <button onClick={() => setSelected(new Set())} className="text-[8px] text-slate-600 hover:text-slate-400">Clear</button>
        </div>
      </div>
      <div className="max-h-24 overflow-y-auto space-y-0.5">
        {units.filter((u) => u.hp > 0).map((u) => (
          <button
            key={u.id}
            onClick={() => toggle(u.id)}
            className={`w-full flex items-center gap-2 text-left text-[9px] px-2 py-0.5 rounded border transition-all ${
              selected.has(u.id)
                ? (u.type === 'player' ? 'border-sky-600/50 bg-sky-900/20 text-sky-300' : 'border-red-600/50 bg-red-900/20 text-red-300')
                : 'border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${selected.has(u.id) ? 'bg-current' : 'bg-slate-700'}`} />
            <span className="flex-1 truncate">{u.name}</span>
            <span className="text-[8px] text-slate-600">{u.hp}/{u.maxHp}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-1.5">
        <div className="flex rounded overflow-hidden border border-slate-700">
          <button
            onClick={() => setMode('damage')}
            className={`text-[9px] px-2 py-1 font-semibold transition-all ${mode === 'damage' ? 'bg-red-900/40 text-red-400' : 'bg-slate-800 text-slate-500'}`}
          >
            Damage
          </button>
          <button
            onClick={() => setMode('heal')}
            className={`text-[9px] px-2 py-1 font-semibold transition-all ${mode === 'heal' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}
          >
            Heal
          </button>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="HP..."
          min={1}
          className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 placeholder:text-slate-600 focus:outline-none"
          onKeyDown={(e) => { if (e.key === 'Enter') apply(); }}
        />
        <button
          onClick={apply}
          disabled={selected.size === 0 || (parseInt(amount) || 0) <= 0}
          className={`px-2.5 py-1 border text-[10px] font-semibold rounded transition-all disabled:opacity-30 ${
            mode === 'damage'
              ? 'bg-red-900/40 border-red-700/40 text-red-300 hover:bg-red-900/60'
              : 'bg-emerald-900/40 border-emerald-700/40 text-emerald-300 hover:bg-emerald-900/60'
          }`}
        >
          Apply ({selected.size})
        </button>
      </div>
    </div>
  );
}
