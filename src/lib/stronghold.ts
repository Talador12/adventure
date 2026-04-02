// Stronghold management — party can acquire and upgrade a base of operations.
// Provides passive bonuses, storage, NPC hirelings, and income.

export type StrongholdType = 'tavern' | 'keep' | 'tower' | 'temple' | 'thieves_den' | 'grove';

export interface StrongholdUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  buildDays: number;
  bonus: string;
  prerequisite?: string;
}

export interface Stronghold {
  type: StrongholdType;
  name: string;
  level: number; // 1-5
  upgrades: string[]; // upgrade IDs
  hirelings: number;
  weeklyIncome: number;
  weeklyUpkeep: number;
}

export interface StrongholdConfig {
  type: StrongholdType;
  name: string;
  emoji: string;
  baseCost: number;
  description: string;
  baseIncome: number;
  baseUpkeep: number;
  upgrades: StrongholdUpgrade[];
}

export const STRONGHOLD_TYPES: StrongholdConfig[] = [
  {
    type: 'tavern', name: 'Tavern', emoji: '🍺', baseCost: 5000,
    description: 'A welcoming establishment that generates income from patrons and provides a place to gather information.',
    baseIncome: 50, baseUpkeep: 20,
    upgrades: [
      { id: 'brew', name: 'Brewery', description: 'Brew your own ale. +25gp weekly income.', cost: 1000, buildDays: 14, bonus: '+25gp/week' },
      { id: 'rooms', name: 'Guest Rooms', description: 'Rent rooms to travelers. +15gp weekly income.', cost: 500, buildDays: 7, bonus: '+15gp/week' },
      { id: 'stage', name: 'Performance Stage', description: 'Attract bards. Advantage on Gather Info checks here.', cost: 750, buildDays: 10, bonus: 'Advantage on CHA checks' },
      { id: 'cellar', name: 'Hidden Cellar', description: 'Secret storage for questionable goods.', cost: 1500, buildDays: 14, bonus: 'Secret room', prerequisite: 'rooms' },
    ],
  },
  {
    type: 'keep', name: 'Keep', emoji: '🏰', baseCost: 15000,
    description: 'A fortified structure that attracts soldiers and provides military power.',
    baseIncome: 30, baseUpkeep: 50,
    upgrades: [
      { id: 'walls', name: 'Stone Walls', description: 'Upgrade to stone. +5 AC for defenders.', cost: 5000, buildDays: 30, bonus: '+5 defender AC' },
      { id: 'barracks', name: 'Barracks', description: 'House 20 soldiers. +2 hirelings.', cost: 2000, buildDays: 14, bonus: '+2 hirelings' },
      { id: 'armory', name: 'Armory', description: 'Equip soldiers. Hirelings gain +1 attack.', cost: 3000, buildDays: 14, bonus: '+1 hireling attack', prerequisite: 'barracks' },
      { id: 'tower', name: 'Watchtower', description: 'Spot approaching threats from miles away.', cost: 2500, buildDays: 21, bonus: 'Early warning' },
    ],
  },
  {
    type: 'tower', name: 'Wizard Tower', emoji: '🗼', baseCost: 10000,
    description: 'An arcane laboratory for research, enchanting, and summoning.',
    baseIncome: 20, baseUpkeep: 40,
    upgrades: [
      { id: 'library', name: 'Arcane Library', description: 'Research spells. Advantage on Arcana checks.', cost: 3000, buildDays: 14, bonus: 'Advantage on INT (Arcana)' },
      { id: 'lab', name: 'Alchemy Lab', description: 'Brew potions at half cost.', cost: 2000, buildDays: 10, bonus: '50% potion cost' },
      { id: 'portal', name: 'Teleportation Circle', description: 'Permanent circle for fast travel.', cost: 10000, buildDays: 30, bonus: 'Fast travel', prerequisite: 'library' },
      { id: 'familiar', name: 'Familiar Roost', description: 'House magical familiars. +1 spy hireling.', cost: 1000, buildDays: 7, bonus: '+1 spy hireling' },
    ],
  },
  {
    type: 'temple', name: 'Temple', emoji: '⛪', baseCost: 8000,
    description: 'A holy site that attracts pilgrims and provides divine blessings.',
    baseIncome: 35, baseUpkeep: 25,
    upgrades: [
      { id: 'shrine', name: 'Blessed Shrine', description: 'Short rests here restore +1d6 HP.', cost: 2000, buildDays: 14, bonus: '+1d6 HP on short rest' },
      { id: 'hospital', name: 'Hospital Wing', description: 'Cure disease and remove curses between adventures.', cost: 3000, buildDays: 14, bonus: 'Disease/curse removal' },
      { id: 'bell', name: 'Bell Tower', description: 'Rally villagers in emergencies. +3 militia hirelings.', cost: 1500, buildDays: 10, bonus: '+3 militia' },
    ],
  },
];

export function getStrongholdConfig(type: StrongholdType): StrongholdConfig {
  return STRONGHOLD_TYPES.find((s) => s.type === type) || STRONGHOLD_TYPES[0];
}

export function createStronghold(type: StrongholdType, name: string): Stronghold {
  const config = getStrongholdConfig(type);
  return {
    type, name, level: 1, upgrades: [], hirelings: 1,
    weeklyIncome: config.baseIncome, weeklyUpkeep: config.baseUpkeep,
  };
}

export function getAvailableUpgrades(stronghold: Stronghold): StrongholdUpgrade[] {
  const config = getStrongholdConfig(stronghold.type);
  return config.upgrades.filter((u) => {
    if (stronghold.upgrades.includes(u.id)) return false;
    if (u.prerequisite && !stronghold.upgrades.includes(u.prerequisite)) return false;
    return true;
  });
}

export function getNetIncome(stronghold: Stronghold): number {
  return stronghold.weeklyIncome - stronghold.weeklyUpkeep;
}

export function formatStrongholdStatus(stronghold: Stronghold): string {
  const config = getStrongholdConfig(stronghold.type);
  const net = getNetIncome(stronghold);
  const lines = [`${config.emoji} **${stronghold.name}** (${config.name} Lv ${stronghold.level})`];
  lines.push(`Income: ${stronghold.weeklyIncome}gp/week | Upkeep: ${stronghold.weeklyUpkeep}gp/week | Net: ${net > 0 ? '+' : ''}${net}gp/week`);
  lines.push(`Hirelings: ${stronghold.hirelings}`);
  if (stronghold.upgrades.length > 0) {
    const upgradeNames = stronghold.upgrades.map((id) => config.upgrades.find((u) => u.id === id)?.name || id);
    lines.push(`Upgrades: ${upgradeNames.join(', ')}`);
  }
  const available = getAvailableUpgrades(stronghold);
  if (available.length > 0) lines.push(`Available: ${available.map((u) => `${u.name} (${u.cost}gp)`).join(', ')}`);
  return lines.join('\n');
}
