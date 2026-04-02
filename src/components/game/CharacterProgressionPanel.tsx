// CharacterProgressionPanel — shows lifetime progression stats for a character.
// Displayed on character sheet, shows cross-campaign achievements and stats.
import { useMemo } from 'react';
import { getCharacterLifetime, getProgressionBadge, formatProgressionSummary, type CharacterLifetime } from '../../lib/characterProgression';

interface Props {
  characterId: string;
  characterName: string;
}

export default function CharacterProgressionPanel({ characterId, characterName }: Props) {
  const lifetime = useMemo(() => getCharacterLifetime(characterId), [characterId]);
  const badge = useMemo(() => getProgressionBadge(lifetime), [lifetime]);

  if (lifetime.totalSessions === 0) {
    return (
      <div className="px-2 py-1.5 rounded bg-slate-800/30 border border-slate-700/20 text-[9px] text-slate-500">
        No cross-campaign progression yet. Complete a session to start tracking.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header with badge */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-300">{characterName}</span>
        {badge && (
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border border-slate-700/40 font-semibold ${badge.color}`}>
            {badge.label}
          </span>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Sessions', value: lifetime.totalSessions, color: 'text-sky-400' },
          { label: 'Campaigns', value: lifetime.campaignsPlayed.length, color: 'text-indigo-400' },
          { label: 'Kills', value: lifetime.totalKills, color: 'text-red-400' },
          { label: 'Total XP', value: lifetime.totalXP.toLocaleString(), color: 'text-amber-400' },
          { label: 'Net Gold', value: lifetime.totalGold.toLocaleString(), color: 'text-yellow-400' },
          { label: 'Badges', value: lifetime.achievements.length, color: 'text-purple-400' },
        ].map((s) => (
          <div key={s.label} className="px-1.5 py-1 rounded bg-slate-800/30 border border-slate-700/20 text-center">
            <div className={`text-[11px] font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[8px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      {lifetime.achievements.length > 0 && (
        <div className="space-y-1">
          <div className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Achievements</div>
          <div className="flex flex-wrap gap-1">
            {lifetime.achievements.map((a) => {
              const labels: Record<string, { label: string; emoji: string }> = {
                centurion: { label: 'Centurion', emoji: '⚔️' },
                veteran: { label: 'Veteran', emoji: '🏅' },
                legend: { label: 'Legend', emoji: '👑' },
                wanderer: { label: 'Wanderer', emoji: '🗺️' },
                wealthy: { label: 'Wealthy', emoji: '💰' },
                max_level: { label: 'Ascended', emoji: '✨' },
              };
              const info = labels[a] || { label: a, emoji: '🎖️' };
              return (
                <span key={a} className="text-[8px] px-1.5 py-0.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400">
                  {info.emoji} {info.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent snapshots */}
      {lifetime.snapshots.length > 0 && (
        <details className="text-[9px]">
          <summary className="text-slate-500 cursor-pointer hover:text-slate-400">
            Recent Sessions ({lifetime.snapshots.length})
          </summary>
          <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
            {lifetime.snapshots.slice(-5).reverse().map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-1 py-0.5 text-slate-500">
                <span className="text-slate-600">{new Date(s.timestamp).toLocaleDateString()}</span>
                <span className="text-amber-400">+{s.xpGained}xp</span>
                <span className="text-yellow-400">+{s.goldGained}gp</span>
                <span className="text-red-400">{s.killCount} kills</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
