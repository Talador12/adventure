// Random world detail — small lore bits that make the world feel lived-in.
export interface WorldDetail { detail: string; category: 'custom' | 'history' | 'culture' | 'nature' | 'magic'; }
const DETAILS: WorldDetail[] = [
  { detail: 'Coins minted before the Great War have a different king\'s face on them.', category: 'history' },
  { detail: 'Locals believe sneezing means someone is talking about you in the Shadowfell.', category: 'culture' },
  { detail: 'There are no cats in this town. Nobody will explain why.', category: 'nature' },
  { detail: 'Street signs here are in two languages — Common and one no one can identify.', category: 'magic' },
  { detail: 'Children play a game called "Dragon\'s Chase" — it\'s basically tag but with fire-themed rules.', category: 'culture' },
  { detail: 'The river changes color with the seasons. Green in spring, red in autumn.', category: 'nature' },
  { detail: 'All the doors in the old quarter open outward. A fire regulation from a tragedy 50 years ago.', category: 'history' },
  { detail: 'Magical waste from the academy has turned the fish in the lake slightly translucent.', category: 'magic' },
  { detail: 'It\'s considered bad luck to whistle after dark here.', category: 'culture' },
  { detail: 'Every building has a small niche above the door for a protective charm.', category: 'culture' },
  { detail: 'The oldest tree in the square is said to be a polymorphed treant, sleeping.', category: 'nature' },
  { detail: 'Mail is delivered by trained ravens. They expect a treat as payment.', category: 'custom' },
];
export function getRandomWorldDetail(): WorldDetail { return DETAILS[Math.floor(Math.random() * DETAILS.length)]; }
export function formatWorldDetail(d: WorldDetail): string { return `🌍 **World Detail** (${d.category}): *${d.detail}*`; }
