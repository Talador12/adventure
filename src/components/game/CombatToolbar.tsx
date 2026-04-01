/**
 * CombatToolbar — extracted from Game.tsx (lines 1400-2030).
 *
 * Compact toolbar with DM controls, combat actions (attack, spells, class abilities,
 * dodge, dash, disengage), rest/potion buttons, encounter generation, NPC talk,
 * scene naming, and status indicators.
 */

import { useGame, type Unit, type Item, type Character, CONDITION_EFFECTS, EXTRA_ATTACK_CLASSES, FEATS, FULL_CASTERS, HALF_CASTERS, getClassSpells, getSpellSlots, getClassAbility, rollSpellDamage, hasPendingASI, effectiveAC, rollD20WithProne, type Spell } from '../../contexts/GameContext';
import { rollLoot } from '../../data/lootTables';
import { chebyshevDistance, hasLineOfSight, isAdjacent, isFlanking, checkCover, COVER_AC_BONUS, parseRangeFt } from '../../lib/mapUtils';
import type { ActiveAoE } from '../combat/BattleMap';
import { playTurnChange, playCombatHit, playCombatMiss, playMagicSpell, playEnemyDeath, playHealing, playLevelUp, playLootDrop, playCritical } from '../../hooks/useSoundFX';
import { hitFlavor, missFlavor, critFlavor, killFlavor } from '../../data/combatFlavor';
import { combatOpener } from '../../data/combatOpeners';

interface CombatToolbarProps {
  selectedCharacter: Character | null;
  selectedUnitId: string | null;
  canUseDMTools: boolean;
  wsConnected: boolean;
  isSpectating: boolean;
  isPlayerTurn: boolean;
  adventureStarted: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastSavedAt: number | null;
  encounterDifficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  setEncounterDifficulty: (d: 'easy' | 'medium' | 'hard' | 'deadly') => void;
  encounterLoading: boolean;
  handleGenerateEncounter: () => void;
  npcMode: boolean;
  setNpcMode: (v: boolean) => void;
  npcDialogueHistory: string[];
  setNpcDialogueHistory: React.Dispatch<React.SetStateAction<string[]>>;
  sceneName: string;
  setSceneName: (v: string) => void;
  dmLoading: boolean;
  dmHistory: string[];
  setDmHistory: React.Dispatch<React.SetStateAction<string[]>>;
  combatLog: string[];
  setCombatLog: React.Dispatch<React.SetStateAction<string[]>>;
  addDmMessage: (text: string) => void;
  broadcastGameEvent: (event: string, data: Record<string, unknown>) => void;
  onAddToPartyInventory?: (item: Item) => void;
  stagedLoot?: Item[];
  onConsumeStagedLoot?: () => void;
  broadcastCombatSync: (units: Unit[], inCombat: boolean, round: number, turn: number) => void;
  broadcastCombatSyncLatest: () => void;
  drainConcentrationMessages: () => void;
  callDmNarrate: (prompt: string) => void;
  setShowLevelUpModal: (v: boolean) => void;
  setActiveView: (v: 'narration' | 'map' | 'shop') => void;
  setActiveAoE: (v: ActiveAoE | null) => void;
  setPendingAoESpell: (v: { spell: Spell; charId: string } | null) => void;
  shopMessage: string | null;
  setShopMessage: (v: string | null) => void;
  addFloatingText: (text: string, type: 'damage' | 'heal' | 'miss' | 'crit' | 'condition' | 'info', opts?: { x?: number; y?: number }) => void;
  addAttackIndicator: (fromCol: number, fromRow: number, toCol: number, toRow: number, type?: 'melee' | 'ranged' | 'spell' | 'heal') => void;
  addFlytext?: (col: number, row: number, text: string, type: 'damage' | 'heal' | 'crit' | 'miss' | 'death', gridCols: number, gridRows: number) => void;
  recordKill?: (killerName: string) => void;
  triggerDeathSave?: (characterName: string, message: string) => void;
  recordDamage?: (unitId: string, source: string, amount: number, type?: string) => void;
  triggerDeathRecap?: (unitId: string, unitName: string) => void;
  onCombatEnd?: () => void;
  triggerLevelUp?: (charName: string, level: number) => void;
  onNewRound?: (round: number) => void;
  setSpellZones?: React.Dispatch<React.SetStateAction<import('../../types/game').SpellZone[]>>;
}

export default function CombatToolbar({
  selectedCharacter,
  selectedUnitId,
  canUseDMTools,
  wsConnected,
  isSpectating,
  isPlayerTurn,
  adventureStarted,
  saveStatus,
  lastSavedAt,
  encounterDifficulty,
  setEncounterDifficulty,
  encounterLoading,
  handleGenerateEncounter,
  npcMode,
  setNpcMode,
  npcDialogueHistory,
  setNpcDialogueHistory,
  sceneName,
  setSceneName,
  dmLoading,
  dmHistory,
  setDmHistory,
  combatLog,
  setCombatLog,
  addDmMessage,
  broadcastGameEvent,
  broadcastCombatSync,
  broadcastCombatSyncLatest,
  drainConcentrationMessages,
  callDmNarrate,
  setShowLevelUpModal,
  setActiveView,
  setActiveAoE,
  setPendingAoESpell,
  shopMessage,
  setShopMessage,
  addFloatingText,
  addAttackIndicator,
  addFlytext,
  recordKill,
  triggerDeathSave,
  recordDamage,
  triggerDeathRecap,
  onCombatEnd,
  onNewRound,
  triggerLevelUp,
  setSpellZones,
  onAddToPartyInventory,
  stagedLoot,
  onConsumeStagedLoot,
}: CombatToolbarProps) {
  const {
    units,
    inCombat,
    combatRound,
    characters,
    mapPositions,
    terrain,
    rollInitiative,
    nextTurn,
    damageUnit,
    applyCondition,
    removeCondition,
    setUnits,
    setInCombat,
    grantXP,
    updateCharacter,
    castSpell,
    useClassAbility,
    restCharacter,
    useItem,
    addItem,
  } = useGame();

  return (
                <div className="flex items-center gap-2 p-3 border-b border-slate-800 flex-wrap">
                  {/* Role indicator */}
                  {wsConnected && (
                    isSpectating
                      ? <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-sky-900/40 text-sky-400 border border-sky-700/40">Spectating</span>
                      : <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${canUseDMTools ? 'bg-amber-900/40 text-amber-400 border border-amber-700/40' : 'bg-slate-800 text-slate-500 border border-slate-700/40'}`}>{canUseDMTools ? 'DM' : 'Player'}</span>
                  )}

                  {/* Save indicator */}
                  {adventureStarted && (
                    <span className={`text-[9px] px-2 py-1 rounded-md border ${
                      saveStatus === 'saving' ? 'text-yellow-400 border-yellow-700/40 bg-yellow-900/20' :
                      saveStatus === 'saved' ? 'text-emerald-400 border-emerald-700/40 bg-emerald-900/20' :
                      saveStatus === 'error' ? 'text-red-400 border-red-700/40 bg-red-900/20' :
                      'text-slate-500 border-slate-700/40 bg-slate-800/30'
                    }`}>
                      {saveStatus === 'saving' ? 'Saving...' :
                       saveStatus === 'saved' ? 'Saved' :
                       saveStatus === 'error' ? 'Save failed' :
                       lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                    </span>
                  )}

                  {/* DM-only controls: encounter, NPC, scene */}
                  {canUseDMTools && (
                    <>
                      <button onClick={handleGenerateEncounter} disabled={encounterLoading || dmLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-800/50 disabled:opacity-30 text-red-300 text-xs font-semibold rounded-lg transition-all">
                        {encounterLoading ? (
                          <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M9.944 3.143a.75.75 0 01.112 1.056l-2.4 3h2.594a.75.75 0 01.59 1.213l-3.75 4.5a.75.75 0 11-1.152-.96l2.4-3H5.744a.75.75 0 01-.59-1.213l3.75-4.5a.75.75 0 011.04-.096z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M13.944 6.143a.75.75 0 01.112 1.056l-1.2 1.5h1.394a.75.75 0 01.59 1.213l-2.25 2.7a.75.75 0 11-1.152-.96l1.2-1.5h-1.394a.75.75 0 01-.59-1.213l2.25-2.7a.75.75 0 011.04-.096z" clipRule="evenodd" />
                          </svg>
                        )}
                        Encounter
                      </button>

                      {/* Difficulty selector */}
                      <select value={encounterDifficulty} onChange={(e) => setEncounterDifficulty(e.target.value as typeof encounterDifficulty)} className="text-[10px] px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 outline-none">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="deadly">Deadly</option>
                      </select>

                      {/* NPC Talk toggle */}
                      <button
                        onClick={() => {
                          if (npcMode) {
                            setNpcMode(false);
                            setNpcDialogueHistory([]);
                          } else {
                            setNpcMode(true);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all ${npcMode ? 'bg-purple-600/40 border-purple-500/50 text-purple-200' : 'bg-purple-900/40 hover:bg-purple-900/60 border-purple-800/50 text-purple-300'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 3.976 1 5.365v2.171c0 1.388.993 2.61 2.43 2.841A41.587 41.587 0 0010 11c2.233 0 4.412-.187 6.57-.623C18.007 10.146 19 8.924 19 7.536V5.365c0-1.389-.993-2.61-2.43-2.841A41.587 41.587 0 0010 2zM1 13.694v-1.358C2.32 13.107 4.106 13.5 6 13.695v.705A4.5 4.5 0 011.5 18H1v-4.306zM14 14.4v-.705c1.894-.196 3.68-.588 5-1.36v1.359L19 18h-.5A4.5 4.5 0 0114 14.4z" clipRule="evenodd" />
                        </svg>
                        {npcMode ? 'End Talk' : 'Talk NPC'}
                      </button>

                      {/* Scene name input — compact inline */}
                      <input
                        type="text"
                        value={sceneName}
                        onChange={(e) => {
                          setSceneName(e.target.value);
                          broadcastGameEvent('scene_sync', { sceneName: e.target.value });
                        }}
                        placeholder="Scene..."
                        className="text-[10px] px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 outline-none w-24 focus:w-40 transition-all focus:ring-1 focus:ring-amber-600/50"
                      />
                    </>
                  )}

                  {/* Combat controls — show when enemies exist */}
                  {units.some((u) => u.type === 'enemy') && (
                    <>
                      {!inCombat ? (
                        <button
                          onClick={() => {
                            const sorted = rollInitiative();
                            playTurnChange();
                            const initOrder = sorted.map((u) => `${u.name}: ${u.initiative}`).join(', ');
                            setCombatLog((prev) => [...prev, combatOpener(), `Initiative rolled! ${initOrder}`]);
                            addDmMessage(combatOpener());
                            addDmMessage(`Roll for initiative! Order: ${initOrder}`);
                            broadcastCombatSync(sorted, true, 1, 0);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-900/40 hover:bg-yellow-900/60 border border-yellow-700/50 text-yellow-300 text-xs font-semibold rounded-lg transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06a.75.75 0 11-1.06 1.061L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.061-1.06l1.06-1.06a.75.75 0 011.06 0zM10 7a3 3 0 100 6 3 3 0 000-6zm-6.25 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                          </svg>
                          Roll Initiative
                        </button>
                      ) : (
                        (() => {
                          const currentUnit = units.find((u) => u.isCurrentTurn);
                          const isPlayerTurnLocal = currentUnit?.type === 'player';
                          return (
                            <button
                              onClick={() => {
                                const msg = currentUnit ? `${currentUnit.name}'s turn ends.` : '';
                                if (msg) setCombatLog((prev) => [...prev, msg]);
                                const tr = nextTurn();
                                playTurnChange();
                                if (tr.newRound) {
                                  // Generate round summary from recent combat log entries
                                  const roundLogs = combatLog.slice(combatLog.lastIndexOf(`--- Round ${combatRound} ---`) + 1);
                                  const dmgDealt = roundLogs.reduce((s, l) => { const m = l.match(/for (\d+) damage/); return s + (m ? parseInt(m[1]) : 0); }, 0);
                                  const kills = roundLogs.filter((l) => l.includes(' falls!')).length;
                                  const parts: string[] = [];
                                  if (dmgDealt > 0) parts.push(`${dmgDealt} damage dealt`);
                                  if (kills > 0) parts.push(`${kills} ${kills === 1 ? 'enemy' : 'enemies'} defeated`);
                                  if (parts.length > 0) {
                                    setCombatLog((prev) => [...prev, `Round ${combatRound}: ${parts.join(', ')}.`]);
                                  }
                                  onNewRound?.(combatRound);
                                  setCombatLog((prev) => [...prev, `--- Round ${combatRound + 1} ---`]);
                                }
                                if (tr.deathSaveMessage) {
                                  setCombatLog((prev) => [...prev, tr.deathSaveMessage!]);
                                  addDmMessage(tr.deathSaveMessage);
                                  const dyingUnit = tr.units.find((u) => u.hp === 0 && u.type === 'player');
                                  triggerDeathSave?.(dyingUnit?.name || 'Unknown', tr.deathSaveMessage);
                                }
                                broadcastCombatSync(tr.units, true, combatRound + (tr.newRound ? 1 : 0), tr.turnIndex);
                              }}
                              data-combat-action="end-turn"
                              className={`flex items-center gap-1.5 px-4 py-1.5 border text-xs font-bold rounded-lg transition-all ${isPlayerTurnLocal ? 'bg-green-900/50 hover:bg-green-800/60 border-green-600/60 text-green-300 shadow-green-900/30 shadow-sm' : 'bg-slate-700/40 hover:bg-slate-700/60 border-slate-600/50 text-slate-400'}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                              </svg>
                              {isPlayerTurnLocal ? 'End Turn' : 'Next Turn'}
                            </button>
                          );
                        })()
                      )}

                      {/* Quick attack — uses equipped weapon stats, range-aware (melee=adjacency, ranged=distance+LOS) */}
                      {inCombat &&
                        selectedUnitId &&
                        (() => {
                          const target = units.find((u) => u.id === selectedUnitId);
                          if (!target || target.type === 'player') return null;
                          // Use equipped weapon if available
                          const weapon = selectedCharacter?.equipment?.weapon;
                          const weaponDie = weapon?.damageDie || '1d4'; // unarmed = 1d4
                          const weaponAtkBonus = weapon?.attackBonus || 0;
                          const weaponDmgBonus = weapon?.damageBonus || 0;
                          const weaponIsRanged = weapon?.isRanged || false;
                          const weaponRange = weapon?.range || 1; // default 1 = melee adjacency
                          // Ranged weapons use DEX, melee uses STR
                          const statMod = selectedCharacter ? Math.floor(((weaponIsRanged ? selectedCharacter.stats.DEX : selectedCharacter.stats.STR) - 10) / 2) : 0;
                          // Player condition modifiers
                          const playerUnit = selectedCharacter ? units.find((u) => u.characterId === selectedCharacter.id) : null;
                          const condAtkMod = (playerUnit?.conditions || []).reduce((sum, c) => sum + (CONDITION_EFFECTS[c.type]?.attackMod || 0), 0);
                          // Range + LOS check
                          const attackerPos = playerUnit ? mapPositions.find((p) => p.unitId === playerUnit.id) : null;
                          const targetPos = mapPositions.find((p) => p.unitId === target.id);
                          let inRange = true;
                          let rangeTooltip: string | undefined;
                          if (attackerPos && targetPos) {
                            if (weaponIsRanged) {
                              const dist = chebyshevDistance(attackerPos.col, attackerPos.row, targetPos.col, targetPos.row);
                              const los = terrain.length > 0 ? hasLineOfSight(terrain, attackerPos.col, attackerPos.row, targetPos.col, targetPos.row) : true;
                              if (dist > weaponRange) {
                                inRange = false;
                                rangeTooltip = `Out of range (${dist * 5}ft / ${weaponRange * 5}ft)`;
                              } else if (!los) {
                                inRange = false;
                                rangeTooltip = 'No line of sight';
                              }
                            } else {
                              inRange = isAdjacent(attackerPos.col, attackerPos.row, targetPos.col, targetPos.row);
                              if (!inRange) rangeTooltip = 'Too far — move adjacent to attack';
                            }
                          }
                          return (
                            <button
                              disabled={!isPlayerTurn || !inRange}
                              title={!isPlayerTurn ? 'Wait for your turn' : rangeTooltip}
                              onClick={() => {
                                // Extra Attack: martial classes at level 5+ get 2 attacks
                                const hasExtraAttack = selectedCharacter && EXTRA_ATTACK_CLASSES.includes(selectedCharacter.class) && selectedCharacter.level >= 5;
                                const numAttacks = hasExtraAttack ? 2 : 1;
                                // Feat bonuses
                                const featDmgBonus = (selectedCharacter?.feats || []).reduce((sum, fid) => {
                                  const f = FEATS.find((ft) => ft.id === fid);
                                  return sum + (f?.damageBonus || 0);
                                }, 0);
                                const featAtkBonus = (selectedCharacter?.feats || []).reduce((sum, fid) => {
                                  const f = FEATS.find((ft) => ft.id === fid);
                                  return sum + (f?.attackBonus || 0);
                                }, 0);

                                // Flanking bonus: +2 if an ally is on the opposite side of the target
                                let flankingBonus = 0;
                                if (!weaponIsRanged && attackerPos && targetPos) {
                                  const allyPositions = units
                                    .filter((u) => u.type === 'player' && u.hp > 0 && u.id !== playerUnit?.id)
                                    .map((u) => mapPositions.find((p) => p.unitId === u.id))
                                    .filter(Boolean) as { col: number; row: number }[];
                                  if (isFlanking(attackerPos.col, attackerPos.row, targetPos.col, targetPos.row, allyPositions)) {
                                    flankingBonus = 2;
                                  }
                                }

                                // Cover bonus: ranged attacks through obstructions grant AC bonus to target
                                let coverBonus = 0;
                                let coverLabel = '';
                                if (weaponIsRanged && attackerPos && targetPos && terrain.length > 0) {
                                  const cover = checkCover(terrain, attackerPos.col, attackerPos.row, targetPos.col, targetPos.row);
                                  coverBonus = COVER_AC_BONUS[cover];
                                  if (cover !== 'none') coverLabel = ` [${cover} cover +${coverBonus} AC]`;
                                }

                                const targetAC = effectiveAC(target.ac, target.conditions || []) + coverBonus;
                                const isMeleeAttack = !weaponIsRanged;
                                let totalDamageDealt = 0;
                                for (let atk = 0; atk < numAttacks; atk++) {
                                  const { roll: attackRoll, hadAdvantage, hadDisadvantage, rolls } = rollD20WithProne(playerUnit?.conditions || [], target.conditions || [], isMeleeAttack);
                                  const totalAttack = attackRoll + statMod + weaponAtkBonus + condAtkMod + featAtkBonus + flankingBonus;
                                  const isHit = attackRoll === 20 || totalAttack >= targetAC;
                                  const isCrit = attackRoll === 20;
                                  const flankTag = flankingBonus > 0 ? '+2flank' : '';
                                  // Show both dice when adv/disadv: "rolled 14,8 [2d20]" vs normal "rolled 14 [d20]"
                                  const diceDisplay = (hadAdvantage || hadDisadvantage)
                                    ? `rolled ${rolls[0]},${rolls[1]} [2d20]`
                                    : `rolled ${attackRoll} [d20]`;
                                  const atkLabel = `${diceDisplay} ${attackRoll}+${statMod}${weaponAtkBonus ? `+${weaponAtkBonus}` : ''}${featAtkBonus ? `+${featAtkBonus}` : ''}${flankTag}=${totalAttack}`;
                                  const atkPrefix = numAttacks > 1 ? `[Attack ${atk + 1}] ` : '';
                                  const verb = weaponIsRanged ? 'shoots' : 'strikes';
                                  const advTag = (hadAdvantage ? ' [adv]' : hadDisadvantage ? ' [disadv]' : '') + coverLabel;

                                  // Trigger attack indicator on first attack
                                  if (atk === 0 && attackerPos && targetPos) {
                                    addAttackIndicator(attackerPos.col, attackerPos.row, targetPos.col, targetPos.row, weaponIsRanged ? 'ranged' : 'melee');
                                  }

                                  if (isHit) {
                                    const baseDmg = rollSpellDamage(weaponDie);
                                    let smiteDmg = 0;
                                    // Divine Smite: auto-trigger on melee hit for Paladins with smite armed
                                    if (isMeleeAttack && selectedCharacter.class === 'Paladin' && playerUnit?.conditions?.some((c) => c.type === 'smiteArmed')) {
                                      smiteDmg = rollSpellDamage('2d8');
                                      if (isCrit) smiteDmg *= 2;
                                      // Spend lowest available spell slot
                                      const slots = getSpellSlots(selectedCharacter.class, selectedCharacter.level);
                                      const used = selectedCharacter.spellSlotsUsed || {};
                                      for (const lvl of Object.keys(slots).map(Number).sort((a, b) => a - b)) {
                                        if ((used[lvl] || 0) < (slots[lvl] || 0)) {
                                          castSpell(selectedCharacter.id, 'divine-smite-spell', undefined);
                                          break;
                                        }
                                      }
                                      removeCondition(playerUnit.id, 'smiteArmed');
                                    }
                                    // Hunter's Mark: +1d6 when hitting a marked target
                                    let hunterMarkDmg = 0;
                                    if (target.conditions?.some((c) => c.type === 'hunterMarked' && c.source === selectedCharacter.name)) {
                                      hunterMarkDmg = rollSpellDamage('1d6');
                                      if (isCrit) hunterMarkDmg *= 2;
                                    }
                                    const finalDmg = Math.max(1, isCrit ? baseDmg * 2 + statMod + weaponDmgBonus + featDmgBonus + smiteDmg + hunterMarkDmg : baseDmg + statMod + weaponDmgBonus + featDmgBonus + smiteDmg + hunterMarkDmg);
                                    totalDamageDealt += finalDmg;
                                    damageUnit(target.id, finalDmg);
                                    recordDamage?.(target.id, selectedCharacter?.name || 'Unknown', finalDmg);
                                    playCombatHit();
                                    if (isCrit) {
                                      playCritical();
                                      addFloatingText(`${finalDmg}`, 'crit');
                                      if (targetPos) addFlytext?.(targetPos.col, targetPos.row, String(finalDmg), 'crit', 20, 20);
                                    } else {
                                      addFloatingText(`${finalDmg}`, 'damage');
                                      if (targetPos) addFlytext?.(targetPos.col, targetPos.row, String(finalDmg), 'damage', 20, 20);
                                    }
                                    const flavor = isCrit ? critFlavor() : hitFlavor();
                                    const smiteTag = smiteDmg > 0 ? ` [+${smiteDmg} radiant smite]` : '';
                                    const markTag = hunterMarkDmg > 0 ? ` [+${hunterMarkDmg} hunter's mark]` : '';
                                    // Critical hit extra effect (random table roll)
                                    let critEffectTag = '';
                                    if (isCrit) {
                                      const CRIT_EFFECTS = [
                                        { name: 'Lingering Wound', desc: 'bleeding 1d4/turn', cond: 'burning' as const, dur: 1 },
                                        { name: 'Disoriented', desc: 'disadvantage on next attack', cond: 'stunned' as const, dur: 1 },
                                        { name: 'Armor Crack', desc: 'AC -1', effect: 'ac' },
                                        { name: 'Brutal Strike', desc: 'extra damage die' },
                                        { name: 'Clean Hit', desc: '' },
                                        { name: 'Clean Hit', desc: '' },
                                      ];
                                      const ce = CRIT_EFFECTS[Math.floor(Math.random() * CRIT_EFFECTS.length)];
                                      if (ce.cond) applyCondition(target.id, { type: ce.cond, duration: ce.dur || 1, source: 'Critical Hit' });
                                      if (ce.effect === 'ac') setUnits((prev: Unit[]) => prev.map((u) => u.id === target.id ? { ...u, ac: Math.max(5, u.ac - 1) } : u));
                                      if (ce.desc) critEffectTag = ` [${ce.name}: ${ce.desc}]`;
                                    }
                                    const logMsg = isCrit ? `${atkPrefix}CRITICAL HIT! ${selectedCharacter?.name || 'You'} ${verb} ${target.name} for ${finalDmg} damage!${smiteTag}${markTag}${critEffectTag} ${flavor} (${atkLabel} vs AC ${targetAC})${advTag}` : `${atkPrefix}${selectedCharacter?.name || 'You'} ${verb} ${target.name} for ${finalDmg} damage.${smiteTag}${markTag} ${flavor} (${atkLabel} vs AC ${targetAC})${advTag}`;
                                    setCombatLog((prev) => [...prev, logMsg]);
                                    addDmMessage(logMsg);
                                  } else {
                                    playCombatMiss();
                                    addFloatingText('Miss', 'miss');
                                    const missMsg = `${atkPrefix}${selectedCharacter?.name || 'You'} attacks ${target.name} — ${missFlavor()} (${atkLabel} vs AC ${targetAC})${advTag}`;
                                    setCombatLog((prev) => [...prev, missMsg]);
                                    addDmMessage(missMsg);
                                  }
                                }
                                // Check for enemy death after all attacks
                                if (target.hp - totalDamageDealt <= 0) {
                                  playEnemyDeath();
                                  const deathMsg = `${target.name} falls! ${killFlavor()}`;
                                  setCombatLog((prev) => [...prev, deathMsg]);
                                  addDmMessage(deathMsg);
                                  if (targetPos) addFlytext?.(targetPos.col, targetPos.row, 'SLAIN', 'death', 20, 20);
                                  recordKill?.(selectedCharacter?.name || 'You');
                                  triggerDeathRecap?.(target.id, target.name);
                                }
                                // Drain any concentration break messages
                                setTimeout(drainConcentrationMessages, 0);
                                // Broadcast combat state after React processes the batch
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              data-combat-action="attack"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-900/40 hover:bg-orange-900/60 border border-orange-700/50 text-orange-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              {weapon ? `${weaponIsRanged ? 'Shoot' : 'Attack'} (${weapon.name})` : 'Unarmed Strike'}
                              {selectedCharacter && EXTRA_ATTACK_CLASSES.includes(selectedCharacter.class) && selectedCharacter.level >= 5 && <span className="text-[9px] ml-1 opacity-70">x2</span>}
                            </button>
                          );
                        })()}
                      {/* Cast Spell — for casters in combat or out, with range + LOS enforcement */}
                      {selectedCharacter &&
                        [...FULL_CASTERS, ...HALF_CASTERS].includes(selectedCharacter.class) &&
                        (() => {
                          const allSpells = getClassSpells(selectedCharacter.class, selectedCharacter.level);
                          const spells = allSpells.filter((s) => !s.isReaction);
                          const slots = getSpellSlots(selectedCharacter.class, selectedCharacter.level);
                          const used = selectedCharacter.spellSlotsUsed || {};
                          if (spells.length === 0) return null;
                          const target = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
                          const enemyTarget = target && target.type === 'enemy' ? target : null;
                          // Compute caster + target positions for range checks
                          const casterUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          const casterPos = casterUnit ? mapPositions.find((p) => p.unitId === casterUnit.id) : null;
                          const spellTargetPos = enemyTarget ? mapPositions.find((p) => p.unitId === enemyTarget.id) : null;
                          return (
                            <div className="relative group">
                              <button disabled={!isPlayerTurn} title={!isPlayerTurn ? 'Wait for your turn' : undefined} className={`flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold rounded-lg transition-all ${!isPlayerTurn ? 'opacity-30 cursor-not-allowed' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                  <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684z" />
                                </svg>
                                Cast Spell
                              </button>
                              {/* Dropdown spell list */}
                              <div className="absolute left-0 top-full mt-1 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 hidden group-hover:block max-h-72 overflow-y-auto">
                                {/* Slot summary */}
                                <div className="px-3 py-2 border-b border-slate-700 text-[9px] text-slate-400">
                                  {Object.keys(slots).length > 0
                                    ? Object.entries(slots).map(([lvl, max]) => {
                                        const usedCount = used[Number(lvl)] || 0;
                                        return (
                                          <span key={lvl} className="mr-2">
                                            Lv{lvl}: {max - usedCount}/{max}
                                          </span>
                                        );
                                      })
                                    : 'Cantrips only'}
                                </div>
                                {spells.map((spell) => {
                                  const slotsAvail = spell.level === 0 ? Infinity : (slots[spell.level] || 0) - (used[spell.level] || 0);
                                  // AoE spells target a location, not a unit — skip range/LOS checks (handled during placement)
                                  const isAoE = !!spell.aoe;
                                  // Range + LOS check for targeted spells (damage or condition spells that need an enemy)
                                  const spellRangeCells = parseRangeFt(spell.range);
                                  const needsTarget = !isAoE && !!(spell.damage || spell.appliesCondition) && spell.range.toLowerCase() !== 'self';
                                  let outOfRange = false;
                                  let noLos = false;
                                  if (needsTarget && enemyTarget && casterPos && spellTargetPos && spellRangeCells > 0) {
                                    const dist = chebyshevDistance(casterPos.col, casterPos.row, spellTargetPos.col, spellTargetPos.row);
                                    if (dist > spellRangeCells) outOfRange = true;
                                    else if (terrain.length > 0 && !hasLineOfSight(terrain, casterPos.col, casterPos.row, spellTargetPos.col, spellTargetPos.row)) noLos = true;
                                  }
                                  const disabled = slotsAvail <= 0 || outOfRange || noLos;
                                  const rangeHint = outOfRange ? ' (out of range)' : noLos ? ' (no line of sight)' : '';
                                  return (
                                    <button
                                      key={spell.id}
                                      disabled={disabled}
                                      title={outOfRange ? `Out of range (${spell.range})` : noLos ? 'No line of sight' : undefined}
                                      onClick={() => {
                                        // AoE spells: enter targeting mode on the battle map
                                        if (spell.aoe && selectedCharacter) {
                                          const casterUnit = units.find((u) => u.characterId === selectedCharacter.id);
                                          const casterMapPos = casterUnit ? mapPositions.find((p) => p.unitId === casterUnit.id) : undefined;
                                          setActiveAoE({
                                            shape: spell.aoe.shape,
                                            radiusCells: spell.aoe.radiusCells,
                                            color: spell.aoe.color,
                                            origin: casterMapPos ? { col: casterMapPos.col, row: casterMapPos.row } : { col: 0, row: 0 },
                                            casterPos: casterMapPos ? { col: casterMapPos.col, row: casterMapPos.row } : undefined,
                                            spellRangeCells: spellRangeCells > 0 ? spellRangeCells : undefined,
                                          });
                                          setPendingAoESpell({ spell, charId: selectedCharacter.id });
                                          setActiveView('map'); // switch to map so player can place the AoE
                                          return;
                                        }
                                        const result = castSpell(selectedCharacter.id, spell.id, enemyTarget?.id);
                                        if (result.success) {
                                          playMagicSpell();
                                          setCombatLog((prev) => [...prev, result.message]);
                                          addDmMessage(result.message);
                                          if (spell.damage && enemyTarget) {
                                            if (enemyTarget.hp <= 0) {
                                              playEnemyDeath();
                                              addDmMessage(`${enemyTarget.name} falls!`);
                                            }
                                            addFloatingText(`${spell.damage}`, 'damage');
                                          }
                                          if (spell.healAmount) { playHealing(); addFloatingText(`${spell.healAmount}`, 'heal'); }
                                          setTimeout(broadcastCombatSyncLatest, 50);
                                        } else {
                                          setShopMessage(result.message);
                                          setTimeout(() => setShopMessage(null), 2500);
                                        }
                                      }}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-700/50 transition-colors ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className={`text-xs font-semibold ${spell.level === 0 ? 'text-slate-300' : 'text-purple-300'}`}>
                                          {spell.name}
                                          {rangeHint}
                                        </span>
                                         <span className="flex items-center gap-1">
                                          {spell.components && <span className="text-[7px] text-slate-600 font-mono">{spell.components.join('')}</span>}
                                          {spell.aoe && <span className="text-[8px] px-1 py-0 rounded bg-orange-900/50 text-orange-300 font-bold uppercase">AoE</span>}
                                          <span className="text-[9px] text-slate-500">{spell.level === 0 ? 'Cantrip' : `Lv${spell.level}`}</span>
                                        </span>
                                      </div>
                                      <div className="text-[9px] text-slate-500 truncate">
                                        {spell.damage ? `${spell.damage} dmg` : spell.healAmount ? `+${spell.healAmount} HP` : spell.description.slice(0, 50)} <span className="text-slate-600">{spell.aoe ? `${spell.aoe.shape} ${spell.aoe.radiusCells * 5}ft` : spell.range}</span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                      {/* Class ability — unique per class, 1/rest */}
                      {selectedCharacter &&
                        (() => {
                          const ability = getClassAbility(selectedCharacter.class);
                          if (!ability) return null;
                          const target = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
                          const enemyTarget = target && target.type === 'enemy' ? target : null;
                          const isUsed = selectedCharacter.classAbilityUsed;
                          const needsTarget = ability.type === 'attack' || (ability.type === 'buff' && !ability.selfOnly);
                          const colorMap: Record<string, string> = {
                            red: 'bg-red-900/40 hover:bg-red-900/60 border-red-700/50 text-red-300',
                            slate: 'bg-slate-700/40 hover:bg-slate-700/60 border-slate-600/50 text-slate-300',
                            yellow: 'bg-yellow-900/40 hover:bg-yellow-900/60 border-yellow-700/50 text-yellow-300',
                            green: 'bg-green-900/40 hover:bg-green-900/60 border-green-700/50 text-green-300',
                            cyan: 'bg-cyan-900/40 hover:bg-cyan-900/60 border-cyan-700/50 text-cyan-300',
                            pink: 'bg-pink-900/40 hover:bg-pink-900/60 border-pink-700/50 text-pink-300',
                            fuchsia: 'bg-fuchsia-900/40 hover:bg-fuchsia-900/60 border-fuchsia-700/50 text-fuchsia-300',
                            blue: 'bg-blue-900/40 hover:bg-blue-900/60 border-blue-700/50 text-blue-300',
                            amber: 'bg-amber-900/40 hover:bg-amber-900/60 border-amber-700/50 text-amber-300',
                          };
                          const colors = colorMap[ability.color] || colorMap.slate;
                          return (
                            <button
                              data-combat-action="class-ability"
                              disabled={isUsed || (needsTarget && !enemyTarget) || !isPlayerTurn}
                              onClick={() => {
                                const result = useClassAbility(selectedCharacter.id, enemyTarget?.id);
                                if (result.success) {
                                  setCombatLog((prev) => [...prev, result.message]);
                                  addDmMessage(result.message);
                                  if (ability.type === 'attack' && enemyTarget && enemyTarget.hp <= 0) {
                                    playEnemyDeath();
                                    addDmMessage(`${enemyTarget.name} falls!`);
                                  }
                                  if (ability.type === 'heal') { playHealing(); addFloatingText(ability.healFormula || 'Heal', 'heal'); }
                                  if (ability.type === 'attack') { playCombatHit(); addFloatingText(ability.damage || 'Hit', 'damage'); }
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                } else {
                                  setShopMessage(result.message);
                                  setTimeout(() => setShopMessage(null), 2500);
                                }
                              }}
                              title={!isPlayerTurn ? 'Wait for your turn' : `${ability.description} (Resets on ${ability.resetsOn} rest)`}
                              className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all disabled:opacity-30 ${colors}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                              </svg>
                              {ability.name}
                              {isUsed ? ' (Used)' : ''}
                            </button>
                          );
                        })()}

                      {/* Dodge action — +2 AC until next turn */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          const isDodging = playerUnit.conditions?.some((c) => c.type === 'dodging');
                          return (
                            <button
                              data-combat-action="dodge"
                              disabled={!!isDodging || !isPlayerTurn}
                              title={!isPlayerTurn ? 'Wait for your turn' : undefined}
                              onClick={() => {
                                applyCondition(playerUnit.id, { type: 'dodging', duration: 1, source: 'Dodge' });
                                const msg = `${selectedCharacter.name} takes the Dodge action! (+2 AC until next turn)`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-900/40 hover:bg-sky-900/60 border border-sky-700/50 text-sky-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                              </svg>
                              Dodge
                            </button>
                          );
                        })()}

                      {/* Dash action — doubles remaining movement for the turn */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          const hasDashed = (playerUnit.movementUsed || 0) < 0; // sentinel: negative means dashed
                          return (
                            <button
                              data-combat-action="dash"
                              disabled={!isPlayerTurn || hasDashed}
                              title={!isPlayerTurn ? 'Wait for your turn' : hasDashed ? 'Already dashed this turn' : 'Double your remaining movement this turn'}
                              onClick={() => {
                                // Grant extra movement equal to speed (D&D 5e Dash = double movement)
                                setUnits((prev: Unit[]) => prev.map((u) => (u.id === playerUnit.id ? { ...u, movementUsed: Math.max(0, u.movementUsed) - u.speed } : u)));
                                const extraFt = (playerUnit.speed || 6) * 5;
                                const msg = `${selectedCharacter.name} takes the Dash action! (+${extraFt}ft movement this turn)`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-900/40 hover:bg-teal-900/60 border border-teal-700/50 text-teal-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-4.158a.75.75 0 011.08-1.04l5.25 5.5a.75.75 0 010 1.04l-5.25 5.5a.75.75 0 11-1.08-1.04l3.96-4.158H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                              </svg>
                              Dash
                            </button>
                          );
                        })()}

                      {/* Disengage action — prevents opportunity attacks this turn */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          return (
                            <button
                              disabled={!isPlayerTurn || playerUnit.disengaged}
                              title={!isPlayerTurn ? 'Wait for your turn' : playerUnit.disengaged ? 'Already disengaged' : 'Move without triggering opportunity attacks'}
                              onClick={() => {
                                setUnits((prev: Unit[]) => prev.map((u) => (u.id === playerUnit.id ? { ...u, disengaged: true } : u)));
                                const msg = `${selectedCharacter.name} takes the Disengage action! (No opportunity attacks this turn)`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-900/40 hover:bg-violet-900/60 border border-violet-700/50 text-violet-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                              </svg>
                              Disengage
                            </button>
                          );
                        })()}

                      {/* Grapple — contested Athletics check, target speed 0 */}
                      {inCombat && selectedCharacter && (() => {
                        const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                        if (!playerUnit) return null;
                        const target = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
                        const enemyTarget = target && target.type === 'enemy' && target.hp > 0 ? target : null;
                        const playerPos = mapPositions.find((p) => p.unitId === playerUnit.id);
                        const targetPos = enemyTarget ? mapPositions.find((p) => p.unitId === enemyTarget.id) : null;
                        const adjacent = playerPos && targetPos && isAdjacent(playerPos.col, playerPos.row, targetPos.col, targetPos.row);
                        const alreadyGrappled = enemyTarget?.conditions?.some((c) => c.type === 'grappled' && c.source === playerUnit.name);
                        return (
                          <button
                            disabled={!isPlayerTurn || !enemyTarget || !adjacent || !!alreadyGrappled}
                            title={!isPlayerTurn ? 'Wait for your turn' : !enemyTarget ? 'Select an enemy target' : !adjacent ? 'Must be adjacent (5ft)' : alreadyGrappled ? 'Target already grappled by you' : `Grapple ${enemyTarget.name} — contested Athletics check`}
                            onClick={() => {
                              if (!enemyTarget) return;
                              const strMod = Math.floor(((selectedCharacter.stats?.STR ?? 10) - 10) / 2);
                              const playerRoll = Math.floor(Math.random() * 20) + 1 + strMod;
                              const enemyAthRoll = Math.floor(Math.random() * 20) + 1 + (enemyTarget.dexMod || 0);
                              if (playerRoll >= enemyAthRoll) {
                                applyCondition(enemyTarget.id, { type: 'grappled', duration: -1, source: playerUnit.name });
                                const msg = `${selectedCharacter.name} grapples ${enemyTarget.name}! (Athletics ${playerRoll} vs ${enemyAthRoll}) — speed is 0`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              } else {
                                const msg = `${selectedCharacter.name} fails to grapple ${enemyTarget.name}. (Athletics ${playerRoll} vs ${enemyAthRoll})`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              }
                              setTimeout(broadcastCombatSyncLatest, 50);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900/30 hover:bg-rose-800/40 border border-rose-600/50 text-rose-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            Grapple
                          </button>
                        );
                      })()}

                      {/* Shove — contested Athletics, target goes prone or is pushed 5ft */}
                      {inCombat && selectedCharacter && (() => {
                        const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                        if (!playerUnit) return null;
                        const target = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
                        const enemyTarget = target && target.type === 'enemy' && target.hp > 0 ? target : null;
                        const playerPos = mapPositions.find((p) => p.unitId === playerUnit.id);
                        const targetPos = enemyTarget ? mapPositions.find((p) => p.unitId === enemyTarget.id) : null;
                        const adjacent = playerPos && targetPos && isAdjacent(playerPos.col, playerPos.row, targetPos.col, targetPos.row);
                        return (
                          <button
                            disabled={!isPlayerTurn || !enemyTarget || !adjacent}
                            title={!isPlayerTurn ? 'Wait for your turn' : !enemyTarget ? 'Select an enemy target' : !adjacent ? 'Must be adjacent (5ft)' : `Shove ${enemyTarget.name} — contested Athletics, prone or push 5ft`}
                            onClick={() => {
                              if (!enemyTarget || !playerPos || !targetPos) return;
                              const strMod = Math.floor(((selectedCharacter.stats?.STR ?? 10) - 10) / 2);
                              const playerRoll = Math.floor(Math.random() * 20) + 1 + strMod;
                              const enemyAthRoll = Math.floor(Math.random() * 20) + 1 + (enemyTarget.dexMod || 0);
                              if (playerRoll >= enemyAthRoll) {
                                // Knock prone (default shove effect)
                                applyCondition(enemyTarget.id, { type: 'prone', duration: -1, source: 'Shoved' });
                                const msg = `${selectedCharacter.name} shoves ${enemyTarget.name} prone! (Athletics ${playerRoll} vs ${enemyAthRoll})`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              } else {
                                const msg = `${selectedCharacter.name} fails to shove ${enemyTarget.name}. (Athletics ${playerRoll} vs ${enemyAthRoll})`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              }
                              setTimeout(broadcastCombatSyncLatest, 50);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-900/30 hover:bg-amber-800/40 border border-amber-600/50 text-amber-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            Shove
                          </button>
                        );
                      })()}

                      {/* Mount / Dismount — mounted combat support */}
                      {inCombat && selectedCharacter && (() => {
                        const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                        if (!playerUnit) return null;
                        const isMounted = !!playerUnit.mountId;
                        if (isMounted) {
                          return (
                            <button
                              onClick={() => {
                                const mountUnit = units.find((u) => u.id === playerUnit.mountId);
                                setUnits((prev: Unit[]) => prev.map((u) => {
                                  if (u.id === playerUnit.id) return { ...u, mountId: undefined };
                                  if (u.id === playerUnit.mountId) return { ...u, riderId: undefined };
                                  return u;
                                }));
                                const msg = `${playerUnit.name} dismounts${mountUnit ? ` from ${mountUnit.name}` : ''}.`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900/40 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 text-xs font-semibold rounded-lg transition-all"
                            >
                              Dismount
                            </button>
                          );
                        }
                        // Show mount button if there's an adjacent friendly NPC/beast that isn't already mounted
                        const playerPos = mapPositions.find((p) => p.unitId === playerUnit.id);
                        const mountable = playerPos ? units.filter((u) => u.type !== 'player' && u.hp > 0 && !u.riderId && u.id !== playerUnit.id).filter((u) => {
                          const uPos = mapPositions.find((p) => p.unitId === u.id);
                          return uPos && Math.max(Math.abs(uPos.col - playerPos.col), Math.abs(uPos.row - playerPos.row)) <= 1;
                        }) : [];
                        if (mountable.length === 0) return null;
                        return (
                          <button
                            onClick={() => {
                              const mount = mountable[0];
                              setUnits((prev: Unit[]) => prev.map((u) => {
                                if (u.id === playerUnit.id) return { ...u, mountId: mount.id };
                                if (u.id === mount.id) return { ...u, riderId: playerUnit.id };
                                return u;
                              }));
                              const msg = `${playerUnit.name} mounts ${mount.name}!`;
                              setCombatLog((prev) => [...prev, msg]);
                              addDmMessage(msg);
                              setTimeout(broadcastCombatSyncLatest, 50);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-900/40 hover:bg-amber-900/60 border border-amber-800/50 text-amber-300 text-xs font-semibold rounded-lg transition-all"
                          >
                            Mount {mountable[0].name}
                          </button>
                        );
                      })()}

                      {/* Summon Companion — create a player-controlled secondary token */}
                      {inCombat && selectedCharacter && isPlayerTurn && (() => {
                        const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                        if (!playerUnit) return null;
                        const hasCompanion = units.some((u) => u.companionOwnerId === playerUnit.id && u.hp > 0);
                        if (hasCompanion) return null;
                        const eligibleClasses = ['Ranger', 'Druid', 'Wizard', 'Warlock'];
                        if (!eligibleClasses.includes(selectedCharacter.class)) return null;
                        return (
                          <button
                            disabled={!isPlayerTurn}
                            title="Summon a familiar or companion (separate initiative, you control it)"
                            onClick={() => {
                              const name = window.prompt('Companion name (e.g. "Owl Familiar", "Wolf"):');
                              if (!name?.trim()) return;
                              const companion: Unit = {
                                id: `companion-${crypto.randomUUID().slice(0, 8)}`,
                                name: name.trim(),
                                hp: Math.max(1, Math.floor(selectedCharacter.level * 2)),
                                maxHp: Math.max(1, Math.floor(selectedCharacter.level * 2)),
                                ac: 12,
                                initiative: playerUnit.initiative - 1,
                                isCurrentTurn: false,
                                type: 'player' as const,
                                playerId: playerUnit.playerId,
                                speed: 6,
                                movementUsed: 0,
                                reactionUsed: false,
                                bonusActionUsed: false,
                                disengaged: false,
                                attackBonus: Math.floor(selectedCharacter.level / 4) + 2,
                                damageDie: '1d4',
                                damageBonus: 0,
                                dexMod: 2,
                                conditions: [],
                                isCompanion: true,
                                companionOwnerId: playerUnit.id,
                              };
                              setUnits((prev: Unit[]) => [...prev, companion]);
                              const msg = `${selectedCharacter.name} summons ${name.trim()}!`;
                              setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              setTimeout(broadcastCombatSyncLatest, 50);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-900/30 hover:bg-teal-800/40 border border-teal-600/50 text-teal-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            Summon Companion
                          </button>
                        );
                      })()}

                      {/* Help action — give an ally advantage on their next attack against a target */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          const alreadyHelping = playerUnit.conditions?.some((c) => c.type === 'helping');
                          return (
                            <button
                              disabled={!isPlayerTurn || !!alreadyHelping}
                              title={!isPlayerTurn ? 'Wait for your turn' : alreadyHelping ? 'Already helping' : 'Give an ally advantage on their next attack'}
                              onClick={() => {
                                applyCondition(playerUnit.id, { type: 'helping', duration: 1, source: 'Help' });
                                const msg = `${selectedCharacter.name} takes the Help action! (Next ally attack has advantage)`;
                                setCombatLog((prev) => [...prev, msg]);
                                addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-900/40 hover:bg-teal-900/60 border border-teal-700/50 text-teal-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                              </svg>
                              Help
                            </button>
                          );
                        })()}

                      {/* Hide action — stealth check to become hidden */}
                      {inCombat &&
                        selectedCharacter &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          const alreadyHidden = playerUnit.conditions?.some((c) => c.type === 'hidden');
                          return (
                            <button
                              disabled={!isPlayerTurn || !!alreadyHidden}
                              title={!isPlayerTurn ? 'Wait for your turn' : alreadyHidden ? 'Already hidden' : 'Attempt to hide — DEX (Stealth) check'}
                              onClick={() => {
                                // Stealth check vs passive perception of nearest enemy
                                const dexMod = Math.floor(((selectedCharacter.stats?.DEX || 10) - 10) / 2);
                                const prof = Math.ceil(selectedCharacter.level / 4) + 1;
                                const roll = Math.floor(Math.random() * 20) + 1;
                                const total = roll + dexMod + prof;
                                // Passive perception of enemies (10 + WIS mod estimate)
                                const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0);
                                const highestPP = enemies.length > 0 ? Math.max(...enemies.map((e) => 10 + (e.dexMod || 0))) : 12;
                                const success = roll === 20 || (roll !== 1 && total >= highestPP);
                                if (success) {
                                  applyCondition(playerUnit.id, { type: 'hidden', duration: 1, source: 'Hide' });
                                  const msg = `${selectedCharacter.name} hides successfully! (Stealth ${roll}+${dexMod + prof}=${total} vs PP ${highestPP}) Advantage on next attack.`;
                                  setCombatLog((prev) => [...prev, msg]);
                                  addDmMessage(msg);
                                } else {
                                  const msg = `${selectedCharacter.name} fails to hide! (Stealth ${roll}+${dexMod + prof}=${total} vs PP ${highestPP})`;
                                  setCombatLog((prev) => [...prev, msg]);
                                  addDmMessage(msg);
                                }
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/50 text-slate-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.092 1.092a4 4 0 00-5.558-5.558z" clipRule="evenodd" />
                                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                              </svg>
                              Hide
                            </button>
                          );
                        })()}

                      {/* Ready action — hold your action until a trigger occurs (uses reaction) */}
                      {inCombat && selectedCharacter && (() => {
                        const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                        if (!playerUnit) return null;
                        const hasReadied = !!playerUnit.readiedAction;
                        if (hasReadied) {
                          return (
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] text-cyan-400 font-semibold max-w-[120px] truncate" title={`Ready: ${playerUnit.readiedAction!.trigger} → ${playerUnit.readiedAction!.action}`}>
                                ⏳ {playerUnit.readiedAction!.action}
                              </span>
                              <button
                                disabled={!isPlayerTurn || playerUnit.reactionUsed}
                                title={playerUnit.reactionUsed ? 'Reaction already used' : 'Execute readied action now (uses reaction)'}
                                onClick={() => {
                                  const action = playerUnit.readiedAction!;
                                  setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, readiedAction: undefined, reactionUsed: true } : u));
                                  const msg = `${selectedCharacter.name} triggers readied action: ${action.action}! (${action.trigger})`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                }}
                                className="px-1.5 py-0.5 border border-cyan-600/50 bg-cyan-900/30 text-cyan-300 text-[9px] font-semibold rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-800/40"
                              >Fire</button>
                              <button
                                title="Cancel readied action"
                                onClick={() => {
                                  setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, readiedAction: undefined } : u));
                                  const msg = `${selectedCharacter.name} drops their readied action.`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                }}
                                className="px-1 py-0.5 border border-slate-600/50 text-slate-400 text-[9px] rounded transition-all hover:bg-slate-700/40"
                              >✕</button>
                            </div>
                          );
                        }
                        return (
                          <button
                            disabled={!isPlayerTurn}
                            title={!isPlayerTurn ? 'Wait for your turn' : 'Ready an action — hold it until a trigger occurs (uses your reaction when triggered)'}
                            onClick={() => {
                              const trigger = window.prompt('Describe the trigger (e.g. "when an enemy moves within 5ft"):');
                              if (!trigger?.trim()) return;
                              const action = window.prompt('What action will you take? (e.g. "attack", "cast Shield"):');
                              if (!action?.trim()) return;
                              setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, readiedAction: { trigger: trigger.trim(), action: action.trim() } } : u));
                              const msg = `${selectedCharacter.name} readies an action: "${action.trim()}" (trigger: ${trigger.trim()})`;
                              setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              setTimeout(broadcastCombatSyncLatest, 50);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-900/30 hover:bg-cyan-800/40 border border-cyan-600/50 text-cyan-300 text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            ⏳ Ready
                          </button>
                        );
                      })()}

                      {/* ── Bonus Actions ── */}
                      {selectedCharacter && inCombat && (() => {
                        const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                        if (!playerUnit) return null;
                        const bonusUsed = playerUnit.bonusActionUsed;
                        const charClass = selectedCharacter.class;
                        const markBonusUsed = () => {
                          setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, bonusActionUsed: true } : u));
                          setTimeout(broadcastCombatSyncLatest, 50);
                        };
                        const bonusButtons: JSX.Element[] = [];

                        // Rogue: Cunning Action (Dash, Disengage, or Hide as bonus action)
                        if (charClass === 'Rogue' && selectedCharacter.level >= 2) {
                          bonusButtons.push(
                            <button
                              key="cunning-dash"
                              disabled={!isPlayerTurn || bonusUsed}
                              title={bonusUsed ? 'Bonus action already used' : 'Cunning Action: Dash (bonus action)'}
                              onClick={() => {
                                setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, speed: u.speed + 6, bonusActionUsed: true } : u));
                                const msg = `${selectedCharacter.name} uses Cunning Action: Dash! (+30ft movement)`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1 px-2 py-1 border border-violet-600/50 bg-violet-900/30 text-violet-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-800/40"
                            >⚡ C.Dash</button>
                          );
                          bonusButtons.push(
                            <button
                              key="cunning-disengage"
                              disabled={!isPlayerTurn || bonusUsed}
                              title={bonusUsed ? 'Bonus action already used' : 'Cunning Action: Disengage (bonus action)'}
                              onClick={() => {
                                setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, disengaged: true, bonusActionUsed: true } : u));
                                const msg = `${selectedCharacter.name} uses Cunning Action: Disengage!`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1 px-2 py-1 border border-violet-600/50 bg-violet-900/30 text-violet-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-800/40"
                            >⚡ C.Disengage</button>
                          );
                        }

                        // Fighter: Second Wind (heal 1d10 + level, once per short rest)
                        if (charClass === 'Fighter') {
                          const usedSecondWind = playerUnit.conditions?.some((c) => c.type === 'inspired' && c.source === 'Second Wind Cooldown');
                          bonusButtons.push(
                            <button
                              key="second-wind"
                              disabled={!isPlayerTurn || bonusUsed || !!usedSecondWind}
                              title={usedSecondWind ? 'Second Wind already used (resets on short rest)' : bonusUsed ? 'Bonus action already used' : `Second Wind: Heal 1d10+${selectedCharacter.level} HP`}
                              onClick={() => {
                                const roll = Math.floor(Math.random() * 10) + 1 + selectedCharacter.level;
                                const healed = Math.min(roll, playerUnit.maxHp - playerUnit.hp);
                                setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, hp: Math.min(u.maxHp, u.hp + roll), bonusActionUsed: true } : u));
                                applyCondition(playerUnit.id, { type: 'inspired', duration: -1, source: 'Second Wind Cooldown' });
                                const msg = `${selectedCharacter.name} uses Second Wind! (Heals ${healed} HP, rolled ${roll})`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                playHealing();
                                markBonusUsed();
                              }}
                              className="flex items-center gap-1 px-2 py-1 border border-emerald-600/50 bg-emerald-900/30 text-emerald-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-800/40"
                            >⚡ Second Wind</button>
                          );
                        }

                        // Monk: Step of the Wind (Dash or Disengage as bonus action, level 2+)
                        if (charClass === 'Monk' && selectedCharacter.level >= 2) {
                          bonusButtons.push(
                            <button
                              key="step-of-wind"
                              disabled={!isPlayerTurn || bonusUsed}
                              title={bonusUsed ? 'Bonus action already used' : 'Step of the Wind: Dash + Disengage (bonus action)'}
                              onClick={() => {
                                setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, speed: u.speed + 6, disengaged: true, bonusActionUsed: true } : u));
                                const msg = `${selectedCharacter.name} uses Step of the Wind! (+30ft movement + Disengage)`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1 px-2 py-1 border border-violet-600/50 bg-violet-900/30 text-violet-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-800/40"
                            >⚡ Step of Wind</button>
                          );
                        }

                        // Paladin: Divine Smite toggle (auto-applies 2d8 radiant on next melee hit, spends spell slot)
                        if (charClass === 'Paladin') {
                          const smiteActive = playerUnit.conditions?.some((c) => c.type === 'smiteArmed');
                          const spellSlots = getSpellSlots(selectedCharacter.class, selectedCharacter.level);
                          const usedSlots = selectedCharacter.spellSlotsUsed || {};
                          const hasSlot = Object.entries(spellSlots).some(([lvl, max]) => (usedSlots[Number(lvl)] || 0) < max);
                          bonusButtons.push(
                            <button
                              key="divine-smite"
                              disabled={!isPlayerTurn || (bonusUsed && !smiteActive) || (!hasSlot && !smiteActive)}
                              title={smiteActive ? 'Cancel Divine Smite' : !hasSlot ? 'No spell slots remaining' : 'Arm Divine Smite — next melee hit adds 2d8 radiant + spends a spell slot'}
                              onClick={() => {
                                if (smiteActive) {
                                  removeCondition(playerUnit.id, 'smiteArmed');
                                  const msg = `${selectedCharacter.name} lowers their divine power.`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                } else {
                                  applyCondition(playerUnit.id, { type: 'smiteArmed', duration: 1, source: 'Divine Smite' });
                                  const msg = `${selectedCharacter.name} channels divine energy into their weapon! (Divine Smite armed)`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                }
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className={`flex items-center gap-1 px-2 py-1 border text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                                smiteActive
                                  ? 'border-amber-500/70 bg-amber-800/40 text-amber-200'
                                  : 'border-amber-600/50 bg-amber-900/30 text-amber-300 hover:bg-amber-800/40'
                              }`}
                            >{smiteActive ? '⚡ Smite ON' : '⚡ Divine Smite'}</button>
                          );
                        }

                        // Bard: Bardic Inspiration (bonus action, grant d6 to ally)
                        if (charClass === 'Bard') {
                          const usedInspiration = playerUnit.conditions?.some((c) => c.type === 'inspired' && c.source === 'Bardic Inspiration Cooldown');
                          const inspirationDie = selectedCharacter.level >= 15 ? 'd12' : selectedCharacter.level >= 10 ? 'd10' : selectedCharacter.level >= 5 ? 'd8' : 'd6';
                          bonusButtons.push(
                            <button
                              key="bardic-inspiration"
                              disabled={!isPlayerTurn || bonusUsed || !!usedInspiration}
                              title={usedInspiration ? 'Bardic Inspiration already used (resets on short rest)' : bonusUsed ? 'Bonus action already used' : `Bardic Inspiration: Grant a ${inspirationDie} to an ally's next roll`}
                              onClick={() => {
                                const allies = units.filter((u) => u.type === 'player' && u.hp > 0 && u.id !== playerUnit.id);
                                if (allies.length === 0) {
                                  setShopMessage('No allies to inspire!');
                                  setTimeout(() => setShopMessage(null), 2500);
                                  return;
                                }
                                const allyNames = allies.map((a) => a.name);
                                const choice = allies.length === 1 ? allies[0] : (() => {
                                  const idx = window.prompt(`Choose ally to inspire:\n${allyNames.map((n, i) => `${i + 1}. ${n}`).join('\n')}`);
                                  if (!idx) return null;
                                  return allies[parseInt(idx, 10) - 1] || null;
                                })();
                                if (!choice) return;
                                applyCondition(choice.id, { type: 'blessed', duration: 10, source: `Bardic Inspiration (${inspirationDie})` });
                                applyCondition(playerUnit.id, { type: 'inspired', duration: -1, source: 'Bardic Inspiration Cooldown' });
                                markBonusUsed();
                                const msg = `${selectedCharacter.name} inspires ${choice.name} with Bardic Inspiration! (+${inspirationDie} to next roll)`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              }}
                              className="flex items-center gap-1 px-2 py-1 border border-indigo-600/50 bg-indigo-900/30 text-indigo-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-800/40"
                            >⚡ Inspire ({inspirationDie})</button>
                          );
                        }

                        // Druid: Wild Shape (bonus action, transform into beast with separate HP pool)
                        if (charClass === 'Druid' && selectedCharacter.level >= 2) {
                          const isWild = playerUnit.isWildShaped;
                          const BEAST_FORMS = [
                            { name: 'Wolf', hp: 11, ac: 13, speed: 8, atk: 4, die: '2d4', dmg: 2, minLevel: 2 },
                            { name: 'Bear', hp: 34, ac: 11, speed: 8, atk: 5, die: '1d8', dmg: 4, minLevel: 2 },
                            { name: 'Giant Spider', hp: 26, ac: 14, speed: 6, atk: 5, die: '1d8', dmg: 3, minLevel: 4 },
                            { name: 'Giant Eagle', hp: 26, ac: 13, speed: 16, atk: 6, die: '2d6', dmg: 3, minLevel: 4 },
                            { name: 'Dire Wolf', hp: 37, ac: 14, speed: 10, atk: 5, die: '2d6', dmg: 3, minLevel: 8 },
                          ];
                          if (isWild) {
                            bonusButtons.push(
                              <button key="wild-revert" disabled={!isPlayerTurn || bonusUsed}
                                title="Revert to humanoid form"
                                onClick={() => {
                                  const orig = playerUnit.wildShapeOriginal;
                                  if (!orig) return;
                                  setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, name: orig.name, hp: orig.hp, maxHp: orig.maxHp, ac: orig.ac, speed: orig.speed, attackBonus: orig.attackBonus, damageDie: orig.damageDie, damageBonus: orig.damageBonus, isWildShaped: false, wildShapeOriginal: undefined, bonusActionUsed: true } : u));
                                  const msg = `${orig.name} reverts from Wild Shape!`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                }}
                                className="flex items-center gap-1 px-2 py-1 border border-green-600/50 bg-green-900/30 text-green-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-800/40"
                              >⚡ Revert Shape</button>
                            );
                          } else {
                            const available = BEAST_FORMS.filter((b) => selectedCharacter.level >= b.minLevel);
                            bonusButtons.push(
                              <select key="wild-shape"
                                disabled={!isPlayerTurn || bonusUsed}
                                onChange={(e) => {
                                  const beast = available.find((b) => b.name === e.target.value);
                                  if (!beast) return;
                                  setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? {
                                    ...u,
                                    wildShapeOriginal: { name: u.name, hp: u.hp, maxHp: u.maxHp, ac: u.ac, speed: u.speed, attackBonus: u.attackBonus, damageDie: u.damageDie, damageBonus: u.damageBonus },
                                    name: `${selectedCharacter.name} (${beast.name})`, hp: beast.hp, maxHp: beast.hp, ac: beast.ac, speed: beast.speed,
                                    attackBonus: beast.atk, damageDie: beast.die, damageBonus: beast.dmg,
                                    isWildShaped: true, bonusActionUsed: true,
                                  } : u));
                                  const msg = `${selectedCharacter.name} transforms into a ${beast.name}! (${beast.hp} HP, AC ${beast.ac})`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                  e.target.value = '';
                                }}
                                className="text-[10px] px-1.5 py-1 rounded bg-green-900/30 border border-green-600/50 text-green-300 font-semibold disabled:opacity-30 cursor-pointer"
                              >
                                <option value="">⚡ Wild Shape...</option>
                                {available.map((b) => <option key={b.name} value={b.name}>{b.name} ({b.hp}HP AC{b.ac})</option>)}
                              </select>
                            );
                          }
                        }

                        // Sorcerer: Metamagic (Quickened Spell + Twinned Spell, costs sorcery points)
                        if (charClass === 'Sorcerer' && selectedCharacter.level >= 3) {
                          const sorcPoints = selectedCharacter.sorceryPoints ?? selectedCharacter.level;
                          const usedPoints = selectedCharacter.sorceryPointsUsed ?? 0;
                          const remaining = sorcPoints - usedPoints;
                          // Quickened Spell: spend 2 sorcery points, next spell cast this turn is a bonus action
                          const quickened = playerUnit.conditions?.some((c) => c.type === 'inspired' && c.source === 'Quickened Spell');
                          if (!quickened && remaining >= 2) {
                            bonusButtons.push(
                              <button key="quickened-spell"
                                disabled={!isPlayerTurn || bonusUsed}
                                title={`Quickened Spell (2 sorcery points) — cast a spell as a bonus action this turn. ${remaining} points remaining.`}
                                onClick={() => {
                                  applyCondition(playerUnit.id, { type: 'inspired', duration: 1, source: 'Quickened Spell' });
                                  updateCharacter(selectedCharacter.id, { sorceryPointsUsed: usedPoints + 2 } as Partial<typeof selectedCharacter>);
                                  markBonusUsed();
                                  const msg = `${selectedCharacter.name} uses Quickened Spell! (${remaining - 2} sorcery points left)`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                }}
                                className="flex items-center gap-1 px-2 py-1 border border-fuchsia-600/50 bg-fuchsia-900/30 text-fuchsia-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-fuchsia-800/40"
                              >⚡ Quicken ({remaining}sp)</button>
                            );
                          }
                          // Twinned Spell: spend spell-level sorcery points, next single-target spell hits two targets
                          if (remaining >= 1) {
                            bonusButtons.push(
                              <button key="twinned-spell"
                                disabled={!isPlayerTurn || bonusUsed}
                                title={`Twinned Spell — next single-target spell affects 2 targets. Costs spell level in sorcery points. ${remaining} points remaining.`}
                                onClick={() => {
                                  applyCondition(playerUnit.id, { type: 'inspired', duration: 1, source: 'Twinned Spell' });
                                  updateCharacter(selectedCharacter.id, { sorceryPointsUsed: usedPoints + 1 } as Partial<typeof selectedCharacter>);
                                  markBonusUsed();
                                  const msg = `${selectedCharacter.name} prepares Twinned Spell! Next single-target spell hits 2 targets. (${remaining - 1} sorcery points left)`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                }}
                                className="flex items-center gap-1 px-2 py-1 border border-fuchsia-600/50 bg-fuchsia-900/30 text-fuchsia-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-fuchsia-800/40"
                              >⚡ Twin ({remaining}sp)</button>
                            );
                          }
                        }

                        // Ranger: Hunter's Mark (bonus action, concentration, +1d6 on marked target)
                        if (charClass === 'Ranger') {
                          const target = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
                          const enemyTarget = target && target.type === 'enemy' && target.hp > 0 ? target : null;
                          const alreadyMarked = units.some((u) => u.conditions?.some((c) => c.type === 'hunterMarked'));
                          bonusButtons.push(
                            <button key="hunters-mark"
                              disabled={!isPlayerTurn || bonusUsed || !enemyTarget || alreadyMarked}
                              title={alreadyMarked ? "Hunter's Mark already active" : !enemyTarget ? 'Select an enemy to mark' : "Hunter's Mark — +1d6 damage on attacks against this target (concentration)"}
                              onClick={() => {
                                if (!enemyTarget) return;
                                applyCondition(enemyTarget.id, { type: 'hunterMarked', duration: -1, source: selectedCharacter.name });
                                markBonusUsed();
                                const msg = `${selectedCharacter.name} marks ${enemyTarget.name} with Hunter's Mark! (+1d6 damage on hits)`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className="flex items-center gap-1 px-2 py-1 border border-lime-600/50 bg-lime-900/30 text-lime-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-lime-800/40"
                            >⚡ Hunter's Mark</button>
                          );
                        }

                        // Cleric: Channel Divinity — Turn Undead (action, frightens undead within 30ft)
                        if (charClass === 'Cleric') {
                          const usedChannel = playerUnit.conditions?.some((c) => c.type === 'inspired' && c.source === 'Channel Divinity Cooldown');
                          bonusButtons.push(
                            <button key="turn-undead" disabled={!isPlayerTurn || bonusUsed || !!usedChannel}
                              title={usedChannel ? 'Channel Divinity already used (resets on short rest)' : 'Turn Undead — undead within 30ft must make WIS save or be frightened'}
                              onClick={() => {
                                const dc = 8 + proficiencyBonus(selectedCharacter.level) + Math.floor((selectedCharacter.stats.WIS - 10) / 2);
                                const nearby = units.filter((u) => u.type === 'enemy' && u.hp > 0 && u.name.toLowerCase().match(/undead|skeleton|zombie|ghoul|wight|wraith|specter|vampire|lich/));
                                let turned = 0;
                                for (const undead of nearby) {
                                  const save = Math.floor(Math.random() * 20) + 1 + (undead.dexMod || 0);
                                  if (save < dc) {
                                    applyCondition(undead.id, { type: 'frightened', duration: 10, source: 'Turn Undead' });
                                    turned++;
                                  }
                                }
                                applyCondition(playerUnit.id, { type: 'inspired', duration: -1, source: 'Channel Divinity Cooldown' });
                                markBonusUsed();
                                const msg = turned > 0
                                  ? `${selectedCharacter.name} channels divine energy! ${turned} undead are turned! (DC ${dc})`
                                  : `${selectedCharacter.name} channels divine energy, but no undead are affected.`;
                                setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                              }}
                              className="flex items-center gap-1 px-2 py-1 border border-yellow-600/50 bg-yellow-900/30 text-yellow-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-yellow-800/40"
                            >⚡ Turn Undead</button>
                          );
                        }

                        // Barbarian: Rage (bonus action, already tracked as condition)
                        if (charClass === 'Barbarian') {
                          const isRaging = playerUnit.conditions?.some((c) => c.type === 'raging');
                          if (!isRaging) {
                            bonusButtons.push(
                              <button
                                key="rage"
                                disabled={!isPlayerTurn || bonusUsed}
                                title={bonusUsed ? 'Bonus action already used' : 'Rage! (+2 attack, resistance to physical damage)'}
                                onClick={() => {
                                  applyCondition(playerUnit.id, { type: 'raging', duration: 10, source: 'Rage' });
                                  // Grant physical damage resistance while raging
                                  setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, resistances: [...new Set([...(u.resistances || []), 'bludgeoning', 'piercing', 'slashing'])] } : u));
                                  markBonusUsed();
                                  const msg = `${selectedCharacter.name} RAGES! (+2 attack, resistance to bludgeoning/piercing/slashing)`;
                                  setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                }}
                                className="flex items-center gap-1 px-2 py-1 border border-red-600/50 bg-red-900/30 text-red-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-800/40"
                              >⚡ Rage</button>
                            );
                          }
                        }

                        if (bonusButtons.length === 0) return null;
                        return (
                          <>
                            <span className="text-[9px] text-violet-500 font-bold uppercase tracking-wider ml-1">Bonus</span>
                            {bonusButtons}
                          </>
                        );
                      })()}

                      {/* ── Reaction Spells (available off-turn) ── */}
                      {inCombat && selectedCharacter && !isPlayerTurn && (() => {
                        const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                        if (!playerUnit || playerUnit.hp <= 0 || playerUnit.reactionUsed) return null;
                        const availableSpells = getClassSpells(selectedCharacter.class, selectedCharacter.level);
                        const reactionSpells = availableSpells.filter((s) => s.isReaction);
                        if (reactionSpells.length === 0) return null;
                        const spellSlots = getSpellSlots(selectedCharacter.class, selectedCharacter.level);
                        const usedSlots = selectedCharacter.spellSlotsUsed || {};
                        return (
                          <>
                            <span className="text-[9px] text-orange-400 font-bold uppercase tracking-wider ml-1">Reaction</span>
                            {reactionSpells.map((spell) => {
                              const slotsAtLevel = spellSlots[spell.level] || 0;
                              const usedAtLevel = usedSlots[spell.level] || 0;
                              const hasSlot = slotsAtLevel > usedAtLevel;
                              return (
                                <button
                                  key={spell.id}
                                  disabled={!hasSlot}
                                  title={!hasSlot ? `No level ${spell.level} spell slots remaining` : spell.description}
                                  onClick={() => {
                                    const result = castSpell(selectedCharacter.id, spell.id);
                                    if (result.success) {
                                      playMagicSpell();
                                      setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, reactionUsed: true } : u));
                                      // Shield: apply +5 AC condition
                                      if (spell.id === 'shield') {
                                        applyCondition(playerUnit.id, { type: 'blessed', duration: 1, source: 'Shield (+5 AC)' });
                                        setUnits((prev: Unit[]) => prev.map((u) => u.id === playerUnit.id ? { ...u, ac: u.ac + 5 } : u));
                                      }
                                      const msg = `⚡ ${selectedCharacter.name} uses reaction: ${spell.name}! ${result.message}`;
                                      setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                                      setTimeout(broadcastCombatSyncLatest, 50);
                                    } else {
                                      setShopMessage(result.message);
                                      setTimeout(() => setShopMessage(null), 2500);
                                    }
                                  }}
                                  className="flex items-center gap-1 px-2 py-1 border border-orange-600/50 bg-orange-900/30 text-orange-300 text-[10px] font-semibold rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-800/40"
                                >⚡ {spell.name}</button>
                              );
                            })}
                          </>
                        );
                      })()}

                      {/* Light/Extinguish Torch — toggle torchlit condition for extended vision */}
                      {selectedCharacter &&
                        inCombat &&
                        (() => {
                          const playerUnit = units.find((u) => u.characterId === selectedCharacter.id);
                          if (!playerUnit) return null;
                          const hasTorch = playerUnit.conditions?.some((c) => c.type === 'torchlit');
                          return (
                            <button
                              data-combat-action="torch"
                              disabled={!isPlayerTurn}
                              title={!isPlayerTurn ? 'Wait for your turn' : hasTorch ? 'Extinguish torch' : 'Light a torch — 40ft vision (free action)'}
                              onClick={() => {
                                if (hasTorch) {
                                  removeCondition(playerUnit.id, 'torchlit');
                                  const msg = `${selectedCharacter.name} extinguishes their torch.`;
                                  setCombatLog((prev) => [...prev, msg]);
                                  addDmMessage(msg);
                                } else {
                                  applyCondition(playerUnit.id, { type: 'torchlit', duration: -1, source: 'Torch' });
                                  const msg = `${selectedCharacter.name} lights a torch! (40ft bright light)`;
                                  setCombatLog((prev) => [...prev, msg]);
                                  addDmMessage(msg);
                                }
                                setTimeout(broadcastCombatSyncLatest, 50);
                              }}
                              className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                                hasTorch ? 'bg-amber-900/50 border-amber-600/50 text-amber-300' : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:bg-slate-700/60'
                              }`}
                            >
                              {hasTorch ? 'Extinguish' : 'Torch'}
                            </button>
                          );
                        })()}

                      {/* Aura toggle — set a visual radius around the selected unit */}
                      {inCombat && canUseDMTools && selectedUnitId && (() => {
                        const auraUnit = units.find((u) => u.id === selectedUnitId);
                        if (!auraUnit) return null;
                        const hasAura = (auraUnit.auraRadius || 0) > 0;
                        return (
                          <button
                            onClick={() => {
                              if (hasAura) {
                                setUnits((prev: Unit[]) => prev.map((u) => u.id === auraUnit.id ? { ...u, auraRadius: undefined, auraColor: undefined } : u));
                                setCombatLog((prev) => [...prev, `${auraUnit.name}'s aura fades.`]);
                              } else {
                                const radius = parseInt(prompt('Aura radius in cells (e.g., 2 = 10ft):') || '0') || 0;
                                if (radius <= 0) return;
                                const colors = ['rgba(56,189,248,0.12)', 'rgba(234,179,8,0.12)', 'rgba(239,68,68,0.12)', 'rgba(168,85,247,0.12)', 'rgba(34,197,94,0.12)'];
                                const color = colors[Math.floor(Math.random() * colors.length)];
                                setUnits((prev: Unit[]) => prev.map((u) => u.id === auraUnit.id ? { ...u, auraRadius: radius, auraColor: color } : u));
                                setCombatLog((prev) => [...prev, `${auraUnit.name} radiates a ${radius * 5}ft aura!`]);
                              }
                              setTimeout(broadcastCombatSyncLatest, 50);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all ${
                              hasAura ? 'bg-sky-900/50 border-sky-600/50 text-sky-300' : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:bg-slate-700/60'
                            }`}
                          >
                            {hasAura ? 'Clear Aura' : 'Set Aura'}
                          </button>
                        );
                      })()}

                      {/* Grapple/Shove — contested Athletics checks */}
                      {inCombat && selectedUnitId && (() => {
                        const attacker = units.find((u) => u.id === selectedUnitId);
                        const target = units.find((u) => u.type === 'enemy' && u.hp > 0 && u.id !== selectedUnitId);
                        if (!attacker || !target) return null;
                        return (
                          <div className="flex gap-1">
                            {(['Grapple', 'Shove'] as const).map((action) => (
                              <button
                                key={action}
                                onClick={() => {
                                  const atkRoll = Math.floor(Math.random() * 20) + 1;
                                  const defRoll = Math.floor(Math.random() * 20) + 1;
                                  const atkMod = Math.floor((attacker.attackBonus || 0) / 2);
                                  const defMod = Math.floor((target.ac - 10) / 2);
                                  const atkTotal = atkRoll + atkMod;
                                  const defTotal = defRoll + defMod;
                                  const success = atkTotal >= defTotal;
                                  const msg = `${attacker.name} attempts to ${action.toLowerCase()} ${target.name}: ${atkRoll}+${atkMod}=${atkTotal} vs ${defRoll}+${defMod}=${defTotal} — ${success ? 'Success!' : 'Failed.'}`;
                                  setCombatLog((prev) => [...prev, msg]);
                                  addDmMessage(msg);
                                  if (success) {
                                    const cond = action === 'Grapple' ? 'grappled' : 'prone';
                                    setUnits((prev: Unit[]) => prev.map((u) =>
                                      u.id === target.id
                                        ? { ...u, conditions: [...(u.conditions || []), { type: cond, source: attacker.name, duration: 99 } as import('../../contexts/GameContext').ActiveCondition] }
                                        : u
                                    ));
                                  }
                                  setTimeout(broadcastCombatSyncLatest, 50);
                                }}
                                className="px-2 py-1 text-[9px] font-semibold rounded border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        );
                      })()}

                      {/* Re-roll Initiative (during combat, for when new enemies join) */}
                      {inCombat && canUseDMTools && (
                        <button
                          data-combat-action="reroll-init"
                          onClick={() => {
                            const sorted = rollInitiative();
                            setCombatLog((prev) => [...prev, 'Initiative re-rolled!']);
                            addDmMessage('Initiative re-rolled — new turn order!');
                            broadcastCombatSync(sorted, true, combatRound, 0);
                          }}
                          className="flex items-center gap-1.5 px-2 py-1.5 bg-yellow-900/20 hover:bg-yellow-900/40 border border-yellow-700/30 text-yellow-400 text-[10px] font-semibold rounded-lg transition-all"
                          title="Re-roll initiative for all units (DM only)"
                        >
                          Re-roll Init
                        </button>
                      )}

                      {/* Skill check — DM or player rolls ability/skill check */}
                      {selectedCharacter && (
                        <select
                          onChange={(e) => {
                            const skill = e.target.value;
                            if (!skill) return;
                            const SKILL_ABILITIES: Record<string, string> = {
                              Acrobatics: 'DEX', 'Animal Handling': 'WIS', Arcana: 'INT', Athletics: 'STR',
                              Deception: 'CHA', History: 'INT', Insight: 'WIS', Intimidation: 'CHA',
                              Investigation: 'INT', Medicine: 'WIS', Nature: 'INT', Perception: 'WIS',
                              Performance: 'CHA', Persuasion: 'CHA', Religion: 'INT', 'Sleight of Hand': 'DEX',
                              Stealth: 'DEX', Survival: 'WIS',
                            };
                            const ability = SKILL_ABILITIES[skill] || 'STR';
                            const stat = selectedCharacter.stats[ability as keyof typeof selectedCharacter.stats] || 10;
                            const abilityMod = Math.floor((stat - 10) / 2);
                            const prof = selectedCharacter.skillProficiencies?.includes(skill) ? proficiencyBonus(selectedCharacter.level) : 0;
                            const roll = Math.floor(Math.random() * 20) + 1;
                            const total = roll + abilityMod + prof;
                            const profTag = prof > 0 ? ' (proficient)' : '';
                            const msg = `${selectedCharacter.name} rolls ${skill} check: ${roll}+${abilityMod}${prof > 0 ? `+${prof}` : ''}=${total}${profTag}${roll === 20 ? ' — NAT 20!' : roll === 1 ? ' — NAT 1!' : ''}`;
                            setCombatLog((prev) => [...prev, msg]);
                            addDmMessage(msg);
                            e.target.value = '';
                          }}
                          className="text-[9px] px-1.5 py-1 rounded bg-slate-800/60 border border-slate-600/40 text-slate-400 cursor-pointer"
                          title="Roll a skill check"
                        >
                          <option value="">Skill Check...</option>
                          {Object.keys({ Acrobatics: 1, 'Animal Handling': 1, Arcana: 1, Athletics: 1, Deception: 1, History: 1, Insight: 1, Intimidation: 1, Investigation: 1, Medicine: 1, Nature: 1, Perception: 1, Performance: 1, Persuasion: 1, Religion: 1, 'Sleight of Hand': 1, Stealth: 1, Survival: 1 }).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      )}

                      {/* Place persistent spell zone */}
                      {inCombat && canUseDMTools && (
                        <button
                          onClick={() => {
                            const ZONE_PRESETS = [
                              { name: 'Wall of Fire', color: 'rgba(239,68,68,0.3)', dmg: 5, dmgType: 'fire', vision: false },
                              { name: 'Darkness', color: 'rgba(15,23,42,0.8)', dmg: 0, dmgType: '', vision: true },
                              { name: 'Fog Cloud', color: 'rgba(148,163,184,0.5)', dmg: 0, dmgType: '', vision: true },
                              { name: 'Spirit Guardians', color: 'rgba(250,204,21,0.2)', dmg: 3, dmgType: 'radiant', vision: false },
                              { name: 'Spike Growth', color: 'rgba(34,197,94,0.25)', dmg: 2, dmgType: 'piercing', vision: false },
                              { name: 'Moonbeam', color: 'rgba(147,197,253,0.3)', dmg: 4, dmgType: 'radiant', vision: false },
                            ];
                            const choice = window.prompt(`Place spell zone:\n${ZONE_PRESETS.map((z, i) => `${i + 1}. ${z.name}`).join('\n')}\n\nEnter number:`);
                            if (!choice) return;
                            const preset = ZONE_PRESETS[parseInt(choice, 10) - 1];
                            if (!preset) return;
                            const radius = parseInt(window.prompt(`Radius in cells (e.g. 2 = 10ft, 4 = 20ft):`) || '2', 10) || 2;
                            const col = parseInt(window.prompt('Center column (0-based):') || '12', 10);
                            const row = parseInt(window.prompt('Center row (0-based):') || '9', 10);
                            const cells: Array<{ col: number; row: number }> = [];
                            for (let r = row - radius; r <= row + radius; r++) {
                              for (let c = col - radius; c <= col + radius; c++) {
                                if (r >= 0 && c >= 0) cells.push({ col: c, row: r });
                              }
                            }
                            const zone: import('../../types/game').SpellZone = {
                              id: `zone-${crypto.randomUUID().slice(0, 8)}`,
                              name: preset.name, cells, color: preset.color, opacity: 1,
                              roundsRemaining: -1,
                              damagePerTurn: preset.dmg || undefined,
                              damageType: preset.dmgType || undefined,
                              blocksVision: preset.vision,
                            };
                            setSpellZones?.((prev: import('../../types/game').SpellZone[]) => [...prev, zone]);
                            const msg = `DM places ${preset.name} zone (${radius * 5}ft radius) at [${col},${row}]!`;
                            setCombatLog((prev) => [...prev, msg]); addDmMessage(msg);
                            setTimeout(broadcastCombatSyncLatest, 50);
                          }}
                          className="text-[9px] px-2 py-1 rounded bg-purple-900/40 border border-purple-600/40 text-purple-300 font-semibold hover:bg-purple-800/40 transition-all"
                          title="Place a persistent spell effect zone on the battle map"
                        >
                          Spell Zone
                        </button>
                      )}

                      {/* Export combat log as markdown */}
                      {combatLog.length > 5 && (
                        <button
                          onClick={() => {
                            const md = `# Combat Log\n\n${combatLog.map((l) => `- ${l}`).join('\n')}\n\n*Exported from Adventure VTT — ${new Date().toLocaleString()}*`;
                            const blob = new Blob([md], { type: 'text/markdown' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `combat-log-${new Date().toISOString().slice(0, 10)}.md`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="text-[9px] px-2 py-1 rounded bg-slate-800/60 border border-slate-600/40 text-slate-500 hover:text-slate-300 font-semibold transition-all"
                          title="Download combat log as markdown"
                        >
                          Export Log
                        </button>
                      )}

                      {/* End Combat button */}
                      {inCombat && (
                        <button
                          onClick={async () => {
                            // Count defeated enemies — use CR-based XP from unit stat block
                            const deadEnemies = units.filter((u) => u.type === 'enemy' && u.hp <= 0);
                            const totalXP = deadEnemies.reduce((sum, e) => sum + (e.xpValue || 50 * (selectedCharacter?.level || 1)), 0);
                            const goldReward = deadEnemies.reduce((sum, e) => sum + Math.floor((e.cr || 0.25) * 30) + Math.floor(Math.random() * 20), 0);

                            // Per-character combat damage recap
                            const playerUnits = units.filter((u) => u.type === 'player');
                            const recap: string[] = ['--- Combat Recap ---'];
                            for (const pu of playerUnits) {
                              const dmgDealt = combatLog.reduce((sum, l) => {
                                const m = l.match(new RegExp(`${pu.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*for (\\d+) damage`));
                                return sum + (m ? parseInt(m[1]) : 0);
                              }, 0);
                              const hpLost = pu.maxHp - pu.hp;
                              recap.push(`${pu.name}: ${dmgDealt} dealt, ${hpLost} taken (${pu.hp}/${pu.maxHp} HP)`);
                            }
                            if (playerUnits.length > 0) setCombatLog((prev) => [...prev, ...recap]);

                            setInCombat(false);
                            onCombatEnd?.();
                            // Auto-save campaign state on combat end
                            fetch(`/api/campaign/${room}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inCombat: false }) }).catch(() => {});
                            // Remove dead enemies, reset initiative and conditions
                            setUnits((prev: Unit[]) => prev.filter((u) => u.type === 'player' || u.hp > 0).map((u) => ({ ...u, isCurrentTurn: false, initiative: -1, conditions: [] })));

                            // Award XP and gold evenly to ALL party members
                            if (characters.length > 0 && totalXP > 0) {
                              const xpPerChar = Math.floor(totalXP / characters.length);
                              const goldPerChar = Math.floor(goldReward / characters.length);
                              const goldRemainder = goldReward - goldPerChar * characters.length;

                              addFloatingText(`+${xpPerChar} XP each`, 'heal');
                              const rewardMsg = `Battle won! ${totalXP} XP split among ${characters.length} → ${xpPerChar} XP each. ${goldReward} gold${goldPerChar > 0 ? ` (${goldPerChar}gp each)` : ''}.`;
                              addDmMessage(rewardMsg);

                              for (let ci = 0; ci < characters.length; ci++) {
                                const ch = characters[ci];
                                const extraGold = ci === 0 ? goldRemainder : 0; // remainder to first char
                                const { leveledUp, newLevel } = grantXP(ch.id, xpPerChar);
                                updateCharacter(ch.id, { gold: (ch.gold || 0) + goldPerChar + extraGold });

                                if (leveledUp) {
                                  playLevelUp();
                                  triggerLevelUp?.(ch.name, newLevel);
                                  addDmMessage(`LEVEL UP! ${ch.name} is now level ${newLevel}!`);
                                }
                              }

                              // ASI check for selected character specifically
                              if (selectedCharacter) {
                                const { leveledUp, newLevel } = { leveledUp: false, newLevel: selectedCharacter.level }; // already granted above
                                const updatedChar = characters.find((c) => c.id === selectedCharacter.id);
                                if (updatedChar && hasPendingASI({ ...updatedChar, level: updatedChar.level })) {
                                  setTimeout(() => setShowLevelUpModal(true), 1500); // show after a beat
                                }
                              }

                              // Loot: use staged loot if DM pre-assigned, otherwise roll from tables
                              if (selectedCharacter && stagedLoot && stagedLoot.length > 0) {
                                playLootDrop();
                                for (const item of stagedLoot) {
                                  if (onAddToPartyInventory) onAddToPartyInventory(item);
                                  else addItem(selectedCharacter.id, item);
                                }
                                const stagedNames = stagedLoot.map((i) => i.name).join(', ');
                                addDmMessage(`Loot: ${goldReward} gold + ${stagedNames} (DM-assigned)`);
                                onConsumeStagedLoot?.();
                              } else if (selectedCharacter) {
                                const lootResult = rollLoot(encounterDifficulty as 'easy' | 'medium' | 'hard' | 'deadly');
                                if (lootResult.items.length > 0 || lootResult.gold > 0) {
                                  playLootDrop();
                                  updateCharacter(selectedCharacter.id, { gold: (selectedCharacter.gold || 0) + lootResult.gold });
                                  if (lootResult.items.length > 0 && onAddToPartyInventory) {
                                    for (const item of lootResult.items) onAddToPartyInventory(item);
                                  } else {
                                    for (const item of lootResult.items) addItem(selectedCharacter.id, item);
                                  }
                                  addDmMessage(lootResult.description);
                                }
                              }
                            } else {
                              addDmMessage('The battle ends. You catch your breath.');
                            }

                            // Broadcast combat end to all players
                            setTimeout(broadcastCombatSyncLatest, 100);

                            // Ask the DM to narrate the aftermath
                            const lootContext = selectedCharacter ? ` The party found some items among the remains.` : '';
                            callDmNarrate(`The combat has ended. ${deadEnemies.length} enemies were defeated.${lootContext} Narrate the aftermath — what do the characters find? Any clues or consequences?`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-300 text-xs font-semibold rounded-lg transition-all"
                        >
                          End Combat
                        </button>
                      )}
                    </>
                  )}

                  {/* Level Up indicator — show when character has pending ASI/feat choice */}
                  {selectedCharacter && hasPendingASI(selectedCharacter) && (
                    <button onClick={() => setShowLevelUpModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800/50 hover:bg-amber-700/60 border border-amber-500/60 text-amber-200 text-xs font-bold rounded-lg transition-all animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                      </svg>
                      Level Up!
                    </button>
                  )}

                  {/* Rest buttons — show when not in combat and character selected */}
                  {selectedCharacter && !inCombat && (
                    <>
                      <button
                        onClick={() => {
                          restCharacter(selectedCharacter.id, 'short');
                          playHealing();
                          addFloatingText('Short Rest', 'heal');
                          addDmMessage(`${selectedCharacter.name} takes a short rest, tending wounds and catching their breath.`);
                          // Fire-and-forget AI rest narration
                          fetch('/api/dm/narrate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: `${selectedCharacter.name} takes a short rest`, context: sceneName || 'camp', history: [] }) })
                            .then((r) => r.json() as Promise<{ narration?: string }>)
                            .then((d) => { if (d.narration) addDmMessage(d.narration); })
                            .catch(() => {});
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-900/40 hover:bg-sky-900/60 border border-sky-800/50 text-sky-300 text-xs font-semibold rounded-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                        Short Rest
                      </button>
                      <button
                        onClick={() => {
                          restCharacter(selectedCharacter.id, 'long');
                          playHealing();
                          addFloatingText('Full Rest', 'heal');
                          addDmMessage(`${selectedCharacter.name} settles in for a long rest. HP fully restored.`);
                          fetch('/api/dm/narrate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: `The party makes camp and ${selectedCharacter.name} settles in for a long rest`, context: sceneName || 'a quiet clearing', history: [] }) })
                            .then((r) => r.json() as Promise<{ narration?: string }>)
                            .then((d) => { if (d.narration) addDmMessage(d.narration); })
                            .catch(() => {});
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900/40 hover:bg-indigo-900/60 border border-indigo-800/50 text-indigo-300 text-xs font-semibold rounded-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                        </svg>
                        Long Rest
                      </button>
                    </>
                  )}

                  {/* Use Potion button — show when character has healing potions and is hurt */}
                  {selectedCharacter &&
                    selectedCharacter.hp < selectedCharacter.maxHp &&
                    (() => {
                      const potions = (selectedCharacter.inventory || []).filter((i: Item) => i.type === 'potion' && i.healAmount);
                      if (potions.length === 0) return null;
                      const potion = potions[0]; // use first available potion
                      return (
                        <button
                          data-combat-action="potion"
                          onClick={() => {
                            const { message } = useItem(selectedCharacter.id, potion.id);
                            if (message) addDmMessage(message);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 text-xs font-semibold rounded-lg transition-all"
                          title={`${potion.name} — restores ${potion.healAmount} HP`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                          </svg>
                          {potion.name}
                          {potion.quantity && potion.quantity > 1 ? ` (${potion.quantity})` : ''}
                        </button>
                      );
                    })()}

                  {/* Clear history button */}
                  {dmHistory.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm('Clear all narration history for this campaign?')) {
                          setDmHistory([]);
                          setCombatLog([]);
                        }
                      }}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-slate-600 hover:text-red-400 text-[10px] transition-colors"
                      title="Clear narration history"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5z" clipRule="evenodd" />
                      </svg>
                      Clear
                    </button>
                  )}

                  <div className="flex-1" />

                  {/* Status indicators */}
                  <span className="text-[10px] text-slate-600">
                    {dmHistory.length} narration{dmHistory.length !== 1 ? 's' : ''}
                    {inCombat ? ` | Round ${combatRound}` : ''}
                    {selectedCharacter ? ` | ${selectedCharacter.hp}/${selectedCharacter.maxHp} HP | ${selectedCharacter.gold || 0}g` : ''}
                  </span>
                </div>
  );
}
