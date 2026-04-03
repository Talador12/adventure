// Faction quest chain generator — multi-step quest lines with branching outcomes by faction.

export type QuestFaction = 'crown' | 'guild' | 'temple' | 'rebels' | 'underworld';
export type QuestOutcome = 'success' | 'partial' | 'failure' | 'betrayal';

export interface QuestStep {
  step: number;
  title: string;
  description: string;
  objective: string;
  reward: string;
  branchPoint: boolean;
  branchOptions: { choice: string; leadsTo: string; factionEffect: number }[] | null;
}

export interface FactionQuestChain {
  faction: QuestFaction;
  chainName: string;
  questGiver: string;
  stakes: string;
  steps: QuestStep[];
  finalReward: string;
  betrayalOption: string;
  betrayalConsequence: string;
}

const CHAINS: FactionQuestChain[] = [
  { faction: 'crown', chainName: 'The Succession Crisis', questGiver: 'Lord Chancellor Voss', stakes: 'Who sits on the throne determines the future of the kingdom.', steps: [
    { step: 1, title: 'Gather Evidence', description: 'The chancellor needs proof that the pretender\'s claim is forged.', objective: 'Infiltrate the pretender\'s estate and find the forged documents.', reward: '200gp + royal seal of passage', branchPoint: false, branchOptions: null },
    { step: 2, title: 'The Witness', description: 'A witness to the forgery is in hiding. Find them before the pretender does.', objective: 'Locate and protect the witness. Bring them to the capital.', reward: '300gp + noble title (minor)', branchPoint: true, branchOptions: [
      { choice: 'Deliver the witness to the Crown', leadsTo: 'Step 3A: The Trial', factionEffect: 2 },
      { choice: 'Sell the witness to the Pretender', leadsTo: 'Step 3B: The Coup', factionEffect: -3 },
      { choice: 'Let the witness decide their own fate', leadsTo: 'Step 3C: The Exile', factionEffect: 0 },
    ] },
    { step: 3, title: 'The Resolution', description: 'The kingdom\'s fate hangs in the balance.', objective: 'See the chosen path through to its conclusion.', reward: '500gp + permanent political influence', branchPoint: false, branchOptions: null },
  ], finalReward: 'Knight of the Realm title, 1000gp, a manor house, and the eternal gratitude (or hatred) of whoever lost.', betrayalOption: 'Take the evidence to the pretender instead. They pay more.', betrayalConsequence: 'The Crown brands you a traitor. Bounty on your head. The pretender may betray you too.' },
  { faction: 'underworld', chainName: 'The Vault Job', questGiver: 'The Whisper (anonymous)', stakes: 'The biggest heist in the city\'s history. Everyone wants in. Everyone wants a bigger cut.', steps: [
    { step: 1, title: 'Assemble the Crew', description: 'You need a lockpick, a muscle, a mage, and a face.', objective: 'Recruit 4 specialists. Each has a personal condition for joining.', reward: 'Access to the guild safehouse + planning materials', branchPoint: false, branchOptions: null },
    { step: 2, title: 'The Dry Run', description: 'Test the plan on a smaller vault first. Iron out the kinks.', objective: 'Rob the silversmith\'s vault without being detected.', reward: '100gp + refined plan', branchPoint: true, branchOptions: [
      { choice: 'Go loud (fight guards)', leadsTo: 'Step 3 with increased security awareness', factionEffect: -1 },
      { choice: 'Ghost it (no witnesses)', leadsTo: 'Step 3 with element of surprise', factionEffect: 2 },
      { choice: 'Frame someone else', leadsTo: 'Step 3 with a scapegoat in jail', factionEffect: 1 },
    ] },
    { step: 3, title: 'The Big Score', description: 'The main vault. Everything rides on this.', objective: 'Empty the vault and escape the city before dawn.', reward: '2000gp (your cut) + legendary thief reputation', branchPoint: false, branchOptions: null },
  ], finalReward: '5000gp total, a safe house in any major city, and a name that opens doors in the underworld.', betrayalOption: 'Tip off the guards and collect the bounty on your own crew.', betrayalConsequence: 'The underworld puts a permanent contract on your head. No thief will ever trust you again.' },
  { faction: 'temple', chainName: 'The Falling Star', questGiver: 'High Priestess Solara', stakes: 'A celestial artifact fell to earth. Multiple factions race to claim it.', steps: [
    { step: 1, title: 'The Vision', description: 'The priestess shares a divine vision of where the star fell.', objective: 'Journey to the impact site before rival factions.', reward: '150gp + temple blessing (+1 saves for 1 week)', branchPoint: false, branchOptions: null },
    { step: 2, title: 'The Guardians', description: 'The crash site is guarded by celestial constructs. They test the worthy.', objective: 'Pass the trials of courage, wisdom, and mercy.', reward: 'Access to the artifact + celestial favor', branchPoint: true, branchOptions: [
      { choice: 'Take the artifact to the Temple', leadsTo: 'Artifact is studied and used for good', factionEffect: 3 },
      { choice: 'Destroy the artifact', leadsTo: 'Power is released — unpredictable consequences', factionEffect: 0 },
      { choice: 'Keep it for yourself', leadsTo: 'Power corrupts — personal quest chain begins', factionEffect: -2 },
    ] },
    { step: 3, title: 'The Aftermath', description: 'Your choice echoes across the land.', objective: 'Deal with the consequences of your decision.', reward: 'Varies by choice', branchPoint: false, branchOptions: null },
  ], finalReward: 'Temple champion title, access to holy relics, and a direct line to the divine.', betrayalOption: 'Sell the artifact\'s location to the highest bidder.', betrayalConsequence: 'The temple declares you anathema. No cleric of this faith will heal you again.' },
];

export function getRandomQuestChain(): FactionQuestChain {
  return CHAINS[Math.floor(Math.random() * CHAINS.length)];
}

export function getChainByFaction(faction: QuestFaction): FactionQuestChain | undefined {
  return CHAINS.find((c) => c.faction === faction);
}

export function getBranchPoints(chain: FactionQuestChain): QuestStep[] {
  return chain.steps.filter((s) => s.branchPoint);
}

export function getStepCount(chain: FactionQuestChain): number {
  return chain.steps.length;
}

export function getAllQuestFactions(): QuestFaction[] {
  return [...new Set(CHAINS.map((c) => c.faction))];
}

export function formatQuestChain(chain: FactionQuestChain): string {
  const icon = { crown: '👑', guild: '🏛️', temple: '⛪', rebels: '✊', underworld: '🗡️' }[chain.faction];
  const lines = [`${icon} **${chain.chainName}** *(${chain.faction})*`];
  lines.push(`  Quest Giver: ${chain.questGiver}`);
  lines.push(`  Stakes: ${chain.stakes}`);
  chain.steps.forEach((s) => {
    lines.push(`  **Step ${s.step}: ${s.title}** ${s.branchPoint ? '🔀' : ''}`);
    lines.push(`    ${s.objective} → ${s.reward}`);
  });
  lines.push(`  🏆 Final: ${chain.finalReward}`);
  return lines.join('\n');
}

export { CHAINS as FACTION_QUEST_CHAINS };
