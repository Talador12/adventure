import type { FullCampaign } from '../types';

export const thePriceOfMagic: FullCampaign = {
  id: 'full-price-of-magic',
  type: 'full',
  title: 'The Price of Magic',
  tagline: 'Every spell costs a year of someone\'s life. Nobody told the someone.',
  tone: 'serious',
  themes: ['dark_fantasy', 'intrigue', 'political'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 20,
  settingSummary:
    'Magic is everywhere. Wizards light cities, heal the sick, grow crops, and win wars. Magic is civilization\'s foundation. And magic has a cost nobody talks about: every spell cast takes a year from a random stranger\'s life. A cantrip might take a month. A fireball takes a full year. A wish takes a decade. The drain is invisible, untraceable, and distributed randomly across the population. The party discovers this truth and must decide what to do with knowledge that could end civilization as they know it.',
  hook: 'The party is hired to investigate a cluster of premature deaths in a farming village. No common cause — a thirty-year-old who aged to sixty overnight, a healthy child who withered, an elder who should have had years left. The village is near a wizard\'s college. A disgraced professor contacts the party in secret: "I know what is killing them. Nobody will believe me. Magic has a price, and everyone has been paying it."',
  twist:
    'The wizards did not know. The discovery is genuine — magic\'s cost has been hidden since its creation. The gods knew. Magic was designed this way as a population control mechanism. The divine compact that brought magic to the mortal world included a clause: magic draws its energy from mortal lifespans, distributed randomly, to prevent any single population from growing beyond what the world can sustain. The gods consider this a feature, not a bug. They are not interested in renegotiating.',
  climax:
    'The party has proof. The world does not want to hear it. Wizard councils deny it. Governments that depend on magic suppress it. The gods, when pressed, confirm it with divine indifference. The party must decide: publish the truth (destroying trust in magic and the institutions built on it), suppress it (becoming complicit in an invisible harm), or confront the gods and demand a renegotiation of the compact — a challenge that requires both divine-level argumentation and the leverage to back it up.',
  acts: [
    {
      title: 'Act 1: The Discovery',
      summary:
        'The investigation in the farming village leads to the disgraced professor\'s theory. The party must verify it, which means understanding magic at its most fundamental level and finding the pattern in the deaths.',
      keyEvents: [
        'Village investigation: premature aging, withering, death without disease',
        'Professor Aldric\'s theory: magic draws from random mortal lifespans',
        'Verification: correlation between spell density and premature death rates across multiple regions',
        'Quiet moment: Maren sits with the party and shows them a painting her daughter made. Stick figures. A sun. "She was going to be seven next month." The stakes become a face.',
        'The first pushback: the local wizard\'s college calls the theory "dangerous nonsense"',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Proof',
      summary:
        'The party gathers irrefutable evidence. This means infiltrating wizard councils, accessing divine archives, and surviving the powerful interests that want this truth buried. The evidence trail leads to the gods themselves.',
      keyEvents: [
        'Wizard council infiltration: finding records of statistical anomalies that were buried',
        'The divine compact: an ancient text describing the terms under which magic was granted to mortals',
        'The population clause: the gods explicitly designed magic to consume mortal lifespan as a balancing mechanism',
        'Suppression attempts: powerful wizards and governments try to silence the party',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Reckoning',
      summary:
        'The truth is in the party\'s hands. Publishing it could collapse civilization. Suppressing it makes them complicit. Confronting the gods is the hardest path. The campaign ends with a choice that reshapes the world.',
      keyEvents: [
        'The publication dilemma: allies argue for and against revealing the truth',
        'A demonstration: the party arranges a controlled test that proves the cost publicly',
        'Divine audience: the party confronts a representative of the gods, who confirms everything without apology',
        'The choice: publish, suppress, or renegotiate — each path changes the world in a different way',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Professor Aldric Thorn',
      role: 'disgraced scholar / ally',
      personality:
        'A former magical theorist expelled from the Arcane Academy for pursuing his research. Brilliant, obsessive, and lonely. Talks too fast and forgets to eat. His office is wallpapered with statistical charts. He has been studying this for twenty years. He is right, and it ruined his life. "I did not want to be right. Being right cost me everything." Arc: begins as desperate whistleblower, becomes the moral compass if the party gives him purpose.',
    },
    {
      name: 'Archmage Serenna Voss',
      role: 'establishment leader / obstacle',
      personality:
        'Head of the Arcane Academy. She is not evil — she genuinely does not believe the theory. When presented with proof, she faces an existential crisis: her life\'s work has been killing people.',
      secret: 'She suspected the cost was real years ago but could not face the implications. She buried her own research.',
    },
    {
      name: 'The Arbiter',
      role: 'divine representative',
      personality:
        'A celestial entity that speaks for the gods on matters of the divine compact. Calm, ancient, and fundamentally uninterested in mortal suffering at the individual level. "The system works. Populations are stable. Magic functions. What is your complaint?"',
    },
    {
      name: 'Maren',
      role: 'village survivor / moral anchor',
      personality:
        'A farmer from the village where the deaths occurred. She lost her daughter to the drain. She does not care about politics or gods. She wants to know who is responsible for her child aging fifty years in a night.',
    },
  ],
  keyLocations: [
    {
      name: 'Thornfield Village',
      description: 'A farming community near a wizard\'s college. The premature deaths started here. The residents are terrified and grieving.',
      significance: 'Where the investigation begins and the human cost is most visible.',
    },
    {
      name: 'The Arcane Academy',
      description: 'The premier institution of magical learning. Beautiful, powerful, and built on a foundation the party is about to crack.',
      significance: 'Where the evidence is hidden and the establishment pushback originates.',
    },
    {
      name: 'The Compact Shrine',
      description: 'A hidden temple where the original divine compact granting magic to mortals is inscribed. The clause about lifespan cost is written in divine script that only the worthy can read.',
      significance: 'Where the proof becomes undeniable and the gods can be addressed.',
    },
  ],
  dataSystems: [
    'politicalEvent',
    'socialEncounter',
    'secretSociety',
    'detectiveCase',
    'diplomaticNegotiation',
    'moralDilemma',
    'ancientProphecy',
    'magicalAnomaly',
  ],
};
