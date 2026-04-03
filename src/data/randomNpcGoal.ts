// Random NPC goal — what does this NPC want right now?
export interface NpcGoal { goal: string; urgency: 'low' | 'medium' | 'high' | 'desperate'; willingToPay: string; obstacle: string; }
const GOALS: NpcGoal[] = [
  { goal: 'Find a missing family member who disappeared 3 days ago.', urgency: 'desperate', willingToPay: 'Everything they have (200gp savings + family heirloom).', obstacle: 'The guard captain says it\'s not worth investigating.' },
  { goal: 'Get a message delivered to the next town before the road closes for winter.', urgency: 'high', willingToPay: '50gp + a favor.', obstacle: 'The road is reportedly infested with bandits.' },
  { goal: 'Buy a specific rare ingredient for a medicine.', urgency: 'medium', willingToPay: '100gp.', obstacle: 'The only seller is an unpleasant person with a grudge against the NPC.' },
  { goal: 'Learn to read.', urgency: 'low', willingToPay: 'Their labor and loyalty.', obstacle: 'Embarrassment. They don\'t want anyone to know.' },
  { goal: 'Leave this town and never come back.', urgency: 'desperate', willingToPay: 'Will do almost anything — including morally questionable things.', obstacle: 'They owe money to someone who won\'t let them leave.' },
  { goal: 'Prove their innocence before the trial tomorrow.', urgency: 'desperate', willingToPay: 'Freedom itself. Will name the real criminal.', obstacle: 'The evidence has been fabricated by someone powerful.' },
  { goal: 'Find a date for the harvest festival.', urgency: 'low', willingToPay: 'Undying gratitude and baked goods.', obstacle: 'Crippling shyness and a terrible reputation.' },
];
export function getRandomNpcGoal(): NpcGoal { return GOALS[Math.floor(Math.random() * GOALS.length)]; }
export function formatNpcGoal(g: NpcGoal): string { const icon = g.urgency === 'desperate' ? '🔴' : g.urgency === 'high' ? '🟠' : g.urgency === 'medium' ? '🟡' : '🟢'; return `${icon} **NPC Goal** (${g.urgency}):\n🎯 ${g.goal}\n💰 Willing to pay: ${g.willingToPay}\n🚧 Obstacle: ${g.obstacle}`; }
