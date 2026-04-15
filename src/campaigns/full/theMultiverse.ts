import type { FullCampaign } from '../types';

export const theMultiverse: FullCampaign = {
  id: 'full-the-multiverse',
  type: 'full',
  title: 'The Multiverse of You',
  tagline: 'You keep meeting alternate versions of yourselves. The evil ones. The bard ones. The cat ones.',
  tone: 'shenanigans',
  themes: ['comedy', 'planar', 'meta'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'A planar rift has opened, and alternate versions of the party keep falling through it. First came the evil versions - goatees, dark armor, the whole package. Then came the versions where everyone is a bard. Then the cat versions. Then baby versions. Then the versions who are all the same class. Each encounter with their alternates causes reality to blur, and the party is having increasing difficulty remembering which version of themselves is "real." The multiverse is a mirror maze and every reflection is someone who thinks THEY are the original.',
  hook: 'The party is camping when they hear familiar voices arguing. They investigate and find exact duplicates of themselves - but evil. The Evil Fighter has a scar. The Evil Wizard has a goatee. The Evil Rogue is... actually identical, which concerns everyone. A fight ensues. The evil versions are defeated but do not die - they fade into mist and are pulled back through a rift. The next day, a version of the party arrives where everyone is a bard. They want to collaborate on a musical.',
  twist:
    'The party is not the "original." None of them are. The rift was caused by an alternate version of the party - the Scholar versions - who were researching the multiverse and accidentally proved there IS no original. Every version is equally real, equally valid, and equally convinced they are the real one. The Scholar versions have been sending duplicates through the rift to find a version capable of closing it. The party is just the latest candidates.',
  climax:
    'All versions of the party converge at the rift: Evil, Bard, Cat, Baby, Scholar, and dozens more. They must work together to close the rift, but every version has a different plan and an equal claim to leadership. The final battle is coordinating an army of yourselves against a rift that spawns MORE versions the longer it stays open. The Cat versions are useless. The Baby versions are crying. The Bard versions are singing. The Evil versions are helping but also scheming.',
  acts: [
    {
      title: 'Act 1: The Reflections',
      summary:
        'Alternate versions of the party arrive one at a time. Each is absurd. Each is treated with absolute sincerity. The party must deal with evil duplicates, musical duplicates, animal duplicates, and versions of themselves that raise uncomfortable questions.',
      keyEvents: [
        'Evil versions: goatees, dark magic, monologues. They are defeated but keep coming back.',
        'Bard versions: identical party but everyone is a bard. They are charming. They will not stop singing.',
        'Cat versions: the party but as cats. Still sentient. Still have class abilities. Still cats.',
        'Baby versions: infant versions of the party. They have hit dice. They cannot stop crying.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Blur',
      summary:
        'The encounters with alternates start blurring reality. Party members occasionally manifest traits from other versions - the fighter hums bard songs, the wizard grows a temporary goatee. The Scholar versions make contact and explain the multiverse.',
      keyEvents: [
        'Reality blur: the fighter wakes up as a cat for 10 minutes. Nobody can explain this.',
        'The Scholar versions: identical party members with glasses and clipboards. They have a PowerPoint.',
        'The truth: no version is "original." The multiverse has no master copy.',
        'The rift is growing. New versions arrive every hour. There is now a pirate version, a cowboy version, and a version where everyone is a door.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Convergence',
      summary:
        'Every version of the party converges at the rift for a final attempt to close it. Coordination is impossible. The Evil versions betray everyone (then betray the betrayal). The Bard versions provide morale. The Cat versions knock things off tables. Somehow, it works.',
      keyEvents: [
        'The army of selves: 30+ versions of the party gather. The logistics are a nightmare.',
        'The Evil versions\' scheme: they try to keep the rift open. The party expected this.',
        'Rift closure: every version channels their power simultaneously. The Bard versions sing a power ballad.',
        'The farewell: versions say goodbye as the rift closes. The Cat versions headbutt the party affectionately.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'The Evil Versions',
      role: 'evil duplicates / recurring antagonists',
      personality:
        'Identical to the party but evil. Goatees on everyone (including those who cannot grow them - they are glued). They monologue. They betray. They are exhausting. The Evil Rogue is suspiciously similar to the real one.',
    },
    {
      name: 'The Scholar Versions',
      role: 'academic duplicates / exposition',
      personality:
        'Identical to the party but hyper-intellectual. They wear glasses. They carry clipboards. They speak in footnotes. They have a 47-slide presentation about the nature of multiversal identity. "If you will turn to slide 23, you will see a graph demonstrating that you are not real. Well, not MORE real. We apologize for the existential crisis."',
    },
    {
      name: 'The Bard Versions',
      role: 'musical duplicates / morale support',
      personality:
        'Identical to the party but everyone is a bard. They narrate everything in song. They are aggressively supportive. They have written a ballad about the original party called "The Ones Who Swing Swords and Are Not Us." It is a banger.',
    },
    {
      name: 'The Cat Versions',
      role: 'feline duplicates / adorable chaos',
      personality:
        'The party but as cats. Full class abilities. Full sentience. Cannot speak Common. Communicate through meows and significant glances. The Cat Wizard still casts spells - by knocking components off tables. The Cat Rogue is the best stealth operative in any version.',
    },
  ],
  keyLocations: [
    {
      name: 'The Rift',
      description: 'A shimmering tear in reality that shows glimpses of every possible version of the world. New versions of the party stumble through at random intervals. It hums with the sound of infinite possibilities arguing.',
      significance: 'The source of every alternate version and the thing that must be closed.',
    },
    {
      name: 'The Convergence Field',
      description: 'A vast open plain where the rift has created stable ground for all versions to gather. Campfires dot the landscape, each one surrounded by a different version of the party. The Evil versions camp upwind. Deliberately.',
      significance: 'Where the final gathering takes place and where the rift must be closed.',
    },
    {
      name: 'The Scholars\' Lab (Alternate Plane)',
      description: 'The research facility of the Scholar versions. Whiteboards covered in multiverse equations. A wall of photographs showing every version they have catalogued. The Cat version\'s photo is everyone\'s favorite.',
      significance: 'Where the truth about the multiverse is revealed and the closure plan is developed.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'plotTwistEngine',
    'socialEncounter',
    'environmentalHazard',
    'fantasyInsults',
    'explorationHazard',
    'villainMonologue',
    'riddleGenerator',
  ],
};
