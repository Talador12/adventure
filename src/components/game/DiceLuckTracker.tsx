// DiceLuckTracker — sparkline of recent d20 rolls with hot/cold streak detection.
// Shows a tiny graph of your last 20 rolls, average, and whether you're on a streak.
// "The dice remember." But more importantly, now you can prove it.
import { useMemo } from 'react';

interface DiceLuckTrackerProps {
  rolls: number[]; // last N d20 roll values
}

function getStreak(rolls: number[]): { type: 'hot' | 'cold' | 'neutral'; count: number } {
  if (rolls.length < 3) return { type: 'neutral', count: 0 };
  const recent = rolls.slice(-5);
  const avg = recent.reduce((s, r) => s + r, 0) / recent.length;
  if (avg >= 14) return { type: 'hot', count: recent.filter((r) => r >= 14).length };
  if (avg <= 7) return { type: 'cold', count: recent.filter((r) => r <= 7).length };
  return { type: 'neutral', count: 0 };
}

export default function DiceLuckTracker({ rolls }: DiceLuckTrackerProps) {
  const last20 = useMemo(() => rolls.slice(-20), [rolls]);
  const avg = useMemo(() => last20.length > 0 ? last20.reduce((s, r) => s + r, 0) / last20.length : 0, [last20]);
  const streak = useMemo(() => getStreak(last20), [last20]);

  if (last20.length < 2) return null;

  // SVG sparkline
  const width = 80;
  const height = 20;
  const step = width / Math.max(1, last20.length - 1);
  const points = last20.map((v, i) => `${i * step},${height - ((v - 1) / 19) * height}`).join(' ');

  const streakLabel = streak.type === 'hot' ? 'Hot' : streak.type === 'cold' ? 'Cold' : '';
  const streakColor = streak.type === 'hot' ? 'text-amber-400' : streak.type === 'cold' ? 'text-blue-400' : '';
  const lineColor = streak.type === 'hot' ? '#fbbf24' : streak.type === 'cold' ? '#60a5fa' : '#64748b';

  return (
    <div className="flex items-center gap-2">
      <svg width={width} height={height} className="shrink-0" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Average line */}
        <line
          x1={0} x2={width}
          y1={height - ((avg - 1) / 19) * height}
          y2={height - ((avg - 1) / 19) * height}
          stroke="#475569"
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
      </svg>
      <div className="text-[8px] space-y-0">
        <div className="text-slate-500">avg {avg.toFixed(1)}</div>
        {streakLabel && (
          <div className={`font-bold ${streakColor}`}>{streakLabel} {streak.count}x</div>
        )}
      </div>
    </div>
  );
}
