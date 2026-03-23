// EncounterPostmortem — AI tactical analysis after combat ends.
// Calls POST /api/dm/encounter-postmortem with combat log + party info.
// Shows collapsible analysis banner (teal-themed) below CombatMVP.
import { useState, useEffect, useRef } from 'react';
import type { Character } from '../../types/game';

interface EncounterPostmortemProps {
  combatLog: string[];
  inCombat: boolean;
  characters: Character[];
}

export default function EncounterPostmortem({ combatLog, inCombat, characters }: EncounterPostmortemProps) {
  const [show, setShow] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const prevInCombat = useRef(inCombat);

  // Detect combat-end transition and auto-fetch analysis
  useEffect(() => {
    if (prevInCombat.current && !inCombat && combatLog.length >= 3 && characters.length > 0) {
      setLoading(true);
      setShow(true);
      setAnalysis('');
      fetch('/api/dm/encounter-postmortem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          combatLog: combatLog.slice(-25),
          characters: characters.map((c) => ({ name: c.name, class: c.class, level: c.level })),
        }),
      })
        .then((r) => r.json() as Promise<{ analysis: string }>)
        .then((d) => setAnalysis(d.analysis || ''))
        .catch(() => setAnalysis(''))
        .finally(() => setLoading(false));
    }
    prevInCombat.current = inCombat;
  }, [inCombat, combatLog, characters]);

  // Auto-hide when new combat starts
  useEffect(() => {
    if (inCombat) setShow(false);
  }, [inCombat]);

  if (!show) return null;

  const bullets = analysis
    .split(/[\n•\-]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  return (
    <div className="border-b border-teal-900/40 bg-gradient-to-r from-teal-950/30 via-slate-900/50 to-teal-950/30">
      <button
        onClick={() => setShow(false)}
        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-teal-900/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">📊 Tactical Analysis</span>
          {loading && <span className="text-[9px] text-slate-500 animate-pulse">analyzing...</span>}
        </div>
        <span className="text-[9px] text-slate-600">click to dismiss</span>
      </button>
      {!loading && bullets.length > 0 && (
        <div className="px-3 pb-2 space-y-1">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-2 px-2.5 py-1 rounded-lg bg-slate-800/40 border border-slate-700/40">
              <span className="text-teal-500 text-[10px] mt-0.5 shrink-0">&#9679;</span>
              <span className="text-[10px] text-slate-300 leading-relaxed">{bullet}</span>
            </div>
          ))}
        </div>
      )}
      {!loading && analysis === '' && !loading && (
        <div className="px-3 pb-2">
          <span className="text-[10px] text-slate-500 italic">No analysis available (AI offline or combat too short).</span>
        </div>
      )}
    </div>
  );
}
