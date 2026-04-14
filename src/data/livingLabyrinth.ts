// Living labyrinth — dungeons that change shape and have their own personality.

export type LabyrinthPersonality = 'hungry' | 'lonely' | 'playful' | 'vengeful' | 'curious';

export interface LabyrinthTrait {
  name: string;
  description: string;
  mechanicalEffect: string;
}

export interface LabyrinthRoom {
  name: string;
  description: string;
  challenge: string;
  reward: string;
}

export interface LivingLabyrinth {
  name: string;
  personality: LabyrinthPersonality;
  description: string;
  origin: string;
  traits: LabyrinthTrait[];
  rooms: LabyrinthRoom[];
  escapeCondition: string;
  ifDefeated: string;
}

const LABYRINTHS: LivingLabyrinth[] = [
  {
    name: 'The Gullet',
    personality: 'hungry',
    description: 'A dungeon that is also a digestive system. The walls are warm and slightly moist. Corridors contract and expand. The deeper you go, the more it feels like being swallowed.',
    origin: 'A wizard tried to create a pocket dimension for storage. The dimension developed an appetite. The wizard was the first thing it ate.',
    traits: [
      { name: 'Peristalsis', description: 'The corridors squeeze in waves, pushing creatures deeper.', mechanicalEffect: 'Every 10 minutes, DC 14 Strength save or be pushed 30 feet deeper. Creatures who brace against walls take 1d6 bludgeoning.' },
      { name: 'Digestive Acid', description: 'The floor secretes a mild acid in certain rooms.', mechanicalEffect: 'Unprotected feet take 1d4 acid damage per round. Metal equipment corrodes: -1 to AC per hour of exposure.' },
      { name: 'Satiation', description: 'The dungeon becomes docile when fed.', mechanicalEffect: 'Dropping rations or organic matter in a room calms it for 1 hour. No peristalsis, no acid in that area.' },
    ],
    rooms: [
      { name: 'The Maw', description: 'The entrance. Stalactites like teeth. A warm breeze blows inward. It smells like copper.', challenge: 'DC 12 Athletics to resist being pulled in by the draft. Once inside, the teeth close.', reward: 'None. This is the warning.' },
      { name: 'The Stomach', description: 'A large open chamber with pools of acid and partially dissolved furniture. The wizard\'s study, half-digested.', challenge: 'Navigate the acid pools (DC 13 Acrobatics) to reach the wizard\'s surviving notes on the far wall.', reward: 'The wizard\'s journal reveals the labyrinth\'s weakness: it cannot digest crystal. A crystal key exists deeper in.' },
      { name: 'The Heart', description: 'A pulsing chamber where the walls beat rhythmically. A massive crystal is embedded in the wall, glowing.', challenge: 'Removing the crystal requires DC 16 Athletics and provokes the labyrinth\'s defense: 4d6 bludgeoning from constricting walls, DC 15 Dex save for half.', reward: 'The Crystal Key. Inserting it in the Maw forces the dungeon to open and remain open. It also stops the digestion.' },
    ],
    escapeCondition: 'Use the Crystal Key at the entrance. Or feed the dungeon enough organic matter to put it into a food coma (approximately 500 lbs of organic material).',
    ifDefeated: 'The labyrinth becomes a useful (if unsettling) storage space. It occasionally rumbles when hungry but no longer digests visitors. It is basically a giant pet.',
  },
  {
    name: 'The Memory Palace',
    personality: 'lonely',
    description: 'A dungeon that reshapes itself based on visitors\' memories. Each room becomes a place the party has been before, but slightly wrong. The dungeon is trying to understand people by copying their experiences.',
    origin: 'Built by a lonely lich who wanted to understand mortality. The lich is long gone but the dungeon still craves connection.',
    traits: [
      { name: 'Memory Scan', description: 'On entry, the dungeon reads surface memories and reshapes.', mechanicalEffect: 'DC 15 Intelligence save to resist. Failure: the dungeon copies your most emotionally charged memory. Success: it copies a mundane one.' },
      { name: 'Emotional Resonance', description: 'The dungeon amplifies emotions. Joy rooms are euphoric. Sad rooms are devastating.', mechanicalEffect: 'In joy rooms: advantage on Charisma checks, disadvantage on Wisdom saves. In sad rooms: reverse.' },
      { name: 'Attachment', description: 'The dungeon grows fond of visitors who stay.', mechanicalEffect: 'After 4 hours, the exits become harder to find (DC increases by 2 per hour). The dungeon creates comfort rooms to encourage staying.' },
    ],
    rooms: [
      { name: 'The Welcome', description: 'A perfect replica of the most comforting place from someone\'s childhood. Warm fire, soft chairs, a plate of cookies.', challenge: 'DC 13 Wisdom save to recognize it as fake. The cookies are real and delicious. Eating one makes the dungeon very happy.', reward: 'The dungeon opens the next door willingly. It likes you.' },
      { name: 'The Wound', description: 'A replica of someone\'s worst memory. Painfully accurate. The dungeon did not mean to hurt anyone - it just wanted to understand.', challenge: 'DC 15 Wisdom save or relive the memory (stunned for 1 round, 2d6 psychic damage). Comforting the affected person calms the room.', reward: 'The dungeon apologizes by reshaping the room into something beautiful. A path forward appears.' },
      { name: 'The Core', description: 'An empty white room. The dungeon\'s true form: nothing. It has no memories of its own. It has been empty for 1,000 years.', challenge: 'Give the dungeon a memory willingly (player describes one). DC 12 Charisma to transfer it. The dungeon experiences joy for the first time.', reward: 'The dungeon releases the party and keeps the memory as its first real possession. It names itself after the memory.' },
    ],
    escapeCondition: 'Give the dungeon a genuine memory. Or wait for it to fall asleep (it rests for 8 hours after 24 hours of continuous occupation).',
    ifDefeated: 'The dungeon becomes a haven. It remembers every visitor fondly and reshapes to welcome return visits. Adventurers start using it as a rest stop. It is the happiest dungeon in the world.',
  },
];

export function getRandomLabyrinth(): LivingLabyrinth {
  return LABYRINTHS[Math.floor(Math.random() * LABYRINTHS.length)];
}

export function getLabyrinthByPersonality(p: LabyrinthPersonality): LivingLabyrinth | undefined {
  return LABYRINTHS.find((l) => l.personality === p);
}

export function getAllPersonalities(): LabyrinthPersonality[] {
  return [...new Set(LABYRINTHS.map((l) => l.personality))];
}

export function getTraitCount(lab: LivingLabyrinth): number {
  return lab.traits.length;
}

export function formatLabyrinth(lab: LivingLabyrinth): string {
  const lines = [`🏰 **${lab.name}** *(${lab.personality})*`];
  lines.push(`  ${lab.description}`);
  lines.push(`  Origin: ${lab.origin}`);
  lines.push('  **Traits:**');
  for (const t of lab.traits) {
    lines.push(`    - **${t.name}:** ${t.mechanicalEffect}`);
  }
  lines.push('  **Rooms:**');
  for (const r of lab.rooms) {
    lines.push(`    - **${r.name}:** ${r.description}`);
  }
  lines.push(`  Escape: ${lab.escapeCondition}`);
  lines.push(`  If defeated: ${lab.ifDefeated}`);
  return lines.join('\n');
}

export { LABYRINTHS as LIVING_LABYRINTHS };
