// NPC relationship web visualizer — how NPCs feel about each other and the party.

export type RelationType = 'ally' | 'enemy' | 'rival' | 'lover' | 'mentor' | 'debtor' | 'family' | 'secret';

export interface NPCNode { name: string; role: string; loyalty: number; }
export interface RelationEdge { from: string; to: string; type: RelationType; description: string; known: boolean; }

export interface RelationshipWeb {
  name: string;
  setting: string;
  npcs: NPCNode[];
  relations: RelationEdge[];
  centralConflict: string;
  partyLeverage: string;
  plotHook: string;
}

const WEBS: RelationshipWeb[] = [
  { name: 'The Court of Thorns', setting: 'A noble court with 5 key players, all scheming.', npcs: [
    { name: 'Duke Valerian', role: 'Ruler', loyalty: 5 },
    { name: 'Lady Ashford', role: 'Treasurer', loyalty: 3 },
    { name: 'Captain Dren', role: 'Guard Commander', loyalty: 7 },
    { name: 'High Priestess Solara', role: 'Spiritual Advisor', loyalty: 8 },
    { name: 'The Whisper', role: 'Spymaster', loyalty: 1 },
  ], relations: [
    { from: 'Duke Valerian', to: 'Lady Ashford', type: 'rival', description: 'She controls the money. He controls the army. Neither trusts the other.', known: true },
    { from: 'Lady Ashford', to: 'Captain Dren', type: 'lover', description: 'Secret affair. If exposed, both lose everything.', known: false },
    { from: 'Captain Dren', to: 'Duke Valerian', type: 'ally', description: 'Loyal soldier. Would die for the Duke. Wouldn\'t die for his policies.', known: true },
    { from: 'High Priestess Solara', to: 'The Whisper', type: 'enemy', description: 'The priestess knows The Whisper serves a darker master. Can\'t prove it.', known: false },
    { from: 'The Whisper', to: 'Duke Valerian', type: 'debtor', description: 'The Duke owes The Whisper a favor from 10 years ago. A BIG favor. Uncollected.', known: false },
  ], centralConflict: 'The Whisper is about to call in the Duke\'s debt. The request will destabilize the entire court.', partyLeverage: 'Discover the secret affair to control Lady Ashford. Or expose The Whisper\'s true allegiance to break the debt.', plotHook: 'The Duke hires the party to investigate a "minor theft." The theft is a cover for The Whisper\'s real play.' },
  { name: 'The Underworld Hierarchy', setting: 'A criminal network where nobody trusts anyone. For good reason.', npcs: [
    { name: 'Mother Iron', role: 'Protection Boss', loyalty: 6 },
    { name: 'Fingers McGee', role: 'Fence/Smuggler', loyalty: 2 },
    { name: 'The Accountant', role: 'Information Broker', loyalty: 4 },
    { name: 'Sable', role: 'Assassin', loyalty: 0 },
  ], relations: [
    { from: 'Mother Iron', to: 'Fingers McGee', type: 'debtor', description: 'Fingers owes her 2,000gp. She\'s patient. For now.', known: true },
    { from: 'Fingers McGee', to: 'The Accountant', type: 'enemy', description: 'The Accountant knows about a job Fingers botched. Blackmail material.', known: false },
    { from: 'The Accountant', to: 'Sable', type: 'secret', description: 'The Accountant hired Sable to kill Mother Iron. Payment pending.', known: false },
    { from: 'Sable', to: 'Mother Iron', type: 'family', description: 'Sable is Mother Iron\'s estranged daughter. Nobody knows. Including Mother Iron.', known: false },
  ], centralConflict: 'The Accountant is trying to take over by eliminating Mother Iron. But the assassin they hired is the target\'s own child.', partyLeverage: 'Reveal the family connection to stop the hit. Or let it play out and pick up the pieces.', plotHook: 'The party intercepts a coded message between The Accountant and Sable. They have 48 hours to decode it.' },
];

export function getRandomWeb(): RelationshipWeb {
  return WEBS[Math.floor(Math.random() * WEBS.length)];
}

export function getSecretRelations(web: RelationshipWeb): RelationEdge[] {
  return web.relations.filter((r) => !r.known);
}

export function getKnownRelations(web: RelationshipWeb): RelationEdge[] {
  return web.relations.filter((r) => r.known);
}

export function getNPCCount(web: RelationshipWeb): number {
  return web.npcs.length;
}

export function formatWeb(web: RelationshipWeb, showSecrets: boolean = false): string {
  const lines = [`🕸️ **${web.name}** — ${web.setting}`];
  web.npcs.forEach((n) => lines.push(`  👤 ${n.name} (${n.role}) — Loyalty: ${n.loyalty}/10`));
  const visible = showSecrets ? web.relations : getKnownRelations(web);
  visible.forEach((r) => {
    const icon = { ally: '🤝', enemy: '⚔️', rival: '⚡', lover: '💕', mentor: '📚', debtor: '💰', family: '👪', secret: '🔒' }[r.type];
    lines.push(`  ${icon} ${r.from} → ${r.to}: ${r.description}${!r.known ? ' 🔒' : ''}`);
  });
  lines.push(`  🎯 Leverage: ${web.partyLeverage}`);
  return lines.join('\n');
}

export { WEBS as RELATIONSHIP_WEBS };
