// LootSplitter — auto-divide gold and items among party members.
// DM enters a total gold amount, selects items, and splits evenly (with remainder to DM's choice).
import { useState, useMemo } from 'react';

interface LootSplitterProps {
  partyNames: string[];
  onGoldSplit: (splits: Record<string, number>) => void;
  onMessage: (msg: string) => void;
}

export default function LootSplitter({ partyNames, onGoldSplit, onMessage }: LootSplitterProps) {
  const [goldAmount, setGoldAmount] = useState('');
  const [showSplit, setShowSplit] = useState(false);

  const gold = parseInt(goldAmount) || 0;
  const perPerson = partyNames.length > 0 ? Math.floor(gold / partyNames.length) : 0;
  const remainder = partyNames.length > 0 ? gold - perPerson * partyNames.length : 0;

  const splits = useMemo(() => {
    const s: Record<string, number> = {};
    partyNames.forEach((name, i) => {
      s[name] = perPerson + (i === 0 && remainder > 0 ? remainder : 0);
    });
    return s;
  }, [partyNames, perPerson, remainder]);

  const applySplit = () => {
    if (gold <= 0 || partyNames.length === 0) return;
    onGoldSplit(splits);
    const parts = Object.entries(splits).map(([name, g]) => `${name}: ${g}gp`).join(', ');
    onMessage(`Loot split: ${gold}gp among ${partyNames.length} → ${parts}`);
    setGoldAmount('');
    setShowSplit(false);
  };

  if (partyNames.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Loot Split</label>
        <span className="text-[8px] text-slate-600">{partyNames.length} members</span>
      </div>
      <div className="flex gap-1.5">
        <input
          type="number"
          value={goldAmount}
          onChange={(e) => { setGoldAmount(e.target.value); setShowSplit(true); }}
          placeholder="Gold to split..."
          className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-yellow-300 placeholder:text-slate-600 focus:border-yellow-600 focus:outline-none"
          onKeyDown={(e) => { if (e.key === 'Enter') applySplit(); }}
          min={0}
        />
        <button
          onClick={applySplit}
          disabled={gold <= 0}
          className="px-2.5 py-1 bg-yellow-900/40 hover:bg-yellow-900/60 disabled:opacity-30 border border-yellow-700/40 text-yellow-300 text-[10px] font-semibold rounded transition-all"
        >
          Split
        </button>
      </div>
      {showSplit && gold > 0 && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-2 space-y-1">
          <div className="text-[9px] text-slate-500 flex justify-between">
            <span>{gold}gp ÷ {partyNames.length}</span>
            <span>{perPerson}gp each{remainder > 0 ? ` (+${remainder} to first)` : ''}</span>
          </div>
          {Object.entries(splits).map(([name, g]) => (
            <div key={name} className="flex items-center justify-between text-[10px]">
              <span className="text-slate-300">{name}</span>
              <span className="text-yellow-400 font-mono">{g}gp</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
