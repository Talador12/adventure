// Ancient ruin floor plan generator — procedural dungeon layouts with room connections.

export type RuinType = 'temple' | 'fortress' | 'crypt' | 'wizard_tower' | 'underground_city';
export type RoomConnection = 'door' | 'corridor' | 'stairs' | 'secret_passage' | 'collapsed' | 'trapped';

export interface RuinRoom {
  id: number;
  name: string;
  description: string;
  contents: string;
  connections: { toRoom: number; type: RoomConnection }[];
  trap: string | null;
  encounter: string | null;
  loot: string | null;
}

export interface AncientRuin {
  name: string;
  type: RuinType;
  age: string;
  rooms: RuinRoom[];
  bossRoom: number; // room id of the final boss
  entrances: number[]; // room ids that serve as entry points
  lore: string;
}

const RUINS: AncientRuin[] = [
  { name: 'The Sunken Sanctum', type: 'temple', age: '2,000 years', rooms: [
    { id: 1, name: 'Entry Hall', description: 'Cracked marble floors. Fallen pillars. A mosaic depicting a forgotten god.', contents: 'Rubble, faded murals, a dried fountain.', connections: [{ toRoom: 2, type: 'corridor' }, { toRoom: 3, type: 'door' }], trap: null, encounter: '1d4 giant rats nesting in the rubble.', loot: null },
    { id: 2, name: 'Prayer Chamber', description: 'Rows of stone pews face a shattered altar. Candles that should have burned out centuries ago still flicker.', contents: 'Pews, altar, eternal candles.', connections: [{ toRoom: 1, type: 'corridor' }, { toRoom: 4, type: 'stairs' }], trap: 'Glyph on the altar (WIS DC 14 or Frightened 1 minute).', encounter: null, loot: 'Holy symbol under the altar (50gp, glows near undead).' },
    { id: 3, name: 'Vestry', description: 'Priest robes hang in rows, perfectly preserved. Something moved.', contents: 'Robes, a desk with a journal, a locked chest (DC 14).', connections: [{ toRoom: 1, type: 'door' }, { toRoom: 5, type: 'secret_passage' }], trap: null, encounter: 'An animated suit of ceremonial armor (CR 1).', loot: 'Chest: 100gp + a Scroll of Bless.' },
    { id: 4, name: 'Catacombs', description: 'Niches in the walls hold ancient remains. Some are empty. Some should be.', contents: 'Skeletal remains, funerary urns, dust.', connections: [{ toRoom: 2, type: 'stairs' }, { toRoom: 5, type: 'collapsed' }], trap: 'Pressure plate releases poison gas (CON DC 13 or 2d6 poison).', encounter: '2d4 skeletons rise if disturbed.', loot: 'Ancient jewelry on the corpses (150gp total).' },
    { id: 5, name: 'Inner Sanctum', description: 'The heart of the temple. A massive statue of the forgotten god, eyes glowing faintly.', contents: 'Colossal statue, offering bowl, sealed vault door.', connections: [{ toRoom: 3, type: 'secret_passage' }, { toRoom: 4, type: 'collapsed' }], trap: 'The statue animates if the offering bowl is empty (CR 5 animated statue).', encounter: 'The guardian — a spectral priest defending the vault.', loot: 'Vault contains: +1 mace, 300gp, a divine scroll (5th level).' },
  ], bossRoom: 5, entrances: [1], lore: 'Dedicated to a god erased from history. The temple sank during a divine war. The god\'s name is carved into the walls — but no one can read it.' },
  { name: 'Ironhold Fortress', type: 'fortress', age: '500 years', rooms: [
    { id: 1, name: 'Gatehouse', description: 'The portcullis is jammed halfway. Arrow slits watch the approach.', contents: 'Rusted chains, a guard post, old bones.', connections: [{ toRoom: 2, type: 'corridor' }, { toRoom: 3, type: 'door' }], trap: 'Tripwire crossbow trap (DEX DC 12, 1d8 piercing).', encounter: null, loot: null },
    { id: 2, name: 'Courtyard', description: 'Open to the sky. A well in the center. Training dummies rotted to stumps.', contents: 'Well (50ft deep, water at bottom), weapon rack (empty).', connections: [{ toRoom: 1, type: 'corridor' }, { toRoom: 4, type: 'door' }, { toRoom: 5, type: 'stairs' }], trap: null, encounter: 'A wyvern nests in the upper walls (if outdoors). Patrols the courtyard.', loot: 'Down the well: a waterlogged chest with 200gp.' },
    { id: 3, name: 'Barracks', description: 'Bunk beds for 40 soldiers. Some still have personal effects.', contents: 'Beds, footlockers, a dice set mid-game.', connections: [{ toRoom: 1, type: 'door' }], trap: null, encounter: null, loot: 'Soldier\'s pay scattered in footlockers: 30gp total.' },
    { id: 4, name: 'Armory', description: 'Weapons and armor, mostly rusted. A few pieces survived.', contents: 'Weapon racks, armor stands, a forge (cold).', connections: [{ toRoom: 2, type: 'door' }, { toRoom: 5, type: 'trapped' }], trap: 'The door to the commander\'s quarters is trapped (fire rune, DEX DC 14, 3d6 fire).', encounter: null, loot: 'Masterwork longsword (+1 non-magical), 3 intact shields.' },
    { id: 5, name: 'Commander\'s Quarters', description: 'A fortified room with maps on the walls. The commander died at their desk.', contents: 'Desk, war maps, skeleton in armor, locked safe (DC 16).', connections: [{ toRoom: 2, type: 'stairs' }, { toRoom: 4, type: 'trapped' }], trap: null, encounter: 'The commander\'s ghost. Friendly if respectful. Attacks if robbed.', loot: 'Safe: 500gp, a battle plan revealing a hidden tunnel, a signet ring (quest item).' },
  ], bossRoom: 5, entrances: [1], lore: 'Built to guard a mountain pass. Fell when the garrison was recalled for a war they never won. The commander refused to leave.' },
];

export function getRandomRuin(): AncientRuin {
  return RUINS[Math.floor(Math.random() * RUINS.length)];
}

export function getRuinByType(type: RuinType): AncientRuin | undefined {
  return RUINS.find((r) => r.type === type);
}

export function getRoomById(ruin: AncientRuin, roomId: number): RuinRoom | undefined {
  return ruin.rooms.find((r) => r.id === roomId);
}

export function getRoomsWithEncounters(ruin: AncientRuin): RuinRoom[] {
  return ruin.rooms.filter((r) => r.encounter !== null);
}

export function getRoomsWithLoot(ruin: AncientRuin): RuinRoom[] {
  return ruin.rooms.filter((r) => r.loot !== null);
}

export function getAllRuinTypes(): RuinType[] {
  return [...new Set(RUINS.map((r) => r.type))];
}

export function formatRuin(ruin: AncientRuin): string {
  const icon = { temple: '⛪', fortress: '🏰', crypt: '💀', wizard_tower: '🔮', underground_city: '🕳️' }[ruin.type];
  const lines = [`${icon} **${ruin.name}** *(${ruin.type.replace(/_/g, ' ')}, ${ruin.age} old)*`];
  lines.push(`  *${ruin.lore}*`);
  lines.push(`  Rooms: ${ruin.rooms.length} | Entrances: ${ruin.entrances.length} | Boss: Room ${ruin.bossRoom}`);
  ruin.rooms.forEach((r) => {
    const markers = [r.trap ? '⚠️' : '', r.encounter ? '⚔️' : '', r.loot ? '💰' : ''].filter(Boolean).join('');
    lines.push(`  ${r.id}. ${r.name} ${markers} — ${r.connections.map((c) => `→${c.toRoom}(${c.type})`).join(' ')}`);
  });
  return lines.join('\n');
}

export { RUINS as ANCIENT_RUINS };
