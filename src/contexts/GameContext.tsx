// GameContext — shared state for players, units, dice rolls, characters, and their associations.
// Characters are persisted to localStorage so they survive page refreshes.
import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';

const CHARACTERS_STORAGE_KEY = 'adventure_characters';

export type ControllerType = 'human' | 'ai';

export interface Player {
  id: string;
  username: string;
  avatar?: string;
  controllerType: ControllerType;
}

export interface Unit {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  ac: number;
  initiative: number; // d20 + DEX mod, -1 means unrolled
  isCurrentTurn: boolean;
  type: 'player' | 'enemy' | 'npc';
  playerId: string; // which Player controls this unit
  characterId?: string; // link to a Character if this is a PC
}

// D&D 5e-inspired stat block
export const STAT_NAMES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;
export type StatName = (typeof STAT_NAMES)[number];
export type Stats = Record<StatName, number>;

export const RACES = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc', 'Tiefling', 'Dragonborn'] as const;
export type Race = (typeof RACES)[number];

export const CLASSES = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Ranger', 'Paladin', 'Barbarian', 'Bard', 'Sorcerer', 'Warlock', 'Druid', 'Monk'] as const;
export type CharacterClass = (typeof CLASSES)[number];

// D&D 5e Backgrounds — each grants 2 skill proficiencies + a feature
export const BACKGROUNDS = ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'] as const;
export type Background = (typeof BACKGROUNDS)[number];

// Alignment — 3x3 grid
export const ALIGNMENTS = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'] as const;
export type Alignment = (typeof ALIGNMENTS)[number];

// Appearance customization — drives live SVG portrait rendering
// Body types: 1 = broader shoulders, angular jaw, flatter torso
//             2 = narrower shoulders, softer jaw, curvier silhouette
export const BODY_TYPES = [1, 2] as const;
export type BodyType = (typeof BODY_TYPES)[number];

export const HAIR_STYLES = ['short', 'long', 'braided', 'shaved', 'ponytail', 'wild'] as const;
export type HairStyle = (typeof HAIR_STYLES)[number];

export const SCAR_TYPES = ['none', 'left-eye', 'right-cheek', 'forehead'] as const;
export type ScarType = (typeof SCAR_TYPES)[number];

export const FACE_MARKING_TYPES = ['none', 'war-paint', 'arcane-runes', 'tribal-tattoo'] as const;
export type FaceMarkingType = (typeof FACE_MARKING_TYPES)[number];

export const FACIAL_HAIR_TYPES = ['none', 'stubble', 'full-beard', 'goatee', 'mustache'] as const;
export type FacialHairType = (typeof FACIAL_HAIR_TYPES)[number];

export interface Appearance {
  bodyType: BodyType;
  skinTone: number;   // index into race-specific skin tone palette (0-5)
  hairColor: number;  // index into hair color palette (0-7)
  eyeColor: number;   // index into eye color palette (0-5)
  hairStyle: HairStyle;
  scar: ScarType;
  faceMarking: FaceMarkingType;
  facialHair: FacialHairType;
}

export const DEFAULT_APPEARANCE: Appearance = {
  bodyType: 1, skinTone: 0, hairColor: 0, eyeColor: 0,
  hairStyle: 'short', scar: 'none', faceMarking: 'none', facialHair: 'none',
};

// XP thresholds per level (D&D 5e)
export const XP_THRESHOLDS = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000] as const;

export type Condition = 'normal' | 'unconscious' | 'dead' | 'stabilized';

export interface Character {
  id: string;
  name: string;
  race: Race;
  class: CharacterClass;
  level: number;
  xp: number;
  stats: Stats;
  hp: number;
  maxHp: number;
  ac: number;
  deathSaves: { successes: number; failures: number }; // D&D 5e death saving throws
  condition: Condition;
  portrait?: string; // data URL (base64) or undefined for default
  appearance: Appearance; // customizable visual options
  background: Background; // D&D 5e background
  alignment: Alignment;
  personalityTraits: string; // freeform — 2 traits from background
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string; // freeform — player-written or AI-generated origin story
  appearanceDescription?: string; // AI-inferred physical description from uploaded portrait
  playerId: string; // who owns this character
  gold: number; // currency
  createdAt: number;
}

export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export interface DiceRoll {
  id: string;
  die: DieType;
  sides: number;
  value: number;
  isCritical: boolean; // max roll
  isFumble: boolean; // rolled a 1
  playerId: string;
  playerName: string;
  unitId?: string; // optional: which unit this roll is for
  unitName?: string;
  timestamp: number;
}

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

  // Combat helpers
  damageUnit: (unitId: string, damage: number) => void;
  healUnit: (unitId: string, amount: number) => void;
  removeUnit: (unitId: string) => void;
  rollInitiative: () => void; // roll initiative for all units, sort, start combat
  nextTurn: () => void; // advance to next unit in initiative order
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
  damageUnit: () => {},
  healUnit: () => {},
  removeUnit: () => {},
  rollInitiative: () => {},
  nextTurn: () => {},
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

  // Fetch Discord identity on mount — populate currentPlayer with real user data
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.ok ? r.json() as Promise<{ user?: { id?: string; username?: string; global_name?: string; avatar?: string } }> : null)
      .then((data) => {
        if (data?.user?.id) {
          const u = data.user;
          const avatarUrl = u.avatar
            ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`
            : 'https://cdn.discordapp.com/embed/avatars/0.png';
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

  // Persist characters to localStorage + server sync on change
  const syncingRef = useRef(false); // prevent save-during-load loops
  useEffect(() => {
    try {
      localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(characters));
    } catch {
      // storage full or unavailable — silently fail
    }
    // Fire-and-forget server sync (don't block UI, don't fail loudly)
    if (!syncingRef.current && characters.length >= 0) {
      fetch('/api/characters', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characters }),
      }).catch(() => {}); // server unavailable — localStorage is the fallback
    }
  }, [characters]);

  // Try to load from server on mount (merge: server data fills in any missing characters)
  useEffect(() => {
    syncingRef.current = true;
    fetch('/api/characters')
      .then((r) => r.ok ? r.json() as Promise<{ characters?: Character[] }> : null)
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
      .finally(() => { syncingRef.current = false; });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addCharacter = useCallback((c: Character) => {
    setCharacters((prev) => [...prev, c]);
  }, []);

  const removeCharacter = useCallback((id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCharacter = useCallback((id: string, updates: Partial<Character>) => {
    setCharacters((prev) => prev.map((c) => c.id === id ? { ...c, ...updates } : c));
  }, []);

  // Grant XP to a character, auto-level if threshold reached
  const grantXP = useCallback((id: string, xp: number): { leveledUp: boolean; newLevel: number } => {
    let leveledUp = false;
    let newLevel = 1;
    setCharacters((prev) => prev.map((c) => {
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
        const hitDieAvg: Record<string, number> = {
          Fighter: 6, Barbarian: 7, Paladin: 6, Ranger: 6, Rogue: 5, Monk: 5,
          Cleric: 5, Bard: 5, Druid: 5, Warlock: 5, Wizard: 4, Sorcerer: 4,
        };
        const conMod = Math.floor((c.stats.CON - 10) / 2);
        const hpGain = (hitDieAvg[c.class] || 5) + conMod;
        const newMaxHp = c.maxHp + hpGain;
        return { ...c, xp: totalXP, level, maxHp: newMaxHp, hp: newMaxHp }; // full heal on level up
      }
      return { ...c, xp: totalXP };
    }));
    return { leveledUp, newLevel };
  }, []);

  // Rest: short rest heals hit die + CON, long rest fully heals + resets death saves
  const restCharacter = useCallback((id: string, type: 'short' | 'long') => {
    setCharacters((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      if (type === 'long') {
        return { ...c, hp: c.maxHp, deathSaves: { successes: 0, failures: 0 }, condition: 'normal' as Condition };
      }
      // Short rest: heal hit die average + CON mod (once)
      const hitDieAvg: Record<string, number> = {
        Fighter: 6, Barbarian: 7, Paladin: 6, Ranger: 6, Rogue: 5, Monk: 5,
        Cleric: 5, Bard: 5, Druid: 5, Warlock: 5, Wizard: 4, Sorcerer: 4,
      };
      const conMod = Math.floor((c.stats.CON - 10) / 2);
      const heal = Math.max(1, (hitDieAvg[c.class] || 5) + conMod);
      return { ...c, hp: Math.min(c.maxHp, c.hp + heal), condition: c.hp > 0 ? 'normal' as Condition : c.condition };
    }));
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

  // Combat: apply damage to a unit (clamp to 0)
  const damageUnit = useCallback((unitId: string, damage: number) => {
    setUnits((prev) => prev.map((u) =>
      u.id === unitId ? { ...u, hp: Math.max(0, u.hp - damage) } : u
    ));
  }, []);

  // Combat: heal a unit (clamp to maxHp)
  const healUnit = useCallback((unitId: string, amount: number) => {
    setUnits((prev) => prev.map((u) =>
      u.id === unitId ? { ...u, hp: Math.min(u.maxHp, u.hp + amount) } : u
    ));
  }, []);

  // Combat: remove a unit (dead enemy, etc)
  const removeUnit = useCallback((unitId: string) => {
    setUnits((prev) => prev.filter((u) => u.id !== unitId));
  }, []);

  // Roll initiative for all units, sort by result (descending), mark first as current turn
  const rollInitiative = useCallback(() => {
    setUnits((prev) => {
      const withInitiative = prev.map((u) => {
        // Player characters get DEX mod bonus from linked character
        let dexMod = 0;
        if (u.characterId) {
          const char = characters.find((c) => c.id === u.characterId);
          if (char) dexMod = Math.floor((char.stats.DEX - 10) / 2);
        }
        const roll = Math.floor(Math.random() * 20) + 1 + dexMod;
        return { ...u, initiative: roll, isCurrentTurn: false };
      });
      // Sort descending by initiative (higher goes first)
      withInitiative.sort((a, b) => b.initiative - a.initiative);
      // Mark first unit as current turn
      if (withInitiative.length > 0) {
        withInitiative[0].isCurrentTurn = true;
      }
      return withInitiative;
    });
    setInCombat(true);
    setCombatRound(1);
    setTurnIndex(0);
  }, [characters]);

  // Advance to next turn in initiative order
  const nextTurn = useCallback(() => {
    setUnits((prev) => {
      const alive = prev.filter((u) => u.hp > 0);
      if (alive.length === 0) return prev;

      // Find current turn unit
      const currentIdx = prev.findIndex((u) => u.isCurrentTurn);
      const cleared = prev.map((u) => ({ ...u, isCurrentTurn: false }));

      // Find next alive unit after current
      let nextIdx = currentIdx + 1;
      let wrapped = false;
      while (true) {
        if (nextIdx >= cleared.length) {
          nextIdx = 0;
          wrapped = true;
        }
        if (cleared[nextIdx].hp > 0) break;
        nextIdx++;
        if (nextIdx === currentIdx) break; // safety: all dead somehow
      }

      cleared[nextIdx].isCurrentTurn = true;

      // Advance round if we wrapped
      if (wrapped || nextIdx <= currentIdx) {
        setCombatRound((r) => r + 1);
      }
      setTurnIndex(nextIdx);
      return cleared;
    });
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
