// Random wilderness landmark — notable features for overland travel.
export interface Landmark { name: string; description: string; terrain: string[]; hasSecret: boolean; secret?: string; }
const LANDMARKS: Landmark[] = [
  { name: 'Ancient Standing Stones', description: 'A circle of weathered megaliths humming with faint magic.', terrain: ['plains', 'forest'], hasSecret: true, secret: 'Casting Detect Magic reveals a ley line nexus. +1 to spell DCs here.' },
  { name: 'Petrified Dragon', description: 'A massive stone formation — clearly once a living dragon.', terrain: ['mountain', 'desert'], hasSecret: true, secret: 'A hollow cavity inside contains a cache of ancient coins (200gp).' },
  { name: 'Weeping Waterfall', description: 'A tall waterfall where the mist forms shapes of crying faces.', terrain: ['mountain', 'forest'], hasSecret: false },
  { name: 'Crooked Tower', description: 'A ruined wizard\'s tower, tilted at an impossible angle.', terrain: ['plains', 'hills'], hasSecret: true, secret: 'The basement is intact — a laboratory with 1d4 potions.' },
  { name: 'Giant\'s Footprint', description: 'A 30ft depression in the earth, perfectly shaped like a boot.', terrain: ['plains', 'desert'], hasSecret: false },
  { name: 'Singing Caves', description: 'Wind through the caves produces an eerie melody.', terrain: ['mountain', 'coast'], hasSecret: true, secret: 'The melody is actually a code — Arcana DC 16 reveals a map.' },
  { name: 'Dead Oak', description: 'A massive, lightning-blasted oak tree. Ravens constantly circle it.', terrain: ['forest', 'swamp'], hasSecret: false },
  { name: 'Mirror Lake', description: 'A perfectly still lake that reflects the sky — even on cloudy days.', terrain: ['forest', 'plains'], hasSecret: true, secret: 'At midnight, the reflection shows events from the past.' },
  { name: 'Bone Bridge', description: 'A bridge made entirely of massive rib bones spanning a gorge.', terrain: ['mountain', 'underdark'], hasSecret: false },
  { name: 'Crystal Geyser', description: 'A geyser that erupts with sparkling mineral water every hour.', terrain: ['mountain', 'desert'], hasSecret: true, secret: 'Water collected during eruption acts as a Potion of Healing.' },
];
export function rollLandmark(terrain?: string): Landmark { const pool = terrain ? LANDMARKS.filter((l) => l.terrain.includes(terrain)) : LANDMARKS; return (pool.length > 0 ? pool : LANDMARKS)[Math.floor(Math.random() * (pool.length || LANDMARKS.length))]; }
export function formatLandmark(l: Landmark, showSecret: boolean = false): string { let text = `🏛️ **${l.name}**\n*${l.description}*`; if (showSecret && l.hasSecret && l.secret) text += `\n🤫 Secret: ${l.secret}`; else if (l.hasSecret) text += '\n🔍 *There may be more here than meets the eye...*'; return text; }
