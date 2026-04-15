import type { FullCampaign } from '../types';

export const theInfiniteGrowth: FullCampaign = {
  id: 'full-the-infinite-growth',
  type: 'full',
  title: 'The Infinite Growth',
  tagline: 'You will not stop growing. At some point, you will be too big to hold the things you love.',
  tone: 'epic',
  themes: ['epic', 'planar', 'exploration'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 20 },
  estimatedSessions: 18,
  settingSummary:
    'The party grows. And does not stop. Session 1: human-sized. Session 5: building-sized. Session 10: mountain-sized. Session 15: continent-sized. Session 18: planet-sized. Each tier of scale reveals a new tier of reality. At building-size, they are the monsters everyone fears. At mountain-size, they are geography - rivers divert around their feet, weather patterns form around their bodies. At planet-size, they are gods. But every step up means everything they loved gets smaller. A friend is an ant. A city is a pebble. The emotional core is devastating: growth without limit is not power. It is loss.',
  hook:
    'The party touches a pulsing obelisk in a ruin. It brands them with a sigil that glows brighter each day. By the second dawn, they have each grown a foot. By the fifth, they do not fit through doors. A sage identifies the sigil as the Mark of the Colossus - an ancient weapon system designed to grow soldiers to fight a cosmic threat. The growth cannot be stopped. The threat it was designed to fight still exists. And it is already here.',
  twist:
    'The universe is a cell. A living organism at a scale so vast that galaxies are molecules. Something has infected it - a parasitic entity called the Blight that feeds on dimensional membranes. The Mark of the Colossus was not a weapon against an army. It is an immune response. The party are antibodies, grown to match the scale of the infection. The Blight is sentient. It is afraid. It has been running from the immune system for eons. And it does not want to die.',
  climax:
    'At cosmic scale, the party confronts the Blight - a terrified, ancient being that infects realities because it has no home dimension of its own. It was born between worlds and has never belonged anywhere. The fight is possible (and epic), but the alternative is harder and more interesting: create a dimension for the Blight. Give it a home. Cure the infection by treating the cause, not the symptom. Either way, the party must choose whether to shrink back down (losing their cosmic awareness) or remain at universe-scale forever.',
  acts: [
    {
      title: 'Act 1: The Monster Phase (Human to Building)',
      summary:
        'The party grows from human-sized to roughly 200 feet tall. The world goes from accommodating to hostile. Guards attack them. Cities evacuate. The party is the monster in someone else adventure. They must find allies who see past their size while researching the Mark of the Colossus.',
      keyEvents: [
        'First growth spurt: doors stop working. Then hallways. Then buildings.',
        'The party accidentally terrifies a village just by walking toward it. An adventuring party is dispatched to "slay the giants."',
        'A wizard measures their growth rate and delivers the grim math: at this rate, they will be mountain-sized in weeks',
        'Finding the Colossus Archives: a ruin scaled for giants. The first place that fits. It contains records of previous "immune responses."',
        'A friend from before the growth tries to visit. The party member cannot hear them without crouching. The friend is scared.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Geography Phase (Building to Continent)',
      summary:
        'The party becomes landscape. Rivers reroute around their ankles. Cities exist in their shadows. Weather forms around their heads. They can see the curvature of the world. They discover the dimensional membrane and the Blight eating through it - visible only at this scale.',
      keyEvents: [
        'The party steps over a mountain range. What used to be a week of travel is a single stride.',
        'A kingdom builds a temple to them, thinking they are gods. The party tries to explain they are just people.',
        'Seeing the Blight for the first time: dark tendrils eating through the dimensional membrane like mold through bread',
        'Communication becomes impossible: their voice creates thunderclaps. They must find non-destructive ways to interact.',
        'The emotional gut-punch: a player character childhood home is now smaller than their thumbnail.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Cosmic Phase (Continent to Universe)',
      summary:
        'The party outgrows the planet. Then the solar system. Then the plane. At cosmic scale, reality looks like a living organism - and the Blight is a visible infection. The party confronts it as immune cells confronting a virus. But the virus can talk.',
      keyEvents: [
        'Leaving the planet surface: the world shrinks to a marble. Everyone the party ever knew lives on that marble.',
        'Perceiving the dimensional structure: planes stacked like cells, membranes between them pulsing with life',
        'The Blight speaks: "I did not choose to be born between your worlds. I have no home. I eat because I am starving."',
        'The fight option: an epic battle at cosmic scale, punching through dimensions, using stars as weapons',
        'The mercy option: the party collaborates with the Blight to create a new dimension - a home for something that never had one',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Sage Orrin Duskfield',
      role: 'researcher / early ally',
      personality:
        'A planar mathematician who calculates the party growth rate and delivers the news with clinical precision and private terror. As the party grows, he shrinks relative to them - eventually communicating via signal fire because they cannot hear his voice.',
    },
    {
      name: 'The Blight',
      role: 'antagonist / tragic figure',
      personality:
        'A cosmic parasite that feeds on dimensional membranes. Sentient, ancient, and desperately lonely. It was born in the space between dimensions and has never had a home. It does not want to destroy - it wants to belong. It infects because hunger is all it knows.',
      secret: 'It has tried to stop eating. It cannot. It has prayed for something to kill it. The party are the first things big enough to either destroy it or save it.',
    },
    {
      name: 'Captain Elia Shrike',
      role: 'mortal perspective / ally',
      personality:
        'A human soldier who leads the "do not panic about the growing giants" task force for a kingdom. Pragmatic, brave, and increasingly out of her depth. She communicates with the party via increasingly large signal flags. Never stops treating them like people.',
    },
    {
      name: 'The Previous Colossus',
      role: 'warning / ghost',
      personality:
        'The last being who carried the Mark, grown to cosmic scale and frozen in place between stars. A statue the size of a galaxy. Still conscious. Has been alone for millions of years. Whispers to the party: "Do not hesitate like I did."',
    },
  ],
  keyLocations: [
    {
      name: 'The Colossus Archives',
      description: 'A ruin built at giant scale, clearly designed for previous Mark-bearers. Contains records, warnings, and a growth chart etched into a cliff face with hundreds of names.',
      significance: 'The first place that fits the party. Provides context for the immune response.',
    },
    {
      name: 'The Membrane',
      description: 'The boundary between dimensions, visible only at continental scale or larger. Looks like a soap bubble wall made of aurora light. The Blight shows as dark spots eating through it.',
      significance: 'Where the true threat becomes visible and the campaign shifts from personal to cosmic.',
    },
    {
      name: 'The Between',
      description: 'The space between all dimensions. Empty. Cold. Where the Blight was born. Nothing exists here naturally. It is the loneliest place in all of existence.',
      significance: 'Where the final confrontation occurs and where a new dimension could be seeded.',
    },
  ],
  dataSystems: ['planarAnomaly', 'combatNarration', 'environmentalHazard', 'emotionalBeat', 'epicBoon'],
};
