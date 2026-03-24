// DamageLeaderboard — running damage totals per character across the session.
// Sorted by damage dealt. Shows a mini progress bar relative to the top dealer.
// The scoreboard nobody asked for but everyone checks.
import { useMemo } from 'react';

interface DamageLeaderboardProps {
  /** Combat log entries from the session */
  combatLog: string[];
  /** Player character names to track */
  playerNames: string[];
  inCombat: boolean;
}

export default function DamageLeaderboard({ combatLog, playerNames, inCombat }: DamageLeaderboardProps) {
  const leaderboard = useMemo(() => {
    const dmg: Record<string, number> = {};
    for (const name of playerNames) dmg[name] = 0;

    for (const line of combatLog) {
      const match = line.match(/for (\d+) (?:damage|fire|cold|force|radiant|necrotic|lightning|thunder|psychic|poison|acid)/i);
      if (!match || line.toLowerCase().includes('takes')) continue;
      for (const name of playerNames) {
        if (line.includes(name)) {
          dmg[name] += parseInt(match[1]);
          break;
        }
      }
    }

    return Object.entries(dmg)
      .filter(([, d]) => d > 0)
      .sort(([, a], [, b]) => b - a);
  }, [combatLog, playerNames]);

  if (!inCombat || leaderboard.length === 0) return null;

  const maxDmg = leaderboard[0]?.[1] || 1;

  return (
    <div className="space-y-1 px-3 py-1.5 border-t border-slate-800/50 bg-slate-900/20">
      <label className="text-[8px] text-slate-600 font-semibold uppercase tracking-wider">Damage Dealt</label>
      {leaderboard.map(([name, damage], i) => (
        <div key={name} className="flex items-center gap-1.5">
          <span className={`text-[8px] w-3 font-bold ${i === 0 ? 'text-amber-400' : 'text-slate-600'}`}>{i + 1}</span>
          <span className="text-[9px] text-slate-300 w-16 truncate">{name}</span>
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${i === 0 ? 'bg-amber-500/60' : 'bg-slate-600/60'}`}
              style={{ width: `${(damage / maxDmg) * 100}%` }}
            />
          </div>
          <span className="text-[8px] text-red-400 font-mono w-8 text-right">{damage}</span>
        </div>
      ))}
    </div>
  );
}
