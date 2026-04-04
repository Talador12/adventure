import type { FullCampaign } from '../types';

export const vaultOfTheDeadGod: FullCampaign = {
  id: 'full-vault-dead-god',
  type: 'full',
  title: 'The Vault of the Dead God',
  tagline: 'The greatest heist in history targets a deity\'s treasury across three planes of existence.',
  tone: 'heist',
  themes: ['heist', 'planar', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 18,
  settingSummary:
    'A dead god\'s treasury exists simultaneously in three planes — the Material, the Shadowfell, and the Astral Sea. Its treasures are legendary, its defenses are eternal, and nobody has ever breached it. A mysterious patron is assembling a crew for the impossible job.',
  hook: 'A one-eyed tiefling named Jinx tracks each party member down individually, paying off their debts or solving their problems — then presents the bill: help her rob a god, or she calls in every favor at once.',
  twist:
    'The "dead god" is not dead — it\'s dreaming. The vault IS the god\'s dream, and breaching it means entering a sleeping deity\'s mind. The treasures are actually the god\'s memories, and stealing them will either wake it or kill it permanently.',
  climax:
    'The crew reaches the central vault, which exists in all three planes at once. They must coordinate a simultaneous heist across planes (split party!) while the god stirs in its sleep. Taking the treasure risks waking an angry god; leaving empty-handed means facing Jinx\'s wrath.',
  acts: [
    {
      title: 'Act 1: Assembling the Crew',
      summary:
        'The party is recruited, the job is pitched, and prep begins. Each team member must complete a personal heist to acquire a key component needed for the main job.',
      keyEvents: [
        'Jinx pitches the impossible job — each player gets a personal hook',
        'Five mini-heists: steal a planar compass, a shadow key, an astral chart, a divine mask, and a dreamer\'s focus',
        'The crew discovers each other\'s skills and builds the plan',
        'A rival crew is also assembling — they want the vault too',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Casing the Planes',
      summary:
        'The crew travels to each plane to map the vault\'s defenses. Each plane has different security: the Material has physical traps, the Shadowfell has undead sentinels, the Astral has psychic wards.',
      keyEvents: [
        'Material vault — classic dungeon crawl with traps and golems',
        'Shadowfell vault — undead guardians who remember being alive',
        'Astral vault — psychic defenses that attack your sense of self',
        'Discovery that the three vaults are connected — a synchronized heist is the only way',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Big Job',
      summary:
        'Heist night. The party splits across three planes, coordinating via unreliable magical communication. Everything goes wrong in entertaining ways.',
      keyEvents: [
        'Split-party heist — each subgroup in a different plane',
        'Communication crystal fails at the worst moment',
        'The rival crew shows up at the Astral vault',
        'The god stirs — reality begins to collapse inward',
        'The final choice: take the treasure or save the sleeping god',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Jinx',
      role: 'quest giver / unreliable patron',
      personality:
        'Fast-talking, one-eyed tiefling who always has a contingency plan but never shares it. Genuinely likable despite being transparently manipulative.',
      secret: 'She was a cleric of the dead god before it fell. She\'s not after treasure — she wants to wake it up.',
    },
    {
      name: 'Whisper',
      role: 'rival crew leader',
      personality:
        'A shadar-kai rogue who speaks exclusively in a murmur and has an unsettling habit of knowing things she shouldn\'t.',
      secret: 'She\'s an echo of one of the god\'s memories — she doesn\'t actually exist outside the vault\'s influence.',
    },
    {
      name: 'Clank',
      role: 'support crew / comic relief',
      personality:
        'A warforged locksmith who takes everything literally and has strong opinions about the aesthetics of locks. Gets emotional about particularly beautiful mechanisms.',
    },
    {
      name: 'The Dreaming God',
      role: 'unknowing antagonist',
      personality:
        'Manifests as environmental changes and dream logic. When it stirs, gravity shifts, time stutters, and walls breathe.',
    },
  ],
  keyLocations: [
    {
      name: 'The Material Vault',
      description:
        'A massive underground complex beneath a mountain, filled with mechanical traps, golem sentinels, and rooms that reconfigure.',
      significance: 'Contains the physical treasures — weapons, armor, gold.',
    },
    {
      name: 'The Shadow Vault',
      description:
        'A mirror of the Material vault made of darkness and memory. The undead guards are former worshippers still performing their duties.',
      significance: 'Contains the divine artifacts — items of terrible power.',
    },
    {
      name: 'The Astral Vault',
      description:
        'A vast crystalline structure floating in silver void. Psychic wards detect intention, not just presence.',
      significance: 'Contains the god\'s memories — the real treasure, and the real danger.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'trapDisarm',
    'clockworkDungeon',
    'pocketDimension',
    'astralEncounter',
    'crossPlaneMessenger',
    'artifactCorruption',
    'puzzleLock',
    'encounterWaves',
  ],
};
