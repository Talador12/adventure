// Random scar generator — battle scars and marks for characters/NPCs.
export interface Scar { location: string; appearance: string; origin: string; story: string; }
const SCARS: Scar[] = [
  { location: 'Across the left cheek', appearance: 'A thin white line, old and faded.', origin: 'A duel years ago.', story: '"I won, if you\'re wondering."' },
  { location: 'Right hand, missing finger', appearance: 'Clean cut — removed by a blade, not an accident.', origin: 'Payment for a debt.', story: '"Some debts cost more than gold."' },
  { location: 'Burn marks on forearms', appearance: 'Mottled, pink skin from wrists to elbows.', origin: 'A house fire.', story: '"I pulled my sister out. The walls came down after."' },
  { location: 'Deep gash across the throat', appearance: 'Thick, raised scar tissue. Clearly should have been fatal.', origin: 'An assassination attempt.', story: '"They didn\'t finish the job. I returned the favor."' },
  { location: 'Claw marks down the back', appearance: 'Four parallel grooves, still slightly red.', origin: 'An owlbear attack.', story: '"I don\'t go into forests anymore."' },
  { location: 'A brand on the shoulder', appearance: 'A symbol burned into the skin — a closed eye.', origin: 'A cult initiation.', story: '"A past life. I\'m different now. Mostly."' },
  { location: 'Bite mark on the calf', appearance: 'Ragged and deep. The teeth marks are still visible.', origin: 'A werewolf, during a full moon.', story: '"No, I didn\'t turn. But I still check every full moon."' },
  { location: 'A perfectly round scar on the palm', appearance: 'Smooth, silver-colored skin. Unnaturally symmetrical.', origin: 'Touched a magical artifact.', story: '"It showed me something. I don\'t talk about what."' },
];
export function getRandomScar(): Scar { return SCARS[Math.floor(Math.random() * SCARS.length)]; }
export function formatScar(s: Scar): string { return `🩹 **Scar:**\n📍 ${s.location} — *${s.appearance}*\n📖 Origin: ${s.origin}\n💬 ${s.story}`; }
