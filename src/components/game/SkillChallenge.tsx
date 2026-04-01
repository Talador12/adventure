// SkillChallenge — multi-round group skill check system.
// DM sets a goal + DC, players contribute skill checks. Track successes/failures.
// Succeed at N successes before M failures.

import { useState, useCallback } from 'react';
import { useGame, type Character } from '../../contexts/GameContext';
import { SKILL_ABILITIES } from '../../types/game';

interface SkillChallengeProps {
  onComplete: (success: boolean, log: string[]) => void;
  onCancel: () => void;
}

const SKILLS = Object.keys(SKILL_ABILITIES);

export default function SkillChallenge({ onComplete, onCancel }: SkillChallengeProps) {
  const { characters } = useGame();
  const [dc, setDc] = useState(15);
  const [successesNeeded, setSuccessesNeeded] = useState(3);
  const [failuresAllowed, setFailuresAllowed] = useState(3);
  const [successes, setSuccesses] = useState(0);
  const [failures, setFailures] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [usedSkills, setUsedSkills] = useState<Set<string>>(new Set());

  const proficiencyBonus = useCallback((level: number) => Math.floor((level - 1) / 4) + 2, []);

  const rollSkillCheck = useCallback((char: Character, skill: string) => {
    const ability = SKILL_ABILITIES[skill] || 'STR';
    const stat = char.stats[ability as keyof typeof char.stats] || 10;
    const mod = Math.floor((stat - 10) / 2);
    const prof = char.skillProficiencies?.includes(skill) ? proficiencyBonus(char.level) : 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + mod + prof;
    const success = total >= dc;
    const natTag = roll === 20 ? ' (NAT 20!)' : roll === 1 ? ' (NAT 1!)' : '';
    const profTag = prof > 0 ? ' [proficient]' : '';
    const entry = `${char.name} rolls ${skill}: ${roll}+${mod}${prof > 0 ? `+${prof}` : ''}=${total} vs DC ${dc} → ${success ? '✅ Success' : '❌ Failure'}${natTag}${profTag}`;

    setLog((prev) => [...prev, entry]);
    if (success) {
      setSuccesses((s) => s + 1);
      if (successes + 1 >= successesNeeded) {
        onComplete(true, [...log, entry, '🎉 Skill challenge succeeded!']);
      }
    } else {
      setFailures((f) => f + 1);
      if (failures + 1 >= failuresAllowed) {
        onComplete(false, [...log, entry, '💀 Skill challenge failed!']);
      }
    }
    setUsedSkills((prev) => new Set([...prev, `${char.id}:${skill}`]));
  }, [dc, successes, failures, successesNeeded, failuresAllowed, log, onComplete, proficiencyBonus]);

  if (!started) {
    return (
      <div className="p-3 rounded-lg bg-slate-900 border border-[#F38020]/30 space-y-2">
        <h3 className="text-sm font-bold text-[#F38020]">Skill Challenge Setup</h3>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[9px] text-slate-500 uppercase">DC</label>
            <input type="number" value={dc} onChange={(e) => setDc(Number(e.target.value))} className="w-full text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300" />
          </div>
          <div>
            <label className="text-[9px] text-slate-500 uppercase">Successes</label>
            <input type="number" value={successesNeeded} onChange={(e) => setSuccessesNeeded(Number(e.target.value))} className="w-full text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300" />
          </div>
          <div>
            <label className="text-[9px] text-slate-500 uppercase">Failures</label>
            <input type="number" value={failuresAllowed} onChange={(e) => setFailuresAllowed(Number(e.target.value))} className="w-full text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStarted(true)} className="flex-1 text-xs py-1.5 rounded bg-[#F38020]/20 border border-[#F38020]/40 text-[#F38020] font-semibold hover:bg-[#F38020]/30">Start Challenge</button>
          <button onClick={onCancel} className="text-xs px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg bg-slate-900 border border-[#F38020]/30 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#F38020]">Skill Challenge</h3>
        <div className="flex gap-3 text-xs">
          <span className="text-emerald-400 font-bold">✅ {successes}/{successesNeeded}</span>
          <span className="text-red-400 font-bold">❌ {failures}/{failuresAllowed}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div className="flex gap-1">
        {Array.from({ length: successesNeeded }).map((_, i) => (
          <div key={`s${i}`} className={`h-1.5 flex-1 rounded-full ${i < successes ? 'bg-emerald-500' : 'bg-slate-700'}`} />
        ))}
        <div className="w-px bg-slate-600" />
        {Array.from({ length: failuresAllowed }).map((_, i) => (
          <div key={`f${i}`} className={`h-1.5 flex-1 rounded-full ${i < failures ? 'bg-red-500' : 'bg-slate-700'}`} />
        ))}
      </div>
      {/* Character skill buttons */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {characters.map((char) => (
          <div key={char.id}>
            <div className="text-[10px] text-slate-400 font-semibold mb-0.5">{char.name}</div>
            <div className="flex flex-wrap gap-0.5">
              {SKILLS.map((skill) => {
                const used = usedSkills.has(`${char.id}:${skill}`);
                return (
                  <button
                    key={skill}
                    disabled={used}
                    onClick={() => rollSkillCheck(char, skill)}
                    className={`text-[7px] px-1 py-0.5 rounded border ${used ? 'opacity-30 border-slate-800 text-slate-600' : 'border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-600/40'} transition-all`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Log */}
      {log.length > 0 && (
        <div className="max-h-24 overflow-y-auto space-y-0.5">
          {log.map((entry, i) => (
            <div key={i} className="text-[9px] text-slate-500">{entry}</div>
          ))}
        </div>
      )}
      <button onClick={onCancel} className="text-[9px] text-slate-600 hover:text-slate-400">Cancel Challenge</button>
    </div>
  );
}
