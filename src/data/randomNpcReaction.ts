// Random NPC reaction — how an NPC reacts to the party's presence.
export interface NpcReaction { reaction: string; bodyLanguage: string; disposition: 'hostile' | 'suspicious' | 'neutral' | 'friendly' | 'terrified' | 'amused'; followUp: string; }
const REACTIONS: NpcReaction[] = [
  { reaction: 'Pretends not to see the party and walks faster.', bodyLanguage: 'Eyes forward, shoulders hunched.', disposition: 'terrified', followUp: 'If stopped, they stammer and try to leave. They\'ve seen something.' },
  { reaction: 'Smiles warmly and waves the party over.', bodyLanguage: 'Open posture, genuine smile.', disposition: 'friendly', followUp: 'Offers directions, gossip, or a warm meal. Just being nice.' },
  { reaction: 'Crosses arms and blocks the doorway.', bodyLanguage: 'Legs planted, jaw set.', disposition: 'hostile', followUp: '"You\'re not welcome here." There\'s a reason — find out what.' },
  { reaction: 'Stares, then slowly reaches for something under the counter.', bodyLanguage: 'Calculated movements. Watching the party\'s hands.', disposition: 'suspicious', followUp: 'It\'s a ledger (they\'re checking if the party is on a list) or a weapon.' },
  { reaction: 'Bursts out laughing at the party\'s appearance/reputation.', bodyLanguage: 'Doubled over, slapping the table.', disposition: 'amused', followUp: '"You\'re the ones everyone is so afraid of? You don\'t look like much."' },
  { reaction: 'Goes completely still. Color drains from their face.', bodyLanguage: 'Frozen. White-knuckled grip on whatever they\'re holding.', disposition: 'terrified', followUp: 'They recognize someone in the party — or what they carry.' },
  { reaction: 'Nods respectfully and steps aside.', bodyLanguage: 'Slight bow, avoiding eye contact.', disposition: 'neutral', followUp: 'They know the party by reputation and don\'t want trouble.' },
];
export function getRandomReaction(): NpcReaction { return REACTIONS[Math.floor(Math.random() * REACTIONS.length)]; }
export function formatNpcReaction(r: NpcReaction): string { return `👤 **NPC Reaction** (${r.disposition}):\n🎭 ${r.reaction}\n🫂 Body language: *${r.bodyLanguage}*\n➡️ Follow-up: ${r.followUp}`; }
