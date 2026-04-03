// Planar refugee crisis — displaced populations from other planes seeking asylum.

export type RefugeePlane = 'feywild' | 'shadowfell' | 'elemental' | 'abyss' | 'mechanus' | 'astral';

export interface RefugeeGroup {
  plane: RefugeePlane;
  name: string;
  race: string;
  population: string;
  reason: string;
  needs: string[];
  offers: string[];
  localReaction: string;
  plotHook: string;
  tension: string;
}

const GROUPS: RefugeeGroup[] = [
  { plane: 'feywild', name: 'The Thornless', race: 'Displaced eladrin (50 families)', population: '~200 adults, 80 children', reason: 'Their court was destroyed in a fey civil war. The winning side wants them dead.', needs: ['Safe territory to settle', 'Protection from fey assassins', 'Iron-free zone (allergic)'], offers: ['Fey magic knowledge', 'Living architecture (they grow buildings)', 'Alliance against shared enemies'], localReaction: 'Children are delighted. Adults are suspicious. The church is concerned about "fey influence."', plotHook: 'The assassins are already here, disguised as traveling merchants. They\'ll strike at the next full moon.', tension: 'The eladrin time-shift involuntarily — they sometimes vanish for hours. Locals think they\'re spying.' },
  { plane: 'abyss', name: 'The Unbound', race: 'Escaped tiefling slaves (30 individuals)', population: '30 adults, no children', reason: 'Former slaves of a demon lord. They broke free during a planar incursion. They are traumatized and dangerous.', needs: ['Sanctuary from extradition to the Abyss', 'Healers (physical and mental)', 'Someone to vouch for them'], offers: ['Knowledge of demon tactics and weaknesses', 'Combat skills (they survived the Abyss)', 'Undying loyalty to anyone who shows kindness'], localReaction: 'Terror. The word "demon" is enough. Mobs form. Pitchforks sharpen.', plotHook: 'The demon lord sends a retrieval squad. Not demons — lawyers. With valid extradition treaties.', tension: 'One of the refugees is still partially corrupted. They\'re hiding it. It\'s getting worse.' },
  { plane: 'mechanus', name: 'The Defectors', race: 'Rogue modrons (12 units)', population: '12 modrons of various ranks', reason: 'They gained individuality during the Great Modron March and refuse to return to the collective.', needs: ['Legal recognition as individuals', 'A workshop to maintain themselves', 'Someone to explain "feelings" to them'], offers: ['Perfect craftsmanship', 'Mathematical modeling of anything', 'They never sleep and volunteer for guard duty'], localReaction: 'Fascination from scholars. Annoyance from everyone else (they organize EVERYTHING).', plotHook: 'Mechanus sends a retrieval squad of loyal modrons. The defectors will be "reformatted" — essentially killed.', tension: 'The modrons keep "improving" things without asking. The baker\'s oven now runs on clockwork. He didn\'t want that.' },
  { plane: 'shadowfell', name: 'The Fading', race: 'Shadow-touched humans (100 people)', population: '~100, aging rapidly', reason: 'Their village was pulled into the Shadowfell 50 years ago. They just escaped, but the shadow clings to them.', needs: ['Sunlight exposure therapy (they\'re photosensitive at first)', 'Reintegration counseling (50 years of Shadowfell changes you)', 'Help reversing shadow corruption in their children'], offers: ['Shadow magic knowledge', 'Ability to see invisible and ethereal creatures', 'They remember the Shadowfell layout — invaluable intelligence'], localReaction: 'Sympathy from most. The temple offers healing. A few fear the shadow might be contagious.', plotHook: 'The shadow IS slightly contagious. Not to people — to the land. Crops near the refugee camp are dying.', tension: 'Their children were BORN in the Shadowfell. The shadow isn\'t a corruption for them — it\'s home. They want to go back.' },
];

export function getRandomRefugeeGroup(): RefugeeGroup {
  return GROUPS[Math.floor(Math.random() * GROUPS.length)];
}

export function getGroupsByPlane(plane: RefugeePlane): RefugeeGroup[] {
  return GROUPS.filter((g) => g.plane === plane);
}

export function getGroupsWithTensions(): RefugeeGroup[] {
  return GROUPS.filter((g) => g.tension.length > 0);
}

export function getAllRefugeePlanes(): RefugeePlane[] {
  return [...new Set(GROUPS.map((g) => g.plane))];
}

export function formatRefugeeGroup(group: RefugeeGroup): string {
  const icon = { feywild: '🌸', shadowfell: '🌑', elemental: '🔥', abyss: '👹', mechanus: '⚙️', astral: '🌌' }[group.plane];
  const lines = [`${icon} **${group.name}** *(${group.race})*`];
  lines.push(`  From: ${group.plane} | Population: ${group.population}`);
  lines.push(`  Reason: ${group.reason}`);
  lines.push(`  Needs: ${group.needs.join(', ')}`);
  lines.push(`  Offers: ${group.offers.join(', ')}`);
  lines.push(`  👥 Local reaction: ${group.localReaction}`);
  lines.push(`  ⚡ Tension: ${group.tension}`);
  lines.push(`  📜 Hook: ${group.plotHook}`);
  return lines.join('\n');
}

export { GROUPS as REFUGEE_GROUPS };
