// Random NPC day job — what do they do when adventurers aren't around?
export interface NpcJob { job: string; dailyRoutine: string; knowledgeArea: string; usefulSkill: string; }
const JOBS: NpcJob[] = [
  { job: 'Gravedigger', dailyRoutine: 'Digs from dawn. Eats lunch among the headstones. Talks to the dead.', knowledgeArea: 'Who died recently and how. Graveyard layout. Undead signs.', usefulSkill: 'Can identify remains. Knows the cemetery better than anyone alive.' },
  { job: 'Rat catcher', dailyRoutine: 'Patrols the sewers with terriers and traps.', knowledgeArea: 'Sewer maps. What lives down there. Who pays to keep it quiet.', usefulSkill: 'Can guide the party through the underground safely.' },
  { job: 'Lamplighter', dailyRoutine: 'Lights every street lamp at dusk, extinguishes at dawn.', knowledgeArea: 'Who comes and goes at night. The streets no one walks after dark.', usefulSkill: 'Knows the city at night better than the guards.' },
  { job: 'Tanner', dailyRoutine: 'Processes hides in stinking vats. No one visits voluntarily.', knowledgeArea: 'Animal and monster biology. Leather quality. Who hunts what.', usefulSkill: 'Can identify a creature from its hide or claw marks.' },
  { job: 'Courier', dailyRoutine: 'Runs messages across town. Fast. Knows every shortcut.', knowledgeArea: 'Who is writing to whom. Political gossip. Secret routes.', usefulSkill: 'Can deliver a message anywhere in the city in under an hour.' },
  { job: 'Midwife', dailyRoutine: 'On call at all hours. Delivers babies, treats fevers.', knowledgeArea: 'Every family in town. Medical knowledge. Birth records.', usefulSkill: 'Medicine proficiency. Trusted by every household.' },
];
export function getRandomNpcJob(): NpcJob { return JOBS[Math.floor(Math.random() * JOBS.length)]; }
export function formatNpcJob(j: NpcJob): string { return `👷 **NPC Job: ${j.job}**\n📋 Routine: ${j.dailyRoutine}\n🧠 Knows: ${j.knowledgeArea}\n⭐ Useful: ${j.usefulSkill}`; }
