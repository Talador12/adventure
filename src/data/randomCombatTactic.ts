// Random enemy combat tactic — how smart enemies fight.
export interface CombatTactic { tactic: string; intelligence: 'low' | 'medium' | 'high' | 'genius'; execution: string; counterplay: string; }
const TACTICS: CombatTactic[] = [
  { tactic: 'Focus fire on the weakest-looking party member.', intelligence: 'medium', execution: 'All enemies target the character with lowest AC or HP.', counterplay: 'Tank positions to intercept. Healing on standby.' },
  { tactic: 'Retreat to a chokepoint and hold the line.', intelligence: 'high', execution: 'Fall back to a narrow corridor. Only 1-2 attackers can engage.', counterplay: 'AoE spells. Flanking through alternate routes.' },
  { tactic: 'Rush the spellcaster.', intelligence: 'medium', execution: 'Two or more enemies bypass the frontline to attack the caster.', counterplay: 'Caster uses Shield/Misty Step. Frontline uses Sentinel/OA.' },
  { tactic: 'Grapple and drag off a PC.', intelligence: 'high', execution: 'Strong enemies grapple, then drag the PC toward a hazard.', counterplay: 'Athletics contest. Allies use Help action.' },
  { tactic: 'Use the terrain.', intelligence: 'genius', execution: 'Knock over pillars, cut ropes, push PCs into hazards.', counterplay: 'Awareness. Perception checks. Don\'t stand near hazards.' },
  { tactic: 'Feigned retreat to draw PCs into an ambush.', intelligence: 'genius', execution: 'Enemies flee, leading the party into a prepared kill zone.', counterplay: 'Insight DC 15 notices the retreat is too organized.' },
  { tactic: 'Swarm tactics — surround and overwhelm.', intelligence: 'low', execution: 'All enemies move to surround a single target. Flanking advantage.', counterplay: 'Keep the party\'s back to a wall. AoE clears groups.' },
];
export function getRandomTactic(): CombatTactic { return TACTICS[Math.floor(Math.random() * TACTICS.length)]; }
export function formatCombatTactic(t: CombatTactic): string { return `🧠 **Enemy Tactic** (${t.intelligence} INT):\n${t.tactic}\n⚔️ Execution: ${t.execution}\n🛡️ Counterplay: ${t.counterplay}`; }
