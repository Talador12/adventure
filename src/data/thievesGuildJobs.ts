// Random thieves guild job board — heist-adjacent contracts with difficulty and payout tiers.

export type JobType = 'theft' | 'smuggling' | 'forgery' | 'intimidation' | 'information' | 'sabotage';
export type JobRisk = 'low' | 'medium' | 'high' | 'suicidal';

export interface GuildJob {
  title: string;
  type: JobType;
  risk: JobRisk;
  payout: number;
  client: string;
  target: string;
  description: string;
  complication: string;
  requiredSkill: string;
  dc: number;
  failureConsequence: string;
}

const JOBS: GuildJob[] = [
  { title: 'Lift the Ledger', type: 'theft', risk: 'low', payout: 50, client: 'A nervous bookkeeper', target: 'Tax collector\'s office', description: 'Steal a specific ledger page documenting bribes. In and out, no violence.', complication: 'The office has a new guard dog.', requiredSkill: 'Sleight of Hand', dc: 12, failureConsequence: 'Spotted. 20gp fine and 1 week in jail (or run).' },
  { title: 'The Silk Route', type: 'smuggling', risk: 'medium', payout: 200, client: 'The Velvet Hand (fence)', target: 'City gates, 3 crates of "textiles"', description: 'Get three crates past the city watch. They contain stolen silk. Don\'t open them.', complication: 'A rival gang wants the same shipment.', requiredSkill: 'Deception', dc: 14, failureConsequence: 'Contraband seized. Warrant issued. Guild contacts go cold for 1 month.' },
  { title: 'The Forged Will', type: 'forgery', risk: 'medium', payout: 300, client: 'A disinherited noble', target: 'The late Baron\'s estate documents', description: 'Create a convincing forgery of the Baron\'s will naming a new heir. Must pass legal inspection.', complication: 'The real heir has hired a handwriting expert.', requiredSkill: 'Forgery Kit', dc: 15, failureConsequence: 'Forgery detected. Client is arrested. They will name you under pressure.' },
  { title: 'A Friendly Warning', type: 'intimidation', risk: 'low', payout: 75, client: 'Guild leadership', target: 'A shopkeeper who stopped paying protection', description: 'Remind the shopkeeper why the guild fee exists. No permanent harm. Just... remind them.', complication: 'The shopkeeper hired adventurers as bodyguards.', requiredSkill: 'Intimidation', dc: 13, failureConsequence: 'Embarrassment. The guild questions your usefulness.' },
  { title: 'The Whispering Contract', type: 'information', risk: 'high', payout: 500, client: 'Unknown (dead drop)', target: 'The Captain of the Guard\'s private correspondence', description: 'Obtain copies of the Captain\'s recent letters. Do not read them. Do not make extra copies.', complication: 'The Captain\'s quarters are in the barracks. Surrounded by guards.', requiredSkill: 'Stealth', dc: 16, failureConsequence: 'Captured by the guard. Tortured for the client\'s identity. Will you talk?' },
  { title: 'Rats in the Machine', type: 'sabotage', risk: 'high', payout: 400, client: 'A competing merchant guild', target: 'The Ironworks foundry', description: 'Sabotage the main furnace so it fails during the royal commission. No injuries.', complication: 'The foundry has a fire elemental bound to the furnace. It won\'t appreciate tampering.', requiredSkill: 'Thieves\' Tools', dc: 16, failureConsequence: 'Explosion. 4d6 fire damage. Arson charges. The guild disavows you.' },
  { title: 'The Impossible Pocket', type: 'theft', risk: 'high', payout: 750, client: 'Guild Master (personal favor)', target: 'The Archmage\'s component pouch', description: 'Pick the Archmage\'s pocket during the festival parade. They\'re surrounded by guards and wards.', complication: 'The pouch has an Alarm spell. You have 6 seconds after contact.', requiredSkill: 'Sleight of Hand', dc: 18, failureConsequence: 'Polymorphed into a toad. The Archmage thinks it\'s hilarious.' },
  { title: 'Ghost Ship Cargo', type: 'smuggling', risk: 'suicidal', payout: 2000, client: 'The Pirate Queen herself', target: 'Transfer cargo from a ship no one comes back from', description: 'Board The Wandering Tide when it appears, grab the manifest, and get off before dawn.', complication: 'Previous crew are still aboard. They\'re not alive. They\'re not exactly dead either.', requiredSkill: 'Constitution', dc: 17, failureConsequence: 'You speak an unknown language for 1d4 weeks. Your shadow walks separately.' },
];

export function getRandomJob(): GuildJob {
  return JOBS[Math.floor(Math.random() * JOBS.length)];
}

export function getJobsByType(type: JobType): GuildJob[] {
  return JOBS.filter((j) => j.type === type);
}

export function getJobsByRisk(risk: JobRisk): GuildJob[] {
  return JOBS.filter((j) => j.risk === risk);
}

export function getJobsUnderDC(maxDC: number): GuildJob[] {
  return JOBS.filter((j) => j.dc <= maxDC);
}

export function getAllJobTypes(): JobType[] {
  return [...new Set(JOBS.map((j) => j.type))];
}

export function formatGuildJob(job: GuildJob): string {
  const icon = { theft: '🗝️', smuggling: '📦', forgery: '📝', intimidation: '👊', information: '🔍', sabotage: '💣' }[job.type];
  const risk = { low: '🟢', medium: '🟡', high: '🟠', suicidal: '🔴' }[job.risk];
  const lines = [`${icon} ${risk} **${job.title}** *(${job.type}, ${job.risk} risk)*`];
  lines.push(`  💰 Payout: ${job.payout}gp | Skill: ${job.requiredSkill} DC ${job.dc}`);
  lines.push(`  *${job.description}*`);
  lines.push(`  ⚠️ Complication: ${job.complication}`);
  return lines.join('\n');
}

export { JOBS as GUILD_JOBS };
