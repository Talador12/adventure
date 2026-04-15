import type { FullCampaign } from '../types';

export const theEdgeOfTheMap: FullCampaign = {
  id: 'full-edge-of-the-map',
  type: 'full',
  title: 'The Edge of the Map',
  tagline: 'Beyond the mapped world is more world. It has been watching yours.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness', 'political'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 20,
  settingSummary:
    'The Cartographers\' Consortium has mapped every inch of the known world. Beyond the last ink line: a white void on parchment labeled "Terra Incognita." The party is the first sanctioned expedition past that line. Every day of travel reveals a new biome, a new civilization, a new law of nature that contradicts the old ones. The mapmaker who funded the expedition insists on weekly reports. His questions are oddly specific.',
  hook: 'The Consortium posts a bounty: ten thousand gold for a verified map of what lies beyond the Pale Meridian. The catch — three previous expeditions never returned. The party is expedition four, outfitted by a wealthy cartographer named Aldric Voss who insists on joining. "I need to see it with my own eyes." He is lying about why.',
  twist:
    'The "unknown" lands have always known about the "known" world. An advanced civilization called the Veilkeepers has been deliberately hiding behind a massive illusion barrier for centuries. The party\'s expedition just punched a visible hole in the Veil. Now the Veilkeepers must decide: reveal themselves or silence the expedition. Aldric Voss knew the Veil existed. He funded the expedition to break it, because the Veilkeepers exiled his ancestors.',
  climax:
    'The Veilkeepers\' council debates whether to destroy the party, erase their memories, or finally lower the Veil and make contact. Aldric reveals his true agenda — revenge, not discovery. The party must choose: help Aldric tear the Veil down (exposing both civilizations to each other), convince the Veilkeepers to open willingly, or respect their wish to remain hidden and destroy their own maps.',
  acts: [
    {
      title: 'Act 1: Into the White',
      summary:
        'The expedition crosses the Pale Meridian and enters unmapped territory. New biomes, strange creatures, and ruins older than the known world. Aldric Voss pushes them in a suspiciously specific direction.',
      keyEvents: [
        'Crossing the Pale Meridian — the world does not end, but compass and stars shift',
        'First new biome: a forest where gravity pulls sideways near certain trees',
        'Discovery of ruins with writing that predates any known language',
        'Aldric steers the party toward a mountain pass he should not know about',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: First Contact',
      summary:
        'The party encounters the Veilkeepers — a civilization that has been watching the known world through the Veil for centuries. They are not pleased about being found.',
      keyEvents: [
        'Scouts from the Veilkeepers intercept the party — not hostile, but firm',
        'Taken to a border outpost where they learn the Veil is a deliberate barrier',
        'The Veilkeepers show them what they know about the "known" world — it is a lot',
        'Aldric is recognized — his family name is in Veilkeeper records as exiles',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Veil Decision',
      summary:
        'Aldric\'s true plan comes to light. The Veilkeeper council fractures over what to do. The party becomes the deciding voice in whether two civilizations meet or stay apart forever.',
      keyEvents: [
        'Aldric attempts to sabotage the Veil generator, forcing the party to choose sides',
        'Council of the Veilkeepers: factions for war, isolation, and openness argue their cases',
        'The party presents their case — their choice shapes the council vote',
        'The Veil falls, holds, or opens a door — depending on the party\'s actions',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Aldric Voss',
      role: 'patron / secret antagonist',
      personality:
        'A charming, educated cartographer who funded the expedition. Generous and knowledgeable. Asks too many questions about landmarks that should not exist.',
      secret: 'His ancestors were Veilkeepers exiled for advocating contact with the known world. He has spent his fortune engineering this expedition to tear the Veil down as revenge.',
    },
    {
      name: 'Warden Thessaly',
      role: 'Veilkeeper leader',
      personality:
        'The head of the Veilkeeper border guard. Pragmatic, cautious, but curious. She has spent her career keeping the Veil intact and is not sure she still believes in it.',
    },
    {
      name: 'Fen',
      role: 'expedition guide',
      personality:
        'A ranger from the frontier who has spent years staring at the Pale Meridian. Quiet, competent, deeply unsettled by what they find. "I always thought there was something out there. I was right. I wish I wasn\'t."',
    },
  ],
  keyLocations: [
    {
      name: 'The Pale Meridian',
      description: 'The edge of the known map — a line of cairns stretching across the continent where cartographers stopped mapping.',
      significance: 'The threshold the party crosses to begin the expedition.',
    },
    {
      name: 'The Sideways Forest',
      description: 'A vast woodland where gravity bends near ancient trees. Rivers flow uphill. Birds fly in spirals.',
      significance: 'First encounter with how different reality is beyond the Veil.',
    },
    {
      name: 'Veilthorn',
      description: 'The Veilkeeper capital — a city built into a mountain range, invisible from the known world side.',
      significance: 'Where the council meets and the Veil generator is housed.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'randomBiome',
    'diplomaticNegotiation',
    'ancientRuins',
    'politicalEvent',
    'npcSchedule',
    'magicalAnomaly',
    'secretSociety',
  ],
};
