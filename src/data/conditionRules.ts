// Full D&D 5e condition rules text for player reference.
// Shown on hover over condition badges throughout the UI.

export const CONDITION_RULES: Record<string, string> = {
  blinded: 'A blinded creature can\'t see. Attack rolls against it have advantage, and its attack rolls have disadvantage.',
  charmed: 'A charmed creature can\'t attack the charmer. The charmer has advantage on social checks against it.',
  deafened: 'A deafened creature can\'t hear and automatically fails ability checks that require hearing.',
  frightened: 'A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. It can\'t willingly move closer to the source.',
  grappled: 'A grappled creature\'s speed becomes 0. The condition ends if the grappler is incapacitated or moved out of reach.',
  incapacitated: 'An incapacitated creature can\'t take actions or reactions.',
  invisible: 'An invisible creature is impossible to see without magic. Attack rolls against it have disadvantage, its attacks have advantage.',
  paralyzed: 'A paralyzed creature is incapacitated and can\'t move or speak. It automatically fails STR and DEX saves. Attacks have advantage, and hits within 5ft are critical.',
  petrified: 'A petrified creature is transformed to stone. It\'s incapacitated, can\'t move or speak, and has resistance to all damage.',
  poisoned: 'A poisoned creature has disadvantage on attack rolls and ability checks.',
  prone: 'A prone creature can only crawl. It has disadvantage on attacks. Melee attacks against it have advantage; ranged attacks have disadvantage.',
  restrained: 'A restrained creature\'s speed becomes 0. Attack rolls against it have advantage, its attacks have disadvantage. Disadvantage on DEX saves.',
  stunned: 'A stunned creature is incapacitated, can\'t move, and can speak only falteringly. It automatically fails STR and DEX saves. Attacks have advantage.',
  unconscious: 'An unconscious creature is incapacitated, drops what it\'s holding, and falls prone. Attacks have advantage, and hits within 5ft are critical.',
  exhaustion: 'Exhaustion is cumulative. Level 1: disadvantage on checks. Level 2: speed halved. Level 3: disadvantage on attacks/saves. Level 4: HP max halved. Level 5: speed 0. Level 6: death.',
  // Custom conditions used in this VTT
  blessed: 'Blessed — +2 to attack rolls and saving throws.',
  hexed: 'Hexed — -2 to attack rolls, marked by dark magic.',
  burning: 'Burning — takes fire damage at the start of each turn.',
  dodging: 'Dodging — +2 AC, attacks against you have disadvantage.',
  raging: 'Raging — +2 to melee damage, resistance to physical damage. Ends if you don\'t attack or take damage.',
  inspired: 'Inspired — a burst of confidence. +2 to attack and saves.',
  helping: 'Helping — granting advantage to an ally\'s next check.',
  hidden: 'Hidden — can\'t be targeted, advantage on next attack.',
  smiteArmed: 'Divine Smite armed — next melee hit deals +2d8 radiant damage and consumes a spell slot.',
  hunterMarked: 'Hunter\'s Mark — attacks against this target deal +1d6 damage.',
  surprised: 'Surprised — can\'t move, take actions, or reactions until end of first turn. -2 AC.',
};

export function getConditionRules(conditionType: string): string {
  return CONDITION_RULES[conditionType] || `${conditionType} — a magical condition affecting this creature.`;
}
