// Spell save DC calculator — auto-compute save DCs from caster stats + proficiency.
// Also computes spell attack bonus.

export type CasterType = 'Wizard' | 'Sorcerer' | 'Warlock' | 'Cleric' | 'Druid' | 'Bard' | 'Paladin' | 'Ranger' | 'Artificer';

export const CASTER_ABILITY: Record<CasterType, string> = {
  Wizard: 'INT', Sorcerer: 'CHA', Warlock: 'CHA',
  Cleric: 'WIS', Druid: 'WIS', Bard: 'CHA',
  Paladin: 'CHA', Ranger: 'WIS', Artificer: 'INT',
};

export interface SpellSaveDCResult {
  saveDC: number;
  spellAttackBonus: number;
  castingAbility: string;
  abilityMod: number;
  proficiencyBonus: number;
  breakdown: string;
}

export function getCastingAbility(charClass: string): string {
  return CASTER_ABILITY[charClass as CasterType] || 'INT';
}

export function calculateProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

export function calculateSpellSaveDC(
  charClass: string,
  level: number,
  stats: Record<string, number>,
): SpellSaveDCResult {
  const ability = getCastingAbility(charClass);
  const score = stats[ability] || 10;
  const abilityMod = Math.floor((score - 10) / 2);
  const profBonus = calculateProficiencyBonus(level);
  const saveDC = 8 + profBonus + abilityMod;
  const spellAttackBonus = profBonus + abilityMod;

  return {
    saveDC,
    spellAttackBonus,
    castingAbility: ability,
    abilityMod,
    proficiencyBonus: profBonus,
    breakdown: `DC ${saveDC} = 8 + Prof(${profBonus}) + ${ability} mod(${abilityMod >= 0 ? '+' : ''}${abilityMod})  |  Spell Attack: +${spellAttackBonus}`,
  };
}

export function formatSpellSaveDC(characterName: string, charClass: string, result: SpellSaveDCResult): string {
  return `🎯 **${characterName}** (${charClass}): Spell Save DC **${result.saveDC}** | Spell Attack **+${result.spellAttackBonus}**\n${result.breakdown}`;
}

export function formatPartySpellDCs(
  characters: { name: string; class: string; level: number; stats: Record<string, number> }[],
): string {
  const casters = characters.filter((c) => CASTER_ABILITY[c.class as CasterType]);
  if (casters.length === 0) return '🎯 No spellcasters in the party.';
  const lines = ['🎯 **Party Spell Save DCs:**'];
  for (const c of casters) {
    const result = calculateSpellSaveDC(c.class, c.level, c.stats);
    lines.push(`• **${c.name}** (${c.class}): DC ${result.saveDC} | Attack +${result.spellAttackBonus} (${result.castingAbility})`);
  }
  return lines.join('\n');
}
