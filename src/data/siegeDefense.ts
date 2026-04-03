// Siege defense planner — fortification setup, resource allocation, and defender tactics.

export type DefensePosition = 'walls' | 'gate' | 'tower' | 'courtyard' | 'keep' | 'sally_port';
export type DefenseTactic = 'hold_the_line' | 'ranged_volley' | 'boiling_oil' | 'counter_charge' | 'retreat_and_seal' | 'magical_ward';

export interface DefenseResource {
  name: string;
  quantity: number;
  effect: string;
  depletes: boolean;
}

export interface DefenseSetup {
  position: DefensePosition;
  troops: number;
  tactic: DefenseTactic;
  resources: DefenseResource[];
  acBonus: number;
  description: string;
}

export interface SiegeDefensePlan {
  fortificationName: string;
  totalDefenders: number;
  positions: DefenseSetup[];
  reserves: number;
  weakPoint: string;
  moraleFactor: string;
  estimatedHoldTime: string;
}

const SAMPLE_PLANS: SiegeDefensePlan[] = [
  { fortificationName: 'Thornwall Keep', totalDefenders: 100, positions: [
    { position: 'walls', troops: 40, tactic: 'ranged_volley', resources: [{ name: 'Arrows', quantity: 2000, effect: '1d6 piercing per volley per 10 archers.', depletes: true }, { name: 'Rocks (thrown)', quantity: 500, effect: '2d6 bludgeoning to climbers.', depletes: true }], acBonus: 3, description: 'Main defensive line. Archers behind crenellations with good sightlines.' },
    { position: 'gate', troops: 20, tactic: 'hold_the_line', resources: [{ name: 'Barricades', quantity: 3, effect: 'Each absorbs 30 damage before breaking.', depletes: true }, { name: 'Caltrops', quantity: 100, effect: 'DEX DC 12 or 1d4 piercing + halved speed.', depletes: true }], acBonus: 2, description: 'The weakest point. Heavy infantry with shields form a wall behind the gate.' },
    { position: 'tower', troops: 10, tactic: 'ranged_volley', resources: [{ name: 'Ballista', quantity: 2, effect: '3d10 piercing, 120ft range.', depletes: false }], acBonus: 5, description: 'Corner towers with ballistas. Excellent range, hard to assault.' },
    { position: 'courtyard', troops: 15, tactic: 'counter_charge', resources: [{ name: 'Healing Potions', quantity: 20, effect: '2d4+2 HP each.', depletes: true }], acBonus: 0, description: 'Mobile reserve ready to reinforce any breach.' },
  ], reserves: 15, weakPoint: 'The south gate — old hinges, thin wood. Battering ram will breach in 3 rounds.', moraleFactor: 'Defenders are local militia. High morale if the lord fights with them. Collapses if he flees.', estimatedHoldTime: '3 days against a standard army. 1 day against siege engines.' },
  { fortificationName: 'The River Crossing Fort', totalDefenders: 50, positions: [
    { position: 'walls', troops: 20, tactic: 'ranged_volley', resources: [{ name: 'Arrows', quantity: 800, effect: '1d6 per volley per 10 archers.', depletes: true }], acBonus: 2, description: 'Low stone walls overlooking the river crossing. Attackers must wade through water.' },
    { position: 'gate', troops: 10, tactic: 'boiling_oil', resources: [{ name: 'Boiling Oil', quantity: 5, effect: '3d6 fire in 10ft area. DEX DC 13 half.', depletes: true }], acBonus: 3, description: 'Single gate with murder holes above. Boiling oil ready.' },
    { position: 'tower', troops: 5, tactic: 'magical_ward', resources: [{ name: 'Glyph of Warding', quantity: 3, effect: '5d8 damage per glyph (various types).', depletes: true }], acBonus: 4, description: 'A wizard stationed here with prepared defensive spells.' },
  ], reserves: 15, weakPoint: 'The river itself — if attackers dam it upstream, the moat dries up and the walls are exposed.', moraleFactor: 'Professional soldiers. Steady morale. Will fight to the last if well-led.', estimatedHoldTime: '5 days with the river intact. 2 days without.' },
];

export function getRandomDefensePlan(): SiegeDefensePlan {
  return SAMPLE_PLANS[Math.floor(Math.random() * SAMPLE_PLANS.length)];
}

export function getTotalTroops(plan: SiegeDefensePlan): number {
  return plan.positions.reduce((sum, p) => sum + p.troops, 0) + plan.reserves;
}

export function getPositionByType(plan: SiegeDefensePlan, position: DefensePosition): DefenseSetup | undefined {
  return plan.positions.find((p) => p.position === position);
}

export function getDepletableResources(plan: SiegeDefensePlan): DefenseResource[] {
  return plan.positions.flatMap((p) => p.resources.filter((r) => r.depletes));
}

export function getAllPositions(): DefensePosition[] {
  return ['walls', 'gate', 'tower', 'courtyard', 'keep', 'sally_port'];
}

export function getAllTactics(): DefenseTactic[] {
  return ['hold_the_line', 'ranged_volley', 'boiling_oil', 'counter_charge', 'retreat_and_seal', 'magical_ward'];
}

export function formatDefensePlan(plan: SiegeDefensePlan): string {
  const lines = [`🏰 **${plan.fortificationName}** (${plan.totalDefenders} defenders, ${plan.reserves} reserves)`];
  lines.push(`  Hold time: ${plan.estimatedHoldTime}`);
  lines.push(`  ⚡ Weak point: ${plan.weakPoint}`);
  plan.positions.forEach((p) => {
    lines.push(`  **${p.position}** (${p.troops} troops, ${p.tactic.replace(/_/g, ' ')}) +${p.acBonus} AC`);
    p.resources.forEach((r) => lines.push(`    📦 ${r.name} × ${r.quantity}: ${r.effect}`));
  });
  lines.push(`  Morale: ${plan.moraleFactor}`);
  return lines.join('\n');
}

export { SAMPLE_PLANS as SIEGE_DEFENSE_PLANS };
