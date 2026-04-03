// Random dungeon hazard — environmental dangers inside dungeons.
export interface DungeonHazard { hazard: string; detection: string; effect: string; avoidance: string; }
const HAZARDS: DungeonHazard[] = [
  { hazard: 'Green slime on the ceiling.', detection: 'Perception DC 12 (passive works).', effect: 'Falls on creatures passing underneath. 1d10 acid + dissolves nonmagical armor in 1 round.', avoidance: 'Fire or cold damage destroys it. Or just don\'t walk under it.' },
  { hazard: 'Yellow mold on a chest.', detection: 'Nature DC 13.', effect: 'Disturbing it releases spores. CON DC 15 or 2d10 poison + poisoned for 1 hour.', avoidance: 'Fire destroys it safely. Sunlight kills it in 1 round.' },
  { hazard: 'Collapsing ceiling section.', detection: 'Perception DC 14 notices cracks. Investigation DC 12 confirms instability.', effect: 'DEX DC 15 or 2d10 bludgeoning + buried (STR DC 15 to dig out).', avoidance: 'Trigger it from a distance. Move quickly. Support the ceiling magically.' },
  { hazard: 'Brown mold — radiates cold.', detection: 'Nature DC 12. Also, you can see your breath nearby.', effect: '10ft radius: 3d10 cold damage. Fire makes it grow instead of killing it.', avoidance: 'Cold damage destroys it. DO NOT use fire.' },
  { hazard: 'Whirling blade trap in the hallway.', detection: 'Perception DC 15 spots the wall slots.', effect: 'Ranged attack +8, 3d10 slashing. Triggers when someone steps on the plate.', avoidance: 'Jump over the plate. Thieves\' tools DC 15 to disable.' },
  { hazard: 'Flooded room with electrified water.', detection: 'Perception DC 11 sees sparks. Nature/Arcana DC 13 identifies the danger.', effect: 'Entering the water: 3d8 lightning damage per round.', avoidance: 'Drain the water. Dispel the source. Fly over it.' },
];
export function getRandomDungeonHazard(): DungeonHazard { return HAZARDS[Math.floor(Math.random() * HAZARDS.length)]; }
export function formatDungeonHazard(h: DungeonHazard): string { return `⚠️ **Dungeon Hazard:**\n*${h.hazard}*\n🔍 Detection: ${h.detection}\n💥 Effect: ${h.effect}\n✅ Avoidance: ${h.avoidance}`; }
