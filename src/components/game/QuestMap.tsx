// Quest tracker with world map pins — visual overview of active + completed quests.
// Quests with mapX/mapY coordinates appear as clickable pins on a parchment-styled world map.

import { useState } from 'react';
import type { Quest } from '../../types/game';

interface Props {
  quests: Quest[];
  onAddQuest?: (quest: Quest) => void;
  onToggleComplete?: (questId: string) => void;
  onRemoveQuest?: (questId: string) => void;
}

const PRIORITY_COLORS: Record<string, { bg: string; border: string; text: string; pin: string }> = {
  main: { bg: 'bg-amber-900/30', border: 'border-amber-600/50', text: 'text-amber-300', pin: '#f59e0b' },
  side: { bg: 'bg-sky-900/30', border: 'border-sky-600/50', text: 'text-sky-300', pin: '#38bdf8' },
  personal: { bg: 'bg-violet-900/30', border: 'border-violet-600/50', text: 'text-violet-300', pin: '#a78bfa' },
};

export default function QuestMap({ quests, onAddQuest, onToggleComplete, onRemoveQuest }: Props) {
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);

  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);
  const mappedQuests = quests.filter((q) => q.mapX !== undefined && q.mapY !== undefined);
  const selected = quests.find((q) => q.id === selectedQuest);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* World map area */}
      <div className="relative flex-1 min-h-[200px] bg-gradient-to-br from-amber-950/20 via-slate-900 to-emerald-950/20 border-b border-slate-800 overflow-hidden">
        {/* Parchment texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(217,119,6,0.3), transparent 60%), radial-gradient(circle at 70% 60%, rgba(16,185,129,0.2), transparent 50%)' }} />

        {/* Compass rose */}
        <div className="absolute top-2 right-2 text-[8px] text-slate-600 font-semibold">
          <div className="text-center">N</div>
          <div className="flex gap-2"><span>W</span><span className="text-amber-800">✦</span><span>E</span></div>
          <div className="text-center">S</div>
        </div>

        {/* Quest pins */}
        {mappedQuests.map((q) => {
          const colors = PRIORITY_COLORS[q.priority || 'side'];
          const isSelected = selectedQuest === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setSelectedQuest(isSelected ? null : q.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-full transition-all ${isSelected ? 'scale-125 z-20' : 'z-10 hover:scale-110'}`}
              style={{ left: `${q.mapX}%`, top: `${q.mapY}%` }}
              title={q.title}
            >
              {/* Pin marker */}
              <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                <path d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z" fill={q.completed ? '#475569' : colors.pin} />
                <circle cx="10" cy="10" r="4" fill="white" opacity="0.9" />
              </svg>
              {/* Location label */}
              {q.location && (
                <span className={`absolute left-1/2 -translate-x-1/2 top-full mt-0.5 text-[7px] font-semibold whitespace-nowrap ${q.completed ? 'text-slate-600 line-through' : colors.text}`}>
                  {q.location}
                </span>
              )}
            </button>
          );
        })}

        {/* Selected quest detail popup */}
        {selected && (
          <div className="absolute bottom-2 left-2 right-2 z-30 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-3 shadow-2xl animate-fade-in-up">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className={`text-xs font-bold ${selected.completed ? 'text-slate-500 line-through' : 'text-white'}`}>{selected.title}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{selected.description}</div>
                {selected.giver && <div className="text-[8px] text-slate-500 mt-1">Quest giver: {selected.giver}</div>}
                {selected.location && <div className="text-[8px] text-slate-500">Location: {selected.location}</div>}
              </div>
              <div className="flex gap-1 shrink-0">
                {onToggleComplete && (
                  <button onClick={() => onToggleComplete(selected.id)} className={`text-[8px] px-1.5 py-0.5 rounded font-semibold ${selected.completed ? 'text-amber-400 hover:bg-amber-900/20' : 'text-emerald-400 hover:bg-emerald-900/20'}`}>
                    {selected.completed ? 'Reopen' : 'Complete'}
                  </button>
                )}
                <button onClick={() => setSelectedQuest(null)} className="text-slate-500 hover:text-slate-300 text-xs">×</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quest list panel */}
      <div className="shrink-0 max-h-40 overflow-y-auto">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/50">
          <button onClick={() => setShowList(!showList)} className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            Quests ({activeQuests.length} active, {completedQuests.length} done)
          </button>
          {onAddQuest && (
            <button
              onClick={() => {
                const title = prompt('Quest title:');
                if (!title?.trim()) return;
                const desc = prompt('Description:') || '';
                const location = prompt('Location (optional):') || undefined;
                const priority = (prompt('Priority (main/side/personal):', 'side') || 'side') as Quest['priority'];
                const giver = prompt('Quest giver NPC (optional):') || undefined;
                const mapX = location ? Math.round(Math.random() * 80 + 10) : undefined;
                const mapY = location ? Math.round(Math.random() * 70 + 15) : undefined;
                onAddQuest({ id: crypto.randomUUID(), title: title.trim(), description: desc, completed: false, location, mapX, mapY, priority, giver });
              }}
              className="text-[8px] text-amber-400 hover:text-amber-300 font-semibold"
            >
              + Quest
            </button>
          )}
        </div>
        {showList && (
          <div className="p-1.5 space-y-0.5">
            {quests.length === 0 && <div className="text-[9px] text-slate-600 italic text-center py-2">No quests yet</div>}
            {quests.map((q) => {
              const colors = PRIORITY_COLORS[q.priority || 'side'];
              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuest(selectedQuest === q.id ? null : q.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[9px] transition-all ${selectedQuest === q.id ? `${colors.bg} ${colors.border} border` : 'hover:bg-slate-800/30 border border-transparent'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${q.completed ? 'bg-slate-600' : ''}`} style={{ backgroundColor: q.completed ? undefined : PRIORITY_COLORS[q.priority || 'side'].pin }} />
                  <span className={`truncate ${q.completed ? 'text-slate-600 line-through' : 'text-slate-200'}`}>{q.title}</span>
                  {q.location && <span className="text-[7px] text-slate-600 ml-auto shrink-0">{q.location}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
