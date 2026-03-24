// MapExplorationTracker — shows what percentage of the map has been explored.
// Counts explored cells vs total floor cells (excludes walls and void).
// "You've seen 34% of this dungeon. The other 66% has opinions about that."
import { useMemo } from 'react';

interface MapExplorationTrackerProps {
  explored: boolean[][];
  terrain: string[][];
}

export default function MapExplorationTracker({ explored, terrain }: MapExplorationTrackerProps) {
  const { total, seen, pct } = useMemo(() => {
    let total = 0;
    let seen = 0;
    for (let r = 0; r < terrain.length; r++) {
      for (let c = 0; c < (terrain[r]?.length || 0); c++) {
        const t = terrain[r][c];
        if (t !== 'wall' && t !== 'void') {
          total++;
          if (explored[r]?.[c]) seen++;
        }
      }
    }
    return { total, seen, pct: total > 0 ? Math.round((seen / total) * 100) : 0 };
  }, [explored, terrain]);

  if (total === 0) return null;

  return (
    <div className="flex items-center gap-1.5 text-[8px]" title={`${seen}/${total} cells explored`}>
      <span className="text-slate-600">Explored:</span>
      <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-sky-500/60 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sky-400 font-mono">{pct}%</span>
    </div>
  );
}
