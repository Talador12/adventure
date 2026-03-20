// Campaign calendar — track in-world dates, events, and long rests.
// Uses a generic fantasy calendar (30-day months, 12 months).

import { useState, useCallback } from 'react';

export interface CalendarEvent {
  id: string;
  day: number;     // absolute day number (day 1 = campaign start)
  label: string;
  type: 'event' | 'rest' | 'combat' | 'travel' | 'milestone';
  color?: string;
}

export interface CalendarState {
  currentDay: number;
  events: CalendarEvent[];
  monthNames?: string[];
}

interface Props {
  state: CalendarState;
  onUpdate: (state: CalendarState) => void;
  canEdit?: boolean;
}

const DEFAULT_MONTHS = ['Deepwinter', 'Claw of Winter', 'Claw of Sunsets', 'The Melting', 'Greengrass', 'Summertide', 'Highsun', 'Harvesting', 'Leafall', 'Rotting', 'Feast of the Moon', 'Nightal'];

const EVENT_ICONS: Record<CalendarEvent['type'], string> = {
  event: '📜', rest: '🏕️', combat: '⚔️', travel: '🗺️', milestone: '🏆',
};

const EVENT_COLORS: Record<CalendarEvent['type'], string> = {
  event: 'border-amber-600/40', rest: 'border-emerald-600/40', combat: 'border-red-600/40', travel: 'border-sky-600/40', milestone: 'border-violet-600/40',
};

export default function CampaignCalendar({ state, onUpdate, canEdit = true }: Props) {
  const { currentDay, events, monthNames } = state;
  const months = monthNames || DEFAULT_MONTHS;

  const [viewMonth, setViewMonth] = useState(Math.floor((currentDay - 1) / 30));

  const currentMonth = Math.floor((currentDay - 1) / 30);
  const currentDayOfMonth = ((currentDay - 1) % 30) + 1;

  const advanceDay = useCallback((days = 1) => {
    onUpdate({ ...state, currentDay: state.currentDay + days });
  }, [state, onUpdate]);

  const addEvent = useCallback((type: CalendarEvent['type']) => {
    const label = prompt(`${type} on Day ${currentDay}:`);
    if (!label?.trim()) return;
    const event: CalendarEvent = { id: crypto.randomUUID().slice(0, 8), day: currentDay, label: label.trim(), type };
    onUpdate({ ...state, events: [...events, event] });
  }, [state, currentDay, events, onUpdate]);

  const longRest = useCallback(() => {
    onUpdate({
      ...state,
      currentDay: state.currentDay + 1,
      events: [...events, { id: crypto.randomUUID().slice(0, 8), day: currentDay, label: 'Long Rest', type: 'rest' }],
    });
  }, [state, currentDay, events, onUpdate]);

  // Days in current view month
  const monthStart = viewMonth * 30 + 1;
  const monthEnd = monthStart + 29;
  const monthEvents = events.filter((e) => e.day >= monthStart && e.day <= monthEnd);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with month navigation */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 shrink-0">
        <button onClick={() => setViewMonth(Math.max(0, viewMonth - 1))} className="text-slate-500 hover:text-slate-300 text-xs">◀</button>
        <div className="text-center">
          <span className="text-[11px] font-bold text-amber-400">{months[viewMonth % 12]}</span>
          <span className="text-[9px] text-slate-500 ml-1.5">Year {Math.floor(viewMonth / 12) + 1}</span>
        </div>
        <button onClick={() => setViewMonth(viewMonth + 1)} className="text-slate-500 hover:text-slate-300 text-xs">▶</button>
      </div>

      {/* Current day display */}
      <div className="px-3 py-2 bg-slate-800/30 border-b border-slate-800/50 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400">Day</span>
            <span className="text-lg font-black text-[#F38020] ml-1">{currentDay}</span>
            <span className="text-[9px] text-slate-500 ml-2">{months[currentMonth % 12]} {currentDayOfMonth}</span>
          </div>
          {canEdit && (
            <div className="flex gap-1">
              <button onClick={() => advanceDay(1)} className="text-[8px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 font-semibold" title="Advance 1 day">+1 Day</button>
              <button onClick={longRest} className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 hover:bg-emerald-900/60 font-semibold" title="Long rest (advance 1 day + log event)">🏕️ Rest</button>
            </div>
          )}
        </div>
      </div>

      {/* Calendar grid (6 rows × 5 cols = 30 days) */}
      <div className="grid grid-cols-6 gap-px p-1.5 flex-1 min-h-0 overflow-y-auto">
        {Array.from({ length: 30 }, (_, i) => {
          const day = monthStart + i;
          const isToday = day === currentDay;
          const isPast = day < currentDay;
          const dayEvents = monthEvents.filter((e) => e.day === day);
          return (
            <div
              key={i}
              className={`relative p-0.5 rounded text-center min-h-[28px] transition-all ${
                isToday ? 'bg-[#F38020]/20 ring-1 ring-[#F38020]/50' : isPast ? 'bg-slate-800/20' : 'bg-slate-800/5 hover:bg-slate-800/20'
              }`}
            >
              <span className={`text-[8px] font-mono ${isToday ? 'text-[#F38020] font-bold' : isPast ? 'text-slate-600' : 'text-slate-400'}`}>{i + 1}</span>
              {dayEvents.length > 0 && (
                <div className="flex flex-wrap gap-px justify-center mt-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span key={e.id} className="text-[6px] leading-none" title={e.label}>{EVENT_ICONS[e.type]}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Event buttons + recent events */}
      <div className="border-t border-slate-800/50 px-3 py-1.5 shrink-0">
        {canEdit && (
          <div className="flex gap-1 mb-1.5">
            {(Object.keys(EVENT_ICONS) as CalendarEvent['type'][]).map((type) => (
              <button key={type} onClick={() => addEvent(type)} className="text-[7px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-slate-200 capitalize" title={`Add ${type} event`}>
                {EVENT_ICONS[type]} {type}
              </button>
            ))}
          </div>
        )}
        <div className="space-y-0.5 max-h-16 overflow-y-auto">
          {events.slice(-5).reverse().map((e) => (
            <div key={e.id} className={`text-[8px] px-1.5 py-0.5 rounded border bg-slate-800/20 ${EVENT_COLORS[e.type]}`}>
              <span className="text-slate-500">Day {e.day}</span> {EVENT_ICONS[e.type]} <span className="text-slate-300">{e.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
