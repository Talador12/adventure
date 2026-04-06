import type { FullCampaign } from '../types';

export const theBlindCity: FullCampaign = {
  id: 'full-blind-city',
  type: 'full',
  title: 'The Blind City',
  tagline: 'Everyone in Ashen can see perfectly. Except the truth.',
  tone: 'mystery',
  themes: ['mystery', 'urban', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Ashen appears perfect — no crime, no poverty, no conflict. Citizens smile, work, and never complain. The party arrives and immediately feels wrong. A zone of divine magic covers the city, making every citizen perceive reality as ideal. They literally cannot see ugliness, injustice, or suffering. The party, as outsiders, sees the truth: the city is rotting.',
  hook: 'The party enters Ashen. A guard greets them cheerfully. Behind him, a building is clearly on fire. Nobody reacts. A woman walks through rubble, stepping around debris she doesn\'t appear to see. A child cries in an alley — the mother walks past, smiling. "Welcome to Ashen! Best city in the realm!"',
  twist:
    'The illusion isn\'t divine — it\'s a creature. A psychic parasite attached to the city\'s central temple has been feeding on negative emotions for decades, and the easiest way to feed is to prevent anyone from noticing the problems that create negative emotions. The city isn\'t happy — it\'s anaesthetized. The creature doesn\'t care about the city. It\'s farming despair.',
  climax:
    'Destroying the creature means the city sees the truth all at once — decades of ignored decay, injustice, and suffering hitting every citizen simultaneously. The psychic shock could destroy the city. The party must either destroy the parasite gradually (taking weeks, during which the city continues to rot), instantly (mass psychic trauma), or find a way to prepare the citizens for the truth first.',
  acts: [
    {
      title: 'Act 1: Paradise',
      summary: 'Arriving in the perfect city. Everything seems wonderful — to the residents. The party sees cracks everywhere. Investigating without alarming the blindly-happy citizens.',
      keyEvents: [
        'Arrival: the gate guard doesn\'t see the pothole he\'s standing in',
        'Walking through the city: beautiful architecture (crumbling), well-fed citizens (some aren\'t), happy children (some are crying, unseen)',
        'Testing the illusion: showing a citizen something obviously wrong — they literally cannot perceive it',
        'First ally: a child who sees the truth (children under 5 aren\'t fully affected)',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Source',
      summary: 'Investigation leads to the central temple, the psychic field, and the creature beneath it. The party must navigate a city where asking the wrong question makes people hostile — not because they\'re hiding something, but because they genuinely don\'t understand.',
      keyEvents: [
        'The temple: glowing with psychic energy, the source of the "blessing"',
        'The creature: a psychic parasite the size of the temple basement, pulsing',
        'The city\'s founding myth rewritten: the "blessing" was supposed to be temporary protection — it was never supposed to last 50 years',
        'Citizens who\'ve been told the truth become aggressive — their minds reject reality',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Awakening',
      summary: 'The creature must be dealt with. The city must face the truth. Both at once is catastrophic. The party must find a sequence that minimizes damage.',
      keyEvents: [
        'Preparing key citizens: secretly reducing the illusion for select leaders',
        'The creature fights back: intensifying the illusion, turning citizens against the party',
        'The destruction/graduation: either kill the creature or starve it by fixing the actual problems',
        'The truth hits: the city sees itself for the first time in 50 years — shock, grief, and eventually, hope',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Mayor Aldric Sunwatch',
      role: 'unwitting puppet',
      personality: 'The mayor who genuinely believes his city is perfect. He\'s not corrupt — he literally cannot see the problems. When the illusion cracks, he\'s the most devastated person in the city.',
      secret: 'In his deepest memories, he remembers what the city looked like before the "blessing." He chose to forget.',
    },
    {
      name: 'Pip (age 4)',
      role: 'child ally / truth-seer',
      personality: 'A toddler who can see reality because children under 5 aren\'t fully affected. Points at things and says "broken" while adults smile. The party\'s most reliable guide.',
    },
    {
      name: 'The Anesthetic',
      role: 'psychic parasite / antagonist',
      personality: 'Not intelligent in a conversational way — more like a stomach. It wants to keep feeding. When threatened, it makes the city MORE happy, MORE blind, MORE compliant.',
    },
  ],
  keyLocations: [
    { name: 'Ashen', description: 'A city that appears perfect. Every wall is clean (it isn\'t). Every person is happy (they\'re not). The sky is always sunny (there\'s a permanent haze).', significance: 'The entire campaign takes place here.' },
    { name: 'The Temple of Radiance', description: 'The city\'s central temple, source of the "blessing." Below it: a creature that feeds on suppressed suffering.', significance: 'Where the truth and the parasite are found.' },
    { name: 'The Undercity', description: 'Below Ashen — where the illusion is weakest. Here, things are real. It\'s ugly, honest, and the only place in the city where people occasionally cry.', significance: 'The party\'s base of operations.' },
  ],
  dataSystems: ['mindControl', 'detectiveCase', 'npcSchedule', 'hauntedLocation', 'socialEncounter', 'magicalAnomaly', 'cataclysmCountdown', 'secretSociety', 'politicalEvent'],
};
