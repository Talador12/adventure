// Random dungeon room dressing — furniture, traps, ambiance, and loot per room archetype.

export type RoomArchetype = 'throne_room' | 'prison' | 'laboratory' | 'barracks' | 'temple' | 'library' | 'treasury' | 'crypt' | 'kitchen' | 'armory';

export interface RoomDressing {
  archetype: RoomArchetype;
  furniture: string[];
  ambiance: string[];
  smallDetails: string[];
  lootOptions: { item: string; value: number; findDC: number }[];
  possibleTrap: { name: string; dc: number; damage: string } | null;
}

const ROOMS: RoomDressing[] = [
  { archetype: 'throne_room', furniture: ['A cracked stone throne on a raised dais', 'Tattered banners of a forgotten house', 'An iron chandelier, half-fallen', 'A moth-eaten carpet running to the door'], ambiance: ['Echo of dripping water', 'Cold draft from behind the throne', 'A faint smell of old incense'], smallDetails: ['Scratch marks on the throne\'s armrest — fingernails', 'A single gold coin wedged between floor stones', 'The carpet has a darker patch — old blood'], lootOptions: [{ item: 'Gem-studded crown (dented)', value: 75, findDC: 10 }, { item: 'Hidden compartment in throne (ring of protection)', value: 300, findDC: 16 }], possibleTrap: { name: 'Throne pressure plate', dc: 14, damage: '3d6 piercing (spear trap from walls)' } },
  { archetype: 'prison', furniture: ['Iron cages along the walls', 'A wooden rack (torture device)', 'Chains hanging from ceiling hooks', 'A guard\'s desk with a key ring'], ambiance: ['Constant dripping', 'Distant moaning (wind or... not)', 'The smell of rust and despair'], smallDetails: ['Tally marks scratched into every surface', 'A name carved deep: "REMEMBER ME"', 'One cage is bent open from the inside'], lootOptions: [{ item: 'Guard\'s key ring (3 keys)', value: 5, findDC: 8 }, { item: 'Prisoner\'s hidden shiv (+1 dagger)', value: 200, findDC: 15 }], possibleTrap: { name: 'Cage door spring trap', dc: 12, damage: '1d6 bludgeoning + locked inside' } },
  { archetype: 'laboratory', furniture: ['A long stone workbench with burn marks', 'Shelves of jars containing... things', 'A bubbling cauldron over cold embers', 'A chalkboard covered in equations'], ambiance: ['Chemical smell that makes eyes water', 'Occasional pop from a sealed jar', 'Everything has a faint green tinge'], smallDetails: ['A journal with the last entry mid-sentence', 'One jar contains a miniature storm', 'The cauldron liquid changes color when observed'], lootOptions: [{ item: 'Potion of Healing (2d4+2)', value: 50, findDC: 10 }, { item: 'Alchemist\'s supplies', value: 50, findDC: 8 }, { item: 'Spell scroll (random 2nd level)', value: 200, findDC: 14 }], possibleTrap: { name: 'Unstable reagent', dc: 13, damage: '2d6 acid splash (5ft radius)' } },
  { archetype: 'barracks', furniture: ['Rows of bunk beds (some overturned)', 'A weapons rack (mostly empty)', 'A communal dining table', 'Footlockers under each bed'], ambiance: ['Stale air and old sweat', 'A dice game frozen mid-throw on a table', 'Boots still lined up by one bed'], smallDetails: ['A letter from home, half-written, never sent', 'A carved wooden toy soldier under a pillow', 'The last entry in the duty roster is weeks old'], lootOptions: [{ item: 'Soldier\'s pay (15gp in a footlocker)', value: 15, findDC: 10 }, { item: 'A serviceable shortsword', value: 10, findDC: 8 }], possibleTrap: null },
  { archetype: 'temple', furniture: ['An altar of dark stone', 'Pews of petrified wood', 'A broken font of holy water', 'Devotional candles (some still burning)'], ambiance: ['An oppressive sense of being watched', 'Incense that hasn\'t burned in years but still lingers', 'Faint hymn that might be wind'], smallDetails: ['The altar has fresh bloodstains', 'One pew has a prayer book with a name: yours', 'The holy symbol on the wall is upside down'], lootOptions: [{ item: 'Vial of holy water', value: 25, findDC: 10 }, { item: 'Silver holy symbol', value: 50, findDC: 12 }, { item: 'Hidden cache behind altar (200gp + scroll)', value: 250, findDC: 16 }], possibleTrap: { name: 'Desecration ward', dc: 15, damage: '4d6 necrotic (touching the altar without prayer)' } },
  { archetype: 'library', furniture: ['Floor-to-ceiling bookshelves', 'A reading desk with magnifying glass', 'A rolling ladder on a brass rail', 'A globe of a world that doesn\'t exist'], ambiance: ['Absolute silence — unnaturally so', 'Dust motes frozen in shafts of light', 'The faint rustle of pages turning on their own'], smallDetails: ['One shelf has a gap — a book was taken recently', 'A bookmark made from a pressed flower', 'The globe shows a continent that sank 1000 years ago'], lootOptions: [{ item: 'Rare book on local history (50gp to a collector)', value: 50, findDC: 10 }, { item: 'Spell scroll (3rd level, hidden in a book)', value: 300, findDC: 15 }, { item: 'Map to a hidden location', value: 100, findDC: 14 }], possibleTrap: { name: 'Glyph of Warding on a book', dc: 16, damage: '5d8 thunder (opening the trapped book)' } },
  { archetype: 'treasury', furniture: ['An iron chest (locked)', 'Coin piles (mostly copper)', 'Display cases (glass cracked)', 'A weighing scale'], ambiance: ['Glint of metal in torchlight', 'The clink of settling coins', 'A feeling of greed creeping into your thoughts'], smallDetails: ['One coin pile has a perfect imprint of a body', 'The lock on the chest is trapped — obviously', 'A gemstone on the floor — bait?'], lootOptions: [{ item: 'Gold coins (150gp)', value: 150, findDC: 8 }, { item: 'Gemstones (3 × 50gp)', value: 150, findDC: 10 }, { item: 'Magic ring in a trapped display case', value: 500, findDC: 16 }], possibleTrap: { name: 'Chest poison needle', dc: 14, damage: '1d4 piercing + 3d6 poison (CON DC 14 half)' } },
  { archetype: 'crypt', furniture: ['Stone sarcophagi along walls', 'Memorial plaques in ancient script', 'Funerary urns on alcove shelves', 'An eternal flame (magical, dim)'], ambiance: ['Cold that seeps into your bones', 'Whispers at the edge of hearing', 'The flame flickers when you move'], smallDetails: ['One sarcophagus lid is slightly ajar', 'A fresh flower on one grave — who put it there?', 'The names on the plaques include someone you know'], lootOptions: [{ item: 'Ancient jewelry (100gp)', value: 100, findDC: 12 }, { item: 'Burial weapon (+1, requires attunement)', value: 300, findDC: 14 }], possibleTrap: { name: 'Sarcophagus curse', dc: 15, damage: 'WIS save DC 14 or haunted (disadvantage on rests for 3 days)' } },
];

export function getRoomDressing(archetype: RoomArchetype): RoomDressing | undefined {
  return ROOMS.find((r) => r.archetype === archetype);
}

export function getRandomRoomDressing(): RoomDressing {
  return ROOMS[Math.floor(Math.random() * ROOMS.length)];
}

export function getRoomsWithTraps(): RoomDressing[] {
  return ROOMS.filter((r) => r.possibleTrap !== null);
}

export function getAllArchetypes(): RoomArchetype[] {
  return ROOMS.map((r) => r.archetype);
}

export function getTotalLootValue(room: RoomDressing): number {
  return room.lootOptions.reduce((sum, l) => sum + l.value, 0);
}

export function formatRoomDressing(room: RoomDressing): string {
  const lines = [`🏰 **${room.archetype.replace(/_/g, ' ')}**`];
  lines.push('  **Furniture:**');
  room.furniture.forEach((f) => lines.push(`    🪑 ${f}`));
  lines.push('  **Ambiance:**');
  room.ambiance.forEach((a) => lines.push(`    🎭 ${a}`));
  lines.push('  **Details:**');
  room.smallDetails.forEach((d) => lines.push(`    🔍 ${d}`));
  lines.push('  **Loot:**');
  room.lootOptions.forEach((l) => lines.push(`    💰 ${l.item} (${l.value}gp, DC ${l.findDC})`));
  if (room.possibleTrap) lines.push(`  ⚠️ Trap: ${room.possibleTrap.name} (DC ${room.possibleTrap.dc}, ${room.possibleTrap.damage})`);
  return lines.join('\n');
}

export { ROOMS as DUNGEON_ROOMS };
