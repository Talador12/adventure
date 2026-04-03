// Encumbrance calculator — carrying capacity with variant rules.

export type EncumbranceRule = 'standard' | 'variant' | 'none';

export interface EncumbranceResult {
  rule: EncumbranceRule;
  currentWeight: number;
  carryCapacity: number;
  liftCapacity: number;
  encumbered: boolean;
  heavilyEncumbered: boolean;
  overCapacity: boolean;
  speedPenalty: number; // cells
  description: string;
}

export function calculateCarryCapacity(strScore: number, sizeMultiplier: number = 1): number {
  return strScore * 15 * sizeMultiplier; // lbs
}

export function calculateLiftCapacity(strScore: number, sizeMultiplier: number = 1): number {
  return strScore * 30 * sizeMultiplier; // lbs
}

export function calculateEncumbrance(currentWeight: number, strScore: number, rule: EncumbranceRule, sizeMultiplier: number = 1): EncumbranceResult {
  const carryCapacity = calculateCarryCapacity(strScore, sizeMultiplier);
  const liftCapacity = calculateLiftCapacity(strScore, sizeMultiplier);

  if (rule === 'none') {
    return { rule, currentWeight, carryCapacity, liftCapacity, encumbered: false, heavilyEncumbered: false, overCapacity: currentWeight > carryCapacity, speedPenalty: 0, description: 'Encumbrance tracking disabled.' };
  }

  if (rule === 'variant') {
    // Variant: encumbered at STR×5, heavily at STR×10
    const encThreshold = strScore * 5;
    const heavyThreshold = strScore * 10;
    const encumbered = currentWeight > encThreshold;
    const heavilyEncumbered = currentWeight > heavyThreshold;
    const overCapacity = currentWeight > carryCapacity;
    const speedPenalty = heavilyEncumbered ? 4 : encumbered ? 2 : 0; // cells (×5 for feet)

    return {
      rule, currentWeight, carryCapacity, liftCapacity, encumbered, heavilyEncumbered, overCapacity, speedPenalty,
      description: overCapacity ? `Over capacity! Speed 0, can't act.` : heavilyEncumbered ? `Heavily encumbered. -20ft speed, disadvantage on attacks/saves/checks.` : encumbered ? `Encumbered. -10ft speed.` : 'Not encumbered.',
    };
  }

  // Standard: just carry capacity, no gradual penalties
  const overCapacity = currentWeight > carryCapacity;
  return { rule, currentWeight, carryCapacity, liftCapacity, encumbered: overCapacity, heavilyEncumbered: false, overCapacity, speedPenalty: overCapacity ? 100 : 0, description: overCapacity ? 'Over carrying capacity! Speed reduced to 5ft.' : `Carrying ${currentWeight}/${carryCapacity} lbs.` };
}

export function estimateInventoryWeight(items: { name: string; weight?: number }[]): number {
  return items.reduce((sum, i) => sum + (i.weight || 1), 0); // default 1lb per item
}

export function formatEncumbrance(result: EncumbranceResult, characterName: string): string {
  const pct = Math.round((result.currentWeight / result.carryCapacity) * 100);
  const bar = '█'.repeat(Math.min(10, Math.floor(pct / 10))) + '░'.repeat(Math.max(0, 10 - Math.floor(pct / 10)));
  const emoji = result.overCapacity ? '🔴' : result.heavilyEncumbered ? '🟠' : result.encumbered ? '🟡' : '🟢';
  return `${emoji} **${characterName}**: [${bar}] ${result.currentWeight}/${result.carryCapacity} lbs (${pct}%)\n${result.description}${result.speedPenalty > 0 ? ` Speed: -${result.speedPenalty * 5}ft` : ''}`;
}
