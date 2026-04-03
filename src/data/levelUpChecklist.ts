// Level-up checklist — step-by-step what to do when leveling up.

export interface LevelUpStep { step: number; title: string; description: string; applies: string; }

export const LEVEL_UP_STEPS: LevelUpStep[] = [
  { step: 1, title: 'Increase Hit Points', description: 'Roll hit die (or take average) + CON modifier. Add to max HP.', applies: 'All classes' },
  { step: 2, title: 'Check Proficiency Bonus', description: 'Increases at levels 5, 9, 13, 17. Updates attacks, saves, skills.', applies: 'All classes' },
  { step: 3, title: 'Gain Class Features', description: 'Check your class table for new features at this level.', applies: 'All classes' },
  { step: 4, title: 'ASI or Feat (Lv 4, 8, 12, 16, 19)', description: '+2 to one ability or +1/+1, OR take a feat.', applies: 'ASI levels only' },
  { step: 5, title: 'Learn New Spells', description: 'Known casters learn new spells. Prepared casters update prep list.', applies: 'Spellcasters' },
  { step: 6, title: 'Gain Spell Slots', description: 'Check spell slot table for new or upgraded slots.', applies: 'Spellcasters' },
  { step: 7, title: 'Update Attack Bonus', description: 'If proficiency increased, update all attack rolls.', applies: 'All classes' },
  { step: 8, title: 'Update Save DCs', description: 'Spell save DC and ability save DCs may change.', applies: 'Spellcasters' },
  { step: 9, title: 'Check Subclass', description: 'Subclass gained at level 1, 2, or 3 depending on class.', applies: 'Subclass levels' },
  { step: 10, title: 'Update Hit Dice', description: 'Total hit dice = character level. Add one more.', applies: 'All classes' },
];

export function getStepsForLevel(level: number, charClass: string): LevelUpStep[] {
  const isASI = [4, 8, 12, 16, 19].includes(level) || (charClass === 'Fighter' && [6, 14].includes(level)) || (charClass === 'Rogue' && level === 10);
  const isCaster = ['Wizard', 'Sorcerer', 'Bard', 'Cleric', 'Druid', 'Warlock', 'Paladin', 'Ranger'].includes(charClass);
  return LEVEL_UP_STEPS.filter((s) => {
    if (s.applies === 'All classes') return true;
    if (s.applies === 'ASI levels only') return isASI;
    if (s.applies === 'Spellcasters') return isCaster;
    if (s.applies === 'Subclass levels') return [1, 2, 3].includes(level);
    return true;
  });
}

export function formatLevelUpChecklist(level: number, charClass: string, characterName: string): string {
  const steps = getStepsForLevel(level, charClass);
  const lines = [`📈 **${characterName} → Level ${level}** (${charClass}):`];
  for (const s of steps) lines.push(`${s.step}. ☐ **${s.title}**: ${s.description}`);
  return lines.join('\n');
}
