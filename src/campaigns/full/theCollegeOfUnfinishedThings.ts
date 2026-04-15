import type { FullCampaign } from '../types';

export const theCollegeOfUnfinishedThings: FullCampaign = {
  id: 'full-college-unfinished',
  type: 'full',
  title: 'The College of Unfinished Things',
  tagline: 'Wizard school, but the campus is alive and the midterms involve surviving.',
  tone: 'comedic',
  themes: ['comedy', 'urban', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'The College of Arcane Impracticalities is the worst magic school in the realm — and the only one accepting late enrollments. The campus buildings rearrange nightly, the cafeteria food is sentient, half the faculty are missing (literally — they keep going transparent), and the dean hasn\'t been seen since a "minor experiment" in 1247. The party enrolls as students and discovers the school is built on an unfinished demiplane that\'s slowly unraveling.',
  hook: 'The party needs something only the College can provide (a rare spell, a pardon, a cure, accreditation for practicing magic). They arrive to find the admissions office staffed by an animated broom that keeps sweeping their paperwork into a trash bin. They\'re accepted because "you\'re breathing and that\'s the bar."',
  twist:
    'The College IS the dean. He didn\'t disappear — he became the campus. His final experiment fused him with the demiplane, and he\'s been the buildings, the grounds, and the cafeteria food for 800 years. He\'s lonely, slightly mad, and the reason the school still functions at all. The unraveling is him losing his mind.',
  climax:
    'The demiplane is collapsing. The party must either stabilize the dean-campus (keeping the school alive but trapping him forever), find a way to separate him (destroying the school), or graduate — the College has a failsafe where graduating students absorb enough knowledge to stabilize the demiplane from outside.',
  acts: [
    {
      title: 'Act 1: Freshman Year',
      summary:
        'Enrollment, campus exploration, and increasingly absurd classes. The party discovers the school is stranger than advertised — and something is wrong with the architecture.',
      keyEvents: [
        'Enrollment — placement exam involves dodging a fireball (the test is whether you dodge)',
        'First classes: "Applied Running Away," "Theoretical Explosions," "Ethics of Accidental Necromancy." Running gag begins: every class assigns homework that is impossible to complete because the campus rearranges and the classroom is never in the same place twice.',
        'The campus rearranges — a student disappears and reappears three days younger',
        'The library has a restricted section that restricts YOU',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Midterms',
      summary:
        'Midterm exams are survival scenarios in the school\'s sub-basements. The party discovers the demiplane underpinning and starts communicating with the dean-campus.',
      keyEvents: [
        'Midterm exam: survive the Dungeon of Practical Applications (a live dungeon crawl graded on style)',
        'The walls start talking — the dean-campus tries to communicate',
        'A rival student clique is trying to "fix" the school by rewriting the demiplane (bad idea)',
        'The cafeteria stages a rebellion (the food is sentient and tired)',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Finals',
      summary:
        'The demiplane cracks. The school is coming apart. The party must pass their "final exam" — which turns out to be saving reality.',
      keyEvents: [
        'The rival clique\'s experiment goes wrong — the demiplane starts folding',
        'The dean manifests fully — a face in the architecture, scared and confused',
        'The final exam: stabilize the demiplane using everything they\'ve learned',
        'Graduation — the party gets actual diplomas (and they are magic). Callback: the homework from Act 1 was graded by the dean-campus all along. They all passed. The grade was "Survived."',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Dean Aldric Fondsworth',
      role: 'the campus / sympathetic figure',
      personality:
        'An 800-year-old wizard who IS the school. Speaks through creaking doors, rearranging furniture, and occasionally the cafeteria menu. Eccentric, lonely, and a genuinely good teacher — if you can understand him.',
      secret: 'He could have separated himself centuries ago. He stayed because he loves teaching and didn\'t want the school to close.',
    },
    {
      name: 'Professor Quill',
      role: 'faculty advisor',
      personality:
        'A kenku wizard who can only speak by repeating things she\'s heard. Her lectures are remixes of every lecture she\'s attended in 200 years. Surprisingly coherent. Mostly.',
    },
    {
      name: 'Brex Thornton',
      role: 'rival student',
      personality:
        'A rich, brilliant, arrogant wizard student who is convinced he can "optimize" the school. His plans are technically sound and catastrophically reckless.',
      secret: 'He\'s terrified of graduating because his family expects him to take over the family necromancy business.',
    },
    {
      name: 'Spork',
      role: 'cafeteria leader',
      personality:
        'A sentient fork (yes, a fork) who leads the cafeteria utensil union. Very serious about workers\' rights. Has a surprising amount of political savvy for silverware.',
    },
  ],
  keyLocations: [
    {
      name: 'The College of Arcane Impracticalities',
      description:
        'A campus of mismatched buildings that rearrange nightly. Gothic towers next to modern glass atriums next to what appears to be a barn.',
      significance: 'The entire campaign takes place here. The campus IS the dean.',
    },
    {
      name: 'The Sub-Basements',
      description:
        'Beneath the school — increasingly unstable layers where the demiplane\'s fabric is visible. Reality gets weird down here.',
      significance: 'Where the truth about the school is discovered.',
    },
    {
      name: 'The Forbidden Library',
      description:
        'A library that doesn\'t restrict books — it restricts readers. The books are fine. YOU might not be worthy.',
      significance: 'Contains the knowledge needed to save the school.',
    },
  ],
  dataSystems: [
    'pocketDimension',
    'puzzleLock',
    'magicalAnomaly',
    'familiarRebellion',
    'socialEncounter',
    'skillChallenge',
    'magicalLibraryCatalog',
    'summoningMishap',
    'fantasyInsults',
  ],
};
