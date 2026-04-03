// Random background generator — quick character background for NPCs or quick-build PCs.
export interface QuickBackground { background: string; trait: string; ideal: string; bond: string; flaw: string; }
const BGs: QuickBackground[] = [
  { background: 'Soldier', trait: 'I\'m always polite and respectful.', ideal: 'Responsibility. I do what I must and obey authority.', bond: 'Those who fight beside me are worth dying for.', flaw: 'I obey the law even when it doesn\'t make sense.' },
  { background: 'Criminal', trait: 'I always have a plan for what to do when things go wrong.', ideal: 'Freedom. Chains are meant to be broken.', bond: 'Someone I loved died because of a mistake I made.', flaw: 'If there\'s a plan, I\'ll forget it. If I don\'t forget it, I\'ll ignore it.' },
  { background: 'Noble', trait: 'My favor, once lost, is lost forever.', ideal: 'Power. If I can attain more power, no one can tell me what to do.', bond: 'I will face any challenge to win the approval of my family.', flaw: 'I secretly believe everyone is beneath me.' },
  { background: 'Sage', trait: 'I\'m used to helping out those who aren\'t as smart as I am.', ideal: 'Knowledge. The path to power is through knowledge.', bond: 'I\'ve been searching for a specific tome for years.', flaw: 'I speak without thinking and constantly insult others.' },
  { background: 'Acolyte', trait: 'I see omens in every event and action.', ideal: 'Faith. I trust my deity to guide me through anything.', bond: 'I owe my life to the priest who took me in as an orphan.', flaw: 'I judge others harshly, and myself even more so.' },
  { background: 'Outlander', trait: 'I feel more comfortable around animals than people.', ideal: 'Nature. The natural world is more important than civilization.', bond: 'I am the last of my tribe and must preserve their ways.', flaw: 'Violence is my answer to almost any challenge.' },
];
export function getRandomBackground(): QuickBackground { return BGs[Math.floor(Math.random() * BGs.length)]; }
export function formatBackground(bg: QuickBackground): string { return `📋 **Quick Background: ${bg.background}**\n🎭 Trait: *${bg.trait}*\n⭐ Ideal: *${bg.ideal}*\n❤️ Bond: *${bg.bond}*\n💔 Flaw: *${bg.flaw}*`; }
