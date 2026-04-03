// Random NPC motivation generator — why is this NPC doing what they're doing?
export interface NpcMotivation { motivation: string; category: 'survival' | 'greed' | 'love' | 'revenge' | 'duty' | 'fear' | 'ambition' | 'madness'; hidden: boolean; }
const MOTIVATIONS: NpcMotivation[] = [
  { motivation: 'Needs gold to pay off a dangerous debt.', category: 'survival', hidden: true },
  { motivation: 'Wants revenge for a murdered family member.', category: 'revenge', hidden: true },
  { motivation: 'Genuinely trying to help people.', category: 'duty', hidden: false },
  { motivation: 'Serving a patron they fear more than death.', category: 'fear', hidden: true },
  { motivation: 'Hoarding wealth for an escape plan.', category: 'greed', hidden: true },
  { motivation: 'Protecting a loved one who is in danger.', category: 'love', hidden: true },
  { motivation: 'Seeking power to overthrow a tyrant.', category: 'ambition', hidden: true },
  { motivation: 'Hearing voices that command them to act.', category: 'madness', hidden: true },
  { motivation: 'Simply bored and looking for excitement.', category: 'ambition', hidden: false },
  { motivation: 'Atoning for a terrible past crime.', category: 'duty', hidden: true },
  { motivation: 'Doing their job. Nothing more, nothing less.', category: 'duty', hidden: false },
  { motivation: 'Secretly working for the antagonist.', category: 'fear', hidden: true },
];
export function getRandomMotivation(): NpcMotivation { return MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]; }
export function formatMotivation(m: NpcMotivation, showHidden: boolean = true): string { return `🧠 **NPC Motivation** (${m.category})${m.hidden ? ' 🤫' : ''}:\n${showHidden || !m.hidden ? m.motivation : 'Hidden — requires Insight DC 15 to detect.'}`; }
