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

// --- Item & Equipment system ---
export type ItemType = 'weapon' | 'armor' | 'shield' | 'potion' | 'ring' | 'scroll' | 'misc';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic';
export type EquipSlot = 'weapon' | 'armor' | 'shield' | 'ring';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  description: string;
  value: number; // gold value
  // Equipment stats (only for equippable items)
  equipSlot?: EquipSlot;
  acBonus?: number;       // armor: base AC or shield: +AC
  damageDie?: string;     // weapon: e.g. "1d8", "2d6"
  damageBonus?: number;   // weapon: flat bonus to damage
  attackBonus?: number;   // weapon: flat bonus to hit
  healAmount?: number;    // potion: HP restored
  statBonus?: Partial<Stats>; // ring/misc: stat bonuses
  quantity?: number;      // stackable items (potions, scrolls)
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
  { name: 'Shortsword', type: 'weapon', rarity: 'common', description: 'A reliable blade.', value: 10, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0 },
  { name: 'Leather Armor', type: 'armor', rarity: 'common', description: 'Light and flexible.', value: 10, equipSlot: 'armor', acBonus: 11 },
  { name: 'Wooden Shield', type: 'shield', rarity: 'common', description: '+2 AC.', value: 10, equipSlot: 'shield', acBonus: 2 },
  { name: 'Dagger', type: 'weapon', rarity: 'common', description: 'Light and concealable.', value: 2, equipSlot: 'weapon', damageDie: '1d4', damageBonus: 0, attackBonus: 0 },
  { name: 'Handaxe', type: 'weapon', rarity: 'common', description: 'Can be thrown.', value: 5, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0 },
  { name: 'Chain Shirt', type: 'armor', rarity: 'common', description: 'Medium armor.', value: 50, equipSlot: 'armor', acBonus: 13 },
  { name: 'Scroll of Identify', type: 'scroll', rarity: 'common', description: 'Reveals an item\'s properties.', value: 25 },
];

const UNCOMMON_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Greater Healing Potion', type: 'potion', rarity: 'uncommon', description: 'Restores 4d4+4 HP.', value: 150, healAmount: 18, quantity: 1 },
  { name: 'Longsword +1', type: 'weapon', rarity: 'uncommon', description: 'A finely crafted blade that glows faintly.', value: 200, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 1, attackBonus: 1 },
  { name: 'Scale Mail', type: 'armor', rarity: 'uncommon', description: 'Sturdy medium armor.', value: 50, equipSlot: 'armor', acBonus: 14 },
  { name: 'Shield +1', type: 'shield', rarity: 'uncommon', description: 'An enchanted shield. +3 AC.', value: 200, equipSlot: 'shield', acBonus: 3 },
  { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: '+1 to AC while worn.', value: 300, equipSlot: 'ring', acBonus: 1 },
  { name: 'Battleaxe', type: 'weapon', rarity: 'uncommon', description: 'A heavy, well-balanced axe.', value: 100, equipSlot: 'weapon', damageDie: '1d10', damageBonus: 0, attackBonus: 0 },
];

const RARE_LOOT: Omit<Item, 'id'>[] = [
  { name: 'Superior Healing Potion', type: 'potion', rarity: 'rare', description: 'Restores 8d4+8 HP.', value: 500, healAmount: 36, quantity: 1 },
  { name: 'Greatsword +2', type: 'weapon', rarity: 'rare', description: 'A massive blade wreathed in flame.', value: 800, equipSlot: 'weapon', damageDie: '2d6', damageBonus: 2, attackBonus: 2 },
  { name: 'Half Plate +1', type: 'armor', rarity: 'rare', description: 'Heavy armor with magical reinforcement.', value: 1000, equipSlot: 'armor', acBonus: 16 },
  { name: 'Ring of Strength', type: 'ring', rarity: 'rare', description: '+2 STR while worn.', value: 800, equipSlot: 'ring', statBonus: { STR: 2 } },
  { name: 'Amulet of Health', type: 'misc', rarity: 'rare', description: 'A warm glow that bolsters vitality. +2 CON.', value: 800, statBonus: { CON: 2 } },
];

// Roll loot based on enemy count and party level
export function rollLoot(enemyCount: number, partyLevel: number): Item[] {
  const items: Item[] = [];
  for (let i = 0; i < enemyCount; i++) {
    const roll = Math.random();
    // Higher level = better loot chances
    const rareChance = 0.02 + partyLevel * 0.01;
    const uncommonChance = 0.1 + partyLevel * 0.02;

    let pool: Omit<Item, 'id'>[];
    if (roll < rareChance) pool = RARE_LOOT;
    else if (roll < rareChance + uncommonChance) pool = UNCOMMON_LOOT;
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
  // Weapons
  { name: 'Dagger', type: 'weapon', rarity: 'common', description: 'Light and concealable.', value: 2, equipSlot: 'weapon', damageDie: '1d4', damageBonus: 0, attackBonus: 0, category: 'Weapons' },
  { name: 'Shortsword', type: 'weapon', rarity: 'common', description: 'A reliable blade.', value: 10, equipSlot: 'weapon', damageDie: '1d6', damageBonus: 0, attackBonus: 0, category: 'Weapons' },
  { name: 'Longsword', type: 'weapon', rarity: 'common', description: 'Versatile and dependable.', value: 15, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, category: 'Weapons' },
  { name: 'Battleaxe', type: 'weapon', rarity: 'uncommon', description: 'A heavy, well-balanced axe.', value: 100, equipSlot: 'weapon', damageDie: '1d10', damageBonus: 0, attackBonus: 0, category: 'Weapons' },
  { name: 'Greatsword', type: 'weapon', rarity: 'uncommon', description: 'Two-handed, devastating.', value: 150, equipSlot: 'weapon', damageDie: '2d6', damageBonus: 0, attackBonus: 0, category: 'Weapons' },
  { name: 'Longbow', type: 'weapon', rarity: 'common', description: 'Range 150/600ft.', value: 50, equipSlot: 'weapon', damageDie: '1d8', damageBonus: 0, attackBonus: 0, category: 'Weapons' },
  // Armor
  { name: 'Leather Armor', type: 'armor', rarity: 'common', description: 'Light and flexible.', value: 10, equipSlot: 'armor', acBonus: 11, category: 'Armor' },
  { name: 'Chain Shirt', type: 'armor', rarity: 'common', description: 'Medium armor, reliable.', value: 50, equipSlot: 'armor', acBonus: 13, category: 'Armor' },
  { name: 'Scale Mail', type: 'armor', rarity: 'uncommon', description: 'Sturdy medium armor.', value: 50, equipSlot: 'armor', acBonus: 14, category: 'Armor' },
  { name: 'Chain Mail', type: 'armor', rarity: 'uncommon', description: 'Heavy armor.', value: 75, equipSlot: 'armor', acBonus: 16, category: 'Armor' },
  { name: 'Wooden Shield', type: 'shield', rarity: 'common', description: '+2 AC.', value: 10, equipSlot: 'shield', acBonus: 2, category: 'Armor' },
  // Potions
  { name: 'Healing Potion', type: 'potion', rarity: 'common', description: 'Restores 2d4+2 HP.', value: 50, healAmount: 9, quantity: 1, category: 'Potions' },
  { name: 'Greater Healing Potion', type: 'potion', rarity: 'uncommon', description: 'Restores 4d4+4 HP.', value: 150, healAmount: 18, quantity: 1, category: 'Potions' },
  { name: 'Superior Healing Potion', type: 'potion', rarity: 'rare', description: 'Restores 8d4+8 HP.', value: 500, healAmount: 36, quantity: 1, category: 'Potions' },
  // Accessories
  { name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: '+1 AC while worn.', value: 300, equipSlot: 'ring', acBonus: 1, category: 'Accessories' },
  { name: 'Scroll of Identify', type: 'scroll', rarity: 'common', description: 'Reveals an item\'s properties.', value: 25, category: 'Accessories' },
];

export const SHOP_CATEGORIES = ['Weapons', 'Armor', 'Potions', 'Accessories'] as const;

// --- Spell system ---
export type SpellSchool = 'evocation' | 'abjuration' | 'conjuration' | 'divination' | 'enchantment' | 'illusion' | 'necromancy' | 'transmutation';

export interface Spell {
  id: string;
  name: string;
  level: number; // 0 = cantrip, 1-9 = spell levels
  school: SpellSchool;
  description: string;
  damage?: string;      // e.g. "1d10" for fire bolt, scales with level
  healAmount?: number;   // for healing spells
  range: string;         // "Touch", "Self", "60ft", etc.
  duration: string;      // "Instantaneous", "1 minute", "Concentration, 1 hour"
  saveStat?: StatName;   // target save stat (DEX for fireball, WIS for hold person)
  isConcentration: boolean;
  classes: CharacterClass[]; // which classes can learn this
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
  { id: 'vicious-mockery', name: 'Vicious Mockery', level: 0, school: 'enchantment', description: 'Cutting words. WIS save or 1d4 psychic damage + disadvantage.', damage: '1d4', range: '60ft', duration: 'Instantaneous', saveStat: 'WIS', isConcentration: false, classes: ['Bard'] },
  { id: 'produce-flame', name: 'Produce Flame', level: 0, school: 'conjuration', description: 'A flame in your palm. Hurl it for 1d8 fire damage.', damage: '1d8', range: '30ft', duration: 'Instantaneous', isConcentration: false, classes: ['Druid'] },
  { id: 'ray-of-frost', name: 'Ray of Frost', level: 0, school: 'evocation', description: 'A frigid beam. +spell attack, 1d8 cold damage, -10ft speed.', damage: '1d8', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'minor-illusion', name: 'Minor Illusion', level: 0, school: 'illusion', description: 'Create a sound or image of an object within range.', range: '30ft', duration: '1 minute', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'] },
  // Level 1
  { id: 'magic-missile', name: 'Magic Missile', level: 1, school: 'evocation', description: 'Three darts of magical force. Each deals 1d4+1. Auto-hit.', damage: '3d4+3', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'cure-wounds', name: 'Cure Wounds', level: 1, school: 'evocation', description: 'Touch a creature and restore 1d8+mod HP.', healAmount: 8, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'shield', name: 'Shield', level: 1, school: 'abjuration', description: 'Reaction: +5 AC until your next turn.', range: 'Self', duration: '1 round', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'burning-hands', name: 'Burning Hands', level: 1, school: 'evocation', description: '15ft cone of fire. DEX save or 3d6 fire damage.', damage: '3d6', range: 'Self (15ft cone)', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'healing-word', name: 'Healing Word', level: 1, school: 'evocation', description: 'Bonus action. Heal 1d4+mod HP at range.', healAmount: 5, range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard', 'Druid'] },
  { id: 'thunderwave', name: 'Thunderwave', level: 1, school: 'evocation', description: '15ft cube of thunder. CON save or 2d8 damage + pushed 10ft.', damage: '2d8', range: 'Self (15ft cube)', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Druid'] },
  { id: 'hex', name: 'Hex', level: 1, school: 'enchantment', description: 'Curse a target. Deal extra 1d6 necrotic on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Warlock'] },
  { id: 'hunters-mark', name: "Hunter's Mark", level: 1, school: 'divination', description: 'Mark a target. Deal extra 1d6 on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Ranger'] },
  { id: 'divine-smite-spell', name: 'Searing Smite', level: 1, school: 'evocation', description: 'Your weapon flares with fire. +1d6 fire damage on hit.', damage: '1d6', range: 'Self', duration: 'Concentration, 1 minute', isConcentration: true, classes: ['Paladin'] },
  // Level 2
  { id: 'scorching-ray', name: 'Scorching Ray', level: 2, school: 'evocation', description: 'Three rays of fire. Each +spell attack for 2d6 fire.', damage: '6d6', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'spiritual-weapon', name: 'Spiritual Weapon', level: 2, school: 'evocation', description: 'Floating spectral weapon. Bonus action attack for 1d8+mod.', damage: '1d8', range: '60ft', duration: '1 minute', isConcentration: false, classes: ['Cleric'] },
  { id: 'misty-step', name: 'Misty Step', level: 2, school: 'conjuration', description: 'Bonus action teleport up to 30ft.', range: 'Self', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
  { id: 'lesser-restoration', name: 'Lesser Restoration', level: 2, school: 'abjuration', description: 'End one disease or condition on a creature.', range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'hold-person', name: 'Hold Person', level: 2, school: 'enchantment', description: 'WIS save or paralyzed for 1 minute (concentration).', range: '60ft', duration: 'Concentration, 1 minute', saveStat: 'WIS', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Cleric', 'Bard', 'Warlock', 'Druid'] },
  // Level 3
  { id: 'fireball', name: 'Fireball', level: 3, school: 'evocation', description: '20ft radius explosion. DEX save or 8d6 fire damage.', damage: '8d6', range: '150ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'spirit-guardians', name: 'Spirit Guardians', level: 3, school: 'conjuration', description: 'Spirits swirl around you. Enemies in 15ft take 3d8 radiant.', damage: '3d8', range: 'Self (15ft radius)', duration: 'Concentration, 10 minutes', saveStat: 'WIS', isConcentration: true, classes: ['Cleric'] },
  { id: 'revivify', name: 'Revivify', level: 3, school: 'necromancy', description: 'Touch a creature dead for less than 1 minute. It returns with 1 HP.', healAmount: 1, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Paladin', 'Druid'] },
  { id: 'counterspell', name: 'Counterspell', level: 3, school: 'abjuration', description: 'Reaction: interrupt a creature casting a spell of 3rd level or lower.', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
];

// Get spells available for a class (cantrips + spells they can cast at their level)
export function getClassSpells(charClass: CharacterClass, level: number): Spell[] {
  const slots = getSpellSlots(charClass, level);
  const maxSpellLevel = Object.keys(slots).map(Number).sort((a, b) => b - a)[0] || 0;
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
  addItem: () => {},
  removeItem: () => {},
  equipItem: () => {},
  unequipItem: () => {},
  useItem: () => ({ message: '' }),
  buyItem: () => ({ success: false, message: '' }),
  sellItem: () => ({ success: false, message: '' }),
  castSpell: () => ({ success: false, message: '' }),
  restoreSpellSlots: () => {},
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
        return { ...c, hp: c.maxHp, deathSaves: { successes: 0, failures: 0 }, condition: 'normal' as Condition, spellSlotsUsed: {} };
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

  // Inventory: add an item to a character's inventory
  const addItem = useCallback((charId: string, item: Item) => {
    setCharacters((prev) => prev.map((c) => {
      if (c.id !== charId) return c;
      const inv = c.inventory || [];
      // Stack potions/scrolls if same name exists
      if ((item.type === 'potion' || item.type === 'scroll') && item.quantity) {
        const existing = inv.find((i) => i.name === item.name);
        if (existing) {
          return { ...c, inventory: inv.map((i) => i.id === existing.id ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) } : i) };
        }
      }
      return { ...c, inventory: [...inv, item] };
    }));
  }, []);

  // Inventory: remove an item (or reduce quantity for stackables)
  const removeItem = useCallback((charId: string, itemId: string) => {
    setCharacters((prev) => prev.map((c) => {
      if (c.id !== charId) return c;
      const inv = c.inventory || [];
      const item = inv.find((i) => i.id === itemId);
      if (!item) return c;
      if (item.quantity && item.quantity > 1) {
        return { ...c, inventory: inv.map((i) => i.id === itemId ? { ...i, quantity: (i.quantity || 1) - 1 } : i) };
      }
      return { ...c, inventory: inv.filter((i) => i.id !== itemId) };
    }));
  }, []);

  // Equipment: equip an item from inventory — moves old item back to inventory, recalculates AC
  const equipItem = useCallback((charId: string, itemId: string) => {
    setCharacters((prev) => prev.map((c) => {
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

      // Recalculate AC from equipment
      const baseAC = 10 + Math.floor((c.stats.DEX - 10) / 2);
      const armorAC = eq.armor?.acBonus ?? 0; // armor acBonus is base AC (e.g. 13 for chain shirt)
      const shieldAC = eq.shield?.acBonus ?? 0;
      const ringAC = eq.ring?.acBonus ?? 0;
      // If armor provides base AC, use it; otherwise use DEX-based
      const newAC = (armorAC > 0 ? armorAC : baseAC) + shieldAC + ringAC;

      return { ...c, inventory: newInv, equipment: eq, ac: newAC };
    }));
  }, []);

  // Equipment: unequip an item back to inventory, recalculate AC
  const unequipItem = useCallback((charId: string, slot: EquipSlot) => {
    setCharacters((prev) => prev.map((c) => {
      if (c.id !== charId) return c;
      const eq = { ...(c.equipment || EMPTY_EQUIPMENT) };
      const item = eq[slot];
      if (!item) return c;

      eq[slot] = null;
      const newInv = [...(c.inventory || []), item];

      // Recalculate AC
      const baseAC = 10 + Math.floor((c.stats.DEX - 10) / 2);
      const armorAC = eq.armor?.acBonus ?? 0;
      const shieldAC = eq.shield?.acBonus ?? 0;
      const ringAC = eq.ring?.acBonus ?? 0;
      const newAC = (armorAC > 0 ? armorAC : baseAC) + shieldAC + ringAC;

      return { ...c, inventory: newInv, equipment: eq, ac: newAC };
    }));
  }, []);

  // Use a consumable item (potion, scroll)
  const useItem = useCallback((charId: string, itemId: string): { message: string } => {
    let msg = '';
    setCharacters((prev) => prev.map((c) => {
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
        updated.inventory = inv.map((i) => i.id === itemId ? { ...i, quantity: (i.quantity || 1) - 1 } : i);
      } else {
        updated.inventory = inv.filter((i) => i.id !== itemId);
      }
      return updated;
    }));
    return { message: msg };
  }, []);

  // Shop: buy an item (deduct gold, add to inventory)
  const buyItem = useCallback((charId: string, shopItem: Omit<Item, 'id'>): { success: boolean; message: string } => {
    let result = { success: false, message: '' };
    setCharacters((prev) => prev.map((c) => {
      if (c.id !== charId) return c;
      if (c.gold < shopItem.value) {
        result = { success: false, message: `Not enough gold! Need ${shopItem.value}g, have ${c.gold}g.` };
        return c;
      }
      const newItem: Item = { ...shopItem, id: crypto.randomUUID() };
      result = { success: true, message: `Bought ${shopItem.name} for ${shopItem.value}g.` };
      return { ...c, gold: c.gold - shopItem.value, inventory: [...(c.inventory || []), newItem] };
    }));
    return result;
  }, []);

  // Shop: sell an item (half value, remove from inventory)
  const sellItem = useCallback((charId: string, itemId: string): { success: boolean; message: string } => {
    let result = { success: false, message: '' };
    setCharacters((prev) => prev.map((c) => {
      if (c.id !== charId) return c;
      const inv = c.inventory || [];
      const item = inv.find((i) => i.id === itemId);
      if (!item) { result = { success: false, message: 'Item not found.' }; return c; }
      const sellPrice = Math.max(1, Math.floor(item.value / 2));
      result = { success: true, message: `Sold ${item.name} for ${sellPrice}g.` };
      return { ...c, gold: c.gold + sellPrice, inventory: inv.filter((i) => i.id !== itemId) };
    }));
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

  // Spells: cast a spell (check slots, apply damage/healing, consume slot)
  const castSpell = useCallback((charId: string, spellId: string, targetUnitId?: string): { success: boolean; message: string } => {
    let result = { success: false, message: '' };
    const spell = SPELL_LIST.find((s) => s.id === spellId);
    if (!spell) { return { success: false, message: 'Unknown spell.' }; }

    setCharacters((prev) => prev.map((c) => {
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
    }));

    if (result.success) {
      const char = characters.find((c) => c.id === charId);
      const casterName = char?.name || 'Caster';
      if (spell.damage) {
        const dmg = rollSpellDamage(spell.damage);
        if (targetUnitId) damageUnit(targetUnitId, dmg);
        result.message = `${casterName} casts ${spell.name} for ${dmg} damage!`;
      } else if (spell.healAmount) {
        if (char) {
          const healed = Math.min(spell.healAmount, char.maxHp - char.hp);
          setCharacters((prev) => prev.map((c) => {
            if (c.id !== charId) return c;
            let updated = { ...c, hp: Math.min(c.maxHp, c.hp + spell.healAmount!) };
            if (c.condition === 'unconscious' || c.condition === 'stabilized') {
              updated = { ...updated, condition: 'normal' as const, deathSaves: { successes: 0, failures: 0 } };
            }
            return updated;
          }));
          result.message = `${casterName} casts ${spell.name}, restoring ${healed} HP!`;
        } else {
          result.message = `${casterName} casts ${spell.name}.`;
        }
      } else {
        result.message = `${casterName} casts ${spell.name}. ${spell.description}`;
      }
      if (spell.level > 0) result.message += ` (Level ${spell.level} slot used)`;
    }
    return result;
  }, [characters, damageUnit]);

  // Spells: restore all spell slots (called on long rest)
  const restoreSpellSlots = useCallback((charId: string) => {
    setCharacters((prev) => prev.map((c) =>
      c.id === charId ? { ...c, spellSlotsUsed: {} } : c
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
        addItem,
        removeItem,
        equipItem,
        unequipItem,
        useItem,
        buyItem,
        sellItem,
        castSpell,
        restoreSpellSlots,
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
