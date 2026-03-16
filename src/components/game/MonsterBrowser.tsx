// MonsterBrowser — searchable/filterable monster compendium for the DM.
// Browse SRD monsters by name, type, CR, and environment. Spawn directly into combat.
import { useState, useMemo } from 'react';
import { searchMonsters, formatCR, TYPE_ICONS, MONSTER_TYPES, MONSTER_ENVIRONMENTS, type Monster, type MonsterType, type Environment } from '../../data/monsters';

interface MonsterBrowserProps {
  onSpawn: (monster: Monster, count: number) => void;
  onClose: () => void;
}

export default function MonsterBrowser({ onSpawn, onClose }: MonsterBrowserProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MonsterType | ''>('');
  const [envFilter, setEnvFilter] = useState<Environment | ''>('');
  const [maxCR, setMaxCR] = useState<number>(10);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [spawnCounts, setSpawnCounts] = useState<Record<string, number>>({});

  const results = useMemo(() => searchMonsters({
    search: search || undefined,
    type: typeFilter || undefined,
    environment: envFilter || undefined,
    maxCR,
  }), [search, typeFilter, envFilter, maxCR]);

  const getCount = (name: string) => spawnCounts[name] || 1;
  const setCount = (name: string, n: number) => setSpawnCounts((prev) => ({ ...prev, [name]: Math.max(1, Math.min(8, n)) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 shrink-0">
          <h2 className="text-lg font-bold text-amber-400">Monster Manual</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-xl leading-none">&times;</button>
        </div>

        {/* Filters */}
        <div className="px-5 py-3 border-b border-slate-800 space-y-2 shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search monsters..."
            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-amber-500/50 input-glow transition-all"
          />
          <div className="flex gap-2 flex-wrap">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as MonsterType | '')}
              className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 outline-none focus:border-amber-500/50"
            >
              <option value="">All Types</option>
              {MONSTER_TYPES.map((t) => (
                <option key={t} value={t}>{TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
            <select
              value={envFilter}
              onChange={(e) => setEnvFilter(e.target.value as Environment | '')}
              className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 outline-none focus:border-amber-500/50"
            >
              <option value="">All Environments</option>
              {MONSTER_ENVIRONMENTS.map((e) => (
                <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
              ))}
            </select>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Max CR:</span>
              <input
                type="range"
                min={0}
                max={10}
                step={0.25}
                value={maxCR}
                onChange={(e) => setMaxCR(Number(e.target.value))}
                className="w-20 accent-amber-500"
              />
              <span className="font-mono text-amber-400 min-w-[2rem] text-right">{formatCR(maxCR)}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-600">{results.length} monster{results.length !== 1 ? 's' : ''}</div>
        </div>

        {/* Monster list */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-3xl mb-2">🐉</span>
              <p className="text-sm text-slate-500">No monsters match your filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {results.map((m) => {
                const isExpanded = expandedId === m.name;
                const count = getCount(m.name);
                return (
                  <div key={m.name} className="px-5 py-2.5 hover:bg-slate-800/40 transition-colors">
                    {/* Summary row */}
                    <button
                      className="w-full flex items-center gap-3 text-left"
                      onClick={() => setExpandedId(isExpanded ? null : m.name)}
                    >
                      <span className="text-lg shrink-0">{TYPE_ICONS[m.type]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-200 truncate">{m.name}</span>
                          <span className="text-[10px] text-slate-500 shrink-0">{m.size}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          CR {formatCR(m.cr)} · {m.type} · AC {m.ac} · HP {m.hp[0]}{m.hp[1] !== m.hp[0] ? `–${m.hp[1]}` : ''} · {m.xpValue} XP
                        </div>
                      </div>
                      <span className={`text-slate-600 text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-2 ml-9 space-y-2 animate-fade-in-up">
                        <p className="text-xs text-slate-400 italic leading-relaxed">{m.description}</p>

                        {/* Stats row */}
                        <div className="flex gap-3 text-[10px]">
                          <span className="text-slate-500">Atk <span className="text-slate-300 font-mono">+{m.attackBonus}</span></span>
                          <span className="text-slate-500">Dmg <span className="text-slate-300 font-mono">{m.damageDie}+{m.damageBonus}</span></span>
                          <span className="text-slate-500">DEX <span className="text-slate-300 font-mono">{m.dexMod >= 0 ? '+' : ''}{m.dexMod}</span></span>
                          <span className="text-slate-500">Speed <span className="text-slate-300 font-mono">{m.speed * 5}ft</span></span>
                        </div>

                        {/* Environments */}
                        <div className="flex flex-wrap gap-1">
                          {m.environments.map((env) => (
                            <span key={env} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-slate-400 capitalize">{env}</span>
                          ))}
                        </div>

                        {/* Abilities */}
                        {m.abilities.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-500 font-semibold uppercase">Abilities</span>
                            {m.abilities.map((a, i) => (
                              <div key={i} className="text-[10px] px-2 py-1 rounded bg-red-950/20 border border-red-900/30">
                                <span className="font-semibold text-red-300">{a.name}</span>
                                {a.damageDie && <span className="text-slate-500 ml-1">({a.damageDie})</span>}
                                {a.cooldown > 0 && <span className="text-slate-600 ml-1">CD:{a.cooldown}</span>}
                                <span className="text-slate-400 ml-1.5">{a.description}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Spawn controls */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex items-center gap-1 bg-slate-800 rounded-lg border border-slate-700 px-1">
                            <button onClick={() => setCount(m.name, count - 1)} className="w-6 h-6 text-xs text-slate-400 hover:text-white transition-colors">−</button>
                            <span className="text-xs font-mono text-slate-300 w-4 text-center">{count}</span>
                            <button onClick={() => setCount(m.name, count + 1)} className="w-6 h-6 text-xs text-slate-400 hover:text-white transition-colors">+</button>
                          </div>
                          <button
                            onClick={() => onSpawn(m, count)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/30 hover:border-red-500/50 transition-all active:scale-95"
                          >
                            Spawn {count > 1 ? `${count}×` : ''}{m.name}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
