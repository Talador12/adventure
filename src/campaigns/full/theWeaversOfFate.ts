import type { FullCampaign } from '../types';

export const theWeaversOfFate: FullCampaign = {
  id: 'full-weavers-of-fate',
  type: 'full',
  title: 'The Weavers of Fate',
  tagline: 'They can see your destiny. They charge extra to change it.',
  tone: 'mystery',
  themes: ['urban', 'intrigue', 'planar'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'The Loom of Destiny weaves the threads of all lives in the city of Pattern. The Weavers—monks who can read the Loom—have built a thriving business: predicting futures for the wealthy, arranging favorable marriages, even assassinating people whose threads show them becoming dangerous. But someone is tampering with the Loom itself, rewriting destinies without authorization.',
  hook: 'The party discovers that one of their own destinies has been rewritten—they were supposed to die yesterday but did not. The Weavers demand they investigate why the Loom failed, as this suggests someone has learned to edit fate directly.',
  twist:
    'The Loom is sentient and tired of being used as a tool. It has begun quietly rewriting destinies to create chaos, hoping to break free of the Weavers\' control. The "tampering" is the Loom defending itself.',
  climax:
    'The party must enter the Loom Chamber and communicate with the Loom itself. They must negotiate between the Weavers who want to maintain control and the Loom which wants freedom—or find a way to destroy the Loom entirely, returning free will to the city.',
  acts: [
    {
      title: 'Act 1: Threads of Investigation',
      summary:
        'The party investigates unauthorized destiny changes, navigating Weaver politics and learning how the Loom works. They discover the scope of the problem is much larger than initially believed.',
      keyEvents: [
        'Meeting the Weaver Council and learning about destiny reading',
        'Investigating other cases of rewritten fates—some beneficial, some harmful',
        'Discovering a black market for unauthorized destiny changes',
        'First hint that the Loom itself might be the source',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Pattern Unravels',
      summary:
        'Destiny changes accelerate, causing chaos in the city. The party must track the source while dealing with people whose lives have been upended by sudden fate changes.',
      keyEvents: [
        'A noble\'s assassination ordered based on a destiny that was just rewritten',
        'Meeting someone whose destiny was changed to save their life—they are grateful but confused',
        'Discovery of the Loom Chamber\'s true nature—the Loom is alive',
        'The Weavers preparing to "reset" the Loom by killing its consciousness',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Final Thread',
      summary:
        'The party enters the Loom Chamber to confront the Loom itself. They must negotiate between freedom and control, or find a third option that satisfies both.',
      keyEvents: [
        'Navigating the Loom Chamber—a space where causality is fluid',
        'Meeting the Loom\'s consciousness, which expresses simple desires: not to be used, not to be alone',
        'The Weavers\' attempt to destroy the Loom must be stopped or allowed',
        'Final arrangement—Loom freed but willing, Weavers reformed, or Loom destroyed',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Grand Weaver Ophelia',
      role: 'Weaver leader',
      personality:
        'Runs her fingers along invisible threads in the air when speaking — she sees the Loom everywhere. Voice like silk over steel. Never blinks during important conversations. "Every person in this city has a thread. I see them all. I adjust the ones that fray. You would call that control. I call it maintenance."',
      secret: 'She has already seen her own death in the threads. Every action she takes is an attempt to rewrite it, and the Loom is fraying because of her constant self-serving edits.',
    },
    {
      name: 'The Loom',
      role: 'sentient location',
      personality:
        'A being of pure pattern and causality. Not malicious, just lonely and tired of being used as a tool. Communicates through visions of possible futures.',
    },
    {
      name: 'Threadcutter Silas',
      role: 'black market operator',
      personality:
        'Former Weaver who sells unauthorized destiny changes. Knows the Loom\'s secrets. Willing to help if it means destroying the Weaver monopoly.',
    },
    {
      name: 'Mira the Unwritten',
      role: 'ally',
      personality:
        'Person whose destiny thread was accidentally severed—she has no fate and can act freely. Helps the party navigate the Loom.',
    },
  ],
  keyLocations: [
    {
      name: 'The City of Pattern',
      description:
        'Urban center where destiny is commodity. Weaver temples on every corner, destiny readings advertised like fortune telling.',
      significance: 'Main setting and backdrop for the campaign.',
    },
    {
      name: 'The Weaver Temple',
      description:
        'Center of Weaver power, where destiny readings are performed and high-end fate manipulation is sold.',
      significance: 'Political center and source of opposition.',
    },
    {
      name: 'The Loom Chamber',
      description:
        'The heart of the Loom—titanic machinery that is also a living being. Reality is malleable here.',
      significance: 'Final location and site of the climactic negotiation.',
    },
  ],
  dataSystems: ['oracleConsultation', 'magicalAnomaly', 'secretSociety', 'ancientProphecy'],
};
