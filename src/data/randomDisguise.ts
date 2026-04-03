// Random disguise generator — quick disguise ideas for infiltration missions.
export interface Disguise { outfit: string; persona: string; props: string[]; difficulty: 'easy' | 'medium' | 'hard'; deceptionDC: number; }
const OUTFITS = ['Merchant robes', 'Guard uniform', 'Servant livery', 'Noble finery', 'Priest vestments', 'Beggar rags', 'Traveling scholar', 'Blacksmith apron', 'Entertainer costume', 'Soldier armor'];
const PERSONAS = ['A lost traveler asking for directions', 'A new hire reporting for duty', 'A health inspector on official business', 'A relative visiting from far away', 'A messenger with an urgent delivery', 'A drunk who wandered in accidentally', 'A wealthy patron looking to invest', 'A holy person on a pilgrimage'];
const PROPS = ['Fake documents', 'A convincing signet ring', 'A basket of goods', 'A musical instrument', 'A healer\'s kit', 'A fake wound', 'An official-looking scroll', 'A large hat that hides the face', 'Colored contact lenses', 'A prosthetic nose'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN<T>(arr: T[], n: number): T[] { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
export function generateDisguise(): Disguise { const diff = pick(['easy', 'medium', 'hard'] as const); return { outfit: pick(OUTFITS), persona: pick(PERSONAS), props: pickN(PROPS, 2), difficulty: diff, deceptionDC: diff === 'easy' ? 10 : diff === 'medium' ? 14 : 18 }; }
export function formatDisguise(d: Disguise): string { return `🎭 **Disguise Plan** (Deception DC ${d.deceptionDC}):\n👔 Outfit: ${d.outfit}\n🎭 Persona: ${d.persona}\n🎒 Props: ${d.props.join(', ')}`; }
