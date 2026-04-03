// Random merchant quirk — what makes this merchant memorable.
export const MERCHANT_QUIRKS: string[] = [
  'Weighs every coin on a tiny scale before accepting it.',
  'Only speaks in questions. Never makes statements.',
  'Has a parrot that repeats the prices — sometimes incorrectly.',
  'Gives everything a backstory. "This dagger? Forged in the fires of Mount Doom." (It wasn\'t.)',
  'Haggling is a sacred ritual. They\'re offended if you don\'t try.',
  'Insists on a handshake to seal every transaction. Their grip is crushingly strong.',
  'Arranges merchandise in perfect geometric patterns. Moves items back if you disturb them.',
  'Whispers the price of expensive items as if revealing a great secret.',
  'Keeps a ledger of every customer. "Ah yes, you bought a rope last spring."',
  'Always adds a free candy/sweet to every purchase. No explanation.',
  'Names every weapon in the shop. Introduces you to them personally.',
  'Charges exactly 1 copper more than every other merchant. On principle.',
];
export function getRandomMerchantQuirk(): string { return MERCHANT_QUIRKS[Math.floor(Math.random() * MERCHANT_QUIRKS.length)]; }
export function formatMerchantQuirk(): string { return `🏪 **Merchant Quirk:** *${getRandomMerchantQuirk()}*`; }
