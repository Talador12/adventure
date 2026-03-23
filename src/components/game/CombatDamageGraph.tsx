// CombatDamageGraph — per-round damage bar chart rendered on canvas.
// Parses combat log using "--- Round N ---" markers to bucket damage.
// Red bars = damage dealt, orange bars = damage taken. Hover shows values.
import { useRef, useEffect, useState, useMemo } from 'react';

interface CombatDamageGraphProps {
  combatLog: string[];
  rounds: number;
}

interface RoundData {
  round: number;
  dealt: number;
  taken: number;
}

function parseDamageByRound(log: string[]): RoundData[] {
  const rounds: RoundData[] = [];
  let current: RoundData = { round: 1, dealt: 0, taken: 0 };

  for (const entry of log) {
    const roundMatch = entry.match(/^--- Round (\d+) ---$/);
    if (roundMatch) {
      if (current.dealt > 0 || current.taken > 0) rounds.push(current);
      current = { round: parseInt(roundMatch[1]), dealt: 0, taken: 0 };
      continue;
    }

    const lower = entry.toLowerCase();
    const dmgMatch = entry.match(/for (\d+) (?:damage|fire|cold|force|radiant|necrotic|lightning|thunder|psychic|poison)/i);
    if (dmgMatch) {
      const dmg = parseInt(dmgMatch[1]);
      if (lower.includes('hits') || lower.includes('strikes') || lower.includes('deals') || lower.includes('cast')) {
        current.dealt += dmg;
      }
    }
    const takenMatch = entry.match(/takes? (\d+) (?:damage|fire)/i);
    if (takenMatch) {
      current.taken += parseInt(takenMatch[1]);
    }
  }
  if (current.dealt > 0 || current.taken > 0) rounds.push(current);

  return rounds;
}

export default function CombatDamageGraph({ combatLog, rounds: totalRounds }: CombatDamageGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<RoundData | null>(null);
  const data = useMemo(() => parseDamageByRound(combatLog), [combatLog]);

  const maxVal = useMemo(() => Math.max(1, ...data.map((d) => Math.max(d.dealt, d.taken))), [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const padding = { top: 4, bottom: 14, left: 4, right: 4 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barGroupWidth = chartW / data.length;
    const barWidth = Math.max(2, barGroupWidth * 0.35);
    const gap = Math.max(1, barGroupWidth * 0.05);

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const x = padding.left + i * barGroupWidth;

      // Dealt bar (red)
      const dealtH = (d.dealt / maxVal) * chartH;
      ctx.fillStyle = '#ef444490';
      ctx.fillRect(x + gap, padding.top + chartH - dealtH, barWidth, dealtH);

      // Taken bar (amber)
      const takenH = (d.taken / maxVal) * chartH;
      ctx.fillStyle = '#f5950090';
      ctx.fillRect(x + gap + barWidth + 1, padding.top + chartH - takenH, barWidth, takenH);

      // Round label
      ctx.fillStyle = '#64748b';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`R${d.round}`, x + barGroupWidth / 2, h - 2);
    }
  }, [data, maxVal]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const barGroupWidth = (canvas.clientWidth - 8) / data.length;
    const idx = Math.floor((x - 4) / barGroupWidth);
    setHover(idx >= 0 && idx < data.length ? data[idx] : null);
  };

  if (data.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-slate-600 uppercase font-semibold">Damage by Round</span>
        <div className="flex gap-2 text-[8px]">
          <span className="text-red-400">● Dealt</span>
          <span className="text-amber-400">● Taken</span>
        </div>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-16 rounded bg-slate-900/40"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHover(null)}
        />
        {hover && (
          <div className="absolute top-0 right-0 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-[8px] space-x-2 pointer-events-none">
            <span className="text-slate-400">R{hover.round}</span>
            <span className="text-red-400">{hover.dealt} dealt</span>
            <span className="text-amber-400">{hover.taken} taken</span>
          </div>
        )}
      </div>
    </div>
  );
}
