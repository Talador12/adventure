// Character mood — derives an emoji face from HP percentage and active conditions.
// Used in initiative bar, party vitals, and character sheet.
// "How's the barbarian doing?" *checks mood* "Angry, but functional."

export function characterMood(hpPct: number, conditions: string[]): string {
  // Conditions override HP mood
  if (conditions.includes('unconscious') || hpPct <= 0) return '\uD83D\uDC80'; // skull
  if (conditions.includes('frightened')) return '\uD83D\uDE28'; // fearful
  if (conditions.includes('poisoned')) return '\uD83E\uDD22'; // nauseated
  if (conditions.includes('charmed')) return '\uD83D\uDE0D'; // heart eyes
  if (conditions.includes('stunned')) return '\uD83D\uDE35'; // dizzy
  if (conditions.includes('petrified')) return '\uD83E\uDEA8'; // rock
  if (conditions.includes('blinded')) return '\uD83D\uDE36'; // no mouth
  if (conditions.includes('restrained') || conditions.includes('grappled')) return '\uD83D\uDE16'; // confounded

  // HP-based mood
  if (hpPct >= 100) return '\uD83D\uDE0E'; // sunglasses — full HP, feeling good
  if (hpPct >= 75) return '\uD83D\uDE42'; // slight smile — doing fine
  if (hpPct >= 50) return '\uD83D\uDE10'; // neutral — been better
  if (hpPct >= 25) return '\uD83D\uDE1F'; // worried — getting rough
  if (hpPct > 0) return '\uD83D\uDE30'; // anxious — one hit from going down
  return '\uD83D\uDC80'; // skull — dead
}
