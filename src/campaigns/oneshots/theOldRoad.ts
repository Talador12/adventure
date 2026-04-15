import type { OneShotCampaign } from '../types';

export const theOldRoad: OneShotCampaign = {
  id: 'oneshot-old-road',
  type: 'oneshot',
  title: 'The Old Road',
  tagline: 'An ancient road everyone forgot. The trees grew over it centuries ago. Where does it go?',
  tone: 'exploration',
  themes: ['exploration', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A logging crew cuts down an old oak and finds cobblestones beneath its roots. Then another tree, same thing. The stones form a road that no map records, heading straight into deep forest. The road is masterfully built, better than anything in the current kingdom. The party follows it.',
  hook: 'The logging foreman shows the party the road. "These stones are fitted so tight you cannot slip a knife between them. We have nothing this good in the capital. And it goes straight into the Thornwood, where nobody has gone in living memory."',
  twist: 'The road leads to a perfectly preserved way station built by a civilization that predates all known history. The station is still functional, its preservation magic intact, and it contains a map showing a network of roads connecting cities that no longer exist. One road on the map leads to a city that is still inhabited: the party\'s own home city. It was built on the ruins and nobody knew.',
  climax: 'The way station\'s preservation magic is fading. The party must choose: take what they can carry and let it crumble, or find a way to restore it and preserve this link to a forgotten past.',
  scenes: [
    {
      title: 'Scene 1: Clearing the Path',
      summary: 'Following the buried road through dense forest. The further they go, the more intact it becomes. Something preserved it.',
      challenge: 'exploration',
      keyEvents: [
        'Clearing brush and roots to follow the cobblestones deeper into the forest',
        'Milestones carved in an unknown language, spaced at regular intervals',
        'The forest thins around the road as if the trees chose not to grow on it',
        'Animal behavior: wildlife avoids the road entirely, as if it is territory they respect',
      ],
    },
    {
      title: 'Scene 2: The Way Station',
      summary: 'Discovering the station at the road\'s end. Perfectly preserved, fully stocked, with a map that rewrites history.',
      challenge: 'exploration',
      keyEvents: [
        'The station: a stone building in a clearing, clean and intact despite millennia of age',
        'Inside: beds, supplies, a hearth that lights itself, and a map room',
        'The map: an entire road network connecting dozens of cities, all gone except one',
        'The realization: their home city sits on the foundations of one of these ancient places',
      ],
    },
    {
      title: 'Scene 3: The Fading',
      summary: 'The preservation magic that kept the station intact is failing. The party must act before it crumbles.',
      challenge: 'puzzle',
      keyEvents: [
        'Cracks appear in the walls. Dust falls from the ceiling. The hearth flickers',
        'The preservation runes can be recharged with magical energy, but at a cost',
        'Artifacts in the station: tools, books, and a keystone that could anchor the magic',
        'The decision: save the station, salvage what they can, or try to move the keystone home',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Foreman Bruck', role: 'quest giver', personality: 'A gruff lumberjack who does not believe in magic but cannot deny what he found. "I cut trees. I do not discover lost civilizations. Yet here we are."' },
    { name: 'The Station', role: 'sentient location', personality: 'The station has a faint awareness, responding to visitors with warmth and light. It has waited a long time for travelers. It cannot speak, but it welcomes.' },
    { name: 'Sage Delara', role: 'ally', personality: 'A historian from town who follows the party uninvited. Overwhelmed by the discovery. "This rewrites everything. Everything. Do you understand?"' },
  ],
  keyLocations: [
    { name: 'The Buried Road', description: 'Ancient cobblestones hidden beneath centuries of forest growth, fitted with impossible precision.', significance: 'The path that leads to the discovery and builds anticipation.' },
    { name: 'The Way Station', description: 'A perfectly preserved rest stop from a civilization that predates all known history.', significance: 'The heart of the adventure. Everything is learned here.' },
    { name: 'The Map Room', description: 'A chamber with a carved relief map showing roads connecting cities that no longer exist.', significance: 'The revelation that changes the party\'s understanding of their world.' },
  ],
  dataSystems: ['explorationChallenge', 'ancientRuins', 'puzzleLock', 'weatherGenerator', 'magicItemGenerator'],
};
