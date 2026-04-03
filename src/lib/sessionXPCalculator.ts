// Session XP calculator — sum all XP sources for end-of-session distribution.

export interface XPSource { source: string; amount: number; type: 'combat' | 'quest' | 'roleplay' | 'milestone' | 'discovery'; }
export interface SessionXPResult { sources: XPSource[]; totalXP: number; perCharacter: number; partySize: number; }

export function calculateSessionXP(sources: XPSource[], partySize: number): SessionXPResult {
  const totalXP = sources.reduce((s, x) => s + x.amount, 0);
  return { sources, totalXP, perCharacter: partySize > 0 ? Math.floor(totalXP / partySize) : 0, partySize };
}

export function xpFromCR(cr: number): number {
  const table: Record<number, number> = { 0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100, 5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900, 11: 7200, 12: 8400, 13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000, 18: 20000, 19: 22000, 20: 25000 };
  return table[cr] || Math.round(cr * 1000);
}

export function xpToNextLevel(currentLevel: number): number {
  const thresholds = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
  return thresholds[Math.min(currentLevel, 19)] || 355000;
}

export function formatSessionXP(result: SessionXPResult): string {
  const lines = [`🏆 **Session XP Summary** (${result.partySize} characters):`];
  const grouped: Record<string, number> = {};
  for (const s of result.sources) grouped[s.type] = (grouped[s.type] || 0) + s.amount;
  for (const [type, amount] of Object.entries(grouped)) {
    const emoji = type === 'combat' ? '⚔️' : type === 'quest' ? '📜' : type === 'roleplay' ? '🎭' : type === 'milestone' ? '🏆' : '🔍';
    lines.push(`${emoji} ${type}: ${amount} XP`);
  }
  lines.push(`\n**Total: ${result.totalXP} XP | Per character: ${result.perCharacter} XP**`);
  return lines.join('\n');
}
