// Magical academy faculty — professors with specialties, quirks, office drama, and research.

export type Department = 'evocation' | 'illusion' | 'divination' | 'transmutation' | 'necromancy' | 'abjuration' | 'conjuration' | 'enchantment';

export interface ResearchProject {
  name: string;
  description: string;
  dangerLevel: number;
  needsHelp: string;
}

export interface FacultyMember {
  name: string;
  race: string;
  department: Department;
  title: string;
  personality: string;
  teachingStyle: string;
  officeQuirk: string;
  rivalry: string;
  researchProject: ResearchProject;
  studentComplaint: string;
  questHook: string;
}

const FACULTY: FacultyMember[] = [
  {
    name: 'Professor Ignatia Scorch',
    race: 'Fire Genasi',
    department: 'evocation',
    title: 'Chair of Applied Destruction',
    personality: 'Passionate about controlled explosions. Considers "too much power" an oxymoron. Surprisingly safety-conscious despite everything.',
    teachingStyle: 'Practical demonstrations only. No textbooks. "You learn fire by making fire." The classroom has scorch marks on every surface.',
    officeQuirk: 'Her office is fireproof and she keeps a pet fire salamander named Gerald who eats homework (literally, she feeds it to him).',
    rivalry: 'Despises Professor Velthan in Abjuration. He keeps warding her demonstrations and calling them "unsafe." She calls his shields "cowardice with extra steps."',
    researchProject: { name: 'Controlled Stellar Ignition', description: 'Attempting to create a miniature sun in a containment field. The field has failed twice. The academy rebuilt the east wing both times.', dangerLevel: 5, needsHelp: 'Needs a heat-resistant material from a fire elemental plane. Will pay in spell scrolls.' },
    studentComplaint: '"She set my familiar on fire to demonstrate a point about fire resistance. My familiar does NOT have fire resistance."',
    questHook: 'Her latest experiment opened a pinhole to the Elemental Plane of Fire. It is getting bigger. She needs help closing it before the dean finds out.',
  },
  {
    name: 'Professor Velthan the Unbreakable',
    race: 'Dwarf',
    department: 'abjuration',
    title: 'Professor of Protective Arts',
    personality: 'Stoic, methodical, believes offense is for amateurs. Has never attacked anything in 40 years of teaching. His shields have saved the academy 23 times.',
    teachingStyle: 'Lectures. Long, detailed, thorough lectures. Students fall asleep. He wards them so they do not fall out of their chairs.',
    officeQuirk: 'His office has 17 locks, 9 wards, and a moat (it is on the first floor and yes, it is a real moat). Getting an appointment takes 3 forms.',
    rivalry: 'Considers Professor Scorch a menace to public safety. Filed 14 formal complaints. She has filed 14 counter-complaints about his "fun-suppressing bureaucracy."',
    researchProject: { name: 'The Perfect Shield', description: 'Trying to create a ward that blocks ALL damage types simultaneously. Currently blocks 7 of 13. Psychic and force keep getting through.', dangerLevel: 2, needsHelp: 'Needs someone to hit his shield with every damage type to test it. Compensation: a Brooch of Shielding.' },
    studentComplaint: '"He assigned a 40-page essay on the history of Shield. The spell, not the concept. There is not 40 pages of content. I checked."',
    questHook: 'His Perfect Shield prototype was stolen from his office. Something got past all 17 locks. He is both furious and professionally impressed.',
  },
  {
    name: 'Professor Whisper Moonshadow',
    race: 'Tabaxi',
    department: 'illusion',
    title: 'Professor of Applied Deception',
    personality: 'Never gives a straight answer. May or may not actually be a professor. The dean cannot confirm or deny her employment because the paperwork keeps changing.',
    teachingStyle: 'Classes are optional, location varies, and may or may not be real. Students who find the actual classroom get extra credit. Some semesters, no one finds it.',
    officeQuirk: 'Her office changes appearance every day. Sometimes it is a tropical beach. Sometimes it is a dungeon. The chair is always comfortable and always an illusion.',
    rivalry: 'Secretly admires Professor Graves in Necromancy. Leaves anonymous notes on his desk. The notes are illusions that disappear before he can read them fully. This has been going on for 8 years.',
    researchProject: { name: 'The Convincing Lie', description: 'Creating an illusion so perfect it becomes real. Has accidentally created a real sandwich. The sandwich is sentient. This is a problem.', dangerLevel: 3, needsHelp: 'The sentient sandwich is growing. It needs to be convinced it is not real before it starts a family.' },
    studentComplaint: '"I went to office hours. The office was there. Professor Moonshadow was there. We had a great conversation. I later learned I was talking to a Silent Image for 45 minutes."',
    questHook: 'One of her illusions gained sentience and escaped the academy. It looks exactly like the dean and is signing official documents. The real dean has not noticed yet.',
  },
  {
    name: 'Professor Mortimer Graves',
    race: 'Human (elderly)',
    department: 'necromancy',
    title: 'Dean of Post-Mortem Studies',
    personality: 'Dry wit, impeccable ethics, tired of explaining that necromancy is not evil. His best friend is a ghost named Harold who audits every class.',
    teachingStyle: 'Socratic method with undead visual aids. "Class, this is a zombie. Observe its gait. Now, WHO can tell me what is ethically wrong with raising it without consent?"',
    officeQuirk: 'Skeleton teaching assistants grade papers. They are surprisingly fair. One skeleton (Patricia) has been an assistant for 30 years and has opinions about student handwriting.',
    rivalry: 'Has a grudging respect for Professor Scorch. She destroys things. He puts them back together. They are professionally symbiotic and personally exhausted by each other.',
    researchProject: { name: 'Ethical Undeath', description: 'Developing a form of undeath that preserves consciousness and free will. Test subject: himself. He has been partially undead for 10 years. He is fine. Mostly.', dangerLevel: 4, needsHelp: 'Needs a vial of pure positive energy to stabilize his condition. The closest source is a celestial.' },
    studentComplaint: '"The skeleton graded my paper and wrote \'I died with better penmanship than this.\' I cannot even argue. Patricia has a point."',
    questHook: 'Harold (the ghost) has started acting strange. He is forgetting things. Ghost dementia is not supposed to be possible. Something in the academy is draining ethereal energy.',
  },
];

export function getRandomProfessor(): FacultyMember {
  return FACULTY[Math.floor(Math.random() * FACULTY.length)];
}

export function getProfessorByDepartment(dept: Department): FacultyMember | undefined {
  return FACULTY.find((f) => f.department === dept);
}

export function getAllDepartments(): Department[] {
  return [...new Set(FACULTY.map((f) => f.department))];
}

export function getDangerousResearch(): FacultyMember[] {
  return FACULTY.filter((f) => f.researchProject.dangerLevel >= 4);
}

export function formatProfessor(prof: FacultyMember): string {
  const lines = [`🎓 **${prof.name}** *(${prof.race}, ${prof.title})*`];
  lines.push(`  Department: ${prof.department}`);
  lines.push(`  Personality: ${prof.personality}`);
  lines.push(`  Teaching: ${prof.teachingStyle}`);
  lines.push(`  Office: ${prof.officeQuirk}`);
  lines.push(`  Rivalry: ${prof.rivalry}`);
  lines.push(`  Research: **${prof.researchProject.name}** (danger: ${prof.researchProject.dangerLevel}/5)`);
  lines.push(`    ${prof.researchProject.description}`);
  lines.push(`  Student review: "${prof.studentComplaint}"`);
  lines.push(`  Quest: ${prof.questHook}`);
  return lines.join('\n');
}

export { FACULTY as ACADEMY_FACULTY };
