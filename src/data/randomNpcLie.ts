// Random NPC lie — what they say vs. the truth. Insight DC to detect.
export interface NpcLie { lie: string; truth: string; insightDC: number; motivation: string; }
const LIES: NpcLie[] = [
  { lie: '"I\'ve never been to that place."', truth: 'They go there weekly. It\'s where they meet their contact.', insightDC: 13, motivation: 'Protecting someone.' },
  { lie: '"The road ahead is perfectly safe."', truth: 'They know about the bandits. They get a cut of the loot.', insightDC: 14, motivation: 'Profit.' },
  { lie: '"I found this item. It was just lying there."', truth: 'They stole it from a temple.', insightDC: 12, motivation: 'Greed.' },
  { lie: '"I don\'t know anything about the disappearances."', truth: 'They witnessed one. Too afraid to talk.', insightDC: 11, motivation: 'Fear.' },
  { lie: '"We\'re old friends." *gestures to another NPC*', truth: 'They met yesterday. This is a business arrangement.', insightDC: 15, motivation: 'Credibility.' },
  { lie: '"I\'m a simple merchant, nothing more."', truth: 'They\'re a retired assassin.', insightDC: 16, motivation: 'Survival.' },
];
export function getRandomLie(): NpcLie { return LIES[Math.floor(Math.random() * LIES.length)]; }
export function formatNpcLie(l: NpcLie, showTruth: boolean = true): string { let text = `🤥 **NPC says:** *${l.lie}*`; if (showTruth) text += `\n✅ Truth: ${l.truth}\n🎲 Insight DC ${l.insightDC}\n💭 Motivation: ${l.motivation}`; else text += `\n🎲 Insight DC ${l.insightDC} to detect.`; return text; }
