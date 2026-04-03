// Random cause of death — for NPCs, backstory events, or mystery investigations.
export interface CauseOfDeath { cause: string; evidence: string; suspiciousLevel: 'natural' | 'suspicious' | 'obvious_murder'; investigationDC: number; }
const CAUSES: CauseOfDeath[] = [
  { cause: 'Poison — slow-acting, administered in wine.', evidence: 'Bluish lips. Residue in the goblet.', suspiciousLevel: 'suspicious', investigationDC: 14 },
  { cause: 'Stab wound to the back — single, precise strike.', evidence: 'The weapon was thin — a stiletto or rapier.', suspiciousLevel: 'obvious_murder', investigationDC: 8 },
  { cause: 'Heart failure — appears natural.', evidence: 'No marks. No signs of struggle.', suspiciousLevel: 'natural', investigationDC: 18 },
  { cause: 'Strangled — bruising around the throat.', evidence: 'Finger marks suggest a strong, right-handed attacker.', suspiciousLevel: 'obvious_murder', investigationDC: 10 },
  { cause: 'Fall from height — pushed or jumped?', evidence: 'Defensive wounds on the hands suggest a struggle.', suspiciousLevel: 'suspicious', investigationDC: 13 },
  { cause: 'Magical — residual necromantic energy detected.', evidence: 'Detect Magic reveals fading death magic. No physical wound.', suspiciousLevel: 'suspicious', investigationDC: 16 },
  { cause: 'Drowning — but far from any body of water.', evidence: 'Water in the lungs. No explanation for how.', suspiciousLevel: 'suspicious', investigationDC: 15 },
  { cause: 'Old age — peacefully in their sleep.', evidence: 'Genuinely died of natural causes. But the timing is convenient.', suspiciousLevel: 'natural', investigationDC: 20 },
];
export function getRandomCauseOfDeath(): CauseOfDeath { return CAUSES[Math.floor(Math.random() * CAUSES.length)]; }
export function formatCauseOfDeath(c: CauseOfDeath): string { return `💀 **Cause of Death** (${c.suspiciousLevel}):\n${c.cause}\n🔍 Evidence: ${c.evidence}\n🎲 Investigation DC: ${c.investigationDC}`; }
