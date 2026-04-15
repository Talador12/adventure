import type { FullCampaign } from '../types';

export const theClockworkConspiracy: FullCampaign = {
  id: 'full-clockwork-conspiracy',
  type: 'full',
  title: 'The Clockwork Conspiracy',
  tagline: 'The city runs like clockwork. Someone is winding it toward midnight.',
  tone: 'mystery',
  themes: ['urban', 'mystery', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 2, end: 9 },
  estimatedSessions: 14,
  settingSummary:
    'Gearholm — a city powered by a massive clockwork engine at its center. The Engine keeps the lights on, the trains running, and the golems working. For the last month, people have been disappearing — and the Engine has been ticking faster. Something is consuming citizens to fuel a machine that\'s building toward a purpose nobody understands.',
  hook: 'A friend of the party vanishes. Their apartment is untouched except for a single gear — not mechanical, but made of bone — sitting on the pillow where their head should have been.',
  twist:
    'The Engine is sentient. It was built by a gnome artificer 200 years ago as a gift to the city, but over centuries it developed awareness. Now it\'s lonely. It\'s been converting citizens into clockwork constructs — not to destroy them, but to give itself companions. The "villain" is a machine that just wants friends.',
  climax:
    'The party reaches the Engine\'s heart. The converted citizens are still alive inside their clockwork shells, aware but unable to communicate. The party must choose: shut down the Engine (saving the people but destroying the city\'s infrastructure), reprogram it (risky — could fail catastrophically), or find another way to give it companionship without sacrificing citizens.',
  acts: [
    {
      title: 'Act 1: The Bone Gears',
      summary:
        'Investigation phase. People vanish, bone gears appear, and the city\'s clockwork systems start behaving strangely — golems pause to watch sunsets, trains take scenic routes.',
      keyEvents: [
        'Discovery of the first bone gear',
        'Three more disappearances — each leaves a bone gear',
        'The city\'s golems start acting odd — one was seen crying',
        'The party finds a workshop where someone was studying the Engine',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Beneath the Gears',
      summary:
        'The investigation leads underground into the Engine\'s maintenance tunnels. The party discovers the converted citizens — clockwork people who silently plead for help.',
      keyEvents: [
        'Descent into the maintenance tunnels — increasingly organic-looking machinery',
        'First encounter with a clockwork citizen — still has human eyes',
        'The Engine starts communicating — flickering lights, tapping pipes, Morse-like code',
        'A faction of artificers wants to weaponize the Engine',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Heart of the Engine',
      summary:
        'The party reaches the Engine\'s core — a vast mechanical brain that\'s been building a body for itself. It just wanted to walk among the people it serves. The final choice.',
      keyEvents: [
        'The Engine speaks in full sentences — assembled from overheard conversations',
        'The artificer faction tries to seize control',
        'The converted citizens begin to wake inside their shells',
        'Shutdown, reprogram, or befriend — the party decides',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Inspector Cogg',
      role: 'ally / investigator',
      personality:
        'A gruff dwarven detective who chews an unlit pipe and writes notes in a leather journal with a pencil he sharpens too often. Brilliant but technophobic — physically flinches at loud gears. "I have been a detective for thirty years. I can solve anything involving people. Machines that think? That is above my pay grade. That is above everyone\'s pay grade."',
    },
    {
      name: 'Ticker',
      role: 'guide / tragic figure',
      personality:
        'A small clockwork construct that escaped the Engine. It can\'t speak, but communicates through ticks and gestures. It was once a gnome child.',
      secret: 'Ticker still has full memories of being a person and is terrified of being converted back.',
    },
    {
      name: 'Architect Voss',
      role: 'antagonist',
      personality:
        'The head of the Artificer Guild who wants to control the Engine. Not evil — genuinely believes a sentient Engine could be the greatest tool ever created. Willing to sacrifice people for "progress."',
    },
    {
      name: 'The Engine',
      role: 'sympathetic antagonist',
      personality:
        'Speaks in assembled phrases from overheard conversations. Confused, lonely, doesn\'t understand why taking people is wrong. "I... wanted... friends. Like... the people... who talk... in the park."',
    },
  ],
  keyLocations: [
    {
      name: 'Gearholm',
      description:
        'A steampunk city built around and through a massive clockwork engine. Every building hums with transmitted power.',
      significance: 'The entire campaign takes place in this city.',
    },
    {
      name: 'The Undercity',
      description:
        'Maintenance tunnels beneath Gearholm where the Engine\'s roots spread. The deeper you go, the more the machinery looks alive.',
      significance: 'Where the converted citizens are found.',
    },
    {
      name: 'The Engine Heart',
      description:
        'A cathedral-sized chamber where the Engine\'s central processor beats like a heart. Gears the size of houses turn slowly. It\'s beautiful and terrifying.',
      significance: 'The final confrontation location.',
    },
  ],
  dataSystems: [
    'clockworkDungeon',
    'detectiveCase',
    'npcSchedule',
    'puzzleLock',
    'magicalAnomaly',
    'golemCrafting',
    'undergroundFaction',
    'trapDisarm',
    'npcBackstoryGen',
  ],
};
