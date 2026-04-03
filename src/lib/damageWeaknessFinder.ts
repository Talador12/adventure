// Damage type weakness finder — suggest best damage type against enemy defenses.

import type { DamageType } from './damageTypes';
import { ALL_DAMAGE_TYPES } from './damageTypes';

export interface WeaknessAnalysis { bestTypes: DamageType[]; worstTypes: DamageType[]; immuneTypes: DamageType[]; vulnerableTypes: DamageType[]; suggestion: string; }

export function analyzeWeaknesses(resistances: DamageType[], immunities: DamageType[], vulnerabilities: DamageType[]): WeaknessAnalysis {
  const immune = new Set(immunities);
  const resistant = new Set(resistances);
  const vulnerable = new Set(vulnerabilities);

  const best = ALL_DAMAGE_TYPES.filter((t) => vulnerable.has(t));
  const normal = ALL_DAMAGE_TYPES.filter((t) => !immune.has(t) && !resistant.has(t) && !vulnerable.has(t));
  const worst = ALL_DAMAGE_TYPES.filter((t) => immune.has(t) || resistant.has(t));

  let suggestion: string;
  if (best.length > 0) suggestion = `Use ${best.join('/')} for double damage!`;
  else if (normal.length > 0) suggestion = `${normal.slice(0, 3).join(', ')} deal normal damage.`;
  else suggestion = 'This enemy resists or is immune to most damage types!';

  return { bestTypes: best, worstTypes: worst, immuneTypes: [...immunities], vulnerableTypes: [...vulnerabilities], suggestion };
}

export function formatWeaknessAnalysis(analysis: WeaknessAnalysis, enemyName: string): string {
  const lines = [`🎯 **${enemyName} Weakness Analysis:**`];
  if (analysis.vulnerableTypes.length > 0) lines.push(`✅ **Vulnerable to:** ${analysis.vulnerableTypes.join(', ')} (double damage!)`);
  if (analysis.immuneTypes.length > 0) lines.push(`❌ **Immune to:** ${analysis.immuneTypes.join(', ')}`);
  if (analysis.worstTypes.length > 0) lines.push(`🛡️ **Resistant/Immune:** ${analysis.worstTypes.join(', ')}`);
  lines.push(`💡 ${analysis.suggestion}`);
  return lines.join('\n');
}
