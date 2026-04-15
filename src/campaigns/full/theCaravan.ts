import type { FullCampaign } from '../types';

export const theCaravan: FullCampaign = {
  id: 'full-the-caravan',
  type: 'full',
  title: 'The Caravan',
  tagline: '200 refugees. One war-torn continent. You get them across or they die.',
  tone: 'survival',
  themes: ['survival', 'war', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 9 },
  estimatedSessions: 18,
  settingSummary:
    'The Tarshan Civil War has displaced tens of thousands. A caravan of 200 refugees is heading west across the continent to the free city of Velmere - the last settlement accepting displaced people. Between here and there: 400 miles of territory controlled by warlords, bandits, and two warring armies that consider refugees enemy sympathizers regardless of which side they fled. The party must escort the caravan through starvation, disease, broken bridges, flooded rivers, hostile checkpoints, and the slow erosion of hope. Every session is a new crisis. Every decision costs something.',
  hook: 'The party encounters the caravan stalled at a destroyed bridge. Two hundred people - families, elders, children, the wounded - with three days of food and no way across the river. The caravan\'s previous leader was killed by bandits yesterday. Nobody is in charge. A woman approaches the party: "Can you get us across this river? If you can do that, maybe you can get us across the rest of this." Behind her, a child is crying. A man is praying. An old woman is sharpening a knife.',
  twist:
    'One of the refugees is Queen Lysara Tarshan - the deposed ruler whose war of succession created the refugees in the first place. She is traveling anonymously as "Maren," a widow with a young daughter. She is heading to Velmere not for safety but to reach allies who will help her restart the war. If the refugees discover who she is, they will kill her. Her daughter is innocent and does not know her mother\'s true identity. If Lysara reaches her allies, thousands more will be displaced or killed.',
  climax:
    'The party discovers Lysara\'s identity near the end of the journey. Velmere is days away. Lysara\'s allies are waiting. The caravan has survived everything the continent threw at it - they are a community now, bonded by suffering. The party must decide: expose Lysara and risk the caravan tearing itself apart at the finish line, confront her privately and demand she abandon her plans, let her go and accept the consequences, or find a third option that protects both the refugees and the future.',
  acts: [
    {
      title: 'Act 1: The Crossing',
      summary: 'The first hundred miles. Establishing order, finding food, and surviving the immediate threats of a war zone.',
      keyEvents: [
        'The bridge: the first crisis. Creative engineering, magic, or negotiation with the people on the other side.',
        'Caravan organization: who scouts, who cooks, who carries the children. The party builds a functioning community.',
        'Quiet moment: Brother Tomas holds a service by the river at dusk. Not everyone believes. Everyone listens. He sings and the caravan is still for the first time since they started walking.',
        'The first checkpoint: a warlord\'s soldiers demand a toll the caravan cannot pay',
        'Food crisis: foraging, hunting, and the math of feeding 200 people with almost nothing',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Road',
      summary: 'The middle stretch. Disease, despair, internal conflicts, and the slow discovery that one refugee is not who she claims.',
      keyEvents: [
        'Disease outbreak: dysentery from bad water. The healer is overwhelmed. Who gets medicine?',
        'The moment of cost: a warlord offers safe passage in exchange for twenty able-bodied fighters. Refusing means a dangerous detour. Accepting means sending caravan members to die in someone else\'s war. If the party navigated the first checkpoint diplomatically, the warlord respects them enough to negotiate. If they fought, he demands more.',
        'Internal faction: a group wants to stop and settle at a defensible ruin instead of pressing on',
        'Quiet moment: Little Asha brings Vex a wildflower and says "You look sad." Vex, who has been secretly watching Lysara, stares at the child and says nothing. The flower stays in her belt for the rest of the campaign.',
        '"Maren" acts strangely: she knows too much about military tactics, gives orders without thinking, and a soldier recognized her face',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Last Miles',
      summary: 'Velmere in sight. Lysara\'s identity discovered. The final choice.',
      keyEvents: [
        'The party confirms "Maren" is Queen Lysara Tarshan. Her daughter calls her "Mama" but a locket bears the royal seal.',
        'Lysara\'s confession: "I made the war. I know. I am trying to end it - my way. My allies can restore order."',
        'If Vex is still with the caravan, she draws her blade. If the party built a relationship with her, she waits for their word. If not, she acts.',
        'Quiet moment: the night before Velmere, Brother Tomas sings again. The same song from Act 1. But this time 200 voices join him. They are not the same people who left the bridge.',
        'Velmere\'s gates. 200 people who survived the impossible. One woman who could start it all again. The party decides.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Lysara / "Maren"',
      role: 'hidden queen / the moral dilemma',
      personality:
        'Intelligent, regal despite her disguise, and genuinely caring toward the refugees even as she plans to restart the conflict that displaced them. She believes her restoration will bring stability. She might be right. She might be delusional. "I did not start the war. I lost the war. The people who won are worse. I am the lesser evil." Arc: Act 1 helpful and unassuming, Act 2 her mask slips as crises demand leadership, Act 3 fully exposed - and the party sees she is genuinely torn between her daughter and her crown.',
      secret: 'Her daughter does not know. If Lysara is exposed, the child loses her mother one way or another.',
    },
    {
      name: 'Brother Tomas',
      role: 'caravan chaplain / moral compass',
      personality:
        'A weary cleric who tends to the spiritual needs of 200 traumatized people. He does not preach. He listens. He carries the dead. He sings when morale breaks. "I do not have answers. I have a shovel and a song." Arc: his song bookends the campaign. In Act 1 he sings alone. In Act 3, 200 voices join him. The caravan became a community because he held them together with music and funerals.',
    },
    {
      name: 'Vex',
      role: 'scout / former soldier',
      personality:
        'A deserter from the Tarshan army who joined the caravan to escape the war. She is the best pathfinder in the group. Sharp, cynical, and one recognition check away from identifying Lysara. "I killed people for her crown. I would rather die than do it again." Arc: in Act 1 she is all business. In Act 2, Asha befriends her and cracks the armor. In Act 3, she must decide if killing the queen is justice or if it would just make Asha another war orphan.',
      secret: 'She already suspects Maren. She is watching. She is deciding.',
    },
    {
      name: 'Little Asha',
      role: 'Lysara\'s daughter / innocent stakes',
      personality:
        'A six-year-old who thinks her mother is a seamstress named Maren. She has made friends with every child in the caravan. She does not understand the war or why they are walking. She just wants to stop walking. She gives wildflowers to people who look sad. She is the reason Vex hesitates.',
    },
  ],
  keyLocations: [
    {
      name: 'The War Road',
      description:
        'A 400-mile stretch of contested territory. Burned villages, military checkpoints, destroyed infrastructure. Every mile is a negotiation. The road itself tells the story of the war - craters, mass graves, abandoned weapons rusting in ditches.',
      significance: 'The campaign is the road. Every session is a different stretch.',
    },
    {
      name: 'The Ruins of Ashmark',
      description:
        'A destroyed fortress where the caravan takes shelter during a storm. Defensible but haunted by the battle that destroyed it. The walls still bear the scorchmarks of Lysara\'s army. She stares at them when no one is watching.',
      significance: 'The midpoint crisis: settle here or press on?',
    },
    {
      name: 'Velmere',
      description:
        'The free city at the end of the road. Open gates, clean water, and a future. The last city that will take refugees. Lysara\'s allies wait in a riverside manor. Vex\'s recognition of the royal seal on the gate herald\'s tabard confirms what she feared.',
      significance: 'The destination. The finish line. The place where Lysara\'s allies are waiting.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'cataclysmCountdown',
    'socialEncounter',
    'npcRelationshipWeb',
    'encounterWaves',
    'factionWar',
    'diplomaticNegotiation',
    'settlementEvent',
    'backstoryComplication',
  ],
};
