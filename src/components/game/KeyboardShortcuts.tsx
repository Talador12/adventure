// KeyboardShortcuts — ? key toggles an overlay showing all keyboard shortcuts.
import { useState, useEffect } from 'react';

const SECTIONS: { title: string; shortcuts: { key: string; desc: string }[] }[] = [
  {
    title: 'General',
    shortcuts: [
      { key: '?', desc: 'Toggle this overlay' },
      { key: 'M', desc: 'Mute/unmute sound' },
      { key: 'D', desc: 'Toggle DM sidebar (DM only)' },
      { key: 'C', desc: 'Toggle character sheet' },
      { key: 'N', desc: 'Toggle notes panel' },
      { key: 'Q', desc: 'Toggle quest log' },
      { key: 'L', desc: 'Toggle combat log' },
      { key: 'R', desc: 'Rules reference' },
      { key: 'B', desc: 'Monster browser (DM only)' },
      { key: 'Escape', desc: 'Cancel AoE / close dialogs' },
    ],
  },
  {
    title: 'Views',
    shortcuts: [
      { key: '1', desc: 'Narration' },
      { key: '2', desc: 'Battle Map' },
      { key: '3', desc: 'Shop (out of combat)' },
      { key: '4 / J', desc: 'Journal' },
      { key: '5', desc: 'Loot' },
      { key: '6', desc: 'Encounters' },
      { key: '7', desc: 'NPCs' },
      { key: '8', desc: 'Dice Stats' },
      { key: '9', desc: 'Timeline' },
      { key: '0', desc: 'Achievements' },
    ],
  },
  {
    title: 'Combat (your turn)',
    shortcuts: [
      { key: 'A', desc: 'Quick attack' },
      { key: 'E', desc: 'End turn' },
      { key: 'P', desc: 'Use potion' },
      { key: 'G', desc: 'Dodge' },
      { key: 'H', desc: 'Dash' },
      { key: 'F', desc: 'Class ability' },
    ],
  },
  {
    title: 'Battle Map',
    shortcuts: [
      { key: '+/−', desc: 'Zoom in/out' },
      { key: 'Alt+Drag', desc: 'Pan map' },
      { key: 'Ctrl+Z', desc: 'Undo terrain (DM)' },
      { key: 'Ctrl+Shift+Z', desc: 'Redo terrain (DM)' },
    ],
  },
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
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-200">Keyboard Shortcuts</h3>
          <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-slate-300 text-lg">&times;</button>
        </div>
        <div className="space-y-4">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-bold text-[#F38020] uppercase tracking-wider mb-1.5">{section.title}</h4>
              <div className="space-y-1">
                {section.shortcuts.map((s) => (
                  <div key={s.key} className="flex items-center justify-between">
                    <kbd className="text-[10px] font-mono bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-amber-400 min-w-[56px] text-center">{s.key}</kbd>
                    <span className="text-[11px] text-slate-400">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-slate-600 mt-3 text-center">Press ? to toggle · Escape to close</p>
      </div>
    </div>
  );
}
