// CharacterSheet — side panel showing selected character's full stats, HP, conditions, equipment, and inventory.
import { type Character, STAT_NAMES, type StatName, XP_THRESHOLDS, useGame, type EquipSlot, type Item, RARITY_COLORS, RARITY_BG, EMPTY_EQUIPMENT, getClassSpells, getSpellSlots, FULL_CASTERS, HALF_CASTERS, getClassAbility, FEATS, hasPendingASI, HIT_DIE_SIDES, CONDITION_EFFECTS, type ConditionType, type Spell } from '../../contexts/GameContext';
import { CONDITION_TOOLTIPS, EXHAUSTION_LEVELS } from '../../data/rules';
import { useState, useCallback, useMemo } from 'react';

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

// D&D 5e skills — each tied to an ability score
const SKILLS: { name: string; stat: StatName }[] = [
  { name: 'Acrobatics', stat: 'DEX' }, { name: 'Animal Handling', stat: 'WIS' },
  { name: 'Arcana', stat: 'INT' }, { name: 'Athletics', stat: 'STR' },
  { name: 'Deception', stat: 'CHA' }, { name: 'History', stat: 'INT' },
  { name: 'Insight', stat: 'WIS' }, { name: 'Intimidation', stat: 'CHA' },
  { name: 'Investigation', stat: 'INT' }, { name: 'Medicine', stat: 'WIS' },
  { name: 'Nature', stat: 'INT' }, { name: 'Perception', stat: 'WIS' },
  { name: 'Performance', stat: 'CHA' }, { name: 'Persuasion', stat: 'CHA' },
  { name: 'Religion', stat: 'INT' }, { name: 'Sleight of Hand', stat: 'DEX' },
  { name: 'Stealth', stat: 'DEX' }, { name: 'Survival', stat: 'WIS' },
];

// Skill proficiencies by class (simplified — typical starting picks, 2-4 per class)
const CLASS_SKILL_PROFICIENCIES: Record<string, string[]> = {
  Fighter: ['Athletics', 'Intimidation'],
  Barbarian: ['Athletics', 'Perception'],
  Paladin: ['Athletics', 'Persuasion'],
  Ranger: ['Nature', 'Perception', 'Stealth', 'Survival'],
  Rogue: ['Acrobatics', 'Deception', 'Stealth', 'Perception'],
  Monk: ['Acrobatics', 'Stealth'],
  Cleric: ['Insight', 'Medicine'],
  Bard: ['Deception', 'Performance', 'Persuasion'],
  Druid: ['Nature', 'Perception'],
  Warlock: ['Arcana', 'Deception'],
  Wizard: ['Arcana', 'Investigation'],
  Sorcerer: ['Arcana', 'Persuasion'],
};

// Slot display names and icons
const SLOT_LABELS: Record<EquipSlot, { label: string; icon: string }> = {
  weapon: { label: 'Weapon', icon: '⚔️' },
  armor: { label: 'Armor', icon: '🛡️' },
  shield: { label: 'Shield', icon: '🔰' },
  ring: { label: 'Ring', icon: '💍' },
};

// Item stat summary (one-line)
function itemStatLine(item: Item): string {
  const parts: string[] = [];
  if (item.damageDie) parts.push(`${item.damageDie}${item.damageBonus ? `+${item.damageBonus}` : ''} dmg`);
  if (item.attackBonus) parts.push(`+${item.attackBonus} hit`);
  if (item.acBonus) parts.push(item.type === 'armor' ? `AC ${item.acBonus}` : `+${item.acBonus} AC`);
  if (item.healAmount) parts.push(`+${item.healAmount} HP`);
  if (item.statBonus) {
    for (const [stat, val] of Object.entries(item.statBonus)) {
      if (val) parts.push(`+${val} ${stat}`);
    }
  }
  return parts.join(', ');
}

// Casting stat by class (for spell save DC display)
const CASTING_STAT: Record<string, StatName> = {
  Wizard: 'INT', Sorcerer: 'CHA', Cleric: 'WIS', Druid: 'WIS',
  Bard: 'CHA', Warlock: 'CHA', Paladin: 'CHA', Ranger: 'WIS',
};

// School colors for filter badges (also exported from data/rules.ts SPELL_SCHOOLS but kept inline for render perf)
const SCHOOL_COLORS: Record<string, string> = {
  abjuration: 'text-blue-300 bg-blue-900/30 border-blue-700/40',
  conjuration: 'text-cyan-300 bg-cyan-900/30 border-cyan-700/40',
  divination: 'text-amber-300 bg-amber-900/30 border-amber-700/40',
  enchantment: 'text-pink-300 bg-pink-900/30 border-pink-700/40',
  evocation: 'text-red-300 bg-red-900/30 border-red-700/40',
  illusion: 'text-purple-300 bg-purple-900/30 border-purple-700/40',
  necromancy: 'text-green-300 bg-green-900/30 border-green-700/40',
  transmutation: 'text-yellow-300 bg-yellow-900/30 border-yellow-700/40',
};

interface SpellbookSectionProps {
  spells: Spell[];
  slots: Record<number, number>;
  used: Record<number, number>;
  schools: string[];
  castingStat: StatName | undefined;
  spellDC: number;
  spellAttack: number;
  prof: number;
  castMod: number;
  onToggleSlot: (level: number, slotIndex: number, isAvailable: boolean) => void;
}

function SpellbookSection({ spells, slots, used, schools, castingStat, spellDC, spellAttack, prof, castMod, onToggleSlot }: SpellbookSectionProps) {
  const [spellSearch, setSpellSearch] = useState('');
  const [schoolFilter, setSchoolFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

  // Unique spell levels available
  const spellLevels = useMemo(() => [...new Set(spells.map((s) => s.level))].sort((a, b) => a - b), [spells]);

  // Filter spells
  const filteredSpells = useMemo(() => {
    let result = spells;
    if (spellSearch) {
      const q = spellSearch.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.school.toLowerCase().includes(q));
    }
    if (schoolFilter) {
      result = result.filter((s) => s.school === schoolFilter);
    }
    if (levelFilter !== null) {
      result = result.filter((s) => s.level === levelFilter);
    }
    return result;
  }, [spells, spellSearch, schoolFilter, levelFilter]);

  const filteredCantrips = filteredSpells.filter((s) => s.level === 0);
  const filteredLeveled = filteredSpells.filter((s) => s.level > 0);
  const hasFilters = spellSearch || schoolFilter || levelFilter !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Spellbook</div>
        {castingStat && (
          <div className="flex gap-2">
            <span className="text-[9px] font-mono text-purple-400" title={`Spell Save DC = 8 + ${prof} (prof) + ${castMod} (${castingStat})`}>DC {spellDC}</span>
            <span className="text-[9px] font-mono text-purple-400" title={`Spell Attack = +${prof} (prof) + ${castMod} (${castingStat})`}>+{spellAttack} atk</span>
          </div>
        )}
      </div>

      {/* Search + filters */}
      <div className="space-y-1.5 mb-2">
        <input
          type="text"
          value={spellSearch}
          onChange={(e) => setSpellSearch(e.target.value)}
          placeholder="Search spells..."
          className="w-full px-2 py-1 bg-slate-800/60 border border-slate-700/50 rounded text-[10px] text-slate-200 placeholder-slate-600 focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none"
        />
        {/* Level filter pills */}
        <div className="flex flex-wrap gap-1">
          {spellLevels.map((lv) => (
            <button
              key={lv}
              onClick={() => setLevelFilter(levelFilter === lv ? null : lv)}
              className={`text-[8px] px-1.5 py-0.5 rounded-full border font-semibold transition-all ${
                levelFilter === lv
                  ? 'border-purple-500/60 bg-purple-900/40 text-purple-300'
                  : 'border-slate-700 bg-slate-800/50 text-slate-500 hover:text-slate-300 hover:border-slate-600'
              }`}
            >
              {lv === 0 ? 'Cantrip' : `Lv${lv}`}
            </button>
          ))}
          <div className="w-px h-3 bg-slate-700 self-center mx-0.5" />
          {/* School filter pills */}
          {schools.map((school) => (
            <button
              key={school}
              onClick={() => setSchoolFilter(schoolFilter === school ? null : school)}
              className={`text-[8px] px-1.5 py-0.5 rounded-full border font-medium capitalize transition-all ${
                schoolFilter === school
                  ? SCHOOL_COLORS[school] || 'text-slate-300 bg-slate-700/50 border-slate-600'
                  : 'border-slate-700 bg-slate-800/50 text-slate-500 hover:text-slate-300 hover:border-slate-600'
              }`}
            >
              {school.slice(0, 4)}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={() => { setSpellSearch(''); setSchoolFilter(null); setLevelFilter(null); }}
              className="text-[8px] px-1.5 py-0.5 rounded-full border border-red-800/40 bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Spell slots — clickable pips */}
      {Object.keys(slots).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.entries(slots).map(([lvl, max]) => {
            const usedCount = used[Number(lvl)] || 0;
            const remaining = max - usedCount;
            return (
              <div key={lvl} className="text-center">
                <div className="text-[8px] text-slate-600 mb-0.5">Lv{lvl}</div>
                <div className="flex gap-0.5">
                  {Array.from({ length: max }).map((_, i) => {
                    const isAvailable = i < remaining;
                    return (
                      <button
                        key={i}
                        onClick={() => onToggleSlot(Number(lvl), i, isAvailable)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all cursor-pointer ${
                          isAvailable
                            ? 'border-purple-500/60 bg-purple-900/40 hover:bg-purple-800/50 hover:border-purple-400/70'
                            : 'border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 hover:border-slate-600'
                        }`}
                        title={isAvailable ? `Click to spend level ${lvl} slot` : `Click to restore level ${lvl} slot`}
                      >
                        {isAvailable && <div className="w-2 h-2 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50" />}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[7px] text-slate-600 mt-0.5">{remaining}/{max}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cantrips */}
      {filteredCantrips.length > 0 && (
        <div className="mb-1.5">
          <div className="text-[9px] text-slate-600 mb-1">Cantrips</div>
          <div className="space-y-0.5">
            {filteredCantrips.map((s) => (
              <div key={s.id} className="flex items-center justify-between text-[10px] px-2 py-0.5 rounded bg-slate-800/30">
                <span className="text-slate-300 font-medium">{s.name}</span>
                <div className="flex items-center gap-1">
                  <span className={`text-[7px] capitalize ${SCHOOL_COLORS[s.school]?.split(' ')[0] || 'text-slate-500'}`}>{s.school.slice(0, 4)}</span>
                  <span className="text-slate-500">{s.damage || s.description.slice(0, 20)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leveled spells */}
      {filteredLeveled.length > 0 && (
        <div>
          <div className="text-[9px] text-slate-600 mb-1">Spells</div>
          <div className="space-y-0.5">
            {filteredLeveled.map((s) => {
              const slotsAvail = (slots[s.level] || 0) - (used[s.level] || 0);
              return (
                <div key={s.id} className={`flex items-center justify-between text-[10px] px-2 py-0.5 rounded bg-slate-800/30 ${slotsAvail <= 0 ? 'opacity-40' : ''}`}>
                  <span className="text-purple-300 font-medium">{s.name}</span>
                  <div className="flex items-center gap-1.5">
                    {s.isConcentration && <span className="text-[7px] text-blue-400 font-bold">C</span>}
                    <span className={`text-[7px] capitalize ${SCHOOL_COLORS[s.school]?.split(' ')[0] || 'text-slate-500'}`}>{s.school.slice(0, 4)}</span>
                    <span className="text-slate-500">Lv{s.level} {'\u2022'} {s.damage || (s.healAmount ? `+${s.healAmount}HP` : s.range)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No results */}
      {hasFilters && filteredSpells.length === 0 && (
        <div className="text-[10px] text-slate-600 text-center py-2 italic">No spells match filters</div>
      )}
    </div>
  );
}

export default function CharacterSheet({ character }: CharacterSheetProps) {
  const { restCharacter, equipItem, unequipItem, useItem, removeItem, units, updateCharacter, addRoll, currentPlayer } = useGame();
  const [showInventory, setShowInventory] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const prof = proficiencyBonus(character.level);
  const saveProficiencies = CLASS_SAVE_PROFICIENCIES[character.class] || [];

  // Spend or restore a single spell slot by clicking
  const toggleSpellSlot = useCallback((level: number, slotIndex: number, isAvailable: boolean) => {
    const used = character.spellSlotsUsed || {};
    const maxSlots = getSpellSlots(character.class, character.level);
    const maxForLevel = maxSlots[level] || 0;
    const usedCount = used[level] || 0;
    if (isAvailable) {
      // Spend: increase used count
      if (usedCount < maxForLevel) {
        updateCharacter(character.id, { spellSlotsUsed: { ...used, [level]: usedCount + 1 } });
      }
    } else {
      // Restore: decrease used count
      if (usedCount > 0) {
        updateCharacter(character.id, { spellSlotsUsed: { ...used, [level]: usedCount - 1 } });
      }
    }
  }, [character.id, character.class, character.level, character.spellSlotsUsed, updateCharacter]);

  // Quick roll: ability check or saving throw
  const quickRoll = useCallback((label: string, modifier: number) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + modifier;
    const isCrit = roll === 20;
    const isFumble = roll === 1;
    addRoll({
      die: 'd20' as const,
      sides: 20,
      value: total,
      playerId: currentPlayer.id,
      playerName: currentPlayer.username,
      unitId: undefined,
      unitName: `${character.name}: ${label}`,
    });
  }, [addRoll, currentPlayer, character.name]);

  const hpPct = Math.max(0, (character.hp / character.maxHp) * 100);
  const hpColor = hpPct > 50 ? 'bg-green-500' : hpPct > 25 ? 'bg-yellow-500' : 'bg-red-500';

  // XP progress
  const currentLevelXP = character.level > 1 ? XP_THRESHOLDS[character.level - 1] : 0;
  const nextLevelXP = character.level < 20 ? XP_THRESHOLDS[character.level] : XP_THRESHOLDS[19];
  const xpInLevel = character.xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const xpPct = xpNeeded > 0 ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100;

  return (
    <div className="space-y-4 text-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={character.portrait || `/portraits/classes/${character.class.toLowerCase()}.webp`}
          alt={character.name}
          className="w-14 h-14 rounded-xl object-cover border border-slate-600"
          onError={(e) => { (e.target as HTMLImageElement).src = `/portraits/races/${character.race.toLowerCase()}.webp`; }}
        />
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

      {/* XP bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Experience</span>
          <span className="font-mono text-purple-400">{character.xp} / {nextLevelXP} XP</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-purple-500 transition-all duration-500" style={{ width: `${xpPct}%` }} />
        </div>
        {character.level < 20 && (
          <div className="text-[9px] text-slate-600">{xpNeeded - xpInLevel} XP to level {character.level + 1}</div>
        )}
      </div>

      {/* Condition + Death Saves */}
      {character.condition !== 'normal' && (
        <div className={`rounded-lg px-3 py-2 border text-xs font-semibold text-center ${
          character.condition === 'unconscious' ? 'border-red-800/50 bg-red-900/20 text-red-400' :
          character.condition === 'dead' ? 'border-red-600/50 bg-red-900/40 text-red-300' :
          'border-yellow-800/50 bg-yellow-900/20 text-yellow-400'
        }`}>
          {character.condition === 'unconscious' ? 'UNCONSCIOUS' :
           character.condition === 'dead' ? 'DEAD' : 'STABILIZED'}
        </div>
      )}

      {(character.condition === 'unconscious' || character.deathSaves.successes > 0 || character.deathSaves.failures > 0) && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <span className="text-slate-500">Saves:</span>
            {[0, 1, 2].map((i) => (
              <div key={`s${i}`} className={`w-3 h-3 rounded-full border ${i < character.deathSaves.successes ? 'bg-green-500 border-green-400' : 'border-slate-600'}`} />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">Fails:</span>
            {[0, 1, 2].map((i) => (
              <div key={`f${i}`} className={`w-3 h-3 rounded-full border ${i < character.deathSaves.failures ? 'bg-red-500 border-red-400' : 'border-slate-600'}`} />
            ))}
          </div>
        </div>
      )}

      {/* Active conditions on unit — with tooltips */}
      {(() => {
        const playerUnit = units.find((u) => u.characterId === character.id);
        if (!playerUnit?.conditions?.length && !playerUnit?.concentratingOn) return null;
        return (
          <div className="space-y-1.5">
            {/* Concentration indicator */}
            {playerUnit?.concentratingOn && (
              <div className="rounded-lg px-3 py-2 border border-blue-700/40 bg-blue-900/20 text-center">
                <div className="text-[9px] text-blue-400/70 uppercase tracking-wider">Concentrating</div>
                <div className="text-xs font-bold text-blue-300">{playerUnit.concentratingOn}</div>
              </div>
            )}
            {/* Condition badges with reference tooltips */}
            {playerUnit?.conditions && playerUnit.conditions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {playerUnit.conditions.map((c, i) => (
                  <span
                    key={i}
                    className={`text-[9px] font-bold uppercase px-2 py-1 rounded-lg border cursor-help transition-colors ${
                      CONDITION_EFFECTS[c.type]?.color || 'text-slate-400'
                    } border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50`}
                    title={CONDITION_TOOLTIPS[c.type] || CONDITION_EFFECTS[c.type]?.description || c.type}
                  >
                    {c.type}{c.duration > 0 ? ` (${c.duration}r)` : ''}{c.source ? ` - ${c.source}` : ''}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* Exhaustion — D&D 5e cumulative penalties */}
      {(character.exhaustion ?? 0) > 0 && (
        <div className="rounded-lg border border-orange-700/40 bg-orange-900/10 p-2.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider">Exhaustion</span>
            <span className={`text-sm font-black ${
              character.exhaustion >= 5 ? 'text-red-500' :
              character.exhaustion >= 3 ? 'text-orange-400' : 'text-yellow-400'
            }`}>
              Level {character.exhaustion}
            </span>
          </div>
          {/* Level pips */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <div
                key={lvl}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  lvl <= character.exhaustion
                    ? lvl >= 5 ? 'bg-red-500' : lvl >= 3 ? 'bg-orange-500' : 'bg-yellow-500'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          {/* Active penalties */}
          <div className="space-y-0.5">
            {EXHAUSTION_LEVELS.filter((e) => e.level <= character.exhaustion).map((e) => (
              <div key={e.level} className={`text-[9px] ${e.color}`}>
                <span className="font-bold">Lv{e.level}:</span> {e.effect}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gold + Rest */}
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Gold</div>
          <div className="text-lg font-black text-yellow-400">{character.gold}</div>
        </div>
        <button
          onClick={() => restCharacter(character.id, 'short')}
          disabled={character.hp >= character.maxHp || character.condition === 'dead' || (character.hitDiceRemaining ?? character.level) <= 0}
          className="flex-1 rounded-lg bg-blue-900/20 border border-blue-800/40 hover:bg-blue-900/40 disabled:opacity-30 p-2 text-center transition-all"
        >
          <div className="text-[10px] text-blue-400 uppercase tracking-wider font-semibold">Short Rest</div>
          <div className="text-[9px] text-slate-500 mt-0.5">d{HIT_DIE_SIDES[character.class] || 8} + CON</div>
        </button>
        <button
          onClick={() => restCharacter(character.id, 'long')}
          disabled={character.hp >= character.maxHp || character.condition === 'dead'}
          className="flex-1 rounded-lg bg-indigo-900/20 border border-indigo-800/40 hover:bg-indigo-900/40 disabled:opacity-30 p-2 text-center transition-all"
        >
          <div className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold">Long Rest</div>
          <div className="text-[9px] text-slate-500 mt-0.5">Full Heal</div>
        </button>
      </div>

      {/* Hit Dice Tracker */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Hit Dice</span>
          <span className="text-[10px] text-slate-400 font-mono">
            {character.hitDiceRemaining ?? character.level}/{character.level}d{HIT_DIE_SIDES[character.class] || 8}
          </span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: character.level }).map((_, i) => {
            const remaining = character.hitDiceRemaining ?? character.level;
            const isAvailable = i < remaining;
            return (
              <div
                key={i}
                className={`w-6 h-6 rounded border flex items-center justify-center text-[8px] font-bold transition-all ${
                  isAvailable
                    ? 'border-blue-600/50 bg-blue-900/30 text-blue-300'
                    : 'border-slate-700 bg-slate-800/50 text-slate-600'
                }`}
                title={isAvailable ? `Hit die available (d${HIT_DIE_SIDES[character.class] || 8})` : 'Spent'}
              >
                d{HIT_DIE_SIDES[character.class] || 8}
              </div>
            );
          })}
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
          <div className="text-xl font-black text-slate-300">{(() => {
            const playerUnit = units.find((u) => u.characterId === character.id);
            return `${(playerUnit?.speed ?? 6) * 5}ft`;
          })()}</div>
        </div>
        <div className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2.5 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Initiative</div>
          <div className={`text-xl font-black ${modColor(character.stats.DEX)}`}>
            {statModifier(character.stats.DEX)}
          </div>
        </div>
      </div>

      {/* Ability Scores — click to roll check */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Ability Scores</div>
        <div className="grid grid-cols-3 gap-2">
          {STAT_NAMES.map((stat) => {
            const val = character.stats[stat];
            const mod = Math.floor((val - 10) / 2);
            return (
              <button
                key={stat}
                onClick={() => quickRoll(`${stat} Check`, mod)}
                className="rounded-lg bg-slate-800 border border-slate-700 p-2 text-center hover:border-slate-500 hover:bg-slate-750 transition-all cursor-pointer group"
                title={`Roll ${stat} ability check (d20${mod >= 0 ? '+' : ''}${mod})`}
              >
                <div className="text-[9px] text-slate-500 uppercase tracking-wider group-hover:text-slate-300 transition-colors">{stat}</div>
                <div className={`text-lg font-black ${modColor(val)}`}>{val}</div>
                <div className={`text-xs font-bold ${modColor(val)}`}>{mod >= 0 ? `+${mod}` : mod}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Saving Throws — with quick roll */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Saving Throws</div>
        <div className="grid grid-cols-2 gap-1">
          {STAT_NAMES.map((stat) => {
            const val = character.stats[stat];
            const mod = Math.floor((val - 10) / 2);
            const isProficient = saveProficiencies.includes(stat);
            const saveBonus = isProficient ? mod + prof : mod;
            return (
              <button
                key={stat}
                onClick={() => quickRoll(`${stat} Save`, saveBonus)}
                className="flex items-center gap-1.5 text-xs rounded px-1 py-0.5 hover:bg-slate-700/50 transition-colors cursor-pointer group"
                title={`Roll ${stat} saving throw (d20${saveBonus >= 0 ? '+' : ''}${saveBonus})`}
              >
                <div className={`w-2 h-2 rounded-full ${isProficient ? 'bg-[#F38020]' : 'bg-slate-700'}`} />
                <span className="text-slate-400 w-8 group-hover:text-slate-200 transition-colors">{stat}</span>
                <span className={`font-mono font-bold ${saveBonus >= 0 ? 'text-slate-200' : 'text-red-400'}`}>
                  {saveBonus >= 0 ? `+${saveBonus}` : saveBonus}
                </span>
                <span className="text-[8px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">d20</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills — with quick roll */}
      <div>
        <button onClick={() => setShowSkills((s) => !s)} className="w-full flex items-center justify-between mb-2 group">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold group-hover:text-slate-300 transition-colors">
            Skills
          </span>
          <span className="text-[9px] text-slate-600">{showSkills ? '▲' : '▼'}</span>
        </button>
        {showSkills && (
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
            {SKILLS.map((skill) => {
              const mod = Math.floor((character.stats[skill.stat] - 10) / 2);
              const isProficient = (CLASS_SKILL_PROFICIENCIES[character.class] || []).includes(skill.name);
              const bonus = isProficient ? mod + prof : mod;
              return (
                <button
                  key={skill.name}
                  onClick={() => quickRoll(skill.name, bonus)}
                  className="flex items-center gap-1 text-[10px] rounded px-0.5 py-0.5 hover:bg-slate-700/50 transition-colors cursor-pointer group"
                  title={`Roll ${skill.name} check (d20${bonus >= 0 ? '+' : ''}${bonus})`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isProficient ? 'bg-[#F38020]' : 'bg-slate-700'}`} />
                  <span className="text-slate-400 truncate flex-1 text-left group-hover:text-slate-200 transition-colors">{skill.name}</span>
                  <span className={`font-mono font-bold shrink-0 ${bonus >= 0 ? 'text-slate-200' : 'text-red-400'}`}>
                    {bonus >= 0 ? `+${bonus}` : bonus}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {!showSkills && (
          <div className="text-[9px] text-slate-600">
            Passive Perception: {10 + Math.floor((character.stats.WIS - 10) / 2) + ((CLASS_SKILL_PROFICIENCIES[character.class] || []).includes('Perception') ? prof : 0)}
          </div>
        )}
      </div>

      {/* Equipment Slots */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Equipment</div>
        <div className="space-y-1.5">
          {(['weapon', 'armor', 'shield', 'ring'] as EquipSlot[]).map((slot) => {
            const equipped = (character.equipment || EMPTY_EQUIPMENT)[slot];
            const { label, icon } = SLOT_LABELS[slot];
            return (
              <div key={slot} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 border ${equipped ? RARITY_BG[equipped.rarity] : 'border-slate-800'} bg-slate-800/50`}>
                <span className="text-sm w-5 text-center">{icon}</span>
                <div className="flex-1 min-w-0">
                  {equipped ? (
                    <>
                      <div className={`text-xs font-semibold truncate ${RARITY_COLORS[equipped.rarity]}`}>{equipped.name}</div>
                      <div className="text-[9px] text-slate-500">{itemStatLine(equipped)}</div>
                    </>
                  ) : (
                    <div className="text-[10px] text-slate-600 italic">No {label.toLowerCase()}</div>
                  )}
                </div>
                {equipped && (
                  <button
                    onClick={() => unequipItem(character.id, slot)}
                    className="text-[9px] text-slate-500 hover:text-red-400 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-700/50"
                    title={`Unequip ${equipped.name}`}
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory */}
      <div>
        <button
          onClick={() => setShowInventory(!showInventory)}
          className="flex items-center gap-1.5 w-full text-left mb-2 group"
        >
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold group-hover:text-slate-400 transition-colors">
            Inventory ({(character.inventory || []).length})
          </div>
          <span className={`text-[9px] text-slate-600 transition-transform ${showInventory ? 'rotate-90' : ''}`}>▶</span>
        </button>
        {showInventory && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {(character.inventory || []).length === 0 ? (
              <div className="text-[10px] text-slate-600 italic text-center py-2">Empty</div>
            ) : (
              (character.inventory || []).map((item) => (
                <div key={item.id} className={`rounded-lg border ${RARITY_BG[item.rarity]} bg-slate-800/30 px-2.5 py-1.5`}>
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-semibold ${RARITY_COLORS[item.rarity]}`}>
                        {item.name}
                        {item.quantity && item.quantity > 1 && <span className="text-slate-500 ml-1">×{item.quantity}</span>}
                      </div>
                      <div className="text-[9px] text-slate-500">{item.description}</div>
                      {itemStatLine(item) && <div className="text-[9px] text-slate-400 font-mono mt-0.5">{itemStatLine(item)}</div>}
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {item.equipSlot && (
                        <button
                          onClick={() => equipItem(character.id, item.id)}
                          className="text-[9px] text-sky-400 hover:text-sky-300 transition-colors px-1.5 py-0.5 rounded hover:bg-sky-900/30"
                          title="Equip"
                        >
                          Equip
                        </button>
                      )}
                      {(item.type === 'potion' || item.type === 'scroll') && (
                        <button
                          onClick={() => useItem(character.id, item.id)}
                          className="text-[9px] text-green-400 hover:text-green-300 transition-colors px-1.5 py-0.5 rounded hover:bg-green-900/30"
                          title="Use"
                        >
                          Use
                        </button>
                      )}
                      <button
                        onClick={() => removeItem(character.id, item.id)}
                        className="text-[9px] text-slate-500 hover:text-red-400 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-700/50"
                        title="Drop"
                      >
                        Drop
                      </button>
                    </div>
                  </div>
                  <div className="text-[8px] text-yellow-600 mt-0.5">{item.value}g • {item.rarity}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Class ability */}
      {(() => {
        const ability = getClassAbility(character.class);
        if (!ability) return null;
        const colorMap: Record<string, string> = {
          red: 'border-red-700/50 text-red-300', slate: 'border-slate-600/50 text-slate-300',
          yellow: 'border-yellow-700/50 text-yellow-300', green: 'border-green-700/50 text-green-300',
          cyan: 'border-cyan-700/50 text-cyan-300', pink: 'border-pink-700/50 text-pink-300',
          fuchsia: 'border-fuchsia-700/50 text-fuchsia-300', blue: 'border-blue-700/50 text-blue-300',
          amber: 'border-amber-700/50 text-amber-300',
        };
        const colors = colorMap[ability.color] || colorMap.slate;
        return (
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Class Ability</div>
            <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg border bg-slate-800/30 ${colors}`}>
              <div>
                <div className="text-xs font-semibold">{ability.name}</div>
                <div className="text-[9px] text-slate-500">{ability.description}</div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className={`text-[9px] font-bold ${character.classAbilityUsed ? 'text-red-400' : 'text-green-400'}`}>
                  {character.classAbilityUsed ? 'Used' : 'Ready'}
                </div>
                <div className="text-[8px] text-slate-600">{ability.resetsOn} rest</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Feats */}
      {(character.feats || []).length > 0 && (
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Feats</div>
          <div className="space-y-1.5">
            {(character.feats || []).map((featId) => {
              const feat = FEATS.find((f) => f.id === featId);
              if (!feat) return null;
              return (
                <div key={featId} className="flex items-center justify-between px-2 py-1.5 rounded-lg border border-purple-700/30 bg-purple-900/10">
                  <div>
                    <div className="text-xs font-semibold text-purple-300">{feat.name}</div>
                    <div className="text-[9px] text-slate-500">{feat.description}</div>
                  </div>
                  <div className="flex gap-1 shrink-0 ml-2">
                    {feat.initiativeBonus && <span className="text-[8px] px-1 py-0.5 bg-yellow-900/40 text-yellow-300 rounded">+{feat.initiativeBonus} init</span>}
                    {feat.damageBonus && <span className="text-[8px] px-1 py-0.5 bg-orange-900/40 text-orange-300 rounded">+{feat.damageBonus} dmg</span>}
                    {feat.maxHpPerLevel && <span className="text-[8px] px-1 py-0.5 bg-red-900/40 text-red-300 rounded">+{feat.maxHpPerLevel} HP/lv</span>}
                    {feat.attackBonus && <span className="text-[8px] px-1 py-0.5 bg-blue-900/40 text-blue-300 rounded">+{feat.attackBonus} atk</span>}
                    {feat.savingThrowBonus && <span className="text-[8px] px-1 py-0.5 bg-green-900/40 text-green-300 rounded">+{feat.savingThrowBonus} saves</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ASI pending indicator */}
      {hasPendingASI(character) && (
        <div className="px-2 py-1.5 rounded-lg border border-amber-600/40 bg-amber-900/20 text-center">
          <span className="text-xs font-bold text-amber-300 animate-pulse">Ability Score Improvement available!</span>
        </div>
      )}

      {/* Spellbook (for casters) */}
      {[...FULL_CASTERS, ...HALF_CASTERS].includes(character.class) && (() => {
        const slots = getSpellSlots(character.class, character.level);
        const used = character.spellSlotsUsed || {};
        const spells = getClassSpells(character.class, character.level);

        // Spell save DC and attack bonus
        const castingStat = CASTING_STAT[character.class];
        const castMod = castingStat ? Math.floor((character.stats[castingStat] - 10) / 2) : 0;
        const spellDC = 8 + prof + castMod;
        const spellAttack = prof + castMod;

        // Collect unique schools for filter
        const schools = [...new Set(spells.map((s) => s.school))].sort();

        return (
          <SpellbookSection
            spells={spells}
            slots={slots}
            used={used}
            schools={schools}
            castingStat={castingStat}
            spellDC={spellDC}
            spellAttack={spellAttack}
            prof={prof}
            castMod={castMod}
            onToggleSlot={toggleSpellSlot}
          />
        );
      })()}
    </div>
  );
}
