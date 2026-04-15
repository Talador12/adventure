import type { FullCampaign } from '../types';

export const theUndefeatedChampion: FullCampaign = {
  id: 'full-the-undefeated-champion',
  type: 'full',
  title: 'The Undefeated Champion',
  tagline: 'She has never lost a fight. Every fight was real. Her legacy is still a lie.',
  tone: 'serious',
  themes: ['classic_fantasy', 'war', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'The warrior Kaelith Sundara has not lost in 147 consecutive duels. She has defeated champions from every nation, monsters from every plane, and challengers who traveled years just to face her. She is the pride of the Tarvosi Dominion. Statues in every city. Songs in every tavern. Children play at being her. Her brother, Jorvec, arrives at the party\'s door with a wild claim: every fight was staged. Every opponent was paid. None of it was real.',
  hook: 'Jorvec Sundara is drunk, desperate, and offering everything he owns. He says his sister\'s entire career is a manufactured spectacle. He has evidence: payment records, correspondence with opponents, a handler named Theska who arranges everything. He wants the party to prove it, expose it, and save his sister from a lie she does not know she is living. He is shaking. He believes every word he is saying.',
  twist:
    'Jorvec is wrong. Kaelith won every fight legitimately. She is genuinely the greatest warrior alive. But the conspiracy he found is real. Her handlers - a group called the Laurel - have been assassinating any challenger who might actually defeat her BEFORE the fight. Not because the fights are fake, but because the Laurel has bet the nation\'s economy and political alliances on her winning streak. Kaelith does not know. She has never needed help. The Laurel kills just in case. Every victory is real. Every victory is also covered in blood she did not spill.',
  climax:
    'The party presents the evidence to Kaelith. She has a choice: continue fighting, knowing her handlers murder her challengers in advance. Retire, letting the streak stand but refusing to participate further. Or expose everything, destroying her legacy, the Laurel, and the political structure built on her name. Whatever she chooses, the party must deal with the Laurel, who will not let their investment walk away quietly.',
  acts: [
    {
      title: 'Act 1: The Brother\'s Claim',
      summary:
        'The party investigates Jorvec\'s evidence. They follow the money, contact former opponents, and discover that his evidence is convincing but his conclusion is wrong. The opponents were real. Something else is happening.',
      keyEvents: [
        'Jorvec\'s briefing: payment ledgers, coded letters, a handler named Theska who appears in every record',
        'Interviewing a former opponent who confirms he fought Kaelith legitimately and lost badly',
        'The payment records are real - but the payments were made AFTER the fights, not before',
        'A challenger who was supposed to fight Kaelith disappeared the night before. He was found dead.',
        'Quiet moment: the party watches Kaelith train. She is extraordinary. She moves like water and hits like stone. Whatever else is true, this part is real.',
        'The party realizes the conspiracy is not fake fights. It is something worse.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Laurel',
      summary:
        'The party uncovers the Laurel - a cabal of Tarvosi officials who protect the winning streak at any cost. Not because the fights are fake, but because the nation cannot afford for Kaelith to lose. The party discovers bodies, cover-ups, and a woman who has no idea.',
      keyEvents: [
        'Theska is identified: a retired spy now running "security" for Kaelith\'s career',
        'A graveyard of challengers who never made it to the arena - poisoned, ambushed, disappeared',
        'The Laurel\'s true scope: trade agreements, military alliances, and a crown all depend on the streak',
        'The party attempts to warn Kaelith. The Laurel intervenes. Violently.',
        'Kaelith defeats another challenger - genuinely, brilliantly - while the party knows a third was killed last week',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Truth',
      summary:
        'The party brings the evidence to Kaelith and the Laurel simultaneously. Everything detonates. Kaelith must reckon with a legacy she earned being propped up by murders she did not order. The Laurel must be stopped or bargained with.',
      keyEvents: [
        'Kaelith sees the evidence. She is silent for a long time. Then she asks: "How many?"',
        'The Laurel offers the party a deal: walk away, get rich, and the streak continues',
        'Jorvec confronts his sister. He was wrong about the fights. He was right that something was rotten.',
        'Kaelith makes her choice. The party must enforce it against the Laurel.',
        'Epilogue: the Tarvosi Dominion reacts to whatever version of the truth emerges',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Kaelith Sundara',
      role: 'central figure / unwitting pawn',
      personality:
        'Disciplined, humble despite her fame, and genuinely kind to her challengers. Bows to every opponent before and after the fight. Trains at dawn and sleeps at dusk. She respects combat as an art. She has spent her life being the best and has never needed to cheat. "I win because I prepare. Not because I am special." Arc: the revelation shatters her certainty. Every victory is real but every victory is also tainted. She must decide what her legacy means when it was built on a foundation of murder she did not order.',
      secret: 'She has suspected something is wrong for years. Challengers who talked big would vanish the night before. She told herself they lost their nerve. She did not want to look deeper.',
    },
    {
      name: 'Jorvec Sundara',
      role: 'quest giver / brother',
      personality:
        'Kaelith\'s younger brother. Passionate, impulsive, and carrying the weight of living in his sister\'s shadow. He genuinely loves her. His evidence is real. His conclusion is wrong.',
      secret: 'He found the evidence because he was looking for proof his sister was a fraud. He wanted it to be true. He hates himself for that.',
    },
    {
      name: 'Theska',
      role: 'antagonist / handler',
      personality:
        'A former intelligence operative who runs the Laurel\'s operations around Kaelith\'s career. Calm, surgical, and utterly convinced she is protecting the nation. She has killed seventeen challengers.',
      secret: 'She was once a challenger herself. Kaelith defeated her in three seconds. She decided that day that the streak must never end.',
    },
    {
      name: 'High Chancellor Orvast',
      role: 'political antagonist',
      personality:
        'The Tarvosi official who authorized the Laurel. Pragmatic, paternal, and completely willing to murder strangers to maintain national prestige.',
    },
  ],
  keyLocations: [
    {
      name: 'The Arena of the Sun',
      description: 'Tarvos\'s grand combat arena where Kaelith fights. Capacity sixty thousand. Every seat is always full.',
      significance: 'Where the public story plays out. The arena sees only glory. The tunnels beneath it tell a different story.',
    },
    {
      name: 'The Laurel\'s Archive',
      description: 'A hidden office beneath the Tarvosi war ministry. Filing cabinets full of eliminated challengers, each with a cause of death and a cost.',
      significance: 'The proof. Names, dates, methods. The machinery of manufactured glory.',
    },
    {
      name: 'Kaelith\'s Training Grounds',
      description: 'A private compound outside Tarvos where Kaelith trains alone. Simple, austere, and completely unaware of what happens in her name.',
      significance: 'Where the party meets Kaelith as a person, not a legend. Where the truth is finally delivered.',
    },
  ],
  dataSystems: [
    'combatEncounter',
    'npcRelationshipWeb',
    'courtIntrigue',
    'detectiveCase',
    'factionReputation',
    'socialEncounter',
    'moralDilemma',
  ],
};
