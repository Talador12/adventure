// Death save drama table — narrative beats for the moments between life and death.

export type DeathMoment = 'first_failure' | 'first_success' | 'second_failure' | 'second_success' | 'final_failure' | 'stabilized' | 'nat_20' | 'nat_1';

export interface DeathSaveNarration {
  moment: DeathMoment;
  narration: string;
  mechanicalNote: string;
  partyReaction: string;
}

const NARRATIONS: DeathSaveNarration[] = [
  // First failure
  { moment: 'first_failure', narration: 'Your vision blurs. The sounds of battle fade to a dull roar. You feel... cold.', mechanicalNote: '1 death save failure. 2 more and it\'s over.', partyReaction: '"They\'re down! Someone get to them!"' },
  { moment: 'first_failure', narration: 'Blood pools beneath you. Your fingers twitch, reaching for something that isn\'t there.', mechanicalNote: '1 death save failure.', partyReaction: 'The cleric\'s eyes go wide. They start pushing through enemies.' },
  // First success
  { moment: 'first_success', narration: 'A heartbeat. Faint, but there. You cling to it like a lifeline.', mechanicalNote: '1 death save success. Keep fighting.', partyReaction: '"They\'re still breathing! Hold on!"' },
  { moment: 'first_success', narration: 'You see a light. Not the metaphorical kind. A warm, golden glow at the edge of your vision.', mechanicalNote: '1 death save success.', partyReaction: 'The paladin prays under their breath.' },
  // Second failure
  { moment: 'second_failure', narration: 'The cold spreads. Your chest feels heavy. Memories flash — your first adventure, your first friend.', mechanicalNote: '2 death save failures. One more failure and you\'re gone.', partyReaction: 'Panic. Real panic. Someone screams your name.' },
  { moment: 'second_failure', narration: 'A whisper. Someone — something — calls your name from the other side.', mechanicalNote: '2 death save failures.', partyReaction: '"No. No, no, no. Not like this."' },
  // Second success
  { moment: 'second_success', narration: 'You grab the heartbeat with both hands. Not yet. Not today.', mechanicalNote: '2 death save successes. One more and you stabilize.', partyReaction: '"Come on. COME ON. You can do this."' },
  { moment: 'second_success', narration: 'The light grows warmer. A figure stands in it — someone you lost, smiling, pushing you back.', mechanicalNote: '2 death save successes.', partyReaction: 'The bard starts a healing song, voice cracking.' },
  // Final failure
  { moment: 'final_failure', narration: 'Silence. Perfect, terrible silence. The pain stops. Everything stops.', mechanicalNote: 'Dead. 3 failures. The character is gone unless revived.', partyReaction: 'Time slows. Everyone knows. The battlefield goes quiet for one heartbeat.' },
  { moment: 'final_failure', narration: 'You reach for the light — but it\'s behind you now. The darkness is warm. It feels like sleep.', mechanicalNote: 'Dead.', partyReaction: 'The fighter catches the body before it falls. They don\'t let go.' },
  // Stabilized
  { moment: 'stabilized', narration: 'The heartbeat steadies. The cold retreats. You\'re alive — broken, bleeding, but alive.', mechanicalNote: 'Stabilized at 0 HP. Unconscious but no longer dying.', partyReaction: '"They\'re stable. Thank the gods. Someone get a potion."' },
  { moment: 'stabilized', narration: 'The figure in the light nods, satisfied. "Not your time." The world rushes back.', mechanicalNote: 'Stabilized.', partyReaction: 'Relief. Tears. Probably a hug that hurts because of the wounds.' },
  // Nat 20
  { moment: 'nat_20', narration: 'Your eyes snap open. You gasp, cough, and sit up. Death blinks in surprise.', mechanicalNote: 'Natural 20: regain 1 HP. You\'re conscious and back in the fight.', partyReaction: '"THEY\'RE UP! HOW ARE THEY UP?!" Cheering. Disbelief. The enemy looks worried.' },
  { moment: 'nat_20', narration: 'A surge of defiance. Not rage — purpose. You have unfinished business. Death can wait.', mechanicalNote: 'Natural 20: regain 1 HP.', partyReaction: 'The barbarian grins. "That\'s more like it."' },
  // Nat 1
  { moment: 'nat_1', narration: 'Your body convulses. Blood where there shouldn\'t be blood. This is bad. This is very bad.', mechanicalNote: 'Natural 1: counts as 2 death save failures.', partyReaction: '"NO!" Someone breaks formation to reach you. The healer is sprinting.' },
  { moment: 'nat_1', narration: 'The whisper from the other side becomes a shout. Something PULLS.', mechanicalNote: 'Natural 1: 2 failures.', partyReaction: 'The cleric drops everything and dashes. Nothing else matters right now.' },
];

export function getNarration(moment: DeathMoment): DeathSaveNarration {
  const pool = NARRATIONS.filter((n) => n.moment === moment);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getAllNarrations(moment: DeathMoment): DeathSaveNarration[] {
  return NARRATIONS.filter((n) => n.moment === moment);
}

export function getAllMoments(): DeathMoment[] {
  return [...new Set(NARRATIONS.map((n) => n.moment))];
}

export function getNarrationCount(): number {
  return NARRATIONS.length;
}

export function formatNarration(narration: DeathSaveNarration): string {
  const icon = { first_failure: '💀', first_success: '💗', second_failure: '☠️', second_success: '💓', final_failure: '⚰️', stabilized: '🏥', nat_20: '⭐', nat_1: '🩸' }[narration.moment];
  const lines = [`${icon} **${narration.moment.replace(/_/g, ' ').toUpperCase()}**`];
  lines.push(`  *${narration.narration}*`);
  lines.push(`  ⚙️ ${narration.mechanicalNote}`);
  lines.push(`  💬 Party: ${narration.partyReaction}`);
  return lines.join('\n');
}

export { NARRATIONS as DEATH_SAVE_NARRATIONS };
