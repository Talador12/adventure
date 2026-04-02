// Combat initiative variants — alternative initiative systems.
// Standard (individual), side (team-based), popcorn (player-chosen), speed factor.

export type InitiativeVariant = 'standard' | 'side' | 'popcorn' | 'speed_factor';

export interface InitiativeConfig {
  variant: InitiativeVariant;
  name: string;
  description: string;
  rules: string;
}

export const INITIATIVE_VARIANTS: InitiativeConfig[] = [
  {
    variant: 'standard', name: 'Standard (Individual)',
    description: 'Each creature rolls initiative individually. Classic D&D 5e.',
    rules: 'Each unit rolls d20 + DEX modifier. Turn order goes high to low.',
  },
  {
    variant: 'side', name: 'Side Initiative',
    description: 'One roll per side (players vs enemies). Entire side acts together.',
    rules: 'One player rolls for the party, DM rolls for enemies. Winning side goes first, each member acts in any order.',
  },
  {
    variant: 'popcorn', name: 'Popcorn Initiative',
    description: 'After your turn, you choose who goes next. Creates dynamic flow.',
    rules: 'First turn is random. After acting, you pick any unit (friend or foe) to go next. Each unit acts once per round.',
  },
  {
    variant: 'speed_factor', name: 'Speed Factor',
    description: 'Initiative modified by action type. Fast actions go first.',
    rules: 'Roll d20 + DEX mod + action modifier: melee +0, ranged +2, spell -2 (per level), move-only +5, heavy weapon -2.',
  },
];

export interface SideInitiativeResult {
  playerRoll: number;
  enemyRoll: number;
  playersGoFirst: boolean;
}

export function rollSideInitiative(): SideInitiativeResult {
  const playerRoll = Math.floor(Math.random() * 20) + 1;
  const enemyRoll = Math.floor(Math.random() * 20) + 1;
  return {
    playerRoll,
    enemyRoll,
    playersGoFirst: playerRoll >= enemyRoll, // ties go to players
  };
}

export interface SpeedFactorModifier {
  action: string;
  modifier: number;
}

export const SPEED_FACTOR_MODIFIERS: SpeedFactorModifier[] = [
  { action: 'Melee attack', modifier: 0 },
  { action: 'Ranged attack', modifier: 2 },
  { action: 'Move only', modifier: 5 },
  { action: 'Cantrip', modifier: 0 },
  { action: 'Spell (1st)', modifier: -1 },
  { action: 'Spell (2nd)', modifier: -2 },
  { action: 'Spell (3rd+)', modifier: -3 },
  { action: 'Heavy weapon', modifier: -2 },
  { action: 'Light weapon', modifier: 2 },
  { action: 'Use object', modifier: 3 },
  { action: 'Dodge/Disengage', modifier: 3 },
];

export function rollSpeedFactorInitiative(dexMod: number, actionModifier: number): number {
  return Math.floor(Math.random() * 20) + 1 + dexMod + actionModifier;
}

export function getVariantConfig(variant: InitiativeVariant): InitiativeConfig {
  return INITIATIVE_VARIANTS.find((v) => v.variant === variant) || INITIATIVE_VARIANTS[0];
}

export function formatVariantRules(variant: InitiativeVariant): string {
  const config = getVariantConfig(variant);
  return `🎲 **${config.name}**\n${config.description}\n*Rules: ${config.rules}*`;
}
