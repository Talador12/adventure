// useGameWebSocket — handles all incoming WebSocket messages for the Game page.
// Extracted from Game.tsx to reduce component complexity.
// Manages session identity (wsPlayerId, isDM, isSpectating), chat injection,
// game state sync (units, combat, terrain, map), and late-join state exchange.

import { useCallback, useRef, useState, useEffect } from 'react';
import type { WSMessage } from './useWebSocket';
import type { Unit, Character } from '../contexts/GameContext';
import type { ChatMessage } from '../components/chat/ChatPanel';
import type { TerrainType, TokenPosition } from '../lib/mapUtils';
import type { Quest, MapPin } from '../types/game';
import type { RollInterpolationMode, RollPresentation } from '../types/roll';
import type { JournalEntry } from '../components/game/SessionJournal';
import type { LootItem } from '../components/game/LootTracker';
import { playPlayerJoin } from './useSoundFX';
import { persistChatMessage } from '../lib/chatApi';

export interface GameWebSocketDeps {
  room: string;
  /** Ref to the send function — avoids circular deps with useWebSocket */
  sendRef: React.MutableRefObject<(msg: WSMessage) => void>;
  /** Ref that suppresses rebroadcast when applying remote events */
  isRemoteEventRef: React.MutableRefObject<boolean>;
  /** Ref for BattleMap animated token movement */
  animateMoveRef: React.MutableRefObject<((unitId: string, fromCol: number, fromRow: number, toCol: number, toRow: number) => void) | null>;
  /** Ref that always tracks latest mapPositions */
  mapPositionsRef: React.MutableRefObject<TokenPosition[]>;

  // Chat state
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;

  // DM history / scene / quests
  setDmHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setSceneName: React.Dispatch<React.SetStateAction<string>>;
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;

  // Combat state setters from GameContext
  setUnits: (fn: Unit[] | ((prev: Unit[]) => Unit[])) => void;
  setInCombat: (v: boolean) => void;
  setCombatRound: (v: number) => void;
  setTurnIndex: (v: number) => void;
  setTerrain: (fn: TerrainType[][] | ((prev: TerrainType[][]) => TerrainType[][])) => void;
  setMapPositions: (fn: TokenPosition[] | ((prev: TokenPosition[]) => TokenPosition[])) => void;
  setMapImageUrl: (v: string | null) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;

  // Current state for state_request responses (latest via refs or values)
  getStateForResponse: () => {
    units: Unit[];
    inCombat: boolean;
    combatRound: number;
    turnIndex: number;
    terrain: TerrainType[][];
    mapPositions: TokenPosition[];
    mapImageUrl: string | null;
    sceneName: string;
    quests: Quest[];
    dmHistory: string[];
  };

  // Journal sync callback ref
  journalSyncRef: React.MutableRefObject<((entries: JournalEntry[]) => void) | null>;

  // Loot sync callback ref
  lootSyncRef: React.MutableRefObject<((items: LootItem[]) => void) | null>;

  // Weather sync
  setWeather?: (w: 'none' | 'rain' | 'fog' | 'snow' | 'sandstorm') => void;

  // Map pins sync
  setMapPins?: React.Dispatch<React.SetStateAction<MapPin[]>>;

  // Character context for party join
  selectedCharacterId: string | null;

  // Roll presentation callbacks (BG3-style center popup)
  onRollResult?: (roll: RollPresentation) => void;
  onRollVetoed?: (rollId: string, vetoedBy?: string) => void;
  onRollCleared?: (rollId: string, reason?: string) => void;
  onServerTimeSync?: (serverNowMs: number) => void;
  onRollInterpolationMode?: (mode: RollInterpolationMode, autoStrictRttMs?: number, autoStrictJitterMs?: number) => void;
  onLatencyUpdate?: (latency: Record<string, number>) => void;
  onPlayerStale?: (playerId: string) => void;
  onPlayerRecovered?: (playerId: string) => void;
  onVoiceSignal?: (fromId: string, fromUsername: string, signalType: string, signal: string) => void;
  onVoiceState?: (playerId: string, talking: boolean, muted: boolean) => void;
  // Ready check callbacks
  onReadyCheck?: () => void;
  onReadyResponse?: (playerId: string, playerName: string) => void;
  onMapPing?: (col: number, row: number) => void;
}

export interface GameWebSocketState {
  wsPlayerId: string | null;
  isDM: boolean;
  dmPlayerId: string | null;
  isSpectating: boolean;
  wsConnected: boolean;
  setWsConnected: (v: boolean) => void;
  handleWsMessage: (msg: WSMessage) => void;
  typingUsers: Map<string, string>; // playerId -> username
}

export function useGameWebSocket(deps: GameWebSocketDeps): GameWebSocketState {
  const {
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
    selectedCharacterId,
    onRollResult,
    onRollVetoed,
    onRollCleared,
    onServerTimeSync,
    onRollInterpolationMode,
    onLatencyUpdate,
    onPlayerStale,
    onPlayerRecovered,
    onVoiceSignal,
    onVoiceState,
  } = deps;

  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const [isDM, setIsDM] = useState(false);
  const [dmPlayerId, setDmPlayerId] = useState<string | null>(null);
  const [isSpectating, setIsSpectating] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());
  const typingTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const pendingRollChatRef = useRef<Map<string, ChatMessage>>(new Map());

  // Keep a ref to wsPlayerId so the handler callback doesn't go stale
  const wsPlayerIdRef = useRef<string | null>(null);
  useEffect(() => { wsPlayerIdRef.current = wsPlayerId; }, [wsPlayerId]);

  const handleWsMessage = useCallback(
    (msg: WSMessage) => {
      switch (msg.type) {
        case 'welcome':
          if (typeof msg.timestamp === 'number') {
            onServerTimeSync?.(msg.timestamp as number);
          }
          setWsPlayerId(msg.playerId as string);
          setIsDM((msg.isDM as boolean) ?? false);
          setIsSpectating(!!(msg.isSpectating));
          if (msg.dmPlayerId) setDmPlayerId(msg.dmPlayerId as string);
          if (msg.rollInterpolationMode === 'strict' || msg.rollInterpolationMode === 'smooth' || msg.rollInterpolationMode === 'auto') {
            onRollInterpolationMode?.(msg.rollInterpolationMode as RollInterpolationMode, msg.autoStrictRttMs as number | undefined, msg.autoStrictJitterMs as number | undefined);
          }
          // Auto-join campaign party in D1 (fire-and-forget)
          fetch(`/api/party/${encodeURIComponent(room)}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ characterId: selectedCharacterId, role: msg.isDM ? 'dm' : 'player' }),
          }).catch(() => {});
          // Late-join catch-up for any currently presenting roll.
          if (msg.activeRoll && typeof msg.activeRoll === 'object') {
            const active = msg.activeRoll as Record<string, unknown>;
            const rollId = (active.rollId as string) || crypto.randomUUID();
            const rollTotal = Number((active.total as number) ?? (active.value as number) ?? 0);
            const allRolls = (active.allRolls as number[] | undefined) || [rollTotal];
            const keptRolls = (active.keptRolls as number[] | undefined) || [rollTotal];
            pendingRollChatRef.current.set(rollId, {
              id: crypto.randomUUID(),
              type: 'roll',
              playerId: active.playerId as string,
              username: active.username as string,
              avatar: active.avatar as string | undefined,
              text: '',
              timestamp: (active.timestamp as number) || Date.now(),
              die: active.die as string,
              sides: active.sides as number,
              value: rollTotal,
              rollCount: active.count as number | undefined,
              allRolls,
              keptRolls,
              isCritical: active.isCritical as boolean,
              isFumble: active.isFumble as boolean,
              unitName: active.unitName as string | undefined,
              characterName: active.unitName as string | undefined,
              advMode: active.advMode as string | undefined,
            });
            onRollResult?.({
              rollId,
              playerId: active.playerId as string,
              username: active.username as string,
              avatar: active.avatar as string | undefined,
              unitName: active.unitName as string | undefined,
              die: active.die as string,
              sides: active.sides as number,
              count: (active.count as number) || 1,
              allRolls,
              keptRolls,
              total: rollTotal,
              advMode: active.advMode as 'advantage' | 'disadvantage' | undefined,
              isCritical: active.isCritical as boolean,
              isFumble: active.isFumble as boolean,
              dc: active.dc as number | undefined,
              bonuses: active.bonuses as { label: string; value: number }[] | undefined,
              animationMs: active.animationMs as number | undefined,
              presentationMs: active.presentationMs as number | undefined,
              timestamp: (active.timestamp as number) || Date.now(),
            });
          }
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

        case 'chat_reaction': {
          // Toggle reaction on a chat message
          const reactMsgId = msg.messageId as string;
          const reactEmoji = msg.emoji as string;
          const reactPlayerId = msg.playerId as string;
          if (reactMsgId && reactEmoji && reactPlayerId) {
            setChatMessages((prev) => prev.map((m) => {
              if (m.id !== reactMsgId) return m;
              const reactions = { ...(m.reactions || {}) };
              const ids = reactions[reactEmoji] || [];
              if (ids.includes(reactPlayerId)) {
                // Toggle off
                reactions[reactEmoji] = ids.filter((id) => id !== reactPlayerId);
                if (reactions[reactEmoji].length === 0) delete reactions[reactEmoji];
              } else {
                // Toggle on
                reactions[reactEmoji] = [...ids, reactPlayerId];
              }
              return { ...m, reactions };
            }));
          }
          break;
        }

        case 'whisper':
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'whisper',
              playerId: msg.playerId as string,
              username: msg.username as string,
              avatar: msg.avatar as string | undefined,
              text: msg.message as string,
              timestamp: msg.timestamp as number,
              targetUsername: msg.targetUsername as string | undefined,
              targetPlayerId: msg.targetPlayerId as string | undefined,
            },
          ]);
          break;

        case 'roll_result': {
          const rollId = (msg.rollId as string) || crypto.randomUUID();
          const rollTotal = (msg.total as number) ?? (msg.value as number) ?? 0;
          const allRolls = (msg.allRolls as number[] | undefined) || [rollTotal];
          const keptRolls = (msg.keptRolls as number[] | undefined) || [rollTotal];
          pendingRollChatRef.current.set(rollId, {
            id: crypto.randomUUID(),
            type: 'roll',
            playerId: msg.playerId as string,
            username: msg.username as string,
            avatar: msg.avatar as string | undefined,
            text: '',
            timestamp: msg.timestamp as number,
            die: msg.die as string,
            sides: msg.sides as number,
            value: rollTotal,
            rollCount: msg.count as number | undefined,
            allRolls,
            keptRolls,
            isCritical: msg.isCritical as boolean,
            isFumble: msg.isFumble as boolean,
            unitName: msg.unitName as string | undefined,
            characterName: msg.unitName as string | undefined,
            advMode: msg.advMode as string | undefined,
          });
          onRollResult?.({
            rollId,
            playerId: msg.playerId as string,
            username: msg.username as string,
            avatar: msg.avatar as string | undefined,
            unitName: msg.unitName as string | undefined,
            die: msg.die as string,
            sides: msg.sides as number,
            count: (msg.count as number) || 1,
            allRolls,
            keptRolls,
            total: rollTotal,
            advMode: msg.advMode as 'advantage' | 'disadvantage' | undefined,
            isCritical: msg.isCritical as boolean,
            isFumble: msg.isFumble as boolean,
            dc: msg.dc as number | undefined,
            bonuses: msg.bonuses as { label: string; value: number }[] | undefined,
            animationMs: msg.animationMs as number | undefined,
            presentationMs: msg.presentationMs as number | undefined,
            timestamp: (msg.timestamp as number) || Date.now(),
          });
          break;
        }

        case 'roll_vetoed': {
          onRollVetoed?.(msg.rollId as string, msg.vetoedBy as string | undefined);
          break;
        }

        case 'roll_cleared': {
          const rollId = msg.rollId as string;
          const reason = msg.reason as string | undefined;
          const pending = pendingRollChatRef.current.get(rollId);
          if (pending) {
            pendingRollChatRef.current.delete(rollId);
            if (reason !== 'vetoed') {
              setChatMessages((prev) => [...prev, pending]);
              if (pending.playerId === wsPlayerIdRef.current) {
                const rollCount = pending.rollCount || 1;
                const advLabel = pending.advMode ? ` [${pending.advMode}]` : '';
                persistChatMessage(room, {
                  username: pending.username,
                  type: 'roll',
                  text: `rolled ${rollCount > 1 ? rollCount : ''}${(pending.die as string)?.toUpperCase()} for ${pending.value ?? 0}${advLabel}`,
                  avatarUrl: pending.avatar,
                  metadata: { die: pending.die, sides: pending.sides, value: pending.value, isCritical: pending.isCritical, isFumble: pending.isFumble, unitName: pending.unitName, characterName: pending.unitName },
                });
              }
            } else {
              setChatMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                type: 'system',
                username: 'System',
                text: `${pending.unitName || pending.username}'s roll was vetoed by the DM`,
                timestamp: Date.now(),
              }]);
            }
          }

          onRollCleared?.(rollId, reason);
          break;
        }

        case 'roll_interpolation_mode_changed': {
          if (msg.rollInterpolationMode === 'strict' || msg.rollInterpolationMode === 'smooth' || msg.rollInterpolationMode === 'auto') {
            onRollInterpolationMode?.(msg.rollInterpolationMode as RollInterpolationMode, msg.autoStrictRttMs as number | undefined, msg.autoStrictJitterMs as number | undefined);
          }
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
          setIsDM(msg.dmPlayerId === wsPlayerIdRef.current);
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
          if (msg.playerId !== wsPlayerIdRef.current) {
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
          if (msg.playerId !== wsPlayerIdRef.current) {
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
          if (msg.playerId !== wsPlayerIdRef.current) {
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
              case 'journal_sync': {
                if (Array.isArray(eventData.entries)) {
                  deps.journalSyncRef.current?.(eventData.entries as JournalEntry[]);
                }
                break;
              }
              case 'loot_sync': {
                if (Array.isArray(eventData.items)) {
                  deps.lootSyncRef.current?.(eventData.items as LootItem[]);
                }
                break;
              }
              case 'weather_change': {
                if (typeof eventData.weather === 'string') {
                  deps.setWeather?.(eventData.weather as 'none' | 'rain' | 'fog' | 'snow' | 'sandstorm');
                }
                break;
              }
              case 'formation_apply': {
                if (Array.isArray(eventData.positions)) {
                  setMapPositions(eventData.positions as TokenPosition[]);
                }
                break;
              }
              case 'pin_sync': {
                if (Array.isArray(eventData.pins)) {
                  deps.setMapPins?.(eventData.pins as MapPin[]);
                }
                break;
              }
              case 'ready_check': {
                deps.onReadyCheck?.();
                break;
              }
              case 'ready_response': {
                deps.onReadyResponse?.(eventData.playerId as string, eventData.playerName as string);
                break;
              }
              case 'map_ping': {
                deps.onMapPing?.(eventData.col as number, eventData.row as number);
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
          const state = getStateForResponse();
          sendRef.current({
            type: 'state_response',
            targetPlayerId: msg.playerId as string,
            data: state,
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
            if (Array.isArray(stateData.mapPins)) deps.setMapPins?.(stateData.mapPins as MapPin[]);
          } finally {
            isRemoteEventRef.current = false;
          }
          break;
        }

        case 'voice_signal': {
          onVoiceSignal?.(msg.fromId as string, msg.fromUsername as string, msg.signalType as string, msg.signal as string);
          break;
        }

        case 'voice_state': {
          onVoiceState?.(msg.playerId as string, msg.talking as boolean, msg.muted as boolean);
          break;
        }

        case 'shared_note': {
          setChatMessages((prev) => [...prev, {
            id: crypto.randomUUID(),
            type: 'system' as const,
            username: String(msg.username || 'Player'),
            text: `📋 ${msg.title || 'Shared Note'}: ${String(msg.text || '').slice(0, 500)}`,
            timestamp: (msg.timestamp as number) || Date.now(),
          }]);
          break;
        }

        case 'latency_update': {
          if (msg.latency && typeof msg.latency === 'object') {
            onLatencyUpdate?.(msg.latency as Record<string, number>);
          }
          break;
        }

        case 'player_stale': {
          onPlayerStale?.(msg.playerId as string);
          break;
        }

        case 'player_recovered': {
          onPlayerRecovered?.(msg.playerId as string);
          break;
        }

        case 'typing': {
          const typerId = msg.playerId as string;
          const typerName = msg.username as string;
          setTypingUsers((prev) => {
            const next = new Map(prev);
            next.set(typerId, typerName);
            return next;
          });
          const existing = typingTimersRef.current.get(typerId);
          if (existing) clearTimeout(existing);
          typingTimersRef.current.set(typerId, setTimeout(() => {
            setTypingUsers((prev) => {
              const next = new Map(prev);
              next.delete(typerId);
              return next;
            });
            typingTimersRef.current.delete(typerId);
          }, 3000));
          break;
        }
      }
    },
    // Use refs for frequently-changing state to avoid re-creating the callback on every state change.
    // wsPlayerId is tracked via wsPlayerIdRef, and state_request uses getStateForResponse callback.
    [room, sendRef, isRemoteEventRef, animateMoveRef, mapPositionsRef, setChatMessages, setDmHistory, setSceneName, setQuests, setUnits, setInCombat, setCombatRound, setTurnIndex, setTerrain, setMapPositions, setMapImageUrl, updateCharacter, getStateForResponse, selectedCharacterId, onRollResult, onRollVetoed, onRollCleared, onServerTimeSync, onRollInterpolationMode, onLatencyUpdate, onPlayerStale, onPlayerRecovered, onVoiceSignal, onVoiceState]
  );

  return {
    wsPlayerId,
    isDM,
    dmPlayerId,
    isSpectating,
    wsConnected,
    setWsConnected,
    handleWsMessage,
    typingUsers,
  };
}
