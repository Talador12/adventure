// Proficiency check helper — auto-apply proficiency bonus to checks.

export type CheckType = 'skill' | 'tool' | 'save' | 'weapon';

export interface ProficiencyCheckResult {
  ability: string;
  abilityMod: number;
  proficiencyBonus: number;
  isProficient: boolean;
  hasExpertise: boolean;
  totalBonus: number;
  roll: number;
  total: number;
  description: string;
}

export const SKILL_ABILITIES: Record<string, string> = {
  Acrobatics: 'DEX', 'Animal Handling': 'WIS', Arcana: 'INT', Athletics: 'STR',
  Deception: 'CHA', History: 'INT', Insight: 'WIS', Intimidation: 'CHA',
  Investigation: 'INT', Medicine: 'WIS', Nature: 'INT', Perception: 'WIS',
  Performance: 'CHA', Persuasion: 'CHA', Religion: 'INT', 'Sleight of Hand': 'DEX',
  Stealth: 'DEX', Survival: 'WIS',
};

export function getSkillAbility(skill: string): string {
  return SKILL_ABILITIES[skill] || 'STR';
}

export function calculateCheckBonus(
  abilityScore: number,
  level: number,
  isProficient: boolean,
  hasExpertise: boolean = false,
): { abilityMod: number; profBonus: number; total: number } {
  const abilityMod = Math.floor((abilityScore - 10) / 2);
  const profBonus = Math.floor((level - 1) / 4) + 2;
  const profMultiplier = hasExpertise ? 2 : isProficient ? 1 : 0;
  return { abilityMod, profBonus: profBonus * profMultiplier, total: abilityMod + profBonus * profMultiplier };
}

export function rollCheck(
  skill: string,
  abilityScore: number,
  level: number,
  isProficient: boolean,
  hasExpertise: boolean = false,
  advantage: boolean = false,
  disadvantage: boolean = false,
): ProficiencyCheckResult {
  const ability = getSkillAbility(skill);
  const { abilityMod, profBonus, total: totalBonus } = calculateCheckBonus(abilityScore, level, isProficient, hasExpertise);

  let roll1 = Math.floor(Math.random() * 20) + 1;
  let roll2 = Math.floor(Math.random() * 20) + 1;
  const roll = advantage && !disadvantage ? Math.max(roll1, roll2) : disadvantage && !advantage ? Math.min(roll1, roll2) : roll1;
  const total = roll + totalBonus;

  return {
    ability, abilityMod, proficiencyBonus: profBonus, isProficient, hasExpertise, totalBonus, roll, total,
    description: `${skill} (${ability}): d20(${roll}) + ${totalBonus} = **${total}**${isProficient ? ' (proficient)' : ''}${hasExpertise ? ' (expertise)' : ''}`,
  };
}

export function formatCheckResult(result: ProficiencyCheckResult, characterName: string): string {
  return `🎲 **${characterName}** — ${result.description}`;
}
