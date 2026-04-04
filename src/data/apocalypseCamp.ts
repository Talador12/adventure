// Random apocalypse survivor camp — post-disaster settlements with resource management.

export type DisasterType = 'magical_catastrophe' | 'undead_plague' | 'dragon_attack' | 'planar_breach' | 'arcane_winter';

export interface CampResource { name: string; quantity: string; daysRemaining: number; replenishMethod: string; }
export interface CampFaction { name: string; agenda: string; memberCount: number; threat: boolean; }

export interface ApocalypseCamp {
  name: string;
  disasterType: DisasterType;
  population: number;
  location: string;
  morale: string;
  resources: CampResource[];
  factions: CampFaction[];
  immediateThreats: string[];
  longTermPlan: string;
  partyRole: string;
  twist: string;
}

const CAMPS: ApocalypseCamp[] = [
  { name: 'Haven', disasterType: 'undead_plague', population: 200, location: 'An abandoned fortress on a hill. Defensible but cramped.', morale: 'Fragile. Survivors alternate between hope and despair hourly.', resources: [
    { name: 'Food', quantity: '300 rations', daysRemaining: 3, replenishMethod: 'Scavenging runs into the dead city. Dangerous.' },
    { name: 'Clean Water', quantity: '2 barrels', daysRemaining: 5, replenishMethod: 'A well inside the fortress. Might be contaminated (Nature DC 13 to test).' },
    { name: 'Weapons', quantity: '40 swords, 20 bows', daysRemaining: -1, replenishMethod: 'Salvage from the armory district. Heavy undead presence.' },
    { name: 'Medical Supplies', quantity: 'Minimal', daysRemaining: 1, replenishMethod: 'The temple pharmacy was overrun. 3 potions remain.' },
  ], factions: [
    { name: 'The Defenders', agenda: 'Hold the fort. Protect everyone. No one gets left behind.', memberCount: 50, threat: false },
    { name: 'The Runners', agenda: 'Abandon the fortress. Run south. Save who we can carry.', memberCount: 30, threat: false },
    { name: 'The Whisperer\'s Cult', agenda: '"The dead are the future. Join them willingly. It\'s easier."', memberCount: 10, threat: true },
  ], immediateThreats: ['Undead siege — they attack the walls each night. Defenses weaken.', 'The cult is converting desperate people. Growing in secret.', 'A child is showing symptoms of the plague. Quarantine or...?'], longTermPlan: 'Find the source of the plague (a necromancer in the old cathedral) and destroy it.', partyRole: 'The only people capable of reaching the cathedral. The camp\'s last hope.', twist: 'The "necromancer" is already dead. The plague is self-sustaining. Destroying the source means destroying the cathedral itself — which is a holy site. The clerics refuse.' },
  { name: 'The Raft', disasterType: 'arcane_winter', population: 80, location: 'A collection of boats lashed together on a frozen lake. The ice is 2ft thick and growing.', morale: 'Oddly high. Gallows humor is the primary coping mechanism.', resources: [
    { name: 'Food (fish)', quantity: 'Renewable but diminishing', daysRemaining: 14, replenishMethod: 'Ice fishing. Holes freeze over in 1 hour. Fish are getting scarce.' },
    { name: 'Firewood', quantity: '4 cords', daysRemaining: 7, replenishMethod: 'Dismantling non-essential boats. Each boat dismantled reduces housing.' },
    { name: 'Warm Clothing', quantity: 'Barely adequate', daysRemaining: -1, replenishMethod: 'Craft from animal pelts. Hunt on the ice. Wolves also hunt on the ice.' },
  ], factions: [
    { name: 'The Captain', agenda: 'One person makes all decisions. Efficient but authoritarian.', memberCount: 1, threat: false },
    { name: 'The Thaw Seekers', agenda: 'Travel south to find the end of the winter. Send scouts.', memberCount: 20, threat: false },
    { name: 'The Ice Cult', agenda: 'The winter is divine. Embrace it. Build an ice temple.', memberCount: 15, threat: true },
  ], immediateThreats: ['The ice is cracking in the center of the lake. If it breaks, boats sink.', 'Wolves circle the camp at night. Getting bolder.', 'The captain is making increasingly desperate decisions. A mutiny brews.'], longTermPlan: 'Find the source of the arcane winter (a frozen portal to the plane of ice) and close it.', partyRole: 'Scouts, diplomats, and ultimately the ones who reach the portal.', twist: 'The portal is inside a glacier that is actually a frozen ancient dragon. Closing the portal wakes the dragon. The winter was the dragon\'s dream.' },
];

export function getRandomCamp(): ApocalypseCamp {
  return CAMPS[Math.floor(Math.random() * CAMPS.length)];
}

export function getCampsByDisaster(type: DisasterType): ApocalypseCamp[] {
  return CAMPS.filter((c) => c.disasterType === type);
}

export function getCriticalResources(camp: ApocalypseCamp): CampResource[] {
  return camp.resources.filter((r) => r.daysRemaining <= 3);
}

export function getHostileFactions(camp: ApocalypseCamp): CampFaction[] {
  return camp.factions.filter((f) => f.threat);
}

export function getAllDisasterTypes(): DisasterType[] {
  return [...new Set(CAMPS.map((c) => c.disasterType))];
}

export function formatCamp(camp: ApocalypseCamp): string {
  const lines = [`🏕️ **${camp.name}** *(${camp.disasterType.replace(/_/g, ' ')}, pop. ${camp.population})*`];
  lines.push(`  📍 ${camp.location}`);
  lines.push(`  Morale: ${camp.morale}`);
  lines.push('  **Resources:**');
  camp.resources.forEach((r) => lines.push(`  ${r.daysRemaining <= 3 ? '🔴' : '🟢'} ${r.name}: ${r.quantity} (${r.daysRemaining} days)`));
  lines.push(`  🎯 Party role: ${camp.partyRole}`);
  lines.push(`  🔄 Twist: ${camp.twist}`);
  return lines.join('\n');
}

export { CAMPS as APOCALYPSE_CAMPS };
