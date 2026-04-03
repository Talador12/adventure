// Mass combat rules — army-scale battles with unit types, morale, and commander abilities.

export type UnitType = 'infantry' | 'archers' | 'cavalry' | 'siege' | 'mages' | 'monsters' | 'militia';
export type UnitSize = 'squad' | 'company' | 'battalion' | 'regiment';

export interface ArmyUnit {
  name: string;
  type: UnitType;
  size: UnitSize;
  attack: number;
  defense: number;
  morale: number; // 1-10
  hp: number;
  speed: number; // relative movement
  specialAbility: string;
  cost: number; // gold to maintain per week
}

export interface CommanderAbility {
  name: string;
  effect: string;
  usesPerBattle: number;
  requirement: string;
}

export interface BattleModifier {
  name: string;
  attackMod: number;
  defenseMod: number;
  moraleMod: number;
  description: string;
}

const UNIT_TEMPLATES: ArmyUnit[] = [
  { name: 'Footmen', type: 'infantry', size: 'company', attack: 4, defense: 5, morale: 6, hp: 50, speed: 2, specialAbility: 'Shield Wall: +2 defense when stationary.', cost: 200 },
  { name: 'Longbowmen', type: 'archers', size: 'company', attack: 5, defense: 2, morale: 5, hp: 30, speed: 2, specialAbility: 'Volley: Attack at range without disadvantage. +1 attack vs unshielded.', cost: 250 },
  { name: 'Heavy Cavalry', type: 'cavalry', size: 'squad', attack: 7, defense: 4, morale: 8, hp: 40, speed: 4, specialAbility: 'Charge: +3 attack on first engagement. Must withdraw to charge again.', cost: 500 },
  { name: 'Catapult Battery', type: 'siege', size: 'squad', attack: 8, defense: 1, morale: 4, hp: 20, speed: 1, specialAbility: 'Bombardment: Can attack fortifications. AoE damage to clustered units.', cost: 400 },
  { name: 'War Mages', type: 'mages', size: 'squad', attack: 6, defense: 2, morale: 7, hp: 25, speed: 2, specialAbility: 'Fireball Volley: Once per battle, deal double damage to one unit. Shield: +3 defense for one round to any allied unit.', cost: 800 },
  { name: 'Troll Warband', type: 'monsters', size: 'squad', attack: 7, defense: 3, morale: 6, hp: 60, speed: 3, specialAbility: 'Regeneration: Recovers 5 HP per round unless hit by fire/acid.', cost: 600 },
  { name: 'Town Militia', type: 'militia', size: 'battalion', attack: 2, defense: 3, morale: 3, hp: 40, speed: 2, specialAbility: 'Homeland: +2 morale when defending their own territory.', cost: 50 },
  { name: 'Elven Rangers', type: 'archers', size: 'squad', attack: 6, defense: 3, morale: 8, hp: 30, speed: 3, specialAbility: 'Forest Ambush: +3 attack from forest terrain. Stealth movement.', cost: 450 },
];

const COMMANDER_ABILITIES: CommanderAbility[] = [
  { name: 'Inspiring Presence', effect: 'All friendly units gain +2 morale for 3 rounds.', usesPerBattle: 1, requirement: 'CHA 14+' },
  { name: 'Tactical Retreat', effect: 'One unit disengages without opportunity attack.', usesPerBattle: 2, requirement: 'INT 12+' },
  { name: 'Hold the Line', effect: 'One unit cannot be routed this round regardless of morale.', usesPerBattle: 2, requirement: 'WIS 14+' },
  { name: 'Flanking Maneuver', effect: 'Move one unit to flank. Flanked enemy gets -2 defense.', usesPerBattle: 1, requirement: 'INT 14+ and a cavalry unit' },
  { name: 'Rally the Broken', effect: 'Return one routed unit to battle at half HP.', usesPerBattle: 1, requirement: 'CHA 16+' },
];

const BATTLE_MODIFIERS: BattleModifier[] = [
  { name: 'High Ground', attackMod: 1, defenseMod: 2, moraleMod: 1, description: 'Defender holds elevated position.' },
  { name: 'River Crossing', attackMod: -2, defenseMod: 0, moraleMod: -1, description: 'Attacker must cross water under fire.' },
  { name: 'Night Battle', attackMod: -1, defenseMod: -1, moraleMod: -2, description: 'Reduced visibility. Darkvision units unaffected.' },
  { name: 'Fortified Position', attackMod: 0, defenseMod: 4, moraleMod: 2, description: 'Walls, towers, and murder holes.' },
  { name: 'Surprise Attack', attackMod: 3, defenseMod: 0, moraleMod: -3, description: 'Defender caught unaware. First round only.' },
  { name: 'Rain/Mud', attackMod: -1, defenseMod: 0, moraleMod: -1, description: 'Cavalry charge negated. Siege speed halved.' },
];

export function resolveClash(attacker: ArmyUnit, defender: ArmyUnit, modifiers: BattleModifier[] = []): { attackerDamage: number; defenderDamage: number; description: string } {
  const atkMod = modifiers.reduce((sum, m) => sum + m.attackMod, 0);
  const defMod = modifiers.reduce((sum, m) => sum + m.defenseMod, 0);
  const atkRoll = Math.floor(Math.random() * 10) + 1 + attacker.attack + atkMod;
  const defRoll = Math.floor(Math.random() * 10) + 1 + defender.defense + defMod;
  const attackerDamage = Math.max(0, defRoll - atkRoll + 5);
  const defenderDamage = Math.max(0, atkRoll - defRoll + 5);
  const desc = defenderDamage > attackerDamage ? `${attacker.name} overwhelm ${defender.name}!` : `${defender.name} hold firm against ${attacker.name}.`;
  return { attackerDamage, defenderDamage, description: desc };
}

export function checkMorale(unit: ArmyUnit, casualties: number): boolean {
  const moraleCheck = Math.floor(Math.random() * 10) + 1;
  const penalty = Math.floor(casualties / (unit.hp * 0.25));
  return moraleCheck + unit.morale - penalty > 5;
}

export function getUnitsByType(type: UnitType): ArmyUnit[] {
  return UNIT_TEMPLATES.filter((u) => u.type === type);
}

export function getAllUnitTypes(): UnitType[] {
  return [...new Set(UNIT_TEMPLATES.map((u) => u.type))];
}

export function formatUnit(unit: ArmyUnit): string {
  return `⚔️ **${unit.name}** (${unit.type}, ${unit.size}) — ATK ${unit.attack} DEF ${unit.defense} MOR ${unit.morale} HP ${unit.hp}\n  ⚙️ ${unit.specialAbility} | Cost: ${unit.cost}gp/week`;
}

export function formatBattleModifier(mod: BattleModifier): string {
  return `🏔️ **${mod.name}** — ATK ${mod.attackMod >= 0 ? '+' : ''}${mod.attackMod} DEF ${mod.defenseMod >= 0 ? '+' : ''}${mod.defenseMod} MOR ${mod.moraleMod >= 0 ? '+' : ''}${mod.moraleMod}\n  ${mod.description}`;
}

export { UNIT_TEMPLATES, COMMANDER_ABILITIES, BATTLE_MODIFIERS };
