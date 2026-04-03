// Flanking calculator — auto-detect flanking positions and apply advantage/bonus.
// Uses the existing isFlanking from mapUtils + adds detailed detection.

export type FlankingRule = 'none' | 'advantage' | 'plus_two';

export interface FlankingConfig {
  rule: FlankingRule;
  name: string;
  description: string;
}

export const FLANKING_RULES: FlankingConfig[] = [
  { rule: 'none', name: 'No Flanking', description: 'Flanking provides no mechanical benefit.' },
  { rule: 'advantage', name: 'Advantage (DMG)', description: 'Flanking grants advantage on melee attack rolls. DMG optional rule.' },
  { rule: 'plus_two', name: '+2 Bonus', description: 'Flanking grants +2 to melee attack rolls. Common house rule, less powerful than advantage.' },
];

export interface FlankingCheck {
  attackerId: string;
  targetId: string;
  isFlanking: boolean;
  flankingAllyId: string | null;
  flankingAllyName: string | null;
  benefit: string;
}

export function checkFlanking(
  attackerCol: number, attackerRow: number,
  targetCol: number, targetRow: number,
  allyPositions: { id: string; name: string; col: number; row: number }[],
  rule: FlankingRule,
): FlankingCheck {
  if (rule === 'none') return { attackerId: '', targetId: '', isFlanking: false, flankingAllyId: null, flankingAllyName: null, benefit: 'None (flanking disabled)' };

  // Check if any ally is on the opposite side of the target from the attacker
  for (const ally of allyPositions) {
    const dx1 = attackerCol - targetCol;
    const dy1 = attackerRow - targetRow;
    const dx2 = ally.col - targetCol;
    const dy2 = ally.row - targetRow;

    // Opposite side: vectors should roughly point in opposite directions (dot product < 0)
    const dot = dx1 * dx2 + dy1 * dy2;

    // Must be adjacent to target
    const allyDist = Math.max(Math.abs(ally.col - targetCol), Math.abs(ally.row - targetRow));
    const attackerDist = Math.max(Math.abs(attackerCol - targetCol), Math.abs(attackerRow - targetRow));

    if (dot < 0 && allyDist <= 1 && attackerDist <= 1) {
      const benefit = rule === 'advantage' ? 'Advantage on melee attacks' : '+2 to melee attack rolls';
      return { attackerId: '', targetId: '', isFlanking: true, flankingAllyId: ally.id, flankingAllyName: ally.name, benefit };
    }
  }

  return { attackerId: '', targetId: '', isFlanking: false, flankingAllyId: null, flankingAllyName: null, benefit: 'Not flanking' };
}

export function findFlankingOpportunities(
  targetCol: number, targetRow: number,
  currentPositions: { id: string; name: string; col: number; row: number }[],
  gridCols: number, gridRows: number,
): { col: number; row: number; wouldFlankWith: string }[] {
  const opportunities: { col: number; row: number; wouldFlankWith: string }[] = [];

  // For each adjacent cell around the target
  for (let dc = -1; dc <= 1; dc++) {
    for (let dr = -1; dr <= 1; dr++) {
      if (dc === 0 && dr === 0) continue;
      const col = targetCol + dc;
      const row = targetRow + dr;
      if (col < 0 || row < 0 || col >= gridCols || row >= gridRows) continue;

      // Check if standing here would create flanking with any existing ally
      for (const ally of currentPositions) {
        const dot = dc * (ally.col - targetCol) + dr * (ally.row - targetRow);
        const allyDist = Math.max(Math.abs(ally.col - targetCol), Math.abs(ally.row - targetRow));
        if (dot < 0 && allyDist <= 1) {
          opportunities.push({ col, row, wouldFlankWith: ally.name });
        }
      }
    }
  }

  return opportunities;
}

export function formatFlankingCheck(check: FlankingCheck, attackerName: string, targetName: string): string {
  if (check.isFlanking) {
    return `⚔️ **Flanking!** ${attackerName} flanks ${targetName} with ${check.flankingAllyName}. Benefit: ${check.benefit}`;
  }
  return `⚔️ ${attackerName} is not flanking ${targetName}.`;
}
