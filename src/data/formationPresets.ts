// Party formation presets — pre-built tactical formations.

export interface FormationPreset { name: string; emoji: string; description: string; positions: { role: string; relCol: number; relRow: number }[]; bestFor: string; }

export const FORMATION_PRESETS: FormationPreset[] = [
  { name: 'Line', emoji: '➡️', description: 'Side by side. Maximum frontage, all melee can engage.', positions: [{ role: 'Tank', relCol: -1, relRow: 0 }, { role: 'Melee', relCol: 0, relRow: 0 }, { role: 'Melee', relCol: 1, relRow: 0 }, { role: 'Ranged', relCol: 0, relRow: 1 }], bestFor: 'Open terrain, wide corridors' },
  { name: 'Column', emoji: '⬇️', description: 'Single file. Narrow passages, one front.', positions: [{ role: 'Scout', relCol: 0, relRow: -2 }, { role: 'Tank', relCol: 0, relRow: -1 }, { role: 'Melee', relCol: 0, relRow: 0 }, { role: 'Caster', relCol: 0, relRow: 1 }], bestFor: 'Narrow corridors, dungeon hallways' },
  { name: 'Wedge', emoji: '🔺', description: 'Pointed formation. Breaks through enemy lines.', positions: [{ role: 'Tank', relCol: 0, relRow: -1 }, { role: 'Melee', relCol: -1, relRow: 0 }, { role: 'Melee', relCol: 1, relRow: 0 }, { role: 'Caster', relCol: 0, relRow: 1 }], bestFor: 'Charging into enemies, breaking formations' },
  { name: 'Diamond', emoji: '🔷', description: 'All-around defense. Caster protected in center.', positions: [{ role: 'Tank', relCol: 0, relRow: -1 }, { role: 'Melee', relCol: -1, relRow: 0 }, { role: 'Caster', relCol: 0, relRow: 0 }, { role: 'Melee', relCol: 1, relRow: 0 }, { role: 'Guard', relCol: 0, relRow: 1 }], bestFor: 'Open terrain, surrounded, protecting casters' },
  { name: 'Circle', emoji: '⭕', description: 'Defensive ring. Faces all directions.', positions: [{ role: 'Any', relCol: 0, relRow: -1 }, { role: 'Any', relCol: 1, relRow: 0 }, { role: 'Any', relCol: 0, relRow: 1 }, { role: 'Any', relCol: -1, relRow: 0 }], bestFor: 'Last stand, surrounded by enemies' },
  { name: 'Skirmish', emoji: '💨', description: 'Spread out. Minimizes AoE damage.', positions: [{ role: 'Any', relCol: -2, relRow: -1 }, { role: 'Any', relCol: 1, relRow: -2 }, { role: 'Any', relCol: 2, relRow: 1 }, { role: 'Any', relCol: -1, relRow: 2 }], bestFor: 'Against spellcasters, avoiding AoE' },
];

export function getFormation(name: string): FormationPreset | undefined { return FORMATION_PRESETS.find((f) => f.name.toLowerCase() === name.toLowerCase()); }

export function formatFormationPresets(): string {
  const lines = ['📐 **Formation Presets:**'];
  for (const f of FORMATION_PRESETS) lines.push(`${f.emoji} **${f.name}**: ${f.description}\n  Best for: ${f.bestFor} (${f.positions.length} positions)`);
  return lines.join('\n');
}
