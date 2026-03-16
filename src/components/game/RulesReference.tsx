// RulesReference — quick D&D 5e rules lookup during play.
// Tabbed modal: Conditions, Actions, Spells, Mechanics.
import { useState, useMemo } from 'react';
import { CONDITION_EFFECTS, type ConditionType } from '../../types/game';
import { CONDITION_TOOLTIPS, COMBAT_ACTIONS, SPELL_SCHOOLS, ABILITY_SCORES, GAME_MECHANICS } from '../../data/rules';
import { SPELL_LIST } from '../../data/spells';

type Tab = 'conditions' | 'actions' | 'spells' | 'abilities' | 'mechanics';

const TABS: { id: Tab; label: string }[] = [
  { id: 'conditions', label: 'Conditions' },
  { id: 'actions', label: 'Actions' },
  { id: 'spells', label: 'Spells' },
  { id: 'abilities', label: 'Scores' },
  { id: 'mechanics', label: 'Rules' },
];

interface RulesReferenceProps {
  onClose: () => void;
}

export default function RulesReference({ onClose }: RulesReferenceProps) {
  const [tab, setTab] = useState<Tab>('conditions');
  const [search, setSearch] = useState('');

  const q = search.toLowerCase().trim();

  // Filtered spells by school for the spells tab
  const spellsBySchool = useMemo(() => {
    const grouped: Record<string, typeof SPELL_LIST> = {};
    for (const spell of SPELL_LIST) {
      if (q && !spell.name.toLowerCase().includes(q) && !spell.school.includes(q) && !spell.description.toLowerCase().includes(q)) continue;
      (grouped[spell.school] ??= []).push(spell);
    }
    return grouped;
  }, [q]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 shrink-0">
          <h2 className="text-lg font-bold text-amber-400">Quick Rules Reference</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-xl leading-none">&times;</button>
        </div>

        {/* Tab bar + search */}
        <div className="px-5 py-2 border-b border-slate-800 shrink-0 space-y-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setSearch(''); }}
                className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all whitespace-nowrap ${
                  tab === t.id
                    ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
                    : 'border-slate-700 text-slate-500 hover:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {(tab === 'spells' || tab === 'conditions' || tab === 'mechanics') && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tab}...`}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-amber-500/50 input-glow transition-all"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 py-3 space-y-2">
          {tab === 'conditions' && <ConditionsTab search={q} />}
          {tab === 'actions' && <ActionsTab />}
          {tab === 'spells' && <SpellsTab spellsBySchool={spellsBySchool} />}
          {tab === 'abilities' && <AbilitiesTab />}
          {tab === 'mechanics' && <MechanicsTab search={q} />}
        </div>

        <div className="px-5 py-2 border-t border-slate-800 shrink-0">
          <p className="text-[9px] text-slate-600 text-center">Press <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">R</kbd> to toggle &middot; Rules based on D&D 5e SRD</p>
        </div>
      </div>
    </div>
  );
}

// --- Tab content components ---

function ConditionsTab({ search }: { search: string }) {
  const conditions = Object.entries(CONDITION_EFFECTS) as [ConditionType, typeof CONDITION_EFFECTS[ConditionType]][];
  const filtered = search
    ? conditions.filter(([type]) => type.includes(search) || CONDITION_TOOLTIPS[type].toLowerCase().includes(search))
    : conditions;

  return (
    <>
      {filtered.length === 0 && <EmptySearch term={search} />}
      {filtered.map(([type, fx]) => (
        <div key={type} className="rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold capitalize ${fx.color}`}>{type}</span>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
              {fx.attackMod !== 0 && <span className={fx.attackMod > 0 ? 'text-green-400' : 'text-red-400'}>ATK {fx.attackMod > 0 ? '+' : ''}{fx.attackMod}</span>}
              {fx.acMod !== 0 && <span className={fx.acMod > 0 ? 'text-green-400' : 'text-red-400'}>AC {fx.acMod > 0 ? '+' : ''}{fx.acMod}</span>}
              {fx.saveMod !== 0 && <span className={fx.saveMod > 0 ? 'text-green-400' : 'text-red-400'}>SAVE {fx.saveMod > 0 ? '+' : ''}{fx.saveMod === -99 ? 'FAIL' : fx.saveMod}</span>}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">{CONDITION_TOOLTIPS[type]}</p>
        </div>
      ))}
    </>
  );
}

function ActionsTab() {
  return (
    <>
      {COMBAT_ACTIONS.map((action) => (
        <div key={action.name} className="rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm">{action.icon}</span>
            <span className={`text-xs font-bold ${action.color}`}>{action.name}</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">{action.description}</p>
        </div>
      ))}
    </>
  );
}

function SpellsTab({ spellsBySchool }: { spellsBySchool: Record<string, typeof SPELL_LIST> }) {
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);

  const schoolEntries = Object.entries(SPELL_SCHOOLS);
  const hasResults = Object.keys(spellsBySchool).length > 0;

  return (
    <>
      {!hasResults && <EmptySearch term="search" />}
      {schoolEntries.map(([key, info]) => {
        const spells = spellsBySchool[key];
        if (!spells) return null;
        const isExpanded = expandedSchool === key;
        return (
          <div key={key} className={`rounded-lg border px-3 py-2 transition-all ${info.color}`}>
            <button
              onClick={() => setExpandedSchool(isExpanded ? null : key)}
              className="w-full flex items-center justify-between text-left"
            >
              <div>
                <span className="text-xs font-bold">{info.name}</span>
                <span className="text-[9px] text-slate-500 ml-2">({spells.length} spell{spells.length !== 1 ? 's' : ''})</span>
              </div>
              <span className="text-[10px] text-slate-500">{isExpanded ? '▾' : '▸'}</span>
            </button>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{info.description}</p>
            {isExpanded && (
              <div className="mt-2 space-y-1 border-t border-slate-700/50 pt-2">
                {spells.map((spell) => (
                  <div key={spell.id} className="flex items-start gap-2">
                    <span className="text-[9px] text-slate-600 font-mono shrink-0 w-5 text-right">
                      {spell.level === 0 ? 'C' : `L${spell.level}`}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-slate-300">{spell.name}</span>
                      {spell.isConcentration && <span className="text-[8px] text-amber-500 ml-1">C</span>}
                      {spell.damage && <span className="text-[8px] text-red-400 ml-1">{spell.damage}</span>}
                      {spell.healAmount && <span className="text-[8px] text-green-400 ml-1">+{spell.healAmount}HP</span>}
                      <p className="text-[9px] text-slate-500 leading-relaxed">{spell.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function AbilitiesTab() {
  return (
    <>
      {ABILITY_SCORES.map((score) => (
        <div key={score.abbr} className="rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-bold text-amber-400 font-mono w-8">{score.abbr}</span>
            <span className="text-xs font-semibold text-slate-300">{score.name}</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">{score.description}</p>
        </div>
      ))}
    </>
  );
}

function MechanicsTab({ search }: { search: string }) {
  const filtered = search
    ? GAME_MECHANICS.filter((m) => m.name.toLowerCase().includes(search) || m.description.toLowerCase().includes(search))
    : GAME_MECHANICS;

  return (
    <>
      {filtered.length === 0 && <EmptySearch term={search} />}
      {filtered.map((mech) => (
        <div key={mech.name} className="rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2">
          <span className="text-xs font-bold text-emerald-400">{mech.name}</span>
          <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{mech.description}</p>
        </div>
      ))}
    </>
  );
}

function EmptySearch({ term }: { term: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <span className="text-2xl mb-2">📜</span>
      <p className="text-xs text-slate-500">No results for "{term}"</p>
    </div>
  );
}
