// Random loot description — how the party finds treasure.
export const LOOT_DESCRIPTIONS: string[] = [
  'Tucked behind a loose stone in the wall, wrapped in oilcloth.',
  'Clutched in the skeletal hand of a long-dead adventurer.',
  'Hidden in a false bottom of an otherwise empty barrel.',
  'Sitting on a pedestal in the center of the room. Suspiciously easy to reach.',
  'Sewn into the lining of the enemy leader\'s cloak.',
  'Half-buried in rubble. Glints in the torchlight.',
  'Inside a locked iron box chained to the wall.',
  'Floating in the center of a magical field of light.',
  'Under a floorboard that creaks when you step on it.',
  'In a pouch on the body of the last enemy to fall.',
  'Engraved with a name. Someone was carrying this for a reason.',
  'Warm to the touch. It pulses faintly, like a heartbeat.',
];
export function getRandomLootDescription(): string { return LOOT_DESCRIPTIONS[Math.floor(Math.random() * LOOT_DESCRIPTIONS.length)]; }
export function formatLootDescription(): string { return `💎 **Found it:** *${getRandomLootDescription()}*`; }
