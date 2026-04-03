// Random dungeon feature — interesting details for dungeon exploration.
export interface DungeonFeature { feature: string; interactive: boolean; check: string | null; result: string | null; }
const FEATURES: DungeonFeature[] = [
  { feature: 'A mosaic on the floor depicting a battle. Some tiles are loose.', interactive: true, check: 'Investigation DC 13', result: 'A hidden compartment under a loose tile contains a key.' },
  { feature: 'A fountain that still flows with clear water. Strange for a ruin.', interactive: true, check: 'Arcana DC 12', result: 'The water is enchanted. Drinking it restores 1d4 HP (once per person).' },
  { feature: 'Claw marks on the ceiling. Something large climbs up there.', interactive: false, check: null, result: null },
  { feature: 'A row of stone faces carved into the wall. Their expressions change when you look away.', interactive: true, check: 'Perception DC 15', result: 'One face has a gemstone (25gp) for an eye. Removing it triggers a dart trap (DC 12).' },
  { feature: 'A pile of bones in the corner, neatly stacked. Someone organized them.', interactive: true, check: 'Medicine DC 11', result: 'These are animal bones, not humanoid. A nest, not a massacre.' },
  { feature: 'The air is warmer here. The stone walls radiate heat.', interactive: false, check: null, result: null },
  { feature: 'A mirror on the wall. Your reflection moves a half-second behind you.', interactive: true, check: 'Arcana DC 14', result: 'The mirror is a portal. Touching it transports you to a hidden room.' },
  { feature: 'Iron chains hanging from the ceiling, swaying gently in a breeze that isn\'t there.', interactive: false, check: null, result: null },
  { feature: 'A perfectly preserved meal on a stone table. It smells fresh.', interactive: true, check: 'Detect Magic or Arcana DC 13', result: 'Preserved by magic. Edible and nutritious — or possibly cursed.' },
  { feature: 'Scratch marks on the walls at knee height. Something was dragged.', interactive: true, check: 'Survival DC 12', result: 'Following the marks leads to a hidden passage behind a false wall.' },
];
export function getRandomDungeonFeature(): DungeonFeature { return FEATURES[Math.floor(Math.random() * FEATURES.length)]; }
export function formatDungeonFeature(f: DungeonFeature): string { const lines = [`🏰 **Dungeon Feature:**\n*${f.feature}*`]; if (f.interactive && f.check) lines.push(`🎲 ${f.check}`); if (f.result) lines.push(`📍 ${f.result}`); return lines.join('\n'); }
