// useEnemyAI — auto-execute enemy turns with stat-block-driven AI, abilities, conditions, and smart targeting.
// Extracted from Game.tsx to reduce file size and isolate AI combat logic.
import { useEffect, useRef } from 'react';
import { useGame, type Unit, CONDITION_EFFECTS, rollSpellDamage, rollD20WithProne, effectiveAC } from '../contexts/GameContext';
import { findBestMoveToward, findOpportunityAttackers, isAdjacent, chebyshevDistance, hasLineOfSight, DEFAULT_COLS, DEFAULT_ROWS } from '../lib/mapUtils';
import { playTurnChange, playCombatHit, playCombatMiss, playCritical, playEnemyDeath } from './useSoundFX';

interface UseEnemyAIOptions {
  addDmMessage: (text: string) => void;
  setCombatLog: React.Dispatch<React.SetStateAction<string[]>>;
  broadcastCombatSync: (syncUnits: Unit[], syncInCombat?: boolean, syncRound?: number, syncTurnIdx?: number) => void;
  broadcastGameEvent: (event: string, data: Record<string, unknown>) => void;
  animateMoveRef: React.MutableRefObject<((unitId: string, fromCol: number, fromRow: number, toCol: number, toRow: number) => void) | null>;
  drainConcentrationMessages: () => void;
}

export function useEnemyAI({
  addDmMessage,
  setCombatLog,
  broadcastCombatSync,
  broadcastGameEvent,
  animateMoveRef,
  drainConcentrationMessages,
}: UseEnemyAIOptions) {
  const {
    units,
    setUnits,
    characters,
    inCombat,
    damageUnit,
    updateCharacter,
    nextTurn,
    tickConditions,
    applyCondition,
    terrain,
    mapPositions,
    setMapPositions,
    combatRound,
  } = useGame();

  useEffect(() => {
    if (!inCombat) return;
    const currentUnit = units.find((u) => u.isCurrentTurn);
    if (!currentUnit || currentUnit.type !== 'enemy' || currentUnit.hp <= 0) return;

    // Stunned enemies skip their turn
    if (currentUnit.conditions?.some((c) => c.type === 'stunned')) {
      const timer = setTimeout(() => {
        addDmMessage(`${currentUnit.name} is stunned and cannot act!`);
        const { messages: msgs } = tickConditions(currentUnit.id);
        msgs.forEach((m) => addDmMessage(m));
        setTimeout(() => {
          const tr = nextTurn();
          playTurnChange();
          broadcastCombatSync(tr.units, true, combatRound + (tr.newRound ? 1 : 0), tr.turnIndex);
        }, 400);
      }, 600);
      return () => clearTimeout(timer);
    }

    const playerTargets = units.filter((u) => u.type === 'player' && u.hp > 0);
    if (playerTargets.length === 0) return;

    const timer = setTimeout(() => {
      // Tick conditions at start of turn (burning damage, duration countdown)
      const { messages: condMsgs } = tickConditions(currentUnit.id);
      condMsgs.forEach((m) => addDmMessage(m));

      // Reset legendary actions at the start of the boss's turn
      if (currentUnit.legendaryActions && currentUnit.legendaryActions > 0) {
        setUnits((prev) => prev.map((u) => u.id === currentUnit.id ? { ...u, legendaryActionsUsed: 0 } : u));
      }

      // Smart target selection: prefer low-HP targets, 30% chance to target lowest
      let target: Unit;
      if (Math.random() < 0.3) {
        target = [...playerTargets].sort((a, b) => a.hp - b.hp)[0];
      } else {
        target = playerTargets[Math.floor(Math.random() * playerTargets.length)];
      }

      // --- Enemy AI: determine ranged capability, then move + range check ---
      const enemyAbilities = currentUnit.abilities || [];
      const hasRangedAbility = enemyAbilities.some((a) => a.isRanged && a.range);
      const bestRangedRange = hasRangedAbility ? Math.max(...enemyAbilities.filter((a) => a.isRanged && a.range).map((a) => a.range!)) : 0;

      const enemyPos = mapPositions.find((p) => p.unitId === currentUnit.id);
      const targetPos = mapPositions.find((p) => p.unitId === target.id);
      let canAttack = true;
      let canRangedAttack = false;
      if (enemyPos && targetPos && terrain.length > 0) {
        const dist = chebyshevDistance(enemyPos.col, enemyPos.row, targetPos.col, targetPos.row);
        const los = hasLineOfSight(terrain, enemyPos.col, enemyPos.row, targetPos.col, targetPos.row);
        const adjacent = isAdjacent(enemyPos.col, enemyPos.row, targetPos.col, targetPos.row);

        if (hasRangedAbility && los && dist <= bestRangedRange) {
          canRangedAttack = true;
          canAttack = true;
        } else if (adjacent) {
          canAttack = true;
        } else {
          // Move toward target
          const remaining = (currentUnit.speed || 6) - (currentUnit.movementUsed || 0);
          if (remaining > 0) {
            const dest = findBestMoveToward(terrain, enemyPos.col, enemyPos.row, targetPos.col, targetPos.row, remaining, DEFAULT_ROWS, DEFAULT_COLS);
            if (dest && (dest.col !== enemyPos.col || dest.row !== enemyPos.row)) {
              // Player Opportunity Attacks on enemy movement
              const oaAttackers = findOpportunityAttackers(currentUnit.id, 'enemy', enemyPos.col, enemyPos.row, dest.col, dest.row, units, mapPositions);
              for (const atk of oaAttackers) {
                const atkUnit = units.find((u) => u.id === atk.unitId);
                const atkChar = atkUnit?.characterId ? characters.find((c) => c.id === atkUnit.characterId) : null;
                const weapon = atkChar?.equipment?.weapon;
                const atkBonus = weapon?.attackBonus || 0;
                const dieDmg = weapon?.damageDie || '1d4';
                const dmgBonus = weapon?.damageBonus || 0;
                const strMod = atkChar ? Math.floor((atkChar.stats.STR - 10) / 2) : 0;
                const condAtkMod = (atkUnit?.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
                const targetAC = effectiveAC(currentUnit.ac, currentUnit.conditions || []);
                const { roll, hadAdvantage, hadDisadvantage, rolls: oaRolls } = rollD20WithProne(atkUnit?.conditions || [], currentUnit.conditions || [], true);
                const totalAtk = roll + atkBonus + strMod + condAtkMod;
                const hit = roll === 20 || (roll !== 1 && totalAtk >= targetAC);
                let dmg = 0;
                if (hit) {
                  const dieMatch = dieDmg.match(/(\d+)d(\d+)/);
                  if (dieMatch) {
                    const [, count, sides] = dieMatch;
                    for (let i = 0; i < Number(count); i++) dmg += Math.floor(Math.random() * Number(sides)) + 1;
                  }
                  dmg += dmgBonus + strMod;
                  dmg = Math.max(1, dmg);
                  if (roll === 20) dmg *= 2;
                  damageUnit(currentUnit.id, dmg);
                }
                setUnits((prev) => prev.map((u) => (u.id === atk.unitId ? { ...u, reactionUsed: true } : u)));
                const oaDiceTag = (hadAdvantage || hadDisadvantage) ? ` (rolled ${oaRolls[0]},${oaRolls[1]} [2d20]` : ` (rolled ${roll} [d20]`;
                const advTag = hadAdvantage ? ', adv)' : hadDisadvantage ? ', disadv)' : ')';
                const oaMsg = hit ? `Opportunity Attack! ${atk.name} strikes ${currentUnit.name} for ${dmg} damage!${oaDiceTag}${advTag}` : `Opportunity Attack! ${atk.name} swings at ${currentUnit.name} but misses!${oaDiceTag}${advTag}`;
                setCombatLog((prev) => [...prev, oaMsg]);
                addDmMessage(oaMsg);
              }
              // Animate the token movement before updating position
              animateMoveRef.current?.(currentUnit.id, enemyPos.col, enemyPos.row, dest.col, dest.row);
              setMapPositions((prev) => prev.map((p) => (p.unitId === currentUnit.id ? { ...p, col: dest.col, row: dest.row } : p)));
              setUnits((prev) => prev.map((u) => (u.id === currentUnit.id ? { ...u, movementUsed: (u.movementUsed || 0) + dest.cost } : u)));
              broadcastGameEvent('token_move', { unitId: currentUnit.id, col: dest.col, row: dest.row });
              const moveFt = dest.cost * 5;
              addDmMessage(`${currentUnit.name} moves ${moveFt}ft toward ${target.name}.`);
              // Re-check from new position
              const newDist = chebyshevDistance(dest.col, dest.row, targetPos.col, targetPos.row);
              const newLos = hasLineOfSight(terrain, dest.col, dest.row, targetPos.col, targetPos.row);
              const newAdj = isAdjacent(dest.col, dest.row, targetPos.col, targetPos.row);
              if (hasRangedAbility && newLos && newDist <= bestRangedRange) {
                canRangedAttack = true;
                canAttack = true;
              } else {
                canAttack = newAdj;
              }
            } else {
              canAttack = hasRangedAbility && los && dist <= bestRangedRange;
              canRangedAttack = canAttack;
            }
          } else {
            canAttack = hasRangedAbility && los && dist <= bestRangedRange;
            canRangedAttack = canAttack;
          }
        }
      }

      // If can't reach target, end turn
      if (!canAttack) {
        addDmMessage(`${currentUnit.name} can't reach ${target.name} — ends turn.`);
        setUnits((prev) =>
          prev.map((u) => {
            if (u.id !== currentUnit.id || !u.abilityCooldowns) return u;
            const newCd: Record<string, number> = {};
            for (const [name, cd] of Object.entries(u.abilityCooldowns)) {
              if (cd > 0) newCd[name] = cd - 1;
            }
            return { ...u, abilityCooldowns: newCd };
          })
        );
        setTimeout(() => {
          const tr = nextTurn();
          playTurnChange();
          broadcastCombatSync(tr.units, true, combatRound + (tr.newRound ? 1 : 0), tr.turnIndex);
        }, 600);
        return;
      }

      // Check unconscious target — auto-crit for death saves
      const targetChar = target.characterId ? characters.find((c) => c.id === target.characterId) : null;
      if (targetChar && targetChar.condition === 'unconscious') {
        playCombatHit();
        playCritical();
        const ds = { ...targetChar.deathSaves };
        ds.failures = Math.min(3, ds.failures + 2);
        if (ds.failures >= 3) {
          updateCharacter(targetChar.id, { condition: 'dead', deathSaves: ds });
          addDmMessage(`${currentUnit.name} strikes the fallen ${target.name} — a killing blow! ${target.name} has died.`);
        } else {
          updateCharacter(targetChar.id, { deathSaves: ds });
          addDmMessage(`${currentUnit.name} strikes the fallen ${target.name}! (2 death save failures — ${ds.successes} successes, ${ds.failures} failures)`);
        }
        setTimeout(() => {
          const tr = nextTurn();
          playTurnChange();
          broadcastCombatSync(tr.units, true, combatRound + (tr.newRound ? 1 : 0), tr.turnIndex);
        }, 600);
        return;
      }

      // Check if an ability is available and should be used
      const abilities = currentUnit.abilities || [];
      const cooldowns = currentUnit.abilityCooldowns || {};
      const needsRanged = canRangedAttack && !isAdjacent(enemyPos?.col ?? 0, enemyPos?.row ?? 0, targetPos?.col ?? 0, targetPos?.row ?? 0);
      const availAbility = abilities.find((a) => {
        if ((cooldowns[a.name] || 0) > 0) return false;
        if (needsRanged && !a.isRanged && a.type !== 'aoe' && a.type !== 'heal') return false;
        return Math.random() < 0.6;
      });

      if (availAbility) {
        const atkBonus = availAbility.attackBonus ?? currentUnit.attackBonus ?? 3;
        let abilMsg = `${currentUnit.name} uses ${availAbility.name}!`;

        if (availAbility.type === 'aoe') {
          const dmg = availAbility.damageDie ? rollSpellDamage(availAbility.damageDie) : 0;
          playerTargets.forEach((pt) => damageUnit(pt.id, dmg));
          abilMsg += ` All players take ${dmg} damage!`;
          playCombatHit();
        } else if (availAbility.type === 'attack' || availAbility.type === 'condition') {
          const condAtkMod = (currentUnit.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
          const targetAC = effectiveAC(target.ac, target.conditions || []);
          const isMelee = !availAbility.isRanged;
          const { roll, hadAdvantage, hadDisadvantage, rolls } = rollD20WithProne(currentUnit.conditions || [], target.conditions || [], isMelee);
          const total = roll + atkBonus + condAtkMod;
          const hit = roll === 20 || total >= targetAC;
          const diceTag = (hadAdvantage || hadDisadvantage) ? `rolled ${rolls[0]},${rolls[1]} [2d20] ` : `rolled ${roll} [d20] `;
          const advTag = hadAdvantage ? ' [adv]' : hadDisadvantage ? ' [disadv]' : '';
          if (hit) {
            const dmg = availAbility.damageDie ? rollSpellDamage(availAbility.damageDie) : 0;
            if (dmg > 0) damageUnit(target.id, roll === 20 ? dmg * 2 : dmg);
            abilMsg += ` Hits ${target.name} for ${roll === 20 ? dmg * 2 : dmg} damage! (${diceTag}${roll}+${atkBonus}=${total} vs AC ${targetAC})${advTag}`;
            if (availAbility.condition) {
              applyCondition(target.id, { type: availAbility.condition, duration: availAbility.conditionDuration || 2, source: currentUnit.name });
              abilMsg += ` ${target.name} is ${availAbility.condition}!`;
            }
            playCombatHit();
            if (roll === 20) playCritical();
          } else {
            abilMsg += ` Misses ${target.name}! (${diceTag}${roll}+${atkBonus}=${total} vs AC ${targetAC})${advTag}`;
            playCombatMiss();
          }
        } else if (availAbility.type === 'heal') {
          const heal = availAbility.damageDie ? rollSpellDamage(availAbility.damageDie) : 10;
          const healTarget = currentUnit;
          setUnits((prev) => prev.map((u) => (u.id === healTarget.id ? { ...u, hp: Math.min(u.maxHp, u.hp + heal) } : u)));
          abilMsg += ` Heals for ${heal} HP!`;
        }

        addDmMessage(abilMsg);
        setUnits((prev) => prev.map((u) => (u.id === currentUnit.id ? { ...u, abilityCooldowns: { ...cooldowns, [availAbility.name]: availAbility.cooldown } } : u)));
      } else if (!needsRanged) {
        // Basic melee attack using unit's stat block (only when adjacent)
        const atkBonus = currentUnit.attackBonus ?? 3;
        const dmgBonus = currentUnit.damageBonus ?? 2;
        const dmgDie = currentUnit.damageDie || '1d6';
        const condAtkMod = (currentUnit.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
        const targetAC = effectiveAC(target.ac, target.conditions || []);
        const { roll: attackRoll, hadAdvantage, hadDisadvantage, rolls: atkRolls } = rollD20WithProne(currentUnit.conditions || [], target.conditions || [], true);
        const totalAttack = attackRoll + atkBonus + condAtkMod;
        const isHit = attackRoll === 20 || totalAttack >= targetAC;
        const isCrit = attackRoll === 20;
        const diceTag = (hadAdvantage || hadDisadvantage) ? `rolled ${atkRolls[0]},${atkRolls[1]} [2d20] ` : `rolled ${attackRoll} [d20] `;
        const advTag = hadAdvantage ? ' [adv]' : hadDisadvantage ? ' [disadv]' : '';

        if (isHit) {
          const baseDmg = rollSpellDamage(dmgDie);
          const finalDmg = Math.max(1, isCrit ? baseDmg * 2 + dmgBonus : baseDmg + dmgBonus);
          damageUnit(target.id, finalDmg);
          playCombatHit();
          if (isCrit) playCritical();
          addDmMessage(isCrit ? `CRITICAL! ${currentUnit.name} strikes ${target.name} for ${finalDmg} damage! (${diceTag}${attackRoll}+${atkBonus}=${totalAttack} vs AC ${targetAC})${advTag}` : `${currentUnit.name} hits ${target.name} for ${finalDmg} damage! (${diceTag}${attackRoll}+${atkBonus}=${totalAttack} vs AC ${targetAC})${advTag}`);
          if (target.hp - finalDmg <= 0) {
            playEnemyDeath();
            addDmMessage(`${target.name} falls!`);
          }
        } else {
          playCombatMiss();
          addDmMessage(`${currentUnit.name} misses ${target.name}! (${diceTag}${attackRoll}+${atkBonus}=${totalAttack} vs AC ${targetAC})${advTag}`);
        }
      }

      // Tick ability cooldowns
      setUnits((prev) =>
        prev.map((u) => {
          if (u.id !== currentUnit.id || !u.abilityCooldowns) return u;
          const newCd: Record<string, number> = {};
          for (const [name, cd] of Object.entries(u.abilityCooldowns)) {
            if (cd > 0) newCd[name] = cd - 1;
          }
          return { ...u, abilityCooldowns: newCd };
        })
      );

      // Drain concentration break messages from damage dealt this turn
      setTimeout(drainConcentrationMessages, 0);

      setTimeout(() => {
        const tr = nextTurn();
        playTurnChange();
        broadcastCombatSync(tr.units, true, combatRound + (tr.newRound ? 1 : 0), tr.turnIndex);
      }, 600);
    }, 800);

    return () => clearTimeout(timer);
  }, [inCombat, units, characters, damageUnit, updateCharacter, addDmMessage, nextTurn, tickConditions, applyCondition, setUnits, terrain, mapPositions, setMapPositions, broadcastCombatSync, broadcastGameEvent, combatRound, setCombatLog, animateMoveRef, drainConcentrationMessages]);

  // --- Legendary Actions: fire between player turns ---
  // After a player ends their turn, any boss with remaining legendary actions acts
  const legendaryProcessedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!inCombat) return;
    const currentUnit = units.find((u) => u.isCurrentTurn);
    // Only fire legendary actions when it's a player's turn (between enemy and player turns)
    if (!currentUnit || currentUnit.type !== 'player' || currentUnit.hp <= 0) return;

    // Find bosses with legendary actions remaining
    const bosses = units.filter((u) => u.type === 'enemy' && u.hp > 0 && (u.legendaryActions || 0) > 0 && (u.legendaryActionsUsed || 0) < (u.legendaryActions || 0) && (u.legendaryAbilities || []).length > 0);
    if (bosses.length === 0) return;

    // Prevent double-fire for the same turn
    const turnKey = `legendary-${currentUnit.id}-${combatRound}`;
    if (legendaryProcessedRef.current === turnKey) return;
    legendaryProcessedRef.current = turnKey;

    // 50% chance to use a legendary action on any given player turn (not every turn)
    if (Math.random() > 0.5) return;

    const boss = bosses[0]; // use first available boss
    const abilities = boss.legendaryAbilities || [];
    const ability = abilities[Math.floor(Math.random() * abilities.length)];
    if (!ability) return;

    const playerTargets = units.filter((u) => u.type === 'player' && u.hp > 0);
    if (playerTargets.length === 0) return;
    const target = playerTargets[Math.floor(Math.random() * playerTargets.length)];

    const timer = setTimeout(() => {
      let msg = `⚡ Legendary Action! ${boss.name} uses ${ability.name}!`;

      if (ability.type === 'attack' && ability.damageDie && ability.damageDie !== '0') {
        const atkBonus = ability.attackBonus ?? boss.attackBonus ?? 5;
        const targetAC = effectiveAC(target.ac, target.conditions || []);
        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + atkBonus;
        const hit = roll === 20 || (roll !== 1 && total >= targetAC);
        if (hit) {
          const dmg = rollSpellDamage(ability.damageDie);
          const finalDmg = Math.max(1, roll === 20 ? dmg * 2 : dmg);
          damageUnit(target.id, finalDmg);
          msg += ` Hits ${target.name} for ${finalDmg} damage! (${roll}+${atkBonus}=${total} vs AC ${targetAC})`;
          playCombatHit();
          if (roll === 20) playCritical();
        } else {
          msg += ` Misses ${target.name}! (${roll}+${atkBonus}=${total} vs AC ${targetAC})`;
          playCombatMiss();
        }
      } else if (ability.type === 'condition' && ability.condition) {
        applyCondition(target.id, { type: ability.condition, duration: ability.conditionDuration || 1, source: boss.name });
        msg += ` ${target.name} is ${ability.condition}!`;
      } else if (ability.type === 'aoe' && ability.damageDie) {
        const dmg = rollSpellDamage(ability.damageDie);
        playerTargets.forEach((pt) => damageUnit(pt.id, dmg));
        msg += ` All players take ${dmg} damage!`;
        playCombatHit();
      } else {
        msg += ` ${ability.description}`;
      }

      addDmMessage(msg);
      setCombatLog((prev) => [...prev, msg]);

      // Increment legendary actions used
      setUnits((prev) => prev.map((u) => u.id === boss.id ? { ...u, legendaryActionsUsed: (u.legendaryActionsUsed || 0) + 1 } : u));
      setTimeout(() => broadcastCombatSync(units, true, combatRound), 100);
    }, 1200); // fire 1.2s after player turn starts (lets them see the turn change first)

    return () => clearTimeout(timer);
  }, [inCombat, units, combatRound, damageUnit, applyCondition, addDmMessage, setCombatLog, setUnits, broadcastCombatSync]);

  // --- Lair Actions: fire at the start of each new round (initiative count 20) ---
  const lairRoundRef = useRef<number>(0);
  useEffect(() => {
    if (!inCombat || combatRound <= lairRoundRef.current) return;

    // Find any boss with lair actions
    const boss = units.find((u) => u.type === 'enemy' && u.hp > 0 && u.lairActions && u.lairActions.length > 0);
    if (!boss || !boss.lairActions) return;

    lairRoundRef.current = combatRound;

    // Pick a random lair action
    const action = boss.lairActions[Math.floor(Math.random() * boss.lairActions.length)];
    const playerTargets = units.filter((u) => u.type === 'player' && u.hp > 0);
    if (playerTargets.length === 0) return;

    const timer = setTimeout(() => {
      let msg = `🏔️ Lair Action! ${action.name} — ${action.description}`;

      if (action.type === 'damage' && action.damageDie) {
        const targets = action.targetAll ? playerTargets : [playerTargets[Math.floor(Math.random() * playerTargets.length)]];
        for (const target of targets) {
          // Save for half damage
          const saveRoll = Math.floor(Math.random() * 20) + 1;
          const saved = action.saveDC ? saveRoll >= action.saveDC : false;
          const dmg = rollSpellDamage(action.damageDie);
          const finalDmg = saved ? Math.floor(dmg / 2) : dmg;
          if (finalDmg > 0) damageUnit(target.id, finalDmg);
          msg += saved
            ? ` ${target.name} saves — ${finalDmg} ${action.damageType || ''} damage (half).`
            : ` ${target.name} takes ${finalDmg} ${action.damageType || ''} damage!`;
        }
        playCombatHit();
      } else if (action.type === 'condition' && action.condition) {
        const targets = action.targetAll ? playerTargets : [playerTargets[Math.floor(Math.random() * playerTargets.length)]];
        for (const target of targets) {
          const saveRoll = Math.floor(Math.random() * 20) + 1;
          const saved = action.saveDC ? saveRoll >= action.saveDC : false;
          if (!saved) {
            applyCondition(target.id, { type: action.condition, duration: action.conditionDuration || 1, source: `${boss.name}'s Lair` });
            msg += ` ${target.name} is ${action.condition}!`;
          } else {
            msg += ` ${target.name} resists the effect.`;
          }
        }
      }
      // 'terrain' and 'flavor' types just show the message — no mechanical effect

      addDmMessage(msg);
      setCombatLog((prev) => [...prev, msg]);
      setTimeout(() => broadcastCombatSync(units, true, combatRound), 100);
    }, 500); // fire at the very start of each round

    return () => clearTimeout(timer);
  }, [inCombat, combatRound, units, damageUnit, applyCondition, addDmMessage, setCombatLog, broadcastCombatSync]);
}
