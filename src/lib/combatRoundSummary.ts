// Combat round summary — auto-generate end-of-round damage totals and status.

export interface RoundSummary {
  round: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  totalHealing: number;
  kills: number;
  crits: number;
  conditions: string[];
  keyMoments: string[];
}

export function summarizeRound(combatLog: string[], roundNumber: number): RoundSummary {
  // Find entries for this round (between "--- Round N" markers)
  const roundMarker = `--- Round ${roundNumber}`;
  const nextMarker = `--- Round ${roundNumber + 1}`;
  let inRound = false;
  const roundEntries: string[] = [];

  for (const entry of combatLog) {
    if (entry.includes(roundMarker)) { inRound = true; continue; }
    if (entry.includes(nextMarker)) break;
    if (inRound) roundEntries.push(entry);
  }

  // If no round markers, use all entries (for non-round-tracked combat)
  const entries = roundEntries.length > 0 ? roundEntries : combatLog;

  let totalDamageDealt = 0, totalDamageTaken = 0, totalHealing = 0, kills = 0, crits = 0;
  const conditions: string[] = [];
  const keyMoments: string[] = [];

  for (const entry of entries) {
    const dmg = entry.match(/for (\d+) damage/);
    if (dmg) totalDamageDealt += parseInt(dmg[1], 10);

    const heal = entry.match(/heals? (?:for )?(\d+)/i);
    if (heal) totalHealing += parseInt(heal[1], 10);

    if (entry.includes('falls!') || entry.includes('defeated')) { kills++; keyMoments.push(entry); }
    if (entry.includes('CRITICAL') || entry.includes('NAT 20')) { crits++; keyMoments.push(entry); }
    if (entry.includes('NAT 1')) keyMoments.push(entry);
    if (entry.includes('poisoned') || entry.includes('stunned') || entry.includes('frightened')) conditions.push(entry);
  }

  return { round: roundNumber, totalDamageDealt, totalDamageTaken, totalHealing, kills, crits, conditions, keyMoments };
}

export function formatRoundSummary(summary: RoundSummary): string {
  const lines = [`📊 **Round ${summary.round} Summary:**`];
  lines.push(`⚔️ Damage dealt: ${summary.totalDamageDealt} | 💚 Healing: ${summary.totalHealing}`);
  if (summary.kills > 0) lines.push(`💀 Kills: ${summary.kills}`);
  if (summary.crits > 0) lines.push(`🎯 Critical hits: ${summary.crits}`);
  if (summary.conditions.length > 0) lines.push(`⚠️ Conditions applied: ${summary.conditions.length}`);
  if (summary.keyMoments.length > 0) {
    lines.push('**Key moments:**');
    for (const m of summary.keyMoments.slice(0, 5)) lines.push(`  • ${m.length > 80 ? m.slice(0, 77) + '...' : m}`);
  }
  return lines.join('\n');
}

export function summarizeEntireCombat(combatLog: string[]): { rounds: number; totalDamage: number; totalHealing: number; totalKills: number; totalCrits: number } {
  let rounds = 0, totalDamage = 0, totalHealing = 0, totalKills = 0, totalCrits = 0;
  for (const entry of combatLog) {
    if (entry.match(/^--- Round \d+/)) rounds++;
    const dmg = entry.match(/for (\d+) damage/);
    if (dmg) totalDamage += parseInt(dmg[1], 10);
    const heal = entry.match(/heals? (?:for )?(\d+)/i);
    if (heal) totalHealing += parseInt(heal[1], 10);
    if (entry.includes('falls!') || entry.includes('defeated')) totalKills++;
    if (entry.includes('CRITICAL') || entry.includes('NAT 20')) totalCrits++;
  }
  return { rounds, totalDamage, totalHealing, totalKills, totalCrits };
}
