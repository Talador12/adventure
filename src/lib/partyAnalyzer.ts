// Party composition analyzer — identify role gaps and suggest recruitment.

export type PartyRole = 'tank' | 'healer' | 'damage' | 'control' | 'support' | 'scout' | 'face';

export interface RoleAssignment {
  characterName: string;
  charClass: string;
  roles: PartyRole[];
  primaryRole: PartyRole;
}

const CLASS_ROLES: Record<string, { primary: PartyRole; secondary: PartyRole[] }> = {
  Fighter: { primary: 'tank', secondary: ['damage'] },
  Barbarian: { primary: 'tank', secondary: ['damage'] },
  Paladin: { primary: 'tank', secondary: ['healer', 'support'] },
  Ranger: { primary: 'damage', secondary: ['scout'] },
  Rogue: { primary: 'scout', secondary: ['damage', 'face'] },
  Monk: { primary: 'damage', secondary: ['scout', 'control'] },
  Wizard: { primary: 'control', secondary: ['damage'] },
  Sorcerer: { primary: 'damage', secondary: ['control'] },
  Warlock: { primary: 'damage', secondary: ['face', 'control'] },
  Cleric: { primary: 'healer', secondary: ['support', 'tank'] },
  Druid: { primary: 'healer', secondary: ['control', 'support'] },
  Bard: { primary: 'support', secondary: ['face', 'healer'] },
};

const ROLE_DESCRIPTIONS: Record<PartyRole, { name: string; emoji: string; importance: number; description: string }> = {
  tank: { name: 'Tank', emoji: '🛡️', importance: 5, description: 'Absorbs damage, controls the frontline.' },
  healer: { name: 'Healer', emoji: '💚', importance: 5, description: 'Restores HP, removes conditions.' },
  damage: { name: 'Damage Dealer', emoji: '⚔️', importance: 4, description: 'Eliminates enemies efficiently.' },
  control: { name: 'Controller', emoji: '🧙', importance: 3, description: 'Debuffs enemies, controls the battlefield.' },
  support: { name: 'Support', emoji: '✨', importance: 3, description: 'Buffs allies, provides utility.' },
  scout: { name: 'Scout', emoji: '🔭', importance: 2, description: 'Explores ahead, detects traps and ambushes.' },
  face: { name: 'Face', emoji: '🎭', importance: 2, description: 'Handles social encounters and negotiations.' },
};

export function analyzeParty(characters: { name: string; class: string }[]): { assignments: RoleAssignment[]; filledRoles: Set<PartyRole>; missingRoles: PartyRole[]; suggestions: string[] } {
  const assignments: RoleAssignment[] = [];
  const filledRoles = new Set<PartyRole>();

  for (const char of characters) {
    const config = CLASS_ROLES[char.class] || { primary: 'damage', secondary: [] };
    const roles: PartyRole[] = [config.primary, ...config.secondary];
    assignments.push({ characterName: char.name, charClass: char.class, roles, primaryRole: config.primary });
    for (const r of roles) filledRoles.add(r);
  }

  const allRoles: PartyRole[] = ['tank', 'healer', 'damage', 'control', 'support', 'scout', 'face'];
  const missingRoles = allRoles.filter((r) => !filledRoles.has(r));
  const suggestions: string[] = [];

  // Suggest classes for missing critical roles
  const classesForRole: Record<PartyRole, string[]> = {
    tank: ['Fighter', 'Barbarian', 'Paladin'], healer: ['Cleric', 'Druid', 'Paladin'],
    damage: ['Fighter', 'Ranger', 'Rogue', 'Sorcerer'], control: ['Wizard', 'Druid'],
    support: ['Bard', 'Cleric'], scout: ['Rogue', 'Ranger'], face: ['Bard', 'Warlock', 'Rogue'],
  };

  for (const role of missingRoles) {
    const info = ROLE_DESCRIPTIONS[role];
    if (info.importance >= 4) {
      suggestions.push(`⚠️ Missing **${info.name}** — consider adding a ${classesForRole[role].join(' or ')}.`);
    } else {
      suggestions.push(`💡 No dedicated **${info.name}** — a ${classesForRole[role].join('/')} would fill this gap.`);
    }
  }

  if (missingRoles.length === 0) suggestions.push('✅ Party covers all major roles!');

  return { assignments, filledRoles, missingRoles, suggestions };
}

export function formatPartyAnalysis(characters: { name: string; class: string }[]): string {
  const { assignments, missingRoles, suggestions } = analyzeParty(characters);
  const lines = [`👥 **Party Composition** (${characters.length} members):`];
  for (const a of assignments) {
    const roleEmojis = a.roles.map((r) => ROLE_DESCRIPTIONS[r].emoji).join('');
    lines.push(`${roleEmojis} **${a.characterName}** (${a.charClass}): ${a.primaryRole} + ${a.roles.slice(1).join(', ')}`);
  }
  if (suggestions.length > 0) { lines.push('\n**Assessment:**'); for (const s of suggestions) lines.push(s); }
  return lines.join('\n');
}
