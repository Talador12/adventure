// Random detective case generator — crime scenes with clues, suspects, motives, and red herrings.

export type CrimeType = 'murder' | 'theft' | 'arson' | 'smuggling' | 'kidnapping' | 'fraud';

export interface Suspect {
  name: string;
  description: string;
  motive: string;
  alibi: string;
  alibiHolds: boolean;
  isGuilty: boolean;
}

export interface Clue {
  description: string;
  location: string;
  findDC: number;
  pointsTo: string; // suspect name
  isRedHerring: boolean;
}

export interface DetectiveCase {
  title: string;
  crime: CrimeType;
  victim: string;
  scene: string;
  suspects: Suspect[];
  clues: Clue[];
  twist: string;
  resolution: string;
}

const CASES: DetectiveCase[] = [
  { title: 'The Poisoned Patron', crime: 'murder', victim: 'Lord Aldric Voss, found dead at his own banquet', scene: 'The grand dining hall. 30 guests. One is a killer.', suspects: [
    { name: 'Lady Voss (wife)', description: 'Grieving — or performing grief.', motive: 'Inherits the entire estate.', alibi: 'Seated across the table all evening.', alibiHolds: true, isGuilty: false },
    { name: 'Steward Merrick', description: 'Loyal servant for 20 years. Poured the wine.', motive: 'Lord Voss was about to fire him for embezzlement.', alibi: 'In the wine cellar during the toast.', alibiHolds: false, isGuilty: true },
    { name: 'Captain Harlow', description: 'Lord Voss\'s head of guard. Recently demoted.', motive: 'Public humiliation. Demotion was unjust.', alibi: 'On patrol outside the manor.', alibiHolds: true, isGuilty: false },
  ], clues: [
    { description: 'The poison was in Lord Voss\'s personal goblet, not the wine itself.', location: 'The goblet (Investigation DC 13)', findDC: 13, pointsTo: 'Steward Merrick', isRedHerring: false },
    { description: 'Lady Voss\'s diary mentions wishing "he\'d just disappear."', location: 'Her chambers (Investigation DC 12)', findDC: 12, pointsTo: 'Lady Voss (wife)', isRedHerring: true },
    { description: 'A vial of basilisk venom in the wine cellar, hidden behind a barrel.', location: 'Wine cellar (Investigation DC 15)', findDC: 15, pointsTo: 'Steward Merrick', isRedHerring: false },
    { description: 'Captain Harlow was seen arguing with Lord Voss that morning.', location: 'Witness testimony (Persuasion DC 11)', findDC: 11, pointsTo: 'Captain Harlow', isRedHerring: true },
  ], twist: 'Merrick was also being blackmailed by a third party who provided the poison.', resolution: 'Confront Merrick with the vial evidence. He breaks and names the blackmailer.' },
  { title: 'The Vanishing Vault', crime: 'theft', victim: 'The Merchant Guild\'s treasury — 10,000gp vanished overnight', scene: 'A sealed vault with no signs of forced entry. Guards saw nothing.', suspects: [
    { name: 'Guildmaster Petra', description: 'In charge of the vault keys. Very nervous.', motive: 'Gambling debts to dangerous people.', alibi: 'At a dinner party with 20 witnesses.', alibiHolds: true, isGuilty: false },
    { name: 'Arcanus the Wizard', description: 'Guild\'s ward-setter. Knows every magical defense.', motive: 'Believes the guild stole his research.', alibi: 'In his tower all night. Alone.', alibiHolds: false, isGuilty: false },
    { name: 'Pip Shadowfoot (halfling clerk)', description: 'Has access to the vault ledgers. Unremarkable.', motive: 'Hired by a rival guild for a cut of the take.', alibi: 'Asleep in the clerk\'s quarters.', alibiHolds: false, isGuilty: true },
  ], clues: [
    { description: 'The vault\'s magical wards were bypassed, not broken. Someone had the ward keys.', location: 'Vault door (Arcana DC 14)', findDC: 14, pointsTo: 'Arcanus the Wizard', isRedHerring: true },
    { description: 'A tiny tunnel (halfling-sized) dug under the vault floor, hidden by an illusion.', location: 'Vault floor (Investigation DC 16)', findDC: 16, pointsTo: 'Pip Shadowfoot (halfling clerk)', isRedHerring: false },
    { description: 'Pip\'s ledger entries show creative accounting — money was siphoned slowly over months.', location: 'Guild records (Investigation DC 14)', findDC: 14, pointsTo: 'Pip Shadowfoot (halfling clerk)', isRedHerring: false },
    { description: 'Guildmaster Petra\'s gambling debts are real, but she was paying them off legitimately.', location: 'Petra\'s personal records (Persuasion DC 13)', findDC: 13, pointsTo: 'Guildmaster Petra', isRedHerring: true },
  ], twist: 'The 10,000gp "theft" was a mix — Pip stole 3,000gp; the rest was accounting fraud by a previous guildmaster years ago.', resolution: 'Find the tunnel, match the dirt on Pip\'s boots, and present the doctored ledgers.' },
  { title: 'The Burning Question', crime: 'arson', victim: 'The Temple of Solara — burned to the ground during evening prayers', scene: 'Ashes and rubble. The congregation escaped, barely. The sacred flame is extinguished.', suspects: [
    { name: 'Brother Cael (acolyte)', description: 'Was supposed to tend the sacred flame that night. Wasn\'t there.', motive: 'Lost his faith. Bitter about years wasted in service.', alibi: 'Says he was at a tavern. One witness confirms, but is drunk.', alibiHolds: false, isGuilty: false },
    { name: 'Vex cultist (disguised)', description: 'A storm god cultist who infiltrated as a worshipper.', motive: 'Vex\'s followers want Solara\'s influence weakened.', alibi: 'None — vanished after the fire.', alibiHolds: false, isGuilty: true },
    { name: 'Contractor Bram', description: 'Did recent renovation work. Had access to the structure.', motive: 'Insurance fraud — the temple owed him money.', alibi: 'Home with family.', alibiHolds: true, isGuilty: false },
  ], clues: [
    { description: 'The fire started in three places simultaneously. Not accidental.', location: 'Burn patterns (Investigation DC 12)', findDC: 12, pointsTo: 'Vex cultist (disguised)', isRedHerring: false },
    { description: 'A Vex holy symbol melted into the rubble near the altar.', location: 'Altar area (Perception DC 14)', findDC: 14, pointsTo: 'Vex cultist (disguised)', isRedHerring: false },
    { description: 'Brother Cael\'s quarters have angry letters about the temple.', location: 'Acolyte quarters (Investigation DC 11)', findDC: 11, pointsTo: 'Brother Cael (acolyte)', isRedHerring: true },
  ], twist: 'The cultist is still in town, posing as a concerned citizen helping with rebuilding.', resolution: 'Identify the Vex symbol. Cast Detect Evil or observe the "volunteer" — they flinch at Solara\'s prayers.' },
];

export function getRandomCase(): DetectiveCase {
  return CASES[Math.floor(Math.random() * CASES.length)];
}

export function getCasesByCrime(crime: CrimeType): DetectiveCase[] {
  return CASES.filter((c) => c.crime === crime);
}

export function getGuiltyParty(caseData: DetectiveCase): Suspect {
  return caseData.suspects.find((s) => s.isGuilty)!;
}

export function getRealClues(caseData: DetectiveCase): Clue[] {
  return caseData.clues.filter((c) => !c.isRedHerring);
}

export function getRedHerrings(caseData: DetectiveCase): Clue[] {
  return caseData.clues.filter((c) => c.isRedHerring);
}

export function formatCase(caseData: DetectiveCase, showSolution: boolean = false): string {
  const icon = { murder: '💀', theft: '💰', arson: '🔥', smuggling: '📦', kidnapping: '🔗', fraud: '📝' }[caseData.crime];
  const lines = [`${icon} **${caseData.title}** *(${caseData.crime})*`];
  lines.push(`  Victim: ${caseData.victim}`);
  lines.push(`  Scene: ${caseData.scene}`);
  lines.push(`  Suspects: ${caseData.suspects.map((s) => s.name).join(', ')}`);
  lines.push(`  Clues: ${caseData.clues.length} (${getRedHerrings(caseData).length} red herrings)`);
  if (showSolution) { lines.push(`  🔍 Guilty: ${getGuiltyParty(caseData).name}`); lines.push(`  🔄 Twist: ${caseData.twist}`); }
  return lines.join('\n');
}

export { CASES as DETECTIVE_CASES };
