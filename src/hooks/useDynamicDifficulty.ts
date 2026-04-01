// useDynamicDifficulty — auto-adjust encounter difficulty mid-combat based on party health.
// Monitors party HP% and enemy count, scales enemy stats up or down to keep fights fun.
// DM can toggle on/off. Adjustments are subtle — no one-shot kills or trivial fights.
import { useEffect, useRef } from 'react';
import { useGame, type Unit } from '../contexts/GameContext';

interface UseDynamicDifficultyOptions {
  enabled: boolean;
  addDmMessage: (text: string) => void;
  broadcastCombatSync: (syncUnits: Unit[], syncInCombat?: boolean, syncRound?: number, syncTurnIdx?: number) => void;
}

// Difficulty assessment based on party health
type Difficulty = 'easy' | 'balanced' | 'hard' | 'deadly';

function assessDifficulty(playerUnits: Unit[], enemyUnits: Unit[]): Difficulty {
  if (playerUnits.length === 0 || enemyUnits.length === 0) return 'balanced';
  const partyHpPct = playerUnits.reduce((s, u) => s + u.hp, 0) / playerUnits.reduce((s, u) => s + u.maxHp, 0);
  const enemyHpPct = enemyUnits.reduce((s, u) => s + u.hp, 0) / enemyUnits.reduce((s, u) => s + u.maxHp, 0);

  // Party getting destroyed (< 30% HP while enemies are healthy)
  if (partyHpPct < 0.3 && enemyHpPct > 0.5) return 'deadly';
  // Party struggling (< 50% while enemies strong)
  if (partyHpPct < 0.5 && enemyHpPct > 0.6) return 'hard';
  // Party steamrolling (> 80% HP while enemies are low)
  if (partyHpPct > 0.8 && enemyHpPct < 0.3) return 'easy';

  return 'balanced';
}

export function useDynamicDifficulty({ enabled, addDmMessage, broadcastCombatSync }: UseDynamicDifficultyOptions) {
  const { units, setUnits, inCombat, combatRound } = useGame();
  const lastAdjustRoundRef = useRef(0);
  const adjustmentCountRef = useRef(0);

  useEffect(() => {
    if (!enabled || !inCombat || combatRound <= 1) return;
    // Only check every 2 rounds and max 2 adjustments per encounter
    if (combatRound - lastAdjustRoundRef.current < 2 || adjustmentCountRef.current >= 2) return;

    const playerUnits = units.filter((u) => u.type === 'player' && u.hp > 0);
    const enemyUnits = units.filter((u) => u.type === 'enemy' && u.hp > 0);
    if (playerUnits.length === 0 || enemyUnits.length === 0) return;

    const difficulty = assessDifficulty(playerUnits, enemyUnits);
    if (difficulty === 'balanced') return;

    lastAdjustRoundRef.current = combatRound;
    adjustmentCountRef.current++;

    if (difficulty === 'deadly') {
      // Nerf enemies: reduce HP by 15%, reduce attack bonus by 1
      setUnits((prev) => {
        const updated = prev.map((u) => {
          if (u.type !== 'enemy' || u.hp <= 0) return u;
          const hpReduction = Math.max(1, Math.floor(u.hp * 0.15));
          return {
            ...u,
            hp: Math.max(1, u.hp - hpReduction),
            attackBonus: Math.max(0, (u.attackBonus || 3) - 1),
          };
        });
        setTimeout(() => broadcastCombatSync(updated, true, combatRound), 50);
        return updated;
      });
      const deadlyNarrations = [
        '*The enemies seem to falter, their movements growing sluggish...*',
        '*One of the creatures clutches a wound, stumbling backward...*',
        '*The enemy formation breaks as morale wavers...*',
        '*A distant horn sounds — the enemies glance nervously toward the exit...*',
      ];
      addDmMessage(deadlyNarrations[combatRound % deadlyNarrations.length]);
    } else if (difficulty === 'hard') {
      // Slight nerf: reduce enemy HP by 10%
      setUnits((prev) => {
        const updated = prev.map((u) => {
          if (u.type !== 'enemy' || u.hp <= 0) return u;
          const hpReduction = Math.max(1, Math.floor(u.hp * 0.10));
          return { ...u, hp: Math.max(1, u.hp - hpReduction) };
        });
        setTimeout(() => broadcastCombatSync(updated, true, combatRound), 50);
        return updated;
      });
      addDmMessage('*A few of the enemies look bloodied and weakened...*');
    } else if (difficulty === 'easy') {
      // Buff enemies: heal 20% of missing HP, +1 attack bonus
      setUnits((prev) => {
        const updated = prev.map((u) => {
          if (u.type !== 'enemy' || u.hp <= 0) return u;
          const missingHp = u.maxHp - u.hp;
          const healAmt = Math.floor(missingHp * 0.2);
          return {
            ...u,
            hp: Math.min(u.maxHp, u.hp + healAmt),
            attackBonus: (u.attackBonus || 3) + 1,
          };
        });
        setTimeout(() => broadcastCombatSync(updated, true, combatRound), 50);
        return updated;
      });
      const easyNarrations = [
        '*The remaining enemies rally, their strikes growing more desperate and fierce!*',
        '*Reinforcements seem to be on the way — the enemies fight with renewed vigor!*',
        '*The enemy leader snarls a command, and the creatures attack with coordinated fury!*',
        '*Something changes in the enemies\' eyes — they fight like cornered animals now.*',
      ];
      addDmMessage(easyNarrations[combatRound % easyNarrations.length]);
    }
  }, [enabled, inCombat, combatRound, units, setUnits, addDmMessage, broadcastCombatSync]);

  // Reset adjustment count when combat starts
  const prevInCombatRef = useRef(false);
  useEffect(() => {
    if (inCombat && !prevInCombatRef.current) {
      adjustmentCountRef.current = 0;
      lastAdjustRoundRef.current = 0;
    }
    prevInCombatRef.current = inCombat;
  }, [inCombat]);
}
