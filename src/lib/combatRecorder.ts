// Combat recorder — captures combat events for replay.
// Events stored as a timeline with timestamps, unit positions, and action descriptions.

export interface CombatEvent {
  timestamp: number;       // relative ms from combat start
  type: 'start' | 'move' | 'attack' | 'damage' | 'death' | 'turn' | 'spell' | 'heal' | 'end';
  unitId?: string;
  unitName?: string;
  description: string;
  // Snapshot of all unit positions at this moment
  positions?: Array<{ unitId: string; col: number; row: number }>;
  // Combat state at this moment
  units?: Array<{ id: string; name: string; hp: number; maxHp: number; type: string; isCurrentTurn: boolean }>;
}

export interface CombatRecording {
  id: string;
  roomId: string;
  startedAt: number;
  endedAt?: number;
  events: CombatEvent[];
  terrain?: unknown; // terrain grid for replay context
}

let activeRecording: CombatRecording | null = null;
let combatStartTime = 0;

export function startRecording(roomId: string): void {
  combatStartTime = Date.now();
  activeRecording = {
    id: crypto.randomUUID().slice(0, 8),
    roomId,
    startedAt: combatStartTime,
    events: [],
  };
}

export function recordEvent(
  type: CombatEvent['type'],
  description: string,
  unitId?: string,
  unitName?: string,
  positions?: CombatEvent['positions'],
  units?: CombatEvent['units'],
): void {
  if (!activeRecording) return;
  activeRecording.events.push({
    timestamp: Date.now() - combatStartTime,
    type,
    unitId,
    unitName,
    description,
    positions,
    units,
  });
}

export function stopRecording(): CombatRecording | null {
  if (!activeRecording) return null;
  activeRecording.endedAt = Date.now();
  const recording = activeRecording;
  activeRecording = null;
  return recording;
}

export function isRecording(): boolean {
  return activeRecording !== null;
}

export function getRecordingEventCount(): number {
  return activeRecording?.events.length ?? 0;
}
