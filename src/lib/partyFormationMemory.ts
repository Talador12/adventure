// Party formation memory — save/load party token arrangements for quick deployment.
// DM saves formations; one click restores token positions.

import type { TokenPosition } from './mapUtils';

export interface SavedFormation {
  id: string;
  name: string;
  positions: { characterId: string; relativeCol: number; relativeRow: number }[];
  savedAt: number;
}

const STORAGE_PREFIX = 'adventure:formations:';

export function saveFormation(roomId: string, name: string, positions: TokenPosition[]): SavedFormation {
  if (positions.length === 0) return { id: crypto.randomUUID(), name, positions: [], savedAt: Date.now() };

  // Store positions relative to centroid for re-centering
  const centerCol = Math.round(positions.reduce((s, p) => s + p.col, 0) / positions.length);
  const centerRow = Math.round(positions.reduce((s, p) => s + p.row, 0) / positions.length);

  const formation: SavedFormation = {
    id: crypto.randomUUID(),
    name,
    positions: positions.map((p) => ({ characterId: p.unitId, relativeCol: p.col - centerCol, relativeRow: p.row - centerRow })),
    savedAt: Date.now(),
  };

  const saved = loadFormations(roomId);
  saved.push(formation);
  try { localStorage.setItem(`${STORAGE_PREFIX}${roomId}`, JSON.stringify(saved.slice(-10))); } catch {}
  return formation;
}

export function loadFormations(roomId: string): SavedFormation[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${roomId}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function deleteFormation(roomId: string, formationId: string): void {
  const saved = loadFormations(roomId).filter((f) => f.id !== formationId);
  try { localStorage.setItem(`${STORAGE_PREFIX}${roomId}`, JSON.stringify(saved)); } catch {}
}

export function applyFormation(formation: SavedFormation, centerCol: number, centerRow: number): TokenPosition[] {
  return formation.positions.map((p) => ({
    unitId: p.characterId,
    col: centerCol + p.relativeCol,
    row: centerRow + p.relativeRow,
  }));
}

export function formatFormationList(formations: SavedFormation[]): string {
  if (formations.length === 0) return '📐 **Saved Formations:** None yet. Save current positions with "Save Formation".';
  const lines = ['📐 **Saved Formations:**'];
  for (const f of formations) {
    lines.push(`• **${f.name}** (${f.positions.length} tokens, saved ${new Date(f.savedAt).toLocaleDateString()})`);
  }
  return lines.join('\n');
}
