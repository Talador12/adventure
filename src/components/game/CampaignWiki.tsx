// CampaignWiki - localStorage-backed wiki for campaign lore.
// Uses src/lib/campaignWiki.ts for CRUD. DM can edit, players view only.

import { useState, useCallback, useMemo } from 'react';
import { renderMarkdown } from '../../lib/markdown';
import { type WikiPage, getWikiPages, saveWikiPage, deleteWikiPage, searchWiki } from '../../lib/campaignWiki';

type WikiCategory = WikiPage['category'];

const CATEGORIES: { id: WikiCategory | 'all'; label: string; icon: string; color: string }[] = [
  { id: 'all', label: 'All', icon: '', color: 'text-slate-300' },
  { id: 'lore', label: 'Lore', icon: '', color: 'text-violet-400' },
  { id: 'npc', label: 'NPCs', icon: '', color: 'text-amber-400' },
  { id: 'location', label: 'Locations', icon: '', color: 'text-emerald-400' },
  { id: 'item', label: 'Items', icon: '', color: 'text-sky-400' },
  { id: 'quest', label: 'Quests', icon: '', color: 'text-yellow-400' },
];

interface Props {
  roomId: string;
  isDM: boolean;
  playerName: string;
  onPagesChange?: (pages: WikiPage[]) => void;
}

export default function CampaignWiki({ roomId, isDM, playerName, onPagesChange }: Props) {
  const [pages, setPages] = useState<WikiPage[]>(() => getWikiPages(roomId));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState<WikiCategory>('lore');
  const [editTags, setEditTags] = useState('');
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<WikiCategory | 'all'>('all');
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<WikiCategory>('lore');
  const [newTags, setNewTags] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const selected = useMemo(() => pages.find((p) => p.id === selectedId) || null, [pages, selectedId]);

  const filtered = useMemo(() => {
    let result = search ? searchWiki(roomId, search) : pages;
    if (filterCat !== 'all') result = result.filter((p) => p.category === filterCat);
    return result.sort((a, b) => b.updatedAt - a.updatedAt);
  }, [pages, search, filterCat, roomId]);

  // Sync helper - updates local state and notifies parent
  const syncPages = useCallback((next: WikiPage[]) => {
    setPages(next);
    onPagesChange?.(next);
  }, [onPagesChange]);

  const handleCreatePage = useCallback(() => {
    if (!newTitle.trim()) return;
    const page: WikiPage = {
      id: crypto.randomUUID().slice(0, 8),
      title: newTitle.trim(),
      content: '',
      category: newCategory,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const next = saveWikiPage(roomId, page);
    syncPages(next);
    setSelectedId(page.id);
    setShowNewForm(false);
    setNewTitle('');
    setNewTags('');
  }, [roomId, newTitle, newCategory, newTags, syncPages]);

  const handleSaveEdit = useCallback(() => {
    if (!selected) return;
    const updated: WikiPage = {
      ...selected,
      title: editTitle.trim() || selected.title,
      content: editContent,
      category: editCategory,
      tags: editTags.split(',').map((t) => t.trim()).filter(Boolean),
      updatedAt: Date.now(),
    };
    const next = saveWikiPage(roomId, updated);
    syncPages(next);
    setEditing(false);
  }, [roomId, selected, editTitle, editContent, editCategory, editTags, syncPages]);

  const handleDelete = useCallback((pageId: string) => {
    const next = deleteWikiPage(roomId, pageId);
    syncPages(next);
    if (selectedId === pageId) setSelectedId(null);
    setConfirmDelete(null);
  }, [roomId, selectedId, syncPages]);

  const startEdit = useCallback(() => {
    if (!selected) return;
    setEditTitle(selected.title);
    setEditContent(selected.content);
    setEditCategory(selected.category);
    setEditTags(selected.tags.join(', '));
    setEditing(true);
  }, [selected]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campaign Wiki ({pages.length})</span>
        {isDM && (
          <button
            onClick={() => setShowNewForm(true)}
            className="text-[8px] text-teal-400 hover:text-teal-300 font-semibold"
          >
            + New Page
          </button>
        )}
      </div>

      {/* New page form */}
      {showNewForm && isDM && (
        <div className="px-3 py-2 border-b border-slate-800/50 space-y-1.5 bg-slate-900/50 shrink-0">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Page title..."
            className="w-full text-[10px] px-2 py-1 rounded bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-600"
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter') handleCreatePage(); if (e.key === 'Escape') setShowNewForm(false); }}
          />
          <div className="flex items-center gap-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as WikiCategory)}
              className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
            >
              <option value="lore">Lore</option>
              <option value="npc">NPC</option>
              <option value="location">Location</option>
              <option value="item">Item</option>
              <option value="quest">Quest</option>
            </select>
            <input
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="Tags (comma-separated)"
              className="flex-1 text-[9px] px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-600"
            />
            <button onClick={handleCreatePage} className="text-[9px] px-2 py-0.5 rounded bg-teal-900/40 border border-teal-700/50 text-teal-300 font-semibold">Create</button>
            <button onClick={() => setShowNewForm(false)} className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Cancel</button>
          </div>
        </div>
      )}

      {/* Search + category tabs */}
      <div className="px-2 py-1.5 border-b border-slate-800/50 shrink-0 space-y-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search wiki..."
          className="w-full text-[9px] px-2 py-1 rounded bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-600"
        />
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`text-[8px] px-1.5 py-0.5 rounded border transition-all ${filterCat === cat.id ? `${cat.color} border-current bg-slate-800 font-bold` : 'text-slate-600 border-slate-800 hover:text-slate-400'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split: page list + content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Page list */}
        <div className="w-1/3 border-r border-slate-800/50 overflow-y-auto">
          {filtered.length === 0 && <div className="text-[9px] text-slate-600 italic text-center py-4">No pages yet</div>}
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedId(p.id); setEditing(false); setConfirmDelete(null); }}
              className={`w-full text-left px-2 py-1.5 border-b border-slate-800/30 transition-all ${selectedId === p.id ? 'bg-slate-800/50 border-l-2 border-l-teal-500' : 'hover:bg-slate-800/20'}`}
            >
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-semibold text-slate-200 truncate`}>{p.title}</span>
                <span className="text-[8px] text-slate-600 capitalize shrink-0">{p.category}</span>
              </div>
              <div className="text-[8px] text-slate-600 truncate">{p.content.slice(0, 60) || 'Empty page'}</div>
            </button>
          ))}
        </div>

        {/* Page content / editor */}
        <div className="flex-1 overflow-y-auto p-3">
          {selected ? (
            editing && isDM ? (
              /* Edit mode */
              <div className="space-y-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-sm font-bold px-2 py-1 rounded bg-slate-800/60 border border-slate-700 text-white"
                />
                <div className="flex gap-2">
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as WikiCategory)}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
                  >
                    <option value="lore">Lore</option>
                    <option value="npc">NPC</option>
                    <option value="location">Location</option>
                    <option value="item">Item</option>
                    <option value="quest">Quest</option>
                  </select>
                  <input
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="Tags (comma-separated)"
                    className="flex-1 text-[9px] px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-600"
                  />
                </div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-48 text-[11px] px-2 py-1.5 rounded bg-slate-800/40 border border-slate-700 text-slate-200 resize-none leading-relaxed font-mono"
                  placeholder="Write content here. Supports **markdown** and [[Page Title]] links."
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveEdit} className="text-[9px] px-3 py-1 rounded bg-teal-900/40 border border-teal-700/50 text-teal-300 font-semibold">Save</button>
                  <button onClick={() => setEditing(false)} className="text-[9px] px-3 py-1 rounded bg-slate-800 text-slate-400">Cancel</button>
                </div>
              </div>
            ) : (
              /* View mode */
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{selected.title}</h3>
                    <div className="flex items-center gap-2 text-[8px] text-slate-500">
                      <span className="capitalize">{selected.category}</span>
                      <span>{new Date(selected.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {isDM && <button onClick={startEdit} className="text-[8px] text-teal-400 hover:text-teal-300 font-semibold">Edit</button>}
                    {isDM && (
                      confirmDelete === selected.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(selected.id)} className="text-[8px] text-red-400 font-semibold">Confirm</button>
                          <button onClick={() => setConfirmDelete(null)} className="text-[8px] text-slate-400">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(selected.id)} className="text-[8px] text-red-500 hover:text-red-400">Delete</button>
                      )
                    )}
                  </div>
                </div>
                {selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selected.tags.map((t) => <span key={t} className="text-[7px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{t}</span>)}
                  </div>
                )}
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  {selected.content ? (
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
                      return <span key={i} dangerouslySetInnerHTML={{ __html: renderMarkdown(part) }} />;
                    })
                  ) : (
                    <span className="italic text-slate-600">
                      {isDM ? 'No content yet. Click Edit to add lore. Supports **markdown** and [[Page Title]] links.' : 'No content yet.'}
                    </span>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-full text-[10px] text-slate-600 italic">
              {pages.length === 0
                ? (isDM ? 'Create your first wiki page to start building campaign lore.' : 'The DM has not created any wiki pages yet.')
                : 'Select a page to view its content.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
