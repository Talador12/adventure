// Random character weakness — personal flaws that create roleplay opportunities.
export interface CharacterWeakness { weakness: string; trigger: string; mechanicalEffect: string; roleplayNote: string; }
const WEAKNESSES: CharacterWeakness[] = [
  { weakness: 'Arachnophobia', trigger: 'Seeing any spider or spider-like creature.', mechanicalEffect: 'WIS DC 12 or Frightened for 1 round. -2 to attacks against spiders.', roleplayNote: 'Play it for comedy at first, drama when it matters.' },
  { weakness: 'Greedy', trigger: 'Seeing valuable treasure or being offered gold.', mechanicalEffect: 'WIS DC 13 or must attempt to acquire/steal it.', roleplayNote: 'Great for creating party tension. Not evil — just impulsive.' },
  { weakness: 'Truthful to a fault', trigger: 'Being asked a direct question.', mechanicalEffect: 'Deception checks automatically fail. Can refuse to answer but can\'t lie.', roleplayNote: 'Forces creative solutions when lying would be easier.' },
  { weakness: 'Overprotective', trigger: 'An ally taking damage or being threatened.', mechanicalEffect: 'Must use next action to help/defend the ally, even if tactically unwise.', roleplayNote: 'Beautiful for bonding moments. Tragic when it causes problems.' },
  { weakness: 'Haunted by guilt', trigger: 'Seeing someone in a similar situation to their past failure.', mechanicalEffect: 'Disadvantage on WIS saves in the triggering situation.', roleplayNote: 'Tie to backstory. Overcoming this IS the character arc.' },
  { weakness: 'Competitive', trigger: 'Being challenged or seeing someone do something better.', mechanicalEffect: 'Must attempt to one-up them. Advantage on the attempt but -2 AC (reckless).', roleplayNote: 'Fun with the rivalry system. Good-natured but can get out of hand.' },
];
export function getRandomWeakness(): CharacterWeakness { return WEAKNESSES[Math.floor(Math.random() * WEAKNESSES.length)]; }
export function formatWeakness(w: CharacterWeakness): string { return `💔 **Character Weakness:** ${w.weakness}\n⚡ Trigger: ${w.trigger}\n⚙️ ${w.mechanicalEffect}\n🎭 RP Note: *${w.roleplayNote}*`; }
