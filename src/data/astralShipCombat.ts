// Astral ship combat expansion — spelljammer weapons, shields, and boarding actions.

export type ShipWeaponType = 'ballista' | 'mangonel' | 'arcane_cannon' | 'ram' | 'greek_fire' | 'gravity_net';
export type ShipShieldType = 'arcane_barrier' | 'deflection_field' | 'phase_shield' | 'void_cloak';

export interface AstralShipWeapon {
  name: string;
  type: ShipWeaponType;
  damage: string;
  range: string;
  crewRequired: number;
  specialEffect: string;
  cost: number;
}

export interface AstralShipShield {
  name: string;
  type: ShipShieldType;
  hpAbsorbed: number;
  duration: string;
  rechargeTime: string;
  specialProperty: string;
  cost: number;
}

export interface BoardingAction {
  name: string;
  description: string;
  requirement: string;
  mechanicalEffect: string;
  counterAction: string;
}

const WEAPONS: AstralShipWeapon[] = [
  { name: 'Astral Ballista', type: 'ballista', damage: '3d10 piercing', range: '120/480 ft', crewRequired: 3, specialEffect: 'Bolts trail silver light. +2d6 force against ethereal creatures.', cost: 1500 },
  { name: 'Void Mangonel', type: 'mangonel', damage: '5d10 bludgeoning', range: '200/800 ft (min 60)', crewRequired: 5, specialEffect: 'Can launch objects into target ship (boulder, burning pitch, or boarding pods).', cost: 3000 },
  { name: 'Arcane Cannon', type: 'arcane_cannon', damage: '4d10 force', range: '300/600 ft', crewRequired: 1, specialEffect: 'Requires a spellcaster to operate. Consumes a 3rd-level slot per shot. Never misses hull.', cost: 10000 },
  { name: 'Reinforced Ram', type: 'ram', damage: '6d10 bludgeoning (both ships)', range: 'Contact', crewRequired: 0, specialEffect: 'Ramming ship takes half damage if reinforced. Target must save or be knocked off course.', cost: 2000 },
  { name: 'Greek Fire Siphon', type: 'greek_fire', damage: '3d6 fire/round', range: '60 ft cone', crewRequired: 2, specialEffect: 'Burns on ship hull for 1d4 rounds. Cannot be extinguished by water in astral space.', cost: 5000 },
  { name: 'Gravity Net Launcher', type: 'gravity_net', damage: '0 (restraining)', range: '120 ft', crewRequired: 2, specialEffect: 'Creates a 30ft gravity field. Target ship\'s speed halved. STR DC 16 to break free.', cost: 4000 },
];

const SHIELDS: AstralShipShield[] = [
  { name: 'Arcane Barrier', type: 'arcane_barrier', hpAbsorbed: 50, duration: '10 rounds', rechargeTime: '1 hour', specialProperty: 'Visible shimmer. Blocks physical projectiles. Spells pass through.', cost: 5000 },
  { name: 'Deflection Field', type: 'deflection_field', hpAbsorbed: 30, duration: '5 rounds', rechargeTime: '30 minutes', specialProperty: 'Deflects projectiles at 50% chance. Deflected shots hit random nearby objects.', cost: 3000 },
  { name: 'Phase Shield', type: 'phase_shield', hpAbsorbed: 0, duration: '3 rounds', rechargeTime: '1 hour', specialProperty: 'Ship becomes partially ethereal. Physical attacks pass through. Vulnerable to force damage.', cost: 8000 },
  { name: 'Void Cloak', type: 'void_cloak', hpAbsorbed: 20, duration: 'Passive', rechargeTime: 'N/A', specialProperty: 'Absorbs 20 damage per hit (always active). Drains 1 HP from the helmsman per absorption.', cost: 6000 },
];

const BOARDING_ACTIONS: BoardingAction[] = [
  { name: 'Grapple and Board', description: 'Launch hooks, pull ships together, send crew across.', requirement: 'Ships within 60ft. Grapple check (crew size contest).', mechanicalEffect: 'Ships locked together. Melee combat between crews begins next round.', counterAction: 'Cut grappling lines (STR DC 13 per line, 4 lines).' },
  { name: 'Boarding Pod Launch', description: 'Fire a sealed pod containing soldiers at the enemy hull.', requirement: 'Mangonel + boarding pod (200gp).', mechanicalEffect: 'Pod bursts on hull. 4 soldiers deploy inside enemy ship. Surprise round.', counterAction: 'Shoot the pod mid-flight (AC 15, HP 20).' },
  { name: 'Teleportation Strike', description: 'A spellcaster teleports a strike team directly onto the bridge.', requirement: '5th-level spell slot. Must have seen enemy bridge.', mechanicalEffect: 'Up to 5 creatures appear on enemy bridge. Surprise round if helm\'s sensors miss (Arcana DC 16).', counterAction: 'Arcane alarm wards (Arcana DC 14 to detect incoming teleport).' },
  { name: 'Hull Breach Entry', description: 'Blow a hole in the hull and storm through.', requirement: 'Arcane Cannon or equivalent. Hull HP must be below 50%.', mechanicalEffect: 'Creates a 10ft hole. Air rushes out (creatures near breach: STR DC 12 or sucked into space).', counterAction: 'Emergency bulkheads (crew action to seal the section).' },
];

export function getWeapon(name: string): AstralShipWeapon | undefined {
  return WEAPONS.find((w) => w.name.toLowerCase().includes(name.toLowerCase()));
}

export function getWeaponsByType(type: ShipWeaponType): AstralShipWeapon[] {
  return WEAPONS.filter((w) => w.type === type);
}

export function getShield(type: ShipShieldType): AstralShipShield | undefined {
  return SHIELDS.find((s) => s.type === type);
}

export function getAllWeaponTypes(): ShipWeaponType[] {
  return [...new Set(WEAPONS.map((w) => w.type))];
}

export function getAllShieldTypes(): ShipShieldType[] {
  return SHIELDS.map((s) => s.type);
}

export function formatWeapon(weapon: AstralShipWeapon): string {
  return `🔫 **${weapon.name}** — ${weapon.damage} | Range: ${weapon.range} | Crew: ${weapon.crewRequired} | ${weapon.cost}gp\n  ⚙️ ${weapon.specialEffect}`;
}

export function formatShield(shield: AstralShipShield): string {
  return `🛡️ **${shield.name}** — Absorbs ${shield.hpAbsorbed} HP | Duration: ${shield.duration} | Recharge: ${shield.rechargeTime} | ${shield.cost}gp\n  ⚙️ ${shield.specialProperty}`;
}

export { WEAPONS as ASTRAL_WEAPONS, SHIELDS as ASTRAL_SHIELDS, BOARDING_ACTIONS };
