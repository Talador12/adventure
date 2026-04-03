// Party HP dashboard — visual overview of all character HP bars.

export interface HpBarData {
  characterId: string;
  name: string;
  currentHp: number;
  maxHp: number;
  tempHp: number;
  percentage: number;
  status: 'healthy' | 'wounded' | 'bloodied' | 'critical' | 'unconscious' | 'dead';
}

export function getHpStatus(currentHp: number, maxHp: number): HpBarData['status'] {
  if (currentHp <= 0) return maxHp > 0 ? 'unconscious' : 'dead';
  const pct = (currentHp / maxHp) * 100;
  if (pct > 75) return 'healthy';
  if (pct > 50) return 'wounded';
  if (pct > 25) return 'bloodied';
  return 'critical';
}

export function computeHpBars(characters: { id: string; name: string; hp: number; maxHp: number; tempHp?: number }[]): HpBarData[] {
  return characters.map((c) => ({
    characterId: c.id, name: c.name, currentHp: c.hp, maxHp: c.maxHp, tempHp: c.tempHp || 0,
    percentage: c.maxHp > 0 ? Math.round((c.hp / c.maxHp) * 100) : 0,
    status: getHpStatus(c.hp, c.maxHp),
  }));
}

export function getPartyHealthSummary(bars: HpBarData[]): { totalCurrent: number; totalMax: number; percentage: number; downed: number; healthy: number } {
  const totalCurrent = bars.reduce((s, b) => s + Math.max(0, b.currentHp), 0);
  const totalMax = bars.reduce((s, b) => s + b.maxHp, 0);
  return {
    totalCurrent, totalMax, percentage: totalMax > 0 ? Math.round((totalCurrent / totalMax) * 100) : 0,
    downed: bars.filter((b) => b.status === 'unconscious' || b.status === 'dead').length,
    healthy: bars.filter((b) => b.status === 'healthy').length,
  };
}

export function formatPartyHpDashboard(characters: { id: string; name: string; hp: number; maxHp: number }[]): string {
  const bars = computeHpBars(characters);
  const summary = getPartyHealthSummary(bars);
  const lines = [`❤️ **Party HP** (${summary.percentage}% total, ${summary.downed} downed):`];
  for (const b of bars) {
    const emoji = b.status === 'healthy' ? '🟢' : b.status === 'wounded' ? '🟡' : b.status === 'bloodied' ? '🟠' : b.status === 'critical' ? '🔴' : '💀';
    const filled = Math.round(b.percentage / 10);
    const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
    lines.push(`${emoji} **${b.name}**: [${bar}] ${b.currentHp}/${b.maxHp} (${b.percentage}%)${b.tempHp > 0 ? ` +${b.tempHp} temp` : ''}`);
  }
  return lines.join('\n');
}
