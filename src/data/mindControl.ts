// Mind control resistance system — progressive willpower degradation and break-free mechanics.

export type ControlSource = 'enchantment' | 'psionic' | 'demonic' | 'parasitic' | 'fey_charm' | 'vampiric';
export type ResistanceStage = 'aware' | 'struggling' | 'slipping' | 'dominated' | 'puppet';

export interface MindControlState {
  source: ControlSource;
  stage: ResistanceStage;
  willpower: number; // 0-10 (0 = fully controlled)
  savesAttempted: number;
  savesMade: number;
  breakFreeConditions: string[];
}

export interface ControlProfile {
  source: ControlSource;
  initialSaveDC: number;
  escalationRate: number; // DC increase per failed save
  degradationPerRound: number; // willpower lost per round
  breakFreeMethod: string;
  narrativeEffect: string;
  allyAssistBonus: number; // bonus when ally helps break free
}

const PROFILES: ControlProfile[] = [
  { source: 'enchantment', initialSaveDC: 14, escalationRate: 1, degradationPerRound: 1, breakFreeMethod: 'Take damage, or ally uses action to shake you (Persuasion DC 12).', narrativeEffect: 'The victim feels dreamy, compliant. Actions seem reasonable until control breaks.', allyAssistBonus: 3 },
  { source: 'psionic', initialSaveDC: 15, escalationRate: 2, degradationPerRound: 2, breakFreeMethod: 'INT save instead of WIS. Psychic damage gives advantage on next save.', narrativeEffect: 'Splitting headache. The victim hears two sets of thoughts — theirs and the controller\'s.', allyAssistBonus: 2 },
  { source: 'demonic', initialSaveDC: 16, escalationRate: 1, degradationPerRound: 1, breakFreeMethod: 'Protection from Evil and Good, or holy symbol presented (Religion DC 14).', narrativeEffect: 'Eyes glow. Voice distorts. The victim knows something is wrong but can\'t stop.', allyAssistBonus: 4 },
  { source: 'parasitic', initialSaveDC: 13, escalationRate: 0, degradationPerRound: 1, breakFreeMethod: 'Remove the parasite (Medicine DC 15) or kill it (targets the host\'s body).', narrativeEffect: 'Personality changes subtly over days. By the time others notice, it may be too late.', allyAssistBonus: 2 },
  { source: 'fey_charm', initialSaveDC: 14, escalationRate: 1, degradationPerRound: 1, breakFreeMethod: 'The charmer harms the victim, or victim sees proof of the charm (Insight DC 15).', narrativeEffect: 'The victim genuinely believes the fey is their best friend. They\'ll argue against being freed.', allyAssistBonus: 3 },
  { source: 'vampiric', initialSaveDC: 15, escalationRate: 2, degradationPerRound: 2, breakFreeMethod: 'Sunlight, or the vampire gives a command that directly harms the victim\'s loved ones.', narrativeEffect: 'Addictive obedience. The victim craves the vampire\'s approval. Withdrawal is painful.', allyAssistBonus: 2 },
];

const STAGE_THRESHOLDS: { min: number; stage: ResistanceStage }[] = [
  { min: 8, stage: 'aware' },
  { min: 5, stage: 'struggling' },
  { min: 2, stage: 'slipping' },
  { min: 1, stage: 'dominated' },
  { min: 0, stage: 'puppet' },
];

export function createMindControlState(source: ControlSource): MindControlState {
  const profile = getControlProfile(source);
  return { source, stage: 'aware', willpower: 10, savesAttempted: 0, savesMade: 0, breakFreeConditions: [profile?.breakFreeMethod ?? 'Unknown'] };
}

export function degradeWillpower(state: MindControlState): MindControlState {
  const profile = getControlProfile(state.source);
  const loss = profile?.degradationPerRound ?? 1;
  const newWP = Math.max(0, state.willpower - loss);
  return { ...state, willpower: newWP, stage: getStageFromWillpower(newWP), savesAttempted: state.savesAttempted + 1 };
}

export function resistSuccessfully(state: MindControlState): MindControlState {
  const newWP = Math.min(10, state.willpower + 2);
  return { ...state, willpower: newWP, stage: getStageFromWillpower(newWP), savesMade: state.savesMade + 1 };
}

export function breakFree(state: MindControlState): MindControlState {
  return { ...state, willpower: 10, stage: 'aware', savesAttempted: state.savesAttempted, savesMade: state.savesMade + 1 };
}

function getStageFromWillpower(wp: number): ResistanceStage {
  for (const t of STAGE_THRESHOLDS) { if (wp >= t.min) return t.stage; }
  return 'puppet';
}

export function getControlProfile(source: ControlSource): ControlProfile | undefined {
  return PROFILES.find((p) => p.source === source);
}

export function getCurrentSaveDC(state: MindControlState): number {
  const profile = getControlProfile(state.source);
  if (!profile) return 15;
  return profile.initialSaveDC + (state.savesAttempted - state.savesMade) * profile.escalationRate;
}

export function isFullyControlled(state: MindControlState): boolean {
  return state.willpower === 0;
}

export function getAllControlSources(): ControlSource[] {
  return PROFILES.map((p) => p.source);
}

export function formatMindControlState(state: MindControlState): string {
  const icon = { aware: '🟢', struggling: '🟡', slipping: '🟠', dominated: '🔴', puppet: '💀' }[state.stage];
  const lines = [`${icon} **Mind Control: ${state.stage.toUpperCase()}** (${state.source.replace(/_/g, ' ')})`];
  lines.push(`  Willpower: ${'█'.repeat(state.willpower)}${'░'.repeat(10 - state.willpower)} ${state.willpower}/10`);
  lines.push(`  Save DC: ${getCurrentSaveDC(state)} | Saves: ${state.savesMade}/${state.savesAttempted}`);
  lines.push(`  Break free: ${state.breakFreeConditions.join(' OR ')}`);
  return lines.join('\n');
}

export { PROFILES as CONTROL_PROFILES };
