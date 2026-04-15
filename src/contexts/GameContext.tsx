// GameContext — shared state for players, units, dice rolls, characters, and their associations.
// Characters are persisted to localStorage so they survive page refreshes.
//
// Types, data constants, and pure utility functions are extracted to:
//   src/types/game.ts   — all interfaces, type aliases, and shared constants
//   src/data/enemies.ts — enemy templates, encounter themes, generateEnemies
//   src/data/items.ts   — loot tables, shop items, rollLoot
//   src/data/spells.ts  — spell list, spell slots, class abilities, feats
//
// Everything is re-exported here for backward compatibility.

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { type TerrainType, type TokenPosition, DEFAULT_COLS, DEFAULT_ROWS, HAZARD_DAMAGE } from '../lib/mapUtils';

// Re-export all types and constants so existing imports from GameContext keep working
export * from '../types/game';
export { ENEMY_TEMPLATES, ENCOUNTER_THEMES, randomEncounterTheme, generateEnemies } from '../data/enemies';
export { getConditionEffects, type ConditionMechanics } from '../data/conditions';
export { rollLoot, SHOP_ITEMS, SHOP_CATEGORIES } from '../data/items';
export {
  FULL_CASTER_SLOTS, HALF_CASTER_SLOTS, FULL_CASTERS, HALF_CASTERS,
  getSpellSlots, SPELL_LIST, getClassSpells,
  CLASS_ABILITIES, getClassAbility,
  FEATS,
  CASTING_STAT, PREPARED_CASTERS, getSpellPrepType, getMaxPreparedSpells, getMaxKnownSpells, getSpellLimit,
} from '../data/spells';

// Import types we need for the provider implementation
import type {
  Player, Unit, Character, DiceRoll, DieType, Stats, StatName, EquipSlot, Item,
  EquipmentSlots, ActiveCondition, ConditionType, Condition, Spell, ClassAbility, Feat,
  CharacterClass, PendingReaction,
} from '../types/game';
import {
  CONDITION_EFFECTS, XP_THRESHOLDS, HIT_DIE_AVG, HIT_DIE_SIDES, EMPTY_EQUIPMENT, CLASS_SAVE_PROFICIENCIES,
  calculateAC, rollSpellDamage, ASI_LEVELS, hasPendingASI,
} from '../types/game';
import { rollLoot } from '../data/items';
import { getSpellSlots, SPELL_LIST, getClassAbility, FEATS, FULL_CASTERS, HALF_CASTERS } from '../data/spells';
import { getConditionEffects } from '../data/conditions';

const CHARACTERS_STORAGE_KEY = 'adventure_characters';

interface GameContextValue {
  // Current user
  currentPlayer: Player;
  setCurrentPlayer: (p: Player) => void;

  // All players in session
  players: Player[];
  setPlayers: (p: Player[]) => void;

  // Units on the board
  units: Unit[];
  setUnits: (u: Unit[] | ((prev: Unit[]) => Unit[])) => void;

  // Characters
  characters: Character[];
  addCharacter: (c: Character) => void;
  removeCharacter: (id: string) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  grantXP: (id: string, xp: number) => { leveledUp: boolean; newLevel: number };
  restCharacter: (id: string, type: 'short' | 'long') => void;
  addItem: (charId: string, item: Item) => void;
  removeItem: (charId: string, itemId: string) => void;
  equipItem: (charId: string, itemId: string) => void;
  unequipItem: (charId: string, slot: EquipSlot) => void;
  useItem: (charId: string, itemId: string) => { message: string };
  tradeItem: (fromCharId: string, toCharId: string, itemId: string) => { success: boolean; message: string };

  // Shop
  buyItem: (charId: string, shopItem: Omit<Item, 'id'>) => { success: boolean; message: string };
  sellItem: (charId: string, itemId: string) => { success: boolean; message: string };

  // Spells
  castSpell: (charId: string, spellId: string, targetUnitId?: string, slotLevel?: number, asRitual?: boolean) => { success: boolean; message: string };
  restoreSpellSlots: (charId: string) => void;

  // Class abilities
  useClassAbility: (charId: string, targetUnitId?: string) => { success: boolean; message: string };

  // ASI / Feats
  applyASI: (charId: string, stat1: StatName, stat2?: StatName) => { success: boolean; message: string };
  selectFeat: (charId: string, featId: string) => { success: boolean; message: string };

  // Conditions (all return updated units array for multiplayer sync)
  applyCondition: (unitId: string, condition: ActiveCondition) => Unit[];
  removeCondition: (unitId: string, conditionType: ConditionType) => Unit[];
  tickConditions: (unitId: string) => { messages: string[]; units: Unit[] };

  // Dice roll log (most recent first)
  rolls: DiceRoll[];
  addRoll: (roll: Omit<DiceRoll, 'id' | 'timestamp' | 'isCritical' | 'isFumble'> & { value: number; sides: number }) => DiceRoll;
  clearRolls: () => void;

  // Currently selected unit for dice association
  selectedUnitId: string | null;
  setSelectedUnitId: (id: string | null) => void;

  // Combat state
  inCombat: boolean;
  setInCombat: (v: boolean) => void;
  combatRound: number;
  setCombatRound: (r: number) => void;
  turnIndex: number; // index into initiative-sorted units
  setTurnIndex: (i: number) => void;

  // Map state (shared so enemy AI can read/write positions)
  terrain: TerrainType[][];
  setTerrain: (t: TerrainType[][] | ((prev: TerrainType[][]) => TerrainType[][])) => void;
  mapPositions: TokenPosition[];
  setMapPositions: (p: TokenPosition[] | ((prev: TokenPosition[]) => TokenPosition[])) => void;
  mapImageUrl: string | null;
  setMapImageUrl: (url: string | null) => void;

  // Reaction system — pauses damage for Shield/Counterspell prompts
  pendingReaction: PendingReaction | null;
  resolveReaction: (useReaction: boolean) => Unit[];

  // Combat helpers (return updated units array for multiplayer sync)
  concentrationMessages: React.MutableRefObject<string[]>;
  damageUnit: (unitId: string, damage: number, damageType?: string, attackRoll?: number) => Unit[];
  healUnit: (unitId: string, amount: number) => Unit[];
  removeUnit: (unitId: string) => Unit[];
  rollInitiative: () => Unit[];
  nextTurn: () => { units: Unit[]; turnIndex: number; newRound: boolean; deathSaveMessage?: string };
}

const DEFAULT_PLAYER: Player = { id: 'local', username: 'You', controllerType: 'human' };

const GameContext = createContext<GameContextValue>({
  currentPlayer: DEFAULT_PLAYER,
  setCurrentPlayer: () => {},
  players: [],
  setPlayers: () => {},
  units: [],
  setUnits: () => {},
  characters: [],
  addCharacter: () => {},
  removeCharacter: () => {},
  updateCharacter: () => {},
  grantXP: () => ({ leveledUp: false, newLevel: 1 }),
  restCharacter: () => {},
  addItem: () => {},
  removeItem: () => {},
  equipItem: () => {},
  unequipItem: () => {},
  useItem: () => ({ message: '' }),
  buyItem: () => ({ success: false, message: '' }),
  sellItem: () => ({ success: false, message: '' }),
  tradeItem: () => ({ success: false, message: '' }),
  castSpell: () => ({ success: false, message: '' }),
  restoreSpellSlots: () => {},
  useClassAbility: () => ({ success: false, message: '' }),
  applyASI: () => ({ success: false, message: '' }),
  selectFeat: () => ({ success: false, message: '' }),
  applyCondition: () => [],
  removeCondition: () => [],
  tickConditions: () => ({ messages: [], units: [] }),
  rolls: [],
  addRoll: () => ({}) as DiceRoll,
  clearRolls: () => {},
  selectedUnitId: null,
  setSelectedUnitId: () => {},
  inCombat: false,
  setInCombat: () => {},
  combatRound: 0,
  setCombatRound: () => {},
  turnIndex: 0,
  setTurnIndex: () => {},
  terrain: [],
  setTerrain: () => {},
  mapPositions: [],
  setMapPositions: () => {},
  mapImageUrl: null,
  setMapImageUrl: () => {},
  pendingReaction: null,
  resolveReaction: () => [],
  concentrationMessages: { current: [] },
  damageUnit: () => [],
  healUnit: () => [],
  removeUnit: () => [],
  rollInitiative: () => [],
  nextTurn: () => ({ units: [], turnIndex: 0, newRound: false, deathSaveMessage: undefined }),
});

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(DEFAULT_PLAYER);
  const [players, setPlayers] = useState<Player[]>([DEFAULT_PLAYER]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [characters, setCharacters] = useState<Character[]>(() => {
    try {
      const stored = localStorage.getItem(CHARACTERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [rolls, setRolls] = useState<DiceRoll[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [inCombat, setInCombat] = useState(false);
  const [combatRound, setCombatRound] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);

  // Map state — terrain grid and token positions (lifted from BattleMap for spatial combat)
  const [terrain, setTerrain] = useState<TerrainType[][]>(() => Array.from({ length: DEFAULT_ROWS }, () => Array<TerrainType>(DEFAULT_COLS).fill('void')));
  const [mapPositions, setMapPositions] = useState<TokenPosition[]>([]);
  const [mapImageUrl, setMapImageUrl] = useState<string | null>(null); // R2-backed DM map background

  // Fetch user identity on mount — check temp user first, then real auth
  useEffect(() => {
    // Check localStorage temp user first (instant, no network)
    try {
      const stored = localStorage.getItem('adventure:tempUser');
      if (stored) {
        const t = JSON.parse(stored) as { id?: string; username?: string; global_name?: string };
        if (t.id) {
          setCurrentPlayer({
            id: t.id,
            username: t.global_name || t.username || 'Adventurer',
            controllerType: 'human',
          });
          return; // skip real auth check
        }
      }
    } catch { /* bad JSON — fall through */ }

    // Fall back to real auth (Discord/Google)
    fetch('/api/auth/me')
      .then((r) => (r.ok ? (r.json() as Promise<{ user?: { id?: string; username?: string; global_name?: string; avatar?: string; picture?: string } }>) : null))
      .then((data) => {
        if (data?.user?.id) {
          const u = data.user;
          const avatarUrl = u.picture || (u.avatar ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128` : 'https://cdn.discordapp.com/embed/avatars/0.png');
          setCurrentPlayer({
            id: u.id!,
            username: u.global_name || u.username || 'Adventurer',
            avatar: avatarUrl,
            controllerType: 'human',
          });
        }
      })
      .catch(() => {}); // backend unavailable — keep DEFAULT_PLAYER
  }, []);

  // Concentration save messages — collected during damageUnit state updates, consumed by Game.tsx
  const concentrationBreakMessages = useRef<string[]>([]);

  // castSpell ref — needed because resolveReaction (defined first) must call castSpell (defined later)
  const castSpellRef = useRef<(charId: string, spellId: string, targetUnitId?: string, slotLevel?: number, asRitual?: boolean, _skipCounterspell?: boolean) => { success: boolean; message: string }>(() => ({ success: false, message: '' }));

  // Reaction system — hold damage while player decides whether to use Shield
  const [pendingReaction, setPendingReaction] = useState<PendingReaction | null>(null);

  // Persist characters to localStorage + server sync on change
  const syncingRef = useRef(false); // prevent save-during-load loops
  const hydratedCharacterCacheRef = useRef<string | null>(null);
  const portraitMigrationRef = useRef<Set<string>>(new Set());
  const isTempUser = currentPlayer.id.startsWith('temp-');

  // Hydrate characters from IndexedDB cache when user identity resolves.
  // This covers cases where localStorage was cleared but IndexedDB still has fresh data.
  useEffect(() => {
    if (isTempUser || !currentPlayer.id) return;
    if (hydratedCharacterCacheRef.current === currentPlayer.id) return;
    hydratedCharacterCacheRef.current = currentPlayer.id;

    import('../lib/localCache').then(({ getCachedCharacters }) => {
      getCachedCharacters(currentPlayer.id).then((cached) => {
        if (!cached || cached.length === 0) return;
        setCharacters((local) => {
          if (local.length === 0) return cached as Character[];
          const localIds = new Set(local.map((c) => c.id));
          const missingFromLocal = (cached as Character[]).filter((c) => !localIds.has(c.id));
          return missingFromLocal.length > 0 ? [...local, ...missingFromLocal] : local;
        });
      }).catch(() => {});
    }).catch(() => {});
  }, [currentPlayer.id, isTempUser]);
  useEffect(() => {
    try {
      localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(characters));
    } catch {
      // storage full or unavailable — silently fail
    }
    // Fire-and-forget server sync (skip for temp users — no auth cookie)
    if (!syncingRef.current && !isTempUser && characters.length >= 0) {
      fetch('/api/characters', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characters }),
      }).catch(() => {}); // server unavailable — localStorage is the fallback
    }
    // Also write to IndexedDB for instant load on next visit
    import('../lib/localCache').then(({ cacheCharacters }) => {
      cacheCharacters(currentPlayer.id, characters).catch(() => {});
    }).catch(() => {});
  }, [characters, isTempUser, currentPlayer.id]);

  // Try to load from server on mount (merge: server data fills in any missing characters)
  // Skip for temp users — they have no server-side characters
  useEffect(() => {
    if (isTempUser) return;
    syncingRef.current = true;
    const charEtagKey = 'adventure:chars-etag';
    const headers: HeadersInit = {};
    try { const etag = localStorage.getItem(charEtagKey); if (etag) headers['If-None-Match'] = etag; } catch { /* ok */ }
    fetch('/api/characters', { headers })
      .then((r) => {
        if (r.status === 304) return null; // not modified, use local data
        const etag = r.headers.get('etag');
        if (etag) try { localStorage.setItem(charEtagKey, etag); } catch { /* ok */ }
        return r.ok ? (r.json() as Promise<{ characters?: Character[] }>) : null;
      })
      .then((data) => {
        if (data?.characters?.length) {
          const serverChars = data.characters;
          setCharacters((local) => {
            const localIds = new Set(local.map((c) => c.id));
            const merged = [...local];
            for (const sc of serverChars) {
              if (!localIds.has(sc.id)) merged.push(sc);
            }
            return merged.length > local.length ? merged : local;
          });
        }
      })
      .catch(() => {}) // server unavailable — use localStorage only
      .finally(() => {
        syncingRef.current = false;
      });
  }, [isTempUser]); // eslint-disable-line react-hooks/exhaustive-deps

  // Migrate old inline data-URL portraits to server-backed portrait URLs.
  useEffect(() => {
    if (isTempUser) return;
    if (!characters.some((c) => (c.portrait && c.portrait.startsWith('data:image/')) || (c.portraitGallery || []).some((url) => url.startsWith('data:image/')))) return;

    let cancelled = false;
    const fingerprint = (value: string) => `${value.slice(0, 64)}:${value.length}`;
    const sameGallery = (a?: string[], b?: string[]): boolean => {
      if (!a && !b) return true;
      if (!a || !b) return false;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    };
    const uploadPortrait = async (image: string, characterId?: string): Promise<string | null> => {
      try {
        const res = await fetch('/api/portrait/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image, characterId }),
        });
        if (!res.ok) return null;
        const data = await res.json() as { url?: string };
        return data.url || null;
      } catch {
        return null;
      }
    };

    void (async () => {
      const updates = new Map<string, { portrait?: string; portraitGallery?: string[] }>();

      for (const character of characters) {
        let nextPortrait = character.portrait;
        let nextGallery = character.portraitGallery ? [...character.portraitGallery] : undefined;

        if (nextPortrait && nextPortrait.startsWith('data:image/')) {
          const key = `p:${character.id}:${fingerprint(nextPortrait)}`;
          if (!portraitMigrationRef.current.has(key)) {
            portraitMigrationRef.current.add(key);
            const url = await uploadPortrait(nextPortrait, character.id);
            if (url) nextPortrait = url;
            else portraitMigrationRef.current.delete(key); // retry on next pass
          }
        }

        if (nextGallery?.length) {
          for (let i = 0; i < nextGallery.length; i += 1) {
            const item = nextGallery[i];
            if (!item || !item.startsWith('data:image/')) continue;
            const key = `g:${character.id}:${i}:${fingerprint(item)}`;
            if (portraitMigrationRef.current.has(key)) continue;
            portraitMigrationRef.current.add(key);
            const url = await uploadPortrait(item);
            if (url) nextGallery[i] = url;
            else portraitMigrationRef.current.delete(key); // retry on next pass
          }
        }

        if (nextPortrait !== character.portrait || !sameGallery(nextGallery, character.portraitGallery)) {
          updates.set(character.id, { portrait: nextPortrait, portraitGallery: nextGallery });
        }
      }

      if (cancelled || updates.size === 0) return;
      setCharacters((prev) => prev.map((c) => {
        const next = updates.get(c.id);
        if (!next) return c;
        return {
          ...c,
          portrait: next.portrait,
          portraitGallery: next.portraitGallery,
        };
      }));
    })();

    return () => {
      cancelled = true;
    };
  }, [characters, isTempUser]);

  const addCharacter = useCallback((c: Character) => {
    setCharacters((prev) => [...prev, c]);
  }, []);

  const removeCharacter = useCallback((id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCharacter = useCallback((id: string, updates: Partial<Character>) => {
    setCharacters((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  // Grant XP to a character, auto-level if threshold reached
  const grantXP = useCallback((id: string, xp: number): { leveledUp: boolean; newLevel: number } => {
    let leveledUp = false;
    let newLevel = 1;
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const totalXP = c.xp + xp;
        let level = c.level;
        // Check for level up
        while (level < 20 && totalXP >= XP_THRESHOLDS[level]) {
          level++;
        }
        leveledUp = level > c.level;
        newLevel = level;
        if (leveledUp) {
          // Recalculate maxHp on level up (add hit die average + CON mod)
          const conMod = Math.floor((c.stats.CON - 10) / 2);
          // Feat HP bonuses: Tough (+2/level), Durable (+1/level)
          const featHpPerLevel = (c.feats || []).reduce((sum, fid) => {
            const f = FEATS.find((ft) => ft.id === fid);
            return sum + (f?.maxHpPerLevel || 0);
          }, 0);
          const levelsGained = level - c.level;
          // HP on level up: roll or average (configurable via localStorage)
          const rollHpOnLevelUp = (() => { try { return localStorage.getItem('adventure:rollHpOnLevelUp') === '1'; } catch { return false; } })();
          let hpGain = 0;
          for (let i = 0; i < levelsGained; i++) {
            const sides = HIT_DIE_SIDES[c.class] || 8;
            const hitDieRoll = rollHpOnLevelUp ? Math.max(1, Math.floor(Math.random() * sides) + 1) : (HIT_DIE_AVG[c.class] || 5);
            hpGain += hitDieRoll + conMod + featHpPerLevel;
          }
          const newMaxHp = c.maxHp + hpGain;
          const hdRemaining = (c.hitDiceRemaining ?? c.level) + levelsGained; // gain hit dice on level up
          return { ...c, xp: totalXP, level, maxHp: newMaxHp, hp: newMaxHp, hitDiceRemaining: hdRemaining }; // full heal on level up
        }
        return { ...c, xp: totalXP };
      })
    );
    return { leveledUp, newLevel };
  }, []);

  // Rest: short rest heals hit die + CON, long rest fully heals + resets death saves + clears conditions
  // Both rest types reset class abilities based on the ability's resetsOn property
  const restCharacter = useCallback((id: string, type: 'short' | 'long', hitDiceToSpend?: number) => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const ability = getClassAbility(c.class);
        const resetAbility = ability ? type === 'long' || ability.resetsOn === 'short' : false;
        const hdRemaining = c.hitDiceRemaining ?? c.level; // default to full for old characters
        if (type === 'long') {
          // Long rest: full heal, restore half hit dice (min 1), reset slots + ability, reduce exhaustion by 1
          const restoreHd = Math.max(1, Math.floor(c.level / 2));
          const newExhaustion = Math.max(0, (c.exhaustion ?? 0) - 1);
          return { ...c, hp: c.maxHp, hitDiceRemaining: Math.min(c.level, hdRemaining + restoreHd), deathSaves: { successes: 0, failures: 0 }, condition: 'normal' as Condition, spellSlotsUsed: {}, classAbilityUsed: false, exhaustion: newExhaustion, arcaneRecoveryUsed: false, sorceryPointsUsed: 0 };
        }
        // Short rest: spend hit dice (roll actual die + CON mod per die spent)
        const diceToSpend = Math.min(hitDiceToSpend ?? 1, hdRemaining);
        if (diceToSpend <= 0) return c; // no hit dice left
        const conMod = Math.floor((c.stats.CON - 10) / 2);
        const sides = HIT_DIE_SIDES[c.class] || 8;
        let heal = 0;
        for (let i = 0; i < diceToSpend; i++) {
          const roll = Math.floor(Math.random() * sides) + 1;
          heal += Math.max(1, roll + conMod);
        }
        // Warlock: pact magic slots recover on short rest
        // Wizard: Arcane Recovery — recover spell slots worth up to half wizard level (rounded up)
        let resetSlots = c.spellSlotsUsed;
        if (c.class === 'Warlock') {
          resetSlots = {};
        } else if (c.class === 'Wizard' && !c.arcaneRecoveryUsed) {
          const maxRecovery = Math.ceil(c.level / 2);
          let recovered = 0;
          const newUsed = { ...(c.spellSlotsUsed || {}) };
          // Recover lowest slots first up to maxRecovery worth of levels
          for (const lvl of [1, 2, 3, 4, 5]) {
            const used = newUsed[lvl] || 0;
            if (used <= 0) continue;
            const canRecover = Math.min(used, Math.floor((maxRecovery - recovered) / lvl));
            if (canRecover <= 0) continue;
            newUsed[lvl] = used - canRecover;
            recovered += canRecover * lvl;
          }
          if (recovered > 0) resetSlots = newUsed;
        }
        return { ...c, hp: Math.min(c.maxHp, c.hp + heal), hitDiceRemaining: hdRemaining - diceToSpend, condition: c.hp > 0 ? ('normal' as Condition) : c.condition, classAbilityUsed: resetAbility ? false : c.classAbilityUsed, spellSlotsUsed: resetSlots || c.spellSlotsUsed, arcaneRecoveryUsed: c.class === 'Wizard' ? true : c.arcaneRecoveryUsed, sorceryPointsUsed: c.class === 'Sorcerer' ? 0 : c.sorceryPointsUsed };
      })
    );
    // Long rest also clears all combat conditions on the player's unit
    if (type === 'long') {
      setUnits((prev) => prev.map((u) => (u.characterId === id ? { ...u, conditions: [] } : u)));
    }
  }, []);

  // Inventory: add an item to a character's inventory
  const addItem = useCallback((charId: string, item: Item) => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        const inv = c.inventory || [];
        // Stack potions/scrolls if same name exists
        if ((item.type === 'potion' || item.type === 'scroll') && item.quantity) {
          const existing = inv.find((i) => i.name === item.name);
          if (existing) {
            return { ...c, inventory: inv.map((i) => (i.id === existing.id ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) } : i)) };
          }
        }
        return { ...c, inventory: [...inv, item] };
      })
    );
  }, []);

  // Inventory: remove an item (or reduce quantity for stackables)
  const removeItem = useCallback((charId: string, itemId: string) => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        const inv = c.inventory || [];
        const item = inv.find((i) => i.id === itemId);
        if (!item) return c;
        if (item.quantity && item.quantity > 1) {
          return { ...c, inventory: inv.map((i) => (i.id === itemId ? { ...i, quantity: (i.quantity || 1) - 1 } : i)) };
        }
        return { ...c, inventory: inv.filter((i) => i.id !== itemId) };
      })
    );
  }, []);

  // Equipment: equip an item from inventory — moves old item back to inventory, recalculates AC
  const equipItem = useCallback((charId: string, itemId: string) => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        const inv = c.inventory || [];
        const item = inv.find((i) => i.id === itemId);
        if (!item || !item.equipSlot) return c;

        const eq = { ...(c.equipment || EMPTY_EQUIPMENT) };
        const slot = item.equipSlot;
        let newInv = inv.filter((i) => i.id !== itemId);

        // Unequip current item in that slot back to inventory
        if (eq[slot]) newInv = [...newInv, eq[slot]!];
        eq[slot] = item;

        return { ...c, inventory: newInv, equipment: eq, ac: calculateAC(c.stats, eq) };
      })
    );
  }, []);

  // Equipment: unequip an item back to inventory, recalculate AC
  const unequipItem = useCallback((charId: string, slot: EquipSlot) => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        const eq = { ...(c.equipment || EMPTY_EQUIPMENT) };
        const item = eq[slot];
        if (!item) return c;

        eq[slot] = null;
        const newInv = [...(c.inventory || []), item];

        return { ...c, inventory: newInv, equipment: eq, ac: calculateAC(c.stats, eq) };
      })
    );
  }, []);

  // Use a consumable item (potion, scroll)
  const useItem = useCallback((charId: string, itemId: string): { message: string } => {
    let msg = '';
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        const inv = c.inventory || [];
        const item = inv.find((i) => i.id === itemId);
        if (!item) return c;

        let updated = { ...c };
        if (item.type === 'potion' && item.healAmount) {
          const healed = Math.min(item.healAmount, c.maxHp - c.hp);
          updated.hp = Math.min(c.maxHp, c.hp + item.healAmount);
          if (c.condition === 'unconscious' || c.condition === 'stabilized') {
            updated.condition = 'normal';
            updated.deathSaves = { successes: 0, failures: 0 };
          }
          msg = `${c.name} drinks ${item.name}, restoring ${healed} HP! (${updated.hp}/${c.maxHp})`;
        } else if (item.name === 'Oil Flask') {
          // Oil Flask: refuel a lantern in inventory
          const lantern = inv.find((i) => i.appliesCondition === 'lantern' && i.fuelMax);
          if (lantern) {
            const refuelAmount = lantern.fuelMax || 60;
            updated.inventory = inv.map((i) => {
              if (i.id === lantern.id) return { ...i, fuelRemaining: Math.min(i.fuelMax || 60, (i.fuelRemaining || 0) + refuelAmount) };
              if (i.id === itemId) return i.quantity && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i;
              return i;
            }).filter((i) => !(i.id === itemId && (!i.quantity || i.quantity <= 1)));
            msg = `${c.name} refuels their ${lantern.name}! (${Math.min(lantern.fuelMax || 60, (lantern.fuelRemaining || 0) + refuelAmount)} turns remaining)`;
          } else {
            msg = `${c.name} has no lantern to refuel.`;
          }
        } else if (item.appliesCondition) {
          // Light source or condition-applying item — apply condition to the character's unit
          const condType = item.appliesCondition;
          // Check fuel for fuel-tracked items
          if (item.fuelMax !== undefined && (item.fuelRemaining ?? 0) <= 0) {
            msg = `${c.name}'s ${item.name} is out of fuel! Use Oil Flask to refuel.`;
            return c; // don't apply condition
          }
          const condDesc = CONDITION_EFFECTS[condType]?.description || condType;
          const fuelNote = item.fuelRemaining !== undefined ? ` (${item.fuelRemaining} turns of fuel)` : '';
          msg = `${c.name} lights their ${item.name}!${fuelNote} (${condDesc})`;
          // Apply condition via setUnits (deferred — runs after this character update)
          setTimeout(() => {
            setUnits((prevUnits: Unit[]) => {
              const unitId = prevUnits.find((u) => u.characterId === charId)?.id;
              if (!unitId) return prevUnits;
              // Toggle: if already has the condition, remove it instead
              const existing = prevUnits.find((u) => u.id === unitId);
              if (existing?.conditions?.some((cnd) => cnd.type === condType)) {
                return prevUnits.map((u) => u.id === unitId ? { ...u, conditions: (u.conditions || []).filter((cnd) => cnd.type !== condType) } : u);
              }
              return prevUnits.map((u) => u.id === unitId ? { ...u, conditions: [...(u.conditions || []), { type: condType, duration: -1, source: item.name }] } : u);
            });
          }, 0);
        } else {
          msg = `${c.name} uses ${item.name}.`;
        }

        // Remove or decrement (only for consumables or potions)
        if (item.consumable || item.type === 'potion') {
          if (item.quantity && item.quantity > 1) {
            updated.inventory = inv.map((i) => (i.id === itemId ? { ...i, quantity: (i.quantity || 1) - 1 } : i));
          } else {
            updated.inventory = inv.filter((i) => i.id !== itemId);
          }
        }
        return updated;
      })
    );
    return { message: msg };
  }, [setUnits]);

  // Shop: buy an item (deduct gold, add to inventory)
  const buyItem = useCallback((charId: string, shopItem: Omit<Item, 'id'>): { success: boolean; message: string } => {
    let result = { success: false, message: '' };
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        if (c.gold < shopItem.value) {
          result = { success: false, message: `Not enough gold! Need ${shopItem.value}g, have ${c.gold}g.` };
          return c;
        }
        const newItem: Item = { ...shopItem, id: crypto.randomUUID() };
        result = { success: true, message: `Bought ${shopItem.name} for ${shopItem.value}g.` };
        return { ...c, gold: c.gold - shopItem.value, inventory: [...(c.inventory || []), newItem] };
      })
    );
    return result;
  }, []);

  // Shop: sell an item (half value, remove from inventory)
  const sellItem = useCallback((charId: string, itemId: string): { success: boolean; message: string } => {
    let result = { success: false, message: '' };
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        const inv = c.inventory || [];
        const item = inv.find((i) => i.id === itemId);
        if (!item) {
          result = { success: false, message: 'Item not found.' };
          return c;
        }
        const sellPrice = Math.max(1, Math.floor(item.value / 2));
        result = { success: true, message: `Sold ${item.name} for ${sellPrice}g.` };
        return { ...c, gold: c.gold + sellPrice, inventory: inv.filter((i) => i.id !== itemId) };
      })
    );
    return result;
  }, []);

  // Trade: move an item from one character to another
  const tradeItem = useCallback((fromCharId: string, toCharId: string, itemId: string): { success: boolean; message: string } => {
    let result = { success: false, message: '' };
    setCharacters((prev) => {
      const fromChar = prev.find((c) => c.id === fromCharId);
      const toChar = prev.find((c) => c.id === toCharId);
      if (!fromChar || !toChar) { result = { success: false, message: 'Character not found.' }; return prev; }
      const inv = fromChar.inventory || [];
      const item = inv.find((i) => i.id === itemId);
      if (!item) { result = { success: false, message: 'Item not found.' }; return prev; }

      // Handle stacked items — trade one copy
      const tradedItem = { ...item, id: crypto.randomUUID(), quantity: 1 };
      const fromInv = item.quantity && item.quantity > 1
        ? inv.map((i) => i.id === itemId ? { ...i, quantity: (i.quantity || 1) - 1 } : i)
        : inv.filter((i) => i.id !== itemId);

      // Stack into recipient's inventory if same name+type exists (potions, scrolls)
      const toInv = [...(toChar.inventory || [])];
      const existingStack = toInv.find((i) => i.name === item.name && i.type === item.type && (i.type === 'potion' || i.type === 'scroll'));
      if (existingStack) {
        const idx = toInv.indexOf(existingStack);
        toInv[idx] = { ...existingStack, quantity: (existingStack.quantity || 1) + 1 };
      } else {
        toInv.push(tradedItem);
      }

      result = { success: true, message: `${fromChar.name} gives ${item.name} to ${toChar.name}.` };
      return prev.map((c) => {
        if (c.id === fromCharId) return { ...c, inventory: fromInv };
        if (c.id === toCharId) return { ...c, inventory: toInv };
        return c;
      });
    });
    return result;
  }, []);

  const addRoll = useCallback((partial: Omit<DiceRoll, 'id' | 'timestamp' | 'isCritical' | 'isFumble'> & { value: number; sides: number }): DiceRoll => {
    const roll: DiceRoll = {
      ...partial,
      id: crypto.randomUUID(),
      isCritical: partial.value === partial.sides,
      isFumble: partial.value === 1,
      timestamp: Date.now(),
    };
    setRolls((prev) => [roll, ...prev.slice(0, 99)]); // keep last 100
    return roll;
  }, []);

  const clearRolls = useCallback(() => setRolls([]), []);

  // Combat: apply damage to a unit (clamp to 0) + concentration check. Returns updated units for sync.
  // attackRoll is the total attack roll that hit (used for Shield reaction check).
  const damageUnit = useCallback(
    (unitId: string, damage: number, damageType?: string, attackRoll?: number): Unit[] => {
      // Check if target can use Shield reaction before applying damage
      const target = units.find((u) => u.id === unitId);
      if (target && target.characterId && target.type === 'player' && !target.reactionUsed) {
        const char = characters.find((c) => c.id === target.characterId);
        if (char) {
          const slots = getSpellSlots(char.class, char.level);
          const used = char.spellSlotsUsed || {};
          const hasShieldSpell = SPELL_LIST.some((s) => s.id === 'shield' && s.classes.includes(char.class)) || (char.customSpells || []).some((s) => s.id === 'shield');
          const hasSlot = Object.entries(slots).some(([lvl, max]) => Number(lvl) >= 1 && (max as number) - (used[Number(lvl)] || 0) > 0);
          if (hasShieldSpell && hasSlot && !pendingReaction) {
            setPendingReaction({ type: 'shield', targetUnitId: unitId, sourceUnitId: '', damage, damageType, attackRoll });
            return []; // pause - resolveReaction will finish
          }
        }
      }

      let result: Unit[] = [];
      setUnits((prev) => {
        // Apply damage type modifiers (resistance = half, vulnerability = double, immunity = zero)
        let effectiveDamage = damage;
        const target = prev.find((u) => u.id === unitId);
        let dmgNote = '';
        if (target && damageType) {
          if (target.immunities?.includes(damageType as import('../types/game').DamageType)) {
            effectiveDamage = 0;
            dmgNote = ` (IMMUNE to ${damageType})`;
          } else if (target.resistances?.includes(damageType as import('../types/game').DamageType)) {
            effectiveDamage = Math.floor(damage / 2);
            dmgNote = ` (resistant to ${damageType}: ${damage}→${effectiveDamage})`;
          } else if (target.vulnerabilities?.includes(damageType as import('../types/game').DamageType)) {
            effectiveDamage = damage * 2;
            dmgNote = ` (vulnerable to ${damageType}: ${damage}→${effectiveDamage})`;
          }
        }
        const updated = prev.map((u) => (u.id === unitId ? { ...u, hp: Math.max(0, u.hp - effectiveDamage) } : u));
        // Concentration save: DC = max(10, floor(damage/2))
        const damagedUnit = updated.find((u) => u.id === unitId);
        if (damagedUnit?.concentratingOn && damagedUnit.hp > 0) {
          const dc = Math.max(10, Math.floor(damage / 2));
          // CON save: d20 + CON mod (look up from character if player)
          const saveRoll = Math.floor(Math.random() * 20) + 1;
          let conMod = 0;
          if (damagedUnit.characterId) {
            const char = characters.find((c) => c.id === damagedUnit.characterId);
            if (char) {
              conMod = Math.floor((char.stats.CON - 10) / 2);
              // Saving throw proficiency: add proficiency bonus if class is proficient in CON saves
              if (CLASS_SAVE_PROFICIENCIES[char.class]?.includes('CON')) {
                conMod += Math.ceil(char.level / 4) + 1;
              }
              // War Caster feat: +2 to concentration saves
              if ((char.feats || []).includes('war-caster')) conMod += 2;
            }
          }
          const totalSave = saveRoll + conMod;
          if (totalSave < dc) {
            // Failed concentration save — drop concentration and remove conditions sourced by this caster
            const casterName = damagedUnit.name;
            concentrationBreakMessages.current.push(`${casterName} fails concentration save (${saveRoll}+${conMod}=${totalSave} vs DC ${dc})! ${damagedUnit.concentratingOn} ends.`);
            result = updated.map((u) => {
              if (u.id === unitId) return { ...u, concentratingOn: undefined };
              // Remove conditions applied by this caster
              return { ...u, conditions: (u.conditions || []).filter((c) => c.source !== casterName) };
            });
            return result;
          } else {
            concentrationBreakMessages.current.push(`${damagedUnit.name} maintains concentration (${saveRoll}+${conMod}=${totalSave} vs DC ${dc}).`);
          }
        }
        result = updated;
        return updated;
      });
      return result;
    },
    [characters, units, pendingReaction]
  );

  // Reaction resolver: player decided whether to use Shield/Counterspell (or declined / timed out)
  const resolveReaction = useCallback((useReaction: boolean): Unit[] => {
    if (!pendingReaction) return [];
    const { type, targetUnitId, damage, damageType, attackRoll } = pendingReaction;
    const savedReaction = { ...pendingReaction };
    setPendingReaction(null);

    // --- Counterspell resolution ---
    if (type === 'counterspell') {
      const counterCaster = units.find((u) => u.id === savedReaction.targetUnitId);
      const counterChar = counterCaster?.characterId ? characters.find((c) => c.id === counterCaster.characterId) : null;
      const enemyCasterName = units.find((u) => u.id === savedReaction.sourceUnitId)?.name || 'Enemy';

      if (useReaction && counterChar && counterCaster) {
        // Spend lowest available level 3+ slot for Counterspell
        const slots = getSpellSlots(counterChar.class, counterChar.level);
        const used = counterChar.spellSlotsUsed || {};
        let spentLevel = 0;
        for (const lvl of Object.keys(slots).map(Number).sort()) {
          if (lvl >= 3 && (slots[lvl] || 0) - (used[lvl] || 0) > 0) { spentLevel = lvl; break; }
        }
        if (spentLevel > 0) {
          setCharacters((prev) => prev.map((c) => c.id !== counterChar.id ? c : { ...c, spellSlotsUsed: { ...c.spellSlotsUsed, [spentLevel]: (c.spellSlotsUsed[spentLevel] || 0) + 1 } }));
        }
        setUnits((prev) => prev.map((u) => u.id === counterCaster.id ? { ...u, reactionUsed: true } : u));

        const spellLvl = savedReaction.spellLevel || 0;
        if (spentLevel >= spellLvl) {
          // Auto-succeed: counterspell slot >= spell level
          concentrationBreakMessages.current.push(`${counterChar.name} casts Counterspell (level ${spentLevel})! ${savedReaction.spellName} is negated!`);
          return units; // spell negated
        }
        // Higher level spell: ability check DC 10 + spell level
        const dc = 10 + spellLvl;
        const castStatMap: Record<string, string> = { Wizard: 'INT', Sorcerer: 'CHA', Warlock: 'CHA', Cleric: 'WIS', Druid: 'WIS', Bard: 'CHA', Paladin: 'CHA', Ranger: 'WIS' };
        const castStat = castStatMap[counterChar.class] || 'INT';
        const castMod = Math.floor(((counterChar.stats as Record<string, number>)[castStat] || 10) - 10) / 2;
        const profBonus = Math.ceil(counterChar.level / 4) + 1;
        const checkRoll = Math.floor(Math.random() * 20) + 1;
        const total = checkRoll + Math.floor(castMod) + profBonus;
        if (total >= dc) {
          concentrationBreakMessages.current.push(`${counterChar.name} casts Counterspell! Ability check ${checkRoll}+${Math.floor(castMod)}+${profBonus}=${total} vs DC ${dc} - SUCCESS! ${savedReaction.spellName} negated!`);
          return units; // spell negated
        }
        // Counterspell failed - spell goes through
        concentrationBreakMessages.current.push(`${counterChar.name} casts Counterspell! Ability check ${checkRoll}+${Math.floor(castMod)}+${profBonus}=${total} vs DC ${dc} - FAILED! ${savedReaction.spellName} goes through!`);
      }

      // Counterspell declined or failed: re-execute the original spell with _skipCounterspell
      if (savedReaction.casterId && savedReaction.spellId) {
        const replayResult = castSpellRef.current(savedReaction.casterId, savedReaction.spellId, savedReaction.targetOfSpell, savedReaction.slotLevel, false, true);
        if (replayResult.message) concentrationBreakMessages.current.push(replayResult.message);
      }
      return units;
    }

    // --- Shield resolution ---
    if (type === 'shield' && useReaction) {
      // Spend a level-1 slot, mark reaction used, add +5 AC for this check
      const target = units.find((u) => u.id === targetUnitId);
      if (target?.characterId) {
        const char = characters.find((c) => c.id === target.characterId);
        if (char) {
          // Spend lowest available slot
          const slots = getSpellSlots(char.class, char.level);
          const used = char.spellSlotsUsed || {};
          let spentLevel = 0;
          for (const lvl of Object.keys(slots).map(Number).sort()) {
            if (lvl >= 1 && (slots[lvl] || 0) - (used[lvl] || 0) > 0) { spentLevel = lvl; break; }
          }
          if (spentLevel > 0) {
            setCharacters((prev) => prev.map((c) => c.id !== char.id ? c : { ...c, spellSlotsUsed: { ...c.spellSlotsUsed, [spentLevel]: (c.spellSlotsUsed[spentLevel] || 0) + 1 } }));
          }
          // Mark reaction as used this turn
          setUnits((prev) => prev.map((u) => u.id === targetUnitId ? { ...u, reactionUsed: true } : u));
          // Shield gives +5 AC - check if the attack now misses
          const shieldedAC = target.ac + 5;
          if (attackRoll !== undefined && attackRoll < shieldedAC) {
            concentrationBreakMessages.current.push(`${target.name} casts Shield (+5 AC = ${shieldedAC})! The attack misses!`);
            return units; // attack dodged, no damage applied
          }
          // Attack still hits even with Shield
          concentrationBreakMessages.current.push(`${target.name} casts Shield (+5 AC = ${shieldedAC}), but the attack still hits!`);
        }
      }
    }

    // Apply the original damage (either Shield did not negate or player declined)
    let result: Unit[] = [];
    setUnits((prev) => {
      let effectiveDamage = damage;
      const tgt = prev.find((u) => u.id === targetUnitId);
      if (tgt && damageType) {
        if (tgt.immunities?.includes(damageType as import('../types/game').DamageType)) effectiveDamage = 0;
        else if (tgt.resistances?.includes(damageType as import('../types/game').DamageType)) effectiveDamage = Math.floor(damage / 2);
        else if (tgt.vulnerabilities?.includes(damageType as import('../types/game').DamageType)) effectiveDamage = damage * 2;
      }
      const updated = prev.map((u) => (u.id === targetUnitId ? { ...u, hp: Math.max(0, u.hp - effectiveDamage) } : u));
      // Concentration save (same logic as damageUnit)
      const damagedUnit = updated.find((u) => u.id === targetUnitId);
      if (damagedUnit?.concentratingOn && damagedUnit.hp > 0) {
        const dc = Math.max(10, Math.floor(damage / 2));
        const saveRoll = Math.floor(Math.random() * 20) + 1;
        let conMod = 0;
        if (damagedUnit.characterId) {
          const char = characters.find((c) => c.id === damagedUnit.characterId);
          if (char) {
            conMod = Math.floor((char.stats.CON - 10) / 2);
            if (CLASS_SAVE_PROFICIENCIES[char.class]?.includes('CON')) conMod += Math.ceil(char.level / 4) + 1;
            if ((char.feats || []).includes('war-caster')) conMod += 2;
          }
        }
        if (saveRoll + conMod < dc) {
          concentrationBreakMessages.current.push(`${damagedUnit.name} fails concentration save! ${damagedUnit.concentratingOn} ends.`);
          result = updated.map((u) => {
            if (u.id === targetUnitId) return { ...u, concentratingOn: undefined };
            return { ...u, conditions: (u.conditions || []).filter((c) => c.source !== damagedUnit.name) };
          });
          return result;
        }
      }
      result = updated;
      return updated;
    });
    return result;
  }, [pendingReaction, units, characters]);

  // Combat: heal a unit (clamp to maxHp). Returns updated units for sync.
  const healUnit = useCallback((unitId: string, amount: number): Unit[] => {
    let result: Unit[] = [];
    setUnits((prev) => {
      result = prev.map((u) => (u.id === unitId ? { ...u, hp: Math.min(u.maxHp, u.hp + amount) } : u));
      return result;
    });
    return result;
  }, []);

  // Conditions: apply a condition to a unit. Returns updated units for sync.
  const applyCondition = useCallback((unitId: string, condition: ActiveCondition): Unit[] => {
    let result: Unit[] = [];
    setUnits((prev) => {
      result = prev.map((u) => {
        if (u.id !== unitId) return u;
        const conditions = (u.conditions || []).filter((c) => c.type !== condition.type); // replace existing
        return { ...u, conditions: [...conditions, condition] };
      });
      return result;
    });
    return result;
  }, []);

  // Conditions: remove a specific condition from a unit. Returns updated units for sync.
  const removeCondition = useCallback((unitId: string, conditionType: ConditionType): Unit[] => {
    let result: Unit[] = [];
    setUnits((prev) => {
      result = prev.map((u) => {
        if (u.id !== unitId) return u;
        return { ...u, conditions: (u.conditions || []).filter((c) => c.type !== conditionType) };
      });
      return result;
    });
    return result;
  }, []);

  // Conditions: tick durations at start of turn. Returns messages + updated units for sync.
  const tickConditions = useCallback((unitId: string): { messages: string[]; units: Unit[] } => {
    const messages: string[] = [];
    let result: Unit[] = [];
    setUnits((prev) => {
      result = prev.map((u) => {
        if (u.id !== unitId || !u.conditions?.length) return u;
        const remaining: ActiveCondition[] = [];
        let mutated = u;
        for (const cond of u.conditions) {
          // Burning deals damage at start of turn
          if (cond.type === 'burning') {
            const burnDmg = Math.floor(Math.random() * 6) + 1;
            messages.push(`${mutated.name} takes ${burnDmg} fire damage from burning!`);
            mutated = { ...mutated, hp: Math.max(0, mutated.hp - burnDmg) };
          }
          // Torch/candle burnout: consumable light sources burn for N turns, then consume one from stack
          if ((cond.type === 'torchlit' || cond.type === 'candlelit') && cond.duration === -1) {
            const burnTurns = cond.type === 'torchlit' ? 10 : 6; // torches 10 turns, candles 6
            const burnMatch = cond.source?.match(/\((\d+)\/(\d+)\)/);
            const currentBurn = burnMatch ? Number(burnMatch[1]) + 1 : 1;
            if (currentBurn >= burnTurns) {
              const ownerChar = characters.find((c) => units.some((un) => un.id === unitId && un.characterId === c.id));
              const lightItem = ownerChar?.inventory?.find((i) => i.appliesCondition === cond.type);
              if (lightItem && (lightItem.quantity ?? 1) > 1) {
                setTimeout(() => setCharacters((prev) => prev.map((ch) => ch.id !== ownerChar!.id ? ch : { ...ch, inventory: ch.inventory.map((i) => i.id === lightItem.id ? { ...i, quantity: (i.quantity || 1) - 1 } : i) })), 0);
                messages.push(`${mutated.name}'s ${cond.type === 'torchlit' ? 'torch' : 'candle'} burns out! (${(lightItem.quantity || 1) - 1} left)`);
                remaining.push({ ...cond, source: `${lightItem.name} (0/${burnTurns})` });
              } else {
                if (lightItem) setTimeout(() => setCharacters((prev) => prev.map((ch) => ch.id !== ownerChar!.id ? ch : { ...ch, inventory: ch.inventory.filter((i) => i.id !== lightItem.id) })), 0);
                messages.push(`${mutated.name}'s last ${cond.type === 'torchlit' ? 'torch' : 'candle'} burns out!`);
              }
            } else {
              remaining.push({ ...cond, source: cond.source?.replace(/\(\d+\/\d+\)/, `(${currentBurn}/${burnTurns})`) || `${cond.type} (${currentBurn}/${burnTurns})` });
            }
          } else if (cond.type === 'lantern' && cond.duration === -1) {
            // Find the character who owns this unit and tick their lantern fuel
            const ownerChar = characters.find((c) => units.some((un) => un.id === unitId && un.characterId === c.id));
            if (ownerChar) {
              const lanternItem = ownerChar.inventory?.find((i) => i.appliesCondition === 'lantern' && i.fuelMax);
              if (lanternItem && (lanternItem.fuelRemaining ?? 0) > 0) {
                // Decrement fuel (deferred to avoid nested setState)
                setTimeout(() => {
                  setCharacters((prevChars) => prevChars.map((ch) => {
                    if (ch.id !== ownerChar.id) return ch;
                    return { ...ch, inventory: ch.inventory.map((i) => i.id === lanternItem.id ? { ...i, fuelRemaining: Math.max(0, (i.fuelRemaining || 0) - 1) } : i) };
                  }));
                }, 0);
                if ((lanternItem.fuelRemaining ?? 0) <= 1) {
                  messages.push(`${mutated.name}'s lantern sputters out — no fuel remaining!`);
                  // Don't keep the condition — skip to removal
                } else {
                  remaining.push(cond);
                }
              } else {
                messages.push(`${mutated.name}'s lantern is out of fuel!`);
                // Remove condition
              }
            } else {
              remaining.push(cond);
            }
          } else if (cond.duration === -1) {
            remaining.push(cond); // permanent until cured
          } else if (cond.duration > 1) {
            remaining.push({ ...cond, duration: cond.duration - 1 });
          } else {
            messages.push(`${mutated.name} is no longer ${cond.type}.`);
          }
        }
        return { ...mutated, conditions: remaining };
      });
      return result;
    });
    return { messages, units: result };
  }, [characters, units, setCharacters]);

  // Spells: cast a spell (check slots, apply damage/healing, consume slot)
  // slotLevel allows upcasting: spend a higher-level slot for extra effect
  const castSpell = useCallback(
    (charId: string, spellId: string, targetUnitId?: string, slotLevel?: number, asRitual?: boolean, _skipCounterspell?: boolean): { success: boolean; message: string } => {
      let result = { success: false, message: '' };
      // Search both the global spell list and the caster's custom spellbook
      const casterChar = characters.find((c) => c.id === charId);
      const spell = SPELL_LIST.find((s) => s.id === spellId) || (casterChar?.customSpells || []).find((s) => s.id === spellId);
      if (!spell) {
        return { success: false, message: 'Unknown spell.' };
      }

      // Ritual casting: no slot consumed, only for ritual-tagged spells and eligible classes
      if (asRitual) {
        if (!spell.isRitual) return { success: false, message: `${spell.name} cannot be cast as a ritual.` };
        if (casterChar) {
          const cls = casterChar.class;
          // Wizard: any ritual in spellbook. Cleric/Druid: any prepared ritual. Others: no ritual casting.
          const canRitual = cls === 'Wizard' || cls === 'Cleric' || cls === 'Druid';
          if (!canRitual) return { success: false, message: `${cls} cannot cast rituals.` };
        }
        result = { success: true, message: '' };
        // Skip slot consumption entirely - fall through to spell effects
      }

      // Determine the slot level to consume (default to spell's base level)
      const castLevel = spell.level === 0 ? 0 : Math.max(spell.level, slotLevel || spell.level);

      if (!asRitual) {
        setCharacters((prev) =>
          prev.map((c) => {
            if (c.id !== charId) return c;
            if (castLevel > 0) {
              const maxSlots = getSpellSlots(c.class, c.level);
              const used = c.spellSlotsUsed || {};
              const slotsAvail = (maxSlots[castLevel] || 0) - (used[castLevel] || 0);
              if (slotsAvail <= 0) {
                result = { success: false, message: `No level ${castLevel} spell slots remaining!` };
                return c;
              }
              const newUsed = { ...used, [castLevel]: (used[castLevel] || 0) + 1 };
              result = { success: true, message: '' };
              return { ...c, spellSlotsUsed: newUsed };
            }
            result = { success: true, message: '' };
            return c;
          })
        );
      }

      if (result.success) {
        const char = characters.find((c) => c.id === charId);
        const casterName = char?.name || 'Caster';
        const upcastLevels = castLevel - spell.level; // 0 if not upcasting

        // Counterspell check: before the spell takes effect, nearby enemies can attempt to counter.
        // Skip for cantrips, Counterspell itself, rituals, and internal replays after counterspell fails.
        if (spell.level > 0 && spell.id !== 'counterspell' && !asRitual && !pendingReaction && !_skipCounterspell) {
          const casterUnit = units.find((u) => u.characterId === charId);
          const casterPos = casterUnit ? mapPositions.find((p) => p.unitId === casterUnit.id) : null;

          if (casterUnit?.type === 'player' && casterPos) {
            // Player is casting - check if any enemy within 60ft (12 cells) can Counterspell
            for (const enemy of units.filter((u) => u.type === 'enemy' && u.hp > 0 && !u.reactionUsed)) {
              const ePos = mapPositions.find((p) => p.unitId === enemy.id);
              if (!ePos) continue;
              const dist = Math.max(Math.abs(ePos.col - casterPos.col), Math.abs(ePos.row - casterPos.row));
              if (dist > 12) continue; // 60ft = 12 cells
              // Check if enemy has Counterspell ability (enemy AI has a 50% chance to attempt)
              const hasCounterspell = (enemy.abilities || []).some((a) => a.name.toLowerCase().includes('counterspell'));
              if (!hasCounterspell) continue;
              if (Math.random() < 0.5) continue; // 50% chance to attempt
              // AI auto-resolves: Counterspell at level 3. Same level or lower = auto-succeed.
              const counterLevel = 3;
              if (spell.level <= counterLevel) {
                // Auto-succeed: negate the spell
                setUnits((prev) => prev.map((u) => u.id === enemy.id ? { ...u, reactionUsed: true } : u));
                concentrationBreakMessages.current.push(`${enemy.name} casts Counterspell! ${spell.name} is negated!`);
                return { success: true, message: `${casterName} casts ${spell.name}, but ${enemy.name} Counterspells it! The spell fizzles.` };
              }
              // Higher level: ability check DC 10 + spell level
              const dc = 10 + spell.level;
              const checkRoll = Math.floor(Math.random() * 20) + 1;
              const checkMod = 3; // assume +3 spellcasting mod for enemies
              setUnits((prev) => prev.map((u) => u.id === enemy.id ? { ...u, reactionUsed: true } : u));
              if (checkRoll + checkMod >= dc) {
                concentrationBreakMessages.current.push(`${enemy.name} casts Counterspell! Check ${checkRoll}+${checkMod}=${checkRoll + checkMod} vs DC ${dc} - SUCCESS! ${spell.name} negated!`);
                return { success: true, message: `${casterName} casts ${spell.name}, but ${enemy.name} Counterspells it! (${checkRoll}+${checkMod} vs DC ${dc}) The spell fizzles.` };
              }
              concentrationBreakMessages.current.push(`${enemy.name} attempts Counterspell! Check ${checkRoll}+${checkMod}=${checkRoll + checkMod} vs DC ${dc} - FAILED! ${spell.name} goes through!`);
              break; // only one counterspell attempt per spell
            }
          } else if (casterUnit?.type === 'enemy' && casterPos) {
            // Enemy is casting - check if any player within 60ft can Counterspell
            for (const player of units.filter((u) => u.type === 'player' && u.hp > 0 && !u.reactionUsed)) {
              if (!player.characterId) continue;
              const pChar = characters.find((c) => c.id === player.characterId);
              if (!pChar) continue;
              const pPos = mapPositions.find((p) => p.unitId === player.id);
              if (!pPos) continue;
              const dist = Math.max(Math.abs(pPos.col - casterPos.col), Math.abs(pPos.row - casterPos.row));
              if (dist > 12) continue; // 60ft = 12 cells
              // Check if player has Counterspell
              const hasCS = SPELL_LIST.some((s) => s.id === 'counterspell' && s.classes.includes(pChar.class));
              if (!hasCS) continue;
              // Check if they have a level 3+ slot available
              const slots = getSpellSlots(pChar.class, pChar.level);
              const usedSlots = pChar.spellSlotsUsed || {};
              const hasSlot = Object.entries(slots).some(([lvl, max]) => Number(lvl) >= 3 && (max as number) - (usedSlots[Number(lvl)] || 0) > 0);
              if (!hasSlot) continue;
              // Trigger player reaction prompt
              setPendingReaction({
                type: 'counterspell',
                targetUnitId: player.id,
                sourceUnitId: casterUnit.id,
                damage: 0,
                spellName: spell.name,
                spellLevel: spell.level,
                casterId: charId,
                spellId: spell.id,
                targetOfSpell: targetUnitId,
                slotLevel: castLevel,
              });
              return { success: true, message: `${casterName} begins casting ${spell.name}... (awaiting Counterspell reaction)` };
            }
          }
        }

        // Concentration: if this spell requires concentration, drop any existing concentration
        if (spell.isConcentration) {
          const casterUnit = units.find((u) => u.characterId === charId);
          if (casterUnit?.concentratingOn) {
            // Drop old concentration - remove conditions applied by the old spell
            const oldSpellName = casterUnit.concentratingOn;
            setUnits((prev) =>
              prev.map((u) => ({
                ...u,
                conditions: (u.conditions || []).filter((c) => c.source !== casterName),
                concentratingOn: u.id === casterUnit.id ? undefined : u.concentratingOn,
              }))
            );
            result.message = `${casterName} breaks concentration on ${oldSpellName}. `;
          }
          if (casterUnit) {
            setUnits((prev) => prev.map((u) => (u.id === casterUnit.id ? { ...u, concentratingOn: spell.name } : u)));
          }
        }

        // Spell attack bonus: proficiency + casting stat mod (used for attackRoll spells)
        const castingStatMap: Record<string, StatName> = {
          Wizard: 'INT', Sorcerer: 'CHA', Cleric: 'WIS', Druid: 'WIS',
          Bard: 'CHA', Warlock: 'CHA', Paladin: 'CHA', Ranger: 'WIS',
        };
        const castingStat = char ? (castingStatMap[char.class] || 'INT') : 'INT';
        const castMod = char ? Math.floor((char.stats[castingStat] - 10) / 2) : 0;
        const profBonus = char ? Math.ceil(char.level / 4) + 1 : 2;
        const spellAttackBonus = profBonus + castMod;
        const spellDC = 8 + profBonus + castMod;

        // Saving throw: if spell has saveStat, target rolls to resist
        // Auto-fail STR/DEX saves for paralyzed, stunned, unconscious targets
        let targetSaved = false;
        if (spell.saveStat && targetUnitId) {
          const target = units.find((u) => u.id === targetUnitId);
          if (target && char) {
            const targetConds = (target.conditions || []).map((c) => c.type);
            const targetFx = getConditionEffects(targetConds);
            if (targetFx.autoFailStrDex && (spell.saveStat === 'STR' || spell.saveStat === 'DEX')) {
              targetSaved = false; // auto-fail
            } else {
              const saveRoll = Math.floor(Math.random() * 20) + 1;
              const targetSaveMod = spell.saveStat === 'DEX' ? target.dexMod || 0 : 0;
              const condSaveMod = (target.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.saveMod || 0), 0);
              const totalSave = saveRoll + targetSaveMod + condSaveMod;
              targetSaved = totalSave >= spellDC;
            }
          }
        }

        // Spell attack roll: d20 + spell attack bonus vs target AC
        // Conditions grant advantage/disadvantage per D&D 5e rules
        let spellAttackHit = true;
        let spellAttackCrit = false;
        let spellAttackRollValue = 0;
        let spellConditionNote = '';
        if (spell.attackRoll && targetUnitId) {
          const target = units.find((u) => u.id === targetUnitId);
          if (target) {
            const casterUnit = units.find((u) => u.characterId === charId);
            const atkConds = (casterUnit?.conditions || []).map((c) => c.type);
            const defConds = (target.conditions || []).map((c) => c.type);
            const atkFx = getConditionEffects(atkConds);
            const defFx = getConditionEffects(defConds);
            let advantage = atkFx.attackAdvantage || defFx.defenseAdvantage;
            let disadvantage = atkFx.attackDisadvantage;
            if (advantage && disadvantage) { advantage = false; disadvantage = false; }
            const r1 = Math.floor(Math.random() * 20) + 1;
            const r2 = Math.floor(Math.random() * 20) + 1;
            spellAttackRollValue = advantage ? Math.max(r1, r2) : disadvantage ? Math.min(r1, r2) : r1;
            spellAttackCrit = spellAttackRollValue === 20;
            // Melee crits from paralyzed/unconscious targets
            if (defFx.meleeCrit && spell.range.toLowerCase() === 'touch') spellAttackCrit = true;
            const totalAttack = spellAttackRollValue + spellAttackBonus;
            const targetAC = target.ac + (target.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.acMod || 0), 0);
            spellAttackHit = spellAttackCrit || totalAttack >= targetAC;
            if (advantage) spellConditionNote = ' [advantage]';
            else if (disadvantage) spellConditionNote = ' [disadvantage]';
          }
        }

        if (spell.damage) {
          // Cantrip scaling: damage dice increase at levels 5, 11, 17
          let effectiveDamage = spell.damage;
          if (spell.level === 0 && casterChar) {
            const lvl = casterChar.level;
            const dieMatch = spell.damage.match(/^(\d+)(d\d+)$/);
            if (dieMatch) {
              const baseDice = parseInt(dieMatch[1], 10);
              const dieSuffix = dieMatch[2];
              const scaleMultiplier = lvl >= 17 ? 4 : lvl >= 11 ? 3 : lvl >= 5 ? 2 : 1;
              effectiveDamage = `${baseDice * scaleMultiplier}${dieSuffix}`;
            }
          }

          // Upcast bonus: add 1 die per slot level above base for damage spells
          // Magic Missile is special: +1 dart (1d4+1) per upcast level
          if (upcastLevels > 0 && spell.level > 0) {
            if (spell.id === 'magic-missile') {
              // Base: 3d4+3 at level 1. Each upcast adds 1d4+1 (one more dart).
              const baseDarts = 3;
              const totalDarts = baseDarts + upcastLevels;
              effectiveDamage = `${totalDarts}d4+${totalDarts}`;
            } else {
              const dieMatch = effectiveDamage.match(/^(\d+)(d\d+)(\+\d+)?$/);
              if (dieMatch) {
                const baseDice = parseInt(dieMatch[1], 10);
                const dieSuffix = dieMatch[2];
                const bonusPart = dieMatch[3] || '';
                effectiveDamage = `${baseDice + upcastLevels}${dieSuffix}${bonusPart}`;
              }
            }
          }

          // Attack roll spells: miss = no damage, crit = double dice
          if (spell.attackRoll && targetUnitId) {
            const target = units.find((u) => u.id === targetUnitId);
            const targetName = target?.name || 'Target';
            const targetAC = target ? target.ac + (target.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.acMod || 0), 0) : 10;
            const totalAtk = spellAttackRollValue + spellAttackBonus;
            if (!spellAttackHit) {
              result.message += `${casterName} casts ${spell.name}: ${totalAtk} (${spellAttackRollValue}+${spellAttackBonus}) vs AC ${targetAC} - MISS!${spellConditionNote}`;
            } else {
              let dmg = rollSpellDamage(effectiveDamage);
              if (spellAttackCrit) dmg = dmg * 2;
              damageUnit(targetUnitId, dmg);
              const critTag = spellAttackCrit ? 'CRITICAL HIT! ' : 'HIT! ';
              result.message += `${casterName} casts ${spell.name}: ${totalAtk} (${spellAttackRollValue}+${spellAttackBonus}) vs AC ${targetAC} - ${critTag}${effectiveDamage} -> ${dmg} damage${spellConditionNote}`;
              if (spell.appliesCondition && !targetSaved) {
                applyCondition(targetUnitId, { type: spell.appliesCondition, duration: spell.conditionDuration || 2, source: casterName });
                result.message += ` ${targetName} is ${spell.appliesCondition}!`;
              }
            }
          } else {
            // Save-based or auto-hit damage spells
            let dmg = rollSpellDamage(effectiveDamage);
            if (targetSaved) dmg = Math.floor(dmg / 2);
            if (targetUnitId) damageUnit(targetUnitId, dmg);
            const targetName = units.find((u) => u.id === targetUnitId)?.name || 'Target';
            result.message += targetSaved
              ? `${casterName} casts ${spell.name}! ${targetName} saves - ${dmg} damage (half).`
              : `${casterName} casts ${spell.name} for ${dmg} damage!`;
            if (spell.appliesCondition && targetUnitId && !targetSaved) {
              applyCondition(targetUnitId, { type: spell.appliesCondition, duration: spell.conditionDuration || 2, source: casterName });
              result.message += ` ${units.find((u) => u.id === targetUnitId)?.name || 'Target'} is ${spell.appliesCondition}!`;
            } else if (spell.appliesCondition && targetSaved) {
              result.message += ` ${units.find((u) => u.id === targetUnitId)?.name || 'Target'} resists the ${spell.appliesCondition} effect.`;
            }
          }
        } else if (spell.healAmount) {
          if (char) {
            // Upcast healing: Cure Wounds +1d8, Healing Word +1d4 per slot above base
            let healTotal = spell.healAmount;
            if (upcastLevels > 0 && spell.level > 0) {
              const healDie = spell.id === 'healing-word' ? 4 : 8; // Healing Word = d4, Cure Wounds = d8
              for (let i = 0; i < upcastLevels; i++) {
                healTotal += Math.floor(Math.random() * healDie) + 1;
              }
            }
            const healed = Math.min(healTotal, char.maxHp - char.hp);
            setCharacters((prev) =>
              prev.map((c) => {
                if (c.id !== charId) return c;
                let updated = { ...c, hp: Math.min(c.maxHp, c.hp + healTotal) };
                if (c.condition === 'unconscious' || c.condition === 'stabilized') {
                  updated = { ...updated, condition: 'normal' as const, deathSaves: { successes: 0, failures: 0 } };
                }
                return updated;
              })
            );
            const upcastNote = upcastLevels > 0 ? ` (upcast to level ${castLevel})` : '';
            result.message += `${casterName} casts ${spell.name}${upcastNote}, restoring ${healed} HP!`;
          } else {
            result.message += `${casterName} casts ${spell.name}.`;
          }
        } else if (spell.appliesCondition && targetUnitId) {
          // Pure condition spell (like Hold Person with no damage)
          const targetName = units.find((u) => u.id === targetUnitId)?.name || 'Target';
          if (targetSaved) {
            result.message += `${casterName} casts ${spell.name}! ${targetName} resists with a successful save.`;
          } else {
            applyCondition(targetUnitId, { type: spell.appliesCondition, duration: spell.conditionDuration || 2, source: casterName });
            result.message += `${casterName} casts ${spell.name}! ${targetName} is ${spell.appliesCondition}!`;
          }
          // Hold Person upcast: note that additional creatures can be targeted
          if (spell.id === 'hold-person' && upcastLevels > 0) {
            result.message += ` (Upcast to ${castLevel}: can target ${1 + upcastLevels} creatures)`;
          }
        } else if (spell.id === 'dispel-magic' && targetUnitId) {
          // Dispel Magic: strip all magical conditions from target
          const MAGICAL_CONDITIONS: Set<string> = new Set(['blessed', 'hexed', 'darkvision', 'daylight', 'frightened', 'stunned', 'inspired', 'burning']);
          const target = units.find((u) => u.id === targetUnitId);
          if (target) {
            const magicalConds = (target.conditions || []).filter((c) => MAGICAL_CONDITIONS.has(c.type));
            if (magicalConds.length > 0) {
              setUnits((prev) => prev.map((u) => u.id === targetUnitId
                ? { ...u, conditions: (u.conditions || []).filter((c) => !MAGICAL_CONDITIONS.has(c.type)), concentratingOn: undefined }
                : u));
              result.message = `${casterName} casts Dispel Magic! ${magicalConds.length} effect${magicalConds.length !== 1 ? 's' : ''} removed from ${target.name}: ${magicalConds.map((c) => c.type).join(', ')}.`;
            } else {
              result.message = `${casterName} casts Dispel Magic on ${target.name}, but there are no magical effects to dispel.`;
            }
          }
        } else if (spell.appliesCondition && !targetUnitId) {
          // Self-targeting condition spell (Daylight, Darkvision on self, etc.)
          const casterUnit = units.find((u) => u.characterId === charId);
          if (casterUnit) {
            applyCondition(casterUnit.id, { type: spell.appliesCondition, duration: spell.conditionDuration || 10, source: casterName });
            result.message = `${casterName} casts ${spell.name} on themselves! ${CONDITION_EFFECTS[spell.appliesCondition]?.description || ''}`;
          } else {
            result.message = `${casterName} casts ${spell.name}. ${spell.description}`;
          }
        } else {
          result.message = `${casterName} casts ${spell.name}. ${spell.description}`;
        }
        if (asRitual) {
          result.message += ' (Cast as ritual - no slot used, 10 minutes)';
        } else if (castLevel > 0) {
          const upcastTag = upcastLevels > 0 ? ` (Level ${castLevel} slot used, upcast from ${spell.level})` : ` (Level ${castLevel} slot used)`;
          result.message += upcastTag;
        }

        // Wild Magic Surge check: Sorcerers casting leveled spells roll d20, nat 1 = surge
        if (spell.level > 0 && casterChar?.class === 'Sorcerer') {
          const wildCheck = Math.floor(Math.random() * 20) + 1;
          if (wildCheck === 1) {
            // Synchronous roll from the table (lazy import would be async — use inline d100)
            const d100 = Math.floor(Math.random() * 100) + 1;
            result.message += ` ⚡ WILD MAGIC SURGE! (d100: ${d100})`;
            // The full effect text will be resolved by the caller via the wildMagic module
            (result as Record<string, unknown>).wildMagicRoll = d100;
          }
        }
      }
      return result;
    },
    [characters, damageUnit, applyCondition, units]
  );

  // Keep castSpellRef in sync so resolveReaction can call castSpell without circular deps
  castSpellRef.current = castSpell;

  // Spells: restore all spell slots (called on long rest)
  const restoreSpellSlots = useCallback((charId: string) => {
    setCharacters((prev) => prev.map((c) => (c.id === charId ? { ...c, spellSlotsUsed: {} } : c)));
  }, []);

  // Class abilities: use the class-specific ability (1/rest cooldown)
  const useClassAbility = useCallback(
    (charId: string, targetUnitId?: string): { success: boolean; message: string } => {
      const char = characters.find((c) => c.id === charId);
      if (!char) return { success: false, message: 'No character found.' };
      const ability = getClassAbility(char.class);
      if (!ability) return { success: false, message: `${char.class} has no special ability.` };
      if (char.classAbilityUsed) return { success: false, message: `${ability.name} already used — rest to recharge.` };

      // Mark as used
      setCharacters((prev) => prev.map((c) => (c.id === charId ? { ...c, classAbilityUsed: true } : c)));

      const casterName = char.name;
      let msg = '';

      if (ability.type === 'heal' && ability.healFormula) {
        let healAmt = 0;
        if (ability.healFormula === 'level_d10') healAmt = Math.floor(Math.random() * 10) + 1 + char.level;
        else if (ability.healFormula === 'level_x5') healAmt = char.level * 5;
        else if (ability.healFormula === 'level_d6') healAmt = (Math.floor(Math.random() * 6) + 1) * Math.max(1, Math.ceil(char.level / 2));
        const healed = Math.min(healAmt, char.maxHp - char.hp);
        setCharacters((prev) =>
          prev.map((c) => {
            if (c.id !== charId) return c;
            let updated = { ...c, hp: Math.min(c.maxHp, c.hp + healAmt) };
            if (c.condition === 'unconscious' || c.condition === 'stabilized') {
              updated = { ...updated, condition: 'normal' as Condition, deathSaves: { successes: 0, failures: 0 } };
            }
            return updated;
          })
        );
        msg = `${casterName} uses ${ability.name}, restoring ${healed} HP!`;
      } else if (ability.type === 'buff' && ability.appliesCondition) {
        // Buff self or target
        if (ability.selfOnly) {
          const playerUnit = units.find((u) => u.characterId === charId);
          if (playerUnit) {
            applyCondition(playerUnit.id, { type: ability.appliesCondition, duration: ability.conditionDuration || 3, source: ability.name });
            msg = `${casterName} uses ${ability.name}! ${CONDITION_EFFECTS[ability.appliesCondition].description} for ${ability.conditionDuration || 3} rounds.`;
          } else {
            msg = `${casterName} uses ${ability.name}!`;
          }
        } else if (targetUnitId) {
          applyCondition(targetUnitId, { type: ability.appliesCondition, duration: ability.conditionDuration || 3, source: casterName });
          const targetName = units.find((u) => u.id === targetUnitId)?.name || 'Target';
          msg = `${casterName} uses ${ability.name} on ${targetName}! They are ${ability.appliesCondition} for ${ability.conditionDuration || 3} rounds.`;
        } else {
          // No target — refund
          setCharacters((prev) => prev.map((c) => (c.id === charId ? { ...c, classAbilityUsed: false } : c)));
          return { success: false, message: 'Select an enemy target first.' };
        }
      } else if (ability.type === 'attack' && ability.damage) {
        if (targetUnitId) {
          const dmg = rollSpellDamage(ability.damage);
          damageUnit(targetUnitId, dmg);
          const targetName = units.find((u) => u.id === targetUnitId)?.name || 'Target';
          msg = `${casterName} uses ${ability.name} on ${targetName} for ${dmg} damage!`;
        } else {
          setCharacters((prev) => prev.map((c) => (c.id === charId ? { ...c, classAbilityUsed: false } : c)));
          return { success: false, message: 'Select an enemy target first.' };
        }
      } else if (ability.type === 'utility') {
        // Arcane Recovery: restore lowest empty spell slot
        const slots = getSpellSlots(char.class, char.level);
        const used = char.spellSlotsUsed || {};
        let recovered = false;
        for (const lvl of Object.keys(slots).map(Number).sort()) {
          if ((used[lvl] || 0) > 0) {
            setCharacters((prev) =>
              prev.map((c) => {
                if (c.id !== charId) return c;
                const newUsed = { ...c.spellSlotsUsed };
                newUsed[lvl] = Math.max(0, (newUsed[lvl] || 0) - 1);
                return { ...c, spellSlotsUsed: newUsed };
              })
            );
            msg = `${casterName} uses ${ability.name}, recovering a level ${lvl} spell slot!`;
            recovered = true;
            break;
          }
        }
        if (!recovered) {
          setCharacters((prev) => prev.map((c) => (c.id === charId ? { ...c, classAbilityUsed: false } : c)));
          return { success: false, message: 'No spell slots to recover.' };
        }
      }

      return { success: true, message: msg || `${casterName} uses ${ability.name}!` };
    },
    [characters, units, applyCondition, damageUnit]
  );

  // ASI: increase one stat by 2, or two different stats by 1 each (max 20)
  const applyASI = useCallback(
    (charId: string, stat1: StatName, stat2?: StatName): { success: boolean; message: string } => {
      const char = characters.find((c) => c.id === charId);
      if (!char) return { success: false, message: 'Character not found.' };
      if (!hasPendingASI(char)) return { success: false, message: 'No ability score improvement available.' };

      setCharacters((prev) =>
        prev.map((c) => {
          if (c.id !== charId) return c;
          const newStats = { ...c.stats };
          if (stat2 && stat2 !== stat1) {
            // +1 to two different stats
            newStats[stat1] = Math.min(20, newStats[stat1] + 1);
            newStats[stat2] = Math.min(20, newStats[stat2] + 1);
          } else {
            // +2 to one stat
            newStats[stat1] = Math.min(20, newStats[stat1] + 2);
          }
          // Recalculate HP if CON changed
          const oldConMod = Math.floor((c.stats.CON - 10) / 2);
          const newConMod = Math.floor((newStats.CON - 10) / 2);
          const hpDelta = (newConMod - oldConMod) * c.level;
          return {
            ...c,
            stats: newStats,
            maxHp: c.maxHp + hpDelta,
            hp: c.hp + hpDelta,
            asiChoicesMade: (c.asiChoicesMade || 0) + 1,
          };
        })
      );

      const label = stat2 && stat2 !== stat1 ? `+1 ${stat1}, +1 ${stat2}` : `+2 ${stat1}`;
      return { success: true, message: `${char.name} improves ability scores: ${label}!` };
    },
    [characters]
  );

  // Select a feat as an alternative to ASI
  const selectFeat = useCallback(
    (charId: string, featId: string): { success: boolean; message: string } => {
      const char = characters.find((c) => c.id === charId);
      if (!char) return { success: false, message: 'Character not found.' };
      if (!hasPendingASI(char)) return { success: false, message: 'No feat selection available.' };
      if ((char.feats || []).includes(featId)) return { success: false, message: 'You already have this feat.' };

      const feat = FEATS.find((f) => f.id === featId);
      if (!feat) return { success: false, message: 'Feat not found.' };

      setCharacters((prev) =>
        prev.map((c) => {
          if (c.id !== charId) return c;
          const newStats = { ...c.stats };
          // Apply stat bonuses
          if (feat.statBonuses) {
            for (const [stat, bonus] of Object.entries(feat.statBonuses)) {
              newStats[stat as StatName] = Math.min(20, newStats[stat as StatName] + (bonus || 0));
            }
          }
          // Apply HP per level bonus
          let hpBonus = 0;
          if (feat.maxHpPerLevel) hpBonus = feat.maxHpPerLevel * c.level;
          // CON change HP recalc
          const oldConMod = Math.floor((c.stats.CON - 10) / 2);
          const newConMod = Math.floor((newStats.CON - 10) / 2);
          const conHpDelta = (newConMod - oldConMod) * c.level;
          // Apply AC bonus
          const acDelta = feat.acBonus || 0;
          return {
            ...c,
            stats: newStats,
            maxHp: c.maxHp + hpBonus + conHpDelta,
            hp: c.hp + hpBonus + conHpDelta,
            ac: c.ac + acDelta,
            feats: [...(c.feats || []), featId],
            asiChoicesMade: (c.asiChoicesMade || 0) + 1,
          };
        })
      );

      return { success: true, message: `${char.name} gains the ${feat.name} feat!` };
    },
    [characters]
  );

  // Combat: remove a unit (dead enemy, etc). Returns updated units for sync.
  const removeUnit = useCallback((unitId: string): Unit[] => {
    let result: Unit[] = [];
    setUnits((prev) => {
      result = prev.filter((u) => u.id !== unitId);
      return result;
    });
    return result;
  }, []);

  // Roll initiative for all units, sort by result (descending), mark first as current turn.
  // Accepts optional manual overrides: { unitId: number } for player-entered values.
  // Returns sorted units for multiplayer sync.
  const rollInitiative = useCallback((manualOverrides?: Record<string, number>): Unit[] => {
    let result: Unit[] = [];
    setUnits((prev) => {
      const withInitiative = prev.map((u) => {
        // DEX mod from character (players) or unit stat (enemies)
        let dexMod = u.dexMod || 0;
        let featInitBonus = 0;
        if (u.characterId) {
          const char = characters.find((c) => c.id === u.characterId);
          if (char) {
            dexMod = Math.floor((char.stats.DEX - 10) / 2);
            // Alert feat: +5 initiative
            featInitBonus = (char.feats || []).reduce((sum, fid) => {
              const f = FEATS.find((ft) => ft.id === fid);
              return sum + (f?.initiativeBonus || 0);
            }, 0);
          }
        }
        // Use manual override if provided, otherwise auto-roll
        const roll = (manualOverrides && manualOverrides[u.id] !== undefined)
          ? manualOverrides[u.id]
          : Math.floor(Math.random() * 20) + 1 + dexMod + featInitBonus;
        // Reset movement for combat start; calculate speed from character data
        let speed = u.speed || 6;
        if (u.characterId) {
          const char = characters.find((c) => c.id === u.characterId);
          if (char && char.class === 'Monk') {
            speed = 6 + Math.floor(Math.max(0, char.level - 1) / 4) + (char.level >= 2 ? 2 : 0);
          }
        }
        // Surprise detection: hidden players surprise enemies (and vice versa)
        const isHidden = u.conditions?.some((c) => c.type === 'hidden');
        const conditions = [...(u.conditions || [])];
        // If enemy and any player was hidden, this enemy is surprised
        if (u.type === 'enemy' && prev.some((p) => p.type === 'player' && p.conditions?.some((c) => c.type === 'hidden'))) {
          const stealthDC = 10 + dexMod; // rough passive perception
          const partyStealthRoll = Math.floor(Math.random() * 20) + 1 + 3; // party average
          if (partyStealthRoll >= stealthDC) conditions.push({ type: 'surprised', duration: 1, source: 'Ambush' });
        }
        return { ...u, initiative: roll, isCurrentTurn: false, movementUsed: 0, reactionUsed: false, bonusActionUsed: false, disengaged: false, speed, conditions };
      });
      // Sort by initiative descending, then DEX mod tiebreaker, then stable ID comparison
      withInitiative.sort((a, b) => {
        if (b.initiative !== a.initiative) return b.initiative - a.initiative;
        const aDex = a.characterId ? Math.floor(((characters.find((c) => c.id === a.characterId)?.stats.DEX ?? 10) - 10) / 2) : (a.dexMod || 0);
        const bDex = b.characterId ? Math.floor(((characters.find((c) => c.id === b.characterId)?.stats.DEX ?? 10) - 10) / 2) : (b.dexMod || 0);
        if (bDex !== aDex) return bDex - aDex;
        return a.id < b.id ? -1 : 1; // stable tiebreaker
      });
      // Mark first unit as current turn
      if (withInitiative.length > 0) {
        withInitiative[0].isCurrentTurn = true;
      }
      result = withInitiative;
      return withInitiative;
    });
    setInCombat(true);
    setCombatRound(1);
    setTurnIndex(0);
    return result;
  }, [characters]);

  // Advance to next turn in initiative order. Returns units + turn info for sync.
  const nextTurn = useCallback((): { units: Unit[]; turnIndex: number; newRound: boolean; deathSaveMessage?: string } => {
    let turnResult: { units: Unit[]; turnIndex: number; newRound: boolean; deathSaveMessage?: string } = { units: [], turnIndex: 0, newRound: false };
    setUnits((prev) => {
      const alive = prev.filter((u) => u.hp > 0);
      if (alive.length === 0) {
        turnResult = { units: prev, turnIndex: 0, newRound: false };
        return prev;
      }

      // Find current turn unit
      const currentIdx = prev.findIndex((u) => u.isCurrentTurn);
      const cleared = prev.map((u) => ({ ...u, isCurrentTurn: false }));

      // Decrement condition durations on the unit whose turn just ended
      if (currentIdx >= 0 && cleared[currentIdx]) {
        const expiredNames: string[] = [];
        cleared[currentIdx].conditions = (cleared[currentIdx].conditions || []).filter((c) => {
          if (c.duration === -1) return true; // permanent until removed
          c.duration -= 1;
          if (c.duration <= 0) {
            expiredNames.push(c.type);
            return false;
          }
          return true;
        });
        if (expiredNames.length > 0) {
          concentrationBreakMessages.current.push(`${cleared[currentIdx].name}'s conditions expired: ${expiredNames.join(', ')}`);
        }
        // Remove Barbarian rage resistances when rage expires
        if (expiredNames.includes('raging') && cleared[currentIdx].resistances) {
          cleared[currentIdx].resistances = cleared[currentIdx].resistances!.filter((r) => !['bludgeoning', 'piercing', 'slashing'].includes(r));
        }
      }

      // Find next unit after current (include unconscious players for death saves, skip dead enemies)
      let nextIdx = currentIdx + 1;
      let wrapped = false;
      while (true) {
        if (nextIdx >= cleared.length) {
          nextIdx = 0;
          wrapped = true;
        }
        const candidate = cleared[nextIdx];
        // Include: alive units OR unconscious player units (for death saves)
        if (candidate.hp > 0 || (candidate.hp === 0 && candidate.type === 'player')) break;
        nextIdx++;
        if (nextIdx === currentIdx) break; // safety: all dead somehow
      }

      cleared[nextIdx].isCurrentTurn = true;
      cleared[nextIdx].movementUsed = 0; // reset movement for new turn
      cleared[nextIdx].reactionUsed = false; // reset reaction for new turn
      cleared[nextIdx].bonusActionUsed = false; // reset bonus action for new turn
      cleared[nextIdx].disengaged = false; // reset disengage for new turn
      cleared[nextIdx].readiedAction = undefined; // readied actions expire on your next turn

      // Hazard terrain damage + chain reactions
      const unitPos = mapPositions.find((p) => p.unitId === cleared[nextIdx].id);
      if (unitPos && cleared[nextIdx].hp > 0) {
        const cellType = terrain[unitPos.row]?.[unitPos.col];
        const hazard = cellType ? HAZARD_DAMAGE[cellType] : undefined;
        if (hazard && hazard.damage > 0) {
          cleared[nextIdx].hp = Math.max(0, cleared[nextIdx].hp - hazard.damage);
          concentrationBreakMessages.current.push(`${cleared[nextIdx].name} takes ${hazard.damage} ${hazard.type} damage from ${cellType}!`);
        }
      }

      // Fire spread chain reaction: lava/fire terrain has 15% chance to spread to adjacent grass/floor cells
      if (terrain.length > 0 && Math.random() < 0.15) {
        const fireTypes = new Set(['lava']);
        let spread = false;
        for (let r = 0; r < terrain.length && !spread; r++) {
          for (let c = 0; c < (terrain[r]?.length || 0) && !spread; c++) {
            if (!fireTypes.has(terrain[r][c])) continue;
            const neighbors = [[r-1,c],[r+1,c],[r,c-1],[r,c+1]];
            for (const [nr, nc] of neighbors) {
              if (nr >= 0 && nr < terrain.length && nc >= 0 && nc < (terrain[nr]?.length || 0)) {
                if (terrain[nr][nc] === 'floor' || terrain[nr][nc] === 'grass') {
                  terrain[nr][nc] = 'lava' as TerrainType;
                  spread = true;
                  concentrationBreakMessages.current.push('🔥 Fire spreads to an adjacent cell!');
                  break;
                }
              }
            }
          }
        }
      }

      // Death save automation: if the unit starting their turn is unconscious (0 HP), roll a death save
      if (cleared[nextIdx].hp === 0 && cleared[nextIdx].type === 'player' && cleared[nextIdx].characterId) {
        const roll = Math.floor(Math.random() * 20) + 1;
        const char = characters.find((c) => c.id === cleared[nextIdx].characterId);
        if (char) {
          const saves = { ...(char.deathSaves || { successes: 0, failures: 0 }) };
          let message = '';
          if (roll === 20) {
            // Nat 20: regain 1 HP
            cleared[nextIdx].hp = 1;
            saves.successes = 0;
            saves.failures = 0;
            message = `${cleared[nextIdx].name} rolls a natural 20 on their death save! They regain 1 HP and are conscious!`;
            updateCharacter(char.id, { deathSaves: saves, hp: 1, condition: 'normal' });
          } else if (roll === 1) {
            // Nat 1: 2 failures
            saves.failures = Math.min(3, saves.failures + 2);
            message = `${cleared[nextIdx].name} rolls a 1 on their death save — two failures! (${saves.successes} successes, ${saves.failures} failures)`;
            updateCharacter(char.id, { deathSaves: saves, condition: saves.failures >= 3 ? 'dead' : 'unconscious' });
          } else if (roll >= 10) {
            saves.successes = Math.min(3, saves.successes + 1);
            message = `${cleared[nextIdx].name} rolls ${roll} — death save success! (${saves.successes}/3 successes, ${saves.failures}/3 failures)`;
            if (saves.successes >= 3) {
              message = `${cleared[nextIdx].name} rolls ${roll} — stabilized! (3 successes)`;
              updateCharacter(char.id, { deathSaves: { successes: 0, failures: 0 }, condition: 'stabilized' });
            } else {
              updateCharacter(char.id, { deathSaves: saves });
            }
          } else {
            saves.failures = Math.min(3, saves.failures + 1);
            message = `${cleared[nextIdx].name} rolls ${roll} — death save failure! (${saves.successes}/3 successes, ${saves.failures}/3 failures)`;
            if (saves.failures >= 3) {
              message = `${cleared[nextIdx].name} rolls ${roll} — DEAD. (3 failures)`;
              updateCharacter(char.id, { deathSaves: { successes: 0, failures: 0 }, condition: 'dead' });
              cleared[nextIdx].hp = -1; // mark as truly dead
            } else {
              updateCharacter(char.id, { deathSaves: saves });
            }
          }
          // Return the death save message for the caller to log
          if (message) turnResult.deathSaveMessage = message;
        }
      }

      const isNewRound = wrapped || nextIdx <= currentIdx;
      if (isNewRound) {
        setCombatRound((r) => r + 1);
      }
      setTurnIndex(nextIdx);
      turnResult = { ...turnResult, units: cleared, turnIndex: nextIdx, newRound: isNewRound };
      return cleared;
    });
    return turnResult;
  }, []);

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        setCurrentPlayer,
        players,
        setPlayers,
        units,
        setUnits,
        characters,
        addCharacter,
        removeCharacter,
        updateCharacter,
        grantXP,
        restCharacter,
        addItem,
        removeItem,
        equipItem,
        unequipItem,
        useItem,
        buyItem,
        sellItem,
        tradeItem,
        castSpell,
        restoreSpellSlots,
        useClassAbility,
        applyASI,
        selectFeat,
        applyCondition,
        removeCondition,
        tickConditions,
        rolls,
        addRoll,
        clearRolls,
        selectedUnitId,
        setSelectedUnitId,
        inCombat,
        setInCombat,
        combatRound,
        setCombatRound,
        turnIndex,
        setTurnIndex,
        terrain,
        setTerrain,
        mapPositions,
        setMapPositions,
        mapImageUrl,
        setMapImageUrl,
        pendingReaction,
        resolveReaction,
        concentrationMessages: concentrationBreakMessages,
        damageUnit,
        healUnit,
        removeUnit,
        rollInitiative,
        nextTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
