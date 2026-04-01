// useUndoRedo — command pattern for DM action history.
// Records unit state snapshots before DM actions. Supports undo/redo with Ctrl+Z / Ctrl+Shift+Z.
// Stack-based: max 20 entries, oldest discarded on overflow.

import { useState, useCallback, useRef } from 'react';
import type { Unit } from '../types/game';

interface Snapshot {
  label: string;
  units: Unit[];
  timestamp: number;
}

const MAX_HISTORY = 20;

export function useUndoRedo() {
  const [undoStack, setUndoStack] = useState<Snapshot[]>([]);
  const [redoStack, setRedoStack] = useState<Snapshot[]>([]);
  const currentUnitsRef = useRef<Unit[]>([]);

  // Keep current units ref up to date (call from useEffect watching units)
  const syncUnits = useCallback((units: Unit[]) => {
    currentUnitsRef.current = units;
  }, []);

  // Save a snapshot before a DM action
  const saveSnapshot = useCallback((label: string) => {
    const snapshot: Snapshot = {
      label,
      units: currentUnitsRef.current.map((u) => ({ ...u, conditions: u.conditions ? [...u.conditions] : [] })),
      timestamp: Date.now(),
    };
    setUndoStack((prev) => [...prev.slice(-(MAX_HISTORY - 1)), snapshot]);
    setRedoStack([]); // clear redo on new action
  }, []);

  // Undo: restore previous snapshot, push current to redo
  const undo = useCallback((): { units: Unit[]; label: string } | null => {
    let result: { units: Unit[]; label: string } | null = null;
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      const snapshot = prev[prev.length - 1];
      const remaining = prev.slice(0, -1);
      // Push current state to redo
      setRedoStack((redoPrev) => [...redoPrev, {
        label: `Redo: ${snapshot.label}`,
        units: currentUnitsRef.current.map((u) => ({ ...u, conditions: u.conditions ? [...u.conditions] : [] })),
        timestamp: Date.now(),
      }]);
      result = { units: snapshot.units, label: snapshot.label };
      return remaining;
    });
    return result;
  }, []);

  // Redo: restore next snapshot, push current to undo
  const redo = useCallback((): { units: Unit[]; label: string } | null => {
    let result: { units: Unit[]; label: string } | null = null;
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const snapshot = prev[prev.length - 1];
      const remaining = prev.slice(0, -1);
      // Push current state to undo
      setUndoStack((undoPrev) => [...undoPrev, {
        label: snapshot.label,
        units: currentUnitsRef.current.map((u) => ({ ...u, conditions: u.conditions ? [...u.conditions] : [] })),
        timestamp: Date.now(),
      }]);
      result = { units: snapshot.units, label: snapshot.label };
      return remaining;
    });
    return result;
  }, []);

  return {
    undoStack,
    redoStack,
    syncUnits,
    saveSnapshot,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  };
}
