// DMSidebar — collapsible left panel with Encounter, NPC, and Notes tabs.
// Extracted from Game.tsx to reduce file size.
import { useState } from 'react';
import { useGame, calculateEncounterBudget, type Unit } from '../../contexts/GameContext';
import { randomFantasyName } from '../../lib/names';
import { setAmbientMood, AMBIENT_MOODS, type AmbientMood } from '../../hooks/useSoundFX';
import { BIOME_LABELS, rollBiomeEncounter, checkRandomEncounter, type Biome, type BiomeEncounter } from '../../data/enemies';

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
}: DMSidebarProps) {
  const { units, characters, inCombat } = useGame();
  const [dmSidebarTab, setDmSidebarTab] = useState<'encounter' | 'npc' | 'notes'>('encounter');
  const [biome, setBiome] = useState<Biome>('forest');
  const [lastBiomeRoll, setLastBiomeRoll] = useState<{ encounter: BiomeEncounter; roll: number } | null>(null);

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
            <button
              onClick={onGenerateEncounter}
              disabled={encounterLoading}
              className="w-full py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {encounterLoading ? (
                <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Spawning...</>
              ) : 'Spawn Encounter'}
            </button>
            <button
              onClick={onOpenMonsterBrowser}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5"
            >
              🐉 Browse Monsters
            </button>
            {units.length > 0 && inCombat && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Active Units</label>
                {units.filter((u: Unit) => u.hp > 0).map((u: Unit) => (
                  <div key={u.id} className={`flex items-center gap-2 p-1.5 rounded text-xs ${u.type === 'enemy' ? 'bg-red-950/30' : 'bg-slate-800/50'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${u.type === 'enemy' ? 'bg-red-900/60 text-red-300' : 'bg-amber-500/20 text-amber-400'}`}>{u.name.charAt(0)}</div>
                    <span className="flex-1 truncate text-slate-300">{u.name}</span>
                    <span className={`font-mono text-[10px] ${u.hp <= (u.maxHp || u.hp) * 0.25 ? 'text-red-400' : 'text-slate-500'}`}>{u.hp}/{u.maxHp || u.hp}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Scene</label>
              <input
                value={sceneName}
                onChange={(e) => setSceneName(e.target.value)}
                placeholder="Scene name..."
                className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none"
              />
            </div>
            {/* Random Encounter Table */}
            {!inCombat && (
              <div className="space-y-2 border-t border-slate-700/50 pt-3">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Random Encounter</label>
                <div className="flex flex-wrap gap-1">
                  {(Object.keys(BIOME_LABELS) as Biome[]).map((b) => {
                    const info = BIOME_LABELS[b];
                    return (
                      <button
                        key={b}
                        onClick={() => { setBiome(b); setLastBiomeRoll(null); }}
                        className={`px-1.5 py-1 rounded-md text-[10px] font-medium transition-all border ${
                          biome === b
                            ? `border-amber-500/50 bg-amber-500/10 ${info.color}`
                            : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                        }`}
                        title={info.label}
                      >
                        {info.icon} {info.label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      const result = checkRandomEncounter(biome, 15);
                      if (result) {
                        setLastBiomeRoll(result);
                        setEncounterDifficulty(result.encounter.difficulty);
                      } else {
                        setLastBiomeRoll(null);
                      }
                    }}
                    className="flex-1 py-1.5 text-[10px] font-semibold rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-500/40 hover:text-amber-300 transition-all"
                    title="Roll d20 vs DC 15 (30% chance)"
                  >
                    🎲 Check (DC 15)
                  </button>
                  <button
                    onClick={() => {
                      const enc = rollBiomeEncounter(biome);
                      setLastBiomeRoll({ encounter: enc, roll: 20 });
                      setEncounterDifficulty(enc.difficulty);
                    }}
                    className="flex-1 py-1.5 text-[10px] font-semibold rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-red-500/40 hover:text-red-300 transition-all"
                    title="Force an encounter (skip the roll)"
                  >
                    ⚔️ Force
                  </button>
                </div>
                {/* Result */}
                {lastBiomeRoll ? (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-amber-400 font-semibold uppercase">Encounter! (rolled {lastBiomeRoll.roll})</span>
                      <span className={`text-[9px] font-bold capitalize ${
                        lastBiomeRoll.encounter.difficulty === 'deadly' ? 'text-red-400' :
                        lastBiomeRoll.encounter.difficulty === 'hard' ? 'text-orange-400' :
                        lastBiomeRoll.encounter.difficulty === 'medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>{lastBiomeRoll.encounter.difficulty}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 italic leading-relaxed">{lastBiomeRoll.encounter.flavor}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lastBiomeRoll.encounter.enemies.map((e, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/30 border border-red-800/50 text-red-300 font-medium">{e}</span>
                      ))}
                    </div>
                    <p className="text-[9px] text-slate-500 mt-1">Set difficulty above and hit Spawn Encounter to use these enemies.</p>
                  </div>
                ) : lastBiomeRoll === null && (
                  <div className="text-[10px] text-slate-600 text-center py-1">No encounter triggered. Safe travels... for now.</div>
                )}
              </div>
            )}
            {/* Turn Timer Settings */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Turn Timer</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTurnTimerEnabled(!turnTimerEnabled)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    turnTimerEnabled
                      ? 'border-green-600/50 bg-green-900/20 text-green-400'
                      : 'border-slate-700 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  {turnTimerEnabled ? 'On' : 'Off'}
                </button>
                {turnTimerEnabled && (
                  <div className="flex items-center gap-1.5 flex-1">
                    <input
                      type="range"
                      min={15}
                      max={300}
                      step={15}
                      value={turnTimeSeconds}
                      onChange={(e) => setTurnTimeSeconds(Number(e.target.value))}
                      className="flex-1 h-1 accent-[#F38020] cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                      {turnTimeSeconds >= 60 ? `${Math.floor(turnTimeSeconds / 60)}m${turnTimeSeconds % 60 > 0 ? `${turnTimeSeconds % 60}s` : ''}` : `${turnTimeSeconds}s`}
                    </span>
                  </div>
                )}
              </div>
              {turnTimerEnabled && (
                <div className="flex gap-1">
                  {[30, 60, 120, 180].map((s) => (
                    <button
                      key={s}
                      onClick={() => setTurnTimeSeconds(s)}
                      className={`flex-1 py-1 rounded text-[9px] font-medium transition-all border ${
                        turnTimeSeconds === s
                          ? 'border-[#F38020]/50 bg-[#F38020]/10 text-[#F38020]'
                          : 'border-slate-700 text-slate-500 hover:border-slate-600'
                      }`}
                    >
                      {s >= 60 ? `${s / 60}m` : `${s}s`}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
