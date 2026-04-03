// Rest benefit summary — show exactly what each character recovers.

export interface RestBenefit { characterName: string; hpRecovered: string; hitDiceRecovered: string; spellSlotsRecovered: string; featuresRestored: string[]; exhaustionRemoved: boolean; otherBenefits: string[]; }

export function calculateShortRestBenefits(characterName: string, charClass: string, currentHp: number, maxHp: number, hitDiceRemaining: number, totalHitDice: number): RestBenefit {
  const canSpend = hitDiceRemaining > 0 && currentHp < maxHp;
  return {
    characterName, hpRecovered: canSpend ? `Spend up to ${hitDiceRemaining} hit dice` : currentHp >= maxHp ? 'Already at full HP' : 'No hit dice remaining',
    hitDiceRecovered: 'None (short rest)', spellSlotsRecovered: charClass === 'Warlock' ? 'Pact magic slots restored' : 'None',
    featuresRestored: getShortRestFeatures(charClass), exhaustionRemoved: false, otherBenefits: ['Second Wind (Fighter)', 'Channel Divinity (Cleric/Paladin)', 'Ki Points (Monk)', 'Action Surge (Fighter)'].filter((f) => f.includes(charClass.slice(0, 4))),
  };
}

export function calculateLongRestBenefits(characterName: string, charClass: string, currentHp: number, maxHp: number, hitDiceRemaining: number, totalHitDice: number, exhaustionLevel: number): RestBenefit {
  const hdRecovered = Math.max(1, Math.floor(totalHitDice / 2));
  return {
    characterName, hpRecovered: currentHp < maxHp ? `All HP restored (${maxHp - currentHp} healed)` : 'Already at full HP',
    hitDiceRecovered: `${hdRecovered} hit dice restored (${Math.min(totalHitDice, hitDiceRemaining + hdRecovered)}/${totalHitDice})`,
    spellSlotsRecovered: 'All spell slots restored', featuresRestored: ['All daily features restored'],
    exhaustionRemoved: exhaustionLevel > 0, otherBenefits: exhaustionLevel > 0 ? [`Exhaustion reduced by 1 (${exhaustionLevel} → ${exhaustionLevel - 1})`] : [],
  };
}

function getShortRestFeatures(charClass: string): string[] {
  const features: Record<string, string[]> = {
    Fighter: ['Action Surge', 'Second Wind'], Monk: ['Ki Points'], Cleric: ['Channel Divinity'],
    Paladin: ['Channel Divinity'], Druid: ['Wild Shape'], Bard: ['Bardic Inspiration (Lv5+)'],
    Warlock: ['Pact Magic slots'],
  };
  return features[charClass] || [];
}

export function formatRestBenefits(benefits: RestBenefit[], restType: 'short' | 'long'): string {
  const icon = restType === 'long' ? '🌙' : '☕';
  const lines = [`${icon} **${restType === 'long' ? 'Long' : 'Short'} Rest Benefits:**`];
  for (const b of benefits) {
    lines.push(`**${b.characterName}:**`);
    lines.push(`  ❤️ HP: ${b.hpRecovered}`);
    lines.push(`  🎲 Hit Dice: ${b.hitDiceRecovered}`);
    lines.push(`  🔮 Spell Slots: ${b.spellSlotsRecovered}`);
    if (b.featuresRestored.length > 0) lines.push(`  ⚡ Features: ${b.featuresRestored.join(', ')}`);
    if (b.exhaustionRemoved) lines.push(`  😴 Exhaustion: -1 level`);
  }
  return lines.join('\n');
}
