// KeyboardShortcuts — ? key toggles an overlay showing all keyboard shortcuts.
import { useState, useEffect } from 'react';

const SHORTCUTS = [
  { key: '?', desc: 'Toggle this overlay' },
  { key: 'M', desc: 'Mute/unmute sound' },
  { key: 'Ctrl+Shift+P', desc: 'Performance dashboard' },
  { key: 'Ctrl+Z', desc: 'Undo terrain edit (DM)' },
  { key: 'Ctrl+Shift+Z', desc: 'Redo terrain edit (DM)' },
  { key: 'Escape', desc: 'Cancel AoE targeting / close dialogs' },
  { key: '+/-', desc: 'Zoom battle map in/out' },
  { key: 'Alt+Drag', desc: 'Pan battle map' },
  { key: 'Enter', desc: 'Send chat message / advance wizard step' },
  { key: 'Tab', desc: 'Cycle between narration/map/shop views' },
];

export default function KeyboardShortcuts() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.altKey) {
        // Don't trigger when typing in an input/textarea
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        e.preventDefault();
        setVisible((v) => !v);
      }
      if (e.key === 'Escape' && visible) setVisible(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setVisible(false)}>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-200">Keyboard Shortcuts</h3>
          <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-slate-300 text-lg">&times;</button>
        </div>
        <div className="space-y-1.5">
          {SHORTCUTS.map((s) => (
            <div key={s.key} className="flex items-center justify-between">
              <kbd className="text-[10px] font-mono bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-amber-400">{s.key}</kbd>
              <span className="text-[11px] text-slate-400">{s.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-slate-600 mt-3 text-center">Press ? to toggle · Escape to close</p>
      </div>
    </div>
  );
}
