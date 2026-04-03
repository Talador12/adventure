// Siege warfare rules — siege engines, wall HP, battering rams, boiling oil.

export interface SiegeEngine {
  name: string;
  type: 'ranged' | 'melee' | 'defensive';
  hp: number;
  ac: number;
  damage: string; // dice notation
  range: string; // in feet or 'melee'
  crew: number;
  cost: number; // in gold
  specialRule: string;
}

export interface Fortification {
  name: string;
  hp: number;
  ac: number;
  damageThreshold: number; // damage below this is ignored
  description: string;
}

const SIEGE_ENGINES: SiegeEngine[] = [
  { name: 'Battering Ram', type: 'melee', hp: 50, ac: 15, damage: '4d10', range: 'melee', crew: 4, cost: 500, specialRule: 'Double damage against doors and gates.' },
  { name: 'Ballista', type: 'ranged', hp: 40, ac: 15, damage: '3d10', range: '120/480 ft', crew: 3, cost: 800, specialRule: 'Can target flying creatures. Piercing damage.' },
  { name: 'Catapult', type: 'ranged', hp: 60, ac: 10, damage: '5d10', range: '300/600 ft (min 150)', crew: 5, cost: 1200, specialRule: 'Bludgeoning. 10ft radius splash on impact.' },
  { name: 'Trebuchet', type: 'ranged', hp: 80, ac: 10, damage: '8d10', range: '600/1200 ft (min 300)', crew: 8, cost: 3000, specialRule: 'Bludgeoning. Can lob diseased corpses or burning pitch.' },
  { name: 'Siege Tower', type: 'melee', hp: 100, ac: 12, damage: '0', range: 'melee', crew: 10, cost: 2000, specialRule: 'Provides full cover while approaching walls. Troops deploy on wall top.' },
  { name: 'Boiling Oil Cauldron', type: 'defensive', hp: 30, ac: 12, damage: '3d6', range: '10 ft (below)', crew: 2, cost: 200, specialRule: 'Fire damage. Targets all creatures in 10ft square below. DEX DC 13 for half.' },
  { name: 'Murder Holes', type: 'defensive', hp: 0, ac: 0, damage: '2d6', range: '10 ft (below)', crew: 1, cost: 0, specialRule: 'Built into gatehouse. Defenders have three-quarters cover. Piercing damage from above.' },
  { name: 'Cannon', type: 'ranged', hp: 50, ac: 15, damage: '6d10', range: '200/800 ft', crew: 4, cost: 5000, specialRule: 'Thunder damage. Creatures within 10ft of target make CON DC 14 or deafened 1 round.' },
];

const FORTIFICATIONS: Fortification[] = [
  { name: 'Wooden Palisade', hp: 50, ac: 13, damageThreshold: 5, description: 'Simple wooden wall. Burns easily — fire damage ignores threshold.' },
  { name: 'Stone Wall (10 ft)', hp: 120, ac: 17, damageThreshold: 10, description: 'Standard castle wall section. Resistant to most infantry weapons.' },
  { name: 'Reinforced Gate', hp: 80, ac: 16, damageThreshold: 8, description: 'Iron-banded wooden gate. Vulnerable to battering rams (half threshold).' },
  { name: 'Tower', hp: 200, ac: 17, damageThreshold: 15, description: 'Fortified tower. Defenders inside have full cover from ranged attacks.' },
  { name: 'Drawbridge', hp: 60, ac: 15, damageThreshold: 8, description: 'When raised, blocks passage and adds +5 AC to gate behind it.' },
  { name: 'Arrow Slit', hp: 0, ac: 0, damageThreshold: 0, description: 'Narrow opening. Defenders have three-quarters cover (+5 AC). Attackers have disadvantage to fire through.' },
];

export function getSiegeEngine(name: string): SiegeEngine | undefined {
  return SIEGE_ENGINES.find((e) => e.name.toLowerCase() === name.toLowerCase());
}

export function getSiegeEnginesByType(type: SiegeEngine['type']): SiegeEngine[] {
  return SIEGE_ENGINES.filter((e) => e.type === type);
}

export function getFortification(name: string): Fortification | undefined {
  return FORTIFICATIONS.find((f) => f.name.toLowerCase() === name.toLowerCase());
}

export function canDamage(fortification: Fortification, damage: number): boolean {
  return damage >= fortification.damageThreshold;
}

export function getEffectiveDamage(fortification: Fortification, damage: number): number {
  return damage >= fortification.damageThreshold ? damage : 0;
}

export function formatSiegeEngine(e: SiegeEngine): string {
  const icon = { ranged: '🏹', melee: '🔨', defensive: '🛡️' }[e.type];
  return `${icon} **${e.name}** (${e.type}) — HP ${e.hp} AC ${e.ac}\n  Damage: ${e.damage} | Range: ${e.range} | Crew: ${e.crew} | Cost: ${e.cost}gp\n  ⚙️ ${e.specialRule}`;
}

export function formatFortification(f: Fortification): string {
  return `🏰 **${f.name}** — HP ${f.hp} AC ${f.ac} Threshold ${f.damageThreshold}\n  ${f.description}`;
}

export { SIEGE_ENGINES, FORTIFICATIONS };
