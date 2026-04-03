// Treasure map system — collectible fragments that reveal locations when assembled.
// DM places fragments as loot; collecting enough unlocks the location.

export interface TreasureMapFragment {
  id: string;
  mapId: string;
  fragmentIndex: number;
  clue: string;
  foundBy?: string; // character name
  foundAt?: number; // timestamp
}

export interface TreasureMap {
  id: string;
  name: string;
  description: string;
  totalFragments: number;
  fragments: TreasureMapFragment[];
  revealedLocation: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
}

export const TREASURE_MAP_TEMPLATES: Omit<TreasureMap, 'id' | 'fragments'>[] = [
  {
    name: 'The Dragon\'s Hoard', description: 'An ancient map to a dragon\'s forgotten treasure vault.', totalFragments: 4,
    revealedLocation: 'Beneath the Shattered Peak, third cavern on the left — look for the dragon skull marking.',
    reward: '10,000gp + 1 legendary magic item',
    difficulty: 'legendary',
  },
  {
    name: 'The Pirate Captain\'s Bounty', description: 'A sea-stained map to a notorious pirate\'s buried treasure.', totalFragments: 3,
    revealedLocation: 'Skull Island, east shore — 20 paces north of the dead palm tree, dig 6 feet down.',
    reward: '3,000gp + rare weapon + ship deed',
    difficulty: 'hard',
  },
  {
    name: 'The Elven Vault', description: 'Fragments of a starmap leading to an ancient elven treasury.', totalFragments: 3,
    revealedLocation: 'The Silver Forest, at the convergence of three streams — the door opens only under moonlight.',
    reward: '2,000gp + 2 uncommon magic items + elven armor',
    difficulty: 'medium',
  },
  {
    name: 'The Smuggler\'s Cache', description: 'A torn note pointing to a smuggler\'s hidden stash.', totalFragments: 2,
    revealedLocation: 'Behind the waterfall near the old mill, in a hollow behind the rocks.',
    reward: '500gp + potions + thieves\' tools',
    difficulty: 'easy',
  },
  {
    name: 'The Wizard\'s Library', description: 'Coded references to a legendary wizard\'s hidden study.', totalFragments: 4,
    revealedLocation: 'The Ruined Tower of Archmage Vellum — speak "Knowledge is Power" to the gargoyle.',
    reward: '5,000gp + 3 spell scrolls + Tome of Understanding',
    difficulty: 'hard',
  },
];

const CLUE_TEMPLATES: string[][] = [
  ['X marks the spot — but where?', 'The first landmark: a great oak split by lightning.', 'Follow the river north until the waterfall.', 'The entrance is hidden behind the cascade.'],
  ['The stars point the way.', 'When the moon is full, the shadow reveals the path.', 'Three stones mark the triangle — the center hides the truth.', 'Dig where the shadow of the tallest stone falls at noon.'],
  ['The old road leads past the ruined chapel.', 'Count the gravestones — the seventh hides a key.', 'The crypt beneath holds the passage forward.', 'Behind the altar, a false wall conceals the vault.'],
];

export function createTreasureMap(templateIndex: number): TreasureMap {
  const template = TREASURE_MAP_TEMPLATES[templateIndex % TREASURE_MAP_TEMPLATES.length];
  const clues = CLUE_TEMPLATES[templateIndex % CLUE_TEMPLATES.length] || CLUE_TEMPLATES[0];
  const fragments: TreasureMapFragment[] = Array.from({ length: template.totalFragments }, (_, i) => ({
    id: crypto.randomUUID(),
    mapId: '',
    fragmentIndex: i,
    clue: clues[i % clues.length],
  }));
  const map: TreasureMap = { id: crypto.randomUUID(), ...template, fragments };
  for (const f of map.fragments) f.mapId = map.id;
  return map;
}

export function findFragment(map: TreasureMap, fragmentIndex: number, characterName: string): TreasureMap {
  return {
    ...map,
    fragments: map.fragments.map((f) =>
      f.fragmentIndex === fragmentIndex ? { ...f, foundBy: characterName, foundAt: Date.now() } : f
    ),
  };
}

export function isMapComplete(map: TreasureMap): boolean {
  return map.fragments.every((f) => f.foundBy != null);
}

export function getCollectedCount(map: TreasureMap): number {
  return map.fragments.filter((f) => f.foundBy != null).length;
}

export function formatTreasureMap(map: TreasureMap): string {
  const collected = getCollectedCount(map);
  const complete = isMapComplete(map);
  const bar = '🗺️'.repeat(collected) + '❓'.repeat(map.totalFragments - collected);
  const lines = [`🗺️ **${map.name}** [${bar}] ${collected}/${map.totalFragments}`];
  lines.push(`*${map.description}*`);
  lines.push(`Difficulty: ${map.difficulty} | Reward: ${map.reward}`);
  for (const f of map.fragments) {
    if (f.foundBy) {
      lines.push(`  ✅ Fragment ${f.fragmentIndex + 1}: "${f.clue}" (found by ${f.foundBy})`);
    } else {
      lines.push(`  ❓ Fragment ${f.fragmentIndex + 1}: ???`);
    }
  }
  if (complete) lines.push(`\n🎉 **Map complete!** Location: ${map.revealedLocation}`);
  return lines.join('\n');
}
