// Skill challenge framework — complex tasks requiring multiple checks.
// Track successes/failures toward a threshold. Failure has consequences.

export interface SkillChallenge {
  id: string;
  name: string;
  description: string;
  successesRequired: number;
  failuresAllowed: number;
  currentSuccesses: number;
  currentFailures: number;
  allowedSkills: string[];
  dc: number;
  completed: boolean;
  succeeded: boolean;
  successOutcome: string;
  failureOutcome: string;
  rounds: SkillChallengeRound[];
}

export interface SkillChallengeRound {
  characterName: string;
  skill: string;
  roll: number;
  dc: number;
  success: boolean;
}

export const SKILL_CHALLENGE_TEMPLATES: Omit<SkillChallenge, 'id' | 'currentSuccesses' | 'currentFailures' | 'completed' | 'succeeded' | 'rounds'>[] = [
  {
    name: 'Chase Scene', description: 'The party pursues a fleeing target through crowded streets.',
    successesRequired: 5, failuresAllowed: 3, dc: 13,
    allowedSkills: ['Athletics', 'Acrobatics', 'Perception', 'Investigation', 'Persuasion'],
    successOutcome: 'You corner the target in an alley. They surrender.', failureOutcome: 'The target disappears into the crowd. The trail goes cold.',
  },
  {
    name: 'Collapsing Dungeon', description: 'The ceiling is caving in. Get out before it\'s too late!',
    successesRequired: 4, failuresAllowed: 2, dc: 14,
    allowedSkills: ['Athletics', 'Acrobatics', 'Perception', 'Survival', 'Investigation'],
    successOutcome: 'You burst out of the crumbling entrance, coughing dust but alive.', failureOutcome: 'Rubble pins someone. Take 4d6 bludgeoning damage and lose equipment.',
  },
  {
    name: 'Diplomatic Negotiation', description: 'Convince the rival faction to accept a truce.',
    successesRequired: 5, failuresAllowed: 3, dc: 12,
    allowedSkills: ['Persuasion', 'Insight', 'Deception', 'Intimidation', 'History'],
    successOutcome: 'The faction leader nods. "We have an accord."', failureOutcome: 'Talks break down. The faction declares you enemies.',
  },
  {
    name: 'Wilderness Survival', description: 'Navigate through a deadly wilderness to reach your destination.',
    successesRequired: 6, failuresAllowed: 3, dc: 13,
    allowedSkills: ['Survival', 'Nature', 'Perception', 'Athletics', 'Medicine'],
    successOutcome: 'You emerge from the wilderness, battered but on course.', failureOutcome: 'The party is lost. Gain 1 level of exhaustion and lose 1d4 days.',
  },
  {
    name: 'Heist', description: 'Infiltrate a guarded building and retrieve the target item.',
    successesRequired: 5, failuresAllowed: 2, dc: 15,
    allowedSkills: ['Stealth', 'Sleight of Hand', 'Deception', 'Perception', 'Thieves\' Tools'],
    successOutcome: 'You slip out with the item, leaving no trace.', failureOutcome: 'Alarms sound! Guards converge on your position. Roll initiative.',
  },
];

export function createChallenge(template: typeof SKILL_CHALLENGE_TEMPLATES[0]): SkillChallenge {
  return {
    id: crypto.randomUUID(),
    ...template,
    currentSuccesses: 0,
    currentFailures: 0,
    completed: false,
    succeeded: false,
    rounds: [],
  };
}

export function resolveCheck(challenge: SkillChallenge, characterName: string, skill: string, roll: number): SkillChallenge {
  if (challenge.completed) return challenge;
  const success = roll >= challenge.dc;
  const updated = {
    ...challenge,
    currentSuccesses: challenge.currentSuccesses + (success ? 1 : 0),
    currentFailures: challenge.currentFailures + (success ? 0 : 1),
    rounds: [...challenge.rounds, { characterName, skill, roll, dc: challenge.dc, success }],
  };
  if (updated.currentSuccesses >= updated.successesRequired) {
    updated.completed = true;
    updated.succeeded = true;
  } else if (updated.currentFailures > updated.failuresAllowed) {
    updated.completed = true;
    updated.succeeded = false;
  }
  return updated;
}

export function formatChallengeStatus(c: SkillChallenge): string {
  const lines = [`🎯 **${c.name}** — ${c.description}`];
  const bar = '🟢'.repeat(c.currentSuccesses) + '⬜'.repeat(c.successesRequired - c.currentSuccesses);
  const failBar = '🔴'.repeat(c.currentFailures) + '⬜'.repeat(c.failuresAllowed + 1 - c.currentFailures);
  lines.push(`Successes: ${bar} (${c.currentSuccesses}/${c.successesRequired})`);
  lines.push(`Failures: ${failBar} (${c.currentFailures}/${c.failuresAllowed + 1} max)`);
  lines.push(`DC: ${c.dc} | Skills: ${c.allowedSkills.join(', ')}`);
  if (c.completed) {
    lines.push(c.succeeded ? `✅ **SUCCESS!** ${c.successOutcome}` : `❌ **FAILED!** ${c.failureOutcome}`);
  }
  return lines.join('\n');
}
