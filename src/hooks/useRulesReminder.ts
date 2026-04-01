// useRulesReminder — passive D&D 5e rules assistant that watches combat state
// and surfaces gentle reminders when players might be forgetting something.
// Purely client-side, no AI calls. DM-togglable.

import { useRef, useCallback } from 'react';
import type { Unit, Character } from '../types/game';

export interface RulesReminder {
  id: string;
  message: string;
  severity: 'info' | 'warning';
  timestamp: number;
}

type ReminderCallback = (reminder: RulesReminder) => void;

// Dedup window: don't repeat the same reminder within this period
const DEDUP_MS = 30_000;

function makeId(): string {
  return `rr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export function useRulesReminder(onReminder: ReminderCallback) {
  const recentRef = useRef<Map<string, number>>(new Map());

  const emit = useCallback((key: string, message: string, severity: 'info' | 'warning' = 'info') => {
    const now = Date.now();
    const last = recentRef.current.get(key);
    if (last && now - last < DEDUP_MS) return;
    recentRef.current.set(key, now);
    // Prune old entries
    if (recentRef.current.size > 50) {
      for (const [k, t] of recentRef.current) {
        if (now - t > DEDUP_MS * 2) recentRef.current.delete(k);
      }
    }
    onReminder({ id: makeId(), message, severity, timestamp: now });
  }, [onReminder]);

  // Check when a turn ends — did the player forget anything?
  const checkTurnEnd = useCallback((
    unit: Unit,
    character: Character | undefined,
    units: Unit[],
  ) => {
    if (!unit || unit.type !== 'player') return;
    const name = character?.name || unit.name;

    // Unused bonus action
    if (!unit.bonusActionUsed) {
      const charClass = character?.class;
      if (charClass === 'Rogue' && (character?.level || 0) >= 2) {
        emit(`bonus-${unit.id}`, `${name} didn't use Cunning Action (bonus action) this turn.`);
      } else if (charClass === 'Fighter') {
        const usedSecondWind = unit.conditions?.some((c) => c.type === 'inspired' && c.source === 'Second Wind Cooldown');
        if (!usedSecondWind && unit.hp < unit.maxHp * 0.5) {
          emit(`secondwind-${unit.id}`, `${name} is below half HP — consider Second Wind (bonus action, 1d10+${character?.level || 1} HP).`);
        }
      }
    }

    // Unused reaction
    if (!unit.reactionUsed) {
      const charClass = character?.class;
      if (charClass === 'Wizard' || charClass === 'Sorcerer') {
        emit(`reaction-caster-${unit.id}`, `${name} still has their reaction — Shield (+5 AC) is available if attacked.`);
      }
    }

    // Unused movement (more than half remaining)
    const effectiveSpeed = unit.conditions?.some((c) => c.type === 'grappled') ? 0 : (unit.speed || 6);
    const remaining = effectiveSpeed - (unit.movementUsed || 0);
    if (remaining > effectiveSpeed * 0.5 && remaining > 2) {
      emit(`movement-${unit.id}`, `${name} has ${remaining * 5}ft of movement remaining.`);
    }
  }, [emit]);

  // Check after damage is dealt to a concentrating unit
  const checkConcentrationDamage = useCallback((
    unit: Unit,
    damage: number,
    character: Character | undefined,
  ) => {
    if (!unit || unit.type !== 'player') return;
    const isConcentrating = unit.conditions?.some((c) => c.type === 'hexed' || c.type === 'blessed') ||
      character?.concentratingOn;
    if (!isConcentrating) return;
    const dc = Math.max(10, Math.floor(damage / 2));
    const name = character?.name || unit.name;
    emit(`conc-${unit.id}-${Date.now()}`, `${name} took ${damage} damage while concentrating — DC ${dc} CON save required.`, 'warning');
  }, [emit]);

  // Check when an enemy moves away from a player
  const checkOpportunityAttack = useCallback((
    enemyUnit: Unit,
    nearbyPlayers: Unit[],
  ) => {
    for (const player of nearbyPlayers) {
      if (player.reactionUsed || player.hp <= 0) continue;
      if (player.conditions?.some((c) => c.type === 'stunned')) continue;
      emit(`oa-${player.id}-${enemyUnit.id}`, `${player.name} could make an opportunity attack against ${enemyUnit.name} (uses reaction).`);
    }
  }, [emit]);

  return {
    checkTurnEnd,
    checkConcentrationDamage,
    checkOpportunityAttack,
  };
}
