// DiceStats — session roll statistics panel.
// Shows roll history, per-die averages, streaks, crit/fumble rates, and a "luck rating."
// Reads from the existing `rolls` array in GameContext (last 100 rolls).
import { useMemo } from 'react';
import { useGame } from '../../contexts/GameContext';
import type { DiceRoll, DieType } from '../../types/game';

const DIE_TYPES: DieType[] = ['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20'];
const DIE_COLORS: Record<DieType, string> = {
  d2: 'text-yellow-300',
  d4: 'text-emerald-400', d6: 'text-sky-400', d8: 'text-violet-400',
  d10: 'text-amber-400', d12: 'text-pink-400', d20: 'text-red-400',
};

interface DieStats {
  count: number;
  total: number;
  average: number;
  expected: number; // theoretical average
  min: number;
  max: number;
  crits: number;
  fumbles: number;
}

interface Streak {
  type: 'high' | 'low' | 'crit' | 'fumble';
  count: number;
  current: boolean; // is this the current streak?
}

function computeStats(rolls: DiceRoll[]) {
  // Per-die stats
  const byDie: Record<string, DieStats> = {};
  for (const die of DIE_TYPES) {
    const dieRolls = rolls.filter((r) => r.die === die);
    if (dieRolls.length === 0) continue;
    const total = dieRolls.reduce((s, r) => s + r.value, 0);
    const sides = dieRolls[0].sides;
    byDie[die] = {
      count: dieRolls.length,
      total,
      average: total / dieRolls.length,
      expected: (sides + 1) / 2,
      min: Math.min(...dieRolls.map((r) => r.value)),
      max: Math.max(...dieRolls.map((r) => r.value)),
      crits: dieRolls.filter((r) => r.isCritical).length,
      fumbles: dieRolls.filter((r) => r.isFumble).length,
    };
  }

  // Overall stats
  const totalRolls = rolls.length;
  const d20Rolls = rolls.filter((r) => r.die === 'd20');
  const totalCrits = rolls.filter((r) => r.isCritical).length;
  const totalFumbles = rolls.filter((r) => r.isFumble).length;

  // Per-player stats
  const byPlayer: Record<string, { name: string; count: number; crits: number; fumbles: number; d20Avg: number }> = {};
  for (const r of rolls) {
    if (!byPlayer[r.playerId]) {
      byPlayer[r.playerId] = { name: r.playerName, count: 0, crits: 0, fumbles: 0, d20Avg: 0 };
    }
    byPlayer[r.playerId].count++;
    if (r.isCritical) byPlayer[r.playerId].crits++;
    if (r.isFumble) byPlayer[r.playerId].fumbles++;
  }
  // Compute d20 averages per player
  for (const pid of Object.keys(byPlayer)) {
    const pd20 = d20Rolls.filter((r) => r.playerId === pid);
    if (pd20.length > 0) {
      byPlayer[pid].d20Avg = pd20.reduce((s, r) => s + r.value, 0) / pd20.length;
    }
  }

  // Streaks (on d20 only): consecutive high (>=15), low (<=5), crits, fumbles
  const streaks: Streak[] = [];
  if (d20Rolls.length > 0) {
    // Current high streak
    let highStreak = 0;
    for (const r of d20Rolls) {
      if (r.value >= 15) highStreak++;
      else break;
    }
    if (highStreak >= 2) streaks.push({ type: 'high', count: highStreak, current: true });

    // Current low streak
    let lowStreak = 0;
    for (const r of d20Rolls) {
      if (r.value <= 5) lowStreak++;
      else break;
    }
    if (lowStreak >= 2) streaks.push({ type: 'low', count: lowStreak, current: true });

    // Longest crit streak in history
    let maxCritStreak = 0, curCritStreak = 0;
    for (const r of [...d20Rolls].reverse()) {
      if (r.isCritical) { curCritStreak++; maxCritStreak = Math.max(maxCritStreak, curCritStreak); }
      else curCritStreak = 0;
    }
    if (maxCritStreak >= 2) streaks.push({ type: 'crit', count: maxCritStreak, current: false });

    // Longest fumble streak
    let maxFumbleStreak = 0, curFumbleStreak = 0;
    for (const r of [...d20Rolls].reverse()) {
      if (r.isFumble) { curFumbleStreak++; maxFumbleStreak = Math.max(maxFumbleStreak, curFumbleStreak); }
      else curFumbleStreak = 0;
    }
    if (maxFumbleStreak >= 2) streaks.push({ type: 'fumble', count: maxFumbleStreak, current: false });
  }

  // Luck rating: d20 average vs expected (10.5). Maps to -100 (cursed) to +100 (blessed).
  let luckRating = 0;
  let luckLabel = 'No data';
  let luckColor = 'text-slate-400';
  if (d20Rolls.length >= 3) {
    const d20Avg = d20Rolls.reduce((s, r) => s + r.value, 0) / d20Rolls.length;
    luckRating = Math.round(((d20Avg - 10.5) / 9.5) * 100); // -100 to +100
    luckRating = Math.max(-100, Math.min(100, luckRating));
    if (luckRating >= 40) { luckLabel = 'Blessed by the gods'; luckColor = 'text-amber-400'; }
    else if (luckRating >= 20) { luckLabel = 'Running hot'; luckColor = 'text-green-400'; }
    else if (luckRating >= -20) { luckLabel = 'Fair dice'; luckColor = 'text-slate-400'; }
    else if (luckRating >= -40) { luckLabel = 'Running cold'; luckColor = 'text-blue-400'; }
    else { luckLabel = 'Cursed dice'; luckColor = 'text-red-400'; }
  }

  return { byDie, totalRolls, totalCrits, totalFumbles, d20Rolls: d20Rolls.length, byPlayer, streaks, luckRating, luckLabel, luckColor };
}

export default function DiceStats() {
  const { rolls } = useGame();
  const stats = useMemo(() => computeStats(rolls), [rolls]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#F38020] uppercase tracking-wider">Dice Stats</span>
          <span className="text-[10px] text-slate-600">{stats.totalRolls} rolls this session</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {stats.totalRolls === 0 ? (
          <div className="text-center py-12 text-slate-600 text-xs">
            No dice rolled yet this session. Start rolling to see your stats!
          </div>
        ) : (
          <>
            {/* Luck Rating */}
            {stats.d20Rolls >= 3 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center space-y-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Luck Rating</div>
                <div className={`text-2xl font-black ${stats.luckColor}`}>
                  {stats.luckRating > 0 ? '+' : ''}{stats.luckRating}
                </div>
                <div className={`text-xs font-semibold ${stats.luckColor}`}>{stats.luckLabel}</div>
                {/* Luck bar */}
                <div className="flex items-center gap-1 mx-auto max-w-[200px]">
                  <span className="text-[8px] text-red-500">-100</span>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 bg-gradient-to-r from-red-900/30 to-slate-800/0" />
                      <div className="w-1/2 bg-gradient-to-r from-slate-800/0 to-green-900/30" />
                    </div>
                    <div
                      className={`absolute top-0 h-full w-1.5 rounded-full transition-all duration-500 ${
                        stats.luckRating >= 20 ? 'bg-green-400' : stats.luckRating <= -20 ? 'bg-red-400' : 'bg-slate-400'
                      }`}
                      style={{ left: `${Math.max(0, Math.min(100, (stats.luckRating + 100) / 2))}%`, transform: 'translateX(-50%)' }}
                    />
                  </div>
                  <span className="text-[8px] text-green-500">+100</span>
                </div>
              </div>
            )}

            {/* Overview cards */}
            <div className="grid grid-cols-4 gap-2">
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-semibold">Total</div>
                <div className="text-lg font-black text-slate-200">{stats.totalRolls}</div>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-semibold">d20s</div>
                <div className="text-lg font-black text-red-400">{stats.d20Rolls}</div>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
                <div className="text-[9px] text-amber-500 uppercase font-semibold">Crits</div>
                <div className="text-lg font-black text-amber-400">{stats.totalCrits}</div>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
                <div className="text-[9px] text-red-500 uppercase font-semibold">Fumbles</div>
                <div className="text-lg font-black text-red-400">{stats.totalFumbles}</div>
              </div>
            </div>

            {/* Per-die breakdown */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Per-Die Breakdown</div>
              {DIE_TYPES.filter((d) => stats.byDie[d]).map((die) => {
                const s = stats.byDie[die];
                const avgPct = (s.average / s.expected) * 100;
                const isAbove = s.average > s.expected;
                return (
                  <div key={die} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/30 px-3 py-2">
                    <span className={`text-sm font-black w-8 ${DIE_COLORS[die]}`}>{die}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{s.count} rolls</span>
                        <span className={isAbove ? 'text-green-400' : 'text-red-400'}>
                          avg {s.average.toFixed(1)} <span className="text-slate-600">(expected {s.expected.toFixed(1)})</span>
                        </span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full transition-all ${isAbove ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, avgPct)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right text-[9px] w-16 shrink-0">
                      <span className="text-slate-600">lo</span> <span className="text-slate-400">{s.min}</span>
                      {' '}
                      <span className="text-slate-600">hi</span> <span className="text-slate-400">{s.max}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Streaks */}
            {stats.streaks.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Streaks (d20)</div>
                <div className="flex flex-wrap gap-1.5">
                  {stats.streaks.map((s, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-semibold px-2 py-1 rounded-lg border ${
                        s.type === 'high' ? 'text-green-400 border-green-700/40 bg-green-900/10' :
                        s.type === 'low' ? 'text-red-400 border-red-700/40 bg-red-900/10' :
                        s.type === 'crit' ? 'text-amber-400 border-amber-700/40 bg-amber-900/10' :
                        'text-red-500 border-red-800/40 bg-red-950/10'
                      }`}
                    >
                      {s.type === 'high' ? `${s.count}x Hot Streak (15+)` :
                       s.type === 'low' ? `${s.count}x Cold Streak (5-)` :
                       s.type === 'crit' ? `${s.count}x Crit Streak!` :
                       `${s.count}x Fumble Streak`}
                      {s.current && ' (active)'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Per-player leaderboard */}
            {Object.keys(stats.byPlayer).length > 1 && (
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Player Leaderboard</div>
                {Object.entries(stats.byPlayer)
                  .sort(([, a], [, b]) => b.count - a.count)
                  .map(([pid, p]) => (
                    <div key={pid} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/30">
                      <span className="text-xs font-semibold text-slate-300 flex-1 truncate">{p.name}</span>
                      <span className="text-[9px] text-slate-500">{p.count} rolls</span>
                      {p.crits > 0 && <span className="text-[9px] text-amber-400 font-bold">{p.crits} crit{p.crits > 1 ? 's' : ''}</span>}
                      {p.fumbles > 0 && <span className="text-[9px] text-red-400 font-bold">{p.fumbles} fumble{p.fumbles > 1 ? 's' : ''}</span>}
                      {p.d20Avg > 0 && (
                        <span className={`text-[9px] font-mono ${p.d20Avg >= 10.5 ? 'text-green-400' : 'text-red-400'}`}>
                          d20: {p.d20Avg.toFixed(1)}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* Recent roll history (last 20) */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Recent Rolls</div>
              <div className="space-y-0.5 max-h-[200px] overflow-y-auto">
                {rolls.slice(0, 20).map((r) => (
                  <div key={r.id} className="flex items-center gap-2 px-2 py-1 rounded text-[10px]">
                    <span className={`font-bold w-7 ${DIE_COLORS[r.die]}`}>{r.die}</span>
                    <span className={`font-mono font-black w-5 text-right ${r.isCritical ? 'text-amber-400' : r.isFumble ? 'text-red-400' : 'text-slate-300'}`}>
                      {r.value}
                    </span>
                    <span className="text-slate-600 flex-1 truncate">
                      {r.unitName || r.playerName}
                    </span>
                    {r.isCritical && <span className="text-amber-400 font-bold text-[8px]">CRIT!</span>}
                    {r.isFumble && <span className="text-red-400 font-bold text-[8px]">FUMBLE</span>}
                    <span className="text-[8px] text-slate-700">
                      {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
