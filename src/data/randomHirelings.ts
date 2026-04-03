// Random hireling generator — NPCs the party can hire for specific tasks.
export interface Hireling { name: string; role: string; dailyWage: number; skill: string; quirk: string; loyalty: 'reliable' | 'fair-weather' | 'untrustworthy'; }
const ROLES = ['Torchbearer', 'Porter (carries loot)', 'Cook', 'Guide (local knowledge)', 'Translator', 'Healer\'s assistant', 'Animal handler', 'Locksmith', 'Scribe', 'Bodyguard'];
const NAMES = ['Pip', 'Greta', 'Milo', 'Hilda', 'Jem', 'Nora', 'Wren', 'Burt', 'Tansy', 'Ollo'];
const SKILLS = ['Surprisingly brave for a commoner', 'Knows every trail in the region', 'Can cook a feast from nothing', 'Fluent in 3 languages', 'Former soldier — handles weapons', 'Good with animals', 'Excellent memory for details', 'Light sleeper — good on watch'];
const QUIRKS = ['Talks constantly', 'Afraid of the dark (not ideal for a torchbearer)', 'Steals small trinkets without realizing', 'Prays before every meal — loudly', 'Tells outrageous lies about their past', 'Allergic to horses', 'Hums the same tune endlessly', 'Falls asleep at inappropriate times'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function generateHireling(): Hireling { return { name: pick(NAMES), role: pick(ROLES), dailyWage: 1 + Math.floor(Math.random() * 5), skill: pick(SKILLS), quirk: pick(QUIRKS), loyalty: pick(['reliable', 'reliable', 'fair-weather', 'untrustworthy']) }; }
export function generateHirelingRoster(count: number = 3): Hireling[] { return Array.from({ length: count }, () => generateHireling()); }
export function formatHirelings(hirelings: Hireling[]): string { const lines = ['👥 **Available Hirelings:**']; for (const h of hirelings) { const loyaltyIcon = h.loyalty === 'reliable' ? '🟢' : h.loyalty === 'fair-weather' ? '🟡' : '🔴'; lines.push(`${loyaltyIcon} **${h.name}** — ${h.role} (${h.dailyWage}gp/day, ${h.loyalty})`); lines.push(`  💪 ${h.skill}`); lines.push(`  🎭 ${h.quirk}`); } return lines.join('\n'); }
