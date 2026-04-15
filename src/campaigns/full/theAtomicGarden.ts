import type { FullCampaign } from '../types';

export const theAtomicGarden: FullCampaign = {
  id: 'full-the-atomic-garden',
  type: 'full',
  title: 'The Atomic Garden',
  tagline: 'You are inside a single teardrop. The molecules are mountains. The disease is grief.',
  tone: 'exploration',
  themes: ['planar', 'exploration', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The party is shrunk to atomic scale and placed inside a single drop of water to cure a magical disease from within. At this scale, the rules change. Water molecules are crystalline boulders. Hydrogen bonds are bridges of light that flex and snap. Oxygen atoms glow faintly blue. Salt ions are fortresses of geometric precision. Bacteria are kaiju - vast organisms the size of cities, some hostile, some indifferent, some strangely beautiful. Magic works differently here: transmutation means moving individual atoms, evocation means exciting molecular bonds, divination means reading the chemical memory of the water itself. The disease manifests as dark crystalline growths that corrupt the molecular structure, turning ordered bonds into chaotic tangles.',
  hook: 'A divine healer has failed to cure a mysterious wasting disease. The afflicted is important enough that a wizard offers an experimental solution: shrink a team small enough to enter the diseased tissue and fix it from the inside. The party drinks a potion, and the world expands. A drop of water becomes an ocean. A cell membrane becomes a continent. The disease is visible as black crystals growing between molecules like frost between stones. "Find the source of the corruption. Destroy it. You have eight hours before the shrinking wears off."',
  twist:
    'The drop of water is a tear. It belongs to a god. The disease is not biological - it is emotional. Divine grief, so profound that it corrupts at the molecular level. The god lost something irreplaceable - a mortal they loved, a world they built, a truth they believed in. The grief crystallized in a single tear, and that tear fell on the afflicted mortal, infecting them with divine sorrow. The dark crystals are not a pathogen. They are memories. Each one contains a fragment of the god\'s loss. The cure is not medical. It is emotional. The party must witness the god\'s grief, understand it, and find a way to acknowledge it - not fix it, not remove it, but honor it enough that it stops destroying everything it touches.',
  climax:
    'At the center of the tear, the party finds the core crystal - a single perfect structure containing the god\'s complete memory of what they lost. Touching it pulls the party into the memory. They experience the loss firsthand. The cure requires the party to carry a message back: not "stop grieving" but "we saw what you loved. It mattered." When the god receives this message, the grief does not disappear - but it transforms. The dark crystals become clear. The disease becomes a memorial. The afflicted wakes with a single clear tear on their cheek and a memory that is not their own, but that they will carry with honor.',
  acts: [
    {
      title: 'Act 1: The Molecular World',
      summary: 'Orientation at atomic scale. The party learns to navigate a world where molecules are terrain, chemical bonds are infrastructure, and bacteria are wildlife.',
      keyEvents: [
        'The shrinking: the world expands around them like an explosion in reverse. A water droplet becomes an ocean. The party stands on a molecule and the horizon is chemistry.',
        'First navigation: walking on hydrogen bonds that flex underfoot like rope bridges made of light. Sliding between molecular clusters. Reading chemical gradients the way a sailor reads wind.',
        'Bacterial encounter: a neutrophil the size of a dragon drifts past, pseudopods extending like tentacles. It is not hostile — it is doing its job. The party is not on its list. Yet.',
        'The corruption: dark crystals growing between molecules like frost between stones. They hum with something that feels like sadness. A party member touches one and their eyes fill with tears they cannot explain.',
        'Quiet moment: the party rests inside the curve of a water molecule. The hydrogen bonds glow softly overhead like stars. Theren\'s voice crackles through the scrying link: "Are you alive? Please tell me you are alive."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Living Chemistry',
      summary: 'Deeper into the tear. The party encounters organized structures, hostile corruption, and the growing realization that this is not a normal disease.',
      keyEvents: [
        'The salt fortress: a sodium ion crystal, perfectly geometric. Inside, a pocket of chemical stability. Safe harbor.',
        'Corruption spreading: the dark crystals are growing faster. They consume molecular bonds and replace them with tangled grief.',
        'A memory fragment: touching a dark crystal shows the party a flash of divine memory. Love. Loss. Overwhelming sorrow.',
        'The realization: this is not a disease. This is an emotion. Crystallized divine grief infecting physical matter.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Core',
      summary: 'The party reaches the heart of the tear, experiences the god\'s loss, and discovers that the cure is not destruction but understanding.',
      keyEvents: [
        'The journey inward: through increasingly dense grief-crystal. The molecular landscape warps with sorrow.',
        'The core crystal: a single perfect structure. The complete memory. The full weight of divine loss.',
        'The memory: the party experiences what the god lost. It is devastating and beautiful and deeply personal.',
        'The cure: carrying the message back. Not "stop hurting" but "we saw what you loved." The crystals clear. The tear shines.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Alchemist Theren',
      role: 'mission architect / external support',
      personality: 'The wizard who designed the shrinking process. Brilliant, anxious, and monitoring the party from the outside via a scrying link. He can give advice but cannot help directly. He has never done this before. "Theoretically, this should work. Theoretically."',
    },
    {
      name: 'The Leukocyte',
      role: 'immune system entity / neutral force',
      personality: 'A neutrophil the size of a building. It patrols the drop\'s perimeter, consuming foreign bodies. The party is technically foreign. It has not noticed them yet. When it does, the party must convince it they are not a threat - or outrun a cell.',
    },
    {
      name: 'The Memory',
      role: 'the god\'s grief / the disease itself',
      personality: 'Not a person. A presence. The grief that crystallized into corruption. It does not want to hurt anyone. It does not want anything. It is pain without intent, loss without agency. Understanding it is the only way to address it.',
    },
    {
      name: 'The Afflicted',
      role: 'patient / stakes',
      personality: 'The mortal infected by the divine tear. They grow weaker as the grief-crystals spread. They have been dreaming of a place they have never been and mourning a loss they do not understand. They are brave and tired.',
    },
  ],
  keyLocations: [
    {
      name: 'The Molecular Ocean',
      description: 'A single drop of water at atomic scale. Crystalline water molecules the size of boulders, refracting light into permanent rainbows. Hydrogen bonds stretch between them as bridges of flexing light that hum when walked on.',
      significance: 'The campaign\'s entire terrain. Every journey is measured in nanometers. The most alien environment the party will ever explore — and it was sitting on someone\'s cheek.',
    },
    {
      name: 'The Salt Fortress',
      description: 'A sodium chloride crystal at atomic scale — a perfect geometric structure of alternating ions forming walls, floors, and ceilings of mathematical precision. Inside, a pocket of chemical stability where the corruption cannot reach. The walls taste exactly like you would expect.',
      significance: 'Safe harbor and rest point. Where the party catches their breath and Alchemist Theren contacts them through the scrying link, audibly relieved.',
    },
    {
      name: 'The Core Crystal',
      description: 'A single perfect dark crystal at the center of the tear. It pulses like a heartbeat. Touching it means experiencing divine grief firsthand — the full weight of a god\'s loss compressed into a single moment of contact.',
      significance: 'The campaign\'s final destination. Not a boss fight. A feeling. The party must endure it and carry the message back.',
    },
  ],
  dataSystems: ['magicalAnomaly', 'wildMagicExpanded', 'dreamCombat', 'dreamSequence', 'terrainAdvantage', 'socialEncounter', 'curseLayered', 'travelMontage'],
};
