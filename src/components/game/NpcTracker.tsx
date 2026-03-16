// NpcTracker — DM tool for tracking NPCs the party has met.
// Tracks name, role, location, faction, disposition (hostile→allied), and freeform notes.
// localStorage-backed per campaign. DM can add/edit/remove NPCs.
import { useState, useEffect, useCallback } from 'react';

export interface NpcRecord {
  id: string;
  name: string;
  role: string; // e.g. "innkeeper", "thieves guild contact"
  location: string; // where they were last seen
  faction: string; // faction affiliation (freeform)
  disposition: number; // -2 hostile, -1 unfriendly, 0 neutral, 1 friendly, 2 allied
  notes: string; // freeform DM/player notes
  alive: boolean;
  createdAt: number;
}

const DISPOSITION_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  [-2]: { label: 'Hostile', color: 'text-red-400', bg: 'bg-red-500' },
  [-1]: { label: 'Unfriendly', color: 'text-orange-400', bg: 'bg-orange-500' },
  [0]: { label: 'Neutral', color: 'text-slate-400', bg: 'bg-slate-500' },
  [1]: { label: 'Friendly', color: 'text-green-400', bg: 'bg-green-500' },
  [2]: { label: 'Allied', color: 'text-emerald-400', bg: 'bg-emerald-500' },
};

const DISPOSITION_VALUES = [-2, -1, 0, 1, 2] as const;

interface NpcTrackerProps {
  roomId: string;
  isDM: boolean;
}

export default function NpcTracker({ roomId, isDM }: NpcTrackerProps) {
  const storageKey = `adventure:npcs:${roomId}`;
  const [npcs, setNpcs] = useState<NpcRecord[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // Add form state
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState('');
  const [addRole, setAddRole] = useState('');
  const [addLocation, setAddLocation] = useState('');
  const [addFaction, setAddFaction] = useState('');
  const [addDisposition, setAddDisposition] = useState(0);

  // Filters
  const [filter, setFilter] = useState<'all' | 'alive' | 'dead' | 'hostile' | 'friendly'>('all');
  const [search, setSearch] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  // Persist
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(npcs)); } catch { /* full */ }
  }, [npcs, storageKey]);

  const addNpc = useCallback(() => {
    if (!addName.trim()) return;
    const npc: NpcRecord = {
      id: crypto.randomUUID(),
      name: addName.trim(),
      role: addRole.trim(),
      location: addLocation.trim(),
      faction: addFaction.trim(),
      disposition: addDisposition,
      notes: '',
      alive: true,
      createdAt: Date.now(),
    };
    setNpcs((prev) => [npc, ...prev]);
    setAddName(''); setAddRole(''); setAddLocation(''); setAddFaction(''); setAddDisposition(0);
    setShowAdd(false);
  }, [addName, addRole, addLocation, addFaction, addDisposition]);

  const removeNpc = useCallback((id: string) => {
    setNpcs((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const updateNpc = useCallback((id: string, updates: Partial<NpcRecord>) => {
    setNpcs((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  }, []);

  // Filter + search
  const filtered = npcs.filter((n) => {
    if (filter === 'alive' && !n.alive) return false;
    if (filter === 'dead' && n.alive) return false;
    if (filter === 'hostile' && n.disposition >= 0) return false;
    if (filter === 'friendly' && n.disposition <= 0) return false;
    if (search) {
      const s = search.toLowerCase();
      return n.name.toLowerCase().includes(s) || n.role.toLowerCase().includes(s) || n.location.toLowerCase().includes(s) || n.faction.toLowerCase().includes(s) || n.notes.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#F38020] uppercase tracking-wider">NPCs</span>
          <span className="text-[10px] text-slate-600">{npcs.length} tracked</span>
        </div>
        {isDM && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`text-[10px] px-2 py-1 rounded-md border font-semibold transition-all ${
              showAdd ? 'border-[#F38020]/50 bg-[#F38020]/10 text-[#F38020]' : 'border-slate-700 text-slate-400 hover:text-[#F38020] hover:border-[#F38020]/40'
            }`}
          >
            {showAdd ? 'Cancel' : '+ Add NPC'}
          </button>
        )}
      </div>

      {/* Add form */}
      {showAdd && isDM && (
        <div className="px-4 py-3 border-b border-slate-800 space-y-2 bg-slate-900/50">
          <div className="grid grid-cols-2 gap-2">
            <input
              value={addName} onChange={(e) => setAddName(e.target.value)}
              placeholder="Name..."
              className="px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none"
              onKeyDown={(e) => { if (e.key === 'Enter') addNpc(); }}
            />
            <input
              value={addRole} onChange={(e) => setAddRole(e.target.value)}
              placeholder="Role (e.g. merchant)..."
              className="px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none"
            />
            <input
              value={addLocation} onChange={(e) => setAddLocation(e.target.value)}
              placeholder="Location..."
              className="px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none"
            />
            <input
              value={addFaction} onChange={(e) => setAddFaction(e.target.value)}
              placeholder="Faction..."
              className="px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none"
            />
          </div>
          {/* Disposition picker */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Disposition:</span>
            {DISPOSITION_VALUES.map((d) => {
              const info = DISPOSITION_LABELS[d];
              return (
                <button
                  key={d}
                  onClick={() => setAddDisposition(d)}
                  className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all border ${
                    addDisposition === d
                      ? `${info.color} border-current/30 bg-current/5`
                      : 'border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {info.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={addNpc}
            disabled={!addName.trim()}
            className="w-full py-1.5 bg-[#F38020] hover:bg-[#F38020]/80 disabled:opacity-30 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Add NPC
          </button>
        </div>
      )}

      {/* Filters + search */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/50 shrink-0">
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search NPCs..."
          className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] text-slate-300 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none"
        />
        <div className="flex gap-1">
          {(['all', 'alive', 'dead', 'hostile', 'friendly'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded-md text-[9px] font-semibold uppercase transition-all border ${
                filter === f
                  ? 'border-[#F38020]/50 bg-[#F38020]/10 text-[#F38020]'
                  : 'border-slate-700/50 text-slate-600 hover:text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* NPC list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-slate-600 text-xs">
            {npcs.length === 0 ? 'No NPCs tracked yet. The DM can add NPCs the party meets.' : 'No NPCs match the current filter.'}
          </div>
        )}
        {filtered.map((npc) => {
          const disp = DISPOSITION_LABELS[npc.disposition] || DISPOSITION_LABELS[0];
          const isEditing = editingId === npc.id;

          return (
            <div
              key={npc.id}
              className={`rounded-lg border p-3 space-y-2 transition-all ${
                !npc.alive ? 'border-red-900/30 bg-red-950/10 opacity-60' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Top row: name, role, disposition */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${!npc.alive ? 'text-red-500 line-through' : 'text-slate-200'}`}>{npc.name}</span>
                    {!npc.alive && <span className="text-[8px] text-red-600 uppercase font-bold">Dead</span>}
                  </div>
                  {npc.role && <div className="text-[10px] text-slate-500 italic">{npc.role}</div>}
                </div>
                {/* Disposition badge */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {isDM && (
                    <div className="flex gap-0.5">
                      <button
                        onClick={() => updateNpc(npc.id, { disposition: Math.max(-2, npc.disposition - 1) })}
                        disabled={npc.disposition <= -2}
                        className="w-4 h-4 rounded text-[9px] border border-slate-700 text-slate-500 hover:text-red-400 disabled:opacity-30 transition-all"
                      >-</button>
                      <button
                        onClick={() => updateNpc(npc.id, { disposition: Math.min(2, npc.disposition + 1) })}
                        disabled={npc.disposition >= 2}
                        className="w-4 h-4 rounded text-[9px] border border-slate-700 text-slate-500 hover:text-green-400 disabled:opacity-30 transition-all"
                      >+</button>
                    </div>
                  )}
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${disp.color} bg-current/5 border border-current/20`}>
                    {disp.label}
                  </span>
                </div>
              </div>

              {/* Location + faction row */}
              {(npc.location || npc.faction) && (
                <div className="flex items-center gap-3 text-[10px]">
                  {npc.location && (
                    <span className="text-slate-500">
                      <span className="text-slate-600">Location:</span> <span className="text-slate-400">{npc.location}</span>
                    </span>
                  )}
                  {npc.faction && (
                    <span className="text-slate-500">
                      <span className="text-slate-600">Faction:</span> <span className="text-purple-400">{npc.faction}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Disposition bar (visual) */}
              <div className="flex items-center gap-1">
                {DISPOSITION_VALUES.map((d) => (
                  <div
                    key={d}
                    className={`flex-1 h-1 rounded-full transition-all ${
                      d <= npc.disposition
                        ? d <= -1 ? 'bg-red-500' : d === 0 ? 'bg-slate-500' : 'bg-green-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              {/* Notes */}
              {isEditing ? (
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Notes about this NPC..."
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-[10px] text-slate-300 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none resize-y min-h-[60px]"
                  autoFocus
                  onBlur={() => { updateNpc(npc.id, { notes: editNotes }); setEditingId(null); }}
                  onKeyDown={(e) => { if (e.key === 'Escape') { updateNpc(npc.id, { notes: editNotes }); setEditingId(null); } }}
                />
              ) : npc.notes ? (
                <button
                  onClick={() => { setEditingId(npc.id); setEditNotes(npc.notes); }}
                  className="text-[10px] text-slate-500 text-left w-full hover:text-slate-300 transition-colors whitespace-pre-wrap"
                >
                  {npc.notes}
                </button>
              ) : isDM ? (
                <button
                  onClick={() => { setEditingId(npc.id); setEditNotes(''); }}
                  className="text-[9px] text-slate-700 hover:text-slate-500 transition-colors italic"
                >
                  + add notes...
                </button>
              ) : null}

              {/* DM actions row */}
              {isDM && (
                <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800/50">
                  <button
                    onClick={() => updateNpc(npc.id, { alive: !npc.alive })}
                    className={`text-[9px] px-1.5 py-0.5 rounded border transition-all font-medium ${
                      npc.alive
                        ? 'border-red-800/40 text-red-500 hover:bg-red-900/20'
                        : 'border-green-800/40 text-green-500 hover:bg-green-900/20'
                    }`}
                  >
                    {npc.alive ? 'Mark Dead' : 'Revive'}
                  </button>
                  <button
                    onClick={() => { setEditingId(npc.id); setEditNotes(npc.notes); }}
                    className="text-[9px] px-1.5 py-0.5 rounded border border-slate-700 text-slate-500 hover:text-slate-300 transition-all font-medium"
                  >
                    Edit Notes
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => removeNpc(npc.id)}
                    className="text-[9px] px-1.5 py-0.5 rounded border border-red-900/30 text-red-700 hover:text-red-400 hover:border-red-700/40 transition-all font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
