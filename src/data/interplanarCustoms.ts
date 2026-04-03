// Random interplanar customs office — bureaucratic plane-crossing with paperwork and inspections.

export type CustomsDisposition = 'friendly' | 'by_the_book' | 'corrupt' | 'paranoid' | 'bored';

export interface CustomsOfficer { name: string; race: string; disposition: CustomsDisposition; bribeThreshold: number | null; quirk: string; }
export interface ProhibitedItem { item: string; reason: string; confiscationChance: number; fine: number; }
export interface CustomsForm { name: string; purpose: string; absurdity: string; }

export interface InterplanarCustomsOffice {
  planeName: string;
  officeName: string;
  officers: CustomsOfficer[];
  prohibitedItems: ProhibitedItem[];
  requiredForms: CustomsForm[];
  waitTime: string;
  bribeCulture: string;
  plotHook: string;
}

const OFFICES: InterplanarCustomsOffice[] = [
  { planeName: 'Mechanus', officeName: 'The Bureau of Planar Transit Authority', officers: [
    { name: 'Assessor Unit 7742', race: 'Modron', disposition: 'by_the_book', bribeThreshold: null, quirk: 'Stamps everything exactly 3 times. Will re-stamp if interrupted.' },
    { name: 'Inspector Cog', race: 'Modron (malfunctioning)', disposition: 'paranoid', bribeThreshold: null, quirk: 'Convinced smugglers have infiltrated the queue. Searches everyone twice.' },
  ], prohibitedItems: [
    { item: 'Anything chaotic', reason: 'Chaotic energy disrupts local geometry.', confiscationChance: 100, fine: 0 },
    { item: 'Jokes', reason: 'Humor is not recognized as a valid communication form.', confiscationChance: 50, fine: 10 },
    { item: 'Unpaired socks', reason: 'Asymmetry violation.', confiscationChance: 100, fine: 5 },
  ], requiredForms: [
    { name: 'Form A-001: Declaration of Planar Origin', purpose: 'Prove where you\'re from.', absurdity: 'Must be filled out in triplicate. With a quill. The quill is provided but doesn\'t work.' },
    { name: 'Form B-017: Intention of Visit', purpose: 'State why you\'re here.', absurdity: '"Tourism" is not a recognized category. Neither is "saving the world."' },
    { name: 'Form C-042: Inventory Declaration', purpose: 'List every item you carry.', absurdity: 'Includes a question about the philosophical nature of ownership.' },
  ], waitTime: '2d4 hours (everything is precise but slow)', bribeCulture: 'Impossible. Modrons do not understand the concept of bribery.', plotHook: 'A modron in the queue is trying to defect. It\'s asking you for help in perfect monotone.' },
  { planeName: 'Nine Hells', officeName: 'Infernal Immigration & Revenue Services', officers: [
    { name: 'Director Malphas', race: 'Imp (in a tiny suit)', disposition: 'corrupt', bribeThreshold: 50, quirk: 'Stamps your form upside down "accidentally" to cause delays. Fixed with a bribe.' },
    { name: 'Auditor Raziel', race: 'Erinyes', disposition: 'by_the_book', bribeThreshold: null, quirk: 'Reads every contract aloud. Including the fine print. Especially the fine print.' },
  ], prohibitedItems: [
    { item: 'Holy water', reason: 'Classified as a weapon of mass destruction.', confiscationChance: 100, fine: 500 },
    { item: 'Freedom', reason: 'Concept not recognized in this jurisdiction.', confiscationChance: 0, fine: 0 },
    { item: 'Unsigned soul contracts', reason: 'Must be pre-approved by a registered devil.', confiscationChance: 75, fine: 100 },
  ], requiredForms: [
    { name: 'Form 666-A: Soul Verification', purpose: 'Confirm your soul belongs to you (for now).', absurdity: 'The form itself is a minor contract. Reading it binds you to nothing. Signing it, however...' },
    { name: 'Form 666-B: Liability Waiver', purpose: 'The Hells are not responsible for anything that happens to you.', absurdity: '47 pages. Clause 31 signs away your right to complain about temperature.' },
  ], waitTime: '1d6 hours (longer if they smell weakness)', bribeCulture: 'Expected. Budgeted. The bribe IS the system. Not paying is suspicious.', plotHook: 'Someone in the queue is trying to smuggle a soul OUT of Hell. They need a distraction.' },
  { planeName: 'Feywild', officeName: 'The Whimsical Welcome Committee', officers: [
    { name: 'Welcome Sprite Glistenings', race: 'Sprite', disposition: 'friendly', bribeThreshold: null, quirk: 'Gives everyone a flower. The flower is mildly sentient and judges you.' },
    { name: 'Passport Pixie Thistledown', race: 'Pixie', disposition: 'bored', bribeThreshold: 0, quirk: 'Stamps passports with invisible ink. You have to BELIEVE it\'s stamped.' },
  ], prohibitedItems: [
    { item: 'Iron', reason: 'Toxic to fey. Even iron nails in your boots.', confiscationChance: 100, fine: 0 },
    { item: 'Clocks', reason: 'Time is not welcome here.', confiscationChance: 100, fine: 0 },
    { item: 'Bad attitudes', reason: 'CHA DC 12 or the border closes.', confiscationChance: 0, fine: 0 },
  ], requiredForms: [
    { name: 'The Question: "What do you value most?"', purpose: 'The answer determines where in the Feywild you arrive.', absurdity: 'Answer honestly and you arrive somewhere beautiful. Lie and you arrive somewhere educational.' },
  ], waitTime: 'Instant (if the fey like you) or 1d4 days (if they don\'t)', bribeCulture: 'Bribes work but must be creative. Gold is boring. A song, a secret, or a dance gets you through faster.', plotHook: 'A mortal child is at the border, trying to return home. They\'ve been here for what they think is an afternoon. It\'s been 40 years.' },
];

export function getRandomCustomsOffice(): InterplanarCustomsOffice {
  return OFFICES[Math.floor(Math.random() * OFFICES.length)];
}

export function getOfficeByPlane(plane: string): InterplanarCustomsOffice | undefined {
  return OFFICES.find((o) => o.planeName.toLowerCase().includes(plane.toLowerCase()));
}

export function getCorruptOfficers(office: InterplanarCustomsOffice): CustomsOfficer[] {
  return office.officers.filter((o) => o.bribeThreshold !== null);
}

export function getTotalFormCount(office: InterplanarCustomsOffice): number {
  return office.requiredForms.length;
}

export function formatCustomsOffice(office: InterplanarCustomsOffice): string {
  const lines = [`🛂 **${office.officeName}** *(${office.planeName})*`];
  lines.push(`  Wait time: ${office.waitTime}`);
  lines.push(`  Bribe culture: ${office.bribeCulture}`);
  lines.push('  **Officers:**');
  office.officers.forEach((o) => lines.push(`    👤 ${o.name} (${o.race}, ${o.disposition}) — ${o.quirk}`));
  lines.push('  **Prohibited:**');
  office.prohibitedItems.forEach((i) => lines.push(`    🚫 ${i.item}: ${i.reason}`));
  lines.push(`  📜 Hook: ${office.plotHook}`);
  return lines.join('\n');
}

export { OFFICES as CUSTOMS_OFFICES };
