// DiceSuperstition — detects streaks and delivers dry commentary.
// "The dice have opinions. This component gives them a voice."
import { useMemo } from 'react';

interface DiceSuperstitionProps {
  /** Last N d20 roll values */
  rolls: number[];
}

// The commentary — specific enough to be funny, not so specific it gets old
const LOW_STREAK_QUIPS = [
  'The dice are not with you today.',
  'Statistically, this is fine. Emotionally, less so.',
  'Have you considered a different d20?',
  'The dice sense your fear.',
  'Your d20 has chosen violence. Against you.',
  'At this point it might be a cursed artifact.',
];

const HIGH_STREAK_QUIPS = [
  'The dice favor the bold.',
  'Don\'t look directly at the dice. You\'ll spook them.',
  'Mathematically improbable. Dramatically perfect.',
  'Someone at this table made a deal with Tymora.',
];

const AVERAGE_QUIPS = [
  'The dice are... aggressively average.',
  'Rolling exactly what the math predicted. How unsatisfying.',
];

function getQuip(rolls: number[]): { text: string; type: 'cold' | 'hot' | 'mid' | null } | null {
  if (rolls.length < 3) return null;
  const recent = rolls.slice(-5);

  // Cold streak: 3+ rolls under 7
  const lowCount = recent.filter((r) => r <= 6).length;
  if (lowCount >= 3) {
    return { text: LOW_STREAK_QUIPS[Math.floor(Math.random() * LOW_STREAK_QUIPS.length)], type: 'cold' };
  }

  // Hot streak: 3+ rolls of 15+
  const highCount = recent.filter((r) => r >= 15).length;
  if (highCount >= 3) {
    return { text: HIGH_STREAK_QUIPS[Math.floor(Math.random() * HIGH_STREAK_QUIPS.length)], type: 'hot' };
  }

  // Aggressively average: 5 rolls all between 8-13
  if (recent.length >= 5 && recent.every((r) => r >= 8 && r <= 13)) {
    return { text: AVERAGE_QUIPS[Math.floor(Math.random() * AVERAGE_QUIPS.length)], type: 'mid' };
  }

  return null;
}

export default function DiceSuperstition({ rolls }: DiceSuperstitionProps) {
  const quip = useMemo(() => getQuip(rolls), [rolls]);

  if (!quip) return null;

  const color = quip.type === 'cold' ? 'text-blue-400' : quip.type === 'hot' ? 'text-amber-400' : 'text-slate-500';

  return (
    <div className={`text-[8px] italic ${color} text-center py-0.5`}>
      {quip.text}
    </div>
  );
}
