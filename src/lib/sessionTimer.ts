// Session timer with milestone alerts — track real-time session length.
// DM sets milestones; the system pings when they're reached.

export interface SessionMilestone {
  id: string;
  label: string;
  minutesMark: number;
  triggered: boolean;
}

export interface SessionTimerState {
  startTime: number;
  pausedAt: number | null;
  totalPausedMs: number;
  milestones: SessionMilestone[];
  isRunning: boolean;
}

export const DEFAULT_MILESTONES: Omit<SessionMilestone, 'triggered'>[] = [
  { id: 'warmup', label: '🟢 Session started — 30 minutes in', minutesMark: 30 },
  { id: 'hour', label: '🟡 One hour mark — check pacing', minutesMark: 60 },
  { id: 'midpoint', label: '🟡 90 minutes — consider a break', minutesMark: 90 },
  { id: 'two-hour', label: '🟠 Two hours — energy may be dipping', minutesMark: 120 },
  { id: 'long', label: '🔴 Three hours — start wrapping up', minutesMark: 180 },
  { id: 'marathon', label: '💀 Four hours — find a stopping point!', minutesMark: 240 },
];

export function createSessionTimer(customMilestones?: typeof DEFAULT_MILESTONES): SessionTimerState {
  const milestones = (customMilestones || DEFAULT_MILESTONES).map((m) => ({ ...m, triggered: false }));
  return { startTime: Date.now(), pausedAt: null, totalPausedMs: 0, milestones, isRunning: true };
}

export function getElapsedMinutes(timer: SessionTimerState): number {
  const now = timer.pausedAt || Date.now();
  const elapsed = now - timer.startTime - timer.totalPausedMs;
  return Math.floor(elapsed / 60000);
}

export function getElapsedFormatted(timer: SessionTimerState): string {
  const mins = getElapsedMinutes(timer);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function checkMilestones(timer: SessionTimerState): { timer: SessionTimerState; triggered: SessionMilestone[] } {
  const elapsed = getElapsedMinutes(timer);
  const triggered: SessionMilestone[] = [];
  const updatedMilestones = timer.milestones.map((m) => {
    if (!m.triggered && elapsed >= m.minutesMark) {
      triggered.push(m);
      return { ...m, triggered: true };
    }
    return m;
  });
  return { timer: { ...timer, milestones: updatedMilestones }, triggered };
}

export function pauseTimer(timer: SessionTimerState): SessionTimerState {
  if (timer.pausedAt) return timer;
  return { ...timer, pausedAt: Date.now(), isRunning: false };
}

export function resumeTimer(timer: SessionTimerState): SessionTimerState {
  if (!timer.pausedAt) return timer;
  const pausedDuration = Date.now() - timer.pausedAt;
  return { ...timer, pausedAt: null, totalPausedMs: timer.totalPausedMs + pausedDuration, isRunning: true };
}

export function formatTimerStatus(timer: SessionTimerState): string {
  const elapsed = getElapsedFormatted(timer);
  const nextMilestone = timer.milestones.find((m) => !m.triggered);
  const lines = [`⏱️ **Session Timer:** ${elapsed}${timer.isRunning ? '' : ' (PAUSED)'}`];
  if (nextMilestone) {
    const minsUntil = nextMilestone.minutesMark - getElapsedMinutes(timer);
    lines.push(`Next: ${nextMilestone.label} (in ${minsUntil}m)`);
  } else {
    lines.push('All milestones reached!');
  }
  return lines.join('\n');
}
