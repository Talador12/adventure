// useAIPlayerTurn — auto-execute AI-controlled player turns with intelligent decision-making.
// Mirrors useEnemyAI but for player units controlled by AI seats.
// AI players move, attack, cast spells, use abilities, and heal — like a competent party member.
import { useEffect, useRef } from 'react';
import { useGame, type Unit, CONDITION_EFFECTS, rollSpellDamage, rollD20WithProne, effectiveAC } from '../contexts/GameContext';
import { getClassSpells, getSpellSlots, getClassAbility, FULL_CASTERS, HALF_CASTERS } from '../data/spells';
import { findBestMoveToward, isAdjacent, chebyshevDistance, hasLineOfSight, DEFAULT_COLS, DEFAULT_ROWS, findOpportunityAttackers } from '../lib/mapUtils';
import { playTurnChange, playCombatHit, playCombatMiss, playCritical, playMagicSpell, playHealing } from './useSoundFX';
import type { Character, Spell, ActiveCondition, ConditionType } from '../types/game';

interface UseAIPlayerTurnOptions {
  aiCharacterIds: Set<string>;
  addDmMessage: (text: string) => void;
  setCombatLog: React.Dispatch<React.SetStateAction<string[]>>;
  broadcastCombatSync: (syncUnits: Unit[], syncInCombat?: boolean, syncRound?: number, syncTurnIdx?: number) => void;
  broadcastGameEvent: (event: string, data: Record<string, unknown>) => void;
  animateMoveRef: React.MutableRefObject<((unitId: string, fromCol: number, fromRow: number, toCol: number, toRow: number) => void) | null>;
  drainConcentrationMessages: () => void;
}

// Determine if a character is a caster (has spell slots)
function isCaster(char: Character): boolean {
  return FULL_CASTERS.includes(char.class) || HALF_CASTERS.includes(char.class);
}

// Get available spell slots for a character
function hasSpellSlots(char: Character): boolean {
  const slots = getSpellSlots(char.class, char.level);
  const used = char.spellSlotsUsed || {};
  return Object.entries(slots).some(([lvl, max]) => (max - (used[Number(lvl)] || 0)) > 0);
}

// Find the best healing target among allies (lowest HP% that isn't dead)
function findHealTarget(units: Unit[], characters: Character[], selfCharId: string): { unit: Unit; char: Character } | null {
  const allies = units
    .filter((u) => u.type === 'player' && u.hp > 0 && u.hp < u.maxHp)
    .map((u) => {
      const char = u.characterId ? characters.find((c) => c.id === u.characterId) : null;
      return char ? { unit: u, char, hpPct: u.hp / u.maxHp } : null;
    })
    .filter(Boolean) as { unit: Unit; char: Character; hpPct: number }[];

  if (allies.length === 0) return null;
  // Prioritize self if badly hurt, then lowest HP% ally
  const self = allies.find((a) => a.char.id === selfCharId);
  if (self && self.hpPct < 0.3) return { unit: self.unit, char: self.char };
  const lowest = allies.sort((a, b) => a.hpPct - b.hpPct)[0];
  return lowest.hpPct < 0.5 ? { unit: lowest.unit, char: lowest.char } : null;
}

// Pick a damage spell the AI can cast right now (has slots, target in range)
function pickDamageSpell(
  char: Character,
  unit: Unit,
  targetUnit: Unit,
  targetPos: { col: number; row: number } | undefined,
  unitPos: { col: number; row: number } | undefined,
  terrain: unknown[][],
): Spell | null {
  if (!isCaster(char) || !hasSpellSlots(char)) return null;
  const spells = getClassSpells(char.class, char.level).filter((s) => s.damage && s.level > 0);
  const slots = getSpellSlots(char.class, char.level);
  const used = char.spellSlotsUsed || {};

  // Filter to castable spells (have slots)
  const castable = spells.filter((s) => {
    if (s.level === 0) return true; // cantrips always available
    return (slots[s.level] || 0) - (used[s.level] || 0) > 0;
  });

  if (castable.length === 0) return null;

  // Check range and LOS if we have positions
  if (unitPos && targetPos && terrain.length > 0) {
    const dist = chebyshevDistance(unitPos.col, unitPos.row, targetPos.col, targetPos.row);
    const los = hasLineOfSight(terrain as import('../lib/mapUtils').TerrainType[][], unitPos.col, unitPos.row, targetPos.col, targetPos.row);
    // Filter to in-range spells
    const inRange = castable.filter((s) => {
      if (s.range === 'Self' || s.range === 'Touch') return dist <= 1;
      const rangeMatch = s.range.match(/(\d+)/);
      if (!rangeMatch) return true;
      const rangeCells = Math.floor(Number(rangeMatch[1]) / 5);
      return dist <= rangeCells && los;
    });
    if (inRange.length > 0) {
      // Prefer highest damage spell
      return inRange.sort((a, b) => (rollSpellDamage(b.damage || '0') - rollSpellDamage(a.damage || '0')))[0];
    }
  }

  // Fallback: pick first castable damage spell
  return castable[0] || null;
}

// Pick a healing spell the AI can cast
function pickHealSpell(char: Character): Spell | null {
  if (!isCaster(char) || !hasSpellSlots(char)) return null;
  const spells = getClassSpells(char.class, char.level).filter((s) => s.healAmount && s.level > 0);
  const slots = getSpellSlots(char.class, char.level);
  const used = char.spellSlotsUsed || {};

  const castable = spells.filter((s) => {
    if (s.level === 0) return true;
    return (slots[s.level] || 0) - (used[s.level] || 0) > 0;
  });

  // Prefer most efficient heal
  return castable.sort((a, b) => (b.healAmount || 0) - (a.healAmount || 0))[0] || null;
}

// Pick a cantrip to cast (free, no slot required)
function pickCantrip(char: Character): Spell | null {
  const spells = getClassSpells(char.class, char.level).filter((s) => s.level === 0 && s.damage);
  return spells.length > 0 ? spells[Math.floor(Math.random() * spells.length)] : null;
}

export function useAIPlayerTurn({
  aiCharacterIds,
  addDmMessage,
  setCombatLog,
  broadcastCombatSync,
  broadcastGameEvent,
  animateMoveRef,
  drainConcentrationMessages,
}: UseAIPlayerTurnOptions) {
  const {
    units,
    setUnits,
    characters,
    inCombat,
    damageUnit,
    healUnit,
    updateCharacter,
    nextTurn,
    tickConditions,
    applyCondition,
    castSpell,
    useClassAbility,
    useItem,
    terrain,
    mapPositions,
    setMapPositions,
    combatRound,
  } = useGame();

  // Prevent double-execution of the same turn
  const lastProcessedTurnRef = useRef<string | null>(null);

  useEffect(() => {
    if (!inCombat || aiCharacterIds.size === 0) return;
    const currentUnit = units.find((u) => u.isCurrentTurn);
    if (!currentUnit || currentUnit.type !== 'player' || currentUnit.hp <= 0) return;

    // Only act on AI-controlled player units
    if (!currentUnit.characterId || !aiCharacterIds.has(currentUnit.characterId)) return;

    // Prevent double-fire for the same unit in the same round
    const turnKey = `${currentUnit.id}-${combatRound}`;
    if (lastProcessedTurnRef.current === turnKey) return;
    lastProcessedTurnRef.current = turnKey;

    const char = characters.find((c) => c.id === currentUnit.characterId);
    if (!char) return;

    // Stunned AI players skip their turn
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
      }, 800);
      return () => clearTimeout(timer);
    }

    const enemyTargets = units.filter((u) => u.type === 'enemy' && u.hp > 0);
    if (enemyTargets.length === 0) return; // no enemies to fight

    const timer = setTimeout(() => {
      // Tick conditions at start of turn
      const { messages: condMsgs } = tickConditions(currentUnit.id);
      condMsgs.forEach((m) => addDmMessage(m));

      const unitPos = mapPositions.find((p) => p.unitId === currentUnit.id);

      // --- Decision 1: Heal if badly hurt ---
      const hpPct = char.hp / char.maxHp;
      if (hpPct < 0.3) {
        // Try healing potion first
        const potion = (char.inventory || []).find((i) => i.type === 'potion' && i.healAmount);
        if (potion) {
          const result = useItem(char.id, potion.id);
          addDmMessage(result.message);
          playHealing();
          endAITurn();
          return;
        }
        // Try class ability heal
        const ability = getClassAbility(char.class);
        if (ability && ability.type === 'heal' && !char.classAbilityUsed) {
          const result = useClassAbility(char.id);
          if (result.success) {
            addDmMessage(result.message);
            playHealing();
            endAITurn();
            return;
          }
        }
        // Try healing spell
        const healSpell = pickHealSpell(char);
        if (healSpell) {
          const result = castSpell(char.id, healSpell.id);
          if (result.success) {
            addDmMessage(result.message);
            playMagicSpell();
            playHealing();
            endAITurn();
            return;
          }
        }
      }

      // --- Decision 2: Heal a badly hurt ally (if healer class) ---
      const healClasses = ['Cleric', 'Druid', 'Bard', 'Paladin'];
      if (healClasses.includes(char.class)) {
        const healTarget = findHealTarget(units, characters, char.id);
        if (healTarget && healTarget.char.id !== char.id) {
          const healSpell = pickHealSpell(char);
          // Healing spells target the caster via castSpell, but some target others
          // For simplicity, heal self (castSpell heals the caster)
          if (healSpell && healTarget.unit.hp / healTarget.unit.maxHp < 0.3) {
            // If the heal target is self, just cast normally
            // Otherwise we'd need targetable healing — for now, heal self if hurt
            if (hpPct < 0.5) {
              const result = castSpell(char.id, healSpell.id);
              if (result.success) {
                addDmMessage(result.message);
                playMagicSpell();
                playHealing();
                endAITurn();
                return;
              }
            }
          }
        }
      }

      // --- Decision 3: Use class ability if available and appropriate ---
      const classAbility = getClassAbility(char.class);
      if (classAbility && !char.classAbilityUsed && Math.random() < 0.7) {
        if (classAbility.type === 'buff') {
          // Buff abilities (Rage, Bardic Inspiration, Hunter's Mark)
          if (classAbility.selfOnly) {
            const result = useClassAbility(char.id);
            if (result.success) {
              addDmMessage(result.message);
              playMagicSpell();
              endAITurn();
              return;
            }
          } else {
            // Target an enemy for debuff abilities
            const target = pickTarget(enemyTargets);
            const result = useClassAbility(char.id, target.id);
            if (result.success) {
              addDmMessage(result.message);
              playMagicSpell();
              endAITurn();
              return;
            }
          }
        } else if (classAbility.type === 'attack') {
          const target = pickTarget(enemyTargets);
          const result = useClassAbility(char.id, target.id);
          if (result.success) {
            addDmMessage(result.message);
            playCombatHit();
            endAITurn();
            return;
          }
        }
        // Heal abilities handled in Decision 1 already
      }

      // --- Decision 4: Cast a damage spell if we're a caster ---
      if (isCaster(char) && hasSpellSlots(char) && Math.random() < 0.75) {
        const target = pickTarget(enemyTargets);
        const targetPos = mapPositions.find((p) => p.unitId === target.id);
        const spell = pickDamageSpell(char, currentUnit, target, targetPos, unitPos, terrain);
        if (spell) {
          const result = castSpell(char.id, spell.id, target.id);
          if (result.success) {
            addDmMessage(result.message);
            playMagicSpell();
            endAITurn();
            return;
          }
        }
      }

      // --- Decision 5: Cast a cantrip if caster and no slots ---
      if (isCaster(char)) {
        const cantrip = pickCantrip(char);
        if (cantrip && cantrip.damage) {
          const target = pickTarget(enemyTargets);
          const result = castSpell(char.id, cantrip.id, target.id);
          if (result.success) {
            addDmMessage(result.message);
            playMagicSpell();
            endAITurn();
            return;
          }
        }
      }

      // --- Decision 6: Move toward nearest enemy and melee attack ---
      const target = pickTarget(enemyTargets);
      const targetPos = mapPositions.find((p) => p.unitId === target.id);
      let adjacent = false;

      if (unitPos && targetPos && terrain.length > 0) {
        adjacent = isAdjacent(unitPos.col, unitPos.row, targetPos.col, targetPos.row);

        if (!adjacent) {
          // Move toward the target
          const remaining = (currentUnit.speed || 6) - (currentUnit.movementUsed || 0);
          if (remaining > 0) {
            const dest = findBestMoveToward(terrain, unitPos.col, unitPos.row, targetPos.col, targetPos.row, remaining, DEFAULT_ROWS, DEFAULT_COLS);
            if (dest && (dest.col !== unitPos.col || dest.row !== unitPos.row)) {
              // Check for opportunity attacks against this AI player
              const oaAttackers = findOpportunityAttackers(currentUnit.id, 'player', unitPos.col, unitPos.row, dest.col, dest.row, units, mapPositions);
              for (const atk of oaAttackers) {
                const atkUnit = units.find((u) => u.id === atk.unitId);
                if (!atkUnit) continue;
                const atkBonus = atkUnit.attackBonus ?? 3;
                const dmgDie = atkUnit.damageDie || '1d6';
                const dmgBonus = atkUnit.damageBonus ?? 2;
                const condAtkMod = (atkUnit.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
                const targetAC = effectiveAC(currentUnit.ac, currentUnit.conditions || []);
                const { roll } = rollD20WithProne(atkUnit.conditions || [], currentUnit.conditions || [], true);
                const totalAtk = roll + atkBonus + condAtkMod;
                const hit = roll === 20 || (roll !== 1 && totalAtk >= targetAC);
                if (hit) {
                  const dmg = Math.max(1, rollSpellDamage(dmgDie) + dmgBonus);
                  damageUnit(currentUnit.id, roll === 20 ? dmg * 2 : dmg);
                  const oaMsg = `Opportunity Attack! ${atk.name} strikes ${currentUnit.name} for ${roll === 20 ? dmg * 2 : dmg} damage!`;
                  setCombatLog((prev) => [...prev, oaMsg]);
                  addDmMessage(oaMsg);
                } else {
                  const oaMsg = `Opportunity Attack! ${atk.name} swings at ${currentUnit.name} but misses!`;
                  setCombatLog((prev) => [...prev, oaMsg]);
                  addDmMessage(oaMsg);
                }
                setUnits((prev) => prev.map((u) => (u.id === atk.unitId ? { ...u, reactionUsed: true } : u)));
              }

              animateMoveRef.current?.(currentUnit.id, unitPos.col, unitPos.row, dest.col, dest.row);
              setMapPositions((prev) => prev.map((p) => (p.unitId === currentUnit.id ? { ...p, col: dest.col, row: dest.row } : p)));
              setUnits((prev) => prev.map((u) => (u.id === currentUnit.id ? { ...u, movementUsed: (u.movementUsed || 0) + dest.cost } : u)));
              broadcastGameEvent('token_move', { unitId: currentUnit.id, col: dest.col, row: dest.row });
              addDmMessage(`${currentUnit.name} moves ${dest.cost * 5}ft toward ${target.name}.`);

              // Re-check adjacency after move
              adjacent = isAdjacent(dest.col, dest.row, targetPos.col, targetPos.row);
            }
          }
        }
      } else {
        // No map positions — default to adjacent (pre-map combat)
        adjacent = true;
      }

      // Melee attack if adjacent
      if (adjacent) {
        performMeleeAttack(currentUnit, char, target);
      } else {
        addDmMessage(`${currentUnit.name} can't reach ${target.name} — ends turn.`);
      }

      // Drain concentration messages
      setTimeout(drainConcentrationMessages, 0);
      endAITurn();
    }, 1000); // slightly longer delay than enemy AI to feel more deliberate

    return () => clearTimeout(timer);

    // Helper: end AI player's turn
    function endAITurn() {
      setTimeout(() => {
        const tr = nextTurn();
        playTurnChange();
        broadcastCombatSync(tr.units, true, combatRound + (tr.newRound ? 1 : 0), tr.turnIndex);
      }, 700);
    }

    // Helper: pick a target enemy (30% focus lowest HP, 70% random)
    function pickTarget(enemies: Unit[]): Unit {
      if (Math.random() < 0.3) {
        return [...enemies].sort((a, b) => a.hp - b.hp)[0];
      }
      return enemies[Math.floor(Math.random() * enemies.length)];
    }

    // Helper: perform a melee attack using character's equipped weapon
    function performMeleeAttack(attacker: Unit, attackerChar: Character, defender: Unit) {
      const weapon = attackerChar.equipment?.weapon;
      const strMod = Math.floor((attackerChar.stats.STR - 10) / 2);
      const dexMod = Math.floor((attackerChar.stats.DEX - 10) / 2);
      const isRanged = weapon?.isRanged || false;
      const atkStat = isRanged ? dexMod : strMod;
      const atkBonus = (weapon?.attackBonus || 0) + atkStat;
      const dmgDie = weapon?.damageDie || '1d4';
      const dmgBonus = (weapon?.damageBonus || 0) + atkStat;
      const profBonus = Math.ceil(attackerChar.level / 4) + 1;
      const featAtkBonus = (attackerChar.feats || []).includes('war-caster') ? 2 : 0;
      const featDmgBonus = (attackerChar.feats || []).includes('great-weapon-master') ? 3 : 0;
      const condAtkMod = (attacker.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
      const targetAC = effectiveAC(defender.ac, defender.conditions || []);
      const { roll, hadAdvantage, hadDisadvantage } = rollD20WithProne(attacker.conditions || [], defender.conditions || [], true);
      const totalAtk = roll + atkBonus + profBonus + condAtkMod + featAtkBonus;
      const isHit = roll === 20 || (roll !== 1 && totalAtk >= targetAC);
      const isCrit = roll === 20;
      const advTag = hadAdvantage ? ' [adv]' : hadDisadvantage ? ' [disadv]' : '';
      const weaponName = weapon?.name || 'unarmed strike';

      // Extra Attack for martial classes at level 5+
      const extraAttackClasses = ['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Monk'];
      const hasExtraAttack = extraAttackClasses.includes(attackerChar.class) && attackerChar.level >= 5;
      const numAttacks = hasExtraAttack ? 2 : 1;

      for (let atk = 0; atk < numAttacks; atk++) {
        // Re-roll for extra attacks
        const { roll: atkRoll, hadAdvantage: adv, hadDisadvantage: disadv } = atk === 0
          ? { roll, hadAdvantage, hadDisadvantage }
          : rollD20WithProne(attacker.conditions || [], defender.conditions || [], true);
        const atkTotal = atkRoll + atkBonus + profBonus + condAtkMod + featAtkBonus;
        const hit = atkRoll === 20 || (atkRoll !== 1 && atkTotal >= targetAC);
        const crit = atkRoll === 20;
        const tag = adv ? ' [adv]' : disadv ? ' [disadv]' : '';

        if (hit) {
          const baseDmg = rollSpellDamage(dmgDie);
          const finalDmg = Math.max(1, crit ? baseDmg * 2 + dmgBonus + featDmgBonus : baseDmg + dmgBonus + featDmgBonus);
          damageUnit(defender.id, finalDmg);
          playCombatHit();
          if (crit) playCritical();
          const prefix = numAttacks > 1 ? `(Attack ${atk + 1}) ` : '';
          addDmMessage(
            crit
              ? `${prefix}CRITICAL! ${attacker.name} strikes ${defender.name} with ${weaponName} for ${finalDmg} damage! (${atkRoll}+${atkBonus + profBonus}=${atkTotal} vs AC ${targetAC})${tag}`
              : `${prefix}${attacker.name} hits ${defender.name} with ${weaponName} for ${finalDmg} damage! (${atkRoll}+${atkBonus + profBonus}=${atkTotal} vs AC ${targetAC})${tag}`
          );
        } else {
          playCombatMiss();
          const prefix = numAttacks > 1 ? `(Attack ${atk + 1}) ` : '';
          addDmMessage(`${prefix}${attacker.name} misses ${defender.name} with ${weaponName}! (${atkRoll}+${atkBonus + profBonus}=${atkTotal} vs AC ${targetAC})${tag}`);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inCombat, units, characters, aiCharacterIds, damageUnit, healUnit, updateCharacter, addDmMessage, nextTurn, tickConditions, applyCondition, castSpell, useClassAbility, useItem, setUnits, terrain, mapPositions, setMapPositions, broadcastCombatSync, broadcastGameEvent, combatRound, setCombatLog, animateMoveRef, drainConcentrationMessages]);
}
