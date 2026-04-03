// Ability score improvement planner — ASI options + feat recommendations at level-up.
// Shows when ASIs are available and suggests optimal choices per class/stats.

export interface ASIOption {
  type: 'asi' | 'feat';
  name: string;
  description: string;
  recommendation: string;
}

export const ASI_LEVELS = [4, 8, 12, 16, 19]; // standard ASI levels
export const FIGHTER_BONUS_ASI = [6, 14]; // fighters get extras
export const ROGUE_BONUS_ASI = [10]; // rogues get one extra

export function getASILevels(charClass: string): number[] {
  const levels = [...ASI_LEVELS];
  if (charClass === 'Fighter') levels.push(...FIGHTER_BONUS_ASI);
  if (charClass === 'Rogue') levels.push(...ROGUE_BONUS_ASI);
  return levels.sort((a, b) => a - b);
}

export function isASILevel(charClass: string, level: number): boolean {
  return getASILevels(charClass).includes(level);
}

export function getNextASILevel(charClass: string, currentLevel: number): number | null {
  const levels = getASILevels(charClass);
  return levels.find((l) => l > currentLevel) || null;
}

export interface FeatRecommendation {
  name: string;
  description: string;
  goodFor: string[];
  statBoost?: string;
}

export const POPULAR_FEATS: FeatRecommendation[] = [
  { name: 'Great Weapon Master', description: '+10 damage at -5 to hit. Bonus attack on crit/kill.', goodFor: ['Fighter', 'Barbarian', 'Paladin'], statBoost: undefined },
  { name: 'Sharpshooter', description: '+10 damage at -5 to hit (ranged). Ignore cover penalties.', goodFor: ['Ranger', 'Fighter', 'Rogue'] },
  { name: 'War Caster', description: 'Advantage on concentration saves. Somatic components with full hands.', goodFor: ['Wizard', 'Sorcerer', 'Cleric', 'Druid', 'Bard', 'Warlock'] },
  { name: 'Resilient (CON)', description: 'Proficiency in CON saves. +1 CON.', goodFor: ['Wizard', 'Sorcerer', 'Bard', 'Warlock'], statBoost: 'CON' },
  { name: 'Lucky', description: '3 luck points per day. Reroll attacks, saves, or checks.', goodFor: ['Fighter', 'Barbarian', 'Ranger', 'Rogue', 'Wizard', 'Sorcerer', 'Cleric', 'Druid', 'Bard', 'Warlock', 'Paladin', 'Monk'] },
  { name: 'Sentinel', description: 'OA on Disengage. Reduce speed to 0 on OA hit. React when ally is attacked.', goodFor: ['Fighter', 'Paladin', 'Barbarian'] },
  { name: 'Polearm Master', description: 'Bonus action butt-end attack. OA when enemies enter reach.', goodFor: ['Fighter', 'Paladin', 'Barbarian'] },
  { name: 'Shield Master', description: 'Bonus action shove with shield. Add shield AC to DEX saves.', goodFor: ['Fighter', 'Paladin', 'Cleric'] },
  { name: 'Alert', description: '+5 initiative. Can\'t be surprised. No advantage for hidden attackers.', goodFor: ['Rogue', 'Ranger', 'Wizard', 'Bard'] },
  { name: 'Tough', description: '+2 HP per level.', goodFor: ['Barbarian', 'Fighter', 'Cleric', 'Druid'], statBoost: undefined },
];

export function recommendFeats(charClass: string, stats: Record<string, number>): FeatRecommendation[] {
  return POPULAR_FEATS.filter((f) => f.goodFor.includes(charClass)).slice(0, 5);
}

export function suggestASI(stats: Record<string, number>, charClass: string): string {
  // Find the primary stat and check if it's maxed (20)
  const primaryStats: Record<string, string> = {
    Fighter: 'STR', Barbarian: 'STR', Paladin: 'STR', Ranger: 'DEX', Rogue: 'DEX', Monk: 'DEX',
    Wizard: 'INT', Sorcerer: 'CHA', Warlock: 'CHA', Cleric: 'WIS', Druid: 'WIS', Bard: 'CHA',
  };
  const primary = primaryStats[charClass] || 'STR';
  const primaryScore = stats[primary] || 10;

  if (primaryScore < 20) {
    const odd = primaryScore % 2 === 1;
    if (odd) return `+1 ${primary} (${primaryScore}→${primaryScore + 1}, unlocks modifier increase) + 1 to another odd stat`;
    return `+2 ${primary} (${primaryScore}→${primaryScore + 2}) to boost your primary ability`;
  }
  return `Primary stat maxed! Consider a feat or boosting CON (${stats['CON'] || 10})`;
}

export function formatASIPlan(charClass: string, level: number, stats: Record<string, number>): string {
  const asiLevels = getASILevels(charClass);
  const nextASI = getNextASILevel(charClass, level);
  const feats = recommendFeats(charClass, stats);
  const suggestion = suggestASI(stats, charClass);

  const lines = [`📈 **ASI Planner** (${charClass} Lv ${level}):`];
  lines.push(`ASI Levels: ${asiLevels.join(', ')}`);
  lines.push(`Next ASI: ${nextASI ? `Level ${nextASI} (${nextASI - level} levels away)` : 'All ASIs used!'}`);
  lines.push(`\n**Suggested ASI:** ${suggestion}`);
  if (feats.length > 0) {
    lines.push('\n**Recommended Feats:**');
    for (const f of feats) lines.push(`• **${f.name}**: ${f.description}`);
  }
  return lines.join('\n');
}
