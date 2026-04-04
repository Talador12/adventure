// Random monster alliance — unlikely creature team-ups that create unexpected encounters.

export type AllianceReason = 'mutual_enemy' | 'symbiosis' | 'coercion' | 'accident' | 'shared_territory' | 'worship';

export interface MonsterAlliance {
  name: string;
  creature1: string;
  creature2: string;
  reason: AllianceReason;
  description: string;
  combinedTactic: string;
  combinedCR: string;
  weakness: string;
  partyApproach: string;
  plotHook: string;
}

const ALLIANCES: MonsterAlliance[] = [
  { name: 'The Unlikely Shepherds', creature1: 'Troll', creature2: 'Pixie Swarm', reason: 'symbiosis', description: 'The pixies keep the troll\'s wounds clean and guide it to food. The troll protects the pixies from predators. They\'re genuinely friends.', combinedTactic: 'Pixies harass with invisibility and illusions while the troll regenerates and charges.', combinedCR: 'CR 7 (troll CR 5 + pixie support makes it much harder)', weakness: 'Fire stops the troll\'s regeneration AND scares the pixies. Two-for-one.', partyApproach: 'Negotiate with the pixies (Persuasion DC 12). They\'re reasonable. The troll listens to them.', plotHook: 'A village is paying tribute to "the forest monster." It\'s actually a healthcare arrangement.' },
  { name: 'The Bone Chorus', creature1: 'Necromancer (human)', creature2: 'Beholder', reason: 'coercion', description: 'The beholder keeps the necromancer alive (barely) to raise undead servants. The necromancer is a terrified prisoner pretending to be an ally.', combinedTactic: 'Beholder\'s antimagic cone + undead horde that doesn\'t need magic to function.', combinedCR: 'CR 15 (Beholder CR 13 + undead army + necromancer support)', weakness: 'Free the necromancer. They will HAPPILY betray the beholder. They have been waiting years for this.', partyApproach: 'Sneak a message to the necromancer during the fight. They\'ll switch sides mid-combat.', plotHook: 'Missing persons trail leads to the beholder\'s lair. The necromancer has been sending coded cries for help in the undead\'s marching patterns.' },
  { name: 'The Pest Controllers', creature1: 'Giant Spiders (colony)', creature2: 'Kobold Tribe', reason: 'mutual_enemy', description: 'The kobolds are terrified of the spiders but MORE terrified of the dragon that moved in nearby. The spiders eat anything the dragon sends their way.', combinedTactic: 'Kobold traps + spider webs = a labyrinth of death. Tucker\'s Kobolds meets Shelob.', combinedCR: 'CR 5 (individually weak, environmentally devastating)', weakness: 'The alliance is fragile. Loud noises scare the kobolds. Fire scares the spiders. Both at once = full retreat.', partyApproach: 'Offer to deal with the dragon. Both the kobolds and spiders would rather you do it than them.', plotHook: 'A trade route through the cave is completely blocked. The alliance doesn\'t want to fight — they want the party to kill the dragon.' },
  { name: 'The Diplomatic Incident', creature1: 'Mimic (enormous, building-sized)', creature2: 'Goblin merchants (living inside)', reason: 'accident', description: 'Goblins set up shop inside what they thought was an abandoned building. It\'s a building-sized mimic. The mimic likes the company. The goblins don\'t know.', combinedTactic: 'The "building" moves when threatened. The goblins defend from the windows. The mimic\'s tongue attacks from the door.', combinedCR: 'CR 8 (building mimic CR 5 + armed goblin garrison CR 3)', weakness: 'Tell the goblins they live inside a monster. 50% chance they panic and flee. 50% chance they say "we know, it\'s great rent."', partyApproach: 'Shop at the store first. The goblins have great prices. The mimic is polite if you don\'t threaten its tenants.', plotHook: 'A traveling merchant guild is confused by a competing store that keeps appearing in different locations overnight.' },
  { name: 'The Sacred Bond', creature1: 'Young Dragon (copper)', creature2: 'Treant', reason: 'worship', description: 'The dragon thinks the treant is its parent (it hatched in the treant\'s branches). The treant raised it. The dragon tells jokes. The treant wishes it wouldn\'t.', combinedTactic: 'Dragon breath from the air + treant control of the entire forest floor. Good luck fighting in THEIR forest.', combinedCR: 'CR 10 (young copper dragon CR 7 + treant CR 9 but they\'re not hostile unless provoked)', weakness: 'They\'re not evil. At all. Don\'t attack them. Seriously. You\'re the bad guy if you attack a dragon raised by a tree.', partyApproach: 'Ask for help. They\'re actually nice. The dragon wants adventurer friends. The treant wants the dragon to stop burning things.', plotHook: 'A lumber company wants to clear-cut the forest. The treant and dragon said no. Violently. The lumber company hired you.' },
];

export function getRandomAlliance(): MonsterAlliance {
  return ALLIANCES[Math.floor(Math.random() * ALLIANCES.length)];
}

export function getAlliancesByReason(reason: AllianceReason): MonsterAlliance[] {
  return ALLIANCES.filter((a) => a.reason === reason);
}

export function getAllAllianceReasons(): AllianceReason[] {
  return [...new Set(ALLIANCES.map((a) => a.reason))];
}

export function formatAlliance(alliance: MonsterAlliance): string {
  const lines = [`🤝 **${alliance.name}** *(${alliance.creature1} + ${alliance.creature2})*`];
  lines.push(`  Reason: ${alliance.reason.replace(/_/g, ' ')} — *${alliance.description}*`);
  lines.push(`  ⚔️ Combined: ${alliance.combinedTactic} (${alliance.combinedCR})`);
  lines.push(`  ⚡ Weakness: ${alliance.weakness}`);
  lines.push(`  🎯 Approach: ${alliance.partyApproach}`);
  lines.push(`  📜 Hook: ${alliance.plotHook}`);
  return lines.join('\n');
}

export { ALLIANCES as MONSTER_ALLIANCES };
