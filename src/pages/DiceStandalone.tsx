// Standalone dice roller - no auth, no WebSocket. Just dice.
import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DICE_SHAPE_MAP } from '../components/dice/DiceShapes';
import { parseSlashRoll, type SlashRollResult } from '../components/chat/ChatPanel';

type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

interface RollHistoryEntry {
  id: string;
  notation: string;
  rolls: number[];
  kept?: number[];
  modifier: number;
  total: number;
  isCrit: boolean;
  isFumble: boolean;
  advantage?: boolean;
  disadvantage?: boolean;
  label?: string;
  timestamp: number;
}

const DICE: { type: DieType; sides: number; label: string; color: string }[] = [
  { type: 'd4', sides: 4, label: 'D4', color: 'from-red-500 to-red-700' },
  { type: 'd6', sides: 6, label: 'D6', color: 'from-blue-500 to-blue-700' },
  { type: 'd8', sides: 8, label: 'D8', color: 'from-green-500 to-green-700' },
  { type: 'd10', sides: 10, label: 'D10', color: 'from-purple-500 to-purple-700' },
  { type: 'd12', sides: 12, label: 'D12', color: 'from-pink-500 to-pink-700' },
  { type: 'd20', sides: 20, label: 'D20', color: 'from-orange-500 to-orange-700' },
  { type: 'd100', sides: 100, label: 'D100', color: 'from-amber-500 to-amber-700' },
];

const PRESETS = [
  { label: '4d6 drop lowest', notation: '4d6kh3' },
  { label: '2d6', notation: '2d6' },
  { label: '1d20+5', notation: '1d20+5' },
  { label: '8d6 (Fireball)', notation: '8d6' },
  { label: '2d10+4', notation: '2d10+4' },
  { label: '1d12+3', notation: '1d12+3' },
];

const SHAPE_MAP: Record<string, keyof typeof DICE_SHAPE_MAP> = {
  d4: 'd4', d6: 'd6', d8: 'd8', d10: 'd10', d12: 'd12', d20: 'd20', d100: 'd10',
};

const DICE_COLORS: Record<string, string> = {
  d4: '#ef4444', d6: '#3b82f6', d8: '#22c55e', d10: '#a855f7',
  d12: '#ec4899', d20: '#f97316', d100: '#f59e0b',
};

function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function DiceStandalone() {
  const [history, setHistory] = useState<RollHistoryEntry[]>([]);
  const [customNotation, setCustomNotation] = useState('');
  const [advMode, setAdvMode] = useState<'normal' | 'advantage' | 'disadvantage'>('normal');
  const [diceCount, setDiceCount] = useState(1);
  const [lastRoll, setLastRoll] = useState<{ die: string; total: number; isCrit: boolean; isFumble: boolean } | null>(null);
  const [rolling, setRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const animRef = useRef(false);

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById('dice-standalone-kf')) return;
    const style = document.createElement('style');
    style.id = 'dice-standalone-kf';
    style.textContent = `
      @keyframes diceStandaloneRoll {
        0% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(45deg) scale(1.1); }
        50% { transform: rotate(-30deg) scale(0.95); }
        75% { transform: rotate(20deg) scale(1.05); }
        100% { transform: rotate(0deg) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const addToHistory = useCallback((entry: RollHistoryEntry) => {
    setHistory((prev) => [entry, ...prev].slice(0, 20));
  }, []);

  const doRoll = useCallback((die: DieType, sides: number) => {
    if (animRef.current) return;
    animRef.current = true;
    setRolling(true);

    const actualSides = sides;
    const totalDice = advMode !== 'normal' && sides === 20 ? diceCount * 2 : diceCount;
    const allRolls: number[] = [];
    for (let i = 0; i < totalDice; i++) allRolls.push(rollDie(actualSides));

    let keptRolls: number[];
    if (advMode === 'advantage' && sides === 20) {
      keptRolls = [...allRolls].sort((a, b) => b - a).slice(0, diceCount);
    } else if (advMode === 'disadvantage' && sides === 20) {
      keptRolls = [...allRolls].sort((a, b) => a - b).slice(0, diceCount);
    } else {
      keptRolls = allRolls;
    }
    const total = keptRolls.reduce((s, v) => s + v, 0);
    const isCrit = keptRolls.length === 1 && keptRolls[0] === actualSides;
    const isFumble = keptRolls.length === 1 && keptRolls[0] === 1;

    // Animate
    let ticks = 0;
    const interval = setInterval(() => {
      setDisplayValue(rollDie(actualSides));
      ticks++;
      if (ticks >= 14) {
        clearInterval(interval);
        setDisplayValue(total);
        setRolling(false);
        animRef.current = false;
        setLastRoll({ die, total, isCrit, isFumble });

        const notation = advMode !== 'normal' && sides === 20
          ? `${diceCount}d${actualSides} (${advMode})`
          : `${diceCount}d${actualSides}`;

        addToHistory({
          id: crypto.randomUUID().slice(0, 8),
          notation,
          rolls: allRolls,
          kept: advMode !== 'normal' && sides === 20 ? keptRolls : undefined,
          modifier: 0,
          total,
          isCrit,
          isFumble,
          advantage: advMode === 'advantage' && sides === 20,
          disadvantage: advMode === 'disadvantage' && sides === 20,
          timestamp: Date.now(),
        });

        // Reset adv mode after d20 roll
        if (advMode !== 'normal' && sides === 20) setAdvMode('normal');
      }
    }, 50);
  }, [advMode, diceCount, addToHistory]);

  const doCustomRoll = useCallback(() => {
    const text = customNotation.trim();
    if (!text) return;
    const result = parseSlashRoll(text);
    if (!result) return;

    const sides = parseInt(result.notation.match(/d(\d+)/)?.[1] || '20', 10);
    const isCrit = result.rolls.length === 1 && result.rolls[0] === sides;
    const isFumble = result.rolls.length === 1 && result.rolls[0] === 1;

    setDisplayValue(result.total);
    setLastRoll({ die: `d${sides}` as DieType, total: result.total, isCrit, isFumble });

    addToHistory({
      id: crypto.randomUUID().slice(0, 8),
      notation: result.notation,
      rolls: result.rolls,
      kept: result.kept,
      modifier: result.modifier,
      total: result.total,
      isCrit,
      isFumble,
      advantage: result.advantage,
      disadvantage: result.disadvantage,
      label: result.label,
      timestamp: Date.now(),
    });
  }, [customNotation, addToHistory]);

  const doPresetRoll = useCallback((notation: string, label: string) => {
    const result = parseSlashRoll(notation);
    if (!result) return;

    const sides = parseInt(result.notation.match(/d(\d+)/)?.[1] || '20', 10);
    const isCrit = result.rolls.length === 1 && result.rolls[0] === sides;
    const isFumble = result.rolls.length === 1 && result.rolls[0] === 1;

    setDisplayValue(result.total);
    setLastRoll({ die: `d${sides}` as DieType, total: result.total, isCrit, isFumble });

    addToHistory({
      id: crypto.randomUUID().slice(0, 8),
      notation: `${result.notation} (${label})`,
      rolls: result.rolls,
      kept: result.kept,
      modifier: result.modifier,
      total: result.total,
      isCrit,
      isFumble,
      label,
      timestamp: Date.now(),
    });
  }, [addToHistory]);

  const shapeKey = lastRoll ? SHAPE_MAP[lastRoll.die] || 'd20' : 'd20';
  const ShapeComponent = DICE_SHAPE_MAP[shapeKey as keyof typeof DICE_SHAPE_MAP];
  const activeColor = lastRoll ? DICE_COLORS[lastRoll.die] || '#f97316' : '#94a3b8';

  return (
    <div className="min-h-screen bg-[#0c0f1a] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-[#F38020] via-[#e87818] to-[#d06010] py-2 px-4 flex justify-between items-center">
        <h1 className="text-lg font-extrabold text-white">Dice Roller</h1>
        <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">
          Back to Adventure
        </Link>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Advantage/Disadvantage toggle (d20 only) */}
        <div className="flex gap-1.5">
          {(['normal', 'advantage', 'disadvantage'] as const).map((mode) => {
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

        {/* Dice count */}
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => setDiceCount((c) => Math.max(1, c - 1))} className="w-8 h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-lg font-bold flex items-center justify-center">-</button>
          <span className="text-lg font-mono font-bold text-white w-10 text-center">{diceCount}</span>
          <button onClick={() => setDiceCount((c) => Math.min(20, c + 1))} className="w-8 h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-lg font-bold flex items-center justify-center">+</button>
          <span className="text-xs text-slate-500">dice</span>
        </div>

        {/* Dice buttons */}
        <div className="grid grid-cols-4 gap-3">
          {DICE.map(({ type, sides, label, color }) => (
            <button
              key={type}
              disabled={rolling}
              onClick={() => doRoll(type, sides)}
              className={`bg-gradient-to-br ${color} text-white font-bold py-3 px-2 rounded-xl shadow-lg disabled:opacity-40 transition-all hover:shadow-xl hover:scale-105 active:scale-95 text-sm`}
            >
              {diceCount > 1 ? `${diceCount}${label}` : label}
            </button>
          ))}
        </div>

        {/* Display area */}
        <div className="relative flex items-center justify-center py-10">
          {ShapeComponent && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                color: lastRoll?.isCrit ? '#facc15' : lastRoll?.isFumble ? '#ef4444' : activeColor,
                opacity: rolling ? 0.6 : lastRoll ? 0.35 : 0.15,
                animation: rolling ? 'diceStandaloneRoll 0.8s ease-in-out infinite' : undefined,
              }}
            >
              <ShapeComponent size={150} />
            </div>
          )}

          {displayValue !== null ? (
            <div className="relative z-10 text-center">
              <div className={`text-6xl font-black tabular-nums ${
                lastRoll?.isCrit ? 'text-yellow-400' : lastRoll?.isFumble ? 'text-red-500' : rolling ? 'text-slate-300' : 'text-white'
              }`} style={lastRoll?.isCrit ? { filter: 'drop-shadow(0 0 12px rgba(250,204,21,0.5))' } : lastRoll?.isFumble ? { filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.4))' } : undefined}>
                {displayValue}
              </div>
              {!rolling && lastRoll?.isCrit && <div className="text-sm font-bold text-yellow-400 mt-1 tracking-wide">CRITICAL!</div>}
              {!rolling && lastRoll?.isFumble && <div className="text-sm font-bold text-red-500 mt-1 tracking-wide">FUMBLE!</div>}
            </div>
          ) : (
            <div className="text-slate-600 text-sm py-8">Click a die to roll</div>
          )}
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Rolls</h3>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.notation}
                onClick={() => doPresetRoll(p.notation, p.label)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-[#F38020]/50 hover:text-[#F38020] transition-all active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom notation */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Custom Roll</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={customNotation}
              onChange={(e) => setCustomNotation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doCustomRoll()}
              placeholder="e.g. 2d6+3, 4d6kh3, d20+5"
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:ring-1 focus:ring-[#F38020] focus:border-[#F38020] outline-none"
            />
            <button
              onClick={doCustomRoll}
              disabled={!customNotation.trim()}
              className="px-4 py-2 bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-30 text-white font-semibold text-sm rounded-lg transition-colors"
            >
              Roll
            </button>
          </div>
        </div>

        {/* Roll history */}
        {history.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Roll History</h3>
              <button onClick={() => setHistory([])} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Clear</button>
            </div>
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono ${
                    entry.isCrit ? 'bg-yellow-500/10 border border-yellow-500/30' : entry.isFumble ? 'bg-red-500/10 border border-red-500/30' : 'bg-slate-800/60 border border-slate-700/40'
                  }`}
                >
                  <span className="text-slate-500 text-[10px] shrink-0">{formatTime(entry.timestamp)}</span>
                  <span className="text-slate-400 shrink-0">{entry.notation}</span>
                  <span className="text-slate-600">[{entry.rolls.join(', ')}]</span>
                  {entry.kept && <span className="text-slate-500">kept [{entry.kept.join(', ')}]</span>}
                  {entry.modifier !== 0 && <span className="text-slate-500">{entry.modifier > 0 ? '+' : ''}{entry.modifier}</span>}
                  <span className="text-slate-400">=</span>
                  <span className={`font-bold text-base ${entry.isCrit ? 'text-yellow-400' : entry.isFumble ? 'text-red-400' : 'text-white'}`}>{entry.total}</span>
                  {entry.isCrit && <span className="text-[9px] font-bold text-yellow-400 bg-yellow-500/20 px-1.5 py-0.5 rounded-full">CRIT</span>}
                  {entry.isFumble && <span className="text-[9px] font-bold text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded-full">FAIL</span>}
                  {entry.label && <span className="text-slate-600 ml-auto truncate">{entry.label}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-[10px] text-slate-600">
        <Link to="/" className="hover:text-[#F38020] transition-colors">Adventure</Link>
        {' - '}
        D&D 5e Virtual Tabletop
      </footer>
    </div>
  );
}
