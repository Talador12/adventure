// Tactical advice engine — analyzes party composition and combat state
// to generate smart suggestions. Pure client-side, no AI calls needed.

import type { Unit, Character } from '../types/game';

export interface TacticalTip {
  target: string;     // character name or "party"
  advice: string;
  priority: 'critical' | 'important' | 'suggestion';
}

export function analyzePartyTactics(units: Unit[], characters: Character[]): TacticalTip[] {
  const tips: TacticalTip[] = [];
  const players = units.filter((u) => u.type === 'player' && u.hp > 0);
  const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0);

  if (players.length === 0 || enemies.length === 0) return tips;

  // Find the most dangerous enemy (highest CR or most HP)
  const bossEnemy = enemies.reduce((best, e) => (e.maxHp > best.maxHp ? e : best), enemies[0]);

  // Check for low-HP allies
  for (const p of players) {
    const char = characters.find((c) => c.id === p.characterId);
    const hpPct = p.hp / p.maxHp;
    if (hpPct <= 0.25 && hpPct > 0) {
      tips.push({ target: p.name, advice: `${p.name} is critically wounded (${p.hp}/${p.maxHp}). Prioritize healing or withdrawal.`, priority: 'critical' });
    }

    // Class-specific suggestions
    if (char?.class === 'Cleric' && players.some((pl) => pl.hp <= pl.maxHp * 0.3 && pl.id !== p.id)) {
      tips.push({ target: p.name, advice: `${p.name} should consider Healing Word (bonus action) for wounded allies.`, priority: 'important' });
    }
    if (char?.class === 'Rogue' && !p.conditions?.some((c) => c.type === 'hidden')) {
      tips.push({ target: p.name, advice: `${p.name}: use Cunning Action to Hide for Sneak Attack advantage next turn.`, priority: 'suggestion' });
    }
    if (char?.class === 'Barbarian' && !p.conditions?.some((c) => c.type === 'raging')) {
      tips.push({ target: p.name, advice: `${p.name}: Rage for resistance to physical damage and +2 melee damage.`, priority: 'important' });
    }
    if (char?.class === 'Wizard' || char?.class === 'Sorcerer') {
      if (enemies.length >= 3) {
        tips.push({ target: p.name, advice: `${p.name}: multiple enemies clustered — consider AoE (Fireball, Burning Hands).`, priority: 'suggestion' });
      }
    }
  }

  // Focus fire suggestion
  const weakestEnemy = enemies.reduce((best, e) => (e.hp < best.hp ? e : best), enemies[0]);
  if (weakestEnemy.hp <= weakestEnemy.maxHp * 0.4) {
    tips.push({ target: 'party', advice: `Focus fire on ${weakestEnemy.name} (${weakestEnemy.hp}/${weakestEnemy.maxHp} HP) — one more solid hit should drop it.`, priority: 'important' });
  }

  // Boss awareness
  if (bossEnemy.maxHp > 50 && enemies.length > 1) {
    tips.push({ target: 'party', advice: `${bossEnemy.name} is the primary threat (${bossEnemy.maxHp} HP). Consider crowd-controlling minions first or focusing the boss.`, priority: 'suggestion' });
  }

  // Outnumbered warning
  if (enemies.length > players.length * 1.5) {
    tips.push({ target: 'party', advice: `Outnumbered ${enemies.length} to ${players.length} — use choke points and AoE to even the odds.`, priority: 'important' });
  }

  return tips.slice(0, 5); // Cap at 5 tips
}

export function formatTacticalAdvice(tips: TacticalTip[]): string {
  if (tips.length === 0) return '';
  const icons = { critical: '🚨', important: '⚔️', suggestion: '💡' };
  return tips.map((t) => `${icons[t.priority]} ${t.advice}`).join('\n');
}
