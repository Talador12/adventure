// Tavern reputation tracker — how the party is known in different establishments.

export type TavernTier = 'dive' | 'common' | 'upscale' | 'exclusive';
export type ReputationType = 'heroes' | 'troublemakers' | 'big_spenders' | 'cheapskates' | 'entertainers' | 'unknown';

export interface TavernReputation {
  tavernName: string;
  tier: TavernTier;
  reputation: ReputationType;
  score: number; // -5 to +5
  events: string[];
  barkeepRelation: string;
  perks: string[];
  bans: string[];
}

export interface TavernReputationTracker {
  taverns: TavernReputation[];
}

const PERK_TABLE: Record<ReputationType, string[]> = {
  heroes: ['Free first round', 'Private room available', 'NPCs approach with quests', 'Barkeep shares rumors freely'],
  troublemakers: ['Watched closely by staff', 'No credit extended', 'Bouncers assigned to your table', 'Other patrons avoid you'],
  big_spenders: ['Best seats reserved', 'Top-shelf drinks offered first', 'Merchant contacts introduced', 'Tab always open'],
  cheapskates: ['Served last', 'Watered-down ale', 'Seated near the kitchen (noisy)', 'Barkeep sighs audibly when you enter'],
  entertainers: ['Free drinks during performance', 'Regular gig offered (5gp/night)', 'Crowd favorite status', 'Bard network connections'],
  unknown: ['Standard service', 'No perks or penalties'],
};

export function createTavernTracker(): TavernReputationTracker {
  return { taverns: [] };
}

export function addTavern(tracker: TavernReputationTracker, name: string, tier: TavernTier): TavernReputationTracker {
  if (tracker.taverns.some((t) => t.tavernName === name)) return tracker;
  return { taverns: [...tracker.taverns, { tavernName: name, tier, reputation: 'unknown', score: 0, events: [], barkeepRelation: 'Neutral — doesn\'t know you yet.', perks: PERK_TABLE.unknown, bans: [] }] };
}

export function recordEvent(tracker: TavernReputationTracker, tavernName: string, event: string, scoreChange: number): TavernReputationTracker {
  return { taverns: tracker.taverns.map((t) => {
    if (t.tavernName !== tavernName) return t;
    const newScore = Math.max(-5, Math.min(5, t.score + scoreChange));
    const newRep = getReputationType(newScore, t.events.concat(event));
    return { ...t, score: newScore, reputation: newRep, events: [...t.events, event], perks: PERK_TABLE[newRep] };
  }) };
}

function getReputationType(score: number, events: string[]): ReputationType {
  if (score >= 3) return 'heroes';
  if (score <= -3) return 'troublemakers';
  if (events.some((e) => e.includes('spent') || e.includes('bought'))) return score >= 0 ? 'big_spenders' : 'cheapskates';
  if (events.some((e) => e.includes('perform') || e.includes('sang'))) return 'entertainers';
  return 'unknown';
}

export function getTavernReputation(tracker: TavernReputationTracker, name: string): TavernReputation | undefined {
  return tracker.taverns.find((t) => t.tavernName === name);
}

export function getBannedTaverns(tracker: TavernReputationTracker): TavernReputation[] {
  return tracker.taverns.filter((t) => t.score <= -5);
}

export function getAllTiers(): TavernTier[] {
  return ['dive', 'common', 'upscale', 'exclusive'];
}

export function formatTavernReputation(rep: TavernReputation): string {
  const icon = { dive: '🍺', common: '🏠', upscale: '🍷', exclusive: '👑' }[rep.tier];
  const lines = [`${icon} **${rep.tavernName}** *(${rep.tier})* — ${rep.reputation.replace(/_/g, ' ')} (${rep.score >= 0 ? '+' : ''}${rep.score})`];
  lines.push(`  Perks: ${rep.perks.join('. ')}`);
  if (rep.bans.length > 0) lines.push(`  🚫 Bans: ${rep.bans.join(', ')}`);
  return lines.join('\n');
}
