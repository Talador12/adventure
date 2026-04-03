// Summoning circle mishap table — what goes wrong when planar summoning fails.

export type MishapSeverity = 'amusing' | 'inconvenient' | 'dangerous' | 'catastrophic';

export interface SummoningMishap {
  name: string;
  severity: MishapSeverity;
  description: string;
  mechanicalEffect: string;
  duration: string;
  resolution: string;
}

const MISHAPS: SummoningMishap[] = [
  { name: 'Wrong Number', severity: 'amusing', description: 'You summon the entity\'s cousin by mistake. They\'re confused and mildly offended.', mechanicalEffect: 'A CR 1/4 creature appears. It\'s not hostile — just lost. Will leave if asked politely.', duration: '1 hour', resolution: 'Ask it to leave, or wait.' },
  { name: 'Inverted Summon', severity: 'inconvenient', description: 'Instead of summoning something here, you partially teleport THERE. Your left arm is now in the Abyss.', mechanicalEffect: 'One random limb is invisible and partially in another plane. -2 to attacks with that limb. Feel phantom heat/cold.', duration: 'Until Dispel Magic (DC 14)', resolution: 'Dispel Magic on the caster, or wait 24 hours.' },
  { name: 'Cosmetic Corruption', severity: 'amusing', description: 'The summoning works, but planar energy leaks onto the caster. You now smell like brimstone / flowers / ozone.', mechanicalEffect: 'Strong odor (disadvantage on Stealth vs. creatures with keen smell). Animals react strangely.', duration: '1d4 days', resolution: 'Prestidigitation removes it temporarily (1 hour). Otherwise, wait.' },
  { name: 'Echo Entity', severity: 'inconvenient', description: 'A shadow copy of the intended summon appears. It mimics the caster\'s actions with a 2-second delay.', mechanicalEffect: 'Shadow has 1 HP, mirrors movements, repeats last sentence spoken. Enemies get advantage on attacks against you (the echo telegraphs your actions).', duration: '8 hours', resolution: 'Destroy the echo (any damage) or Dispel Magic.' },
  { name: 'Dimensional Anchor Failure', severity: 'dangerous', description: 'The circle destabilizes. Gravity reverses within 30 feet for 6 seconds.', mechanicalEffect: 'Everyone within 30ft makes DEX DC 14 or falls upward 30ft (3d6 bludgeoning when gravity returns after 1 round).', duration: '1 round', resolution: 'Automatic. Gravity returns. What goes up must come down.' },
  { name: 'Planar Bleed', severity: 'dangerous', description: 'The circle tears a small hole between planes. The other side\'s environment leaks through.', mechanicalEffect: 'A 15ft radius zone takes on properties of the target plane (fire damage, cold damage, psychic whispers, etc). 2d6 elemental damage per round.', duration: '1d4 minutes', resolution: 'Close with Arcana DC 15 or let it collapse naturally.' },
  { name: 'Possession Attempt', severity: 'dangerous', description: 'The entity doesn\'t come through physically. It comes through mentally. It wants the caster\'s body.', mechanicalEffect: 'CHA DC 15 saving throw. On failure, possessed for 1d4 rounds (DM controls). On success, entity is banished.', duration: '1d4 rounds (or until expelled)', resolution: 'Protection from Evil and Good, or CHA DC 15 at end of each turn.' },
  { name: 'Time Hiccup', severity: 'inconvenient', description: 'Time stutters. Everyone in the circle experiences the next 6 seconds before they happen, then relives them.', mechanicalEffect: 'Mild disorientation. Advantage on initiative for the next combat (you\'ve seen 6 seconds of the future).', duration: 'Instant (but the memory lingers)', resolution: 'No resolution needed. Free prescience.' },
  { name: 'Summoning Swap', severity: 'dangerous', description: 'Instead of summoning the creature, the circle swaps the caster with whatever was in the circle\'s target location.', mechanicalEffect: 'Caster is teleported to the target plane. An object or creature from that plane appears in their place.', duration: 'Until retrieved', resolution: 'Plane Shift, Gate, or another summoning circle (Arcana DC 16) to swap back.' },
  { name: 'Arcane Feedback', severity: 'catastrophic', description: 'The circle absorbs and amplifies the spell energy, then detonates.', mechanicalEffect: 'Everyone within 30ft takes 6d6 force damage (DEX DC 15 half). All spell slots of the caster are expended. Antimagic zone (15ft) for 1 hour.', duration: 'Explosion instant. Antimagic 1 hour.', resolution: 'The antimagic zone fades. Spell slots return on long rest.' },
  { name: 'The Negotiator', severity: 'catastrophic', description: 'Something much more powerful than intended answers. It\'s polite. That\'s worse.', mechanicalEffect: 'A CR 15+ entity appears, unbound. It offers a deal. The deal is always bad for the party in ways they won\'t realize until later.', duration: 'Until the entity chooses to leave', resolution: 'Accept the deal, negotiate (very carefully), or fight (not recommended).' },
  { name: 'Circle Inversion', severity: 'catastrophic', description: 'The circle that was meant to contain the summon now contains reality. Everything OUTSIDE the circle is the summoning plane.', mechanicalEffect: 'The 10ft circle is safe. Everything outside is the target plane for 1d4 rounds. Environmental hazards of that plane apply.', duration: '1d4 rounds', resolution: 'Stay in the circle. Wait. Pray.' },
];

export function getRandomMishap(): SummoningMishap {
  return MISHAPS[Math.floor(Math.random() * MISHAPS.length)];
}

export function getMishapsBySeverity(severity: MishapSeverity): SummoningMishap[] {
  return MISHAPS.filter((m) => m.severity === severity);
}

export function rollMishap(spellLevel: number): SummoningMishap {
  // Higher spell levels = higher chance of worse mishaps
  const roll = Math.floor(Math.random() * 20) + 1;
  if (roll + spellLevel >= 22) return getMishapsBySeverity('catastrophic')[Math.floor(Math.random() * getMishapsBySeverity('catastrophic').length)];
  if (roll + spellLevel >= 16) return getMishapsBySeverity('dangerous')[Math.floor(Math.random() * getMishapsBySeverity('dangerous').length)];
  if (roll + spellLevel >= 10) return getMishapsBySeverity('inconvenient')[Math.floor(Math.random() * getMishapsBySeverity('inconvenient').length)];
  return getMishapsBySeverity('amusing')[Math.floor(Math.random() * getMishapsBySeverity('amusing').length)];
}

export function getAllSeverities(): MishapSeverity[] {
  return ['amusing', 'inconvenient', 'dangerous', 'catastrophic'];
}

export function formatMishap(mishap: SummoningMishap): string {
  const icon = { amusing: '😅', inconvenient: '😬', dangerous: '⚠️', catastrophic: '💥' }[mishap.severity];
  const lines = [`${icon} **${mishap.name}** *(${mishap.severity})*`];
  lines.push(`  *${mishap.description}*`);
  lines.push(`  ⚙️ Effect: ${mishap.mechanicalEffect}`);
  lines.push(`  ⏱️ Duration: ${mishap.duration}`);
  lines.push(`  🔧 Resolution: ${mishap.resolution}`);
  return lines.join('\n');
}

export { MISHAPS as SUMMONING_MISHAPS };
