import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
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
import { playEncounterStart, playMagicSpell, playEnemyDeath, playDiceRoll, playCritical, playFumble, isMuted, toggleMute, getVolume, setVolume, setAmbientMood, getAmbientMood, type AmbientMood } from '../hooks/useSoundFX';
import { fetchWithTimeout } from '../lib/fetchUtils';
import { loadChatHistory, persistChatMessage } from '../lib/chatApi';
import { useEnemyAI } from '../hooks/useEnemyAI';
import { useAIPlayerTurn } from '../hooks/useAIPlayerTurn';
import { useDynamicDifficulty } from '../hooks/useDynamicDifficulty';
import { useAttackIndicators } from '../hooks/useAttackIndicators';
import { useGameWebSocket } from '../hooks/useGameWebSocket';
import { useCampaignPersistence, type CampaignLoadResult } from '../hooks/useCampaignPersistence';
import type { Quest, MapPin } from '../types/game';
import type { RollPresentation } from '../types/roll';
import DMSidebar from '../components/game/DMSidebar';
import NarrationPanel from '../components/game/NarrationPanel';
import CombatToolbar from '../components/game/CombatToolbar';
import ShopView from '../components/game/ShopView';
import SessionJournal, { type JournalEntry } from '../components/game/SessionJournal';
import MonsterBrowser from '../components/game/MonsterBrowser';
import RulesReference from '../components/game/RulesReference';
import SessionTimer from '../components/game/SessionTimer';
import LootTracker, { type LootItem } from '../components/game/LootTracker';
import EncounterLog from '../components/game/EncounterLog';
import NpcTracker from '../components/game/NpcTracker';
import DiceStats from '../components/game/DiceStats';
import CombatRecap from '../components/game/CombatRecap';
import CombatMVP from '../components/game/CombatMVP';
import CampaignTimeline from '../components/game/CampaignTimeline';
import Achievements from '../components/game/Achievements';
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
  const [activeRollPopup, setActiveRollPopup] = useState<RollPresentation | null>(null);
  const [rollPopupVisible, setRollPopupVisible] = useState(false);
  const [serverTimeOffsetMs, setServerTimeOffsetMs] = useState(0);
  const [clockRttMs, setClockRttMs] = useState<number | null>(null);
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
  const [soundMuted, setSoundMuted] = useState(isMuted());
  const [soundVolume, setSoundVolume] = useState(getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [showCombatLog, setShowCombatLog] = useState(false);
  const [activeView, setActiveView] = useState<'narration' | 'map' | 'shop' | 'journal' | 'loot' | 'encounters' | 'npcs' | 'dicestats' | 'timeline' | 'achievements'>('narration');

  const [shopMessage, setShopMessage] = useState<string | null>(null);
  const [showSheet, setShowSheet] = useState(false);
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
    loadChatHistory(room).then((history) => {
      if (history.length > 0) {
        setChatMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMsgs = history.filter((m) => !existingIds.has(m.id));
          return newMsgs.length > 0 ? [...newMsgs, ...prev] : prev;
        });
      }
    });
  }, [room]);

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
    units, inCombat, combatRound, terrain, mapPositions, mapImageUrl, quests,
  }), [dmHistory, sceneName, selectedCharacterId, combatLog, units, inCombat, combatRound, terrain, mapPositions, mapImageUrl, quests]);

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
  });

  // DM tool access: DM gets full controls, non-DM gets read-only narration.
  // Offline/single-player (not connected) defaults to full access.
  // Spectators get no game controls at all.
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
      if (e.key === 'c' || e.key === 'C') { setShowSheet((s) => !s); return; }
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
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLevelUpModal, showDMSidebar, showCombatLog, showQuests, showHelpOverlay, showRulesRef, soundMuted, canUseDMTools, inCombat]);

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
  }, []);

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
        const res = await fetchWithTimeout(
          `${apiBase()}/api/dm/narrate`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              characters: buildPartyPayload(),
              context: adventureStarted ? 'The adventure is underway.' : '',
              action: action || '',
              history: dmHistory.slice(-10),
              scene: sceneName,
            }),
          },
          35_000
        );
        const data = (await res.json()) as { narration?: string; error?: string };
        if (data.narration) {
          addDmMessage(data.narration);
          // Broadcast narration to all players via WebSocket
          sendRef.current({ type: 'dm_narrate', narration: data.narration });
          // Persist DM narration to D1
          persistChatMessage(room, { username: 'Dungeon Master', type: 'dm', text: data.narration });
        } else {
          addDmMessage(data.error || 'The DM pauses, lost in thought...');
        }
      } catch {
        addDmMessage('*The DM\u2019s connection to the ethereal plane wavers...*');
      } finally {
        setDmLoading(false);
      }
    },
    [selectedCharacter, adventureStarted, dmHistory, addDmMessage, buildPartyPayload, sceneName]
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
              partySize: 1,
              difficulty: encounterDifficulty,
              context: dmHistory.length > 0 ? dmHistory[dmHistory.length - 1] : 'a dark dungeon corridor',
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
      if (currentAmbient !== 'combat') { setAmbientMood('combat'); setCurrentAmbient('combat'); }

      // Add enemy units to existing units (keep player units)
      setUnits((prev: Unit[]) => [...prev.filter((u) => u.type === 'player'), ...enemyUnits]);
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

  const { status, send } = useWebSocket({
    roomId: room,
    username: selectedCharacter?.name || currentPlayer.username,
    onMessage: handleWsMessage,
    onTimeSync: (offsetMs, rttMs) => {
      setServerTimeOffsetMs((prev) => Math.round(prev * 0.8 + offsetMs * 0.2));
      setClockRttMs(Math.round(rttMs));
    },
  });
  sendRef.current = send;
  // Track connection status for canUseDMTools (must be after hook call)
  useEffect(() => {
    setWsConnected(status === 'connected');
  }, [status]);

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
    [send, selectedUnitId, selectedUnit]
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
      if (roll.isCritical) setTimeout(playCritical, 400);
      if (roll.isFumble) setTimeout(playFumble, 400);
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
      if (isCrit) setTimeout(playCritical, 400);
      if (isFumble) setTimeout(playFumble, 400);
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
          text: `${result.notation}: ${rollText}${result.modifier ? ` ${result.modifier > 0 ? '+' : ''}${result.modifier}` : ''} = ${result.total}`,
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
      if (isCrit) setTimeout(playCritical, 400);
      if (isFumble) setTimeout(playFumble, 400);
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
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(`/lobby/${room}`)} className="text-slate-400 hover:text-white">
            &larr; Lobby
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Adventure</h1>
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
          <SessionTimer roomId={room} compact />
        </div>
        <div className="flex items-center gap-3">
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
                />
                <span className="text-[10px] text-slate-400 w-7 text-right">{Math.round(soundVolume * 100)}%</span>
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

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* DM Sidebar — collapsible left panel */}
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
          />
        )}

        {/* Left: initiative bar + game board / DM area */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-opacity duration-200 ${rollPopupVisible ? 'opacity-45' : 'opacity-100'}`}>
          {/* Initiative bar — only show when units exist */}
          {units.length > 0 && (
            <div className="bg-slate-900/50 border-b border-slate-800 shrink-0">
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
                canReorder={canUseDMTools && inCombat}
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
            </div>
          )}

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
                  <SessionJournal
                    roomId={room}
                    playerName={currentPlayer.username || 'Unknown'}
                    onBroadcast={(evt) => broadcastGameEvent(evt.type, { entries: evt.entries })}
                    syncRef={journalSyncRef}
                  />
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
                    <BattleMap
                      canUseDMTools={canUseDMTools}
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
                    {weather !== 'none' && <div className={`weather-${weather}`} />}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar: character sheet / dice / chat */}
        <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col shrink-0">
          {/* Sidebar tabs */}
          {selectedCharacter && (
            <div className="flex border-b border-slate-800 shrink-0">
              <button onClick={() => setShowSheet(false)} className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 ${!showSheet ? 'border-[#F38020] text-[#F38020]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                Dice & Chat
              </button>
              <button onClick={() => setShowSheet(true)} className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 ${showSheet ? 'border-[#F38020] text-[#F38020]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                Character
              </button>
            </div>
          )}

          {showSheet && selectedCharacter ? (
            <div className="flex-1 overflow-y-auto p-4">
              <CharacterSheet character={selectedCharacter} />
            </div>
          ) : (
            <>
              <div className="relative p-4 border-b border-slate-800 overflow-y-auto">
                <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} onRollComplete={handleRollComplete} onMacroRoll={handleMacroRoll} useServerRolls={status === 'connected'} suppressServerSpin={status === 'connected'} />
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
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                <ChatPanel messages={chatMessages} onSend={handleChatSend} onSlashRoll={handleSlashRoll} onWhisper={(target, msg) => {
                  send({ type: 'whisper', targetUsername: target, message: msg });
                }} onReaction={(messageId, emoji) => {
                  send({ type: 'chat_reaction', messageId, emoji });
                }} onTyping={() => send({ type: 'typing' })} typingUsers={Array.from(typingUsers.values())} currentPlayerId={wsPlayerId || currentPlayer.id} />
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
      />

      {/* Keyboard Shortcut Help Overlay */}
      {showHelpOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowHelpOverlay(false)}>
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
                ['8', 'Dice roll statistics'],
                ['B', 'Monster manual (DM only)'],
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
    </div>
  );
}
