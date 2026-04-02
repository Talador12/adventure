// Character rivalry system — PvP-safe competitive tracking between party members.
// Tracks kills, crits, damage, gold earned, spells cast per session.
// No actual PvP — just a leaderboard that adds friendly competition.

export interface RivalryStats {
  characterId: string;
  characterName: string;
  kills: number;
  crits: number;
  damageDealt: number;
  damageTaken: number;
  healingDone: number;
  spellsCast: number;
  goldEarned: number;
  deathSaves: number; // survived death saves
  natOnes: number;
}

export interface RivalryBoard {
  sessionId: string;
  stats: RivalryStats[];
  categories: RivalryCategory[];
}

export interface RivalryCategory {
  id: string;
  label: string;
  emoji: string;
  getValue: (s: RivalryStats) => number;
}

export const RIVALRY_CATEGORIES: RivalryCategory[] = [
  { id: 'kills', label: 'Slayer', emoji: '💀', getValue: (s) => s.kills },
  { id: 'damage', label: 'Heavy Hitter', emoji: '⚔️', getValue: (s) => s.damageDealt },
  { id: 'crits', label: 'Lucky Strike', emoji: '🎯', getValue: (s) => s.crits },
  { id: 'healing', label: 'Lifesaver', emoji: '💚', getValue: (s) => s.healingDone },
  { id: 'spells', label: 'Arcane Master', emoji: '✨', getValue: (s) => s.spellsCast },
  { id: 'tank', label: 'Damage Sponge', emoji: '🛡️', getValue: (s) => s.damageTaken },
  { id: 'deathSaves', label: 'Cheated Death', emoji: '☠️', getValue: (s) => s.deathSaves },
  { id: 'natOnes', label: 'Cursed', emoji: '🫣', getValue: (s) => s.natOnes },
];

export function createEmptyStats(characterId: string, characterName: string): RivalryStats {
  return { characterId, characterName, kills: 0, crits: 0, damageDealt: 0, damageTaken: 0, healingDone: 0, spellsCast: 0, goldEarned: 0, deathSaves: 0, natOnes: 0 };
}

export function parseRivalryFromLog(combatLog: string[], characterNames: string[]): RivalryStats[] {
  const stats: Record<string, RivalryStats> = {};
  for (const name of characterNames) {
    stats[name] = createEmptyStats(name, name);
  }

  for (const entry of combatLog) {
    for (const name of characterNames) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Damage dealt
      const dmgMatch = entry.match(new RegExp(`${escaped}.*for (\\d+) damage`));
      if (dmgMatch) stats[name].damageDealt += parseInt(dmgMatch[1], 10);

      // Damage taken
      const takenMatch = entry.match(new RegExp(`(?:hits|damages) ${escaped}.*for (\\d+)`));
      if (takenMatch) stats[name].damageTaken += parseInt(takenMatch[1], 10);

      // Kills
      if ((entry.includes('falls!') || entry.includes('defeated') || entry.includes('slain')) && entry.includes(name)) {
        stats[name].kills++;
      }

      // Crits
      if ((entry.includes('CRITICAL') || entry.includes('NAT 20')) && entry.includes(name)) {
        stats[name].crits++;
      }

      // Nat 1s
      if (entry.includes('NAT 1') && entry.includes(name)) {
        stats[name].natOnes++;
      }

      // Spells
      if ((entry.includes('casts') || entry.includes('Cast:')) && entry.includes(name)) {
        stats[name].spellsCast++;
      }

      // Healing
      const healMatch = entry.match(new RegExp(`${escaped}.*heals?.*for (\\d+)`));
      if (healMatch) stats[name].healingDone += parseInt(healMatch[1], 10);
    }
  }

  return Object.values(stats);
}

export function getRivalryLeaders(stats: RivalryStats[]): { category: RivalryCategory; leader: RivalryStats; value: number }[] {
  return RIVALRY_CATEGORIES.map((cat) => {
    const sorted = [...stats].sort((a, b) => cat.getValue(b) - cat.getValue(a));
    const leader = sorted[0];
    return { category: cat, leader, value: cat.getValue(leader) };
  }).filter((r) => r.value > 0);
}

export function formatRivalryBoard(stats: RivalryStats[]): string {
  const leaders = getRivalryLeaders(stats);
  if (leaders.length === 0) return 'No rivalry stats yet — start some combat!';
  const lines = ['🏆 **Party Rivalry Board:**'];
  for (const r of leaders) {
    lines.push(`${r.category.emoji} **${r.category.label}**: ${r.leader.characterName} (${r.value})`);
  }
  return lines.join('\n');
}
