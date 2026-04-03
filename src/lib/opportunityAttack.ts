// Opportunity attack detector — warn when units provoke OAs by leaving reach.
// Checks if a unit's movement takes it out of an enemy's melee reach.

export interface OACheck {
  movingUnitId: string;
  movingUnitName: string;
  threateningUnitId: string;
  threateningUnitName: string;
  threateningUnitHasReaction: boolean;
  provoked: boolean;
  reason: string;
}

export function checkOpportunityAttacks(
  movingUnitId: string,
  movingUnitName: string,
  fromCol: number,
  fromRow: number,
  toCol: number,
  toRow: number,
  enemyPositions: { id: string; name: string; col: number; row: number; reach: number; hasReaction: boolean; disengaged: boolean }[],
): OACheck[] {
  const results: OACheck[] = [];

  for (const enemy of enemyPositions) {
    // Was the mover in reach before moving?
    const distBefore = Math.max(Math.abs(fromCol - enemy.col), Math.abs(fromRow - enemy.row));
    const distAfter = Math.max(Math.abs(toCol - enemy.col), Math.abs(toRow - enemy.row));
    const wasInReach = distBefore <= enemy.reach;
    const isInReach = distAfter <= enemy.reach;

    if (wasInReach && !isInReach) {
      // Leaving reach — provokes OA
      const provoked = enemy.hasReaction && !enemy.disengaged;
      results.push({
        movingUnitId,
        movingUnitName,
        threateningUnitId: enemy.id,
        threateningUnitName: enemy.name,
        threateningUnitHasReaction: enemy.hasReaction,
        provoked,
        reason: provoked
          ? `${movingUnitName} leaves ${enemy.name}'s reach — opportunity attack!`
          : enemy.disengaged
            ? `${movingUnitName} disengaged from ${enemy.name} — no OA.`
            : `${enemy.name} already used their reaction — no OA.`,
      });
    }
  }

  return results;
}

export function formatOAWarnings(checks: OACheck[]): string {
  if (checks.length === 0) return '';
  const provoked = checks.filter((c) => c.provoked);
  const safe = checks.filter((c) => !c.provoked);
  const lines: string[] = [];

  if (provoked.length > 0) {
    lines.push('⚠️ **Opportunity Attacks Provoked:**');
    for (const c of provoked) lines.push(`  ⚔️ ${c.threateningUnitName} can make an OA against ${c.movingUnitName}!`);
  }
  if (safe.length > 0) {
    for (const c of safe) lines.push(`  ✅ ${c.reason}`);
  }

  return lines.join('\n');
}

export function countProvokedOAs(checks: OACheck[]): number {
  return checks.filter((c) => c.provoked).length;
}
