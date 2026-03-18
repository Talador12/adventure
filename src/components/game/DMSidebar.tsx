// DMSidebar — collapsible left panel with Encounter, NPC, and Notes tabs.
// Extracted from Game.tsx to reduce file size.
import { useState } from 'react';
import { useGame, calculateEncounterBudget, type Unit } from '../../contexts/GameContext';
import { randomFantasyName } from '../../lib/names';
import { setAmbientMood, AMBIENT_MOODS, type AmbientMood } from '../../hooks/useSoundFX';
import { BIOME_LABELS, rollBiomeEncounter, checkRandomEncounter, type Biome, type BiomeEncounter } from '../../data/enemies';
import { rollTreasureHoard, HOARD_TIER_LABELS, type TreasureHoardResult } from '../../data/rules';
import FormationPresets from './FormationPresets';
import DowntimeActivities from './DowntimeActivities';
import CustomMonsterCreator from './CustomMonsterCreator';
import type { TokenPosition } from '../../lib/mapUtils';
import type { MapPin } from '../../types/game';
import type { RollInterpolationMode } from '../../types/roll';

interface DMSidebarProps {
  onClose: () => void;
  encounterDifficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  setEncounterDifficulty: (d: 'easy' | 'medium' | 'hard' | 'deadly') => void;
  encounterLoading: boolean;
  onGenerateEncounter: () => void;
  sceneName: string;
  setSceneName: (s: string) => void;
  npcMode: boolean;
  setNpcMode: (v: boolean) => void;
  npcName: string;
  setNpcName: (v: string) => void;
  npcRole: string;
  setNpcRole: (v: string) => void;
  npcDialogueHistory: string[];
  setNpcDialogueHistory: React.Dispatch<React.SetStateAction<string[]>>;
  currentAmbient: AmbientMood;
  setCurrentAmbient: (m: AmbientMood) => void;
  dmNotes: string;
  setDmNotes: (v: string) => void;
  selectedCharacter: { level: number } | null;
  // Turn timer
  turnTimerEnabled: boolean;
  setTurnTimerEnabled: (v: boolean) => void;
  turnTimeSeconds: number;
  setTurnTimeSeconds: (v: number) => void;
  // Monster browser
  onOpenMonsterBrowser: () => void;
  // Weather
  weather: 'none' | 'rain' | 'fog' | 'snow' | 'sandstorm';
  setWeather: (w: 'none' | 'rain' | 'fog' | 'snow' | 'sandstorm') => void;
  // Formation
  roomId: string;
  onApplyFormation: (positions: TokenPosition[]) => void;
  // Map pins
  mapPins: MapPin[];
  onPinRemove: (pinId: string) => void;
  // Downtime
  selectedCharacterId: string | null;
  onAddDmMessage: (text: string) => void;
  // Custom monster spawn
  onSpawnMonster: (monster: import('../../data/monsters').Monster, count: number) => void;
  // Dynamic difficulty
  dynamicDifficultyEnabled: boolean;
  setDynamicDifficultyEnabled: (v: boolean) => void;
  // Roll sync policy
  rollInterpolationMode?: RollInterpolationMode;
  effectiveMode?: 'smooth' | 'strict';
  autoStrictRttMs?: number;
  autoStrictJitterMs?: number;
  onSetRollSyncMode?: (mode: RollInterpolationMode, rttMs?: number, jitterMs?: number) => void;
  // Latency
  playerLatency?: Record<string, number>;
  stalePlayers?: Set<string>;
}

export default function DMSidebar({
  onClose,
  encounterDifficulty,
  setEncounterDifficulty,
  encounterLoading,
  onGenerateEncounter,
  sceneName,
  setSceneName,
  npcMode,
  setNpcMode,
  npcName,
  setNpcName,
  npcRole,
  setNpcRole,
  npcDialogueHistory,
  setNpcDialogueHistory,
  currentAmbient,
  setCurrentAmbient,
  dmNotes,
  setDmNotes,
  selectedCharacter,
  turnTimerEnabled,
  setTurnTimerEnabled,
  turnTimeSeconds,
  setTurnTimeSeconds,
  onOpenMonsterBrowser,
  weather,
  setWeather,
  roomId,
  onApplyFormation,
  mapPins,
  onPinRemove,
  selectedCharacterId,
  onAddDmMessage,
  onSpawnMonster,
  dynamicDifficultyEnabled,
  setDynamicDifficultyEnabled,
  rollInterpolationMode,
  effectiveMode,
  autoStrictRttMs,
  autoStrictJitterMs,
  onSetRollSyncMode,
  playerLatency,
  stalePlayers,
}: DMSidebarProps) {
  const { units, characters, inCombat, updateCharacter, grantXP } = useGame();
  const [dmSidebarTab, setDmSidebarTab] = useState<'encounter' | 'npc' | 'notes'>('encounter');
  const [biome, setBiome] = useState<Biome>('forest');
  const [lastBiomeRoll, setLastBiomeRoll] = useState<{ encounter: BiomeEncounter; roll: number } | null>(null);
  const [hoardTier, setHoardTier] = useState(0);
  const [lastHoard, setLastHoard] = useState<TreasureHoardResult | null>(null);

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span className="text-xs font-semibold text-[#F38020] uppercase tracking-wider">DM Tools</span>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xs">&times;</button>
      </div>
      {/* Sidebar tabs */}
      <div className="flex border-b border-slate-800">
        {(['encounter', 'npc', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setDmSidebarTab(tab)}
            className={`flex-1 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              dmSidebarTab === tab ? 'text-[#F38020] border-b-2 border-[#F38020] bg-[#F38020]/5' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Encounter tab */}
        {dmSidebarTab === 'encounter' && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Difficulty</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['easy', 'medium', 'hard', 'deadly'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setEncounterDifficulty(d)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                      encounterDifficulty === d
                        ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            {/* Dynamic difficulty toggle */}
            <div className="flex items-center justify-between py-1">
              <span className="text-[10px] text-slate-500">Auto-balance encounters</span>
              <button
                onClick={() => setDynamicDifficultyEnabled(!dynamicDifficultyEnabled)}
                className={`text-[9px] px-2 py-0.5 rounded-full border font-medium transition-colors ${
                  dynamicDifficultyEnabled
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                }`}
              >
                {dynamicDifficultyEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            {/* Encounter difficulty calculator */}
            {(() => {
              const playerUnits = units.filter((u: Unit) => u.characterId);
              const partyLevels = playerUnits.map((u: Unit) => {
                const c = characters.find((ch) => ch.id === u.characterId);
                return c?.level || 1;
              });
              if (partyLevels.length === 0 && selectedCharacter) {
                partyLevels.push(selectedCharacter.level || 1);
              }
              if (partyLevels.length > 0) {
                const budget = calculateEncounterBudget(partyLevels);
                const enemyXP = units.filter((u: Unit) => u.type === 'enemy' && u.hp > 0).reduce((sum: number, u: Unit) => sum + (u.xpValue || 0), 0);
                const diffLabel = enemyXP >= budget.deadly ? 'Deadly' : enemyXP >= budget.hard ? 'Hard' : enemyXP >= budget.medium ? 'Medium' : enemyXP > 0 ? 'Easy' : '—';
                const diffColor = enemyXP >= budget.deadly ? 'text-red-400' : enemyXP >= budget.hard ? 'text-orange-400' : enemyXP >= budget.medium ? 'text-yellow-400' : 'text-green-400';
                return (
                  <div className="bg-slate-800/60 rounded-lg p-2 space-y-1.5 border border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">XP Budget</span>
                      <span className="text-[9px] text-slate-400">{partyLevels.length} PC{partyLevels.length > 1 ? 's' : ''} · Avg Lv{Math.round(partyLevels.reduce((a, b) => a + b, 0) / partyLevels.length)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center">
                      {(['easy', 'medium', 'hard', 'deadly'] as const).map((d) => (
                        <div key={d} className="text-[8px]">
                          <div className={`font-semibold capitalize ${d === 'easy' ? 'text-green-400' : d === 'medium' ? 'text-yellow-400' : d === 'hard' ? 'text-orange-400' : 'text-red-400'}`}>{d}</div>
                          <div className="text-slate-500 font-mono">{budget[d]}</div>
                        </div>
                      ))}
                    </div>
                    {enemyXP > 0 && (
                      <div className="flex items-center justify-between pt-1 border-t border-slate-700/50">
                        <span className="text-[9px] text-slate-400">Current: <span className="font-mono text-slate-300">{enemyXP} XP</span></span>
                        <span className={`text-[9px] font-bold ${diffColor}`}>{diffLabel}</span>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })()}
            {/* Custom Monster Creator */}
            {!inCombat && (
              <div className="border-t border-slate-700/50 pt-3">
                <CustomMonsterCreator roomId={roomId} onSpawn={onSpawnMonster} />
              </div>
            )}
            {/* Downtime Activities — between adventures */}
            {!inCombat && selectedCharacterId && (
              <div className="border-t border-slate-700/50 pt-3">
                <DowntimeActivities
                  characterName={characters.find((c) => c.id === selectedCharacterId)?.name || 'Adventurer'}
                  characterClass={characters.find((c) => c.id === selectedCharacterId)?.class || 'Fighter'}
                  characterLevel={characters.find((c) => c.id === selectedCharacterId)?.level || 1}
                  gold={characters.find((c) => c.id === selectedCharacterId)?.gold || 0}
                  stats={(() => { const ch = characters.find((c) => c.id === selectedCharacterId); return ch ? ch.stats as unknown as Record<string, number> : { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }; })()}
                  onGoldChange={(delta) => {
                    const ch = characters.find((c) => c.id === selectedCharacterId);
                    if (ch) updateCharacter(ch.id, { gold: Math.max(0, ch.gold + delta) });
                  }}
                  onResult={(msg) => onAddDmMessage(msg)}
                  onXP={(xp) => {
                    const ch = characters.find((c) => c.id === selectedCharacterId);
                    if (ch) grantXP(ch.id, xp);
                  }}
                />
              </div>
            )}
          </>
        )}
        {/* NPC tab */}
        {dmSidebarTab === 'npc' && (
          <>
            {/* Quick NPC Generator */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Quick NPC Generator</label>
              <button
                onClick={() => {
                  const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc', 'Tiefling', 'Dragonborn'];
                  const roles = ['innkeeper', 'merchant', 'blacksmith', 'guard captain', 'herbalist', 'bard', 'scholar', 'priest', 'beggar', 'noble', 'bounty hunter', 'sailor', 'farmer', 'mystic', 'alchemist', 'thieves guild contact', 'retired adventurer', 'traveling performer'];
                  const personalities = ['gruff but kind', 'nervous and twitchy', 'overly cheerful', 'deeply suspicious', 'perpetually drunk', 'wise and patient', 'sarcastic and dry', 'warm and maternal', 'cold and calculating', 'boisterous and loud', 'quiet and observant', 'melodramatic', 'absentminded but brilliant', 'fiercely loyal', 'secretive and evasive', 'flirtatious and charming'];
                  const quirks = ['missing an eye', 'speaks in rhyme when nervous', 'always eating something', 'has a pet rat on their shoulder', 'collects odd trinkets', 'hums while thinking', 'refuses to make eye contact', 'excessively polite', 'tells the same story repeatedly', 'laughs at inappropriate times', 'whispers secrets to no one', 'covered in strange tattoos'];
                  const race = races[Math.floor(Math.random() * races.length)];
                  const name = randomFantasyName(race);
                  const role = roles[Math.floor(Math.random() * roles.length)];
                  const personality = personalities[Math.floor(Math.random() * personalities.length)];
                  const quirk = quirks[Math.floor(Math.random() * quirks.length)];
                  setNpcName(name);
                  setNpcRole(role);
                  if (!npcMode) setNpcMode(true);
                  setNpcDialogueHistory((prev) => [
                    ...prev,
                    `[Generated] ${name} — ${race} ${role}. ${personality}, ${quirk}.`,
                  ]);
                }}
                className="w-full py-2 rounded-lg text-xs font-semibold transition-all bg-emerald-900/40 text-emerald-400 border border-emerald-700/50 hover:bg-emerald-800/40 hover:border-emerald-600/50"
              >
                Random NPC
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">NPC Talk Mode</label>
              <button
                onClick={() => { setNpcMode(!npcMode); if (npcMode) { setNpcDialogueHistory([]); } }}
                className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                  npcMode ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-purple-500/50'
                }`}
              >
                {npcMode ? 'End Conversation' : 'Start NPC Talk'}
              </button>
            </div>
            {npcMode && (
              <div className="space-y-2">
                <input
                  value={npcName}
                  onChange={(e) => setNpcName(e.target.value)}
                  placeholder="NPC Name..."
                  className="w-full px-2 py-1.5 bg-slate-800 border border-purple-500/30 rounded-lg text-xs text-purple-200 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none"
                />
                <input
                  value={npcRole}
                  onChange={(e) => setNpcRole(e.target.value)}
                  placeholder="Role (e.g. innkeeper, merchant)..."
                  className="w-full px-2 py-1.5 bg-slate-800 border border-purple-500/30 rounded-lg text-xs text-purple-200 placeholder:text-purple-400/30 focus:border-purple-500 focus:outline-none"
                />
              </div>
            )}
            {npcDialogueHistory.length > 0 && (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Dialogue History</label>
                {npcDialogueHistory.map((line, i) => (
                  <div key={i} className="text-[10px] text-purple-300/70 bg-purple-950/20 rounded px-2 py-1">{line}</div>
                ))}
              </div>
            )}
          </>
        )}
        {/* Notes tab */}
        {dmSidebarTab === 'notes' && (
          <>
            {/* Inspiration — DM grants advantage tokens to players */}
            {characters.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Inspiration</label>
                <p className="text-[9px] text-slate-600">Grant inspiration — players can spend it for advantage on one roll.</p>
                <div className="space-y-1">
                  {characters.map((char) => (
                    <div key={char.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-800/30">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-xs font-semibold truncate ${char.inspiration ? 'text-amber-400' : 'text-slate-400'}`}>{char.name}</span>
                        <span className="text-[8px] text-slate-600">{char.class} {char.level}</span>
                      </div>
                      <button
                        onClick={() => updateCharacter(char.id, { inspiration: !char.inspiration })}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-all font-semibold ${
                          char.inspiration
                            ? 'border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                            : 'border-slate-700 text-slate-500 hover:text-amber-400 hover:border-amber-500/40'
                        }`}
                        title={char.inspiration ? `Revoke ${char.name}'s inspiration` : `Grant ${char.name} inspiration`}
                      >
                        {char.inspiration ? '★ Inspired' : '☆ Grant'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exhaustion — DM adjusts exhaustion level per character */}
            {characters.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Exhaustion</label>
                <p className="text-[9px] text-slate-600">D&amp;D 5e exhaustion (0-6). Cumulative penalties. Long rest reduces by 1.</p>
                <div className="space-y-1">
                  {characters.map((char) => {
                    const lvl = char.exhaustion ?? 0;
                    return (
                      <div key={char.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-800/30">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-xs font-semibold truncate ${lvl >= 4 ? 'text-red-400' : lvl >= 2 ? 'text-orange-400' : lvl >= 1 ? 'text-yellow-400' : 'text-slate-400'}`}>{char.name}</span>
                          <span className="text-[8px] text-slate-600">{char.class} {char.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateCharacter(char.id, { exhaustion: Math.max(0, lvl - 1) })}
                            disabled={lvl <= 0}
                            className="w-5 h-5 rounded text-[10px] font-bold border border-slate-700 text-slate-400 hover:text-green-400 hover:border-green-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            -
                          </button>
                          <span className={`text-xs font-mono font-bold w-4 text-center ${lvl >= 4 ? 'text-red-400' : lvl >= 2 ? 'text-orange-400' : lvl >= 1 ? 'text-yellow-400' : 'text-slate-500'}`}>{lvl}</span>
                          <button
                            onClick={() => updateCharacter(char.id, { exhaustion: Math.min(6, lvl + 1) })}
                            disabled={lvl >= 6}
                            className="w-5 h-5 rounded text-[10px] font-bold border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map Pins list */}
            {mapPins.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Map Pins ({mapPins.length})</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {mapPins.map((pin) => (
                    <div key={pin.id} className="flex items-center justify-between px-2 py-1 rounded-lg border border-slate-800 bg-slate-800/30 group">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: pin.color }} />
                        {pin.icon && <span className="text-[10px]">{pin.icon}</span>}
                        <span className="text-[10px] text-slate-300 font-medium truncate">{pin.label}</span>
                        <span className="text-[8px] text-slate-600">({pin.col},{pin.row})</span>
                      </div>
                      <button
                        onClick={() => onPinRemove(pin.id)}
                        className="text-[9px] text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all font-semibold"
                        title="Remove pin"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Roll Sync Policy — DM can change during game */}
            {onSetRollSyncMode && rollInterpolationMode && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Roll Sync</label>
                <div className="inline-flex rounded-md border border-slate-700/70 overflow-hidden">
                  {(['smooth', 'auto', 'strict'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onSetRollSyncMode(mode, autoStrictRttMs, autoStrictJitterMs)}
                      className={`text-[10px] px-2.5 py-1 font-semibold transition-colors capitalize ${
                        rollInterpolationMode === mode
                          ? mode === 'strict' ? 'bg-sky-900/30 text-sky-200' : mode === 'auto' ? 'bg-violet-900/30 text-violet-200' : 'bg-amber-900/30 text-amber-200'
                          : 'bg-slate-800 text-slate-500 hover:text-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <p className="text-[9px] text-slate-600">
                  {rollInterpolationMode === 'auto'
                    ? `Auto: currently ${effectiveMode || 'smooth'} (RTT>${autoStrictRttMs || 260}ms → strict)`
                    : rollInterpolationMode === 'strict'
                      ? 'Strict: lockstep timing, no catch-up interpolation'
                      : 'Smooth: softens high-latency visual jumps'}
                </p>
              </div>
            )}

            {/* Latency heatmap — compact view of all player RTTs */}
            {playerLatency && Object.keys(playerLatency).length > 0 && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Party Latency</label>
                <div className="space-y-1">
                  {(() => {
                    // Build latency entries from playerLatency map, using character names where possible
                    const playerUnits = units.filter((u) => u.type === 'player');
                    const entries = Object.entries(playerLatency).map(([playerId, rtt], idx) => {
                      const isStale = stalePlayers?.has(playerId);
                      const matchedUnit = playerUnits[idx]; // best-effort positional match
                      const label = matchedUnit?.name || playerId.slice(0, 8);
                      return { playerId, rtt, isStale, label };
                    });
                    const maxRtt = Math.max(1, ...entries.map((e) => e.rtt));
                    return entries.map((entry) => (
                      <div key={entry.playerId} className="flex items-center gap-2 px-2 py-1 rounded-lg border border-slate-800 bg-slate-800/30">
                        <span className="text-[9px] text-slate-400 w-16 truncate font-medium">{entry.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-700/50 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              entry.isStale ? 'bg-red-500 animate-pulse' : entry.rtt > 300 ? 'bg-red-500' : entry.rtt > 150 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, (entry.rtt / Math.max(maxRtt, 500)) * 100)}%` }}
                          />
                        </div>
                        <span className={`text-[8px] font-mono w-10 text-right ${
                          entry.isStale ? 'text-red-400' : entry.rtt > 300 ? 'text-red-400' : entry.rtt > 150 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {entry.isStale ? 'DC' : `${entry.rtt}ms`}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Session Notes</label>
              <p className="text-[9px] text-slate-600">Auto-saved to your browser. Only you can see these.</p>
            </div>
            <textarea
              value={dmNotes}
              onChange={(e) => setDmNotes(e.target.value)}
              placeholder="Track NPCs, plot hooks, secrets, loot tables, reminders..."
              className="w-full flex-1 min-h-[300px] bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none resize-y leading-relaxed"
            />
            <div className="text-[9px] text-slate-600 text-right">{dmNotes.length} chars</div>
          </>
        )}

        {/* Ambiance — always visible at bottom of sidebar */}
        <div className="border-t border-slate-700 pt-3 mt-auto space-y-2">
          <label className="text-[10px] text-slate-500 font-semibold uppercase">Ambiance</label>
          <div className="grid grid-cols-3 gap-1">
            {AMBIENT_MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => { setAmbientMood(m.id); setCurrentAmbient(m.id); }}
                title={m.description}
                className={`px-1.5 py-1 rounded text-[9px] font-medium transition-all border ${
                  currentAmbient === m.id
                    ? 'border-amber-500/60 bg-amber-900/20 text-amber-400'
                    : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
