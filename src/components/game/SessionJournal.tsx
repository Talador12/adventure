// SessionJournal — shared party notes panel, persisted per campaign in localStorage.
// Any player can add entries. Entries sync via WebSocket game_event.
import { useState, useEffect, useRef, useCallback } from 'react';

export interface JournalEntry {
  id: string;
  author: string;
  text: string;
  timestamp: number;
  pinned?: boolean;
}

interface SessionJournalProps {
  roomId: string;
  playerName: string;
  /** Broadcast a journal event to other players via WebSocket */
  onBroadcast?: (event: { type: string; entries: JournalEntry[] }) => void;
  /** Ref callback — parent sets this so remote journal_sync events can update entries */
  syncRef?: React.MutableRefObject<((entries: JournalEntry[]) => void) | null>;
}

const STORAGE_KEY = (room: string) => `adventure:journal:${room}`;

function loadEntries(room: string): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(room));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveEntries(room: string, entries: JournalEntry[]) {
  try { localStorage.setItem(STORAGE_KEY(room), JSON.stringify(entries)); } catch { /* ok */ }
}

export default function SessionJournal({ roomId, playerName, onBroadcast, syncRef }: SessionJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadEntries(roomId));
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState<'all' | 'pinned'>('all');
  const listRef = useRef<HTMLDivElement>(null);

  // Expose sync function to parent for remote updates
  useEffect(() => {
    if (syncRef) syncRef.current = (remote: JournalEntry[]) => setEntries(remote);
    return () => { if (syncRef) syncRef.current = null; };
  }, [syncRef]);

  // Persist on change
  useEffect(() => {
    saveEntries(roomId, entries);
  }, [entries, roomId]);

  // Auto-scroll to bottom on new entry
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [entries.length]);

  const addEntry = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID().slice(0, 8),
      author: playerName,
      text,
      timestamp: Date.now(),
    };
    setEntries((prev) => {
      const next = [...prev, entry];
      onBroadcast?.({ type: 'journal_sync', entries: next });
      return next;
    });
    setDraft('');
  }, [draft, playerName, onBroadcast]);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      onBroadcast?.({ type: 'journal_sync', entries: next });
      return next;
    });
  }, [onBroadcast]);

  const togglePin = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.map((e) => e.id === id ? { ...e, pinned: !e.pinned } : e);
      onBroadcast?.({ type: 'journal_sync', entries: next });
      return next;
    });
  }, [onBroadcast]);

  const clearAll = useCallback(() => {
    setEntries([]);
    onBroadcast?.({ type: 'journal_sync', entries: [] });
  }, [onBroadcast]);

  const displayed = filter === 'pinned' ? entries.filter((e) => e.pinned) : entries;

  const fmtTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Session Journal</h3>
          <span className="text-[9px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded-full">{entries.length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilter(filter === 'all' ? 'pinned' : 'all')}
            className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
              filter === 'pinned'
                ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            {filter === 'pinned' ? 'Pinned' : 'All'}
          </button>
          {entries.length > 0 && (
            <button onClick={clearAll} className="text-[10px] text-slate-600 hover:text-red-400 transition-colors" title="Clear all entries">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Entries list */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2 min-h-0">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <span className="text-2xl mb-2">📜</span>
            <p className="text-xs text-slate-500">
              {filter === 'pinned' ? 'No pinned entries yet.' : 'No journal entries yet.'}
            </p>
            <p className="text-[10px] text-slate-600 mt-1">Add notes, session highlights, or reminders below.</p>
          </div>
        ) : (
          displayed.map((entry) => (
            <div
              key={entry.id}
              className={`group rounded-lg border px-3 py-2 transition-all ${
                entry.pinned
                  ? 'border-amber-500/30 bg-amber-500/5'
                  : 'border-slate-800 bg-slate-800/30 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 shrink-0">
                  <span className="font-semibold text-slate-400">{entry.author}</span>
                  <span className="text-slate-600">{fmtTime(entry.timestamp)}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => togglePin(entry.id)}
                    className={`text-[10px] px-1 py-0.5 rounded transition-colors ${
                      entry.pinned ? 'text-amber-400 hover:text-amber-300' : 'text-slate-600 hover:text-amber-400'
                    }`}
                    title={entry.pinned ? 'Unpin' : 'Pin'}
                  >
                    {entry.pinned ? '★' : '☆'}
                  </button>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-[10px] text-slate-600 hover:text-red-400 transition-colors px-1"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-1 whitespace-pre-wrap break-words leading-relaxed">{entry.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Input area */}
      <div className="shrink-0 px-4 py-3 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addEntry(); } }}
            placeholder="Add a journal entry..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-amber-500/50 input-glow transition-all"
            maxLength={500}
          />
          <button
            onClick={addEntry}
            disabled={!draft.trim()}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600/20 border border-amber-500/30 text-amber-300 hover:bg-amber-600/30 hover:border-amber-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
