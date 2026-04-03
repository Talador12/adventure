// Lycanthropy progression system — stages of infection with moon-phase triggers and transformation rules.

export type LycanthropeType = 'werewolf' | 'wererat' | 'wereboar' | 'weretiger' | 'werebear';
export type MoonPhase = 'new' | 'waxing' | 'full' | 'waning';
export type InfectionStage = 'bitten' | 'feverish' | 'changing' | 'transformed' | 'embraced';

export interface LycanthropyState {
  type: LycanthropeType;
  stage: InfectionStage;
  daysSinceInfection: number;
  controlDC: number; // WIS save to resist transformation
  voluntaryTransformations: number;
  fullMoonTransformations: number;
}

export interface StageEffect {
  stage: InfectionStage;
  description: string;
  mechanicalEffect: string;
  trigger: string;
  daysToProgress: number | null;
}

export interface LycanthropeProfile {
  type: LycanthropeType;
  alignment: string;
  baseControlDC: number;
  hybridFormBonus: string;
  animalFormAbility: string;
  vulnerability: string;
  personality: string;
}

const PROFILES: LycanthropeProfile[] = [
  { type: 'werewolf', alignment: 'Chaotic Evil', baseControlDC: 15, hybridFormBonus: '+2 STR, +1 AC, bite (2d6+STR piercing)', animalFormAbility: 'Keen Hearing/Smell. Pack Tactics with other wolves/werewolves.', vulnerability: 'Silver weapons bypass resistance. Wolfsbane forces WIS save or flee.', personality: 'Aggressive urges. Heightened territorial instinct. Dreams of the hunt.' },
  { type: 'wererat', alignment: 'Lawful Evil', baseControlDC: 12, hybridFormBonus: '+2 DEX, bite (1d4+DEX piercing)', animalFormAbility: 'Keen Smell. Can squeeze through 6-inch gaps in rat form.', vulnerability: 'Silver weapons. Bright light causes disadvantage on attacks in rat form.', personality: 'Paranoid, cunning. Hoards food and shiny objects. Avoids direct confrontation.' },
  { type: 'wereboar', alignment: 'Neutral Evil', baseControlDC: 14, hybridFormBonus: '+2 CON, +1 AC, tusks (2d6+STR slashing)', animalFormAbility: 'Charge (bonus 2d6 on first hit after 15ft charge). Relentless (drop to 1 HP once).', vulnerability: 'Silver weapons. Enraged by the color red (disadvantage on WIS saves).', personality: 'Short-tempered. Eats voraciously. Stubborn beyond reason.' },
  { type: 'weretiger', alignment: 'Neutral', baseControlDC: 14, hybridFormBonus: '+2 STR, +2 DEX, claws (2d4+STR slashing)', animalFormAbility: 'Pounce (prone on charge). Keen Hearing/Smell. 40ft speed.', vulnerability: 'Silver weapons. Catnip equivalent (DM discretion) causes fascination.', personality: 'Proud, solitary. Respects strength. Hunts only what it needs.' },
  { type: 'werebear', alignment: 'Neutral Good', baseControlDC: 13, hybridFormBonus: '+3 STR, +2 CON, bite (2d8+STR piercing)', animalFormAbility: 'Keen Smell. Advantage on STR checks. Multiattack (bite + claws).', vulnerability: 'Silver weapons. Honey-based concoctions can calm a raging werebear.', personality: 'Protective of nature and innocents. Gentle when calm. Terrifying when provoked.' },
];

const STAGES: StageEffect[] = [
  { stage: 'bitten', description: 'The wound heals unnaturally fast. You feel fine. Too fine.', mechanicalEffect: 'Wound closes in 1 hour. Advantage on CON saves vs disease. Sensitivity to moonlight (mild discomfort).', trigger: 'Bitten by a lycanthrope (CON save vs type DC to resist infection entirely)', daysToProgress: 3 },
  { stage: 'feverish', description: 'Fever, vivid dreams of running on all fours, heightened senses.', mechanicalEffect: 'Advantage on Perception (smell/hearing). Disadvantage on social checks (irritable). Eating raw meat feels... right.', trigger: 'Automatic 3 days after bite if not cured', daysToProgress: 7 },
  { stage: 'changing', description: 'Involuntary partial transformations. Teeth sharpen. Nails thicken. Eyes glow at night.', mechanicalEffect: 'WIS save (DC = type base) each night or partially transform for 1d4 hours. +1 STR, -1 CHA. Darkvision 60ft.', trigger: 'Automatic 7 days after feverish stage', daysToProgress: null },
  { stage: 'transformed', description: 'Full transformation on full moons. The beast takes over.', mechanicalEffect: 'Full moon: automatic transformation, DM controls until WIS save DC succeeds. Hybrid form stats. No memory of actions.', trigger: 'First full moon after reaching changing stage', daysToProgress: null },
  { stage: 'embraced', description: 'You\'ve accepted the beast. You and it are one.', mechanicalEffect: 'Voluntary transformation at will. Retain personality and memories. Hybrid form bonus permanent when transformed. Silver vulnerability.', trigger: 'Voluntarily transform 3 times without resisting, or complete a lycanthrope mentor quest', daysToProgress: null },
];

export function createLycanthropyState(type: LycanthropeType): LycanthropyState {
  const profile = getProfile(type);
  return { type, stage: 'bitten', daysSinceInfection: 0, controlDC: profile?.baseControlDC ?? 14, voluntaryTransformations: 0, fullMoonTransformations: 0 };
}

export function advanceInfection(state: LycanthropyState, days: number = 1): LycanthropyState {
  const newDays = state.daysSinceInfection + days;
  let newStage = state.stage;
  if ((newStage === 'bitten') && newDays >= 3) newStage = 'feverish';
  if ((newStage === 'feverish') && newDays >= 10) newStage = 'changing';
  return { ...state, daysSinceInfection: newDays, stage: newStage };
}

export function triggerTransformation(state: LycanthropyState, voluntary: boolean): LycanthropyState {
  const newState = { ...state };
  if (voluntary) { newState.voluntaryTransformations++; } else { newState.fullMoonTransformations++; }
  if (newState.stage === 'changing') newState.stage = 'transformed';
  if (newState.voluntaryTransformations >= 3 && newState.stage === 'transformed') newState.stage = 'embraced';
  return newState;
}

export function canCure(state: LycanthropyState): { possible: boolean; method: string } {
  if (state.stage === 'bitten' || state.stage === 'feverish') return { possible: true, method: 'Remove Curse (any level) or wolfsbane potion within the first 10 days.' };
  if (state.stage === 'changing') return { possible: true, method: 'Remove Curse (5th level+) or Greater Restoration.' };
  if (state.stage === 'transformed') return { possible: true, method: 'Wish spell, or slay the lycanthrope who infected you under a full moon.' };
  return { possible: false, method: 'The curse is fully embraced. Only a Wish or divine intervention can reverse it now.' };
}

export function getProfile(type: LycanthropeType): LycanthropeProfile | undefined {
  return PROFILES.find((p) => p.type === type);
}

export function getStageInfo(stage: InfectionStage): StageEffect | undefined {
  return STAGES.find((s) => s.stage === stage);
}

export function getAllTypes(): LycanthropeType[] {
  return PROFILES.map((p) => p.type);
}

export function formatLycanthropy(state: LycanthropyState): string {
  const profile = getProfile(state.type);
  const stageInfo = getStageInfo(state.stage);
  const icon = { werewolf: '🐺', wererat: '🐀', wereboar: '🐗', weretiger: '🐯', werebear: '🐻' }[state.type];
  const lines = [`${icon} **${state.type}** — Stage: ${state.stage.toUpperCase()} (Day ${state.daysSinceInfection})`];
  if (stageInfo) lines.push(`  *${stageInfo.description}*`);
  if (stageInfo) lines.push(`  Effect: ${stageInfo.mechanicalEffect}`);
  if (profile) lines.push(`  Control DC: ${state.controlDC} | Vulnerability: ${profile.vulnerability}`);
  const cure = canCure(state);
  lines.push(`  💊 Cure: ${cure.possible ? cure.method : 'No longer curable by normal means.'}`);
  return lines.join('\n');
}

export { PROFILES as LYCANTHROPE_PROFILES, STAGES as LYCANTHROPY_STAGES };
