// CampaignAnalytics — visual dashboard for campaign stats.
// Shows damage, kills, crits, spells, per-character breakdowns.
import { useMemo } from 'react';
import type { Character } from '../../types/game';

interface Props {
  combatLog: string[];
  characters: Character[];
  dmHistory: string[];
  sessionCount?: number;
}

interface CharacterStats {
  name: string;
  damageDealt: number;
  kills: number;
  crits: number;
  spellsCast: number;
  damageTaken: number;
}

export default function CampaignAnalytics({ combatLog, characters, dmHistory, sessionCount = 1 }: Props) {
  const stats = useMemo(() => {
    let totalDamage = 0;
    let totalKills = 0;
    let totalCrits = 0;
    let totalOnes = 0;
    let totalSpells = 0;
    let totalHealing = 0;
    let combatRounds = 0;
    const charStats: Record<string, CharacterStats> = {};

    for (const c of characters) {
      charStats[c.name] = { name: c.name, damageDealt: 0, kills: 0, crits: 0, spellsCast: 0, damageTaken: 0 };
    }

    for (const entry of combatLog) {
      const dmgMatch = entry.match(/for (\d+) damage/);
      if (dmgMatch) totalDamage += parseInt(dmgMatch[1], 10);

      const healMatch = entry.match(/heals? (?:for )?(\d+)/i);
      if (healMatch) totalHealing += parseInt(healMatch[1], 10);

      if (entry.includes('falls!') || entry.includes('defeated') || entry.includes('slain')) totalKills++;
      if (entry.includes('CRITICAL') || entry.includes('NAT 20')) totalCrits++;
      if (entry.includes('NAT 1')) totalOnes++;
      if (entry.includes('casts') || entry.includes('Cast:')) totalSpells++;
      if (entry.match(/^--- Round \d+/)) combatRounds++;

      for (const c of characters) {
        const escaped = c.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const charDmg = entry.match(new RegExp(`${escaped}.*for (\\d+) damage`));
        if (charDmg && charStats[c.name]) charStats[c.name].damageDealt += parseInt(charDmg[1], 10);
        if ((entry.includes('falls!') || entry.includes('defeated')) && entry.includes(c.name)) {
          if (charStats[c.name]) charStats[c.name].kills++;
        }
        if (entry.includes('CRITICAL') && entry.includes(c.name) && charStats[c.name]) charStats[c.name].crits++;
        if ((entry.includes('casts') || entry.includes('Cast:')) && entry.includes(c.name) && charStats[c.name]) charStats[c.name].spellsCast++;
      }
    }

    const sorted = Object.values(charStats).sort((a, b) => b.damageDealt - a.damageDealt);
    const maxDmg = sorted[0]?.damageDealt || 1;

    return { totalDamage, totalKills, totalCrits, totalOnes, totalSpells, totalHealing, combatRounds, charStats: sorted, maxDmg, narrativeCount: dmHistory.length };
  }, [combatLog, characters, dmHistory]);

  return (
    <div className="space-y-3">
      {/* Summary grid */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Damage', value: stats.totalDamage.toLocaleString(), color: 'text-red-400', bg: 'bg-red-900/20 border-red-600/30' },
          { label: 'Kills', value: stats.totalKills.toString(), color: 'text-orange-400', bg: 'bg-orange-900/20 border-orange-600/30' },
          { label: 'Crits', value: stats.totalCrits.toString(), color: 'text-amber-400', bg: 'bg-amber-900/20 border-amber-600/30' },
          { label: 'Spells', value: stats.totalSpells.toString(), color: 'text-violet-400', bg: 'bg-violet-900/20 border-violet-600/30' },
          { label: 'Healing', value: stats.totalHealing.toLocaleString(), color: 'text-emerald-400', bg: 'bg-emerald-900/20 border-emerald-600/30' },
          { label: 'Nat 1s', value: stats.totalOnes.toString(), color: 'text-slate-400', bg: 'bg-slate-800/40 border-slate-600/30' },
        ].map((s) => (
          <div key={s.label} className={`rounded border px-2 py-1.5 text-center ${s.bg}`}>
            <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[9px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Meta stats */}
      <div className="flex items-center gap-3 text-[9px] text-slate-500 px-1">
        <span>{stats.combatRounds} combat rounds</span>
        <span>·</span>
        <span>{stats.narrativeCount} narrations</span>
        <span>·</span>
        <span>{sessionCount} session{sessionCount !== 1 ? 's' : ''}</span>
      </div>

      {/* Per-character breakdown */}
      {stats.charStats.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider px-1">Per Character</div>
          {stats.charStats.map((cs) => (
            <div key={cs.name} className="px-2 py-1.5 rounded bg-slate-800/40 border border-slate-700/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-slate-300">{cs.name}</span>
                <span className="text-[9px] text-red-400 font-mono">{cs.damageDealt} dmg</span>
              </div>
              {/* Damage bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-600 to-orange-500 transition-all"
                  style={{ width: `${Math.max(2, (cs.damageDealt / stats.maxDmg) * 100)}%` }}
                />
              </div>
              <div className="flex items-center gap-2 mt-1 text-[8px] text-slate-500">
                {cs.kills > 0 && <span>💀 {cs.kills}</span>}
                {cs.crits > 0 && <span>🎯 {cs.crits}</span>}
                {cs.spellsCast > 0 && <span>✨ {cs.spellsCast}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
