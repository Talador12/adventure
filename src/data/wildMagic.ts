// D&D 5e Wild Magic Surge table (PHB p104).
// Roll d100 when a Wild Magic Sorcerer rolls a nat 1 on the d20 after casting a leveled spell.

export interface WildMagicEffect {
  range: [number, number]; // d100 range (inclusive)
  effect: string;
  mechanical?: string; // game mechanic shorthand for auto-apply
}

export const WILD_MAGIC_TABLE: WildMagicEffect[] = [
  { range: [1, 2], effect: 'Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.' },
  { range: [3, 4], effect: 'For the next minute, you can see any invisible creature if you have line of sight to it.' },
  { range: [5, 6], effect: 'A modron chosen and controlled by the DM appears in an unoccupied space within 5 feet of you, then disappears 1 minute later.' },
  { range: [7, 8], effect: 'You cast fireball as a 3rd-level spell centered on yourself.', mechanical: 'fireball-self' },
  { range: [9, 10], effect: 'You cast magic missile as a 5th-level spell.' },
  { range: [11, 12], effect: 'Roll a d10. Your height changes by a number of inches equal to the roll — shrink on odd, grow on even.' },
  { range: [13, 14], effect: 'You cast confusion centered on yourself.', mechanical: 'confusion-self' },
  { range: [15, 16], effect: 'For the next minute, you regain 5 hit points at the start of each of your turns.', mechanical: 'regen-5' },
  { range: [17, 18], effect: 'You grow a long beard of feathers that remains until you sneeze.' },
  { range: [19, 20], effect: 'You cast grease centered on yourself.' },
  { range: [21, 22], effect: 'Creatures have disadvantage on saving throws against the next spell you cast in the next minute.' },
  { range: [23, 24], effect: 'Your skin turns a vibrant shade of blue. A remove curse spell can end this effect.' },
  { range: [25, 26], effect: 'An eye appears on your forehead for the next minute. You gain advantage on Wisdom (Perception) checks.' },
  { range: [27, 28], effect: 'For the next minute, all your spells with a casting time of 1 action have a casting time of 1 bonus action.' },
  { range: [29, 30], effect: 'You teleport up to 60 feet to an unoccupied space of your choice that you can see.' },
  { range: [31, 32], effect: 'You are transported to the Astral Plane until the end of your next turn.' },
  { range: [33, 34], effect: 'Maximize the damage of the next damaging spell you cast within the next minute.', mechanical: 'maximize-next' },
  { range: [35, 36], effect: 'Roll a d10. Your age changes by a number of years equal to the roll — younger on odd, older on even.' },
  { range: [37, 38], effect: '1d6 flumphs controlled by the DM appear in unoccupied spaces within 60 feet of you and are frightened of you.' },
  { range: [39, 40], effect: 'You regain 2d10 hit points.', mechanical: 'heal-2d10' },
  { range: [41, 42], effect: 'You turn into a potted plant until the start of your next turn. You are incapacitated and have vulnerability to all damage.' },
  { range: [43, 44], effect: 'For the next minute, you can teleport up to 20 feet as a bonus action on each of your turns.' },
  { range: [45, 46], effect: 'You cast levitate on yourself.' },
  { range: [47, 48], effect: 'A unicorn controlled by the DM appears in a space within 5 feet of you, then disappears 1 minute later.' },
  { range: [49, 50], effect: 'You can\'t speak for the next minute. Whenever you try, pink bubbles float out of your mouth.' },
  { range: [51, 52], effect: 'A spectral shield hovers near you for the next minute, granting you a +2 bonus to AC and immunity to magic missile.' },
  { range: [53, 54], effect: 'You are immune to being intoxicated by alcohol for the next 5d6 days.' },
  { range: [55, 56], effect: 'Your hair falls out but grows back within 24 hours.' },
  { range: [57, 58], effect: 'For the next minute, any flammable object you touch that isn\'t worn or carried by another creature bursts into flame.' },
  { range: [59, 60], effect: 'You regain your lowest-level expended spell slot.', mechanical: 'regain-slot' },
  { range: [61, 62], effect: 'For the next minute, you must shout when you speak.' },
  { range: [63, 64], effect: 'You cast fog cloud centered on yourself.' },
  { range: [65, 66], effect: 'Up to three creatures you choose within 30 feet of you take 4d10 lightning damage.', mechanical: 'lightning-4d10' },
  { range: [67, 68], effect: 'You are frightened by the nearest creature until the end of your next turn.' },
  { range: [69, 70], effect: 'Each creature within 30 feet of you becomes invisible for the next minute.' },
  { range: [71, 72], effect: 'You gain resistance to all damage for the next minute.', mechanical: 'resist-all' },
  { range: [73, 74], effect: 'A random creature within 60 feet of you becomes poisoned for 1d4 hours.' },
  { range: [75, 76], effect: 'You glow with bright light in a 30-foot radius for the next minute.' },
  { range: [77, 78], effect: 'You cast polymorph on yourself. If you fail the saving throw, you turn into a sheep.' },
  { range: [79, 80], effect: 'Illusory butterflies and flower petals flutter in the air within 10 feet of you for the next minute.' },
  { range: [81, 82], effect: 'You can take one additional action immediately.' },
  { range: [83, 84], effect: 'Each creature within 30 feet of you takes 1d10 necrotic damage. You regain HP equal to the total.', mechanical: 'drain-1d10' },
  { range: [85, 86], effect: 'You cast mirror image.' },
  { range: [87, 88], effect: 'You cast fly on a random creature within 60 feet of you.' },
  { range: [89, 90], effect: 'You become invisible for the next minute. It ends if you attack or cast a spell.' },
  { range: [91, 92], effect: 'If you die within the next minute, you immediately come back to life as if by the reincarnate spell.' },
  { range: [93, 94], effect: 'Your size increases by one size category for the next minute.' },
  { range: [95, 96], effect: 'You and all creatures within 30 feet of you gain vulnerability to piercing damage for the next minute.' },
  { range: [97, 98], effect: 'You are surrounded by faint, ethereal music for the next minute.' },
  { range: [99, 100], effect: 'You regain all expended sorcery points.', mechanical: 'regain-sorc-points' },
];

/** Roll on the Wild Magic table. Returns the d100 result and the effect. */
export function rollWildMagic(): { roll: number; effect: WildMagicEffect } {
  const roll = Math.floor(Math.random() * 100) + 1;
  const effect = WILD_MAGIC_TABLE.find((e) => roll >= e.range[0] && roll <= e.range[1])!;
  return { roll, effect };
}
