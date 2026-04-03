// Multi-class spell slot calculator — combined slots for multiclassed casters.
// Uses PHB multiclass spellcasting rules.

export type CasterLevel = 'full' | 'half' | 'third' | 'none';

const CLASS_CASTER_LEVEL: Record<string, CasterLevel> = {
  Wizard: 'full', Sorcerer: 'full', Bard: 'full', Cleric: 'full', Druid: 'full',
  Paladin: 'half', Ranger: 'half', Artificer: 'half',
  Fighter: 'third', // Eldritch Knight
  Rogue: 'third',   // Arcane Trickster
  Barbarian: 'none', Monk: 'none', Warlock: 'none', // Warlock uses pact magic
};

// Spell slots by combined caster level (PHB p.165)
const SPELL_SLOT_TABLE: Record<number, number[]> = {
  1: [2], 2: [3], 3: [4, 2], 4: [4, 3], 5: [4, 3, 2],
  6: [4, 3, 3], 7: [4, 3, 3, 1], 8: [4, 3, 3, 2], 9: [4, 3, 3, 3, 1],
  10: [4, 3, 3, 3, 2], 11: [4, 3, 3, 3, 2, 1], 12: [4, 3, 3, 3, 2, 1],
  13: [4, 3, 3, 3, 2, 1, 1], 14: [4, 3, 3, 3, 2, 1, 1],
  15: [4, 3, 3, 3, 2, 1, 1, 1], 16: [4, 3, 3, 3, 2, 1, 1, 1],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1], 18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1], 20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

export function getCasterLevel(charClass: string): CasterLevel {
  return CLASS_CASTER_LEVEL[charClass] || 'none';
}

export function calculateCombinedCasterLevel(classes: { class: string; level: number }[]): number {
  let total = 0;
  for (const c of classes) {
    const casterType = getCasterLevel(c.class);
    if (casterType === 'full') total += c.level;
    else if (casterType === 'half') total += Math.floor(c.level / 2);
    else if (casterType === 'third') total += Math.floor(c.level / 3);
  }
  return Math.min(20, total);
}

export function getMulticlassSpellSlots(classes: { class: string; level: number }[]): number[] {
  const casterLevel = calculateCombinedCasterLevel(classes);
  if (casterLevel <= 0) return [];
  return SPELL_SLOT_TABLE[casterLevel] || [];
}

export function formatMulticlassSlots(classes: { class: string; level: number }[]): string {
  const casterLevel = calculateCombinedCasterLevel(classes);
  const slots = getMulticlassSpellSlots(classes);
  if (slots.length === 0) return '📖 No spellcasting levels.';
  const classStr = classes.map((c) => `${c.class} ${c.level}`).join(' / ');
  const lines = [`📖 **Multiclass Spell Slots** (${classStr}, combined caster level ${casterLevel}):`];
  for (let i = 0; i < slots.length; i++) {
    lines.push(`  Level ${i + 1}: ${'◆'.repeat(slots[i])} (${slots[i]} slots)`);
  }
  return lines.join('\n');
}
