// Magical contract system — binding agreements with clauses, loopholes, and consequences.

export type ContractType = 'infernal' | 'fey' | 'arcane' | 'divine' | 'merchant';

export interface ContractClause {
  text: string;
  binding: boolean; // can this clause be broken?
  loophole: string | null; // how to exploit it
  penalty: string; // what happens if broken
}

export interface MagicalContract {
  name: string;
  type: ContractType;
  parties: string[];
  description: string;
  clauses: ContractClause[];
  duration: string;
  breakCondition: string;
  detectionDC: number; // to notice hidden clauses
}

const CONTRACTS: MagicalContract[] = [
  { name: 'The Infernal Bargain', type: 'infernal', parties: ['The Warlock', 'Azmodiel, Duke of the Seventh Circle'], description: 'Power in exchange for service. The fine print is where the devil lives.', clauses: [
    { text: 'The signee receives arcane power equivalent to 3rd-level spell slots.', binding: true, loophole: null, penalty: 'Power revoked immediately.' },
    { text: 'The signee shall perform one task per lunar cycle as directed by the patron.', binding: true, loophole: '"Task" is undefined — argue that breathing counts as a task.', penalty: '1d6 necrotic damage per day of non-compliance.' },
    { text: 'Upon death, the signee\'s soul belongs to the patron.', binding: true, loophole: 'If resurrected before the soul reaches the Nine Hells (within 1 minute), the clause resets.', penalty: 'Eternal damnation.' },
    { text: 'The signee shall not reveal the terms of this contract to any mortal.', binding: false, loophole: 'Tell a non-mortal (an elf who claims immortality, a construct, etc.).', penalty: 'Tongue burns for 1d4 fire damage per word spoken.' },
  ], duration: 'Until death (and beyond)', breakCondition: 'Find the original contract (physical copy in Hell) and destroy it with holy fire.', detectionDC: 18 },
  { name: 'The Fey Promise', type: 'fey', parties: ['The Traveler', 'Queen Titania\'s Emissary'], description: 'A seemingly generous offer. Fey contracts are technically unbreakable — but they\'re all loopholes.', clauses: [
    { text: 'Safe passage through the Feywild for one journey.', binding: true, loophole: '"One journey" has no time limit. You could journey for a century.', penalty: 'Lost in the Feywild forever.' },
    { text: 'In exchange, the traveler shall give "that which they value least."', binding: true, loophole: 'The fey decides what you value least, not you. Could be a memory, a relationship, or a bad habit.', penalty: 'The fey takes something you value MOST instead.' },
    { text: 'The traveler shall speak no ill of the Fey Court while in the Feywild.', binding: true, loophole: 'Compliment them sarcastically. Technically not speaking ill.', penalty: 'Polymorphed into a toad for 1d4 days.' },
  ], duration: 'Until the journey ends', breakCondition: 'Make the fey laugh genuinely. They release contracts they find amusing.', detectionDC: 15 },
  { name: 'The Merchant\'s Bond', type: 'merchant', parties: ['The Buyer', 'The Enchanted Merchant Guild'], description: 'A magically enforced trade agreement. Standard in high-value magical item transactions.', clauses: [
    { text: 'Payment of 500gp for one uncommon magic item.', binding: true, loophole: null, penalty: 'The item vanishes and the gold is returned minus a 100gp cancellation fee.' },
    { text: 'The item is guaranteed to function as described for 30 days.', binding: true, loophole: '"As described" — if the description is vague, so is the guarantee.', penalty: 'Full refund plus 50gp compensation.' },
    { text: 'The buyer shall not resell the item within 30 days.', binding: false, loophole: '"Gift" it to someone who then "gifts" you gold. Not technically a sale.', penalty: '200gp fine enforced by magical compulsion to pay.' },
  ], duration: '30 days', breakCondition: 'Mutual agreement to terminate, or a Dispel Magic (5th level) on the contract parchment.', detectionDC: 12 },
  { name: 'The Blood Oath', type: 'arcane', parties: ['Two willing participants'], description: 'An ancient ritual where two parties cut their palms, clasp hands, and speak their vows. The blood remembers.', clauses: [
    { text: 'Both parties swear to [stated oath]. The magic enforces intent, not letter.', binding: true, loophole: 'The magic reads intent at time of casting. If you genuinely didn\'t understand, the oath may not bind.', penalty: 'The oath-breaker\'s blood boils. 3d6 necrotic damage per day until atonement.' },
    { text: 'Neither party may directly cause harm to the other.', binding: true, loophole: '"Directly" — indirect harm (hiring someone, setting a trap they walk into) may not trigger.', penalty: 'The harming party\'s weapon hand withers for 1d4 weeks.' },
  ], duration: 'Until the oath is fulfilled or both parties release each other', breakCondition: 'Both must willingly release each other, or one must die (which fulfills "until death").', detectionDC: 14 },
];

export function getRandomContract(): MagicalContract {
  return CONTRACTS[Math.floor(Math.random() * CONTRACTS.length)];
}

export function getContractsByType(type: ContractType): MagicalContract[] {
  return CONTRACTS.filter((c) => c.type === type);
}

export function getClausesWithLoopholes(contract: MagicalContract): ContractClause[] {
  return contract.clauses.filter((c) => c.loophole !== null);
}

export function getBreakableClauses(contract: MagicalContract): ContractClause[] {
  return contract.clauses.filter((c) => !c.binding);
}

export function getAllContractTypes(): ContractType[] {
  return [...new Set(CONTRACTS.map((c) => c.type))];
}

export function formatContract(contract: MagicalContract, showLoopholes: boolean = false): string {
  const icon = { infernal: '🔥', fey: '🌸', arcane: '🔮', divine: '✨', merchant: '💰' }[contract.type];
  const lines = [`${icon} **${contract.name}** *(${contract.type})*`];
  lines.push(`  *${contract.description}*`);
  lines.push(`  Parties: ${contract.parties.join(' & ')} | Duration: ${contract.duration}`);
  lines.push('  **Clauses:**');
  contract.clauses.forEach((c, i) => {
    lines.push(`    ${i + 1}. ${c.text}`);
    if (showLoopholes && c.loophole) lines.push(`       🔓 Loophole: ${c.loophole}`);
  });
  lines.push(`  Break: ${contract.breakCondition}`);
  return lines.join('\n');
}

export { CONTRACTS as MAGICAL_CONTRACTS };
