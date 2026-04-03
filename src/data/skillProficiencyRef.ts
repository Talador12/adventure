// Skill proficiency reference — which classes get which skill choices.
export const CLASS_SKILL_OPTIONS: Record<string, { choices: number; from: string[] }> = {
  Barbarian: { choices: 2, from: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'] },
  Bard: { choices: 3, from: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'] },
  Cleric: { choices: 2, from: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'] },
  Druid: { choices: 2, from: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'] },
  Fighter: { choices: 2, from: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'] },
  Monk: { choices: 2, from: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'] },
  Paladin: { choices: 2, from: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'] },
  Ranger: { choices: 3, from: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'] },
  Rogue: { choices: 4, from: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'] },
  Sorcerer: { choices: 2, from: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'] },
  Warlock: { choices: 2, from: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'] },
  Wizard: { choices: 2, from: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'] },
};
export function getSkillOptions(charClass: string): { choices: number; from: string[] } { return CLASS_SKILL_OPTIONS[charClass] || { choices: 2, from: [] }; }
export function formatSkillProficiencyRef(): string { const lines = ['📋 **Skill Proficiency by Class:**']; for (const [cls, opts] of Object.entries(CLASS_SKILL_OPTIONS)) lines.push(`**${cls}** (choose ${opts.choices}): ${opts.from.join(', ')}`); return lines.join('\n'); }
