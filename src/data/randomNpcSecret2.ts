// Random NPC secret — a second pool of deeper, more complex secrets.
export interface DeepSecret { secret: string; ifRevealed: string; howToDiscover: string; whoKnows: string; }
const SECRETS: DeepSecret[] = [
  { secret: 'This NPC is actually two halflings in a trenchcoat.', ifRevealed: 'Embarrassment. They lose all credibility. But it\'s hilarious.', howToDiscover: 'Perception DC 18 notices the coat moves wrong. Or they sneeze simultaneously.', whoKnows: 'Their tailor.' },
  { secret: 'They murdered someone years ago in self-defense, but the evidence makes them look guilty.', ifRevealed: 'They\'ll be arrested and hanged unless the party helps prove the truth.', howToDiscover: 'Investigation DC 14 in the town records. Or the victim\'s ghost knows.', whoKnows: 'One witness who has been blackmailing them.' },
  { secret: 'They\'re a retired adventurer — and their old party is hunting them for betrayal.', ifRevealed: 'Their old party shows up. Combat or negotiation, depending on the party\'s approach.', howToDiscover: 'A scar they hide. An old wanted poster in another town.', whoKnows: 'Bounty hunters in the next city.' },
  { secret: 'They can see the future — briefly, unreliably, and it terrifies them.', ifRevealed: 'People either worship or fear them. Both are dangerous.', howToDiscover: 'They slip up and mention something that hasn\'t happened yet.', whoKnows: 'Their diary, locked in a chest under their bed.' },
  { secret: 'They\'re not from this world. They\'re from Earth. They have a smartphone with 3% battery.', ifRevealed: 'Cosmological crisis. Also, the phone has Google Maps. Only works near ley lines.', howToDiscover: 'They use modern slang. They know what "pizza" is.', whoKnows: 'No one. Yet.' },
];
export function getRandomDeepSecret(): DeepSecret { return SECRETS[Math.floor(Math.random() * SECRETS.length)]; }
export function formatDeepSecret(s: DeepSecret): string { return `🤫 **Deep NPC Secret:**\n*${s.secret}*\n💥 If revealed: ${s.ifRevealed}\n🔍 Discovery: ${s.howToDiscover}\n👤 Who knows: ${s.whoKnows}`; }
