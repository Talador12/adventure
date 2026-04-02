// Combat maneuver library — extended martial options beyond the standard attack.
// Each maneuver uses a contested check or attack roll with specific outcomes.

export interface CombatManeuver {
  id: string;
  name: string;
  emoji: string;
  description: string;
  attackType: 'melee' | 'any';
  checkType: 'attack_roll' | 'contested' | 'saving_throw';
  attackerAbility: string;
  defenderAbility: string;
  successEffect: string;
  failEffect: string;
  bonusDamage?: string;
  requiresAction: boolean; // true = uses Attack action, false = bonus/reaction
}

export const MANEUVERS: CombatManeuver[] = [
  {
    id: 'disarm', name: 'Disarm', emoji: '🤚',
    description: 'Knock the weapon from an enemy\'s hands.',
    attackType: 'melee', checkType: 'contested', attackerAbility: 'Athletics', defenderAbility: 'Athletics or Acrobatics',
    successEffect: 'Target drops one held item of your choice. It lands at their feet.',
    failEffect: 'The attempt fails. Target keeps their weapon.',
    requiresAction: true,
  },
  {
    id: 'trip', name: 'Trip', emoji: '🦶',
    description: 'Sweep the legs to knock an enemy prone.',
    attackType: 'melee', checkType: 'contested', attackerAbility: 'Athletics', defenderAbility: 'Athletics or Acrobatics',
    successEffect: 'Target is knocked prone. Melee attacks have advantage against them.',
    failEffect: 'The target sidesteps the attempt.',
    requiresAction: true,
  },
  {
    id: 'feint', name: 'Feint', emoji: '🎭',
    description: 'Trick the enemy into dropping their guard.',
    attackType: 'melee', checkType: 'contested', attackerAbility: 'Deception', defenderAbility: 'Insight',
    successEffect: 'Advantage on your next attack against this target this turn.',
    failEffect: 'The target sees through the feint.',
    requiresAction: false,
  },
  {
    id: 'called-shot', name: 'Called Shot', emoji: '🎯',
    description: 'Aim for a specific body part at -5 to hit for extra effect.',
    attackType: 'any', checkType: 'attack_roll', attackerAbility: 'Attack roll -5', defenderAbility: 'AC',
    successEffect: 'Hit the targeted area. DM determines bonus effect (blind, slow, disarm).',
    failEffect: 'The precise aim causes you to miss entirely.',
    bonusDamage: '+1d6',
    requiresAction: true,
  },
  {
    id: 'overrun', name: 'Overrun', emoji: '🏃',
    description: 'Charge through an enemy\'s space.',
    attackType: 'melee', checkType: 'contested', attackerAbility: 'Athletics', defenderAbility: 'Athletics',
    successEffect: 'Move through the target\'s space. They don\'t get an opportunity attack.',
    failEffect: 'Your charge is blocked. Movement stops.',
    requiresAction: false,
  },
  {
    id: 'shield-bash', name: 'Shield Bash', emoji: '🛡️',
    description: 'Slam your shield into an adjacent enemy.',
    attackType: 'melee', checkType: 'attack_roll', attackerAbility: 'Athletics', defenderAbility: 'AC',
    successEffect: 'Target takes 1d4 bludgeoning and must make STR DC 13 save or be pushed 5ft.',
    failEffect: 'The bash misses.',
    bonusDamage: '1d4 bludgeoning',
    requiresAction: false,
  },
  {
    id: 'mark', name: 'Mark Target', emoji: '👁️',
    description: 'Mark an enemy. You get opportunity attacks if they move even if they disengage.',
    attackType: 'melee', checkType: 'attack_roll', attackerAbility: '-', defenderAbility: '-',
    successEffect: 'Target is marked. If they move while within 5ft of you, you get an opportunity attack (even on Disengage).',
    failEffect: '-',
    requiresAction: false,
  },
  {
    id: 'taunt', name: 'Taunt', emoji: '😤',
    description: 'Provoke an enemy into attacking you instead of your allies.',
    attackType: 'any', checkType: 'contested', attackerAbility: 'Intimidation', defenderAbility: 'Insight',
    successEffect: 'Target has disadvantage on attacks against anyone other than you until your next turn.',
    failEffect: 'The target ignores your provocation.',
    requiresAction: false,
  },
];

export function getManeuver(id: string): CombatManeuver | undefined {
  return MANEUVERS.find((m) => m.id === id);
}

export function getMeleeManeuvers(): CombatManeuver[] {
  return MANEUVERS.filter((m) => m.attackType === 'melee');
}

export function getBonusActionManeuvers(): CombatManeuver[] {
  return MANEUVERS.filter((m) => !m.requiresAction);
}

export function formatManeuver(m: CombatManeuver): string {
  const lines = [`${m.emoji} **${m.name}** (${m.requiresAction ? 'Action' : 'Bonus/Reaction'})`];
  lines.push(`*${m.description}*`);
  lines.push(`Check: ${m.attackerAbility} vs ${m.defenderAbility}`);
  lines.push(`✅ ${m.successEffect}`);
  if (m.bonusDamage) lines.push(`Bonus damage: ${m.bonusDamage}`);
  return lines.join('\n');
}

export function formatManeuverList(): string {
  const lines = ['⚔️ **Combat Maneuvers:**'];
  for (const m of MANEUVERS) {
    lines.push(`${m.emoji} **${m.name}** — ${m.description} (${m.requiresAction ? 'Action' : 'Bonus'})`);
  }
  return lines.join('\n');
}
