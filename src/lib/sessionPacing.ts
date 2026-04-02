// Session pacing advisor — analyzes session flow and suggests transitions.
// Helps DMs know when to wrap combat, call for rests, or shift to roleplay.

export interface PacingAdvice {
  type: 'end_combat' | 'call_rest' | 'shift_roleplay' | 'increase_tension' | 'wrap_session';
  message: string;
  urgency: 'low' | 'medium' | 'high';
  reason: string;
}

export function analyzePacing(
  combatRound: number,
  inCombat: boolean,
  partyHpPercent: number, // 0-1, average HP % across party
  enemyHpPercent: number, // 0-1, average enemy HP %
  combatLogLength: number,
  dmHistoryLength: number,
  sessionMinutes: number,
  lastRestRound: number, // how many rounds since last rest (approximated)
): PacingAdvice[] {
  const advice: PacingAdvice[] = [];

  // Combat-specific pacing
  if (inCombat) {
    // Long combat warning
    if (combatRound >= 8) {
      advice.push({
        type: 'end_combat',
        message: `Combat has lasted ${combatRound} rounds. Consider having remaining enemies flee or surrender.`,
        urgency: combatRound >= 12 ? 'high' : 'medium',
        reason: 'Most D&D combats resolve in 3-5 rounds. Extended combat can drag session energy.',
      });
    }

    // Party is hurting
    if (partyHpPercent < 0.3) {
      advice.push({
        type: 'call_rest',
        message: 'Party is badly wounded. Consider giving them an opportunity to retreat or rest after this fight.',
        urgency: 'high',
        reason: 'Party average HP is below 30%. A TPK risks ending the session badly.',
      });
    }

    // Enemies are nearly done
    if (enemyHpPercent < 0.15 && combatRound >= 3) {
      advice.push({
        type: 'end_combat',
        message: 'Enemies are nearly defeated. Consider narrating the final moments instead of rolling them out.',
        urgency: 'low',
        reason: 'Mopping up the last few HP of enemies is often anticlimactic.',
      });
    }
  }

  // Non-combat pacing
  if (!inCombat) {
    // Long stretch without combat
    if (dmHistoryLength > 15 && combatLogLength < 5) {
      advice.push({
        type: 'increase_tension',
        message: 'Long stretch of roleplay. Consider introducing a skill challenge, combat encounter, or time pressure.',
        urgency: 'low',
        reason: 'Extended roleplay-only sessions work for some groups but can lose momentum.',
      });
    }

    // Session length warnings
    if (sessionMinutes >= 180) {
      advice.push({
        type: 'wrap_session',
        message: `Session has been running ${Math.round(sessionMinutes / 60)} hours. Look for a natural stopping point.`,
        urgency: sessionMinutes >= 240 ? 'high' : 'medium',
        reason: 'Most groups lose focus after 3-4 hours. End on a high note or cliffhanger.',
      });
    }
  }

  // Rest pacing (general)
  if (lastRestRound > 20 && !inCombat) {
    advice.push({
      type: 'call_rest',
      message: 'The party hasn\'t rested in a while. Consider offering a short rest opportunity.',
      urgency: 'low',
      reason: 'D&D 5e expects 2-3 short rests per long rest. Resource recovery keeps the game fun.',
    });
  }

  // Shift to roleplay after combat
  if (!inCombat && combatLogLength > 20 && dmHistoryLength < 5) {
    advice.push({
      type: 'shift_roleplay',
      message: 'Fresh out of combat. Great time for NPC interaction, exploration, or story development.',
      urgency: 'low',
      reason: 'Post-combat is a natural decompression point. Players often enjoy reflecting on what happened.',
    });
  }

  return advice;
}

export function formatPacingAdvice(advice: PacingAdvice[]): string {
  if (advice.length === 0) return '✅ Session pacing looks good. No suggestions right now.';
  const lines = ['🎬 **Pacing Advisor:**'];
  for (const a of advice) {
    const icon = a.urgency === 'high' ? '🔴' : a.urgency === 'medium' ? '🟡' : '🟢';
    lines.push(`${icon} ${a.message}`);
  }
  return lines.join('\n');
}
