// useAttackIndicators — manages animated attack lines/beams on the battle map.
// When an attack fires, a line animates from attacker to target with a color/style
// based on the attack type. Fades out after 600ms.
import { useState, useCallback, useRef } from 'react';

export interface AttackIndicator {
  id: string;
  fromCol: number;
  fromRow: number;
  toCol: number;
  toRow: number;
  type: 'melee' | 'ranged' | 'spell' | 'heal';
  timestamp: number;
}

const INDICATOR_DURATION = 700; // ms

export function useAttackIndicators() {
  const [indicators, setIndicators] = useState<AttackIndicator[]>([]);
  const timerRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const addIndicator = useCallback((
    fromCol: number, fromRow: number,
    toCol: number, toRow: number,
    type: AttackIndicator['type'] = 'melee',
  ) => {
    const id = `atk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const indicator: AttackIndicator = { id, fromCol, fromRow, toCol, toRow, type, timestamp: Date.now() };
    setIndicators((prev) => [...prev, indicator]);

    const timer = setTimeout(() => {
      setIndicators((prev) => prev.filter((i) => i.id !== id));
      timerRefs.current.delete(id);
    }, INDICATOR_DURATION);
    timerRefs.current.set(id, timer);
  }, []);

  return { indicators, addIndicator };
}

// Render attack indicators on a canvas context (called from BattleMap draw loop)
export function drawAttackIndicators(
  ctx: CanvasRenderingContext2D,
  indicators: AttackIndicator[],
  cellSize: number,
) {
  const now = Date.now();
  for (const ind of indicators) {
    const age = now - ind.timestamp;
    if (age > INDICATOR_DURATION) continue;

    // Fade out over the duration
    const progress = age / INDICATOR_DURATION;
    const opacity = 1 - progress;
    const fromX = ind.fromCol * cellSize + cellSize / 2;
    const fromY = ind.fromRow * cellSize + cellSize / 2;
    const toX = ind.toCol * cellSize + cellSize / 2;
    const toY = ind.toRow * cellSize + cellSize / 2;

    ctx.save();
    ctx.globalAlpha = opacity;

    // Style based on type
    const colors: Record<string, { stroke: string; glow: string; dashPattern: number[] }> = {
      melee: { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)', dashPattern: [] },
      ranged: { stroke: '#fbbf24', glow: 'rgba(251, 191, 36, 0.3)', dashPattern: [6, 4] },
      spell: { stroke: '#a78bfa', glow: 'rgba(167, 139, 250, 0.4)', dashPattern: [3, 3] },
      heal: { stroke: '#4ade80', glow: 'rgba(74, 222, 128, 0.3)', dashPattern: [4, 2] },
    };
    const style = colors[ind.type] || colors.melee;

    // Glow line (wider, semi-transparent)
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = style.glow;
    ctx.lineWidth = 6;
    ctx.setLineDash(style.dashPattern);
    ctx.stroke();

    // Core line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = 2;
    ctx.setLineDash(style.dashPattern);
    ctx.stroke();

    // Impact burst at target (expanding circle)
    const burstRadius = 4 + progress * 12;
    ctx.beginPath();
    ctx.arc(toX, toY, burstRadius, 0, Math.PI * 2);
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.stroke();

    // Arrow head for ranged
    if (ind.type === 'ranged') {
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const headLen = 8;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLen * Math.cos(angle - 0.4), toY - headLen * Math.sin(angle - 0.4));
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLen * Math.cos(angle + 0.4), toY - headLen * Math.sin(angle + 0.4));
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.stroke();
    }

    ctx.restore();
  }
}
