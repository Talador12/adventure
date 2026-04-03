// Spellbook management — wizard-specific spellbook with copying costs and capacity.

export interface SpellbookEntry {
  spellName: string;
  level: number;
  school: string;
  copiedAt: number;
  source: string; // 'level_up' | 'scroll' | 'spellbook' | 'research'
}

export interface SpellbookState {
  characterId: string;
  entries: SpellbookEntry[];
  maxPages: number; // 100 standard
  usedPages: number;
}

// Pages per spell level
const PAGES_PER_SPELL: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9 };
// Gold cost to copy: 50gp per spell level, 2 hours per level
const COPY_COST_PER_LEVEL = 50;
const COPY_HOURS_PER_LEVEL = 2;

export function createSpellbook(characterId: string): SpellbookState {
  return { characterId, entries: [], maxPages: 100, usedPages: 0 };
}

export function getCopyCost(spellLevel: number): number { return spellLevel * COPY_COST_PER_LEVEL; }
export function getCopyTime(spellLevel: number): number { return spellLevel * COPY_HOURS_PER_LEVEL; }
export function getPagesNeeded(spellLevel: number): number { return PAGES_PER_SPELL[spellLevel] || spellLevel; }

export function addSpellToBook(state: SpellbookState, spellName: string, level: number, school: string, source: string): { state: SpellbookState; success: boolean; message: string } {
  if (state.entries.some((e) => e.spellName === spellName)) return { state, success: false, message: `${spellName} is already in the spellbook.` };
  const pages = getPagesNeeded(level);
  if (state.usedPages + pages > state.maxPages) return { state, success: false, message: `Not enough pages! Need ${pages}, have ${state.maxPages - state.usedPages}.` };

  return {
    state: { ...state, entries: [...state.entries, { spellName, level, school, copiedAt: Date.now(), source }], usedPages: state.usedPages + pages },
    success: true,
    message: `Added ${spellName} to spellbook. (${pages} pages, ${state.usedPages + pages}/${state.maxPages} used${source !== 'level_up' ? `, cost: ${getCopyCost(level)}gp, ${getCopyTime(level)}h` : ''})`,
  };
}

export function getSpellsByLevel(state: SpellbookState): Record<number, SpellbookEntry[]> {
  const grouped: Record<number, SpellbookEntry[]> = {};
  for (const e of state.entries) {
    if (!grouped[e.level]) grouped[e.level] = [];
    grouped[e.level].push(e);
  }
  return grouped;
}

export function formatSpellbook(state: SpellbookState, characterName: string): string {
  const lines = [`📕 **${characterName}'s Spellbook** (${state.usedPages}/${state.maxPages} pages, ${state.entries.length} spells):`];
  const grouped = getSpellsByLevel(state);
  for (const [level, spells] of Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b))) {
    lines.push(`**Level ${level}:** ${spells.map((s) => s.spellName).join(', ')}`);
  }
  if (state.entries.length === 0) lines.push('*(Empty — add spells on level up or by copying from scrolls/books)*');
  return lines.join('\n');
}
