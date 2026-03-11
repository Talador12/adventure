import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import InitiativeBar from '../components/combat/InitiativeBar';
import BattleMap, { type ActiveAoE } from '../components/combat/BattleMap';
import CharacterSheet from '../components/combat/CharacterSheet';
import DiceRoller, { type DiceRollerHandle, type LocalRollResult } from '../components/dice/DiceRoller';
import ChatPanel, { type ChatMessage } from '../components/chat/ChatPanel';
import { Button } from '../components/ui/button';
import { useGame, type Unit, type DieType, type Character, type StatName, type EnemyAbility, rollLoot, type Item, SHOP_ITEMS, SHOP_CATEGORIES, RARITY_COLORS, RARITY_BG, getClassSpells, getSpellSlots, type Spell, FULL_CASTERS, HALF_CASTERS, generateEnemies, rollSpellDamage, CONDITION_EFFECTS, type ConditionType, getClassAbility, randomEncounterTheme, hasPendingASI, FEATS, EXTRA_ATTACK_CLASSES, rollD20WithProne, effectiveAC, calculateEncounterBudget } from '../contexts/GameContext';
import LevelUpModal from '../components/game/LevelUpModal';
import CharacterPicker from '../components/game/CharacterPicker';
import { randomFantasyName } from '../lib/names';
import { findBestMoveToward, findOpportunityAttackers, isAdjacent, chebyshevDistance, hasLineOfSight, parseRangeFt, DEFAULT_COLS, DEFAULT_ROWS, type TerrainType, type TokenPosition } from '../lib/mapUtils';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';
import { playDiceRoll, playCritical, playFumble, playCombatHit, playCombatMiss, playEncounterStart, playTurnChange, playEnemyDeath, playPlayerJoin, playMagicSpell, playLevelUp, playHealing, playLootDrop, isMuted, toggleMute, setAmbientMood, getAmbientMood, AMBIENT_MOODS, type AmbientMood } from '../hooks/useSoundFX';
import { fetchWithTimeout } from '../lib/fetchUtils';
import { loadChatHistory, persistChatMessage } from '../lib/chatApi';
import { useEnemyAI } from '../hooks/useEnemyAI';
import type { Quest } from '../types/game';
import DMSidebar from '../components/game/DMSidebar';
import NarrationPanel from '../components/game/NarrationPanel';

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
    buyItem,
    sellItem,
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
  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const [isDM, setIsDM] = useState(false);
  const [dmPlayerId, setDmPlayerId] = useState<string | null>(null);
  const [isSpectating, setIsSpectating] = useState(false);
  // DM tool access: DM gets full controls, non-DM gets read-only narration.
  // Offline/single-player (not connected) defaults to full access.
  // Spectators get no game controls at all.
  const [wsConnected, setWsConnected] = useState(false);
  const canUseDMTools = !isSpectating && (isDM || !wsConnected);
  const canAct = !isSpectating; // players + DM can act, spectators cannot
  const diceRef = useRef<DiceRollerHandle>(null);
  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;

  // Game state — derive selectedCharacter from characters array so it stays reactive
  // to GameContext updates (grantXP, restCharacter, updateCharacter, damageUnit, etc.)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const selectedCharacter = selectedCharacterId ? (characters.find((c) => c.id === selectedCharacterId) ?? null) : null;
  const [showCharacterPicker, setShowCharacterPicker] = useState(true);
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
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [showCombatLog, setShowCombatLog] = useState(false);
  const [activeView, setActiveView] = useState<'narration' | 'map' | 'shop'>('narration');
  const [shopCategory, setShopCategory] = useState<string>('Weapons');
  const [shopMessage, setShopMessage] = useState<string | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [encounterDifficulty, setEncounterDifficulty] = useState<'easy' | 'medium' | 'hard' | 'deadly'>('medium');

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

  // Derived: is it currently the player's turn? Used to enforce turn-based action restrictions.
  const currentTurnUnit = units.find((u) => u.isCurrentTurn);
  const isPlayerTurn = !inCombat || currentTurnUnit?.type === 'player';

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

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes modals/panels in priority order (topmost first)
      if (e.key === 'Escape') {
        if (showLevelUpModal) { setShowLevelUpModal(false); return; }
        if (showDMSidebar) { setShowDMSidebar(false); return; }
        if (showCombatLog) { setShowCombatLog(false); return; }
        if (showQuests) { setShowQuests(false); return; }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLevelUpModal, showDMSidebar, showCombatLog, showQuests]);

  // Fire-and-forget server campaign sync — debounced to avoid spamming on rapid updates
  const campaignSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  useEffect(() => {
    if (!adventureStarted) return; // don't save empty campaigns
    setSaveStatus('saving');
    clearTimeout(campaignSaveTimer.current);
    campaignSaveTimer.current = setTimeout(() => {
      fetch(`${apiBase()}/api/campaign/${encodeURIComponent(room)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dmHistory,
          sceneName,
          selectedCharacterId: selectedCharacterId || null,
          combatLog,
          // Combat state — survives page refresh mid-combat
          units: inCombat ? units : null,
          inCombat,
          combatRound: inCombat ? combatRound : 0,
          turnIndex: inCombat ? units.findIndex((u) => u.isCurrentTurn) : 0,
          terrain,
          mapPositions,
          mapImageUrl,
          quests,
        }),
      }).then(() => {
        setSaveStatus('saved');
        setLastSavedAt(Date.now());
        setTimeout(() => setSaveStatus('idle'), 2000);
      }).catch(() => {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      });
    }, 2000); // debounce 2s
    return () => clearTimeout(campaignSaveTimer.current);
  }, [dmHistory, sceneName, selectedCharacterId, combatLog, room, adventureStarted, inCombat, units, combatRound, terrain, mapPositions, mapImageUrl, quests]);

  // Load campaign from server on mount — merge with localStorage (server wins for newer data)
  const campaignLoadedRef = useRef(false);
  useEffect(() => {
    if (campaignLoadedRef.current) return;
    campaignLoadedRef.current = true;
    fetch(`${apiBase()}/api/campaign/${encodeURIComponent(room)}`)
      .then((r) => (r.ok ? (r.json() as Promise<{ campaign?: Record<string, unknown> }>) : null))
      .then((data) => {
        if (data?.campaign) {
          const c = data.campaign;
          // Server history is longer — use it (otherwise keep local which may be more recent)
          const serverHistory = c.dmHistory as string[] | undefined;
          if (serverHistory && serverHistory.length > dmHistory.length) {
            setDmHistory(serverHistory);
          }
          if (c.sceneName && !sceneName) {
            setSceneName(c.sceneName as string);
          }
          // Auto-select character: prefer seat assignment from lobby, then saved campaign state
          let autoCharId: string | null = null;
          try { autoCharId = sessionStorage.getItem(`adventure:seatCharId:${room}`); } catch { /* ok */ }
          if (autoCharId && !selectedCharacterId) {
            const seatChar = characters.find((ch) => ch.id === autoCharId);
            if (seatChar) {
              handleSelectCharacter(seatChar);
              try { sessionStorage.removeItem(`adventure:seatCharId:${room}`); } catch { /* ok */ }
            }
          } else if (c.selectedCharacterId && !selectedCharacterId) {
            const found = characters.find((ch) => ch.id === c.selectedCharacterId);
            if (found) handleSelectCharacter(found);
          }
          // Restore combat state if server had an active combat session
          if (c.inCombat && Array.isArray(c.units) && (c.units as unknown[]).length > 0) {
            setUnits(c.units as Unit[]);
            setInCombat(true);
            setCombatRound((c.combatRound as number) || 1);
            setTurnIndex((c.turnIndex as number) || 0);
          }
          // Restore terrain + map positions if present
          if (c.terrain && Array.isArray(c.terrain)) {
            setTerrain(c.terrain as TerrainType[][]);
          }
          if (c.mapPositions && Array.isArray(c.mapPositions)) {
            setMapPositions(c.mapPositions as TokenPosition[]);
          }
          // Restore map background image
          if (c.mapImageUrl && typeof c.mapImageUrl === 'string') {
            setMapImageUrl(c.mapImageUrl as string);
          }
          // Restore quests
          if (c.quests && Array.isArray(c.quests)) {
            setQuests(c.quests as Quest[]);
          }
          // Restore combat log
          if (c.combatLog && Array.isArray(c.combatLog)) {
            setCombatLog(c.combatLog as string[]);
          }
        }
      })
      .catch(() => {}); // server unavailable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  // Register campaign on first adventure start
  useEffect(() => {
    if (adventureStarted && dmHistory.length === 1) {
      fetch(`${apiBase()}/api/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: room, name: `Campaign ${room.slice(0, 8)}` }),
      }).catch(() => {});
    }
  }, [adventureStarted, dmHistory.length, room]);

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

  // Handle incoming WebSocket messages
  const handleWsMessage = useCallback(
    (msg: WSMessage) => {
      switch (msg.type) {
        case 'welcome':
          setWsPlayerId(msg.playerId as string);
          setIsDM((msg.isDM as boolean) ?? false);
          setIsSpectating(!!(msg.isSpectating));
          if (msg.dmPlayerId) setDmPlayerId(msg.dmPlayerId as string);
          // Auto-join campaign party in D1 (fire-and-forget)
          fetch(`/api/party/${encodeURIComponent(room)}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ characterId: selectedCharacterId, role: msg.isDM ? 'dm' : 'player' }),
          }).catch(() => {});
          // Request game state from existing players (late join sync)
          sendRef.current({ type: 'state_request' });
          break;

        case 'chat':
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'chat',
              playerId: msg.playerId as string,
              username: msg.username as string,
              avatar: msg.avatar as string | undefined,
              text: msg.message as string,
              timestamp: msg.timestamp as number,
            },
          ]);
          break;

        case 'roll_result': {
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'roll',
              playerId: msg.playerId as string,
              username: msg.username as string,
              avatar: msg.avatar as string | undefined,
              text: '',
              timestamp: msg.timestamp as number,
              die: msg.die as string,
              sides: msg.sides as number,
              value: msg.value as number,
              isCritical: msg.isCritical as boolean,
              isFumble: msg.isFumble as boolean,
              unitName: msg.unitName as string | undefined,
              characterName: msg.unitName as string | undefined,
            },
          ]);
          // Persist roll to D1 — only the roller persists (avoid duplicates)
          if (msg.playerId === wsPlayerId) {
            persistChatMessage(room, {
              username: msg.username as string,
              type: 'roll',
              text: `rolled ${(msg.die as string)?.toUpperCase()} for ${msg.value}`,
              avatarUrl: msg.avatar as string | undefined,
              metadata: { die: msg.die, sides: msg.sides, value: msg.value, isCritical: msg.isCritical, isFumble: msg.isFumble, unitName: msg.unitName, characterName: msg.unitName },
            });
          }
          // Sound FX
          playDiceRoll();
          if (msg.isCritical) setTimeout(playCritical, 400);
          if (msg.isFumble) setTimeout(playFumble, 400);

          diceRef.current?.playRemoteRoll({
            die: msg.die as DieType,
            sides: msg.sides as number,
            value: msg.value as number,
            playerName: msg.username as string,
            unitName: msg.unitName as string | undefined,
          });
          break;
        }

        case 'player_joined':
          playPlayerJoin();
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'join',
              username: msg.username as string,
              text: `${msg.username} joined the game`,
              timestamp: msg.timestamp as number,
            },
          ]);
          break;

        case 'player_reconnected':
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'join',
              username: msg.username as string,
              text: `${msg.username} reconnected`,
              timestamp: msg.timestamp as number,
            },
          ]);
          break;

        case 'player_left':
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'leave',
              username: msg.username as string,
              text: `${msg.username} left the game`,
              timestamp: msg.timestamp as number,
            },
          ]);
          break;

        case 'dm_changed':
          setDmPlayerId(msg.dmPlayerId as string);
          setIsDM(msg.dmPlayerId === wsPlayerId);
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'system' as const,
              username: 'System',
              text: `${msg.dmUsername} is now the DM`,
              timestamp: msg.timestamp as number,
            },
          ]);
          break;

        case 'dm_narrate':
          // DM narration broadcast from another player — only add if we didn't trigger it
          if (msg.playerId !== wsPlayerId) {
            setChatMessages((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                type: 'dm',
                username: 'Dungeon Master',
                text: msg.narration as string,
                timestamp: msg.timestamp as number,
              },
            ]);
            setDmHistory((prev) => [...prev, msg.narration as string]);
          }
          break;

        case 'dm_npc':
          // NPC dialogue broadcast from another player
          if (msg.playerId !== wsPlayerId) {
            setChatMessages((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                type: 'dm',
                username: msg.npcName as string,
                text: msg.dialogue as string,
                timestamp: msg.timestamp as number,
              },
            ]);
            setDmHistory((prev) => [...prev, `${msg.npcName}: "${msg.dialogue}"`]);
          }
          break;

        case 'dm_action':
          // Another player's action broadcast — show it in chat
          if (msg.playerId !== wsPlayerId) {
            setChatMessages((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                type: 'chat',
                playerId: msg.playerId as string,
                username: (msg.characterName as string) || (msg.username as string),
                text: `*${msg.action}*`,
                timestamp: msg.timestamp as number,
              },
            ]);
          }
          break;

        case 'game_event': {
          // Apply remote game state event — set suppression flag to prevent rebroadcast
          const eventType = msg.event as string;
          const eventData = msg.data as Record<string, unknown>;
          isRemoteEventRef.current = true;
          try {
            switch (eventType) {
              case 'game_sync': {
                // Full combat state snapshot — units, combat flags
                if (Array.isArray(eventData.units)) setUnits(eventData.units as Unit[]);
                if (typeof eventData.inCombat === 'boolean') setInCombat(eventData.inCombat);
                if (typeof eventData.combatRound === 'number') setCombatRound(eventData.combatRound);
                if (typeof eventData.turnIndex === 'number') setTurnIndex(eventData.turnIndex);
                break;
              }
              case 'encounter_spawn': {
                // New encounter — units + terrain + positions + combat state
                if (Array.isArray(eventData.units)) setUnits(eventData.units as Unit[]);
                if (Array.isArray(eventData.terrain)) setTerrain(eventData.terrain as TerrainType[][]);
                if (Array.isArray(eventData.positions)) setMapPositions(eventData.positions as TokenPosition[]);
                if (typeof eventData.inCombat === 'boolean') setInCombat(eventData.inCombat);
                if (typeof eventData.combatRound === 'number') setCombatRound(eventData.combatRound);
                break;
              }
              case 'token_move': {
                // Single token position update with animation
                const unitId = eventData.unitId as string;
                const col = eventData.col as number;
                const row = eventData.row as number;
                if (unitId && typeof col === 'number' && typeof row === 'number') {
                  // Animate from current position to new position
                  const oldPos = mapPositionsRef.current?.find((p: TokenPosition) => p.unitId === unitId);
                  if (oldPos && (oldPos.col !== col || oldPos.row !== row)) {
                    animateMoveRef.current?.(unitId, oldPos.col, oldPos.row, col, row);
                  }
                  setMapPositions((prev) => prev.map((p) => (p.unitId === unitId ? { ...p, col, row } : p)));
                }
                break;
              }
              case 'terrain_update': {
                if (Array.isArray(eventData.terrain)) setTerrain(eventData.terrain as TerrainType[][]);
                break;
              }
              case 'map_positions': {
                if (Array.isArray(eventData.positions)) setMapPositions(eventData.positions as TokenPosition[]);
                break;
              }
              case 'character_update': {
                // Partial character update — visible stats only (HP, conditions, level, etc.)
                const charUpdate = eventData.character as Partial<Character> & { id: string };
                if (charUpdate?.id) {
                  updateCharacter(charUpdate.id, charUpdate);
                }
                break;
              }
              case 'scene_sync': {
                if (typeof eventData.sceneName === 'string') setSceneName(eventData.sceneName);
                break;
              }
              case 'quest_sync': {
                if (Array.isArray(eventData.quests)) setQuests(eventData.quests as Quest[]);
                break;
              }
              case 'map_image': {
                const url = eventData.mapImageUrl as string | null;
                setMapImageUrl(url ?? null);
                break;
              }
            }
          } finally {
            isRemoteEventRef.current = false;
          }
          break;
        }

        case 'state_request': {
          // Another client wants full state (late joiner). Send our current state.
          sendRef.current({
            type: 'state_response',
            targetPlayerId: msg.playerId as string,
            data: {
              units,
              inCombat,
              combatRound,
              turnIndex,
              terrain,
              mapPositions,
              mapImageUrl,
              sceneName,
              quests,
              dmHistory,
            },
          });
          break;
        }

        case 'state_response': {
          // Full state from another client — apply it all
          const stateData = msg.data as Record<string, unknown>;
          if (!stateData) break;
          isRemoteEventRef.current = true;
          try {
            if (Array.isArray(stateData.units)) setUnits(stateData.units as Unit[]);
            if (typeof stateData.inCombat === 'boolean') setInCombat(stateData.inCombat);
            if (typeof stateData.combatRound === 'number') setCombatRound(stateData.combatRound);
            if (typeof stateData.turnIndex === 'number') setTurnIndex(stateData.turnIndex);
            if (Array.isArray(stateData.terrain)) setTerrain(stateData.terrain as TerrainType[][]);
            if (Array.isArray(stateData.mapPositions)) setMapPositions(stateData.mapPositions as TokenPosition[]);
            if (typeof stateData.mapImageUrl === 'string') setMapImageUrl(stateData.mapImageUrl);
            else if (stateData.mapImageUrl === null) setMapImageUrl(null);
            if (typeof stateData.sceneName === 'string') setSceneName(stateData.sceneName);
            if (Array.isArray(stateData.quests)) setQuests(stateData.quests as Quest[]);
            if (Array.isArray(stateData.dmHistory)) setDmHistory(stateData.dmHistory as string[]);
          } finally {
            isRemoteEventRef.current = false;
          }
          break;
        }
      }
    },
    [wsPlayerId, units, inCombat, combatRound, turnIndex, terrain, mapPositions, sceneName, quests, dmHistory, setUnits, setInCombat, setCombatRound, setTurnIndex, setTerrain, setMapPositions, updateCharacter]
  );

  const { status, send } = useWebSocket({
    roomId: room,
    username: selectedCharacter?.name || currentPlayer.username,
    onMessage: handleWsMessage,
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
    (die: DieType, sides: number) => {
      send({
        type: 'roll',
        die,
        sides,
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
          text: '',
          timestamp: Date.now(),
          die: roll.die,
          sides: roll.sides,
          value: roll.value,
          isCritical: roll.isCritical,
          isFumble: roll.isFumble,
          unitName: roll.unitName,
        },
      ]);
      // Persist local roll to D1
      persistChatMessage(room, {
        username: displayUsername,
        type: 'roll',
        text: `rolled ${roll.die?.toUpperCase()} for ${roll.value}`,
        metadata: { die: roll.die, sides: roll.sides, value: roll.value, isCritical: roll.isCritical, isFumble: roll.isFumble, unitName: roll.unitName, characterName: charName || undefined },
      });
    },
    [selectedCharacter, currentPlayer, room]
  );

  const statusColor = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500';

  // Character picker — extracted component
  if (showCharacterPicker) {
    return <CharacterPicker characters={characters} room={room} onSelect={handleSelectCharacter} />;
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0">
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
        </div>
        <div className="flex items-center gap-3">
          {/* Sound toggle */}
          <button
            onClick={() => {
              toggleMute();
              setSoundMuted(!soundMuted);
            }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {soundMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M9.547 3.062A.75.75 0 0110 3.75v12.5a.75.75 0 01-1.264.546L5.203 13H3.75A.75.75 0 013 12.25v-4.5A.75.75 0 013.75 7h1.453l3.533-3.796a.75.75 0 01.811-.142zM13.78 7.22a.75.75 0 10-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 001.06 1.06L15.5 11.06l1.72 1.72a.75.75 0 101.06-1.06L16.56 10l1.72-1.72a.75.75 0 00-1.06-1.06L15.5 8.94l-1.72-1.72z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 3.75a.75.75 0 00-1.264-.546L5.203 7H3.75A.75.75 0 003 7.75v4.5a.75.75 0 00.75.75h1.453l3.533 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.06 5.5 5.5 0 010 7.78.75.75 0 001.06 1.06 7 7 0 000-9.9z" />
                <path d="M13.829 7.172a.75.75 0 00-1.06 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
              </svg>
            )}
          </button>
          {canUseDMTools && (
            <button
              onClick={() => setShowDMSidebar((s) => !s)}
              className={`text-xs px-2 py-1 rounded transition-colors font-medium ${
                showDMSidebar ? 'bg-[#F38020]/15 text-[#F38020]' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Toggle DM tools sidebar"
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
      <div className="flex-1 flex overflow-hidden">
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
          />
        )}

        {/* Left: initiative bar + game board / DM area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Initiative bar — only show when units exist */}
          {units.length > 0 && (
            <div className="bg-slate-900/50 border-b border-slate-800 shrink-0">
              <InitiativeBar entries={units} />
            </div>
          )}

          {/* Main content area */}
          <div className="flex-1 p-4 overflow-auto">
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
                <div className="flex items-center gap-2 p-3 border-b border-slate-800 flex-wrap">
                  {/* Role indicator */}
                  {wsConnected && (
                    isSpectating
                      ? <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-sky-900/40 text-sky-400 border border-sky-700/40">Spectating</span>
                      : <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${canUseDMTools ? 'bg-amber-900/40 text-amber-400 border border-amber-700/40' : 'bg-slate-800 text-slate-500 border border-slate-700/40'}`}>{canUseDMTools ? 'DM' : 'Player'}</span>
                  )}

                  {/* Save indicator */}
                  {adventureStarted && (
                    <span className={`text-[9px] px-2 py-1 rounded-md border ${
                      saveStatus === 'saving' ? 'text-yellow-400 border-yellow-700/40 bg-yellow-900/20' :
                      saveStatus === 'saved' ? 'text-emerald-400 border-emerald-700/40 bg-emerald-900/20' :
                      saveStatus === 'error' ? 'text-red-400 border-red-700/40 bg-red-900/20' :
                      'text-slate-500 border-slate-700/40 bg-slate-800/30'
                    }`}>
                      {saveStatus === 'saving' ? 'Saving...' :
                       saveStatus === 'saved' ? 'Saved' :
                       saveStatus === 'error' ? 'Save failed' :
                       lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                    </span>
                  )}

                  {/* DM-only controls: encounter, NPC, scene */}
                  {canUseDMTools && (
                    <>
                      <button onClick={handleGenerateEncounter} disabled={encounterLoading || dmLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-800/50 disabled:opacity-30 text-red-300 text-xs font-semibold rounded-lg transition-all">
                        {encounterLoading ? (
                          <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M9.944 3.143a.75.75 0 01.112 1.056l-2.4 3h2.594a.75.75 0 01.59 1.213l-3.75 4.5a.75.75 0 11-1.152-.96l2.4-3H5.744a.75.75 0 01-.59-1.213l3.75-4.5a.75.75 0 011.04-.096z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M13.944 6.143a.75.75 0 01.112 1.056l-1.2 1.5h1.394a.75.75 0 01.59 1.213l-2.25 2.7a.75.75 0 11-1.152-.96l1.2-1.5h-1.394a.75.75 0 01-.59-1.213l2.25-2.7a.75.75 0 011.04-.096z" clipRule="evenodd" />
                          </svg>
                        )}
                        Encounter
                      </button>

                      {/* Difficulty selector */}
                      <select value={encounterDifficulty} onChange={(e) => setEncounterDifficulty(e.target.value as typeof encounterDifficulty)} className="text-[10px] px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 outline-none">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="deadly">Deadly</option>
                      </select>

                      {/* NPC Talk toggle */}
                      <button
                        onClick={() => {
                          if (npcMode) {
                            setNpcMode(false);
                            setNpcDialogueHistory([]);
                          } else {
                            setNpcMode(true);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all ${npcMode ? 'bg-purple-600/40 border-purple-500/50 text-purple-200' : 'bg-purple-900/40 hover:bg-purple-900/60 border-purple-800/50 text-purple-300'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 3.976 1 5.365v2.171c0 1.388.993 2.61 2.43 2.841A41.587 41.587 0 0010 11c2.233 0 4.412-.187 6.57-.623C18.007 10.146 19 8.924 19 7.536V5.365c0-1.389-.993-2.61-2.43-2.841A41.587 41.587 0 0010 2zM1 13.694v-1.358C2.32 13.107 4.106 13.5 6 13.695v.705A4.5 4.5 0 011.5 18H1v-4.306zM14 14.4v-.705c1.894-.196 3.68-.588 5-1.36v1.359L19 18h-.5A4.5 4.5 0 0114 14.4z" clipRule="evenodd" />
                        </svg>
                        {npcMode ? 'End Talk' : 'Talk NPC'}
                      </button>

                      {/* Scene name input — compact inline */}
                      <input
                        type="text"
                        value={sceneName}
                        onChange={(e) => {
                          setSceneName(e.target.value);
                          broadcastGameEvent('scene_sync', { sceneName: e.target.value });
                        }}
                        placeholder="Scene..."
                        className="text-[10px] px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 outline-none w-24 focus:w-40 transition-all focus:ring-1 focus:ring-amber-600/50"
                      />
                    </>
                  )}

                  {/* Combat controls — show when enemies exist */}
                  {units.some((u) => u.type === 'enemy') && (
                    <>
                      {!inCombat ? (
                        <button
                          onClick={() => {
                            const sorted = rollInitiative();
                            playTurnChange();
                            setCombatLog((prev) => [...prev, 'Initiative rolled! Combat begins.']);
                            addDmMessage('Roll for initiative!');
                            broadcastCombatSync(sorted, true, 1, 0);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-900/40 hover:bg-yellow-900/60 border border-yellow-700/50 text-yellow-300 text-xs font-semibold rounded-lg transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06a.75.75 0 11-1.06 1.061L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.061-1.06l1.06-1.06a.75.75 0 011.06 0zM10 7a3 3 0 100 6 3 3 0 000-6zm-6.25 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                          </svg>
                          Roll Initiative
                        </button>
                      ) : (
                        (() => {
                          const currentUnit = units.find((u) => u.isCurrentTurn);
                          const isPlayerTurn = currentUnit?.type === 'player';
                          return (
                            <button
                              onClick={() => {
                                const msg = currentUnit ? `${currentUnit.name}'s turn ends.` : '';
                                if (msg) setCombatLog((prev) => [...prev, msg]);
                                const tr = nextTurn();
                                playTurnChange();
                                broadcastCombatSync(tr.units, true, combatRound + (tr.newRound ? 1 : 0), tr.turnIndex);
                              }}
                              className={`flex items-center gap-1.5 px-4 py-1.5 border text-xs font-bold rounded-lg transition-all ${isPlayerTurn ? 'bg-green-900/50 hover:bg-green-800/60 border-green-600/60 text-green-300 shadow-green-900/30 shadow-sm' : 'bg-slate-700/40 hover:bg-slate-700/60 border-slate-600/50 text-slate-400'}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                              </svg>
                              {isPlayerTurn ? 'End Turn' : 'Next Turn'}
                            </button>
                          );
                        })()
                      )}

                      {/* Quick attack — uses equipped weapon stats, range-aware (melee=adjacency, ranged=distance+LOS) */}
                      {inCombat &&
                        selectedUnitId &&
                        (() => {
                          const target = units.find((u) => u.id === selectedUnitId);
                          if (!target || target.type === 'player') return null;
                          // Use equipped weapon if available
                          const weapon = selectedCharacter?.equipment?.weapon;
                          const weaponDie = weapon?.damageDie || '1d4'; // unarmed = 1d4
                          const weaponAtkBonus = weapon?.attackBonus || 0;
                          const weaponDmgBonus = weapon?.damageBonus || 0;
                          const weaponIsRanged = weapon?.isRanged || false;
                          const weaponRange = weapon?.range || 1; // default 1 = melee adjacency
                          // Ranged weapons use DEX, melee uses STR
                          const statMod = selectedCharacter ? Math.floor(((weaponIsRanged ? selectedCharacter.stats.DEX : selectedCharacter.stats.STR) - 10) / 2) : 0;
                          // Player condition modifiers
                          const playerUnit = selectedCharacter ? units.find((u) => u.characterId === selectedCharacter.id) : null;
                          const condAtkMod = (playerUnit?.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
                          // Range + LOS check
                          const attackerPos = playerUnit ? mapPositions.find((p) => p.unitId === playerUnit.id) : null;
                          const targetPos = mapPositions.find((p) => p.unitId === target.id);
                          let inRange = true;
                          let rangeTooltip: string | undefined;
                          if (attackerPos && targetPos) {
                            if (weaponIsRanged) {
                              const dist = chebyshevDistance(attackerPos.col, attackerPos.row, targetPos.col, targetPos.row);
                              const los = terrain.length > 0 ? hasLineOfSight(terrain, attackerPos.col, attackerPos.row, targetPos.col, targetPos.row) : true;
                              if (dist > weaponRange) {
                                inRange = false;
                                rangeTooltip = `Out of range (${dist * 5}ft / ${weaponRange * 5}ft)`;
                              } else if (!los) {
                                inRange = false;
                                rangeTooltip = 'No line of sight';
                              }
                            } else {
                              inRange = isAdjacent(attackerPos.col, attackerPos.row, targetPos.col, targetPos.row);
                              if (!inRange) rangeTooltip = 'Too far — move adjacent to attack';
                            }
                          }
                          return (
                            <button
                              disabled={!isPlayerTurn || !inRange}
                              title={!isPlayerTurn ? 'Wait for your turn' : rangeTooltip}
                              onClick={() => {
                                // Extra Attack: martial classes at level 5+ get 2 attacks
                                const hasExtraAttack = selectedCharacter && EXTRA_ATTACK_CLASSES.includes(selectedCharacter.class) && selectedCharacter.level >= 5;
                                const numAttacks = hasExtraAttack ? 2 : 1;
                                // Feat bonuses
                                const featDmgBonus = (selectedCharacter?.feats || []).reduce((sum, fid) => {
                                  const f = FEATS.find((ft) => ft.id === fid);
                                  return sum + (f?.damageBonus || 0);
                                }, 0);
                                const featAtkBonus = (selectedCharacter?.feats || []).reduce((sum, fid) => {
                                  const f = FEATS.find((ft) => ft.id === fid);
                                  return sum + (f?.attackBonus || 0);
                                }, 0);

                                const targetAC = effectiveAC(target.ac, target.conditions || []);
                                const isMeleeAttack = !weaponIsRanged;
                                let totalDamageDealt = 0;
                                for (let atk = 0; atk < numAttacks; atk++) {
                                  const { roll: attackRoll, hadAdvantage, hadDisadvantage } = rollD20WithProne(playerUnit?.conditions || [], target.conditions || [], isMeleeAttack);
                                  const totalAttack = attackRoll + statMod + weaponAtkBonus + condAtkMod + featAtkBonus;
                                  const isHit = attackRoll === 20 || totalAttack >= targetAC;
                                  const isCrit = attackRoll === 20;
                                  const atkLabel = `${attackRoll}+${statMod}${weaponAtkBonus ? `+${weaponAtkBonus}` : ''}${featAtkBonus ? `+${featAtkBonus}` : ''}=${totalAttack}`;
                                  const atkPrefix = numAttacks > 1 ? `[Attack ${atk + 1}] ` : '';
                                  const verb = weaponIsRanged ? 'shoots' : 'strikes';
                                  const advTag = hadAdvantage ? ' [adv]' : hadDisadvantage ? ' [disadv]' : '';

                                  if (isHit) {
                                    const baseDmg = rollSpellDamage(weaponDie);
                                    const finalDmg = Math.max(1, isCrit ? baseDmg * 2 + statMod + weaponDmgBonus + featDmgBonus : baseDmg + statMod + weaponDmgBonus + featDmgBonus);
                                    totalDamageDealt += finalDmg;
                                    damageUnit(target.id, finalDmg);
                                    playCombatHit();
                                    if (isCrit) playCritical();
                                    const logMsg = isCrit ? `${atkPrefix}CRITICAL HIT! ${selectedCharacter?.name || 'You'} ${verb} ${target.name} for ${finalDmg} damage! (${atkLabel} vs AC ${targetAC})${advTag}` : `${atkPrefix}${selectedCharacter?.name || 'You'} ${verb} ${target.name} for ${finalDmg} damage! (${atkLabel} vs AC ${targetAC})${advTag}`;
                                    setCombatLog((prev) => [...prev, logMsg]);
                                    addDmMessage(logMsg);
                                  } else {
                                    playCombatMiss();
                                    const missMsg = `${atkPrefix}${selectedCharacter?.name || 'You'} misses ${target.name}! (${atkLabel} vs AC ${targetAC})${advTag}`;
                                    setCombatLog((prev) => [...prev, missMsg]);
                                    addDmMessage(missMsg);
                                  }
                                }
                                // Check for enemy death after all attacks
                                if (target.hp - totalDamageDealt <= 0) {
                                  playEnemyDeath();
                                  const deathMsg = `${target.name} falls!`;
                                  setCombatLog((prev) => [...prev, deathMsg]);
                                  addDmMessage(deathMsg);
                                }
                                // Drain any concentration break messages
                                setTimeout(drainConcentrationMessages, 0);
                                // Broadcast combat state after React processes the batch
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-900/40 hover:bg-orange-900/60 border border-orange-700/50 text-orange-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              {weapon ? `${weaponIsRanged ? 'Shoot' : 'Attack'} (${weapon.name})` : 'Unarmed Strike'}
                              {selectedCharacter && EXTRA_ATTACK_CLASSES.includes(selectedCharacter.class) && selectedCharacter.level >= 5 && <span className="text-[9px] ml-1 opacity-70">x2</span>}
                            </button>
                          );
                        })()}
                      {/* Cast Spell — for casters in combat or out, with range + LOS enforcement */}
                      {selectedCharacter &&
                        [...FULL_CASTERS, ...HALF_CASTERS].includes(selectedCharacter.class) &&
                        (() => {
                          const spells = getClassSpells(selectedCharacter.class, selectedCharacter.level);
                          const slots = getSpellSlots(selectedCharacter.class, selectedCharacter.level);
                          const used = selectedCharacter.spellSlotsUsed || {};
                          if (spells.length === 0) return null;
                          const target = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
                          const enemyTarget = target && target.type === 'enemy' ? target : null;
                          // Compute caster + target positions for range checks
                          const casterUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          const casterPos = casterUnit ? mapPositions.find((p) => p.unitId === casterUnit.id) : null;
                          const spellTargetPos = enemyTarget ? mapPositions.find((p) => p.unitId === enemyTarget.id) : null;
                          return (
                            <div className="relative group">
                              <button disabled={!isPlayerTurn} title={!isPlayerTurn ? 'Wait for your turn' : undefined} className={`flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold rounded-lg transition-all ${!isPlayerTurn ? 'opacity-30 cursor-not-allowed' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                  <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684z" />
                                </svg>
                                Cast Spell
                              </button>
                              {/* Dropdown spell list */}
                              <div className="absolute left-0 top-full mt-1 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 hidden group-hover:block max-h-72 overflow-y-auto">
                                {/* Slot summary */}
                                <div className="px-3 py-2 border-b border-slate-700 text-[9px] text-slate-400">
                                  {Object.keys(slots).length > 0
                                    ? Object.entries(slots).map(([lvl, max]) => {
                                        const usedCount = used[Number(lvl)] || 0;
                                        return (
                                          <span key={lvl} className="mr-2">
                                            Lv{lvl}: {max - usedCount}/{max}
                                          </span>
                                        );
                                      })
                                    : 'Cantrips only'}
                                </div>
                                {spells.map((spell) => {
                                  const slotsAvail = spell.level === 0 ? Infinity : (slots[spell.level] || 0) - (used[spell.level] || 0);
                                  // AoE spells target a location, not a unit — skip range/LOS checks (handled during placement)
                                  const isAoE = !!spell.aoe;
                                  // Range + LOS check for targeted spells (damage or condition spells that need an enemy)
                                  const spellRangeCells = parseRangeFt(spell.range);
                                  const needsTarget = !isAoE && !!(spell.damage || spell.appliesCondition) && spell.range.toLowerCase() !== 'self';
                                  let outOfRange = false;
                                  let noLos = false;
                                  if (needsTarget && enemyTarget && casterPos && spellTargetPos && spellRangeCells > 0) {
                                    const dist = chebyshevDistance(casterPos.col, casterPos.row, spellTargetPos.col, spellTargetPos.row);
                                    if (dist > spellRangeCells) outOfRange = true;
                                    else if (terrain.length > 0 && !hasLineOfSight(terrain, casterPos.col, casterPos.row, spellTargetPos.col, spellTargetPos.row)) noLos = true;
                                  }
                                  const disabled = slotsAvail <= 0 || outOfRange || noLos;
                                  const rangeHint = outOfRange ? ' (out of range)' : noLos ? ' (no line of sight)' : '';
                                  return (
                                    <button
                                      key={spell.id}
                                      disabled={disabled}
                                      title={outOfRange ? `Out of range (${spell.range})` : noLos ? 'No line of sight' : undefined}
                                      onClick={() => {
                                        // AoE spells: enter targeting mode on the battle map
                                        if (spell.aoe && selectedCharacter) {
                                          const casterUnit = units.find((u) => u.characterId === selectedCharacter.id);
                                          const casterMapPos = casterUnit ? mapPositions.find((p) => p.unitId === casterUnit.id) : undefined;
                                          setActiveAoE({
                                            shape: spell.aoe.shape,
                                            radiusCells: spell.aoe.radiusCells,
                                            color: spell.aoe.color,
                                            origin: casterMapPos ? { col: casterMapPos.col, row: casterMapPos.row } : { col: 0, row: 0 },
                                            casterPos: casterMapPos ? { col: casterMapPos.col, row: casterMapPos.row } : undefined,
                                          });
                                          setPendingAoESpell({ spell, charId: selectedCharacter.id });
                                          setActiveView('map'); // switch to map so player can place the AoE
                                          return;
                                        }
                                        const result = castSpell(selectedCharacter.id, spell.id, enemyTarget?.id);
                                        if (result.success) {
                                          playMagicSpell();
                                          setCombatLog((prev) => [...prev, result.message]);
                                          addDmMessage(result.message);
                                          if (spell.damage && enemyTarget && enemyTarget.hp <= 0) {
                                            playEnemyDeath();
                                            addDmMessage(`${enemyTarget.name} falls!`);
                                          }
                                          if (spell.healAmount) playHealing();
                                          setTimeout(broadcastCombatSyncLatest, 50);
                                        } else {
                                          setShopMessage(result.message);
                                          setTimeout(() => setShopMessage(null), 2500);
                                        }
                                      }}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-700/50 transition-colors ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className={`text-xs font-semibold ${spell.level === 0 ? 'text-slate-300' : 'text-purple-300'}`}>
                                          {spell.name}
                                          {rangeHint}
                                        </span>
                                         <span className="flex items-center gap-1">
                                          {spell.aoe && <span className="text-[8px] px-1 py-0 rounded bg-orange-900/50 text-orange-300 font-bold uppercase">AoE</span>}
                                          <span className="text-[9px] text-slate-500">{spell.level === 0 ? 'Cantrip' : `Lv${spell.level}`}</span>
                                        </span>
                                      </div>
                                      <div className="text-[9px] text-slate-500 truncate">
                                        {spell.damage ? `${spell.damage} dmg` : spell.healAmount ? `+${spell.healAmount} HP` : spell.description.slice(0, 50)} <span className="text-slate-600">{spell.aoe ? `${spell.aoe.shape} ${spell.aoe.radiusCells * 5}ft` : spell.range}</span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                      {/* Class ability — unique per class, 1/rest */}
                      {selectedCharacter &&
                        (() => {
                          const ability = getClassAbility(selectedCharacter.class);
                          if (!ability) return null;
                          const target = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
                          const enemyTarget = target && target.type === 'enemy' ? target : null;
                          const isUsed = selectedCharacter.classAbilityUsed;
                          const needsTarget = ability.type === 'attack' || (ability.type === 'buff' && !ability.selfOnly);
                          const colorMap: Record<string, string> = {
                            red: 'bg-red-900/40 hover:bg-red-900/60 border-red-700/50 text-red-300',
                            slate: 'bg-slate-700/40 hover:bg-slate-700/60 border-slate-600/50 text-slate-300',
                            yellow: 'bg-yellow-900/40 hover:bg-yellow-900/60 border-yellow-700/50 text-yellow-300',
                            green: 'bg-green-900/40 hover:bg-green-900/60 border-green-700/50 text-green-300',
                            cyan: 'bg-cyan-900/40 hover:bg-cyan-900/60 border-cyan-700/50 text-cyan-300',
                            pink: 'bg-pink-900/40 hover:bg-pink-900/60 border-pink-700/50 text-pink-300',
                            fuchsia: 'bg-fuchsia-900/40 hover:bg-fuchsia-900/60 border-fuchsia-700/50 text-fuchsia-300',
                            blue: 'bg-blue-900/40 hover:bg-blue-900/60 border-blue-700/50 text-blue-300',
                            amber: 'bg-amber-900/40 hover:bg-amber-900/60 border-amber-700/50 text-amber-300',
                          };
                          const colors = colorMap[ability.color] || colorMap.slate;
                          return (
                            <button
                              disabled={isUsed || (needsTarget && !enemyTarget) || !isPlayerTurn}
                              onClick={() => {
                                const result = useClassAbility(selectedCharacter.id, enemyTarget?.id);
                                if (result.success) {
                                  setCombatLog((prev) => [...prev, result.message]);
                                  addDmMessage(result.message);
                                  if (ability.type === 'attack' && enemyTarget && enemyTarget.hp <= 0) {
                                    playEnemyDeath();
                                    addDmMessage(`${enemyTarget.name} falls!`);
                                  }
                                  if (ability.type === 'heal') playHealing();
                                  if (ability.type === 'attack') playCombatHit();
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                } else {
                                  setShopMessage(result.message);
                                  setTimeout(() => setShopMessage(null), 2500);
                                }
                              }}
                              title={!isPlayerTurn ? 'Wait for your turn' : `${ability.description} (Resets on ${ability.resetsOn} rest)`}
                              className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all disabled:opacity-30 ${colors}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                              </svg>
                              {ability.name}
                              {isUsed ? ' (Used)' : ''}
                            </button>
                          );
                        })()}

                      {/* Dodge action — +2 AC until next turn */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          const isDodging = playerUnit.conditions?.some((c) => c.type === 'dodging');
                          return (
                            <button
                              disabled={!!isDodging || !isPlayerTurn}
                              title={!isPlayerTurn ? 'Wait for your turn' : undefined}
                              onClick={() => {
                                applyCondition(playerUnit.id, { type: 'dodging', duration: 1, source: 'Dodge' });
                                const msg = `${selectedCharacter.name} takes the Dodge action! (+2 AC until next turn)`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-900/40 hover:bg-sky-900/60 border border-sky-700/50 text-sky-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                              </svg>
                              Dodge
                            </button>
                          );
                        })()}

                      {/* Dash action — doubles remaining movement for the turn */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          const hasDashed = (playerUnit.movementUsed || 0) < 0; // sentinel: negative means dashed
                          return (
                            <button
                              disabled={!isPlayerTurn || hasDashed}
                              title={!isPlayerTurn ? 'Wait for your turn' : hasDashed ? 'Already dashed this turn' : 'Double your remaining movement this turn'}
                              onClick={() => {
                                // Grant extra movement equal to speed (D&D 5e Dash = double movement)
                                setUnits((prev: Unit[]) => prev.map((u) => (u.id === playerUnit.id ? { ...u, movementUsed: Math.max(0, u.movementUsed) - u.speed } : u)));
                                const extraFt = (playerUnit.speed || 6) * 5;
                                const msg = `${selectedCharacter.name} takes the Dash action! (+${extraFt}ft movement this turn)`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-900/40 hover:bg-teal-900/60 border border-teal-700/50 text-teal-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-4.158a.75.75 0 011.08-1.04l5.25 5.5a.75.75 0 010 1.04l-5.25 5.5a.75.75 0 11-1.08-1.04l3.96-4.158H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                              </svg>
                              Dash
                            </button>
                          );
                        })()}

                      {/* Disengage action — prevents opportunity attacks this turn */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          return (
                            <button
                              disabled={!isPlayerTurn || playerUnit.disengaged}
                              title={!isPlayerTurn ? 'Wait for your turn' : playerUnit.disengaged ? 'Already disengaged' : 'Move without triggering opportunity attacks'}
                              onClick={() => {
                                setUnits((prev: Unit[]) => prev.map((u) => (u.id === playerUnit.id ? { ...u, disengaged: true } : u)));
                                const msg = `${selectedCharacter.name} takes the Disengage action! (No opportunity attacks this turn)`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-900/40 hover:bg-violet-900/60 border border-violet-700/50 text-violet-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                              </svg>
                              Disengage
                            </button>
                          );
                        })()}

                      {/* End Combat button */}
                      {inCombat && (
                        <button
                          onClick={async () => {
                            // Count defeated enemies — use CR-based XP from unit stat block
                            const deadEnemies = units.filter((u) => u.type === 'enemy' && u.hp <= 0);
                            const totalXP = deadEnemies.reduce((sum, e) => sum + (e.xpValue || 50 * (selectedCharacter?.level || 1)), 0);
                            const goldReward = deadEnemies.reduce((sum, e) => sum + Math.floor((e.cr || 0.25) * 30) + Math.floor(Math.random() * 20), 0);

                            setInCombat(false);
                            // Remove dead enemies, reset initiative and conditions
                            setUnits((prev: Unit[]) => prev.filter((u) => u.type === 'player' || u.hp > 0).map((u) => ({ ...u, isCurrentTurn: false, initiative: -1, conditions: [] })));

                            // Award XP and gold to the selected character
                            if (selectedCharacter && totalXP > 0) {
                              const { leveledUp, newLevel } = grantXP(selectedCharacter.id, totalXP);
                              updateCharacter(selectedCharacter.id, { gold: (selectedCharacter.gold || 0) + goldReward });

                              const rewardMsg = `Battle won! Earned ${totalXP} XP and ${goldReward} gold.`;
                              addDmMessage(rewardMsg);

                              if (leveledUp) {
                                playLevelUp();
                                addDmMessage(`LEVEL UP! ${selectedCharacter.name} is now level ${newLevel}!`);
                                // Check if this level grants an ASI/feat choice
                                const updatedChar = characters.find((c) => c.id === selectedCharacter.id);
                                if (updatedChar && hasPendingASI({ ...updatedChar, level: newLevel })) {
                                  setTimeout(() => setShowLevelUpModal(true), 1500); // show after a beat
                                }
                              }

                              // Roll for loot drops
                              const loot = rollLoot(deadEnemies.length, selectedCharacter.level);
                              if (loot.length > 0) {
                                playLootDrop();
                                for (const item of loot) addItem(selectedCharacter.id, item);
                                const lootNames = loot.map((i) => i.name).join(', ');
                                addDmMessage(`Loot found: ${lootNames}`);
                              }
                            } else {
                              addDmMessage('The battle ends. You catch your breath.');
                            }

                            // Broadcast combat end to all players
                            setTimeout(broadcastCombatSyncLatest, 100);

                            // Ask the DM to narrate the aftermath
                            const lootContext = selectedCharacter ? ` The party found some items among the remains.` : '';
                            callDmNarrate(`The combat has ended. ${deadEnemies.length} enemies were defeated.${lootContext} Narrate the aftermath — what do the characters find? Any clues or consequences?`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-300 text-xs font-semibold rounded-lg transition-all"
                        >
                          End Combat
                        </button>
                      )}
                    </>
                  )}

                  {/* Level Up indicator — show when character has pending ASI/feat choice */}
                  {selectedCharacter && hasPendingASI(selectedCharacter) && (
                    <button onClick={() => setShowLevelUpModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800/50 hover:bg-amber-700/60 border border-amber-500/60 text-amber-200 text-xs font-bold rounded-lg transition-all animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                      </svg>
                      Level Up!
                    </button>
                  )}

                  {/* Rest buttons — show when not in combat and character selected */}
                  {selectedCharacter && !inCombat && (
                    <>
                      <button
                        onClick={() => {
                          restCharacter(selectedCharacter.id, 'short');
                          playHealing();
                          addDmMessage(`${selectedCharacter.name} takes a short rest, tending wounds and catching their breath.`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-900/40 hover:bg-sky-900/60 border border-sky-800/50 text-sky-300 text-xs font-semibold rounded-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                        Short Rest
                      </button>
                      <button
                        onClick={() => {
                          restCharacter(selectedCharacter.id, 'long');
                          playHealing();
                          addDmMessage(`${selectedCharacter.name} settles in for a long rest. HP fully restored.`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900/40 hover:bg-indigo-900/60 border border-indigo-800/50 text-indigo-300 text-xs font-semibold rounded-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                        </svg>
                        Long Rest
                      </button>
                    </>
                  )}

                  {/* Use Potion button — show when character has healing potions and is hurt */}
                  {selectedCharacter &&
                    selectedCharacter.hp < selectedCharacter.maxHp &&
                    (() => {
                      const potions = (selectedCharacter.inventory || []).filter((i: Item) => i.type === 'potion' && i.healAmount);
                      if (potions.length === 0) return null;
                      const potion = potions[0]; // use first available potion
                      return (
                        <button
                          onClick={() => {
                            const { message } = useItem(selectedCharacter.id, potion.id);
                            if (message) addDmMessage(message);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 text-xs font-semibold rounded-lg transition-all"
                          title={`${potion.name} — restores ${potion.healAmount} HP`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                          </svg>
                          {potion.name}
                          {potion.quantity && potion.quantity > 1 ? ` (${potion.quantity})` : ''}
                        </button>
                      );
                    })()}

                  {/* Clear history button */}
                  {dmHistory.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm('Clear all narration history for this campaign?')) {
                          setDmHistory([]);
                          setCombatLog([]);
                        }
                      }}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-slate-600 hover:text-red-400 text-[10px] transition-colors"
                      title="Clear narration history"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5z" clipRule="evenodd" />
                      </svg>
                      Clear
                    </button>
                  )}

                  <div className="flex-1" />

                  {/* Status indicators */}
                  <span className="text-[10px] text-slate-600">
                    {dmHistory.length} narration{dmHistory.length !== 1 ? 's' : ''}
                    {inCombat ? ` | Round ${combatRound}` : ''}
                    {selectedCharacter ? ` | ${selectedCharacter.hp}/${selectedCharacter.maxHp} HP | ${selectedCharacter.gold || 0}g` : ''}
                  </span>
                </div>

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
                  /* Shop view */
                  <div className="flex-1 overflow-y-auto">
                    {selectedCharacter ? (
                      <div className="p-4 space-y-4">
                        {/* Shop header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-yellow-400">Merchant&apos;s Wares</h3>
                            <p className="text-[10px] text-slate-500">Buy gear and sell unwanted items</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-black text-yellow-400">{selectedCharacter.gold}g</div>
                            <div className="text-[9px] text-slate-500">Your gold</div>
                          </div>
                        </div>

                        {/* Shop message toast */}
                        {shopMessage && <div className="text-xs text-center py-1.5 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 animate-pulse">{shopMessage}</div>}

                        {/* Category tabs */}
                        <div className="flex gap-1">
                          {SHOP_CATEGORIES.map((cat) => (
                            <button key={cat} onClick={() => setShopCategory(cat)} className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-all ${shopCategory === cat ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'}`}>
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Items for sale */}
                        <div className="space-y-1.5">
                          {SHOP_ITEMS.filter((i) => i.category === shopCategory).map((shopItem, idx) => {
                            const canAfford = selectedCharacter.gold >= shopItem.value;
                            return (
                              <div key={idx} className={`flex items-center gap-2 rounded-lg border ${RARITY_BG[shopItem.rarity]} bg-slate-800/30 px-3 py-2`}>
                                <div className="flex-1 min-w-0">
                                  <div className={`text-xs font-semibold ${RARITY_COLORS[shopItem.rarity]}`}>{shopItem.name}</div>
                                  <div className="text-[9px] text-slate-500">{shopItem.description}</div>
                                </div>
                                <div className="text-xs font-bold text-yellow-400 shrink-0">{shopItem.value}g</div>
                                <button
                                  onClick={() => {
                                    const { category: _, ...item } = shopItem;
                                    const result = buyItem(selectedCharacter.id, item);
                                    setShopMessage(result.message);
                                    setTimeout(() => setShopMessage(null), 2500);
                                  }}
                                  disabled={!canAfford}
                                  className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-yellow-900/30 border border-yellow-700/40 text-yellow-400 hover:bg-yellow-900/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                                >
                                  Buy
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {/* Sell section */}
                        <div className="border-t border-slate-800 pt-4">
                          <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Sell Items (50% value)</h4>
                          {(selectedCharacter.inventory || []).length === 0 ? (
                            <div className="text-[10px] text-slate-600 italic text-center py-2">No items to sell</div>
                          ) : (
                            <div className="space-y-1">
                              {(selectedCharacter.inventory || []).map((item) => {
                                const sellPrice = Math.max(1, Math.floor(item.value / 2));
                                return (
                                  <div key={item.id} className="flex items-center gap-2 rounded-lg bg-slate-800/30 border border-slate-700/50 px-3 py-1.5">
                                    <div className="flex-1 min-w-0">
                                      <span className={`text-xs font-semibold ${RARITY_COLORS[item.rarity]}`}>{item.name}</span>
                                      {item.quantity && item.quantity > 1 && <span className="text-slate-500 text-xs ml-1">×{item.quantity}</span>}
                                    </div>
                                    <div className="text-xs text-yellow-600 shrink-0">+{sellPrice}g</div>
                                    <button
                                      onClick={() => {
                                        const result = sellItem(selectedCharacter.id, item.id);
                                        setShopMessage(result.message);
                                        setTimeout(() => setShopMessage(null), 2500);
                                      }}
                                      className="px-2 py-0.5 text-[10px] font-semibold rounded-lg text-red-400 hover:bg-red-900/30 border border-red-800/30 transition-all shrink-0"
                                    >
                                      Sell
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-600 text-sm">Select a character to shop</div>
                    )}
                  </div>
                ) : (
                  /* Battle Map view */
                  <BattleMap
                    canUseDMTools={canUseDMTools}
                    onTokenMove={(unitId, col, row) => broadcastGameEvent('token_move', { unitId, col, row })}
                    onTerrainChange={(t) => broadcastGameEvent('terrain_update', { terrain: t })}
                    onMapImageChange={(url) => broadcastGameEvent('map_image', { mapImageUrl: url })}
                    onOpportunityAttack={(attackerName, targetName, damage, hit) => {
                      const msg = hit ? `Opportunity Attack! ${attackerName} strikes ${targetName} for ${damage} damage as they flee!` : `Opportunity Attack! ${attackerName} swings at ${targetName} but misses!`;
                      setCombatLog((prev) => [...prev, msg]);
                      addDmMessage(msg);
                      setTimeout(broadcastCombatSyncLatest, 50);
                    }}
                    animateMoveRef={animateMoveRef}
                    activeAoE={activeAoE}
                    onAoEConfirm={(affectedCells) => {
                      if (!pendingAoESpell) { setActiveAoE(null); return; }
                      const { spell, charId } = pendingAoESpell;
                      // Cast the spell (consumes slot, handles concentration)
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
                      // Find all units standing in affected cells
                      const affectedSet = new Set(affectedCells.map((c) => `${c.col},${c.row}`));
                      const hitUnits = units.filter((u) => {
                        const pos = mapPositions.find((p) => p.unitId === u.id);
                        return pos && affectedSet.has(`${pos.col},${pos.row}`);
                      });
                      // Only damage enemies (not friendly units) for offensive AoE
                      const targets = spell.damage ? hitUnits.filter((u) => !u.characterId) : hitUnits;
                      const messages: string[] = [];
                      if (targets.length === 0) {
                        messages.push(`${casterName} casts ${spell.name} but hits no targets!`);
                      } else {
                        // Spell save DC
                        let spellDC = 13;
                        if (char) {
                          const castingStatMap: Record<string, StatName> = { Wizard: 'INT', Sorcerer: 'CHA', Cleric: 'WIS', Druid: 'WIS', Bard: 'CHA', Warlock: 'CHA', Paladin: 'CHA', Ranger: 'WIS' };
                          const castingStat = castingStatMap[char.class] || 'INT';
                          const castMod = Math.floor((char.stats[castingStat] - 10) / 2);
                          const profBonus = Math.ceil(char.level / 4) + 1;
                          spellDC = 8 + profBonus + castMod;
                        }
                        for (const target of targets) {
                          // Each target rolls a save
                          const saveRoll = Math.floor(Math.random() * 20) + 1;
                          const targetSaveMod = spell.saveStat === 'DEX' ? target.dexMod || 0 : 0;
                          const condSaveMod = (target.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.saveMod || 0), 0);
                          const saved = (saveRoll + targetSaveMod + condSaveMod) >= spellDC;
                          if (spell.damage) {
                            let dmg = rollSpellDamage(spell.damage);
                            if (saved) dmg = Math.floor(dmg / 2);
                            damageUnit(target.id, dmg);
                            messages.push(saved
                              ? `${target.name} saves — ${dmg} damage (half).`
                              : `${target.name} takes ${dmg} damage!`);
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
                    }}
                    onAoECancel={() => {
                      setActiveAoE(null);
                      setPendingAoESpell(null);
                    }}
                  />
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
              <div className="p-4 border-b border-slate-800 overflow-y-auto">
                <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} onRollComplete={handleRollComplete} useServerRolls={status === 'connected'} />
              </div>
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                <ChatPanel messages={chatMessages} onSend={handleChatSend} currentPlayerId={wsPlayerId || currentPlayer.id} />
              </div>
            </>
          )}
        </div>
      </div>

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
