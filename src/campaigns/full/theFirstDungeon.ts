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
        'The scholar\'s evidence: she lays out rubbings on a table — a spike trap from the Tomb of Horrors, a pressure plate from White Plume Mountain, a door mechanism from the Sunless Citadel. Identical construction. Same chisel marks. One builder.',
        'The entrance: hidden beneath the oldest mountain, the door is sealed with a lock that predates every known magical tradition. It opens when the party approaches. It was expecting visitors.',
        'The architecture: hauntingly familiar. The party walks through a corridor and realizes they have been in this exact layout before — in six different dungeons. The original template.',
        'First discovery: a pressure plate triggers a blade that swings INTO the corridor from the wall side. The trap faces inward. Everything here was designed to keep something IN, not keep people OUT.',
        'Quiet moment: the party finds a chamber with a mural of the builders. They look afraid. They are sealing something away and they know it will outlast them.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Truth',
      summary: 'Exploring deeper. The dungeon\'s true purpose becomes clear. The party finds other cells — some empty, some occupied — and learns about the imprisoned race.',
      keyEvents: [
        'Empty cells: shattered barriers, claw marks, and a realization — the beholder the party fought last year, the dragon in the mountain, the lich in the crypt — they were all inmates who escaped.',
        'Occupied cells: creatures behind magical barriers who press against the glass. One writes in condensation: "We are not evil. We are hungry. We ate magic to live. They locked us up for eating."',
        'The history wall: a vast mural showing the First Dungeon\'s construction. The builders are weeping as they seal the doors. A plaque reads: "Forgive us. We found no other way."',
        'The Alpha\'s cell: deeper than anything, past seals that crack as the party passes. Something massive breathes in the dark. The breath is warm and smells like ozone.',
        'Quiet moment: Warden Echo powers down briefly — its equivalent of sleep. When it wakes, it asks the party what dreams are. It has never had one.',
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
      role: 'scholar / quest giver / evolves from academic to advocate',
      personality: 'Pushes her glasses up her nose when excited. Speaks in footnotes — constantly cross-referencing herself. Carries charcoal rubbings in a tube she treats more carefully than her own safety. "Cross-reference this with the Tomb of Horrors spike trap — same gauge, same angle, same alloy. One builder."',
      secret: 'Her father was killed in a dungeon. She started this research to understand why dungeons exist. The answer is worse than she imagined. She has to decide if she publishes it.',
    },
    {
      name: 'The Alpha',
      role: 'imprisoned creature / not a villain',
      personality: 'An entity that experiences time in geological scales. It has been conscious for every second of its imprisonment. Speaks in a voice like shifting stone — slow, heavy, inevitable. Does not hate its jailors. Has moved past hate into something deeper: exhaustion. "I have counted every heartbeat of every creature that walked above me. There have been... so many."',
    },
    {
      name: 'Warden Echo',
      role: 'dungeon guardian / ancient construct',
      personality: 'Moves with the stiffness of a mechanism that has been running too long. One eye flickers. Speaks in the formal cadence of builders long dead. "I was built to maintain the prison. The builders said they would return. That was... a long time ago." Pauses mid-sentence when its memory banks glitch.',
    },
    {
      name: 'Prisoner Seven',
      role: 'occupied cell inmate / moral weight',
      personality: 'A creature of light trapped behind a barrier, pressing symbols into the condensation. It has been trying to communicate for centuries. Patient, gentle, and deeply lonely. When the party responds, it flickers with what might be joy. It asks one question: "Is there still a sky?"',
    },
  ],
  keyLocations: [
    {
      name: 'The First Dungeon',
      description: 'The original dungeon. Every corridor, every room type, every trap mechanism — all invented here. The stone is older than the mountain above it. Torches on the walls still burn after eons.',
      significance: 'The primary setting. A place that rewrites the party\'s understanding of every dungeon they have ever explored.',
    },
    {
      name: 'The History Wall',
      description: 'A mural that stretches for miles, telling the story of the prison\'s construction. The builders are depicted as weeping. The inmates are depicted as beautiful. The truth is more complicated than either image suggests.',
      significance: 'Where the truth is revealed. The party can spend hours reading the wall and find new details each time.',
    },
    {
      name: 'The Alpha\'s Chamber',
      description: 'The deepest room in the deepest dungeon. A cell the size of a lake, lit by bioluminescent moss that has been growing since before the gods. Something breathes in the dark. The breath is warm.',
      significance: 'The final confrontation. A conversation, not a battle — unless the party makes it one.',
    },
  ],
  dataSystems: ['dungeonRoomTemplates', 'dungeonRoomDressing', 'trapDesigner', 'puzzleLock', 'encounterWaves', 'monsterEcology', 'magicalAnomaly', 'artifactHistory', 'ancientProphecy'],
};
