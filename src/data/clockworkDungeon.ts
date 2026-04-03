// Clockwork dungeon generator — mechanized dungeons with gear-driven rooms and timed puzzles.

export type GearState = 'running' | 'jammed' | 'reversed' | 'overclocked';
export type RoomMechanism = 'rotating' | 'sliding' | 'rising' | 'compressing' | 'sorting';

export interface ClockworkRoom {
  id: number;
  name: string;
  mechanism: RoomMechanism;
  gearState: GearState;
  description: string;
  puzzle: string;
  solveDC: number;
  timerRounds: number;
  failureEffect: string;
  reward: string;
}

export interface ClockworkDungeon {
  name: string;
  creator: string;
  powerSource: string;
  rooms: ClockworkRoom[];
  masterGear: string;
  shutdownMethod: string;
  lore: string;
}

const DUNGEONS: ClockworkDungeon[] = [
  { name: 'The Ticking Tomb', creator: 'A gnomish inventor-lich who wanted to be buried in their masterwork.', powerSource: 'An everburning engine fueled by trapped fire elementals.', rooms: [
    { id: 1, name: 'The Sorting Floor', mechanism: 'sorting', gearState: 'running', description: 'The floor is a grid of tiles that shuffle positions every 6 seconds.', puzzle: 'Step on tiles in the correct sequence (matching the pattern on the wall mural).', solveDC: 13, timerRounds: 5, failureEffect: 'Tile drops into gear pit below (2d6 bludgeoning, STR DC 14 to climb out).', reward: 'Door to next room opens. Pattern reveals a clue for room 3.' },
    { id: 2, name: 'The Compressor', mechanism: 'compressing', gearState: 'running', description: 'Walls move inward 5ft per round. The ceiling descends. A lever is on the far wall.', puzzle: 'Reach the lever (60ft away) before the room crushes you. Or jam the gears.', solveDC: 14, timerRounds: 6, failureEffect: 'If walls close: 6d10 bludgeoning. Flatten.', reward: 'Hidden compartment revealed when walls retract: 200gp + gear key.' },
    { id: 3, name: 'The Rotating Chamber', mechanism: 'rotating', gearState: 'running', description: 'The room rotates 90° every round. Doors only align for 1 round per rotation.', puzzle: 'Time your movement to exit through the correct door (Investigation DC 14 to predict rotation).', solveDC: 14, timerRounds: 8, failureEffect: 'Wrong door leads to a trap room (4d6 damage of random type).', reward: 'Correct door leads to the vault. Rotating chamber has a gemstone in the axis hub (500gp).' },
    { id: 4, name: 'The Vault', mechanism: 'rising', gearState: 'jammed', description: 'The vault floor is a rising platform. The treasure is at the top. So is the guardian.', puzzle: 'Unjam the mechanism (Thieves\' Tools DC 16) to ride the platform up. Or climb (Athletics DC 15).', solveDC: 16, timerRounds: 0, failureEffect: 'The clockwork guardian activates (CR 5 construct).', reward: 'The inventor\'s masterwork: a +2 weapon that can transform between 3 weapon types as a bonus action.' },
  ], masterGear: 'A 10ft bronze gear in the central shaft. Destroying it (AC 18, HP 60) shuts down ALL mechanisms.', shutdownMethod: 'Speak the gnomish inventor\'s name backward while touching the master gear. Or just smash it.', lore: 'The gnome who built this wanted their tomb to be "interesting." It has killed 47 grave robbers. The gnome considers this a success.' },
  { name: 'The Clockwork Cathedral', creator: 'A devotee of Mechanus who wanted to bring order to chaos.', powerSource: 'A captured modron core — basically a modron powering everything against its will.', rooms: [
    { id: 1, name: 'The Pendulum Nave', mechanism: 'sliding', gearState: 'running', description: 'Massive pendulums swing across the hall in a precise pattern. The gaps are walkable — if timed.', puzzle: 'Navigate the pendulums (DEX DC 13 per pendulum, 4 pendulums). Pattern repeats every 18 seconds.', solveDC: 13, timerRounds: 10, failureEffect: 'Hit by pendulum: 3d8 bludgeoning + knocked prone + pushed into next pendulum\'s path.', reward: 'Safe passage to the choir loft above.' },
    { id: 2, name: 'The Organ of Gears', mechanism: 'sorting', gearState: 'overclocked', description: 'A massive pipe organ where the pipes are gears. Playing the right tune opens the way.', puzzle: 'Performance DC 15 to play the correct hymn (carved into the pew-gears in coded notation).', solveDC: 15, timerRounds: 3, failureEffect: 'Wrong note: sonic blast, 3d6 thunder to everyone in the room.', reward: 'The organ reveals a hidden staircase descending to the modron core.' },
    { id: 3, name: 'The Core Chamber', mechanism: 'rotating', gearState: 'running', description: 'A spherical room with the modron core at the center, encased in spinning protective rings.', puzzle: 'Time your approach through the rings (3 rings, DEX DC 14 each) to reach the core.', solveDC: 14, timerRounds: 0, failureEffect: 'Ring collision: 4d6 bludgeoning + ejected to room entrance.', reward: 'Free the modron (it\'s grateful and joins as a temporary ally). Or harvest the core (5,000gp but the modron dies).' },
  ], masterGear: 'The modron core itself. Removing it shuts everything down but kills the modron.', shutdownMethod: 'Convince the modron to shut itself down (Persuasion DC 18). Or find the override phrase in the organ hymn.', lore: 'Built to demonstrate that everything can be reduced to mechanisms. The irony: it required imprisoning a sentient being to function.' },
];

export function getRandomClockworkDungeon(): ClockworkDungeon {
  return DUNGEONS[Math.floor(Math.random() * DUNGEONS.length)];
}

export function getRoomCount(dungeon: ClockworkDungeon): number {
  return dungeon.rooms.length;
}

export function getJammedRooms(dungeon: ClockworkDungeon): ClockworkRoom[] {
  return dungeon.rooms.filter((r) => r.gearState === 'jammed');
}

export function getTimedRooms(dungeon: ClockworkDungeon): ClockworkRoom[] {
  return dungeon.rooms.filter((r) => r.timerRounds > 0);
}

export function formatClockworkDungeon(dungeon: ClockworkDungeon): string {
  const lines = [`⚙️ **${dungeon.name}**`];
  lines.push(`  Creator: ${dungeon.creator}`);
  lines.push(`  Power: ${dungeon.powerSource}`);
  dungeon.rooms.forEach((r) => {
    const state = { running: '🟢', jammed: '🔴', reversed: '🔄', overclocked: '⚡' }[r.gearState];
    lines.push(`  ${state} Room ${r.id}: **${r.name}** (${r.mechanism}, DC ${r.solveDC}${r.timerRounds > 0 ? `, ${r.timerRounds} rounds` : ''})`);
  });
  lines.push(`  🔧 Shutdown: ${dungeon.shutdownMethod}`);
  return lines.join('\n');
}

export { DUNGEONS as CLOCKWORK_DUNGEONS };
