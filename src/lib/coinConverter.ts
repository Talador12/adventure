// Coin converter — convert between cp/sp/ep/gp/pp with auto-simplify.

export interface CoinPurse { cp: number; sp: number; ep: number; gp: number; pp: number; }

// 1pp=10gp, 1gp=10sp=2ep, 1sp=10cp
const TO_CP: Record<keyof CoinPurse, number> = { cp: 1, sp: 10, ep: 50, gp: 100, pp: 1000 };

export function totalInCopper(purse: CoinPurse): number {
  return purse.cp * TO_CP.cp + purse.sp * TO_CP.sp + purse.ep * TO_CP.ep + purse.gp * TO_CP.gp + purse.pp * TO_CP.pp;
}

export function totalInGold(purse: CoinPurse): number { return totalInCopper(purse) / 100; }

export function simplify(totalCp: number): CoinPurse {
  let remaining = totalCp;
  const pp = Math.floor(remaining / 1000); remaining %= 1000;
  const gp = Math.floor(remaining / 100); remaining %= 100;
  const sp = Math.floor(remaining / 10); remaining %= 10;
  return { cp: remaining, sp, ep: 0, gp, pp };
}

export function addCoins(a: CoinPurse, b: CoinPurse): CoinPurse {
  return { cp: a.cp + b.cp, sp: a.sp + b.sp, ep: a.ep + b.ep, gp: a.gp + b.gp, pp: a.pp + b.pp };
}

export function subtractCoins(purse: CoinPurse, cost: CoinPurse): { result: CoinPurse; success: boolean } {
  const totalHave = totalInCopper(purse);
  const totalCost = totalInCopper(cost);
  if (totalCost > totalHave) return { result: purse, success: false };
  return { result: simplify(totalHave - totalCost), success: true };
}

export function splitEvenly(purse: CoinPurse, ways: number): { each: CoinPurse; remainder: CoinPurse } {
  const total = totalInCopper(purse);
  const perPerson = Math.floor(total / ways);
  const leftover = total - perPerson * ways;
  return { each: simplify(perPerson), remainder: simplify(leftover) };
}

export function formatCoinPurse(purse: CoinPurse, label?: string): string {
  const parts: string[] = [];
  if (purse.pp > 0) parts.push(`${purse.pp}pp`);
  if (purse.gp > 0) parts.push(`${purse.gp}gp`);
  if (purse.ep > 0) parts.push(`${purse.ep}ep`);
  if (purse.sp > 0) parts.push(`${purse.sp}sp`);
  if (purse.cp > 0) parts.push(`${purse.cp}cp`);
  const total = totalInGold(purse);
  return `💰 ${label ? `**${label}**: ` : ''}${parts.join(', ') || '0gp'} (${total.toFixed(1)}gp total)`;
}
