// Random NPC offer — what the NPC proposes to the party.
export interface NpcOffer { offer: string; cost: string; trustLevel: 'trustworthy' | 'suspicious' | 'definitely_a_trap'; hiddenMotivation: string; }
const OFFERS: NpcOffer[] = [
  { offer: '"I know a shortcut through the mountains. Follow me."', cost: '100gp or a favor.', trustLevel: 'suspicious', hiddenMotivation: 'The shortcut is real, but it passes through their territory.' },
  { offer: '"I can get you into the castle. I know a secret entrance."', cost: 'They keep half of whatever you find.', trustLevel: 'suspicious', hiddenMotivation: 'They\'re testing the party for a future heist they\'re planning.' },
  { offer: '"Free healing, no strings attached."', cost: 'Nothing.', trustLevel: 'trustworthy', hiddenMotivation: 'Genuinely kind. Wants to recruit the party for a good cause later.' },
  { offer: '"I have information about your enemy. Very valuable information."', cost: '500gp. Non-negotiable.', trustLevel: 'suspicious', hiddenMotivation: 'The information is real, but incomplete. They\'re selling to both sides.' },
  { offer: '"Come to my shop tonight. I have something... special for adventurers."', cost: 'Varies.', trustLevel: 'definitely_a_trap', hiddenMotivation: 'It\'s an ambush. Or it\'s genuinely rare magic items. 50/50.' },
  { offer: '"Help me move this one crate. Just one. Twenty gold for five minutes of work."', cost: 'Your moral flexibility.', trustLevel: 'definitely_a_trap', hiddenMotivation: 'The crate contains something illegal. The guard patrol is due any minute.' },
];
export function getRandomOffer(): NpcOffer { return OFFERS[Math.floor(Math.random() * OFFERS.length)]; }
export function formatNpcOffer(o: NpcOffer): string { const icon = o.trustLevel === 'trustworthy' ? '🟢' : o.trustLevel === 'suspicious' ? '🟡' : '🔴'; return `${icon} **NPC Offer** (${o.trustLevel}):\n💬 *${o.offer}*\n💰 Cost: ${o.cost}\n🤫 Hidden: ${o.hiddenMotivation}`; }
