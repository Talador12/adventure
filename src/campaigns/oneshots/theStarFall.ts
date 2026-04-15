import type { OneShotCampaign } from '../types';

export const theStarFall: OneShotCampaign = {
  id: 'oneshot-star-fall',
  type: 'oneshot',
  title: 'The Star Fall',
  tagline: 'A star is falling. Not a meteor - an actual star. Inside it: a civilization.',
  tone: 'epic',
  themes: ['epic', 'planar', 'exploration'],
  playerCount: { min: 3, max: 6 },
  level: 10,
  estimatedHours: 3,
  settingSummary:
    'A star is descending from the celestial sphere toward the mortal world. Not a meteor - a living star with a civilization of light-beings inside it. They are seeking refuge. Their star is dying, and they need a new home. When they land, their radiant energy will transform a hundred miles of landscape into something alien and beautiful but uninhabitable for mortals. The party must negotiate first contact.',
  hook: 'The star grows larger every hour, visible even at noon. The Arcane Observatory calculates: "Impact in twelve hours. But it is not impact - it is landing. Something inside is steering it. They are coming here on purpose."',
  twist: 'The star-beings are not refugees. They are the original inhabitants of this world, who ascended into the celestial sphere millennia ago. They are coming home. The mortal civilizations that grew in their absence are, from the star-beings\' perspective, squatters. They do not want war - but they believe the world belongs to them.',
  climax: 'First contact. The star opens and a delegation of light-beings emerges. They present ancient deeds to the world. The party must negotiate between beings who own the world by birthright and mortals who built a civilization on it. Neither side is wrong. Both cannot have everything.',
  scenes: [
    {
      title: 'Scene 1: The Approach',
      summary: 'The star descends. The party prepares for first contact with a civilization from the sky.',
      challenge: 'exploration',
      keyEvents: [
        'The star: growing larger, radiating warmth, clearly steered - it adjusts trajectory as mountains near',
        'The impact zone: a valley - if the star lands, everything in the valley becomes radiant landscape',
        'Communication attempts: divination, sending, signal fires - the star-beings respond with light patterns',
        'The ascent: the party rides to the landing site - or upward to meet the star mid-descent',
      ],
    },
    {
      title: 'Scene 2: Inside the Star',
      summary: 'Entering the star. Meeting the light-beings. Understanding their claim and their need.',
      challenge: 'social',
      keyEvents: [
        'The interior: a crystalline world of pure light, geometric structures, and beings made of radiance',
        'Communication: the light-beings speak in colors and harmonics - translation is itself a challenge',
        'Their story: they ascended when the world was young, now their star dies and they return',
        'The deeds: ancient documents in a language that predates mortal writing - their claim is genuine',
      ],
    },
    {
      title: 'Scene 3: The Negotiation',
      summary: 'Two civilizations. One world. A negotiation that will define the future of both.',
      challenge: 'social',
      keyEvents: [
        'The light-beings\' demand: the valley is theirs - they will transform it into a habitat for their kind',
        'The mortal argument: people live in that valley - you cannot just claim land with ancient deeds',
        'The compromise space: shared territory, phased transition, separate zones, or something new',
        'The landing: the star touches down regardless of the negotiation outcome - the question is what happens next',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Lux Prima', role: 'light-being ambassador', personality: 'The eldest of the star-beings. Communicates in shifting colors. Patient by nature - she has existed for millions of years. She does not understand mortal urgency but respects it.' },
    { name: 'Governor Thane', role: 'mortal authority', personality: 'The governor of the valley the star is targeting. Responsible for ten thousand lives. Pragmatic, scared, and willing to negotiate if the alternative is extinction.' },
    { name: 'Translator Kira', role: 'linguistic bridge', personality: 'A mortal scholar who has studied ancient light-scripts. She is the only person who can partially communicate with the star-beings. Overwhelmed but rising to the moment.' },
  ],
  keyLocations: [
    { name: 'The Valley', description: 'A fertile valley with farming communities, a river, and ten thousand people who are about to become first contact\'s collateral.', significance: 'The landing zone and the mortal stake.' },
    { name: 'Inside the Star', description: 'A world of crystalline geometry and living light. Beautiful, alien, and slowly dying as the star\'s energy fades.', significance: 'Where the party meets the light-beings and understands their need.' },
    { name: 'The Landing Site', description: 'The exact spot where the star touches the ground. When it does, the earth transforms into radiant crystal for a hundred miles.', significance: 'Where two worlds literally collide.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
