import type { FullCampaign } from '../types';

export const thePlagueOfDreams: FullCampaign = {
  id: 'full-plague-dreams',
  type: 'full',
  title: 'The Plague of Dreams',
  tagline: 'She has not slept in twenty-one days. She can see her nightmare standing at the foot of the bed. It is also exhausted.',
  tone: 'horror',
  themes: ['horror', 'urban', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'A citywide insomnia plague has struck Greyhallow — nobody can sleep. After three weeks, people are hallucinating, violent, and dying. The dreams didn\'t just stop — they left. They are now loose in the city as semi-physical manifestations: nightmares stalk the streets at night, daydreams lure people into catatonic reverie, and forgotten dreams whisper secrets from alleyways.',
  hook: 'The party hasn\'t slept in 48 hours. Nobody in Greyhallow has. A doctor offers them a deal: she has a limited supply of dream-essence that can simulate sleep, enough for a week. In exchange, she needs them to find out why the dreams left and how to bring them back.',
  twist:
    'A child in Greyhallow — a girl named Wren — has a rare gift: she\'s a dreamweaver, able to pull dreams from the collective unconscious. She was kidnapped by a nightmare merchant who is harvesting her gift to bottle and sell dreams to wealthy clients in other cities. The plague isn\'t natural — one person is siphoning an entire city\'s dreams through one child.',
  climax:
    'The party tracks the nightmare merchant to his lair — a warehouse where Wren is connected to a dream-extraction apparatus. Her nightmares have become the creatures stalking the city. Freeing her is dangerous: severing the connection will release all stored dreams at once, flooding the city with a reality-warping dreamstorm. The party must free Wren AND contain the storm.',
  acts: [
    {
      title: 'Act 1: Sleepless',
      summary:
        'The party experiences the insomnia plague, encounters dream manifestations, and begins investigating while fighting exhaustion.',
      keyEvents: [
        'The plague: three weeks without sleep, the city is breaking down. Streetlights stay on because nobody turns them off. The smell of stale coffee is everywhere. A guard stands at his post, eyes open, swaying - not awake, not asleep, something between.',
        'Dream manifestations: nightmares stalk the streets as shifting shapes that smell like childhood fears - wet basements, burning hair, the dark under the bed. Daydreams drift as golden motes that lure people into catatonic reverie.',
        'The doctor provides dream-essence: limited supply, ticking clock',
        'First clue: all manifestations are heading toward the same part of the city',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Dream Trail',
      summary:
        'Following the manifestations to their source. The party enters dream-adjacent spaces where the boundary between waking and sleeping has thinned.',
      keyEvents: [
        'The dream district: a neighborhood where reality is unreliable',
        'Captured nightmare interrogation: it doesn\'t want to be loose either',
        'Wren\'s empty house: a child\'s bedroom, drawings of nightmares, parents missing',
        'The nightmare merchant\'s trail: bottled dreams, wealthy buyers, a business empire',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Dreamstorm',
      summary:
        'The warehouse, the extraction apparatus, and the choice: free Wren gently (takes time the city doesn\'t have) or sever the connection (instant dreamstorm).',
      keyEvents: [
        'The warehouse: a factory of bottled dreams, nightmare guards, Wren at the center',
        'The merchant reveals himself: a fey creature who considers dreams a natural resource',
        'Freeing Wren: the apparatus is complex, the connection is deep',
        'The dreamstorm: all dreams released at once — reality warps, the party fights through chaos',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Doctor Asha Venn',
      role: 'quest giver / supplier',
      personality:
        'A brilliant physician who reverse-engineered dream-essence from captured manifestations. She speaks in a rapid, clipped cadence and touches her own face frequently, as if checking she is awake. Dark circles under her eyes have deepened to bruises. She measures dream-essence in fractions of a drop and her hands shake when the vial is low. Exhausted, pragmatic, running out of both time and supply.',
    },
    {
      name: 'Wren',
      role: 'kidnapped child / dreamweaver',
      personality:
        'A 9-year-old with the rare ability to weave dreams. Trapped in a half-sleep state, conscious but unable to wake fully. Her nightmares are the monsters in the streets. She\'s terrified.',
      secret: 'She can hear the party through the dream-connection. She\'s been trying to leave them clues in the manifestations.',
    },
    {
      name: 'The Sandman (nightmare merchant)',
      role: 'primary antagonist',
      personality:
        'A fey creature who sees dreams as a commodity. Charming, amoral, genuinely doesn\'t understand why people need to sleep. "Dreams are wasted on sleepers. I\'m simply... redistributing."',
    },
    {
      name: 'Captain Grey',
      role: 'city watch / desperate ally',
      personality:
        'Head of the city watch, running on no sleep for three weeks. Making increasingly bad decisions. "I arrested a mailbox this morning. I thought it was suspicious. I need you to fix this."',
    },
  ],
  keyLocations: [
    {
      name: 'Greyhallow',
      description: 'A city that hasn\'t slept in three weeks. Streetlights stay on. People wander at all hours. The boundary between waking and dreaming is paper-thin.',
      significance: 'The setting and the patient.',
    },
    {
      name: 'The Dream District',
      description: 'A neighborhood where dreams have physically seeped into reality. Walls breathe. Streets lead to impossible places. Time flows oddly.',
      significance: 'Where the investigation intensifies.',
    },
    {
      name: 'The Dream Factory',
      description: 'A converted warehouse where dreams are extracted, bottled, and shipped. Wren is connected to the apparatus at its center.',
      significance: 'The final confrontation location.',
    },
  ],
  dataSystems: [
    'dreamSequence',
    'hauntedLocation',
    'magicalAnomaly',
    'detectiveCase',
    'mindControl',
    'magicalDisease',
    'npcBackstoryGen',
    'cataclysmCountdown',
    'encounterWaves',
  ],
};
