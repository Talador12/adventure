// PluginManager — UI for viewing and toggling loaded plugins.
// Shows in the DM sidebar (Notes tab). Lists registered plugins with toggle.
import { useState, useEffect } from 'react';
import { getPlugins, registerPlugin, unregisterPlugin, type AdventurePlugin } from '../../lib/plugins';
import critTracker from '../../plugins/critTracker';

const BUILT_IN_PLUGINS: AdventurePlugin[] = [critTracker];

export default function PluginManager() {
  const [, refresh] = useState(0);
  const plugins = getPlugins();

  // Auto-register built-in plugins on first render
  useEffect(() => {
    for (const p of BUILT_IN_PLUGINS) {
      if (!getPlugins().some((existing) => existing.id === p.id)) {
        registerPlugin(p);
        refresh((n) => n + 1);
      }
    }
  }, []);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Plugins</label>
        <span className="text-[8px] text-slate-600">{plugins.length} loaded</span>
      </div>
      {plugins.length === 0 && (
        <p className="text-[8px] text-slate-700 italic">No plugins loaded. Use window.__ADVENTURE_PLUGINS__.register() to add one.</p>
      )}
      {plugins.map((p) => (
        <div key={p.id} className="flex items-center justify-between px-2 py-1 rounded bg-slate-800/30 border border-slate-800/50">
          <div className="min-w-0">
            <div className="text-[9px] text-slate-300 font-semibold truncate">{p.name} <span className="text-slate-600">{p.version || ''}</span></div>
            {p.description && <div className="text-[7px] text-slate-600 truncate">{p.description}</div>}
          </div>
          <button
            onClick={() => { unregisterPlugin(p.id); refresh((n) => n + 1); }}
            className="text-[8px] text-red-700 hover:text-red-400 shrink-0 ml-2"
          >
            Unload
          </button>
        </div>
      ))}
    </div>
  );
}
