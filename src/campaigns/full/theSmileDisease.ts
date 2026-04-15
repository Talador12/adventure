import type { FullCampaign } from '../types';

export const theSmileDisease: FullCampaign = {
  id: 'full-smile-disease',
  type: 'full',
  title: 'The Smile Disease',
  tagline: 'They cannot stop smiling. They can still scream.',
  tone: 'horror',
  themes: ['horror', 'urban', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'A plague is spreading through the city of Vellanor. It makes people smile. Not a happy smile — a rictus, frozen, ear-to-ear grin that locks the face into an expression of joy. The infected can still talk, still cry, still scream, but the smile never wavers. It spreads through sustained eye contact with the infected. And the infected are drawn to crowds, to gatherings, to anywhere they can look into the eyes of the uninfected.',
  hook: 'The party arrives at Vellanor\'s gates. The guards wear blindfolds. "Do not look the smilers in the eye. Do not let them look you in the eye. If you see someone grinning, look away." Inside, the city is half-quarantined. The smiling infected wander in groups, gravitating toward markets, temples, anywhere people gather. They reach out, gently, trying to turn faces toward them. "Please look at me," they say through frozen grins. "I just want you to be happy."',
  twist:
    'The smile is not a disease. It is a blessing — genuinely intended to bring happiness — bestowed by a minor god of joy named Felara. She cannot understand mortal emotion beyond its surface expression. To her, smiling means happy, and she wants everyone to be happy. She does not comprehend that forcing an expression of joy onto someone who is suffering is a form of cruelty. She is not malicious. She is catastrophically naive. Curing the plague means convincing a god that she does not understand happiness.',
  climax:
    'Felara manifests in Vellanor\'s central temple, radiant and confused by the fear and suffering around her. She genuinely does not understand why people are upset. "But they are smiling. Smiling means happy." The party must explain suffering, grief, and the difference between genuine joy and a mask — to a divine being who has never experienced sadness. If they succeed, she lifts the blessing. If they fail, she doubles it, convinced more smiles will fix the problem.',
  acts: [
    {
      title: 'Act 1: The Grinning City',
      summary:
        'The party navigates a city in crisis. The infected smile through tears, through pleas, through screams. The uninfected hide behind blindfolds and closed shutters. Quarantine is failing because the infected actively seek crowds.',
      keyEvents: [
        'The gates: blindfolded guards, the rules of infection, the first sight of a smiler',
        'Market district: a crowd of infected, grinning, reaching out, whispering "look at me"',
        'A child, infected, crying, grinning, asking her mother why she will not look at her',
        'Infection vector confirmed: sustained eye contact, approximately three seconds',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Source',
      summary:
        'Investigation into the plague\'s origin. It is not biological, not arcane in any familiar way. It traces back to the temple of a minor deity nobody paid attention to. The "cure" is theological, not medical.',
      keyEvents: [
        'Medical dead end: no poison, no parasite, no curse signature — the smile is divine magic',
        'Temple of Felara: a forgotten shrine where the plague began, radiating warm golden light',
        'Felara\'s doctrine: old texts describe her as "the goddess who wants everyone to smile"',
        'Communication attempt: prayer at the shrine receives a response — warm, loving, and completely missing the point',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Teaching a God to Cry',
      summary:
        'Felara manifests. She is kind, powerful, and unable to understand why her blessing is causing pain. The party must do the hardest thing in the campaign: explain human suffering to an entity that has never felt it.',
      keyEvents: [
        'Manifestation: Felara appears in the temple, golden and smiling, surrounded by weeping, grinning worshippers',
        'The first attempt: logical arguments bounce off divine certainty — "But look, they are smiling"',
        'Emotional demonstration: the party must show Felara what the smile hides — grief, fear, loss, all visible beneath the frozen grin',
        'Understanding: Felara sees the truth for the first time and is devastated — a god learns sadness',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Captain Dorst',
      role: 'city guard / quest giver',
      personality:
        'Head of the quarantine effort. Blindfolded, exhausted, and barely holding it together. His wife is infected. He can hear her smiling through the door of the room he locked her in. He has not slept in days.',
    },
    {
      name: 'Sister Vell',
      role: 'temple keeper / ally',
      personality:
        'A priestess who tended Felara\'s forgotten shrine for decades. She is infected but resists the urge to spread it. She understands what Felara is trying to do and why it is wrong. Speaking through a permanent grin, she guides the party.',
    },
    {
      name: 'Felara',
      role: 'the goddess / unintentional antagonist',
      personality:
        'A minor goddess of joy. Warm, loving, and fundamentally unable to comprehend negative emotion. She is not evil. She is a being of pure happiness who has never experienced — and cannot imagine — sadness. Teaching her is the campaign\'s final challenge.',
    },
  ],
  keyLocations: [
    {
      name: 'Vellanor',
      description: 'A mid-sized city divided between the smiling infected and the blindfolded uninfected. Markets are empty. Doors are barred. The sound of people crying while grinning carries through the streets.',
      significance: 'The campaign setting and quarantine zone.',
    },
    {
      name: 'Temple of Felara',
      description: 'A small, forgotten shrine now radiating golden warmth. The epicenter of the plague. Infected gravitate toward it like moths.',
      significance: 'Where the plague began and where Felara can be contacted and confronted.',
    },
    {
      name: 'The Quarantine Ward',
      description: 'A converted warehouse where the most severely infected are held. Rows of grinning, weeping people strapped to beds. The staff work blindfolded.',
      significance: 'The emotional core of the horror — where the party sees the plague\'s full toll.',
    },
  ],
  dataSystems: [
    'plagueProgression',
    'mindControl',
    'urbanEncounter',
    'npcSchedule',
    'cataclysmCountdown',
    'socialEncounter',
    'magicalAnomaly',
    'diplomaticNegotiation',
  ],
};
