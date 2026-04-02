// Henchman/sidekick system — NPC companions with simplified stat blocks.
// Sidekicks level with the party but use simplified rules (Tasha's Cauldron style).

export type SidekickRole = 'warrior' | 'expert' | 'spellcaster';

export interface Sidekick {
  id: string;
  name: string;
  role: SidekickRole;
  level: number;
  hp: number;
  maxHp: number;
  ac: number;
  attackBonus: number;
  damageDie: string;
  speed: number;
  proficiencyBonus: number;
  abilities: string[];
  personality: string;
}

export interface SidekickTemplate {
  role: SidekickRole;
  name: string;
  emoji: string;
  description: string;
  baseHp: number;
  hpPerLevel: number;
  baseAc: number;
  baseAttack: number;
  damageDie: string;
  speed: number;
  levelAbilities: Record<number, string>;
}

export const SIDEKICK_TEMPLATES: SidekickTemplate[] = [
  {
    role: 'warrior', name: 'Warrior', emoji: '⚔️',
    description: 'A fighter-type sidekick. Good at taking and dealing damage.',
    baseHp: 12, hpPerLevel: 7, baseAc: 14, baseAttack: 4, damageDie: '1d8+2', speed: 6,
    levelAbilities: {
      1: 'Martial Weapon Proficiency',
      3: 'Improved Critical (19-20)',
      5: 'Extra Attack',
      7: 'Battle Readiness (+2 initiative)',
      10: 'Indomitable (reroll failed save 1/day)',
    },
  },
  {
    role: 'expert', name: 'Expert', emoji: '🎯',
    description: 'A rogue/ranger-type sidekick. Skilled, sneaky, and versatile.',
    baseHp: 8, hpPerLevel: 5, baseAc: 13, baseAttack: 4, damageDie: '1d6+3', speed: 6,
    levelAbilities: {
      1: 'Bonus Proficiencies (3 skills)',
      3: 'Cunning Action (Dash/Disengage/Hide as bonus)',
      5: 'Expertise (double proficiency on 2 skills)',
      7: 'Evasion (DEX saves for half → zero)',
      10: 'Reliable Talent (minimum 10 on proficient checks)',
    },
  },
  {
    role: 'spellcaster', name: 'Spellcaster', emoji: '✨',
    description: 'A mage/healer-type sidekick. Provides magical support.',
    baseHp: 6, hpPerLevel: 4, baseAc: 12, baseAttack: 3, damageDie: '1d6+1', speed: 6,
    levelAbilities: {
      1: 'Cantrips (2 cantrips)',
      3: '2nd-level spell slots',
      5: '3rd-level spell slots',
      7: '4th-level spell slots',
      10: 'Empowered Spells (+WIS to spell damage)',
    },
  },
];

export function createSidekick(name: string, role: SidekickRole, level: number): Sidekick {
  const template = SIDEKICK_TEMPLATES.find((t) => t.role === role) || SIDEKICK_TEMPLATES[0];
  const profBonus = Math.floor((level - 1) / 4) + 2;
  const hp = template.baseHp + template.hpPerLevel * (level - 1);
  const abilities: string[] = [];
  for (const [lvl, ability] of Object.entries(template.levelAbilities)) {
    if (level >= parseInt(lvl, 10)) abilities.push(ability);
  }

  return {
    id: crypto.randomUUID(),
    name,
    role,
    level,
    hp,
    maxHp: hp,
    ac: template.baseAc + Math.floor(level / 4),
    attackBonus: template.baseAttack + profBonus - 2,
    damageDie: template.damageDie,
    speed: template.speed,
    proficiencyBonus: profBonus,
    abilities,
    personality: '',
  };
}

export function levelUpSidekick(sidekick: Sidekick): Sidekick {
  const template = SIDEKICK_TEMPLATES.find((t) => t.role === sidekick.role) || SIDEKICK_TEMPLATES[0];
  const newLevel = sidekick.level + 1;
  const newProfBonus = Math.floor((newLevel - 1) / 4) + 2;
  const newMaxHp = template.baseHp + template.hpPerLevel * (newLevel - 1);
  const newAbilities: string[] = [];
  for (const [lvl, ability] of Object.entries(template.levelAbilities)) {
    if (newLevel >= parseInt(lvl, 10)) newAbilities.push(ability);
  }

  return {
    ...sidekick,
    level: newLevel,
    maxHp: newMaxHp,
    hp: newMaxHp,
    ac: template.baseAc + Math.floor(newLevel / 4),
    attackBonus: template.baseAttack + newProfBonus - 2,
    proficiencyBonus: newProfBonus,
    abilities: newAbilities,
  };
}

export function formatSidekick(s: Sidekick): string {
  const template = SIDEKICK_TEMPLATES.find((t) => t.role === s.role);
  const emoji = template?.emoji || '👤';
  const lines = [`${emoji} **${s.name}** — Level ${s.level} ${s.role}`];
  lines.push(`HP: ${s.hp}/${s.maxHp} | AC: ${s.ac} | Attack: +${s.attackBonus} (${s.damageDie}) | Speed: ${s.speed * 5}ft`);
  if (s.abilities.length > 0) lines.push(`Abilities: ${s.abilities.join(', ')}`);
  return lines.join('\n');
}
