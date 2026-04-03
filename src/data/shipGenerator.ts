// Random ship generator — vessel name, type, crew, cargo.
export interface GeneratedShip { name: string; type: string; crew: number; cargo: string; condition: string; captain: string; secret: string; }
const PREFIXES = ['The', 'HMS', 'SS']; const ADJECTIVES = ['Crimson', 'Iron', 'Silent', 'Storm', 'Golden', 'Black', 'Swift', 'Ancient', 'Dread']; const SHIP_NOUNS = ['Serpent', 'Maiden', 'Kraken', 'Eagle', 'Fortune', 'Tempest', 'Phantom', 'Leviathan', 'Pearl', 'Trident'];
const TYPES = ['Galleon (large warship)', 'Caravel (fast explorer)', 'Longship (Viking raider)', 'Fishing trawler', 'Merchant cog', 'Pirate sloop', 'Royal frigate', 'Ghost ship'];
const CARGOS = ['Spices and silks', 'Weapons and armor', 'Rare lumber', 'Prisoners', 'Nothing — suspiciously empty', 'Exotic animals', 'Barrels of ale', 'Stolen treasure', 'Refugees', 'Magical artifacts'];
const CONDITIONS = ['Seaworthy and well-maintained', 'Barely floating — needs repairs', 'Recently refitted', 'Battle-scarred veteran', 'Brand new, on maiden voyage'];
const CAPTAINS = ['A grizzled veteran with one eye', 'A young noble seeking adventure', 'A former pirate gone legitimate', 'A stern woman who tolerates no nonsense', 'An elf who\'s sailed for centuries'];
const SECRETS = ['The crew is planning a mutiny', 'Hidden compartment contains contraband', 'The captain is actually a disguised dragon', 'The ship is haunted', 'Nothing unusual — a normal vessel'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function generateShip(): GeneratedShip { return { name: `${pick(PREFIXES)} ${pick(ADJECTIVES)} ${pick(SHIP_NOUNS)}`, type: pick(TYPES), crew: 10 + Math.floor(Math.random() * 90), cargo: pick(CARGOS), condition: pick(CONDITIONS), captain: pick(CAPTAINS), secret: pick(SECRETS) }; }
export function formatShip(ship: GeneratedShip): string { return `⛵ **${ship.name}** (${ship.type})\n👤 Captain: ${ship.captain}\n👥 Crew: ${ship.crew} | Condition: ${ship.condition}\n📦 Cargo: ${ship.cargo}\n🤫 Secret: ${ship.secret}`; }
