// Random noble house generator — name, sigil, motto, reputation.

export interface NobleHouse { name: string; sigil: string; motto: string; reputation: string; wealth: 'modest' | 'wealthy' | 'opulent' | 'declining'; specialty: string; }

const PREFIXES = ['House', 'Clan', 'Dynasty', 'Family'];
const SURNAMES = ['Blackthorn', 'Goldcrest', 'Ironvale', 'Silvermane', 'Ravenshollow', 'Stormwind', 'Ashford', 'Thornwall', 'Brightwater', 'Darkholme', 'Winterborne', 'Flamecrest', 'Hawkridge', 'Lionheart', 'Nightingale'];
const SIGILS = ['A black dragon on a red field', 'A golden lion rampant', 'A silver tree on blue', 'Two crossed swords over a crown', 'A white stag on green', 'A flaming phoenix', 'A wolf\'s head howling at the moon', 'A tower struck by lightning', 'An anchor and trident', 'A rose wrapped in thorns'];
const MOTTOS = ['"Strength Through Honor"', '"We Remember"', '"Fire and Steel"', '"In Shadow, We Thrive"', '"Unbroken, Unbowed"', '"The Dawn Will Come"', '"Blood Pays for Blood"', '"Knowledge is the Truest Power"', '"Fortune Favors the Bold"', '"Duty Above All"'];
const REPUTATIONS = ['Known for military prowess and honor', 'Feared for their ruthless politics', 'Beloved by the common folk for charity', 'Distrusted for their shadowy dealings', 'Respected for their scholarly tradition', 'Envied for their vast wealth', 'Known for throwing the best feasts', 'Feared for their extensive spy network'];
const SPECIALTIES = ['Military leadership', 'Trade and commerce', 'Arcane scholarship', 'Naval power', 'Espionage', 'Religious authority', 'Agriculture', 'Diplomacy'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateNobleHouse(): NobleHouse {
  return { name: `${pick(PREFIXES)} ${pick(SURNAMES)}`, sigil: pick(SIGILS), motto: pick(MOTTOS), reputation: pick(REPUTATIONS), wealth: pick(['modest', 'wealthy', 'opulent', 'declining']), specialty: pick(SPECIALTIES) };
}

export function formatNobleHouse(house: NobleHouse): string {
  const wealthEmoji = house.wealth === 'opulent' ? '👑' : house.wealth === 'wealthy' ? '💰' : house.wealth === 'modest' ? '🏠' : '📉';
  return `🏰 **${house.name}**\n${wealthEmoji} Wealth: ${house.wealth} | Specialty: ${house.specialty}\n🛡️ Sigil: ${house.sigil}\n📜 Motto: ${house.motto}\n📢 ${house.reputation}`;
}
