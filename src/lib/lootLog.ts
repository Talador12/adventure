// Party loot log — track all items found this session.

export interface LootEntry { id: string; itemName: string; quantity: number; value: number; foundBy: string; location: string; timestamp: number; distributed: boolean; }
export interface LootLogState { entries: LootEntry[]; totalValue: number; }

export function createLootLog(): LootLogState { return { entries: [], totalValue: 0 }; }

export function addLoot(state: LootLogState, itemName: string, quantity: number, value: number, foundBy: string, location: string): LootLogState {
  const entry: LootEntry = { id: crypto.randomUUID(), itemName, quantity, value, foundBy, location, timestamp: Date.now(), distributed: false };
  return { entries: [...state.entries, entry], totalValue: state.totalValue + value * quantity };
}

export function markDistributed(state: LootLogState, entryId: string): LootLogState {
  return { ...state, entries: state.entries.map((e) => e.id === entryId ? { ...e, distributed: true } : e) };
}

export function getUndistributed(state: LootLogState): LootEntry[] { return state.entries.filter((e) => !e.distributed); }

export function formatLootLog(state: LootLogState): string {
  if (state.entries.length === 0) return '💎 **Loot Log:** Empty — no items found this session.';
  const lines = [`💎 **Loot Log** (${state.entries.length} items, ~${state.totalValue}gp total):`];
  for (const e of state.entries.slice(-15)) {
    const dist = e.distributed ? '✅' : '📦';
    lines.push(`${dist} ${e.itemName}${e.quantity > 1 ? ` ×${e.quantity}` : ''} (~${e.value}gp) — found by ${e.foundBy}`);
  }
  const undist = getUndistributed(state);
  if (undist.length > 0) lines.push(`\n📦 ${undist.length} item${undist.length > 1 ? 's' : ''} not yet distributed.`);
  return lines.join('\n');
}
