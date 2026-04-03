// Random caravan ambush generator — attack scenarios on traveling groups with terrain and tactics.

export type AmbushTerrain = 'forest_road' | 'mountain_pass' | 'river_crossing' | 'open_plains' | 'canyon' | 'bridge';
export type AmbushTactic = 'roadblock' | 'pincer' | 'sniper' | 'avalanche' | 'disguise' | 'stampede';

export interface AmbushForce {
  name: string;
  count: string;
  cr: number;
  tactic: AmbushTactic;
  description: string;
}

export interface CaravanAmbush {
  name: string;
  terrain: AmbushTerrain;
  force: AmbushForce;
  setupDescription: string;
  warningSignsDC: number;
  surpriseRoundDC: number;
  escapeOption: string;
  negotiationPossible: boolean;
  negotiationDC: number;
  loot: string;
  twist: string;
}

const AMBUSHES: CaravanAmbush[] = [
  { name: 'The Fallen Tree', terrain: 'forest_road', force: { name: 'Forest Bandits', count: '2d6', cr: 1, tactic: 'roadblock', description: 'A tree blocks the road. Archers in the canopy. Classic.' }, setupDescription: 'A massive oak lies across the road. It was cut recently — the sawdust is fresh. The forest is too quiet.', warningSignsDC: 12, surpriseRoundDC: 14, escapeOption: 'Reverse the wagon (Animal Handling DC 13, 2 rounds to turn).', negotiationPossible: true, negotiationDC: 13, loot: 'Bandit stash hidden nearby: 50gp + stolen goods worth 100gp.', twist: 'The bandits are displaced farmers. They were taxed off their land.' },
  { name: 'The Narrow Pass', terrain: 'mountain_pass', force: { name: 'Orc Warband', count: '1d6+2', cr: 2, tactic: 'pincer', description: 'Orcs above and below. Rocks fall. Everyone dies (maybe).' }, setupDescription: 'The pass narrows to 10ft. Boulders balanced on ledges above. War horns echo from both ends.', warningSignsDC: 14, surpriseRoundDC: 15, escapeOption: 'Climb the cliff face (Athletics DC 15) and escape over the ridge.', negotiationPossible: false, negotiationDC: 0, loot: 'Orc chief carries a +1 handaxe and a treasure map.', twist: 'The orcs are fleeing something worse in the mountains. This is desperation, not malice.' },
  { name: 'The Shallow Crossing', terrain: 'river_crossing', force: { name: 'Merfolk Raiders', count: '1d4+2', cr: 2, tactic: 'pincer', description: 'They strike when the wagon is mid-river. Can\'t fight and swim.' }, setupDescription: 'The river ford seems shallow. Halfway across, shapes rise from the water on both sides.', warningSignsDC: 15, surpriseRoundDC: 16, escapeOption: 'Push through to the far bank (Athletics DC 14 to move wagon through current).', negotiationPossible: true, negotiationDC: 15, loot: 'Merfolk coral jewelry (200gp). A pearl of power if their leader is defeated.', twist: 'The merfolk are protecting spawning grounds upstream from caravan pollution.' },
  { name: 'The Fake Patrol', terrain: 'open_plains', force: { name: 'Deserter Soldiers', count: '2d4', cr: 1, tactic: 'disguise', description: 'They wear guard uniforms and demand an "inspection fee."' }, setupDescription: 'A checkpoint appears where none should be. Soldiers in official-looking (but slightly wrong) uniforms wave you down.', warningSignsDC: 13, surpriseRoundDC: 12, escapeOption: 'Outrun them (horses required, chase rules apply).', negotiationPossible: true, negotiationDC: 11, loot: 'Stolen uniforms (useful for disguise). 30gp in collected "fees."', twist: 'One of the deserters is a wanted war criminal with a 500gp bounty.' },
  { name: 'The Rock Slide', terrain: 'canyon', force: { name: 'Hobgoblin Squad', count: '1d6+2', cr: 2, tactic: 'avalanche', description: 'Trigger a rockslide, then pick off survivors. Military precision.' }, setupDescription: 'A rumble from above. Rocks cascade down the canyon wall. The road behind you is cut off.', warningSignsDC: 13, surpriseRoundDC: 15, escapeOption: 'Dig through rubble (Athletics DC 14, 4 rounds) or climb canyon wall (Athletics DC 16).', negotiationPossible: false, negotiationDC: 0, loot: 'Hobgoblin officer carries orders naming their employer — a local lord.', twist: 'This is a contracted hit. Someone paid the hobgoblins to specifically target YOUR caravan.' },
];

export function getRandomAmbush(): CaravanAmbush {
  return AMBUSHES[Math.floor(Math.random() * AMBUSHES.length)];
}

export function getAmbushesByTerrain(terrain: AmbushTerrain): CaravanAmbush[] {
  return AMBUSHES.filter((a) => a.terrain === terrain);
}

export function getNegotiableAmbushes(): CaravanAmbush[] {
  return AMBUSHES.filter((a) => a.negotiationPossible);
}

export function getAllTerrainTypes(): AmbushTerrain[] {
  return [...new Set(AMBUSHES.map((a) => a.terrain))];
}

export function formatAmbush(ambush: CaravanAmbush): string {
  const icon = { forest_road: '🌲', mountain_pass: '🏔️', river_crossing: '🌊', open_plains: '🏜️', canyon: '🕳️', bridge: '🌉' }[ambush.terrain];
  const lines = [`${icon} **${ambush.name}** *(${ambush.terrain.replace(/_/g, ' ')})*`];
  lines.push(`  *${ambush.setupDescription}*`);
  lines.push(`  ⚔️ ${ambush.force.name} (${ambush.force.count} × CR ${ambush.force.cr}) — ${ambush.force.tactic}`);
  lines.push(`  Warning DC: ${ambush.warningSignsDC} | Surprise DC: ${ambush.surpriseRoundDC}`);
  if (ambush.negotiationPossible) lines.push(`  🤝 Negotiation possible (DC ${ambush.negotiationDC})`);
  lines.push(`  🏃 Escape: ${ambush.escapeOption}`);
  lines.push(`  🔄 Twist: ${ambush.twist}`);
  return lines.join('\n');
}

export { AMBUSHES as CARAVAN_AMBUSHES };
