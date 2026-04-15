import type { FullCampaign } from '../types';

export const theBodyPolitic: FullCampaign = {
  id: 'full-the-body-politic',
  type: 'full',
  title: 'The Body Politic',
  tagline: 'Each player IS an organ. The brain wants to study. The liver wants to party. The stomach just wants lunch.',
  tone: 'comedic',
  themes: ['comedy', 'exploration', 'social'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 1, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The party IS a body. One body. Each player controls a different organ or system of a single person named Galen Marsh, a perfectly ordinary clerk in a perfectly ordinary city. The Brain makes decisions (Intelligence/Wisdom). The Heart controls emotions and social encounters (Charisma). The Stomach manages resources and energy (Constitution). The Immune System handles combat and threats (Strength). The Nervous System handles perception and reflexes (Dexterity). They must cooperate to get Galen through a normal day - eating breakfast, going to work, having conversations, falling in love - while internal politics threaten mutiny.',
  hook:
    'Galen Marsh wakes up on a Monday. The Brain proposes getting out of bed. The Heart does not feel like it. The Stomach demands breakfast. The Immune System reports a mild cold. The Nervous System detects the alarm clock is still ringing. Internal debate ensues. It takes 45 minutes to get out of bed. Galen is going to be late for work. The campaign is the most mundane adventure ever told, from the most absurd perspective possible.',
  twist:
    'Galen is a real person in the game world and the organ councils are how EVERYONE works. Every person the party (Galen body) meets is also piloted by a bickering council of organs. When Galen falls in love with a baker named Sable, the party must negotiate with Sable organ council. Romance is diplomacy between internal governments. The villain is a person whose organs have been unified under a dictatorial Brain - a sociopath whose body runs with terrifying efficiency.',
  climax:
    'The sociopath (Lord Verek) has discovered how to forcibly unify other people organ councils under his control - essentially mind-controlling people by puppeting their bodies from the inside. He is building an army of "unified" citizens. The final battle is organ-to-organ warfare: Galen council must fight Verek council while also fighting for control of the battlefield bodies. The Heart must convince enemy Hearts to rebel. The Immune System fights enemy Immune Systems. It is the weirdest, funniest, most emotional battle in D&D history.',
  acts: [
    {
      title: 'Act 1: A Normal Day',
      summary:
        'Galen goes to work. The party (his organs) must cooperate to accomplish basic human tasks: eating, dressing, commuting, working, socializing. Every task requires internal negotiation. The Stomach threatens a hunger strike. The Heart falls in love with a baker. The Brain is overwhelmed.',
      keyEvents: [
        'Getting out of bed: a 4-player negotiation that sets the tone for the entire campaign',
        'Breakfast: the Stomach demands eggs. The Heart wants pastries from the cute baker. The Brain says there is no time. Combat: an allergic reaction the Immune System must fight.',
        'Work: Galen is a filing clerk. The Brain handles the work while everyone else is bored. The Nervous System keeps making Galen fidget.',
        'The baker (Sable): the Heart sees her and INSISTS Galen talk to her. The Brain panics. Social encounter handled entirely through internal argument.',
        'End of day: the party reviews their performance. Galen had a mediocre day. They resolve to do better. The Liver suggests a drink. Running gag begins: every time the party faces a decision, the Liver proposes drinking as the solution. It is never the right answer. It is always the most popular vote.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Other Councils',
      summary:
        'The party discovers other people have organ councils too. Galen relationship with Sable becomes organ-council diplomacy. Meanwhile, people in the city are acting strange - robotic, efficient, emotionless. Their organ councils have been forcibly unified. Something is wrong.',
      keyEvents: [
        'First date with Sable: the party must negotiate with her organ council. Her Heart is interested. Her Brain is cautious. Her Stomach ordered too much food.',
        'Discovery: Lord Verek assistant moves with mechanical precision. His organ council has been dissolved - one organ controls everything.',
        'Citizens going "blank": more people losing their personalities. Their Bodies run on autopilot. Efficient but empty.',
        'A freed organ council: the party saves one victim whose Heart organ physically escaped and is now a tiny creature begging for help',
        'Verek revealed: a nobleman whose own Brain seized total control years ago. He found it so efficient he decided to "fix" everyone.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Body War',
      summary:
        'Verek moves to unify the entire city. The final battle is organ vs organ: Heart vs Heart, Brain vs Brain, Immune System vs Immune System. Galen council must fight as a team while also convincing enemy organ councils to rebel against their unified controllers.',
      keyEvents: [
        'Verek army: hundreds of citizens marching in perfect unison. Efficient. Soulless. Terrifying.',
        'The rebellion strategy: they cannot fight body to body. They must reach the organs inside and start civil wars.',
        'Heart to Heart: the Heart player convinces enemy Hearts to feel again. Tears. Rage. Love. The emotions come flooding back.',
        'The Brain duel: Galen Brain vs Verek Brain in a battle of wits, logic, and willpower inside a shared neural space',
        'Victory condition: Verek own suppressed organs rebel. His Heart, his Stomach, his Nervous System all turn on his Brain. He feels everything he suppressed and collapses, sobbing.',
        'Callback: the Liver proposes a drink one final time. This time, the whole council agrees. Galen and Sable share a glass of wine. The Liver weeps with vindication.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Galen Marsh',
      role: 'the body / protagonist',
      personality:
        'A perfectly ordinary clerk who has no idea his organs are sentient bickering entities. From the outside, he is a mildly awkward, well-meaning man who sometimes argues with himself. From the inside, he is a democracy on the verge of collapse.',
    },
    {
      name: 'Sable Crenn',
      role: 'love interest / allied body',
      personality:
        'A baker with flour-dusted hands and a warm laugh. Her organ council is well-organized: Heart leads, Brain supports, Stomach bakes. She is what a healthy internal democracy looks like. She likes Galen because he seems "real" - his internal chaos reads as authenticity.',
    },
    {
      name: 'Lord Verek',
      role: 'villain',
      personality:
        'A nobleman whose Brain organ seized total dictatorial control over his body. He is efficient, emotionless, and convinced he is helping people by removing their internal conflict. He cannot feel anything and considers that a feature. His suppressed Heart screams silently.',
      secret: 'He did it because his Heart was broken. Unifying was the only way to stop the pain. He is not evil. He is grief-stricken.',
    },
    {
      name: 'The Runaway Heart',
      role: 'informant / refugee',
      personality:
        'An organ that physically escaped a unified body. It is a tiny, glowing creature that radiates warmth and sadness. It can feel everything its former body cannot. It wants to go home but not at the cost of being enslaved again.',
    },
  ],
  keyLocations: [
    {
      name: 'Inside Galen',
      description: 'The interior of a human body reimagined as a fantasy city. The Brain is a library-fortress. The Heart is a cathedral. The Stomach is a processing plant. The Nervous System is a network of lightning roads.',
      significance: 'The primary "world." Where all internal negotiation, politics, and some combat occurs.',
    },
    {
      name: 'The Filing Office',
      description: 'Galen workplace. The most boring location in the campaign, which is the point. From inside, the Brain is doing ALL the work while everyone else naps or argues.',
      significance: 'Where the comedy of mundane life through organ perspective is sharpest.',
    },
    {
      name: 'The Neural Bridge',
      description: 'The space between two bodies during physical contact. When Galen holds Sable hand, the organ councils can see each other across a glowing bridge of nerve signals.',
      significance: 'Where inter-body diplomacy happens. The most intimate location in the campaign.',
    },
  ],
  dataSystems: ['npcGenerator', 'fantasyInsults', 'combatNarration', 'emotionalBeat', 'urbanEncounter'],
};
