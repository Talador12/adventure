// Achievements — persistent milestone tracking with visual badge display.
// Monitors game events (combat log, dice rolls, character state) and awards badges.
// Persisted per campaign in localStorage. Shows unlocked/locked badges.
import { useState, useEffect, useMemo, useRef } from 'react';

interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'combat' | 'exploration' | 'social' | 'legendary';
  // Check function receives accumulated stats and returns true if earned
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
  totalKills: number;
  totalDamageDealt: number;
  totalHealingDone: number;
  criticalHits: number;
  fumbles: number;
  spellsCast: number;
  deathSaves: number;        // successful death save sequences
  encountersWon: number;
  longestCombat: number;     // rounds
  highestSingleDamage: number;
  bossesKilled: number;      // CR 5+ enemies
  goldEarned: number;
  itemsLooted: number;
  levelsGained: number;
  restsTaken: number;
  chatMessagesSent: number;
}

const DEFAULT_STATS: AchievementStats = {
  totalKills: 0, totalDamageDealt: 0, totalHealingDone: 0,
  criticalHits: 0, fumbles: 0, spellsCast: 0, deathSaves: 0,
  encountersWon: 0, longestCombat: 0, highestSingleDamage: 0,
  bossesKilled: 0, goldEarned: 0, itemsLooted: 0, levelsGained: 0,
  restsTaken: 0, chatMessagesSent: 0,
};

// Achievement definitions — fun milestones with D&D flavor
const ACHIEVEMENTS: AchievementDef[] = [
  // Combat
  { id: 'first-blood', name: 'First Blood', description: 'Defeat your first enemy.', icon: '🗡️', category: 'combat', check: (s) => s.totalKills >= 1 },
  { id: 'veteran', name: 'Battle-Hardened', description: 'Defeat 25 enemies.', icon: '⚔️', category: 'combat', check: (s) => s.totalKills >= 25 },
  { id: 'centurion', name: 'Centurion', description: 'Defeat 100 enemies.', icon: '🏛️', category: 'combat', check: (s) => s.totalKills >= 100 },
  { id: 'crit-master', name: 'Critical Master', description: 'Land 10 critical hits.', icon: '🎯', category: 'combat', check: (s) => s.criticalHits >= 10 },
  { id: 'one-shot', name: 'One-Shot Wonder', description: 'Deal 50+ damage in a single hit.', icon: '💥', category: 'combat', check: (s) => s.highestSingleDamage >= 50 },
  { id: 'dragon-slayer', name: 'Dragon Slayer', description: 'Defeat a boss (CR 5+).', icon: '🐉', category: 'combat', check: (s) => s.bossesKilled >= 1 },
  { id: 'fumble-king', name: 'Fumble Royalty', description: 'Roll 10 critical fumbles. The dice gods are... creative.', icon: '🎪', category: 'combat', check: (s) => s.fumbles >= 10 },
  { id: 'iron-will', name: 'Iron Will', description: 'Succeed on death saving throws 3 times.', icon: '💪', category: 'combat', check: (s) => s.deathSaves >= 3 },
  // Exploration
  { id: 'survivor', name: 'Survivor', description: 'Win 10 combat encounters.', icon: '🛡️', category: 'exploration', check: (s) => s.encountersWon >= 10 },
  { id: 'well-rested', name: 'Well Rested', description: 'Take 10 rests.', icon: '🏕️', category: 'exploration', check: (s) => s.restsTaken >= 10 },
  { id: 'level-5', name: 'Hero Ascendant', description: 'Reach level 5.', icon: '⭐', category: 'exploration', check: (s) => s.levelsGained >= 4 },
  { id: 'treasure-hunter', name: 'Treasure Hunter', description: 'Loot 20 items from combat.', icon: '💰', category: 'exploration', check: (s) => s.itemsLooted >= 20 },
  // Social
  { id: 'chatterbox', name: 'Chatterbox', description: 'Send 50 chat messages.', icon: '💬', category: 'social', check: (s) => s.chatMessagesSent >= 50 },
  { id: 'healer', name: 'Guardian Angel', description: 'Heal 200 total HP.', icon: '❤️‍🩹', category: 'social', check: (s) => s.totalHealingDone >= 200 },
  // Legendary
  { id: 'endurance', name: 'Endurance Champion', description: 'Survive a 10+ round combat.', icon: '🏆', category: 'legendary', check: (s) => s.longestCombat >= 10 },
  { id: 'mage', name: 'Archmage', description: 'Cast 50 spells.', icon: '🔮', category: 'legendary', check: (s) => s.spellsCast >= 50 },
];

const STORAGE_KEY = (room: string) => `adventure:achievements:${room}`;
const STATS_KEY = (room: string) => `adventure:achstats:${room}`;

function loadState(room: string): { unlocked: string[]; stats: AchievementStats } {
  try {
    const unlocked = JSON.parse(localStorage.getItem(STORAGE_KEY(room)) || '[]');
    const stats = { ...DEFAULT_STATS, ...JSON.parse(localStorage.getItem(STATS_KEY(room)) || '{}') };
    return { unlocked, stats };
  } catch { return { unlocked: [], stats: { ...DEFAULT_STATS } }; }
}

function saveState(room: string, unlocked: string[], stats: AchievementStats) {
  try {
    localStorage.setItem(STORAGE_KEY(room), JSON.stringify(unlocked));
    localStorage.setItem(STATS_KEY(room), JSON.stringify(stats));
  } catch { /* ok */ }
}

interface AchievementsProps {
  roomId: string;
  combatLog: string[];
  inCombat: boolean;
  combatRound: number;
  chatMessageCount: number;
  onUnlock?: (name: string) => void; // toast callback
}

const CATEGORY_COLORS: Record<string, { border: string; text: string; bg: string }> = {
  combat: { border: 'border-red-500/30', text: 'text-red-400', bg: 'bg-red-500/10' },
  exploration: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  social: { border: 'border-sky-500/30', text: 'text-sky-400', bg: 'bg-sky-500/10' },
  legendary: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10' },
};

export default function Achievements({ roomId, combatLog, inCombat, combatRound, chatMessageCount, onUnlock }: AchievementsProps) {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [stats, setStats] = useState<AchievementStats>({ ...DEFAULT_STATS });
  const [filter, setFilter] = useState<string>('all');
  const initRef = useRef(false);

  // Load on mount
  useEffect(() => {
    const state = loadState(roomId);
    setUnlocked(state.unlocked);
    setStats(state.stats);
    initRef.current = true;
  }, [roomId]);

  // Parse combat log to update stats
  const prevLogLenRef = useRef(0);
  useEffect(() => {
    if (!initRef.current || combatLog.length === prevLogLenRef.current) return;
    const newEntries = combatLog.slice(prevLogLenRef.current);
    prevLogLenRef.current = combatLog.length;

    let kills = 0, crits = 0, fumbles = 0, dmgDealt = 0, healing = 0, spells = 0, maxDmg = 0;

    for (const entry of newEntries) {
      // Kills
      if (/falls!|defeated|slain/i.test(entry)) kills++;
      // Crits
      if (/CRITICAL/i.test(entry)) crits++;
      // Fumbles
      if (/fumble|critical fail/i.test(entry)) fumbles++;
      // Damage
      const dmgMatch = entry.match(/for (\d+) damage/i);
      if (dmgMatch) {
        const dmg = parseInt(dmgMatch[1], 10);
        dmgDealt += dmg;
        if (dmg > maxDmg) maxDmg = dmg;
      }
      // Healing
      const healMatch = entry.match(/restoring? (\d+) HP/i);
      if (healMatch) healing += parseInt(healMatch[1], 10);
      // Spells
      if (/casts /i.test(entry)) spells++;
      // Death saves
      if (/stabilize|death save.*success/i.test(entry)) {} // tracked separately below
    }

    if (kills > 0 || crits > 0 || fumbles > 0 || dmgDealt > 0 || healing > 0 || spells > 0) {
      setStats((prev) => {
        const updated = { ...prev };
        updated.totalKills += kills;
        updated.criticalHits += crits;
        updated.fumbles += fumbles;
        updated.totalDamageDealt += dmgDealt;
        updated.totalHealingDone += healing;
        updated.spellsCast += spells;
        if (maxDmg > updated.highestSingleDamage) updated.highestSingleDamage = maxDmg;
        return updated;
      });
    }
  }, [combatLog]);

  // Track combat round for longest combat
  useEffect(() => {
    if (inCombat && combatRound > stats.longestCombat) {
      setStats((prev) => ({ ...prev, longestCombat: combatRound }));
    }
  }, [inCombat, combatRound]); // intentionally omit stats to avoid loop

  // Track chat messages
  useEffect(() => {
    if (chatMessageCount > stats.chatMessagesSent) {
      setStats((prev) => ({ ...prev, chatMessagesSent: chatMessageCount }));
    }
  }, [chatMessageCount]); // intentionally omit stats

  // Check encounters won (combat ended = we won if any player is alive — tracked by combat log)
  const prevInCombatRef = useRef(inCombat);
  useEffect(() => {
    if (prevInCombatRef.current && !inCombat) {
      // Combat just ended — count as won
      setStats((prev) => ({ ...prev, encountersWon: prev.encountersWon + 1 }));
    }
    prevInCombatRef.current = inCombat;
  }, [inCombat]);

  // Check for newly unlocked achievements
  useEffect(() => {
    if (!initRef.current) return;
    let newUnlocks: string[] = [];
    for (const ach of ACHIEVEMENTS) {
      if (!unlocked.includes(ach.id) && ach.check(stats)) {
        newUnlocks.push(ach.id);
      }
    }
    if (newUnlocks.length > 0) {
      setUnlocked((prev) => {
        const merged = [...prev, ...newUnlocks];
        saveState(roomId, merged, stats);
        return merged;
      });
      // Fire toast for each
      for (const id of newUnlocks) {
        const ach = ACHIEVEMENTS.find((a) => a.id === id);
        if (ach) onUnlock?.(`🏆 Achievement: ${ach.name}`);
      }
    } else {
      saveState(roomId, unlocked, stats);
    }
  }, [stats, unlocked, roomId, onUnlock]);

  const filteredAchievements = useMemo(() => {
    if (filter === 'all') return ACHIEVEMENTS;
    if (filter === 'unlocked') return ACHIEVEMENTS.filter((a) => unlocked.includes(a.id));
    return ACHIEVEMENTS.filter((a) => a.category === filter);
  }, [filter, unlocked]);

  const filters = [
    { label: 'All', value: 'all' },
    { label: `Unlocked (${unlocked.length})`, value: 'unlocked' },
    { label: '⚔️ Combat', value: 'combat' },
    { label: '🗺️ Explore', value: 'exploration' },
    { label: '💬 Social', value: 'social' },
    { label: '🏆 Legend', value: 'legendary' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/50">
        <h3 className="text-sm font-semibold text-slate-200">
          Achievements
          <span className="ml-1.5 text-xs text-slate-500">({unlocked.length}/{ACHIEVEMENTS.length})</span>
        </h3>
        {/* Progress bar */}
        <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }} />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 py-1.5 overflow-x-auto scrollbar-thin">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap transition-colors ${
              filter === f.value
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="grid grid-cols-2 gap-2">
          {filteredAchievements.map((ach) => {
            const isUnlocked = unlocked.includes(ach.id);
            const colors = CATEGORY_COLORS[ach.category] || CATEGORY_COLORS.combat;
            return (
              <div
                key={ach.id}
                className={`p-2.5 rounded-lg border transition-all ${
                  isUnlocked
                    ? `${colors.bg} ${colors.border} shadow-sm`
                    : 'bg-slate-800/30 border-slate-700/30 opacity-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{ach.icon}</span>
                  <span className={`text-xs font-semibold ${isUnlocked ? colors.text : 'text-slate-500'}`}>
                    {ach.name}
                  </span>
                </div>
                <p className={`text-[10px] ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                  {ach.description}
                </p>
                {isUnlocked && (
                  <div className="mt-1 text-[9px] text-amber-500/60 font-medium">UNLOCKED</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Export stats updater for external events (level-ups, rests, loot, boss kills, death saves)
export function updateAchievementStats(roomId: string, updates: Partial<AchievementStats>) {
  try {
    const raw = localStorage.getItem(`adventure:achstats:${roomId}`);
    const stats = { ...DEFAULT_STATS, ...(raw ? JSON.parse(raw) : {}) };
    for (const [key, val] of Object.entries(updates)) {
      if (typeof val === 'number') {
        (stats as Record<string, number>)[key] = (stats as Record<string, number>)[key] + val;
      }
    }
    localStorage.setItem(`adventure:achstats:${roomId}`, JSON.stringify(stats));
  } catch { /* ok */ }
}
