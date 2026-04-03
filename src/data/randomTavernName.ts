// Random tavern name generator — quick tavern names from word parts.
const ADJ = ['Rusty', 'Golden', 'Drunken', 'Prancing', 'Sleeping', 'Laughing', 'Crooked', 'Jolly', 'Weary', 'Burning', 'Silver', 'Blind', 'Wandering', 'Lucky', 'Broken'];
const NOUN = ['Dragon', 'Pony', 'Giant', 'Goblet', 'Stag', 'Maiden', 'Barrel', 'Crow', 'Anvil', 'Tankard', 'Hound', 'Phoenix', 'Boar', 'Mermaid', 'Hammer'];
export function generateTavernName(): string { return `The ${ADJ[Math.floor(Math.random() * ADJ.length)]} ${NOUN[Math.floor(Math.random() * NOUN.length)]}`; }
export function generateMultipleTavernNames(count: number = 5): string[] { return Array.from({ length: count }, () => generateTavernName()); }
export function formatTavernNames(count: number = 5): string { return `🍺 **Tavern Names:**\n${generateMultipleTavernNames(count).map((n) => `  • ${n}`).join('\n')}`; }
