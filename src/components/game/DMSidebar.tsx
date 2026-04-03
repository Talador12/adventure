// DMSidebar — collapsible left panel with Encounter, NPC, and Notes tabs.
// Extracted from Game.tsx to reduce file size.
import { useState, useRef, useEffect } from 'react';
import { useGame, calculateEncounterBudget, type Unit } from '../../contexts/GameContext';
import { XP_THRESHOLDS } from '../../types/game';
import type { EncounterTemplate } from '../../types/game';
import HomebrewEditor from './HomebrewEditor';
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
import CampaignAnalytics from './CampaignAnalytics';
import QuestBranching from './QuestBranching';
import PuzzleEncounter from './PuzzleEncounter';
import { TACTICAL_MARKERS } from '../../data/tacticalMarkers';
import { ROOM_TEMPLATES, formatRoomDescription } from '../../data/dungeonRoomTemplates';
import { RECIPES as CRAFTING_RECIPES, formatRecipe as formatCraftingRecipe, getMaterialCost as getMaterialCostFn } from '../../lib/crafting';
import { TRAP_TEMPLATES as TRAP_TEMPLATES_DATA, formatTrap as formatTrapFn } from '../../data/trapDesigner';
import { DOWNTIME_ACTIVITIES as DOWNTIME_DATA } from '../../lib/downtimeActivities';
import { WAVE_TEMPLATES as WAVE_TEMPLATES_DATA } from '../../lib/encounterWaves';
import { PATRONS as PATRON_DATA, formatPatron as formatPatronFn } from '../../data/deityPatrons';
import { LEGENDARY_TEMPLATES as LEGENDARY_DATA } from '../../lib/legendaryActions';
import { DIALOGUE_TEMPLATES as DIALOGUE_DATA } from '../../data/dialogueTrees';
import { LAIR_THEMES as LAIR_DATA } from '../../data/lairEffects';
import { BULK_PRESETS as BULK_PRESETS_DATA } from '../../lib/bulkNpcGenerator';
import { PRESET_TABLES as ENCOUNTER_TABLE_DATA } from '../../data/encounterTableBuilder';
import { MINION_TEMPLATES as MINION_DATA } from '../../lib/minionRules';

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
  // DM personality
  dmPersonality?: import('../../data/dmPersonalities').DMPersonality;
  setDmPersonality?: (v: import('../../data/dmPersonalities').DMPersonality) => void;
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
  // Campaign analytics
  combatLog?: string[];
  dmHistory?: string[];
  // Weather progression
  weatherForecast?: import('../../lib/weatherProgression').WeatherForecast | null;
  // Quest branching
  activeQuestChoice?: import('../../data/questBranching').QuestChoice | null;
  questChoices?: import('../../data/questBranching').QuestChoice[];
  onQuestChoose?: (option: import('../../data/questBranching').QuestOption, choice: import('../../data/questBranching').QuestChoice) => void;
  onQuestDismiss?: () => void;
  onTriggerQuestBranch?: (choice: import('../../data/questBranching').QuestChoice) => void;
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
  dmPersonality,
  setDmPersonality,
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
  combatLog,
  dmHistory,
  weatherForecast,
  activeQuestChoice,
  questChoices,
  onQuestChoose,
  onQuestDismiss,
  onTriggerQuestBranch,
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
            {/* Campaign Analytics (expandable) */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all cursor-pointer px-2">
                📊 Campaign Analytics
              </summary>
              <div className="mt-1 p-2 rounded bg-slate-900/50 border border-slate-800/50">
                <CampaignAnalytics combatLog={combatLog || []} characters={characters} dmHistory={dmHistory || []} />
              </div>
            </details>

            {/* Quest branching */}
            {(activeQuestChoice || (questChoices && questChoices.length > 0)) && (
              <div className="mb-2">
                <QuestBranching
                  activeChoice={activeQuestChoice || null}
                  onChoose={(opt, qc) => onQuestChoose?.(opt, qc)}
                  onDismiss={() => onQuestDismiss?.()}
                  isDM={true}
                  choices={questChoices || []}
                  onTriggerBranch={onTriggerQuestBranch}
                />
              </div>
            )}
            {!activeQuestChoice && (!questChoices || questChoices.length === 0) && onTriggerQuestBranch && (
              <QuestBranching
                activeChoice={null}
                onChoose={() => {}}
                onDismiss={() => {}}
                isDM={true}
                choices={[]}
                onTriggerBranch={onTriggerQuestBranch}
              />
            )}

            {/* Weather forecast */}
            {weatherForecast && (
              <div className="mb-2 px-2 py-1.5 rounded bg-sky-900/20 border border-sky-600/30 text-[9px] text-sky-400">
                <span className="font-semibold">Forecast:</span>{' '}
                {weatherForecast.next !== weatherForecast.current
                  ? `${weatherForecast.next === 'none' ? 'Clearing up' : weatherForecast.next} in ~${weatherForecast.hoursUntilChange}h`
                  : 'No change expected'}
              </div>
            )}

            {/* Tavern Rumors */}
            <button
              onClick={async () => {
                const { rollRumors } = await import('../../data/tavernRumors');
                const rumors = rollRumors(3);
                const lines = rumors.map((r) => {
                  const tag = r.type === 'helpful' ? '✅' : r.type === 'misleading' ? '⚠️' : r.type === 'ominous' ? '💀' : '😄';
                  return `${tag} ${r.text}${r.questHook ? ' *(quest hook)*' : ''}`;
                });
                onAddDmMessage(`🍺 **Tavern Rumors:**\n${lines.join('\n')}`);
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Roll 3 tavern rumors — mix of helpful, misleading, ominous, and humorous"
            >
              Roll Tavern Rumors
            </button>

            {/* Generate Backstory Plot Hooks */}
            <button
              onClick={async () => {
                const backstories = characters.filter((c) => c.backstory?.trim()).map((c) => `${c.name} (${c.race} ${c.class}): ${c.backstory.slice(0, 200)}`).join('\n');
                if (!backstories) { onAddDmMessage('*No character backstories to generate hooks from.*'); return; }
                try {
                  const res = await fetch('/api/dm/narrate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: `Generate 3 plot hooks that tie into these character backstories. Each hook should reference a specific character by name and connect to their history.`, context: backstories, history: [] }),
                  });
                  const data = await res.json() as { narration?: string };
                  if (data.narration) onAddDmMessage(`🎣 **Backstory Plot Hooks:**\n${data.narration}`);
                } catch { onAddDmMessage('*Failed to generate plot hooks.*'); }
              }}
              disabled={!characters.some((c) => c.backstory?.trim())}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-rose-600/20 border border-rose-500/40 text-rose-400 font-semibold hover:bg-rose-500/30 transition-all disabled:opacity-30"
              title="Generate AI plot hooks tied to character backstories"
            >
              Generate Backstory Hooks
            </button>

            {/* Backstory-driven random events */}
            <button
              onClick={async () => {
                const { rollBackstoryEvent, formatBackstoryEvent } = await import('../../data/backstoryEvents');
                const result = rollBackstoryEvent(characters);
                if (result) {
                  onAddDmMessage(formatBackstoryEvent(result.character, result.event));
                } else {
                  onAddDmMessage('*No backstory-driven events available. Characters need more backstory detail.*');
                }
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all disabled:opacity-30"
              title="Roll a random event driven by character backstories"
            >
              🎭 Backstory Event
            </button>

            {/* Encounter Puzzles */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all cursor-pointer px-2">
                🧩 Encounter Puzzles
              </summary>
              <div className="mt-1 p-2 rounded bg-slate-900/50 border border-slate-800/50">
                <PuzzleEncounter onAddDmMessage={onAddDmMessage} />
              </div>
            </details>

            {/* Formation AI Suggestion */}
            <button
              onClick={async () => {
                const { suggestFormation, formatFormationAdvice } = await import('../../lib/formationAI');
                const playerPositions = mapPositions.filter((p) => units.find((u) => u.id === p.unitId && u.type === 'player'));
                const enemyPositions = mapPositions.filter((p) => units.find((u) => u.id === p.unitId && u.type === 'enemy' && u.hp > 0)).map((p) => ({ col: p.col, row: p.row }));
                const terrain = (() => { try { return JSON.parse(localStorage.getItem(`adventure:terrain:${roomId}`) || '[]'); } catch { return []; } })();
                const suggestions = suggestFormation(characters, playerPositions, terrain, enemyPositions, 20, 20);
                onAddDmMessage(formatFormationAdvice(suggestions));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all disabled:opacity-30"
              title="AI suggests optimal party positions based on class roles"
            >
              🗺️ Formation AI
            </button>

            {/* Session Pacing Advisor */}
            <button
              onClick={async () => {
                const { analyzePacing, formatPacingAdvice } = await import('../../lib/sessionPacing');
                const sessionStart = parseInt(localStorage.getItem(`adventure:sessionStart:${roomId}`) || String(Date.now()), 10);
                const sessionMinutes = (Date.now() - sessionStart) / 60000;
                const partyHp = characters.length > 0 ? characters.reduce((s, c) => s + c.hp / Math.max(1, c.maxHp), 0) / characters.length : 1;
                const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0);
                const enemyHp = enemies.length > 0 ? enemies.reduce((s, e) => s + e.hp / Math.max(1, e.maxHp), 0) / enemies.length : 0;
                const combatRound = inCombat ? units.filter((u) => u.isCurrentTurn).length > 0 ? Math.ceil(units.length / Math.max(1, units.length)) : 1 : 0;
                const advice = analyzePacing(combatRound, inCombat, partyHp, enemyHp, (combatLog || []).length, (dmHistory || []).length, sessionMinutes, 0);
                onAddDmMessage(formatPacingAdvice(advice));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-sky-900/20 border border-sky-600/30 text-sky-400 font-semibold hover:bg-sky-800/30 transition-all"
              title="AI analyzes session pacing and suggests transitions"
            >
              🎬 Pacing Advisor
            </button>

            {/* Tactical markers */}
            <details className="mb-3">
              <summary className="w-full text-[10px] py-1.5 rounded bg-rose-900/20 border border-rose-600/30 text-rose-400 font-semibold hover:bg-rose-800/30 transition-all cursor-pointer px-2">
                🗡️ Tactical Markers
              </summary>
              <div className="mt-1 space-y-1">
                {TACTICAL_MARKERS.map((m) => (
                  <button
                    key={m.type}
                    onClick={() => {
                      onAddDmMessage(`${m.emoji} **${m.label}**: ${m.description}\n*Use the Pin tool on the map to place this marker.*`);
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-rose-600/40 transition-all flex items-center gap-2"
                    title={m.description}
                  >
                    <span>{m.emoji}</span>
                    <span className="text-[9px] text-slate-300">{m.label}</span>
                    <span className="text-[8px] text-slate-600 ml-auto truncate max-w-[120px]">{m.description}</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Party Rivalry Board */}
            <button
              onClick={async () => {
                const { parseRivalryFromLog, formatRivalryBoard } = await import('../../lib/characterRivalry');
                const names = characters.map((c) => c.name);
                const stats = parseRivalryFromLog(combatLog || [], names);
                onAddDmMessage(formatRivalryBoard(stats));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all disabled:opacity-30"
              title="Show competitive stats leaderboard between party members"
            >
              🏆 Rivalry Board
            </button>

            {/* Encounter Difficulty Predictor */}
            <button
              onClick={async () => {
                const { predictEncounter, formatPrediction } = await import('../../lib/encounterPredictor');
                const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0);
                const enemyProfiles = enemies.map((e) => ({
                  hp: e.maxHp, ac: e.ac, attackBonus: e.attackBonus || 0,
                  avgDamage: (e.damageBonus || 0) + 4, count: 1,
                }));
                // Group identical enemies
                const grouped: Record<string, typeof enemyProfiles[0]> = {};
                for (const ep of enemyProfiles) {
                  const key = `${ep.hp}-${ep.ac}-${ep.attackBonus}`;
                  if (grouped[key]) grouped[key].count++;
                  else grouped[key] = { ...ep };
                }
                const prediction = predictEncounter(characters, Object.values(grouped));
                onAddDmMessage(formatPrediction(prediction));
              }}
              disabled={characters.length === 0 || !units.some((u) => u.type === 'enemy' && u.hp > 0)}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all disabled:opacity-30"
              title="Predict encounter outcome — win probability, TPK risk, estimated rounds"
            >
              🔮 Predict Encounter
            </button>

            {/* Party Resources */}
            <button
              onClick={async () => {
                const { loadResources, formatResourceStatus, getResourceWarnings } = await import('../../lib/partyResources');
                const resources = loadResources(roomId);
                const status = formatResourceStatus(resources);
                const warnings = getResourceWarnings(resources);
                onAddDmMessage(status + (warnings.length > 0 ? '\n\n' + warnings.join('\n') : ''));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-emerald-900/20 border border-emerald-600/30 text-emerald-400 font-semibold hover:bg-emerald-800/30 transition-all"
              title="Show party shared supplies — rations, arrows, torches, etc."
            >
              📦 Party Resources
            </button>

            {/* Morale check */}
            <button
              onClick={async () => {
                const { checkMorale, createMoraleState, getMoraleTierFromCR } = await import('../../lib/morale');
                const enemies = units.filter((u) => u.type === 'enemy');
                const alive = enemies.filter((u) => u.hp > 0);
                if (alive.length === 0) { onAddDmMessage('No living enemies to check morale.'); return; }
                const state = createMoraleState(enemies.length);
                const avgCR = alive.reduce((s, e) => s + (e.cr || 0), 0) / alive.length;
                const result = checkMorale(state, getMoraleTierFromCR(avgCR), alive.map((u) => ({ id: u.id, name: u.name, hp: u.hp })));
                onAddDmMessage(result.narration || `Morale holds — ${alive.length} enemies remain steadfast.`);
              }}
              disabled={!inCombat || !units.some((u) => u.type === 'enemy' && u.hp > 0)}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all disabled:opacity-30"
              title="Check if enemies flee — based on casualties and CR"
            >
              💨 Morale Check
            </button>

            {/* Faction standings */}
            <button
              onClick={async () => {
                const { loadGlobalFactions, formatFactionStandings } = await import('../../lib/factionReputation');
                onAddDmMessage(formatFactionStandings(loadGlobalFactions()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all"
              title="Show global faction reputation standings across campaigns"
            >
              ⚔️ Faction Standings
            </button>

            {/* Initiative variant info */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all cursor-pointer px-2">
                🎲 Initiative Variants
              </summary>
              <div className="mt-1 space-y-1">
                {(['standard', 'side', 'popcorn', 'speed_factor'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={async () => {
                      const { formatVariantRules } = await import('../../lib/initiativeVariants');
                      onAddDmMessage(formatVariantRules(v));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-cyan-600/40 transition-all text-[9px] text-slate-300"
                  >
                    {v === 'standard' ? '📋' : v === 'side' ? '⚔️' : v === 'popcorn' ? '🍿' : '⚡'} {v.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </details>

            {/* Spell component costs */}
            <button
              onClick={async () => {
                const { formatComponentList } = await import('../../data/spellComponents');
                const knownSpells: string[] = [];
                for (const c of characters) {
                  if (c.spells) for (const s of c.spells) knownSpells.push(s.name);
                }
                onAddDmMessage(formatComponentList(knownSpells.length > 0 ? knownSpells : ['Revivify', 'Raise Dead', 'Find Familiar', 'Stoneskin']));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-pink-900/20 border border-pink-600/30 text-pink-400 font-semibold hover:bg-pink-800/30 transition-all"
              title="Show material component costs for party spells"
            >
              💎 Spell Components
            </button>

            {/* Travel encounter */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-lime-900/20 border border-lime-600/30 text-lime-400 font-semibold hover:bg-lime-800/30 transition-all cursor-pointer px-2">
                🗺️ Travel Encounters
              </summary>
              <div className="mt-1 space-y-1">
                {(['forest', 'mountain', 'desert', 'swamp', 'plains', 'coast', 'underdark', 'arctic'] as const).map((biome) => (
                  <button
                    key={biome}
                    onClick={async () => {
                      const { rollTravelEncounter, formatTravelEvent } = await import('../../data/travelEncounters');
                      onAddDmMessage(formatTravelEvent(rollTravelEncounter(biome)));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-lime-600/40 transition-all text-[9px] text-slate-300 capitalize"
                  >
                    {biome === 'forest' ? '🌲' : biome === 'mountain' ? '⛰️' : biome === 'desert' ? '🏜️' : biome === 'swamp' ? '🐊' : biome === 'plains' ? '🌾' : biome === 'coast' ? '🌊' : biome === 'underdark' ? '🕳️' : '❄️'} {biome}
                  </button>
                ))}
              </div>
            </details>

            {/* Dungeon room templates */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all cursor-pointer px-2">
                🏚️ Dungeon Room Templates
              </summary>
              <div className="mt-1 space-y-1">
                {ROOM_TEMPLATES.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => {
                      onAddDmMessage(formatRoomDescription(room));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-stone-500/40 transition-all flex items-center gap-2"
                    title={room.description}
                  >
                    <span>{room.emoji}</span>
                    <span className="text-[9px] text-slate-300">{room.name}</span>
                    <span className="text-[8px] text-slate-600 ml-auto">{room.width}×{room.height}</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Haggle */}
            <button
              onClick={async () => {
                const { haggle, formatHaggleResult, getPersonalityFromDisposition } = await import('../../lib/haggling');
                const selectedChar = characters.find((c) => c.id === selectedCharacterId);
                if (!selectedChar) { onAddDmMessage('Select a character to haggle.'); return; }
                const chaMod = Math.floor((selectedChar.stats.CHA - 10) / 2);
                const profBonus = Math.floor((selectedChar.level - 1) / 4) + 2;
                const price = parseInt(window.prompt('Item price (gp):', '100') || '0', 10);
                if (!price) return;
                const result = haggle(price, chaMod, 'fair', profBonus);
                onAddDmMessage(formatHaggleResult(result, 'item'));
              }}
              disabled={!selectedCharacterId}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all disabled:opacity-30"
              title="CHA-based haggling mini-game with the selected character"
            >
              🤝 Haggle Price
            </button>

            {/* Session recap */}
            <button
              onClick={async () => {
                const { generateRecap, formatRecap } = await import('../../lib/sessionRecap');
                const recap = generateRecap({
                  dmHistory: dmHistory || [],
                  combatLog: combatLog || [],
                  sceneName: '',
                  characterNames: characters.map((c) => c.name),
                  questsCompleted: [],
                  npcsEncountered: [],
                  goldChange: 0,
                  xpGained: 0,
                  combatCount: (combatLog || []).filter((l) => l.match(/^--- Round 1/)).length,
                  deathCount: (combatLog || []).filter((l) => l.includes('falls!')).length,
                  sessionDurationMinutes: 0,
                });
                onAddDmMessage(formatRecap(recap));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all"
              title="Generate a session recap for catch-up at the next session"
            >
              📜 Session Recap
            </button>

            {/* Character bonds */}
            <button
              onClick={async () => {
                const { formatBondStatus, BOND_CONFIGS } = await import('../../lib/characterBonds');
                const bondsRaw = localStorage.getItem(`adventure:bonds:${roomId}`);
                const bonds = bondsRaw ? JSON.parse(bondsRaw) : [];
                const nameMap: Record<string, string> = {};
                for (const c of characters) nameMap[c.id] = c.name;
                if (bonds.length > 0) {
                  onAddDmMessage(formatBondStatus(bonds, nameMap));
                } else {
                  onAddDmMessage('💫 **Character Bonds:**\nNo bonds formed yet. Bond types: ' + BOND_CONFIGS.map((b: any) => `${b.emoji} ${b.name}`).join(', '));
                }
              }}
              disabled={characters.length < 2}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-fuchsia-900/20 border border-fuchsia-600/30 text-fuchsia-400 font-semibold hover:bg-fuchsia-800/30 transition-all disabled:opacity-30"
              title="View or form bonds between party members for combat bonuses"
            >
              💫 Character Bonds
            </button>

            {/* Exhaustion tracker */}
            <button
              onClick={async () => {
                const { formatExhaustionStatus } = await import('../../lib/exhaustionTracker');
                const lines = characters.map((c) => formatExhaustionStatus(c.name, (c.exhaustion || 0) as any));
                onAddDmMessage(lines.join('\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-gray-700/30 border border-gray-500/30 text-gray-300 font-semibold hover:bg-gray-600/30 transition-all disabled:opacity-30"
              title="Show exhaustion levels and effects for all characters"
            >
              😴 Exhaustion Status
            </button>

            {/* Random NPC generator */}
            <button
              onClick={async () => {
                const { generateRandomNpc, formatGeneratedNpc } = await import('../../data/randomNpcGenerator');
                onAddDmMessage(formatGeneratedNpc(generateRandomNpc()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all"
              title="Generate a random NPC with name, personality, secret, and plot hook"
            >
              👤 Random NPC
            </button>

            {/* Crafting recipes */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all cursor-pointer px-2">
                🔨 Crafting Recipes
              </summary>
              <div className="mt-1 space-y-1 max-h-40 overflow-y-auto">
                {CRAFTING_RECIPES.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => onAddDmMessage(formatCraftingRecipe(recipe))}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-yellow-600/40 transition-all flex items-center justify-between"
                    title={recipe.resultItem.description}
                  >
                    <span className="text-[9px] text-slate-300 truncate">{recipe.name}</span>
                    <span className="text-[8px] text-slate-500">{getMaterialCostFn(recipe)}gp</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Mounted combat */}
            <button
              onClick={async () => {
                const { formatMountList } = await import('../../lib/mountedCombat');
                onAddDmMessage(formatMountList());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-300 font-semibold hover:bg-amber-800/30 transition-all"
              title="Show available mounts with stats, speed, and special abilities"
            >
              🐎 Mounts & Mounted Combat
            </button>

            {/* Stronghold */}
            <button
              onClick={async () => {
                const { STRONGHOLD_TYPES } = await import('../../lib/stronghold');
                const lines = ['🏰 **Stronghold Options:**'];
                for (const s of STRONGHOLD_TYPES) {
                  lines.push(`${s.emoji} **${s.name}** (${s.baseCost}gp) — ${s.description}`);
                  lines.push(`  Income: ${s.baseIncome}gp/week | Upkeep: ${s.baseUpkeep}gp/week | Upgrades: ${s.upgrades.length}`);
                }
                onAddDmMessage(lines.join('\n'));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all"
              title="Browse stronghold types the party can acquire and upgrade"
            >
              🏰 Strongholds
            </button>

            {/* Sidekick/henchman */}
            <button
              onClick={async () => {
                const { SIDEKICK_TEMPLATES, formatSidekick, createSidekick } = await import('../../lib/sidekicks');
                const lines = ['👥 **Sidekick Templates:**'];
                for (const t of SIDEKICK_TEMPLATES) {
                  const example = createSidekick(`Example ${t.name}`, t.role, 5);
                  lines.push(`${t.emoji} **${t.name}** — ${t.description}`);
                  lines.push(`  Lv5: ${example.hp} HP, AC ${example.ac}, +${example.attackBonus} (${example.damageDie})`);
                }
                onAddDmMessage(lines.join('\n'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all"
              title="Browse sidekick types — simplified NPC companions that level with the party"
            >
              👥 Sidekicks
            </button>

            {/* Trap designer */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all cursor-pointer px-2">
                🪤 Trap Templates
              </summary>
              <div className="mt-1 space-y-1 max-h-40 overflow-y-auto">
                {TRAP_TEMPLATES_DATA.map((trap) => (
                  <button
                    key={trap.id}
                    onClick={() => onAddDmMessage(formatTrapFn(trap))}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-red-600/40 transition-all flex items-center justify-between"
                    title={trap.description}
                  >
                    <span className="text-[9px] text-slate-300 truncate">{trap.name}</span>
                    <span className="text-[8px] text-slate-500">DC {trap.saveDC}</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Weather combat effects */}
            <button
              onClick={async () => {
                const { formatWeatherCombatEffects } = await import('../../lib/weatherCombatModifiers');
                onAddDmMessage(formatWeatherCombatEffects(weather));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-sky-900/20 border border-sky-600/30 text-sky-400 font-semibold hover:bg-sky-800/30 transition-all"
              title="Show combat modifiers from current weather"
            >
              🌧️ Weather Combat Effects
            </button>

            {/* Downtime activities */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all cursor-pointer px-2">
                ☕ Downtime Activities
              </summary>
              <div className="mt-1 space-y-1 max-h-40 overflow-y-auto">
                {DOWNTIME_DATA.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={async () => {
                      const { resolveDowntime, formatDowntimeResult } = await import('../../lib/downtimeActivities');
                      const result = resolveDowntime(activity, 2, 3);
                      onAddDmMessage(formatDowntimeResult(activity, result));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-green-600/40 transition-all flex items-center justify-between"
                    title={activity.description}
                  >
                    <span className="text-[9px] text-slate-300">{activity.emoji} {activity.name}</span>
                    <span className="text-[8px] text-slate-500">{activity.daysRequired}d / {activity.goldCost}gp</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Monster lore journal */}
            <button
              onClick={async () => {
                const { formatJournal, createJournal } = await import('../../lib/monsterLore');
                const raw = localStorage.getItem(`adventure:lore:${roomId}`);
                const journal = raw ? JSON.parse(raw) : createJournal();
                onAddDmMessage(formatJournal(journal));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Monster lore journal — stats revealed as players encounter monsters"
            >
              📖 Monster Lore
            </button>

            {/* Alignment tracker */}
            <button
              onClick={async () => {
                const { createAlignmentState, formatAlignmentStatus, MORAL_CHOICES } = await import('../../lib/alignmentTracker');
                const lines = characters.map((c) => {
                  const raw = localStorage.getItem(`adventure:alignment:${c.id}`);
                  const state = raw ? JSON.parse(raw) : createAlignmentState(c.id);
                  return formatAlignmentStatus(state, c.name);
                });
                lines.push('\n**Moral Choices:** ' + Object.keys(MORAL_CHOICES).map((k) => k.replace(/_/g, ' ')).join(', '));
                onAddDmMessage(lines.join('\n\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all disabled:opacity-30"
              title="Show alignment tracking with moral choice history"
            >
              ⚖️ Alignment Tracker
            </button>

            {/* Skill challenge */}
            <button
              onClick={async () => {
                const { SKILL_CHALLENGE_TEMPLATES, createChallenge, formatChallengeStatus } = await import('../../lib/skillChallenge');
                const template = SKILL_CHALLENGE_TEMPLATES[Math.floor(Math.random() * SKILL_CHALLENGE_TEMPLATES.length)];
                const challenge = createChallenge(template);
                onAddDmMessage(formatChallengeStatus(challenge));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all"
              title="Start a skill challenge — multiple checks toward success/failure threshold"
            >
              🎯 Skill Challenge
            </button>

            {/* Treasure generator */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all cursor-pointer px-2">
                💰 Random Treasure
              </summary>
              <div className="mt-1 space-y-1">
                {(['minor', 'moderate', 'major', 'legendary'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={async () => {
                      const { generateTreasure, formatTreasure } = await import('../../data/treasureGenerator');
                      onAddDmMessage(formatTreasure(generateTreasure(tier)));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-yellow-600/40 transition-all text-[9px] text-slate-300 capitalize"
                  >
                    {tier === 'minor' ? '🟢' : tier === 'moderate' ? '🟡' : tier === 'major' ? '🟠' : '🔴'} {tier} (CR {tier === 'minor' ? '0-4' : tier === 'moderate' ? '5-10' : tier === 'major' ? '11-16' : '17+'})
                  </button>
                ))}
              </div>
            </details>

            {/* Encounter waves */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all cursor-pointer px-2">
                🌊 Encounter Waves
              </summary>
              <div className="mt-1 space-y-1">
                {WAVE_TEMPLATES_DATA.map((template, i) => (
                  <button
                    key={i}
                    onClick={async () => {
                      const { createWaveEncounter, formatWaveStatus } = await import('../../lib/encounterWaves');
                      onAddDmMessage(formatWaveStatus(createWaveEncounter(template)));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-red-600/40 transition-all text-[9px] text-slate-300"
                  >
                    ⚔️ {template.name} ({template.waves.length} waves)
                  </button>
                ))}
              </div>
            </details>

            {/* Combat maneuvers */}
            <button
              onClick={async () => {
                const { formatManeuverList } = await import('../../data/combatManeuvers');
                onAddDmMessage(formatManeuverList());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all"
              title="Show extended combat maneuvers — disarm, trip, feint, called shot, etc."
            >
              ⚔️ Combat Maneuvers
            </button>

            {/* Session timer */}
            <button
              onClick={async () => {
                const { createSessionTimer, formatTimerStatus } = await import('../../lib/sessionTimer');
                const key = `adventure:timer:${roomId}`;
                let timer;
                try { timer = JSON.parse(localStorage.getItem(key) || ''); } catch { timer = createSessionTimer(); localStorage.setItem(key, JSON.stringify(timer)); }
                onAddDmMessage(formatTimerStatus(timer));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-slate-700/30 border border-slate-500/30 text-slate-300 font-semibold hover:bg-slate-600/30 transition-all"
              title="Session timer with milestone alerts"
            >
              ⏱️ Session Timer
            </button>

            {/* PC Reputation */}
            <button
              onClick={async () => {
                const { createPCReputation, formatPCReputation } = await import('../../lib/pcReputation');
                const lines = characters.map((c) => {
                  const raw = localStorage.getItem(`adventure:rep:${c.id}`);
                  const state = raw ? JSON.parse(raw) : createPCReputation(c.id);
                  return formatPCReputation(state, c.name);
                });
                onAddDmMessage(lines.join('\n\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-300 font-semibold hover:bg-amber-800/30 transition-all disabled:opacity-30"
              title="Per-character fame/infamy reputation across regions"
            >
              🌟 PC Reputation
            </button>

            {/* Deity/patron browser */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all cursor-pointer px-2">
                🙏 Deity/Patron Browser
              </summary>
              <div className="mt-1 space-y-1 max-h-40 overflow-y-auto">
                {PATRON_DATA.map((patron) => (
                  <button
                    key={patron.id}
                    onClick={() => onAddDmMessage(formatPatronFn(patron))}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-purple-600/40 transition-all flex items-center gap-2"
                    title={patron.description}
                  >
                    <span>{patron.emoji}</span>
                    <span className="text-[9px] text-slate-300">{patron.name}</span>
                    <span className="text-[8px] text-slate-500 ml-auto">{patron.type}</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Wilderness map gen */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all cursor-pointer px-2">
                🌲 Wilderness Map Gen
              </summary>
              <div className="mt-1 space-y-1">
                {(['forest', 'desert', 'swamp', 'mountain', 'coast', 'plains', 'tundra'] as const).map((biome) => (
                  <button
                    key={biome}
                    onClick={async () => {
                      const { formatMapGenResult } = await import('../../lib/wildernessMapGen');
                      onAddDmMessage(formatMapGenResult(biome, 20, 16));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-green-600/40 transition-all text-[9px] text-slate-300 capitalize"
                  >
                    {biome}
                  </button>
                ))}
              </div>
            </details>

            {/* Ambient sounds */}
            <button
              onClick={async () => {
                const { formatAmbientDescription } = await import('../../data/ambientSounds');
                const environments = ['dungeon', 'forest-day', 'tavern', 'cave', 'city-day'];
                const env = environments[Math.floor(Math.random() * environments.length)];
                onAddDmMessage(formatAmbientDescription(env));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all"
              title="Random ambient sound description for immersion"
            >
              🔊 Ambient Sounds
            </button>

            {/* Rest variant info */}
            <button
              onClick={async () => {
                const { REST_VARIANTS, formatRestVariant } = await import('../../lib/spellSlotRecovery');
                const lines = REST_VARIANTS.map((v) => formatRestVariant(v.variant));
                onAddDmMessage(lines.join('\n\n'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all"
              title="Compare rest/recovery variants — standard, arcane recovery, gritty realism"
            >
              😴 Rest Variants
            </button>

            {/* Initiative tiebreaker */}
            <button
              onClick={async () => {
                const { formatTiebreakerRules } = await import('../../lib/initiativeTiebreaker');
                onAddDmMessage(formatTiebreakerRules());
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-slate-700/30 border border-slate-500/30 text-slate-300 font-semibold hover:bg-slate-600/30 transition-all"
              title="Browse initiative tiebreaker house rules"
            >
              🎲 Tiebreaker Rules
            </button>

            {/* Inspiration */}
            <button
              onClick={async () => {
                const { formatInspirationStatus, createInspirationState } = await import('../../lib/inspirationSystem');
                const states = characters.map((c) => {
                  const raw = localStorage.getItem(`adventure:inspiration:${c.id}`);
                  return raw ? JSON.parse(raw) : createInspirationState(c.id);
                });
                const names: Record<string, string> = {};
                for (const c of characters) names[c.id] = c.name;
                onAddDmMessage(formatInspirationStatus(states, names));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all disabled:opacity-30"
              title="View inspiration status for all characters"
            >
              ⭐ Inspiration
            </button>

            {/* Encounter frequency check */}
            <button
              onClick={async () => {
                const { createFrequencyConfig, rollEncounterCheck, formatEncounterCheck, getTimeOfDayFromHour } = await import('../../lib/encounterFrequency');
                const hour = 12; // default to noon; DM can note actual hour in narration
                const timeOfDay = getTimeOfDayFromHour(hour);
                const config = createFrequencyConfig('moderate');
                const result = rollEncounterCheck(config, timeOfDay, true);
                onAddDmMessage(formatEncounterCheck(result));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all"
              title="Roll to see if a random encounter occurs — factors in terrain danger and time of day"
            >
              🎲 Encounter Check
            </button>

            {/* Concentration tracker */}
            <button
              onClick={async () => {
                const { createConcentrationState, formatConcentrationStatus } = await import('../../lib/concentrationTracker');
                const raw = localStorage.getItem(`adventure:concentration:${roomId}`);
                const state = raw ? JSON.parse(raw) : createConcentrationState();
                onAddDmMessage(formatConcentrationStatus(state));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all"
              title="View who is concentrating on spells and manage concentration checks"
            >
              🔮 Concentration
            </button>

            {/* Legendary actions */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-300 font-semibold hover:bg-amber-800/30 transition-all cursor-pointer px-2">
                👑 Legendary Monsters
              </summary>
              <div className="mt-1 space-y-1">
                {LEGENDARY_DATA.map((t, i) => (
                  <button
                    key={i}
                    onClick={async () => {
                      const { createLegendaryMonster, formatLegendaryStatus } = await import('../../lib/legendaryActions');
                      onAddDmMessage(formatLegendaryStatus(createLegendaryMonster(t)));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-amber-600/40 transition-all text-[9px] text-slate-300"
                  >
                    👑 {t.name} ({t.maxLegendaryActions} LA{t.hasLair ? ' + Lair' : ''})
                  </button>
                ))}
              </div>
            </details>

            {/* Treasure division */}
            <button
              onClick={async () => {
                const { divideTreasure, formatDivision } = await import('../../lib/treasureDivision');
                const gold = parseInt(window.prompt('Total gold to divide:', '100') || '0', 10);
                if (!gold) return;
                const result = divideTreasure(gold, [], characters);
                onAddDmMessage(formatDivision(result));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-emerald-900/20 border border-emerald-600/30 text-emerald-400 font-semibold hover:bg-emerald-800/30 transition-all disabled:opacity-30"
              title="Auto-divide gold among party with fairness scoring"
            >
              💰 Divide Treasure
            </button>

            {/* Saved formations */}
            <button
              onClick={async () => {
                const { loadFormations, formatFormationList } = await import('../../lib/partyFormationMemory');
                onAddDmMessage(formatFormationList(loadFormations(roomId)));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all"
              title="View and load saved party formations"
            >
              📐 Saved Formations
            </button>

            {/* Surprise round */}
            <button
              onClick={async () => {
                const { rollSurprise, formatSurpriseResult } = await import('../../lib/surpriseRound');
                const players = characters.map((c) => ({ id: c.id, name: c.name, isPlayer: true, stealthMod: Math.floor((c.stats.DEX - 10) / 2), passivePerception: 10 + Math.floor((c.stats.WIS - 10) / 2) }));
                const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0).map((u) => ({ id: u.id, name: u.name, isPlayer: false, stealthMod: u.dexMod || 0, passivePerception: 10 }));
                if (enemies.length === 0) { onAddDmMessage('No enemies to check surprise against.'); return; }
                const result = rollSurprise(enemies, players); // enemies ambushing players
                onAddDmMessage(formatSurpriseResult(result));
              }}
              disabled={!units.some((u) => u.type === 'enemy' && u.hp > 0)}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all disabled:opacity-30"
              title="Roll surprise — enemies' stealth vs party's passive perception"
            >
              💥 Surprise Check
            </button>

            {/* Condition duration */}
            <button
              onClick={async () => {
                const { createConditionState, formatConditionStatus } = await import('../../lib/conditionDuration');
                const raw = localStorage.getItem(`adventure:conditions:${roomId}`);
                const state = raw ? JSON.parse(raw) : createConditionState();
                onAddDmMessage(formatConditionStatus(state));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all"
              title="View active conditions and their remaining durations"
            >
              ⏳ Condition Durations
            </button>

            {/* XP milestones */}
            <button
              onClick={async () => {
                const { createMilestoneTracker, formatMilestoneTracker } = await import('../../lib/xpMilestones');
                const raw = localStorage.getItem(`adventure:milestones:${roomId}`);
                const tracker = raw ? JSON.parse(raw) : createMilestoneTracker();
                onAddDmMessage(formatMilestoneTracker(tracker));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Story milestones that award XP on completion"
            >
              🏆 XP Milestones
            </button>

            {/* Marching order */}
            <button
              onClick={async () => {
                const { createMarchingOrder, formatMarchingOrder } = await import('../../lib/marchingOrder');
                const order = createMarchingOrder(characters.map((c) => ({ id: c.id, name: c.name, class: c.class })));
                onAddDmMessage(formatMarchingOrder(order));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all disabled:opacity-30"
              title="Auto-assign marching order based on class roles"
            >
              🚶 Marching Order
            </button>

            {/* Dialogue trees */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all cursor-pointer px-2">
                💬 Dialogue Templates
              </summary>
              <div className="mt-1 space-y-1">
                {DIALOGUE_DATA.map((tree) => (
                  <button
                    key={tree.id}
                    onClick={async () => {
                      const { getNode, formatDialogueNode } = await import('../../data/dialogueTrees');
                      const startNode = tree.nodes.find((n) => n.id === tree.startNodeId);
                      if (startNode) onAddDmMessage(formatDialogueNode(tree.npcName, startNode));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-blue-600/40 transition-all text-[9px] text-slate-300"
                  >
                    💬 {tree.npcName}: {tree.description}
                  </button>
                ))}
              </div>
            </details>

            {/* Rest interruption */}
            <button
              onClick={async () => {
                const { rollRestInterruption, calculatePartialRecovery, formatRestResult } = await import('../../lib/restInterruption');
                const attempt = rollRestInterruption('long', 2, true);
                const recovery = calculatePartialRecovery(attempt, 50, 5);
                onAddDmMessage(formatRestResult(attempt, recovery));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all"
              title="Roll for rest interruption — random encounter during long rest with partial recovery"
            >
              🏕️ Rest Interruption Check
            </button>

            {/* Lair effects */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all cursor-pointer px-2">
                🏰 Lair Effects
              </summary>
              <div className="mt-1 space-y-1">
                {LAIR_DATA.map((l) => (
                  <button
                    key={l.theme}
                    onClick={async () => {
                      const { rollLairEffect, formatLairEffect } = await import('../../data/lairEffects');
                      onAddDmMessage(formatLairEffect(l.theme, rollLairEffect(l.theme)));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-red-600/40 transition-all text-[9px] text-slate-300"
                  >
                    {l.emoji} {l.name}
                  </button>
                ))}
              </div>
            </details>

            {/* Minion spawner */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-gray-700/30 border border-gray-500/30 text-gray-300 font-semibold hover:bg-gray-600/30 transition-all cursor-pointer px-2">
                💀 Minion Spawner
              </summary>
              <div className="mt-1 space-y-1">
                {MINION_DATA.map((m) => (
                  <button
                    key={m.id}
                    onClick={async () => {
                      const { formatMinionGroup } = await import('../../lib/minionRules');
                      const count = parseInt(window.prompt(`How many ${m.name}?`, '4') || '0', 10);
                      if (count > 0) onAddDmMessage(formatMinionGroup(m.id, count, count));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-gray-500/40 transition-all flex items-center justify-between text-[9px] text-slate-300"
                  >
                    <span>{m.name}</span>
                    <span className="text-slate-500">AC {m.ac} / {m.staticDamage}dmg</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Bloodied status */}
            <button
              onClick={async () => {
                const { formatBloodiedStatus } = await import('../../lib/bloodiedCondition');
                onAddDmMessage(formatBloodiedStatus(units.map((u) => ({ id: u.id, name: u.name, hp: u.hp, maxHp: u.maxHp, type: u.type }))));
              }}
              disabled={!inCombat}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all disabled:opacity-30"
              title="Show which units are bloodied (<50% HP)"
            >
              🩸 Bloodied Status
            </button>

            {/* Flanking check */}
            <button
              onClick={async () => {
                const { FLANKING_RULES } = await import('../../lib/flankingCalculator');
                const lines = ['⚔️ **Flanking Rules:**'];
                for (const r of FLANKING_RULES) lines.push(`• **${r.name}**: ${r.description}`);
                onAddDmMessage(lines.join('\n'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all"
              title="Show flanking rule options"
            >
              ⚔️ Flanking Rules
            </button>

            {/* Death saves */}
            <button
              onClick={async () => {
                const { createDeathSaveState, rollDeathSave, formatDeathSaveStatus } = await import('../../lib/deathSaveTracker');
                const dying = units.filter((u) => u.type === 'player' && u.hp <= 0);
                if (dying.length === 0) { onAddDmMessage('No characters are making death saves.'); return; }
                const lines: string[] = [];
                for (const u of dying) {
                  const raw = localStorage.getItem(`adventure:deathsave:${u.id}`);
                  const state = raw ? JSON.parse(raw) : createDeathSaveState(u.id, u.name);
                  const result = rollDeathSave(state);
                  localStorage.setItem(`adventure:deathsave:${u.id}`, JSON.stringify(result.state));
                  lines.push(result.narration);
                }
                onAddDmMessage(lines.join('\n\n'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-slate-700/30 border border-slate-500/30 text-slate-300 font-semibold hover:bg-slate-600/30 transition-all"
              title="Roll death saves for downed characters"
            >
              ⚰️ Death Saves
            </button>

            {/* Treasure maps */}
            <button
              onClick={async () => {
                const { TREASURE_MAP_TEMPLATES } = await import('../../data/treasureMaps');
                const lines = ['🗺️ **Treasure Map Templates:**'];
                for (const t of TREASURE_MAP_TEMPLATES) {
                  lines.push(`• **${t.name}** (${t.difficulty}) — ${t.totalFragments} fragments, Reward: ${t.reward}`);
                }
                onAddDmMessage(lines.join('\n'));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Browse treasure map templates — collectible fragments that reveal locations"
            >
              🗺️ Treasure Maps
            </button>

            {/* Reaction tracker */}
            <button
              onClick={async () => {
                const { createReactionState, initializeUnits, formatReactionStatus } = await import('../../lib/reactionTracker');
                let state = createReactionState();
                state = initializeUnits(state, units.map((u) => u.id));
                const names: Record<string, string> = {};
                for (const u of units) names[u.id] = u.name;
                onAddDmMessage(formatReactionStatus(state, names));
              }}
              disabled={!inCombat}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all disabled:opacity-30"
              title="Show which units have used their reaction this round"
            >
              ⚡ Reactions
            </button>

            {/* Ready actions */}
            <button
              onClick={async () => {
                const { createReadyState, formatReadyStatus } = await import('../../lib/readyAction');
                const raw = localStorage.getItem(`adventure:ready:${roomId}`);
                const state = raw ? JSON.parse(raw) : createReadyState();
                onAddDmMessage(formatReadyStatus(state));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all"
              title="View readied actions waiting for their trigger"
            >
              ⏳ Ready Actions
            </button>

            {/* Spell save DCs */}
            <button
              onClick={async () => {
                const { formatPartySpellDCs } = await import('../../lib/spellSaveDC');
                onAddDmMessage(formatPartySpellDCs(characters.map((c) => ({ name: c.name, class: c.class, level: c.level, stats: c.stats }))));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all disabled:opacity-30"
              title="Show spell save DCs and attack bonuses for all casters"
            >
              🎯 Spell Save DCs
            </button>

            {/* Cover check */}
            <button
              onClick={async () => {
                const { COVER_AC_BONUSES } = await import('../../lib/coverDetector');
                onAddDmMessage(`🛡️ **Cover Rules:**\n• **None**: +0 AC\n• **Half**: +2 AC, +2 DEX saves\n• **Three-quarters**: +5 AC, +5 DEX saves\n• **Full**: Can't be targeted directly\n\n*Cover is determined by line-of-sight obstructions between attacker and target.*`);
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all"
              title="Show cover rules and AC bonuses"
            >
              🛡️ Cover Rules
            </button>

            {/* Initiative re-roll */}
            <button
              onClick={async () => {
                const { rerollInitiative, formatRerollResults } = await import('../../lib/initiativeReroll');
                const results = rerollInitiative(units.map((u) => ({ id: u.id, name: u.name, initiative: u.initiative, dexMod: u.dexMod || 0 })));
                const reason = window.prompt('Reason for re-roll:', 'Phase change') || 'DM decision';
                onAddDmMessage(formatRerollResults(results, reason));
              }}
              disabled={!inCombat}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all disabled:opacity-30"
              title="Re-roll initiative for all units — use for dramatic phase changes"
            >
              🎲 Re-Roll Initiative
            </button>

            {/* Wild magic surge */}
            <button
              onClick={async () => {
                const { rollWildMagicCheck, rollSurgeEffect, formatSurgeEffect } = await import('../../data/wildMagicSurge');
                if (rollWildMagicCheck()) {
                  onAddDmMessage(formatSurgeEffect(rollSurgeEffect()));
                } else {
                  onAddDmMessage('🎲 Wild Magic check: No surge this time. (Rolled > 1)');
                }
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-fuchsia-900/20 border border-fuchsia-600/30 text-fuchsia-400 font-semibold hover:bg-fuchsia-800/30 transition-all"
              title="Roll wild magic check — d20, surge on nat 1, then d50 for effect"
            >
              🌀 Wild Magic Surge
            </button>

            {/* Combat stances */}
            <button
              onClick={async () => {
                const { formatStanceOptions } = await import('../../lib/combatStances');
                onAddDmMessage(formatStanceOptions());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all"
              title="Show combat stance options with trade-offs"
            >
              ⚔️ Combat Stances
            </button>

            {/* Terrain escalation */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all cursor-pointer px-2">
                🔥 Terrain Hazard Escalation
              </summary>
              <div className="mt-1 space-y-1">
                {(['fire', 'flood', 'collapse', 'fog', 'acid'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={async () => {
                      const { createEscalation, advanceEscalation } = await import('../../lib/terrainEscalation');
                      const state = createEscalation(type);
                      const result = advanceEscalation(state);
                      onAddDmMessage(result.narration);
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-orange-600/40 transition-all text-[9px] text-slate-300 capitalize"
                  >
                    {type === 'fire' ? '🔥' : type === 'flood' ? '🌊' : type === 'collapse' ? '🪨' : type === 'fog' ? '🌫️' : '🧪'} {type}
                  </button>
                ))}
              </div>
            </details>

            {/* ASI planner */}
            <button
              onClick={async () => {
                const { formatASIPlan } = await import('../../lib/asiPlanner');
                if (selectedCharacterId) {
                  const c = characters.find((ch) => ch.id === selectedCharacterId);
                  if (c) { onAddDmMessage(formatASIPlan(c.class, c.level, c.stats)); return; }
                }
                const lines = characters.map((c) => formatASIPlan(c.class, c.level, c.stats));
                onAddDmMessage(lines.join('\n\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-emerald-900/20 border border-emerald-600/30 text-emerald-400 font-semibold hover:bg-emerald-800/30 transition-all disabled:opacity-30"
              title="ASI/feat recommendations for level-up planning"
            >
              📈 ASI Planner
            </button>

            {/* Healing surges */}
            <button
              onClick={async () => {
                const { createHealingSurgeState, formatSurgeStatus } = await import('../../lib/healingSurge');
                const lines = characters.map((c) => {
                  const conMod = Math.floor((c.stats.CON - 10) / 2);
                  const state = createHealingSurgeState(c.id, c.level, conMod, c.maxHp);
                  return formatSurgeStatus(state, c.name);
                });
                onAddDmMessage(lines.join('\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-pink-900/20 border border-pink-600/30 text-pink-400 font-semibold hover:bg-pink-800/30 transition-all disabled:opacity-30"
              title="4e-style healing surges — bonus healing for recovery-poor parties"
            >
              💉 Healing Surges
            </button>

            {/* Warband */}
            <button
              onClick={async () => {
                const { createWarband, formatWarband } = await import('../../data/warbandBuilder');
                const name = window.prompt('Warband name:', 'Goblin Raiders') || 'Warband';
                const wb = createWarband(name, name, 15, 13, 4, { leader: { count: 1, names: [`${name} Chief`] }, lieutenant: { count: 0 }, elite: { count: 2 }, soldier: { count: 4 }, minion: { count: 6 } });
                onAddDmMessage(formatWarband(wb));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all"
              title="Create a persistent enemy warband with ranks and morale"
            >
              ⚔️ Create Warband
            </button>

            {/* Quest reward scaler */}
            <button
              onClick={async () => {
                const { scaleReward, formatScaledReward } = await import('../../lib/questRewardScaler');
                const avgLevel = characters.length > 0 ? Math.round(characters.reduce((s, c) => s + c.level, 0) / characters.length) : 5;
                const difficulties = ['trivial', 'easy', 'medium', 'hard', 'deadly'] as const;
                const lines = difficulties.map((d) => formatScaledReward(scaleReward(avgLevel, characters.length, d), characters.length, d));
                onAddDmMessage(lines.join('\n\n'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Show level-scaled quest rewards for all difficulties"
            >
              🏆 Quest Rewards
            </button>

            {/* World clock */}
            <button
              onClick={async () => {
                const { createWorldClock, formatWorldClock } = await import('../../lib/worldClock');
                const raw = localStorage.getItem(`adventure:worldclock:${roomId}`);
                const clock = raw ? JSON.parse(raw) : createWorldClock();
                onAddDmMessage(formatWorldClock(clock));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all"
              title="Persistent world calendar with named months and event scheduling"
            >
              📅 World Clock
            </button>

            {/* Combat log search */}
            <button
              onClick={async () => {
                const { getLogStats, searchCombatLog, formatSearchResults } = await import('../../lib/combatLogSearch');
                const query = window.prompt('Search combat log:', '') || '';
                if (!query) {
                  const stats = getLogStats(combatLog || []);
                  onAddDmMessage(`📋 **Combat Log Stats:**\n⚔️ Damage: ${stats.damage} | 💀 Kills: ${stats.kill} | 💚 Heals: ${stats.heal} | 🎯 Crits: ${stats.crit} | ❌ Misses: ${stats.miss} | ✨ Spells: ${stats.spell}`);
                  return;
                }
                const results = searchCombatLog(combatLog || [], query);
                onAddDmMessage(formatSearchResults(results, query));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-slate-700/30 border border-slate-500/30 text-slate-300 font-semibold hover:bg-slate-600/30 transition-all"
              title="Search combat log — keyword search or view stats"
            >
              🔍 Combat Log Search
            </button>

            {/* Random weather */}
            <button
              onClick={async () => {
                const { generateDailyWeather, formatDailyWeather, getSeasonFromMonth } = await import('../../lib/randomWeatherGen');
                const month = 6; // default summer
                const season = getSeasonFromMonth(month);
                onAddDmMessage(formatDailyWeather(generateDailyWeather(season), season));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-sky-900/20 border border-sky-600/30 text-sky-400 font-semibold hover:bg-sky-800/30 transition-all"
              title="Generate random daily weather with temperature, precipitation, wind, and special events"
            >
              🌤️ Random Weather
            </button>

            {/* Ritual casting */}
            <button
              onClick={async () => {
                const { formatRitualSpells } = await import('../../lib/ritualCasting');
                const casters = characters.filter((c) => ['Wizard', 'Cleric', 'Druid', 'Bard', 'Artificer'].includes(c.class));
                if (casters.length === 0) { onAddDmMessage('📜 No ritual casters in the party.'); return; }
                const lines = casters.map((c) => formatRitualSpells(c.class, c.level));
                onAddDmMessage(lines.join('\n\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all disabled:opacity-30"
              title="Show available ritual spells by class and level"
            >
              📜 Ritual Spells
            </button>

            {/* Familiar manager */}
            <button
              onClick={async () => {
                const { formatFamiliarOptions } = await import('../../lib/familiarManager');
                onAddDmMessage(formatFamiliarOptions());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all"
              title="Browse familiar forms with stats and abilities"
            >
              🐾 Familiars
            </button>

            {/* Encounter budget */}
            <button
              onClick={async () => {
                const { formatEncounterBudget } = await import('../../lib/encounterBudget');
                const levels = characters.map((c) => c.level);
                onAddDmMessage(formatEncounterBudget(levels.length > 0 ? levels : [5, 5, 5, 5]));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-emerald-900/20 border border-emerald-600/30 text-emerald-400 font-semibold hover:bg-emerald-800/30 transition-all"
              title="Show XP budget for Easy/Medium/Hard/Deadly encounters"
            >
              📊 Encounter Budget
            </button>

            {/* Status effects reference */}
            <button
              onClick={async () => {
                const { formatAllStatusEffects } = await import('../../data/statusEffectReference');
                onAddDmMessage(formatAllStatusEffects());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all"
              title="Quick reference for all 5e conditions and their effects"
            >
              📋 Status Effects
            </button>

            {/* Party analyzer */}
            <button
              onClick={async () => {
                const { formatPartyAnalysis } = await import('../../lib/partyAnalyzer');
                onAddDmMessage(formatPartyAnalysis(characters.map((c) => ({ name: c.name, class: c.class }))));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all disabled:opacity-30"
              title="Analyze party composition — find role gaps and suggest classes"
            >
              👥 Party Analyzer
            </button>

            {/* Backstory questionnaire */}
            <button
              onClick={async () => {
                const { formatQuestionnairePreview } = await import('../../data/backstoryQuestionnaire');
                onAddDmMessage(formatQuestionnairePreview());
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-rose-900/20 border border-rose-600/30 text-rose-400 font-semibold hover:bg-rose-800/30 transition-all"
              title="Guided backstory builder with 12 questions across 4 categories"
            >
              📝 Backstory Builder
            </button>

            {/* Object interaction tracker */}
            <button
              onClick={async () => {
                const { createObjectTracker, formatObjectTracker } = await import('../../lib/objectInteraction');
                const raw = localStorage.getItem(`adventure:objects:${roomId}`);
                const tracker = raw ? JSON.parse(raw) : createObjectTracker();
                onAddDmMessage(formatObjectTracker(tracker));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all"
              title="Track doors, levers, chests, and other interactable objects"
            >
              🚪 Object Tracker
            </button>

            {/* Class feature cooldowns */}
            <button
              onClick={async () => {
                const { getClassFeatures, formatFeatureCooldowns } = await import('../../lib/classFeatureCooldowns');
                const lines = characters.map((c) => formatFeatureCooldowns(getClassFeatures(c.class, c.level), c.name));
                onAddDmMessage(lines.join('\n\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all disabled:opacity-30"
              title="Track class feature uses — action surge, rage, channel divinity, etc"
            >
              ⚡ Feature Cooldowns
            </button>

            {/* Multiclass spell slots */}
            <button
              onClick={async () => {
                const { formatMulticlassSlots } = await import('../../lib/multiclassSpellSlots');
                const classes = characters.map((c) => ({ class: c.class, level: c.level }));
                onAddDmMessage(formatMulticlassSlots(classes));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all disabled:opacity-30"
              title="Calculate combined spell slots for multiclass characters"
            >
              📖 Multiclass Slots
            </button>

            {/* Bulk enemy generator */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all cursor-pointer px-2">
                ⚔️ Bulk Enemy Gen
              </summary>
              <div className="mt-1 space-y-1">
                {BULK_PRESETS_DATA.map((preset, i) => (
                  <button
                    key={i}
                    onClick={async () => {
                      const { generateBulkEnemies, formatBulkEnemies } = await import('../../lib/bulkNpcGenerator');
                      onAddDmMessage(formatBulkEnemies(generateBulkEnemies(preset)));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-red-600/40 transition-all flex items-center justify-between text-[9px] text-slate-300"
                  >
                    <span>{preset.baseName} ×{preset.count}</span>
                    <span className="text-slate-500">{preset.baseHp}HP AC{preset.ac}</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Combat narration */}
            <button
              onClick={async () => {
                const { formatNarrationPreview } = await import('../../data/combatNarration');
                onAddDmMessage(formatNarrationPreview());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Preview combat narration templates for hits, misses, crits, kills"
            >
              🎭 Combat Narration
            </button>

            {/* Session notes tagger */}
            <button
              onClick={async () => {
                const { createNoteTaggger, getTagCounts, formatNotesWithTags } = await import('../../lib/sessionNoteTagger');
                const raw = localStorage.getItem(`adventure:tagnotes:${roomId}`);
                const state = raw ? JSON.parse(raw) : createNoteTaggger();
                const counts = getTagCounts(state);
                const countLines = Object.entries(counts).filter(([, v]) => v > 0).map(([k, v]) => `${k}: ${v}`).join(', ');
                onAddDmMessage(formatNotesWithTags(state.notes) + (countLines ? `\n\nTag counts: ${countLines}` : ''));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all"
              title="View auto-tagged session notes — searchable by #combat, #lore, #npc, etc"
            >
              📝 Tagged Notes
            </button>

            {/* Turn timer */}
            <button
              onClick={async () => {
                const { createTurnTimer, formatTurnTimer } = await import('../../lib/encounterPacingTimer');
                const raw = localStorage.getItem(`adventure:turntimer:${roomId}`);
                const timer = raw ? JSON.parse(raw) : createTurnTimer();
                onAddDmMessage(formatTurnTimer(timer));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all"
              title="Combat turn timer with configurable time limits"
            >
              ⏱️ Turn Timer
            </button>

            {/* Languages */}
            <button
              onClick={async () => {
                const { createLanguageState, formatLanguageStatus } = await import('../../lib/languageBarrier');
                const states = characters.map((c) => createLanguageState(c.id, c.race));
                const names: Record<string, string> = {};
                for (const c of characters) names[c.id] = c.name;
                onAddDmMessage(formatLanguageStatus(states, names));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all disabled:opacity-30"
              title="Show party language coverage and gaps"
            >
              🗣️ Party Languages
            </button>

            {/* Potion brewing */}
            <button
              onClick={async () => {
                const { formatPotionRecipes } = await import('../../lib/potionBrewing');
                onAddDmMessage(formatPotionRecipes());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all"
              title="Potion brewing recipes with ingredients and DCs"
            >
              🧪 Potion Brewing
            </button>

            {/* Terrain reference */}
            <button
              onClick={async () => {
                const { formatTerrainCompendium } = await import('../../data/terrainCompendium');
                onAddDmMessage(formatTerrainCompendium());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all"
              title="Reference for all terrain types with movement and combat effects"
            >
              🗺️ Terrain Reference
            </button>

            {/* Spellbook */}
            <button
              onClick={async () => {
                const { createSpellbook, formatSpellbook } = await import('../../lib/spellbookManager');
                const wizards = characters.filter((c) => c.class === 'Wizard');
                if (wizards.length === 0) { onAddDmMessage('📕 No wizards in the party.'); return; }
                const lines = wizards.map((w) => {
                  const raw = localStorage.getItem(`adventure:spellbook:${w.id}`);
                  const book = raw ? JSON.parse(raw) : createSpellbook(w.id);
                  return formatSpellbook(book, w.name);
                });
                onAddDmMessage(lines.join('\n\n'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all"
              title="Wizard spellbook management with copying costs and page tracking"
            >
              📕 Spellbooks
            </button>

            {/* Player handouts */}
            <button
              onClick={async () => {
                const { createHandoutState, formatHandoutList } = await import('../../lib/playerHandouts');
                const raw = localStorage.getItem(`adventure:handouts:${roomId}`);
                const state = raw ? JSON.parse(raw) : createHandoutState();
                onAddDmMessage(formatHandoutList(state));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Create and manage text handouts for players"
            >
              📄 Player Handouts
            </button>

            {/* Resistance aggregator */}
            <button
              onClick={async () => {
                const { formatAggregatedResistances, aggregateResistances } = await import('../../lib/resistanceAggregator');
                const lines = units.filter((u) => u.type === 'enemy' && u.hp > 0).map((u) => {
                  const sources = [{ source: u.name, resistances: u.resistances || [], immunities: u.immunities || [], vulnerabilities: u.vulnerabilities || [] }];
                  return formatAggregatedResistances(aggregateResistances(sources as any), u.name);
                });
                onAddDmMessage(lines.length > 0 ? lines.join('\n\n') : '🛡️ No enemies to analyze.');
              }}
              disabled={!units.some((u) => u.type === 'enemy' && u.hp > 0)}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all disabled:opacity-30"
              title="Show combined damage resistances and immunities for enemies"
            >
              🛡️ Resistances
            </button>

            {/* Encumbrance */}
            <button
              onClick={async () => {
                const { calculateEncumbrance, formatEncumbrance, estimateInventoryWeight } = await import('../../lib/encumbranceCalc');
                const lines = characters.map((c) => {
                  const weight = estimateInventoryWeight(c.inventory || []);
                  return formatEncumbrance(calculateEncumbrance(weight, c.stats.STR, 'variant'), c.name);
                });
                onAddDmMessage(lines.join('\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all disabled:opacity-30"
              title="Calculate carrying capacity and encumbrance for all characters"
            >
              ⚖️ Encumbrance
            </button>

            {/* Random tavern */}
            <button
              onClick={async () => {
                const { generateTavern, formatTavern } = await import('../../data/tavernGenerator');
                onAddDmMessage(formatTavern(generateTavern()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Generate a random tavern with barkeep, patrons, and rumors"
            >
              🍺 Random Tavern
            </button>

            {/* Round summary */}
            <button
              onClick={async () => {
                const { summarizeEntireCombat } = await import('../../lib/combatRoundSummary');
                const stats = summarizeEntireCombat(combatLog || []);
                onAddDmMessage(`📊 **Combat Summary:**\nRounds: ${stats.rounds} | Damage: ${stats.totalDamage} | Healing: ${stats.totalHealing} | Kills: ${stats.totalKills} | Crits: ${stats.totalCrits}`);
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all"
              title="Summarize combat totals — damage, healing, kills, crits"
            >
              📊 Combat Summary
            </button>

            {/* Passive skills */}
            <button
              onClick={async () => {
                const { formatPartyPassives } = await import('../../lib/passiveSkills');
                onAddDmMessage(formatPartyPassives(characters.map((c) => ({ id: c.id, name: c.name, stats: c.stats, level: c.level }))));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all disabled:opacity-30"
              title="Show passive Perception, Investigation, and Insight for all characters"
            >
              👁️ Passive Skills
            </button>

            {/* Party HP dashboard */}
            <button
              onClick={async () => {
                const { formatPartyHpDashboard } = await import('../../lib/partyHpDashboard');
                onAddDmMessage(formatPartyHpDashboard(characters.map((c) => ({ id: c.id, name: c.name, hp: c.hp, maxHp: c.maxHp }))));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all disabled:opacity-30"
              title="Visual HP bars for all party members"
            >
              ❤️ Party HP
            </button>

            {/* Dungeon names */}
            <button
              onClick={async () => {
                const { formatDungeonNames } = await import('../../data/dungeonNameGenerator');
                onAddDmMessage(formatDungeonNames());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all"
              title="Generate random dungeon names in three styles"
            >
              🏰 Dungeon Names
            </button>

            {/* Damage analytics */}
            <button
              onClick={async () => {
                const { analyzeDamageLog, formatDamageAnalytics } = await import('../../lib/damageLogAnalytics');
                const analytics = analyzeDamageLog(combatLog || [], characters.map((c) => c.name));
                onAddDmMessage(formatDamageAnalytics(analytics));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all"
              title="Damage/healing analytics — DPR, peak round, per-character breakdown"
            >
              📈 Damage Analytics
            </button>

            {/* Travel calculator */}
            <button
              onClick={async () => {
                const { formatTravelPaces } = await import('../../lib/travelSpeed');
                onAddDmMessage(formatTravelPaces());
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all"
              title="Travel pace reference and speed calculator"
            >
              🗺️ Travel Calculator
            </button>

            {/* Encounter table roller */}
            <details className="mb-2">
              <summary className="w-full text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all cursor-pointer px-2">
                🎲 Encounter Tables
              </summary>
              <div className="mt-1 space-y-1">
                {ENCOUNTER_TABLE_DATA.map((table) => (
                  <button
                    key={table.id}
                    onClick={async () => {
                      const { rollOnTable, formatTableRoll } = await import('../../data/encounterTableBuilder');
                      const { roll, entry } = rollOnTable(table);
                      onAddDmMessage(formatTableRoll(table.name, roll, entry));
                    }}
                    className="w-full text-left px-2 py-1 rounded bg-slate-800/40 border border-slate-700/30 hover:border-orange-600/40 transition-all text-[9px] text-slate-300"
                  >
                    🎲 {table.name} ({table.entries.length} entries)
                  </button>
                ))}
              </div>
            </details>

            {/* Point buy calculator */}
            <button
              onClick={async () => {
                const { createPointBuyState, formatPointBuy } = await import('../../lib/pointBuyCalculator');
                onAddDmMessage(formatPointBuy(createPointBuyState()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all"
              title="Show point buy calculator with 27-point system"
            >
              📊 Point Buy
            </button>

            {/* Hit dice tracker */}
            <button
              onClick={async () => {
                const { createHitDiceState, formatPartyHitDice } = await import('../../lib/hitDiceTracker');
                const states = characters.map((c) => ({ state: createHitDiceState(c.id, c.class, c.level), name: c.name }));
                onAddDmMessage(formatPartyHitDice(states));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-emerald-900/20 border border-emerald-600/30 text-emerald-400 font-semibold hover:bg-emerald-800/30 transition-all disabled:opacity-30"
              title="Show remaining hit dice for all characters"
            >
              🎲 Hit Dice
            </button>

            {/* Ammunition tracker */}
            <button
              onClick={async () => {
                const { createAmmoState, formatAmmoStatus } = await import('../../lib/ammunitionTracker');
                const lines = characters.map((c) => {
                  const raw = localStorage.getItem(`adventure:ammo:${c.id}`);
                  const state = raw ? JSON.parse(raw) : createAmmoState(c.id);
                  return formatAmmoStatus(state, c.name);
                });
                onAddDmMessage(lines.join('\n'));
              }}
              disabled={characters.length === 0}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all disabled:opacity-30"
              title="Track ammunition per character — arrows, bolts, darts"
            >
              🏹 Ammunition
            </button>

            {/* Map descriptor */}
            <button
              onClick={async () => {
                const { describeMapTerrain } = await import('../../lib/mapDescriptor');
                const terrain: any[][] = (() => { try { return JSON.parse(localStorage.getItem(`adventure:terrain:${roomId}`) || '[]'); } catch { return []; } })();
                if (terrain.length === 0) { onAddDmMessage('🗺️ No battle map terrain data available.'); return; }
                onAddDmMessage(describeMapTerrain(terrain, terrain[0]?.length || 0, terrain.length));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all"
              title="Generate tactical description from current battle map terrain"
            >
              🗺️ Map Description
            </button>

            {/* Death log */}
            <button
              onClick={async () => {
                const { loadDeathLog, formatDeathLog } = await import('../../data/deathLog');
                onAddDmMessage(formatDeathLog(loadDeathLog()));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-slate-700/30 border border-slate-500/30 text-slate-300 font-semibold hover:bg-slate-600/30 transition-all"
              title="Memorial wall — view fallen characters"
            >
              ⚰️ Death Log
            </button>

            {/* Coin converter */}
            <button
              onClick={async () => {
                const { simplify, formatCoinPurse } = await import('../../lib/coinConverter');
                const cp = parseInt(window.prompt('Total copper to convert:', '1500') || '0', 10);
                if (cp > 0) onAddDmMessage(formatCoinPurse(simplify(cp), 'Converted'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all"
              title="Convert copper pieces to simplified coinage (pp/gp/sp/cp)"
            >
              💰 Coin Converter
            </button>

            {/* Random quest */}
            <button
              onClick={async () => {
                const { generateQuest, formatQuest } = await import('../../data/questGenerator');
                onAddDmMessage(formatQuest(generateQuest()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all"
              title="Generate a random quest with objective, reward, and complication"
            >
              📜 Random Quest
            </button>

            {/* Light sources */}
            <button
              onClick={async () => {
                const { LIGHT_SOURCE_CONFIG } = await import('../../lib/lightSourceTracker');
                const lines = ['🔦 **Light Source Reference:**'];
                for (const [, config] of Object.entries(LIGHT_SOURCE_CONFIG)) {
                  lines.push(`  💡 **${config.name}**: ${config.bright}ft bright, ${config.dim}ft dim, ${config.duration < 0 ? '∞' : config.duration + 'min'} (${config.cost})`);
                }
                onAddDmMessage(lines.join('\n'));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-300 font-semibold hover:bg-amber-800/30 transition-all"
              title="Light source reference — torch, lantern, spell durations and radii"
            >
              🔦 Light Sources
            </button>

            {/* DC reference */}
            <button
              onClick={async () => {
                const { formatDCReference } = await import('../../data/dcReference');
                onAddDmMessage(formatDCReference());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all"
              title="Quick DC reference — difficulty levels with examples"
            >
              📋 DC Reference
            </button>

            {/* Random magic item */}
            <button
              onClick={async () => {
                const { generateMagicItem, formatMagicItem } = await import('../../data/magicItemGenerator');
                onAddDmMessage(formatMagicItem(generateMagicItem()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-fuchsia-900/20 border border-fuchsia-600/30 text-fuchsia-400 font-semibold hover:bg-fuchsia-800/30 transition-all"
              title="Generate a random minor magic item with effect and quirk"
            >
              ✨ Random Magic Item
            </button>

            {/* Watch scheduler */}
            <button
              onClick={async () => {
                const { generateWatchSchedule, formatWatchSchedule } = await import('../../lib/watchScheduler');
                const schedule = generateWatchSchedule(characters.map((c) => ({ id: c.id, name: c.name, perceptionMod: Math.floor((c.stats.WIS - 10) / 2) })));
                onAddDmMessage(formatWatchSchedule(schedule));
              }}
              disabled={characters.length === 0}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all disabled:opacity-30"
              title="Auto-assign watch shifts for long rests based on Perception"
            >
              🌙 Watch Schedule
            </button>

            {/* NPC voice */}
            <button
              onClick={async () => {
                const { generateNpcVoice, formatNpcVoice } = await import('../../data/npcVoiceGenerator');
                onAddDmMessage(formatNpcVoice(generateNpcVoice()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-pink-900/20 border border-pink-600/30 text-pink-400 font-semibold hover:bg-pink-800/30 transition-all"
              title="Generate a random NPC voice/accent for roleplay"
            >
              🎭 NPC Voice
            </button>

            {/* Skill contest */}
            <button
              onClick={async () => {
                const { resolveContest, formatContestResult } = await import('../../lib/skillContest');
                const result = resolveContest('Player', 'Athletics', 5, false, 'NPC', 'Athletics', 3, false);
                onAddDmMessage(formatContestResult(result));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all"
              title="Resolve an opposed skill contest"
            >
              ⚔️ Skill Contest
            </button>

            {/* Room contents */}
            <button
              onClick={async () => {
                const { generateRoomContents, formatRoomContents } = await import('../../data/roomContents');
                onAddDmMessage(formatRoomContents(generateRoomContents()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all"
              title="Generate random furniture, debris, and clutter for a room"
            >
              🏚️ Room Contents
            </button>

            {/* Currency exchange */}
            <button
              onClick={async () => {
                const { formatExchangeRates } = await import('../../lib/currencyExchange');
                onAddDmMessage(formatExchangeRates());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all"
              title="Show regional currency exchange rates"
            >
              💱 Currency Exchange
            </button>

            {/* Weather event */}
            <button
              onClick={async () => {
                const { rollWeatherEvent, formatWeatherEvent } = await import('../../data/weatherEvents');
                onAddDmMessage(formatWeatherEvent(rollWeatherEvent()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-sky-900/20 border border-sky-600/30 text-sky-400 font-semibold hover:bg-sky-800/30 transition-all"
              title="Roll a dramatic one-off weather event"
            >
              🌪️ Weather Event
            </button>

            {/* Camp planner */}
            <button
              onClick={async () => {
                const { suggestCampSetup, createCampSetup, formatCampSetup } = await import('../../lib/campPlanner');
                const hasCaster = characters.some((c) => ['Wizard', 'Cleric', 'Druid', 'Bard', 'Sorcerer', 'Warlock'].includes(c.class));
                const features = suggestCampSetup(characters.length || 4, hasCaster, 'forest');
                onAddDmMessage(formatCampSetup(createCampSetup(features)));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all"
              title="Auto-suggest camp setup with security, comfort, and stealth ratings"
            >
              🏕️ Camp Planner
            </button>

            {/* Mystery potion */}
            <button
              onClick={async () => {
                const { generateMysteryPotion, formatMysteryPotion } = await import('../../data/mysteryPotions');
                onAddDmMessage(formatMysteryPotion(generateMysteryPotion(), false));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all"
              title="Generate a mystery potion — players must drink or identify"
            >
              🧪 Mystery Potion
            </button>

            {/* Initiative display */}
            <button
              onClick={async () => {
                const { buildInitiativeCards, formatInitiativeCards } = await import('../../lib/initiativeDisplay');
                onAddDmMessage(formatInitiativeCards(buildInitiativeCards(units)));
              }}
              disabled={!inCombat}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all disabled:opacity-30"
              title="Display formatted initiative order with HP and conditions"
            >
              📋 Initiative Cards
            </button>

            {/* Book generator */}
            <button
              onClick={async () => {
                const { generateLibrary, formatLibrary } = await import('../../data/bookGenerator');
                onAddDmMessage(formatLibrary(generateLibrary(3)));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="Generate random books for library loot"
            >
              📚 Random Books
            </button>

            {/* Falling damage */}
            <button
              onClick={async () => {
                const { formatFallingDamageTable } = await import('../../lib/fallingDamage');
                onAddDmMessage(formatFallingDamageTable());
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all"
              title="Falling damage reference — height to d6 damage"
            >
              💥 Falling Damage
            </button>

            {/* Location names */}
            <button
              onClick={async () => {
                const { formatLocationNames } = await import('../../data/locationNameGenerator');
                onAddDmMessage(formatLocationNames());
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all"
              title="Generate random location names for towns, rivers, mountains, etc."
            >
              🗺️ Location Names
            </button>

            {/* Chase sequence */}
            <button
              onClick={async () => {
                const { createChase, advanceChaseRound, formatChaseStatus } = await import('../../lib/chaseSequence');
                const chase = createChase();
                const result = advanceChaseRound(chase);
                onAddDmMessage(formatChaseStatus(result.state) + `\n⚠️ Complication: ${result.complication}`);
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all"
              title="Start a chase sequence with complications each round"
            >
              🏃 Chase Sequence
            </button>

            {/* Random trap */}
            <button
              onClick={async () => {
                const { generateRandomTrap, formatGeneratedTrap } = await import('../../data/randomTrapGenerator');
                onAddDmMessage(formatGeneratedTrap(generateRandomTrap()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all"
              title="Generate a random trap from procedural parts"
            >
              🪤 Random Trap
            </button>

            {/* Random curse */}
            <button
              onClick={async () => {
                const { generateCurse, formatCurse } = await import('../../data/curseGenerator');
                onAddDmMessage(formatCurse(generateCurse()));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all"
              title="Generate a random curse for items or locations"
            >
              😈 Random Curse
            </button>

            {/* Loot log */}
            <button
              onClick={async () => {
                const { createLootLog, formatLootLog } = await import('../../lib/lootLog');
                const raw = localStorage.getItem(`adventure:lootlog:${roomId}`);
                const log = raw ? JSON.parse(raw) : createLootLog();
                onAddDmMessage(formatLootLog(log));
              }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
              title="View all items found this session"
            >
              💎 Loot Log
            </button>

            {/* Time narrator */}
            <button
              onClick={async () => {
                const { formatTimeNarration } = await import('../../lib/timeNarrator');
                const hours = parseInt(window.prompt('Hours passing:', '4') || '0', 10);
                if (hours > 0) onAddDmMessage(formatTimeNarration(hours, 'wilderness', weather));
              }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all"
              title="Narrate the passage of time with terrain and weather flavor"
            >
              ⏳ Time Narrator
            </button>

            {/* Random riddle */}
            <button onClick={async () => { const { getRandomRiddle, formatRiddle } = await import('../../data/riddleGenerator'); onAddDmMessage(formatRiddle(getRandomRiddle())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all" title="Generate a random riddle">
              🧩 Random Riddle
            </button>

            {/* Poison list */}
            <button onClick={async () => { const { formatPoisonList } = await import('../../lib/poisonCrafting'); onAddDmMessage(formatPoisonList()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all" title="Browse poisons with harvest DCs and effects">
              ☠️ Poisons
            </button>

            {/* Encounter narrator */}
            <button onClick={async () => { const { formatEncounterOpening, getAllThemes } = await import('../../data/encounterNarrator'); const themes = getAllThemes(); onAddDmMessage(formatEncounterOpening(themes[Math.floor(Math.random() * themes.length)])); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Dramatic opening narration for combat">
              🎭 Combat Opening
            </button>

            {/* Formation presets */}
            <button onClick={async () => { const { formatFormationPresets } = await import('../../data/formationPresets'); onAddDmMessage(formatFormationPresets()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all" title="Pre-built tactical formations">
              📐 Formation Presets
            </button>

            {/* Session XP */}
            <button onClick={async () => { const { calculateSessionXP, formatSessionXP, xpFromCR } = await import('../../lib/sessionXPCalculator'); const enemies = units.filter((u) => u.type === 'enemy' && u.hp <= 0); const sources = enemies.map((e) => ({ source: e.name, amount: xpFromCR(e.cr || 0), type: 'combat' as const })); onAddDmMessage(formatSessionXP(calculateSessionXP(sources, characters.length || 4))); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Calculate session XP from defeated enemies">
              🏆 Session XP
            </button>

            {/* AC breakdown */}
            <button onClick={async () => { const { calculateACBreakdown, formatACBreakdown } = await import('../../lib/acBreakdown'); const lines = characters.map((c) => formatACBreakdown(calculateACBreakdown('None', Math.floor((c.stats.DEX - 10) / 2), false, 0), c.name)); onAddDmMessage(lines.join('\n\n')); }}
              disabled={characters.length === 0} className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all disabled:opacity-30" title="Show AC breakdown for all characters">
              🛡️ AC Breakdown
            </button>

            {/* Noble house */}
            <button onClick={async () => { const { generateNobleHouse, formatNobleHouse } = await import('../../data/nobleHouseGenerator'); onAddDmMessage(formatNobleHouse(generateNobleHouse())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Generate a random noble house">
              🏰 Noble House
            </button>

            {/* Spell slots */}
            <button onClick={async () => { const { createSpellSlotState, formatSpellSlots } = await import('../../lib/spellSlotTracker'); const casters = characters.filter((c) => ['Wizard','Sorcerer','Bard','Cleric','Druid','Warlock','Paladin','Ranger'].includes(c.class)); if (casters.length === 0) { onAddDmMessage('🔮 No spellcasters.'); return; } const lines = casters.map((c) => formatSpellSlots(createSpellSlotState(c.id, c.level), c.name)); onAddDmMessage(lines.join('\n\n')); }}
              disabled={characters.length === 0} className="w-full mb-2 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all disabled:opacity-30" title="Show spell slot usage per caster">
              🔮 Spell Slots
            </button>

            {/* Wilderness hazard */}
            <button onClick={async () => { const { rollWildernessHazard, formatWildernessHazard } = await import('../../data/wildernessHazards'); onAddDmMessage(formatWildernessHazard(rollWildernessHazard())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all" title="Roll a random wilderness hazard">
              ⚠️ Wilderness Hazard
            </button>

            {/* Weakness finder */}
            <button onClick={async () => { const { analyzeWeaknesses, formatWeaknessAnalysis } = await import('../../lib/damageWeaknessFinder'); const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0); if (enemies.length === 0) { onAddDmMessage('No enemies to analyze.'); return; } const lines = enemies.map((e) => formatWeaknessAnalysis(analyzeWeaknesses(e.resistances || [], e.immunities || [], e.vulnerabilities || []), e.name)); onAddDmMessage(lines.join('\n\n')); }}
              disabled={!units.some((u) => u.type === 'enemy' && u.hp > 0)} className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all disabled:opacity-30" title="Find best damage types against enemies">
              🎯 Weakness Finder
            </button>

            {/* Rest benefits */}
            <button onClick={async () => { const { calculateLongRestBenefits, formatRestBenefits } = await import('../../lib/restBenefitSummary'); const benefits = characters.map((c) => calculateLongRestBenefits(c.name, c.class, c.hp, c.maxHp, c.hitDiceRemaining || c.level, c.level, c.exhaustion || 0)); onAddDmMessage(formatRestBenefits(benefits, 'long')); }}
              disabled={characters.length === 0} className="w-full mb-3 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all disabled:opacity-30" title="Show what each character recovers on a long rest">
              🌙 Rest Benefits
            </button>

            {/* Critical hit table */}
            <button onClick={async () => { const { rollCritEffect, formatCritEffect, getCritDamageTypes } = await import('../../data/criticalHitTable'); const types = getCritDamageTypes(); const type = types[Math.floor(Math.random() * types.length)]; onAddDmMessage(formatCritEffect(rollCritEffect(type), 'Attacker', 'Target')); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Roll a dramatic critical hit effect by damage type">
              ⚡ Crit Table
            </button>

            {/* Prophecy */}
            <button onClick={async () => { const { generateProphecy, formatProphecy } = await import('../../data/prophecyGenerator'); onAddDmMessage(formatProphecy(generateProphecy())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Generate a cryptic prophecy for quest hooks">
              🔮 Prophecy
            </button>

            {/* Saving throw ref */}
            <button onClick={async () => { const { formatSavingThrowRef } = await import('../../data/savingThrowRef'); onAddDmMessage(formatSavingThrowRef()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all" title="Quick reference for all 6 saving throws with DCs">
              🎲 Save Reference
            </button>

            {/* Guild generator */}
            <button onClick={async () => { const { generateGuild, formatGuild } = await import('../../data/guildGenerator'); onAddDmMessage(formatGuild(generateGuild())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Generate a random guild with leader, HQ, and secret agenda">
              ⚜️ Random Guild
            </button>

            {/* Level-up checklist */}
            <button onClick={async () => { const { formatLevelUpChecklist } = await import('../../data/levelUpChecklist'); if (selectedCharacterId) { const c = characters.find((ch) => ch.id === selectedCharacterId); if (c) { onAddDmMessage(formatLevelUpChecklist(c.level + 1, c.class, c.name)); return; } } const lines = characters.map((c) => formatLevelUpChecklist(c.level + 1, c.class, c.name)); onAddDmMessage(lines.join('\n\n')); }}
              disabled={characters.length === 0} className="w-full mb-3 text-[10px] py-1.5 rounded bg-emerald-900/20 border border-emerald-600/30 text-emerald-400 font-semibold hover:bg-emerald-800/30 transition-all disabled:opacity-30" title="Step-by-step level-up checklist">
              📈 Level-Up Checklist
            </button>

            {/* Insult generator */}
            <button onClick={async () => { const { generateInsultBattle } = await import('../../data/fantasyInsults'); onAddDmMessage(generateInsultBattle()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-pink-900/20 border border-pink-600/30 text-pink-400 font-semibold hover:bg-pink-800/30 transition-all" title="Fantasy insults for NPC banter">
              🗣️ Insult Generator
            </button>

            {/* Encounter difficulty */}
            <button onClick={async () => { const { formatDifficultyLabel } = await import('../../lib/encounterDifficultyLabel'); const levels = characters.map((c) => c.level); const xps = units.filter((u) => u.type === 'enemy' && u.hp > 0).map((u) => (u.xpValue || 0)); onAddDmMessage(formatDifficultyLabel(levels.length > 0 ? levels : [5,5,5,5], xps)); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Rate current encounter difficulty">
              ⚔️ Difficulty Rating
            </button>

            {/* Loot container */}
            <button onClick={async () => { const { generateLootContainer, formatLootContainer } = await import('../../data/lootContainers'); onAddDmMessage(formatLootContainer(generateLootContainer())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Generate a random loot container">
              📦 Loot Container
            </button>

            {/* Planar reference */}
            <button onClick={async () => { const { formatPlanarReference } = await import('../../data/planarReference'); onAddDmMessage(formatPlanarReference()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all" title="Quick reference for D&D planes of existence">
              🌌 Planes Reference
            </button>

            {/* Trinkets */}
            <button onClick={async () => { const { formatTrinkets } = await import('../../data/trinketGenerator'); onAddDmMessage(formatTrinkets()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all" title="Random trinkets for flavor loot">
              🎲 Random Trinkets
            </button>

            {/* Turn checklist */}
            <button onClick={async () => { const { formatTurnChecklist } = await import('../../data/combatTurnChecklist'); onAddDmMessage(formatTurnChecklist()); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-slate-700/30 border border-slate-500/30 text-slate-300 font-semibold hover:bg-slate-600/30 transition-all" title="What can I do on my turn?">
              📋 Turn Checklist
            </button>

            {/* Landmark */}
            <button onClick={async () => { const { rollLandmark, formatLandmark } = await import('../../data/wildernessLandmarks'); onAddDmMessage(formatLandmark(rollLandmark(), true)); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all" title="Random wilderness landmark">
              🏛️ Landmark
            </button>
            {/* Skill proficiency ref */}
            <button onClick={async () => { const { formatSkillProficiencyRef } = await import('../../data/skillProficiencyRef'); onAddDmMessage(formatSkillProficiencyRef()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all" title="Skill choices by class">
              📋 Skill Proficiencies
            </button>
            {/* Ship generator */}
            <button onClick={async () => { const { generateShip, formatShip } = await import('../../data/shipGenerator'); onAddDmMessage(formatShip(generateShip())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-cyan-900/20 border border-cyan-600/30 text-cyan-400 font-semibold hover:bg-cyan-800/30 transition-all" title="Generate a random ship">
              ⛵ Random Ship
            </button>
            {/* Festival */}
            <button onClick={async () => { const { generateFestival, formatFestival } = await import('../../data/festivalGenerator'); onAddDmMessage(formatFestival(generateFestival())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-pink-900/20 border border-pink-600/30 text-pink-400 font-semibold hover:bg-pink-800/30 transition-all" title="Generate a town festival with events">
              🎉 Festival
            </button>
            {/* Graveyard */}
            <button onClick={async () => { const { generateGraveyard, formatGraveyard } = await import('../../data/graveyardGenerator'); onAddDmMessage(formatGraveyard(generateGraveyard())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-gray-700/30 border border-gray-500/30 text-gray-300 font-semibold hover:bg-gray-600/30 transition-all" title="Random tombstones with epitaphs and secrets">
              ⚰️ Graveyard
            </button>
            {/* Tavern menu */}
            <button onClick={async () => { const { formatTavernMenu } = await import('../../data/tavernMenu'); onAddDmMessage(formatTavernMenu()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Tavern food and drink menu with effects">
              🍺 Tavern Menu
            </button>
            {/* Bounty board */}
            <button onClick={async () => { const { generateBountyBoard, formatBountyBoard } = await import('../../data/bountyBoard'); onAddDmMessage(formatBountyBoard(generateBountyBoard())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Random wanted posters with bounties">
              📜 Bounty Board
            </button>
            {/* Check narrator */}
            <button onClick={async () => { const { formatNarratedCheck } = await import('../../data/abilityCheckNarrator'); const roll = Math.floor(Math.random() * 20) + 1; onAddDmMessage(formatNarratedCheck('Player', 'Athletics', roll, 15)); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all" title="Dramatic narration for ability checks">
              🎭 Check Narrator
            </button>

            {/* Scene starters */}
            <button onClick={async () => { const { formatEncounterHooks } = await import('../../data/randomEncounterHook'); onAddDmMessage(formatEncounterHooks()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all" title="Random scene starters for the DM">
              📣 Scene Starters
            </button>
            {/* Rumors */}
            <button onClick={async () => { const { formatRumors } = await import('../../data/rumorsGenerator'); onAddDmMessage(formatRumors()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Tavern rumors with truth ratings">
              🤫 Rumors
            </button>
            {/* Shopkeeper */}
            <button onClick={async () => { const { generateShopkeeper, formatShopkeeper } = await import('../../data/shopkeeperPersonality'); onAddDmMessage(formatShopkeeper(generateShopkeeper())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Generate a shopkeeper personality">
              🏪 Shopkeeper
            </button>
            {/* NPC motivation */}
            <button onClick={async () => { const { getRandomMotivation, formatMotivation } = await import('../../data/randomMotivation'); onAddDmMessage(formatMotivation(getRandomMotivation())); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all" title="Random NPC motivation">
              🧠 NPC Motivation
            </button>

            {/* Secret */}
            <button onClick={async () => { const { getRandomSecret, formatSecret } = await import('../../data/randomSecret'); onAddDmMessage(formatSecret(getRandomSecret())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Random NPC/location secret">
              🤫 Random Secret
            </button>
            {/* Weapon quirk */}
            <button onClick={async () => { const { getRandomQuirk, formatWeaponQuirk } = await import('../../data/randomWeaponQuirk'); onAddDmMessage(formatWeaponQuirk(getRandomQuirk())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all" title="Random weapon personality quirk">
              ⚔️ Weapon Quirk
            </button>
            {/* Disguise */}
            <button onClick={async () => { const { generateDisguise, formatDisguise } = await import('../../data/randomDisguise'); onAddDmMessage(formatDisguise(generateDisguise())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Random disguise plan for infiltration">
              🎭 Disguise Plan
            </button>
            {/* Plot twist */}
            <button onClick={async () => { const { getRandomTwist, formatPlotTwist } = await import('../../data/randomPlotTwist'); onAddDmMessage(formatPlotTwist(getRandomTwist())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-fuchsia-900/20 border border-fuchsia-600/30 text-fuchsia-400 font-semibold hover:bg-fuchsia-800/30 transition-all" title="Random plot twist for narrative surprise">
              🌋 Plot Twist
            </button>
            {/* Bar fight */}
            <button onClick={async () => { const { generateBarFight, formatBarFight } = await import('../../data/randomBarFight'); onAddDmMessage(formatBarFight(generateBarFight())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Random bar fight with escalation stages">
              🍺💥 Bar Fight
            </button>
            {/* Dream */}
            <button onClick={async () => { const { getRandomDream, formatDream } = await import('../../data/randomDream'); const name = characters.length > 0 ? characters[Math.floor(Math.random() * characters.length)].name : 'Adventurer'; onAddDmMessage(formatDream(getRandomDream(), name)); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all" title="Random dream for long rest flavor">
              💤 Dream
            </button>

            {/* Contract */}
            <button onClick={async () => { const { generateContract, formatContract } = await import('../../data/randomContract'); onAddDmMessage(formatContract(generateContract())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all" title="Random NPC contract with loopholes">
              📜 Contract
            </button>
            {/* 5-day forecast */}
            <button onClick={async () => { const { generateForecast, formatForecast } = await import('../../data/randomWeather5Day'); onAddDmMessage(formatForecast(generateForecast(1, 6))); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-sky-900/20 border border-sky-600/30 text-sky-400 font-semibold hover:bg-sky-800/30 transition-all" title="5-day weather forecast">
              🌤️ 5-Day Forecast
            </button>
            {/* Merchant inventory */}
            <button onClick={async () => { const { getRandomMerchantStock, formatMerchantInventory } = await import('../../data/randomMerchantInventory'); onAddDmMessage(formatMerchantInventory(getRandomMerchantStock())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Random merchant stock">
              🏪 Merchant Stock
            </button>
            {/* Town event */}
            <button onClick={async () => { const { getRandomTownEvent, formatTownEvent } = await import('../../data/randomTownEvent'); onAddDmMessage(formatTownEvent(getRandomTownEvent())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all" title="Random town event">
              🏘️ Town Event
            </button>
            {/* Clues */}
            <button onClick={async () => { const { getClues, formatClues } = await import('../../data/randomClue'); onAddDmMessage(formatClues(getClues())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all" title="Random investigation clues">
              🔍 Clues
            </button>
            {/* Last words */}
            <button onClick={async () => { const { getRandomLastWords, formatLastWords } = await import('../../data/randomLastWords'); onAddDmMessage(formatLastWords(getRandomLastWords(), 'NPC')); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-gray-700/30 border border-gray-500/30 text-gray-300 font-semibold hover:bg-gray-600/30 transition-all" title="Dramatic dying words for NPCs">
              🕊️ Last Words
            </button>

            {/* Prison */}
            <button onClick={async () => { const { generatePrison, formatPrison } = await import('../../data/randomPrison'); onAddDmMessage(formatPrison(generatePrison())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-slate-700/30 border border-slate-500/30 text-slate-300 font-semibold hover:bg-slate-600/30 transition-all" title="Random prison with guards and escape routes">
              🔒 Random Prison
            </button>
            {/* Artifact */}
            <button onClick={async () => { const { generateArtifact, formatArtifact } = await import('../../data/randomArtifact'); onAddDmMessage(formatArtifact(generateArtifact())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Generate a legendary artifact with history and drawbacks">
              ⭐ Random Artifact
            </button>
            {/* Side mission */}
            <button onClick={async () => { const { getRandomMission, formatMission } = await import('../../data/randomMission'); onAddDmMessage(formatMission(getRandomMission())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all" title="Random one-session side mission with twist">
              📋 Side Mission
            </button>
            {/* Treasure hoard */}
            <button onClick={async () => { const { generateHoard, formatHoard } = await import('../../data/randomTreasureHoard'); onAddDmMessage(formatHoard(generateHoard('medium'))); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all" title="DMG-style treasure hoard">
              💎 Treasure Hoard
            </button>
            {/* Omen */}
            <button onClick={async () => { const { getRandomOmen, formatOmen } = await import('../../data/randomOmen'); onAddDmMessage(formatOmen(getRandomOmen())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Random omen or portent">
              🔮 Omen
            </button>
            {/* Campfire story */}
            <button onClick={async () => { const { getRandomStory, formatCampfireStory } = await import('../../data/randomCampfireStory'); onAddDmMessage(formatCampfireStory(getRandomStory())); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all" title="Campfire tale for long rest flavor">
              🔥 Campfire Story
            </button>

            {/* Cursed item */}
            <button onClick={async () => { const { getRandomCursedItem, formatCursedItem } = await import('../../data/randomCurseItem'); onAddDmMessage(formatCursedItem(getRandomCursedItem(), true)); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Random cursed item with hidden drawback">
              😈 Cursed Item
            </button>
            {/* D&D joke */}
            <button onClick={async () => { const { getRandomJoke, formatJoke } = await import('../../data/randomJoke'); onAddDmMessage(formatJoke(getRandomJoke())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-yellow-900/20 border border-yellow-600/30 text-yellow-400 font-semibold hover:bg-yellow-800/30 transition-all" title="D&D joke for bard performances">
              😂 D&D Joke
            </button>
            {/* Wanted person */}
            <button onClick={async () => { const { generateWantedPerson, formatWantedPerson } = await import('../../data/randomWantedPerson'); onAddDmMessage(formatWantedPerson(generateWantedPerson())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all" title="Detailed wanted poster NPC">
              🔍 Wanted Person
            </button>
            {/* Hirelings */}
            <button onClick={async () => { const { generateHirelingRoster, formatHirelings } = await import('../../data/randomHirelings'); onAddDmMessage(formatHirelings(generateHirelingRoster())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all" title="Hirelings available for hire">
              👥 Hirelings
            </button>
            {/* Magic shop */}
            <button onClick={async () => { const { generateMagicShop, formatMagicShop } = await import('../../data/randomMagicShop'); onAddDmMessage(formatMagicShop(generateMagicShop())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Random magic shop with stock">
              ✨ Magic Shop
            </button>
            {/* Combat complication */}
            <button onClick={async () => { const { getRandomComplication, formatComplication } = await import('../../data/randomEncounterComplication'); onAddDmMessage(formatComplication(getRandomComplication())); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-fuchsia-900/20 border border-fuchsia-600/30 text-fuchsia-400 font-semibold hover:bg-fuchsia-800/30 transition-all" title="Mid-combat twist that changes the battle">
              🌋 Combat Twist
            </button>

            {/* Weather transition */}
            <button onClick={async () => { const { narrateWeatherChange } = await import('../../data/randomWeatherTransition'); onAddDmMessage(narrateWeatherChange(weather, 'rain')); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-sky-900/20 border border-sky-600/30 text-sky-400 font-semibold hover:bg-sky-800/30 transition-all" title="Narrate a weather change">
              🌤️ Weather Shift
            </button>
            {/* Battlefield features */}
            <button onClick={async () => { const { formatBattlefieldFeatures } = await import('../../data/randomCombatTerrain'); onAddDmMessage(formatBattlefieldFeatures()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-stone-700/30 border border-stone-500/30 text-stone-300 font-semibold hover:bg-stone-600/30 transition-all" title="Random terrain features for the battlefield">
              🏔️ Battle Terrain
            </button>
            {/* Non-gold reward */}
            <button onClick={async () => { const { getRandomReward, formatReward } = await import('../../data/randomReward'); onAddDmMessage(formatReward(getRandomReward())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-emerald-900/20 border border-emerald-600/30 text-emerald-400 font-semibold hover:bg-emerald-800/30 transition-all" title="Non-gold quest reward">
              🎁 Unique Reward
            </button>
            {/* NPC relationship */}
            <button onClick={async () => { const { getRandomRelationship, formatRelationship } = await import('../../data/randomNpcRelationship'); onAddDmMessage(formatRelationship(getRandomRelationship())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-pink-900/20 border border-pink-600/30 text-pink-400 font-semibold hover:bg-pink-800/30 transition-all" title="Random connection between two NPCs">
              🤝 NPC Connection
            </button>
            {/* Dungeon door */}
            <button onClick={async () => { const { generateDungeonDoor, formatDungeonDoor } = await import('../../data/randomDungeonDoor'); onAddDmMessage(formatDungeonDoor(generateDungeonDoor())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Random dungeon door with what's behind it">
              🚪 Dungeon Door
            </button>
            {/* Political intrigue */}
            <button onClick={async () => { const { getRandomIntrigue, formatIntrigue } = await import('../../data/randomPoliticalIntrigue'); onAddDmMessage(formatIntrigue(getRandomIntrigue())); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Random political intrigue with factions">
              🏛️ Political Intrigue
            </button>

            {/* Travel moment */}
            <button onClick={async () => { const { getRandomTravelMoment, formatTravelMoment } = await import('../../data/randomTravel'); onAddDmMessage(formatTravelMoment(getRandomTravelMoment())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-green-900/20 border border-green-600/30 text-green-400 font-semibold hover:bg-green-800/30 transition-all" title="Random thing that happens on the road">
              🛤️ Travel Moment
            </button>
            {/* Creature feature */}
            <button onClick={async () => { const { getRandomCreatureFeature, formatCreatureFeature } = await import('../../data/randomCreatureFeature'); onAddDmMessage(formatCreatureFeature(getRandomCreatureFeature())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Add a unique twist to a monster">
              🐲 Creature Feature
            </button>
            {/* Quick background */}
            <button onClick={async () => { const { getRandomBackground, formatBackground } = await import('../../data/randomBackground'); onAddDmMessage(formatBackground(getRandomBackground())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-blue-900/20 border border-blue-600/30 text-blue-400 font-semibold hover:bg-blue-800/30 transition-all" title="Quick character background with traits">
              📋 Quick Background
            </button>
            {/* Combat objective */}
            <button onClick={async () => { const { getRandomObjective, formatCombatObjective } = await import('../../data/randomCombatObjective'); onAddDmMessage(formatCombatObjective(getRandomObjective())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all" title="Combat objective beyond kill everything">
              🎯 Combat Objective
            </button>
            {/* Moral dilemma */}
            <button onClick={async () => { const { getRandomDilemma, formatDilemma } = await import('../../data/randomMoralDilemma'); onAddDmMessage(formatDilemma(getRandomDilemma())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Ethical choice that tests alignment">
              ⚖️ Moral Dilemma
            </button>
            {/* Sound effect */}
            <button onClick={async () => { const { getRandomSound, formatSoundEffect } = await import('../../data/randomSoundEffect'); onAddDmMessage(formatSoundEffect(getRandomSound())); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-gray-700/30 border border-gray-500/30 text-gray-300 font-semibold hover:bg-gray-600/30 transition-all" title="What does the party hear?">
              👂 Sound Effect
            </button>

            {/* Catchphrase */}
            <button onClick={async () => { const { formatCatchphrase } = await import('../../data/randomCatchphrase'); onAddDmMessage(formatCatchphrase()); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-pink-900/20 border border-pink-600/30 text-pink-400 font-semibold hover:bg-pink-800/30 transition-all" title="Random NPC catchphrase">
              💬 Catchphrase
            </button>
            {/* Environment */}
            <button onClick={async () => { const { getRandomScene, formatEnvironmentScene } = await import('../../data/randomEnvironment'); onAddDmMessage(formatEnvironmentScene(getRandomScene())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-teal-900/20 border border-teal-600/30 text-teal-400 font-semibold hover:bg-teal-800/30 transition-all" title="Full sensory environment description">
              🌍 Environment
            </button>
            {/* Chase obstacle */}
            <button onClick={async () => { const m = await import('../../data/randomChaseComplication2'); onAddDmMessage(m.formatChaseObstacle(m.getRandomChaseObstacle())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-orange-900/20 border border-orange-600/30 text-orange-400 font-semibold hover:bg-orange-800/30 transition-all" title="Random chase obstacle">
              🏃 Chase Obstacle
            </button>
            {/* Villain trait */}
            <button onClick={async () => { const { getRandomVillainTrait, formatVillainTrait } = await import('../../data/randomVillainTrait'); onAddDmMessage(formatVillainTrait(getRandomVillainTrait())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-red-900/20 border border-red-600/30 text-red-400 font-semibold hover:bg-red-800/30 transition-all" title="Personality trait for a villain">
              😈 Villain Trait
            </button>
            {/* Session ender */}
            <button onClick={async () => { const { getRandomEnder, formatSessionEnder } = await import('../../data/randomSessionEnder'); onAddDmMessage(formatSessionEnder(getRandomEnder())); }}
              className="w-full mb-2 text-[10px] py-1.5 rounded bg-purple-900/20 border border-purple-600/30 text-purple-400 font-semibold hover:bg-purple-800/30 transition-all" title="Cliffhanger hook to end the session">
              🎬 Session Ender
            </button>
            {/* Magic effect */}
            <button onClick={async () => { const { getRandomMagicEffect, formatMagicEffect } = await import('../../data/randomMagicEffect'); onAddDmMessage(formatMagicEffect(getRandomMagicEffect())); }}
              className="w-full mb-3 text-[10px] py-1.5 rounded bg-indigo-900/20 border border-indigo-600/30 text-indigo-400 font-semibold hover:bg-indigo-800/30 transition-all" title="Ambient magical phenomenon">
              ✨ Magic Effect
            </button>

            {/* Save/Load Encounter Templates */}
            <div className="mb-3 space-y-1">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Encounter Templates</label>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    const enemies = units.filter((u) => u.type === 'enemy');
                    if (enemies.length === 0) return;
                    const name = window.prompt('Save encounter as:', `Encounter ${new Date().toLocaleDateString()}`);
                    if (!name?.trim()) return;
                    const template = { name: name.trim(), enemies: enemies.map((e) => ({ name: e.name, hp: e.maxHp, ac: e.ac, attackBonus: e.attackBonus, damageDie: e.damageDie, damageBonus: e.damageBonus, dexMod: e.dexMod, cr: e.cr, xpValue: e.xpValue, multiattack: e.multiattack, resistances: e.resistances, vulnerabilities: e.vulnerabilities, immunities: e.immunities })), savedAt: Date.now() };
                    const saved = JSON.parse(localStorage.getItem(`adventure:encounters:${roomId}`) || '[]') as Array<typeof template>;
                    saved.push(template);
                    localStorage.setItem(`adventure:encounters:${roomId}`, JSON.stringify(saved.slice(-20)));
                    onAddDmMessage(`💾 Saved encounter template: "${name.trim()}" (${enemies.length} enemies)`);
                  }}
                  disabled={!units.some((u) => u.type === 'enemy')}
                  className="flex-1 text-[8px] py-1 rounded bg-slate-800/60 border border-slate-700/40 text-slate-500 hover:text-emerald-400 font-semibold transition-all disabled:opacity-30"
                  title="Save current enemies as a reusable template"
                >
                  Save
                </button>
                <select
                  onChange={(e) => {
                    const idx = parseInt(e.target.value, 10);
                    if (isNaN(idx)) return;
                    const saved = JSON.parse(localStorage.getItem(`adventure:encounters:${roomId}`) || '[]') as Array<{ name: string; enemies: Array<Record<string, unknown>> }>;
                    const template = saved[idx];
                    if (!template) return;
                    const spawned = template.enemies.map((en) => ({
                      id: `tmpl-${crypto.randomUUID().slice(0, 8)}`,
                      name: en.name as string, hp: en.hp as number, maxHp: en.hp as number, ac: en.ac as number,
                      initiative: Math.floor(Math.random() * 20) + 1 + ((en.dexMod as number) || 0),
                      isCurrentTurn: false, type: 'enemy' as const,
                      speed: 6, movementUsed: 0, reactionUsed: false, bonusActionUsed: false, disengaged: false,
                      attackBonus: en.attackBonus as number, damageDie: en.damageDie as string, damageBonus: en.damageBonus as number,
                      dexMod: en.dexMod as number, cr: en.cr as number, xpValue: en.xpValue as number,
                      multiattack: en.multiattack as number | undefined, conditions: [],
                      resistances: en.resistances as string[] | undefined, vulnerabilities: en.vulnerabilities as string[] | undefined, immunities: en.immunities as string[] | undefined,
                    }));
                    setUnits((prev) => [...prev, ...spawned]);
                    onAddDmMessage(`📋 Loaded encounter template: "${template.name}" (${spawned.length} enemies)`);
                    e.target.value = '';
                  }}
                  className="flex-1 text-[8px] px-1 py-1 rounded bg-slate-800/60 border border-slate-700/40 text-slate-400 cursor-pointer"
                >
                  <option value="">Load...</option>
                  {(JSON.parse(localStorage.getItem(`adventure:encounters:${roomId}`) || '[]') as Array<{ name: string }>).map((t, i) => (
                    <option key={i} value={i}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chase Scene */}
            <div className="mb-3 flex gap-1.5">
              {['urban', 'wilderness'].map((env) => (
                <button
                  key={env}
                  onClick={async () => {
                    const { resolveChaseRound } = await import('../../data/chaseObstacles');
                    const lines: string[] = [`🏃 **Chase Scene (${env})** — Round`];
                    for (const ch of characters) {
                      const dexMod = Math.floor(((ch.stats?.DEX ?? 10) - 10) / 2);
                      const result = resolveChaseRound(ch.name, dexMod, env === 'urban');
                      lines.push(result.narration);
                    }
                    onAddDmMessage(lines.join('\n'));
                  }}
                  className="flex-1 text-[9px] py-1 rounded bg-sky-900/30 border border-sky-600/40 text-sky-300 font-semibold hover:bg-sky-800/40 transition-all capitalize"
                  title={`Run one round of a ${env} chase scene for all party members`}
                >
                  {env} Chase
                </button>
              ))}
            </div>

            {/* Downtime Activities */}
            <details className="mb-3">
              <summary className="text-[10px] text-slate-500 font-bold uppercase cursor-pointer hover:text-slate-300">Downtime Activities</summary>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {['crafting', 'research', 'carousing', 'pit-fighting', 'gambling', 'recuperating'].map((actId) => (
                  <button
                    key={actId}
                    onClick={async () => {
                      const { DOWNTIME_ACTIVITIES, performDowntimeActivity } = await import('../../data/downtimeActivities');
                      const activity = DOWNTIME_ACTIVITIES.find((a) => a.id === actId);
                      if (!activity) return;
                      const char = characters[0];
                      const skillMod = char ? Math.floor(((char.stats?.CHA ?? 10) - 10) / 2) : 0;
                      const result = performDowntimeActivity(actId, skillMod);
                      const goldStr = result.goldChange !== 0 ? ` (${result.goldChange > 0 ? '+' : ''}${result.goldChange} gp)` : '';
                      onAddDmMessage(`🎲 **Downtime: ${activity.name}**${result.success ? ' ✅' : ' ❌'}\n${result.outcome}${goldStr}`);
                      if (char && result.goldChange !== 0) updateCharacter(char.id, { gold: Math.max(0, (char.gold || 0) + result.goldChange) });
                    }}
                    className="text-[8px] px-1.5 py-1 rounded bg-slate-800/60 border border-slate-700/40 text-slate-500 hover:text-emerald-400 hover:border-emerald-600/40 font-semibold transition-all capitalize"
                    title={actId.replace('-', ' ')}
                  >
                    {actId.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </details>

            {/* Milestone XP / Level Grant */}
            <div className="mb-3 space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Milestone Rewards</label>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    for (const ch of characters) {
                      grantXP(ch.id, Math.floor(XP_THRESHOLDS[ch.level] * 0.3) || 100);
                    }
                    onAddDmMessage('🌟 **Milestone XP** awarded to all party members!');
                  }}
                  className="flex-1 text-[9px] py-1 rounded bg-purple-900/30 border border-purple-600/40 text-purple-300 font-semibold hover:bg-purple-800/40 transition-all"
                  title="Award milestone XP (~30% of next level) to all party members"
                >
                  Award XP
                </button>
                <button
                  onClick={() => {
                    for (const ch of characters) {
                      const xpNeeded = (XP_THRESHOLDS[ch.level] || 0) - ch.xp;
                      if (xpNeeded > 0) grantXP(ch.id, xpNeeded);
                    }
                    onAddDmMessage('⭐ **Milestone Level Up!** All party members advance to the next level!');
                  }}
                  className="flex-1 text-[9px] py-1 rounded bg-yellow-900/30 border border-yellow-600/40 text-yellow-300 font-semibold hover:bg-yellow-800/40 transition-all"
                  title="Instantly level up all party members (milestone leveling)"
                >
                  Level Up All
                </button>
              </div>
            </div>

            {/* Treasure Hoard roller */}
            <div className="mb-3">
              <button
                onClick={async () => {
                  const avgLevel = characters.length > 0 ? Math.round(characters.reduce((s, c) => s + c.level, 0) / characters.length) : 3;
                  const { rollTreasureHoard } = await import('../../data/treasureHoards');
                  const hoard = rollTreasureHoard(avgLevel);
                  let msg = `💰 **Treasure Hoard** (party level ${avgLevel}):\n${hoard.gold} gold`;
                  if (hoard.gems.length > 0) msg += `\nGems: ${hoard.gems.map((g) => `${g.name} (${g.value}gp)`).join(', ')}`;
                  if (hoard.items.length > 0) msg += `\nMagic items: ${hoard.items.map((i) => `**${i.name}** (${i.rarity}, ${i.value}gp)`).join(', ')}`;
                  // Smart loot suggestions
                  if (hoard.items.length > 0 && characters.length > 0) {
                    const { suggestLootDistribution, formatLootSuggestions } = await import('../../lib/lootDistribution');
                    const suggestions = suggestLootDistribution(hoard.items, characters);
                    msg += `\n\n📦 **Suggested Distribution:**\n${formatLootSuggestions(suggestions)}`;
                  }
                  onAddDmMessage(msg);
                }}
                className="w-full text-[10px] py-1.5 rounded bg-amber-600/20 border border-amber-500/40 text-amber-400 font-semibold hover:bg-amber-500/30 transition-all"
                title="Roll a level-appropriate treasure hoard with gold, gems, and magic items"
              >
                Roll Treasure Hoard
              </button>
            </div>

            {/* Random Encounter roller */}
            <div className="mb-3 space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Random Encounter</label>
              <div className="flex gap-1.5">
                {['forest', 'dungeon', 'mountain', 'swamp', 'urban'].map((env) => (
                  <button
                    key={env}
                    onClick={async () => {
                      const { rollRandomEncounter, rollEncounterCount } = await import('../../data/randomEncounters');
                      const entry = rollRandomEncounter(env);
                      const count = rollEncounterCount(entry);
                      const msg = count > 0
                        ? `🎲 Random encounter (${env}): **${entry.name}** × ${count} (CR ${entry.cr})\n${entry.description}`
                        : `🎲 Random encounter (${env}): **${entry.name}**\n${entry.description}`;
                      onAddDmMessage(msg);
                    }}
                    className="text-[8px] px-1.5 py-1 rounded bg-slate-800/60 border border-slate-700/40 text-slate-500 hover:text-[#F38020] hover:border-[#F38020]/40 font-semibold transition-all capitalize"
                    title={`Roll random encounter for ${env} environment`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Session Prep — DM enters goals, gets generated content */}
            <details className="mb-3">
              <summary className="text-[10px] text-[#F38020] font-bold uppercase tracking-wider cursor-pointer hover:text-[#ff8c2e] select-none">AI Session Prep</summary>
              <div className="mt-2 space-y-2">
                <textarea
                  placeholder="Describe your session goals... (e.g. 'Players explore the ruins, encounter a trapped puzzle room, then fight the necromancer boss')"
                  rows={3}
                  className="w-full text-[10px] px-2 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 resize-none"
                  id="dm-session-prep-input"
                />
                <button
                  onClick={async () => {
                    const input = (document.getElementById('dm-session-prep-input') as HTMLTextAreaElement)?.value?.trim();
                    if (!input) return;
                    const btn = document.activeElement as HTMLButtonElement;
                    btn.disabled = true;
                    btn.textContent = 'Generating...';
                    try {
                      const res = await fetch('/api/dm/narrate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          scene: `Session Prep: ${input}`,
                          action: `Generate a session outline with: 1) Opening narration for the session. 2) 2-3 encounter descriptions with enemy suggestions and difficulty. 3) 2-3 NPC names with personality and role. 4) A potential plot twist or complication. Format as clear sections.`,
                          context: `This is a D&D 5e campaign. The party is level ${characters.length > 0 ? Math.max(...characters.map((c) => c.level)) : 3}. Party size: ${characters.length || 4} players.`,
                          history: [],
                        }),
                      });
                      const data = await res.json() as { narration?: string; error?: string };
                      if (data.narration) {
                        onAddDmMessage(`📋 **Session Prep**\n${data.narration}`);
                      } else {
                        onAddDmMessage('*Session prep generation failed. Try again with more detail.*');
                      }
                    } catch {
                      onAddDmMessage('*Connection error during session prep.*');
                    } finally {
                      btn.disabled = false;
                      btn.textContent = 'Generate Session Outline';
                    }
                  }}
                  className="w-full text-[10px] py-1.5 rounded bg-[#F38020]/20 border border-[#F38020]/40 text-[#F38020] font-semibold hover:bg-[#F38020]/30 transition-all"
                >
                  Generate Session Outline
                </button>
              </div>
            </details>

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
            {/* DM Personality mode */}
            <div className="flex items-center justify-between py-1">
              <span className="text-[10px] text-slate-500">DM Style</span>
              <select
                value={dmPersonality || 'classic'}
                onChange={(e) => {
                  const val = e.target.value as import('../../data/dmPersonalities').DMPersonality;
                  setDmPersonality?.(val);
                  try { localStorage.setItem('adventure:dmPersonality', val); } catch {}
                }}
                className="text-[9px] px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 cursor-pointer"
              >
                <option value="classic">📖 Classic</option>
                <option value="humorous">😂 Comedic</option>
                <option value="dramatic">⚡ Epic</option>
                <option value="grimdark">💀 Grimdark</option>
                <option value="whimsical">✨ Fairy Tale</option>
              </select>
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
            {/* Homebrew Content Editor */}
            <div className="space-y-1.5 mb-3">
              <label className="text-[10px] text-slate-500 font-semibold uppercase">Homebrew Content</label>
              <HomebrewEditor roomId={roomId} />
            </div>

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
            {setDmPersonality && (
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
                      onClick={() => setDmPersonality?.(p.id as import('../../data/dmPersonalities').DMPersonality)}
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
