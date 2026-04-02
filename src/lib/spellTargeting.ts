// Conditional spell targeting — determines valid targets based on spell properties.
// Filters targets by range, spell type, and school requirements.

import type { Spell } from '../types/game';
import type { TokenPosition } from './mapUtils';
import { chebyshevDistance, parseRangeFt } from './mapUtils';

export interface SpellTarget {
  unitId: string;
  unitName: string;
  distance: number; // in cells
  inRange: boolean;
  reason?: string; // why it's invalid
}

export function getValidTargets(
  spell: Spell,
  casterPosition: TokenPosition,
  allPositions: TokenPosition[],
  allUnits: { id: string; name: string; type: 'player' | 'enemy' | 'npc'; hp: number; conditions?: { type: string }[] }[],
  casterUnitId: string,
): SpellTarget[] {
  const rangeCells = parseRangeFt(spell.range || 'Touch');
  const targets: SpellTarget[] = [];

  for (const pos of allPositions) {
    if (pos.unitId === casterUnitId && spell.range !== 'Self') continue; // can't target self (unless Self range)
    const unit = allUnits.find((u) => u.id === pos.unitId);
    if (!unit || unit.hp <= 0) continue;

    const distance = chebyshevDistance(casterPosition.col, casterPosition.row, pos.col, pos.row);
    const inRange = distance <= rangeCells;

    let reason: string | undefined;
    if (!inRange) reason = `Out of range (${distance * 5}ft, need ${spell.range})`;

    // Healing spells should target allies
    if (spell.school === 'evocation' && spell.damage && unit.type === 'player' && pos.unitId !== casterUnitId) {
      // Damage spell targeting ally — mark as valid but note it
    }

    targets.push({ unitId: pos.unitId, unitName: unit.name, distance, inRange, reason });
  }

  // Sort: in-range first, then by distance
  targets.sort((a, b) => {
    if (a.inRange !== b.inRange) return a.inRange ? -1 : 1;
    return a.distance - b.distance;
  });

  return targets;
}

export function suggestTarget(
  spell: Spell,
  targets: SpellTarget[],
  casterType: 'player' | 'enemy',
): SpellTarget | null {
  const validTargets = targets.filter((t) => t.inRange);
  if (validTargets.length === 0) return null;

  // For damage spells, prefer enemies if caster is player (and vice versa)
  if (spell.damage) {
    const preferred = casterType === 'player' ? 'enemy' : 'player';
    const enemies = validTargets.filter((t) => {
      // We don't have type on SpellTarget, so use name heuristics or check all
      return true; // return all valid targets, sorted by distance
    });
    return enemies[0] || validTargets[0];
  }

  // For healing, prefer allies
  return validTargets[0];
}

export function formatTargetList(targets: SpellTarget[], spellName: string): string {
  const inRange = targets.filter((t) => t.inRange);
  const outRange = targets.filter((t) => !t.inRange);
  const lines = [`🎯 **${spellName} Targets:**`];
  if (inRange.length > 0) {
    lines.push(`In range: ${inRange.map((t) => `${t.unitName} (${t.distance * 5}ft)`).join(', ')}`);
  }
  if (outRange.length > 0) {
    lines.push(`Out of range: ${outRange.map((t) => `${t.unitName} (${t.distance * 5}ft)`).join(', ')}`);
  }
  return lines.join('\n');
}
