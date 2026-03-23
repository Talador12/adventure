// SessionScheduler — plan next game night with a simple date/time picker.
// localStorage-backed per campaign. Shows countdown to next session.
// Renders in DMSidebar Notes tab.
import { useState, useEffect, useMemo } from 'react';

interface ScheduledSession {
  id: string;
  date: string; // ISO date string
  time: string; // HH:MM
  note: string;
}

interface SessionSchedulerProps {
  roomId: string;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Now!';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function SessionScheduler({ roomId }: SessionSchedulerProps) {
  const storageKey = `adventure:schedule:${roomId}`;
  const [sessions, setSessions] = useState<ScheduledSession[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [showAdd, setShowAdd] = useState(false);
  const [addDate, setAddDate] = useState('');
  const [addTime, setAddTime] = useState('19:00');
  const [addNote, setAddNote] = useState('');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(sessions)); } catch { /* full */ }
  }, [sessions, storageKey]);

  // Tick countdown every minute
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const upcoming = useMemo(() => {
    return sessions
      .map((s) => ({ ...s, ts: new Date(`${s.date}T${s.time}`).getTime() }))
      .filter((s) => s.ts > now - 3600000) // show sessions up to 1h past
      .sort((a, b) => a.ts - b.ts);
  }, [sessions, now]);

  const nextSession = upcoming[0];

  const addSession = () => {
    if (!addDate) return;
    setSessions((prev) => [...prev, {
      id: crypto.randomUUID().slice(0, 8),
      date: addDate,
      time: addTime,
      note: addNote.trim(),
    }]);
    setAddDate(''); setAddTime('19:00'); setAddNote(''); setShowAdd(false);
  };

  const removeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Session Schedule</label>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className={`text-[9px] px-2 py-0.5 rounded border font-semibold transition-all ${
            showAdd ? 'border-sky-600/50 bg-sky-900/20 text-sky-400' : 'border-slate-700 text-slate-500 hover:text-sky-400'
          }`}
        >
          {showAdd ? 'Cancel' : '+ Schedule'}
        </button>
      </div>

      {/* Next session countdown */}
      {nextSession && (
        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${
          nextSession.ts - now < 3600000 ? 'border-amber-700/40 bg-amber-950/20' : 'border-sky-800/40 bg-sky-950/20'
        }`}>
          <span className={`text-lg font-bold ${nextSession.ts - now < 3600000 ? 'text-amber-400 animate-pulse' : 'text-sky-400'}`}>
            {formatCountdown(nextSession.ts - now)}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-slate-300 font-medium">
              {formatDate(nextSession.date)} at {nextSession.time}
            </div>
            {nextSession.note && <div className="text-[9px] text-slate-500 truncate">{nextSession.note}</div>}
          </div>
        </div>
      )}

      {/* Add form */}
      {showAdd && (
        <div className="space-y-1.5 px-2 py-2 rounded-lg border border-slate-800 bg-slate-900/40">
          <div className="flex gap-2">
            <input
              type="date"
              value={addDate}
              onChange={(e) => setAddDate(e.target.value)}
              className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 focus:border-sky-600 focus:outline-none"
            />
            <input
              type="time"
              value={addTime}
              onChange={(e) => setAddTime(e.target.value)}
              className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 focus:border-sky-600 focus:outline-none"
            />
          </div>
          <input
            value={addNote}
            onChange={(e) => setAddNote(e.target.value)}
            placeholder="Note (optional)..."
            className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 placeholder:text-slate-600 focus:border-sky-600 focus:outline-none"
            onKeyDown={(e) => { if (e.key === 'Enter') addSession(); }}
          />
          <button
            onClick={addSession}
            disabled={!addDate}
            className="w-full py-1 bg-sky-700/40 hover:bg-sky-700/60 disabled:opacity-30 border border-sky-600/40 text-sky-300 text-[10px] font-semibold rounded transition-all"
          >
            Add Session
          </button>
        </div>
      )}

      {/* Upcoming sessions list */}
      {upcoming.length > (nextSession ? 1 : 0) && (
        <div className="space-y-1">
          {upcoming.slice(nextSession ? 1 : 0).map((s) => (
            <div key={s.id} className="flex items-center gap-2 px-2 py-1 rounded bg-slate-900/30 border border-slate-800/50">
              <span className="text-[9px] text-slate-500 font-mono">{formatCountdown(s.ts - now)}</span>
              <span className="text-[10px] text-slate-400 flex-1 truncate">{formatDate(s.date)} {s.time}{s.note ? ` — ${s.note}` : ''}</span>
              <button onClick={() => removeSession(s.id)} className="text-[9px] text-red-700 hover:text-red-400 transition-colors">x</button>
            </div>
          ))}
        </div>
      )}

      {sessions.length === 0 && !showAdd && (
        <div className="text-[9px] text-slate-700 italic">No sessions scheduled.</div>
      )}
    </div>
  );
}
