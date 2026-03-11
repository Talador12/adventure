// useCampaignPersistence — handles campaign save/load/register to server.
// Extracted from Game.tsx to reduce component complexity.
// Debounced auto-save (2s), server load on mount with localStorage merge,
// campaign registration on first adventure start.

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Unit } from '../contexts/GameContext';
import type { TerrainType, TokenPosition } from '../lib/mapUtils';
import type { Quest } from '../types/game';
import type { Character } from '../contexts/GameContext';

function apiBase(): string {
  return '';
}

export interface CampaignState {
  dmHistory: string[];
  sceneName: string;
  selectedCharacterId: string | null;
  combatLog: string[];
  units: Unit[];
  inCombat: boolean;
  combatRound: number;
  terrain: TerrainType[][];
  mapPositions: TokenPosition[];
  mapImageUrl: string | null;
  quests: Quest[];
}

export interface CampaignLoadResult {
  dmHistory?: string[];
  sceneName?: string;
  selectedCharacterId?: string;
  combatLog?: string[];
  units?: Unit[];
  inCombat?: boolean;
  combatRound?: number;
  turnIndex?: number;
  terrain?: TerrainType[][];
  mapPositions?: TokenPosition[];
  mapImageUrl?: string;
  quests?: Quest[];
}

export interface UseCampaignPersistenceDeps {
  room: string;
  adventureStarted: boolean;
  /** Current state to save — read from a callback to avoid stale closures */
  getState: () => CampaignState;
  /** Called when campaign data is loaded from the server */
  onLoad: (data: CampaignLoadResult) => void;
  /** Called to auto-select a character from lobby seat or server save */
  onAutoSelectCharacter: (charId: string) => void;
  /** Current characters list for finding auto-select targets */
  characters: Character[];
  /** Current selectedCharacterId for skip-if-already-selected logic */
  selectedCharacterId: string | null;
  /** DM history length for server-vs-local comparison */
  dmHistoryLength: number;
  /** Current sceneName for skip-if-already-set logic */
  sceneName: string;
  /** Deps that trigger auto-save — pass the actual values */
  saveDeps: unknown[];
}

export interface UseCampaignPersistenceReturn {
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastSavedAt: number | null;
}

export function useCampaignPersistence(deps: UseCampaignPersistenceDeps): UseCampaignPersistenceReturn {
  const {
    room,
    adventureStarted,
    getState,
    onLoad,
    onAutoSelectCharacter,
    characters,
    selectedCharacterId,
    dmHistoryLength,
    sceneName,
    saveDeps,
  } = deps;

  const campaignSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Debounced auto-save to server
  useEffect(() => {
    if (!adventureStarted) return;
    setSaveStatus('saving');
    clearTimeout(campaignSaveTimer.current);
    campaignSaveTimer.current = setTimeout(() => {
      const state = getState();
      fetch(`${apiBase()}/api/campaign/${encodeURIComponent(room)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dmHistory: state.dmHistory,
          sceneName: state.sceneName,
          selectedCharacterId: state.selectedCharacterId || null,
          combatLog: state.combatLog,
          units: state.inCombat ? state.units : null,
          inCombat: state.inCombat,
          combatRound: state.inCombat ? state.combatRound : 0,
          turnIndex: state.inCombat ? state.units.findIndex((u) => u.isCurrentTurn) : 0,
          terrain: state.terrain,
          mapPositions: state.mapPositions,
          mapImageUrl: state.mapImageUrl,
          quests: state.quests,
        }),
      }).then(() => {
        setSaveStatus('saved');
        setLastSavedAt(Date.now());
        setTimeout(() => setSaveStatus('idle'), 2000);
      }).catch(() => {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      });
    }, 2000);
    return () => clearTimeout(campaignSaveTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, saveDeps);

  // Load campaign from server on mount
  const campaignLoadedRef = useRef(false);
  useEffect(() => {
    if (campaignLoadedRef.current) return;
    campaignLoadedRef.current = true;
    fetch(`${apiBase()}/api/campaign/${encodeURIComponent(room)}`)
      .then((r) => (r.ok ? (r.json() as Promise<{ campaign?: Record<string, unknown> }>) : null))
      .then((data) => {
        if (data?.campaign) {
          const c = data.campaign;
          const result: CampaignLoadResult = {};

          // Server history is longer — use it
          const serverHistory = c.dmHistory as string[] | undefined;
          if (serverHistory && serverHistory.length > dmHistoryLength) {
            result.dmHistory = serverHistory;
          }
          if (c.sceneName && !sceneName) {
            result.sceneName = c.sceneName as string;
          }
          // Restore combat state
          if (c.inCombat && Array.isArray(c.units) && (c.units as unknown[]).length > 0) {
            result.units = c.units as Unit[];
            result.inCombat = true;
            result.combatRound = (c.combatRound as number) || 1;
            result.turnIndex = (c.turnIndex as number) || 0;
          }
          if (c.terrain && Array.isArray(c.terrain)) result.terrain = c.terrain as TerrainType[][];
          if (c.mapPositions && Array.isArray(c.mapPositions)) result.mapPositions = c.mapPositions as TokenPosition[];
          if (c.mapImageUrl && typeof c.mapImageUrl === 'string') result.mapImageUrl = c.mapImageUrl;
          if (c.quests && Array.isArray(c.quests)) result.quests = c.quests as Quest[];
          if (c.combatLog && Array.isArray(c.combatLog)) result.combatLog = c.combatLog as string[];

          onLoad(result);

          // Auto-select character: prefer seat assignment from lobby, then saved state
          let autoCharId: string | null = null;
          try { autoCharId = sessionStorage.getItem(`adventure:seatCharId:${room}`); } catch { /* ok */ }
          if (autoCharId && !selectedCharacterId) {
            const seatChar = characters.find((ch) => ch.id === autoCharId);
            if (seatChar) {
              onAutoSelectCharacter(seatChar.id);
              try { sessionStorage.removeItem(`adventure:seatCharId:${room}`); } catch { /* ok */ }
            }
          } else if (c.selectedCharacterId && !selectedCharacterId) {
            const found = characters.find((ch) => ch.id === (c.selectedCharacterId as string));
            if (found) onAutoSelectCharacter(found.id);
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  // Register campaign on first adventure start
  useEffect(() => {
    if (adventureStarted && dmHistoryLength === 1) {
      fetch(`${apiBase()}/api/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: room, name: `Campaign ${room.slice(0, 8)}` }),
      }).catch(() => {});
    }
  }, [adventureStarted, dmHistoryLength, room]);

  return { saveStatus, lastSavedAt };
}
