// Player handout system — DM creates text handouts players can view.

export interface Handout {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'letter' | 'map_description' | 'journal' | 'scroll' | 'poster';
  visibleTo: string[]; // character IDs, empty = visible to all
  createdAt: number;
  revealed: boolean;
}

export interface HandoutState {
  handouts: Handout[];
}

export function createHandoutState(): HandoutState { return { handouts: [] }; }

export function addHandout(state: HandoutState, title: string, content: string, type: Handout['type'], visibleTo: string[] = []): HandoutState {
  return {
    handouts: [...state.handouts, { id: crypto.randomUUID(), title, content, type, visibleTo, createdAt: Date.now(), revealed: visibleTo.length === 0 }],
  };
}

export function revealHandout(state: HandoutState, handoutId: string): HandoutState {
  return { handouts: state.handouts.map((h) => h.id === handoutId ? { ...h, revealed: true } : h) };
}

export function revealToCharacter(state: HandoutState, handoutId: string, characterId: string): HandoutState {
  return {
    handouts: state.handouts.map((h) => h.id === handoutId ? { ...h, visibleTo: [...new Set([...h.visibleTo, characterId])] } : h),
  };
}

export function getHandoutsForCharacter(state: HandoutState, characterId: string): Handout[] {
  return state.handouts.filter((h) => h.revealed || h.visibleTo.length === 0 || h.visibleTo.includes(characterId));
}

export function getAllHandouts(state: HandoutState): Handout[] { return state.handouts; }

const TYPE_EMOJIS: Record<Handout['type'], string> = { note: '📝', letter: '✉️', map_description: '🗺️', journal: '📖', scroll: '📜', poster: '📰' };

export function formatHandout(handout: Handout): string {
  const emoji = TYPE_EMOJIS[handout.type] || '📄';
  return `${emoji} **${handout.title}** (${handout.type})\n\n${handout.content}`;
}

export function formatHandoutList(state: HandoutState): string {
  if (state.handouts.length === 0) return '📄 **Handouts:** None created yet.';
  const lines = [`📄 **Handouts** (${state.handouts.length}):`];
  for (const h of state.handouts) {
    const emoji = TYPE_EMOJIS[h.type] || '📄';
    const vis = h.revealed ? '👁️ All' : h.visibleTo.length > 0 ? `🔒 ${h.visibleTo.length} player(s)` : '👁️ All';
    lines.push(`${emoji} **${h.title}** — ${h.type} (${vis})`);
  }
  return lines.join('\n');
}
