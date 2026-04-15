import type { FullCampaign } from '../types';

export const theColosseumOfSouls: FullCampaign = {
  id: 'full-colosseum-souls',
  type: 'full',
  title: 'The Colosseum of Souls',
  tagline: 'Every fight you have ever had prepared you for this. This place knows.',
  tone: 'serious',
  themes: ['dark_fantasy', 'classic_fantasy', 'war'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 6, end: 14 },
  estimatedSessions: 16,
  settingSummary:
    'An ancient colosseum has surfaced from the desert - a structure that chooses its own fighters by marking warriors with a brand that compels them toward it. Inside: enchanted arenas where combatants fight echoes of history\'s greatest warriors, with the ultimate prize being a single resurrection. The party is marked. They will fight. The question is why this colosseum chose THEM.',
  hook: 'A brand appears on each party member\'s arm overnight - a crossed-swords sigil that burns cold. A dream shows them a colosseum in the desert. They know, with absolute certainty, that they must go. Others marked by the brand are already traveling. Resisting the compulsion causes increasing pain.',
  twist:
    'The colosseum does not want fighters - it wants judges. It was built to contain the souls of history\'s greatest warriors who refused to pass on. They have been fighting each other for eternity, unable to stop. The colosseum needs living souls to serve as judges - to declare winners and losers, ending cycles of eternal combat. Each "fight" the party wins is actually a judgment.',
  climax:
    'The final round: the party must judge the colosseum\'s two greatest warriors - heroes from opposing sides of a war that ended a thousand years ago. Neither has ever lost. Neither will accept defeat. The party must find a way to end the eternal conflict: declare a winner (the loser\'s soul is destroyed), declare a draw (both continue fighting forever), or convince both warriors that the war they died for is meaningless - the hardest judgment of all.',
  acts: [
    {
      title: 'Act 1: The Brand',
      summary:
        'Marked by the colosseum, traveling to the desert, and entering the arena alongside other marked warriors. The journey itself is a test - the brand draws those capable of empathy, not just combat.',
      keyEvents: [
        'The brand: appears overnight, burns cold, compels travel. A party member touches it and sees a flash of two warriors locked in combat.',
        'The journey: other marked warriors converge from across the continent. Some are honorable. Some want the resurrection for selfish reasons.',
        'Camp on the dunes: a night before entering. A rival team shares their fire. Their leader lost a daughter and wants her back. The party learns what resurrection means to the desperate.',
        'The colosseum: massive, ancient, half-buried - it hums with trapped souls. The entrance opens only when all marked warriors arrive.',
        'First round: the party fights an echo of a legendary warrior - and realizes something is wrong with "winning." The defeated echo whispers "thank you" as it fades.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Rounds',
      summary:
        'Advancing through rounds, discovering the colosseum\'s true purpose, and meeting the trapped souls who have been fighting for centuries. Between rounds, the party speaks with the dead.',
      keyEvents: [
        'Round 2: the "enemy" is a hero from a righteous war - defeating them feels wrong. She fought to free slaves. She does not deserve destruction.',
        'Between rounds: the trapped souls speak in the Waiting Halls. They do not want to fight anymore. One asks the party to remember her name.',
        'A quiet moment: a dead warrior teaches a party member a sword technique passed down for generations, now lost to the living world. "Someone should know this."',
        'Round 3: the colosseum reveals its true purpose - the party is judging, not fighting. The arena shifts to show the warrior\'s life, not just their skill.',
        'The burden: each judgment frees a soul - but the freed soul is gone forever. A warrior asks: is oblivion better than eternal war?',
        'If the party showed mercy to the rival team in Act 1, that team now fights alongside them. If not, they face them across the arena.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Last Judgment',
      summary:
        'Two ancient warriors, eternal enemies, neither able to stop. The party must end a thousand-year fight. The judgment is not about combat. It is about letting go.',
      keyEvents: [
        'The final arena: two warriors who have been locked in combat for a millennium. The air smells like iron and exhaustion.',
        'Their war: long-forgotten, meaningless to the living, everything to the dead. They recite grievances a thousand years old.',
        'A quiet moment before the judgment: General Theron and Commander Ashara sit across from the party. For the first time in a millennium, they are not fighting. They are talking.',
        'The judgment: winner takes the resurrection, loser is destroyed. Or: the party convinces them both that the war is over - no winner, no loser, just peace.',
        'Theron\'s confession: "I have known for centuries the war was pointless. I kept fighting because stopping means my soldiers died for nothing." Ashara: "Mine too."',
        'The colosseum crumbles as the last souls are freed. The desert reclaims it. The party walks out carrying only the memory of every warrior they judged.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'General Theron',
      role: 'eternal warrior / sympathetic',
      personality:
        'A general from a thousand-year-old war. Speaks in clipped military cadence even when discussing feelings. He has been fighting his counterpart for so long he has forgotten why. He wants to stop. He does not know how. Calls everyone "soldier" regardless of rank.',
      secret: 'He knows the war was pointless. He has known for centuries. He keeps fighting because stopping means admitting his soldiers died for nothing.',
    },
    {
      name: 'Commander Ashara',
      role: 'eternal warrior / mirror',
      personality:
        'Theron\'s opponent. Equally tired. Equally proud. She hums a marching song between bouts that she cannot remember learning. They respect each other more than anyone alive. "We are the last two who remember the war. When we stop, it is truly over."',
    },
    {
      name: 'The Colosseum',
      role: 'the arena / entity',
      personality:
        'A structure that speaks through architecture: opening doors to welcome, closing them to warn. Lights dim when it is sad. The sand in the arena shifts to form patterns that suggest rather than command. It is tired of containing eternal war. It called the party because they are capable of empathy - the rarest weapon.',
    },
    {
      name: 'Captain Revka',
      role: 'rival team leader',
      personality:
        'Leader of a rival marked team. Lost her daughter to plague two years ago. Sharp-tongued, exhausted, and fighting with a ferocity that comes from having nothing left to lose. Rubs the brand on her arm when nervous. "I do not need your sympathy. I need the resurrection."',
      secret: 'She has already accepted that she probably will not win. She came because not coming felt like giving up on her daughter entirely.',
    },
  ],
  keyLocations: [
    {
      name: 'The Colosseum of Souls',
      description:
        'A vast arena half-swallowed by desert sand. The stone is warm even at night. Inside, echoes of ancient warriors replay their battles eternally. The crowd seats are filled with translucent figures who watch in silence.',
      significance: 'The primary setting. Every room is a judgment waiting to happen.',
    },
    {
      name: 'The Waiting Halls',
      description:
        'Where combatants rest between rounds. The walls display the history of every soul trapped within - murals that shift and update. A fountain dispenses water that tastes like whichever memory the drinker misses most.',
      significance: 'Where the party learns the truth and speaks with the dead between rounds.',
    },
    {
      name: 'The Final Arena',
      description:
        'The deepest ring - where the two greatest warriors have been locked in combat for a thousand years. The sand is worn to glass in places from repeated impacts. The walls are scored with a millennium of blade marks.',
      significance: 'The climactic judgment. Where a war finally ends.',
    },
  ],
  dataSystems: [
    'gladiatorArena',
    'tournamentBracket',
    'encounterWaves',
    'combatNarration',
    'darkBargain',
    'deathSaveDrama',
    'skillChallenge',
    'partyMoraleTracker',
    'socialEncounter',
  ],
};
