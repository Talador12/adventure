// Terrain hazard escalation — environmental dangers that worsen each round.
// Spreading fire, rising water, collapsing ceiling, creeping fog, etc.

export type EscalationType = 'fire' | 'flood' | 'collapse' | 'fog' | 'ice' | 'acid';

export interface EscalationState {
  type: EscalationType;
  name: string;
  emoji: string;
  currentRound: number;
  affectedCells: number;
  maxCells: number;
  damagePerRound: number;
  description: string;
  saveDC: number;
  saveAbility: string;
}

export interface EscalationConfig {
  type: EscalationType;
  name: string;
  emoji: string;
  baseDamage: number;
  damageScaling: number; // extra damage per round
  cellsPerRound: number; // new cells affected each round
  maxCells: number;
  saveDC: number;
  saveAbility: string;
  description: string;
  roundDescriptions: string[];
}

export const ESCALATION_CONFIGS: EscalationConfig[] = [
  { type: 'fire', name: 'Spreading Fire', emoji: '🔥', baseDamage: 2, damageScaling: 1, cellsPerRound: 4, maxCells: 40, saveDC: 12, saveAbility: 'DEX',
    description: 'Flames leap from surface to surface, consuming everything.',
    roundDescriptions: ['Embers smolder.', 'Flames catch and spread.', 'The fire roars hungrily.', 'The heat is unbearable.', 'An inferno engulfs the area.'] },
  { type: 'flood', name: 'Rising Water', emoji: '🌊', baseDamage: 0, damageScaling: 0, cellsPerRound: 6, maxCells: 60, saveDC: 13, saveAbility: 'STR',
    description: 'Water rises steadily. Soon it will be impossible to stand.',
    roundDescriptions: ['Ankle-deep water seeps in.', 'Water reaches your knees.', 'The current strengthens.', 'Waist-deep — swimming required.', 'The chamber is nearly submerged.'] },
  { type: 'collapse', name: 'Collapsing Ceiling', emoji: '🪨', baseDamage: 3, damageScaling: 2, cellsPerRound: 3, maxCells: 30, saveDC: 14, saveAbility: 'DEX',
    description: 'Stones rain down as the structure fails.',
    roundDescriptions: ['Dust falls from cracks above.', 'Small stones begin to fall.', 'Chunks of ceiling crash down.', 'Support beams splinter and break.', 'Total collapse imminent!'] },
  { type: 'fog', name: 'Creeping Fog', emoji: '🌫️', baseDamage: 0, damageScaling: 0, cellsPerRound: 8, maxCells: 80, saveDC: 10, saveAbility: 'CON',
    description: 'Unnatural fog rolls in, obscuring everything.',
    roundDescriptions: ['Wisps of fog appear.', 'Visibility drops to 30ft.', 'Visibility drops to 15ft.', 'You can barely see your hand.', 'Total darkness of fog.'] },
  { type: 'acid', name: 'Acid Seep', emoji: '🧪', baseDamage: 3, damageScaling: 1, cellsPerRound: 3, maxCells: 25, saveDC: 13, saveAbility: 'DEX',
    description: 'Corrosive liquid bubbles up from below, eating through boots and stone.',
    roundDescriptions: ['Small puddles of acid form.', 'The acid spreads across the floor.', 'Metal equipment begins to corrode.', 'The floor itself dissolves.', 'Everything is dissolving.'] },
];

export function createEscalation(type: EscalationType): EscalationState {
  const config = ESCALATION_CONFIGS.find((c) => c.type === type) || ESCALATION_CONFIGS[0];
  return {
    type: config.type, name: config.name, emoji: config.emoji,
    currentRound: 0, affectedCells: 0, maxCells: config.maxCells,
    damagePerRound: config.baseDamage, description: config.description,
    saveDC: config.saveDC, saveAbility: config.saveAbility,
  };
}

export function advanceEscalation(state: EscalationState): { state: EscalationState; narration: string; damage: number } {
  const config = ESCALATION_CONFIGS.find((c) => c.type === state.type) || ESCALATION_CONFIGS[0];
  const newRound = state.currentRound + 1;
  const newCells = Math.min(state.maxCells, state.affectedCells + config.cellsPerRound);
  const newDamage = config.baseDamage + config.damageScaling * newRound;
  const descIndex = Math.min(newRound - 1, config.roundDescriptions.length - 1);
  const narration = `${config.emoji} **${config.name}** (Round ${newRound}): ${config.roundDescriptions[descIndex]}${newDamage > 0 ? ` ${newDamage}d1 ${state.type} damage.` : ''} ${config.saveAbility} DC ${config.saveDC}.`;

  return {
    state: { ...state, currentRound: newRound, affectedCells: newCells, damagePerRound: newDamage },
    narration,
    damage: newDamage,
  };
}

export function formatEscalationStatus(state: EscalationState): string {
  const pct = Math.round((state.affectedCells / state.maxCells) * 100);
  const bar = '█'.repeat(Math.floor(pct / 10)) + '░'.repeat(10 - Math.floor(pct / 10));
  return `${state.emoji} **${state.name}** — Round ${state.currentRound} [${bar}] ${pct}% coverage\nDamage: ${state.damagePerRound}/round | Save: ${state.saveAbility} DC ${state.saveDC}`;
}
