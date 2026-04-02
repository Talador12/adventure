// DM encounter difficulty predictor — estimates TPK probability before starting combat.
// Uses party stats, enemy stats, and historical combat data to make predictions.

import type { Character } from '../types/game';

export interface EncounterPrediction {
  winProbability: number; // 0-1
  tpkProbability: number; // 0-1
  estimatedRounds: number;
  estimatedDamageToParty: number;
  estimatedCasualties: number; // expected downed characters
  rating: 'trivial' | 'easy' | 'moderate' | 'tough' | 'deadly' | 'suicidal';
  warnings: string[];
  summary: string;
}

interface EnemyProfile {
  hp: number;
  ac: number;
  attackBonus: number;
  avgDamage: number;
  count: number;
}

export function predictEncounter(
  characters: Character[],
  enemies: EnemyProfile[],
): EncounterPrediction {
  if (characters.length === 0 || enemies.length === 0) {
    return {
      winProbability: 1, tpkProbability: 0, estimatedRounds: 0,
      estimatedDamageToParty: 0, estimatedCasualties: 0,
      rating: 'trivial', warnings: [], summary: 'No contest.',
    };
  }

  // Party offensive stats
  const partySize = characters.length;
  const avgPartyLevel = characters.reduce((s, c) => s + c.level, 0) / partySize;
  const profBonus = Math.floor((avgPartyLevel - 1) / 4) + 2;
  const avgPartyAtkBonus = profBonus + 3; // estimate: prof + ability mod ~3
  const avgPartyDamage = 5 + avgPartyLevel; // rough scaling
  const totalPartyHp = characters.reduce((s, c) => s + c.hp, 0);
  const avgPartyAc = characters.reduce((s, c) => s + c.ac, 0) / partySize;

  // Enemy offensive stats
  const totalEnemyCount = enemies.reduce((s, e) => s + e.count, 0);
  const totalEnemyHp = enemies.reduce((s, e) => s + e.hp * e.count, 0);
  const avgEnemyAc = enemies.reduce((s, e) => s + e.ac * e.count, 0) / totalEnemyCount;
  const avgEnemyAtkBonus = enemies.reduce((s, e) => s + e.attackBonus * e.count, 0) / totalEnemyCount;
  const avgEnemyDamage = enemies.reduce((s, e) => s + e.avgDamage * e.count, 0) / totalEnemyCount;

  // Hit probabilities (d20 + bonus >= AC)
  const partyHitChance = Math.min(0.95, Math.max(0.05, (21 - (avgEnemyAc - avgPartyAtkBonus)) / 20));
  const enemyHitChance = Math.min(0.95, Math.max(0.05, (21 - (avgPartyAc - avgEnemyAtkBonus)) / 20));

  // Expected damage per round
  const partyDamagePerRound = partySize * avgPartyDamage * partyHitChance;
  const enemyDamagePerRound = totalEnemyCount * avgEnemyDamage * enemyHitChance;

  // How many rounds to kill all enemies?
  const roundsToKillEnemies = Math.max(1, Math.ceil(totalEnemyHp / Math.max(1, partyDamagePerRound)));

  // How much damage will party take?
  const estimatedDamageToParty = enemyDamagePerRound * roundsToKillEnemies;
  const damageRatio = estimatedDamageToParty / Math.max(1, totalPartyHp);

  // Casualties estimate
  const avgCharHp = totalPartyHp / partySize;
  const estimatedCasualties = Math.min(partySize, Math.floor(estimatedDamageToParty / Math.max(1, avgCharHp)));

  // Win / TPK probability (simplified model)
  const winProbability = Math.min(0.99, Math.max(0.01, 1 - (damageRatio * 0.5)));
  const tpkProbability = Math.min(0.99, Math.max(0.01, damageRatio > 2 ? (damageRatio - 1) * 0.4 : damageRatio > 1 ? (damageRatio - 1) * 0.2 : 0));

  // Rating
  const rating = damageRatio < 0.2 ? 'trivial' : damageRatio < 0.5 ? 'easy' : damageRatio < 0.8 ? 'moderate' : damageRatio < 1.2 ? 'tough' : damageRatio < 2.0 ? 'deadly' : 'suicidal';

  // Warnings
  const warnings: string[] = [];
  if (tpkProbability > 0.3) warnings.push('High TPK risk! Consider reducing enemy count.');
  if (totalEnemyCount > partySize * 2) warnings.push('Outnumbered more than 2:1 — action economy heavily favors enemies.');
  if (estimatedCasualties >= partySize / 2) warnings.push(`Expect ${estimatedCasualties}+ characters to go down.`);
  if (roundsToKillEnemies > 8) warnings.push('Combat will likely drag — consider reducing enemy HP.');
  if (avgEnemyAc > avgPartyAtkBonus + 15) warnings.push('Enemy AC is very high — party will struggle to land hits.');

  const summary = `${rating.toUpperCase()} encounter. ~${roundsToKillEnemies} rounds, ~${Math.round(estimatedDamageToParty)} damage to party, ${Math.round(winProbability * 100)}% win chance.`;

  return {
    winProbability,
    tpkProbability,
    estimatedRounds: roundsToKillEnemies,
    estimatedDamageToParty: Math.round(estimatedDamageToParty),
    estimatedCasualties,
    rating,
    warnings,
    summary,
  };
}

export function formatPrediction(prediction: EncounterPrediction): string {
  const ratingEmoji = { trivial: '🟢', easy: '🟢', moderate: '🟡', tough: '🟠', deadly: '🔴', suicidal: '💀' };
  const lines = [`${ratingEmoji[prediction.rating]} **Encounter Prediction: ${prediction.rating.toUpperCase()}**`];
  lines.push(`Win: ${Math.round(prediction.winProbability * 100)}% | TPK: ${Math.round(prediction.tpkProbability * 100)}%`);
  lines.push(`Est. ${prediction.estimatedRounds} rounds, ${prediction.estimatedDamageToParty} damage to party`);
  if (prediction.estimatedCasualties > 0) lines.push(`Expected casualties: ${prediction.estimatedCasualties}`);
  for (const w of prediction.warnings) lines.push(`⚠️ ${w}`);
  return lines.join('\n');
}
