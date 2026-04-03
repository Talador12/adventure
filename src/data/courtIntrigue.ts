// Court intrigue system — noble houses with power levels, alliances, scandals, and favors owed.

export type HouseDisposition = 'allied' | 'friendly' | 'neutral' | 'rival' | 'hostile';

export interface NobleHouse {
  name: string;
  motto: string;
  power: number; // 1-10
  wealth: number; // 1-10
  influence: number; // 1-10
  leader: string;
  heir: string;
  secrets: string[];
  ambition: string;
}

export interface CourtFavor {
  house: string;
  type: 'owed_to_party' | 'owed_by_party';
  magnitude: 'minor' | 'moderate' | 'major';
  description: string;
}

export interface Scandal {
  house: string;
  severity: 'rumor' | 'open_secret' | 'explosive';
  description: string;
  leverage: string; // what the party can do with this info
  discoveryDC: number;
}

export interface CourtState {
  houses: NobleHouse[];
  alliances: { house1: string; house2: string; strength: number }[];
  rivalries: { house1: string; house2: string; intensity: number }[];
  favors: CourtFavor[];
  scandals: Scandal[];
}

const NOBLE_HOUSES: NobleHouse[] = [
  { name: 'House Valerian', motto: 'Steel endures.', power: 8, wealth: 6, influence: 7, leader: 'Duke Cassian Valerian', heir: 'Lady Elara Valerian (brilliant, reckless)', secrets: ['The heir is adopted — not of noble blood.', 'The duke murdered his brother for the title.'], ambition: 'Claim the throne within 5 years.' },
  { name: 'House Ashford', motto: 'Gold speaks louder.', power: 4, wealth: 10, influence: 8, leader: 'Lord Percival Ashford III', heir: 'Percival Ashford IV (incompetent, kind)', secrets: ['Their wealth comes from a demonic pact 3 generations old.', 'The heir is secretly a talented bard living a double life.'], ambition: 'Buy a royal title. Money can purchase anything.' },
  { name: 'House Drakenmoor', motto: 'Fire and patience.', power: 9, wealth: 5, influence: 6, leader: 'Baroness Ignis Drakenmoor', heir: 'Flame (a pseudodragon — yes, literally)', secrets: ['They have a dragon egg hidden in the vault.', 'The baroness is 200 years old — something is very wrong.'], ambition: 'Awaken the dragon egg. Restore the old pact.' },
  { name: 'House Thornwall', motto: 'Roots hold.', power: 6, wealth: 4, influence: 5, leader: 'Lord Briar Thornwall', heir: 'Ivy Thornwall (druid, disillusioned with nobility)', secrets: ['The estate is built on a sealed portal to the Feywild.', 'The heir communicates with fey entities at night.'], ambition: 'Reconnect with the Feywild. Restore the old magic.' },
  { name: 'House Silvertongue', motto: 'Words are weapons.', power: 3, wealth: 7, influence: 10, leader: 'Lady Seraphina Silvertongue', heir: 'No heir (a scandal in itself)', secrets: ['Lady Seraphina is three halflings in an elaborate disguise.', 'They run the thieves guild through intermediaries.'], ambition: 'Control the flow of information. Knowledge is the only real power.' },
];

const SCANDALS: Scandal[] = [
  { house: 'House Valerian', severity: 'explosive', description: 'Duke Cassian\'s heir is not of noble blood. Adoption papers exist.', leverage: 'Reveal to delegitimize the heir, or blackmail the Duke for major favors.', discoveryDC: 16 },
  { house: 'House Ashford', severity: 'open_secret', description: 'The Ashford fortune traces to a demonic pact. Interest is coming due.', leverage: 'Threaten to expose to the Temple — or help renegotiate the pact.', discoveryDC: 13 },
  { house: 'House Drakenmoor', severity: 'rumor', description: 'The Baroness hasn\'t aged in decades. People are starting to notice.', leverage: 'Investigate her secret. Offer to keep it — for a price.', discoveryDC: 11 },
  { house: 'House Silvertongue', severity: 'explosive', description: 'Lady Seraphina is literally three halflings stacked in noble garb.', leverage: 'The ultimate blackmail. Or the ultimate comedy.', discoveryDC: 18 },
  { house: 'House Thornwall', severity: 'open_secret', description: 'The heir has been seen entering the forest alone and returning... changed.', leverage: 'Confront the heir, or help them with whatever they\'re doing in secret.', discoveryDC: 12 },
];

export function createCourtState(): CourtState {
  return {
    houses: [...NOBLE_HOUSES],
    alliances: [
      { house1: 'House Valerian', house2: 'House Thornwall', strength: 3 },
      { house1: 'House Ashford', house2: 'House Silvertongue', strength: 4 },
    ],
    rivalries: [
      { house1: 'House Valerian', house2: 'House Ashford', intensity: 4 },
      { house1: 'House Drakenmoor', house2: 'House Silvertongue', intensity: 3 },
    ],
    favors: [],
    scandals: [...SCANDALS],
  };
}

export function addFavor(state: CourtState, house: string, type: CourtFavor['type'], magnitude: CourtFavor['magnitude'], description: string): CourtState {
  return { ...state, favors: [...state.favors, { house, type, magnitude, description }] };
}

export function getHouseByName(state: CourtState, name: string): NobleHouse | undefined {
  return state.houses.find((h) => h.name === name);
}

export function getHousePower(house: NobleHouse): number {
  return Math.round((house.power + house.wealth + house.influence) / 3);
}

export function getScandalsForHouse(state: CourtState, house: string): Scandal[] {
  return state.scandals.filter((s) => s.house === house);
}

export function getFavorsForHouse(state: CourtState, house: string): CourtFavor[] {
  return state.favors.filter((f) => f.house === house);
}

export function getAllHouseNames(state: CourtState): string[] {
  return state.houses.map((h) => h.name);
}

export function formatNobleHouse(house: NobleHouse): string {
  const overall = getHousePower(house);
  const lines = [`🏰 **${house.name}** — *"${house.motto}"* (Power: ${overall}/10)`];
  lines.push(`  Leader: ${house.leader} | Heir: ${house.heir}`);
  lines.push(`  ⚔️ Military: ${house.power} | 💰 Wealth: ${house.wealth} | 🗣️ Influence: ${house.influence}`);
  lines.push(`  🎯 Ambition: ${house.ambition}`);
  return lines.join('\n');
}

export function formatCourtState(state: CourtState): string {
  const lines = ['👑 **Court Intrigue:**'];
  state.houses.forEach((h) => lines.push(formatNobleHouse(h)));
  if (state.alliances.length > 0) {
    lines.push('  **Alliances:**');
    state.alliances.forEach((a) => lines.push(`    🤝 ${a.house1} ↔ ${a.house2} (strength ${a.strength})`));
  }
  if (state.rivalries.length > 0) {
    lines.push('  **Rivalries:**');
    state.rivalries.forEach((r) => lines.push(`    ⚡ ${r.house1} vs ${r.house2} (intensity ${r.intensity})`));
  }
  return lines.join('\n');
}

export { NOBLE_HOUSES, SCANDALS };
