// Foundry VTT actor JSON import parser.
// Maps the Foundry dnd5e actor schema to our Character type.
// Detects Foundry format via `type: 'character'` + `system.abilities`.

import type { Character, Race, CharacterClass, Item, ItemType, ItemRarity } from '../types/game';
import { RACES, CLASSES, DEFAULT_APPEARANCE, EMPTY_EQUIPMENT } from '../types/game';

function parseRace(raw: string): Race {
  const lower = raw.toLowerCase();
  for (const race of RACES) if (lower.includes(race.toLowerCase())) return race;
  if (lower.includes('elf')) return 'Elf';
  if (lower.includes('dwarf')) return 'Dwarf';
  if (lower.includes('halfling')) return 'Halfling';
  if (lower.includes('orc')) return 'Half-Orc';
  return 'Human';
}

function parseClass(raw: string): CharacterClass {
  const lower = raw.toLowerCase();
  for (const cls of CLASSES) if (lower.includes(cls.toLowerCase())) return cls;
  return 'Fighter';
}

export interface FoundryImportResult {
  character: Character;
  warnings: string[];
}

export function isFoundryActor(data: Record<string, unknown>): boolean {
  return data.type === 'character' && typeof data.system === 'object' && data.system !== null
    && typeof (data.system as Record<string, unknown>).abilities === 'object';
}

export function parseFoundryActor(json: Record<string, unknown>, playerId: string): FoundryImportResult {
  const warnings: string[] = [];
  const sys = (json.system as Record<string, unknown>) || {};
  const abilities = (sys.abilities as Record<string, { value?: number }>) || {};
  const attrs = (sys.attributes as Record<string, unknown>) || {};
  const details = (sys.details as Record<string, unknown>) || {};

  const name = String(json.name || 'Imported Character');

  // Stats
  const stats = {
    STR: abilities.str?.value ?? 10,
    DEX: abilities.dex?.value ?? 10,
    CON: abilities.con?.value ?? 10,
    INT: abilities.int?.value ?? 10,
    WIS: abilities.wis?.value ?? 10,
    CHA: abilities.cha?.value ?? 10,
  };

  // HP
  const hp = (attrs.hp as Record<string, number>)?.value ?? 10;
  const maxHp = (attrs.hp as Record<string, number>)?.max ?? hp;
  const ac = (attrs.ac as Record<string, number>)?.flat ?? (attrs.ac as Record<string, number>)?.value ?? (10 + Math.floor((stats.DEX - 10) / 2));

  // Death saves
  const death = (attrs.death as Record<string, number>) || {};
  const deathSaves = { successes: death.success || 0, failures: death.failure || 0 };

  // Level + class (from items array or details)
  const items = (json.items as Array<Record<string, unknown>>) || [];
  const classItem = items.find((i) => i.type === 'class');
  const classItemSys = (classItem?.system as Record<string, unknown>) || {};
  const className = String(classItem?.name || '');
  const characterClass = parseClass(className);
  const level = (classItemSys.levels as number) || (details.level as number) || 1;

  // Race
  const raceName = String(details.race || '');
  const race = parseRace(raceName);

  // Background
  const bgItem = items.find((i) => i.type === 'background');
  const backgroundName = String(bgItem?.name || details.background || 'Folk Hero');

  // XP + gold
  const xp = (details.xp as Record<string, number>)?.value ?? 0;
  const currency = (sys.currency as Record<string, number>) || {};
  const gold = (currency.gp || 0) + (currency.pp || 0) * 10 + (currency.ep || 0) * 0.5 + (currency.sp || 0) * 0.1 + (currency.cp || 0) * 0.01;

  // Biography → backstory/traits
  const bio = (details.biography as Record<string, string>) || {};
  const bioText = String(bio.value || '').replace(/<[^>]+>/g, '');

  // Alignment
  const alignment = String(details.alignment || 'True Neutral');

  // Inventory — parse Foundry items into our Item type
  const invItems = items.filter((i) => ['weapon', 'equipment', 'consumable', 'tool', 'loot'].includes(String(i.type)));
  const inventory: Item[] = invItems.map((fi) => {
    const fiSys = (fi.system as Record<string, unknown>) || {};
    const fiName = String(fi.name || 'Unknown');
    let itemType: ItemType = 'misc';
    const fiType = String(fi.type || '');
    if (fiType === 'weapon') itemType = 'weapon';
    else if (fiType === 'equipment') {
      const armorType = String((fiSys.armor as Record<string, unknown>)?.type || '');
      itemType = armorType.includes('shield') ? 'shield' : armorType ? 'armor' : 'misc';
    }
    else if (fiType === 'consumable' && fiName.toLowerCase().includes('potion')) itemType = 'potion';

    const rarity = String(fiSys.rarity || 'common').toLowerCase() as ItemRarity;
    const desc = String(fiSys.description?.toString() || fi.name || '').replace(/<[^>]+>/g, '').slice(0, 200);
    const qty = (fiSys.quantity as number) || 1;

    const item: Item = {
      id: crypto.randomUUID(),
      name: fiName,
      type: itemType,
      rarity: (['common', 'uncommon', 'rare', 'epic'].includes(rarity) ? rarity : 'common') as ItemRarity,
      description: desc,
      value: (fiSys.price as Record<string, number>)?.value || 0,
      quantity: qty > 1 ? qty : undefined,
    };

    if (itemType === 'weapon') {
      const dmg = (fiSys.damage as Record<string, unknown>)?.parts;
      if (Array.isArray(dmg) && dmg.length > 0) {
        const firstPart = (dmg[0] as string[]);
        if (firstPart?.[0]) item.damageDie = String(firstPart[0]);
      }
      item.equipSlot = 'weapon';
    }
    if (itemType === 'armor') {
      item.acBonus = (fiSys.armor as Record<string, number>)?.value || 0;
      item.equipSlot = 'armor';
    }
    if (itemType === 'shield') {
      item.acBonus = (fiSys.armor as Record<string, number>)?.value || 2;
      item.equipSlot = 'shield';
    }
    if (itemType === 'potion') {
      item.healAmount = fiName.toLowerCase().includes('greater') ? 14 : fiName.toLowerCase().includes('superior') ? 28 : 7;
    }

    return item;
  }).filter((i) => i.name !== 'Unknown');

  if (inventory.length > 0) warnings.push(`Imported ${inventory.length} item${inventory.length !== 1 ? 's' : ''}`);
  if (raceName && !RACES.includes(race)) warnings.push(`Race "${raceName}" mapped to ${race}`);
  if (className && !CLASSES.includes(characterClass)) warnings.push(`Class "${className}" mapped to ${characterClass}`);

  // Auto-equip best weapon/armor/shield
  const bestWeapon = inventory.filter((i) => i.type === 'weapon').sort((a, b) => (b.attackBonus || 0) - (a.attackBonus || 0))[0] || null;
  const bestArmor = inventory.filter((i) => i.type === 'armor').sort((a, b) => (b.acBonus || 0) - (a.acBonus || 0))[0] || null;
  const bestShield = inventory.filter((i) => i.type === 'shield')[0] || null;

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
    ac,
    deathSaves,
    condition: 'normal',
    appearance: { ...DEFAULT_APPEARANCE },
    background: backgroundName as Character['background'],
    alignment: alignment as Character['alignment'],
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    backstory: bioText,
    playerId,
    gold: Math.round(gold * 100) / 100,
    inventory,
    equipment: { weapon: bestWeapon, armor: bestArmor, shield: bestShield, ring: null },
    spellSlotsUsed: {},
    classAbilityUsed: false,
    feats: [],
    asiChoicesMade: 0,
    hitDiceRemaining: level,
    inspiration: false,
    exhaustion: 0,
    createdAt: Date.now(),
  };

  return { character, warnings };
}
