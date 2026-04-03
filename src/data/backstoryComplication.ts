// Random backstory complication — mid-session backstory twist generator.

export interface BackstoryComplication {
  complication: string;
  trigger: string; // what causes this to surface
  severity: 'minor' | 'moderate' | 'major';
  category: 'family' | 'enemy' | 'debt' | 'secret' | 'curse' | 'duty';
  suggestedDC?: number; // optional skill check DC to resolve or discover
}

const COMPLICATIONS: BackstoryComplication[] = [
  { complication: 'A sibling you thought dead is very much alive — and very angry.', trigger: 'Entering a new city', severity: 'major', category: 'family', suggestedDC: 15 },
  { complication: 'An old debt collector has finally tracked you down.', trigger: 'Staying at an inn', severity: 'moderate', category: 'debt', suggestedDC: 13 },
  { complication: 'Your former mentor has been spreading lies about you.', trigger: 'Meeting a guild or faction', severity: 'minor', category: 'enemy' },
  { complication: 'The item you carry was stolen from a powerful family. They want it back.', trigger: 'Showing a magic item publicly', severity: 'major', category: 'secret', suggestedDC: 16 },
  { complication: 'A childhood curse manifests — your reflection doesn\'t match your face.', trigger: 'Looking into water or a mirror', severity: 'moderate', category: 'curse', suggestedDC: 14 },
  { complication: 'Your sworn oath to a dying knight demands you protect someone in this town.', trigger: 'Arriving at a settlement', severity: 'moderate', category: 'duty' },
  { complication: 'Wanted posters with your face have appeared in the market.', trigger: 'Visiting a market', severity: 'major', category: 'enemy', suggestedDC: 15 },
  { complication: 'A letter arrives from someone who should have no way to find you.', trigger: 'During a rest', severity: 'minor', category: 'secret' },
  { complication: 'The mark on your hand begins to glow near this location.', trigger: 'Exploring ruins or temples', severity: 'moderate', category: 'curse', suggestedDC: 12 },
  { complication: 'Your parent\'s old adventuring companion recognizes you — and begs for help.', trigger: 'Meeting an NPC', severity: 'moderate', category: 'family', suggestedDC: 11 },
  { complication: 'The organization you escaped sends an assassin.', trigger: 'Camping in the wild', severity: 'major', category: 'enemy', suggestedDC: 16 },
  { complication: 'A sacred vow you forgot about triggers a divine compulsion.', trigger: 'Witnessing injustice', severity: 'moderate', category: 'duty', suggestedDC: 13 },
  { complication: 'Someone mistakes you for a famous criminal.', trigger: 'Entering a tavern', severity: 'minor', category: 'secret' },
  { complication: 'The person you wronged years ago is now in a position of power here.', trigger: 'Dealing with local authority', severity: 'major', category: 'debt', suggestedDC: 14 },
  { complication: 'Your bloodline curse passes to any who sleep near you — an ally wakes changed.', trigger: 'After a long rest', severity: 'major', category: 'curse', suggestedDC: 17 },
  { complication: 'A package arrives: your family heirloom, broken in two. A threat.', trigger: 'During downtime', severity: 'moderate', category: 'family' },
];

export function getRandomComplication(): BackstoryComplication {
  return COMPLICATIONS[Math.floor(Math.random() * COMPLICATIONS.length)];
}

export function getComplicationByCategory(category: BackstoryComplication['category']): BackstoryComplication[] {
  return COMPLICATIONS.filter((c) => c.category === category);
}

export function getComplicationBySeverity(severity: BackstoryComplication['severity']): BackstoryComplication[] {
  return COMPLICATIONS.filter((c) => c.severity === severity);
}

export function formatComplication(c: BackstoryComplication): string {
  const icon = { family: '👪', enemy: '⚔️', debt: '💰', secret: '🤫', curse: '🔮', duty: '⚖️' }[c.category];
  const sev = { minor: '🟢', moderate: '🟡', major: '🔴' }[c.severity];
  const lines = [`${icon} **Backstory Complication** ${sev} (${c.severity})`];
  lines.push(`  *"${c.complication}"*`);
  lines.push(`  Trigger: ${c.trigger}`);
  if (c.suggestedDC) lines.push(`  Suggested DC: ${c.suggestedDC}`);
  return lines.join('\n');
}

export { COMPLICATIONS as BACKSTORY_COMPLICATIONS };
