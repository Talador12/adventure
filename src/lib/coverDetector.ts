// Cover calculator — auto-detect half/three-quarter/full cover from positions.
// Extends existing checkCover in mapUtils with more detailed analysis.

import type { TerrainType } from './mapUtils';

export type CoverLevel = 'none' | 'half' | 'three_quarters' | 'full';

export interface CoverResult {
  level: CoverLevel;
  acBonus: number;
  dexSaveBonus: number;
  obstructions: number;
  totalCells: number;
  description: string;
}

export const COVER_AC_BONUSES: Record<CoverLevel, number> = {
  none: 0,
  half: 2,
  three_quarters: 5,
  full: 99, // effectively untargetable
};

export const COVER_DEX_BONUSES: Record<CoverLevel, number> = {
  none: 0,
  half: 2,
  three_quarters: 5,
  full: 99,
};

export function analyzeCover(
  attackerCol: number,
  attackerRow: number,
  targetCol: number,
  targetRow: number,
  terrain: TerrainType[][],
): CoverResult {
  // Bresenham line from attacker to target, count obstructions
  const dx = Math.abs(targetCol - attackerCol);
  const dy = Math.abs(targetRow - attackerRow);
  const sx = attackerCol < targetCol ? 1 : -1;
  const sy = attackerRow < targetRow ? 1 : -1;
  let err = dx - dy;
  let x = attackerCol;
  let y = attackerRow;
  let obstructions = 0;
  let totalCells = 0;

  while (x !== targetCol || y !== targetRow) {
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }

    // Skip the attacker and target cells
    if ((x === attackerCol && y === attackerRow) || (x === targetCol && y === targetRow)) continue;

    totalCells++;
    const cell = terrain[y]?.[x];
    if (cell === 'wall') obstructions += 2; // full obstruction
    else if (cell === 'door' || cell === 'difficult') obstructions += 1; // partial obstruction
  }

  let level: CoverLevel;
  if (obstructions >= 4) level = 'full';
  else if (obstructions >= 2) level = 'three_quarters';
  else if (obstructions >= 1) level = 'half';
  else level = 'none';

  const descriptions: Record<CoverLevel, string> = {
    none: 'No cover — clear line of sight.',
    half: 'Half cover (+2 AC, +2 DEX saves). Partially obscured by terrain.',
    three_quarters: 'Three-quarters cover (+5 AC, +5 DEX saves). Mostly obscured.',
    full: 'Full cover. Cannot be targeted directly.',
  };

  return {
    level,
    acBonus: COVER_AC_BONUSES[level],
    dexSaveBonus: COVER_DEX_BONUSES[level],
    obstructions,
    totalCells,
    description: descriptions[level],
  };
}

export function formatCoverResult(attackerName: string, targetName: string, result: CoverResult): string {
  const emoji = result.level === 'none' ? '🎯' : result.level === 'half' ? '🛡️' : result.level === 'three_quarters' ? '🏰' : '🧱';
  return `${emoji} **${targetName}** has **${result.level.replace('_', '-')} cover** from ${attackerName}. ${result.description}`;
}
