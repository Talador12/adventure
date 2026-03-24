// PartyVitals — compact at-a-glance dashboard for the whole party.
// Shows HP bars, AC, active conditions, and spell slots remaining.
// Renders inline below the party health bar. Dense, readable, useful.
import type { Character } from '../../types/game';

interface PartyVitalsProps {
  characters: Character[];
  inCombat: boolean;
}

export default function PartyVitals({ characters, inCombat }: PartyVitalsProps) {
  if (characters.length === 0 || !inCombat) return null;

  return (
    <div className="flex gap-1.5 px-3 py-1.5 bg-slate-900/40 border-b border-slate-800/50 overflow-x-auto">
      {characters.map((char) => {
        const hpPct = char.maxHp > 0 ? Math.max(0, char.hp / char.maxHp) * 100 : 0;
        const conditions = (char.condition && char.condition !== 'normal') ? [char.condition] : [];
        const slotsUsed = Object.values(char.spellSlotsUsed || {}).reduce((s, v) => s + v, 0);

        return (
          <div key={char.id} className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/40 border border-slate-800/60 min-w-0 shrink-0">
            {/* Name + class */}
            <div className="min-w-0">
              <div className="text-[9px] text-slate-300 font-semibold truncate max-w-[60px]">{char.name}</div>
              <div className="text-[7px] text-slate-600">{char.class} {char.level}</div>
            </div>
            {/* HP micro-bar */}
            <div className="w-10 space-y-0.5">
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${hpPct > 50 ? 'bg-green-500' : hpPct > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${hpPct}%` }}
                />
              </div>
              <div className="text-[7px] text-slate-500 text-center">{char.hp}/{char.maxHp}</div>
            </div>
            {/* AC */}
            <span className="text-[8px] text-sky-400 font-mono">{char.ac || '?'}</span>
            {/* Conditions */}
            {conditions.length > 0 && (
              <span className="text-[7px] text-red-400 font-semibold">{conditions[0]}</span>
            )}
            {/* Spell slots indicator */}
            {slotsUsed > 0 && (
              <span className="text-[7px] text-purple-400" title={`${slotsUsed} spell slots used`}>-{slotsUsed}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
