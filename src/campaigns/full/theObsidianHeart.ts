import type { FullCampaign } from '../types';

export const theObsidianHeart: FullCampaign = {
  id: 'full-the-obsidian-heart',
  type: 'full',
  title: 'The Obsidian Heart',
  tagline: 'Everyone loves him. Only one person means it. He cannot tell which one.',
  tone: 'serious',
  themes: ['dark_fantasy', 'intrigue', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The wizard Cael Meren brewed a love potion. One dose, one target: a woman named Lira, who he had loved from a distance for years. He was too afraid to speak to her, so he cheated. The potion was flawless in construction and catastrophic in scope. Instead of making Lira love him, it made everyone love him. Every person who sees him is consumed by adoration - neighbors, shopkeepers, guards, children, strangers. He walks through the city and crowds gather. He speaks and people weep with joy. He is the most beloved person alive and he is in hell. Nobody challenges him. Nobody disagrees with him. Nobody tells him the truth. His relationships are all built on alchemy, not honesty. He cannot trust a single interaction.',
  hook: 'The party arrives in the city of Thalen and immediately feels it: a pull toward a specific district, a warmth, an irrational fondness for someone they have never met. The pull intensifies as they approach the tower of Cael Meren. They resist because they were not in the city when the spell was originally cast - the effect on them is weaker, delayed, fightable. Cael\'s assistant finds them and begs for help: his master is drowning in false love and needs people who can look at him without adoration. The party is the only group in the city capable of honest conversation with the most loved man alive.',
  twist:
    'Lira - the woman Cael made the potion for - was already in love with him. Before the potion. She had been working up the courage to tell him for months. When the potion activated, her behavior did not change because her feelings were already there. She is the only person in the city whose love is real. But Cael cannot believe it. He assumes her feelings are the potion, just like everyone else\'s. The one person whose love is genuine is the one person he dismisses as enchanted. She has been trying to tell him for months. He cannot hear it.',
  climax:
    'The party must break the enchantment while navigating a city that worships Cael and will violently resist anyone who threatens their beloved. Breaking the potion requires Cael to choose to be unloved - to willingly drink a counter-agent that will make him ordinary again. He is terrified. Not of losing the adoration, but of discovering that without the potion, nobody cares about him at all. The party must convince him to take the risk. Lira stands in the room. If he drinks, the enchantment breaks for everyone. Lira\'s love stays or goes based on whether it was real. Cael must trust that one genuine connection is worth more than a city of beautiful lies. He is shaking. She is waiting.',
  acts: [
    {
      title: 'Act 1: The Beloved',
      summary:
        'The party enters Thalen and experiences the enchantment. They resist it partially and are recruited by Cael\'s assistant to help a man who is being destroyed by universal affection. The city is blissful. Cael is miserable.',
      keyEvents: [
        'The party enters Thalen and feels the pull: irrational warmth toward a person they have never met',
        'The city: everyone is happy. Everyone is kind. Everyone is focused on one person. It is deeply unsettling.',
        'Cael\'s assistant Bren explains: the potion was meant for one woman. It hit everyone. Cael cannot undo it alone.',
        'Meeting Cael: he is polite, exhausted, and desperate. "Tell me something honest. Tell me I am wrong about something. Please."',
        'The party discovers the scope: the entire city, thousands of people, all enchanted. Removing them one by one would take years.',
        'Quiet moment: Cael asks a party member to play cards with him. He loses. He smiles for the first time in months. "You did not let me win. Thank you."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Cage',
      summary:
        'The party investigates the potion\'s mechanics and discovers the counter-agent. They also discover Lira - the original target whose love predates the potion. The tragic irony: the one real relationship in Cael\'s life is the one he refuses to believe.',
      keyEvents: [
        'The potion\'s mechanics: area-of-effect devotion, permanent until countered, keyed to Cael\'s magical signature',
        'A counter-agent exists but requires Cael to willingly drink it. It cannot be forced.',
        'The party meets Lira. She is angry, frustrated, and heartbroken. "I loved him before the potion. He thinks I am another victim."',
        'Cael refuses to believe Lira\'s feelings are real. "How could they be? How could anyone love me without magic?"',
        'The city begins to crack: the enchantment makes people possessive. Fights break out over who loves Cael more.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Choice',
      summary:
        'The party must get Cael to drink the counter-agent while a city of devotees tries to stop them. The enchantment is destabilizing - adoration is becoming obsession. Cael must choose to be unloved, trusting that Lira\'s love will survive.',
      keyEvents: [
        'The city turns hostile: the enchanted citizens will not allow anyone to "harm" their beloved. The party is now the enemy.',
        'Getting to Cael requires navigating a city of thousands who would die for a man who did not ask for their devotion',
        'Cael\'s tower: the party presents the counter-agent. Cael holds it. "What if nobody stays?"',
        'Lira enters. She tells him. Simply, honestly, without enchantment. "I loved you before. I will love you after."',
        'Cael drinks. The city wakes up. Thousands of people blink, confused, and wander home. Lira stays.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Cael Meren',
      role: 'victim / quest center',
      personality:
        'A talented wizard with no social confidence. Avoids eye contact. Starts sentences three times before finishing one. He brewed the potion because he was afraid of rejection. Now he lives in a world where rejection is impossible and honesty is extinct. He would give anything for someone to tell him he is wrong. "Everyone agrees with me. About everything. Do you know what that is like? It is the loneliest sound in the world." Arc: grows from paralyzed self-doubt to the courage to be unloved, which is the bravest thing he has ever done.',
      secret: 'He has known for months that the counter-agent exists. He has not taken it because he is more afraid of being unloved than of being lied to.',
    },
    {
      name: 'Lira Voss',
      role: 'the real thing',
      personality:
        'An herbalist who has loved Cael since before the potion. Practical, stubborn, and furious that the man she loves cannot distinguish her real feelings from magical ones. She has tried to tell him seventeen times. He apologizes for "the enchantment" every time.',
      secret: 'She considered leaving the city to prove her love was real. She stayed because leaving would look like the enchantment wearing off, confirming his fears.',
    },
    {
      name: 'Bren',
      role: 'ally / assistant',
      personality:
        'Cael\'s research assistant. Immune to the enchantment because he was out of the city when it was cast. Loyal, anxious, and the only honest voice Cael had before the party arrived.',
    },
    {
      name: 'Captain Orla',
      role: 'obstacle / city guard',
      personality:
        'The captain of the city guard, enchanted like everyone else. She has redirected the entire guard force to protecting Cael. She is professional, competent, and would arrest the party for looking at Cael funny.',
    },
  ],
  keyLocations: [
    {
      name: 'Thalen',
      description: 'A mid-sized city where every citizen is unconditionally devoted to one man. Streets are clean because he once mentioned he liked clean streets. Crime is zero because criminals love him too.',
      significance: 'The campaign\'s cage. A city that functions perfectly and is built entirely on a lie.',
    },
    {
      name: 'Cael\'s Tower',
      description: 'A modest wizard\'s tower in the center of Thalen. Cael rarely leaves. The crowd outside never leaves either.',
      significance: 'Where Cael hides from the love he created. Where the counter-agent waits. Where the choice is made.',
    },
    {
      name: 'Lira\'s Shop',
      description: 'An herbalist\'s shop at the edge of the enchantment\'s epicenter. Lira works here because the work is real even when everything else is not.',
      significance: 'Where the party meets the one person whose feelings are genuine. The campaign\'s emotional truth.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'moralDilemma',
    'urbanEncounter',
    'cursedItem',
    'chaseSequence',
    'diplomaticNegotiation',
  ],
};
