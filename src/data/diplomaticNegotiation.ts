// Diplomatic negotiation system — structured talks with leverage, concessions, and deal-breaking.

export type NegotiationStance = 'aggressive' | 'firm' | 'neutral' | 'open' | 'desperate';
export type LeverageType = 'military' | 'economic' | 'political' | 'personal' | 'magical' | 'information';

export interface Leverage {
  type: LeverageType;
  description: string;
  strength: number; // 1-5
  revealed: boolean;
}

export interface Concession {
  name: string;
  cost: string; // what it costs the giver
  value: number; // 1-10 how much the other side wants it
  description: string;
}

export interface NegotiationParty {
  name: string;
  stance: NegotiationStance;
  goals: string[];
  leverages: Leverage[];
  concessions: Concession[];
  dealBreaker: string;
  patience: number; // rounds before they walk away
}

export interface NegotiationScenario {
  title: string;
  context: string;
  parties: NegotiationParty[];
  stakes: string;
  timeLimit: string;
  possibleOutcomes: { outcome: string; condition: string }[];
}

const SCENARIOS: NegotiationScenario[] = [
  { title: 'The Border Dispute', context: 'Two lords claim the same farmland. It feeds both communities. War is weeks away.', parties: [
    { name: 'Lord Ashwick', stance: 'firm', goals: ['Keep the eastern fields', 'Save face before his vassals'], leverages: [{ type: 'military', description: 'Has 200 soldiers ready', strength: 4, revealed: true }, { type: 'personal', description: 'His daughter is betrothed to the king\'s nephew', strength: 3, revealed: false }], concessions: [{ name: 'Shared harvest rights', cost: 'Reduced income', value: 6, description: 'Split the harvest 60/40' }, { name: 'Annual tribute', cost: '100gp/year', value: 4, description: 'Pay for usage rights' }], dealBreaker: 'Will not accept public humiliation.', patience: 5 },
    { name: 'Baroness Thorn', stance: 'aggressive', goals: ['Claim all farmland', 'Establish dominance in the region'], leverages: [{ type: 'economic', description: 'Controls the only bridge (trade route)', strength: 5, revealed: true }, { type: 'information', description: 'Knows Ashwick\'s supply lines are weak', strength: 3, revealed: false }], concessions: [{ name: 'Toll reduction', cost: 'Lost bridge revenue', value: 5, description: 'Lower bridge tolls by 50%' }, { name: 'Non-aggression pact', cost: 'Limits expansion', value: 7, description: '5-year peace treaty' }], dealBreaker: 'Will not share the farmland equally.', patience: 3 },
  ], stakes: 'War kills hundreds. Peace saves the harvest. The party\'s reputation hangs on the result.', timeLimit: '3 negotiation rounds', possibleOutcomes: [{ outcome: 'Peace treaty with shared resources', condition: 'Both sides concede at least one item' }, { outcome: 'War', condition: 'Either side\'s patience reaches 0' }, { outcome: 'Ashwick surrenders land for trade rights', condition: 'Ashwick gets bridge access, Thorn gets land' }] },
  { title: 'The Hostage Exchange', context: 'A bandit leader holds a merchant\'s family. The merchant holds the bandit\'s lieutenant.', parties: [
    { name: 'The Merchant', stance: 'desperate', goals: ['Get family back alive', 'Don\'t pay the full ransom'], leverages: [{ type: 'personal', description: 'Holds the lieutenant captive', strength: 4, revealed: true }], concessions: [{ name: 'Half ransom', cost: '500gp', value: 6, description: 'Pay half now, half never' }, { name: 'Safe passage guarantee', cost: 'Political capital', value: 3, description: 'Promise no pursuit' }], dealBreaker: 'Will not leave without his family.', patience: 4 },
    { name: 'The Bandit Chief', stance: 'firm', goals: ['Get lieutenant back', 'Get paid', 'Maintain reputation'], leverages: [{ type: 'personal', description: 'Holds the family', strength: 5, revealed: true }, { type: 'military', description: '30 bandits surround the meeting', strength: 3, revealed: true }], concessions: [{ name: 'Reduced ransom', cost: 'Looks weak', value: 4, description: '500gp instead of 1000gp' }, { name: 'Release one family member', cost: 'Reduced leverage', value: 7, description: 'Show of good faith' }], dealBreaker: 'Will not release hostages without getting the lieutenant back.', patience: 3 },
  ], stakes: 'Lives on both sides. The party\'s choices determine who lives and dies.', timeLimit: '2 negotiation rounds (tension is high)', possibleOutcomes: [{ outcome: 'Clean exchange', condition: 'Both sides trade simultaneously' }, { outcome: 'Ambush (either side)', condition: 'Party reveals hidden leverage or force' }, { outcome: 'Partial deal — one hostage released, negotiations continue', condition: 'One concession from each side' }] },
];

export function getRandomScenario(): NegotiationScenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function getAllScenarios(): NegotiationScenario[] {
  return SCENARIOS;
}

export function getPartyLeverage(party: NegotiationParty, onlyRevealed: boolean = false): Leverage[] {
  return onlyRevealed ? party.leverages.filter((l) => l.revealed) : party.leverages;
}

export function getTotalLeverageStrength(party: NegotiationParty): number {
  return party.leverages.reduce((sum, l) => sum + l.strength, 0);
}

export function formatScenario(scenario: NegotiationScenario): string {
  const lines = [`🤝 **${scenario.title}**`];
  lines.push(`  *${scenario.context}*`);
  lines.push(`  Stakes: ${scenario.stakes}`);
  lines.push(`  Time: ${scenario.timeLimit}`);
  scenario.parties.forEach((p) => {
    const icon = { aggressive: '😡', firm: '😤', neutral: '😐', open: '😊', desperate: '😰' }[p.stance];
    lines.push(`  ${icon} **${p.name}** (${p.stance}) — Patience: ${p.patience} rounds`);
    lines.push(`    Goals: ${p.goals.join('; ')}`);
    lines.push(`    ❌ Deal breaker: ${p.dealBreaker}`);
  });
  return lines.join('\n');
}

export { SCENARIOS as NEGOTIATION_SCENARIOS };
