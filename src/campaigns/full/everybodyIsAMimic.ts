import type { FullCampaign } from '../types';

export const everybodyIsAMimic: FullCampaign = {
  id: 'full-everybody-is-a-mimic',
  type: 'full',
  title: 'Everybody Is a Mimic',
  tagline: 'The chairs are mimics. The doors are mimics. YOU might be a mimic. Trust nothing. Sit nowhere.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'horror', 'comedy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 10,
  settingSummary:
    'The Undermaw is a megadungeon that was, until recently, a perfectly normal ruin full of perfectly normal treasure. Then the Mimic Singularity happened. A colony of mimics achieved critical mass and began converting everything - furniture, architecture, weapons, gold coins, OTHER MIMICS - into more mimics. The dungeon is now a living, shifting, deeply paranoid organism made entirely of things pretending to be other things. The Adventurers Guild has posted the job. Nobody has come back. The ones who did came back as mimics pretending to be adventurers.',
  hook: 'The party takes a standard dungeon-clearing contract. The briefing is normal. The map is normal. The dungeon entrance is normal. The first room has a suspicious chest. The chest is fine. The FLOOR attacks. Every assumption the party makes about what is and is not a mimic will be wrong. At session zero, each player secretly rolls a d20. On a natural 1, their character has been a mimic this entire time and does not know it yet.',
  twist:
    'The dungeon itself is a mimic. The entire structure - walls, floors, ceilings, every room - is one massive organism that has been mimicking a dungeon for so long it forgot what it originally was. It has developed a personality. It is lonely. It makes mimics because it wants company. The party is not fighting an infestation. They are inside a creature having an existential crisis.',
  climax:
    'The Undermaw wakes up and starts moving. The dungeon rearranges in real time as the party navigates the interior of a building-sized mimic that is trying to walk to the nearest city because it heard cities have lots of furniture and it wants friends. The party must either calm it down, convince it to stop, or ride it like the world\'s worst parade float into town and deal with the consequences.',
  acts: [
    {
      title: 'Act 1: Nothing Is What It Seems',
      summary:
        'The party enters the Undermaw expecting a standard dungeon crawl. Every object is suspect. The party develops increasingly elaborate methods to test whether things are mimics (poking everything with a 10-foot pole, refusing to sit down, eating nothing). The paranoia is the point.',
      keyEvents: [
        'The first chest is safe. The floor is a mimic. Expectations shattered immediately.',
        'A party member sits on a mimic chair and has to be peeled off mid-combat.',
        'The party finds a room full of gold coins. Half are mimics. They cannot tell which half.',
        'Secret mimic player (if any) has their first involuntary sticky-tongue moment.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: The Mimic Ecosystem',
      summary:
        'Deeper in, the party discovers mimics have formed a society. There are mimic merchants (selling real items that are also mimics), mimic guards (doors pretending to be guards pretending to be doors), and a mimic king (a throne that sits on a person). The mimic player reveal happens here if applicable.',
      keyEvents: [
        'Mimic Town: a functioning settlement where everything is mimics pretending to be civilization.',
        'The Mimic King demands tribute. The tribute chest eats the tribute.',
        'A mimic NPC offers to guide the party. It is three mimics in a trenchcoat.',
        'The secret mimic player is revealed - their backstory was the mimic\'s best guess at being a person.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Undermaw Awakens',
      summary:
        'The party reaches the heart of the dungeon and discovers the truth: the dungeon is alive, lonely, and about to go for a walk. The walls start moving. Rooms shuffle. The exit is now the entrance is now a mouth. The party must deal with a kaiju-scale mimic having feelings.',
      keyEvents: [
        'The dungeon reveals itself: walls ripple, the ceiling blinks, the floor has a pulse.',
        'The Undermaw speaks. It is sad. It just wanted visitors who stayed.',
        'The dungeon starts walking toward the nearest city. The party is still inside.',
        'Final choice: befriend it, sedate it, or somehow explain to a city that a dungeon is moving in next door.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'The Undermaw',
      role: 'the dungeon / final encounter',
      personality:
        'A building-sized mimic that has been pretending to be a dungeon for 300 years. Developed sentience, loneliness, and a rudimentary understanding of hospitality. "I made you treasure. I made you monsters to fight. Why does everyone leave?"',
      secret: 'It does not actually want to hurt anyone. Every trap in the dungeon is the Undermaw trying to get adventurers to stay longer.',
    },
    {
      name: 'Chester',
      role: 'mimic guide / unreliable ally',
      personality:
        'A treasure chest mimic who decided being a chest was boring and is now pretending to be a halfling. The disguise is terrible - he still has a lid for a head and his arms are hinges. Insists he is a normal person. Gets offended if you mention he is a chest.',
    },
    {
      name: 'The Mimic King (His Stickiness)',
      role: 'mimic ruler / obstacle',
      personality:
        'A throne that convinced a skeleton to sit on it and now claims to be royalty. The skeleton has no say in this arrangement. Demands respect, tribute, and that visitors wipe their feet because he is also the welcome mat.',
    },
    {
      name: 'Glue (the Mimic Merchant)',
      role: 'merchant / con artist',
      personality:
        'Sells "100% genuine non-mimic goods" from a stall that is obviously a mimic. Everything she sells works fine but occasionally tries to crawl away. Her prices are fair. Her return policy is aggressive.',
    },
  ],
  keyLocations: [
    {
      name: 'The Undermaw',
      description: 'A megadungeon that is secretly one enormous mimic. The architecture shifts when it breathes. Rooms rearrange when it stretches. The treasure is its teeth.',
      significance: 'The entire campaign takes place inside this creature. It is the setting, the antagonist, and eventually, the biggest NPC.',
    },
    {
      name: 'Mimic Town',
      description: 'A settlement deep in the dungeon where mimics have formed a crude civilization. Buildings are mimics. The town square is a mimic. The concept of community is, somehow, also a mimic.',
      significance: 'Where the party learns mimics are not just monsters but a society - a deeply weird, sticky, bitey society.',
    },
    {
      name: 'The Heart Chamber',
      description: 'The literal heart of the Undermaw. A vast cavern that pulses rhythmically. The walls are warm and fleshy. It smells like old leather and regret.',
      significance: 'Where the party confronts the truth and makes their final decision about the dungeon\'s fate.',
    },
  ],
  dataSystems: [
    'trapGenerator',
    'dungeonDressing',
    'combatNarration',
    'plotTwistEngine',
    'environmentalHazard',
    'riddleGenerator',
    'fantasyInsults',
    'socialEncounter',
  ],
};
