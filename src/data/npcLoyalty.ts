// NPC loyalty tracker — track NPC allegiance shifts based on party actions.

export type LoyaltyLevel = 'devoted' | 'loyal' | 'friendly' | 'neutral' | 'wary' | 'hostile' | 'enemy';

export interface LoyaltyEvent {
  action: string;
  impact: number; // -3 to +3
  timestamp: number;
}

export interface NpcLoyaltyRecord {
  npcName: string;
  score: number; // -10 to +10
  events: LoyaltyEvent[];
  faction?: string;
}

export interface LoyaltyTracker {
  npcs: NpcLoyaltyRecord[];
}

const LOYALTY_THRESHOLDS: { min: number; level: LoyaltyLevel }[] = [
  { min: 8, level: 'devoted' },
  { min: 5, level: 'loyal' },
  { min: 2, level: 'friendly' },
  { min: -1, level: 'neutral' },
  { min: -4, level: 'wary' },
  { min: -7, level: 'hostile' },
  { min: -10, level: 'enemy' },
];

export function createLoyaltyTracker(): LoyaltyTracker {
  return { npcs: [] };
}

export function addNpc(tracker: LoyaltyTracker, npcName: string, faction?: string, startingScore: number = 0): LoyaltyTracker {
  if (tracker.npcs.some((n) => n.npcName === npcName)) return tracker;
  return { npcs: [...tracker.npcs, { npcName, score: Math.max(-10, Math.min(10, startingScore)), events: [], faction }] };
}

export function recordLoyaltyEvent(tracker: LoyaltyTracker, npcName: string, action: string, impact: number): LoyaltyTracker {
  return {
    npcs: tracker.npcs.map((n) => {
      if (n.npcName !== npcName) return n;
      const newScore = Math.max(-10, Math.min(10, n.score + impact));
      return { ...n, score: newScore, events: [...n.events, { action, impact, timestamp: Date.now() }] };
    }),
  };
}

export function getLoyaltyLevel(score: number): LoyaltyLevel {
  for (const t of LOYALTY_THRESHOLDS) {
    if (score >= t.min) return t.level;
  }
  return 'enemy';
}

export function getNpcLoyalty(tracker: LoyaltyTracker, npcName: string): NpcLoyaltyRecord | undefined {
  return tracker.npcs.find((n) => n.npcName === npcName);
}

export function getLoyalNpcs(tracker: LoyaltyTracker): NpcLoyaltyRecord[] {
  return tracker.npcs.filter((n) => n.score >= 5);
}

export function getHostileNpcs(tracker: LoyaltyTracker): NpcLoyaltyRecord[] {
  return tracker.npcs.filter((n) => n.score <= -5);
}

export const LOYALTY_ACTIONS = {
  positive: [
    { action: 'Completed a quest for them', impact: 2 },
    { action: 'Saved their life', impact: 3 },
    { action: 'Gave them a gift', impact: 1 },
    { action: 'Defended their honor', impact: 2 },
    { action: 'Kept a promise', impact: 1 },
    { action: 'Shared valuable information', impact: 1 },
  ],
  negative: [
    { action: 'Broke a promise', impact: -2 },
    { action: 'Stole from them', impact: -3 },
    { action: 'Insulted them publicly', impact: -2 },
    { action: 'Harmed their allies', impact: -2 },
    { action: 'Lied to their face', impact: -1 },
    { action: 'Ignored their plea for help', impact: -1 },
  ],
};

export function formatNpcLoyalty(record: NpcLoyaltyRecord): string {
  const level = getLoyaltyLevel(record.score);
  const icon = { devoted: '💖', loyal: '💚', friendly: '😊', neutral: '😐', wary: '😒', hostile: '😡', enemy: '💀' }[level];
  const lines = [`${icon} **${record.npcName}** — ${level.toUpperCase()} (${record.score >= 0 ? '+' : ''}${record.score})`];
  if (record.faction) lines.push(`  Faction: ${record.faction}`);
  const recent = record.events.slice(-3);
  if (recent.length > 0) {
    recent.forEach((e) => lines.push(`  ${e.impact >= 0 ? '↑' : '↓'} ${e.action}`));
  }
  return lines.join('\n');
}

export function formatLoyaltyTracker(tracker: LoyaltyTracker): string {
  if (tracker.npcs.length === 0) return '🤝 **NPC Loyalty:** No NPCs tracked.';
  return '🤝 **NPC Loyalty:**\n' + tracker.npcs.map(formatNpcLoyalty).join('\n');
}
