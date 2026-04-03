// Random combat objective — make fights about more than just "kill everything."
export interface CombatObjective { objective: string; type: 'protect' | 'retrieve' | 'survive' | 'escape' | 'control' | 'prevent'; winCondition: string; failCondition: string; }
const OBJECTIVES: CombatObjective[] = [
  { objective: 'Protect the NPC in the center of the room.', type: 'protect', winCondition: 'NPC survives 5 rounds.', failCondition: 'NPC drops to 0 HP.' },
  { objective: 'Retrieve the artifact from the altar before the enemies do.', type: 'retrieve', winCondition: 'A party member holds the artifact and escapes.', failCondition: 'An enemy reaches the altar first.' },
  { objective: 'Survive until reinforcements arrive.', type: 'survive', winCondition: 'Party survives 8 rounds.', failCondition: 'Total party knockout.' },
  { objective: 'Escape through the exit on the far side of the map.', type: 'escape', winCondition: 'All living party members reach the exit.', failCondition: 'Anyone is left behind.' },
  { objective: 'Control the 3 magic crystals by standing adjacent to them.', type: 'control', winCondition: 'Party controls all 3 crystals simultaneously for 1 round.', failCondition: 'Enemies control all 3.' },
  { objective: 'Prevent the ritual from completing.', type: 'prevent', winCondition: 'Destroy 3 ritual components or kill the ritualist.', failCondition: 'The ritual completes after 6 rounds.' },
  { objective: 'Light the 4 beacons on the corners of the map.', type: 'control', winCondition: 'All 4 beacons lit simultaneously.', failCondition: 'Enemies extinguish them faster than you light them.' },
  { objective: 'Capture the enemy leader alive.', type: 'retrieve', winCondition: 'Leader reduced to 0 HP without killing blow (nonlethal).', failCondition: 'Leader killed or escapes.' },
];
export function getRandomObjective(): CombatObjective { return OBJECTIVES[Math.floor(Math.random() * OBJECTIVES.length)]; }
export function formatCombatObjective(o: CombatObjective): string { return `🎯 **Combat Objective** (${o.type}):\n${o.objective}\n✅ Win: ${o.winCondition}\n❌ Fail: ${o.failCondition}`; }
