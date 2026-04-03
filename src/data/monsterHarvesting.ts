// Monster harvesting system — what body parts are valuable and what they can craft.

export type HarvestDifficulty = 'easy' | 'moderate' | 'hard' | 'expert';
export type MaterialUse = 'alchemy' | 'crafting' | 'enchanting' | 'trade' | 'trophy' | 'component';

export interface HarvestMaterial {
  name: string;
  bodyPart: string;
  value: number;
  use: MaterialUse;
  harvestDC: number;
  harvestSkill: string;
  preservationMethod: string;
  craftableItem: string | null;
  spoilsIn: number | null; // hours before worthless, null = doesn't spoil
}

export interface MonsterHarvestProfile {
  monsterName: string;
  cr: number;
  materials: HarvestMaterial[];
  specialNote: string;
  totalHarvestTime: string;
}

const PROFILES: MonsterHarvestProfile[] = [
  { monsterName: 'Dragon (any color)', cr: 10, materials: [
    { name: 'Dragon Scales', bodyPart: 'Hide', value: 500, use: 'crafting', harvestDC: 12, harvestSkill: 'Nature', preservationMethod: 'No preservation needed. Scales are naturally durable.', craftableItem: 'Dragon Scale Mail (AC 14 + DEX max 2, resistance to dragon\'s element)', spoilsIn: null },
    { name: 'Dragon Blood', bodyPart: 'Circulatory system', value: 200, use: 'alchemy', harvestDC: 14, harvestSkill: 'Medicine', preservationMethod: 'Seal in glass vials immediately. Crystallizes after 24 hours.', craftableItem: 'Potion of Elemental Resistance (dragon\'s element)', spoilsIn: 24 },
    { name: 'Dragon Teeth', bodyPart: 'Jaw', value: 100, use: 'trophy', harvestDC: 10, harvestSkill: 'Athletics', preservationMethod: 'Dry and polish. They last forever.', craftableItem: 'Dragon Tooth Dagger (1d4, +1d6 elemental on crit)', spoilsIn: null },
    { name: 'Dragon Heart', bodyPart: 'Chest cavity', value: 1000, use: 'enchanting', harvestDC: 16, harvestSkill: 'Medicine', preservationMethod: 'Must be preserved in alchemical solution within 1 hour.', craftableItem: 'Amulet of Dragon\'s Breath (1/day, 30ft cone of dragon\'s element, 6d6)', spoilsIn: 1 },
  ], specialNote: 'Dragon parts are regulated in most cities. Possession may require a license.', totalHarvestTime: '2 hours' },
  { monsterName: 'Basilisk', cr: 3, materials: [
    { name: 'Basilisk Eye', bodyPart: 'Head', value: 150, use: 'alchemy', harvestDC: 13, harvestSkill: 'Medicine', preservationMethod: 'Keep in dark jar. Light degrades the petrification enzyme.', craftableItem: 'Basilisk Oil (contact poison, CON DC 12 or restrained 1 round)', spoilsIn: 48 },
    { name: 'Basilisk Stomach Acid', bodyPart: 'Stomach', value: 50, use: 'alchemy', harvestDC: 12, harvestSkill: 'Nature', preservationMethod: 'Glass or ceramic container only. Eats through metal.', craftableItem: 'Acid Vial (2d6 acid damage, thrown)', spoilsIn: 72 },
  ], specialNote: 'Avoid eye contact with the severed head. The petrification lingers for 1d4 hours.', totalHarvestTime: '30 minutes' },
  { monsterName: 'Beholder', cr: 13, materials: [
    { name: 'Eye Stalks', bodyPart: 'Stalks', value: 300, use: 'enchanting', harvestDC: 15, harvestSkill: 'Arcana', preservationMethod: 'Suspend in antimagic fluid. Otherwise they fire randomly.', craftableItem: 'Wand of the Eye (1/day, cast the stalk\'s ray spell)', spoilsIn: 6 },
    { name: 'Central Eye Lens', bodyPart: 'Central eye', value: 2000, use: 'enchanting', harvestDC: 18, harvestSkill: 'Arcana', preservationMethod: 'Immediately encase in lead. The antimagic field persists.', craftableItem: 'Antimagic Amulet (10ft antimagic cone, 1 minute/day)', spoilsIn: 2 },
    { name: 'Beholder Hide', bodyPart: 'Body', value: 100, use: 'trade', harvestDC: 10, harvestSkill: 'Nature', preservationMethod: 'Tan as leather. Slightly floats.', craftableItem: 'Hovering Cloak (Levitate 1/day)', spoilsIn: null },
  ], specialNote: 'A beholder\'s corpse still generates a weak antimagic field for 1d4 hours after death.', totalHarvestTime: '1 hour' },
  { monsterName: 'Troll', cr: 5, materials: [
    { name: 'Troll Blood', bodyPart: 'Circulatory system', value: 75, use: 'alchemy', harvestDC: 11, harvestSkill: 'Medicine', preservationMethod: 'Mix with acid or fire residue to stabilize. Otherwise it regenerates INTO things.', craftableItem: 'Potion of Regeneration (heal 1d4 HP per round for 1 minute)', spoilsIn: 4 },
    { name: 'Troll Knucklebones', bodyPart: 'Hands', value: 25, use: 'trophy', harvestDC: 10, harvestSkill: 'Athletics', preservationMethod: 'Boil in vinegar. They stop twitching after an hour.', craftableItem: null, spoilsIn: null },
  ], specialNote: 'Troll parts regenerate. Cut pieces WILL try to crawl back together unless treated with fire or acid.', totalHarvestTime: '20 minutes' },
  { monsterName: 'Owlbear', cr: 3, materials: [
    { name: 'Owlbear Feathers', bodyPart: 'Wings/head', value: 30, use: 'trade', harvestDC: 8, harvestSkill: 'Nature', preservationMethod: 'Air dry. Popular for quill pens and pillow stuffing.', craftableItem: null, spoilsIn: null },
    { name: 'Owlbear Beak', bodyPart: 'Head', value: 50, use: 'crafting', harvestDC: 12, harvestSkill: 'Athletics', preservationMethod: 'Clean and lacquer.', craftableItem: 'Beak Dagger (1d4 piercing, advantage on intimidation when displayed)', spoilsIn: null },
    { name: 'Owlbear Pelts', bodyPart: 'Body', value: 60, use: 'trade', harvestDC: 10, harvestSkill: 'Nature', preservationMethod: 'Tan immediately or salt heavily.', craftableItem: 'Owlbear Cloak (advantage on Intimidation vs beasts)', spoilsIn: 48 },
  ], specialNote: 'Owlbear cubs are worth 500gp alive to exotic animal dealers. Ethical concerns apply.', totalHarvestTime: '45 minutes' },
];

export function getHarvestProfile(monsterName: string): MonsterHarvestProfile | undefined {
  return PROFILES.find((p) => p.monsterName.toLowerCase().includes(monsterName.toLowerCase()));
}

export function getMaterialsByUse(use: MaterialUse): HarvestMaterial[] {
  return PROFILES.flatMap((p) => p.materials).filter((m) => m.use === use);
}

export function getPerishableMaterials(): HarvestMaterial[] {
  return PROFILES.flatMap((p) => p.materials).filter((m) => m.spoilsIn !== null);
}

export function getCraftableItems(): HarvestMaterial[] {
  return PROFILES.flatMap((p) => p.materials).filter((m) => m.craftableItem !== null);
}

export function getTotalHarvestValue(profile: MonsterHarvestProfile): number {
  return profile.materials.reduce((sum, m) => sum + m.value, 0);
}

export function getAllMonsterNames(): string[] {
  return PROFILES.map((p) => p.monsterName);
}

export function formatHarvestProfile(profile: MonsterHarvestProfile): string {
  const lines = [`🔪 **${profile.monsterName}** (CR ${profile.cr}) — Harvest time: ${profile.totalHarvestTime}`];
  lines.push(`  Total value: ~${getTotalHarvestValue(profile)}gp`);
  profile.materials.forEach((m) => {
    const spoil = m.spoilsIn ? ` ⏱️${m.spoilsIn}h` : '';
    lines.push(`  💎 ${m.name} (${m.bodyPart}) — ${m.value}gp | ${m.harvestSkill} DC ${m.harvestDC}${spoil}`);
    if (m.craftableItem) lines.push(`    → Crafts: ${m.craftableItem}`);
  });
  lines.push(`  📝 ${profile.specialNote}`);
  return lines.join('\n');
}

export { PROFILES as HARVEST_PROFILES };
