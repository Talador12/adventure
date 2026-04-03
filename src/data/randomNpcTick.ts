// Random NPC nervous tick/habit — subtle character details.
export const NPC_TICKS: string[] = [
  'Constantly cleans their fingernails with a small knife.',
  'Tugs on their earlobe when thinking.',
  'Taps their foot in a steady rhythm — always the same beat.',
  'Cracks their knuckles before speaking.',
  'Touches a pendant around their neck every few minutes, like checking it\'s still there.',
  'Blinks excessively when lying.',
  'Rubs the bridge of their nose when frustrated.',
  'Always stands with their back to a wall — never in the open.',
  'Smells food before eating it, even in polite company.',
  'Draws small circles on any surface with their finger while talking.',
  'Adjusts their hat/hood constantly, even indoors.',
  'Counts steps under their breath when walking.',
  'Chews the inside of their cheek when nervous.',
  'Never makes eye contact for more than 2 seconds.',
  'Whistles the same four-note tune unconsciously.',
];
export function getRandomTick(): string { return NPC_TICKS[Math.floor(Math.random() * NPC_TICKS.length)]; }
export function formatNpcTick(): string { return `🎭 **NPC Habit:** *${getRandomTick()}*`; }
