// Magical heist complication — random obstacles, twists, and disasters during heist missions.

export type ComplicationType = 'alarm' | 'guard' | 'trap' | 'betrayal' | 'environmental' | 'arcane';
export type Severity = 'minor' | 'major' | 'catastrophic';

export interface HeistComplication {
  name: string;
  type: ComplicationType;
  severity: Severity;
  description: string;
  mechanicalEffect: string;
  counterplay: string[];
  makesItWorse: string;
  funFactor: number; // 1-5
}

const COMPLICATIONS: HeistComplication[] = [
  { name: 'The Chatty Painting', type: 'alarm', severity: 'minor', description: 'A portrait on the wall opens its eyes and asks "Who are you?" in a very loud voice. It is genuinely curious, not hostile. But it does not understand "shh."', mechanicalEffect: 'All creatures within 60 feet make DC 12 Perception check to hear. Guards investigate in 1d4 rounds.', counterplay: ['Silence spell covers it perfectly', 'Answer its questions - it shuts up if entertained (DC 14 Persuasion)', 'Cut it from the frame and take it with you (it loves field trips)'], makesItWorse: 'Threatening the painting makes it scream. All guards in the building are alerted.', funFactor: 4 },
  { name: 'Gravity Reversal Hallway', type: 'arcane', severity: 'major', description: 'The corridor ahead has reverse gravity. Everything on the ceiling is bolted down. The original floor (now above you) has pressure plates.', mechanicalEffect: 'Fall 20 feet upward (2d6 damage). Walking on the ceiling triggers pressure plates (DC 15 Dex to avoid, triggers alarm).', counterplay: ['Fly or levitate through the corridor', 'Dispel Magic on the section (DC 15)', 'Crawl slowly on the ceiling, disabling plates as you go (DC 14 Thieves\' Tools, 3 checks)'], makesItWorse: 'Dispelling from the wrong position means you fall back down and then up again. 4d6 total.', funFactor: 3 },
  { name: 'The Inside Man Flipped', type: 'betrayal', severity: 'catastrophic', description: 'Your inside contact has been turned. They are leading you into a prepared ambush disguised as the "safe route."', mechanicalEffect: 'Party walks into a room with 6 guards, 2 mages, and manacles bolted to the walls. Surprise round goes to the enemies.', counterplay: ['Insight check DC 16 on the contact reveals nervous tells before entering the room', 'Scout ahead with Familiar or invisible ally', 'Have a backup exit planned (requires earlier planning phase)'], makesItWorse: 'If you told the contact your full plan, they know your escape route too. It is also compromised.', funFactor: 2 },
  { name: 'The Vault Has Feelings', type: 'arcane', severity: 'major', description: 'The vault door is a mimic. Not a hostile one. It is lonely and wants to talk. It will open if you become its friend. It will NOT open if you try to pick it.', mechanicalEffect: 'Thieves\' Tools automatically fail. Attack rolls against the vault door cause it to grow teeth and bite back (2d10+5). Friendship requires 3 successful DC 13 Persuasion checks across 10 minutes of conversation.', counterplay: ['Talk to it. Ask about its day. It likes compliments about its hinges.', 'Offer it something to eat (mimics like the taste of copper coins)', 'Promise to visit again (it will hold you to this)'], makesItWorse: 'Insulting the vault makes it seal permanently for 24 hours and cry loudly enough to alert guards.', funFactor: 5 },
  { name: 'Shift Change Early', type: 'guard', severity: 'minor', description: 'The guard shift changed 30 minutes early because the night captain has a date. The "safe window" is gone. Fresh guards are in every planned corridor.', mechanicalEffect: 'All planned guard-free routes now have 1d2 guards. Stealth DCs increase by 3 for the rest of the heist.', counterplay: ['Create a distraction (fire, noise, illusion) to pull guards away', 'Switch to the rooftop route (requires Athletics DC 14 to climb)', 'Disguise as guards using stolen uniforms (requires earlier acquisition)'], makesItWorse: 'The night captain\'s date is with the garrison commander. If the alarm sounds, response time is halved.', funFactor: 3 },
  { name: 'The Object Is Not Here', type: 'environmental', severity: 'catastrophic', description: 'You reach the vault, bypass every trap, and open the case. It is empty. A note reads: "Moved to the summer estate. - M"', mechanicalEffect: 'The target object is in a different location entirely. The heist must be abandoned or redirected. All effort so far is sunk cost.', counterplay: ['The note reveals the summer estate location - plan a second heist', 'Search the office for records of exactly when it was moved (it might still be in transit)', 'The empty vault has other valuables - pivot to a consolation prize'], makesItWorse: 'The guards know someone was here. The summer estate will double security within the week.', funFactor: 2 },
  { name: 'Pocket Dimension Pocket', type: 'arcane', severity: 'major', description: 'The vault is bigger on the inside. Much bigger. It is a pocket dimension with its own ecosystem. The treasure is somewhere in a 1-mile radius.', mechanicalEffect: 'Navigating the pocket dimension takes 1d4 hours. Random encounters inside: 1d6 animated armors patrolling, 1 invisible stalker, and the treasure chest runs away on tiny legs.', counterplay: ['Locate Object spell points straight to the target', 'Tracker or ranger can follow the chest\'s tiny footprints (DC 15 Survival)', 'Collapse the pocket dimension from outside (DC 17 Arcana, everything inside ejects violently)'], makesItWorse: 'Time moves differently. Each hour inside is 10 minutes outside. You might exit to find the heist was discovered.', funFactor: 4 },
  { name: 'Magnetic Ceiling', type: 'trap', severity: 'minor', description: 'The treasure room ceiling is powerfully magnetized. All metal objects fly upward and stick. Armor, weapons, lockpicks, coins - all gone.', mechanicalEffect: 'All metal items stuck to ceiling (30 feet up). AC reduced by armor bonus. Metal weapon attacks impossible. Lockpicks unavailable.', counterplay: ['Use wooden or bone tools (DC 12 improvised thieves\' tools)', 'Dispel Magic on the ceiling (DC 14)', 'Wear no metal armor - monks and druids are unaffected'], makesItWorse: 'The ceiling recharges every 6 seconds. Climbing up to retrieve items means being stuck yourself (STR DC 18 to pull free).', funFactor: 4 },
];

export function getRandomComplication(): HeistComplication {
  return COMPLICATIONS[Math.floor(Math.random() * COMPLICATIONS.length)];
}

export function getComplicationsByType(type: ComplicationType): HeistComplication[] {
  return COMPLICATIONS.filter((c) => c.type === type);
}

export function getComplicationsBySeverity(severity: Severity): HeistComplication[] {
  return COMPLICATIONS.filter((c) => c.severity === severity);
}

export function getMostFun(): HeistComplication {
  return COMPLICATIONS.reduce((best, c) => (c.funFactor > best.funFactor ? c : best));
}

export function getAllTypes(): ComplicationType[] {
  return [...new Set(COMPLICATIONS.map((c) => c.type))];
}

export function formatComplication(comp: HeistComplication): string {
  const severity = comp.severity === 'catastrophic' ? '🔴' : comp.severity === 'major' ? '🟡' : '🟢';
  const lines = [`${severity} **${comp.name}** *(${comp.type}, ${comp.severity})*`];
  lines.push(`  ${comp.description}`);
  lines.push(`  Effect: ${comp.mechanicalEffect}`);
  lines.push('  Counterplay:');
  for (const c of comp.counterplay) {
    lines.push(`    - ${c}`);
  }
  lines.push(`  ⚠️ Makes it worse: ${comp.makesItWorse}`);
  lines.push(`  Fun factor: ${'⭐'.repeat(comp.funFactor)}`);
  return lines.join('\n');
}

export { COMPLICATIONS as HEIST_COMPLICATIONS };
