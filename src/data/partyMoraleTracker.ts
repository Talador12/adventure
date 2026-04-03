// Party morale tracker — group morale state based on recent events.

export type MoraleLevel = 'triumphant' | 'high' | 'steady' | 'shaken' | 'demoralized' | 'broken';

export interface MoraleEvent {
  type: MoraleEventType;
  description: string;
  impact: number; // -3 to +3
  timestamp: number;
}

export type MoraleEventType =
  | 'victory'
  | 'defeat'
  | 'ally_death'
  | 'ally_revive'
  | 'critical_hit'
  | 'critical_fail'
  | 'rest'
  | 'treasure'
  | 'betrayal'
  | 'inspiration'
  | 'retreat'
  | 'boss_kill';

const EVENT_IMPACTS: Record<MoraleEventType, number> = {
  victory: 2,
  defeat: -3,
  ally_death: -3,
  ally_revive: 2,
  critical_hit: 1,
  critical_fail: -1,
  rest: 1,
  treasure: 1,
  betrayal: -2,
  inspiration: 2,
  retreat: -1,
  boss_kill: 3,
};

export interface PartyMorale {
  score: number; // -10 to +10
  events: MoraleEvent[];
}

export function createPartyMorale(): PartyMorale {
  return { score: 0, events: [] };
}

export function addMoraleEvent(morale: PartyMorale, type: MoraleEventType, description: string): PartyMorale {
  const impact = EVENT_IMPACTS[type] ?? 0;
  const newScore = Math.max(-10, Math.min(10, morale.score + impact));
  const event: MoraleEvent = { type, description, impact, timestamp: Date.now() };
  return { score: newScore, events: [...morale.events, event] };
}

export function getMoraleLevel(morale: PartyMorale): MoraleLevel {
  if (morale.score >= 8) return 'triumphant';
  if (morale.score >= 4) return 'high';
  if (morale.score >= 0) return 'steady';
  if (morale.score >= -3) return 'shaken';
  if (morale.score >= -7) return 'demoralized';
  return 'broken';
}

const MORALE_DESCRIPTIONS: Record<MoraleLevel, string> = {
  triumphant: 'The party is invincible. Spirits soar. Nothing can stop them.',
  high: 'Confidence runs high. The party moves with purpose and energy.',
  steady: 'A balanced state. The party is focused and functional.',
  shaken: 'Recent setbacks weigh on the party. Hesitation creeps in.',
  demoralized: 'Hope is fading. Arguments break out. The weakest link may snap.',
  broken: 'The party is on the verge of collapse. Desertion or despair looms.',
};

const MORALE_EFFECTS: Record<MoraleLevel, { attackMod: number; saveMod: number; shortRestBonus: number }> = {
  triumphant: { attackMod: 1, saveMod: 1, shortRestBonus: 2 },
  high: { attackMod: 1, saveMod: 0, shortRestBonus: 1 },
  steady: { attackMod: 0, saveMod: 0, shortRestBonus: 0 },
  shaken: { attackMod: 0, saveMod: -1, shortRestBonus: 0 },
  demoralized: { attackMod: -1, saveMod: -1, shortRestBonus: -1 },
  broken: { attackMod: -2, saveMod: -2, shortRestBonus: -2 },
};

export function getMoraleEffects(morale: PartyMorale) {
  return MORALE_EFFECTS[getMoraleLevel(morale)];
}

export function getRecentEvents(morale: PartyMorale, count: number = 5): MoraleEvent[] {
  return morale.events.slice(-count);
}

export function formatPartyMorale(morale: PartyMorale): string {
  const level = getMoraleLevel(morale);
  const effects = MORALE_EFFECTS[level];
  const icon = { triumphant: '🏆', high: '😊', steady: '😐', shaken: '😟', demoralized: '😰', broken: '💔' }[level];
  const lines = [`${icon} **Party Morale: ${level.toUpperCase()}** (${morale.score >= 0 ? '+' : ''}${morale.score})`];
  lines.push(`  *${MORALE_DESCRIPTIONS[level]}*`);
  if (effects.attackMod !== 0) lines.push(`  Attack: ${effects.attackMod >= 0 ? '+' : ''}${effects.attackMod}`);
  if (effects.saveMod !== 0) lines.push(`  Saves: ${effects.saveMod >= 0 ? '+' : ''}${effects.saveMod}`);
  if (effects.shortRestBonus !== 0) lines.push(`  Short Rest HP: ${effects.shortRestBonus >= 0 ? '+' : ''}${effects.shortRestBonus}`);
  const recent = getRecentEvents(morale, 3);
  if (recent.length > 0) {
    lines.push('  Recent:');
    recent.forEach((e) => lines.push(`    ${e.impact >= 0 ? '↑' : '↓'} ${e.description}`));
  }
  return lines.join('\n');
}
