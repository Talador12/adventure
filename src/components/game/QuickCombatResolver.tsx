// QuickCombatResolver — auto-resolve simple encounters without full tactical play.
// Simulates a combat round-by-round using party stats vs enemy stats.
// Shows results as a summary: outcome, casualties, XP, gold, damage taken.
import { useState, useCallback } from 'react';

interface PartyMember {
  name: string;
  class: string;
  level: number;
  hp: number;
  maxHp: number;
  ac: number;
  attackBonus: number;
  damageDie: number;
}

interface QuickCombatProps {
  party: PartyMember[];
  encounterDifficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  onResult: (summary: string) => void;
  onXP: (xp: number) => void;
  onGold: (gold: number) => void;
  onDamage: (charName: string, damage: number) => void;
}

interface CombatResult {
  victory: boolean;
  rounds: number;
  partyDamage: Record<string, number>;
  enemiesDefeated: number;
  xpEarned: number;
  goldEarned: number;
  narrative: string;
}

const DIFFICULTY_MULTIPLIERS = { easy: 0.5, medium: 1.0, hard: 1.5, deadly: 2.2 };
const DIFFICULTY_ENEMY_COUNT = { easy: 2, medium: 3, hard: 4, deadly: 5 };

function roll(sides: number): number { return Math.floor(Math.random() * sides) + 1; }

function simulateCombat(party: PartyMember[], difficulty: 'easy' | 'medium' | 'hard' | 'deadly'): CombatResult {
  const avgLevel = party.reduce((s, p) => s + p.level, 0) / party.length;
  const mult = DIFFICULTY_MULTIPLIERS[difficulty];
  const enemyCount = DIFFICULTY_ENEMY_COUNT[difficulty];

  // Generate enemy stats based on party level + difficulty
  const enemyHp = Math.floor((8 + avgLevel * 4) * mult);
  const enemyAc = Math.floor(10 + avgLevel * 0.5 + mult * 2);
  const enemyAtk = Math.floor(avgLevel * 0.7 + mult * 2);
  const enemyDmg = Math.floor(3 + avgLevel * 1.2 * mult);
  const enemies = Array.from({ length: enemyCount }, () => ({ hp: enemyHp, maxHp: enemyHp }));

  const partyState = party.map((p) => ({ ...p, currentHp: p.hp }));
  const partyDamage: Record<string, number> = {};
  party.forEach((p) => { partyDamage[p.name] = 0; });

  let rounds = 0;
  const maxRounds = 20;

  while (rounds < maxRounds) {
    rounds++;

    // Party attacks
    for (const member of partyState) {
      if (member.currentHp <= 0) continue;
      const target = enemies.find((e) => e.hp > 0);
      if (!target) break;
      const attackRoll = roll(20) + member.attackBonus;
      if (attackRoll >= enemyAc) {
        const dmg = roll(member.damageDie) + Math.floor((member.level - 1) * 0.5);
        target.hp -= dmg;
      }
    }

    // Check if all enemies dead
    if (enemies.every((e) => e.hp <= 0)) break;

    // Enemy attacks
    for (const enemy of enemies) {
      if (enemy.hp <= 0) continue;
      const alive = partyState.filter((p) => p.currentHp > 0);
      if (alive.length === 0) break;
      const target = alive[Math.floor(Math.random() * alive.length)];
      const attackRoll = roll(20) + enemyAtk;
      if (attackRoll >= target.ac) {
        const dmg = roll(8) + Math.floor(enemyDmg * 0.6);
        target.currentHp -= dmg;
        partyDamage[target.name] = (partyDamage[target.name] || 0) + dmg;
      }
    }

    // Check TPK
    if (partyState.every((p) => p.currentHp <= 0)) break;
  }

  const victory = enemies.every((e) => e.hp <= 0);
  const defeated = enemies.filter((e) => e.hp <= 0).length;
  const xpPerEnemy = Math.floor(50 * avgLevel * mult);
  const xp = defeated * xpPerEnemy;
  const gold = victory ? Math.floor(defeated * 10 * mult + roll(20) * avgLevel) : 0;

  // Generate narrative
  const casualNames = partyState.filter((p) => p.currentHp <= 0).map((p) => p.name);
  const heavyHitters = Object.entries(partyDamage).filter(([, d]) => d > 0).sort(([, a], [, b]) => b - a);
  let narrative = victory
    ? `Victory in ${rounds} round${rounds !== 1 ? 's' : ''}! ${defeated} enem${defeated !== 1 ? 'ies' : 'y'} defeated.`
    : `Defeat after ${rounds} rounds of fierce combat.`;
  if (casualNames.length > 0) narrative += ` ${casualNames.join(' and ')} fell in battle.`;
  if (victory && heavyHitters.length > 0) narrative += ` ${heavyHitters[0][0]} took the heaviest beating (${heavyHitters[0][1]} damage).`;
  if (victory) narrative += ` Earned ${xp} XP and ${gold} gold.`;

  return { victory, rounds, partyDamage, enemiesDefeated: defeated, xpEarned: xp, goldEarned: gold, narrative };
}

export default function QuickCombatResolver({ party, encounterDifficulty, onResult, onXP, onGold, onDamage }: QuickCombatProps) {
  const [result, setResult] = useState<CombatResult | null>(null);
  const [resolving, setResolving] = useState(false);

  const resolve = useCallback(() => {
    if (party.length === 0) return;
    setResolving(true);
    // Short delay for dramatic effect
    setTimeout(() => {
      const r = simulateCombat(party, encounterDifficulty);
      setResult(r);
      onResult(r.narrative);
      if (r.victory) {
        onXP(r.xpEarned);
        onGold(r.goldEarned);
      }
      // Apply damage to party
      for (const [name, dmg] of Object.entries(r.partyDamage)) {
        if (dmg > 0) onDamage(name, dmg);
      }
      setResolving(false);
    }, 600);
  }, [party, encounterDifficulty, onResult, onXP, onGold, onDamage]);

  if (party.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Quick Combat</label>
        <span className="text-[8px] text-slate-600">Auto-resolve encounters</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={resolve}
          disabled={resolving}
          className="flex-1 py-1.5 bg-red-900/40 hover:bg-red-900/60 disabled:opacity-40 border border-red-700/40 text-red-300 text-[10px] font-semibold rounded-lg transition-all"
        >
          {resolving ? 'Resolving...' : `Resolve ${encounterDifficulty} Encounter`}
        </button>
      </div>
      {result && (
        <div className={`rounded-lg border p-2.5 space-y-1.5 text-[10px] ${result.victory ? 'border-emerald-800/40 bg-emerald-950/20' : 'border-red-800/40 bg-red-950/20'}`}>
          <div className={`font-bold ${result.victory ? 'text-emerald-400' : 'text-red-400'}`}>
            {result.victory ? 'Victory!' : 'Defeat...'} ({result.rounds} rounds)
          </div>
          <div className="text-slate-400">{result.narrative}</div>
          {Object.entries(result.partyDamage).filter(([, d]) => d > 0).length > 0 && (
            <div className="space-y-0.5">
              <span className="text-slate-600 text-[9px] uppercase font-semibold">Damage taken:</span>
              {Object.entries(result.partyDamage).filter(([, d]) => d > 0).map(([name, dmg]) => (
                <div key={name} className="flex items-center gap-2">
                  <span className="text-slate-300">{name}</span>
                  <span className="text-red-400 font-mono">-{dmg} HP</span>
                </div>
              ))}
            </div>
          )}
          {result.victory && (
            <div className="flex gap-3 text-[9px] pt-1 border-t border-slate-800/50">
              <span className="text-amber-400">{result.xpEarned} XP</span>
              <span className="text-yellow-400">{result.goldEarned} gold</span>
              <span className="text-slate-500">{result.enemiesDefeated} defeated</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
