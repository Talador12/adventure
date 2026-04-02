// Campaign analytics — aggregate stats for session/campaign review.
// Computes metrics from combat log, DM history, and character data.

import type { Character, Unit } from '../types/game';

export interface CampaignStats {
  totalSessions: number;
  totalCombatRounds: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  totalKills: number;
  totalDeaths: number;
  totalGoldEarned: number;
  totalGoldSpent: number;
  averageSessionLength: number; // minutes
  combatToRolplayRatio: number; // 0-1
  mostActiveCharacter: string;
  deadliestCharacter: string;
  mostDamagedCharacter: string;
  longestCombat: number; // rounds
  totalSpellsCast: number;
  totalCriticalHits: number;
  totalNaturalOnes: number;
}

export function analyzeCombatLog(log: string[], characters: Character[]): Partial<CampaignStats> {
  let totalDamage = 0;
  let totalKills = 0;
  let totalCrits = 0;
  let totalOnes = 0;
  let totalSpells = 0;
  const damageByChar: Record<string, number> = {};
  const killsByChar: Record<string, number> = {};

  for (const entry of log) {
    // Parse damage
    const dmgMatch = entry.match(/for (\d+) damage/);
    if (dmgMatch) totalDamage += parseInt(dmgMatch[1], 10);

    // Parse kills
    if (entry.includes('falls!')) {
      totalKills++;
      for (const c of characters) {
        if (entry.includes(c.name)) {
          killsByChar[c.name] = (killsByChar[c.name] || 0) + 1;
        }
      }
    }

    // Parse crits
    if (entry.includes('CRITICAL') || entry.includes('NAT 20')) totalCrits++;
    if (entry.includes('NAT 1')) totalOnes++;

    // Parse spells
    if (entry.includes('casts') || entry.includes('spell')) totalSpells++;

    // Track damage per character
    for (const c of characters) {
      const charDmg = entry.match(new RegExp(`${c.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*for (\\d+) damage`));
      if (charDmg) damageByChar[c.name] = (damageByChar[c.name] || 0) + parseInt(charDmg[1], 10);
    }
  }

  const deadliest = Object.entries(killsByChar).sort((a, b) => b[1] - a[1])[0];
  const mostDmg = Object.entries(damageByChar).sort((a, b) => b[1] - a[1])[0];

  return {
    totalDamageDealt: totalDamage,
    totalKills,
    totalCriticalHits: totalCrits,
    totalNaturalOnes: totalOnes,
    totalSpellsCast: totalSpells,
    deadliestCharacter: deadliest?.[0] || 'N/A',
    mostActiveCharacter: mostDmg?.[0] || 'N/A',
  };
}

export function formatAnalytics(stats: Partial<CampaignStats>): string {
  const lines = ['📊 **Campaign Analytics:**'];
  if (stats.totalDamageDealt) lines.push(`Total damage dealt: ${stats.totalDamageDealt}`);
  if (stats.totalKills) lines.push(`Total enemies defeated: ${stats.totalKills}`);
  if (stats.totalCriticalHits) lines.push(`Critical hits: ${stats.totalCriticalHits}`);
  if (stats.totalNaturalOnes) lines.push(`Natural ones: ${stats.totalNaturalOnes}`);
  if (stats.totalSpellsCast) lines.push(`Spells cast: ${stats.totalSpellsCast}`);
  if (stats.deadliestCharacter && stats.deadliestCharacter !== 'N/A') lines.push(`Deadliest: ${stats.deadliestCharacter}`);
  if (stats.mostActiveCharacter && stats.mostActiveCharacter !== 'N/A') lines.push(`Most active: ${stats.mostActiveCharacter}`);
  return lines.join('\n');
}
