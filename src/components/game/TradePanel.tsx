// TradePanel — exchange gold and items between party members.
// Simple UI: select target, enter gold amount, click Send.
// Immediate transfer (no approval needed for now — trust your party!).
import { useState } from 'react';
import type { Character, Item } from '../../types/game';

interface TradePanelProps {
  character: Character;
  partyMembers: Character[];
  onTransfer: (fromId: string, toId: string, gold: number, items: Item[]) => void;
  onMessage: (msg: string) => void;
}

export default function TradePanel({ character, partyMembers, onTransfer, onMessage }: TradePanelProps) {
  const [targetId, setTargetId] = useState('');
  const [goldAmount, setGoldAmount] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const others = partyMembers.filter((p) => p.id !== character.id);
  if (others.length === 0) return null;

  const gold = parseInt(goldAmount) || 0;
  const target = others.find((p) => p.id === targetId);
  const items = (character.inventory || []).filter((i) => selectedItems.has(i.id || i.name));

  const canTrade = target && (gold > 0 || items.length > 0) && gold <= (character.gold || 0);

  const executeTrade = () => {
    if (!canTrade || !target) return;
    onTransfer(character.id, target.id, gold, items);
    const parts: string[] = [];
    if (gold > 0) parts.push(`${gold}gp`);
    if (items.length > 0) parts.push(items.map((i) => i.name).join(', '));
    onMessage(`${character.name} gives ${parts.join(' + ')} to ${target.name}.`);
    setGoldAmount('');
    setSelectedItems(new Set());
  };

  return (
    <div className="space-y-2 border-t border-slate-700/50 pt-2 mt-2">
      <label className="text-[10px] text-slate-500 font-semibold uppercase">Trade</label>
      <div className="flex gap-1.5">
        <select
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300"
        >
          <option value="">Trade with...</option>
          {others.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input
          type="number"
          value={goldAmount}
          onChange={(e) => setGoldAmount(e.target.value)}
          placeholder="Gold"
          min={0}
          max={character.gold || 0}
          className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-yellow-300 placeholder:text-slate-600"
        />
      </div>
      {(character.inventory || []).length > 0 && targetId && (
        <div className="max-h-20 overflow-y-auto space-y-0.5">
          {(character.inventory || []).map((item) => {
            const key = item.id || item.name;
            const selected = selectedItems.has(key);
            return (
              <button
                key={key}
                onClick={() => setSelectedItems((prev) => {
                  const next = new Set(prev);
                  selected ? next.delete(key) : next.add(key);
                  return next;
                })}
                className={`w-full text-left text-[9px] px-2 py-0.5 rounded border transition-all ${
                  selected ? 'border-amber-600/50 bg-amber-900/20 text-amber-300' : 'border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {selected ? '✓ ' : ''}{item.name}
              </button>
            );
          })}
        </div>
      )}
      <button
        onClick={executeTrade}
        disabled={!canTrade}
        className="w-full py-1 bg-amber-800/40 hover:bg-amber-800/60 disabled:opacity-30 border border-amber-700/40 text-amber-300 text-[10px] font-semibold rounded transition-all"
      >
        Send{gold > 0 ? ` ${gold}gp` : ''}{items.length > 0 ? ` + ${items.length} item${items.length !== 1 ? 's' : ''}` : ''}
      </button>
    </div>
  );
}
