import { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { DICE_SHAPE_MAP } from './DiceShapes';
import { useGame, type DieType } from '../../contexts/GameContext';
import { parseSlashRoll } from '../chat/ChatPanel';

// Dice macro — saved roll shortcut
interface DiceMacro {
  id: string;
  label: string;
  notation: string;
}

const MACROS_STORAGE_KEY = 'adventure:diceMacros';

function loadMacros(): DiceMacro[] {
  try {
    const raw = localStorage.getItem(MACROS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveMacros(macros: DiceMacro[]) {
  try { localStorage.setItem(MACROS_STORAGE_KEY, JSON.stringify(macros)); } catch { /* ok */ }
}

const DICE: { type: DieType; sides: number; color: string }[] = [
  { type: 'd4', sides: 4, color: 'from-red-500 to-red-700' },
  { type: 'd6', sides: 6, color: 'from-blue-500 to-blue-700' },
  { type: 'd8', sides: 8, color: 'from-green-500 to-green-700' },
  { type: 'd10', sides: 10, color: 'from-purple-500 to-purple-700' },
  { type: 'd12', sides: 12, color: 'from-pink-500 to-pink-700' },
  { type: 'd20', sides: 20, color: 'from-orange-500 to-orange-700' },
];

// Color map for dice shape outlines
const DICE_COLORS: Record<DieType, string> = {
  d4: '#ef4444',
  d6: '#3b82f6',
  d8: '#22c55e',
  d10: '#a855f7',
  d12: '#ec4899',
  d20: '#f97316',
};

export interface RemoteRoll {
  die: DieType;
  sides: number;
  value: number;
  playerName: string;
  unitName?: string;
}

// Imperative handle so parent can trigger animations for remote rolls
export interface DiceRollerHandle {
  playRemoteRoll: (roll: RemoteRoll) => void;
}

export interface LocalRollResult {
  die: DieType;
  sides: number;
  value: number;
  isCritical: boolean;
  isFumble: boolean;
  playerName: string;
  unitName?: string;
}

interface DiceRollerProps {
  /** Called when the local user clicks a die — parent should send to WebSocket */
  onLocalRoll?: (die: DieType, sides: number) => void;
  /** Called when a local (offline) roll finishes — parent can add to chat */
  onRollComplete?: (roll: LocalRollResult) => void;
  /** Called when a macro is executed — parent can add result to chat like a slash roll */
  onMacroRoll?: (label: string, notation: string, rolls: number[], total: number, isCrit: boolean, isFumble: boolean) => void;
  /** If true, local rolls use onLocalRoll instead of generating a result locally */
  useServerRolls?: boolean;
  /** Compact mode for lobby sidebar */
  compact?: boolean;
}

type AdvantageMode = 'normal' | 'advantage' | 'disadvantage';

const DiceRoller = forwardRef<DiceRollerHandle, DiceRollerProps>(function DiceRoller({ onLocalRoll, onRollComplete, onMacroRoll, useServerRolls = false, compact = false }, ref) {
  const { currentPlayer, addRoll, rolls, clearRolls, selectedUnitId, units, characters, updateCharacter } = useGame();
  const [rolling, setRolling] = useState<DieType | null>(null);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const [lastRoll, setLastRoll] = useState<{ die: DieType; value: number; sides: number; playerName?: string } | null>(null);
  const [critState, setCritState] = useState<'crit' | 'fumble' | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [rollerLabel, setRollerLabel] = useState<string | null>(null);
  const [advMode, setAdvMode] = useState<AdvantageMode>('normal');
  const [macros, setMacros] = useState<DiceMacro[]>(loadMacros);
  const [showAddMacro, setShowAddMacro] = useState(false);
  const [newMacroLabel, setNewMacroLabel] = useState('');
  const [newMacroNotation, setNewMacroNotation] = useState('');
  const diceDisplayRef = useRef<HTMLDivElement>(null);
  // Queue for remote rolls that arrive while an animation is playing
  const pendingRemoteRef = useRef<RemoteRoll[]>([]);
  const animatingRef = useRef(false);
  // Ref for onRollComplete callback to avoid stale closures
  const onRollCompleteRef = useRef(onRollComplete);
  onRollCompleteRef.current = onRollComplete;

  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;

  // Internal animation — plays the tumble then lands on finalValue
  const playAnimation = useCallback(
    (die: DieType, sides: number, finalValue: number, playerName?: string, unitName?: string, isLocal = true) => {
      if (animatingRef.current) {
        // Queue it if something is already animating
        pendingRemoteRef.current.push({ die, sides, value: finalValue, playerName: playerName || 'Unknown', unitName });
        return;
      }
      animatingRef.current = true;
      setRolling(die);
      setCritState(null);
      setShowBurst(false);
      setRollerLabel(isLocal ? null : playerName || null);

      let ticks = 0;
      const totalTicks = 16;
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * sides) + 1);
        ticks++;
        if (ticks >= totalTicks) {
          clearInterval(interval);
          const isCrit = finalValue === sides;
          const isFumble = finalValue === 1;

          setDisplayValue(finalValue);
          setLastRoll({ die, value: finalValue, sides, playerName });
          setRolling(null);
          animatingRef.current = false;

          // Register in game context
          addRoll({
            die,
            sides,
            value: finalValue,
            playerId: isLocal ? currentPlayer.id : `remote-${playerName}`,
            playerName: playerName || currentPlayer.username,
            unitId: isLocal ? selectedUnitId || undefined : undefined,
            unitName: isLocal ? selectedUnit?.name : unitName,
          });

          // Notify parent of local roll result so it can add to chat
          if (isLocal && onRollCompleteRef.current) {
            onRollCompleteRef.current({
              die,
              sides,
              value: finalValue,
              isCritical: isCrit,
              isFumble,
              playerName: playerName || currentPlayer.username,
              unitName: isLocal ? selectedUnit?.name : unitName,
            });
          }

          // Persistent crit/fumble color — stays until next roll starts
          if (isCrit) setCritState('crit');
          else if (isFumble) setCritState('fumble');
          // Temporary burst VFX — fades after animation plays
          if (isCrit || isFumble) {
            setShowBurst(true);
            setTimeout(() => setShowBurst(false), 2500);
          }

          // Play next queued remote roll
          setTimeout(() => {
            const next = pendingRemoteRef.current.shift();
            if (next) {
              playAnimation(next.die, next.sides, next.value, next.playerName, next.unitName, false);
            }
          }, 400);
        }
      }, 55);
    },
    [currentPlayer, addRoll, selectedUnitId, selectedUnit]
  );

  // Local roll click handler
  const doRoll = useCallback(
    (die: DieType, sides: number) => {
      if (animatingRef.current) return;

      if (useServerRolls && onLocalRoll) {
        // Tell parent to send to WebSocket — server will broadcast result back
        onLocalRoll(die, sides);
        // Start the animation immediately with random placeholder, will be overridden
        setRolling(die);
        setCritState(null);
        setShowBurst(false);
        setRollerLabel(null);
        let ticks = 0;
        const spinInterval = setInterval(() => {
          setDisplayValue(Math.floor(Math.random() * sides) + 1);
          ticks++;
          // If we haven't received the server result after 2s, stop spinning
          if (ticks > 36) {
            clearInterval(spinInterval);
            setRolling(null);
          }
        }, 55);
        // Store the interval so playRemoteRoll can clear it
        (diceDisplayRef.current as unknown as Record<string, unknown>).__spinInterval = spinInterval;
        return;
      }

      // Offline mode: generate locally
      // Advantage/disadvantage only applies to d20
      if (advMode !== 'normal' && die === 'd20') {
        const r1 = Math.floor(Math.random() * 20) + 1;
        const r2 = Math.floor(Math.random() * 20) + 1;
        const finalValue = advMode === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2);
        playAnimation(die, sides, finalValue, currentPlayer.username, selectedUnit?.name, true);
        return;
      }
      const finalValue = Math.floor(Math.random() * sides) + 1;
      playAnimation(die, sides, finalValue, currentPlayer.username, selectedUnit?.name, true);
    },
    [useServerRolls, onLocalRoll, playAnimation, currentPlayer, selectedUnit, advMode]
  );

  // Macro handlers
  const addMacro = useCallback(() => {
    const label = newMacroLabel.trim();
    const notation = newMacroNotation.trim().toLowerCase();
    if (!label || !notation) return;
    // Validate notation
    const test = parseSlashRoll(notation);
    if (!test) return;
    const macro: DiceMacro = { id: crypto.randomUUID().slice(0, 8), label, notation };
    setMacros((prev) => { const next = [...prev, macro]; saveMacros(next); return next; });
    setNewMacroLabel('');
    setNewMacroNotation('');
    setShowAddMacro(false);
  }, [newMacroLabel, newMacroNotation]);

  const removeMacro = useCallback((id: string) => {
    setMacros((prev) => { const next = prev.filter((m) => m.id !== id); saveMacros(next); return next; });
  }, []);

  const executeMacro = useCallback((macro: DiceMacro) => {
    const result = parseSlashRoll(macro.notation);
    if (!result) return;
    const isCrit = result.rolls.length === 1 && result.total === result.rolls[0] && result.rolls[0] === 20;
    const isFumble = result.rolls.length === 1 && result.total === result.rolls[0] && result.rolls[0] === 1;
    // Register in game context
    addRoll({
      die: 'd20' as DieType, // visual only — macro result shown in roll history
      sides: 20,
      value: result.total,
      playerId: currentPlayer.id,
      playerName: currentPlayer.username,
      unitId: selectedUnitId || undefined,
      unitName: selectedUnit?.name,
    });
    // Notify parent
    onMacroRoll?.(macro.label, result.notation, result.rolls, result.total, isCrit, isFumble);
  }, [addRoll, currentPlayer, selectedUnitId, selectedUnit, onMacroRoll]);

  // Expose imperative API for parent to trigger remote roll animations
  useImperativeHandle(
    ref,
    () => ({
      playRemoteRoll(roll: RemoteRoll) {
        // If there's an active server-roll spin, stop it and play the result
        const el = diceDisplayRef.current as unknown as Record<string, unknown>;
        if (el?.__spinInterval) {
          clearInterval(el.__spinInterval as ReturnType<typeof setInterval>);
          delete el.__spinInterval;
          setRolling(null);
          animatingRef.current = false;
        }
        playAnimation(roll.die, roll.sides, roll.value, roll.playerName, roll.unitName, false);
      },
    }),
    [playAnimation]
  );

  // Inject keyframe animations once
  useEffect(() => {
    if (document.getElementById('dice-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'dice-keyframes';
    style.textContent = `
      @keyframes diceRoll {
        0% { transform: rotate(0deg) scale(1); }
        15% { transform: rotate(45deg) scale(1.05); }
        30% { transform: rotate(-30deg) scale(0.95); }
        45% { transform: rotate(60deg) scale(1.1); }
        60% { transform: rotate(-45deg) scale(1.05); }
        75% { transform: rotate(20deg) scale(0.98); }
        90% { transform: rotate(-10deg) scale(1.02); }
        100% { transform: rotate(0deg) scale(1); }
      }
      @keyframes diceSettle {
        0% { transform: scale(0.8) rotate(-15deg); opacity: 0.6; }
        50% { transform: scale(1.15) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes critGlow {
        0% { box-shadow: 0 0 0 0 rgba(250,204,21,0.8); }
        25% { box-shadow: 0 0 40px 15px rgba(250,204,21,0.6); }
        50% { box-shadow: 0 0 60px 25px rgba(250,204,21,0.3); }
        75% { box-shadow: 0 0 40px 15px rgba(250,204,21,0.6); }
        100% { box-shadow: 0 0 0 0 rgba(250,204,21,0); }
      }
      @keyframes fumbleShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-8px) rotate(-2deg); }
        20% { transform: translateX(8px) rotate(2deg); }
        30% { transform: translateX(-6px) rotate(-1deg); }
        40% { transform: translateX(6px) rotate(1deg); }
        50% { transform: translateX(-4px); }
        60% { transform: translateX(4px); }
        70% { transform: translateX(-2px); }
        80% { transform: translateX(2px); }
      }
      @keyframes critStarBurst {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        30% { opacity: 1; transform: scale(1.2) rotate(90deg); }
        100% { opacity: 0; transform: scale(2) rotate(180deg); }
      }
      @keyframes fumbleCrack {
        0% { opacity: 0; transform: scale(0.5); }
        30% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1.5); }
      }
      @keyframes critText {
        0% { transform: translateY(20px) scale(0.5); opacity: 0; }
        40% { transform: translateY(-5px) scale(1.2); opacity: 1; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const ShapeComponent = rolling ? DICE_SHAPE_MAP[rolling] : lastRoll ? DICE_SHAPE_MAP[lastRoll.die] : null;
  const activeColor = rolling ? DICE_COLORS[rolling] : lastRoll ? DICE_COLORS[lastRoll.die] : '#94a3b8';

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Dice Roller</h2>

      {/* Selected unit indicator */}
      {selectedUnit && !compact && (
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
          <span className="text-slate-500">Rolling for:</span>
          <span className="font-semibold text-[#F38020]">{selectedUnit.name}</span>
        </div>
      )}

      {/* Advantage/Disadvantage toggle */}
      <div className="flex gap-1.5">
        {(['normal', 'advantage', 'disadvantage'] as AdvantageMode[]).map((mode) => {
          const isActive = advMode === mode;
          const label = mode === 'normal' ? 'Normal' : mode === 'advantage' ? 'ADV' : 'DISADV';
          const activeStyle = mode === 'advantage'
            ? 'bg-green-600/30 border-green-500/60 text-green-300'
            : mode === 'disadvantage'
              ? 'bg-red-600/30 border-red-500/60 text-red-300'
              : 'bg-slate-700/50 border-slate-500/50 text-slate-300';
          return (
            <button
              key={mode}
              onClick={() => setAdvMode(mode)}
              className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all ${
                isActive ? activeStyle : 'border-slate-700/50 text-slate-600 hover:text-slate-400 hover:border-slate-600/50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Inspiration spend button */}
      {(() => {
        const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;
        const myChar = selectedUnit?.characterId ? characters.find((c) => c.id === selectedUnit.characterId) : null;
        if (!myChar?.inspiration) return null;
        return (
          <button
            onClick={() => {
              updateCharacter(myChar.id, { inspiration: false });
              setAdvMode('advantage');
            }}
            className="w-full py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all active:scale-95"
          >
            ★ Spend Inspiration (Advantage)
          </button>
        );
      })()}

      {/* Dice macros — saved roll shortcuts */}
      {!compact && (
        <div className="space-y-1.5">
          {macros.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {macros.map((m) => (
                <div key={m.id} className="group relative">
                  <button
                    onClick={() => executeMacro(m)}
                    title={`Roll ${m.notation}`}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-amber-600/20 border border-amber-500/30 text-amber-300 hover:bg-amber-600/30 hover:border-amber-500/50 transition-all active:scale-95"
                  >
                    {m.label}
                  </button>
                  <button
                    onClick={() => removeMacro(m.id)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-700 border border-slate-600 text-slate-400 text-[9px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:border-red-500 hover:text-white"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
          {showAddMacro ? (
            <div className="flex gap-1.5 items-end">
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  placeholder="Name (e.g. Fireball)"
                  value={newMacroLabel}
                  onChange={(e) => setNewMacroLabel(e.target.value)}
                  className="w-full px-2 py-1 text-[11px] rounded bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-600 focus:border-amber-500/50 outline-none"
                  maxLength={20}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && addMacro()}
                />
                <input
                  type="text"
                  placeholder="Roll (e.g. 8d6+5)"
                  value={newMacroNotation}
                  onChange={(e) => setNewMacroNotation(e.target.value)}
                  className="w-full px-2 py-1 text-[11px] rounded bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-600 focus:border-amber-500/50 outline-none"
                  maxLength={20}
                  onKeyDown={(e) => e.key === 'Enter' && addMacro()}
                />
              </div>
              <button onClick={addMacro} className="px-2 py-1 text-[10px] font-bold rounded bg-amber-600/30 border border-amber-500/40 text-amber-300 hover:bg-amber-600/40 transition-all">Save</button>
              <button onClick={() => { setShowAddMacro(false); setNewMacroLabel(''); setNewMacroNotation(''); }} className="px-2 py-1 text-[10px] rounded text-slate-500 hover:text-slate-300 transition-colors">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setShowAddMacro(true)} className="text-[10px] text-slate-600 hover:text-amber-400 transition-colors">
              + Add macro
            </button>
          )}
        </div>
      )}

      {/* Dice buttons */}
      <div className="grid grid-cols-3 gap-2">
        {DICE.map(({ type, sides, color }) => (
          <button key={type} disabled={animatingRef.current || rolling !== null} onClick={() => doRoll(type, sides)} className={`relative bg-gradient-to-br ${color} text-white font-bold py-2.5 px-3 rounded-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-xl hover:scale-105 active:scale-95 text-sm ${rolling === type ? 'ring-2 ring-white' : ''} ${advMode !== 'normal' && type === 'd20' ? 'ring-2 ring-offset-1 ring-offset-slate-900 ' + (advMode === 'advantage' ? 'ring-green-500/60' : 'ring-red-500/60') : ''}`}>
            {type.toUpperCase()}
            {advMode !== 'normal' && type === 'd20' && (
              <span className={`absolute -top-1 -right-1 text-[7px] font-black px-1 py-0.5 rounded-full ${advMode === 'advantage' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {advMode === 'advantage' ? '2x' : '2x'}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Animated dice display */}
      <div ref={diceDisplayRef} className={`relative flex items-center justify-center py-6${showBurst && critState === 'crit' ? ' crit-flash' : ''}`} style={showBurst && critState === 'fumble' ? { animation: 'fumbleShake 0.6s ease-out' } : undefined}>
        {/* Dice shape outline — tint gold/red persistently on crit/fumble */}
        {ShapeComponent && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              color: critState === 'crit' ? '#facc15' : critState === 'fumble' ? '#ef4444' : activeColor,
              animation: rolling ? 'diceRoll 0.9s ease-in-out infinite' : 'diceSettle 0.35s ease-out',
              opacity: rolling ? 0.6 : critState ? 0.5 : 0.35,
            }}
          >
            <ShapeComponent size={compact ? 110 : 130} />
          </div>
        )}

        {/* Crit star burst — temporary VFX */}
        {showBurst && critState === 'crit' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 rounded-full" style={{ animation: 'critStarBurst 1.2s ease-out forwards', background: 'radial-gradient(circle, rgba(250,204,21,0.4) 0%, transparent 70%)' }} />
          </div>
        )}

        {/* Fumble crack — temporary VFX */}
        {showBurst && critState === 'fumble' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 rounded-full" style={{ animation: 'fumbleCrack 1s ease-out forwards', background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)' }} />
          </div>
        )}

        {/* Crit glow ring — temporary VFX */}
        {showBurst && critState === 'crit' && <div className="absolute w-28 h-28 rounded-full" style={{ animation: 'critGlow 1.5s ease-out forwards' }} />}

        {/* Persistent subtle glow behind number for crits/fumbles */}
        {!rolling && critState && (
          <div className="absolute w-24 h-24 rounded-full pointer-events-none" style={{
            background: critState === 'crit'
              ? 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
          }} />
        )}

        {/* Number display */}
        {displayValue !== null && (
          <div className="relative z-10 text-center">
            <div
              className={`text-4xl font-black tabular-nums transition-all duration-150 ${
                critState === 'crit' ? 'text-yellow-400' : critState === 'fumble' ? 'text-red-500' : rolling ? 'text-slate-300' : 'text-white'
              }`}
              style={
                critState === 'crit'
                  ? { filter: `drop-shadow(0 0 ${showBurst ? '20px' : '8px'} rgba(250,204,21,${showBurst ? 0.8 : 0.4}))`, ...(showBurst ? { animation: 'critText 0.4s ease-out' } : {}) }
                  : critState === 'fumble'
                    ? { filter: `drop-shadow(0 0 ${showBurst ? '15px' : '6px'} rgba(239,68,68,${showBurst ? 0.6 : 0.3}))` }
                    : undefined
              }
            >
              {displayValue}
            </div>

            {/* Label below number */}
            {!rolling && lastRoll && (
              <div className="mt-1 space-y-0.5">
                {/* Remote roller attribution */}
                {rollerLabel && <div className="text-[10px] text-sky-400 font-medium">{rollerLabel} rolled</div>}
                <div className={`text-xs ${critState === 'crit' ? 'text-yellow-500/70' : critState === 'fumble' ? 'text-red-500/70' : 'text-slate-500'}`}>{lastRoll.die.toUpperCase()}</div>
                {/* Crit/fumble text — persists with the color */}
                {critState === 'crit' && (
                  <div className="text-xs font-bold text-yellow-400 tracking-wide" style={showBurst ? { animation: 'critText 0.5s ease-out' } : undefined}>
                    CRITICAL HIT!
                  </div>
                )}
                {critState === 'fumble' && <div className="text-xs font-bold text-red-500 tracking-wide">CRITICAL FAIL!</div>}
              </div>
            )}
          </div>
        )}

        {/* Placeholder */}
        {displayValue === null && !rolling && <div className="text-slate-600 text-sm py-8">Click a die to roll</div>}
      </div>

      {/* Roll history */}
      {rolls.length > 0 && !compact && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Roll History</h3>
            <button onClick={clearRolls} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {rolls.slice(0, 30).map((entry) => (
              <div key={entry.id} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-mono ${entry.isCritical ? 'bg-yellow-500/15 border border-yellow-500/30' : entry.isFumble ? 'bg-red-500/15 border border-red-500/30' : 'bg-slate-800/50 border border-transparent'}`}>
                <span className="shrink-0 w-7 text-center rounded px-1 py-0.5 text-[10px] font-bold" style={{ color: DICE_COLORS[entry.die], background: `${DICE_COLORS[entry.die]}15` }}>
                  {entry.die}
                </span>
                <span className={`font-bold text-sm min-w-[1.5rem] text-center ${entry.isCritical ? 'text-yellow-400' : entry.isFumble ? 'text-red-400' : 'text-white'}`}>{entry.value}</span>
                {entry.isCritical && <span className="shrink-0 text-[9px] font-bold text-yellow-400 bg-yellow-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Crit!</span>}
                {entry.isFumble && <span className="shrink-0 text-[9px] font-bold text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Fail!</span>}
                <span className="flex-1 text-right text-slate-500 truncate">
                  {entry.playerName}
                  {entry.unitName && <span className="text-slate-600"> ({entry.unitName})</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default DiceRoller;
