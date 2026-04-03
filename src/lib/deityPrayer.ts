// Deity prayer system — pray for boons with devotion tracking.

export interface PrayerState { characterId: string; deityName: string; devotion: number; prayersToday: number; lastPrayed: number; boonActive: boolean; boonName: string; }

export interface PrayerResult { success: boolean; boon: string; devotionChange: number; narration: string; }

const BOONS = ['Guidance (+1d4 to next check)', 'Blessing (+1 to attacks for 1 hour)', 'Protection (+1 AC for 1 hour)', 'Insight (advantage on next WIS check)', 'Vigor (+5 temporary HP)', 'Clarity (advantage on next INT check)', 'Courage (immunity to Frightened for 1 hour)'];
const FAILURES = ['Silence — no response.', 'A distant rumble, but no aid comes.', 'You feel a cold presence, but it passes.'];

export function createPrayerState(characterId: string, deityName: string): PrayerState {
  return { characterId, deityName, devotion: 5, prayersToday: 0, lastPrayed: 0, boonActive: false, boonName: '' };
}

export function pray(state: PrayerState): { state: PrayerState; result: PrayerResult } {
  const dc = 10 + state.prayersToday * 3; // harder each time per day
  const roll = Math.floor(Math.random() * 20) + 1 + Math.floor(state.devotion / 2);
  const success = roll >= dc;

  if (success) {
    const boon = BOONS[Math.floor(Math.random() * BOONS.length)];
    return {
      state: { ...state, prayersToday: state.prayersToday + 1, lastPrayed: Date.now(), boonActive: true, boonName: boon, devotion: Math.min(10, state.devotion + 1) },
      result: { success: true, boon, devotionChange: 1, narration: `🙏 **${state.deityName} answers!** Boon granted: ${boon}` },
    };
  }
  return {
    state: { ...state, prayersToday: state.prayersToday + 1, lastPrayed: Date.now() },
    result: { success: false, boon: '', devotionChange: 0, narration: `🙏 ${FAILURES[Math.floor(Math.random() * FAILURES.length)]} (Roll ${roll} < DC ${dc})` },
  };
}

export function resetDailyPrayers(state: PrayerState): PrayerState { return { ...state, prayersToday: 0 }; }

export function formatPrayerStatus(state: PrayerState, characterName: string): string {
  const bar = '🕯️'.repeat(state.devotion) + '⬜'.repeat(10 - state.devotion);
  const lines = [`🙏 **${characterName}** → ${state.deityName}`];
  lines.push(`Devotion: [${bar}] ${state.devotion}/10 | Prayers today: ${state.prayersToday}`);
  if (state.boonActive) lines.push(`Active boon: ${state.boonName}`);
  return lines.join('\n');
}
