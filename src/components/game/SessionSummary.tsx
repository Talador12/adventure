// SessionSummary — end-of-session stats card.
// Shows combat count, damage dealt, kills, crits, rolls, and session duration.
// "The credits roll. The stats don't lie."
import { useState, useEffect, useRef } from 'react';

interface SessionSummaryProps {
  combatLog: string[];
  dmHistory: string[];
  characters: Array<{ name: string }>;
  sessionStartTime: number;
  visible: boolean;
  onDismiss: () => void;
}

export default function SessionSummary({ combatLog, dmHistory, characters, sessionStartTime, visible, onDismiss }: SessionSummaryProps) {
  if (!visible) return null;

  const duration = Math.floor((Date.now() - sessionStartTime) / 60000);
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  // Parse stats from combat log
  const damageDealt = combatLog.reduce((sum, line) => {
    const m = line.match(/for (\d+) (?:damage|fire|cold|force|radiant|necrotic|lightning|thunder|psychic|poison)/i);
    return sum + (m && !line.toLowerCase().includes('takes') ? parseInt(m[1]) : 0);
  }, 0);
  const kills = combatLog.filter((l) => l.includes(' falls!')).length;
  const crits = combatLog.filter((l) => l.includes('CRITICAL')).length;
  const rounds = combatLog.filter((l) => l.startsWith('--- Round')).length;
  const encounters = dmHistory.filter((l) => l.includes('Roll for initiative')).length;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onDismiss}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-4">
          <div className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">Session Complete</div>
          <div className="text-xl font-bold text-slate-200 mt-1">Well Played</div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-800/40 rounded-lg p-2">
            <div className="text-lg font-black text-amber-400">{durationStr}</div>
            <div className="text-[8px] text-slate-500 uppercase">Duration</div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2">
            <div className="text-lg font-black text-red-400">{damageDealt.toLocaleString()}</div>
            <div className="text-[8px] text-slate-500 uppercase">Damage Dealt</div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2">
            <div className="text-lg font-black text-emerald-400">{kills}</div>
            <div className="text-[8px] text-slate-500 uppercase">Enemies Slain</div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2">
            <div className="text-lg font-black text-violet-400">{crits}</div>
            <div className="text-[8px] text-slate-500 uppercase">Critical Hits</div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2">
            <div className="text-lg font-black text-sky-400">{encounters}</div>
            <div className="text-[8px] text-slate-500 uppercase">Encounters</div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2">
            <div className="text-lg font-black text-slate-300">{rounds}</div>
            <div className="text-[8px] text-slate-500 uppercase">Combat Rounds</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-[9px] text-slate-600">{characters.map((c) => c.name).join(' · ')}</div>
        </div>
        <button onClick={onDismiss} className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-400 font-semibold transition-colors">
          Until next time
        </button>
      </div>
    </div>
  );
}
