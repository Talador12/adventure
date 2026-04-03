// Initiative re-roll system — DM can re-roll initiative mid-combat.
// Useful for dramatic moments, phase changes, or environmental shifts.

export interface InitiativeRerollResult {
  unitId: string;
  unitName: string;
  oldInitiative: number;
  newInitiative: number;
  modifier: number;
  changed: boolean;
}

export function rerollInitiative(
  units: { id: string; name: string; initiative: number; dexMod: number }[],
  onlyEnemies: boolean = false,
): InitiativeRerollResult[] {
  return units.map((u) => {
    if (onlyEnemies && !u.id.startsWith('enemy') && !u.id.startsWith('e-') && !u.id.startsWith('tmpl-')) {
      return { unitId: u.id, unitName: u.name, oldInitiative: u.initiative, newInitiative: u.initiative, modifier: u.dexMod, changed: false };
    }
    const roll = Math.floor(Math.random() * 20) + 1 + u.dexMod;
    return { unitId: u.id, unitName: u.name, oldInitiative: u.initiative, newInitiative: roll, modifier: u.dexMod, changed: roll !== u.initiative };
  });
}

export function rerollSingleUnit(unitId: string, unitName: string, oldInit: number, dexMod: number): InitiativeRerollResult {
  const roll = Math.floor(Math.random() * 20) + 1 + dexMod;
  return { unitId, unitName, oldInitiative: oldInit, newInitiative: roll, modifier: dexMod, changed: roll !== oldInit };
}

export function applyRerollResults(results: InitiativeRerollResult[]): { id: string; newInitiative: number }[] {
  return results.filter((r) => r.changed).map((r) => ({ id: r.unitId, newInitiative: r.newInitiative }));
}

export function formatRerollResults(results: InitiativeRerollResult[], reason: string): string {
  const changed = results.filter((r) => r.changed);
  if (changed.length === 0) return '🎲 Initiative re-rolled — no changes.';
  const lines = [`🎲 **Initiative Re-Rolled!** (${reason})`];
  for (const r of changed) {
    const arrow = r.newInitiative > r.oldInitiative ? '⬆️' : '⬇️';
    lines.push(`${arrow} **${r.unitName}**: ${r.oldInitiative} → ${r.newInitiative}`);
  }
  // Show new order
  const sorted = [...results].sort((a, b) => b.newInitiative - a.newInitiative);
  lines.push(`\nNew order: ${sorted.map((r) => `${r.unitName}(${r.newInitiative})`).join(' > ')}`);
  return lines.join('\n');
}
