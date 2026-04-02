// Cross-session character progression — persistent XP/gold/items across campaigns.
// Characters accumulate progression from every campaign they participate in.
// Stored per-character in localStorage, synced to server via character save.

import type { Character, Item } from '../types/game';

export interface ProgressionSnapshot {
  characterId: string;
  campaignId: string;
  timestamp: number;
  xpGained: number;
  goldGained: number;
  goldSpent: number;
  itemsFound: string[]; // item names
  killCount: number;
  sessionsPlayed: number;
  highestLevel: number;
}

export interface CharacterLifetime {
  characterId: string;
  totalXP: number;
  totalGold: number;
  totalKills: number;
  totalSessions: number;
  campaignsPlayed: string[];
  achievements: string[];
  snapshots: ProgressionSnapshot[];
}

const STORAGE_KEY = 'adventure:progression';

function loadAll(): Record<string, CharacterLifetime> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: Record<string, CharacterLifetime>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* storage full */ }
}

export function getCharacterLifetime(characterId: string): CharacterLifetime {
  const all = loadAll();
  return all[characterId] || {
    characterId,
    totalXP: 0,
    totalGold: 0,
    totalKills: 0,
    totalSessions: 0,
    campaignsPlayed: [],
    achievements: [],
    snapshots: [],
  };
}

export function recordSessionEnd(
  characterId: string,
  campaignId: string,
  xpGained: number,
  goldGained: number,
  goldSpent: number,
  killCount: number,
  itemsFound: string[],
  level: number,
): ProgressionSnapshot {
  const all = loadAll();
  const lifetime = all[characterId] || {
    characterId,
    totalXP: 0,
    totalGold: 0,
    totalKills: 0,
    totalSessions: 0,
    campaignsPlayed: [],
    achievements: [],
    snapshots: [],
  };

  const snapshot: ProgressionSnapshot = {
    characterId,
    campaignId,
    timestamp: Date.now(),
    xpGained,
    goldGained,
    goldSpent,
    itemsFound,
    killCount,
    sessionsPlayed: 1,
    highestLevel: level,
  };

  lifetime.totalXP += xpGained;
  lifetime.totalGold += goldGained - goldSpent;
  lifetime.totalKills += killCount;
  lifetime.totalSessions += 1;
  if (!lifetime.campaignsPlayed.includes(campaignId)) {
    lifetime.campaignsPlayed.push(campaignId);
  }
  lifetime.snapshots.push(snapshot);
  // Cap snapshots to last 50
  if (lifetime.snapshots.length > 50) {
    lifetime.snapshots = lifetime.snapshots.slice(-50);
  }

  // Check progression achievements
  const newAchievements: string[] = [];
  if (lifetime.totalKills >= 100 && !lifetime.achievements.includes('centurion')) {
    lifetime.achievements.push('centurion');
    newAchievements.push('Centurion (100 kills across campaigns)');
  }
  if (lifetime.totalSessions >= 10 && !lifetime.achievements.includes('veteran')) {
    lifetime.achievements.push('veteran');
    newAchievements.push('Veteran (10 sessions played)');
  }
  if (lifetime.totalSessions >= 50 && !lifetime.achievements.includes('legend')) {
    lifetime.achievements.push('legend');
    newAchievements.push('Legend (50 sessions played)');
  }
  if (lifetime.campaignsPlayed.length >= 3 && !lifetime.achievements.includes('wanderer')) {
    lifetime.achievements.push('wanderer');
    newAchievements.push('Wanderer (3 campaigns played)');
  }
  if (lifetime.totalGold >= 10000 && !lifetime.achievements.includes('wealthy')) {
    lifetime.achievements.push('wealthy');
    newAchievements.push('Wealthy (10,000+ gold earned)');
  }
  if (level >= 20 && !lifetime.achievements.includes('max_level')) {
    lifetime.achievements.push('max_level');
    newAchievements.push('Ascended (reached level 20)');
  }

  all[characterId] = lifetime;
  saveAll(all);

  return snapshot;
}

export function formatProgressionSummary(lifetime: CharacterLifetime): string {
  const lines = ['📊 **Lifetime Progression:**'];
  lines.push(`Campaigns: ${lifetime.campaignsPlayed.length}`);
  lines.push(`Sessions: ${lifetime.totalSessions}`);
  lines.push(`Total XP: ${lifetime.totalXP.toLocaleString()}`);
  lines.push(`Net Gold: ${lifetime.totalGold.toLocaleString()}`);
  lines.push(`Total Kills: ${lifetime.totalKills.toLocaleString()}`);
  if (lifetime.achievements.length > 0) {
    lines.push(`Achievements: ${lifetime.achievements.length}`);
  }
  return lines.join('\n');
}

export function getProgressionBadge(lifetime: CharacterLifetime): { label: string; color: string } | null {
  if (lifetime.totalSessions >= 50) return { label: 'Legend', color: 'text-amber-400' };
  if (lifetime.totalSessions >= 25) return { label: 'Hero', color: 'text-purple-400' };
  if (lifetime.totalSessions >= 10) return { label: 'Veteran', color: 'text-blue-400' };
  if (lifetime.totalSessions >= 5) return { label: 'Adventurer', color: 'text-emerald-400' };
  if (lifetime.totalSessions >= 1) return { label: 'Rookie', color: 'text-slate-400' };
  return null;
}
