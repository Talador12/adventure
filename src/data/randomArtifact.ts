// Random artifact generator — legendary items with history and drawbacks.
export interface Artifact { name: string; type: string; power: string; history: string; drawback: string; attunement: boolean; }
const NAMES_A = ['The', 'Cursed', 'Lost', 'Eternal', 'Shattered', 'Burning', 'Frozen'];
const NAMES_B = ['Crown', 'Blade', 'Eye', 'Heart', 'Scepter', 'Chalice', 'Tome', 'Ring', 'Amulet', 'Orb'];
const NAMES_C = ['of the Forgotten King', 'of Eternal Night', 'of the First Dragon', 'of Undying Flame', 'of the Void', 'of the World Tree', 'of Shattered Fate'];
const POWERS = ['Grants one Wish per year.', 'The wielder cannot die while holding it (drop to 1 HP instead, once/day).', 'Can cast any 5th-level or lower spell once per dawn.', 'Telepathy with all creatures within 1 mile.', 'The wielder ages backward 1 year per month.', 'Controls the weather in a 5-mile radius.', 'Summons a spectral army of 100 soldiers for 1 hour (once ever).'];
const HISTORIES = ['Created by a god during the Dawn War.', 'Forged by a mad artificer who disappeared after completing it.', 'Passed between kings for a thousand years, each dying mysteriously.', 'Found in a meteor that crashed during an eclipse.', 'Made from the bones of a primordial titan.'];
const DRAWBACKS = ['Whispers madness to the wielder (WIS save DC 15 daily or short-term madness).', 'Slowly turns the wielder to stone (1% per day of use).', 'Attracts powerful enemies who sense its presence.', 'Demands a sacrifice of blood (1d6 necrotic) to activate.', 'The wielder can never willingly part with it (cursed).', 'Erases one random memory each time it\'s used.'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function generateArtifact(): Artifact { return { name: `${pick(NAMES_A)} ${pick(NAMES_B)} ${pick(NAMES_C)}`, type: pick(['weapon', 'armor', 'wondrous item', 'ring', 'staff']), power: pick(POWERS), history: pick(HISTORIES), drawback: pick(DRAWBACKS), attunement: true }; }
export function formatArtifact(a: Artifact): string { return `⭐ **${a.name}** (${a.type}, requires attunement)\n📖 *${a.history}*\n💪 Power: ${a.power}\n⚠️ Drawback: ${a.drawback}`; }
