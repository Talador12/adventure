// EncounterSlotTracker — shows spell slots used THIS encounter vs total.
// Captures a snapshot of spellSlotsUsed when combat starts, displays the delta.
// "The wizard started this fight with 3 third-level slots. Now they have 1."
import { useState, useEffect, useRef, useMemo } from 'react';
import type { Character, CharacterClass } from '../../types/game';

interface EncounterSlotTrackerProps {
  characters: Character[];
  inCombat: boolean;
  getSpellSlots: (cls: CharacterClass, level: number) => Record<number, number>;
}

export default function EncounterSlotTracker({ characters, inCombat, getSpellSlots }: EncounterSlotTrackerProps) {
  // Snapshot of spellSlotsUsed at combat start
  const snapshotRef = useRef<Record<string, Record<number, number>>>({});
  const prevCombat = useRef(false);

  useEffect(() => {
    if (inCombat && !prevCombat.current) {
      // Combat just started — snapshot current slot usage
      const snap: Record<string, Record<number, number>> = {};
      for (const c of characters) {
        snap[c.id] = { ...(c.spellSlotsUsed || {}) };
      }
      snapshotRef.current = snap;
    }
    prevCombat.current = inCombat;
  }, [inCombat, characters]);

  const casters = useMemo(() =>
    characters.filter((c) => {
      const slots = getSpellSlots(c.class, c.level);
      return Object.keys(slots).length > 0;
    }),
    [characters, getSpellSlots]
  );

  if (!inCombat || casters.length === 0) return null;

  return (
    <div className="flex gap-2 px-3 py-1 border-t border-slate-800/50 bg-slate-900/20 overflow-x-auto text-[8px]">
      {casters.map((c) => {
        const maxSlots = getSpellSlots(c.class, c.level);
        const startUsed = snapshotRef.current[c.id] || {};
        const currentUsed = c.spellSlotsUsed || {};
        // Delta: slots used this encounter
        const encounterUsed = Object.keys(maxSlots).reduce((sum, lvl) => {
          const l = Number(lvl);
          return sum + Math.max(0, (currentUsed[l] || 0) - (startUsed[l] || 0));
        }, 0);
        const totalMax = Object.values(maxSlots).reduce((s, v) => s + v, 0);
        const totalCurrent = totalMax - Object.values(currentUsed).reduce((s, v) => s + v, 0);

        if (totalMax === 0) return null;

        return (
          <div key={c.id} className="flex items-center gap-1 shrink-0">
            <span className="text-slate-400 font-semibold truncate max-w-[50px]">{c.name}</span>
            <div className="flex gap-px">
              {Object.entries(maxSlots).sort(([a], [b]) => Number(a) - Number(b)).map(([lvl, max]) => {
                const used = currentUsed[Number(lvl)] || 0;
                const available = max - used;
                return (
                  <div key={lvl} className="flex gap-px" title={`Level ${lvl}: ${available}/${max}`}>
                    {Array.from({ length: max }, (_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-3 rounded-sm ${
                          i < available ? 'bg-violet-500/60' : 'bg-slate-700/60'
                        }`}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
            {encounterUsed > 0 && (
              <span className="text-amber-400">-{encounterUsed}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
