// FloatingCombatText — animated floating damage/healing/miss numbers that appear
// over the game view during combat. Numbers float upward and fade out.
// Usage: call addFloatingText() from any combat action to show feedback.

import { useState, useCallback, useRef, useEffect } from 'react';

export type DamageType = 'slashing' | 'piercing' | 'bludgeoning' | 'fire' | 'cold' | 'lightning' | 'thunder' | 'poison' | 'acid' | 'necrotic' | 'radiant' | 'force' | 'psychic';

const DAMAGE_TYPE_ICONS: Record<DamageType, string> = {
  slashing: '🗡️', piercing: '🏹', bludgeoning: '🔨', fire: '🔥', cold: '❄️',
  lightning: '⚡', thunder: '💨', poison: '☠️', acid: '🧪', necrotic: '💀',
  radiant: '✨', force: '💫', psychic: '🧠',
};

export interface FloatingText {
  id: string;
  text: string;
  type: 'damage' | 'heal' | 'miss' | 'crit' | 'condition' | 'info';
  damageType?: DamageType; // for damage/crit — shows type icon
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  timestamp: number;
}

interface FloatingCombatTextProps {
  texts: FloatingText[];
  onExpire: (id: string) => void;
}

const TYPE_STYLES: Record<FloatingText['type'], string> = {
  damage: 'text-red-400 font-bold',
  heal: 'text-green-400 font-bold',
  miss: 'text-slate-500 italic',
  crit: 'text-amber-300 font-extrabold text-lg',
  condition: 'text-purple-400 font-semibold',
  info: 'text-sky-400 font-medium',
};

function FloatingNumber({ text, onDone }: { text: FloatingText; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(onDone, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none select-none text-sm ${TYPE_STYLES[text.type]} animate-float-up`}
      style={{
        left: `${text.x}%`,
        top: `${text.y}%`,
        textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)',
        zIndex: 50,
      }}
    >
      {text.type === 'damage' && '-'}
      {text.type === 'heal' && '+'}
      {text.text}
      {text.type === 'crit' && '!'}
      {text.damageType && (text.type === 'damage' || text.type === 'crit') && (
        <span className="ml-0.5 text-[10px] opacity-80">{DAMAGE_TYPE_ICONS[text.damageType]}</span>
      )}
    </div>
  );
}

export default function FloatingCombatText({ texts, onExpire }: FloatingCombatTextProps) {
  if (texts.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {texts.map((t) => (
        <FloatingNumber key={t.id} text={t} onDone={() => onExpire(t.id)} />
      ))}
    </div>
  );
}

// Hook to manage floating combat text state
export function useFloatingCombatText() {
  const [texts, setTexts] = useState<FloatingText[]>([]);

  const addFloatingText = useCallback((
    text: string,
    type: FloatingText['type'],
    opts?: { x?: number; y?: number }
  ) => {
    // Randomize position slightly to avoid stacking
    const baseX = opts?.x ?? 40 + Math.random() * 20;
    const baseY = opts?.y ?? 20 + Math.random() * 15;

    setTexts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        type,
        x: baseX + (Math.random() - 0.5) * 10,
        y: baseY + (Math.random() - 0.5) * 5,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const expireText = useCallback((id: string) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { texts, addFloatingText, expireText };
}
