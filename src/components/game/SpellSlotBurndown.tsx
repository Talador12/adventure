// SpellSlotBurndown — tiny sparkline showing spell slot usage over the session.
// Tracks total remaining slots at each cast, draws a line that trends downward.
// "The wizard's running out of tricks. The graph confirms it."
import { useMemo } from 'react';

interface SpellSlotBurndownProps {
  /** Array of {timestamp, totalSlotsRemaining} entries */
  history: Array<{ remaining: number }>;
  maxSlots: number;
}

export default function SpellSlotBurndown({ history, maxSlots }: SpellSlotBurndownProps) {
  if (history.length < 2 || maxSlots <= 0) return null;

  const width = 60;
  const height = 14;
  const points = useMemo(() => {
    const step = width / Math.max(1, history.length - 1);
    return history.map((h, i) => `${i * step},${height - (h.remaining / maxSlots) * height}`).join(' ');
  }, [history, maxSlots]);

  const remaining = history[history.length - 1]?.remaining ?? 0;
  const pct = Math.round((remaining / maxSlots) * 100);
  const color = pct > 50 ? '#8b5cf6' : pct > 25 ? '#eab308' : '#ef4444';

  return (
    <div className="flex items-center gap-1" title={`${remaining}/${maxSlots} spell slots remaining (${pct}%)`}>
      <svg width={width} height={height} className="shrink-0">
        <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[7px] text-slate-600">{pct}%</span>
    </div>
  );
}
