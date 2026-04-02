// Character goal tracker — per-character short/long-term goals with DM reward hooks.

export type GoalType = 'short_term' | 'long_term' | 'personal' | 'quest';
export type GoalStatus = 'active' | 'completed' | 'failed' | 'abandoned';

export interface CharacterGoal {
  id: string;
  characterId: string;
  type: GoalType;
  description: string;
  status: GoalStatus;
  reward?: string;
  createdAt: number;
  completedAt?: number;
}

export interface GoalTracker {
  goals: CharacterGoal[];
}

export function createGoalTracker(): GoalTracker { return { goals: [] }; }

export function addGoal(tracker: GoalTracker, characterId: string, type: GoalType, description: string, reward?: string): GoalTracker {
  return {
    goals: [...tracker.goals, {
      id: crypto.randomUUID(), characterId, type, description, status: 'active',
      reward, createdAt: Date.now(),
    }],
  };
}

export function updateGoalStatus(tracker: GoalTracker, goalId: string, status: GoalStatus): GoalTracker {
  return {
    goals: tracker.goals.map((g) =>
      g.id === goalId ? { ...g, status, completedAt: status === 'completed' ? Date.now() : g.completedAt } : g
    ),
  };
}

export function getActiveGoals(tracker: GoalTracker, characterId?: string): CharacterGoal[] {
  return tracker.goals.filter((g) => g.status === 'active' && (!characterId || g.characterId === characterId));
}

export function getCompletedGoals(tracker: GoalTracker, characterId?: string): CharacterGoal[] {
  return tracker.goals.filter((g) => g.status === 'completed' && (!characterId || g.characterId === characterId));
}

export function formatGoalTracker(tracker: GoalTracker, characterNames: Record<string, string>): string {
  const active = tracker.goals.filter((g) => g.status === 'active');
  const completed = tracker.goals.filter((g) => g.status === 'completed');
  if (active.length === 0 && completed.length === 0) return '🎯 **Goals:** None set yet.';
  const lines = ['🎯 **Character Goals:**'];
  if (active.length > 0) {
    lines.push('**Active:**');
    for (const g of active) {
      const name = characterNames[g.characterId] || g.characterId;
      const typeEmoji = g.type === 'short_term' ? '📋' : g.type === 'long_term' ? '🏔️' : g.type === 'personal' ? '💭' : '⚔️';
      lines.push(`${typeEmoji} **${name}**: ${g.description}${g.reward ? ` (Reward: ${g.reward})` : ''}`);
    }
  }
  if (completed.length > 0) lines.push(`✅ ${completed.length} goal${completed.length > 1 ? 's' : ''} completed`);
  return lines.join('\n');
}
