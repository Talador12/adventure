// Treasure division calculator — auto-split gold and items with fairness scoring.
// Considers class needs, current gold, and item value for equitable distribution.

import type { Character, Item } from '../types/game';

export interface DivisionResult {
  goldPerCharacter: Record<string, number>;
  itemAssignments: { itemName: string; assignedTo: string; reason: string }[];
  fairnessScore: number; // 0-100, where 100 = perfectly fair
  summary: string;
}

export function divideGold(totalGold: number, characters: Character[]): Record<string, number> {
  if (characters.length === 0) return {};
  const even = Math.floor(totalGold / characters.length);
  const remainder = totalGold % characters.length;
  const result: Record<string, number> = {};

  // Give remainder to poorest character
  const sorted = [...characters].sort((a, b) => a.gold - b.gold);
  for (let i = 0; i < characters.length; i++) {
    result[characters[i].id] = even + (characters[i].id === sorted[0].id && remainder > 0 ? remainder : 0);
  }
  return result;
}

export function assignItems(items: Item[], characters: Character[]): { itemName: string; assignedTo: string; reason: string }[] {
  if (items.length === 0 || characters.length === 0) return [];
  const assignments: { itemName: string; assignedTo: string; reason: string }[] = [];

  const classPreferences: Record<string, string[]> = {
    Fighter: ['weapon', 'armor', 'shield'],
    Barbarian: ['weapon', 'armor'],
    Paladin: ['weapon', 'armor', 'shield'],
    Ranger: ['weapon', 'armor', 'ammunition'],
    Rogue: ['weapon', 'tool', 'misc'],
    Monk: ['weapon', 'misc'],
    Wizard: ['scroll', 'wand', 'misc', 'potion'],
    Sorcerer: ['wand', 'misc', 'potion'],
    Warlock: ['weapon', 'wand', 'misc'],
    Cleric: ['weapon', 'armor', 'shield', 'potion'],
    Druid: ['armor', 'potion', 'misc'],
    Bard: ['weapon', 'misc', 'potion'],
  };

  for (const item of items) {
    let bestChar: Character | null = null;
    let bestScore = -1;
    let bestReason = '';

    for (const char of characters) {
      let score = 0;
      const prefs = classPreferences[char.class] || ['misc'];

      // Type preference
      if (prefs.includes(item.type)) score += 3;

      // Needs-based (fewer items = higher priority)
      score += Math.max(0, 5 - (char.inventory?.length || 0));

      // Gold-based (poorer characters get priority for valuable items)
      if (char.gold < 50) score += 2;

      if (score > bestScore) {
        bestScore = score;
        bestChar = char;
        bestReason = prefs.includes(item.type) ? `${char.class} prefers ${item.type}` : 'Needs equipment';
      }
    }

    if (bestChar) {
      assignments.push({ itemName: item.name, assignedTo: bestChar.id, reason: bestReason });
    }
  }

  return assignments;
}

export function calculateFairness(goldDivision: Record<string, number>, totalGold: number, characterCount: number): number {
  if (characterCount === 0) return 100;
  const values = Object.values(goldDivision);
  const ideal = totalGold / characterCount;
  const maxDeviation = values.reduce((max, v) => Math.max(max, Math.abs(v - ideal)), 0);
  return Math.round(Math.max(0, 100 - (maxDeviation / Math.max(1, ideal)) * 100));
}

export function divideTreasure(totalGold: number, items: Item[], characters: Character[]): DivisionResult {
  const goldPerCharacter = divideGold(totalGold, characters);
  const itemAssignments = assignItems(items, characters);
  const fairnessScore = calculateFairness(goldPerCharacter, totalGold, characters.length);

  const charNames: Record<string, string> = {};
  for (const c of characters) charNames[c.id] = c.name;

  const lines: string[] = [];
  lines.push('**Gold:**');
  for (const [id, gold] of Object.entries(goldPerCharacter)) {
    lines.push(`  ${charNames[id] || id}: ${gold}gp`);
  }
  if (itemAssignments.length > 0) {
    lines.push('**Items:**');
    for (const a of itemAssignments) {
      lines.push(`  ${a.itemName} → ${charNames[a.assignedTo] || a.assignedTo} (${a.reason})`);
    }
  }
  lines.push(`Fairness: ${fairnessScore}%`);

  return { goldPerCharacter, itemAssignments, fairnessScore, summary: lines.join('\n') };
}

export function formatDivision(result: DivisionResult): string {
  return `💰 **Treasure Division:**\n${result.summary}`;
}
