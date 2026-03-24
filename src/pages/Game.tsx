import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react';
import InitiativeBar from '../components/combat/InitiativeBar';
import BattleMap, { type ActiveAoE } from '../components/combat/BattleMap';
import CharacterSheet from '../components/combat/CharacterSheet';
import DiceRoller, { type DiceRollerHandle, type LocalRollResult } from '../components/dice/DiceRoller';
import BG3RollPopup from '../components/dice/BG3RollPopup';
import ChatPanel, { type ChatMessage, type SlashRollResult } from '../components/chat/ChatPanel';
import { Button } from '../components/ui/button';
import { useGame, type Unit, type DieType, type Character, type StatName, type EnemyAbility, type Item, type Spell, generateEnemies, rollSpellDamage, CONDITION_EFFECTS, randomEncounterTheme, hasPendingASI } from '../contexts/GameContext';
import LevelUpModal from '../components/game/LevelUpModal';
import CharacterPicker from '../components/game/CharacterPicker';
import { type TerrainType, type TokenPosition } from '../lib/mapUtils';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';
import { playEncounterStart, playMagicSpell, playEnemyDeath, playDiceRoll, playCritical, playFumble, isMuted, toggleMute, getVolume, setVolume, setAmbientMood, getAmbientMood, type AmbientMood, getDiceSoundPack, setDiceSoundPack, DICE_SOUND_PACKS, type DiceSoundPack } from '../hooks/useSoundFX';
import { fetchWithTimeout } from '../lib/fetchUtils';
import { loadChatHistory, persistChatMessage } from '../lib/chatApi';
import { useEnemyAI } from '../hooks/useEnemyAI';
import { useAIPlayerTurn } from '../hooks/useAIPlayerTurn';
import { useDynamicDifficulty } from '../hooks/useDynamicDifficulty';
import { useAttackIndicators } from '../hooks/useAttackIndicators';
import { useGameWebSocket } from '../hooks/useGameWebSocket';
import { useCampaignPersistence, type CampaignLoadResult } from '../hooks/useCampaignPersistence';
import { DARKVISION_RACES, DARKVISION_RANGE, NORMAL_VISION_RANGE, type Quest, type MapPin } from '../types/game';
import type { RollInterpolationMode, RollPresentation } from '../types/roll';
import DMSidebar from '../components/game/DMSidebar';
import NarrationPanel from '../components/game/NarrationPanel';
import CombatToolbar from '../components/game/CombatToolbar';
import { type JournalEntry } from '../components/game/SessionJournal';
import SessionTimer from '../components/game/SessionTimer';
import { type LootItem } from '../components/game/LootTracker';
// Lazy-loaded view components — only loaded when their tab is active
const ShopView = lazy(() => import('../components/game/ShopView'));
const SessionJournal = lazy(() => import('../components/game/SessionJournal'));
const MonsterBrowser = lazy(() => import('../components/game/MonsterBrowser'));
const RulesReference = lazy(() => import('../components/game/RulesReference'));
const LootTracker = lazy(() => import('../components/game/LootTracker'));
const EncounterLog = lazy(() => import('../components/game/EncounterLog'));
const NpcTracker = lazy(() => import('../components/game/NpcTracker'));
const DiceStats = lazy(() => import('../components/game/DiceStats'));
import CombatRecap from '../components/game/CombatRecap';
import CombatMVP from '../components/game/CombatMVP';
const EncounterPostmortem = lazy(() => import('../components/game/EncounterPostmortem'));
const PerfDashboard = lazy(() => import('../components/game/PerfDashboard'));
const KeyboardShortcuts = lazy(() => import('../components/game/KeyboardShortcuts'));
const WeatherParticles = lazy(() => import('../components/combat/WeatherParticles'));
import EncounterXPTracker from '../components/game/EncounterXPTracker';
import HPFlytext, { useHPFlytext } from '../components/combat/HPFlytext';
import CritCelebration, { useCritCelebration } from '../components/game/CritCelebration';
import KillStreak, { useKillStreak } from '../components/game/KillStreak';
import { rollFumble, type FumbleEffect } from '../data/fumbleTable';
import DeathSaveCinematic, { useDeathSaveCinematic } from '../components/game/DeathSaveCinematic';
import DiceLuckTracker from '../components/game/DiceLuckTracker';
import DiceSuperstition from '../components/game/DiceSuperstition';
import DeathRecap, { useDeathRecap } from '../components/game/DeathRecap';
import SessionMilestones, { useSessionMilestones } from '../components/game/SessionMilestones';
import SceneTransition from '../components/game/SceneTransition';
import PartyVitals from '../components/game/PartyVitals';
import SessionSummary from '../components/game/SessionSummary';
import DiceTower, { useDiceTower } from '../components/dice/DiceTower';
import LevelUpFanfare, { useLevelUpFanfare } from '../components/game/LevelUpFanfare';
import EncounterThermometer from '../components/game/EncounterThermometer';
import AbilityCheckRoller from '../components/game/AbilityCheckRoller';
import SavingThrowRoller from '../components/game/SavingThrowRoller';
import DamageLeaderboard from '../components/game/DamageLeaderboard';
import SessionStreak from '../components/game/SessionStreak';
import OfflineBanner from '../components/game/OfflineBanner';
import { emitPluginEvent, setPluginMessageCallback } from '../lib/plugins';
import RoundMVP, { useRoundMVP } from '../components/game/RoundMVP';
import CombatEmotes, { useCombatEmotes } from '../components/game/CombatEmotes';
const CampaignTimeline = lazy(() => import('../components/game/CampaignTimeline'));
const RelationshipGraph = lazy(() => import('../components/game/RelationshipGraph'));
const QuestMap = lazy(() => import('../components/game/QuestMap'));
import { useVoiceChat } from '../hooks/useVoiceChat';
const CombatReplay = lazy(() => import('../components/game/CombatReplay'));
import { type WikiPage } from '../components/game/WorldWiki';
const WorldWiki = lazy(() => import('../components/game/WorldWiki'));
import { type CalendarState } from '../components/game/CampaignCalendar';
const CampaignCalendar = lazy(() => import('../components/game/CampaignCalendar'));
const CharacterCompare = lazy(() => import('../components/game/CharacterCompare'));
import { startRecording, recordEvent, stopRecording, isRecording } from '../lib/combatRecorder';
import type { CombatRecording } from '../lib/combatRecorder';
const Achievements = lazy(() => import('../components/game/Achievements'));
import { type Monster } from '../data/monsters';
import PartyHealthBar from '../components/game/PartyHealthBar';
import FloatingCombatText, { useFloatingCombatText } from '../components/game/FloatingCombatText';

// API base — empty string uses same origin, Vite proxy forwards /api to wrangler in dev
function apiBase(): string {
  return '';
}

export default function Game() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = roomId || 'default';
  const {
    setPlayers,
    setUnits,
    units,
    setCurrentPlayer,
    currentPlayer,
    rolls,
    selectedUnitId,
    setSelectedUnitId,
    characters,
    inCombat,
    setInCombat,
    rollInitiative,
    nextTurn,
    combatRound,
    setCombatRound,
    turnIndex,
    setTurnIndex,
    damageUnit,
    removeUnit,
    grantXP,
    restCharacter,
    updateCharacter,
    addItem,
    useItem,

    castSpell,
    restoreSpellSlots,
    applyCondition,
    removeCondition,
    tickConditions,
    useClassAbility,
    concentrationMessages,
    terrain,
    setTerrain,
    mapPositions,
    setMapPositions,
    mapImageUrl,
    setMapImageUrl,
  } = useGame();

  // Ref for BattleMap animated token movement
  const animateMoveRef = useRef<((unitId: string, fromCol: number, fromRow: number, toCol: number, toRow: number) => void) | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [oldestChatTs, setOldestChatTs] = useState<number | null>(null);
  const [canLoadOlderChat, setCanLoadOlderChat] = useState(true);
  const [loadingOlderChat, setLoadingOlderChat] = useState(false);
  const [initialReadAnchorTs, setInitialReadAnchorTs] = useState<number | null>(null);
  const [activeRollPopup, setActiveRollPopup] = useState<RollPresentation | null>(null);
  const [rollPopupVisible, setRollPopupVisible] = useState(false);
  const [serverTimeOffsetMs, setServerTimeOffsetMs] = useState(0);
  const [clockRttMs, setClockRttMs] = useState<number | null>(null);
  const [rollInterpolationMode, setRollInterpolationMode] = useState<RollInterpolationMode>('smooth');
  const [autoStrictRttMs, setAutoStrictRttMs] = useState(260);
  const [autoStrictJitterMs, setAutoStrictJitterMs] = useState(90);
  const rttHistoryRef = useRef<number[]>([]);
  const [playerLatency, setPlayerLatency] = useState<Record<string, number>>({});
  const [stalePlayers, setStalePlayers] = useState<Set<string>>(new Set());
  const rollPopupHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const diceRef = useRef<DiceRollerHandle>(null);
  const journalSyncRef = useRef<(entries: JournalEntry[]) => void>(null);
  const lootSyncRef = useRef<(items: LootItem[]) => void>(null);
  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;

  const showRollPopup = useCallback((roll: RollPresentation) => {
    if (rollPopupHideRef.current) {
      clearTimeout(rollPopupHideRef.current);
      rollPopupHideRef.current = null;
    }
    setActiveRollPopup(roll);
    requestAnimationFrame(() => setRollPopupVisible(true));
  }, []);

  const hideRollPopup = useCallback(() => {
    setRollPopupVisible(false);
    if (rollPopupHideRef.current) clearTimeout(rollPopupHideRef.current);
    rollPopupHideRef.current = setTimeout(() => {
      setActiveRollPopup(null);
      rollPopupHideRef.current = null;
    }, 340);
  }, []);

  useEffect(() => {
    return () => {
      if (rollPopupHideRef.current) clearTimeout(rollPopupHideRef.current);
    };
  }, []);

  // Game state — derive selectedCharacter from characters array so it stays reactive
  // to GameContext updates (grantXP, restCharacter, updateCharacter, damageUnit, etc.)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const selectedCharacter = selectedCharacterId ? (characters.find((c) => c.id === selectedCharacterId) ?? null) : null;
  const [showCharacterPicker, setShowCharacterPicker] = useState(true);
  // AI player character IDs — loaded from sessionStorage (set by Lobby on Start Game)
  const [aiCharacterIds] = useState<Set<string>>(() => {
    try {
      const saved = sessionStorage.getItem(`adventure:aiCharIds:${room}`);
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
    } catch { return new Set(); }
  });
  const [dmLoading, setDmLoading] = useState(false);
  const [encounterLoading, setEncounterLoading] = useState(false);
  // Multi-floor dungeon state
  const [currentFloor, setCurrentFloor] = useState(0);
  const [floorNames, setFloorNames] = useState<string[]>(['Ground Floor']);
  // Per-floor terrain + lighting storage
  type FloorData = { terrain: import('../lib/mapUtils').TerrainType[][]; lighting: import('../components/combat/BattleMap').LightingLevel[][] };
  const floorDataRef = useRef<FloorData[]>([]);
  // Environmental lighting grid (DM paints bright/dim/dark zones)
  const [lightingGrid, setLightingGrid] = useState<import('../components/combat/BattleMap').LightingLevel[][]>(
    () => Array.from({ length: 20 }, () => Array(20).fill('normal'))
  );

  // Save/restore floor data when switching floors
  const prevFloorRef = useRef(0);
  useEffect(() => {
    const prev = prevFloorRef.current;
    if (prev === currentFloor) return;
    // Save current floor's data
    floorDataRef.current[prev] = { terrain: terrain.map((r) => [...r]), lighting: lightingGrid.map((r) => [...r]) };
    // Load new floor's data (or create fresh)
    const saved = floorDataRef.current[currentFloor];
    if (saved) {
      setTerrain(saved.terrain);
      setLightingGrid(saved.lighting);
    } else {
      // New floor — blank grid
      const rows = terrain.length;
      const cols = terrain[0]?.length || 20;
      setTerrain(Array.from({ length: rows }, () => Array(cols).fill('floor')));
      setLightingGrid(Array.from({ length: rows }, () => Array(cols).fill('normal')));
    }
    prevFloorRef.current = currentFloor;
  }, [currentFloor]); // eslint-disable-line react-hooks/exhaustive-deps
  // Persist DM history to localStorage keyed by room ID
  const dmStorageKey = `adventure:dm-history:${room}`;
  const [dmHistory, setDmHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(dmStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [adventureStarted] = [dmHistory.length > 0]; // auto-detect from history
  const [actionInput, setActionInput] = useState('');
  // Juice hooks — the charm that makes this VTT feel alive
  const [fumbleDisplay, setFumbleDisplay] = useState<FumbleEffect | null>(null);
  const [secretRollMode, setSecretRollMode] = useState(false);
  const [secretRolls, setSecretRolls] = useState<Array<{ id: string; die: string; value: number; revealed: boolean }>>([]);
  const preCombatAmbientRef = useRef<AmbientMood>('none');
  const [incomingPings, setIncomingPings] = useState<Array<{ col: number; row: number; time: number }>>([]);
  const [showSessionSummary, setShowSessionSummary] = useState(false);
  const sessionStartTime = useRef(Date.now());
  const { flytexts, addFlytext } = useHPFlytext();
  const { active: critActive, confetti: critConfetti, trigger: triggerCrit } = useCritCelebration();
  const { display: killStreakDisplay, recordKill } = useKillStreak();
  const { display: deathSaveDisplay, trigger: triggerDeathSave } = useDeathSaveCinematic();
  const { display: deathRecapDisplay, recordDamage, triggerRecap: triggerDeathRecap } = useDeathRecap();
  const { toast: milestoneToast, recordDamage: milestoneDamage, recordRoll: milestoneRoll, recordKill: milestoneKill, recordCrit: milestoneCrit } = useSessionMilestones();
  const { display: diceTowerDisplay, trigger: triggerDiceTower } = useDiceTower();
  const { display: roundMVPDisplay, check: checkRoundMVP } = useRoundMVP();
  const { display: levelUpDisplay, trigger: triggerLevelUp } = useLevelUpFanfare();
  const [initiativeLocked, setInitiativeLocked] = useState(false);
  // Ready check system
  const [readyCheck, setReadyCheck] = useState<{ active: boolean; responses: Record<string, boolean>; startedAt: number } | null>(null);
  const [soundMuted, setSoundMuted] = useState(isMuted());
  const [soundVolume, setSoundVolume] = useState(getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [activeDicePack, setActiveDicePack] = useState<DiceSoundPack>(getDiceSoundPack());
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [showCombatLog, setShowCombatLog] = useState(false);
  const [activeView, setActiveView] = useState<'narration' | 'map' | 'shop' | 'journal' | 'loot' | 'encounters' | 'npcs' | 'dicestats' | 'timeline' | 'achievements' | 'relationships' | 'wiki' | 'calendar'>('narration');
  // Mobile layout: bottom tab bar controls which panel is visible
  const [mobilePanel, setMobilePanel] = useState<'game' | 'chat' | 'sheet'>('game');

  const [shopMessage, setShopMessage] = useState<string | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [playerNotes, setPlayerNotes] = useState(() => {
    try { return localStorage.getItem(`adventure:notes:${room}`) || ''; } catch { return ''; }
  });
  // Auto-save notes with 1s debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      try { localStorage.setItem(`adventure:notes:${room}`, playerNotes); } catch { /* ok */ }
    }, 1000);
    return () => clearTimeout(timer);
  }, [playerNotes, room]);
  const [encounterDifficulty, setEncounterDifficulty] = useState<'easy' | 'medium' | 'hard' | 'deadly'>('medium');

  // Floating combat text (damage numbers, miss, heal)
  const { texts: floatingTexts, addFloatingText, expireText: expireFloatingText } = useFloatingCombatText();

  // AoE spell targeting state
  const [activeAoE, setActiveAoE] = useState<ActiveAoE | null>(null);
  const [pendingAoESpell, setPendingAoESpell] = useState<{ spell: Spell; charId: string } | null>(null);

  // DM sidebar + session notes (auto-saved to localStorage)
  const [showDMSidebar, setShowDMSidebar] = useState(false);
  const [dmNotes, setDmNotes] = useState(() => {
    try { return localStorage.getItem(`adventure:dmnotes:${room}`) || ''; } catch { return ''; }
  });
  const [currentAmbient, setCurrentAmbient] = useState<AmbientMood>(getAmbientMood());

  // AI backstory hooks
  const [backstoryHooks, setBackstoryHooks] = useState<string[]>([]);
  const [hooksLoading, setHooksLoading] = useState(false);
  const [partyInventory, setPartyInventory] = useState<import('../types/game').Item[]>([]);
  const [stagedLoot, setStagedLoot] = useState<import('../types/game').Item[]>([]);
  const [relationships, setRelationships] = useState<import('../components/game/RelationshipGraph').RelationshipEdge[]>([]);
  const [aiBackend, setAiBackend] = useState<string>('...');
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [recordings, setRecordings] = useState<CombatRecording[]>([]);
  const [wikiPages, setWikiPages] = useState<WikiPage[]>([]);
  const [calendar, setCalendar] = useState<CalendarState>({ currentDay: 1, events: [] });
  const [showReplay, setShowReplay] = useState<CombatRecording | null>(null);
  const [dmPersonality, setDmPersonality] = useState<string>(() => {
    try { return localStorage.getItem(`adventure:dm-personality:${room}`) || 'theatrical'; } catch { return 'theatrical'; }
  });
  // Level-up choice modal state
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  // Keyboard shortcut help overlay
  const [showHelpOverlay, setShowHelpOverlay] = useState(false);
  // Monster manual browser modal
  const [showMonsterBrowser, setShowMonsterBrowser] = useState(false);
  // Rules reference modal
  const [showRulesRef, setShowRulesRef] = useState(false);

  // Weather effects on battle map
  const [weather, setWeather] = useState<'none' | 'rain' | 'fog' | 'snow' | 'sandstorm'>('none');

  // Map pins — DM-placed annotations on the battle map
  const pinStorageKey = `adventure:pins:${room}`;
  const [mapPins, setMapPins] = useState<MapPin[]>(() => {
    try {
      const s = localStorage.getItem(pinStorageKey);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try { localStorage.setItem(pinStorageKey, JSON.stringify(mapPins)); } catch { /* full */ }
  }, [mapPins, pinStorageKey]);

  // Turn timer — DM-configurable
  const [turnTimerEnabled, setTurnTimerEnabled] = useState(true);
  const [turnTimeSeconds, setTurnTimeSeconds] = useState(60);

   // Quest tracker
   const questStorageKey = `adventure:quests:${room}`;
  const [quests, setQuests] = useState<Quest[]>(() => {
    try {
      const s = localStorage.getItem(questStorageKey);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });
  const [showQuests, setShowQuests] = useState(false);
  const [showDiceHistory, setShowDiceHistory] = useState(false);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  useEffect(() => {
    try {
      localStorage.setItem(questStorageKey, JSON.stringify(quests));
    } catch {
      /* full */
    }
  }, [quests, questStorageKey]);

  // DM notes auto-save
  useEffect(() => {
    try { localStorage.setItem(`adventure:dmnotes:${room}`, dmNotes); } catch { /* full */ }
  }, [dmNotes, room]);

  // NPC dialogue state
  const [npcMode, setNpcMode] = useState(false);
  const [npcName, setNpcName] = useState('');
  const [npcRole, setNpcRole] = useState('');
  const [npcLoading, setNpcLoading] = useState(false);
  const [npcDialogueHistory, setNpcDialogueHistory] = useState<string[]>([]);
  const [sceneName, setSceneName] = useState(() => {
    try {
      return localStorage.getItem(`adventure:scene:${room}`) || '';
    } catch {
      return '';
    }
  });

  // Load persistent chat history from D1 on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`adventure:chatRead:game:${room}:${currentPlayer.id}`);
      setInitialReadAnchorTs(stored ? Number(stored) : null);
    } catch {
      setInitialReadAnchorTs(null);
    }
    loadChatHistory(room).then((history) => {
      if (history.length > 0) {
        setOldestChatTs(history[0].timestamp);
        setCanLoadOlderChat(history.length >= 100);
        setChatMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMsgs = history.filter((m) => !existingIds.has(m.id));
          return newMsgs.length > 0 ? [...newMsgs, ...prev] : prev;
        });
      } else {
        setCanLoadOlderChat(false);
      }
    });
  }, [room, currentPlayer.id]);

  const handleMarkRead = useCallback((timestamp: number) => {
    try {
      localStorage.setItem(`adventure:chatRead:game:${room}:${currentPlayer.id}`, String(timestamp));
    } catch {
      // ignore storage failures
    }
  }, [room, currentPlayer.id]);

  const handleLoadOlderChat = useCallback(() => {
    if (loadingOlderChat || !canLoadOlderChat || !oldestChatTs) return;
    setLoadingOlderChat(true);
    loadChatHistory(room, 100, oldestChatTs)
      .then((history) => {
        if (history.length === 0) {
          setCanLoadOlderChat(false);
          return;
        }
        setOldestChatTs(history[0].timestamp);
        setCanLoadOlderChat(history.length >= 100);
        setChatMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMsgs = history.filter((m) => !existingIds.has(m.id));
          return newMsgs.length > 0 ? [...newMsgs, ...prev] : prev;
        });
      })
      .finally(() => setLoadingOlderChat(false));
  }, [loadingOlderChat, canLoadOlderChat, oldestChatTs, room]);

  // Derived: is it currently the human player's turn? AI player turns are auto-played.
  const currentTurnUnit = units.find((u) => u.isCurrentTurn);
  const isAIPlayerTurn = currentTurnUnit?.type === 'player' && currentTurnUnit.characterId && aiCharacterIds.has(currentTurnUnit.characterId);
  const isPlayerTurn = !inCombat || (currentTurnUnit?.type === 'player' && !isAIPlayerTurn);

  // Drain concentration break messages into combat log (collected by damageUnit ref)
  // Call after any action that triggers damageUnit
  const drainConcentrationMessages = () => {
    if (concentrationMessages.current.length > 0) {
      const msgs = [...concentrationMessages.current];
      concentrationMessages.current = [];
      for (const m of msgs) {
        setCombatLog((prev) => [...prev, m]);
        setDmHistory((prev) => [...prev, m]);
      }
    }
  };

  // Persist DM history + scene to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(dmStorageKey, JSON.stringify(dmHistory));
    } catch {
      /* full */
    }
  }, [dmHistory, dmStorageKey]);
  useEffect(() => {
    try {
      localStorage.setItem(`adventure:scene:${room}`, sceneName);
    } catch {
      /* full */
    }
  }, [sceneName, room]);

  // Campaign persistence — auto-save, server load, registration (extracted hook)
  const getCampaignState = useCallback(() => ({
    dmHistory, sceneName, selectedCharacterId, combatLog,
    units, inCombat, combatRound, terrain, mapPositions, mapImageUrl, quests, lightingGrid, backstoryHooks, partyInventory, relationships, wikiPages, recordings: recordings.slice(-5), calendar,
    floorNames, currentFloor,
    floorData: (() => { const fd = [...floorDataRef.current]; fd[currentFloor] = { terrain: terrain.map((r) => [...r]), lighting: lightingGrid.map((r) => [...r]) }; return fd; })(),
  }), [dmHistory, sceneName, selectedCharacterId, combatLog, units, inCombat, combatRound, terrain, mapPositions, mapImageUrl, quests, lightingGrid, backstoryHooks, partyInventory, relationships, floorNames, currentFloor]);

  const handleCampaignLoad = useCallback((data: CampaignLoadResult) => {
    if (data.dmHistory) setDmHistory(data.dmHistory);
    if (data.sceneName) setSceneName(data.sceneName);
    if (data.units) setUnits(data.units);
    if (data.inCombat !== undefined) setInCombat(data.inCombat);
    if (data.combatRound !== undefined) setCombatRound(data.combatRound);
    if (data.turnIndex !== undefined) setTurnIndex(data.turnIndex);
    if (data.terrain) setTerrain(data.terrain);
    if (data.mapPositions) setMapPositions(data.mapPositions);
    if (data.mapImageUrl !== undefined) setMapImageUrl(data.mapImageUrl);
    if (data.quests) setQuests(data.quests);
    if (data.combatLog) setCombatLog(data.combatLog);
    if (data.lightingGrid) setLightingGrid(data.lightingGrid);
    if (data.backstoryHooks && data.backstoryHooks.length > 0) setBackstoryHooks(data.backstoryHooks);
    if (data.partyInventory) setPartyInventory(data.partyInventory);
    if (data.relationships && Array.isArray(data.relationships)) setRelationships(data.relationships as typeof relationships);
    if (data.wikiPages && Array.isArray(data.wikiPages)) setWikiPages(data.wikiPages as WikiPage[]);
    if (data.recordings && Array.isArray(data.recordings)) setRecordings(data.recordings as CombatRecording[]);
    if (data.calendar && typeof data.calendar === 'object') setCalendar(data.calendar as CalendarState);
    if (data.floorNames && Array.isArray(data.floorNames)) setFloorNames(data.floorNames as string[]);
    if (typeof data.currentFloor === 'number') setCurrentFloor(data.currentFloor as number);
    if (data.floorData && Array.isArray(data.floorData)) {
      floorDataRef.current = (data.floorData as FloorData[]);
    }
  }, [setUnits, setInCombat, setCombatRound, setTurnIndex, setTerrain, setMapPositions, setMapImageUrl]);

  // Ref for auto-select — avoids stale closure since handleSelectCharacter is defined later
  const autoSelectCharRef = useRef<(id: string) => void>(() => {});

  const { saveStatus, lastSavedAt } = useCampaignPersistence({
    room,
    adventureStarted,
    getState: getCampaignState,
    onLoad: handleCampaignLoad,
    onAutoSelectCharacter: (charId) => autoSelectCharRef.current(charId),
    characters,
    selectedCharacterId,
    dmHistoryLength: dmHistory.length,
    sceneName,
    saveDeps: [dmHistory, sceneName, selectedCharacterId, combatLog, room, adventureStarted, inCombat, units, combatRound, terrain, mapPositions, mapImageUrl, quests],
  });

  // Ref for WebSocket send — avoids circular deps between callbacks and useWebSocket
  const sendRef = useRef<(msg: WSMessage) => void>(() => {});

  // --- Multiplayer sync infrastructure ---
  // When true, we're applying a remote game event — suppress rebroadcast
  const isRemoteEventRef = useRef(false);

  // Broadcast a game state event to all other players via WebSocket
  const broadcastGameEvent = useCallback((event: string, data: Record<string, unknown>) => {
    if (isRemoteEventRef.current) return; // don't echo remote events back
    sendRef.current({ type: 'game_event', event, data });
  }, []);

  // Combat emotes — quick reactions broadcast to all players
  const [emoteIncoming, setEmoteIncoming] = useState<{ id: string; icon: string; sender: string } | null>(null);
  const emoteTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sendEmote = useCallback((emoteId: string) => {
    const emotes: Record<string, string> = { cheer: '🎉', gasp: '😱', laugh: '😂', salute: '⚔️', think: '🤔', skull: '💀' };
    const icon = emotes[emoteId];
    if (!icon) return;
    const sender = currentPlayer.username || 'Someone';
    broadcastGameEvent('combat_emote', { icon, sender });
    setEmoteIncoming({ id: crypto.randomUUID().slice(0, 6), icon, sender });
    clearTimeout(emoteTimerRef.current);
    emoteTimerRef.current = setTimeout(() => setEmoteIncoming(null), 2000);
  }, [broadcastGameEvent, currentPlayer.username]);

  // Broadcast full combat state snapshot — used after most mutations (with explicit state)
  const broadcastCombatSync = useCallback(
    (syncUnits: Unit[], syncInCombat?: boolean, syncRound?: number, syncTurnIdx?: number) => {
      broadcastGameEvent('game_sync', {
        units: syncUnits,
        inCombat: syncInCombat ?? inCombat,
        combatRound: syncRound ?? combatRound,
        turnIndex: syncTurnIdx ?? turnIndex,
      });
    },
    [broadcastGameEvent, inCombat, combatRound, turnIndex]
  );

  // Refs that always track latest state — for delayed broadcasts after React batches
  const unitsRef = useRef(units);
  unitsRef.current = units;
  const combatRoundRef = useRef(combatRound);
  combatRoundRef.current = combatRound;
  const turnIndexRef = useRef(turnIndex);
  turnIndexRef.current = turnIndex;
  const inCombatRef = useRef(inCombat);
  inCombatRef.current = inCombat;
  const mapPositionsRef = useRef(mapPositions);
  mapPositionsRef.current = mapPositions;

  // Provide current state for late-join state_request responses (uses refs for freshness)
  const mapPinsRef = useRef(mapPins);
  mapPinsRef.current = mapPins;
  const getStateForResponse = useCallback(() => ({
    units: unitsRef.current,
    inCombat: inCombatRef.current,
    combatRound: combatRoundRef.current,
    turnIndex: turnIndexRef.current,
    terrain,
    mapPositions: mapPositionsRef.current,
    mapImageUrl,
    sceneName,
    quests,
    dmHistory,
    mapPins: mapPinsRef.current,
  }), [terrain, mapImageUrl, sceneName, quests, dmHistory]);

  // Map pin handlers — add/remove with broadcast
  const handlePinAdd = useCallback((pin: MapPin) => {
    setMapPins((prev) => [...prev, pin]);
    broadcastGameEvent('pin_sync', { pins: [...mapPinsRef.current, pin] });
  }, [broadcastGameEvent]);
  const handlePinRemove = useCallback((pinId: string) => {
    setMapPins((prev) => prev.filter((p) => p.id !== pinId));
    broadcastGameEvent('pin_sync', { pins: mapPinsRef.current.filter((p) => p.id !== pinId) });
  }, [broadcastGameEvent]);

  // --- WebSocket message handling (extracted hook) ---
  const { wsPlayerId, isDM, isSpectating, wsConnected, setWsConnected, handleWsMessage, typingUsers } = useGameWebSocket({
    room,
    sendRef,
    isRemoteEventRef,
    animateMoveRef,
    mapPositionsRef,
    setChatMessages,
    setDmHistory,
    setSceneName,
    setQuests,
    setUnits,
    setInCombat,
    setCombatRound,
    setTurnIndex,
    setTerrain,
    setMapPositions,
    setMapImageUrl,
    updateCharacter,
    getStateForResponse,
    journalSyncRef,
    lootSyncRef,
    setWeather,
    setMapPins,
    selectedCharacterId,
    onRollResult: showRollPopup,
    onRollVetoed: (rollId, vetoedBy) => {
      setActiveRollPopup((prev) => {
        if (!prev || prev.rollId !== rollId) return prev;
        return { ...prev, vetoed: true, vetoedBy: vetoedBy || 'DM' };
      });
    },
    onRollCleared: () => {
      hideRollPopup();
    },
    onServerTimeSync: (serverNowMs) => {
      setServerTimeOffsetMs(serverNowMs - Date.now());
    },
    onRollInterpolationMode: (mode, rttThreshold, jitterThreshold) => {
      setRollInterpolationMode(mode);
      if (typeof rttThreshold === 'number') setAutoStrictRttMs(rttThreshold);
      if (typeof jitterThreshold === 'number') setAutoStrictJitterMs(jitterThreshold);
    },
    onLatencyUpdate: setPlayerLatency,
    onPlayerStale: (id) => setStalePlayers((prev) => new Set([...prev, id])),
    onPlayerRecovered: (id) => setStalePlayers((prev) => { const n = new Set(prev); n.delete(id); return n; }),
    onVoiceSignal: (fromId, fromUsername, signalType, signal) => voiceRef.current?.handleVoiceSignal(fromId, fromUsername, signalType, signal),
    onVoiceState: (playerId, isTalking, isMuted) => voiceRef.current?.handleVoiceState(playerId, isTalking, isMuted),
    onReadyCheck: () => setReadyCheck({ active: true, responses: {}, startedAt: Date.now() }),
    onReadyResponse: (playerId, playerName) => setReadyCheck((prev) => prev ? { ...prev, responses: { ...prev.responses, [playerName]: true } } : null),
    onMapPing: (col, row) => setIncomingPings((prev) => [...prev.slice(-4), { col, row, time: Date.now() }]),
    onCombatEmote: (icon, sender) => {
      setEmoteIncoming({ id: crypto.randomUUID().slice(0, 6), icon, sender });
      clearTimeout(emoteTimerRef.current);
      emoteTimerRef.current = setTimeout(() => setEmoteIncoming(null), 2000);
    },
  });

  // DM tool access: DM gets full controls, non-DM gets read-only narration.
  // Offline/single-player (not connected) defaults to full access.
  // Spectators get no game controls at all.
  // Voice chat — ref-based to avoid circular dependency with WS hook
  const voiceSendRef = useRef<(msg: Record<string, unknown>) => void>(() => {});
  const voiceRef = useRef<ReturnType<typeof useVoiceChat> | null>(null);
  const voicePlayersRef = useRef<Array<{ id: string; username: string }>>([]);

  // Fetch AI backend status on mount
  useEffect(() => {
    fetch(`${apiBase()}/api/ai/status`).then((r) => r.json() as Promise<{ backend: string }>).then((d) => setAiBackend(d.backend)).catch(() => setAiBackend('offline'));
  }, []);

  // Auto-set ambient soundscape based on scene name keywords
  useEffect(() => {
    import('../lib/sceneMood').then(({ detectSceneMood }) => {
      const mood = detectSceneMood(sceneName);
      if (mood !== 'none') {
        import('../hooks/useSoundFX').then(({ setAmbientMood: setMood }) => setMood(mood));
      }
    });
  }, [sceneName]);

  // Auto-record combat encounters
  useEffect(() => {
    if (inCombat && !isRecording()) {
      startRecording(room);
      recordEvent('start', 'Combat begins!', undefined, undefined, undefined,
        units.map((u) => ({ id: u.id, name: u.name, hp: u.hp, maxHp: u.maxHp, type: u.type, isCurrentTurn: u.isCurrentTurn })));
    } else if (!inCombat && isRecording()) {
      recordEvent('end', 'Combat ends.');
      const rec = stopRecording();
      if (rec && rec.events.length > 2) setRecordings((prev) => [...prev, rec]);
      // Fire AI encounter recap (non-blocking)
      if (combatLog.length > 3) {
        fetch(`${apiBase()}/api/dm/encounter-recap`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ combatLog: combatLog.slice(-20), characters: buildPartyPayload() }),
        }).then((r) => r.ok ? r.json() as Promise<{ recap?: string }> : null)
          .then((data) => { if (data?.recap) addDmMessage(`⚔️ ${data.recap}`); })
          .catch(() => {});
      }
    }
  }, [inCombat]); // eslint-disable-line react-hooks/exhaustive-deps

  // Record turn changes during combat
  useEffect(() => {
    if (!inCombat || !isRecording()) return;
    const current = units.find((u) => u.isCurrentTurn);
    if (current) {
      recordEvent('turn', `${current.name}'s turn`, current.id, current.name,
        mapPositions.map((p) => ({ unitId: p.unitId, col: p.col, row: p.row })),
        units.map((u) => ({ id: u.id, name: u.name, hp: u.hp, maxHp: u.maxHp, type: u.type, isCurrentTurn: u.isCurrentTurn })));
    }
  }, [turnIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Broadcast state to DM Screen (separate browser tab) via BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel('adventure-dm-screen');
    const syncState = () => {
      channel.postMessage({
        type: 'dm-screen-sync',
        state: { units, inCombat, combatRound, turnIndex, sceneName, dmNotes: '', partyInventoryCount: partyInventory.length },
      });
    };
    syncState(); // initial sync
    // Listen for requests from DM Screen
    channel.onmessage = (e) => { if (e.data?.type === 'dm-screen-request') syncState(); };
    return () => channel.close();
  }, [units, inCombat, combatRound, turnIndex, sceneName, partyInventory.length]);

  const canUseDMTools = !isSpectating && (isDM || !wsConnected);

  // Global keyboard shortcuts (must be after canUseDMTools is defined)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs/textareas
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      // Escape closes modals/panels in priority order (topmost first)
      if (e.key === 'Escape') {
        if (showRulesRef) { setShowRulesRef(false); return; }
        if (showMonsterBrowser) { setShowMonsterBrowser(false); return; }
        if (showHelpOverlay) { setShowHelpOverlay(false); return; }
        if (showLevelUpModal) { setShowLevelUpModal(false); return; }
        if (showDMSidebar) { setShowDMSidebar(false); return; }
        if (showCombatLog) { setShowCombatLog(false); return; }
        if (showQuests) { setShowQuests(false); return; }
      }
      // ? — toggle keyboard shortcut help
      if (e.key === '?') { setShowHelpOverlay((s) => !s); return; }
      // M — toggle mute
      if (e.key === 'm' || e.key === 'M') { toggleMute(); setSoundMuted(!soundMuted); return; }
      // D — toggle DM sidebar (if DM)
      if ((e.key === 'd' || e.key === 'D') && canUseDMTools) { setShowDMSidebar((s) => !s); return; }
      // C — toggle character sheet
      if (e.key === 'c' || e.key === 'C') { setShowSheet((s) => !s); setShowNotes(false); return; }
      if (e.key === 'n' || e.key === 'N') { setShowNotes((s) => !s); setShowSheet(false); return; }
      // Q — toggle quests
      if (e.key === 'q' || e.key === 'Q') { setShowQuests((s) => !s); return; }
      // L — toggle combat log
      if (e.key === 'l' || e.key === 'L') { setShowCombatLog((s) => !s); return; }
      // J — toggle journal view
      if (e.key === 'j' || e.key === 'J') { setActiveView((v) => v === 'journal' ? 'narration' : 'journal'); return; }
      // R — toggle rules reference
      if (e.key === 'r' || e.key === 'R') { setShowRulesRef((s) => !s); return; }
      // B — toggle monster browser (DM only)
      if ((e.key === 'b' || e.key === 'B') && canUseDMTools) { setShowMonsterBrowser((s) => !s); return; }
      // 1/2/3/4 — switch views (narration/map/shop/journal)
      if (e.key === '1') { setActiveView('narration'); return; }
      if (e.key === '2') { setActiveView('map'); return; }
      if (e.key === '3' && !inCombat) { setActiveView('shop'); return; }
      if (e.key === '4') { setActiveView('journal'); return; }
      if (e.key === '5') { setActiveView('loot'); return; }
      if (e.key === '6') { setActiveView('encounters'); return; }
      if (e.key === '7') { setActiveView('npcs'); return; }
      if (e.key === '8') { setActiveView('dicestats'); return; }
      if (e.key === '9') { setActiveView('timeline'); return; }
      if (e.key === '0') { setActiveView('achievements'); return; }
      // Combat shortcuts (only when it's the player's turn)
      if (inCombat && isPlayerTurn && selectedCharacter) {
        // A — quick attack
        if (e.key === 'a' || e.key === 'A') {
          const attackBtn = document.querySelector('[data-combat-action="attack"]') as HTMLButtonElement | null;
          if (attackBtn && !attackBtn.disabled) attackBtn.click();
          return;
        }
        // E — end turn
        if (e.key === 'e' || e.key === 'E') {
          const endBtn = document.querySelector('[data-combat-action="end-turn"]') as HTMLButtonElement | null;
          if (endBtn && !endBtn.disabled) endBtn.click();
          return;
        }
        // P — use potion
        if (e.key === 'p' || e.key === 'P') {
          const potionBtn = document.querySelector('[data-combat-action="potion"]') as HTMLButtonElement | null;
          if (potionBtn && !potionBtn.disabled) potionBtn.click();
          return;
        }
        // G — dodge
        if (e.key === 'g' || e.key === 'G') {
          const dodgeBtn = document.querySelector('[data-combat-action="dodge"]') as HTMLButtonElement | null;
          if (dodgeBtn && !dodgeBtn.disabled) dodgeBtn.click();
          return;
        }
        // H — dash
        if (e.key === 'h' || e.key === 'H') {
          const dashBtn = document.querySelector('[data-combat-action="dash"]') as HTMLButtonElement | null;
          if (dashBtn && !dashBtn.disabled) dashBtn.click();
          return;
        }
        // F — class ability
        if (e.key === 'f' || e.key === 'F') {
          const abilityBtn = document.querySelector('[data-combat-action="class-ability"]') as HTMLButtonElement | null;
          if (abilityBtn && !abilityBtn.disabled) abilityBtn.click();
          return;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLevelUpModal, showDMSidebar, showCombatLog, showQuests, showHelpOverlay, showRulesRef, soundMuted, canUseDMTools, inCombat, isPlayerTurn, selectedCharacter]);

  // Delayed broadcast — reads from refs after React processes state batches.
  // Use this when you can't easily capture return values (e.g. player UI actions).
  const broadcastCombatSyncLatest = useCallback(() => {
    broadcastGameEvent('game_sync', {
      units: unitsRef.current,
      inCombat: inCombatRef.current,
      combatRound: combatRoundRef.current,
      turnIndex: turnIndexRef.current,
    });
  }, [broadcastGameEvent]);

  // Broadcast visible character stats whenever selected character changes
  // (HP, condition, death saves, gold, level, class, name) — syncs party health to other players
  const prevCharJsonRef = useRef('');
  useEffect(() => {
    if (!selectedCharacter || isRemoteEventRef.current) return;
    const visible = {
      id: selectedCharacter.id,
      hp: selectedCharacter.hp,
      maxHp: selectedCharacter.maxHp,
      ac: selectedCharacter.ac,
      level: selectedCharacter.level,
      condition: selectedCharacter.condition,
      deathSaves: selectedCharacter.deathSaves,
      gold: selectedCharacter.gold,
      name: selectedCharacter.name,
      class: selectedCharacter.class,
    };
    const json = JSON.stringify(visible);
    if (json !== prevCharJsonRef.current) {
      prevCharJsonRef.current = json;
      broadcastGameEvent('character_update', { character: visible });
    }
  }, [selectedCharacter, broadcastGameEvent]);

  // Initialize — no demo data, real data from character selection
  useEffect(() => {
    setCurrentPlayer({ id: currentPlayer.id, username: currentPlayer.username, controllerType: 'human' });
    setPlayers([
      { id: currentPlayer.id, username: currentPlayer.username, controllerType: 'human' },
      { id: 'ai-dm', username: 'Dungeon Master', controllerType: 'ai' },
    ]);
  }, [setCurrentPlayer, setPlayers, currentPlayer.id, currentPlayer.username]);

  // Show character picker if no character selected
  useEffect(() => {
    if (selectedCharacter) {
      setShowCharacterPicker(false);
    }
  }, [selectedCharacter]);

  // Keep the player unit in sync with character stats (HP, maxHp, AC change from rest/level-up/damage)
  useEffect(() => {
    if (!selectedCharacter) return;
    setUnits((prev: Unit[]) => prev.map((u) => (u.characterId === selectedCharacter.id ? { ...u, name: selectedCharacter.name, hp: selectedCharacter.hp, maxHp: selectedCharacter.maxHp, ac: selectedCharacter.ac } : u)));
  }, [selectedCharacter?.hp, selectedCharacter?.maxHp, selectedCharacter?.ac, selectedCharacter?.name, selectedCharacter?.id, setUnits]);

  // When a character is selected, create a unit for them
  const handleSelectCharacter = useCallback(
    (char: Character) => {
      setSelectedCharacterId(char.id);

      // Monk gets bonus speed at higher levels (5e: +10 at 2, +15 at 6, +20 at 10, etc.)
      const monkSpeedBonus = char.class === 'Monk' ? Math.floor(Math.max(0, char.level - 1) / 4) + (char.level >= 2 ? 2 : 0) : 0;
      const unit: Unit = {
        id: `unit-${char.id}`,
        name: char.name,
        hp: char.hp,
        maxHp: char.maxHp,
        ac: char.ac,
        initiative: -1,
        isCurrentTurn: false,
        type: 'player',
        playerId: currentPlayer.id,
        characterId: char.id,
        speed: 6 + monkSpeedBonus, // 6 cells = 30ft base
        movementUsed: 0,
        reactionUsed: false,
        disengaged: false,
        visionRange: DARKVISION_RACES.has(char.race) ? DARKVISION_RANGE : NORMAL_VISION_RANGE,
      };
      setUnits([unit]);
      setShowCharacterPicker(false);
    },
    [currentPlayer.id, setUnits]
  );

  // Wire auto-select ref for campaign load (avoids circular dep with handleSelectCharacter)
  autoSelectCharRef.current = (charId: string) => {
    const char = characters.find((c) => c.id === charId);
    if (char) handleSelectCharacter(char);
  };

  // Create units for AI-controlled player characters (from lobby AI seats)
  const aiUnitsCreatedRef = useRef(false);
  useEffect(() => {
    if (aiCharacterIds.size === 0 || aiUnitsCreatedRef.current) return;
    // Wait until the human player has selected their character (units array has at least one player unit)
    const hasHumanUnit = units.some((u) => u.type === 'player' && u.characterId && !aiCharacterIds.has(u.characterId));
    if (!hasHumanUnit) return;
    aiUnitsCreatedRef.current = true;

    const aiUnits: Unit[] = [];
    for (const charId of aiCharacterIds) {
      // Skip if unit already exists (from campaign load)
      if (units.some((u) => u.characterId === charId)) continue;
      const char = characters.find((c) => c.id === charId);
      if (!char) continue;
      const monkSpeedBonus = char.class === 'Monk' ? Math.floor(Math.max(0, char.level - 1) / 4) + (char.level >= 2 ? 2 : 0) : 0;
      aiUnits.push({
        id: `unit-${char.id}`,
        name: char.name,
        hp: char.hp,
        maxHp: char.maxHp,
        ac: char.ac,
        initiative: -1,
        isCurrentTurn: false,
        type: 'player',
        playerId: `ai-${char.id}`,
        characterId: char.id,
        speed: 6 + monkSpeedBonus,
        movementUsed: 0,
        reactionUsed: false,
        disengaged: false,
      });
    }
    if (aiUnits.length > 0) {
      setUnits((prev) => [...prev, ...aiUnits]);
    }
  }, [aiCharacterIds, units, characters, setUnits]);

  // Add a DM narration to chat
  const addDmMessage = useCallback((text: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'dm',
        username: 'Dungeon Master',
        text,
        timestamp: Date.now(),
      },
    ]);
    setDmHistory((prev) => [...prev, text]);
    // TTS: speak DM narration aloud if enabled
    import('../lib/tts').then(({ speak, isTTSEnabled }) => { if (isTTSEnabled()) speak(text); });
  }, []);

  // Wire plugin system to DM history
  useEffect(() => { setPluginMessageCallback(addDmMessage); }, [addDmMessage]);

  const triggerFumble = useCallback(() => {
    const result = rollFumble();
    setFumbleDisplay(result);
    addDmMessage(`Fumble! ${result.effect}`);
    setTimeout(() => setFumbleDisplay(null), 4000);
  }, [addDmMessage]);

  // Build rich character payload for DM context
  const buildPartyPayload = useCallback(() => {
    // Send all party characters, not just the selected one
    const partyChars = selectedCharacter ? [selectedCharacter] : [];
    // Also include other player characters from the characters list
    for (const ch of characters) {
      if (!partyChars.find((p) => p.id === ch.id)) partyChars.push(ch);
    }
    return partyChars.map((ch) => ({
      name: ch.name,
      race: ch.race,
      class: ch.class,
      level: ch.level,
      hp: ch.hp,
      maxHp: ch.maxHp,
      ac: ch.ac,
      stats: ch.stats,
      alignment: ch.alignment,
      background: ch.background,
      condition: ch.condition,
      personalityTraits: ch.personalityTraits,
      ideals: ch.ideals,
      bonds: ch.bonds,
      flaws: ch.flaws,
      backstory: ch.backstory,
      appearanceDescription: ch.appearanceDescription,
    }));
  }, [selectedCharacter, characters]);

  // Call the DM narration endpoint
  const callDmNarrate = useCallback(
    async (action?: string) => {
      if (!selectedCharacter) return;
      setDmLoading(true);
      try {
        const payload = {
          characters: buildPartyPayload(),
          context: adventureStarted
            ? 'The adventure is underway.'
            : backstoryHooks.length > 0
              ? `This is the opening scene. Weave these party connections into the narrative naturally:\n${backstoryHooks.map((h, i) => `${i + 1}. ${h}`).join('\n')}`
              : '',
          action: action || '',
          history: dmHistory.slice(-10),
          scene: sceneName,
          personality: dmPersonality,
        };

        // Try streaming endpoint first for typewriter effect
        let narration = '';
        try {
          const streamRes = await fetch(`${apiBase()}/api/dm/narrate-stream`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
          });
          if (streamRes.ok && streamRes.body) {
            const reader = streamRes.body.getReader();
            const decoder = new TextDecoder();
            // Add a placeholder message that we'll update as tokens arrive
            const placeholderId = crypto.randomUUID();
            addDmMessage('▍');
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              // Parse SSE data lines: "data: {"response":"token"}"
              for (const line of chunk.split('\n')) {
                if (line.startsWith('data: ') && !line.includes('[DONE]')) {
                  try {
                    const d = JSON.parse(line.slice(6)) as { response?: string };
                    if (d.response) narration += d.response;
                  } catch { /* partial JSON, skip */ }
                }
              }
              // Update the last DM message in-place for typewriter effect
              if (narration) {
                setDmHistory((prev) => {
                  const copy = [...prev];
                  copy[copy.length - 1] = narration + '▍';
                  return copy;
                });
              }
            }
            // Remove cursor from final message
            if (narration) {
              setDmHistory((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = narration;
                return copy;
              });
            }
          }
        } catch {
          // Streaming failed — fall back to regular endpoint
        }

        // Fallback: non-streaming if stream produced nothing
        if (!narration) {
          const res = await fetchWithTimeout(`${apiBase()}/api/dm/narrate`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
          }, 35_000);
          const data = (await res.json()) as { narration?: string; error?: string };
          narration = data.narration || '';
          if (narration) addDmMessage(narration);
          else addDmMessage(data.error || 'The DM pauses, lost in thought...');
        }

        if (narration) {
          sendRef.current({ type: 'dm_narrate', narration });
          persistChatMessage(room, { username: 'Dungeon Master', type: 'dm', text: narration });
        }
      } catch {
        addDmMessage('*The DM\u2019s connection to the ethereal plane wavers...*');
      } finally {
        setDmLoading(false);
      }
    },
    [selectedCharacter, adventureStarted, dmHistory, addDmMessage, buildPartyPayload, sceneName, backstoryHooks, dmPersonality]
  );

  // Call the NPC dialogue endpoint
  const callNpcDialogue = useCallback(
    async (playerMessage: string) => {
      if (!selectedCharacter || !npcName) return;
      setNpcLoading(true);
      try {
        const res = await fetchWithTimeout(
          `${apiBase()}/api/dm/npc`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              npcName,
              npcRole,
              playerMessage,
              playerName: selectedCharacter.name,
              playerClass: selectedCharacter.class,
              scene: sceneName,
              roomId: room,
              dialogueHistory: npcDialogueHistory.slice(-8),
            }),
          },
          35_000
        );
        const data = (await res.json()) as { dialogue?: string; npcName?: string; error?: string };
        if (data.dialogue) {
          const npcText = data.dialogue;
          // Add NPC message to chat
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'dm' as const,
              username: npcName,
              text: npcText,
              timestamp: Date.now(),
            },
          ]);
          setDmHistory((prev) => [...prev, `${npcName}: "${npcText}"`]);
          setNpcDialogueHistory((prev) => [...prev, `${selectedCharacter.name}: ${playerMessage}`, `${npcName}: ${npcText}`]);
          // Broadcast NPC dialogue to all players
          sendRef.current({ type: 'dm_npc', npcName, dialogue: npcText });
          // TTS: speak NPC dialogue with NPC-specific voice
          import('../lib/tts').then(({ speakAsNPC, isTTSEnabled }) => { if (isTTSEnabled()) speakAsNPC(npcName, npcText); });
          // Persist NPC dialogue to D1
          persistChatMessage(room, { username: npcName, type: 'dm', text: npcText, metadata: { npcName, npcRole } });
        } else {
          addDmMessage(data.error || `${npcName} stares at you blankly.`);
        }
      } catch {
        addDmMessage(`*${npcName} mutters something unintelligible...*`);
      } finally {
        setNpcLoading(false);
      }
    },
    [selectedCharacter, npcName, npcRole, sceneName, npcDialogueHistory, addDmMessage]
  );

  // Detect when selected character drops to 0 HP — set unconscious, announce
  useEffect(() => {
    if (!selectedCharacter || !inCombat) return;
    if (selectedCharacter.hp <= 0 && selectedCharacter.condition === 'normal') {
      updateCharacter(selectedCharacter.id, { condition: 'unconscious' });
      addDmMessage(`${selectedCharacter.name} falls unconscious! Death saving throws begin...`);
    }
  }, [selectedCharacter?.hp, selectedCharacter?.condition, selectedCharacter?.id, selectedCharacter?.name, inCombat, updateCharacter, addDmMessage]);

  // Death saving throw — when it's the player's turn and they're unconscious
  const handleDeathSave = useCallback(() => {
    if (!selectedCharacter || selectedCharacter.condition !== 'unconscious') return;
    const roll = Math.floor(Math.random() * 20) + 1;
    const ds = { ...selectedCharacter.deathSaves };

    if (roll === 20) {
      // Natural 20: regain 1 HP, stabilize
      updateCharacter(selectedCharacter.id, {
        hp: 1,
        condition: 'normal',
        deathSaves: { successes: 0, failures: 0 },
      });
      addDmMessage(`Death save: natural 20! ${selectedCharacter.name} miraculously regains consciousness with 1 HP!`);
    } else if (roll === 1) {
      // Natural 1: two failures
      ds.failures = Math.min(3, ds.failures + 2);
      if (ds.failures >= 3) {
        updateCharacter(selectedCharacter.id, { condition: 'dead', deathSaves: ds });
        addDmMessage(`Death save: natural 1 — two failures! ${selectedCharacter.name} has died.`);
      } else {
        updateCharacter(selectedCharacter.id, { deathSaves: ds });
        addDmMessage(`Death save: natural 1 — two failures! (${ds.successes} successes, ${ds.failures} failures)`);
      }
    } else if (roll >= 10) {
      // Success
      ds.successes = Math.min(3, ds.successes + 1);
      if (ds.successes >= 3) {
        updateCharacter(selectedCharacter.id, { condition: 'stabilized', deathSaves: { successes: 0, failures: 0 } });
        addDmMessage(`Death save success (rolled ${roll})! ${selectedCharacter.name} stabilizes! (3 successes)`);
      } else {
        updateCharacter(selectedCharacter.id, { deathSaves: ds });
        addDmMessage(`Death save success (rolled ${roll}). (${ds.successes} successes, ${ds.failures} failures)`);
      }
    } else {
      // Failure
      ds.failures = Math.min(3, ds.failures + 1);
      if (ds.failures >= 3) {
        updateCharacter(selectedCharacter.id, { condition: 'dead', deathSaves: ds });
        addDmMessage(`Death save failed (rolled ${roll}). ${selectedCharacter.name} has died. (3 failures)`);
      } else {
        updateCharacter(selectedCharacter.id, { deathSaves: ds });
        addDmMessage(`Death save failed (rolled ${roll}). (${ds.successes} successes, ${ds.failures} failures)`);
      }
    }
  }, [selectedCharacter, updateCharacter, addDmMessage]);

  // Auto-execute enemy turns — extracted to useEnemyAI hook
  useEnemyAI({ addDmMessage, setCombatLog, broadcastCombatSync, broadcastGameEvent, animateMoveRef, drainConcentrationMessages });

  // Auto-execute AI player turns — AI-controlled party members act autonomously
  useAIPlayerTurn({ aiCharacterIds, addDmMessage, setCombatLog, broadcastCombatSync, broadcastGameEvent, animateMoveRef, drainConcentrationMessages });

  // Attack indicators — animated lines on battle map during attacks
  const { indicators: attackIndicators, addIndicator: addAttackIndicator } = useAttackIndicators();

  // Dynamic difficulty — auto-adjust encounter strength mid-combat
  const [dynamicDifficultyEnabled, setDynamicDifficultyEnabled] = useState(() => {
    try { return localStorage.getItem(`adventure:dynDiff:${room}`) === '1'; } catch { return false; }
  });
  useDynamicDifficulty({ enabled: dynamicDifficultyEnabled, addDmMessage, broadcastCombatSync });

  // --- AI Session Recap: "Last time on your adventure..." ---
  const [sessionRecap, setSessionRecap] = useState<string | null>(null);
  const [recapLoading, setRecapLoading] = useState(false);
  const recapFiredRef = useRef(false);

  // Fire once when a returning player loads a game with existing history
  useEffect(() => {
    if (recapFiredRef.current || !adventureStarted || !selectedCharacter || dmHistory.length < 3) return;
    recapFiredRef.current = true;

    // Check if we already showed a recap this session
    const recapKey = `adventure:recap-shown:${room}`;
    try { if (sessionStorage.getItem(recapKey)) return; } catch { /* ok */ }

    setRecapLoading(true);
    const lastEvents = dmHistory.slice(-8);
    fetchWithTimeout(`${apiBase()}/api/dm/narrate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        characters: buildPartyPayload(),
        context: 'The party is returning to a session already in progress.',
        action: `Summarize what has happened so far in 2-3 dramatic sentences, starting with "Previously..." — like a TV show recap. Base it on these recent events:\n${lastEvents.join('\n')}`,
        history: lastEvents,
        scene: sceneName,
      }),
    }, 20_000)
      .then((r) => r.json() as Promise<{ narration?: string }>)
      .then((data) => {
        if (data.narration) {
          setSessionRecap(data.narration);
          try { sessionStorage.setItem(recapKey, '1'); } catch { /* ok */ }
        }
      })
      .catch(() => { /* no recap — not critical */ })
      .finally(() => setRecapLoading(false));
  }, [adventureStarted, selectedCharacter, dmHistory.length, room]); // eslint-disable-line react-hooks/exhaustive-deps

  // Begin Adventure — first DM narration
  // Begin adventure — callDmNarrate adds to dmHistory, which makes adventureStarted true
  const handleBeginAdventure = useCallback(async () => {
    await callDmNarrate('Set the scene for the beginning of a new adventure. The party gathers at a tavern.');
  }, [callDmNarrate]);

  // Player action — send to DM or NPC
  const handlePlayerAction = useCallback(async () => {
    const text = actionInput.trim();
    if (!text) return;
    setActionInput('');

    // Show the player's action in chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'chat',
        playerId: currentPlayer.id,
        username: selectedCharacter?.name || currentPlayer.username,
        avatar: currentPlayer.avatar,
        text: npcMode ? `"${text}"` : `*${text}*`,
        timestamp: Date.now(),
      },
    ]);

    // Broadcast the action to all players
    sendRef.current({ type: 'dm_action', characterName: selectedCharacter?.name || currentPlayer.username, action: text });
    // Persist player action to D1
    persistChatMessage(room, {
      username: selectedCharacter?.name || currentPlayer.username,
      type: 'chat',
      text: npcMode ? `"${text}"` : `*${text}*`,
      avatarUrl: currentPlayer.avatar,
    });

    if (npcMode) {
      await callNpcDialogue(text);
    } else {
      await callDmNarrate(text);
    }
  }, [actionInput, currentPlayer.id, currentPlayer.username, currentPlayer.avatar, selectedCharacter, callDmNarrate, callNpcDialogue, npcMode, room]);

  // Generate AI backstory hooks for the party
  const handleGenerateBackstoryHooks = useCallback(async () => {
    if (characters.length < 2) return;
    setHooksLoading(true);
    try {
      const charData = characters.map((c) => ({
        name: c.name, race: c.race, class: c.class, level: c.level,
        background: c.background, personalityTraits: c.personalityTraits,
        bonds: c.bonds, backstory: c.backstory,
      }));
      const resp = await fetch('/api/dm/backstory-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characters: charData }),
      });
      if (resp.ok) {
        const data = await resp.json() as { hooks?: string[] };
        if (data.hooks && data.hooks.length > 0) setBackstoryHooks(data.hooks);
      }
    } catch { /* ok */ }
    setHooksLoading(false);
  }, [characters]);

  // Generate encounter — spawn enemy units with stat blocks from templates
  const handleGenerateEncounter = useCallback(async () => {
    if (!selectedCharacter) return;
    setEncounterLoading(true);
    try {
      // Generate enemies from templates as baseline (stat blocks, abilities, CR-based rewards)
      let enemyUnits = generateEnemies(encounterDifficulty, selectedCharacter.level);
      const theme = randomEncounterTheme();

      // Try to get AI encounter — may return both enemies and narration
      let description = '';
      try {
        const res = await fetchWithTimeout(
          `${apiBase()}/api/dm/encounter`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              partyLevel: selectedCharacter.level,
              partySize: Math.max(1, characters.length),
              difficulty: encounterDifficulty,
              context: dmHistory.length > 0 ? dmHistory[dmHistory.length - 1] : 'a dark dungeon corridor',
              partyClasses: characters.map((c) => c.class),
              setting: theme.setting,
              twist: theme.twist,
            }),
          },
          45_000
        );
        const data = (await res.json()) as { enemies?: { name: string; hp: number; maxHp: number; ac: number; type?: string }[]; description?: string; error?: string };
        if (data.description) description = data.description;
        // Use AI-generated enemies if they have valid stat blocks, merged with template abilities
        if (data.enemies?.length && data.enemies.every((e) => e.name && e.hp > 0 && e.ac > 0)) {
          const levelScale = 1 + (selectedCharacter.level - 1) * 0.15;
          enemyUnits = data.enemies.map((aiEnemy, i) => {
            // Find a matching template for abilities/CR — match by name or difficulty tier
            const templates = Object.values(
              // flatten all template tiers into a single array
              { easy: [], medium: [], hard: [], deadly: [], ...{ [encounterDifficulty]: generateEnemies(encounterDifficulty, selectedCharacter.level) } }
            ).flat();
            // Use AI stats but enrich with template abilities for gameplay depth
            const templateMatch = enemyUnits[i] || enemyUnits[0];
            const scaledHp = Math.round(aiEnemy.hp * levelScale);
            return {
              id: `enemy-${crypto.randomUUID().slice(0, 8)}-${i}`,
              name: aiEnemy.name,
              hp: scaledHp,
              maxHp: scaledHp,
              ac: aiEnemy.ac,
              initiative: -1,
              isCurrentTurn: false,
              type: 'enemy' as const,
              playerId: 'ai-dm',
              attackBonus: templateMatch?.attackBonus ?? 3,
              damageDie: templateMatch?.damageDie ?? '1d6',
              damageBonus: templateMatch?.damageBonus ?? 1,
              dexMod: templateMatch?.dexMod ?? 1,
              abilities: templateMatch?.abilities ? templateMatch.abilities.map((a: EnemyAbility) => ({ ...a })) : [],
              abilityCooldowns: {},
              conditions: [],
              speed: 6,
              movementUsed: 0,
              reactionUsed: false,
              disengaged: false,
              cr: templateMatch?.cr ?? 1,
              xpValue: templateMatch?.xpValue ?? 200,
            } satisfies Unit;
          });
        }
      } catch {
        /* AI narration/encounter is optional — template enemies already generated */
      }

      // Announce the encounter with theme fallback
      const enemyNames = enemyUnits.map((e) => e.name).join(', ');
      const fallback = `In ${theme.setting}, ${enemyNames} ${enemyUnits.length > 1 ? 'appear' : 'appears'}! ${theme.twist}.`;
      addDmMessage(description || fallback);
      playEncounterStart();
      // Auto-switch to combat ambiance
      if (currentAmbient !== 'combat') {
        preCombatAmbientRef.current = currentAmbient;
        const mood = encounterDifficulty === 'easy' ? 'mystery' as const : 'combat' as const;
        setAmbientMood(mood);
        setCurrentAmbient(mood);
      }

      // Add enemy units to existing units (keep player units)
      setUnits((prev: Unit[]) => [...prev.filter((u) => u.type === 'player'), ...enemyUnits]);

      // Fire-and-forget: generate AI portraits for each enemy (parallel, non-blocking)
      for (const enemy of enemyUnits) {
        fetch(`${apiBase()}/api/portrait/enemy`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: enemy.name, description: `${enemy.name}, AC ${enemy.ac}, HP ${enemy.hp}` }),
        }).then((r) => r.ok ? r.json() as Promise<{ portrait?: string }> : null)
          .then((data) => {
            if (data?.portrait) {
              setUnits((prev) => prev.map((u) => u.id === enemy.id ? { ...u, tokenImage: data.portrait } : u));
            }
          }).catch(() => {}); // portrait generation is best-effort
      }
      // Broadcast encounter to all players — include units, terrain, and positions
      setTimeout(() => {
        broadcastGameEvent('encounter_spawn', {
          units: unitsRef.current,
          terrain: terrain,
          positions: mapPositions,
          inCombat: inCombatRef.current,
          combatRound: combatRoundRef.current,
        });
      }, 100);
    } catch {
      addDmMessage('*The encounter fades before it can materialize...*');
    } finally {
      setEncounterLoading(false);
    }
  }, [selectedCharacter, dmHistory, addDmMessage, setUnits, encounterDifficulty, broadcastGameEvent, terrain, mapPositions]);

  // Spawn monsters from the Monster Manual browser
  const handleSpawnMonster = useCallback((monster: Monster, count: number) => {
    const partyLevel = selectedCharacter?.level || 1;
    const levelScale = 1 + (partyLevel - 1) * 0.15;
    const newUnits: Unit[] = Array.from({ length: count }, (_, i) => {
      const baseHp = monster.hp[0] + Math.floor(Math.random() * (monster.hp[1] - monster.hp[0] + 1));
      const scaledHp = Math.round(baseHp * levelScale);
      return {
        id: `enemy-${crypto.randomUUID().slice(0, 8)}-${i}`,
        name: count > 1 ? `${monster.name} ${String.fromCharCode(65 + i)}` : monster.name,
        hp: scaledHp, maxHp: scaledHp, ac: monster.ac, initiative: -1, isCurrentTurn: false,
        type: 'enemy' as const, playerId: 'ai-dm',
        attackBonus: monster.attackBonus, damageDie: monster.damageDie, damageBonus: monster.damageBonus,
        dexMod: monster.dexMod, abilities: monster.abilities.map((a) => ({ ...a })),
        abilityCooldowns: {}, conditions: [], speed: monster.speed, movementUsed: 0,
        reactionUsed: false, disengaged: false, cr: monster.cr, xpValue: monster.xpValue,
        // Legendary + lair actions — only the first spawned unit of a boss type gets these (not copies)
        ...(i === 0 && monster.legendaryActions ? {
          legendaryActions: monster.legendaryActions,
          legendaryActionsUsed: 0,
          legendaryAbilities: monster.legendaryAbilities?.map((a) => ({ ...a })),
        } : {}),
        ...(i === 0 && monster.lairActions ? {
          lairActions: monster.lairActions.map((a) => ({ ...a })),
        } : {}),
      } satisfies Unit;
    });
    const names = newUnits.map((u) => u.name).join(', ');
    addDmMessage(`*${names} ${count > 1 ? 'appear' : 'appears'} on the battlefield!*`);
    playEncounterStart();
    setUnits((prev: Unit[]) => [...prev, ...newUnits]);
    setTimeout(() => {
      broadcastGameEvent('encounter_spawn', {
        units: unitsRef.current,
        terrain: terrain,
        positions: mapPositions,
        inCombat: inCombatRef.current,
        combatRound: combatRoundRef.current,
      });
    }, 100);
    setShowMonsterBrowser(false);
  }, [selectedCharacter, addDmMessage, setUnits, broadcastGameEvent, terrain, mapPositions]);

  const { status, send, reconnectAttemptCount } = useWebSocket({
    roomId: room,
    username: selectedCharacter?.name || currentPlayer.username,
    onMessage: handleWsMessage,
    onTimeSync: (offsetMs, rttMs) => {
      setServerTimeOffsetMs((prev) => Math.round(prev * 0.8 + offsetMs * 0.2));
      setClockRttMs(Math.round(rttMs));
      const hist = rttHistoryRef.current;
      hist.push(rttMs);
      if (hist.length > 8) hist.shift();
    },
  });
  sendRef.current = send;

  // Voice chat — initialized after WS send is available
  voiceSendRef.current = send as unknown as (msg: Record<string, unknown>) => void;
  const voice = useVoiceChat({
    enabled: status === 'connected',
    myPlayerId: wsPlayerId || '',
    send: (msg) => voiceSendRef.current(msg),
    players: [], // peers discovered via signaling, not needed upfront
  });
  voiceRef.current = voice;
  // Track connection status for canUseDMTools (must be after hook call)
  useEffect(() => {
    setWsConnected(status === 'connected');
  }, [status]);

  // Compute effective interpolation mode for auto policy
  const effectiveMode: 'smooth' | 'strict' = (() => {
    if (rollInterpolationMode !== 'auto') return rollInterpolationMode === 'strict' ? 'strict' : 'smooth';
    const hist = rttHistoryRef.current;
    if (hist.length < 3) return 'smooth';
    const avgRtt = hist.reduce((a, b) => a + b, 0) / hist.length;
    const jitter = Math.sqrt(hist.reduce((s, v) => s + (v - avgRtt) ** 2, 0) / hist.length);
    return (avgRtt > autoStrictRttMs || jitter > autoStrictJitterMs) ? 'strict' : 'smooth';
  })();

  const handleChatSend = useCallback(
    (text: string) => {
      send({ type: 'chat', message: text });
      // Persist to D1 (fire-and-forget)
      persistChatMessage(room, {
        username: selectedCharacter?.name || currentPlayer.username,
        type: 'chat',
        text,
        avatarUrl: currentPlayer.avatar,
      });
    },
    [send, room, selectedCharacter?.name, currentPlayer.username, currentPlayer.avatar]
  );

  const handleLocalRoll = useCallback(
    (die: DieType, sides: number, count: number, advMode: 'normal' | 'advantage' | 'disadvantage') => {
      if (secretRollMode && canUseDMTools) {
        // Secret roll — DM only, no broadcast. Roll locally.
        const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
        const value = advMode === 'advantage' ? Math.max(...rolls) : advMode === 'disadvantage' ? Math.min(...rolls) : rolls.reduce((a, b) => a + b, 0);
        playDiceRoll();
        setSecretRolls((prev) => [...prev.slice(-9), { id: crypto.randomUUID().slice(0, 6), die: `${count}d${sides}`, value, revealed: false }]);
        addDmMessage(`[Secret Roll] ${count}d${sides}: ${value}${advMode !== 'normal' ? ` (${advMode})` : ''}`);
        return;
      }
      send({
        type: 'roll',
        die,
        sides,
        count,
        advMode,
        unitId: selectedUnitId || undefined,
        unitName: selectedUnit?.name || undefined,
      });
    },
    [send, selectedUnitId, selectedUnit, secretRollMode, canUseDMTools, addDmMessage]
  );

  // Fun default names when character/player info is missing
  const MYSTERY_NAMES = ['A Mysterious Stranger', 'Someone in the Shadows', 'An Unknown Adventurer', 'A Passing Wanderer', 'The Dice Gremlin'];
  const funDefault = () => MYSTERY_NAMES[Math.floor(Math.random() * MYSTERY_NAMES.length)];

  // Handle local (offline) roll — add to chat history even without WebSocket
  const handleRollComplete = useCallback(
    (roll: LocalRollResult) => {
      const charName = selectedCharacter?.name || '';
      const playerName = currentPlayer.username || '';
      const displayUsername = playerName || funDefault();
      playDiceRoll();
      milestoneRoll();
      triggerDiceTower(roll.sides, roll.total, roll.isCritical, roll.isFumble);
      emitPluginEvent('roll', { sides: roll.sides, value: roll.total, isCritical: roll.isCritical, isFumble: roll.isFumble, rollerName: currentPlayer.username || '' });
      if (roll.isCritical) { setTimeout(playCritical, 400); triggerCrit(); milestoneCrit(); }
      if (roll.isFumble) { setTimeout(playFumble, 400); triggerFumble(); }
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'roll',
          playerId: currentPlayer.id,
          username: displayUsername,
          characterName: charName || undefined,
          portrait: selectedCharacter?.portrait || undefined,
          text: '',
          timestamp: Date.now(),
          die: roll.die,
          sides: roll.sides,
          value: roll.total,
          rollCount: roll.count,
          allRolls: roll.allRolls,
          keptRolls: roll.keptRolls,
          isCritical: roll.isCritical,
          isFumble: roll.isFumble,
          unitName: roll.unitName,
          advMode: roll.advMode,
        },
      ]);
      showRollPopup({
        rollId: crypto.randomUUID(),
        playerId: currentPlayer.id,
        username: displayUsername,
        avatar: currentPlayer.avatar,
        unitName: roll.unitName,
        die: roll.die,
        sides: roll.sides,
        count: roll.count,
        allRolls: roll.allRolls,
        keptRolls: roll.keptRolls,
        total: roll.total,
        advMode: roll.advMode === 'advantage' || roll.advMode === 'disadvantage' ? roll.advMode : undefined,
        isCritical: roll.isCritical,
        isFumble: roll.isFumble,
        timestamp: Date.now(),
      });
      // Persist local roll to D1
      persistChatMessage(room, {
        username: displayUsername,
        type: 'roll',
        text: `rolled ${roll.count > 1 ? roll.count : ''}${roll.die?.toUpperCase()} for ${roll.total}${roll.advMode ? ` [${roll.advMode}]` : ''}`,
        metadata: { die: roll.die, sides: roll.sides, value: roll.total, isCritical: roll.isCritical, isFumble: roll.isFumble, unitName: roll.unitName, characterName: charName || undefined },
      });
    },
    [selectedCharacter, currentPlayer, room, showRollPopup]
  );

  // Handle /roll slash command from chat — creates a roll message without using the dice roller UI
  const handleSlashRoll = useCallback(
    (result: SlashRollResult) => {
      const charName = selectedCharacter?.name || '';
      const playerName = currentPlayer.username || funDefault();
      const sidesMatch = result.notation.match(/^(?:\d*)d(\d+)/i);
      const sides = Number(sidesMatch?.[1] || 20);
      const keptForOutcome = result.kept && result.kept.length > 0 ? result.kept : result.rolls;
      const isCoin = sides === 2;
      const isCrit = isCoin
        ? keptForOutcome.length === 1 && keptForOutcome[0] === 2
        : keptForOutcome.length > 0 && keptForOutcome.every((v) => v === sides);
      const isFumble = isCoin
        ? keptForOutcome.length === 1 && keptForOutcome[0] === 1
        : keptForOutcome.length > 0 && keptForOutcome.every((v) => v === 1);
      playDiceRoll();
      if (isCrit) { setTimeout(playCritical, 400); triggerCrit(); }
      if (isFumble) { setTimeout(playFumble, 400); triggerFumble(); }
      const rollText = result.kept
        ? `[${result.rolls.join(', ')}] keep ${result.kept.join(', ')}`
        : `[${result.rolls.join(', ')}]`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'roll',
          playerId: currentPlayer.id,
          username: playerName,
          characterName: charName || undefined,
          portrait: selectedCharacter?.portrait || undefined,
          text: `${result.notation}: ${rollText}${result.modifier ? ` ${result.modifier > 0 ? '+' : ''}${result.modifier}` : ''} = ${result.total}${result.label ? ` (${result.label})` : ''}`,
          timestamp: Date.now(),
          die: result.notation,
          value: result.total,
          isCritical: isCrit,
          isFumble,
        },
      ]);
      showRollPopup({
        rollId: crypto.randomUUID(),
        playerId: currentPlayer.id,
        username: playerName,
        avatar: currentPlayer.avatar,
        unitName: charName || undefined,
        die: result.notation,
        sides,
        count: result.rolls.length,
        allRolls: result.rolls,
        keptRolls: result.kept || result.rolls,
        total: result.total,
        advMode: result.advantage ? 'advantage' : result.disadvantage ? 'disadvantage' : undefined,
        isCritical: isCrit,
        isFumble,
        timestamp: Date.now(),
      });
      persistChatMessage(room, {
        username: playerName,
        type: 'roll',
        text: `rolled ${result.notation} for ${result.total}`,
        metadata: { die: result.notation, value: result.total, isCritical: isCrit, isFumble, characterName: charName || undefined },
      });
    },
    [selectedCharacter, currentPlayer, room, showRollPopup]
  );

  // Handle dice macro execution — macro label + notation result posted to chat with SFX
  const handleMacroRoll = useCallback(
    (label: string, notation: string, rolls: number[], total: number, isCrit: boolean, isFumble: boolean) => {
      const charName = selectedCharacter?.name || '';
      const playerName = currentPlayer.username || funDefault();
      playDiceRoll();
      if (isCrit) { setTimeout(playCritical, 400); triggerCrit(); }
      if (isFumble) { setTimeout(playFumble, 400); triggerFumble(); }
      const rollText = `[${rolls.join(', ')}]`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'roll',
          playerId: currentPlayer.id,
          username: playerName,
          characterName: charName || undefined,
          portrait: selectedCharacter?.portrait || undefined,
          text: `${label} (${notation}): ${rollText} = ${total}`,
          timestamp: Date.now(),
          die: notation,
          value: total,
          isCritical: isCrit,
          isFumble,
        },
      ]);
      showRollPopup({
        rollId: crypto.randomUUID(),
        playerId: currentPlayer.id,
        username: playerName,
        avatar: currentPlayer.avatar,
        unitName: charName || undefined,
        die: notation,
        sides: 20,
        count: rolls.length,
        allRolls: rolls,
        keptRolls: rolls,
        total,
        isCritical: isCrit,
        isFumble,
        timestamp: Date.now(),
      });
      persistChatMessage(room, {
        username: playerName,
        type: 'roll',
        text: `used ${label} (${notation}) for ${total}`,
        metadata: { die: notation, value: total, isCritical: isCrit, isFumble, characterName: charName || undefined },
      });
    },
    [selectedCharacter, currentPlayer, room, showRollPopup]
  );

  // AoE confirm handler — extracted from BattleMap onAoEConfirm inline callback
  const handleAoEConfirm = useCallback((affectedCells: { col: number; row: number }[]) => {
    if (!pendingAoESpell) { setActiveAoE(null); return; }
    const { spell, charId } = pendingAoESpell;
    const slotResult = castSpell(charId, spell.id);
    if (!slotResult.success) {
      setShopMessage(slotResult.message);
      setTimeout(() => setShopMessage(null), 2500);
      setActiveAoE(null);
      setPendingAoESpell(null);
      return;
    }
    playMagicSpell();
    const char = characters.find((c) => c.id === charId);
    const casterName = char?.name || 'Caster';
    const affectedSet = new Set(affectedCells.map((c) => `${c.col},${c.row}`));
    const hitUnits = units.filter((u) => {
      const pos = mapPositions.find((p) => p.unitId === u.id);
      return pos && affectedSet.has(`${pos.col},${pos.row}`);
    });
    const targets = spell.damage ? hitUnits.filter((u) => !u.characterId) : hitUnits;
    const messages: string[] = [];
    if (targets.length === 0) {
      messages.push(`${casterName} casts ${spell.name} but hits no targets!`);
    } else {
      let spellDC = 13;
      if (char) {
        const castingStatMap: Record<string, StatName> = { Wizard: 'INT', Sorcerer: 'CHA', Cleric: 'WIS', Druid: 'WIS', Bard: 'CHA', Warlock: 'CHA', Paladin: 'CHA', Ranger: 'WIS' };
        const castingStat = castingStatMap[char.class] || 'INT';
        const castMod = Math.floor((char.stats[castingStat] - 10) / 2);
        const profBonus = Math.ceil(char.level / 4) + 1;
        spellDC = 8 + profBonus + castMod;
      }
      for (const target of targets) {
        const saveRoll = Math.floor(Math.random() * 20) + 1;
        const targetSaveMod = spell.saveStat === 'DEX' ? target.dexMod || 0 : 0;
        const condSaveMod = (target.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.saveMod || 0), 0);
        const saved = (saveRoll + targetSaveMod + condSaveMod) >= spellDC;
        if (spell.damage) {
          let dmg = rollSpellDamage(spell.damage);
          if (saved) dmg = Math.floor(dmg / 2);
          damageUnit(target.id, dmg);
          messages.push(saved ? `${target.name} saves — ${dmg} damage (half).` : `${target.name} takes ${dmg} damage!`);
          if (target.hp - dmg <= 0) {
            playEnemyDeath();
            messages.push(`${target.name} falls!`);
          }
        }
        if (spell.appliesCondition && !saved) {
          applyCondition(target.id, { type: spell.appliesCondition, duration: spell.conditionDuration || 2, source: casterName });
          messages.push(`${target.name} is ${spell.appliesCondition}!`);
        }
      }
    }
    const fullMsg = `${casterName} casts ${spell.name}! ${messages.join(' ')}${spell.level > 0 ? ` (Level ${spell.level} slot used)` : ''}`;
    setCombatLog((prev) => [...prev, fullMsg]);
    addDmMessage(fullMsg);
    setActiveAoE(null);
    setPendingAoESpell(null);
    setTimeout(broadcastCombatSyncLatest, 50);
  }, [pendingAoESpell, castSpell, characters, units, mapPositions, damageUnit, applyCondition, addDmMessage, broadcastCombatSyncLatest]);

  const statusColor = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500';

  // Character picker — extracted component
  if (showCharacterPicker) {
    return <CharacterPicker characters={characters} room={room} onSelect={handleSelectCharacter} />;
  }

  // Ambient mood → subtle visual tint overlay
  const MOOD_TINTS: Record<AmbientMood, string> = {
    none: '',
    tavern: 'from-amber-900/5 via-transparent to-orange-900/5',
    dungeon: 'from-slate-900/10 via-transparent to-indigo-950/8',
    forest: 'from-emerald-950/6 via-transparent to-green-900/5',
    combat: 'from-red-950/8 via-transparent to-red-900/6',
    mystery: 'from-purple-950/8 via-transparent to-indigo-900/6',
  };
  const moodTint = MOOD_TINTS[currentAmbient];

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative page-enter">
      {/* Ambient mood tint overlay */}
      {moodTint && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${moodTint} pointer-events-none z-0 transition-opacity duration-1000`}
          aria-hidden="true"
        />
      )}
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-3 md:px-6 py-2 md:py-3 flex justify-between items-center shrink-0 relative z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" onClick={() => navigate(`/lobby/${room}`)} className="text-slate-400 hover:text-white text-xs md:text-sm" aria-label="Back to lobby">
            &larr; <span className="hidden md:inline">Lobby</span>
          </Button>
          <h1 className="text-sm md:text-lg font-bold text-[#F38020]">Adventure</h1>
          {selectedCharacter && (
            <span className="text-xs text-slate-400">
              Playing as <span className="text-white font-semibold">{selectedCharacter.name}</span>
            </span>
          )}
          {roomId && <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">Room: {roomId}</span>}
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            <span className="text-[10px] text-slate-500">{status}</span>
          </div>
          {status === 'connected' && clockRttMs !== null && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700/60 bg-slate-800/60 text-slate-300">
              sync {serverTimeOffsetMs >= 0 ? '+' : ''}{serverTimeOffsetMs}ms | rtt {clockRttMs}ms
            </span>
          )}
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${effectiveMode === 'strict' ? 'border-sky-700/40 bg-sky-900/20 text-sky-300' : 'border-amber-700/40 bg-amber-900/20 text-amber-200'}`}>
            {rollInterpolationMode === 'auto' ? `auto (${effectiveMode})` : rollInterpolationMode}
          </span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
            aiBackend === 'local' ? 'border-emerald-700/40 bg-emerald-900/20 text-emerald-400'
            : aiBackend === 'workers-ai' ? 'border-sky-700/40 bg-sky-900/20 text-sky-400'
            : 'border-slate-700/40 bg-slate-800/40 text-slate-500'
          }`} title={`AI: ${aiBackend}`}>
            {aiBackend === 'local' ? 'AI: local' : aiBackend === 'workers-ai' ? 'AI: cloud' : 'AI: off'}
          </span>
          {saveStatus !== 'idle' && (
            <span className={`text-[8px] px-1 ${saveStatus === 'saving' ? 'text-amber-400 animate-pulse' : saveStatus === 'saved' ? 'text-emerald-400' : 'text-red-400'}`} title={lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : ''}>
              {saveStatus === 'saving' ? '⏳' : saveStatus === 'saved' ? '✓ saved' : '✗ error'}
            </span>
          )}
          {wsConnected && characters.length > 0 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-slate-700/40 bg-slate-800/40 text-slate-400" title={`${characters.length} in party`}>
              {characters.length} {characters.length === 1 ? 'player' : 'players'}
            </span>
          )}
          <SessionTimer roomId={room} compact />
          {/* TTS narration toggle */}
          <button
            onClick={() => {
              const next = !ttsEnabled;
              setTtsEnabled(next);
              import('../lib/tts').then(({ setTTSEnabled }) => setTTSEnabled(next));
            }}
            className={`text-[9px] px-1.5 py-0.5 rounded font-semibold transition-all ${ttsEnabled ? 'bg-violet-900/40 text-violet-300 ring-1 ring-violet-500/40' : 'bg-slate-800/60 border border-slate-700/40 text-slate-500 hover:text-slate-300'}`}
            title={ttsEnabled ? 'Disable DM voice narration' : 'Enable DM voice narration (browser TTS)'}
          >
            {ttsEnabled ? '🔊 TTS' : '🔇'}
          </button>
          {/* Voice chat controls */}
          {wsConnected && (
            <div className="flex items-center gap-1">
              {voice.voiceActive ? (
                <>
                  <button
                    onClick={voice.toggleMute}
                    className={`text-[9px] px-1.5 py-0.5 rounded font-semibold transition-all ${voice.muted ? 'bg-red-900/40 text-red-400' : 'bg-emerald-900/30 text-emerald-400'}`}
                    title={voice.muted ? 'Unmute' : 'Mute'}
                  >
                    {voice.muted ? '🔇' : '🎤'}
                  </button>
                  {voice.talking && <span className="text-[8px] text-emerald-400 animate-pulse font-bold">LIVE</span>}
                  {Object.entries(voice.peerStates).map(([id, state]) => (
                    state.talking && <span key={id} className="text-[8px] text-amber-400 animate-pulse">🔊</span>
                  ))}
                  <button onClick={voice.stopVoice} className="text-[8px] text-red-500 hover:text-red-400" title="Leave voice">✕</button>
                </>
              ) : (
                <button
                  onClick={voice.startVoice}
                  className="text-[9px] px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
                  title="Join voice chat (V = push-to-talk)"
                >
                  🎤 Voice
                </button>
              )}
            </div>
          )}
          {recordings.length > 0 && (
            <div className="relative group">
              <button
                onClick={() => setShowReplay(recordings[recordings.length - 1])}
                className="text-[9px] px-2 py-0.5 rounded bg-indigo-900/30 border border-indigo-700/40 text-indigo-300 hover:bg-indigo-900/50 font-semibold transition-colors"
                title={`Replay combat (${recordings.length} saved)`}
              >
                ▶ Replay ({recordings.length})
              </button>
              {recordings.length > 1 && (
                <div className="hidden group-hover:block absolute top-full right-0 mt-1 z-50 bg-slate-900/95 border border-indigo-700/30 rounded-lg shadow-xl p-1 min-w-[140px]">
                  {recordings.slice().reverse().map((rec, i) => (
                    <button
                      key={rec.id}
                      onClick={() => setShowReplay(rec)}
                      className="w-full text-left text-[8px] px-2 py-1 rounded hover:bg-indigo-900/30 text-slate-300"
                    >
                      Combat #{recordings.length - i} · {rec.events.length} events · {rec.endedAt ? `${Math.round((rec.endedAt - rec.startedAt) / 1000)}s` : 'ongoing'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {canUseDMTools && (
            <button
              onClick={() => window.open('/dm-screen', '_blank', 'width=900,height=600')}
              className="text-[9px] px-2 py-0.5 rounded bg-purple-900/30 border border-purple-700/40 text-purple-300 hover:bg-purple-900/50 font-semibold transition-colors"
              title="Open DM Screen in a new window (synced with this game)"
            >
              DM Screen
            </button>
          )}
          <button
            onClick={() => {
              import('../lib/export').then(({ exportCampaignBook }) => {
                exportCampaignBook(sceneName || room, characters, dmHistory, chatMessages, combatLog, quests, wikiPages, {
                  calendarDay: calendar?.currentDay,
                  calendarHour: calendar?.currentHour,
                });
              });
            }}
            className="text-[9px] px-2 py-0.5 rounded bg-amber-900/30 border border-amber-700/40 text-amber-300 hover:bg-amber-900/50 font-semibold transition-colors"
            title="Export full campaign as a printable PDF book"
          >
            Book
          </button>
          <button
            onClick={() => {
              import('../lib/export').then(({ exportFoundryModule }) => {
                exportFoundryModule(sceneName || room, characters, quests);
              });
            }}
            className="text-[9px] px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-slate-200 font-semibold transition-colors"
            title="Export campaign as Foundry VTT module JSON"
          >
            Foundry
          </button>
          <button
            onClick={() => {
              import('../lib/export').then(({ exportSessionLog }) => {
                exportSessionLog(sceneName || room, dmHistory, chatMessages, combatLog, characters);
              });
            }}
            className="text-[9px] px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-slate-200 font-semibold transition-colors"
            title="Export full session log as markdown"
          >
            Export Log
          </button>
          {canUseDMTools && (
            <button
              onClick={() => {
                const forkId = `${room}-fork-${Date.now().toString(36).slice(-4)}`;
                // Save current state to the fork room in localStorage
                const state = {
                  dmHistory, sceneName, combatLog,
                  selectedCharacterId, characters: characters.map((c) => c.id),
                  quests, wikiPages,
                };
                try { localStorage.setItem(`adventure:state:${forkId}`, JSON.stringify(state)); } catch { /* ignore */ }
                // Navigate to the fork
                navigate(`/game/${forkId}`);
              }}
              className="text-[9px] px-2 py-0.5 rounded bg-violet-900/40 border border-violet-700/40 text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              title="Fork this campaign — create a 'what if' branch"
            >
              Fork
            </button>
          )}
          {canUseDMTools && !inCombat && (
            <button
              onClick={() => {
                const responses: Record<string, boolean> = {};
                characters.forEach((c) => { responses[c.name] = false; });
                setReadyCheck({ active: true, responses, startedAt: Date.now() });
                broadcastGameEvent('ready_check', {});
              }}
              className="text-[9px] px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              title="Send a ready check to all players"
            >
              Ready?
            </button>
          )}
          {canUseDMTools && dmHistory.length > 5 && (
            <button
              onClick={async () => {
                const res = await fetch('/api/dm/campaign-recap', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    sessions: dmHistory.slice(-20),
                    characters: characters.map((c) => ({ name: c.name, race: c.race, class: c.class })),
                  }),
                });
                const data = await res.json() as { recap?: string };
                if (data.recap) addDmMessage(`📜 Campaign Recap: ${data.recap}`);
              }}
              className="text-[9px] px-2 py-0.5 rounded bg-amber-900/40 border border-amber-700/40 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              title="AI generates a catch-up summary of the campaign so far"
            >
              Recap
            </button>
          )}
          {canUseDMTools && dmHistory.length > 3 && (
            <button
              onClick={() => setShowSessionSummary(true)}
              className="text-[9px] px-2 py-0.5 rounded bg-slate-800 border border-slate-600 text-slate-400 hover:text-slate-200 font-semibold transition-colors"
              title="Show session stats summary"
            >
              Wrap Up
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <SessionStreak roomId={room} playerName={currentPlayer.username || 'Guest'} />
          {/* Sound controls — mute toggle + volume slider */}
          <div className="relative flex items-center">
            <button
              onClick={() => {
                toggleMute();
                setSoundMuted(!soundMuted);
              }}
              onMouseEnter={() => setShowVolumeSlider(true)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              title={soundMuted ? 'Unmute sounds (M)' : 'Mute sounds (M)'}
              aria-label={soundMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {soundMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M9.547 3.062A.75.75 0 0110 3.75v12.5a.75.75 0 01-1.264.546L5.203 13H3.75A.75.75 0 013 12.25v-4.5A.75.75 0 013.75 7h1.453l3.533-3.796a.75.75 0 01.811-.142zM13.78 7.22a.75.75 0 10-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 001.06 1.06L15.5 11.06l1.72 1.72a.75.75 0 101.06-1.06L16.56 10l1.72-1.72a.75.75 0 00-1.06-1.06L15.5 8.94l-1.72-1.72z" />
                </svg>
              ) : soundVolume < 0.3 ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 3.75a.75.75 0 00-1.264-.546L5.203 7H3.75A.75.75 0 003 7.75v4.5a.75.75 0 00.75.75h1.453l3.533 3.796A.75.75 0 0010 16.25V3.75z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 3.75a.75.75 0 00-1.264-.546L5.203 7H3.75A.75.75 0 003 7.75v4.5a.75.75 0 00.75.75h1.453l3.533 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.06 5.5 5.5 0 010 7.78.75.75 0 001.06 1.06 7 7 0 000-9.9z" />
                  <path d="M13.829 7.172a.75.75 0 00-1.06 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
                </svg>
              )}
            </button>
            {showVolumeSlider && (
              <div
                className="absolute top-full right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg p-2 flex items-center gap-2 shadow-lg z-50"
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={soundVolume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    setSoundVolume(v);
                    if (v > 0 && soundMuted) { toggleMute(); setSoundMuted(false); }
                    if (v === 0 && !soundMuted) { toggleMute(); setSoundMuted(true); }
                  }}
                  className="w-20 h-1 accent-amber-500 cursor-pointer"
                  title={`Volume: ${Math.round(soundVolume * 100)}%`}
                  aria-label="Volume"
                />
                <span className="text-[10px] text-slate-400 w-7 text-right">{Math.round(soundVolume * 100)}%</span>
                <div className="w-px h-4 bg-slate-700 mx-0.5" />
                <div className="flex gap-1">
                  {DICE_SOUND_PACKS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setDiceSoundPack(p.id); setActiveDicePack(p.id); playDiceRoll(); }}
                      className={`text-[8px] px-1.5 py-0.5 rounded transition-all font-semibold ${activeDicePack === p.id ? 'bg-amber-700/60 text-amber-200 border border-amber-500/50' : 'bg-slate-700/50 text-slate-500 hover:text-slate-300 border border-transparent'}`}
                      title={p.desc}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowRulesRef((s) => !s)}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              showRulesRef ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' : 'border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500'
            }`}
            title="Quick rules reference (R)"
          >
            Rules
          </button>
          <button
            onClick={() => setShowHelpOverlay((s) => !s)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors w-5 h-5 flex items-center justify-center rounded border border-slate-700 hover:border-slate-500"
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
          >
            ?
          </button>
          {canUseDMTools && (
            <button
              onClick={() => setShowDMSidebar((s) => !s)}
              className={`text-xs px-2 py-1 rounded transition-colors font-medium ${
                showDMSidebar ? 'bg-[#F38020]/15 text-[#F38020]' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Toggle DM tools sidebar (D)"
            >
              DM Tools
            </button>
          )}
          <button onClick={() => setShowCharacterPicker(true)} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Switch Character
          </button>
          {inCombat && <span className="text-xs text-red-400 font-semibold">Round {combatRound}</span>}
          {rolls.length > 0 && (
            <span className="text-xs text-slate-500">
              {rolls.length} roll{rolls.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </header>

      {/* Mobile bottom tab bar — visible only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 flex">
        {(['game', 'chat', 'sheet'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setMobilePanel(tab);
              if (tab === 'sheet') setShowSheet(true);
              else if (tab === 'chat') setShowSheet(false);
            }}
            className={`flex-1 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              mobilePanel === tab ? 'text-[#F38020] border-t-2 border-[#F38020] bg-[#F38020]/5' : 'text-slate-500'
            }`}
          >
            {tab === 'game' ? (inCombat ? 'Battle' : 'Game') : tab === 'chat' ? 'Chat' : 'Sheet'}
          </button>
        ))}
      </div>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden relative z-10 pb-10 md:pb-0">
        {/* DM Sidebar — collapsible left panel (hidden on mobile) */}
        {canUseDMTools && showDMSidebar && (
          <DMSidebar
            onClose={() => setShowDMSidebar(false)}
            encounterDifficulty={encounterDifficulty}
            setEncounterDifficulty={setEncounterDifficulty}
            encounterLoading={encounterLoading}
            onGenerateEncounter={handleGenerateEncounter}
            sceneName={sceneName}
            setSceneName={setSceneName}
            npcMode={npcMode}
            setNpcMode={setNpcMode}
            npcName={npcName}
            setNpcName={setNpcName}
            npcRole={npcRole}
            setNpcRole={setNpcRole}
            npcDialogueHistory={npcDialogueHistory}
            setNpcDialogueHistory={setNpcDialogueHistory}
            currentAmbient={currentAmbient}
            setCurrentAmbient={setCurrentAmbient}
            dmNotes={dmNotes}
            setDmNotes={setDmNotes}
            selectedCharacter={selectedCharacter}
            turnTimerEnabled={turnTimerEnabled}
            setTurnTimerEnabled={setTurnTimerEnabled}
            turnTimeSeconds={turnTimeSeconds}
            setTurnTimeSeconds={setTurnTimeSeconds}
            onOpenMonsterBrowser={() => setShowMonsterBrowser(true)}
            weather={weather}
            setWeather={(w) => { setWeather(w); broadcastGameEvent('weather_change', { weather: w }); }}
            roomId={room}
            onApplyFormation={(positions) => { setMapPositions(positions); broadcastGameEvent('formation_apply', { positions }); }}
            mapPins={mapPins}
            onPinRemove={handlePinRemove}
            selectedCharacterId={selectedCharacterId}
            onAddDmMessage={addDmMessage}
            onSpawnMonster={handleSpawnMonster}
            dynamicDifficultyEnabled={dynamicDifficultyEnabled}
            setDynamicDifficultyEnabled={(v) => {
              setDynamicDifficultyEnabled(v);
              try { localStorage.setItem(`adventure:dynDiff:${room}`, v ? '1' : '0'); } catch { /* ok */ }
            }}
            rollInterpolationMode={rollInterpolationMode}
            effectiveMode={effectiveMode}
            autoStrictRttMs={autoStrictRttMs}
            autoStrictJitterMs={autoStrictJitterMs}
            onSetRollSyncMode={(mode, rttMs, jitterMs) => {
              send({ type: 'set_roll_interpolation_mode', rollInterpolationMode: mode, autoStrictRttMs: rttMs, autoStrictJitterMs: jitterMs });
            }}
            playerLatency={playerLatency}
            stalePlayers={stalePlayers}
            partyInventory={partyInventory}
            onAddToPartyInventory={(item) => setPartyInventory((prev) => [...prev, item])}
            onRemoveFromPartyInventory={(id) => setPartyInventory((prev) => prev.filter((i) => i.id !== id))}
            onGiveItemToPlayer={(itemId, charId) => {
              const item = partyInventory.find((i) => i.id === itemId);
              if (!item) return;
              setPartyInventory((prev) => prev.filter((i) => i.id !== itemId));
              updateCharacter(charId, { inventory: [...(characters.find((c) => c.id === charId)?.inventory || []), { ...item, id: crypto.randomUUID() }] } as Partial<typeof characters[0]>);
            }}
            stagedLoot={stagedLoot}
            onAddStagedLoot={(item) => setStagedLoot((prev) => [...prev, item])}
            onRemoveStagedLoot={(id) => setStagedLoot((prev) => prev.filter((i) => i.id !== id))}
            onClearStagedLoot={() => setStagedLoot([])}
            dmPersonality={dmPersonality}
            onSetDmPersonality={(p) => { setDmPersonality(p); try { localStorage.setItem(`adventure:dm-personality:${room}`, p); } catch { /* ok */ } }}
          />
        )}

        {/* Offline mode banner */}
        <OfflineBanner status={status} reconnectAttempt={reconnectAttemptCount} />

        {/* Ready check banner */}
        {readyCheck?.active && (
          <div className="mx-4 mb-2 rounded-xl border border-emerald-600/30 bg-gradient-to-r from-emerald-950/40 to-slate-900/60 px-4 py-2.5 flex items-center gap-3 animate-fade-in-up">
            <span className="text-emerald-400 text-sm animate-pulse">&#9679;</span>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Ready Check</span>
              <div className="flex gap-2 mt-1 flex-wrap">
                {Object.entries(readyCheck.responses).map(([name, ready]) => (
                  <span key={name} className={`text-[10px] px-2 py-0.5 rounded-full border ${ready ? 'border-emerald-600/50 bg-emerald-900/30 text-emerald-400' : 'border-slate-700 bg-slate-800/50 text-slate-500'}`}>
                    {ready ? '✓' : '○'} {name}
                  </span>
                ))}
              </div>
            </div>
            {!canUseDMTools && !readyCheck.responses[selectedCharacter?.name || ''] && (
              <button
                onClick={() => {
                  if (!selectedCharacter) return;
                  setReadyCheck((prev) => prev ? { ...prev, responses: { ...prev.responses, [selectedCharacter.name]: true } } : null);
                  broadcastGameEvent('ready_response', { playerId: wsPlayerId, playerName: selectedCharacter.name });
                }}
                className="px-3 py-1.5 bg-emerald-700/50 hover:bg-emerald-600/60 border border-emerald-500/50 text-emerald-200 text-xs font-bold rounded-lg transition-all"
              >
                Ready!
              </button>
            )}
            <button onClick={() => setReadyCheck(null)} className="text-xs text-slate-600 hover:text-slate-400">Dismiss</button>
          </div>
        )}

        {/* Left: initiative bar + game board / DM area */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-opacity duration-200 ${rollPopupVisible ? 'opacity-45' : 'opacity-100'} ${mobilePanel !== 'game' ? 'hidden md:flex' : ''}`}>
          {/* Initiative bar — only show when units exist */}
          {units.length > 0 && (
            <div className="bg-slate-900/50 border-b border-slate-800 shrink-0 relative">
              <InitiativeBar
                entries={units}
                turnTimerEnabled={turnTimerEnabled}
                turnTimeSeconds={turnTimeSeconds}
                onTimerExpire={() => {
                  // Auto-advance turn when timer expires
                  if (inCombat) {
                    const result = nextTurn();
                    setTimeout(broadcastCombatSyncLatest, 50);
                    setCombatLog((prev) => [...prev, `Turn timer expired — advancing turn.`]);
                  }
                }}
                canReorder={canUseDMTools && inCombat && !initiativeLocked}
                onReorder={(reorderedIds) => {
                  setUnits((prev: Unit[]) => {
                    const ordered: Unit[] = [];
                    for (const id of reorderedIds) {
                      const u = prev.find((u) => u.id === id);
                      if (u) ordered.push(u);
                    }
                    // Append any units not in the reorder list (shouldn't happen, safety net)
                    for (const u of prev) {
                      if (!reorderedIds.includes(u.id)) ordered.push(u);
                    }
                    return ordered;
                  });
                  setTimeout(broadcastCombatSyncLatest, 50);
                  setCombatLog((prev) => [...prev, 'DM reordered initiative.']);
                }}
              />
              {/* Initiative lock toggle (DM only, during combat) */}
              {canUseDMTools && inCombat && (
                <button
                  onClick={() => setInitiativeLocked((v) => !v)}
                  className={`absolute top-1 right-1 text-[8px] px-1.5 py-0.5 rounded border font-semibold transition-all z-10 ${
                    initiativeLocked
                      ? 'border-amber-600/50 bg-amber-900/30 text-amber-400'
                      : 'border-slate-700 text-slate-600 hover:text-slate-400'
                  }`}
                  title={initiativeLocked ? 'Unlock initiative order (allow re-rolling and drag reorder)' : 'Lock initiative order (prevent changes)'}
                >
                  {initiativeLocked ? '🔒 Locked' : '🔓'}
                </button>
              )}
            </div>
          )}

          {/* Encounter XP tracker — during combat */}
          <EncounterXPTracker units={units} playerCount={characters.length} inCombat={inCombat} />
          <EncounterThermometer units={units} inCombat={inCombat} />
          <DamageLeaderboard combatLog={combatLog} playerNames={characters.map((c) => c.name)} inCombat={inCombat} />

          {/* Party health overview — always visible when characters exist */}
          {characters.length > 0 && adventureStarted && (
            <PartyHealthBar
              characters={characters}
              selectedCharacterId={selectedCharacter?.id || null}
              onSelectCharacter={(id) => {
                const unit = units.find((u) => u.characterId === id);
                if (unit) setSelectedUnitId(unit.id === selectedUnitId ? null : unit.id);
              }}
            />
          )}
          <PartyVitals characters={characters} inCombat={inCombat} />

          {/* Main content area */}
          <div className="flex-1 p-4 overflow-auto relative">
            {/* Floating combat text overlay */}
            <FloatingCombatText texts={floatingTexts} onExpire={expireFloatingText} />
            {!adventureStarted ? (
              // Pre-adventure: Begin Adventure prompt
              <div className="rounded-xl border border-slate-800 bg-slate-900 flex flex-col items-center justify-center h-full gap-6 p-8">
                {selectedCharacter && (
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedCharacter.portrait || `/portraits/classes/${selectedCharacter.class.toLowerCase()}.webp`}
                      alt={selectedCharacter.name}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-amber-600/30"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `/portraits/races/${selectedCharacter.race.toLowerCase()}.webp`;
                      }}
                    />
                    <div>
                      <div className="text-2xl font-bold text-white">{selectedCharacter.name}</div>
                      <div className="text-sm text-slate-400">
                        Level {selectedCharacter.level} {selectedCharacter.race} {selectedCharacter.class}
                      </div>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-red-400">
                          HP {selectedCharacter.hp}/{selectedCharacter.maxHp}
                        </span>
                        <span className="text-xs text-sky-400">AC {selectedCharacter.ac}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center space-y-2 max-w-md">
                  <h2 className="text-xl font-bold text-amber-400">Your Adventure Awaits</h2>
                  <p className="text-sm text-slate-500">The AI Dungeon Master will set the scene and guide your journey. Make choices, explore, fight, and forge your legend.</p>
                </div>

                {canUseDMTools ? (
                  <button onClick={handleBeginAdventure} disabled={dmLoading} className="px-8 py-4 bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg shadow-amber-900/30 transition-all active:scale-[0.98] text-lg flex items-center gap-2">
                    {dmLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        The DM prepares...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z" clipRule="evenodd" />
                        </svg>
                        Begin Adventure
                      </>
                    )}
                  </button>
                ) : (
                  <p className="text-sm text-slate-500 italic">Waiting for the DM to begin the adventure...</p>
                )}
              </div>
            ) : (
              // Adventure in progress: DM tools + narration/map area
              <div className="rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-full">
                {/* View tabs */}
                <div className="flex items-center border-b border-slate-800 shrink-0">
                  <button onClick={() => setActiveView('narration')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'narration' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Narration
                  </button>
                  <button onClick={() => setActiveView('map')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'map' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Battle Map
                  </button>
                  {!inCombat && (
                    <button onClick={() => setActiveView('shop')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'shop' ? 'border-yellow-500 text-yellow-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                      Shop
                    </button>
                  )}
                  <button onClick={() => setActiveView('journal')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'journal' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Journal
                  </button>
                  <button onClick={() => setActiveView('loot')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'loot' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Loot
                  </button>
                  <button onClick={() => setActiveView('encounters')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'encounters' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Encounters
                  </button>
                  <button onClick={() => setActiveView('npcs')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'npcs' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    NPCs
                  </button>
                  <button onClick={() => setActiveView('dicestats')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'dicestats' ? 'border-red-500 text-red-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Stats
                  </button>
                  <button onClick={() => setActiveView('timeline')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'timeline' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Timeline
                  </button>
                  <button onClick={() => setActiveView('calendar')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'calendar' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    📅
                  </button>
                  <button onClick={() => setActiveView('wiki')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'wiki' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Wiki
                  </button>
                  <button onClick={() => setActiveView('relationships')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'relationships' ? 'border-teal-500 text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Bonds
                  </button>
                  <button onClick={() => setActiveView('achievements')} className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'achievements' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    Badges
                  </button>
                </div>

                {/* AoE targeting banner */}
                {activeAoE && pendingAoESpell && (
                  <div className="flex items-center justify-between px-4 py-2 bg-purple-900/40 border-b border-purple-700/50 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <span className="text-xs font-semibold text-purple-300">
                        Targeting: {pendingAoESpell.spell.name}
                      </span>
                      <span className="text-[10px] text-purple-400/70">
                        {pendingAoESpell.spell.aoe?.shape} · {(pendingAoESpell.spell.aoe?.radiusCells || 0) * 5}ft — click on the map to place
                      </span>
                    </div>
                    <button
                      onClick={() => { setActiveAoE(null); setPendingAoESpell(null); }}
                      className="text-[10px] px-2 py-0.5 rounded bg-purple-800/60 text-purple-300 hover:bg-purple-700/60 transition-colors"
                    >
                      Cancel (ESC)
                    </button>
                  </div>
                )}

                {/* DM + Combat toolbar */}
                <CombatToolbar
                  selectedCharacter={selectedCharacter}
                  selectedUnitId={selectedUnitId}
                  canUseDMTools={canUseDMTools}
                  wsConnected={wsConnected}
                  isSpectating={isSpectating}
                  isPlayerTurn={isPlayerTurn}
                  adventureStarted={adventureStarted}
                  saveStatus={saveStatus}
                  lastSavedAt={lastSavedAt}
                  encounterDifficulty={encounterDifficulty}
                  setEncounterDifficulty={setEncounterDifficulty}
                  encounterLoading={encounterLoading}
                  handleGenerateEncounter={handleGenerateEncounter}
                  npcMode={npcMode}
                  setNpcMode={setNpcMode}
                  npcDialogueHistory={npcDialogueHistory}
                  setNpcDialogueHistory={setNpcDialogueHistory}
                  sceneName={sceneName}
                  setSceneName={setSceneName}
                  dmLoading={dmLoading}
                  dmHistory={dmHistory}
                  setDmHistory={setDmHistory}
                  combatLog={combatLog}
                  setCombatLog={setCombatLog}
                  addDmMessage={addDmMessage}
                  broadcastGameEvent={broadcastGameEvent}
                  broadcastCombatSync={broadcastCombatSync}
                  broadcastCombatSyncLatest={broadcastCombatSyncLatest}
                  drainConcentrationMessages={drainConcentrationMessages}
                  callDmNarrate={callDmNarrate}
                  setShowLevelUpModal={setShowLevelUpModal}
                  setActiveView={setActiveView}
                  setActiveAoE={setActiveAoE}
                  setPendingAoESpell={setPendingAoESpell}
                  shopMessage={shopMessage}
                  setShopMessage={setShopMessage}
                  addFloatingText={addFloatingText}
                  addAttackIndicator={addAttackIndicator}
                  addFlytext={addFlytext}
                  recordKill={recordKill}
                  triggerDeathSave={triggerDeathSave}
                  recordDamage={recordDamage}
                  triggerDeathRecap={triggerDeathRecap}
                  triggerLevelUp={(name, level) => triggerLevelUp(name, level)}
                  onNewRound={(round) => checkRoundMVP(combatLog, characters.map((c) => c.name), round)}
                  onCombatEnd={() => {
                    const prev = preCombatAmbientRef.current;
                    if (prev && prev !== 'none' && prev !== 'combat') {
                      setAmbientMood(prev);
                      setCurrentAmbient(prev);
                    }
                  }}
                  onAddToPartyInventory={(item) => setPartyInventory((prev) => [...prev, item])}
                  stagedLoot={stagedLoot}
                  onConsumeStagedLoot={() => setStagedLoot([])}
                />

                {/* Combat round recap — shown above content in narration view */}
                {inCombat && activeView === 'narration' && (
                  <CombatRecap combatLog={combatLog} combatRound={combatRound} inCombat={inCombat} />
                )}

                {/* Post-combat MVP awards — shown after combat ends */}
                {activeView === 'narration' && (
                  <CombatMVP
                    combatLog={combatLog}
                    inCombat={inCombat}
                    playerNames={characters.map((c) => c.name)}
                  />
                )}

                {/* AI tactical post-mortem — shown after combat ends */}
                {activeView === 'narration' && (
                  <Suspense fallback={null}>
                    <EncounterPostmortem combatLog={combatLog} inCombat={inCombat} characters={characters} />
                  </Suspense>
                )}

                {/* AI Session Recap banner */}
                {activeView === 'narration' && sessionRecap && (
                  <div className="mx-4 mb-2 rounded-xl border border-amber-600/30 bg-gradient-to-br from-amber-950/40 to-stone-900/60 px-5 py-4 shadow-lg animate-fade-in-up">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 text-sm">📜</span>
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Previously on your adventure...</span>
                      </div>
                      <button onClick={() => setSessionRecap(null)} className="text-xs text-slate-500 hover:text-amber-400 transition-colors">Dismiss</button>
                    </div>
                    <p className="text-sm text-amber-100/90 italic leading-relaxed">{sessionRecap}</p>
                  </div>
                )}
                {activeView === 'narration' && recapLoading && (
                  <div className="mx-4 mb-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-950/20 border border-amber-800/20">
                    <div className="w-3 h-3 border border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-amber-500/70">Recalling the story so far...</span>
                  </div>
                )}

                {/* Session Recap — "Previously on..." for returning players */}
                {activeView === 'narration' && adventureStarted && dmHistory.length > 3 && (
                  <div className="mx-4 mb-2">
                    {sessionRecap ? (
                      <div className="rounded-xl border border-amber-600/30 bg-gradient-to-br from-amber-950/30 to-orange-900/20 px-5 py-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Previously on...</span>
                          <button onClick={() => setSessionRecap(null)} className="text-[9px] text-slate-500 hover:text-slate-300">Dismiss</button>
                        </div>
                        <p className="text-sm text-amber-100/80 italic leading-relaxed">{sessionRecap}</p>
                      </div>
                    ) : (
                      <button
                        disabled={recapLoading}
                        onClick={async () => {
                          setRecapLoading(true);
                          try {
                            const res = await fetch(`${apiBase()}/api/dm/session-recap`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ dmHistory: dmHistory.slice(-15), combatLog: combatLog.slice(-10), characters: buildPartyPayload(), sceneName }),
                            });
                            if (res.ok) {
                              const data = await res.json() as { recap?: string };
                              if (data.recap) setSessionRecap(data.recap);
                            }
                          } catch { /* ok */ }
                          setRecapLoading(false);
                        }}
                        className="w-full text-[10px] px-3 py-1.5 rounded-lg border border-dashed border-amber-700/40 text-amber-400/70 hover:text-amber-300 hover:border-amber-600/50 hover:bg-amber-950/10 transition-all font-semibold disabled:opacity-50"
                      >
                        {recapLoading ? 'Generating recap...' : '📖 Previously on...'}
                      </button>
                    )}
                  </div>
                )}

                {/* AI Backstory Hooks — party narrative connections */}
                {activeView === 'narration' && !adventureStarted && characters.length >= 2 && (
                  <div className="mx-4 mb-2">
                    {backstoryHooks.length > 0 ? (
                      <div className="rounded-xl border border-violet-600/30 bg-gradient-to-br from-violet-950/40 to-indigo-900/30 px-5 py-4 shadow-lg animate-fade-in-up">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-violet-400 text-sm">🔗</span>
                            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Party Connections</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={handleGenerateBackstoryHooks} disabled={hooksLoading} className="text-[10px] text-slate-500 hover:text-violet-400 transition-colors disabled:opacity-50">Regenerate</button>
                            <button onClick={() => setBackstoryHooks([])} className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors">Dismiss</button>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {backstoryHooks.map((hook, i) => (
                            <li key={i} className="text-sm text-violet-100/80 italic leading-relaxed pl-3 border-l-2 border-violet-700/40">{hook}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <button
                        onClick={handleGenerateBackstoryHooks}
                        disabled={hooksLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-violet-700/40 text-violet-400 text-xs font-semibold hover:bg-violet-900/20 hover:border-violet-600/50 transition-all disabled:opacity-50"
                      >
                        {hooksLoading ? (
                          <><div className="w-3 h-3 border border-violet-400 border-t-transparent rounded-full animate-spin" /> Generating party connections...</>
                        ) : (
                          <><span>🔗</span> Generate Backstory Hooks</>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {activeView === 'narration' ? (
                   <NarrationPanel
                    selectedCharacter={selectedCharacter}
                    canUseDMTools={canUseDMTools}
                    dmHistory={dmHistory}
                    dmLoading={dmLoading}
                    npcLoading={npcLoading}
                    npcName={npcName}
                    npcRole={npcRole}
                    npcMode={npcMode}
                    sceneName={sceneName}
                    roomId={room}
                    allCharacters={characters}
                    setNpcName={setNpcName}
                    setNpcRole={setNpcRole}
                    quests={quests}
                    setQuests={setQuests}
                    showQuests={showQuests}
                    setShowQuests={setShowQuests}
                    newQuestTitle={newQuestTitle}
                    setNewQuestTitle={setNewQuestTitle}
                    combatLog={combatLog}
                    showCombatLog={showCombatLog}
                    setShowCombatLog={setShowCombatLog}
                    actionInput={actionInput}
                    setActionInput={setActionInput}
                    handleDeathSave={handleDeathSave}
                    handlePlayerAction={handlePlayerAction}
                    broadcastGameEvent={broadcastGameEvent}
                  />
                ) : activeView === 'shop' ? (
                  <div className="flex-1 overflow-y-auto">
                    <ShopView
                      selectedCharacter={selectedCharacter}
                      shopMessage={shopMessage}
                      setShopMessage={setShopMessage}
                    />
                  </div>
                ) : activeView === 'journal' ? (
                  <div className="flex flex-col h-full overflow-hidden">
                    <QuestMap
                      quests={quests}
                      onAddQuest={canUseDMTools ? (q) => setQuests((prev) => [...prev, q]) : undefined}
                      onToggleComplete={(id) => setQuests((prev) => prev.map((q) => q.id === id ? { ...q, completed: !q.completed } : q))}
                      onRemoveQuest={canUseDMTools ? (id) => setQuests((prev) => prev.filter((q) => q.id !== id)) : undefined}
                    />
                  </div>
                ) : activeView === 'loot' ? (
                  <LootTracker
                    roomId={room}
                    playerName={currentPlayer.username || 'Unknown'}
                    isDM={canUseDMTools}
                    onBroadcast={(evt) => broadcastGameEvent(evt.type, { items: evt.items })}
                    syncRef={lootSyncRef}
                  />
                ) : activeView === 'encounters' ? (
                  <EncounterLog
                    roomId={room}
                    currentCombatLog={combatLog}
                    inCombat={inCombat}
                    combatRound={combatRound}
                  />
                ) : activeView === 'npcs' ? (
                  <NpcTracker
                    roomId={room}
                    isDM={canUseDMTools}
                    partyNames={characters.map((c) => c.name)}
                  />
                ) : activeView === 'dicestats' ? (
                  <DiceStats />
                ) : activeView === 'timeline' ? (
                  <CampaignTimeline
                    roomId={room}
                    dmHistory={dmHistory}
                    combatLog={combatLog}
                    inCombat={inCombat}
                    characters={characters.map((c) => ({ name: c.name, level: c.level, class: c.class, gold: c.gold }))}
                  />
                ) : activeView === 'calendar' ? (
                  <CampaignCalendar state={calendar} onUpdate={setCalendar} canEdit={canUseDMTools} />
                ) : activeView === 'wiki' ? (
                  <WorldWiki
                    pages={wikiPages}
                    playerName={currentPlayer.username || 'Unknown'}
                    sceneName={sceneName}
                    onAddPage={(page) => setWikiPages((prev) => [...prev, page])}
                    onUpdatePage={(id, updates) => setWikiPages((prev) => prev.map((p) => p.id === id ? { ...p, ...updates } : p))}
                    onDeletePage={(id) => setWikiPages((prev) => prev.filter((p) => p.id !== id))}
                  />
                ) : activeView === 'relationships' ? (
                  <RelationshipGraph
                    characters={characters}
                    edges={relationships}
                    onAddEdge={(edge) => setRelationships((prev) => [...prev, edge])}
                    onAddEdges={(newEdges) => setRelationships((prev) => [...prev, ...newEdges])}
                    onRemoveEdge={(from, to) => setRelationships((prev) => prev.filter((e) => !(e.from === from && e.to === to)))}
                  />
                ) : activeView === 'achievements' ? (
                  <Achievements
                    roomId={room}
                    combatLog={combatLog}
                    inCombat={inCombat}
                    combatRound={combatRound}
                    chatMessageCount={chatMessages.filter((m) => m.type === 'chat').length}
                    onUnlock={(msg) => addDmMessage(msg)}
                  />
                ) : (
                  /* Battle Map view */
                  <div className="relative flex-1 overflow-hidden">
                    {/* Floor navigation bar — visible when multiple floors exist */}
                    {floorNames.length > 1 && (
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 px-2 py-1">
                        {floorNames.map((name, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentFloor(i)}
                            className={`text-[9px] px-2 py-0.5 rounded font-semibold transition-all ${currentFloor === i ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                          >
                            {name}
                          </button>
                        ))}
                        {canUseDMTools && (
                          <button
                            onClick={() => {
                              const name = prompt('Floor name:', `Floor ${floorNames.length + 1}`);
                              if (name?.trim()) setFloorNames((prev) => [...prev, name.trim()]);
                            }}
                            className="text-[8px] text-indigo-400 hover:text-indigo-300 font-bold px-1"
                            title="Add a new floor"
                          >
                            +
                          </button>
                        )}
                      </div>
                    )}
                    {/* DM can add the first extra floor via a subtle link */}
                    {floorNames.length === 1 && canUseDMTools && (
                      <button
                        onClick={() => {
                          const name = prompt('Name for the new floor:', 'Floor 2');
                          if (name?.trim()) setFloorNames((prev) => [...prev, name.trim()]);
                        }}
                        className="absolute top-1 right-1 z-20 text-[8px] text-slate-600 hover:text-indigo-400 transition-colors"
                        title="Add a second floor (enables multi-floor dungeon)"
                      >
                        + Floor
                      </button>
                    )}
                    <BattleMap
                      canUseDMTools={canUseDMTools}
                      myUnitId={wsConnected && !isDM && selectedCharacterId ? selectedCharacterId : undefined}
                      onPing={(col, row) => broadcastGameEvent('map_ping', { col, row, time: Date.now() })}
                      incomingPings={incomingPings}
                      lighting={lightingGrid}
                      onLightingChange={canUseDMTools ? setLightingGrid : undefined}
                      onStairClick={floorNames.length > 1 ? (dir) => {
                        if (dir === 'up' && currentFloor > 0) setCurrentFloor(currentFloor - 1);
                        else if (dir === 'down' && currentFloor < floorNames.length - 1) setCurrentFloor(currentFloor + 1);
                      } : undefined}
                      onTokenMove={(unitId, col, row) => broadcastGameEvent('token_move', { unitId, col, row })}
                      onTerrainChange={(t) => broadcastGameEvent('terrain_update', { terrain: t })}
                      onMapImageChange={(url) => broadcastGameEvent('map_image', { mapImageUrl: url })}
                      mapPins={mapPins}
                      onPinAdd={handlePinAdd}
                      onPinRemove={handlePinRemove}
                      onOpportunityAttack={(attackerName, targetName, damage, hit) => {
                        const msg = hit ? `Opportunity Attack! ${attackerName} strikes ${targetName} for ${damage} damage as they flee!` : `Opportunity Attack! ${attackerName} swings at ${targetName} but misses!`;
                        setCombatLog((prev) => [...prev, msg]);
                        addDmMessage(msg);
                        setTimeout(broadcastCombatSyncLatest, 50);
                      }}
                      animateMoveRef={animateMoveRef}
                      attackIndicators={attackIndicators}
                      activeAoE={activeAoE}
                      onAoEConfirm={handleAoEConfirm}
                      onAoECancel={() => {
                        setActiveAoE(null);
                        setPendingAoESpell(null);
                      }}
                    />
                    {weather !== 'none' && (
                      <Suspense fallback={null}><WeatherParticles weather={weather} width={960} height={960} /></Suspense>
                    )}
                    <HPFlytext flytexts={flytexts} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar: character sheet / dice / chat — hidden on mobile unless tab active */}
        <div className={`w-full md:w-80 border-l border-slate-800 bg-slate-900 flex flex-col shrink-0 ${mobilePanel === 'chat' || mobilePanel === 'sheet' ? 'flex' : 'hidden md:flex'}`}>
          {/* Sidebar tabs */}
          {selectedCharacter && (
            <div className="flex border-b border-slate-800 shrink-0">
              <button onClick={() => { setShowSheet(false); setShowNotes(false); }} className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 ${!showSheet && !showNotes ? 'border-[#F38020] text-[#F38020]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                Chat
              </button>
              <button onClick={() => { setShowSheet(true); setShowNotes(false); }} className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 ${showSheet ? 'border-[#F38020] text-[#F38020]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                Sheet
              </button>
              {characters.length >= 2 && (
                <button onClick={() => setShowCompare(true)} className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 border-transparent text-slate-500 hover:text-slate-300" title="Compare two characters">
                  ⚖️
                </button>
              )}
              <button onClick={() => { setShowSheet(false); setShowNotes(true); }} className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 ${showNotes ? 'border-[#F38020] text-[#F38020]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                Notes
              </button>
            </div>
          )}

          {showNotes ? (
            <div className="flex-1 flex flex-col p-3 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Personal Notes</span>
                <span className="text-[8px] text-slate-600">Auto-saved • Only you can see these</span>
              </div>
              <textarea
                value={playerNotes}
                onChange={(e) => setPlayerNotes(e.target.value)}
                placeholder="Write session notes, track NPCs, record clues, plan your next move...&#10;&#10;Only visible to you — not the DM or other players."
                className="flex-1 w-full bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:ring-1 focus:ring-[#F38020]/50 focus:border-[#F38020]/50 outline-none leading-relaxed"
                spellCheck={false}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[8px] text-slate-600">{playerNotes.length} chars</span>
                <div className="flex gap-2">
                  {wsConnected && playerNotes.trim() && (
                    <button
                      onClick={() => {
                        const title = prompt('Note title (visible to everyone):', 'Session Note');
                        if (title !== null) send({ type: 'share_note', title: title || 'Shared Note', text: playerNotes.trim().slice(0, 500) });
                      }}
                      className="text-[8px] text-teal-500 hover:text-teal-400 transition-colors font-semibold"
                      title="Share this note with the party (visible in chat)"
                    >
                      Share with Party
                    </button>
                  )}
                <button
                  onClick={() => { if (confirm('Clear all notes?')) setPlayerNotes(''); }}
                  className="text-[8px] text-slate-600 hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
                </div>
              </div>
            </div>
          ) : showSheet && selectedCharacter ? (
            <div className="flex-1 overflow-y-auto p-4">
              <CharacterSheet character={selectedCharacter} />
            </div>
          ) : (
            <>
              <div className="relative p-4 border-b border-slate-800 overflow-y-auto">
                <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} onRollComplete={handleRollComplete} onMacroRoll={handleMacroRoll} useServerRolls={status === 'connected'} suppressServerSpin={status === 'connected'} />
                {/* DM secret roll toggle + reveal panel */}
                {canUseDMTools && (
                  <div className="mt-2 space-y-1">
                    <button
                      onClick={() => setSecretRollMode((v) => !v)}
                      className={`w-full text-[9px] py-1 rounded border font-semibold transition-all ${
                        secretRollMode ? 'border-purple-600/50 bg-purple-900/20 text-purple-400' : 'border-slate-700 text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      {secretRollMode ? 'Secret Mode On — rolls are DM-only' : 'Enable Secret Rolls'}
                    </button>
                    {secretRolls.filter((r) => !r.revealed).length > 0 && (
                      <div className="space-y-0.5">
                        {secretRolls.filter((r) => !r.revealed).map((r) => (
                          <div key={r.id} className="flex items-center justify-between px-2 py-0.5 rounded bg-purple-950/20 border border-purple-800/30">
                            <span className="text-[9px] text-purple-300 font-mono">{r.die}: {r.value}</span>
                            <button
                              onClick={() => {
                                setSecretRolls((prev) => prev.map((sr) => sr.id === r.id ? { ...sr, revealed: true } : sr));
                                broadcastGameEvent('dm_narrate', { narration: `[Revealed Roll] ${r.die}: ${r.value}` });
                                addDmMessage(`Revealed: ${r.die} = ${r.value}`);
                              }}
                              className="text-[8px] px-1.5 py-0.5 rounded bg-purple-800/30 text-purple-400 hover:text-purple-300 font-semibold"
                            >
                              Reveal
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Ability check quick-roller */}
                <AbilityCheckRoller
                  character={selectedCharacter || null}
                  onRoll={(_ability, _total, _roll, _mod, message) => {
                    playDiceRoll();
                    addDmMessage(message);
                    setCombatLog((prev) => [...prev, message]);
                  }}
                />
                <SavingThrowRoller
                  character={selectedCharacter || null}
                  onRoll={(message) => {
                    playDiceRoll();
                    addDmMessage(message);
                    setCombatLog((prev) => [...prev, message]);
                  }}
                />
                {rollPopupVisible && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/75 backdrop-blur-[1px] pointer-events-auto">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎲</div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">Rolling...</div>
                    </div>
                  </div>
                )}
              </div>
              {/* Dice History — collapsible panel */}
              {rolls.length > 0 && (
                <div className="border-b border-slate-800">
                  <button
                    onClick={() => setShowDiceHistory((s) => !s)}
                    className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <span>Roll History ({rolls.length})</span>
                    <DiceLuckTracker rolls={rolls.filter((r) => r.sides === 20).map((r) => r.value)} />
                    <DiceSuperstition rolls={rolls.filter((r) => r.sides === 20).map((r) => r.value)} />
                    <span>{showDiceHistory ? '\u25B2' : '\u25BC'}</span>
                  </button>
                  {showDiceHistory && (
                    <div className="max-h-36 overflow-y-auto px-4 pb-2 space-y-1">
                      {rolls.slice(0, 20).map((roll) => (
                        <div key={roll.id} className={`flex items-center justify-between text-[10px] px-2 py-1 rounded ${
                          roll.isCritical ? 'bg-yellow-500/10 border border-yellow-600/20' : roll.isFumble ? 'bg-red-500/10 border border-red-600/20' : 'bg-slate-800/50'
                        }`}>
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`font-bold shrink-0 ${roll.isCritical ? 'text-yellow-400' : roll.isFumble ? 'text-red-400' : 'text-white'}`}>
                              {roll.value}
                            </span>
                            <span className="text-slate-500 font-mono shrink-0">{roll.die?.toUpperCase()}</span>
                            <span className="text-slate-400 truncate">
                              {roll.unitName || roll.playerName}
                            </span>
                          </div>
                          <span className="text-[8px] text-slate-600 shrink-0 ml-1">
                            {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Combat emotes — quick reactions */}
              {inCombat && (
                <div className="px-4 pt-2">
                  <CombatEmotes onSend={sendEmote} incoming={emoteIncoming} />
                </div>
              )}
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                <ChatPanel messages={chatMessages} onSend={handleChatSend} onSlashRoll={handleSlashRoll} onWhisper={(target, msg) => {
                  send({ type: 'whisper', targetUsername: target, message: msg });
                }} onReaction={(messageId, emoji) => {
                  send({ type: 'chat_reaction', messageId, emoji });
                }} onTyping={() => send({ type: 'typing' })} onLoadOlder={handleLoadOlderChat} canLoadOlder={canLoadOlderChat} loadingOlder={loadingOlderChat} initialReadAnchorTs={initialReadAnchorTs} onMarkRead={handleMarkRead} typingUsers={Array.from(typingUsers.values())} currentPlayerId={wsPlayerId || currentPlayer.id} />
              </div>
            </>
          )}
        </div>
      </div>

      <BG3RollPopup
        roll={activeRollPopup}
        visible={rollPopupVisible}
        isDM={isDM}
        onVeto={(rollId) => send({ type: 'veto_roll', rollId })}
        serverTimeOffsetMs={serverTimeOffsetMs}
        syncRttMs={clockRttMs}
        interpolationMode={rollInterpolationMode}
        effectiveInterpolationMode={effectiveMode}
      />

      {/* Keyboard Shortcut Help Overlay */}
      {/* Character comparison modal */}
      {showCompare && (
        <CharacterCompare characters={characters} onClose={() => setShowCompare(false)} />
      )}

      {/* Combat Replay viewer */}
      {showReplay && (
        <CombatReplay recording={showReplay} onClose={() => setShowReplay(null)} />
      )}

      {showHelpOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" onClick={() => setShowHelpOverlay(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-amber-400">Keyboard Shortcuts</h2>
              <button onClick={() => setShowHelpOverlay(false)} className="text-slate-500 hover:text-white transition-colors text-xl leading-none">&times;</button>
            </div>
            <div className="space-y-1 text-sm">
              {[
                ['?', 'Toggle this help'],
                ['Esc', 'Close topmost panel/modal'],
                ['M', 'Toggle sound mute'],
                ['C', 'Toggle character sheet'],
                ['Q', 'Toggle quest tracker'],
                ['L', 'Toggle combat log'],
                ['D', 'Toggle DM sidebar (DM only)'],
                ['1', 'Narration view'],
                ['2', 'Battle map view'],
                ['3', 'Shop view (out of combat)'],
                ['4 / J', 'Session journal'],
                ['5', 'Party loot tracker'],
                ['R', 'Quick rules reference'],
                ['6', 'Encounter history log'],
                ['7', 'NPC relationship tracker'],
                ['N', 'Player notes panel'],
                ['8', 'Dice roll statistics'],
                ['B', 'Monster manual (DM only)'],
                ['—', '— Combat (your turn) —'],
                ['A', 'Quick attack selected target'],
                ['E', 'End turn / Next turn'],
                ['P', 'Use healing potion'],
                ['G', 'Dodge (+2 AC)'],
                ['H', 'Dash (double movement)'],
                ['F', 'Use class ability'],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center gap-3 py-1.5 border-b border-slate-800/50 last:border-0">
                  <kbd className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 bg-slate-800 border border-slate-700 rounded-md text-xs font-mono text-slate-300 shadow-sm">{key}</kbd>
                  <span className="text-slate-400">{desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-slate-600 text-center">Shortcuts are disabled when typing in input fields</p>
          </div>
        </div>
      )}

      {/* Rules Reference modal */}
      {showRulesRef && (
        <RulesReference onClose={() => setShowRulesRef(false)} />
      )}

      {/* Monster Manual browser modal */}
      {showMonsterBrowser && (
        <MonsterBrowser
          onSpawn={handleSpawnMonster}
          onClose={() => setShowMonsterBrowser(false)}
        />
      )}

      {/* Level-Up Choice Modal — extracted component */}
      {showLevelUpModal && selectedCharacter && hasPendingASI(selectedCharacter) && (
        <LevelUpModal
          character={selectedCharacter}
          onClose={() => setShowLevelUpModal(false)}
          onMessage={addDmMessage}
          onCombatLog={(msg) => setCombatLog((prev) => [...prev, msg])}
        />
      )}
      {/* === THE JUICE === */}
      <CritCelebration active={critActive} confetti={critConfetti} />
      <KillStreak display={killStreakDisplay} />
      <DeathSaveCinematic display={deathSaveDisplay} />
      <DeathRecap display={deathRecapDisplay} />
      <SceneTransition sceneName={sceneName} />
      <DiceTower display={diceTowerDisplay} />
      <LevelUpFanfare display={levelUpDisplay} />
      <RoundMVP display={roundMVPDisplay} />
      <SessionMilestones toast={milestoneToast} />
      <SessionSummary
        combatLog={combatLog}
        dmHistory={dmHistory}
        characters={characters}
        sessionStartTime={sessionStartTime.current}
        visible={showSessionSummary}
        onDismiss={() => setShowSessionSummary(false)}
      />
      {/* Fumble consequence banner */}
      {fumbleDisplay && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9995] animate-slide-in pointer-events-none">
          <div className={`px-5 py-2.5 rounded-xl border shadow-xl backdrop-blur-sm max-w-md text-center ${
            fumbleDisplay.severity === 'serious' ? 'border-red-600/50 bg-red-950/80' :
            fumbleDisplay.severity === 'moderate' ? 'border-orange-600/50 bg-orange-950/80' :
            'border-slate-600/50 bg-slate-900/80'
          }`}>
            <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-0.5">Natural 1</div>
            <div className="text-xs text-slate-300">{fumbleDisplay.effect}</div>
          </div>
        </div>
      )}
      {/* Performance dashboard — toggle with Ctrl+Shift+P */}
      <Suspense fallback={null}><PerfDashboard /></Suspense>
      {/* Keyboard shortcuts overlay — toggle with ? */}
      <Suspense fallback={null}><KeyboardShortcuts /></Suspense>
    </div>
  );
}
