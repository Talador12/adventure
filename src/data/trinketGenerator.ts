// Random trinket generator — PHB-style trinkets for flavor loot (no monetary value, just RP).

export const TRINKETS: string[] = [
  'A mummified goblin hand', 'An old chess piece made of glass', 'A pair of knucklebone dice with skull faces',
  'A silver badge in the shape of a five-pointed star', 'A tiny mechanical crab that doesn\'t work',
  'An empty glass vial that smells of perfume', 'A gemstone that looks like a lump of coal until polished',
  'A petrified mouse', 'A black velvet mask stitched with silver thread', 'A brass orb etched with strange runes',
  'A crystal that faintly glows in the moonlight', 'A tiny silver bell that makes no sound',
  'A mechanical canary inside a gnomish lamp', 'A multicolored stone disk with unknown symbols',
  'A small idol depicting a nightmarish creature', 'A pair of old socks', 'A deed for a parcel of land (in an unknown realm)',
  'A tiny brass cage with no door', 'A music box that plays an unfamiliar tune',
  'A wooden nickel with "IOU" scratched on one side', 'A glass eye', 'A cameo pendant with an unknown portrait',
  'A tiny silver skull', 'An invitation to a party where a murder happened', 'A vial of dragon blood (or is it paint?)',
  'A tooth from an unknown beast', 'A lock of bright green hair', 'A fan that creates a gentle breeze when waved',
  'A nightcap that gives pleasant dreams when worn', 'A single caltrop made of bone',
];

export function getRandomTrinket(): string { return TRINKETS[Math.floor(Math.random() * TRINKETS.length)]; }
export function getMultipleTrinkets(count: number = 3): string[] {
  const shuffled = [...TRINKETS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, TRINKETS.length));
}

export function formatTrinkets(count: number = 3): string {
  const items = getMultipleTrinkets(count);
  return `🎲 **Random Trinkets:**\n${items.map((t) => `  • ${t}`).join('\n')}\n*No monetary value — pure flavor.*`;
}
