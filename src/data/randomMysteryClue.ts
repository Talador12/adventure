// Random mystery detail — small things that don't add up in a scene.
export const MYSTERY_DETAILS: string[] = [
  'The window is locked from the inside, but the victim didn\'t lock it.',
  'There are two sets of footprints entering the room, but only one leaving.',
  'The clock stopped at a very specific time. Someone set it there deliberately.',
  'A page has been torn from the ledger. Recently — the tear is clean.',
  'The dog in the yard didn\'t bark. It should have barked at a stranger.',
  'Everyone has an alibi. Too perfect. Too rehearsed.',
  'The body is positioned carefully — this wasn\'t a struggle, it was arranged.',
  'A candle was burning when the body was found. But the victim hated candles.',
  'The murder weapon is missing. But there\'s a clean spot on a dusty shelf where something was taken.',
  'The victim was wearing someone else\'s clothes.',
];
export function getRandomMysteryDetail(): string { return MYSTERY_DETAILS[Math.floor(Math.random() * MYSTERY_DETAILS.length)]; }
export function formatMysteryDetail(): string { return `🔍 **Something doesn't add up:**\n*${getRandomMysteryDetail()}*`; }
