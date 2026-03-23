// WeatherParticles — canvas overlay for weather particle effects on the battle map.
// Renders rain drops, snow flakes, sand particles, or fog wisps on a transparent canvas.
// Sits absolutely positioned over the battle map canvas.
import { useRef, useEffect, useCallback } from 'react';

type WeatherType = 'none' | 'rain' | 'snow' | 'sandstorm' | 'fog';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

interface WeatherParticlesProps {
  weather: WeatherType;
  width: number;
  height: number;
}

const PARTICLE_COUNTS: Record<WeatherType, number> = {
  none: 0, rain: 120, snow: 80, sandstorm: 100, fog: 40,
};

function createParticle(weather: WeatherType, w: number, h: number): Particle {
  const base = { x: Math.random() * w, y: Math.random() * h, life: 1 };
  switch (weather) {
    case 'rain':
      return { ...base, vx: -0.5, vy: 6 + Math.random() * 3, size: 1, opacity: 0.4 + Math.random() * 0.3 };
    case 'snow':
      return { ...base, vx: Math.random() * 0.8 - 0.4, vy: 0.5 + Math.random() * 1, size: 2 + Math.random() * 2, opacity: 0.5 + Math.random() * 0.4 };
    case 'sandstorm':
      return { ...base, vx: 3 + Math.random() * 2, vy: Math.random() * 1.5 - 0.75, size: 1.5 + Math.random(), opacity: 0.3 + Math.random() * 0.3 };
    case 'fog':
      return { ...base, x: Math.random() * w, y: h * 0.4 + Math.random() * h * 0.6, vx: 0.15 + Math.random() * 0.3, vy: Math.random() * 0.1 - 0.05, size: 20 + Math.random() * 30, opacity: 0.04 + Math.random() * 0.06 };
    default:
      return { ...base, vx: 0, vy: 0, size: 0, opacity: 0 };
  }
}

export default function WeatherParticles({ weather, width, height }: WeatherParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  const init = useCallback(() => {
    const count = PARTICLE_COUNTS[weather] || 0;
    particlesRef.current = Array.from({ length: count }, () => createParticle(weather, width, height));
  }, [weather, width, height]);

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    if (weather === 'none') { cancelAnimationFrame(rafRef.current); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.y > height) { p.y = -p.size; p.x = Math.random() * width; }
        if (p.y < -p.size) { p.y = height; }
        if (p.x > width) { p.x = -p.size; }
        if (p.x < -p.size) { p.x = width; }

        switch (weather) {
          case 'rain':
            ctx.strokeStyle = `rgba(147,197,253,${p.opacity})`;
            ctx.lineWidth = p.size;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.vx * 2, p.y + p.vy * 2);
            ctx.stroke();
            break;
          case 'snow':
            ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'sandstorm':
            ctx.fillStyle = `rgba(217,180,119,${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'fog':
            ctx.fillStyle = `rgba(200,210,220,${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [weather, width, height]);

  if (weather === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ width, height }}
    />
  );
}
