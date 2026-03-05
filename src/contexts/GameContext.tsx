// GameContext — shared state for players, units, dice rolls, characters, and their associations.
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

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

export interface Character {
  id: string;
  name: string;
  race: Race;
  class: CharacterClass;
  level: number;
  stats: Stats;
  hp: number;
  maxHp: number;
  ac: number;
  portrait?: string; // data URL (base64) or undefined for default
  playerId: string; // who owns this character
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
  setUnits: (u: Unit[]) => void;

  // Characters
  characters: Character[];
  addCharacter: (c: Character) => void;
  removeCharacter: (id: string) => void;

  // Dice roll log (most recent first)
  rolls: DiceRoll[];
  addRoll: (roll: Omit<DiceRoll, 'id' | 'timestamp' | 'isCritical' | 'isFumble'> & { value: number; sides: number }) => DiceRoll;
  clearRolls: () => void;

  // Currently selected unit for dice association
  selectedUnitId: string | null;
  setSelectedUnitId: (id: string | null) => void;
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
  rolls: [],
  addRoll: () => ({}) as DiceRoll,
  clearRolls: () => {},
  selectedUnitId: null,
  setSelectedUnitId: () => {},
});

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(DEFAULT_PLAYER);
  const [players, setPlayers] = useState<Player[]>([DEFAULT_PLAYER]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [rolls, setRolls] = useState<DiceRoll[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const addCharacter = useCallback((c: Character) => {
    setCharacters((prev) => [...prev, c]);
  }, []);

  const removeCharacter = useCallback((id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
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
        rolls,
        addRoll,
        clearRolls,
        selectedUnitId,
        setSelectedUnitId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
