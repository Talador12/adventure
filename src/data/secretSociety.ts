// Random secret society generator — hidden organizations with rituals, ranks, and goals.

export type SocietyAlignment = 'benevolent' | 'neutral' | 'sinister' | 'ambiguous';
export type SocietyGoal = 'knowledge' | 'power' | 'protection' | 'revolution' | 'ascension' | 'preservation';

export interface SocietyRank { rank: number; title: string; privileges: string; requirement: string; }
export interface SocietyRitual { name: string; purpose: string; description: string; mechanicalEffect: string | null; }

export interface SecretSociety {
  name: string;
  publicFront: string;
  alignment: SocietyAlignment;
  goal: SocietyGoal;
  description: string;
  ranks: SocietyRank[];
  rituals: SocietyRitual[];
  signalPhrase: string;
  secretSymbol: string;
  weakness: string;
  plotHook: string;
}

const SOCIETIES: SecretSociety[] = [
  { name: 'The Unwritten', publicFront: 'A book club that meets on Tuesdays.', alignment: 'benevolent', goal: 'knowledge', description: 'Scholars who preserve forbidden knowledge by memorizing it. They burn the books and carry the words in their minds.', ranks: [
    { rank: 1, title: 'Page', privileges: 'Access to the reading room. One memorized text.', requirement: 'Memorize 1000 words in a single session.' },
    { rank: 2, title: 'Chapter', privileges: 'Access to the hidden archive. Three texts.', requirement: 'Prove you\'ve shared knowledge with someone who needed it.' },
    { rank: 3, title: 'Volume', privileges: 'The complete library lives in your mind. You ARE a walking library.', requirement: 'Memorize the entire Forbidden Index (50,000 words). Takes 1 year.' },
  ], rituals: [
    { name: 'The Burning', purpose: 'Destroy the physical copy of a dangerous text after memorizing it.', description: 'Members gather. One reads aloud while others memorize. The book burns. The knowledge lives.', mechanicalEffect: 'Participants gain advantage on History checks related to the burned text\'s subject for 1 month.' },
  ], signalPhrase: '"Have you read anything good lately?" Answer: "Only what I remember."', secretSymbol: 'A closed book with an open flame above it.', weakness: 'If a Volume dies without passing their knowledge to a successor, that knowledge is lost forever.', plotHook: 'A Volume has gone missing. They carry knowledge of a weapon capable of destroying a god. Everyone is looking for them.' },
  { name: 'The Hollow Court', publicFront: 'A traveling theater company.', alignment: 'ambiguous', goal: 'revolution', description: 'Actors who are also assassins. They perform plays that predict (or cause) political upheaval. Every performance is a message.', ranks: [
    { rank: 1, title: 'Extra', privileges: 'Walk-on roles. Reconnaissance duty. Learn the signals.', requirement: 'Survive an audition (literal combat, Performance DC 13).' },
    { rank: 2, title: 'Lead', privileges: 'Named roles. Access to the poison cabinet. Assassination contracts.', requirement: 'Complete 3 "performances" (missions) without breaking character.' },
    { rank: 3, title: 'Director', privileges: 'Plan the productions. Choose the targets. Write the scripts.', requirement: 'Orchestrate a regime change through a single theatrical production.' },
  ], rituals: [
    { name: 'The Curtain Call', purpose: 'Mark a successful assassination.', description: 'The company performs a play about the target\'s death. The target is in the audience. They don\'t survive intermission.', mechanicalEffect: 'The target must make a WIS DC 16 save during the performance or become transfixed (incapacitated) until the "play" ends.' },
  ], signalPhrase: '"Break a leg." Answer: "Whose?"', secretSymbol: 'A mask with a dagger behind it.', weakness: 'Their pride. They MUST perform before they kill. This gives observant targets a window to escape.', plotHook: 'The party receives free tickets to a play. The playbill describes the assassination of someone they know.' },
  { name: 'The Verdant Oath', publicFront: 'A botanical society.', alignment: 'sinister', goal: 'ascension', description: 'Druids who believe civilization is a disease. They work to return the world to wilderness by slowly, methodically destroying cities from within.', ranks: [
    { rank: 1, title: 'Seed', privileges: 'One awakened plant ally. Access to the greenhouse (hidden headquarters).', requirement: 'Grow a plant in an urban environment and keep it alive for 1 year.' },
    { rank: 2, title: 'Root', privileges: 'Command over a network of plants within one city block. Plant-based sabotage tools.', requirement: 'Destroy one building using only plants (collapse via root growth, vine strangulation, etc).' },
    { rank: 3, title: 'Canopy', privileges: 'Control the Verdant Network — every plant in the city reports to you.', requirement: 'Return one city block to wilderness. Permanently.' },
  ], rituals: [
    { name: 'The Rewilding', purpose: 'Accelerate plant growth to reclaim urban areas.', description: 'A circle of druids channels magic through a planted seed. In 1 hour, a block becomes a forest.', mechanicalEffect: 'Plant Growth (8th level equivalent) in a 1-mile radius. Buildings crack. Roads buckle. Nature wins.' },
  ], signalPhrase: '"The garden grows." Answer: "As all things must."', secretSymbol: 'A vine strangling a tower.', weakness: 'Fire. Their plans literally burn.', plotHook: 'A city block has been reclaimed by wilderness overnight. The Verdant Oath is claiming responsibility. The residents are missing.' },
];

export function getRandomSociety(): SecretSociety {
  return SOCIETIES[Math.floor(Math.random() * SOCIETIES.length)];
}

export function getSocietiesByAlignment(alignment: SocietyAlignment): SecretSociety[] {
  return SOCIETIES.filter((s) => s.alignment === alignment);
}

export function getSocietiesByGoal(goal: SocietyGoal): SecretSociety[] {
  return SOCIETIES.filter((s) => s.goal === goal);
}

export function getRankCount(society: SecretSociety): number {
  return society.ranks.length;
}

export function getAllAlignments(): SocietyAlignment[] {
  return [...new Set(SOCIETIES.map((s) => s.alignment))];
}

export function formatSociety(society: SecretSociety): string {
  const icon = { benevolent: '✨', neutral: '⚪', sinister: '💀', ambiguous: '❔' }[society.alignment];
  const lines = [`${icon} **${society.name}** *(${society.alignment}, ${society.goal})*`];
  lines.push(`  Front: ${society.publicFront}`);
  lines.push(`  *${society.description}*`);
  lines.push(`  Signal: "${society.signalPhrase}"`);
  lines.push(`  ⚡ Weakness: ${society.weakness}`);
  lines.push(`  📜 Hook: ${society.plotHook}`);
  return lines.join('\n');
}

export { SOCIETIES as SECRET_SOCIETIES };
