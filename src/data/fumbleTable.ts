// Fumble table — consequences for rolling a natural 1.
// d20 roll determines severity. Results range from "embarrassing but harmless"
// to "you just made everyone's day worse." Comedy comes from specificity.

export interface FumbleEffect {
  range: [number, number]; // d20 range on the fumble confirmation roll
  effect: string;
  severity: 'cosmetic' | 'minor' | 'moderate' | 'serious';
  mechanical?: string; // shorthand for auto-apply (optional)
}

export const FUMBLE_TABLE: FumbleEffect[] = [
  // Cosmetic — nothing mechanically bad, just funny
  { range: [1, 3], effect: 'Your weapon slips from your grip and lands exactly where it would be most inconvenient.', severity: 'cosmetic', mechanical: 'drop-weapon' },
  { range: [4, 5], effect: 'You swing with such confidence that you spin in a full circle. Everyone saw.', severity: 'cosmetic' },
  { range: [6, 7], effect: 'Your attack misses so badly that a nearby ally flinches.', severity: 'cosmetic' },

  // Minor — small mechanical cost
  { range: [8, 9], effect: 'You overextend and stumble, losing your footing. Movement halved next turn.', severity: 'minor', mechanical: 'half-movement' },
  { range: [10, 11], effect: 'The recoil throws you off balance. You have disadvantage on your next attack.', severity: 'minor', mechanical: 'disadvantage-next' },
  { range: [12, 13], effect: 'You pull a muscle mid-swing. Take 1 damage from the sheer indignity.', severity: 'minor', mechanical: 'self-damage-1' },
  { range: [14, 15], effect: 'Your weapon gets momentarily stuck in the floor, the wall, or your own shield.', severity: 'minor', mechanical: 'lose-reaction' },

  // Moderate — real consequences
  { range: [16, 17], effect: 'You accidentally hit the nearest ally for half your normal damage. Apologies are in order.', severity: 'moderate', mechanical: 'hit-ally-half' },
  { range: [18, 19], effect: 'Your weapon breaks free but takes a chunk of scenery with it. Difficult terrain created in your square.', severity: 'moderate', mechanical: 'difficult-terrain-self' },

  // Serious — the table will remember this one
  { range: [20, 20], effect: 'You trip, fall prone, and your weapon skids across the floor. Your turn is over, and everyone has questions.', severity: 'serious', mechanical: 'prone-drop-end-turn' },
];

export function rollFumble(): FumbleEffect {
  const roll = Math.floor(Math.random() * 20) + 1;
  return FUMBLE_TABLE.find((f) => roll >= f.range[0] && roll <= f.range[1]) || FUMBLE_TABLE[0];
}
