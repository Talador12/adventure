// Spell range visualizer — compute which cells are in range of a spell.

export type SpellShape = 'single' | 'sphere' | 'cone' | 'line' | 'cube' | 'cylinder';

export interface SpellRangeResult {
  shape: SpellShape;
  rangeFt: number;
  radiusFt: number;
  cellsInRange: number;
  cellsInArea: number;
  description: string;
}

export function parseSpellRange(rangeStr: string): number {
  const match = rangeStr.match(/(\d+)\s*(?:ft|feet)/i);
  if (match) return parseInt(match[1], 10);
  if (rangeStr.toLowerCase().includes('touch')) return 5;
  if (rangeStr.toLowerCase().includes('self')) return 0;
  return 0;
}

export function calculateCellsInRadius(radiusFt: number): number {
  const radiusCells = Math.ceil(radiusFt / 5);
  // Approximate: cells in circle = pi * r^2
  return Math.round(Math.PI * radiusCells * radiusCells);
}

export function calculateConeArea(lengthFt: number): number {
  // Cone: at end of length, width = length. Approximate triangle area in cells
  const lengthCells = Math.ceil(lengthFt / 5);
  return Math.round(lengthCells * lengthCells * 0.5);
}

export function calculateLineArea(lengthFt: number, widthFt: number = 5): number {
  return Math.ceil(lengthFt / 5) * Math.ceil(widthFt / 5);
}

export function analyzeSpellRange(rangeFt: number, shape: SpellShape, radiusFt: number = 0): SpellRangeResult {
  const rangeCells = Math.ceil(rangeFt / 5);
  let cellsInArea: number;
  let description: string;

  switch (shape) {
    case 'single': cellsInArea = 1; description = `Single target at ${rangeFt}ft range.`; break;
    case 'sphere': cellsInArea = calculateCellsInRadius(radiusFt); description = `${radiusFt}ft radius sphere (${cellsInArea} cells) at ${rangeFt}ft range.`; break;
    case 'cone': cellsInArea = calculateConeArea(radiusFt); description = `${radiusFt}ft cone (${cellsInArea} cells) from caster.`; break;
    case 'line': cellsInArea = calculateLineArea(radiusFt); description = `${radiusFt}ft line × 5ft wide (${cellsInArea} cells).`; break;
    case 'cube': cellsInArea = Math.ceil(radiusFt / 5) ** 2; description = `${radiusFt}ft cube (${cellsInArea} cells) at ${rangeFt}ft range.`; break;
    case 'cylinder': cellsInArea = calculateCellsInRadius(radiusFt); description = `${radiusFt}ft radius cylinder (${cellsInArea} ground cells).`; break;
  }

  return { shape, rangeFt, radiusFt, cellsInRange: Math.round(Math.PI * rangeCells * rangeCells), cellsInArea, description };
}

export function formatSpellRange(result: SpellRangeResult, spellName: string): string {
  return `🎯 **${spellName}:** ${result.description}\nRange: ${result.rangeFt}ft (${Math.ceil(result.rangeFt / 5)} cells) | Area: ${result.cellsInArea} cells affected`;
}
