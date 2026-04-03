// Naval combat system — ship-to-ship battles with boarding actions and cannon fire.

export type ShipClass = 'rowboat' | 'sloop' | 'schooner' | 'galleon' | 'warship' | 'flagship';
export type ShipAction = 'fire_cannons' | 'ram' | 'board' | 'flee' | 'repair' | 'brace' | 'full_sail';

export interface Ship {
  name: string;
  shipClass: ShipClass;
  hp: number;
  maxHp: number;
  ac: number;
  speed: number; // knots
  cannons: number;
  cannonDamage: string; // dice per broadside
  crew: number;
  maxCrew: number;
  cargo: number; // tons
  specialAbility: string;
}

export interface NavalAction {
  action: ShipAction;
  name: string;
  description: string;
  requirement: string;
  effect: string;
}

const SHIP_TEMPLATES: Record<ShipClass, Omit<Ship, 'name'>> = {
  rowboat: { shipClass: 'rowboat', hp: 20, maxHp: 20, ac: 10, speed: 2, cannons: 0, cannonDamage: '0', crew: 2, maxCrew: 4, cargo: 0.5, specialAbility: 'Can navigate shallow water and rivers.' },
  sloop: { shipClass: 'sloop', hp: 60, maxHp: 60, ac: 13, speed: 8, cannons: 4, cannonDamage: '2d10', crew: 8, maxCrew: 15, cargo: 5, specialAbility: 'Fast and maneuverable. +2 to initiative in naval combat.' },
  schooner: { shipClass: 'schooner', hp: 100, maxHp: 100, ac: 14, speed: 7, cannons: 8, cannonDamage: '3d10', crew: 20, maxCrew: 30, cargo: 15, specialAbility: 'Can sail close to the wind. No speed penalty in adverse conditions.' },
  galleon: { shipClass: 'galleon', hp: 200, maxHp: 200, ac: 15, speed: 5, cannons: 20, cannonDamage: '5d10', crew: 60, maxCrew: 100, cargo: 50, specialAbility: 'Massive broadside. Can fire port and starboard in the same turn.' },
  warship: { shipClass: 'warship', hp: 300, maxHp: 300, ac: 17, speed: 6, cannons: 30, cannonDamage: '7d10', crew: 100, maxCrew: 150, cargo: 30, specialAbility: 'Reinforced hull. Damage threshold 10 (ignore damage below this).' },
  flagship: { shipClass: 'flagship', hp: 400, maxHp: 400, ac: 18, speed: 5, cannons: 40, cannonDamage: '10d10', crew: 150, maxCrew: 200, cargo: 40, specialAbility: 'Command aura. All allied ships within 500ft gain +1 to attack rolls.' },
};

const NAVAL_ACTIONS: NavalAction[] = [
  { action: 'fire_cannons', name: 'Fire Cannons', description: 'Unleash a broadside at the enemy vessel.', requirement: 'At least 1 cannon and crew to operate them (2 crew per cannon)', effect: 'Roll cannon damage. Target ship makes DEX save DC 12 for half.' },
  { action: 'ram', name: 'Ram', description: 'Drive your ship into the enemy hull.', requirement: 'Speed 4+ and within 60ft', effect: 'Both ships take 3d10 bludgeoning. Ramming ship takes half if reinforced hull.' },
  { action: 'board', name: 'Board', description: 'Grapple the enemy ship and send crew to fight.', requirement: 'Adjacent to enemy ship (within 10ft)', effect: 'Crew-vs-crew melee combat begins. Each side rolls d20+crew_count/10. Winner deals 2d6 to enemy crew count.' },
  { action: 'flee', name: 'Flee', description: 'Disengage and attempt to outrun the enemy.', requirement: 'Ship must have working sails/oars', effect: 'Opposed speed check. If your speed > enemy, escape after 3 successful rounds.' },
  { action: 'repair', name: 'Repair', description: 'Crew patches holes and bails water.', requirement: 'At least 4 crew not in combat', effect: 'Restore 2d10 HP to the ship. Cannot fire cannons this turn.' },
  { action: 'brace', name: 'Brace for Impact', description: 'Crew secures cargo and braces.', requirement: 'None', effect: 'Ship gains +2 AC until start of next turn. Crew takes half damage from impacts.' },
  { action: 'full_sail', name: 'Full Sail', description: 'Maximum speed to close distance or flee.', requirement: 'Working masts', effect: 'Speed doubled this turn. AC reduced by 2 (crew focused on sailing).' },
];

export function createShip(name: string, shipClass: ShipClass): Ship {
  return { name, ...SHIP_TEMPLATES[shipClass] };
}

export function damageShip(ship: Ship, damage: number): Ship {
  return { ...ship, hp: Math.max(0, ship.hp - damage) };
}

export function repairShip(ship: Ship, amount: number): Ship {
  return { ...ship, hp: Math.min(ship.maxHp, ship.hp + amount) };
}

export function isShipSunk(ship: Ship): boolean {
  return ship.hp <= 0;
}

export function getShipCondition(ship: Ship): string {
  const pct = ship.hp / ship.maxHp;
  if (pct >= 0.75) return 'Seaworthy';
  if (pct >= 0.5) return 'Damaged';
  if (pct >= 0.25) return 'Heavily Damaged';
  if (pct > 0) return 'Sinking';
  return 'Sunk';
}

export function canPerformAction(ship: Ship, action: ShipAction): boolean {
  if (isShipSunk(ship)) return false;
  if (action === 'fire_cannons') return ship.cannons > 0 && ship.crew >= 2;
  if (action === 'ram') return ship.speed >= 4;
  if (action === 'repair') return ship.crew >= 4;
  return true;
}

export function getNavalAction(action: ShipAction): NavalAction | undefined {
  return NAVAL_ACTIONS.find((a) => a.action === action);
}

export function getAllShipClasses(): ShipClass[] {
  return Object.keys(SHIP_TEMPLATES) as ShipClass[];
}

export function formatShip(ship: Ship): string {
  const condition = getShipCondition(ship);
  const icon = { Seaworthy: '⛵', Damaged: '🔧', 'Heavily Damaged': '🔥', Sinking: '💀', Sunk: '🌊' }[condition] || '⛵';
  const lines = [`${icon} **${ship.name}** *(${ship.shipClass})* — ${condition}`];
  lines.push(`  HP: ${ship.hp}/${ship.maxHp} | AC: ${ship.ac} | Speed: ${ship.speed} knots`);
  lines.push(`  Cannons: ${ship.cannons} (${ship.cannonDamage}) | Crew: ${ship.crew}/${ship.maxCrew}`);
  lines.push(`  ⚙️ ${ship.specialAbility}`);
  return lines.join('\n');
}

export { SHIP_TEMPLATES, NAVAL_ACTIONS };
