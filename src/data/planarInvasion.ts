// Planar invasion response protocol — emergency plans when another plane attacks.

export type InvadingPlane = 'abyss' | 'nine_hells' | 'shadowfell' | 'elemental' | 'far_realm' | 'feywild';
export type ResponsePhase = 'detection' | 'alert' | 'mobilization' | 'defense' | 'counterattack';

export interface InvasionProtocol {
  invadingPlane: InvadingPlane;
  threatLevel: string;
  invasionMethod: string;
  earlyWarning: string;
  responsePhases: { phase: ResponsePhase; action: string; dc: number }[];
  civilianProtocol: string;
  counterMeasure: string;
  partyRole: string;
  failureConsequence: string;
}

const PROTOCOLS: InvasionProtocol[] = [
  { invadingPlane: 'abyss', threatLevel: 'Catastrophic', invasionMethod: 'Demon portal in the city center. Opens during a blood moon ritual.', earlyWarning: 'Animals flee. Holy water boils. Shadows move wrong. The sky turns red 1 hour before.', responsePhases: [
    { phase: 'detection', action: 'Clerics sense the portal forming (Religion DC 14). 30 minutes warning.', dc: 14 },
    { phase: 'alert', action: 'Sound the bells. Evacuate the market district. Seal the temple doors.', dc: 0 },
    { phase: 'mobilization', action: 'City guard forms perimeter. Adventurers summoned. Holy water distributed.', dc: 0 },
    { phase: 'defense', action: 'Hold the line. Kill everything that comes through. Do NOT let them establish a beachhead.', dc: 15 },
    { phase: 'counterattack', action: 'Close the portal. Requires Dispel Evil and Good (5th level+) cast AT the portal while it\'s defended.', dc: 17 },
  ], civilianProtocol: 'Underground shelters. Warded basements. The temple is the last refuge.', counterMeasure: 'Holy water bombs. Consecrated ground slows demons. Silver weapons bypass resistance.', partyRole: 'Strike team. Get to the portal while the guard holds the line. Close it or die trying.', failureConsequence: 'The portal stabilizes. Demons pour through indefinitely. The city falls in 3 days.' },
  { invadingPlane: 'feywild', threatLevel: 'Moderate (deceptively dangerous)', invasionMethod: 'The boundary dissolves. The city slowly becomes part of the Feywild. Nobody notices at first.', earlyWarning: 'Flowers growing from cobblestones. Music with no source. Time inconsistencies (clocks disagree).', responsePhases: [
    { phase: 'detection', action: 'Druids notice the shift (Nature DC 12). Easy to detect, hard to believe.', dc: 12 },
    { phase: 'alert', action: 'Convince the mayor this is real (Persuasion DC 15 — fey magic makes people dismissive).', dc: 15 },
    { phase: 'mobilization', action: 'Iron barricades at key intersections. Remove all fey-attracting items (honey, music boxes, mirrors).', dc: 0 },
    { phase: 'defense', action: 'Negotiate with the fey. They don\'t see this as an invasion — they see it as a renovation.', dc: 16 },
    { phase: 'counterattack', action: 'Perform the Iron Ritual at the boundary\'s weakest point (Nature DC 16 + 100gp of iron filings).', dc: 16 },
  ], civilianProtocol: 'Don\'t eat anything new. Don\'t agree to anything. Don\'t follow the music. DON\'T FOLLOW THE MUSIC.', counterMeasure: 'Iron everything. Cold iron disrupts fey magic. Genuine rudeness confuses them (they expect manners).', partyRole: 'Diplomats and enforcers. Negotiate with the Fey Court representative AND close the boundary.', failureConsequence: 'The city becomes part of the Feywild permanently. Citizens don\'t age but can never leave. Visitors experience time distortion.' },
  { invadingPlane: 'far_realm', threatLevel: 'Existential', invasionMethod: 'Reality itself cracks. Things from outside reality leak through. You can\'t fight what you can\'t comprehend.', earlyWarning: 'Geometry becomes wrong. Right angles aren\'t 90°. Mirrors show a 3-second delay. Madness checks (WIS DC 12).', responsePhases: [
    { phase: 'detection', action: 'Wizards detect the breach (Arcana DC 16). The difficulty is understanding what you\'re detecting.', dc: 16 },
    { phase: 'alert', action: 'Evacuate. There is no defense. Get people away from the breach.', dc: 0 },
    { phase: 'defense', action: 'Antimagic fields slow the spread. Temporarily. Every minute counts.', dc: 15 },
    { phase: 'counterattack', action: 'A Wish spell or direct divine intervention. Nothing less will seal a Far Realm breach.', dc: 20 },
  ], civilianProtocol: 'Do not look at the breach. Do not think about the breach. Do not acknowledge the things you see moving inside.', counterMeasure: 'Antimagic slows it. Banishment sends individual entities back. Only Wish or a god can seal the breach.', partyRole: 'The only people brave or stupid enough to approach the breach. Find the anchor point and destroy it.', failureConsequence: 'Reality unravels in a 1-mile radius. Everything inside ceases to follow physical laws. Permanently.' },
];

export function getRandomProtocol(): InvasionProtocol {
  return PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)];
}

export function getProtocolByPlane(plane: InvadingPlane): InvasionProtocol | undefined {
  return PROTOCOLS.find((p) => p.invadingPlane === plane);
}

export function getAllInvadingPlanes(): InvadingPlane[] {
  return PROTOCOLS.map((p) => p.invadingPlane);
}

export function getPhaseCount(protocol: InvasionProtocol): number {
  return protocol.responsePhases.length;
}

export function formatProtocol(protocol: InvasionProtocol): string {
  const icon = { abyss: '👹', nine_hells: '🔥', shadowfell: '🌑', elemental: '🌊', far_realm: '🌀', feywild: '🌸' }[protocol.invadingPlane];
  const lines = [`${icon} **INVASION: ${protocol.invadingPlane.replace(/_/g, ' ').toUpperCase()}** — Threat: ${protocol.threatLevel}`];
  lines.push(`  Method: ${protocol.invasionMethod}`);
  lines.push(`  ⚠️ Warning: ${protocol.earlyWarning}`);
  protocol.responsePhases.forEach((p) => lines.push(`  ${p.phase}: ${p.action}`));
  lines.push(`  🎯 Party role: ${protocol.partyRole}`);
  lines.push(`  💀 If failed: ${protocol.failureConsequence}`);
  return lines.join('\n');
}

export { PROTOCOLS as INVASION_PROTOCOLS };
