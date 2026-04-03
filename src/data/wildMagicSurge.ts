// Wild magic surge table — 50 entries for Wild Magic Sorcerer.
// Roll d100; on 01, surge triggers. Then roll d50 for the effect.

export interface WildMagicEffect {
  roll: number; // 1-50
  description: string;
  mechanical: string;
  severity: 'harmless' | 'beneficial' | 'chaotic' | 'dangerous';
}

export const WILD_MAGIC_TABLE: WildMagicEffect[] = [
  { roll: 1, description: 'You cast Fireball centered on yourself.', mechanical: '8d6 fire, DEX save DC 13 half, 20ft radius', severity: 'dangerous' },
  { roll: 2, description: 'You turn into a potted plant until the start of your next turn.', mechanical: 'Incapacitated, AC 10, 1 HP as plant', severity: 'chaotic' },
  { roll: 3, description: 'For the next minute, you can see invisible creatures.', mechanical: 'See Invisibility for 1 minute', severity: 'beneficial' },
  { roll: 4, description: 'A modron appears within 5ft and explodes. All within 10ft take 1d10 force.', mechanical: '1d10 force damage, 10ft radius', severity: 'chaotic' },
  { roll: 5, description: 'You cast Magic Missile as a 5th-level spell.', mechanical: '7 darts, 1d4+1 each', severity: 'beneficial' },
  { roll: 6, description: 'You shrink to 1/10th your size for 1 minute.', mechanical: 'Disadvantage on STR checks, advantage on DEX checks', severity: 'chaotic' },
  { roll: 7, description: 'You cast Confusion centered on yourself.', mechanical: 'WIS DC 13, 10ft radius, 1 minute', severity: 'dangerous' },
  { roll: 8, description: 'You regain 5 HP every round for 1 minute.', mechanical: 'Regenerate 5 HP/round, 10 rounds', severity: 'beneficial' },
  { roll: 9, description: 'You grow a long beard of feathers until you sneeze.', mechanical: 'Cosmetic only', severity: 'harmless' },
  { roll: 10, description: 'You cast Grease centered on yourself.', mechanical: 'DEX DC 13 or fall prone, 10ft square', severity: 'chaotic' },
  { roll: 11, description: 'You become invisible for 1 minute or until you attack/cast.', mechanical: 'Greater Invisibility (limited)', severity: 'beneficial' },
  { roll: 12, description: 'Leaves grow from your body for 24 hours.', mechanical: 'Cosmetic only', severity: 'harmless' },
  { roll: 13, description: 'You teleport up to 60ft to an unoccupied space.', mechanical: 'Instant teleport 60ft', severity: 'beneficial' },
  { roll: 14, description: 'You are transported to the Astral Plane until end of next turn.', mechanical: 'Removed from combat for 1 round', severity: 'chaotic' },
  { roll: 15, description: 'You maximize the damage of the next spell you cast within 1 minute.', mechanical: 'Next spell damage = max dice', severity: 'beneficial' },
  { roll: 16, description: 'Your skin turns bright blue for 24 hours.', mechanical: 'Cosmetic only', severity: 'harmless' },
  { roll: 17, description: 'A third eye grows on your forehead. +10 Perception for 1 minute.', mechanical: '+10 Perception', severity: 'beneficial' },
  { roll: 18, description: 'All your spells make a loud honking noise for 1 minute.', mechanical: 'No stealth while casting', severity: 'chaotic' },
  { roll: 19, description: 'You gain resistance to all damage for 1 minute.', mechanical: 'All damage halved', severity: 'beneficial' },
  { roll: 20, description: 'A random creature within 60ft is poisoned for 1d4 hours.', mechanical: 'Random target poisoned', severity: 'chaotic' },
  { roll: 21, description: 'You glow with bright light 30ft for 1 minute.', mechanical: 'Bright light 30ft, no stealth', severity: 'chaotic' },
  { roll: 22, description: 'You cast Polymorph on yourself. Become a sheep.', mechanical: 'Sheep: AC 10, 4 HP, speed 40ft', severity: 'dangerous' },
  { roll: 23, description: 'Butterflies flutter around you for 1 minute.', mechanical: 'Cosmetic only, lightly obscured to others', severity: 'harmless' },
  { roll: 24, description: 'You can take one extra action immediately.', mechanical: 'Action Surge (free action now)', severity: 'beneficial' },
  { roll: 25, description: 'All creatures within 30ft take 1d10 necrotic. You heal for total.', mechanical: '1d10 necrotic AoE, heal total dealt', severity: 'chaotic' },
  { roll: 26, description: 'You cast Mirror Image.', mechanical: '3 illusory duplicates', severity: 'beneficial' },
  { roll: 27, description: 'You cast Fly on a random creature within 60ft.', mechanical: 'Fly speed 60ft, 10 minutes', severity: 'chaotic' },
  { roll: 28, description: 'You turn ethereal for 1 round.', mechanical: 'Can pass through objects, immune to nonmagical attacks', severity: 'beneficial' },
  { roll: 29, description: 'If you die in the next minute, you immediately reincarnate.', mechanical: 'Auto-Reincarnate on death', severity: 'beneficial' },
  { roll: 30, description: 'Your size increases one category for 1 minute.', mechanical: '+1d4 to melee damage, advantage on STR checks', severity: 'beneficial' },
  { roll: 31, description: 'You and everyone within 30ft gain vulnerability to piercing for 1 minute.', mechanical: 'Piercing vulnerability, 30ft AoE', severity: 'dangerous' },
  { roll: 32, description: 'A spectral shield hovers near you. +2 AC for 1 minute.', mechanical: '+2 AC, 1 minute', severity: 'beneficial' },
  { roll: 33, description: 'You can\'t speak for 1 minute. No verbal spell components.', mechanical: 'Silenced — no verbal spells', severity: 'dangerous' },
  { roll: 34, description: 'Illusory music plays around you. Advantage on Performance for 24h.', mechanical: 'Advantage on Performance', severity: 'harmless' },
  { roll: 35, description: 'A pit (10ft deep) opens under a random creature within 30ft.', mechanical: 'DEX DC 12 or fall 10ft (1d6 damage)', severity: 'chaotic' },
  { roll: 36, description: 'You summon 1d4 flumphs.', mechanical: '1d4 tiny flumphs appear (friendly, useless)', severity: 'harmless' },
  { roll: 37, description: 'All unlocked doors within 60ft fly open.', mechanical: 'Doors open (could release trapped things)', severity: 'chaotic' },
  { roll: 38, description: 'You cast Lightning Bolt in a random direction.', mechanical: '8d6 lightning, DEX DC 13 half, 100ft line', severity: 'dangerous' },
  { roll: 39, description: 'Next creature you touch gets 2d10 temp HP.', mechanical: '2d10 temp HP on touch', severity: 'beneficial' },
  { roll: 40, description: 'You recover your lowest-level expended spell slot.', mechanical: 'Regain 1 spell slot', severity: 'beneficial' },
  { roll: 41, description: 'Gravity reverses for you for 1 round.', mechanical: 'Fall upward 20ft, then fall back next round', severity: 'chaotic' },
  { roll: 42, description: 'You speak only in rhyming couplets for 24 hours.', mechanical: 'Roleplay effect', severity: 'harmless' },
  { roll: 43, description: 'You cast Shield on yourself (no reaction needed).', mechanical: '+5 AC until start of next turn', severity: 'beneficial' },
  { roll: 44, description: 'You age 1d10 years.', mechanical: 'Permanent aging (Greater Restoration to reverse)', severity: 'dangerous' },
  { roll: 45, description: 'All metal within 10ft becomes red hot for 1 round.', mechanical: '1d4 fire per metal item held', severity: 'chaotic' },
  { roll: 46, description: 'Your hair falls out but grows back in 24 hours.', mechanical: 'Cosmetic only', severity: 'harmless' },
  { roll: 47, description: 'You cast Fog Cloud centered on yourself.', mechanical: '20ft radius, heavily obscured', severity: 'chaotic' },
  { roll: 48, description: 'Each creature within 30ft takes 1 point of each damage type.', mechanical: '13 damage total (1 per type)', severity: 'chaotic' },
  { roll: 49, description: 'You become immune to being intoxicated for 5d6 days.', mechanical: 'Immunity to poison from alcohol', severity: 'harmless' },
  { roll: 50, description: 'Your spell works normally, but a unicorn controlled by DM appears within 60ft for 1 minute.', mechanical: 'DM-controlled unicorn appears', severity: 'chaotic' },
];

export function rollWildMagicCheck(): boolean {
  return Math.floor(Math.random() * 20) + 1 === 1; // nat 1 on d20
}

export function rollSurgeEffect(): WildMagicEffect {
  const index = Math.floor(Math.random() * WILD_MAGIC_TABLE.length);
  return WILD_MAGIC_TABLE[index];
}

export function formatSurgeEffect(effect: WildMagicEffect): string {
  const icon = effect.severity === 'beneficial' ? '✨' : effect.severity === 'dangerous' ? '💥' : effect.severity === 'chaotic' ? '🌀' : '🎭';
  return `${icon} **Wild Magic Surge!** (Roll: ${effect.roll})\n${effect.description}\n*Effect: ${effect.mechanical}*`;
}
