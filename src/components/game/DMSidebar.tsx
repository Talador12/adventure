// DMSidebar — collapsible left panel with Encounter, NPC, and Notes tabs.
// Extracted from Game.tsx to reduce file size.
import { useState, useRef, useEffect } from 'react';
import { useGame, calculateEncounterBudget, type Unit } from '../../contexts/GameContext';
import type { EncounterTemplate } from '../../types/game';
import SessionTimer from './SessionTimer';
import { randomFantasyName } from '../../lib/names';
import { setAmbientMood, AMBIENT_MOODS, type AmbientMood, mixerAddChannel, mixerRemoveChannel, mixerSetVolume, mixerGetChannels, mixerStopAll } from '../../hooks/useSoundFX';
import { BIOME_LABELS, rollBiomeEncounter, checkRandomEncounter, type Biome, type BiomeEncounter } from '../../data/enemies';
import { rollTreasureHoard, HOARD_TIER_LABELS, type TreasureHoardResult } from '../../data/rules';
import FormationPresets from './FormationPresets';
import DowntimeActivities from './DowntimeActivities';
import CustomMonsterCreator from './CustomMonsterCreator';
import QuickCombatResolver from './QuickCombatResolver';
import SessionScheduler from './SessionScheduler';
import PluginManager from './PluginManager';
import SpellTemplates from './SpellTemplates';
import LootSplitter from './LootSplitter';
import MassHPTool from './MassHPTool';
import BardicInspiration, { getBardicDie } from './BardicInspiration';
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
  // Rules reminders
  rulesRemindersEnabled?: boolean;
  setRulesRemindersEnabled?: (v: boolean) => void;
  // Roll sync policy
  rollInterpolationMode?: RollInterpolationMode;
  effectiveMode?: 'smooth' | 'strict';
  autoStrictRttMs?: number;
  autoStrictJitterMs?: number;
  onSetRollSyncMode?: (mode: RollInterpolationMode, rttMs?: number, jitterMs?: number) => void;
  // Latency
  playerLatency?: Record<string, number>;
  stalePlayers?: Set<string>;
  // Party inventory
  partyInventory?: import('../../types/game').Item[];
  onAddToPartyInventory?: (item: import('../../types/game').Item) => void;
  onRemoveFromPartyInventory?: (itemId: string) => void;
  onGiveItemToPlayer?: (itemId: string, charId: string) => void;
  // Staged loot — DM pre-assigns loot for the next encounter
  stagedLoot?: import('../../types/game').Item[];
  onAddStagedLoot?: (item: import('../../types/game').Item) => void;
  onRemoveStagedLoot?: (itemId: string) => void;
  onClearStagedLoot?: () => void;
  // DM personality
  dmPersonality?: string;
  onSetDmPersonality?: (p: string) => void;
}

function NpcMemoryViewer({ roomId }: { roomId: string }) {
  const [memories, setMemories] = useState<Array<{ npcName: string; lineCount: number; lastLine?: string }>>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedLines, setExpandedLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadList = () => {
    setLoading(true);
    fetch(`/api/npc-memory/${encodeURIComponent(roomId)}`).then((r) => r.json() as Promise<{ memories: typeof memories }>).then((d) => setMemories(d.memories || [])).catch(() => {}).finally(() => setLoading(false));
  };

  const loadNpc = (npcName: string) => {
    fetch(`/api/npc-memory/${encodeURIComponent(roomId)}/${encodeURIComponent(npcName)}`).then((r) => r.json() as Promise<{ lines: string[] }>).then((d) => setExpandedLines(d.lines || []));
  };

  const clearNpc = (npcName: string) => {
    if (!confirm(`Clear all memories for ${npcName}?`)) return;
    fetch(`/api/npc-memory/${encodeURIComponent(roomId)}/${encodeURIComponent(npcName)}`, { method: 'DELETE' }).then(() => {
      setMemories((prev) => prev.filter((m) => m.npcName !== npcName));
      if (expanded === npcName) { setExpanded(null); setExpandedLines([]); }
    });
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">NPC Memories</label>
        <button onClick={loadList} className="text-[8px] text-teal-400 hover:text-teal-300 font-semibold">{loading ? '...' : 'Load'}</button>
      </div>
      {memories.length === 0 ? (
        <p className="text-[8px] text-slate-600 italic">Click Load to view NPC memories</p>
      ) : (
        <div className="space-y-0.5 max-h-32 overflow-y-auto">
          {memories.map((m) => (
            <div key={m.npcName}>
              <div className="flex items-center justify-between text-[9px] px-2 py-0.5 rounded bg-slate-800/30">
                <button onClick={() => { if (expanded === m.npcName) { setExpanded(null); } else { setExpanded(m.npcName); loadNpc(m.npcName); } }} className="text-teal-300 font-medium truncate text-left">
                  {m.npcName.replace(/-/g, ' ')} <span className="text-slate-600">({m.lineCount})</span>
                </button>
                <button onClick={() => clearNpc(m.npcName)} className="text-red-500 hover:text-red-400 text-[8px]" title="Clear memory">×</button>
              </div>
              {expanded === m.npcName && expandedLines.length > 0 && (
                <div className="ml-2 mt-0.5 space-y-0.5 max-h-20 overflow-y-auto text-[8px] text-slate-400 border-l border-slate-700/50 pl-2">
                  {expandedLines.map((line, i) => <div key={i} className="leading-tight">{line}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
  rulesRemindersEnabled,
  setRulesRemindersEnabled,
  rollInterpolationMode,
  effectiveMode,
  autoStrictRttMs,
  autoStrictJitterMs,
  onSetRollSyncMode,
  playerLatency,
  stalePlayers,
  partyInventory,
  onAddToPartyInventory,
  onRemoveFromPartyInventory,
  onGiveItemToPlayer,
  stagedLoot,
  onAddStagedLoot,
  onRemoveStagedLoot,
  onClearStagedLoot,
  dmPersonality,
  onSetDmPersonality,
}: DMSidebarProps) {
  const { units, setUnits, characters, inCombat, updateCharacter, grantXP, damageUnit, mapPositions, setMapPositions } = useGame();
  const [dmSidebarTab, setDmSidebarTab] = useState<'encounter' | 'npc' | 'notes'>('encounter');
  const [biome, setBiome] = useState<Biome>('forest');
  const [lastBiomeRoll, setLastBiomeRoll] = useState<{ encounter: BiomeEncounter; roll: number } | null>(null);
  const [hoardTier, setHoardTier] = useState(0);
  const [lastHoard, setLastHoard] = useState<TreasureHoardResult | null>(null);
  const [, setMixerRefresh] = useState(0); // force re-render when mixer state changes
  const [sessionNotes, setSessionNotes] = useState('');
  const [bardicPool, setBardicPool] = useState(0);
  const [sessionNotesStatus, setSessionNotesStatus] = useState('');
  const sessionNotesSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load DM session notes from cloud on mount
  useEffect(() => {
    fetch(`/api/campaign/${roomId}/notes`).then((r) => r.json() as Promise<{ notes?: string }>)
      .then((d) => { if (d.notes) setSessionNotes(d.notes); })
      .catch(() => {});
  }, [roomId]);

  return (
    <aside aria-label="DM Tools sidebar" className="hidden md:flex w-72 bg-slate-900 border-r border-slate-800 flex-col shrink-0 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span className="text-xs font-semibold text-[#F38020] uppercase tracking-wider">DM Tools</span>
        <button onClick={onClose} aria-label="Close DM sidebar" className="text-slate-500 hover:text-slate-300 text-xs">&times;</button>
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
            {/* Encounter Templates — save/load enemy groups */}
            <div className="flex items-center gap-2">
              {units.filter((u) => u.type === 'enemy' && u.hp > 0).length > 0 && (
                <button
                  onClick={() => {
                    const name = prompt('Template name:', 'My Encounter');
                    if (!name?.trim()) return;
                    const notes = prompt('DM notes (tactics, RP hooks, etc.):') || '';
                    const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0).map((u) => ({
                      name: u.name, hp: u.hp, maxHp: u.maxHp, ac: u.ac,
                      attackBonus: u.attackBonus, damageDie: u.damageDie, cr: u.cr !== undefined ? String(u.cr) : undefined,
                    }));
                    const template: EncounterTemplate = { id: crypto.randomUUID().slice(0, 8), name: name.trim(), enemies, notes: notes.trim() || undefined, createdAt: Date.now() };
                    try {
                      const raw = localStorage.getItem('adventure:encounter-templates') || '[]';
                      const templates = JSON.parse(raw) as EncounterTemplate[];
                      templates.unshift(template);
                      if (templates.length > 20) templates.length = 20;
                      localStorage.setItem('adventure:encounter-templates', JSON.stringify(templates));
                      alert(`Saved "${name.trim()}" (${enemies.length} enemies)`);
                    } catch { /* ok */ }
                  }}
                  className="text-[8px] text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Save Template
                </button>
              )}
              <button
                onClick={async () => {
                  const avgLevel = characters.length > 0 ? Math.round(characters.reduce((s, c) => s + c.level, 0) / characters.length) : 1;
                  onAddDmMessage('Generating encounter template...');
                  try {
                    const res = await fetch('/api/dm/encounter', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        partyLevel: avgLevel,
                        partySize: characters.length || 1,
                        difficulty: encounterDifficulty,
                        context: sceneName || 'a mysterious location',
                        partyClasses: characters.map((c) => c.class),
                      }),
                    });
                    const data = await res.json() as { description?: string; enemies?: Array<{ name: string; hp: number; maxHp: number; ac: number }> };
                    if (data.enemies?.length) {
                      const tmpl: EncounterTemplate = {
                        id: crypto.randomUUID().slice(0, 8),
                        name: `AI: ${encounterDifficulty} (Lv${avgLevel})`,
                        enemies: data.enemies,
                        difficulty: encounterDifficulty,
                        notes: data.description || '',
                        createdAt: Date.now(),
                      };
                      const raw = localStorage.getItem('adventure:encounter-templates') || '[]';
                      const templates = JSON.parse(raw) as EncounterTemplate[];
                      templates.unshift(tmpl);
                      if (templates.length > 20) templates.length = 20;
                      localStorage.setItem('adventure:encounter-templates', JSON.stringify(templates));
                      onAddDmMessage(`Saved AI template: "${tmpl.name}" (${tmpl.enemies.length} enemies)`);
                    }
                  } catch { onAddDmMessage('AI encounter generation failed (offline?)'); }
                }}
                className="text-[8px] text-violet-400 hover:text-violet-300 font-semibold"
                title="AI generates a balanced encounter and saves it as a template"
              >
                AI Template
              </button>
              <select
                defaultValue=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  try {
                    const raw = localStorage.getItem('adventure:encounter-templates') || '[]';
                    const templates = JSON.parse(raw) as EncounterTemplate[];
                    const tmpl = templates.find((t) => t.id === e.target.value);
                    if (tmpl && onSpawnMonster) {
                      for (const enemy of tmpl.enemies) {
                        onSpawnMonster({ name: enemy.name, hp: enemy.hp, maxHp: enemy.maxHp, ac: enemy.ac, type: 'enemy', cr: 0, size: 'medium', environments: [], description: '' } as unknown as import('../../data/monsters').Monster, 0);
                      }
                      if (tmpl.notes) {
                        onAddDmMessage(`[Encounter Notes] ${tmpl.notes}`);
                      }
                    }
                  } catch { /* ok */ }
                  e.target.value = '';
                }}
                className="text-[8px] px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
              >
                <option value="">Load Template...</option>
                {(() => {
                  try {
                    const raw = localStorage.getItem('adventure:encounter-templates') || '[]';
                    return (JSON.parse(raw) as EncounterTemplate[]).map((t) => (
                      <option key={t.id} value={t.id}>{t.name} ({t.enemies.length})</option>
                    ));
                  } catch { return null; }
                })()}
              </select>
              <button
                onClick={() => {
                  try {
                    const raw = localStorage.getItem('adventure:encounter-templates') || '[]';
                    const templates = JSON.parse(raw);
                    if (templates.length === 0) { alert('No templates to export'); return; }
                    const blob = new Blob([JSON.stringify(templates, null, 2)], { type: 'application/json' });
                    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
                    a.download = 'encounter-templates.json'; a.click(); URL.revokeObjectURL(a.href);
                  } catch { /* ok */ }
                }}
                className="text-[7px] text-slate-500 hover:text-slate-300"
                title="Export all encounter templates as JSON"
              >
                Export
              </button>
              <button
                onClick={() => {
                  const input = document.createElement('input'); input.type = 'file'; input.accept = '.json';
                  input.onchange = async () => {
                    const file = input.files?.[0]; if (!file) return;
                    try {
                      const text = await file.text();
                      const imported = JSON.parse(text) as EncounterTemplate[];
                      if (!Array.isArray(imported)) { alert('Invalid format'); return; }
                      const raw = localStorage.getItem('adventure:encounter-templates') || '[]';
                      const existing = JSON.parse(raw) as EncounterTemplate[];
                      const merged = [...imported, ...existing].slice(0, 20);
                      localStorage.setItem('adventure:encounter-templates', JSON.stringify(merged));
                      alert(`Imported ${imported.length} template(s)`);
                    } catch { alert('Failed to parse JSON'); }
                  };
                  input.click();
                }}
                className="text-[7px] text-slate-500 hover:text-slate-300"
                title="Import encounter templates from JSON file"
              >
                Import
              </button>
            </div>

            {/* Party Formation Presets */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const name = prompt('Formation name:', 'Default');
                  if (!name?.trim()) return;
                  const pos = units.filter((u) => u.type === 'player').map((u) => {
                    const p = mapPositions.find((mp) => mp.unitId === u.id);
                    return p ? { name: u.name, col: p.col, row: p.row } : null;
                  }).filter(Boolean);
                  try {
                    const key = `adventure:formations:${roomId}`;
                    const raw = localStorage.getItem(key) || '[]';
                    const formations = JSON.parse(raw) as Array<{ name: string; positions: typeof pos }>;
                    formations.unshift({ name: name.trim(), positions: pos });
                    if (formations.length > 10) formations.length = 10;
                    localStorage.setItem(key, JSON.stringify(formations));
                  } catch { /* ok */ }
                }}
                className="text-[8px] text-sky-400 hover:text-sky-300 font-semibold"
              >
                Save Formation
              </button>
              <select
                defaultValue=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  try {
                    const key = `adventure:formations:${roomId}`;
                    const formations = JSON.parse(localStorage.getItem(key) || '[]') as Array<{ name: string; positions: Array<{ name: string; col: number; row: number }> }>;
                    const f = formations.find((f) => f.name === e.target.value);
                    if (f) {
                      setMapPositions((prev) => {
                        const next = [...prev];
                        for (const fp of f.positions) {
                          const unit = units.find((u) => u.name === fp.name && u.type === 'player');
                          if (unit) { const idx = next.findIndex((p) => p.unitId === unit.id); if (idx >= 0) next[idx] = { ...next[idx], col: fp.col, row: fp.row }; }
                        }
                        return next;
                      });
                    }
                  } catch { /* ok */ }
                  e.target.value = '';
                }}
                className="text-[8px] px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
              >
                <option value="">Load Formation...</option>
                {(() => { try { return (JSON.parse(localStorage.getItem(`adventure:formations:${roomId}`) || '[]') as Array<{ name: string }>).map((f) => <option key={f.name} value={f.name}>{f.name}</option>); } catch { return null; } })()}
              </select>
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
            {/* Rules reminders toggle */}
            {setRulesRemindersEnabled && (
              <div className="flex items-center justify-between py-1">
                <span className="text-[10px] text-slate-500">Rules reminders</span>
                <button
                  onClick={() => setRulesRemindersEnabled(!rulesRemindersEnabled)}
                  className={`text-[9px] px-2 py-0.5 rounded-full border font-medium transition-colors ${
                    rulesRemindersEnabled
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-400'
                      : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {rulesRemindersEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            )}
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
            {/* Mass HP tool — damage or heal multiple units */}
            {inCombat && units.length > 0 && (
              <div className="border-t border-slate-700/50 pt-3">
                <MassHPTool
                  units={units}
                  onApply={(unitIds, amount, isDamage) => {
                    for (const id of unitIds) {
                      const u = units.find((u) => u.id === id);
                      if (!u) continue;
                      if (isDamage) {
                        damageUnit(id, amount);
                      } else {
                        setUnits((prev) => prev.map((unit) => unit.id === id ? { ...unit, hp: Math.min(unit.maxHp, unit.hp + amount) } : unit));
                      }
                    }
                    const names = unitIds.map((id) => units.find((u) => u.id === id)?.name).filter(Boolean).join(', ');
                    onAddDmMessage(`Mass ${isDamage ? 'damage' : 'heal'}: ${amount} HP to ${names}`);
                  }}
                />
              </div>
            )}
            {/* Spell Effect Templates — save/reuse AoE shapes */}
            <div className="border-t border-slate-700/50 pt-3">
              <SpellTemplates
                roomId={roomId}
                onApply={(template) => {
                  onAddDmMessage(`Applied spell template: ${template.name} (${template.shape}, ${template.radiusCells * 5}ft)`);
                }}
              />
            </div>
            {/* Custom Monster Creator */}
            {!inCombat && (
              <div className="border-t border-slate-700/50 pt-3">
                <CustomMonsterCreator roomId={roomId} onSpawn={onSpawnMonster} />
              </div>
            )}
            {/* Loot Splitter — divide gold evenly among party */}
            {!inCombat && characters.length > 1 && (
              <div className="border-t border-slate-700/50 pt-3">
                <LootSplitter
                  partyNames={characters.map((c) => c.name)}
                  onGoldSplit={(splits) => {
                    for (const [name, gold] of Object.entries(splits)) {
                      const ch = characters.find((c) => c.name === name);
                      if (ch) updateCharacter(ch.id, { gold: (ch.gold || 0) + gold });
                    }
                  }}
                  onMessage={(msg) => onAddDmMessage(msg)}
                />
              </div>
            )}
            {/* Quick Combat Resolver — skip tactical play for simple encounters */}
            {!inCombat && characters.length > 0 && (
              <div className="border-t border-slate-700/50 pt-3">
                <QuickCombatResolver
                  party={characters.map((c) => ({
                    name: c.name,
                    class: c.class,
                    level: c.level,
                    hp: c.hp,
                    maxHp: c.maxHp,
                    ac: c.ac || 10,
                    attackBonus: Math.floor((c.stats?.STR ?? 10 - 10) / 2) + Math.floor((c.level - 1) / 4) + 2,
                    damageDie: 8,
                  }))}
                  encounterDifficulty={encounterDifficulty}
                  onResult={(msg) => onAddDmMessage(msg)}
                  onXP={(xp) => {
                    const ch = characters.find((c) => c.id === selectedCharacterId);
                    if (ch) grantXP(ch.id, xp);
                  }}
                  onGold={(gold) => {
                    const ch = characters.find((c) => c.id === selectedCharacterId);
                    if (ch) updateCharacter(ch.id, { gold: (ch.gold || 0) + gold });
                  }}
                  onDamage={(name, dmg) => {
                    const ch = characters.find((c) => c.name === name);
                    if (ch) updateCharacter(ch.id, { hp: Math.max(0, ch.hp - dmg) });
                  }}
                />
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
            {/* DM Session Notes — cloud-saved freeform notes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">Session Notes</label>
                <span className="text-[8px] text-slate-700">{sessionNotesStatus}</span>
              </div>
              <textarea
                value={sessionNotes}
                onChange={(e) => {
                  setSessionNotes(e.target.value);
                  setSessionNotesStatus('editing...');
                  clearTimeout(sessionNotesSaveTimer.current);
                  sessionNotesSaveTimer.current = setTimeout(() => {
                    fetch(`/api/campaign/${roomId}/notes`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ notes: e.target.value }),
                    }).then(() => setSessionNotesStatus('saved')).catch(() => setSessionNotesStatus('save failed'));
                  }, 1500);
                }}
                placeholder="Jot down session notes, plot hooks, NPC secrets..."
                className="w-full h-28 px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 placeholder:text-slate-600 focus:border-amber-600 focus:outline-none resize-none"
              />
            </div>

            <div className="w-full h-px bg-slate-700/50" />

            {/* Plugin Manager */}
            <PluginManager />

            <div className="w-full h-px bg-slate-700/50" />

            {/* Session Scheduler — plan next game night */}
            <SessionScheduler roomId={roomId} />

            <div className="w-full h-px bg-slate-700/50" />

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

            {/* Bardic Inspiration — party-shared bonus dice pool */}
            <BardicInspiration
              poolSize={bardicPool}
              dieSize={getBardicDie(Math.max(...characters.map((c) => c.class === 'Bard' ? c.level : 0), 1))}
              onGrant={() => { setBardicPool((p) => p + 1); onAddDmMessage('A bardic inspiration die is granted to the party.'); }}
              onSpend={(roll) => { setBardicPool((p) => Math.max(0, p - 1)); onAddDmMessage(`Bardic inspiration spent: +${roll}`); }}
              isDM={true}
              hasBard={characters.some((c) => c.class === 'Bard')}
            />

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

            {/* AI DM Personality */}
            {onSetDmPersonality && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-semibold uppercase">AI DM Style</label>
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'theatrical', label: 'Theatrical', color: 'text-amber-300' },
                    { id: 'comedic', label: 'Comedic', color: 'text-yellow-300' },
                    { id: 'grimdark', label: 'Grimdark', color: 'text-red-300' },
                    { id: 'tolkien', label: 'Tolkien', color: 'text-emerald-300' },
                    { id: 'noir', label: 'Noir', color: 'text-slate-300' },
                    { id: 'horror', label: 'Horror', color: 'text-purple-300' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSetDmPersonality(p.id)}
                      className={`text-[9px] px-2 py-0.5 rounded border font-semibold transition-all ${
                        dmPersonality === p.id ? `bg-slate-700/60 border-slate-500 ${p.color}` : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Session Timer — also in Game header, but convenient for DM */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Session Timer</label>
              <SessionTimer roomId={roomId} compact={false} />
            </div>

            {/* DM Sound Effect Triggers */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Sound Effects</label>
              <div className="flex flex-wrap gap-1">
                {[
                  { label: '🎲 Dice', fn: 'playDiceRoll' },
                  { label: '💥 Crit', fn: 'playCritical' },
                  { label: '😬 Fumble', fn: 'playFumble' },
                  { label: '⚔️ Hit', fn: 'playCombatHit' },
                  { label: '💨 Miss', fn: 'playCombatMiss' },
                  { label: '💀 Death', fn: 'playEnemyDeath' },
                  { label: '✨ Spell', fn: 'playMagicSpell' },
                  { label: '🔄 Turn', fn: 'playTurnChange' },
                  { label: '⚔️ Fight', fn: 'playEncounterStart' },
                  { label: '⬆️ Level', fn: 'playLevelUp' },
                  { label: '💚 Heal', fn: 'playHealing' },
                  { label: '💰 Loot', fn: 'playLootDrop' },
                ].map((sfx) => (
                  <button
                    key={sfx.fn}
                    onClick={() => import('../../hooks/useSoundFX').then((m) => (m as unknown as Record<string, () => void>)[sfx.fn]?.())}
                    className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all"
                  >
                    {sfx.label}
                  </button>
                ))}
              </div>
            </div>

            {/* NPC Memory Viewer */}
            {roomId && (
              <NpcMemoryViewer roomId={roomId} />
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

            {/* Staged Loot — DM pre-assigns loot for next encounter */}
            {onAddStagedLoot && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-slate-500 font-semibold uppercase">
                    Staged Loot ({(stagedLoot || []).length})
                    <span className="text-[8px] text-slate-600 normal-case ml-1">next encounter</span>
                  </label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        const name = prompt('Item name:');
                        if (!name?.trim()) return;
                        const rarityStr = prompt('Rarity (common/uncommon/rare/epic):', 'uncommon') || 'common';
                        const rarity = (['common', 'uncommon', 'rare', 'epic'].includes(rarityStr) ? rarityStr : 'common') as import('../../types/game').ItemRarity;
                        onAddStagedLoot({
                          id: crypto.randomUUID(),
                          name: name.trim(),
                          type: 'misc',
                          rarity,
                          description: 'Pre-assigned encounter loot',
                          value: 0,
                        });
                      }}
                      className="text-[8px] text-orange-400 hover:text-orange-300 font-semibold"
                    >
                      + Stage
                    </button>
                    {(stagedLoot || []).length > 0 && (
                      <button onClick={onClearStagedLoot} className="text-[8px] text-slate-500 hover:text-red-400 font-semibold">Clear</button>
                    )}
                  </div>
                </div>
                {(stagedLoot || []).length > 0 ? (
                  <div className="space-y-0.5">
                    {(stagedLoot || []).map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-[9px] px-2 py-0.5 rounded border border-orange-800/30 bg-orange-950/20">
                        <span className="text-orange-200 font-medium truncate">{item.name} <span className="text-[7px] text-orange-500">{item.rarity}</span></span>
                        <button onClick={() => onRemoveStagedLoot?.(item.id)} className="text-red-500 hover:text-red-400" title="Remove">×</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[8px] text-slate-600 italic">No staged loot — random rolls will be used</p>
                )}
              </div>
            )}

            {/* Party Loot Pool */}
            {onAddToPartyInventory && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-slate-500 font-semibold uppercase">Party Loot ({(partyInventory || []).length})</label>
                  <button
                    onClick={() => {
                      const name = prompt('Item name:');
                      if (!name?.trim()) return;
                      onAddToPartyInventory({
                        id: crypto.randomUUID(),
                        name: name.trim(),
                        type: 'misc',
                        rarity: 'common',
                        description: 'Found loot',
                        value: 0,
                      });
                    }}
                    className="text-[8px] text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    + Add
                  </button>
                </div>
                {(partyInventory || []).length > 0 ? (
                  <div className="space-y-0.5 max-h-32 overflow-y-auto">
                    {(partyInventory || []).map((item) => {
                      const rarityStyle: Record<string, string> = {
                        common: 'border-slate-700/30',
                        uncommon: 'border-emerald-700/50 shadow-[0_0_4px_rgba(16,185,129,0.15)]',
                        rare: 'border-blue-600/50 shadow-[0_0_6px_rgba(59,130,246,0.2)]',
                        epic: 'border-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.25)]',
                      };
                      const rarityText: Record<string, string> = {
                        common: 'text-slate-300',
                        uncommon: 'text-emerald-300',
                        rare: 'text-blue-300',
                        epic: 'text-purple-300',
                      };
                      return (
                      <div key={item.id} className={`flex items-center justify-between text-[9px] px-2 py-0.5 rounded border bg-slate-800/30 ${rarityStyle[item.rarity] || rarityStyle.common}`}>
                        <span className={`font-medium truncate ${rarityText[item.rarity] || rarityText.common}`}>{item.name}{item.quantity && item.quantity > 1 ? ` ×${item.quantity}` : ''}</span>
                        <div className="flex gap-1 shrink-0">
                          {characters.length > 0 && (
                            <select
                              defaultValue=""
                              onChange={(e) => { if (e.target.value && onGiveItemToPlayer) { onGiveItemToPlayer(item.id, e.target.value); e.target.value = ''; } }}
                              className="text-[7px] px-0.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400 w-14"
                              title="Give to player"
                            >
                              <option value="">Give...</option>
                              {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          )}
                          <button onClick={() => onRemoveFromPartyInventory?.(item.id)} className="text-red-500 hover:text-red-400" title="Remove">×</button>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[8px] text-slate-600 italic">No loot in party pool</p>
                )}
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
          {/* Sound Mixer — layer multiple ambiences */}
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-600 font-semibold uppercase">Mixer</span>
              <button onClick={() => { mixerStopAll(); setMixerRefresh((v) => v + 1); }} className="text-[8px] text-slate-700 hover:text-red-400 transition-colors">Clear all</button>
            </div>
            <div className="flex flex-wrap gap-1">
              {AMBIENT_MOODS.filter((m) => m.id !== 'none').map((m) => {
                const active = mixerGetChannels().some((ch) => ch.mood === m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      if (active) mixerRemoveChannel(m.id);
                      else mixerAddChannel(m.id, 0.4);
                      setMixerRefresh((v) => v + 1);
                    }}
                    className={`text-[8px] px-1.5 py-0.5 rounded border transition-all ${active ? 'border-teal-600/50 bg-teal-900/20 text-teal-400' : 'border-slate-700/50 text-slate-600 hover:text-slate-400'}`}
                    title={`${active ? 'Remove' : 'Add'} ${m.label} layer`}
                  >
                    {active ? '●' : '○'} {m.label}
                  </button>
                );
              })}
            </div>
            {mixerGetChannels().length > 0 && (
              <div className="space-y-1">
                {mixerGetChannels().map((ch) => (
                  <div key={ch.mood} className="flex items-center gap-1.5">
                    <span className="text-[8px] text-teal-400 w-12 truncate capitalize">{ch.mood}</span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={ch.volume}
                      onChange={(e) => { mixerSetVolume(ch.mood, parseFloat(e.target.value)); setMixerRefresh((v) => v + 1); }}
                      className="flex-1 h-1 accent-teal-500 cursor-pointer"
                    />
                    <span className="text-[7px] text-slate-600 w-5 text-right">{Math.round(ch.volume * 100)}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
