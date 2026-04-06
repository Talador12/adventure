import type { FullCampaign } from '../types';

export const theColosseumOfSouls: FullCampaign = {
  id: 'full-colosseum-souls',
  type: 'full',
  title: 'The Colosseum of Souls',
  tagline: 'Every fight you\'ve ever had prepared you for this. This place knows.',
  tone: 'serious',
  themes: ['dark_fantasy', 'classic_fantasy', 'war'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 6, end: 14 },
  estimatedSessions: 16,
  settingSummary:
    'An ancient colosseum has surfaced from the desert — a structure that chooses its own fighters by marking warriors with a brand that compels them toward it. Inside: enchanted arenas where combatants fight echoes of history\'s greatest warriors, with the ultimate prize being a single resurrection. The party is marked. They will fight. The question is why this colosseum chose THEM.',
  hook: 'A brand appears on each party member\'s arm overnight — a crossed-swords sigil that burns cold. A dream shows them a colosseum in the desert. They know, with absolute certainty, that they must go. Others marked by the brand are already traveling. Resisting the compulsion causes increasing pain.',
  twist:
    'The colosseum doesn\'t want fighters — it wants judges. It was built to contain the souls of history\'s greatest warriors who refused to pass on. They\'ve been fighting each other for eternity, unable to stop. The colosseum needs living souls to serve as judges — to declare winners and losers, ending cycles of eternal combat. Each "fight" the party wins is actually a judgment.',
  climax:
    'The final round: the party must judge the colosseum\'s two greatest warriors — heroes from opposing sides of a war that ended a thousand years ago. Neither has ever lost. Neither will accept defeat. The party must find a way to end the eternal conflict: declare a winner (the loser\'s soul is destroyed), declare a draw (both continue fighting forever), or convince both warriors that the war they died for is meaningless — the hardest judgment of all.',
  acts: [
    {
      title: 'Act 1: The Brand',
      summary: 'Marked by the colosseum, traveling to the desert, and entering the arena alongside other marked warriors.',
      keyEvents: [
        'The brand: appears overnight, burns cold, compels travel',
        'The journey: other marked warriors converge from across the continent',
        'The colosseum: massive, ancient, half-buried — it hums with trapped souls',
        'First round: the party fights an echo of a legendary warrior — and realizes something is wrong with "winning"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Rounds',
      summary: 'Advancing through rounds, discovering the colosseum\'s true purpose, and meeting the trapped souls who have been fighting for centuries.',
      keyEvents: [
        'Round 2: the "enemy" is a hero from a righteous war — defeating them feels wrong',
        'Between rounds: the trapped souls speak — they don\'t want to fight anymore',
        'Round 3: the colosseum reveals its true purpose — the party is judging, not fighting',
        'The burden: each judgment frees a soul — but the freed soul is gone forever',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Last Judgment',
      summary: 'Two ancient warriors, eternal enemies, neither able to stop. The party must end a thousand-year fight.',
      keyEvents: [
        'The final arena: two warriors who\'ve been locked in combat for a millennium',
        'Their war: long-forgotten, meaningless to the living, everything to the dead',
        'The judgment: winner takes the resurrection, loser is destroyed',
        'Or: the party convinces them both that the war is over — no winner, no loser, just peace',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'General Theron (trapped soul)',
      role: 'eternal warrior / sympathetic',
      personality: 'A general from a thousand-year-old war. He has been fighting his counterpart for so long he\'s forgotten why. He wants to stop. He doesn\'t know how.',
      secret: 'He knows the war was pointless. He\'s known for centuries. He keeps fighting because stopping means admitting his soldiers died for nothing.',
    },
    {
      name: 'Commander Ashara (trapped soul)',
      role: 'eternal warrior / mirror',
      personality: 'Theron\'s opponent. Equally tired. Equally proud. They respect each other more than anyone alive. "We are the last two who remember the war. When we stop, it is truly over."',
    },
    {
      name: 'The Colosseum',
      role: 'the arena / entity',
      personality: 'A structure that speaks through architecture: opening doors to welcome, closing them to warn. It is tired of containing eternal war. It called the party because they are capable of empathy — the rarest weapon.',
    },
  ],
  keyLocations: [
    { name: 'The Colosseum of Souls', description: 'A vast arena half-swallowed by desert sand. Inside, echoes of ancient warriors replay their battles eternally.', significance: 'The primary setting.' },
    { name: 'The Waiting Halls', description: 'Where combatants rest between rounds. The walls display the history of every soul trapped within.', significance: 'Where the party learns the truth.' },
    { name: 'The Final Arena', description: 'The deepest ring — where the two greatest warriors have been locked in combat for a thousand years.', significance: 'The climactic judgment.' },
  ],
  dataSystems: ['gladiatorArena', 'tournamentBracket', 'encounterWaves', 'combatNarration', 'darkBargain', 'deathSaveDrama', 'skillChallenge', 'partyMoraleTracker', 'socialEncounter'],
};
