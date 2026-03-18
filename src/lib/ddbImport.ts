// D&D Beyond character JSON import parser.
// Maps the DDB export schema to our Character type.
// Handles the public API shape (/character/v5/{id}/json).

import type { Character, Race, CharacterClass, Item, ItemType, ItemRarity, Spell, SpellSchool } from '../types/game';
import { RACES, CLASSES, DEFAULT_APPEARANCE, EMPTY_EQUIPMENT } from '../types/game';

// Normalize a DDB race name to our Race type (best-effort fuzzy match)
function parseRace(ddbRace: string): Race {
  const lower = ddbRace.toLowerCase().replace(/[^a-z]/g, '');
  for (const race of RACES) {
    if (lower.includes(race.toLowerCase().replace(/[^a-z]/g, ''))) return race;
  }
  // Sub-race fallback: "High Elf" → Elf, "Hill Dwarf" → Dwarf, etc.
  if (lower.includes('elf')) return 'Elf';
  if (lower.includes('dwarf')) return 'Dwarf';
  if (lower.includes('halfling')) return 'Halfling';
  if (lower.includes('gnome')) return 'Gnome';
  if (lower.includes('orc')) return 'Half-Orc';
  if (lower.includes('tiefling')) return 'Tiefling';
  if (lower.includes('dragonborn')) return 'Dragonborn';
  return 'Human'; // safe default
}

// Normalize a DDB class name to our CharacterClass type
function parseClass(ddbClass: string): CharacterClass {
  const lower = ddbClass.toLowerCase().replace(/[^a-z]/g, '');
  for (const cls of CLASSES) {
    if (lower.includes(cls.toLowerCase())) return cls;
  }
  return 'Fighter'; // safe default
}

// Extract ability score total from DDB stat structure
function extractStat(stats: Array<{ id?: number; value?: number }>, statId: number): number {
  const stat = stats.find((s) => s.id === statId);
  return stat?.value ?? 10;
}

// DDB stat IDs: 1=STR 2=DEX 3=CON 4=INT 5=WIS 6=CHA
const DDB_STAT_MAP: Record<number, 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA'> = {
  1: 'STR', 2: 'DEX', 3: 'CON', 4: 'INT', 5: 'WIS', 6: 'CHA',
};

export interface DDBImportResult {
  character: Character;
  warnings: string[];
}

// Parse a D&D Beyond character JSON export into our Character type.
// Accepts the full DDB JSON (either the top-level object or the data.character sub-object).
export function parseDDBCharacter(json: Record<string, unknown>, playerId: string): DDBImportResult {
  const warnings: string[] = [];

  // Navigate to the character data (DDB wraps it in `data` sometimes)
  const charData = (json.data as Record<string, unknown>)?.character
    ? ((json.data as Record<string, unknown>).character as Record<string, unknown>)
    : json;

  const name = String(charData.name || 'Imported Character');

  // Race
  const raceName = (charData.race as Record<string, unknown>)?.fullName
    || (charData.race as Record<string, unknown>)?.baseName
    || String(charData.race || '');
  const race = parseRace(typeof raceName === 'string' ? raceName : String(raceName));
  if (typeof raceName === 'string' && raceName && !RACES.includes(race)) {
    warnings.push(`Race "${raceName}" mapped to ${race}`);
  }

  // Class — use first class entry (multiclass: take highest level class)
  const classes = (charData.classes as Array<Record<string, unknown>>) || [];
  const primaryClass = classes.length > 0
    ? classes.reduce((a, b) => ((b.level as number) || 0) > ((a.level as number) || 0) ? b : a)
    : null;
  const className = primaryClass
    ? ((primaryClass.definition as Record<string, unknown>)?.name as string || String(primaryClass.name || ''))
    : '';
  const characterClass = parseClass(className);
  const level = classes.reduce((sum, c) => sum + ((c.level as number) || 0), 0) || 1;

  // Stats — DDB uses overrideStats + bonusStats + racial modifiers
  const baseStats = (charData.stats as Array<{ id?: number; value?: number }>) || [];
  const bonusStats = (charData.bonusStats as Array<{ id?: number; value?: number }>) || [];
  const overrideStats = (charData.overrideStats as Array<{ id?: number; value?: number }>) || [];
  const racialBonuses = (charData.modifiers as Record<string, Array<{ type?: string; subType?: string; value?: number; statId?: number }>>)?.race || [];

  const stats: Record<string, number> = { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 };
  for (let id = 1; id <= 6; id++) {
    const key = DDB_STAT_MAP[id];
    const override = extractStat(overrideStats, id);
    const base = override > 0 && overrideStats.some((s) => s.id === id && s.value) ? override : extractStat(baseStats, id);
    const bonus = extractStat(bonusStats, id);
    const racialBonus = racialBonuses
      .filter((m) => m.type === 'bonus' && m.subType?.includes(key.toLowerCase()) && m.statId === id)
      .reduce((sum, m) => sum + (m.value || 0), 0);
    stats[key] = base + bonus + racialBonus;
  }

  // HP
  const baseHp = (charData.baseHitPoints as number) || 0;
  const bonusHp = (charData.bonusHitPoints as number) || 0;
  const overrideHp = charData.overrideHitPoints as number | null;
  const conMod = Math.floor((stats.CON - 10) / 2);
  const maxHp = overrideHp ?? (baseHp + bonusHp + (conMod * level));
  const removedHp = (charData.removedHitPoints as number) || 0;
  const hp = Math.max(0, maxHp - removedHp);

  // AC — DDB has complex AC calculation; we'll take their computed value if available
  const armorClass = ((charData.armorClass as number)
    || (charData.decorations as Record<string, unknown>)?.armorClass as number)
    || (10 + Math.floor((stats.DEX - 10) / 2)); // fallback to unarmored

  // Background
  const bgData = charData.background as Record<string, unknown>;
  const backgroundName = bgData?.definition
    ? (bgData.definition as Record<string, unknown>)?.name as string || ''
    : '';

  // XP
  const xp = (charData.currentXp as number) || 0;

  // Gold — DDB stores currency as separate fields
  const currencies = (charData.currencies as Record<string, number>) || {};
  const gold = (currencies.gp || 0) + (currencies.pp || 0) * 10 + (currencies.ep || 0) * 0.5 + (currencies.sp || 0) * 0.1 + (currencies.cp || 0) * 0.01;

  // Notes / traits
  const traits = charData.traits as Record<string, string> | undefined;
  const personalityTraits = traits?.personalityTraits || '';
  const ideals = traits?.ideals || '';
  const bonds = traits?.bonds || '';
  const flaws = traits?.flaws || '';
  const backstory = (charData.notes as Record<string, string>)?.backstory
    || traits?.backstory || '';

  // Death saves
  const deathSaves = {
    successes: (charData.deathSaves as Record<string, number>)?.successCount || 0,
    failures: (charData.deathSaves as Record<string, number>)?.failCount || 0,
  };

  // Inventory — parse DDB inventory items into our Item type
  const ddbInventory = (charData.inventory as Array<Record<string, unknown>>) || [];
  const inventory: Item[] = ddbInventory.map((ddbItem) => {
    const def = (ddbItem.definition as Record<string, unknown>) || ddbItem;
    const itemName = String(def.name || ddbItem.name || 'Unknown Item');
    const desc = String(def.description || def.snippet || '').replace(/<[^>]+>/g, '').slice(0, 200);
    const qty = (ddbItem.quantity as number) || 1;

    // Map DDB item type to our ItemType
    const ddbType = String(def.type || def.filterType || '').toLowerCase();
    const ddbSubType = String(def.subType || def.armorTypeId || '').toLowerCase();
    let itemType: ItemType = 'misc';
    if (ddbType.includes('weapon') || ddbSubType.includes('weapon')) itemType = 'weapon';
    else if (ddbType.includes('armor') || ddbSubType.includes('armor') || ddbType.includes('shield')) itemType = ddbType.includes('shield') ? 'shield' : 'armor';
    else if (ddbType.includes('potion')) itemType = 'potion';
    else if (ddbType.includes('ring')) itemType = 'ring';
    else if (ddbType.includes('scroll')) itemType = 'scroll';

    // Map DDB rarity
    const ddbRarity = String(def.rarity || '').toLowerCase();
    let rarity: ItemRarity = 'common';
    if (ddbRarity.includes('uncommon')) rarity = 'uncommon';
    else if (ddbRarity.includes('rare')) rarity = 'rare';
    else if (ddbRarity.includes('epic') || ddbRarity.includes('legendary') || ddbRarity.includes('very rare')) rarity = 'epic';

    const item: Item = {
      id: crypto.randomUUID(),
      name: itemName,
      type: itemType,
      rarity,
      description: desc || itemName,
      value: (def.cost as number) || 0,
      quantity: qty > 1 ? qty : undefined,
    };

    // Weapon stats
    if (itemType === 'weapon') {
      const dmg = (def.damage as Record<string, unknown>);
      if (dmg) {
        item.damageDie = String(dmg.diceString || dmg.diceValue || '1d6');
      }
      item.attackBonus = (def.attackBonus as number) || (def.bonusModifier as number) || 0;
      const props = (def.properties as Array<Record<string, unknown>>) || [];
      item.isRanged = props.some((p) => String(p.name || '').toLowerCase().includes('range'));
      if (item.isRanged) {
        item.range = (def.range as number) || (def.longRange as number) || 6;
      }
    }

    // Armor stats
    if (itemType === 'armor' || itemType === 'shield') {
      item.acBonus = (def.armorClass as number) || 0;
      item.equipSlot = itemType === 'shield' ? 'shield' : 'armor';
    }

    // Potion healing
    if (itemType === 'potion') {
      // DDB healing potions have grantedModifiers with healing info
      const mods = (def.grantedModifiers as Array<Record<string, unknown>>) || [];
      const healMod = mods.find((m) => String(m.type || '').includes('heal'));
      if (healMod) item.healAmount = (healMod.value as number) || (healMod.fixedValue as number) || 0;
      // Default healing potion fallback
      if (!item.healAmount && itemName.toLowerCase().includes('healing')) {
        item.healAmount = itemName.toLowerCase().includes('greater') ? 14 : itemName.toLowerCase().includes('superior') ? 28 : 7;
      }
    }

    return item;
  }).filter((item) => item.name !== 'Unknown Item');

  // Auto-equip: pick best weapon (highest avg damage), best armor (highest AC), best shield
  const damageDieAvg = (die: string): number => {
    const match = die.match(/(\d+)d(\d+)/);
    if (!match) return 0;
    return Number(match[1]) * (Number(match[2]) + 1) / 2;
  };
  const weapons = inventory.filter((i) => i.type === 'weapon');
  const armors = inventory.filter((i) => i.type === 'armor');
  const shields = inventory.filter((i) => i.type === 'shield');
  const rings = inventory.filter((i) => i.type === 'ring');
  const bestWeapon = weapons.length > 0 ? weapons.reduce((a, b) => {
    const aAvg = damageDieAvg(a.damageDie || '0d0') + (a.attackBonus || 0) + (a.damageBonus || 0);
    const bAvg = damageDieAvg(b.damageDie || '0d0') + (b.attackBonus || 0) + (b.damageBonus || 0);
    return bAvg > aAvg ? b : a;
  }) : null;
  const bestArmor = armors.length > 0 ? armors.reduce((a, b) => (b.acBonus || 0) > (a.acBonus || 0) ? b : a) : null;
  const bestShield = shields.length > 0 ? shields.reduce((a, b) => (b.acBonus || 0) > (a.acBonus || 0) ? b : a) : null;
  const bestRing = rings.length > 0 ? rings[0] : null;
  const autoEquipment = {
    weapon: bestWeapon,
    armor: bestArmor,
    shield: bestShield,
    ring: bestRing,
  };
  if (bestWeapon || bestArmor || bestShield || bestRing) {
    const equipped: string[] = [];
    if (bestWeapon) equipped.push(bestWeapon.name);
    if (bestArmor) equipped.push(bestArmor.name);
    if (bestShield) equipped.push(bestShield.name);
    if (bestRing) equipped.push(bestRing.name);
    warnings.push(`Auto-equipped: ${equipped.join(', ')}`);
  }

  // Spells — parse DDB spells (classSpells + raceSpells)
  const ddbSpellSources = [
    ...((charData.classSpells as Array<Record<string, unknown>>) || []),
    ...((charData.spells as Record<string, Array<Record<string, unknown>>>)?.class || []),
    ...((charData.spells as Record<string, Array<Record<string, unknown>>>)?.race || []),
  ];
  // Flatten: DDB classSpells has a nested spells array per class
  const ddbSpells: Array<Record<string, unknown>> = [];
  for (const src of ddbSpellSources) {
    if (Array.isArray(src.spells)) {
      for (const s of src.spells as Array<Record<string, unknown>>) ddbSpells.push(s);
    } else {
      ddbSpells.push(src);
    }
  }
  const DDB_SCHOOL_MAP: Record<string, SpellSchool> = {
    abjuration: 'abjuration', conjuration: 'conjuration', divination: 'divination',
    enchantment: 'enchantment', evocation: 'evocation', illusion: 'illusion',
    necromancy: 'necromancy', transmutation: 'transmutation',
  };
  const parsedSpells: Spell[] = ddbSpells.map((s) => {
    const def = (s.definition as Record<string, unknown>) || s;
    const spellName = String(def.name || s.name || 'Unknown Spell');
    const desc = String(def.description || def.snippet || '').replace(/<[^>]+>/g, '').slice(0, 300);
    const schoolName = String((def.school as string) || '').toLowerCase();
    return {
      id: crypto.randomUUID(),
      name: spellName,
      level: (def.level as number) ?? 0,
      school: DDB_SCHOOL_MAP[schoolName] || 'evocation',
      description: desc || spellName,
      range: typeof def.range === 'object' && def.range ? String((def.range as Record<string, unknown>).origin || 'Self') : String(def.range || 'Self'),
      duration: String((def.duration as Record<string, unknown>)?.durationUnit || def.duration || 'Instantaneous'),
      isConcentration: !!(def.concentration as boolean),
      classes: [characterClass],
      damage: (def.damage as Record<string, unknown>)?.diceString as string | undefined,
    } satisfies Spell;
  }).filter((s) => s.name !== 'Unknown Spell');
  // Deduplicate by name
  const uniqueSpells = parsedSpells.filter((s, i, arr) => arr.findIndex((x) => x.name === s.name) === i);
  if (uniqueSpells.length > 0) {
    const cantrips = uniqueSpells.filter((s) => s.level === 0);
    const leveled = uniqueSpells.filter((s) => s.level > 0);
    const parts: string[] = [];
    if (cantrips.length > 0) parts.push(`${cantrips.length} cantrip${cantrips.length !== 1 ? 's' : ''}`);
    if (leveled.length > 0) parts.push(`${leveled.length} spell${leveled.length !== 1 ? 's' : ''}`);
    warnings.push(`Found ${parts.join(' + ')} from D&D Beyond (spells available via class spell list in-game)`);
  }

  const character: Character = {
    id: crypto.randomUUID(),
    name,
    race,
    class: characterClass,
    level: Math.max(1, Math.min(20, level)),
    xp,
    stats: stats as Character['stats'],
    hp,
    maxHp,
    ac: armorClass,
    deathSaves,
    condition: 'normal',
    appearance: { ...DEFAULT_APPEARANCE },
    background: (backgroundName || 'Folk Hero') as Character['background'],
    alignment: 'True Neutral' as Character['alignment'],
    personalityTraits,
    ideals,
    bonds,
    flaws,
    backstory,
    playerId,
    gold: Math.round(gold * 100) / 100,
    inventory,
    equipment: autoEquipment,
    spellSlotsUsed: {},
    classAbilityUsed: false,
    feats: [],
    asiChoicesMade: 0,
    hitDiceRemaining: level,
    inspiration: !!(charData.inspiration as boolean),
    exhaustion: (charData.exhaustionLevel as number) || 0,
    createdAt: Date.now(),
  };

  return { character, warnings };
}
