// Skill challenge DC reference — DC by difficulty for quick DM rulings.

export interface DCEntry { difficulty: string; dc: number; description: string; examples: string[]; }

export const DC_TABLE: DCEntry[] = [
  { difficulty: 'Trivial', dc: 5, description: 'Almost anyone can do this.', examples: ['Climb a knotted rope', 'Recognize a common symbol', 'Recall widely known facts'] },
  { difficulty: 'Easy', dc: 10, description: 'A competent person succeeds most of the time.', examples: ['Pick a simple lock', 'Calm a frightened animal', 'Navigate a familiar area'] },
  { difficulty: 'Medium', dc: 15, description: 'Requires focus and skill.', examples: ['Disarm a standard trap', 'Persuade an indifferent NPC', 'Swim against a moderate current'] },
  { difficulty: 'Hard', dc: 20, description: 'Even skilled individuals may fail.', examples: ['Pick a high-quality lock', 'Track over hard ground', 'Convince a hostile NPC'] },
  { difficulty: 'Very Hard', dc: 25, description: 'Exceptional ability required.', examples: ['Escape artist-level contortion', 'Recall obscure ancient lore', 'Leap a 30ft chasm'] },
  { difficulty: 'Nearly Impossible', dc: 30, description: 'Only legendary heroes attempt this.', examples: ['Track in a blizzard', 'Persuade a dragon', 'Climb a greased surface in a hurricane'] },
];

export function getDCForDifficulty(difficulty: string): number {
  const entry = DC_TABLE.find((d) => d.difficulty.toLowerCase() === difficulty.toLowerCase());
  return entry?.dc || 15;
}

export function suggestDC(taskDescription: string): number {
  const lower = taskDescription.toLowerCase();
  if (lower.includes('easy') || lower.includes('simple')) return 10;
  if (lower.includes('hard') || lower.includes('difficult')) return 20;
  if (lower.includes('impossible') || lower.includes('legendary')) return 25;
  return 15; // default medium
}

export function formatDCReference(): string {
  const lines = ['📋 **DC Quick Reference:**'];
  for (const d of DC_TABLE) {
    lines.push(`**DC ${d.dc}** (${d.difficulty}): ${d.description}`);
    lines.push(`  Examples: ${d.examples.join('; ')}`);
  }
  return lines.join('\n');
}
