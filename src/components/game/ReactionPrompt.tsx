// ReactionPrompt - modal prompt for Shield/Counterspell reactions during combat.
// Auto-dismisses after 10 seconds (defaults to declining the reaction).
import { useEffect, useRef } from 'react';
import type { PendingReaction } from '../../types/game';

interface ReactionPromptProps {
  reaction: PendingReaction;
  targetName: string;
  onResolve: (useReaction: boolean) => void;
}

export default function ReactionPrompt({ reaction, targetName, onResolve }: ReactionPromptProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const startRef = useRef(Date.now());

  // Auto-decline after 10 seconds
  useEffect(() => {
    timerRef.current = setTimeout(() => onResolve(false), 10000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [onResolve]);

  const elapsed = Date.now() - startRef.current;
  const remaining = Math.max(0, Math.ceil((10000 - elapsed) / 1000));

  if (reaction.type === 'shield') {
    return (
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] animate-pop-in">
        <div className="bg-slate-900/95 border-2 border-sky-500/60 rounded-2xl shadow-2xl shadow-sky-900/40 px-6 py-4 max-w-sm">
          <div className="text-xs text-sky-400 font-bold uppercase tracking-wider mb-1">Reaction</div>
          <p className="text-sm text-slate-200 mb-3">
            <span className="font-bold text-sky-300">{targetName}</span> is hit for{' '}
            <span className="font-bold text-red-400">{reaction.damage}</span> damage.
            {reaction.attackRoll !== undefined && (
              <span className="text-slate-400"> (Attack roll: {reaction.attackRoll} vs AC {reaction.attackRoll - 5}+5={reaction.attackRoll})</span>
            )}
          </p>
          <p className="text-xs text-slate-400 mb-3">
            Cast <span className="text-sky-300 font-semibold">Shield</span>? +5 AC until your next turn. Spends a level 1+ spell slot.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); onResolve(true); }}
              className="flex-1 px-4 py-2 rounded-xl bg-sky-700/60 hover:bg-sky-600/70 border border-sky-500/50 text-sky-200 text-sm font-bold transition-all"
            >
              Cast Shield
            </button>
            <button
              onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); onResolve(false); }}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-slate-400 text-sm font-semibold transition-all"
            >
              No ({remaining}s)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Counterspell (future)
  return null;
}
