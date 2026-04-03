// Puzzle lock system — combination/rune/lever puzzles for doors and chests.

export type PuzzleType = 'combination' | 'rune' | 'lever' | 'pressure_plate' | 'riddle_lock';

export interface PuzzleLock {
  id: string;
  type: PuzzleType;
  name: string;
  description: string;
  solution: string;
  hints: string[];
  dc: number; // Investigation DC to get a hint
  attempts: number; // max attempts before consequence
  consequence: string; // what happens on failure
  reward: string; // what's behind it
}

const PUZZLE_TEMPLATES: Omit<PuzzleLock, 'id'>[] = [
  {
    type: 'combination',
    name: 'The Alchemist\'s Lock',
    description: 'Four vials of colored liquid sit in slots. Each must be placed in the correct order: the substance that burns, the substance that heals, the substance that sleeps, the substance that wakes.',
    solution: 'Red, Green, Purple, Yellow',
    hints: ['The healer always follows the destroyer.', 'Sleep comes before waking.', 'Fire is always first.'],
    dc: 13,
    attempts: 3,
    consequence: 'The vials shatter, releasing poisonous gas. CON DC 14 or 3d6 poison damage.',
    reward: 'The Alchemist\'s personal stash — 3 potions of superior healing.',
  },
  {
    type: 'rune',
    name: 'The Arcane Seal',
    description: 'Five runes glow on the door: Sun, Moon, Star, Storm, Earth. Three must be activated in the correct sequence. The inscription reads: "Light before darkness, sky before ground."',
    solution: 'Sun, Moon, Storm',
    hints: ['The Sun always comes first.', 'Earth is a trap — never touch it.', 'Storm is between light and dark.'],
    dc: 14,
    attempts: 2,
    consequence: 'Lightning arcs from the runes. DEX DC 15 or 4d6 lightning damage.',
    reward: 'Access to the wizard\'s sanctum.',
  },
  {
    type: 'lever',
    name: 'The Three Brothers',
    description: 'Three levers on the wall — Iron, Bronze, Gold. A plaque reads: "The youngest opens the way, but only after the eldest shows the path. The middle brother must never lead."',
    solution: 'Iron (eldest), Gold (youngest)',
    hints: ['Bronze is the middle brother — pulling it triggers a trap.', 'Iron must be pulled first.', 'Gold opens the door but only if Iron is already pulled.'],
    dc: 12,
    attempts: 4,
    consequence: 'The bronze lever triggers a dart trap. DEX DC 12 or 2d6 piercing + poison.',
    reward: 'A hidden vault with 200 gold pieces.',
  },
  {
    type: 'pressure_plate',
    name: 'The Tiled Path',
    description: 'A 4×4 grid of stone tiles. Some are safe, others collapse into a pit. The pattern on the ceiling mirrors the safe path — if you can read it.',
    solution: 'Follow the tiles with the sun motif (diagonal path)',
    hints: ['The moon tiles are trapped.', 'The path follows a diagonal.', 'Perception DC 15 to spot the ceiling mirror.'],
    dc: 15,
    attempts: 1,
    consequence: 'The tile collapses. DEX DC 14 or fall 20 ft into a pit (2d6 bludgeoning).',
    reward: 'Safe passage to the treasure room.',
  },
  {
    type: 'riddle_lock',
    name: 'The Sphinx\'s Keystone',
    description: 'A stone face speaks: "I have cities but no houses, forests but no trees, and water but no fish. What am I?"',
    solution: 'A map',
    hints: ['Think of something that represents the world.', 'It\'s something adventurers carry.', 'You\'re probably looking at one right now.'],
    dc: 11,
    attempts: 3,
    consequence: 'The stone face breathes fire. DEX DC 13 or 3d6 fire damage.',
    reward: 'The door opens to reveal a treasure map leading to an even greater prize.',
  },
  {
    type: 'combination',
    name: 'The Dwarven Vault',
    description: 'A rotating dial with dwarven numerals. The combination is hidden in the forge poem engraved on the wall: "Seven strikes to heat the iron, three to fold, one to quench."',
    solution: '7-3-1',
    hints: ['Read the poem carefully — the numbers are in the text.', 'Seven, three, one.', 'The dwarves were not subtle.'],
    dc: 10,
    attempts: 5,
    consequence: 'Steam vents blast the area. CON DC 12 or 2d6 fire damage and blinded 1 round.',
    reward: 'A masterwork dwarven weapon of the DM\'s choice.',
  },
  {
    type: 'rune',
    name: 'The Blood Gate',
    description: 'Four runes demand a sacrifice. Each rune is labeled: Strength, Wisdom, Courage, Sacrifice. Only one requires actual blood — the others require a demonstration.',
    solution: 'Demonstrate STR (lift stone), WIS (answer question), Courage (touch the flame), then blood on Sacrifice',
    hints: ['Sacrifice is the only rune that needs blood.', 'Strength wants you to lift, not bleed.', 'Courage wants you to face fire without flinching.'],
    dc: 14,
    attempts: 2,
    consequence: 'The gate drains life force. 2d8 necrotic damage, no save.',
    reward: 'The sealed crypt of an ancient hero — powerful magic item inside.',
  },
  {
    type: 'lever',
    name: 'The Clockwork Door',
    description: 'Six gears of different sizes can be placed on pegs. The door mechanism needs three gears that mesh properly — large drives medium, medium drives small.',
    solution: 'Large gear (peg 1), Medium gear (peg 3), Small gear (peg 5)',
    hints: ['Adjacent pegs jam if gears are the same size.', 'The sequence must be descending in size.', 'Only odd-numbered pegs connect to the mechanism.'],
    dc: 13,
    attempts: 3,
    consequence: 'A gear flies off and strikes the nearest creature. 2d6 bludgeoning.',
    reward: 'Access to the gnomish workshop with rare crafting materials.',
  },
];

export function getRandomPuzzle(): PuzzleLock {
  const template = PUZZLE_TEMPLATES[Math.floor(Math.random() * PUZZLE_TEMPLATES.length)];
  return { ...template, id: `puzzle-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
}

export function getPuzzlesByType(type: PuzzleType): PuzzleLock[] {
  return PUZZLE_TEMPLATES.filter((p) => p.type === type).map((t) => ({ ...t, id: `puzzle-${Math.random().toString(36).slice(2, 8)}` }));
}

export function getHint(puzzle: PuzzleLock, hintIndex: number): string | null {
  return puzzle.hints[hintIndex] ?? null;
}

export function formatPuzzle(puzzle: PuzzleLock, showSolution: boolean = false): string {
  const icon = { combination: '🔢', rune: '✨', lever: '🔧', pressure_plate: '🪨', riddle_lock: '🗣️' }[puzzle.type];
  const lines = [`${icon} **${puzzle.name}** *(${puzzle.type.replace(/_/g, ' ')})*`];
  lines.push(`  *${puzzle.description}*`);
  lines.push(`  Investigation DC: ${puzzle.dc} | Max Attempts: ${puzzle.attempts}`);
  lines.push(`  ⚠️ Failure: ${puzzle.consequence}`);
  lines.push(`  🏆 Reward: ${puzzle.reward}`);
  if (showSolution) lines.push(`  🔑 Solution: ${puzzle.solution}`);
  return lines.join('\n');
}

export { PUZZLE_TEMPLATES };
