// Damage log analytics — per-session analysis of damage dealt/taken over time.

export interface DamageAnalytics {
  totalDealt: number;
  totalTaken: number;
  totalHealing: number;
  peakDamageRound: number;
  peakDamageAmount: number;
  dpr: number; // damage per round
  hpr: number; // healing per round
  roundCount: number;
  perCharacter: Record<string, { dealt: number; taken: number; healed: number }>;
}

export function analyzeDamageLog(combatLog: string[], characterNames: string[]): DamageAnalytics {
  let totalDealt = 0, totalTaken = 0, totalHealing = 0, roundCount = 0;
  let currentRoundDmg = 0, peakDamageRound = 0, peakDamageAmount = 0;
  const perChar: Record<string, { dealt: number; taken: number; healed: number }> = {};
  for (const n of characterNames) perChar[n] = { dealt: 0, taken: 0, healed: 0 };

  for (const entry of combatLog) {
    if (entry.match(/^--- Round \d+/)) {
      roundCount++;
      if (currentRoundDmg > peakDamageAmount) { peakDamageAmount = currentRoundDmg; peakDamageRound = roundCount; }
      currentRoundDmg = 0;
    }

    const dmg = entry.match(/for (\d+) damage/);
    if (dmg) { const d = parseInt(dmg[1], 10); totalDealt += d; currentRoundDmg += d; }

    const heal = entry.match(/heals? (?:for )?(\d+)/i);
    if (heal) totalHealing += parseInt(heal[1], 10);

    for (const name of characterNames) {
      if (!entry.includes(name)) continue;
      if (dmg && entry.indexOf(name) < entry.indexOf('for')) perChar[name].dealt += parseInt(dmg[1], 10);
      if (heal) perChar[name].healed += parseInt(heal[1], 10);
    }
  }

  // Final round check
  if (currentRoundDmg > peakDamageAmount) { peakDamageAmount = currentRoundDmg; peakDamageRound = roundCount; }

  return {
    totalDealt, totalTaken, totalHealing, peakDamageRound, peakDamageAmount,
    dpr: roundCount > 0 ? Math.round(totalDealt / roundCount) : 0,
    hpr: roundCount > 0 ? Math.round(totalHealing / roundCount) : 0,
    roundCount, perCharacter: perChar,
  };
}

export function formatDamageAnalytics(analytics: DamageAnalytics): string {
  const lines = ['📈 **Damage Analytics:**'];
  lines.push(`Total damage: ${analytics.totalDealt} | Healing: ${analytics.totalHealing}`);
  lines.push(`Rounds: ${analytics.roundCount} | DPR: ${analytics.dpr} | HPR: ${analytics.hpr}`);
  if (analytics.peakDamageAmount > 0) lines.push(`Peak damage: ${analytics.peakDamageAmount} in round ${analytics.peakDamageRound}`);
  const chars = Object.entries(analytics.perCharacter).filter(([, v]) => v.dealt > 0 || v.healed > 0);
  if (chars.length > 0) {
    lines.push('**Per character:**');
    for (const [name, stats] of chars.sort((a, b) => b[1].dealt - a[1].dealt)) {
      lines.push(`  ⚔️ ${name}: ${stats.dealt} dealt${stats.healed > 0 ? `, ${stats.healed} healed` : ''}`);
    }
  }
  return lines.join('\n');
}
