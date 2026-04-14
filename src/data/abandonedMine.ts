// Abandoned mine — dungeon environments with collapse risk, mineral veins, and underground creatures.

export type MineType = 'gold' | 'silver' | 'mithral' | 'adamantine' | 'crystal' | 'coal';
export type MineHazard = 'collapse' | 'gas' | 'flooding' | 'unstable_floor' | 'cave_in' | 'darkness';

export interface MineLevel {
  depth: number;
  description: string;
  hazard: MineHazard;
  hazardDC: number;
  creature: string;
  treasure: string;
}

export interface AbandonedMine {
  name: string;
  mineType: MineType;
  description: string;
  whyAbandoned: string;
  levels: MineLevel[];
  bossCreature: string;
  legendaryTreasure: string;
  environmentalRule: string;
}

const MINES: AbandonedMine[] = [
  {
    name: 'The Singing Shafts of Khel-Morduin',
    mineType: 'mithral',
    description: 'A dwarven mithral mine abandoned 200 years ago. The wind through the tunnels creates an eerie melody. The deeper you go, the more the song sounds like words.',
    whyAbandoned: 'The miners dug too deep and broke into a purple worm nesting chamber. 40 dwarves died in one night. The survivors sealed the lower levels and never returned.',
    levels: [
      { depth: 1, description: 'Upper galleries. Rusted tracks, abandoned carts. The air is stale but breathable. Old dwarven graffiti on the walls.', hazard: 'unstable_floor', hazardDC: 12, creature: '2d4 giant rats nesting in the old supply room', treasure: '3d6 x 10 gp in forgotten payroll strongbox' },
      { depth: 2, description: 'The Mithral Veins. Faint silver gleam in the walls. The singing is louder here. Something has been digging new tunnels.', hazard: 'collapse', hazardDC: 14, creature: 'A rust monster attracted by the mithral. It is well-fed and huge.', treasure: '1d4 pounds of raw mithral (500gp each)' },
      { depth: 3, description: 'The Sealed Level. The dwarven barrier is cracked. Something pushed through from below. The singing is deafening.', hazard: 'gas', hazardDC: 15, creature: 'Purple worm juvenile (not full size, but still terrifying). The singing is its hunting call.', treasure: 'A mithral vein the size of a wagon. Worth 10,000gp if you can extract it. You cannot extract it while the worm lives.' },
    ],
    bossCreature: 'The Choir Worm - a purple worm that learned to mimic the mine\'s acoustics. Its roar sounds like a dwarven work song. Miners who hear it feel compelled to dig deeper (DC 15 Wisdom save).',
    legendaryTreasure: 'The Heart of Khel-Morduin: a natural mithral geode the size of a human head, worth 25,000gp. The dwarves were mining AROUND it, afraid to touch it. It pulses with faint magic.',
    environmentalRule: 'Loud noises (combat, explosions) have a 25% chance of triggering a cave-in: DC 14 Dex save, 4d6 bludgeoning, buried on failure (DC 16 Athletics to dig out).',
  },
  {
    name: 'The Weeping Mine of Blackhollow',
    mineType: 'crystal',
    description: 'A crystal mine where the walls bleed water constantly. The crystals amplify sound and light. Everything echoes. Everything glitters. Nothing is as it seems.',
    whyAbandoned: 'The miners started seeing things in the crystals - reflections of people who were not there. Then the reflections started stepping out.',
    levels: [
      { depth: 1, description: 'The Drip Gallery. Water streams down crystal-studded walls. The floor is slick. Your reflection in the crystals moves a half-second behind you.', hazard: 'flooding', hazardDC: 13, creature: 'A water weird living in the central pool. It drowns anything that touches the water.', treasure: 'A pouch of cut crystals worth 200gp, hidden in a miner\'s locker' },
      { depth: 2, description: 'The Mirror Halls. Massive crystal formations create a maze of reflections. Your light source creates a thousand copies of itself. Navigation is nearly impossible.', hazard: 'darkness', hazardDC: 14, creature: 'A nothic that uses the crystal reflections to observe without being seen. It knows things about the party.', treasure: 'A crystal focusing lens (arcane focus, +1 to spell attack rolls)' },
      { depth: 3, description: 'The Heart Chamber. A single massive crystal pillar reaches floor to ceiling. Inside it, a figure is trapped. It looks like you.', hazard: 'cave_in', hazardDC: 16, creature: 'A mirror version of the party, trapped in the crystal, trying to swap places. Each mirror-clone has the same stats but inverted alignment.', treasure: 'The Crystal Heart: a flawless sphere that can store one spell of 3rd level or lower. Worth 5,000gp to the right buyer.' },
    ],
    bossCreature: 'The Reflection - a perfect duplicate of whoever is looking at it. It has all the same abilities but no creativity. It copies actions 1 round behind. The only way to beat it is to do something it cannot copy.',
    legendaryTreasure: 'A shard of the Crystal Heart that, when held, lets you see 6 seconds into the future once per day (effectively one free reroll on any d20).',
    environmentalRule: 'Spells with visual components (light, illusion) are amplified. AoE spells have +5ft radius but also affect the caster if they are within the amplified range.',
  },
];

export function getRandomMine(): AbandonedMine {
  return MINES[Math.floor(Math.random() * MINES.length)];
}

export function getMineByType(type: MineType): AbandonedMine | undefined {
  return MINES.find((m) => m.mineType === type);
}

export function getAllMineTypes(): MineType[] {
  return [...new Set(MINES.map((m) => m.mineType))];
}

export function getLevelCount(mine: AbandonedMine): number {
  return mine.levels.length;
}

export function formatMine(mine: AbandonedMine): string {
  const lines = [`⛏️ **${mine.name}** *(${mine.mineType} mine)*`];
  lines.push(`  ${mine.description}`);
  lines.push(`  Abandoned because: ${mine.whyAbandoned}`);
  lines.push(`  Rule: ${mine.environmentalRule}`);
  lines.push('  **Levels:**');
  for (const l of mine.levels) {
    lines.push(`    Depth ${l.depth}: ${l.description}`);
    lines.push(`      Hazard: ${l.hazard} (DC ${l.hazardDC}) | Creature: ${l.creature}`);
    lines.push(`      Treasure: ${l.treasure}`);
  }
  lines.push(`  Boss: ${mine.bossCreature}`);
  lines.push(`  Legendary: ${mine.legendaryTreasure}`);
  return lines.join('\n');
}

export { MINES as ABANDONED_MINES };
