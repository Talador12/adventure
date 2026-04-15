// Spell data, spell slot tables, class abilities, and feats.
// Extracted from GameContext.tsx for maintainability.

import type { CharacterClass, Spell, ClassAbility, Feat, StatName, Stats } from '../types/game';

// --- Spell slots (full PHB table, levels 1-20) ---
export const FULL_CASTER_SLOTS: Record<number, Record<number, number>> = {
  1:  { 1: 2 },
  2:  { 1: 3 },
  3:  { 1: 4, 2: 2 },
  4:  { 1: 4, 2: 3 },
  5:  { 1: 4, 2: 3, 3: 2 },
  6:  { 1: 4, 2: 3, 3: 3 },
  7:  { 1: 4, 2: 3, 3: 3, 4: 1 },
  8:  { 1: 4, 2: 3, 3: 3, 4: 2 },
  9:  { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
};
export const HALF_CASTER_SLOTS: Record<number, Record<number, number>> = {
  1: {}, 2: { 1: 2 }, 3: { 1: 3 }, 4: { 1: 3 }, 5: { 1: 4, 2: 2 },
  6: { 1: 4, 2: 2 }, 7: { 1: 4, 2: 3 }, 8: { 1: 4, 2: 3 }, 9: { 1: 4, 2: 3, 3: 2 },
  10: { 1: 4, 2: 3, 3: 2 }, 11: { 1: 4, 2: 3, 3: 3 }, 12: { 1: 4, 2: 3, 3: 3 },
  13: { 1: 4, 2: 3, 3: 3, 4: 1 }, 14: { 1: 4, 2: 3, 3: 3, 4: 1 },
  15: { 1: 4, 2: 3, 3: 3, 4: 2 }, 16: { 1: 4, 2: 3, 3: 3, 4: 2 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }, 18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }, 20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
};
// Warlock pact slots are unique: few slots, all at highest level, recover on short rest
export const WARLOCK_PACT_SLOTS: Record<number, { slots: number; level: number }> = {
  1: { slots: 1, level: 1 }, 2: { slots: 2, level: 1 }, 3: { slots: 2, level: 2 },
  4: { slots: 2, level: 2 }, 5: { slots: 2, level: 3 }, 6: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 }, 8: { slots: 2, level: 4 }, 9: { slots: 2, level: 5 },
  10: { slots: 2, level: 5 }, 11: { slots: 3, level: 5 }, 12: { slots: 3, level: 5 },
  13: { slots: 3, level: 5 }, 14: { slots: 3, level: 5 }, 15: { slots: 3, level: 5 },
  16: { slots: 3, level: 5 }, 17: { slots: 4, level: 5 }, 18: { slots: 4, level: 5 },
  19: { slots: 4, level: 5 }, 20: { slots: 4, level: 5 },
};

export const FULL_CASTERS: CharacterClass[] = ['Wizard', 'Sorcerer', 'Cleric', 'Druid', 'Bard'];
export const HALF_CASTERS: CharacterClass[] = ['Paladin', 'Ranger'];

export function getSpellSlots(charClass: CharacterClass, level: number): Record<number, number> {
  const clampedLevel = Math.min(Math.max(level, 1), 20);
  // Warlock uses pact magic (unique slot system)
  if (charClass === 'Warlock') {
    const pact = WARLOCK_PACT_SLOTS[clampedLevel];
    if (!pact) return {};
    return { [pact.level]: pact.slots };
  }
  if (FULL_CASTERS.includes(charClass)) return FULL_CASTER_SLOTS[clampedLevel] || {};
  if (HALF_CASTERS.includes(charClass)) return HALF_CASTER_SLOTS[clampedLevel] || {};
  return {};
}

// --- Spell list ---
export const SPELL_LIST: Spell[] = [
  // Cantrips
  { id: 'fire-bolt', name: 'Fire Bolt', level: 0, school: 'evocation', description: 'Hurl a mote of fire. +spell attack, 1d10 fire damage.', damage: '1d10', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'], attackRoll: true },
  { id: 'sacred-flame', name: 'Sacred Flame', level: 0, school: 'evocation', description: 'Radiant flames descend. DEX save or 1d8 radiant damage.', damage: '1d8', range: '60ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Cleric'] },
  { id: 'eldritch-blast', name: 'Eldritch Blast', level: 0, school: 'evocation', description: 'A beam of crackling energy. +spell attack, 1d10 force damage.', damage: '1d10', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Warlock'], attackRoll: true },
  { id: 'vicious-mockery', name: 'Vicious Mockery', level: 0, school: 'enchantment', description: 'Cutting words. WIS save or 1d4 psychic damage + disadvantage.', damage: '1d4', range: '60ft', duration: 'Instantaneous', saveStat: 'WIS', isConcentration: false, classes: ['Bard'], appliesCondition: 'frightened', conditionDuration: 1 },
  { id: 'produce-flame', name: 'Produce Flame', level: 0, school: 'conjuration', description: 'A flame in your palm. Hurl it for 1d8 fire damage.', damage: '1d8', range: '30ft', duration: 'Instantaneous', isConcentration: false, classes: ['Druid'], attackRoll: true },
  { id: 'ray-of-frost', name: 'Ray of Frost', level: 0, school: 'evocation', description: 'A frigid beam. +spell attack, 1d8 cold damage, -10ft speed.', damage: '1d8', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'], attackRoll: true },
  { id: 'minor-illusion', name: 'Minor Illusion', level: 0, school: 'illusion', description: 'Create a sound or image of an object within range.', range: '30ft', duration: '1 minute', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'] },
  // Level 1
  { id: 'magic-missile', name: 'Magic Missile', level: 1, school: 'evocation', description: 'Three darts of magical force. Each deals 1d4+1. Auto-hit.', damage: '3d4+3', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'cure-wounds', name: 'Cure Wounds', level: 1, school: 'evocation', description: 'Touch a creature and restore 1d8+mod HP.', healAmount: 8, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'shield', name: 'Shield', level: 1, school: 'abjuration', description: 'Reaction: +5 AC until your next turn.', range: 'Self', duration: '1 round', isConcentration: false, classes: ['Wizard', 'Sorcerer'], isReaction: true },
  { id: 'burning-hands', name: 'Burning Hands', level: 1, school: 'evocation', description: '15ft cone of fire. DEX save or 3d6 fire damage. Sets target ablaze.', damage: '3d6', range: 'Self (15ft cone)', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'], appliesCondition: 'burning', conditionDuration: 2, aoe: { shape: 'cone', radiusCells: 3, color: 'rgba(251,146,60,0.25)' } },
  { id: 'healing-word', name: 'Healing Word', level: 1, school: 'evocation', description: 'Bonus action. Heal 1d4+mod HP at range.', healAmount: 5, range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard', 'Druid'] },
  { id: 'thunderwave', name: 'Thunderwave', level: 1, school: 'evocation', description: '15ft cube of thunder. CON save or 2d8 damage + pushed 10ft.', damage: '2d8', range: 'Self (15ft cube)', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Druid'], aoe: { shape: 'cube', radiusCells: 3, color: 'rgba(96,165,250,0.25)' } },
  { id: 'hellish-rebuke', name: 'Hellish Rebuke', level: 1, school: 'evocation', description: 'Reaction: when hit, deal 2d10 fire damage to attacker. DEX save for half.', damage: '2d10', range: '60ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Warlock'], isReaction: true },
  { id: 'hex', name: 'Hex', level: 1, school: 'enchantment', description: 'Curse a target. Deal extra 1d6 necrotic on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Warlock'], appliesCondition: 'hexed', conditionDuration: 3 },
  // Ritual spells (level 1)
  { id: 'detect-magic', name: 'Detect Magic', level: 1, school: 'divination', description: 'Sense magic within 30ft. See aura around magical creatures/objects.', range: 'Self', duration: 'Concentration, 10 minutes', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'], isRitual: true },
  { id: 'identify', name: 'Identify', level: 1, school: 'divination', description: 'Touch an object to learn its properties, charges, and attunement requirements.', range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Bard'], isRitual: true, components: ['V', 'S', 'M'], material: 'Pearl worth 100gp' },
  { id: 'comprehend-languages', name: 'Comprehend Languages', level: 1, school: 'divination', description: 'Understand any spoken or written language for the duration.', range: 'Self', duration: '1 hour', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'], isRitual: true },
  { id: 'find-familiar', name: 'Find Familiar', level: 1, school: 'conjuration', description: 'Summon a spirit as a familiar: owl, cat, hawk, etc. It acts independently and you can see through its senses.', range: '10ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard'], isRitual: true, components: ['V', 'S', 'M'], material: 'Charcoal, incense, herbs worth 10gp' },
  { id: 'speak-with-animals', name: 'Speak with Animals', level: 1, school: 'divination', description: 'Communicate verbally with beasts for the duration.', range: 'Self', duration: '10 minutes', isConcentration: false, classes: ['Druid', 'Ranger', 'Bard'], isRitual: true },
  { id: 'unseen-servant', name: 'Unseen Servant', level: 1, school: 'conjuration', description: 'Create an invisible, mindless force that performs simple tasks at your command.', range: '60ft', duration: '1 hour', isConcentration: false, classes: ['Wizard', 'Bard', 'Warlock'], isRitual: true },
  { id: 'hunters-mark', name: "Hunter's Mark", level: 1, school: 'divination', description: 'Mark a target. Deal extra 1d6 on each hit.', damage: '1d6', range: '90ft', duration: 'Concentration, 1 hour', isConcentration: true, classes: ['Ranger'] },
  { id: 'divine-smite-spell', name: 'Searing Smite', level: 1, school: 'evocation', description: 'Your weapon flares with fire. +1d6 fire damage on hit.', damage: '1d6', range: 'Self', duration: 'Concentration, 1 minute', isConcentration: true, classes: ['Paladin'] },
  // Level 2
  { id: 'scorching-ray', name: 'Scorching Ray', level: 2, school: 'evocation', description: 'Three rays of fire. Each +spell attack for 2d6 fire.', damage: '6d6', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'], attackRoll: true },
  { id: 'spiritual-weapon', name: 'Spiritual Weapon', level: 2, school: 'evocation', description: 'Floating spectral weapon. Bonus action attack for 1d8+mod.', damage: '1d8', range: '60ft', duration: '1 minute', isConcentration: false, classes: ['Cleric'] },
  { id: 'misty-step', name: 'Misty Step', level: 2, school: 'conjuration', description: 'Bonus action teleport up to 30ft.', range: 'Self', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
  { id: 'lesser-restoration', name: 'Lesser Restoration', level: 2, school: 'abjuration', description: 'End one disease or condition on a creature.', range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'] },
  { id: 'hold-person', name: 'Hold Person', level: 2, school: 'enchantment', description: 'WIS save or paralyzed for 1 minute (concentration).', range: '60ft', duration: 'Concentration, 1 minute', saveStat: 'WIS', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Cleric', 'Bard', 'Warlock', 'Druid'], appliesCondition: 'stunned', conditionDuration: 2 },
  // Level 3
  { id: 'fireball', name: 'Fireball', level: 3, school: 'evocation', description: '20ft radius explosion. DEX save or 8d6 fire damage.', damage: '8d6', range: '150ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'], aoe: { shape: 'circle', radiusCells: 4, color: 'rgba(239,68,68,0.25)' } },
  { id: 'spirit-guardians', name: 'Spirit Guardians', level: 3, school: 'conjuration', description: 'Spirits swirl around you. Enemies in 15ft take 3d8 radiant.', damage: '3d8', range: 'Self (15ft radius)', duration: 'Concentration, 10 minutes', saveStat: 'WIS', isConcentration: true, classes: ['Cleric'], aoe: { shape: 'circle', radiusCells: 3, color: 'rgba(251,191,36,0.25)' } },
  { id: 'revivify', name: 'Revivify', level: 3, school: 'necromancy', description: 'Touch a creature dead for less than 1 minute. It returns with 1 HP.', healAmount: 1, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Paladin', 'Druid'] },
  { id: 'counterspell', name: 'Counterspell', level: 3, school: 'abjuration', description: 'Reaction: interrupt a creature casting a spell of 3rd level or lower.', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'], isReaction: true },
  { id: 'daylight', name: 'Daylight', level: 3, school: 'evocation', description: '60ft bright light, 100ft dim. Dispels magical darkness.', range: 'Self', duration: '1 hour', isConcentration: false, classes: ['Cleric', 'Druid', 'Sorcerer', 'Paladin', 'Ranger'], appliesCondition: 'daylight', conditionDuration: 10 },
  { id: 'darkvision-spell', name: 'Darkvision', level: 2, school: 'transmutation', description: 'Touch a willing creature. 60ft darkvision for 8 hours.', range: 'Touch', duration: '8 hours', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Druid', 'Ranger'], appliesCondition: 'darkvision', conditionDuration: 10 },
  { id: 'dispel-magic', name: 'Dispel Magic', level: 3, school: 'abjuration', description: 'End magical conditions on a target. Removes buffs, debuffs, and light spells.', range: '120ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Cleric', 'Bard', 'Warlock', 'Druid', 'Paladin'] },
  // Level 4
  { id: 'dimension-door', name: 'Dimension Door', level: 4, school: 'conjuration', description: 'Teleport yourself and one willing creature up to 500ft to a spot you can see or describe.', range: '500ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'] },
  { id: 'polymorph', name: 'Polymorph', level: 4, school: 'transmutation', description: 'WIS save. Transform a creature into a beast of CR equal to its level. New HP pool.', range: '60ft', duration: 'Concentration, 1 hour', saveStat: 'WIS', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Bard', 'Druid'] },
  { id: 'greater-invisibility', name: 'Greater Invisibility', level: 4, school: 'illusion', description: 'Target is invisible for the duration, even while attacking or casting.', range: 'Touch', duration: 'Concentration, 1 minute', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Bard'] },
  { id: 'banishment', name: 'Banishment', level: 4, school: 'abjuration', description: 'CHA save. Banish a creature to a harmless demiplane for the duration.', range: '60ft', duration: 'Concentration, 1 minute', saveStat: 'CHA', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Cleric', 'Warlock', 'Paladin'] },
  { id: 'ice-storm', name: 'Ice Storm', level: 4, school: 'evocation', description: '20ft radius hail. DEX save or 2d8 bludgeoning + 4d6 cold. Difficult terrain.', damage: '6d6', range: '300ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Druid'], aoe: { shape: 'circle', radiusCells: 4, color: 'rgba(147,197,253,0.25)' } },
  { id: 'wall-of-fire', name: 'Wall of Fire', level: 4, school: 'evocation', description: 'Create a wall of fire. Creatures within 10ft of one side take 5d8 fire on failed DEX save.', damage: '5d8', range: '120ft', duration: 'Concentration, 1 minute', saveStat: 'DEX', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Druid'], aoe: { shape: 'line', radiusCells: 12, color: 'rgba(239,68,68,0.25)' } },
  { id: 'death-ward', name: 'Death Ward', level: 4, school: 'abjuration', description: 'Touch a creature. The first time it would drop to 0 HP, it drops to 1 HP instead.', range: 'Touch', duration: '8 hours', isConcentration: false, classes: ['Cleric', 'Paladin'] },
  // Level 5
  { id: 'cone-of-cold', name: 'Cone of Cold', level: 5, school: 'evocation', description: '60ft cone of cold. CON save or 8d8 cold damage.', damage: '8d8', range: 'Self (60ft cone)', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Wizard', 'Sorcerer'], aoe: { shape: 'cone', radiusCells: 12, color: 'rgba(147,197,253,0.25)' } },
  { id: 'mass-cure-wounds', name: 'Mass Cure Wounds', level: 5, school: 'evocation', description: 'Heal up to 6 creatures within 30ft for 3d8+mod HP each.', healAmount: 14, range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard', 'Druid'], aoe: { shape: 'circle', radiusCells: 6, color: 'rgba(52,211,153,0.25)' } },
  { id: 'destructive-wave', name: 'Destructive Wave', level: 5, school: 'evocation', description: 'Ground slams. 30ft radius. CON save or 5d6 thunder + 5d6 radiant and prone.', damage: '10d6', range: 'Self (30ft radius)', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Paladin'], aoe: { shape: 'circle', radiusCells: 6, color: 'rgba(251,191,36,0.25)' } },
  { id: 'raise-dead', name: 'Raise Dead', level: 5, school: 'necromancy', description: 'Return a creature dead for up to 10 days to life with 1 HP. Requires 500gp diamond.', healAmount: 1, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard', 'Paladin'], components: ['V', 'S', 'M'], material: 'Diamond worth 500gp' },
  { id: 'hold-monster', name: 'Hold Monster', level: 5, school: 'enchantment', description: 'WIS save or paralyzed. Works on any creature, not just humanoids.', range: '90ft', duration: 'Concentration, 1 minute', saveStat: 'WIS', isConcentration: true, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'], appliesCondition: 'stunned', conditionDuration: 3 },
  { id: 'telekinesis', name: 'Telekinesis', level: 5, school: 'transmutation', description: 'Move a creature or object up to 30ft. Contested check. Concentration.', range: '60ft', duration: 'Concentration, 10 minutes', isConcentration: true, classes: ['Wizard', 'Sorcerer'] },
  { id: 'greater-restoration', name: 'Greater Restoration', level: 5, school: 'abjuration', description: 'End one effect: charm, petrify, curse, ability reduction, or max HP reduction.', range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard', 'Druid'], components: ['V', 'S', 'M'], material: 'Diamond dust worth 100gp' },
  // Level 6
  { id: 'heal', name: 'Heal', level: 6, school: 'evocation', description: 'A surge of positive energy. Restore 70 HP and end blindness, deafness, and diseases.', healAmount: 70, range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid'] },
  { id: 'chain-lightning', name: 'Chain Lightning', level: 6, school: 'evocation', description: 'Lightning arcs to 4 targets. DEX save or 10d8 lightning each.', damage: '10d8', range: '150ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'disintegrate', name: 'Disintegrate', level: 6, school: 'transmutation', description: 'Green ray. DEX save or 10d6+40 force damage. 0 HP = dust.', damage: '10d6+40', range: '60ft', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  // Level 7
  { id: 'teleport', name: 'Teleport', level: 7, school: 'conjuration', description: 'Teleport yourself and up to 8 creatures to a destination you know.', range: '10ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard'] },
  { id: 'resurrection', name: 'Resurrection', level: 7, school: 'necromancy', description: 'Touch a dead creature (up to 100 years). It returns with full HP.', healAmount: 999, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Bard'], components: ['V', 'S', 'M'], material: 'Diamond worth 1,000gp' },
  { id: 'finger-of-death', name: 'Finger of Death', level: 7, school: 'necromancy', description: 'Point at a creature. CON save or 7d8+30 necrotic. 0 HP = zombie.', damage: '7d8+30', range: '60ft', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Warlock'] },
  // Level 8
  { id: 'sunburst', name: 'Sunburst', level: 8, school: 'evocation', description: '60ft radius. CON save or 12d6 radiant + blinded for 1 minute.', damage: '12d6', range: '150ft', duration: 'Instantaneous', saveStat: 'CON', isConcentration: false, classes: ['Cleric', 'Druid', 'Sorcerer'], aoe: { shape: 'circle', radiusCells: 12, color: 'rgba(253,224,71,0.25)' } },
  { id: 'power-word-stun', name: 'Power Word Stun', level: 8, school: 'enchantment', description: 'Stun a creature with 150 HP or fewer. No save. CON save each turn to end.', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'], appliesCondition: 'stunned', conditionDuration: 3 },
  // Level 9
  { id: 'wish', name: 'Wish', level: 9, school: 'conjuration', description: 'The mightiest spell. Duplicate any 8th-level or lower spell, or reshape reality at DM discretion.', range: 'Self', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer'] },
  { id: 'power-word-kill', name: 'Power Word Kill', level: 9, school: 'enchantment', description: 'Kill a creature with 100 HP or fewer. No save. One word.', range: '60ft', duration: 'Instantaneous', isConcentration: false, classes: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'] },
  { id: 'meteor-swarm', name: 'Meteor Swarm', level: 9, school: 'evocation', description: 'Four 40ft-radius spheres. DEX save or 20d6 fire + 20d6 bludgeoning.', damage: '40d6', range: '1 mile', duration: 'Instantaneous', saveStat: 'DEX', isConcentration: false, classes: ['Wizard', 'Sorcerer'], aoe: { shape: 'circle', radiusCells: 8, color: 'rgba(239,68,68,0.35)' } },
  { id: 'true-resurrection', name: 'True Resurrection', level: 9, school: 'necromancy', description: 'Restore a creature dead for up to 200 years. Full HP. Even works without a body.', healAmount: 999, range: 'Touch', duration: 'Instantaneous', isConcentration: false, classes: ['Cleric', 'Druid'], components: ['V', 'S', 'M'], material: 'Diamonds worth 25,000gp' },
];

export function getClassSpells(charClass: CharacterClass, level: number): Spell[] {
  const slots = getSpellSlots(charClass, level);
  const maxSpellLevel = Object.keys(slots).map(Number).sort((a, b) => b - a)[0] || 0;
  return SPELL_LIST.filter((s) => s.classes.includes(charClass) && s.level <= Math.max(maxSpellLevel, 0));
}

// --- Spell preparation limits (D&D 5e PHB) ---
// Casting stat per class - determines spell save DC and preparation limits
export const CASTING_STAT: Record<string, StatName> = {
  Wizard: 'INT', Sorcerer: 'CHA', Cleric: 'WIS', Druid: 'WIS',
  Bard: 'CHA', Warlock: 'CHA', Paladin: 'CHA', Ranger: 'WIS',
};

// Prepared casters choose from their full class list each long rest
export const PREPARED_CASTERS: CharacterClass[] = ['Cleric', 'Druid', 'Paladin'];

// Known casters learn a fixed number of spells (PHB tables, levels 1-20)
export const KNOWN_CASTER_SPELLS: Record<string, number[]> = {
  Bard:     [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
  Ranger:   [0, 0, 2, 3, 3, 4, 4, 5,  5,  6,  6,  7,  7,  8,  8,  9,  9,  10, 10, 11, 11],
  Sorcerer: [0, 2, 3, 4, 5, 6, 7, 8,  9,  10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
  Warlock:  [0, 2, 3, 4, 5, 6, 7, 8,  9,  10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  Wizard:   [0, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44],
};

// Wizard is a special case: learns spells into a spellbook (known count above)
// but prepares a subset each day = INT mod + wizard level.
export const WIZARD_PREPARES = true;

export type SpellPrepType = 'prepared' | 'known' | 'none';

// Determine how a class handles spell preparation
export function getSpellPrepType(charClass: CharacterClass): SpellPrepType {
  if (PREPARED_CASTERS.includes(charClass) || charClass === 'Wizard') return 'prepared';
  if (charClass in KNOWN_CASTER_SPELLS) return 'known';
  return 'none';
}

// Max prepared spells for prepared casters (Cleric, Druid, Paladin, Wizard)
// Formula: class level + ability modifier (minimum 1)
export function getMaxPreparedSpells(charClass: CharacterClass, level: number, stats: Stats): number {
  const castStat = CASTING_STAT[charClass];
  if (!castStat) return 0;
  const mod = Math.floor((stats[castStat] - 10) / 2);
  // Paladin/Ranger are half-casters: use half level (rounded down, min 1)
  const effectiveLevel = charClass === 'Paladin' ? Math.max(1, Math.floor(level / 2)) : level;
  return Math.max(1, effectiveLevel + mod);
}

// Max known spells for known casters (Bard, Ranger, Sorcerer, Warlock)
export function getMaxKnownSpells(charClass: CharacterClass, level: number): number {
  const table = KNOWN_CASTER_SPELLS[charClass];
  if (!table) return 0;
  return table[Math.min(Math.max(level, 1), 20)] || 0;
}

// Unified: get the max spell count for any caster class
export function getSpellLimit(charClass: CharacterClass, level: number, stats: Stats): { type: SpellPrepType; max: number; label: string } {
  const prepType = getSpellPrepType(charClass);
  if (prepType === 'prepared') {
    return { type: 'prepared', max: getMaxPreparedSpells(charClass, level, stats), label: 'Prepared' };
  }
  if (prepType === 'known') {
    return { type: 'known', max: getMaxKnownSpells(charClass, level), label: 'Known' };
  }
  return { type: 'none', max: 0, label: '' };
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
