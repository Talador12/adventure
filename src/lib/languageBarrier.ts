// Language barrier system — track known languages, flag untranslatable speech.

export const DND_LANGUAGES = {
  common: ['Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfling', 'Orc'],
  exotic: ['Abyssal', 'Celestial', 'Draconic', 'Deep Speech', 'Infernal', 'Primordial', 'Sylvan', 'Undercommon'],
  rare: ['Druidic', 'Thieves\' Cant'],
};

export const RACE_LANGUAGES: Record<string, string[]> = {
  Human: ['Common'], Elf: ['Common', 'Elvish'], Dwarf: ['Common', 'Dwarvish'],
  Halfling: ['Common', 'Halfling'], Gnome: ['Common', 'Gnomish'],
  'Half-Elf': ['Common', 'Elvish'], 'Half-Orc': ['Common', 'Orc'],
  Tiefling: ['Common', 'Infernal'], Dragonborn: ['Common', 'Draconic'],
};

export interface LanguageState {
  characterId: string;
  knownLanguages: string[];
}

export function getDefaultLanguages(race: string): string[] {
  return RACE_LANGUAGES[race] || ['Common'];
}

export function createLanguageState(characterId: string, race: string, bonusLanguages: string[] = []): LanguageState {
  const defaults = getDefaultLanguages(race);
  return { characterId, knownLanguages: [...new Set([...defaults, ...bonusLanguages])] };
}

export function canUnderstand(state: LanguageState, language: string): boolean {
  return state.knownLanguages.some((l) => l.toLowerCase() === language.toLowerCase());
}

export function checkPartyLanguages(partyLanguages: LanguageState[], npcLanguage: string): {
  understoodBy: string[];
  canTranslate: boolean;
} {
  const understoodBy: string[] = [];
  for (const p of partyLanguages) {
    if (canUnderstand(p, npcLanguage)) understoodBy.push(p.characterId);
  }
  return { understoodBy, canTranslate: understoodBy.length > 0 };
}

export function getAllKnownLanguages(partyLanguages: LanguageState[]): string[] {
  const all = new Set<string>();
  for (const p of partyLanguages) for (const l of p.knownLanguages) all.add(l);
  return [...all].sort();
}

export function formatLanguageStatus(states: LanguageState[], characterNames: Record<string, string>): string {
  const lines = ['🗣️ **Party Languages:**'];
  for (const s of states) {
    lines.push(`• **${characterNames[s.characterId] || s.characterId}**: ${s.knownLanguages.join(', ')}`);
  }
  const all = getAllKnownLanguages(states);
  lines.push(`\nParty covers: ${all.join(', ')}`);
  const allLangs = [...DND_LANGUAGES.common, ...DND_LANGUAGES.exotic];
  const missing = allLangs.filter((l) => !all.includes(l));
  if (missing.length > 0) lines.push(`Cannot understand: ${missing.join(', ')}`);
  return lines.join('\n');
}
