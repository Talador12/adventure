// Object interaction tracker — track doors, levers, chests, and other interactables.

export type ObjectState = 'locked' | 'unlocked' | 'open' | 'closed' | 'broken' | 'activated' | 'deactivated';
export type ObjectType = 'door' | 'chest' | 'lever' | 'button' | 'trap_door' | 'gate' | 'shrine' | 'fountain' | 'torch' | 'statue';

export interface InteractableObject {
  id: string;
  type: ObjectType;
  name: string;
  state: ObjectState;
  col: number;
  row: number;
  lockDC?: number;
  trapAttached?: string;
  notes: string;
  interactionHistory: string[];
}

export interface ObjectTrackerState {
  objects: InteractableObject[];
}

export function createObjectTracker(): ObjectTrackerState { return { objects: [] }; }

export function addObject(tracker: ObjectTrackerState, type: ObjectType, name: string, col: number, row: number, state: ObjectState = 'closed', lockDC?: number): ObjectTrackerState {
  return { objects: [...tracker.objects, { id: crypto.randomUUID(), type, name, state, col, row, lockDC, notes: '', interactionHistory: [] }] };
}

export function interactWithObject(tracker: ObjectTrackerState, objectId: string, newState: ObjectState, description: string): ObjectTrackerState {
  return {
    objects: tracker.objects.map((o) =>
      o.id === objectId ? { ...o, state: newState, interactionHistory: [...o.interactionHistory, `${description} (→${newState})`].slice(-10) } : o
    ),
  };
}

export function getObjectsAtPosition(tracker: ObjectTrackerState, col: number, row: number): InteractableObject[] {
  return tracker.objects.filter((o) => o.col === col && o.row === row);
}

export function formatObjectTracker(tracker: ObjectTrackerState): string {
  if (tracker.objects.length === 0) return '🚪 No interactable objects tracked.';
  const lines = [`🚪 **Interactable Objects** (${tracker.objects.length}):`];
  const icons: Record<ObjectType, string> = { door: '🚪', chest: '📦', lever: '🔧', button: '🔘', trap_door: '⬇️', gate: '🏰', shrine: '⛪', fountain: '⛲', torch: '🔥', statue: '🗿' };
  for (const o of tracker.objects) {
    const stateEmoji = o.state === 'open' || o.state === 'activated' ? '✅' : o.state === 'locked' ? '🔒' : o.state === 'broken' ? '💥' : '⬜';
    lines.push(`${stateEmoji} ${icons[o.type] || '❓'} **${o.name}** at (${o.col},${o.row}): ${o.state}${o.lockDC ? ` (DC ${o.lockDC})` : ''}`);
  }
  return lines.join('\n');
}
