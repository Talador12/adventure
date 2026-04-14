// Magical school exam — wizard academy encounters with tests, professors, cheating students, and consequences.

export type ExamSubject = 'evocation' | 'illusion' | 'divination' | 'transmutation' | 'necromancy' | 'abjuration';
export type ExamFormat = 'written' | 'practical' | 'oral' | 'duel' | 'thesis_defense';

export interface ExamQuestion {
  question: string;
  skillCheck: string;
  dc: number;
  passResult: string;
  failResult: string;
}

export interface ExamProctor {
  name: string;
  title: string;
  personality: string;
  weakness: string;
}

export interface MagicalExam {
  name: string;
  subject: ExamSubject;
  format: ExamFormat;
  description: string;
  proctor: ExamProctor;
  questions: ExamQuestion[];
  cheatingOpportunity: string;
  cheatingConsequence: string;
  bonusChallenge: string;
  passingReward: string;
  failureConsequence: string;
}

const EXAMS: MagicalExam[] = [
  {
    name: 'The Inferno Gauntlet',
    subject: 'evocation',
    format: 'practical',
    description: 'Students must navigate a corridor of increasingly dangerous fire hazards while demonstrating precise spell control. Collateral damage is penalized.',
    proctor: { name: 'Professor Ashara Flamecrest', title: 'Chair of Evocation', personality: 'Demanding, impatient, secretly proud of students who challenge her methods. Grades on a curve that only she understands.', weakness: 'Flattery about her published papers. Mention her thesis on controlled detonation and she softens.' },
    questions: [
      { question: 'Light a candle at 30 feet without igniting the curtains', skillCheck: 'Arcana', dc: 13, passResult: 'Clean hit. The professor nods. "Adequate."', failResult: 'Curtains catch fire. A homunculus with a tiny extinguisher sighs and gets to work.' },
      { question: 'Redirect an incoming Fireball into a containment sphere', skillCheck: 'Arcana', dc: 16, passResult: 'The fireball compresses into a glowing marble. The class gasps.', failResult: 'The fireball detonates. Everyone is fine (the room has Absorb Elements wards) but your grade is not.' },
      { question: 'Demonstrate the difference between maximum damage and maximum control', skillCheck: 'Arcana', dc: 15, passResult: 'A perfect demonstration. The professor makes a note: "Understands restraint."', failResult: 'You chose maximum damage. The professor writes: "Needs remedial ethics."' },
    ],
    cheatingOpportunity: 'The student next to you has a Tiny Servant holding cue cards under their desk. They will share if you help them with the practical portion.',
    cheatingConsequence: 'The Tiny Servant is actually the professor\'s. It was a trap. Both students fail and must write a 10-page essay on academic integrity.',
    bonusChallenge: 'Extinguish a Flame Skull without destroying it. DC 18 Arcana. Success adds extra credit.',
    passingReward: 'Certificate of Evocation Competency. 10% discount at the campus spell component shop. Professor Ashara remembers your name.',
    failureConsequence: 'Remedial summer session. Your familiar looks at you with disappointment.',
  },
  {
    name: 'The Veil of Truths',
    subject: 'illusion',
    format: 'oral',
    description: 'Students must identify which of three identical professors is real while answering questions about illusion theory. The fake professors give wrong information on purpose.',
    proctor: { name: 'Professor Miravel (or is it?)', title: 'Master of Illusions', personality: 'Playful, loves tricks, genuinely cannot remember which version of herself is real anymore. This is either a bit or a cry for help.', weakness: 'Direct sincerity. She is so used to deception that genuine honesty catches her off guard.' },
    questions: [
      { question: 'Which of us just told you the correct casting time for Major Image?', skillCheck: 'Insight', dc: 14, passResult: 'You point to the right one. She flickers and smiles. "Perceptive."', failResult: 'You picked a fake. It melts into butterflies. "Believe nothing, child."' },
      { question: 'Create an illusion that fools ME', skillCheck: 'Arcana', dc: 17, passResult: 'She reaches for your illusion and her hand passes through. A rare moment of genuine surprise.', failResult: 'She sees through it instantly. "I could see the seams from here. Try harder."' },
      { question: 'Explain why illusion magic is the most dangerous school', skillCheck: 'Persuasion', dc: 13, passResult: 'Your argument about perception being reality impresses her. "You understand."', failResult: '"You think evocation is scarier? How quaint. Next student."' },
    ],
    cheatingOpportunity: 'A senior student offers to sell you Truesight goggles for 50gp. They work, but they are themselves an illusion.',
    cheatingConsequence: 'The goggles show you nothing is real. You have an existential crisis mid-exam and cannot answer any more questions.',
    bonusChallenge: 'Maintain an illusion that the professor cannot detect for 1 full minute. DC 19 Arcana. Success earns her personal recommendation.',
    passingReward: 'A Cloak of Many Fashions (cosmetic only) and permission to take Advanced Illusions next semester.',
    failureConsequence: 'You must retake the exam. The professor makes it harder each time because she finds it funny.',
  },
  {
    name: 'The Dead Man\'s Thesis',
    subject: 'necromancy',
    format: 'thesis_defense',
    description: 'Present your thesis on ethical necromancy to a panel of three professors, one of whom is a politely animated skeleton. Your arguments must convince all three or you fail.',
    proctor: { name: 'Professor Mortimer Graves', title: 'Dean of Necromancy', personality: 'Dry wit, genuinely ethical, tired of explaining that necromancy is not inherently evil. His best friend is a ghost and they play chess every Tuesday.', weakness: 'Well-cited sources. He respects academic rigor above all else.' },
    questions: [
      { question: 'Defend the ethical use of Speak with Dead in criminal investigations', skillCheck: 'Persuasion', dc: 14, passResult: 'The panel nods. The skeleton takes notes (it is very thorough).', failResult: 'The ghost panelist objects: "You didn\'t consider the dead person\'s privacy rights."' },
      { question: 'Demonstrate proper consent protocols for raising an undead servant', skillCheck: 'Religion', dc: 15, passResult: 'You produce a signed and notarized pre-mortem consent form. The skeleton gives you a thumbs up.', failResult: '"So you just... raise them? Without asking? Bold position for a thesis defense."' },
      { question: 'Counter the argument that all necromancy desecrates the natural order', skillCheck: 'Arcana', dc: 13, passResult: 'A compelling argument about the cycle of magical energy. Even the Cleric auditing the class looks thoughtful.', failResult: 'The skeleton panelist sighs. It was hoping for a better argument since it is, you know, a skeleton.' },
    ],
    cheatingOpportunity: 'You can bribe the skeleton panelist with a new set of finger bones (its current ones are chipped). It will ask you easy questions.',
    cheatingConsequence: 'Professor Graves notices the new bones. "Did you try to bribe my teaching assistant? Points for creativity. Zero for ethics."',
    bonusChallenge: 'Animate the skeleton panelist\'s detached hand to write your grade for you. DC 16 Arcana. If it writes an A, you get it.',
    passingReward: 'Published in the campus journal. A letter of recommendation signed by the skeleton (legally binding in 3 kingdoms).',
    failureConsequence: 'Must volunteer at the campus morgue for a semester. The ghosts gossip about your failed thesis.',
  },
];

export function getRandomExam(): MagicalExam {
  return EXAMS[Math.floor(Math.random() * EXAMS.length)];
}

export function getExamBySubject(subject: ExamSubject): MagicalExam | undefined {
  return EXAMS.find((e) => e.subject === subject);
}

export function getAllSubjects(): ExamSubject[] {
  return [...new Set(EXAMS.map((e) => e.subject))];
}

export function getExamDifficulty(exam: MagicalExam): number {
  return Math.round(exam.questions.reduce((sum, q) => sum + q.dc, 0) / exam.questions.length);
}

export function formatExam(exam: MagicalExam): string {
  const lines = [`🎓 **${exam.name}** *(${exam.subject}, ${exam.format})*`];
  lines.push(`  ${exam.description}`);
  lines.push(`  Proctor: **${exam.proctor.name}** (${exam.proctor.title}) - ${exam.proctor.personality}`);
  lines.push(`  Weakness: ${exam.proctor.weakness}`);
  lines.push('  **Questions:**');
  for (const q of exam.questions) {
    lines.push(`    - ${q.question} (DC ${q.dc} ${q.skillCheck})`);
  }
  lines.push(`  Cheating: ${exam.cheatingOpportunity}`);
  lines.push(`  Bonus: ${exam.bonusChallenge}`);
  lines.push(`  Pass: ${exam.passingReward}`);
  lines.push(`  Fail: ${exam.failureConsequence}`);
  return lines.join('\n');
}

export { EXAMS as MAGICAL_EXAMS };
