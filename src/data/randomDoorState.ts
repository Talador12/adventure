// Random door state — the condition of the next door the party encounters.
export interface DoorState { state: string; material: string; difficulty: string; whatYouHear: string; }
const DOORS: DoorState[] = [
  { state: 'Locked and reinforced with iron bands.', material: 'Oak', difficulty: 'Thieves\' tools DC 15 or STR DC 18 to force.', whatYouHear: 'Silence.' },
  { state: 'Slightly ajar. Light flickers from within.', material: 'Pine', difficulty: 'No check — just push it open.', whatYouHear: 'Crackling fire. Someone is home.' },
  { state: 'Sealed with arcane runes. Glows faintly.', material: 'Stone', difficulty: 'Dispel Magic (DC 14) or find the key.', whatYouHear: 'A low hum of magical energy.' },
  { state: 'Broken off its hinges, lying on the floor.', material: 'Splintered wood', difficulty: 'Already open. Something broke through — from the inside.', whatYouHear: 'Distant scratching.' },
  { state: 'Barricaded from the other side.', material: 'Iron-banded oak', difficulty: 'STR DC 20 or find another way in.', whatYouHear: 'Hushed voices. Frightened people.' },
  { state: 'Normal. Completely, boringly normal.', material: 'Standard wood', difficulty: 'Just open it.', whatYouHear: 'Nothing unusual. Which is unusual for this dungeon.' },
];
export function getRandomDoorState(): DoorState { return DOORS[Math.floor(Math.random() * DOORS.length)]; }
export function formatDoorState(d: DoorState): string { return `🚪 **Door:**\n${d.state} (${d.material})\n🔑 ${d.difficulty}\n👂 You hear: *${d.whatYouHear}*`; }
