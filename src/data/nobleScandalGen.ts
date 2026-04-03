// Random noble scandal — political gossip with blackmail potential and social consequences.

export type ScandalType = 'affair' | 'embezzlement' | 'illegitimate_heir' | 'secret_alliance' | 'forbidden_magic' | 'criminal_ties';

export interface NobleScandalEntry {
  title: string;
  type: ScandalType;
  house: string;
  description: string;
  evidence: string;
  evidenceFindDC: number;
  blackmailValue: number;
  exposureConsequence: string;
  coverUpCost: string;
  involvedParties: string[];
}

const SCANDALS: NobleScandalEntry[] = [
  { title: 'The Midnight Tryst', type: 'affair', house: 'House Ashford', description: 'Lady Ashford is having an affair with the captain of the rival house\'s guard.', evidence: 'Love letters hidden in a hollowed book in the library.', evidenceFindDC: 14, blackmailValue: 500, exposureConsequence: 'Divorce. House Ashford loses its military alliance. The captain is executed.', coverUpCost: '200gp and a promise of silence', involvedParties: ['Lady Ashford', 'Captain Dren of House Valerian'] },
  { title: 'The Missing Millions', type: 'embezzlement', house: 'House Thornwall', description: 'The house steward has been skimming gold for 10 years. 50,000gp is unaccounted for.', evidence: 'Doctored ledgers. The real books are in a locked safe (DC 16 to crack).', evidenceFindDC: 15, blackmailValue: 2000, exposureConsequence: 'The steward is arrested. House Thornwall\'s finances collapse. Creditors circle.', coverUpCost: 'The steward "retires" and the missing gold is written off as bad investments.', involvedParties: ['Steward Corbin', 'Lord Thornwall (who suspects but ignores it)'] },
  { title: 'The Wrong Blood', type: 'illegitimate_heir', house: 'House Valerian', description: 'The heir is adopted. There is no Valerian blood in them at all. The real heir died as an infant.', evidence: 'Adoption papers in the family vault. A midwife in the countryside knows the truth.', evidenceFindDC: 16, blackmailValue: 5000, exposureConsequence: 'The heir is disinherited. Succession crisis. Civil war within the house.', coverUpCost: 'Kill the midwife and destroy the papers. Cost: one soul.', involvedParties: ['Duke Valerian', 'The heir (who doesn\'t know)', 'The midwife'] },
  { title: 'The Demon Deal', type: 'forbidden_magic', house: 'House Drakenmoor', description: 'The baroness isn\'t aging because of a pact with a devil. The price comes due every 50 years.', evidence: 'An infernal contract hidden in the vault. Written in Infernal.', evidenceFindDC: 17, blackmailValue: 3000, exposureConsequence: 'The temple demands her arrest. The house is dissolved. The devil collects early.', coverUpCost: 'Renegotiate the contract (favor from a powerful being) or silence all who know.', involvedParties: ['Baroness Drakenmoor', 'Azmodiel (the devil)', 'The butler (who has served for 200 years)'] },
  { title: 'The Shadow Partners', type: 'criminal_ties', house: 'House Silvertongue', description: 'Lady Silvertongue doesn\'t just know the thieves guild — she RUNS it through intermediaries.', evidence: 'Coded messages between the Lady and the guild master. The cipher is her own poetry.', evidenceFindDC: 18, blackmailValue: 4000, exposureConsequence: 'Arrest. The guild scatters. Crime in the city actually gets WORSE without her organizing it.', coverUpCost: 'The party becomes complicit. A favor owed to the thieves guild.', involvedParties: ['Lady Silvertongue', 'The guild\'s second-in-command', 'Three city council members who benefit'] },
  { title: 'The Forbidden Alliance', type: 'secret_alliance', house: 'House Ashford & House Drakenmoor', description: 'Two houses publicly at odds are secretly cooperating to destroy House Valerian.', evidence: 'A sealed letter delivered by a shared spy. Interceptable with Sleight of Hand DC 15.', evidenceFindDC: 15, blackmailValue: 3000, exposureConsequence: 'Both houses are disgraced. Valerian gains the upper hand. The spy is hunted.', coverUpCost: 'Join the conspiracy or be silenced.', involvedParties: ['Lord Ashford', 'Baroness Drakenmoor', 'The shared spy (a seemingly harmless bard)'] },
];

export function getRandomScandal(): NobleScandalEntry {
  return SCANDALS[Math.floor(Math.random() * SCANDALS.length)];
}

export function getScandalsByType(type: ScandalType): NobleScandalEntry[] {
  return SCANDALS.filter((s) => s.type === type);
}

export function getScandalsByHouse(house: string): NobleScandalEntry[] {
  return SCANDALS.filter((s) => s.house.toLowerCase().includes(house.toLowerCase()));
}

export function getHighValueScandals(minValue: number): NobleScandalEntry[] {
  return SCANDALS.filter((s) => s.blackmailValue >= minValue);
}

export function getAllScandalTypes(): ScandalType[] {
  return [...new Set(SCANDALS.map((s) => s.type))];
}

export function formatScandal(scandal: NobleScandalEntry, showEvidence: boolean = false): string {
  const icon = { affair: '💋', embezzlement: '💰', illegitimate_heir: '👶', secret_alliance: '🤝', forbidden_magic: '🔮', criminal_ties: '🗡️' }[scandal.type];
  const lines = [`${icon} **${scandal.title}** *(${scandal.house})*`];
  lines.push(`  *${scandal.description}*`);
  lines.push(`  Blackmail value: ${scandal.blackmailValue}gp`);
  if (showEvidence) { lines.push(`  🔍 Evidence: ${scandal.evidence} (DC ${scandal.evidenceFindDC})`); lines.push(`  💥 If exposed: ${scandal.exposureConsequence}`); }
  lines.push(`  Involved: ${scandal.involvedParties.join(', ')}`);
  return lines.join('\n');
}

export { SCANDALS as NOBLE_SCANDALS };
