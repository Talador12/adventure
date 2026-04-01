// Roll20 character JSON import parser.
// Maps the Roll20 character vault export schema to our Character type.
// Roll20 uses attribute-based storage: { name, current, max } entries.

import type { Character, Race, CharacterClass, Item, Spell, SpellSchool } from '../types/game';
import { RACES, CLASSES, DEFAULT_APPEARANCE, EMPTY_EQUIPMENT } from '../types/game';

function parseRace(r20Race: string): Race {
  const lower = r20Race.toLowerCase().replace(/[^a-z]/g, '');
  for (const race of RACES) {
    if (lower.includes(race.toLowerCase().replace(/[^a-z]/g, ''))) return race;
  }
  if (lower.includes('elf')) return 'Elf';
  if (lower.includes('dwarf')) return 'Dwarf';
  if (lower.includes('halfling')) return 'Halfling';
  if (lower.includes('gnome')) return 'Gnome';
  if (lower.includes('orc')) return 'Half-Orc';
  if (lower.includes('tiefling')) return 'Tiefling';
  if (lower.includes('dragonborn')) return 'Dragonborn';
  return 'Human';
}

function parseClass(r20Class: string): CharacterClass {
  const lower = r20Class.toLowerCase().replace(/[^a-z]/g, '');
  for (const cls of CLASSES) {
    if (lower.includes(cls.toLowerCase())) return cls;
  }
  return 'Fighter';
}

// Roll20 exports attrs as { name: string; current: string; max?: string }[]
function getAttr(attrs: Array<{ name: string; current?: string; max?: string }>, name: string): string {
  return attrs.find((a) => a.name === name)?.current || '';
}

function getAttrNum(attrs: Array<{ name: string; current?: string; max?: string }>, name: string, fallback = 0): number {
  const val = parseInt(getAttr(attrs, name), 10);
  return isNaN(val) ? fallback : val;
}

const SCHOOL_MAP: Record<string, SpellSchool> = {
  abjuration: 'abjuration', conjuration: 'conjuration', divination: 'divination',
  enchantment: 'enchantment', evocation: 'evocation', illusion: 'illusion',
  necromancy: 'necromancy', transmutation: 'transmutation',
};

export function isRoll20Character(json: unknown): boolean {
  if (!json || typeof json !== 'object') return false;
  const obj = json as Record<string, unknown>;
  // Roll20 vault export has attribs[] array and name field
  return Array.isArray(obj.attribs) && typeof obj.name === 'string';
}

export function parseRoll20Character(json: unknown): Character {
  const obj = json as Record<string, unknown>;
  const name = String(obj.name || 'Unknown Adventurer');
  const attrs = (Array.isArray(obj.attribs) ? obj.attribs : []) as Array<{ name: string; current?: string; max?: string }>;

  const race = parseRace(getAttr(attrs, 'race'));
  const cls = parseClass(getAttr(attrs, 'base_level') || getAttr(attrs, 'class'));
  const level = Math.max(1, getAttrNum(attrs, 'level', 1));

  const stats = {
    STR: getAttrNum(attrs, 'strength', 10),
    DEX: getAttrNum(attrs, 'dexterity', 10),
    CON: getAttrNum(attrs, 'constitution', 10),
    INT: getAttrNum(attrs, 'intelligence', 10),
    WIS: getAttrNum(attrs, 'wisdom', 10),
    CHA: getAttrNum(attrs, 'charisma', 10),
  };

  const hpCurrent = getAttrNum(attrs, 'hp', 10);
  const hpMax = getAttrNum(attrs, 'hp') ? parseInt(attrs.find((a) => a.name === 'hp')?.max || String(hpCurrent), 10) || hpCurrent : hpCurrent;
  const ac = getAttrNum(attrs, 'ac', 10);
  const xp = getAttrNum(attrs, 'experience', 0);
  const gold = getAttrNum(attrs, 'gp', 0) + getAttrNum(attrs, 'pp', 0) * 10;

  // Parse inventory from repeating_inventory entries
  const inventory: Item[] = [];
  const invEntries = attrs.filter((a) => a.name.startsWith('repeating_inventory_') && a.name.endsWith('_itemname'));
  for (const entry of invEntries) {
    const prefix = entry.name.replace('_itemname', '');
    const itemName = entry.current || 'Unknown Item';
    const qty = parseInt(attrs.find((a) => a.name === `${prefix}_itemcount`)?.current || '1', 10) || 1;
    const weight = parseFloat(attrs.find((a) => a.name === `${prefix}_itemweight`)?.current || '0') || 0;
    inventory.push({
      id: `r20-${crypto.randomUUID().slice(0, 8)}`,
      name: itemName,
      type: weight > 5 ? 'weapon' : 'misc',
      rarity: 'common',
      description: '',
      value: 0,
      quantity: qty,
      stackable: qty > 1,
    });
  }

  // Parse spells from repeating_spell entries
  const customSpells: Spell[] = [];
  const spellEntries = attrs.filter((a) => a.name.match(/^repeating_spell-\w+_[^_]+_spellname$/));
  for (const entry of spellEntries) {
    const prefix = entry.name.replace('_spellname', '');
    const spellName = entry.current || 'Unknown Spell';
    const spellLevel = parseInt(prefix.match(/spell-(\w+)/)?.[1] || '0', 10) || 0;
    const schoolRaw = (attrs.find((a) => a.name === `${prefix}_spellschool`)?.current || '').toLowerCase();
    const school = SCHOOL_MAP[schoolRaw] || 'evocation';
    const desc = attrs.find((a) => a.name === `${prefix}_spelldescription`)?.current || '';
    const damage = attrs.find((a) => a.name === `${prefix}_spelldamage`)?.current || '';
    const range = attrs.find((a) => a.name === `${prefix}_spellrange`)?.current || '';
    const conc = (attrs.find((a) => a.name === `${prefix}_spellconcentration`)?.current || '').toLowerCase() === 'yes';

    customSpells.push({
      id: `r20-spell-${crypto.randomUUID().slice(0, 8)}`,
      name: spellName,
      level: spellLevel,
      school,
      description: desc.replace(/<[^>]+>/g, '').slice(0, 300),
      damage: damage || undefined,
      range: range || '60ft',
      duration: conc ? 'Concentration, 1 minute' : 'Instantaneous',
      isConcentration: conc,
      classes: [cls],
    });
  }

  const uniqueSpells = customSpells.filter((s, i, arr) => arr.findIndex((x) => x.name === s.name) === i);

  return {
    id: crypto.randomUUID(),
    name,
    race,
    class: cls,
    level,
    stats,
    hp: hpCurrent,
    maxHp: hpMax,
    ac,
    xp,
    gold,
    background: getAttr(attrs, 'background') || 'Adventurer',
    alignment: getAttr(attrs, 'alignment') || 'Neutral',
    equipment: EMPTY_EQUIPMENT,
    inventory: inventory.slice(0, 50),
    appearance: DEFAULT_APPEARANCE,
    customSpells: uniqueSpells.length > 0 ? uniqueSpells : undefined,
  };
}
