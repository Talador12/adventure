// Spell data, spell slot tables, class abilities, and feats.
// Extracted from GameContext.tsx for maintainability.

import type { CharacterClass, Spell, ClassAbility, Feat } from '../types/game';

// --- Spell slots ---
export const FULL_CASTER_SLOTS: Record<number, Record<number, number>> = {
  1: { 1: 2 }, 2: { 1: 3 }, 3: { 1: 4, 2: 2 }, 4: { 1: 4, 2: 3 }, 5: { 1: 4, 2: 3, 3: 2 },
};
export const HALF_CASTER_SLOTS: Record<number, Record<number, number>> = {
  1: {}, 2: { 1: 2 }, 3: { 1: 3 }, 4: { 1: 3 }, 5: { 1: 4, 2: 2 },
};

export const FULL_CASTERS: CharacterClass[] = ['Wizard', 'Sorcerer', 'Cleric', 'Druid', 'Bard', 'Warlock'];
export const HALF_CASTERS: CharacterClass[] = ['Paladin', 'Ranger'];

export function getSpellSlots(charClass: CharacterClass, level: number): Record<number, number> {
  const clampedLevel = Math.min(level, 5);
  if (FULL_CASTERS.includes(charClass)) return FULL_CASTER_SLOTS[clampedLevel] || {};
  if (HALF_CASTERS.includes(charClass)) return HALF_CASTER_SLOTS[clampedLevel] || {};
  return {};
}

// --- Spell list ---
export const SPELL_LIST: Spell[] = [
  // Cantrips
  { id: 'fire-bolt', name: 'Fire Bolt', level: 0, school: 'evocation', description: 'Hurl a mote of fire. +spell attack, 1d10 fire damage.', damage: '1d10', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'sacred-flame', name: 'Sacred Flame', level: 0, school: 'evocation', description: 'Radiant flames descend. DEX save or 1d8 radiant damage.', damage: '1d8', range: '60ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Cleric'] },
  { id: 'eldritch-blast', name: 'Eldritch Blast', level: 0, school: 'evocation', description: 'A beam of crackling energy. +spell attack, 1d10 force damage.', damage: '1d10', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Warlock'] },
  { id: 'vicious-mockery', name: 'Vicious Mockery', level: 0, school: 'enchantment', description: 'Cutting words. WIS save or 1d4 psychic damage + disadvantage.', damage: '1d4', range: '60ft', duration: 'Instantaneous', saveStat: 'WIS', isConcentration: false, classes: ['Bard'], appliesCondition: 'frightened', conditionDuration: 1 },
  { id: 'produce-flame', name: 'Produce Flame', level: 0, school: 'conjuration', description: 'A flame in your palm. Hurl it for 1d8 fire damage.', damage: '1d8', range: '30ft', duration: 'Instantaneous', isConcentration: false, classes: ['Druid'] },
  { id: 'ray-of-frost', name: 'Ray of Frost', level: 0, school: 'evocation', description: 'A frigid beam. +spell attack, 1d8 cold damage, -10ft speed.', damage: '1d8', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'minor-illusion', name: 'Minor Illusion', level: 0, school: 'illusion', description: 'Create a sound or image of an object within range.', range: '30ft', duration: '1 minute', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'] },
  // Level 1
  { id: 'magic-missile', name: 'Magic Missile', level: 1, school: 'evocation', description: 'Three darts of magical force. Each deals 1d4+1. Auto-hit.', damage: '3d4+3', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'cure-wounds', name: 'Cure Wounds', level: 1, school: 'evocation', description: 'Touch a creature and restore 1d8+mod HP.', healAmount: 8, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'shield', name: 'Shield', level: 1, school: 'abjuration', description: 'Reaction: +5 AC until your next turn.', range: 'Self', duration: '1 round', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'burning-hands', name: 'Burning Hands', level: 1, school: 'evocation', description: '15ft cone of fire. DEX save or 3d6 fire damage. Sets target ablaze.', damage: '3d6', range: 'Self (15ft cone)', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'], appliesCondition: 'burning', conditionDuration: 2, aoe: { shape: 'cone', radiusCells: 3, color: 'rgba(251,146,60,0.25)' } },
  { id: 'healing-word', name: 'Healing Word', level: 1, school: 'evocation', description: 'Bonus action. Heal 1d4+mod HP at range.', healAmount: 5, range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard', 'Druid'] },
  { id: 'thunderwave', name: 'Thunderwave', level: 1, school: 'evocation', description: '15ft cube of thunder. CON save or 2d8 damage + pushed 10ft.', damage: '2d8', range: 'Self (15ft cube)', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Druid'], aoe: { shape: 'cube', radiusCells: 3, color: 'rgba(96,165,250,0.25)' } },
  { id: 'hex', name: 'Hex', level: 1, school: 'enchantment', description: 'Curse a target. Deal extra 1d6 necrotic on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Warlock'], appliesCondition: 'hexed', conditionDuration: 3 },
  { id: 'hunters-mark', name: "Hunter's Mark", level: 1, school: 'divination', description: 'Mark a target. Deal extra 1d6 on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Ranger'] },
  { id: 'divine-smite-spell', name: 'Searing Smite', level: 1, school: 'evocation', description: 'Your weapon flares with fire. +1d6 fire damage on hit.', damage: '1d6', range: 'Self', duration: 'Concentration, 1 minute', isConcentration: true, classes: ['Paladin'] },
  // Level 2
  { id: 'scorching-ray', name: 'Scorching Ray', level: 2, school: 'evocation', description: 'Three rays of fire. Each +spell attack for 2d6 fire.', damage: '6d6', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'spiritual-weapon', name: 'Spiritual Weapon', level: 2, school: 'evocation', description: 'Floating spectral weapon. Bonus action attack for 1d8+mod.', damage: '1d8', range: '60ft', duration: '1 minute', isConcentration: false, classes: ['Cleric'] },
  { id: 'misty-step', name: 'Misty Step', level: 2, school: 'conjuration', description: 'Bonus action teleport up to 30ft.', range: 'Self', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
  { id: 'lesser-restoration', name: 'Lesser Restoration', level: 2, school: 'abjuration', description: 'End one disease or condition on a creature.', range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'hold-person', name: 'Hold Person', level: 2, school: 'enchantment', description: 'WIS save or paralyzed for 1 minute (concentration).', range: '60ft', duration: 'Concentration, 1 minute', saveStat: 'WIS', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Cleric', 'Bard', 'Warlock', 'Druid'], appliesCondition: 'stunned', conditionDuration: 2 },
  // Level 3
  { id: 'fireball', name: 'Fireball', level: 3, school: 'evocation', description: '20ft radius explosion. DEX save or 8d6 fire damage.', damage: '8d6', range: '150ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'], aoe: { shape: 'circle', radiusCells: 4, color: 'rgba(239,68,68,0.25)' } },
  { id: 'spirit-guardians', name: 'Spirit Guardians', level: 3, school: 'conjuration', description: 'Spirits swirl around you. Enemies in 15ft take 3d8 radiant.', damage: '3d8', range: 'Self (15ft radius)', duration: 'Concentration, 10 minutes', saveStat: 'WIS', isConcentration: true, classes: ['Cleric'], aoe: { shape: 'circle', radiusCells: 3, color: 'rgba(251,191,36,0.25)' } },
  { id: 'revivify', name: 'Revivify', level: 3, school: 'necromancy', description: 'Touch a creature dead for less than 1 minute. It returns with 1 HP.', healAmount: 1, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Paladin', 'Druid'] },
  { id: 'counterspell', name: 'Counterspell', level: 3, school: 'abjuration', description: 'Reaction: interrupt a creature casting a spell of 3rd level or lower.', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
];

export function getClassSpells(charClass: CharacterClass, level: number): Spell[] {
  const slots = getSpellSlots(charClass, level);
  const maxSpellLevel = Object.keys(slots).map(Number).sort((a, b) => b - a)[0] || 0;
  return SPELL_LIST.filter((s) => s.classes.includes(charClass) && s.level <= Math.max(maxSpellLevel, 0));
}

// --- Class abilities ---
export const CLASS_ABILITIES: ClassAbility[] = [
  { id: 'second-wind', name: 'Second Wind', class: 'Fighter', type: 'heal', resetsOn: 'short', healFormula: 'level_d10', selfOnly: true, color: 'red', description: 'Dig deep and recover 1d10+level HP' },
  { id: 'rage', name: 'Rage', class: 'Barbarian', type: 'buff', resetsOn: 'long', appliesCondition: 'raging', conditionDuration: 3, selfOnly: true, color: 'red', description: 'Enter a rage: +2 to attacks for 3 rounds' },
  { id: 'sneak-attack', name: 'Sneak Attack', class: 'Rogue', type: 'attack', resetsOn: 'short', damage: '2d6', color: 'slate', description: 'Strike a vital spot for 2d6 extra damage' },
  { id: 'lay-on-hands', name: 'Lay on Hands', class: 'Paladin', type: 'heal', resetsOn: 'long', healFormula: 'level_x5', selfOnly: true, color: 'yellow', description: 'Channel divine energy to heal level\u00d75 HP' },
  { id: 'hunters-mark', name: "Hunter's Mark", class: 'Ranger', type: 'buff', resetsOn: 'short', appliesCondition: 'hexed', conditionDuration: 3, selfOnly: false, color: 'green', description: "Mark a target \u2014 they're hexed for 3 rounds" },
  { id: 'flurry-of-blows', name: 'Flurry of Blows', class: 'Monk', type: 'attack', resetsOn: 'short', damage: '2d4', color: 'cyan', description: 'Unleash a rapid flurry of unarmed strikes for 2d4 damage' },
  { id: 'channel-divinity', name: 'Channel Divinity', class: 'Cleric', type: 'heal', resetsOn: 'short', healFormula: 'level_d6', selfOnly: true, color: 'yellow', description: 'Invoke divine power to heal level\u00d7d6 HP' },
  { id: 'bardic-inspiration', name: 'Bardic Inspiration', class: 'Bard', type: 'buff', resetsOn: 'short', appliesCondition: 'inspired', conditionDuration: 3, selfOnly: true, color: 'pink', description: 'Inspire yourself with a rousing melody (+2 attacks/saves for 3 rounds)' },
  { id: 'wild-shape', name: 'Wild Shape', class: 'Druid', type: 'heal', resetsOn: 'short', healFormula: 'level_d10', selfOnly: true, color: 'green', description: 'Shift into beast form, recovering 1d10+level HP' },
  { id: 'eldritch-blast', name: 'Eldritch Blast', class: 'Warlock', type: 'attack', resetsOn: 'short', damage: '2d10', color: 'fuchsia', description: 'Hurl a beam of crackling force for 2d10 damage' },
  { id: 'arcane-recovery', name: 'Arcane Recovery', class: 'Wizard', type: 'utility', resetsOn: 'long', color: 'blue', description: 'Recover one expended spell slot through study' },
  { id: 'metamagic-empower', name: 'Metamagic: Empower', class: 'Sorcerer', type: 'attack', resetsOn: 'long', damage: '3d8', color: 'amber', description: 'Channel raw sorcery into a 3d8 empowered blast' },
];

export function getClassAbility(charClass: CharacterClass): ClassAbility | undefined {
  return CLASS_ABILITIES.find((a) => a.class === charClass);
}

// --- Feats ---
export const FEATS: Feat[] = [
  { id: 'tough', name: 'Tough', description: 'Your hit point maximum increases by 2 for every level you have.', maxHpPerLevel: 2 },
  { id: 'alert', name: 'Alert', description: "+5 to initiative. You can't be surprised while conscious.", initiativeBonus: 5 },
  { id: 'great-weapon-master', name: 'Great Weapon Master', description: 'Your heavy weapon strikes deal +3 bonus damage.', damageBonus: 3 },
  { id: 'war-caster', name: 'War Caster', description: '+2 to spell attack rolls and concentration saves.', attackBonus: 2 },
  { id: 'lucky', name: 'Lucky', description: '+1 to all saving throws from sheer fortune.', savingThrowBonus: 1 },
  { id: 'durable', name: 'Durable', description: '+1 CON and +1 HP per level.', statBonuses: { CON: 1 }, maxHpPerLevel: 1 },
  { id: 'observant', name: 'Observant', description: '+1 WIS. You read lips and notice hidden details.', statBonuses: { WIS: 1 } },
  { id: 'resilient', name: 'Resilient', description: '+1 CON and proficiency in CON saving throws.', statBonuses: { CON: 1 }, savingThrowBonus: 1 },
];
