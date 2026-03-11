// GameContext — shared state for players, units, dice rolls, characters, and their associations.
// Characters are persisted to localStorage so they survive page refreshes.
import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { type TerrainType, type TokenPosition, DEFAULT_COLS, DEFAULT_ROWS } from '../lib/mapUtils';

const CHARACTERS_STORAGE_KEY = 'adventure_characters';

export type ControllerType = 'human' | 'ai';

export interface Player {
  id: string;
  username: string;
  avatar?: string;
  controllerType: ControllerType;
}

// --- Condition system ---
export type ConditionType = 'poisoned' | 'stunned' | 'frightened' | 'blessed' | 'hexed' | 'burning' | 'prone' | 'dodging' | 'raging' | 'inspired';
export interface ActiveCondition {
  type: ConditionType;
  duration: number; // rounds remaining, -1 = until cured
  source?: string; // who/what applied it
}

// Condition effects on combat rolls
// attackMod: bonus/penalty to attack rolls. acMod: bonus/penalty to AC. saveMod: bonus/penalty to saves.
// prone is special: uses advantage/disadvantage (handled in attack roll logic, not flat mod)
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
};

// --- Combat roll helpers ---

/** Roll a d20 with advantage/disadvantage from prone. Returns { roll, hadAdvantage, hadDisadvantage }. */
export function rollD20WithProne(attackerConditions: ActiveCondition[], targetConditions: ActiveCondition[], isMelee: boolean): { roll: number; hadAdvantage: boolean; hadDisadvantage: boolean } {
  const attackerProne = attackerConditions.some((c) => c.type === 'prone');
  const targetProne = targetConditions.some((c) => c.type === 'prone');
  // Prone attacker: disadvantage on all attacks
  // Melee vs prone target: advantage
  // Ranged vs prone target: disadvantage
  let advantage = false;
  let disadvantage = false;
  if (attackerProne) disadvantage = true;
  if (targetProne && isMelee) advantage = true;
  if (targetProne && !isMelee) disadvantage = true;
  // Advantage + disadvantage cancel out (5e rules)
  if (advantage && disadvantage) {
    advantage = false;
    disadvantage = false;
  }
  const r1 = Math.floor(Math.random() * 20) + 1;
  const r2 = Math.floor(Math.random() * 20) + 1;
  const roll = advantage ? Math.max(r1, r2) : disadvantage ? Math.min(r1, r2) : r1;
  return { roll, hadAdvantage: advantage, hadDisadvantage: disadvantage };
}

/** Compute effective AC after condition modifiers (dodging, stunned, etc). */
export function effectiveAC(baseAC: number, targetConditions: ActiveCondition[]): number {
  const acMod = targetConditions.reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.acMod || 0), 0);
  return baseAC + acMod;
}

// --- Enemy ability system ---
export interface EnemyAbility {
  name: string;
  type: 'attack' | 'aoe' | 'condition' | 'heal';
  damageDie?: string; // e.g. "2d6"
  attackBonus?: number;
  condition?: ConditionType; // applies this condition on hit
  conditionDuration?: number;
  cooldown: number; // turns between uses, 0 = every turn
  description: string;
  isRanged?: boolean; // true = can use at distance (skips adjacency requirement)
  range?: number; // max range in cells (used with isRanged)
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
  // Enemy combat stats (populated from stat templates)
  attackBonus?: number;
  damageDie?: string; // e.g. "1d8"
  damageBonus?: number;
  dexMod?: number; // for initiative
  abilities?: EnemyAbility[];
  abilityCooldowns?: Record<string, number>; // ability name -> turns until available
  conditions?: ActiveCondition[];
  concentratingOn?: string; // spell name if unit is concentrating on a spell
  speed: number; // movement speed in cells (default 6 = 30ft)
  movementUsed: number; // cells moved this turn
  reactionUsed: boolean; // D&D 5e: one reaction per round, resets at start of turn
  disengaged: boolean; // D&D 5e Disengage: no opportunity attacks triggered this turn
  cr?: number; // challenge rating for XP calculation
  xpValue?: number; // XP reward on kill
}

// --- Enemy stat templates by CR tier ---
export interface EnemyTemplate {
  names: string[];
  cr: number;
  hp: [number, number]; // [min, max]
  ac: number;
  attackBonus: number;
  damageDie: string;
  damageBonus: number;
  dexMod: number;
  abilities: EnemyAbility[];
  xpValue: number;
}

export const ENEMY_TEMPLATES: Record<string, EnemyTemplate[]> = {
  easy: [
    { names: ['Goblin', 'Kobold', 'Giant Rat', 'Skeleton'], cr: 0.25, hp: [7, 12], ac: 12, attackBonus: 3, damageDie: '1d6', damageBonus: 1, dexMod: 2, xpValue: 50, abilities: [] },
    { names: ['Zombie', 'Wolf', 'Bandit'], cr: 0.25, hp: [10, 16], ac: 11, attackBonus: 3, damageDie: '1d6', damageBonus: 1, dexMod: 0, xpValue: 50, abilities: [] },
    { names: ['Stirge', 'Crawling Claw', 'Twig Blight'], cr: 0.25, hp: [5, 9], ac: 13, attackBonus: 4, damageDie: '1d4', damageBonus: 2, dexMod: 3, xpValue: 50, abilities: [] },
    { names: ['Cultist', 'Tribal Warrior', 'Thug'], cr: 0.5, hp: [12, 18], ac: 12, attackBonus: 3, damageDie: '1d8', damageBonus: 1, dexMod: 1, xpValue: 100, abilities: [{ name: 'Pack Tactics', type: 'attack', damageDie: '1d8', attackBonus: 4, cooldown: 2, description: 'Coordinates with allies for a precise strike.' }] },
  ],
  medium: [
    { names: ['Orc', 'Gnoll', 'Bugbear', 'Hobgoblin'], cr: 1, hp: [15, 25], ac: 13, attackBonus: 5, damageDie: '1d10', damageBonus: 3, dexMod: 1, xpValue: 200, abilities: [{ name: 'Aggressive Charge', type: 'attack', damageDie: '2d6', attackBonus: 5, cooldown: 3, description: 'Rushes forward and strikes with extra force.' }] },
    { names: ['Dire Wolf', 'Ghoul', 'Shadow'], cr: 1, hp: [18, 28], ac: 14, attackBonus: 4, damageDie: '1d8', damageBonus: 2, dexMod: 2, xpValue: 200, abilities: [{ name: 'Paralyzing Touch', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 4, description: 'On hit, the target is stunned until the end of its next turn.' }] },
    { names: ['Fire Beetle', 'Giant Spider', 'Vine Blight'], cr: 1, hp: [14, 22], ac: 13, attackBonus: 4, damageDie: '1d8', damageBonus: 2, dexMod: 1, xpValue: 200, abilities: [{ name: 'Venomous Bite', type: 'condition', condition: 'poisoned', conditionDuration: 2, cooldown: 3, description: 'Injects venom that saps strength and focus.' }] },
    { names: ['Specter', 'Wight', 'Animated Armor'], cr: 1, hp: [20, 30], ac: 15, attackBonus: 4, damageDie: '1d8', damageBonus: 3, dexMod: 2, xpValue: 200, abilities: [{ name: 'Necrotic Touch', type: 'attack', damageDie: '2d6', attackBonus: 4, condition: 'hexed', conditionDuration: 1, cooldown: 3, description: 'Drains the warmth from living flesh.' }] },
  ],
  hard: [
    {
      names: ['Ogre', 'Minotaur', 'Owlbear', 'Troll'],
      cr: 2,
      hp: [30, 50],
      ac: 14,
      attackBonus: 6,
      damageDie: '2d8',
      damageBonus: 4,
      dexMod: 0,
      xpValue: 450,
      abilities: [
        { name: 'Crushing Blow', type: 'attack', damageDie: '3d8', attackBonus: 6, cooldown: 3, description: 'A devastating overhead strike.' },
        { name: 'Frightening Roar', type: 'condition', condition: 'frightened', conditionDuration: 2, cooldown: 5, description: 'A terrifying bellow that shakes your resolve.' },
      ],
    },
    { names: ['Wraith', 'Basilisk', 'Manticore'], cr: 3, hp: [35, 55], ac: 15, attackBonus: 6, damageDie: '2d6', damageBonus: 3, dexMod: 3, xpValue: 700, abilities: [{ name: 'Life Drain', type: 'attack', damageDie: '3d6', attackBonus: 6, condition: 'hexed', conditionDuration: 2, cooldown: 3, description: 'Drains life force, leaving the target weakened.' }] },
    {
      names: ['Hell Hound', 'Phase Spider', 'Displacer Beast'],
      cr: 3,
      hp: [32, 48],
      ac: 14,
      attackBonus: 5,
      damageDie: '2d6',
      damageBonus: 3,
      dexMod: 3,
      xpValue: 700,
      abilities: [
        { name: 'Fire Breath', type: 'aoe', damageDie: '3d6', cooldown: 4, description: 'Exhales a cone of searing flame.', isRanged: true, range: 6 },
        { name: 'Phase Shift', type: 'condition', condition: 'blessed', conditionDuration: 1, cooldown: 4, description: 'Blinks between planes, becoming harder to hit.' },
      ],
    },
    {
      names: ['Ettin', 'Flesh Golem', 'Gelatinous Cube'],
      cr: 2,
      hp: [40, 60],
      ac: 13,
      attackBonus: 7,
      damageDie: '2d10',
      damageBonus: 4,
      dexMod: -1,
      xpValue: 450,
      abilities: [
        { name: 'Double Strike', type: 'attack', damageDie: '2d10', attackBonus: 7, cooldown: 2, description: 'Two heads swing in unison — or the mass engulfs its prey.' },
        { name: 'Stunning Slam', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 4, description: 'A blow so heavy it rattles your skull.' },
      ],
    },
  ],
  deadly: [
    {
      names: ['Young Dragon', 'Beholder Zombie', 'Hydra', 'Lich Apprentice'],
      cr: 5,
      hp: [60, 90],
      ac: 17,
      attackBonus: 8,
      damageDie: '2d10',
      damageBonus: 5,
      dexMod: 2,
      xpValue: 1800,
      abilities: [
        { name: 'Breath Weapon', type: 'aoe', damageDie: '6d6', cooldown: 4, description: 'A torrent of elemental fury engulfs the area.', isRanged: true, range: 12 },
        { name: 'Multiattack', type: 'attack', damageDie: '2d8', attackBonus: 8, cooldown: 0, description: 'Strikes twice in rapid succession.' },
        { name: 'Terrifying Presence', type: 'condition', condition: 'frightened', conditionDuration: 3, cooldown: 6, description: 'An aura of dread forces a WIS save or be frightened.' },
      ],
    },
    {
      names: ['Mind Flayer', 'Vampire Spawn', 'Flameskull Trio'],
      cr: 4,
      hp: [50, 75],
      ac: 16,
      attackBonus: 7,
      damageDie: '2d8',
      damageBonus: 4,
      dexMod: 3,
      xpValue: 1100,
      abilities: [
        { name: 'Mind Blast', type: 'aoe', damageDie: '4d8', cooldown: 5, description: 'A cone of psychic energy stuns all who fail their save.', isRanged: true, range: 12 },
        { name: 'Psychic Grasp', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 3, description: 'Seizes the mind of a target, paralyzing them.' },
      ],
    },
    {
      names: ['Shambling Mound', 'Elemental', 'Chimera'],
      cr: 4,
      hp: [55, 80],
      ac: 15,
      attackBonus: 7,
      damageDie: '2d10',
      damageBonus: 4,
      dexMod: 1,
      xpValue: 1100,
      abilities: [
        { name: 'Engulf', type: 'attack', damageDie: '3d8', attackBonus: 7, condition: 'prone', conditionDuration: 1, cooldown: 3, description: 'Wraps around a target, crushing and smothering.' },
        { name: 'Lightning Absorption', type: 'heal', cooldown: 5, description: 'Absorbs elemental energy to regenerate.' },
      ],
    },
    {
      names: ['Death Knight', 'Oni', 'Night Hag'],
      cr: 5,
      hp: [65, 95],
      ac: 18,
      attackBonus: 9,
      damageDie: '2d10',
      damageBonus: 5,
      dexMod: 2,
      xpValue: 1800,
      abilities: [
        { name: 'Hellfire Orb', type: 'aoe', damageDie: '5d8', cooldown: 5, description: 'Hurls a sphere of searing hellfire that detonates on impact.', isRanged: true, range: 24 },
        { name: 'Soul Rend', type: 'attack', damageDie: '3d10', attackBonus: 9, condition: 'hexed', conditionDuration: 3, cooldown: 4, description: 'Tears at the soul, leaving the target cursed and weakened.' },
        { name: 'Dark Command', type: 'condition', condition: 'frightened', conditionDuration: 2, cooldown: 4, description: 'Issues a command laced with dark power. Obey or tremble.' },
      ],
    },
  ],
};

// Encounter themes — random flavor for AI narration
export const ENCOUNTER_THEMES: { setting: string; twist: string }[] = [
  { setting: 'a narrow ravine choked with fog', twist: 'The ground is slick with ice — footing is treacherous' },
  { setting: 'the ruins of a collapsed watchtower', twist: 'Rubble shifts underfoot, and something glints in the debris' },
  { setting: 'a moonlit clearing in a dead forest', twist: 'The trees whisper warnings that only the druid can hear' },
  { setting: 'a flooded crypt reeking of decay', twist: 'The water hides something that moves beneath the surface' },
  { setting: 'a merchant caravan under siege', twist: 'The merchants are not what they seem' },
  { setting: 'an ancient stone bridge over a chasm', twist: 'The bridge groans — it will not hold forever' },
  { setting: 'a burning village, smoke blotting out the sky', twist: 'Survivors are trapped in the chapel' },
  { setting: 'a dark cavern lit by bioluminescent fungi', twist: 'The spores cause hallucinations if inhaled too deeply' },
  { setting: 'a crossroads shrine defiled by dark magic', twist: 'The shrine pulses with residual power that could be harnessed' },
  { setting: 'the deck of a wrecked ship half-buried in sand', twist: 'The cargo hold still has something alive in it' },
  { setting: 'an overgrown arena from a forgotten civilization', twist: 'Spectral crowds cheer from the crumbling stands' },
  { setting: 'a frozen lake with something moving beneath the ice', twist: 'Cracks spread with every heavy impact' },
];

export function randomEncounterTheme(): { setting: string; twist: string } {
  return ENCOUNTER_THEMES[Math.floor(Math.random() * ENCOUNTER_THEMES.length)];
}

// Generate enemy units from templates based on difficulty and party level
export function generateEnemies(difficulty: string, partyLevel: number, count?: number): Unit[] {
  const templates = ENEMY_TEMPLATES[difficulty] || ENEMY_TEMPLATES.medium;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const enemyCount = count || (difficulty === 'easy' ? 2 + Math.floor(Math.random() * 2) : difficulty === 'deadly' ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 3));

  // Scale HP with party level
  const levelScale = 1 + (partyLevel - 1) * 0.15;

  return Array.from({ length: enemyCount }, (_, i) => {
    const name = template.names[Math.floor(Math.random() * template.names.length)];
    const baseHp = template.hp[0] + Math.floor(Math.random() * (template.hp[1] - template.hp[0] + 1));
    const scaledHp = Math.round(baseHp * levelScale);
    return {
      id: `enemy-${crypto.randomUUID().slice(0, 8)}-${i}`,
      name: enemyCount > 1 && template.names.length <= enemyCount ? `${name} ${String.fromCharCode(65 + i)}` : name,
      hp: scaledHp,
      maxHp: scaledHp,
      ac: template.ac,
      initiative: -1,
      isCurrentTurn: false,
      type: 'enemy' as const,
      playerId: 'ai-dm',
      attackBonus: template.attackBonus,
      damageDie: template.damageDie,
      damageBonus: template.damageBonus,
      dexMod: template.dexMod,
      abilities: template.abilities.map((a) => ({ ...a })),
      abilityCooldowns: {},
      conditions: [],
      speed: 6, // 30ft default
      movementUsed: 0,
      reactionUsed: false,
      disengaged: false,
      cr: template.cr,
      xpValue: template.xpValue,
    } satisfies Unit;
  });
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
  skinTone: number; // index into race-specific skin tone palette (0-5)
  hairColor: number; // index into hair color palette (0-7)
  eyeColor: number; // index into eye color palette (0-5)
  hairStyle: HairStyle;
  scar: ScarType;
  faceMarking: FaceMarkingType;
  facialHair: FacialHairType;
}

export const DEFAULT_APPEARANCE: Appearance = {
  bodyType: 1,
  skinTone: 0,
  hairColor: 0,
  eyeColor: 0,
  hairStyle: 'short',
  scar: 'none',
  faceMarking: 'none',
  facialHair: 'none',
};

// XP thresholds per level (D&D 5e)
export const XP_THRESHOLDS = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000] as const;

export type Condition = 'normal' | 'unconscious' | 'dead' | 'stabilized';

// --- Item & Equipment system ---
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
  value: number; // gold value
  // Equipment stats (only for equippable items)
  equipSlot?: EquipSlot;
  acBonus?: number; // armor: base AC or shield: +AC
  armorCategory?: ArmorCategory; // D&D 5e: light=full DEX, medium=DEX max +2, heavy=no DEX
  damageDie?: string; // weapon: e.g. "1d8", "2d6"
  damageBonus?: number; // weapon: flat bonus to damage
  attackBonus?: number; // weapon: flat bonus to hit
  isRanged?: boolean; // weapon: true = ranged (uses DEX), false/undefined = melee (uses STR)
  range?: number; // weapon: attack range in cells (1=melee, 30=longbow 150ft, etc.)
  healAmount?: number; // potion: HP restored
  statBonus?: Partial<Stats>; // ring/misc: stat bonuses
  quantity?: number; // stackable items (potions, scrolls)
}

export interface EquipmentSlots {
  weapon: Item | null;
  armor: Item | null;
  shield: Item | null;
  ring: Item | null;
}

export const EMPTY_EQUIPMENT: EquipmentSlots = { weapon: null, armor: null, shield: null, ring: null };

// --- Loot tables ---
// Items are grouped by rarity; combat loot rolls from these
const COMMON_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Healing Potion', type: 'potion', rarity: 'common', description: 'Restores 2d4+2 HP.', value: 50, healAmount: 9, quantity: 1 },
  { name: 'Shortsword', type: 'weapon', rarity: 'common', description: 'A reliable blade.', value: 10, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Leather Armor', type: 'armor', rarity: 'common', description: 'Light and flexible.', value: 10, equipSlot: 'armor', acBonus: 11, armorCategory: 'light' },
  { name: 'Wooden Shield', type: 'shield', rarity: 'common', description: '+2 AC.', value: 10, equipSlot: 'shield', acBonus: 2 },
  { name: 'Dagger', type: 'weapon', rarity: 'common', description: 'Light and concealable.', value: 2, equipSlot: 'weapon', damageDie: '1d4', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Handaxe', type: 'weapon', rarity: 'common', description: 'Can be thrown.', value: 5, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Chain Shirt', type: 'armor', rarity: 'common', description: 'Medium armor.', value: 50, equipSlot: 'armor', acBonus: 13, armorCategory: 'medium' },
  { name: 'Scroll of Identify', type: 'scroll', rarity: 'common', description: "Reveals an item's properties.", value: 25 },
  { name: 'Quarterstaff', type: 'weapon', rarity: 'common', description: 'A sturdy wooden staff.', value: 2, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Light Crossbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16 },
  { name: 'Shortbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16 },
  { name: 'Antidote', type: 'potion', rarity: 'common', description: 'Cures poison. Restores 1d4 HP.', value: 30, healAmount: 3, quantity: 1 },
];

const UNCOMMON_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Greater Healing Potion', type: 'potion', rarity: 'uncommon', description: 'Restores 4d4+4 HP.', value: 150, healAmount: 18, quantity: 1 },
  { name: 'Longsword +1', type: 'weapon', rarity: 'uncommon', description: 'A finely crafted blade that glows faintly.', value: 200, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 1, attackBonus: 1, range: 1 },
  { name: 'Scale Mail', type: 'armor', rarity: 'uncommon', description: 'Sturdy medium armor.', value: 50, equipSlot: 'armor', acBonus: 14, armorCategory: 'medium' },
  { name: 'Shield +1', type: 'shield', rarity: 'uncommon', description: 'An enchanted shield. +3 AC.', value: 200, equipSlot: 'shield', acBonus: 3 },
  { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: '+1 to AC while worn.', value: 300, equipSlot: 'ring', acBonus: 1 },
  { name: 'Battleaxe', type: 'weapon', rarity: 'uncommon', description: 'A heavy, well-balanced axe.', value: 100, equipSlot: 'weapon', damageDie: '1d10', damageBonus: 0, attackBonus: 0, range: 1 },
  { name: 'Flaming Dagger', type: 'weapon', rarity: 'uncommon', description: 'A dagger with a blade of living fire. +1d4 damage.', value: 250, equipSlot: 'weapon', damageDie: '1d4+2', damageBonus: 0, attackBonus: 1, range: 1 },
  { name: 'Hand Crossbow +1', type: 'weapon', rarity: 'uncommon', description: 'A compact crossbow enchanted for accuracy. Range 30/120ft.', value: 300, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 1, isRanged: true, range: 6 },
  { name: 'Breastplate', type: 'armor', rarity: 'uncommon', description: 'Polished medium armor. AC 14 + DEX (max 2).', value: 400, equipSlot: 'armor', acBonus: 14, armorCategory: 'medium' },
  { name: 'Cloak of Elvenkind', type: 'misc', rarity: 'uncommon', description: 'Advantage on stealth. +1 DEX while worn.', value: 350, statBonus: { DEX: 1 } },
];

const RARE_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Superior Healing Potion', type: 'potion', rarity: 'rare', description: 'Restores 8d4+8 HP.', value: 500, healAmount: 36, quantity: 1 },
  { name: 'Greatsword +2', type: 'weapon', rarity: 'rare', description: 'A massive blade wreathed in flame.', value: 800, equipSlot: 'weapon', damageDie: '2d6', damageBonus: 2, attackBonus: 2, range: 1 },
  { name: 'Half Plate +1', type: 'armor', rarity: 'rare', description: 'Medium armor with magical reinforcement. AC 16 + DEX (max 2).', value: 1000, equipSlot: 'armor', acBonus: 16, armorCategory: 'medium' },
  { name: 'Ring of Strength', type: 'ring', rarity: 'rare', description: '+2 STR while worn.', value: 800, equipSlot: 'ring', statBonus: { STR: 2 } },
  { name: 'Amulet of Health', type: 'misc', rarity: 'rare', description: 'A warm glow that bolsters vitality. +2 CON.', value: 800, statBonus: { CON: 2 } },
  { name: 'Frostbrand Rapier', type: 'weapon', rarity: 'rare', description: 'A rapier that trails wisps of frost. +2 to hit and damage.', value: 900, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 2, attackBonus: 2, range: 1 },
  { name: 'Longbow +2', type: 'weapon', rarity: 'rare', description: 'An elven bow that hums with power. Range 150/600ft.', value: 900, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 2, attackBonus: 2, isRanged: true, range: 30 },
  { name: 'Adamantine Shield', type: 'shield', rarity: 'rare', description: 'Nearly indestructible. +3 AC.', value: 750, equipSlot: 'shield', acBonus: 3 },
  { name: 'Headband of Intellect', type: 'misc', rarity: 'rare', description: 'Sharpens the mind. +2 INT while worn.', value: 900, statBonus: { INT: 2 } },
];

const EPIC_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Potion of Supreme Healing', type: 'potion', rarity: 'epic', description: 'Restores 10d4+20 HP.', value: 1500, healAmount: 55, quantity: 1 },
  { name: 'Vorpal Greatsword', type: 'weapon', rarity: 'epic', description: 'A blade so sharp it hums. +3 to hit and damage.', value: 3000, equipSlot: 'weapon', damageDie: '2d6+3', damageBonus: 3, attackBonus: 3, range: 1 },
  { name: 'Plate Armor of Etherealness', type: 'armor', rarity: 'epic', description: 'Gleaming full plate infused with planar energy.', value: 5000, equipSlot: 'armor', acBonus: 18, armorCategory: 'heavy' },
  { name: 'Ring of Spell Storing', type: 'ring', rarity: 'epic', description: 'Stores latent magic. +2 AC, +2 WIS.', value: 4000, equipSlot: 'ring', acBonus: 2, statBonus: { WIS: 2 } },
  { name: 'Oathbow', type: 'weapon', rarity: 'epic', description: 'Sworn enemy takes 3d6 extra. +3 to hit. Range 150/600ft.', value: 4500, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 3, attackBonus: 3, isRanged: true, range: 30 },
  { name: 'Staff of Power', type: 'weapon', rarity: 'epic', description: 'Crackles with arcane might. +3 to hit, 2d8+3 damage.', value: 4000, equipSlot: 'weapon', damageDie: '2d8', damageBonus: 3, attackBonus: 3, range: 1 },
];

// Roll loot based on enemy count and party level
export function rollLoot(enemyCount: number, partyLevel: number): Item[] {
  const items: Item[] = [];
  for (let i = 0; i < enemyCount; i++) {
    const roll = Math.random();
    // Higher level = better loot chances
    const epicChance = Math.max(0, 0.005 + (partyLevel - 3) * 0.005); // ~0 at lv1, ~1% at lv5
    const rareChance = 0.02 + partyLevel * 0.01;
    const uncommonChance = 0.1 + partyLevel * 0.02;

    let pool: Omit<Item, 'id'>[];
    if (roll < epicChance) pool = EPIC_LOOT;
    else if (roll < epicChance + rareChance) pool = RARE_LOOT;
    else if (roll < epicChance + rareChance + uncommonChance) pool = UNCOMMON_LOOT;
    else if (roll < 0.6) pool = COMMON_LOOT;
    else continue; // ~40% chance of no item from this enemy

    const template = pool[Math.floor(Math.random() * pool.length)];
    items.push({ ...template, id: crypto.randomUUID() });
  }
  return items;
}

// Rarity color mapping for UI
export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: 'text-slate-300',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
};
export const RARITY_BG: Record<ItemRarity, string> = {
  common: 'border-slate-600',
  uncommon: 'border-green-700/50',
  rare: 'border-blue-700/50',
  epic: 'border-purple-700/50',
};

// --- Shop system ---
// Curated shop inventory — items available for purchase (always in stock)
export const SHOP_ITEMS: (Omit<Item, 'id'> & { category: string })[] = [
  // Weapons — Melee
  { name: 'Dagger', type: 'weapon', rarity: 'common', description: 'Light and concealable.', value: 2, equipSlot: 'weapon', damageDie: '1d4', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Shortsword', type: 'weapon', rarity: 'common', description: 'A reliable blade.', value: 10, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Longsword', type: 'weapon', rarity: 'common', description: 'Versatile and dependable.', value: 15, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Battleaxe', type: 'weapon', rarity: 'uncommon', description: 'A heavy, well-balanced axe.', value: 100, equipSlot: 'weapon', damageDie: '1d10', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  { name: 'Greatsword', type: 'weapon', rarity: 'uncommon', description: 'Two-handed, devastating.', value: 150, equipSlot: 'weapon', damageDie: '2d6', damageBonus: 0, attackBonus: 0, range: 1, category: 'Weapons' },
  // Weapons — Ranged
  { name: 'Shortbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16, category: 'Weapons' },
  { name: 'Longbow', type: 'weapon', rarity: 'common', description: 'Range 150/600ft.', value: 50, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, isRanged: true, range: 30, category: 'Weapons' },
  { name: 'Light Crossbow', type: 'weapon', rarity: 'common', description: 'Range 80/320ft.', value: 25, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, isRanged: true, range: 16, category: 'Weapons' },
  { name: 'Hand Crossbow', type: 'weapon', rarity: 'common', description: 'Range 30/120ft. One-handed.', value: 75, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, isRanged: true, range: 6, category: 'Weapons' },
  // Armor
  { name: 'Leather Armor', type: 'armor', rarity: 'common', description: 'Light and flexible.', value: 10, equipSlot: 'armor', acBonus: 11, armorCategory: 'light', category: 'Armor' },
  { name: 'Chain Shirt', type: 'armor', rarity: 'common', description: 'Medium armor, reliable.', value: 50, equipSlot: 'armor', acBonus: 13, armorCategory: 'medium', category: 'Armor' },
  { name: 'Scale Mail', type: 'armor', rarity: 'uncommon', description: 'Sturdy medium armor.', value: 50, equipSlot: 'armor', acBonus: 14, armorCategory: 'medium', category: 'Armor' },
  { name: 'Chain Mail', type: 'armor', rarity: 'uncommon', description: 'Heavy armor.', value: 75, equipSlot: 'armor', acBonus: 16, armorCategory: 'heavy', category: 'Armor' },
  { name: 'Wooden Shield', type: 'shield', rarity: 'common', description: '+2 AC.', value: 10, equipSlot: 'shield', acBonus: 2, category: 'Armor' },
  // Potions
  { name: 'Healing Potion', type: 'potion', rarity: 'common', description: 'Restores 2d4+2 HP.', value: 50, healAmount: 9, quantity: 1, category: 'Potions' },
  { name: 'Greater Healing Potion', type: 'potion', rarity: 'uncommon', description: 'Restores 4d4+4 HP.', value: 150, healAmount: 18, quantity: 1, category: 'Potions' },
  { name: 'Superior Healing Potion', type: 'potion', rarity: 'rare', description: 'Restores 8d4+8 HP.', value: 500, healAmount: 36, quantity: 1, category: 'Potions' },
  // Accessories
  { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: '+1 AC while worn.', value: 300, equipSlot: 'ring', acBonus: 1, category: 'Accessories' },
  { name: 'Scroll of Identify', type: 'scroll', rarity: 'common', description: "Reveals an item's properties.", value: 25, category: 'Accessories' },
];

export const SHOP_CATEGORIES = ['Weapons', 'Armor', 'Potions', 'Accessories'] as const;

// Hit die average by class — used for HP gain on level-up and short rest healing
export const HIT_DIE_AVG: Record<string, number> = {
  Fighter: 6,
  Barbarian: 7,
  Paladin: 6,
  Ranger: 6,
  Rogue: 5,
  Monk: 5,
  Cleric: 5,
  Bard: 5,
  Druid: 5,
  Warlock: 5,
  Wizard: 4,
  Sorcerer: 4,
};

// D&D 5e AC calculation: respects armor category DEX caps
// Light: base + full DEX mod, Medium: base + DEX mod (max +2), Heavy: base (no DEX)
export function calculateAC(stats: Stats, equipment: EquipmentSlots): number {
  const dexMod = Math.floor((stats.DEX - 10) / 2);
  const armor = equipment.armor;
  const shieldAC = equipment.shield?.acBonus ?? 0;
  const ringAC = equipment.ring?.acBonus ?? 0;

  if (!armor || !armor.acBonus) {
    // No armor: 10 + full DEX mod
    return 10 + dexMod + shieldAC + ringAC;
  }

  let armorAC = armor.acBonus;
  switch (armor.armorCategory) {
    case 'light':
      armorAC += dexMod;
      break;
    case 'medium':
      armorAC += Math.min(dexMod, 2);
      break;
    case 'heavy':
      // No DEX bonus
      break;
    default:
      // Legacy items without armorCategory: use old behavior (base AC, no DEX — conservative)
      break;
  }

  return armorAC + shieldAC + ringAC;
}

// --- Spell system ---
export type SpellSchool = 'evocation' | 'abjuration' | 'conjuration' | 'divination' | 'enchantment' | 'illusion' | 'necromancy' | 'transmutation';

// AoE spell template shapes
export type AoEShape = 'circle' | 'cone' | 'line' | 'cube';
export interface AoETemplate {
  shape: AoEShape;
  radiusCells: number; // radius in grid cells (5ft per cell)
  color: string;       // rgba overlay color
}

export interface Spell {
  id: string;
  name: string;
  level: number; // 0 = cantrip, 1-9 = spell levels
  school: SpellSchool;
  description: string;
  damage?: string; // e.g. "1d10" for fire bolt, scales with level
  healAmount?: number; // for healing spells
  range: string; // "Touch", "Self", "60ft", etc.
  duration: string; // "Instantaneous", "1 minute", "Concentration, 1 hour"
  saveStat?: StatName; // target save stat (DEX for fireball, WIS for hold person)
  isConcentration: boolean;
  classes: CharacterClass[]; // which classes can learn this
  appliesCondition?: ConditionType; // condition applied on hit/failed save
  conditionDuration?: number; // rounds the condition lasts
  aoe?: AoETemplate; // area of effect template for visual overlay
}

// Spell slot table: spellSlots[classLevel][spellLevel] = number of slots
// Simplified D&D 5e full caster table (levels 1-5 for now)
export const FULL_CASTER_SLOTS: Record<number, Record<number, number>> = {
  1: { 1: 2 },
  2: { 1: 3 },
  3: { 1: 4, 2: 2 },
  4: { 1: 4, 2: 3 },
  5: { 1: 4, 2: 3, 3: 2 },
};
// Half-casters (Paladin, Ranger) get slots 1 level later
export const HALF_CASTER_SLOTS: Record<number, Record<number, number>> = {
  1: {},
  2: { 1: 2 },
  3: { 1: 3 },
  4: { 1: 3 },
  5: { 1: 4, 2: 2 },
};

export const FULL_CASTERS: CharacterClass[] = ['Wizard', 'Sorcerer', 'Cleric', 'Druid', 'Bard', 'Warlock'];
export const HALF_CASTERS: CharacterClass[] = ['Paladin', 'Ranger'];

// Get spell slots for a class at a given level
export function getSpellSlots(charClass: CharacterClass, level: number): Record<number, number> {
  const clampedLevel = Math.min(level, 5);
  if (FULL_CASTERS.includes(charClass)) return FULL_CASTER_SLOTS[clampedLevel] || {};
  if (HALF_CASTERS.includes(charClass)) return HALF_CASTER_SLOTS[clampedLevel] || {};
  return {}; // non-casters
}

// Curated spell list — cantrips + level 1-3 spells, enough for levels 1-5
export const SPELL_LIST: Spell[] = [
  // Cantrips (level 0)
  { id: 'fire-bolt', name: 'Fire Bolt', level: 0, school: 'evocation', description: 'Hurl a mote of fire. +spell attack, 1d10 fire damage.', damage: '1d10', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'sacred-flame', name: 'Sacred Flame', level: 0, school: 'evocation', description: 'Radiant flames descend. DEX save or 1d8 radiant damage.', damage: '1d8', range: '60ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Cleric'] },
  { id: 'eldritch-blast', name: 'Eldritch Blast', level: 0, school: 'evocation', description: 'A beam of crackling energy. +spell attack, 1d10 force damage.', damage: '1d10', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Warlock'] },
  { id: 'vicious-mockery', name: 'Vicious Mockery', level: 0, school: 'enchantment', description: 'Cutting words. WIS save or 1d4 psychic damage + disadvantage.', damage: '1d4', range: '60ft', duration: 'Instantaneous', saveStat: 'WIS', isConcentration: false, classes: ['Bard'], appliesCondition: 'frightened', conditionDuration: 1 },
  { id: 'produce-flame', name: 'Produce Flame', level: 0, school: 'conjuration', description: 'A flame in your palm. Hurl it for 1d8 fire damage.', damage: '1d8', range: '30ft', duration: 'Instantaneous', isConcentration: false, classes: ['Druid'] },
  { id: 'ray-of-frost', name: 'Ray of Frost', level: 0, school: 'evocation', description: 'A frigid beam. +spell attack, 1d8 cold damage, -10ft speed.', damage: '1d8', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'minor-illusion', name: 'Minor Illusion', level: 0, school: 'illusion', description: 'Create a sound or image of an object within range.', range: '30ft', duration: '1 minute', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'] },
  // Level 1
  { id: 'magic-missile', name: 'Magic Missile', level: 1, school: 'evocation', description: 'Three darts of magical force. Each deals 1d4+1. Auto-hit.', damage: '3d4+3', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'cure-wounds', name: 'Cure Wounds', level: 1, school: 'evocation', description: 'Touch a creature and restore 1d8+mod HP.', healAmount: 8, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'shield', name: 'Shield', level: 1, school: 'abjuration', description: 'Reaction: +5 AC until your next turn.', range: 'Self', duration: '1 round', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'burning-hands', name: 'Burning Hands', level: 1, school: 'evocation', description: '15ft cone of fire. DEX save or 3d6 fire damage. Sets target ablaze.', damage: '3d6', range: 'Self (15ft cone)', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'], appliesCondition: 'burning', conditionDuration: 2, aoe: { shape: 'cone', radiusCells: 3, color: 'rgba(251,146,60,0.25)' } },
  { id: 'healing-word', name: 'Healing Word', level: 1, school: 'evocation', description: 'Bonus action. Heal 1d4+mod HP at range.', healAmount: 5, range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard', 'Druid'] },
  { id: 'thunderwave', name: 'Thunderwave', level: 1, school: 'evocation', description: '15ft cube of thunder. CON save or 2d8 damage + pushed 10ft.', damage: '2d8', range: 'Self (15ft cube)', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Druid'], aoe: { shape: 'cube', radiusCells: 3, color: 'rgba(96,165,250,0.25)' } },
  { id: 'hex', name: 'Hex', level: 1, school: 'enchantment', description: 'Curse a target. Deal extra 1d6 necrotic on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Warlock'], appliesCondition: 'hexed', conditionDuration: 3 },
  { id: 'hunters-mark', name: "Hunter's Mark", level: 1, school: 'divination', description: 'Mark a target. Deal extra 1d6 on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Ranger'] },
  { id: 'divine-smite-spell', name: 'Searing Smite', level: 1, school: 'evocation', description: 'Your weapon flares with fire. +1d6 fire damage on hit.', damage: '1d6', range: 'Self', duration: 'Concentration, 1 minute', isConcentration: true, classes: ['Paladin'] },
  // Level 2
  { id: 'scorching-ray', name: 'Scorching Ray', level: 2, school: 'evocation', description: 'Three rays of fire. Each +spell attack for 2d6 fire.', damage: '6d6', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'spiritual-weapon', name: 'Spiritual Weapon', level: 2, school: 'evocation', description: 'Floating spectral weapon. Bonus action attack for 1d8+mod.', damage: '1d8', range: '60ft', duration: '1 minute', isConcentration: false, classes: ['Cleric'] },
  { id: 'misty-step', name: 'Misty Step', level: 2, school: 'conjuration', description: 'Bonus action teleport up to 30ft.', range: 'Self', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
  { id: 'lesser-restoration', name: 'Lesser Restoration', level: 2, school: 'abjuration', description: 'End one disease or condition on a creature.', range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'hold-person', name: 'Hold Person', level: 2, school: 'enchantment', description: 'WIS save or paralyzed for 1 minute (concentration).', range: '60ft', duration: 'Concentration, 1 minute', saveStat: 'WIS', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Cleric', 'Bard', 'Warlock', 'Druid'], appliesCondition: 'stunned', conditionDuration: 2 },
  // Level 3
  { id: 'fireball', name: 'Fireball', level: 3, school: 'evocation', description: '20ft radius explosion. DEX save or 8d6 fire damage.', damage: '8d6', range: '150ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'], aoe: { shape: 'circle', radiusCells: 4, color: 'rgba(239,68,68,0.25)' } },
  { id: 'spirit-guardians', name: 'Spirit Guardians', level: 3, school: 'conjuration', description: 'Spirits swirl around you. Enemies in 15ft take 3d8 radiant.', damage: '3d8', range: 'Self (15ft radius)', duration: 'Concentration, 10 minutes', saveStat: 'WIS', isConcentration: true, classes: ['Cleric'], aoe: { shape: 'circle', radiusCells: 3, color: 'rgba(251,191,36,0.25)' } },
  { id: 'revivify', name: 'Revivify', level: 3, school: 'necromancy', description: 'Touch a creature dead for less than 1 minute. It returns with 1 HP.', healAmount: 1, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Paladin', 'Druid'] },
  { id: 'counterspell', name: 'Counterspell', level: 3, school: 'abjuration', description: 'Reaction: interrupt a creature casting a spell of 3rd level or lower.', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
];

// Get spells available for a class (cantrips + spells they can cast at their level)
export function getClassSpells(charClass: CharacterClass, level: number): Spell[] {
  const slots = getSpellSlots(charClass, level);
  const maxSpellLevel =
    Object.keys(slots)
      .map(Number)
      .sort((a, b) => b - a)[0] || 0;
  return SPELL_LIST.filter((s) => s.classes.includes(charClass) && s.level <= Math.max(maxSpellLevel, 0));
}

// Roll spell damage: parse "XdY" or "XdY+Z"
export function rollSpellDamage(die: string): number {
  const match = die.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (!match) return 0;
  const [, count, sides, bonus] = match;
  let total = 0;
  for (let i = 0; i < Number(count); i++) total += Math.floor(Math.random() * Number(sides)) + 1;
  return total + (bonus ? Number(bonus) : 0);
}

// --- Class ability system ---
export interface ClassAbility {
  id: string;
  name: string;
  class: CharacterClass;
  description: string;
  type: 'heal' | 'buff' | 'attack' | 'utility'; // what the ability does
  resetsOn: 'short' | 'long'; // when the cooldown resets
  damage?: string; // e.g. "2d6" — for attack-type abilities
  healFormula?: 'level_d10' | 'level_x5' | 'level_d6'; // scaled heal
  appliesCondition?: ConditionType;
  conditionDuration?: number;
  selfOnly?: boolean; // targets self (vs enemy)
  color: string; // tailwind color for UI
}

export const CLASS_ABILITIES: ClassAbility[] = [
  // Fighter: Second Wind — heal 1d10+level HP, 1/short rest
  { id: 'second-wind', name: 'Second Wind', class: 'Fighter', type: 'heal', resetsOn: 'short', healFormula: 'level_d10', selfOnly: true, color: 'red', description: 'Dig deep and recover 1d10+level HP' },
  // Barbarian: Rage — +2 damage, blessed condition (damage resistance flavor), 1/long rest
  { id: 'rage', name: 'Rage', class: 'Barbarian', type: 'buff', resetsOn: 'long', appliesCondition: 'raging', conditionDuration: 3, selfOnly: true, color: 'red', description: 'Enter a rage: +2 to attacks for 3 rounds' },
  // Rogue: Sneak Attack — extra 2d6 damage on one attack, 1/short rest
  { id: 'sneak-attack', name: 'Sneak Attack', class: 'Rogue', type: 'attack', resetsOn: 'short', damage: '2d6', color: 'slate', description: 'Strike a vital spot for 2d6 extra damage' },
  // Paladin: Lay on Hands — heal level*5 HP, 1/long rest
  { id: 'lay-on-hands', name: 'Lay on Hands', class: 'Paladin', type: 'heal', resetsOn: 'long', healFormula: 'level_x5', selfOnly: true, color: 'yellow', description: 'Channel divine energy to heal level\u00d75 HP' },
  // Ranger: Hunter's Mark — hex the target for 3 rounds (+bonus damage), 1/short rest
  { id: 'hunters-mark', name: "Hunter's Mark", class: 'Ranger', type: 'buff', resetsOn: 'short', appliesCondition: 'hexed', conditionDuration: 3, selfOnly: false, color: 'green', description: "Mark a target \u2014 they're hexed for 3 rounds" },
  // Monk: Flurry of Blows — deal 2d4 extra damage, 1/short rest
  { id: 'flurry-of-blows', name: 'Flurry of Blows', class: 'Monk', type: 'attack', resetsOn: 'short', damage: '2d4', color: 'cyan', description: 'Unleash a rapid flurry of unarmed strikes for 2d4 damage' },
  // Cleric: Channel Divinity — heal self for level*d6, 1/short rest
  { id: 'channel-divinity', name: 'Channel Divinity', class: 'Cleric', type: 'heal', resetsOn: 'short', healFormula: 'level_d6', selfOnly: true, color: 'yellow', description: 'Invoke divine power to heal level\u00d7d6 HP' },
  // Bard: Bardic Inspiration — apply blessed to self for 3 rounds, 1/short rest
  { id: 'bardic-inspiration', name: 'Bardic Inspiration', class: 'Bard', type: 'buff', resetsOn: 'short', appliesCondition: 'inspired', conditionDuration: 3, selfOnly: true, color: 'pink', description: 'Inspire yourself with a rousing melody (+2 attacks/saves for 3 rounds)' },
  // Druid: Wild Shape — gain temp HP (level*3) via blessed condition, 1/short rest
  { id: 'wild-shape', name: 'Wild Shape', class: 'Druid', type: 'heal', resetsOn: 'short', healFormula: 'level_d10', selfOnly: true, color: 'green', description: 'Shift into beast form, recovering 1d10+level HP' },
  // Warlock: Eldritch Blast — deal 2d10 force damage to a target, 1/short rest
  { id: 'eldritch-blast', name: 'Eldritch Blast', class: 'Warlock', type: 'attack', resetsOn: 'short', damage: '2d10', color: 'fuchsia', description: 'Hurl a beam of crackling force for 2d10 damage' },
  // Wizard: Arcane Recovery — restore 1 used spell slot, 1/long rest
  { id: 'arcane-recovery', name: 'Arcane Recovery', class: 'Wizard', type: 'utility', resetsOn: 'long', color: 'blue', description: 'Recover one expended spell slot through study' },
  // Sorcerer: Metamagic Empower — deal 3d8 force damage (empowered spell), 1/long rest
  { id: 'metamagic-empower', name: 'Metamagic: Empower', class: 'Sorcerer', type: 'attack', resetsOn: 'long', damage: '3d8', color: 'amber', description: 'Channel raw sorcery into a 3d8 empowered blast' },
];

export function getClassAbility(charClass: CharacterClass): ClassAbility | undefined {
  return CLASS_ABILITIES.find((a) => a.class === charClass);
}

// --- Feats system ---
export interface Feat {
  id: string;
  name: string;
  description: string;
  // Concrete bonuses applied to character on selection
  statBonuses?: Partial<Record<StatName, number>>;
  maxHpPerLevel?: number; // bonus HP per character level (Tough)
  acBonus?: number;
  initiativeBonus?: number;
  attackBonus?: number;
  damageBonus?: number;
  savingThrowBonus?: number; // flat bonus to all saves
}

export const FEATS: Feat[] = [
  { id: 'tough', name: 'Tough', description: 'Your hit point maximum increases by 2 for every level you have.', maxHpPerLevel: 2 },
  { id: 'alert', name: 'Alert', description: "+5 to initiative. You can't be surprised while conscious.", initiativeBonus: 5 },
  { id: 'great-weapon-master', name: 'Great Weapon Master', description: 'Your heavy weapon strikes deal +3 bonus damage.', damageBonus: 3 },
  { id: 'war-caster', name: 'War Caster', description: '+2 to spell attack rolls and concentration saves.', attackBonus: 2 },
  { id: 'lucky', name: 'Lucky', description: '+1 to all saving throws from sheer fortune.', savingThrowBonus: 1 },
  { id: 'durable', name: 'Durable', description: '+1 CON and +1 HP per level.', statBonuses: { CON: 1 }, maxHpPerLevel: 1 },
  { id: 'observant', name: 'Observant', description: '+1 WIS. You read lips and notice hidden details.', statBonuses: { WIS: 1 } },
  { id: 'resilient', name: 'Resilient', description: '+1 CON and proficiency in CON saving throws.', statBonuses: { CON: 1 }, savingThrowBonus: 1 },
];

// ASI levels in D&D 5e (all classes)
export const ASI_LEVELS = [4, 8, 12, 16, 19];

// Check if a character has a pending level-up choice
export function hasPendingASI(character: Character): boolean {
  // Count how many ASI levels the character has reached
  const asiLevelsReached = ASI_LEVELS.filter((l) => character.level >= l).length;
  // Count how many choices they've already made (ASIs applied + feats taken)
  const choicesMade = character.asiChoicesMade || 0;
  return asiLevelsReached > choicesMade;
}

// Martial classes that get Extra Attack at level 5
export const EXTRA_ATTACK_CLASSES: CharacterClass[] = ['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Monk'];

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
  inventory: Item[]; // carried items
  equipment: EquipmentSlots; // currently equipped gear
  spellSlotsUsed: Record<number, number>; // spellLevel -> slots used this rest
  classAbilityUsed: boolean; // whether the class ability has been used this rest period
  feats: string[]; // feat IDs the character has taken
  asiChoicesMade: number; // how many ASI/feat choices have been applied (tracks against ASI_LEVELS)
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
  addItem: (charId: string, item: Item) => void;
  removeItem: (charId: string, itemId: string) => void;
  equipItem: (charId: string, itemId: string) => void;
  unequipItem: (charId: string, slot: EquipSlot) => void;
  useItem: (charId: string, itemId: string) => { message: string };

  // Shop
  buyItem: (charId: string, shopItem: Omit<Item, 'id'>) => { success: boolean; message: string };
  sellItem: (charId: string, itemId: string) => { success: boolean; message: string };

  // Spells
  castSpell: (charId: string, spellId: string, targetUnitId?: string) => { success: boolean; message: string };
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

  // Combat helpers (return updated units array for multiplayer sync)
  concentrationMessages: React.MutableRefObject<string[]>;
  damageUnit: (unitId: string, damage: number) => Unit[];
  healUnit: (unitId: string, amount: number) => Unit[];
  removeUnit: (unitId: string) => Unit[];
  rollInitiative: () => Unit[];
  nextTurn: () => { units: Unit[]; turnIndex: number; newRound: boolean };
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
  concentrationMessages: { current: [] },
  damageUnit: () => [],
  healUnit: () => [],
  removeUnit: () => [],
  rollInitiative: () => [],
  nextTurn: () => ({ units: [], turnIndex: 0, newRound: false }),
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

  // Fetch user identity on mount — populate currentPlayer with real user data (Discord or Google)
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? (r.json() as Promise<{ user?: { id?: string; username?: string; global_name?: string; avatar?: string; picture?: string } }>) : null))
      .then((data) => {
        if (data?.user?.id) {
          const u = data.user;
          // Google: picture is a full URL. Discord: avatar is a hash, construct CDN URL.
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
      .then((r) => (r.ok ? (r.json() as Promise<{ characters?: Character[] }>) : null))
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          const hpGain = ((HIT_DIE_AVG[c.class] || 5) + conMod + featHpPerLevel) * levelsGained;
          const newMaxHp = c.maxHp + hpGain;
          return { ...c, xp: totalXP, level, maxHp: newMaxHp, hp: newMaxHp }; // full heal on level up
        }
        return { ...c, xp: totalXP };
      })
    );
    return { leveledUp, newLevel };
  }, []);

  // Rest: short rest heals hit die + CON, long rest fully heals + resets death saves + clears conditions
  // Both rest types reset class abilities based on the ability's resetsOn property
  const restCharacter = useCallback((id: string, type: 'short' | 'long') => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const ability = getClassAbility(c.class);
        const resetAbility = ability ? type === 'long' || ability.resetsOn === 'short' : false;
        if (type === 'long') {
          return { ...c, hp: c.maxHp, deathSaves: { successes: 0, failures: 0 }, condition: 'normal' as Condition, spellSlotsUsed: {}, classAbilityUsed: false };
        }
        // Short rest: heal hit die average + CON mod (once)
        const conMod = Math.floor((c.stats.CON - 10) / 2);
        const heal = Math.max(1, (HIT_DIE_AVG[c.class] || 5) + conMod);
        return { ...c, hp: Math.min(c.maxHp, c.hp + heal), condition: c.hp > 0 ? ('normal' as Condition) : c.condition, classAbilityUsed: resetAbility ? false : c.classAbilityUsed };
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
        } else {
          msg = `${c.name} uses ${item.name}.`;
        }

        // Remove or decrement
        if (item.quantity && item.quantity > 1) {
          updated.inventory = inv.map((i) => (i.id === itemId ? { ...i, quantity: (i.quantity || 1) - 1 } : i));
        } else {
          updated.inventory = inv.filter((i) => i.id !== itemId);
        }
        return updated;
      })
    );
    return { message: msg };
  }, []);

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
  const damageUnit = useCallback(
    (unitId: string, damage: number): Unit[] => {
      let result: Unit[] = [];
      setUnits((prev) => {
        const updated = prev.map((u) => (u.id === unitId ? { ...u, hp: Math.max(0, u.hp - damage) } : u));
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
    [characters]
  );

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
          if (cond.duration === -1) {
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
  }, []);

  // Spells: cast a spell (check slots, apply damage/healing, consume slot)
  const castSpell = useCallback(
    (charId: string, spellId: string, targetUnitId?: string): { success: boolean; message: string } => {
      let result = { success: false, message: '' };
      const spell = SPELL_LIST.find((s) => s.id === spellId);
      if (!spell) {
        return { success: false, message: 'Unknown spell.' };
      }

      setCharacters((prev) =>
        prev.map((c) => {
          if (c.id !== charId) return c;
          if (spell.level > 0) {
            const maxSlots = getSpellSlots(c.class, c.level);
            const used = c.spellSlotsUsed || {};
            const slotsAvail = (maxSlots[spell.level] || 0) - (used[spell.level] || 0);
            if (slotsAvail <= 0) {
              result = { success: false, message: `No level ${spell.level} spell slots remaining!` };
              return c;
            }
            const newUsed = { ...used, [spell.level]: (used[spell.level] || 0) + 1 };
            result = { success: true, message: '' };
            return { ...c, spellSlotsUsed: newUsed };
          }
          result = { success: true, message: '' };
          return c;
        })
      );

      if (result.success) {
        const char = characters.find((c) => c.id === charId);
        const casterName = char?.name || 'Caster';

        // Concentration: if this spell requires concentration, drop any existing concentration
        if (spell.isConcentration) {
          const casterUnit = units.find((u) => u.characterId === charId);
          if (casterUnit?.concentratingOn) {
            // Drop old concentration — remove conditions applied by the old spell
            const oldSpellName = casterUnit.concentratingOn;
            // Clear concentration conditions from all units that were sourced by this caster
            setUnits((prev) =>
              prev.map((u) => ({
                ...u,
                conditions: (u.conditions || []).filter((c) => c.source !== casterName),
                concentratingOn: u.id === casterUnit.id ? undefined : u.concentratingOn,
              }))
            );
            result.message = `${casterName} breaks concentration on ${oldSpellName}. `;
          }
          // Set new concentration on caster unit
          if (casterUnit) {
            setUnits((prev) => prev.map((u) => (u.id === casterUnit.id ? { ...u, concentratingOn: spell.name } : u)));
          }
        }

        // Saving throw: if spell has saveStat, target rolls to resist
        let targetSaved = false;
        if (spell.saveStat && targetUnitId) {
          const target = units.find((u) => u.id === targetUnitId);
          if (target && char) {
            // Spell save DC = 8 + proficiency + casting stat mod
            const castingStatMap: Record<string, StatName> = {
              Wizard: 'INT',
              Sorcerer: 'CHA',
              Cleric: 'WIS',
              Druid: 'WIS',
              Bard: 'CHA',
              Warlock: 'CHA',
              Paladin: 'CHA',
              Ranger: 'WIS',
            };
            const castingStat = castingStatMap[char.class] || 'INT';
            const castMod = Math.floor((char.stats[castingStat] - 10) / 2);
            const profBonus = Math.ceil(char.level / 4) + 1;
            const spellDC = 8 + profBonus + castMod;
            // Target save roll: d20 + save stat mod (enemies use dexMod for DEX, or 0 for others)
            const saveRoll = Math.floor(Math.random() * 20) + 1;
            const targetSaveMod = spell.saveStat === 'DEX' ? target.dexMod || 0 : 0;
            const condSaveMod = (target.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.saveMod || 0), 0);
            const totalSave = saveRoll + targetSaveMod + condSaveMod;
            targetSaved = totalSave >= spellDC;
          }
        }

        if (spell.damage) {
          let dmg = rollSpellDamage(spell.damage);
          if (targetSaved) dmg = Math.floor(dmg / 2); // half damage on save
          if (targetUnitId) damageUnit(targetUnitId, dmg);
          const targetName = units.find((u) => u.id === targetUnitId)?.name || 'Target';
          result.message = targetSaved ? `${casterName} casts ${spell.name}! ${targetName} saves \u2014 ${dmg} damage (half).` : `${casterName} casts ${spell.name} for ${dmg} damage!`;
          // Apply condition only if target failed the save
          if (spell.appliesCondition && targetUnitId && !targetSaved) {
            applyCondition(targetUnitId, { type: spell.appliesCondition, duration: spell.conditionDuration || 2, source: casterName });
            result.message += ` ${units.find((u) => u.id === targetUnitId)?.name || 'Target'} is ${spell.appliesCondition}!`;
          } else if (spell.appliesCondition && targetSaved) {
            result.message += ` ${units.find((u) => u.id === targetUnitId)?.name || 'Target'} resists the ${spell.appliesCondition} effect.`;
          }
        } else if (spell.healAmount) {
          if (char) {
            const healed = Math.min(spell.healAmount, char.maxHp - char.hp);
            setCharacters((prev) =>
              prev.map((c) => {
                if (c.id !== charId) return c;
                let updated = { ...c, hp: Math.min(c.maxHp, c.hp + spell.healAmount!) };
                if (c.condition === 'unconscious' || c.condition === 'stabilized') {
                  updated = { ...updated, condition: 'normal' as const, deathSaves: { successes: 0, failures: 0 } };
                }
                return updated;
              })
            );
            result.message = `${casterName} casts ${spell.name}, restoring ${healed} HP!`;
          } else {
            result.message = `${casterName} casts ${spell.name}.`;
          }
        } else if (spell.appliesCondition && targetUnitId) {
          // Pure condition spell (like Hold Person with no damage)
          const targetName = units.find((u) => u.id === targetUnitId)?.name || 'Target';
          if (targetSaved) {
            result.message = `${casterName} casts ${spell.name}! ${targetName} resists with a successful save.`;
          } else {
            applyCondition(targetUnitId, { type: spell.appliesCondition, duration: spell.conditionDuration || 2, source: casterName });
            result.message = `${casterName} casts ${spell.name}! ${targetName} is ${spell.appliesCondition}!`;
          }
        } else {
          result.message = `${casterName} casts ${spell.name}. ${spell.description}`;
        }
        if (spell.level > 0) result.message += ` (Level ${spell.level} slot used)`;
      }
      return result;
    },
    [characters, damageUnit, applyCondition, units]
  );

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
  // Returns sorted units for multiplayer sync.
  const rollInitiative = useCallback((): Unit[] => {
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
        const roll = Math.floor(Math.random() * 20) + 1 + dexMod + featInitBonus;
        // Reset movement for combat start; calculate speed from character data
        let speed = u.speed || 6;
        if (u.characterId) {
          const char = characters.find((c) => c.id === u.characterId);
          if (char && char.class === 'Monk') {
            speed = 6 + Math.floor(Math.max(0, char.level - 1) / 4) + (char.level >= 2 ? 2 : 0);
          }
        }
        return { ...u, initiative: roll, isCurrentTurn: false, movementUsed: 0, reactionUsed: false, disengaged: false, speed };
      });
      // Sort descending by initiative (higher goes first)
      withInitiative.sort((a, b) => b.initiative - a.initiative);
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
  const nextTurn = useCallback((): { units: Unit[]; turnIndex: number; newRound: boolean } => {
    let turnResult = { units: [] as Unit[], turnIndex: 0, newRound: false };
    setUnits((prev) => {
      const alive = prev.filter((u) => u.hp > 0);
      if (alive.length === 0) {
        turnResult = { units: prev, turnIndex: 0, newRound: false };
        return prev;
      }

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
      cleared[nextIdx].movementUsed = 0; // reset movement for new turn
      cleared[nextIdx].reactionUsed = false; // reset reaction for new turn
      cleared[nextIdx].disengaged = false; // reset disengage for new turn

      const isNewRound = wrapped || nextIdx <= currentIdx;
      if (isNewRound) {
        setCombatRound((r) => r + 1);
      }
      setTurnIndex(nextIdx);
      turnResult = { units: cleared, turnIndex: nextIdx, newRound: isNewRound };
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
