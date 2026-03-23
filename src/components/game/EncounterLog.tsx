// EncounterLog — post-combat encounter statistics and history.
// Parses combat log strings to extract structured stats: damage dealt, kills, spells cast, rounds.
// Persisted per campaign in localStorage. Shows previous encounters as expandable cards.
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

export interface EncounterStats {
  id: string;
  timestamp: number;
  rounds: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  kills: string[];
  spellsCast: string[];
  criticalHits: number;
  fumbles: number;
  playersKnockedDown: number;
  combatLog: string[];
  difficulty?: string;
}

interface EncounterLogProps {
  roomId: string;
  currentCombatLog: string[];
  inCombat: boolean;
  combatRound: number;
}

const STORAGE_KEY = (room: string) => `adventure:encounters:${room}`;

function loadEncounters(room: string): EncounterStats[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(room));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveEncounters(room: string, encounters: EncounterStats[]) {
  try { localStorage.setItem(STORAGE_KEY(room), JSON.stringify(encounters)); } catch { /* ok */ }
}

// Parse combat log strings into structured stats
function analyzeCombatLog(log: string[], rounds: number): Omit<EncounterStats, 'id' | 'timestamp' | 'combatLog' | 'rounds'> {
  let totalDamageDealt = 0;
  let totalDamageTaken = 0;
  const kills: string[] = [];
  const spellsCast: string[] = [];
  let criticalHits = 0;
  let fumbles = 0;
  let playersKnockedDown = 0;

  for (const entry of log) {
    const lower = entry.toLowerCase();

    // Damage dealt (player → enemy)
    const dmgMatch = entry.match(/for (\d+) (?:damage|fire|cold|force|radiant|necrotic|lightning|thunder|psychic|poison)/i);
    if (dmgMatch) {
      const dmg = parseInt(dmgMatch[1]);
      // Heuristic: if the entry mentions an enemy name (typically has "hits" or "strikes" from a player context)
      if (lower.includes('hits') || lower.includes('strikes') || lower.includes('deals') || lower.includes('cast')) {
        totalDamageDealt += dmg;
      }
    }

    // Damage taken (enemy → player)
    const takenMatch = entry.match(/takes? (\d+) damage/i);
    if (takenMatch && (lower.includes('takes') || lower.includes('suffers'))) {
      totalDamageTaken += parseInt(takenMatch[1]);
    }

    // Kills
    const killMatch = entry.match(/(.+?) (?:is slain|has been defeated|falls|is destroyed|drops to 0|killed)/i);
    if (killMatch) kills.push(killMatch[1].trim());

    // Spells
    const spellMatch = entry.match(/casts? (.+?)(?:\.|!| on| at| —)/i);
    if (spellMatch) spellsCast.push(spellMatch[1].trim());

    // Crits and fumbles
    if (lower.includes('critical hit') || lower.includes('critical!') || lower.includes('crit!')) criticalHits++;
    if (lower.includes('fumble') || lower.includes('critical fail') || lower.includes('critical miss')) fumbles++;

    // Players knocked down
    if (lower.includes('falls unconscious') || lower.includes('knocked unconscious') || lower.includes('drops to 0 hp')) {
      playersKnockedDown++;
    }
  }

  // Difficulty heuristic from log
  let difficulty: string | undefined;
  const diffMatch = log[0]?.match(/\b(easy|medium|hard|deadly)\b/i);
  if (diffMatch) difficulty = diffMatch[1].toLowerCase();

  return { totalDamageDealt, totalDamageTaken, kills, spellsCast: [...new Set(spellsCast)], criticalHits, fumbles, playersKnockedDown, difficulty };
}

export default function EncounterLog({ roomId, currentCombatLog, inCombat, combatRound }: EncounterLogProps) {
  const [encounters, setEncounters] = useState<EncounterStats[]>(() => loadEncounters(roomId));
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<string | null>(null);
  const prevInCombat = usePrevious(inCombat);

  // When combat ends, save the encounter
  useEffect(() => {
    if (prevInCombat && !inCombat && currentCombatLog.length > 0) {
      const stats = analyzeCombatLog(currentCombatLog, combatRound);
      const encounter: EncounterStats = {
        id: crypto.randomUUID().slice(0, 8),
        timestamp: Date.now(),
        rounds: combatRound,
        combatLog: [...currentCombatLog],
        ...stats,
      };
      setEncounters((prev) => {
        const next = [encounter, ...prev].slice(0, 20); // keep last 20
        saveEncounters(roomId, next);
        return next;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inCombat]);

  // Live stats for current combat
  const liveStats = useMemo(() => {
    if (!inCombat || currentCombatLog.length === 0) return null;
    return analyzeCombatLog(currentCombatLog, combatRound);
  }, [inCombat, currentCombatLog, combatRound]);

  const clearHistory = useCallback(() => {
    setEncounters([]);
    saveEncounters(roomId, []);
  }, [roomId]);

  // Filter encounters by search text and difficulty
  const filteredEncounters = useMemo(() => {
    return encounters.filter((enc) => {
      if (diffFilter && enc.difficulty !== diffFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return enc.kills.some((k) => k.toLowerCase().includes(s))
          || enc.spellsCast.some((sp) => sp.toLowerCase().includes(s))
          || enc.combatLog.some((l) => l.toLowerCase().includes(s));
      }
      return true;
    });
  }, [encounters, search, diffFilter]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Encounter Log</h3>
          <span className="text-[9px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded-full">{encounters.length}</span>
        </div>
        {encounters.length > 0 && (
          <button onClick={clearHistory} className="text-[9px] text-slate-600 hover:text-red-400 transition-colors">Clear</button>
        )}
      </div>

      {/* Search + difficulty filter */}
      {encounters.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-slate-800/50 shrink-0">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search encounters..."
            className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 placeholder:text-slate-600 focus:border-amber-600 focus:outline-none"
          />
          <div className="flex gap-0.5">
            {['easy', 'medium', 'hard', 'deadly'].map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(diffFilter === d ? null : d)}
                className={`text-[8px] px-1.5 py-0.5 rounded border capitalize transition-all ${
                  diffFilter === d
                    ? (d === 'deadly' ? 'border-red-600/50 bg-red-900/30 text-red-400' : d === 'hard' ? 'border-orange-600/50 bg-orange-900/30 text-orange-400' : d === 'medium' ? 'border-yellow-600/50 bg-yellow-900/30 text-yellow-400' : 'border-green-600/50 bg-green-900/30 text-green-400')
                    : 'border-slate-700/50 text-slate-600 hover:text-slate-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-2 space-y-2">
        {/* Live combat stats */}
        {liveStats && (
          <div className="rounded-lg border border-red-700/40 bg-red-950/20 px-3 py-2 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-400">Active Combat — Round {combatRound}</span>
            </div>
            <StatsGrid stats={liveStats} />
          </div>
        )}

        {/* No encounters yet */}
        {encounters.length === 0 && !liveStats && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <span className="text-2xl mb-2">⚔️</span>
            <p className="text-xs text-slate-500">No encounters recorded yet.</p>
            <p className="text-[10px] text-slate-600 mt-1">Stats are saved automatically when combat ends.</p>
          </div>
        )}

        {/* Past encounters */}
        {filteredEncounters.map((enc) => {
          const isExpanded = expandedId === enc.id;
          const timeAgo = formatTimeAgo(enc.timestamp);
          return (
            <div key={enc.id} className="rounded-lg border border-slate-800 bg-slate-800/30 overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : enc.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">
                    {enc.kills.length > 0 ? `${enc.kills.length} kill${enc.kills.length !== 1 ? 's' : ''}` : 'Encounter'}
                  </span>
                  {enc.difficulty && (
                    <span className={`text-[8px] px-1 py-0.5 rounded capitalize ${
                      enc.difficulty === 'deadly' ? 'bg-red-900/30 text-red-400' :
                      enc.difficulty === 'hard' ? 'bg-orange-900/30 text-orange-400' :
                      enc.difficulty === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {enc.difficulty}
                    </span>
                  )}
                  <span className="text-[9px] text-slate-600">{enc.rounds} round{enc.rounds !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-600">{timeAgo}</span>
                  <span className="text-[10px] text-slate-500">{isExpanded ? '▾' : '▸'}</span>
                </div>
              </button>
              {isExpanded && (
                <div className="px-3 py-2 border-t border-slate-800/50 space-y-2">
                  <StatsGrid stats={enc} />
                  {enc.kills.length > 0 && (
                    <div>
                      <span className="text-[9px] text-slate-600 uppercase">Defeated:</span>
                      <span className="text-[10px] text-slate-400 ml-1">{enc.kills.join(', ')}</span>
                    </div>
                  )}
                  {enc.spellsCast.length > 0 && (
                    <div>
                      <span className="text-[9px] text-slate-600 uppercase">Spells:</span>
                      <span className="text-[10px] text-purple-400 ml-1">{enc.spellsCast.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatsGrid({ stats }: { stats: Pick<EncounterStats, 'totalDamageDealt' | 'totalDamageTaken' | 'criticalHits' | 'fumbles' | 'playersKnockedDown' | 'spellsCast'> }) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <StatPill label="Dmg Dealt" value={stats.totalDamageDealt} color="text-red-400" />
      <StatPill label="Dmg Taken" value={stats.totalDamageTaken} color="text-orange-400" />
      <StatPill label="Crits" value={stats.criticalHits} color="text-amber-400" />
      <StatPill label="Fumbles" value={stats.fumbles} color="text-slate-400" />
      <StatPill label="KOs" value={stats.playersKnockedDown} color="text-red-500" />
      <StatPill label="Spells" value={stats.spellsCast.length} color="text-purple-400" />
    </div>
  );
}

function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center py-1 rounded bg-slate-800/40">
      <span className={`text-xs font-bold font-mono ${color}`}>{value}</span>
      <span className="text-[8px] text-slate-600 uppercase">{label}</span>
    </div>
  );
}

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => { ref.current = value; });
  return ref.current;
}
