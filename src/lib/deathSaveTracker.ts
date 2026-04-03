// Death save tracker — visual death save widget with auto-stabilize/death.
// Tracks successes and failures per character, handles nat 1 and nat 20.

export interface DeathSaveState {
  characterId: string;
  characterName: string;
  successes: number; // 0-3
  failures: number;  // 0-3
  stabilized: boolean;
  dead: boolean;
  rolls: { roll: number; result: 'success' | 'failure' | 'critical_success' | 'critical_failure'; timestamp: number }[];
}

export function createDeathSaveState(characterId: string, characterName: string): DeathSaveState {
  return { characterId, characterName, successes: 0, failures: 0, stabilized: false, dead: false, rolls: [] };
}

export function rollDeathSave(state: DeathSaveState): { state: DeathSaveState; narration: string } {
  if (state.stabilized || state.dead) {
    return { state, narration: state.stabilized ? `${state.characterName} is already stable.` : `${state.characterName} is dead.` };
  }

  const roll = Math.floor(Math.random() * 20) + 1;
  let result: DeathSaveState['rolls'][0]['result'];
  let narration: string;
  const updated = { ...state, rolls: [...state.rolls] };

  if (roll === 20) {
    // Critical success: regain 1 HP
    result = 'critical_success';
    updated.successes = 3;
    updated.stabilized = true;
    narration = `🌟 **NAT 20!** ${state.characterName} surges back! They regain 1 HP and are conscious!`;
  } else if (roll === 1) {
    // Critical failure: 2 failures
    result = 'critical_failure';
    updated.failures = Math.min(3, state.failures + 2);
    narration = `💀 **NAT 1!** ${state.characterName}'s grip on life slips — 2 death save failures! (${updated.failures}/3)`;
  } else if (roll >= 10) {
    result = 'success';
    updated.successes = state.successes + 1;
    narration = `✅ Death save success (${roll})! ${state.characterName}: ${updated.successes}/3 successes, ${state.failures}/3 failures.`;
  } else {
    result = 'failure';
    updated.failures = state.failures + 1;
    narration = `❌ Death save failure (${roll})! ${state.characterName}: ${state.successes}/3 successes, ${updated.failures}/3 failures.`;
  }

  updated.rolls.push({ roll, result, timestamp: Date.now() });

  // Check for stabilize or death
  if (updated.successes >= 3 && !updated.stabilized) {
    updated.stabilized = true;
    narration += `\n🩹 **${state.characterName} stabilizes!**`;
  }
  if (updated.failures >= 3 && !updated.dead) {
    updated.dead = true;
    narration += `\n💀 **${state.characterName} has died.**`;
  }

  return { state: updated, narration };
}

export function takeDamageWhileDying(state: DeathSaveState, isCrit: boolean): { state: DeathSaveState; narration: string } {
  if (state.dead) return { state, narration: '' };
  const updated = { ...state, failures: Math.min(3, state.failures + (isCrit ? 2 : 1)) };
  let narration = `💥 ${state.characterName} takes damage while dying! +${isCrit ? 2 : 1} death failure${isCrit ? 's (critical hit!)' : ''} (${updated.failures}/3)`;
  if (updated.failures >= 3) { updated.dead = true; narration += `\n💀 **${state.characterName} has died.**`; }
  return { state: updated, narration };
}

export function formatDeathSaveStatus(state: DeathSaveState): string {
  if (state.dead) return `💀 **${state.characterName}**: Dead.`;
  if (state.stabilized) return `🩹 **${state.characterName}**: Stable (unconscious, 0 HP).`;
  const sBar = '🟢'.repeat(state.successes) + '⬜'.repeat(3 - state.successes);
  const fBar = '🔴'.repeat(state.failures) + '⬜'.repeat(3 - state.failures);
  return `⚰️ **${state.characterName}** — Saves [${sBar}] Fails [${fBar}]`;
}
