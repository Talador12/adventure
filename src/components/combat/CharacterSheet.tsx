// CharacterSheet — side panel showing selected character's full stats, HP, conditions, and equipment.
import { type Character, STAT_NAMES, type StatName } from '../../contexts/GameContext';

interface CharacterSheetProps {
  character: Character;
}

function statModifier(value: number): string {
  const mod = Math.floor((value - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function modColor(value: number): string {
  const mod = Math.floor((value - 10) / 2);
  if (mod >= 2) return 'text-green-400';
  if (mod <= -1) return 'text-red-400';
  return 'text-slate-400';
}

// D&D 5e proficiency bonus by level
function proficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

// Saving throw proficiencies by class (simplified — primary saves)
const CLASS_SAVE_PROFICIENCIES: Record<string, StatName[]> = {
  Fighter: ['STR', 'CON'],
  Barbarian: ['STR', 'CON'],
  Paladin: ['WIS', 'CHA'],
  Ranger: ['STR', 'DEX'],
  Rogue: ['DEX', 'INT'],
  Monk: ['STR', 'DEX'],
  Cleric: ['WIS', 'CHA'],
  Bard: ['DEX', 'CHA'],
  Druid: ['INT', 'WIS'],
  Warlock: ['WIS', 'CHA'],
  Wizard: ['INT', 'WIS'],
  Sorcerer: ['CON', 'CHA'],
};

export default function CharacterSheet({ character }: CharacterSheetProps) {
  const prof = proficiencyBonus(character.level);
  const saveProficiencies = CLASS_SAVE_PROFICIENCIES[character.class] || [];

  const hpPct = Math.max(0, (character.hp / character.maxHp) * 100);
  const hpColor = hpPct > 50 ? 'bg-green-500' : hpPct > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-4 text-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        {character.portrait ? (
          <img src={character.portrait} alt={character.name} className="w-14 h-14 rounded-xl object-cover border border-slate-600" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-500 border border-slate-700">
            {character.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-bold text-white text-lg">{character.name}</div>
          <div className="text-slate-400 text-xs">Level {character.level} {character.race} {character.class}</div>
          <div className="text-xs text-slate-500">Proficiency Bonus: +{prof}</div>
        </div>
      </div>

      {/* HP bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Hit Points</span>
          <span className={`font-mono font-bold ${hpPct > 50 ? 'text-green-400' : hpPct > 25 ? 'text-yellow-400' : 'text-red-400'}`}>
            {character.hp} / {character.maxHp}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${hpColor}`} style={{ width: `${hpPct}%` }} />
        </div>
      </div>

      {/* AC + Speed */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2.5 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">AC</div>
          <div className="text-xl font-black text-sky-400">{character.ac}</div>
        </div>
        <div className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2.5 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Speed</div>
          <div className="text-xl font-black text-slate-300">30ft</div>
        </div>
        <div className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2.5 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Initiative</div>
          <div className={`text-xl font-black ${modColor(character.stats.DEX)}`}>
            {statModifier(character.stats.DEX)}
          </div>
        </div>
      </div>

      {/* Ability Scores */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Ability Scores</div>
        <div className="grid grid-cols-3 gap-2">
          {STAT_NAMES.map((stat) => {
            const val = character.stats[stat];
            const mod = Math.floor((val - 10) / 2);
            return (
              <div key={stat} className="rounded-lg bg-slate-800 border border-slate-700 p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase tracking-wider">{stat}</div>
                <div className={`text-lg font-black ${modColor(val)}`}>{val}</div>
                <div className={`text-xs font-bold ${modColor(val)}`}>{mod >= 0 ? `+${mod}` : mod}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saving Throws */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Saving Throws</div>
        <div className="grid grid-cols-2 gap-1">
          {STAT_NAMES.map((stat) => {
            const val = character.stats[stat];
            const mod = Math.floor((val - 10) / 2);
            const isProficient = saveProficiencies.includes(stat);
            const saveBonus = isProficient ? mod + prof : mod;
            return (
              <div key={stat} className="flex items-center gap-1.5 text-xs">
                <div className={`w-2 h-2 rounded-full ${isProficient ? 'bg-[#F38020]' : 'bg-slate-700'}`} />
                <span className="text-slate-400 w-8">{stat}</span>
                <span className={`font-mono font-bold ${saveBonus >= 0 ? 'text-slate-200' : 'text-red-400'}`}>
                  {saveBonus >= 0 ? `+${saveBonus}` : saveBonus}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Equipment placeholder */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Equipment</div>
        <div className="text-xs text-slate-600 italic p-3 border border-dashed border-slate-800 rounded-lg text-center">
          Equipment and inventory coming soon
        </div>
      </div>

      {/* Spell Slots placeholder (for casters) */}
      {['Wizard', 'Sorcerer', 'Warlock', 'Cleric', 'Druid', 'Bard', 'Paladin', 'Ranger'].includes(character.class) && (
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Spell Slots</div>
          <div className="flex gap-1">
            {/* Level 1: 2 slots at level 1 */}
            {[1, 2].map((i) => (
              <div key={i} className="w-6 h-6 rounded border border-purple-600/50 bg-purple-900/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
            ))}
          </div>
          <div className="text-[9px] text-slate-600 mt-1">Level 1 slots</div>
        </div>
      )}
    </div>
  );
}
