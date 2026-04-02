// QuestBranching — presents player choice points during quests.
// DM triggers a branch point, players (or DM) pick an option, consequences apply.
import { useState } from 'react';
import type { QuestChoice, QuestOption } from '../../data/questBranching';
import { applyConsequences, BRANCHING_TEMPLATES } from '../../data/questBranching';

interface Props {
  activeChoice: QuestChoice | null;
  onChoose: (choice: QuestOption, questChoice: QuestChoice) => void;
  onDismiss: () => void;
  isDM: boolean;
  choices: QuestChoice[];  // all past choices for history
  onTriggerBranch?: (choice: QuestChoice) => void; // DM triggers a branch
}

export default function QuestBranching({ activeChoice, onChoose, onDismiss, isDM, choices, onTriggerBranch }: Props) {
  const [showHistory, setShowHistory] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <div className="space-y-2">
      {/* Active choice — the decision point */}
      {activeChoice && !activeChoice.madeChoice && (
        <div className="rounded-lg border border-amber-600/40 bg-amber-900/20 p-3 animate-in fade-in">
          <div className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider mb-1">Decision Point</div>
          <div className="text-sm text-amber-200 font-medium mb-3">{activeChoice.prompt}</div>
          <div className="space-y-2">
            {activeChoice.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onChoose(opt, activeChoice)}
                className="w-full text-left px-3 py-2 rounded border border-amber-600/30 bg-amber-950/30 hover:bg-amber-900/40 transition-all group"
              >
                <div className="text-[11px] font-semibold text-amber-300 group-hover:text-amber-200">{opt.label}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{opt.description}</div>
                {opt.consequences.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {opt.consequences.map((c, i) => (
                      <span key={i} className={`text-[8px] px-1 py-0 rounded ${
                        c.type === 'gold_change' ? (c.value && c.value > 0 ? 'text-amber-400 bg-amber-900/30' : 'text-red-400 bg-red-900/30')
                        : c.type === 'faction_change' ? 'text-blue-400 bg-blue-900/30'
                        : c.type === 'unlock_quest' ? 'text-emerald-400 bg-emerald-900/30'
                        : c.type === 'npc_disposition' ? 'text-purple-400 bg-purple-900/30'
                        : 'text-slate-400 bg-slate-800/30'
                      }`}>
                        {c.type === 'gold_change' ? `${c.value && c.value > 0 ? '+' : ''}${c.value}gp`
                         : c.type === 'faction_change' ? `${c.factionId} ${c.value && c.value > 0 ? '↑' : '↓'}`
                         : c.type === 'unlock_quest' ? '🔓 quest'
                         : c.type === 'lock_quest' ? '🔒 quest'
                         : c.type === 'npc_disposition' ? `${c.npcName} ${c.value && c.value > 0 ? '↑' : '↓'}`
                         : ''}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
          <button onClick={onDismiss} className="mt-2 text-[9px] text-slate-500 hover:text-slate-400">Dismiss</button>
        </div>
      )}

      {/* DM: trigger a branch from templates */}
      {isDM && onTriggerBranch && !activeChoice && (
        <div>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="w-full text-[10px] py-1.5 rounded bg-amber-900/20 border border-amber-600/30 text-amber-400 font-semibold hover:bg-amber-800/30 transition-all"
          >
            {showTemplates ? '▼' : '▶'} Quest Decision Points
          </button>
          {showTemplates && (
            <div className="mt-1 space-y-1">
              {BRANCHING_TEMPLATES.filter((t) => !choices.some((c) => c.id === t.id)).map((t) => (
                <button
                  key={t.id}
                  onClick={() => onTriggerBranch(t)}
                  className="w-full text-left px-2 py-1.5 rounded bg-slate-800/50 border border-slate-700/30 hover:border-amber-600/40 transition-all"
                >
                  <div className="text-[10px] text-slate-300 truncate">{t.prompt}</div>
                  <div className="text-[8px] text-slate-500">{t.options.length} options</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Choice history */}
      {choices.length > 0 && (
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-[9px] text-slate-500 hover:text-slate-400"
          >
            {showHistory ? '▼' : '▶'} Past Decisions ({choices.filter((c) => c.madeChoice).length})
          </button>
          {showHistory && (
            <div className="mt-1 space-y-1 max-h-32 overflow-y-auto">
              {choices.filter((c) => c.madeChoice).map((c) => {
                const chosen = c.options.find((o) => o.id === c.madeChoice);
                return (
                  <div key={c.id} className="px-2 py-1 rounded bg-slate-800/30 border border-slate-700/20 text-[9px]">
                    <div className="text-slate-400 truncate">{c.prompt}</div>
                    <div className="text-amber-400 mt-0.5">→ {chosen?.label || 'Unknown'}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
