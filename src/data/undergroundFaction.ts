// Underground faction generator — competing criminal/political organizations with influence maps.

export type FactionSpecialty = 'theft' | 'smuggling' | 'assassination' | 'information' | 'protection' | 'counterfeiting';

export interface UndergroundFaction {
  name: string;
  specialty: FactionSpecialty;
  leader: string;
  influence: number; // 1-10
  territory: string[];
  resources: string;
  weakness: string;
  recruitmentMethod: string;
  playerRelation: 'unknown' | 'aware' | 'interested' | 'hostile';
  signalPhrase: string; // how members identify each other
}

const FACTIONS: UndergroundFaction[] = [
  { name: 'The Velvet Hand', specialty: 'theft', leader: 'The Curator (identity unknown — communicates via art)', influence: 7, territory: ['Noble Quarter', 'Museum District', 'Auction Houses'], resources: 'Master forgers, tunnel network under the city, corrupt art dealers.', weakness: 'The Curator\'s identity. Find them, end the organization.', recruitmentMethod: 'Leave an impossible theft at a specific pawn shop. If they\'re impressed, they find you.', playerRelation: 'unknown', signalPhrase: '"The exhibition was exquisite."' },
  { name: 'The Salt Runners', specialty: 'smuggling', leader: 'Captain Brine (operates from a mobile ship)', influence: 6, territory: ['Docks', 'Harbor Warehouses', 'Coastal Caves'], resources: 'Fleet of small fast boats, bribed harbor officials, hidden coves.', weakness: 'Dependent on the harbor master\'s cooperation. Turn him, and they\'re exposed.', recruitmentMethod: 'Deliver a sealed package to the docks without asking questions. Successfully.', playerRelation: 'unknown', signalPhrase: '"The tide is favorable."' },
  { name: 'The Red Ledger', specialty: 'information', leader: 'The Accountant (a halfling who never forgets a number)', influence: 8, territory: ['Every tavern', 'The banking district', 'City Hall'], resources: 'Blackmail files on everyone, an army of spies disguised as servants.', weakness: 'The Ledger itself — a physical book of secrets. Destroy it, break their power.', recruitmentMethod: 'Already watching you. If you have information they want, they\'ll approach.', playerRelation: 'aware', signalPhrase: '"I\'d like to review the accounts."' },
  { name: 'The Hollow Men', specialty: 'assassination', leader: 'Nobody (literal name — an undead who speaks through corpses)', influence: 5, territory: ['Graveyards', 'Abandoned buildings', 'The sewers'], resources: 'Undead agents that can\'t be interrogated, poisons, access to the catacombs.', weakness: 'Nobody\'s phylactery is hidden somewhere in the catacombs. Destroy it.', recruitmentMethod: 'Die. Get resurrected. If you come back, they consider you kin.', playerRelation: 'unknown', signalPhrase: '"Death is merely a career change."' },
  { name: 'The Iron Circle', specialty: 'protection', leader: 'Mother Iron (a retired gladiator who runs a "security firm")', influence: 7, territory: ['Market District', 'Craft Quarter', 'Entertainment District'], resources: 'Hundreds of enforcers, legitimate business fronts, legal representation.', weakness: 'Mother Iron genuinely cares about the neighborhood. Threaten innocents, she breaks ranks.', recruitmentMethod: 'Get beaten up in their territory. If you don\'t fight back, they respect you. If you win, they recruit you.', playerRelation: 'unknown', signalPhrase: '"Iron bends but never breaks."' },
];

export function getRandomFaction(): UndergroundFaction {
  return FACTIONS[Math.floor(Math.random() * FACTIONS.length)];
}

export function getFactionsBySpecialty(specialty: FactionSpecialty): UndergroundFaction[] {
  return FACTIONS.filter((f) => f.specialty === specialty);
}

export function getFactionByTerritory(territory: string): UndergroundFaction[] {
  return FACTIONS.filter((f) => f.territory.some((t) => t.toLowerCase().includes(territory.toLowerCase())));
}

export function getMostInfluential(): UndergroundFaction {
  return FACTIONS.reduce((max, f) => (f.influence > max.influence ? f : max));
}

export function getAllSpecialties(): FactionSpecialty[] {
  return [...new Set(FACTIONS.map((f) => f.specialty))];
}

export function formatFaction(faction: UndergroundFaction): string {
  const icon = { theft: '🗝️', smuggling: '📦', assassination: '🗡️', information: '🔍', protection: '🛡️', counterfeiting: '💰' }[faction.specialty];
  const lines = [`${icon} **${faction.name}** *(${faction.specialty}, influence ${faction.influence}/10)*`];
  lines.push(`  Leader: ${faction.leader}`);
  lines.push(`  Territory: ${faction.territory.join(', ')}`);
  lines.push(`  Resources: ${faction.resources}`);
  lines.push(`  ⚡ Weakness: ${faction.weakness}`);
  lines.push(`  🤝 Signal: "${faction.signalPhrase}"`);
  return lines.join('\n');
}

export { FACTIONS as UNDERGROUND_FACTIONS };
