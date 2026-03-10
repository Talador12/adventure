// CharacterSheet — side panel showing selected character's full stats, HP, conditions, equipment, and inventory.
import { type Character, STAT_NAMES, type StatName, XP_THRESHOLDS, useGame, type EquipSlot, type Item, RARITY_COLORS, RARITY_BG, EMPTY_EQUIPMENT, getClassSpells, getSpellSlots, FULL_CASTERS, HALF_CASTERS, getClassAbility, FEATS, hasPendingASI } from '../../contexts/GameContext';
import { useState } from 'react';

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

export default function CharacterSheet({ character }: CharacterSheetProps) {
  const { restCharacter, equipItem, unequipItem, useItem, removeItem, units } = useGame();
  const [showInventory, setShowInventory] = useState(false);
  const prof = proficiencyBonus(character.level);
  const saveProficiencies = CLASS_SAVE_PROFICIENCIES[character.class] || [];

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

      {/* Concentration indicator */}
      {(() => {
        const playerUnit = units.find((u) => u.characterId === character.id);
        if (!playerUnit?.concentratingOn) return null;
        return (
          <div className="rounded-lg px-3 py-2 border border-blue-700/40 bg-blue-900/20 text-center">
            <div className="text-[9px] text-blue-400/70 uppercase tracking-wider">Concentrating</div>
            <div className="text-xs font-bold text-blue-300">{playerUnit.concentratingOn}</div>
          </div>
        );
      })()}

      {/* Gold + Rest */}
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Gold</div>
          <div className="text-lg font-black text-yellow-400">{character.gold}</div>
        </div>
        <button
          onClick={() => restCharacter(character.id, 'short')}
          disabled={character.hp >= character.maxHp || character.condition === 'dead'}
          className="flex-1 rounded-lg bg-blue-900/20 border border-blue-800/40 hover:bg-blue-900/40 disabled:opacity-30 p-2 text-center transition-all"
        >
          <div className="text-[10px] text-blue-400 uppercase tracking-wider font-semibold">Short Rest</div>
          <div className="text-[9px] text-slate-500 mt-0.5">Hit Die + CON</div>
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
        const cantrips = spells.filter((s) => s.level === 0);
        const leveled = spells.filter((s) => s.level > 0);

        return (
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Spellbook</div>

            {/* Spell slots */}
            {Object.keys(slots).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {Object.entries(slots).map(([lvl, max]) => {
                  const usedCount = used[Number(lvl)] || 0;
                  const remaining = max - usedCount;
                  return (
                    <div key={lvl} className="text-center">
                      <div className="text-[8px] text-slate-600 mb-0.5">Lv{lvl}</div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: max }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded border flex items-center justify-center ${
                              i < remaining
                                ? 'border-purple-600/50 bg-purple-900/30'
                                : 'border-slate-700 bg-slate-800/50'
                            }`}
                          >
                            {i < remaining && <div className="w-2 h-2 rounded-full bg-purple-400" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Cantrips */}
            {cantrips.length > 0 && (
              <div className="mb-1.5">
                <div className="text-[9px] text-slate-600 mb-1">Cantrips</div>
                <div className="space-y-0.5">
                  {cantrips.map((s) => (
                    <div key={s.id} className="flex items-center justify-between text-[10px] px-2 py-0.5 rounded bg-slate-800/30">
                      <span className="text-slate-300 font-medium">{s.name}</span>
                      <span className="text-slate-500">{s.damage || s.description.slice(0, 20)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leveled spells */}
            {leveled.length > 0 && (
              <div>
                <div className="text-[9px] text-slate-600 mb-1">Spells</div>
                <div className="space-y-0.5">
                  {leveled.map((s) => {
                    const slotsAvail = (slots[s.level] || 0) - (used[s.level] || 0);
                    return (
                      <div key={s.id} className={`flex items-center justify-between text-[10px] px-2 py-0.5 rounded bg-slate-800/30 ${slotsAvail <= 0 ? 'opacity-40' : ''}`}>
                        <span className="text-purple-300 font-medium">{s.name}</span>
                        <span className="text-slate-500">Lv{s.level} • {s.damage || (s.healAmount ? `+${s.healAmount}HP` : s.range)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
