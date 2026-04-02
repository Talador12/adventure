// Player character bonds — mechanical bonuses when bonded characters fight together.
// Two characters form a bond type; when adjacent in combat they gain situational buffs.

export type BondType = 'sworn_allies' | 'mentor_protege' | 'blood_oath' | 'rivals_respect' | 'soulbound' | 'shield_mates';

export interface CharacterBond {
  id: string;
  characterA: string; // character ID
  characterB: string;
  bondType: BondType;
  strength: number; // 1-3 (grows with shared combat)
  sharedCombats: number;
  createdAt: number;
}

export interface BondConfig {
  type: BondType;
  name: string;
  emoji: string;
  description: string;
  adjacentBonus: BondBonus;
  strengthScaling: string;
}

export interface BondBonus {
  attackBonus: number;
  acBonus: number;
  savingThrowBonus: number;
  tempHp: number;
  description: string;
}

export const BOND_CONFIGS: BondConfig[] = [
  {
    type: 'sworn_allies', name: 'Sworn Allies', emoji: '🤝',
    description: 'A formal oath of mutual protection. +1 AC when adjacent.',
    adjacentBonus: { attackBonus: 0, acBonus: 1, savingThrowBonus: 0, tempHp: 0, description: '+1 AC when adjacent to bond partner' },
    strengthScaling: 'Strength 2: +1 saving throws. Strength 3: +2 AC total.',
  },
  {
    type: 'mentor_protege', name: 'Mentor & Protege', emoji: '📖',
    description: 'One teaches, one learns. Protege gains +1 attack when mentor is within 30ft.',
    adjacentBonus: { attackBonus: 1, acBonus: 0, savingThrowBonus: 0, tempHp: 0, description: '+1 attack when near mentor' },
    strengthScaling: 'Strength 2: +1 to skill checks. Strength 3: +2 attack total.',
  },
  {
    type: 'blood_oath', name: 'Blood Oath', emoji: '🩸',
    description: 'Bound by blood — when one falls below half HP, the other gains fury.',
    adjacentBonus: { attackBonus: 2, acBonus: 0, savingThrowBonus: 0, tempHp: 0, description: '+2 attack when bond partner is below half HP' },
    strengthScaling: 'Strength 2: +1d6 damage on first hit. Strength 3: advantage on death saves.',
  },
  {
    type: 'rivals_respect', name: 'Rivals\' Respect', emoji: '⚔️',
    description: 'Competitive respect — both gain +1 attack when they can see each other in combat.',
    adjacentBonus: { attackBonus: 1, acBonus: 0, savingThrowBonus: 0, tempHp: 0, description: '+1 attack when rival is visible' },
    strengthScaling: 'Strength 2: +1 initiative. Strength 3: reroll one attack per combat.',
  },
  {
    type: 'soulbound', name: 'Soulbound', emoji: '💫',
    description: 'Mystical connection — share saving throw bonuses when adjacent.',
    adjacentBonus: { attackBonus: 0, acBonus: 0, savingThrowBonus: 2, tempHp: 0, description: '+2 saving throws when adjacent' },
    strengthScaling: 'Strength 2: sense partner\'s HP. Strength 3: once per long rest, swap HP totals.',
  },
  {
    type: 'shield_mates', name: 'Shield Mates', emoji: '🛡️',
    description: 'Trained to fight side by side — both gain +1 AC and temp HP when adjacent.',
    adjacentBonus: { attackBonus: 0, acBonus: 1, savingThrowBonus: 0, tempHp: 3, description: '+1 AC and 3 temp HP when adjacent' },
    strengthScaling: 'Strength 2: 5 temp HP. Strength 3: +2 AC total.',
  },
];

export function getBondConfig(type: BondType): BondConfig {
  return BOND_CONFIGS.find((b) => b.type === type) || BOND_CONFIGS[0];
}

export function getActiveBondBonuses(
  bonds: CharacterBond[],
  characterId: string,
  adjacentCharIds: string[],
): { bond: CharacterBond; config: BondConfig; bonus: BondBonus }[] {
  const active: { bond: CharacterBond; config: BondConfig; bonus: BondBonus }[] = [];

  for (const bond of bonds) {
    const partnerId = bond.characterA === characterId ? bond.characterB
      : bond.characterB === characterId ? bond.characterA : null;
    if (!partnerId || !adjacentCharIds.includes(partnerId)) continue;

    const config = getBondConfig(bond.bondType);
    const bonus = { ...config.adjacentBonus };

    // Scale by strength
    if (bond.strength >= 2) {
      if (bond.bondType === 'sworn_allies') bonus.savingThrowBonus += 1;
      if (bond.bondType === 'mentor_protege') bonus.attackBonus += 1;
      if (bond.bondType === 'shield_mates') bonus.tempHp = 5;
    }
    if (bond.strength >= 3) {
      if (bond.bondType === 'sworn_allies') bonus.acBonus = 2;
      if (bond.bondType === 'mentor_protege') bonus.attackBonus = 2;
      if (bond.bondType === 'shield_mates') bonus.acBonus = 2;
    }

    active.push({ bond, config, bonus });
  }

  return active;
}

export function incrementBondStrength(bond: CharacterBond): CharacterBond {
  const newCombats = bond.sharedCombats + 1;
  const newStrength = newCombats >= 10 ? 3 : newCombats >= 5 ? 2 : 1;
  return { ...bond, sharedCombats: newCombats, strength: newStrength };
}

export function formatBondStatus(bonds: CharacterBond[], characterNames: Record<string, string>): string {
  if (bonds.length === 0) return 'No character bonds formed yet.';
  const lines = ['💫 **Character Bonds:**'];
  for (const b of bonds) {
    const config = getBondConfig(b.bondType);
    const nameA = characterNames[b.characterA] || b.characterA;
    const nameB = characterNames[b.characterB] || b.characterB;
    lines.push(`${config.emoji} **${nameA}** ↔ **${nameB}**: ${config.name} (Str ${b.strength}, ${b.sharedCombats} combats)`);
  }
  return lines.join('\n');
}
