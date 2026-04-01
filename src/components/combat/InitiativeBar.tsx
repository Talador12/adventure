import { useState, useEffect, useRef, useCallback } from 'react';
import { useGame, type Unit, CONDITION_EFFECTS } from '../../contexts/GameContext';
import { playCountdownTick } from '../../hooks/useSoundFX';
import { characterMood } from '../../lib/characterMood';

const DEFAULT_TURN_TIME = 60; // seconds per turn

interface InitiativeBarProps {
  entries: Unit[];
  turnTimerEnabled?: boolean;
  turnTimeSeconds?: number;
  onTimerExpire?: () => void; // called when turn timer hits 0
  canReorder?: boolean; // DM can drag to reorder all cards
  myUnitId?: string; // player's own unit ID — can drag their own card even if !canReorder
  onReorder?: (reorderedIds: string[]) => void; // callback with new order
  onInitiativeChange?: (unitId: string, newInit: number) => void; // DM manual edit
}

export default function InitiativeBar({ entries, turnTimerEnabled = true, turnTimeSeconds = DEFAULT_TURN_TIME, onTimerExpire, canReorder, myUnitId, onReorder, onInitiativeChange }: InitiativeBarProps) {
  const { players, characters, selectedUnitId, setSelectedUnitId } = useGame();

  // Drag reorder state
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Inline initiative editing state (DM only)
  const [editingInitId, setEditingInitId] = useState<string | null>(null);
  const [editingInitValue, setEditingInitValue] = useState('');

  // Turn timer
  const [timeLeft, setTimeLeft] = useState(turnTimeSeconds);
  const currentTurnId = entries.find((e) => e.isCurrentTurn)?.id ?? null;
  const prevTurnId = useRef(currentTurnId);
  // Track turn change for entrance animation
  const [animatingTurnId, setAnimatingTurnId] = useState<string | null>(null);

  // Reset timer + trigger entrance animation on turn change
  useEffect(() => {
    if (currentTurnId !== prevTurnId.current) {
      prevTurnId.current = currentTurnId;
      setTimeLeft(turnTimeSeconds);
      // Trigger entrance animation
      if (currentTurnId) {
        setAnimatingTurnId(currentTurnId);
        const timer = setTimeout(() => setAnimatingTurnId(null), 600);
        return () => clearTimeout(timer);
      }
    }
  }, [currentTurnId, turnTimeSeconds]);

  // Countdown tick
  useEffect(() => {
    if (!turnTimerEnabled || !currentTurnId) return;
    if (timeLeft <= 0) {
      onTimerExpire?.();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => {
      const next = Math.max(0, t - 1);
      if (next > 0 && next <= 5) playCountdownTick(next);
      return next;
    }), 1000);
    return () => clearInterval(timer);
  }, [turnTimerEnabled, currentTurnId, timeLeft, onTimerExpire]);

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}:${sec.toString().padStart(2, '0')}` : `${sec}s`;
  }, []);

  const timerPct = turnTimeSeconds > 0 ? (timeLeft / turnTimeSeconds) * 100 : 100;
  const timerColor = timeLeft <= 10 ? 'text-red-400' : timeLeft <= 20 ? 'text-yellow-400' : 'text-green-400';

  // Look up the player controlling each unit
  const getPlayerLabel = (unit: Unit) => {
    const player = players.find((p) => p.id === unit.playerId);
    if (!player) return null;
    if (player.controllerType === 'ai') return { label: 'AI', color: 'text-purple-400 bg-purple-500/20' };
    return { label: player.username, color: 'text-sky-400 bg-sky-500/15' };
  };

  // Look up portrait from linked character
  const getPortrait = (unit: Unit): string | null => {
    // Check unit's own token image first (AI-generated enemy portraits)
    if (unit.tokenImage) return unit.tokenImage;
    // Then fall back to linked character portrait
    if (!unit.characterId) return null;
    const char = characters.find((c) => c.id === unit.characterId);
    return char?.portrait || null;
  };

  // Auto-scroll to current turn unit
  const scrollRef = useRef<HTMLDivElement>(null);
  const turnCardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  useEffect(() => {
    if (!currentTurnId) return;
    const card = turnCardRefs.current.get(currentTurnId);
    if (card && scrollRef.current) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentTurnId]);

  return (
    <div className="w-full overflow-x-auto" ref={scrollRef}>
      <div className="flex gap-3 p-3 min-w-max">
        {entries.map((entry) => {
          const maxHp = entry.maxHp || entry.hp;
          const hpPct = Math.max(0, Math.min(100, (entry.hp / maxHp) * 100));
          const isLow = hpPct <= 25;
          const isMid = hpPct <= 50 && !isLow;
          const isSelected = selectedUnitId === entry.id;
          const playerLabel = getPlayerLabel(entry);
          const portrait = getPortrait(entry);

          // Threat indicator for enemies — color-coded by CR vs avg party level
          const avgPartyLevel = characters.reduce((s, c) => s + c.level, 0) / Math.max(1, characters.length);
          const threatLevel = entry.type === 'enemy' && entry.cr !== undefined
            ? entry.cr >= avgPartyLevel * 1.5 ? 'deadly' : entry.cr >= avgPartyLevel ? 'hard' : entry.cr >= avgPartyLevel * 0.5 ? 'medium' : 'easy'
            : null;
          const threatColor = threatLevel === 'deadly' ? 'text-red-500' : threatLevel === 'hard' ? 'text-orange-400' : threatLevel === 'medium' ? 'text-yellow-400' : threatLevel === 'easy' ? 'text-slate-500' : '';

          // Turn order prediction — how many turns until this unit goes
          const currentIdx = entries.findIndex((e) => e.isCurrentTurn);
          const myIdx = entries.indexOf(entry);
          const aliveEntries = entries.filter((e) => e.hp > 0);
          const turnsAway = currentIdx >= 0 && myIdx >= 0 && !entry.isCurrentTurn && entry.hp > 0
            ? (myIdx - currentIdx + entries.length) % entries.length
            : 0;

          const isEntering = animatingTurnId === entry.id;

          const isDragging = dragId === entry.id;
          const isDragOver = dragOverId === entry.id && dragId !== entry.id;

          return (
            <button
              key={entry.id}
              ref={(el) => { if (el) turnCardRefs.current.set(entry.id, el); else turnCardRefs.current.delete(entry.id); }}
              onClick={() => setSelectedUnitId(isSelected ? null : entry.id)}
              draggable={canReorder || entry.id === myUnitId}
              onDragStart={(e) => {
                if (!canReorder && entry.id !== myUnitId) return;
                setDragId(entry.id);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragOver={(e) => {
                if ((!canReorder && dragId !== myUnitId) || !dragId) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setDragOverId(entry.id);
              }}
              onDragLeave={() => { if (dragOverId === entry.id) setDragOverId(null); }}
              onDrop={(e) => {
                e.preventDefault();
                if ((!canReorder && dragId !== myUnitId) || !dragId || dragId === entry.id) { setDragId(null); setDragOverId(null); return; }
                // Reorder: move dragId to the position of entry.id
                const ids = entries.map((e) => e.id);
                const fromIdx = ids.indexOf(dragId);
                const toIdx = ids.indexOf(entry.id);
                if (fromIdx === -1 || toIdx === -1) { setDragId(null); setDragOverId(null); return; }
                ids.splice(fromIdx, 1);
                ids.splice(toIdx, 0, dragId);
                onReorder?.(ids);
                setDragId(null);
                setDragOverId(null);
              }}
              onDragEnd={() => { setDragId(null); setDragOverId(null); }}
              className={`relative flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 min-w-[100px] border transition-all duration-300 cursor-pointer group ${
                isSelected ? 'border-[#F38020] bg-[#F38020]/10 shadow-lg ring-1 ring-[#F38020]/50' : entry.isCurrentTurn ? 'border-yellow-500/80 bg-yellow-500/10 shadow-lg scale-105' : 'border-slate-700 bg-slate-800/80 hover:border-slate-600 hover:bg-slate-800'
              } ${entry.type === 'enemy' && !isSelected && !entry.isCurrentTurn ? 'border-red-900/50' : ''} ${isEntering ? 'animate-turn-enter' : ''} ${isDragging ? 'opacity-50 scale-95' : ''} ${isDragOver ? 'ring-2 ring-purple-500/60 border-purple-500/60' : ''} ${canReorder || entry.id === myUnitId ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={entry.isCurrentTurn && !isSelected ? { boxShadow: '0 0 20px rgba(234,179,8,0.2)' } : undefined}
            >
              {/* Turn indicator + timer */}
              {entry.isCurrentTurn && (
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 ${isEntering ? 'animate-turn-badge' : ''}`}>
                  <div className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md shadow-yellow-500/30">TURN</div>
                  {turnTimerEnabled && (
                    <div className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 ${timerColor} ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
                      {formatTime(timeLeft)}
                    </div>
                  )}
                </div>
              )}

              {/* Selected for dice indicator */}
              {isSelected && !entry.isCurrentTurn && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#F38020] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">DICE</div>}

              {/* Avatar — portrait if linked to character, otherwise initial */}
              <div className={`relative ${entry.concentratingOn ? 'ring-2 ring-purple-400/60 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.4)]' : ''}`}>
                {portrait ? (
                  <img src={portrait} alt={entry.name} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${entry.type === 'enemy' ? 'bg-red-900/60 text-red-300' : entry.type === 'npc' ? 'bg-blue-900/60 text-blue-300' : 'bg-orange-500/20 text-orange-400'}`}>{entry.name.charAt(0).toUpperCase()}</div>
                )}
                {entry.concentratingOn && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-purple-500 border border-slate-900 flex items-center justify-center text-[7px] text-white font-bold animate-pulse" title={`Concentrating: ${entry.concentratingOn}`}>C</span>
                )}
              </div>

              {/* Name + mood + threat */}
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-[9px]" title={`${entry.name}'s mood`}>{characterMood(hpPct, (entry.conditions || []).map((c) => c.type))}</span>
                <span className={`text-xs font-semibold truncate max-w-[66px] ${isSelected ? 'text-[#F38020]' : entry.isCurrentTurn ? 'text-yellow-300' : 'text-slate-300'}`}>{entry.name}</span>
                {threatLevel && <span className={`text-[7px] font-bold ${threatColor}`} title={`Threat: ${threatLevel}`}>{threatLevel === 'deadly' ? '!!' : threatLevel === 'hard' ? '!' : ''}</span>}
              </div>

              {/* Player/AI controller label */}
              {playerLabel && <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${playerLabel.color}`}>{playerLabel.label}</span>}

              {/* AC + Initiative */}
              <div className="flex items-center gap-2 text-[9px] font-mono">
                <span className="text-sky-400">AC {entry.ac}</span>
                {entry.reactionUsed && <span className="text-orange-500" title="Reaction used this round">R</span>}
                {entry.bonusActionUsed && <span className="text-violet-400" title="Bonus action used this turn">B</span>}
                {entry.readiedAction && <span className="text-cyan-400" title={`Ready: ${entry.readiedAction.trigger} → ${entry.readiedAction.action}`}>⏳</span>}
                {entry.isWildShaped && <span className="text-green-400" title="Wild Shape active">🐺</span>}
                {/* Spell slot indicator for casters */}
                {entry.type === 'player' && entry.characterId && (() => {
                  const char = characters.find((c) => c.id === entry.characterId);
                  if (!char) return null;
                  const CASTER_CLASSES = ['Wizard', 'Sorcerer', 'Warlock', 'Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'];
                  if (!CASTER_CLASSES.includes(char.class)) return null;
                  const totalSlots = Object.values(char.spellSlots || {}).reduce((s: number, v: unknown) => s + (typeof v === 'number' ? v : 0), 0);
                  const usedSlots = Object.values(char.spellSlotsUsed || {}).reduce((s: number, v: unknown) => s + (typeof v === 'number' ? v : 0), 0);
                  const remaining = Math.max(0, totalSlots - usedSlots);
                  if (totalSlots === 0) return null;
                  return <span className={`text-[8px] font-mono ${remaining > 0 ? 'text-blue-400' : 'text-slate-600'}`} title={`Spell slots: ${remaining}/${totalSlots}`}>◆{remaining}</span>;
                })()}
                {/* Death saves — shown for player units at 0 HP */}
                {entry.type === 'player' && entry.hp <= 0 && entry.deathSaves && (
                  <span className="flex items-center gap-0.5" title={`Death Saves: ${entry.deathSaves.successes} success / ${entry.deathSaves.failures} fail`}>
                    {[0,1,2].map((i) => <span key={`s${i}`} className={`w-1.5 h-1.5 rounded-full ${i < entry.deathSaves!.successes ? 'bg-emerald-400' : 'bg-slate-700'}`} />)}
                    <span className="text-slate-600 mx-0.5">/</span>
                    {[0,1,2].map((i) => <span key={`f${i}`} className={`w-1.5 h-1.5 rounded-full ${i < entry.deathSaves!.failures ? 'bg-red-500' : 'bg-slate-700'}`} />)}
                  </span>
                )}
                {turnsAway > 0 && <span className="text-slate-600">in {turnsAway}</span>}
                {entry.initiative > 0 && (
                  editingInitId === entry.id ? (
                    <input
                      type="number"
                      autoFocus
                      value={editingInitValue}
                      onChange={(e) => setEditingInitValue(e.target.value)}
                      onBlur={() => {
                        const val = parseInt(editingInitValue, 10);
                        if (!isNaN(val) && val !== entry.initiative) onInitiativeChange?.(entry.id, val);
                        setEditingInitId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                        if (e.key === 'Escape') setEditingInitId(null);
                      }}
                      className="w-8 bg-slate-800 border border-amber-600/50 rounded px-1 py-0 text-[9px] text-amber-400 font-mono text-center focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  ) : (
                    <span
                      className={`text-amber-400 ${onInitiativeChange ? 'cursor-pointer hover:text-amber-300 hover:underline' : ''}`}
                      title={onInitiativeChange ? 'Click to edit initiative (DM)' : undefined}
                      onClick={(e) => {
                        if (!onInitiativeChange) return;
                        e.stopPropagation();
                        setEditingInitId(entry.id);
                        setEditingInitValue(String(entry.initiative));
                      }}
                    >
                      Init {entry.initiative}
                      {entries.some((e) => e.id !== entry.id && e.initiative === entry.initiative) && entry.dexMod !== undefined && (
                        <span className="text-amber-600 ml-0.5">(+{entry.dexMod})</span>
                      )}
                    </span>
                  )
                )}
              </div>

              {/* HP bar — shakes when low, glows when full */}
              <div className={`w-full h-1.5 bg-slate-700 rounded-full overflow-hidden hp-bar-shimmer ${isLow && entry.hp > 0 ? 'animate-damage-shake' : ''}`}>
                <div className={`h-full rounded-full transition-all duration-500 ease-out ${isLow ? 'bg-red-500' : isMid ? 'bg-yellow-500' : hpPct >= 100 ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]' : 'bg-green-500'}`} style={{ width: `${hpPct}%` }} />
              </div>

              {/* Turn timer bar (only on current turn unit) */}
              {entry.isCurrentTurn && turnTimerEnabled && (
                <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500' : timeLeft <= 20 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${timerPct}%` }}
                  />
                </div>
              )}

              {/* HP text */}
              <span className={`text-[10px] font-mono ${isLow ? 'text-red-400' : isMid ? 'text-yellow-400' : 'text-slate-500'}`}>
                {entry.hp}/{maxHp}
              </span>

              {/* Condition badges — with reference tooltips */}
              {entry.conditions && entry.conditions.length > 0 && (
                <div className="flex flex-wrap gap-0.5 mt-0.5">
                  {entry.conditions.map((c, i) => (
                    <span key={i} className={`text-[7px] font-bold uppercase px-1 py-0 rounded cursor-help ${CONDITION_EFFECTS[c.type]?.color || 'text-slate-400'} bg-slate-900/80`} title={`${c.type.charAt(0).toUpperCase() + c.type.slice(1)}: ${CONDITION_EFFECTS[c.type]?.description || 'Unknown condition'}${c.duration > 0 ? ` (${c.duration} rounds remaining)` : ''}${c.source ? ` — Source: ${c.source}` : ''}`}>
                      {c.type}{c.duration > 0 ? ` ${c.duration}` : ''}
                    </span>
                  ))}
                </div>
              )}

              {/* Legendary action indicator */}
              {entry.legendaryActions && entry.legendaryActions > 0 && (
                <div className="flex items-center gap-0.5 mt-0.5" title={`Legendary Actions: ${(entry.legendaryActions - (entry.legendaryActionsUsed || 0))} / ${entry.legendaryActions} remaining`}>
                  {Array.from({ length: entry.legendaryActions }).map((_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full border ${i < (entry.legendaryActions! - (entry.legendaryActionsUsed || 0)) ? 'bg-purple-500 border-purple-400 shadow-sm shadow-purple-500/40' : 'bg-slate-700 border-slate-600'}`} />
                  ))}
                  <span className="text-[7px] text-purple-400 font-bold ml-0.5">LEG</span>
                </div>
              )}

              {/* Hover tooltip — detailed stat block */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-slate-900 border border-slate-600 rounded-xl shadow-2xl p-3 z-50 hidden group-hover:block pointer-events-none">
                <div className="text-xs font-bold text-slate-200 mb-1.5 truncate">{entry.name}</div>
                <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-[10px] mb-2">
                  <div><span className="text-slate-500">HP</span> <span className={isLow ? 'text-red-400' : isMid ? 'text-yellow-400' : 'text-green-400'}>{entry.hp}/{maxHp}</span></div>
                  <div><span className="text-slate-500">AC</span> <span className="text-sky-400">{entry.ac}</span></div>
                  <div><span className="text-slate-500">Init</span> <span className="text-amber-400">{entry.initiative}</span></div>
                  {entry.speed != null && <div><span className="text-slate-500">Speed</span> <span className="text-emerald-400">{entry.speed * 5}ft</span></div>}
                  {entry.attackBonus != null && <div><span className="text-slate-500">Atk</span> <span className="text-orange-400">+{entry.attackBonus}</span></div>}
                  {entry.dexMod != null && <div><span className="text-slate-500">DEX</span> <span className="text-slate-300">{entry.dexMod >= 0 ? '+' : ''}{entry.dexMod}</span></div>}
                  {entry.cr != null && <div><span className="text-slate-500">CR</span> <span className="text-yellow-400">{entry.cr}</span></div>}
                  {entry.xpValue != null && <div><span className="text-slate-500">XP</span> <span className="text-yellow-400">{entry.xpValue}</span></div>}
                  {entry.damageDie && <div><span className="text-slate-500">Dmg</span> <span className="text-red-400">{entry.damageDie}{entry.damageBonus ? `+${entry.damageBonus}` : ''}</span></div>}
                </div>
                {entry.concentratingOn && (
                  <div className="text-[9px] text-purple-400 mb-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />Concentrating: {entry.concentratingOn}
                  </div>
                )}
                {entry.abilities && entry.abilities.length > 0 && (
                  <div className="border-t border-slate-700 pt-1.5 mt-1">
                    <div className="text-[9px] text-slate-500 font-semibold uppercase mb-1">Abilities</div>
                    {entry.abilities.map((a, i) => {
                      const cd = entry.abilityCooldowns?.[a.name] || 0;
                      return (
                        <div key={i} className="text-[9px] text-slate-400 flex items-center justify-between">
                          <span>{a.name} <span className="text-slate-600">({a.damageDie}{a.isRanged ? `, ${(a.range || 0) * 5}ft` : ''})</span></span>
                          {cd > 0 ? <span className="text-red-500 text-[8px]">CD {cd}</span> : <span className="text-green-500 text-[8px]">Ready</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
                {entry.conditions && entry.conditions.length > 0 && (
                  <div className="border-t border-slate-700 pt-1.5 mt-1">
                    <div className="text-[9px] text-slate-500 font-semibold uppercase mb-1">Conditions</div>
                    {entry.conditions.map((c, i) => (
                      <div key={i} className="text-[9px] flex items-center justify-between">
                        <span className={CONDITION_EFFECTS[c.type]?.color || 'text-slate-400'}>{c.type}</span>
                        <span className="text-slate-600">{c.duration > 0 ? `${c.duration} rounds` : 'permanent'} {c.source ? `(${c.source})` : ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
