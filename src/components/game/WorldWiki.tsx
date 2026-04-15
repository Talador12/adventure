// Collaborative world-building wiki — party-editable lore pages.
// Pages about locations, NPCs, factions, and custom lore.
// Stored in campaign state, editable by any player.

import { useState, useCallback, useMemo } from 'react';
import { renderMarkdown } from '../../lib/markdown';

export interface WikiPage {
  id: string;
  title: string;
  content: string;
  category: 'location' | 'npc' | 'faction' | 'lore' | 'item' | 'quest';
  createdBy: string;
  updatedAt: number;
  tags?: string[];
}

interface Props {
  pages: WikiPage[];
  onAddPage?: (page: WikiPage) => void;
  onUpdatePage?: (pageId: string, updates: Partial<WikiPage>) => void;
  onDeletePage?: (pageId: string) => void;
  playerName: string;
  sceneName?: string;
  isDM?: boolean;
}

const CATEGORY_ICONS: Record<WikiPage['category'], string> = {
  location: '📍', npc: '👤', faction: '⚔️', lore: '📜', item: '💎', quest: '📋',
};
const CATEGORY_COLORS: Record<WikiPage['category'], string> = {
  location: 'text-emerald-400', npc: 'text-amber-400', faction: 'text-red-400', lore: 'text-violet-400', item: 'text-sky-400', quest: 'text-yellow-400',
};

export default function WorldWiki({ pages, onAddPage, onUpdatePage, onDeletePage, playerName, sceneName, isDM = true }: Props) {
  const [generating, setGenerating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<WikiPage['category'] | null>(null);

  const selected = pages.find((p) => p.id === selectedId);

  const filteredPages = pages.filter((p) => {
    if (filterCat && p.category !== filterCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || (p.tags || []).some((t) => t.includes(q));
    }
    return true;
  }).sort((a, b) => b.updatedAt - a.updatedAt);

  const startEdit = useCallback(() => {
    if (!selected) return;
    setEditTitle(selected.title);
    setEditContent(selected.content);
    setEditing(true);
  }, [selected]);

  const saveEdit = useCallback(() => {
    if (!selected || !onUpdatePage) return;
    onUpdatePage(selected.id, { title: editTitle.trim() || selected.title, content: editContent, updatedAt: Date.now() });
    setEditing(false);
  }, [selected, editTitle, editContent, onUpdatePage]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">World Wiki ({pages.length})</span>
        {onAddPage && isDM && (
          <button
            onClick={() => {
              const title = prompt('Page title:');
              if (!title?.trim()) return;
              const catStr = prompt('Category (location/npc/faction/lore/item/quest):', 'lore') || 'lore';
              const category = (['location', 'npc', 'faction', 'lore', 'item', 'quest'].includes(catStr) ? catStr : 'lore') as WikiPage['category'];
              const tags = (prompt('Tags (comma-separated):', '') || '').split(',').map((t) => t.trim()).filter(Boolean);
              onAddPage({ id: crypto.randomUUID().slice(0, 8), title: title.trim(), content: '', category, createdBy: playerName, updatedAt: Date.now(), tags });
              // Auto-select new page
              setTimeout(() => setSelectedId(pages.length > 0 ? pages[pages.length - 1]?.id : null), 50);
            }}
            className="text-[8px] text-teal-400 hover:text-teal-300 font-semibold"
          >
            + New Page
          </button>
        )}
      </div>

      {/* Search + category filter */}
      <div className="px-2 py-1.5 border-b border-slate-800/50 shrink-0 space-y-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search wiki..."
          className="w-full text-[9px] px-2 py-1 rounded bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-600"
        />
        <div className="flex gap-1">
          {(Object.keys(CATEGORY_ICONS) as WikiPage['category'][]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(filterCat === cat ? null : cat)}
              className={`text-[8px] px-1.5 py-0.5 rounded border transition-all capitalize ${filterCat === cat ? `${CATEGORY_COLORS[cat]} border-current bg-slate-800` : 'text-slate-600 border-slate-800 hover:text-slate-400'}`}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Page list */}
        <div className="w-1/3 border-r border-slate-800/50 overflow-y-auto">
          {filteredPages.length === 0 && <div className="text-[9px] text-slate-600 italic text-center py-4">No pages yet</div>}
          {filteredPages.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedId(p.id); setEditing(false); }}
              className={`w-full text-left px-2 py-1.5 border-b border-slate-800/30 transition-all ${selectedId === p.id ? 'bg-slate-800/50 border-l-2 border-l-teal-500' : 'hover:bg-slate-800/20'}`}
            >
              <div className="flex items-center gap-1">
                <span className="text-[9px]">{CATEGORY_ICONS[p.category]}</span>
                <span className="text-[10px] font-semibold text-slate-200 truncate">{p.title}</span>
              </div>
              <div className="text-[8px] text-slate-600 truncate">{p.content.slice(0, 60) || 'Empty page'}</div>
            </button>
          ))}
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-3">
          {selected ? (
            editing ? (
              <div className="space-y-2">
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full text-sm font-bold px-2 py-1 rounded bg-slate-800/60 border border-slate-700 text-white" />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-48 text-[11px] px-2 py-1.5 rounded bg-slate-800/40 border border-slate-700 text-slate-200 resize-none leading-relaxed"
                  placeholder="Write lore, descriptions, history..."
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="text-[9px] px-3 py-1 rounded bg-teal-900/40 border border-teal-700/50 text-teal-300 font-semibold">Save</button>
                  <button
                    disabled={generating}
                    onClick={async () => {
                      if (!selected) return;
                      setGenerating(true);
                      try {
                        const res = await fetch('/api/dm/generate-lore', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            title: editTitle || selected.title,
                            category: selected.category,
                            tags: selected.tags,
                            sceneName,
                            existingPages: pages.map((p) => p.title).filter((t) => t !== selected.title),
                          }),
                        });
                        if (res.ok) {
                          const data = await res.json() as { content?: string };
                          if (data.content) setEditContent((prev) => prev ? `${prev}\n\n${data.content}` : data.content!);
                        }
                      } catch { /* ok */ }
                      setGenerating(false);
                    }}
                    className="text-[9px] px-3 py-1 rounded bg-violet-900/30 border border-violet-700/40 text-violet-300 font-semibold disabled:opacity-50"
                  >
                    {generating ? '...' : '✨ Generate'}
                  </button>
                  <button onClick={() => setEditing(false)} className="text-[9px] px-3 py-1 rounded bg-slate-800 text-slate-400">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{selected.title}</h3>
                    <div className="flex items-center gap-2 text-[8px] text-slate-500">
                      <span>{CATEGORY_ICONS[selected.category]} {selected.category}</span>
                      <span>by {selected.createdBy}</span>
                      <span>{new Date(selected.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {onUpdatePage && isDM && <button onClick={startEdit} className="text-[8px] text-teal-400 hover:text-teal-300 font-semibold">Edit</button>}
                    {onDeletePage && isDM && <button onClick={() => { if (confirm(`Delete "${selected.title}"?`)) { onDeletePage(selected.id); setSelectedId(null); } }} className="text-[8px] text-red-500 hover:text-red-400">Delete</button>}
                  </div>
                </div>
                {selected.tags && selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selected.tags.map((t) => <span key={t} className="text-[7px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{t}</span>)}
                  </div>
                )}
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  {selected.content ? (
                    // Render markdown + [[Page Title]] links
                    selected.content.split(/(\[\[[^\]]+\]\])/).map((part, i) => {
                      const match = part.match(/^\[\[(.+)\]\]$/);
                      if (match) {
                        const linkedPage = pages.find((p) => p.title.toLowerCase() === match[1].toLowerCase());
                        return linkedPage ? (
                          <button key={i} onClick={() => { setSelectedId(linkedPage.id); setEditing(false); }} className="text-teal-400 hover:text-teal-300 underline underline-offset-2 font-medium">{match[1]}</button>
                        ) : (
                          <span key={i} className="text-slate-500 italic">{match[1]}</span>
                        );
                      }
                      // Render non-link parts as markdown
                      return <span key={i} dangerouslySetInnerHTML={{ __html: renderMarkdown(part) }} />;
                    })
                  ) : (
                    <span className="italic text-slate-600">No content yet. Click Edit to add lore. Supports **markdown** and [[Page Title]] links.</span>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-full text-[10px] text-slate-600 italic">
              Select a page or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
