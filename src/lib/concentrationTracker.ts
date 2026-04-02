// Concentration tracker — auto-prompt saves when concentrating casters take damage.
// Tracks who is concentrating on what and calculates save DCs.

export interface ConcentrationEntry {
  characterId: string;
  characterName: string;
  spellName: string;
  startedRound: number;
  dc: number; // last calculated DC
}

export interface ConcentrationState {
  entries: ConcentrationEntry[];
}

export function createConcentrationState(): ConcentrationState {
  return { entries: [] };
}

export function startConcentrating(state: ConcentrationState, characterId: string, characterName: string, spellName: string, round: number): ConcentrationState {
  // Drop any existing concentration for this character
  const filtered = state.entries.filter((e) => e.characterId !== characterId);
  return { entries: [...filtered, { characterId, characterName, spellName, startedRound: round, dc: 10 }] };
}

export function dropConcentration(state: ConcentrationState, characterId: string): { state: ConcentrationState; droppedSpell: string | null } {
  const entry = state.entries.find((e) => e.characterId === characterId);
  return {
    state: { entries: state.entries.filter((e) => e.characterId !== characterId) },
    droppedSpell: entry?.spellName || null,
  };
}

export function calculateConcentrationDC(damageTaken: number): number {
  // DC = max(10, damage / 2)
  return Math.max(10, Math.floor(damageTaken / 2));
}

export function checkConcentration(state: ConcentrationState, characterId: string, damageTaken: number): {
  needsCheck: boolean;
  dc: number;
  spellName: string | null;
  entry: ConcentrationEntry | null;
} {
  const entry = state.entries.find((e) => e.characterId === characterId);
  if (!entry) return { needsCheck: false, dc: 0, spellName: null, entry: null };
  const dc = calculateConcentrationDC(damageTaken);
  return { needsCheck: true, dc, spellName: entry.spellName, entry: { ...entry, dc } };
}

export function getConcentratingCharacters(state: ConcentrationState): ConcentrationEntry[] {
  return state.entries;
}

export function isConcentrating(state: ConcentrationState, characterId: string): boolean {
  return state.entries.some((e) => e.characterId === characterId);
}

export function formatConcentrationStatus(state: ConcentrationState): string {
  if (state.entries.length === 0) return '🔮 No one is concentrating.';
  const lines = ['🔮 **Concentration:**'];
  for (const e of state.entries) {
    lines.push(`• **${e.characterName}** → *${e.spellName}* (since R${e.startedRound})`);
  }
  return lines.join('\n');
}

export function formatConcentrationCheck(characterName: string, spellName: string, dc: number, damageTaken: number): string {
  return `⚠️ **Concentration Check!** ${characterName} took ${damageTaken} damage while concentrating on *${spellName}*.\nCON save DC ${dc} to maintain concentration.`;
}
