// PartyHealthBar — compact horizontal strip showing all party members' HP, conditions, and status.
// Always visible during game (below initiative bar), gives at-a-glance party health.
import { useGame, CONDITION_EFFECTS } from '../../contexts/GameContext';
import type { Character } from '../../types/game';

interface PartyHealthBarProps {
  characters: Character[];
  selectedCharacterId: string | null;
  onSelectCharacter?: (id: string) => void;
}

export default function PartyHealthBar({ characters, selectedCharacterId, onSelectCharacter }: PartyHealthBarProps) {
  const { units } = useGame();

  if (characters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/50 overflow-x-auto shrink-0">
      <span className="text-[8px] text-slate-600 uppercase tracking-wider font-semibold shrink-0">Party</span>
      {characters.map((char) => {
        const hpPct = Math.max(0, Math.min(100, (char.hp / char.maxHp) * 100));
        const isLow = hpPct <= 25;
        const isMid = hpPct <= 50 && !isLow;
        const isDead = char.condition === 'dead';
        const isUnconscious = char.condition === 'unconscious';
        const isSelected = char.id === selectedCharacterId;
        // Find matching unit for conditions
        const unit = units.find((u) => u.characterId === char.id);
        const conditions = unit?.conditions || [];
        const portraitSrc = char.portrait || `/portraits/classes/${char.class.toLowerCase()}.webp`;

        return (
          <button
            key={char.id}
            onClick={() => onSelectCharacter?.(char.id)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all min-w-0 shrink-0 group ${
              isSelected
                ? 'border-[#F38020]/60 bg-[#F38020]/10'
                : isDead
                  ? 'border-red-900/50 bg-red-950/20 opacity-60'
                  : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/60'
            }`}
            title={`${char.name} — ${char.hp}/${char.maxHp} HP${conditions.length ? ` (${conditions.map((c) => c.type).join(', ')})` : ''}`}
          >
            {/* Tiny portrait + inspiration pip */}
            <div className="relative shrink-0">
              <img
                src={portraitSrc}
                alt={char.name}
                className={`w-6 h-6 rounded-full object-cover border ${isDead ? 'border-red-800 grayscale' : isUnconscious ? 'border-yellow-700' : 'border-slate-700'}`}
                onError={(e) => { (e.target as HTMLImageElement).src = `/portraits/races/${char.race.toLowerCase()}.webp`; }}
              />
              {char.inspiration && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-[7px] leading-none flex items-center justify-center bg-amber-500 rounded-full text-slate-900 font-bold" title="Inspired!">★</span>
              )}
            </div>
            {/* Name + class */}
            <div className="flex flex-col min-w-0">
              <span className={`text-[10px] font-semibold truncate max-w-[60px] ${isDead ? 'text-red-500 line-through' : isSelected ? 'text-[#F38020]' : 'text-slate-300'}`}>
                {char.name}
              </span>
              <span className="text-[8px] text-slate-600 truncate">{char.class} {char.level}</span>
            </div>
            {/* HP bar */}
            <div className="flex flex-col items-end gap-0.5">
              <div className="w-14 h-1.5 bg-slate-700 rounded-full overflow-hidden hp-bar-shimmer">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isDead ? 'bg-red-800' : isLow ? 'bg-red-500' : isMid ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${hpPct}%` }}
                />
              </div>
              <span className={`text-[8px] font-mono ${isDead ? 'text-red-600' : isLow ? 'text-red-400' : isMid ? 'text-yellow-400' : 'text-slate-500'}`}>
                {isDead ? 'DEAD' : isUnconscious ? 'DOWN' : `${char.hp}/${char.maxHp}`}
              </span>
            </div>
            {/* Exhaustion badge */}
            {(char.exhaustion ?? 0) > 0 && (
              <span
                className={`text-[7px] font-bold px-1 py-0.5 rounded border ${
                  char.exhaustion >= 4 ? 'text-red-400 border-red-700/50 bg-red-900/20' :
                  char.exhaustion >= 2 ? 'text-orange-400 border-orange-700/50 bg-orange-900/20' :
                  'text-yellow-400 border-yellow-700/50 bg-yellow-900/20'
                }`}
                title={`Exhaustion level ${char.exhaustion}`}
              >
                E{char.exhaustion}
              </span>
            )}
            {/* Condition pips */}
            {conditions.length > 0 && (
              <div className="flex gap-0.5">
                {conditions.slice(0, 3).map((c, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${CONDITION_EFFECTS[c.type]?.color ? '' : 'bg-slate-500'}`}
                    style={{ backgroundColor: getConditionDotColor(c.type) }}
                    title={`${c.type} (${c.duration} rounds)`}
                  />
                ))}
                {conditions.length > 3 && (
                  <span className="text-[7px] text-slate-500">+{conditions.length - 3}</span>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Map condition type to a dot color (hex)
function getConditionDotColor(type: string): string {
  const colors: Record<string, string> = {
    poisoned: '#4ade80', stunned: '#fde047', frightened: '#c084fc',
    blessed: '#38bdf8', hexed: '#e879f9', burning: '#fb923c',
    prone: '#d97706', dodging: '#7dd3fc', raging: '#f87171', inspired: '#818cf8',
  };
  return colors[type] || '#64748b';
}
