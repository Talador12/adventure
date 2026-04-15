import type { OneShotCampaign } from '../types';

export const theNeighborhoodWatch: OneShotCampaign = {
  id: 'oneshot-neighborhood-watch',
  type: 'oneshot',
  title: 'The Neighborhood Watch',
  tagline: 'Strange things at night. The neighbors are terrified. The "threat" is adorable and harmless.',
  tone: 'social',
  themes: ['social', 'comedy', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2.5,
  settingSummary:
    'Maple Street, a quiet neighborhood in a small town, is experiencing strange nocturnal events. Gardens rearranged. Milk bottles moved. Strange sounds. The residents are convinced a monster is terrorizing them. The party forms a neighborhood watch to investigate.',
  hook: 'Mrs. Pennywhistle bangs on the tavern door at dawn: "It happened AGAIN! My petunias were MOVED. Sorted by COLOR. No human does that. It\'s a FIEND. We need PROTECTION." She offers the party room and board to solve the mystery.',
  twist:
    'The "threat" is a family of pixies who moved into the old oak tree on Maple Street. They are compulsively tidy and have been reorganizing everyone\'s gardens, sorting their belongings, and fixing things at night. They think they are being helpful.',
  climax:
    'The party catches the pixies mid-sort. The neighbors arrive with pitchforks. The party must prevent a mob from attacking three-inch-tall creatures who genuinely believe they have been doing everyone a favor.',
  scenes: [
    {
      title: 'Scene 1: The Investigation',
      summary: 'Door-to-door interviews. Every neighbor has a theory. The evidence is baffling because nothing is actually damaged.',
      challenge: 'exploration',
      keyEvents: [
        'Mrs. Pennywhistle: petunias sorted by color. She planted them randomly on purpose.',
        'Old Tom: his woodpile was restacked. Perfectly. He is furious.',
        'The baker: her pies were moved to the windowsill to cool properly.',
        'The evidence: nothing broken, nothing stolen. Everything is... better.',
      ],
    },
    {
      title: 'Scene 2: The Stakeout',
      summary: 'The party sets up a nighttime watch. The neighbors are terrible at being quiet. The pixies are very good at not being seen.',
      challenge: 'exploration',
      keyEvents: [
        'Night watch: the party stations themselves around Maple Street.',
        'Neighbors keep "helping" by bringing snacks, talking loudly, and falling asleep.',
        'Tiny sounds. Tiny footprints. Tiny giggles from the oak tree.',
        'A glimpse: something very small and very fast rearranging a flower bed.',
      ],
    },
    {
      title: 'Scene 3: The Confrontation',
      summary: 'Pixies caught. Neighbors arrive. The party must prevent violence and broker peace between terrified humans and confused pixies.',
      challenge: 'social',
      keyEvents: [
        'The pixies are caught mid-sort. Three of them, holding a tulip bulb, frozen.',
        'Mrs. Pennywhistle screams. The neighbors arrive with torches.',
        'The pixies are bewildered. They were helping. Why is everyone angry?',
        'Mediation: the party negotiates a treaty. The pixies can stay if they ASK first.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Mrs. Edith Pennywhistle',
      role: 'concerned neighbor / drama',
      personality: 'Elderly, loud, convinced the neighborhood is under siege. Means well. Escalates everything.',
    },
    {
      name: 'Fern, Twig, and Dew',
      role: 'pixie family / "threat"',
      personality: 'Three pixies with obsessive-compulsive tidying habits. Genuinely confused by the hostility. Fern is the spokesperson and deeply offended.',
    },
  ],
  keyLocations: [
    {
      name: 'Maple Street',
      description: 'A quiet residential street with well-kept houses, gardens, and one very large oak tree with tiny occupants.',
      significance: 'The entire adventure. Every house is a witness, every garden is a crime scene.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker'],
};
