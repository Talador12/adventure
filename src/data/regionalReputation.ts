// Regional reputation tracker — per-region reputation with different reactions.

export type ReputationTier = 'revered' | 'honored' | 'liked' | 'neutral' | 'disliked' | 'hated' | 'exiled';

export interface RegionReputation {
  regionName: string;
  score: number; // -10 to +10
  events: ReputationEvent[];
}

export interface ReputationEvent {
  action: string;
  impact: number;
  timestamp: number;
}

export interface RegionalReputationTracker {
  regions: RegionReputation[];
}

export interface ReputationEffects {
  priceModifier: number; // multiplier on shop prices
  questAccess: boolean; // can access exclusive quests
  innAccess: boolean; // allowed to stay at inns
  guardReaction: string; // how guards treat the party
  npcDisposition: string;
}

const TIER_CONFIG: { min: number; tier: ReputationTier; effects: ReputationEffects }[] = [
  { min: 8, tier: 'revered', effects: { priceModifier: 0.7, questAccess: true, innAccess: true, guardReaction: 'Salute and offer escort.', npcDisposition: 'Eager to help, give gifts, share secrets.' } },
  { min: 5, tier: 'honored', effects: { priceModifier: 0.85, questAccess: true, innAccess: true, guardReaction: 'Nod respectfully.', npcDisposition: 'Friendly, willing to go out of their way.' } },
  { min: 2, tier: 'liked', effects: { priceModifier: 0.95, questAccess: true, innAccess: true, guardReaction: 'Wave you through.', npcDisposition: 'Polite and helpful.' } },
  { min: -1, tier: 'neutral', effects: { priceModifier: 1.0, questAccess: false, innAccess: true, guardReaction: 'Standard inspection.', npcDisposition: 'Indifferent.' } },
  { min: -4, tier: 'disliked', effects: { priceModifier: 1.15, questAccess: false, innAccess: true, guardReaction: 'Watch you closely.', npcDisposition: 'Cold, short answers.' } },
  { min: -7, tier: 'hated', effects: { priceModifier: 1.5, questAccess: false, innAccess: false, guardReaction: 'Demand you leave.', npcDisposition: 'Refuse to speak. Some throw things.' } },
  { min: -10, tier: 'exiled', effects: { priceModifier: 2.0, questAccess: false, innAccess: false, guardReaction: 'Attack on sight.', npcDisposition: 'Run away or call for guards.' } },
];

export function createRegionalTracker(): RegionalReputationTracker {
  return { regions: [] };
}

export function addRegion(tracker: RegionalReputationTracker, regionName: string, startingScore: number = 0): RegionalReputationTracker {
  if (tracker.regions.some((r) => r.regionName === regionName)) return tracker;
  return { regions: [...tracker.regions, { regionName, score: Math.max(-10, Math.min(10, startingScore)), events: [] }] };
}

export function changeRegionReputation(tracker: RegionalReputationTracker, regionName: string, action: string, impact: number): RegionalReputationTracker {
  return {
    regions: tracker.regions.map((r) => {
      if (r.regionName !== regionName) return r;
      const newScore = Math.max(-10, Math.min(10, r.score + impact));
      return { ...r, score: newScore, events: [...r.events, { action, impact, timestamp: Date.now() }] };
    }),
  };
}

export function getReputationTier(score: number): ReputationTier {
  for (const t of TIER_CONFIG) {
    if (score >= t.min) return t.tier;
  }
  return 'exiled';
}

export function getReputationEffects(score: number): ReputationEffects {
  for (const t of TIER_CONFIG) {
    if (score >= t.min) return t.effects;
  }
  return TIER_CONFIG[TIER_CONFIG.length - 1].effects;
}

export function getRegionReputation(tracker: RegionalReputationTracker, regionName: string): RegionReputation | undefined {
  return tracker.regions.find((r) => r.regionName === regionName);
}

export function formatRegionReputation(region: RegionReputation): string {
  const tier = getReputationTier(region.score);
  const effects = getReputationEffects(region.score);
  const icon = { revered: '👑', honored: '⭐', liked: '😊', neutral: '😐', disliked: '😒', hated: '😡', exiled: '🚫' }[tier];
  const lines = [`${icon} **${region.regionName}** — ${tier.toUpperCase()} (${region.score >= 0 ? '+' : ''}${region.score})`];
  lines.push(`  Prices: ×${effects.priceModifier} | Inn: ${effects.innAccess ? 'Yes' : 'No'} | Quests: ${effects.questAccess ? 'Yes' : 'No'}`);
  lines.push(`  Guards: ${effects.guardReaction}`);
  return lines.join('\n');
}

export function formatRegionalTracker(tracker: RegionalReputationTracker): string {
  if (tracker.regions.length === 0) return '🗺️ **Regional Reputation:** No regions tracked.';
  return '🗺️ **Regional Reputation:**\n' + tracker.regions.map(formatRegionReputation).join('\n');
}
