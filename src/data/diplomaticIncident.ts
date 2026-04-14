// Diplomatic incident — international crises at summits, embassies, and treaty signings.

export type IncidentSeverity = 'minor' | 'major' | 'war_trigger';
export type IncidentType = 'assassination' | 'insult' | 'theft' | 'sabotage' | 'impersonation' | 'betrayal';

export interface DiplomaticFaction {
  name: string;
  representative: string;
  demeanor: string;
  secretGoal: string;
}

export interface ResolutionPath {
  name: string;
  approach: string;
  skillChecks: string[];
  outcome: string;
}

export interface DiplomaticIncident {
  name: string;
  type: IncidentType;
  severity: IncidentSeverity;
  setting: string;
  description: string;
  factions: DiplomaticFaction[];
  immediateConsequence: string;
  resolutions: ResolutionPath[];
  worstCase: string;
  timeLimit: string;
}

const INCIDENTS: DiplomaticIncident[] = [
  {
    name: 'The Poisoned Toast',
    type: 'assassination',
    severity: 'war_trigger',
    setting: 'A peace summit between the Kingdom of Aldara and the Dwarven Holds, hosted in the neutral Free City of Portmere.',
    description: 'During the opening banquet, Ambassador Thrain of the Dwarven Holds collapses mid-toast. Poison. The dwarves immediately blame the Aldaran delegation. Weapons are drawn. The party has minutes before this becomes a massacre.',
    factions: [
      { name: 'Kingdom of Aldara', representative: 'Lady Serene Voss, silver-tongued diplomat', demeanor: 'Outraged at the accusation. Demands an investigation before any conclusions.', secretGoal: 'Genuinely wants peace. The war costs too much. Will concede mining rights to end this.' },
      { name: 'Dwarven Holds', representative: 'Thane Borik Ironhand, Thrain\'s bodyguard', demeanor: 'Grief-stricken and furious. Wants blood first, questions later.', secretGoal: 'Thrain was about to reveal the Holds are nearly bankrupt. Some dwarves wanted him silenced.' },
      { name: 'Free City of Portmere', representative: 'Magistrate Helene Crow', demeanor: 'Terrified. A diplomatic murder on her soil means sanctions from both sides.', secretGoal: 'Will sacrifice anyone to maintain Portmere\'s neutrality. Including the truth.' },
    ],
    immediateConsequence: 'Both delegations retreat to their quarters with armed guards. The city gates close. No one leaves until the poisoner is found.',
    resolutions: [
      { name: 'Investigate the poison', approach: 'Examine the wine, the glass, the kitchen. Follow the supply chain.', skillChecks: ['DC 15 Medicine (identify poison)', 'DC 14 Investigation (trace the source)', 'DC 16 Persuasion (get kitchen staff to talk)'], outcome: 'The poison was in the glass, not the wine. Planted before the banquet by a servant. The servant works for a third party: a weapons merchant who profits from war.' },
      { name: 'Save Ambassador Thrain', approach: 'The poison is slow-acting. A healer can save him if they act within the hour.', skillChecks: ['DC 16 Medicine (stabilize)', 'DC 14 Nature (identify herbal antidote)', 'DC 13 Persuasion (convince dwarves to let an outsider touch Thrain)'], outcome: 'Thrain survives. His testimony clears Aldara. The real threat is still out there.' },
      { name: 'Prevent the bloodshed', approach: 'Keep both sides from fighting while the investigation proceeds. Buy time.', skillChecks: ['DC 17 Persuasion (calm Thane Borik)', 'DC 14 Intimidation (convince Aldaran guards to stand down)', 'DC 15 Deception (bluff that you already know who did it)'], outcome: 'Temporary ceasefire. Both sides agree to 24 hours. The pressure is now on the investigation.' },
    ],
    worstCase: 'Thrain dies, war breaks out, Portmere is destroyed in the crossfire, and the weapons merchant gets exactly what they wanted.',
    timeLimit: '1 hour to stabilize Thrain. 24 hours to find the poisoner. 3 days before both armies arrive at Portmere\'s gates.',
  },
  {
    name: 'The Wrong Flag',
    type: 'insult',
    severity: 'major',
    setting: 'A trade negotiation between the Elvish Concord and the Orcish Confederation, held aboard a neutral merchant vessel.',
    description: 'Someone replaced the Orcish Confederation\'s ceremonial banner with an ancient war flag depicting orcish defeat at the Battle of Shattered Tusks. The orcs see this as a calculated humiliation. The elves swear they had nothing to do with it. Negotiations are collapsing.',
    factions: [
      { name: 'Elvish Concord', representative: 'Lorekeeper Aelindra, ancient and patient', demeanor: 'Genuinely confused. Culturally precise - she would never make this mistake.', secretGoal: 'The Concord needs orcish lumber. They cannot afford this deal falling through.' },
      { name: 'Orcish Confederation', representative: 'Warchief Gruumak, young and prideful', demeanor: 'Humiliated in front of his clan elders. Must respond with strength or lose face.', secretGoal: 'Gruumak actually wants the trade deal. He sees it as modernization. But he cannot appear weak.' },
      { name: 'The Merchant Guild (ship owners)', representative: 'Captain Delia Finn, a half-orc merchant', demeanor: 'Panicking. Her ship, her responsibility. She is searching for who switched the flags.', secretGoal: 'Delia knows one of her crew did it on orders from a competing merchant house that wants the trade deal to fail.' },
    ],
    immediateConsequence: 'Warchief Gruumak demands a formal apology and a tribute of 500gp in orcish custom. The elves refuse on principle - apologizing admits guilt they do not have.',
    resolutions: [
      { name: 'Find the saboteur', approach: 'Search the ship. Interview the crew. Someone switched the flags.', skillChecks: ['DC 13 Investigation (find the original flag hidden below decks)', 'DC 14 Insight (identify which crew member is lying)', 'DC 12 Intimidation (make the saboteur confess)'], outcome: 'A deckhand confesses. Paid by the Golden Sail trading house. Both sides unite against the real enemy.' },
      { name: 'Cultural bridge', approach: 'Find a way for Gruumak to save face without the elves admitting guilt.', skillChecks: ['DC 16 History (know orcish customs for restoring honor)', 'DC 15 Persuasion (propose a ritual combat that satisfies orcish pride)', 'DC 14 Performance (offer entertainment as a gift of respect)'], outcome: 'A party member fights Gruumak in a non-lethal honor duel. Win or lose, Gruumak\'s pride is restored. Negotiations resume.' },
    ],
    worstCase: 'Gruumak storms off. The Confederation embargo all elvish trade. Border skirmishes start within a month. The Golden Sail gets the exclusive contract.',
    timeLimit: 'Gruumak gives the elves until sunset to "make this right." That is 4 hours.',
  },
  {
    name: 'The Stolen Treaty',
    type: 'theft',
    severity: 'major',
    setting: 'The signing ceremony for a 50-year peace treaty between three rival city-states, held in the Grand Library of Aradon.',
    description: 'The treaty document itself has been stolen from the locked vault overnight. Without the original (signed by all three leaders over the past month), the treaty is void. Each city-state suspects the others of sabotage.',
    factions: [
      { name: 'Aradon (host city)', representative: 'Chancellor Voss, meticulous bureaucrat', demeanor: 'Mortified. The treaty was in his vault. He is suspected by everyone.', secretGoal: 'Voss did not steal it, but he lost the key to the vault 3 days ago and has been too embarrassed to tell anyone.' },
      { name: 'Kelmora (military power)', representative: 'General Rena Steele, hardliner', demeanor: 'Suspicious. She never wanted the treaty and is the obvious suspect - which makes her furious.', secretGoal: 'Steele signed the treaty reluctantly. She does not want war, but she wants people to THINK she does. The uncertainty is her leverage.' },
      { name: 'Thornhaven (merchant republic)', representative: 'Councilor Pip Brassworth, halfling financier', demeanor: 'Nervous, overly helpful, volunteering theories.', secretGoal: 'Pip\'s merchant house funded the theft. The treaty includes tariff terms that would bankrupt him personally. He wants it rewritten.' },
    ],
    immediateConsequence: 'The signing ceremony is delayed 48 hours. Each delegation has sent for military escorts. The library is on lockdown.',
    resolutions: [
      { name: 'Recover the original', approach: 'Track the thief. The vault lock was picked, not forced.', skillChecks: ['DC 15 Investigation (examine the vault for clues)', 'DC 14 Thieves\' Tools (understand the lock mechanism)', 'DC 16 Persuasion (get Voss to admit he lost the key)'], outcome: 'Voss\'s key was stolen by a Thornhaven agent. The treaty is hidden in Pip\'s luggage. Confronting him with evidence forces a confession.' },
      { name: 'Draft a new treaty', approach: 'Convince all three parties to re-sign. Faster than investigating.', skillChecks: ['DC 17 Persuasion (convince Steele to sign again)', 'DC 14 Persuasion (convince Voss his reputation is at stake)', 'DC 15 Insight (notice Pip trying to change the tariff terms in the new draft)'], outcome: 'A new treaty is signed. If Pip\'s changes are caught, Thornhaven is embarrassed. If not, Pip wins.' },
    ],
    worstCase: 'No treaty. Three armies mobilize. The 50-year peace window closes. The next war starts in spring.',
    timeLimit: '48 hours before delegations leave. General Steele leaves first if she suspects treachery.',
  },
];

export function getRandomIncident(): DiplomaticIncident {
  return INCIDENTS[Math.floor(Math.random() * INCIDENTS.length)];
}

export function getIncidentsBySeverity(severity: IncidentSeverity): DiplomaticIncident[] {
  return INCIDENTS.filter((i) => i.severity === severity);
}

export function getAllIncidentTypes(): IncidentType[] {
  return [...new Set(INCIDENTS.map((i) => i.type))];
}

export function getFactionCount(incident: DiplomaticIncident): number {
  return incident.factions.length;
}

export function formatIncident(incident: DiplomaticIncident): string {
  const sev = { minor: '🟢', major: '🟡', war_trigger: '🔴' };
  const lines = [`${sev[incident.severity]} **${incident.name}** *(${incident.type}, ${incident.severity})*`];
  lines.push(`  Setting: ${incident.setting}`);
  lines.push(`  ${incident.description}`);
  lines.push('  **Factions:**');
  for (const f of incident.factions) {
    lines.push(`    - **${f.representative}** (${f.name}): ${f.demeanor}`);
    lines.push(`      Secret: ${f.secretGoal}`);
  }
  lines.push(`  Immediate: ${incident.immediateConsequence}`);
  lines.push('  **Resolutions:**');
  for (const r of incident.resolutions) {
    lines.push(`    - **${r.name}:** ${r.approach}`);
  }
  lines.push(`  Worst case: ${incident.worstCase}`);
  lines.push(`  Time limit: ${incident.timeLimit}`);
  return lines.join('\n');
}

export { INCIDENTS as DIPLOMATIC_INCIDENTS };
