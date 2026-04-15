// KeyboardShortcuts - modal overlay showing all keyboard shortcuts by category.
// Controlled via visible/onClose props from Game.tsx (? key or toolbar button).

const SECTIONS: { title: string; shortcuts: { key: string; desc: string }[] }[] = [
  {
    title: 'Navigation',
    shortcuts: [
      { key: '?', desc: 'Show this help panel' },
      { key: 'Escape', desc: 'Close modal / deselect' },
      { key: '1', desc: 'Narration view' },
      { key: '2', desc: 'Battle Map view' },
      { key: '3', desc: 'Shop (out of combat)' },
      { key: '4 / J', desc: 'Session Journal' },
      { key: '5', desc: 'Loot tracker' },
      { key: '6', desc: 'Encounter log' },
      { key: '7', desc: 'NPC tracker' },
      { key: '8', desc: 'Dice Stats' },
      { key: '9', desc: 'Timeline' },
      { key: '0', desc: 'Achievements' },
      { key: 'W', desc: 'Campaign Wiki' },
      { key: 'I', desc: 'Open inventory (character sheet)' },
      { key: 'Tab', desc: 'Cycle through units (map)' },
    ],
  },
  {
    title: 'Combat',
    shortcuts: [
      { key: 'A', desc: 'Quick attack' },
      { key: 'E', desc: 'End turn' },
      { key: 'Space', desc: 'End turn (alias)' },
      { key: 'P', desc: 'Use potion' },
      { key: 'G', desc: 'Dodge (+2 AC)' },
      { key: 'H', desc: 'Dash (double movement)' },
      { key: 'F', desc: 'Class ability' },
      { key: '1-9', desc: 'Quick spell cast (in spell list)' },
    ],
  },
  {
    title: 'Map',
    shortcuts: [
      { key: 'M', desc: 'Toggle minimap' },
      { key: '+/-', desc: 'Zoom in/out' },
      { key: 'Alt+Drag', desc: 'Pan map' },
      { key: 'Ctrl+Z', desc: 'Undo terrain (DM)' },
      { key: 'Ctrl+Shift+Z', desc: 'Redo terrain (DM)' },
    ],
  },
  {
    title: 'Chat',
    shortcuts: [
      { key: 'C', desc: 'Open chat / character sheet' },
      { key: 'N', desc: 'Toggle notes panel' },
      { key: 'L', desc: 'Toggle combat log' },
    ],
  },
  {
    title: 'Dice',
    shortcuts: [
      { key: 'R', desc: 'Open dice roller / rules ref' },
      { key: 'B', desc: 'Monster browser (DM only)' },
      { key: 'D', desc: 'Toggle DM sidebar (DM only)' },
      { key: 'Q', desc: 'Toggle quest tracker' },
    ],
  },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function KeyboardShortcuts({ visible, onClose }: Props) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-lg leading-none">&times;</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-bold text-[#F38020] uppercase tracking-wider mb-1.5">{section.title}</h4>
              <div className="space-y-0.5">
                {section.shortcuts.map((s) => (
                  <div key={s.key} className="flex items-center justify-between gap-2">
                    <kbd className="text-[10px] font-mono bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-amber-400 min-w-[48px] text-center shrink-0">{s.key}</kbd>
                    <span className="text-[11px] text-slate-400 text-right">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-slate-600 mt-3 text-center">Press ? to toggle - Escape to close</p>
      </div>
    </div>
  );
}
