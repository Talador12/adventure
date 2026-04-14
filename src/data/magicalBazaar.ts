// Magical bazaar — planar marketplace with exotic merchants and rare goods.

export type MerchantOrigin = 'material' | 'feywild' | 'shadowfell' | 'elemental' | 'celestial' | 'infernal';

export interface BazaarItem {
  name: string;
  price: string;
  effect: string;
  catch: string;
}

export interface BazaarMerchant {
  name: string;
  origin: MerchantOrigin;
  appearance: string;
  personality: string;
  inventory: BazaarItem[];
  haggleStyle: string;
  secretItem: BazaarItem;
}

export interface MagicalBazaar {
  name: string;
  location: string;
  description: string;
  entryFee: string;
  merchants: BazaarMerchant[];
  bazaarRule: string;
  dangerousEvent: string;
}

const BAZAARS: MagicalBazaar[] = [
  {
    name: 'The Convergence Market',
    location: 'Exists at the intersection of three ley lines. Appears on the first of every month. Leaves at dawn.',
    description: 'A sprawling tent city that materializes overnight. Merchants from six planes hawk impossible goods under lanterns that burn with foxfire. The air smells like cinnamon and ozone.',
    entryFee: 'One truthful answer to a question posed by the gate guardian (a sphinx who is bored and asks trivia).',
    merchants: [
      {
        name: 'Lys the Bottled',
        origin: 'feywild',
        appearance: 'A pixie who operates from inside a large glass bottle. The bottle floats at eye level. She refuses to explain why she is in a bottle.',
        personality: 'Manic, enthusiastic, speaks at triple speed. Genuinely loves her merchandise and will be offended if you do not appreciate it.',
        inventory: [
          { name: 'Bottled Sunset', price: '50gp', effect: 'Open the bottle and a sunset fills the room. Provides 4 hours of warm light and a feeling of peace. Creatures within 30ft have advantage on saves vs. fear.', catch: 'The sunset is stolen from a specific day. Somewhere, that day\'s sunset did not happen. The fey do not consider this theft.' },
          { name: 'Jar of Held Breath', price: '25gp', effect: '10 minutes of breathable air. Useful underwater or in poison gas.', catch: 'It is someone else\'s breath. You might taste their last meal.' },
          { name: 'Perfume of Forgotten Names', price: '100gp', effect: 'For 1 hour, nobody can remember your name. They recognize you but cannot name you. Useful for avoiding divination.', catch: 'You also forget your own name for the duration. This is more disorienting than expected.' },
        ],
        haggleStyle: 'She will accept compliments about her bottle as partial payment.',
        secretItem: { name: 'A Wish in a Jar', price: 'Your favorite memory', effect: 'Contains one Wish spell. The jar opens when you are truly desperate.', catch: 'The memory you trade is gone permanently. You will never remember it. Others will remember it for you.' },
      },
      {
        name: 'Morakh the Ashen',
        origin: 'shadowfell',
        appearance: 'A tall, gaunt figure wrapped in grey cloth. No visible face. Speaks from somewhere near the center of its chest. Its stall is always in shadow even at noon.',
        personality: 'Melancholic, polite, strangely comforting. Sells sadness-adjacent items with genuine care for the buyer.',
        inventory: [
          { name: 'Tear of the Raven Queen', price: '200gp', effect: 'A black pearl that, when crushed, casts Speak with Dead with no component cost. The dead spirit is calm and cooperative.', catch: 'The Raven Queen knows you used her tear. She is not angry. She is curious. That is worse.' },
          { name: 'Shadow Thread Cloak', price: '300gp', effect: '+2 to Stealth in dim light or darkness. The cloak is warm despite being made of literal shadow.', catch: 'In bright light, the cloak whispers. It tells you sad facts about the people nearby. You cannot turn it off.' },
        ],
        haggleStyle: 'Accepts sad stories as currency. A truly heartbreaking tale gets 50% off.',
        secretItem: { name: 'Coin of Last Chances', price: '1 year of lifespan', effect: 'Flip the coin when you would die. Heads: you survive with 1 HP. Tails: you die but come back as a revenant with one task to complete.', catch: 'The coin only works once. After use, it vanishes and appears in someone else\'s pocket who needs it more.' },
      },
    ],
    bazaarRule: 'No violence within the market. The gate sphinx enforces this with Forcecage. Violators are banned for 100 years.',
    dangerousEvent: 'A devil and an angel are both trying to buy the same item from a neutral merchant. They each offer the party 500gp to outbid the other. Accepting either offer makes an enemy for life.',
  },
];

export function getRandomBazaar(): MagicalBazaar {
  return BAZAARS[Math.floor(Math.random() * BAZAARS.length)];
}

export function getMerchantByOrigin(bazaar: MagicalBazaar, origin: MerchantOrigin): BazaarMerchant[] {
  return bazaar.merchants.filter((m) => m.origin === origin);
}

export function getAllSecretItems(bazaar: MagicalBazaar): BazaarItem[] {
  return bazaar.merchants.map((m) => m.secretItem);
}

export function getMerchantCount(bazaar: MagicalBazaar): number {
  return bazaar.merchants.length;
}

export function formatBazaar(bazaar: MagicalBazaar): string {
  const lines = [`🏪 **${bazaar.name}**`];
  lines.push(`  ${bazaar.description}`);
  lines.push(`  Location: ${bazaar.location}`);
  lines.push(`  Entry: ${bazaar.entryFee}`);
  lines.push(`  Rule: ${bazaar.bazaarRule}`);
  lines.push('  **Merchants:**');
  for (const m of bazaar.merchants) {
    lines.push(`    **${m.name}** (${m.origin}): ${m.appearance}`);
    for (const item of m.inventory) {
      lines.push(`      - ${item.name} (${item.price}): ${item.effect}`);
    }
    lines.push(`      Haggle: ${m.haggleStyle}`);
  }
  lines.push(`  Event: ${bazaar.dangerousEvent}`);
  return lines.join('\n');
}

export { BAZAARS as MAGICAL_BAZAARS };
