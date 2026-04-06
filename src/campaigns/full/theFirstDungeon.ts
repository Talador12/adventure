import type { FullCampaign } from '../types';

export const theFirstDungeon: FullCampaign = {
  id: 'full-first-dungeon',
  type: 'full',
  title: 'The First Dungeon',
  tagline: 'Someone built the first dungeon. Nobody asked why. Maybe you should.',
  tone: 'exploration',
  themes: ['dungeon_crawl', 'exploration', 'mystery'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 16,
  settingSummary:
    'Beneath the oldest mountain in the world lies the First Dungeon — the original, the template that all other dungeons were modeled after. It was built before recorded history, and every dungeon since echoes its design. The party discovers an entrance that matches architectural elements from dungeons across the continent. Inside: the answers to why dungeons exist, who built them, and what they were actually designed to contain.',
  hook: 'A scholar shows the party rubbings from ten different dungeons across the continent — the same symbol appears in all of them. She\'s traced it to a location no map shows. "Every dungeon in the world is a copy of something. I found the original."',
  twist:
    'Dungeons weren\'t built to hold treasure or test heroes — they were built as prisons for a race of creatures that feed on the surface world\'s magic. Each dungeon is a cell. The traps aren\'t for adventurers — they\'re to keep the prisoners IN. The First Dungeon holds the Alpha: the oldest and most powerful of the imprisoned race. It\'s waking up because adventurers have been breaking dungeon seals for centuries.',
  climax:
    'The Alpha awakens. It\'s not evil — it\'s starving. Imprisoned for eons, it\'s desperate for the magic that sustained it. The party can reinforce the prison (condemning it to eternal hunger), release it under conditions (it feeds on ambient magic only, not living things), or destroy it (but every dungeon in the world was built to contain its children — and they\'ll all break free).',
  acts: [
    {
      title: 'Act 1: The Discovery',
      summary: 'Finding the First Dungeon, entering, and realizing it predates everything — every dungeon they\'ve ever explored was a copy of this.',
      keyEvents: [
        'The scholar\'s evidence: matching symbols from 10 dungeons, one origin point',
        'The entrance: hidden beneath the oldest mountain, sealed with magic that predates civilization',
        'The architecture: hauntingly familiar — every dungeon trope originated here',
        'First discovery: the "traps" face inward, designed to keep something IN, not keep people OUT',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Truth',
      summary: 'Exploring deeper. The dungeon\'s true purpose becomes clear. The party finds other cells — some empty, some occupied — and learns about the imprisoned race.',
      keyEvents: [
        'Empty cells: some prisoners escaped centuries ago — and became the bosses of other dungeons',
        'Occupied cells: creatures behind magical barriers, not hostile — curious, starving, communicative',
        'The history wall: a vast mural showing the First Dungeon\'s construction by a forgotten civilization',
        'The Alpha\'s cell: deeper than anything, the seals cracking, something massive stirring',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Alpha',
      summary: 'The deepest level. The Alpha awakens. A creature older than the gods, imprisoned and starving. The party\'s choice defines the future of every dungeon in the world.',
      keyEvents: [
        'The Alpha awakens: vast, ancient, and speaking a language that IS magic',
        'Communication: it\'s not hostile — it\'s been alone for eons and it\'s desperate',
        'The consequences explained: reinforce (eternal torture), release (risk), destroy (cascade)',
        'The choice — and the understanding that every dungeon delve the party has ever done was unknowingly weakening these seals',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Dr. Kira Stonewright',
      role: 'scholar / quest giver',
      personality: 'An archaeologist who has spent 20 years proving her theory about a "dungeon origin." Finally vindicated. Terrified by what vindication means.',
      secret: 'Her father was killed in a dungeon. She started this research to understand why dungeons exist. The answer is worse than she imagined.',
    },
    {
      name: 'The Alpha',
      role: 'imprisoned creature / not a villain',
      personality: 'An entity that experiences time in geological scales. It has been conscious for every second of its imprisonment. It does not hate its jailors. It has moved past hate into something deeper: exhaustion.',
    },
    {
      name: 'Warden Echo',
      role: 'dungeon guardian / ancient construct',
      personality: 'The last functional guardian from the civilization that built the dungeon. Running on fumes. "I was built to maintain the prison. The builders said they would return. That was... a long time ago."',
    },
  ],
  keyLocations: [
    { name: 'The First Dungeon', description: 'The original dungeon. Every corridor, every room type, every trap mechanism — all invented here, then copied across the world.', significance: 'The primary setting.' },
    { name: 'The History Wall', description: 'A mural that stretches for miles, telling the story of the prison\'s construction in a language of images.', significance: 'Where the truth is revealed.' },
    { name: 'The Alpha\'s Chamber', description: 'The deepest room in the deepest dungeon. A cell the size of a lake. Something breathes in the dark.', significance: 'The final confrontation.' },
  ],
  dataSystems: ['dungeonRoomTemplates', 'dungeonRoomDressing', 'trapDesigner', 'puzzleLock', 'encounterWaves', 'monsterEcology', 'magicalAnomaly', 'artifactHistory', 'ancientProphecy'],
};
