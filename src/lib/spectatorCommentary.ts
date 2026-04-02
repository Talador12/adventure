// Spectator commentary — AI-style play-by-play narration for watchers.
// Generates sports-broadcast-style commentary from combat events.
// Purely client-side — analyzes combat log entries and adds flavor.

export function generateCommentary(lastLogEntries: string[], roundNumber: number): string | null {
  if (lastLogEntries.length === 0) return null;
  const recent = lastLogEntries.slice(-3);
  const entry = recent[recent.length - 1];

  // Crit commentary
  if (entry.includes('CRITICAL HIT')) {
    const attacker = entry.match(/(\w+) strikes/)?.[1] || 'The attacker';
    const commentaries = [
      `AND WHAT A HIT! ${attacker} absolutely CRUSHES that attack! The crowd goes wild!`,
      `OH MY! A critical strike from ${attacker}! That's going to leave a mark, folks!`,
      `BOOM! ${attacker} with the critical! You love to see it!`,
    ];
    return commentaries[Math.floor(Math.random() * commentaries.length)];
  }

  // Kill commentary
  if (entry.includes('falls!')) {
    const target = entry.match(/(\w+) falls/)?.[1] || 'The enemy';
    const commentaries = [
      `${target} IS DOWN! What a takedown! That's one less threat on the field!`,
      `AND THAT'S IT! ${target} goes down! The party is making quick work of this encounter!`,
      `${target} falls! Incredible teamwork from the party here in round ${roundNumber}!`,
    ];
    return commentaries[Math.floor(Math.random() * commentaries.length)];
  }

  // Miss commentary
  if (entry.includes('misses')) {
    const commentaries = [
      'A swing and a miss! The tension builds...',
      'Oh, just barely! That was close — the battle hangs in the balance!',
    ];
    return Math.random() < 0.3 ? commentaries[Math.floor(Math.random() * commentaries.length)] : null;
  }

  // Healing commentary
  if (entry.includes('heals') || entry.includes('Healing Word') || entry.includes('Second Wind')) {
    return `Smart play — getting that healing in at just the right moment. Good game sense!`;
  }

  // Round commentary (every 3 rounds)
  if (roundNumber > 0 && roundNumber % 3 === 0 && Math.random() < 0.5) {
    return `We're in round ${roundNumber} now, folks. Both sides digging deep. This is championship-level D&D right here.`;
  }

  return null;
}
