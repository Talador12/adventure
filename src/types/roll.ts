export type AdvantageMode = 'advantage' | 'disadvantage';

export interface RollBonus {
  label: string;
  value: number;
}

export interface RollPresentation {
  rollId: string;
  playerId?: string;
  username: string;
  avatar?: string;
  unitName?: string;
  die: string;
  sides: number;
  count: number;
  allRolls: number[];
  keptRolls: number[];
  total: number;
  advMode?: AdvantageMode;
  isCritical?: boolean;
  isFumble?: boolean;
  dc?: number;
  bonuses?: RollBonus[];
  animationMs?: number;
  presentationMs?: number;
  timestamp: number;
  vetoed?: boolean;
  vetoedBy?: string;
}
