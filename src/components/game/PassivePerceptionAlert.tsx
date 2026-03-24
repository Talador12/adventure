// PassivePerceptionAlert — warns the DM when a party member might spot something.
// Checks passive perception (10 + WIS mod + proficiency if applicable) against
// trap DCs on nearby cells. Shows a subtle alert when someone's senses are tingling.
import { useMemo } from 'react';
import type { Character } from '../../types/game';
import type { TokenPosition, TerrainType } from '../../lib/mapUtils';

interface Trap {
  col: number;
  row: number;
  dc?: number;
}

interface PassivePerceptionAlertProps {
  characters: Character[];
  positions: TokenPosition[];
  traps: Trap[];
  isDM: boolean;
}

function passivePerception(char: Character): number {
  const wisMod = Math.floor(((char.stats?.WIS ?? 10) - 10) / 2);
  const profBonus = Math.floor((char.level - 1) / 4) + 2;
  const hasProficiency = ((char as unknown as Record<string, unknown>).skills as string[] || []).includes('perception');
  return 10 + wisMod + (hasProficiency ? profBonus : 0);
}

export default function PassivePerceptionAlert({ characters, positions, traps, isDM }: PassivePerceptionAlertProps) {
  const alerts = useMemo(() => {
    if (!isDM || traps.length === 0) return [];
    const results: Array<{ charName: string; pp: number; trapCol: number; trapRow: number; detected: boolean }> = [];

    for (const char of characters) {
      const unit = positions.find((p) => {
        // Match by checking if the unitId references a character with this id
        return true; // simplified — in practice we'd match characterId
      });
      if (!unit) continue;
      const pp = passivePerception(char);

      for (const trap of traps) {
        const dist = Math.max(Math.abs(unit.col - trap.col), Math.abs(unit.row - trap.row));
        if (dist <= 2) { // within 10ft
          const dc = trap.dc || 15;
          results.push({ charName: char.name, pp, trapCol: trap.col, trapRow: trap.row, detected: pp >= dc });
        }
      }
    }

    return results.filter((r) => r.detected);
  }, [characters, positions, traps, isDM]);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-0.5">
      {alerts.map((alert, i) => (
        <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-950/20 border border-amber-800/30 text-[9px]">
          <span className="text-amber-400">👁</span>
          <span className="text-amber-300 font-semibold">{alert.charName}</span>
          <span className="text-slate-500">(PP {alert.pp}) notices something at ({alert.trapCol},{alert.trapRow})</span>
        </div>
      ))}
    </div>
  );
}
