// Multiclass spell slot calculation per D&D 5e PHB p164-165.
// Each caster class contributes a "caster level" that is summed
// and looked up against the Multiclass Spellcaster table.

import type { CharacterClass } from '../types/game';
import { FULL_CASTER_SLOTS, FULL_CASTERS, HALF_CASTERS } from './spells';

// Caster weight: full casters count 1:1, half casters count 0.5 (rounded down).
// Non-casters (Fighter, Barbarian, Rogue, Monk) contribute 0.
// Warlock pact magic is separate and never combined.
const CASTER_WEIGHT: Partial<Record<CharacterClass, number>> = {
  Wizard: 1, Sorcerer: 1, Cleric: 1, Druid: 1, Bard: 1,
  Paladin: 0.5, Ranger: 0.5,
};

// Compute the effective caster level from a multiclass split.
export function getMulticlassCasterLevel(classLevels: Partial<Record<CharacterClass, number>>): number {
  let total = 0;
  for (const [cls, lvl] of Object.entries(classLevels)) {
    if (cls === 'Warlock') continue; // pact magic is separate
    const weight = CASTER_WEIGHT[cls as CharacterClass] ?? 0;
    total += Math.floor((lvl || 0) * weight);
  }
  return Math.min(20, Math.max(0, total));
}

// Get combined spell slots for a multiclass character.
// Returns the PHB multiclass table slots (same table as full caster, keyed by combined caster level).
// Warlock slots are NOT included here - they stay separate per the pact magic rules.
export function getMulticlassSpellSlots(classLevels: Partial<Record<CharacterClass, number>>): Record<number, number> {
  const casterLevel = getMulticlassCasterLevel(classLevels);
  if (casterLevel <= 0) return {};
  return FULL_CASTER_SLOTS[casterLevel] || {};
}

// Determine if a character should use multiclass spell slot calculation.
// True when classLevels has 2+ caster classes (non-martial, non-warlock).
export function isMulticlassCaster(classLevels: Partial<Record<CharacterClass, number>>): boolean {
  let casterCount = 0;
  for (const cls of Object.keys(classLevels)) {
    if (cls === 'Warlock') continue;
    if (FULL_CASTERS.includes(cls as CharacterClass) || HALF_CASTERS.includes(cls as CharacterClass)) {
      if ((classLevels[cls as CharacterClass] || 0) > 0) casterCount++;
    }
  }
  return casterCount >= 2;
}
