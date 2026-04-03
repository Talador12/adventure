// Companion animal advancement — pets/familiars level up and gain abilities.

export type CompanionType = 'familiar' | 'beast_companion' | 'mount' | 'pet' | 'summoned';
export type CompanionSize = 'tiny' | 'small' | 'medium' | 'large';

export interface CompanionAbility {
  name: string;
  level: number; // companion level required
  description: string;
  type: 'passive' | 'active' | 'reaction';
}

export interface CompanionAnimal {
  name: string;
  species: string;
  type: CompanionType;
  size: CompanionSize;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  ac: number;
  attackBonus: number;
  damage: string;
  abilities: CompanionAbility[];
  bond: number; // 0-10, affects ability effectiveness
}

const XP_TABLE: number[] = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500]; // levels 1-10

const SPECIES_TEMPLATES: Record<string, { type: CompanionType; size: CompanionSize; baseHp: number; baseAc: number; baseAttack: number; baseDamage: string; abilities: CompanionAbility[] }> = {
  'Hawk': { type: 'familiar', size: 'tiny', baseHp: 6, baseAc: 13, baseAttack: 3, baseDamage: '1d4', abilities: [
    { name: 'Keen Sight', level: 1, description: 'Advantage on Perception checks relying on sight.', type: 'passive' },
    { name: 'Dive Attack', level: 3, description: 'Extra 1d4 damage when diving from 10+ ft above.', type: 'active' },
    { name: 'Evasion', level: 5, description: 'On successful DEX save, take no damage instead of half.', type: 'passive' },
  ]},
  'Wolf': { type: 'beast_companion', size: 'medium', baseHp: 15, baseAc: 12, baseAttack: 4, baseDamage: '2d4+2', abilities: [
    { name: 'Pack Tactics', level: 1, description: 'Advantage on attack if an ally is within 5ft of target.', type: 'passive' },
    { name: 'Knockdown', level: 3, description: 'Target makes STR DC 12 save or is knocked prone on hit.', type: 'active' },
    { name: 'Howl', level: 5, description: 'Once per rest, allies within 30ft gain +1 to attack for 1 minute.', type: 'active' },
    { name: 'Loyal Guardian', level: 7, description: 'Can take the Help action as a bonus action for its bonded owner.', type: 'reaction' },
  ]},
  'Cat': { type: 'familiar', size: 'tiny', baseHp: 4, baseAc: 14, baseAttack: 2, baseDamage: '1d1', abilities: [
    { name: 'Keen Smell', level: 1, description: 'Advantage on Perception checks relying on smell.', type: 'passive' },
    { name: 'Distract', level: 3, description: 'Target has disadvantage on next attack (reaction).', type: 'reaction' },
    { name: 'Nine Lives', level: 5, description: 'Once per long rest, drop to 1 HP instead of 0.', type: 'passive' },
  ]},
  'Warhorse': { type: 'mount', size: 'large', baseHp: 25, baseAc: 11, baseAttack: 5, baseDamage: '2d6+3', abilities: [
    { name: 'Trampling Charge', level: 1, description: '20ft charge + attack knocks prone on failed STR DC 14.', type: 'active' },
    { name: 'Steady', level: 3, description: 'Rider cannot be dismounted against their will.', type: 'passive' },
    { name: 'War Trained', level: 5, description: 'Can attack independently of rider on rider\'s turn.', type: 'active' },
    { name: 'Bulwark', level: 7, description: 'Rider gains +2 AC while mounted.', type: 'passive' },
  ]},
  'Pseudodragon': { type: 'familiar', size: 'tiny', baseHp: 8, baseAc: 13, baseAttack: 4, baseDamage: '1d4+2', abilities: [
    { name: 'Telepathy', level: 1, description: 'Can communicate telepathically within 100ft.', type: 'passive' },
    { name: 'Sting', level: 3, description: 'Poisoned condition on hit (CON DC 11, 1 hour).', type: 'active' },
    { name: 'Magic Resistance', level: 5, description: 'Advantage on saves against spells and magical effects.', type: 'passive' },
    { name: 'Breath Weapon', level: 7, description: '15ft cone, 3d6 fire damage (DEX DC 13 half). Once per short rest.', type: 'active' },
  ]},
  'Giant Toad': { type: 'beast_companion', size: 'medium', baseHp: 18, baseAc: 11, baseAttack: 4, baseDamage: '1d8+2', abilities: [
    { name: 'Amphibious', level: 1, description: 'Can breathe air and water.', type: 'passive' },
    { name: 'Swallow', level: 3, description: 'On hit vs Small or smaller, target is grappled and blinded inside.', type: 'active' },
    { name: 'Sticky Tongue', level: 5, description: '15ft range grapple attack as bonus action.', type: 'active' },
  ]},
};

export function createCompanion(name: string, species: string): CompanionAnimal | null {
  const template = SPECIES_TEMPLATES[species];
  if (!template) return null;
  return {
    name, species, type: template.type, size: template.size,
    level: 1, xp: 0, hp: template.baseHp, maxHp: template.baseHp,
    ac: template.baseAc, attackBonus: template.baseAttack, damage: template.baseDamage,
    abilities: template.abilities.filter((a) => a.level <= 1), bond: 0,
  };
}

export function addCompanionXp(companion: CompanionAnimal, xp: number): CompanionAnimal {
  const newXp = companion.xp + xp;
  let newLevel = companion.level;
  for (let i = XP_TABLE.length - 1; i >= 0; i--) {
    if (newXp >= XP_TABLE[i]) { newLevel = i + 1; break; }
  }
  const template = SPECIES_TEMPLATES[companion.species];
  const allAbilities = template ? template.abilities.filter((a) => a.level <= newLevel) : companion.abilities;
  const hpGain = (newLevel - companion.level) * 3;
  return { ...companion, xp: newXp, level: Math.min(10, newLevel), abilities: allAbilities, maxHp: companion.maxHp + hpGain, hp: companion.hp + hpGain };
}

export function increaseBond(companion: CompanionAnimal, amount: number = 1): CompanionAnimal {
  return { ...companion, bond: Math.min(10, companion.bond + amount) };
}

export function getUnlockedAbilities(companion: CompanionAnimal): CompanionAbility[] {
  return companion.abilities;
}

export function getNextAbility(companion: CompanionAnimal): CompanionAbility | null {
  const template = SPECIES_TEMPLATES[companion.species];
  if (!template) return null;
  return template.abilities.find((a) => a.level > companion.level) ?? null;
}

export function getAllSpecies(): string[] {
  return Object.keys(SPECIES_TEMPLATES);
}

export function formatCompanion(c: CompanionAnimal): string {
  const icon = { familiar: '🦉', beast_companion: '🐺', mount: '🐴', pet: '🐱', summoned: '✨' }[c.type];
  const bondStars = '❤️'.repeat(Math.ceil(c.bond / 2)) + '🤍'.repeat(5 - Math.ceil(c.bond / 2));
  const lines = [`${icon} **${c.name}** the ${c.species} *(Lv${c.level} ${c.type.replace(/_/g, ' ')})*`];
  lines.push(`  HP: ${c.hp}/${c.maxHp} | AC: ${c.ac} | Atk: +${c.attackBonus} (${c.damage}) | Bond: ${bondStars}`);
  lines.push(`  XP: ${c.xp}/${XP_TABLE[Math.min(c.level, XP_TABLE.length - 1)] || '???'}`);
  if (c.abilities.length > 0) {
    lines.push('  Abilities:');
    c.abilities.forEach((a) => lines.push(`    ${a.type === 'passive' ? '⚙️' : a.type === 'active' ? '⚔️' : '🛡️'} ${a.name} — ${a.description}`));
  }
  return lines.join('\n');
}
