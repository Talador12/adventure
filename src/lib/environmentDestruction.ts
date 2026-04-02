// Environmental destruction — walls and doors have HP and can be destroyed.
// Attacking a terrain cell deals damage; at 0 HP it becomes floor.

import type { TerrainType } from './mapUtils';

export interface DestructibleCell {
  col: number;
  row: number;
  type: TerrainType;
  hp: number;
  maxHp: number;
  ac: number;
}

const DESTRUCTIBLE_CONFIG: Partial<Record<TerrainType, { hp: number; ac: number }>> = {
  wall: { hp: 30, ac: 17 },     // stone wall — tough but breakable
  door: { hp: 10, ac: 15 },     // wooden door — moderate
  water: { hp: 0, ac: 0 },      // not destructible but freezable
};

export function isDestructible(type: TerrainType): boolean {
  return type === 'wall' || type === 'door';
}

export function createDestructibleCell(col: number, row: number, type: TerrainType): DestructibleCell | null {
  const config = DESTRUCTIBLE_CONFIG[type];
  if (!config || config.hp <= 0) return null;
  return { col, row, type, hp: config.hp, maxHp: config.hp, ac: config.ac };
}

export function damageCell(cell: DestructibleCell, damage: number, attackRoll: number): {
  cell: DestructibleCell;
  destroyed: boolean;
  narration: string;
} {
  if (attackRoll < cell.ac) {
    return {
      cell,
      destroyed: false,
      narration: `The attack bounces off the ${cell.type} (AC ${cell.ac}, rolled ${attackRoll}).`,
    };
  }

  const newHp = Math.max(0, cell.hp - damage);
  const destroyed = newHp <= 0;
  const updatedCell = { ...cell, hp: newHp };

  const narration = destroyed
    ? `💥 The ${cell.type} crumbles! (${damage} damage, destroyed)`
    : `💥 The ${cell.type} takes ${damage} damage (${newHp}/${cell.maxHp} HP remaining).`;

  return { cell: updatedCell, destroyed, narration };
}

export function getDestroyedTerrain(type: TerrainType): TerrainType {
  // What a cell becomes when destroyed
  switch (type) {
    case 'wall': return 'difficult'; // rubble
    case 'door': return 'floor';     // open doorway
    default: return 'floor';
  }
}

export function formatDestructibleStatus(cells: DestructibleCell[]): string {
  if (cells.length === 0) return 'No destructible terrain tracked.';
  const lines = ['🏚️ **Destructible Terrain:**'];
  for (const c of cells.slice(0, 10)) {
    const pct = Math.round((c.hp / c.maxHp) * 100);
    const bar = pct > 75 ? '🟢' : pct > 25 ? '🟡' : '🔴';
    lines.push(`${bar} ${c.type} at (${c.col},${c.row}): ${c.hp}/${c.maxHp} HP (AC ${c.ac})`);
  }
  return lines.join('\n');
}
