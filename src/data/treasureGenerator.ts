// Random treasure generator — loot tables by CR tier with magic item rolls.
// Generates gold, gems, art objects, and magic items appropriate to level.

export type TreasureTier = 'minor' | 'moderate' | 'major' | 'legendary';

export interface TreasureRoll {
  gold: number;
  gems: { name: string; value: number }[];
  artObjects: { name: string; value: number }[];
  magicItems: { name: string; rarity: string; description: string }[];
  totalValue: number;
}

const GEMS: Record<string, number[]> = {
  'Azurite': [10], 'Agate': [10], 'Turquoise': [10], 'Quartz': [10],
  'Bloodstone': [50], 'Moonstone': [50], 'Onyx': [50], 'Zircon': [50],
  'Amber': [100], 'Garnet': [100], 'Jade': [100], 'Pearl': [100],
  'Topaz': [500], 'Star Ruby': [1000], 'Diamond': [5000], 'Jacinth': [5000],
};

const ART_OBJECTS: Record<string, number[]> = {
  'Silver ewer': [25], 'Carved bone statuette': [25], 'Gold bracelet': [25],
  'Silk robe with gold embroidery': [75], 'Silver necklace with gemstone': [75],
  'Bronze crown': [250], 'Painting by a master': [250], 'Gold ring with bloodstone': [250],
  'Jeweled gold crown': [750], 'Gold music box': [750],
  'Gold-and-sapphire pendant': [2500], 'Platinum tiara': [7500],
};

const MAGIC_ITEMS = {
  common: [
    { name: 'Potion of Healing', description: 'Restores 2d4+2 HP.' },
    { name: 'Spell Scroll (Cantrip)', description: 'Contains one cantrip.' },
    { name: 'Driftglobe', description: 'Floating light source.' },
    { name: 'Cloak of Many Fashions', description: 'Changes appearance at will.' },
  ],
  uncommon: [
    { name: 'Bag of Holding', description: 'Holds up to 500 lbs in extradimensional space.' },
    { name: 'Boots of Elvenkind', description: 'Advantage on Stealth checks.' },
    { name: 'Gauntlets of Ogre Power', description: 'STR becomes 19.' },
    { name: 'Potion of Greater Healing', description: 'Restores 4d4+4 HP.' },
    { name: '+1 Weapon', description: '+1 to attack and damage rolls.' },
    { name: 'Cloak of Protection', description: '+1 AC and saving throws.' },
  ],
  rare: [
    { name: 'Flame Tongue', description: 'Bonus 2d6 fire damage on command.' },
    { name: 'Ring of Protection', description: '+1 AC and saving throws.' },
    { name: 'Amulet of Health', description: 'CON becomes 19.' },
    { name: '+2 Weapon', description: '+2 to attack and damage rolls.' },
    { name: 'Potion of Flying', description: 'Fly for 1 hour.' },
  ],
  legendary: [
    { name: 'Vorpal Sword', description: 'Nat 20 severs the head.' },
    { name: 'Holy Avenger', description: '+3 weapon, aura of protection.' },
    { name: 'Tome of Clear Thought', description: '+2 INT permanently.' },
    { name: 'Luck Blade', description: '+1 sword with 1d4-1 wishes.' },
  ],
};

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rollDice(count: number, sides: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return total;
}

export function getTierFromCR(cr: number): TreasureTier {
  if (cr <= 4) return 'minor';
  if (cr <= 10) return 'moderate';
  if (cr <= 16) return 'major';
  return 'legendary';
}

export function generateTreasure(tier: TreasureTier): TreasureRoll {
  const result: TreasureRoll = { gold: 0, gems: [], artObjects: [], magicItems: [], totalValue: 0 };

  // Gold
  switch (tier) {
    case 'minor': result.gold = rollDice(4, 6) * 10; break;
    case 'moderate': result.gold = rollDice(4, 6) * 100; break;
    case 'major': result.gold = rollDice(4, 6) * 1000; break;
    case 'legendary': result.gold = rollDice(6, 6) * 5000; break;
  }

  // Gems (50% chance)
  if (Math.random() < 0.5) {
    const gemEntries = Object.entries(GEMS);
    const count = tier === 'minor' ? rollDice(1, 4) : tier === 'moderate' ? rollDice(2, 4) : rollDice(1, 6);
    for (let i = 0; i < count; i++) {
      const [name, values] = pick(gemEntries);
      result.gems.push({ name, value: pick(values) });
    }
  }

  // Art objects (40% chance)
  if (Math.random() < 0.4) {
    const artEntries = Object.entries(ART_OBJECTS);
    const count = tier === 'minor' ? 1 : tier === 'moderate' ? rollDice(1, 3) : rollDice(1, 4);
    for (let i = 0; i < count; i++) {
      const [name, values] = pick(artEntries);
      result.artObjects.push({ name, value: pick(values) });
    }
  }

  // Magic items
  const magicChance = tier === 'minor' ? 0.2 : tier === 'moderate' ? 0.5 : tier === 'major' ? 0.8 : 1.0;
  if (Math.random() < magicChance) {
    const rarity = tier === 'minor' ? 'common' : tier === 'moderate' ? 'uncommon' : tier === 'major' ? 'rare' : 'legendary';
    const item = pick(MAGIC_ITEMS[rarity]);
    result.magicItems.push({ ...item, rarity });
    // Major/legendary get a second item chance
    if ((tier === 'major' || tier === 'legendary') && Math.random() < 0.5) {
      const bonus = pick(MAGIC_ITEMS[tier === 'legendary' ? 'rare' : 'uncommon']);
      result.magicItems.push({ ...bonus, rarity: tier === 'legendary' ? 'rare' : 'uncommon' });
    }
  }

  result.totalValue = result.gold
    + result.gems.reduce((s, g) => s + g.value, 0)
    + result.artObjects.reduce((s, a) => s + a.value, 0);

  return result;
}

export function formatTreasure(roll: TreasureRoll): string {
  const lines = ['💰 **Treasure:**'];
  lines.push(`Gold: ${roll.gold.toLocaleString()}gp`);
  if (roll.gems.length > 0) lines.push(`Gems: ${roll.gems.map((g) => `${g.name} (${g.value}gp)`).join(', ')}`);
  if (roll.artObjects.length > 0) lines.push(`Art: ${roll.artObjects.map((a) => `${a.name} (${a.value}gp)`).join(', ')}`);
  if (roll.magicItems.length > 0) lines.push(`Magic: ${roll.magicItems.map((m) => `**${m.name}** (${m.rarity}) — ${m.description}`).join('; ')}`);
  lines.push(`**Total Value: ~${roll.totalValue.toLocaleString()}gp**`);
  return lines.join('\n');
}
