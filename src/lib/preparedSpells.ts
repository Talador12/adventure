// Prepared spell management — track prepared vs known spells with daily preparation.
// Wizards/Clerics/Druids/Paladins prepare from their full list; others know spells.

export type SpellPreparationStyle = 'prepared' | 'known' | 'none';

export const CLASS_SPELL_STYLE: Record<string, SpellPreparationStyle> = {
  Wizard: 'prepared', Cleric: 'prepared', Druid: 'prepared', Paladin: 'prepared', Artificer: 'prepared',
  Bard: 'known', Ranger: 'known', Sorcerer: 'known', Warlock: 'known',
  Fighter: 'none', Barbarian: 'none', Rogue: 'none', Monk: 'none',
};

export interface SpellPreparationState {
  characterId: string;
  style: SpellPreparationStyle;
  maxPrepared: number;
  preparedSpells: string[];
  knownSpells: string[];
  lastPreparedAt: number;
}

export function getMaxPreparedSpells(charClass: string, level: number, abilityMod: number): number {
  const style = CLASS_SPELL_STYLE[charClass];
  if (style !== 'prepared') return 0;
  // Prepared casters: ability mod + class level (min 1)
  if (charClass === 'Paladin') return Math.max(1, Math.floor(level / 2) + abilityMod);
  return Math.max(1, level + abilityMod);
}

export function getMaxKnownSpells(charClass: string, level: number): number {
  const style = CLASS_SPELL_STYLE[charClass];
  if (style !== 'known') return 0;
  // Simplified known spell counts
  if (charClass === 'Bard' || charClass === 'Ranger' || charClass === 'Sorcerer') return level + 1;
  if (charClass === 'Warlock') return Math.min(level + 1, 15);
  return 0;
}

export function createPreparationState(characterId: string, charClass: string, level: number, abilityMod: number): SpellPreparationState {
  const style = CLASS_SPELL_STYLE[charClass] || 'none';
  return {
    characterId, style,
    maxPrepared: getMaxPreparedSpells(charClass, level, abilityMod),
    preparedSpells: [], knownSpells: [],
    lastPreparedAt: 0,
  };
}

export function prepareSpell(state: SpellPreparationState, spellName: string): { state: SpellPreparationState; success: boolean; message: string } {
  if (state.style !== 'prepared') return { state, success: false, message: 'This class doesn\'t prepare spells.' };
  if (state.preparedSpells.includes(spellName)) return { state, success: false, message: `${spellName} is already prepared.` };
  if (state.preparedSpells.length >= state.maxPrepared) return { state, success: false, message: `Already at max prepared spells (${state.maxPrepared}).` };
  return {
    state: { ...state, preparedSpells: [...state.preparedSpells, spellName], lastPreparedAt: Date.now() },
    success: true,
    message: `Prepared ${spellName}. (${state.preparedSpells.length + 1}/${state.maxPrepared})`,
  };
}

export function unprepareSpell(state: SpellPreparationState, spellName: string): SpellPreparationState {
  return { ...state, preparedSpells: state.preparedSpells.filter((s) => s !== spellName) };
}

export function formatPreparationStatus(state: SpellPreparationState, characterName: string): string {
  if (state.style === 'none') return `📖 **${characterName}**: Not a spellcaster.`;
  if (state.style === 'known') return `📖 **${characterName}**: Knows ${state.knownSpells.length} spells (known caster — no daily preparation needed).`;
  return `📖 **${characterName}**: ${state.preparedSpells.length}/${state.maxPrepared} spells prepared.\nPrepared: ${state.preparedSpells.join(', ') || '(none)'}`;
}
