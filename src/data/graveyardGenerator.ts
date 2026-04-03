// Random graveyard generator — tombstones with epitaphs and secrets.
export interface Tombstone { name: string; epitaph: string; yearsAgo: number; secret: string | null; }
const NAMES = ['Aldric Stonehelm', 'Sera Nightbloom', 'Gundren Rockseeker', 'Lady Mirabel', 'Brother Aldous', 'Captain Ironhull', 'Old Tom', 'The Unnamed', 'Velaris Moonshadow', 'Pip Shortwick'];
const EPITAPHS = ['"Rest now, weary traveler"', '"Gone but never forgotten"', '"Taken too soon by the darkness"', '"Beloved parent and friend"', '"They died doing what they loved — fighting"', '"May the gods have mercy"', '"Here lies a hero"', '"Do not weep for me, for I am free"', '"KEEP OUT" (scratched into the stone)'];
const SECRETS = ['The grave is empty — the body was never found.', 'Scratching sounds come from below on full moons.', 'The tombstone has a hidden compartment with a letter.', 'This person is still alive, hiding under a new identity.', 'The grave contains a cursed item — Detect Magic reveals it.', null, null, null, null, null];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function generateTombstone(): Tombstone { return { name: pick(NAMES), epitaph: pick(EPITAPHS), yearsAgo: 1 + Math.floor(Math.random() * 200), secret: pick(SECRETS) }; }
export function generateGraveyard(count: number = 4): Tombstone[] { return Array.from({ length: count }, () => generateTombstone()); }
export function formatGraveyard(stones: Tombstone[]): string { const lines = ['⚰️ **Graveyard:**']; for (const s of stones) { lines.push(`🪦 **${s.name}** (${s.yearsAgo} years ago)`); lines.push(`  *${s.epitaph}*`); if (s.secret) lines.push(`  🤫 ${s.secret}`); } return lines.join('\n'); }
