// Tactical map annotation markers — strategic markers DMs can place on the battle map.
// Extends the existing pin/annotation system with tactical-specific markers.

export type TacticalMarkerType = 'danger' | 'objective' | 'rally' | 'flank' | 'retreat' | 'hold' | 'ambush';

export interface TacticalMarker {
  type: TacticalMarkerType;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

export const TACTICAL_MARKERS: TacticalMarker[] = [
  { type: 'danger', label: 'Danger', emoji: '⚠️', color: '#ef4444', description: 'Mark hazardous areas — avoid or approach with caution' },
  { type: 'objective', label: 'Objective', emoji: '🎯', color: '#f59e0b', description: 'The primary goal — what to protect or reach' },
  { type: 'rally', label: 'Rally', emoji: '🏁', color: '#22c55e', description: 'Fall-back point — regroup here if things go wrong' },
  { type: 'flank', label: 'Flank', emoji: '🗡️', color: '#a855f7', description: 'Flanking route — approach enemies from this side' },
  { type: 'retreat', label: 'Retreat', emoji: '🏃', color: '#3b82f6', description: 'Escape route — the way out if you need to run' },
  { type: 'hold', label: 'Hold', emoji: '🛡️', color: '#64748b', description: 'Hold this position — chokepoint or defensive line' },
  { type: 'ambush', label: 'Ambush', emoji: '👁️', color: '#e11d48', description: 'Ambush zone — hidden enemies or surprise attack position' },
];

export function getMarker(type: TacticalMarkerType): TacticalMarker {
  return TACTICAL_MARKERS.find((m) => m.type === type) || TACTICAL_MARKERS[0];
}

export function markerToPin(marker: TacticalMarker, col: number, row: number, createdBy: string): {
  id: string;
  col: number;
  row: number;
  label: string;
  color: string;
  icon: string;
  createdBy: string;
  type: 'pin';
} {
  return {
    id: crypto.randomUUID(),
    col,
    row,
    label: marker.label,
    color: marker.color,
    icon: marker.emoji,
    createdBy,
    type: 'pin',
  };
}
