// Random tavern generator — instant tavern with name, specialty, patrons, rumors.

export interface GeneratedTavern {
  name: string;
  type: string;
  specialty: string;
  atmosphere: string;
  barkeep: { name: string; description: string };
  patrons: string[];
  rumors: string[];
  priceLevel: 'cheap' | 'moderate' | 'expensive';
}

const PREFIXES = ['The', 'Ye Olde', 'The Golden', 'The Silver', 'The Rusty', 'The Drunken', 'The Laughing', 'The Prancing', 'The Sleeping', 'The Crooked'];
const NOUNS = ['Dragon', 'Pony', 'Stag', 'Goblet', 'Sword', 'Shield', 'Barrel', 'Hound', 'Crow', 'Hammer', 'Flagon', 'Maiden', 'Goat', 'Bear', 'Fox'];
const TYPES = ['Tavern', 'Inn', 'Pub', 'Alehouse', 'Taproom'];
const SPECIALTIES = ['Famous meat pies', 'Rare imported ales', 'Best stew in town', 'Live bard performances nightly', 'Underground fighting ring', 'Exotic mushroom dishes', 'Dragon-pepper wings (CON save)', 'Mysterious "house special" that changes daily', 'The coldest ale south of the mountains', 'A fireplace that\'s always burning — even in summer'];
const ATMOSPHERES = ['Cozy and warm, packed with regulars', 'Dark and smoky, with suspicious characters in every booth', 'Bright and noisy, full of singing and laughter', 'Quiet and refined, with clean tables and polite service', 'Rough and rowdy, with frequent bar brawls', 'Mysterious, with strange decorations and whispering patrons'];
const BARKEEP_NAMES = ['Gundren', 'Mirabel', 'Hob', 'Sera', 'Durk', 'Vonda', 'Pip', 'Magda', 'Roscoe', 'Helga'];
const BARKEEP_DESCS = ['A burly dwarf with a braided beard and a booming laugh', 'A half-elf with sharp eyes who notices everything', 'A cheerful halfling who stands on a stepladder behind the bar', 'A scarred human who rarely smiles but pours generously', 'A tiefling with a silver tongue and a mysterious past'];
const PATRONS = ['A lone knight nursing a drink in the corner', 'A group of dwarven miners celebrating a big find', 'A nervous-looking wizard reading a tome', 'Two merchants arguing loudly about prices', 'A bard tuning their lute by the fire', 'An off-duty guard complaining about their captain', 'A hooded figure who keeps glancing at the door', 'A halfling juggler entertaining the crowd', 'A half-orc arm-wrestling anyone who\'ll challenge them', 'A gnome drawing elaborate plans on a napkin'];
const RUMORS = ['The old mine has been producing strange glowing stones lately', 'A dragon was spotted flying over the mountains last week', 'The mayor\'s daughter has gone missing — again', 'Bandits have been hitting caravans on the north road', 'A wizard in the next town is buying odd ingredients at premium prices', 'The graveyard has been making strange noises after midnight', 'A merchant is offering 100 gold for a rare flower from the forest', 'The king is raising taxes — people are not happy', 'Something big is living in the sewers beneath the city', 'A traveling carnival is headed this way — they say it\'s cursed'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateTavern(): GeneratedTavern {
  const patronCount = 2 + Math.floor(Math.random() * 3);
  const rumorCount = 1 + Math.floor(Math.random() * 2);
  const shuffledPatrons = [...PATRONS].sort(() => Math.random() - 0.5);
  const shuffledRumors = [...RUMORS].sort(() => Math.random() - 0.5);

  return {
    name: `${pick(PREFIXES)} ${pick(NOUNS)}`,
    type: pick(TYPES),
    specialty: pick(SPECIALTIES),
    atmosphere: pick(ATMOSPHERES),
    barkeep: { name: pick(BARKEEP_NAMES), description: pick(BARKEEP_DESCS) },
    patrons: shuffledPatrons.slice(0, patronCount),
    rumors: shuffledRumors.slice(0, rumorCount),
    priceLevel: pick(['cheap', 'moderate', 'expensive']),
  };
}

export function formatTavern(tavern: GeneratedTavern): string {
  const priceEmoji = tavern.priceLevel === 'cheap' ? '💰' : tavern.priceLevel === 'moderate' ? '💰💰' : '💰💰💰';
  const lines = [`🍺 **${tavern.name}** (${tavern.type}, ${priceEmoji} ${tavern.priceLevel})`];
  lines.push(`*${tavern.atmosphere}*`);
  lines.push(`🍖 Specialty: ${tavern.specialty}`);
  lines.push(`🧑‍🍳 Barkeep: **${tavern.barkeep.name}** — ${tavern.barkeep.description}`);
  lines.push('**Patrons:**');
  for (const p of tavern.patrons) lines.push(`  • ${p}`);
  lines.push('**Rumors:**');
  for (const r of tavern.rumors) lines.push(`  🤫 ${r}`);
  return lines.join('\n');
}
