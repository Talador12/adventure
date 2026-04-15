// Generic undo/redo stack. Works with any serializable type.
// Max history depth prevents memory bloat on long sessions.

const MAX_HISTORY = 50;

export interface UndoStack<T> {
  past: T[];
  present: T;
  future: T[];
}

export function createUndoStack<T>(initial: T): UndoStack<T> {
  return { past: [], present: initial, future: [] };
}

export function pushState<T>(stack: UndoStack<T>, newState: T): UndoStack<T> {
  const past = [...stack.past, stack.present];
  if (past.length > MAX_HISTORY) past.shift();
  return { past, present: newState, future: [] };
}

export function undo<T>(stack: UndoStack<T>): UndoStack<T> {
  if (stack.past.length === 0) return stack;
  const past = [...stack.past];
  const previous = past.pop()!;
  return { past, present: previous, future: [stack.present, ...stack.future] };
}

export function redo<T>(stack: UndoStack<T>): UndoStack<T> {
  if (stack.future.length === 0) return stack;
  const future = [...stack.future];
  const next = future.shift()!;
  return { past: [...stack.past, stack.present], present: next, future };
}

export function canUndo<T>(stack: UndoStack<T>): boolean {
  return stack.past.length > 0;
}

export function canRedo<T>(stack: UndoStack<T>): boolean {
  return stack.future.length > 0;
}
