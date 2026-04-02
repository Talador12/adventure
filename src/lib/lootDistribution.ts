// Smart loot distribution — suggests which character should receive each item
// based on class, build, existing equipment, and stat synergies.

import type { Character, Item } from '../types/game';

interface LootSuggestion {
  itemName: string;
  suggestedCharacter: string;
  reason: string;
  score: number; // higher = better fit
}

const CLASS_WEAPON_PREFS: Record<string, string[]> = {
  Fighter: ['weapon', 'armor'], Barbarian: ['weapon', 'armor'], Paladin: ['weapon', 'armor'],
  Ranger: ['weapon'], Rogue: ['weapon'],
  Wizard: ['wondrous', 'ring', 'scroll'], Sorcerer: ['wondrous', 'ring'],
  Warlock: ['weapon', 'wondrous'], Cleric: ['armor', 'wondrous'],
  Druid: ['wondrous', 'armor'], Bard: ['wondrous', 'weapon'], Monk: ['wondrous'],
};

const CLASS_STAT_PRIORITY: Record<string, string> = {
  Fighter: 'STR', Barbarian: 'STR', Paladin: 'CHA', Ranger: 'DEX',
  Rogue: 'DEX', Wizard: 'INT', Sorcerer: 'CHA', Warlock: 'CHA',
  Cleric: 'WIS', Druid: 'WIS', Bard: 'CHA', Monk: 'DEX',
};

function scoreItemForCharacter(item: Item, char: Character): { score: number; reason: string } {
  let score = 0;
  const reasons: string[] = [];

  // Type preference
  const prefs = CLASS_WEAPON_PREFS[char.class] || [];
  if (prefs.includes(item.type)) {
    score += 3;
    reasons.push(`${char.class} prefers ${item.type} items`);
  }

  // AC bonus for tanks
  if (item.acBonus && ['Fighter', 'Paladin', 'Cleric', 'Barbarian'].includes(char.class)) {
    score += 4;
    reasons.push('frontline fighter benefits from AC');
  }

  // Attack bonus for martial classes
  if (item.attackBonus && ['Fighter', 'Ranger', 'Rogue', 'Paladin', 'Barbarian'].includes(char.class)) {
    score += 3;
    reasons.push('martial class benefits from attack bonus');
  }

  // Healing items for lowest HP character
  if (item.healAmount && char.hp < char.maxHp * 0.5) {
    score += 5;
    reasons.push('wounded — needs healing');
  }

  // Potions for squishiest
  if (item.type === 'potion' && char.maxHp <= 30) {
    score += 2;
    reasons.push('low HP pool — potion is insurance');
  }

  // Wondrous items for casters
  if (item.type === 'misc' && ['Wizard', 'Sorcerer', 'Warlock', 'Bard'].includes(char.class)) {
    score += 2;
    reasons.push('caster benefits from magical items');
  }

  // Don't suggest items the character already has a better version of
  const hasSimilar = (char.inventory || []).some((i) => i.type === item.type && (i.attackBonus || 0) >= (item.attackBonus || 0));
  if (hasSimilar) {
    score -= 3;
    reasons.push('already has similar or better');
  }

  return { score, reason: reasons.slice(0, 2).join('; ') || 'general use' };
}

export function suggestLootDistribution(items: Item[], characters: Character[]): LootSuggestion[] {
  if (characters.length === 0 || items.length === 0) return [];

  return items.map((item) => {
    let bestChar = characters[0];
    let bestScore = -Infinity;
    let bestReason = '';

    for (const char of characters) {
      const { score, reason } = scoreItemForCharacter(item, char);
      if (score > bestScore) {
        bestScore = score;
        bestChar = char;
        bestReason = reason;
      }
    }

    return {
      itemName: item.name,
      suggestedCharacter: bestChar.name,
      reason: bestReason,
      score: bestScore,
    };
  });
}

export function formatLootSuggestions(suggestions: LootSuggestion[]): string {
  if (suggestions.length === 0) return '';
  return suggestions.map((s) => `• **${s.itemName}** → ${s.suggestedCharacter} (${s.reason})`).join('\n');
}
