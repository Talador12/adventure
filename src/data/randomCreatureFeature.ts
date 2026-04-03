// Random creature feature — add unique twists to standard monsters.
export interface CreatureFeature { feature: string; category: 'appearance' | 'behavior' | 'ability' | 'weakness'; mechanicalNote: string; }
const FEATURES: CreatureFeature[] = [
  { feature: 'Covered in glowing runes.', category: 'appearance', mechanicalNote: 'Arcana DC 13 reveals they\'re arcane bindings — the creature is controlled.' },
  { feature: 'One eye is much larger than the other.', category: 'appearance', mechanicalNote: 'Advantage on Perception checks. +2 to passive Perception.' },
  { feature: 'Fights in total silence — no battle cries, no grunts.', category: 'behavior', mechanicalNote: 'Enemies have disadvantage on Perception checks to detect it during combat.' },
  { feature: 'Protects a nest of young behind it.', category: 'behavior', mechanicalNote: 'Won\'t retreat. +2 to damage when protecting the nest. May surrender if nest threatened.' },
  { feature: 'Regenerates 5 HP at the start of each turn.', category: 'ability', mechanicalNote: 'Fire or acid damage prevents regeneration for 1 round.' },
  { feature: 'Can teleport 15ft as a bonus action.', category: 'ability', mechanicalNote: 'Recharge 4-6. Makes the creature much harder to pin down.' },
  { feature: 'Is terrified of fire. Will avoid it at all costs.', category: 'weakness', mechanicalNote: 'Frightened of any source of fire. Won\'t enter areas with open flame.' },
  { feature: 'Has a visible wound that hasn\'t healed.', category: 'weakness', mechanicalNote: 'Targeting the wound: +2 to hit but +1d6 bonus damage.' },
  { feature: 'Wearing a collar with a nametag.', category: 'appearance', mechanicalNote: 'This was someone\'s pet. There\'s a story here.' },
  { feature: 'Speaks Common poorly. Tries to negotiate before fighting.', category: 'behavior', mechanicalNote: 'Persuasion DC 15 to avoid combat entirely. Wants food/treasure.' },
];
export function getRandomCreatureFeature(): CreatureFeature { return FEATURES[Math.floor(Math.random() * FEATURES.length)]; }
export function formatCreatureFeature(f: CreatureFeature): string { return `🐲 **Creature Feature** (${f.category}):\n${f.feature}\n⚙️ ${f.mechanicalNote}`; }
