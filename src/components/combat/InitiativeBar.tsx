import { useGame, type Unit } from '../../contexts/GameContext';

interface InitiativeBarProps {
  entries: Unit[];
}

export default function InitiativeBar({ entries }: InitiativeBarProps) {
  const { players, characters, selectedUnitId, setSelectedUnitId } = useGame();

  // Look up the player controlling each unit
  const getPlayerLabel = (unit: Unit) => {
    const player = players.find((p) => p.id === unit.playerId);
    if (!player) return null;
    if (player.controllerType === 'ai') return { label: 'AI', color: 'text-purple-400 bg-purple-500/20' };
    return { label: player.username, color: 'text-sky-400 bg-sky-500/15' };
  };

  // Look up portrait from linked character
  const getPortrait = (unit: Unit): string | null => {
    if (!unit.characterId) return null;
    const char = characters.find((c) => c.id === unit.characterId);
    return char?.portrait || null;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 p-3 min-w-max">
        {entries.map((entry) => {
          const maxHp = entry.maxHp || entry.hp;
          const hpPct = Math.max(0, Math.min(100, (entry.hp / maxHp) * 100));
          const isLow = hpPct <= 25;
          const isMid = hpPct <= 50 && !isLow;
          const isSelected = selectedUnitId === entry.id;
          const playerLabel = getPlayerLabel(entry);
          const portrait = getPortrait(entry);

          return (
            <button
              key={entry.id}
              onClick={() => setSelectedUnitId(isSelected ? null : entry.id)}
              className={`relative flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 min-w-[100px] border transition-all duration-300 cursor-pointer group ${
                isSelected ? 'border-[#F38020] bg-[#F38020]/10 shadow-lg ring-1 ring-[#F38020]/50' : entry.isCurrentTurn ? 'border-yellow-500/80 bg-yellow-500/10 shadow-lg scale-105' : 'border-slate-700 bg-slate-800/80 hover:border-slate-600 hover:bg-slate-800'
              } ${entry.type === 'enemy' && !isSelected && !entry.isCurrentTurn ? 'border-red-900/50' : ''}`}
              style={entry.isCurrentTurn && !isSelected ? { boxShadow: '0 0 20px rgba(234,179,8,0.2)' } : undefined}
            >
              {/* Turn indicator */}
              {entry.isCurrentTurn && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">TURN</div>}

              {/* Selected for dice indicator */}
              {isSelected && !entry.isCurrentTurn && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#F38020] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">DICE</div>}

              {/* Avatar — portrait if linked to character, otherwise initial */}
              {portrait ? (
                <img src={portrait} alt={entry.name} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${entry.type === 'enemy' ? 'bg-red-900/60 text-red-300' : entry.type === 'npc' ? 'bg-blue-900/60 text-blue-300' : 'bg-orange-500/20 text-orange-400'}`}>{entry.name.charAt(0).toUpperCase()}</div>
              )}

              {/* Name */}
              <span className={`text-xs font-semibold truncate max-w-[80px] ${isSelected ? 'text-[#F38020]' : entry.isCurrentTurn ? 'text-yellow-300' : 'text-slate-300'}`}>{entry.name}</span>

              {/* Player/AI controller label */}
              {playerLabel && <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${playerLabel.color}`}>{playerLabel.label}</span>}

              {/* HP bar */}
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ease-out ${isLow ? 'bg-red-500' : isMid ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${hpPct}%` }} />
              </div>

              {/* HP text */}
              <span className={`text-[10px] font-mono ${isLow ? 'text-red-400' : isMid ? 'text-yellow-400' : 'text-slate-500'}`}>
                {entry.hp}/{maxHp}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
