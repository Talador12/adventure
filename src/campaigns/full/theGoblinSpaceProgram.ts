import type { FullCampaign } from '../types';

export const theGoblinSpaceProgram: FullCampaign = {
  id: 'full-the-goblin-space-program',
  type: 'full',
  title: 'The Goblin Space Program',
  tagline: 'One small step for goblin. One giant explosion for goblin-kind.',
  tone: 'shenanigans',
  themes: ['comedy', 'exploration', 'survival'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 7 },
  estimatedSessions: 12,
  settingSummary:
    'The Gritznak Goblin Tribe has invented rocketry. Sort of. They discovered that if you strap enough fireworks to a barrel and light them all at once, the barrel goes up. Sometimes it comes back down. Sometimes it does not. This is considered a success either way. The tribe has declared a space program, built a launch facility out of scrap wood and stolen anvils, and recruited the party as "astro-nots" (their spelling) for the first mission to the moon. The moon, for the record, is a giant wheel of cheese. Everyone knows this. The goblins want to bring some back.',
  hook: 'The party is broke, desperate, or both. A goblin in a tinfoil hat approaches them at a tavern with a pitch deck drawn in crayon. "You go to moon. We pay in moon cheese. Cheese very valuable. Also we already lit the rocket. You have four minutes." The party is bundled into a barrel. The countdown is in goblin, which only goes up to three.',
  twist:
    'The moon IS cheese. But it is alive. It is a celestial entity - an ancient being of dairy and gravitational magic that has been peacefully orbiting for millennia. It is aware of the goblins. It thinks they are hilarious. It has been gently nudging their rockets back to the ground because it does not want visitors tracking mud on it. The goblins finally built a rocket too stupid for the moon to deflect.',
  climax:
    'The party lands on the living cheese moon, which is having a full conversation with them while goblins try to mine its surface. The moon is not angry but it IS ticklish, and goblin mining picks tickle. Each tickle causes a moonquake. If the goblins do not stop, the moon will laugh so hard it falls out of orbit. The party must negotiate a cheese trade agreement between goblins and a celestial dairy product before the moon literally dies laughing.',
  acts: [
    {
      title: 'Act 1: Launch Day',
      summary:
        'The party is recruited, briefed (badly), and launched in a series of catastrophic test flights. Each session is a new launch attempt. The rockets get progressively more ambitious and more dangerous. Safety is not a goblin concept.',
      keyEvents: [
        'Recruitment: a goblin pitch deck in crayon, a contract signed in mushroom ink.',
        'Test Launch 1: the rocket goes sideways. Into a lake. The goblins call this "progress."',
        'Test Launch 2: the rocket goes up, comes back down, and lands on the launch pad. A perfect circle. The goblins are baffled.',
        'Test Launch 3: the rocket achieves altitude. Then the fireworks run out. Then gravity remembers.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Leaving the Atmosphere',
      summary:
        'Through accumulated goblin ingenuity (and an alarming disregard for physics), the party actually reaches space. Space is weird. There is no air. The goblins did not plan for this. There are also space creatures, debris from previous goblin launches, and the moon is getting closer and it is definitely cheese.',
      keyEvents: [
        'Breakthrough: a wizard accidentally contributes a Feather Fall that makes the rocket work.',
        'Space encounter: the debris field of 47 previous goblin rockets, some with survivors still waving.',
        'First contact with the moon\'s gravitational field - the moon gently pushes the rocket away.',
        'The party overrides the moon\'s deflection by being too heavy, too fast, or too stubborn.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: One Small Step',
      summary:
        'The party lands on the cheese moon. The moon talks. The goblins start mining. The moon starts laughing. Moonquakes begin. The party must broker peace between an alien dairy entity and creatures whose entire diplomatic vocabulary is "we take cheese now please."',
      keyEvents: [
        'Landing: the rocket crashes into the moon surface. It smells incredible.',
        'The moon speaks: "Oh good, you finally made it. I have been watching you for months. The sideways one was my favorite."',
        'Goblins begin mining. The moon giggles. Tremors begin.',
        'Negotiation: the party brokers the Cheese Accords - a renewable dairy trade agreement with a celestial body.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Chief Rocket Scientist Boomfizz',
      role: 'goblin mission commander',
      personality:
        'A goblin who found a gnomish engineering textbook, read it upside down, and is now the tribe\'s leading scientist. Speaks with absolute confidence about concepts she fundamentally misunderstands. "Thrust-to-weight ratio is simple. More boom equals more up. This is science."',
      secret: 'She cannot read. The textbook is a cookbook. Several rocket designs are based on souffle recipes.',
    },
    {
      name: 'The Moon (Lunara)',
      role: 'celestial entity / the moon itself',
      personality:
        'An ancient being of cheese and starlight who has been watching civilization from orbit for 10,000 years. Benevolent, amused, extremely ticklish. Speaks in a warm, grandmotherly voice that resonates through the ground. "Oh, you brought little green ones. They are adorable. Tell them to stop poking me."',
    },
    {
      name: 'Lieutenant Kablammo',
      role: 'goblin safety officer',
      personality:
        'The tribe\'s safety officer. Has no idea what safety means. His safety checklist is: "1. Is it on fire? Good. 2. Is anyone dead? Not yet? Also good. 3. Launch." Missing three fingers. Considers this a good track record.',
    },
    {
      name: 'Orbitz the Survivor',
      role: 'previous astronaut / information source',
      personality:
        'A goblin from Launch 23 who has been floating in orbit for six months. Lives in a barrel with a window he cut himself. Has developed a philosophical outlook on existence. Refuses to come home. "Up here, there are no taxes."',
    },
  ],
  keyLocations: [
    {
      name: 'Gritznak Launch Facility',
      description: 'A clearing in the forest with a launch pad made of stacked anvils, a control room made of a hollowed-out tree, and a fuel depot that is just a shed full of fireworks. There is a scorch mark where Launch 7 used to be.',
      significance: 'Home base for the space program and the site of every catastrophic test launch.',
    },
    {
      name: 'The Debris Field',
      description: 'A ring of goblin rocket wreckage orbiting the world. Barrels, firework casings, at least two goblins waving from separate debris chunks, and a surprising amount of cheese (from previous attempts that got close).',
      significance: 'An obstacle field the party must navigate, and evidence of how many times the goblins have tried this.',
    },
    {
      name: 'The Cheese Moon (Lunara\'s Surface)',
      description: 'Rolling hills of aged cheddar, valleys of brie, mountains of parmesan. The surface is warm, slightly soft, and smells incredible. Craters from previous rocket impacts have been healed over with fresh mozzarella.',
      significance: 'The destination, the final act setting, and the body of the campaign\'s most important NPC.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'environmentalHazard',
    'trapGenerator',
    'plotTwistEngine',
    'socialEncounter',
    'fantasyInsults',
    'explorationHazard',
    'riddleGenerator',
  ],
};
