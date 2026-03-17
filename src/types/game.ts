// Shared game types — interfaces, type aliases, and constants used across the app.
// Extracted from GameContext.tsx for reuse and maintainability.

import { type TerrainType, type TokenPosition } from '../lib/mapUtils';

// --- Controller ---
export type ControllerType = 'human' | 'ai';

export interface Player {
  id: string;
  username: string;
  avatar?: string;
  controllerType: ControllerType;
}

// --- Conditions ---
export type ConditionType = 'poisoned' | 'stunned' | 'frightened' | 'blessed' | 'hexed' | 'burning' | 'prone' | 'dodging' | 'raging' | 'inspired' | 'helping' | 'hidden';
export interface ActiveCondition {
  type: ConditionType;
  duration: number; // rounds remaining, -1 = until cured
  source?: string;
}

export const CONDITION_EFFECTS: Record<ConditionType, { attackMod: number; acMod: number; saveMod: number; description: string; color: string }> = {
  poisoned: { attackMod: -2, acMod: 0, saveMod: -2, description: 'Disadvantage on attacks and saves', color: 'text-green-400' },
  stunned: { attackMod: -99, acMod: -2, saveMod: -99, description: 'Cannot act, auto-fail STR/DEX saves', color: 'text-yellow-300' },
  frightened: { attackMod: -2, acMod: 0, saveMod: 0, description: 'Disadvantage on attacks while source is visible', color: 'text-purple-400' },
  blessed: { attackMod: 2, acMod: 0, saveMod: 2, description: '+1d4 to attacks and saves', color: 'text-sky-400' },
  hexed: { attackMod: 0, acMod: 0, saveMod: -2, description: 'Disadvantage on ability checks', color: 'text-fuchsia-400' },
  burning: { attackMod: 0, acMod: 0, saveMod: 0, description: 'Takes 1d6 fire damage at start of turn', color: 'text-orange-400' },
  prone: { attackMod: 0, acMod: 0, saveMod: 0, description: 'Melee advantage, ranged disadvantage against this target', color: 'text-amber-600' },
  dodging: { attackMod: 0, acMod: 2, saveMod: 0, description: 'Dodging — +2 AC until next turn', color: 'text-sky-300' },
  raging: { attackMod: 2, acMod: 0, saveMod: 0, description: 'Raging — +2 to melee attacks', color: 'text-red-400' },
  inspired: { attackMod: 2, acMod: 0, saveMod: 2, description: 'Inspired — +2 to attacks and saves', color: 'text-indigo-400' },
  helping: { attackMod: 0, acMod: 0, saveMod: 0, description: 'Helping an ally — next ally attack vs target has advantage', color: 'text-teal-400' },
  hidden: { attackMod: 2, acMod: 0, saveMod: 0, description: 'Hidden — advantage on next attack, enemies can\'t target you', color: 'text-slate-300' },
};

// --- Combat roll helpers ---
export function rollD20WithProne(attackerConditions: ActiveCondition[], targetConditions: ActiveCondition[], isMelee: boolean): { roll: number; hadAdvantage: boolean; hadDisadvantage: boolean } {
  const attackerProne = attackerConditions.some((c) => c.type === 'prone');
  const targetProne = targetConditions.some((c) => c.type === 'prone');
  let advantage = false;
  let disadvantage = false;
  if (attackerProne) disadvantage = true;
  if (targetProne && isMelee) advantage = true;
  if (targetProne && !isMelee) disadvantage = true;
  if (advantage && disadvantage) { advantage = false; disadvantage = false; }
  const r1 = Math.floor(Math.random() * 20) + 1;
  const r2 = Math.floor(Math.random() * 20) + 1;
  const roll = advantage ? Math.max(r1, r2) : disadvantage ? Math.min(r1, r2) : r1;
  return { roll, hadAdvantage: advantage, hadDisadvantage: disadvantage };
}

export function effectiveAC(baseAC: number, targetConditions: ActiveCondition[]): number {
  const acMod = targetConditions.reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.acMod || 0), 0);
  return baseAC + acMod;
}

// --- Enemy abilities ---
export interface EnemyAbility {
  name: string;
  type: 'attack' | 'aoe' | 'condition' | 'heal';
  damageDie?: string;
  attackBonus?: number;
  condition?: ConditionType;
  conditionDuration?: number;
  cooldown: number;
  description: string;
  isRanged?: boolean;
  range?: number;
}

// --- Units ---
export interface Unit {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  ac: number;
  initiative: number;
  isCurrentTurn: boolean;
  type: 'player' | 'enemy' | 'npc';
  playerId: string;
  characterId?: string;
  attackBonus?: number;
  damageDie?: string;
  damageBonus?: number;
  dexMod?: number;
  abilities?: EnemyAbility[];
  abilityCooldowns?: Record<string, number>;
  conditions?: ActiveCondition[];
  concentratingOn?: string;
  speed: number;
  movementUsed: number;
  reactionUsed: boolean;
  disengaged: boolean;
  cr?: number;
  xpValue?: number;
  // Legendary actions — boss monsters get extra actions between player turns
  legendaryActions?: number;       // max legendary actions per round
  legendaryActionsUsed?: number;   // how many used this round (reset on boss turn)
  legendaryAbilities?: EnemyAbility[]; // abilities usable as legendary actions
  // Lair actions — environmental effects at initiative count 20 (start of round)
  lairActions?: LairAction[];
}

export interface LairAction {
  name: string;
  description: string;
  type: 'damage' | 'condition' | 'terrain' | 'flavor';
  damageDie?: string;
  damageType?: string;
  condition?: ConditionType;
  conditionDuration?: number;
  saveStat?: string;
  saveDC?: number;
  targetAll?: boolean;  // hits all players vs random one
}

// --- Enemy templates ---
export interface EnemyTemplate {
  names: string[];
  cr: number;
  hp: [number, number];
  ac: number;
  attackBonus: number;
  damageDie: string;
  damageBonus: number;
  dexMod: number;
  abilities: EnemyAbility[];
  xpValue: number;
}

// --- Stats ---
export const STAT_NAMES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;
export type StatName = (typeof STAT_NAMES)[number];
export type Stats = Record<StatName, number>;

// --- Character identity ---
export const RACES = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc', 'Tiefling', 'Dragonborn'] as const;
export type Race = (typeof RACES)[number];

export const CLASSES = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Ranger', 'Paladin', 'Barbarian', 'Bard', 'Sorcerer', 'Warlock', 'Druid', 'Monk'] as const;
export type CharacterClass = (typeof CLASSES)[number];

export const BACKGROUNDS = ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'] as const;
export type Background = (typeof BACKGROUNDS)[number];

export const ALIGNMENTS = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'] as const;
export type Alignment = (typeof ALIGNMENTS)[number];

// --- Appearance ---
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
  skinTone: number;
  hairColor: number;
  eyeColor: number;
  hairStyle: HairStyle;
  scar: ScarType;
  faceMarking: FaceMarkingType;
  facialHair: FacialHairType;
}

export const DEFAULT_APPEARANCE: Appearance = {
  bodyType: 1, skinTone: 0, hairColor: 0, eyeColor: 0,
  hairStyle: 'short', scar: 'none', faceMarking: 'none', facialHair: 'none',
};

// --- XP + Encounter budgets ---
export const XP_THRESHOLDS = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000] as const;

export const ENCOUNTER_THRESHOLDS: Record<number, [number, number, number, number]> = {
  1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400],
  4: [125, 250, 375, 500], 5: [250, 500, 750, 1100], 6: [300, 600, 900, 1400],
  7: [350, 750, 1100, 1700], 8: [450, 900, 1400, 2100], 9: [550, 1100, 1600, 2400],
  10: [600, 1200, 1900, 2800], 11: [800, 1600, 2400, 3600], 12: [1000, 2000, 3000, 4500],
  13: [1100, 2200, 3400, 5100], 14: [1250, 2500, 3800, 5700], 15: [1400, 2800, 4300, 6400],
  16: [1600, 3200, 4800, 7200], 17: [2000, 3900, 5900, 8800], 18: [2100, 4200, 6300, 9500],
  19: [2400, 4900, 7300, 10900], 20: [2800, 5700, 8500, 12700],
};

export function calculateEncounterBudget(partyLevels: number[]): { easy: number; medium: number; hard: number; deadly: number } {
  return partyLevels.reduce(
    (acc, lvl) => {
      const t = ENCOUNTER_THRESHOLDS[Math.min(20, Math.max(1, lvl))] || ENCOUNTER_THRESHOLDS[1];
      return { easy: acc.easy + t[0], medium: acc.medium + t[1], hard: acc.hard + t[2], deadly: acc.deadly + t[3] };
    },
    { easy: 0, medium: 0, hard: 0, deadly: 0 }
  );
}

export type Condition = 'normal' | 'unconscious' | 'dead' | 'stabilized';

// --- Items ---
export type ItemType = 'weapon' | 'armor' | 'shield' | 'potion' | 'ring' | 'scroll' | 'misc';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic';
export type EquipSlot = 'weapon' | 'armor' | 'shield' | 'ring';
export type ArmorCategory = 'light' | 'medium' | 'heavy';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  description: string;
  value: number;
  equipSlot?: EquipSlot;
  acBonus?: number;
  armorCategory?: ArmorCategory;
  damageDie?: string;
  damageBonus?: number;
  attackBonus?: number;
  isRanged?: boolean;
  range?: number;
  healAmount?: number;
  statBonus?: Partial<Stats>;
  quantity?: number;
}

export interface EquipmentSlots {
  weapon: Item | null;
  armor: Item | null;
  shield: Item | null;
  ring: Item | null;
}

export const EMPTY_EQUIPMENT: EquipmentSlots = { weapon: null, armor: null, shield: null, ring: null };

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: 'text-slate-300', uncommon: 'text-green-400', rare: 'text-blue-400', epic: 'text-purple-400',
};
export const RARITY_BG: Record<ItemRarity, string> = {
  common: 'border-slate-600', uncommon: 'border-green-700/50', rare: 'border-blue-700/50', epic: 'border-purple-700/50',
};

// --- AC calculation ---
export function calculateAC(stats: Stats, equipment: EquipmentSlots): number {
  const dexMod = Math.floor((stats.DEX - 10) / 2);
  const armor = equipment.armor;
  const shieldAC = equipment.shield?.acBonus ?? 0;
  const ringAC = equipment.ring?.acBonus ?? 0;
  if (!armor || !armor.acBonus) return 10 + dexMod + shieldAC + ringAC;
  let armorAC = armor.acBonus;
  switch (armor.armorCategory) {
    case 'light': armorAC += dexMod; break;
    case 'medium': armorAC += Math.min(dexMod, 2); break;
    case 'heavy': break;
    default: break;
  }
  return armorAC + shieldAC + ringAC;
}

// --- Hit dice ---
export const HIT_DIE_AVG: Record<string, number> = {
  Fighter: 6, Barbarian: 7, Paladin: 6, Ranger: 6, Rogue: 5, Monk: 5,
  Cleric: 5, Bard: 5, Druid: 5, Warlock: 5, Wizard: 4, Sorcerer: 4,
};

// Hit die sides per class (d6/d8/d10/d12)
export const HIT_DIE_SIDES: Record<string, number> = {
  Fighter: 10, Barbarian: 12, Paladin: 10, Ranger: 10, Rogue: 8, Monk: 8,
  Cleric: 8, Bard: 8, Druid: 8, Warlock: 8, Wizard: 6, Sorcerer: 6,
};

// --- Spells ---
export type SpellSchool = 'evocation' | 'abjuration' | 'conjuration' | 'divination' | 'enchantment' | 'illusion' | 'necromancy' | 'transmutation';
export type AoEShape = 'circle' | 'cone' | 'line' | 'cube';
export interface AoETemplate { shape: AoEShape; radiusCells: number; color: string; }

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: SpellSchool;
  description: string;
  damage?: string;
  healAmount?: number;
  range: string;
  duration: string;
  saveStat?: StatName;
  isConcentration: boolean;
  classes: CharacterClass[];
  appliesCondition?: ConditionType;
  conditionDuration?: number;
  aoe?: AoETemplate;
}

// --- Class abilities ---
export interface ClassAbility {
  id: string;
  name: string;
  class: CharacterClass;
  description: string;
  type: 'heal' | 'buff' | 'attack' | 'utility';
  resetsOn: 'short' | 'long';
  damage?: string;
  healFormula?: 'level_d10' | 'level_x5' | 'level_d6';
  appliesCondition?: ConditionType;
  conditionDuration?: number;
  selfOnly?: boolean;
  color: string;
}

// --- Feats ---
export interface Feat {
  id: string;
  name: string;
  description: string;
  statBonuses?: Partial<Record<StatName, number>>;
  maxHpPerLevel?: number;
  acBonus?: number;
  initiativeBonus?: number;
  attackBonus?: number;
  damageBonus?: number;
  savingThrowBonus?: number;
}

export const ASI_LEVELS = [4, 8, 12, 16, 19];
export const EXTRA_ATTACK_CLASSES: CharacterClass[] = ['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Monk'];

// --- Character ---
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
  deathSaves: { successes: number; failures: number };
  condition: Condition;
  portrait?: string;
  appearance: Appearance;
  background: Background;
  alignment: Alignment;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  appearanceDescription?: string;
  playerId: string;
  gold: number;
  inventory: Item[];
  equipment: EquipmentSlots;
  spellSlotsUsed: Record<number, number>;
  classAbilityUsed: boolean;
  feats: string[];
  asiChoicesMade: number;
  hitDiceRemaining: number; // how many hit dice are left to spend (max = level)
  inspiration: boolean; // D&D 5e inspiration — DM grants, player spends for advantage
  exhaustion: number; // D&D 5e exhaustion level (0-6). Cumulative penalties; 6 = death.
  createdAt: number;
}

// --- Dice ---
export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export interface DiceRoll {
  id: string;
  die: DieType;
  sides: number;
  value: number;
  isCritical: boolean;
  isFumble: boolean;
  playerId: string;
  playerName: string;
  unitId?: string;
  unitName?: string;
  timestamp: number;
}

// --- Utility ---
export function getStatModifier(value: number): number {
  return Math.floor((value - 10) / 2);
}

export function hasPendingASI(character: Character): boolean {
  const asiLevelsReached = ASI_LEVELS.filter((l) => character.level >= l).length;
  const choicesMade = character.asiChoicesMade || 0;
  return asiLevelsReached > choicesMade;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Map pin/marker — DM-placed annotations on the battle map
export interface MapPin {
  id: string;
  col: number;
  row: number;
  label: string;
  color: string; // hex color
  icon?: string; // emoji or short symbol
  createdBy?: string; // player username
}

export const MAP_PIN_COLORS = [
  { label: 'Red', value: '#ef4444' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Yellow', value: '#eab308' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Cyan', value: '#06b6d4' },
  { label: 'Pink', value: '#ec4899' },
] as const;

export function rollSpellDamage(die: string): number {
  const match = die.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (!match) return 0;
  const [, count, sides, bonus] = match;
  let total = 0;
  for (let i = 0; i < Number(count); i++) total += Math.floor(Math.random() * Number(sides)) + 1;
  return total + (bonus ? Number(bonus) : 0);
}
