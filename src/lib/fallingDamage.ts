// Falling damage calculator — height to damage with feather fall check.

export interface FallResult {
  heightFeet: number;
  damageDice: number;
  maxDamage: number;
  averageDamage: number;
  featherFallAvailable: boolean;
  narration: string;
}

export function calculateFallingDamage(heightFeet: number, featherFall: boolean = false): FallResult {
  if (featherFall) {
    return { heightFeet, damageDice: 0, maxDamage: 0, averageDamage: 0, featherFallAvailable: true, narration: `🪶 Feather Fall activated! ${heightFeet}ft fall negated — land safely.` };
  }
  // 1d6 per 10ft fallen, max 20d6
  const dice = Math.min(20, Math.floor(heightFeet / 10));
  if (dice <= 0) return { heightFeet, damageDice: 0, maxDamage: 0, averageDamage: 0, featherFallAvailable: false, narration: `Fall of ${heightFeet}ft — no damage (less than 10ft).` };
  const maxDmg = dice * 6;
  const avgDmg = Math.round(dice * 3.5);
  return {
    heightFeet, damageDice: dice, maxDamage: maxDmg, averageDamage: avgDmg, featherFallAvailable: false,
    narration: `💥 Fall of ${heightFeet}ft — **${dice}d6 bludgeoning** damage (avg ${avgDmg}, max ${maxDmg}).${dice >= 20 ? ' (Terminal velocity — max 20d6)' : ''}`,
  };
}

export function rollFallingDamage(heightFeet: number): { total: number; dice: number[]; narration: string } {
  const result = calculateFallingDamage(heightFeet);
  if (result.damageDice === 0) return { total: 0, dice: [], narration: result.narration };
  const rolls: number[] = [];
  for (let i = 0; i < result.damageDice; i++) rolls.push(Math.floor(Math.random() * 6) + 1);
  const total = rolls.reduce((s, r) => s + r, 0);
  return { total, dice: rolls, narration: `💥 Fall of ${heightFeet}ft — ${result.damageDice}d6 = **${total}** bludgeoning damage! [${rolls.join(', ')}]` };
}

export function formatFallingDamageTable(): string {
  const lines = ['💥 **Falling Damage Reference:**'];
  const heights = [10, 20, 30, 50, 100, 200];
  for (const h of heights) {
    const r = calculateFallingDamage(h);
    lines.push(`  ${h}ft → ${r.damageDice}d6 (avg ${r.averageDamage}, max ${r.maxDamage})`);
  }
  lines.push('  *Max 20d6 (200ft+). Feather Fall negates all.*');
  return lines.join('\n');
}
