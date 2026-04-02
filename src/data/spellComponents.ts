// Spell component pouch tracking — material components consumed on cast.
// Tracks which spells consume costly components and deducts from inventory.

export interface SpellComponent {
  spellName: string;
  spellLevel: number;
  material: string;
  cost: number; // gp value, 0 = free (focus/pouch covers it)
  consumed: boolean; // true if consumed on cast
}

// Only spells with costly or consumed components. Focus/pouch covers the rest.
export const COSTLY_COMPONENTS: SpellComponent[] = [
  // Level 1
  { spellName: 'Chromatic Orb', spellLevel: 1, material: 'Diamond (50gp)', cost: 50, consumed: false },
  { spellName: 'Find Familiar', spellLevel: 1, material: 'Charcoal, incense, herbs (10gp)', cost: 10, consumed: true },
  // Level 2
  { spellName: 'Arcane Lock', spellLevel: 2, material: 'Gold dust (25gp)', cost: 25, consumed: true },
  { spellName: 'Continual Flame', spellLevel: 2, material: 'Ruby dust (50gp)', cost: 50, consumed: true },
  { spellName: 'Augury', spellLevel: 2, material: 'Marked sticks/bones (25gp)', cost: 25, consumed: false },
  // Level 3
  { spellName: 'Revivify', spellLevel: 3, material: 'Diamonds (300gp)', cost: 300, consumed: true },
  { spellName: 'Glyph of Warding', spellLevel: 3, material: 'Incense and diamond dust (200gp)', cost: 200, consumed: true },
  { spellName: 'Magic Circle', spellLevel: 3, material: 'Silver and iron powder (100gp)', cost: 100, consumed: true },
  // Level 4
  { spellName: 'Stoneskin', spellLevel: 4, material: 'Diamond dust (100gp)', cost: 100, consumed: true },
  { spellName: 'Divination', spellLevel: 4, material: 'Incense and sacrificial offering (25gp)', cost: 25, consumed: true },
  // Level 5
  { spellName: 'Raise Dead', spellLevel: 5, material: 'Diamond (500gp)', cost: 500, consumed: true },
  { spellName: 'Greater Restoration', spellLevel: 5, material: 'Diamond dust (100gp)', cost: 100, consumed: true },
  { spellName: 'Scrying', spellLevel: 5, material: 'Focus worth at least 1,000gp', cost: 1000, consumed: false },
  { spellName: 'Planar Binding', spellLevel: 5, material: 'Jewel (1,000gp)', cost: 1000, consumed: true },
  // Level 6
  { spellName: 'Heroes\' Feast', spellLevel: 6, material: 'Gem-encrusted bowl (1,000gp)', cost: 1000, consumed: true },
  { spellName: 'True Seeing', spellLevel: 6, material: 'Ointment (25gp)', cost: 25, consumed: true },
  // Level 7
  { spellName: 'Resurrection', spellLevel: 7, material: 'Diamond (1,000gp)', cost: 1000, consumed: true },
  { spellName: 'Simulacrum', spellLevel: 7, material: 'Snow + ruby dust (1,500gp)', cost: 1500, consumed: true },
  // Level 9
  { spellName: 'True Resurrection', spellLevel: 9, material: 'Diamonds (25,000gp)', cost: 25000, consumed: true },
  { spellName: 'Wish', spellLevel: 9, material: 'None', cost: 0, consumed: false },
];

export function getComponentForSpell(spellName: string): SpellComponent | null {
  return COSTLY_COMPONENTS.find(
    (c) => c.spellName.toLowerCase() === spellName.toLowerCase()
  ) || null;
}

export function canAffordComponent(gold: number, spellName: string): { canAfford: boolean; cost: number; component: SpellComponent | null } {
  const component = getComponentForSpell(spellName);
  if (!component || component.cost === 0) return { canAfford: true, cost: 0, component };
  return { canAfford: gold >= component.cost, cost: component.cost, component };
}

export function deductComponentCost(gold: number, spellName: string): { newGold: number; deducted: number; message: string } {
  const component = getComponentForSpell(spellName);
  if (!component || component.cost === 0) return { newGold: gold, deducted: 0, message: '' };
  if (!component.consumed) return { newGold: gold, deducted: 0, message: `(Uses ${component.material} — not consumed)` };
  if (gold < component.cost) return { newGold: gold, deducted: 0, message: `⚠️ Cannot afford ${component.material}!` };

  return {
    newGold: gold - component.cost,
    deducted: component.cost,
    message: `💎 Consumed ${component.material} (-${component.cost}gp)`,
  };
}

export function formatComponentList(spells: string[]): string {
  const components = spells.map((s) => getComponentForSpell(s)).filter((c): c is SpellComponent => c !== null && c.cost > 0);
  if (components.length === 0) return 'No costly components needed.';
  const lines = ['💎 **Spell Component Costs:**'];
  for (const c of components) {
    lines.push(`${c.consumed ? '🔥' : '♻️'} **${c.spellName}** (Lv ${c.spellLevel}): ${c.material}${c.consumed ? ' (consumed)' : ' (reusable)'}`);
  }
  return lines.join('\n');
}
