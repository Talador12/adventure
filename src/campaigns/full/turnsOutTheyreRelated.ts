import type { FullCampaign } from '../types';

export const turnsOutTheyreRelated: FullCampaign = {
  id: 'full-turns-out-theyre-related',
  type: 'full',
  title: 'Turns Out They\'re Related',
  tagline: 'Every villain is someone\'s cousin. The family tree is a crime scene. Thanksgiving is going to be awkward.',
  tone: 'shenanigans',
  themes: ['comedy', 'classic_fantasy', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'The party is a standard adventuring group doing standard adventuring things. Kill monsters. Save villages. Collect rewards. But every single villain they defeat turns out to be related to a party member. The bandit leader is someone\'s uncle. The necromancer is someone\'s college roommate. The dragon is someone\'s ex. The family tree connecting the party to every villain in the region is impossibly tangled, and every new revelation makes the next family gathering exponentially more awkward. Nobody knows why this keeps happening. The universe seems to be conspiring to make every conflict personal.',
  hook: 'The party defeats a bandit leader. Standard stuff. Then the bandit\'s helmet comes off and the fighter gasps: "Uncle Torvin?" The party laughs it off as coincidence. Next session, they defeat a cult leader. The rogue recognizes her: "That is my cousin Mira." The session after, the wizard\'s college roommate turns out to be a lich. By session four, the pattern is undeniable. Every villain is connected to a party member. The party\'s families have some explaining to do.',
  twist:
    'It is not coincidence. An ancestor of ALL the party members - a legendary hero named Valorian Brightblade - was cursed 200 years ago by a dying villain. The curse: "Your bloodline will fight itself forever." Valorian had a LOT of descendants. Every villain the party faces is a distant relative because Valorian\'s family tree spans the entire region. The party members are all related to each other and do not know it. Every battle has been a family feud.',
  climax:
    'The party discovers they are all related and must attend a massive family reunion where every villain they have defeated (many now released from prison, reformed, or un-killed) is also present. The final "battle" is a catastrophic family dinner where old grudges, new revelations, and 200 years of cursed bloodline drama converge around a single very long table. The curse can only be broken by an act of genuine family reconciliation. Dessert is tense.',
  acts: [
    {
      title: 'Act 1: It Keeps Happening',
      summary:
        'The party faces a series of standard villains who all turn out to be related to party members. Each reveal is more awkward than the last. The party begins dreading victory because it always comes with a family complication.',
      keyEvents: [
        'Villain 1: the bandit leader is the fighter\'s uncle. He asks for bail money.',
        'Villain 2: the cult leader is the rogue\'s cousin. She wants to explain at the next family dinner.',
        'Villain 3: the lich is the wizard\'s college roommate. He still owes them 50 gold.',
        'The pattern is undeniable. The party hires a genealogist who immediately has a nervous breakdown.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Family Tree',
      summary:
        'Investigation reveals the Brightblade curse and the impossibly tangled family tree. The party discovers they are all related to each other - and to every major villain in the region. A family reunion is proposed as the only way to break the curse. Planning it is a campaign in itself.',
      keyEvents: [
        'The genealogist recovers and presents the family tree. It takes up an entire wall.',
        'Revelation: all party members share an ancestor. They are distant cousins. Reactions vary.',
        'The Brightblade Curse is discovered: "Your bloodline will fight itself forever."',
        'The reunion is planned. The invitation list includes 30 reformed villains, 4 active villains, and one dragon.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Reunion',
      summary:
        'The family reunion happens. Every villain the party has defeated, every relative they have discovered, and several they did not know about converge on a single estate. The curse requires genuine reconciliation. The dinner is a battlefield of passive aggression, old grievances, and casseroles.',
      keyEvents: [
        'Arrivals: Uncle Torvin brings potato salad. Cousin Mira brings cult members. The lich brings nothing.',
        'The seating chart: placing a necromancer next to the cleric\'s mother is a mistake.',
        'Old grievances surface: "You killed me, Gerald." "You were ROBBING people, Torvin."',
        'Reconciliation: through tears, grudging apologies, and one very good pie, the curse breaks.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Uncle Torvin (Bandit Lord)',
      role: 'reformed villain / family embarrassment',
      personality:
        'A charming rogue who turned to banditry because he was bad at everything else. Genuinely sorry about the robberies. Brings potato salad to every family event and acts like nothing happened. "We all make mistakes. Mine just involved armed robbery. Can we move on?"',
    },
    {
      name: 'Cousin Mira (Ex-Cult Leader)',
      role: 'reformed villain / drama catalyst',
      personality:
        'Started a doomsday cult as a college project that got out of hand. Has since gotten therapy. Still has the robes because they are comfortable. "It was an extracurricular activity. It escalated. The pamphlets were already printed."',
    },
    {
      name: 'Bertram Bones (College Roommate Lich)',
      role: 'undead academic / grudge holder',
      personality:
        'Became a lich to finish his dissertation. Still owes the wizard 50 gold from their shared apartment. Will not pay it back on principle. "I became UNDEAD for ACADEMIA. The 50 gold is a rounding error in the grand scheme of eternal existence."',
      secret: 'He became a lich specifically because the wizard got a better grade than him. The entire descent into darkness was petty academic rivalry.',
    },
    {
      name: 'Valorian Brightblade (Ancestor, Deceased)',
      role: 'legendary hero / source of all problems',
      personality:
        'A long-dead hero whose portrait hangs in every family household. Was apparently a great warrior and a terrible family man. Had 14 children across 6 kingdoms. "He saved the world but he could not remember his kids\' birthdays." - family quote, engraved on his tomb.',
    },
  ],
  keyLocations: [
    {
      name: 'The Brightblade Family Estate',
      description: 'A sprawling, crumbling estate that has been in the family for 200 years. Every room has a portrait of a relative who became either a hero or a villain. The dining room seats 200. It will need to.',
      significance: 'Where the family reunion takes place and where the curse must be broken.',
    },
    {
      name: 'The Hall of Genealogy',
      description: 'A wing of the estate dedicated to the family tree, which covers every wall, parts of the ceiling, and has spilled onto the floor. Red string connects relatives. There is a lot of red string.',
      significance: 'Where the curse is discovered and where the connections between party members and villains are made visible.',
    },
    {
      name: 'The Tomb of Valorian',
      description: 'The founder\'s grave, located in the estate garden. The headstone reads "Here lies Valorian Brightblade, who saved the world and doomed his descendants." The inscription was added by his kids.',
      significance: 'Where the curse originated and where the history of the bloodline feud is recorded.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'plotTwistEngine',
    'fantasyInsults',
    'factionReputation',
    'villainMonologue',
    'riddleGenerator',
    'politicalIntrigue',
  ],
};
