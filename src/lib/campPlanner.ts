// Camp setup planner — tent placement, fire, perimeter for wilderness camps.

export type CampFeature = 'campfire' | 'tent' | 'alarm_spell' | 'perimeter_trap' | 'lookout_post' | 'hidden_cache' | 'animal_pen';

export interface CampSetup {
  features: { feature: CampFeature; assignedTo?: string; description: string }[];
  securityLevel: number; // 0-10
  comfortLevel: number; // 0-10
  stealthLevel: number; // 0-10
}

const FEATURE_CONFIG: Record<CampFeature, { name: string; emoji: string; security: number; comfort: number; stealth: number; description: string }> = {
  campfire: { name: 'Campfire', emoji: '🔥', security: 1, comfort: 3, stealth: -2, description: 'Provides warmth and light but visible from far away.' },
  tent: { name: 'Tent', emoji: '⛺', security: 0, comfort: 2, stealth: -1, description: 'Shelter from weather. One per 2 characters.' },
  alarm_spell: { name: 'Alarm Spell', emoji: '🔔', security: 3, comfort: 0, stealth: 0, description: 'Alerts the caster when triggered. 8-hour duration.' },
  perimeter_trap: { name: 'Perimeter Trap', emoji: '🪤', security: 2, comfort: 0, stealth: 0, description: 'Caltrops or tripwires around camp. DC 12 to detect.' },
  lookout_post: { name: 'Lookout Post', emoji: '🔭', security: 2, comfort: -1, stealth: 1, description: 'Elevated position with good sightlines.' },
  hidden_cache: { name: 'Hidden Cache', emoji: '📦', security: 1, comfort: 0, stealth: 2, description: 'Concealed supplies in case camp is overrun.' },
  animal_pen: { name: 'Animal Pen', emoji: '🐴', security: 0, comfort: 1, stealth: -1, description: 'Secure area for mounts and pack animals.' },
};

export function createCampSetup(features: CampFeature[], assignments?: Record<CampFeature, string>): CampSetup {
  let security = 0, comfort = 0, stealth = 5; // base stealth 5
  const featureList = features.map((f) => {
    const config = FEATURE_CONFIG[f];
    security += config.security; comfort += config.comfort; stealth += config.stealth;
    return { feature: f, assignedTo: assignments?.[f], description: config.description };
  });
  return { features: featureList, securityLevel: Math.min(10, Math.max(0, security)), comfortLevel: Math.min(10, Math.max(0, comfort)), stealthLevel: Math.min(10, Math.max(0, stealth)) };
}

export function suggestCampSetup(partySize: number, hasCaster: boolean, terrain: string): CampFeature[] {
  const features: CampFeature[] = ['campfire'];
  const tentCount = Math.ceil(partySize / 2);
  for (let i = 0; i < tentCount; i++) features.push('tent');
  if (hasCaster) features.push('alarm_spell');
  if (partySize >= 3) features.push('lookout_post');
  if (terrain === 'forest' || terrain === 'swamp') features.push('perimeter_trap');
  return features;
}

export function formatCampSetup(camp: CampSetup): string {
  const lines = ['🏕️ **Camp Setup:**'];
  for (const f of camp.features) {
    const config = FEATURE_CONFIG[f.feature];
    lines.push(`  ${config.emoji} **${config.name}**${f.assignedTo ? ` (${f.assignedTo})` : ''}: ${config.description}`);
  }
  const secBar = '█'.repeat(camp.securityLevel) + '░'.repeat(10 - camp.securityLevel);
  const comBar = '█'.repeat(camp.comfortLevel) + '░'.repeat(10 - camp.comfortLevel);
  const steBar = '█'.repeat(camp.stealthLevel) + '░'.repeat(10 - camp.stealthLevel);
  lines.push(`\n🛡️ Security [${secBar}] ${camp.securityLevel}/10`);
  lines.push(`😴 Comfort [${comBar}] ${camp.comfortLevel}/10`);
  lines.push(`🤫 Stealth [${steBar}] ${camp.stealthLevel}/10`);
  return lines.join('\n');
}
