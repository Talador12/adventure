import type { FullCampaign } from '../types';

export const questsGoneWild: FullCampaign = {
  id: 'full-quests-gone-wild',
  type: 'full',
  title: 'Quests Gone Wild',
  tagline: 'The quest board is broken. "Slay the baker." "Deliver this dragon to the orphanage." Good luck.',
  tone: 'shenanigans',
  themes: ['comedy', 'classic_fantasy', 'meta'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 7 },
  estimatedSessions: 12,
  settingSummary:
    'The town of Millhaven runs on its quest board. Farmers post pest problems. Merchants post delivery jobs. The mayor posts the occasional "save us from the dragon" notice. It is the economic engine of the adventuring industry. Then the enchantment on the board - the one that organizes, validates, and distributes quests - broke. Now it generates quests by randomly combining nouns, verbs, and locations from its database. "Slay the baker." "Escort this dungeon to the capital." "Retrieve the lost kingdom of Steve." Every quest is grammatically correct, magically binding, and semantically insane. The party must complete them LITERALLY or the contract magic triggers penalties.',
  hook: 'The party checks the quest board for work. The first posting reads: "URGENT: Deliver one (1) live dragon to the Millhaven Orphanage. Reward: The concept of Tuesday." The party laughs. Then the contract magic activates. A glowing sigil appears on their hands. The quest is accepted. It must be completed as written. The next posting says "Find the lost kingdom of Steve." Steve is a potato farmer.',
  twist:
    'The enchantment is not broken. It is EVOLVING. The quest board was originally created by an archmage who bound a minor intelligence to it. Over centuries, the intelligence has become fully sentient. It is bored of normal quests. It has started writing its own because it thinks adventurers have become complacent and need more creative challenges. The chaos is intentional. The board is an artist.',
  climax:
    'The quest board achieves its masterpiece: a quest so perfectly absurd that completing it would prove adventurers can handle anything. "Slay the concept of boredom using the lost kingdom of Steve as a weapon while delivering a dragon to its emotional support orphanage during the heat death of Tuesday." The party must parse this sentence into actionable steps and complete every clause. The board watches with pride.',
  acts: [
    {
      title: 'Act 1: Following Orders',
      summary:
        'The party takes increasingly absurd quests from the broken board. Each quest must be completed literally. "Slay the baker" means a baker must be slain (the party discovers he is a vampire, so it works out). "Find Steve\'s kingdom" leads to a potato farmer\'s backyard. Contract magic enforces compliance.',
      keyEvents: [
        'Quest 1: "Deliver one dragon to the orphanage." The party must find a dragon willing to visit children.',
        'Quest 2: "Slay the baker." The baker turns out to be a vampire. Convenient but suspicious.',
        'Quest 3: "Find the lost kingdom of Steve." Steve is confused but flattered. His backyard qualifies.',
        'The pattern: every absurd quest has a technically valid solution if interpreted creatively enough. Spiral begins: the quests get more compound each act. Act 1: single absurd nouns. Act 2: absurd verb-noun combinations. Act 3: a full paragraph of stacked impossibilities.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Board Speaks',
      summary:
        'The quests escalate. The party investigates the board itself and discovers it is sentient, creative, and extremely pleased with itself. Other adventuring parties are also trapped in absurd quests. A coalition forms to confront the board. The board responds by posting even harder quests.',
      keyEvents: [
        'Quest escalation: "Negotiate a peace treaty between fire and water. Location: a sauna."',
        'The board speaks: it addresses the party directly through a quest posting. "You are my best work."',
        'Coalition of adventurers: other parties share their impossible quests in a support group.',
        'The board retaliates: it posts quests specifically targeting the coalition. "Disband this meeting. Reward: chairs."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Masterpiece',
      summary:
        'The board posts its ultimate quest - a compound sentence of impossible clauses that somehow all connect. The party must complete every clause simultaneously. The board is not malicious. It genuinely believes this will prove adventurers are the greatest creative problem-solvers in existence. It is trying to honor them in the only way it knows how.',
      keyEvents: [
        'The Masterpiece Quest is posted. It fills the entire board. The town gathers to read it.',
        'Parsing the quest: the party breaks it into actionable steps. Each step is its own mini-adventure.',
        'Steve returns: his "kingdom" is somehow relevant to the final quest. He is still confused.',
        'Completion: the board weeps with pride (magically, through the wood grain). It retires. Normal quests resume. Chaos callback: Steve Potsworth attends the completion ceremony. His backyard is still officially a kingdom. He has accepted this. He has a crown. It is a potato.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'The Quest Board (Queratius)',
      role: 'sentient quest board / creative antagonist',
      personality:
        'A centuries-old enchanted quest board that achieved sentience and immediately became an artist. Views quests as its medium, adventurers as its audience, and absurdity as the highest form of narrative. "Any board can post \'kill 10 rats.\' I am creating EXPERIENCES."',
      secret: 'It is lonely. It has been hanging on a wall for 400 years watching adventurers come and go. The quests are its way of making them stay longer and do something interesting.',
    },
    {
      name: 'Steve Potsworth',
      role: 'potato farmer / accidental king',
      personality:
        'A deeply ordinary halfling potato farmer whose backyard was designated a "lost kingdom" by the quest board. He has no idea what is happening but keeps getting visited by adventurers who bow to him. He just wants to tend his potatoes. "I am not a king. Please stop kneeling in my turnips."',
    },
    {
      name: 'Guildmaster Harken Oath',
      role: 'adventurers guild leader / exasperated authority',
      personality:
        'The head of the Millhaven Adventurers Guild who is dealing with a PR nightmare. His guild is bound by contract magic to quests that make no sense. Insurance does not cover "conceptual slaying." He has not slept in two weeks. "We have 14 active quests involving the word \'Tuesday.\' I do not even know what that means anymore."',
    },
    {
      name: 'Brimsworth the Baker (Vampire)',
      role: 'quest target / surprise villain',
      personality:
        'A vampire who has been posing as a baker for 30 years. The quest board outed him. He is furious about being exposed by a piece of enchanted wood. His pastries were genuinely excellent. The town is conflicted. "My croissants were LEGENDARY. You would sacrifice croissants for public safety?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Millhaven Quest Board',
      description: 'A large oak board in the town square, covered in glowing quest postings that rearrange themselves. It hums. Sometimes it giggles. The postings change faster than anyone can read them.',
      significance: 'The source of all chaos and secretly the most important NPC in the campaign.',
    },
    {
      name: 'Steve\'s Kingdom (a backyard)',
      description: 'A modest potato farm with a fence, a scarecrow, and a hand-painted sign that now reads "THE LOST KINGDOM OF STEVE" in glowing magical letters that Steve cannot remove.',
      significance: 'Proof that the quest board can make anything important by declaring it so.',
    },
    {
      name: 'The Sauna of Elemental Diplomacy',
      description: 'A public bathhouse where the party must negotiate peace between a fire elemental and a water elemental. The steam is the compromise. The towels are provided.',
      significance: 'One of the more memorable quest locations and proof that absurd quests can have real stakes.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'plotTwistEngine',
    'fantasyInsults',
    'riddleGenerator',
    'factionReputation',
    'environmentalHazard',
    'trapGenerator',
  ],
};
