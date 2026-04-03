// Spell slot tracker — visual slot usage per level per caster.

export interface SpellSlotState { characterId: string; slots: Record<number, { max: number; used: number }>; }

// PHB spell slots by caster level
const SLOT_TABLE: Record<number, number[]> = {
  1: [2], 2: [3], 3: [4,2], 4: [4,3], 5: [4,3,2], 6: [4,3,3], 7: [4,3,3,1], 8: [4,3,3,2], 9: [4,3,3,3,1],
  10: [4,3,3,3,2], 11: [4,3,3,3,2,1], 12: [4,3,3,3,2,1], 13: [4,3,3,3,2,1,1], 14: [4,3,3,3,2,1,1],
  15: [4,3,3,3,2,1,1,1], 16: [4,3,3,3,2,1,1,1], 17: [4,3,3,3,2,1,1,1,1], 18: [4,3,3,3,3,1,1,1,1],
  19: [4,3,3,3,3,2,1,1,1], 20: [4,3,3,3,3,2,2,1,1],
};

export function createSpellSlotState(characterId: string, casterLevel: number): SpellSlotState {
  const slotArray = SLOT_TABLE[Math.min(20, Math.max(1, casterLevel))] || [];
  const slots: SpellSlotState['slots'] = {};
  for (let i = 0; i < slotArray.length; i++) slots[i + 1] = { max: slotArray[i], used: 0 };
  return { characterId, slots };
}

export function useSlot(state: SpellSlotState, level: number): { state: SpellSlotState; success: boolean } {
  const slot = state.slots[level];
  if (!slot || slot.used >= slot.max) return { state, success: false };
  return { state: { ...state, slots: { ...state.slots, [level]: { ...slot, used: slot.used + 1 } } }, success: true };
}

export function restoreAllSlots(state: SpellSlotState): SpellSlotState {
  const slots: SpellSlotState['slots'] = {};
  for (const [lvl, slot] of Object.entries(state.slots)) slots[Number(lvl)] = { max: slot.max, used: 0 };
  return { ...state, slots };
}

export function getRemainingSlots(state: SpellSlotState, level: number): number {
  return Math.max(0, (state.slots[level]?.max || 0) - (state.slots[level]?.used || 0));
}

export function formatSpellSlots(state: SpellSlotState, characterName: string): string {
  const lines = [`🔮 **${characterName}'s Spell Slots:**`];
  for (const [lvl, slot] of Object.entries(state.slots).sort(([a], [b]) => Number(a) - Number(b))) {
    const remaining = slot.max - slot.used;
    const bar = '◆'.repeat(remaining) + '◇'.repeat(slot.used);
    lines.push(`  Lv ${lvl}: [${bar}] ${remaining}/${slot.max}`);
  }
  return lines.join('\n');
}
