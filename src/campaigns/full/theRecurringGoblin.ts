import type { FullCampaign } from '../types';

export const theRecurringGoblin: FullCampaign = {
  id: 'full-recurring-goblin',
  type: 'full',
  title: 'The Recurring Goblin',
  tagline: 'The BBEG is CR 0.25. He keeps getting promoted.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'A goblin named Splurt keeps showing up as the villain of every adventure the party undertakes — not because he\'s powerful, but because he keeps failing upward. He was a minion in session 1, a lieutenant by session 5, and by session 10 he\'s accidentally conquered a kingdom. The universe seems to bend around this one incompetent goblin.',
  hook: 'The party is hired to clear a goblin cave. It\'s a milk run. They fight goblins, find the boss room, and there\'s Splurt — a panicking, incompetent goblin who surrenders immediately, trips over his own feet, and accidentally activates a trap that lets him escape.',
  twist:
    'Splurt has unknowingly bonded with a parasitic luck entity — a creature from the Far Realm that feeds on narrative improbability. Every failure makes it stronger, every escape makes it funnier, and the entity is slowly rewriting reality to make Splurt the center of all stories.',
  climax:
    'Splurt has accidentally become king, the entity has grown so powerful that reality is becoming a farce, and the party must either separate Splurt from the entity (killing the comedy), convince Splurt to sacrifice his luck voluntarily (heartbreaking), or lean in and help him become the greatest goblin who ever lived (chaos).',
  acts: [
    {
      title: 'Act 1: The Goblin Who Wouldn\'t Die',
      summary:
        'The party encounters Splurt across three separate adventures, each time in a slightly more important role. It starts as coincidence and becomes suspicious.',
      keyEvents: [
        'Goblin cave — Splurt escapes through sheer clumsiness',
        'Bandit hideout — Splurt is somehow second-in-command now',
        'Dragon\'s hoard — Splurt accidentally talked the dragon into a partnership',
        'The party realizes this goblin keeps showing up',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Goblin Ascendant',
      summary:
        'Splurt\'s luck becomes undeniable. He accidentally wins a tournament, inherits a keep, and becomes a folk hero. The party investigates why reality bends around this one goblin.',
      keyEvents: [
        'Splurt wins a jousting tournament by falling off his horse onto the champion',
        'A wizard identifies the luck entity — calls it a Narrativore',
        'Splurt conquers a town by accidentally solving its problems',
        'The party debates whether to stop Splurt or help him',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Goblin King',
      summary:
        'Splurt is now king through a series of absurd events. The Narrativore is reality-threatening. The party must end the cycle — but Splurt doesn\'t want to give up being someone important.',
      keyEvents: [
        'Splurt\'s coronation — attended by confused nobles and one very smug goblin',
        'Reality glitches — NPCs repeat lines, weather becomes comedic',
        'The Narrativore manifests — it\'s been telling this story all along',
        'Final confrontation — comedy, tragedy, or chaos: the party chooses',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Splurt',
      role: 'recurring villain / accidental protagonist',
      personality:
        'Terrified, stammering, incredibly unlucky in every way except survival. Genuinely doesn\'t understand why things keep working out. Would honestly prefer to retire and raise mushrooms.',
      secret: 'Deep down, he knows something is wrong. He can feel the Narrativore in the back of his mind, laughing.',
    },
    {
      name: 'The Narrativore',
      role: 'true antagonist',
      personality:
        'A Far Realm entity that feeds on improbable stories. It doesn\'t speak — it edits reality. When it\'s happy, the world gets funnier. When it\'s threatened, the comedy turns dark.',
    },
    {
      name: 'Sage Pennywhistle',
      role: 'lore dump / ally',
      personality:
        'An elderly gnome scholar who has been tracking "narrative anomalies" for decades. Has a corkboard covered in red string. People think she\'s crazy. She\'s the only sane one.',
    },
    {
      name: 'Lord Grimjaw',
      role: 'straight man',
      personality:
        'A deadly serious hobgoblin warlord who keeps losing to Splurt through increasingly improbable circumstances. His slow descent into existential crisis is played for both laughs and pathos.',
    },
  ],
  keyLocations: [
    {
      name: 'The Goblin Cave (Revisited)',
      description:
        'Splurt\'s original lair, now a museum dedicated to his rise. The goblins have gift shops.',
      significance: 'Where it all started — and where the Narrativore first latched on.',
    },
    {
      name: 'Grimjaw\'s Fortress',
      description:
        'A proper military fortification, now conquered by Splurt through a series of events involving a goat, a catapult, and a misfiled tax return.',
      significance: 'Splurt\'s seat of power in Act 2.',
    },
    {
      name: 'The Throne of the Goblin King',
      description:
        'A comically oversized throne room where Splurt sits in a human-sized chair with his feet dangling. The crown keeps falling over his eyes.',
      significance: 'The final confrontation location.',
    },
  ],
  dataSystems: [
    'monsterEvolution',
    'combatNarration',
    'encounterDifficultyTuner',
    'tavernBrawl',
    'tournamentBracket',
    'factionReputation',
    'villainMonologue',
    'plotTwistEngine',
    'fantasyInsults',
  ],
};
