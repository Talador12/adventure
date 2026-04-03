// Passive skill display — auto-compute passive Perception, Investigation, Insight.
// Passive = 10 + skill modifier (proficiency + ability mod). +5 for advantage, -5 for disadvantage.

export interface PassiveSkill {
  skill: string;
  ability: string;
  value: number;
  isProficient: boolean;
  hasAdvantage: boolean;
  hasDisadvantage: boolean;
}

export interface PassiveSkillSet {
  characterId: string;
  perception: PassiveSkill;
  investigation: PassiveSkill;
  insight: PassiveSkill;
}

export function calculatePassive(abilityScore: number, level: number, isProficient: boolean, hasExpertise: boolean = false, advantage: boolean = false, disadvantage: boolean = false): number {
  const mod = Math.floor((abilityScore - 10) / 2);
  const prof = Math.floor((level - 1) / 4) + 2;
  const profBonus = hasExpertise ? prof * 2 : isProficient ? prof : 0;
  let value = 10 + mod + profBonus;
  if (advantage && !disadvantage) value += 5;
  if (disadvantage && !advantage) value -= 5;
  return value;
}

export function computePassiveSkills(characterId: string, stats: Record<string, number>, level: number, proficientSkills: string[] = []): PassiveSkillSet {
  const make = (skill: string, ability: string): PassiveSkill => {
    const isProficient = proficientSkills.includes(skill);
    const value = calculatePassive(stats[ability] || 10, level, isProficient);
    return { skill, ability, value, isProficient, hasAdvantage: false, hasDisadvantage: false };
  };
  return { characterId, perception: make('Perception', 'WIS'), investigation: make('Investigation', 'INT'), insight: make('Insight', 'WIS') };
}

export function formatPassiveSkills(passives: PassiveSkillSet, characterName: string): string {
  const p = passives.perception; const inv = passives.investigation; const ins = passives.insight;
  return `👁️ **${characterName}**: Perception **${p.value}**${p.isProficient ? '*' : ''} | Investigation **${inv.value}**${inv.isProficient ? '*' : ''} | Insight **${ins.value}**${ins.isProficient ? '*' : ''}`;
}

export function formatPartyPassives(party: { id: string; name: string; stats: Record<string, number>; level: number; proficientSkills?: string[] }[]): string {
  const lines = ['👁️ **Party Passives:**'];
  for (const c of party) {
    const p = computePassiveSkills(c.id, c.stats, c.level, c.proficientSkills);
    lines.push(formatPassiveSkills(p, c.name));
  }
  return lines.join('\n');
}
