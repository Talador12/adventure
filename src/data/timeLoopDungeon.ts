// Time loop dungeon — rooms that reset on party death with cumulative knowledge carried forward.

export type LoopMechanic = 'full_reset' | 'partial_memory' | 'progressive_decay' | 'enemy_adaptation';

export interface TimeLoopRoom { id: number; name: string; challenge: string; solutionHint: string; deathTrap: string; loopClue: string; }

export interface TimeLoopDungeon {
  name: string;
  loopMechanic: LoopMechanic;
  description: string;
  rooms: TimeLoopRoom[];
  loopTrigger: string;
  escapCondition: string;
  maxLoops: number;
  consequenceOfMaxLoops: string;
  knowledgeRetained: string;
  lore: string;
}

const DUNGEONS: TimeLoopDungeon[] = [
  { name: 'The Hourglass Vault', loopMechanic: 'full_reset', description: 'Every time you die, you wake up at the entrance. Everything resets. Except your memories.', rooms: [
    { id: 1, name: 'The Entry Hall', challenge: 'A riddle on the door. Wrong answer = poison gas.', solutionHint: 'The answer is written backward on the CEILING of room 3.', deathTrap: 'Poison gas fills the room in 3 rounds (CON DC 14 or 4d6 poison).', loopClue: 'A scratch mark on the wall — YOU made it. Last loop. You don\'t remember.' },
    { id: 2, name: 'The Mirror Room', challenge: '4 mirrors. One shows the true path. The others show traps.', solutionHint: 'The true mirror has a crack that gets longer each loop.', deathTrap: 'Wrong mirror teleports you into a 50ft fall (5d6 bludgeoning).', loopClue: 'Your reflection mouths words. It\'s trying to warn you about room 4.' },
    { id: 3, name: 'The Puzzle Floor', challenge: 'Tiles must be stepped on in the correct order. Each step triggers a different effect.', solutionHint: 'The order is: Sun, Moon, Star, Storm (same as the mural in room 1, if you look closely).', deathTrap: 'Wrong tile: lightning bolt, 6d6 lightning (DEX DC 15 half).', loopClue: 'One tile is worn down from repeated stepping. You\'ve been here before.' },
    { id: 4, name: 'The Guardian', challenge: 'A construct guardian. Immune to the thing you used last time (it adapts each loop).', solutionHint: 'It has a keyhole in its chest. The key is in the FIRST room\'s riddle answer.', deathTrap: 'The guardian deals 8d6 damage per round and cannot be reasoned with.', loopClue: 'The construct says "again" when it sees you. It remembers too.' },
  ], loopTrigger: 'Any party member dies. The entire party resets to the entrance.', escapCondition: 'Solve all 4 rooms without anyone dying. Or find the hidden 5th room that breaks the loop.', maxLoops: 10, consequenceOfMaxLoops: 'The dungeon collapses permanently. Everything inside is lost. Including you if you\'re still in there.', knowledgeRetained: 'All memories. Notes. Maps. Even damage to personal items carries over (clothes get bloodier each loop).', lore: 'Built by a chronomancer who wanted to create the perfect test. They\'re still inside, on loop 4,327.' },
  { name: 'The Recurring Nightmare', loopMechanic: 'enemy_adaptation', description: 'The dungeon learns from your strategies. Each loop, the enemies counter your previous approach.', rooms: [
    { id: 1, name: 'The Ambush Corridor', challenge: 'Goblins attack from hidden positions.', solutionHint: 'They\'re in different positions each loop. But they always avoid the NW corner (structural weakness).', deathTrap: 'Overwhelmed by numbers if you don\'t control the chokepoint.', loopClue: 'The goblins have notes about YOU. Written in your handwriting from a future loop.' },
    { id: 2, name: 'The Flooded Chamber', challenge: 'Rising water + locked door. Key is underwater. Something lives in the water.', solutionHint: 'The creature fears fire. But after loop 2, it learns to stay deep until the fire goes out.', deathTrap: 'Drowning (4 minutes of air). The creature grapples swimmers.', loopClue: 'Previous burn marks on the walls. Someone tried fire before.' },
    { id: 3, name: 'The Final Door', challenge: 'A door that asks: "What did you learn?" Must answer truthfully with something from THIS dungeon.', solutionHint: 'The more loops you\'ve done, the more answers you have. The door accepts any genuine lesson.', deathTrap: 'Lying triggers Disintegrate (10d6+40 force damage).', loopClue: 'The door has MANY scorch marks. Many people lied.' },
  ], loopTrigger: 'Total party wipe. Individual deaths don\'t trigger — only when everyone is down.', escapCondition: 'Answer the Final Door truthfully. The answer must reference something learned DURING the loops.', maxLoops: 7, consequenceOfMaxLoops: 'The dungeon becomes sentient and escapes into the world. A living, learning, adapting dungeon on the loose.', knowledgeRetained: 'Full knowledge retained. But the dungeon also retains knowledge of your tactics.', lore: 'Originally a training ground for an elite adventuring company. The enchantment outlived them by centuries.' },
];

export function getRandomTimeLoop(): TimeLoopDungeon {
  return DUNGEONS[Math.floor(Math.random() * DUNGEONS.length)];
}

export function getTimeLoopByMechanic(mechanic: LoopMechanic): TimeLoopDungeon[] {
  return DUNGEONS.filter((d) => d.loopMechanic === mechanic);
}

export function getRoomCount(dungeon: TimeLoopDungeon): number {
  return dungeon.rooms.length;
}

export function getAllLoopMechanics(): LoopMechanic[] {
  return ['full_reset', 'partial_memory', 'progressive_decay', 'enemy_adaptation'];
}

export function formatTimeLoop(dungeon: TimeLoopDungeon): string {
  const lines = [`🔁 **${dungeon.name}** *(${dungeon.loopMechanic.replace(/_/g, ' ')})*`];
  lines.push(`  *${dungeon.description}*`);
  lines.push(`  Trigger: ${dungeon.loopTrigger} | Max loops: ${dungeon.maxLoops}`);
  lines.push(`  Knowledge: ${dungeon.knowledgeRetained}`);
  dungeon.rooms.forEach((r) => lines.push(`  Room ${r.id}: **${r.name}** — ${r.challenge}`));
  lines.push(`  🔓 Escape: ${dungeon.escapCondition}`);
  lines.push(`  💀 If max loops: ${dungeon.consequenceOfMaxLoops}`);
  return lines.join('\n');
}

export { DUNGEONS as TIME_LOOP_DUNGEONS };
