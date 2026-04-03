// Random planar marketplace — exotic shops from different planes with unique merchandise.

export type MarketPlane = 'feywild' | 'shadowfell' | 'elemental' | 'celestial' | 'infernal' | 'astral';

export interface PlanarShopItem {
  name: string;
  price: string; // may not be gold
  description: string;
  mechanicalEffect: string;
  sideEffect: string | null;
}

export interface PlanarShop {
  name: string;
  plane: MarketPlane;
  merchant: string;
  currency: string; // what they accept
  items: PlanarShopItem[];
  buybackPolicy: string;
  dangerWarning: string;
}

const SHOPS: PlanarShop[] = [
  { name: 'The Dream Weaver\'s Stall', plane: 'feywild', merchant: 'A moth-winged creature with a voice like wind chimes', currency: 'Memories, emotions, or years of life', items: [
    { name: 'Bottled Laughter', price: 'One genuine happy memory', description: 'A corked vial of crystallized joy.', mechanicalEffect: 'Throw to create a 15ft Tasha\'s Hideous Laughter effect (WIS DC 14).', sideEffect: 'You can no longer recall the memory you traded.' },
    { name: 'Cloak of Seasons', price: '1 year of your life', description: 'A cloak that shifts through spring/summer/autumn/winter.', mechanicalEffect: 'Resistance to cold and fire. Advantage on Survival checks in any weather.', sideEffect: 'You age 1 year instantly. This cannot be reversed.' },
    { name: 'Dream Seed', price: 'One recurring dream', description: 'Plant it to grow a tree that produces fruit only you can see.', mechanicalEffect: 'Fruit grants 8 hours of restful sleep in 1 hour (eat before rest).', sideEffect: 'You never have that dream again. The tree does, though. It whispers at night.' },
  ], buybackPolicy: 'No refunds. The memory is already digested.', dangerWarning: 'Fey merchants always tell the truth. They just leave out the important parts.' },
  { name: 'The Bone Market', plane: 'shadowfell', merchant: 'A skeletal figure in a top hat who speaks with impeccable manners', currency: 'Secrets, lifespan, or shadow essence', items: [
    { name: 'Shadow Lantern', price: 'A secret you\'ve never told anyone', description: 'A lantern that creates darkness instead of light.', mechanicalEffect: '30ft radius of magical darkness. You can see through it.', sideEffect: 'The merchant now knows your deepest secret. They find this hilarious.' },
    { name: 'Ghost Coin', price: '1 HP maximum (permanent)', description: 'A translucent coin that lets you pay debts to the dead.', mechanicalEffect: 'Place on a corpse\'s eyes to ask them 1 question (truthful answer).', sideEffect: 'Your max HP is permanently reduced by 1. Not reversible.' },
    { name: 'Wraithblade', price: '5 years of lifespan', description: 'A sword made of solidified shadow.', mechanicalEffect: '+2 shortsword. Deals necrotic instead of piercing. Can hit ethereal creatures.', sideEffect: 'You age 5 years. The blade whispers the names of those it has killed.' },
  ], buybackPolicy: 'We accept returns within 1 death.', dangerWarning: 'Everything here costs something precious. Don\'t shop unless you\'re willing to pay.' },
  { name: 'The Celestial Dispensary', plane: 'celestial', merchant: 'A six-winged angel who looks mildly inconvenienced by mortals', currency: 'Gold, but only earned through good deeds', items: [
    { name: 'Tears of Compassion', price: '500gp (must be earned honestly)', description: 'A vial of liquid light.', mechanicalEffect: 'Greater Restoration (single use). Cures any condition.', sideEffect: null },
    { name: 'Halo Shard', price: '1000gp (earned) + a genuine act of selflessness', description: 'A fragment of broken halo that still radiates warmth.', mechanicalEffect: 'Attune: +1 to all saving throws. Sheds bright light 10ft.', sideEffect: 'Fiends can sense you at 500ft. You attract their attention.' },
    { name: 'Book of Atonement', price: '200gp + sincere confession of a wrongdoing', description: 'Write your sin in this book. The page burns. You feel lighter.', mechanicalEffect: 'Remove one point of alignment shift toward evil. DM-adjudicated forgiveness.', sideEffect: 'The book records everything. If it falls into the wrong hands...' },
  ], buybackPolicy: 'No refunds necessary. Celestial goods always work as intended.', dangerWarning: 'The angel can tell if your gold was honestly earned. Stolen gold disintegrates on the counter.' },
  { name: 'Hellfire Imports', plane: 'infernal', merchant: 'A perfectly dressed devil with a fountain pen and an iron-clad smile', currency: 'Soul-signed contracts, favors, or soul coins', items: [
    { name: 'Infernal Contract (blank)', price: 'One minor favor to be named later', description: 'A blank contract. Write any terms. Both parties are bound.', mechanicalEffect: 'Creates a magically binding contract (see magical contract system). Break condition: the devil decides.', sideEffect: 'The "minor favor" is never minor. The devil collects eventually.' },
    { name: 'Hellfire Vial', price: '1 Soul Coin (taken from the Nine Hells)', description: 'Green-black flame that burns even in water.', mechanicalEffect: '4d6 fire damage, ignores fire resistance (not immunity). Burns for 1 minute.', sideEffect: 'Using hellfire is an evil act. Celestials take note.' },
    { name: 'Ring of Infernal Sight', price: 'Sign away your ability to cry', description: 'A black iron ring that shows the true price of everything.', mechanicalEffect: 'See the monetary and soul value of any object or creature. Cannot be fooled by illusions.', sideEffect: 'You can never shed tears again. Emotional range dulls slightly over time.' },
  ], buybackPolicy: 'All sales are final. Read the fine print. There is always fine print.', dangerWarning: 'Nothing here is free. If it seems free, you haven\'t read the contract carefully enough.' },
];

export function getRandomPlanarShop(): PlanarShop {
  return SHOPS[Math.floor(Math.random() * SHOPS.length)];
}

export function getShopByPlane(plane: MarketPlane): PlanarShop | undefined {
  return SHOPS.find((s) => s.plane === plane);
}

export function getItemsFromAllShops(): PlanarShopItem[] {
  return SHOPS.flatMap((s) => s.items);
}

export function getAllMarketPlanes(): MarketPlane[] {
  return SHOPS.map((s) => s.plane);
}

export function formatPlanarShop(shop: PlanarShop): string {
  const icon = { feywild: '🌸', shadowfell: '🌑', elemental: '🔥', celestial: '✨', infernal: '🔥', astral: '🌌' }[shop.plane];
  const lines = [`${icon} **${shop.name}** *(${shop.plane})*`];
  lines.push(`  Merchant: ${shop.merchant}`);
  lines.push(`  Currency: ${shop.currency}`);
  lines.push('  **Items:**');
  shop.items.forEach((i) => lines.push(`    💎 ${i.name} — ${i.price}`));
  lines.push(`  ⚠️ ${shop.dangerWarning}`);
  return lines.join('\n');
}

export { SHOPS as PLANAR_SHOPS };
