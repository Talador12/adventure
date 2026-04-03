// Random magic item quirk — personality or behavior of a magic item.
export const MAGIC_ITEM_QUIRKS: string[] = [
  'Glows brighter the closer you get to gold.',
  'Hums a lullaby when the wielder is injured.',
  'Gets noticeably heavier when pointed north.',
  'Changes temperature based on the wielder\'s mood — warm when happy, cold when angry.',
  'Occasionally speaks a single word in Celestial. Usually "no."',
  'Attracts butterflies. Always.',
  'Leaves a faint trail of sparkles wherever it goes.',
  'Makes the wielder\'s eyes glow faintly in the dark.',
  'Smells like fresh bread.',
  'Vibrates gently when an enemy is within 30ft.',
  'Becomes invisible to everyone except the wielder at sunset.',
  'Weighs nothing to its attuned owner but 50 lbs to anyone else.',
];
export function getRandomMagicItemQuirk(): string { return MAGIC_ITEM_QUIRKS[Math.floor(Math.random() * MAGIC_ITEM_QUIRKS.length)]; }
export function formatMagicItemQuirk(): string { return `✨ **Magic Item Quirk:** *${getRandomMagicItemQuirk()}*`; }
