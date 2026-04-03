// Random festival generator — town events with games and competitions.
export interface Festival { name: string; occasion: string; events: string[]; prize: string; atmosphere: string; }
const NAMES = ['Harvest Moon Festival', 'Dragon\'s Day', 'The Grand Tournament', 'Festival of Lights', 'Midsummer Revelry', 'Winterfeast', 'The Masquerade Ball', 'Founders\' Day', 'The Arcane Fair', 'The Beast Hunt'];
const OCCASIONS = ['Annual harvest celebration', 'Commemoration of a legendary hero', 'Religious holiday honoring a deity', 'Coronation anniversary', 'Seasonal solstice', 'Centennial founding celebration'];
const EVENTS = ['Archery contest (DEX DC 15)', 'Arm wrestling tournament (Athletics DC 14)', 'Pie-eating contest (CON DC 12)', 'Bardic competition (Performance DC 13)', 'Horse race (Animal Handling DC 14)', 'Magic show (Arcana DC 12 to participate)', 'Drinking contest (CON DC 13, escalating)', 'Riddle contest (INT DC 13)', 'Dance-off (Acrobatics DC 12)', 'Scavenger hunt (Investigation DC 11)'];
const PRIZES = ['50gp purse', 'A magic trinket', 'Title of Champion (1 year)', 'Free room and board for a month', 'A fine weapon (+1 longsword)', 'The mayor\'s personal favor'];
const ATMOSPHERES = ['Joyous crowds, music everywhere', 'Tense — political undercurrents', 'Family-friendly, lots of children', 'Raucous and drunken', 'Magical — illusory decorations everywhere'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN<T>(arr: T[], n: number): T[] { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
export function generateFestival(): Festival { return { name: pick(NAMES), occasion: pick(OCCASIONS), events: pickN(EVENTS, 3), prize: pick(PRIZES), atmosphere: pick(ATMOSPHERES) }; }
export function formatFestival(f: Festival): string { return `🎉 **${f.name}**\n📅 ${f.occasion}\n🎭 *${f.atmosphere}*\n**Events:**\n${f.events.map((e) => `  • ${e}`).join('\n')}\n🏆 Grand Prize: ${f.prize}`; }
