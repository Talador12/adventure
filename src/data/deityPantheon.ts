// Deity pantheon builder — gods with domains, holy symbols, commandments, and inter-deity rivalries.

export type DivineDomain = 'life' | 'death' | 'war' | 'knowledge' | 'nature' | 'tempest' | 'trickery' | 'light' | 'forge' | 'grave';
export type DeityAlignment = 'LG' | 'NG' | 'CG' | 'LN' | 'N' | 'CN' | 'LE' | 'NE' | 'CE';

export interface Deity {
  name: string;
  title: string;
  domains: DivineDomain[];
  alignment: DeityAlignment;
  holySymbol: string;
  commandments: string[];
  blessingEffect: string;
  wrathEffect: string;
  rivals: string[];
  allies: string[];
  worshippers: string;
}

const PANTHEON: Deity[] = [
  { name: 'Solara', title: 'The Dawnmother', domains: ['life', 'light'], alignment: 'NG', holySymbol: 'A golden sun with an open eye at center', commandments: ['Bring light to dark places.', 'Heal before you harm.', 'Never abandon the hopeless.'], blessingEffect: 'Healing spells restore maximum HP for 24 hours.', wrathEffect: 'Radiant burns on liars (1d4 radiant when deliberately deceiving).', rivals: ['Morthain'], allies: ['Aelindra', 'Korrath'], worshippers: 'Clerics, healers, farmers, mothers.' },
  { name: 'Morthain', title: 'The Gravewarden', domains: ['death', 'grave'], alignment: 'LN', holySymbol: 'A balanced scale with a skull on one side and a feather on the other', commandments: ['Death is not evil — it is necessary.', 'Undeath is an abomination. Destroy it.', 'Guide the dying with compassion.'], blessingEffect: 'Speak with Dead once per day without material components.', wrathEffect: 'Nightmares that prevent long rest benefits for 1d4 days.', rivals: ['Solara'], allies: ['Korrath'], worshippers: 'Gravediggers, morticians, paladins of the grave.' },
  { name: 'Korrath', title: 'The Iron Judge', domains: ['war', 'forge'], alignment: 'LG', holySymbol: 'A warhammer crossed with a gavel', commandments: ['Fight with honor or not at all.', 'Protect the weak with strength.', 'A weapon is a tool of justice, not cruelty.'], blessingEffect: '+1 to attack rolls for 24 hours.', wrathEffect: 'Weapon shatters on next critical failure.', rivals: ['Vex'], allies: ['Solara', 'Morthain'], worshippers: 'Soldiers, smiths, judges, paladins.' },
  { name: 'Aelindra', title: 'The Whispered Word', domains: ['knowledge', 'trickery'], alignment: 'CN', holySymbol: 'A closed book with a lock shaped like a smiling face', commandments: ['Knowledge should be free — steal it if necessary.', 'Never destroy a book.', 'The best trick is one the victim thanks you for.'], blessingEffect: 'Advantage on Investigation checks for 24 hours.', wrathEffect: 'Forget one important piece of information (DM chooses).', rivals: ['Korrath'], allies: ['Solara', 'Vex'], worshippers: 'Scholars, rogues, bards, spies.' },
  { name: 'Vex', title: 'The Storm Lord', domains: ['tempest', 'war'], alignment: 'CE', holySymbol: 'A lightning bolt shattering a crown', commandments: ['Strength is the only law.', 'Destroy what is stagnant.', 'Fear nothing — make others fear you.'], blessingEffect: 'Lightning damage +1d6 for 24 hours.', wrathEffect: 'Struck by lightning (4d6, no save) during next storm.', rivals: ['Korrath', 'Solara'], allies: ['Aelindra'], worshippers: 'Pirates, barbarians, revolutionaries.' },
  { name: 'Verdania', title: 'The Green Mother', domains: ['nature', 'life'], alignment: 'N', holySymbol: 'An oak tree with roots shaped like hands', commandments: ['Protect the wild places.', 'Take only what you need.', 'The cycle of life must not be broken.'], blessingEffect: 'Goodberry produces double berries for 24 hours.', wrathEffect: 'Plants refuse to grow within 30ft of you for 1 month.', rivals: ['Vex'], allies: ['Morthain'], worshippers: 'Druids, rangers, farmers, herbalists.' },
];

export function getDeity(name: string): Deity | undefined {
  return PANTHEON.find((d) => d.name === name);
}

export function getDeityByDomain(domain: DivineDomain): Deity[] {
  return PANTHEON.filter((d) => d.domains.includes(domain));
}

export function getRivals(deityName: string): Deity[] {
  const deity = getDeity(deityName);
  if (!deity) return [];
  return deity.rivals.map((r) => getDeity(r)).filter(Boolean) as Deity[];
}

export function getAllies(deityName: string): Deity[] {
  const deity = getDeity(deityName);
  if (!deity) return [];
  return deity.allies.map((a) => getDeity(a)).filter(Boolean) as Deity[];
}

export function getAllDomains(): DivineDomain[] {
  return [...new Set(PANTHEON.flatMap((d) => d.domains))];
}

export function formatDeity(deity: Deity): string {
  const lines = [`⛪ **${deity.name}, ${deity.title}** *(${deity.alignment})*`];
  lines.push(`  Domains: ${deity.domains.join(', ')} | Symbol: ${deity.holySymbol}`);
  lines.push('  Commandments:');
  deity.commandments.forEach((c) => lines.push(`    📜 ${c}`));
  lines.push(`  ✨ Blessing: ${deity.blessingEffect}`);
  lines.push(`  ⚡ Wrath: ${deity.wrathEffect}`);
  if (deity.rivals.length > 0) lines.push(`  ⚔️ Rivals: ${deity.rivals.join(', ')}`);
  if (deity.allies.length > 0) lines.push(`  🤝 Allies: ${deity.allies.join(', ')}`);
  return lines.join('\n');
}

export { PANTHEON };
