// CombatRecap — auto-generated narrative summary per combat round.
// Parses the combat log entries added during the current round and produces
// a concise, dramatic one-liner recap. Shown as a collapsible banner between rounds.
import { useState, useMemo, useEffect, useRef } from 'react';

interface CombatRecapProps {
  combatLog: string[];
  combatRound: number;
  inCombat: boolean;
}

interface RoundRecap {
  round: number;
  summary: string;
  highlights: string[];
  hasCrit: boolean;
  hasKill: boolean;
  hasKO: boolean;
}

// Parse a round's log entries into structured data, then generate a narrative recap
function generateRecap(entries: string[], round: number): RoundRecap {
  let damageDealt = 0;
  let damageTaken = 0;
  const attackers: Set<string> = new Set();
  const targets: Set<string> = new Set();
  const kills: string[] = [];
  const spells: string[] = [];
  let crits = 0;
  let fumbles = 0;
  let kos = 0;
  const highlights: string[] = [];

  for (const entry of entries) {
    const lower = entry.toLowerCase();

    // Damage dealt
    const dmgMatch = entry.match(/for (\d+) (?:damage|fire|cold|force|radiant|necrotic|lightning|thunder|psychic|poison)/i);
    if (dmgMatch) damageDealt += parseInt(dmgMatch[1]);

    // Damage taken
    const takenMatch = entry.match(/takes? (\d+) damage/i);
    if (takenMatch) damageTaken += parseInt(takenMatch[1]);

    // Attacker names (before "hits", "strikes", "attacks")
    const attackerMatch = entry.match(/^(.+?) (?:hits|strikes|attacks|misses|swings)/i);
    if (attackerMatch) attackers.add(attackerMatch[1].trim());

    // Target names (after "hits/strikes X")
    const targetMatch = entry.match(/(?:hits|strikes|attacks) (.+?) (?:for|with|—)/i);
    if (targetMatch) targets.add(targetMatch[1].trim());

    // Kills
    if (lower.includes('is slain') || lower.includes('defeated') || lower.includes('falls') || lower.includes('destroyed') || lower.includes('drops to 0') || lower.includes('killed')) {
      const killMatch = entry.match(/(.+?) (?:is slain|has been defeated|falls|is destroyed|drops to 0|killed)/i);
      if (killMatch) kills.push(killMatch[1].trim());
    }

    // Spells
    const spellMatch = entry.match(/casts? (.+?)(?:\.|!| on| at| —)/i);
    if (spellMatch) spells.push(spellMatch[1].trim());

    // Crits
    if (lower.includes('critical hit') || lower.includes('critical!') || lower.includes('crit!')) {
      crits++;
      highlights.push(entry);
    }

    // Fumbles
    if (lower.includes('fumble') || lower.includes('critical fail') || lower.includes('critical miss')) {
      fumbles++;
      highlights.push(entry);
    }

    // KOs
    if (lower.includes('unconscious') || lower.includes('knocked down') || lower.includes('drops to 0 hp')) {
      kos++;
      highlights.push(entry);
    }
  }

  // Generate narrative summary
  const parts: string[] = [];

  if (kills.length > 0) {
    parts.push(kills.length === 1 ? `${kills[0]} was slain` : `${kills.length} enemies fell`);
  }

  if (crits > 0) {
    parts.push(crits === 1 ? 'a devastating critical hit landed' : `${crits} critical strikes landed`);
  }

  if (damageDealt > 0 && kills.length === 0) {
    parts.push(`${damageDealt} total damage dealt`);
  }

  if (spells.length > 0) {
    const unique = [...new Set(spells)];
    if (unique.length <= 2) {
      parts.push(`${unique.join(' and ')} cast`);
    } else {
      parts.push(`${unique.length} spells woven`);
    }
  }

  if (kos > 0) {
    parts.push(kos === 1 ? 'an ally fell unconscious' : `${kos} allies went down`);
  }

  if (fumbles > 0) {
    parts.push(fumbles === 1 ? 'a fumble brought groans' : `${fumbles} fumbles plagued the field`);
  }

  // Fallback
  if (parts.length === 0) {
    if (entries.length > 0) {
      parts.push('blows were traded but the tide held steady');
    } else {
      parts.push('a quiet round — the calm before the storm');
    }
  }

  // Capitalize first letter, join with commas, end with period
  const raw = parts.join(', ');
  const summary = `Round ${round}: ${raw.charAt(0).toUpperCase()}${raw.slice(1)}.`;

  return { round, summary, highlights: highlights.slice(0, 3), hasCrit: crits > 0, hasKill: kills.length > 0, hasKO: kos > 0 };
}

export default function CombatRecap({ combatLog, combatRound, inCombat }: CombatRecapProps) {
  const [recaps, setRecaps] = useState<RoundRecap[]>([]);
  const [expanded, setExpanded] = useState(false);
  const prevRoundRef = useRef(combatRound);
  // Track log length at round boundaries to slice per-round entries
  const roundStartIdxRef = useRef(0);

  // When round changes, generate recap for the previous round
  useEffect(() => {
    if (!inCombat) {
      // Combat ended — reset for next fight
      if (recaps.length > 0) {
        // Keep recaps visible briefly, then clear on next combat start
      }
      roundStartIdxRef.current = 0;
      prevRoundRef.current = 0;
      return;
    }

    if (combatRound > prevRoundRef.current && prevRoundRef.current > 0) {
      // New round started — recap the previous round
      const roundEntries = combatLog.slice(roundStartIdxRef.current);
      if (roundEntries.length > 0) {
        const recap = generateRecap(roundEntries, prevRoundRef.current);
        setRecaps((prev) => [...prev, recap]);
      }
      roundStartIdxRef.current = combatLog.length;
    }

    if (combatRound === 1 && prevRoundRef.current === 0) {
      // Combat just started — mark the log start point
      roundStartIdxRef.current = combatLog.length;
      setRecaps([]); // clear old recaps
    }

    prevRoundRef.current = combatRound;
  }, [combatRound, inCombat, combatLog, recaps.length]);

  if (recaps.length === 0) return null;

  const latest = recaps[recaps.length - 1];

  return (
    <div className="mx-2 mb-1 shrink-0">
      {/* Latest recap as banner */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-left rounded-lg border px-3 py-2 transition-all ${
          latest.hasCrit ? 'border-amber-700/40 bg-amber-900/10' :
          latest.hasKill ? 'border-red-700/40 bg-red-900/10' :
          latest.hasKO ? 'border-yellow-700/40 bg-yellow-900/10' :
          'border-slate-800 bg-slate-900/40'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-slate-600 uppercase font-semibold tracking-wider shrink-0">Recap</span>
          <span className={`text-[11px] italic flex-1 ${
            latest.hasCrit ? 'text-amber-400' : latest.hasKill ? 'text-red-400' : 'text-slate-400'
          }`}>
            {latest.summary}
          </span>
          {recaps.length > 1 && (
            <span className="text-[8px] text-slate-600 shrink-0">{expanded ? '▾' : '▸'} {recaps.length} rounds</span>
          )}
        </div>
        {/* Highlights */}
        {latest.highlights.length > 0 && !expanded && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {latest.highlights.map((h, i) => (
              <span key={i} className="text-[8px] text-slate-500 bg-slate-800/50 rounded px-1.5 py-0.5 truncate max-w-[200px]">{h}</span>
            ))}
          </div>
        )}
      </button>

      {/* Expanded: all round recaps */}
      {expanded && recaps.length > 1 && (
        <div className="mt-1 space-y-1 max-h-[120px] overflow-y-auto">
          {[...recaps].reverse().map((r) => (
            <div
              key={r.round}
              className={`rounded-md border px-2.5 py-1.5 text-[10px] italic ${
                r.hasCrit ? 'border-amber-800/30 text-amber-400/80' :
                r.hasKill ? 'border-red-800/30 text-red-400/80' :
                'border-slate-800/50 text-slate-500'
              }`}
            >
              {r.summary}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
