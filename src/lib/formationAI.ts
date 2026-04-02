// Battle formation AI — suggests optimal party positions based on class roles.
// Analyzes party composition and recommends tactical placement.

import type { Character } from '../types/game';
import type { TokenPosition, TerrainType } from './mapUtils';

export type ClassRole = 'frontline' | 'ranged' | 'support' | 'flanker';

const CLASS_ROLES: Record<string, ClassRole> = {
  Fighter: 'frontline',
  Barbarian: 'frontline',
  Paladin: 'frontline',
  Ranger: 'ranged',
  Wizard: 'ranged',
  Sorcerer: 'ranged',
  Warlock: 'ranged',
  Cleric: 'support',
  Druid: 'support',
  Bard: 'support',
  Rogue: 'flanker',
  Monk: 'flanker',
};

export interface FormationSuggestion {
  characterId: string;
  characterName: string;
  role: ClassRole;
  suggestedCol: number;
  suggestedRow: number;
  reason: string;
}

export function getClassRole(charClass: string): ClassRole {
  return CLASS_ROLES[charClass] || 'ranged';
}

export function suggestFormation(
  characters: Character[],
  currentPositions: TokenPosition[],
  terrain: TerrainType[][],
  enemyPositions: { col: number; row: number }[],
  rows: number,
  cols: number,
): FormationSuggestion[] {
  if (characters.length === 0 || currentPositions.length === 0) return [];

  // Find center of party
  const partyCenter = {
    col: Math.round(currentPositions.reduce((s, p) => s + p.col, 0) / currentPositions.length),
    row: Math.round(currentPositions.reduce((s, p) => s + p.row, 0) / currentPositions.length),
  };

  // Find direction toward enemies (if any)
  let threatDir = { col: 0, row: -1 }; // default: enemies are "north"
  if (enemyPositions.length > 0) {
    const enemyCenter = {
      col: Math.round(enemyPositions.reduce((s, p) => s + p.col, 0) / enemyPositions.length),
      row: Math.round(enemyPositions.reduce((s, p) => s + p.row, 0) / enemyPositions.length),
    };
    const dx = enemyCenter.col - partyCenter.col;
    const dy = enemyCenter.row - partyCenter.row;
    const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    threatDir = { col: dx / dist, row: dy / dist };
  }

  const suggestions: FormationSuggestion[] = [];
  const occupied = new Set(currentPositions.map((p) => `${p.col},${p.row}`));

  function isWalkable(col: number, row: number): boolean {
    if (col < 0 || row < 0 || col >= cols || row >= rows) return false;
    const t = terrain[row]?.[col];
    return t !== 'wall' && t !== 'void' && t !== 'pit';
  }

  function findNearestOpen(targetCol: number, targetRow: number, usedPositions: Set<string>): { col: number; row: number } {
    // Spiral outward to find open walkable cell
    for (let r = 0; r < 5; r++) {
      for (let dx = -r; dx <= r; dx++) {
        for (let dy = -r; dy <= r; dy++) {
          const c = Math.round(targetCol + dx);
          const rr = Math.round(targetRow + dy);
          const key = `${c},${rr}`;
          if (isWalkable(c, rr) && !usedPositions.has(key)) {
            return { col: c, row: rr };
          }
        }
      }
    }
    return { col: Math.round(targetCol), row: Math.round(targetRow) };
  }

  const usedPositions = new Set<string>();

  for (const char of characters) {
    const currentPos = currentPositions.find((p) => p.unitId === char.id);
    if (!currentPos) continue;

    const role = getClassRole(char.class);
    let targetCol: number;
    let targetRow: number;
    let reason: string;

    switch (role) {
      case 'frontline':
        // Move toward enemies, 2 cells ahead of party center
        targetCol = partyCenter.col + threatDir.col * 2;
        targetRow = partyCenter.row + threatDir.row * 2;
        reason = 'Frontline: position between enemies and party';
        break;
      case 'ranged':
        // Stay behind the frontline, 2 cells back from center
        targetCol = partyCenter.col - threatDir.col * 2;
        targetRow = partyCenter.row - threatDir.row * 2;
        reason = 'Ranged: stay behind frontline for safe casting distance';
        break;
      case 'support':
        // Stay near center, slightly back
        targetCol = partyCenter.col - threatDir.col * 1;
        targetRow = partyCenter.row - threatDir.row * 1;
        reason = 'Support: central position to reach all allies';
        break;
      case 'flanker':
        // Offset perpendicular to threat direction
        targetCol = partyCenter.col + threatDir.row * 2 + threatDir.col * 1;
        targetRow = partyCenter.row - threatDir.col * 2 + threatDir.row * 1;
        reason = 'Flanker: position to approach enemies from the side';
        break;
    }

    const pos = findNearestOpen(targetCol, targetRow, usedPositions);
    usedPositions.add(`${pos.col},${pos.row}`);

    suggestions.push({
      characterId: char.id,
      characterName: char.name,
      role,
      suggestedCol: pos.col,
      suggestedRow: pos.row,
      reason,
    });
  }

  return suggestions;
}

export function formatFormationAdvice(suggestions: FormationSuggestion[]): string {
  if (suggestions.length === 0) return 'No formation suggestions available.';
  const lines = ['🗺️ **Formation Suggestion:**'];
  for (const s of suggestions) {
    const roleIcon = s.role === 'frontline' ? '🛡️' : s.role === 'ranged' ? '🏹' : s.role === 'support' ? '💚' : '🗡️';
    lines.push(`${roleIcon} **${s.characterName}** (${s.role}): ${s.reason}`);
  }
  return lines.join('\n');
}
