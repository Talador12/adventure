// Faction war tracker — multi-faction conflict with territory control and battle outcomes.

export type FactionAlignment = 'lawful' | 'neutral' | 'chaotic' | 'evil';

export interface Faction {
  name: string;
  alignment: FactionAlignment;
  strength: number; // 1-10 military power
  territories: string[];
  allies: string[];
  enemies: string[];
  leader: string;
  specialUnit: string;
}

export interface Territory {
  name: string;
  controller: string; // faction name
  defenseBonus: number; // +0 to +5
  resources: TerritoryResource;
  contested: boolean;
}

export type TerritoryResource = 'gold' | 'food' | 'weapons' | 'magic' | 'recruits' | 'none';

export interface BattleResult {
  attacker: string;
  defender: string;
  territory: string;
  attackerRoll: number;
  defenderRoll: number;
  winner: string;
  description: string;
  casualties: { attacker: number; defender: number };
}

export interface FactionWarState {
  factions: Faction[];
  territories: Territory[];
  battles: BattleResult[];
  turn: number;
}

const DEFAULT_FACTIONS: Faction[] = [
  { name: 'The Iron Crown', alignment: 'lawful', strength: 8, territories: ['Capital', 'Farmlands'], allies: ['Temple of Light'], enemies: ['Shadow Pact'], leader: 'King Aldric the Stern', specialUnit: 'Royal Knights (heavy cavalry, +2 in open field)' },
  { name: 'Shadow Pact', alignment: 'evil', strength: 6, territories: ['Underdark Gate', 'Black Marsh'], allies: ['Pirate Fleet'], enemies: ['The Iron Crown', 'Temple of Light'], leader: 'The Whisper Queen', specialUnit: 'Shadow Assassins (+3 in covert operations)' },
  { name: 'Temple of Light', alignment: 'lawful', strength: 5, territories: ['Holy City', 'Mountain Pass'], allies: ['The Iron Crown'], enemies: ['Shadow Pact'], leader: 'High Priestess Solara', specialUnit: 'Paladins of the Dawn (+2 vs undead/fiends)' },
  { name: 'Free Cities Alliance', alignment: 'neutral', strength: 7, territories: ['Trade Hub', 'Coastal Towns'], allies: [], enemies: [], leader: 'Council of Merchants', specialUnit: 'Mercenary Companies (can be hired by any side)' },
  { name: 'Pirate Fleet', alignment: 'chaotic', strength: 4, territories: ['Skull Island'], allies: ['Shadow Pact'], enemies: [], leader: 'Admiral Blacktide', specialUnit: 'Corsairs (+3 in naval/coastal battles)' },
];

const DEFAULT_TERRITORIES: Territory[] = [
  { name: 'Capital', controller: 'The Iron Crown', defenseBonus: 4, resources: 'gold', contested: false },
  { name: 'Farmlands', controller: 'The Iron Crown', defenseBonus: 1, resources: 'food', contested: false },
  { name: 'Underdark Gate', controller: 'Shadow Pact', defenseBonus: 3, resources: 'magic', contested: false },
  { name: 'Black Marsh', controller: 'Shadow Pact', defenseBonus: 2, resources: 'recruits', contested: true },
  { name: 'Holy City', controller: 'Temple of Light', defenseBonus: 3, resources: 'magic', contested: false },
  { name: 'Mountain Pass', controller: 'Temple of Light', defenseBonus: 5, resources: 'weapons', contested: false },
  { name: 'Trade Hub', controller: 'Free Cities Alliance', defenseBonus: 2, resources: 'gold', contested: false },
  { name: 'Coastal Towns', controller: 'Free Cities Alliance', defenseBonus: 1, resources: 'food', contested: true },
  { name: 'Skull Island', controller: 'Pirate Fleet', defenseBonus: 3, resources: 'weapons', contested: false },
  { name: 'Neutral Wilds', controller: 'none', defenseBonus: 0, resources: 'recruits', contested: false },
];

export function createFactionWar(): FactionWarState {
  return { factions: [...DEFAULT_FACTIONS], territories: [...DEFAULT_TERRITORIES], battles: [], turn: 1 };
}

export function resolveBattle(state: FactionWarState, attackerName: string, territoryName: string): BattleResult | null {
  const attacker = state.factions.find((f) => f.name === attackerName);
  const territory = state.territories.find((t) => t.name === territoryName);
  if (!attacker || !territory) return null;
  const defender = state.factions.find((f) => f.name === territory.controller);
  const atkRoll = Math.floor(Math.random() * 20) + 1 + attacker.strength;
  const defRoll = Math.floor(Math.random() * 20) + 1 + (defender?.strength ?? 0) + territory.defenseBonus;
  const winner = atkRoll >= defRoll ? attackerName : (defender?.name ?? 'defenders');
  const casualties = { attacker: Math.floor(Math.random() * 3) + 1, defender: Math.floor(Math.random() * 3) + 1 };
  const desc = atkRoll >= defRoll
    ? `${attackerName} storms ${territoryName}! The defenders fall back.`
    : `${defender?.name ?? 'The defenders'} hold ${territoryName}. The assault is repelled.`;
  return { attacker: attackerName, defender: defender?.name ?? 'none', territory: territoryName, attackerRoll: atkRoll, defenderRoll: defRoll, winner, description: desc, casualties };
}

export function applyBattleResult(state: FactionWarState, result: BattleResult): FactionWarState {
  const newTerritories = state.territories.map((t) => {
    if (t.name === result.territory && result.winner === result.attacker) {
      return { ...t, controller: result.attacker, contested: false };
    }
    return t;
  });
  return { ...state, territories: newTerritories, battles: [...state.battles, result] };
}

export function getContestedTerritories(state: FactionWarState): Territory[] {
  return state.territories.filter((t) => t.contested);
}

export function getFactionTerritories(state: FactionWarState, factionName: string): Territory[] {
  return state.territories.filter((t) => t.controller === factionName);
}

export function getFactionStrength(state: FactionWarState, factionName: string): number {
  const faction = state.factions.find((f) => f.name === factionName);
  if (!faction) return 0;
  const territoryBonus = getFactionTerritories(state, factionName).length;
  return faction.strength + territoryBonus;
}

export function formatFactionWar(state: FactionWarState): string {
  const lines = [`⚔️ **Faction War — Turn ${state.turn}**`];
  state.factions.forEach((f) => {
    const terrs = getFactionTerritories(state, f.name);
    const icon = { lawful: '⚖️', neutral: '⚪', chaotic: '🔥', evil: '💀' }[f.alignment];
    lines.push(`  ${icon} **${f.name}** (Str ${getFactionStrength(state, f.name)}) — ${terrs.map((t) => t.name).join(', ') || 'no territory'}`);
  });
  const contested = getContestedTerritories(state);
  if (contested.length > 0) lines.push(`  🏴 Contested: ${contested.map((t) => t.name).join(', ')}`);
  return lines.join('\n');
}

export { DEFAULT_FACTIONS, DEFAULT_TERRITORIES };
