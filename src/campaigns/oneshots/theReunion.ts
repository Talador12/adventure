import type { OneShotCampaign } from '../types';

export const theReunion: OneShotCampaign = {
  id: 'oneshot-reunion',
  type: 'oneshot',
  title: 'The Reunion',
  tagline: 'Five retired adventurers. Twenty years of silence. One dinner table. Old grudges, old secrets, old love.',
  tone: 'social',
  themes: ['social', 'intrigue'],
  playerCount: { min: 4, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The party plays retired adventurers reuniting twenty years after their last quest. They saved the world once. Then they stopped speaking to each other. Tonight, at the Silver Stag Inn, they sit down together for the first time in two decades. The wine flows. The truth comes out.',
  hook: 'A letter arrives for each character: "It has been twenty years. I am dying. Before I go, I want to see all of you one more time. The Silver Stag. Midsummer\'s Eve. Please come. — Vareth." Vareth was the leader. Nobody says no to a dying man.',
  twist:
    'Vareth is not dying. He lied to get them all in the same room because he discovered that one of them betrayed the party during their final quest. Someone sold information that nearly killed them all. Twenty years later, he wants the truth.',
  climax:
    'Vareth reveals the betrayal evidence over dessert. Accusations fly. Old alliances fracture and reform. The traitor is exposed - but their reason was sympathetic. The party must decide: forgiveness or final severance.',
  scenes: [
    {
      title: 'Scene 1: Arrivals',
      summary: 'Each character arrives separately. Awkward greetings. Small talk hiding enormous unresolved feelings.',
      challenge: 'social',
      keyEvents: [
        'Each player introduces their retired adventurer. Who they were, who they became.',
        'Old dynamics resurface immediately. The rivalries, the romances, the inside jokes.',
        'Vareth seems healthy for a dying man. Nobody mentions it yet.',
        'The first toast. The first uncomfortable silence. The first real question.',
      ],
    },
    {
      title: 'Scene 2: The Dinner',
      summary: 'Wine loosens tongues. Old stories are retold. Different perspectives emerge. Not everyone remembers the glory days the same way.',
      challenge: 'social',
      keyEvents: [
        'Story-swapping reveals conflicting memories. Who really killed the dragon?',
        'An old romance between two characters surfaces. One never moved on.',
        'Vareth steers the conversation toward their final quest. Casually. Deliberately.',
        'A confession: one character has a secret they have carried for twenty years.',
      ],
    },
    {
      title: 'Scene 3: The Accusation',
      summary: 'Vareth reveals the truth about the betrayal. The table erupts. Twenty years of friendship hangs in the balance.',
      challenge: 'social',
      keyEvents: [
        'Vareth drops the act. He is not dying. He is investigating.',
        'Evidence presented: someone sold their route to the enemy during the final quest.',
        'The traitor is revealed. Their reason: they were protecting someone the quest would have killed.',
        'The table splits. Forgiveness or finality. The players decide the ending.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Vareth the Grey',
      role: 'reunion host / investigator',
      personality: 'The old leader. Still sharp, still commanding. Lied about dying because he knew it was the only thing that would bring them all back. Hurt and determined.',
    },
    {
      name: 'Innkeeper Maren',
      role: 'neutral observer',
      personality: 'Runs the Silver Stag. Has hosted this kind of reunion before. Keeps the wine flowing and the knives out of reach.',
    },
  ],
  keyLocations: [
    {
      name: 'The Silver Stag Inn',
      description: 'A cozy, upscale inn with a private dining room. Warm lighting, excellent wine, and walls that have heard many secrets.',
      significance: 'The entire one-shot takes place at one dinner table.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker', 'factionReputation'],
};
