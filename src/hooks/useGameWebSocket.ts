// useGameWebSocket — handles all incoming WebSocket messages for the Game page.
// Extracted from Game.tsx to reduce component complexity.
// Manages session identity (wsPlayerId, isDM, isSpectating), chat injection,
// game state sync (units, combat, terrain, map), and late-join state exchange.

import { useCallback, useRef, useState, useEffect } from 'react';
import type { WSMessage } from './useWebSocket';
import type { Unit, DieType, Character } from '../contexts/GameContext';
import type { ChatMessage } from '../components/chat/ChatPanel';
import type { TerrainType, TokenPosition } from '../lib/mapUtils';
import type { Quest } from '../types/game';
import type { DiceRollerHandle } from '../components/dice/DiceRoller';
import { playDiceRoll, playCritical, playFumble, playPlayerJoin } from './useSoundFX';
import { persistChatMessage } from '../lib/chatApi';

export interface GameWebSocketDeps {
  room: string;
  /** Ref to the send function — avoids circular deps with useWebSocket */
  sendRef: React.MutableRefObject<(msg: WSMessage) => void>;
  /** Ref that suppresses rebroadcast when applying remote events */
  isRemoteEventRef: React.MutableRefObject<boolean>;
  /** Ref for BattleMap animated token movement */
  animateMoveRef: React.MutableRefObject<((unitId: string, fromCol: number, fromRow: number, toCol: number, toRow: number) => void) | null>;
  /** Ref for dice roller remote roll animation */
  diceRef: React.RefObject<DiceRollerHandle | null>;
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

  // Character context for party join
  selectedCharacterId: string | null;
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
    diceRef,
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
  } = deps;

  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const [isDM, setIsDM] = useState(false);
  const [dmPlayerId, setDmPlayerId] = useState<string | null>(null);
  const [isSpectating, setIsSpectating] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());
  const typingTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Keep a ref to wsPlayerId so the handler callback doesn't go stale
  const wsPlayerIdRef = useRef<string | null>(null);
  useEffect(() => { wsPlayerIdRef.current = wsPlayerId; }, [wsPlayerId]);

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
          if (msg.playerId === wsPlayerIdRef.current) {
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
          } finally {
            isRemoteEventRef.current = false;
          }
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
    [room, sendRef, isRemoteEventRef, animateMoveRef, diceRef, mapPositionsRef, setChatMessages, setDmHistory, setSceneName, setQuests, setUnits, setInCombat, setCombatRound, setTurnIndex, setTerrain, setMapPositions, setMapImageUrl, updateCharacter, getStateForResponse, selectedCharacterId]
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
