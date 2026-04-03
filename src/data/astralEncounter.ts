// Astral projection encounter table — encounters unique to out-of-body astral travel.

export type AstralZone = 'silver_void' | 'color_pools' | 'dead_god_remains' | 'psychic_storm' | 'memory_currents' | 'githyanki_territory';

export interface AstralEncounter {
  name: string;
  zone: AstralZone;
  description: string;
  reaction: 'hostile' | 'neutral' | 'friendly' | 'enigmatic';
  cr: string;
  silverCordRisk: boolean; // can this encounter sever the silver cord?
  mechanicalEffect: string;
  loot: string | null;
}

const ENCOUNTERS: AstralEncounter[] = [
  { name: 'The Lost Traveler', zone: 'silver_void', description: 'A translucent figure drifts aimlessly, silver cord trailing behind. They\'ve been here for what feels like years. They\'re from your world.', reaction: 'friendly', cr: 'N/A', silverCordRisk: false, mechanicalEffect: 'Can share information about the Astral Plane. Knows a safe route. Will beg you to find their body.', loot: 'Their signet ring (worth 50gp, but returning it to their family is worth more).' },
  { name: 'Githyanki Patrol', zone: 'githyanki_territory', description: 'Three githyanki warriors on silver swords. They spot your silver cords immediately — projectors, not true travelers.', reaction: 'hostile', cr: 'CR 8 (3 gith warriors)', silverCordRisk: true, mechanicalEffect: 'If they win initiative, one attempts to sever a cord (silver sword, auto-kills if successful). Projectors are priority targets.', loot: 'Silver sword (if somehow claimed — worth 10,000gp, but the githyanki WILL come for it).' },
  { name: 'Color Pool to the Feywild', zone: 'color_pools', description: 'A shimmering pool of shifting green and gold. Through it, you see an endless forest bathed in twilight. Music drifts through.', reaction: 'neutral', cr: 'N/A', silverCordRisk: false, mechanicalEffect: 'Stepping through takes you physically to the Feywild (silver cord snaps safely). Returning requires finding another pool.', loot: null },
  { name: 'Dead God\'s Eye', zone: 'dead_god_remains', description: 'The corpse of a forgotten god drifts in the void. One enormous eye stares, still faintly luminous. It sees you.', reaction: 'enigmatic', cr: 'N/A (the god is dead... mostly)', silverCordRisk: false, mechanicalEffect: 'WIS DC 16 save. Fail: receive a cryptic vision (DM chooses — prophecy, warning, or forbidden knowledge). Success: feel only sadness.', loot: 'A fragment of divine power (if harvested — Religion DC 18). Grants one casting of a 7th-level cleric spell.' },
  { name: 'Psychic Wind', zone: 'psychic_storm', description: 'A screaming vortex of raw thought-energy barrels toward you. There is no sound, but your mind HEARS it.', reaction: 'hostile', cr: 'Environmental hazard', silverCordRisk: true, mechanicalEffect: 'INT DC 15 save. Fail: 6d6 psychic damage + teleported 1d100 × 10 miles in random direction. Nat 1: silver cord stressed (CHA DC 12 or severed).', loot: null },
  { name: 'Memory Eddy', zone: 'memory_currents', description: 'A swirling pool of crystallized memories. You see fragments of lives — births, battles, last words. One memory is yours but you don\'t recognize it.', reaction: 'neutral', cr: 'N/A', silverCordRisk: false, mechanicalEffect: 'Spend 1 hour observing: learn one piece of historical information the DM chooses. Spend 4 hours: find a personal memory you\'d lost.', loot: 'A memory crystal (worth 100gp to a sage, or keep it — it replays one perfect moment forever).' },
  { name: 'Astral Dreadnought', zone: 'silver_void', description: 'It fills your entire field of vision. An eye the size of a castle. A mouth that could swallow a ship. It turns toward you.', reaction: 'hostile', cr: 'CR 21', silverCordRisk: true, mechanicalEffect: 'Severing Claw: on hit, CHA DC 20 or silver cord is severed. Antimagic Cone from its eye. Do NOT fight this. RUN.', loot: 'Nothing. You do not loot an astral dreadnought. An astral dreadnought loots you.' },
  { name: 'Tu\'narath Market', zone: 'githyanki_territory', description: 'A massive githyanki city built on the corpse of a dead god. A market district buzzes with interplanar commerce. Not all merchants are githyanki.', reaction: 'neutral', cr: 'N/A (city, various)', silverCordRisk: false, mechanicalEffect: 'Can trade, buy exotic items, and gather information. Prices are 3× normal but items from any plane are available. CHA DC 14 to avoid scams.', loot: 'Whatever you can afford. Unique astral items: Thought Bottles, Dream Silk, Planar Compasses.' },
  { name: 'The Thought Eater', zone: 'psychic_storm', description: 'A flickering ethereal creature that feeds on stray thoughts. It\'s drawn to spellcasters like a moth to flame.', reaction: 'hostile', cr: 'CR 2 (but devastating to unprepared casters)', silverCordRisk: false, mechanicalEffect: 'On hit: drains one prepared spell (random). On kill: restores stolen spells. If ignored, follows the party and steals one spell per hour.', loot: 'Thought essence (50gp, used in crafting Headbands of Intellect).' },
  { name: 'The Silver Thread Weaver', zone: 'memory_currents', description: 'A serene entity made of woven silver threads. It repairs damaged silver cords for a price — a memory you cherish.', reaction: 'friendly', cr: 'N/A', silverCordRisk: false, mechanicalEffect: 'Will repair a damaged or stressed silver cord. Payment: one cherished memory (permanently forgotten). Can also strengthen cords for future protection.', loot: null },
];

export function getRandomAstralEncounter(): AstralEncounter {
  return ENCOUNTERS[Math.floor(Math.random() * ENCOUNTERS.length)];
}

export function getEncountersByZone(zone: AstralZone): AstralEncounter[] {
  return ENCOUNTERS.filter((e) => e.zone === zone);
}

export function getCordDangerEncounters(): AstralEncounter[] {
  return ENCOUNTERS.filter((e) => e.silverCordRisk);
}

export function getSafeEncounters(): AstralEncounter[] {
  return ENCOUNTERS.filter((e) => !e.silverCordRisk && e.reaction !== 'hostile');
}

export function getAllAstralZones(): AstralZone[] {
  return [...new Set(ENCOUNTERS.map((e) => e.zone))];
}

export function formatAstralEncounter(encounter: AstralEncounter): string {
  const icon = { hostile: '⚔️', neutral: '❔', friendly: '💬', enigmatic: '🌀' }[encounter.reaction];
  const cord = encounter.silverCordRisk ? ' ⚠️ CORD RISK' : '';
  const lines = [`${icon} **${encounter.name}** *(${encounter.zone.replace(/_/g, ' ')})*${cord}`];
  lines.push(`  *${encounter.description}*`);
  lines.push(`  CR: ${encounter.cr} | Reaction: ${encounter.reaction}`);
  lines.push(`  ⚙️ ${encounter.mechanicalEffect}`);
  if (encounter.loot) lines.push(`  💰 ${encounter.loot}`);
  return lines.join('\n');
}

export { ENCOUNTERS as ASTRAL_ENCOUNTERS };
