// SpellTemplates — save/load custom AoE spell templates for quick reuse.
// Stored in localStorage per campaign. DM can name, save, and apply templates.
import { useState, useEffect, useCallback } from 'react';

export type AoEShape = 'circle' | 'cone' | 'line' | 'cube';

export interface SpellTemplate {
  id: string;
  name: string;
  shape: AoEShape;
  radiusCells: number;
  color: string;
  createdAt: number;
}

interface SpellTemplatesProps {
  roomId: string;
  onApply: (template: SpellTemplate) => void;
}

const SHAPES: { id: AoEShape; label: string }[] = [
  { id: 'circle', label: 'Circle' },
  { id: 'cone', label: 'Cone' },
  { id: 'line', label: 'Line' },
  { id: 'cube', label: 'Cube' },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function SpellTemplates({ roomId, onApply }: SpellTemplatesProps) {
  const storageKey = `adventure:spell-templates:${roomId}`;
  const [templates, setTemplates] = useState<SpellTemplate[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [shape, setShape] = useState<AoEShape>('circle');
  const [radius, setRadius] = useState(3);
  const [color, setColor] = useState('#ef4444');

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(templates)); } catch { /* full */ }
  }, [templates, storageKey]);

  const add = useCallback(() => {
    if (!name.trim()) return;
    setTemplates((prev) => [...prev, {
      id: crypto.randomUUID().slice(0, 8),
      name: name.trim(),
      shape,
      radiusCells: radius,
      color,
      createdAt: Date.now(),
    }]);
    setName(''); setShowAdd(false);
  }, [name, shape, radius, color]);

  const remove = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Spell Templates</label>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className={`text-[9px] px-2 py-0.5 rounded border font-semibold transition-all ${
            showAdd ? 'border-purple-600/50 bg-purple-900/20 text-purple-400' : 'border-slate-700 text-slate-500 hover:text-purple-400'
          }`}
        >
          {showAdd ? 'Cancel' : '+ New'}
        </button>
      </div>

      {showAdd && (
        <div className="space-y-1.5 p-2 rounded-lg border border-slate-800 bg-slate-900/40">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Template name..."
            className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 placeholder:text-slate-600 focus:border-purple-600 focus:outline-none"
            onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
          />
          <div className="flex gap-1">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                onClick={() => setShape(s.id)}
                className={`text-[9px] px-2 py-0.5 rounded border transition-all ${
                  shape === s.id ? 'border-purple-500/50 bg-purple-900/20 text-purple-400' : 'border-slate-700 text-slate-500'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-500">Radius:</span>
            <input
              type="range"
              min={1} max={8} value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="flex-1 h-1 accent-purple-500"
            />
            <span className="text-[9px] text-slate-400 w-8">{radius * 5}ft</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] text-slate-500">Color:</span>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-4 h-4 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={add}
            disabled={!name.trim()}
            className="w-full py-1 bg-purple-700/40 hover:bg-purple-700/60 disabled:opacity-30 border border-purple-600/40 text-purple-300 text-[10px] font-semibold rounded transition-all"
          >
            Save Template
          </button>
        </div>
      )}

      {templates.length === 0 && !showAdd && (
        <p className="text-[9px] text-slate-700 italic">No templates saved. Create one to quickly reuse AoE shapes.</p>
      )}

      <div className="space-y-1">
        {templates.map((t) => (
          <div key={t.id} className="flex items-center gap-2 px-2 py-1 rounded bg-slate-800/30 border border-slate-800/50">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-slate-300 font-medium truncate block">{t.name}</span>
              <span className="text-[8px] text-slate-600">{t.shape} · {t.radiusCells * 5}ft</span>
            </div>
            <button
              onClick={() => onApply(t)}
              className="text-[8px] px-1.5 py-0.5 rounded bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700/30 text-purple-400 font-semibold transition-all"
            >
              Apply
            </button>
            <button onClick={() => remove(t.id)} className="text-[8px] text-red-700 hover:text-red-400">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
