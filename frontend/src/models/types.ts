// src/models/types.ts

// Basic types used throughout the game

export type Direction = 'north' | 'east' | 'south' | 'west' | 'up' | 'down';

export type ItemType = 'weapon' | 'armor' | 'consumable' | 'key' | 'quest' | 'treasure' | 'tool';

export type DiceType = 'D4' | 'D6' | 'D8' | 'D10' | 'D12' | 'D20';

export type EquipmentSlot = 'weapon' | 'armor' | 'accessory';

export interface GameOutputMessage {
  text: string;
  type: 'normal' | 'error' | 'combat' | 'quest' | 'system';
  timestamp: number;
}

export interface Stats {
  health: number;
  maxHealth: number;
  strength: number;
  dexterity: number;
  intelligence: number;
}

export interface DiceRoll {
  diceType: DiceType;
  result: number;
  timestamp: number;
}

export type GameStateType = 'exploration' | 'combat' | 'dialogue' | 'inventory' | 'paused';

export interface SaveGame {
  saveDate: number;
  playerName: string;
  currentLocationId: string;
  gameState: GameStateType;
}
