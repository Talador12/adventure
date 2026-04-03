// Random dungeon door generator — what's behind door number...
export interface DungeonDoor { material: string; state: string; lock: string | null; trap: string | null; whatsBehind: string; }
const MATERIALS = ['Wooden (sturdy)', 'Iron-reinforced', 'Stone slab', 'Rotting wood', 'Crystal (translucent)', 'Bone (unsettling)', 'Portcullis (iron bars)'];
const STATES = ['Closed and still', 'Slightly ajar', 'Barricaded from the other side', 'Covered in strange runes', 'Warm to the touch', 'Cold — frost on the handle', 'Vibrating slightly'];
const LOCKS = ['Simple lock (DC 10)', 'Good lock (DC 15)', 'Arcane lock (DC 20 or Dispel Magic)', 'Puzzle lock — requires solving a riddle', null, null, null];
const TRAPS = ['Poison needle in handle (DC 13 CON, 2d6 poison)', 'Glyph of Warding (3d6 fire, DEX DC 14)', 'Alarm — loud bell sounds', null, null, null, null, null];
const BEHINDS = ['An empty room with signs of recent occupation.', 'A monster lair — roll for encounter!', 'A treasure cache with a guardian.', 'A collapsed passage — dead end.', 'A staircase going down into darkness.', 'A library of ancient books.', 'Another door.', 'A sleeping NPC.', 'A trap room that activates when you enter.', 'Nothing. Just a closet. Anticlimactic.'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function generateDungeonDoor(): DungeonDoor { return { material: pick(MATERIALS), state: pick(STATES), lock: pick(LOCKS), trap: pick(TRAPS), whatsBehind: pick(BEHINDS) }; }
export function formatDungeonDoor(d: DungeonDoor): string { const lines = [`🚪 **Dungeon Door:**`]; lines.push(`Material: ${d.material}`); lines.push(`State: ${d.state}`); if (d.lock) lines.push(`🔒 Lock: ${d.lock}`); if (d.trap) lines.push(`🪤 Trap: ${d.trap}`); lines.push(`📍 Behind it: ${d.whatsBehind}`); return lines.join('\n'); }
