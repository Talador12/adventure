// Random interplanar travel mishap — what goes wrong during teleportation and plane shifting.

export type MishapSeverity = 'minor' | 'moderate' | 'severe' | 'catastrophic';

export interface TeleportMishap {
  name: string;
  severity: MishapSeverity;
  description: string;
  mechanicalEffect: string;
  duration: string;
  resolution: string;
  funFactor: number; // 1-10 how entertaining this is for the table
}

const MISHAPS: TeleportMishap[] = [
  { name: 'Partial Arrival', severity: 'moderate', description: 'You arrive at the destination. Your clothes arrive 30 seconds later. At a nearby but different location.', mechanicalEffect: 'Naked for 1d4 rounds. -5 AC (no armor). CHA checks at disadvantage (embarrassment).', duration: '1d4 rounds', resolution: 'Find your clothes. They landed on a statue in the town square. The town remembers.', funFactor: 9 },
  { name: 'Time Offset', severity: 'minor', description: 'You arrive at the right place. 1d4 hours late. Or early. Time is weird.', mechanicalEffect: 'Arrive 1d4 hours off schedule. If early, you might meet your past selves (paradox risk).', duration: 'Permanent (time has shifted)', resolution: 'Nothing to fix. You\'re just late. Or unsettlingly early.', funFactor: 5 },
  { name: 'Personality Swap', severity: 'moderate', description: 'Two party members arrive in each other\'s bodies. Their minds swapped mid-teleport.', mechanicalEffect: 'Use each other\'s physical stats (STR/DEX/CON) but keep your own mental stats (INT/WIS/CHA). Lasts until long rest.', duration: 'Until long rest', resolution: 'Long rest in close proximity. The swap reverses during sleep. Dreams are weird.', funFactor: 10 },
  { name: 'Altitude Error', severity: 'severe', description: 'Correct X and Y coordinates. Z coordinate is... 200 feet up.', mechanicalEffect: 'Fall 200ft. 20d6 bludgeoning. Feather Fall works if someone reacts fast enough (DC 12 initiative roll).', duration: 'Instant (gravity is quick)', resolution: 'Land. Heal. Complain to whoever cast the teleport.', funFactor: 7 },
  { name: 'Merged with Furniture', severity: 'minor', description: 'You materialize partially inside a piece of furniture. Your hand is in a table. Your foot is in a chair.', mechanicalEffect: 'Restrained until freed. STR DC 13 to pull free (1d6 bludgeoning from splinters). Or just break the furniture.', duration: 'Until freed', resolution: 'Break the furniture. Apologize to the owner. Offer to pay for a new table.', funFactor: 8 },
  { name: 'Dimensional Residue', severity: 'minor', description: 'You passed through another plane on the way. It left a residue. You smell like the Abyss.', mechanicalEffect: 'Detect Evil and Good registers you as fiendish for 24 hours. Paladins are nervous.', duration: '24 hours', resolution: 'Prestidigitation to clean. Or wait. Or explain to every cleric you meet.', funFactor: 6 },
  { name: 'Pocket Dimension Detour', severity: 'severe', description: 'You got stuck in a pocket dimension for what felt like 3 days. It\'s been 6 seconds here.', mechanicalEffect: '3 days of experiences crammed into 6 seconds of real time. Gain a random piece of knowledge. Also: 1 exhaustion.', duration: 'Permanent (the memories are real)', resolution: 'The memories fade to dream-like quality over 1 week. The knowledge remains.', funFactor: 7 },
  { name: 'Mirror Universe Bleed', severity: 'catastrophic', description: 'For a brief moment, you were in a universe where everything is reversed. Your evil twin saw you. They\'re curious.', mechanicalEffect: 'An evil version of one party member now knows they exist. They will find a way to cross over. Eventually.', duration: 'Permanent (the twin is out there)', resolution: 'There is no resolution. Only preparation for when the evil twin arrives.', funFactor: 9 },
];

export function getRandomMishap(): TeleportMishap {
  return MISHAPS[Math.floor(Math.random() * MISHAPS.length)];
}

export function getMishapsBySeverity(severity: MishapSeverity): TeleportMishap[] {
  return MISHAPS.filter((m) => m.severity === severity);
}

export function getFunMishaps(minFun: number): TeleportMishap[] {
  return MISHAPS.filter((m) => m.funFactor >= minFun);
}

export function getAllTeleportSeverities(): MishapSeverity[] {
  return ['minor', 'moderate', 'severe', 'catastrophic'];
}

export function formatMishap(mishap: TeleportMishap): string {
  const sev = { minor: '🟢', moderate: '🟡', severe: '🟠', catastrophic: '🔴' }[mishap.severity];
  const lines = [`${sev} **${mishap.name}** *(${mishap.severity}, fun ${mishap.funFactor}/10)*`];
  lines.push(`  *${mishap.description}*`);
  lines.push(`  ⚙️ ${mishap.mechanicalEffect}`);
  lines.push(`  🔧 Resolution: ${mishap.resolution}`);
  return lines.join('\n');
}

export { MISHAPS as TELEPORT_MISHAPS };
