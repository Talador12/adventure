// CombatMVP — post-combat awards for top performers.
// Parses the full combat log to determine MVP categories:
// most damage, most kills, most spells cast, most crits, iron wall (most HP left).
// Shows a collapsible award banner after combat ends.
import { useState, useMemo, useEffect, useRef } from 'react';

interface CombatMVPProps {
  combatLog: string[];
  inCombat: boolean;
  /** All player character names for attribution */
  playerNames: string[];
}

interface MVPAward {
  category: string;
  icon: string;
  winner: string;
  value: string;
  color: string;
}

// Parse the combat log and compute per-player stats
function computeAwards(log: string[], playerNames: string[]): MVPAward[] {
  const stats: Record<string, { damage: number; kills: number; spells: number; crits: number; heals: number }> = {};
  for (const name of playerNames) {
    stats[name] = { damage: 0, kills: 0, spells: 0, crits: 0, heals: 0 };
  }

  for (const entry of log) {
    // Match player damage: "PlayerName hits/strikes/attacks ... for X damage"
    for (const name of playerNames) {
      if (entry.includes(name)) {
        const dmgMatch = entry.match(/for (\d+) (?:damage|fire|cold|force|radiant|necrotic|lightning|thunder|psychic|poison)/i);
        if (dmgMatch && !entry.toLowerCase().includes('takes') && !entry.toLowerCase().includes('took')) {
          stats[name].damage += parseInt(dmgMatch[1]);
        }
        // Kills
        if (/\bdefeated\b|\bkill|falls\b|\bslain\b|\bdead\b|\bhas been destroyed\b/i.test(entry)) {
          stats[name].kills++;
        }
        // Spells
        if (/\bcasts?\b|\bspell\b/i.test(entry)) {
          stats[name].spells++;
        }
        // Crits
        if (/critical hit|CRITICAL/i.test(entry)) {
          stats[name].crits++;
        }
        // Healing
        const healMatch = entry.match(/(?:heals?|restored?|regains?)\b.*?(\d+)\s*(?:HP|hit points|health)/i);
        if (healMatch) {
          stats[name].heals += parseInt(healMatch[1]);
        }
      }
    }
  }

  const awards: MVPAward[] = [];

  // Most Damage
  const topDmg = Object.entries(stats).sort(([, a], [, b]) => b.damage - a.damage)[0];
  if (topDmg && topDmg[1].damage > 0) {
    awards.push({ category: 'Most Damage', icon: '⚔️', winner: topDmg[0], value: `${topDmg[1].damage} dmg`, color: 'text-red-400' });
  }

  // Most Kills
  const topKills = Object.entries(stats).sort(([, a], [, b]) => b.kills - a.kills)[0];
  if (topKills && topKills[1].kills > 0) {
    awards.push({ category: 'Most Kills', icon: '💀', winner: topKills[0], value: `${topKills[1].kills} kills`, color: 'text-orange-400' });
  }

  // Most Crits
  const topCrits = Object.entries(stats).sort(([, a], [, b]) => b.crits - a.crits)[0];
  if (topCrits && topCrits[1].crits > 0) {
    awards.push({ category: 'Critical Master', icon: '🎯', winner: topCrits[0], value: `${topCrits[1].crits} crits`, color: 'text-amber-400' });
  }

  // Most Spells
  const topSpells = Object.entries(stats).sort(([, a], [, b]) => b.spells - a.spells)[0];
  if (topSpells && topSpells[1].spells > 0) {
    awards.push({ category: 'Arcane Master', icon: '✨', winner: topSpells[0], value: `${topSpells[1].spells} spells`, color: 'text-purple-400' });
  }

  // Most Heals
  const topHeals = Object.entries(stats).sort(([, a], [, b]) => b.heals - a.heals)[0];
  if (topHeals && topHeals[1].heals > 0) {
    awards.push({ category: 'Healer', icon: '💚', winner: topHeals[0], value: `${topHeals[1].heals} HP restored`, color: 'text-green-400' });
  }

  return awards;
}

export default function CombatMVP({ combatLog, inCombat, playerNames }: CombatMVPProps) {
  const [show, setShow] = useState(false);
  const [awards, setAwards] = useState<MVPAward[]>([]);
  const prevInCombat = useRef(inCombat);

  // Detect combat-end transition and compute awards
  useEffect(() => {
    if (prevInCombat.current && !inCombat && combatLog.length > 0) {
      const computed = computeAwards(combatLog, playerNames);
      if (computed.length > 0) {
        setAwards(computed);
        setShow(true);
      }
    }
    prevInCombat.current = inCombat;
  }, [inCombat, combatLog, playerNames]);

  // Auto-hide after starting new combat
  useEffect(() => {
    if (inCombat) setShow(false);
  }, [inCombat]);

  const memoAwards = useMemo(() => awards, [awards]);

  if (!show || memoAwards.length === 0) return null;

  return (
    <div className="border-b border-amber-900/40 bg-gradient-to-r from-amber-950/30 via-slate-900/50 to-amber-950/30">
      <button
        onClick={() => setShow(false)}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-amber-900/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">🏆 Combat MVP Awards</span>
          <span className="text-[9px] text-slate-600">({memoAwards.length} awards)</span>
        </div>
        <span className="text-[9px] text-slate-600">click to dismiss</span>
      </button>
      <div className="px-3 pb-2 grid grid-cols-1 gap-1">
        {memoAwards.map((award, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-amber-600/30 transition-colors"
          >
            <span className="text-sm">{award.icon}</span>
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-bold ${award.color}`}>{award.category}</span>
              <span className="text-[10px] text-slate-500 mx-1">—</span>
              <span className="text-[11px] font-semibold text-slate-200">{award.winner}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">{award.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
