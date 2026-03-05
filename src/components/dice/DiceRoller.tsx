import { useState, useRef, useCallback, useEffect } from 'react';
import { DICE_SHAPE_MAP } from './DiceShapes';
import { useGame, type DieType } from '../../contexts/GameContext';

const DICE: { type: DieType; sides: number; color: string; glow: string }[] = [
  { type: 'd4', sides: 4, color: 'from-red-500 to-red-700', glow: 'shadow-red-500/30' },
  { type: 'd6', sides: 6, color: 'from-blue-500 to-blue-700', glow: 'shadow-blue-500/30' },
  { type: 'd8', sides: 8, color: 'from-green-500 to-green-700', glow: 'shadow-green-500/30' },
  { type: 'd10', sides: 10, color: 'from-purple-500 to-purple-700', glow: 'shadow-purple-500/30' },
  { type: 'd12', sides: 12, color: 'from-pink-500 to-pink-700', glow: 'shadow-pink-500/30' },
  { type: 'd20', sides: 20, color: 'from-orange-500 to-orange-700', glow: 'shadow-orange-500/30' },
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

export default function DiceRoller() {
  const { currentPlayer, addRoll, rolls, clearRolls, selectedUnitId, units } = useGame();
  const [rolling, setRolling] = useState<DieType | null>(null);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const [lastRoll, setLastRoll] = useState<{ die: DieType; value: number; sides: number } | null>(null);
  const [showCritEffect, setShowCritEffect] = useState<'crit' | 'fumble' | null>(null);
  const diceDisplayRef = useRef<HTMLDivElement>(null);

  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;

  const doRoll = useCallback(
    (die: DieType, sides: number) => {
      if (rolling) return;
      setRolling(die);
      setShowCritEffect(null);

      let ticks = 0;
      const totalTicks = 16;
      const interval = setInterval(() => {
        // Show random numbers cycling through during the roll
        setDisplayValue(Math.floor(Math.random() * sides) + 1);
        ticks++;
        if (ticks >= totalTicks) {
          clearInterval(interval);
          const finalValue = Math.floor(Math.random() * sides) + 1;
          const isCrit = finalValue === sides;
          const isFumble = finalValue === 1;

          setDisplayValue(finalValue);
          setLastRoll({ die, value: finalValue, sides });
          setRolling(null);

          // Register roll in game context
          addRoll({
            die,
            sides,
            value: finalValue,
            playerId: currentPlayer.id,
            playerName: currentPlayer.username,
            unitId: selectedUnitId || undefined,
            unitName: selectedUnit?.name,
          });

          // Trigger crit/fumble effects
          if (isCrit) setShowCritEffect('crit');
          else if (isFumble) setShowCritEffect('fumble');

          // Clear effect after animation
          setTimeout(() => setShowCritEffect(null), 2500);
        }
      }, 55);
    },
    [rolling, currentPlayer, addRoll, selectedUnitId, selectedUnit]
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
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Dice Roller</h2>

      {/* Selected unit indicator */}
      {selectedUnit && (
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
          <span className="text-slate-500">Rolling for:</span>
          <span className="font-semibold text-[#F38020]">{selectedUnit.name}</span>
        </div>
      )}

      {/* Dice buttons */}
      <div className="grid grid-cols-3 gap-2">
        {DICE.map(({ type, sides, color }) => (
          <button key={type} disabled={rolling !== null} onClick={() => doRoll(type, sides)} className={`relative bg-gradient-to-br ${color} text-white font-bold py-2.5 px-3 rounded-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-xl hover:scale-105 active:scale-95 text-sm ${rolling === type ? 'ring-2 ring-white' : ''}`}>
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Animated dice display */}
      <div ref={diceDisplayRef} className={`relative flex items-center justify-center py-6 ${showCritEffect === 'fumble' ? '' : ''}`} style={showCritEffect === 'fumble' ? { animation: 'fumbleShake 0.6s ease-out' } : undefined}>
        {/* Dice shape outline */}
        {ShapeComponent && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              color: activeColor,
              animation: rolling ? 'diceRoll 0.9s ease-in-out infinite' : 'diceSettle 0.35s ease-out',
              opacity: rolling ? 0.6 : 0.35,
            }}
          >
            <ShapeComponent size={130} />
          </div>
        )}

        {/* Crit star burst effect */}
        {showCritEffect === 'crit' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-40 h-40 rounded-full"
              style={{
                animation: 'critStarBurst 1.2s ease-out forwards',
                background: 'radial-gradient(circle, rgba(250,204,21,0.4) 0%, transparent 70%)',
              }}
            />
          </div>
        )}

        {/* Fumble crack effect */}
        {showCritEffect === 'fumble' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-32 h-32 rounded-full"
              style={{
                animation: 'fumbleCrack 1s ease-out forwards',
                background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)',
              }}
            />
          </div>
        )}

        {/* Crit glow ring */}
        {showCritEffect === 'crit' && <div className="absolute w-28 h-28 rounded-full" style={{ animation: 'critGlow 1.5s ease-out forwards' }} />}

        {/* Number display */}
        {displayValue !== null && (
          <div className="relative z-10 text-center">
            <div className={`text-6xl font-black tabular-nums transition-all duration-150 ${showCritEffect === 'crit' ? 'text-yellow-400' : showCritEffect === 'fumble' ? 'text-red-500' : rolling ? 'text-slate-300' : 'text-white'}`} style={showCritEffect === 'crit' ? { filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.8))', animation: 'critText 0.4s ease-out' } : showCritEffect === 'fumble' ? { filter: 'drop-shadow(0 0 15px rgba(239,68,68,0.6))' } : undefined}>
              {displayValue}
            </div>

            {/* Label below number */}
            {!rolling && lastRoll && (
              <div className="mt-1 space-y-0.5">
                <div className="text-xs text-slate-500">{lastRoll.die.toUpperCase()}</div>
                {showCritEffect === 'crit' && (
                  <div className="text-xs font-bold text-yellow-400 tracking-wide" style={{ animation: 'critText 0.5s ease-out' }}>
                    CRITICAL HIT!
                  </div>
                )}
                {showCritEffect === 'fumble' && <div className="text-xs font-bold text-red-500 tracking-wide">CRITICAL FAIL!</div>}
              </div>
            )}
          </div>
        )}

        {/* Placeholder when nothing rolled yet */}
        {displayValue === null && !rolling && <div className="text-slate-600 text-sm py-8">Click a die to roll</div>}
      </div>

      {/* Roll history with user attribution and crit/fumble markers */}
      {rolls.length > 0 && (
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
                {/* Die type badge */}
                <span className="shrink-0 w-7 text-center rounded px-1 py-0.5 text-[10px] font-bold" style={{ color: DICE_COLORS[entry.die], background: `${DICE_COLORS[entry.die]}15` }}>
                  {entry.die}
                </span>

                {/* Roll value */}
                <span className={`font-bold text-sm min-w-[1.5rem] text-center ${entry.isCritical ? 'text-yellow-400' : entry.isFumble ? 'text-red-400' : 'text-white'}`}>{entry.value}</span>

                {/* Crit/fumble tag */}
                {entry.isCritical && <span className="shrink-0 text-[9px] font-bold text-yellow-400 bg-yellow-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Crit!</span>}
                {entry.isFumble && <span className="shrink-0 text-[9px] font-bold text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Fail!</span>}

                {/* Player name + unit */}
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
}
