// Random dragon hoard layout — treasure room configurations with guardian positions.

export type HoardSize = 'modest' | 'impressive' | 'legendary' | 'mythical';
export type TreasureZone = 'outer_ring' | 'inner_ring' | 'vault' | 'sleeping_spot' | 'trophy_wall';

export interface HoardZone { zone: TreasureZone; contents: string; guardedBy: string; trapDC: number | null; lootValue: number; }

export interface DragonHoardLayout {
  name: string;
  size: HoardSize;
  dragonColor: string;
  zones: HoardZone[];
  totalValue: number;
  hiddenCache: string;
  hiddenCacheDC: number;
  alarmTrigger: string;
  escapeRoute: string;
}

const LAYOUTS: DragonHoardLayout[] = [
  { name: 'The Gilded Caldera', size: 'legendary', dragonColor: 'Red', zones: [
    { zone: 'outer_ring', contents: '10,000 copper and silver coins. Scattered deliberately to slow intruders (difficult terrain).', guardedBy: '2 fire elementals bound to the hoard.', trapDC: 12, lootValue: 500 },
    { zone: 'inner_ring', contents: 'Gold coins (5,000gp), gemstones (2,000gp), art objects (3,000gp).', guardedBy: 'Glyph of Warding (Fireball, DEX DC 17).', trapDC: 17, lootValue: 10000 },
    { zone: 'sleeping_spot', contents: 'The dragon sleeps ON the best items. +2 plate armor, Staff of Fire, 3 rare potions.', guardedBy: 'The dragon. Obviously.', trapDC: null, lootValue: 15000 },
    { zone: 'trophy_wall', contents: 'Weapons and shields of defeated heroes. Each one is a magic item taken as a trophy.', guardedBy: 'Animated armor (the last hero\'s plate still fights).', trapDC: 14, lootValue: 5000 },
    { zone: 'vault', contents: 'A sealed vault containing the dragon\'s most prized possession: a painting of its mother.', guardedBy: 'Arcane Lock (DC 25) + Symbol of Death.', trapDC: 25, lootValue: 0 },
  ], totalValue: 30500, hiddenCache: 'A false wall behind the trophy wall hides 2,000gp in diamonds — the dragon\'s "emergency fund."', hiddenCacheDC: 18, alarmTrigger: 'Moving more than 100gp worth of treasure triggers a magical alarm. The dragon wakes in 1 round.', escapeRoute: 'A chimney shaft in the vault ceiling. Too small for the dragon but perfect for a Medium creature.' },
  { name: 'The Crystal Vault', size: 'impressive', dragonColor: 'Blue', zones: [
    { zone: 'outer_ring', contents: 'Glass cases displaying organized collections. This dragon is NEAT.', guardedBy: 'Lightning rune on each case (2d6 lightning if opened wrong).', trapDC: 14, lootValue: 2000 },
    { zone: 'inner_ring', contents: 'Categorized gemstones sorted by color, size, and magical properties. 3,000gp total.', guardedBy: 'A clay golem that "tidies up" — attacks anyone who disturbs the sorting.', trapDC: null, lootValue: 3000 },
    { zone: 'sleeping_spot', contents: 'A perfectly organized bed of sapphires. The dragon sleeps in mathematically precise coils.', guardedBy: 'The dragon\'s lair action: lightning arcs between crystal pillars each round.', trapDC: null, lootValue: 5000 },
  ], totalValue: 10000, hiddenCache: 'A crystal pillar is actually hollow. Inside: a spell scroll of Wish (the dragon is saving it).', hiddenCacheDC: 20, alarmTrigger: 'Any item removed from its display case triggers a silent alarm. The dragon knows which item and who took it.', escapeRoute: 'An underwater passage in the back wall connects to a river 200ft away.' },
  { name: 'The Whispering Pile', size: 'modest', dragonColor: 'Green', zones: [
    { zone: 'outer_ring', contents: 'Not gold — secrets. Encoded journals, sealed letters, blackmail material. Worth thousands to the right people.', guardedBy: 'Poisonous mushrooms release spores if disturbed (CON DC 14, 3d6 poison).', trapDC: 14, lootValue: 1000 },
    { zone: 'inner_ring', contents: 'A modest pile of gold (1,500gp) that the dragon uses as a bed. Comfortable, not greedy.', guardedBy: 'Suggestion trap: "Leave a secret of equal value in exchange." WIS DC 15.', trapDC: 15, lootValue: 1500 },
    { zone: 'sleeping_spot', contents: 'The dragon sleeps in a nest of important documents. Stepping on them is an act of war.', guardedBy: 'The dragon. It sleeps with one eye open. Literally.', trapDC: null, lootValue: 500 },
  ], totalValue: 3000, hiddenCache: 'A journal in the pile contains the true name of a demon lord. Worth 10,000gp to warlocks. Or priceless as a weapon.', hiddenCacheDC: 16, alarmTrigger: 'Reading any document triggers a psychic ping. The dragon knows your name and location for 24 hours.', escapeRoute: 'The entrance is the only way out. The dragon chose this cave specifically because there\'s no escape.' },
];

export function getRandomHoardLayout(): DragonHoardLayout {
  return LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];
}

export function getLayoutsBySize(size: HoardSize): DragonHoardLayout[] {
  return LAYOUTS.filter((l) => l.size === size);
}

export function getZonesWithTraps(layout: DragonHoardLayout): HoardZone[] {
  return layout.zones.filter((z) => z.trapDC !== null);
}

export function getHighestValueZone(layout: DragonHoardLayout): HoardZone {
  return layout.zones.reduce((best, z) => (z.lootValue > best.lootValue ? z : best));
}

export function getAllHoardSizes(): HoardSize[] {
  return ['modest', 'impressive', 'legendary', 'mythical'];
}

export function formatHoardLayout(layout: DragonHoardLayout): string {
  const icon = { modest: '🟢', impressive: '🟡', legendary: '🟠', mythical: '🔴' }[layout.size];
  const lines = [`${icon} **${layout.name}** *(${layout.dragonColor} dragon, ${layout.size}, ~${layout.totalValue}gp)*`];
  layout.zones.forEach((z) => lines.push(`  **${z.zone.replace(/_/g, ' ')}:** ${z.contents.substring(0, 80)}...${z.trapDC ? ` [Trap DC ${z.trapDC}]` : ''}`));
  lines.push(`  🔔 Alarm: ${layout.alarmTrigger}`);
  lines.push(`  🚪 Escape: ${layout.escapeRoute}`);
  return lines.join('\n');
}

export { LAYOUTS as HOARD_LAYOUTS };
