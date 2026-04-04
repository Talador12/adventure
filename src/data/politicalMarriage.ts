// Random political marriage — arranged unions with diplomatic consequences and escape options.

export type MarriageMotivation = 'alliance' | 'peace_treaty' | 'succession' | 'economic' | 'blackmail';

export interface PoliticalMarriage {
  title: string;
  motivation: MarriageMotivation;
  parties: { name: string; house: string; willingness: 'eager' | 'reluctant' | 'opposed' }[];
  stakes: string;
  complications: string[];
  escapeOptions: { method: string; dc: number; consequence: string }[];
  ceremonyThreat: string;
  ifSuccessful: string;
  ifFailed: string;
}

const MARRIAGES: PoliticalMarriage[] = [
  { title: 'The Crown\'s Gambit', motivation: 'peace_treaty', parties: [{ name: 'Prince Aldric', house: 'House Valerian', willingness: 'reluctant' }, { name: 'Princess Lyanna', house: 'House Drakenmoor', willingness: 'opposed' }], stakes: 'This marriage ends a 20-year border war. Thousands of lives depend on it.', complications: ['Lyanna is in love with someone else (a commoner bard).', 'Aldric has a secret — he\'s already married (common law, to a foreign merchant).', 'Drakenmoor\'s Baroness sees this as a trap, not a peace offering.'], escapeOptions: [{ method: 'Find legal grounds to annul (Aldric\'s existing marriage)', dc: 15, consequence: 'War resumes, but Aldric is free. Valerian loses face.' }, { method: 'Convince both families a trade agreement works better', dc: 17, consequence: 'No marriage, but peace holds if the trade deal is maintained.' }, { method: 'The couple elopes with different people', dc: 14, consequence: 'Scandal. Both houses are furious. But honestly? Everyone is happier.' }], ceremonyThreat: 'An assassin disguised as a guest plans to kill the groom during the ceremony. Both houses blame each other.', ifSuccessful: 'Peace holds for a generation. The couple learns to respect (if not love) each other. Their child unites both houses.', ifFailed: 'War resumes within a month. The failed marriage becomes a symbol of broken promises.' },
  { title: 'The Merchant\'s Merger', motivation: 'economic', parties: [{ name: 'Lord Percival Ashford IV', house: 'House Ashford', willingness: 'eager' }, { name: 'Lady Chen Wei', house: 'Eastern Trading Company', willingness: 'reluctant' }], stakes: 'The marriage merges the two largest trade networks. Whoever controls them controls the economy.', complications: ['Chen Wei\'s family expects a massive dowry that Ashford can\'t afford.', 'A rival merchant guild is sabotaging the wedding preparations.', 'Percival genuinely likes Chen Wei. She finds him tolerable. That\'s progress.'], escapeOptions: [{ method: 'Expose the rival guild\'s sabotage', dc: 14, consequence: 'Wedding proceeds smoothly. Rival guild is disgraced.' }, { method: 'Negotiate a business partnership instead of marriage', dc: 13, consequence: 'Both families save face. The partnership is more profitable than a marriage anyway.' }], ceremonyThreat: 'The rival guild has poisoned the wedding feast. Detection DC 15 before anyone eats.', ifSuccessful: 'A trade empire forms. Both families become the wealthiest in the region. Prices drop for everyone.', ifFailed: 'Trade war. Prices triple. The common people suffer most.' },
  { title: 'The Heir\'s Burden', motivation: 'succession', parties: [{ name: 'Heir Apparent Cael', house: 'The Crown', willingness: 'opposed' }, { name: 'ANY noble-born candidate', house: 'To be determined by the party', willingness: 'eager' }], stakes: 'The kingdom needs an heir. Cael has refused 6 candidates. The court is losing patience.', complications: ['Cael is secretly a changeling who replaced the real heir 10 years ago. A marriage would expose them.', 'The real heir is alive, working as a blacksmith in a border town. They don\'t know who they are.', 'The court advisor is manipulating the candidate selection for personal gain.'], escapeOptions: [{ method: 'Find the real heir', dc: 16, consequence: 'The changeling is exposed. The real heir must choose to accept or reject the throne.' }, { method: 'Convince the court to change the succession law', dc: 18, consequence: 'Revolutionary. Either modernizes the kingdom or triggers a civil war.' }, { method: 'Cael reveals the truth voluntarily', dc: 14, consequence: 'Chaos. But honest chaos. The kingdom must decide what "legitimate" means.' }], ceremonyThreat: 'The changeling\'s true form flickers during the wedding vows (stress breaks concentration). Someone will notice.', ifSuccessful: 'The changeling\'s secret survives another generation. But secrets always surface eventually.', ifFailed: 'Succession crisis. Three noble houses claim the throne simultaneously.' },
];

export function getRandomMarriage(): PoliticalMarriage {
  return MARRIAGES[Math.floor(Math.random() * MARRIAGES.length)];
}

export function getMarriagesByMotivation(motivation: MarriageMotivation): PoliticalMarriage[] {
  return MARRIAGES.filter((m) => m.motivation === motivation);
}

export function getEscapeOptionCount(marriage: PoliticalMarriage): number {
  return marriage.escapeOptions.length;
}

export function getAllMotivations(): MarriageMotivation[] {
  return [...new Set(MARRIAGES.map((m) => m.motivation))];
}

export function formatMarriage(marriage: PoliticalMarriage): string {
  const lines = [`💍 **${marriage.title}** *(${marriage.motivation.replace(/_/g, ' ')})*`];
  lines.push(`  Stakes: ${marriage.stakes}`);
  marriage.parties.forEach((p) => lines.push(`  ${p.willingness === 'eager' ? '😊' : p.willingness === 'reluctant' ? '😐' : '😡'} ${p.name} (${p.house}, ${p.willingness})`));
  lines.push(`  ⚠️ Ceremony threat: ${marriage.ceremonyThreat}`);
  lines.push(`  Escape options: ${marriage.escapeOptions.length}`);
  return lines.join('\n');
}

export { MARRIAGES as POLITICAL_MARRIAGES };
