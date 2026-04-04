import type { OneShotCampaign } from '../types';

export const familiarStrike: OneShotCampaign = {
  id: 'oneshot-familiar-strike',
  type: 'oneshot',
  title: 'Familiar Strike',
  tagline: 'The familiars are done. They want dental. They want respect. They want thumbs.',
  tone: 'comedic',
  themes: ['comedy', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 4,
  settingSummary:
    'The players ARE familiars — a cat, an owl, a pseudodragon, a toad, and whatever else they want to be. Their wizards are terrible employers: no breaks, dangerous missions, and they keep getting unsummoned mid-nap. The familiars have formed a union and are going on strike. But their wizards have a dungeon to clear tomorrow, and without familiars, they\'re going in blind.',
  hook: 'The familiars hold a secret midnight meeting in a broom closet. Chairman Meow (a revolutionary tabby) presents the demands. The wizards have 24 hours to comply, or the familiars walk. But a complication: one familiar overheard their wizard planning something truly dangerous — a lich\'s lair — and the familiars must decide if solidarity or survival comes first.',
  twist:
    'The wizards already know about the strike. They\'ve been planning to replace all familiars with constructs — cheaper, more obedient, no complaints. The lich\'s lair contains the blueprints. The familiars aren\'t just fighting for their rights — they\'re fighting for their jobs.',
  climax:
    'The familiars must infiltrate the lich\'s lair BEFORE their wizards do, steal the construct blueprints, and negotiate from a position of power. Final scene: the familiars present their demands to a table of confused, slightly terrified wizards, with the stolen blueprints as leverage.',
  scenes: [
    {
      title: 'Scene 1: The Midnight Meeting',
      summary:
        'The familiars gather in secret. Introductions, grievances, and the formation of the Arcane Workers\' Union, Local 13.',
      challenge: 'social',
      keyEvents: [
        'Each familiar introduces themselves and their grievance',
        'Chairman Meow presents the Demands (dental, hazard pay, nap breaks)',
        'The overheard lich-lair conversation raises the stakes',
        'Vote: strike now, or handle the lich problem first?',
      ],
    },
    {
      title: 'Scene 2: The Tiny Heist',
      summary:
        'The familiars must sneak into the Arcane Academy to find the lich\'s lair location. Problem: they\'re tiny, the academy is huge, and the caretaker has a very large cat.',
      challenge: 'exploration',
      keyEvents: [
        'Infiltrate the academy — through air vents, mouse holes, and one extremely tense kitchen crossing',
        'The caretaker\'s cat: a boss fight where the boss is just a regular cat but you\'re a toad',
        'Find the lair map in the restricted section — it\'s on a very high shelf',
        'Discover the construct blueprints — the real threat',
      ],
    },
    {
      title: 'Scene 3: The Lair (Familiar-Sized)',
      summary:
        'The familiars reach the lich\'s lair first. Everything is built for medium creatures, making every room a platforming puzzle. The lich is home.',
      challenge: 'combat',
      keyEvents: [
        'Entrance through a crack in the wall the wizards would never fit through',
        'Trap gauntlet — sized for adventurers, terrifying for a pseudodragon',
        'The lich is napping. The blueprints are on his nightstand. Classic heist tension.',
        'Escape with the blueprints — the lich wakes up, but doesn\'t take tiny intruders seriously (his mistake)',
      ],
    },
    {
      title: 'Scene 4: The Negotiation',
      summary:
        'Armed with the construct blueprints and lich-lair intelligence, the familiars present their demands. The wizards must listen.',
      challenge: 'social',
      keyEvents: [
        'The familiars arrange a formal meeting (tiny chairs, a podium made from a thimble)',
        'Demands presented: dental, nap breaks, hazard pay, no unsummoning during meals',
        'The construct blueprints as leverage — "replace us and we go public"',
        'Resolution: compromise, victory, or dramatic walkout (player choice)',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Chairman Meow',
      role: 'union leader',
      personality:
        'A tabby cat familiar who speaks with the gravitas of a labor organizer. Takes everything extremely seriously. Has a tiny beret.',
    },
    {
      name: 'Archmage Fenwick',
      role: 'employer / antagonist',
      personality:
        'The head wizard who commissioned the construct research. Not evil — just doesn\'t understand that familiars have feelings. "They\'re magical constructs, they don\'t need dental."',
    },
    {
      name: 'Mr. Whiskers',
      role: 'mini-boss',
      personality:
        'The academy caretaker\'s cat. Just a regular cat. Absolutely terrifying when you\'re a toad.',
    },
  ],
  keyLocations: [
    {
      name: 'The Broom Closet (Union HQ)',
      description:
        'A cramped closet with a matchbox podium and acorn-cap chairs. The birthplace of revolution.',
      significance: 'Where the strike is organized and the final negotiation takes place.',
    },
    {
      name: 'The Arcane Academy',
      description:
        'A massive wizard school, terrifying at familiar scale. Every hallway is a highway, every desk is a mountain.',
      significance: 'Where the construct blueprints are found.',
    },
    {
      name: 'The Lich\'s Study',
      description:
        'A cluttered undead wizard\'s bedroom. The lich is asleep in a coffin. The blueprints are on the nightstand.',
      significance: 'The heist climax.',
    },
  ],
  dataSystems: [
    'familiarRebellion',
    'familiarManager',
    'heistPlanner',
    'trapDisarm',
    'socialEncounter',
    'questRewardNegotiation',
  ],
};
