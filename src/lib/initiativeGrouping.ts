// Smart initiative grouping — enemies of the same type share initiative.
// Groups identical enemy types (by name) into a single initiative slot.
// Each member still acts individually but they all go together.

import type { Unit } from '../contexts/GameContext';

export interface InitiativeGroup {
  name: string;
  initiative: number;
  members: Unit[];
  isGrouped: boolean; // false for solo units (players, unique enemies)
}

export function groupInitiative(units: Unit[]): InitiativeGroup[] {
  const groups: InitiativeGroup[] = [];
  const enemyGroups = new Map<string, Unit[]>();

  for (const unit of units) {
    if (unit.type === 'enemy') {
      // Group by base name (strip trailing numbers: "Goblin 1" -> "Goblin")
      const baseName = unit.name.replace(/\s*\d+$/, '').trim();
      if (!enemyGroups.has(baseName)) enemyGroups.set(baseName, []);
      enemyGroups.get(baseName)!.push(unit);
    } else {
      // Players and NPCs are always individual
      groups.push({ name: unit.name, initiative: unit.initiative, members: [unit], isGrouped: false });
    }
  }

  // Enemy groups: use highest initiative in group
  for (const [name, members] of enemyGroups) {
    const maxInit = Math.max(...members.map((m) => m.initiative));
    if (members.length > 1) {
      groups.push({ name: `${name} (×${members.length})`, initiative: maxInit, members, isGrouped: true });
    } else {
      groups.push({ name: members[0].name, initiative: maxInit, members, isGrouped: false });
    }
  }

  // Sort by initiative descending
  groups.sort((a, b) => b.initiative - a.initiative);
  return groups;
}

export function flattenGroups(groups: InitiativeGroup[]): Unit[] {
  const result: Unit[] = [];
  for (const g of groups) {
    for (const m of g.members) result.push(m);
  }
  return result;
}

export function countGroups(units: Unit[]): { totalUnits: number; groups: number; grouped: number } {
  const groups = groupInitiative(units);
  const grouped = groups.filter((g) => g.isGrouped).reduce((s, g) => s + g.members.length, 0);
  return { totalUnits: units.length, groups: groups.length, grouped };
}
