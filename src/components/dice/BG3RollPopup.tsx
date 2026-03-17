import { useEffect, useMemo, useState } from 'react';
import { DICE_SHAPE_MAP } from './DiceShapes';
import type { RollPresentation } from '../../types/roll';

interface BG3RollPopupProps {
  roll: RollPresentation | null;
  visible: boolean;
  isDM?: boolean;
  onVeto?: (rollId: string) => void;
}

const EMPTY_ROLL: RollPresentation = {
  rollId: 'empty',
  username: '',
  die: 'd20',
  sides: 20,
  count: 1,
  allRolls: [1],
  keptRolls: [1],
  total: 1,
  timestamp: 0,
};

function getKeptFlags(allRolls: number[], keptRolls: number[]): boolean[] {
  const remaining = new Map<number, number>();
  for (const kept of keptRolls) remaining.set(kept, (remaining.get(kept) || 0) + 1);
  return allRolls.map((value) => {
    const left = remaining.get(value) || 0;
    if (left > 0) {
      remaining.set(value, left - 1);
      return true;
    }
    return false;
  });
}

export default function BG3RollPopup({ roll, visible, isDM, onVeto }: BG3RollPopupProps) {
  const activeRoll = roll || EMPTY_ROLL;

  const shapeKey = useMemo(() => {
    const bySides = `d${activeRoll.sides}`;
    if (DICE_SHAPE_MAP[bySides]) return bySides;
    const normalized = activeRoll.die.toLowerCase();
    if (DICE_SHAPE_MAP[normalized]) return normalized;
    return 'd20';
  }, [activeRoll.sides, activeRoll.die]);

  const Shape = DICE_SHAPE_MAP[shapeKey];
  const dieSize = shapeKey === 'd2' ? 58 : shapeKey === 'd4' ? 56 : shapeKey === 'd6' ? 60 : shapeKey === 'd8' ? 64 : shapeKey === 'd10' ? 66 : shapeKey === 'd12' ? 70 : 74;

  const faceText = (value: number) => {
    if (activeRoll.sides !== 2) return String(value);
    return value === 1 ? 'H' : 'T';
  };

  const [animatedValues, setAnimatedValues] = useState<number[]>(activeRoll.allRolls);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayTotal, setDisplayTotal] = useState<number | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const dieStaggerMs = 500;
  const staggerWindowMs = Math.max(0, activeRoll.allRolls.length - 1) * dieStaggerMs;
  const animationMs = Math.max(700, activeRoll.animationMs || (900 + staggerWindowMs));
  const perDieSpinMs = Math.max(450, animationMs - staggerWindowMs);
  const presentationMs = Math.max(
    animationMs + 1000 + (activeRoll.isCritical || activeRoll.isFumble ? 1000 : 0),
    activeRoll.presentationMs || 3000,
  );
  const resultPhase = !isAnimating && displayTotal !== null;

  useEffect(() => {
    setAnimatedValues(activeRoll.allRolls);
    setDisplayTotal(activeRoll.total);
  }, [activeRoll.rollId, activeRoll.allRolls, activeRoll.total]);

  useEffect(() => {
    if (!visible) return;
    setIsAnimating(true);
    setElapsedMs(0);
    setDisplayTotal(null);
    setShowBurst(false);
    const tickMs = 52;
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setElapsedMs(elapsed);
      if (elapsed >= animationMs) {
        setAnimatedValues(activeRoll.allRolls);
        setDisplayTotal(activeRoll.total);
        setIsAnimating(false);
        if (activeRoll.isCritical || activeRoll.isFumble) {
          setShowBurst(true);
          setTimeout(() => setShowBurst(false), 2200);
        }
        clearInterval(timer);
        return;
      }

      setAnimatedValues((prev) => activeRoll.allRolls.map((finalValue, idx) => {
        const dieStartMs = idx * dieStaggerMs;
        const dieEndMs = dieStartMs + perDieSpinMs;
        if (elapsed < dieStartMs) {
          return prev[idx] ?? Math.floor(Math.random() * activeRoll.sides) + 1;
        }
        if (elapsed >= dieEndMs) {
          return finalValue;
        }
        return Math.floor(Math.random() * activeRoll.sides) + 1;
      }));
    }, tickMs);
    return () => clearInterval(timer);
  }, [visible, activeRoll.rollId, activeRoll.sides, activeRoll.allRolls, activeRoll.total, activeRoll.isCritical, activeRoll.isFumble, animationMs, dieStaggerMs, perDieSpinMs]);

  useEffect(() => {
    if (document.getElementById('bg3-roll-popup-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'bg3-roll-popup-keyframes';
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
        10% { transform: translateX(-6px) rotate(-2deg); }
        20% { transform: translateX(6px) rotate(2deg); }
        30% { transform: translateX(-5px) rotate(-1deg); }
        40% { transform: translateX(5px) rotate(1deg); }
        50% { transform: translateX(-3px); }
        60% { transform: translateX(3px); }
      }
      @keyframes closePulse {
        0% { opacity: .2; }
        50% { opacity: .85; }
        100% { opacity: .2; }
      }
      @keyframes critRainbow {
        0% { filter: hue-rotate(0deg) saturate(1.05); box-shadow: 0 0 8px rgba(250,204,21,0.45); }
        50% { filter: hue-rotate(190deg) saturate(1.4); box-shadow: 0 0 18px rgba(56,189,248,0.6); }
        100% { filter: hue-rotate(360deg) saturate(1.05); box-shadow: 0 0 10px rgba(250,204,21,0.5); }
      }
      @keyframes critWave {
        0% { background-position: 0% 50%; transform: translateY(0px); }
        25% { background-position: 30% 65%; transform: translateY(-1px); }
        50% { background-position: 55% 35%; transform: translateY(1px); }
        75% { background-position: 80% 60%; transform: translateY(-1px); }
        100% { background-position: 100% 50%; transform: translateY(0px); }
      }
      @keyframes critRaveRoll {
        0% { transform: translateX(0px) translateY(0px) skewX(0deg) scaleY(1); border-radius: 9999px; }
        20% { transform: translateX(3px) translateY(-1px) skewX(4deg) scaleY(1.08); border-radius: 9999px 14px 9999px 14px; }
        40% { transform: translateX(-2px) translateY(1px) skewX(-5deg) scaleY(0.94); border-radius: 14px 9999px 14px 9999px; }
        60% { transform: translateX(4px) translateY(-1px) skewX(6deg) scaleY(1.1); border-radius: 9999px 18px 9999px 18px; }
        80% { transform: translateX(-3px) translateY(1px) skewX(-4deg) scaleY(0.96); border-radius: 18px 9999px 18px 9999px; }
        100% { transform: translateX(0px) translateY(0px) skewX(0deg) scaleY(1); border-radius: 9999px; }
      }
      @keyframes critPopPulse {
        0% { filter: brightness(1) saturate(1.2); box-shadow: 0 0 12px rgba(250,204,21,0.4); }
        50% { filter: brightness(1.45) saturate(1.8); box-shadow: 0 0 28px rgba(34,211,238,0.75), 0 0 48px rgba(236,72,153,0.55); }
        100% { filter: brightness(1.08) saturate(1.25); box-shadow: 0 0 14px rgba(250,204,21,0.45); }
      }
      @keyframes failBarDrop {
        0% { transform: translateY(0) rotate(0deg); }
        10% { transform: translateY(0) rotate(-1deg); }
        20% { transform: translateY(0) rotate(1deg); }
        30% { transform: translateY(0) rotate(-2deg); }
        40% { transform: translateY(0) rotate(2deg); }
        55% { transform: translateY(0) rotate(-1deg); }
        70% { transform: translateY(8px) rotate(6deg); }
        100% { transform: translateY(150px) rotate(22deg); opacity: 0; }
      }
      @keyframes failFire {
        0% { box-shadow: 0 0 6px rgba(239,68,68,0.5), 0 -2px 6px rgba(251,146,60,0.35); filter: hue-rotate(0deg) saturate(1.1); }
        50% { box-shadow: 0 0 14px rgba(248,113,113,0.8), 0 -4px 10px rgba(251,146,60,0.65); filter: hue-rotate(-10deg) saturate(1.45); }
        100% { box-shadow: 0 0 8px rgba(239,68,68,0.55), 0 -2px 6px rgba(251,146,60,0.4); filter: hue-rotate(8deg) saturate(1.15); }
      }
      @keyframes maxAura {
        0% { box-shadow: 0 0 10px rgba(250,204,21,0.45), 0 0 20px rgba(250,204,21,0.2); }
        50% { box-shadow: 0 0 18px rgba(250,204,21,0.7), 0 0 30px rgba(250,204,21,0.35); }
        100% { box-shadow: 0 0 10px rgba(250,204,21,0.45), 0 0 20px rgba(250,204,21,0.2); }
      }
      @keyframes minAura {
        0% { box-shadow: 0 0 10px rgba(239,68,68,0.45), 0 0 20px rgba(239,68,68,0.2); }
        50% { box-shadow: 0 0 18px rgba(239,68,68,0.72), 0 0 30px rgba(239,68,68,0.35); }
        100% { box-shadow: 0 0 10px rgba(239,68,68,0.45), 0 0 20px rgba(239,68,68,0.2); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const keptFlags = getKeptFlags(activeRoll.allRolls, activeRoll.keptRolls);
  const rollerLabel = activeRoll.unitName ? `${activeRoll.unitName} [${activeRoll.username}]` : activeRoll.username;
  const bonusTotal = (activeRoll.bonuses || []).reduce((sum, b) => sum + b.value, 0);
  const hasDC = typeof activeRoll.dc === 'number';
  if (!roll) return null;

  return (
    <div className={`fixed inset-0 z-[70] flex items-center justify-center pointer-events-auto transition-opacity duration-300 ease-out motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`relative pointer-events-auto w-[min(92vw,620px)] rounded-2xl border border-amber-700/30 bg-gradient-to-b from-slate-900/95 via-slate-900/95 to-slate-950/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out motion-reduce:transition-none ${visible ? 'translate-y-0 scale-100' : 'translate-y-1 scale-[0.985]'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-400/80">Rolling Now</div>
            <div className="mt-1 text-lg font-bold text-amber-100">{rollerLabel}</div>
          </div>
          {isDM && !activeRoll.vetoed && (
            <button
              onClick={() => onVeto?.(activeRoll.rollId)}
              className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-red-700/40 bg-red-900/30 text-red-300 hover:bg-red-900/50 transition-colors"
            >
              Veto Roll
            </button>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-2">
            <span className="text-slate-400">Roll</span>
            <div className="mt-0.5 font-semibold text-slate-100">{activeRoll.count > 1 ? `${activeRoll.count}x ` : ''}{activeRoll.die.toUpperCase()}</div>
          </div>
          <div className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-2">
            <span className="text-slate-400">Mode</span>
            <div className={`mt-0.5 font-semibold ${activeRoll.advMode === 'advantage' ? 'text-emerald-300' : activeRoll.advMode === 'disadvantage' ? 'text-rose-300' : 'text-slate-100'}`}>
              {activeRoll.advMode === 'advantage' ? 'Advantage' : activeRoll.advMode === 'disadvantage' ? 'Disadvantage' : 'Normal'}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          {activeRoll.allRolls.map((value, idx) => (
            (() => {
              const dieStartMs = idx * dieStaggerMs;
              const dieEndMs = dieStartMs + perDieSpinMs;
              const dieRolling = isAnimating && elapsedMs >= dieStartMs && elapsedMs < dieEndMs;
              const dieResolved = elapsedMs >= dieEndMs || !isAnimating;
              const justResolved = dieResolved && isAnimating && elapsedMs < dieEndMs + 260;
              const revealSelection = !isAnimating;
              const showCritColor = revealSelection && keptFlags[idx] && activeRoll.isCritical;
              const showFailColor = revealSelection && keptFlags[idx] && activeRoll.isFumble;
              const showNormalKeepColor = revealSelection && keptFlags[idx] && !showCritColor && !showFailColor;
              const isMaxFace = dieResolved && value === activeRoll.sides;
              const isMinFace = dieResolved && value === 1;
              const showMaxColor = isMaxFace && !showCritColor;
              const showMinColor = isMinFace && !showFailColor;
              const dieFaceTextColor = showCritColor
                ? 'text-yellow-50'
                : showFailColor
                  ? 'text-red-50'
                  : showMaxColor
                    ? 'text-yellow-100'
                    : showMinColor
                      ? 'text-red-100'
                      : 'text-white';
              return (
            <div
              key={`${activeRoll.rollId}-${idx}-${value}`}
              className={`relative rounded-lg border px-2 py-1.5 transition-all duration-300 ${
                showMaxColor
                  ? 'border-yellow-400/70 bg-yellow-500/20 text-yellow-50 shadow-[0_0_18px_rgba(250,204,21,0.38)]'
                  : showMinColor
                    ? 'border-red-400/70 bg-red-500/20 text-red-50 shadow-[0_0_18px_rgba(239,68,68,0.38)]'
                  : revealSelection && keptFlags[idx]
                  ? showCritColor
                    ? 'border-yellow-500/60 bg-yellow-500/12 text-yellow-100 shadow-[0_0_16px_rgba(250,204,21,0.26)]'
                    : showFailColor
                      ? 'border-red-500/60 bg-red-500/12 text-red-100 shadow-[0_0_16px_rgba(239,68,68,0.24)]'
                      : showNormalKeepColor
                        ? 'border-slate-500/70 bg-slate-700/35 text-white shadow-[0_0_12px_rgba(148,163,184,0.15)]'
                        : 'border-slate-500/70 bg-slate-700/35 text-white shadow-[0_0_12px_rgba(148,163,184,0.15)]'
                  : 'border-slate-600/70 bg-slate-800/70 text-slate-200'
              }`}
              style={{ animationDelay: `${idx * 45}ms` }}
            >
              <div className="relative flex items-center justify-center" style={{ width: dieSize, height: dieSize, opacity: dieResolved ? 1 : dieRolling ? 0.95 : 0.55, animation: dieRolling ? 'diceRoll 0.9s ease-in-out infinite' : showBurst && keptFlags[idx] && activeRoll.isFumble ? 'fumbleShake 0.45s ease-out' : justResolved && isMinFace ? 'fumbleShake 0.4s ease-out' : 'diceSettle 0.35s ease-out', boxShadow: showCritColor ? '0 0 22px rgba(250,204,21,0.52)' : showFailColor ? '0 0 22px rgba(239,68,68,0.52)' : undefined }}>
                <Shape
                  size={dieSize}
                  className={`absolute inset-0 ${
                    showMaxColor
                      ? 'text-yellow-200/95'
                      : showMinColor
                        ? 'text-red-200/95'
                        : revealSelection && keptFlags[idx]
                      ? showCritColor
                        ? 'text-yellow-300/95'
                        : showFailColor
                          ? 'text-red-300/95'
                          : 'text-slate-200/85'
                      : 'text-slate-300/80'
                  }`}
                />
                <span className={`relative text-sm font-extrabold ${dieFaceTextColor}`}>
                  {faceText(animatedValues[idx] ?? value)}
                </span>
                {(showBurst && keptFlags[idx] && activeRoll.isCritical) || (justResolved && isMaxFace) ? (
                  <span className="absolute w-10 h-10 rounded-full" style={{ animation: 'critGlow 0.9s ease-out forwards' }} />
                ) : null}
                {(showCritColor || showMaxColor) && (
                  <span className="absolute w-10 h-10 rounded-full" style={{ animation: 'maxAura 1.2s ease-in-out infinite' }} />
                )}
                {(showFailColor || showMinColor) && (
                  <span className="absolute w-10 h-10 rounded-full" style={{ animation: 'minAura 0.95s ease-in-out infinite' }} />
                )}
              </div>
            </div>
              );
            })()
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs" style={activeRoll.isFumble && showBurst ? { animation: 'fumbleShake 0.6s ease-out' } : undefined}>
          <div className="rounded-lg border border-slate-600/50 bg-slate-800/50 px-3 py-2">
            <span className="text-slate-300/80">Total</span>
            <div className={`text-lg font-extrabold leading-none ${activeRoll.isCritical ? 'text-yellow-300' : activeRoll.isFumble ? 'text-red-300' : 'text-white'}`}>
              {displayTotal ?? '...'}
            </div>
          </div>
          {hasDC && (
            <div className="rounded-lg border border-sky-700/40 bg-sky-900/20 px-3 py-2">
              <span className="text-sky-300/80">DC</span>
              <div className="text-lg font-extrabold text-sky-100 leading-none">{activeRoll.dc}</div>
            </div>
          )}
          {activeRoll.bonuses && activeRoll.bonuses.length > 0 && (
            <div className="rounded-lg border border-violet-700/40 bg-violet-900/20 px-3 py-2">
              <span className="text-violet-300/80">Bonuses</span>
              <div className="text-sm font-bold text-violet-100 leading-none">{bonusTotal >= 0 ? `+${bonusTotal}` : bonusTotal}</div>
            </div>
          )}
          {resultPhase && activeRoll.isCritical && (
            <span className="text-[11px] px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500/40 font-bold text-yellow-200" style={{ animation: 'diceSettle 0.35s ease-out' }}>
              {activeRoll.sides === 2 ? 'Success' : 'Critical Success'}
            </span>
          )}
          {resultPhase && activeRoll.isFumble && (
            <span className="text-[11px] px-2 py-1 rounded bg-red-500/20 border border-red-500/40 font-bold text-red-200" style={{ animation: 'fumbleShake 0.45s ease-out' }}>
              {activeRoll.sides === 2 ? 'Failure' : 'Critical Failure'}
            </span>
          )}
          {activeRoll.vetoed && <span className="text-[11px] px-2 py-1 rounded bg-red-900/30 border border-red-700/40 font-bold text-red-200">Vetoed by {activeRoll.vetoedBy || 'DM'}</span>}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div
            className="relative h-1.5 flex-1 rounded-full bg-slate-800 overflow-hidden"
            style={resultPhase && activeRoll.isFumble ? { animation: 'failBarDrop 1s ease-in forwards', transformOrigin: 'center left', overflow: 'visible' } : undefined}
          >
            <div
              className="h-full bg-gradient-to-r from-zinc-500/70 to-zinc-800/95 dark:from-zinc-100 dark:to-white"
              style={{
                width: visible ? '100%' : '0%',
                transition: `width ${presentationMs}ms linear`,
                transformOrigin: 'left center',
                backgroundImage: resultPhase && activeRoll.isCritical
                  ? 'linear-gradient(90deg, #f59e0b 0%, #f97316 16%, #ec4899 33%, #8b5cf6 50%, #06b6d4 66%, #22c55e 83%, #f59e0b 100%)'
                  : resultPhase && activeRoll.isFumble
                    ? 'linear-gradient(90deg, #ef4444 0%, #f97316 45%, #dc2626 100%)'
                    : undefined,
                backgroundSize: resultPhase && activeRoll.isCritical ? '260% 260%' : resultPhase && activeRoll.isFumble ? '180% 180%' : undefined,
                animation: resultPhase && activeRoll.isCritical
                  ? 'critRainbow 0.82s linear infinite, critWave 0.72s ease-in-out infinite, critRaveRoll 0.62s ease-in-out infinite, critPopPulse 0.62s ease-in-out infinite'
                  : resultPhase && activeRoll.isFumble
                    ? 'failFire 0.18s linear infinite'
                    : undefined,
              }}
            />
          </div>
          <span className="text-[10px] text-slate-400" style={{ animation: 'closePulse 1s ease-in-out infinite' }}>
            Closing...
          </span>
        </div>
      </div>
    </div>
  );
}
