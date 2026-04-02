// Cross-campaign faction reputation — persists globally via localStorage.
// Faction standing affects NPC attitudes, shop prices, and quest availability.

export interface FactionStanding {
  factionId: string;
  factionName: string;
  reputation: number; // -10 (hated) to +10 (revered)
  history: FactionEvent[];
}

export interface FactionEvent {
  timestamp: number;
  campaignId: string;
  delta: number;
  reason: string;
}

export type ReputationTier = 'hated' | 'hostile' | 'unfriendly' | 'neutral' | 'friendly' | 'honored' | 'revered';

const STORAGE_KEY = 'adventure:factions:global';

export function getReputationTier(rep: number): ReputationTier {
  if (rep <= -8) return 'hated';
  if (rep <= -5) return 'hostile';
  if (rep <= -2) return 'unfriendly';
  if (rep <= 2) return 'neutral';
  if (rep <= 5) return 'friendly';
  if (rep <= 8) return 'honored';
  return 'revered';
}

export const REPUTATION_COLORS: Record<ReputationTier, string> = {
  hated: 'text-red-600',
  hostile: 'text-red-400',
  unfriendly: 'text-orange-400',
  neutral: 'text-slate-400',
  friendly: 'text-green-400',
  honored: 'text-emerald-400',
  revered: 'text-amber-400',
};

export function loadGlobalFactions(): FactionStanding[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveGlobalFactions(factions: FactionStanding[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(factions));
  } catch { /* full */ }
}

export function getOrCreateFaction(factions: FactionStanding[], factionId: string, factionName: string): FactionStanding {
  const existing = factions.find((f) => f.factionId === factionId);
  if (existing) return existing;
  const newFaction: FactionStanding = { factionId, factionName, reputation: 0, history: [] };
  factions.push(newFaction);
  return newFaction;
}

export function changeReputation(
  factions: FactionStanding[],
  factionId: string,
  factionName: string,
  delta: number,
  reason: string,
  campaignId: string,
): FactionStanding[] {
  const updated = [...factions];
  let faction = updated.find((f) => f.factionId === factionId);
  if (!faction) {
    faction = { factionId, factionName, reputation: 0, history: [] };
    updated.push(faction);
  }

  faction.reputation = Math.max(-10, Math.min(10, faction.reputation + delta));
  faction.history.push({ timestamp: Date.now(), campaignId, delta, reason });
  // Cap history
  if (faction.history.length > 50) faction.history = faction.history.slice(-50);

  return updated;
}

export function getReputationEffects(rep: number): {
  priceModifier: number;
  questAccess: 'none' | 'basic' | 'all';
  npcDisposition: number;
} {
  const tier = getReputationTier(rep);
  switch (tier) {
    case 'hated': return { priceModifier: 2.0, questAccess: 'none', npcDisposition: -2 };
    case 'hostile': return { priceModifier: 1.5, questAccess: 'none', npcDisposition: -2 };
    case 'unfriendly': return { priceModifier: 1.25, questAccess: 'basic', npcDisposition: -1 };
    case 'neutral': return { priceModifier: 1.0, questAccess: 'basic', npcDisposition: 0 };
    case 'friendly': return { priceModifier: 0.9, questAccess: 'all', npcDisposition: 1 };
    case 'honored': return { priceModifier: 0.8, questAccess: 'all', npcDisposition: 2 };
    case 'revered': return { priceModifier: 0.7, questAccess: 'all', npcDisposition: 2 };
  }
}

export function formatFactionStandings(factions: FactionStanding[]): string {
  if (factions.length === 0) return 'No faction standings yet.';
  const lines = ['⚔️ **Global Faction Standings:**'];
  for (const f of factions) {
    const tier = getReputationTier(f.reputation);
    const bar = '█'.repeat(Math.max(0, f.reputation + 10)) + '░'.repeat(Math.max(0, 10 - f.reputation));
    lines.push(`**${f.factionName}**: ${f.reputation > 0 ? '+' : ''}${f.reputation} (${tier}) [${bar}]`);
  }
  return lines.join('\n');
}
