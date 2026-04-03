// Random side mission generator — quick one-session mini-quests.
export interface SideMission { title: string; briefing: string; objective: string; twist: string; reward: string; timeLimit: string; }
const MISSIONS: SideMission[] = [
  { title: 'The Missing Heirloom', briefing: 'A noble\'s family ring was stolen from their manor last night.', objective: 'Find and return the ring.', twist: 'The "thief" is the noble\'s own child, who sold it to pay a debt.', reward: '100gp + noble\'s favor', timeLimit: '24 hours' },
  { title: 'Rat Problem', briefing: 'The tavern cellar is infested with unusually large rats.', objective: 'Clear the cellar.', twist: 'The rats are being directed by a druid protesting the tavern\'s expansion.', reward: '25gp + free drinks for a month', timeLimit: 'Before tonight\'s dinner rush' },
  { title: 'The Delivery', briefing: 'A sealed package must reach the next town before dawn.', objective: 'Deliver the package unopened.', twist: 'The package contains evidence of a crime. Multiple parties want it.', reward: '200gp', timeLimit: 'By dawn' },
  { title: 'Guard Duty', briefing: 'A merchant needs bodyguards for a single day at the market.', objective: 'Protect the merchant from thieves.', twist: 'The merchant is the thief — they\'re using the party as cover for a heist.', reward: '75gp + a discount on wares', timeLimit: '1 day' },
  { title: 'The Duel', briefing: 'A local champion challenges the strongest party member to a public duel.', objective: 'Win (or survive) the duel.', twist: 'The champion is being blackmailed into fighting. They don\'t want to.', reward: 'Title of Champion + 50gp', timeLimit: 'Noon tomorrow' },
  { title: 'Lost Pet', briefing: 'A wizard\'s familiar has escaped and is causing minor havoc.', objective: 'Catch the familiar without hurting it.', twist: 'The familiar is fleeing because the wizard is actually its captor, not its partner.', reward: '150gp or the familiar\'s freedom', timeLimit: 'Before it leaves town' },
];
export function getRandomMission(): SideMission { return MISSIONS[Math.floor(Math.random() * MISSIONS.length)]; }
export function formatMission(m: SideMission): string { return `📋 **Side Mission: ${m.title}**\n📝 ${m.briefing}\n🎯 Objective: ${m.objective}\n⏰ Time: ${m.timeLimit} | 💰 Reward: ${m.reward}\n🤫 Twist: ${m.twist}`; }
