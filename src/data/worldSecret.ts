// World secret generator — hidden truths about the campaign world that change everything.
export type SecretScope = 'local' | 'regional' | 'continental' | 'cosmic';
export interface WorldSecret { scope: SecretScope; title: string; secret: string; whoKnows: string; whatChanges: string; discoveryMethod: string; }
const SECRETS: WorldSecret[] = [
  { scope: 'local', title: 'The Well Remembers', secret: 'The town well is sentient. It has been listening to every conversation had near it for 500 years. It knows every secret in town.', whoKnows: 'Nobody. The well hasn\'t told anyone. It\'s waiting for someone interesting enough to talk to.', whatChanges: 'Every mystery in this town can be solved by asking the well. If you know HOW to ask.', discoveryMethod: 'Detect Magic (faint divination). Speak with anything spell. Or: ask it a question at midnight. It answers in ripples.' },
  { scope: 'regional', title: 'The Dead King Rules', secret: 'The beloved king who died 10 years ago isn\'t dead. He\'s undead. Ruling from a hidden chamber beneath the palace. The council knows.', whoKnows: 'The Royal Council (5 people). The king\'s personal cleric (who maintains the spell). A cat (who wandered into the chamber).', whatChanges: 'The kingdom\'s laws, treaties, and succession are all technically valid — signed by an undead hand. If exposed, everything collapses.', discoveryMethod: 'The king\'s signature has changed slightly (Forgery Kit DC 16). The cleric is aging rapidly (the spell drains life). The cat avoids the throne room.' },
  { scope: 'continental', title: 'The Map Is Wrong', secret: 'The continent is not the shape everyone thinks it is. An entire region has been hidden by a permanent illusion cast by a cabal of druids 1,000 years ago.', whoKnows: 'The druid circle who maintains it (12 members). A cartographer who noticed the math doesn\'t work (she\'s been "disappeared").', whatChanges: 'An entire civilization exists behind the illusion. They\'ve been hidden for a millennium. They don\'t know the outside world has changed.', discoveryMethod: 'True Seeing. Or: walk into the "ocean" at the map\'s edge. You don\'t get wet. You walk through a wall of illusion.' },
  { scope: 'cosmic', title: 'The Gods Are Not Gods', secret: 'The beings worshipped as gods are powerful — but not divine. They\'re ancient mortals who found a way to absorb worship as power. Real divinity is something else entirely. Something they\'re hiding from.', whoKnows: 'The "gods" themselves. One mortal scholar (who was immediately killed, but left notes).', whatChanges: 'EVERYTHING about religion, divine magic, and the afterlife. Clerics still get power — but from WHERE? And what happens when the real divine notices the imposters?', discoveryMethod: 'The scholar\'s notes are scattered across 5 libraries. Assembled, they prove the truth. The "gods" will do anything to prevent assembly.' },
];
export function getRandomSecret(): WorldSecret { return SECRETS[Math.floor(Math.random() * SECRETS.length)]; }
export function getSecretsByScope(s: SecretScope): WorldSecret[] { return SECRETS.filter((sec) => sec.scope === s); }
export function getAllSecretScopes(): SecretScope[] { return ['local', 'regional', 'continental', 'cosmic']; }
export function formatSecret(s: WorldSecret, reveal: boolean = false): string {
  const icon = { local: '🏘️', regional: '🗺️', continental: '🌍', cosmic: '🌌' }[s.scope];
  const lines = [`${icon} **${s.title}** *(${s.scope})*`];
  if (reveal) { lines.push(`  🔒 ${s.secret}`); lines.push(`  👤 Who knows: ${s.whoKnows}`); lines.push(`  💥 Changes: ${s.whatChanges}`); }
  lines.push(`  🔍 Discovery: ${s.discoveryMethod}`); return lines.join('\n');
}
export { SECRETS as WORLD_SECRETS };
