// Initiative tiebreaker rules — configurable house rules for tied initiative.

export type TiebreakerRule = 'dex_mod' | 'dex_score' | 'player_first' | 'enemy_first' | 'coin_flip' | 'higher_level';

export interface TiebreakerConfig {
  rule: TiebreakerRule;
  name: string;
  description: string;
}

export const TIEBREAKER_RULES: TiebreakerConfig[] = [
  { rule: 'dex_mod', name: 'DEX Modifier', description: 'Higher DEX modifier goes first. If still tied, use DEX score.' },
  { rule: 'dex_score', name: 'DEX Score', description: 'Higher DEX score goes first. RAW 5e tiebreaker.' },
  { rule: 'player_first', name: 'Players First', description: 'On a tie, player characters always go before enemies.' },
  { rule: 'enemy_first', name: 'Enemies First', description: 'On a tie, enemies go first. More challenging for players.' },
  { rule: 'coin_flip', name: 'Coin Flip', description: 'Random 50/50 on each tie. Fairest but slowest.' },
  { rule: 'higher_level', name: 'Higher Level/CR', description: 'Higher character level or CR goes first.' },
];

export interface TiebreakerUnit {
  id: string;
  name: string;
  initiative: number;
  dexMod: number;
  dexScore: number;
  isPlayer: boolean;
  level: number;
}

export function resolveTiebreaker(a: TiebreakerUnit, b: TiebreakerUnit, rule: TiebreakerRule): number {
  // Returns negative if a goes first, positive if b goes first, 0 if truly tied
  switch (rule) {
    case 'dex_mod': {
      const diff = b.dexMod - a.dexMod;
      return diff !== 0 ? diff : b.dexScore - a.dexScore;
    }
    case 'dex_score':
      return b.dexScore - a.dexScore;
    case 'player_first':
      if (a.isPlayer && !b.isPlayer) return -1;
      if (!a.isPlayer && b.isPlayer) return 1;
      return b.dexMod - a.dexMod;
    case 'enemy_first':
      if (!a.isPlayer && b.isPlayer) return -1;
      if (a.isPlayer && !b.isPlayer) return 1;
      return b.dexMod - a.dexMod;
    case 'coin_flip':
      return Math.random() > 0.5 ? -1 : 1;
    case 'higher_level':
      return b.level - a.level;
    default:
      return b.dexMod - a.dexMod;
  }
}

export function sortInitiativeWithTiebreaker(units: TiebreakerUnit[], rule: TiebreakerRule): TiebreakerUnit[] {
  return [...units].sort((a, b) => {
    const initDiff = b.initiative - a.initiative;
    if (initDiff !== 0) return initDiff;
    return resolveTiebreaker(a, b, rule);
  });
}

export function getTiebreakerConfig(rule: TiebreakerRule): TiebreakerConfig {
  return TIEBREAKER_RULES.find((r) => r.rule === rule) || TIEBREAKER_RULES[0];
}

export function formatTiebreakerRules(): string {
  const lines = ['🎲 **Initiative Tiebreaker Rules:**'];
  for (const r of TIEBREAKER_RULES) {
    lines.push(`• **${r.name}**: ${r.description}`);
  }
  return lines.join('\n');
}
