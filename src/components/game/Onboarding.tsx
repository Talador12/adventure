// Onboarding — first-visit guided tooltips for new players.
// Shows a sequence of positioned tips explaining key UI areas.
// Dismissed permanently via localStorage flag.

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'adventure:onboarding:v1';

interface OnboardingStep {
  id: string;
  title: string;
  text: string;
  position: 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const STEPS: OnboardingStep[] = [
  { id: 'welcome', title: 'Welcome to Adventure!', text: 'This is a D&D 5e virtual tabletop. You can play with friends or AI companions. Let us show you around!', position: 'center' },
  { id: 'character', title: 'Your Character', text: 'Press C to open your character sheet. Your stats, inventory, spells, and abilities are all here.', position: 'top-right' },
  { id: 'dice', title: 'Rolling Dice', text: 'Click the dice in the bottom bar or type /roll 1d20+5 in chat. Rolls are synced to all players in real-time.', position: 'bottom-center' },
  { id: 'combat', title: 'Combat', text: 'The DM starts combat by generating an encounter. Initiative is rolled automatically. Use the toolbar buttons for actions on your turn.', position: 'top-center' },
  { id: 'map', title: 'Battle Map', text: 'Click your token to see movement range. Click a highlighted cell to move. Select enemies to attack. Press 2 to switch to map view.', position: 'center' },
  { id: 'shortcuts', title: 'Keyboard Shortcuts', text: 'Press ? at any time to see all keyboard shortcuts. Key ones: 1-9 for views, A to attack, E to end turn, M to mute.', position: 'bottom-right' },
];

const POSITION_CLASSES: Record<string, string> = {
  'top-left': 'top-20 left-4',
  'top-center': 'top-20 left-1/2 -translate-x-1/2',
  'top-right': 'top-20 right-4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-20 left-4',
  'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-20 right-4',
};

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'done'; } catch { return false; }
  });

  useEffect(() => {
    if (dismissed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDismissed(true); try { localStorage.setItem(STORAGE_KEY, 'done'); } catch {} }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dismissed]);

  if (dismissed || step >= STEPS.length) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" onClick={() => { setDismissed(true); try { localStorage.setItem(STORAGE_KEY, 'done'); } catch {} }} />
      {/* Tooltip */}
      <div className={`absolute ${POSITION_CLASSES[current.position]} max-w-sm w-full mx-4 pointer-events-auto z-10`}>
        <div className="bg-slate-900 border border-[#F38020]/50 rounded-xl p-4 shadow-2xl shadow-[#F38020]/10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#F38020]">{current.title}</h3>
            <span className="text-[9px] text-slate-500">{step + 1}/{STEPS.length}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">{current.text}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setDismissed(true); try { localStorage.setItem(STORAGE_KEY, 'done'); } catch {} }}
              className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              Skip tour
            </button>
            <div className="flex gap-2">
              {step > 0 && (
                <button onClick={() => setStep((s) => s - 1)} className="text-[10px] px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all">
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (isLast) { setDismissed(true); try { localStorage.setItem(STORAGE_KEY, 'done'); } catch {} }
                  else setStep((s) => s + 1);
                }}
                className="text-[10px] px-3 py-1 rounded bg-[#F38020]/20 border border-[#F38020]/40 text-[#F38020] font-semibold hover:bg-[#F38020]/30 transition-all"
              >
                {isLast ? 'Get Started!' : 'Next'}
              </button>
            </div>
          </div>
          {/* Progress dots */}
          <div className="flex justify-center gap-1 mt-3">
            {STEPS.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === step ? 'bg-[#F38020]' : i < step ? 'bg-[#F38020]/40' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
