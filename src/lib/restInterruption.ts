// Rest interruption system — random encounter chance during long rests.
// Partial recovery if rest is interrupted before completion.

export interface RestAttempt {
  type: 'short' | 'long';
  startHour: number;
  hoursCompleted: number;
  hoursRequired: number;
  interrupted: boolean;
  interruptionHour: number;
  encounterOccurred: boolean;
}

export interface RestRecovery {
  hpRecovered: number; // percentage 0-100
  hitDiceRecovered: number;
  spellSlotsRecovered: boolean;
  exhaustionRecovered: boolean;
  description: string;
}

export function calculateInterruptionChance(terrainDanger: number, hasWatchSchedule: boolean): number {
  // Base: 15% per 2-hour watch period. Danger multiplier. Watch halves it.
  const base = 15 + terrainDanger * 5;
  return hasWatchSchedule ? Math.floor(base / 2) : base;
}

export function rollRestInterruption(
  restType: 'short' | 'long',
  terrainDanger: number = 0,
  hasWatch: boolean = true,
): RestAttempt {
  const hoursRequired = restType === 'long' ? 8 : 1;
  const chancePerPeriod = calculateInterruptionChance(terrainDanger, hasWatch);

  let interrupted = false;
  let interruptionHour = 0;
  const periods = restType === 'long' ? 4 : 1; // check every 2 hours for long rest

  for (let i = 0; i < periods; i++) {
    if (Math.floor(Math.random() * 100) + 1 <= chancePerPeriod) {
      interrupted = true;
      interruptionHour = (i + 1) * (restType === 'long' ? 2 : 1);
      break;
    }
  }

  return {
    type: restType,
    startHour: 0, // caller sets this
    hoursCompleted: interrupted ? interruptionHour : hoursRequired,
    hoursRequired,
    interrupted,
    interruptionHour,
    encounterOccurred: interrupted,
  };
}

export function calculatePartialRecovery(attempt: RestAttempt, maxHp: number, totalHitDice: number): RestRecovery {
  if (!attempt.interrupted) {
    // Full rest benefits
    if (attempt.type === 'long') {
      return { hpRecovered: 100, hitDiceRecovered: Math.ceil(totalHitDice / 2), spellSlotsRecovered: true, exhaustionRecovered: true, description: 'Full long rest completed. All HP restored, half hit dice recovered, spell slots and exhaustion reset.' };
    }
    return { hpRecovered: 0, hitDiceRecovered: 0, spellSlotsRecovered: false, exhaustionRecovered: false, description: 'Short rest completed. Spend hit dice to recover HP.' };
  }

  // Partial long rest (5e rules: need at least 1 hour of rest to count as short rest equivalent)
  const completionRatio = attempt.hoursCompleted / attempt.hoursRequired;

  if (attempt.type === 'long') {
    if (attempt.hoursCompleted >= 1) {
      // At least 1 hour = short rest benefits
      return {
        hpRecovered: 0, // can spend hit dice
        hitDiceRecovered: 0,
        spellSlotsRecovered: false,
        exhaustionRecovered: false,
        description: `Long rest interrupted after ${attempt.hoursCompleted} hours. Counts as a short rest (spend hit dice). No spell slot or exhaustion recovery.`,
      };
    }
    return { hpRecovered: 0, hitDiceRecovered: 0, spellSlotsRecovered: false, exhaustionRecovered: false, description: `Long rest interrupted after ${attempt.hoursCompleted} hours. Too short for any recovery.` };
  }

  return { hpRecovered: 0, hitDiceRecovered: 0, spellSlotsRecovered: false, exhaustionRecovered: false, description: 'Short rest interrupted. No recovery.' };
}

export function formatRestResult(attempt: RestAttempt, recovery: RestRecovery): string {
  const icon = attempt.interrupted ? '⚠️' : '✅';
  const lines = [`${icon} **${attempt.type === 'long' ? 'Long' : 'Short'} Rest ${attempt.interrupted ? 'INTERRUPTED' : 'Complete'}**`];
  lines.push(recovery.description);
  if (attempt.interrupted) lines.push(`🗡️ Encounter at hour ${attempt.interruptionHour}! Roll initiative!`);
  return lines.join('\n');
}
