import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/toast';
import { useGame, STAT_NAMES, RACES, CLASSES, type Stats, type Race, type CharacterClass, type StatName } from '../contexts/GameContext';

// 4d6 drop lowest — the classic D&D stat generation method
function roll4d6DropLowest(): { rolls: number[]; dropped: number; total: number } {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  const dropped = rolls[0];
  const kept = rolls.slice(1);
  return { rolls, dropped, total: kept.reduce((a, b) => a + b, 0) };
}

function statModifier(value: number): string {
  const mod = Math.floor((value - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Base HP by class (d10 for martial, d8 for hybrid, d6 for casters)
const CLASS_HIT_DIE: Record<CharacterClass, number> = {
  Fighter: 10,
  Barbarian: 12,
  Paladin: 10,
  Ranger: 10,
  Rogue: 8,
  Monk: 8,
  Cleric: 8,
  Bard: 8,
  Druid: 8,
  Warlock: 8,
  Wizard: 6,
  Sorcerer: 6,
};

// Race stat bonuses (simplified — main stat +2)
const RACE_BONUSES: Record<Race, Partial<Stats>> = {
  Human: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
  Elf: { DEX: 2 },
  Dwarf: { CON: 2 },
  Halfling: { DEX: 2 },
  Gnome: { INT: 2 },
  'Half-Orc': { STR: 2 },
  Tiefling: { CHA: 2 },
  Dragonborn: { STR: 2 },
};

interface StatRoll {
  rolls: number[];
  dropped: number;
  total: number;
  animating: boolean;
}

export default function CharacterCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addCharacter, currentPlayer } = useGame();

  const [name, setName] = useState('');
  const [race, setRace] = useState<Race>('Human');
  const [charClass, setCharClass] = useState<CharacterClass>('Fighter');
  const [statRolls, setStatRolls] = useState<Record<StatName, StatRoll | null>>(
    Object.fromEntries(STAT_NAMES.map((s) => [s, null])) as Record<StatName, StatRoll | null>
  );
  const [rollingAll, setRollingAll] = useState(false);

  const rollStat = useCallback((stat: StatName) => {
    // Start animation
    setStatRolls((prev) => ({ ...prev, [stat]: { rolls: [0, 0, 0, 0], dropped: 0, total: 0, animating: true } }));

    // Cycle random numbers for visual effect
    let ticks = 0;
    const interval = setInterval(() => {
      setStatRolls((prev) => ({
        ...prev,
        [stat]: {
          rolls: Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1),
          dropped: 0,
          total: 0,
          animating: true,
        },
      }));
      ticks++;
      if (ticks >= 8) {
        clearInterval(interval);
        const result = roll4d6DropLowest();
        setStatRolls((prev) => ({ ...prev, [stat]: { ...result, animating: false } }));
      }
    }, 80);
  }, []);

  const rollAllStats = useCallback(() => {
    setRollingAll(true);
    // Roll each stat with a stagger
    STAT_NAMES.forEach((stat, i) => {
      setTimeout(() => {
        rollStat(stat);
        if (i === STAT_NAMES.length - 1) {
          setTimeout(() => setRollingAll(false), 800);
        }
      }, i * 200);
    });
  }, [rollStat]);

  // Compute final stats with race bonuses
  const getFinalStats = (): Stats | null => {
    const hasAll = STAT_NAMES.every((s) => statRolls[s] && !statRolls[s]!.animating);
    if (!hasAll) return null;
    const bonuses = RACE_BONUSES[race];
    return Object.fromEntries(
      STAT_NAMES.map((s) => [s, statRolls[s]!.total + (bonuses[s] || 0)])
    ) as Stats;
  };

  const finalStats = getFinalStats();

  const handleCreate = () => {
    if (!name.trim()) {
      toast('Give your character a name!', 'warning');
      return;
    }
    if (!finalStats) {
      toast('Roll all stats first!', 'warning');
      return;
    }

    const hitDie = CLASS_HIT_DIE[charClass];
    const conMod = Math.floor((finalStats.CON - 10) / 2);
    const maxHp = hitDie + conMod; // Level 1 HP = max hit die + CON mod

    const character = {
      id: crypto.randomUUID(),
      name: name.trim(),
      race,
      class: charClass,
      level: 1,
      stats: finalStats,
      hp: maxHp,
      maxHp,
      ac: 10 + Math.floor((finalStats.DEX - 10) / 2), // base AC = 10 + DEX mod
      playerId: currentPlayer.id,
      createdAt: Date.now(),
    };

    addCharacter(character);
    toast(`${character.name} the ${race} ${charClass} is ready!`, 'success');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-400 hover:text-white">
            &larr; Home
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Create Character</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter character name..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-lg text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] outline-none transition-all"
            maxLength={30}
          />
        </div>

        {/* Race + Class side by side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Race */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Race</label>
            <div className="grid grid-cols-2 gap-2">
              {RACES.map((r) => {
                const bonus = RACE_BONUSES[r];
                const bonusStr = Object.entries(bonus)
                  .map(([k, v]) => `${k} +${v}`)
                  .join(', ');
                return (
                  <button
                    key={r}
                    onClick={() => setRace(r)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-all border ${
                      race === r
                        ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div>{r}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{bonusStr}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Class</label>
            <div className="grid grid-cols-2 gap-2">
              {CLASSES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCharClass(c)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-all border ${
                    charClass === c
                      ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div>{c}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">d{CLASS_HIT_DIE[c]} HP</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats — 4d6 drop lowest */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Ability Scores</label>
            <button
              onClick={rollAllStats}
              disabled={rollingAll}
              className="text-xs bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-40 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              Roll All (4d6 drop lowest)
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {STAT_NAMES.map((stat) => {
              const roll = statRolls[stat];
              const bonus = RACE_BONUSES[race][stat] || 0;
              const finalVal = roll && !roll.animating ? roll.total + bonus : null;

              return (
                <div
                  key={stat}
                  className={`rounded-xl border p-4 text-center transition-all ${
                    roll?.animating
                      ? 'border-[#F38020]/50 bg-[#F38020]/5'
                      : roll
                        ? 'border-slate-700 bg-slate-900'
                        : 'border-slate-800 bg-slate-900/50'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat}</div>

                  {/* Final score */}
                  <div className={`text-3xl font-black tabular-nums mb-1 ${roll?.animating ? 'text-[#F38020] animate-pulse' : finalVal ? 'text-white' : 'text-slate-700'}`}>
                    {roll?.animating ? roll.rolls.slice(1).reduce((a, b) => a + b, 0) || '?' : finalVal ?? '--'}
                  </div>

                  {/* Modifier */}
                  {finalVal && (
                    <div className={`text-sm font-bold ${finalVal >= 14 ? 'text-green-400' : finalVal <= 8 ? 'text-red-400' : 'text-slate-400'}`}>
                      {statModifier(finalVal)}
                    </div>
                  )}

                  {/* Dice breakdown */}
                  {roll && !roll.animating && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {roll.rolls.map((d, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold ${
                            d === roll.dropped ? 'bg-red-500/20 text-red-400 line-through' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                      {bonus > 0 && (
                        <span className="text-[10px] text-green-400 ml-1">+{bonus}</span>
                      )}
                    </div>
                  )}

                  {/* Roll button for individual stat */}
                  {(!roll || !roll.animating) && (
                    <button
                      onClick={() => rollStat(stat)}
                      disabled={rollingAll}
                      className="mt-2 text-[10px] text-slate-500 hover:text-[#F38020] transition-colors disabled:opacity-30"
                    >
                      {roll ? 'Reroll' : 'Roll'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview + Create */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Character Preview</h2>
          </div>
          <div className="flex items-start gap-6">
            {/* Avatar placeholder */}
            <div className="w-20 h-20 rounded-xl bg-slate-800 flex items-center justify-center text-3xl font-black text-slate-600 shrink-0">
              {name ? name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-xl font-bold text-white">{name || 'Unnamed Hero'}</div>
              <div className="text-sm text-slate-400">
                Level 1 {race} {charClass}
              </div>
              {finalStats && (
                <div className="flex gap-3 mt-2">
                  <span className="text-xs text-red-400">HP {CLASS_HIT_DIE[charClass] + Math.floor((finalStats.CON - 10) / 2)}</span>
                  <span className="text-xs text-sky-400">AC {10 + Math.floor((finalStats.DEX - 10) / 2)}</span>
                  <span className="text-xs text-slate-500">Hit Die d{CLASS_HIT_DIE[charClass]}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!name.trim() || !finalStats}
            className="mt-6 w-full py-3 bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] text-lg"
          >
            Create Character
          </button>
        </div>
      </main>
    </div>
  );
}
