// LootTracker — shared party loot inventory, persisted per campaign in localStorage.
// DM adds items, any player can claim. Synced via WebSocket game_event.
import { useState, useEffect, useCallback } from 'react';

export interface LootItem {
  id: string;
  name: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
  description?: string;
  claimedBy?: string; // player name
}

interface LootTrackerProps {
  roomId: string;
  playerName: string;
  isDM: boolean;
  onBroadcast?: (event: { type: string; items: LootItem[] }) => void;
  syncRef?: React.MutableRefObject<((items: LootItem[]) => void) | null>;
}

const STORAGE_KEY = (room: string) => `adventure:loot:${room}`;

function loadLoot(room: string): LootItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(room));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLoot(room: string, items: LootItem[]) {
  try { localStorage.setItem(STORAGE_KEY(room), JSON.stringify(items)); } catch { /* ok */ }
}

const RARITY_COLORS: Record<string, string> = {
  common: 'text-slate-400 border-slate-600',
  uncommon: 'text-green-400 border-green-700/50',
  rare: 'text-blue-400 border-blue-700/50',
  'very rare': 'text-purple-400 border-purple-700/50',
  legendary: 'text-amber-400 border-amber-500/50',
};

const RARITY_BG: Record<string, string> = {
  common: 'bg-slate-800/40',
  uncommon: 'bg-green-950/20',
  rare: 'bg-blue-950/20',
  'very rare': 'bg-purple-950/20',
  legendary: 'bg-amber-950/20',
};

export default function LootTracker({ roomId, playerName, isDM, onBroadcast, syncRef }: LootTrackerProps) {
  const [items, setItems] = useState<LootItem[]>(() => loadLoot(roomId));
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [newRarity, setNewRarity] = useState<LootItem['rarity']>('common');
  const [newDesc, setNewDesc] = useState('');
  const [filter, setFilter] = useState<'all' | 'unclaimed' | 'claimed'>('all');

  // Expose sync function for remote updates
  useEffect(() => {
    if (syncRef) syncRef.current = (remote: LootItem[]) => setItems(remote);
    return () => { if (syncRef) syncRef.current = null; };
  }, [syncRef]);

  // Persist on change
  useEffect(() => { saveLoot(roomId, items); }, [items, roomId]);

  const broadcast = useCallback((nextItems: LootItem[]) => {
    onBroadcast?.({ type: 'loot_sync', items: nextItems });
  }, [onBroadcast]);

  const addItem = useCallback(() => {
    const name = newName.trim();
    if (!name) return;
    const item: LootItem = {
      id: crypto.randomUUID().slice(0, 8),
      name,
      quantity: Math.max(1, newQuantity),
      rarity: newRarity,
      description: newDesc.trim() || undefined,
    };
    setItems((prev) => {
      const next = [...prev, item];
      broadcast(next);
      return next;
    });
    setNewName('');
    setNewQuantity(1);
    setNewRarity('common');
    setNewDesc('');
    setShowAddForm(false);
  }, [newName, newQuantity, newRarity, newDesc, broadcast]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      broadcast(next);
      return next;
    });
  }, [broadcast]);

  const claimItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.map((i) => i.id === id ? { ...i, claimedBy: i.claimedBy ? undefined : playerName } : i);
      broadcast(next);
      return next;
    });
  }, [playerName, broadcast]);

  const displayed = filter === 'unclaimed' ? items.filter((i) => !i.claimedBy) :
                    filter === 'claimed' ? items.filter((i) => i.claimedBy) : items;

  const totalGold = items.reduce((sum, i) => {
    const match = i.name.match(/(\d+)\s*(gp|gold)/i);
    return match ? sum + parseInt(match[1]) * i.quantity : sum;
  }, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Party Loot</h3>
          <span className="text-[9px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded-full">{items.length}</span>
          {totalGold > 0 && (
            <span className="text-[9px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full">{totalGold} gp</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {(['all', 'unclaimed', 'claimed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] px-2 py-0.5 rounded-md border transition-all capitalize ${
                filter === f
                  ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
                  : 'border-slate-700 text-slate-500 hover:text-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 min-h-0">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <span className="text-2xl mb-2">💰</span>
            <p className="text-xs text-slate-500">
              {filter !== 'all' ? `No ${filter} items.` : 'No loot yet.'}
            </p>
            {isDM && <p className="text-[10px] text-slate-600 mt-1">Add items from combat drops, treasure, or shops.</p>}
          </div>
        ) : (
          displayed.map((item) => (
            <div
              key={item.id}
              className={`group rounded-lg border px-3 py-2 transition-all ${RARITY_BG[item.rarity]} ${
                item.claimedBy ? 'border-slate-700/50 opacity-70' : RARITY_COLORS[item.rarity].split(' ')[1]
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-semibold ${RARITY_COLORS[item.rarity].split(' ')[0]}`}>{item.name}</span>
                    {item.quantity > 1 && <span className="text-[10px] text-slate-500 font-mono">×{item.quantity}</span>}
                    <span className="text-[8px] text-slate-600 capitalize px-1 py-0.5 rounded bg-slate-800/60">{item.rarity}</span>
                  </div>
                  {item.description && <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>}
                  {item.claimedBy && (
                    <span className="text-[9px] text-emerald-400 mt-0.5 inline-block">Claimed by {item.claimedBy}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => claimItem(item.id)}
                    className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                      item.claimedBy === playerName
                        ? 'text-amber-400 hover:text-amber-300'
                        : item.claimedBy
                          ? 'text-slate-600 cursor-not-allowed'
                          : 'text-emerald-400 hover:text-emerald-300'
                    }`}
                    title={item.claimedBy === playerName ? 'Unclaim' : item.claimedBy ? `Claimed by ${item.claimedBy}` : 'Claim'}
                    disabled={!!item.claimedBy && item.claimedBy !== playerName}
                  >
                    {item.claimedBy === playerName ? '↩' : '✋'}
                  </button>
                  {isDM && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] text-slate-600 hover:text-red-400 transition-colors px-1"
                      title="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add item form (DM only) */}
      {isDM && (
        <div className="shrink-0 px-4 py-3 border-t border-slate-800">
          {showAddForm ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addItem(); }}
                  placeholder="Item name..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-amber-500/50 input-glow transition-all"
                  autoFocus
                />
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={999}
                  className="w-14 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 text-center outline-none focus:border-amber-500/50"
                  title="Quantity"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={newRarity}
                  onChange={(e) => setNewRarity(e.target.value as LootItem['rarity'])}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none focus:border-amber-500/50"
                >
                  {(['common', 'uncommon', 'rare', 'very rare', 'legendary'] as const).map((r) => (
                    <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Description (optional)"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-amber-500/50"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addItem}
                  disabled={!newName.trim()}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-amber-600/20 border border-amber-500/30 text-amber-300 hover:bg-amber-600/30 hover:border-amber-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  Add Item
                </button>
                <button onClick={() => setShowAddForm(false)} className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-1.5 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-amber-300 hover:border-amber-500/40 transition-all"
            >
              + Add Loot
            </button>
          )}
        </div>
      )}
    </div>
  );
}
