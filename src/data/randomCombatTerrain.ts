// Random combat terrain feature — battlefield details that affect tactics.
export interface TerrainFeature { name: string; description: string; mechanicalEffect: string; covers: boolean; difficultTerrain: boolean; }
const FEATURES: TerrainFeature[] = [
  { name: 'Overturned Cart', description: 'A merchant\'s cart, now on its side.', mechanicalEffect: 'Half cover. Can be climbed (Athletics DC 8) for high ground (+1 to ranged).', covers: true, difficultTerrain: false },
  { name: 'Shallow Stream', description: 'A shin-deep stream crosses the area.', mechanicalEffect: 'Difficult terrain. Fire spells deal -1 damage here. Extinguishes flames.', covers: false, difficultTerrain: true },
  { name: 'Pile of Rubble', description: 'Collapsed stonework creates uneven footing.', mechanicalEffect: 'Difficult terrain. Three-quarters cover if prone behind it.', covers: true, difficultTerrain: true },
  { name: 'Thick Underbrush', description: 'Dense bushes and vines.', mechanicalEffect: 'Difficult terrain. Advantage on Stealth checks while inside.', covers: false, difficultTerrain: true },
  { name: 'Narrow Bridge', description: 'A 5ft-wide bridge over a gap.', mechanicalEffect: 'Single-file only. Falling: DEX DC 12 or 2d6 bludgeoning.', covers: false, difficultTerrain: false },
  { name: 'Campfire Pit', description: 'Still-hot coals from a recent fire.', mechanicalEffect: 'Stepping in: 1d6 fire. Can be kicked to spread embers (bonus action).', covers: false, difficultTerrain: false },
  { name: 'Hanging Chandelier', description: 'A heavy iron chandelier above the battlefield.', mechanicalEffect: 'Can be cut down (AC 12, 5 HP) to crush creatures below (3d6 bludgeoning, DEX DC 14).', covers: false, difficultTerrain: false },
  { name: 'Magical Darkness Zone', description: 'A 15ft sphere of impenetrable darkness.', mechanicalEffect: 'Heavily obscured. Darkvision doesn\'t work. Lasts 1d4 rounds.', covers: false, difficultTerrain: false },
  { name: 'Oil Slick', description: 'Spilled oil covering a 10ft area.', mechanicalEffect: 'DEX DC 10 or fall prone. Can be ignited for 2d6 fire in the area.', covers: false, difficultTerrain: true },
  { name: 'Elevated Platform', description: 'A 5ft-high stone platform.', mechanicalEffect: 'High ground: +1 to ranged attacks. Climbing costs 10ft movement.', covers: false, difficultTerrain: false },
];
export function getRandomTerrainFeature(): TerrainFeature { return FEATURES[Math.floor(Math.random() * FEATURES.length)]; }
export function getMultipleFeatures(count: number = 2): TerrainFeature[] { return [...FEATURES].sort(() => Math.random() - 0.5).slice(0, count); }
export function formatTerrainFeature(f: TerrainFeature): string { return `🏔️ **${f.name}**\n*${f.description}*\n⚙️ ${f.mechanicalEffect}${f.covers ? ' 🛡️ Cover' : ''}${f.difficultTerrain ? ' 🪨 Difficult' : ''}`; }
export function formatBattlefieldFeatures(count: number = 2): string { return `🏔️ **Battlefield Features:**\n${getMultipleFeatures(count).map((f) => formatTerrainFeature(f)).join('\n\n')}`; }
