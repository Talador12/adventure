// Monster Manual — D&D 5e SRD monster compendium for DM browsing and spawning.
// Each entry maps to EnemyTemplate for direct use in combat.

import type { EnemyAbility } from '../types/game';

export type MonsterType = 'aberration' | 'beast' | 'celestial' | 'construct' | 'dragon' | 'elemental' | 'fey' | 'fiend' | 'giant' | 'humanoid' | 'monstrosity' | 'ooze' | 'plant' | 'undead';
export type MonsterSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
export type Environment = 'any' | 'arctic' | 'coastal' | 'desert' | 'forest' | 'grassland' | 'hill' | 'mountain' | 'swamp' | 'underdark' | 'underwater' | 'urban';

export interface Monster {
  name: string;
  cr: number;
  type: MonsterType;
  size: MonsterSize;
  environments: Environment[];
  hp: [number, number]; // min, max
  ac: number;
  attackBonus: number;
  damageDie: string;
  damageBonus: number;
  dexMod: number;
  speed: number; // cells (5ft per cell)
  xpValue: number;
  abilities: EnemyAbility[];
  description: string;
  // Legendary — boss monsters get extra actions between player turns
  legendaryActions?: number;
  legendaryAbilities?: EnemyAbility[];
}

// XP by CR (D&D 5e DMG)
const XP_BY_CR: Record<number, number> = {
  0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100, 5: 1800,
  6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900,
};

function xp(cr: number): number { return XP_BY_CR[cr] ?? Math.round(cr * 1000); }

export const MONSTERS: Monster[] = [
  // === CR 0.125 ===
  { name: 'Kobold', cr: 0.125, type: 'humanoid', size: 'Small', environments: ['forest', 'hill', 'mountain', 'underdark'], hp: [5, 7], ac: 12, attackBonus: 4, damageDie: '1d4', damageBonus: 2, dexMod: 2, speed: 6, xpValue: xp(0.125), abilities: [{ name: 'Pack Tactics', type: 'attack', damageDie: '1d6', attackBonus: 4, cooldown: 2, description: 'Advantage on attack when ally is adjacent.' }], description: 'Small reptilian humanoid. Cowardly alone, dangerous in packs.' },
  { name: 'Stirge', cr: 0.125, type: 'beast', size: 'Tiny', environments: ['coastal', 'forest', 'swamp', 'underdark', 'urban'], hp: [2, 5], ac: 14, attackBonus: 5, damageDie: '1d4', damageBonus: 3, dexMod: 3, speed: 2, xpValue: xp(0.125), abilities: [], description: 'A mosquito-bat hybrid that latches on and drains blood.' },

  // === CR 0.25 ===
  { name: 'Goblin', cr: 0.25, type: 'humanoid', size: 'Small', environments: ['forest', 'hill', 'grassland', 'underdark'], hp: [7, 12], ac: 15, attackBonus: 4, damageDie: '1d6', damageBonus: 2, dexMod: 2, speed: 6, xpValue: xp(0.25), abilities: [], description: 'Small, nimble raiders that rely on numbers and cunning.' },
  { name: 'Skeleton', cr: 0.25, type: 'undead', size: 'Medium', environments: ['any'], hp: [13, 13], ac: 13, attackBonus: 4, damageDie: '1d6', damageBonus: 2, dexMod: 2, speed: 6, xpValue: xp(0.25), abilities: [], description: 'Animated bones obeying their creator\'s last command.' },
  { name: 'Zombie', cr: 0.25, type: 'undead', size: 'Medium', environments: ['any'], hp: [22, 22], ac: 8, attackBonus: 3, damageDie: '1d6', damageBonus: 1, dexMod: -1, speed: 4, xpValue: xp(0.25), abilities: [], description: 'Shambling corpse. Tough to put down — Undead Fortitude.' },
  { name: 'Giant Rat', cr: 0.125, type: 'beast', size: 'Small', environments: ['forest', 'swamp', 'underdark', 'urban'], hp: [7, 7], ac: 12, attackBonus: 4, damageDie: '1d4', damageBonus: 2, dexMod: 2, speed: 6, xpValue: xp(0.125), abilities: [], description: 'Disease-carrying rodent the size of a large dog.' },
  { name: 'Wolf', cr: 0.25, type: 'beast', size: 'Medium', environments: ['forest', 'grassland', 'hill'], hp: [11, 11], ac: 13, attackBonus: 4, damageDie: '2d4', damageBonus: 2, dexMod: 2, speed: 8, xpValue: xp(0.25), abilities: [{ name: 'Pack Tactics', type: 'attack', damageDie: '1d8', attackBonus: 4, cooldown: 2, description: 'Advantage on attack when ally is adjacent.' }], description: 'Pack hunter with keen senses and a vicious bite.' },

  // === CR 0.5 ===
  { name: 'Orc', cr: 0.5, type: 'humanoid', size: 'Medium', environments: ['arctic', 'forest', 'grassland', 'hill', 'mountain', 'underdark'], hp: [15, 15], ac: 13, attackBonus: 5, damageDie: '1d12', damageBonus: 3, dexMod: 1, speed: 6, xpValue: xp(0.5), abilities: [{ name: 'Aggressive Charge', type: 'attack', damageDie: '2d6', attackBonus: 5, cooldown: 3, description: 'Rushes forward and strikes with extra force.' }], description: 'Brutal raider driven by a god of slaughter.' },
  { name: 'Shadow', cr: 0.5, type: 'undead', size: 'Medium', environments: ['underdark', 'urban'], hp: [16, 16], ac: 12, attackBonus: 4, damageDie: '2d6', damageBonus: 2, dexMod: 2, speed: 8, xpValue: xp(0.5), abilities: [{ name: 'Strength Drain', type: 'condition', condition: 'hexed', conditionDuration: 2, cooldown: 3, description: 'Drains strength on a hit. Target feels leaden.' }], description: 'A wraith of living darkness that feeds on strength.' },

  // === CR 1 ===
  { name: 'Bugbear', cr: 1, type: 'humanoid', size: 'Medium', environments: ['forest', 'underdark'], hp: [27, 27], ac: 16, attackBonus: 4, damageDie: '2d8', damageBonus: 2, dexMod: 2, speed: 6, xpValue: xp(1), abilities: [{ name: 'Surprise Attack', type: 'attack', damageDie: '2d6', attackBonus: 5, cooldown: 0, description: 'Deals extra damage on the first hit in a fight.' }], description: 'Large goblinoid ambush predator. Patient and brutal.' },
  { name: 'Ghoul', cr: 1, type: 'undead', size: 'Medium', environments: ['swamp', 'underdark', 'urban'], hp: [22, 22], ac: 12, attackBonus: 4, damageDie: '2d6', damageBonus: 2, dexMod: 2, speed: 6, xpValue: xp(1), abilities: [{ name: 'Paralyzing Touch', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 4, description: 'On hit, the target must save or be paralyzed.' }], description: 'Flesh-eating undead that paralyzes its prey.' },
  { name: 'Dire Wolf', cr: 1, type: 'beast', size: 'Large', environments: ['arctic', 'forest', 'grassland', 'hill'], hp: [37, 37], ac: 14, attackBonus: 5, damageDie: '2d6', damageBonus: 3, dexMod: 2, speed: 10, xpValue: xp(1), abilities: [{ name: 'Knockdown', type: 'condition', condition: 'prone', conditionDuration: 1, cooldown: 3, description: 'Target must save or be knocked prone.' }], description: 'A massive wolf, taller than a horse at the shoulder.' },
  { name: 'Giant Spider', cr: 1, type: 'beast', size: 'Large', environments: ['forest', 'swamp', 'underdark'], hp: [26, 26], ac: 14, attackBonus: 5, damageDie: '1d8', damageBonus: 3, dexMod: 3, speed: 6, xpValue: xp(1), abilities: [{ name: 'Venomous Bite', type: 'condition', condition: 'poisoned', conditionDuration: 2, cooldown: 3, description: 'Injects venom that saps strength and focus.' }], description: 'Web-spinning ambush predator the size of a horse.' },
  { name: 'Animated Armor', cr: 1, type: 'construct', size: 'Medium', environments: ['any'], hp: [33, 33], ac: 18, attackBonus: 4, damageDie: '1d6', damageBonus: 2, dexMod: 0, speed: 5, xpValue: xp(1), abilities: [], description: 'Enchanted suit of armor that fights without a wearer.' },

  // === CR 2 ===
  { name: 'Ogre', cr: 2, type: 'giant', size: 'Large', environments: ['arctic', 'coastal', 'desert', 'forest', 'grassland', 'hill', 'mountain', 'swamp'], hp: [59, 59], ac: 11, attackBonus: 6, damageDie: '2d8', damageBonus: 4, dexMod: -1, speed: 8, xpValue: xp(2), abilities: [{ name: 'Crushing Blow', type: 'attack', damageDie: '3d8', attackBonus: 6, cooldown: 3, description: 'A devastating overhead strike.' }], description: 'Hulking brute that smashes first and never asks questions.' },
  { name: 'Minotaur', cr: 3, type: 'monstrosity', size: 'Large', environments: ['underdark'], hp: [76, 76], ac: 14, attackBonus: 6, damageDie: '2d12', damageBonus: 4, dexMod: 0, speed: 8, xpValue: xp(3), abilities: [{ name: 'Gore Charge', type: 'attack', damageDie: '2d8', attackBonus: 6, cooldown: 2, description: 'Charges and gores with its horns.' }, { name: 'Labyrinthine Recall', type: 'condition', condition: 'frightened', conditionDuration: 1, cooldown: 4, description: 'Lets out a terrifying roar.' }], description: 'Bull-headed titan that haunts labyrinthine corridors.' },
  { name: 'Gelatinous Cube', cr: 2, type: 'ooze', size: 'Large', environments: ['underdark'], hp: [84, 84], ac: 6, attackBonus: 4, damageDie: '3d6', damageBonus: 0, dexMod: -4, speed: 3, xpValue: xp(2), abilities: [{ name: 'Engulf', type: 'attack', damageDie: '3d6', attackBonus: 4, condition: 'stunned', conditionDuration: 1, cooldown: 3, description: 'The cube engulfs creatures in its path.' }], description: 'Transparent 10ft cube of acidic jelly. Hard to see until you\'re in it.' },
  { name: 'Gargoyle', cr: 2, type: 'elemental', size: 'Medium', environments: ['urban', 'any'], hp: [52, 52], ac: 15, attackBonus: 4, damageDie: '1d6', damageBonus: 2, dexMod: 0, speed: 6, xpValue: xp(2), abilities: [], description: 'Stone guardian that resembles architecture until it strikes.' },

  // === CR 3 ===
  { name: 'Manticore', cr: 3, type: 'monstrosity', size: 'Large', environments: ['arctic', 'coastal', 'grassland', 'hill', 'mountain'], hp: [68, 68], ac: 14, attackBonus: 5, damageDie: '1d8', damageBonus: 3, dexMod: 3, speed: 6, xpValue: xp(3), abilities: [{ name: 'Tail Spikes', type: 'attack', damageDie: '3d6', attackBonus: 5, cooldown: 2, description: 'Launches a volley of tail spikes at range.', isRanged: true, range: 20 }], description: 'Lion body, bat wings, human face, scorpion tail. All business.' },
  { name: 'Owlbear', cr: 3, type: 'monstrosity', size: 'Large', environments: ['forest'], hp: [59, 59], ac: 13, attackBonus: 7, damageDie: '2d8', damageBonus: 5, dexMod: 1, speed: 8, xpValue: xp(3), abilities: [{ name: 'Multiattack', type: 'attack', damageDie: '2d8', attackBonus: 7, cooldown: 0, description: 'Beak and claws in rapid succession.' }], description: 'Bear-owl hybrid. Aggressive, territorial, and always hungry.' },
  { name: 'Phase Spider', cr: 3, type: 'monstrosity', size: 'Large', environments: ['underdark'], hp: [32, 32], ac: 13, attackBonus: 4, damageDie: '1d10', damageBonus: 2, dexMod: 3, speed: 6, xpValue: xp(3), abilities: [{ name: 'Ethereal Jaunt', type: 'condition', condition: 'dodging', conditionDuration: 1, cooldown: 4, description: 'Shifts to the Ethereal Plane, becoming nearly untouchable.' }, { name: 'Phase Venom', type: 'condition', condition: 'poisoned', conditionDuration: 2, cooldown: 3, description: 'Its bite injects venom that disrupts the material plane.' }], description: 'Blinks between planes of existence. Very hard to pin down.' },
  { name: 'Werewolf', cr: 3, type: 'humanoid', size: 'Medium', environments: ['forest', 'grassland', 'hill'], hp: [58, 58], ac: 12, attackBonus: 4, damageDie: '2d6', damageBonus: 2, dexMod: 2, speed: 8, xpValue: xp(3), abilities: [{ name: 'Regeneration', type: 'heal', cooldown: 3, description: 'Regenerates 10 HP at the start of its turn unless hit by silver.' }], description: 'Cursed shapechanger. Immune to non-silvered weapons in beast form.' },

  // === CR 4 ===
  { name: 'Flameskull', cr: 4, type: 'undead', size: 'Tiny', environments: ['underdark', 'any'], hp: [40, 40], ac: 13, attackBonus: 5, damageDie: '3d6', damageBonus: 0, dexMod: 3, speed: 8, xpValue: xp(4), abilities: [{ name: 'Fireball', type: 'aoe', damageDie: '8d6', cooldown: 5, description: 'Launches a sphere of flame that detonates in a 20ft radius.', isRanged: true, range: 24 }], description: 'Floating skull wreathed in green flame. Casts Fireball.' },
  { name: 'Ettin', cr: 4, type: 'giant', size: 'Large', environments: ['hill', 'mountain', 'underdark'], hp: [85, 85], ac: 12, attackBonus: 7, damageDie: '2d8', damageBonus: 5, dexMod: -1, speed: 8, xpValue: xp(4), abilities: [{ name: 'Two Heads', type: 'attack', damageDie: '2d8', attackBonus: 7, cooldown: 0, description: 'Attacks twice — one swing per head.' }], description: 'Two-headed giant. Each head has its own terrible personality.' },

  // === CR 5 ===
  { name: 'Troll', cr: 5, type: 'giant', size: 'Large', environments: ['arctic', 'forest', 'hill', 'mountain', 'swamp', 'underdark'], hp: [84, 84], ac: 15, attackBonus: 7, damageDie: '2d6', damageBonus: 4, dexMod: 1, speed: 6, xpValue: xp(5), abilities: [{ name: 'Regeneration', type: 'heal', cooldown: 2, description: 'Regenerates 10 HP per round unless hit by fire or acid.' }, { name: 'Multiattack', type: 'attack', damageDie: '2d6', attackBonus: 7, cooldown: 0, description: 'Claw, claw, bite.' }], description: 'Lanky green monstrosity that regenerates from any wound.' },
  { name: 'Beholder Zombie', cr: 5, type: 'undead', size: 'Large', environments: ['underdark'], hp: [93, 93], ac: 15, attackBonus: 6, damageDie: '4d6', damageBonus: 0, dexMod: -1, speed: 4, xpValue: xp(5), abilities: [{ name: 'Eye Rays', type: 'aoe', damageDie: '4d10', cooldown: 4, description: 'Two random eye rays fire at targets in sight.', isRanged: true, range: 18 }], description: 'Rotting beholder corpse. Fewer eye rays but still terrifying.' },
  { name: 'Young Dragon', cr: 5, type: 'dragon', size: 'Large', environments: ['any'], hp: [75, 90], ac: 17, attackBonus: 8, damageDie: '2d10', damageBonus: 5, dexMod: 2, speed: 8, xpValue: xp(5), abilities: [{ name: 'Breath Weapon', type: 'aoe', damageDie: '6d6', cooldown: 4, description: 'A torrent of elemental fury engulfs the area.', isRanged: true, range: 12 }, { name: 'Multiattack', type: 'attack', damageDie: '2d8', attackBonus: 8, cooldown: 0, description: 'Bite and two claw attacks.' }, { name: 'Frightful Presence', type: 'condition', condition: 'frightened', conditionDuration: 3, cooldown: 6, description: 'An aura of dread forces a WIS save or be frightened.' }], description: 'Juvenile dragon. Arrogant, dangerous, and eager to prove itself.' },

  // === CR 6+ ===
  { name: 'Medusa', cr: 6, type: 'monstrosity', size: 'Medium', environments: ['desert', 'underdark'], hp: [127, 127], ac: 15, attackBonus: 5, damageDie: '1d6', damageBonus: 2, dexMod: 2, speed: 6, xpValue: xp(6), abilities: [{ name: 'Petrifying Gaze', type: 'condition', condition: 'stunned', conditionDuration: 2, cooldown: 4, description: 'Creatures that meet its gaze must save or begin turning to stone.' }, { name: 'Snake Hair', type: 'condition', condition: 'poisoned', conditionDuration: 2, cooldown: 3, description: 'Venomous serpents on its head bite nearby targets.' }], description: 'Cursed being whose gaze turns flesh to stone.' },
  { name: 'Mind Flayer', cr: 7, type: 'aberration', size: 'Medium', environments: ['underdark'], hp: [71, 71], ac: 15, attackBonus: 7, damageDie: '2d10', damageBonus: 4, dexMod: 1, speed: 6, xpValue: xp(7), abilities: [{ name: 'Mind Blast', type: 'aoe', damageDie: '4d8', cooldown: 5, description: 'A cone of psychic energy stuns all who fail their save.', isRanged: true, range: 12 }, { name: 'Extract Brain', type: 'attack', damageDie: '10d10', attackBonus: 7, cooldown: 0, description: 'Tentacles bore into a stunned creature\'s skull.' }], description: 'Tentacle-faced psionic horror. Eats brains. Plots always.', legendaryActions: 2, legendaryAbilities: [{ name: 'Psychic Lash', type: 'attack', damageDie: '3d6', attackBonus: 7, cooldown: 0, description: 'A bolt of psychic energy strikes a creature within 60ft.', isRanged: true, range: 12 }, { name: 'Tentacle Grab', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 0, description: 'Lashes out with tentacles, stunning a target.' }] },
  { name: 'Adult Dragon', cr: 10, type: 'dragon', size: 'Huge', environments: ['any'], hp: [180, 220], ac: 19, attackBonus: 11, damageDie: '2d10', damageBonus: 7, dexMod: 2, speed: 8, xpValue: xp(10), abilities: [{ name: 'Breath Weapon', type: 'aoe', damageDie: '12d6', cooldown: 5, description: 'Devastating elemental breath engulfs a massive area.', isRanged: true, range: 18 }, { name: 'Multiattack', type: 'attack', damageDie: '2d10', attackBonus: 11, cooldown: 0, description: 'Bite, two claws, tail.' }, { name: 'Frightful Presence', type: 'condition', condition: 'frightened', conditionDuration: 3, cooldown: 6, description: 'All creatures within 120ft must save or be frightened.' }, { name: 'Wing Attack', type: 'aoe', damageDie: '2d6', cooldown: 2, description: 'Beats its wings, forcing creatures prone.', isRanged: false, range: 2 }], description: 'The apex predator. Centuries of cunning wrapped in scales and fire.', legendaryActions: 3, legendaryAbilities: [{ name: 'Tail Sweep', type: 'attack', damageDie: '2d8', attackBonus: 11, cooldown: 0, description: 'Sweeps its tail, striking a nearby creature.' }, { name: 'Wing Gust', type: 'condition', condition: 'prone', conditionDuration: 1, cooldown: 0, description: 'Beats its wings, knocking a creature prone.' }, { name: 'Detect', type: 'attack', damageDie: '0', cooldown: 0, description: 'Makes a Perception check. Senses hidden threats.' }] },
];

// --- Filters ---

export const MONSTER_TYPES: MonsterType[] = ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'undead'];
export const MONSTER_ENVIRONMENTS: Environment[] = ['any', 'arctic', 'coastal', 'desert', 'forest', 'grassland', 'hill', 'mountain', 'swamp', 'underdark', 'underwater', 'urban'];

/** All distinct CR values in the compendium, sorted ascending. */
export const MONSTER_CRS: number[] = [...new Set(MONSTERS.map((m) => m.cr))].sort((a, b) => a - b);

/** Search + filter monsters. All filters are optional — omitted = no filtering. */
export function searchMonsters(opts: {
  search?: string;
  type?: MonsterType;
  environment?: Environment;
  minCR?: number;
  maxCR?: number;
}): Monster[] {
  return MONSTERS.filter((m) => {
    if (opts.search) {
      const q = opts.search.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !m.description.toLowerCase().includes(q)) return false;
    }
    if (opts.type && m.type !== opts.type) return false;
    if (opts.environment && opts.environment !== 'any' && !m.environments.includes(opts.environment)) return false;
    if (opts.minCR !== undefined && m.cr < opts.minCR) return false;
    if (opts.maxCR !== undefined && m.cr > opts.maxCR) return false;
    return true;
  });
}

/** CR display string (handles fractional CRs). */
export function formatCR(cr: number): string {
  if (cr === 0.125) return '1/8';
  if (cr === 0.25) return '1/4';
  if (cr === 0.5) return '1/2';
  return String(cr);
}

/** Type icon for UI display. */
export const TYPE_ICONS: Record<MonsterType, string> = {
  aberration: '🧠', beast: '🐾', celestial: '👼', construct: '⚙️', dragon: '🐉',
  elemental: '🌪️', fey: '🧚', fiend: '😈', giant: '🗿', humanoid: '🧑',
  monstrosity: '👹', ooze: '🟢', plant: '🌿', undead: '💀',
};
