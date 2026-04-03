// Terrain effect compendium — reference for all terrain types with effects.

import type { TerrainType } from '../lib/mapUtils';

export interface TerrainInfo {
  type: TerrainType;
  name: string;
  emoji: string;
  movementCost: number;
  description: string;
  combatEffects: string[];
  canHide: boolean;
  isHazard: boolean;
  hazardDamage?: string;
  hazardSave?: string;
}

export const TERRAIN_COMPENDIUM: TerrainInfo[] = [
  { type: 'floor', name: 'Floor/Ground', emoji: '⬜', movementCost: 1, description: 'Normal terrain. No special effects.', combatEffects: [], canHide: false, isHazard: false },
  { type: 'wall', name: 'Wall', emoji: '🧱', movementCost: Infinity, description: 'Impassable barrier. Blocks movement and line of sight.', combatEffects: ['Full cover', 'Blocks line of sight', 'Can be destroyed (30 HP, AC 17)'], canHide: true, isHazard: false },
  { type: 'water', name: 'Water', emoji: '💧', movementCost: 2, description: 'Shallow water. Difficult terrain. Deep water requires swimming.', combatEffects: ['Difficult terrain (half speed)', 'Disadvantage on fire-based attacks', 'Extinguishes flames'], canHide: false, isHazard: false },
  { type: 'difficult', name: 'Difficult Terrain', emoji: '🪨', movementCost: 2, description: 'Rubble, undergrowth, or uneven ground. Costs double movement.', combatEffects: ['Half speed', 'Partial cover possible'], canHide: true, isHazard: false },
  { type: 'door', name: 'Door', emoji: '🚪', movementCost: 1, description: 'A door. May be locked (requires Thieves\' Tools check to pick).', combatEffects: ['Can be locked/barricaded', 'Can be destroyed (10 HP, AC 15)', 'Blocks line of sight when closed'], canHide: false, isHazard: false },
  { type: 'pit', name: 'Pit', emoji: '🕳️', movementCost: Infinity, description: 'A deep pit. Falling in causes damage.', combatEffects: ['DEX DC 12 save or fall in', '1d6 per 10ft fallen', 'Climbing out costs full movement'], canHide: false, isHazard: true, hazardDamage: '1d6 per 10ft', hazardSave: 'DEX DC 12' },
  { type: 'lava', name: 'Lava', emoji: '🌋', movementCost: 2, description: 'Molten rock. Entering or starting turn in lava deals fire damage.', combatEffects: ['10d10 fire entering', '5d10 fire start of turn', 'Destroys non-magical items'], canHide: false, isHazard: true, hazardDamage: '10d10 fire', hazardSave: 'None — automatic' },
  { type: 'acid', name: 'Acid Pool', emoji: '🧪', movementCost: 2, description: 'Corrosive liquid. Deals acid damage on contact.', combatEffects: ['2d6 acid entering', '1d6 acid start of turn', 'Corrodes metal equipment'], canHide: false, isHazard: true, hazardDamage: '2d6 acid', hazardSave: 'DEX DC 12 half' },
  { type: 'poison_gas', name: 'Poison Gas', emoji: '☁️', movementCost: 1, description: 'Toxic fumes. Poisoning and damage on failed save.', combatEffects: ['CON DC 12 save or poisoned', '1d6 poison on failed save', 'Heavily obscured'], canHide: true, isHazard: true, hazardDamage: '1d6 poison', hazardSave: 'CON DC 12' },
  { type: 'stairs_up', name: 'Stairs Up', emoji: '⬆️', movementCost: 1, description: 'Stairs leading to a higher level.', combatEffects: ['Transition point between levels'], canHide: false, isHazard: false },
  { type: 'stairs_down', name: 'Stairs Down', emoji: '⬇️', movementCost: 1, description: 'Stairs leading to a lower level.', combatEffects: ['Transition point between levels'], canHide: false, isHazard: false },
];

export function getTerrainInfo(type: TerrainType): TerrainInfo | undefined {
  return TERRAIN_COMPENDIUM.find((t) => t.type === type);
}

export function getHazardousTerrain(): TerrainInfo[] {
  return TERRAIN_COMPENDIUM.filter((t) => t.isHazard);
}

export function formatTerrainCompendium(): string {
  const lines = ['🗺️ **Terrain Reference:**'];
  for (const t of TERRAIN_COMPENDIUM) {
    lines.push(`${t.emoji} **${t.name}** — Move: ${t.movementCost === Infinity ? '∞' : `×${t.movementCost}`}${t.isHazard ? ' ⚠️' : ''}`);
    if (t.combatEffects.length > 0) lines.push(`  Effects: ${t.combatEffects.join('; ')}`);
  }
  return lines.join('\n');
}

export function formatTerrainInfo(type: TerrainType): string {
  const info = getTerrainInfo(type);
  if (!info) return `Unknown terrain type: ${type}`;
  const lines = [`${info.emoji} **${info.name}**: ${info.description}`];
  if (info.combatEffects.length > 0) for (const e of info.combatEffects) lines.push(`  • ${e}`);
  if (info.isHazard) lines.push(`  ⚠️ Hazard: ${info.hazardDamage} (${info.hazardSave})`);
  return lines.join('\n');
}
