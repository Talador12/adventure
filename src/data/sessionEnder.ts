// Session ender — cliffhanger moments to end a session on.
export type CliffhangerType = 'revelation' | 'danger' | 'choice' | 'arrival' | 'loss' | 'mystery';
export interface SessionEnder { type: CliffhangerType; title: string; setup: string; finalLine: string; dmInstruction: string; }
const ENDERS: SessionEnder[] = [
  { type: 'revelation', title: 'The Letter', setup: 'As the party settles for the night, a raven lands with a sealed message. The seal belongs to someone who should be dead.', finalLine: '"It reads: \'I know what you did at [location from 5 sessions ago]. Meet me at midnight. Come alone.\' ...And that\'s where we\'ll pick up next time."', dmInstruction: 'Close the book. Smile. Say nothing else. Let them stew for a WEEK.' },
  { type: 'danger', title: 'The Army on the Horizon', setup: 'The party crests the final hill. Their destination is in sight. So is the army camped between them and it.', finalLine: '"You count the campfires. There are... a lot of campfires. And that\'s where we stop."', dmInstruction: 'Let them see the problem but not the solution. They\'ll plan all week.' },
  { type: 'choice', title: 'The Fork', setup: 'Two people the party cares about are in danger. Different directions. Same deadline. You can\'t save both.', finalLine: '"You have until dawn. East or west. ...Think about it. We\'ll start there next week."', dmInstruction: 'End BEFORE they decide. The decision should haunt them between sessions.' },
  { type: 'arrival', title: 'The Knock', setup: 'A quiet evening. The party is resting. Then: three knocks at the door. Slow. Deliberate.', finalLine: '"You open the door. And standing there is... *long pause* ...we\'ll find out next week."', dmInstruction: 'The cruelest cliffhanger. They don\'t even know WHO it is. Perfect.' },
  { type: 'loss', title: 'The Fall', setup: 'In the final moment of a hard fight, the bridge collapses. An ally falls. You grab their hand. They look up at you.', finalLine: '"Their grip slips. And... we\'ll see what happens next time." End session.', dmInstruction: 'Do NOT confirm if the ally survives. Let hope and dread coexist for a week.' },
  { type: 'mystery', title: 'The Mirror', setup: 'The party finds a mirror in the dungeon. A normal mirror. Except their reflections aren\'t moving the same way.', finalLine: '"Your reflection smiles. You\'re not smiling. ...See you next week."', dmInstruction: 'Don\'t explain. Don\'t foreshadow further. Just END it. The less you say, the more they imagine.' },
];
export function getRandomEnder(): SessionEnder { return ENDERS[Math.floor(Math.random() * ENDERS.length)]; }
export function getEndersByType(t: CliffhangerType): SessionEnder[] { return ENDERS.filter((e) => e.type === t); }
export function getAllCliffhangerTypes(): CliffhangerType[] { return [...new Set(ENDERS.map((e) => e.type))]; }
export function formatEnder(e: SessionEnder): string {
  const icon = { revelation: '📜', danger: '⚔️', choice: '⚖️', arrival: '🚪', loss: '💔', mystery: '🪞' }[e.type];
  return `${icon} **${e.title}** *(${e.type})*\n  Setup: ${e.setup}\n  💬 *${e.finalLine}*\n  🎯 DM: ${e.dmInstruction}`;
}
export { ENDERS as SESSION_ENDERS };
