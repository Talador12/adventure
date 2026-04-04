// Magical courtroom drama — arcane legal proceedings with evidence, witnesses, and objections.

export type CaseType = 'criminal' | 'civil' | 'arcane_malpractice' | 'divine_dispute' | 'contract_breach';
export type ObjectionType = 'relevance' | 'hearsay' | 'magical_coercion' | 'divine_bias' | 'speculation';

export interface CourtCase {
  title: string;
  type: CaseType;
  plaintiff: string;
  defendant: string;
  charge: string;
  judge: string;
  evidence: { item: string; strength: number; presentDC: number }[];
  witnesses: { name: string; testimony: string; credibility: number; crossExamDC: number }[];
  validObjections: ObjectionType[];
  twist: string;
  partyRole: string;
  verdictOptions: { verdict: string; consequence: string }[];
}

const CASES: CourtCase[] = [
  { title: 'The Crown v. Thornwall (Unlawful Enchantment)', type: 'arcane_malpractice', plaintiff: 'The Crown', defendant: 'Wizard Elara Thornwall', charge: 'Enchanting a noble\'s guard dog to speak. The dog has opinions. The noble wants it to stop.', judge: 'Magistrate Ironhelm — a dwarf who doesn\'t understand magic and doesn\'t want to.', evidence: [
    { item: 'The talking dog (Exhibit A)', strength: 9, presentDC: 10 },
    { item: 'Thornwall\'s spellbook with the enchantment notes', strength: 7, presentDC: 12 },
    { item: 'The dog\'s testimony (it wants to keep talking)', strength: 5, presentDC: 14 },
  ], witnesses: [
    { name: 'The Dog (Sir Barksalot)', testimony: '"I have THOUGHTS now. You can\'t take that away. Also, the cook is stealing silver."', credibility: 4, crossExamDC: 11 },
    { name: 'The Noble', testimony: '"It told my wife what I said about her mother. I want it fixed."', credibility: 7, crossExamDC: 13 },
    { name: 'Professor Quill (magical ethics)', testimony: '"Technically the enchantment is reversible. But morally? The dog is sentient now."', credibility: 8, crossExamDC: 15 },
  ], validObjections: ['relevance', 'magical_coercion'], twist: 'The dog reveals during testimony that it witnessed the noble committing tax fraud. The trial becomes two trials.', partyRole: 'Defense attorneys for Thornwall. Or prosecution. Or the dog\'s legal representation (unprecedented).', verdictOptions: [
    { verdict: 'Guilty — enchantment reversed', consequence: 'The dog loses its speech. It remembers being sentient. It howls for weeks.' },
    { verdict: 'Not guilty — dog keeps speech', consequence: 'Legal precedent: enchanted animals have rights. Chaos. Every wizard\'s familiar gets a lawyer.' },
    { verdict: 'Mistrial — the dog thing exposes the noble', consequence: 'Noble arrested. Thornwall freed. The dog gets a medal. Everyone is confused.' },
  ] },
  { title: 'Azmodiel v. Grimshaw (Infernal Contract Breach)', type: 'contract_breach', plaintiff: 'Azmodiel, Duke of the Seventh Circle', defendant: 'Warlock Grimshaw', charge: 'Failure to deliver the agreed-upon souls. Grimshaw claims the contract is unconscionable.', judge: 'The Arbiter — an angel assigned to adjudicate infernal-mortal disputes. Hates this assignment.', evidence: [
    { item: 'The original contract (in Infernal, 47 pages)', strength: 9, presentDC: 16 },
    { item: 'Grimshaw\'s soul ledger (shows 0 of 10 souls delivered)', strength: 8, presentDC: 12 },
    { item: 'A testimony from a rescued would-be soul victim', strength: 6, presentDC: 14 },
  ], witnesses: [
    { name: 'Azmodiel (via sending stone)', testimony: '"The contract is clear. Page 31, clause 7, subsection B. Shall I read it? It will take 3 hours."', credibility: 6, crossExamDC: 18 },
    { name: 'Grimshaw', testimony: '"I was 19! He offered me power! Who reads 47 pages at 19?!"', credibility: 7, crossExamDC: 12 },
    { name: 'Contract Law Expert', testimony: '"Technically valid. Morally repugnant. Legally binding. I hate my job."', credibility: 9, crossExamDC: 14 },
  ], validObjections: ['divine_bias', 'magical_coercion', 'relevance'], twist: 'Page 47 has a clause the devil forgot: if the warlock performs a genuine act of selflessness, the contract is void. Nobody noticed because nobody reads page 47.', partyRole: 'Grimshaw\'s defense team. Must find the escape clause before the devil does.', verdictOptions: [
    { verdict: 'Contract upheld — Grimshaw forfeits soul', consequence: 'Grimshaw is dragged to Hell. Unless the party intervenes physically (combat in a courtroom).' },
    { verdict: 'Contract voided — escape clause activated', consequence: 'Grimshaw is free. Azmodiel is furious. The party has made a very powerful enemy.' },
    { verdict: 'Renegotiated — reduced terms', consequence: 'Grimshaw owes 5 years of service instead of souls. A compromise nobody likes. Which means it\'s fair.' },
  ] },
];

export function getRandomCase(): CourtCase {
  return CASES[Math.floor(Math.random() * CASES.length)];
}

export function getCasesByType(type: CaseType): CourtCase[] {
  return CASES.filter((c) => c.type === type);
}

export function getEvidenceCount(courtCase: CourtCase): number {
  return courtCase.evidence.length;
}

export function getWitnessCount(courtCase: CourtCase): number {
  return courtCase.witnesses.length;
}

export function getAllCaseTypes(): CaseType[] {
  return [...new Set(CASES.map((c) => c.type))];
}

export function formatCase(courtCase: CourtCase): string {
  const icon = { criminal: '⚖️', civil: '📋', arcane_malpractice: '🔮', divine_dispute: '✨', contract_breach: '📜' }[courtCase.type];
  const lines = [`${icon} **${courtCase.title}** *(${courtCase.type.replace(/_/g, ' ')})*`];
  lines.push(`  Charge: ${courtCase.charge}`);
  lines.push(`  Judge: ${courtCase.judge}`);
  lines.push(`  Evidence: ${courtCase.evidence.length} items | Witnesses: ${courtCase.witnesses.length}`);
  lines.push(`  🎯 Party role: ${courtCase.partyRole}`);
  lines.push(`  🔄 Twist: ${courtCase.twist}`);
  return lines.join('\n');
}

export { CASES as COURT_CASES };
