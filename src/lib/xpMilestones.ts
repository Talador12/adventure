// XP milestone calculator — DM sets story milestones that award XP on completion.
// Alternative to XP-per-kill. Rewards narrative progress.

export interface XPMilestone {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  completed: boolean;
  completedAt?: number;
  category: 'story' | 'exploration' | 'social' | 'combat' | 'secret';
}

export interface MilestoneTracker {
  milestones: XPMilestone[];
  totalXPAwarded: number;
}

export const MILESTONE_TEMPLATES: Omit<XPMilestone, 'id' | 'completed' | 'completedAt'>[] = [
  { name: 'Clear the Dungeon', description: 'Explore and clear all rooms of the dungeon.', xpReward: 500, category: 'exploration' },
  { name: 'Defeat the Boss', description: 'Defeat the main antagonist of this arc.', xpReward: 1000, category: 'combat' },
  { name: 'Forge an Alliance', description: 'Successfully negotiate an alliance with a faction.', xpReward: 300, category: 'social' },
  { name: 'Discover the Secret', description: 'Uncover the hidden truth behind the mystery.', xpReward: 400, category: 'secret' },
  { name: 'Rescue the Prisoner', description: 'Free the captive from their imprisonment.', xpReward: 250, category: 'story' },
  { name: 'Survive the Ambush', description: 'Survive the surprise attack with no casualties.', xpReward: 200, category: 'combat' },
  { name: 'Solve the Puzzle', description: 'Solve the ancient puzzle blocking progress.', xpReward: 300, category: 'exploration' },
  { name: 'Betray or Befriend', description: 'Make a pivotal choice about a key NPC.', xpReward: 350, category: 'story' },
];

export function createMilestoneTracker(): MilestoneTracker {
  return { milestones: [], totalXPAwarded: 0 };
}

export function addMilestone(tracker: MilestoneTracker, name: string, description: string, xpReward: number, category: XPMilestone['category']): MilestoneTracker {
  return {
    ...tracker,
    milestones: [...tracker.milestones, { id: crypto.randomUUID(), name, description, xpReward, completed: false, category }],
  };
}

export function completeMilestone(tracker: MilestoneTracker, milestoneId: string): { tracker: MilestoneTracker; xpAwarded: number } {
  const milestone = tracker.milestones.find((m) => m.id === milestoneId);
  if (!milestone || milestone.completed) return { tracker, xpAwarded: 0 };

  return {
    tracker: {
      milestones: tracker.milestones.map((m) =>
        m.id === milestoneId ? { ...m, completed: true, completedAt: Date.now() } : m
      ),
      totalXPAwarded: tracker.totalXPAwarded + milestone.xpReward,
    },
    xpAwarded: milestone.xpReward,
  };
}

export function getXPForLevel(level: number): number {
  const thresholds = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
  return thresholds[Math.min(level, 19)] || 0;
}

export function formatMilestoneTracker(tracker: MilestoneTracker): string {
  if (tracker.milestones.length === 0) return '🏆 **Milestones:** None set. DM can add story milestones.';
  const active = tracker.milestones.filter((m) => !m.completed);
  const completed = tracker.milestones.filter((m) => m.completed);
  const lines = [`🏆 **Milestones** (${tracker.totalXPAwarded} XP awarded):`];
  if (active.length > 0) {
    lines.push('**Active:**');
    for (const m of active) {
      const catEmoji = m.category === 'story' ? '📜' : m.category === 'exploration' ? '🗺️' : m.category === 'social' ? '💬' : m.category === 'combat' ? '⚔️' : '🤫';
      lines.push(`  ${catEmoji} **${m.name}** (${m.xpReward} XP) — ${m.description}`);
    }
  }
  if (completed.length > 0) lines.push(`✅ ${completed.length} milestone${completed.length > 1 ? 's' : ''} completed`);
  return lines.join('\n');
}
