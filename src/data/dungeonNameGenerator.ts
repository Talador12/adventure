// Random dungeon name generator — procedural names from word parts.

const PREFIXES = ['The', 'The Cursed', 'The Forgotten', 'The Lost', 'The Abandoned', 'The Hidden', 'The Sunken', 'The Burning', 'The Frozen', 'The Shadow', 'The Crimson', 'The Ancient', 'The Haunted', 'The Ruined', 'The Endless'];
const DESCRIPTORS = ['Dark', 'Deep', 'Twisted', 'Shattered', 'Echoing', 'Whispering', 'Bleeding', 'Screaming', 'Silent', 'Rotting', 'Glowing', 'Crumbling', 'Shifting', 'Winding', 'Thorned'];
const NOUNS = ['Crypt', 'Tomb', 'Labyrinth', 'Dungeon', 'Catacombs', 'Mines', 'Caverns', 'Keep', 'Fortress', 'Sanctum', 'Vault', 'Halls', 'Depths', 'Pits', 'Ruins', 'Temple', 'Tower', 'Lair', 'Chambers', 'Abyss'];
const SUFFIXES = ['of Doom', 'of Despair', 'of Shadows', 'of the Dead', 'of the Damned', 'of Madness', 'of the Lost', 'of Eternal Night', 'of Bones', 'of Sorrow', 'of the Forgotten King', 'of the Dragon', 'of Whispers', 'of Blood', 'of the Lich'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export type DungeonNameStyle = 'epic' | 'simple' | 'descriptive';

export function generateDungeonName(style: DungeonNameStyle = 'epic'): string {
  switch (style) {
    case 'simple': return `${pick(PREFIXES)} ${pick(NOUNS)}`;
    case 'descriptive': return `${pick(PREFIXES)} ${pick(DESCRIPTORS)} ${pick(NOUNS)}`;
    case 'epic': return `${pick(PREFIXES)} ${pick(DESCRIPTORS)} ${pick(NOUNS)} ${pick(SUFFIXES)}`;
  }
}

export function generateMultipleDungeonNames(count: number = 5, style: DungeonNameStyle = 'epic'): string[] {
  return Array.from({ length: count }, () => generateDungeonName(style));
}

export function formatDungeonNames(count: number = 8): string {
  const lines = ['🏰 **Dungeon Names:**'];
  lines.push('**Epic:**');
  for (const n of generateMultipleDungeonNames(3, 'epic')) lines.push(`  • ${n}`);
  lines.push('**Descriptive:**');
  for (const n of generateMultipleDungeonNames(3, 'descriptive')) lines.push(`  • ${n}`);
  lines.push('**Simple:**');
  for (const n of generateMultipleDungeonNames(2, 'simple')) lines.push(`  • ${n}`);
  return lines.join('\n');
}
