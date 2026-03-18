// Quick rules reference data — D&D 5e conditions, combat actions, spell schools.
// Shared across RulesReference panel and CharacterSheet tooltips.

import type { ConditionType, SpellSchool } from '../types/game';

// --- Condition full descriptions (verbose 5e rules text) ---
export const CONDITION_TOOLTIPS: Record<ConditionType, string> = {
  poisoned: 'Poisoned: Disadvantage on attack rolls and ability checks (-2 to attacks and saves).',
  stunned: 'Stunned: Cannot move or take actions. Auto-fail STR/DEX saves. Attacks against have advantage (-2 AC).',
  frightened: 'Frightened: Disadvantage on ability checks and attack rolls while source of fear is in line of sight (-2 to attacks).',
  blessed: 'Blessed: Add 1d4 to attack rolls and saving throws (+2 to attacks and saves).',
  hexed: 'Hexed: Disadvantage on ability checks with the chosen ability (-2 to saves).',
  burning: 'Burning: Takes 1d6 fire damage at the start of each turn. Can use action to extinguish.',
  prone: 'Prone: Melee attacks against have advantage. Ranged attacks against have disadvantage. Must spend half movement to stand.',
  dodging: 'Dodging: +2 AC until next turn. Attacks against have disadvantage. DEX saves have advantage.',
  raging: 'Raging: +2 to melee attack and damage rolls. Resistance to bludgeoning, piercing, slashing damage.',
  inspired: 'Inspired: Bardic Inspiration — +2 to attack rolls and saving throws for the duration.',
  helping: 'Helping: The next ally to attack the same target has advantage on their attack roll (+2 to attack).',
  hidden: 'Hidden: You cannot be seen. Advantage on attack rolls (+2 to attacks). Ends after you attack or are found.',
  torchlit: 'Torchlit: Carrying a torch that sheds 40ft of bright light (8 cells vision range). Free action to light/extinguish.',
  darkvision: 'Darkvision (spell): Can see in darkness as if it were dim light. 60ft range (12 cells vision). Lasts 8 hours.',
  candlelit: 'Candlelit: Carrying a candle that sheds 10ft of bright light and 20ft of dim light. Easily extinguished.',
  lantern: 'Hooded Lantern: Sheds 30ft of bright light and 50ft of dim light. Burns 6 hours on a pint of oil.',
  daylight: 'Daylight (3rd level spell): 60ft of bright light and 100ft of dim light. Dispels magical darkness.',
};

// --- Combat actions (D&D 5e PHB actions in combat) ---
export interface CombatAction {
  name: string;
  description: string;
  icon: string;
  color: string; // tailwind text color
}

export const COMBAT_ACTIONS: CombatAction[] = [
  { name: 'Attack', description: 'Make one melee or ranged weapon attack. Extra Attack at level 5+ (martial classes) grants a second attack.', icon: '⚔️', color: 'text-red-400' },
  { name: 'Cast a Spell', description: 'Cast a spell with a casting time of 1 action. Consumes a spell slot (unless cantrip). Some spells require concentration.', icon: '✨', color: 'text-purple-400' },
  { name: 'Dodge', description: 'Focus on defense. Attacks against you have disadvantage (+2 AC). DEX saves have advantage. Lasts until your next turn.', icon: '🛡️', color: 'text-sky-400' },
  { name: 'Dash', description: 'Double your remaining movement for the turn. Does not provoke opportunity attacks by itself.', icon: '💨', color: 'text-teal-400' },
  { name: 'Disengage', description: 'Move without provoking opportunity attacks for the rest of the turn. No other action taken.', icon: '🏃', color: 'text-violet-400' },
  { name: 'Help', description: 'Grant an ally advantage on their next ability check or attack roll against a target within 5ft of you.', icon: '🤝', color: 'text-green-400' },
  { name: 'Hide', description: 'Make a DEX (Stealth) check to become hidden. Must break line of sight first. Attacks from hiding have advantage.', icon: '👁️', color: 'text-slate-400' },
  { name: 'Ready', description: 'Prepare a specific action with a trigger condition. Uses your reaction when the trigger occurs.', icon: '⏳', color: 'text-amber-400' },
  { name: 'Use an Object', description: 'Interact with an object: drink a potion, draw a weapon, open a door, or activate a magic item.', icon: '🧪', color: 'text-cyan-400' },
  { name: 'Grapple', description: 'Special melee attack. Contest your Athletics vs target\'s Athletics or Acrobatics. On success, target is grappled (speed 0).', icon: '🤼', color: 'text-orange-400' },
  { name: 'Shove', description: 'Special melee attack. Contest your Athletics vs target\'s Athletics or Acrobatics. Push 5ft or knock prone.', icon: '🫸', color: 'text-yellow-400' },
];

// --- Spell school descriptions ---
export interface SpellSchoolInfo {
  name: string;
  description: string;
  color: string; // tailwind text+bg+border classes
  examples: string;
}

export const SPELL_SCHOOLS: Record<SpellSchool, SpellSchoolInfo> = {
  abjuration: { name: 'Abjuration', description: 'Protective magic. Wards, shields, and banishments that block, banish, or protect.', color: 'text-blue-300 bg-blue-900/30 border-blue-700/40', examples: 'Shield, Counterspell, Lesser Restoration' },
  conjuration: { name: 'Conjuration', description: 'Summon creatures or objects, or teleport yourself and others across distances.', color: 'text-cyan-300 bg-cyan-900/30 border-cyan-700/40', examples: 'Misty Step, Spirit Guardians, Produce Flame' },
  divination: { name: 'Divination', description: 'Reveal information — scry on distant locations, detect magic, or glimpse the future.', color: 'text-amber-300 bg-amber-900/30 border-amber-700/40', examples: "Hunter's Mark, Detect Magic, Identify" },
  enchantment: { name: 'Enchantment', description: 'Influence minds — charm, compel, or terrify creatures into acting against their will.', color: 'text-pink-300 bg-pink-900/30 border-pink-700/40', examples: 'Hold Person, Hex, Vicious Mockery' },
  evocation: { name: 'Evocation', description: 'Raw elemental energy — fire, lightning, force, radiance. The damage school.', color: 'text-red-300 bg-red-900/30 border-red-700/40', examples: 'Fireball, Magic Missile, Cure Wounds' },
  illusion: { name: 'Illusion', description: 'Deception of the senses — phantom images, sounds, and false terrain.', color: 'text-purple-300 bg-purple-900/30 border-purple-700/40', examples: 'Minor Illusion, Invisibility, Mirror Image' },
  necromancy: { name: 'Necromancy', description: 'Manipulate life force — drain vitality, raise undead, or restore the recently dead.', color: 'text-green-300 bg-green-900/30 border-green-700/40', examples: 'Revivify, Spare the Dying, Animate Dead' },
  transmutation: { name: 'Transmutation', description: 'Transform matter and energy — alter physical forms, enhance abilities, or reshape terrain.', color: 'text-yellow-300 bg-yellow-900/30 border-yellow-700/40', examples: 'Haste, Polymorph, Enhance Ability' },
};

// --- D&D 5e ability scores ---
export const ABILITY_SCORES = [
  { abbr: 'STR', name: 'Strength', description: 'Physical power. Melee attacks, carrying capacity, Athletics checks, STR saves (shove/grapple resistance).' },
  { abbr: 'DEX', name: 'Dexterity', description: 'Agility and reflexes. AC, initiative, ranged attacks, Acrobatics/Stealth, DEX saves (Fireball, traps).' },
  { abbr: 'CON', name: 'Constitution', description: 'Health and endurance. Hit points per level, concentration saves, CON saves (poison, exhaustion).' },
  { abbr: 'INT', name: 'Intelligence', description: 'Reasoning and memory. Wizard spellcasting, Investigation/Arcana/History, INT saves (illusions).' },
  { abbr: 'WIS', name: 'Wisdom', description: 'Perception and insight. Cleric/Druid/Ranger spellcasting, Perception/Insight, WIS saves (charm, fear).' },
  { abbr: 'CHA', name: 'Charisma', description: 'Force of personality. Sorcerer/Bard/Warlock/Paladin spellcasting, Persuasion/Deception, CHA saves (banishment).' },
];

// --- D&D 5e exhaustion levels (cumulative) ---
export interface ExhaustionLevel {
  level: number;
  effect: string;
  color: string; // tailwind text color
}

export const EXHAUSTION_LEVELS: ExhaustionLevel[] = [
  { level: 1, effect: 'Disadvantage on ability checks', color: 'text-yellow-400' },
  { level: 2, effect: 'Speed halved', color: 'text-orange-400' },
  { level: 3, effect: 'Disadvantage on attack rolls and saving throws', color: 'text-orange-500' },
  { level: 4, effect: 'Hit point maximum halved', color: 'text-red-400' },
  { level: 5, effect: 'Speed reduced to 0', color: 'text-red-500' },
  { level: 6, effect: 'Death', color: 'text-red-600' },
];

// --- Common game mechanics ---
export const GAME_MECHANICS = [
  { name: 'Advantage', description: 'Roll 2d20, take the higher result. Granted by flanking, hiding, Help action, some spells.' },
  { name: 'Disadvantage', description: 'Roll 2d20, take the lower result. From fear, poison, prone (ranged), obscured vision.' },
  { name: 'Proficiency Bonus', description: '+2 at levels 1-4, +3 at 5-8, +4 at 9-12, +5 at 13-16, +6 at 17-20. Added to trained skills, saves, and attacks.' },
  { name: 'Opportunity Attack', description: 'Reaction: when a hostile creature you can see leaves your reach, make one melee attack. Disengage prevents this.' },
  { name: 'Concentration', description: 'Some spells require concentration. Taking damage triggers a CON save (DC = max(10, damage/2)). Only one concentration spell at a time.' },
  { name: 'Death Saves', description: 'At 0 HP, roll d20 each turn. 10+ = success, 9- = failure. Nat 20 = regain 1 HP. Nat 1 = 2 failures. 3 successes = stabilize, 3 failures = death.' },
  { name: 'Short Rest', description: '1 hour rest. Spend hit dice to heal (roll + CON mod). Some abilities and Warlock spell slots recharge.' },
  { name: 'Long Rest', description: '8 hours rest. Restore all HP, recover half hit dice (min 1), reset all spell slots and abilities. Max once per 24 hours.' },
  { name: 'Cover', description: 'Half cover: +2 AC and DEX saves. Three-quarters: +5 AC and DEX saves. Full cover: can\'t be targeted directly.' },
  { name: 'Difficult Terrain', description: 'Each foot of movement costs 2 feet. Water, rubble, dense undergrowth, and magical effects can create difficult terrain.' },
];

// --- Treasure hoard tables (simplified from DMG Chapter 7) ---
export interface TreasureHoardResult {
  gold: number;
  gems: { name: string; value: number }[];
  items: { name: string; rarity: string }[];
}

interface HoardTable {
  label: string;
  crRange: string;
  goldDice: () => number; // roll function for gold
  gemTable: { name: string; value: number; weight: number }[];
  itemTable: { name: string; rarity: string; weight: number }[];
  gemCount: () => number;
  itemCount: () => number;
}

function rollDice(count: number, sides: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return total;
}

function weightedPick<T extends { weight: number }>(table: T[]): T {
  const total = table.reduce((sum, t) => sum + t.weight, 0);
  let roll = Math.random() * total;
  for (const entry of table) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return table[table.length - 1];
}

const HOARD_TABLES: HoardTable[] = [
  {
    label: 'CR 0-4',
    crRange: '0-4',
    goldDice: () => rollDice(6, 6) * 10,
    gemCount: () => rollDice(2, 4),
    itemCount: () => Math.random() < 0.3 ? 1 : 0,
    gemTable: [
      { name: 'Agate', value: 10, weight: 3 },
      { name: 'Turquoise', value: 10, weight: 3 },
      { name: 'Obsidian', value: 10, weight: 2 },
      { name: 'Moonstone', value: 50, weight: 2 },
      { name: 'Citrine', value: 50, weight: 1 },
      { name: 'Jasper', value: 50, weight: 1 },
    ],
    itemTable: [
      { name: 'Potion of Healing', rarity: 'common', weight: 5 },
      { name: 'Spell Scroll (1st level)', rarity: 'common', weight: 3 },
      { name: 'Bag of Holding', rarity: 'uncommon', weight: 1 },
      { name: 'Cloak of Protection', rarity: 'uncommon', weight: 1 },
    ],
  },
  {
    label: 'CR 5-10',
    crRange: '5-10',
    goldDice: () => rollDice(4, 6) * 100,
    gemCount: () => rollDice(3, 6),
    itemCount: () => rollDice(1, 4),
    gemTable: [
      { name: 'Bloodstone', value: 50, weight: 2 },
      { name: 'Onyx', value: 50, weight: 2 },
      { name: 'Sardonyx', value: 50, weight: 2 },
      { name: 'Garnet', value: 100, weight: 2 },
      { name: 'Amethyst', value: 100, weight: 2 },
      { name: 'Pearl', value: 100, weight: 1 },
      { name: 'Topaz', value: 500, weight: 1 },
    ],
    itemTable: [
      { name: 'Potion of Greater Healing', rarity: 'uncommon', weight: 4 },
      { name: 'Spell Scroll (3rd level)', rarity: 'uncommon', weight: 3 },
      { name: 'Flame Tongue Sword', rarity: 'rare', weight: 2 },
      { name: 'Ring of Resistance', rarity: 'rare', weight: 1 },
      { name: 'Wand of Fireballs', rarity: 'rare', weight: 1 },
      { name: 'Amulet of Health', rarity: 'rare', weight: 1 },
    ],
  },
  {
    label: 'CR 11-16',
    crRange: '11-16',
    goldDice: () => rollDice(4, 6) * 1000,
    gemCount: () => rollDice(2, 4),
    itemCount: () => rollDice(1, 6),
    gemTable: [
      { name: 'Blue Sapphire', value: 1000, weight: 2 },
      { name: 'Emerald', value: 1000, weight: 2 },
      { name: 'Fire Opal', value: 1000, weight: 2 },
      { name: 'Star Ruby', value: 1000, weight: 2 },
      { name: 'Diamond', value: 5000, weight: 1 },
      { name: 'Jacinth', value: 5000, weight: 1 },
    ],
    itemTable: [
      { name: 'Potion of Supreme Healing', rarity: 'very rare', weight: 3 },
      { name: 'Spell Scroll (6th level)', rarity: 'very rare', weight: 2 },
      { name: 'Staff of Power', rarity: 'very rare', weight: 1 },
      { name: 'Robe of the Archmagi', rarity: 'very rare', weight: 1 },
      { name: 'Vorpal Sword', rarity: 'legendary', weight: 1 },
      { name: 'Holy Avenger', rarity: 'legendary', weight: 1 },
    ],
  },
  {
    label: 'CR 17+',
    crRange: '17+',
    goldDice: () => rollDice(12, 6) * 1000,
    gemCount: () => rollDice(3, 6),
    itemCount: () => rollDice(1, 6) + 1,
    gemTable: [
      { name: 'Diamond', value: 5000, weight: 3 },
      { name: 'Jacinth', value: 5000, weight: 2 },
      { name: 'Ruby', value: 5000, weight: 2 },
      { name: 'Black Opal', value: 1000, weight: 2 },
      { name: 'Star Sapphire', value: 1000, weight: 2 },
    ],
    itemTable: [
      { name: 'Potion of Storm Giant Strength', rarity: 'legendary', weight: 2 },
      { name: 'Sphere of Annihilation', rarity: 'legendary', weight: 1 },
      { name: 'Deck of Many Things', rarity: 'legendary', weight: 1 },
      { name: 'Ring of Three Wishes', rarity: 'legendary', weight: 1 },
      { name: 'Talisman of Ultimate Evil', rarity: 'legendary', weight: 1 },
      { name: 'Luck Blade', rarity: 'legendary', weight: 1 },
      { name: 'Apparatus of Kwalish', rarity: 'legendary', weight: 1 },
    ],
  },
];

export function rollTreasureHoard(crTier: number = 0): TreasureHoardResult {
  const table = HOARD_TABLES[Math.min(crTier, HOARD_TABLES.length - 1)];
  const gold = table.goldDice();
  const gemCount = table.gemCount();
  const itemCount = table.itemCount();
  const gems: TreasureHoardResult['gems'] = [];
  const items: TreasureHoardResult['items'] = [];
  for (let i = 0; i < gemCount; i++) {
    const gem = weightedPick(table.gemTable);
    gems.push({ name: gem.name, value: gem.value });
  }
  for (let i = 0; i < itemCount; i++) {
    const item = weightedPick(table.itemTable);
    items.push({ name: item.name, rarity: item.rarity });
  }
  return { gold, gems, items };
}

export const HOARD_TIER_LABELS = HOARD_TABLES.map((t) => t.label);
