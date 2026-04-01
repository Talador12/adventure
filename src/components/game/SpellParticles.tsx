// SpellParticles — CSS-based particle effects for spell casting.
// Renders ephemeral particles over the game view when spells are cast.
// No dependencies — pure CSS animations with randomized properties.

import { useState, useCallback, useEffect } from 'react';

export type SpellEffect = 'fire' | 'ice' | 'lightning' | 'heal' | 'necrotic' | 'radiant' | 'force';

interface Particle {
  id: string;
  effect: SpellEffect;
  x: number; // percentage 0-100
  y: number;
  size: number;
  duration: number;
  delay: number;
  angle: number;
  timestamp: number;
}

const EFFECT_STYLES: Record<SpellEffect, { colors: string[]; emoji: string; glow: string }> = {
  fire: { colors: ['#ef4444', '#f97316', '#fbbf24', '#fef08a'], emoji: '🔥', glow: 'rgba(239,68,68,0.6)' },
  ice: { colors: ['#93c5fd', '#60a5fa', '#3b82f6', '#e0f2fe'], emoji: '❄️', glow: 'rgba(96,165,250,0.6)' },
  lightning: { colors: ['#fbbf24', '#fef08a', '#ffffff', '#a78bfa'], emoji: '⚡', glow: 'rgba(251,191,36,0.8)' },
  heal: { colors: ['#4ade80', '#86efac', '#bbf7d0', '#ffffff'], emoji: '✨', glow: 'rgba(74,222,128,0.5)' },
  necrotic: { colors: ['#6b21a8', '#9333ea', '#a855f7', '#1e1b4b'], emoji: '💀', glow: 'rgba(147,51,234,0.5)' },
  radiant: { colors: ['#fef08a', '#fde047', '#facc15', '#ffffff'], emoji: '✨', glow: 'rgba(253,224,71,0.6)' },
  force: { colors: ['#818cf8', '#a78bfa', '#c4b5fd', '#e0e7ff'], emoji: '💫', glow: 'rgba(129,140,248,0.5)' },
};

const PARTICLE_COUNT = 12;

export function useSpellParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerEffect = useCallback((effect: SpellEffect, x = 50, y = 50) => {
    const now = Date.now();
    const newParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: `sp-${now}-${i}`,
      effect,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: 4 + Math.random() * 8,
      duration: 600 + Math.random() * 800,
      delay: Math.random() * 200,
      angle: Math.random() * 360,
      timestamp: now,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  // Auto-expire particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      const now = Date.now();
      setParticles((prev) => prev.filter((p) => now - p.timestamp < p.duration + p.delay + 200));
    }, 1500);
    return () => clearTimeout(timer);
  }, [particles]);

  return { particles, triggerEffect };
}

interface SpellParticlesProps {
  particles: Particle[];
}

export default function SpellParticles({ particles }: SpellParticlesProps) {
  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
      {particles.map((p) => {
        const style = EFFECT_STYLES[p.effect];
        const color = style.colors[Math.floor(Math.random() * style.colors.length)];
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 2}px ${style.glow}`,
              animation: `spell-particle-rise ${p.duration}ms ${p.delay}ms ease-out forwards`,
              opacity: 0,
              transform: `rotate(${p.angle}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
