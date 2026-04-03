// Session notes auto-tagger — tag notes with #combat, #lore, #npc for searchable history.

export type NoteTag = '#combat' | '#lore' | '#npc' | '#quest' | '#item' | '#location' | '#decision' | '#death' | '#levelup' | '#recap';

export interface TaggedNote {
  id: string;
  text: string;
  tags: NoteTag[];
  timestamp: number;
  sessionId: string;
  autoTagged: boolean;
}

export interface NoteTaggerState {
  notes: TaggedNote[];
}

const TAG_KEYWORDS: Record<NoteTag, string[]> = {
  '#combat': ['attack', 'damage', 'initiative', 'round', 'hit', 'miss', 'combat', 'fight', 'enemy', 'crit'],
  '#lore': ['ancient', 'legend', 'history', 'prophecy', 'artifact', 'lore', 'mystery', 'secret', 'tome', 'inscription'],
  '#npc': ['merchant', 'guard', 'innkeeper', 'says', 'told', 'asked', 'offered', 'npc', 'villager', 'stranger'],
  '#quest': ['quest', 'mission', 'task', 'objective', 'reward', 'complete', 'accepted', 'declined'],
  '#item': ['found', 'loot', 'treasure', 'gold', 'potion', 'weapon', 'armor', 'item', 'bought', 'sold'],
  '#location': ['arrived', 'entered', 'traveled', 'dungeon', 'cave', 'forest', 'city', 'tavern', 'temple', 'ruins'],
  '#decision': ['decided', 'chose', 'voted', 'agreed', 'refused', 'betrayed', 'allied', 'spared', 'killed'],
  '#death': ['died', 'killed', 'fallen', 'dead', 'death save', 'revived', 'resurrection'],
  '#levelup': ['level up', 'leveled', 'gained level', 'new ability', 'feat', 'asi'],
  '#recap': ['recap', 'summary', 'last session', 'previously'],
};

export function createNoteTaggger(): NoteTaggerState { return { notes: [] }; }

export function autoTagNote(text: string): NoteTag[] {
  const lower = text.toLowerCase();
  const tags: NoteTag[] = [];
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) tags.push(tag as NoteTag);
  }
  return tags;
}

export function addNote(state: NoteTaggerState, text: string, sessionId: string, manualTags: NoteTag[] = []): NoteTaggerState {
  const autoTags = autoTagNote(text);
  const allTags = [...new Set([...autoTags, ...manualTags])];
  return {
    notes: [...state.notes, { id: crypto.randomUUID(), text, tags: allTags, timestamp: Date.now(), sessionId, autoTagged: autoTags.length > 0 }],
  };
}

export function searchByTag(state: NoteTaggerState, tag: NoteTag): TaggedNote[] {
  return state.notes.filter((n) => n.tags.includes(tag));
}

export function searchByKeyword(state: NoteTaggerState, keyword: string): TaggedNote[] {
  const lower = keyword.toLowerCase();
  return state.notes.filter((n) => n.text.toLowerCase().includes(lower));
}

export function getTagCounts(state: NoteTaggerState): Record<NoteTag, number> {
  const counts: Record<string, number> = {};
  for (const n of state.notes) for (const t of n.tags) counts[t] = (counts[t] || 0) + 1;
  return counts as Record<NoteTag, number>;
}

export function formatNotesWithTags(notes: TaggedNote[]): string {
  if (notes.length === 0) return '📝 No tagged notes.';
  const lines = [`📝 **Tagged Notes** (${notes.length}):`];
  for (const n of notes.slice(-10)) {
    lines.push(`[${n.tags.join(' ')}] ${n.text.length > 80 ? n.text.slice(0, 77) + '...' : n.text}`);
  }
  return lines.join('\n');
}
