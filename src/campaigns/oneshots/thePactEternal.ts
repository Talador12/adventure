import type { OneShotCampaign } from '../types';

export const thePactEternal: OneShotCampaign = {
  id: 'oneshot-pact-eternal',
  type: 'oneshot',
  title: 'The Pact Eternal',
  tagline: 'The sky splits in half. Gold on one side, silver on the other. A voice in every mind: "Choose." Your vote counts as ten thousand.',
  tone: 'epic',
  themes: ['epic', 'planar', 'social'],
  playerCount: { min: 3, max: 6 },
  level: 7,
  estimatedHours: 3,
  settingSummary:
    'Once every thousand years, the cosmic balance is recalibrated. Every mortal must declare allegiance to Order or Chaos. The side with more supporters gains dominance for the next millennium. Currently, Order rules - and it has become stifling. Laws govern everything, creativity is suspect, and deviation is punished. But Chaos ruled before that, and the world was a nightmare of unpredictability. The party must choose, and their choice - as heroes - carries disproportionate weight.',
  hook: 'The sky splits into two halves - gold on one side, silver on the other. A voice resonates through every mind: "Choosing Day has come. Declare for Order or Chaos. Heroes, your declarations count as ten thousand voices. Choose wisely."',
  twist: 'There is a third option nobody mentions because nobody has tried it in ten thousand years: Balance. If an equal number declare for each side, the system resets to equilibrium. No dominance. No millennium of one-sided rule. But achieving perfect balance means the party must split their own votes - some for Order, some for Chaos - and the arguments for both are compelling.',
  climax: 'The Declaration. The party stands at the Choosing Stone. Each member must declare individually, in front of the world. Their choices ripple outward. The party may agree on a strategy or they may genuinely disagree. Either way, the world changes based on what they say.',
  scenes: [
    {
      title: 'Scene 1: The Advocates',
      summary: 'Representatives of Order and Chaos make their cases. Both are compelling. Both are terrifying.',
      challenge: 'social',
      keyEvents: [
        'Order\'s advocate: a celestial who promises stability, safety, law - "Under Order, no child goes hungry"',
        'Chaos\'s advocate: an archfey who promises freedom, creativity, change - "Under Chaos, no dream goes unborn"',
        'The cost of Order: a city where art is banned because it causes "emotional instability"',
        'The cost of Chaos: a village that changes its own geography every day, impossible to farm or build',
      ],
    },
    {
      title: 'Scene 2: The People',
      summary: 'Hearing from ordinary mortals about what they want. The party\'s choice affects everyone.',
      challenge: 'social',
      keyEvents: [
        'A farmer: wants Order because he needs predictable seasons to feed his family',
        'An artist: wants Chaos because Order banned her paintings for "subversive imagery"',
        'A healer: wants Order because standardized medicine saves lives',
        'A child: tugs the party\'s sleeve. "They took my dice. The guards said rolling dice is too random. I just wanted to play."',
      ],
    },
    {
      title: 'Scene 3: The Declaration',
      summary: 'The Choosing Stone. Each party member declares. The world listens.',
      challenge: 'social',
      keyEvents: [
        'The stone: a monolith at the center of the world where declarations are heard by the cosmos',
        'Each party member steps forward and declares: Order, Chaos, or the forbidden word - Balance',
        'If Balance is chosen: the system resists, the advocates protest, the cosmos shudders',
        'The result: whatever the party declared ripples outward, reshaping the next thousand years',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Seraphel', role: 'Order\'s advocate', personality: 'A celestial being of perfect symmetry. Her arguments are logical, her promises are real, and her vision of the future is safe and sterile. She genuinely believes freedom is overrated.' },
    { name: 'The Shimmer', role: 'Chaos\'s advocate', personality: 'An archfey who changes shape every sentence. Brilliant, unpredictable, and honest about the cost of freedom. "Chaos hurts. But it is alive."' },
    { name: 'The Warden', role: 'Balance keeper', personality: 'Materializes from dust the instant someone says "Balance" - a being of half gold, half silver, grinning like someone who has been waiting ten thousand years for this exact conversation. "Finally! Do you have any idea how boring it is waiting for someone to remember the third option? I have been standing in a hallway since before your species invented fire."' },
  ],
  keyLocations: [
    { name: 'The Choosing Stone', description: 'A monolith at the geographic center of the world. On Choosing Day, it amplifies every declaration to cosmic significance.', significance: 'Where the party declares and the world changes.' },
    { name: 'The Order Pavilion', description: 'A perfect geometric structure where Order\'s advocate holds court. Everything is symmetrical, clean, and slightly oppressive.', significance: 'Where Order makes its case.' },
    { name: 'The Chaos Garden', description: 'A wild, shifting space where flowers bloom and wilt in seconds and the ground changes color. Beautiful and disorienting.', significance: 'Where Chaos makes its case.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
