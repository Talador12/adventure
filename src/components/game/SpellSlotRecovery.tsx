// SpellSlotRecovery — short rest spell slot recovery panel.
// Wizard Arcane Recovery: recover up to ceil(level/2) spell slot levels (once per long rest).
// Warlock Pact Magic: recover ALL slots on short rest (automatic).
// Shows current/max slots per level with recovery controls.
import { useState, useMemo } from 'react';
import type { Character, CharacterClass } from '../../types/game';

interface SpellSlotRecoveryProps {
  character: Character;
  getSpellSlots: (cls: CharacterClass, level: number) => Record<number, number>;
  onRecover: (charId: string, slotsToRecover: Record<number, number>) => void;
}

export default function SpellSlotRecovery({ character, getSpellSlots, onRecover }: SpellSlotRecoveryProps) {
  const slots = useMemo(() => getSpellSlots(character.class, character.level), [character.class, character.level, getSpellSlots]);
  const used = character.spellSlotsUsed || {};
  const isWarlock = character.class === 'Warlock';
  const isWizard = character.class === 'Wizard';
  const maxRecoveryLevels = isWizard ? Math.ceil(character.level / 2) : 0;

  const [selectedRecovery, setSelectedRecovery] = useState<Record<number, number>>({});

  const totalSelectedLevels = Object.entries(selectedRecovery).reduce((sum, [lvl, count]) => sum + Number(lvl) * count, 0);
  const hasUsedSlots = Object.values(used).some((v) => v > 0);

  if (Object.keys(slots).length === 0) return null;

  const recoverWarlock = () => {
    onRecover(character.id, Object.fromEntries(Object.keys(slots).map((lvl) => [Number(lvl), used[Number(lvl)] || 0])));
  };

  const recoverWizard = () => {
    if (totalSelectedLevels === 0 || totalSelectedLevels > maxRecoveryLevels) return;
    onRecover(character.id, selectedRecovery);
    setSelectedRecovery({});
  };

  return (
    <div className="space-y-1.5 border-t border-slate-700/50 pt-2 mt-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Spell Slots</label>
        {isWarlock && hasUsedSlots && (
          <button onClick={recoverWarlock} className="text-[8px] text-violet-400 hover:text-violet-300 font-semibold" title="Pact Magic: recover all slots on short rest">
            Pact Magic
          </button>
        )}
      </div>
      <div className="space-y-1">
        {Object.entries(slots).sort(([a], [b]) => Number(a) - Number(b)).map(([lvlStr, max]) => {
          const lvl = Number(lvlStr);
          const usedCount = used[lvl] || 0;
          const available = max - usedCount;
          const recovering = selectedRecovery[lvl] || 0;
          return (
            <div key={lvl} className="flex items-center gap-2">
              <span className="text-[9px] text-slate-400 w-6 shrink-0">Lv{lvl}</span>
              <div className="flex gap-0.5 flex-1">
                {Array.from({ length: max }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      i < available
                        ? 'border-violet-500/60 bg-violet-600/40'
                        : i < available + recovering
                          ? 'border-emerald-500/60 bg-emerald-600/40 animate-pulse'
                          : 'border-slate-700 bg-slate-800/40'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[8px] text-slate-600 w-8 text-right">{available}/{max}</span>
              {isWizard && usedCount > recovering && (
                <button
                  onClick={() => {
                    if (totalSelectedLevels + lvl <= maxRecoveryLevels) {
                      setSelectedRecovery((prev) => ({ ...prev, [lvl]: (prev[lvl] || 0) + 1 }));
                    }
                  }}
                  disabled={totalSelectedLevels + lvl > maxRecoveryLevels}
                  className="text-[7px] px-1 py-0 rounded border border-emerald-700/40 text-emerald-500 hover:text-emerald-400 disabled:opacity-30 transition-all"
                  title={`Recover 1 level ${lvl} slot (${totalSelectedLevels + lvl}/${maxRecoveryLevels} recovery levels)`}
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>
      {isWizard && totalSelectedLevels > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-[8px] text-emerald-500">{totalSelectedLevels}/{maxRecoveryLevels} levels selected</span>
          <div className="flex gap-1">
            <button onClick={() => setSelectedRecovery({})} className="text-[8px] text-slate-600 hover:text-slate-400">Clear</button>
            <button onClick={recoverWizard} className="text-[8px] px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 font-semibold">
              Recover
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
