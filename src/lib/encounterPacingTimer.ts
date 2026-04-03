// Encounter pacing timer — visible combat round timer with configurable turn limits.
// Keeps combat snappy by giving each player a time limit for their turn.

export interface TurnTimerConfig {
  secondsPerTurn: number;
  warningAtSeconds: number;
  autoEndTurn: boolean;
  enabled: boolean;
}

export interface TurnTimerState {
  config: TurnTimerConfig;
  currentUnitId: string | null;
  turnStartTime: number;
  roundStartTime: number;
  currentRound: number;
  turnsThisRound: number;
  totalTurnsTaken: number;
  overtimeTurns: number;
  averageTurnSeconds: number;
}

export const DEFAULT_TIMER_CONFIG: TurnTimerConfig = { secondsPerTurn: 60, warningAtSeconds: 15, autoEndTurn: false, enabled: true };
export const FAST_TIMER_CONFIG: TurnTimerConfig = { secondsPerTurn: 30, warningAtSeconds: 10, autoEndTurn: true, enabled: true };
export const RELAXED_TIMER_CONFIG: TurnTimerConfig = { secondsPerTurn: 120, warningAtSeconds: 30, autoEndTurn: false, enabled: true };

export function createTurnTimer(config: TurnTimerConfig = DEFAULT_TIMER_CONFIG): TurnTimerState {
  return { config, currentUnitId: null, turnStartTime: 0, roundStartTime: Date.now(), currentRound: 1, turnsThisRound: 0, totalTurnsTaken: 0, overtimeTurns: 0, averageTurnSeconds: 0 };
}

export function startTurn(state: TurnTimerState, unitId: string): TurnTimerState {
  return { ...state, currentUnitId: unitId, turnStartTime: Date.now() };
}

export function endTurn(state: TurnTimerState): { state: TurnTimerState; turnDuration: number; wasOvertime: boolean } {
  const duration = state.turnStartTime > 0 ? Math.round((Date.now() - state.turnStartTime) / 1000) : 0;
  const wasOvertime = duration > state.config.secondsPerTurn;
  const newTotal = state.totalTurnsTaken + 1;
  const newAvg = Math.round(((state.averageTurnSeconds * state.totalTurnsTaken) + duration) / newTotal);
  return {
    state: { ...state, currentUnitId: null, turnStartTime: 0, turnsThisRound: state.turnsThisRound + 1, totalTurnsTaken: newTotal, overtimeTurns: state.overtimeTurns + (wasOvertime ? 1 : 0), averageTurnSeconds: newAvg },
    turnDuration: duration,
    wasOvertime,
  };
}

export function nextRound(state: TurnTimerState): TurnTimerState {
  return { ...state, currentRound: state.currentRound + 1, turnsThisRound: 0, roundStartTime: Date.now() };
}

export function getElapsedSeconds(state: TurnTimerState): number {
  if (state.turnStartTime <= 0) return 0;
  return Math.round((Date.now() - state.turnStartTime) / 1000);
}

export function isOvertime(state: TurnTimerState): boolean {
  return getElapsedSeconds(state) > state.config.secondsPerTurn;
}

export function formatTurnTimer(state: TurnTimerState): string {
  const elapsed = getElapsedSeconds(state);
  const remaining = Math.max(0, state.config.secondsPerTurn - elapsed);
  const emoji = remaining > state.config.warningAtSeconds ? '🟢' : remaining > 0 ? '🟡' : '🔴';
  const lines = [`⏱️ **Turn Timer** (Round ${state.currentRound}):`];
  if (state.currentUnitId) lines.push(`${emoji} Time remaining: ${remaining}s / ${state.config.secondsPerTurn}s`);
  else lines.push('⏸️ No turn active.');
  lines.push(`Avg turn: ${state.averageTurnSeconds}s | Overtime: ${state.overtimeTurns}/${state.totalTurnsTaken} turns`);
  return lines.join('\n');
}
