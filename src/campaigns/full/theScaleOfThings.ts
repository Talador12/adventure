import type { FullCampaign } from '../types';

export const theScaleOfThings: FullCampaign = {
  id: 'full-scale-of-things',
  type: 'full',
  title: 'The Scale of Things',
  tagline: 'You are not growing. The world is shrinking. And it will not stop.',
  tone: 'exploration',
  themes: ['exploration', 'planar', 'meta'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 15 },
  estimatedSessions: 15,
  settingSummary:
    'The party begins as motes of sentient magic - barely conscious sparks drifting in the Weave, the fabric of arcane reality. They have no bodies. They have impressions, impulses, and a growing awareness that they are alive. As they gain coherence, the world around them seems to change scale. First they are the size of insects, navigating a single room as an epic landscape. Then humanoid, navigating cities. Then enormous, striding between planes. The campaign is about perspective - how the same reality looks completely different depending on where you stand.',
  hook:
    'Awareness. A spark in the dark. The party coalesces from the Weave into tiny motes of light no larger than dust. They drift through a world of impossible scale: a wooden floor that stretches like a desert, a chair leg that towers like a redwood, a sleeping cat whose breathing shakes the ground. They are alive. They do not know why. Something in the Weave whispered: "Grow. Before it is too late."',
  twist:
    'The party is not growing. The world is shrinking. Something is collapsing reality, compressing the planes, crushing the distance between things. The party has stayed the same size throughout the entire campaign. Everything else got smaller. At the current rate, there will be nothing left. The "growth" was an illusion created by their perspective changing as the world contracted around them.',
  climax:
    'The party, now seemingly enormous, discovers the Loom - the mechanism that weaves reality. It is unraveling. A being called the Collapser is pulling threads, compressing existence into a single point. The final encounter is not a fight against a monster but against entropy itself. The party must re-weave reality at the scale they now understand, using everything they learned at every size.',
  acts: [
    {
      title: 'Act 1: The Size of Dust',
      summary:
        'The party exists at insect scale. A single room is an entire world. A bookshelf is a mountain range. A cat is a dragon. A dropped crumb is a feast. The party gains physical form, learns to interact with the world, and discovers that this room is inside a wizard\'s tower - and the wizard is missing.',
      keyEvents: [
        'Awakening as motes of light in the Weave, drifting through a world of impossible scale',
        'First physical form: tiny bodies made of crystallized magic, no larger than a thimble',
        'The bookshelf mountains: climbing a shelf to find a journal written in letters taller than they are',
        'The cat: Whiskers, a tabby who is functionally a dragon at this scale. Territorial. Curious.',
        'Finding the wizard\'s journal entry: "The world is getting smaller. Or I am getting bigger. I cannot tell."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Size of People',
      summary:
        'The party is now humanoid-sized (or the world has shrunk to match). They navigate a city, interact with people, and investigate the missing wizard. The world feels normal - but edges are blurring. Distant mountains look closer than they should.',
      keyEvents: [
        'Stepping outside the tower at "normal" size - a city that feels familiar but slightly compressed',
        'Investigating the wizard\'s disappearance: colleagues say he was obsessed with "the scale problem"',
        'The first clue: a cartographer whose maps keep needing smaller scales. "The continents are closer together."',
        'A planar scholar confirms: the distance between planes is shrinking. The Feywild is bleeding into the material.',
        'The party notices: they have not grown. Their room in the tower is the same. The TOWER is smaller.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Size of Gods',
      summary:
        'The world has shrunk drastically. The party strides between planes. Mountains are stepping stones. Cities fit in their palm. They find the Loom and the Collapser and must weave reality back together using perspective gained at every scale.',
      keyEvents: [
        'Walking between planes in a single step - the boundaries between worlds are tissue-thin',
        'Finding the Loom: the mechanism that weaves reality, located in the space between all planes',
        'The Collapser: not a villain but a process. Reality is unraveling because the Weave is fraying at the edges.',
        'The missing wizard: he tried to fix it alone and became part of the Loom, holding it together with his body',
        'The final weave: the party must re-thread reality using knowledge from every scale they have experienced',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Whiskers',
      role: 'dragon (cat) / Act 1 threat',
      personality:
        'A perfectly ordinary tabby cat who is, at Act 1 scale, the most terrifying creature the party has ever encountered. Purrs like an earthquake. Yawns like a cave opening. Bats at the party with a paw the size of a wagon. It is not hostile. It is playing. The distinction is academic when you are the size of a thimble.',
    },
    {
      name: 'Archmage Toven Quill',
      role: 'missing wizard / tragic figure',
      personality:
        'A brilliant wizard who discovered the collapse and tried to stop it alone. He failed and fused himself into the Loom to slow the unraveling. He can speak to the party as a voice in the threads.',
      secret: 'He created the party. The motes of sentient magic were his last spell - a consciousness that could perceive at any scale and fix what he could not.',
    },
    {
      name: 'The Cartographer',
      role: 'ally / evidence',
      personality:
        'A gnome mapmaker who has been documenting the shrinking world for years. Everyone thinks she is crazy. Her maps are the only accurate record of reality\'s collapse. Obsessive, vindicated, and slightly smug about it.',
    },
    {
      name: 'The Collapser',
      role: 'antagonist / force',
      personality:
        'Not a being. A process. The natural entropy of the Weave when nothing maintains it. It has no malice. It has momentum. Stopping it is like stopping a river - you need to redirect, not block.',
    },
  ],
  keyLocations: [
    {
      name: 'The Wizard\'s Study',
      description:
        'A single room that is an entire world at Act 1 scale. Bookshelves like mountain ranges, a desk like a plateau, and a cat.',
      significance: 'The starting world. Returns in Act 3 as the party realizes they never left - the room just shrank.',
    },
    {
      name: 'The Compressed City',
      description:
        'A normal-looking city where the horizon is too close and the sky feels like a ceiling. Beautiful but claustrophobic if you pay attention.',
      significance: 'Act 2\'s setting. Where the party investigates and the truth begins to emerge.',
    },
    {
      name: 'The Loom',
      description:
        'A structure between all planes where reality is woven from threads of elemental force. Fraying, dimming, and held together by the body of a dead wizard.',
      significance: 'The final location. Where the campaign resolves.',
    },
  ],
  dataSystems: ['magicalEcosystem', 'puzzleRoom', 'dungeonRoom', 'weatherEvent', 'planarAnomaly'],
};
