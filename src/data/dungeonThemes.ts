// Dungeon theme data for the procedural generator.
// Each theme provides room types, corridor flavor, loot, enemies, and hazard chances.

export type DungeonTheme = 'crypt' | 'cave' | 'castle' | 'sewer' | 'temple' | 'mine' | 'lair';

export interface RoomType {
  name: string;
  weight: number;
  features: string[];
}

export interface DungeonThemeConfig {
  name: string;
  description: string;
  roomTypes: RoomType[];
  corridorStyle: string;
  lootTable: string[];
  enemyTypes: string[];
  puzzleChance: number;
  trapChance: number;
  ambientDescription: string;
}

export const DUNGEON_THEMES: Record<DungeonTheme, DungeonThemeConfig> = {
  crypt: {
    name: 'Crypt',
    description: 'Ancient burial vaults beneath a crumbling cathedral.',
    roomTypes: [
      { name: 'Burial Chamber', weight: 3, features: ['sarcophagus', 'funerary urns', 'wall niches with bones'] },
      { name: 'Ossuary', weight: 2, features: ['walls of skulls', 'bone chandeliers', 'skeletal pillars'] },
      { name: 'Ritual Hall', weight: 2, features: ['dark altar', 'ritual circle', 'black candles'] },
      { name: 'Catacombs', weight: 3, features: ['narrow shelves of corpses', 'cobwebs', 'musty air'] },
      { name: 'Embalming Room', weight: 1, features: ['stone slab', 'jars of organs', 'stained tools'] },
    ],
    corridorStyle: 'Narrow stone passages with damp walls and flickering torchlight.',
    lootTable: ['Tarnished silver ring', 'Funerary mask (50gp)', 'Scroll of Speak with Dead', 'Potion of Necrotic Resistance', 'Onyx gemstone (25gp)', 'Cursed amulet'],
    enemyTypes: ['Skeleton', 'Zombie', 'Ghoul', 'Wight', 'Specter'],
    puzzleChance: 0.15,
    trapChance: 0.25,
    ambientDescription: 'The air is cold and still. Dust motes drift in pale shafts of light from cracks above.',
  },
  cave: {
    name: 'Cave',
    description: 'A natural cavern system carved by underground rivers.',
    roomTypes: [
      { name: 'Stalactite Chamber', weight: 3, features: ['dripping stalactites', 'mineral pools', 'uneven floor'] },
      { name: 'Underground Lake', weight: 2, features: ['dark water', 'bioluminescent moss', 'rocky shore'] },
      { name: 'Fungal Grotto', weight: 2, features: ['giant mushrooms', 'spore clouds', 'phosphorescent lichen'] },
      { name: 'Narrow Squeeze', weight: 1, features: ['tight walls', 'scratch marks', 'dropped supplies'] },
      { name: 'Crystal Cavern', weight: 1, features: ['glowing crystals', 'reflective surfaces', 'humming resonance'] },
      { name: 'Bat Roost', weight: 2, features: ['guano-covered floor', 'high ceiling', 'fluttering wings'] },
    ],
    corridorStyle: 'Winding natural tunnels with rough walls and occasional puddles.',
    lootTable: ['Uncut gemstone (15gp)', 'Cave pearl necklace', 'Glowing mushroom (alchemical)', 'Miner pickaxe (+1)', 'Bag of phosphorescent dust', 'Potion of Darkvision'],
    enemyTypes: ['Giant Spider', 'Darkmantle', 'Piercer', 'Cave Fisher', 'Troglodyte'],
    puzzleChance: 0.1,
    trapChance: 0.2,
    ambientDescription: 'Water echoes in the distance. The stone is slick and the air smells of mineral deposits.',
  },
  castle: {
    name: 'Castle',
    description: 'The fortified interior of a nobleman\'s stronghold, now fallen to ruin.',
    roomTypes: [
      { name: 'Great Hall', weight: 2, features: ['long table', 'throne', 'tattered banners'] },
      { name: 'Armory', weight: 2, features: ['weapon racks', 'armor stands', 'broken shields'] },
      { name: 'Guard Room', weight: 3, features: ['bunks', 'card table', 'weapon crate'] },
      { name: 'Kitchen', weight: 1, features: ['cold hearth', 'iron pots', 'rotting pantry'] },
      { name: 'Library', weight: 1, features: ['dusty shelves', 'reading desk', 'scattered pages'] },
      { name: 'Dungeon Cells', weight: 2, features: ['iron bars', 'chains', 'scratched walls'] },
    ],
    corridorStyle: 'Stone-flagged hallways with arrow slits and faded tapestries.',
    lootTable: ['Silver goblet (30gp)', 'Signet ring', 'Map of the region', 'Potion of Healing', 'Masterwork longsword', 'Noble crest shield'],
    enemyTypes: ['Bandit', 'Guard', 'Knight', 'Animated Armor', 'Ghost'],
    puzzleChance: 0.2,
    trapChance: 0.3,
    ambientDescription: 'Wind whistles through broken windows. The stone floors are cold beneath your feet.',
  },
  sewer: {
    name: 'Sewer',
    description: 'A reeking network of tunnels beneath the city streets.',
    roomTypes: [
      { name: 'Cistern', weight: 3, features: ['standing water', 'brick arches', 'rusted grate'] },
      { name: 'Smuggler Den', weight: 2, features: ['crates', 'bedrolls', 'stolen goods'] },
      { name: 'Overflow Chamber', weight: 2, features: ['rushing water', 'slippery walkway', 'debris'] },
      { name: 'Rat Nest', weight: 2, features: ['shredded cloth', 'gnawed bones', 'squeaking'] },
      { name: 'Maintenance Hub', weight: 1, features: ['valve wheels', 'tool bench', 'flickering lantern'] },
    ],
    corridorStyle: 'Brick-lined tunnels with a central channel of foul water.',
    lootTable: ['Thieves\' tools', 'Bag of contraband (40gp)', 'Potion of Poison Resistance', 'Waterproof scroll case', 'Sewer map', 'Ring of Rat Speech'],
    enemyTypes: ['Giant Rat', 'Wererat', 'Otyugh', 'Crocodile', 'Thug'],
    puzzleChance: 0.15,
    trapChance: 0.35,
    ambientDescription: 'The stench is overwhelming. Water drips constantly, and things move in the shadows.',
  },
  temple: {
    name: 'Temple',
    description: 'A sacred site corrupted by dark forces.',
    roomTypes: [
      { name: 'Sanctuary', weight: 2, features: ['central altar', 'stained glass (shattered)', 'pews'] },
      { name: 'Meditation Cell', weight: 2, features: ['prayer mat', 'incense holder', 'holy symbol'] },
      { name: 'Reliquary', weight: 1, features: ['glass cases', 'sacred relics', 'warding glyphs'] },
      { name: 'Baptismal Font', weight: 2, features: ['stone basin', 'blessed water (or tainted)', 'mosaic floor'] },
      { name: 'Clergy Quarters', weight: 2, features: ['simple beds', 'religious texts', 'vestments'] },
      { name: 'Bell Tower Base', weight: 1, features: ['rope mechanism', 'spiral stairs', 'pigeon droppings'] },
    ],
    corridorStyle: 'Vaulted stone corridors with faded murals of forgotten gods.',
    lootTable: ['Holy water (2)', 'Prayer beads (uncommon)', 'Scroll of Lesser Restoration', 'Golden idol (75gp)', 'Cloak of Protection', 'Tome of religious lore'],
    enemyTypes: ['Cultist', 'Shadow', 'Imp', 'Flameskull', 'Mimic'],
    puzzleChance: 0.3,
    trapChance: 0.2,
    ambientDescription: 'Faint chanting echoes from somewhere deep within. The air shimmers with residual divine energy.',
  },
  mine: {
    name: 'Mine',
    description: 'An abandoned mining complex, its tunnels still rich with ore - and danger.',
    roomTypes: [
      { name: 'Mineshaft Junction', weight: 3, features: ['rail tracks', 'support timbers', 'ore carts'] },
      { name: 'Collapsed Gallery', weight: 2, features: ['rubble', 'exposed ore veins', 'dust clouds'] },
      { name: 'Foreman Office', weight: 1, features: ['desk', 'ledger', 'locked strongbox'] },
      { name: 'Ore Processing', weight: 2, features: ['sluice', 'crushing stones', 'mineral residue'] },
      { name: 'Deep Shaft', weight: 1, features: ['vertical drop', 'rope and bucket', 'echoing void'] },
      { name: 'Mushroom Farm', weight: 1, features: ['cultivated fungi', 'moisture', 'dim phosphorescence'] },
    ],
    corridorStyle: 'Timber-braced tunnels with rusted rail tracks and dripping ceilings.',
    lootTable: ['Raw silver ore (20gp)', 'Mithral nugget (100gp)', 'Potion of Growth', 'Goggles of Night', 'Mining helmet (light source)', 'Unstable dynamite'],
    enemyTypes: ['Kobold', 'Rust Monster', 'Umber Hulk', 'Earth Elemental', 'Dust Mephit'],
    puzzleChance: 0.1,
    trapChance: 0.4,
    ambientDescription: 'The timbers creak under the weight of stone above. Ore dust glitters in your torchlight.',
  },
  lair: {
    name: 'Lair',
    description: 'The den of a powerful creature, shaped by its presence.',
    roomTypes: [
      { name: 'Treasure Hoard', weight: 2, features: ['gold piles', 'stolen art', 'magical items'] },
      { name: 'Nesting Chamber', weight: 2, features: ['organic debris', 'shed scales/fur', 'warmth'] },
      { name: 'Trophy Room', weight: 2, features: ['mounted heads', 'broken weapons', 'adventurer remains'] },
      { name: 'Feeding Ground', weight: 2, features: ['bones', 'blood stains', 'claw marks'] },
      { name: 'Lookout Post', weight: 1, features: ['elevated position', 'alarm mechanism', 'narrow approach'] },
    ],
    corridorStyle: 'Passages scarred with claw marks. The walls are warm to the touch.',
    lootTable: ['Pile of mixed coins (60gp)', 'Dragon scale shield', 'Potion of Fire Resistance', 'Wand of Magic Missiles', 'Gemstone eyes (pair, 50gp each)', 'Adamantine fragment'],
    enemyTypes: ['Young Dragon', 'Troll', 'Owlbear', 'Manticore', 'Chimera'],
    puzzleChance: 0.05,
    trapChance: 0.15,
    ambientDescription: 'The air is thick with the musk of something large. Bones crunch underfoot.',
  },
};

export const DUNGEON_THEME_LIST = Object.keys(DUNGEON_THEMES) as DungeonTheme[];

// Pick a weighted-random room type from a theme.
export function pickRoomType(theme: DungeonTheme): RoomType {
  const config = DUNGEON_THEMES[theme];
  const totalWeight = config.roomTypes.reduce((s, r) => s + r.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const rt of config.roomTypes) {
    roll -= rt.weight;
    if (roll <= 0) return rt;
  }
  return config.roomTypes[0];
}

// Pick a random enemy from the theme.
export function pickEnemy(theme: DungeonTheme): string {
  const enemies = DUNGEON_THEMES[theme].enemyTypes;
  return enemies[Math.floor(Math.random() * enemies.length)];
}

// Pick a random loot item from the theme.
export function pickLoot(theme: DungeonTheme): string {
  const loot = DUNGEON_THEMES[theme].lootTable;
  return loot[Math.floor(Math.random() * loot.length)];
}

// Generate a DM-facing description for a themed room.
export function describeRoom(theme: DungeonTheme, roomIndex: number): string {
  const config = DUNGEON_THEMES[theme];
  const room = pickRoomType(theme);
  const features = room.features.slice(0, 2 + Math.floor(Math.random() * 2));
  const hasTrap = Math.random() < config.trapChance;
  const hasPuzzle = Math.random() < config.puzzleChance;
  const hasEnemy = Math.random() < 0.6;

  const lines: string[] = [];
  lines.push(`Room ${roomIndex + 1}: ${room.name}`);
  lines.push(`Features: ${features.join(', ')}`);
  if (hasEnemy) lines.push(`Enemies: ${pickEnemy(theme)} (x${1 + Math.floor(Math.random() * 3)})`);
  if (hasTrap) lines.push(`Trap: hidden (DC ${10 + Math.floor(Math.random() * 6)})`);
  if (hasPuzzle) lines.push(`Puzzle: present`);
  if (Math.random() < 0.4) lines.push(`Loot: ${pickLoot(theme)}`);
  return lines.join('\n');
}

// Generate a full themed dungeon summary for the DM.
export function generateThemedDungeonSummary(theme: DungeonTheme, roomCount: number): string {
  const config = DUNGEON_THEMES[theme];
  const lines: string[] = [];
  lines.push(`=== ${config.name} ===`);
  lines.push(config.description);
  lines.push(`Ambient: ${config.ambientDescription}`);
  lines.push(`Corridors: ${config.corridorStyle}`);
  lines.push('');
  for (let i = 0; i < roomCount; i++) {
    lines.push(describeRoom(theme, i));
    lines.push('');
  }
  return lines.join('\n');
}
