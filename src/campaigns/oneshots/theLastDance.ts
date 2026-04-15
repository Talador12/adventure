import type { OneShotCampaign } from '../types';

export const theLastDance: OneShotCampaign = {
  id: 'oneshot-last-dance',
  type: 'oneshot',
  title: 'The Last Dance',
  tagline: 'The host is dying. This is her last party. She wants it perfect. Make it perfect.',
  tone: 'social',
  themes: ['social', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'Duchess Amelie Fontaine is dying. Her final wish: one last grand ball at her estate. She has invited everyone who matters, including people who hate each other. The party is hired to ensure the evening is flawless. Old rivalries, secret romances, and a dying woman\'s last night on earth.',
  hook: 'The Duchess meets the party in her garden, frail but sharp. "I have three months to live. I want one perfect night. The guest list includes two families who would murder each other, a jilted lover, and my estranged daughter. Make it work. I do not care how."',
  twist:
    'The Duchess is not just throwing a party. She is orchestrating reconciliations. Every seating arrangement, every dance pairing, every song was chosen to force people to confront unresolved relationships. The party is her instrument. She has been planning this for a year.',
  climax:
    'The final dance. The Duchess asks her estranged daughter to dance. The daughter refuses. The room holds its breath. The party must bridge the gap between a dying mother and an angry daughter in front of three hundred people.',
  scenes: [
    {
      title: 'Scene 1: Preparations',
      summary: 'Setting up the ball. The party learns the guest list, the conflicts, and the Duchess\'s hidden agenda.',
      challenge: 'social',
      keyEvents: [
        'The guest list: rival families Voss and Thorne. A jilted archmage. The Duchess\'s daughter.',
        'Seating charts as social engineering. The Duchess has specific pairings.',
        'The party preps: music, food, security, conversation starters.',
        'The daughter arrives early. She is furious she was invited.',
      ],
    },
    {
      title: 'Scene 2: The Ball',
      summary: 'The evening unfolds. The party manages crises: a duel almost starts, a romance reignites, and wine flows dangerously.',
      challenge: 'social',
      keyEvents: [
        'Lord Voss and Lady Thorne are seated next to each other. Icy politeness.',
        'The jilted archmage spots their ex. Subtle magical outbursts.',
        'A dance forces rivals together. The party must keep it from becoming a brawl.',
        'The Duchess weakens. She hides it. The party notices.',
      ],
    },
    {
      title: 'Scene 3: The Final Dance',
      summary: 'The Duchess asks her daughter to dance. The daughter refuses. The party must heal a decades-old wound in front of everyone.',
      challenge: 'social',
      keyEvents: [
        'The Duchess stands, visibly weak, and extends her hand to her daughter.',
        'The daughter\'s refusal. The room goes silent.',
        'The party must find the words, the moment, the reason to bring them together.',
        'If they succeed: the dance. Tears. The room erupts in applause. A perfect night.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Duchess Amelie Fontaine',
      role: 'host / dying mastermind',
      personality: 'Elegant, sharp, and running on borrowed time. Every word is chosen. Every arrangement is deliberate. She loves fiercely and has regrets she is trying to fix before the end.',
    },
    {
      name: 'Margaux Fontaine',
      role: 'estranged daughter',
      personality: 'Angry, hurt, and hiding it behind composure. She left ten years ago after a fight she cannot fully remember. She came because she is afraid of what she will feel if she does not.',
    },
  ],
  keyLocations: [
    {
      name: 'Fontaine Estate Ballroom',
      description: 'A grand ballroom with crystal chandeliers, a live orchestra, and three hundred guests pretending to get along.',
      significance: 'The stage for every social encounter. Beautiful and tense.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker', 'factionReputation'],
};
