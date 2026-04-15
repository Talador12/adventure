import type { OneShotCampaign } from '../types';

export const theIdentityCrisis: OneShotCampaign = {
  id: 'oneshot-the-identity-crisis',
  type: 'oneshot',
  title: 'The Identity Crisis',
  tagline: 'A curse makes the party forget their classes. The fighter thinks he is a wizard. The wizard thinks she is a barbarian. Hilarity and death ensue.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'A cursed mirror in the dungeon swapped the party\'s class identities. They retain their actual stats and abilities but believe they ARE a different class. The fighter (18 Strength, 8 Intelligence) believes he is a wizard and keeps trying to cast spells by shouting made-up incantations. The wizard (8 Strength, 20 Intelligence) believes she is a barbarian and charges into combat with 6 HP of confidence. The rogue thinks he is a paladin and keeps trying to heal people by touching them aggressively. The cleric thinks she is a rogue and keeps trying to pick locks with a mace.',
  hook: 'The party looks into a cursed mirror. A flash of light. They blink. The fighter looks at his sword and is confused: "Why do I have this? I am a wizard." The wizard drops her spellbook, picks up the fighter\'s shield, and screams: "RAAAGE!" She has 42 hit points. She thinks she has 120.',
  twist: 'The curse can only be broken by each party member succeeding at their believed class, not their actual class. The fighter must successfully "cast a spell" (he screams and punches the air, but if he rolls well enough, the DM interprets it as success). The wizard must succeed at a "rage" (she yells very loudly and charges, and if she hits, it counts). The dungeon rewards commitment to the delusion.',
  climax: 'The final room requires each party member to perform their "class identity" simultaneously. The fighter must cast, the wizard must rage, the rogue must heal, and the cleric must sneak. If they commit fully to who they THINK they are with enough conviction, the curse interprets it as success and breaks. The power of believing you are something hard enough that reality gives up arguing.',
  scenes: [
    {
      title: 'Who Am I?',
      summary: 'The party discovers their identity swap and attempts to function. The fighter casts spells that are just punching. The wizard rages with 8 Strength.',
      challenge: 'exploration',
      keyEvents: [
        'The fighter tries to cast Magic Missile. He shouts "MAGIC MISSILE!" and punches the air. Nothing happens. He blames spell components.',
        'The wizard rages and charges a goblin. She hits. For 1 damage. With 8 Strength. "I AM THE STORM."',
        'The rogue tries Lay On Hands. He grabs the fighter\'s face. "BE HEALED." It does nothing. "You are not believing hard enough."',
        'The cleric attempts to pick a lock with a mace. She hits the lock. The lock breaks. The door breaks. Close enough.',
      ],
    },
    {
      title: 'Committing to the Bit',
      summary: 'The party discovers that committing harder to their false identities starts producing results. The dungeon rewards delusion.',
      challenge: 'combat',
      keyEvents: [
        'The fighter shouts "FIREBALL" and punches a goblin so hard it catches fire from friction. The dungeon counts it.',
        'The wizard\'s "rage" gives her temporary hit points from sheer adrenaline. She is a 6 HP barbarian and the universe is bending.',
        'The rogue\'s aggressive healing touch accidentally triggers Stunning Strike. "I HEALED HIM SO HARD HE FELL OVER."',
        'The cleric successfully sneaks by walking loudly and everyone ignoring her because she is THAT confident she is invisible.',
      ],
    },
    {
      title: 'The Identity Convergence',
      summary: 'The final room. Each person must fully become their false class. Total commitment breaks the curse.',
      challenge: 'puzzle',
      keyEvents: [
        'Four pedestals, each requiring a class action: cast, rage, heal, sneak',
        'The fighter stands on the casting pedestal and shouts an incantation he made up. He believes SO HARD that sparks actually fly from his fingers.',
        'The wizard rage-charges the rage pedestal and hits it with her staff. The pedestal cracks. It counts.',
        'All four activate simultaneously. The curse shatters. Memories return. The fighter looks at the sparks still fading from his fingers. "Did I actually cast a spell?" He did. Just once.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Cursed Mirror', role: 'cause of the problem', personality: 'An enchanted mirror that swaps class identities. It has a faint smirk etched into its frame. It has done this before. It finds it hilarious every time.' },
    { name: 'Dungeon Guide Selza', role: 'observer / hint giver', personality: 'A tiefling who guards the dungeon and has seen the mirror\'s curse dozens of times. She gives cryptic hints: "The dungeon does not care what you ARE. It cares what you BELIEVE." She is also selling popcorn.' },
  ],
  keyLocations: [
    { name: 'The Mirror Chamber', description: 'A circular room with a massive cursed mirror. Anyone who looks into it swaps their class identity with random assignment.', significance: 'The inciting incident. Where the curse begins.' },
    { name: 'The Identity Convergence Chamber', description: 'Four pedestals, each requiring a class action. The room glows brighter as each person commits to their false identity.', significance: 'The climax. Where commitment to the delusion becomes reality.' },
  ],
  dataSystems: ['combatNarration', 'dungeonRoom', 'socialEncounter'],
};
