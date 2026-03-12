// NarrationPanel — the narration/story view containing character status bar, turn
// indicator, quest tracker, death saves, DM history scroll, combat log, and action input.
// Extracted from Game.tsx to reduce file size.
import { useState, useCallback } from 'react';
import { useGame, type Character, CONDITION_EFFECTS } from '../../contexts/GameContext';

type CombatEntryType = 'crit' | 'hit' | 'miss' | 'death' | 'spell' | 'condition' | 'heal' | 'other';

function classifyCombatEntry(entry: string): CombatEntryType {
  if (entry.includes('CRITICAL')) return 'crit';
  if (entry.includes('falls!') || entry.includes('is dead')) return 'death';
  if (entry.includes('casts ') || entry.includes('spell')) return 'spell';
  if (entry.includes('heals') || entry.includes('healing') || entry.includes('Hit Points') || entry.includes('regains')) return 'heal';
  const conditionWords = ['stunned', 'poisoned', 'frightened', 'burning', 'hexed', 'blessed', 'prone', 'dodging', 'raging', 'inspired', 'concentration'];
  if (conditionWords.some((w) => entry.toLowerCase().includes(w))) return 'condition';
  if (entry.includes('hits ') || entry.includes('damage') || entry.includes('strikes')) return 'hit';
  if (entry.includes('misses ') || entry.includes('resists')) return 'miss';
  return 'other';
}
import { fetchWithTimeout } from '../../lib/fetchUtils';
import type { Quest } from '../../types/game';

interface NarrationPanelProps {
  selectedCharacter: Character | null;
  canUseDMTools: boolean;
  dmHistory: string[];
  dmLoading: boolean;
  npcLoading: boolean;
  npcName: string;
  npcRole: string;
  npcMode: boolean;
  sceneName: string;
  allCharacters: Character[];
  setNpcName: (v: string) => void;
  setNpcRole: (v: string) => void;
  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
  showQuests: boolean;
  setShowQuests: (v: boolean) => void;
  newQuestTitle: string;
  setNewQuestTitle: (v: string) => void;
  combatLog: string[];
  showCombatLog: boolean;
  setShowCombatLog: (v: boolean) => void;
  actionInput: string;
  setActionInput: (v: string) => void;
  handleDeathSave: () => void;
  handlePlayerAction: () => void;
  broadcastGameEvent: (event: string, data: Record<string, unknown>) => void;
}

export default function NarrationPanel({
  selectedCharacter,
  canUseDMTools,
  dmHistory,
  dmLoading,
  npcLoading,
  npcName,
  npcRole,
  npcMode,
  sceneName,
  allCharacters,
  setNpcName,
  setNpcRole,
  quests,
  setQuests,
  showQuests,
  setShowQuests,
  newQuestTitle,
  setNewQuestTitle,
  combatLog,
  showCombatLog,
  setShowCombatLog,
  actionInput,
  setActionInput,
  handleDeathSave,
  handlePlayerAction,
  broadcastGameEvent,
}: NarrationPanelProps) {
  const { units, inCombat, combatRound } = useGame();

  // Combat log filter
  type LogFilter = 'all' | 'attacks' | 'spells' | 'conditions' | 'deaths';
  const [combatLogFilter, setCombatLogFilter] = useState<LogFilter>('all');

  // Session recap state
  const [recapText, setRecapText] = useState<string | null>(null);
  const [recapLoading, setRecapLoading] = useState(false);
  const [showRecap, setShowRecap] = useState(false);

  const handleRecap = useCallback(async () => {
    if (dmHistory.length === 0) return;
    setRecapLoading(true);
    setShowRecap(true);
    try {
      const res = await fetchWithTimeout('/api/dm/recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: dmHistory,
          characters: allCharacters.map((ch) => ({
            name: ch.name, race: ch.race, class: ch.class, level: ch.level,
          })),
          scene: sceneName,
        }),
      }, 35_000);
      const data = (await res.json()) as { recap?: string; error?: string };
      setRecapText(data.recap || data.error || 'The narrator falls silent...');
    } catch {
      setRecapText('*The echoes of past adventures fade into silence...*');
    } finally {
      setRecapLoading(false);
    }
  }, [dmHistory, allCharacters, sceneName]);

  return (
    <>
      {/* Character status bar — always visible during adventure */}
      {selectedCharacter && (
        <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-800 bg-slate-900/60">
          <img
            src={selectedCharacter.portrait || `/portraits/classes/${selectedCharacter.class.toLowerCase()}.webp`}
            alt={selectedCharacter.name}
            className="w-8 h-8 rounded-lg object-cover border border-slate-600 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `/portraits/races/${selectedCharacter.race.toLowerCase()}.webp`;
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white truncate">{selectedCharacter.name}</span>
              <span className="text-[10px] text-slate-500">
                Lv{selectedCharacter.level} {selectedCharacter.class}
              </span>
            </div>
            {/* HP bar */}
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden hp-bar-shimmer">
                <div className={`h-full rounded-full transition-all duration-500 ${selectedCharacter.hp / selectedCharacter.maxHp > 0.5 ? 'bg-green-500' : selectedCharacter.hp / selectedCharacter.maxHp > 0.25 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.max(0, (selectedCharacter.hp / selectedCharacter.maxHp) * 100)}%` }} />
              </div>
              <span className={`text-[10px] font-mono font-bold tabular-nums ${selectedCharacter.hp / selectedCharacter.maxHp > 0.5 ? 'text-green-400' : selectedCharacter.hp / selectedCharacter.maxHp > 0.25 ? 'text-yellow-400' : 'text-red-400'}`}>
                {selectedCharacter.hp}/{selectedCharacter.maxHp}
              </span>
            </div>
          </div>
          {/* XP + Gold compact */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-purple-400 font-mono">{selectedCharacter.xp} XP</span>
            <span className="text-[10px] text-yellow-400 font-mono">{selectedCharacter.gold || 0}g</span>
          </div>
          {selectedCharacter.condition !== 'normal' && <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${selectedCharacter.condition === 'dead' ? 'bg-red-900/40 text-red-400' : selectedCharacter.condition === 'unconscious' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>{selectedCharacter.condition}</span>}
        </div>
      )}

      {/* Turn indicator — shown during combat */}
      {inCombat &&
        (() => {
          const currentUnit = units.find((u) => u.isCurrentTurn);
          if (!currentUnit) return null;
          const isPlayer = currentUnit.type === 'player';
          return (
            <div className={`flex items-center justify-between px-4 py-2 border-b ${isPlayer ? 'border-green-800/30 bg-green-950/20' : 'border-red-800/30 bg-red-950/20'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isPlayer ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`text-xs font-bold ${isPlayer ? 'text-green-400' : 'text-red-400'}`}>{currentUnit.name}&apos;s Turn</span>
                {currentUnit.conditions && currentUnit.conditions.length > 0 && (
                  <div className="flex gap-1">
                    {currentUnit.conditions.map((c, i) => (
                      <span key={i} className={`text-[8px] px-1 py-0.5 rounded ${CONDITION_EFFECTS[c.type]?.color || 'text-slate-400'} bg-slate-800/60`}>
                        {c.type} ({c.duration})
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-600">Round {combatRound}</span>
            </div>
          );
        })()}

      {/* Quest tracker — collapsible panel */}
      <div className="border-b border-slate-800">
        <button onClick={() => setShowQuests(!showQuests)} className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 transition-transform ${showQuests ? 'rotate-90' : ''}`}>
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
          Quests
          {quests.filter((q) => !q.completed).length > 0 && <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold bg-amber-900/50 text-amber-400 rounded-full">{quests.filter((q) => !q.completed).length}</span>}
        </button>
        {showQuests && (
          <div className="px-4 pb-3 space-y-2">
            {/* Add quest form */}
            <div className="flex gap-1.5">
              <input
                type="text"
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
                placeholder="New quest..."
                className="flex-1 px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 outline-none focus:ring-1 focus:ring-amber-500/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newQuestTitle.trim()) {
                    const q: Quest = { id: crypto.randomUUID(), title: newQuestTitle.trim(), description: '', completed: false };
                    setQuests((prev) => {
                      const next = [...prev, q];
                      broadcastGameEvent('quest_sync', { quests: next });
                      return next;
                    });
                    setNewQuestTitle('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (newQuestTitle.trim()) {
                    const q: Quest = { id: crypto.randomUUID(), title: newQuestTitle.trim(), description: '', completed: false };
                    setQuests((prev) => {
                      const next = [...prev, q];
                      broadcastGameEvent('quest_sync', { quests: next });
                      return next;
                    });
                    setNewQuestTitle('');
                  }
                }}
                disabled={!newQuestTitle.trim()}
                className="px-2 py-1 text-[10px] font-bold bg-amber-900/40 hover:bg-amber-900/60 border border-amber-800/50 text-amber-400 rounded-lg disabled:opacity-30 transition-all"
              >
                Add
              </button>
            </div>
            {/* Quest list */}
            {quests.length === 0 ? (
              <p className="text-[10px] text-slate-600 italic">No quests yet. Add one above or let the DM narrate objectives.</p>
            ) : (
              <div className="space-y-1">
                {quests
                  .filter((q) => !q.completed)
                  .map((quest) => (
                    <div key={quest.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 group">
                      <button
                        onClick={() =>
                          setQuests((prev) => {
                            const next = prev.map((q) => (q.id === quest.id ? { ...q, completed: true } : q));
                            broadcastGameEvent('quest_sync', { quests: next });
                            return next;
                          })
                        }
                        className="w-3.5 h-3.5 rounded border border-slate-600 hover:border-green-500 hover:bg-green-900/30 transition-colors shrink-0"
                        title="Mark complete"
                      />
                      <span className="flex-1 text-xs text-slate-300 truncate">{quest.title}</span>
                      <button
                        onClick={() =>
                          setQuests((prev) => {
                            const next = prev.filter((q) => q.id !== quest.id);
                            broadcastGameEvent('quest_sync', { quests: next });
                            return next;
                          })
                        }
                        className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        title="Remove quest"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                          <path d="M5.28 4.22a.75.75 0 00-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                {quests.filter((q) => q.completed).length > 0 && (
                  <div className="pt-1 border-t border-slate-800 mt-1">
                    <div className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Completed</div>
                    {quests
                      .filter((q) => q.completed)
                      .map((quest) => (
                        <div key={quest.id} className="flex items-center gap-2 px-2 py-1 rounded-lg group">
                          <div className="w-3.5 h-3.5 rounded border border-green-700 bg-green-900/30 flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5 text-green-500">
                              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="flex-1 text-xs text-slate-600 line-through truncate">{quest.title}</span>
                          <button
                            onClick={() =>
                              setQuests((prev) => {
                                const next = prev.filter((q) => q.id !== quest.id);
                                broadcastGameEvent('quest_sync', { quests: next });
                                return next;
                              })
                            }
                            className="text-slate-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            title="Remove"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                              <path d="M5.28 4.22a.75.75 0 00-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Death saving throw panel — shown when character is unconscious in combat */}
      {selectedCharacter && inCombat && selectedCharacter.condition === 'unconscious' && (
        <div className="p-4 border-b border-red-800/30 bg-red-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-red-400 font-bold text-sm">Death Saving Throws</div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400">Saves:</span>
                {[0, 1, 2].map((i) => (
                  <div key={`ds-s${i}`} className={`w-3 h-3 rounded-full border transition-all ${i < (selectedCharacter.deathSaves?.successes || 0) ? 'bg-green-500 border-green-400 shadow-green-500/50 shadow-sm' : 'border-slate-600'}`} />
                ))}
                <span className="text-[10px] text-slate-400 ml-2">Fails:</span>
                {[0, 1, 2].map((i) => (
                  <div key={`ds-f${i}`} className={`w-3 h-3 rounded-full border transition-all ${i < (selectedCharacter.deathSaves?.failures || 0) ? 'bg-red-500 border-red-400 shadow-red-500/50 shadow-sm' : 'border-slate-600'}`} />
                ))}
              </div>
            </div>
            <button onClick={handleDeathSave} className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-red-900/30">
              Roll Death Save
            </button>
          </div>
        </div>
      )}

      {/* Stabilized notice */}
      {selectedCharacter && selectedCharacter.condition === 'stabilized' && (
        <div className="p-3 border-b border-yellow-800/30 bg-yellow-950/20 flex items-center justify-between">
          <span className="text-yellow-400 text-xs font-semibold">{selectedCharacter.name} is stabilized but unconscious. Needs healing to regain consciousness.</span>
        </div>
      )}

      {/* Dead notice */}
      {selectedCharacter && selectedCharacter.condition === 'dead' && (
        <div className="p-3 border-b border-red-800/30 bg-red-950/30 flex items-center justify-between">
          <span className="text-red-400 text-xs font-bold">{selectedCharacter.name} has fallen. Their adventure ends here.</span>
        </div>
      )}

      {/* NPC setup panel — shown when NPC mode is active */}
      {npcMode && (
        <div className="p-3 border-b border-purple-800/30 bg-purple-950/20 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">Talking to:</span>
          <input type="text" value={npcName} onChange={(e) => setNpcName(e.target.value)} placeholder="NPC name..." className="text-xs px-2 py-1.5 bg-slate-800 border border-purple-700/50 rounded-lg text-purple-200 placeholder-slate-600 outline-none w-32 focus:ring-1 focus:ring-purple-500/50" />
          <input type="text" value={npcRole} onChange={(e) => setNpcRole(e.target.value)} placeholder="Role (e.g., tavern keeper, guard captain)..." className="text-xs px-2 py-1.5 bg-slate-800 border border-purple-700/50 rounded-lg text-purple-200 placeholder-slate-600 outline-none flex-1 min-w-40 focus:ring-1 focus:ring-purple-500/50" />
        </div>
      )}

      {/* Session Recap — "Previously on..." */}
      {dmHistory.length >= 3 && (
        <div className="border-b border-slate-800">
          {!showRecap ? (
            <button
              onClick={handleRecap}
              disabled={recapLoading}
              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-400/70 hover:text-indigo-300 transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 group-hover:scale-110 transition-transform">
                <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7.047 7.047 0 002.91 3.45 7.047 7.047 0 002.91-3.45.75.75 0 011.36.49 8.547 8.547 0 01-4.3 5.85 5.522 5.522 0 012.965 4.136.75.75 0 01-1.49.18A4.022 4.022 0 009.97 10.2a4.022 4.022 0 00-2.1 3.23.75.75 0 01-1.49-.18 5.522 5.522 0 012.965-4.137 8.547 8.547 0 01-4.3-5.849.75.75 0 011.36-.49 7.047 7.047 0 002.91 3.45 7.047 7.047 0 002.91-3.45.75.75 0 01.23-.77z" clipRule="evenodd" />
              </svg>
              Previously on this adventure...
            </button>
          ) : (
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Previously...</span>
                <button onClick={() => setShowRecap(false)} className="text-slate-600 hover:text-slate-400 transition-colors text-xs">&times;</button>
              </div>
              {recapLoading ? (
                <div className="flex items-center gap-2 text-indigo-500/60 animate-pulse">
                  <div className="w-4 h-4 border-2 border-indigo-500/60 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm italic">The narrator gathers their thoughts...</span>
                </div>
              ) : recapText ? (
                <p className="text-sm text-indigo-200/80 italic leading-relaxed">{recapText}</p>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* Narration display — shows recent DM messages prominently */}
      <div className="flex-1 p-6 overflow-auto space-y-4">
        {dmHistory.length === 0 && (
          <div className="text-center text-slate-600 py-12">
            <p className="text-sm">The adventure unfolds here...</p>
          </div>
        )}

        {dmHistory.map((text, i) => {
          // NPC dialogue lines (format: "NpcName: "dialogue"")
          const npcMatch = text.match(/^(.+?):\s*"(.+)"$/);
          if (npcMatch) {
            return (
              <div key={i} className="rounded-xl px-5 py-4 border border-purple-600/20 bg-gradient-to-br from-purple-950/30 to-slate-900/40">
                <div className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">{npcMatch[1]}</div>
                <p className="text-purple-100/90 leading-relaxed">&ldquo;{npcMatch[2]}&rdquo;</p>
              </div>
            );
          }
          // Combat log entries (attacks, initiative) use a different style
          const isCombatEntry = text.includes('hits ') || text.includes('misses ') || text.includes('CRITICAL') || text.includes('falls!') || text.includes('Initiative');
          return (
            <div key={i} className={`rounded-xl px-5 py-4 border ${isCombatEntry ? 'border-slate-700/50 bg-slate-800/40' : 'border-amber-600/20 bg-gradient-to-br from-amber-950/30 to-stone-900/40'}`}>
              <p className={`leading-relaxed ${isCombatEntry ? 'text-slate-300 text-sm font-mono' : 'text-amber-100/90 italic'}`}>{text}</p>
            </div>
          );
        })}

        {(dmLoading || npcLoading) && (
          <div className={`rounded-xl px-5 py-4 border animate-pulse ${npcLoading ? 'border-purple-600/20 bg-gradient-to-br from-purple-950/30 to-slate-900/40' : 'border-amber-600/20 bg-gradient-to-br from-amber-950/30 to-stone-900/40'}`}>
            <div className={`flex items-center gap-2 ${npcLoading ? 'text-purple-500/60' : 'text-amber-500/60'}`}>
              <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${npcLoading ? 'border-purple-500/60' : 'border-amber-500/60'}`} />
              <span className="text-sm italic">{npcLoading ? `${npcName || 'The NPC'} considers their words...` : 'The Dungeon Master weaves the tale...'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Combat log — togglable during combat, with filter tabs */}
      {inCombat && combatLog.length > 0 && (
        <div className="border-t border-slate-800">
          <button onClick={() => setShowCombatLog(!showCombatLog)} className="w-full flex items-center gap-2 px-4 py-1.5 text-[10px] font-semibold text-slate-500 hover:text-slate-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 transition-transform ${showCombatLog ? 'rotate-90' : ''}`}>
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            Combat Log
            <span className="px-1 py-0.5 text-[8px] bg-slate-800 rounded text-slate-600">{combatLog.length}</span>
          </button>
          {showCombatLog && (
            <>
              {/* Filter tabs */}
              <div className="flex items-center gap-1 px-4 pb-1">
                {(['all', 'attacks', 'spells', 'conditions', 'deaths'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setCombatLogFilter(f)}
                    className={`text-[8px] px-1.5 py-0.5 rounded font-semibold uppercase transition-colors ${
                      combatLogFilter === f ? 'bg-amber-600/20 text-amber-400' : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="max-h-48 overflow-y-auto px-4 pb-2 space-y-0.5">
                {combatLog.map((entry, i) => {
                  const cat = classifyCombatEntry(entry);
                  // Filter
                  if (combatLogFilter !== 'all') {
                    if (combatLogFilter === 'attacks' && cat !== 'hit' && cat !== 'miss' && cat !== 'crit') return null;
                    if (combatLogFilter === 'spells' && cat !== 'spell') return null;
                    if (combatLogFilter === 'conditions' && cat !== 'condition') return null;
                    if (combatLogFilter === 'deaths' && cat !== 'death') return null;
                  }
                  // Round separator — detect "Round X" or turn starts
                  const isRoundStart = entry.includes('Initiative rolled') || entry.includes('Round ');
                  return (
                    <div key={i}>
                      {isRoundStart && i > 0 && <div className="border-t border-slate-800/50 my-1" />}
                      <div className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all ${
                        cat === 'crit' ? 'text-amber-300 bg-amber-950/30 font-bold crit-flash' :
                        cat === 'death' ? 'text-red-400 bg-red-950/30' :
                        cat === 'hit' ? 'text-orange-300 bg-orange-950/20' :
                        cat === 'miss' ? 'text-slate-500' :
                        cat === 'spell' ? 'text-blue-300 bg-blue-950/20' :
                        cat === 'condition' ? 'text-purple-300 bg-purple-950/20' :
                        cat === 'heal' ? 'text-green-300 bg-green-950/20' :
                        'text-slate-400'
                      }`}>
                        {entry}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Player action input — DM can narrate/speak, players see read-only hint */}
      {canUseDMTools ? (
        <div className="p-4 border-t border-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value)}
              placeholder={npcMode ? `Say something to ${npcName || 'the NPC'}...` : "What do you do? (e.g., 'I search the room for traps')"}
              className={`flex-1 px-4 py-3 bg-slate-800 border rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all ${npcMode ? 'border-purple-700/50 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-600' : 'border-slate-700 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600'}`}
              onKeyDown={(e) => e.key === 'Enter' && handlePlayerAction()}
              disabled={dmLoading || npcLoading}
            />
            <button onClick={handlePlayerAction} disabled={!actionInput.trim() || dmLoading || npcLoading} className={`px-5 py-3 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors ${npcMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-amber-600 hover:bg-amber-500'}`}>
              {npcMode ? 'Speak' : 'Act'}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-3 border-t border-slate-800">
          <p className="text-[10px] text-slate-600 italic text-center">The DM controls narration. Use chat to describe your actions.</p>
        </div>
      )}
    </>
  );
}
