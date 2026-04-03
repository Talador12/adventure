// Trap disarm mini-game — sequential skill checks with escalating DCs.

export type TrapDifficulty = 'simple' | 'moderate' | 'complex' | 'deadly';
export type DisarmSkill = 'thieves_tools' | 'arcana' | 'investigation' | 'athletics' | 'perception' | 'sleight_of_hand';

export interface TrapDisarmChallenge {
  name: string;
  difficulty: TrapDifficulty;
  steps: DisarmStep[];
  failureDamage: string;
  failureEffect: string;
  timeLimit: number; // rounds to complete, 0 = no limit
  description: string;
}

export interface DisarmStep {
  order: number;
  skill: DisarmSkill;
  dc: number;
  description: string;
  failureDescription: string;
  optional: boolean; // skip for partial success
}

const CHALLENGES: TrapDisarmChallenge[] = [
  {
    name: 'Poisoned Needle Lock',
    difficulty: 'simple',
    steps: [
      { order: 1, skill: 'perception', dc: 12, description: 'Spot the tiny hole above the keyhole.', failureDescription: 'You miss the needle mechanism entirely.', optional: false },
      { order: 2, skill: 'thieves_tools', dc: 13, description: 'Wedge the needle in place with a thin pick.', failureDescription: 'The needle fires — CON save or poisoned.', optional: false },
    ],
    failureDamage: '1d4 + poison (CON DC 12)',
    failureEffect: 'Poisoned for 1 hour.',
    timeLimit: 0,
    description: 'A classic poisoned needle trap in a lock. Miss the signs and you get jabbed.',
  },
  {
    name: 'Arcane Glyph Ward',
    difficulty: 'moderate',
    steps: [
      { order: 1, skill: 'arcana', dc: 14, description: 'Identify the school of magic powering the glyph.', failureDescription: 'You misidentify the rune — wrong approach.', optional: false },
      { order: 2, skill: 'investigation', dc: 13, description: 'Find the anchor point where the glyph connects to the surface.', failureDescription: 'You touch the wrong part of the glyph.', optional: false },
      { order: 3, skill: 'arcana', dc: 15, description: 'Carefully unravel the magical threads from the anchor.', failureDescription: 'The glyph discharges its stored energy.', optional: false },
    ],
    failureDamage: '4d6 (type matches glyph school)',
    failureEffect: 'Area alarm triggered — nearby enemies alerted.',
    timeLimit: 3,
    description: 'A magical glyph carved into stone. It hums with stored energy — one wrong move and it detonates.',
  },
  {
    name: 'Collapsing Ceiling',
    difficulty: 'complex',
    steps: [
      { order: 1, skill: 'perception', dc: 15, description: 'Spot the pressure plate triggering mechanism.', failureDescription: 'You step on it. Clock starts ticking.', optional: false },
      { order: 2, skill: 'investigation', dc: 14, description: 'Trace the mechanism to the load-bearing support.', failureDescription: 'You follow the wrong cable.', optional: false },
      { order: 3, skill: 'athletics', dc: 14, description: 'Brace the support beam while others work.', failureDescription: 'The beam slips — partial collapse.', optional: false },
      { order: 4, skill: 'thieves_tools', dc: 16, description: 'Disconnect the trigger mechanism permanently.', failureDescription: 'The mechanism jams — 1 round until full collapse.', optional: false },
    ],
    failureDamage: '6d10 bludgeoning (DEX DC 14 half)',
    failureEffect: 'Area becomes difficult terrain. Buried creatures are restrained.',
    timeLimit: 4,
    description: 'The ceiling is rigged to collapse. Load-bearing pillars are weakened and a pressure plate is hidden in the floor.',
  },
  {
    name: 'Soul Siphon Altar',
    difficulty: 'deadly',
    steps: [
      { order: 1, skill: 'arcana', dc: 16, description: 'Identify the necrotic binding holding the trap together.', failureDescription: 'The altar senses your probe and attacks.', optional: false },
      { order: 2, skill: 'investigation', dc: 15, description: 'Find the three soul gems anchoring the siphon.', failureDescription: 'You disturb a false gem — necrotic backlash.', optional: false },
      { order: 3, skill: 'sleight_of_hand', dc: 16, description: 'Remove the first gem without breaking the circuit.', failureDescription: 'The circuit flares — life drain pulse.', optional: false },
      { order: 4, skill: 'arcana', dc: 17, description: 'Redirect the remaining energy safely before removing the last gems.', failureDescription: 'Uncontrolled energy release.', optional: false },
      { order: 5, skill: 'sleight_of_hand', dc: 15, description: 'Extract the final gems simultaneously.', failureDescription: 'The altar detonates.', optional: true },
    ],
    failureDamage: '8d6 necrotic',
    failureEffect: 'Max HP reduced by half the damage taken. Restored only by Greater Restoration.',
    timeLimit: 5,
    description: 'A dark altar pulses with stolen life force. Soul gems glow in recessed sockets. Touching it wrong could drain your very essence.',
  },
  {
    name: 'Tripwire Crossbow Battery',
    difficulty: 'simple',
    steps: [
      { order: 1, skill: 'perception', dc: 11, description: 'Notice the thin wire across the corridor.', failureDescription: 'You walk right into it.', optional: false },
      { order: 2, skill: 'thieves_tools', dc: 12, description: 'Cut the wire without triggering the tension release.', failureDescription: 'The wire snaps — bolts fly.', optional: false },
    ],
    failureDamage: '3d6 piercing',
    failureEffect: 'Noise alerts nearby patrols.',
    timeLimit: 0,
    description: 'A tripwire connected to hidden crossbows in the walls. Classic, effective, lethal.',
  },
  {
    name: 'Flooding Chamber',
    difficulty: 'moderate',
    steps: [
      { order: 1, skill: 'investigation', dc: 13, description: 'Locate the water inlet valves in the walls.', failureDescription: 'Water starts rising while you search.', optional: false },
      { order: 2, skill: 'athletics', dc: 14, description: 'Force the main valve shut against the water pressure.', failureDescription: 'The valve handle breaks. Water rises faster.', optional: false },
      { order: 3, skill: 'thieves_tools', dc: 14, description: 'Jam the secondary valve to prevent override.', failureDescription: 'The secondary valve opens — double flow.', optional: true },
    ],
    failureDamage: 'Drowning rules (CON checks DC 10+1 per round)',
    failureEffect: 'Room floods in 5 rounds. Swim speed required.',
    timeLimit: 5,
    description: 'The door seals behind you. Water pours from hidden vents. The room will fill in minutes.',
  },
];

export function getRandomChallenge(): TrapDisarmChallenge {
  return CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
}

export function getChallengesByDifficulty(difficulty: TrapDifficulty): TrapDisarmChallenge[] {
  return CHALLENGES.filter((c) => c.difficulty === difficulty);
}

export function getStepCount(challenge: TrapDisarmChallenge): number {
  return challenge.steps.length;
}

export function getRequiredSteps(challenge: TrapDisarmChallenge): DisarmStep[] {
  return challenge.steps.filter((s) => !s.optional);
}

export function calculateSuccessRate(challenge: TrapDisarmChallenge, skillModifiers: Record<DisarmSkill, number>): number {
  // Rough probability: for each step, P(success) = max(0.05, min(0.95, (20 - dc + mod + 1) / 20))
  let cumulative = 1;
  for (const step of getRequiredSteps(challenge)) {
    const mod = skillModifiers[step.skill] ?? 0;
    const p = Math.max(0.05, Math.min(0.95, (20 - step.dc + mod + 1) / 20));
    cumulative *= p;
  }
  return Math.round(cumulative * 100);
}

export function formatChallenge(challenge: TrapDisarmChallenge, showSteps: boolean = false): string {
  const icon = { simple: '🟢', moderate: '🟡', complex: '🟠', deadly: '🔴' }[challenge.difficulty];
  const lines = [`${icon} **${challenge.name}** *(${challenge.difficulty}${challenge.timeLimit > 0 ? `, ${challenge.timeLimit} rounds` : ''})*`];
  lines.push(`  *${challenge.description}*`);
  lines.push(`  Steps: ${challenge.steps.length} | Failure: ${challenge.failureDamage}`);
  if (showSteps) {
    challenge.steps.forEach((s) => {
      lines.push(`  ${s.order}. [${s.skill.replace(/_/g, ' ')}] DC ${s.dc}${s.optional ? ' (optional)' : ''} — ${s.description}`);
    });
  }
  return lines.join('\n');
}

export { CHALLENGES as TRAP_DISARM_CHALLENGES };
