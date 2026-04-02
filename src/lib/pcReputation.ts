// PC reputation system — individual character fame/infamy across regions.
// Different from faction reputation: this tracks personal renown.

export type ReputationType = 'fame' | 'infamy' | 'mystery';

export interface RegionReputation {
  regionId: string;
  regionName: string;
  fame: number;   // 0-20
  infamy: number;  // 0-20
  title: string;
}

export interface PCReputationState {
  characterId: string;
  regions: RegionReputation[];
}

export function getTitle(fame: number, infamy: number): string {
  const net = fame - infamy;
  if (fame >= 15 && infamy < 5) return 'Legend';
  if (fame >= 10 && infamy < 5) return 'Hero';
  if (infamy >= 15 && fame < 5) return 'Villain';
  if (infamy >= 10 && fame < 5) return 'Scourge';
  if (fame >= 10 && infamy >= 10) return 'Notorious';
  if (fame >= 5) return 'Known';
  if (infamy >= 5) return 'Wanted';
  if (net > 0) return 'Recognized';
  if (net < 0) return 'Suspicious';
  return 'Unknown';
}

export function createPCReputation(characterId: string): PCReputationState {
  return { characterId, regions: [] };
}

export function getOrCreateRegion(state: PCReputationState, regionId: string, regionName: string): RegionReputation {
  let region = state.regions.find((r) => r.regionId === regionId);
  if (!region) {
    region = { regionId, regionName, fame: 0, infamy: 0, title: 'Unknown' };
    state.regions.push(region);
  }
  return region;
}

export function adjustReputation(
  state: PCReputationState,
  regionId: string,
  regionName: string,
  type: ReputationType,
  amount: number,
): PCReputationState {
  const updated = { ...state, regions: state.regions.map((r) => ({ ...r })) };
  const region = getOrCreateRegion(updated, regionId, regionName);

  if (type === 'fame') region.fame = Math.min(20, Math.max(0, region.fame + amount));
  else if (type === 'infamy') region.infamy = Math.min(20, Math.max(0, region.infamy + amount));
  // mystery doesn't change fame/infamy directly, just flavor

  region.title = getTitle(region.fame, region.infamy);
  return updated;
}

export function getReputationEffectsForRegion(region: RegionReputation): {
  recognitionChance: number; // 0-1
  priceModifier: number;
  npcReaction: string;
} {
  const fame = region.fame;
  const infamy = region.infamy;
  const recognitionChance = Math.min(1, (fame + infamy) / 20);
  const priceModifier = fame > infamy ? Math.max(0.8, 1 - fame * 0.01) : Math.min(1.3, 1 + infamy * 0.015);
  const npcReaction = fame > infamy + 5 ? 'Welcoming' : infamy > fame + 5 ? 'Fearful' : fame > infamy ? 'Respectful' : infamy > fame ? 'Suspicious' : 'Indifferent';
  return { recognitionChance, priceModifier, npcReaction };
}

export function formatPCReputation(state: PCReputationState, characterName: string): string {
  if (state.regions.length === 0) return `🌟 **${characterName}**: Unknown in all regions.`;
  const lines = [`🌟 **${characterName}'s Reputation:**`];
  for (const r of state.regions) {
    const fameBar = '⭐'.repeat(Math.min(5, Math.floor(r.fame / 4))) + '☆'.repeat(Math.max(0, 5 - Math.floor(r.fame / 4)));
    const infamyBar = '💀'.repeat(Math.min(5, Math.floor(r.infamy / 4))) + '☆'.repeat(Math.max(0, 5 - Math.floor(r.infamy / 4)));
    lines.push(`**${r.regionName}**: "${r.title}" — Fame [${fameBar}] ${r.fame} | Infamy [${infamyBar}] ${r.infamy}`);
  }
  return lines.join('\n');
}
