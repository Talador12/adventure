// Quest reward scaler — auto-adjust gold/XP/items by party level and difficulty.
// Ensures rewards feel appropriate regardless of when the quest is completed.

export type QuestDifficulty = 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly';

export interface QuestReward {
  gold: number;
  xpPerCharacter: number;
  magicItemChance: number; // 0-1
  magicItemRarity: string;
  description: string;
}

const GOLD_PER_LEVEL: Record<QuestDifficulty, number> = { trivial: 10, easy: 25, medium: 50, hard: 100, deadly: 200 };
const XP_PER_LEVEL: Record<QuestDifficulty, number> = { trivial: 25, easy: 50, medium: 100, hard: 200, deadly: 400 };
const MAGIC_CHANCE: Record<QuestDifficulty, number> = { trivial: 0, easy: 0.1, medium: 0.25, hard: 0.5, deadly: 0.8 };

export function scaleReward(partyLevel: number, partySize: number, difficulty: QuestDifficulty): QuestReward {
  const gold = Math.round(GOLD_PER_LEVEL[difficulty] * partyLevel * (1 + partySize * 0.1));
  const xp = Math.round(XP_PER_LEVEL[difficulty] * partyLevel);
  const magicChance = MAGIC_CHANCE[difficulty];
  const rarity = partyLevel >= 11 ? 'rare' : partyLevel >= 5 ? 'uncommon' : 'common';

  return {
    gold, xpPerCharacter: xp, magicItemChance: magicChance, magicItemRarity: rarity,
    description: `${gold}gp total, ${xp} XP each${magicChance > 0 ? `, ${Math.round(magicChance * 100)}% chance of ${rarity} magic item` : ''}`,
  };
}

export function formatScaledReward(reward: QuestReward, partySize: number, difficulty: QuestDifficulty): string {
  const lines = [`🏆 **Quest Reward** (${difficulty}, Lv-scaled):`];
  lines.push(`💰 Gold: ${reward.gold}gp (${Math.round(reward.gold / partySize)}gp each)`);
  lines.push(`✨ XP: ${reward.xpPerCharacter} per character`);
  if (reward.magicItemChance > 0) lines.push(`🎁 Magic item: ${Math.round(reward.magicItemChance * 100)}% chance (${reward.magicItemRarity})`);
  return lines.join('\n');
}
